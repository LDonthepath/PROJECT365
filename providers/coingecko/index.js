'use strict';

const { BaseProvider, BaseProviderFactory, ERROR_CODES, providerError, providerResult, providerHealth, providerCapability, isProviderError } = require('../../backend/src/providerFramework');

const PROVIDER_ID = 'coingecko';
const PROVIDER_NAME = 'CoinGecko';
const PROVIDER_VERSION = '1.0.0';
const DEFAULT_BASE_URL = 'https://api.coingecko.com/api/v3';
const SUPPORTED = Object.freeze(['market-data', 'token-metadata', 'contract-metadata']);
const CAPABILITIES = Object.freeze(SUPPORTED.map((name) => providerCapability({
  name,
  description: `CoinGecko ${name} boundary capability.`,
  inputSchema: { type: 'object', required: name === 'contract-metadata' ? ['assetPlatformId', 'contractAddress'] : ['coinId'] },
  outputSchema: { type: 'object', rawProviderObjects: false },
  rateLimitPolicy: { providerManaged: true },
  timeoutPolicy: { defaultTimeoutMs: 5000 },
  retryPolicy: { defaultMaxAttempts: 2 },
})));

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function encode(value) { return encodeURIComponent(value); }
function parseRetryAfter(header) { const n = Number(header); return Number.isFinite(n) ? n * 1000 : null; }

const ENDPOINT_RESOLVERS = Object.freeze({
  'market-data': (request) => `/coins/markets?vs_currency=${encode(request.vsCurrency || 'usd')}&ids=${encode(request.coinId)}&price_change_percentage=1h,24h`,
  'token-metadata': (request) => `/coins/${encode(request.coinId)}`,
  'contract-metadata': (request) => `/coins/${encode(request.assetPlatformId)}/contract/${encode(request.contractAddress)}`,
});

const NORMALIZERS = Object.freeze({
  'market-data': (raw) => {
    const item = Array.isArray(raw.market) ? raw.market[0] : raw.market;
    const global = raw.global && raw.global.data;
    const totalMarketCapUsd = global && global.total_market_cap && global.total_market_cap.usd;
    const percentages = global && global.market_cap_percentage;
    if (!item || !global || typeof item.id !== 'string' || !Number.isFinite(item.current_price) || !Number.isFinite(totalMarketCapUsd) || !percentages || !Number.isFinite(percentages.btc) || !Number.isFinite(percentages.eth) || !Number.isFinite(percentages.usdt) || !Number.isFinite(percentages.usdc)) return null;
    const total3MarketCap = totalMarketCapUsd * (1 - ((percentages.btc + percentages.eth + percentages.usdt) / 100));
    return Object.freeze({ asset: Object.freeze({ id: item.id, symbol: item.symbol, name: item.name }), market: Object.freeze({ priceUsd: item.current_price, change1h: item.price_change_percentage_1h_in_currency, change24h: item.price_change_percentage_24h ?? item.price_change_percentage_24h_in_currency, volume24hUsd: item.total_volume, marketCapUsd: item.market_cap, totalMarketCapUsd, total3MarketCap, btcDominance: percentages.btc, usdtDominance: percentages.usdt, usdcDominance: percentages.usdc, ath: item.ath, atl: item.atl }), supply: Object.freeze({ circulatingSupply: item.circulating_supply }) });
  },
  'token-metadata': (raw) => raw && typeof raw.id === 'string' ? Object.freeze({ id: raw.id, symbol: raw.symbol, name: raw.name, assetPlatformId: raw.asset_platform_id || null, contractAddress: raw.contract_address || null, categories: Array.isArray(raw.categories) ? raw.categories.slice() : [] }) : null,
  'contract-metadata': (raw) => raw && typeof raw.id === 'string' ? Object.freeze({ id: raw.id, symbol: raw.symbol, name: raw.name, assetPlatformId: raw.asset_platform_id || null, contractAddress: raw.contract_address || null, categories: Array.isArray(raw.categories) ? raw.categories.slice() : [] }) : null,
});


class CoinGeckoProvider extends BaseProvider {
  constructor(options = {}) {
    super({ id: PROVIDER_ID, name: PROVIDER_NAME, version: PROVIDER_VERSION });
    this.baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
    this.apiKey = options.apiKey || null;
    this.timeoutMs = options.timeoutMs || 5000;
    this.maxAttempts = options.maxAttempts || 2;
    this.fetchImpl = options.fetchImpl || globalThis.fetch;
  }
  capabilities() { return CAPABILITIES.slice(); }
  supports(capability) { return SUPPORTED.includes(typeof capability === 'string' ? capability : capability && capability.name); }
  validate() {
    if (this.state === 'disposed') return providerError({ code: ERROR_CODES.DISPOSED, providerId: this.id, retryable: false });
    if (!/^https:\/\//.test(this.baseUrl) && !/^http:\/\/localhost/.test(this.baseUrl)) return providerError({ code: ERROR_CODES.VALIDATION_FAILED, providerId: this.id, message: 'CoinGecko baseUrl must be HTTPS unless localhost test fixture.' });
    if (typeof this.fetchImpl !== 'function') return providerError({ code: ERROR_CODES.VALIDATION_FAILED, providerId: this.id, message: 'CoinGecko fetch implementation is required.' });
    this.state = 'ready';
    return Object.freeze({ status: 'valid', providerId: this.id, contractVersion: '1.0' });
  }
  endpointFor(request) {
    const resolver = ENDPOINT_RESOLVERS[request && request.capability];
    return resolver ? resolver(request) : null;
  }
  async httpJson(path, request, attempt) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), request.timeoutMs || this.timeoutMs);
    try {
      const headers = { accept: 'application/json' };
      if (this.apiKey) headers['x-cg-demo-api-key'] = this.apiKey;
      const response = await this.fetchImpl(`${this.baseUrl}${path}`, { method: 'GET', headers, signal: controller.signal });
      if (response.status === 401 || response.status === 403) return providerError({ code: ERROR_CODES.AUTH_FAILED, providerId: this.id, retryable: false, attempt });
      if (response.status === 429) return providerError({ code: ERROR_CODES.RATE_LIMITED, providerId: this.id, retryable: true, rateLimited: true, retryAfterMs: parseRetryAfter(response.headers && response.headers.get && response.headers.get('retry-after')), attempt });
      if (!response.ok) return providerError({ code: ERROR_CODES.SOURCE_UNAVAILABLE, providerId: this.id, retryable: true, attempt, details: { status: response.status } });
      return await response.json();
    } catch (error) {
      return providerError({ code: error && error.name === 'AbortError' ? ERROR_CODES.TIMEOUT : ERROR_CODES.SOURCE_UNAVAILABLE, providerId: this.id, retryable: true, timeout: error && error.name === 'AbortError', attempt });
    } finally { clearTimeout(timeout); }
  }
  async fetch(request = {}, context = {}) {
    if (this.state === 'disposed') return providerError({ code: ERROR_CODES.DISPOSED, providerId: this.id, requestId: request.requestId });
    if (this.state !== 'ready') return providerError({ code: ERROR_CODES.STATE_INVALID, providerId: this.id, requestId: request.requestId });
    if (!this.supports(request.capability)) return providerError({ code: ERROR_CODES.UNSUPPORTED_CAPABILITY, providerId: this.id, capability: request.capability, requestId: request.requestId });
    const path = this.endpointFor(request);
    const maxAttempts = request.maxAttempts || this.maxAttempts;
    const warnings = [];
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const market = await this.httpJson(path, request, attempt);
      const raw = isProviderError(market) ? market : (request.capability === 'market-data' ? await this.httpJson('/global', request, attempt) : market);
      if (!isProviderError(raw)) {
        this.state = 'normalizing';
        const normalized = this.normalize(request.capability === 'market-data' ? { market, global: raw } : raw, { ...context, capability: request.capability });
        this.state = 'ready';
        if (isProviderError(normalized)) return normalized;
        return providerResult({ providerId: this.id, providerName: this.name, providerVersion: this.version, capability: request.capability, requestId: request.requestId, fetchedAt: Date.now(), payload: { format: 'normalized', normalized }, attribution: { source: 'CoinGecko', endpoint: path }, metadata: { attempts: attempt, warnings } });
      }
      if (!raw.retryable || attempt === maxAttempts) return attempt === maxAttempts && raw.retryable ? providerError({ ...raw, code: ERROR_CODES.RETRY_EXHAUSTED, maxAttempts, details: { cause: raw.code } }) : raw;
      warnings.push(raw.code);
      await sleep(request.retryDelayMs || 0);
    }
  }
  normalize(raw, context = {}) {
    try {
      const normalizeCapability = NORMALIZERS[context.capability];
      const normalized = normalizeCapability ? normalizeCapability(raw) : null;
      return normalized || providerError({ code: ERROR_CODES.MALFORMED_RESPONSE, providerId: this.id, capability: context.capability });
    } catch (_) { return providerError({ code: ERROR_CODES.NORMALIZATION_FAILED, providerId: this.id, capability: context.capability }); }
  }
  async health() {
    const started = Date.now();
    try {
      const result = await this.httpJson('/ping', {}, 1);
      if (isProviderError(result)) return providerHealth({ status: result.rateLimited ? 'degraded' : 'unavailable', providerId: this.id, available: false, rateLimited: result.rateLimited, retryAfterMs: result.retryAfterMs, latencyMs: Date.now() - started, message: result.code });
      return providerHealth({ status: 'healthy', providerId: this.id, available: true, latencyMs: Date.now() - started, message: 'CoinGecko ping succeeded.' });
    } catch (_) { return providerHealth({ status: 'unavailable', providerId: this.id, available: false, latencyMs: Date.now() - started, message: ERROR_CODES.HEALTH_CHECK_FAILED }); }
  }
  dispose() { this.state = 'disposed'; return Object.freeze({ status: 'disposed', providerId: this.id, contractVersion: '1.0' }); }
}

class CoinGeckoFactory extends BaseProviderFactory {
  constructor(options = {}) { super({ providerId: PROVIDER_ID, version: PROVIDER_VERSION }); this.options = options; }
  validate(definition) { if (this.state === 'disposed') return providerError({ code: ERROR_CODES.FACTORY_DISPOSED, providerId: PROVIDER_ID }); if (!definition || definition.providerId !== PROVIDER_ID) return providerError({ code: ERROR_CODES.VALIDATION_FAILED, providerId: PROVIDER_ID }); return Object.freeze({ status: 'valid', providerId: PROVIDER_ID, contractVersion: '1.0' }); }
  create(definition) { if (this.state === 'disposed') return providerError({ code: ERROR_CODES.FACTORY_DISPOSED, providerId: PROVIDER_ID }); return new CoinGeckoProvider({ ...this.options, ...(definition && definition.options) }); }
  capabilities() { return CAPABILITIES.slice(); }
  dispose() { this.state = 'disposed'; return Object.freeze({ status: 'disposed', providerId: PROVIDER_ID, contractVersion: '1.0' }); }
}
function definition() { return { providerId: PROVIDER_ID, name: PROVIDER_NAME, version: PROVIDER_VERSION, capabilities: CAPABILITIES.slice() }; }
module.exports = { CoinGeckoProvider, CoinGeckoFactory, definition, PROVIDER_ID, CAPABILITIES, ENDPOINT_RESOLVERS, NORMALIZERS };
