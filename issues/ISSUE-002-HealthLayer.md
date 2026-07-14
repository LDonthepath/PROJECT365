# Issue Specification

## 1. Document Information

| Field | Value |
|------|------|
| Issue ID | ISSUE-002 |
| Title | Health Layer Implementation |
| Status | Planned |
| Priority | High |
| Owner | PROJECT365 Delivery |
| Milestone | Foundation Implementation |
| Sprint | TBD |
| Last Updated | 2026-07-14 |
| Depends On | TD-002 |
| Referenced By | AC-002, Implementation Prompt, Pull Request |

---

## 2. Purpose

Define the concrete implementation work for Health Layer derived from exactly one Technical Design: TD-002.

This issue does not change architecture, ownership, dependency direction, runtime flow, or module responsibility.

---

## 3. Scope

Included:

- Implement Health Layer responsibility: evaluate the health state of MarketData.
- Implement only the public interfaces listed in this issue.
- Implement only the data contracts, validation rules, errors, and edge cases enumerated below.
- Add deterministic tests that prove AC-002 pass/fail criteria.

Excluded:

- Architecture changes.
- New module responsibilities.
- New dependency direction.
- Source behavior outside TD-002.
- Business logic not owned by Health Layer.

---

## 4. Traceability

| Implementation Area | TD Requirement |
|---|---|
| Module responsibility | TD-002 Design Overview |
| Public interfaces | TD-002 Public Interfaces |
| Data contract | TD-002 Data Model |
| Validation and rejection | TD-002 Error Handling |
| Lifecycle | TD-002 Internal Flow and Implementation Specification where present |
| Dependencies | TD-002 Dependencies |

Every item below maps to TD-002 only.

---

## 5. Implementation Breakdown

### Step-by-Step Tasks

| ID | Task | TD Mapping | Status |
|----|------|------------|--------|
| TASK-001 | Build `validate(marketData)` exactly as the public interface for Health Layer. | TD-002 public interface | Planned |
| TASK-002 | Build `getStatus()` exactly as the public interface for Health Layer. | TD-002 public interface | Planned |
| TASK-010 | Implement the data contract fields listed in the Data Contract Checklist. | TD-002 Data Model | Planned |
| TASK-011 | Implement the validation sequence listed in the Validation Checklist. | TD-002 Error Handling | Planned |
| TASK-012 | Implement the error outcomes listed in the Error Handling Checklist. | TD-002 Error Handling | Planned |
| TASK-013 | Implement edge-case behavior listed in the Edge Cases section. | TD-002 boundaries and constraints | Planned |
| TASK-014 | Add tests or checks for every AC-002 criterion. | AC-002 | Planned |

### Public Interface Checklist

- [ ] `validate(marketData)` exists and returns only approved outputs.
- [ ] `getStatus()` exists and returns only approved outputs.

### Data Contract Checklist

- `status`
- `timestamp`
- `ageMs`
- `ageMinutes`
- `ttlMs`
- `ttlMinutes`
- `isFresh`
- `isStale`
- `isInvalid`

### Validation Checklist

- MarketData contract completeness is checked.
- FRESH is returned when valid data age is within ttlMs.
- STALE is returned when valid data age exceeds ttlMs.
- INVALID is returned when MarketData violates contract rules.
- MarketData input is never mutated.
- ttlMs defaults to 300000.

### Error Handling Checklist

- invalid MarketData returns INVALID status.
- missing MarketData returns INVALID status.
- invalid fetchedAt returns INVALID status.

### Edge Cases

- exactly ttlMs old is FRESH.
- ttlMs plus 1 millisecond is STALE.
- future fetchedAt is INVALID.
- missing required MarketData field is INVALID.

---

## 6. Dependencies

- TD-002 Technical Design: `../specs/TD-002-HealthLayer.md`.
- AC-002 Acceptance Criteria.
- BRD, PRD, Architecture, Product Map, Glossary, ADR, Roadmap, Backlog, and Current Status as upstream governance references.

---

## 7. Completion Evidence

Implementation review must provide:

- A checklist showing every public interface implemented.
- A checklist showing every data contract field implemented or rejected as required.
- Test evidence for every validation rule.
- Test evidence for every error outcome.
- Test evidence for every edge case.
- Traceability evidence from TD-002 to ISSUE-002 to AC-002.

---

## 8. Definition of Done

ISSUE-002 is done only when:

- Every task in this issue is complete.
- Every public interface checklist item is satisfied.
- Every data contract checklist item is satisfied.
- Every validation checklist item has a passing test or deterministic verification.
- Every error handling checklist item has a passing negative test.
- Every edge case has a passing test.
- AC-002 reports PASS for every criterion.
- No architecture, responsibility, dependency direction, or runtime flow change is introduced.

---

## 9. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- TD-002 Technical Design: `../specs/TD-002-HealthLayer.md`
- AC-002: `../acceptance-criteria/AC-002-HealthLayer.md`

---

## 10. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Issue Specification. |
| 1.1 | 2026-07-14 | Refined into implementation-ready specification with concrete tasks, checklists, edge cases, and Definition of Done. |
