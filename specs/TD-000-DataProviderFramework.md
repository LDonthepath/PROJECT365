# Technical Design

## 1. Document Information

| Field | Value |
|------|------|
| Status | Frozen |
| Version | 1.0 |
| Owner | PROJECT365 Architecture |
| Last Updated | 2026-07-14 |
| Depends On | BRD, PRD, Architecture, Product Map, ADR |
| Referenced By | Data Service, MarketData Contract, Issue Specification, Acceptance Criteria, Implementation Prompt |

---

## 2. Purpose

Define the Technical Design for TD-000 Data Provider Framework.

The Data Provider Framework is an upstream Foundation Technical Design that formalizes the infrastructure boundary between External Data Sources and Data Service. It defines provider abstraction, registration, factory creation, result contracts, error contracts, capability metadata, health metadata, lifecycle rules, validation rules, and operational failure semantics.

This document translates approved product and architecture requirements into an implementation-ready provider abstraction design without redefining business requirements, product behavior, architecture, dependency direction, or provider-specific implementation details.

---

## 3. Scope

This Technical Design covers the Provider Framework as Foundation infrastructure.

Included responsibilities:

- Provider interface definition.
- Provider factory interface definition.
- Provider registry interface definition.
- Provider Result contract.
- Provider Error contract.
- Provider Health contract.
- Provider Capability contract.
- Provider metadata and source attribution.
- Registration and unregistration rules.
- Provider resolution and creation rules.
- Provider validation boundary.
- Provider fetch and normalization boundary.
- Retry boundary.
- Timeout boundary.
- Rate limit boundary.
- Unsupported provider and unsupported capability behavior.
- Lifecycle state transitions.
- Provider-agnostic failure handling.
- Extension strategy.
- Dependency preservation rules.
- Non-goals.

Excluded responsibilities:

- Data Service orchestration logic.
- Provider prioritization for product outcomes.
- MarketData Contract definition.
- MarketData object creation.
- Health Layer validation.
- Snapshot Engine snapshot creation.
- Provider-specific adapter implementation.
- Provider credential storage.
- Network client implementation.
- Cache implementation.
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

The Provider Framework exists so Data Service can interact with external market data sources through consistent infrastructure contracts while preserving provider agnosticism, source attribution, auditability, and clear dependency boundaries.

---

## 5. Requirements Traceability

| Requirement | Source |
|------------|--------|
| BRD | Trusted, explainable, auditable market intelligence requires reliable upstream data handling. |
| PRD | Foundation must provide trusted market data before downstream intelligence is produced. |
| Architecture | Foundation Domain includes Provider Framework, Data Service, MarketData Contract, Health Layer, and Snapshot Engine. |
| Product Map | Provider Framework is a Foundation module that supports ingestion of global market data. |
| ADR | Approved modular architecture, separation of concerns, dependency direction, Single Source of Truth, explainability, and auditability. |

Every technical decision in this document is traceable to the Foundation Domain dependency sequence and separation-of-concerns rules.

---

## 6. Design Overview

The Provider Framework is a provider-agnostic infrastructure boundary. It represents external data sources as registered providers, creates provider instances through factories, exposes a uniform `BaseProvider` contract to Data Service, and returns either deterministic `ProviderResult` objects or deterministic `ProviderError` objects.

The framework contains no product intelligence. It does not choose which provider is best for a product outcome, does not build MarketData, does not validate Health Status, and does not create snapshots. Data Service remains the only approved runtime consumer that orchestrates provider calls and maps acceptable Provider Results into MarketData.

Design principles:

- Preserve Single Source of Truth by keeping MarketData ownership outside the Provider Framework.
- Preserve Separation of Concerns by restricting the framework to infrastructure contracts and provider boundary behavior.
- Preserve approved dependency direction from External Data Sources to Provider Framework to Data Service.
- Preserve auditability by carrying deterministic source attribution, timestamps, contract versions, and failure categories.
- Preserve explainability by exposing standardized provider metadata, capabilities, health, and errors.
- Keep provider-specific behavior outside the generic framework contract.
- Remain framework-independent and CommonJS compatible.

The Provider Framework is composed of three runtime-facing abstractions:

1. `ProviderRegistry` stores approved provider registrations and resolves provider factories by provider identifier.
2. `ProviderFactory` validates construction input and creates provider instances that implement `BaseProvider`.
3. `BaseProvider` exposes fetch, normalize, validate, health, capabilities, supports, and dispose methods.

The framework standardizes four transport-neutral data contracts:

1. `ProviderResult` for successful provider interactions.
2. `ProviderError` for failed provider interactions.
3. `ProviderHealth` for provider-operational health reporting.
4. `ProviderCapability` for provider-supported data capability reporting.

Boundaries:

- Provider Framework may validate provider registration metadata and provider contract shape.
- Provider Framework may normalize raw provider payloads only to the provider-agnostic Provider Result boundary.
- Provider Framework may expose retry eligibility, timeout status, and rate-limit metadata.
- Provider Framework must not execute Data Service provider selection or fallback policy.
- Provider Framework must not create MarketData.
- Provider Framework must not validate Health Status.
- Provider Framework must not create snapshots.
- Provider Framework must not contain business logic, market intelligence, portfolio logic, recommendations, presentation state, or provider-specific rules.

---

## 7. Responsibilities

| Component | Responsibility | Inputs | Outputs | Owner |
|-----------|----------------|--------|---------|-------|
| `BaseProvider` | Define the provider instance boundary callable by Data Service. | Provider request and provider configuration context. | `ProviderResult`, `ProviderError`, `ProviderHealth`, or `ProviderCapability` list. | Provider Framework |
| `ProviderFactory` | Validate provider construction input and create provider instances. | Provider registration metadata and optional provider configuration. | `BaseProvider` instance or `ProviderError`. | Provider Framework |
| `ProviderRegistry` | Register, unregister, resolve, and list approved provider factories. | Provider identifier, factory, metadata, and registry operation context. | Registry entry, factory reference, provider instance, or `ProviderError`. | Provider Framework |
| `ProviderResult` Contract | Represent successful provider responses before MarketData creation. | Provider response payload, normalized boundary payload, and attribution. | Deterministic success object. | Provider Framework |
| `ProviderError` Contract | Represent provider failures in a provider-agnostic form. | Failure category, code, retry eligibility, attribution, and diagnostics. | Deterministic error object. | Provider Framework |
| `ProviderHealth` Contract | Represent provider operational availability metadata. | Provider self-check outcome and operational context. | Deterministic health object. | Provider Framework |
| `ProviderCapability` Contract | Represent supported provider data capabilities. | Provider metadata and capability declarations. | Deterministic capability objects. | Provider Framework |
| Source Attribution | Preserve source identity and fetch context for downstream traceability. | External source identity, provider identity, request identity, and timestamps. | Attribution embedded in `ProviderResult` or `ProviderError`. | Provider Framework |
| Operational Boundary | Standardize timeout, retry, rate-limit, unsupported-provider, and malformed-response behavior. | Provider interaction outcome. | Standardized result, error, or metadata. | Provider Framework |
| Data Service Boundary | Own provider orchestration and MarketData production. | Registered providers, Provider Results, Provider Errors. | MarketData Contract or orchestration failure. | Data Service |

---

## 8. Non Responsibilities

The Provider Framework must not own or implement:

- Data Service orchestration decisions.
- Provider ranking, provider fallback selection, or product-level source preference.
- MarketData Contract fields or MarketData creation.
- Health Status validation or health gating.
- Snapshot creation, snapshot persistence, or historical replay.
- Market intelligence calculations, regimes, deltas, confidence, exposure, risk, OMS, or recommendations.
- Dashboard, inspector, settings, or presentation behavior.
- Provider-specific request construction, provider-specific authentication flows, provider-specific parsing rules, or source-specific endpoint logic.
- Credential storage, secret rotation, or secret distribution.
- Network client implementation, HTTP library selection, or transport framework selection.
- Persistent cache implementation or storage implementation.
- Event Bus implementation.
- Dependency inversion that allows Health Layer, Snapshot Engine, or downstream domains to access providers directly.

---

## 9. Dependencies

Upstream dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- ADR.
- External Data Sources.

Runtime dependency direction:

```text
External Sources
→ Provider Framework
→ Data Service
→ MarketData Contract
→ Health Layer
→ Snapshot Engine
```

Allowed Provider Framework dependencies:

- Approved configuration supplied to provider factories.
- Provider implementations supplied through registration.
- Native language/runtime primitives available in the existing runtime.
- Existing project conventions that preserve CommonJS compatibility.

Disallowed Provider Framework dependencies:

- Data Service internals.
- Health Layer internals.
- Snapshot Engine internals.
- Market intelligence domains.
- Portfolio domains.
- Governance domains.
- Presentation domains.
- Provider-specific libraries in generic framework contracts.
- Runtime dependencies that force a web framework, dependency injection framework, HTTP client, queue system, storage engine, or module format change.

Downstream consumers governed by this design:

- Data Service only may orchestrate provider calls through the Provider Framework.
- MarketData Contract receives provider-derived values only through Data Service.
- Health Layer and Snapshot Engine must not access providers or the Provider Registry directly.

---

## 10. Public Interfaces

The Provider Framework exposes infrastructure interfaces to Data Service only. Interface names are normative. Concrete implementation may use CommonJS exports, but must preserve the contracts below.

### 10.1 `BaseProvider`

`BaseProvider` is the required instance contract for every registered provider.

Required properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Stable provider identifier matching registry metadata. |
| `name` | string | Yes | Human-readable provider name. |
| `version` | string | Yes | Provider implementation contract version. |
| `state` | string | Yes | Current provider lifecycle state. |

Required methods:

| Method | Input | Output | Description |
|--------|-------|--------|-------------|
| `validate(context)` | Provider validation context. | Validation success object or `ProviderError`. | Confirms provider configuration and contract readiness. |
| `fetch(request, context)` | Provider request and fetch context. | `ProviderResult` or `ProviderError`. | Performs provider-boundary fetch. |
| `normalize(rawPayload, context)` | Raw provider payload and normalization context. | Normalized provider-boundary payload or `ProviderError`. | Converts raw payload only to provider-agnostic Provider Result payload shape. |
| `health(context)` | Health check context. | `ProviderHealth` or `ProviderError`. | Reports provider operational health metadata. |
| `capabilities(context)` | Capability query context. | `ProviderCapability[]` or `ProviderError`. | Reports provider-supported capabilities. |
| `supports(capability, context)` | Capability query and context. | Boolean support result or `ProviderError`. | Indicates whether provider supports a capability. |
| `dispose(context)` | Disposal context. | Disposal success object or `ProviderError`. | Releases provider-owned runtime resources. |

### 10.2 `ProviderFactory`

`ProviderFactory` creates provider instances without embedding Data Service orchestration rules.

Required properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `providerId` | string | Yes | Provider identifier created by the factory. |
| `version` | string | Yes | Factory contract version. |

Required methods:

| Method | Input | Output | Description |
|--------|-------|--------|-------------|
| `validate(definition, context)` | Provider definition and validation context. | Validation success object or `ProviderError`. | Validates provider metadata and factory readiness. |
| `create(definition, context)` | Provider definition and creation context. | `BaseProvider` or `ProviderError`. | Creates a provider instance implementing `BaseProvider`. |
| `capabilities(context)` | Capability query context. | `ProviderCapability[]` or `ProviderError`. | Returns factory-declared provider capabilities without requiring a fetch. |
| `dispose(context)` | Disposal context. | Disposal success object or `ProviderError`. | Releases factory-owned runtime resources. |

### 10.3 `ProviderRegistry`

`ProviderRegistry` is the catalog for approved provider factories.

Required methods:

| Method | Input | Output | Description |
|--------|-------|--------|-------------|
| `register(definition, factory, context)` | Provider definition, factory, registry context. | Registry entry or `ProviderError`. | Adds an approved provider factory. |
| `unregister(providerId, context)` | Provider identifier and registry context. | Unregistration success object or `ProviderError`. | Removes a registered provider factory when lifecycle rules permit. |
| `resolve(providerId, context)` | Provider identifier and resolution context. | Registry entry or `ProviderError`. | Returns metadata and factory for a registered provider. |
| `create(providerId, options, context)` | Provider identifier, creation options, context. | `BaseProvider` or `ProviderError`. | Resolves the factory and creates a provider instance. |
| `validate(providerId, context)` | Provider identifier and validation context. | Validation success object or `ProviderError`. | Validates registration and factory contract shape. |
| `capabilities(providerId, context)` | Provider identifier and capability context. | `ProviderCapability[]` or `ProviderError`. | Returns registered provider capabilities. |
| `health(providerId, context)` | Provider identifier and health context. | `ProviderHealth` or `ProviderError`. | Creates or uses a provider instance only as permitted by implementation to query provider health. |
| `supports(providerId, capability, context)` | Provider identifier, capability query, context. | Boolean support result or `ProviderError`. | Indicates registered provider support for a capability. |
| `dispose(context)` | Disposal context. | Disposal success object or `ProviderError`. | Disposes registry-managed factories and provider instances. |

### 10.4 `ProviderResult`

`ProviderResult` is the deterministic success contract returned by `fetch()`.

### 10.5 `ProviderError`

`ProviderError` is the deterministic failure contract returned by any public method when a provider-framework failure occurs.

### 10.6 `ProviderHealth`

`ProviderHealth` is the deterministic operational health contract returned by `health()`.

### 10.7 `ProviderCapability`

`ProviderCapability` is the deterministic capability contract returned by `capabilities()` and consumed by `supports()`.

---

## 11. Public Methods

All public methods must be deterministic for equivalent inputs and observable provider outcomes. Methods must return explicit success objects or `ProviderError`; they must not expose provider-specific exception shapes to Data Service.

### 11.1 `register(definition, factory, context)`

Owner: `ProviderRegistry`.

Input contract:

- `definition.providerId`: required stable string.
- `definition.name`: required human-readable string.
- `definition.version`: required provider definition version.
- `definition.capabilities`: required array of `ProviderCapability` objects.
- `definition.retryPolicy`: optional provider-agnostic retry metadata.
- `definition.timeoutPolicy`: optional provider-agnostic timeout metadata.
- `definition.rateLimitPolicy`: optional provider-agnostic rate-limit metadata.
- `factory`: required `ProviderFactory` object.
- `context.requestId`: optional correlation identifier.
- `context.registeredBy`: optional actor or subsystem label.

Output contract on success:

- `status`: `registered`.
- `providerId`.
- `registeredAt` timestamp.
- `definitionVersion`.
- `capabilityCount`.

Failure behavior:

- Missing required fields returns `PROVIDER_VALIDATION_FAILED`.
- Duplicate active provider identifier returns `PROVIDER_ALREADY_REGISTERED`.
- Factory missing required methods returns `PROVIDER_FACTORY_INVALID`.
- Unsupported capability declaration returns `PROVIDER_CAPABILITY_INVALID`.

### 11.2 `unregister(providerId, context)`

Owner: `ProviderRegistry`.

Input contract:

- `providerId`: required stable string.
- `context.reason`: optional human-readable reason.
- `context.force`: optional boolean. Force may only bypass idle-state checks when no active provider calls are owned by the registry.

Output contract on success:

- `status`: `unregistered`.
- `providerId`.
- `unregisteredAt` timestamp.

Failure behavior:

- Unknown provider returns `PROVIDER_NOT_REGISTERED`.
- Active provider lifecycle conflict returns `PROVIDER_STATE_INVALID`.
- Disposal failure returns `PROVIDER_DISPOSE_FAILED`.

### 11.3 `resolve(providerId, context)`

Owner: `ProviderRegistry`.

Input contract:

- `providerId`: required stable string.
- `context.requestId`: optional correlation identifier.

Output contract on success:

- `status`: `resolved`.
- `providerId`.
- `definition`.
- `factory` reference.
- `resolvedAt` timestamp.

Failure behavior:

- Missing provider identifier returns `PROVIDER_VALIDATION_FAILED`.
- Unknown provider returns `PROVIDER_NOT_REGISTERED`.

### 11.4 `create(providerId, options, context)`

Owner: `ProviderRegistry` and `ProviderFactory`.

Input contract:

- `providerId`: required stable string.
- `options`: optional provider construction options.
- `context.requestId`: optional correlation identifier.

Output contract on success:

- Object implementing `BaseProvider`.
- Provider `state` must be `created` or `ready` after successful factory validation.

Failure behavior:

- Unknown provider returns `PROVIDER_NOT_REGISTERED`.
- Factory validation failure returns `PROVIDER_FACTORY_INVALID`.
- Provider instance missing required `BaseProvider` shape returns `PROVIDER_CONTRACT_INVALID`.
- Construction failure returns `PROVIDER_CREATE_FAILED`.

### 11.5 `validate(context)`

Owner: `BaseProvider`, `ProviderFactory`, and `ProviderRegistry`.

Input contract:

- `context.requestId`: optional correlation identifier.
- `context.scope`: optional validation scope. Allowed provider-agnostic values are `registration`, `creation`, `runtime`, and `contract`.

Output contract on success:

- `status`: `valid`.
- `providerId` when applicable.
- `validatedAt` timestamp.
- `scope`.
- `contractVersion`.

Failure behavior:

- Missing required metadata returns `PROVIDER_VALIDATION_FAILED`.
- Invalid interface shape returns `PROVIDER_CONTRACT_INVALID`.
- Unsupported lifecycle state returns `PROVIDER_STATE_INVALID`.

### 11.6 `fetch(request, context)`

Owner: `BaseProvider`.

Input contract:

- `request.capability`: required provider capability query.
- `request.params`: optional provider-agnostic request parameters supplied by Data Service.
- `request.requestId`: optional correlation identifier.
- `context.timeoutMs`: optional timeout boundary.
- `context.retryPolicy`: optional retry boundary supplied by Data Service or provider metadata.
- `context.attribution`: optional attribution seed supplied by Data Service.

Output contract on success:

- `ProviderResult`.

Failure behavior:

- Unsupported capability returns `PROVIDER_UNSUPPORTED_CAPABILITY`.
- Timeout returns `PROVIDER_TIMEOUT`.
- Rate limit returns `PROVIDER_RATE_LIMITED`.
- Malformed response returns `PROVIDER_MALFORMED_RESPONSE`.
- External source failure returns `PROVIDER_SOURCE_UNAVAILABLE` or more specific provider-agnostic code.

### 11.7 `normalize(rawPayload, context)`

Owner: `BaseProvider`.

Input contract:

- `rawPayload`: required provider response payload.
- `context.providerId`: required provider identifier.
- `context.capability`: required capability associated with the payload.
- `context.fetchedAt`: optional fetch timestamp.

Output contract on success:

- Provider-agnostic normalized payload suitable for inclusion in `ProviderResult.payload.normalized`.
- Output must not be MarketData.

Failure behavior:

- Missing raw payload returns `PROVIDER_MALFORMED_RESPONSE`.
- Payload incompatible with declared capability returns `PROVIDER_NORMALIZATION_FAILED`.
- Provider-specific parsing errors must be converted to `ProviderError`.

### 11.8 `health(context)`

Owner: `BaseProvider` and optionally `ProviderRegistry`.

Input contract:

- `context.requestId`: optional correlation identifier.
- `context.checkType`: optional provider-agnostic value: `metadata`, `connectivity`, or `runtime`.

Output contract on success:

- `ProviderHealth`.

Failure behavior:

- Health check timeout returns `PROVIDER_TIMEOUT`.
- Unknown provider through registry returns `PROVIDER_NOT_REGISTERED`.
- Health check execution failure returns `PROVIDER_HEALTH_CHECK_FAILED`.

### 11.9 `capabilities(context)`

Owner: `BaseProvider`, `ProviderFactory`, and `ProviderRegistry`.

Input contract:

- `context.requestId`: optional correlation identifier.
- `context.includeInactive`: optional boolean for registry metadata only.

Output contract on success:

- Array of `ProviderCapability` objects.

Failure behavior:

- Invalid capability metadata returns `PROVIDER_CAPABILITY_INVALID`.
- Unknown provider through registry returns `PROVIDER_NOT_REGISTERED`.

### 11.10 `supports(capability, context)`

Owner: `BaseProvider` and `ProviderRegistry`.

Input contract:

- `capability.name`: required stable capability name.
- `capability.version`: optional capability version.
- `context.requestId`: optional correlation identifier.

Output contract on success:

- `true` when the provider supports the capability.
- `false` when the provider is known but does not support the capability.

Failure behavior:

- Malformed capability query returns `PROVIDER_CAPABILITY_INVALID`.
- Unknown provider through registry returns `PROVIDER_NOT_REGISTERED`.

### 11.11 `dispose(context)`

Owner: `BaseProvider`, `ProviderFactory`, and `ProviderRegistry`.

Input contract:

- `context.requestId`: optional correlation identifier.
- `context.reason`: optional human-readable disposal reason.

Output contract on success:

- `status`: `disposed`.
- `providerId` when applicable.
- `disposedAt` timestamp.

Failure behavior:

- Disposal from invalid state returns `PROVIDER_STATE_INVALID`.
- Resource cleanup failure returns `PROVIDER_DISPOSE_FAILED`.
- Repeated disposal must be idempotent and return success with `status: disposed` when no active resource remains.

---

## 12. ProviderResult Schema

`ProviderResult` is not MarketData. It is a provider-boundary success envelope consumed by Data Service.

Required schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | Must be `success`. |
| `providerId` | string | Yes | Stable provider identifier. |
| `providerName` | string | Yes | Human-readable provider name. |
| `providerVersion` | string | Yes | Provider implementation contract version. |
| `capability` | `ProviderCapability` summary | Yes | Capability satisfied by this result. |
| `requestId` | string | Yes | Correlation identifier supplied or generated at provider boundary. |
| `fetchedAt` | ISO-8601 string | Yes | Timestamp when provider fetch completed. |
| `receivedAt` | ISO-8601 string | Yes | Timestamp when framework received provider response. |
| `normalizedAt` | ISO-8601 string or null | Yes | Timestamp when normalization completed, or null if no normalization was performed. |
| `payload` | object | Yes | Provider-boundary payload object. |
| `payload.raw` | any | Optional | Raw provider payload when retention is permitted by caller and security rules. |
| `payload.normalized` | object or array or null | Yes | Provider-agnostic normalized payload, not MarketData. |
| `payload.format` | string | Yes | `raw`, `normalized`, or `raw-and-normalized`. |
| `attribution` | object | Yes | Source attribution metadata. |
| `attribution.providerId` | string | Yes | Provider identifier. |
| `attribution.externalSource` | string | Yes | Provider-agnostic external source label. |
| `attribution.fetchSource` | string | Yes | Value intended for downstream Data Service source mapping. |
| `attribution.sourceReference` | string or null | Yes | Provider response reference, URL label, endpoint label, or null when unavailable. |
| `attribution.requestId` | string | Yes | Correlation identifier. |
| `metadata` | object | Yes | Provider metadata copied or referenced from registration. |
| `metadata.contractVersion` | string | Yes | Provider Result contract version. |
| `metadata.retryCount` | number | Yes | Number of retry attempts performed at provider boundary. |
| `metadata.durationMs` | number | Yes | Provider interaction duration in milliseconds. |
| `metadata.rateLimit` | object or null | Yes | Rate-limit metadata when available. |
| `metadata.warnings` | string[] | Yes | Provider-agnostic warning codes or messages. |

Validation rules:

- `status` must equal `success`.
- `providerId`, `requestId`, `fetchedAt`, `receivedAt`, `payload`, `attribution`, and `metadata.contractVersion` are mandatory.
- `payload.normalized` may be null only when `payload.format` is `raw`.
- `payload.raw` must not include credentials or secrets.
- `ProviderResult` must not contain MarketData field ownership semantics.
- `ProviderResult` must not be returned to Health Layer or Snapshot Engine directly.

---

## 13. ProviderError Schema

`ProviderError` is the deterministic failure envelope for registry, factory, and provider operations.

Required schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | Must be `error`. |
| `code` | string | Yes | Deterministic provider-framework error code. |
| `category` | string | Yes | Provider-agnostic category. |
| `message` | string | Yes | Human-readable diagnostic summary without secrets. |
| `providerId` | string or null | Yes | Provider identifier when known. |
| `requestId` | string or null | Yes | Correlation identifier when available. |
| `occurredAt` | ISO-8601 string | Yes | Failure timestamp. |
| `retryable` | boolean | Yes | Whether the same operation may be retried by the caller. |
| `retryAfterMs` | number or null | Yes | Delay hint when available. |
| `attempt` | number | Yes | Current attempt number. |
| `maxAttempts` | number | Yes | Maximum attempts allowed by the applied retry boundary. |
| `rateLimited` | boolean | Yes | Whether failure was caused by a rate-limit condition. |
| `timeout` | boolean | Yes | Whether failure was caused by a timeout boundary. |
| `capability` | object or null | Yes | Capability associated with the failure when applicable. |
| `attribution` | object or null | Yes | Source attribution available at failure time. |
| `details` | object | Yes | Provider-agnostic diagnostic details. |
| `details.validationErrors` | string[] | Optional | Validation failure details. |
| `details.upstreamStatus` | string or number or null | Optional | Provider-agnostic upstream status when safe to expose. |
| `details.causeCode` | string or null | Optional | Sanitized internal cause code. |
| `contractVersion` | string | Yes | Provider Error contract version. |

Validation rules:

- `status` must equal `error`.
- `code`, `category`, `message`, `occurredAt`, `retryable`, `rateLimited`, `timeout`, and `contractVersion` are mandatory.
- `message` and `details` must not expose credentials, secrets, tokens, or provider-specific sensitive internals.
- Provider-specific exceptions must be converted to `ProviderError` before crossing the framework boundary.
- `retryAfterMs` must be non-null when `rateLimited` is true and the provider exposes a deterministic retry delay.

---

## 14. ProviderHealth Schema

`ProviderHealth` reports provider operational status. It is not Health Layer Health Status and must not be used as a substitute for TD-002 validation.

Required schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | One of `healthy`, `degraded`, `unhealthy`, or `unknown`. |
| `providerId` | string | Yes | Stable provider identifier. |
| `checkedAt` | ISO-8601 string | Yes | Timestamp of the health check. |
| `checkType` | string | Yes | `metadata`, `connectivity`, or `runtime`. |
| `latencyMs` | number or null | Yes | Health check duration when measured. |
| `available` | boolean | Yes | Whether provider appears available for calls. |
| `rateLimited` | boolean | Yes | Whether provider is currently rate limited. |
| `retryAfterMs` | number or null | Yes | Retry delay hint when rate limited or degraded. |
| `message` | string | Yes | Provider-agnostic diagnostic summary. |
| `details` | object | Yes | Provider-agnostic health details. |
| `contractVersion` | string | Yes | Provider Health contract version. |

Validation rules:

- Health status values are operational and provider-boundary only.
- `available` false must map to `degraded`, `unhealthy`, or `unknown`.
- Provider health must not validate MarketData completeness or correctness.
- Health Layer must not consume providers directly to obtain `ProviderHealth`.

---

## 15. ProviderCapability Schema

`ProviderCapability` declares provider-supported data capabilities without embedding provider-specific endpoint logic.

Required schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Stable provider-agnostic capability name. |
| `version` | string | Yes | Capability contract version. |
| `description` | string | Yes | Human-readable description. |
| `inputSchema` | object or null | Yes | Provider-agnostic input requirements, or null when none. |
| `outputSchema` | object or null | Yes | Provider-agnostic output boundary description, not MarketData. |
| `supportsNormalization` | boolean | Yes | Whether provider supports normalization for this capability. |
| `supportsHealthCheck` | boolean | Yes | Whether provider supports health checks for this capability. |
| `rateLimitPolicy` | object or null | Yes | Provider-agnostic rate-limit policy metadata when known. |
| `timeoutPolicy` | object or null | Yes | Provider-agnostic timeout policy metadata when known. |
| `retryPolicy` | object or null | Yes | Provider-agnostic retry policy metadata when known. |
| `deprecated` | boolean | Yes | Whether the capability is deprecated for new calls. |
| `contractVersion` | string | Yes | Provider Capability contract version. |

Validation rules:

- `name` and `version` must be stable strings.
- Capability names must describe data boundary capabilities, not provider names.
- Capability metadata must not define MarketData fields.
- Capability metadata must not introduce product domains or downstream business rules.

---

## 16. Registry Lifecycle

Registry states:

```text
empty
↓
ready
↓
active
↓
disposing
↓
disposed
```

Lifecycle rules:

1. A new registry starts in `empty` state.
2. First successful `register()` transitions the registry to `ready`.
3. Any active `create()`, `resolve()`, `health()`, `capabilities()`, or `supports()` operation may place the registry in `active` for the duration of the operation.
4. `unregister()` is allowed only for registered providers and must not orphan active provider instances managed by the registry.
5. `dispose()` transitions the registry to `disposing`, calls factory/provider disposal for registry-managed resources, and then transitions to `disposed`.
6. After `disposed`, `register()`, `resolve()`, and `create()` must return `PROVIDER_REGISTRY_DISPOSED`.
7. Repeated `dispose()` calls are idempotent.

---

## 17. Provider Lifecycle

Provider states:

```text
created
↓
validating
↓
ready
↓
fetching
↓
normalizing
↓
ready
↓
disposing
↓
disposed
```

Failure states:

```text
created|validating|ready|fetching|normalizing
↓
failed
↓
ready or disposing
```

Lifecycle rules:

1. `create()` returns a provider in `created` or `ready` state.
2. `validate()` transitions `created` to `validating`, then to `ready` on success.
3. `fetch()` requires `ready`; it transitions to `fetching` for the call.
4. If raw payload normalization is required, `fetch()` transitions through `normalizing` before returning `ProviderResult`.
5. Recoverable failures return `ProviderError` and may transition back to `ready` after cleanup.
6. Non-recoverable provider failures may transition to `failed` until `dispose()` or successful revalidation.
7. `dispose()` may be called from `created`, `ready`, or `failed` and must transition to `disposed` after cleanup.
8. Calls after `disposed` must return `PROVIDER_DISPOSED`.

---

## 18. Factory Lifecycle

Factory states:

```text
registered
↓
validated
↓
creating
↓
validated
↓
disposing
↓
disposed
```

Lifecycle rules:

1. A factory becomes `registered` only through `ProviderRegistry.register()`.
2. `validate()` confirms the factory can create `BaseProvider` instances for its definition.
3. `create()` may be called only after registration validation succeeds.
4. Factory-created providers must implement the complete `BaseProvider` method set.
5. `dispose()` releases factory-owned resources and must not dispose provider instances that are not factory-managed.
6. Calls after factory disposal return `PROVIDER_FACTORY_DISPOSED`.

---

## 19. Validation Sequence

Registry registration validation sequence:

1. Confirm registry is not disposed.
2. Confirm `definition.providerId`, `definition.name`, and `definition.version` are present.
3. Confirm provider identifier is stable and not already registered as active.
4. Confirm capability declarations exist and conform to `ProviderCapability` schema.
5. Confirm retry, timeout, and rate-limit metadata are provider-agnostic when present.
6. Confirm factory exposes required `ProviderFactory` properties and methods.
7. Call factory `validate(definition, context)`.
8. Store registry entry only after validation succeeds.

Provider creation validation sequence:

1. Resolve provider identifier through registry.
2. Confirm factory is not disposed.
3. Call factory `validate(definition, context)` when required by implementation.
4. Call factory `create(definition, context)`.
5. Confirm returned instance implements `BaseProvider` properties and methods.
6. Confirm provider `id` matches registry provider identifier.
7. Call provider `validate(context)` when required by implementation.
8. Return provider instance only after contract validation succeeds.

Fetch validation sequence:

1. Confirm provider is not disposed.
2. Confirm provider is in `ready` state.
3. Confirm request includes a valid capability query.
4. Confirm provider `supports(capability, context)` returns true.
5. Confirm timeout, retry, and rate-limit metadata are valid when supplied.
6. Execute provider-boundary fetch.
7. Confirm the provider response can be represented as `ProviderResult` or `ProviderError`.
8. Confirm source attribution is present when a result is successful.
9. Return deterministic result or error.

---

## 20. Retry Behavior

Retry behavior is a boundary contract, not Data Service orchestration policy.

Rules:

- Retry policy metadata may be declared by provider registration or supplied by Data Service call context.
- The framework may execute provider-boundary retries only for the same provider and same request.
- The framework must not switch providers as part of retry behavior.
- The framework must not decide product-level fallback.
- Retry attempts must be counted in `ProviderResult.metadata.retryCount` or `ProviderError.attempt`.
- Retryable failures must set `ProviderError.retryable` to true.
- Non-retryable failures must set `ProviderError.retryable` to false.
- Rate-limit retry hints must use `retryAfterMs` when available.
- Retry exhaustion must return `PROVIDER_RETRY_EXHAUSTED` with the final underlying provider-agnostic cause in `details.causeCode` when safe.

Default deterministic retry categories:

| Failure code | Retryable |
|--------------|-----------|
| `PROVIDER_TIMEOUT` | true |
| `PROVIDER_SOURCE_UNAVAILABLE` | true |
| `PROVIDER_RATE_LIMITED` | true only when retry delay is available and attempts remain |
| `PROVIDER_AUTH_FAILED` | false |
| `PROVIDER_UNSUPPORTED_CAPABILITY` | false |
| `PROVIDER_MALFORMED_RESPONSE` | false |
| `PROVIDER_CONTRACT_INVALID` | false |

---

## 21. Timeout Behavior

Timeout behavior is provider-boundary metadata and failure standardization.

Rules:

- Timeout duration may be declared in provider metadata or supplied by Data Service context.
- The framework must apply a deterministic timeout boundary when `timeoutMs` is present.
- Timeout expiration must return `ProviderError` with `code: PROVIDER_TIMEOUT`, `timeout: true`, and `retryable` according to retry policy.
- Timeout failure must include elapsed duration in `details.durationMs` when available.
- Timeout handling must not create partial `ProviderResult` objects.
- Timeout handling must not trigger provider switching.

---

## 22. Rate Limit Behavior

Rate-limit behavior is provider-boundary metadata and failure standardization.

Rules:

- Provider rate-limit metadata may be declared in registration, capability metadata, or returned in result/error metadata.
- Rate-limit failures must return `ProviderError` with `code: PROVIDER_RATE_LIMITED`, `rateLimited: true`, and `retryAfterMs` when deterministically available.
- Successful calls may include current rate-limit metadata in `ProviderResult.metadata.rateLimit`.
- Rate-limit handling must not bypass provider contracts or call downstream components.
- Rate-limit handling must not create Data Service fallback policy.

Provider-agnostic rate-limit metadata fields when available:

- `limit`.
- `remaining`.
- `resetAt`.
- `retryAfterMs`.
- `windowMs`.

---

## 23. Unsupported Provider Behavior

Unsupported provider means a requested provider identifier is not registered, has been unregistered, is disposed, or cannot satisfy the required contract.

Rules:

- `resolve()` for an unknown provider returns `PROVIDER_NOT_REGISTERED`.
- `create()` for an unknown provider returns `PROVIDER_NOT_REGISTERED`.
- Calls to disposed providers return `PROVIDER_DISPOSED`.
- Calls to disposed registry return `PROVIDER_REGISTRY_DISPOSED`.
- Unsupported provider behavior must be deterministic and must not attempt external source access.
- Unsupported provider behavior must not fallback to another provider.

Unsupported capability means the provider is registered but does not support the requested capability.

Rules:

- `supports()` returns `false` for known unsupported capabilities.
- `fetch()` for unsupported capability returns `PROVIDER_UNSUPPORTED_CAPABILITY`.
- Unsupported capability behavior must not perform provider fetch.

---

## 24. Failure Handling

The Provider Framework standardizes provider failures without deciding downstream product behavior.

Validation failures:

- Return `ProviderError` with validation code and non-retryable status.
- Include sanitized validation details.
- Do not register, create, fetch, or normalize after validation failure.

External source failures:

- Convert source-specific failure into provider-agnostic `ProviderError`.
- Preserve source attribution when available.
- Preserve retry eligibility and rate-limit indicators.
- Do not leak secrets or provider-specific exception structures.

Malformed response failures:

- Return `PROVIDER_MALFORMED_RESPONSE` when a provider response cannot be represented safely.
- Return `PROVIDER_NORMALIZATION_FAILED` when raw payload exists but provider-boundary normalization fails.
- Do not create partial success results.

Disposal failures:

- Return `PROVIDER_DISPOSE_FAILED`.
- Include sanitized diagnostic details.
- Leave lifecycle state deterministic: `failed` if cleanup failed with active resources, otherwise `disposed`.

Recovery strategy:

- Data Service decides orchestration behavior after failures.
- Health Layer and Snapshot Engine do not recover provider failures directly because they must not access providers.
- Provider Framework may revalidate a provider only within its provider lifecycle and only when called through approved methods.

---

## 25. State Transitions

Provider state transition table:

| Current State | Method | Success State | Failure State |
|---------------|--------|---------------|---------------|
| `created` | `validate()` | `ready` | `failed` |
| `created` | `dispose()` | `disposed` | `failed` |
| `ready` | `fetch()` | `ready` | `ready` or `failed` |
| `ready` | `health()` | `ready` | `ready` or `failed` |
| `ready` | `capabilities()` | `ready` | `ready` |
| `ready` | `dispose()` | `disposed` | `failed` |
| `fetching` | fetch completes | `normalizing` or `ready` | `ready` or `failed` |
| `normalizing` | normalize completes | `ready` | `ready` or `failed` |
| `failed` | `validate()` | `ready` | `failed` |
| `failed` | `dispose()` | `disposed` | `failed` |
| `disposed` | any public method except `dispose()` | `disposed` | `disposed` with `PROVIDER_DISPOSED` |

Registry state transition table:

| Current State | Method | Success State | Failure State |
|---------------|--------|---------------|---------------|
| `empty` | `register()` | `ready` | `empty` |
| `ready` | `register()` | `ready` | `ready` |
| `ready` | `resolve()` | `ready` | `ready` |
| `ready` | `create()` | `ready` | `ready` |
| `ready` | `unregister()` last provider | `empty` | `ready` |
| `ready` | `dispose()` | `disposed` | `ready` or `disposed` |
| `active` | active operation completes | `ready` | `ready` |
| `disposed` | any public method except `dispose()` | `disposed` | `disposed` with `PROVIDER_REGISTRY_DISPOSED` |

---

## 26. Error Codes

| Code | Category | Retryable Default | Meaning |
|------|----------|-------------------|---------|
| `PROVIDER_VALIDATION_FAILED` | validation | false | Required input, metadata, or context failed validation. |
| `PROVIDER_CONTRACT_INVALID` | validation | false | Provider instance does not implement required contract. |
| `PROVIDER_FACTORY_INVALID` | validation | false | Factory does not implement required contract or failed validation. |
| `PROVIDER_CAPABILITY_INVALID` | validation | false | Capability declaration or query is malformed. |
| `PROVIDER_ALREADY_REGISTERED` | registry | false | Provider identifier is already actively registered. |
| `PROVIDER_NOT_REGISTERED` | registry | false | Provider identifier is unknown to registry. |
| `PROVIDER_REGISTRY_DISPOSED` | registry | false | Registry operation attempted after disposal. |
| `PROVIDER_CREATE_FAILED` | factory | false | Factory failed to create provider instance. |
| `PROVIDER_FACTORY_DISPOSED` | factory | false | Factory operation attempted after disposal. |
| `PROVIDER_DISPOSE_FAILED` | lifecycle | false | Disposal did not complete successfully. |
| `PROVIDER_DISPOSED` | lifecycle | false | Provider operation attempted after disposal. |
| `PROVIDER_STATE_INVALID` | lifecycle | false | Method called in unsupported lifecycle state. |
| `PROVIDER_UNSUPPORTED_CAPABILITY` | capability | false | Provider does not support requested capability. |
| `PROVIDER_SOURCE_UNAVAILABLE` | external_source | true | External source was unavailable or unreachable. |
| `PROVIDER_TIMEOUT` | external_source | true | Provider operation exceeded timeout boundary. |
| `PROVIDER_RATE_LIMITED` | external_source | conditional | Provider or source rate limit prevented operation. |
| `PROVIDER_AUTH_FAILED` | external_source | false | Provider authentication or authorization failed. |
| `PROVIDER_MALFORMED_RESPONSE` | response | false | Provider response could not be safely represented. |
| `PROVIDER_NORMALIZATION_FAILED` | response | false | Provider-boundary normalization failed. |
| `PROVIDER_RETRY_EXHAUSTED` | retry | false | Retry policy attempts were exhausted. |
| `PROVIDER_HEALTH_CHECK_FAILED` | health | true | Provider health check failed without a more specific code. |
| `PROVIDER_UNKNOWN_ERROR` | unknown | false | Sanitized fallback for unexpected provider-framework failure. |

---

## 27. Edge Cases

| Edge Case | Required Behavior |
|-----------|-------------------|
| Register same provider twice | Reject second active registration with `PROVIDER_ALREADY_REGISTERED`. |
| Register provider without capabilities | Reject with `PROVIDER_CAPABILITY_INVALID`. |
| Factory creates object missing `fetch()` | Reject with `PROVIDER_CONTRACT_INVALID`. |
| Provider `id` differs from registry identifier | Reject creation with `PROVIDER_CONTRACT_INVALID`. |
| Resolve unknown provider | Return `PROVIDER_NOT_REGISTERED`. |
| Fetch before provider validation | Return `PROVIDER_STATE_INVALID`. |
| Fetch after provider disposal | Return `PROVIDER_DISPOSED`. |
| Fetch unsupported capability | Return `PROVIDER_UNSUPPORTED_CAPABILITY` without external source access. |
| Provider returns empty payload | Return `PROVIDER_MALFORMED_RESPONSE` unless capability explicitly permits empty payload. |
| Provider returns partial payload | Return `PROVIDER_MALFORMED_RESPONSE` or successful `ProviderResult` only if capability schema permits partial provider-boundary payload. |
| Provider returns secrets in payload | Remove or reject before boundary crossing; never expose secrets downstream. |
| Normalization fails after successful fetch | Return `PROVIDER_NORMALIZATION_FAILED`; do not return partial success. |
| Timeout occurs during fetch | Return `PROVIDER_TIMEOUT`; do not return partial success. |
| Rate limit has retry delay | Return `PROVIDER_RATE_LIMITED` with `retryAfterMs`. |
| Rate limit has no retry delay | Return `PROVIDER_RATE_LIMITED` with `retryAfterMs: null` and retryability based on policy. |
| Retry succeeds after prior failure | Return `ProviderResult` with retry count and warnings metadata. |
| Retry attempts exhausted | Return `PROVIDER_RETRY_EXHAUSTED`. |
| Dispose called twice | Return idempotent disposed success. |
| Registry disposed then register called | Return `PROVIDER_REGISTRY_DISPOSED`. |
| Health check unsupported | Return `ProviderHealth` with `status: unknown` when provider contract supports health fallback, or `PROVIDER_HEALTH_CHECK_FAILED` when execution fails. |

---

## 28. Sequence Diagrams (Text)

### 28.1 Provider Registration

```text
Data Service or bootstrap configuration
→ ProviderRegistry.register(definition, factory, context)
→ ProviderRegistry validates definition schema
→ ProviderRegistry validates capability metadata
→ ProviderRegistry validates factory contract
→ ProviderFactory.validate(definition, context)
→ ProviderRegistry stores registration
→ ProviderRegistry returns registered entry
```

### 28.2 Provider Resolution and Creation

```text
Data Service
→ ProviderRegistry.create(providerId, options, context)
→ ProviderRegistry.resolve(providerId, context)
→ ProviderRegistry returns definition and factory
→ ProviderFactory.validate(definition, context)
→ ProviderFactory.create(definition, context)
→ ProviderRegistry validates BaseProvider contract
→ BaseProvider.validate(context)
→ ProviderRegistry returns BaseProvider instance
```

### 28.3 Successful Fetch

```text
Data Service
→ BaseProvider.fetch(request, context)
→ BaseProvider validates ready state
→ BaseProvider.supports(capability, context)
→ BaseProvider applies timeout, retry, and rate-limit boundaries
→ External Data Source interaction occurs through provider implementation
→ BaseProvider receives raw provider payload
→ BaseProvider.normalize(rawPayload, context)
→ BaseProvider builds ProviderResult with attribution
→ Data Service receives ProviderResult
→ Data Service owns MarketData creation
```

### 28.4 Failed Fetch

```text
Data Service
→ BaseProvider.fetch(request, context)
→ BaseProvider validates request and capability
→ External Data Source interaction fails, times out, rate limits, or returns malformed response
→ BaseProvider converts failure to ProviderError
→ BaseProvider attaches retry, timeout, rate-limit, and attribution metadata when available
→ Data Service receives ProviderError
→ Data Service owns orchestration decision
```

### 28.5 Unsupported Capability

```text
Data Service
→ BaseProvider.fetch(request with capability, context)
→ BaseProvider.supports(capability, context)
→ supports returns false
→ BaseProvider returns ProviderError code PROVIDER_UNSUPPORTED_CAPABILITY
→ No external source call occurs
```

### 28.6 Disposal

```text
Data Service or lifecycle owner
→ ProviderRegistry.dispose(context)
→ ProviderRegistry transitions to disposing
→ ProviderRegistry disposes registry-managed provider instances
→ ProviderRegistry disposes registered factories
→ ProviderRegistry transitions to disposed
→ ProviderRegistry returns disposed success
```

---

## 29. Architecture Preservation Notes

- TD-000 remains upstream Foundation infrastructure.
- TD-000 does not introduce new domains.
- TD-000 does not redefine BRD, PRD, Architecture, Product Map, Roadmap, Glossary, ADR, TD-001, TD-002, or TD-003.
- Data Service remains the only approved orchestrator of provider interactions.
- Provider Framework remains provider-agnostic and does not contain provider-specific logic.
- Provider Framework does not create MarketData and does not define MarketData fields.
- Provider Framework does not validate Health Status; `ProviderHealth` is operational provider metadata only.
- Provider Framework does not create snapshots and does not persist history.
- Health Layer and Snapshot Engine must not access Provider Framework directly.
- Retry, timeout, and rate-limit behavior are provider-boundary semantics only and do not define Data Service fallback policy.
- Normalization is limited to provider-boundary payload shape and must not become MarketData mapping.
- CommonJS compatibility must be preserved by avoiding ESM-only export requirements in the specification.
- Framework independence must be preserved by avoiding mandatory HTTP client, DI container, web framework, storage engine, queue, or scheduler dependencies.

---

## 30. Non-Functional Considerations

Performance:

- Provider contracts should support efficient provider discovery and result handoff.
- Registry resolution should avoid unnecessary provider instance creation when metadata is sufficient.

Reliability:

- Provider errors must be standardized so Data Service can handle failures consistently.
- Retry, timeout, and rate-limit metadata must be deterministic.

Maintainability:

- Providers must be replaceable without changing Health Layer or Snapshot Engine.
- Adding a provider must require registration and provider implementation only, not downstream dependency changes.

Testability:

- Registry behavior, factory behavior, provider contract validation, result schema, error schema, lifecycle transitions, and edge cases must be testable independently from Data Service orchestration.

Scalability:

- Registration and extension strategies must support adding providers without changing downstream dependency rules.

Security:

- Provider Framework must avoid exposing provider credentials or sensitive external source details to downstream components.
- Provider Error and Provider Result diagnostics must be sanitized.

Auditability:

- Source attribution must preserve enough context to support traceability from Data Service output back to external source interaction.

---

## 31. Implementation Notes

Implementation guidance:

- Preserve the Provider Framework as infrastructure.
- Keep provider orchestration in Data Service.
- Keep provider contracts provider-agnostic.
- Keep exports CommonJS compatible.
- Export contracts through stable names: `BaseProvider`, `ProviderFactory`, `ProviderRegistry`, `ProviderResult`, `ProviderError`, `ProviderHealth`, and `ProviderCapability`.
- Implement public methods with deterministic input validation before side effects.
- Convert thrown provider-specific failures into `ProviderError` before crossing the framework boundary.
- Do not wrap imports in try/catch blocks.
- Do not add provider-specific logic to generic framework files.
- Do not introduce mandatory web-framework, HTTP-client, storage, queue, scheduler, or dependency-injection dependencies.
- Keep retry and rate limit behavior at the provider boundary and expose only standardized metadata or errors to Data Service.
- Keep normalization at the boundary required to produce provider-agnostic Provider Results; MarketData creation remains Data Service responsibility.
- Add new providers through registration and extension mechanisms that do not alter downstream consumers.

Acceptance Criteria:

- Provider Framework exposes provider abstraction, factory, registry, metadata, result, error, health, capability, and lifecycle contracts only.
- Provider Framework defines deterministic schemas for `ProviderResult`, `ProviderError`, `ProviderHealth`, and `ProviderCapability`.
- Provider Framework defines deterministic method contracts for `register()`, `unregister()`, `resolve()`, `create()`, `validate()`, `fetch()`, `normalize()`, `health()`, `capabilities()`, `supports()`, and `dispose()`.
- Provider Framework defines registry, provider, and factory lifecycles.
- Provider Framework defines validation, retry, timeout, rate-limit, unsupported-provider, failure, state transition, error code, and edge-case behavior.
- Provider Framework does not create MarketData records.
- Provider Framework does not evaluate Health Status.
- Data Service remains the only approved consumer that orchestrates providers through the Provider Framework.
- External provider access is rejected when attempted outside the Provider Framework and Data Service boundary.
- Adding a provider requires no downstream dependency changes outside approved provider registration metadata.

No source code, implementation algorithm, provider implementation, runtime module change, or issue-level task breakdown is defined by this Technical Design.

---

## 32. Assumptions

- Provider Framework is Foundation infrastructure, not a product module.
- Data Service remains the owner of provider orchestration.
- MarketData remains the downstream Single Source of Truth for market data consumers.
- Health Layer validates MarketData and does not access Provider Framework.
- Snapshot Engine consumes MarketData and Health Status and does not access Provider Framework.
- Provider examples may reference external sources only as examples, not as framework-specific behavior.

---

## 33. Constraints

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
- CommonJS compatibility must be preserved.

---

## 34. Out of Scope

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

## 35. Traceability

| Item | Source |
|------|--------|
| BRD | Trusted, explainable, auditable market intelligence requirement. |
| PRD | Foundation data reliability and downstream intelligence readiness. |
| Architecture | Foundation Domain and dependency sequence. |
| Product Map | Provider Framework as Foundation component. |
| ADR | Modular architecture and separation of concerns. |

---

## 36. References

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

## 37. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-14 | Initial TD-000 Data Provider Framework Technical Design |
