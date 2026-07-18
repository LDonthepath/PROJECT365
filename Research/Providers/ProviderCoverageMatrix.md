# PROJECT365 — Provider Coverage Matrix

Version: 1.0

Status: Draft

---

## Purpose

This document maps documented provider coverage across high-level provider coverage domains in PROJECT365 research artifacts. It identifies which providers have documented coverage in each matrix domain and references canonical capabilities only through the supporting provider, variable, mapping, and derived-metric documentation.

This document does NOT define:

- formulas
- thresholds
- provider ranking
- provider routing
- provider priority logic
- provider selection rules
- fallback rules
- conflict resolution
- implementation behavior
- runtime behavior

This document is an architecture and governance reference only. It describes documented provider coverage and does not prescribe runtime behavior.

---

## Scope

This document documents provider coverage only.

It must remain synchronized with:

- `MasterProviderResearch.md`
- `RawVariableCatalog.md`
- `CanonicalVariableDictionary.md`
- `VariableMappingMatrix.md`

`DerivedMetricsCatalog.md` is also referenced where canonical capabilities support existing derived metric coverage.

This document does not modify, redefine, rank, or extend any provider, raw variable, canonical variable, derived metric, formula, threshold, data quality rule, provider routing, provider priority logic, conflict-resolution policy, selection rule, fallback rule, implementation behavior, or runtime behavior.

---

## Coverage Definitions

The following terms are documentation classifications only. They describe how coverage is represented in the existing research artifacts and do not create provider priority, provider selection, fallback, or implementation logic.

- **Primary** — The provider is explicitly documented in `MasterProviderResearch.md` as a primary PROJECT365 role for a business area.
- **Secondary** — Documentation-only classification summarizing provider capabilities documented as backup, cross-reference, overlap, redundancy, or supplemental coverage across the existing research artifacts. It is not an official PROJECT365 provider role.
- **Specialized** — The provider is documented as focused on a specific domain, subdomain, chain, venue, data namespace, or narrow capability.
- **Optional** — The provider or capability is documented as available, partial, limited, backup, or supplemental, but not as core coverage for the domain.
- **Research** — The provider, capability, variable, or tier is documented as research-stage, unverified, pilot-based, manually oriented, or requiring further validation.
- **Future Metric** — Documentation classification corresponding to the `Future Metric` terminology used in `VariableMappingMatrix.md`. It indicates canonical capabilities retained for future derived metrics or roadmap planning and does not introduce new implementation requirements.

---

## Status Column Governance

The matrix **Status** column records only the documented readiness or lifecycle classification found in the referenced provider and variable research artifacts. It is not a provider tier, provider priority, confidence score, provider ranking, routing instruction, fallback rule, or selection rule. Composite values such as `Research / Expansion` preserve documented provider lifecycle classifications from `MasterProviderResearch.md` together with documented roadmap classifications from `RawVariableCatalog.md`. These composite values are documentation-only labels and do not create ordering, precedence, provider ranking, provider routing, provider selection, fallback behavior, or implementation behavior.

## Domain Normalization Governance

ProviderCoverageMatrix groups coverage by high-level provider coverage domains. CanonicalVariableDictionary models canonical variable `Domain` and `Business Category` separately, while DerivedMetricsCatalog introduces business domains such as Liquidity and Staking for derived metric organization. Liquidity and Staking are represented in this matrix through their corresponding provider coverage domains, such as Global Market, DeFi, and On-Chain, rather than as separate matrix columns. This section is documentation-only and introduces no implementation logic.

## Provider Coverage Matrix

| Provider | On-Chain | Macro | Stablecoin | Derivatives | Global Market | DeFi | Whale Tracking | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|
| CoinGecko | Optional — DEX data via GeckoTerminal separate namespace | Not covered | Optional — category filter; no native depeg/backing-ratio metrics | Secondary — funding rate, open interest, basis per exchange | Primary — global market data, coin market data, prices, market cap, volume, dominance | Secondary — DeFi market cap, dominance, top coins | Not covered | Production Ready | Documented PROJECT365 role is Primary Market Data Provider. |
| DefiLlama | Optional — TVL is on-chain aggregation; no SOPR/MVRV/NUPL | Not covered | Primary — circulating supply, peg type, per-chain distribution, historical | Optional — options and perps volume partially documented | Not covered | Primary — TVL protocols/chains, yield pools, DEX volumes, fees, revenue | Not covered | Production Ready | Documented PROJECT365 role is Primary DeFi Provider. |
| GeckoTerminal | Specialized — token info, transaction data, pool analytics | Not covered | Optional — visible through token data if on-chain; not aggregated | Not covered | Optional — on-chain token data rather than broad market aggregates | Specialized — DEX pools, liquidity, trading volume | Not covered | Production Ready | Documented PROJECT365 role is Specialized Provider for DEX-specific analysis and on-chain token metrics. |
| CoinPaprika | Not covered | Not covered | Optional — filtering; no dedicated endpoints | Optional — exchange derivatives data available | Secondary — global market metrics, dominance, coin prices, market cap, volume | Optional — limited compared to DefiLlama | Not covered | Research | Documented PROJECT365 role is Backup Provider for global market data and coin prices. |
| FRED (Federal Reserve Economic Data) | Not covered | Primary — M2 money supply, interest rates, yield curves, inflation, credit conditions | Not covered | Not covered | Not covered | Not covered | Not covered | Production Ready | Documented PROJECT365 role is Primary Macro Provider. |
| Coinalyze | Not covered | Not covered | Not covered | Primary — funding rates, open interest, liquidations across exchanges | Not covered | Not covered | Not covered | Production Ready | Documented PROJECT365 role is Primary Derivatives Provider. |
| BGeometrics | Primary — Bitcoin MVRV, SOPR, NUPL, HODL Waves, CDD, Reserve Risk, exchange flows | Secondary — M2, DXY, VIX, Treasury yields documented as bonus/overlap coverage | Secondary — stablecoin supply documented as bonus/overlap coverage | Secondary — Bitcoin derivatives, funding rate, open interest, options Greeks | Not covered | Not covered | Not covered | Production Ready | Documented PROJECT365 role is Primary On-Chain Provider; raw catalog also records macro and stablecoin overlap variables. |
| Coin Metrics | Specialized — network activity and advanced on-chain research variables | Not covered | Not covered | Not covered | Not covered | Not covered | Not covered | Research / Expansion | Raw catalog documents Community-tier active addresses, supply, transaction count, plus advanced/unverified on-chain variables. |
| Beacon Node (self-host / free-tier Infura, Alchemy, QuickNode) | Specialized — Ethereum validator/staking capability | Not covered | Not covered | Not covered | Not covered | Not covered | Not covered | Expansion | Raw catalog documents ETH active validators. |
| Etherscan | Specialized — Ethereum supply capability | Not covered | Not covered | Not covered | Not covered | Not covered | Not covered | Not Verified | Raw catalog documents ETH total supply. |
| Bitquery | Specialized — Ethereum validator data and token transfers | Not covered | Not covered | Not covered | Not covered | Secondary — DEX volume | Not covered | Expansion / Research | Raw catalog documents GraphQL coverage for validator data, validator deposits, slashing, attestation, DEX volume, and token transfers. |
| Binance Futures API | Not covered | Not covered | Not covered | Specialized — exchange-specific open interest and funding rate | Not covered | Not covered | Not covered | Expansion | Raw catalog documents free public derivatives endpoints for Binance. |
| Bybit API | Not covered | Not covered | Not covered | Specialized — exchange-specific open interest and funding rate | Not covered | Not covered | Not covered | Expansion | Raw catalog documents public derivatives coverage for Bybit. |
| OKX API | Not covered | Not covered | Not covered | Specialized — exchange-specific open interest and funding rate | Not covered | Not covered | Not covered | Expansion | Raw catalog documents public derivatives coverage for OKX. |
| Arkham Intelligence | Specialized — entity and transaction data are on-chain-adjacent wallet intelligence | Not covered | Not covered | Not covered | Not covered | Not covered | Research — entity labels and transaction history | Research | Raw catalog documents API developer access as pilot-program based. |
| DeBank | Specialized — wallet activity and portfolio data are on-chain-adjacent wallet intelligence | Not covered | Not covered | Not covered | Not covered | Research — DeFi wallet portfolio/activity context | Research — wallet portfolio and activity | Research | Raw catalog documents manual/free usage context and limited official API access. |
| CoinCap | Not covered | Not covered | Not covered | Not covered | Secondary — price, market cap, volume | Not covered | Not covered | Expansion | Raw catalog documents lightweight global market coverage. |

---

## Domain Coverage Summary

### Domains With Multiple Providers

- **On-Chain** — Covered across BGeometrics, Coin Metrics, GeckoTerminal, Bitquery, Beacon Node access, Etherscan, Arkham Intelligence, and DeBank, with each provider covering different subdomains such as Bitcoin cycle indicators, network activity, DEX/token analytics, Ethereum validator/staking data, token transfers, wallet intelligence, and entity intelligence.
- **Macro** — Covered by FRED as the primary macro provider and BGeometrics as documented overlap for M2, DXY, VIX, and Treasury yield variables.
- **Stablecoin** — Covered by DefiLlama for stablecoin circulating supply, peg type, per-chain distribution, and historical coverage; CoinGecko, GeckoTerminal, CoinPaprika, and BGeometrics provide partial, visible, filtering-based, or overlap coverage as documented.
- **Derivatives** — Covered by Coinalyze, CoinGecko, BGeometrics, Binance Futures API, Bybit API, OKX API, and partially documented DefiLlama/CoinPaprika derivatives capabilities.
- **Global Market** — Covered by CoinGecko, CoinPaprika, and CoinCap.
- **DeFi** — Covered by DefiLlama, GeckoTerminal, CoinGecko, Bitquery, CoinPaprika, and DeBank in different scopes.
- **Whale Tracking** — Covered by Arkham Intelligence and DeBank in research-stage wallet/entity coverage.

### Domains With Only One Primary Provider

- **On-Chain** — BGeometrics is documented as Primary On-Chain Provider.
- **Macro** — FRED is documented as Primary Macro Provider.
- **Stablecoin** — DefiLlama is documented with stablecoin circulating supply, peg type, per-chain distribution, and historical coverage.
- **Derivatives** — Coinalyze is documented as Primary Derivatives Provider.
- **Global Market** — CoinGecko is documented as Primary Market Data Provider.
- **DeFi** — DefiLlama is documented as Primary DeFi Provider.

### Domains With Redundancy

- **Global Market** — CoinGecko, CoinPaprika, and CoinCap document overlapping market price, market capitalization, volume, and global market coverage.
- **Derivatives** — Coinalyze, CoinGecko, BGeometrics, Binance Futures API, Bybit API, and OKX API document overlapping funding-rate and open-interest coverage at aggregate, provider-specific, Bitcoin-specific, or exchange-specific scopes.
- **Stablecoin Supply** — DefiLlama and BGeometrics document stablecoin supply coverage, while CoinGecko, GeckoTerminal, and CoinPaprika document partial or filtering-based stablecoin visibility.
- **DeFi / DEX Activity** — DefiLlama, GeckoTerminal, CoinGecko, and Bitquery document overlapping DeFi or DEX-volume-related coverage.
- **On-Chain Network Activity** — Coin Metrics and Bitquery document network/token activity coverage; BGeometrics documents Bitcoin-specific on-chain indicators and exchange flows.
- **Whale / Wallet Intelligence** — Arkham Intelligence and DeBank both document research-stage wallet, entity, portfolio, or activity coverage.

### Domains With No Redundancy

- **Primary macro source** — FRED is the only provider documented as the primary macro provider, although BGeometrics has overlap variables.
- **Primary Bitcoin cycle indicator source** — BGeometrics is the only provider documented as primary for Bitcoin MVRV, SOPR, NUPL, HODL Waves, CDD, Puell Multiple, Reserve Risk, and exchange-flow variables in the raw catalog.
- **Ethereum staking source categories** — Existing raw variables are split across Beacon Node access, Etherscan, and Bitquery; individual raw variables such as ETH active validators and ETH total supply each have a single documented primary provider in the raw catalog.

---

## Provider Redundancy Summary

The existing research artifacts document provider overlap in several business areas:

- **Multi-provider normalization** — The canonical dictionary and variable mapping matrix identify multi-provider normalization for selected canonical variables, including BTC MVRV Z-Score, BTC NUPL, Bitcoin exchange flows, active addresses, transaction count, open interest, funding rate, global market price, market capitalization, trading volume, DEX volume, and token transfers.
- **Exchange-specific data** — The derivatives variables for Binance Futures API, Bybit API, and OKX API document exchange-specific open interest and funding-rate coverage. The canonical dictionary notes that open interest and funding-rate values are exchange-specific unless an upstream provider explicitly supplies an aggregate.
- **Provider overlap** — BGeometrics overlaps with macro and stablecoin categories through documented M2, DXY, VIX, Treasury yield, and stablecoin supply variables. CoinGecko, CoinPaprika, and CoinCap overlap in global market data. DefiLlama, GeckoTerminal, CoinGecko, and Bitquery overlap in DeFi or DEX-related coverage.

This section documents overlap only. It does not recommend provider routing, provider selection, fallback handling, conflict resolution, or implementation behavior.

---

## Provider Gap Summary

The existing research artifacts document the following coverage gaps or limitations:

- **CoinGecko** — No ETF data, macro data, mining data, or staking data; on-chain coverage is limited to DEX data through GeckoTerminal; stablecoin coverage lacks native depeg/backing-ratio metrics.
- **DefiLlama** — No global crypto market cap or dominance coverage, no macro data, no ETF data, no mining data, no staking data, no SOPR/MVRV/NUPL-style on-chain analytics, and derivatives coverage is partial or partially documented.
- **GeckoTerminal** — No global market aggregates, macro data, derivatives data, ETF data, mining data, or staking data; stablecoin visibility is token-level rather than aggregated.
- **CoinPaprika** — No on-chain, ETF, macro, mining, or staking data; stablecoin and DeFi coverage are limited; derivatives coverage is documented as available but not primary.
- **FRED** — No crypto market, stablecoin, DeFi, derivatives, on-chain, ETF, mining, or staking coverage.
- **Coinalyze** — No global market, coin market, stablecoin, DeFi, on-chain, ETF, macro, mining, or staking coverage.
- **BGeometrics** — No broad global market data, DeFi data, or staking data; coin market data is Bitcoin-only; mining coverage is partial; commercial redistribution terms require verification.
- **Coin Metrics** — Raw catalog entries include Community-tier network activity and advanced/unverified on-chain research variables; advanced metrics are documented as research-stage or tier-unverified.
- **Arkham Intelligence** — Whale-tracking API developer access is documented as pilot-program based, with research-stage status.
- **DeBank** — Wallet portfolio and activity coverage is documented as more suitable for manual checks, with official programmatic API access limited and requiring verification.

No new providers, gaps, formulas, thresholds, decision logic, or implementation recommendations are introduced by this summary.

---

## Cross References

- `MasterProviderResearch.md`
- `RawVariableCatalog.md`
- `CanonicalVariableDictionary.md`
- `DerivedMetricsCatalog.md`
- `VariableMappingMatrix.md`
