'use strict';

const { CONTRACT_VERSION, REQUIRED_FIELDS, createMarketData, MarketDataValidationError } = require('./marketData');

const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_MAX_RETRIES = 1;
const ERROR_CODES = Object.freeze({
  INVALID_REQUEST: 'INVALID_REQUEST',
  UNSUPPORTED_PROVIDER: 'UNSUPPORTED_PROVIDER',
  PROVIDER_UNAVAILABLE: 'PROVIDER_UNAVAILABLE',
  PROVIDER_TIMEOUT: 'PROVIDER_TIMEOUT',
  PROVIDER_RATE_LIMITED: 'PROVIDER_RATE_LIMITED',
  PROVIDER_MALFORMED_RESPONSE: 'PROVIDER_MALFORMED_RESPONSE',
  MISSING_MARKETDATA_FIELD: 'MISSING_MARKETDATA_FIELD',
  INVALID_MARKETDATA_FIELD: 'INVALID_MARKETDATA_FIELD',
  NORMALIZATION_FAILED: 'NORMALIZATION_FAILED',
});
const RETRYABLE_PROVIDER_ERRORS = Object.freeze([
  ERROR_CODES.PROVIDER_UNAVAILABLE,
  ERROR_CODES.PROVIDER_TIMEOUT,
  ERROR_CODES.PROVIDER_RATE_LIMITED,
]);
const PROVIDER_ERROR_MAP = Object.freeze({
  UNAVAILABLE: ERROR_CODES.PROVIDER_UNAVAILABLE,
  PROVIDER_UNAVAILABLE: ERROR_CODES.PROVIDER_UNAVAILABLE,
  TIMEOUT: ERROR_CODES.PROVIDER_TIMEOUT,
  PROVIDER_TIMEOUT: ERROR_CODES.PROVIDER_TIMEOUT,
  RATE_LIMITED: ERROR_CODES.PROVIDER_RATE_LIMITED,
  RATE_LIMIT: ERROR_CODES.PROVIDER_RATE_LIMITED,
  PROVIDER_RATE_LIMITED: ERROR_CODES.PROVIDER_RATE_LIMITED,
  MALFORMED_RESPONSE: ERROR_CODES.PROVIDER_MALFORMED_RESPONSE,
  PROVIDER_MALFORMED_RESPONSE: ERROR_CODES.PROVIDER_MALFORMED_RESPONSE,
});
const MARKET_FIELD_PATHS = Object.freeze({
  priceUsd: Object.freeze(['market', 'priceUsd']),
  change1h: Object.freeze(['market', 'change1h']),
  change24h: Object.freeze(['market', 'change24h']),
  volume24hUsd: Object.freeze(['market', 'volume24hUsd']),
  marketCapUsd: Object.freeze(['market', 'marketCapUsd']),
  totalMarketCapUsd: Object.freeze(['market', 'totalMarketCapUsd']),
  total3MarketCap: Object.freeze(['market', 'total3MarketCap']),
  btcDominance: Object.freeze(['market', 'btcDominance']),
  usdtDominance: Object.freeze(['market', 'usdtDominance']),
  usdcDominance: Object.freeze(['market', 'usdcDominance']),
  circulatingSupply: Object.freeze(['supply', 'circulatingSupply']),
  ath: Object.freeze(['market', 'ath']),
  atl: Object.freeze(['market', 'atl']),
});
const STRING_PROVIDER_FIELDS = Object.freeze({
  id: Object.freeze(['asset', 'id']),
  symbol: Object.freeze(['asset', 'symbol']),
  name: Object.freeze(['asset', 'name']),
});
const NON_NEGATIVE_MARKET_FIELDS = Object.freeze([
  'priceUsd', 'volume24hUsd', 'marketCapUsd', 'totalMarketCapUsd', 'total3MarketCap', 'circulatingSupply', 'ath', 'atl',
]);
const DOMINANCE_FIELDS = Object.freeze(['btcDominance', 'usdtDominance', 'usdcDominance']);

function isPlainObject(value) {
  return value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value);
}

function failure(errorCode, errorMessage, options = {}) {
  const result = {
    ok: false,
    requestId: options.requestId || '',
    errorCode,
    errorMessage,
    retryable: Boolean(options.retryable),
    attempts: options.attempts || 0,
    failedAt: Date.now(),
  };
  if (options.providerId) result.providerId = options.providerId;
  if (options.missingFields) result.missingFields = Object.freeze([...options.missingFields]);
  return Object.freeze(result);
}

function validateRequest(request) {
  if (!isPlainObject(request)) return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest must be an object.');
  const requestId = typeof request.requestId === 'string' ? request.requestId.trim() : '';
  const providerId = typeof request.providerId === 'string' ? request.providerId.trim() : '';
  const assetId = typeof request.assetId === 'string' ? request.assetId.trim() : '';
  if (requestId === '') return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.requestId must be a non-empty string.');
  if (providerId === '') return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.providerId must be a non-empty string.', { requestId });
  if (assetId === '') return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.assetId must be a non-empty string.', { requestId, providerId });
  if (typeof request.requestedAt !== 'number' || !Number.isFinite(request.requestedAt) || request.requestedAt <= 0) {
    return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.requestedAt must be a positive Unix epoch millisecond timestamp.', { requestId, providerId });
  }
  if (request.timeoutMs !== undefined && (typeof request.timeoutMs !== 'number' || !Number.isFinite(request.timeoutMs) || request.timeoutMs <= 0)) {
    return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.timeoutMs must be greater than 0 when provided.', { requestId, providerId });
  }
  if (request.maxRetries !== undefined && (!Number.isInteger(request.maxRetries) || request.maxRetries < 0)) {
    return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.maxRetries must be a non-negative integer when provided.', { requestId, providerId });
  }
  if (!isPlainObject(request.providerFramework)) {
    return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.providerFramework must provide Provider Framework access.', { requestId, providerId });
  }
  return null;
}

function isProviderSupported(providerFramework, providerId) {
  if (typeof providerFramework.hasProvider === 'function') return providerFramework.hasProvider(providerId) === true;
  if (typeof providerFramework.getProvider === 'function') return providerFramework.getProvider(providerId) !== undefined;
  if (isPlainObject(providerFramework.providers)) return Object.prototype.hasOwnProperty.call(providerFramework.providers, providerId);
  return false;
}

function fetchFromProviderFramework(providerFramework, providerId, assetId, requestedAt) {
  if (typeof providerFramework.fetchMarketData === 'function') return providerFramework.fetchMarketData({ providerId, assetId, requestedAt });
  const provider = typeof providerFramework.getProvider === 'function' ? providerFramework.getProvider(providerId) : providerFramework.providers[providerId];
  return provider.fetchMarketData({ providerId, assetId, requestedAt });
}

function withTimeout(promise, timeoutMs) {
  return Promise.race([
    Promise.resolve(promise),
    new Promise((resolve) => {
      setTimeout(() => resolve({ ok: false, errorCode: ERROR_CODES.PROVIDER_TIMEOUT, errorMessage: 'Provider attempt timed out.' }), timeoutMs);
    }),
  ]);
}

function providerFailureFromResult(providerResult, request, attempts, retryable) {
  const sourceCode = providerResult && (providerResult.errorCode || providerResult.category || providerResult.errorCategory);
  const errorCode = PROVIDER_ERROR_MAP[sourceCode] || ERROR_CODES.PROVIDER_MALFORMED_RESPONSE;
  return failure(errorCode, providerResult.errorMessage || providerResult.message || `Provider Framework returned ${errorCode}.`, {
    requestId: request.requestId,
    providerId: request.providerId,
    attempts,
    retryable,
  });
}

function valueAt(object, path) {
  return path.reduce((current, segment) => (isPlainObject(current) ? current[segment] : undefined), object);
}

function normalizeProviderResult(providerResult) {
  if (!isPlainObject(providerResult)) return failure(ERROR_CODES.PROVIDER_MALFORMED_RESPONSE, 'ProviderResult must be an object.');
  if (providerResult.ok === false) return providerFailureFromResult(providerResult, { requestId: '', providerId: providerResult.providerId || '' }, 0, false);
  const providerId = typeof providerResult.providerId === 'string' ? providerResult.providerId.trim() : '';
  if (providerId === '') return failure(ERROR_CODES.NORMALIZATION_FAILED, 'ProviderResult.providerId source attribution is required.');
  const fetchedAt = typeof providerResult.providerTimestamp === 'number' && Number.isFinite(providerResult.providerTimestamp) && providerResult.providerTimestamp > 0
    ? providerResult.providerTimestamp
    : providerResult.requestedAt;
  const normalized = { fetchedAt, fetchSource: providerId, contractVersion: CONTRACT_VERSION };
  const missingFields = [];
  for (const [field, path] of Object.entries(STRING_PROVIDER_FIELDS)) {
    const value = valueAt(providerResult, path);
    if (typeof value !== 'string' || value.trim() === '') missingFields.push(field);
    else normalized[field] = field === 'symbol' ? value.trim().toUpperCase() : value.trim();
  }
  for (const [field, path] of Object.entries(MARKET_FIELD_PATHS)) {
    const value = valueAt(providerResult, path);
    if (value === undefined) missingFields.push(field);
    else normalized[field] = value;
  }
  if (fetchedAt === undefined) missingFields.push('fetchedAt');
  if (missingFields.length > 0) return failure(ERROR_CODES.MISSING_MARKETDATA_FIELD, 'ProviderResult is missing required MarketData fields.', { providerId, missingFields });
  for (const field of Object.keys(MARKET_FIELD_PATHS)) {
    if (typeof normalized[field] !== 'number' || !Number.isFinite(normalized[field])) {
      return failure(ERROR_CODES.INVALID_MARKETDATA_FIELD, `Invalid MarketData field after normalization: ${field}.`, { providerId });
    }
  }
  for (const field of NON_NEGATIVE_MARKET_FIELDS) {
    if (normalized[field] < 0) return failure(ERROR_CODES.INVALID_MARKETDATA_FIELD, `MarketData field must be non-negative: ${field}.`, { providerId });
  }
  for (const field of DOMINANCE_FIELDS) {
    if (normalized[field] < 0 || normalized[field] > 100) return failure(ERROR_CODES.INVALID_MARKETDATA_FIELD, `Dominance field must be between 0 and 100 inclusive: ${field}.`, { providerId });
  }
  if (typeof normalized.fetchedAt !== 'number' || !Number.isFinite(normalized.fetchedAt) || normalized.fetchedAt <= 0) {
    return failure(ERROR_CODES.INVALID_MARKETDATA_FIELD, 'fetchedAt must be a positive Unix epoch millisecond timestamp.', { providerId });
  }
  return Object.freeze(normalized);
}

function mapToMarketData(normalizedValues) {
  if (!isPlainObject(normalizedValues) || normalizedValues.ok === false) return failure(ERROR_CODES.NORMALIZATION_FAILED, 'Normalized values are required before MarketData creation.');
  try {
    const missingFields = REQUIRED_FIELDS.filter((field) => normalizedValues[field] === undefined);
    if (missingFields.length > 0) {
      return failure(ERROR_CODES.MISSING_MARKETDATA_FIELD, 'Normalized values are missing required MarketData fields.', { providerId: normalizedValues.fetchSource, missingFields });
    }
    const candidate = {};
    for (const field of REQUIRED_FIELDS) candidate[field] = normalizedValues[field];
    return createMarketData(candidate);
  } catch (error) {
    if (error instanceof MarketDataValidationError && error.code === 'MISSING_REQUIRED_FIELD') {
      return failure(ERROR_CODES.MISSING_MARKETDATA_FIELD, error.message, { providerId: normalizedValues.fetchSource, missingFields: [error.field] });
    }
    return failure(ERROR_CODES.INVALID_MARKETDATA_FIELD, error.message, { providerId: normalizedValues.fetchSource });
  }
}

async function produceMarketData(request) {
  const requestFailure = validateRequest(request);
  if (requestFailure) return requestFailure;
  const timeoutMs = request.timeoutMs || DEFAULT_TIMEOUT_MS;
  const maxRetries = request.maxRetries === undefined ? DEFAULT_MAX_RETRIES : request.maxRetries;
  if (!isProviderSupported(request.providerFramework, request.providerId)) {
    return failure(ERROR_CODES.UNSUPPORTED_PROVIDER, 'Unsupported Provider Framework provider.', { requestId: request.requestId, providerId: request.providerId, attempts: 0 });
  }
  let attempts = 0;
  let lastFailure;
  while (attempts <= maxRetries) {
    attempts += 1;
    let providerResult;
    try {
      providerResult = await withTimeout(fetchFromProviderFramework(request.providerFramework, request.providerId, request.assetId, request.requestedAt), timeoutMs);
    } catch (error) {
      providerResult = { ok: false, errorCode: ERROR_CODES.PROVIDER_UNAVAILABLE, errorMessage: error.message || 'Provider Framework provider is unavailable.' };
    }
    if (providerResult && providerResult.ok === false) {
      const code = PROVIDER_ERROR_MAP[providerResult.errorCode] || ERROR_CODES.PROVIDER_MALFORMED_RESPONSE;
      const canRetry = RETRYABLE_PROVIDER_ERRORS.includes(code) && attempts <= maxRetries;
      lastFailure = providerFailureFromResult({ ...providerResult, errorCode: code }, request, attempts, canRetry);
      if (canRetry) continue;
      return lastFailure;
    }
    if (!isPlainObject(providerResult)) {
      return failure(ERROR_CODES.PROVIDER_MALFORMED_RESPONSE, 'Provider Framework returned a malformed response.', { requestId: request.requestId, providerId: request.providerId, attempts });
    }
    if (providerResult.providerId !== request.providerId) {
      return failure(ERROR_CODES.NORMALIZATION_FAILED, 'ProviderResult.providerId must match the requested provider.', { requestId: request.requestId, providerId: request.providerId, attempts });
    }
    const normalized = normalizeProviderResult({ ...providerResult, requestedAt: request.requestedAt });
    if (normalized.ok === false) return Object.freeze({ ...normalized, requestId: request.requestId, providerId: request.providerId, attempts, failedAt: Date.now() });
    const marketData = mapToMarketData(normalized);
    if (marketData.ok === false) return Object.freeze({ ...marketData, requestId: request.requestId, providerId: request.providerId, attempts, failedAt: Date.now() });
    return Object.freeze({ ok: true, requestId: request.requestId, providerId: request.providerId, marketData, attempts, completedAt: Date.now() });
  }
  return lastFailure;
}

module.exports = Object.freeze({
  DEFAULT_TIMEOUT_MS,
  DEFAULT_MAX_RETRIES,
  ERROR_CODES,
  produceMarketData,
  normalizeProviderResult,
  mapToMarketData,
});
