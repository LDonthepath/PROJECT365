import { MarketDataValidator } from '../market-data/index.js';
import type { MarketDataInput } from '../market-data/index.js';
import type { HealthLayerConfig, HealthLayerStatus, HealthStatus, HealthState } from './types.js';

export const DEFAULT_HEALTH_TTL_MS = 300_000;

export class HealthLayer {
  private readonly ttlMs: number;

  constructor(config: HealthLayerConfig = {}) {
    const ttlMs = config.ttlMs ?? DEFAULT_HEALTH_TTL_MS;

    if (!Number.isFinite(ttlMs) || ttlMs <= 0) {
      throw new Error('Health Layer ttlMs must be a positive finite number');
    }

    this.ttlMs = ttlMs;
  }

  validate(marketData: unknown, currentTimestamp = Date.now()): HealthStatus {
    if (!Number.isFinite(currentTimestamp)) {
      throw new Error('Health Layer currentTimestamp must be a finite number');
    }

    try {
      MarketDataValidator.validate(marketData);
    } catch {
      return this.createStatus('INVALID', currentTimestamp, 0);
    }

    const ageMs = currentTimestamp - (marketData as MarketDataInput).fetchedAt;
    const status = ageMs > this.ttlMs ? 'STALE' : 'FRESH';

    return this.createStatus(status, currentTimestamp, ageMs);
  }

  getStatus(): HealthLayerStatus {
    return Object.freeze({
      ttlMs: this.ttlMs,
      ttlSec: this.ttlMs / 1_000,
      ttlMinutes: this.ttlMs / 60_000,
    });
  }

  private createStatus(status: HealthState, timestamp: number, ageMs: number): HealthStatus {
    return Object.freeze({
      status,
      timestamp,
      ageMs,
      ageMinutes: ageMs / 60_000,
      ttlMs: this.ttlMs,
      ttlMinutes: this.ttlMs / 60_000,
      isFresh: status === 'FRESH',
      isStale: status === 'STALE',
      isInvalid: status === 'INVALID',
    });
  }
}
