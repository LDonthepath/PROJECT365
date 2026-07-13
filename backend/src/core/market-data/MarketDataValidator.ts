import type { MarketDataInput } from './types.js';

export class MissingRequiredFieldError extends Error {
  constructor(field: string) {
    super(`Missing required MarketData field: ${field}`);
    this.name = 'MissingRequiredFieldError';
  }
}

export class InvalidNumberError extends Error {
  constructor(field: string) {
    super(`Invalid number for MarketData field: ${field}`);
    this.name = 'InvalidNumberError';
  }
}

export class InvalidBusinessRuleError extends Error {
  constructor(field: string, rule: string) {
    super(`Invalid MarketData business rule for ${field}: ${rule}`);
    this.name = 'InvalidBusinessRuleError';
  }
}

type FieldType = 'string' | 'number';
type MarketDataField = keyof MarketDataInput & string;

const REQUIRED_FIELDS: ReadonlyArray<MarketDataField> = [
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
];

const FIELD_TYPES: Readonly<Record<MarketDataField, FieldType>> = {
  id: 'string',
  symbol: 'string',
  name: 'string',
  priceUsd: 'number',
  change1h: 'number',
  change24h: 'number',
  volume24hUsd: 'number',
  marketCapUsd: 'number',
  totalMarketCapUsd: 'number',
  total3MarketCap: 'number',
  btcDominance: 'number',
  usdtDominance: 'number',
  usdcDominance: 'number',
  circulatingSupply: 'number',
  ath: 'number',
  atl: 'number',
  fetchedAt: 'number',
  fetchSource: 'string',
  contractVersion: 'string',
};

const NON_NEGATIVE_FIELDS: ReadonlyArray<MarketDataField> = [
  'priceUsd',
  'marketCapUsd',
  'volume24hUsd',
  'circulatingSupply',
  'ath',
  'atl',
];

export class MarketDataValidator {
  static validate(input: unknown): asserts input is MarketDataInput {
    if (input === null || typeof input !== 'object') {
      throw new MissingRequiredFieldError('MarketData');
    }

    const candidate = input as Record<string, unknown>;

    for (const field of REQUIRED_FIELDS) {
      if (!(field in candidate) || candidate[field] === undefined || candidate[field] === null) {
        throw new MissingRequiredFieldError(field);
      }
    }

    for (const field of REQUIRED_FIELDS) {
      const expectedType = FIELD_TYPES[field];
      const value = candidate[field];

      if (expectedType === 'number') {
        if (typeof value !== 'number' || !Number.isFinite(value)) {
          throw new InvalidNumberError(field);
        }
      } else if (typeof value !== expectedType) {
        throw new MissingRequiredFieldError(field);
      }
    }

    const marketData = input as MarketDataInput;

    for (const field of NON_NEGATIVE_FIELDS) {
      if ((marketData[field] as number) < 0) {
        throw new InvalidBusinessRuleError(field, `${field} >= 0`);
      }
    }

    if (marketData.fetchedAt <= 0) {
      throw new InvalidBusinessRuleError('fetchedAt', 'fetchedAt > 0');
    }
  }
}
