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

Define the Technical Design for TD-014 OMS Engine.

OMS Engine exists to produce Overall Market Score as the final Market Intelligence output.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, or implementation details.

---

## 3. Scope

This Technical Design covers OMS Engine as a Market Intelligence component.

Included responsibilities:

- Upstream dependency declaration.
- Downstream consumer declaration.
- Public interface boundary.
- Internal workflow.
- Data contract ownership for Overall Market Score.
- Error handling boundary.
- Acceptance criteria.
- Traceability.

Excluded responsibilities:

- Responsibilities owned by upstream Foundation or Market Intelligence modules.
- Responsibilities owned by downstream Market Intelligence modules.
- Portfolio Intelligence decisions or recommendations.
- Governance storage or presentation behavior.
- Source code or implementation-specific design.
- The module must not generate portfolio recommendations; modify Market State or Confidence.

---

## 4. Background

PROJECT365 is approved as an Adaptive Crypto Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform. The approved architecture places Market Intelligence downstream of Foundation and upstream of Portfolio Intelligence, Governance, and Presentation.

Approved Market Intelligence dependency chain:

```text
Foundation
↓
TD-007 Delta Engine
↓
TD-008 Triad Liquidity Framework
↓
TD-009 Regime Engine
↓
TD-010 LDS Engine
↓
TD-011 Capital Flow Engine
↓
TD-012 Market State Engine
↓
TD-013 Confidence Engine
↓
TD-014 OMS Engine
```

OMS Engine occupies the TD-014 position in that chain and preserves Single Source of Truth, Separation of Concerns, Hard Gate Principle, Explainability, Auditability, and approved dependency direction.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Market Intelligence Domain includes OMS Engine and requires explainable, auditable market intelligence. |
| PRD | Market Intelligence Domain includes OMS Engine within the approved product scope and business rules. |
| Architecture | Market Intelligence owns market deltas, liquidity analysis, regime analysis, capital flow analysis, market state assessment, confidence, and overall market scoring. |
| Product Map | Market Intelligence module map includes OMS Engine in the approved module hierarchy. |
| ADR | Modular Architecture, dependency direction, Hard Gate Principle, Explainable Decision System, Single Source of Truth, Separation of Concerns, and Auditability. |

Every technical decision in this document is traceable to approved Market Intelligence responsibilities and dependency rules.

---

## 6. Design Overview

OMS Engine consumes approved upstream outputs and produces Overall Market Score for approved downstream consumers.

Purpose:

- Produce Overall Market Score as the final Market Intelligence output.

Responsibilities:

- Accept only declared upstream contracts.
- Produce only Overall Market Score.
- Preserve explainability metadata for downstream auditability.
- Reject incomplete or invalid upstream inputs.
- Preserve approved dependency direction.

Boundaries:

- OMS Engine does not own upstream contract creation.
- OMS Engine does not bypass downstream module ownership.
- OMS Engine does not create portfolio recommendations.
- OMS Engine does not access external providers directly.
- OMS Engine does not modify immutable Foundation objects or upstream Market Intelligence outputs.

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Input Boundary | Accept and validate declared upstream contracts. | Market State and Confidence Score. | Accepted input set or rejection reason | OMS Engine |
| Assessment Boundary | Apply the approved module responsibility without expanding product scope. | Accepted input set | Intermediate assessment context | OMS Engine |
| Explainability Boundary | Preserve reasons, source references, and dependency context. | Assessment context | Explainability metadata | OMS Engine |
| Output Boundary | Produce Overall Market Score for downstream consumers. | Assessment context and explainability metadata | Overall Market Score | OMS Engine |
| Consumer Boundary | Expose Overall Market Score only to approved downstream consumers. | Overall Market Score request | Overall Market Score or unavailable status | OMS Engine |

---

## 8. Data Model

OMS Engine defines or owns the Overall Market Score contract and consumes upstream contracts without mutating them.

Consumed contracts:

- Market State and Confidence Score.

Produced contract:

- Overall Market Score

Overall Market Score contract characteristics:

- Contract identity.
- Contract version.
- Evaluation timestamp or reference time.
- Upstream dependency references.
- Assessment value owned by OMS Engine.
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
Evaluate only the approved OMS Engine responsibility
↓
Attach explainability and auditability metadata
↓
Publish Overall Market Score to approved downstream consumers
```

---

## 9. Public Interfaces

### Input Interface

Inputs:

- Market State and Confidence Score.

Outputs:

- Accepted input set or validation rejection.

Expected behavior:

- Accept only complete upstream contracts from approved dependencies.
- Preserve upstream contract identity and source references.
- Reject missing, stale, malformed, or dependency-inverted inputs.

### Output Interface

Inputs:

- Accepted input set and assessment context.

Outputs:

- Overall Market Score.

Expected behavior:

- Produce a single explainable Overall Market Score for downstream consumers.
- Include dependency references and assessment rationale.
- Avoid portfolio decisions, recommendations, or presentation behavior.

### Consumer Interface

Inputs:

- Downstream request from approved consumers.

Outputs:

- Overall Market Score or unavailable status.

Expected behavior:

- Serve only approved downstream consumers: Portfolio Intelligence, Governance, Presentation.
- Preserve immutable output identity once published.

---

## 10. Internal Flow

1. Receive upstream input from TD-012 Market State Engine, TD-013 Confidence Engine.
2. Validate input completeness, version, source references, and dependency order.
3. Reject invalid input without fabricating missing data.
4. Execute only the approved OMS Engine assessment responsibility.
5. Preserve reasons and upstream references for explainability.
6. Produce Overall Market Score with validation status and audit metadata.
7. Expose Overall Market Score to downstream consumers: Portfolio Intelligence, Governance, Presentation.

Approved dependency position:

```text
Foundation
↓
TD-007 Delta Engine
↓
TD-008 Triad Liquidity Framework
↓
TD-009 Regime Engine
↓
TD-010 LDS Engine
↓
TD-011 Capital Flow Engine
↓
TD-012 Market State Engine
↓
TD-013 Confidence Engine
↓
TD-014 OMS Engine
```

---

## 11. Error Handling

Validation:

- Required upstream contracts must be present.
- Upstream contracts must carry identity, version, timestamp, and source references.
- Dependency order must match the approved Market Intelligence chain.
- Output must be explainable and auditable before publication.

Failure scenarios:

- Missing upstream input.
- Invalid upstream contract.
- Stale or inconsistent upstream references.
- Dependency inversion attempt.
- Output cannot be explained or audited.

Recovery strategy:

- Reject invalid inputs.
- Produce no fabricated assessment.
- Return unavailable or rejected status with reason.
- Preserve failure context for auditability.
- Allow downstream consumers to respect the absence of Overall Market Score.

---

## 12. Non-Functional Considerations

Performance:

- Assessment should be suitable for downstream Market Intelligence sequencing without changing architecture.

Reliability:

- Repeated evaluation over the same immutable upstream references should be reproducible.

Maintainability:

- Module boundaries must remain independent and aligned to approved responsibilities.

Testability:

- Input validation, rejection behavior, output production, dependency order, and explainability metadata must be verifiable.

Scalability:

- The design permits additional approved upstream data references without changing ownership boundaries.

Security:

- Outputs must be available only through approved interfaces and must not expose provider credentials or implementation internals.

Explainability:

- Overall Market Score must include reasons sufficient for downstream inspection.

Auditability:

- Overall Market Score must preserve upstream references and evaluation metadata for reproducibility.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- Glossary.
- ADR.
- TD-012 Market State Engine, TD-013 Confidence Engine.

Downstream consumers:

- Portfolio Intelligence, Governance, Presentation.

---

## 14. Assumptions

- Foundation outputs are immutable and remain the Single Source of Truth for market data and snapshots.
- Upstream Market Intelligence outputs are complete before this module evaluates them.
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
- Do not invent new business requirements.
- Do not invent new architecture.
- Do not introduce implementation details.
- Do not generate portfolio recommendations.
- Do not modify immutable upstream contracts.

---

## 16. Out of Scope

- Source code changes.
- Provider access.
- Foundation contract changes.
- Portfolio recommendations or decisions.
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
- Validate dependency direction before producing Overall Market Score.
- Do not include implementation code in this Technical Design.

Acceptance Criteria:

- OMS Engine declares upstream dependencies.
- OMS Engine declares downstream consumers.
- OMS Engine defines public interfaces.
- OMS Engine defines internal workflow.
- OMS Engine defines consumed and produced data contracts.
- OMS Engine defines error handling.
- OMS Engine preserves Single Source of Truth.
- OMS Engine preserves Separation of Concerns.
- OMS Engine preserves Hard Gate Principle.
- OMS Engine preserves Explainability.
- OMS Engine preserves Auditability.
- OMS Engine preserves approved dependency direction.
- OMS Engine produces Overall Market Score only.
- OMS Engine does not generate portfolio recommendations; modify Market State or Confidence.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Market Intelligence Domain, business rules, roadmap context, explainability, auditability. |
| PRD | Product scope, Market Intelligence modules, constraints, roadmap context, business rules. |
| Architecture | Domain responsibilities, module responsibilities, data flow, dependency rules. |
| Product Map | Market Intelligence module hierarchy and domain responsibilities. |
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
- TD-000 Data Provider Framework
- TD-001 MarketData Contract
- TD-002 Health Layer
- TD-003 Snapshot Engine
- TD-004 Data Service
- TD-005 Event Bus
- TD-006 Storage Layer
- TD-012 Market State Engine, TD-013 Confidence Engine

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Technical Design for TD-014 OMS Engine. |
