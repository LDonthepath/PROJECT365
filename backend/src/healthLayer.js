'use strict';

const { REQUIRED_FIELDS } = require('./marketData');

const DEFAULT_TTL_MS = 300000;
const MILLISECONDS_PER_MINUTE = 60000;

const HEALTH_STATUS_FIELDS = Object.freeze([
  'status',
  'timestamp',
  'ageMs',
  'ageMinutes',
  'ttlMs',
  'ttlMinutes',
  'isFresh',
  'isStale',
  'isInvalid',
]);

function getStatus() {
  return Object.freeze({
    ttlMs: DEFAULT_TTL_MS,
    ttlSec: DEFAULT_TTL_MS / 1000,
    ttlMinutes: DEFAULT_TTL_MS / MILLISECONDS_PER_MINUTE,
  });
}

function isPlainObject(marketData) {
  return marketData !== null && marketData !== undefined && typeof marketData === 'object' && !Array.isArray(marketData);
}

function hasValidMarketDataContract(marketData) {
  if (!isPlainObject(marketData)) return false;

  for (const field of REQUIRED_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(marketData, field)) return false;
  }

  if (Object.keys(marketData).length !== REQUIRED_FIELDS.length) return false;

  if (typeof marketData.fetchedAt !== 'number' || !Number.isFinite(marketData.fetchedAt) || marketData.fetchedAt <= 0) return false;

  return true;
}

function createHealthStatus(status, timestamp, ageMs) {
  const ttlMs = DEFAULT_TTL_MS;
  const healthStatus = {
    status,
    timestamp,
    ageMs,
    ageMinutes: ageMs / MILLISECONDS_PER_MINUTE,
    ttlMs,
    ttlMinutes: ttlMs / MILLISECONDS_PER_MINUTE,
    isFresh: status === 'FRESH',
    isStale: status === 'STALE',
    isInvalid: status === 'INVALID',
  };

  return Object.freeze(healthStatus);
}

function validate(marketData) {
  const timestamp = Date.now();

  if (!hasValidMarketDataContract(marketData)) {
    return createHealthStatus('INVALID', timestamp, 0);
  }

  const ageMs = timestamp - marketData.fetchedAt;
  if (ageMs < 0) {
    return createHealthStatus('INVALID', timestamp, 0);
  }

  if (ageMs > DEFAULT_TTL_MS) {
    return createHealthStatus('STALE', timestamp, ageMs);
  }

  return createHealthStatus('FRESH', timestamp, ageMs);
}

module.exports = Object.freeze({
  HEALTH_STATUS_FIELDS,
  validate,
  getStatus,
});
