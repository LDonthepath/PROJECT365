# Regime taxonomy v2 empirical audit

## Reproduce

From repository root, with Python 3 standard library:

```bash
python3 research/regime-taxonomy/v2/scripts/run_audit.py
```

The script is deterministic, read-only against `research/providers/`, and overwrites only artifacts in this directory. It does not modify production code or source datasets.

## Exact inputs and SHA-256

- `research/providers/market_snapshots_clean-2.csv`: `fcc077c762a04879fcc06cc0cf393dabdf82633dff52358f73206f3640246488`
- `research/providers/5m.csv`: `18d3002338a981d1237113f8f10c5b0fcbb3b599f8852f3a4be649e51dc1d95f`
- `research/providers/15m.csv`: `3cec45422133806d32c1c470215f005a7d47fd64f4b9af712357510ca55cbf2d`
- `research/providers/1h.csv`: `7541b48b34e14adff7d94bbd0616c859bbf1b70396daf2641c743d70977ab812`
- `research/providers/4h.csv`: `df2cf5f0e87718edc6871148cf0f72f93f724574acb2bfb70e199b628c5f5503`
- `research/providers/1d.csv`: `6fd01c1782109bc78181964c1a3d5cbb5d59ce4f13231993e430c0f8cace0fca`

## Method

It inventories every source dataset; causally aligns Empiris `ts_source` to 5m BTC candle closes with a backward as-of join; constructs fixed-horizon log BTC price returns; compares those returns to BTC market-cap changes; calculates correlations and exploratory full-sample PCA; and runs deterministic multi-K K-means. K=5 is a hypothesis, not a target. No production threshold or classifier is implemented.

## Artifacts

`dataset_inventory.(md,json)`, `alignment_report.(md,json)`, `btc_return_analysis.(md,json)`, `btc_marketcap_proxy_analysis.md`, `feature_structure.md`, `clustering_analysis.md`, `ontology_test.md`, `regime_transition_analysis.md`, `leakage_audit.md`, `robustness_analysis.md`, and `final_verdict.md`.

## Analysis date and assumptions

Analysis date: 2026-09-04 (analysis date supplied by execution environment). Timestamps with `+00:00` are UTC. OHLCV `datetime` is conservatively treated as candle close/end time. Source/exchange metadata and upstream field provenance are not available in the CSV files; these are explicit limitations.
