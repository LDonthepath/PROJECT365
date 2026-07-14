# Acceptance Criteria

## 1. Document Information

| Field | Value |
|------|------|
| Status | Draft |
| Version | 1.1 |
| Owner | PROJECT365 Delivery |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR, TD-004, ISSUE-004 |
| Referenced By | Implementation Prompt, Review, Freeze |

---

## 2. Purpose

Define binary PASS/FAIL acceptance criteria for ISSUE-004 Data Service Implementation against TD-004 Data Service.

Every criterion has an expected result, verification method, pass condition, and fail condition.

---

## 3. Related Documents

| Field | Value |
|------|------|
| Technical Design ID | TD-004 |
| Technical Design Name | Data Service |
| Technical Design Path | `../specs/TD-004-DataService.md` |
| Issue ID | ISSUE-004 |
| Issue Name | Data Service Implementation |
| Issue Specification Path | `../issues/ISSUE-004-DataService.md` |

---

## 4. Binary Acceptance Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-F-001 | Data Service exposes or validates required contract field `requestId` exactly as specified by TD-004. | Inspect implementation and run contract test for `requestId`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-002 | Data Service exposes or validates required contract field `providerId` exactly as specified by TD-004. | Inspect implementation and run contract test for `providerId`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-003 | Data Service exposes or validates required contract field `assetId` exactly as specified by TD-004. | Inspect implementation and run contract test for `assetId`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-004 | Data Service exposes or validates required contract field `requestedAt` exactly as specified by TD-004. | Inspect implementation and run contract test for `requestedAt`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-005 | Data Service exposes or validates required contract field `timeoutMs` exactly as specified by TD-004. | Inspect implementation and run contract test for `timeoutMs`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-006 | Data Service exposes or validates required contract field `maxRetries` exactly as specified by TD-004. | Inspect implementation and run contract test for `maxRetries`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-007 | Data Service exposes or validates required contract field `ok` exactly as specified by TD-004. | Inspect implementation and run contract test for `ok`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-008 | Data Service exposes or validates required contract field `marketData` exactly as specified by TD-004. | Inspect implementation and run contract test for `marketData`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-009 | Data Service exposes or validates required contract field `errorCode` exactly as specified by TD-004. | Inspect implementation and run contract test for `errorCode`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-010 | Data Service exposes or validates required contract field `attempts` exactly as specified by TD-004. | Inspect implementation and run contract test for `attempts`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-011 | Public interface `produceMarketData(request)` is available and returns only approved success or failure outputs. | Run unit test invoking `produceMarketData(request)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-012 | Public interface `normalizeProviderResult(providerResult)` is available and returns only approved success or failure outputs. | Run unit test invoking `normalizeProviderResult(providerResult)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-013 | Public interface `mapToMarketData(normalizedValues)` is available and returns only approved success or failure outputs. | Run unit test invoking `mapToMarketData(normalizedValues)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-V-014 | DataServiceRequest required fields are present | Run validation test for: DataServiceRequest required fields are present | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-015 | unsupported provider rejected before provider access | Run validation test for: unsupported provider rejected before provider access | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-016 | ProviderResult source attribution is present | Run validation test for: ProviderResult source attribution is present | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-017 | ProviderResult maps to all 19 TD-001 fields | Run validation test for: ProviderResult maps to all 19 TD-001 fields | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-018 | numeric strings are rejected | Run validation test for: numeric strings are rejected | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-019 | partial MarketData is never created | Run validation test for: partial MarketData is never created | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-020 | timeout uses 10000ms default | Run validation test for: timeout uses 10000ms default | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-021 | default retry count is 1 | Run validation test for: default retry count is 1 | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-E-022 | Error condition `INVALID_REQUEST` is handled with the approved rejection behavior. | Run negative test for `INVALID_REQUEST`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-023 | Error condition `UNSUPPORTED_PROVIDER` is handled with the approved rejection behavior. | Run negative test for `UNSUPPORTED_PROVIDER`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-024 | Error condition `PROVIDER_UNAVAILABLE` is handled with the approved rejection behavior. | Run negative test for `PROVIDER_UNAVAILABLE`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-025 | Error condition `PROVIDER_TIMEOUT` is handled with the approved rejection behavior. | Run negative test for `PROVIDER_TIMEOUT`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-026 | Error condition `PROVIDER_RATE_LIMITED` is handled with the approved rejection behavior. | Run negative test for `PROVIDER_RATE_LIMITED`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-027 | Error condition `PROVIDER_MALFORMED_RESPONSE` is handled with the approved rejection behavior. | Run negative test for `PROVIDER_MALFORMED_RESPONSE`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-028 | Error condition `MISSING_MARKETDATA_FIELD` is handled with the approved rejection behavior. | Run negative test for `MISSING_MARKETDATA_FIELD`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-029 | Error condition `INVALID_MARKETDATA_FIELD` is handled with the approved rejection behavior. | Run negative test for `INVALID_MARKETDATA_FIELD`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-030 | Error condition `NORMALIZATION_FAILED` is handled with the approved rejection behavior. | Run negative test for `NORMALIZATION_FAILED`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-B-031 | unsupported provider attempts equals 0 | Run boundary/edge test for: unsupported provider attempts equals 0 | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-032 | timeout retried until budget exhausted | Run boundary/edge test for: timeout retried until budget exhausted | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-033 | rate limit retried only within budget | Run boundary/edge test for: rate limit retried only within budget | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-034 | malformed response not retried | Run boundary/edge test for: malformed response not retried | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-035 | missing required field returns missingFields | Run boundary/edge test for: missing required field returns missingFields | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |

---

## 5. Architecture Preservation Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-AP-001 | No architecture document is modified by implementation. | Review changed files. | No architecture/governance change appears in implementation PR. | Architecture or governance is changed without approval. |
| AC-AP-002 | No dependency direction changes are introduced. | Review imports, module references, and tests. | Dependencies match TD-004 and Architecture. | Any reverse or unapproved dependency exists. |
| AC-AP-003 | No responsibility from another module is implemented here. | Review implementation ownership. | Code remains limited to Data Service. | Code duplicates another module responsibility. |
| AC-AP-004 | Runtime flow remains the flow approved by TD-004. | Review call sequence tests. | Flow matches TD-004. | Flow adds unapproved step or bypass. |

---

## 6. Overall Acceptance Rule

AC-004 passes only when every criterion in Sections 4 and 5 passes. Any single failed criterion makes AC-004 fail.

---

## 7. Traceability

| Acceptance Area | Source |
|-----------------|--------|
| Business intent | BRD |
| Product requirements | PRD |
| Architecture rules | Architecture; ADR |
| Product structure and terminology | Product Map; Glossary |
| Technical design | TD-004 Data Service |
| Implementation scope | ISSUE-004 Data Service Implementation |

---

## 8. Out of Scope

- New business requirements.
- New product requirements.
- New architecture decisions.
- New modules.
- New technical design responsibilities.
- Acceptance requirements not derived from TD-004 and ISSUE-004.

---

## 9. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Acceptance Criteria document. |
| 1.1 | 2026-07-14 | Rewritten as binary measurable implementation acceptance criteria. |
