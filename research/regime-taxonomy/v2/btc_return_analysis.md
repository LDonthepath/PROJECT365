# Genuine BTC price return analysis

BTC price is the OHLCV `close`, not `btc_market_cap_usd`. For snapshot T and horizon H: `ln(C(T) / C(T-H))`, where each C is the latest *candle close timestamp <= endpoint*. No future candle or centred window is used. The 5m file supports all listed horizons; results after OHLCV coverage ends are missing.

|Horizon|N|Coverage|Mean|Median|SD|p05|p95|Positive/negative/zero|Lag-1 autocorr|
|---|---:|---:|---:|---:|---:|---:|---|---:|
|5m|5937|75.09%|6.55101e-06|-1.53306e-07|0.000919979|-0.00135078|0.00142629|2914/2970/53|0.0167782|
|10m|5937|75.09%|5.26538e-08|-4.32191e-06|0.00126872|-0.00187952|0.00195571|2919/2996/22|-0.00610819|
|15m|5937|75.09%|8.13661e-06|-7.79622e-06|0.00156405|-0.00232461|0.00235049|2931/2995/11|0.335943|
|30m|5937|75.09%|1.63425e-06|-1.38525e-05|0.00217435|-0.00329825|0.00332967|2938/2994/5|0.657032|
|1h|5937|75.09%|3.62328e-06|4.3236e-05|0.00307223|-0.00466976|0.00467219|3032/2903/2|0.830872|
|4h|5937|75.09%|5.91495e-06|0.000120711|0.00601068|-0.00984596|0.00898017|3047/2887/3|0.955498|

Full quantiles are in `btc_return_analysis.json`. Returns are overlapping across irregular snapshots; the lag-1 autocorrelation is descriptive, not an independence claim.
