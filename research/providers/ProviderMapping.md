# PROJECT365 — Provider Mapping

Version: 1.0

Status: Draft

---

## Purpose

This document defines the governance relationship between documented Providers and Raw Variables used throughout PROJECT365.

The purpose of this document is to document which providers supply each documented Raw Variable and how those provider relationships are represented throughout the frozen Research Foundation.

This document exists to improve traceability between:

- MasterProviderResearch.md
- RawVariableCatalog.md
- CanonicalVariableDictionary.md
- VariableMappingMatrix.md
- DerivedMetricsCatalog.md
- ProviderCoverageMatrix.md

This document does NOT introduce new providers, variables, mappings, formulas, thresholds, or implementation behavior.

---

## Scope

This document documents provider-to-raw-variable relationships only.

This document is a governance reference.

It does not redefine any provider capability or variable ownership.

Authoritative definitions remain in the following documents:

Provider definitions

- MasterProviderResearch.md

Raw Variable definitions

- RawVariableCatalog.md

Canonical Variable definitions

- CanonicalVariableDictionary.md

Raw-to-Canonical relationships

- VariableMappingMatrix.md

Derived business metrics

- DerivedMetricsCatalog.md

Provider business-domain coverage

- ProviderCoverageMatrix.md

---

## Single Source of Truth

ProviderMapping.md is NOT an authoritative source for provider capability.

ProviderMapping.md is a derived governance document.

Provider definitions remain owned by:

MasterProviderResearch.md

Raw Variable definitions remain owned by:

RawVariableCatalog.md

Canonical Variable definitions remain owned by:

CanonicalVariableDictionary.md

Raw-to-Canonical relationships remain owned by:

VariableMappingMatrix.md

Derived Metric definitions remain owned by:

DerivedMetricsCatalog.md

Business-domain provider coverage remains owned by:

ProviderCoverageMatrix.md

If any inconsistency exists, the source documents above take precedence.

---

## Documentation Boundaries

This document documents provider mappings only.

It does NOT define:

- formulas

- thresholds

- decision logic

- market states

- scoring models

- signal generation

- provider routing

- provider ranking

- provider priority logic

- provider selection rules

- fallback rules

- conflict resolution

- implementation behavior

- runtime behavior

- data quality scoring

- validation logic

This document is documentation only.

---

## Provider Mapping Principles

The following principles apply throughout this document.

### Principle 1

Each Raw Variable is documented with one Primary Provider.

The Primary Provider is the provider documented as the authoritative source within the frozen research documentation.

This document does not redefine Primary Provider ownership.

---

### Principle 2

Secondary Providers are documented only when explicitly supported by existing research documentation.

Secondary Providers do NOT imply runtime fallback.

They document only existing research overlap.

---

### Principle 3

If no documented Secondary Provider exists, the value shall be:

Not documented

---

### Principle 4

Provider Mapping does not determine provider selection.

Provider selection remains outside the scope of the Research Foundation.

---

### Principle 5

Provider Mapping does not determine provider priority.

Priority decisions belong to future implementation governance.

---

### Principle 6

Provider Mapping does not determine provider routing.

No runtime behavior is introduced.

---

### Principle 7

Provider Mapping does not define implementation behavior.

Implementation belongs to later architecture layers.

---

## Mapping Status Definitions

The following mapping statuses are documentation classifications only.

Mapped

The Provider-to-Raw Variable relationship is explicitly documented.

Partially Documented

The relationship exists but contains documented limitations.

Research

The relationship exists only within research documentation and requires additional verification before implementation.

Not Documented

No provider relationship is currently documented.

These statuses do not define implementation readiness.

---

## Coverage Type Definitions

Primary

The documented provider for the Raw Variable.

Secondary

Documented overlap or supplemental coverage supported by existing research.

Specialized

Provider supplies only a specialized subset of the business area.

Research

Provider relationship exists but remains research-stage.

Not Documented

No documented provider relationship exists.

These classifications are documentation-only.

They do not define routing, ranking, fallback, implementation, or runtime behavior.

---

## Provider Mapping Matrix

The following section documents Provider-to-Raw Variable relationships only.

Authoritative Raw Variable definitions remain in:

RawVariableCatalog.md

Authoritative Canonical mappings remain in:

VariableMappingMatrix.md

Authoritative Provider capabilities remain in:

MasterProviderResearch.md

| RV ID | Raw Variable | Primary Provider | Secondary Provider(s) | Mapping Status | Notes |
|-------|--------------|------------------|-----------------------|----------------|------|
| RV-001 | BTC_MVRV_Z_SCORE | BGeometrics | Not documented | Mapped | Primary Bitcoin on-chain valuation metric. |
| RV-002 | BTC_SOPR | BGeometrics | Not documented | Mapped | Primary Bitcoin spending behavior metric. |
| RV-003 | BTC_NUPL | BGeometrics | Not documented | Mapped | Primary Bitcoin unrealized profit/loss metric. |
| RV-004 | BTC_HODL_WAVES | BGeometrics | Not documented | Mapped | Primary Bitcoin holding-age distribution metric. |
| RV-005 | BTC_COIN_DAYS_DESTROYED | BGeometrics | Not documented | Mapped | Primary Bitcoin activity metric. |
| RV-006 | BTC_PUELL_MULTIPLE | BGeometrics | Not documented | Mapped | Primary Bitcoin mining-cycle metric. |
| RV-007 | BTC_RESERVE_RISK | BGeometrics | Not documented | Mapped | Primary Bitcoin long-term holder confidence metric. |
| RV-008 | BTC_EXCHANGE_INFLOW | BGeometrics | Not documented | Mapped | Exchange flow metric documented in RawVariableCatalog. |
| RV-009 | BTC_EXCHANGE_OUTFLOW | BGeometrics | Not documented | Mapped | Exchange flow metric documented in RawVariableCatalog. |
| RV-010 | BTC_EXCHANGE_RESERVE | BGeometrics | Not documented | Mapped | Exchange reserve metric documented in RawVariableCatalog. |
| RV-011 | US_M2_SUPPLY | FRED | BGeometrics | Mapped | FRED is authoritative; BGeometrics documents overlap only. |
| RV-012 | DXY_INDEX | FRED | BGeometrics | Mapped | FRED remains authoritative macro source. |
| RV-013 | US_10Y_TREASURY_YIELD | FRED | BGeometrics | Mapped | Treasury yield overlap documented. |
| RV-014 | TOTAL_STABLECOIN_SUPPLY | DefiLlama | BGeometrics | Mapped | DefiLlama primary; BGeometrics bonus/overlap only. |
| RV-015 | BTC_DOMINANCE | CoinGecko | CoinPaprika | Mapped | Primary market dominance metric. |
| RV-016 | TOTAL_CRYPTO_MARKET_CAP | CoinGecko | CoinPaprika, CoinCap | Mapped | Global market capitalization coverage. |
| RV-017 | TOTAL3_MARKET_CAP | CoinGecko | CoinPaprika | Mapped | Alternative market capitalization metric. |
| RV-018 | USDT_DOMINANCE | CoinGecko | Not documented | Mapped | Stablecoin dominance metric. |
| RV-019 | USDC_DOMINANCE | CoinGecko | Not documented | Mapped | Stablecoin dominance metric. |
| RV-020 | ACTIVE_ADDRESSES | Coin Metrics | Bitquery | Mapped | Coin Metrics primary research source. |
| RV-021 | TRANSACTION_COUNT | Coin Metrics | Bitquery | Mapped | Network transaction activity. |
| RV-022 | NETWORK_SUPPLY | Coin Metrics | Not documented | Mapped | Network supply metric. |
| RV-023 | ETH_ACTIVE_VALIDATORS | Beacon Node | Bitquery | Mapped | Validator participation metric. |
| RV-024 | ETH_TOTAL_SUPPLY | Etherscan | Bitquery | Mapped | Ethereum supply metric. |
| RV-025 | DEX_VOLUME | DefiLlama | GeckoTerminal, Bitquery | Mapped | Cross-provider DEX coverage documented. |
| RV-026 | TOKEN_TRANSFER | Bitquery | Not documented | Mapped | Token transfer analytics. |
| RV-027 | OPEN_INTEREST | Coinalyze | Binance API, Bybit API, OKX API | Mapped | Aggregate vs exchange-specific coverage documented. |
| RV-028 | FUNDING_RATE | Coinalyze | Binance API, Bybit API, OKX API, CoinGecko | Mapped | Aggregate funding supported by Coinalyze. |
| RV-029 | LIQUIDATIONS | Coinalyze | Not documented | Mapped | Aggregate liquidation metric. |
| RV-030 | OPTIONS_VOLUME | DefiLlama | CoinPaprika | Partially Documented | Limited provider support documented. |
| RV-031 | BINANCE_OPEN_INTEREST | Binance Futures API | Not documented | Mapped | Exchange-specific metric. |
| RV-032 | BINANCE_FUNDING_RATE | Binance Futures API | Not documented | Mapped | Exchange-specific metric. |
| RV-033 | BYBIT_OPEN_INTEREST | Bybit API | Not documented | Mapped | Exchange-specific metric. |
| RV-034 | BYBIT_FUNDING_RATE | Bybit API | Not documented | Mapped | Exchange-specific metric. |
| RV-035 | OKX_OPEN_INTEREST | OKX API | Not documented | Mapped | Exchange-specific metric. |
| RV-036 | OKX_FUNDING_RATE | OKX API | Not documented | Mapped | Exchange-specific metric. |
| RV-037 | WHALE_ENTITY_ACTIVITY | Arkham Intelligence | Not documented | Research | Pilot/research provider. |
| RV-038 | WHALE_WALLET_ACTIVITY | DeBank | Arkham Intelligence | Research | Wallet portfolio activity. |
| RV-039 | WHALE_PORTFOLIO_VALUE | DeBank | Not documented | Research | Research-stage capability. |
| RV-040 | WHALE_TRANSACTION_ACTIVITY | Arkham Intelligence | DeBank | Research | Wallet/entity monitoring. |
| RV-041 | ASSET_PRICE | CoinGecko | CoinPaprika, CoinCap | Mapped | Primary global pricing metric. |
| RV-042 | ASSET_MARKET_CAP | CoinGecko | CoinPaprika, CoinCap | Mapped | Primary market capitalization metric. |
| RV-043 | ASSET_TRADING_VOLUME | CoinGecko | CoinPaprika, CoinCap | Mapped | Primary trading volume metric. |
| RV-044 | TVL | DefiLlama | Not documented | Mapped | Primary Total Value Locked metric. |
| RV-045 | YIELD_POOL_APR | DefiLlama | Not documented | Mapped | Yield protocol metric. |

---

## Mapping Governance

Provider Mapping documents Provider-to-Raw Variable relationships only.

This document does not redefine:

- Provider capabilities
- Raw Variables
- Canonical Variables
- Derived Metrics
- Business Domains
- Business Categories
- Formula ownership
- Threshold ownership
- Decision Logic ownership
- Runtime implementation

All mappings documented here are derived from the frozen Research Foundation.

---

## Relationship to Other Research Documents

The Provider research documentation follows the governance hierarchy below.

Master Provider Research

↓

Raw Variable Catalog

↓

Canonical Variable Dictionary

↓

Variable Mapping Matrix

↓

Derived Metrics Catalog

Provider Coverage Matrix provides a documentation-only summary of provider business-domain coverage.

Provider Mapping documents Provider-to-Raw Variable relationships only.

Neither document replaces the authoritative research documents above.

---

## Cross-Document Traceability

Each Provider Mapping row shall be traceable to:

- one documented Provider

- one documented Raw Variable

- one documented Canonical Variable through VariableMappingMatrix

Where applicable, the Canonical Variable may also contribute to one or more Derived Metrics.

ProviderMapping does not redefine these relationships.

It documents them for governance and traceability only.

---

## Mapping Rules

The following rules apply throughout this document.

Rule 1

Each documented Raw Variable shall identify one documented Primary Provider.

Rule 2

Secondary Providers may only be documented when explicitly supported by existing research documentation.

Rule 3

Secondary Provider does not imply:

- runtime fallback

- runtime routing

- implementation priority

- implementation redundancy

Rule 4

Research providers remain research providers.

Documenting a provider relationship does not change implementation readiness.

Rule 5

Provider Mapping does not determine:

- implementation ownership

- provider ranking

- provider selection

- provider orchestration

- conflict resolution

- runtime execution

---

## Synchronization Requirements

ProviderMapping.md shall remain synchronized with:

- MasterProviderResearch.md

- RawVariableCatalog.md

- CanonicalVariableDictionary.md

- VariableMappingMatrix.md

- DerivedMetricsCatalog.md

- ProviderCoverageMatrix.md

Whenever one of these documents changes, ProviderMapping.md shall be reviewed for consistency.

---

## Change Governance

Any modification to this document must preserve:

- Single Source of Truth

- Documentation-only governance

- Architecture layering

- Provider consistency

- Raw Variable consistency

- Canonical Variable consistency

- Variable Mapping consistency

- Derived Metric consistency

Changes must not introduce:

- formulas

- thresholds

- decision logic

- provider routing

- provider ranking

- provider priority

- provider selection

- fallback rules

- implementation behavior

- runtime behavior

---

## Out of Scope

This document intentionally excludes:

- API endpoints

- REST paths

- GraphQL queries

- Authentication

- SDK usage

- Request examples

- Response examples

- Data parsing

- Polling intervals

- Cache strategy

- Retry strategy

- Health checks

- Runtime validation

- Formula implementation

- Threshold implementation

- Decision logic

- Market regime logic

- Signal generation

- Portfolio logic

These subjects belong to later implementation documentation.

---

## Research Foundation Compliance

ProviderMapping.md complies with the frozen PROJECT365 Research Foundation by documenting Provider-to-Raw Variable relationships without redefining any upstream research artifact.

This document preserves:

✓ Single Source of Truth

✓ Documentation-only governance

✓ Architecture layering

✓ Cross-document traceability

✓ Provider consistency

✓ Raw Variable consistency

✓ Canonical Variable consistency

✓ Variable Mapping consistency

✓ Derived Metric consistency

---

## Research Foundation Status

Current Status

Draft

Intended Status

Research Foundation

Readiness

Documentation Ready

Implementation Ready

No

Runtime Behavior

Out of Scope

Decision Logic

Out of Scope

Formula Ownership

Out of Scope

Threshold Ownership

Out of Scope

Provider Routing

Out of Scope

Provider Selection

Out of Scope

---

End of Document

---

## Provider-to-Raw Variable Summary

The following table summarizes the documented Raw Variables supplied by each Provider.

This table is a derived governance view only.

Authoritative Raw Variable definitions remain in:

RawVariableCatalog.md

Authoritative Provider definitions remain in:

MasterProviderResearch.md

This summary does not redefine provider capability.

| Provider | Documented Raw Variables |
|----------|--------------------------|
| BGeometrics | RV-001, RV-002, RV-003, RV-004, RV-005, RV-006, RV-007, RV-008, RV-009, RV-010, RV-011 (overlap), RV-012 (overlap), RV-013 (overlap), RV-014 (overlap) |
| FRED | RV-011, RV-012, RV-013 |
| DefiLlama | RV-014, RV-025, RV-030, RV-044, RV-045 |
| CoinGecko | RV-015, RV-016, RV-017, RV-018, RV-019, RV-028 (secondary), RV-041, RV-042, RV-043 |
| CoinPaprika | RV-015 (secondary), RV-016 (secondary), RV-017 (secondary), RV-030 (secondary), RV-041 (secondary), RV-042 (secondary), RV-043 (secondary) |
| CoinCap | RV-016 (secondary), RV-041 (secondary), RV-042 (secondary), RV-043 (secondary) |
| Coin Metrics | RV-020, RV-021, RV-022 |
| Beacon Node | RV-023 |
| Etherscan | RV-024 |
| GeckoTerminal | RV-025 (secondary) |
| Bitquery | RV-020 (secondary), RV-021 (secondary), RV-023 (secondary), RV-024 (secondary), RV-025 (secondary), RV-026 |
| Coinalyze | RV-027, RV-028, RV-029 |
| Binance Futures API | RV-027 (secondary), RV-028 (secondary), RV-031, RV-032 |
| Bybit API | RV-027 (secondary), RV-028 (secondary), RV-033, RV-034 |
| OKX API | RV-027 (secondary), RV-028 (secondary), RV-035, RV-036 |
| Arkham Intelligence | RV-037, RV-040, RV-038 (secondary) |
| DeBank | RV-038, RV-039, RV-040 (secondary) |

---

## Provider Coverage Statistics

The following statistics summarize the documented Provider coverage within the frozen Research Foundation.

| Summary | Count |
|---------|------:|
| Total Providers | 17 |
| Total Raw Variables | 45 |
| Primary Provider Relationships | 45 |
| Secondary Provider Relationships | Documentation only |
| Research-stage Providers | 2 |
| Exchange-specific Providers | 3 |
| Macro Providers | 1 |
| On-Chain Providers | Multiple |
| DeFi Providers | Multiple |
| Derivatives Providers | Multiple |
| Global Market Providers | Multiple |

These statistics are documentation summaries only.

They shall not be interpreted as implementation guidance.

---

## Audit Guidance

During future documentation audits, the following should always remain true:

✓ Every Provider exists in MasterProviderResearch.md

✓ Every Raw Variable exists in RawVariableCatalog.md

✓ Every Raw Variable appears exactly once as a Primary Provider

✓ Every Provider relationship is traceable

✓ Every mapping is supported by existing documentation

✓ No Provider is introduced only inside ProviderMapping.md

✓ No runtime behavior is introduced

✓ No provider routing is introduced

✓ No provider ranking is introduced

✓ No fallback behavior is introduced

✓ No formulas are introduced

✓ No thresholds are introduced

✓ No decision logic is introduced


