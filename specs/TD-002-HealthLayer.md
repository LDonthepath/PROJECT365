# Technical Design

## 1. Document Information

| Field | Value |
|------|------|
| Status | Ready to Freeze |
| Version | 1.0 |
| Owner | PROJECT365 Architecture |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR |
| Referenced By | Issue Specification, Acceptance Criteria, Implementation Prompt |

---

## 2. Purpose

Define the Technical Design for TD-002 Health Layer.

Define the Health Layer responsible for evaluating the validity and freshness of MarketData before it is consumed by downstream components.

The Health Layer acts as the quality gate of the Foundation Domain.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, user interface implementation, frontend framework, APIs, or implementation details.

---

## 3. Scope

This Technical Design covers Health Layer as a Foundation component.

Goals:

- Validate MarketData.
- Detect stale data.
- Detect invalid data.
- Expose health status.
- Prevent downstream components from consuming corrupted data.
- Provide a standardized health contract.

Non Goals:

This specification does not define:

- Market analysis.
- Delta calculations.
- Regime calculations.
- Portfolio decisions.
- Data fetching.
- Snapshot storage.
- Dashboard logic.
- Historical analytics.

---

## 4. Background

PROJECT365 is approved as an Adaptive Crypto Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform. The approved architecture places Health Layer in the Foundation Domain as the quality gate for MarketData readiness.

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

Health Layer preserves Single Source of Truth, Separation of Concerns, Auditability, and approved dependency direction.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Foundation Domain provides trusted, immutable, and validated market data. |
| PRD | Foundation readiness requires validation before downstream intelligence. |
| Architecture | Health Layer validates market data health and supports snapshot readiness. |
| Product Map | Health Layer is a Foundation module for validating market data. |
| ADR | Single Source of Truth, Modular Architecture, Specification Driven Development, and Documentation-First Workflow. |

Every technical decision in this document is traceable to approved Foundation responsibilities and dependency rules.

---

## 6. Design Overview

Health Layer has one responsibility:

Evaluate the health state of MarketData.

Health Layer does NOT:

- mutate MarketData;
- create snapshots;
- calculate deltas;
- determine market regime;
- fetch market data;
- persist data.

Lifecycle:

```text
Receive MarketData
↓
Validate Contract
↓
Calculate Age
↓
Determine Health State
↓
Return Health Status
```

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Input Boundary | Accept MarketData Contract only. | MarketData Contract | Accepted MarketData or rejection reason | Health Layer |
| Contract Validation Boundary | Validate MarketData contract completeness. | MarketData Contract | Valid or invalid result | Health Layer |
| Freshness Boundary | Calculate data age against TTL. | MarketData fetchedAt and TTL | Age and freshness result | Health Layer |
| Status Boundary | Produce standardized HealthStatus. | Validation and freshness result | HealthStatus | Health Layer |
| Consumer Boundary | Expose immutable HealthStatus to approved consumers. | HealthStatus request | HealthStatus | Health Layer |

Input:

- MarketData Contract.

Consumers:

- Snapshot Engine.
- Delta Engine.
- Regime Engine.
- LDS Engine.
- Capital Flow Engine.
- OMS Engine.

---

## 8. Data Model

Health States:

### FRESH

MarketData is valid and within TTL.

### STALE

MarketData is valid but exceeds TTL.

### INVALID

MarketData violates contract validation rules.

Health Status Contract:

```typescript
{
  status: "FRESH" | "STALE" | "INVALID",
  timestamp: number,
  ageMs: number,
  ageMinutes: number,
  ttlMs: number,
  ttlMinutes: number,
  isFresh: boolean,
  isStale: boolean,
  isInvalid: boolean
}
```

FRESH example:

```json
{
  "status": "FRESH",
  "timestamp": 1750000000000,
  "ageMs": 12000,
  "ageMinutes": 0.2,
  "ttlMs": 300000,
  "ttlMinutes": 5,
  "isFresh": true,
  "isStale": false,
  "isInvalid": false
}
```

STALE example:

```json
{
  "status": "STALE",
  "timestamp": 1750000000000,
  "ageMs": 420000,
  "ageMinutes": 7,
  "ttlMs": 300000,
  "ttlMinutes": 5,
  "isFresh": false,
  "isStale": true,
  "isInvalid": false
}
```

INVALID example:

```json
{
  "status": "INVALID",
  "timestamp": 1750000000000,
  "ageMs": 0,
  "ageMinutes": 0,
  "ttlMs": 300000,
  "ttlMinutes": 5,
  "isFresh": false,
  "isStale": false,
  "isInvalid": true
}
```

TTL Configuration:

```text
TTL = 300000 ms
TTL = 300 seconds
TTL = 5 minutes
```

TTL shall be configurable.

Default value:

```text
300000 ms
```

Invariants:

Health Layer:

- never modifies MarketData;
- never creates snapshots;
- never performs calculations outside health evaluation;
- never accesses storage;
- never performs network operations.

---

## 9. Public Interfaces

### validate()

Input:

```typescript
validate(marketData)
```

Output:

```typescript
HealthStatus
```

Expected behavior:

- Return FRESH for valid MarketData within TTL.
- Return STALE for valid MarketData exceeding TTL.
- Return INVALID for invalid MarketData.
- Never mutate MarketData.

### getStatus()

Output:

```typescript
{
  ttlMs: 300000,
  ttlSec: 300,
  ttlMinutes: 5
}
```

Expected behavior:

- Expose TTL configuration.

---

## 10. Internal Flow

1. Receive MarketData.
2. Validate MarketData contract.
3. Reject null or undefined input as INVALID.
4. Calculate age from current timestamp and fetchedAt.
5. Compare age to TTL.
6. Determine FRESH, STALE, or INVALID.
7. Return immutable HealthStatus.

---

## 11. Error Handling

INVALID Conditions:

- MarketData is null.
- MarketData is undefined.
- Contract validation fails.
- Required field missing.
- fetchedAt is invalid.

STALE Condition:

```text
currentTimestamp - fetchedAt > TTL
```

FRESH Condition:

```text
MarketData is valid
AND
age <= TTL
```

Invalid input must return INVALID without mutating input or fabricating MarketData.

---

## 12. Non-Functional Considerations

Immutability:

- HealthStatus output must be immutable.

Reliability:

- The same MarketData and timestamp context must produce deterministic health status.

Maintainability:

- Health Layer remains pure validation logic and does not own data fetching, storage, snapshots, or intelligence.

Testability:

- Fresh, stale, invalid, null, undefined, TTL configuration, output immutability, and non-mutation behavior must be verifiable.

Auditability:

- HealthStatus includes timestamp, age, and TTL values needed to explain readiness.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- ADR.
- TD-001 MarketData.

Depends only on:

- MarketData Contract.

No other dependencies are allowed.

Downstream consumers:

- Snapshot Engine.
- Delta Engine.
- Regime Engine.
- LDS Engine.
- Capital Flow Engine.
- OMS Engine.

---

## 14. Assumptions

- MarketData exists before Health Layer evaluation.
- TTL defaults to 300000 ms unless configured otherwise.
- Approved terminology from the Glossary is authoritative.
- No implementation detail is required to define this Technical Design.

---

## 15. Constraints

AI Implementation Constraints:

- Pure validation logic.
- Immutable output.
- No side effects.
- No network calls.
- No storage access.
- No framework dependency.
- No business logic.
- No intelligence calculations.

---

## 16. Out of Scope

Health Layer is not:

- Data Service.
- Snapshot Engine.
- Delta Engine.
- Market Intelligence Engine.
- Storage Engine.

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

- validate fresh data.
- validate stale data.
- validate invalid data.
- validate null.
- validate undefined.
- verify ttl configuration.
- verify output immutability.
- verify MarketData is not mutated.

Future Extensions:

Possible future additions:

- validateMany().
- custom TTL policies.
- provider health monitoring.
- warning state.

Future additions must not violate the single responsibility of Health Layer.

Review Checklist:

- [x] Scope is clear
- [x] Responsibility is clear
- [x] Health states are defined
- [x] TTL is defined
- [x] Validation rules exist
- [x] Dependencies are clear
- [x] Acceptance criteria are complete
- [x] AI implementation is unambiguous
- [x] No technical debt identified

Acceptance Criteria:

- AC-001: Valid MarketData returns FRESH.
- AC-002: Expired MarketData returns STALE.
- AC-003: Invalid MarketData returns INVALID.
- AC-004: HealthStatus contains all required fields.
- AC-005: MarketData remains unchanged.
- AC-006: TTL configuration is exposed.
- AC-007: HealthStatus output is immutable.

Final Decision:

Health Layer is defined as MarketData Quality Gate.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Foundation Domain trusted, immutable, and validated market data. |
| PRD | Foundation readiness and validation before downstream intelligence. |
| Architecture | Health Layer responsibility and Foundation dependency rules. |
| Product Map | Health Layer module ownership and capability mapping. |
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
- TD-001 MarketData
- TD-002 Health Layer

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Normalized TD-002 Health Layer into current Technical Design Template structure while preserving existing design decisions. |
