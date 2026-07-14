# Backlog

## 1. Document Information

- **Project:** PROJECT365
- **Document Type:** Backlog
- **Status:** Active
- **Version:** 1.2
- **Owner:** PROJECT365 Delivery
- **Last Updated:** 2026-07-14
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

Current implementation tracking remains limited to approved Foundation v0.1 issue work. The full TD-000 through TD-028 sequence is tracked as documentation status and future implementation source material only.

## 4. Backlog Principles

- Track implementation status only.
- Preserve the approved M0 through M7 milestone sequence from the Roadmap.
- Preserve approved work item identifiers from the Roadmap.
- Use Glossary terminology.
- Distinguish Frozen, Ready to Freeze, Planned, In Progress, Completed, and Blocked status clearly.
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
| M2 | Foundation Implementation | In Progress | Current milestone for Foundation v0.1 implementation tracking. |
| M3 | Data Pipeline | Planned | Future milestone from the Roadmap. |
| M4 | Delta Layer | Planned | Future milestone from the Roadmap. |
| M5 | Intelligence Layer | Planned | Future milestone from the Roadmap. |
| M6 | Portfolio, Governance, and Presentation | Planned | Future milestone from the Roadmap. |
| M7 | Portfolio, Governance, and Presentation Implementation | Planned | Future milestone from the Roadmap. |

## 6. Work Items

Status values used in this Backlog:

- **Frozen:** Documentation is frozen for downstream use.
- **Ready to Freeze:** Documentation is ready for architecture freeze review.
- **Planned:** Approved for backlog tracking but not started.
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
| Documentation | TD-000 | Provider Framework Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-001 | MarketData Technical Design | Frozen | Roadmap approved TD sequence |
| Documentation | TD-002 | Health Layer Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-003 | Snapshot Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-004 | Data Service Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-005 | Event Bus Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-006 | Storage Layer Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-007 | Delta Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-008 | Triad Liquidity Framework Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-009 | Regime Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-010 | LDS Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-011 | Capital Flow Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-012 | Market State Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-013 | Confidence Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-014 | OMS Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-015 | Exposure Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-016 | Portfolio Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-017 | Risk Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-018 | Cluster Rotation Engine Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-019 | Decision Log Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-020 | Validation Framework Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-021 | Champion-Challenger Framework Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-022 | Model Versioning Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-023 | Rollback Framework Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-024 | Dashboard Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-025 | Inspector Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-026 | Explainability Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-027 | Historical Explorer Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Documentation | TD-028 | Settings Technical Design | Ready to Freeze | Roadmap approved TD sequence |
| Implementation | ISSUE-001 | MarketData Implementation | In Progress | Roadmap M2; TD-001 |
| Implementation | ISSUE-002 | Health Layer Implementation | Planned | Roadmap M2; TD-002 |
| Implementation | ISSUE-003 | Snapshot Engine Implementation | Planned | Roadmap M2; TD-003 |
| Planned | ISSUE-004 | Data Service Implementation | Planned | Derived from TD-004 |
| Planned | ISSUE-005 | Event Bus Implementation | Planned | Derived from TD-005 |
| Planned | ISSUE-006 | Storage Layer Implementation | Planned | Derived from TD-006 |
| Planned | ISSUE-007 | Delta Engine Implementation | Planned | Derived from TD-007 |
| Planned | ISSUE-008 | Triad Liquidity Framework Implementation | Planned | Derived from TD-008 |
| Planned | ISSUE-009 | Regime Engine Implementation | Planned | Derived from TD-009 |
| Planned | ISSUE-010 | LDS Engine Implementation | Planned | Derived from TD-010 |
| Planned | ISSUE-011 | Capital Flow Engine Implementation | Planned | Derived from TD-011 |
| Planned | ISSUE-012 | Market State Engine Implementation | Planned | Derived from TD-012 |
| Planned | ISSUE-013 | Confidence Engine Implementation | Planned | Derived from TD-013 |
| Planned | ISSUE-014 | OMS Engine Implementation | Planned | Derived from TD-014 |
| Planned | ISSUE-015 | Exposure Engine Implementation | Planned | Derived from TD-015 |
| Planned | ISSUE-016 | Portfolio Engine Implementation | Planned | Derived from TD-016 |
| Planned | ISSUE-017 | Risk Engine Implementation | Planned | Derived from TD-017 |
| Planned | ISSUE-018 | Cluster Rotation Engine Implementation | Planned | Derived from TD-018 |
| Planned | ISSUE-019 | Decision Log Implementation | Planned | Derived from TD-019 |
| Planned | ISSUE-020 | Validation Framework Implementation | Planned | Derived from TD-020 |
| Planned | ISSUE-021 | Champion-Challenger Framework Implementation | Planned | Derived from TD-021 |
| Planned | ISSUE-022 | Model Versioning Implementation | Planned | Derived from TD-022 |
| Planned | ISSUE-023 | Rollback Framework Implementation | Planned | Derived from TD-023 |
| Planned | ISSUE-024 | Dashboard Implementation | Planned | Derived from TD-024 |
| Planned | ISSUE-025 | Inspector Implementation | Planned | Derived from TD-025 |
| Planned | ISSUE-026 | Explainability Implementation | Planned | Derived from TD-026 |
| Planned | ISSUE-027 | Historical Explorer Implementation | Planned | Derived from TD-027 |
| Planned | ISSUE-028 | Settings Implementation | Planned | Derived from TD-028 |

## 7. Current Progress

- **Current phase:** Foundation v0.1 delivery.
- **Current milestone:** M2 Foundation Implementation.
- **Current issue:** ISSUE-001 MarketData Implementation.
- **Current issue status:** In Progress.
- **Foundation implementation progress:** ISSUE-001 is In Progress; ISSUE-002 and ISSUE-003 are Planned.
- **Technical Design documentation progress:** TD-001 is Frozen; TD-000 and TD-002 through TD-028 are Ready to Freeze.
- **Blocked items:** None.

M0 Product Blueprint and M1 Foundation Specification are Completed. M3 through M7 remain Planned future milestones from the Roadmap.

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
| Sprint 1 | M2 | ISSUE-001 | MarketData Implementation | In Progress |
| Sprint 1 | M2 | ISSUE-002 | Health Layer Implementation | Planned |
| Sprint 1 | M2 | ISSUE-003 | Snapshot Engine Implementation | Planned |

Sprint 1 is aligned to Foundation v0.1 and does not expand beyond MarketData Contract, Health Layer, and Snapshot Engine implementation tracking.

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
