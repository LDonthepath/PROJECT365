'use strict';

const CONTRACT_VERSION = '1.0';
const ERROR_CODES = Object.freeze({
  VALIDATION_FAILED: 'PROVIDER_VALIDATION_FAILED', CONTRACT_INVALID: 'PROVIDER_CONTRACT_INVALID', FACTORY_INVALID: 'PROVIDER_FACTORY_INVALID',
  CAPABILITY_INVALID: 'PROVIDER_CAPABILITY_INVALID', ALREADY_REGISTERED: 'PROVIDER_ALREADY_REGISTERED', NOT_REGISTERED: 'PROVIDER_NOT_REGISTERED',
  REGISTRY_DISPOSED: 'PROVIDER_REGISTRY_DISPOSED', CREATE_FAILED: 'PROVIDER_CREATE_FAILED', FACTORY_DISPOSED: 'PROVIDER_FACTORY_DISPOSED',
  DISPOSE_FAILED: 'PROVIDER_DISPOSE_FAILED', DISPOSED: 'PROVIDER_DISPOSED', STATE_INVALID: 'PROVIDER_STATE_INVALID',
  UNSUPPORTED_CAPABILITY: 'PROVIDER_UNSUPPORTED_CAPABILITY', SOURCE_UNAVAILABLE: 'PROVIDER_SOURCE_UNAVAILABLE', TIMEOUT: 'PROVIDER_TIMEOUT',
  RATE_LIMITED: 'PROVIDER_RATE_LIMITED', AUTH_FAILED: 'PROVIDER_AUTH_FAILED', MALFORMED_RESPONSE: 'PROVIDER_MALFORMED_RESPONSE',
  NORMALIZATION_FAILED: 'PROVIDER_NORMALIZATION_FAILED', RETRY_EXHAUSTED: 'PROVIDER_RETRY_EXHAUSTED', HEALTH_CHECK_FAILED: 'PROVIDER_HEALTH_CHECK_FAILED',
  UNKNOWN_ERROR: 'PROVIDER_UNKNOWN_ERROR',
});

function now() { return new Date().toISOString(); }
function isPlainObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function sanitize(value) {
  if (typeof value === 'string') return value.replace(/(api[-_ ]?key|token|secret|password)=?[^\s&]*/gi, '$1=[REDACTED]');
  if (Array.isArray(value)) return value.map(sanitize);
  if (isPlainObject(value)) {
    const out = {};
    for (const [key, val] of Object.entries(value)) out[key] = /api[-_]?key|token|secret|password/i.test(key) ? '[REDACTED]' : sanitize(val);
    return out;
  }
  return value;
}
function providerError(fields = {}) {
  const code = fields.code || ERROR_CODES.UNKNOWN_ERROR;
  return Object.freeze({
    status: 'error', code, category: fields.category || 'provider', message: sanitize(fields.message || code),
    providerId: fields.providerId || null, requestId: fields.requestId || null, occurredAt: fields.occurredAt || now(),
    retryable: fields.retryable === undefined ? false : fields.retryable, retryAfterMs: fields.retryAfterMs ?? null,
    attempt: fields.attempt ?? null, maxAttempts: fields.maxAttempts ?? null, rateLimited: fields.rateLimited === true,
    timeout: fields.timeout === true, capability: fields.capability || null, attribution: Object.freeze(sanitize(fields.attribution || {})),
    details: Object.freeze(sanitize(fields.details || {})), contractVersion: CONTRACT_VERSION,
  });
}
function isProviderError(value) { return isPlainObject(value) && value.status === 'error' && typeof value.code === 'string'; }
function providerResult(fields) {
  return Object.freeze({
    status: 'success', providerId: fields.providerId, providerName: fields.providerName, providerVersion: fields.providerVersion,
    capability: fields.capability, requestId: fields.requestId || null, fetchedAt: fields.fetchedAt || now(), receivedAt: fields.receivedAt || now(),
    normalizedAt: fields.normalizedAt || now(), payload: Object.freeze(sanitize(fields.payload || {})),
    attribution: Object.freeze(sanitize(fields.attribution || {})), metadata: Object.freeze(sanitize(fields.metadata || {})), contractVersion: CONTRACT_VERSION,
  });
}
function providerHealth(fields) {
  return Object.freeze({ status: fields.status, providerId: fields.providerId, checkedAt: fields.checkedAt || now(), checkType: fields.checkType || 'self',
    latencyMs: fields.latencyMs ?? null, available: fields.available === true, rateLimited: fields.rateLimited === true, retryAfterMs: fields.retryAfterMs ?? null,
    message: fields.message || '', details: Object.freeze(sanitize(fields.details || {})), contractVersion: CONTRACT_VERSION });
}
function providerCapability(fields) { return Object.freeze({ name: fields.name, version: fields.version || CONTRACT_VERSION, description: fields.description || '', inputSchema: fields.inputSchema || {}, outputSchema: fields.outputSchema || {}, supportsNormalization: fields.supportsNormalization !== false, supportsHealthCheck: fields.supportsHealthCheck !== false, rateLimitPolicy: fields.rateLimitPolicy || {}, timeoutPolicy: fields.timeoutPolicy || {}, retryPolicy: fields.retryPolicy || {}, deprecated: fields.deprecated === true, contractVersion: CONTRACT_VERSION }); }
function validateCapability(cap) { return isPlainObject(cap) && typeof cap.name === 'string' && cap.name !== '' && typeof cap.version === 'string'; }
function hasMethods(obj, methods) { return methods.every((m) => typeof obj[m] === 'function'); }

class BaseProvider {
  constructor({ id, name, version }) { this.id = id; this.name = name; this.version = version; this.state = 'created'; }
  validate() { this.state = 'ready'; return Object.freeze({ status: 'valid', providerId: this.id, contractVersion: CONTRACT_VERSION }); }
  fetch() { return providerError({ code: ERROR_CODES.CONTRACT_INVALID, providerId: this.id }); }
  normalize() { return providerError({ code: ERROR_CODES.CONTRACT_INVALID, providerId: this.id }); }
  health() { return providerHealth({ status: 'unknown', providerId: this.id, available: false }); }
  capabilities() { return []; }
  supports(capability) { const name = typeof capability === 'string' ? capability : capability && capability.name; return this.capabilities().some((cap) => cap.name === name); }
  dispose() { this.state = 'disposed'; return Object.freeze({ status: 'disposed', providerId: this.id, contractVersion: CONTRACT_VERSION }); }
}

class BaseProviderFactory {
  constructor({ providerId, version }) { this.providerId = providerId; this.version = version; this.state = 'ready'; }
  validate() { return Object.freeze({ status: 'valid', providerId: this.providerId, contractVersion: CONTRACT_VERSION }); }
  create() { return providerError({ code: ERROR_CODES.CONTRACT_INVALID, providerId: this.providerId }); }
  capabilities() { return []; }
  dispose() { this.state = 'disposed'; return Object.freeze({ status: 'disposed', providerId: this.providerId, contractVersion: CONTRACT_VERSION }); }
}

function withRegistryOperation(registry, fn) {
  if (registry.state === 'disposed') return providerError({ code: ERROR_CODES.REGISTRY_DISPOSED });
  const previous = registry.state;
  registry.state = 'active';
  try { return fn(); } finally { if (registry.state !== 'disposed') registry.state = previous === 'empty' ? 'ready' : previous; }
}

class ProviderRegistry {
  constructor() { this.state = 'empty'; this.entries = new Map(); this.instances = new Set(); }
  register(definition, factory, context = {}) {
    if (this.state === 'disposed') return providerError({ code: ERROR_CODES.REGISTRY_DISPOSED });
    const previous = this.state;
    this.state = 'active';
    try {
      if (!isPlainObject(definition) || !definition.providerId || !definition.name || !definition.version) return providerError({ code: ERROR_CODES.VALIDATION_FAILED });
      if (this.entries.has(definition.providerId)) return providerError({ code: ERROR_CODES.ALREADY_REGISTERED, providerId: definition.providerId });
      if (!Array.isArray(definition.capabilities) || !definition.capabilities.every(validateCapability)) return providerError({ code: ERROR_CODES.CAPABILITY_INVALID, providerId: definition.providerId });
      if (!(factory instanceof BaseProviderFactory) || !hasMethods(factory, ['validate', 'create', 'capabilities', 'dispose'])) return providerError({ code: ERROR_CODES.FACTORY_INVALID, providerId: definition.providerId });
      const valid = factory.validate(definition, context); if (isProviderError(valid)) return valid;
      const entry = Object.freeze({ status: 'registered', definition: Object.freeze({ ...definition }), factory, registeredAt: now(), contractVersion: CONTRACT_VERSION });
      this.entries.set(definition.providerId, entry); return entry;
    } finally { if (this.state !== 'disposed') this.state = previous === 'empty' ? 'ready' : previous; }
  }
  resolve(providerId) { return withRegistryOperation(this, () => this.entries.get(providerId) || providerError({ code: ERROR_CODES.NOT_REGISTERED, providerId })); }
  create(providerId, options = {}, context = {}) { return withRegistryOperation(this, () => { const entry = this.entries.get(providerId) || providerError({ code: ERROR_CODES.NOT_REGISTERED, providerId }); if (isProviderError(entry)) return entry; const provider = entry.factory.create({ ...entry.definition, options }, context); if (isProviderError(provider)) return provider; if (!provider || provider.id !== providerId || !provider.name || !provider.version || !hasMethods(provider, ['validate','fetch','normalize','health','capabilities','supports','dispose'])) return providerError({ code: ERROR_CODES.CONTRACT_INVALID, providerId }); this.instances.add(provider); return provider; }); }
  validate(providerId) { return withRegistryOperation(this, () => this.entries.has(providerId) ? Object.freeze({ status: 'valid', providerId, contractVersion: CONTRACT_VERSION }) : providerError({ code: ERROR_CODES.NOT_REGISTERED, providerId })); }
  capabilities(providerId, context = {}) { return withRegistryOperation(this, () => { const entry = this.entries.get(providerId) || providerError({ code: ERROR_CODES.NOT_REGISTERED, providerId }); return isProviderError(entry) ? entry : entry.factory.capabilities(context); }); }
  health(providerId, context = {}) { return withRegistryOperation(this, () => { const entry = this.entries.get(providerId) || providerError({ code: ERROR_CODES.NOT_REGISTERED, providerId }); if (isProviderError(entry)) return entry; const provider = entry.factory.create({ ...entry.definition, options: {} }, context); if (isProviderError(provider)) return provider; this.instances.add(provider); return provider.health(context); }); }
  supports(providerId, capability) { return withRegistryOperation(this, () => { const entry = this.entries.get(providerId) || providerError({ code: ERROR_CODES.NOT_REGISTERED, providerId }); if (isProviderError(entry)) return entry; const caps = entry.factory.capabilities(); return isProviderError(caps) ? caps : caps.some((cap) => cap.name === (typeof capability === 'string' ? capability : capability.name)); }); }
  unregister(providerId) { return withRegistryOperation(this, () => { if (!this.entries.delete(providerId)) return providerError({ code: ERROR_CODES.NOT_REGISTERED, providerId }); if (this.entries.size === 0) this.state = 'empty'; return Object.freeze({ status: 'unregistered', providerId, contractVersion: CONTRACT_VERSION }); }); }
  dispose(context = {}) { if (this.state === 'disposed') return Object.freeze({ status: 'disposed', contractVersion: CONTRACT_VERSION }); this.state = 'disposed'; for (const p of this.instances) p.dispose(context); for (const e of this.entries.values()) e.factory.dispose(context); return Object.freeze({ status: 'disposed', contractVersion: CONTRACT_VERSION }); }
}

module.exports = { CONTRACT_VERSION, ERROR_CODES, BaseProvider, BaseProviderFactory, ProviderRegistry, providerError, providerResult, providerHealth, providerCapability, isProviderError, sanitize };
