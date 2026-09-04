'use strict';

const CONTRACT_VERSION = '1.0';
const APPROVED_CONSUMERS = Object.freeze(['Historical Explorer']);
const APPROVED_INSPECTOR_PRODUCER = 'Inspector';
const APPROVED_GOVERNANCE_PRODUCER = 'Rollback Framework';
const DEFAULT_MAX_UPSTREAM_AGE_MS = 24 * 60 * 60 * 1000;

const ERROR_CODES = Object.freeze({
  INVALID_REQUEST: 'INVALID_REQUEST',
  MISSING_INSPECTION_VIEW: 'MISSING_INSPECTION_VIEW',
  MISSING_GOVERNANCE_OUTPUT: 'MISSING_GOVERNANCE_OUTPUT',
  MALFORMED_INSPECTION_VIEW: 'MALFORMED_INSPECTION_VIEW',
  MALFORMED_GOVERNANCE_OUTPUT: 'MALFORMED_GOVERNANCE_OUTPUT',
  MUTABLE_UPSTREAM_INPUT: 'MUTABLE_UPSTREAM_INPUT',
  STALE_UPSTREAM_INPUT: 'STALE_UPSTREAM_INPUT',
  DEPENDENCY_ORDER_VIOLATION: 'DEPENDENCY_ORDER_VIOLATION',
  INCONSISTENT_UPSTREAM_REFERENCES: 'INCONSISTENT_UPSTREAM_REFERENCES',
  UNAUTHORIZED_CONSUMER: 'UNAUTHORIZED_CONSUMER',
  EXPLAINABILITY_VIEW_UNAVAILABLE: 'EXPLAINABILITY_VIEW_UNAVAILABLE',
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
    return { code: ERROR_CODES.DEPENDENCY_ORDER_VIOLATION, message: 'Explainability accepts only Rollback Framework Governance Outputs.' };
  }
  return null;
}

function validateInspectionView(inspectionView, referenceTime, maxAgeMs) {
  if (!isPlainObject(inspectionView)) {
    return { code: ERROR_CODES.MISSING_INSPECTION_VIEW, message: 'Inspection View is required.' };
  }
  if (!isNonEmptyString(inspectionView.contractId) || inspectionView.contractVersion !== CONTRACT_VERSION
    || !isPositiveNumber(inspectionView.viewedAt) || !Array.isArray(inspectionView.upstreamDependencies)
    || inspectionView.upstreamDependencies.length === 0 || inspectionView.presentationStatus !== 'Available'
    || !isPlainObject(inspectionView.explainability) || !isPlainObject(inspectionView.audit)) {
    return { code: ERROR_CODES.MALFORMED_INSPECTION_VIEW, message: 'Inspection View contract is malformed.' };
  }
  if (!isDeeplyFrozen(inspectionView)) {
    return { code: ERROR_CODES.MUTABLE_UPSTREAM_INPUT, message: 'Inspection View must be immutable.' };
  }
  if (referenceTime - inspectionView.viewedAt > maxAgeMs) {
    return { code: ERROR_CODES.STALE_UPSTREAM_INPUT, message: 'Inspection View is stale.' };
  }
  if (inspectionView.audit.producedBy !== APPROVED_INSPECTOR_PRODUCER) {
    return { code: ERROR_CODES.DEPENDENCY_ORDER_VIOLATION, message: 'Explainability accepts only Inspection Views produced by Inspector.' };
  }
  return null;
}

function createExplainability(options = {}) {
  const now = typeof options.now === 'function' ? options.now : Date.now;
  const maxUpstreamAgeMs = options.maxUpstreamAgeMs === undefined ? DEFAULT_MAX_UPSTREAM_AGE_MS : options.maxUpstreamAgeMs;
  let latestExplainabilityView = null;

  function present(request) {
    const invalid = validateRequest(request);
    if (invalid) return invalid;
    const referenceTime = request.referenceTime === undefined ? now() : request.referenceTime;
    if (!isPositiveNumber(referenceTime)) return error(ERROR_CODES.INVALID_REQUEST, 'Positive referenceTime is required.', request);

    const inspectionValidation = validateInspectionView(request.inspectionView, referenceTime, maxUpstreamAgeMs);
    if (inspectionValidation) return error(inspectionValidation.code, inspectionValidation.message, request, { rejectionReason: inspectionValidation.message });
    const governanceValidation = validateGovernanceOutput(request.governanceOutput, referenceTime, maxUpstreamAgeMs);
    if (governanceValidation) return error(governanceValidation.code, governanceValidation.message, request, { rejectionReason: governanceValidation.message });
    if (request.inspectionView.governanceOutput !== request.governanceOutput
      || request.inspectionView.upstreamDependencies !== request.governanceOutput.upstreamDependencies
      || request.inspectionView.explainability !== request.governanceOutput.explainability) {
      return error(ERROR_CODES.INCONSISTENT_UPSTREAM_REFERENCES, 'Inspection View must preserve the supplied Governance Output references.', request, { rejectionReason: 'Inspection and Governance references are inconsistent.' });
    }

    const view = deepFreeze({
      ok: true,
      contractId: `explainability-view-${request.inspectionView.contractId}`,
      contractVersion: CONTRACT_VERSION,
      viewedAt: referenceTime,
      upstreamDependencies: request.inspectionView.upstreamDependencies,
      presentationStatus: 'Available',
      inspectionView: request.inspectionView,
      governanceOutput: request.governanceOutput,
      explainability: request.inspectionView.explainability,
      audit: {
        requestId: request.requestId,
        producedBy: 'Explainability',
        approvedConsumer: APPROVED_CONSUMERS[0],
        inspectionAudit: request.inspectionView.audit,
        governanceAudit: request.governanceOutput.audit,
        traceable: true,
      },
      validationStatus: 'Accepted',
      rejectionReason: null,
    });
    latestExplainabilityView = view;
    return view;
  }

  function getExplainabilityView(request) {
    const invalid = validateRequest(request);
    if (invalid) return invalid;
    if (!APPROVED_CONSUMERS.includes(request.consumerId)) {
      return error(ERROR_CODES.UNAUTHORIZED_CONSUMER, 'Consumer is not approved for Explainability View access.', request);
    }
    if (!latestExplainabilityView) {
      return error(ERROR_CODES.EXPLAINABILITY_VIEW_UNAVAILABLE, 'Explainability View is unavailable.', request);
    }
    return latestExplainabilityView;
  }

  return Object.freeze({ present, getExplainabilityView });
}

module.exports = Object.freeze({
  CONTRACT_VERSION,
  APPROVED_CONSUMERS,
  APPROVED_INSPECTOR_PRODUCER,
  APPROVED_GOVERNANCE_PRODUCER,
  ERROR_CODES,
  createExplainability,
});
