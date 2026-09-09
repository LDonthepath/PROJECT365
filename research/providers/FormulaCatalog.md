# PROJECT365

# Formula Catalog

## 1. Document Information

| Field | Value |
|------|------|
| Status | Active |
| Version | 1.2 |
| Owner | PROJECT365 Delivery |
| Last Updated | 2026-09-08 |
| Depends On | TD-007 Delta Engine, TD-008 Triad Liquidity Framework |
| Referenced By | Not yet wired into traceability chain — no existing document currently links to this file. Recommended follow-up: add this file to TD-007's and TD-008's "Referenced By" sections. |

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

Source: user-provided architecture design (screenshot), not yet implemented in code. Formula names and weights below are transcribed from that design, not derived from an existing implementation. Contract shape (input/output naming) is inferred to match TD-008's approved Data Model ("Delta Contract" in, "Liquidity Assessment" out) and TD-010's approved consumption of the same output.

### 4.1 Scope Boundary

Per TD-008's Data Model, Triad Liquidity Framework consumes the Delta Contract (TD-007) and produces a Liquidity Assessment. It does not itself compute composite liquidity or divergence scores; those are owned downstream (LDS Engine, Capital Flow Engine) per TD-010 and TD-011. This section covers Triad Liquidity Framework's own transformation only: raw delta to normalized Z-Score.

### 4.2 The Triad

Three MarketData-derived fields, all already present in the Delta Contract (see Section 3.3):

- BTC.D (`btcDominance`) — Bitcoin Dominance, percentage of total market cap.
- TOTAL3 (`total3MarketCap`) — altcoin market cap excluding BTC and ETH.
- USDT.D (`usdtDominance`) — Tether/stablecoin dominance, percentage of total market cap.

### 4.3 Z-Score Normalization

```
z(ΔX) = (ΔX − mean(ΔX, window=60)) / max(stddev(ΔX, window=60), 0.0001)
```

Applied independently to `ΔbtcDominance`, `Δtotal3MarketCap`, and `ΔusdtDominance` (the `absoluteDelta` values from Delta Contract, per Section 3.1). Window size of 60 (periods, not yet specified whether snapshot-count or time-based) and the 0.0001 minimum standard deviation floor (guards division by near-zero variance) are taken from the source design as given; neither has been independently justified or verified in this document.

### 4.4 Output — Liquidity Assessment

```
{ btcDominanceZ, total3Z, usdtDominanceZ }
```

Three Z-scores, consumed downstream by Regime Engine (TD-009) and LDS Engine (TD-010).

### 4.5 Explicitly Deferred to Downstream Engines

The following formulas appear in the source design but belong to other TDs per the verified TD-008 through TD-013 dependency chain, not to Triad Liquidity Framework itself:

- `LDS = z(-ΔBTC.D) + z(ΔTOTAL3) + z(ΔUSDT.D)` — belongs to TD-010 LDS Engine, not yet formalized in this document.
- `FlowCore = (-ΔBTC.D × 0.3) + (ΔTOTAL3 × 0.4) + (ΔUSDT.D × 0.3)`, Volume Amplifier, Liquidity Flow — belong to TD-011 Capital Flow Engine, not yet formalized in this document.
- Regime Engine's 5-state classification (RISK_OFF, RISK_ON, BTC_DOMINANT, ALT_ROTATION_EARLY, NEUTRAL) — belongs to TD-009, not yet formalized in this document.

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
| 1.2 | 2026-09-08 | Populated Triad Liquidity Framework section from a user-provided architecture design (screenshot), not yet implemented in code. Documented BTC.D/TOTAL3/USDT.D as the Triad, the Z-Score normalization formula (window=60, min stddev=0.0001), and the Liquidity Assessment output shape. Explicitly deferred LDS, FlowCore, and Regime Engine formulas found in the same source design to their owning TDs (TD-009, TD-010, TD-011) per the verified TD-008 through TD-013 dependency chain, rather than absorbing them into this section. |
