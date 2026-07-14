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

- Provider Framework
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
| M1 | Foundation Specification | TD-000 Provider Framework; TD-001 MarketData Contract; TD-002 Health Layer; TD-003 Snapshot Engine |
| M2 | Foundation Implementation | ISSUE-001 MarketData Implementation; ISSUE-002 Health Layer Implementation; ISSUE-003 Snapshot Engine Implementation |
| M3 | Data Pipeline | TD-004 Data Service; TD-005 Event Bus; TD-006 Storage Layer; ISSUE-004 Data Service; ISSUE-005 Event Bus; ISSUE-006 Storage Layer |
| M4 | Delta Layer | TD-007 Delta Engine; TD-008 Triad Liquidity Framework; TD-009 Regime Engine; ISSUE-007 Delta Engine; ISSUE-008 Triad Liquidity Framework; ISSUE-009 Regime Engine |
| M5 | Intelligence Layer | TD-010 LDS Engine; TD-011 Capital Flow Engine; TD-012 Market State Engine; TD-013 Confidence Engine; TD-014 OMS Engine; ISSUE-010 LDS Engine; ISSUE-011 Capital Flow Engine; ISSUE-012 Market State Engine; ISSUE-013 Confidence Engine; ISSUE-014 OMS Engine |
| M6 | Portfolio, Governance, and Presentation Technical Designs | TD-015 Exposure Engine; TD-016 Portfolio Engine; TD-017 Risk Engine; TD-018 Cluster Rotation Engine; TD-019 Decision Log; TD-020 Validation Framework; TD-021 Champion-Challenger Framework; TD-022 Model Versioning; TD-023 Rollback Framework; TD-024 Dashboard; TD-025 Inspector; TD-026 Explainability; TD-027 Historical Explorer; TD-028 Settings |
| M7 | Portfolio, Governance, and Presentation Implementation | ISSUE-015 Exposure Engine through ISSUE-028 Settings |

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
| 1.2 | 2026-07-14 | Synchronized the product roadmap to the approved TD-000 through TD-028 sequence and removed active deprecated delivery terms. |

---

## Requirement Authority Confirmation

- The BRD is the upstream source of truth for business intent, business scope, constraints, and acceptance criteria.
- This PRD is the authoritative source for product requirements derived from the BRD.
- The Backlog is a delivery tracking document only and must not define, redefine, expand, or override PRD requirements.
- No new functional requirement has been introduced outside the BRD: FR-001 through FR-010 are direct product-level restatements of BRD §12 Business Capabilities and related BRD scope or acceptance criteria.

---

## Documentation Synchronization

The PRD roadmap, Roadmap, Backlog, Current Status, Architecture, Product Map, Glossary, ADR, and TD-000 through TD-028 use the normalized TD sequence and approved Glossary terminology. Deprecated or delivery-only terms remain documented only in the Glossary for historical reference and must not define active product scope.
