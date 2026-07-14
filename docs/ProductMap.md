# PROJECT365 Product Map

## 1. Document Information

- **Status:** Draft
- **Version:** 1.2
- **Owner:** PROJECT365 Product
- **Last Updated:** 2026-07-14
- **Depends On:** [BRD](./BRD.md), [PRD](./PRD.md), [Architecture](./Architecture.md), [Glossary](./Glossary.md)
- **Referenced By:** PRD, Architecture, Technical Design documents, Issue Specifications, Acceptance Criteria, Implementation Prompts

## 2. Purpose

This Product Map defines the approved PROJECT365 product domains, modules, responsibilities, capability mapping, dependency rules, and navigation structure derived from the [BRD](./BRD.md), [PRD](./PRD.md), and [Architecture](./Architecture.md).

PROJECT365 is an Adaptive Crypto Market Intelligence Platform that transforms raw crypto market data into explainable market intelligence and portfolio exposure recommendations. The Product Map preserves the approved regime-first, explainable, auditable, and modular product structure without introducing new domains or modules.

## 3. Scope

PROJECT365 is a Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform.

This Product Map covers the approved product domain hierarchy:

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

The current release scope is Foundation v0.1 only:

- MarketData Contract
- Health Layer
- Snapshot Engine

The full approved product map includes only the domains and modules listed in this document.

## 4. Product Domains

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

## 5. Domain Responsibilities

| Domain | Responsibility |
| --- | --- |
| Foundation | Own provider infrastructure, trusted market data, validation readiness, immutable snapshots, domain events, and storage as the Single Source of Truth. |
| Market Intelligence | Own market deltas, liquidity analysis, regime analysis, capital flow analysis, market state assessment, confidence, and overall market assessment. |
| Portfolio Intelligence | Own exposure recommendations, portfolio intelligence, risk intelligence, and cluster rotation intelligence. |
| Governance | Own decision logs, validation, model versioning, champion-challenger support, and rollback support for explainability and auditability. |
| Presentation | Own user-facing display, inspection, explainability views, historical exploration, and settings. |

## 6. Module Hierarchy

```text
Foundation Domain
├── Provider Framework
├── Data Service
├── MarketData Contract
├── Health Layer
├── Snapshot Engine
├── Event Bus
└── Storage Layer

Market Intelligence Domain
├── Delta Engine
├── Triad Liquidity Framework
├── Regime Engine
├── LDS Engine
├── Capital Flow Engine
├── Market State Engine
├── Confidence Engine
└── OMS Engine

Portfolio Intelligence Domain
├── Exposure Engine
├── Portfolio Engine
├── Risk Engine
└── Cluster Rotation Engine

Governance Domain
├── Decision Log
├── Validation Framework
├── Champion-Challenger
├── Model Versioning
└── Rollback Framework

Presentation Domain
├── Dashboard
├── Inspector
├── Explainability
├── Historical Explorer
└── Settings
```

Each module has one approved owner domain. Modules must not be moved between domains without an approved documentation update. The Provider Framework is an infrastructure module that enables provider implementations to be connected consistently; it is not a standalone product capability.

## 7. Capability Mapping

| Business Capability | Primary Domain | Primary Module or Modules |
| --- | --- | --- |
| Ingest global market data. | Foundation | Data Service |
| Validate market data. | Foundation | MarketData Contract; Health Layer |
| Create immutable snapshots. | Foundation | Snapshot Engine; Storage Layer |
| Calculate market deltas. | Market Intelligence | Delta Engine |
| Determine market regime. | Market Intelligence | Regime Engine |
| Generate explainable exposure recommendations. | Portfolio Intelligence; Governance | Exposure Engine; Decision Log; Validation Framework |
| Provide historical exploration. | Presentation; Foundation | Historical Explorer; Snapshot Engine; Storage Layer |
| Support explainability and auditability. | Governance; Presentation | Decision Log; Validation Framework; Model Versioning; Explainability; Inspector |
| Preserve historical market states for reproducible analysis. | Foundation; Governance | Snapshot Engine; Storage Layer; Model Versioning |
| Present market intelligence in a decision-focused way. | Presentation | Dashboard; Inspector; Explainability; Historical Explorer; Settings |

## 8. Dependency Rules

PROJECT365 follows these approved dependency rules:

- Lower layers never depend on higher layers.
- Foundation does not depend on Market Intelligence, Portfolio Intelligence, Governance, or Presentation.
- Market Intelligence depends only on Foundation.
- Portfolio Intelligence depends on Market Intelligence and cannot access Foundation directly.
- Governance supports explainability and auditability but never calculates scores.
- Presentation contains no business logic.
- Provider Framework is infrastructure in the Foundation Domain and must not be represented as a product capability.
- External data sources and adapters, including CoinGecko, DefiLlama, Alternative.me, and Mempool, are not modules; they are future Provider Framework implementations.
- Foundation is the Single Source of Truth.
- Implementation must not add features that are not specified.
- Architecture must not change without approval.

Approved dependency direction:

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

## 9. Navigation Structure

The Presentation Domain owns user-facing navigation. Navigation must present intelligence in a decision-focused way and must not contain business logic.

Approved navigation areas are:

| Navigation Area | Owning Module | Purpose |
| --- | --- | --- |
| Dashboard | Dashboard | Display decision-focused market intelligence. |
| Inspector | Inspector | Allow users to inspect market conclusions. |
| Explainability | Explainability | Present reasons behind decisions and recommendations. |
| Historical Explorer | Historical Explorer | Provide historical exploration of market states. |
| Settings | Settings | Provide user-facing configuration controls. |

Navigation must remain downstream of Foundation, Market Intelligence, Portfolio Intelligence, and Governance outputs.

## 10. Current Release Scope

Current release scope is Foundation v0.1.

Included:

- MarketData Contract
- Health Layer
- Snapshot Engine

Excluded from Foundation v0.1:

- Provider Framework implementations, including CoinGecko, DefiLlama, Alternative.me, and Mempool
- Database Design
- APIs
- Dashboard
- Portfolio Engine
- AI Features

## 11. Future Expansion

Future expansion is limited to the approved modules outside Foundation v0.1 that are already listed in this Product Map:

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

Future expansion must preserve the approved domain hierarchy, module ownership, capability mapping, dependency direction, and terminology. CoinGecko, DefiLlama, Alternative.me, and Mempool may be considered future Provider Framework implementations, but they must not be added to the Product Map as modules.

## 12. Out of Scope

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

The Product Map must not introduce modules, domains, navigation areas, or capabilities outside the approved BRD, PRD, and Architecture scope.

## 13. Traceability

| Product Map Area | Source of Truth | Notes |
| --- | --- | --- |
| Product positioning | BRD §2; PRD Purpose; Architecture §2 | Preserves Adaptive Crypto Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform positioning. |
| Product domains | BRD §10; PRD Scope; Architecture §6 | Preserves Foundation, Market Intelligence, Portfolio Intelligence, Governance, and Presentation domains. |
| Module ownership | BRD §10; PRD Scope; Architecture §6; Architecture §8 | Preserves approved module names and owning domains, including Provider Framework ownership by the Foundation Domain. |
| Domain hierarchy | BRD §14; PRD Constraints; Architecture §5 | Preserves Foundation → Market Intelligence → Portfolio Intelligence → Governance → Presentation. |
| Capability mapping | BRD §12; PRD Functional Requirements | Maps approved business capabilities to approved domains and modules while clarifying that Provider Framework is infrastructure, not a product capability. |
| Dependency rules | BRD §13; PRD Business Rules; Architecture §10 | Preserves lower-layer dependency direction, Foundation Single Source of Truth, Portfolio Intelligence access restriction, Governance scoring restriction, and Presentation business logic restriction. |
| Current release scope | BRD §10; PRD Scope; Architecture §3 | Preserves Foundation v0.1 scope: MarketData Contract, Health Layer, and Snapshot Engine. |
| Out of scope | BRD §11; PRD Out of Scope; Architecture §16 | Preserves product boundaries and Foundation v0.1 exclusions. |
| Terminology | Glossary; BRD; PRD; Architecture | Uses approved domain, module, layer, engine, service, contract, provider, and framework terminology; treats CoinGecko, DefiLlama, Alternative.me, and Mempool as future Provider implementations rather than modules. |

## 14. References

- [BRD](./BRD.md)
- [PRD](./PRD.md)
- [Architecture](./Architecture.md)
- [Glossary](./Glossary.md)
- [Architecture Decision Records](./Decisions.md)
- [Backlog](./Backlog.md)
- [Roadmap](./Roadmap.md)
- [Current Status](./CurrentStatus.md)

## 15. Change History

| Version | Date | Summary |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Initial Product Map draft. |
| 1.1 | 2026-07-13 | Normalized Product Map to the approved template; aligned domains, modules, responsibilities, capability mapping, dependency rules, navigation, current scope, and terminology with the BRD, PRD, and Architecture without introducing new domains or modules. |
| 1.2 | 2026-07-14 | Added Provider Framework to the Foundation Domain, clarified it as infrastructure rather than a product capability, and identified CoinGecko, DefiLlama, Alternative.me, and Mempool as future Provider implementations rather than modules. |
