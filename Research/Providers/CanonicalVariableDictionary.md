# PROJECT365 — Canonical Variable Dictionary

| Canonical Variable ID | Canonical Variable Name | Domain | Business Category | Description | Data Type | Unit | Definition Status | Notes |
|---|---|---|---|---|---|---|---|---|
| CV-001 | BTC_MVRV | On-Chain | Valuation | Market Value to Realized Value ratio untuk Bitcoin. | Not Verified | Not Verified | Likely | |
| CV-002 | BTC_MVRV_ZSCORE | On-Chain | Valuation | Z-Score dari rasio MVRV untuk Bitcoin. | Not Verified | Not Verified | Likely | Beberapa sumber data menyediakan metrik ini; konsistensi formula/skala antar sumber belum terverifikasi. |
| CV-003 | BTC_SOPR | On-Chain | Valuation | Spent Output Profit Ratio untuk Bitcoin. | Not Verified | Not Verified | Likely | |
| CV-004 | BTC_NUPL | On-Chain | Valuation | Net Unrealized Profit/Loss untuk Bitcoin. | Not Verified | Not Verified | Likely | Beberapa sumber data menyediakan metrik ini; konsistensi definisi antar sumber belum terverifikasi. |
| CV-005 | BTC_COIN_DAYS_DESTROYED | On-Chain | Market Structure | Metrik Coin Days Destroyed untuk Bitcoin. | Not Verified | Not Verified | Likely | |
| CV-006 | BTC_HODL_WAVES | On-Chain | Market Structure | Distribusi umur UTXO Bitcoin (HODL Waves). | Not Verified | Not Verified | Likely | |
| CV-007 | BTC_PUELL_MULTIPLE | On-Chain | Valuation | Metrik Puell Multiple untuk Bitcoin. | Not Verified | Not Verified | Likely | |
| CV-008 | BTC_RESERVE_RISK | On-Chain | Valuation | Metrik Reserve Risk untuk Bitcoin. | Not Verified | Not Verified | Likely | |
| CV-009 | BTC_EXCHANGE_INFLOW | On-Chain | Exchange Flow | Aliran masuk Bitcoin ke exchange. | Not Verified | Not Verified | Likely | |
| CV-010 | BTC_EXCHANGE_OUTFLOW | On-Chain | Exchange Flow | Aliran keluar Bitcoin dari exchange. | Not Verified | Not Verified | Likely | |
| CV-011 | BTC_EXCHANGE_NETFLOW | On-Chain | Exchange Flow | Netflow (inflow dikurangi outflow) Bitcoin exchange. | Not Verified | Not Verified | Likely | |
| CV-012 | BTC_EXCHANGE_RESERVE | On-Chain | Exchange Flow | Total cadangan Bitcoin yang tersimpan di exchange. | Not Verified | Not Verified | Likely | |
| CV-013 | M2_SUPPLY | Macro | Macro Liquidity | Jumlah uang beredar M2. | Not Verified | Not Verified | Likely | Overlap konseptual dengan domain Macro. |
| CV-014 | TOTAL_STABLECOIN_SUPPLY | Stablecoin | Stablecoin | Total suplai stablecoin yang beredar. | Not Verified | Not Verified | Likely | Overlap konseptual dengan domain Macro. |
| CV-015 | DXY | Macro | Macro Liquidity | US Dollar Index. | Not Verified | Not Verified | Likely | |
| CV-016 | VIX | Macro | Volatility | CBOE Volatility Index. | Not Verified | Not Verified | Likely | |
| CV-017 | US_2Y_TREASURY_YIELD | Macro | Interest Rates | Imbal hasil (yield) obligasi pemerintah Amerika Serikat tenor 2 tahun. | Not Verified | Not Verified | Likely | |
| CV-018 | US_10Y_TREASURY_YIELD | Macro | Interest Rates | Imbal hasil (yield) obligasi pemerintah Amerika Serikat tenor 10 tahun. | Not Verified | Not Verified | Likely | |
| CV-019 | ACTIVE_ADDRESSES | On-Chain | Network Activity | Jumlah alamat aktif di jaringan. | Not Verified | Not Verified | Likely | |
| CV-020 | NETWORK_SUPPLY | On-Chain | Network Activity | Total suplai aset yang beredar di jaringan. | Not Verified | Not Verified | Likely | |
| CV-021 | TRANSACTION_COUNT | On-Chain | Network Activity | Jumlah transaksi di jaringan. | Not Verified | Not Verified | Likely | |
| CV-022 | LTH_STH_SOPR | On-Chain | Valuation | SOPR untuk Long-Term Holder / Short-Term Holder. | Not Verified | Not Verified | Research | Klasifikasi metrik lanjutan; keandalan/ketersediaan data belum sepenuhnya terverifikasi. |
| CV-023 | ETH_ACTIVE_VALIDATORS | Ethereum | Staking | Jumlah validator aktif dalam jaringan staking Ethereum. | Not Verified | count | Likely | Digunakan bersama ETH_TOTAL_SUPPLY untuk menghitung Staking Ratio. |
| CV-024 | ETH_TOTAL_SUPPLY | Ethereum | Staking | Total suplai ETH, digunakan bersama jumlah validator aktif untuk menghitung Staking Ratio. | Not Verified | Not Verified | Not Verified | Digunakan bersama ETH_ACTIVE_VALIDATORS untuk menghitung Staking Ratio. |
| CV-025 | ETH_VALIDATOR_DATA | Ethereum | Staking | Data validator pada jaringan staking Ethereum (Eth2 Beacon Chain). | Not Verified | Not Verified | Likely | |
| CV-026 | ETH_VALIDATOR_DEPOSIT | Ethereum | Staking | Data deposit validator pada jaringan staking Ethereum (Eth2 Beacon Chain). | Not Verified | Not Verified | Likely | |
| CV-027 | ETH_VALIDATOR_SLASHING | Ethereum | Staking | Data slashing (penalti) validator pada jaringan staking Ethereum (Eth2 Beacon Chain). | Not Verified | Not Verified | Likely | |
| CV-028 | ETH_VALIDATOR_ATTESTATION | Ethereum | Staking | Data attestation validator pada jaringan staking Ethereum (Eth2 Beacon Chain). | Not Verified | Not Verified | Likely | |
| CV-029 | OPEN_INTEREST | Derivatives | Derivatives | Total posisi futures terbuka (open interest) untuk suatu aset di sebuah exchange. | Not Verified | Not Verified | Verified | Nilai bersifat per-exchange, bukan agregat lintas exchange. |
| CV-030 | FUNDING_RATE | Derivatives | Derivatives | Tingkat funding rate futures untuk suatu aset di sebuah exchange. | Not Verified | Not Verified | Verified | Nilai bersifat per-exchange, bukan agregat lintas exchange. |
| CV-031 | WHALE_ENTITY_LABEL | Whale Tracking | Whale Tracking | Label entitas untuk alamat/wallet. | Not Verified | Not Verified | Research | |
| CV-032 | WHALE_TRANSACTION_HISTORY | Whale Tracking | Whale Tracking | Riwayat transaksi entitas/wallet. | Not Verified | Not Verified | Research | |
| CV-033 | WHALE_WALLET_PORTFOLIO | Whale Tracking | Whale Tracking | Data portfolio wallet DeFi. | Not Verified | Not Verified | Not Verified | |
| CV-034 | WHALE_WALLET_ACTIVITY | Whale Tracking | Whale Tracking | Data aktivitas wallet DeFi. | Not Verified | Not Verified | Not Verified | |
| CV-035 | ASSET_PRICE | Global Market | Market Structure | Harga aset. | Not Verified | Not Verified | Likely | |
| CV-036 | ASSET_MARKET_CAP | Global Market | Market Structure | Kapitalisasi pasar aset. | Not Verified | Not Verified | Likely | |
| CV-037 | ASSET_TRADING_VOLUME | Global Market | Liquidity | Volume perdagangan aset. | Not Verified | Not Verified | Likely | |
| CV-038 | DEX_VOLUME | DeFi | DeFi | Volume perdagangan di DEX. | Not Verified | Not Verified | Likely | |
| CV-039 | TOKEN_TRANSFER | On-Chain | Network Activity | Data transfer token on-chain. | Not Verified | Not Verified | Likely | |
