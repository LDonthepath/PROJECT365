# Clustering analysis

K-means was run for K=2…8 on the 500 deterministic sampled complete standardized 1-hour feature vectors. Initialization uses 10 deterministic seeds; the lowest SSE run is profiled. This explores geometry, does not fit labels, thresholds, or select K=5.

|K|SSE|Silhouette|Mean ARI across seeds|Cluster sizes|
|---:|---:|---:|---|---|
|2|1694.42|0.358929|0.337741|128, 372|
|3|1247.58|0.348972|0.886562|322, 132, 46|
|4|1053.81|0.283132|0.543683|286, 76, 119, 19|
|5|907.829|0.281736|0.592523|90, 127, 12, 17, 254|
|6|792.65|0.271367|0.731352|17, 18, 203, 65, 120, 77|
|7|724.63|0.267455|0.665934|198, 2, 77, 12, 20, 74, 117|
|8|656.27|0.267873|0.545914|198, 15, 2, 22, 70, 81, 60, 52|

## K=5 hypothesis profile

|Cluster|Size|btc_return_1h|delta_btc_d_pp_1h|delta_eth_d_pp_1h|delta_total3_log_1h|delta_usdt_d_pp_1h|
|---:|---:|---:|---:|---:|---:|---:|
|0|90|0.0027372|0.0163189|0.0172356|0.00144687|-0.0192129|
|1|127|-0.00234223|-0.0193849|-0.011511|-0.00137094|0.0182672|
|2|12|-0.00842777|-0.0468925|-0.0439686|-0.00476424|0.0594134|
|3|17|0.00904281|0.0942734|0.0300899|0.00411238|-0.0626223|
|4|254|0.000173799|0.00116784|0.000553145|9.19144e-05|-0.00145382|

**Interpretation.** Compare silhouette and seed stability across K; no single score establishes economic states. K=5 is not privileged if it is not a clear, stable improvement. Clusters are magnitude/direction profiles, not proposed ontology labels.
