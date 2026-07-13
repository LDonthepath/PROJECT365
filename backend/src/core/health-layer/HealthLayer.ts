import { MarketDataValidator } from '../market-data/MarketDataValidator.js';
import type { MarketDataInput } from '../market-data/types.js';
import type { HealthLayerConfig, HealthLayerStatus, HealthStatus } from './types.js';

const DEFAULT_TTL_MS = 300000;
const MS_PER_MINUTE = 60000;
const MS_PER_SECOND = 1000;

export class HealthLayer {
  private readonly ttlMs: number;

  constructor(config: HealthLayerConfig = {}) {
    this.ttlMs = config.ttlMs ?? DEFAULT_TTL_MS;
  }

  validate(marketData: unknown): Readonly<HealthStatus> {
    const timestamp = Date.now();

    try {
      MarketDataValidator.validate(marketData);
    } catch {
      return this.createStatus('INVALID', timestamp, 0);
    }

    const validMarketData = marketData as MarketDataInput;
    const ageMs = timestamp - validMarketData.fetchedAt;

    if (ageMs > this.ttlMs) {
      return this.createStatus('STALE', timestamp, ageMs);
    }

    return this.createStatus('FRESH', timestamp, ageMs);
  }

  getStatus(): Readonly<HealthLayerStatus> {
    return Object.freeze({
      ttlMs: this.ttlMs,
      ttlSec: this.ttlMs / MS_PER_SECOND,
      ttlMinutes: this.ttlMs / MS_PER_MINUTE,
    });
  }

  private createStatus(
    status: HealthStatus['status'],
    timestamp: number,
    ageMs: number,
  ): Readonly<HealthStatus> {
    return Object.freeze({
      status,
      timestamp,
      ageMs,
      ageMinutes: ageMs / MS_PER_MINUTE,
      ttlMs: this.ttlMs,
      ttlMinutes: this.ttlMs / MS_PER_MINUTE,
      isFresh: status === 'FRESH',
      isStale: status === 'STALE',
      isInvalid: status === 'INVALID',
    });
  }
}
