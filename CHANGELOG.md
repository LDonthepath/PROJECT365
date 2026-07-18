# Changelog

## 2026-07-18

### Added

- Implemented ISSUE-005 Event Bus with approved event registry, event and metadata validation, publisher ownership checks, subscriber registry lifecycle, publish, subscribe, unsubscribe, getSubscribers, dispatch, deterministic delivery ordering, duplicate-event rejection, and approved error contracts.
- Added deterministic Event Bus tests covering AC-005 contract fields, public interfaces, validation rules, error outcomes, lifecycle behavior, edge cases, and dependency-direction rejection.

### Updated

- Marked ISSUE-005 implementation tracking as completed in Current Status, Backlog, and ISSUE-005.

## 2026-07-15

### Added

- Implemented ISSUE-004 Data Service with Provider Framework orchestration, provider-result normalization, MarketData creation, approved failure contracts, timeout, retry, rate-limit, unsupported-provider, malformed-response, missing-field, invalid-field, and immutable output handling.
- Added deterministic Data Service tests covering unit, contract, validation, error handling, edge, boundary, immutability, serialization, and deserialization scenarios.
- Implemented ISSUE-003 Snapshot Engine with immutable snapshot creation, current, previous, historical, and anchor accessors, validation, and expiration marking.
- Added deterministic Snapshot Engine tests covering unit, contract, validation, error handling, edge, boundary, immutability, serialization, and deserialization scenarios.
- Implemented ISSUE-002 Health Layer with immutable health status evaluation, TTL status exposure, and MarketData contract validation.
- Added deterministic Health Layer tests covering unit, contract, validation, error handling, edge, boundary, immutability, serialization, and deserialization scenarios.

### Updated

- Marked ISSUE-002 implementation tracking as completed in Current Status, Backlog, and ISSUE-002.
- Marked ISSUE-003 implementation tracking as completed in Current Status, Backlog, and ISSUE-003.
- Marked ISSUE-004 implementation tracking as completed in Current Status, Backlog, and ISSUE-004.

## 2026-07-14

### Added

- Implemented ISSUE-001 MarketData contract with immutable creation, validation, serialization, and deserialization support.
- Added deterministic MarketData unit tests covering contract validation, edge cases, error handling, immutability, and serialization.

### Updated

- Marked ISSUE-001 implementation tracking as completed in Current Status, Backlog, and ISSUE-001.
