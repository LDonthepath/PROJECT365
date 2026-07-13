# Project Context

## 1. Document Information

- **Project:** PROJECT365
- **Document Type:** Project Context
- **Status:** Active
- **Version:** 1.0
- **Owner:** PROJECT365 Governance
- **Last Updated:** 2026-07-13
- **Depends On:** [BRD](./BRD.md), [PRD](./PRD.md), [Architecture](./Architecture.md), [Product Map](./ProductMap.md), [Glossary](./Glossary.md), [Architecture Decision Records](./Decisions.md), [Roadmap](./Roadmap.md), [Backlog](./Backlog.md), [Current Status](./CurrentStatus.md)
- **Referenced By:** Project onboarding, documentation reviews, Technical Design documents, Issue Specifications, Acceptance Criteria, Implementation Prompts

## 2. Purpose

This Project Context document is the permanent high-level orientation document for PROJECT365.

It explains where PROJECT365 context lives, how authoritative governance documents relate to one another, and how contributors should navigate the documentation set before creating Technical Design documents, Issue Specifications, Acceptance Criteria, or implementation work.

This document does not define business requirements, product requirements, architecture, implementation status, sprint progress, or issue progress.

## 3. Project Overview

PROJECT365 is an Adaptive Crypto Market Intelligence Platform.

PROJECT365 is documented as a Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform. The approved product context, scope, constraints, requirements, domain model, architecture, terminology, delivery planning, and delivery status are maintained in the authoritative governance documents listed in this document.

This document provides orientation only. Readers must use the authoritative source documents for detailed business intent, product requirements, architecture, terminology, planning, and delivery tracking.

## 4. Project Vision

PROJECT365 preserves a regime-first, explainable, auditable, and modular approach to crypto market intelligence.

The long-term vision and business intent are governed by the [BRD](./BRD.md). Product interpretation and product requirements are governed by the [PRD](./PRD.md). This document summarizes the orientation context without replacing or duplicating either source.

## 5. Development Methodology

PROJECT365 follows Specification Driven Development and a documentation-first workflow.

The required development sequence is:

```text
BRD
↓
PRD
↓
Architecture
↓
ProductMap
↓
ADR
↓
Technical Design
↓
Issue
↓
Acceptance Criteria
↓
Implementation
↓
Review
↓
Freeze
```

No implementation work should proceed without traceability to the approved upstream documents and the applicable Technical Design, Issue Specification, and Acceptance Criteria.

## 6. Documentation Hierarchy

PROJECT365 uses the following authoritative documentation hierarchy:

| Authority Area | Authoritative Document |
| --- | --- |
| Permanent project orientation | [Project Context](./ProjectContext.md) |
| Business intent, business scope, and business constraints | [BRD](./BRD.md) |
| Product requirements and product scope | [PRD](./PRD.md) |
| Approved architecture and architecture rules | [Architecture](./Architecture.md) |
| Product domains, modules, and product structure | [Product Map](./ProductMap.md) |
| Approved terminology | [Glossary](./Glossary.md) |
| Architecture decisions | [Architecture Decision Records](./Decisions.md) |
| Delivery sequencing and milestone planning | [Roadmap](./Roadmap.md) |
| Delivery work tracking | [Backlog](./Backlog.md) |
| Delivery status reporting | [Current Status](./CurrentStatus.md) |

Hierarchy rules:

- The BRD is upstream of the PRD.
- The PRD is upstream of Architecture and Product Map interpretation.
- Architecture defines approved architecture and must not be overridden by lower-level documents.
- Product Map defines approved product domains and modules.
- Architecture Decision Records record accepted architecture decisions and decision rationale.
- Glossary normalizes terminology across all documents.
- Roadmap sequences delivery planning without defining requirements or architecture.
- Backlog tracks delivery work without defining requirements, architecture, or terminology.
- Current Status reports delivery state without redefining scope, requirements, architecture, or planning.

## 7. Architecture Overview

PROJECT365 architecture context is governed by the [Architecture](./Architecture.md) and related [Architecture Decision Records](./Decisions.md).

At the orientation level, PROJECT365 uses a modular architecture aligned to approved domains and governed by regime-first, Single Source of Truth, Separation of Concerns, explainability, and auditability principles. This document does not define architecture, architecture rules, module responsibilities, dependency rules, data flow, event flow, or implementation design.

Readers must consult the Architecture, Product Map, Glossary, and Architecture Decision Records before making architecture or design decisions.

## 8. Current Release Context

The Current Release Scope term is defined by the [Glossary](./Glossary.md) and governed by the [PRD](./PRD.md), [Architecture](./Architecture.md), and [Product Map](./ProductMap.md).

Foundation v0.1 is the preserved release context for this project orientation document. Foundation v0.1 is limited to the approved Foundation release scope described in the authoritative documents.

This section provides release orientation only. Implementation status, sprint status, issue status, and progress reporting belong only in the [Backlog](./Backlog.md) and [Current Status](./CurrentStatus.md).

## 9. Governance Principles

PROJECT365 governance is based on these principles:

- Preserve the BRD as the upstream source for business intent.
- Preserve the PRD as the upstream source for product requirements.
- Preserve Architecture and Architecture Decision Records as the sources for architecture direction and accepted decisions.
- Preserve Product Map as the source for approved product domains and modules.
- Preserve Glossary as the source for approved terminology.
- Keep documentation changes traceable to authoritative sources.
- Prevent lower-level documents from redefining upstream intent, scope, requirements, architecture, terminology, or decisions.
- Maintain explainability, auditability, Single Source of Truth, and Separation of Concerns across project documentation.

## 10. Documentation Rules

Project Context rules:

- Use this document for permanent project orientation only.
- Do not define business requirements in this document.
- Do not define product requirements in this document.
- Do not define architecture in this document.
- Do not duplicate BRD or PRD content in this document.
- Do not report implementation status in this document.
- Do not report sprint progress in this document.
- Do not report issue progress in this document.
- Use Glossary terminology.
- Link to authoritative documents instead of copying their detailed content.
- Update the change history when this document changes.

Documentation workflow rules:

- Business intent changes must start in the BRD.
- Product requirement changes must start in the PRD.
- Architecture changes must be reflected in Architecture and, when decision-level, Architecture Decision Records.
- Product domain or module changes must be reflected in Product Map.
- Terminology changes must be reflected in Glossary.
- Delivery sequencing changes must be reflected in Roadmap.
- Delivery tracking changes must be reflected in Backlog.
- Delivery status changes must be reflected in Current Status.

## 11. Out of Scope

The following are out of scope for this document:

- Business requirement definitions.
- Product requirement definitions.
- Architecture definitions.
- Module responsibility definitions.
- Data model definitions.
- API definitions.
- User interface definitions.
- Implementation plans.
- Implementation status.
- Sprint reporting.
- Issue reporting.
- Acceptance Criteria.
- Test plans.
- Financial advice, trading instructions, price predictions, or automated trading behavior.

## 12. Traceability

| Project Context Area | Source of Truth | Traceability Notes |
| --- | --- | --- |
| Project orientation | Project Context | Provides permanent high-level orientation and document navigation. |
| Business intent | BRD | Project Context links to the BRD and does not duplicate business requirements. |
| Product requirements | PRD | Project Context links to the PRD and does not duplicate product requirements. |
| Architecture | Architecture; Architecture Decision Records | Project Context identifies architecture authority without defining architecture. |
| Product structure | Product Map | Project Context identifies Product Map authority without redefining domains or modules. |
| Terminology | Glossary | Project Context uses approved terms such as PROJECT365, Foundation v0.1, Current Release Scope, MarketData, Snapshot, and Delta. |
| Development methodology | BRD; Architecture Decision Records | Project Context preserves Specification Driven Development and documentation-first workflow orientation. |
| Release orientation | PRD; Architecture; Product Map; Glossary | Project Context preserves Foundation v0.1 context without reporting implementation progress. |
| Delivery sequencing | Roadmap | Project Context links to Roadmap for planning sequence authority. |
| Delivery tracking | Backlog | Project Context links to Backlog for work tracking authority. |
| Delivery status | Current Status | Project Context links to Current Status for implementation, sprint, and issue status authority. |

## 13. References

- [BRD](./BRD.md)
- [PRD](./PRD.md)
- [Architecture](./Architecture.md)
- [Product Map](./ProductMap.md)
- [Glossary](./Glossary.md)
- [Architecture Decision Records](./Decisions.md)
- [Roadmap](./Roadmap.md)
- [Backlog](./Backlog.md)
- [Current Status](./CurrentStatus.md)

## 14. Change History

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Normalized Project Context as the permanent high-level orientation document for PROJECT365, aligned to authoritative governance documents and Foundation v0.1 context. |
