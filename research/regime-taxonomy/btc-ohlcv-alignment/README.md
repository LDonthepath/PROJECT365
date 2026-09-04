# BTC OHLCV Alignment Audit

This is a reproducible, read-only compatibility audit for BTC OHLCV CSV files found under `research/providers/` and the unchanged Empiris snapshot dataset. It discovers candidates from actual columns rather than trusting filenames.

Run from the repository root:

```bash
node research/regime-taxonomy/btc-ohlcv-alignment/scripts/audit-btc-ohlcv.js
```

The script reads inputs only and overwrites only this workspace's report and JSON summary. It requires Node.js and no third-party package. A candidate needs timestamp/open/high/low/close columns; it validates raw OHLCV inequalities but never repairs records.

When OHLCV is present, the report records its timestamp convention only when it can be established from the data. It does not use nearest candles by default: close-derived information is causal only when its close time is no later than the Empiris observation. Full-sample statistics are research-only/retrospective and cannot be treated as online-valid decision rules.

If no candidate is discovered, the script intentionally produces a negative-input verdict instead of substituting `btc_market_cap_usd` for BTC price. Add documented BTC OHLCV data (source, symbol, timezone, and open/close timestamp convention) and rerun before attempting fixed-horizon returns or taxonomy structure analysis.
