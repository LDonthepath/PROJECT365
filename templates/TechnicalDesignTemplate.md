# Technical Design

## 1. Document Information

| Field | Value |
|------|------|
| Status | Draft / Active / Approved / Frozen |
| Version | 1.0 |
| Owner | |
| Last Updated | |
| Depends On | BRD, PRD, Architecture, Product Map, ADR |
| Referenced By | Issue Specification, Acceptance Criteria, Implementation Prompt |

---

## 2. Purpose

Describe the technical objective of this document.

This document translates approved product requirements into an implementable technical design.

Do not redefine business requirements or architecture.

---

## 3. Scope

Describe what this Technical Design covers.

Include:

- Components
- Modules
- Responsibilities

Exclude implementation details that belong to Issue Specifications.

---

## 4. Background

Summarize the upstream context.

Reference:

- BRD
- PRD
- Architecture
- Product Map
- ADR

Do not duplicate those documents.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | |
| PRD | |
| Architecture | |
| Product Map | |
| ADR | |

Every technical decision must be traceable.

---

## 6. Design Overview

Provide a high-level description of the design.

Explain:

- purpose
- responsibilities
- boundaries

Do not include implementation code.

---

## 7. Component Responsibilities

Describe each component.

For every component specify:

- Responsibility
- Inputs
- Outputs
- Owner

One responsibility per component.

---

## 8. Data Model

Describe:

- entities
- objects
- contracts
- lifecycle

No implementation code.

---

## 9. Public Interfaces

Describe exposed interfaces.

Include:

- Inputs
- Outputs
- Expected behavior

No implementation.

---

## 10. Internal Flow

Describe the internal execution flow.

Include:

- processing sequence
- dependencies
- interactions

---

## 11. Error Handling

Describe:

- validation
- failure scenarios
- recovery strategy

---

## 12. Non-Functional Considerations

Describe applicable requirements, such as:

- Performance
- Reliability
- Maintainability
- Testability
- Scalability
- Security

---

## 13. Dependencies

List upstream dependencies.

Example:

- Architecture
- Product Map
- ADR
- Shared Contracts

---

## 14. Assumptions

Document assumptions made by this design.

---

## 15. Constraints

Document design constraints.

Include only approved constraints.

---

## 16. Out of Scope

Explicitly list what is NOT covered.

---

## 17. Implementation Notes

Implementation guidance.

Do not include source code.

Do not duplicate Issue Specifications.

Acceptance Criteria:

- Criteria must be measurable and verifiable.
- Criteria must name the accepted input, output, dependency, rejection behavior, or invariant.
- Criteria must avoid ambiguous wording such as "appropriate", "robust", or "user-friendly" unless a measurable standard is defined.
- Criteria must not introduce implementation tasks that belong in Issue Specifications.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | |
| PRD | |
| Architecture | |
| Product Map | |
| ADR | |

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

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | YYYY-MM-DD | Initial template |