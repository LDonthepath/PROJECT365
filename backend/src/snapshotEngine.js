'use strict';

const CONTRACT_VERSION = '1.0';
const LIVE_TYPE = 'Live';
const EXPIRED_TYPE = 'Expired';
const INVALID_HEALTH_STATUS = 'INVALID';

const SNAPSHOT_FIELDS = Object.freeze([
  'id',
  'timestamp',
  'type',
  'marketData',
  'healthStatus',
  'contractVersion',
]);

const SUPPORTED_ANCHORS = Object.freeze([
  'Monthly',
  'Weekly',
  'Daily',
  'Asia',
  'London',
  'NewYork',
  'London Kill Zone',
  'NewYork Kill Zone',
  'M5',
  'M15',
  'H1',
  'H4',
]);

const snapshotIds = new Set();
const historicalSnapshots = [];
const anchorSnapshots = new Map();
let currentSnapshot = null;
let previousSnapshot = null;

class SnapshotEngineError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'SnapshotEngineError';
    this.code = code;
  }
}

function isPlainObject(candidate) {
  return candidate !== null && candidate !== undefined && typeof candidate === 'object' && !Array.isArray(candidate);
}

function assertMarketData(marketData) {
  if (!isPlainObject(marketData)) {
    throw new SnapshotEngineError('MarketData input is required.', 'MISSING_MARKET_DATA');
  }
}

function assertHealthStatus(healthStatus) {
  if (!isPlainObject(healthStatus)) {
    throw new SnapshotEngineError('HealthStatus input is required.', 'MISSING_HEALTH_STATUS');
  }

  if (healthStatus.status === INVALID_HEALTH_STATUS || healthStatus.isInvalid === true) {
    throw new SnapshotEngineError('INVALID HealthStatus is rejected.', 'INVALID_HEALTH_STATUS');
  }
}

function generateSnapshotIdentity(timestamp) {
  const base = `snapshot-${timestamp}`;
  let id = base;
  let collision = 1;
  while (snapshotIds.has(id)) id = `${base}-${collision++}`;
  return id;
}

function assertUniqueIdentity(id) {
  if (snapshotIds.has(id)) {
    throw new SnapshotEngineError('Duplicate snapshot identity is rejected.', 'DUPLICATE_SNAPSHOT_ID');
  }
}

function assertPositiveTimestamp(timestamp) {
  if (typeof timestamp !== 'number' || !Number.isFinite(timestamp) || timestamp <= 0) {
    throw new SnapshotEngineError('Snapshot timestamp must be positive.', 'INVALID_SNAPSHOT_TIMESTAMP');
  }
}

function createFrozenSnapshot({ id, timestamp, type, marketData, healthStatus }) {
  const snapshot = {
    id,
    timestamp,
    type,
    marketData: deepFreeze(clone(marketData)),
    healthStatus: deepFreeze(clone(healthStatus)),
    contractVersion: CONTRACT_VERSION,
  };

  return Object.freeze(snapshot);
}

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function deepFreeze(value) {
  if (!isPlainObject(value) && !Array.isArray(value)) return value;
  for (const key of Object.keys(value)) deepFreeze(value[key]);
  return Object.freeze(value);
}

function storeSnapshot(snapshot) {
  snapshotIds.add(snapshot.id);
  previousSnapshot = currentSnapshot;
  currentSnapshot = snapshot;
  historicalSnapshots.push(snapshot);

  if (SUPPORTED_ANCHORS.includes(snapshot.type)) {
    anchorSnapshots.set(snapshot.type, snapshot);
  }
}

function createSnapshot(marketData, healthStatus) {
  assertMarketData(marketData);
  assertHealthStatus(healthStatus);

  const timestamp = Date.now();
  assertPositiveTimestamp(timestamp);
  const id = generateSnapshotIdentity(timestamp);
  assertUniqueIdentity(id);

  const snapshot = createFrozenSnapshot({
    id,
    timestamp,
    type: LIVE_TYPE,
    marketData,
    healthStatus,
  });

  storeSnapshot(snapshot);
  return snapshot;
}

function getCurrentSnapshot() {
  return currentSnapshot;
}

function getPreviousSnapshot() {
  return previousSnapshot;
}

function getHistoricalSnapshots() {
  return Object.freeze([...historicalSnapshots]);
}

function getAnchorSnapshot(anchorType) {
  if (!SUPPORTED_ANCHORS.includes(anchorType)) {
    throw new SnapshotEngineError('Unsupported anchor is rejected.', 'UNSUPPORTED_ANCHOR');
  }

  return anchorSnapshots.get(anchorType) || null;
}

function expireSnapshot(snapshot) {
  if (!isPlainObject(snapshot)) {
    throw new SnapshotEngineError('Snapshot input is required.', 'MISSING_SNAPSHOT');
  }

  const expiredSnapshot = createFrozenSnapshot({
    id: `${snapshot.id}:expired`,
    timestamp: Date.now(),
    type: EXPIRED_TYPE,
    marketData: snapshot.marketData,
    healthStatus: snapshot.healthStatus,
  });

  return expiredSnapshot;
}

function resetSnapshotEngineForTest() {
  snapshotIds.clear();
  historicalSnapshots.length = 0;
  anchorSnapshots.clear();
  currentSnapshot = null;
  previousSnapshot = null;
}

module.exports = Object.freeze({
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
});
