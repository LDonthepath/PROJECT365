# PROJECT365

# Formula Catalog

## 1. Document Information

| Field | Value |
|------|------|
| Status | Active |
| Version | 1.1 |
| Owner | PROJECT365 Delivery |
| Last Updated | 2026-09-08 |
| Depends On | TD-007 Delta Engine |
| Referenced By | Not yet wired into traceability chain — no existing document currently links to this file. Recommended follow-up: add this file to TD-007's "Referenced By" and to TD-008 Triad Liquidity Framework's "Depends On" once Triad formulas are added here. |

---

## 2. Purpose

Record the exact mathematical formulas used by each Intelligence Layer engine, so that formula logic is documented independently of source code and can be reviewed, audited, or ported without reading implementation files.

This document does not redefine business requirements, product requirements, architecture, or technical design. It documents the formula layer only — the "what is calculated", not the "why" (see corresponding TD documents) or the "when triggered" (see DecisionLogicCatalog.md) or the "at what value" (see ThresholdCatalog.md).

**Traceability note:** The Delta Engine section below was written retroactively on 2026-09-08. The formula was implemented in `backend/src/deltaEngine.js` and merged before this document was populated, which is inconsistent with the project's Documentation First principle (Mission.md). This section transcribes the formula exactly as implemented in code as of commit history up to 2026-09-08; it does not introduce new logic.

---

## 3. Delta Engine (TD-007)

Source: `backend/src/deltaEngine.js`, function `calculateFieldDelta`.

### 3.1 Absolute Delta

For any field present in both the current and previous Snapshot's MarketData:

```
absoluteDelta = currentValue - previousValue
```

If either `currentValue` or `previousValue` is `null`, `absoluteDelta` is `null`.

### 3.2 Percent Delta

```
percentDelta = ((currentValue - previousValue) / previousValue) * 100
```

`percentDelta` is `null` when:
- `currentValue` is `null`, or
- `previousValue` is `null`, or
- `previousValue` is `0` (division by zero guarded explicitly)

### 3.3 Fields Covered

Applied identically to all 14 fields in `DELTA_FIELDS`: `priceUsd`, `change1h`, `change24h`, `volume24hUsd`, `marketCapUsd`, `totalMarketCapUsd`, `total3MarketCap`, `btcDominance`, `ethDominance`, `usdtDominance`, `usdcDominance`, `circulatingSupply`, `ath`, `atl`.

### 3.4 Dominance Field Unit Override

For the four dominance fields (`btcDominance`, `ethDominance`, `usdtDominance`, `usdcDominance`), the output carries `deltaUnit: 'percentage-points'`. This is a labeling distinction only — the formula in 3.1 and 3.2 is not altered. It signals to downstream consumers that `absoluteDelta` for these fields represents a change in percentage points (e.g. dominance moving from 52% to 53% is `absoluteDelta: 1`), not a percent-of-percent calculation.

`percentDelta` for dominance fields remains the relative percentage change of the dominance value itself, computed the same way as 3.2, and is retained for backward compatibility per the code's inline comment.

### 3.5 Explicitly Deferred Interpretation

`ath`, `atl`, and `circulatingSupply` receive the same generic scalar delta treatment as price/volume fields. The Delta Engine does not assign regime meaning to their deltas (e.g. it does not classify an ATH delta as "breakout"). This interpretation is intentionally deferred to downstream consumers (Triad Liquidity Framework and later engines), per inline code comment.

---

## 4. Triad Liquidity Framework (TD-008)

Not yet documented. Design was discussed in a prior working session but has not been formalized here. Populate before implementation begins, per project Documentation First principle.

## 5. Regime Engine (TD-009)

Not yet documented.

## 6. LDS Engine (TD-010)

Not yet documented.

## 7. Capital Flow Engine (TD-011)

Not yet documented.

## 8. Market State Engine (TD-012)

Not yet documented. No design exists yet, in this document or otherwise.

## 9. Confidence Engine (TD-013)

Not yet documented. No design exists yet, in this document or otherwise.

---

## 10. Change History

| Version | Date | Description |
| --- | --- | --- |
| 1.0 | 2026-07-14 | Placeholder created, marked under development. |
| 1.1 | 2026-09-08 | Populated Delta Engine formula section retroactively from `backend/src/deltaEngine.js`. Sections 4-9 added as explicit placeholders for remaining M5 engines, pending formalization. |
