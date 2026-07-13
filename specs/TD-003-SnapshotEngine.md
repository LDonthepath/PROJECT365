
# TD-003
# Snapshot Engine

Version: 1.0
Status: Ready to Freeze

---

# 1. Purpose

Define the Snapshot Engine responsible for creating and managing immutable market snapshots.

A Snapshot represents one market state at one specific reference time.

---

# 2. Goals

- Create immutable snapshots.
- Preserve historical market states.
- Provide reproducible analysis.
- Support historical comparisons.
- Provide anchor snapshots.
- Become the foundation for Delta Engine.

---

# 3. Non Goals

This specification does not define:

- Market analysis
- Regime calculations
- Portfolio decisions
- Dashboard logic
- Market predictions
- Delta calculations

---

# 4. Responsibility

Snapshot Engine has one responsibility:

Create and manage immutable snapshots of market state.

Snapshot Engine does NOT:

- calculate deltas;
- determine market regime;
- determine exposure;
- fetch data;
- modify snapshots.

---

# 5. Inputs

Input:

- MarketData Contract
- Health Status

---

# 6. Consumers

- Delta Engine
- Regime Engine
- LDS Engine
- Capital Flow Engine
- OMS Engine
- Historical Explorer

---

# 7. Snapshot Philosophy

A Snapshot is:

- immutable;
- historical;
- reproducible;
- serializable;
- auditable.

A Snapshot is NOT:

- intelligence;
- prediction;
- recommendation;
- mutable state.

---

# 8. Snapshot Contract

```typescript
{
  id: string,
  timestamp: number,
  marketData: MarketData,
  healthStatus: HealthStatus,
  metadata: SnapshotMetadata
}
```

---

# 9. Snapshot Metadata

```typescript
{
  version: string,
  source: string,
  type: SnapshotType
}
```

---

# 10. Snapshot Types

## Working
Temporary snapshot.

## Historical
Stored historical snapshot.

## Live
Most recent market state.

## Active
Current snapshot used by the system.

## Archived
Old snapshot retained for history.

## Invalid
Snapshot with invalid state.

## Expired
Snapshot exceeding retention rules.

---

# 11. Snapshot Lifecycle

Acquire MarketData
↓
Validate Health
↓
Create Snapshot
↓
Freeze Snapshot
↓
Store Snapshot
↓
Consume Snapshot
↓
Archive / Replace
↓
Expire

---

# 12. Snapshot Invariants

A Snapshot must:

- have unique identity;
- have timestamp;
- contain MarketData;
- contain HealthStatus;
- be immutable;
- be serializable;
- be reproducible.

---

# 13. Immutability Rules

After creation:

- fields cannot change;
- fields cannot be added;
- fields cannot be removed.

Recommended implementation:

```javascript
Object.freeze()
```

---

# 14. Snapshot Identity

Each snapshot must contain:

```typescript
id: string
timestamp: number
```

Identity must be unique.

---

# 15. Snapshot Storage Responsibility

Snapshot Engine owns:

- Current Snapshot
- Previous Snapshot
- Historical Snapshots
- Anchor Snapshots

No other component may mutate snapshot state.

---

# 16. Anchor Snapshots

Supported anchors:

- Monthly
- Weekly
- Daily
- Asia
- London
- NewYork
- London Kill Zone
- NewYork Kill Zone
- M5
- M15
- H1
- H4

Anchor snapshots are immutable.

---

# 17. Snapshot Categories

## Closed Snapshot

Historical immutable snapshot.

---

## Live Snapshot

Current active market state.

---

# 18. Delta Compatibility

The system supports two delta concepts:

## Historical Delta

```text
Closed Snapshot
↓
Closed Snapshot
```

---

## Real-Time Delta

```text
Closed Snapshot
↓
Live Snapshot
```

Snapshot Engine does not calculate these deltas.

It only provides snapshots.

---

# 19. Public API

## create()

```typescript
create(
  marketData,
  healthStatus
)
```

Returns:

```typescript
Snapshot
```

---

## getCurrent()

Returns:

```typescript
Snapshot
```

---

## getPrevious()

Returns:

```typescript
Snapshot
```

---

## getAnchor()

Returns:

```typescript
Snapshot
```

---

# 20. Dependencies

Depends on:

- MarketData Contract
- Health Layer

No additional dependencies allowed.

---

# 21. AI Implementation Constraints

- Immutable snapshots.
- No business logic.
- No intelligence calculations.
- No regime calculations.
- No network access.
- No framework dependency.
- No mutation of stored snapshots.

---

# 22. Acceptance Criteria

## AC-001
Snapshot can be created.

## AC-002
Snapshot is immutable.

## AC-003
Snapshot is serializable.

## AC-004
Snapshot identity is unique.

## AC-005
Current and Previous snapshots are maintained.

## AC-006
Anchor snapshots are supported.

## AC-007
Historical snapshots are reproducible.

## AC-008
Snapshot ownership is preserved.

---

# 23. Unit Tests

- create snapshot
- verify immutability
- verify serialization
- verify unique identity
- verify current snapshot
- verify previous snapshot
- verify anchor snapshots
- verify historical reproducibility

---

# 24. Future Extensions

Possible future additions:

- snapshot compression
- retention policies
- snapshot indexing
- snapshot export
- snapshot replay

---

# 25. Review Checklist

- [x] Scope is clear
- [x] Responsibility is clear
- [x] Lifecycle is defined
- [x] Snapshot contract is complete
- [x] Anchors are defined
- [x] Delta compatibility is defined
- [x] Dependencies are clear
- [x] Acceptance criteria are complete
- [x] AI implementation is unambiguous

---

# Final Decision

Snapshot Engine is defined as:

Immutable Market State Manager.

Not:

- Delta Engine
- Regime Engine
- Portfolio Engine
- Data Service
- Market Intelligence Engine