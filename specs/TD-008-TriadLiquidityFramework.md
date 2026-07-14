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

Define the Technical Design for TD-008 Triad Liquidity Framework.

Triad Liquidity Framework exists to transform delta information into liquidity metrics.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, or implementation details.

---

## 3. Scope

This Technical Design covers Triad Liquidity Framework as a Market Intelligence component.

Included responsibilities:

- Upstream dependency declaration.
- Downstream consumer declaration.
- Public interface boundary.
- Internal workflow.
- Data contract ownership for Liquidity Assessment.
- Error handling boundary.
- Acceptance criteria.
- Traceability.

Excluded responsibilities:

- Responsibilities owned by upstream Foundation or Market Intelligence modules.
- Responsibilities owned by downstream Market Intelligence modules.
- Portfolio Intelligence decisions or recommendations.
- Governance storage or presentation behavior.
- Source code or implementation-specific design.
- The module must not determine regime; generate recommendations.

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

Triad Liquidity Framework occupies the TD-008 position in that chain and preserves Single Source of Truth, Separation of Concerns, Hard Gate Principle, Explainability, Auditability, and approved dependency direction.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Market Intelligence Domain includes Triad Liquidity Framework and requires explainable, auditable market intelligence. |
| PRD | Market Intelligence Domain includes Triad Liquidity Framework within the approved product scope and business rules. |
| Architecture | Market Intelligence owns market deltas, liquidity analysis, regime analysis, capital flow analysis, market state assessment, confidence, and overall market scoring. |
| Product Map | Market Intelligence module map includes Triad Liquidity Framework in the approved module hierarchy. |
| ADR | Modular Architecture, dependency direction, Hard Gate Principle, Explainable Decision System, Single Source of Truth, Separation of Concerns, and Auditability. |

Every technical decision in this document is traceable to approved Market Intelligence responsibilities and dependency rules.

---

## 6. Design Overview

Triad Liquidity Framework consumes approved upstream outputs and produces Liquidity Assessment for approved downstream consumers.

Purpose:

- Transform delta information into liquidity metrics.

Responsibilities:

- Accept only declared upstream contracts.
- Produce only Liquidity Assessment.
- Preserve explainability metadata for downstream auditability.
- Reject incomplete or invalid upstream inputs.
- Preserve approved dependency direction.

Boundaries:

- Triad Liquidity Framework does not own upstream contract creation.
- Triad Liquidity Framework does not bypass downstream module ownership.
- Triad Liquidity Framework does not create portfolio recommendations.
- Triad Liquidity Framework does not access external providers directly.
- Triad Liquidity Framework does not modify immutable Foundation objects or upstream Market Intelligence outputs.

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Input Boundary | Accept and validate declared upstream contracts. | Delta Contract from Delta Engine. | Accepted input set or rejection reason | Triad Liquidity Framework |
| Assessment Boundary | Apply the approved module responsibility without expanding product scope. | Accepted input set | Intermediate assessment context | Triad Liquidity Framework |
| Explainability Boundary | Preserve reasons, source references, and dependency context. | Assessment context | Explainability metadata | Triad Liquidity Framework |
| Output Boundary | Produce Liquidity Assessment for downstream consumers. | Assessment context and explainability metadata | Liquidity Assessment | Triad Liquidity Framework |
| Consumer Boundary | Expose Liquidity Assessment only to approved downstream consumers. | Liquidity Assessment request | Liquidity Assessment or unavailable status | Triad Liquidity Framework |

---

## 8. Data Model

Triad Liquidity Framework defines or owns the Liquidity Assessment contract and consumes upstream contracts without mutating them.

Consumed contracts:

- Delta Contract from Delta Engine.

Produced contract:

- Liquidity Assessment

Liquidity Assessment contract characteristics:

- Contract identity.
- Contract version.
- Evaluation timestamp or reference time.
- Upstream dependency references.
- Assessment value owned by Triad Liquidity Framework.
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
Evaluate only the approved Triad Liquidity Framework responsibility
↓
Attach explainability and auditability metadata
↓
Publish Liquidity Assessment to approved downstream consumers
```

---

## 9. Public Interfaces

### Input Interface

Inputs:

- Delta Contract from Delta Engine.

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

- Liquidity Assessment.

Expected behavior:

- Produce a single explainable Liquidity Assessment for downstream consumers.
- Include dependency references and assessment rationale.
- Avoid portfolio decisions, recommendations, or presentation behavior.

### Consumer Interface

Inputs:

- Downstream request from approved consumers.

Outputs:

- Liquidity Assessment or unavailable status.

Expected behavior:

- Serve only approved downstream consumers: Regime Engine, LDS Engine, Capital Flow Engine, Market State Engine.
- Preserve immutable output identity once published.

---

## 10. Internal Flow

1. Receive upstream input from TD-007 Delta Engine.
2. Validate input completeness, version, source references, and dependency order.
3. Reject invalid input without fabricating missing data.
4. Execute only the approved Triad Liquidity Framework assessment responsibility.
5. Preserve reasons and upstream references for explainability.
6. Produce Liquidity Assessment with validation status and audit metadata.
7. Expose Liquidity Assessment to downstream consumers: Regime Engine, LDS Engine, Capital Flow Engine, Market State Engine.

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
- Allow downstream consumers to respect the absence of Liquidity Assessment.

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

- Liquidity Assessment must include reasons sufficient for downstream inspection.

Auditability:

- Liquidity Assessment must preserve upstream references and evaluation metadata for reproducibility.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- Glossary.
- ADR.
- TD-007 Delta Engine.

Downstream consumers:

- Regime Engine, LDS Engine, Capital Flow Engine, Market State Engine.

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
- Validate dependency direction before producing Liquidity Assessment.
- Do not include implementation code in this Technical Design.

Acceptance Criteria:

- Triad Liquidity Framework declares upstream dependencies.
- Triad Liquidity Framework declares downstream consumers.
- Triad Liquidity Framework defines public interfaces.
- Triad Liquidity Framework defines internal workflow.
- Triad Liquidity Framework defines consumed and produced data contracts.
- Triad Liquidity Framework defines error handling.
- Triad Liquidity Framework preserves Single Source of Truth.
- Triad Liquidity Framework preserves Separation of Concerns.
- Triad Liquidity Framework preserves Hard Gate Principle.
- Triad Liquidity Framework preserves Explainability.
- Triad Liquidity Framework preserves Auditability.
- Triad Liquidity Framework preserves approved dependency direction.
- Triad Liquidity Framework produces Liquidity Assessment only.
- Triad Liquidity Framework does not determine regime; generate recommendations.

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
- TD-007 Delta Engine

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial Technical Design for TD-008 Triad Liquidity Framework. |
