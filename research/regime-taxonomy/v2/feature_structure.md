# Feature structure

Features are fixed 1-hour, causal changes. Dominance changes are percentage points; price and TOTAL3 are log changes. USDC and stablecoin-total are excluded from the complete-case core because of missing observations (missingness inventory documents this limitation). “Liquidity” is not measured: stablecoin dominance is a defensive/capital-allocation proxy, not depth or tradable liquidity.

## Pearson / Spearman correlation

|Pair|Pearson|Spearman|
|---|---:|---:|
|`btc_return_1h` / `delta_btc_d_pp_1h`|0.329571|0.636751|
|`btc_return_1h` / `delta_eth_d_pp_1h`|0.397565|0.426639|
|`btc_return_1h` / `delta_total3_log_1h`|0.330151|0.750881|
|`btc_return_1h` / `delta_usdt_d_pp_1h`|-0.816287|-0.879842|
|`delta_btc_d_pp_1h` / `delta_eth_d_pp_1h`|0.39862|-0.0687973|
|`delta_btc_d_pp_1h` / `delta_total3_log_1h`|-0.807709|0.104308|
|`delta_btc_d_pp_1h` / `delta_usdt_d_pp_1h`|0.277922|-0.422159|
|`delta_eth_d_pp_1h` / `delta_total3_log_1h`|-0.309589|0.40649|
|`delta_eth_d_pp_1h` / `delta_usdt_d_pp_1h`|-0.135493|-0.434232|
|`delta_total3_log_1h` / `delta_usdt_d_pp_1h`|-0.752142|-0.858277|

## Exploratory PCA

Complete observations: **5936**; deterministic clustering/PCA sample: **500** (capped at 500 for O(n²) silhouette computation). PCA uses full-sample standardized features and is retrospective/exploratory only (not live-deployable without past-only refitting).

|PC|Explained variance|Cumulative|Loadings (btc_return_1h, delta_btc_d_pp_1h, delta_eth_d_pp_1h, delta_total3_log_1h, delta_usdt_d_pp_1h)|
|---|---:|---:|---|
|PC1|72.76%|72.76%|0.499; 0.348; 0.367; 0.477; -0.518|
|PC2|19.92%|92.68%|-0.155; -0.719; 0.635; 0.233; 0.032|
|PC3|5.11%|97.79%|-0.028; 0.372; 0.651; -0.657; 0.078|
|PC4|2.00%|99.78%|0.845; -0.274; -0.053; -0.194; 0.413|
|PC5|0.22%|100.00%|-0.113; 0.386; 0.189; 0.498; 0.745|

Interpret loadings by magnitude/sign, not as causal factors. High correlation can reflect genuine common risk appetite, related allocation dynamics, or mathematical coupling; in particular dominance measures share a market-cap denominator.
