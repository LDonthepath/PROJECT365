import type {
  Snapshot,
  SnapshotData,
  SnapshotInput,
  SnapshotMetadata,
  SnapshotQualityState,
} from './types.js';
import { SnapshotValidator } from './SnapshotValidator.js';

const cloneSnapshotData = (data: SnapshotData): SnapshotData => {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => cloneSnapshotData(item));
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, cloneSnapshotData(value)]),
  ) as SnapshotData;
};

const deepFreeze = <T>(value: T): Readonly<T> => {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);

    for (const nestedValue of Object.values(value)) {
      deepFreeze(nestedValue);
    }
  }

  return value;
};

export class SnapshotFactory {
  static create(input: SnapshotInput): Readonly<Snapshot> {
    SnapshotValidator.validate(input);

    const metadata: SnapshotMetadata = {
      contractVersion: input.metadata.contractVersion,
      createdBy: input.metadata.createdBy,
      source: input.metadata.source,
    };

    const qualityState: SnapshotQualityState = {
      status: input.qualityState.status,
    };

    const snapshot: Snapshot = {
      id: input.id,
      timestamp: input.timestamp,
      metadata,
      data: cloneSnapshotData(input.data),
      qualityState,
    };

    return deepFreeze(snapshot) as Readonly<Snapshot>;
  }
}
