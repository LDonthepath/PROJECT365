# Technical Design

## 1. Document Information

| Field | Value |
|------|------|
| Status | Frozen |
| Version | 1.0 |
| Owner | PROJECT365 Architecture |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR |
| Referenced By | Issue Specification, Acceptance Criteria, Implementation Prompt |

---

## 2. Purpose

Define the Technical Design for TD-005 Event Bus.

Event Bus provides publish-subscribe communication between Foundation components and downstream domains through approved domain events. It preserves dependency direction and must never contain business logic or calculate market intelligence.

This document translates approved product and architecture requirements into an implementable technical design without redefining business requirements, product behavior, architecture, or implementation details.

---

## 3. Scope

This Technical Design covers Event Bus as a Foundation component.

Included responsibilities:

- Publish approved domain events.
- Manage subscriptions.
- Preserve dependency direction.
- Expose event handoff boundaries between approved components and domains.
- Support explainability and auditability through event metadata.

Excluded responsibilities:

- Business logic.
- Market intelligence calculations.
- Portfolio recommendations.
- Provider orchestration.
- MarketData definition.
- Snapshot creation or storage.

---

## 4. Background

The approved architecture includes Event Bus in Foundation and approves event-driven communication when events preserve domain ownership and dependency direction.

Approved domain dependency sequence:

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

Reference context is derived from BRD, PRD, Architecture, Product Map, Glossary, and ADR without duplicating or expanding those documents.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Foundation Domain includes Event Bus and requires approved dependency constraints. |
| PRD | Downstream intelligence depends on trusted Foundation outputs. |
| Architecture | Event Bus publishes approved domain events between components. |
| Product Map | Event Bus is an approved Foundation module. |
| ADR | Event-Driven Architecture, Layer Dependency Rules, Separation of Concerns. |

Every technical decision in this document is traceable to approved Foundation responsibilities, dependency rules, Single Source of Truth, Separation of Concerns, Hard Gate Principle, Explainability, and Auditability.

---

## 6. Design Overview

Event Bus is the communication boundary for approved domain events. It publishes events from owning components to permitted downstream consumers without allowing reverse dependencies or moving business logic into the bus.

Boundaries:

- Event Bus routes approved events only.
- Event Bus does not create MarketData.
- Event Bus does not validate Health Status.
- Event Bus does not create snapshots.
- Event Bus does not calculate intelligence, scores, recommendations, or presentation state.

Design principles:

- Preserve Single Source of Truth.
- Preserve Separation of Concerns.
- Preserve Hard Gate Principle.
- Preserve Explainability.
- Preserve Auditability.
- Preserve approved dependency direction.
- Contain no business logic unless explicitly owned by an approved downstream domain.
- Introduce no implementation details.

---

## 7. Component Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| Event Publisher Boundary | Accept approved domain events from owning components. | Approved event payload and metadata | Publishable domain event | Event Bus |
| Subscription Registry | Track permitted subscriptions by dependency rules. | Subscriber identity and event type | Approved subscription | Event Bus |
| Event Delivery Boundary | Deliver events to approved downstream consumers. | Publishable domain event | Event notification | Event Bus |
| Event Metadata Boundary | Preserve event identity, source, timestamp, and version. | Event context | Auditable event metadata | Event Bus |

---

## 8. Data Model

Event Bus defines communication contracts, not product data models.

Data contracts used:

- Approved Domain Event.
- Event metadata.
- Subscriber registration.

Minimum Domain Event characteristics:

- Event identity.
- Event type.
- Owning source component.
- Publish timestamp.
- Contract version.
- Payload reference to an approved contract or immutable object.

Events must not redefine MarketData, Health Status, Snapshot, or downstream intelligence contracts.

---

## 9. Public Interfaces

### Publish Interface

Inputs:

- Approved domain event.
- Event metadata.

Outputs:

- Event accepted for permitted subscribers or rejected with reason.

Expected behavior:

- Accept only approved events from owning components.
- Preserve event source and version.

### Subscription Interface

Inputs:

- Subscriber identity.
- Requested event type.

Outputs:

- Approved or rejected subscription.

Expected behavior:

- Permit subscriptions only when dependency direction is preserved.

---

## 10. Internal Flow

1. Owning component emits an approved domain event.
2. Event Bus validates event ownership, type, metadata, and dependency direction.
3. Event Bus records permitted subscription matching.
4. Event Bus delivers the event to approved downstream subscribers.
5. Subscribers consume the event without changing ownership of the source object.

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

---

## 11. Error Handling

Validation:

- Event type must be approved.
- Event source must own the event.
- Subscriber must be permitted by dependency rules.
- Event metadata must include identity, source, timestamp, and version.

Failure scenarios:

- Unapproved event type.
- Missing metadata.
- Reverse dependency subscription.
- Payload attempts to redefine an approved contract.

Recovery strategy:

- Reject invalid events or subscriptions.
- Preserve rejection reason for auditability.
- Do not infer business behavior in the Event Bus.

---

## 12. Non-Functional Considerations

Performance:

- Event publication should support efficient fan-out to approved subscribers.

Reliability:

- Invalid events and invalid subscriptions must fail closed.

Maintainability:

- Adding event types requires approved ownership and dependency traceability.

Testability:

- Publish, subscribe, rejection, and dependency-direction checks must be measurable.

Security:

- Event payloads must not expose unauthorized source internals.

Auditability:

- Event metadata must support tracing from publisher to subscriber.

---

## 13. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- ADR.
- Foundation owning components.

Downstream consumers:

- Market Intelligence.
- Portfolio Intelligence through Market Intelligence outputs.
- Governance.
- Presentation.

Approved dependency chain:

```text
Foundation
→ Market Intelligence
→ Portfolio Intelligence
→ Governance
→ Presentation
```

---

## 14. Assumptions

- Domain events are approved before publication.
- Event Bus remains a Foundation communication component.
- Consumers do not gain ownership of source data by subscribing.

---

## 15. Constraints

- Event Bus must preserve dependency direction.
- Event Bus must not contain business logic.
- Event Bus must not calculate market intelligence.
- Event Bus must not allow higher layers to introduce dependencies into lower layers.
- Event Bus must not redefine approved contracts.

---

## 16. Out of Scope

This Technical Design does not cover:

- Event transport implementation.
- Queue technology.
- Business rules.
- Market calculations.
- Portfolio calculations.
- UI behavior.
- Storage implementation.

---

## 17. Implementation Notes

Implementation guidance:

- Keep event definitions tied to owning components.
- Keep subscriptions constrained by dependency direction.
- Keep payloads as references to approved contracts or immutable objects where applicable.

Acceptance Criteria:

- Event Bus defines upstream Foundation event ownership.
- Event Bus defines downstream domain consumers.
- Event Bus rejects reverse dependency subscriptions.
- Event Bus publishes only approved domain events.
- Event Bus explicitly excludes business logic and market intelligence calculations.
- All responsibilities trace to approved governance documents.

No source code, implementation algorithm, storage technology, transport technology, or issue-level task breakdown is defined by this Technical Design.

---

## 18. Traceability

| Item | Source |
|------|--------|
| BRD | Foundation Event Bus and dependency constraints. |
| PRD | Foundation outputs before downstream intelligence. |
| Architecture | Event Bus responsibility and approved domain sequence. |
| Product Map | Event Bus as Foundation module and domain dependency rules. |
| ADR | ADR-005, ADR-006, ADR-008. |

---

## 19. References

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- TD-000 Data Provider Framework
- TD-001 MarketData Contract
- TD-002 Health Layer
- TD-003 Snapshot Engine

---

## 20. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial TD-005 Event Bus Technical Design |
