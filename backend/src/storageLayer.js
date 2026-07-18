'use strict';

const SUPPORTED_OBJECT_TYPES = Object.freeze(['MarketData', 'Snapshot']);
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 500;

const ERROR_CODES = Object.freeze({
  INVALID_REQUEST: 'INVALID_REQUEST',
  UNSUPPORTED_OBJECT_TYPE: 'UNSUPPORTED_OBJECT_TYPE',
  INVALID_OBJECT_CONTRACT: 'INVALID_OBJECT_CONTRACT',
  MISSING_OBJECT_IDENTITY: 'MISSING_OBJECT_IDENTITY',
  DUPLICATE_IDENTITY: 'DUPLICATE_IDENTITY',
  IDENTITY_CONFLICT: 'IDENTITY_CONFLICT',
  NOT_FOUND: 'NOT_FOUND',
  IMMUTABILITY_VIOLATION: 'IMMUTABILITY_VIOLATION',
  INVALID_RANGE: 'INVALID_RANGE',
  INVALID_PAGINATION: 'INVALID_PAGINATION',
  RETRIEVAL_UNAVAILABLE: 'RETRIEVAL_UNAVAILABLE',
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

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }
  if (isPlainObject(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function deepFreeze(value) {
  if (!isPlainObject(value) && !Array.isArray(value)) return value;
  for (const key of Object.keys(value)) deepFreeze(value[key]);
  return Object.freeze(value);
}

function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function immutableCopy(value) {
  return deepFreeze(clone(value));
}

function metadata(requestId, fields = {}) {
  return Object.freeze({ requestId, count: 0, ...fields });
}

function error(code, message, request = {}, extra = {}) {
  const requestId = isNonEmptyString(request.requestId) ? request.requestId : undefined;
  return Object.freeze({
    ok: false,
    errorCode: code,
    errorMessage: message,
    requestId,
    metadata: metadata(requestId, { objectType: request.objectType, ...extra.metadata }),
    ...extra.fields,
  });
}

function notFound(request, criteria = {}) {
  const requestId = request.requestId;
  return Object.freeze({
    ok: false,
    errorCode: ERROR_CODES.NOT_FOUND,
    requestId,
    objectType: request.objectType,
    ...criteria,
    metadata: metadata(requestId, { objectType: request.objectType }),
  });
}

function validateRequestEnvelope(request) {
  if (!isPlainObject(request) || !isNonEmptyString(request.requestId)) {
    return error(ERROR_CODES.INVALID_REQUEST, 'Request with non-empty requestId is required.', isPlainObject(request) ? request : {});
  }
  return null;
}

function validateObjectType(request) {
  if (!isNonEmptyString(request.objectType)) {
    return error(ERROR_CODES.INVALID_REQUEST, 'objectType is required.', request);
  }
  if (!SUPPORTED_OBJECT_TYPES.includes(request.objectType)) {
    return error(ERROR_CODES.UNSUPPORTED_OBJECT_TYPE, 'Unsupported objectType.', request);
  }
  return null;
}

function validateIdentityRequest(request) {
  return validateRequestEnvelope(request) || validateObjectType(request)
    || (!isNonEmptyString(request.id) ? error(ERROR_CODES.MISSING_OBJECT_IDENTITY, 'Object identity is required.', request) : null);
}

function validatePayloadContract(objectType, payload) {
  if (!isPlainObject(payload)) return false;
  if (!isNonEmptyString(payload.id) || !isNonEmptyString(payload.contractVersion)) return false;
  if (objectType === 'MarketData') return isPositiveNumber(payload.fetchedAt) && isNonEmptyString(payload.symbol);
  return isPositiveNumber(payload.timestamp) && isPlainObject(payload.marketData) && isPlainObject(payload.healthStatus);
}

function normalizePagination(request) {
  const page = request.page === undefined ? DEFAULT_PAGE : request.page;
  const pageSize = request.pageSize === undefined ? DEFAULT_PAGE_SIZE : request.pageSize;
  if (!Number.isInteger(page) || page <= 0 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
    return { paginationError: error(ERROR_CODES.INVALID_PAGINATION, 'Invalid pagination.', request) };
  }
  return { page, pageSize };
}

function createStorageLayer(options = {}) {
  const recordsByKey = new Map();
  const now = typeof options.now === 'function' ? options.now : Date.now;
  const unavailable = options.retrievalUnavailable === true;

  function keyFor(objectType, id) { return `${objectType}:${id}`; }

  function unavailableError(request) {
    return unavailable ? error(ERROR_CODES.RETRIEVAL_UNAVAILABLE, 'Retrieval is unavailable.', request) : null;
  }

  function save(request) {
    const invalid = validateRequestEnvelope(request) || validateObjectType(request);
    if (invalid) return invalid;
    if (!isPlainObject(request.payload)) return error(ERROR_CODES.INVALID_OBJECT_CONTRACT, 'Payload object is required.', request);
    if (!isNonEmptyString(request.payload.id)) return error(ERROR_CODES.MISSING_OBJECT_IDENTITY, 'Object identity is required.', request);
    if (!isPositiveNumber(request.timestamp)) return error(ERROR_CODES.INVALID_REQUEST, 'Positive timestamp is required.', request);
    if (!validatePayloadContract(request.objectType, request.payload)) return error(ERROR_CODES.INVALID_OBJECT_CONTRACT, 'Payload contract does not match objectType.', request);
    if (request.payload.timestamp !== undefined && request.payload.timestamp !== request.timestamp) return error(ERROR_CODES.INVALID_OBJECT_CONTRACT, 'Payload timestamp must match request timestamp.', request);
    if (request.payload.fetchedAt !== undefined && request.payload.fetchedAt !== request.timestamp) return error(ERROR_CODES.INVALID_OBJECT_CONTRACT, 'Payload fetchedAt must match request timestamp.', request);

    const key = keyFor(request.objectType, request.payload.id);
    const payloadCopy = immutableCopy(request.payload);
    const existing = recordsByKey.get(key);
    if (existing) {
      if (stableStringify(existing.payload) === stableStringify(payloadCopy) && existing.timestamp === request.timestamp) {
        return Object.freeze({ ok: true, id: existing.id, objectType: existing.objectType, storedAt: existing.storedAt, metadata: metadata(request.requestId, { objectType: existing.objectType, count: 1 }) });
      }
      return error(ERROR_CODES.IDENTITY_CONFLICT, 'Identity already exists with different payload.', request);
    }
    const record = deepFreeze({ id: payloadCopy.id, objectType: request.objectType, timestamp: request.timestamp, payload: payloadCopy, storedAt: now(), archived: false, contractVersion: payloadCopy.contractVersion });
    recordsByKey.set(key, record);
    return Object.freeze({ ok: true, id: record.id, objectType: record.objectType, storedAt: record.storedAt, metadata: metadata(request.requestId, { objectType: record.objectType, count: 1 }) });
  }

  function load(request) {
    const invalid = validateIdentityRequest(request) || unavailableError(request);
    if (invalid) return invalid;
    const record = recordsByKey.get(keyFor(request.objectType, request.id));
    if (!record || record.archived) return notFound(request, { id: request.id });
    return Object.freeze({ ok: true, record, metadata: metadata(request.requestId, { objectType: request.objectType, count: 1 }) });
  }

  function exists(request) {
    const invalid = validateIdentityRequest(request) || unavailableError(request);
    if (invalid) return invalid;
    const record = recordsByKey.get(keyFor(request.objectType, request.id));
    return Object.freeze({ ok: true, exists: Boolean(record && !record.archived), metadata: metadata(request.requestId, { objectType: request.objectType, count: record && !record.archived ? 1 : 0 }) });
  }

  function deleteRecord(request) {
    const invalid = validateIdentityRequest(request);
    if (invalid) return invalid;
    const key = keyFor(request.objectType, request.id);
    const record = recordsByKey.get(key);
    if (!record) return notFound(request, { id: request.id });
    if (record.archived) return error(ERROR_CODES.DUPLICATE_IDENTITY, 'Object identity is already archived.', request);
    const archived = deepFreeze({ ...record, payload: record.payload, archived: true });
    recordsByKey.set(key, archived);
    return Object.freeze({ ok: true, id: request.id, archived: true, metadata: metadata(request.requestId, { objectType: request.objectType, count: 1 }) });
  }

  function select(request, range) {
    const invalid = validateRequestEnvelope(request) || validateObjectType(request) || unavailableError(request);
    if (invalid) return { invalid };
    const pagination = normalizePagination(request);
    if (pagination.paginationError) return { invalid: pagination.paginationError };
    const orderDirection = request.orderDirection === undefined ? 'asc' : request.orderDirection;
    if (!['asc', 'desc'].includes(orderDirection)) return { invalid: error(ERROR_CODES.INVALID_REQUEST, 'Invalid orderDirection.', request) };
    const includeArchived = request.includeArchived === true;
    let rows = [...recordsByKey.values()].filter((record) => record.objectType === request.objectType && (includeArchived || !record.archived));
    if (isNonEmptyString(request.id)) rows = rows.filter((record) => record.id === request.id);
    if (request.timestamp !== undefined) rows = rows.filter((record) => record.timestamp === request.timestamp);
    if (range) rows = rows.filter((record) => record.timestamp >= request.fromTimestamp && record.timestamp <= request.toTimestamp);
    rows.sort((a, b) => (a.timestamp - b.timestamp || a.id.localeCompare(b.id)) * (orderDirection === 'asc' ? 1 : -1));
    const start = (pagination.page - 1) * pagination.pageSize;
    const pageRows = rows.slice(start, start + pagination.pageSize);
    return { rows: pageRows, total: rows.length, page: pagination.page, pageSize: pagination.pageSize, orderDirection };
  }

  function find(request) {
    const selected = select(request, false);
    if (selected.invalid) return selected.invalid;
    return Object.freeze({ ok: true, records: Object.freeze(selected.rows), metadata: metadata(request.requestId, { objectType: request.objectType, count: selected.rows.length, page: selected.page, pageSize: selected.pageSize, hasNextPage: selected.page * selected.pageSize < selected.total, orderedBy: request.orderBy || 'timestamp', orderDirection: selected.orderDirection }) });
  }

  function findRange(request) {
    const baseInvalid = validateRequestEnvelope(request) || validateObjectType(request);
    if (baseInvalid) return baseInvalid;
    if (!isPositiveNumber(request.fromTimestamp) || !isPositiveNumber(request.toTimestamp) || request.toTimestamp < request.fromTimestamp) return error(ERROR_CODES.INVALID_RANGE, 'Invalid timestamp range.', request);
    const selected = select(request, true);
    if (selected.invalid) return selected.invalid;
    return Object.freeze({ ok: true, records: Object.freeze(selected.rows), metadata: metadata(request.requestId, { objectType: request.objectType, count: selected.rows.length, page: selected.page, pageSize: selected.pageSize, hasNextPage: selected.page * selected.pageSize < selected.total, orderedBy: 'timestamp', orderDirection: selected.orderDirection }) });
  }

  function update() { return error(ERROR_CODES.IMMUTABILITY_VIOLATION, 'Historical records cannot be modified.', { requestId: 'immutability-violation' }); }

  return Object.freeze({ save, load, exists, delete: deleteRecord, find, findRange, update });
}

module.exports = Object.freeze({ createStorageLayer, ERROR_CODES, SUPPORTED_OBJECT_TYPES });
