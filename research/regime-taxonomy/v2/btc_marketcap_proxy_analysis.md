# BTC market-cap proxy analysis

This directly compares fixed-horizon log BTC **price** returns from OHLCV with fixed-horizon log `btc_market_cap_usd` changes in Empiris. Equal values would require supply/definition effects to be immaterial; that is tested rather than assumed.

|Horizon|Paired N|Pearson|Spearman (rank)|OLS slope (mcap on price)|R²|Sign agreement|Disagreement|Residual SD|
|---|---:|---:|---:|---:|---:|---:|---:|---:|
|5m|5936|0.202273|0.150003|0.270767|0.0409144|55.09%|44.91%|0.00120614|
|10m|5936|0.604635|0.553262|0.586896|0.365583|69.52%|30.48%|0.000980975|
|15m|5936|0.635971|0.578507|0.715669|0.404459|70.89%|29.11%|0.00135833|
|30m|5936|0.858347|0.832595|0.849339|0.73676|82.85%|17.15%|0.00110392|
|1h|5936|0.931089|0.909096|0.929063|0.866927|87.60%|12.40%|0.00111833|
|4h|5936|0.981052|0.975457|0.990109|0.962463|94.15%|5.85%|0.00117515|

**Answer to Q1.** Market-cap change retains the common movement component measured by the reported correlation and R², but loses price-specific information through supply/market-cap methodology and its residual. Sign disagreement is direct directional information loss. It is therefore a **proxy only**, not an acceptable replacement for BTC price return when actual OHLCV price is available.
