#  PROVIDER RESEARCH — PROJECT365

A standardized evaluation of data providers for PROJECT365 crypto market intelligence.

---

# CoinGecko

## Overview

CoinGecko is an independent cryptocurrency market data aggregator providing real-time and historical prices, market cap, volume, and metadata across 18,000+ cryptocurrencies from 1,500+ exchanges. A free Demo Plan is available without credit card requirement; paid plans start at $35/month with higher rate limits.

---------------------------------------------------------

## Provider Status

Production Ready

Proven reliability and accuracy in independent price aggregation. Extensive free tier sufficient for MVP.

---------------------------------------------------------

## Provider Capability Matrix

| Capability | Status | Notes |
|------------|:------:|------|
| Global Market Data | ✅ | Total market cap, volume, dominance (BTC/ETH/USDT) |
| Coin Market Data | ✅ | 18,000+ coins with prices, market cap, volume, supply, ATH/ATL |
| Stablecoin Data | ⚠️ | Available via category filter; no native depeg/backing-ratio metrics |
| DeFi Data | ✅ | DeFi market cap, dominance, top coins |
| Derivatives Data | ✅ | Funding rate, open interest, basis per exchange |
| On-Chain Data | ⚠️ | DEX data via GeckoTerminal (separate namespace) |
| ETF Data | ❌ | Not provided |
| Macro Data | ❌ | Not provided |
| Mining Data | ❌ | Not provided |
| Staking Data | ❌ | Not provided |
| Historical Data | ✅ | Since 2014; daily and hourly granularity on all plans |
| Near Realtime | ✅ | Cache 30–60 seconds (Pro) to ~60 seconds (Demo) |
| REST API | ✅ | |
| WebSocket | ✅ | Paid plans only |
| Free Tier | ✅ | Demo Plan: 10,000 calls/month |
| API Key Required | Yes | Free key from Developer Dashboard |
| Commercial Usage | Open | |

---------------------------------------------------------

## Primary Datasets

- Global market data (market cap, volume, dominance)
- Cryptocurrency prices and market metrics (18,000+ coins)
- Exchange data (trust scores, volumes)
- Derivatives data (funding rates, open interest)
- Category/sector market data (600+ categories)
- DeFi market aggregates

---------------------------------------------------------

## Strengths

- Independent price aggregation methodology (BPI + VWAP) published and verifiable
- Extremely broad coverage: 18,000+ coins, 1,500+ exchanges, 600+ sectors
- Free Demo Plan covers all core endpoints without credit card
- Flat credit model makes costs predictable
- Well-documented REST API with clear cache windows

---------------------------------------------------------

## Limitations

- Demo Plan rate limit (10,000 calls/month) requires careful caching strategy
- Global market cap history unavailable on Demo Plan
- No direct dominance endpoints; must be calculated from market cap data
- Does not cover on-chain analytics, macro data, or ETF flows
- Some field deprecations announced without per-endpoint changelog

---------------------------------------------------------

## PROJECT365 Role

Primary Market Data Provider

Foundation for global market context (BTC/USDT dominance), coin market data, DeFi sector flows, and derivatives cross-reference. Demo Plan sufficient for MVP with disciplined cache architecture.

---------------------------------------------------------

## Overall Assessment

★★★★★

Essential production provider for PROJECT365. Provides authoritative global market context, broad coin coverage, and free tier suitable for MVP. Pair with specialized providers (DefiLlama, BGeometrics) for complete market intelligence.

---------------------------------------------------------

## Official References

- Official Website: https://www.coingecko.com
- API Documentation: https://docs.coingecko.com
- Pricing: https://www.coingecko.com/en/api/pricing
- Methodology: https://www.coingecko.com/en/methodology

---

# DefiLlama

## Overview

DefiLlama is the largest open-source TVL aggregator for DeFi, tracking total value locked across protocols and chains, stablecoin supplies, yield pools, and DEX volumes. Entirely free with no API key requirement for standard endpoints.

---------------------------------------------------------

## Provider Status

Production Ready

Authoritative source for DeFi TVL tracking across all major protocols. Community-maintained with peer-reviewed adapters.

---------------------------------------------------------

## Provider Capability Matrix

| Capability | Status | Notes |
|------------|:------:|------|
| Global Market Data | ❌ | No global market cap/dominance; only DeFi TVL aggregate |
| Coin Market Data | ⚠️ | Token prices only (on-chain contract-based); no market cap/volume |
| Stablecoin Data | ✅ | Circulating supply, peg type, per-chain distribution, historical |
| DeFi Data | ✅ | TVL protocols/chains, yield pools, DEX volumes, fees, revenue |
| Derivatives Data | ⚠️ | Options and perps volume (partially documented) |
| On-Chain Data | ⚠️ | TVL is on-chain aggregation; no SOPR/MVRV/NUPL |
| ETF Data | ❌ | Not provided |
| Macro Data | ❌ | Not provided |
| Mining Data | ❌ | Not provided |
| Staking Data | ❌ | Not provided |
| Historical Data | ✅ | TVL and stablecoin historicals per protocol/chain |
| Near Realtime | ✅ | ~1 hour lag; updates hourly |
| REST API | ✅ | |
| WebSocket | ❌ | |
| Free Tier | ✅ | No rate limit published for reasonable traffic |
| API Key Required | No | Required only for Pro API |
| Commercial Usage | Open | |

---------------------------------------------------------

## Primary Datasets

- Protocol TVL and chain TVL (historical and current)
- Stablecoin supplies and distribution
- Yield pools (APY, TVL, rewards)
- DEX volumes and fees/revenue
- Token prices (on-chain contract-based)

---------------------------------------------------------

## Strengths

- Completely free with no API key for all standard endpoints
- Primary source for DeFi TVL across all major protocols
- Open-source adapters community-contributed and peer-reviewed
- Comprehensive stablecoin tracking with per-chain breakdown
- Multiple data products (TVL, yields, fees, stablecoins) in single ecosystem

---------------------------------------------------------

## Limitations

- Does not provide global cryptocurrency market data
- Token prices only available via contract address, not by ticker
- Hourly update frequency insufficient for real-time derivatives detection
- Derivatives data partially in beta and not part of standard tier documentation
- No sentiment or macro data

---------------------------------------------------------

## PROJECT365 Role

Primary DeFi Provider

Essential for DeFi TVL context and stablecoin supply tracking. Free tier eliminates cost barrier; coordinate with CoinGecko for cross-chain market cap.

---------------------------------------------------------

## Overall Assessment

★★★★★

Authoritative free provider for DeFi data. Essential for stablecoin tracking and TVL context. No viable alternative at comparable quality and cost.

---------------------------------------------------------

## Official References

- Official Website: https://defillama.com
- API Documentation: https://api-docs.defillama.com
- Methodology Guide: https://docs.llama.fi

---

# GeckoTerminal

## Overview

GeckoTerminal is CoinGecko's on-chain DEX data platform providing decentralized exchange pools, token data, liquidity, and trading volume across multiple blockchains. Available as REST API with no authentication required for standard endpoints.

---------------------------------------------------------

## Provider Status

Production Ready

Complements CoinGecko for on-chain DEX-specific analysis. Free and open access simplifies integration.

---------------------------------------------------------

## Provider Capability Matrix

| Capability | Status | Notes |
|------------|:------:|------|
| Global Market Data | ❌ | Not provided |
| Coin Market Data | ⚠️ | Token data on-chain (supply, holders, top transactions) |
| Stablecoin Data | ⚠️ | Visible via token data if on-chain; not aggregated |
| DeFi Data | ✅ | DEX pools, liquidity, trading volume |
| Derivatives Data | ❌ | Not provided |
| On-Chain Data | ✅ | Token info, transaction data, pool analytics |
| ETF Data | ❌ | Not provided |
| Macro Data | ❌ | Not provided |
| Mining Data | ❌ | Not provided |
| Staking Data | ❌ | Not provided |
| Historical Data | ✅ | Pool volume and price data available historically |
| Near Realtime | ✅ | On-chain data reflects blockchain state with block lag |
| REST API | ✅ | |
| WebSocket | ❌ | |
| Free Tier | ✅ | No stated rate limit or authentication required |
| API Key Required | No | |
| Commercial Usage | Open | |

---------------------------------------------------------

## Primary Datasets

- DEX pools and liquidity data
- Token on-chain metrics and transaction data
- Trading volumes and price data
- Network-specific DEX aggregates

---------------------------------------------------------

## Strengths

- Native on-chain DEX data without external middleware
- Free and open access with no authentication barrier
- Multi-chain support covering major EVM and non-EVM chains
- Complementary to DefiLlama TVL data (DEX-specific volumes)
- Real transaction and liquidity data from on-chain sources

---------------------------------------------------------

## Limitations

- Limited to DEX data only; no CEX, derivatives, or macro coverage
- Separate API namespace from CoinGecko (different base URLs)
- DEX-specific metrics do not translate to total crypto market context
- On-chain data latency inherent to blockchain (block-by-block updates)
- Less comprehensive stablecoin tracking than DefiLlama

---------------------------------------------------------

## PROJECT365 Role

Specialized Provider

Use for DEX-specific analysis and on-chain token metrics. Coordinates with DefiLlama for complete DeFi coverage (TVL + DEX volume).

---------------------------------------------------------

## Overall Assessment

★★★★

Solid complementary provider for on-chain DEX data. Free tier provides good value; limited by DEX-only scope and blockchain update latency.

---------------------------------------------------------

## Official References

- Official Website: https://www.geckoterminal.com
- API Base: https://api.geckoterminal.com

---

# CoinPaprika

## Overview

CoinPaprika provides cryptocurrency market data aggregation covering 30,000+ coins, exchanges, and ICO information. Includes REST API with free tier offering basic endpoints and paid tiers for higher rate limits.

---------------------------------------------------------

## Provider Status

Research

Suitable as fallback or secondary source. Does not offer unique advantages over primary providers.

---------------------------------------------------------

## Provider Capability Matrix

| Capability | Status | Notes |
|------------|:------:|------|
| Global Market Data | ✅ | Global market metrics and dominance |
| Coin Market Data | ✅ | 30,000+ coins with prices, market cap, volume |
| Stablecoin Data | ⚠️ | Available via filtering; no dedicated endpoints |
| DeFi Data | ⚠️ | Limited DeFi coverage compared to DefiLlama |
| Derivatives Data | ⚠️ | Exchange derivatives data available |
| On-Chain Data | ❌ | Not provided |
| ETF Data | ❌ | Not provided |
| Macro Data | ❌ | Not provided |
| Mining Data | ❌ | Not provided |
| Staking Data | ❌ | Not provided |
| Historical Data | ✅ | Historical price data available |
| Near Realtime | ✅ | Prices updated regularly |
| REST API | ✅ | |
| WebSocket | ❌ | |
| Free Tier | ✅ | No API key required for free tier |
| API Key Required | No | Optional for paid tiers |
| Commercial Usage | Verify | |

---------------------------------------------------------

## Primary Datasets

- Cryptocurrency prices and market metrics
- Exchange information and volumes
- Global market data
- ICO information

---------------------------------------------------------

## Strengths

- No API key required for free tier
- Broad coin coverage (30,000+)
- Simple, straightforward REST API
- Frequently recommended as CoinGecko fallback
- Lower computational overhead

---------------------------------------------------------

## Limitations

- Less comprehensive ecosystem coverage than CoinGecko
- Limited DeFi data compared to DefiLlama
- No on-chain analytics or macro data
- Free tier rate limits not clearly published
- Smaller exchange listing compared to CoinGecko

---------------------------------------------------------

## PROJECT365 Role

Backup Provider

Suitable as fallback for global market data and coin prices if primary providers unavailable. Strengthens redundancy chain without replacing core providers.

---------------------------------------------------------

## Overall Assessment

★★★

Adequate backup provider but lacks unique strengths. CoinGecko superior in all dimensions. Include only if redundancy layer prioritized over data optimization.

---------------------------------------------------------

## Official References

- Official Website: https://coinpaprika.com
- API Documentation: https://api.coinpaprika.com

---

# FRED (Federal Reserve Economic Data)

## Overview

FRED is the Federal Reserve's official economic database providing U.S. and global macroeconomic indicators including money supply (M2), interest rates, yield curves, inflation, and other economic variables. Free, no authentication required, updated regularly by Federal Reserve Board.

---------------------------------------------------------

## Provider Status

Production Ready

Authoritative official source for U.S. macroeconomic indicators. Irreplaceable for macro regime analysis.

---------------------------------------------------------

## Provider Capability Matrix

| Capability | Status | Notes |
|------------|:------:|------|
| Global Market Data | ❌ | Not crypto-related |
| Coin Market Data | ❌ | Not provided |
| Stablecoin Data | ❌ | Not provided |
| DeFi Data | ❌ | Not provided |
| Derivatives Data | ❌ | Not provided |
| On-Chain Data | ❌ | Not provided |
| ETF Data | ❌ | Not provided |
| Macro Data | ✅ | M2 money supply, interest rates, yield curves, inflation, credit conditions |
| Mining Data | ❌ | Not provided |
| Staking Data | ❌ | Not provided |
| Historical Data | ✅ | Decades of historical data available |
| Near Realtime | ✅ | Published on Federal Reserve schedule |
| REST API | ✅ | |
| WebSocket | ❌ | |
| Free Tier | ✅ | Completely free |
| API Key Required | No | Optional for registered users |
| Commercial Usage | Open | U.S. government data (public domain) |

---------------------------------------------------------

## Primary Datasets

- M2 money supply and monetary aggregates
- Federal Funds Rate and discount rate
- Treasury yield curves (2-year, 10-year, etc.)
- Consumer Price Index (CPI) and inflation
- Credit conditions and lending indicators
- Economic activity indexes

---------------------------------------------------------

## Strengths

- Official U.S. Federal Reserve source; authoritative and trustworthy
- Completely free with no API limitations
- Extensive historical depth (decades of data)
- Public domain (no copyright restrictions)
- RESTful API simple to integrate
- Critical macroeconomic indicators for market regime analysis

---------------------------------------------------------

## Limitations

- U.S.-centric data; limited global macro coverage
- Updated on Federal Reserve publication schedule (not real-time)
- No cryptocurrency-specific macroeconomic indicators
- Requires manual integration with crypto data for cross-asset analysis
- Large economic releases can have lag between announcement and update

---------------------------------------------------------

## PROJECT365 Role

Primary Macro Provider

Essential for macroeconomic context (money supply trends, interest rate regimes, yield curve shape). Irreplaceable for U.S. macro indicators; complements crypto market regime analysis.

---------------------------------------------------------

## Overall Assessment

★★★★★

Authoritative official U.S. macro data. Irreplaceable for interest rate and money supply context. Required foundation for macro-informed crypto analysis.

---------------------------------------------------------

## Official References

- Official Website: https://fred.stlouisfed.org
- API Documentation: https://fred.stlouisfed.org/docs/api
- Data Portal: https://fred.stlouisfed.org/tags

---

# Coinalyze

## Overview

Coinalyze provides aggregated cryptocurrency derivatives data including funding rates, open interest, and liquidation data across multiple exchanges (Binance, Bybit, OKX, Deribit). REST API with WebSocket support; free tier capped at 40 calls/minute.

---------------------------------------------------------

## Provider Status

Production Ready

Primary source for multi-exchange derivatives aggregation. Free tier sufficient for MVP.

---------------------------------------------------------

## Provider Capability Matrix

| Capability | Status | Notes |
|------------|:------:|------|
| Global Market Data | ❌ | Not provided |
| Coin Market Data | ❌ | Not provided |
| Stablecoin Data | ❌ | Not provided |
| DeFi Data | ❌ | Not provided |
| Derivatives Data | ✅ | Funding rates, open interest, liquidations (multi-exchange aggregated) |
| On-Chain Data | ❌ | Not provided |
| ETF Data | ❌ | Not provided |
| Macro Data | ❌ | Not provided |
| Mining Data | ❌ | Not provided |
| Staking Data | ❌ | Not provided |
| Historical Data | ✅ | Historical funding rates and OI available |
| Near Realtime | ✅ | Real-time funding rate updates (sub-minute) |
| REST API | ✅ | |
| WebSocket | ✅ | Real-time data streaming |
| Free Tier | ✅ | 40 calls/minute limit |
| API Key Required | Yes | |
| Commercial Usage | Verify | |

---------------------------------------------------------

## Primary Datasets

- Funding rates (multi-exchange aggregated)
- Open interest by exchange and symbol
- Liquidation volumes and data
- Exchange-specific derivatives data

---------------------------------------------------------

## Strengths

- Primary source for multi-exchange derivatives aggregation
- Real-time funding rate updates critical for Risk Engine
- Free tier sufficient for standard polling frequencies
- Coverage across major perpetual futures exchanges (Binance, Bybit, OKX, Deribit)
- WebSocket support reduces polling overhead

---------------------------------------------------------

## Limitations

- Focused solely on derivatives; no spot market or broader coverage
- Free tier rate limit (40 calls/minute) constrains polling for many symbols simultaneously
- Limited to perpetual futures; no options data
- Requires API key registration
- No macroeconomic or on-chain context

---------------------------------------------------------

## PROJECT365 Role

Primary Derivatives Provider

Primary source for derivatives risk metrics (funding rates, open interest). Free tier suitable for MVP; upgrade path available for higher frequency needs.

---------------------------------------------------------

## Overall Assessment

★★★★

Solid specialized provider for derivatives data. Best-in-class for multi-exchange funding rate aggregation. Essential for risk and sentiment analysis.

---------------------------------------------------------

## Official References

- Official Website: https://coinalyze.net
- API Documentation: https://coinalyze.net/api/documentation

---

# BGeometrics

## Overview

BGeometrics provides Bitcoin-focused on-chain analytics including MVRV, SOPR, NUPL, and other cycle indicators, plus macro variables (M2, DXY, VIX) and Bitcoin derivatives data. Free tier offers basic metrics with 8 requests/hour and 15 requests/day limit; paid tiers unlock advanced features.

---------------------------------------------------------

## Provider Status

Production Ready

Fills critical gap for Bitcoin on-chain indicators unavailable elsewhere at no cost. Tight rate limits require daily cache architecture.

---------------------------------------------------------

## Provider Capability Matrix

| Capability | Status | Notes |
|------------|:------:|------|
| Global Market Data | ❌ | Not provided |
| Coin Market Data | ❌ | Bitcoin only; no multi-coin market data |
| Stablecoin Data | ⚠️ | Stablecoin Supply documented as bonus/overlap in RawVariableCatalog; no native depeg/backing-ratio metrics verified |
| DeFi Data | ❌ | Not provided |
| Derivatives Data | ✅ | Bitcoin derivatives (funding rate, OI, options Greeks) |
| On-Chain Data | ✅ | MVRV, SOPR, NUPL, HODL Waves, CDD, Reserve Risk, exchange flows |
| ETF Data | ✅ | Bitcoin ETF holdings and flows |
| Macro Data | ✅ | M2 money supply, DXY, VIX, Treasury yields |
| Mining Data | ⚠️ | Hashrate available; miner flows restricted to paid tier |
| Staking Data | ❌ | Not provided |
| Historical Data | ✅ | 4 years available on free tier |
| Near Realtime | ✅ | Daily updates; real-time for advanced tiers |
| REST API | ✅ | |
| WebSocket | ❌ | |
| Free Tier | ✅ | 8 requests/hour, 15 requests/day |
| API Key Required | Yes | |
| Commercial Usage | Restricted | Verify commercial redistribution terms |

---------------------------------------------------------

## Primary Datasets

- Bitcoin on-chain metrics (MVRV, SOPR, NUPL, HODL Waves, CDD)
- Exchange inflow/outflow data
- Bitcoin derivatives (funding rate, OI)
- Bitcoin ETF data (holdings, flows)
- Macroeconomic indicators (M2, DXY, VIX, yields)
- Fear & Greed Index

---------------------------------------------------------

## Strengths

- Fills critical gap for Bitcoin on-chain cycle indicators (MVRV/SOPR/NUPL) at no cost
- Comprehensive Bitcoin fundamentals in single provider
- Includes macro variables typically unavailable from crypto-native providers
- Free tier covers primary use cases for MVP
- Bitcoin ETF data otherwise unavailable in free tier

---------------------------------------------------------

## Limitations

- Extremely tight free tier rate limits (15 requests/day); requires daily caching only
- Bitcoin-only; no multi-chain or altcoin on-chain metrics
- Advanced features (exchange/miner flows, extended history) require paid tier
- 4-year free tier history insufficient for multi-cycle analysis
- Commercial redistribution restrictions require verification before production deployment

---------------------------------------------------------

## PROJECT365 Role

Primary On-Chain Provider

Essential for Bitcoin on-chain cycle indicators (MVRV/SOPR/NUPL) filling gap left by free tier limitations of other providers. Requires daily cache architecture; verify commercial usage terms.

---------------------------------------------------------

## Overall Assessment

★★★★

Unique and essential provider for Bitcoin on-chain metrics. Tight free tier rate limits require disciplined caching but trade-off justified by data uniqueness. Commercial terms must be verified.

---------------------------------------------------------

## Official References

- Official Website: https://bgeometrics.com
- API Documentation: https://api.bgeometrics.com/scalar.html
- Pricing & Plans: https://portal.bgeometrics.com/pricing
- Free Features: https://portal.bgeometrics.com/bguser/free-features.html
- Terms of Service: https://bgeometrics.com/terms

---
