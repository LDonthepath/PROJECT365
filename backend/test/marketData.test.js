'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  CONTRACT_VERSION,
  REQUIRED_FIELDS,
  createMarketData,
  serializeMarketData,
  deserializeMarketData,
  MarketDataValidationError,
} = require('../src/marketData');

function validCandidate(overrides = {}) {
  return {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    priceUsd: 65000,
    change1h: -0.5,
    change24h: 2.4,
    volume24hUsd: 12000000000,
    marketCapUsd: 1300000000000,
    totalMarketCapUsd: 2500000000000,
    total3MarketCap: 800000000000,
    btcDominance: 52.5,
    usdtDominance: 4.2,
    usdcDominance: 1.8,
    circulatingSupply: 19700000,
    ath: 73000,
    atl: 67.81,
    fetchedAt: 1710000000000,
    fetchSource: 'provider-framework',
    contractVersion: CONTRACT_VERSION,
    ...overrides,
  };
}

function expectMarketDataError(fn, code, field) {
  assert.throws(
    fn,
    (error) => {
      assert.equal(error instanceof MarketDataValidationError, true);
      assert.equal(error.code, code);
      if (field) assert.equal(error.field, field);
      return true;
    },
  );
}

test('createMarketData returns a frozen object with exactly the 19 approved fields', () => {
  const marketData = createMarketData(validCandidate());
  assert.deepEqual(Object.keys(marketData), REQUIRED_FIELDS);
  assert.equal(Object.isFrozen(marketData), true);
  for (const field of REQUIRED_FIELDS) {
    assert.equal(Object.prototype.hasOwnProperty.call(marketData, field), true);
  }
});

test('createMarketData copies only validated fields and rejects every missing required field', () => {
  for (const field of REQUIRED_FIELDS) {
    const candidate = validCandidate();
    delete candidate[field];
    expectMarketDataError(() => createMarketData(candidate), 'MISSING_REQUIRED_FIELD', field);
  }
});

test('createMarketData rejects unsupported extra fields', () => {
  expectMarketDataError(() => createMarketData(validCandidate({ rank: 1 })), 'UNSUPPORTED_EXTRA_FIELD', 'rank');
});

test('createMarketData rejects invalid string fields', () => {
  for (const field of ['id', 'symbol', 'name', 'fetchSource', 'contractVersion']) {
    expectMarketDataError(() => createMarketData(validCandidate({ [field]: '' })), 'INVALID_STRING_FIELD', field);
    expectMarketDataError(() => createMarketData(validCandidate({ [field]: 123 })), 'INVALID_STRING_FIELD', field);
  }
});

test('createMarketData rejects numeric strings, NaN, and Infinity for numeric fields', () => {
  const numericFields = REQUIRED_FIELDS.filter((field) => !['id', 'symbol', 'name', 'fetchSource', 'contractVersion'].includes(field));
  for (const field of numericFields) {
    expectMarketDataError(() => createMarketData(validCandidate({ [field]: '1' })), 'INVALID_NUMERIC_FIELD', field);
    expectMarketDataError(() => createMarketData(validCandidate({ [field]: Number.NaN })), 'INVALID_NUMERIC_FIELD', field);
    expectMarketDataError(() => createMarketData(validCandidate({ [field]: Infinity })), 'INVALID_NUMERIC_FIELD', field);
  }
});

test('createMarketData applies non-negative business validation for approved fields', () => {
  for (const field of ['priceUsd', 'volume24hUsd', 'marketCapUsd', 'totalMarketCapUsd', 'total3MarketCap', 'circulatingSupply', 'ath', 'atl']) {
    expectMarketDataError(() => createMarketData(validCandidate({ [field]: -1 })), 'INVALID_NUMERIC_FIELD', field);
  }
});

test('createMarketData rejects dominance below 0 or above 100 and accepts inclusive bounds', () => {
  for (const field of ['btcDominance', 'usdtDominance', 'usdcDominance']) {
    expectMarketDataError(() => createMarketData(validCandidate({ [field]: -0.1 })), 'INVALID_DOMINANCE_FIELD', field);
    expectMarketDataError(() => createMarketData(validCandidate({ [field]: 100.1 })), 'INVALID_DOMINANCE_FIELD', field);
    assert.equal(createMarketData(validCandidate({ [field]: 0 }))[field], 0);
    assert.equal(createMarketData(validCandidate({ [field]: 100 }))[field], 100);
  }
});

test('createMarketData rejects invalid fetchedAt timestamps', () => {
  expectMarketDataError(() => createMarketData(validCandidate({ fetchedAt: 0 })), 'INVALID_TIMESTAMP', 'fetchedAt');
  expectMarketDataError(() => createMarketData(validCandidate({ fetchedAt: -1 })), 'INVALID_TIMESTAMP', 'fetchedAt');
});

test('createMarketData rejects null and undefined candidates', () => {
  expectMarketDataError(() => createMarketData(null), 'INVALID_CANDIDATE');
  expectMarketDataError(() => createMarketData(undefined), 'INVALID_CANDIDATE');
});

test('created MarketData rejects field modification and post-creation field addition', () => {
  const marketData = createMarketData(validCandidate());
  assert.throws(() => {
    marketData.priceUsd = 1;
  }, TypeError);
  assert.throws(() => {
    marketData.rank = 1;
  }, TypeError);
  assert.equal(marketData.priceUsd, 65000);
  assert.equal(Object.prototype.hasOwnProperty.call(marketData, 'rank'), false);
});

test('serializeMarketData uses JSON serialization for frozen valid MarketData', () => {
  const marketData = createMarketData(validCandidate());
  assert.equal(serializeMarketData(marketData), JSON.stringify(marketData));
});

test('serializeMarketData rejects mutable objects', () => {
  expectMarketDataError(() => serializeMarketData(validCandidate()), 'MUTABLE_MARKET_DATA');
});

test('deserializeMarketData parses JSON and returns frozen valid MarketData', () => {
  const marketData = createMarketData(validCandidate());
  const deserialized = deserializeMarketData(serializeMarketData(marketData));
  assert.deepEqual(deserialized, marketData);
  assert.equal(Object.isFrozen(deserialized), true);
});

test('deserializeMarketData rejects invalid serialized input and invalid contracts', () => {
  expectMarketDataError(() => deserializeMarketData(''), 'INVALID_SERIALIZED_MARKET_DATA');
  expectMarketDataError(() => deserializeMarketData(JSON.stringify({ ...validCandidate(), rank: 1 })), 'UNSUPPORTED_EXTRA_FIELD', 'rank');
});
