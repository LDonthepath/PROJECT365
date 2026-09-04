'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { ProviderRegistry, BaseProvider, BaseProviderFactory, providerError, providerResult, ERROR_CODES: PROVIDER_ERRORS } = require('../src/providerFramework');
const { produceMarketData, normalizeProviderResult, ERROR_CODES } = require('../src/dataService');

const normalized = Object.freeze({ asset: { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' }, market: { priceUsd: 65000, change1h: 1, change24h: 2, volume24hUsd: 10, marketCapUsd: 20, totalMarketCapUsd: 100, total3MarketCap: 40, btcDominance: 50, usdtDominance: 5, usdcDominance: 4, ath: 70000, atl: 1 }, supply: { circulatingSupply: 19 } });
class Provider extends BaseProvider { constructor(result) { super({ id: 'approved-provider', name: 'Approved', version: '1' }); this.result = result; } fetch() { return this.result; } }
class Factory extends BaseProviderFactory { constructor(result) { super({ providerId: 'approved-provider', version: '1' }); this.result = result; } create() { return new Provider(this.result); } capabilities() { return []; } }
function registry(result) { const value = result || providerResult({ providerId: 'approved-provider', providerName: 'Approved', providerVersion: '1', capability: 'market-data', fetchedAt: 1710000000000, payload: { format: 'normalized', normalized }, attribution: { source: 'Approved' } }); const valueRegistry = new ProviderRegistry(); valueRegistry.register({ providerId: 'approved-provider', name: 'Approved', version: '1', capabilities: [] }, new Factory(value)); return valueRegistry; }
function request(overrides = {}) { return { requestId: 'request-1', providerId: 'approved-provider', assetId: 'bitcoin', requestedAt: 1710000000000, providerFramework: registry(), ...overrides }; }

test('DataService consumes the ProviderRegistry ProviderResult contract and returns immutable canonical MarketData', async () => {
  const result = await produceMarketData(request());
  assert.equal(result.ok, true); assert.equal(result.marketData.priceUsd, 65000); assert.equal(result.marketData.fetchSource, 'approved-provider'); assert.equal(Object.isFrozen(result.marketData), true);
});
test('DataService rejects unsupported registries and malformed ProviderResults deterministically', async () => {
  assert.equal((await produceMarketData(request({ providerId: 'missing' }))).errorCode, ERROR_CODES.UNSUPPORTED_PROVIDER);
  assert.equal(normalizeProviderResult({ providerId: 'x' }).errorCode, ERROR_CODES.PROVIDER_MALFORMED_RESPONSE);
  const bad = providerResult({ providerId: 'approved-provider', providerName: 'Approved', providerVersion: '1', capability: 'market-data', fetchedAt: 1, payload: { format: 'normalized', normalized: { ...normalized, market: { ...normalized.market, btcDominance: 101 } } }, attribution: { source: 'Approved' } });
  assert.equal((await produceMarketData(request({ providerFramework: registry(bad) }))).errorCode, ERROR_CODES.INVALID_MARKETDATA_FIELD);
});
test('DataService maps ProviderError semantics without creating a partial MarketData', async () => {
  const failed = providerError({ code: PROVIDER_ERRORS.TIMEOUT, providerId: 'approved-provider', retryable: false });
  const result = await produceMarketData(request({ providerFramework: registry(failed), maxRetries: 0 }));
  assert.equal(result.errorCode, ERROR_CODES.PROVIDER_TIMEOUT); assert.equal(result.marketData, undefined);
});
