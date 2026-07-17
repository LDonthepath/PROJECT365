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
| DM-001 | BTC Exchange Flow Balance | Bitcoin | Measures Bitcoin movement into and out of exchanges. | BTC_EXCHANGE_INFLOW; BTC_EXCHANGE_OUTFLOW; BTC_EXCHANGE_NETFLOW | Amount | Draft | Supported by Bitcoin exchange flow canonical variables. |
| DM-002 | BTC Exchange Reserve | Bitcoin | Measures the amount of Bitcoin held in exchange wallets. | BTC_EXCHANGE_RESERVE | Amount | Draft | Supported by Bitcoin exchange reserve canonical variable. |
| DM-003 | BTC Exchange Reserve Ratio | Bitcoin | Measures Bitcoin exchange reserves in relation to Bitcoin exchange flow activity. | BTC_EXCHANGE_INFLOW; BTC_EXCHANGE_OUTFLOW; BTC_EXCHANGE_RESERVE | Ratio | Draft | Supported by Bitcoin exchange reserve and flow canonical variables. |
| DM-004 | BTC Market Value to Realized Value | Bitcoin | Measures Bitcoin market value in relation to realized value. | BTC_MVRV | Ratio | Draft | Supported by Bitcoin valuation canonical variable. |
| DM-005 | BTC Market Value to Realized Value Z-Score | Bitcoin | Measures the standardized form of Bitcoin market value to realized value. | BTC_MVRV_ZSCORE | Index | Draft | Supported by Bitcoin valuation canonical variable. |
| DM-006 | BTC Spent Output Profit Ratio | Bitcoin | Measures realized value relationships for spent Bitcoin outputs. | BTC_SOPR | Ratio | Draft | Supported by Bitcoin valuation canonical variable. |
| DM-007 | BTC Long-Term and Short-Term Holder Spent Output Profit Ratio | Bitcoin | Measures spent output profit ratio data segmented by long-term and short-term holder classification. | LTH_STH_SOPR | Ratio | Draft | Supported by holder-segment SOPR canonical variable. |
| DM-008 | BTC Net Unrealized Profit Loss | Bitcoin | Measures Bitcoin unrealized profit and loss relative to market value. | BTC_NUPL | Ratio | Draft | Supported by Bitcoin valuation canonical variable. |
| DM-009 | BTC Coin Days Destroyed | Bitcoin | Measures Bitcoin coin age consumed by transaction activity. | BTC_COIN_DAYS_DESTROYED | Amount | Draft | Supported by Bitcoin market structure canonical variable. |
| DM-010 | BTC UTXO Age Distribution | Bitcoin | Measures the distribution of Bitcoin unspent transaction outputs by age cohort. | BTC_HODL_WAVES | Distribution | Draft | Supported by Bitcoin UTXO age distribution canonical variable. |
| DM-011 | BTC Miner Revenue Multiple | Mining | Measures Bitcoin miner revenue in relation to its historical revenue baseline. | BTC_PUELL_MULTIPLE | Ratio | Draft | Supported by Bitcoin valuation canonical variable. |
| DM-012 | BTC Holder Reserve Ratio | Bitcoin | Measures Bitcoin holder reserve value in relation to market value. | BTC_RESERVE_RISK | Ratio | Draft | Supported by Bitcoin valuation canonical variable. |
| DM-013 | Treasury Yield Curve Spread | Macro | Measures the relationship between short-term and long-term United States Treasury yields. | US_2Y_TREASURY_YIELD; US_10Y_TREASURY_YIELD | Percentage | Draft | Supported by United States Treasury yield canonical variables. |
| DM-014 | Macro Liquidity Supply | Macro | Measures broad money supply. | M2_SUPPLY | Amount | Draft | Supported by macro liquidity canonical variable. |
| DM-015 | Dollar Index | Macro | Measures the United States dollar index level. | DXY | Index | Draft | Supported by macro liquidity canonical variable. |
| DM-016 | Equity Volatility Index | Macro | Measures the CBOE volatility index level. | VIX | Index | Draft | Supported by macro volatility canonical variable. |
| DM-017 | Stablecoin Supply | Stablecoin | Measures the circulating supply of stablecoins. | TOTAL_STABLECOIN_SUPPLY | Amount | Draft | Supported by stablecoin supply canonical variable. |
| DM-018 | Stablecoin Supply Share | Stablecoin | Measures stablecoin supply in relation to broad money supply. | TOTAL_STABLECOIN_SUPPLY; M2_SUPPLY | Percentage | Draft | Supported by stablecoin supply and macro liquidity canonical variables. |
| DM-019 | Asset Price | Market Structure | Measures the price of an asset. | ASSET_PRICE | Amount | Draft | Supported by asset price canonical variable. |
| DM-020 | Asset Market Capitalization | Market Structure | Measures the market capitalization of an asset. | ASSET_MARKET_CAP | Amount | Draft | Supported by asset market capitalization canonical variable. |
| DM-021 | Asset Trading Volume | Liquidity | Measures traded volume for an asset. | ASSET_TRADING_VOLUME | Amount | Draft | Supported by asset trading volume canonical variable. |
| DM-022 | Volume to Market Capitalization Ratio | Liquidity | Measures trading volume in relation to asset market capitalization. | ASSET_TRADING_VOLUME; ASSET_MARKET_CAP | Ratio | Draft | Supported by market structure and liquidity canonical variables. |
| DM-023 | Price to Market Capitalization Ratio | Market Structure | Measures asset price in relation to asset market capitalization. | ASSET_PRICE; ASSET_MARKET_CAP | Ratio | Draft | Supported by asset price and market capitalization canonical variables. |
| DM-024 | Network Active Addresses | On-Chain | Measures the number of active addresses on a network. | ACTIVE_ADDRESSES | Count | Draft | Supported by network activity canonical variable. |
| DM-025 | Network Transaction Count | On-Chain | Measures the number of transactions on a network. | TRANSACTION_COUNT | Count | Draft | Supported by network activity canonical variable. |
| DM-026 | Network Supply | On-Chain | Measures circulating supply on a network. | NETWORK_SUPPLY | Amount | Draft | Supported by network supply canonical variable. |
| DM-027 | Network Activity Ratio | On-Chain | Measures active addresses in relation to network supply. | ACTIVE_ADDRESSES; NETWORK_SUPPLY | Ratio | Draft | Supported by network activity and network supply canonical variables. |
| DM-028 | Network Transaction Ratio | On-Chain | Measures transaction count in relation to network supply. | TRANSACTION_COUNT; NETWORK_SUPPLY | Ratio | Draft | Supported by network activity and network supply canonical variables. |
| DM-029 | Transaction per Active Address Ratio | On-Chain | Measures transaction count in relation to active addresses. | TRANSACTION_COUNT; ACTIVE_ADDRESSES | Ratio | Draft | Supported by network activity canonical variables. |
| DM-030 | Token Transfer Count | On-Chain | Measures token transfer activity on-chain. | TOKEN_TRANSFER | Count | Draft | Supported by token transfer canonical variable. |
| DM-031 | Token Transfer Share | On-Chain | Measures token transfers in relation to network transaction count. | TOKEN_TRANSFER; TRANSACTION_COUNT | Ratio | Draft | Supported by token transfer and transaction count canonical variables. |
| DM-032 | Ethereum Active Validators | Ethereum | Measures the number of active validators in Ethereum staking. | ETH_ACTIVE_VALIDATORS | Count | Draft | Supported by Ethereum staking canonical variable. |
| DM-033 | Ethereum Total Supply | Ethereum | Measures total ETH supply. | ETH_TOTAL_SUPPLY | Amount | Draft | Supported by Ethereum staking canonical variable. |
| DM-034 | Ethereum Staking Participation Ratio | Ethereum | Measures Ethereum active validators in relation to total ETH supply. | ETH_ACTIVE_VALIDATORS; ETH_TOTAL_SUPPLY | Percentage | Draft | Canonical dictionary notes these variables are used together for Staking Ratio. |
| DM-035 | Ethereum Validator Deposit Activity | Ethereum | Measures Ethereum validator deposit data. | ETH_VALIDATOR_DEPOSIT | Amount | Draft | Supported by Ethereum validator canonical variable. |
| DM-036 | Ethereum Validator Slashing Activity | Ethereum | Measures Ethereum validator slashing data. | ETH_VALIDATOR_SLASHING | Count | Draft | Supported by Ethereum validator canonical variable. |
| DM-037 | Ethereum Validator Attestation Activity | Ethereum | Measures Ethereum validator attestation data. | ETH_VALIDATOR_ATTESTATION | Count | Draft | Supported by Ethereum validator canonical variable. |
| DM-038 | Ethereum Validator Dataset | Ethereum | Measures Ethereum validator data as a validator-level dataset. | ETH_VALIDATOR_DATA | Dataset | Draft | Supported by Ethereum validator canonical variable. |
| DM-039 | Open Interest | Derivatives | Measures total open futures positions for an asset at an exchange scope. | OPEN_INTEREST | Amount | Draft | Supported by derivatives canonical variable. |
| DM-040 | Funding Rate | Derivatives | Measures the futures funding rate for an asset at an exchange scope. | FUNDING_RATE | Percentage | Draft | Supported by derivatives canonical variable. |
| DM-041 | Open Interest to Market Capitalization Ratio | Derivatives | Measures open interest in relation to asset market capitalization. | OPEN_INTEREST; ASSET_MARKET_CAP | Ratio | Draft | Supported by derivatives and market structure canonical variables. |
| DM-042 | Open Interest to Trading Volume Ratio | Derivatives | Measures open interest in relation to asset trading volume. | OPEN_INTEREST; ASSET_TRADING_VOLUME | Ratio | Draft | Supported by derivatives and liquidity canonical variables. |
| DM-043 | Funding Rate and Open Interest Pair | Derivatives | Measures funding rate and open interest as paired derivatives market values. | FUNDING_RATE; OPEN_INTEREST | Dataset | Draft | Supported by derivatives canonical variables. |
| DM-044 | DEX Volume | DeFi | Measures decentralized exchange trading volume. | DEX_VOLUME | Amount | Draft | Supported by DeFi canonical variable. |
| DM-045 | DEX Volume Share | DeFi | Measures decentralized exchange trading volume in relation to asset trading volume. | DEX_VOLUME; ASSET_TRADING_VOLUME | Ratio | Draft | Supported by DeFi and liquidity canonical variables. |
| DM-046 | Wallet Entity Label Dataset | Institutional | Measures entity labels associated with wallets or addresses. | WHALE_ENTITY_LABEL | Dataset | Draft | Supported by whale tracking canonical variable. |
| DM-047 | Wallet Transaction History | Institutional | Measures transaction history associated with wallets or entities. | WHALE_TRANSACTION_HISTORY | Dataset | Draft | Supported by whale tracking canonical variable. |
| DM-048 | Wallet Portfolio Dataset | Institutional | Measures portfolio holdings associated with wallets. | WHALE_WALLET_PORTFOLIO | Dataset | Draft | Supported by whale tracking canonical variable. |
| DM-049 | Wallet Activity Dataset | Institutional | Measures activity associated with wallets. | WHALE_WALLET_ACTIVITY | Dataset | Draft | Supported by whale tracking canonical variable. |
| DM-050 | Wallet Transaction Activity | Institutional | Measures wallet activity together with wallet transaction history. | WHALE_WALLET_ACTIVITY; WHALE_TRANSACTION_HISTORY | Dataset | Draft | Supported by whale tracking canonical variables. |
| DM-051 | Wallet Portfolio Activity | Institutional | Measures wallet activity together with wallet portfolio data. | WHALE_WALLET_ACTIVITY; WHALE_WALLET_PORTFOLIO | Dataset | Draft | Supported by whale tracking canonical variables. |
| DM-052 | Altcoin Market Capitalization | Altcoin | Measures market capitalization for non-Bitcoin crypto assets represented by asset-level market data. | ASSET_MARKET_CAP | Amount | Draft | Supported where the asset scope is an altcoin. |
| DM-053 | Altcoin Trading Volume | Altcoin | Measures trading volume for non-Bitcoin crypto assets represented by asset-level market data. | ASSET_TRADING_VOLUME | Amount | Draft | Supported where the asset scope is an altcoin. |
| DM-054 | Altcoin Volume to Market Capitalization Ratio | Altcoin | Measures trading volume in relation to market capitalization for non-Bitcoin crypto assets represented by asset-level market data. | ASSET_TRADING_VOLUME; ASSET_MARKET_CAP | Ratio | Draft | Supported where the asset scope is an altcoin. |

