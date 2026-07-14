# PROJECT365 Architecture

## 1. Document Information

- **Status:** Draft
- **Version:** 1.1
- **Owner:** PROJECT365 Architecture
- **Last Updated:** 2026-07-14
- **Depends On:** [BRD](./BRD.md), [PRD](./PRD.md), [Glossary](./Glossary.md), [Product Map](./ProductMap.md), [Architecture Decision Records](./Decisions.md)
- **Referenced By:** Technical Design documents, Issue Specifications, Acceptance Criteria, Implementation Prompts

## 2. Purpose

This architecture document defines the approved PROJECT365 architecture derived from the [PRD](./PRD.md) and upstream [BRD](./BRD.md).

PROJECT365 is an Adaptive Crypto Market Intelligence Platform that transforms raw crypto market data into explainable market intelligence and portfolio exposure recommendations. The architecture preserves the approved regime-first, explainable, auditable, and modular approach without introducing new design.

## 3. Scope

This document covers the approved architecture domains, layers, component responsibilities, ownership model, dependency rules, data flow, event flow, public contracts, cross-cutting concerns, extension points, traceability, and references for PROJECT365.

Current implementation scope remains Foundation v0.1 only:

- MarketData Contract
- Health Layer
- Snapshot Engine

The full approved product architecture includes:

- Foundation Domain
- Market Intelligence Domain
- Portfolio Intelligence Domain
- Governance Domain
- Presentation Domain

## 4. Architecture Principles

PROJECT365 follows these approved architecture principles:

- Regime First.
- Hard Gate Principle.
- Single Source of Truth.
- Separation of Concerns.
- Explainability.
- Auditability.
- Modular Architecture.

These principles align with the BRD business constraints and the PRD business rules.

## 5. System Overview

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

PROJECT365 follows this high-level business process:

```text
Raw Crypto Market Data
↓
Foundation Domain
↓
Market Intelligence Domain
↓
Portfolio Intelligence Domain
↓
Governance Domain
↓
Presentation Domain
↓
User Decision Support
```

Foundation provides trusted data. Market Intelligence transforms that data into market understanding. Portfolio Intelligence converts market intelligence into actionable exposure decisions. Governance provides explainability and auditability. Presentation displays decision-focused intelligence to users.

## 6. Domain Architecture

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

## 7. Layer Architecture

### Layer 1 — Foundation

Purpose: Provide trusted, immutable, and validated market data.

Rules:

- Contains no business logic.
- Performs no market analysis.
- Does not depend on higher layers.
- Acts as the Single Source of Truth for downstream systems.

### Layer 2 — Market Intelligence

Purpose: Understand global market conditions.

Rules:

- Depends only on Foundation.
- Produces intelligence, not user interface output.
- Calculates market deltas and market regime through approved modules.

### Layer 3 — Portfolio Intelligence

Purpose: Transform market intelligence into actionable exposure decisions.

Rules:

- Depends on Market Intelligence.
- Cannot access Foundation directly.
- Produces portfolio actions and exposure recommendations.

### Layer 4 — Governance

Purpose: Provide explainability and auditability.

Rules:

- Provides decision logging, validation, model versioning, champion-challenger support, and rollback support.
- Never calculates scores.
- Ensures recommendation and decision-support outputs remain explainable and auditable.

### Layer 5 — Presentation

Purpose: Display information to users.

Rules:

- Contains no business logic.
- Presents market intelligence in a decision-focused way.
- Provides dashboard, inspection, explainability, historical exploration, and settings experiences.

## 8. Component Responsibilities

| Domain | Component | Responsibility |
| --- | --- | --- |
| Foundation | Provider Framework | Provide provider abstraction, normalization boundary, provider registry, and provider lifecycle governance. |
| Foundation | Data Service | Orchestrate provider aggregation and produce MarketData; contains orchestration only. |
| Foundation | MarketData Contract | Define the immutable market data structure and rules used as the Single Source of Truth. |
| Foundation | Health Layer | Validate market data health and support snapshot readiness. |
| Foundation | Snapshot Engine | Create immutable snapshots for reproducible historical analysis. |
| Foundation | Event Bus | Publish approved domain events between components. |
| Foundation | Storage Layer | Persist trusted market data and immutable snapshots. |
| Market Intelligence | Delta Engine | Calculate market deltas from snapshots. |
| Market Intelligence | Triad Liquidity Framework | Support liquidity analysis as part of global market condition assessment. |
| Market Intelligence | Regime Engine | Determine market regime. |
| Market Intelligence | LDS Engine | Detect liquidity divergence. |
| Market Intelligence | Capital Flow Engine | Assess capital flow conditions. |
| Market Intelligence | Market State Engine | Assess overall market state. |
| Market Intelligence | Confidence Engine | Communicate reliability of market assessments. |
| Market Intelligence | OMS Engine | Aggregate approved market intelligence into an overall market assessment. |
| Portfolio Intelligence | Exposure Engine | Generate explainable exposure recommendations. |
| Portfolio Intelligence | Portfolio Engine | Support portfolio-level decision intelligence. |
| Portfolio Intelligence | Risk Engine | Support risk management and risk budgeting decisions. |
| Portfolio Intelligence | Cluster Rotation Engine | Support cluster rotation analysis and recommendations. |
| Governance | Decision Log | Record decision-support outputs for auditability. |
| Governance | Validation Framework | Validate outputs against approved rules and acceptance criteria. |
| Governance | Champion-Challenger | Support comparison of approved model versions. |
| Governance | Model Versioning | Track model and rule versions for reproducibility. |
| Governance | Rollback Framework | Support rollback to approved model or rule versions. |
| Presentation | Dashboard | Display decision-focused market intelligence. |
| Presentation | Inspector | Allow users to inspect market conclusions. |
| Presentation | Explainability | Present reasons behind decisions and recommendations. |
| Presentation | Historical Explorer | Provide historical exploration of market states. |
| Presentation | Settings | Provide user-facing configuration controls. |

## 9. Ownership Model

Ownership follows domain responsibility boundaries:

- Foundation owns provider framework governance, trusted market data, validation readiness, snapshots, events, and storage.
- Market Intelligence owns market deltas, liquidity analysis, regime analysis, capital flow analysis, market state assessment, confidence, and overall market scoring.
- Portfolio Intelligence owns exposure recommendations, portfolio intelligence, risk intelligence, and cluster rotation intelligence.
- Governance owns decision logs, validation, model versioning, champion-challenger support, and rollback support.
- Presentation owns user-facing display, inspection, explainability views, historical exploration, and settings.

Each module has one clear responsibility and must not redefine ownership held by another module.

## 10. Dependency Rules

PROJECT365 follows these dependency rules:

- Lower layers never depend on higher layers.
- Foundation does not depend on Market Intelligence, Portfolio Intelligence, Governance, or Presentation.
- Market Intelligence depends only on Foundation.
- Portfolio Intelligence depends on Market Intelligence and cannot access Foundation directly.
- Governance supports explainability and auditability but never calculates scores.
- Presentation contains no business logic.
- Foundation is the Single Source of Truth.
- Providers are never accessed outside the Data Service.
- Health Layer depends only on MarketData.
- Snapshot Engine depends only on Health Layer output.
- Implementation must not add features that are not specified.
- Architecture must not change without approval.

## 11. Data Flow

The approved data flow is:

```text
External Data Sources
↓
Provider Framework
↓
Data Service
↓
MarketData Contract
↓
Health Layer
↓
Snapshot Engine
↓
Storage Layer
↓
Market Intelligence Domain
↓
Portfolio Intelligence Domain
↓
Governance Domain
↓
Presentation Domain
↓
User Decision Support
```

The Provider Framework defines the approved provider abstraction, normalization boundary, provider registry, and provider lifecycle. Data Service orchestrates provider aggregation through the Provider Framework and produces MarketData. MarketData is the immutable representation of market data from a single fetch. Health Layer depends only on MarketData. Snapshot Engine depends only on Health Layer output. Snapshots are immutable representations of market state at specific reference times. Deltas are calculated from snapshots and are used by Market Intelligence. Portfolio Intelligence consumes market intelligence outputs rather than accessing Foundation directly.

## 12. Event Flow

The approved event flow is:

```text
Foundation events
↓
Market Intelligence events
↓
Portfolio Intelligence events
↓
Governance records
↓
Presentation updates
```

The Event Bus belongs to the Foundation Domain and publishes approved domain events between components. Events must preserve dependency direction and must not allow higher layers to introduce direct dependencies into lower layers.

## 13. Public Contracts

PROJECT365 public contracts are formal definitions that guarantee consistency between producers and consumers.

Approved contracts include:

- MarketData Contract for immutable market data structure and rules.
- Snapshot-related outputs from the Snapshot Engine for reproducible historical analysis.
- Domain events published through the Event Bus.
- Decision-support outputs that remain explainable and auditable.

Current Foundation v0.1 contract scope is limited to the MarketData Contract, Health Layer, and Snapshot Engine.

## 14. Cross-Cutting Concerns

PROJECT365 cross-cutting concerns are:

- Explainability: every recommendation and decision-support output must explain why it exists.
- Auditability: historical decisions and market states must be reproducible and inspectable.
- Historical reproducibility: immutable snapshots preserve historical market states.
- System stability: architecture boundaries support reliable operation.
- User trust: outputs must remain decision support, not financial advice or trade execution.
- Specification Driven Development: implementation must remain traceable from BRD to PRD, Technical Design, Issue, Implementation, Review, and Freeze.
- Documentation-first workflow: implementation must preserve approved documentation context.

## 15. Extension Points

Approved extension points are the future modules already identified by the PRD and Product Map outside Foundation v0.1:

- Provider Framework
- Data Service
- Event Bus
- Storage Layer
- Delta Engine
- Triad Liquidity Framework
- Regime Engine
- LDS Engine
- Capital Flow Engine
- Market State Engine
- Confidence Engine
- OMS Engine
- Exposure Engine
- Portfolio Engine
- Risk Engine
- Cluster Rotation Engine
- Decision Log
- Validation Framework
- Champion-Challenger
- Model Versioning
- Rollback Framework
- Dashboard
- Inspector
- Explainability
- Historical Explorer
- Settings

Extension points must not introduce unapproved scope or change the approved architecture sequence.

## 16. Out of Scope

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

Foundation v0.1 excludes:

- Database Design
- APIs
- Dashboard
- Portfolio Engine
- AI Features

## 17. Traceability

| Architecture Area | Source of Truth | Notes |
| --- | --- | --- |
| Product positioning | BRD §2; PRD §2 | Adaptive Crypto Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform. |
| Scope and domains | BRD §10; PRD §3; Product Map | Domain and module names are normalized to PRD and Product Map terminology. |
| Architecture principles | BRD §13; PRD §8 | Preserves Regime First, Hard Gate Principle, Single Source of Truth, Separation of Concerns, Explainability, Auditability, and Modular Architecture. |
| Architecture sequence | BRD §19 BAC-005; PRD §10 | Preserves Foundation → Market Intelligence → Portfolio Intelligence → Governance → Presentation. |
| Dependency rules | BRD §13; PRD §8 | Preserves lower-layer dependency rules, provider access restriction through Data Service, Health Layer dependency on MarketData, Snapshot Engine dependency on Health Layer output, Presentation business logic restriction, Governance scoring restriction, Foundation Single Source of Truth, and Portfolio Intelligence access restriction. |
| Current scope | BRD §10; PRD §3 | Foundation v0.1 remains limited to MarketData Contract, Health Layer, and Snapshot Engine. |
| Out of scope | BRD §11; PRD §16 | Preserves product positioning boundaries and Foundation v0.1 exclusions. |
| Terminology | Glossary; Product Map; PRD | Uses official domain, module, layer, engine, service, contract, and framework terminology. |

## 18. References

- [BRD](./BRD.md)
- [PRD](./PRD.md)
- [Glossary](./Glossary.md)
- [Product Map](./ProductMap.md)
- [Architecture Decision Records](./Decisions.md)
- [Backlog](./Backlog.md)
- [Roadmap](./Roadmap.md)
- [Current Status](./CurrentStatus.md)

## 19. Change History

| Version | Date | Summary |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Initial architecture draft. |
| 1.1 | 2026-07-13 | Normalized architecture to the approved template; derived content from the PRD and BRD; preserved approved architecture sequence and dependency rules; normalized terminology without introducing new design. |
| 1.1 | 2026-07-14 | Formalized Provider Framework documentation, Foundation module listing, provider/data service responsibilities, dependency rules, data flow, and extension point without introducing implementation. |
