'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { CONTRACT_VERSION: MARKET_DATA_CONTRACT_VERSION, createMarketData } = require('../src/marketData');
const { validate } = require('../src/healthLayer');
const snapshotEngine = require('../src/snapshotEngine');

const {
  CONTRACT_VERSION,
  SNAPSHOT_FIELDS,
  SUPPORTED_ANCHORS,
  createSnapshot,
  getCurrentSnapshot,
  getPreviousSnapshot,
  getHistoricalSnapshots,
  getAnchorSnapshot,
  expireSnapshot,
  resetSnapshotEngineForTest,
  SnapshotEngineError,
} = snapshotEngine;

const HEALTH_TIMESTAMP = 1710000300000;
const SNAPSHOT_TIMESTAMP = 1710000400000;

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
    fetchedAt: HEALTH_TIMESTAMP - 12000,
    fetchSource: 'provider-framework',
    contractVersion: MARKET_DATA_CONTRACT_VERSION,
    ...overrides,
  };
}

function withFixedNow(timestamp, fn) {
  const originalDateNow = Date.now;
  Date.now = () => timestamp;
  try {
    return fn();
  } finally {
    Date.now = originalDateNow;
  }
}

function createValidInputs(overrides = {}) {
  return withFixedNow(HEALTH_TIMESTAMP, () => {
    const marketData = createMarketData(validCandidate(overrides));
    return { marketData, healthStatus: validate(marketData) };
  });
}

function expectSnapshotError(fn, code) {
  assert.throws(
    fn,
    (error) => {
      assert.equal(error instanceof SnapshotEngineError, true);
      assert.equal(error.code, code);
      return true;
    },
  );
}

function assertSnapshotContract(snapshot) {
  assert.deepEqual(Object.keys(snapshot), SNAPSHOT_FIELDS);
  assert.equal(typeof snapshot.id, 'string');
  assert.equal(typeof snapshot.timestamp, 'number');
  assert.equal(typeof snapshot.type, 'string');
  assert.equal(typeof snapshot.contractVersion, 'string');
  assert.ok(snapshot.marketData);
  assert.ok(snapshot.healthStatus);
}

test.beforeEach(() => {
  resetSnapshotEngineForTest();
});

test('createSnapshot returns an immutable approved Snapshot contract for valid MarketData and HealthStatus', () => {
  const { marketData, healthStatus } = createValidInputs();

  const snapshot = withFixedNow(SNAPSHOT_TIMESTAMP, () => createSnapshot(marketData, healthStatus));

  assertSnapshotContract(snapshot);
  assert.deepEqual(snapshot, {
    id: `snapshot-${SNAPSHOT_TIMESTAMP}`,
    timestamp: SNAPSHOT_TIMESTAMP,
    type: 'Live',
    marketData,
    healthStatus,
    contractVersion: CONTRACT_VERSION,
  });
  assert.equal(Object.isFrozen(snapshot), true);
});

test('public snapshot accessors return current, previous, historical, and supported anchor outputs', () => {
  const firstInputs = createValidInputs({ id: 'bitcoin' });
  const secondInputs = createValidInputs({ id: 'ethereum', symbol: 'ETH', name: 'Ethereum' });
  const first = withFixedNow(SNAPSHOT_TIMESTAMP, () => createSnapshot(firstInputs.marketData, firstInputs.healthStatus));
  const second = withFixedNow(SNAPSHOT_TIMESTAMP + 1, () => createSnapshot(secondInputs.marketData, secondInputs.healthStatus));

  assert.equal(getCurrentSnapshot(), second);
  assert.equal(getPreviousSnapshot(), first);
  assert.deepEqual(getHistoricalSnapshots(), [first, second]);
  assert.equal(getAnchorSnapshot(SUPPORTED_ANCHORS[0]), null);
});

test('createSnapshot rejects missing MarketData, missing HealthStatus, and INVALID HealthStatus without side effects', () => {
  const { marketData, healthStatus } = createValidInputs();
  const invalidHealthStatus = Object.freeze({ ...healthStatus, status: 'INVALID', isInvalid: true });

  expectSnapshotError(() => createSnapshot(undefined, healthStatus), 'MISSING_MARKET_DATA');
  expectSnapshotError(() => createSnapshot(marketData, undefined), 'MISSING_HEALTH_STATUS');
  expectSnapshotError(() => createSnapshot(marketData, invalidHealthStatus), 'INVALID_HEALTH_STATUS');
  assert.equal(getCurrentSnapshot(), null);
  assert.deepEqual(getHistoricalSnapshots(), []);
});

test('createSnapshot disambiguates same-millisecond identities and rejects non-positive timestamps without changing existing state', () => {
  const { marketData, healthStatus } = createValidInputs();
  const first = withFixedNow(SNAPSHOT_TIMESTAMP, () => createSnapshot(marketData, healthStatus));

  const second = withFixedNow(SNAPSHOT_TIMESTAMP, () => createSnapshot(marketData, healthStatus));
  assert.equal(second.id, `snapshot-${SNAPSHOT_TIMESTAMP}-1`);
  assert.equal(getCurrentSnapshot(), second);
  assert.deepEqual(getHistoricalSnapshots(), [first, second]);

  resetSnapshotEngineForTest();
  expectSnapshotError(() => withFixedNow(0, () => createSnapshot(marketData, healthStatus)), 'INVALID_SNAPSHOT_TIMESTAMP');
  assert.equal(getCurrentSnapshot(), null);
});

test('snapshot mutation attempts are rejected and stored payload references are not mutated', () => {
  const { marketData, healthStatus } = createValidInputs();
  const snapshot = withFixedNow(SNAPSHOT_TIMESTAMP, () => createSnapshot(marketData, healthStatus));

  assert.throws(() => {
    snapshot.type = 'Archived';
  }, TypeError);
  assert.throws(() => {
    snapshot.source = 'other';
  }, TypeError);
  assert.equal(snapshot.type, 'Live');
  assert.equal(Object.prototype.hasOwnProperty.call(snapshot, 'source'), false);
  assert.throws(() => { snapshot.marketData.priceUsd = 1; }, TypeError);
  assert.equal(snapshot.marketData.priceUsd, marketData.priceUsd);
});

test('first snapshot has no previous snapshot and second snapshot deterministically moves first current to previous', () => {
  const firstInputs = createValidInputs({ id: 'bitcoin' });
  const secondInputs = createValidInputs({ id: 'ethereum', symbol: 'ETH', name: 'Ethereum' });
  const first = withFixedNow(SNAPSHOT_TIMESTAMP, () => createSnapshot(firstInputs.marketData, firstInputs.healthStatus));

  assert.equal(getCurrentSnapshot(), first);
  assert.equal(getPreviousSnapshot(), null);

  const second = withFixedNow(SNAPSHOT_TIMESTAMP + 1, () => createSnapshot(secondInputs.marketData, secondInputs.healthStatus));
  assert.equal(getCurrentSnapshot(), second);
  assert.equal(getPreviousSnapshot(), first);
});

test('unsupported anchor is rejected', () => {
  expectSnapshotError(() => getAnchorSnapshot('Unsupported'), 'UNSUPPORTED_ANCHOR');
});

test('expired snapshot is marked Expired without mutating payload', () => {
  const { marketData, healthStatus } = createValidInputs();
  const snapshot = withFixedNow(SNAPSHOT_TIMESTAMP, () => createSnapshot(marketData, healthStatus));
  const expired = withFixedNow(SNAPSHOT_TIMESTAMP + 1, () => expireSnapshot(snapshot));

  assert.equal(expired.type, 'Expired');
  assert.deepEqual(expired.marketData, snapshot.marketData);
  assert.deepEqual(expired.healthStatus, snapshot.healthStatus);
  assert.equal(snapshot.type, 'Live');
  assert.equal(Object.isFrozen(expired), true);
});

test('historical snapshots are returned as an immutable array and cannot mutate Snapshot Engine state', () => {
  const { marketData, healthStatus } = createValidInputs();
  const snapshot = withFixedNow(SNAPSHOT_TIMESTAMP, () => createSnapshot(marketData, healthStatus));
  const historical = getHistoricalSnapshots();

  assert.equal(Object.isFrozen(historical), true);
  assert.throws(() => {
    historical.push(snapshot);
  }, TypeError);
  assert.deepEqual(getHistoricalSnapshots(), [snapshot]);
});

test('Snapshot supports JSON serialization and deserialization without contract loss', () => {
  const { marketData, healthStatus } = createValidInputs();
  const snapshot = withFixedNow(SNAPSHOT_TIMESTAMP, () => createSnapshot(marketData, healthStatus));
  const deserialized = JSON.parse(JSON.stringify(snapshot));

  assert.deepEqual(deserialized, snapshot);
  assert.deepEqual(Object.keys(deserialized), SNAPSHOT_FIELDS);
});
