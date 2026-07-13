# PROJECT365 Glossary
Version: 1.0
Status: Active

---

# Purpose

This document defines official terminology used throughout PROJECT365.

The goal is to:

- maintain naming consistency,
- reduce ambiguity,
- improve AI collaboration,
- preserve long-term project context.

---

# Core Concepts

## Market Intelligence

Definition:
The process of transforming raw market data into explainable insights.

Purpose:
Understand what is happening in the market.

Examples:
- Regime analysis
- Liquidity analysis
- Market state analysis

---

## Portfolio Intelligence

Definition:
The process of transforming market intelligence into portfolio actions.

Purpose:
Determine exposure and allocation decisions.

Examples:
- Exposure recommendation
- Risk budgeting
- Cluster rotation

---

# Architecture Terms

## Domain

Definition:
A high-level business area that groups related capabilities.

Purpose:
Organize the system by business responsibility.

Examples:
- Foundation Domain
- Market Intelligence Domain
- Portfolio Intelligence Domain

---

## Module

Definition:
A self-contained functional component inside a domain.

Purpose:
Break large domains into manageable pieces.

Examples:
- Health Layer
- Delta Engine
- Dashboard

---

## Engine

Definition:
A module that performs calculations, analysis, or decision making.

Purpose:
Produce intelligence or recommendations.

Examples:
- Delta Engine
- Regime Engine
- Portfolio Engine
- Risk Engine

---

## Layer

Definition:
An architectural abstraction that provides infrastructure capabilities.

Purpose:
Separate responsibilities between system components.

Examples:
- Health Layer
- Storage Layer
- Presentation Layer

---

## Service

Definition:
A component responsible for operational processes.

Purpose:
Perform actions or coordinate workflows.

Examples:
- Data Service
- Snapshot Service
- Validation Service

---

## Contract

Definition:
A formal definition of data structure and rules.

Purpose:
Guarantee consistency between producers and consumers.

Examples:
- MarketData Contract
- Snapshot Contract

---

## Framework

Definition:
A collection of multiple components that work together under one methodology.

Purpose:
Implement a larger analytical approach.

Examples:
- Triad Liquidity Framework
- Validation Framework

---

# Data Terms

## MarketData

Definition:
Immutable representation of market data from a single fetch.

Purpose:
Become the Single Source of Truth for downstream systems.

---

## Snapshot

Definition:
Immutable representation of market state at a specific reference time.

Purpose:
Provide reproducible historical analysis.

---

## Anchor

Definition:
A special snapshot representing an important market boundary.

Examples:
- Daily Anchor
- Weekly Anchor
- Monthly Anchor
- M5 Anchor
- H1 Anchor

---

## Delta

Definition:
The difference between two snapshots.

Purpose:
Measure market changes.

Examples:
- Closed Snapshot → Closed Snapshot
- Closed Snapshot → Live Market

---

# Intelligence Terms

## Regime

Definition:
The dominant market environment.

Examples:
- Risk On
- Neutral
- Risk Off

---

## LDS

Definition:
Liquidity Divergence System.

Purpose:
Detect divergence between liquidity and market behaviour.

---

## OMS

Definition:
Overall Market Score.

Purpose:
Aggregate multiple intelligence engines into one market assessment.

---

## Confidence

Definition:
The degree of certainty in the current market assessment.

Purpose:
Communicate reliability of recommendations.

---

# Governance Terms

## Explainability

Definition:
The ability to explain why a decision was made.

---

## Auditability

Definition:
The ability to reproduce and inspect historical decisions.

---

## Single Source of Truth

Definition:
A principle where only one component owns a particular state.

Examples:
- Health Layer owns snapshots.
- Delta Engine consumes snapshots.

---

## Hard Gate Principle

Definition:
A higher-level decision can restrict lower-level decisions.

Example:
Regime can limit exposure recommendations.

---

## Separation of Concerns

Definition:
Each component has one clear responsibility.

Example:
Delta Engine calculates deltas only.
It does not determine market regime.

---

# Development Terms

## BRD

Business Requirements Document.

Defines:
Why the product exists.

---

## PRD

Product Requirements Document.

Defines:
What the product should do.

---

## Technical Design (TD)

Defines:
How a component should be implemented.

---

## Issue

Defines:
A small, implementable unit of work.

---

## Freeze

Definition:
A document or design is considered stable and should not change without formal review.

---

# Official Naming Convention

Foundation Domain

Market Intelligence Domain

Portfolio Intelligence Domain

Governance Domain

Presentation Domain
