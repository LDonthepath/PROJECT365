import assert from 'node:assert/strict';
import test from 'node:test';
import { HealthLayer } from '../../../dist/core/health-layer/index.js';

const validMarketData = (fetchedAt = Date.now()) => ({
  id: 'bitcoin',
  symbol: 'BTC',
  name: 'Bitcoin',
  priceUsd: 100000,
  change1h: 0.5,
  change24h: -1.2,
  volume24hUsd: 50000000000,
  marketCapUsd: 2000000000000,
  totalMarketCapUsd: 3500000000000,
  total3MarketCap: 3400000000000,
  btcDominance: 57.2,
  usdtDominance: 4.3,
  usdcDominance: 1.8,
  circulatingSupply: 19800000,
  ath: 120000,
  atl: 67.81,
  fetchedAt,
  fetchSource: 'unit-test',
  contractVersion: '1.0',
});

const assertHealthStatusShape = (status) => {
  assert.equal(typeof status.status, 'string');
  assert.equal(typeof status.timestamp, 'number');
  assert.equal(typeof status.ageMs, 'number');
  assert.equal(typeof status.ageMinutes, 'number');
  assert.equal(typeof status.ttlMs, 'number');
  assert.equal(typeof status.ttlMinutes, 'number');
  assert.equal(typeof status.isFresh, 'boolean');
  assert.equal(typeof status.isStale, 'boolean');
  assert.equal(typeof status.isInvalid, 'boolean');
};

test('validate fresh data', () => {
  const healthLayer = new HealthLayer();
  const status = healthLayer.validate(validMarketData(Date.now()));

  assert.equal(status.status, 'FRESH');
  assert.equal(status.isFresh, true);
  assert.equal(status.isStale, false);
  assert.equal(status.isInvalid, false);
  assertHealthStatusShape(status);
});

test('validate stale data', () => {
  const healthLayer = new HealthLayer({ ttlMs: 300000 });
  const status = healthLayer.validate(validMarketData(Date.now() - 300001));

  assert.equal(status.status, 'STALE');
  assert.equal(status.isFresh, false);
  assert.equal(status.isStale, true);
  assert.equal(status.isInvalid, false);
});

test('validate invalid data', () => {
  const healthLayer = new HealthLayer();
  const input = validMarketData();
  input.priceUsd = Number.NaN;
  const status = healthLayer.validate(input);

  assert.equal(status.status, 'INVALID');
  assert.equal(status.ageMs, 0);
  assert.equal(status.ageMinutes, 0);
  assert.equal(status.isInvalid, true);
});

test('validate null', () => {
  const healthLayer = new HealthLayer();
  const status = healthLayer.validate(null);

  assert.equal(status.status, 'INVALID');
  assert.equal(status.isInvalid, true);
});

test('validate undefined', () => {
  const healthLayer = new HealthLayer();
  const status = healthLayer.validate(undefined);

  assert.equal(status.status, 'INVALID');
  assert.equal(status.isInvalid, true);
});

test('verify ttl configuration', () => {
  const healthLayer = new HealthLayer({ ttlMs: 120000 });
  const status = healthLayer.getStatus();

  assert.deepEqual(status, {
    ttlMs: 120000,
    ttlSec: 120,
    ttlMinutes: 2,
  });
});

test('verify output immutability', () => {
  const healthLayer = new HealthLayer();
  const status = healthLayer.validate(validMarketData());

  assert.throws(() => {
    status.status = 'INVALID';
  }, TypeError);
  assert.equal(status.status, 'FRESH');
});

test('verify MarketData is not mutated', () => {
  const healthLayer = new HealthLayer();
  const marketData = validMarketData();
  const before = JSON.stringify(marketData);

  healthLayer.validate(marketData);

  assert.equal(JSON.stringify(marketData), before);
});
