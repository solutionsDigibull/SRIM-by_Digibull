var He = Object.defineProperty;
var Ge = (i, s, o) => s in i ? He(i, s, { enumerable: !0, configurable: !0, writable: !0, value: o }) : i[s] = o;
var D = (i, s, o) => Ge(i, typeof s != "symbol" ? s + "" : s, o);
import { ar as Ye, ax as Ve, ay as Ke, as as Be, az as Qe, aA as Xe, aB as he, aC as Ze, aD as We, aE as Je, N as et, Z as tt, K as rt, aF as be, O as st, aG as we, aH as nt, L as Ee, D as ot, M as it, aI as at, aJ as ct, aK as ut, aL as lt, aM as dt, aN as ft, an as yt, ah as mt, aO as gt, I as te, aP as _t, aQ as pt, aR as ht, aS as bt, aT as wt, aU as Et, a6 as ne, a7 as oe, a3 as vt, a2 as St, aV as ve, aW as Se, aj as Te, F as Re, aX as Tt, aY as Rt, aZ as Ot, av as Pt, ak as jt, a_ as Dt, a$ as At, b0 as Oe, b1 as ie, b2 as $t, b3 as Pe, a5 as Ct, b4 as je, b5 as De, b6 as ae, b7 as Ae, b8 as $e, b9 as ce, ba as Ce, bb as ue, bc as Ie, bd as Ne, be as It, bf as Nt, bg as Me, bh as Mt, H as se, bi as kt, bj as Ft, bk as xt, bl as qt, bm as Ut, bn as Lt, a8 as zt, a4 as Ht, bo as Gt, ao as Yt, ai as Vt, bp as Kt, bq as Bt, a1 as Qt, br as Xt, bs as Zt, $ as Wt, bt as Jt, bu as er, a0 as tr, Y as rr, aa as sr, ad as nr, bv as T, bw as or, bx as ir, by as me, bz as ar, bA as cr } from "./index-ChliSiZl.js";
import ur, { constants as ge } from "http2";
(function() {
  try {
    var i = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, s = new i.Error().stack;
    s && (i._sentryDebugIds = i._sentryDebugIds || {}, i._sentryDebugIds[s] = "ba4aa8a6-599f-40ee-8103-128f1cf10620", i._sentryDebugIdIdentifier = "sentry-dbid-ba4aa8a6-599f-40ee-8103-128f1cf10620");
  } catch {
  }
})();
const lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getLoggerPlugin: Ye,
  loggerMiddleware: Ve,
  loggerMiddlewareOptions: Ke
}, Symbol.toStringTag, { value: "Module" })), dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRecursionDetectionPlugin: Be,
  recursionDetectionMiddleware: Qe
}, Symbol.toStringTag, { value: "Module" }));
class fr {
  constructor(s) {
    D(this, "sessions", []);
    this.sessions = s ?? [];
  }
  poll() {
    if (this.sessions.length > 0)
      return this.sessions.shift();
  }
  offerLast(s) {
    this.sessions.push(s);
  }
  contains(s) {
    return this.sessions.includes(s);
  }
  remove(s) {
    this.sessions = this.sessions.filter((o) => o !== s);
  }
  [Symbol.iterator]() {
    return this.sessions[Symbol.iterator]();
  }
  destroy(s) {
    for (const o of this.sessions)
      o === s && (o.destroyed || o.destroy());
  }
}
class yr {
  constructor(s) {
    D(this, "config");
    D(this, "sessionCache", /* @__PURE__ */ new Map());
    if (this.config = s, this.config.maxConcurrency && this.config.maxConcurrency <= 0)
      throw new RangeError("maxConcurrency must be greater than zero.");
  }
  lease(s, o) {
    const u = this.getUrlString(s), f = this.sessionCache.get(u);
    if (f) {
      const v = f.poll();
      if (v && !this.config.disableConcurrency)
        return v;
    }
    const d = ur.connect(u);
    this.config.maxConcurrency && d.settings({ maxConcurrentStreams: this.config.maxConcurrency }, (v) => {
      if (v)
        throw new Error("Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + s.destination.toString());
    }), d.unref();
    const g = () => {
      d.destroy(), this.deleteSession(u, d);
    };
    d.on("goaway", g), d.on("error", g), d.on("frameError", g), d.on("close", () => this.deleteSession(u, d)), o.requestTimeout && d.setTimeout(o.requestTimeout, g);
    const E = this.sessionCache.get(u) || new fr();
    return E.offerLast(d), this.sessionCache.set(u, E), d;
  }
  deleteSession(s, o) {
    const u = this.sessionCache.get(s);
    u && u.contains(o) && (u.remove(o), this.sessionCache.set(s, u));
  }
  release(s, o) {
    var f;
    const u = this.getUrlString(s);
    (f = this.sessionCache.get(u)) == null || f.offerLast(o);
  }
  destroy() {
    for (const [s, o] of this.sessionCache) {
      for (const u of o)
        u.destroyed || u.destroy(), o.remove(u);
      this.sessionCache.delete(s);
    }
  }
  setMaxConcurrentStreams(s) {
    if (s && s <= 0)
      throw new RangeError("maxConcurrentStreams must be greater than zero.");
    this.config.maxConcurrency = s;
  }
  setDisableConcurrentStreams(s) {
    this.config.disableConcurrency = s;
  }
  getUrlString(s) {
    return s.destination.toString();
  }
}
class le {
  constructor(s) {
    D(this, "config");
    D(this, "configProvider");
    D(this, "metadata", { handlerProtocol: "h2" });
    D(this, "connectionManager", new yr({}));
    this.configProvider = new Promise((o, u) => {
      typeof s == "function" ? s().then((f) => {
        o(f || {});
      }).catch(u) : o(s || {});
    });
  }
  static create(s) {
    return typeof (s == null ? void 0 : s.handle) == "function" ? s : new le(s);
  }
  destroy() {
    this.connectionManager.destroy();
  }
  async handle(s, { abortSignal: o, requestTimeout: u } = {}) {
    this.config || (this.config = await this.configProvider, this.connectionManager.setDisableConcurrentStreams(this.config.disableConcurrentStreams || !1), this.config.maxConcurrentStreams && this.connectionManager.setMaxConcurrentStreams(this.config.maxConcurrentStreams));
    const { requestTimeout: f, disableConcurrentStreams: d } = this.config, g = u ?? f;
    return new Promise((E, v) => {
      var Q;
      let O = !1, b;
      const S = async (p) => {
        await b, E(p);
      }, $ = async (p) => {
        await b, v(p);
      };
      if (o != null && o.aborted) {
        O = !0;
        const p = new Error("Request aborted");
        p.name = "AbortError", $(p);
        return;
      }
      const { hostname: M, method: I, port: F, protocol: z, query: H } = s;
      let K = "";
      if (s.username != null || s.password != null) {
        const p = s.username ?? "", A = s.password ?? "";
        K = `${p}:${A}@`;
      }
      const x = `${z}//${K}${M}${F ? `:${F}` : ""}`, Z = { destination: new URL(x) }, k = this.connectionManager.lease(Z, {
        requestTimeout: (Q = this.config) == null ? void 0 : Q.sessionTimeout,
        disableConcurrentStreams: d || !1
      }), q = (p) => {
        d && this.destroySession(k), O = !0, $(p);
      }, B = Xe(H || {});
      let Y = s.path;
      B && (Y += `?${B}`), s.fragment && (Y += `#${s.fragment}`);
      const P = k.request({
        ...s.headers,
        [ge.HTTP2_HEADER_PATH]: Y,
        [ge.HTTP2_HEADER_METHOD]: I
      });
      if (k.ref(), P.on("response", (p) => {
        const A = new he({
          statusCode: p[":status"] || -1,
          headers: Ze(p),
          body: P
        });
        O = !0, S({ response: A }), d && (k.close(), this.connectionManager.deleteSession(x, k));
      }), g && P.setTimeout(g, () => {
        P.close();
        const p = new Error(`Stream timed out because of no activity for ${g} ms`);
        p.name = "TimeoutError", q(p);
      }), o) {
        const p = () => {
          P.close();
          const A = new Error("Request aborted");
          A.name = "AbortError", q(A);
        };
        if (typeof o.addEventListener == "function") {
          const A = o;
          A.addEventListener("abort", p, { once: !0 }), P.once("close", () => A.removeEventListener("abort", p));
        } else
          o.onabort = p;
      }
      P.on("frameError", (p, A, V) => {
        q(new Error(`Frame type id ${p} in stream id ${V} has failed with code ${A}.`));
      }), P.on("error", q), P.on("aborted", () => {
        q(new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${P.rstCode}.`));
      }), P.on("close", () => {
        k.unref(), d && k.destroy(), O || q(new Error("Unexpected error: http2 request did not get a response"));
      }), b = We(P, s, g);
    });
  }
  updateHttpClientConfig(s, o) {
    this.config = void 0, this.configProvider = this.configProvider.then((u) => ({
      ...u,
      [s]: o
    }));
  }
  httpHandlerConfigs() {
    return this.config ?? {};
  }
  destroySession(s) {
    s.destroyed || s.destroy();
  }
}
const mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_REQUEST_TIMEOUT: Je,
  NodeHttp2Handler: le,
  NodeHttpHandler: et,
  streamCollector: tt
}, Symbol.toStringTag, { value: "Module" })), gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EndpointCache: rt,
  EndpointError: be,
  customEndpointFunctions: st,
  isIpAddress: we,
  isValidHostLabel: nt,
  resolveEndpoint: Ee
}, Symbol.toStringTag, { value: "Module" })), _r = (i) => {
  if (typeof i.endpointProvider != "function")
    throw new Error("@aws-sdk/util-endpoint - endpointProvider and endpoint missing in config for this client.");
  const { endpoint: s } = i;
  return s === void 0 && (i.endpoint = async () => ke(i.endpointProvider({
    Region: typeof i.region == "function" ? await i.region() : i.region,
    UseDualStack: typeof i.useDualstackEndpoint == "function" ? await i.useDualstackEndpoint() : i.useDualstackEndpoint,
    UseFIPS: typeof i.useFipsEndpoint == "function" ? await i.useFipsEndpoint() : i.useFipsEndpoint,
    Endpoint: void 0
  }, { logger: i.logger }))), i;
}, ke = (i) => ot(i.url), pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EndpointError: be,
  awsEndpointFunctions: it,
  getUserAgentPrefix: at,
  isIpAddress: we,
  partition: ct,
  resolveDefaultAwsRegionalEndpointsConfig: _r,
  resolveEndpoint: Ee,
  setPartitionInfo: ut,
  toEndpointV1: ke,
  useDefaultPartitionInfo: lt
}, Symbol.toStringTag, { value: "Module" })), hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_UA_APP_ID: dt,
  getUserAgentMiddlewareOptions: ft,
  getUserAgentPlugin: yt,
  resolveUserAgentConfig: mt,
  userAgentMiddleware: gt
}, Symbol.toStringTag, { value: "Module" })), br = (i) => {
  const { tls: s, endpoint: o, urlParser: u, useDualstackEndpoint: f } = i;
  return Object.assign(i, {
    tls: s ?? !0,
    endpoint: te(typeof o == "string" ? u(o) : o),
    isCustomEndpoint: !0,
    useDualstackEndpoint: te(f ?? !1)
  });
}, wr = async (i) => {
  const { tls: s = !0 } = i, o = await i.region();
  if (!new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/).test(o))
    throw new Error("Invalid region in client config");
  const f = await i.useDualstackEndpoint(), d = await i.useFipsEndpoint(), { hostname: g } = await i.regionInfoProvider(o, { useDualstackEndpoint: f, useFipsEndpoint: d }) ?? {};
  if (!g)
    throw new Error("Cannot resolve hostname from client config");
  return i.urlParser(`${s ? "https:" : "http:"}//${g}`);
}, Er = (i) => {
  const s = te(i.useDualstackEndpoint ?? !1), { endpoint: o, useFipsEndpoint: u, urlParser: f, tls: d } = i;
  return Object.assign(i, {
    tls: d ?? !0,
    endpoint: o ? te(typeof o == "string" ? f(o) : o) : () => wr({ ...i, useDualstackEndpoint: s, useFipsEndpoint: u }),
    isCustomEndpoint: !!o,
    useDualstackEndpoint: s
  });
}, _e = (i = [], { useFipsEndpoint: s, useDualstackEndpoint: o }) => {
  var u;
  return (u = i.find(({ tags: f }) => s === f.includes("fips") && o === f.includes("dualstack"))) == null ? void 0 : u.hostname;
}, vr = (i, { regionHostname: s, partitionHostname: o }) => s || (o ? o.replace("{region}", i) : void 0), Sr = (i, { partitionHash: s }) => Object.keys(s || {}).find((o) => s[o].regions.includes(i)) ?? "aws", Tr = (i, { signingRegion: s, regionRegex: o, useFipsEndpoint: u }) => {
  if (s)
    return s;
  if (u) {
    const f = o.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\."), d = i.match(f);
    if (d)
      return d[0].slice(1, -1);
  }
}, Rr = (i, { useFipsEndpoint: s = !1, useDualstackEndpoint: o = !1, signingService: u, regionHash: f, partitionHash: d }) => {
  var M, I, F, z, H;
  const g = Sr(i, { partitionHash: d }), E = i in f ? i : ((M = d[g]) == null ? void 0 : M.endpoint) ?? i, v = { useFipsEndpoint: s, useDualstackEndpoint: o }, O = _e((I = f[E]) == null ? void 0 : I.variants, v), b = _e((F = d[g]) == null ? void 0 : F.variants, v), S = vr(E, { regionHostname: O, partitionHostname: b });
  if (S === void 0)
    throw new Error(`Endpoint resolution failed for: ${{ resolvedRegion: E, useFipsEndpoint: s, useDualstackEndpoint: o }}`);
  const $ = Tr(S, {
    signingRegion: (z = f[E]) == null ? void 0 : z.signingRegion,
    regionRegex: d[g].regionRegex,
    useFipsEndpoint: s
  });
  return {
    partition: g,
    signingService: u,
    hostname: S,
    ...$ && { signingRegion: $ },
    ...((H = f[E]) == null ? void 0 : H.signingService) && {
      signingService: f[E].signingService
    }
  };
}, Or = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONFIG_USE_DUALSTACK_ENDPOINT: _t,
  CONFIG_USE_FIPS_ENDPOINT: pt,
  DEFAULT_USE_DUALSTACK_ENDPOINT: ht,
  DEFAULT_USE_FIPS_ENDPOINT: bt,
  ENV_USE_DUALSTACK_ENDPOINT: wt,
  ENV_USE_FIPS_ENDPOINT: Et,
  NODE_REGION_CONFIG_FILE_OPTIONS: ne,
  NODE_REGION_CONFIG_OPTIONS: oe,
  NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS: vt,
  NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS: St,
  REGION_ENV_NAME: ve,
  REGION_INI_NAME: Se,
  getRegionInfo: Rr,
  resolveCustomEndpointsConfig: br,
  resolveEndpointsConfig: Er,
  resolveRegionConfig: Te
}, Symbol.toStringTag, { value: "Module" })), Pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loadConfig: Re
}, Symbol.toStringTag, { value: "Module" })), jr = (i) => {
  const { endpoint: s } = i;
  return s === void 0 && (i.endpoint = async () => {
    throw new Error("@smithy/middleware-endpoint: (default endpointRuleSet) endpoint is not set - you must configure an endpoint.");
  }), i;
}, Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  endpointMiddleware: Tt,
  endpointMiddlewareOptions: Rt,
  getEndpointFromInstructions: Ot,
  getEndpointPlugin: Pt,
  resolveEndpointConfig: jt,
  resolveEndpointRequiredConfig: jr,
  resolveParams: Dt,
  toEndpointV1: At
}, Symbol.toStringTag, { value: "Module" }));
class Ar extends Oe {
  constructor(o, u = ie) {
    super(typeof o == "function" ? o : async () => o);
    D(this, "computeNextBackoffDelay");
    typeof u == "number" ? this.computeNextBackoffDelay = () => u : this.computeNextBackoffDelay = u;
  }
  async refreshRetryTokenForRetry(o, u) {
    const f = await super.refreshRetryTokenForRetry(o, u);
    return f.getRetryDelay = () => this.computeNextBackoffDelay(f.getRetryCount()), f;
  }
}
const $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdaptiveRetryStrategy: $t,
  ConfiguredRetryStrategy: Ar,
  DEFAULT_MAX_ATTEMPTS: Pe,
  DEFAULT_RETRY_DELAY_BASE: ie,
  DEFAULT_RETRY_MODE: Ct,
  DefaultRateLimiter: je,
  INITIAL_RETRY_TOKENS: De,
  INVOCATION_ID_HEADER: ae,
  MAXIMUM_RETRY_DELAY: Ae,
  NO_RETRY_INCREMENT: $e,
  REQUEST_HEADER: ce,
  RETRY_COST: Ce,
  get RETRY_MODES() {
    return ue;
  },
  StandardRetryStrategy: Oe,
  THROTTLING_RETRY_DELAY_BASE: Ie,
  TIMEOUT_RETRY_COST: Ne
}, Symbol.toStringTag, { value: "Module" })), Cr = (i, s) => {
  const o = i, u = $e, f = Ce, d = Ne;
  let g = i;
  const E = (S) => S.name === "TimeoutError" ? d : f, v = (S) => E(S) <= g;
  return Object.freeze({
    hasRetryTokens: v,
    retrieveRetryTokens: (S) => {
      if (!v(S))
        throw new Error("No retry token available");
      const $ = E(S);
      return g -= $, $;
    },
    releaseRetryTokens: (S) => {
      g += S ?? u, g = Math.min(g, o);
    }
  });
}, Fe = (i, s) => Math.floor(Math.min(Ae, Math.random() * 2 ** s * i)), xe = (i) => i ? It(i) || Nt(i) || Me(i) || Mt(i) : !1;
class qe {
  constructor(s, o) {
    D(this, "maxAttemptsProvider");
    D(this, "retryDecider");
    D(this, "delayDecider");
    D(this, "retryQuota");
    D(this, "mode", ue.STANDARD);
    this.maxAttemptsProvider = s, this.retryDecider = (o == null ? void 0 : o.retryDecider) ?? xe, this.delayDecider = (o == null ? void 0 : o.delayDecider) ?? Fe, this.retryQuota = (o == null ? void 0 : o.retryQuota) ?? Cr(De);
  }
  shouldRetry(s, o, u) {
    return o < u && this.retryDecider(s) && this.retryQuota.hasRetryTokens(s);
  }
  async getMaxAttempts() {
    let s;
    try {
      s = await this.maxAttemptsProvider();
    } catch {
      s = Pe;
    }
    return s;
  }
  async retry(s, o, u) {
    let f, d = 0, g = 0;
    const E = await this.getMaxAttempts(), { request: v } = o;
    for (se.isInstance(v) && (v.headers[ae] = kt()); ; )
      try {
        se.isInstance(v) && (v.headers[ce] = `attempt=${d + 1}; max=${E}`), u != null && u.beforeRequest && await u.beforeRequest();
        const { response: O, output: b } = await s(o);
        return u != null && u.afterRequest && u.afterRequest(O), this.retryQuota.releaseRetryTokens(f), b.$metadata.attempts = d + 1, b.$metadata.totalRetryDelay = g, { response: O, output: b };
      } catch (O) {
        const b = Ft(O);
        if (d++, this.shouldRetry(b, d, E)) {
          f = this.retryQuota.retrieveRetryTokens(b);
          const S = this.delayDecider(Me(b) ? Ie : ie, d), $ = Ir(b.$response), M = Math.max($ || 0, S);
          g += M, await new Promise((I) => setTimeout(I, M));
          continue;
        }
        throw b.$metadata || (b.$metadata = {}), b.$metadata.attempts = d, b.$metadata.totalRetryDelay = g, b;
      }
  }
}
const Ir = (i) => {
  if (!he.isInstance(i))
    return;
  const s = Object.keys(i.headers).find((d) => d.toLowerCase() === "retry-after");
  if (!s)
    return;
  const o = i.headers[s], u = Number(o);
  return Number.isNaN(u) ? new Date(o).getTime() - Date.now() : u * 1e3;
};
class Nr extends qe {
  constructor(o, u) {
    const { rateLimiter: f, ...d } = u ?? {};
    super(o, d);
    D(this, "rateLimiter");
    this.rateLimiter = f ?? new je(), this.mode = ue.ADAPTIVE;
  }
  async retry(o, u) {
    return super.retry(o, u, {
      beforeRequest: async () => this.rateLimiter.getSendToken(),
      afterRequest: (f) => {
        this.rateLimiter.updateClientSendingRate(f);
      }
    });
  }
}
const Ue = () => (i) => async (s) => {
  const { request: o } = s;
  return se.isInstance(o) && (delete o.headers[ae], delete o.headers[ce]), i(s);
}, Le = {
  name: "omitRetryHeadersMiddleware",
  tags: ["RETRY", "HEADERS", "OMIT_RETRY_HEADERS"],
  relation: "before",
  toMiddleware: "awsAuthMiddleware",
  override: !0
}, Mr = (i) => ({
  applyToStack: (s) => {
    s.addRelativeTo(Ue(), Le);
  }
}), kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdaptiveRetryStrategy: Nr,
  CONFIG_MAX_ATTEMPTS: xt,
  CONFIG_RETRY_MODE: qt,
  ENV_MAX_ATTEMPTS: Ut,
  ENV_RETRY_MODE: Lt,
  NODE_MAX_ATTEMPT_CONFIG_OPTIONS: zt,
  NODE_RETRY_MODE_CONFIG_OPTIONS: Ht,
  StandardRetryStrategy: qe,
  defaultDelayDecider: Fe,
  defaultRetryDecider: xe,
  getOmitRetryHeadersPlugin: Mr,
  getRetryAfterHint: Gt,
  getRetryPlugin: Yt,
  omitRetryHeadersMiddleware: Ue,
  omitRetryHeadersMiddlewareOptions: Le,
  resolveRetryConfig: Vt,
  retryMiddleware: Kt,
  retryMiddlewareOptions: Bt
}, Symbol.toStringTag, { value: "Module" })), Fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NODE_APP_ID_CONFIG_OPTIONS: Qt,
  UA_APP_ID_ENV_NAME: Xt,
  UA_APP_ID_INI_NAME: Zt,
  createDefaultUserAgentProvider: Wt,
  crtAvailability: Jt,
  defaultUserAgent: er
}, Symbol.toStringTag, { value: "Module" })), xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calculateBodyLength: tr
}, Symbol.toStringTag, { value: "Module" })), qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  resolveDefaultsModeConfig: rr
}, Symbol.toStringTag, { value: "Module" }));
function Ur(i = {}) {
  return Re({
    ...oe,
    async default() {
      return ze.silence || console.warn("@aws-sdk - WARN - default STS region of us-east-1 used. See @aws-sdk/credential-providers README and set a region explicitly."), "us-east-1";
    }
  }, { ...ne, ...i });
}
const ze = {
  silence: !1
}, Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NODE_REGION_CONFIG_FILE_OPTIONS: ne,
  NODE_REGION_CONFIG_OPTIONS: oe,
  REGION_ENV_NAME: ve,
  REGION_INI_NAME: Se,
  getAwsRegionExtensionConfiguration: sr,
  resolveAwsRegionExtensionConfiguration: nr,
  resolveRegionConfig: Te,
  stsRegionDefaultResolver: Ur,
  warning: ze
}, Symbol.toStringTag, { value: "Module" })), ls = /* @__PURE__ */ T(or), ds = /* @__PURE__ */ T(lr), fs = /* @__PURE__ */ T(dr), ys = /* @__PURE__ */ T(hr), ms = /* @__PURE__ */ T(Or), gs = /* @__PURE__ */ T(ir), _s = /* @__PURE__ */ T(Dr), ps = /* @__PURE__ */ T(kr);
var re = { exports: {} }, pe;
function hs() {
  return pe || (pe = 1, (function(i) {
    var s, o, u, f, d, g, E, v, O, b, S, $, M, I, F, z, H, K, x, Z, k, q, B, Y, P, Q, p, A, V, de, fe, ye;
    (function(m) {
      var W = typeof me == "object" ? me : typeof self == "object" ? self : typeof this == "object" ? this : {};
      m(J(W, J(i.exports)));
      function J(L, ee) {
        return L !== W && (typeof Object.create == "function" ? Object.defineProperty(L, "__esModule", { value: !0 }) : L.__esModule = !0), function(e, t) {
          return L[e] = ee ? ee(e, t) : t;
        };
      }
    })(function(m) {
      var W = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
        e.__proto__ = t;
      } || function(e, t) {
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
      };
      s = function(e, t) {
        if (typeof t != "function" && t !== null)
          throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
        W(e, t);
        function r() {
          this.constructor = e;
        }
        e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
      }, o = Object.assign || function(e) {
        for (var t, r = 1, n = arguments.length; r < n; r++) {
          t = arguments[r];
          for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
        }
        return e;
      }, u = function(e, t) {
        var r = {};
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
        if (e != null && typeof Object.getOwnPropertySymbols == "function")
          for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
            t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
        return r;
      }, f = function(e, t, r, n) {
        var a = arguments.length, c = a < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, r) : n, l;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function") c = Reflect.decorate(e, t, r, n);
        else for (var _ = e.length - 1; _ >= 0; _--) (l = e[_]) && (c = (a < 3 ? l(c) : a > 3 ? l(t, r, c) : l(t, r)) || c);
        return a > 3 && c && Object.defineProperty(t, r, c), c;
      }, d = function(e, t) {
        return function(r, n) {
          t(r, n, e);
        };
      }, g = function(e, t, r, n, a, c) {
        function l(G) {
          if (G !== void 0 && typeof G != "function") throw new TypeError("Function expected");
          return G;
        }
        for (var _ = n.kind, j = _ === "getter" ? "get" : _ === "setter" ? "set" : "value", y = !t && e ? n.static ? e : e.prototype : null, w = t || (y ? Object.getOwnPropertyDescriptor(y, n.name) : {}), R, X = !1, h = r.length - 1; h >= 0; h--) {
          var C = {};
          for (var N in n) C[N] = N === "access" ? {} : n[N];
          for (var N in n.access) C.access[N] = n.access[N];
          C.addInitializer = function(G) {
            if (X) throw new TypeError("Cannot add initializers after decoration has completed");
            c.push(l(G || null));
          };
          var U = (0, r[h])(_ === "accessor" ? { get: w.get, set: w.set } : w[j], C);
          if (_ === "accessor") {
            if (U === void 0) continue;
            if (U === null || typeof U != "object") throw new TypeError("Object expected");
            (R = l(U.get)) && (w.get = R), (R = l(U.set)) && (w.set = R), (R = l(U.init)) && a.unshift(R);
          } else (R = l(U)) && (_ === "field" ? a.unshift(R) : w[j] = R);
        }
        y && Object.defineProperty(y, n.name, w), X = !0;
      }, E = function(e, t, r) {
        for (var n = arguments.length > 2, a = 0; a < t.length; a++)
          r = n ? t[a].call(e, r) : t[a].call(e);
        return n ? r : void 0;
      }, v = function(e) {
        return typeof e == "symbol" ? e : "".concat(e);
      }, O = function(e, t, r) {
        return typeof t == "symbol" && (t = t.description ? "[".concat(t.description, "]") : ""), Object.defineProperty(e, "name", { configurable: !0, value: r ? "".concat(r, " ", t) : t });
      }, b = function(e, t) {
        if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(e, t);
      }, S = function(e, t, r, n) {
        function a(c) {
          return c instanceof r ? c : new r(function(l) {
            l(c);
          });
        }
        return new (r || (r = Promise))(function(c, l) {
          function _(w) {
            try {
              y(n.next(w));
            } catch (R) {
              l(R);
            }
          }
          function j(w) {
            try {
              y(n.throw(w));
            } catch (R) {
              l(R);
            }
          }
          function y(w) {
            w.done ? c(w.value) : a(w.value).then(_, j);
          }
          y((n = n.apply(e, t || [])).next());
        });
      }, $ = function(e, t) {
        var r = { label: 0, sent: function() {
          if (c[0] & 1) throw c[1];
          return c[1];
        }, trys: [], ops: [] }, n, a, c, l = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
        return l.next = _(0), l.throw = _(1), l.return = _(2), typeof Symbol == "function" && (l[Symbol.iterator] = function() {
          return this;
        }), l;
        function _(y) {
          return function(w) {
            return j([y, w]);
          };
        }
        function j(y) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; l && (l = 0, y[0] && (r = 0)), r; ) try {
            if (n = 1, a && (c = y[0] & 2 ? a.return : y[0] ? a.throw || ((c = a.return) && c.call(a), 0) : a.next) && !(c = c.call(a, y[1])).done) return c;
            switch (a = 0, c && (y = [y[0] & 2, c.value]), y[0]) {
              case 0:
              case 1:
                c = y;
                break;
              case 4:
                return r.label++, { value: y[1], done: !1 };
              case 5:
                r.label++, a = y[1], y = [0];
                continue;
              case 7:
                y = r.ops.pop(), r.trys.pop();
                continue;
              default:
                if (c = r.trys, !(c = c.length > 0 && c[c.length - 1]) && (y[0] === 6 || y[0] === 2)) {
                  r = 0;
                  continue;
                }
                if (y[0] === 3 && (!c || y[1] > c[0] && y[1] < c[3])) {
                  r.label = y[1];
                  break;
                }
                if (y[0] === 6 && r.label < c[1]) {
                  r.label = c[1], c = y;
                  break;
                }
                if (c && r.label < c[2]) {
                  r.label = c[2], r.ops.push(y);
                  break;
                }
                c[2] && r.ops.pop(), r.trys.pop();
                continue;
            }
            y = t.call(e, r);
          } catch (w) {
            y = [6, w], a = 0;
          } finally {
            n = c = 0;
          }
          if (y[0] & 5) throw y[1];
          return { value: y[0] ? y[1] : void 0, done: !0 };
        }
      }, M = function(e, t) {
        for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(t, r) && V(t, e, r);
      }, V = Object.create ? (function(e, t, r, n) {
        n === void 0 && (n = r);
        var a = Object.getOwnPropertyDescriptor(t, r);
        (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
          return t[r];
        } }), Object.defineProperty(e, n, a);
      }) : (function(e, t, r, n) {
        n === void 0 && (n = r), e[n] = t[r];
      }), I = function(e) {
        var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
        if (r) return r.call(e);
        if (e && typeof e.length == "number") return {
          next: function() {
            return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
          }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, F = function(e, t) {
        var r = typeof Symbol == "function" && e[Symbol.iterator];
        if (!r) return e;
        var n = r.call(e), a, c = [], l;
        try {
          for (; (t === void 0 || t-- > 0) && !(a = n.next()).done; ) c.push(a.value);
        } catch (_) {
          l = { error: _ };
        } finally {
          try {
            a && !a.done && (r = n.return) && r.call(n);
          } finally {
            if (l) throw l.error;
          }
        }
        return c;
      }, z = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(F(arguments[t]));
        return e;
      }, H = function() {
        for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length;
        for (var n = Array(e), a = 0, t = 0; t < r; t++)
          for (var c = arguments[t], l = 0, _ = c.length; l < _; l++, a++)
            n[a] = c[l];
        return n;
      }, K = function(e, t, r) {
        if (r || arguments.length === 2) for (var n = 0, a = t.length, c; n < a; n++)
          (c || !(n in t)) && (c || (c = Array.prototype.slice.call(t, 0, n)), c[n] = t[n]);
        return e.concat(c || Array.prototype.slice.call(t));
      }, x = function(e) {
        return this instanceof x ? (this.v = e, this) : new x(e);
      }, Z = function(e, t, r) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var n = r.apply(e, t || []), a, c = [];
        return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), _("next"), _("throw"), _("return", l), a[Symbol.asyncIterator] = function() {
          return this;
        }, a;
        function l(h) {
          return function(C) {
            return Promise.resolve(C).then(h, R);
          };
        }
        function _(h, C) {
          n[h] && (a[h] = function(N) {
            return new Promise(function(U, G) {
              c.push([h, N, U, G]) > 1 || j(h, N);
            });
          }, C && (a[h] = C(a[h])));
        }
        function j(h, C) {
          try {
            y(n[h](C));
          } catch (N) {
            X(c[0][3], N);
          }
        }
        function y(h) {
          h.value instanceof x ? Promise.resolve(h.value.v).then(w, R) : X(c[0][2], h);
        }
        function w(h) {
          j("next", h);
        }
        function R(h) {
          j("throw", h);
        }
        function X(h, C) {
          h(C), c.shift(), c.length && j(c[0][0], c[0][1]);
        }
      }, k = function(e) {
        var t, r;
        return t = {}, n("next"), n("throw", function(a) {
          throw a;
        }), n("return"), t[Symbol.iterator] = function() {
          return this;
        }, t;
        function n(a, c) {
          t[a] = e[a] ? function(l) {
            return (r = !r) ? { value: x(e[a](l)), done: !1 } : c ? c(l) : l;
          } : c;
        }
      }, q = function(e) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var t = e[Symbol.asyncIterator], r;
        return t ? t.call(e) : (e = typeof I == "function" ? I(e) : e[Symbol.iterator](), r = {}, n("next"), n("throw"), n("return"), r[Symbol.asyncIterator] = function() {
          return this;
        }, r);
        function n(c) {
          r[c] = e[c] && function(l) {
            return new Promise(function(_, j) {
              l = e[c](l), a(_, j, l.done, l.value);
            });
          };
        }
        function a(c, l, _, j) {
          Promise.resolve(j).then(function(y) {
            c({ value: y, done: _ });
          }, l);
        }
      }, B = function(e, t) {
        return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e;
      };
      var J = Object.create ? (function(e, t) {
        Object.defineProperty(e, "default", { enumerable: !0, value: t });
      }) : function(e, t) {
        e.default = t;
      }, L = function(e) {
        return L = Object.getOwnPropertyNames || function(t) {
          var r = [];
          for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (r[r.length] = n);
          return r;
        }, L(e);
      };
      Y = function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) for (var r = L(e), n = 0; n < r.length; n++) r[n] !== "default" && V(t, e, r[n]);
        return J(t, e), t;
      }, P = function(e) {
        return e && e.__esModule ? e : { default: e };
      }, Q = function(e, t, r, n) {
        if (r === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
        if (typeof t == "function" ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
      }, p = function(e, t, r, n, a) {
        if (n === "m") throw new TypeError("Private method is not writable");
        if (n === "a" && !a) throw new TypeError("Private accessor was defined without a setter");
        if (typeof t == "function" ? e !== t || !a : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return n === "a" ? a.call(e, r) : a ? a.value = r : t.set(e, r), r;
      }, A = function(e, t) {
        if (t === null || typeof t != "object" && typeof t != "function") throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof e == "function" ? t === e : e.has(t);
      }, de = function(e, t, r) {
        if (t != null) {
          if (typeof t != "object" && typeof t != "function") throw new TypeError("Object expected.");
          var n, a;
          if (r) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            n = t[Symbol.asyncDispose];
          }
          if (n === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            n = t[Symbol.dispose], r && (a = n);
          }
          if (typeof n != "function") throw new TypeError("Object not disposable.");
          a && (n = function() {
            try {
              a.call(this);
            } catch (c) {
              return Promise.reject(c);
            }
          }), e.stack.push({ value: t, dispose: n, async: r });
        } else r && e.stack.push({ async: !0 });
        return t;
      };
      var ee = typeof SuppressedError == "function" ? SuppressedError : function(e, t, r) {
        var n = new Error(r);
        return n.name = "SuppressedError", n.error = e, n.suppressed = t, n;
      };
      fe = function(e) {
        function t(c) {
          e.error = e.hasError ? new ee(c, e.error, "An error was suppressed during disposal.") : c, e.hasError = !0;
        }
        var r, n = 0;
        function a() {
          for (; r = e.stack.pop(); )
            try {
              if (!r.async && n === 1) return n = 0, e.stack.push(r), Promise.resolve().then(a);
              if (r.dispose) {
                var c = r.dispose.call(r.value);
                if (r.async) return n |= 2, Promise.resolve(c).then(a, function(l) {
                  return t(l), a();
                });
              } else n |= 1;
            } catch (l) {
              t(l);
            }
          if (n === 1) return e.hasError ? Promise.reject(e.error) : Promise.resolve();
          if (e.hasError) throw e.error;
        }
        return a();
      }, ye = function(e, t) {
        return typeof e == "string" && /^\.\.?\//.test(e) ? e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(r, n, a, c, l) {
          return n ? t ? ".jsx" : ".js" : a && (!c || !l) ? r : a + c + "." + l.toLowerCase() + "js";
        }) : e;
      }, m("__extends", s), m("__assign", o), m("__rest", u), m("__decorate", f), m("__param", d), m("__esDecorate", g), m("__runInitializers", E), m("__propKey", v), m("__setFunctionName", O), m("__metadata", b), m("__awaiter", S), m("__generator", $), m("__exportStar", M), m("__createBinding", V), m("__values", I), m("__read", F), m("__spread", z), m("__spreadArrays", H), m("__spreadArray", K), m("__await", x), m("__asyncGenerator", Z), m("__asyncDelegator", k), m("__asyncValues", q), m("__makeTemplateObject", B), m("__importStar", Y), m("__importDefault", P), m("__classPrivateFieldGet", Q), m("__classPrivateFieldSet", p), m("__classPrivateFieldIn", A), m("__addDisposableResource", de), m("__disposeResources", fe), m("__rewriteRelativeImportExtension", ye);
    });
  })(re)), re.exports;
}
const zr = "@aws-sdk/nested-clients", Hr = "3.971.0", Gr = "Nested clients for AWS SDK packages.", Yr = "./dist-cjs/index.js", Vr = "./dist-es/index.js", Kr = "./dist-types/index.d.ts", Br = { build: "yarn lint && concurrently 'yarn:build:types' 'yarn:build:es' && yarn build:cjs", "build:cjs": "node ../../scripts/compilation/inline nested-clients", "build:es": "tsc -p tsconfig.es.json", "build:include:deps": 'yarn g:turbo run build -F="$npm_package_name"', "build:types": "tsc -p tsconfig.types.json", "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4", clean: "rimraf ./dist-* && rimraf *.tsbuildinfo", lint: "node ../../scripts/validation/submodules-linter.js --pkg nested-clients", test: "yarn g:vitest run", "test:watch": "yarn g:vitest watch" }, Qr = { node: ">=20.0.0" }, Xr = !1, Zr = { name: "AWS SDK for JavaScript Team", url: "https://aws.amazon.com/javascript/" }, Wr = "Apache-2.0", Jr = { "@aws-crypto/sha256-browser": "5.2.0", "@aws-crypto/sha256-js": "5.2.0", "@aws-sdk/core": "3.970.0", "@aws-sdk/middleware-host-header": "3.969.0", "@aws-sdk/middleware-logger": "3.969.0", "@aws-sdk/middleware-recursion-detection": "3.969.0", "@aws-sdk/middleware-user-agent": "3.970.0", "@aws-sdk/region-config-resolver": "3.969.0", "@aws-sdk/types": "3.969.0", "@aws-sdk/util-endpoints": "3.970.0", "@aws-sdk/util-user-agent-browser": "3.969.0", "@aws-sdk/util-user-agent-node": "3.971.0", "@smithy/config-resolver": "^4.4.6", "@smithy/core": "^3.20.6", "@smithy/fetch-http-handler": "^5.3.9", "@smithy/hash-node": "^4.2.8", "@smithy/invalid-dependency": "^4.2.8", "@smithy/middleware-content-length": "^4.2.8", "@smithy/middleware-endpoint": "^4.4.7", "@smithy/middleware-retry": "^4.4.23", "@smithy/middleware-serde": "^4.2.9", "@smithy/middleware-stack": "^4.2.8", "@smithy/node-config-provider": "^4.3.8", "@smithy/node-http-handler": "^4.4.8", "@smithy/protocol-http": "^5.3.8", "@smithy/smithy-client": "^4.10.8", "@smithy/types": "^4.12.0", "@smithy/url-parser": "^4.2.8", "@smithy/util-base64": "^4.3.0", "@smithy/util-body-length-browser": "^4.2.0", "@smithy/util-body-length-node": "^4.2.1", "@smithy/util-defaults-mode-browser": "^4.3.22", "@smithy/util-defaults-mode-node": "^4.2.25", "@smithy/util-endpoints": "^3.2.8", "@smithy/util-middleware": "^4.2.8", "@smithy/util-retry": "^4.2.8", "@smithy/util-utf8": "^4.2.0", tslib: "^2.6.2" }, es = { concurrently: "7.0.0", "downlevel-dts": "0.10.1", rimraf: "5.0.10", typescript: "~5.8.3" }, ts = { "<4.0": { "dist-types/*": ["dist-types/ts3.4/*"] } }, rs = ["./signin.d.ts", "./signin.js", "./sso-oidc.d.ts", "./sso-oidc.js", "./sts.d.ts", "./sts.js", "dist-*/**"], ss = { "./dist-es/submodules/signin/runtimeConfig": "./dist-es/submodules/signin/runtimeConfig.browser", "./dist-es/submodules/sso-oidc/runtimeConfig": "./dist-es/submodules/sso-oidc/runtimeConfig.browser", "./dist-es/submodules/sts/runtimeConfig": "./dist-es/submodules/sts/runtimeConfig.browser" }, ns = "https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients", os = { type: "git", url: "https://github.com/aws/aws-sdk-js-v3.git", directory: "packages/nested-clients" }, is = { "./package.json": "./package.json", "./sso-oidc": { types: "./dist-types/submodules/sso-oidc/index.d.ts", module: "./dist-es/submodules/sso-oidc/index.js", node: "./dist-cjs/submodules/sso-oidc/index.js", import: "./dist-es/submodules/sso-oidc/index.js", require: "./dist-cjs/submodules/sso-oidc/index.js" }, "./sts": { types: "./dist-types/submodules/sts/index.d.ts", module: "./dist-es/submodules/sts/index.js", node: "./dist-cjs/submodules/sts/index.js", import: "./dist-es/submodules/sts/index.js", require: "./dist-cjs/submodules/sts/index.js" }, "./signin": { types: "./dist-types/submodules/signin/index.d.ts", module: "./dist-es/submodules/signin/index.js", node: "./dist-cjs/submodules/signin/index.js", import: "./dist-es/submodules/signin/index.js", require: "./dist-cjs/submodules/signin/index.js" } }, bs = {
  name: zr,
  version: Hr,
  description: Gr,
  main: Yr,
  module: Vr,
  types: Kr,
  scripts: Br,
  engines: Qr,
  sideEffects: Xr,
  author: Zr,
  license: Wr,
  dependencies: Jr,
  devDependencies: es,
  typesVersions: ts,
  files: rs,
  browser: ss,
  "react-native": {},
  homepage: ns,
  repository: os,
  exports: is
}, ws = /* @__PURE__ */ T(Fr), Es = /* @__PURE__ */ T(ar), vs = /* @__PURE__ */ T(Pr), Ss = /* @__PURE__ */ T(mr), Ts = /* @__PURE__ */ T(xr), Rs = /* @__PURE__ */ T(qr), Os = /* @__PURE__ */ T($r), Ps = /* @__PURE__ */ T(cr), js = /* @__PURE__ */ T(pr), Ds = /* @__PURE__ */ T(gr), As = /* @__PURE__ */ T(Lr);
export {
  js as a,
  Ps as b,
  hs as c,
  bs as d,
  Rs as e,
  vs as f,
  Ss as g,
  Es as h,
  ws as i,
  Ts as j,
  ms as k,
  Os as l,
  ps as m,
  ys as n,
  ls as o,
  _s as p,
  gs as q,
  Ds as r,
  ds as s,
  fs as t,
  As as u
};
