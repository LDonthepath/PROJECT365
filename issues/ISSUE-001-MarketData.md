# Issue Specification

## 1. Document Information

| Field | Value |
|------|------|
| Issue ID | ISSUE-001 |
| Title | MarketData Contract Implementation |
| Status | Completed |
| Priority | High |
| Owner | PROJECT365 Delivery |
| Milestone | Foundation Implementation |
| Sprint | TBD |
| Last Updated | 2026-07-14 |
| Depends On | TD-001 |
| Referenced By | AC-001, Implementation Prompt, Pull Request |

---

## 2. Purpose

Define the concrete implementation work for MarketData derived from exactly one Technical Design: TD-001.

This issue does not change architecture, ownership, dependency direction, runtime flow, or module responsibility.

---

## 3. Scope

Included:

- Implement MarketData responsibility: represent raw market data at a specific point in time.
- Implement only the public interfaces listed in this issue.
- Implement only the data contracts, validation rules, errors, and edge cases enumerated below.
- Add deterministic tests that prove AC-001 pass/fail criteria.

Excluded:

- Architecture changes.
- New module responsibilities.
- New dependency direction.
- Source behavior outside TD-001.
- Business logic not owned by MarketData.

---

## 4. Traceability

| Implementation Area | TD Requirement |
|---|---|
| Module responsibility | TD-001 Design Overview |
| Public interfaces | TD-001 Public Interfaces |
| Data contract | TD-001 Data Model |
| Validation and rejection | TD-001 Error Handling |
| Lifecycle | TD-001 Internal Flow and Implementation Specification where present |
| Dependencies | TD-001 Dependencies |

Every item below maps to TD-001 only.

---

## 5. Implementation Breakdown

### Step-by-Step Tasks

| ID | Task | TD Mapping | Status |
|----|------|------------|--------|
| TASK-001 | Build `createMarketData(candidateFields)` exactly as the public interface for MarketData. | TD-001 public interface | Completed |
| TASK-002 | Build `serializeMarketData(marketData)` exactly as the public interface for MarketData. | TD-001 public interface | Completed |
| TASK-003 | Build `deserializeMarketData(serializedMarketData)` exactly as the public interface for MarketData. | TD-001 public interface | Completed |
| TASK-010 | Implement the data contract fields listed in the Data Contract Checklist. | TD-001 Data Model | Completed |
| TASK-011 | Implement the validation sequence listed in the Validation Checklist. | TD-001 Error Handling | Completed |
| TASK-012 | Implement the error outcomes listed in the Error Handling Checklist. | TD-001 Error Handling | Completed |
| TASK-013 | Implement edge-case behavior listed in the Edge Cases section. | TD-001 boundaries and constraints | Completed |
| TASK-014 | Add tests or checks for every AC-001 criterion. | AC-001 | Completed |

### Public Interface Checklist

- [x] `createMarketData(candidateFields)` exists and returns only approved outputs.
- [x] `serializeMarketData(marketData)` exists and returns only approved outputs.
- [x] `deserializeMarketData(serializedMarketData)` exists and returns only approved outputs.

### Data Contract Checklist

- `id`
- `symbol`
- `name`
- `priceUsd`
- `change1h`
- `change24h`
- `volume24hUsd`
- `marketCapUsd`
- `totalMarketCapUsd`
- `total3MarketCap`
- `btcDominance`
- `usdtDominance`
- `usdcDominance`
- `circulatingSupply`
- `ath`
- `atl`
- `fetchedAt`
- `fetchSource`
- `contractVersion`

### Validation Checklist

- all 19 required fields are present.
- string fields are non-empty strings.
- numeric fields are finite numbers.
- dominance fields are between 0 and 100 inclusive.
- fetchedAt is a positive Unix epoch millisecond timestamp.
- contractVersion is present.
- no optional fields are accepted.
- created objects are frozen.

### Error Handling Checklist

- missing required field.
- invalid string field.
- invalid numeric field.
- invalid timestamp.
- unsupported extra field.
- mutation attempt after creation.

### Edge Cases

- null candidate rejected.
- undefined candidate rejected.
- numeric string rejected.
- NaN and Infinity rejected.
- negative market cap rejected.
- dominance below 0 or above 100 rejected.
- post-creation field addition rejected.

---

## 6. Dependencies

- TD-001 Technical Design: `../specs/TD-001-MarketData.md`.
- AC-001 Acceptance Criteria.
- BRD, PRD, Architecture, Product Map, Glossary, ADR, Roadmap, Backlog, and Current Status as upstream governance references.

---

## 7. Completion Evidence

Implementation review must provide:

- A checklist showing every public interface implemented.
- A checklist showing every data contract field implemented or rejected as required.
- Test evidence for every validation rule.
- Test evidence for every error outcome.
- Test evidence for every edge case.
- Traceability evidence from TD-001 to ISSUE-001 to AC-001.

---

## 8. Definition of Done

ISSUE-001 is done only when:

- Every task in this issue is complete.
- Every public interface checklist item is satisfied.
- Every data contract checklist item is satisfied.
- Every validation checklist item has a passing test or deterministic verification.
- Every error handling checklist item has a passing negative test.
- Every edge case has a passing test.
- AC-001 reports PASS for every criterion.
- No architecture, responsibility, dependency direction, or runtime flow change is introduced.

---

## 9. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- TD-001 Technical Design: `../specs/TD-001-MarketData.md`
- AC-001: `../acceptance-criteria/AC-001-MarketData.md`

---

## 10. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Issue Specification. |
| 1.1 | 2026-07-14 | Refined into implementation-ready specification with concrete tasks, checklists, edge cases, and Definition of Done. |
| 1.2 | 2026-07-14 | Completed ISSUE-001 implementation and validation evidence. |
