# Empiris Regime Taxonomy Research

## Purpose

This directory contains a reproducible, **read-only** audit of whether the supplied Empiris snapshot dataset is fit to test the proposed five-state regime taxonomy. It deliberately challenges the taxonomy; it does not implement a Regime Engine, choose final thresholds, evaluate PnL, or modify production code.

## Dataset

The audit reads exactly `research/providers/market_snapshots_clean-2.csv`. The source dataset is never written, transformed in place, or copied into a production directory. The generated report records its SHA-256 digest, so a reviewer can confirm which exact input was audited.

## Methodology

`audit-dataset.js` inventories actual columns and inferred types, parses the source timestamp, then calculates integrity, missingness, value-range, interval, raw/distribution, delta, temporal-third, correlation, and deterministic exploratory k-means summaries. Deltas are current minus previous source observation only. Absolute dominance deltas are reported in **percentage points**, while relative deltas are separately percent changes.

The script treats `btc_market_cap_usd` only as a proxy: the file does not provide BTC spot price. Stablecoin dominance is recorded as a liquidity-related proxy, not as direct liquidity. Any conclusion requiring field lineage, provider transformations, or causal source construction is labelled **UNVERIFIED**.

## Limitations

- A static CSV cannot prove the absence of source-level look-ahead, future filling, centred rolling windows, or global normalisation.
- Variable sampling cadence means row-to-row deltas have variable elapsed horizons.
- K-means SSE is an exploratory geometry diagnostic, not a market-regime classifier or evidence that any K (including five) is correct.
- Named-state persistence and transition metrics are intentionally not invented without causal, preregistered state rules.

## Re-run

Requirements: Node.js (no third-party packages).

```bash
node research/regime-taxonomy/scripts/audit-dataset.js
```

The command overwrites only these reproducible research artefacts:

- `research/regime-taxonomy/reports/dataset-audit.md`
- `research/regime-taxonomy/results/audit-summary.json`

Review the report before using any finding for a later state-semantics or formal-rule study.
