# TD-001
# MarketData Contract

Version: 1.0
Status: Frozen

---

# 1. Purpose

Define the immutable market data contract used throughout PROJECT365.

MarketData is the Single Source of Truth for market information and represents a single market state at one fetch point in time.

---

# 2. Goals

- Standardize market data structure.
- Provide immutable market objects.
- Ensure downstream compatibility.
- Minimize breaking changes.
- Decouple data acquisition from intelligence calculations.

---

# 3. Non Goals

This specification does not define:

- Market analysis
- Regime calculations
- Portfolio decisions
- Multi-timeframe analytics
- UI requirements
- Storage implementation
- Network implementation

---

# 4. Design Principles

The MarketData contract must be:

- Immutable
- Serializable
- Backward Compatible
- Explainable
- Provider Agnostic
- Framework Independent
- Easy to Validate

---

# 5. Responsibility

MarketData has one responsibility only:

Represent raw market data at a specific point in time.

MarketData is NOT responsible for:

- Historical calculations
- Multi-timeframe analytics
- Market intelligence
- Regime analysis
- Exposure recommendations
- Portfolio decisions

---

# 6. Ownership

## Producer

- Data Service

## Consumers

- Health Layer
- Snapshot Engine
- Delta Engine
- Regime Engine
- LDS Engine
- Capital Flow Engine
- OMS Engine
- Dashboard

---

# 7. Lifecycle

Acquire
↓
Validate
↓
Create MarketData
↓
Freeze
↓
Consume

---

# 8. Required Fields

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

---

# 9. Optional Fields

None.

---

# 10. Field Classification

## Core Fields (Freeze Approved)

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

Total: 19 Fields

---

## Review Candidates

- rank
- fullyDilutedMcap
- change7d
- change30d

These fields are excluded from v1.0 and may be reconsidered in future versions.

---

## Removed Fields

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

---

# 11. Invariants

MarketData must:

- contain all required fields;
- be immutable;
- be serializable;
- contain no intelligence;
- contain no calculations;
- contain no UI information;
- contain no historical information.

---

# 12. Out Of Scope

MarketData shall not contain:

- Multi-timeframe analytics
- Derived intelligence
- Regime information
- Portfolio information
- Dashboard state
- Historical calculations
- User preferences

---

# 13. Immutability Rules

After creation:

- fields cannot be modified;
- fields cannot be added;
- fields cannot be removed.

Recommended implementation:

```javascript
Object.freeze()
```

---

# 14. Validation Rules

## Required Fields

All required fields must exist.

---

## Numeric Validation

All numeric fields must satisfy:

```javascript
Number.isFinite(value)
```

The following values are invalid:

- NaN
- Infinity
- -Infinity

---

## Business Validation

```text
priceUsd >= 0
marketCapUsd >= 0
volume24hUsd >= 0
circulatingSupply >= 0
ath >= 0
atl >= 0
fetchedAt > 0
```

---

## String Validation

```text
symbol != ""
name != ""
fetchSource != ""
contractVersion != ""
```

---

# 15. Serialization Rules

MarketData must support:

```javascript
JSON.stringify()
JSON.parse()
```

No custom serialization logic is allowed.

---

# 16. Dependencies

None.

The MarketData contract must remain independent from:

- React
- Next.js
- Database
- API Framework
- Storage Engine
- Dashboard
- External Libraries

---

# 17. AI Implementation Constraints

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

# 18. Versioning

Current Version:

```text
1.0
```

Breaking changes require:

- new version number;
- migration documentation;
- consumer impact review.

---

# 19. Acceptance Criteria

## AC-001
All required fields exist.

## AC-002
Object is immutable.

## AC-003
Validation passes.

## AC-004
Serialization works.

## AC-005
No intelligence fields exist.

## AC-006
No multi-timeframe fields exist.

## AC-007
No business logic exists.

## AC-008
Ownership is preserved.

---

# 20. Tests

## Unit Tests

- create valid MarketData
- reject invalid MarketData
- reject missing fields
- reject invalid numbers
- verify immutability
- verify serialization
- verify required fields

---

# 21. Future Extensions

Possible future review candidates:

- rank
- fullyDilutedMcap
- change7d
- change30d

Any new field must satisfy:

1. Clear producer.
2. Clear consumer.
3. Long-term usefulness.
4. Does not violate single responsibility.

---

# 22. Review Checklist

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

---

# Final Decision

MarketData Contract is defined as:

Raw Immutable Market Data.

Not:

- Market Intelligence
- Multi-Timeframe Analytics
- Historical Engine
- Portfolio Engine
- Decision Engine
