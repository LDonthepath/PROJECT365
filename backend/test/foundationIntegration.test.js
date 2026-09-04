'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { ProviderRegistry } = require('../src/providerFramework');
const { CoinGeckoFactory, definition, PROVIDER_ID } = require('../../providers/coingecko');
const { produceMarketData } = require('../src/dataService');
const { validate } = require('../src/healthLayer');
const snapshots = require('../src/snapshotEngine');
const { createStorageLayer } = require('../src/storageLayer');
const { createDeltaEngine } = require('../src/deltaEngine');

function response(body) { return { ok: true, status: 200, headers: { get: () => null }, json: async () => body }; }
test('Foundation integration: CoinGecko Provider Framework → DataService → MarketData → Health → Snapshot → Storage → Delta', async () => {
  snapshots.resetSnapshotEngineForTest();
  const prices = [100, 125]; let marketCall = 0;
  const transport = async (url) => response(url.endsWith('/global')
    ? { data: { total_market_cap: { usd: 1000 }, market_cap_percentage: { btc: 50, eth: 20, usdt: 5, usdc: 4 } } }
    : [{ id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: prices[marketCall++], price_change_percentage_1h_in_currency: 1, price_change_percentage_24h: 2, total_volume: 100, market_cap: 500, circulating_supply: 19, ath: 150, atl: 1 }]);
  const registry = new ProviderRegistry();
  registry.register(definition(), new CoinGeckoFactory({ fetchImpl: transport, maxAttempts: 1 }));
  assert.equal(registry.resolve(PROVIDER_ID).status, 'registered');
  const originalNow = Date.now;
  try {
    Date.now = () => 1710000000000;
    const firstResult = await produceMarketData({ requestId: 'first', providerId: PROVIDER_ID, assetId: 'bitcoin', requestedAt: Date.now(), providerFramework: registry, maxRetries: 0 });
    assert.equal(firstResult.ok, true); assert.equal(firstResult.marketData.fetchSource, PROVIDER_ID); assert.equal(Object.isFrozen(firstResult.marketData), true);
    const firstHealth = validate(firstResult.marketData); assert.equal(firstHealth.status, 'FRESH');
    const first = snapshots.createSnapshot(firstResult.marketData, firstHealth);
    Date.now = () => 1710000001000;
    const secondResult = await produceMarketData({ requestId: 'second', providerId: PROVIDER_ID, assetId: 'bitcoin', requestedAt: Date.now(), providerFramework: registry, maxRetries: 0 });
    const secondHealth = validate(secondResult.marketData); const second = snapshots.createSnapshot(secondResult.marketData, secondHealth);
    assert.throws(() => { second.healthStatus.details = {}; }, TypeError);
    const storage = createStorageLayer();
    assert.equal(storage.save({ requestId: 'store-first', objectType: 'Snapshot', payload: first, timestamp: first.timestamp }).ok, true);
    assert.equal(storage.save({ requestId: 'store-second', objectType: 'Snapshot', payload: second, timestamp: second.timestamp }).ok, true);
    assert.equal(storage.load({ requestId: 'load-second', objectType: 'Snapshot', id: second.id }).record.payload.id, second.id);
    const delta = createDeltaEngine().evaluate({ requestId: 'delta', previousSnapshot: first, currentSnapshot: second, referenceTime: second.timestamp });
    assert.equal(delta.ok, true); assert.deepEqual(delta.explainability.sourceSnapshotIds, [first.id, second.id]);
    assert.equal(delta.assessment.fieldDeltas.find((field) => field.field === 'priceUsd').absoluteDelta, 25);
  } finally { Date.now = originalNow; snapshots.resetSnapshotEngineForTest(); }
});
