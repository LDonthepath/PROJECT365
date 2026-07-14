# Technical Design

## 1. Document Information

| Field | Value |
|------|------|
| Status | Ready to Freeze |
| Version | 1.0 |
| Owner | PROJECT365 Architecture |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR |
| Referenced By | Data Service, MarketData Contract, Issue Specification, Acceptance Criteria, Implementation Prompt |

---

## 2. Purpose

Define the Technical Design for TD-000 Data Provider Framework.

The Data Provider Framework is an upstream Foundation Technical Design that formalizes the infrastructure boundary between External Data Sources and Data Service.

This document translates approved product and architecture requirements into a provider abstraction design without redefining business requirements, product behavior, or implementation details.

---

## 3. Scope

This Technical Design covers the Provider Framework as Foundation infrastructure.

Included responsibilities:

- Provider interface.
- Provider Result contract.
- Provider Error contract.
- Provider metadata.
- Source attribution.
- Retry boundary.
- Rate limit boundary.
- Normalization boundary.
- Registration strategy.
- Extension strategy.
- Dependency rules.
- Non-goals.

Excluded responsibilities:

- Data Service orchestration logic.
- MarketData Contract definition.
- Health Layer validation.
- Snapshot Engine snapshot creation.
- Provider-specific implementation details.
- Product module behavior.

---

## 4. Background

The approved Foundation architecture places the Provider Framework upstream of Data Service and downstream of External Data Sources.

The approved dependency sequence is:

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
```

The Provider Framework exists so Data Service can interact with external market data sources through consistent infrastructure contracts while preserving provider agnosticism, source attribution, and clear dependency boundaries.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Trusted, explainable, auditable market intelligence requires reliable upstream data handling. |
| PRD | Foundation must provide trusted market data before downstream intelligence is produced. |
| Architecture | Foundation Domain includes Provider Framework, Data Service, MarketData Contract, Health Layer, and Snapshot Engine. |
| ADR | Approved modular architecture and separation of concerns. |

Every technical decision in this document is traceable to the Foundation Domain dependency sequence and separation-of-concerns rules.

---

## 6. Design Overview

The Provider Framework is an infrastructure framework that defines how external data providers are represented, registered, called, attributed, and normalized before Data Service orchestration produces MarketData.

Responsibilities:

- Define a common provider interface.
- Define standardized provider results.
- Define standardized provider errors.
- Carry provider metadata and source attribution.
- Establish retry, rate limit, and normalization boundaries.
- Support provider registration and extension.
- Preserve dependency direction from External Data Sources toward Data Service.

Boundaries:

- Provider Framework does not orchestrate provider selection for product outcomes.
- Provider Framework does not create MarketData.
- Provider Framework does not validate Health Status.
- Provider Framework does not create snapshots.
- Provider Framework does not contain business logic.

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Provider Interface | Define the required provider capability boundary. | Data Service provider request | Provider Result or Provider Error | Provider Framework |
| Provider Result Contract | Represent successful provider responses before MarketData creation. | Provider response payload and attribution | Provider Result | Provider Framework |
| Provider Error Contract | Represent provider failures in a provider-agnostic form. | Provider failure information | Provider Error | Provider Framework |
| Provider Metadata | Describe provider identity, capabilities, and operational constraints. | Provider registration information | Provider metadata record | Provider Framework |
| Source Attribution | Preserve source identity and fetch context for downstream traceability. | External source identity and fetch context | Attribution fields within Provider Result | Provider Framework |
| Provider Registry | Make approved providers discoverable to Data Service. | Provider metadata and provider interface reference | Registered provider catalog | Provider Framework |
| Data Service Boundary | Own provider orchestration and MarketData production. | Registered providers and Provider Results | MarketData Contract | Data Service |

---

## 8. Data Model

The Provider Framework defines infrastructure contracts only.

### Provider Interface

The Provider Interface defines the minimum provider capability exposed to Data Service:

- Provider identity.
- Provider metadata access.
- Supported data capability declaration.
- Data fetch capability.
- Provider Result output on success.
- Provider Error output on failure.

The interface is provider-agnostic. CoinGecko or any other provider may be used as an example provider, but no provider-specific behavior is part of the framework contract.

### Provider Result Contract

A Provider Result represents a successful provider response before Data Service creates MarketData.

Required contract characteristics:

- Provider identity.
- Source attribution.
- Fetch timestamp.
- Raw or normalized provider payload boundary marker.
- Provider metadata reference.
- Result status.
- Contract version.

Provider Result is not MarketData and must not be consumed directly by Health Layer or Snapshot Engine.

### Provider Error Contract

A Provider Error represents a failed provider interaction in a provider-agnostic form.

Required contract characteristics:

- Provider identity.
- Error category.
- Retry eligibility.
- Rate limit indicator when applicable.
- Source attribution when available.
- Failure timestamp.
- Human-readable diagnostic summary.
- Contract version.

Provider Error does not decide product behavior. Data Service owns orchestration decisions after receiving provider errors.

### Provider Metadata

Provider metadata describes provider infrastructure capabilities and constraints.

Metadata may include:

- Provider identifier.
- Provider display name.
- Supported data capabilities.
- Supported attribution fields.
- Rate limit policy reference.
- Retry policy reference.
- Normalization support declaration.
- Provider contract version.

Provider metadata must not include market intelligence, portfolio logic, or product recommendations.

### Source Attribution

Source attribution preserves where provider data came from and how it was fetched.

Attribution may include:

- External source name.
- Provider identifier.
- Fetch source value intended for downstream MarketData mapping.
- Fetch timestamp.
- Provider response reference when available.

Source attribution supports traceability and auditability without introducing provider-specific business rules.

---

## 9. Public Interfaces

The Provider Framework exposes infrastructure interfaces to Data Service only.

### Provider Registration Interface

Inputs:

- Provider identity.
- Provider metadata.
- Provider interface reference.

Outputs:

- Registered provider catalog entry.

Expected behavior:

- Register only approved providers.
- Preserve provider metadata.
- Make providers discoverable to Data Service.

### Provider Fetch Interface

Inputs:

- Data Service provider request.
- Provider metadata context.

Outputs:

- Provider Result on success.
- Provider Error on failure.

Expected behavior:

- Fetch from the external data source through the provider boundary.
- Return provider-agnostic success or failure contracts.
- Preserve source attribution.

### Provider Metadata Interface

Inputs:

- Provider identity.

Outputs:

- Provider metadata.

Expected behavior:

- Expose provider capability and operational metadata to Data Service.
- Avoid exposing provider internals to Health Layer, Snapshot Engine, or downstream components.

---

## 10. Internal Flow

Approved execution sequence:

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
```

Processing sequence:

1. External Data Sources expose data outside PROJECT365.
2. Provider Framework represents approved external sources through provider infrastructure contracts.
3. Data Service discovers registered providers through the Provider Framework.
4. Data Service owns provider orchestration.
5. Provider Framework returns Provider Result or Provider Error to Data Service.
6. Data Service maps acceptable provider results into the MarketData Contract.
7. Health Layer validates MarketData health.
8. Snapshot Engine creates snapshots only after receiving MarketData and Health Status.

Dependency rules:

- External Sources may be accessed only through Provider Framework.
- Provider Framework may provide contracts and provider infrastructure to Data Service.
- Data Service depends on Provider Framework and MarketData Contract.
- MarketData Contract is downstream of Data Service output.
- Health Layer depends on MarketData Contract only for provider-derived data.
- Snapshot Engine depends on MarketData Contract and Health Status.
- Health Layer must not access providers.
- Snapshot Engine must not access providers.
- Provider Framework must not contain business logic.
- Data Service owns provider orchestration.

---

## 11. Error Handling

The Provider Framework standardizes provider failures without deciding downstream product behavior.

Validation:

- Provider identity must be known.
- Provider metadata must be present.
- Provider responses must resolve to either Provider Result or Provider Error.
- Source attribution must be preserved when available.

Failure scenarios:

- External source unavailable.
- Provider timeout.
- Provider authentication or authorization failure.
- Provider rate limit response.
- Provider malformed response.
- Provider unsupported capability.
- Provider registration mismatch.

Recovery strategy:

- Provider Error communicates failure category and retry eligibility to Data Service.
- Retry boundary is defined by Provider Framework policy metadata and executed only within approved orchestration ownership.
- Rate limit boundary is represented through provider metadata and Provider Error indicators.
- Data Service decides orchestration behavior after failures.
- Health Layer and Snapshot Engine do not recover provider failures directly because they must not access providers.

---

## 12. Non-Functional Considerations

Performance:

- Provider contracts should support efficient provider discovery and result handoff.

Reliability:

- Provider errors must be standardized so Data Service can handle failures consistently.

Maintainability:

- Providers must be replaceable without changing Health Layer or Snapshot Engine.

Testability:

- Provider contracts must be testable independently from Data Service orchestration and downstream consumers.

Scalability:

- Registration and extension strategies must support adding providers without changing downstream dependency rules.

Security:

- Provider Framework must avoid exposing provider credentials or sensitive external source details to downstream components.

Auditability:

- Source attribution must preserve enough context to support traceability from Data Service output back to external source interaction.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- ADR.
- External Data Sources.

Downstream dependencies governed by this design:

- Data Service.
- MarketData Contract.
- Health Layer.
- Snapshot Engine.

Approved dependency chain:

```text
External Sources
→ Provider Framework
→ Data Service
→ MarketData Contract
→ Health Layer
→ Snapshot Engine
```

---

## 14. Assumptions

- Provider Framework is Foundation infrastructure, not a product module.
- Data Service remains the owner of provider orchestration.
- MarketData remains the downstream Single Source of Truth for market data consumers.
- Health Layer validates MarketData and does not access Provider Framework.
- Snapshot Engine consumes MarketData and Health Status and does not access Provider Framework.
- Provider examples may reference CoinGecko or other external sources only as examples, not as framework-specific behavior.

---

## 15. Constraints

- Do not renumber TD-001, TD-002, or TD-003.
- TD-000 is an upstream Foundation Technical Design.
- Provider Framework must not contain business logic.
- Provider Framework must not create MarketData.
- Provider Framework must not evaluate Health Status.
- Provider Framework must not create snapshots.
- Health Layer must not access providers.
- Snapshot Engine must not access providers.
- Data Service owns provider orchestration.
- Provider-specific behavior must remain outside the generic framework contract except as non-binding examples.
- Technical Design must not include implementation code.

---

## 16. Out of Scope

This Technical Design does not cover:

- Source-specific adapter implementation.
- CoinGecko-specific behavior beyond examples.
- Provider credential storage.
- Network client implementation.
- Cache implementation.
- MarketData field definitions.
- Health Status contract definitions.
- Snapshot contract definitions.
- Market analysis.
- Regime calculations.
- Portfolio decisions.
- Dashboard behavior.
- Storage implementation.
- Event bus implementation.

---

## 17. Implementation Notes

Implementation guidance:

- Preserve the Provider Framework as infrastructure.
- Keep provider orchestration in Data Service.
- Keep provider contracts provider-agnostic.
- Keep retry and rate limit behavior at the provider boundary and expose only standardized metadata or errors to Data Service.
- Keep normalization at the boundary required to produce provider-agnostic Provider Results; MarketData creation remains Data Service responsibility.
- Add new providers through registration and extension mechanisms that do not alter downstream consumers.

No source code, implementation algorithm, or issue-level task breakdown is defined by this Technical Design.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Trusted, explainable, auditable market intelligence requirement. |
| PRD | Foundation data reliability and downstream intelligence readiness. |
| Architecture | Foundation Domain and dependency sequence. |
| Product Map | Provider Framework as Foundation component. |
| ADR | Modular architecture and separation of concerns. |

---

## 19. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- Roadmap
- Backlog
- TD-001 MarketData Contract
- TD-002 Health Layer
- TD-003 Snapshot Engine

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial TD-000 Data Provider Framework Technical Design |
