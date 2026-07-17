# PROJECT365

# Derived Metrics Catalog

Version: 1.0

Status: Draft

---

Purpose

Defines all business metrics derived from Canonical Variables.

This document defines WHAT is measured.

It does NOT define HOW the metric is calculated.

---

| Metric ID | Metric Name | Business Domain | Description | Input Canonical Variables | Output Type | Status | Notes |
|---|---|---|---|---|---|---|---|
| DM-001 | BTC_MVRV_RATIO | Bitcoin | Measures Bitcoin market value relative to realized value. | BTC_MVRV | Ratio | Draft | |
| DM-002 | BTC_MVRV_ZSCORE | Bitcoin | Measures the standardized MVRV value for Bitcoin. | BTC_MVRV_ZSCORE | Score | Draft | |
| DM-003 | BTC_SOPR_RATIO | Bitcoin | Measures Bitcoin spent output profit ratio. | BTC_SOPR | Ratio | Draft | |
| DM-004 | BTC_NUPL_RATIO | Bitcoin | Measures Bitcoin net unrealized profit or loss. | BTC_NUPL | Ratio | Draft | |
| DM-005 | BTC_COIN_DAYS_DESTROYED | Bitcoin | Measures Bitcoin coin days destroyed. | BTC_COIN_DAYS_DESTROYED | Count | Draft | |
| DM-006 | BTC_HODL_WAVES_DISTRIBUTION | Bitcoin | Measures the distribution of Bitcoin UTXO age bands. | BTC_HODL_WAVES | Index | Draft | |
| DM-007 | BTC_PUELL_MULTIPLE | Bitcoin | Measures the Bitcoin Puell Multiple valuation metric. | BTC_PUELL_MULTIPLE | Ratio | Draft | |
| DM-008 | BTC_RESERVE_VALUATION | Bitcoin | Measures the Bitcoin reserve valuation metric. | BTC_RESERVE_RISK | Ratio | Draft |  |
| DM-009 | BTC_EXCHANGE_INFLOW | On-Chain | Measures Bitcoin inflow to exchanges. | BTC_EXCHANGE_INFLOW | Count | Draft | |
| DM-010 | BTC_EXCHANGE_OUTFLOW | On-Chain | Measures Bitcoin outflow from exchanges. | BTC_EXCHANGE_OUTFLOW | Count | Draft | |
| DM-011 | BTC_EXCHANGE_NETFLOW | On-Chain | Measures Bitcoin netflow for exchanges. | BTC_EXCHANGE_NETFLOW | Count | Draft | |
| DM-012 | BTC_EXCHANGE_RESERVE | On-Chain | Measures Bitcoin reserves held on exchanges. | BTC_EXCHANGE_RESERVE | Count | Draft | |
| DM-013 | BTC_EXCHANGE_FLOW_BALANCE | On-Chain | Measures Bitcoin exchange flow balance using inflow and outflow variables. | BTC_EXCHANGE_INFLOW; BTC_EXCHANGE_OUTFLOW | Ratio | Draft | |
| DM-014 | BTC_EXCHANGE_RESERVE_RATIO | On-Chain | Measures Bitcoin exchange reserve in relation to exchange flow variables. | BTC_EXCHANGE_INFLOW; BTC_EXCHANGE_OUTFLOW; BTC_EXCHANGE_RESERVE | Ratio | Draft | |
| DM-015 | MACRO_M2_SUPPLY | Macro | Measures broad M2 money supply. | M2_SUPPLY | USD | Draft | |
| DM-016 | MACRO_DXY_INDEX | Macro | Measures the US Dollar Index. | DXY | Index | Draft | |
| DM-017 | MACRO_VIX_INDEX | Macro | Measures the CBOE Volatility Index. | VIX | Index | Draft | |
| DM-018 | MACRO_US_2Y_YIELD | Macro | Measures the United States Treasury 2-year yield. | US_2Y_TREASURY_YIELD | Percentage | Draft | |
| DM-019 | MACRO_US_10Y_YIELD | Macro | Measures the United States Treasury 10-year yield. | US_10Y_TREASURY_YIELD | Percentage | Draft | |
| DM-020 | MACRO_YIELD_CURVE_SPREAD | Macro | Measures the relationship between short-term and long-term United States Treasury yields. | US_2Y_TREASURY_YIELD; US_10Y_TREASURY_YIELD | Percentage | Draft | |
| DM-021 | STABLECOIN_TOTAL_SUPPLY | Stablecoin | Measures total circulating stablecoin supply. | TOTAL_STABLECOIN_SUPPLY | USD | Draft | |
| DM-022 | STABLECOIN_SUPPLY_SHARE | Stablecoin | Measures stablecoin supply in relation to broad M2 money supply. | TOTAL_STABLECOIN_SUPPLY; M2_SUPPLY | Percentage | Draft | |
| DM-023 | NETWORK_ACTIVE_ADDRESSES | On-Chain | Measures the number of active network addresses. | ACTIVE_ADDRESSES | Count | Draft | |
| DM-024 | NETWORK_SUPPLY | On-Chain | Measures circulating network asset supply. | NETWORK_SUPPLY | Count | Draft | |
| DM-025 | NETWORK_TRANSACTION_COUNT | On-Chain | Measures the number of network transactions. | TRANSACTION_COUNT | Count | Draft | |
| DM-026 | NETWORK_ACTIVITY_RATIO | On-Chain | Measures active addresses in relation to network supply. | ACTIVE_ADDRESSES; NETWORK_SUPPLY | Ratio | Draft | |
| DM-027 | NETWORK_TRANSACTION_RATIO | On-Chain | Measures transaction count in relation to network supply. | TRANSACTION_COUNT; NETWORK_SUPPLY | Ratio | Draft | |
| DM-028 | LTH_STH_SOPR_RATIO | Bitcoin | Measures SOPR for long-term holder and short-term holder cohorts. | LTH_STH_SOPR | Ratio | Draft | |
| DM-029 | ETH_ACTIVE_VALIDATORS | Ethereum | Measures the number of active Ethereum validators. | ETH_ACTIVE_VALIDATORS | Count | Draft | |
| DM-030 | ETH_TOTAL_SUPPLY | Ethereum | Measures total ETH supply. | ETH_TOTAL_SUPPLY | Count | Draft | |
| DM-031 | ETH_STAKING_RATIO | Staking | Measures Ethereum validator participation in relation to total ETH supply. | ETH_ACTIVE_VALIDATORS; ETH_TOTAL_SUPPLY | Percentage | Draft | |
| DM-032 | ETH_VALIDATOR_COUNT | Staking | Measures Ethereum validator records. | ETH_VALIDATOR_DATA | Count | Draft | |
| DM-033 | ETH_VALIDATOR_DEPOSITS | Staking | Measures Ethereum validator deposit records. | ETH_VALIDATOR_DEPOSIT | Count | Draft | |
| DM-034 | ETH_VALIDATOR_SLASHING_EVENTS | Staking | Measures Ethereum validator slashing records. | ETH_VALIDATOR_SLASHING | Count | Draft | |
| DM-035 | ETH_VALIDATOR_ATTESTATIONS | Staking | Measures Ethereum validator attestation records. | ETH_VALIDATOR_ATTESTATION | Count | Draft | |
| DM-036 | DERIVATIVES_OPEN_INTEREST | Derivatives | Measures open futures positions for an asset. | OPEN_INTEREST | USD | Draft | |
| DM-037 | DERIVATIVES_FUNDING_RATE | Derivatives | Measures futures funding rate for an asset. | FUNDING_RATE | Percentage | Draft | |
| DM-038 | DERIVATIVES_OPEN_INTEREST_RATE | Derivatives | Measures open interest alongside funding rate. | OPEN_INTEREST; FUNDING_RATE | Ratio | Draft | |
| DM-039 | WHALE_ENTITY_COVERAGE | Institutional | Measures labeled wallet or address entities. | WHALE_ENTITY_LABEL | Count | Draft | |
| DM-040 | WHALE_TRANSACTION_ACTIVITY | Institutional | Measures transaction history for labeled wallet or address entities. | WHALE_TRANSACTION_HISTORY | Count | Draft | |
| DM-041 | WHALE_WALLET_PORTFOLIO | Institutional | Measures portfolio data for tracked wallets. | WHALE_WALLET_PORTFOLIO | USD | Draft | |
| DM-042 | WHALE_WALLET_ACTIVITY | Institutional | Measures activity data for tracked wallets. | WHALE_WALLET_ACTIVITY | Count | Draft | |
| DM-043 | ASSET_PRICE | Market Structure | Measures asset price. | ASSET_PRICE | USD | Draft | |
| DM-044 | ASSET_MARKET_CAP | Market Structure | Measures asset market capitalization. | ASSET_MARKET_CAP | USD | Draft | |
| DM-045 | ASSET_TRADING_VOLUME | Liquidity | Measures asset trading volume. | ASSET_TRADING_VOLUME | USD | Draft | |
| DM-046 | MARKET_VOLUME_TO_SIZE_RATIO | Liquidity | Measures trading volume in relation to asset market capitalization. | ASSET_TRADING_VOLUME; ASSET_MARKET_CAP | Ratio | Draft | |
| DM-047 | DEX_VOLUME | DeFi | Measures decentralized exchange trading volume. | DEX_VOLUME | USD | Draft | |
| DM-048 | DEX_VOLUME_SHARE | DeFi | Measures decentralized exchange trading volume in relation to broader asset trading volume. | DEX_VOLUME; ASSET_TRADING_VOLUME | Percentage | Draft | |
| DM-049 | TOKEN_TRANSFER_ACTIVITY | On-Chain | Measures token transfer activity. | TOKEN_TRANSFER | Count | Draft | |
| DM-050 | TOKEN_TRANSFER_SHARE | On-Chain | Measures token transfer activity in relation to network transaction count. | TOKEN_TRANSFER; TRANSACTION_COUNT | Percentage | Draft | |
