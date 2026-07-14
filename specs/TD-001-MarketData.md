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

Define the Technical Design for TD-001 MarketData.

Define the immutable market data contract used throughout PROJECT365.

MarketData is the Single Source of Truth for market information and represents a single market state at one fetch point in time.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, user interface implementation, frontend framework, APIs, or implementation details.

---

## 3. Scope

This Technical Design covers MarketData Contract as a Foundation component.

Goals:

- Standardize market data structure.
- Provide immutable market objects.
- Ensure downstream compatibility.
- Minimize breaking changes.
- Decouple data acquisition from intelligence calculations.

Non Goals:

This specification does not define:

- Market analysis.
- Regime calculations.
- Portfolio decisions.
- Multi-timeframe analytics.
- UI requirements.
- Storage implementation.
- Network implementation.

Out of scope:

MarketData shall not contain:

- Multi-timeframe analytics.
- Derived intelligence.
- Regime information.
- Portfolio information.
- Dashboard state.
- Historical calculations.
- User preferences.

---

## 4. Background

PROJECT365 is approved as an Adaptive Crypto Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform. The approved architecture places MarketData in the Foundation Domain as the immutable market data structure and Single Source of Truth for downstream systems.

Approved Foundation dependency chain:

```text
TD-000 Provider Framework
↓
TD-004 Data Service
↓
TD-001 MarketData
↓
TD-002 Health Layer
↓
TD-003 Snapshot Engine
```

MarketData preserves Single Source of Truth, Separation of Concerns, Auditability, and approved dependency direction.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Foundation Domain provides trusted, immutable, and validated market data. |
| PRD | Foundation readiness precedes downstream intelligence. |
| Architecture | MarketData Contract defines immutable market data used as the Single Source of Truth. |
| Product Map | MarketData Contract is a Foundation module and supports validated market data. |
| ADR | Single Source of Truth, Modular Architecture, Specification Driven Development, and Documentation-First Workflow. |

Every technical decision in this document is traceable to approved Foundation responsibilities and dependency rules.

---

## 6. Design Overview

MarketData has one responsibility only:

Represent raw market data at a specific point in time.

MarketData is NOT responsible for:

- Historical calculations.
- Multi-timeframe analytics.
- Market intelligence.
- Regime analysis.
- Exposure recommendations.
- Portfolio decisions.

Design principles:

The MarketData contract must be:

- Immutable.
- Serializable.
- Backward Compatible.
- Explainable.
- Provider Agnostic.
- Framework Independent.
- Easy to Validate.

Lifecycle:

```text
Acquire
↓
Validate
↓
Create MarketData
↓
Freeze
↓
Consume
```

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| MarketData Contract | Represent raw market data at a specific point in time. | Validated provider-derived market fields | Immutable MarketData | MarketData Contract |
| Producer Boundary | Ensure MarketData is produced by the approved upstream producer. | Data Service output | MarketData creation input | MarketData Contract |
| Consumer Boundary | Expose immutable MarketData to approved consumers. | Immutable MarketData | Read-only MarketData reference | MarketData Contract |
| Validation Boundary | Define field, numeric, business, and string validation rules. | Candidate MarketData fields | Validated or rejected field set | MarketData Contract |
| Immutability Boundary | Prevent mutation after creation. | Created MarketData | Frozen MarketData | MarketData Contract |

Producer:

- Data Service.

Consumers:

- Health Layer.
- Snapshot Engine.
- Delta Engine.
- Regime Engine.
- LDS Engine.
- Capital Flow Engine.
- OMS Engine.
- Dashboard.

---

## 8. Data Model

Required Fields:

| Field | Type | Required |
|-------|------|-----------|
| id | string | Yes |
| symbol | string | Yes |
| name | string | Yes |
| priceUsd | number | Yes |
| change1h | number | Yes |
| change24h | number | Yes |
| volume24hUsd | number | Yes |
| marketCapUsd | number | Yes |
| totalMarketCapUsd | number | Yes |
| total3MarketCap | number | Yes |
| btcDominance | number | Yes |
| usdtDominance | number | Yes |
| usdcDominance | number | Yes |
| circulatingSupply | number | Yes |
| ath | number | Yes |
| atl | number | Yes |
| fetchedAt | number | Yes |
| fetchSource | string | Yes |
| contractVersion | string | Yes |

Optional Fields:

None.

Core Fields (Freeze Approved):

- id
- symbol
- name
- priceUsd
- change1h
- change24h
- volume24hUsd
- marketCapUsd
- totalMarketCapUsd
- total3MarketCap
- btcDominance
- usdtDominance
- usdcDominance
- circulatingSupply
- ath
- atl
- fetchedAt
- fetchSource
- contractVersion

Total: 19 Fields.

Review Candidates:

- rank
- fullyDilutedMcap
- change7d
- change30d

These fields are excluded from v1.0 and may be reconsidered in future versions.

Removed Fields:

- slug
- change15m
- change4h
- athDate
- atlDate
- athChangePercent
- atlChangePercent
- totalSupply
- maxSupply
- providerTimestamp
- providerName
- ethDominance
- priceBtc
- priceEth

Invariants:

MarketData must:

- contain all required fields;
- be immutable;
- be serializable;
- contain no intelligence;
- contain no calculations;
- contain no UI information;
- contain no historical information.

Immutability Rules:

After creation:

- fields cannot be modified;
- fields cannot be added;
- fields cannot be removed.

Recommended implementation:

```javascript
Object.freeze()
```

Serialization Rules:

MarketData must support:

```javascript
JSON.stringify()
JSON.parse()
```

No custom serialization logic is allowed.

Versioning:

Current Version:

```text
1.0
```

Breaking changes require:

- new version number;
- migration documentation;
- consumer impact review.

---

## 9. Public Interfaces

MarketData is a contract object and exposes no methods.

Input Interface:

Inputs:

- Required MarketData fields from the approved producer.

Outputs:

- Immutable MarketData object or validation rejection.

Expected behavior:

- All required fields must exist.
- Numeric, business, and string validation must pass.
- MarketData must remain framework independent.

Consumer Interface:

Inputs:

- Read-only MarketData request from approved consumers.

Outputs:

- Immutable MarketData reference.

Expected behavior:

- Consumers must not mutate MarketData.
- Consumers must not add intelligence, historical calculations, or UI state to MarketData.

---

## 10. Internal Flow

1. Receive candidate market data fields from Data Service.
2. Validate required fields.
3. Validate numeric fields.
4. Validate business rules.
5. Validate string fields.
6. Create MarketData.
7. Freeze MarketData.
8. Expose immutable MarketData to approved consumers.

---

## 11. Error Handling

Required Fields:

All required fields must exist.

Numeric Validation:

All numeric fields must satisfy:

```javascript
Number.isFinite(value)
```

The following values are invalid:

- NaN.
- Infinity.
- -Infinity.

Business Validation:

```text
priceUsd >= 0
marketCapUsd >= 0
volume24hUsd >= 0
circulatingSupply >= 0
ath >= 0
atl >= 0
fetchedAt > 0
```

String Validation:

```text
symbol != ""
name != ""
fetchSource != ""
contractVersion != ""
```

Invalid input must be rejected without creating an approved MarketData object.

---

## 12. Non-Functional Considerations

Immutability:

- MarketData must be immutable after creation.

Serialization:

- MarketData must support JSON serialization and parsing.

Maintainability:

- MarketData must remain easy to validate and backward compatible.

Testability:

- Required fields, invalid fields, immutability, and serialization must be verifiable.

Explainability:

- MarketData includes source and version fields needed for traceability.

Auditability:

- MarketData preserves fetch source, fetch time, and contract version.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- ADR.
- Data Service.

Contract dependencies:

None.

The MarketData contract must remain independent from:

- React.
- Next.js.
- Database.
- API Framework.
- Storage Engine.
- Dashboard.
- External Libraries.

Downstream consumers:

- Health Layer.
- Snapshot Engine.
- Delta Engine.
- Regime Engine.
- LDS Engine.
- Capital Flow Engine.
- OMS Engine.
- Dashboard.

---

## 14. Assumptions

- Data Service is the approved producer of MarketData.
- All required fields are available before MarketData creation.
- Approved terminology from the Glossary is authoritative.
- No implementation detail is required to define this Technical Design.

---

## 15. Constraints

AI Implementation Constraints:

- No methods.
- No async operations.
- No external dependencies.
- No business logic.
- No framework dependency.
- No network calls.
- No persistence logic.
- No intelligence calculations.

MarketData should behave as a dumb immutable object.

---

## 16. Out of Scope

MarketData is not:

- Market Intelligence.
- Multi-Timeframe Analytics.
- Historical Engine.
- Portfolio Engine.
- Decision Engine.

This Technical Design excludes:

- Source code changes.
- Implementation algorithm changes.
- New product scope.
- New architecture decisions.
- New modules.

---

## 17. Implementation Notes

Implementation work must be defined by Issue Specifications and must conform to this Technical Design.

Unit Tests:

- create valid MarketData.
- reject invalid MarketData.
- reject missing fields.
- reject invalid numbers.
- verify immutability.
- verify serialization.
- verify required fields.

Future Extensions:

Possible future review candidates:

- rank.
- fullyDilutedMcap.
- change7d.
- change30d.

Any new field must satisfy:

1. Clear producer.
2. Clear consumer.
3. Long-term usefulness.
4. Does not violate single responsibility.

Review Checklist:

- [x] Scope is clear
- [x] Responsibility is clear
- [x] Ownership is defined
- [x] All fields are justified
- [x] Validation rules exist
- [x] Immutability is defined
- [x] Dependencies are defined
- [x] Acceptance criteria are complete
- [x] AI implementation is unambiguous
- [x] No future technical debt identified

Acceptance Criteria:

- AC-001: All required fields exist.
- AC-002: Object is immutable.
- AC-003: Validation passes.
- AC-004: Serialization works.
- AC-005: No intelligence fields exist.
- AC-006: No multi-timeframe fields exist.
- AC-007: No business logic exists.
- AC-008: Ownership is preserved.

Final Decision:

MarketData Contract is defined as Raw Immutable Market Data.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Foundation Domain trusted, immutable, and validated market data. |
| PRD | Foundation readiness and downstream compatibility. |
| Architecture | MarketData Contract responsibility and Foundation dependency rules. |
| Product Map | MarketData Contract module ownership and capability mapping. |
| ADR | Single Source of Truth, Specification Driven Development, Modular Architecture. |

---

## 19. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- Roadmap
- Backlog
- TD-000 Provider Framework
- TD-004 Data Service
- TD-001 MarketData

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Normalized TD-001 MarketData into current Technical Design Template structure while preserving existing technical content. |
