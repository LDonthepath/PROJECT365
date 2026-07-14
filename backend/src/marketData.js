'use strict';

const CONTRACT_VERSION = '1.0';

const REQUIRED_FIELDS = Object.freeze([
  'id',
  'symbol',
  'name',
  'priceUsd',
  'change1h',
  'change24h',
  'volume24hUsd',
  'marketCapUsd',
  'totalMarketCapUsd',
  'total3MarketCap',
  'btcDominance',
  'usdtDominance',
  'usdcDominance',
  'circulatingSupply',
  'ath',
  'atl',
  'fetchedAt',
  'fetchSource',
  'contractVersion',
]);

const STRING_FIELDS = Object.freeze(['id', 'symbol', 'name', 'fetchSource', 'contractVersion']);
const NUMERIC_FIELDS = Object.freeze(REQUIRED_FIELDS.filter((field) => !STRING_FIELDS.includes(field)));
const NON_NEGATIVE_FIELDS = Object.freeze([
  'priceUsd',
  'volume24hUsd',
  'marketCapUsd',
  'totalMarketCapUsd',
  'total3MarketCap',
  'circulatingSupply',
  'ath',
  'atl',
]);
const DOMINANCE_FIELDS = Object.freeze(['btcDominance', 'usdtDominance', 'usdcDominance']);

class MarketDataValidationError extends Error {
  constructor(message, code, field) {
    super(message);
    this.name = 'MarketDataValidationError';
    this.code = code;
    if (field) this.field = field;
  }
}

function assertPlainObject(candidateFields) {
  if (candidateFields === null || candidateFields === undefined || typeof candidateFields !== 'object' || Array.isArray(candidateFields)) {
    throw new MarketDataValidationError('MarketData candidate must be an object.', 'INVALID_CANDIDATE');
  }
}

function validateRequiredAndExtraFields(candidateFields) {
  for (const field of REQUIRED_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(candidateFields, field)) {
      throw new MarketDataValidationError(`Missing required MarketData field: ${field}.`, 'MISSING_REQUIRED_FIELD', field);
    }
  }

  for (const field of Object.keys(candidateFields)) {
    if (!REQUIRED_FIELDS.includes(field)) {
      throw new MarketDataValidationError(`Unsupported MarketData field: ${field}.`, 'UNSUPPORTED_EXTRA_FIELD', field);
    }
  }
}

function validateNumericFields(candidateFields) {
  for (const field of NUMERIC_FIELDS) {
    if (typeof candidateFields[field] !== 'number' || !Number.isFinite(candidateFields[field])) {
      throw new MarketDataValidationError(`Invalid numeric MarketData field: ${field}.`, 'INVALID_NUMERIC_FIELD', field);
    }
  }
}

function validateBusinessRules(candidateFields) {
  for (const field of NON_NEGATIVE_FIELDS) {
    if (candidateFields[field] < 0) {
      throw new MarketDataValidationError(`MarketData field must be non-negative: ${field}.`, 'INVALID_NUMERIC_FIELD', field);
    }
  }

  for (const field of DOMINANCE_FIELDS) {
    if (candidateFields[field] < 0 || candidateFields[field] > 100) {
      throw new MarketDataValidationError(`Dominance field must be between 0 and 100 inclusive: ${field}.`, 'INVALID_DOMINANCE_FIELD', field);
    }
  }

  if (candidateFields.fetchedAt <= 0) {
    throw new MarketDataValidationError('fetchedAt must be a positive Unix epoch millisecond timestamp.', 'INVALID_TIMESTAMP', 'fetchedAt');
  }
}

function validateStringFields(candidateFields) {
  for (const field of STRING_FIELDS) {
    if (typeof candidateFields[field] !== 'string' || candidateFields[field] === '') {
      throw new MarketDataValidationError(`Invalid string MarketData field: ${field}.`, 'INVALID_STRING_FIELD', field);
    }
  }
}

function validateMarketData(candidateFields) {
  assertPlainObject(candidateFields);
  validateRequiredAndExtraFields(candidateFields);
  validateNumericFields(candidateFields);
  validateBusinessRules(candidateFields);
  validateStringFields(candidateFields);
}

function createMarketData(candidateFields) {
  validateMarketData(candidateFields);

  const marketData = {};
  for (const field of REQUIRED_FIELDS) {
    marketData[field] = candidateFields[field];
  }

  return Object.freeze(marketData);
}

function serializeMarketData(marketData) {
  validateMarketData(marketData);
  if (!Object.isFrozen(marketData)) {
    throw new MarketDataValidationError('MarketData must be frozen before serialization.', 'MUTABLE_MARKET_DATA');
  }
  return JSON.stringify(marketData);
}

function deserializeMarketData(serializedMarketData) {
  if (typeof serializedMarketData !== 'string' || serializedMarketData === '') {
    throw new MarketDataValidationError('Serialized MarketData must be a non-empty string.', 'INVALID_SERIALIZED_MARKET_DATA');
  }
  return createMarketData(JSON.parse(serializedMarketData));
}

module.exports = Object.freeze({
  CONTRACT_VERSION,
  REQUIRED_FIELDS,
  createMarketData,
  serializeMarketData,
  deserializeMarketData,
  MarketDataValidationError,
});
