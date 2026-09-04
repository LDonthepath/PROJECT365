'use strict';

const CONTRACT_VERSION = '1.0';
const APPROVED_CONSUMERS = Object.freeze(['Triad Liquidity Framework']);
const SNAPSHOT_CONTRACT_VERSION = '1.0';
const DEFAULT_MAX_SNAPSHOT_AGE_MS = 24 * 60 * 60 * 1000;

const DELTA_FIELDS = Object.freeze([
  'priceUsd',
  'change1h',
  'change24h',
  'volume24hUsd',
  'marketCapUsd',
  'totalMarketCapUsd',
  'total3MarketCap',
  'btcDominance',
  'ethDominance',
  'usdtDominance',
  'usdcDominance',
  'circulatingSupply',
  'ath',
  'atl',
]);
// ATH, ATL, and circulating supply remain generic scalar deltas for contract
// compatibility. Their regime interpretation is intentionally deferred to a
// downstream consumer; this engine does not imply that they are price returns.

const ERROR_CODES = Object.freeze({
  INVALID_REQUEST: 'INVALID_REQUEST',
  MISSING_SNAPSHOT: 'MISSING_SNAPSHOT',
  MALFORMED_SNAPSHOT: 'MALFORMED_SNAPSHOT',
  STALE_SNAPSHOT: 'STALE_SNAPSHOT',
  DEPENDENCY_ORDER_VIOLATION: 'DEPENDENCY_ORDER_VIOLATION',
  INSUFFICIENT_SNAPSHOT_HISTORY: 'INSUFFICIENT_SNAPSHOT_HISTORY',
  UNAUTHORIZED_CONSUMER: 'UNAUTHORIZED_CONSUMER',
  DELTA_UNAVAILABLE: 'DELTA_UNAVAILABLE',
});
const DOMINANCE_FIELDS = Object.freeze(['btcDominance', 'ethDominance', 'usdtDominance', 'usdcDominance']);

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function isPositiveNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function deepFreeze(value) {
  if (!isPlainObject(value) && !Array.isArray(value)) return value;
  for (const key of Object.keys(value)) deepFreeze(value[key]);
  return Object.freeze(value);
}

function error(code, message, request = {}, fields = {}) {
  return deepFreeze({
    ok: false,
    errorCode: code,
    errorMessage: message,
    requestId: isNonEmptyString(request.requestId) ? request.requestId : undefined,
    validationStatus: 'Rejected',
    rejectedAt: Date.now(),
    ...fields,
  });
}

function validateRequest(request) {
  if (!isPlainObject(request) || !isNonEmptyString(request.requestId)) {
    return error(ERROR_CODES.INVALID_REQUEST, 'Request with non-empty requestId is required.', isPlainObject(request) ? request : {});
  }
  return null;
}

function validateSnapshot(snapshot, role, referenceTime, maxSnapshotAgeMs) {
  if (!isPlainObject(snapshot)) return { code: ERROR_CODES.MISSING_SNAPSHOT, message: `${role} snapshot is required.` };
  if (!isNonEmptyString(snapshot.id) || !isPositiveNumber(snapshot.timestamp) || !isPlainObject(snapshot.marketData) || !isPlainObject(snapshot.healthStatus) || snapshot.contractVersion !== SNAPSHOT_CONTRACT_VERSION) {
    return { code: ERROR_CODES.MALFORMED_SNAPSHOT, message: `${role} snapshot contract is malformed.` };
  }
  for (const field of DELTA_FIELDS) {
    if (field === 'change1h' && snapshot.marketData[field] === null) continue;
    if (typeof snapshot.marketData[field] !== 'number' || !Number.isFinite(snapshot.marketData[field])) {
      return { code: ERROR_CODES.MALFORMED_SNAPSHOT, message: `${role} snapshot MarketData field is malformed: ${field}.` };
    }
  }
  if (referenceTime - snapshot.timestamp > maxSnapshotAgeMs) return { code: ERROR_CODES.STALE_SNAPSHOT, message: `${role} snapshot is stale.` };
  return null;
}

function calculateFieldDelta(current, previous, field) {
  const currentValue = current.marketData[field];
  const previousValue = previous.marketData[field];
  const delta = {
    field,
    currentValue,
    previousValue,
    absoluteDelta: currentValue === null || previousValue === null ? null : currentValue - previousValue,
    percentDelta: currentValue === null || previousValue === null || previousValue === 0 ? null : ((currentValue - previousValue) / previousValue) * 100,
  };
  if (DOMINANCE_FIELDS.includes(field)) delta.deltaUnit = 'percentage-points';
  return Object.freeze(delta);
}

function createDeltaEngine(options = {}) {
  const now = typeof options.now === 'function' ? options.now : Date.now;
  const maxSnapshotAgeMs = options.maxSnapshotAgeMs === undefined ? DEFAULT_MAX_SNAPSHOT_AGE_MS : options.maxSnapshotAgeMs;
  let latestDeltaContract = null;

  function evaluate(request) {
    const invalid = validateRequest(request);
    if (invalid) return invalid;
    const referenceTime = request.referenceTime === undefined ? now() : request.referenceTime;
    if (!isPositiveNumber(referenceTime)) return error(ERROR_CODES.INVALID_REQUEST, 'Positive referenceTime is required.', request);
    const currentInvalid = validateSnapshot(request.currentSnapshot, 'Current', referenceTime, maxSnapshotAgeMs);
    if (currentInvalid) return error(currentInvalid.code, currentInvalid.message, request, { rejectionReason: currentInvalid.message });
    const previousInvalid = validateSnapshot(request.previousSnapshot, 'Previous', referenceTime, maxSnapshotAgeMs);
    if (previousInvalid) return error(previousInvalid.code, previousInvalid.message, request, { rejectionReason: previousInvalid.message });
    if (request.currentSnapshot.id === request.previousSnapshot.id) return error(ERROR_CODES.INSUFFICIENT_SNAPSHOT_HISTORY, 'Two distinct immutable snapshots are required.', request);
    if (request.previousSnapshot.timestamp >= request.currentSnapshot.timestamp) return error(ERROR_CODES.DEPENDENCY_ORDER_VIOLATION, 'Previous snapshot must precede current snapshot.', request);

    const fieldDeltas = DELTA_FIELDS.map((field) => calculateFieldDelta(request.currentSnapshot, request.previousSnapshot, field));
    const contract = deepFreeze({
      ok: true,
      contractId: `delta-${request.previousSnapshot.id}-${request.currentSnapshot.id}`,
      contractVersion: CONTRACT_VERSION,
      evaluatedAt: referenceTime,
      upstreamDependencies: [
        { module: 'Snapshot Engine', contract: 'Snapshot', id: request.previousSnapshot.id, timestamp: request.previousSnapshot.timestamp },
        { module: 'Snapshot Engine', contract: 'Snapshot', id: request.currentSnapshot.id, timestamp: request.currentSnapshot.timestamp },
        { module: 'Storage Layer', contract: 'SnapshotRecord', ids: [request.previousSnapshot.id, request.currentSnapshot.id] },
      ],
      assessment: { snapshotWindowMs: request.currentSnapshot.timestamp - request.previousSnapshot.timestamp, fieldDeltas },
      explainability: {
        summary: 'Delta Contract compares numeric MarketData values across two immutable Snapshot records.',
        rationale: 'Absolute and percentage deltas are calculated from previous and current Snapshot MarketData values only. Dominance absoluteDelta values and deltaUnit are percentage points; percentDelta remains the relative percentage change for backward compatibility.',
        sourceSnapshotIds: [request.previousSnapshot.id, request.currentSnapshot.id],
      },
      audit: { requestId: request.requestId, producedBy: 'Delta Engine', approvedConsumer: APPROVED_CONSUMERS[0], traceable: true },
      validationStatus: 'Accepted',
      rejectionReason: null,
    });
    latestDeltaContract = contract;
    return contract;
  }

  function getDeltaContract(request) {
    const invalid = validateRequest(request);
    if (invalid) return invalid;
    if (!APPROVED_CONSUMERS.includes(request.consumerId)) return error(ERROR_CODES.UNAUTHORIZED_CONSUMER, 'Consumer is not approved for Delta Contract access.', request);
    if (!latestDeltaContract) return error(ERROR_CODES.DELTA_UNAVAILABLE, 'Delta Contract is unavailable.', request);
    return latestDeltaContract;
  }

  return Object.freeze({ evaluate, getDeltaContract });
}

module.exports = Object.freeze({ CONTRACT_VERSION, APPROVED_CONSUMERS, DELTA_FIELDS, ERROR_CODES, createDeltaEngine });
