# Issue Specification

## 1. Document Information

| Field | Value |
|------|------|
| Issue ID | ISSUE-003 |
| Title | Snapshot Engine Implementation |
| Status | Planned |
| Priority | High |
| Owner | PROJECT365 Delivery |
| Milestone | Foundation Implementation |
| Sprint | TBD |
| Last Updated | 2026-07-14 |
| Depends On | TD-003 |
| Referenced By | AC-003, Implementation Prompt, Pull Request |

---

## 2. Purpose

Define the concrete implementation work for Snapshot Engine derived from exactly one Technical Design: TD-003.

This issue does not change architecture, ownership, dependency direction, runtime flow, or module responsibility.

---

## 3. Scope

Included:

- Implement Snapshot Engine responsibility: create and manage immutable snapshots of market state.
- Implement only the public interfaces listed in this issue.
- Implement only the data contracts, validation rules, errors, and edge cases enumerated below.
- Add deterministic tests that prove AC-003 pass/fail criteria.

Excluded:

- Architecture changes.
- New module responsibilities.
- New dependency direction.
- Source behavior outside TD-003.
- Business logic not owned by Snapshot Engine.

---

## 4. Traceability

| Implementation Area | TD Requirement |
|---|---|
| Module responsibility | TD-003 Design Overview |
| Public interfaces | TD-003 Public Interfaces |
| Data contract | TD-003 Data Model |
| Validation and rejection | TD-003 Error Handling |
| Lifecycle | TD-003 Internal Flow and Implementation Specification where present |
| Dependencies | TD-003 Dependencies |

Every item below maps to TD-003 only.

---

## 5. Implementation Breakdown

### Step-by-Step Tasks

| ID | Task | TD Mapping | Status |
|----|------|------------|--------|
| TASK-001 | Build `createSnapshot(marketData, healthStatus)` exactly as the public interface for Snapshot Engine. | TD-003 public interface | Planned |
| TASK-002 | Build `getCurrentSnapshot()` exactly as the public interface for Snapshot Engine. | TD-003 public interface | Planned |
| TASK-003 | Build `getPreviousSnapshot()` exactly as the public interface for Snapshot Engine. | TD-003 public interface | Planned |
| TASK-004 | Build `getHistoricalSnapshots()` exactly as the public interface for Snapshot Engine. | TD-003 public interface | Planned |
| TASK-005 | Build `getAnchorSnapshot(anchorType)` exactly as the public interface for Snapshot Engine. | TD-003 public interface | Planned |
| TASK-010 | Implement the data contract fields listed in the Data Contract Checklist. | TD-003 Data Model | Planned |
| TASK-011 | Implement the validation sequence listed in the Validation Checklist. | TD-003 Error Handling | Planned |
| TASK-012 | Implement the error outcomes listed in the Error Handling Checklist. | TD-003 Error Handling | Planned |
| TASK-013 | Implement edge-case behavior listed in the Edge Cases section. | TD-003 boundaries and constraints | Planned |
| TASK-014 | Add tests or checks for every AC-003 criterion. | AC-003 | Planned |

### Public Interface Checklist

- [ ] `createSnapshot(marketData, healthStatus)` exists and returns only approved outputs.
- [ ] `getCurrentSnapshot()` exists and returns only approved outputs.
- [ ] `getPreviousSnapshot()` exists and returns only approved outputs.
- [ ] `getHistoricalSnapshots()` exists and returns only approved outputs.
- [ ] `getAnchorSnapshot(anchorType)` exists and returns only approved outputs.

### Data Contract Checklist

- `id`
- `timestamp`
- `type`
- `marketData`
- `healthStatus`
- `contractVersion`

### Validation Checklist

- MarketData input is required.
- HealthStatus input is required.
- HealthStatus must not be INVALID.
- snapshot id is unique.
- snapshot timestamp is positive.
- snapshot is frozen.
- snapshot state transitions update current and previous references deterministically.

### Error Handling Checklist

- missing MarketData rejected.
- missing HealthStatus rejected.
- INVALID HealthStatus rejected.
- duplicate snapshot identity rejected.
- mutation attempt rejected.

### Edge Cases

- first snapshot has no previous snapshot.
- second snapshot moves first current to previous.
- unsupported anchor rejected.
- expired snapshot marked Expired without mutating payload.

---

## 6. Dependencies

- TD-003 Technical Design: `../specs/TD-003-SnapshotEngine.md`.
- AC-003 Acceptance Criteria.
- BRD, PRD, Architecture, Product Map, Glossary, ADR, Roadmap, Backlog, and Current Status as upstream governance references.

---

## 7. Completion Evidence

Implementation review must provide:

- A checklist showing every public interface implemented.
- A checklist showing every data contract field implemented or rejected as required.
- Test evidence for every validation rule.
- Test evidence for every error outcome.
- Test evidence for every edge case.
- Traceability evidence from TD-003 to ISSUE-003 to AC-003.

---

## 8. Definition of Done

ISSUE-003 is done only when:

- Every task in this issue is complete.
- Every public interface checklist item is satisfied.
- Every data contract checklist item is satisfied.
- Every validation checklist item has a passing test or deterministic verification.
- Every error handling checklist item has a passing negative test.
- Every edge case has a passing test.
- AC-003 reports PASS for every criterion.
- No architecture, responsibility, dependency direction, or runtime flow change is introduced.

---

## 9. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- TD-003 Technical Design: `../specs/TD-003-SnapshotEngine.md`
- AC-003: `../acceptance-criteria/AC-003-SnapshotEngine.md`

---

## 10. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Issue Specification. |
| 1.1 | 2026-07-14 | Refined into implementation-ready specification with concrete tasks, checklists, edge cases, and Definition of Done. |
