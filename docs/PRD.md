PROJECT365

Product Requirements Document (PRD)

Version: 1.0 Status: Draft Last Updated: 2026-07-13


---

1. Executive Summary

Product Name

PROJECT365 — Adaptive Crypto Market Intelligence Platform

Product Type

Market Intelligence & Decision Support Platform.

Purpose

Transform raw crypto market data into explainable market intelligence and portfolio exposure recommendations.

Product Vision

Become the operating system for understanding crypto market conditions.


---

2. Problem Statement

Crypto investors face several problems:

Information Overload

Too much information, too little structure.

Signal Conflicts

Different indicators often provide contradictory conclusions.

Emotional Decisions

Investors react emotionally to market movements.

Lack of Explainability

Most tools provide signals without explaining why.

No Market Framework

There is no structured methodology for understanding market conditions.


---

3. Mission

Build an explainable and auditable market intelligence platform that helps users:

understand market conditions,

detect regime changes,

improve decision quality,

reduce emotional bias.



---

4. Product Positioning

PROJECT365 IS

Market Intelligence Platform

Decision Support System

Explainable Analytics Platform


PROJECT365 IS NOT

Trading Bot

Auto Trading Platform

Price Prediction System

Financial Advisor



---

5. Core Principles

Principle 1

Regime First

Principle 2

Hard Gate Principle

Principle 3

Single Source of Truth

Principle 4

Separation of Concerns

Principle 5

Explainability

Principle 6

Auditability

Principle 7

Modular Architecture


---

6. Target Users

Persona 1 — Crypto Investor

Goals:

understand market conditions

reduce emotional decisions


Pain Points:

information overload

contradictory signals



---

Persona 2 — Active Trader

Goals:

understand regime shifts

improve risk management



---

Persona 3 — Portfolio Manager

Goals:

manage exposure

allocate capital effectively



---

Persona 4 — Researcher

Goals:

study market behavior

analyze historical patterns



---

7. Product Goals

Goal 1

Understand global market conditions.

Goal 2

Detect regime changes.

Goal 3

Provide explainable exposure recommendations.

Goal 4

Create an auditable decision framework.

Goal 5

Build reusable market intelligence infrastructure.


---

8. Non Goals

PROJECT365 will not:

predict prices,

guarantee profits,

execute trades,

provide financial advice,

manage exchange accounts.



---

9. Product Domains

Foundation Domain

Purpose: Provide trusted and immutable market data.

Modules:

Data Service

MarketData Contract

Health Layer

Snapshot Engine

Event Bus

Storage Layer



---

Market Intelligence Domain

Modules:

Delta Engine

Triad Liquidity Framework

Regime Engine

LDS Engine

Capital Flow Engine

Market State Engine

Confidence Engine

OMS Engine



---

Portfolio Domain

Modules:

Exposure Engine

Portfolio Engine

Risk Engine

Cluster Rotation Engine



---

Governance Domain

Modules:

Decision Log

Validation Framework

Champion-Challenger

Model Versioning

Rollback Framework



---

Presentation Domain

Modules:

Dashboard

Explainability

Inspector

Historical Explorer

Settings



---

10. High-Level Architecture

Foundation
↓
Market Intelligence
↓
Portfolio Intelligence
↓
Governance
↓
Presentation

Dependency Rules:

Lower layers never depend on higher layers.

Presentation contains no business logic.

Governance never calculates scores.

Foundation is the Single Source of Truth.



---

11. Functional Requirements

FR-001

System shall ingest global market data.

FR-002

System shall validate market data.

FR-003

System shall create immutable snapshots.

FR-004

System shall calculate market deltas.

FR-005

System shall determine market regime.

FR-006

System shall generate explainable exposure recommendations.

FR-007

System shall provide historical exploration.


---

12. Non-Functional Requirements

Performance

Fast and responsive.

Reliability

Graceful degradation.

Explainability

Every recommendation must be explainable.

Auditability

Every decision must be traceable.

Extensibility

Easy to add new engines.

Testability

All modules independently testable.

AI-Friendly Architecture

Small, isolated, specification-driven modules.


---

13. User Experience Goals

Simple.

Explainable.

Information dense but understandable.

Decision focused.



---

14. Deployment Strategy

Architecture Target

SaaS-ready.

Initial Deployment

Single-user personal deployment.


---

15. Development Methodology

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


---

16. Development Roadmap

M0

Product Blueprint

M1

Foundation Edition

M2

Delta Edition

M3

Triad Edition

M4

Regime Edition

M5

Dashboard Edition

M6

Intelligence Edition

M7

Portfolio Edition

M8

Advanced Edition


---

17. Success Metrics

System stability.

Accuracy of market state classification.

Explainability completeness.

Historical reproducibility.

User trust.



---

18. Future Vision

Multi-user SaaS.

Team Workspace.

API Platform.

AI Copilot.

Strategy Library.

Mobile Application.



---

Current Scope (Foundation v0.1)

Included:

MarketData Contract

Health Layer

Snapshot Engine


Excluded:

Database Design

APIs

Dashboard

Portfolio Engine

AI Features



---
