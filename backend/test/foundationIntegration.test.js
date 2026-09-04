'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { ProviderRegistry } = require('../src/providerFramework');
const { produceMarketData } = require('../src/dataService');
const { validate } = require('../src/healthLayer');
const snapshots = require('../src/snapshotEngine');
const { createStorageLayer } = require('../src/storageLayer');
const { createDeltaEngine } = require('../src/deltaEngine');
const { CoinGeckoFactory, definition, PROVIDER_ID } = require('../../providers/coingecko');

function response(body) { return { ok: true, status: 200, headers: { get: () => null }, json: async () => body }; }
function transport(price, total) {
  return async (url) => response(url.endsWith('/global')
    ? { data: { total_market_cap: { usd: total }, market_cap_percentage: { btc: 50, eth: 20, usdt: 5, usdc: 3 } } }
    : [{ id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: price, price_change_percentage_24h: 2, total_volume: 10, market_cap: 20, circulating_supply: 19, ath: 73000, atl: 67, last_updated: new Date(Date.now() - 1).toISOString() }]);
}
function withNow(value, fn) { const original = Date.now; Date.now = () => value; try { return fn(); } finally { Date.now = original; } }

test('real CoinGecko provider crosses registry, DataService, Health, Snapshot, Storage, and Delta boundaries', async () => {
  snapshots.resetSnapshotEngineForTest();
  const registry = new ProviderRegistry();
  assert.equal(registry.register(definition(), new CoinGeckoFactory({ fetchImpl: transport(10, 100) })).status, 'registered');
  const firstResult = await produceMarketData({ requestId: 'first', providerId: PROVIDER_ID, assetId: 'bitcoin', requestedAt: 1710000000000, providerFramework: registry, maxRetries: 0 });
  assert.equal(firstResult.ok, true);
  assert.equal(firstResult.marketData.fetchSource, PROVIDER_ID);
  assert.ok(Math.abs(firstResult.marketData.total3MarketCap - 30) < 1e-9);
  const firstHealth = validate(firstResult.marketData);
  assert.equal(firstHealth.isInvalid, false);
  const first = withNow(1710000000100, () => snapshots.createSnapshot(firstResult.marketData, firstHealth));
  assert.equal(Object.isFrozen(first.marketData), true);
  assert.throws(() => { first.marketData.priceUsd = 999; }, TypeError);

  const storage = createStorageLayer();
  assert.equal(storage.save({ requestId: 'save-first', objectType: 'Snapshot', payload: first, timestamp: first.timestamp }).ok, true);
  assert.equal(storage.load({ requestId: 'load-first', objectType: 'Snapshot', id: first.id }).record.payload.marketData.priceUsd, 10);

  const secondMarketData = { ...firstResult.marketData, priceUsd: 20, fetchedAt: 1710000000200 };
  const secondHealth = withNow(1710000000300, () => validate(secondMarketData));
  const second = withNow(1710000000400, () => snapshots.createSnapshot(secondMarketData, secondHealth));
  assert.equal(storage.save({ requestId: 'save-second', objectType: 'Snapshot', payload: second, timestamp: second.timestamp }).ok, true);
  const delta = createDeltaEngine({ now: () => 1710000000500 }).evaluate({ requestId: 'delta', previousSnapshot: first, currentSnapshot: second });
  assert.equal(delta.ok, true);
  assert.equal(delta.assessment.fieldDeltas.find((field) => field.field === 'priceUsd').absoluteDelta, 10);
});
