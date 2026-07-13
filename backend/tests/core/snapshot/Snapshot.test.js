import assert from 'node:assert/strict';
import test from 'node:test';
import {
  InvalidSnapshotFieldError,
  MissingRequiredSnapshotFieldError,
  SnapshotFactory,
} from '../../../dist/core/snapshot/index.js';

const validSnapshot = () => ({
  id: 'snapshot-bitcoin-1783900800000',
  timestamp: 1783900800000,
  metadata: {
    contractVersion: '1.0',
    createdBy: 'unit-test',
    source: 'snapshot-foundation-test',
  },
  data: {
    market: {
      id: 'bitcoin',
      symbol: 'BTC',
      priceUsd: 100000,
    },
    observations: [
      {
        name: 'volume24hUsd',
        value: 50000000000,
      },
    ],
  },
  qualityState: {
    status: 'VALID',
  },
});

test('valid Snapshot can be created with identity, timestamp, metadata, data, and qualityState', () => {
  const snapshot = SnapshotFactory.create(validSnapshot());

  assert.equal(snapshot.id, 'snapshot-bitcoin-1783900800000');
  assert.equal(snapshot.timestamp, 1783900800000);
  assert.equal(snapshot.metadata.contractVersion, '1.0');
  assert.equal(snapshot.data.market.symbol, 'BTC');
  assert.equal(snapshot.qualityState.status, 'VALID');
});


test('valid Snapshot can be created with stale qualityState', () => {
  const input = validSnapshot();
  input.qualityState.status = 'STALE';

  const snapshot = SnapshotFactory.create(input);

  assert.equal(snapshot.qualityState.status, 'STALE');
});

test('missing qualityState throws error', () => {
  const input = validSnapshot();
  delete input.qualityState;

  assert.throws(() => SnapshotFactory.create(input), MissingRequiredSnapshotFieldError);
});

test('missing required Snapshot field throws error', () => {
  const input = validSnapshot();
  delete input.id;

  assert.throws(() => SnapshotFactory.create(input), MissingRequiredSnapshotFieldError);
});

test('missing required metadata field throws error', () => {
  const input = validSnapshot();
  delete input.metadata.contractVersion;

  assert.throws(() => SnapshotFactory.create(input), MissingRequiredSnapshotFieldError);
});

test('invalid Snapshot qualityState status throws error', () => {
  const input = validSnapshot();
  input.qualityState.status = 'UNKNOWN';

  assert.throws(() => SnapshotFactory.create(input), InvalidSnapshotFieldError);
});

test('invalid Snapshot timestamp throws error', () => {
  const input = validSnapshot();
  input.timestamp = Number.NaN;

  assert.throws(() => SnapshotFactory.create(input), InvalidSnapshotFieldError);
});

test('invalid Snapshot data throws error for non-finite number', () => {
  const input = validSnapshot();
  input.data.market.priceUsd = Number.POSITIVE_INFINITY;

  assert.throws(() => SnapshotFactory.create(input), InvalidSnapshotFieldError);
});

test('Snapshot output is deeply immutable', () => {
  const snapshot = SnapshotFactory.create(validSnapshot());

  assert.throws(() => {
    snapshot.id = 'changed';
  }, TypeError);
  assert.throws(() => {
    snapshot.metadata.source = 'changed';
  }, TypeError);
  assert.throws(() => {
    snapshot.data.market.priceUsd = 1;
  }, TypeError);
  assert.throws(() => {
    snapshot.qualityState.status = 'STALE';
  }, TypeError);
  assert.throws(() => {
    snapshot.data.observations.push({ name: 'dominance', value: 57.2 });
  }, TypeError);

  assert.equal(snapshot.id, 'snapshot-bitcoin-1783900800000');
  assert.equal(snapshot.metadata.source, 'snapshot-foundation-test');
  assert.equal(snapshot.data.market.priceUsd, 100000);
  assert.equal(snapshot.qualityState.status, 'VALID');
});

test('Snapshot creation does not mutate input or retain mutable input references', () => {
  const input = validSnapshot();
  const before = structuredClone(input);
  const snapshot = SnapshotFactory.create(input);

  input.metadata.source = 'mutated-source';
  input.data.market.symbol = 'ETH';
  input.qualityState.status = 'INVALID';

  assert.deepEqual(before, validSnapshot());
  assert.equal(snapshot.metadata.source, 'snapshot-foundation-test');
  assert.equal(snapshot.data.market.symbol, 'BTC');
  assert.equal(snapshot.qualityState.status, 'VALID');
});

test('serialization works with JSON.stringify and JSON.parse', () => {
  const input = validSnapshot();
  const snapshot = SnapshotFactory.create(input);
  const parsed = JSON.parse(JSON.stringify(snapshot));

  assert.deepEqual(parsed, input);
});
