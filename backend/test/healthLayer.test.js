'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { CONTRACT_VERSION, REQUIRED_FIELDS, createMarketData } = require('../src/marketData');
const { HEALTH_STATUS_FIELDS, validate, getStatus } = require('../src/healthLayer');

const CURRENT_TIMESTAMP = 1710000300000;
const DEFAULT_TTL_MS = 300000;

function validCandidate(overrides = {}) {
  return {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    priceUsd: 65000,
    change1h: -0.5,
    change24h: 2.4,
    volume24hUsd: 12000000000,
    marketCapUsd: 1300000000000,
    totalMarketCapUsd: 2500000000000,
    total3MarketCap: 800000000000,
    btcDominance: 52.5,
    usdtDominance: 4.2,
    usdcDominance: 1.8,
    circulatingSupply: 19700000,
    ath: 73000,
    atl: 67.81,
    fetchedAt: CURRENT_TIMESTAMP - 12000,
    fetchSource: 'provider-framework',
    contractVersion: CONTRACT_VERSION,
    ...overrides,
  };
}

function withFixedNow(timestamp, fn) {
  const originalDateNow = Date.now;
  Date.now = () => timestamp;
  try {
    fn();
  } finally {
    Date.now = originalDateNow;
  }
}

function assertHealthContract(status) {
  assert.deepEqual(Object.keys(status), HEALTH_STATUS_FIELDS);
  assert.equal(typeof status.status, 'string');
  assert.equal(typeof status.timestamp, 'number');
  assert.equal(typeof status.ageMs, 'number');
  assert.equal(typeof status.ageMinutes, 'number');
  assert.equal(typeof status.ttlMs, 'number');
  assert.equal(typeof status.ttlMinutes, 'number');
  assert.equal(typeof status.isFresh, 'boolean');
  assert.equal(typeof status.isStale, 'boolean');
  assert.equal(typeof status.isInvalid, 'boolean');
}

test('validate returns FRESH for valid MarketData within ttlMs and exposes the HealthStatus contract', () => {
  withFixedNow(CURRENT_TIMESTAMP, () => {
    const marketData = createMarketData(validCandidate());
    const status = validate(marketData);

    assertHealthContract(status);
    assert.deepEqual(status, {
      status: 'FRESH',
      timestamp: CURRENT_TIMESTAMP,
      ageMs: 12000,
      ageMinutes: 0.2,
      ttlMs: DEFAULT_TTL_MS,
      ttlMinutes: 5,
      isFresh: true,
      isStale: false,
      isInvalid: false,
    });
  });
});

test('validate returns STALE for valid MarketData exceeding ttlMs', () => {
  withFixedNow(CURRENT_TIMESTAMP, () => {
    const marketData = createMarketData(validCandidate({ fetchedAt: CURRENT_TIMESTAMP - DEFAULT_TTL_MS - 1 }));
    const status = validate(marketData);

    assert.equal(status.status, 'STALE');
    assert.equal(status.ageMs, DEFAULT_TTL_MS + 1);
    assert.equal(status.isStale, true);
  });
});

test('validate returns INVALID for invalid, null, undefined, array, missing field, extra field, and invalid fetchedAt inputs', () => {
  withFixedNow(CURRENT_TIMESTAMP, () => {
    const missingField = validCandidate();
    delete missingField.symbol;

    for (const input of [
      null,
      undefined,
      [],
      validCandidate({ fetchedAt: 0 }),
      validCandidate({ fetchedAt: Number.NaN }),
      missingField,
      { ...validCandidate(), rank: 1 },
    ]) {
      const status = validate(input);
      assertHealthContract(status);
      assert.equal(status.status, 'INVALID');
      assert.equal(status.ageMs, 0);
      assert.equal(status.ageMinutes, 0);
      assert.equal(status.isInvalid, true);
    }
  });
});

test('validate treats exactly ttlMs old as FRESH and ttlMs plus 1 millisecond as STALE', () => {
  withFixedNow(CURRENT_TIMESTAMP, () => {
    assert.equal(validate(createMarketData(validCandidate({ fetchedAt: CURRENT_TIMESTAMP - DEFAULT_TTL_MS }))).status, 'FRESH');
    assert.equal(validate(createMarketData(validCandidate({ fetchedAt: CURRENT_TIMESTAMP - DEFAULT_TTL_MS - 1 }))).status, 'STALE');
  });
});

test('validate returns INVALID for future fetchedAt', () => {
  withFixedNow(CURRENT_TIMESTAMP, () => {
    const status = validate(createMarketData(validCandidate({ fetchedAt: CURRENT_TIMESTAMP + 1 })));

    assert.equal(status.status, 'INVALID');
    assert.equal(status.ageMs, 0);
  });
});

test('validate never mutates MarketData input and returns immutable HealthStatus', () => {
  withFixedNow(CURRENT_TIMESTAMP, () => {
    const marketData = createMarketData(validCandidate());
    const serializedBefore = JSON.stringify(marketData);
    const status = validate(marketData);

    assert.equal(JSON.stringify(marketData), serializedBefore);
    assert.equal(Object.isFrozen(status), true);
    assert.throws(() => {
      status.status = 'STALE';
    }, TypeError);
    assert.equal(status.status, 'FRESH');
  });
});

test('getStatus exposes immutable TTL configuration only', () => {
  const status = getStatus();

  assert.deepEqual(status, {
    ttlMs: DEFAULT_TTL_MS,
    ttlSec: 300,
    ttlMinutes: 5,
  });
  assert.equal(Object.isFrozen(status), true);
  assert.throws(() => {
    status.ttlMs = 1;
  }, TypeError);
});

test('HealthStatus supports JSON serialization and deserialization without contract loss', () => {
  withFixedNow(CURRENT_TIMESTAMP, () => {
    const status = validate(createMarketData(validCandidate()));
    const deserialized = JSON.parse(JSON.stringify(status));

    assert.deepEqual(deserialized, status);
    assert.deepEqual(Object.keys(deserialized), HEALTH_STATUS_FIELDS);
  });
});

test('validate checks MarketData contract completeness for every required field', () => {
  withFixedNow(CURRENT_TIMESTAMP, () => {
    for (const field of REQUIRED_FIELDS) {
      const candidate = validCandidate();
      delete candidate[field];
      assert.equal(validate(candidate).status, 'INVALID');
    }
  });
});
