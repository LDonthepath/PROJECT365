'use strict';

const EVENT_REGISTRY = Object.freeze({
  MARKETDATA_PRODUCED: Object.freeze({ publisher: 'Data Service', payloadContract: 'MarketData', majorVersion: 1, allowedSubscribers: Object.freeze(['Health Layer', 'Storage Layer']) }),
  MARKETDATA_HEALTH_EVALUATED: Object.freeze({ publisher: 'Health Layer', payloadContract: 'HealthStatus', majorVersion: 1, allowedSubscribers: Object.freeze(['Snapshot Engine']) }),
  SNAPSHOT_CREATED: Object.freeze({ publisher: 'Snapshot Engine', payloadContract: 'Snapshot', majorVersion: 1, allowedSubscribers: Object.freeze(['Storage Layer', 'Market Intelligence consumers']) }),
  FOUNDATION_OBJECT_STORED: Object.freeze({ publisher: 'Storage Layer', payloadContract: 'Storage metadata', majorVersion: 1, allowedSubscribers: Object.freeze(['Governance auditability consumers']) }),
});

const ERROR_CODES = Object.freeze({
  UNAPPROVED_EVENT_TYPE: 'UNAPPROVED_EVENT_TYPE',
  INVALID_EVENT_SCHEMA: 'INVALID_EVENT_SCHEMA',
  INVALID_METADATA: 'INVALID_METADATA',
  UNAUTHORIZED_PUBLISHER: 'UNAUTHORIZED_PUBLISHER',
  UNAUTHORIZED_SUBSCRIBER: 'UNAUTHORIZED_SUBSCRIBER',
  REVERSE_DEPENDENCY_SUBSCRIPTION: 'REVERSE_DEPENDENCY_SUBSCRIPTION',
  DUPLICATE_EVENT: 'DUPLICATE_EVENT',
  INCOMPATIBLE_EVENT_VERSION: 'INCOMPATIBLE_EVENT_VERSION',
  PAYLOAD_CONTRACT_REDEFINITION: 'PAYLOAD_CONTRACT_REDEFINITION',
});

const REVERSE_SUBSCRIPTION_ATTEMPTS = Object.freeze({
  MARKETDATA_PRODUCED: Object.freeze(['Data Service']),
  MARKETDATA_HEALTH_EVALUATED: Object.freeze(['Data Service', 'Health Layer']),
  SNAPSHOT_CREATED: Object.freeze(['Data Service', 'Health Layer', 'Snapshot Engine']),
  FOUNDATION_OBJECT_STORED: Object.freeze(['Data Service', 'Health Layer', 'Snapshot Engine', 'Storage Layer', 'Market Intelligence consumers']),
});

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function freezeCopy(value) {
  if (Array.isArray(value)) return Object.freeze(value.map(freezeCopy));
  if (isPlainObject(value)) {
    const copy = {};
    for (const [key, inner] of Object.entries(value)) copy[key] = freezeCopy(inner);
    return Object.freeze(copy);
  }
  return value;
}

function reject(errorCode, errorMessage, options = {}) {
  const result = { ok: false, errorCode, errorMessage, rejectedAt: Date.now() };
  if (options.eventId) result.eventId = options.eventId;
  if (options.subscriberId) result.subscriberId = options.subscriberId;
  return Object.freeze(result);
}

function major(version) {
  if (typeof version !== 'string') return NaN;
  const match = version.match(/^(\d+)\.\d+\.\d+$/);
  return match ? Number(match[1]) : NaN;
}

function validateMetadata(event, registryEntry) {
  if (!isPlainObject(event.metadata)) return reject(ERROR_CODES.INVALID_METADATA, 'Event metadata must be an object.', { eventId: event.eventId });
  const metadata = event.metadata;
  if (metadata.sourceModule !== event.publisher) return reject(ERROR_CODES.INVALID_METADATA, 'metadata.sourceModule must equal publisher.', { eventId: event.eventId });
  if (metadata.contractVersion !== event.version) return reject(ERROR_CODES.INVALID_METADATA, 'metadata.contractVersion must match event version.', { eventId: event.eventId });
  if (typeof metadata.publishedAt !== 'number' || !Number.isFinite(metadata.publishedAt) || metadata.publishedAt <= 0) return reject(ERROR_CODES.INVALID_METADATA, 'metadata.publishedAt must be a positive Unix epoch millisecond timestamp.', { eventId: event.eventId });
  if (metadata.traceable !== true) return reject(ERROR_CODES.INVALID_METADATA, 'metadata.traceable must be true.', { eventId: event.eventId });
  if (typeof metadata.payloadId !== 'string' || metadata.payloadId.trim() === '') return reject(ERROR_CODES.INVALID_METADATA, 'metadata.payloadId must be a non-empty string.', { eventId: event.eventId });
  if (typeof metadata.payloadContract !== 'string' || metadata.payloadContract.trim() === '') return reject(ERROR_CODES.INVALID_METADATA, 'metadata.payloadContract must be a non-empty string.', { eventId: event.eventId });
  if (metadata.payloadContract !== registryEntry.payloadContract) return reject(ERROR_CODES.PAYLOAD_CONTRACT_REDEFINITION, 'metadata.payloadContract must match the approved registry payload contract.', { eventId: event.eventId });
  return null;
}

function validateEvent(event, acceptedEventIds) {
  if (!isPlainObject(event)) return reject(ERROR_CODES.INVALID_EVENT_SCHEMA, 'DomainEvent must be an object.');
  const eventId = typeof event.eventId === 'string' ? event.eventId.trim() : '';
  if (eventId === '' || typeof event.eventType !== 'string' || typeof event.timestamp !== 'number' || !Number.isFinite(event.timestamp) || event.timestamp <= 0 || typeof event.version !== 'string' || typeof event.publisher !== 'string' || !isPlainObject(event.payload) || typeof event.correlationId !== 'string' || event.correlationId.trim() === '' || !isPlainObject(event.metadata)) {
    return reject(ERROR_CODES.INVALID_EVENT_SCHEMA, 'DomainEvent is missing required fields or contains invalid required field shapes.', { eventId });
  }
  const registryEntry = EVENT_REGISTRY[event.eventType];
  if (!registryEntry) return reject(ERROR_CODES.UNAPPROVED_EVENT_TYPE, 'Event type is not approved by the Event Registry.', { eventId });
  if (event.publisher !== registryEntry.publisher) return reject(ERROR_CODES.UNAUTHORIZED_PUBLISHER, 'Publisher does not own this event type.', { eventId });
  if (major(event.version) !== registryEntry.majorVersion) return reject(ERROR_CODES.INCOMPATIBLE_EVENT_VERSION, 'Event version is incompatible with the registry major version.', { eventId });
  const metadataFailure = validateMetadata(event, registryEntry);
  if (metadataFailure) return metadataFailure;
  if (acceptedEventIds.has(eventId)) return reject(ERROR_CODES.DUPLICATE_EVENT, 'Duplicate eventId after prior acceptance.', { eventId });
  return null;
}

function createAcceptedSubscription(subscriberId, eventType, subscribedAt) {
  return Object.freeze({ ok: true, subscriberId, eventType, subscribedAt, active: true });
}

class EventBus {
  constructor() {
    this.subscriptions = new Map();
    this.handlers = new Map();
    this.acceptedEventIds = new Set();
    this.queues = new Map();
    this.deliveredEvents = [];
  }

  subscriptionKey(subscriberId, eventType) {
    return `${subscriberId}\u0000${eventType}`;
  }

  subscribe(request) {
    if (!isPlainObject(request)) return reject(ERROR_CODES.UNAUTHORIZED_SUBSCRIBER, 'SubscriptionRequest must be an object.');
    const subscriberId = typeof request.subscriberId === 'string' ? request.subscriberId.trim() : '';
    const eventType = typeof request.eventType === 'string' ? request.eventType.trim() : '';
    if (subscriberId === '') return reject(ERROR_CODES.UNAUTHORIZED_SUBSCRIBER, 'subscriberId must identify an approved subscriber.', { subscriberId });
    const registryEntry = EVENT_REGISTRY[eventType];
    if (!registryEntry) return reject(ERROR_CODES.UNAPPROVED_EVENT_TYPE, 'Requested event type is not approved.', { subscriberId });
    if ((REVERSE_SUBSCRIPTION_ATTEMPTS[eventType] || []).includes(subscriberId)) return reject(ERROR_CODES.REVERSE_DEPENDENCY_SUBSCRIPTION, 'Subscription would violate approved dependency direction.', { subscriberId });
    if (!registryEntry.allowedSubscribers.includes(subscriberId)) return reject(ERROR_CODES.UNAUTHORIZED_SUBSCRIBER, 'Subscriber is not permitted for this event type.', { subscriberId });
    const key = this.subscriptionKey(subscriberId, eventType);
    const existing = this.subscriptions.get(key);
    if (existing && existing.active) return createAcceptedSubscription(existing.subscriberId, existing.eventType, existing.subscribedAt);
    const subscription = Object.freeze({ subscriberId, eventType, subscribedAt: Date.now(), active: true });
    this.subscriptions.set(key, subscription);
    if (typeof request.handler === 'function') this.handlers.set(key, request.handler);
    return createAcceptedSubscription(subscription.subscriberId, subscription.eventType, subscription.subscribedAt);
  }

  unsubscribe(request) {
    if (!isPlainObject(request)) return reject(ERROR_CODES.UNAUTHORIZED_SUBSCRIBER, 'SubscriptionRequest must be an object.');
    const subscriberId = typeof request.subscriberId === 'string' ? request.subscriberId.trim() : '';
    const eventType = typeof request.eventType === 'string' ? request.eventType.trim() : '';
    if (subscriberId === '') return reject(ERROR_CODES.UNAUTHORIZED_SUBSCRIBER, 'subscriberId must identify an approved subscriber.', { subscriberId });
    if (!EVENT_REGISTRY[eventType]) return reject(ERROR_CODES.UNAPPROVED_EVENT_TYPE, 'Requested event type is not approved.', { subscriberId });
    const key = this.subscriptionKey(subscriberId, eventType);
    const existing = this.subscriptions.get(key);
    if (!existing || !existing.active) return reject(ERROR_CODES.UNAUTHORIZED_SUBSCRIBER, 'No active permitted subscription exists for removal.', { subscriberId });
    const removed = Object.freeze({ ok: true, subscriberId, eventType, subscribedAt: existing.subscribedAt, active: false, removedAt: Date.now() });
    this.subscriptions.set(key, Object.freeze({ subscriberId, eventType, subscribedAt: existing.subscribedAt, active: false }));
    this.handlers.delete(key);
    return removed;
  }

  getSubscribers(eventType) {
    if (!EVENT_REGISTRY[eventType]) return reject(ERROR_CODES.UNAPPROVED_EVENT_TYPE, 'Event type is not approved.');
    return Object.freeze([...this.subscriptions.values()].filter((subscription) => subscription.eventType === eventType && subscription.active).map(freezeCopy));
  }

  publish(event) {
    const failure = validateEvent(event, this.acceptedEventIds);
    if (failure) return failure;
    const acceptedEvent = freezeCopy(event);
    this.acceptedEventIds.add(acceptedEvent.eventId);
    if (!this.queues.has(acceptedEvent.eventType)) this.queues.set(acceptedEvent.eventType, []);
    this.queues.get(acceptedEvent.eventType).push(acceptedEvent);
    this.queues.get(acceptedEvent.eventType).sort((left, right) => left.timestamp - right.timestamp || left.eventId.localeCompare(right.eventId));
    const deliveredSubscriberIds = this.dispatch(acceptedEvent.eventType);
    return Object.freeze({ ok: true, eventId: acceptedEvent.eventId, eventType: acceptedEvent.eventType, deliveredSubscriberIds, acceptedAt: Date.now() });
  }

  dispatch(eventType) {
    if (!EVENT_REGISTRY[eventType]) return reject(ERROR_CODES.UNAPPROVED_EVENT_TYPE, 'Event type is not approved.');
    const subscribers = this.getSubscribers(eventType);
    const deliveredIds = [];
    const queue = this.queues.get(eventType) || [];
    queue.sort((left, right) => left.timestamp - right.timestamp || left.eventId.localeCompare(right.eventId));
    while (queue.length > 0) {
      const event = queue.shift();
      for (const subscriber of subscribers) {
        const key = this.subscriptionKey(subscriber.subscriberId, eventType);
        const handler = this.handlers.get(key);
        const notification = Object.freeze({ event, subscriberId: subscriber.subscriberId, deliveredAt: Date.now() });
        this.deliveredEvents.push(notification);
        if (handler) handler(notification);
        if (!deliveredIds.includes(subscriber.subscriberId)) deliveredIds.push(subscriber.subscriberId);
      }
    }
    return Object.freeze(deliveredIds);
  }
}

function createEventBus() {
  return new EventBus();
}

module.exports = Object.freeze({ EVENT_REGISTRY, ERROR_CODES, EventBus, createEventBus });
