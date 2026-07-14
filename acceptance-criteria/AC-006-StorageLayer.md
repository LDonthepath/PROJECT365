# Acceptance Criteria

## 1. Document Information

| Field | Value |
|------|------|
| Status | Draft |
| Version | 1.1 |
| Owner | PROJECT365 Delivery |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR, TD-006, ISSUE-006 |
| Referenced By | Implementation Prompt, Review, Freeze |

---

## 2. Purpose

Define binary PASS/FAIL acceptance criteria for ISSUE-006 Storage Layer Implementation against TD-006 Storage Layer.

Every criterion has an expected result, verification method, pass condition, and fail condition.

---

## 3. Related Documents

| Field | Value |
|------|------|
| Technical Design ID | TD-006 |
| Technical Design Name | Storage Layer |
| Technical Design Path | `../specs/TD-006-StorageLayer.md` |
| Issue ID | ISSUE-006 |
| Issue Name | Storage Layer Implementation |
| Issue Specification Path | `../issues/ISSUE-006-StorageLayer.md` |

---

## 4. Binary Acceptance Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-F-001 | Storage Layer exposes or validates required contract field `id` exactly as specified by TD-006. | Inspect implementation and run contract test for `id`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-002 | Storage Layer exposes or validates required contract field `objectType` exactly as specified by TD-006. | Inspect implementation and run contract test for `objectType`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-003 | Storage Layer exposes or validates required contract field `timestamp` exactly as specified by TD-006. | Inspect implementation and run contract test for `timestamp`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-004 | Storage Layer exposes or validates required contract field `payload` exactly as specified by TD-006. | Inspect implementation and run contract test for `payload`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-005 | Storage Layer exposes or validates required contract field `storedAt` exactly as specified by TD-006. | Inspect implementation and run contract test for `storedAt`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-006 | Storage Layer exposes or validates required contract field `archived` exactly as specified by TD-006. | Inspect implementation and run contract test for `archived`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-007 | Storage Layer exposes or validates required contract field `contractVersion` exactly as specified by TD-006. | Inspect implementation and run contract test for `contractVersion`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-008 | Storage Layer exposes or validates required contract field `metadata` exactly as specified by TD-006. | Inspect implementation and run contract test for `metadata`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-009 | Public interface `save(request)` is available and returns only approved success or failure outputs. | Run unit test invoking `save(request)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-010 | Public interface `load(request)` is available and returns only approved success or failure outputs. | Run unit test invoking `load(request)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-011 | Public interface `exists(request)` is available and returns only approved success or failure outputs. | Run unit test invoking `exists(request)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-012 | Public interface `delete(request)` is available and returns only approved success or failure outputs. | Run unit test invoking `delete(request)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-013 | Public interface `find(request)` is available and returns only approved success or failure outputs. | Run unit test invoking `find(request)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-014 | Public interface `findRange(request)` is available and returns only approved success or failure outputs. | Run unit test invoking `findRange(request)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-V-015 | objectType is MarketData or Snapshot | Run validation test for: objectType is MarketData or Snapshot | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-016 | payload contract matches objectType | Run validation test for: payload contract matches objectType | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-017 | object identity is present | Run validation test for: object identity is present | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-018 | timestamp is positive | Run validation test for: timestamp is positive | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-019 | range toTimestamp is greater than or equal to fromTimestamp | Run validation test for: range toTimestamp is greater than or equal to fromTimestamp | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-020 | page is greater than 0 | Run validation test for: page is greater than 0 | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-021 | pageSize is between 1 and 500 | Run validation test for: pageSize is between 1 and 500 | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-022 | delete archives metadata without mutating payload | Run validation test for: delete archives metadata without mutating payload | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-E-023 | Error condition `INVALID_REQUEST` is handled with the approved rejection behavior. | Run negative test for `INVALID_REQUEST`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-024 | Error condition `UNSUPPORTED_OBJECT_TYPE` is handled with the approved rejection behavior. | Run negative test for `UNSUPPORTED_OBJECT_TYPE`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-025 | Error condition `INVALID_OBJECT_CONTRACT` is handled with the approved rejection behavior. | Run negative test for `INVALID_OBJECT_CONTRACT`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-026 | Error condition `MISSING_OBJECT_IDENTITY` is handled with the approved rejection behavior. | Run negative test for `MISSING_OBJECT_IDENTITY`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-027 | Error condition `DUPLICATE_IDENTITY` is handled with the approved rejection behavior. | Run negative test for `DUPLICATE_IDENTITY`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-028 | Error condition `IDENTITY_CONFLICT` is handled with the approved rejection behavior. | Run negative test for `IDENTITY_CONFLICT`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-029 | Error condition `NOT_FOUND` is handled with the approved rejection behavior. | Run negative test for `NOT_FOUND`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-030 | Error condition `IMMUTABILITY_VIOLATION` is handled with the approved rejection behavior. | Run negative test for `IMMUTABILITY_VIOLATION`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-031 | Error condition `INVALID_RANGE` is handled with the approved rejection behavior. | Run negative test for `INVALID_RANGE`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-032 | Error condition `INVALID_PAGINATION` is handled with the approved rejection behavior. | Run negative test for `INVALID_PAGINATION`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-033 | Error condition `RETRIEVAL_UNAVAILABLE` is handled with the approved rejection behavior. | Run negative test for `RETRIEVAL_UNAVAILABLE`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-B-034 | idempotent save of identical payload succeeds | Run boundary/edge test for: idempotent save of identical payload succeeds | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-035 | same id with different payload conflicts | Run boundary/edge test for: same id with different payload conflicts | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-036 | load missing id returns NotFound | Run boundary/edge test for: load missing id returns NotFound | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-037 | empty range returns empty records | Run boundary/edge test for: empty range returns empty records | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-038 | archived records excluded by default | Run boundary/edge test for: archived records excluded by default | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-039 | equal timestamps ordered by id | Run boundary/edge test for: equal timestamps ordered by id | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |

---

## 5. Architecture Preservation Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-AP-001 | No architecture document is modified by implementation. | Review changed files. | No architecture/governance change appears in implementation PR. | Architecture or governance is changed without approval. |
| AC-AP-002 | No dependency direction changes are introduced. | Review imports, module references, and tests. | Dependencies match TD-006 and Architecture. | Any reverse or unapproved dependency exists. |
| AC-AP-003 | No responsibility from another module is implemented here. | Review implementation ownership. | Code remains limited to Storage Layer. | Code duplicates another module responsibility. |
| AC-AP-004 | Runtime flow remains the flow approved by TD-006. | Review call sequence tests. | Flow matches TD-006. | Flow adds unapproved step or bypass. |

---

## 6. Overall Acceptance Rule

AC-006 passes only when every criterion in Sections 4 and 5 passes. Any single failed criterion makes AC-006 fail.

---

## 7. Traceability

| Acceptance Area | Source |
|-----------------|--------|
| Business intent | BRD |
| Product requirements | PRD |
| Architecture rules | Architecture; ADR |
| Product structure and terminology | Product Map; Glossary |
| Technical design | TD-006 Storage Layer |
| Implementation scope | ISSUE-006 Storage Layer Implementation |

---

## 8. Out of Scope

- New business requirements.
- New product requirements.
- New architecture decisions.
- New modules.
- New technical design responsibilities.
- Acceptance requirements not derived from TD-006 and ISSUE-006.

---

## 9. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Acceptance Criteria document. |
| 1.1 | 2026-07-14 | Rewritten as binary measurable implementation acceptance criteria. |
