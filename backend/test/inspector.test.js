'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createDashboard } = require('../src/dashboard');
const { createInspector, APPROVED_CONSUMERS, ERROR_CODES } = require('../src/inspector');

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

function dashboardView(source = governanceOutput()) {
  return createDashboard().present({ requestId: 'dashboard-request-1', governanceOutput: source, referenceTime: 1710000000100 });
}

function request(overrides = {}) {
  const source = governanceOutput();
  return { requestId: 'inspector-request-1', dashboardView: dashboardView(source), governanceOutput: source, referenceTime: 1710000000200, ...overrides };
}

function assertError(result, code) {
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, code);
  assert.equal(result.validationStatus, 'Rejected');
  assert.equal(Object.isFrozen(result), true);
}

test('creates Inspector with its approved Explainability consumer boundary', () => {
  const inspector = createInspector();
  assert.equal(typeof inspector.inspect, 'function');
  assert.equal(typeof inspector.getInspectionView, 'function');
  assert.deepEqual(APPROVED_CONSUMERS, ['Explainability']);
});

test('produces an immutable Inspection View preserving dashboard and governance references', () => {
  const inspector = createInspector({ now: () => 1710000000200 });
  const result = inspector.inspect(request({ referenceTime: undefined }));

  assert.equal(result.ok, true);
  assert.equal(result.contractId, 'inspection-view-dashboard-view-rollback-approved-1');
  assert.equal(result.viewedAt, 1710000000200);
  assert.equal(result.presentationStatus, 'Available');
  assert.equal(result.dashboardView.audit.producedBy, 'Dashboard');
  assert.equal(result.governanceOutput.audit.producedBy, 'Rollback Framework');
  assert.equal(result.explainability, result.dashboardView.explainability);
  assert.equal(result.audit.dashboardAudit, result.dashboardView.audit);
  assert.equal(result.validationStatus, 'Accepted');
  assert.equal(Object.isFrozen(result), true);
});

test('serves a published Inspection View only to Explainability', () => {
  const inspector = createInspector();
  assertError(inspector.getInspectionView({ requestId: 'before', consumerId: 'Explainability' }), ERROR_CODES.INSPECTION_VIEW_UNAVAILABLE);
  const view = inspector.inspect(request());
  assert.equal(inspector.getInspectionView({ requestId: 'explainability', consumerId: 'Explainability' }), view);
  assertError(inspector.getInspectionView({ requestId: 'other', consumerId: 'Historical Explorer' }), ERROR_CODES.UNAUTHORIZED_CONSUMER);
});

test('rejects missing, malformed, mutable, stale, inverted, and inconsistent upstream inputs', () => {
  const inspector = createInspector({ maxUpstreamAgeMs: 10 });
  assertError(inspector.inspect(request({ dashboardView: null })), ERROR_CODES.MISSING_DASHBOARD_VIEW);
  assertError(createInspector().inspect(request({ governanceOutput: null })), ERROR_CODES.MISSING_GOVERNANCE_OUTPUT);
  assertError(createInspector().inspect(request({ dashboardView: freeze({ contractId: 'bad' }) })), ERROR_CODES.MALFORMED_DASHBOARD_VIEW);
  const mutable = { ...dashboardView(), audit: { producedBy: 'Dashboard' } };
  assertError(createInspector().inspect(request({ dashboardView: mutable })), ERROR_CODES.MUTABLE_UPSTREAM_INPUT);
  assertError(inspector.inspect(request({ referenceTime: 1710000001000 })), ERROR_CODES.STALE_UPSTREAM_INPUT);
  const inverted = freeze({ ...dashboardView(), audit: { producedBy: 'Portfolio Engine' } });
  assertError(createInspector().inspect(request({ dashboardView: inverted })), ERROR_CODES.DEPENDENCY_ORDER_VIOLATION);
  assertError(createInspector().inspect(request({ dashboardView: dashboardView(), governanceOutput: governanceOutput() })), ERROR_CODES.INCONSISTENT_UPSTREAM_REFERENCES);
});

test('does not calculate intelligence or modify its immutable upstream records', () => {
  const source = governanceOutput();
  const view = dashboardView(source);
  const result = createInspector().inspect(request({ dashboardView: view, governanceOutput: source }));
  assert.equal(Object.hasOwn(result, 'recommendation'), false);
  assert.equal(Object.hasOwn(result, 'marketAssessment'), false);
  assert.equal(view.audit.producedBy, 'Dashboard');
  assert.equal(source.audit.producedBy, 'Rollback Framework');
  assert.equal(Object.isFrozen(source), true);
});
