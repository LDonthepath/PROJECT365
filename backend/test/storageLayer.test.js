'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createStorageLayer, ERROR_CODES, SUPPORTED_OBJECT_TYPES } = require('../src/storageLayer');

function marketData(overrides = {}) {
  return Object.freeze({
    id: 'market-1', symbol: 'BTC', name: 'Bitcoin', priceUsd: 1, change1h: 0, change24h: 0,
    volume24hUsd: 1, marketCapUsd: 1, totalMarketCapUsd: 1, total3MarketCap: 1,
    btcDominance: 50, usdtDominance: 5, usdcDominance: 5, circulatingSupply: 1,
    ath: 1, atl: 1, fetchedAt: 1710000000000, fetchSource: 'test', contractVersion: '1.0',
    ...overrides,
  });
}

function snapshot(overrides = {}) {
  return Object.freeze({
    id: 'snapshot-1', timestamp: 1710000000000, type: 'Live',
    marketData: marketData(), healthStatus: Object.freeze({ status: 'VALID' }), contractVersion: '1.0',
    ...overrides,
  });
}

function saveRequest(overrides = {}) {
  const payload = overrides.payload || marketData(overrides.payloadOverrides);
  return { requestId: 'req-1', objectType: 'MarketData', payload, timestamp: payload.fetchedAt, ...overrides };
}

function assertError(result, code) {
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, code);
  assert.equal(typeof result.errorMessage === 'string' || code === ERROR_CODES.NOT_FOUND, true);
  assert.equal(Object.isFrozen(result), true);
}

test('exports Storage Layer factory and approved object types', () => {
  const storage = createStorageLayer();
  assert.deepEqual(SUPPORTED_OBJECT_TYPES, ['MarketData', 'Snapshot']);
  for (const method of ['save', 'load', 'exists', 'delete', 'find', 'findRange']) assert.equal(typeof storage[method], 'function');
});

test('save stores MarketData with required contract fields and immutable output metadata', () => {
  const storage = createStorageLayer({ now: () => 1710000000100 });
  const result = storage.save(saveRequest());
  assert.equal(result.ok, true);
  assert.equal(result.id, 'market-1');
  assert.equal(result.objectType, 'MarketData');
  assert.equal(result.storedAt, 1710000000100);
  assert.equal(result.metadata.requestId, 'req-1');
  const loaded = storage.load({ requestId: 'req-2', objectType: 'MarketData', id: 'market-1' });
  assert.equal(loaded.record.id, 'market-1');
  assert.equal(loaded.record.objectType, 'MarketData');
  assert.equal(loaded.record.timestamp, 1710000000000);
  assert.equal(loaded.record.payload.id, 'market-1');
  assert.equal(loaded.record.storedAt, 1710000000100);
  assert.equal(loaded.record.archived, false);
  assert.equal(loaded.record.contractVersion, '1.0');
  assert.equal(Object.isFrozen(loaded.record), true);
  assert.equal(Object.isFrozen(loaded.record.payload), true);
});

test('save stores Snapshot without redefining its payload contract', () => {
  const storage = createStorageLayer({ now: () => 1710000000200 });
  const payload = snapshot();
  const result = storage.save({ requestId: 'req-s', objectType: 'Snapshot', payload, timestamp: payload.timestamp });
  assert.equal(result.ok, true);
  const loaded = storage.load({ requestId: 'req-l', objectType: 'Snapshot', id: 'snapshot-1' });
  assert.equal(loaded.record.payload.healthStatus.status, 'VALID');
});

test('load, exists, delete, find, and findRange return approved success schemas', () => {
  const storage = createStorageLayer({ now: () => 1710000000200 });
  assert.equal(storage.save(saveRequest()).ok, true);
  assert.equal(storage.load({ requestId: 'load', objectType: 'MarketData', id: 'market-1' }).record.id, 'market-1');
  assert.equal(storage.exists({ requestId: 'exists', objectType: 'MarketData', id: 'market-1' }).exists, true);
  assert.equal(storage.find({ requestId: 'find', objectType: 'MarketData' }).records.length, 1);
  assert.equal(storage.findRange({ requestId: 'range', objectType: 'MarketData', fromTimestamp: 1, toTimestamp: 1710000000000 }).records.length, 1);
  assert.equal(storage.delete({ requestId: 'delete', objectType: 'MarketData', id: 'market-1' }).archived, true);
});

test('validation rejects invalid request, object type, payload contract, missing identity, and non-positive timestamp', () => {
  const storage = createStorageLayer();
  assertError(storage.save(null), ERROR_CODES.INVALID_REQUEST);
  assertError(storage.save(saveRequest({ objectType: 'Other' })), ERROR_CODES.UNSUPPORTED_OBJECT_TYPE);
  assertError(storage.save(saveRequest({ payload: { id: 'bad', contractVersion: '1.0' }, timestamp: 1 })), ERROR_CODES.INVALID_OBJECT_CONTRACT);
  assertError(storage.save(saveRequest({ payload: marketData({ id: '' }) })), ERROR_CODES.MISSING_OBJECT_IDENTITY);
  assertError(storage.save(saveRequest({ timestamp: 0 })), ERROR_CODES.INVALID_REQUEST);
  assertError(storage.load({ requestId: 'bad', objectType: 'MarketData', id: '' }), ERROR_CODES.MISSING_OBJECT_IDENTITY);
});

test('range and pagination boundary validation returns approved errors', () => {
  const storage = createStorageLayer();
  assertError(storage.findRange({ requestId: 'range', objectType: 'MarketData', fromTimestamp: 10, toTimestamp: 9 }), ERROR_CODES.INVALID_RANGE);
  assertError(storage.find({ requestId: 'page', objectType: 'MarketData', page: 0 }), ERROR_CODES.INVALID_PAGINATION);
  assertError(storage.find({ requestId: 'size', objectType: 'MarketData', pageSize: 501 }), ERROR_CODES.INVALID_PAGINATION);
});

test('idempotent save succeeds and same id with different payload returns IDENTITY_CONFLICT without side effects', () => {
  const storage = createStorageLayer({ now: () => 100 });
  const first = storage.save(saveRequest());
  const duplicate = storage.save(saveRequest({ requestId: 'dup' }));
  assert.equal(duplicate.ok, true);
  assert.equal(duplicate.id, first.id);
  assertError(storage.save(saveRequest({ requestId: 'conflict', payload: marketData({ priceUsd: 2 }) })), ERROR_CODES.IDENTITY_CONFLICT);
  assert.equal(storage.load({ requestId: 'load', objectType: 'MarketData', id: 'market-1' }).record.payload.priceUsd, 1);
});

test('missing load returns NotFound, empty range returns empty records, and retrieval unavailable is handled', () => {
  assertError(createStorageLayer().load({ requestId: 'miss', objectType: 'MarketData', id: 'none' }), ERROR_CODES.NOT_FOUND);
  const empty = createStorageLayer().findRange({ requestId: 'empty', objectType: 'MarketData', fromTimestamp: 1, toTimestamp: 2 });
  assert.equal(empty.ok, true);
  assert.deepEqual(empty.records, []);
  assertError(createStorageLayer({ retrievalUnavailable: true }).find({ requestId: 'down', objectType: 'MarketData' }), ERROR_CODES.RETRIEVAL_UNAVAILABLE);
});

test('delete archives metadata without mutating payload and archived records are excluded by default', () => {
  const storage = createStorageLayer();
  storage.save(saveRequest());
  const before = storage.load({ requestId: 'before', objectType: 'MarketData', id: 'market-1' }).record;
  const payloadBefore = JSON.stringify(before.payload);
  assert.equal(storage.delete({ requestId: 'del', objectType: 'MarketData', id: 'market-1' }).archived, true);
  assertError(storage.load({ requestId: 'after', objectType: 'MarketData', id: 'market-1' }), ERROR_CODES.NOT_FOUND);
  assert.equal(storage.find({ requestId: 'find', objectType: 'MarketData' }).records.length, 0);
  const archived = storage.find({ requestId: 'archived', objectType: 'MarketData', includeArchived: true }).records[0];
  assert.equal(archived.archived, true);
  assert.equal(JSON.stringify(archived.payload), payloadBefore);
  assertError(storage.delete({ requestId: 'again', objectType: 'MarketData', id: 'market-1' }), ERROR_CODES.DUPLICATE_IDENTITY);
});

test('stored records are immutable and explicit update attempts return IMMUTABILITY_VIOLATION', () => {
  const storage = createStorageLayer();
  storage.save(saveRequest());
  const loaded = storage.load({ requestId: 'load', objectType: 'MarketData', id: 'market-1' }).record;
  assert.throws(() => { loaded.payload.priceUsd = 99; }, TypeError);
  assert.equal(storage.load({ requestId: 'load2', objectType: 'MarketData', id: 'market-1' }).record.payload.priceUsd, 1);
  assertError(storage.update({ requestId: 'update', objectType: 'MarketData', id: 'market-1' }), ERROR_CODES.IMMUTABILITY_VIOLATION);
});

test('find orders equal timestamps by id, supports descending order, and paginates deterministically', () => {
  const storage = createStorageLayer();
  storage.save(saveRequest({ requestId: 'b', payload: marketData({ id: 'b-id' }) }));
  storage.save(saveRequest({ requestId: 'a', payload: marketData({ id: 'a-id' }) }));
  storage.save(saveRequest({ requestId: 'c', payload: marketData({ id: 'c-id', fetchedAt: 1710000000001 }), timestamp: 1710000000001 }));
  assert.deepEqual(storage.find({ requestId: 'asc', objectType: 'MarketData' }).records.map((r) => r.id), ['a-id', 'b-id', 'c-id']);
  const page = storage.find({ requestId: 'desc', objectType: 'MarketData', orderDirection: 'desc', page: 1, pageSize: 2 });
  assert.deepEqual(page.records.map((r) => r.id), ['c-id', 'b-id']);
  assert.equal(page.metadata.hasNextPage, true);
});
