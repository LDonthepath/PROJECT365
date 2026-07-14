# Technical Design

## 1. Document Information

| Field | Value |
|------|------|
| Status | Frozen |
| Version | 1.0 |
| Owner | PROJECT365 Architecture |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR |
| Referenced By | Issue Specification, Acceptance Criteria, Implementation Prompt |

---

## 2. Purpose

Define the Technical Design for TD-018 Cluster Rotation Engine.

Cluster Rotation Engine exists to generate cluster rotation intelligence.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, or implementation details.

---

## 3. Scope

This Technical Design covers Cluster Rotation Engine as a Portfolio Intelligence component.

Included responsibilities:

- Upstream dependency declaration.
- Downstream consumer declaration.
- Public interface boundary.
- Internal workflow.
- Data contract ownership for Cluster Rotation Recommendation.
- Error handling boundary.
- Acceptance criteria.
- Traceability.

Excluded responsibilities:

- Responsibilities owned by upstream Market Intelligence or Portfolio Intelligence modules.
- Responsibilities owned by downstream Portfolio Intelligence, Governance, or Presentation modules.
- Foundation access or Foundation contract ownership.
- Source code or implementation-specific design.
- The module must not generate trades; execute portfolios; provide financial advice; access Foundation.

---

## 4. Background

PROJECT365 is approved as an Adaptive Crypto Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform. The approved architecture places Portfolio Intelligence downstream of Market Intelligence and upstream of Governance and Presentation.

Approved Portfolio Intelligence dependency chain:

```text
TD-014 OMS Engine
↓
TD-015 Exposure Engine
↓
TD-016 Portfolio Engine
↓
TD-017 Risk Engine
↓
TD-018 Cluster Rotation Engine
```

Cluster Rotation Engine occupies the TD-018 position in that chain and preserves Regime First, Single Source of Truth, Separation of Concerns, Hard Gate Principle, Explainability, Auditability, and approved dependency direction.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Portfolio Intelligence Domain requires explainable, auditable portfolio decision support derived from Market Intelligence. |
| PRD | Portfolio Intelligence Domain includes Exposure Engine, Portfolio Engine, Risk Engine, and Cluster Rotation Engine within approved product scope and business rules. |
| Architecture | Portfolio Intelligence transforms market intelligence into actionable exposure decisions and cannot access Foundation directly. |
| Product Map | Portfolio Intelligence owns exposure recommendations, portfolio intelligence, risk intelligence, and cluster rotation intelligence. |
| ADR | Modular Architecture, dependency direction, Hard Gate Principle, Explainable Decision System, Single Source of Truth, Separation of Concerns, and Auditability. |

Every technical decision in this document is traceable to approved Portfolio Intelligence responsibilities and dependency rules.

---

## 6. Design Overview

Cluster Rotation Engine consumes approved upstream outputs and produces Cluster Rotation Recommendation for approved downstream consumers.

Purpose:

- Generate cluster rotation intelligence.

Responsibilities:

- Accept only declared upstream contracts.
- Produce only Cluster Rotation Recommendation.
- Preserve Regime First and Hard Gate constraints carried through upstream Market Intelligence outputs.
- Preserve explainability metadata for downstream auditability.
- Reject incomplete or invalid upstream inputs.
- Preserve approved dependency direction.

Boundaries:

- Cluster Rotation Engine does not own upstream contract creation.
- Cluster Rotation Engine does not bypass downstream module ownership.
- Cluster Rotation Engine does not access Foundation directly.
- Cluster Rotation Engine does not modify immutable upstream outputs.
- The module must not generate trades; execute portfolios; provide financial advice; access Foundation.

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Input Boundary | Accept and validate declared upstream contracts. | Portfolio Assessment and Risk Assessment. | Accepted input set or rejection reason | Cluster Rotation Engine |
| Assessment Boundary | Apply the approved module responsibility without expanding product scope. | Accepted input set | Intermediate assessment context | Cluster Rotation Engine |
| Explainability Boundary | Preserve reasons, source references, and dependency context. | Assessment context | Explainability metadata | Cluster Rotation Engine |
| Output Boundary | Produce Cluster Rotation Recommendation for downstream consumers. | Assessment context and explainability metadata | Cluster Rotation Recommendation | Cluster Rotation Engine |
| Consumer Boundary | Expose Cluster Rotation Recommendation only to approved downstream consumers. | Cluster Rotation Recommendation request | Cluster Rotation Recommendation or unavailable status | Cluster Rotation Engine |

---

## 8. Data Model

Cluster Rotation Engine defines or owns the Cluster Rotation Recommendation contract and consumes upstream contracts without mutating them.

Consumed contracts:

- Portfolio Assessment and Risk Assessment.

Produced contract:

- Cluster Rotation Recommendation

Cluster Rotation Recommendation contract characteristics:

- Contract identity.
- Contract version.
- Evaluation timestamp or reference time.
- Upstream dependency references.
- Assessment value owned by Cluster Rotation Engine.
- Explainability summary.
- Auditability metadata.
- Validation status.
- Rejection reason when output cannot be produced.

Lifecycle:

```text
Receive upstream contracts
↓
Validate contract completeness and dependency order
↓
Evaluate only the approved Cluster Rotation Engine responsibility
↓
Attach explainability and auditability metadata
↓
Publish Cluster Rotation Recommendation to approved downstream consumers
```

---

## 9. Public Interfaces

### Input Interface

Inputs:

- Portfolio Assessment and Risk Assessment.

Outputs:

- Accepted input set or validation rejection.

Expected behavior:

- Accept only complete upstream contracts from approved dependencies.
- Preserve upstream contract identity and source references.
- Reject missing, stale, malformed, dependency-inverted, or Foundation-sourced inputs.

### Output Interface

Inputs:

- Accepted input set and assessment context.

Outputs:

- Cluster Rotation Recommendation.

Expected behavior:

- Produce a single explainable Cluster Rotation Recommendation for downstream consumers.
- Include dependency references and assessment rationale.
- Avoid responsibilities excluded from this Technical Design.

### Consumer Interface

Inputs:

- Downstream request from approved consumers.

Outputs:

- Cluster Rotation Recommendation or unavailable status.

Expected behavior:

- Serve only approved downstream consumers: Governance and Presentation.
- Preserve immutable output identity once published.

---

## 10. Internal Flow

1. Receive upstream input from approved dependency: Portfolio Assessment and Risk Assessment.
2. Validate input completeness, version, source references, and dependency order.
3. Reject invalid input without fabricating missing data.
4. Execute only the approved Cluster Rotation Engine assessment responsibility.
5. Preserve reasons and upstream references for explainability.
6. Produce Cluster Rotation Recommendation with validation status and audit metadata.
7. Expose Cluster Rotation Recommendation to downstream consumers: Governance and Presentation.

Approved dependency position:

```text
TD-014 OMS Engine
↓
TD-015 Exposure Engine
↓
TD-016 Portfolio Engine
↓
TD-017 Risk Engine
↓
TD-018 Cluster Rotation Engine
```

---

## 11. Error Handling

Validation:

- Required upstream contracts must be present.
- Upstream contracts must carry identity, version, timestamp, and source references.
- Dependency order must match the approved Portfolio Intelligence chain.
- Portfolio Intelligence input must be derived only through Market Intelligence and approved upstream Portfolio Intelligence outputs.
- Output must be explainable and auditable before publication.

Failure scenarios:

- Missing upstream input.
- Invalid upstream contract.
- Stale or inconsistent upstream references.
- Dependency inversion attempt.
- Direct Foundation access attempt.
- Output cannot be explained or audited.

Recovery strategy:

- Reject invalid inputs.
- Produce no fabricated assessment.
- Return unavailable or rejected status with reason.
- Preserve failure context for auditability.
- Allow downstream consumers to respect the absence of Cluster Rotation Recommendation.

---

## 12. Non-Functional Considerations

Performance:

- Assessment should be suitable for downstream Portfolio Intelligence sequencing without changing architecture.

Reliability:

- Repeated evaluation over the same immutable upstream references should be reproducible.

Maintainability:

- Module boundaries must remain independent and aligned to approved responsibilities.

Testability:

- Input validation, rejection behavior, output production, dependency order, and explainability metadata must be verifiable.

Scalability:

- The design permits additional approved upstream references without changing ownership boundaries.

Security:

- Outputs must be available only through approved interfaces and must not expose provider credentials or implementation internals.

Explainability:

- Cluster Rotation Recommendation must include reasons sufficient for downstream inspection.

Auditability:

- Cluster Rotation Recommendation must preserve upstream references and evaluation metadata for reproducibility.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- Glossary.
- ADR.
- Portfolio Assessment and Risk Assessment.

Downstream consumers:

- Governance and Presentation.

---

## 14. Assumptions

- Foundation outputs remain accessible to Portfolio Intelligence only through Market Intelligence and approved upstream Portfolio Intelligence outputs.
- Upstream Market Intelligence and Portfolio Intelligence outputs are complete before this module evaluates them.
- Approved terminology from the Glossary is authoritative.
- No implementation detail is required to define this Technical Design.

---

## 15. Constraints

- Preserve Regime First.
- Preserve Single Source of Truth.
- Preserve Separation of Concerns.
- Preserve Hard Gate Principle.
- Preserve Explainability.
- Preserve Auditability.
- Preserve approved dependency direction.
- Portfolio Intelligence depends only on Market Intelligence and approved upstream Portfolio Intelligence outputs.
- Portfolio Intelligence never accesses Foundation directly.
- Do not invent new business requirements.
- Do not invent new architecture.
- Do not introduce implementation details.
- Do not modify immutable upstream contracts.
- The module must not generate trades; execute portfolios; provide financial advice; access Foundation.

---

## 16. Out of Scope

- Source code changes.
- Provider access.
- Foundation access or contract changes.
- Market regime calculation.
- Overall Market Score calculation except where owned by TD-014 OMS Engine.
- Presentation behavior.
- Governance persistence behavior.
- Changes to BRD, PRD, Architecture, Product Map, Glossary, ADR, Roadmap, Backlog, Current Status, or existing Technical Designs.
- Any responsibility explicitly owned by another module in the approved dependency chain.

---

## 17. Implementation Notes

Implementation work must be defined by future Issue Specifications and must conform to this Technical Design.

Implementation guidance:

- Use approved upstream contracts only.
- Preserve module boundaries.
- Preserve output immutability after publication.
- Preserve explainability and auditability metadata.
- Validate dependency direction before producing Cluster Rotation Recommendation.
- Do not include implementation code in this Technical Design.

Acceptance Criteria:

- Cluster Rotation Engine declares upstream dependencies.
- Cluster Rotation Engine declares downstream consumers.
- Cluster Rotation Engine defines public interfaces.
- Cluster Rotation Engine defines internal workflow.
- Cluster Rotation Engine defines consumed and produced data contracts.
- Cluster Rotation Engine defines error handling.
- Cluster Rotation Engine preserves Regime First.
- Cluster Rotation Engine preserves Single Source of Truth.
- Cluster Rotation Engine preserves Separation of Concerns.
- Cluster Rotation Engine preserves Hard Gate Principle.
- Cluster Rotation Engine preserves Explainability.
- Cluster Rotation Engine preserves Auditability.
- Cluster Rotation Engine preserves approved dependency direction.
- Cluster Rotation Engine produces Cluster Rotation Recommendation only.
- Cluster Rotation Engine does not access Foundation directly.
- The module must not generate trades; execute portfolios; provide financial advice; access Foundation.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Portfolio Intelligence Domain, business rules, roadmap context, explainability, auditability. |
| PRD | Product scope, Portfolio Intelligence modules, constraints, roadmap context, business rules. |
| Architecture | Domain responsibilities, module responsibilities, data flow, dependency rules. |
| Product Map | Portfolio Intelligence module hierarchy and domain responsibilities. |
| ADR | Modular Architecture, dependency direction, Hard Gate Principle, Explainable Decision System. |

---

## 19. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- Roadmap
- Backlog
- TD-014 OMS Engine
- TD-015 Exposure Engine
- TD-016 Portfolio Engine
- TD-017 Risk Engine
- TD-018 Cluster Rotation Engine

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Technical Design for TD-018 Cluster Rotation Engine. |
