# PROJECT365 Business Requirements Document (BRD)

## 1. Document Information

**Project:** PROJECT365
**Document Type:** Business Requirements Document (BRD)
**Version:** 1.0
**Status:** Active
**Last Updated:** 2026-07-13

This BRD defines why PROJECT365 exists from a business perspective. It is the upstream business reference for the PRD, Technical Design documents, Issue Specifications, Acceptance Criteria, and implementation prompts.

Reference documents:

- [PRD](../business/prd.md)
- [Architecture](../architecture/architecture.md)
- [Product Map](../architecture/product-map.md)
- [Glossary](../project365/glossary.md)
- [Architecture Decision Records](../architecture/decisions.md)
- [Backlog](../implementation/backlog.md)
- [Current Status](../implementation/current-status.md)
- [Roadmap](../project365/roadmap.md)

---

## 2. Executive Summary

PROJECT365 is an Adaptive Crypto Market Intelligence Platform.

PROJECT365 exists to transform raw crypto market data into explainable market intelligence and portfolio exposure recommendations. It is a Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform.

PROJECT365 is not a trading bot, auto trading platform, price prediction system, or financial advisor.

The business intent is to help users understand market conditions, detect regime changes, improve decision quality, reduce emotional bias, and create an auditable decision framework.

---

## 3. Business Background

Crypto market participants face a fast-moving information environment with high volatility, conflicting signals, and limited structured context.

Many available tools provide indicators, signals, or dashboards, but they often do not explain why a market conclusion was reached. PROJECT365 addresses this by applying a regime-first, explainable, and auditable market intelligence approach.

The project follows Specification Driven Development and a documentation-first workflow to preserve long-term project context and reduce AI hallucination during implementation.

---

## 4. Business Problems

PROJECT365 addresses the following business problems:

### Information Overload

Crypto investors receive too much information with too little structure.

### Signal Conflicts

Different indicators often provide contradictory conclusions.

### Emotional Decisions

Investors can react emotionally to market movements without a structured decision framework.

### Lack of Explainability

Many tools provide signals without explaining why the signal exists.

### No Market Framework

There is no structured methodology in the project context for understanding crypto market conditions.

---

## 5. Vision

PROJECT365 will become the operating system for understanding crypto market conditions.

The product vision is an Adaptive Crypto Market Intelligence Platform that is explainable, auditable, modular, and regime-first.

---

## 6. Goals

PROJECT365 has the following business goals:

1. Understand global market conditions.
2. Detect regime changes.
3. Provide explainable exposure recommendations.
4. Create an auditable decision framework.
5. Build reusable market intelligence infrastructure.

---

## 7. Success Criteria

PROJECT365 business success is measured by:

- System stability.
- Accuracy of market state classification.
- Explainability completeness.
- Historical reproducibility.
- User trust.

---

## 8. Stakeholders

PROJECT365 business stakeholders are represented by the target user personas defined in the PRD.

### Crypto Investor

Uses PROJECT365 to understand market conditions and reduce emotional decisions.

### Active Trader

Uses PROJECT365 to understand regime shifts and improve risk management.

### Portfolio Manager

Uses PROJECT365 to manage exposure and allocate capital effectively.

### Researcher

Uses PROJECT365 to study market behavior and analyze historical patterns.

---

## 9. Target Users

### Crypto Investor

Goals:

- understand market conditions;
- reduce emotional decisions.

Pain points:

- information overload;
- contradictory signals.

### Active Trader

Goals:

- understand regime shifts;
- improve risk management.

### Portfolio Manager

Goals:

- manage exposure;
- allocate capital effectively.

### Researcher

Goals:

- study market behavior;
- analyze historical patterns.

---

## 10. Business Scope

PROJECT365 business scope includes the following domains:

### Foundation Domain

Provide trusted, immutable, and validated market data.

Modules:

- Data Service
- MarketData Contract
- Health Layer
- Snapshot Engine
- Event Bus
- Storage Layer

### Market Intelligence Domain

Understand global market conditions.

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

Transform market intelligence into actionable exposure decisions.

Modules:

- Exposure Engine
- Portfolio Engine
- Risk Engine
- Cluster Rotation Engine

### Governance Domain

Ensure explainability and auditability.

Modules:

- Decision Log
- Validation Framework
- Champion-Challenger
- Model Versioning
- Rollback Framework

### Presentation Domain

Present intelligence to users.

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

---

## 12. Business Capabilities

PROJECT365 requires the following business capabilities:

1. Ingest global market data.
2. Validate market data.
3. Create immutable snapshots.
4. Calculate market deltas.
5. Determine market regime.
6. Generate explainable exposure recommendations.
7. Provide historical exploration.
8. Support explainability and auditability.
9. Preserve historical market states for reproducible analysis.
10. Present market intelligence in a decision-focused way.

---

## 13. Business Constraints

PROJECT365 must operate within the following constraints:

### Architecture Constraints

- Regime First.
- Hard Gate Principle.
- Single Source of Truth.
- Separation of Concerns.
- Explainability.
- Auditability.
- Modular Architecture.

### Dependency Constraints

- Lower layers never depend on higher layers.
- Presentation contains no business logic.
- Governance never calculates scores.
- Foundation is the Single Source of Truth.
- Portfolio Intelligence cannot access Foundation directly.

### Delivery Constraints

- PROJECT365 follows Specification Driven Development.
- PROJECT365 uses a documentation-first workflow.
- The architecture is SaaS-ready but initially deployed as a single-user personal product.
- Implementation must not add features that are not specified.
- Architecture must not change without approval.

---

## 14. High Level Business Process

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

PROJECT365 follows this development process:

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

---

## 15. Assumptions

The BRD assumes:

- Users need a structured methodology for understanding crypto market conditions.
- Explainability and auditability improve decision quality and user trust.
- MarketData is the Single Source of Truth for downstream systems.
- Immutable snapshots support reproducible historical analysis.
- Specification Driven Development reduces hallucination and large refactors.
- Documentation-first workflow preserves project context and supports long-term AI collaboration.
- SaaS-ready architecture avoids future rewrites when moving from personal deployment to multi-user SaaS.

---

## 16. Risks

PROJECT365 has the following business risks:

### Information Quality Risk

If market data is invalid, stale, or inconsistent, downstream intelligence may become unreliable.

### Explainability Risk

If recommendations are not explainable, the product may fail to build user trust.

### Scope Creep Risk

If implementation adds unspecified features, the project may drift from Specification Driven Development.

### Architecture Drift Risk

If components violate layer responsibilities, the system may lose modularity and auditability.

### User Trust Risk

If users interpret PROJECT365 as financial advice, a trading bot, or a profit guarantee, expectations will conflict with the product positioning.

---

## 17. Roadmap

PROJECT365 roadmap:

### Milestone 0 — Product Blueprint

- BRD
- PRD
- Architecture
- Product Map
- Feature Map
- Roadmap
- Glossary

### Milestone 1 — Foundation Edition

- MarketData
- Health Layer
- Snapshot Engine

### Milestone 2 — Data Pipeline and Delta Edition

- Provider Framework
- Data Service
- Event Bus
- Storage Layer
- Delta Engine

### Milestone 3 — Triad Edition

- Triad Liquidity Framework

### Milestone 4 — Regime and Portfolio Intelligence Edition

- Regime Engine
- Exposure Engine

### Milestone 5 — Presentation Edition

- Dashboard
- Explainability
- Inspector

### Milestone 6 — Intelligence Edition

- LDS Engine
- OMS Engine
- Market State Engine
- Confidence Engine

### Milestone 7 — Portfolio Edition

- Exposure Recommendation
- Decision Log
- Cluster Rotation

### Milestone 8 — Advanced Governance Edition

- Governance
- Champion-Challenger

---

## 18. Deliverables

PROJECT365 business deliverables include:

### Product Blueprint Deliverables

- BRD
- PRD
- Architecture
- Product Map
- Feature Map
- Roadmap
- Glossary

### Foundation Specification Deliverables

- TD-001 MarketData Contract
- TD-002 Health Layer
- TD-003 Snapshot Engine

### Foundation Implementation Deliverables

- ISSUE-001 MarketData Implementation
- ISSUE-002 Health Layer Implementation
- ISSUE-003 Snapshot Engine Implementation

### Current Completed Foundation Deliverables

- MarketData Contract Foundation
- Health Layer Foundation
- Snapshot Foundation

---

## 19. Business Acceptance Criteria

PROJECT365 business acceptance criteria are:

### BAC-001

PROJECT365 clearly identifies the business problems of information overload, signal conflicts, emotional decisions, lack of explainability, and lack of a market framework.

### BAC-002

PROJECT365 remains positioned as a Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform.

### BAC-003

PROJECT365 does not position itself as a trading bot, auto trading platform, price prediction system, or financial advisor.

### BAC-004

PROJECT365 preserves the principles of Regime First, Hard Gate Principle, Single Source of Truth, Separation of Concerns, Explainability, Auditability, and Modular Architecture.

### BAC-005

PROJECT365 follows the documented architecture sequence:

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

### BAC-006

PROJECT365 implementation remains traceable through:

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

### BAC-007

Foundation v0.1 remains limited to MarketData Contract, Health Layer, and Snapshot Engine.

### BAC-008

Every recommendation and decision-support output remains explainable and auditable.

---

## 20. Glossary Reference

PROJECT365 uses the official terminology defined in [Glossary](../project365/glossary.md).

Key BRD terms include:

- Market Intelligence
- Portfolio Intelligence
- Domain
- Module
- Engine
- Layer
- Service
- Contract
- Framework
- MarketData
- Snapshot
- Anchor
- Delta
- Regime
- LDS
- OMS
- Confidence
- Explainability
- Auditability
- Single Source of Truth
- Hard Gate Principle
- Separation of Concerns
- BRD
- PRD
- Technical Design (TD)
- Issue
- Freeze
