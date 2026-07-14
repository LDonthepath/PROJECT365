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

Define the Technical Design for TD-003 Snapshot Engine.

Define the Snapshot Engine responsible for creating and managing immutable market snapshots.

A Snapshot represents one market state at one specific reference time.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, user interface implementation, frontend framework, APIs, or implementation details.

---

## 3. Scope

This Technical Design covers Snapshot Engine as a Foundation component.

Goals:

- Create immutable snapshots.
- Preserve historical market states.
- Provide reproducible analysis.
- Support historical comparisons.
- Provide anchor snapshots.
- Become the foundation for Delta Engine.

Non Goals:

This specification does not define:

- Market analysis.
- Regime calculations.
- Portfolio decisions.
- Dashboard logic.
- Market predictions.
- Delta calculations.

---

## 4. Background

PROJECT365 is approved as an Adaptive Crypto Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform. The approved architecture places Snapshot Engine in the Foundation Domain to create immutable snapshots for reproducible historical analysis.

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

Snapshot Engine preserves Single Source of Truth, Separation of Concerns, Explainability, Auditability, and approved dependency direction.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Foundation Domain provides trusted, immutable, and validated market data. |
| PRD | Foundation readiness includes immutable snapshots for reproducibility. |
| Architecture | Snapshot Engine creates immutable snapshots for reproducible historical analysis. |
| Product Map | Snapshot Engine is a Foundation module supporting snapshot capabilities. |
| ADR | Single Source of Truth, Modular Architecture, Specification Driven Development, and Documentation-First Workflow. |

Every technical decision in this document is traceable to approved Foundation responsibilities and dependency rules.

---

## 6. Design Overview

Snapshot Engine has one responsibility:

Create and manage immutable snapshots of market state.

Snapshot Engine does NOT:

- calculate deltas;
- determine market regime;
- determine exposure;
- fetch data;
- modify snapshots.

Snapshot Philosophy:

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

Lifecycle:

```text
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
```

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Input Boundary | Accept MarketData Contract and Health Status. | MarketData Contract; Health Status | Accepted input set or rejection reason | Snapshot Engine |
| Snapshot Creation Boundary | Create immutable Snapshot. | MarketData Contract; Health Status | Snapshot | Snapshot Engine |
| Snapshot State Boundary | Manage Current, Previous, Historical, and Anchor Snapshots. | Snapshot | Snapshot references | Snapshot Engine |
| Immutability Boundary | Prevent mutation of snapshot state. | Created Snapshot | Frozen Snapshot | Snapshot Engine |
| Consumer Boundary | Provide snapshots to approved consumers. | Snapshot request | Snapshot | Snapshot Engine |

Inputs:

- MarketData Contract.
- Health Status.

Consumers:

- Delta Engine.
- Regime Engine.
- LDS Engine.
- Capital Flow Engine.
- OMS Engine.
- Historical Explorer.

---

## 8. Data Model

Snapshot Contract:

```typescript
{
  id: string,
  timestamp: number,
  marketData: MarketData,
  healthStatus: HealthStatus,
  metadata: SnapshotMetadata
}
```

Snapshot Metadata:

```typescript
{
  version: string,
  source: string,
  type: SnapshotType
}
```

Snapshot Types:

### Working

Temporary snapshot.

### Historical

Stored historical snapshot.

### Live

Most recent market state.

### Active

Current snapshot used by the system.

### Archived

Old snapshot retained for history.

### Invalid

Snapshot with invalid state.

### Expired

Snapshot exceeding retention rules.

Snapshot Invariants:

A Snapshot must:

- have unique identity;
- have timestamp;
- contain MarketData;
- contain HealthStatus;
- be immutable;
- be serializable;
- be reproducible.

Immutability Rules:

After creation:

- fields cannot change;
- fields cannot be added;
- fields cannot be removed.

Recommended implementation:

```javascript
Object.freeze()
```

Snapshot Identity:

Each snapshot must contain:

```typescript
id: string
timestamp: number
```

Identity must be unique.

Snapshot Storage Responsibility:

Snapshot Engine owns:

- Current Snapshot.
- Previous Snapshot.
- Historical Snapshots.
- Anchor Snapshots.

No other component may mutate snapshot state.

Anchor Snapshots:

Supported anchors:

- Monthly.
- Weekly.
- Daily.
- Asia.
- London.
- NewYork.
- London Kill Zone.
- NewYork Kill Zone.
- M5.
- M15.
- H1.
- H4.

Anchor snapshots are immutable.

Snapshot Categories:

### Closed Snapshot

Historical immutable snapshot.

### Live Snapshot

Current active market state.

Delta Compatibility:

The system supports two delta concepts:

### Historical Delta

```text
Closed Snapshot
↓
Closed Snapshot
```

### Real-Time Delta

```text
Closed Snapshot
↓
Live Snapshot
```

Snapshot Engine does not calculate these deltas.

It only provides snapshots.

---

## 9. Public Interfaces

### create()

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

### getCurrent()

Returns:

```typescript
Snapshot
```

### getPrevious()

Returns:

```typescript
Snapshot
```

### getAnchor()

Returns:

```typescript
Snapshot
```

Expected behavior:

- Create and return immutable snapshots.
- Return current, previous, or anchor snapshots without mutation.
- Preserve Snapshot Engine ownership of snapshot state.

---

## 10. Internal Flow

1. Receive MarketData Contract and Health Status.
2. Validate Health Status.
3. Create Snapshot.
4. Assign unique identity and timestamp.
5. Attach Snapshot Metadata.
6. Freeze Snapshot.
7. Store or expose Snapshot according to approved ownership.
8. Maintain Current, Previous, Historical, and Anchor Snapshot references.
9. Provide snapshots to approved consumers.

---

## 11. Error Handling

Failure scenarios:

- Missing MarketData Contract.
- Missing Health Status.
- Invalid Health Status.
- Missing required Snapshot fields.
- Duplicate or invalid Snapshot identity.
- Snapshot mutation attempt.

Recovery strategy:

- Reject invalid inputs.
- Produce no fabricated Snapshot.
- Preserve failure context for auditability.
- Never mutate existing snapshots during failure handling.

---

## 12. Non-Functional Considerations

Immutability:

- Snapshots must be immutable after creation.

Reliability:

- Snapshot references must preserve reproducible market state.

Maintainability:

- Snapshot Engine remains independent from Delta Engine, Regime Engine, Portfolio Engine, Data Service, and Market Intelligence Engine.

Testability:

- Creation, immutability, serialization, unique identity, current snapshot, previous snapshot, anchor snapshots, and historical reproducibility must be verifiable.

Explainability:

- Snapshot metadata preserves source, version, and type context.

Auditability:

- Snapshots support reproducible historical analysis through immutable state.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- ADR.
- TD-001 MarketData.
- TD-002 Health Layer.

Depends on:

- MarketData Contract.
- Health Layer.

No additional dependencies allowed.

Downstream consumers:

- Delta Engine.
- Regime Engine.
- LDS Engine.
- Capital Flow Engine.
- OMS Engine.
- Historical Explorer.

---

## 14. Assumptions

- MarketData and Health Status exist before Snapshot creation.
- Snapshot identity can be generated without changing architecture.
- Approved terminology from the Glossary is authoritative.
- No implementation detail is required to define this Technical Design.

---

## 15. Constraints

AI Implementation Constraints:

- Immutable snapshots.
- No business logic.
- No intelligence calculations.
- No regime calculations.
- No network access.
- No framework dependency.
- No mutation of stored snapshots.

---

## 16. Out of Scope

Snapshot Engine is not:

- Delta Engine.
- Regime Engine.
- Portfolio Engine.
- Data Service.
- Market Intelligence Engine.

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

- create snapshot.
- verify immutability.
- verify serialization.
- verify unique identity.
- verify current snapshot.
- verify previous snapshot.
- verify anchor snapshots.
- verify historical reproducibility.

Future Extensions:

Possible future additions:

- snapshot compression.
- retention policies.
- snapshot indexing.
- snapshot export.
- snapshot replay.

Review Checklist:

- [x] Scope is clear
- [x] Responsibility is clear
- [x] Lifecycle is defined
- [x] Snapshot contract is complete
- [x] Anchors are defined
- [x] Delta compatibility is defined
- [x] Dependencies are clear
- [x] Acceptance criteria are complete
- [x] AI implementation is unambiguous

Acceptance Criteria:

- AC-001: Snapshot can be created.
- AC-002: Snapshot is immutable.
- AC-003: Snapshot is serializable.
- AC-004: Snapshot identity is unique.
- AC-005: Current and Previous snapshots are maintained.
- AC-006: Anchor snapshots are supported.
- AC-007: Historical snapshots are reproducible.
- AC-008: Snapshot ownership is preserved.

Final Decision:

Snapshot Engine is defined as Immutable Market State Manager.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Foundation Domain trusted, immutable, and validated market data. |
| PRD | Foundation readiness and reproducible historical analysis. |
| Architecture | Snapshot Engine responsibility and Foundation dependency rules. |
| Product Map | Snapshot Engine module ownership and capability mapping. |
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
- TD-003 Snapshot Engine

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Normalized TD-003 Snapshot Engine into current Technical Design Template structure while preserving existing interfaces and design decisions. |
