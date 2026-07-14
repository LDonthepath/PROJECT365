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

Define the Technical Design for TD-006 Storage Layer.

Storage Layer persists immutable Foundation objects. It stores MarketData and Snapshots, supports retrieval, preserves immutability, and must never modify historical records or perform business logic.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, or implementation details.

---

## 3. Scope

This Technical Design covers Storage Layer as a Foundation component.

Included responsibilities:

- Store MarketData.
- Store Snapshots.
- Support retrieval.
- Preserve immutability.
- Preserve auditability of historical records.

Excluded responsibilities:

- Modifying historical records.
- Business logic.
- Market intelligence.
- Snapshot creation.
- Health validation.
- Provider orchestration.

---

## 4. Background

The approved Foundation architecture includes Storage Layer as the persistence component for trusted market data and immutable snapshots. Snapshot Engine creates immutable snapshots; Storage Layer persists them without changing ownership or history.

Approved dependency sequence:

```text
Snapshot Engine
↓
Storage Layer
↓
Consumers
```

Reference context is derived from BRD, PRD, Architecture, Product Map, Glossary, and ADR without duplicating or expanding those documents.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Foundation Domain includes Storage Layer and requires trusted, immutable, validated market data. |
| PRD | Foundation supports reproducible downstream intelligence from trusted data. |
| Architecture | Storage Layer persists trusted market data and immutable snapshots. |
| Product Map | Storage Layer participates in creating immutable snapshots and preserving historical market states. |
| ADR | Immutable Foundation Objects, Single Source of Truth, Auditability. |

Every technical decision in this document is traceable to approved Foundation responsibilities, dependency rules, Single Source of Truth, Separation of Concerns, Hard Gate Principle, Explainability, and Auditability.

---

## 6. Design Overview

Storage Layer is the Foundation persistence boundary for immutable Foundation objects. It stores approved MarketData and Snapshots and retrieves them for permitted consumers without modifying historical records.

Boundaries:

- Storage Layer persists objects; it does not create them.
- Storage Layer does not validate Health Status.
- Storage Layer does not calculate deltas or intelligence.
- Storage Layer does not mutate stored historical records.

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
| MarketData Store Boundary | Persist MarketData records. | MarketData | Stored immutable MarketData record | Storage Layer |
| Snapshot Store Boundary | Persist Snapshot records. | Snapshot | Stored immutable Snapshot record | Storage Layer |
| Retrieval Boundary | Return persisted Foundation objects. | Retrieval criteria | MarketData or Snapshot record | Storage Layer |
| Immutability Guard | Prevent modification of historical records. | Store or retrieval operation | Accepted or rejected operation | Storage Layer |

---

## 8. Data Model

Storage Layer does not define MarketData or Snapshot contracts.

Data contracts used:

- MarketData from TD-001.
- Snapshot from TD-003.
- Retrieval result metadata.

Lifecycle:

```text
Receive immutable Foundation object
↓
Persist object without mutation
↓
Retrieve object for permitted consumer
↓
Preserve historical record unchanged
```

---

## 9. Public Interfaces

### Store MarketData Interface

Inputs:

- MarketData.

Outputs:

- Stored immutable MarketData record or rejection reason.

Expected behavior:

- Store only complete MarketData that conforms to TD-001 ownership.

### Store Snapshot Interface

Inputs:

- Snapshot from Snapshot Engine.

Outputs:

- Stored immutable Snapshot record or rejection reason.

Expected behavior:

- Preserve Snapshot immutability and identity.

### Retrieval Interface

Inputs:

- Approved retrieval criteria.

Outputs:

- Persisted MarketData or Snapshot records.

---

## 10. Internal Flow

1. Snapshot Engine or approved Foundation producer provides immutable object.
2. Storage Layer verifies object type and required identity metadata.
3. Storage Layer persists the object without mutation.
4. Approved consumers request records through retrieval boundary.
5. Storage Layer returns persisted records without changing historical state.

Approved dependency direction:

```text
Snapshot Engine
↓
Storage Layer
↓
Consumers
```

---

## 11. Error Handling

Validation:

- Stored object must be MarketData or Snapshot.
- Object identity must be present.
- Historical record modification attempts must be rejected.

Failure scenarios:

- Missing object identity.
- Unsupported object type.
- Duplicate identity conflict.
- Mutation attempt against historical record.
- Retrieval target unavailable.

Recovery strategy:

- Reject invalid writes.
- Preserve existing historical records.
- Return retrieval miss without fabricating data.
- Preserve rejection reason for auditability.

---

## 12. Non-Functional Considerations

Performance:

- Retrieval should support downstream historical analysis without requiring mutation.

Reliability:

- Stored immutable records must remain reproducible.

Maintainability:

- Persistence behavior must remain independent from intelligence logic.

Testability:

- Store, retrieve, immutability rejection, and retrieval miss behavior must be measurable.

Security:

- Stored Foundation objects must be accessible only through approved retrieval boundaries.

Auditability:

- Historical records must remain inspectable and reproducible.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- ADR.
- TD-001 MarketData Contract.
- TD-003 Snapshot Engine.

Downstream consumers:

- Market Intelligence consumers.
- Governance auditability consumers.
- Presentation Historical Explorer through approved downstream paths.

Approved dependency chain:

```text
Snapshot Engine
→ Storage Layer
→ Consumers
```

---

## 14. Assumptions

- Snapshot Engine owns snapshot creation.
- MarketData Contract owns MarketData structure.
- Storage Layer stores approved immutable Foundation objects only.

---

## 15. Constraints

- Storage Layer must preserve immutability.
- Storage Layer must never modify historical records.
- Storage Layer must never perform business logic.
- Storage Layer must not calculate market intelligence.
- Storage Layer must not redefine MarketData or Snapshot.

---

## 16. Out of Scope

This Technical Design does not cover:

- Database technology.
- Cache implementation.
- Snapshot creation.
- Health validation.
- Provider orchestration.
- Market deltas.
- Regime calculations.
- Portfolio decisions.

---

## 17. Implementation Notes

Implementation guidance:

- Keep storage behavior limited to immutable persistence and retrieval.
- Keep contract definitions in TD-001 and TD-003.
- Keep downstream consumers from mutating stored records.

Acceptance Criteria:

- Storage Layer defines upstream Snapshot Engine and MarketData dependencies.
- Storage Layer defines downstream consumers.
- Storage Layer stores MarketData and Snapshots.
- Storage Layer rejects historical modification attempts.
- Storage Layer explicitly excludes business logic and market intelligence calculations.
- All responsibilities trace to approved governance documents.

No source code, implementation algorithm, storage technology, transport technology, or issue-level task breakdown is defined by this Technical Design.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Foundation Storage Layer and auditability constraints. |
| PRD | Reproducible Foundation data for downstream intelligence. |
| Architecture | Storage Layer responsibility and Foundation Single Source of Truth. |
| Product Map | Storage Layer capability mapping for snapshots and historical market states. |
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
| 1.0 | 2026-07-14 | Initial TD-006 Storage Layer Technical Design |
