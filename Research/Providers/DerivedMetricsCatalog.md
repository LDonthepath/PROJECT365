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
| DM-001 | BTC_EXCHANGE_FLOW_BALANCE | On-Chain | Measures the net directional movement of Bitcoin between wallets and exchanges. | BTC_EXCHANGE_INFLOW; BTC_EXCHANGE_OUTFLOW | Ratio | Draft | Supported by exchange flow canonical variables. |
| DM-002 | BTC_EXCHANGE_RESERVE_PRESSURE | On-Chain | Measures whether Bitcoin exchange reserves are expanding or contracting relative to exchange flow activity. | BTC_EXCHANGE_INFLOW; BTC_EXCHANGE_OUTFLOW; BTC_EXCHANGE_RESERVE | Ratio | Draft | Business metric only; no reserve interpretation threshold is defined here. |
| DM-003 | MACRO_YIELD_CURVE_SPREAD | Macro | Measures the relationship between short-term and long-term United States Treasury yields. | US_2Y_TREASURY_YIELD; US_10Y_TREASURY_YIELD | Percentage | Draft | |
| DM-004 | STABLECOIN_MACRO_LIQUIDITY_SHARE | Stablecoin | Measures stablecoin supply in relation to broad macro liquidity. | TOTAL_STABLECOIN_SUPPLY; M2_SUPPLY | Percentage | Draft | |
| DM-005 | MARKET_VOLUME_TO_SIZE_RATIO | Liquidity | Measures trading activity relative to asset market size. | ASSET_TRADING_VOLUME; ASSET_MARKET_CAP | Ratio | Draft | |
| DM-006 | NETWORK_ACTIVITY_DENSITY | On-Chain | Measures network user activity relative to network supply. | ACTIVE_ADDRESSES; NETWORK_SUPPLY | Ratio | Draft | |
| DM-007 | NETWORK_TRANSACTION_DENSITY | On-Chain | Measures transaction activity relative to network supply. | TRANSACTION_COUNT; NETWORK_SUPPLY | Ratio | Draft | |
| DM-008 | ETH_STAKING_PARTICIPATION_RATIO | Staking | Measures Ethereum validator participation relative to total ETH supply context. | ETH_ACTIVE_VALIDATORS; ETH_TOTAL_SUPPLY | Percentage | Draft | Canonical dictionary notes these variables are used together for Staking Ratio. |
| DM-009 | DERIVATIVES_POSITIONING_CONTEXT | Derivatives | Measures futures market positioning context using open interest and funding rate. | OPEN_INTEREST; FUNDING_RATE | Index | Draft | Business metric only; no directional signal or threshold is defined here. |
| DM-010 | DEFI_DEX_ACTIVITY_CONTEXT | DeFi | Measures decentralized exchange trading activity in relation to broader asset trading activity. | DEX_VOLUME; ASSET_TRADING_VOLUME | Ratio | Draft | |
| DM-011 | TOKEN_TRANSFER_ACTIVITY_CONTEXT | On-Chain | Measures token transfer activity in relation to broader network transaction activity. | TOKEN_TRANSFER; TRANSACTION_COUNT | Ratio | Draft | |
