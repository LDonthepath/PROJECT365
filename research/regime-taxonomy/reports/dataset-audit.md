# Empiris Dataset Regime Taxonomy Audit

> Generated reproducibly by `node research/regime-taxonomy/scripts/audit-dataset.js` on 2026-09-04T17:42:59.342Z. This is a read-only audit: it does not alter the source CSV, production code, or create a regime classifier. Numeric findings describe this snapshot only; correlation and clusters are **not causal evidence or market-regime labels**.

## 1. Executive Summary

- **Dataset fitness: PARTIALLY_SUPPORTED.** The file is a sizeable, timestamped market-snapshot series, with the core dominance and TOTAL3 measures required for exploratory work. However, it contains **BTC market capitalisation, not BTC spot price**; therefore the requested ΔBTC (price) cannot be reconstructed and only a clearly labelled BTC-market-cap proxy is available.
- The observed cadence is 601 seconds median (603.264516 mean), with 1 intervals greater than twice the median. This makes per-row deltas interpretable only as **variable-horizon changes** unless resampled/normalised in a subsequent study.
- Leakage status is **UNVERIFIED**: a static CSV cannot establish how the provider filled, normalised, or derived fields. The script itself computes each delta exclusively from row *t* and *t−1*.
- No five-state classifier or final threshold is proposed. The present data can test directional footprints and unsupervised geometry, but it cannot by itself prove the proposed semantic states, especially ALT_ROTATION_EARLY as a persistent regime.

## 2. Dataset Inventory

- **Source:** `research/providers/market_snapshots_clean-2.csv` (SHA-256 `fcc077c762a04879fcc06cc0cf393dabdf82633dff52358f73206f3640246488`).
- **File size:** 1,666,687 bytes; **rows:** 7,906 data rows; **columns:** 12.
- **Timestamp selected for temporal analysis:** `ts_source`; available timestamp-like fields: `ts_source`, `ts_captured`.
- **Time range (ts_source):** 2026-07-06T05:10:46.000Z to 2026-08-30T09:50:52.000Z. Parsed offsets are explicit `+00:00`; timestamp timezone is UTC.

|Column|Inferred type|Role/read-only interpretation|
|---|---|---|
|`id`|number|identifier/context|
|`ts_source`|timestamp/string|temporal key|
|`ts_captured`|timestamp/string|identifier/context|
|`btc_dominance_pct`|number|primary analysis variable|
|`usdt_dominance_pct`|number|primary analysis variable|
|`eth_dominance_pct`|number|primary analysis variable|
|`total_market_cap_usd`|number|identifier/context|
|`total3_usd`|number|primary analysis variable|
|`btc_market_cap_usd`|number|primary analysis variable|
|`fetch_status`|string|collection status|
|`usdc_dominance_pct`|number|liquidity-related proxy|
|`stablecoin_dominance_pct`|number|liquidity-related proxy|

**Actual-variable caveat.** There is no column named BTC price (nor an unambiguous BTC spot-price field). `btc_market_cap_usd` is retained as a market-cap proxy, never relabelled as BTC price. Likewise, the available liquidity-related fields are dominance percentages; no direct liquidity depth/volume/flow measure is present.

## 3. Integrity Audit

- Timestamp ordering: **ascending/non-decreasing**. Duplicate timestamps: **0**. Exact duplicate rows: **0**.
- Interval distribution is calculated on adjacent `ts_source` observations in file order (seconds):

|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|2|18,021|603.264516|601|197.0085|600|600|600|601|601|601|602|

- **Abnormal temporal gaps:** 1, defined transparently as an adjacent interval > 2 × median (1,202 seconds); this is an audit flag, not a market/trading threshold. Minimum/maximum and tail values above expose irregular sampling. Missing timestamps cannot be enumerated without a contractual cadence; every interval larger than the median is a potential omitted observation, not proof of a missing timestamp.
- `ts_captured` is retained as a separately available timestamp but is not used to reorder source observations. Any source/capture latency audit requires comparing the two fields in a follow-up.

## 4. Missingness

|Variable|Missing rows|Missing %|Consecutive missing sequences|Longest sequence (rows)|Pattern assessment|
|---|---:|---:|---:|---:|---|
|`id`|0|0.00%|0|0|none observed|
|`btc_dominance_pct`|0|0.00%|0|0|none observed|
|`usdt_dominance_pct`|0|0.00%|0|0|none observed|
|`eth_dominance_pct`|0|0.00%|0|0|none observed|
|`total_market_cap_usd`|0|0.00%|0|0|none observed|
|`total3_usd`|0|0.00%|0|0|none observed|
|`btc_market_cap_usd`|0|0.00%|0|0|none observed|
|`usdc_dominance_pct`|563|7.12%|1|563|time-localised sequences; inspect results JSON|
|`stablecoin_dominance_pct`|563|7.12%|1|563|time-localised sequences; inspect results JSON|

Missingness is reported as observed, not imputed. Whether any non-empty missing pattern is random cannot be established from one series alone; its start/end times are preserved in `results/audit-summary.json`. `fetch_status` should be checked alongside these periods before attributing degradation to a provider.

## 5. Value Validation

For every numeric field, validation uses descriptive flags only: non-positive counts, exact adjacent flatlines, and robust extreme observations outside [Q1−3×IQR, Q3+3×IQR]. “Sudden jump” is an adjacent relative change whose absolute size exceeds that field’s empirical p99 absolute change; it is **not** declared invalid.

|Variable|≤0|≥100 (dominance only)|Robust extreme values|Adjacent flatlines|Sudden-jump flags|
|---|---:|---:|---:|---:|---:|
|`id`|0|—|0|0|80|
|`btc_dominance_pct`|0|0|1476|0|80|
|`usdt_dominance_pct`|0|0|1426|0|80|
|`eth_dominance_pct`|0|0|1516|0|80|
|`total_market_cap_usd`|0|—|1404|0|80|
|`total3_usd`|0|—|1|0|80|
|`btc_market_cap_usd`|0|—|1447|0|80|
|`usdc_dominance_pct`|0|—|1411|0|80|
|`stablecoin_dominance_pct`|0|—|1411|0|80|

Dominance fields are percentage units, so values ≤0 or ≥100 are contract-suspicious if present; this audit does not infer other impossible combinations absent an explicit provider contract. The three dominance measures are not assumed to sum to 100 because they exclude other assets. Liquidity-related proxies (`usdt_dominance_pct`, `usdc_dominance_pct`, `stablecoin_dominance_pct`) are audited above; no direct liquidity variable exists, so liquidity consistency beyond ranges is **UNVERIFIED**.

## 6. Delta Readiness

|Requested construct|Available raw field|Raw unit|Absolute delta unit|Relative delta|Readiness|
|---|---|---|---|---|---|
|ΔBTC|none (proxy: `btc_market_cap_usd`)|BTC price unavailable; proxy USD market cap|USD for proxy|% change for proxy|**NOT reconstructible as BTC price**|
|ΔBTC.D|`btc_dominance_pct`|percent|**percentage points**|relative % of dominance level|ready, variable-horizon|
|ΔETH.D|`eth_dominance_pct`|percent|**percentage points**|relative % of dominance level|ready, variable-horizon|
|ΔTOTAL3|`total3_usd`|USD|USD|% change|ready, variable-horizon|
|ΔUSDT.D|`usdt_dominance_pct`|percent|**percentage points**|relative % of dominance level|ready, variable-horizon|

All script-derived deltas use only valid row *t* and preceding row *t−1* in source-time order; first/missing pairs remain null. Absolute dominance deltas are explicitly percentage-point changes and must not be mixed with relative percentage changes. The interval distribution means identical row-to-row delta magnitudes do not represent identical elapsed horizons; resampling or time-normalisation is a required precondition for comparable transition/persistence work.

## 7. Leakage Audit

|Question|Finding|
|---|---|
|Audit-script delta direction|**Verified:** current minus prior observation only.|
|Forward fill / future imputation in source|**UNVERIFIED:** static values do not expose lineage.|
|Centred rolling calculation in source|**UNVERIFIED:** no formulas/lineage in CSV.|
|Normalisation/global statistics in source|**UNVERIFIED:** source construction unavailable.|
|Derived-field use of future information|**UNVERIFIED:** field provenance unavailable.|

The report’s quantiles, PCA standardisation, correlations, and clustering use the full sample **only for retrospective description**. They must not be carried into an online decision rule without rolling/expanding, past-only fitting.

## 8. Distribution Analysis

### Raw primary variables

#### `btc_market_cap_usd`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,906|1,231,720,240,244.41|1,628,364,195,577.12|1,335,913,767,947.17|1,290,245,533,145.19|108,209,978,316.68|1,243,498,020,395.21|1,257,528,148,686.65|1,275,493,756,475.37|1,290,245,533,145.19|1,310,433,639,172.24|1,578,928,374,548.03|1,605,487,265,960.55|

#### `total3_usd`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,906|631,873,829,199.02|825,458,278,681.24|770,605,289,395.62|767,963,235,534.44|12,455,436,199.5|743,946,159,992.81|756,991,279,981.22|762,030,473,586.41|767,963,235,534.44|778,363,387,611.62|794,823,972,053.44|804,260,152,223|

#### `btc_dominance_pct`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,906|55.391992|60.06458|56.899194|56.499098|1.087107|55.81663|56.010174|56.261469|56.499098|56.71101|59.247326|59.480083|

#### `eth_dominance_pct`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,906|9.334196|11.461083|10.14873|10.036026|0.541625|9.379713|9.432632|9.869491|10.036026|10.114518|11.236951|11.317774|

#### `usdt_dominance_pct`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,906|6.676851|8.756898|7.850456|8.037358|0.447367|6.742509|6.846122|7.931656|8.037358|8.09874|8.201112|8.280832|

### Delta variables (absolute; dominance is percentage points)

#### Δ`btc_market_cap_usd`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-44,624,878,982.89|29,586,284,042.36|37,673,188.026|-2,102,405.001|2,539,997,863.71|-6,841,170,442.47|-3,317,058,811.58|-847,458,867.696|-2,102,405.001|828,516,297.065|3,455,028,107.93|8,252,441,437.25|

#### Δ`total3_usd`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-143,788,335,067.75|134,967,788,171.59|-2,650,449.672|221,310.604|2,917,463,239.94|-3,051,732,350.66|-1,241,294,449.03|-286,423,024.592|221,310.604|270,204,835.916|1,262,426,859.21|3,592,440,586.36|

#### Δ`btc_dominance_pct`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-3.615924|3.821778|0.000471|-0.000362|0.071643|-0.053855|-0.027111|-0.008604|-0.000362|0.008452|0.028381|0.059027|

#### Δ`eth_dominance_pct`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-0.608462|0.633916|0.00023|-0.000053|0.015638|-0.026753|-0.012291|-0.003688|-0.000053|0.003674|0.012969|0.029617|

#### Δ`usdt_dominance_pct`
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-0.527289|0.562057|-0.000145|-0.00002|0.013665|-0.031501|-0.014413|-0.003838|-0.00002|0.003898|0.013512|0.027416|

### Delta variables (relative percent change; reported separately from percentage points)

#### Relative Δ`btc_market_cap_usd` (%)
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-2.838196|2.117444|0.002828|-0.000158|0.175938|-0.477097|-0.232387|-0.064663|-0.000158|0.062901|0.250239|0.559671|

#### Relative Δ`total3_usd` (%)
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-18.537495|21.359927|0.000463|0.000029|0.400927|-0.394894|-0.15823|-0.037222|0.000029|0.035142|0.162248|0.464416|

#### Relative Δ`btc_dominance_pct` (%)
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-6.036344|6.814774|0.000895|-0.000642|0.124145|-0.092649|-0.047466|-0.015125|-0.000642|0.014902|0.049901|0.101619|

#### Relative Δ`eth_dominance_pct` (%)
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-6.055369|6.733487|0.002348|-0.000519|0.153213|-0.257679|-0.119923|-0.036562|-0.000519|0.036303|0.128065|0.291879|

#### Relative Δ`usdt_dominance_pct` (%)
|n|min|max|mean|median|sd|p1|p5|p25|p50|p75|p95|p99|
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|7,905|-6.021415|6.858667|-0.001784|-0.000243|0.173359|-0.414472|-0.187771|-0.049303|-0.000243|0.049715|0.175722|0.355453|


Skew/heavy tails are assessed descriptively through mean-versus-median and p1/p99 versus interquartile range in these tables. Long flat periods and jump flags are in section 5. Volatility clustering and structural breaks require a formal time-series test and are **UNVERIFIED** here; variance is compared by thirds below, without equating a break to a market regime.

## 9. Temporal Stability

The sample is split into equal-count early/middle/late thirds (not asserted market regimes).

|Variable|Early mean / sd|Middle mean / sd|Late mean / sd|Early Δ sd|Middle Δ sd|Late Δ sd|
|---|---|---|---|---|---|
|`btc_market_cap_usd`|1,286,268,407,209.34 / 22,743,689,826.57|1,286,681,181,307.75 / 14,310,345,965.82|1,434,754,204,722.21 / 140,504,233,546.55|1,835,496,704.3|1,410,660,516.04|3,739,538,592.12|
|`total3_usd`|775,782,453,318.93 / 7,024,151,958.33|762,323,470,352.22 / 4,242,203,442.18|773,708,766,725.46 / 17,117,230,290.5|3,888,596,915.43|412,202,240.87|3,200,851,005.28|
|`btc_dominance_pct`|56.31771 / 0.289244|56.499463 / 0.155379|57.880036 / 1.406049|0.104247|0.015257|0.065571|
|`eth_dominance_pct`|9.708974 / 0.214372|10.024179 / 0.08358|10.712823 / 0.547641|0.019436|0.007669|0.017233|
|`usdt_dominance_pct`|8.06374 / 0.11082|8.056187 / 0.072116|7.431602 / 0.565299|0.017848|0.007365|0.013687|

Differences across thirds are evidence of temporal non-stationarity candidates, not proof of provider-methodology change or a taxonomy state. Sampling behaviour should also be compared by third before any classifier calibration.

## 10. Cross-Variable Relationships

|Pair|Raw Pearson|Raw Spearman|Absolute-delta Pearson|Absolute-delta Spearman|
|---|---:|---:|---:|---:|
|`btc_market_cap_usd` ↔ `btc_dominance_pct`|0.981667|0.909758|0.109805|0.593068|
|`btc_market_cap_usd` ↔ `total3_usd`|0.540697|0.464883|0.341656|0.795931|
|`btc_dominance_pct` ↔ `total3_usd`|0.386188|0.189757|-0.891205|0.138909|
|`total3_usd` ↔ `usdt_dominance_pct`|-0.555356|-0.477302|-0.830053|-0.718967|
|`btc_dominance_pct` ↔ `eth_dominance_pct`|0.929041|0.644594|0.706061|-0.092667|
|`eth_dominance_pct` ↔ `total3_usd`|0.242525|-0.111975|-0.630492|0.383172|

Correlation identifies linear/rank co-movement and possible redundancy only; it is not causation.

## 11. Exploratory Structure

Exploration standardises complete absolute-delta observations for `btc_market_cap_usd`, `total3_usd`, `btc_dominance_pct`, `eth_dominance_pct`, `usdt_dominance_pct` and applies deterministic k-means as a geometry probe, not a regime detector. It does **not** select K=5.

|K|Within-cluster SSE|Cluster sizes|
|---:|---:|---|
|2|34,625.754|6236, 1669|
|3|31,499.438|1092, 598, 6215|
|4|21,528.579|3, 1456, 493, 5953|
|5|19,893.361|3, 859, 116, 5326, 1601|
|6|12,003.214|3, 768, 5002, 2, 1958, 172|
|7|11,078.53|3, 2, 1717, 123, 1198, 219, 4643|
|8|10,548.61|3, 1267, 2084, 3747, 91, 2, 194, 517|

PCA/dimensionality reduction is **UNVERIFIED/not emitted** in this dependency-free audit to avoid presenting an unvalidated implementation; k-means SSE alone cannot establish the number or semantics of market states. A follow-up may use a pinned scientific environment and report explained variance, loadings, stability, and out-of-sample replication.

## 12. State-by-State Analysis

No state labels are reconstructed: doing so would require unapproved formal decision rules/thresholds and would prejudge the taxonomy. Therefore duration, transition, and return behaviour for named states are **UNVERIFIED**. Directional concepts can be investigated later with past-only, time-normalised deltas:

|Proposed state|Dataset footprint availability|Adversarial finding|Provisional verdict|
|---|---|---|---|
|RISK_OFF|Partial: TOTAL3, BTC-market-cap proxy, defensive dominance proxies|No direct liquidity measure; BTC price absent; separateness unproven.|MODIFY|
|BTC_DOMINANT|Partial: BTC.D + BTC-market-cap proxy + TOTAL3|BTC relative strength cannot be determined from market cap alone; bullish/defensive substructures untested.|SPLIT|
|ALT_ROTATION_EARLY|Partial: BTC.D, ETH.D, TOTAL3|No operational event rule; persistence and “between-state” ordering cannot be tested without labels.|RECLASSIFY_AS_TRANSITION|
|RISK_ON|Partial: TOTAL3, BTC.D, ETH.D, USDT.D|No direct participation/liquidity variable; cannot show it is more than BTC-led expansion.|MODIFY|
|NEUTRAL|Insufficient without a formal residual/balanced definition|Could become a garbage bucket; genuine balance is unproven.|MODIFY|

## 13. Conflict Matrix

|Pair|Potential overlap/ambiguity|Audit conclusion|
|---|---|---|
|RISK_ON ↔ ALT_ROTATION_EARLY|Both can contain TOTAL3 expansion; distinction needs breadth/rotation timing.|UNVERIFIED|
|BTC_DOMINANT ↔ RISK_OFF|BTC.D can strengthen in both relative resilience and broad deterioration.|Likely semantic overlap; test two substructures.|
|BTC_DOMINANT ↔ RISK_ON|BTC and TOTAL3 may rise together while BTC.D rises.|Not mutually exclusive without relative/breadth rule.|
|ALT_ROTATION_EARLY ↔ RISK_ON|Rotation can be an early portion of expansion rather than a durable state.|UNVERIFIED; transition hypothesis remains viable.|
|NEUTRAL ↔ every state|Residual label can absorb low-confidence/ambiguous periods.|High garbage-bucket risk without positive definition.|

## 14. Persistence Analysis

**UNVERIFIED.** State persistence, self-transition probability, flickering, and ALT_ROTATION_EARLY duration require an approved, causal label construction. Reporting them after inventing thresholds would violate the stated no-final-threshold/no-forcing constraint. The irregular cadence additionally requires duration in elapsed time, not just row count.

## 15. Exhaustiveness Analysis

The following directional combinations are observable in principle from available proxy deltas, but cannot be assigned honestly to named states without rules: BTC-market-cap proxy ↑ / TOTAL3 ↓; proxy ↓ / TOTAL3 ↑; proxy ↑ / BTC.D ↑ / TOTAL3 ↑; proxy ↓ / BTC.D ↓ / TOTAL3 ↑; defensive dominance ↑ while proxy ↑; and TOTAL3 expansion with non-BTC leadership. Their state assignment is **UNVERIFIED** pending an explicit, causal research protocol. Their directional-observation counts (not state counts) are: proxy ↑ / TOTAL3 ↓ = 795; proxy ↓ / TOTAL3 ↑ = 805; proxy ↑ / BTC.D ↑ / TOTAL3 ↑ = 2044; proxy ↓ / BTC.D ↓ / TOTAL3 ↑ = 784; USDT.D ↑ while proxy ↑ = 470; TOTAL3 ↑ with BTC.D ↓ = 1889. This is evidence that five labels are not yet demonstrably exhaustive.

## 16. Final Verdict

- **Taxonomy verdict: INSUFFICIENT_DATA.** The dominance/TOTAL3 subset is suitable for limited exploratory research, but BTC price, direct liquidity, and source lineage required to audit the full taxonomy are absent or unverified.
- The strongest adversarial conclusion is not that five states are false; it is that the present dataset cannot yet validate their boundaries, persistence, or exhaustiveness without substituting proxies and introducing unapproved rules.

## 17. Recommended Next Research Step

1. Obtain/version a dataset with BTC spot price and direct liquidity measures (e.g., depth, volume, flows), plus field lineage and sampling contract.
2. Define a preregistered, past-only candidate footprint protocol with elapsed-time normalisation—separate absolute percentage-point dominance moves from relative percent changes.
3. Test cluster/PCA stability in pinned tooling across time splits and multiple K values, then evaluate state persistence and conflicts without assuming K=5.
4. Only after those checks, decide state semantics and formal decision rules; do not calibrate trading thresholds from this audit.
