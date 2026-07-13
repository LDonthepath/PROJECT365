# Backlog

## 1. Document Information

- **Project:** PROJECT365
- **Document Type:** Backlog
- **Status:** Active
- **Version:** 1.1
- **Owner:** PROJECT365 Delivery
- **Last Updated:** 2026-07-13
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

Current implementation tracking is limited to the approved work items listed in Section 6. No additional milestones, issues, product requirements, or architecture decisions are introduced by this document.

## 4. Backlog Principles

- Track implementation status only.
- Preserve the approved M0 through M7 milestone sequence from the Roadmap.
- Preserve approved work item identifiers from the Roadmap.
- Use Glossary terminology.
- Distinguish Planned, In Progress, Completed, and Blocked status clearly.
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
| M0 | Product Blueprint | Completed | Authoritative governance documents are normalized and available for delivery reference. |
| M1 | Foundation Specification | Completed | Foundation v0.1 Technical Design documents TD-001 through TD-003 are available. |
| M2 | Foundation Implementation | In Progress | Current milestone for Foundation v0.1 implementation tracking. |
| M3 | Data Pipeline | Planned | Future milestone from the Roadmap. |
| M4 | Delta Layer | Planned | Future milestone from the Roadmap. |
| M5 | Intelligence Layer | Planned | Future milestone from the Roadmap. |
| M6 | Dashboard & API | Planned | Future milestone from the Roadmap. |
| M7 | Portfolio Layer | Planned | Future milestone from the Roadmap. |

## 6. Work Items

Status values used in this Backlog:

- **Planned:** Approved for backlog tracking but not started.
- **In Progress:** Active implementation or delivery work is underway.
- **Completed:** Delivery work is complete for the tracked item.
- **Blocked:** Delivery work cannot proceed because a dependency is unresolved.

| Milestone | Work Item | Name | Status | Source |
| --- | --- | --- | --- | --- |
| M0 | BRD | Business Requirements Document | Completed | Roadmap M0; BRD |
| M0 | PRD | Product Requirements Document | Completed | Roadmap M0; PRD |
| M0 | Architecture | Architecture | Completed | Roadmap M0; Architecture |
| M0 | Product Map | Product Map | Completed | Roadmap M0; Product Map |
| M0 | Feature Map | Feature Map | Completed | Roadmap M0; Feature Map |
| M0 | Roadmap | Roadmap | Completed | Roadmap M0; Roadmap |
| M0 | Glossary | Glossary | Completed | Roadmap M0; Glossary |
| M1 | TD-001 | MarketData Contract | Completed | Roadmap M1; TD-001 |
| M1 | TD-002 | Health Layer | Completed | Roadmap M1; TD-002 |
| M1 | TD-003 | Snapshot Engine | Completed | Roadmap M1; TD-003 |
| M2 | ISSUE-001 | MarketData Implementation | In Progress | Roadmap M2; ISSUE-001 |
| M2 | ISSUE-002 | Health Layer Implementation | Planned | Roadmap M2 |
| M2 | ISSUE-003 | Snapshot Engine Implementation | Planned | Roadmap M2 |
| M3 | TD-004 | Data Service | Planned | Roadmap M3 |
| M3 | TD-005 | CoinGecko Adapter | Planned | Roadmap M3 |
| M3 | TD-006 | Event Bus | Planned | Roadmap M3 |
| M3 | ISSUE-004 | Data Service | Planned | Roadmap M3 |
| M3 | ISSUE-005 | CoinGecko Adapter | Planned | Roadmap M3 |
| M3 | ISSUE-006 | Event Bus | Planned | Roadmap M3 |
| M4 | TD-007 | Delta Engine | Planned | Roadmap M4 |
| M4 | TD-008 | Anchor Lifecycle | Planned | Roadmap M4 |
| M4 | TD-009 | Snapshot Cache | Planned | Roadmap M4 |
| M4 | ISSUE-007 | Delta Engine | Planned | Roadmap M4 |
| M4 | ISSUE-008 | Anchor Lifecycle | Planned | Roadmap M4 |
| M4 | ISSUE-009 | Snapshot Cache | Planned | Roadmap M4 |
| M5 | TD-010 | Regime Engine | Planned | Roadmap M5 |
| M5 | TD-011 | LDS Engine | Planned | Roadmap M5 |
| M5 | TD-012 | Capital Flow Engine | Planned | Roadmap M5 |
| M5 | TD-013 | Market State Engine | Planned | Roadmap M5 |
| M5 | TD-014 | Confidence Engine | Planned | Roadmap M5 |
| M5 | TD-015 | OMS Engine | Planned | Roadmap M5 |
| M5 | ISSUE-010 | Regime Engine | Planned | Roadmap M5 |
| M5 | ISSUE-011 | LDS Engine | Planned | Roadmap M5 |
| M5 | ISSUE-012 | Capital Flow Engine | Planned | Roadmap M5 |
| M5 | ISSUE-013 | Market State Engine | Planned | Roadmap M5 |
| M5 | ISSUE-014 | Confidence Engine | Planned | Roadmap M5 |
| M5 | ISSUE-015 | OMS Engine | Planned | Roadmap M5 |
| M6 | TD-016 | API Layer | Planned | Roadmap M6 |
| M6 | TD-017 | Dashboard Backend | Planned | Roadmap M6 |
| M6 | TD-018 | Dashboard Frontend | Planned | Roadmap M6 |
| M6 | TD-019 | Authentication | Planned | Roadmap M6 |
| M6 | ISSUE-016 | API Layer | Planned | Roadmap M6 |
| M6 | ISSUE-017 | Dashboard Backend | Planned | Roadmap M6 |
| M6 | ISSUE-018 | Dashboard Frontend | Planned | Roadmap M6 |
| M6 | ISSUE-019 | Authentication | Planned | Roadmap M6 |
| M7 | TD-020 | Cluster Rotation Engine | Planned | Roadmap M7 |
| M7 | TD-021 | Portfolio Engine | Planned | Roadmap M7 |
| M7 | TD-022 | Risk Engine | Planned | Roadmap M7 |
| M7 | ISSUE-020 | Cluster Rotation Engine | Planned | Roadmap M7 |
| M7 | ISSUE-021 | Portfolio Engine | Planned | Roadmap M7 |
| M7 | ISSUE-022 | Risk Engine | Planned | Roadmap M7 |

## 7. Current Progress

- **Current phase:** Foundation v0.1 delivery.
- **Current milestone:** M2 Foundation Implementation.
- **Current issue:** ISSUE-001 MarketData Implementation.
- **Current issue status:** In Progress.
- **Foundation implementation progress:** ISSUE-001 is In Progress; ISSUE-002 and ISSUE-003 are Planned.
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

## 9. Current Sprint

| Sprint | Milestone | Work Item | Name | Status |
| --- | --- | --- | --- | --- |
| Sprint 1 | M2 | ISSUE-001 | MarketData Implementation | In Progress |
| Sprint 1 | M2 | ISSUE-002 | Health Layer Implementation | Planned |
| Sprint 1 | M2 | ISSUE-003 | Snapshot Engine Implementation | Planned |

Sprint 1 is aligned to Foundation v0.1 and does not expand beyond MarketData Contract, Health Layer, and Snapshot Engine implementation tracking.

## 10. Future Work

Future work is limited to the approved Roadmap milestones after M2:

- M3 Data Pipeline
- M4 Delta Layer
- M5 Intelligence Layer
- M6 Dashboard & API
- M7 Portfolio Layer

Future work remains Planned until its approved milestone becomes active. This Backlog does not introduce future releases beyond the Roadmap.

## 11. Out of Scope

The Backlog must not:

- define business requirements;
- define product requirements;
- define architecture decisions;
- redefine architecture;
- redefine release planning;
- add unapproved milestones;
- add unapproved issues;
- add unapproved domains or modules;
- expand Foundation v0.1 scope;
- replace the BRD, PRD, Architecture, Product Map, Glossary, Architecture Decision Records, or Roadmap.

PROJECT365 remains outside the following product boundaries:

- Price Prediction
- Profit Guarantee
- Trade Execution
- Financial Advice

## 12. Traceability

| Backlog Area | Source of Truth | Traceability Notes |
| --- | --- | --- |
| Delivery tracking authority | Backlog | This document is the single authoritative implementation tracker. |
| Product requirements | BRD; PRD | Backlog tracks implementation only and does not define requirements. |
| Architecture decisions | Architecture Decision Records | Backlog does not define or override architecture decisions. |
| Architecture structure | Architecture; Product Map | Backlog uses approved module names without redefining responsibilities. |
| Release planning | Roadmap | Backlog preserves the Roadmap milestone sequence M0 through M7. |
| Current Release Scope | BRD; PRD; Product Map; Roadmap; Glossary | Foundation v0.1 remains limited to MarketData Contract, Health Layer, and Snapshot Engine. |
| Current phase | Roadmap; Glossary | Current phase is Foundation v0.1 delivery. |
| Current milestone | Roadmap M2 | Current milestone is M2 Foundation Implementation. |
| Current implementation status | Backlog Section 6; Backlog Section 7 | ISSUE-001 is In Progress; ISSUE-002 and ISSUE-003 are Planned; no items are Blocked. |
| Terminology | Glossary | Uses Current Release Scope, Foundation v0.1, MarketData Contract, Health Layer, Snapshot Engine, Planned, In Progress, Completed, and Blocked consistently. |
| M0 work items | Roadmap M0 | BRD, PRD, Architecture, Product Map, Feature Map, Roadmap, and Glossary are tracked as Completed. |
| M1 work items | Roadmap M1 | TD-001, TD-002, and TD-003 are tracked as Completed. |
| M2 work items | Roadmap M2 | ISSUE-001, ISSUE-002, and ISSUE-003 are tracked without adding new Foundation v0.1 issues. |
| M3 through M7 work items | Roadmap M3-M7 | Future milestone work remains Planned and traceable to the Roadmap. |
| Out of scope boundaries | BRD; PRD; Architecture; Product Map; Roadmap | Backlog preserves product and architecture boundaries without restating them as new requirements. |

## 13. References

- [BRD](./BRD.md)
- [PRD](./PRD.md)
- [Architecture](./Architecture.md)
- [Product Map](./ProductMap.md)
- [Feature Map](./FeatureMap.md)
- [Glossary](./Glossary.md)
- [Architecture Decision Records](./Decisions.md)
- [Roadmap](./Roadmap.md)
- [TD-001 MarketData](../specs/TD-001-MarketData.md)
- [TD-002 Health Layer](../specs/TD-002-HealthLayer.md)
- [TD-003 Snapshot Engine](../specs/TD-003-SnapshotEngine.md)
- [ISSUE-001 MarketData](../issues/ISSUE-001-MarketData.md)

## 14. Change History

| Version | Date | Summary |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Initial backlog draft. |
| 1.1 | 2026-07-13 | Normalized Backlog to the approved structure; aligned milestones with the Roadmap; clarified current phase, current milestone, current implementation status, ISSUE-001 through ISSUE-003 status, Foundation implementation progress, Roadmap relationship, dependencies, references, and traceability. |
