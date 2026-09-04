'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createDashboard } = require('../src/dashboard');
const { createInspector } = require('../src/inspector');
const { createExplainability, APPROVED_CONSUMERS, ERROR_CODES } = require('../src/explainability');

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

function inspectionView(source = governanceOutput()) {
  const dashboardView = createDashboard().present({ requestId: 'dashboard-request-1', governanceOutput: source, referenceTime: 1710000000100 });
  return createInspector().inspect({ requestId: 'inspector-request-1', dashboardView, governanceOutput: source, referenceTime: 1710000000200 });
}

function request(overrides = {}) {
  const source = governanceOutput();
  return { requestId: 'explainability-request-1', inspectionView: inspectionView(source), governanceOutput: source, referenceTime: 1710000000300, ...overrides };
}

function assertError(result, code) {
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, code);
  assert.equal(result.validationStatus, 'Rejected');
  assert.equal(Object.isFrozen(result), true);
}

test('creates Explainability with its approved Historical Explorer consumer boundary', () => {
  const explainability = createExplainability();
  assert.equal(typeof explainability.present, 'function');
  assert.equal(typeof explainability.getExplainabilityView, 'function');
  assert.deepEqual(APPROVED_CONSUMERS, ['Historical Explorer']);
});

test('produces an immutable Explainability View preserving inspection, governance, and rationale references', () => {
  const explainability = createExplainability({ now: () => 1710000000300 });
  const result = explainability.present(request({ referenceTime: undefined }));

  assert.equal(result.ok, true);
  assert.equal(result.contractId, 'explainability-view-inspection-view-dashboard-view-rollback-approved-1');
  assert.equal(result.viewedAt, 1710000000300);
  assert.equal(result.presentationStatus, 'Available');
  assert.equal(result.inspectionView.audit.producedBy, 'Inspector');
  assert.equal(result.governanceOutput.audit.producedBy, 'Rollback Framework');
  assert.equal(result.explainability, result.inspectionView.explainability);
  assert.equal(result.audit.inspectionAudit, result.inspectionView.audit);
  assert.equal(result.validationStatus, 'Accepted');
  assert.equal(Object.isFrozen(result), true);
});

test('serves a published Explainability View only to Historical Explorer', () => {
  const explainability = createExplainability();
  assertError(explainability.getExplainabilityView({ requestId: 'before', consumerId: 'Historical Explorer' }), ERROR_CODES.EXPLAINABILITY_VIEW_UNAVAILABLE);
  const view = explainability.present(request());
  assert.equal(explainability.getExplainabilityView({ requestId: 'historical', consumerId: 'Historical Explorer' }), view);
  assertError(explainability.getExplainabilityView({ requestId: 'other', consumerId: 'Inspector' }), ERROR_CODES.UNAUTHORIZED_CONSUMER);
});

test('rejects missing, malformed, mutable, stale, inverted, and inconsistent upstream inputs', () => {
  const explainability = createExplainability({ maxUpstreamAgeMs: 10 });
  assertError(explainability.present(request({ inspectionView: null })), ERROR_CODES.MISSING_INSPECTION_VIEW);
  assertError(createExplainability().present(request({ governanceOutput: null })), ERROR_CODES.MISSING_GOVERNANCE_OUTPUT);
  assertError(createExplainability().present(request({ inspectionView: freeze({ contractId: 'bad' }) })), ERROR_CODES.MALFORMED_INSPECTION_VIEW);
  const mutable = { ...inspectionView(), audit: { producedBy: 'Inspector' } };
  assertError(createExplainability().present(request({ inspectionView: mutable })), ERROR_CODES.MUTABLE_UPSTREAM_INPUT);
  assertError(explainability.present(request({ referenceTime: 1710000001000 })), ERROR_CODES.STALE_UPSTREAM_INPUT);
  const inverted = freeze({ ...inspectionView(), audit: { producedBy: 'Portfolio Engine' } });
  assertError(createExplainability().present(request({ inspectionView: inverted })), ERROR_CODES.DEPENDENCY_ORDER_VIOLATION);
  assertError(createExplainability().present(request({ inspectionView: inspectionView(), governanceOutput: governanceOutput() })), ERROR_CODES.INCONSISTENT_UPSTREAM_REFERENCES);
});

test('does not calculate intelligence or modify its immutable upstream records', () => {
  const source = governanceOutput();
  const view = inspectionView(source);
  const result = createExplainability().present(request({ inspectionView: view, governanceOutput: source }));
  assert.equal(Object.hasOwn(result, 'recommendation'), false);
  assert.equal(Object.hasOwn(result, 'marketAssessment'), false);
  assert.equal(view.audit.producedBy, 'Inspector');
  assert.equal(source.audit.producedBy, 'Rollback Framework');
  assert.equal(Object.isFrozen(source), true);
});
