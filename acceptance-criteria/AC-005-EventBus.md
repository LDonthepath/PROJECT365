# Acceptance Criteria

## 1. Document Information

| Field | Value |
|------|------|
| Status | Draft |
| Version | 1.1 |
| Owner | PROJECT365 Delivery |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR, TD-005, ISSUE-005 |
| Referenced By | Implementation Prompt, Review, Freeze |

---

## 2. Purpose

Define binary PASS/FAIL acceptance criteria for ISSUE-005 Event Bus Implementation against TD-005 Event Bus.

Every criterion has an expected result, verification method, pass condition, and fail condition.

---

## 3. Related Documents

| Field | Value |
|------|------|
| Technical Design ID | TD-005 |
| Technical Design Name | Event Bus |
| Technical Design Path | `../specs/TD-005-EventBus.md` |
| Issue ID | ISSUE-005 |
| Issue Name | Event Bus Implementation |
| Issue Specification Path | `../issues/ISSUE-005-EventBus.md` |

---

## 4. Binary Acceptance Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-F-001 | Event Bus exposes or validates required contract field `eventId` exactly as specified by TD-005. | Inspect implementation and run contract test for `eventId`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-002 | Event Bus exposes or validates required contract field `eventType` exactly as specified by TD-005. | Inspect implementation and run contract test for `eventType`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-003 | Event Bus exposes or validates required contract field `timestamp` exactly as specified by TD-005. | Inspect implementation and run contract test for `timestamp`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-004 | Event Bus exposes or validates required contract field `version` exactly as specified by TD-005. | Inspect implementation and run contract test for `version`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-005 | Event Bus exposes or validates required contract field `publisher` exactly as specified by TD-005. | Inspect implementation and run contract test for `publisher`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-006 | Event Bus exposes or validates required contract field `payload` exactly as specified by TD-005. | Inspect implementation and run contract test for `payload`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-007 | Event Bus exposes or validates required contract field `correlationId` exactly as specified by TD-005. | Inspect implementation and run contract test for `correlationId`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-008 | Event Bus exposes or validates required contract field `metadata` exactly as specified by TD-005. | Inspect implementation and run contract test for `metadata`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-009 | Event Bus exposes or validates required contract field `subscriberId` exactly as specified by TD-005. | Inspect implementation and run contract test for `subscriberId`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-010 | Event Bus exposes or validates required contract field `active` exactly as specified by TD-005. | Inspect implementation and run contract test for `active`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-011 | Public interface `publish(event)` is available and returns only approved success or failure outputs. | Run unit test invoking `publish(event)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-012 | Public interface `subscribe(request)` is available and returns only approved success or failure outputs. | Run unit test invoking `subscribe(request)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-013 | Public interface `unsubscribe(request)` is available and returns only approved success or failure outputs. | Run unit test invoking `unsubscribe(request)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-014 | Public interface `getSubscribers(eventType)` is available and returns only approved success or failure outputs. | Run unit test invoking `getSubscribers(eventType)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-V-015 | event schema contains all required fields | Run validation test for: event schema contains all required fields | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-016 | eventType is in registry | Run validation test for: eventType is in registry | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-017 | publisher owns eventType | Run validation test for: publisher owns eventType | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-018 | metadata sourceModule equals publisher | Run validation test for: metadata sourceModule equals publisher | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-019 | subscriber is permitted for eventType | Run validation test for: subscriber is permitted for eventType | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-020 | duplicate eventId rejected | Run validation test for: duplicate eventId rejected | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-021 | major version compatibility enforced | Run validation test for: major version compatibility enforced | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-022 | payload contract redefinition rejected | Run validation test for: payload contract redefinition rejected | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-E-023 | Error condition `UNAPPROVED_EVENT_TYPE` is handled with the approved rejection behavior. | Run negative test for `UNAPPROVED_EVENT_TYPE`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-024 | Error condition `INVALID_EVENT_SCHEMA` is handled with the approved rejection behavior. | Run negative test for `INVALID_EVENT_SCHEMA`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-025 | Error condition `INVALID_METADATA` is handled with the approved rejection behavior. | Run negative test for `INVALID_METADATA`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-026 | Error condition `UNAUTHORIZED_PUBLISHER` is handled with the approved rejection behavior. | Run negative test for `UNAUTHORIZED_PUBLISHER`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-027 | Error condition `UNAUTHORIZED_SUBSCRIBER` is handled with the approved rejection behavior. | Run negative test for `UNAUTHORIZED_SUBSCRIBER`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-028 | Error condition `REVERSE_DEPENDENCY_SUBSCRIPTION` is handled with the approved rejection behavior. | Run negative test for `REVERSE_DEPENDENCY_SUBSCRIPTION`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-029 | Error condition `DUPLICATE_EVENT` is handled with the approved rejection behavior. | Run negative test for `DUPLICATE_EVENT`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-030 | Error condition `INCOMPATIBLE_EVENT_VERSION` is handled with the approved rejection behavior. | Run negative test for `INCOMPATIBLE_EVENT_VERSION`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-031 | Error condition `PAYLOAD_CONTRACT_REDEFINITION` is handled with the approved rejection behavior. | Run negative test for `PAYLOAD_CONTRACT_REDEFINITION`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-B-032 | duplicate subscription is idempotently accepted | Run boundary/edge test for: duplicate subscription is idempotently accepted | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-033 | duplicate event is rejected | Run boundary/edge test for: duplicate event is rejected | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-034 | same timestamp events ordered by eventId | Run boundary/edge test for: same timestamp events ordered by eventId | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-035 | cross-event-type ordering not guaranteed | Run boundary/edge test for: cross-event-type ordering not guaranteed | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-036 | rejected event not delivered | Run boundary/edge test for: rejected event not delivered | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |

---

## 5. Architecture Preservation Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-AP-001 | No architecture document is modified by implementation. | Review changed files. | No architecture/governance change appears in implementation PR. | Architecture or governance is changed without approval. |
| AC-AP-002 | No dependency direction changes are introduced. | Review imports, module references, and tests. | Dependencies match TD-005 and Architecture. | Any reverse or unapproved dependency exists. |
| AC-AP-003 | No responsibility from another module is implemented here. | Review implementation ownership. | Code remains limited to Event Bus. | Code duplicates another module responsibility. |
| AC-AP-004 | Runtime flow remains the flow approved by TD-005. | Review call sequence tests. | Flow matches TD-005. | Flow adds unapproved step or bypass. |

---

## 6. Overall Acceptance Rule

AC-005 passes only when every criterion in Sections 4 and 5 passes. Any single failed criterion makes AC-005 fail.

---

## 7. Traceability

| Acceptance Area | Source |
|-----------------|--------|
| Business intent | BRD |
| Product requirements | PRD |
| Architecture rules | Architecture; ADR |
| Product structure and terminology | Product Map; Glossary |
| Technical design | TD-005 Event Bus |
| Implementation scope | ISSUE-005 Event Bus Implementation |

---

## 8. Out of Scope

- New business requirements.
- New product requirements.
- New architecture decisions.
- New modules.
- New technical design responsibilities.
- Acceptance requirements not derived from TD-005 and ISSUE-005.

---

## 9. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Acceptance Criteria document. |
| 1.1 | 2026-07-14 | Rewritten as binary measurable implementation acceptance criteria. |
