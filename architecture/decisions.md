# Architecture Decision Records (ADR)

## 1. Document Information
- Status: Active
- Version: 1.2
- Owner: PROJECT365 Architecture
- Last Updated: 2026-09-08
- Depends On: [BRD](../business/brd.md), [PRD](../business/prd.md), [Architecture](./architecture.md), [Product Map](./product-map.md), [Glossary](../project365/glossary.md)
- Referenced By: Architecture, PRD, Product Map, Technical Design documents, Issue Specifications, Acceptance Criteria, Implementation Prompts

## 2. Purpose

This document is the authoritative Architecture Decision Record registry for PROJECT365.

It preserves approved architecture decisions derived from the [BRD](../business/brd.md), [PRD](../business/prd.md), [Architecture](./architecture.md), [Product Map](./product-map.md), and [Glossary](../project365/glossary.md). It normalizes existing decisions into a consistent ADR format without introducing new architecture, changing approved scope, or redefining product terminology.

## 3. ADR Index

### ADR-001 — Specification Driven Development

Status:
- Accepted

Context

PROJECT365 implementation must remain traceable to approved specifications and avoid unapproved scope expansion.

Decision

PROJECT365 follows Specification Driven Development.

Rationale

This reduces AI hallucination, minimizes large refactors, and keeps implementation aligned with approved requirements.

Consequences

- Implementation work must be derived from approved documentation.
- Unspecified features require approved documentation updates before implementation.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Glossary](../project365/glossary.md)

### ADR-002 — SaaS-Ready Architecture with Initial Personal Product Deployment

Status:
- Accepted

Context

PROJECT365 architecture is SaaS-ready but initially deployed as a single-user personal product.

Decision

PROJECT365 uses SaaS architecture while initially deploying as a personal product.

Rationale

This avoids future architectural rewrites while preserving the approved current scope.

Consequences

- Initial deployment remains a personal product deployment.
- Foundation v0.1 remains limited to MarketData Contract, Health Layer, and Snapshot Engine until approved documentation expands scope.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Product Map](./product-map.md)
- [Glossary](../project365/glossary.md)

### ADR-003 — Documentation-First Workflow

Status:
- Accepted

Context

PROJECT365 uses approved documentation as project memory for scope, architecture, terminology, and implementation traceability.

Decision

PROJECT365 uses a documentation-first workflow.

Rationale

This preserves long-term context and keeps AI-assisted work grounded in approved documents.

Consequences

- Documentation changes must precede implementation when scope, architecture, decisions, or terminology change.
- The ADR registry remains the authoritative architecture decision record.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Glossary](../project365/glossary.md)

### ADR-004 — Single Source of Truth

Status:
- Accepted

Context

PROJECT365 requires one approved owner for trusted market data and state responsibility.

Decision

Foundation is the Single Source of Truth for trusted, immutable, and validated market data.

Rationale

A single owner prevents conflicting data definitions and keeps downstream intelligence reproducible.

Consequences

- Downstream domains consume trusted Foundation outputs.
- MarketData and snapshots must not be redefined by higher layers.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Product Map](./product-map.md)
- [Glossary](../project365/glossary.md)

### ADR-005 — Separation of Concerns

Status:
- Accepted

Context

PROJECT365 domains and modules have approved responsibilities and ownership boundaries.

Decision

Each domain and module must keep one clear responsibility and must not redefine ownership held by another domain or module.

Rationale

Separation of concerns supports modularity, maintainability, and traceability from product capabilities to implementation.

Consequences

- Foundation, Market Intelligence, Portfolio Intelligence, Governance, and Presentation responsibilities remain distinct.
- Modules must not move between domains without approved documentation updates.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Product Map](./product-map.md)
- [Glossary](../project365/glossary.md)

### ADR-006 — Layer Dependency Rules

Status:
- Accepted

Context

PROJECT365 has an approved dependency sequence from Foundation through Presentation.

Decision

Lower layers never depend on higher layers; dependency direction follows Foundation → Market Intelligence → Portfolio Intelligence → Governance → Presentation.

Rationale

Strict dependency direction preserves architectural integrity and prevents higher layers from coupling back into lower layers.

Consequences

- Foundation does not depend on higher domains.
- Market Intelligence depends only on Foundation.
- Portfolio Intelligence cannot access Foundation directly.
- Presentation contains no business logic.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Product Map](./product-map.md)
- [Glossary](../project365/glossary.md)

### ADR-007 — Immutable Foundation Objects

Status:
- Accepted

Context

PROJECT365 requires reproducible historical analysis and trusted market state preservation.

Decision

MarketData and snapshots are immutable Foundation objects.

Rationale

Immutable Foundation objects preserve historical market states and support reproducible downstream analysis.

Consequences

- MarketData represents one trusted fetch.
- Snapshots represent market state at specific reference times.
- Historical analysis must use preserved immutable records.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Product Map](./product-map.md)
- [Glossary](../project365/glossary.md)

### ADR-008 — Event-Driven Architecture

Status:
- Accepted

Context

PROJECT365 includes an Event Bus in the Foundation Domain to publish approved domain events between components.

Decision

PROJECT365 uses approved domain events to communicate between components while preserving dependency direction.

Rationale

Event-driven communication supports modular boundaries without introducing direct reverse dependencies.

Consequences

- Events must follow approved domain ownership and dependency rules.
- Events must not allow higher layers to introduce direct dependencies into lower layers.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Product Map](./product-map.md)
- [Glossary](../project365/glossary.md)

### ADR-009 — Hard Gate Principle

Status:
- Accepted

Context

PROJECT365 applies regime-first decision logic where upstream conditions can constrain downstream decisions.

Decision

PROJECT365 follows the Hard Gate Principle.

Rationale

Hard gates keep downstream recommendations aligned with approved upstream market constraints.

Consequences

- Higher-level decisions can restrict lower-level decisions.
- Downstream decision support must respect approved regime and gate constraints.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Glossary](../project365/glossary.md)

### ADR-010 — Explainable Decision System

Status:
- Accepted

Context

PROJECT365 is an Explainable Analytics Platform and Decision Support System, not a trading bot, price prediction system, or financial advisor.

Decision

Every recommendation and decision-support output must remain explainable and auditable.

Rationale

Explainability and auditability support user trust, reproducibility, and decision quality.

Consequences

- Governance records and validates decision-support outputs.
- Presentation explains conclusions without adding business logic.
- Outputs must remain decision support and not financial advice or trade execution.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Product Map](./product-map.md)
- [Glossary](../project365/glossary.md)

### ADR-011 — Architecture Freeze Amendment Process and Foundation Data Contract Extensibility

Status:
- Accepted

Context

Architecture Freeze was declared covering Governance, Documentation, Specifications, Technical Designs, Issue Specifications, and Acceptance Criteria. No document in the repository defines a process for amending a frozen artifact once Architecture Freeze is declared.

Separately, provider research (research/providers/MasterProviderResearch.md, ProviderMapping.md, ProviderCoverageMatrix.md) identifies 17 providers mapped across 45 raw variables spanning global market data, on-chain metrics, macroeconomic indicators, and derivatives data. TD-001 MarketData Contract, the only Foundation-level data contract currently specified, is scoped exclusively to global market data fields. TD-001's own Future Extensions section and review checklist ("No future technical debt identified") do not identify or anticipate on-chain, macroeconomic, or derivatives domains. No other Foundation-level data contract exists or is planned in any frozen document. 16 of the 17 researched providers therefore have no defined path into the system as currently specified.

Decision

1. Architecture Freeze may be amended through a new ADR that explicitly names the frozen artifact being changed, the reason for the change, and the owner who approved it. This ADR itself is the first application of that process.
2. Foundation shall support multiple sibling data contracts, not only MarketData Contract. TD-001 MarketData Contract remains scoped to global market data and is not expanded to absorb other domains. New Foundation-level data contracts (for example an on-chain metrics contract, a macroeconomic indicator contract, and a derivatives metrics contract) shall be specified as separate Technical Design documents, each following the same rigor, review, and freeze process TD-001 followed.
3. TD-000 Data Provider Framework requires no change under this decision. Its acceptance criteria were already written to be provider-agnostic and were not the source of this gap.

Rationale

ADR-005 Separation of Concerns already requires each domain and module to keep one clear responsibility. Expanding MarketData Contract to hold on-chain, macroeconomic, or derivatives fields would violate that responsibility boundary. Specifying sibling contracts preserves TD-001's existing scope and test coverage while giving the remaining provider domains a defined, equally rigorous path into Foundation.

Consequences

- Architecture Freeze status changes from "Frozen" to "Frozen — Amendment ADR-011 In Progress" until the new Foundation contract Technical Designs are authored and frozen.
- current-status.md, backlog.md, roadmap.md, and README.md must be updated to reflect this amended freeze status consistently.
- ADR-007 Immutable Foundation Objects currently names "MarketData and snapshots" specifically; it should be revisited to confirm immutability applies to all Foundation-level data contracts, not only MarketData, once new contracts are specified.
- M5 Intelligence Layer engines (TD-008 through TD-013) may plan against multiple Foundation contracts rather than assuming MarketData is the only input source.
- No existing frozen Technical Design other than this amendment's direct scope is reopened by this decision.

References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Product Map](./product-map.md)
- [Glossary](../project365/glossary.md)
- [TD-000 Data Provider Framework](../specs/TD-000-DataProviderFramework.md)
- [TD-001 MarketData](../specs/TD-001-MarketData.md)
- research/providers/MasterProviderResearch.md
- research/providers/ProviderMapping.md
- research/providers/ProviderCoverageMatrix.md

## 4. Traceability

| ADR | Decision | Source Documents |
| --- | --- | --- |
| ADR-001 | Specification Driven Development | BRD; PRD; Architecture; Glossary |
| ADR-002 | SaaS-Ready Architecture with Initial Personal Product Deployment | BRD; PRD; Architecture; Product Map; Glossary |
| ADR-003 | Documentation-First Workflow | BRD; PRD; Architecture; Glossary |
| ADR-004 | Single Source of Truth | BRD; PRD; Architecture; Product Map; Glossary |
| ADR-005 | Separation of Concerns | BRD; PRD; Architecture; Product Map; Glossary |
| ADR-006 | Layer Dependency Rules | BRD; PRD; Architecture; Product Map; Glossary |
| ADR-007 | Immutable Foundation Objects | BRD; PRD; Architecture; Product Map; Glossary |
| ADR-008 | Event-Driven Architecture | BRD; PRD; Architecture; Product Map; Glossary |
| ADR-009 | Hard Gate Principle | BRD; PRD; Architecture; Glossary |
| ADR-010 | Explainable Decision System | BRD; PRD; Architecture; Product Map; Glossary |
| ADR-011 | Architecture Freeze Amendment Process and Foundation Data Contract Extensibility | BRD; PRD; Architecture; Product Map; Glossary; TD-000; TD-001; Provider Research |

## 5. References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](./architecture.md)
- [Product Map](./product-map.md)
- [Glossary](../project365/glossary.md)

## 6. Change History

| Version | Date | Summary |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Normalized existing architecture decisions into the approved ADR template; preserved approved decisions; added rationale, consequences, dependencies, affected documents, related ADRs, traceability, references, and change history. |
| 1.1 | 2026-07-13 | Expanded registry to ten ADRs; simplified ADR fields; removed Dependencies and Affected Documents from ADR entries; simplified traceability to a concise registry table. |
| 1.2 | 2026-09-08 | Added ADR-011 establishing the Architecture Freeze amendment process and deciding that Foundation shall support multiple sibling data contracts rather than expanding TD-001 MarketData Contract to cover on-chain, macroeconomic, and derivatives domains. |
