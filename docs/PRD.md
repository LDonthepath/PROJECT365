# PROJECT365 Product Requirements Document (PRD)

## Document Information

- **Project:** PROJECT365
- **Document Type:** Product Requirements Document (PRD)
- **Status:** Draft
- **Version:** 1.1
- **Owner:** PROJECT365 Product
- **Last Updated:** 2026-07-13
- **Depends On:** [BRD](./BRD.md), [Glossary](./Glossary.md), [Architecture](./Architecture.md), [Product Map](./ProductMap.md), [Architecture Decision Records](./Decisions.md)
- **Referenced By:** Technical Design documents, Issue Specifications, Acceptance Criteria, Implementation Prompts

This PRD translates the upstream business requirements in the [BRD](./BRD.md) into product requirements. The BRD remains the source of truth for business intent, scope, constraints, and acceptance criteria.

---

## Purpose

PROJECT365 is an Adaptive Crypto Market Intelligence Platform that transforms raw crypto market data into explainable market intelligence and portfolio exposure recommendations.

The product purpose is to help users:

- understand market conditions;
- detect regime changes;
- improve decision quality;
- reduce emotional bias;
- create an auditable decision framework.

---

## Scope

PROJECT365 is a Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform.

PROJECT365 supports the following product domains from the [Product Map](./ProductMap.md):

### Foundation Domain

Purpose: Provide trusted, immutable, and validated market data.

Modules:

- Data Service
- MarketData Contract
- Health Layer
- Snapshot Engine
- Event Bus
- Storage Layer

### Market Intelligence Domain

Purpose: Understand global market conditions.

Modules:

- Delta Engine
- Triad Liquidity Framework
- Regime Engine
- LDS Engine
- Capital Flow Engine
- Market State Engine
- Confidence Engine
- OMS Engine

### Portfolio Intelligence Domain

Purpose: Transform market intelligence into actionable exposure decisions.

Modules:

- Exposure Engine
- Portfolio Engine
- Risk Engine
- Cluster Rotation Engine

### Governance Domain

Purpose: Ensure explainability and auditability.

Modules:

- Decision Log
- Validation Framework
- Champion-Challenger
- Model Versioning
- Rollback Framework

### Presentation Domain

Purpose: Present intelligence to users.

Modules:

- Dashboard
- Inspector
- Explainability
- Historical Explorer
- Settings

### Current Scope: Foundation v0.1

Included:

- MarketData Contract
- Health Layer
- Snapshot Engine

Excluded from Foundation v0.1:

- Database Design
- APIs
- Dashboard
- Portfolio Engine
- AI Features

---

## Business Goals

PROJECT365 has the following business goals:

1. Understand global market conditions.
2. Detect regime changes.
3. Provide explainable exposure recommendations.
4. Create an auditable decision framework.
5. Build reusable market intelligence infrastructure.

---

## Functional Requirements

The functional requirements below are traceable to BRD business capabilities and current business scope. No functional requirement may be added to this PRD unless it is traceable to the BRD or an approved BRD update.

| ID | Requirement | BRD Trace |
| --- | --- | --- |
| FR-001 | The product shall ingest global market data. | BRD §12 Business Capabilities |
| FR-002 | The product shall validate market data. | BRD §12 Business Capabilities |
| FR-003 | The product shall create immutable snapshots. | BRD §10 Business Scope; BRD §12 Business Capabilities |
| FR-004 | The product shall calculate market deltas. | BRD §12 Business Capabilities |
| FR-005 | The product shall determine market regime. | BRD §12 Business Capabilities |
| FR-006 | The product shall generate explainable exposure recommendations. | BRD §6 Goals; BRD §12 Business Capabilities |
| FR-007 | The product shall provide historical exploration. | BRD §12 Business Capabilities |
| FR-008 | The product shall support explainability and auditability. | BRD §12 Business Capabilities; BRD §19 BAC-008 |
| FR-009 | The product shall preserve historical market states for reproducible analysis. | BRD §12 Business Capabilities |
| FR-010 | The product shall present market intelligence in a decision-focused way. | BRD §12 Business Capabilities |

---

## Non-Functional Requirements

| ID | Requirement | BRD Trace |
| --- | --- | --- |
| NFR-001 | The product shall support system stability. | BRD §7 Success Criteria |
| NFR-002 | The product shall support accuracy of market state classification. | BRD §7 Success Criteria |
| NFR-003 | The product shall support explainability completeness. | BRD §7 Success Criteria |
| NFR-004 | The product shall support historical reproducibility. | BRD §7 Success Criteria |
| NFR-005 | The product shall support user trust. | BRD §7 Success Criteria |
| NFR-006 | The product shall support modular architecture. | BRD §13 Business Constraints |
| NFR-007 | The product shall support Specification Driven Development and documentation-first workflow. | BRD §13 Business Constraints; ADR-001; ADR-003 |

---

## Business Rules

PROJECT365 follows these business and architecture rules:

- Regime First.
- Hard Gate Principle.
- Single Source of Truth.
- Separation of Concerns.
- Explainability.
- Auditability.
- Modular Architecture.
- Lower layers never depend on higher layers.
- Presentation contains no business logic.
- Governance never calculates scores.
- Foundation is the Single Source of Truth.
- Portfolio Intelligence cannot access Foundation directly.
- Every recommendation and decision-support output remains explainable and auditable.

---

## Constraints

### Architecture Constraints

The approved architecture sequence is:

```text
Foundation
↓
Market Intelligence
↓
Portfolio Intelligence
↓
Governance
↓
Presentation
```

Architecture references in this PRD align with [Architecture](./Architecture.md), [Product Map](./ProductMap.md), and the BRD.

### Delivery Constraints

- PROJECT365 follows Specification Driven Development.
- PROJECT365 uses a documentation-first workflow.
- The architecture is SaaS-ready but initially deployed as a single-user personal product.
- Implementation must not add features that are not specified.
- Architecture must not change without approval.

### Decision Record Constraints

- ADR-001: PROJECT365 follows Specification Driven Development.
- ADR-002: PROJECT365 uses SaaS architecture while initially deploying as a personal product.
- ADR-003: PROJECT365 uses a documentation-first workflow.

---

## Out of Scope

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

---

## Dependencies

This PRD depends on:

- [BRD](./BRD.md) for business intent, business scope, constraints, roadmap context, and acceptance criteria.
- [Glossary](./Glossary.md) for official terminology.
- [Architecture](./Architecture.md) for approved architecture sequence, layer responsibilities, and dependency rules.
- [Product Map](./ProductMap.md) for domain and module organization.
- [Architecture Decision Records](./Decisions.md) for approved project decisions.
- [Backlog](./Backlog.md) for delivery tracking only. The Backlog must not define, redefine, expand, or override PRD requirements.

---

## Product Roadmap

The PRD roadmap is the authoritative product roadmap for PRD-level requirements. The [Backlog](./Backlog.md) may track delivery work against this roadmap, but it must not define, redefine, expand, or override PRD requirements.

| Milestone | Name | Scope |
| --- | --- | --- |
| M0 | Product Blueprint | BRD; PRD; Architecture; Product Map; Feature Map; Roadmap; Glossary |
| M1 | Foundation Specification | TD-001 MarketData Contract; TD-002 Health Layer; TD-003 Snapshot Engine |
| M2 | Foundation Implementation | ISSUE-001 MarketData Implementation; ISSUE-002 Health Layer Implementation; ISSUE-003 Snapshot Engine Implementation |
| M3 | Data Pipeline | TD-004 Data Service; TD-005 CoinGecko Adapter; TD-006 Event Bus; ISSUE-004 Data Service; ISSUE-005 CoinGecko Adapter; ISSUE-006 Event Bus |
| M4 | Delta Layer | TD-007 Delta Engine; TD-008 Anchor Lifecycle; TD-009 Snapshot Cache; ISSUE-007 Delta Engine; ISSUE-008 Anchor Lifecycle; ISSUE-009 Snapshot Cache |
| M5 | Intelligence Layer | TD-010 Regime Engine; TD-011 LDS Engine; TD-012 Capital Flow Engine; TD-013 Market State Engine; TD-014 Confidence Engine; TD-015 OMS Engine; ISSUE-010 Regime Engine; ISSUE-011 LDS Engine; ISSUE-012 Capital Flow Engine; ISSUE-013 Market State Engine; ISSUE-014 Confidence Engine; ISSUE-015 OMS Engine |
| M6 | Dashboard & API | TD-016 API Layer; TD-017 Dashboard Backend; TD-018 Dashboard Frontend; TD-019 Authentication; ISSUE-016 API Layer; ISSUE-017 Dashboard Backend; ISSUE-018 Dashboard Frontend; ISSUE-019 Authentication |
| M7 | Portfolio Layer | TD-020 Cluster Rotation Engine; TD-021 Portfolio Engine; TD-022 Risk Engine; ISSUE-020 Cluster Rotation Engine; ISSUE-021 Portfolio Engine; ISSUE-022 Risk Engine |

Current focus: M2 Foundation Implementation, ISSUE-001 MarketData Implementation.

---

## Traceability

| PRD Area | Source of Truth | Notes |
| --- | --- | --- |
| Product purpose | BRD §2 Executive Summary | Preserves BRD positioning and intent. |
| Business problems | BRD §4 Business Problems | Covered through purpose, business goals, and requirements. |
| Product vision | BRD §5 Vision | Referenced without adding new scope. |
| Business goals | BRD §6 Goals | Copied from BRD. |
| Success criteria | BRD §7 Success Criteria | Represented as non-functional requirements. |
| Target users | BRD §8 Stakeholders; BRD §9 Target Users | Maintained by reference to avoid duplication. |
| Product domains | BRD §10 Business Scope; Product Map | Normalized to Product Map terminology. |
| Out of scope | BRD §11 Out of Scope | Copied from BRD. |
| Functional requirements | BRD §12 Business Capabilities | No untraced functional requirements added. |
| Business rules and constraints | BRD §13 Business Constraints; Architecture | Preserves approved architecture. |
| Development process | BRD §14 High Level Business Process; ADR-001; ADR-003 | Represented as delivery constraints. |
| Product roadmap | PRD | Authoritative for PRD-level requirement sequencing; Backlog is delivery tracking only and must not redefine PRD requirements. |

---

## References

- [BRD](./BRD.md)
- [Glossary](./Glossary.md)
- [Architecture](./Architecture.md)
- [Product Map](./ProductMap.md)
- [Architecture Decision Records](./Decisions.md)
- [Backlog](./Backlog.md)
- [Roadmap](./Roadmap.md)
- [Current Status](./CurrentStatus.md)

---

## Change History

| Version | Date | Summary |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Initial PRD draft. |
| 1.1 | 2026-07-13 | Normalized PRD against the BRD, Glossary, Architecture, Product Map, ADRs, and Backlog; removed duplicated and contradictory statements; separated business, functional, and non-functional requirements. |

---

## Requirement Authority Confirmation

- The BRD is the upstream source of truth for business intent, business scope, constraints, and acceptance criteria.
- This PRD is the authoritative source for product requirements derived from the BRD.
- The Backlog is a delivery tracking document only and must not define, redefine, expand, or override PRD requirements.
- No new functional requirement has been introduced outside the BRD: FR-001 through FR-010 are direct product-level restatements of BRD §12 Business Capabilities and related BRD scope or acceptance criteria.

---

## Remaining Documentation Issues

The inconsistencies below remain outside this PRD and require future documentation work. This PRD does not resolve them by changing product scope.

| Document | Conflicting Section | Conflict |
| --- | --- | --- |
| [BRD](./BRD.md) | §17 Roadmap | Uses the Milestone 0 through Milestone 8 sequence: Product Blueprint, Foundation Edition, Delta Edition, Triad Edition, Regime Edition, Dashboard Edition, Intelligence Edition, Portfolio Edition, Advanced Edition. |
| [Roadmap](./Roadmap.md) | Milestone 0 through Milestone 8 | Uses the same edition-based Milestone 0 through Milestone 8 sequence as BRD §17. |
| [Backlog](./Backlog.md) | M0 through M7 | Uses a delivery-work sequence: Product Blueprint, Foundation Specification, Foundation Implementation, Data Pipeline, Delta Layer, Intelligence Layer, Dashboard & API, Portfolio Layer. |
| [BRD](./BRD.md) | §17 Roadmap, Milestone 1 — Foundation Edition | Lists MarketData, Health Layer, and Snapshot Engine as milestone scope. |
| [Roadmap](./Roadmap.md) | Milestone 1 — Foundation Edition | Lists MarketData, Health Layer, and Snapshot Engine as milestone scope. |
| [Backlog](./Backlog.md) | M1 - Foundation Specification and M2 - Foundation Implementation | Splits Foundation work into separate specification and implementation milestones, unlike BRD §17 and Roadmap Milestone 1. |
| [BRD](./BRD.md) | §17 Roadmap, Milestone 2 — Delta Edition | Lists Delta Engine and Anchor Service. |
| [Roadmap](./Roadmap.md) | Milestone 2 — Delta Edition | Lists Delta Engine and Anchor Service. |
| [Backlog](./Backlog.md) | M3 - Data Pipeline and M4 - Delta Layer | Inserts Data Pipeline before Delta Layer and lists Anchor Lifecycle and Snapshot Cache instead of Anchor Service. |
| [BRD](./BRD.md) | §17 Roadmap, Milestone 3 — Triad Edition | Lists Triad Liquidity Framework as a standalone milestone. |
| [Roadmap](./Roadmap.md) | Milestone 3 — Triad Edition | Lists Triad Liquidity Framework as a standalone milestone. |
| [Backlog](./Backlog.md) | M5 - Intelligence Layer | Does not list a standalone Triad Liquidity Framework milestone. |
| [BRD](./BRD.md) | §17 Roadmap, Milestone 4 — Regime Edition | Lists Regime Engine and Exposure Management. |
| [Roadmap](./Roadmap.md) | Milestone 4 — Regime Edition | Lists Regime Engine and Exposure Management. |
| [Backlog](./Backlog.md) | M5 - Intelligence Layer and M7 - Portfolio Layer | Places Regime Engine in Intelligence Layer and portfolio-related work in Portfolio Layer; does not use the term Exposure Management. |
| [BRD](./BRD.md) | §17 Roadmap, Milestone 5 — Dashboard Edition | Lists Dashboard, Explainability, and Inspector. |
| [Roadmap](./Roadmap.md) | Milestone 5 — Dashboard Edition | Lists Dashboard, Explainability, and Inspector. |
| [Backlog](./Backlog.md) | M6 - Dashboard & API | Adds API Layer and Authentication delivery items that are not named as PRD product requirements. |
| [BRD](./BRD.md) | §17 Roadmap, Milestone 7 — Portfolio Edition | Lists Exposure Recommendation, Decision Log, and Cluster Rotation. |
| [Roadmap](./Roadmap.md) | Milestone 7 — Portfolio Edition | Lists Exposure Recommendation, Decision Log, and Cluster Rotation. |
| [Backlog](./Backlog.md) | M7 - Portfolio Layer | Lists Cluster Rotation Engine, Portfolio Engine, and Risk Engine, but does not list Exposure Recommendation or Decision Log. |
| [BRD](./BRD.md) | §17 Roadmap, Milestone 8 — Advanced Edition | Lists Governance, Champion-Challenger, and AI Meta. |
| [Roadmap](./Roadmap.md) | Milestone 8 — Advanced Edition | Lists Governance, Champion-Challenger, and AI Meta. |
| [Backlog](./Backlog.md) | M0 through M7 | Does not include an M8 Advanced Edition milestone. |
| [Architecture](./Architecture.md) | Architecture Philosophy | Uses the term Modular Design. |
| [BRD](./BRD.md) | §13 Business Constraints, Architecture Constraints | Uses the term Modular Architecture. |
| [Architecture](./Architecture.md) | Layer 1 — Foundation, Components | Uses the component name Storage. |
| [BRD](./BRD.md), [Product Map](./ProductMap.md), and this PRD | Foundation Domain modules | Use the module name Storage Layer. |
| [Backlog](./Backlog.md) | M3 - Data Pipeline | Lists CoinGecko Adapter as delivery work. |
| [BRD](./BRD.md), [Product Map](./ProductMap.md), and this PRD | Product domains and functional requirements | Do not define CoinGecko Adapter as a product requirement. |
| [Backlog](./Backlog.md) | M4 - Delta Layer | Lists Snapshot Cache as delivery work. |
| [BRD](./BRD.md), [Product Map](./ProductMap.md), and this PRD | Product domains and functional requirements | Do not define Snapshot Cache as a product requirement. |
