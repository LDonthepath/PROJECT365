# PROJECT365 Architecture

## Architecture Philosophy

- Regime First
- Hard Gate Principle
- Single Source of Truth
- Separation of Concerns
- Explainability
- Modular Design

---

# High-Level Architecture

Foundation
↓
Market Intelligence
↓
Portfolio Intelligence
↓
Governance
↓
Presentation

---

# Layer Responsibilities

## Layer 1 — Foundation

Purpose:
Provide trusted and immutable market data.

Components:
- Data Service
- MarketData Contract
- Health Layer
- Snapshot Engine
- Event Bus
- Storage

Rules:
- No business logic.
- No market analysis.
- Cannot depend on higher layers.

---

## Layer 2 — Market Intelligence

Purpose:
Understand market conditions.

Components:
- Delta Engine
- Triad Liquidity Framework
- Regime Engine
- LDS Engine
- Capital Flow Engine
- Market State Engine
- Confidence Engine
- OMS Engine

Rules:
- Depends only on Foundation.
- Produces intelligence, not UI.

---

## Layer 3 — Portfolio Intelligence

Purpose:
Convert intelligence into actions.

Components:
- Exposure Engine
- Portfolio Engine
- Risk Engine
- Cluster Rotation Engine

Rules:
- Cannot access Foundation directly.

---

## Layer 4 — Governance

Purpose:
Provide explainability and auditability.

Components:
- Decision Log
- Validation Framework
- Model Versioning
- Champion-Challenger
- Rollback Framework

Rules:
- Never calculates scores.

---

## Layer 5 — Presentation

Purpose:
Display information to users.

Components:
- Dashboard
- Inspector
- Explainability
- Historical Explorer
- Settings

Rules:
- No business logic.
