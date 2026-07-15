# Backlog

## 1. Document Information

- **Project:** PROJECT365
- **Document Type:** Backlog
- **Status:** Active
- **Version:** 1.2
- **Owner:** PROJECT365 Delivery
- **Last Updated:** 2026-07-15
- **Depends On:** [BRD](./BRD.md), [PRD](./PRD.md), [Architecture](./Architecture.md), [Product Map](./ProductMap.md), [Glossary](./Glossary.md), [Architecture Decision Records](./Decisions.md), [Roadmap](./Roadmap.md)
- **Referenced By:** Current Status, Technical Design documents, Issue Specifications, Acceptance Criteria, Implementation Prompts

## 2. Purpose

This Backlog is the authoritative implementation tracker for PROJECT365 delivery work.

The Backlog tracks implementation work against the approved milestone sequence from the [Roadmap](./Roadmap.md). It does not define business requirements, product requirements, architecture decisions, release planning, domains, modules, or terminology.

Product requirements come only from the [BRD](./BRD.md) and [PRD](./PRD.md). Architecture decisions come only from the [Architecture Decision Records](./Decisions.md). Release planning comes only from the [Roadmap](./Roadmap.md).

## 3. Scope

This Backlog covers delivery tracking for approved PROJECT365 milestones M0 through M7.

Current Release Scope is Foundation v0.1 only:

- MarketData Contract
- Health Layer
- Snapshot Engine

Current implementation tracking is pending and belongs to later milestones. The full TD-000 through TD-028 sequence is tracked as Frozen documentation and future implementation source material only.

TD-000 is an architectural prerequisite and intentionally does not generate Issue Specification or Acceptance Criteria documents.

## 4. Backlog Principles

- Track implementation status only.
- Preserve the approved M0 through M7 milestone sequence from the Roadmap.
- Preserve approved work item identifiers from the Roadmap.
- Use Glossary terminology.
- Distinguish Documentation, Implementation, and Freeze tracking clearly.
- Do not define business requirements.
- Do not define product requirements.
- Do not redefine architecture.
- Do not define architecture decisions.
- Do not expand Foundation v0.1 scope.
- Do not introduce unapproved milestones, issues, domains, modules, or releases.
- Keep delivery tracking traceable to the BRD, PRD, Architecture, Product Map, Glossary, Architecture Decision Records, and Roadmap.

## 5. Milestone Overview

| Milestone | Name | Backlog Status | Notes |
| --- | --- | --- | --- |
| M0 | Product Blueprint | Completed | Authoritative governance documents and templates are normalized and available for delivery reference. |
| M1 | Foundation Specification | Completed | Foundation Technical Design documents TD-000 through TD-003 are available. |
| M2 | Foundation Implementation | In Progress | Foundation v0.1 implementation has started with ISSUE-001 and ISSUE-002 completed. |
| M3 | Data Pipeline | Planned | Future milestone from the Roadmap. |
| M4 | Delta Layer | Planned | Future milestone from the Roadmap. |
| M5 | Intelligence Layer | Planned | Future milestone from the Roadmap. |
| M6 | Portfolio, Governance, and Presentation | Planned | Future milestone from the Roadmap. |
| M7 | Portfolio, Governance, and Presentation Implementation | Planned | Future milestone from the Roadmap. |

## 6. Work Items

Status values used in this Backlog:

- **Frozen:** Documentation is frozen for downstream use.
- **Planned:** Approved for future backlog tracking but not started.
- **Not Started:** Approved implementation work has not begun.
- **In Progress:** Active implementation or delivery work is underway.
- **Completed:** Delivery work is complete for the tracked item.
- **Blocked:** Delivery work cannot proceed because a dependency is unresolved.

| Type | Work Item | Name | Status | Source |
| --- | --- | --- | --- | --- |
| Governance | BRD | Business Requirements Document | Completed | Roadmap M0; BRD |
| Governance | PRD | Product Requirements Document | Completed | Roadmap M0; PRD |
| Governance | Architecture | Architecture | Completed | Roadmap M0; Architecture |
| Governance | Product Map | Product Map | Completed | Roadmap M0; Product Map |
| Governance | Feature Map | Feature Map | Completed | Roadmap M0; Feature Map |
| Governance | Roadmap | Roadmap | Completed | Roadmap M0; Roadmap |
| Governance | Glossary | Glossary | Completed | Roadmap M0; Glossary |
| Governance | ADR | Architecture Decision Records | Completed | Roadmap M0; ADR |
| Template | TechnicalDesignTemplate | Technical Design Template | Completed | Roadmap M0; Templates |
| Template | IssueSpecificationTemplate | Issue Specification Template | Completed | Roadmap M0; Templates |
| Template | AcceptanceCriteriaTemplate | Acceptance Criteria Template | Completed | Roadmap M0; Templates |
| Documentation | ISSUE-001 through ISSUE-028 | Issue Specifications | Completed | Derived from TD-001 through TD-028 |
| Documentation | AC-001 through AC-028 | Acceptance Criteria | Completed | Derived from ISSUE-001 through ISSUE-028 |
| Documentation | TD-000 | Provider Framework Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-001 | MarketData Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-002 | Health Layer Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-003 | Snapshot Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-004 | Data Service Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-005 | Event Bus Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-006 | Storage Layer Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-007 | Delta Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-008 | Triad Liquidity Framework Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-009 | Regime Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-010 | LDS Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-011 | Capital Flow Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-012 | Market State Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-013 | Confidence Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-014 | OMS Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-015 | Exposure Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-016 | Portfolio Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-017 | Risk Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-018 | Cluster Rotation Engine Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-019 | Decision Log Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-020 | Validation Framework Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-021 | Champion-Challenger Framework Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-022 | Model Versioning Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-023 | Rollback Framework Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-024 | Dashboard Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-025 | Inspector Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-026 | Explainability Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-027 | Historical Explorer Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-028 | Settings Technical Design | Frozen | Roadmap approved TD sequence |
| Implementation | ISSUE-001 | MarketData Implementation | Completed | Roadmap M2; TD-001 |
| Implementation | ISSUE-002 | Health Layer Implementation | Completed | Roadmap M2; TD-002 |
| Implementation | ISSUE-003 | Snapshot Engine Implementation | Not Started | Roadmap M2; TD-003 |
| Implementation | ISSUE-004 | Data Service Implementation | Not Started | Derived from TD-004 |
| Implementation | ISSUE-005 | Event Bus Implementation | Not Started | Derived from TD-005 |
| Implementation | ISSUE-006 | Storage Layer Implementation | Not Started | Derived from TD-006 |
| Implementation | ISSUE-007 | Delta Engine Implementation | Not Started | Derived from TD-007 |
| Implementation | ISSUE-008 | Triad Liquidity Framework Implementation | Not Started | Derived from TD-008 |
| Implementation | ISSUE-009 | Regime Engine Implementation | Not Started | Derived from TD-009 |
| Implementation | ISSUE-010 | LDS Engine Implementation | Not Started | Derived from TD-010 |
| Implementation | ISSUE-011 | Capital Flow Engine Implementation | Not Started | Derived from TD-011 |
| Implementation | ISSUE-012 | Market State Engine Implementation | Not Started | Derived from TD-012 |
| Implementation | ISSUE-013 | Confidence Engine Implementation | Not Started | Derived from TD-013 |
| Implementation | ISSUE-014 | OMS Engine Implementation | Not Started | Derived from TD-014 |
| Implementation | ISSUE-015 | Exposure Engine Implementation | Not Started | Derived from TD-015 |
| Implementation | ISSUE-016 | Portfolio Engine Implementation | Not Started | Derived from TD-016 |
| Implementation | ISSUE-017 | Risk Engine Implementation | Not Started | Derived from TD-017 |
| Implementation | ISSUE-018 | Cluster Rotation Engine Implementation | Not Started | Derived from TD-018 |
| Implementation | ISSUE-019 | Decision Log Implementation | Not Started | Derived from TD-019 |
| Implementation | ISSUE-020 | Validation Framework Implementation | Not Started | Derived from TD-020 |
| Implementation | ISSUE-021 | Champion-Challenger Framework Implementation | Not Started | Derived from TD-021 |
| Implementation | ISSUE-022 | Model Versioning Implementation | Not Started | Derived from TD-022 |
| Implementation | ISSUE-023 | Rollback Framework Implementation | Not Started | Derived from TD-023 |
| Implementation | ISSUE-024 | Dashboard Implementation | Not Started | Derived from TD-024 |
| Implementation | ISSUE-025 | Inspector Implementation | Not Started | Derived from TD-025 |
| Implementation | ISSUE-026 | Explainability Implementation | Not Started | Derived from TD-026 |
| Implementation | ISSUE-027 | Historical Explorer Implementation | Not Started | Derived from TD-027 |
| Implementation | ISSUE-028 | Settings Implementation | Not Started | Derived from TD-028 |

## 7. Current Progress

- **Current phase:** Foundation Implementation.
- **Next phase:** Continue Foundation Implementation.
- **Architecture Documentation:** Completed.
- **Technical Designs:** Frozen.
- **Issue Specifications:** Completed.
- **Acceptance Criteria:** Completed.
- **Implementation:** In Progress; ISSUE-001 and ISSUE-002 completed.
- **Freeze:** Architecture Frozen.
- **Blocked items:** None.

Current implementation status: Foundation Implementation in progress; ISSUE-001 and ISSUE-002 completed. Architecture Freeze remains frozen.

M0 Product Blueprint, M1 Foundation Specification, Issue Specifications, and Acceptance Criteria are Completed. M2 is in progress; M3 through M7 remain implementation milestones that have not started.

## 8. Dependencies

| Dependency | Backlog Use |
| --- | --- |
| BRD | Source for business intent, business scope, constraints, business capabilities, and Business Acceptance Criteria. |
| PRD | Source for product requirements and approved product roadmap scope. |
| Architecture | Source for approved architecture sequence, responsibilities, and dependency rules. |
| Product Map | Source for approved domains, modules, ownership, capability mapping, and navigation structure. |
| Glossary | Source for official terminology. |
| Architecture Decision Records | Source for accepted architecture decisions. |
| Roadmap | Source for release planning, milestone sequence, and approved milestone work item references. |
| Technical Design documents | Source for implementation design details after approval. |
| Issue Specifications | Source for issue-level implementation instructions after approval. |
| Acceptance Criteria | Source for measurable implementation acceptance after approval. |

## 9. Current Sprint

| Sprint | Milestone | Work Item | Name | Status |
| --- | --- | --- | --- | --- |
| Sprint 1 | M2 | ISSUE-001 | MarketData Implementation | Completed |
| Sprint 1 | M2 | ISSUE-002 | Health Layer Implementation | Completed |
| Sprint 1 | M2 | ISSUE-003 | Snapshot Engine Implementation | Not Started |

Sprint 1 remains the next Foundation Implementation phase and does not expand beyond MarketData Contract, Health Layer, and Snapshot Engine implementation tracking.

## 10. Future Work

Future work is limited to the approved Roadmap milestones after M2 and the approved TD-000 through TD-028 sequence.

Future implementation issue specifications must derive from the corresponding Technical Design and must not introduce new product scope, architecture decisions, modules, or responsibilities.

## 11. Out of Scope

This Backlog does not define:

- Business requirements.
- Product requirements.
- Architecture decisions.
- Technical Design content.
- Issue Specification content.
- Acceptance Criteria content.
- Implementation details.
- New modules.
- New releases.
- New milestones.

## 12. Traceability

| Backlog Area | Source of Truth | Traceability Notes |
| --- | --- | --- |
| Business intent | BRD | Backlog tracks work supporting approved business goals. |
| Product requirements | PRD | Backlog does not redefine requirements. |
| Architecture | Architecture; ADR | Backlog references approved module sequence only. |
| Product structure | Product Map | Work item names use approved module names. |
| Terminology | Glossary | Backlog uses approved terms. |
| Milestone sequence | Roadmap | Backlog preserves Roadmap milestones. |
| Current status | Current Status | Current Status reports Backlog state. |

## 13. References

- [BRD](./BRD.md)
- [PRD](./PRD.md)
- [Architecture](./Architecture.md)
- [Product Map](./ProductMap.md)
- [Feature Map](./FeatureMap.md)
- [Glossary](./Glossary.md)
- [Architecture Decision Records](./Decisions.md)
- [Roadmap](./Roadmap.md)
- [Current Status](./CurrentStatus.md)
- [Technical Design Template](../templates/TechnicalDesignTemplate.md)
- [Issue Specification Template](../templates/IssueSpecificationTemplate.md)
- [Acceptance Criteria Template](../templates/AcceptanceCriteriaTemplate.md)

## 14. Change History

| Version | Date | Description |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Initial Backlog created from Roadmap. |
| 1.1 | 2026-07-13 | Normalized Backlog governance structure and traceability. |
| 1.2 | 2026-07-14 | Synchronized Backlog to approved TD-000 through TD-028 sequence while preserving Foundation v0.1 scope. |
| 1.3 | 2026-07-14 | Finalized Architecture Freeze governance status, TD-000 prerequisite clarification, and implementation-pending tracking without changing delivery scope. |
