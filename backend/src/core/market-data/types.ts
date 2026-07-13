export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number;
  change1h: number;
  change24h: number;
  volume24hUsd: number;
  marketCapUsd: number;
  totalMarketCapUsd: number;
  total3MarketCap: number;
  btcDominance: number;
  usdtDominance: number;
  usdcDominance: number;
  circulatingSupply: number;
  ath: number;
  atl: number;
  fetchedAt: number;
  fetchSource: string;
  contractVersion: string;
}

export type MarketDataInput = MarketData;
