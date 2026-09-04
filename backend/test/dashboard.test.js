'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createDashboard, APPROVED_CONSUMERS, ERROR_CODES } = require('../src/dashboard');

function freeze(value) {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

function governanceOutput(overrides = {}) {
  return freeze({
    contractId: 'rollback-approved-1',
    contractVersion: '1.0',
    evaluatedAt: 1710000000000,
    upstreamDependencies: [{ module: 'Validation Framework', contract: 'Validation Record', id: 'validation-1' }],
    explainability: { summary: 'The approved governance rationale.' },
    audit: { producedBy: 'Rollback Framework', recordId: 'rollback-1' },
    ...overrides,
  });
}

function request(overrides = {}) {
  return {
    requestId: 'dashboard-request-1',
    governanceOutput: governanceOutput(),
    referenceTime: 1710000000100,
    ...overrides,
  };
}

function assertError(result, code) {
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, code);
  assert.equal(result.validationStatus, 'Rejected');
  assert.equal(Object.isFrozen(result), true);
}

test('creates Dashboard with its approved Inspector consumer boundary', () => {
  const dashboard = createDashboard();
  assert.equal(typeof dashboard.present, 'function');
  assert.equal(typeof dashboard.getDashboardView, 'function');
  assert.deepEqual(APPROVED_CONSUMERS, ['Inspector']);
});

test('presents one immutable Dashboard View while preserving governance references and rationale', () => {
  const dashboard = createDashboard({ now: () => 1710000000100 });
  const source = governanceOutput();
  const result = dashboard.present(request({ governanceOutput: source, referenceTime: undefined }));

  assert.equal(result.ok, true);
  assert.equal(result.contractId, 'dashboard-view-rollback-approved-1');
  assert.equal(result.viewedAt, 1710000000100);
  assert.equal(result.presentationStatus, 'Available');
  assert.equal(result.governanceOutput, source);
  assert.equal(result.upstreamDependencies, source.upstreamDependencies);
  assert.equal(result.explainability, source.explainability);
  assert.equal(result.audit.upstreamAudit, source.audit);
  assert.equal(result.validationStatus, 'Accepted');
  assert.equal(result.rejectionReason, null);
  assert.equal(Object.isFrozen(result), true);
});

test('serves the published Dashboard View only to Inspector', () => {
  const dashboard = createDashboard();
  assertError(dashboard.getDashboardView({ requestId: 'before', consumerId: 'Inspector' }), ERROR_CODES.DASHBOARD_VIEW_UNAVAILABLE);
  const view = dashboard.present(request());
  assert.equal(dashboard.getDashboardView({ requestId: 'inspector', consumerId: 'Inspector' }), view);
  assertError(dashboard.getDashboardView({ requestId: 'other', consumerId: 'Explainability' }), ERROR_CODES.UNAUTHORIZED_CONSUMER);
});

test('rejects missing, malformed, mutable, stale, and dependency-inverted Governance Outputs', () => {
  const dashboard = createDashboard({ maxGovernanceOutputAgeMs: 10 });
  assertError(dashboard.present(request({ governanceOutput: null })), ERROR_CODES.MISSING_GOVERNANCE_OUTPUT);
  assertError(dashboard.present(request({ governanceOutput: governanceOutput({ contractVersion: '2.0' }) })), ERROR_CODES.MALFORMED_GOVERNANCE_OUTPUT);
  const mutable = { ...governanceOutput(), explainability: { summary: 'mutable' } };
  assertError(dashboard.present(request({ governanceOutput: mutable })), ERROR_CODES.MUTABLE_GOVERNANCE_OUTPUT);
  assertError(dashboard.present(request({ referenceTime: 1710000001000 })), ERROR_CODES.STALE_GOVERNANCE_OUTPUT);
  assertError(createDashboard().present(request({ governanceOutput: governanceOutput({ audit: { producedBy: 'Portfolio Engine' } }) })), ERROR_CODES.DEPENDENCY_ORDER_VIOLATION);
});

test('does not calculate intelligence or modify the approved Governance Output', () => {
  const source = governanceOutput();
  const result = createDashboard().present(request({ governanceOutput: source }));
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'recommendation'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'marketAssessment'), false);
  assert.equal(source.audit.producedBy, 'Rollback Framework');
  assert.equal(Object.isFrozen(source), true);
});
