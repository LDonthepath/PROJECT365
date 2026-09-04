'use strict';

const { CONTRACT_VERSION, REQUIRED_FIELDS, createMarketData, MarketDataValidationError } = require('./marketData');
const { isProviderError } = require('./providerFramework');

const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_MAX_RETRIES = 1;
const ERROR_CODES = Object.freeze({
  INVALID_REQUEST: 'INVALID_REQUEST', UNSUPPORTED_PROVIDER: 'UNSUPPORTED_PROVIDER', PROVIDER_UNAVAILABLE: 'PROVIDER_UNAVAILABLE',
  PROVIDER_TIMEOUT: 'PROVIDER_TIMEOUT', PROVIDER_RATE_LIMITED: 'PROVIDER_RATE_LIMITED', PROVIDER_MALFORMED_RESPONSE: 'PROVIDER_MALFORMED_RESPONSE',
  MISSING_MARKETDATA_FIELD: 'MISSING_MARKETDATA_FIELD', INVALID_MARKETDATA_FIELD: 'INVALID_MARKETDATA_FIELD', NORMALIZATION_FAILED: 'NORMALIZATION_FAILED',
});
const RETRYABLE_PROVIDER_ERRORS = Object.freeze(['PROVIDER_SOURCE_UNAVAILABLE', 'PROVIDER_TIMEOUT', 'PROVIDER_RATE_LIMITED', 'PROVIDER_RETRY_EXHAUSTED']);
const MARKET_FIELD_PATHS = Object.freeze({
  priceUsd: ['market', 'priceUsd'], change1h: ['market', 'change1h'], change24h: ['market', 'change24h'], volume24hUsd: ['market', 'volume24hUsd'], marketCapUsd: ['market', 'marketCapUsd'], totalMarketCapUsd: ['market', 'totalMarketCapUsd'], total3MarketCap: ['market', 'total3MarketCap'], btcDominance: ['market', 'btcDominance'], usdtDominance: ['market', 'usdtDominance'], usdcDominance: ['market', 'usdcDominance'], circulatingSupply: ['supply', 'circulatingSupply'], ath: ['market', 'ath'], atl: ['market', 'atl'],
});
const STRING_PROVIDER_FIELDS = Object.freeze({ id: ['asset', 'id'], symbol: ['asset', 'symbol'], name: ['asset', 'name'] });
const NON_NEGATIVE_MARKET_FIELDS = Object.freeze(['priceUsd', 'volume24hUsd', 'marketCapUsd', 'totalMarketCapUsd', 'total3MarketCap', 'circulatingSupply', 'ath', 'atl']);
const DOMINANCE_FIELDS = Object.freeze(['btcDominance', 'usdtDominance', 'usdcDominance']);

function isPlainObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function failure(errorCode, errorMessage, options = {}) { return Object.freeze({ ok: false, requestId: options.requestId || '', errorCode, errorMessage, retryable: Boolean(options.retryable), attempts: options.attempts || 0, failedAt: Date.now(), ...(options.providerId ? { providerId: options.providerId } : {}), ...(options.missingFields ? { missingFields: Object.freeze([...options.missingFields]) } : {}) }); }
function validateRequest(request) {
  if (!isPlainObject(request)) return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest must be an object.');
  for (const field of ['requestId', 'providerId', 'assetId']) if (typeof request[field] !== 'string' || request[field].trim() === '') return failure(ERROR_CODES.INVALID_REQUEST, `DataServiceRequest.${field} must be a non-empty string.`, { requestId: request.requestId, providerId: request.providerId });
  if (!Number.isFinite(request.requestedAt) || request.requestedAt <= 0) return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.requestedAt must be a positive Unix epoch millisecond timestamp.', { requestId: request.requestId, providerId: request.providerId });
  if (request.timeoutMs !== undefined && (!Number.isFinite(request.timeoutMs) || request.timeoutMs <= 0)) return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.timeoutMs must be greater than 0 when provided.', { requestId: request.requestId, providerId: request.providerId });
  if (request.maxRetries !== undefined && (!Number.isInteger(request.maxRetries) || request.maxRetries < 0)) return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.maxRetries must be a non-negative integer when provided.', { requestId: request.requestId, providerId: request.providerId });
  if (!isPlainObject(request.providerFramework) || typeof request.providerFramework.resolve !== 'function' || typeof request.providerFramework.create !== 'function') return failure(ERROR_CODES.INVALID_REQUEST, 'DataServiceRequest.providerFramework must implement the ProviderRegistry contract.', { requestId: request.requestId, providerId: request.providerId });
  return null;
}
function valueAt(object, path) { return path.reduce((current, segment) => isPlainObject(current) ? current[segment] : undefined, object); }
function providerFailure(providerError, request, attempts, retryable) {
  const map = { PROVIDER_TIMEOUT: ERROR_CODES.PROVIDER_TIMEOUT, PROVIDER_RATE_LIMITED: ERROR_CODES.PROVIDER_RATE_LIMITED, PROVIDER_SOURCE_UNAVAILABLE: ERROR_CODES.PROVIDER_UNAVAILABLE, PROVIDER_RETRY_EXHAUSTED: ERROR_CODES.PROVIDER_UNAVAILABLE };
  return failure(map[providerError.code] || ERROR_CODES.PROVIDER_MALFORMED_RESPONSE, providerError.message || 'Provider Framework returned an error.', { requestId: request.requestId, providerId: request.providerId, attempts, retryable });
}
function normalizeProviderResult(providerResult) {
  if (!isPlainObject(providerResult) || providerResult.status !== 'success' || !isPlainObject(providerResult.payload) || providerResult.payload.format !== 'normalized' || !isPlainObject(providerResult.payload.normalized)) return failure(ERROR_CODES.PROVIDER_MALFORMED_RESPONSE, 'ProviderResult must be a successful normalized Provider Framework result.');
  if (typeof providerResult.providerId !== 'string' || providerResult.providerId.trim() === '' || !isPlainObject(providerResult.attribution)) return failure(ERROR_CODES.NORMALIZATION_FAILED, 'ProviderResult provider attribution is required.');
  const payload = providerResult.payload.normalized;
  const normalized = { fetchedAt: providerResult.fetchedAt, fetchSource: providerResult.providerId, contractVersion: CONTRACT_VERSION };
  const missingFields = [];
  for (const [field, path] of Object.entries(STRING_PROVIDER_FIELDS)) { const value = valueAt(payload, path); if (typeof value !== 'string' || value.trim() === '') missingFields.push(field); else normalized[field] = field === 'symbol' ? value.trim().toUpperCase() : value.trim(); }
  for (const [field, path] of Object.entries(MARKET_FIELD_PATHS)) { const value = valueAt(payload, path); if (value === undefined) missingFields.push(field); else normalized[field] = value; }
  if (missingFields.length) return failure(ERROR_CODES.MISSING_MARKETDATA_FIELD, 'ProviderResult is missing required MarketData fields.', { providerId: providerResult.providerId, missingFields });
  for (const field of Object.keys(MARKET_FIELD_PATHS)) if (!Number.isFinite(normalized[field])) return failure(ERROR_CODES.INVALID_MARKETDATA_FIELD, `Invalid MarketData field after normalization: ${field}.`, { providerId: providerResult.providerId });
  for (const field of NON_NEGATIVE_MARKET_FIELDS) if (normalized[field] < 0) return failure(ERROR_CODES.INVALID_MARKETDATA_FIELD, `MarketData field must be non-negative: ${field}.`, { providerId: providerResult.providerId });
  for (const field of DOMINANCE_FIELDS) if (normalized[field] < 0 || normalized[field] > 100) return failure(ERROR_CODES.INVALID_MARKETDATA_FIELD, `Dominance field must be between 0 and 100 inclusive: ${field}.`, { providerId: providerResult.providerId });
  if (!Number.isFinite(normalized.fetchedAt) || normalized.fetchedAt <= 0) return failure(ERROR_CODES.INVALID_MARKETDATA_FIELD, 'ProviderResult.fetchedAt must be a positive Unix epoch millisecond timestamp.', { providerId: providerResult.providerId });
  return Object.freeze(normalized);
}
function mapToMarketData(normalizedValues) { try { if (!isPlainObject(normalizedValues) || normalizedValues.ok === false) return failure(ERROR_CODES.NORMALIZATION_FAILED, 'Normalized values are required before MarketData creation.'); return createMarketData(Object.fromEntries(REQUIRED_FIELDS.map((field) => [field, normalizedValues[field]]))); } catch (error) { return failure(error instanceof MarketDataValidationError && error.code === 'MISSING_REQUIRED_FIELD' ? ERROR_CODES.MISSING_MARKETDATA_FIELD : ERROR_CODES.INVALID_MARKETDATA_FIELD, error.message, { providerId: normalizedValues && normalizedValues.fetchSource }); } }
async function produceMarketData(request) {
  const invalid = validateRequest(request); if (invalid) return invalid;
  const entry = request.providerFramework.resolve(request.providerId);
  if (isProviderError(entry)) return failure(ERROR_CODES.UNSUPPORTED_PROVIDER, 'Unsupported Provider Framework provider.', { requestId: request.requestId, providerId: request.providerId });
  const maxRetries = request.maxRetries ?? DEFAULT_MAX_RETRIES;
  for (let attempts = 1; attempts <= maxRetries + 1; attempts += 1) {
    const provider = request.providerFramework.create(request.providerId);
    if (isProviderError(provider)) return providerFailure(provider, request, attempts, false);
    const valid = provider.validate();
    if (isProviderError(valid)) return providerFailure(valid, request, attempts, false);
    let result;
    try { result = await provider.fetch({ capability: 'market-data', coinId: request.assetId, requestId: request.requestId, timeoutMs: request.timeoutMs ?? DEFAULT_TIMEOUT_MS }); } catch (error) { result = { code: 'PROVIDER_SOURCE_UNAVAILABLE', message: error.message }; }
    provider.dispose();
    if (isProviderError(result)) { const retryable = RETRYABLE_PROVIDER_ERRORS.includes(result.code) && attempts <= maxRetries; if (retryable) continue; return providerFailure(result, request, attempts, false); }
    if (!isPlainObject(result) || result.providerId !== request.providerId) return failure(ERROR_CODES.NORMALIZATION_FAILED, 'ProviderResult.providerId must match the requested provider.', { requestId: request.requestId, providerId: request.providerId, attempts });
    const normalized = normalizeProviderResult(result); if (normalized.ok === false) return Object.freeze({ ...normalized, requestId: request.requestId, providerId: request.providerId, attempts });
    const marketData = mapToMarketData(normalized); if (marketData.ok === false) return Object.freeze({ ...marketData, requestId: request.requestId, providerId: request.providerId, attempts });
    return Object.freeze({ ok: true, requestId: request.requestId, providerId: request.providerId, marketData, attempts, completedAt: Date.now() });
  }
}
module.exports = Object.freeze({ DEFAULT_TIMEOUT_MS, DEFAULT_MAX_RETRIES, ERROR_CODES, produceMarketData, normalizeProviderResult, mapToMarketData });
