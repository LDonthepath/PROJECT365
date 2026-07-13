import type { MarketData, MarketDataInput } from './types.js';
import { MarketDataValidator } from './MarketDataValidator.js';

export class MarketDataFactory {
  static create(input: MarketDataInput): Readonly<MarketData> {
    MarketDataValidator.validate(input);

    const marketData: MarketData = {
      id: input.id,
      symbol: input.symbol,
      name: input.name,
      priceUsd: input.priceUsd,
      change1h: input.change1h,
      change24h: input.change24h,
      volume24hUsd: input.volume24hUsd,
      marketCapUsd: input.marketCapUsd,
      totalMarketCapUsd: input.totalMarketCapUsd,
      total3MarketCap: input.total3MarketCap,
      btcDominance: input.btcDominance,
      usdtDominance: input.usdtDominance,
      usdcDominance: input.usdcDominance,
      circulatingSupply: input.circulatingSupply,
      ath: input.ath,
      atl: input.atl,
      fetchedAt: input.fetchedAt,
      fetchSource: input.fetchSource,
      contractVersion: input.contractVersion,
    };

    return Object.freeze(marketData);
  }
}
