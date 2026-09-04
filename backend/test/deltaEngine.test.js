'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createDeltaEngine, ERROR_CODES, APPROVED_CONSUMERS, DELTA_FIELDS } = require('../src/deltaEngine');

function marketData(overrides = {}) {
  return Object.freeze({
    id: 'market-1', symbol: 'BTC', name: 'Bitcoin', priceUsd: 100, change1h: 1, change24h: 2,
    volume24hUsd: 1000, marketCapUsd: 2000, totalMarketCapUsd: 3000, total3MarketCap: 2500,
    btcDominance: 50, usdtDominance: 5, usdcDominance: 4, circulatingSupply: 19,
    ath: 120, atl: 10, fetchedAt: 1710000000000, fetchSource: 'test', contractVersion: '1.0',
    ...overrides,
  });
}

function snapshot(overrides = {}) {
  return Object.freeze({
    id: 'snapshot-1', timestamp: 1710000000000, type: 'Live',
    marketData: marketData(overrides.marketDataOverrides),
    healthStatus: Object.freeze({ status: 'VALID' }), contractVersion: '1.0',
    ...overrides,
  });
}

function request(overrides = {}) {
  return {
    requestId: 'delta-req-1',
    previousSnapshot: snapshot({ id: 'snapshot-1', timestamp: 1710000000000, marketDataOverrides: { priceUsd: 100, volume24hUsd: 1000 } }),
    currentSnapshot: snapshot({ id: 'snapshot-2', timestamp: 1710003600000, marketDataOverrides: { priceUsd: 125, volume24hUsd: 900 } }),
    referenceTime: 1710003600100,
    ...overrides,
  };
}

function assertError(result, code) {
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, code);
  assert.equal(typeof result.errorMessage, 'string');
  assert.equal(result.validationStatus, 'Rejected');
  assert.equal(Object.isFrozen(result), true);
}

test('exports Delta Engine factory, contract constants, and approved consumer boundary', () => {
  const engine = createDeltaEngine();
  assert.equal(typeof engine.evaluate, 'function');
  assert.equal(typeof engine.getDeltaContract, 'function');
  assert.deepEqual(APPROVED_CONSUMERS, ['Triad Liquidity Framework']);
  assert.equal(DELTA_FIELDS.includes('priceUsd'), true);
});

test('evaluate produces an immutable, explainable Delta Contract from two Snapshot records', () => {
  const engine = createDeltaEngine({ now: () => 1710003600100 });
  const result = engine.evaluate(request({ referenceTime: undefined }));
  assert.equal(result.ok, true);
  assert.equal(result.contractVersion, '1.0');
  assert.equal(result.contractId, 'delta-snapshot-1-snapshot-2');
  assert.equal(result.evaluatedAt, 1710003600100);
  assert.equal(result.validationStatus, 'Accepted');
  assert.equal(result.rejectionReason, null);
  assert.equal(result.assessment.snapshotWindowMs, 3600000);
  const priceDelta = result.assessment.fieldDeltas.find((delta) => delta.field === 'priceUsd');
  assert.equal(priceDelta.absoluteDelta, 25);
  assert.equal(priceDelta.percentDelta, 25);
  const volumeDelta = result.assessment.fieldDeltas.find((delta) => delta.field === 'volume24hUsd');
  assert.equal(volumeDelta.absoluteDelta, -100);
  assert.equal(volumeDelta.percentDelta, -10);
  assert.deepEqual(result.explainability.sourceSnapshotIds, ['snapshot-1', 'snapshot-2']);
  assert.equal(result.audit.producedBy, 'Delta Engine');
  assert.equal(result.audit.traceable, true);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.assessment.fieldDeltas[0]), true);
});

test('getDeltaContract only serves the approved downstream Triad Liquidity Framework consumer', () => {
  const engine = createDeltaEngine();
  assertError(engine.getDeltaContract({ requestId: 'before', consumerId: 'Triad Liquidity Framework' }), ERROR_CODES.DELTA_UNAVAILABLE);
  const produced = engine.evaluate(request());
  assert.equal(produced.ok, true);
  assert.equal(engine.getDeltaContract({ requestId: 'triad', consumerId: APPROVED_CONSUMERS[0] }), produced);
  assertError(engine.getDeltaContract({ requestId: 'bad-consumer', consumerId: 'Portfolio Engine' }), ERROR_CODES.UNAUTHORIZED_CONSUMER);
});

test('validation rejects missing, malformed, stale, same, and dependency-inverted snapshots', () => {
  const engine = createDeltaEngine({ maxSnapshotAgeMs: 10 });
  assertError(engine.evaluate(request({ currentSnapshot: null })), ERROR_CODES.MISSING_SNAPSHOT);
  assertError(engine.evaluate(request({ currentSnapshot: snapshot({ id: 'bad', contractVersion: '2.0' }) })), ERROR_CODES.MALFORMED_SNAPSHOT);
  assertError(engine.evaluate(request({ referenceTime: 1710003601000 })), ERROR_CODES.STALE_SNAPSHOT);
  const same = snapshot({ id: 'same', timestamp: 1710000000000 });
  assertError(createDeltaEngine().evaluate(request({ previousSnapshot: same, currentSnapshot: same })), ERROR_CODES.INSUFFICIENT_SNAPSHOT_HISTORY);
  assertError(createDeltaEngine().evaluate(request({ previousSnapshot: snapshot({ id: 'newer', timestamp: 1710003600000 }), currentSnapshot: snapshot({ id: 'older', timestamp: 1710000000000 }) })), ERROR_CODES.DEPENDENCY_ORDER_VIOLATION);
});

test('zero previous values produce null percentDelta without expanding into recommendations', () => {
  const result = createDeltaEngine().evaluate(request({
    previousSnapshot: snapshot({ id: 'prev-zero', timestamp: 1710000000000, marketDataOverrides: { priceUsd: 0 } }),
    currentSnapshot: snapshot({ id: 'curr-zero', timestamp: 1710000000001, marketDataOverrides: { priceUsd: 1 } }),
  }));
  const priceDelta = result.assessment.fieldDeltas.find((delta) => delta.field === 'priceUsd');
  assert.equal(priceDelta.absoluteDelta, 1);
  assert.equal(priceDelta.percentDelta, null);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'recommendation'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'portfolioDecision'), false);
});
