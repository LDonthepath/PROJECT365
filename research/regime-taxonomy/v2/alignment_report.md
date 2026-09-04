# Temporal alignment report

## Method

backward as-of join using 5m candle close timestamps <= Empiris ts_source, accepting only distance <= 300 seconds; no nearest/future/stale match. This is causal with respect to the supplied OHLCV file: for an Empiris observation at T, the selected close has timestamp <= T. `ts_captured` was not used. It has provider transport/collection delay and is not the asserted source-information time.

## Results

- Empiris observations: **7906**; aligned: **5937**; unmatched: **1969**; coverage: **75.09%**.
- Temporal distance is T minus selected candle-close time: maximum **299 s**, median **148 s**.

|n|mean|median|sd|min|p01|p05|p25|p75|p95|p99|max|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|5937|150.357|148|85.8592|0|3|17|77|224|285|297|299|

The OHLCV ends at 2026-08-16T17:15:00+00:00, while Empiris continues to 2026-08-30T09:50:52+00:00; the post-OHLCV observations are deliberately unmatched rather than forward-filled.
