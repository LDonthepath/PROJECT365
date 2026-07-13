export type HealthState = 'FRESH' | 'STALE' | 'INVALID';

export interface HealthStatus {
  status: HealthState;
  timestamp: number;
  ageMs: number;
  ageMinutes: number;
  ttlMs: number;
  ttlMinutes: number;
  isFresh: boolean;
  isStale: boolean;
  isInvalid: boolean;
}

export interface HealthLayerConfig {
  ttlMs?: number;
}

export interface HealthLayerStatus {
  ttlMs: number;
  ttlSec: number;
  ttlMinutes: number;
}
