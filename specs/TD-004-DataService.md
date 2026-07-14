# Technical Design

## 1. Document Information

| Field | Value |
|------|------|
| Status | Frozen |
| Version | 1.0 |
| Owner | PROJECT365 Architecture |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR |
| Referenced By | Issue Specification, Acceptance Criteria, Implementation Prompt |

---

## 2. Purpose

Define the Technical Design for TD-004 Data Service.

Data Service coordinates data ingestion from the Provider Framework and produces MarketData. It owns orchestration only and must never perform business logic, calculate market intelligence, or store historical snapshots.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, or implementation details.

---

## 3. Scope

This Technical Design covers Data Service as a Foundation component.

Included responsibilities:

- Orchestrate Provider Framework.
- Request market data.
- Normalize provider outputs into the approved MarketData boundary.
- Build MarketData.
- Preserve source attribution required by MarketData.
- Hand MarketData to Health Layer consumers.

Excluded responsibilities:

- Provider implementation.
- Market intelligence.
- Business logic.
- Health validation.
- Snapshot creation.
- Historical snapshot storage.

---

## 4. Background

The approved Foundation architecture places Data Service downstream of Provider Framework and upstream of MarketData Contract and Health Layer.

Approved dependency sequence:

```text
Provider Framework
↓
Data Service
↓
MarketData Contract
↓
Health Layer
```

Reference context is derived from BRD, PRD, Architecture, Product Map, Glossary, and ADR without duplicating or expanding those documents.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Foundation Domain includes Data Service and requires trusted, immutable, validated market data. |
| PRD | Foundation provides trusted market data before downstream intelligence. |
| Architecture | Data Service orchestrates provider aggregation and produces MarketData; contains orchestration only. |
| Product Map | Ingest global market data maps to Foundation Data Service. |
| ADR | Single Source of Truth, Separation of Concerns, Layer Dependency Rules, Immutable Foundation Objects. |

Every technical decision in this document is traceable to approved Foundation responsibilities, dependency rules, Single Source of Truth, Separation of Concerns, Hard Gate Principle, Explainability, and Auditability.

---

## 6. Design Overview

Data Service is the Foundation orchestration component that requests approved provider data through the Provider Framework, accepts Provider Results or Provider Errors, normalizes acceptable provider outputs to the approved MarketData Contract, and exposes MarketData to Health Layer.

Boundaries:

- Data Service produces MarketData only.
- Data Service does not validate Health Status.
- Data Service does not create or persist snapshots.
- Data Service does not calculate deltas, regimes, confidence, exposure, or recommendations.

Design principles:

- Preserve Single Source of Truth.
- Preserve Separation of Concerns.
- Preserve Hard Gate Principle.
- Preserve Explainability.
- Preserve Auditability.
- Preserve approved dependency direction.
- Contain no business logic unless explicitly owned by an approved downstream domain.
- Introduce no implementation details.

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Provider Orchestration | Coordinate approved Provider Framework interactions. | Provider metadata and data request context | Provider Result or Provider Error | Data Service |
| Normalization Boundary | Map acceptable provider outputs to MarketData fields. | Provider Result | MarketData-ready values | Data Service |
| MarketData Builder | Produce MarketData according to TD-001. | Normalized provider output | MarketData | Data Service |
| Handoff Boundary | Expose MarketData to Health Layer. | MarketData | Health Layer input | Data Service |

---

## 8. Data Model

Data Service does not define a new product data model.

Data contracts used:

- Provider Result from TD-000.
- Provider Error from TD-000.
- MarketData from TD-001.

Lifecycle:

```text
Request provider data
↓
Receive Provider Result or Provider Error
↓
Normalize acceptable provider output
↓
Build MarketData
↓
Expose MarketData to Health Layer
```

---

## 9. Public Interfaces

### MarketData Production Interface

Inputs:

- Provider Framework access.
- Provider Result.
- Provider Error.

Outputs:

- MarketData.
- Standardized orchestration failure state when MarketData cannot be produced.

Expected behavior:

- Use only approved Provider Framework boundaries.
- Produce MarketData that conforms to TD-001.
- Preserve source attribution through `fetchSource` and `fetchedAt`.

---

## 10. Internal Flow

1. Data Service requests market data through Provider Framework.
2. Provider Framework returns Provider Result or Provider Error.
3. Data Service rejects unacceptable provider failures and malformed provider outputs.
4. Data Service normalizes acceptable Provider Results to MarketData fields.
5. Data Service builds MarketData.
6. Health Layer receives MarketData for validation.

Dependency rule:

```text
Provider Framework
↓
Data Service
↓
MarketData Contract
↓
Health Layer
```

---

## 11. Error Handling

Validation:

- Provider Result must identify source attribution.
- Required MarketData fields must be present before handoff.
- Provider Error must remain provider-agnostic.

Failure scenarios:

- Provider unavailable.
- Provider timeout.
- Provider rate limit.
- Provider malformed response.
- Required MarketData field unavailable.

Recovery strategy:

- Do not create partial MarketData.
- Preserve error category for auditability.
- Do not bypass Provider Framework.
- Do not let Health Layer access providers directly.

---

## 12. Non-Functional Considerations

Performance:

- Provider orchestration should avoid unnecessary duplicate provider calls.

Reliability:

- Provider failures must prevent invalid MarketData production.

Maintainability:

- Provider changes remain behind Provider Framework.

Testability:

- Orchestration, normalization, and MarketData handoff must be independently verifiable.

Security:

- Provider credentials and external-source internals must not be exposed downstream.

Auditability:

- Source attribution and failure categories must remain inspectable.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- ADR.
- TD-000 Data Provider Framework.

Downstream consumers:

- TD-001 MarketData Contract.
- TD-002 Health Layer.
- TD-003 Snapshot Engine through Health Layer.

Approved dependency chain:

```text
Provider Framework
→ Data Service
→ MarketData Contract
→ Health Layer
```

---

## 14. Assumptions

- Provider Framework supplies Provider Results and Provider Errors.
- MarketData Contract remains the only approved output contract for trusted market data.
- Health Layer owns validation after MarketData production.

---

## 15. Constraints

- Data Service must not perform business logic.
- Data Service must not calculate market intelligence.
- Data Service must not store historical snapshots.
- Data Service must preserve dependency direction.
- Data Service must not alter TD-001 field definitions.

---

## 16. Out of Scope

This Technical Design does not cover:

- Provider-specific adapters.
- Health Status.
- Snapshot creation.
- Snapshot persistence.
- Market deltas.
- Regime calculations.
- Portfolio recommendations.
- Event bus transport.

---

## 17A. Implementation Specification

This section increases implementation precision for the existing Data Service design without changing responsibilities, dependency direction, runtime flow, or ownership.

### Exported Contracts

#### DataServiceRequest

| Field | Type | Required | Rule | TD Trace |
|---|---|---:|---|---|
| requestId | string | Yes | Non-empty caller-provided correlation value. | TD-004 Public Interfaces |
| providerId | string | Yes | Must identify an approved Provider Framework provider. | TD-004 Provider Orchestration |
| assetId | string | Yes | Non-empty provider-agnostic asset identifier. | TD-004 MarketData Production Interface |
| requestedAt | number | Yes | Unix epoch milliseconds; must be greater than 0. | TD-004 Lifecycle |
| timeoutMs | number | No | If omitted, use default timeout of 10000 milliseconds. | TD-004 Timeout Behavior |
| maxRetries | number | No | If omitted, use default retry count of 1. | TD-004 Retry Policy |

#### ProviderResult

ProviderResult is supplied by TD-000 and consumed by TD-004 only through Provider Framework access.

| Field | Type | Required | Mapping Target | Rule |
|---|---|---:|---|---|
| providerId | string | Yes | fetchSource | Must match the provider used by Provider Framework. |
| providerTimestamp | number | Yes | fetchedAt candidate | Unix epoch milliseconds; must be greater than 0. |
| asset.id | string | Yes | id | Must normalize to non-empty string. |
| asset.symbol | string | Yes | symbol | Must normalize to uppercase non-empty string. |
| asset.name | string | Yes | name | Must normalize to non-empty string. |
| market.priceUsd | number | Yes | priceUsd | Must be finite and greater than or equal to 0. |
| market.change1h | number | Yes | change1h | Must be finite. |
| market.change24h | number | Yes | change24h | Must be finite. |
| market.volume24hUsd | number | Yes | volume24hUsd | Must be finite and greater than or equal to 0. |
| market.marketCapUsd | number | Yes | marketCapUsd | Must be finite and greater than or equal to 0. |
| market.totalMarketCapUsd | number | Yes | totalMarketCapUsd | Must be finite and greater than or equal to 0. |
| market.total3MarketCap | number | Yes | total3MarketCap | Must be finite and greater than or equal to 0. |
| market.btcDominance | number | Yes | btcDominance | Must be finite and between 0 and 100 inclusive. |
| market.usdtDominance | number | Yes | usdtDominance | Must be finite and between 0 and 100 inclusive. |
| market.usdcDominance | number | Yes | usdcDominance | Must be finite and between 0 and 100 inclusive. |
| supply.circulatingSupply | number | Yes | circulatingSupply | Must be finite and greater than or equal to 0. |
| market.ath | number | Yes | ath | Must be finite and greater than or equal to 0. |
| market.atl | number | Yes | atl | Must be finite and greater than or equal to 0. |

#### DataServiceSuccess

| Field | Type | Required | Rule |
|---|---|---:|---|
| ok | boolean | Yes | Must be true. |
| requestId | string | Yes | Echoes DataServiceRequest.requestId. |
| providerId | string | Yes | Approved provider used for production. |
| marketData | MarketData | Yes | Complete TD-001 MarketData object. |
| attempts | number | Yes | Total provider attempts, including initial attempt. |
| completedAt | number | Yes | Unix epoch milliseconds. |

#### DataServiceFailure

| Field | Type | Required | Rule |
|---|---|---:|---|
| ok | boolean | Yes | Must be false. |
| requestId | string | Yes | Echoes DataServiceRequest.requestId when available. |
| providerId | string | No | Present when provider was resolved. |
| errorCode | string | Yes | One of the failure codes listed below. |
| errorMessage | string | Yes | Non-empty human-readable explanation. |
| retryable | boolean | Yes | True only for timeout, unavailable, or rate-limit failures before retry budget is exhausted. |
| attempts | number | Yes | Total provider attempts performed. |
| failedAt | number | Yes | Unix epoch milliseconds. |
| missingFields | string[] | No | Present for missing required MarketData fields. |

Allowed `errorCode` values:

- `INVALID_REQUEST`
- `UNSUPPORTED_PROVIDER`
- `PROVIDER_UNAVAILABLE`
- `PROVIDER_TIMEOUT`
- `PROVIDER_RATE_LIMITED`
- `PROVIDER_MALFORMED_RESPONSE`
- `MISSING_MARKETDATA_FIELD`
- `INVALID_MARKETDATA_FIELD`
- `NORMALIZATION_FAILED`

### Callable Methods

| Method | Input | Output | Responsibility Boundary |
|---|---|---|---|
| produceMarketData(request) | DataServiceRequest | DataServiceSuccess or DataServiceFailure | Orchestrate Provider Framework, normalize provider output, build MarketData, and expose it to Health Layer. |
| normalizeProviderResult(providerResult) | ProviderResult | MarketData creation values or DataServiceFailure | Map acceptable provider output to TD-001 MarketData-ready values. |
| mapToMarketData(normalizedValues) | MarketData creation values | MarketData or DataServiceFailure | Produce MarketData according to TD-001 only. |

These method names are the approved public callable names for implementation. They do not introduce additional module responsibilities.

### Provider Normalization and Mapping Rules

1. Provider output must be accepted only when it comes through Provider Framework.
2. Provider output must not be accepted from direct provider access.
3. `providerId` must map to `fetchSource`.
4. `providerTimestamp` must map to `fetchedAt` when present and valid; otherwise `requestedAt` may be used only if provider output is otherwise complete.
5. All 19 TD-001 MarketData fields must be present after normalization.
6. String fields must be trimmed; `symbol` must be uppercase.
7. Numeric fields must remain numeric and finite; numeric strings must be rejected rather than coerced.
8. Dominance fields must be between 0 and 100 inclusive.
9. No optional provider-only fields may be added to MarketData.
10. Partial MarketData must never be created.

### Validation Sequence

1. Validate DataServiceRequest required fields.
2. Reject unsupported provider before any provider call.
3. Request provider data only through Provider Framework.
4. Apply timeout behavior to each provider attempt.
5. Apply retry policy only for retryable provider failures.
6. Validate ProviderResult source attribution.
7. Normalize ProviderResult to TD-001 field names.
8. Validate all TD-001 required fields before MarketData creation.
9. Build MarketData using TD-001 contract rules.
10. Return DataServiceSuccess or DataServiceFailure.

### Timeout Behavior

- Default timeout is 10000 milliseconds per provider attempt.
- A request-specific `timeoutMs` may override the default only when greater than 0.
- A timed-out attempt must return or record `PROVIDER_TIMEOUT`.
- A timeout must not produce partial MarketData.
- Timeout failures are retryable until retry budget is exhausted.

### Retry Policy

- Default max retry count is 1 retry after the initial attempt.
- Retries are permitted only for `PROVIDER_TIMEOUT`, `PROVIDER_UNAVAILABLE`, and `PROVIDER_RATE_LIMITED`.
- Retries are not permitted for malformed responses, unsupported providers, invalid requests, or missing/invalid MarketData fields.
- Total attempts must equal initial attempt plus retries performed.
- Failure after exhausted retry budget must return `retryable: false`.

### Rate Limit Behavior

- Provider rate-limit responses must map to `PROVIDER_RATE_LIMITED`.
- Rate-limit failures may be retried only within the approved retry policy.
- Data Service must not bypass Provider Framework to avoid rate limits.
- Data Service must not switch to an unrequested provider unless Provider Framework owns that decision and returns an approved ProviderResult.

### Unsupported Provider Behavior

- Unsupported provider IDs must be rejected before provider access.
- Rejection must use `UNSUPPORTED_PROVIDER`.
- Attempts must be 0 for unsupported provider rejection.
- No MarketData may be created.

### Lifecycle and State Transitions

| State | Entry Condition | Exit Condition | Output |
|---|---|---|---|
| REQUEST_RECEIVED | produceMarketData receives DataServiceRequest | Request valid or invalid | Continue or DataServiceFailure |
| PROVIDER_RESOLVED | providerId is approved | Provider call starts | Continue |
| PROVIDER_REQUESTED | Provider Framework request in progress | ProviderResult or ProviderError received | Continue or retry/failure |
| NORMALIZING | ProviderResult received | Field mapping succeeds or fails | Continue or DataServiceFailure |
| MARKETDATA_BUILDING | Normalized fields complete | MarketData created or rejected | DataServiceSuccess or DataServiceFailure |
| FAILED | Any terminal failure occurs | None | DataServiceFailure |
| COMPLETED | MarketData created | None | DataServiceSuccess |

### Implementation Readiness Checklist

- Public methods are named.
- Request, success, and failure schemas are defined.
- ProviderResult to MarketData mapping is defined.
- Timeout, retry, rate-limit, and unsupported provider behavior are defined.
- Validation sequence is ordered and deterministic.

---

## 17. Implementation Notes

Implementation guidance:

- Keep Data Service limited to orchestration and MarketData production.
- Keep all provider access through Provider Framework.
- Keep all health evaluation in Health Layer.
- Keep all persistence in Storage Layer or Snapshot Engine ownership as approved.

Acceptance Criteria:

- Data Service defines upstream Provider Framework dependency.
- Data Service defines downstream MarketData and Health Layer consumers.
- Data Service produces MarketData only through TD-001.
- Data Service explicitly excludes business logic, market intelligence, and historical snapshot storage.
- All responsibilities trace to approved governance documents.

No source code, implementation algorithm, storage technology, transport technology, or issue-level task breakdown is defined by this Technical Design.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Foundation Domain trusted market data modules and constraints. |
| PRD | Foundation readiness before downstream intelligence. |
| Architecture | Data Service responsibility and Foundation dependency rules. |
| Product Map | Data Service capability mapping for global market data ingestion. |
| ADR | ADR-004, ADR-005, ADR-006, ADR-007. |

---

## 19. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- TD-000 Data Provider Framework
- TD-001 MarketData Contract
- TD-002 Health Layer
- TD-003 Snapshot Engine

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial TD-004 Data Service Technical Design |
