import assert from 'node:assert/strict';
import test from 'node:test';
import {
  InvalidBusinessRuleError,
  InvalidNumberError,
  MarketDataFactory,
  MissingRequiredFieldError,
} from '../../../dist/core/market-data/index.js';

const validMarketData = () => ({
  id: 'bitcoin',
  symbol: 'BTC',
  name: 'Bitcoin',
  priceUsd: 100000,
  change1h: 0.5,
  change24h: -1.2,
  volume24hUsd: 50000000000,
  marketCapUsd: 2000000000000,
  totalMarketCapUsd: 3500000000000,
  total3MarketCap: 3400000000000,
  btcDominance: 57.2,
  usdtDominance: 4.3,
  usdcDominance: 1.8,
  circulatingSupply: 19800000,
  ath: 120000,
  atl: 67.81,
  fetchedAt: 1783900800000,
  fetchSource: 'unit-test',
  contractVersion: '1.0',
});

test('valid MarketData can be created', () => {
  const marketData = MarketDataFactory.create(validMarketData());

  assert.equal(marketData.id, 'bitcoin');
  assert.equal(marketData.contractVersion, '1.0');
});

test('invalid MarketData throws error for non-finite number', () => {
  const input = validMarketData();
  input.priceUsd = Number.NaN;

  assert.throws(() => MarketDataFactory.create(input), InvalidNumberError);
});

test('missing required field throws error', () => {
  const input = validMarketData();
  delete input.symbol;

  assert.throws(() => MarketDataFactory.create(input), MissingRequiredFieldError);
});

test('business rule violation throws error', () => {
  const input = validMarketData();
  input.marketCapUsd = -1;

  assert.throws(() => MarketDataFactory.create(input), InvalidBusinessRuleError);
});

test('returned object is immutable', () => {
  const marketData = MarketDataFactory.create(validMarketData());

  assert.throws(() => {
    marketData.priceUsd = 1;
  }, TypeError);
  assert.equal(marketData.priceUsd, 100000);
});

test('serialization works with JSON.stringify and JSON.parse', () => {
  const marketData = MarketDataFactory.create(validMarketData());
  const parsed = JSON.parse(JSON.stringify(marketData));

  assert.deepEqual(parsed, validMarketData());
});
