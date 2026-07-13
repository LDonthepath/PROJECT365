export type SnapshotPrimitive = string | number | boolean | null;
export type SnapshotData = SnapshotPrimitive | SnapshotData[] | { [key: string]: SnapshotData };

export interface SnapshotMetadata {
  contractVersion: string;
  createdBy: string;
  source: string;
}

export interface SnapshotQualityState {
  status: 'VALID' | 'STALE' | 'INVALID';
}

export interface SnapshotInput {
  id: string;
  timestamp: number;
  metadata: SnapshotMetadata;
  data: SnapshotData;
  qualityState: SnapshotQualityState;
}

export interface Snapshot {
  id: string;
  timestamp: number;
  metadata: Readonly<SnapshotMetadata>;
  data: Readonly<SnapshotData>;
  qualityState: Readonly<SnapshotQualityState>;
}
