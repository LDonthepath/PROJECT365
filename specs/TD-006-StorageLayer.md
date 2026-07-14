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

## 17A. Implementation Specification

This section increases implementation precision for the existing Storage Layer design without changing responsibilities, dependency direction, runtime flow, or ownership.

### Stored Object Contract

| Field | Type | Required | Rule |
|---|---|---:|---|
| id | string | Yes | Immutable object identity. |
| objectType | string | Yes | `MarketData` or `Snapshot`. |
| timestamp | number | Yes | Object timestamp in Unix epoch milliseconds. |
| payload | object | Yes | Immutable MarketData or Snapshot. |
| storedAt | number | Yes | Unix epoch milliseconds when persisted. |
| archived | boolean | Yes | True only after archive transition. |
| contractVersion | string | Yes | Payload contract version. |

### Return Metadata

| Field | Type | Required | Rule |
|---|---|---:|---|
| requestId | string | Yes | Caller correlation value. |
| objectType | string | No | Present when request targets a type. |
| count | number | Yes | Number of records returned or affected. |
| page | number | No | Present for paginated find results. |
| pageSize | number | No | Present for paginated find results. |
| hasNextPage | boolean | No | Present for paginated find results. |
| orderedBy | string | No | Field used for ordering. |
| orderDirection | string | No | `asc` or `desc`. |

### Callable Public Interface

| Method | Input | Output | Responsibility Boundary |
|---|---|---|---|
| save(request) | SaveRequest | SaveResult or StorageError | Persist immutable MarketData or Snapshot. |
| load(request) | LoadRequest | LoadResult or NotFound or StorageError | Retrieve by identity. |
| exists(request) | ExistsRequest | ExistsResult or StorageError | Determine whether identity exists. |
| delete(request) | DeleteRequest | DeleteResult or NotFound or StorageError | Archive, not physically mutate historical payload. |
| find(request) | FindRequest | FindResult or StorageError | Retrieve by criteria. |
| findRange(request) | FindRangeRequest | FindResult or StorageError | Retrieve objects in timestamp range. |

### Input Schemas

#### SaveRequest

| Field | Type | Required | Rule |
|---|---|---:|---|
| requestId | string | Yes | Non-empty correlation value. |
| objectType | string | Yes | `MarketData` or `Snapshot`. |
| payload | object | Yes | Complete TD-001 MarketData or TD-003 Snapshot. |
| timestamp | number | Yes | Payload timestamp. |

#### LoadRequest / ExistsRequest / DeleteRequest

| Field | Type | Required | Rule |
|---|---|---:|---|
| requestId | string | Yes | Non-empty correlation value. |
| objectType | string | Yes | `MarketData` or `Snapshot`. |
| id | string | Yes | Object identity. |

#### FindRequest

| Field | Type | Required | Rule |
|---|---|---:|---|
| requestId | string | Yes | Non-empty correlation value. |
| objectType | string | Yes | `MarketData` or `Snapshot`. |
| id | string | No | Optional identity lookup. |
| timestamp | number | No | Optional exact timestamp lookup. |
| page | number | No | Defaults to 1; must be greater than 0. |
| pageSize | number | No | Defaults to 50; must be between 1 and 500. |
| orderBy | string | No | Defaults to `timestamp`. |
| orderDirection | string | No | Defaults to `asc`; must be `asc` or `desc`. |
| includeArchived | boolean | No | Defaults to false. |

#### FindRangeRequest

| Field | Type | Required | Rule |
|---|---|---:|---|
| requestId | string | Yes | Non-empty correlation value. |
| objectType | string | Yes | `MarketData` or `Snapshot`. |
| fromTimestamp | number | Yes | Inclusive range start. |
| toTimestamp | number | Yes | Inclusive range end; must be >= fromTimestamp. |
| page | number | No | Defaults to 1; must be greater than 0. |
| pageSize | number | No | Defaults to 50; must be between 1 and 500. |
| orderDirection | string | No | Defaults to `asc`; must be `asc` or `desc`. |
| includeArchived | boolean | No | Defaults to false. |

### Output Schemas

| Result | Fields |
|---|---|
| SaveResult | `ok: true`, `id`, `objectType`, `storedAt`, `metadata` |
| LoadResult | `ok: true`, `record`, `metadata` |
| ExistsResult | `ok: true`, `exists`, `metadata` |
| DeleteResult | `ok: true`, `id`, `archived: true`, `metadata` |
| FindResult | `ok: true`, `records`, `metadata` |
| NotFound | `ok: false`, `errorCode: NOT_FOUND`, `requestId`, `objectType`, `id` or lookup criteria, `metadata` |
| StorageError | `ok: false`, `errorCode`, `errorMessage`, `requestId`, `metadata` |

### Error Schema

Approved error codes:

- `INVALID_REQUEST`
- `UNSUPPORTED_OBJECT_TYPE`
- `INVALID_OBJECT_CONTRACT`
- `MISSING_OBJECT_IDENTITY`
- `DUPLICATE_IDENTITY`
- `IDENTITY_CONFLICT`
- `NOT_FOUND`
- `IMMUTABILITY_VIOLATION`
- `INVALID_RANGE`
- `INVALID_PAGINATION`
- `RETRIEVAL_UNAVAILABLE`

### Retrieval Contract

- Identity lookup uses `objectType` plus `id`.
- Timestamp lookup uses `objectType` plus exact `timestamp`.
- Range lookup uses `objectType`, `fromTimestamp`, and `toTimestamp` inclusively.
- Archived records are excluded unless `includeArchived` is true.
- Returned records must include return metadata.
- Retrieval miss must return NotFound for identity lookup and empty `records` for range/find queries with no matches.

### Ordering and Pagination

- Default ordering is ascending by timestamp.
- Descending ordering must be explicitly requested with `orderDirection: desc`.
- For equal timestamps, records must be ordered by id lexicographically.
- Default page is 1.
- Default pageSize is 50.
- Maximum pageSize is 500.
- Pagination metadata must include count, page, pageSize, and hasNextPage.

### Retention and Archive Behavior

- Storage Layer preserves historical records unchanged.
- delete() archives records instead of mutating or physically deleting payload content.
- Archived records must not appear in default retrieval results.
- Archive state is represented by `archived: true` on storage metadata, not by modifying payload.

### Duplicate and Conflict Behavior

- Saving a record with a new id succeeds.
- Saving the same id with identical objectType and identical payload returns the existing stored identity as a successful idempotent save.
- Saving the same id with different payload fails with `IDENTITY_CONFLICT`.
- Saving unsupported object type fails with `UNSUPPORTED_OBJECT_TYPE`.

### Persistence Lifecycle and State Transitions

| State | Entry Condition | Exit Condition | Output |
|---|---|---|---|
| RECEIVED | Public method receives request | Request valid or invalid | Continue or StorageError |
| VALIDATED | Request schema and object contract are valid | Operation selected | Continue |
| PERSISTED | save() stores object | Terminal | SaveResult |
| RETRIEVED | load/find/findRange returns records | Terminal | LoadResult or FindResult |
| ARCHIVED | delete() marks storage metadata archived | Terminal | DeleteResult |
| NOT_FOUND | Lookup misses | Terminal | NotFound or empty FindResult |
| REJECTED | Validation/conflict failure occurs | Terminal | StorageError |

### Implementation Readiness Checklist

- Public methods are named.
- Input, output, metadata, NotFound, and error contracts are defined.
- Identity, timestamp, range, ordering, pagination, retention, archive, duplicate, and conflict behavior are deterministic.

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
