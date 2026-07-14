# Roadmap

## 1. Document Information

- **Project:** PROJECT365
- **Document Type:** Roadmap
- **Status:** Draft
- **Version:** 1.1
- **Owner:** PROJECT365 Product
- **Last Updated:** 2026-07-13
- **Depends On:** [BRD](./BRD.md), [PRD](./PRD.md), [Architecture](./Architecture.md), [Product Map](./ProductMap.md), [Glossary](./Glossary.md), [Architecture Decision Records](./Decisions.md)
- **Referenced By:** Backlog, Current Status, Technical Design documents, Issue Specifications, Acceptance Criteria, Implementation Prompts

## 2. Purpose

This Roadmap is the planning view for PROJECT365 delivery sequencing.

The Roadmap aligns with the authoritative [PRD](./PRD.md) product roadmap, preserves the approved Foundation v0.1 scope, and references the [Backlog](./Backlog.md) for delivery tracking. It does not define product requirements, architecture decisions, or implementation details.

Product requirements come only from the [BRD](./BRD.md) and [PRD](./PRD.md). Architecture decisions come only from the [Architecture Decision Records](./Decisions.md).

## 3. Scope

This Roadmap covers the approved milestone sequence for PROJECT365 planning and delivery coordination.

PROJECT365 is an Adaptive Crypto Market Intelligence Platform, Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform.

The approved domain sequence remains:

```text
Foundation Domain
↓
Market Intelligence Domain
↓
Portfolio Intelligence Domain
↓
Governance Domain
↓
Presentation Domain
```

Current Release Scope is Foundation v0.1 only:

- MarketData Contract
- Health Layer
- Snapshot Engine

This Roadmap does not expand Foundation v0.1 and does not replace the Backlog.

## 4. Roadmap Principles

- Preserve approved project scope from the BRD and PRD.
- Follow the PRD-approved milestone sequence.
- Preserve Foundation v0.1 scope.
- Preserve the approved domain sequence.
- Preserve the approved implementation sequence.
- Use Glossary terminology.
- Reference the Backlog for delivery tracking without redefining Backlog items.
- Avoid defining product requirements in the Roadmap.
- Avoid defining architecture decisions in the Roadmap.
- Avoid introducing unapproved domains, modules, releases, or milestones.

## 5. Release Strategy

PROJECT365 uses Specification Driven Development and a documentation-first workflow.

Planning proceeds from approved documentation into technical design, issue specifications, implementation, review, and freeze:

```text
BRD
↓
PRD
↓
Technical Design
↓
Issue
↓
Implementation
↓
Review
↓
Freeze
```

The Roadmap identifies milestone sequencing. The Backlog tracks delivery work against that sequence and must not define, redefine, expand, or override PRD requirements.

## 6. Milestones

| Milestone | Name | Planning Scope | Source |
| --- | --- | --- | --- |
| M0 | Product Blueprint | BRD; PRD; Architecture; Product Map; Feature Map; Roadmap; Glossary | PRD Product Roadmap |
| M1 | Foundation Specification | TD-000 Data Provider Framework; TD-001 MarketData Contract; TD-002 Health Layer; TD-003 Snapshot Engine | PRD Product Roadmap |
| M2 | Foundation Implementation | ISSUE-001 MarketData Implementation; ISSUE-002 Health Layer Implementation; ISSUE-003 Snapshot Engine Implementation | PRD Product Roadmap |
| M3 | Data Pipeline | TD-004 Data Service; TD-005 CoinGecko Adapter; TD-006 Event Bus; ISSUE-004 Data Service; ISSUE-005 CoinGecko Adapter; ISSUE-006 Event Bus | PRD Product Roadmap |
| M4 | Delta Layer | TD-007 Delta Engine; TD-008 Anchor Lifecycle; TD-009 Snapshot Cache; ISSUE-007 Delta Engine; ISSUE-008 Anchor Lifecycle; ISSUE-009 Snapshot Cache | PRD Product Roadmap |
| M5 | Intelligence Layer | TD-010 Regime Engine; TD-011 LDS Engine; TD-012 Capital Flow Engine; TD-013 Market State Engine; TD-014 Confidence Engine; TD-015 OMS Engine; ISSUE-010 Regime Engine; ISSUE-011 LDS Engine; ISSUE-012 Capital Flow Engine; ISSUE-013 Market State Engine; ISSUE-014 Confidence Engine; ISSUE-015 OMS Engine | PRD Product Roadmap |
| M6 | Dashboard & API | TD-016 API Layer; TD-017 Dashboard Backend; TD-018 Dashboard Frontend; TD-019 Authentication; ISSUE-016 API Layer; ISSUE-017 Dashboard Backend; ISSUE-018 Dashboard Frontend; ISSUE-019 Authentication | PRD Product Roadmap |
| M7 | Portfolio Layer | TD-020 Cluster Rotation Engine; TD-021 Portfolio Engine; TD-022 Risk Engine; ISSUE-020 Cluster Rotation Engine; ISSUE-021 Portfolio Engine; ISSUE-022 Risk Engine | PRD Product Roadmap |

## 7. Deliverables

Roadmap deliverables are planning-level references to approved delivery artifacts. Detailed status, ownership, and task tracking belong in the Backlog.

| Milestone | Deliverable References |
| --- | --- |
| M0 | Product Blueprint documentation set. |
| M1 | Foundation v0.1 Technical Design documents for MarketData Contract, Health Layer, and Snapshot Engine. |
| M2 | Foundation v0.1 Issue Specifications for MarketData Implementation, Health Layer Implementation, and Snapshot Engine Implementation. |
| M3 | Data Pipeline Technical Design documents and Issue Specifications referenced by the PRD Product Roadmap. |
| M4 | Delta Layer Technical Design documents and Issue Specifications referenced by the PRD Product Roadmap. |
| M5 | Intelligence Layer Technical Design documents and Issue Specifications referenced by the PRD Product Roadmap. |
| M6 | Dashboard & API Technical Design documents and Issue Specifications referenced by the PRD Product Roadmap. |
| M7 | Portfolio Layer Technical Design documents and Issue Specifications referenced by the PRD Product Roadmap. |

## 8. Dependencies

The Roadmap depends on:

- [BRD](./BRD.md) for business intent, business scope, constraints, business capabilities, and Business Acceptance Criteria.
- [PRD](./PRD.md) for product requirements and the authoritative PRD-level milestone sequence.
- [Architecture](./Architecture.md) for approved architecture sequence, responsibilities, and dependency rules.
- [Product Map](./ProductMap.md) for approved domains, modules, ownership, capability mapping, and navigation structure.
- [Glossary](./Glossary.md) for official terminology.
- [Architecture Decision Records](./Decisions.md) for approved architecture decisions.
- [Backlog](./Backlog.md) for delivery tracking only.

## 9. Current Release

Current focus: M2 Foundation Implementation, ISSUE-001 MarketData Implementation.

Foundation v0.1 remains limited to:

- MarketData Contract
- Health Layer
- Snapshot Engine

Foundation v0.1 excludes:

- Database Design
- APIs
- Dashboard
- Portfolio Engine
- AI Features

## 10. Future Releases

Future releases are limited to the remaining approved PRD milestones after the Current Release:

- M3 Data Pipeline
- M4 Delta Layer
- M5 Intelligence Layer
- M6 Dashboard & API
- M7 Portfolio Layer

This Roadmap does not introduce future releases beyond the PRD Product Roadmap. Future delivery details must be tracked in the Backlog and remain traceable to approved documents.

## 11. Out of Scope

PROJECT365 will not:

- predict prices;
- guarantee profits;
- execute trades;
- provide financial advice;
- manage exchange accounts.

PROJECT365 is not:

- a trading bot;
- an auto trading platform;
- a price prediction system;
- a financial advisor.

The Roadmap must not:

- define product requirements;
- define architecture decisions;
- replace the Backlog;
- add unapproved milestones;
- add unapproved releases;
- expand Foundation v0.1 scope;
- change module ownership;
- change the approved architecture sequence.

## 12. Traceability

| Roadmap Area | Source of Truth | Notes |
| --- | --- | --- |
| Product positioning | BRD §2; PRD Purpose; Glossary §4 | Preserves Adaptive Crypto Market Intelligence Platform, Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform positioning. |
| Product requirements boundary | BRD; PRD | Roadmap is planning only and does not define requirements. |
| Architecture decision boundary | Architecture Decision Records | Roadmap does not define architecture decisions. |
| Domain sequence | BRD §14; PRD Constraints; Architecture §5; Product Map §3 | Preserves Foundation Domain → Market Intelligence Domain → Portfolio Intelligence Domain → Governance Domain → Presentation Domain. |
| Current Release Scope | BRD §10; PRD Scope; Product Map §10; Glossary §4 | Preserves Foundation v0.1 limited to MarketData Contract, Health Layer, and Snapshot Engine. |
| Milestone sequence | PRD Product Roadmap | Uses M0 through M7 exactly as approved by the PRD Product Roadmap. |
| Delivery tracking | PRD Dependencies; Backlog | Roadmap references the Backlog instead of replacing it. |
| Terminology | Glossary | Uses approved names for domains, modules, Current Release Scope, Foundation v0.1, MarketData Contract, Health Layer, and Snapshot Engine. |
| Dependency rules | BRD §13; PRD Business Rules; Architecture §10; ADR-006 | Preserves dependency direction and layer restrictions. |
| Out of scope | BRD §11; PRD Out of Scope; Architecture §16; Product Map §12 | Preserves product positioning boundaries and Foundation v0.1 exclusions. |
| Development process | BRD §14; ADR-001; ADR-003 | Preserves Specification Driven Development and documentation-first workflow. |

## 13. References

- [BRD](./BRD.md)
- [PRD](./PRD.md)
- [Architecture](./Architecture.md)
- [Product Map](./ProductMap.md)
- [Glossary](./Glossary.md)
- [Architecture Decision Records](./Decisions.md)
- [Backlog](./Backlog.md)
- [Current Status](./CurrentStatus.md)

## 14. Change History

| Version | Date | Summary |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Initial roadmap draft. |
| 1.1 | 2026-07-13 | Normalized Roadmap to the approved structure; aligned milestones with the PRD Product Roadmap; preserved Foundation v0.1 scope, approved domain sequence, approved implementation sequence, terminology, dependencies, references, traceability, and roadmap planning boundaries. |
