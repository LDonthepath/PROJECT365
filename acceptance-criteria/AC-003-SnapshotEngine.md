# Acceptance Criteria

## 1. Document Information

| Field | Value |
|------|------|
| Status | Draft |
| Version | 1.1 |
| Owner | PROJECT365 Delivery |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR, TD-003, ISSUE-003 |
| Referenced By | Implementation Prompt, Review, Freeze |

---

## 2. Purpose

Define binary PASS/FAIL acceptance criteria for ISSUE-003 Snapshot Engine Implementation against TD-003 Snapshot Engine.

Every criterion has an expected result, verification method, pass condition, and fail condition.

---

## 3. Related Documents

| Field | Value |
|------|------|
| Technical Design ID | TD-003 |
| Technical Design Name | Snapshot Engine |
| Technical Design Path | `../specs/TD-003-SnapshotEngine.md` |
| Issue ID | ISSUE-003 |
| Issue Name | Snapshot Engine Implementation |
| Issue Specification Path | `../issues/ISSUE-003-SnapshotEngine.md` |

---

## 4. Binary Acceptance Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-F-001 | Snapshot Engine exposes or validates required contract field `id` exactly as specified by TD-003. | Inspect implementation and run contract test for `id`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-002 | Snapshot Engine exposes or validates required contract field `timestamp` exactly as specified by TD-003. | Inspect implementation and run contract test for `timestamp`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-003 | Snapshot Engine exposes or validates required contract field `type` exactly as specified by TD-003. | Inspect implementation and run contract test for `type`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-004 | Snapshot Engine exposes or validates required contract field `marketData` exactly as specified by TD-003. | Inspect implementation and run contract test for `marketData`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-005 | Snapshot Engine exposes or validates required contract field `healthStatus` exactly as specified by TD-003. | Inspect implementation and run contract test for `healthStatus`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-006 | Snapshot Engine exposes or validates required contract field `contractVersion` exactly as specified by TD-003. | Inspect implementation and run contract test for `contractVersion`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-007 | Public interface `createSnapshot(marketData, healthStatus)` is available and returns only approved success or failure outputs. | Run unit test invoking `createSnapshot(marketData, healthStatus)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-008 | Public interface `getCurrentSnapshot()` is available and returns only approved success or failure outputs. | Run unit test invoking `getCurrentSnapshot()`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-009 | Public interface `getPreviousSnapshot()` is available and returns only approved success or failure outputs. | Run unit test invoking `getPreviousSnapshot()`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-010 | Public interface `getHistoricalSnapshots()` is available and returns only approved success or failure outputs. | Run unit test invoking `getHistoricalSnapshots()`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-011 | Public interface `getAnchorSnapshot(anchorType)` is available and returns only approved success or failure outputs. | Run unit test invoking `getAnchorSnapshot(anchorType)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-V-012 | MarketData input is required | Run validation test for: MarketData input is required | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-013 | HealthStatus input is required | Run validation test for: HealthStatus input is required | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-014 | HealthStatus must not be INVALID | Run validation test for: HealthStatus must not be INVALID | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-015 | snapshot id is unique | Run validation test for: snapshot id is unique | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-016 | snapshot timestamp is positive | Run validation test for: snapshot timestamp is positive | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-017 | snapshot is frozen | Run validation test for: snapshot is frozen | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-018 | snapshot state transitions update current and previous references deterministically | Run validation test for: snapshot state transitions update current and previous references deterministically | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-E-019 | Error condition `missing MarketData rejected` is handled with the approved rejection behavior. | Run negative test for `missing MarketData rejected`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-020 | Error condition `missing HealthStatus rejected` is handled with the approved rejection behavior. | Run negative test for `missing HealthStatus rejected`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-021 | Error condition `INVALID HealthStatus rejected` is handled with the approved rejection behavior. | Run negative test for `INVALID HealthStatus rejected`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-022 | Error condition `duplicate snapshot identity rejected` is handled with the approved rejection behavior. | Run negative test for `duplicate snapshot identity rejected`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-023 | Error condition `mutation attempt rejected` is handled with the approved rejection behavior. | Run negative test for `mutation attempt rejected`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-B-024 | first snapshot has no previous snapshot | Run boundary/edge test for: first snapshot has no previous snapshot | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-025 | second snapshot moves first current to previous | Run boundary/edge test for: second snapshot moves first current to previous | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-026 | unsupported anchor rejected | Run boundary/edge test for: unsupported anchor rejected | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-027 | expired snapshot marked Expired without mutating payload | Run boundary/edge test for: expired snapshot marked Expired without mutating payload | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |

---

## 5. Architecture Preservation Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-AP-001 | No architecture document is modified by implementation. | Review changed files. | No architecture/governance change appears in implementation PR. | Architecture or governance is changed without approval. |
| AC-AP-002 | No dependency direction changes are introduced. | Review imports, module references, and tests. | Dependencies match TD-003 and Architecture. | Any reverse or unapproved dependency exists. |
| AC-AP-003 | No responsibility from another module is implemented here. | Review implementation ownership. | Code remains limited to Snapshot Engine. | Code duplicates another module responsibility. |
| AC-AP-004 | Runtime flow remains the flow approved by TD-003. | Review call sequence tests. | Flow matches TD-003. | Flow adds unapproved step or bypass. |

---

## 6. Overall Acceptance Rule

AC-003 passes only when every criterion in Sections 4 and 5 passes. Any single failed criterion makes AC-003 fail.

---

## 7. Traceability

| Acceptance Area | Source |
|-----------------|--------|
| Business intent | BRD |
| Product requirements | PRD |
| Architecture rules | Architecture; ADR |
| Product structure and terminology | Product Map; Glossary |
| Technical design | TD-003 Snapshot Engine |
| Implementation scope | ISSUE-003 Snapshot Engine Implementation |

---

## 8. Out of Scope

- New business requirements.
- New product requirements.
- New architecture decisions.
- New modules.
- New technical design responsibilities.
- Acceptance requirements not derived from TD-003 and ISSUE-003.

---

## 9. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Acceptance Criteria document. |
| 1.1 | 2026-07-14 | Rewritten as binary measurable implementation acceptance criteria. |
