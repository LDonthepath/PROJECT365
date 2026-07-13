# TD-002
# Health Layer

Version: 1.0
Status: Ready to Freeze

---

# 1. Purpose

Define the Health Layer responsible for evaluating the validity and freshness of MarketData before it is consumed by downstream components.

The Health Layer acts as the quality gate of the Foundation Domain.

---

# 2. Goals

- Validate MarketData.
- Detect stale data.
- Detect invalid data.
- Expose health status.
- Prevent downstream components from consuming corrupted data.
- Provide a standardized health contract.

---

# 3. Non Goals

This specification does not define:

- Market analysis
- Delta calculations
- Regime calculations
- Portfolio decisions
- Data fetching
- Snapshot storage
- Dashboard logic
- Historical analytics

---

# 4. Responsibility

Health Layer has one responsibility:

Evaluate the health state of MarketData.

Health Layer does NOT:

- mutate MarketData;
- create snapshots;
- calculate deltas;
- determine market regime;
- fetch market data;
- persist data.

---

# 5. Inputs

Input:

- MarketData Contract

---

# 6. Consumers

- Snapshot Engine
- Delta Engine
- Regime Engine
- LDS Engine
- Capital Flow Engine
- OMS Engine

---

# 7. Health States

## FRESH

MarketData is valid and within TTL.

---

## STALE

MarketData is valid but exceeds TTL.

---

## INVALID

MarketData violates contract validation rules.

---

# 8. Health Status Contract

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

---

# 9. Health Status Examples

## FRESH

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

---

## STALE

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

---

## INVALID

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

---

# 10. TTL Configuration

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

---

# 11. Validation Rules

## INVALID Conditions

- MarketData is null.
- MarketData is undefined.
- Contract validation fails.
- Required field missing.
- fetchedAt is invalid.

---

## STALE Condition

```text
currentTimestamp - fetchedAt > TTL
```

---

## FRESH Condition

```text
MarketData is valid
AND
age <= TTL
```

---

# 12. Lifecycle

Receive MarketData
↓
Validate Contract
↓
Calculate Age
↓
Determine Health State
↓
Return Health Status

---

# 13. Public API

## validate()

Input:

```typescript
validate(marketData)
```

Output:

```typescript
HealthStatus
```

---

## getStatus()

Output:

```typescript
{
  ttlMs: 300000,
  ttlSec: 300,
  ttlMinutes: 5
}
```

---

# 14. Invariants

Health Layer:

- never modifies MarketData;
- never creates snapshots;
- never performs calculations outside health evaluation;
- never accesses storage;
- never performs network operations.

---

# 15. Dependencies

Depends only on:

- MarketData Contract

No other dependencies are allowed.

---

# 16. AI Implementation Constraints

- Pure validation logic.
- Immutable output.
- No side effects.
- No network calls.
- No storage access.
- No framework dependency.
- No business logic.
- No intelligence calculations.

---

# 17. Acceptance Criteria

## AC-001
Valid MarketData returns FRESH.

## AC-002
Expired MarketData returns STALE.

## AC-003
Invalid MarketData returns INVALID.

## AC-004
HealthStatus contains all required fields.

## AC-005
MarketData remains unchanged.

## AC-006
TTL configuration is exposed.

## AC-007
HealthStatus output is immutable.

---

# 18. Unit Tests

- validate fresh data
- validate stale data
- validate invalid data
- validate null
- validate undefined
- verify ttl configuration
- verify output immutability
- verify MarketData is not mutated

---

# 19. Future Extensions

Possible future additions:

- validateMany()
- custom TTL policies
- provider health monitoring
- warning state

Future additions must not violate the single responsibility of Health Layer.

---

# 20. Review Checklist

- [x] Scope is clear
- [x] Responsibility is clear
- [x] Health states are defined
- [x] TTL is defined
- [x] Validation rules exist
- [x] Dependencies are clear
- [x] Acceptance criteria are complete
- [x] AI implementation is unambiguous
- [x] No technical debt identified

---

# Final Decision

Health Layer is defined as:

MarketData Quality Gate.

Not:

- Data Service
- Snapshot Engine
- Delta Engine
- Market Intelligence Engine
- Storage Engine
