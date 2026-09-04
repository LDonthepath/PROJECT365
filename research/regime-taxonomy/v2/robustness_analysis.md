# Robustness analysis

- **BTC timeframe:** alignment and returns use 5m candles because it is the only supplied timeframe supporting all requested 5m–4h fixed horizons. Coarser files can be used only for horizons at or above their cadence; the primary conclusions do not depend on choosing a conveniently coarse return.
- **Horizon:** `btc_return_analysis.md` reports 5m, 10m, 15m, 30m, 1h and 4h rather than selecting one optimized horizon.
- **Missing stablecoins:** core PCA/clustering excludes USDC/stablecoin-total because observations are missing; defensive results are based on consistently available USDT dominance. This is a limitation, not imputation.
- **Outliers:** no observations were removed from primary results. Thus claims are not created by an unreported outlier filter.
- **Early vs late:** limited overlap and irregular snapshots restrict stable temporal-split inference; a future audit should refit only on early data and evaluate later data.

Conclusion: qualitative overlap findings are robust to not forcing a stablecoin-total feature or a five-cluster target, while claims of an enduring five-state ontology are not robustly established from this dataset alone.
