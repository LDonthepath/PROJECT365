'use strict';

const CONTRACT_VERSION = '1.0';
const APPROVED_CONSUMERS = Object.freeze(['Explainability']);
const APPROVED_DASHBOARD_PRODUCER = 'Dashboard';
const APPROVED_GOVERNANCE_PRODUCER = 'Rollback Framework';
const DEFAULT_MAX_UPSTREAM_AGE_MS = 24 * 60 * 60 * 1000;

const ERROR_CODES = Object.freeze({
  INVALID_REQUEST: 'INVALID_REQUEST',
  MISSING_DASHBOARD_VIEW: 'MISSING_DASHBOARD_VIEW',
  MISSING_GOVERNANCE_OUTPUT: 'MISSING_GOVERNANCE_OUTPUT',
  MALFORMED_DASHBOARD_VIEW: 'MALFORMED_DASHBOARD_VIEW',
  MALFORMED_GOVERNANCE_OUTPUT: 'MALFORMED_GOVERNANCE_OUTPUT',
  MUTABLE_UPSTREAM_INPUT: 'MUTABLE_UPSTREAM_INPUT',
  STALE_UPSTREAM_INPUT: 'STALE_UPSTREAM_INPUT',
  DEPENDENCY_ORDER_VIOLATION: 'DEPENDENCY_ORDER_VIOLATION',
  INCONSISTENT_UPSTREAM_REFERENCES: 'INCONSISTENT_UPSTREAM_REFERENCES',
  UNAUTHORIZED_CONSUMER: 'UNAUTHORIZED_CONSUMER',
  INSPECTION_VIEW_UNAVAILABLE: 'INSPECTION_VIEW_UNAVAILABLE',
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
  if (!isNonEmptyString(governanceOutput.contractId) || governanceOutput.contractVersion !== CONTRACT_VERSION
    || !isPositiveNumber(governanceOutput.evaluatedAt) || !Array.isArray(governanceOutput.upstreamDependencies)
    || governanceOutput.upstreamDependencies.length === 0 || !isPlainObject(governanceOutput.explainability)
    || !isPlainObject(governanceOutput.audit)) {
    return { code: ERROR_CODES.MALFORMED_GOVERNANCE_OUTPUT, message: 'Approved Governance Output contract is malformed.' };
  }
  if (!isDeeplyFrozen(governanceOutput)) {
    return { code: ERROR_CODES.MUTABLE_UPSTREAM_INPUT, message: 'Approved Governance Output must be immutable.' };
  }
  if (referenceTime - governanceOutput.evaluatedAt > maxAgeMs) {
    return { code: ERROR_CODES.STALE_UPSTREAM_INPUT, message: 'Approved Governance Output is stale.' };
  }
  if (governanceOutput.audit.producedBy !== APPROVED_GOVERNANCE_PRODUCER) {
    return { code: ERROR_CODES.DEPENDENCY_ORDER_VIOLATION, message: 'Inspector accepts only Rollback Framework Governance Outputs.' };
  }
  return null;
}

function validateDashboardView(dashboardView, referenceTime, maxAgeMs) {
  if (!isPlainObject(dashboardView)) {
    return { code: ERROR_CODES.MISSING_DASHBOARD_VIEW, message: 'Dashboard View is required.' };
  }
  if (!isNonEmptyString(dashboardView.contractId) || dashboardView.contractVersion !== CONTRACT_VERSION
    || !isPositiveNumber(dashboardView.viewedAt) || !Array.isArray(dashboardView.upstreamDependencies)
    || dashboardView.upstreamDependencies.length === 0 || dashboardView.presentationStatus !== 'Available'
    || !isPlainObject(dashboardView.explainability) || !isPlainObject(dashboardView.audit)) {
    return { code: ERROR_CODES.MALFORMED_DASHBOARD_VIEW, message: 'Dashboard View contract is malformed.' };
  }
  if (!isDeeplyFrozen(dashboardView)) {
    return { code: ERROR_CODES.MUTABLE_UPSTREAM_INPUT, message: 'Dashboard View must be immutable.' };
  }
  if (referenceTime - dashboardView.viewedAt > maxAgeMs) {
    return { code: ERROR_CODES.STALE_UPSTREAM_INPUT, message: 'Dashboard View is stale.' };
  }
  if (dashboardView.audit.producedBy !== APPROVED_DASHBOARD_PRODUCER) {
    return { code: ERROR_CODES.DEPENDENCY_ORDER_VIOLATION, message: 'Inspector accepts only Dashboard Views produced by Dashboard.' };
  }
  return null;
}

function createInspector(options = {}) {
  const now = typeof options.now === 'function' ? options.now : Date.now;
  const maxUpstreamAgeMs = options.maxUpstreamAgeMs === undefined ? DEFAULT_MAX_UPSTREAM_AGE_MS : options.maxUpstreamAgeMs;
  let latestInspectionView = null;

  function inspect(request) {
    const invalid = validateRequest(request);
    if (invalid) return invalid;
    const referenceTime = request.referenceTime === undefined ? now() : request.referenceTime;
    if (!isPositiveNumber(referenceTime)) return error(ERROR_CODES.INVALID_REQUEST, 'Positive referenceTime is required.', request);

    const dashboardValidation = validateDashboardView(request.dashboardView, referenceTime, maxUpstreamAgeMs);
    if (dashboardValidation) return error(dashboardValidation.code, dashboardValidation.message, request, { rejectionReason: dashboardValidation.message });
    const governanceValidation = validateGovernanceOutput(request.governanceOutput, referenceTime, maxUpstreamAgeMs);
    if (governanceValidation) return error(governanceValidation.code, governanceValidation.message, request, { rejectionReason: governanceValidation.message });
    if (request.dashboardView.governanceOutput !== request.governanceOutput
      || request.dashboardView.upstreamDependencies !== request.governanceOutput.upstreamDependencies
      || request.dashboardView.explainability !== request.governanceOutput.explainability) {
      return error(ERROR_CODES.INCONSISTENT_UPSTREAM_REFERENCES, 'Dashboard View must preserve the supplied Governance Output references.', request, { rejectionReason: 'Dashboard and Governance references are inconsistent.' });
    }

    const inspectionView = deepFreeze({
      ok: true,
      contractId: `inspection-view-${request.dashboardView.contractId}`,
      contractVersion: CONTRACT_VERSION,
      viewedAt: referenceTime,
      upstreamDependencies: request.dashboardView.upstreamDependencies,
      presentationStatus: 'Available',
      dashboardView: request.dashboardView,
      governanceOutput: request.governanceOutput,
      explainability: request.dashboardView.explainability,
      audit: {
        requestId: request.requestId,
        producedBy: 'Inspector',
        approvedConsumer: APPROVED_CONSUMERS[0],
        dashboardAudit: request.dashboardView.audit,
        governanceAudit: request.governanceOutput.audit,
        traceable: true,
      },
      validationStatus: 'Accepted',
      rejectionReason: null,
    });
    latestInspectionView = inspectionView;
    return inspectionView;
  }

  function getInspectionView(request) {
    const invalid = validateRequest(request);
    if (invalid) return invalid;
    if (!APPROVED_CONSUMERS.includes(request.consumerId)) {
      return error(ERROR_CODES.UNAUTHORIZED_CONSUMER, 'Consumer is not approved for Inspection View access.', request);
    }
    if (!latestInspectionView) {
      return error(ERROR_CODES.INSPECTION_VIEW_UNAVAILABLE, 'Inspection View is unavailable.', request);
    }
    return latestInspectionView;
  }

  return Object.freeze({ inspect, getInspectionView });
}

module.exports = Object.freeze({
  CONTRACT_VERSION,
  APPROVED_CONSUMERS,
  APPROVED_DASHBOARD_PRODUCER,
  APPROVED_GOVERNANCE_PRODUCER,
  ERROR_CODES,
  createInspector,
});
