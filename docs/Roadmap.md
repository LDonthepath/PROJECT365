# Roadmap

## 1. Document Information

- **Project:** PROJECT365
- **Document Type:** Roadmap
- **Status:** Draft
- **Version:** 1.2
- **Owner:** PROJECT365 Product
- **Last Updated:** 2026-07-14
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
| M0 | Product Blueprint | BRD; PRD; Architecture; Product Map; Feature Map; Roadmap; Glossary; ADR; Templates | PRD Product Roadmap |
| M1 | Foundation Specification | TD-000 Provider Framework; TD-001 MarketData; TD-002 Health Layer; TD-003 Snapshot Engine | PRD Product Roadmap |
| M2 | Foundation Implementation | ISSUE-001 MarketData Implementation; ISSUE-002 Health Layer Implementation; ISSUE-003 Snapshot Engine Implementation | PRD Product Roadmap |
| M3 | Data Pipeline | TD-004 Data Service; TD-005 Event Bus; TD-006 Storage Layer; ISSUE-004 Data Service; ISSUE-005 Event Bus; ISSUE-006 Storage Layer | PRD Product Roadmap |
| M4 | Delta Layer | TD-007 Delta Engine; TD-008 Triad Liquidity Framework; TD-009 Regime Engine; ISSUE-007 Delta Engine; ISSUE-008 Triad Liquidity Framework; ISSUE-009 Regime Engine | PRD Product Roadmap |
| M5 | Intelligence Layer | TD-010 LDS Engine; TD-011 Capital Flow Engine; TD-012 Market State Engine; TD-013 Confidence Engine; TD-014 OMS Engine; ISSUE-010 LDS Engine; ISSUE-011 Capital Flow Engine; ISSUE-012 Market State Engine; ISSUE-013 Confidence Engine; ISSUE-014 OMS Engine | PRD Product Roadmap |
| M6 | Portfolio, Governance, and Presentation | TD-015 Exposure Engine; TD-016 Portfolio Engine; TD-017 Risk Engine; TD-018 Cluster Rotation Engine; TD-019 Decision Log; TD-020 Validation Framework; TD-021 Champion-Challenger Framework; TD-022 Model Versioning; TD-023 Rollback Framework; TD-024 Dashboard; TD-025 Inspector; TD-026 Explainability; TD-027 Historical Explorer; TD-028 Settings | PRD Product Roadmap |
| M7 | Portfolio, Governance, and Presentation Implementation | ISSUE-015 Exposure Engine through ISSUE-028 Settings | PRD Product Roadmap |

## 7. Approved Technical Design Sequence

The complete approved TD sequence is:

TD-000 Provider Framework; TD-001 MarketData; TD-002 Health Layer; TD-003 Snapshot Engine; TD-004 Data Service; TD-005 Event Bus; TD-006 Storage Layer; TD-007 Delta Engine; TD-008 Triad Liquidity Framework; TD-009 Regime Engine; TD-010 LDS Engine; TD-011 Capital Flow Engine; TD-012 Market State Engine; TD-013 Confidence Engine; TD-014 OMS Engine; TD-015 Exposure Engine; TD-016 Portfolio Engine; TD-017 Risk Engine; TD-018 Cluster Rotation Engine; TD-019 Decision Log; TD-020 Validation Framework; TD-021 Champion-Challenger Framework; TD-022 Model Versioning; TD-023 Rollback Framework; TD-024 Dashboard; TD-025 Inspector; TD-026 Explainability; TD-027 Historical Explorer; TD-028 Settings

This sequence preserves existing TD numbering and does not introduce new product scope, releases, modules, or architecture decisions.

## 8. Deliverables

Roadmap deliverables are planning-level references to approved delivery artifacts. Detailed status, ownership, and task tracking belong in the Backlog.

| Milestone | Deliverable References |
| --- | --- |
| M0 | Product Blueprint documentation set and governance templates. |
| M1 | Foundation v0.1 Technical Design documents for Provider Framework, MarketData, Health Layer, and Snapshot Engine. |
| M2 | Foundation v0.1 Issue Specifications for MarketData Implementation, Health Layer Implementation, and Snapshot Engine Implementation. |
| M3 | Data Pipeline Technical Design documents and Issue Specifications referenced by the approved TD sequence. |
| M4 | Delta Layer Technical Design documents and Issue Specifications referenced by the approved TD sequence. |
| M5 | Intelligence Layer Technical Design documents and Issue Specifications referenced by the approved TD sequence. |
| M6 | Portfolio Intelligence, Governance, and Presentation Technical Design documents referenced by the approved TD sequence. |
| M7 | Portfolio Intelligence, Governance, and Presentation Issue Specifications generated from the approved TD sequence. |

## 9. Dependencies

The Roadmap depends on:

- [BRD](./BRD.md) for business intent, business scope, constraints, business capabilities, and Business Acceptance Criteria.
- [PRD](./PRD.md) for product requirements and the authoritative PRD-level milestone sequence.
- [Architecture](./Architecture.md) for approved architecture sequence, responsibilities, and dependency rules.
- [Product Map](./ProductMap.md) for approved domains, modules, ownership, capability mapping, and navigation structure.
- [Glossary](./Glossary.md) for official terminology.
- [Architecture Decision Records](./Decisions.md) for approved architecture decisions.
- [Backlog](./Backlog.md) for delivery tracking only.

## 10. Current Release

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

## 11. Future Releases

Future releases are limited to the remaining approved milestones after the Current Release:

- M3 Data Pipeline
- M4 Delta Layer
- M5 Intelligence Layer
- M6 Portfolio, Governance, and Presentation
- M7 Portfolio Layer

## 12. Out of Scope

This Roadmap does not define:

- New product requirements.
- New business requirements.
- New architecture decisions.
- Implementation details.
- Issue-level tasks beyond planning references.
- Technical Design content.
- Acceptance Criteria content.
- Release dates.
- Additional modules outside the approved Product Map and Architecture.

## 13. Traceability

| Roadmap Area | Source of Truth | Traceability Notes |
| --- | --- | --- |
| Business intent | BRD | The Roadmap supports approved business goals without redefining them. |
| Product requirements | PRD | The Roadmap follows the PRD-approved milestone sequence. |
| Architecture | Architecture; ADR | The Roadmap references approved domains, modules, and dependency rules only. |
| Product structure | Product Map | The approved TD sequence uses Product Map module names. |
| Terminology | Glossary | Module and domain names use approved terms. |
| Delivery tracking | Backlog | Backlog tracks implementation status and must remain aligned to this Roadmap. |

## 14. References

- [BRD](./BRD.md)
- [PRD](./PRD.md)
- [Architecture](./Architecture.md)
- [Product Map](./ProductMap.md)
- [Feature Map](./FeatureMap.md)
- [Glossary](./Glossary.md)
- [Architecture Decision Records](./Decisions.md)
- [Backlog](./Backlog.md)
- [Current Status](./CurrentStatus.md)

## 15. Change History

| Version | Date | Description |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Initial Roadmap created from PRD Product Roadmap. |
| 1.1 | 2026-07-13 | Normalized Roadmap governance structure and traceability. |
| 1.2 | 2026-07-14 | Synchronized Roadmap to approved TD-000 through TD-028 sequence without changing milestone strategy. |
