'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { ProviderRegistry, BaseProviderFactory, ERROR_CODES } = require('../../src/providerFramework');
const { CoinGeckoFactory, CoinGeckoProvider, definition, PROVIDER_ID, ENDPOINT_RESOLVERS, NORMALIZERS } = require('../../../providers/coingecko');

function response(body, status = 200, headers = {}) { return { ok: status >= 200 && status < 300, status, headers: { get: (k) => headers[k.toLowerCase()] || null }, json: async () => body }; }
function globalResponse(usdt = 5) { return { data: { total_market_cap: { usd: 100 }, market_cap_percentage: { btc: 50, eth: 20, usdt, usdc: 3 } } }; }
function marketResponse() { return [{ id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 65000, price_change_percentage_24h: 2, total_volume: 10, market_cap: 20, circulating_supply: 19, ath: 73000, atl: 67.81, last_updated: '2024-03-09T16:00:00.000Z' }]; }

test('CoinGeckoFactory registers through ProviderRegistry and exposes approved capabilities', () => {
  const registry = new ProviderRegistry();
  assert.equal(registry.state, 'empty');
  const result = registry.register(definition(), new CoinGeckoFactory({ fetchImpl: async () => response({ gecko_says: '(V3) To the Moon!' }) }));
  assert.equal(result.status, 'registered');
  assert.equal(registry.state, 'ready');
  assert.equal(registry.supports(PROVIDER_ID, 'market-data'), true);
  assert.equal(registry.supports(PROVIDER_ID, 'news'), false);
  assert.deepEqual(registry.capabilities(PROVIDER_ID).map((c) => c.name), ['market-data', 'token-metadata', 'contract-metadata']);
});

test('ProviderRegistry lifecycle starts empty, uses ready outside operations, and blocks public API after dispose', () => {
  const registry = new ProviderRegistry();
  const factory = new CoinGeckoFactory({ fetchImpl: async () => response({ gecko_says: 'ok' }) });
  assert.equal(factory instanceof BaseProviderFactory, true);
  assert.equal(registry.state, 'empty');
  registry.register(definition(), factory);
  assert.equal(registry.state, 'ready');
  assert.equal(registry.resolve(PROVIDER_ID).status, 'registered');
  assert.equal(registry.state, 'ready');
  const provider = registry.create(PROVIDER_ID);
  assert.equal(provider.state, 'created');
  assert.equal(registry.state, 'ready');
  assert.equal(registry.dispose().status, 'disposed');
  assert.equal(registry.dispose().status, 'disposed');
  assert.equal(registry.resolve(PROVIDER_ID).code, ERROR_CODES.REGISTRY_DISPOSED);
  assert.equal(registry.create(PROVIDER_ID).code, ERROR_CODES.REGISTRY_DISPOSED);
  assert.equal(registry.capabilities(PROVIDER_ID).code, ERROR_CODES.REGISTRY_DISPOSED);
  assert.equal(registry.supports(PROVIDER_ID, 'market-data').code, ERROR_CODES.REGISTRY_DISPOSED);
});

test('CoinGeckoProvider lifecycle follows created, ready, normalizing, ready, disposed', async () => {
  const states = [];
  const provider = new CoinGeckoProvider({ fetchImpl: async (url) => response(url.endsWith('/global') ? globalResponse() : marketResponse()) });
  assert.equal(provider.state, 'created');
  provider.validate();
  assert.equal(provider.state, 'ready');
  const originalNormalize = provider.normalize.bind(provider);
  provider.normalize = (raw, context) => { states.push(provider.state); return originalNormalize(raw, context); };
  await provider.fetch({ capability: 'market-data', coinId: 'bitcoin' });
  assert.deepEqual(states, ['normalizing']);
  assert.equal(provider.state, 'ready');
  provider.dispose();
  assert.equal(provider.state, 'disposed');
});

test('CoinGecko endpoint and normalizer dispatchers are capability maps', () => {
  assert.equal(ENDPOINT_RESOLVERS['market-data']({ coinId: 'bitcoin' }).startsWith('/coins/markets'), true);
  assert.equal(ENDPOINT_RESOLVERS['token-metadata']({ coinId: 'bitcoin' }), '/coins/bitcoin');
  assert.equal(ENDPOINT_RESOLVERS['contract-metadata']({ assetPlatformId: 'ethereum', contractAddress: '0xabc' }), '/coins/ethereum/contract/0xabc');
  assert.equal(NORMALIZERS['market-data']({ asset: marketResponse(), global: globalResponse() }).market.priceUsd, 65000);
  assert.equal(NORMALIZERS['token-metadata']({ id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' }).name, 'Bitcoin');
});

test('CoinGeckoProvider validate, fetch, normalize, health, and dispose succeed with normalized boundary payloads', async () => {
  const provider = new CoinGeckoProvider({ fetchImpl: async (url) => url.endsWith('/ping') ? response({ gecko_says: 'ok' }) : response(url.endsWith('/global') ? globalResponse() : marketResponse()) });
  assert.equal(provider.validate().status, 'valid');
  assert.equal(provider.supports('market-data'), true);
  const fetched = await provider.fetch({ capability: 'market-data', coinId: 'bitcoin', requestId: 'r1' });
  assert.equal(fetched.status, 'success');
  assert.equal(fetched.payload.normalized.asset.id, 'bitcoin');
  assert.equal(Object.prototype.hasOwnProperty.call(fetched.payload, 'raw'), false);
  const health = await provider.health();
  assert.equal(health.status, 'healthy');
  assert.equal(provider.dispose().status, 'disposed');
});

test('TOTAL3 excludes only BTC and ETH dominance, never USDT dominance', () => {
  const fivePercentUsdt = NORMALIZERS['market-data']({ asset: marketResponse(), global: globalResponse(5) });
  const tenPercentUsdt = NORMALIZERS['market-data']({ asset: marketResponse(), global: globalResponse(10) });
  assert.equal(fivePercentUsdt.market.totalMarketCapUsd, 100);
  assert.ok(Math.abs(fivePercentUsdt.market.total3MarketCap - 30) < 1e-9);
  assert.ok(Math.abs(tenPercentUsdt.market.total3MarketCap - 30) < 1e-9);
  assert.equal(fivePercentUsdt.market.usdtDominance, 5);
  assert.equal(tenPercentUsdt.market.usdtDominance, 10);
  assert.equal(NORMALIZERS['market-data']({ asset: marketResponse(), global: { data: { total_market_cap: { usd: 100 }, market_cap_percentage: { btc: 101, eth: 20, usdt: 5, usdc: 3 } } } }), null);
});

test('CoinGeckoProvider returns deterministic ProviderError for unsupported, malformed, timeout, rate limit, and retry exhaustion', async () => {
  let calls = 0;
  const unsupportedProvider = new CoinGeckoProvider({ fetchImpl: async () => { calls += 1; return response({}); } });
  unsupportedProvider.validate();
  const unsupported = await unsupportedProvider.fetch({ capability: 'news' });
  assert.equal(unsupported.code, ERROR_CODES.UNSUPPORTED_CAPABILITY);
  assert.equal(calls, 0);

  const malformedProvider = new CoinGeckoProvider({ fetchImpl: async () => response({ bad: true }) });
  malformedProvider.validate();
  assert.equal((await malformedProvider.fetch({ capability: 'market-data', coinId: 'bitcoin' })).code, ERROR_CODES.MALFORMED_RESPONSE);

  const timeoutProvider = new CoinGeckoProvider({ maxAttempts: 1, fetchImpl: async () => { const e = new Error('aborted'); e.name = 'AbortError'; throw e; } });
  timeoutProvider.validate();
  const timeout = await timeoutProvider.fetch({ capability: 'market-data', coinId: 'bitcoin' });
  assert.equal(timeout.code, ERROR_CODES.RETRY_EXHAUSTED);
  assert.equal(timeout.details.cause, ERROR_CODES.TIMEOUT);

  const rateProvider = new CoinGeckoProvider({ maxAttempts: 1, fetchImpl: async () => response({}, 429, { 'retry-after': '3' }) });
  rateProvider.validate();
  const limited = await rateProvider.fetch({ capability: 'market-data', coinId: 'bitcoin' });
  assert.equal(limited.code, ERROR_CODES.RETRY_EXHAUSTED);
  assert.equal(limited.details.cause, ERROR_CODES.RATE_LIMITED);
});

test('CoinGeckoFactory and provider reject invalid lifecycle state', async () => {
  const factory = new CoinGeckoFactory();
  factory.dispose();
  assert.equal(factory.create(definition()).code, ERROR_CODES.FACTORY_DISPOSED);
  const provider = new CoinGeckoProvider({ fetchImpl: async () => response({}) });
  assert.equal((await provider.fetch({ capability: 'market-data', coinId: 'bitcoin' })).code, ERROR_CODES.STATE_INVALID);
  provider.dispose();
  assert.equal(provider.validate().code, ERROR_CODES.DISPOSED);
});
