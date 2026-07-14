# Acceptance Criteria

## 1. Document Information

| Field | Value |
|------|------|
| Status | Draft |
| Version | 1.1 |
| Owner | PROJECT365 Delivery |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR, TD-002, ISSUE-002 |
| Referenced By | Implementation Prompt, Review, Freeze |

---

## 2. Purpose

Define binary PASS/FAIL acceptance criteria for ISSUE-002 Health Layer Implementation against TD-002 Health Layer.

Every criterion has an expected result, verification method, pass condition, and fail condition.

---

## 3. Related Documents

| Field | Value |
|------|------|
| Technical Design ID | TD-002 |
| Technical Design Name | Health Layer |
| Technical Design Path | `../specs/TD-002-HealthLayer.md` |
| Issue ID | ISSUE-002 |
| Issue Name | Health Layer Implementation |
| Issue Specification Path | `../issues/ISSUE-002-HealthLayer.md` |

---

## 4. Binary Acceptance Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-F-001 | Health Layer exposes or validates required contract field `status` exactly as specified by TD-002. | Inspect implementation and run contract test for `status`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-002 | Health Layer exposes or validates required contract field `timestamp` exactly as specified by TD-002. | Inspect implementation and run contract test for `timestamp`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-003 | Health Layer exposes or validates required contract field `ageMs` exactly as specified by TD-002. | Inspect implementation and run contract test for `ageMs`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-004 | Health Layer exposes or validates required contract field `ageMinutes` exactly as specified by TD-002. | Inspect implementation and run contract test for `ageMinutes`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-005 | Health Layer exposes or validates required contract field `ttlMs` exactly as specified by TD-002. | Inspect implementation and run contract test for `ttlMs`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-006 | Health Layer exposes or validates required contract field `ttlMinutes` exactly as specified by TD-002. | Inspect implementation and run contract test for `ttlMinutes`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-007 | Health Layer exposes or validates required contract field `isFresh` exactly as specified by TD-002. | Inspect implementation and run contract test for `isFresh`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-008 | Health Layer exposes or validates required contract field `isStale` exactly as specified by TD-002. | Inspect implementation and run contract test for `isStale`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-009 | Health Layer exposes or validates required contract field `isInvalid` exactly as specified by TD-002. | Inspect implementation and run contract test for `isInvalid`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-010 | Public interface `validate(marketData)` is available and returns only approved success or failure outputs. | Run unit test invoking `validate(marketData)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-011 | Public interface `getStatus()` is available and returns only approved success or failure outputs. | Run unit test invoking `getStatus()`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-V-012 | MarketData contract completeness is checked | Run validation test for: MarketData contract completeness is checked | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-013 | FRESH is returned when valid data age is within ttlMs | Run validation test for: FRESH is returned when valid data age is within ttlMs | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-014 | STALE is returned when valid data age exceeds ttlMs | Run validation test for: STALE is returned when valid data age exceeds ttlMs | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-015 | INVALID is returned when MarketData violates contract rules | Run validation test for: INVALID is returned when MarketData violates contract rules | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-016 | MarketData input is never mutated | Run validation test for: MarketData input is never mutated | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-017 | ttlMs defaults to 300000 | Run validation test for: ttlMs defaults to 300000 | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-E-018 | Error condition `invalid MarketData returns INVALID status` is handled with the approved rejection behavior. | Run negative test for `invalid MarketData returns INVALID status`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-019 | Error condition `missing MarketData returns INVALID status` is handled with the approved rejection behavior. | Run negative test for `missing MarketData returns INVALID status`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-020 | Error condition `invalid fetchedAt returns INVALID status` is handled with the approved rejection behavior. | Run negative test for `invalid fetchedAt returns INVALID status`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-B-021 | exactly ttlMs old is FRESH | Run boundary/edge test for: exactly ttlMs old is FRESH | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-022 | ttlMs plus 1 millisecond is STALE | Run boundary/edge test for: ttlMs plus 1 millisecond is STALE | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-023 | future fetchedAt is INVALID | Run boundary/edge test for: future fetchedAt is INVALID | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-024 | missing required MarketData field is INVALID | Run boundary/edge test for: missing required MarketData field is INVALID | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |

---

## 5. Architecture Preservation Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-AP-001 | No architecture document is modified by implementation. | Review changed files. | No architecture/governance change appears in implementation PR. | Architecture or governance is changed without approval. |
| AC-AP-002 | No dependency direction changes are introduced. | Review imports, module references, and tests. | Dependencies match TD-002 and Architecture. | Any reverse or unapproved dependency exists. |
| AC-AP-003 | No responsibility from another module is implemented here. | Review implementation ownership. | Code remains limited to Health Layer. | Code duplicates another module responsibility. |
| AC-AP-004 | Runtime flow remains the flow approved by TD-002. | Review call sequence tests. | Flow matches TD-002. | Flow adds unapproved step or bypass. |

---

## 6. Overall Acceptance Rule

AC-002 passes only when every criterion in Sections 4 and 5 passes. Any single failed criterion makes AC-002 fail.

---

## 7. Traceability

| Acceptance Area | Source |
|-----------------|--------|
| Business intent | BRD |
| Product requirements | PRD |
| Architecture rules | Architecture; ADR |
| Product structure and terminology | Product Map; Glossary |
| Technical design | TD-002 Health Layer |
| Implementation scope | ISSUE-002 Health Layer Implementation |

---

## 8. Out of Scope

- New business requirements.
- New product requirements.
- New architecture decisions.
- New modules.
- New technical design responsibilities.
- Acceptance requirements not derived from TD-002 and ISSUE-002.

---

## 9. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Acceptance Criteria document. |
| 1.1 | 2026-07-14 | Rewritten as binary measurable implementation acceptance criteria. |
