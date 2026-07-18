'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEventBus, ERROR_CODES, EVENT_REGISTRY } = require('../src/eventBus');

function event(overrides = {}) {
  const base = {
    eventId: 'event-1',
    eventType: 'MARKETDATA_PRODUCED',
    timestamp: 1710000000000,
    version: '1.0.0',
    publisher: 'Data Service',
    payload: Object.freeze({ ref: 'marketdata-1' }),
    correlationId: 'corr-1',
    metadata: {
      sourceModule: 'Data Service',
      contractVersion: '1.0.0',
      publishedAt: 1710000000001,
      payloadContract: 'MarketData',
      payloadId: 'marketdata-1',
      traceable: true,
    },
  };
  const candidate = { ...base, ...overrides };
  if (overrides.metadata) candidate.metadata = { ...base.metadata, ...overrides.metadata };
  return candidate;
}

function assertError(result, code) {
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, code);
  assert.equal(typeof result.errorMessage, 'string');
  assert.notEqual(result.errorMessage, '');
  assert.equal(typeof result.rejectedAt, 'number');
  assert.equal(Object.isFrozen(result), true);
}

test('exports CommonJS Event Bus module with approved registry and public interfaces', () => {
  const bus = createEventBus();
  assert.equal(EVENT_REGISTRY.MARKETDATA_PRODUCED.publisher, 'Data Service');
  assert.equal(typeof bus.publish, 'function');
  assert.equal(typeof bus.subscribe, 'function');
  assert.equal(typeof bus.unsubscribe, 'function');
  assert.equal(typeof bus.dispatch, 'function');
  assert.equal(typeof bus.getSubscribers, 'function');
});

test('subscribe validates subscriberId and active subscriber schema, and duplicate subscription is idempotent', () => {
  const bus = createEventBus();
  const first = bus.subscribe({ subscriberId: 'Health Layer', eventType: 'MARKETDATA_PRODUCED' });
  assert.equal(first.ok, true);
  assert.equal(first.subscriberId, 'Health Layer');
  assert.equal(first.eventType, 'MARKETDATA_PRODUCED');
  assert.equal(typeof first.subscribedAt, 'number');
  assert.equal(first.active, true);
  const duplicate = bus.subscribe({ subscriberId: 'Health Layer', eventType: 'MARKETDATA_PRODUCED' });
  assert.deepEqual(duplicate, first);
  assert.equal(bus.getSubscribers('MARKETDATA_PRODUCED').length, 1);
});

test('unsubscribe deactivates an active subscription and prevents later delivery', () => {
  const bus = createEventBus();
  let count = 0;
  bus.subscribe({ subscriberId: 'Health Layer', eventType: 'MARKETDATA_PRODUCED', handler: () => { count += 1; } });
  const removed = bus.unsubscribe({ subscriberId: 'Health Layer', eventType: 'MARKETDATA_PRODUCED' });
  assert.equal(removed.ok, true);
  assert.equal(removed.active, false);
  assert.equal(typeof removed.removedAt, 'number');
  assert.equal(bus.getSubscribers('MARKETDATA_PRODUCED').length, 0);
  assert.deepEqual(bus.publish(event()).deliveredSubscriberIds, []);
  assert.equal(count, 0);
});

test('publish accepts valid events, validates required event and metadata fields, and dispatches immutable payload notifications', () => {
  const bus = createEventBus();
  const notifications = [];
  bus.subscribe({ subscriberId: 'Health Layer', eventType: 'MARKETDATA_PRODUCED', handler: (notification) => notifications.push(notification) });
  bus.subscribe({ subscriberId: 'Storage Layer', eventType: 'MARKETDATA_PRODUCED' });
  const result = bus.publish(event());
  assert.equal(result.ok, true);
  assert.equal(result.eventId, 'event-1');
  assert.equal(result.eventType, 'MARKETDATA_PRODUCED');
  assert.deepEqual(result.deliveredSubscriberIds, ['Health Layer', 'Storage Layer']);
  assert.equal(typeof result.acceptedAt, 'number');
  assert.equal(notifications.length, 1);
  assert.equal(Object.isFrozen(notifications[0].event.payload), true);
});

test('event schema required fields are rejected when absent or invalid', () => {
  const required = ['eventId', 'eventType', 'timestamp', 'version', 'publisher', 'payload', 'correlationId', 'metadata'];
  for (const field of required) {
    const candidate = event();
    delete candidate[field];
    assertError(createEventBus().publish(candidate), ERROR_CODES.INVALID_EVENT_SCHEMA);
  }
  assertError(createEventBus().publish(event({ timestamp: 0 })), ERROR_CODES.INVALID_EVENT_SCHEMA);
});

test('rejects unapproved event types, unauthorized publishers, incompatible major versions, duplicate events, and payload contract redefinition', () => {
  assertError(createEventBus().publish(event({ eventType: 'UNKNOWN' })), ERROR_CODES.UNAPPROVED_EVENT_TYPE);
  assertError(createEventBus().publish(event({ publisher: 'Health Layer', metadata: { sourceModule: 'Health Layer' } })), ERROR_CODES.UNAUTHORIZED_PUBLISHER);
  assertError(createEventBus().publish(event({ version: '2.0.0', metadata: { contractVersion: '2.0.0' } })), ERROR_CODES.INCOMPATIBLE_EVENT_VERSION);
  assertError(createEventBus().publish(event({ metadata: { payloadContract: 'Snapshot' } })), ERROR_CODES.PAYLOAD_CONTRACT_REDEFINITION);
  const bus = createEventBus();
  assert.equal(bus.publish(event()).ok, true);
  assertError(bus.publish(event()), ERROR_CODES.DUPLICATE_EVENT);
});

test('metadata validation rejects source, version, timestamp, payloadId, payloadContract, and traceability mismatches', () => {
  assertError(createEventBus().publish(event({ metadata: { sourceModule: 'Storage Layer' } })), ERROR_CODES.INVALID_METADATA);
  assertError(createEventBus().publish(event({ metadata: { contractVersion: '1.0.1' } })), ERROR_CODES.INVALID_METADATA);
  assertError(createEventBus().publish(event({ metadata: { publishedAt: 0 } })), ERROR_CODES.INVALID_METADATA);
  assertError(createEventBus().publish(event({ metadata: { payloadId: '' } })), ERROR_CODES.INVALID_METADATA);
  assertError(createEventBus().publish(event({ metadata: { payloadContract: '' } })), ERROR_CODES.INVALID_METADATA);
  assertError(createEventBus().publish(event({ metadata: { traceable: false } })), ERROR_CODES.INVALID_METADATA);
});

test('subscriber validation permits only downstream approved subscribers and rejects reverse dependency subscriptions', () => {
  assertError(createEventBus().subscribe({ subscriberId: 'Portfolio Intelligence', eventType: 'MARKETDATA_PRODUCED' }), ERROR_CODES.UNAUTHORIZED_SUBSCRIBER);
  assertError(createEventBus().subscribe({ subscriberId: 'Data Service', eventType: 'MARKETDATA_PRODUCED' }), ERROR_CODES.REVERSE_DEPENDENCY_SUBSCRIPTION);
  assertError(createEventBus().subscribe({ subscriberId: '', eventType: 'MARKETDATA_PRODUCED' }), ERROR_CODES.UNAUTHORIZED_SUBSCRIBER);
  assertError(createEventBus().subscribe({ subscriberId: 'Health Layer', eventType: 'UNKNOWN' }), ERROR_CODES.UNAPPROVED_EVENT_TYPE);
});

test('same timestamp events are delivered by eventId lexicographically within event type', () => {
  const bus = createEventBus();
  const delivered = [];
  bus.subscribe({ subscriberId: 'Health Layer', eventType: 'MARKETDATA_PRODUCED', handler: (notification) => delivered.push(notification.event.eventId) });
  bus.publish(event({ eventId: 'event-b' }));
  bus.publish(event({ eventId: 'event-a' }));
  assert.deepEqual(delivered, ['event-b', 'event-a']);
  bus.queues.set('MARKETDATA_PRODUCED', [event({ eventId: 'event-d' }), event({ eventId: 'event-c' })]);
  bus.dispatch('MARKETDATA_PRODUCED');
  assert.deepEqual(delivered.slice(-2), ['event-c', 'event-d']);
});

test('cross-event-type ordering is not guaranteed by dispatch and rejected events are not delivered', () => {
  const bus = createEventBus();
  let delivered = 0;
  bus.subscribe({ subscriberId: 'Health Layer', eventType: 'MARKETDATA_PRODUCED', handler: () => { delivered += 1; } });
  assertError(bus.publish(event({ eventId: '', eventType: 'UNKNOWN' })), ERROR_CODES.INVALID_EVENT_SCHEMA);
  assert.equal(delivered, 0);
  assertError(bus.dispatch('UNKNOWN'), ERROR_CODES.UNAPPROVED_EVENT_TYPE);
  assert.equal(bus.publish(event({ eventId: 'cross-a', eventType: 'MARKETDATA_PRODUCED' })).ok, true);
  const snapshot = event({ eventId: 'cross-b', eventType: 'SNAPSHOT_CREATED', publisher: 'Snapshot Engine', payload: { ref: 'snapshot-1' }, metadata: { sourceModule: 'Snapshot Engine', payloadContract: 'Snapshot', payloadId: 'snapshot-1' } });
  assert.equal(createEventBus().publish(snapshot).ok, true);
});
