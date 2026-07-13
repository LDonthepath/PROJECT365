import assert from 'node:assert/strict';
import test from 'node:test';
import { HealthLayer } from '../../../dist/core/health/index.js';

const validMarketData = (fetchedAt = 1783900800000) => ({
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

test('valid MarketData within TTL returns FRESH', () => {
  const healthLayer = new HealthLayer({ ttlMs: 300000 });
  const status = healthLayer.validate(validMarketData(), 1783900920000);

  assert.deepEqual(status, {
    status: 'FRESH',
    timestamp: 1783900920000,
    ageMs: 120000,
    ageMinutes: 2,
    ttlMs: 300000,
    ttlMinutes: 5,
    isFresh: true,
    isStale: false,
    isInvalid: false,
  });
});

test('valid MarketData beyond TTL returns STALE', () => {
  const healthLayer = new HealthLayer({ ttlMs: 300000 });
  const status = healthLayer.validate(validMarketData(), 1783901220001);

  assert.equal(status.status, 'STALE');
  assert.equal(status.ageMs, 420001);
  assert.equal(status.ageMinutes, 7.000016666666666);
  assert.equal(status.isFresh, false);
  assert.equal(status.isStale, true);
  assert.equal(status.isInvalid, false);
});

test('invalid MarketData returns INVALID', () => {
  const healthLayer = new HealthLayer();
  const input = validMarketData();
  input.priceUsd = Number.NaN;

  const status = healthLayer.validate(input, 1783900800000);

  assert.equal(status.status, 'INVALID');
  assert.equal(status.ageMs, 0);
  assert.equal(status.ageMinutes, 0);
  assert.equal(status.isInvalid, true);
});

test('null MarketData returns INVALID', () => {
  const healthLayer = new HealthLayer();
  const status = healthLayer.validate(null, 1783900800000);

  assert.equal(status.status, 'INVALID');
  assert.equal(status.isInvalid, true);
});

test('undefined MarketData returns INVALID', () => {
  const healthLayer = new HealthLayer();
  const status = healthLayer.validate(undefined, 1783900800000);

  assert.equal(status.status, 'INVALID');
  assert.equal(status.isInvalid, true);
});

test('ttl configuration is exposed', () => {
  const healthLayer = new HealthLayer({ ttlMs: 600000 });

  assert.deepEqual(healthLayer.getStatus(), {
    ttlMs: 600000,
    ttlSec: 600,
    ttlMinutes: 10,
  });
});

test('HealthStatus output is immutable', () => {
  const healthLayer = new HealthLayer();
  const status = healthLayer.validate(validMarketData(), 1783900800000);

  assert.throws(() => {
    status.status = 'INVALID';
  }, TypeError);
  assert.equal(status.status, 'FRESH');
});

test('MarketData is not mutated', () => {
  const healthLayer = new HealthLayer();
  const input = validMarketData();
  const before = structuredClone(input);

  healthLayer.validate(input, 1783900800000);

  assert.deepEqual(input, before);
});
