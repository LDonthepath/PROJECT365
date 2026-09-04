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

function response(body, status = 200) { return { ok: status >= 200 && status < 300, status, headers: { get: () => null }, json: async () => body }; }
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

test('DataService owns the retry budget while each registry call performs one cancellable provider attempt', async () => {
  for (const maxRetries of [0, 1, 2]) {
    let calls = 0;
    const requestIds = [];
    const registry = new ProviderRegistry();
    registry.register(definition(), new CoinGeckoFactory({ fetchImpl: async (_url, options) => {
      calls += 1;
      requestIds.push(options && options.signal ? 'retry-request' : 'missing-signal');
      return response({}, 503);
    } }));
    const result = await produceMarketData({ requestId: 'retry-request', providerId: PROVIDER_ID, assetId: 'bitcoin', requestedAt: 1710000000000, providerFramework: registry, maxRetries, timeoutMs: 20 });
    assert.equal(result.requestId, 'retry-request');
    assert.equal(result.attempts, maxRetries + 1);
    assert.equal(calls, maxRetries + 1);
    assert.deepEqual(requestIds, Array(maxRetries + 1).fill('retry-request'));
  }

  let authCalls = 0;
  const authRegistry = new ProviderRegistry();
  authRegistry.register(definition(), new CoinGeckoFactory({ fetchImpl: async () => { authCalls += 1; return response({}, 401); } }));
  const auth = await produceMarketData({ requestId: 'auth-request', providerId: PROVIDER_ID, assetId: 'bitcoin', requestedAt: 1710000000000, providerFramework: authRegistry, maxRetries: 2, timeoutMs: 20 });
  assert.equal(auth.attempts, 1);
  assert.equal(authCalls, 1);

  let successfulCalls = 0;
  const successRegistry = new ProviderRegistry();
  successRegistry.register(definition(), new CoinGeckoFactory({ fetchImpl: async (url) => {
    successfulCalls += 1;
    return response(url.endsWith('/global')
      ? { data: { total_market_cap: { usd: 100 }, market_cap_percentage: { btc: 50, eth: 20, usdt: 5, usdc: 3 } } }
      : [{ id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 10, total_volume: 10, market_cap: 20, circulating_supply: 19, ath: 11, atl: 1, last_updated: new Date().toISOString() }]);
  } }));
  const success = await produceMarketData({ requestId: 'success-request', providerId: PROVIDER_ID, assetId: 'bitcoin', requestedAt: 1710000000000, providerFramework: successRegistry, maxRetries: 2, timeoutMs: 20 });
  assert.equal(success.ok, true);
  assert.equal(success.attempts, 1);
  assert.equal(successfulCalls, 2);
});

test('provider timeout aborts HTTP work before DataService retries and leaves no active work', async () => {
  let started = 0;
  let aborted = 0;
  let active = 0;
  const registry = new ProviderRegistry();
  registry.register(definition(), new CoinGeckoFactory({ fetchImpl: async (_url, options) => new Promise((_resolve, reject) => {
    started += 1;
    active += 1;
    options.signal.addEventListener('abort', () => {
      aborted += 1;
      active -= 1;
      const error = new Error('aborted');
      error.name = 'AbortError';
      reject(error);
    }, { once: true });
  }) }));
  const result = await produceMarketData({ requestId: 'timeout-request', providerId: PROVIDER_ID, assetId: 'bitcoin', requestedAt: 1710000000000, providerFramework: registry, maxRetries: 2, timeoutMs: 5 });
  assert.equal(result.errorCode, 'PROVIDER_TIMEOUT');
  assert.equal(result.attempts, 3);
  assert.equal(started, 3);
  assert.equal(aborted, 3);
  assert.equal(active, 0);
});
