# Acceptance Criteria

## 1. Document Information

| Field | Value |
|------|------|
| Status | Draft |
| Version | 1.1 |
| Owner | PROJECT365 Delivery |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR, TD-001, ISSUE-001 |
| Referenced By | Implementation Prompt, Review, Freeze |

---

## 2. Purpose

Define binary PASS/FAIL acceptance criteria for ISSUE-001 MarketData Contract Implementation against TD-001 MarketData.

Every criterion has an expected result, verification method, pass condition, and fail condition.

---

## 3. Related Documents

| Field | Value |
|------|------|
| Technical Design ID | TD-001 |
| Technical Design Name | MarketData |
| Technical Design Path | `../specs/TD-001-MarketData.md` |
| Issue ID | ISSUE-001 |
| Issue Name | MarketData Contract Implementation |
| Issue Specification Path | `../issues/ISSUE-001-MarketData.md` |

---

## 4. Binary Acceptance Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-F-001 | MarketData exposes or validates required contract field `id` exactly as specified by TD-001. | Inspect implementation and run contract test for `id`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-002 | MarketData exposes or validates required contract field `symbol` exactly as specified by TD-001. | Inspect implementation and run contract test for `symbol`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-003 | MarketData exposes or validates required contract field `name` exactly as specified by TD-001. | Inspect implementation and run contract test for `name`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-004 | MarketData exposes or validates required contract field `priceUsd` exactly as specified by TD-001. | Inspect implementation and run contract test for `priceUsd`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-005 | MarketData exposes or validates required contract field `change1h` exactly as specified by TD-001. | Inspect implementation and run contract test for `change1h`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-006 | MarketData exposes or validates required contract field `change24h` exactly as specified by TD-001. | Inspect implementation and run contract test for `change24h`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-007 | MarketData exposes or validates required contract field `volume24hUsd` exactly as specified by TD-001. | Inspect implementation and run contract test for `volume24hUsd`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-008 | MarketData exposes or validates required contract field `marketCapUsd` exactly as specified by TD-001. | Inspect implementation and run contract test for `marketCapUsd`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-009 | MarketData exposes or validates required contract field `totalMarketCapUsd` exactly as specified by TD-001. | Inspect implementation and run contract test for `totalMarketCapUsd`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-010 | MarketData exposes or validates required contract field `total3MarketCap` exactly as specified by TD-001. | Inspect implementation and run contract test for `total3MarketCap`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-011 | MarketData exposes or validates required contract field `btcDominance` exactly as specified by TD-001. | Inspect implementation and run contract test for `btcDominance`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-012 | MarketData exposes or validates required contract field `usdtDominance` exactly as specified by TD-001. | Inspect implementation and run contract test for `usdtDominance`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-013 | MarketData exposes or validates required contract field `usdcDominance` exactly as specified by TD-001. | Inspect implementation and run contract test for `usdcDominance`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-014 | MarketData exposes or validates required contract field `circulatingSupply` exactly as specified by TD-001. | Inspect implementation and run contract test for `circulatingSupply`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-015 | MarketData exposes or validates required contract field `ath` exactly as specified by TD-001. | Inspect implementation and run contract test for `ath`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-016 | MarketData exposes or validates required contract field `atl` exactly as specified by TD-001. | Inspect implementation and run contract test for `atl`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-017 | MarketData exposes or validates required contract field `fetchedAt` exactly as specified by TD-001. | Inspect implementation and run contract test for `fetchedAt`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-018 | MarketData exposes or validates required contract field `fetchSource` exactly as specified by TD-001. | Inspect implementation and run contract test for `fetchSource`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-019 | MarketData exposes or validates required contract field `contractVersion` exactly as specified by TD-001. | Inspect implementation and run contract test for `contractVersion`. | Field is present for valid output or rejected when absent from required input. | Field is missing, renamed, optional when required, or accepted with invalid shape. |
| AC-F-020 | Public interface `createMarketData(candidateFields)` is available and returns only approved success or failure outputs. | Run unit test invoking `createMarketData(candidateFields)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-021 | Public interface `serializeMarketData(marketData)` is available and returns only approved success or failure outputs. | Run unit test invoking `serializeMarketData(marketData)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-F-022 | Public interface `deserializeMarketData(serializedMarketData)` is available and returns only approved success or failure outputs. | Run unit test invoking `deserializeMarketData(serializedMarketData)`. | Call succeeds for valid input and returns approved schema. | Interface missing or returns unapproved schema. |
| AC-V-023 | all 19 required fields are present | Run validation test for: all 19 required fields are present | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-024 | string fields are non-empty strings | Run validation test for: string fields are non-empty strings | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-025 | numeric fields are finite numbers | Run validation test for: numeric fields are finite numbers | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-026 | dominance fields are between 0 and 100 inclusive | Run validation test for: dominance fields are between 0 and 100 inclusive | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-027 | fetchedAt is a positive Unix epoch millisecond timestamp | Run validation test for: fetchedAt is a positive Unix epoch millisecond timestamp | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-028 | contractVersion is present | Run validation test for: contractVersion is present | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-029 | no optional fields are accepted | Run validation test for: no optional fields are accepted | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-V-030 | created objects are frozen | Run validation test for: created objects are frozen | Expected result occurs exactly. | Expected result does not occur or requires interpretation. |
| AC-E-031 | Error condition `missing required field` is handled with the approved rejection behavior. | Run negative test for `missing required field`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-032 | Error condition `invalid string field` is handled with the approved rejection behavior. | Run negative test for `invalid string field`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-033 | Error condition `invalid numeric field` is handled with the approved rejection behavior. | Run negative test for `invalid numeric field`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-034 | Error condition `invalid timestamp` is handled with the approved rejection behavior. | Run negative test for `invalid timestamp`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-035 | Error condition `unsupported extra field` is handled with the approved rejection behavior. | Run negative test for `unsupported extra field`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-E-036 | Error condition `mutation attempt after creation` is handled with the approved rejection behavior. | Run negative test for `mutation attempt after creation`. | Approved error/rejection result is returned without side effects. | Invalid input is accepted, wrong error is returned, or side effect occurs. |
| AC-B-037 | null candidate rejected | Run boundary/edge test for: null candidate rejected | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-038 | undefined candidate rejected | Run boundary/edge test for: undefined candidate rejected | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-039 | numeric string rejected | Run boundary/edge test for: numeric string rejected | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-040 | NaN and Infinity rejected | Run boundary/edge test for: NaN and Infinity rejected | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-041 | negative market cap rejected | Run boundary/edge test for: negative market cap rejected | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-042 | dominance below 0 or above 100 rejected | Run boundary/edge test for: dominance below 0 or above 100 rejected | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |
| AC-B-043 | post-creation field addition rejected | Run boundary/edge test for: post-creation field addition rejected | Observed behavior matches criterion exactly. | Observed behavior differs or is undefined. |

---

## 5. Architecture Preservation Criteria

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-AP-001 | No architecture document is modified by implementation. | Review changed files. | No architecture/governance change appears in implementation PR. | Architecture or governance is changed without approval. |
| AC-AP-002 | No dependency direction changes are introduced. | Review imports, module references, and tests. | Dependencies match TD-001 and Architecture. | Any reverse or unapproved dependency exists. |
| AC-AP-003 | No responsibility from another module is implemented here. | Review implementation ownership. | Code remains limited to MarketData. | Code duplicates another module responsibility. |
| AC-AP-004 | Runtime flow remains the flow approved by TD-001. | Review call sequence tests. | Flow matches TD-001. | Flow adds unapproved step or bypass. |

---

## 6. Overall Acceptance Rule

AC-001 passes only when every criterion in Sections 4 and 5 passes. Any single failed criterion makes AC-001 fail.

---

## 7. Traceability

| Acceptance Area | Source |
|-----------------|--------|
| Business intent | BRD |
| Product requirements | PRD |
| Architecture rules | Architecture; ADR |
| Product structure and terminology | Product Map; Glossary |
| Technical design | TD-001 MarketData |
| Implementation scope | ISSUE-001 MarketData Contract Implementation |

---

## 8. Out of Scope

- New business requirements.
- New product requirements.
- New architecture decisions.
- New modules.
- New technical design responsibilities.
- Acceptance requirements not derived from TD-001 and ISSUE-001.

---

## 9. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Acceptance Criteria document. |
| 1.1 | 2026-07-14 | Rewritten as binary measurable implementation acceptance criteria. |
