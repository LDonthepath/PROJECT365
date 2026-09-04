'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { serializeMarketData, deserializeMarketData } = require('../src/marketData');
const {
  DEFAULT_TIMEOUT_MS,
  DEFAULT_MAX_RETRIES,
  ERROR_CODES,
  produceMarketData,
  normalizeProviderResult,
  mapToMarketData,
} = require('../src/dataService');

function providerResult(overrides = {}) {
  const result = {
    providerId: 'approved-provider',
    providerTimestamp: 1710000000000,
    asset: { id: ' bitcoin ', symbol: ' btc ', name: ' Bitcoin ' },
    market: {
      priceUsd: 65000,
      change1h: -0.5,
      change24h: 2.4,
      volume24hUsd: 12000000000,
      marketCapUsd: 1300000000000,
      totalMarketCapUsd: 2500000000000,
      total3MarketCap: 800000000000,
      btcDominance: 52.5,
      ethDominance: 17.5,
      usdtDominance: 4.2,
      usdcDominance: 1.8,
      ath: 73000,
      atl: 67.81,
      ...(overrides.market || {}),
    },
    supply: { circulatingSupply: 19700000, ...(overrides.supply || {}) },
  };
  for (const field of ['providerId', 'providerTimestamp', 'requestedAt', 'asset']) {
    if (Object.prototype.hasOwnProperty.call(overrides, field)) result[field] = overrides[field];
  }
  return result;
}

function framework(fetchMarketData, calls = []) {
  return {
    hasProvider(providerId) {
      return providerId === 'approved-provider';
    },
    fetchMarketData(request) {
      calls.push(request);
      return fetchMarketData(request);
    },
  };
}

function request(overrides = {}) {
  return {
    requestId: 'request-1',
    providerId: 'approved-provider',
    assetId: 'bitcoin',
    requestedAt: 1710000000100,
    providerFramework: framework(() => providerResult()),
    ...overrides,
  };
}

function assertFailure(result, errorCode) {
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, errorCode);
  assert.equal(typeof result.errorMessage, 'string');
  assert.notEqual(result.errorMessage, '');
  assert.equal(typeof result.retryable, 'boolean');
  assert.equal(typeof result.attempts, 'number');
  assert.equal(typeof result.failedAt, 'number');
  assert.equal(Object.isFrozen(result), true);
}

test('produceMarketData exposes approved success contract and immutable MarketData handoff', async () => {
  const result = await produceMarketData(request());
  assert.equal(result.ok, true);
  assert.equal(result.requestId, 'request-1');
  assert.equal(result.providerId, 'approved-provider');
  assert.equal(result.attempts, 1);
  assert.equal(typeof result.completedAt, 'number');
  assert.equal(result.marketData.symbol, 'BTC');
  assert.equal(result.marketData.fetchSource, 'approved-provider');
  assert.equal(result.marketData.fetchedAt, 1710000000000);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.marketData), true);
  assert.equal(deserializeMarketData(serializeMarketData(result.marketData)).symbol, 'BTC');
});

test('normalizeProviderResult trims strings, uppercases symbol, maps all MarketData fields, and rejects numeric strings', () => {
  const normalized = normalizeProviderResult(providerResult());
  const marketData = mapToMarketData(normalized);
  assert.deepEqual(Object.keys(marketData), [
    'id', 'symbol', 'name', 'priceUsd', 'change1h', 'change24h', 'volume24hUsd', 'marketCapUsd', 'totalMarketCapUsd',
    'total3MarketCap', 'btcDominance', 'ethDominance', 'usdtDominance', 'usdcDominance', 'circulatingSupply', 'ath', 'atl', 'fetchedAt',
    'fetchSource', 'contractVersion',
  ]);
  assert.equal(marketData.id, 'bitcoin');
  assert.equal(marketData.symbol, 'BTC');
  assertFailure(normalizeProviderResult(providerResult({ market: { priceUsd: '65000' } })), ERROR_CODES.INVALID_MARKETDATA_FIELD);
});

test('normalizeProviderResult preserves zero and unknown 1h changes without conflation', () => {
  assert.equal(normalizeProviderResult(providerResult({ market: { change1h: 0 } })).change1h, 0);
  assert.equal(normalizeProviderResult(providerResult({ market: { change1h: null } })).change1h, null);
});

test('normalizeProviderResult rejects TOTAL3 above total market cap', () => {
  const result = normalizeProviderResult(providerResult({ market: { total3MarketCap: 2500000000001 } }));
  assertFailure(result, ERROR_CODES.INVALID_MARKETDATA_FIELD);
  assert.match(result.errorMessage, /TOTAL3 market cap/);
});

test('produceMarketData validates required DataServiceRequest fields and optional timeoutMs and maxRetries', async () => {
  for (const field of ['requestId', 'providerId', 'assetId', 'requestedAt']) {
    const candidate = request();
    delete candidate[field];
    assertFailure(await produceMarketData(candidate), ERROR_CODES.INVALID_REQUEST);
  }
  assertFailure(await produceMarketData(request({ timeoutMs: 0 })), ERROR_CODES.INVALID_REQUEST);
  assertFailure(await produceMarketData(request({ maxRetries: -1 })), ERROR_CODES.INVALID_REQUEST);
});

test('unsupported provider is rejected before provider access with zero attempts', async () => {
  const calls = [];
  const providerFramework = framework(() => providerResult(), calls);
  const result = await produceMarketData(request({ providerId: 'unsupported-provider', providerFramework }));
  assertFailure(result, ERROR_CODES.UNSUPPORTED_PROVIDER);
  assert.equal(result.attempts, 0);
  assert.equal(calls.length, 0);
});

test('provider source attribution is required and provider mismatch fails normalization', async () => {
  assertFailure(normalizeProviderResult(providerResult({ providerId: '' })), ERROR_CODES.NORMALIZATION_FAILED);
  const result = await produceMarketData(request({ providerFramework: framework(() => providerResult({ providerId: 'other-provider' })) }));
  assertFailure(result, ERROR_CODES.NORMALIZATION_FAILED);
  assert.equal(result.attempts, 1);
});

test('missing required provider field never creates partial MarketData and returns missingFields', async () => {
  const missing = providerResult();
  delete missing.market.total3MarketCap;
  const normalized = normalizeProviderResult(missing);
  assertFailure(normalized, ERROR_CODES.MISSING_MARKETDATA_FIELD);
  assert.deepEqual(normalized.missingFields, ['total3MarketCap']);
  const result = await produceMarketData(request({ providerFramework: framework(() => missing) }));
  assertFailure(result, ERROR_CODES.MISSING_MARKETDATA_FIELD);
  assert.equal(result.marketData, undefined);
  assert.deepEqual(result.missingFields, ['total3MarketCap']);
});

test('mapToMarketData handles normalized failure, missing fields, invalid fields, dominance boundaries, and requestedAt fallback', () => {
  assertFailure(mapToMarketData({ ok: false }), ERROR_CODES.NORMALIZATION_FAILED);
  const normalized = normalizeProviderResult(providerResult({ providerTimestamp: 0, requestedAt: 1710000000100 }));
  assert.equal(mapToMarketData(normalized).fetchedAt, 1710000000100);
  const missing = { ...normalized };
  delete missing.ath;
  assertFailure(mapToMarketData(missing), ERROR_CODES.MISSING_MARKETDATA_FIELD);
  assertFailure(normalizeProviderResult(providerResult({ market: { btcDominance: 100.1 } })), ERROR_CODES.INVALID_MARKETDATA_FIELD);
  assert.equal(mapToMarketData(normalizeProviderResult(providerResult({ market: { btcDominance: 0, usdtDominance: 100 } }))).usdtDominance, 100);
});

test('default timeout and default retry count are applied to timeout failures', async () => {
  const calls = [];
  const result = await produceMarketData(request({ providerFramework: framework(() => ({ ok: false, errorCode: 'PROVIDER_TIMEOUT' }), calls) }));
  assertFailure(result, ERROR_CODES.PROVIDER_TIMEOUT);
  assert.equal(result.attempts, DEFAULT_MAX_RETRIES + 1);
  assert.equal(result.retryable, false);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].providerId, 'approved-provider');
  assert.equal(DEFAULT_TIMEOUT_MS, 10000);
});

test('provider timeout failures use the per-request retry budget without a second DataService timeout authority', async () => {
  const result = await produceMarketData(request({
    timeoutMs: 1,
    maxRetries: 2,
    providerFramework: framework(() => ({ ok: false, errorCode: 'PROVIDER_TIMEOUT' })),
  }));
  assertFailure(result, ERROR_CODES.PROVIDER_TIMEOUT);
  assert.equal(result.attempts, 3);
  assert.equal(result.retryable, false);
});

test('rate limit is retried only within budget and unavailable maps from thrown provider errors', async () => {
  const rateLimited = await produceMarketData(request({
    maxRetries: 1,
    providerFramework: framework(() => ({ ok: false, errorCode: 'RATE_LIMITED', errorMessage: 'Rate limited.' })),
  }));
  assertFailure(rateLimited, ERROR_CODES.PROVIDER_RATE_LIMITED);
  assert.equal(rateLimited.attempts, 2);

  const unavailable = await produceMarketData(request({
    maxRetries: 0,
    providerFramework: framework(() => { throw new Error('offline'); }),
  }));
  assertFailure(unavailable, ERROR_CODES.PROVIDER_UNAVAILABLE);
  assert.equal(unavailable.attempts, 1);
});

test('malformed provider responses are not retried and provider malformed error is handled', async () => {
  const calls = [];
  const result = await produceMarketData(request({ providerFramework: framework(() => null, calls) }));
  assertFailure(result, ERROR_CODES.PROVIDER_MALFORMED_RESPONSE);
  assert.equal(result.attempts, 1);
  assert.equal(calls.length, 1);

  const providerError = await produceMarketData(request({ providerFramework: framework(() => ({ ok: false, errorCode: 'MALFORMED_RESPONSE' })) }));
  assertFailure(providerError, ERROR_CODES.PROVIDER_MALFORMED_RESPONSE);
  assert.equal(providerError.attempts, 1);
});
