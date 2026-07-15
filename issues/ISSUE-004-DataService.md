# Issue Specification

## 1. Document Information

| Field | Value |
|------|------|
| Issue ID | ISSUE-004 |
| Title | Data Service Implementation |
| Status | Completed |
| Priority | High |
| Owner | PROJECT365 Delivery |
| Milestone | Foundation Implementation |
| Sprint | TBD |
| Last Updated | 2026-07-15 |
| Depends On | TD-004 |
| Referenced By | AC-004, Implementation Prompt, Pull Request |

---

## 2. Purpose

Define the concrete implementation work for Data Service derived from exactly one Technical Design: TD-004.

This issue does not change architecture, ownership, dependency direction, runtime flow, or module responsibility.

---

## 3. Scope

Included:

- Implement Data Service responsibility: orchestrate Provider Framework output into MarketData.
- Implement only the public interfaces listed in this issue.
- Implement only the data contracts, validation rules, errors, and edge cases enumerated below.
- Add deterministic tests that prove AC-004 pass/fail criteria.

Excluded:

- Architecture changes.
- New module responsibilities.
- New dependency direction.
- Source behavior outside TD-004.
- Business logic not owned by Data Service.

---

## 4. Traceability

| Implementation Area | TD Requirement |
|---|---|
| Module responsibility | TD-004 Design Overview |
| Public interfaces | TD-004 Public Interfaces |
| Data contract | TD-004 Data Model |
| Validation and rejection | TD-004 Error Handling |
| Lifecycle | TD-004 Internal Flow and Implementation Specification where present |
| Dependencies | TD-004 Dependencies |

Every item below maps to TD-004 only.

---

## 5. Implementation Breakdown

### Step-by-Step Tasks

| ID | Task | TD Mapping | Status |
|----|------|------------|--------|
| TASK-001 | Build `produceMarketData(request)` exactly as the public interface for Data Service. | TD-004 public interface | Completed |
| TASK-002 | Build `normalizeProviderResult(providerResult)` exactly as the public interface for Data Service. | TD-004 public interface | Completed |
| TASK-003 | Build `mapToMarketData(normalizedValues)` exactly as the public interface for Data Service. | TD-004 public interface | Completed |
| TASK-010 | Implement the data contract fields listed in the Data Contract Checklist. | TD-004 Data Model | Completed |
| TASK-011 | Implement the validation sequence listed in the Validation Checklist. | TD-004 Error Handling | Completed |
| TASK-012 | Implement the error outcomes listed in the Error Handling Checklist. | TD-004 Error Handling | Completed |
| TASK-013 | Implement edge-case behavior listed in the Edge Cases section. | TD-004 boundaries and constraints | Completed |
| TASK-014 | Add tests or checks for every AC-004 criterion. | AC-004 | Completed |

### Public Interface Checklist

- [x] `produceMarketData(request)` exists and returns only approved outputs.
- [x] `normalizeProviderResult(providerResult)` exists and returns only approved outputs.
- [x] `mapToMarketData(normalizedValues)` exists and returns only approved outputs.

### Data Contract Checklist

- `requestId`
- `providerId`
- `assetId`
- `requestedAt`
- `timeoutMs`
- `maxRetries`
- `ok`
- `marketData`
- `errorCode`
- `attempts`

### Validation Checklist

- DataServiceRequest required fields are present.
- unsupported provider rejected before provider access.
- ProviderResult source attribution is present.
- ProviderResult maps to all 19 TD-001 fields.
- numeric strings are rejected.
- partial MarketData is never created.
- timeout uses 10000ms default.
- default retry count is 1.

### Error Handling Checklist

- INVALID_REQUEST.
- UNSUPPORTED_PROVIDER.
- PROVIDER_UNAVAILABLE.
- PROVIDER_TIMEOUT.
- PROVIDER_RATE_LIMITED.
- PROVIDER_MALFORMED_RESPONSE.
- MISSING_MARKETDATA_FIELD.
- INVALID_MARKETDATA_FIELD.
- NORMALIZATION_FAILED.

### Edge Cases

- unsupported provider attempts equals 0.
- timeout retried until budget exhausted.
- rate limit retried only within budget.
- malformed response not retried.
- missing required field returns missingFields.

---

## 6. Dependencies

- TD-004 Technical Design: `../specs/TD-004-DataService.md`.
- AC-004 Acceptance Criteria.
- BRD, PRD, Architecture, Product Map, Glossary, ADR, Roadmap, Backlog, and Current Status as upstream governance references.

---

## 7. Completion Evidence

Implementation review must provide:

- A checklist showing every public interface implemented.
- A checklist showing every data contract field implemented or rejected as required.
- Test evidence for every validation rule.
- Test evidence for every error outcome.
- Test evidence for every edge case.
- Traceability evidence from TD-004 to ISSUE-004 to AC-004.

---

## 8. Definition of Done

ISSUE-004 is done only when:

- Every task in this issue is complete.
- Every public interface checklist item is satisfied.
- Every data contract checklist item is satisfied.
- Every validation checklist item has a passing test or deterministic verification.
- Every error handling checklist item has a passing negative test.
- Every edge case has a passing test.
- AC-004 reports PASS for every criterion.
- No architecture, responsibility, dependency direction, or runtime flow change is introduced.

---

## 9. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- TD-004 Technical Design: `../specs/TD-004-DataService.md`
- AC-004: `../acceptance-criteria/AC-004-DataService.md`

---

## 10. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Issue Specification. |
| 1.1 | 2026-07-14 | Refined into implementation-ready specification with concrete tasks, checklists, edge cases, and Definition of Done. |
| 1.2 | 2026-07-15 | Marked ISSUE-004 implementation tasks, interface checklist, and completion evidence complete. |
