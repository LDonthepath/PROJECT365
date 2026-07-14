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

Define the Technical Design for TD-020 Validation Framework.

Validation Framework exists to validate outputs against approved rules and Acceptance Criteria.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, or implementation details.

---

## 3. Scope

This Technical Design covers Validation Framework as a Governance component.

Included responsibilities:

- Upstream dependency declaration.
- Downstream consumer declaration.
- Public interface boundary.
- Internal workflow.
- Data contract ownership for Validation Results.
- Error handling boundary.
- Acceptance criteria.
- Traceability.

Excluded responsibilities:

- Responsibilities owned by upstream Portfolio Intelligence or other Governance modules.
- Responsibilities owned by downstream Presentation modules.
- Foundation, Market Intelligence, or Portfolio Intelligence calculation ownership.
- Source code or implementation-specific design.
- The module must not modify original outputs; recalculate market intelligence; change portfolio outputs.

---

## 4. Background

PROJECT365 is approved as an Adaptive Crypto Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform. The approved architecture places Governance downstream of Portfolio Intelligence and upstream of Presentation.

Approved Governance dependency chain:

```text
TD-018 Cluster Rotation Engine
↓
TD-019 Decision Log
↓
TD-020 Validation Framework
↓
TD-021 Champion-Challenger Framework
↓
TD-022 Model Versioning
↓
TD-023 Rollback Framework
```

Validation Framework occupies the TD-020 position in that chain and preserves Hard Gate Principle, Single Source of Truth, Separation of Concerns, Explainability, Auditability, and approved dependency direction.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Governance Domain includes Decision Log, Validation Framework, Champion-Challenger, Model Versioning, and Rollback Framework and states Governance never calculates scores. |
| PRD | Governance Domain includes the approved Governance modules and preserves approved business rules, constraints, explainability, and auditability. |
| Architecture | Governance provides explainability and auditability, records and validates decision-support outputs, tracks model and rule versions, and supports rollback without calculating scores. |
| Product Map | Governance owns decision logs, validation, model versioning, champion-challenger support, and rollback support for explainability and auditability. |
| ADR | Modular Architecture, dependency direction, Hard Gate Principle, Explainable Decision System, Single Source of Truth, Separation of Concerns, and Auditability. |

Every technical decision in this document is traceable to approved Governance responsibilities and dependency rules.

---

## 6. Design Overview

Validation Framework consumes Decision Records and produces Validation Results for approved downstream consumers.

Purpose:

- Validate outputs against approved rules and Acceptance Criteria.

Responsibilities:

- Accept only declared upstream contracts.
- Produce only Validation Results.
- Validate and record only within the approved Governance responsibility.
- Preserve original Portfolio Intelligence outputs without recalculation or modification.
- Preserve explainability metadata for downstream auditability.
- Reject incomplete or invalid upstream inputs.
- Preserve approved dependency direction.

Boundaries:

- Validation Framework does not own upstream contract creation.
- Validation Framework does not bypass downstream module ownership.
- Validation Framework does not access Foundation directly.
- Validation Framework does not modify immutable upstream outputs.
- Governance never recalculates market intelligence.
- Governance never changes portfolio outputs.
- Governance validates and records only.
- The module must not modify original outputs; recalculate market intelligence; change portfolio outputs.

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Input Boundary | Accept and validate declared upstream contracts. | Decision Records. | Accepted input set or rejection reason | Validation Framework |
| Governance Boundary | Apply the approved module responsibility without expanding product scope. | Accepted input set | Governance context | Validation Framework |
| Explainability Boundary | Preserve reasons, source references, and dependency context. | Governance context | Explainability metadata | Validation Framework |
| Output Boundary | Produce Validation Results for downstream consumers. | Governance context and explainability metadata | Validation Results | Validation Framework |
| Consumer Boundary | Expose Validation Results only to approved downstream consumers. | Validation Results request | Validation Results or unavailable status | Validation Framework |

---

## 8. Data Model

Validation Framework defines or owns the Validation Results contract and consumes upstream contracts without mutating them.

Consumed contracts:

- Decision Records.

Produced contract:

- Validation Results.

Validation Results contract characteristics:

- Contract identity.
- Contract version.
- Evaluation timestamp or reference time.
- Upstream dependency references.
- Governance status owned by Validation Framework.
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
Apply only the approved Validation Framework responsibility
↓
Attach explainability and auditability metadata
↓
Publish Validation Results to approved downstream consumers
```

---

## 9. Public Interfaces

### Input Interface

Inputs:

- Decision Records.

Outputs:

- Accepted input set or validation rejection.

Expected behavior:

- Accept only complete upstream contracts from approved dependencies.
- Preserve upstream contract identity and source references.
- Reject missing, stale, malformed, dependency-inverted, recalculated, or Foundation-sourced inputs.

### Output Interface

Inputs:

- Accepted input set and governance context.

Outputs:

- Validation Results.

Expected behavior:

- Produce a single explainable Validation Results output for downstream consumers.
- Include dependency references and governance rationale.
- Avoid responsibilities excluded from this Technical Design.

### Consumer Interface

Inputs:

- Downstream request from approved consumers.

Outputs:

- Validation Results or unavailable status.

Expected behavior:

- Serve only approved downstream consumers: TD-021 Champion-Challenger Framework, Governance, and Presentation.
- Preserve immutable output identity once published.

---

## 10. Internal Flow

1. Receive upstream input from approved dependency: TD-019 Decision Log.
2. Validate input completeness, version, source references, and dependency order.
3. Reject invalid input without fabricating missing data.
4. Execute only the approved Validation Framework governance responsibility.
5. Preserve reasons and upstream references for explainability.
6. Produce Validation Results with validation status and audit metadata.
7. Expose Validation Results to downstream consumers: TD-021 Champion-Challenger Framework, Governance, and Presentation.

Approved dependency position:

```text
TD-018 Cluster Rotation Engine
↓
TD-019 Decision Log
↓
TD-020 Validation Framework
↓
TD-021 Champion-Challenger Framework
↓
TD-022 Model Versioning
↓
TD-023 Rollback Framework
```

---

## 11. Error Handling

Validation:

- Required upstream contracts must be present.
- Upstream contracts must carry identity, version, timestamp, and source references.
- Dependency order must match the approved Governance chain.
- Governance input must be derived only through approved Portfolio Intelligence and upstream Governance outputs.
- Output must be explainable and auditable before publication.

Failure scenarios:

- Missing upstream input.
- Invalid upstream contract.
- Stale or inconsistent upstream references.
- Dependency inversion attempt.
- Direct Foundation access attempt.
- Market intelligence recalculation attempt.
- Portfolio output modification attempt.
- Output cannot be explained or audited.

Recovery strategy:

- Reject invalid inputs.
- Produce no fabricated governance output.
- Return unavailable or rejected status with reason.
- Preserve failure context for auditability.
- Allow downstream consumers to respect the absence of Validation Results.

---

## 12. Non-Functional Considerations

Performance:

- Governance processing should be suitable for downstream sequencing without changing architecture.

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

- Validation Results must include reasons sufficient for downstream inspection.

Auditability:

- Validation Results must preserve upstream references and evaluation metadata for reproducibility.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- Glossary.
- ADR.
- TD-019 Decision Log.
- Decision Records.

Downstream consumers:

- TD-021 Champion-Challenger Framework, Governance, and Presentation.

---

## 14. Assumptions

- Governance receives complete upstream Portfolio Intelligence or Governance outputs before this module evaluates them.
- Upstream outputs are immutable inputs for Governance.
- Approved terminology from the Glossary is authoritative.
- No implementation detail is required to define this Technical Design.

---

## 15. Constraints

- Preserve Single Source of Truth.
- Preserve Separation of Concerns.
- Preserve Hard Gate Principle.
- Preserve Explainability.
- Preserve Auditability.
- Preserve approved dependency direction.
- Governance depends only on Portfolio Intelligence and approved upstream Governance outputs.
- Governance never recalculates market intelligence.
- Governance never changes portfolio outputs.
- Governance validates and records only.
- Do not invent new business requirements.
- Do not invent new architecture.
- Do not introduce implementation details.
- Do not modify immutable upstream contracts.
- The module must not modify original outputs; recalculate market intelligence; change portfolio outputs.

---

## 16. Out of Scope

- Source code changes.
- Provider access.
- Foundation access or contract changes.
- Market intelligence calculation.
- Portfolio output calculation or modification.
- Presentation behavior.
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
- Validate dependency direction before producing Validation Results.
- Do not include implementation code in this Technical Design.

Acceptance Criteria:

- Validation Framework declares upstream dependencies.
- Validation Framework declares downstream consumers.
- Validation Framework defines public interfaces.
- Validation Framework defines internal workflow.
- Validation Framework defines consumed and produced data contracts.
- Validation Framework defines error handling.
- Validation Framework preserves Single Source of Truth.
- Validation Framework preserves Separation of Concerns.
- Validation Framework preserves Hard Gate Principle.
- Validation Framework preserves Explainability.
- Validation Framework preserves Auditability.
- Validation Framework preserves approved dependency direction.
- Validation Framework produces Validation Results only.
- Validation Framework does not recalculate market intelligence.
- Validation Framework does not change portfolio outputs.
- Governance validates and records only.
- The module must not modify original outputs; recalculate market intelligence; change portfolio outputs.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Governance Domain, business rules, roadmap context, explainability, auditability. |
| PRD | Product scope, Governance modules, constraints, roadmap context, business rules. |
| Architecture | Domain responsibilities, module responsibilities, data flow, dependency rules. |
| Product Map | Governance module hierarchy and domain responsibilities. |
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
- TD-019 Decision Log
- TD-020 Validation Framework

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Technical Design for TD-020 Validation Framework. |
