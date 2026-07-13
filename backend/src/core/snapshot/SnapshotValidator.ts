import type {
  SnapshotData,
  SnapshotInput,
  SnapshotMetadata,
  SnapshotQualityState,
} from './types.js';

export class MissingRequiredSnapshotFieldError extends Error {
  constructor(field: string) {
    super(`Missing required Snapshot field: ${field}`);
    this.name = 'MissingRequiredSnapshotFieldError';
  }
}

export class InvalidSnapshotFieldError extends Error {
  constructor(field: string, rule: string) {
    super(`Invalid Snapshot field ${field}: ${rule}`);
    this.name = 'InvalidSnapshotFieldError';
  }
}

type SnapshotField = keyof SnapshotInput & string;
type SnapshotMetadataField = keyof SnapshotMetadata & string;
type SnapshotQualityStateField = keyof SnapshotQualityState & string;

const REQUIRED_FIELDS: ReadonlyArray<SnapshotField> = [
  'id',
  'timestamp',
  'metadata',
  'data',
  'qualityState',
];
const REQUIRED_METADATA_FIELDS: ReadonlyArray<SnapshotMetadataField> = [
  'contractVersion',
  'createdBy',
  'source',
];
const REQUIRED_QUALITY_STATE_FIELDS: ReadonlyArray<SnapshotQualityStateField> = ['status'];
const VALID_QUALITY_STATUSES: ReadonlySet<SnapshotQualityState['status']> = new Set([
  'VALID',
  'STALE',
  'INVALID',
]);

export class SnapshotValidator {
  static validate(input: unknown): asserts input is SnapshotInput {
    if (input === null || typeof input !== 'object') {
      throw new MissingRequiredSnapshotFieldError('Snapshot');
    }

    const candidate = input as Record<string, unknown>;

    for (const field of REQUIRED_FIELDS) {
      if (!(field in candidate) || candidate[field] === undefined || candidate[field] === null) {
        throw new MissingRequiredSnapshotFieldError(field);
      }
    }

    if (typeof candidate.id !== 'string' || candidate.id.trim().length === 0) {
      throw new InvalidSnapshotFieldError('id', 'id must be a non-empty string');
    }

    if (typeof candidate.timestamp !== 'number' || !Number.isFinite(candidate.timestamp)) {
      throw new InvalidSnapshotFieldError('timestamp', 'timestamp must be a finite number');
    }

    if (candidate.timestamp <= 0) {
      throw new InvalidSnapshotFieldError('timestamp', 'timestamp > 0');
    }

    this.validateMetadata(candidate.metadata);
    this.validateData(candidate.data, 'data');
    this.validateQualityState(candidate.qualityState);
  }

  private static validateMetadata(metadata: unknown): asserts metadata is SnapshotMetadata {
    if (metadata === null || typeof metadata !== 'object' || Array.isArray(metadata)) {
      throw new MissingRequiredSnapshotFieldError('metadata');
    }

    const candidate = metadata as Record<string, unknown>;

    for (const field of REQUIRED_METADATA_FIELDS) {
      if (!(field in candidate) || candidate[field] === undefined || candidate[field] === null) {
        throw new MissingRequiredSnapshotFieldError(`metadata.${field}`);
      }

      if (typeof candidate[field] !== 'string' || candidate[field].trim().length === 0) {
        throw new InvalidSnapshotFieldError(
          `metadata.${field}`,
          `${field} must be a non-empty string`,
        );
      }
    }
  }

  private static validateQualityState(
    qualityState: unknown,
  ): asserts qualityState is SnapshotQualityState {
    if (qualityState === null || typeof qualityState !== 'object' || Array.isArray(qualityState)) {
      throw new MissingRequiredSnapshotFieldError('qualityState');
    }

    const candidate = qualityState as Record<string, unknown>;

    for (const field of REQUIRED_QUALITY_STATE_FIELDS) {
      if (!(field in candidate) || candidate[field] === undefined || candidate[field] === null) {
        throw new MissingRequiredSnapshotFieldError(`qualityState.${field}`);
      }
    }

    if (
      typeof candidate.status !== 'string' ||
      !VALID_QUALITY_STATUSES.has(candidate.status as SnapshotQualityState['status'])
    ) {
      throw new InvalidSnapshotFieldError(
        'qualityState.status',
        'status must be VALID, STALE, or INVALID',
      );
    }
  }

  private static validateData(data: unknown, path: string): asserts data is SnapshotData {
    if (data === null) {
      return;
    }

    const dataType = typeof data;

    if (dataType === 'string' || dataType === 'boolean') {
      return;
    }

    if (dataType === 'number') {
      if (!Number.isFinite(data)) {
        throw new InvalidSnapshotFieldError(path, 'numbers must be finite');
      }
      return;
    }

    if (Array.isArray(data)) {
      data.forEach((item, index) => this.validateData(item, `${path}[${index}]`));
      return;
    }

    if (dataType === 'object') {
      for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
        if (value === undefined) {
          throw new InvalidSnapshotFieldError(`${path}.${key}`, 'undefined values are not allowed');
        }
        this.validateData(value, `${path}.${key}`);
      }
      return;
    }

    throw new InvalidSnapshotFieldError(path, 'data must be JSON-serializable');
  }
}
