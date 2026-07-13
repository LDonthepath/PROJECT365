# TD-001
# MarketData Contract

Version: 0.1
Status: Draft

---

# 1. Purpose

Define the immutable market data contract used throughout PROJECT365.

MarketData is the Single Source of Truth for market information.

---

# 2. Goals

- Standardize market data structure.
- Provide immutable data objects.
- Ensure downstream compatibility.
- Minimize breaking changes.

---

# 3. Non Goals

This specification does not define:

- Market analysis
- Regime calculations
- Portfolio decisions
- UI requirements

---

# 4. Design Principles

- Immutable
- Serializable
- Backward Compatible
- Explainable
- Provider Agnostic

---

# 5. Ownership

Producer:
- Data Service

Consumers:
- Health Layer
- Snapshot Engine
- Delta Engine
- All Intelligence Engines

---

# 6. Lifecycle

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

# 7. Required Fields

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

# 8. Optional Fields

None.

---

# 9. Invariants

MarketData must:

- contain all required fields;
- be immutable;
- be serializable;
- have no calculated intelligence;
- contain no UI information.

---

# 10. Immutability Rules

After creation:

- fields cannot be modified;
- fields cannot be added;
- fields cannot be removed.

Implementation recommendation:

Object.freeze()

---

# 11. Validation Rules

priceUsd >= 0

marketCapUsd >= 0

volume24hUsd >= 0

fetchedAt > 0

contractVersion != ""

symbol != ""

name != ""

---

# 12. Versioning

Current Version:

0.1

Breaking changes require:

- new version
- migration documentation

---

# 13. Acceptance Criteria

AC-001
All required fields exist.

AC-002
Object is immutable.

AC-003
Validation passes.

AC-004
Serialization works.

AC-005
No intelligence fields exist.

---

# 14. Tests

- create valid MarketData
- reject invalid MarketData
- verify immutability
- verify serialization
- verify required fields

---

# 15. Dependencies

None.

---

# 16. Future Extensions

Review candidates:

- rank
- change7d
- change30d
- fullyDilutedMcap
