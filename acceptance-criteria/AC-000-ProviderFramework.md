# Acceptance Criteria

## 1. Document Information

| Field | Value |
|------|------|
| Status | Draft |
| Version | 1.0 |
| Owner | PROJECT365 Delivery |
| Last Updated | 2026-07-19 |
| Depends On | TD-000, ISSUE-000 |
| Referenced By | Implementation Prompt, Review, Freeze |

---

## 2. Purpose

Define binary PASS/FAIL acceptance criteria for ISSUE-000 Provider Framework Implementation against TD-000 Provider Framework.

Every criterion has an expected result, verification method, pass condition, and fail condition.

---

## 3. Related Documents

| Field | Value |
|------|------|
| Technical Design ID | TD-000 |
| Technical Design Name | Data Provider Framework |
| Technical Design Path | `../specs/TD-000-DataProviderFramework.md` |
| Issue ID | ISSUE-000 |
| Issue Name | Provider Framework Implementation |
| Issue Specification Path | `../issues/ISSUE-000-ProviderFramework.md` |

---

## 4. Binary Acceptance Criteria

### Public Interfaces

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-PI-001 | `BaseProvider` exposes required properties `id`, `name`, `version`, and `state`. | Inspect exported contract and run interface-shape test. | All required properties exist with stable names. | Any required property is missing, renamed, or provider-specific. |
| AC-PI-002 | `BaseProvider` exposes required methods `validate`, `fetch`, `normalize`, `health`, `capabilities`, `supports`, and `dispose`. | Inspect exported contract and run interface-shape test. | All required methods exist with stable names and approved inputs. | Any required method is missing, renamed, or has unapproved inputs. |
| AC-PI-003 | `ProviderRegistry` exposes required methods `register`, `unregister`, `resolve`, `create`, `validate`, `capabilities`, `health`, `supports`, and `dispose`. | Inspect exported contract and run interface-shape test. | All required methods exist with stable names and approved inputs. | Any required method is missing, renamed, or has unapproved inputs. |
| AC-PI-004 | `ProviderFactory` exposes required properties `providerId` and `version`. | Inspect exported contract and run interface-shape test. | Both required properties exist with stable names. | Either required property is missing, renamed, or provider-specific. |
| AC-PI-005 | `ProviderFactory` exposes required methods `validate`, `create`, `capabilities`, and `dispose`. | Inspect exported contract and run interface-shape test. | All required methods exist with stable names and approved inputs. | Any required method is missing, renamed, or has unapproved inputs. |
| AC-PI-006 | `ProviderResult`, `ProviderError`, `ProviderHealth`, and `ProviderCapability` are exposed through stable CommonJS-compatible names. | Inspect module exports. | All four contract names are exported without requiring ESM-only usage. | Any contract is absent, renamed, or requires an ESM-only export format. |

### Validation

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-V-001 | Registry registration rejects operation after registry disposal. | Run registration validation test on disposed registry. | `ProviderError.code` is `PROVIDER_REGISTRY_DISPOSED`. | Registration succeeds or returns another code. |
| AC-V-002 | Registry registration requires `definition.providerId`, `definition.name`, and `definition.version`. | Run registration validation tests with each field missing. | Each missing field returns `PROVIDER_VALIDATION_FAILED`. | Missing required field is accepted or returns another code. |
| AC-V-003 | Registry registration rejects duplicate active provider identifiers. | Register same provider identifier twice. | Second registration returns `PROVIDER_ALREADY_REGISTERED`. | Second registration succeeds or returns another code. |
| AC-V-004 | Registry registration requires capability declarations conforming to `ProviderCapability`. | Register with missing or malformed capabilities. | Invalid capability metadata returns `PROVIDER_CAPABILITY_INVALID`. | Invalid capability metadata is accepted or returns another code. |
| AC-V-005 | Registry registration validates retry, timeout, and rate-limit metadata as provider-agnostic metadata when present. | Register with malformed policy metadata. | Malformed policy metadata is rejected with deterministic `ProviderError`. | Malformed policy metadata is accepted or failure is non-deterministic. |
| AC-V-006 | Registry registration requires factory properties and methods from `ProviderFactory`. | Register factories with each required property or method missing. | Invalid factory shape returns `PROVIDER_FACTORY_INVALID`. | Invalid factory shape is accepted or returns another code. |
| AC-V-007 | Registry stores a registry entry only after factory validation succeeds. | Run registration with factory validation failure and then resolve provider. | Registration returns `PROVIDER_FACTORY_INVALID` and resolve returns `PROVIDER_NOT_REGISTERED`. | Failed registration is resolvable or stored. |
| AC-V-008 | Provider creation resolves provider identifier through registry before factory creation. | Create unknown provider identifier. | Create returns `PROVIDER_NOT_REGISTERED` and factory create is not called. | Factory create is called or another code is returned. |
| AC-V-009 | Provider creation rejects disposed factories. | Create using disposed factory. | Create returns `PROVIDER_FACTORY_DISPOSED` or `PROVIDER_FACTORY_INVALID` according to implemented validation boundary. | Disposed factory creates a provider. |
| AC-V-010 | Provider creation validates returned instance implements the complete `BaseProvider` contract. | Factory returns object missing each required property or method. | Creation returns `PROVIDER_CONTRACT_INVALID`. | Invalid provider object is returned as usable provider. |
| AC-V-011 | Provider creation rejects provider instance whose `id` differs from registry provider identifier. | Factory returns provider with mismatched `id`. | Creation returns `PROVIDER_CONTRACT_INVALID`. | Mismatched provider is accepted. |
| AC-V-012 | Fetch validates provider is not disposed. | Invoke `fetch` after provider disposal. | Fetch returns `PROVIDER_DISPOSED`. | Fetch proceeds or returns success. |
| AC-V-013 | Fetch validates provider is in `ready` state. | Invoke `fetch` before provider validation. | Fetch returns `PROVIDER_STATE_INVALID`. | Fetch proceeds or returns success. |
| AC-V-014 | Fetch requires a valid capability query. | Invoke `fetch` with missing or malformed capability. | Fetch returns `PROVIDER_CAPABILITY_INVALID` or `PROVIDER_VALIDATION_FAILED` according to contract boundary. | Malformed capability is accepted. |
| AC-V-015 | Fetch checks `supports(capability, context)` before external source access. | Invoke `fetch` with unsupported capability and spy on provider-boundary fetch. | Fetch returns `PROVIDER_UNSUPPORTED_CAPABILITY` and no external source access occurs. | External source access occurs or unsupported capability succeeds. |
| AC-V-016 | Successful fetch includes source attribution. | Run valid fetch and inspect `ProviderResult.attribution`. | Attribution exists with required fields. | Successful result lacks required attribution. |

### Registry Lifecycle

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-RL-001 | New registry starts in `empty` state. | Instantiate registry and inspect state. | State is `empty`. | State is not `empty`. |
| AC-RL-002 | First successful `register()` transitions registry to `ready`. | Register valid provider and inspect state. | State is `ready`. | State remains `empty` or changes to unapproved state. |
| AC-RL-003 | Active registry operation may use `active` only for operation duration and returns to `ready`. | Run `resolve`, `create`, `health`, `capabilities`, or `supports` with state observation. | State is deterministic and returns to `ready` after operation. | State remains `active` after operation or becomes unapproved. |
| AC-RL-004 | `unregister()` removes a registered provider only when lifecycle rules permit. | Unregister registered provider without active managed calls. | Success object has `status: unregistered`. | Registered idle provider cannot be unregistered. |
| AC-RL-005 | `dispose()` transitions registry to `disposed` after disposing registry-managed resources. | Dispose registry and inspect result and state. | Success object has `status: disposed` and state is `disposed`. | State is not `disposed` after successful disposal. |
| AC-RL-006 | Public registry methods after disposal return `PROVIDER_REGISTRY_DISPOSED` except repeated `dispose()`. | Call `register`, `resolve`, and `create` after disposal. | Each returns `PROVIDER_REGISTRY_DISPOSED`. | Any call succeeds or returns non-deterministic failure. |
| AC-RL-007 | Repeated registry `dispose()` is idempotent. | Call `dispose()` twice. | Second call returns success with `status: disposed`. | Second call fails or changes state away from `disposed`. |

### Factory Lifecycle

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-FL-001 | Factory becomes `registered` only through `ProviderRegistry.register()`. | Inspect factory state before and after registry registration. | State changes to `registered` only after successful registration. | Factory self-registers or changes state outside registration. |
| AC-FL-002 | Factory `validate()` confirms factory can create `BaseProvider` instances for its definition. | Run factory validation with valid and invalid definitions. | Valid definition returns `status: valid`; invalid definition returns `ProviderError`. | Validation accepts invalid definition or rejects valid definition. |
| AC-FL-003 | Factory `create()` is called only after registration validation succeeds. | Attempt create after failed registration. | Factory `create()` is not called. | Factory `create()` is called after failed registration. |
| AC-FL-004 | Factory-created providers implement complete `BaseProvider` method set. | Factory creates provider and inspect returned instance. | Returned instance has all required `BaseProvider` properties and methods. | Returned instance is missing any required contract member. |
| AC-FL-005 | Factory `dispose()` releases factory-owned resources without disposing provider instances not factory-managed. | Dispose factory with unmanaged provider instance present. | Factory-owned resources are disposed and unmanaged instance is unchanged. | Unmanaged provider instance is disposed by factory. |
| AC-FL-006 | Calls after factory disposal return `PROVIDER_FACTORY_DISPOSED`. | Call factory public methods after disposal. | Each non-dispose operation returns `PROVIDER_FACTORY_DISPOSED`. | Disposed factory performs operation successfully. |

### Provider Lifecycle

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-PL-001 | `create()` returns provider in `created` or `ready` state. | Create valid provider and inspect state. | State is exactly `created` or `ready`. | State is missing or outside approved states. |
| AC-PL-002 | `validate()` transitions `created` provider through validation to `ready` on success. | Validate created provider and inspect result and state. | Success object has `status: valid` and state is `ready`. | Provider remains unvalidated or enters unapproved state. |
| AC-PL-003 | `fetch()` requires `ready` and returns provider to `ready` after successful call. | Fetch from ready provider and inspect state after completion. | State is `ready` after success. | State remains `fetching`, `normalizing`, or unapproved. |
| AC-PL-004 | Fetch requiring normalization transitions through `normalizing` before returning `ProviderResult`. | Run fetch with normalization instrumentation. | Normalization occurs before result and final state is `ready`. | Result is returned before normalization or state is invalid. |
| AC-PL-005 | Recoverable failures return `ProviderError` and may return provider to `ready`. | Simulate recoverable provider-boundary failure. | Failure returns `ProviderError`; final state is `ready` or approved `failed`. | Failure leaks exception or state is non-deterministic. |
| AC-PL-006 | Non-recoverable failures may transition provider to `failed` until disposal or successful revalidation. | Simulate non-recoverable failure and inspect state. | State is `failed` or deterministically recovered by validation. | State is undefined or unapproved. |
| AC-PL-007 | `dispose()` from `created`, `ready`, or `failed` transitions provider to `disposed` after cleanup. | Dispose provider from each allowed state. | Each disposal returns `status: disposed` and state is `disposed`. | Disposal fails from allowed state without approved error. |
| AC-PL-008 | Public provider calls after disposal return `PROVIDER_DISPOSED`. | Call public provider methods after disposal. | Each non-dispose operation returns `PROVIDER_DISPOSED`. | Disposed provider performs operation successfully. |

### Error Handling

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-E-001 | Error condition `PROVIDER_VALIDATION_FAILED` is handled with the approved `ProviderError` contract. | Run negative validation test. | Returned object has `status: error` and `code: PROVIDER_VALIDATION_FAILED`. | Invalid input is accepted, wrong code is returned, or exception leaks. |
| AC-E-002 | Error condition `PROVIDER_CONTRACT_INVALID` is handled with the approved `ProviderError` contract. | Run invalid contract test. | Returned object has `status: error` and `code: PROVIDER_CONTRACT_INVALID`. | Invalid contract is accepted, wrong code is returned, or exception leaks. |
| AC-E-003 | Error condition `PROVIDER_FACTORY_INVALID` is handled with the approved `ProviderError` contract. | Run invalid factory test. | Returned object has `status: error` and `code: PROVIDER_FACTORY_INVALID`. | Invalid factory is accepted, wrong code is returned, or exception leaks. |
| AC-E-004 | Error condition `PROVIDER_CAPABILITY_INVALID` is handled with the approved `ProviderError` contract. | Run malformed capability test. | Returned object has `status: error` and `code: PROVIDER_CAPABILITY_INVALID`. | Malformed capability is accepted, wrong code is returned, or exception leaks. |
| AC-E-005 | Error condition `PROVIDER_ALREADY_REGISTERED` is handled with the approved `ProviderError` contract. | Register duplicate active provider. | Returned object has `status: error` and `code: PROVIDER_ALREADY_REGISTERED`. | Duplicate registration succeeds or wrong code is returned. |
| AC-E-006 | Error condition `PROVIDER_NOT_REGISTERED` is handled with the approved `ProviderError` contract. | Resolve unknown provider. | Returned object has `status: error` and `code: PROVIDER_NOT_REGISTERED`. | Unknown provider resolves or wrong code is returned. |
| AC-E-007 | Error condition `PROVIDER_REGISTRY_DISPOSED` is handled with the approved `ProviderError` contract. | Call registry after disposal. | Returned object has `status: error` and `code: PROVIDER_REGISTRY_DISPOSED`. | Disposed registry performs operation or wrong code is returned. |
| AC-E-008 | Error condition `PROVIDER_CREATE_FAILED` is handled with the approved `ProviderError` contract. | Simulate factory construction failure. | Returned object has `status: error` and `code: PROVIDER_CREATE_FAILED`. | Construction exception leaks or wrong code is returned. |
| AC-E-009 | Error condition `PROVIDER_FACTORY_DISPOSED` is handled with the approved `ProviderError` contract. | Call factory after disposal. | Returned object has `status: error` and `code: PROVIDER_FACTORY_DISPOSED`. | Disposed factory performs operation or wrong code is returned. |
| AC-E-010 | Error condition `PROVIDER_DISPOSE_FAILED` is handled with the approved `ProviderError` contract. | Simulate disposal failure. | Returned object has `status: error` and `code: PROVIDER_DISPOSE_FAILED`. | Disposal exception leaks or wrong code is returned. |
| AC-E-011 | Error condition `PROVIDER_DISPOSED` is handled with the approved `ProviderError` contract. | Call disposed provider. | Returned object has `status: error` and `code: PROVIDER_DISPOSED`. | Disposed provider performs operation or wrong code is returned. |
| AC-E-012 | Error condition `PROVIDER_STATE_INVALID` is handled with the approved `ProviderError` contract. | Call method in unsupported lifecycle state. | Returned object has `status: error` and `code: PROVIDER_STATE_INVALID`. | Unsupported state call succeeds or wrong code is returned. |
| AC-E-013 | Error condition `PROVIDER_UNSUPPORTED_CAPABILITY` is handled with the approved `ProviderError` contract. | Fetch unsupported capability. | Returned object has `status: error` and `code: PROVIDER_UNSUPPORTED_CAPABILITY`. | Fetch occurs or wrong code is returned. |
| AC-E-014 | Error condition `PROVIDER_SOURCE_UNAVAILABLE` is handled with the approved `ProviderError` contract. | Simulate unavailable external source through provider boundary. | Returned object has `status: error`, `code: PROVIDER_SOURCE_UNAVAILABLE`, and retryable default true. | Source-specific exception leaks or wrong retryability is returned. |
| AC-E-015 | Error condition `PROVIDER_TIMEOUT` is handled with the approved `ProviderError` contract. | Simulate timeout boundary. | Returned object has `status: error`, `code: PROVIDER_TIMEOUT`, and `timeout: true`. | Partial success is returned or timeout flag is false. |
| AC-E-016 | Error condition `PROVIDER_RATE_LIMITED` is handled with the approved `ProviderError` contract. | Simulate rate-limit failure. | Returned object has `status: error`, `code: PROVIDER_RATE_LIMITED`, and `rateLimited: true`. | Rate limit is not represented or wrong code is returned. |
| AC-E-017 | Error condition `PROVIDER_AUTH_FAILED` is handled with the approved `ProviderError` contract. | Simulate authentication failure. | Returned object has `status: error`, `code: PROVIDER_AUTH_FAILED`, and `retryable: false`. | Authentication exception leaks or retryability is true. |
| AC-E-018 | Error condition `PROVIDER_MALFORMED_RESPONSE` is handled with the approved `ProviderError` contract. | Simulate malformed response. | Returned object has `status: error` and `code: PROVIDER_MALFORMED_RESPONSE`. | Partial success is returned or wrong code is returned. |
| AC-E-019 | Error condition `PROVIDER_NORMALIZATION_FAILED` is handled with the approved `ProviderError` contract. | Simulate normalization failure. | Returned object has `status: error` and `code: PROVIDER_NORMALIZATION_FAILED`. | Partial success is returned or wrong code is returned. |
| AC-E-020 | Error condition `PROVIDER_RETRY_EXHAUSTED` is handled with the approved `ProviderError` contract. | Exhaust retry attempts. | Returned object has `status: error`, `code: PROVIDER_RETRY_EXHAUSTED`, and final cause when safe in details. | Retry exhaustion succeeds or wrong code is returned. |
| AC-E-021 | Error condition `PROVIDER_HEALTH_CHECK_FAILED` is handled with the approved `ProviderError` contract. | Simulate health check execution failure. | Returned object has `status: error` and `code: PROVIDER_HEALTH_CHECK_FAILED`. | Health failure leaks exception or wrong code is returned. |
| AC-E-022 | Error condition `PROVIDER_UNKNOWN_ERROR` is handled with the approved `ProviderError` contract. | Simulate unexpected provider-framework failure. | Returned object has `status: error`, `code: PROVIDER_UNKNOWN_ERROR`, and sanitized details. | Unexpected exception leaks or secrets are exposed. |

### Edge Cases

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-B-001 | Register same provider twice rejects second active registration with `PROVIDER_ALREADY_REGISTERED`. | Run duplicate registration test. | Second call returns `PROVIDER_ALREADY_REGISTERED`. | Second call succeeds or returns other code. |
| AC-B-002 | Register provider without capabilities rejects with `PROVIDER_CAPABILITY_INVALID`. | Run registration without capabilities. | Registration returns `PROVIDER_CAPABILITY_INVALID`. | Registration succeeds or returns other code. |
| AC-B-003 | Factory creates object missing `fetch()` rejects with `PROVIDER_CONTRACT_INVALID`. | Factory returns object without `fetch()`. | Creation returns `PROVIDER_CONTRACT_INVALID`. | Invalid object is accepted. |
| AC-B-004 | Provider `id` differs from registry identifier rejects with `PROVIDER_CONTRACT_INVALID`. | Factory returns provider with mismatched id. | Creation returns `PROVIDER_CONTRACT_INVALID`. | Mismatched provider is accepted. |
| AC-B-005 | Resolve unknown provider returns `PROVIDER_NOT_REGISTERED`. | Resolve unregistered identifier. | Resolve returns `PROVIDER_NOT_REGISTERED`. | Unknown provider resolves. |
| AC-B-006 | Fetch before provider validation returns `PROVIDER_STATE_INVALID`. | Fetch from `created` provider. | Fetch returns `PROVIDER_STATE_INVALID`. | Fetch succeeds. |
| AC-B-007 | Fetch after provider disposal returns `PROVIDER_DISPOSED`. | Fetch from disposed provider. | Fetch returns `PROVIDER_DISPOSED`. | Fetch succeeds. |
| AC-B-008 | Fetch unsupported capability returns `PROVIDER_UNSUPPORTED_CAPABILITY` without external source access. | Fetch unsupported capability and observe external access spy. | Error code is `PROVIDER_UNSUPPORTED_CAPABILITY` and access count is zero. | External access occurs or wrong code is returned. |
| AC-B-009 | Empty payload is rejected unless capability explicitly permits empty payload. | Fetch empty payload for capability without empty allowance. | Error code is `PROVIDER_MALFORMED_RESPONSE`. | Empty payload succeeds without capability permission. |
| AC-B-010 | Partial payload is rejected unless capability schema permits partial provider-boundary payload. | Fetch partial payload under disallowing capability schema. | Error code is `PROVIDER_MALFORMED_RESPONSE`. | Partial payload succeeds without schema permission. |
| AC-B-011 | Secrets in payload are removed or rejected before boundary crossing. | Fetch payload containing credential-like secret fixture. | Output contains no secret value; result is sanitized success or approved error. | Secret value appears in result, error, message, or details. |
| AC-B-012 | Normalization failure after successful fetch returns `PROVIDER_NORMALIZATION_FAILED` without partial success. | Simulate normalization failure. | Error code is `PROVIDER_NORMALIZATION_FAILED` and no `ProviderResult` is returned. | Partial success is returned. |
| AC-B-013 | Timeout during fetch returns `PROVIDER_TIMEOUT` without partial success. | Simulate timeout. | Error code is `PROVIDER_TIMEOUT`, `timeout` is true, and no `ProviderResult` is returned. | Partial success is returned. |
| AC-B-014 | Rate limit with retry delay returns `PROVIDER_RATE_LIMITED` with `retryAfterMs`. | Simulate rate limit with deterministic retry delay. | Error code is `PROVIDER_RATE_LIMITED` and `retryAfterMs` is non-null. | Retry delay is omitted. |
| AC-B-015 | Rate limit without retry delay returns `PROVIDER_RATE_LIMITED` with `retryAfterMs: null`. | Simulate rate limit without deterministic retry delay. | Error code is `PROVIDER_RATE_LIMITED` and `retryAfterMs` is null. | Retry delay has arbitrary value or wrong code is returned. |
| AC-B-016 | Retry success after prior failure returns `ProviderResult` with retry count and warnings metadata. | Simulate first retryable failure then success. | Result status is `success`, retry count is greater than 0, and warnings metadata is present. | Retry count is missing or failure is returned. |
| AC-B-017 | Retry attempts exhausted returns `PROVIDER_RETRY_EXHAUSTED`. | Simulate failures until max attempts. | Error code is `PROVIDER_RETRY_EXHAUSTED`. | Retries continue beyond max or wrong code is returned. |
| AC-B-018 | Dispose called twice returns idempotent disposed success. | Call provider, factory, or registry `dispose()` twice. | Second result has `status: disposed`. | Second call fails or changes to unapproved state. |
| AC-B-019 | Registry disposed then register called returns `PROVIDER_REGISTRY_DISPOSED`. | Dispose registry, then call `register()`. | Register returns `PROVIDER_REGISTRY_DISPOSED`. | Register succeeds or wrong code is returned. |
| AC-B-020 | Unsupported health check returns `ProviderHealth.status: unknown` when fallback is supported or `PROVIDER_HEALTH_CHECK_FAILED` when execution fails. | Run unsupported health-check scenario. | Result is exactly one approved outcome. | Result is ambiguous, provider-specific, or unapproved. |

### Immutability

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-I-001 | Returned `ProviderResult`, `ProviderError`, `ProviderHealth`, and `ProviderCapability` objects are deterministic boundary values for equivalent inputs and observable provider outcomes. | Run repeated equivalent calls and compare approved contract fields. | Approved fields are equivalent except timestamps and measured durations. | Equivalent calls produce different contract shape or provider-specific fields. |
| AC-I-002 | `ProviderResult.payload.raw` never exposes credentials or secrets. | Run secret-containing payload test. | Raw payload is omitted, sanitized, or rejected before crossing boundary. | Any secret value crosses boundary. |
| AC-I-003 | Error `message` and `details` never expose credentials, secrets, tokens, or provider-specific sensitive internals. | Run failure sanitization tests with sensitive fixture values. | Sensitive fixture values are absent from `message` and `details`. | Any sensitive fixture value is present. |

### Contract Validation

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-CV-001 | `ProviderResult.status` equals `success` and mandatory fields are present. | Run `ProviderResult` schema test. | All TD-000 required fields are present and `status` is `success`. | Any required field is missing or status differs. |
| AC-CV-002 | `ProviderResult.payload.normalized` is null only when `payload.format` is `raw`. | Run payload format validation tests. | Null normalized payload is accepted only for `raw` format. | Null normalized payload is accepted for other formats. |
| AC-CV-003 | `ProviderResult` contains no MarketData field ownership semantics. | Inspect result schema and tests. | Result fields remain provider-boundary only. | MarketData-owned fields are introduced. |
| AC-CV-004 | `ProviderError.status` equals `error` and mandatory fields are present. | Run `ProviderError` schema test. | All TD-000 required fields are present and `status` is `error`. | Any required field is missing or status differs. |
| AC-CV-005 | `ProviderError.retryAfterMs` is non-null when `rateLimited` is true and a deterministic retry delay is exposed. | Run rate-limit error schema tests. | Retry delay appears only when deterministically available. | Retry delay is omitted when available or invented when unavailable. |
| AC-CV-006 | `ProviderHealth.status` is one of `healthy`, `degraded`, `unhealthy`, or `unknown`. | Run health schema validation. | Only approved status values are accepted. | Unapproved status value is accepted. |
| AC-CV-007 | `ProviderHealth.available: false` maps to `degraded`, `unhealthy`, or `unknown`. | Run health availability validation. | Unavailable health never has `status: healthy`. | Unavailable health is marked `healthy`. |
| AC-CV-008 | `ProviderCapability.name` and `ProviderCapability.version` are stable strings. | Run capability schema validation. | Missing or non-string values are rejected. | Missing or non-string values are accepted. |
| AC-CV-009 | `ProviderCapability` metadata does not define MarketData fields, product domains, or downstream business rules. | Inspect capability schema and fixture tests. | Capability metadata remains provider-boundary only. | Capability metadata introduces downstream ownership. |

### Architecture Preservation

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-AP-001 | No architecture document is modified by implementation. | Review changed files. | No architecture or governance change appears in implementation PR. | Architecture or governance is changed without approval. |
| AC-AP-002 | Provider Framework remains provider-agnostic and contains no provider-specific implementation. | Review implementation files. | No provider-specific adapter, HTTP implementation, or CoinGecko implementation is present. | Provider-specific implementation is added. |
| AC-AP-003 | Provider Framework does not create MarketData. | Review implementation and tests. | No MarketData creation occurs in Provider Framework. | Provider Framework creates or owns MarketData. |
| AC-AP-004 | Provider Framework does not evaluate Health Status. | Review implementation and tests. | `ProviderHealth` remains provider operational metadata only. | Health Layer Health Status validation is implemented. |
| AC-AP-005 | Provider Framework does not create snapshots or persist history. | Review implementation and tests. | No snapshot creation or storage behavior is implemented. | Snapshot or persistence responsibility is added. |
| AC-AP-006 | Framework independence is preserved. | Review dependencies and imports. | No mandatory web framework, HTTP client, storage engine, queue, scheduler, or dependency-injection dependency is introduced. | Mandatory framework or infrastructure dependency is introduced. |

### Dependency Direction

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-DD-001 | Provider Framework does not import Data Service internals. | Review imports and module references. | No Data Service internal dependency exists. | Provider Framework depends on Data Service internals. |
| AC-DD-002 | Provider Framework does not import Health Layer internals. | Review imports and module references. | No Health Layer internal dependency exists. | Provider Framework depends on Health Layer internals. |
| AC-DD-003 | Provider Framework does not import Snapshot Engine internals. | Review imports and module references. | No Snapshot Engine internal dependency exists. | Provider Framework depends on Snapshot Engine internals. |
| AC-DD-004 | Health Layer and Snapshot Engine do not access Provider Framework directly. | Review imports and module references. | No direct provider or registry access from Health Layer or Snapshot Engine exists. | Downstream modules access Provider Framework directly. |
| AC-DD-005 | Adding a provider requires registration and provider implementation only, not downstream dependency changes. | Review extension tests or implementation seams. | Provider addition path does not change downstream dependencies. | Provider addition requires downstream module changes. |

### Runtime Flow Preservation

| ID | Expected Result | Verification Method | Pass Condition | Fail Condition |
|----|-----------------|---------------------|----------------|----------------|
| AC-RF-001 | Provider registration follows TD-000 registration sequence. | Run ordered registration test with instrumentation. | Validation of definition, capabilities, factory contract, factory validation, and storage occur in approved order. | Storage occurs before validation or sequence is altered. |
| AC-RF-002 | Provider creation follows TD-000 resolution and creation sequence. | Run ordered creation test with instrumentation. | Registry resolve, factory validate, factory create, BaseProvider contract validation, provider validation, and return occur in approved order. | Provider is returned before approved validation steps. |
| AC-RF-003 | Successful fetch follows TD-000 successful fetch sequence. | Run ordered fetch test with instrumentation. | Ready validation, capability support, boundary behavior, provider interaction, normalization, ProviderResult creation, and Data Service receipt boundary are preserved. | Fetch bypasses support check, normalization, or approved boundary. |
| AC-RF-004 | Failed fetch follows TD-000 failed fetch sequence. | Run ordered failed-fetch test with instrumentation. | Failure converts to `ProviderError` with retry, timeout, rate-limit, and attribution metadata when available. | Provider-specific exception crosses boundary or metadata is omitted when available. |
| AC-RF-005 | Unsupported capability flow performs no external source call. | Run unsupported capability flow with external access spy. | `supports` returns false, `PROVIDER_UNSUPPORTED_CAPABILITY` is returned, and access count is zero. | External source call occurs. |
| AC-RF-006 | Disposal follows TD-000 disposal sequence. | Run disposal flow with instrumentation. | Registry transitions to disposing, disposes managed provider instances and factories, transitions to disposed, and returns disposed success. | Disposal order is unapproved or final state is not disposed. |

---

## 5. Overall Acceptance Rule

AC-000 passes only when every criterion in Section 4 passes. Any single failed criterion makes AC-000 fail.

---

## 6. Traceability

| Acceptance Area | Source |
|-----------------|--------|
| Public interfaces | TD-000 Provider Framework |
| Validation | TD-000 Provider Framework |
| Registry lifecycle | TD-000 Provider Framework |
| Factory lifecycle | TD-000 Provider Framework |
| Provider lifecycle | TD-000 Provider Framework |
| Error handling | TD-000 Provider Framework |
| Edge cases | TD-000 Provider Framework |
| Immutability | TD-000 Provider Framework |
| Contract validation | TD-000 Provider Framework |
| Architecture preservation | TD-000 Provider Framework |
| Dependency direction | TD-000 Provider Framework |
| Runtime flow preservation | TD-000 Provider Framework |

---

## 7. Out of Scope

- New business requirements.
- New product requirements.
- New architecture decisions.
- New modules.
- New technical design responsibilities.
- Acceptance requirements not derived from TD-000 and ISSUE-000.
- Provider implementation.
- HTTP implementation.
- CoinGecko implementation.

---

## 8. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-07-19 | Initial Acceptance Criteria document derived only from TD-000. |
