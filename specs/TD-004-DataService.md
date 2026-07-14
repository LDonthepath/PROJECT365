# Technical Design

## 1. Document Information

| Field | Value |
|------|------|
| Status | Ready to Freeze |
| Version | 1.0 |
| Owner | PROJECT365 Architecture |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR |
| Referenced By | Issue Specification, Acceptance Criteria, Implementation Prompt |

---

## 2. Purpose

Define the Technical Design for TD-004 Data Service.

Data Service coordinates data ingestion from the Provider Framework and produces MarketData. It owns orchestration only and must never perform business logic, calculate market intelligence, or store historical snapshots.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, or implementation details.

---

## 3. Scope

This Technical Design covers Data Service as a Foundation component.

Included responsibilities:

- Orchestrate Provider Framework.
- Request market data.
- Normalize provider outputs into the approved MarketData boundary.
- Build MarketData.
- Preserve source attribution required by MarketData.
- Hand MarketData to Health Layer consumers.

Excluded responsibilities:

- Provider implementation.
- Market intelligence.
- Business logic.
- Health validation.
- Snapshot creation.
- Historical snapshot storage.

---

## 4. Background

The approved Foundation architecture places Data Service downstream of Provider Framework and upstream of MarketData Contract and Health Layer.

Approved dependency sequence:

```text
Provider Framework
↓
Data Service
↓
MarketData Contract
↓
Health Layer
```

Reference context is derived from BRD, PRD, Architecture, Product Map, Glossary, and ADR without duplicating or expanding those documents.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Foundation Domain includes Data Service and requires trusted, immutable, validated market data. |
| PRD | Foundation provides trusted market data before downstream intelligence. |
| Architecture | Data Service orchestrates provider aggregation and produces MarketData; contains orchestration only. |
| Product Map | Ingest global market data maps to Foundation Data Service. |
| ADR | Single Source of Truth, Separation of Concerns, Layer Dependency Rules, Immutable Foundation Objects. |

Every technical decision in this document is traceable to approved Foundation responsibilities, dependency rules, Single Source of Truth, Separation of Concerns, Hard Gate Principle, Explainability, and Auditability.

---

## 6. Design Overview

Data Service is the Foundation orchestration component that requests approved provider data through the Provider Framework, accepts Provider Results or Provider Errors, normalizes acceptable provider outputs to the approved MarketData Contract, and exposes MarketData to Health Layer.

Boundaries:

- Data Service produces MarketData only.
- Data Service does not validate Health Status.
- Data Service does not create or persist snapshots.
- Data Service does not calculate deltas, regimes, confidence, exposure, or recommendations.

Design principles:

- Preserve Single Source of Truth.
- Preserve Separation of Concerns.
- Preserve Hard Gate Principle.
- Preserve Explainability.
- Preserve Auditability.
- Preserve approved dependency direction.
- Contain no business logic unless explicitly owned by an approved downstream domain.
- Introduce no implementation details.

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Provider Orchestration | Coordinate approved Provider Framework interactions. | Provider metadata and data request context | Provider Result or Provider Error | Data Service |
| Normalization Boundary | Map acceptable provider outputs to MarketData fields. | Provider Result | MarketData-ready values | Data Service |
| MarketData Builder | Produce MarketData according to TD-001. | Normalized provider output | MarketData | Data Service |
| Handoff Boundary | Expose MarketData to Health Layer. | MarketData | Health Layer input | Data Service |

---

## 8. Data Model

Data Service does not define a new product data model.

Data contracts used:

- Provider Result from TD-000.
- Provider Error from TD-000.
- MarketData from TD-001.

Lifecycle:

```text
Request provider data
↓
Receive Provider Result or Provider Error
↓
Normalize acceptable provider output
↓
Build MarketData
↓
Expose MarketData to Health Layer
```

---

## 9. Public Interfaces

### MarketData Production Interface

Inputs:

- Provider Framework access.
- Provider Result.
- Provider Error.

Outputs:

- MarketData.
- Standardized orchestration failure state when MarketData cannot be produced.

Expected behavior:

- Use only approved Provider Framework boundaries.
- Produce MarketData that conforms to TD-001.
- Preserve source attribution through `fetchSource` and `fetchedAt`.

---

## 10. Internal Flow

1. Data Service requests market data through Provider Framework.
2. Provider Framework returns Provider Result or Provider Error.
3. Data Service rejects unacceptable provider failures and malformed provider outputs.
4. Data Service normalizes acceptable Provider Results to MarketData fields.
5. Data Service builds MarketData.
6. Health Layer receives MarketData for validation.

Dependency rule:

```text
Provider Framework
↓
Data Service
↓
MarketData Contract
↓
Health Layer
```

---

## 11. Error Handling

Validation:

- Provider Result must identify source attribution.
- Required MarketData fields must be present before handoff.
- Provider Error must remain provider-agnostic.

Failure scenarios:

- Provider unavailable.
- Provider timeout.
- Provider rate limit.
- Provider malformed response.
- Required MarketData field unavailable.

Recovery strategy:

- Do not create partial MarketData.
- Preserve error category for auditability.
- Do not bypass Provider Framework.
- Do not let Health Layer access providers directly.

---

## 12. Non-Functional Considerations

Performance:

- Provider orchestration should avoid unnecessary duplicate provider calls.

Reliability:

- Provider failures must prevent invalid MarketData production.

Maintainability:

- Provider changes remain behind Provider Framework.

Testability:

- Orchestration, normalization, and MarketData handoff must be independently verifiable.

Security:

- Provider credentials and external-source internals must not be exposed downstream.

Auditability:

- Source attribution and failure categories must remain inspectable.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- ADR.
- TD-000 Data Provider Framework.

Downstream consumers:

- TD-001 MarketData Contract.
- TD-002 Health Layer.
- TD-003 Snapshot Engine through Health Layer.

Approved dependency chain:

```text
Provider Framework
→ Data Service
→ MarketData Contract
→ Health Layer
```

---

## 14. Assumptions

- Provider Framework supplies Provider Results and Provider Errors.
- MarketData Contract remains the only approved output contract for trusted market data.
- Health Layer owns validation after MarketData production.

---

## 15. Constraints

- Data Service must not perform business logic.
- Data Service must not calculate market intelligence.
- Data Service must not store historical snapshots.
- Data Service must preserve dependency direction.
- Data Service must not alter TD-001 field definitions.

---

## 16. Out of Scope

This Technical Design does not cover:

- Provider-specific adapters.
- Health Status.
- Snapshot creation.
- Snapshot persistence.
- Market deltas.
- Regime calculations.
- Portfolio recommendations.
- Event bus transport.

---

## 17. Implementation Notes

Implementation guidance:

- Keep Data Service limited to orchestration and MarketData production.
- Keep all provider access through Provider Framework.
- Keep all health evaluation in Health Layer.
- Keep all persistence in Storage Layer or Snapshot Engine ownership as approved.

Acceptance criteria:

- Data Service defines upstream Provider Framework dependency.
- Data Service defines downstream MarketData and Health Layer consumers.
- Data Service produces MarketData only through TD-001.
- Data Service explicitly excludes business logic, market intelligence, and historical snapshot storage.
- All responsibilities trace to approved governance documents.

No source code, implementation algorithm, storage technology, transport technology, or issue-level task breakdown is defined by this Technical Design.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Foundation Domain trusted market data modules and constraints. |
| PRD | Foundation readiness before downstream intelligence. |
| Architecture | Data Service responsibility and Foundation dependency rules. |
| Product Map | Data Service capability mapping for global market data ingestion. |
| ADR | ADR-004, ADR-005, ADR-006, ADR-007. |

---

## 19. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- TD-000 Data Provider Framework
- TD-001 MarketData Contract
- TD-002 Health Layer
- TD-003 Snapshot Engine

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial TD-004 Data Service Technical Design |
