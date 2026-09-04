'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { ProviderRegistry, ERROR_CODES } = require('../../src/providerFramework');
const { CoinGeckoFactory, CoinGeckoProvider, definition, PROVIDER_ID, NORMALIZERS } = require('../../../providers/coingecko');
function response(body, status = 200) { return { ok: status >= 200 && status < 300, status, headers: { get: () => null }, json: async () => body }; }
const market = [{ id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 65000, price_change_percentage_1h_in_currency: 1, price_change_percentage_24h: 2, total_volume: 10, market_cap: 20, circulating_supply: 19, ath: 70000, atl: 1 }];
const global = { data: { total_market_cap: { usd: 100 }, market_cap_percentage: { btc: 50, eth: 20, usdt: 5, usdc: 4 } } };
function transport(url) { return Promise.resolve(response(url.endsWith('/global') ? global : url.endsWith('/ping') ? { gecko_says: 'ok' } : market)); }
test('CoinGecko registers through ProviderRegistry and returns a normalized ProviderResult', async () => {
  const registry = new ProviderRegistry(); registry.register(definition(), new CoinGeckoFactory({ fetchImpl: transport }));
  assert.equal(registry.resolve(PROVIDER_ID).status, 'registered'); assert.equal(registry.supports(PROVIDER_ID, 'market-data'), true);
  const provider = registry.create(PROVIDER_ID); assert.equal(provider.validate().status, 'valid');
  const result = await provider.fetch({ capability: 'market-data', coinId: 'bitcoin', requestId: 'r1' });
  assert.equal(result.status, 'success'); assert.equal(result.payload.normalized.asset.id, 'bitcoin'); assert.equal(result.payload.normalized.market.total3MarketCap, 25); assert.equal(result.attribution.source, 'CoinGecko');
});
test('CoinGecko market normalizer rejects incomplete global data and provider lifecycle remains enforced', async () => {
  assert.equal(NORMALIZERS['market-data']({ market, global: {} }), null);
  const provider = new CoinGeckoProvider({ fetchImpl: transport });
  assert.equal((await provider.fetch({ capability: 'market-data', coinId: 'bitcoin' })).code, ERROR_CODES.STATE_INVALID);
  provider.validate(); assert.equal((await provider.health()).status, 'healthy'); provider.dispose(); assert.equal(provider.validate().code, ERROR_CODES.DISPOSED);
});
