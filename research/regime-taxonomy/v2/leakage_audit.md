# Leakage audit

|Mechanism|Status|Explanation|
|---|---|---|
|Future BTC candle|SAFE|Backward as-of join selects candle close timestamp <= `ts_source`.|
|Candle-close look-ahead|SAFE|`datetime` is conservatively interpreted as close/end; no candle is usable before it ends.|
|Future Empiris observation|SAFE|Fixed-horizon feature uses latest `ts_source` <= T-H.|
|Centred rolling windows|SAFE|None used.|
|`ts_captured` as alignment key|SAFE|Not used; `ts_source` is used.|
|Future normalization / full-sample PCA|UNSAFE for live use|PCA and standardization are full-sample exploratory descriptions only.|
|Full-sample clustering as live labels|UNSAFE for live use|Clustering is retrospective; never presented as a live rule.|
|Full-sample threshold fitting|SAFE|No thresholds/labels are fitted.|
|Source-provider future filling / derived provenance|UNKNOWN|CSV alone cannot establish upstream methodology.|
|Timestamp semantic correctness|UNKNOWN|Close/end convention is a conservative research assumption; provider metadata is absent.|

No UNSAFE item is used to make a live decision rule. The source-lineage UNKNOWN items limit causal claims but do not create a known look-ahead in this harness.
