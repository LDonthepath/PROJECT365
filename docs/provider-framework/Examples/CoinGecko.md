# CoinGecko Reference Provider

`providers/coingecko/` is PROJECT365's reference provider implementation. Future providers should follow the same separation of concerns: provider-specific endpoint selection, response validation, retry behavior, and normalization remain inside the provider directory, while creation and access occur through the Provider Framework registry.

## Architecture

- `CoinGeckoProvider` implements the `BaseProvider` lifecycle methods: `validate()`, `fetch()`, `normalize()`, `health()`, `capabilities()`, `supports()`, and `dispose()`.
- `CoinGeckoFactory` extends `BaseProviderFactory`, exposes the Provider Framework factory contract, and creates provider instances only after registry validation.
- `definition()` returns the provider registration metadata consumed by `ProviderRegistry.register()`.
- Consumer code must resolve and create CoinGecko through `ProviderRegistry`; it must not instantiate the provider directly outside tests and registration wiring.

## Lifecycle

1. Build the provider definition with `definition()`.
2. Register it with `ProviderRegistry.register(definition(), new CoinGeckoFactory(options))`.
3. Create an instance with `ProviderRegistry.create('coingecko', options)`. The registry does not auto-validate the instance.
4. Call the provider's `validate()` method to move from `created` to `ready`, then call `fetch()`. During successful fetch the provider enters `normalizing` and then returns to `ready`.
5. Release resources with `dispose()`. Disposal is idempotent and transitions the provider or factory to `disposed`.

## Capability Mapping

The reference implementation supports only these capabilities:

| PROJECT365 capability | CoinGecko API path |
| --- | --- |
| `market-data` | `/coins/markets` |
| `token-metadata` | `/coins/{id}` |
| `contract-metadata` | `/coins/{asset_platform_id}/contract/{contract_address}` |

Unsupported capabilities such as `news`, `derivatives`, `on-chain`, `ETF`, `sentiment`, and `macro` return `PROVIDER_UNSUPPORTED_CAPABILITY` before any external request is attempted. Endpoint selection is implemented through `ENDPOINT_RESOLVERS`, a capability-to-resolver map, so new CoinGecko capabilities can be added by registering another resolver instead of changing fetch control flow.

## Fetch, Retry, Timeout, and Errors

`fetch()` uses the official CoinGecko REST API base URL, `https://api.coingecko.com/api/v3`, by default. It does not scrape pages or call unofficial endpoints. The provider converts transport failures, HTTP failures, rate limits, authentication failures, malformed payloads, timeouts, and retry exhaustion into deterministic `ProviderError` objects.

## Normalization Flow

CoinGecko response objects never cross the provider boundary as raw objects. `normalize()` delegates to `NORMALIZERS`, a capability-to-normalizer map, and each normalizer maps provider-specific fields into PROJECT365 provider-boundary payloads:

- `market-data` maps price, volume, market cap, supply, ATH/ATL, and short-window changes.
- `token-metadata` maps token identity, symbol, name, platform, contract address, and categories.
- `contract-metadata` maps contract-derived token identity and metadata.

The resulting `ProviderResult.payload` uses `format: 'normalized'` and omits `raw` provider payloads so downstream consumers are not coupled to CoinGecko's response schema.

## Health

`health()` calls `/ping` and returns provider operational health without throwing:

- `healthy` when CoinGecko responds successfully.
- `degraded` when rate limited or partially unavailable.
- `unavailable` when the endpoint cannot be reached.

