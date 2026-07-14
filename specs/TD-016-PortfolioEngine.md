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

Define the Technical Design for TD-016 Portfolio Engine.

Portfolio Engine exists to transform exposure recommendations into portfolio intelligence.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, or implementation details.

---

## 3. Scope

This Technical Design covers Portfolio Engine as a Portfolio Intelligence component.

Included responsibilities:

- Upstream dependency declaration.
- Downstream consumer declaration.
- Public interface boundary.
- Internal workflow.
- Data contract ownership for Portfolio Assessment.
- Error handling boundary.
- Acceptance criteria.
- Traceability.

Excluded responsibilities:

- Responsibilities owned by upstream Market Intelligence or Portfolio Intelligence modules.
- Responsibilities owned by downstream Portfolio Intelligence, Governance, or Presentation modules.
- Foundation access or Foundation contract ownership.
- Source code or implementation-specific design.
- The module must not calculate market regime; perform risk calculations; access Foundation.

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

Portfolio Engine occupies the TD-016 position in that chain and preserves Regime First, Single Source of Truth, Separation of Concerns, Hard Gate Principle, Explainability, Auditability, and approved dependency direction.

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

Portfolio Engine consumes approved upstream outputs and produces Portfolio Assessment for approved downstream consumers.

Purpose:

- Transform exposure recommendations into portfolio intelligence.

Responsibilities:

- Accept only declared upstream contracts.
- Produce only Portfolio Assessment.
- Preserve Regime First and Hard Gate constraints carried through upstream Market Intelligence outputs.
- Preserve explainability metadata for downstream auditability.
- Reject incomplete or invalid upstream inputs.
- Preserve approved dependency direction.

Boundaries:

- Portfolio Engine does not own upstream contract creation.
- Portfolio Engine does not bypass downstream module ownership.
- Portfolio Engine does not access Foundation directly.
- Portfolio Engine does not modify immutable upstream outputs.
- The module must not calculate market regime; perform risk calculations; access Foundation.

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Input Boundary | Accept and validate declared upstream contracts. | Exposure Recommendation. | Accepted input set or rejection reason | Portfolio Engine |
| Assessment Boundary | Apply the approved module responsibility without expanding product scope. | Accepted input set | Intermediate assessment context | Portfolio Engine |
| Explainability Boundary | Preserve reasons, source references, and dependency context. | Assessment context | Explainability metadata | Portfolio Engine |
| Output Boundary | Produce Portfolio Assessment for downstream consumers. | Assessment context and explainability metadata | Portfolio Assessment | Portfolio Engine |
| Consumer Boundary | Expose Portfolio Assessment only to approved downstream consumers. | Portfolio Assessment request | Portfolio Assessment or unavailable status | Portfolio Engine |

---

## 8. Data Model

Portfolio Engine defines or owns the Portfolio Assessment contract and consumes upstream contracts without mutating them.

Consumed contracts:

- Exposure Recommendation.

Produced contract:

- Portfolio Assessment

Portfolio Assessment contract characteristics:

- Contract identity.
- Contract version.
- Evaluation timestamp or reference time.
- Upstream dependency references.
- Assessment value owned by Portfolio Engine.
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
Evaluate only the approved Portfolio Engine responsibility
↓
Attach explainability and auditability metadata
↓
Publish Portfolio Assessment to approved downstream consumers
```

---

## 9. Public Interfaces

### Input Interface

Inputs:

- Exposure Recommendation.

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

- Portfolio Assessment.

Expected behavior:

- Produce a single explainable Portfolio Assessment for downstream consumers.
- Include dependency references and assessment rationale.
- Avoid responsibilities excluded from this Technical Design.

### Consumer Interface

Inputs:

- Downstream request from approved consumers.

Outputs:

- Portfolio Assessment or unavailable status.

Expected behavior:

- Serve only approved downstream consumers: Risk Engine.
- Preserve immutable output identity once published.

---

## 10. Internal Flow

1. Receive upstream input from approved dependency: Exposure Recommendation.
2. Validate input completeness, version, source references, and dependency order.
3. Reject invalid input without fabricating missing data.
4. Execute only the approved Portfolio Engine assessment responsibility.
5. Preserve reasons and upstream references for explainability.
6. Produce Portfolio Assessment with validation status and audit metadata.
7. Expose Portfolio Assessment to downstream consumers: Risk Engine.

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
- Allow downstream consumers to respect the absence of Portfolio Assessment.

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

- Portfolio Assessment must include reasons sufficient for downstream inspection.

Auditability:

- Portfolio Assessment must preserve upstream references and evaluation metadata for reproducibility.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- Glossary.
- ADR.
- Exposure Recommendation.

Downstream consumers:

- Risk Engine.

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
- The module must not calculate market regime; perform risk calculations; access Foundation.

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
- Validate dependency direction before producing Portfolio Assessment.
- Do not include implementation code in this Technical Design.

Acceptance Criteria:

- Portfolio Engine declares upstream dependencies.
- Portfolio Engine declares downstream consumers.
- Portfolio Engine defines public interfaces.
- Portfolio Engine defines internal workflow.
- Portfolio Engine defines consumed and produced data contracts.
- Portfolio Engine defines error handling.
- Portfolio Engine preserves Regime First.
- Portfolio Engine preserves Single Source of Truth.
- Portfolio Engine preserves Separation of Concerns.
- Portfolio Engine preserves Hard Gate Principle.
- Portfolio Engine preserves Explainability.
- Portfolio Engine preserves Auditability.
- Portfolio Engine preserves approved dependency direction.
- Portfolio Engine produces Portfolio Assessment only.
- Portfolio Engine does not access Foundation directly.
- The module must not calculate market regime; perform risk calculations; access Foundation.

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
| 1.0 | 2026-07-14 | Initial Technical Design for TD-016 Portfolio Engine. |
