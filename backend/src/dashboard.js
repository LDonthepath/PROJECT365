'use strict';

const CONTRACT_VERSION = '1.0';
const APPROVED_CONSUMERS = Object.freeze(['Inspector']);
const APPROVED_GOVERNANCE_PRODUCER = 'Rollback Framework';
const DEFAULT_MAX_GOVERNANCE_OUTPUT_AGE_MS = 24 * 60 * 60 * 1000;

const ERROR_CODES = Object.freeze({
  INVALID_REQUEST: 'INVALID_REQUEST',
  MISSING_GOVERNANCE_OUTPUT: 'MISSING_GOVERNANCE_OUTPUT',
  MALFORMED_GOVERNANCE_OUTPUT: 'MALFORMED_GOVERNANCE_OUTPUT',
  MUTABLE_GOVERNANCE_OUTPUT: 'MUTABLE_GOVERNANCE_OUTPUT',
  STALE_GOVERNANCE_OUTPUT: 'STALE_GOVERNANCE_OUTPUT',
  DEPENDENCY_ORDER_VIOLATION: 'DEPENDENCY_ORDER_VIOLATION',
  UNAUTHORIZED_CONSUMER: 'UNAUTHORIZED_CONSUMER',
  DASHBOARD_VIEW_UNAVAILABLE: 'DASHBOARD_VIEW_UNAVAILABLE',
});

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function isPositiveNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function isDeeplyFrozen(value) {
  if (!isPlainObject(value) && !Array.isArray(value)) return true;
  if (!Object.isFrozen(value)) return false;
  return Object.values(value).every(isDeeplyFrozen);
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

function validateGovernanceOutput(governanceOutput, referenceTime, maxAgeMs) {
  if (!isPlainObject(governanceOutput)) {
    return { code: ERROR_CODES.MISSING_GOVERNANCE_OUTPUT, message: 'Approved Governance Output is required.' };
  }
  if (
    !isNonEmptyString(governanceOutput.contractId)
    || governanceOutput.contractVersion !== CONTRACT_VERSION
    || !isPositiveNumber(governanceOutput.evaluatedAt)
    || !Array.isArray(governanceOutput.upstreamDependencies)
    || governanceOutput.upstreamDependencies.length === 0
    || !isPlainObject(governanceOutput.explainability)
    || !isPlainObject(governanceOutput.audit)
  ) {
    return { code: ERROR_CODES.MALFORMED_GOVERNANCE_OUTPUT, message: 'Approved Governance Output contract is malformed.' };
  }
  if (!isDeeplyFrozen(governanceOutput)) {
    return { code: ERROR_CODES.MUTABLE_GOVERNANCE_OUTPUT, message: 'Approved Governance Output must be immutable.' };
  }
  if (referenceTime - governanceOutput.evaluatedAt > maxAgeMs) {
    return { code: ERROR_CODES.STALE_GOVERNANCE_OUTPUT, message: 'Approved Governance Output is stale.' };
  }
  if (governanceOutput.audit.producedBy !== APPROVED_GOVERNANCE_PRODUCER) {
    return { code: ERROR_CODES.DEPENDENCY_ORDER_VIOLATION, message: 'Dashboard accepts only Rollback Framework Governance Outputs.' };
  }
  return null;
}

function createDashboard(options = {}) {
  const now = typeof options.now === 'function' ? options.now : Date.now;
  const maxGovernanceOutputAgeMs = options.maxGovernanceOutputAgeMs === undefined
    ? DEFAULT_MAX_GOVERNANCE_OUTPUT_AGE_MS
    : options.maxGovernanceOutputAgeMs;
  let latestDashboardView = null;

  function present(request) {
    const invalid = validateRequest(request);
    if (invalid) return invalid;
    const referenceTime = request.referenceTime === undefined ? now() : request.referenceTime;
    if (!isPositiveNumber(referenceTime)) return error(ERROR_CODES.INVALID_REQUEST, 'Positive referenceTime is required.', request);

    const validation = validateGovernanceOutput(request.governanceOutput, referenceTime, maxGovernanceOutputAgeMs);
    if (validation) return error(validation.code, validation.message, request, { rejectionReason: validation.message });

    const governanceOutput = request.governanceOutput;
    const view = deepFreeze({
      ok: true,
      contractId: `dashboard-view-${governanceOutput.contractId}`,
      contractVersion: CONTRACT_VERSION,
      viewedAt: referenceTime,
      upstreamDependencies: governanceOutput.upstreamDependencies,
      presentationStatus: 'Available',
      governanceOutput,
      explainability: governanceOutput.explainability,
      audit: {
        requestId: request.requestId,
        producedBy: 'Dashboard',
        approvedConsumer: APPROVED_CONSUMERS[0],
        upstreamAudit: governanceOutput.audit,
        traceable: true,
      },
      validationStatus: 'Accepted',
      rejectionReason: null,
    });
    latestDashboardView = view;
    return view;
  }

  function getDashboardView(request) {
    const invalid = validateRequest(request);
    if (invalid) return invalid;
    if (!APPROVED_CONSUMERS.includes(request.consumerId)) {
      return error(ERROR_CODES.UNAUTHORIZED_CONSUMER, 'Consumer is not approved for Dashboard View access.', request);
    }
    if (!latestDashboardView) {
      return error(ERROR_CODES.DASHBOARD_VIEW_UNAVAILABLE, 'Dashboard View is unavailable.', request);
    }
    return latestDashboardView;
  }

  return Object.freeze({ present, getDashboardView });
}

module.exports = Object.freeze({
  CONTRACT_VERSION,
  APPROVED_CONSUMERS,
  APPROVED_GOVERNANCE_PRODUCER,
  ERROR_CODES,
  createDashboard,
});
