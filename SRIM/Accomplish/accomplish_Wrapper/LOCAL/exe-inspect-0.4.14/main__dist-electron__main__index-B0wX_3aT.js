var Ld = Object.defineProperty;
var Hd = (r, e, t) => e in r ? Ld(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var b = (r, e, t) => Hd(r, typeof e != "symbol" ? e + "" : e, t);
import Dr, { EOL as $d } from "node:os";
import Bd, { inspect as Fd } from "node:util";
import rr from "node:process";
import { i as ec } from "./index-ChliSiZl.js";
import Mt from "http";
import cr from "https";
import dt from "crypto";
import lr from "buffer";
import Yi, { Readable as Wi } from "stream";
import Ar from "util";
import { b as zd, a as Qi, r as Ji } from "./index-Dp0jqBOM.js";
import { accessSync as qd, constants as qo, statSync as Gd, readFileSync as Vd } from "fs";
import jd from "path";
import Zi from "net";
import tc from "tls";
import Kd from "assert";
import nc from "url";
import Yd from "events";
import Ur from "node:http";
import xr from "node:https";
import Go from "node:zlib";
import { Transform as Wd } from "node:stream";
import { createPrivateKey as Qd, createHash as Vo } from "node:crypto";
import { readFile as Xi } from "node:fs/promises";
import rc from "child_process";
import Jd from "node:child_process";
(function() {
  try {
    var r = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, e = new r.Error().stack;
    e && (r._sentryDebugIds = r._sentryDebugIds || {}, r._sentryDebugIds[e] = "f75e6525-e42d-4e9a-abd1-76d2e3397666", r._sentryDebugIdIdentifier = "sentry-dbid-f75e6525-e42d-4e9a-abd1-76d2e3397666");
  } catch {
  }
})();
const ic = "4.13.0", bi = "04b07795-8ddb-461a-bbee-02f9e1bf7b46", Zd = "common";
var ki;
(function(r) {
  r.AzureChina = "https://login.chinacloudapi.cn", r.AzureGermany = "https://login.microsoftonline.de", r.AzureGovernment = "https://login.microsoftonline.us", r.AzurePublicCloud = "https://login.microsoftonline.com";
})(ki || (ki = {}));
const eo = ki.AzurePublicCloud, Xd = "login.microsoftonline.com", eu = ["*"];
let tu, nu;
function ru(r) {
  var t, n, i, o;
  const e = {
    cache: {},
    broker: {
      ...r.brokerOptions,
      isEnabled: ((t = r.brokerOptions) == null ? void 0 : t.enabled) ?? !1,
      enableMsaPassthrough: ((n = r.brokerOptions) == null ? void 0 : n.legacyEnableMsaPassthrough) ?? !1
    }
  };
  if ((i = r.tokenCachePersistenceOptions) != null && i.enabled)
    throw new Error([
      "Persistent token caching was requested, but no persistence provider was configured.",
      "You must install the identity-cache-persistence plugin package (`npm install --save @azure/identity-cache-persistence`)",
      "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
      "`useIdentityPlugin(cachePersistencePlugin)` before using `tokenCachePersistenceOptions`."
    ].join(" "));
  return (o = r.brokerOptions) != null && o.enabled && (e.broker.nativeBrokerPlugin = ou(r.isVSCodeCredential || !1)), e;
}
const jo = {
  missing: (r, e, t) => [
    `${r} was requested, but no plugin was configured or no authentication record was found.`,
    `You must install the ${e} plugin package (npm install --save ${e})`,
    "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
    `useIdentityPlugin(${t}) before using enableBroker.`
  ].join(" "),
  unavailable: (r, e) => [
    `${r} was requested, and the plugin is configured, but the broker is unavailable.`,
    `Ensure the ${r} plugin is properly installed and configured.`,
    "Check for missing native dependencies and ensure the package is properly installed.",
    `See the README for prerequisites on installing and using ${e}.`
  ].join(" ")
}, iu = {
  vsCode: {
    credentialName: "Visual Studio Code Credential",
    packageName: "@azure/identity-vscode",
    pluginVar: "vsCodePlugin",
    get brokerInfo() {
      return nu;
    }
  },
  native: {
    credentialName: "Broker for WAM",
    packageName: "@azure/identity-broker",
    pluginVar: "nativeBrokerPlugin",
    get brokerInfo() {
      return tu;
    }
  }
};
function ou(r) {
  const { credentialName: e, packageName: t, pluginVar: n, brokerInfo: i } = iu[r ? "vsCode" : "native"];
  if (i === void 0)
    throw new Error(jo.missing(e, t, n));
  if (i.broker.isBrokerAvailable === !1)
    throw new Error(jo.unavailable(e, t));
  return i.broker;
}
const su = {
  generatePluginConfiguration: ru
};
function au(r) {
  return r && typeof r.error == "string" && typeof r.error_description == "string";
}
const cu = "CredentialUnavailableError";
class L extends Error {
  constructor(e, t) {
    super(e, t), this.name = cu;
  }
}
const oc = "AuthenticationError";
class sc extends Error {
  constructor(t, n, i) {
    let o = {
      error: "unknown",
      errorDescription: "An unknown error occurred and no additional details are available."
    };
    if (au(n))
      o = Ko(n);
    else if (typeof n == "string")
      try {
        const s = JSON.parse(n);
        o = Ko(s);
      } catch {
        t === 400 ? o = {
          error: "invalid_request",
          errorDescription: `The service indicated that the request was invalid.

${n}`
        } : o = {
          error: "unknown_error",
          errorDescription: `An unknown error has occurred. Response body:

${n}`
        };
      }
    else
      o = {
        error: "unknown_error",
        errorDescription: "An unknown error occurred and no additional details are available."
      };
    super(`${o.error} Status code: ${t}
More details:
${o.errorDescription},`, i);
    /**
     * The HTTP status code returned from the authentication request.
     */
    b(this, "statusCode");
    /**
     * The error response details.
     */
    b(this, "errorResponse");
    this.statusCode = t, this.errorResponse = o, this.name = oc;
  }
}
const lu = "AggregateAuthenticationError";
class du extends Error {
  constructor(t, n) {
    const i = t.join(`
`);
    super(`${n}
${i}`);
    /**
     * The array of error objects that were thrown while trying to authenticate
     * with the credentials in a {@link ChainedTokenCredential}.
     */
    b(this, "errors");
    this.errors = t, this.name = lu;
  }
}
function Ko(r) {
  return {
    error: r.error,
    errorDescription: r.error_description,
    correlationId: r.correlation_id,
    errorCodes: r.error_codes,
    timestamp: r.timestamp,
    traceId: r.trace_id
  };
}
class Dt extends Error {
  constructor(t) {
    super(t.message, t.cause ? { cause: t.cause } : void 0);
    /**
     * The list of scopes for which the token will have access.
     */
    b(this, "scopes");
    /**
     * The options passed to the getToken request.
     */
    b(this, "getTokenOptions");
    this.scopes = t.scopes, this.getTokenOptions = t.getTokenOptions, this.name = "AuthenticationRequiredError";
  }
}
function uu(r, ...e) {
  rr.stderr.write(`${Bd.format(r, ...e)}${$d}`);
}
const Yo = typeof process < "u" && process.env && process.env.DEBUG || void 0;
let ac, vi = [], Oi = [];
const dr = [];
Yo && to(Yo);
const Ot = Object.assign((r) => cc(r), {
  enable: to,
  enabled: no,
  disable: hu,
  log: uu
});
function to(r) {
  ac = r, vi = [], Oi = [];
  const e = r.split(",").map((t) => t.trim());
  for (const t of e)
    t.startsWith("-") ? Oi.push(t.substring(1)) : vi.push(t);
  for (const t of dr)
    t.enabled = no(t.namespace);
}
function no(r) {
  if (r.endsWith("*"))
    return !0;
  for (const e of Oi)
    if (Wo(r, e))
      return !1;
  for (const e of vi)
    if (Wo(r, e))
      return !0;
  return !1;
}
function Wo(r, e) {
  if (e.indexOf("*") === -1)
    return r === e;
  let t = e;
  if (e.indexOf("**") !== -1) {
    const f = [];
    let p = "";
    for (const h of e)
      h === "*" && p === "*" || (p = h, f.push(h));
    t = f.join("");
  }
  let n = 0, i = 0;
  const o = t.length, s = r.length;
  let a = -1, c = -1;
  for (; n < s && i < o; )
    if (t[i] === "*") {
      if (a = i, i++, i === o)
        return !0;
      for (; r[n] !== t[i]; )
        if (n++, n === s)
          return !1;
      c = n, n++, i++;
      continue;
    } else if (t[i] === r[n])
      i++, n++;
    else if (a >= 0) {
      if (i = a + 1, n = c + 1, n === s)
        return !1;
      for (; r[n] !== t[i]; )
        if (n++, n === s)
          return !1;
      c = n, n++, i++;
      continue;
    } else
      return !1;
  const l = n === r.length, u = i === t.length, d = i === t.length - 1 && t[i] === "*";
  return l && (u || d);
}
function hu() {
  const r = ac || "";
  return to(""), r;
}
function cc(r) {
  const e = Object.assign(t, {
    enabled: no(r),
    destroy: fu,
    log: Ot.log,
    namespace: r,
    extend: gu
  });
  function t(...n) {
    e.enabled && (n.length > 0 && (n[0] = `${r} ${n[0]}`), e.log(...n));
  }
  return dr.push(e), e;
}
function fu() {
  const r = dr.indexOf(this);
  return r >= 0 ? (dr.splice(r, 1), !0) : !1;
}
function gu(r) {
  const e = cc(`${this.namespace}:${r}`);
  return e.log = this.log, e;
}
const Pi = ["verbose", "info", "warning", "error"], Qo = {
  verbose: 400,
  info: 300,
  warning: 200,
  error: 100
};
function Jo(r, e) {
  e.log = (...t) => {
    r.log(...t);
  };
}
function Zo(r) {
  return Pi.includes(r);
}
function lc(r) {
  const e = /* @__PURE__ */ new Set(), t = typeof process < "u" && process.env && process.env[r.logLevelEnvVarName] || void 0;
  let n;
  const i = Ot(r.namespace);
  i.log = (...u) => {
    Ot.log(...u);
  };
  function o(u) {
    if (u && !Zo(u))
      throw new Error(`Unknown log level '${u}'. Acceptable values: ${Pi.join(",")}`);
    n = u;
    const d = [];
    for (const f of e)
      s(f) && d.push(f.namespace);
    Ot.enable(d.join(","));
  }
  t && (Zo(t) ? o(t) : console.error(`${r.logLevelEnvVarName} set to unknown log level '${t}'; logging is not enabled. Acceptable values: ${Pi.join(", ")}.`));
  function s(u) {
    return !!(n && Qo[u.level] <= Qo[n]);
  }
  function a(u, d) {
    const f = Object.assign(u.extend(d), {
      level: d
    });
    if (Jo(u, f), s(f)) {
      const p = Ot.disable();
      Ot.enable(p + "," + f.namespace);
    }
    return e.add(f), f;
  }
  function c() {
    return n;
  }
  function l(u) {
    const d = i.extend(u);
    return Jo(i, d), {
      error: a(d, "error"),
      warning: a(d, "warning"),
      info: a(d, "info"),
      verbose: a(d, "verbose")
    };
  }
  return {
    setLogLevel: o,
    getLogLevel: c,
    createClientLogger: l,
    logger: i
  };
}
const pu = lc({
  logLevelEnvVarName: "TYPESPEC_RUNTIME_LOG_LEVEL",
  namespace: "typeSpecRuntime"
});
function dc(r) {
  return pu.createClientLogger(r);
}
const uc = lc({
  logLevelEnvVarName: "AZURE_LOG_LEVEL",
  namespace: "azure"
});
function hc() {
  return uc.getLogLevel();
}
function Cr(r) {
  return uc.createClientLogger(r);
}
const Me = Cr("identity");
function fc(r) {
  return r.reduce((e, t) => (process.env[t] ? e.assigned.push(t) : e.missing.push(t), e), { missing: [], assigned: [] });
}
function ke(r) {
  return `SUCCESS. Scopes: ${Array.isArray(r) ? r.join(", ") : r}.`;
}
function J(r, e) {
  let t = "ERROR.";
  return r != null && r.length && (t += ` Scopes: ${Array.isArray(r) ? r.join(", ") : r}.`), `${t} Error message: ${typeof e == "string" ? e : e.message}.`;
}
function Xo(r, e, t = Me) {
  const n = e ? `${e.fullTitle} ${r}` : r;
  function i(c) {
    t.info(`${n} =>`, c);
  }
  function o(c) {
    t.warning(`${n} =>`, c);
  }
  function s(c) {
    t.verbose(`${n} =>`, c);
  }
  function a(c) {
    t.error(`${n} =>`, c);
  }
  return {
    title: r,
    fullTitle: n,
    info: i,
    warning: o,
    verbose: s,
    error: a
  };
}
function X(r, e = Me) {
  const t = Xo(r, void 0, e);
  return {
    ...t,
    parent: e,
    getToken: Xo("=> getToken()", t, e)
  };
}
const Sn = {
  span: Symbol.for("@azure/core-tracing span"),
  namespace: Symbol.for("@azure/core-tracing namespace")
};
function mu(r = {}) {
  let e = new wn(r.parentContext);
  return r.span && (e = e.setValue(Sn.span, r.span)), r.namespace && (e = e.setValue(Sn.namespace, r.namespace)), e;
}
class wn {
  constructor(e) {
    b(this, "_contextMap");
    this._contextMap = e instanceof wn ? new Map(e._contextMap) : /* @__PURE__ */ new Map();
  }
  setValue(e, t) {
    const n = new wn(this);
    return n._contextMap.set(e, t), n;
  }
  getValue(e) {
    return this._contextMap.get(e);
  }
  deleteValue(e) {
    const t = new wn(this);
    return t._contextMap.delete(e), t;
  }
}
var en = {}, es;
function yu() {
  return es || (es = 1, Object.defineProperty(en, "__esModule", { value: !0 }), en.state = void 0, en.state = {
    instrumenterImplementation: void 0
  }), en;
}
var Tu = yu();
const Lr = Tu.state;
function Eu() {
  return {
    end: () => {
    },
    isRecording: () => !1,
    recordException: () => {
    },
    setAttribute: () => {
    },
    setStatus: () => {
    },
    addEvent: () => {
    }
  };
}
function Au() {
  return {
    createRequestHeaders: () => ({}),
    parseTraceparentHeader: () => {
    },
    startSpan: (r, e) => ({
      span: Eu(),
      tracingContext: mu({ parentContext: e.tracingContext })
    }),
    withContext(r, e, ...t) {
      return e(...t);
    }
  };
}
function Gn() {
  return Lr.instrumenterImplementation || (Lr.instrumenterImplementation = Au()), Lr.instrumenterImplementation;
}
function gc(r) {
  const { namespace: e, packageName: t, packageVersion: n } = r;
  function i(l, u, d) {
    var T;
    const f = Gn().startSpan(l, {
      ...d,
      packageName: t,
      packageVersion: n,
      tracingContext: (T = u == null ? void 0 : u.tracingOptions) == null ? void 0 : T.tracingContext
    });
    let p = f.tracingContext;
    const h = f.span;
    p.getValue(Sn.namespace) || (p = p.setValue(Sn.namespace, e)), h.setAttribute("az.namespace", p.getValue(Sn.namespace));
    const y = Object.assign({}, u, {
      tracingOptions: { ...u == null ? void 0 : u.tracingOptions, tracingContext: p }
    });
    return {
      span: h,
      updatedOptions: y
    };
  }
  async function o(l, u, d, f) {
    const { span: p, updatedOptions: h } = i(l, u, f);
    try {
      const y = await s(h.tracingOptions.tracingContext, () => Promise.resolve(d(h, p)));
      return p.setStatus({ status: "success" }), y;
    } catch (y) {
      throw p.setStatus({ status: "error", error: y }), y;
    } finally {
      p.end();
    }
  }
  function s(l, u, ...d) {
    return Gn().withContext(l, u, ...d);
  }
  function a(l) {
    return Gn().parseTraceparentHeader(l);
  }
  function c(l) {
    return Gn().createRequestHeaders(l);
  }
  return {
    startSpan: i,
    withSpan: o,
    withContext: s,
    parseTraceparentHeader: a,
    createRequestHeaders: c
  };
}
const Re = gc({
  namespace: "Microsoft.AAD",
  packageName: "@azure/identity",
  packageVersion: ic
}), Hr = X("ChainedTokenCredential");
class Cu {
  /**
   * Creates an instance of ChainedTokenCredential using the given credentials.
   *
   * @param sources - `TokenCredential` implementations to be tried in order.
   *
   * Example usage:
   * ```ts snippet:chained_token_credential_example
   * import { ClientSecretCredential, ChainedTokenCredential } from "@azure/identity";
   *
   * const tenantId = "<tenant-id>";
   * const clientId = "<client-id>";
   * const clientSecret = "<client-secret>";
   * const anotherClientId = "<another-client-id>";
   * const anotherSecret = "<another-client-secret>";
   *
   * const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
   * const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
   *
   * const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
   * ```
   */
  constructor(...e) {
    b(this, "_sources", []);
    this._sources = e;
  }
  /**
   * Returns the first access token returned by one of the chained
   * `TokenCredential` implementations.  Throws an {@link AggregateAuthenticationError}
   * when one or more credentials throws an {@link AuthenticationError} and
   * no credentials have returned an access token.
   *
   * This method is called automatically by Azure SDK client libraries. You may call this method
   * directly, but you must also handle token caching and token refreshing.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                `TokenCredential` implementation might make.
   */
  async getToken(e, t = {}) {
    const { token: n } = await this.getTokenInternal(e, t);
    return n;
  }
  async getTokenInternal(e, t = {}) {
    let n = null, i;
    const o = [];
    return Re.withSpan("ChainedTokenCredential.getToken", t, async (s) => {
      for (let a = 0; a < this._sources.length && n === null; a++)
        try {
          n = await this._sources[a].getToken(e, s), i = this._sources[a];
        } catch (c) {
          if (c.name === "CredentialUnavailableError" || c.name === "AuthenticationRequiredError")
            o.push(c);
          else
            throw Hr.getToken.info(J(e, c)), c;
        }
      if (!n && o.length > 0) {
        const a = new du(o, "ChainedTokenCredential authentication failed.");
        throw Hr.getToken.info(J(e, a)), a;
      }
      if (Hr.getToken.info(`Result for ${i.constructor.name}: ${ke(e)}`), n === null)
        throw new L("Failed to retrieve a valid token");
      return { token: n, successfulCredential: i };
    });
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class pc {
  /**
   * serialize the JSON blob
   * @param data - JSON blob cache
   */
  static serializeJSONBlob(e) {
    return JSON.stringify(e);
  }
  /**
   * Serialize Accounts
   * @param accCache - cache of accounts
   */
  static serializeAccounts(e) {
    const t = {};
    return Object.keys(e).map(function(n) {
      var o;
      const i = e[n];
      t[n] = {
        home_account_id: i.homeAccountId,
        environment: i.environment,
        realm: i.realm,
        local_account_id: i.localAccountId,
        username: i.username,
        authority_type: i.authorityType,
        name: i.name,
        client_info: i.clientInfo,
        last_modification_time: i.lastModificationTime,
        last_modification_app: i.lastModificationApp,
        tenantProfiles: (o = i.tenantProfiles) == null ? void 0 : o.map((s) => JSON.stringify(s))
      };
    }), t;
  }
  /**
   * Serialize IdTokens
   * @param idTCache - cache of ID tokens
   */
  static serializeIdTokens(e) {
    const t = {};
    return Object.keys(e).map(function(n) {
      const i = e[n];
      t[n] = {
        home_account_id: i.homeAccountId,
        environment: i.environment,
        credential_type: i.credentialType,
        client_id: i.clientId,
        secret: i.secret,
        realm: i.realm
      };
    }), t;
  }
  /**
   * Serializes AccessTokens
   * @param atCache - cache of access tokens
   */
  static serializeAccessTokens(e) {
    const t = {};
    return Object.keys(e).map(function(n) {
      const i = e[n];
      t[n] = {
        home_account_id: i.homeAccountId,
        environment: i.environment,
        credential_type: i.credentialType,
        client_id: i.clientId,
        secret: i.secret,
        realm: i.realm,
        target: i.target,
        cached_at: i.cachedAt,
        expires_on: i.expiresOn,
        extended_expires_on: i.extendedExpiresOn,
        refresh_on: i.refreshOn,
        key_id: i.keyId,
        token_type: i.tokenType,
        requestedClaims: i.requestedClaims,
        requestedClaimsHash: i.requestedClaimsHash,
        userAssertionHash: i.userAssertionHash
      };
    }), t;
  }
  /**
   * Serialize refreshTokens
   * @param rtCache - cache of refresh tokens
   */
  static serializeRefreshTokens(e) {
    const t = {};
    return Object.keys(e).map(function(n) {
      const i = e[n];
      t[n] = {
        home_account_id: i.homeAccountId,
        environment: i.environment,
        credential_type: i.credentialType,
        client_id: i.clientId,
        secret: i.secret,
        family_id: i.familyId,
        target: i.target,
        realm: i.realm
      };
    }), t;
  }
  /**
   * Serialize amdtCache
   * @param amdtCache - cache of app metadata
   */
  static serializeAppMetadata(e) {
    const t = {};
    return Object.keys(e).map(function(n) {
      const i = e[n];
      t[n] = {
        client_id: i.clientId,
        environment: i.environment,
        family_id: i.familyId
      };
    }), t;
  }
  /**
   * Serialize the cache
   * @param inMemCache - itemised cache read from the JSON
   */
  static serializeAllCache(e) {
    return {
      Account: this.serializeAccounts(e.accounts),
      IdToken: this.serializeIdTokens(e.idTokens),
      AccessToken: this.serializeAccessTokens(e.accessTokens),
      RefreshToken: this.serializeRefreshTokens(e.refreshTokens),
      AppMetadata: this.serializeAppMetadata(e.appMetadata)
    };
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const w = {
  LIBRARY_NAME: "MSAL.JS",
  SKU: "msal.js.common",
  // default authority
  DEFAULT_AUTHORITY: "https://login.microsoftonline.com/common/",
  DEFAULT_AUTHORITY_HOST: "login.microsoftonline.com",
  DEFAULT_COMMON_TENANT: "common",
  // ADFS String
  ADFS: "adfs",
  DSTS: "dstsv2",
  // Default AAD Instance Discovery Endpoint
  AAD_INSTANCE_DISCOVERY_ENDPT: "https://login.microsoftonline.com/common/discovery/instance?api-version=1.1&authorization_endpoint=",
  // CIAM URL
  CIAM_AUTH_URL: ".ciamlogin.com",
  AAD_TENANT_DOMAIN_SUFFIX: ".onmicrosoft.com",
  // Resource delimiter - used for certain cache entries
  RESOURCE_DELIM: "|",
  // Placeholder for non-existent account ids/objects
  NO_ACCOUNT: "NO_ACCOUNT",
  // Claims
  CLAIMS: "claims",
  // Consumer UTID
  CONSUMER_UTID: "9188040d-6c67-4c5b-b112-36a304b66dad",
  // Default scopes
  OPENID_SCOPE: "openid",
  PROFILE_SCOPE: "profile",
  OFFLINE_ACCESS_SCOPE: "offline_access",
  EMAIL_SCOPE: "email",
  CODE_GRANT_TYPE: "authorization_code",
  RT_GRANT_TYPE: "refresh_token",
  S256_CODE_CHALLENGE_METHOD: "S256",
  URL_FORM_CONTENT_TYPE: "application/x-www-form-urlencoded;charset=utf-8",
  AUTHORIZATION_PENDING: "authorization_pending",
  NOT_DEFINED: "not_defined",
  EMPTY_STRING: "",
  NOT_APPLICABLE: "N/A",
  NOT_AVAILABLE: "Not Available",
  FORWARD_SLASH: "/",
  IMDS_ENDPOINT: "http://169.254.169.254/metadata/instance/compute/location",
  IMDS_VERSION: "2020-06-01",
  IMDS_TIMEOUT: 2e3,
  AZURE_REGION_AUTO_DISCOVER_FLAG: "TryAutoDetect",
  REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: "login.microsoft.com",
  KNOWN_PUBLIC_CLOUDS: [
    "login.microsoftonline.com",
    "login.windows.net",
    "login.microsoft.com",
    "sts.windows.net"
  ],
  SHR_NONCE_VALIDITY: 240,
  INVALID_INSTANCE: "invalid_instance"
}, G = {
  SUCCESS: 200,
  SUCCESS_RANGE_START: 200,
  SUCCESS_RANGE_END: 299,
  REDIRECT: 302,
  CLIENT_ERROR: 400,
  CLIENT_ERROR_RANGE_START: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  GONE: 410,
  TOO_MANY_REQUESTS: 429,
  CLIENT_ERROR_RANGE_END: 499,
  SERVER_ERROR: 500,
  SERVER_ERROR_RANGE_START: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  SERVER_ERROR_RANGE_END: 599,
  MULTI_SIDED_ERROR: 600
}, je = [
  w.OPENID_SCOPE,
  w.PROFILE_SCOPE,
  w.OFFLINE_ACCESS_SCOPE
], ts = [...je, w.EMAIL_SCOPE], ae = {
  CONTENT_TYPE: "Content-Type",
  CONTENT_LENGTH: "Content-Length",
  RETRY_AFTER: "Retry-After",
  CCS_HEADER: "X-AnchorMailbox",
  WWWAuthenticate: "WWW-Authenticate",
  AuthenticationInfo: "Authentication-Info",
  X_MS_REQUEST_ID: "x-ms-request-id",
  X_MS_HTTP_VERSION: "x-ms-httpver"
}, Ke = {
  COMMON: "common",
  ORGANIZATIONS: "organizations",
  CONSUMERS: "consumers"
}, Vn = {
  ACCESS_TOKEN: "access_token",
  XMS_CC: "xms_cc"
}, $r = {
  SELECT_ACCOUNT: "select_account",
  NONE: "none"
}, _u = {
  PLAIN: "plain",
  S256: "S256"
}, mc = {
  CODE: "code",
  IDTOKEN_TOKEN: "id_token token"
}, ro = {
  QUERY: "query",
  FRAGMENT: "fragment",
  FORM_POST: "form_post"
}, Vt = {
  AUTHORIZATION_CODE_GRANT: "authorization_code",
  CLIENT_CREDENTIALS_GRANT: "client_credentials",
  RESOURCE_OWNER_PASSWORD_GRANT: "password",
  REFRESH_TOKEN_GRANT: "refresh_token",
  DEVICE_CODE_GRANT: "device_code",
  JWT_BEARER: "urn:ietf:params:oauth:grant-type:jwt-bearer"
}, jn = {
  MSSTS_ACCOUNT_TYPE: "MSSTS",
  ADFS_ACCOUNT_TYPE: "ADFS",
  GENERIC_ACCOUNT_TYPE: "Generic"
  // NTLM, Kerberos, FBA, Basic etc
}, Mn = {
  CACHE_KEY_SEPARATOR: "-",
  CLIENT_INFO_SEPARATOR: "."
}, ee = {
  ID_TOKEN: "IdToken",
  ACCESS_TOKEN: "AccessToken",
  ACCESS_TOKEN_WITH_AUTH_SCHEME: "AccessToken_With_AuthScheme",
  REFRESH_TOKEN: "RefreshToken"
}, io = "appmetadata", Iu = "client_info", ur = "1", hr = {
  CACHE_KEY: "authority-metadata",
  REFRESH_TIME_SECONDS: 3600 * 24
  // 24 Hours
}, _e = {
  CONFIG: "config",
  CACHE: "cache",
  NETWORK: "network",
  HARDCODED_VALUES: "hardcoded_values"
}, se = {
  SCHEMA_VERSION: 5,
  MAX_LAST_HEADER_BYTES: 330,
  MAX_CACHED_ERRORS: 50,
  CACHE_KEY: "server-telemetry",
  CATEGORY_SEPARATOR: "|",
  VALUE_SEPARATOR: ",",
  OVERFLOW_TRUE: "1",
  OVERFLOW_FALSE: "0",
  UNKNOWN_ERROR: "unknown_error"
}, Q = {
  BEARER: "Bearer",
  POP: "pop",
  SSH: "ssh-cert"
}, Rn = {
  // Default time to throttle RequestThumbprint in seconds
  DEFAULT_THROTTLE_TIME_SECONDS: 60,
  // Default maximum time to throttle in seconds, overrides what the server sends back
  DEFAULT_MAX_THROTTLE_TIME_SECONDS: 3600,
  // Prefix for storing throttling entries
  THROTTLING_PREFIX: "throttling",
  // Value assigned to the x-ms-lib-capability header to indicate to the server the library supports throttling
  X_MS_LIB_CAPABILITY_VALUE: "retry-after, h429"
}, ns = {
  INVALID_GRANT_ERROR: "invalid_grant",
  CLIENT_MISMATCH_ERROR: "client_mismatch"
}, yc = {
  username: "username",
  password: "password"
}, bt = {
  FAILED_AUTO_DETECTION: "1",
  INTERNAL_CACHE: "2",
  ENVIRONMENT_VARIABLE: "3",
  IMDS: "4"
}, Br = {
  CONFIGURED_NO_AUTO_DETECTION: "2",
  AUTO_DETECTION_REQUESTED_SUCCESSFUL: "4",
  AUTO_DETECTION_REQUESTED_FAILED: "5"
}, oe = {
  // When a token is found in the cache or the cache is not supposed to be hit when making the request
  NOT_APPLICABLE: "0",
  // When the token request goes to the identity provider because force_refresh was set to true. Also occurs if claims were requested
  FORCE_REFRESH_OR_CLAIMS: "1",
  // When the token request goes to the identity provider because no cached access token exists
  NO_CACHED_ACCESS_TOKEN: "2",
  // When the token request goes to the identity provider because cached access token expired
  CACHED_ACCESS_TOKEN_EXPIRED: "3",
  // When the token request goes to the identity provider because refresh_in was used and the existing token needs to be refreshed
  PROACTIVELY_REFRESHED: "4"
}, Tc = 300, Ye = {
  BASE64: "base64",
  HEX: "hex",
  UTF8: "utf-8"
};
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Su = "unexpected_error", Ec = "post_request_failed";
/*! @azure/msal-common v15.14.1 2026-01-17 */
const rs = {
  [Su]: "Unexpected error in authentication.",
  [Ec]: "Post request failed from the network, could be a 4xx/5xx or a network unavailability. Please check the exact error code for details."
};
class Z extends Error {
  constructor(e, t, n) {
    const i = t ? `${e}: ${t}` : e;
    super(i), Object.setPrototypeOf(this, Z.prototype), this.errorCode = e || w.EMPTY_STRING, this.errorMessage = t || w.EMPTY_STRING, this.subError = n || w.EMPTY_STRING, this.name = "AuthError";
  }
  setCorrelationId(e) {
    this.correlationId = e;
  }
}
function wu(r, e) {
  return new Z(r, e ? `${rs[r]} ${e}` : rs[r]);
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const oo = "client_info_decoding_error", Ac = "client_info_empty_error", so = "token_parsing_error", Cc = "null_or_empty_token", Ge = "endpoints_resolution_error", _r = "network_error", _c = "openid_config_error", Ic = "hash_not_deserialized", Ni = "invalid_state", Sc = "state_mismatch", Ru = "state_not_found", wc = "nonce_mismatch", ao = "auth_time_not_found", Rc = "max_age_transpired", co = "multiple_matching_tokens", bu = "multiple_matching_accounts", bc = "multiple_matching_appMetadata", kc = "request_cannot_be_made", vc = "cannot_remove_empty_scope", Oc = "cannot_append_scopeset", Mi = "empty_input_scopeset", Pc = "device_code_polling_cancelled", Nc = "device_code_expired", Mc = "device_code_unknown_error", lo = "no_account_in_silent_request", Dc = "invalid_cache_record", uo = "invalid_cache_environment", ku = "no_account_found", Di = "no_crypto_object", vu = "unexpected_credential_type", Uc = "invalid_assertion", Ui = "invalid_client_credential", yt = "token_refresh_required", xc = "user_timeout_reached", Lc = "token_claims_cnf_required_for_signedjwt", Ou = "authorization_code_missing_from_server_response", Pu = "binding_key_not_removed", Hc = "end_session_endpoint_not_supported", $c = "key_id_missing", Nu = "no_network_connectivity", Mu = "user_canceled", Bc = "missing_tenant_id_error", q = "method_not_implemented", Du = "nested_app_auth_bridge_disabled", Uu = "platform_broker_error";
/*! @azure/msal-common v15.14.1 2026-01-17 */
const is = {
  [oo]: "The client info could not be parsed/decoded correctly",
  [Ac]: "The client info was empty",
  [so]: "Token cannot be parsed",
  [Cc]: "The token is null or empty",
  [Ge]: "Endpoints cannot be resolved",
  [_r]: "Network request failed",
  [_c]: "Could not retrieve endpoints. Check your authority and verify the .well-known/openid-configuration endpoint returns the required endpoints.",
  [Ic]: "The hash parameters could not be deserialized",
  [Ni]: "State was not the expected format",
  [Sc]: "State mismatch error",
  [Ru]: "State not found",
  [wc]: "Nonce mismatch error",
  [ao]: "Max Age was requested and the ID token is missing the auth_time variable. auth_time is an optional claim and is not enabled by default - it must be enabled. See https://aka.ms/msaljs/optional-claims for more information.",
  [Rc]: "Max Age is set to 0, or too much time has elapsed since the last end-user authentication.",
  [co]: "The cache contains multiple tokens satisfying the requirements. Call AcquireToken again providing more requirements such as authority or account.",
  [bu]: "The cache contains multiple accounts satisfying the given parameters. Please pass more info to obtain the correct account",
  [bc]: "The cache contains multiple appMetadata satisfying the given parameters. Please pass more info to obtain the correct appMetadata",
  [kc]: "Token request cannot be made without authorization code or refresh token.",
  [vc]: "Cannot remove null or empty scope from ScopeSet",
  [Oc]: "Cannot append ScopeSet",
  [Mi]: "Empty input ScopeSet cannot be processed",
  [Pc]: "Caller has cancelled token endpoint polling during device code flow by setting DeviceCodeRequest.cancel = true.",
  [Nc]: "Device code is expired.",
  [Mc]: "Device code stopped polling for unknown reasons.",
  [lo]: "Please pass an account object, silent flow is not supported without account information",
  [Dc]: "Cache record object was null or undefined.",
  [uo]: "Invalid environment when attempting to create cache entry",
  [ku]: "No account found in cache for given key.",
  [Di]: "No crypto object detected.",
  [vu]: "Unexpected credential type.",
  [Uc]: "Client assertion must meet requirements described in https://tools.ietf.org/html/rfc7515",
  [Ui]: "Client credential (secret, certificate, or assertion) must not be empty when creating a confidential client. An application should at most have one credential",
  [yt]: "Cannot return token from cache because it must be refreshed. This may be due to one of the following reasons: forceRefresh parameter is set to true, claims have been requested, there is no cached access token or it is expired.",
  [xc]: "User defined timeout for device code polling reached",
  [Lc]: "Cannot generate a POP jwt if the token_claims are not populated",
  [Ou]: "Server response does not contain an authorization code to proceed",
  [Pu]: "Could not remove the credential's binding key from storage.",
  [Hc]: "The provided authority does not support logout",
  [$c]: "A keyId value is missing from the requested bound token's cache record and is required to match the token to it's stored binding key.",
  [Nu]: "No network connectivity. Check your internet connection.",
  [Mu]: "User cancelled the flow.",
  [Bc]: "A tenant id - not common, organizations, or consumers - must be specified when using the client_credentials flow.",
  [q]: "This method has not been implemented",
  [Du]: "The nested app auth bridge is disabled",
  [Uu]: "An error occurred in the native broker. See the platformBrokerError property for details."
};
class Ir extends Z {
  constructor(e, t) {
    super(e, t ? `${is[e]}: ${t}` : is[e]), this.name = "ClientAuthError", Object.setPrototypeOf(this, Ir.prototype);
  }
}
function N(r, e) {
  return new Ir(r, e);
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const xi = {
  createNewGuid: () => {
    throw N(q);
  },
  base64Decode: () => {
    throw N(q);
  },
  base64Encode: () => {
    throw N(q);
  },
  base64UrlEncode: () => {
    throw N(q);
  },
  encodeKid: () => {
    throw N(q);
  },
  async getPublicKeyThumbprint() {
    throw N(q);
  },
  async removeTokenBindingKey() {
    throw N(q);
  },
  async clearKeystore() {
    throw N(q);
  },
  async signJwt() {
    throw N(q);
  },
  async hashString() {
    throw N(q);
  }
};
/*! @azure/msal-common v15.14.1 2026-01-17 */
var W;
(function(r) {
  r[r.Error = 0] = "Error", r[r.Warning = 1] = "Warning", r[r.Info = 2] = "Info", r[r.Verbose = 3] = "Verbose", r[r.Trace = 4] = "Trace";
})(W || (W = {}));
class it {
  constructor(e, t, n) {
    this.level = W.Info;
    const i = () => {
    }, o = e || it.createDefaultLoggerOptions();
    this.localCallback = o.loggerCallback || i, this.piiLoggingEnabled = o.piiLoggingEnabled || !1, this.level = typeof o.logLevel == "number" ? o.logLevel : W.Info, this.correlationId = o.correlationId || w.EMPTY_STRING, this.packageName = t || w.EMPTY_STRING, this.packageVersion = n || w.EMPTY_STRING;
  }
  static createDefaultLoggerOptions() {
    return {
      loggerCallback: () => {
      },
      piiLoggingEnabled: !1,
      logLevel: W.Info
    };
  }
  /**
   * Create new Logger with existing configurations.
   */
  clone(e, t, n) {
    return new it({
      loggerCallback: this.localCallback,
      piiLoggingEnabled: this.piiLoggingEnabled,
      logLevel: this.level,
      correlationId: n || this.correlationId
    }, e, t);
  }
  /**
   * Log message with required options.
   */
  logMessage(e, t) {
    if (t.logLevel > this.level || !this.piiLoggingEnabled && t.containsPii)
      return;
    const o = `${`[${(/* @__PURE__ */ new Date()).toUTCString()}] : [${t.correlationId || this.correlationId || ""}]`} : ${this.packageName}@${this.packageVersion} : ${W[t.logLevel]} - ${e}`;
    this.executeCallback(t.logLevel, o, t.containsPii || !1);
  }
  /**
   * Execute callback with message.
   */
  executeCallback(e, t, n) {
    this.localCallback && this.localCallback(e, t, n);
  }
  /**
   * Logs error messages.
   */
  error(e, t) {
    this.logMessage(e, {
      logLevel: W.Error,
      containsPii: !1,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Logs error messages with PII.
   */
  errorPii(e, t) {
    this.logMessage(e, {
      logLevel: W.Error,
      containsPii: !0,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Logs warning messages.
   */
  warning(e, t) {
    this.logMessage(e, {
      logLevel: W.Warning,
      containsPii: !1,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Logs warning messages with PII.
   */
  warningPii(e, t) {
    this.logMessage(e, {
      logLevel: W.Warning,
      containsPii: !0,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Logs info messages.
   */
  info(e, t) {
    this.logMessage(e, {
      logLevel: W.Info,
      containsPii: !1,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Logs info messages with PII.
   */
  infoPii(e, t) {
    this.logMessage(e, {
      logLevel: W.Info,
      containsPii: !0,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Logs verbose messages.
   */
  verbose(e, t) {
    this.logMessage(e, {
      logLevel: W.Verbose,
      containsPii: !1,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Logs verbose messages with PII.
   */
  verbosePii(e, t) {
    this.logMessage(e, {
      logLevel: W.Verbose,
      containsPii: !0,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Logs trace messages.
   */
  trace(e, t) {
    this.logMessage(e, {
      logLevel: W.Trace,
      containsPii: !1,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Logs trace messages with PII.
   */
  tracePii(e, t) {
    this.logMessage(e, {
      logLevel: W.Trace,
      containsPii: !0,
      correlationId: t || w.EMPTY_STRING
    });
  }
  /**
   * Returns whether PII Logging is enabled or not.
   */
  isPiiLoggingEnabled() {
    return this.piiLoggingEnabled || !1;
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Fc = "@azure/msal-common", ho = "15.14.1";
/*! @azure/msal-common v15.14.1 2026-01-17 */
const fo = {
  // AzureCloudInstance is not specified.
  None: "none"
};
/*! @azure/msal-common v15.14.1 2026-01-17 */
const zc = "redirect_uri_empty", xu = "claims_request_parsing_error", qc = "authority_uri_insecure", En = "url_parse_error", go = "empty_url_error", Gc = "empty_input_scopes_error", po = "invalid_claims", Vc = "token_request_empty", jc = "logout_request_empty", Lu = "invalid_code_challenge_method", Kc = "pkce_params_missing", mo = "invalid_cloud_discovery_metadata", Yc = "invalid_authority_metadata", Wc = "untrusted_authority", yo = "missing_ssh_jwk", Hu = "missing_ssh_kid", $u = "missing_nonce_authentication_header", Bu = "invalid_authentication_header", Fu = "cannot_set_OIDCOptions", zu = "cannot_allow_platform_broker", qu = "authority_mismatch", Gu = "invalid_request_method_for_EAR", Vu = "invalid_authorize_post_body_parameters", ju = "invalid_platform_broker_configuration";
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Ku = {
  [zc]: "A redirect URI is required for all calls, and none has been set.",
  [xu]: "Could not parse the given claims request object.",
  [qc]: "Authority URIs must use https.  Please see here for valid authority configuration options: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications#configuration-options",
  [En]: "URL could not be parsed into appropriate segments.",
  [go]: "URL was empty or null.",
  [Gc]: "Scopes cannot be passed as null, undefined or empty array because they are required to obtain an access token.",
  [po]: "Given claims parameter must be a stringified JSON object.",
  [Vc]: "Token request was empty and not found in cache.",
  [jc]: "The logout request was null or undefined.",
  [Lu]: 'code_challenge_method passed is invalid. Valid values are "plain" and "S256".',
  [Kc]: "Both params: code_challenge and code_challenge_method are to be passed if to be sent in the request",
  [mo]: "Invalid cloudDiscoveryMetadata provided. Must be a stringified JSON object containing tenant_discovery_endpoint and metadata fields",
  [Yc]: "Invalid authorityMetadata provided. Must by a stringified JSON object containing authorization_endpoint, token_endpoint, issuer fields.",
  [Wc]: "The provided authority is not a trusted authority. Please include this authority in the knownAuthorities config parameter.",
  [yo]: "Missing sshJwk in SSH certificate request. A stringified JSON Web Key is required when using the SSH authentication scheme.",
  [Hu]: "Missing sshKid in SSH certificate request. A string that uniquely identifies the public SSH key is required when using the SSH authentication scheme.",
  [$u]: "Unable to find an authentication header containing server nonce. Either the Authentication-Info or WWW-Authenticate headers must be present in order to obtain a server nonce.",
  [Bu]: "Invalid authentication header provided",
  [Fu]: "Cannot set OIDCOptions parameter. Please change the protocol mode to OIDC or use a non-Microsoft authority.",
  [zu]: "Cannot set allowPlatformBroker parameter to true when not in AAD protocol mode.",
  [qu]: "Authority mismatch error. Authority provided in login request or PublicClientApplication config does not match the environment of the provided account. Please use a matching account or make an interactive request to login to this authority.",
  [Vu]: "Invalid authorize post body parameters provided. If you are using authorizePostBodyParameters, the request method must be POST. Please check the request method and parameters.",
  [Gu]: "Invalid request method for EAR protocol mode. The request method cannot be GET when using EAR protocol mode. Please change the request method to POST.",
  [ju]: "Invalid platform broker configuration. `allowPlatformBrokerWithDOM` can only be enabled when `allowPlatformBroker` is enabled."
};
class To extends Z {
  constructor(e) {
    super(e, Ku[e]), this.name = "ClientConfigurationError", Object.setPrototypeOf(this, To.prototype);
  }
}
function re(r) {
  return new To(r);
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class ve {
  /**
   * Check if stringified object is empty
   * @param strObj
   */
  static isEmptyObj(e) {
    if (e)
      try {
        const t = JSON.parse(e);
        return Object.keys(t).length === 0;
      } catch {
      }
    return !0;
  }
  static startsWith(e, t) {
    return e.indexOf(t) === 0;
  }
  static endsWith(e, t) {
    return e.length >= t.length && e.lastIndexOf(t) === e.length - t.length;
  }
  /**
   * Parses string into an object.
   *
   * @param query
   */
  static queryStringToObject(e) {
    const t = {}, n = e.split("&"), i = (o) => decodeURIComponent(o.replace(/\+/g, " "));
    return n.forEach((o) => {
      if (o.trim()) {
        const [s, a] = o.split(/=(.+)/g, 2);
        s && a && (t[i(s)] = i(a));
      }
    }), t;
  }
  /**
   * Trims entries in an array.
   *
   * @param arr
   */
  static trimArrayEntries(e) {
    return e.map((t) => t.trim());
  }
  /**
   * Removes empty strings from array
   * @param arr
   */
  static removeEmptyStringsFromArray(e) {
    return e.filter((t) => !!t);
  }
  /**
   * Attempts to parse a string into JSON
   * @param str
   */
  static jsonParseHelper(e) {
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  /**
   * Tests if a given string matches a given pattern, with support for wildcards and queries.
   * @param pattern Wildcard pattern to string match. Supports "*" for wildcards and "?" for queries
   * @param input String to match against
   */
  static matchPattern(e, t) {
    return new RegExp(e.replace(/\\/g, "\\\\").replace(/\*/g, "[^ ]*").replace(/\?/g, "\\?")).test(t);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class de {
  constructor(e) {
    const t = e ? ve.trimArrayEntries([...e]) : [], n = t ? ve.removeEmptyStringsFromArray(t) : [];
    if (!n || !n.length)
      throw re(Gc);
    this.scopes = /* @__PURE__ */ new Set(), n.forEach((i) => this.scopes.add(i));
  }
  /**
   * Factory method to create ScopeSet from space-delimited string
   * @param inputScopeString
   * @param appClientId
   * @param scopesRequired
   */
  static fromString(e) {
    const n = (e || w.EMPTY_STRING).split(" ");
    return new de(n);
  }
  /**
   * Creates the set of scopes to search for in cache lookups
   * @param inputScopeString
   * @returns
   */
  static createSearchScopes(e) {
    const t = e && e.length > 0 ? e : [...je], n = new de(t);
    return n.containsOnlyOIDCScopes() ? n.removeScope(w.OFFLINE_ACCESS_SCOPE) : n.removeOIDCScopes(), n;
  }
  /**
   * Check if a given scope is present in this set of scopes.
   * @param scope
   */
  containsScope(e) {
    const t = this.printScopesLowerCase().split(" "), n = new de(t);
    return e ? n.scopes.has(e.toLowerCase()) : !1;
  }
  /**
   * Check if a set of scopes is present in this set of scopes.
   * @param scopeSet
   */
  containsScopeSet(e) {
    return !e || e.scopes.size <= 0 ? !1 : this.scopes.size >= e.scopes.size && e.asArray().every((t) => this.containsScope(t));
  }
  /**
   * Check if set of scopes contains only the defaults
   */
  containsOnlyOIDCScopes() {
    let e = 0;
    return ts.forEach((t) => {
      this.containsScope(t) && (e += 1);
    }), this.scopes.size === e;
  }
  /**
   * Appends single scope if passed
   * @param newScope
   */
  appendScope(e) {
    e && this.scopes.add(e.trim());
  }
  /**
   * Appends multiple scopes if passed
   * @param newScopes
   */
  appendScopes(e) {
    try {
      e.forEach((t) => this.appendScope(t));
    } catch {
      throw N(Oc);
    }
  }
  /**
   * Removes element from set of scopes.
   * @param scope
   */
  removeScope(e) {
    if (!e)
      throw N(vc);
    this.scopes.delete(e.trim());
  }
  /**
   * Removes default scopes from set of scopes
   * Primarily used to prevent cache misses if the default scopes are not returned from the server
   */
  removeOIDCScopes() {
    ts.forEach((e) => {
      this.scopes.delete(e);
    });
  }
  /**
   * Combines an array of scopes with the current set of scopes.
   * @param otherScopes
   */
  unionScopeSets(e) {
    if (!e)
      throw N(Mi);
    const t = /* @__PURE__ */ new Set();
    return e.scopes.forEach((n) => t.add(n.toLowerCase())), this.scopes.forEach((n) => t.add(n.toLowerCase())), t;
  }
  /**
   * Check if scopes intersect between this set and another.
   * @param otherScopes
   */
  intersectingScopeSets(e) {
    if (!e)
      throw N(Mi);
    e.containsOnlyOIDCScopes() || e.removeOIDCScopes();
    const t = this.unionScopeSets(e), n = e.getScopeCount(), i = this.getScopeCount();
    return t.size < i + n;
  }
  /**
   * Returns size of set of scopes.
   */
  getScopeCount() {
    return this.scopes.size;
  }
  /**
   * Returns the scopes as an array of string values
   */
  asArray() {
    const e = [];
    return this.scopes.forEach((t) => e.push(t)), e;
  }
  /**
   * Prints scopes into a space-delimited string
   */
  printScopes() {
    return this.scopes ? this.asArray().join(" ") : w.EMPTY_STRING;
  }
  /**
   * Prints scopes into a space-delimited lower-case string (used for caching)
   */
  printScopesLowerCase() {
    return this.printScopes().toLowerCase();
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function fr(r, e) {
  if (!r)
    throw N(Ac);
  try {
    const t = e(r);
    return JSON.parse(t);
  } catch {
    throw N(oo);
  }
}
function Ut(r) {
  if (!r)
    throw N(oo);
  const e = r.split(Mn.CLIENT_INFO_SEPARATOR, 2);
  return {
    uid: e[0],
    utid: e.length < 2 ? w.EMPTY_STRING : e[1]
  };
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function os(r, e) {
  return !!r && !!e && r === e.split(".")[1];
}
function bn(r, e, t, n) {
  if (n) {
    const { oid: i, sub: o, tid: s, name: a, tfp: c, acr: l, preferred_username: u, upn: d, login_hint: f } = n, p = s || c || l || "";
    return {
      tenantId: p,
      localAccountId: i || o || "",
      name: a,
      username: u || d || "",
      loginHint: f,
      isHomeTenant: os(p, r)
    };
  } else
    return {
      tenantId: t,
      localAccountId: e,
      username: "",
      isHomeTenant: os(t, r)
    };
}
function Qc(r, e, t, n) {
  let i = r;
  if (e) {
    const { isHomeTenant: o, ...s } = e;
    i = { ...r, ...s };
  }
  if (t) {
    const { isHomeTenant: o, ...s } = bn(r.homeAccountId, r.localAccountId, r.tenantId, t);
    return i = {
      ...i,
      ...s,
      idTokenClaims: t,
      idToken: n
    }, i;
  }
  return i;
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const xe = {
  Default: 0,
  Adfs: 1,
  Dsts: 2,
  Ciam: 3
};
/*! @azure/msal-common v15.14.1 2026-01-17 */
function Jc(r) {
  return r && (r.tid || r.tfp || r.acr) || null;
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const At = {
  /**
   * Auth Code + PKCE with Entra ID (formerly AAD) specific optimizations and features
   */
  AAD: "AAD",
  /**
   * Auth Code + PKCE without Entra ID specific optimizations and features. For use only with non-Microsoft owned authorities.
   * Support is limited for this mode.
   */
  OIDC: "OIDC"
};
/*! @azure/msal-common v15.14.1 2026-01-17 */
class Oe {
  /**
   * Returns the AccountInfo interface for this account.
   */
  static getAccountInfo(e) {
    const t = e.tenantProfiles || [];
    return t.length === 0 && e.realm && e.localAccountId && t.push(bn(e.homeAccountId, e.localAccountId, e.realm)), {
      homeAccountId: e.homeAccountId,
      environment: e.environment,
      tenantId: e.realm,
      username: e.username,
      localAccountId: e.localAccountId,
      loginHint: e.loginHint,
      name: e.name,
      nativeAccountId: e.nativeAccountId,
      authorityType: e.authorityType,
      // Deserialize tenant profiles array into a Map
      tenantProfiles: new Map(t.map((n) => [n.tenantId, n])),
      dataBoundary: e.dataBoundary
    };
  }
  /**
   * Returns true if the account entity is in single tenant format (outdated), false otherwise
   */
  isSingleTenant() {
    return !this.tenantProfiles;
  }
  /**
   * Build Account cache from IdToken, clientInfo and authority/policy. Associated with AAD.
   * @param accountDetails
   */
  static createAccount(e, t, n) {
    var l, u, d, f, p, h, y;
    const i = new Oe();
    t.authorityType === xe.Adfs ? i.authorityType = jn.ADFS_ACCOUNT_TYPE : t.protocolMode === At.OIDC ? i.authorityType = jn.GENERIC_ACCOUNT_TYPE : i.authorityType = jn.MSSTS_ACCOUNT_TYPE;
    let o;
    e.clientInfo && n && (o = fr(e.clientInfo, n), o.xms_tdbr && (i.dataBoundary = o.xms_tdbr === "EU" ? "EU" : "None")), i.clientInfo = e.clientInfo, i.homeAccountId = e.homeAccountId, i.nativeAccountId = e.nativeAccountId;
    const s = e.environment || t && t.getPreferredCache();
    if (!s)
      throw N(uo);
    i.environment = s, i.realm = (o == null ? void 0 : o.utid) || Jc(e.idTokenClaims) || "", i.localAccountId = (o == null ? void 0 : o.uid) || ((l = e.idTokenClaims) == null ? void 0 : l.oid) || ((u = e.idTokenClaims) == null ? void 0 : u.sub) || "";
    const a = ((d = e.idTokenClaims) == null ? void 0 : d.preferred_username) || ((f = e.idTokenClaims) == null ? void 0 : f.upn), c = (p = e.idTokenClaims) != null && p.emails ? e.idTokenClaims.emails[0] : null;
    if (i.username = a || c || "", i.loginHint = (h = e.idTokenClaims) == null ? void 0 : h.login_hint, i.name = ((y = e.idTokenClaims) == null ? void 0 : y.name) || "", i.cloudGraphHostName = e.cloudGraphHostName, i.msGraphHost = e.msGraphHost, e.tenantProfiles)
      i.tenantProfiles = e.tenantProfiles;
    else {
      const T = bn(e.homeAccountId, i.localAccountId, i.realm, e.idTokenClaims);
      i.tenantProfiles = [T];
    }
    return i;
  }
  /**
   * Creates an AccountEntity object from AccountInfo
   * @param accountInfo
   * @param cloudGraphHostName
   * @param msGraphHost
   * @returns
   */
  static createFromAccountInfo(e, t, n) {
    var s;
    const i = new Oe();
    i.authorityType = e.authorityType || jn.GENERIC_ACCOUNT_TYPE, i.homeAccountId = e.homeAccountId, i.localAccountId = e.localAccountId, i.nativeAccountId = e.nativeAccountId, i.realm = e.tenantId, i.environment = e.environment, i.username = e.username, i.name = e.name, i.loginHint = e.loginHint, i.cloudGraphHostName = t, i.msGraphHost = n;
    const o = Array.from(((s = e.tenantProfiles) == null ? void 0 : s.values()) || []);
    return o.length === 0 && e.tenantId && e.localAccountId && o.push(bn(e.homeAccountId, e.localAccountId, e.tenantId, e.idTokenClaims)), i.tenantProfiles = o, i.dataBoundary = e.dataBoundary, i;
  }
  /**
   * Generate HomeAccountId from server response
   * @param serverClientInfo
   * @param authType
   */
  static generateHomeAccountId(e, t, n, i, o) {
    if (!(t === xe.Adfs || t === xe.Dsts)) {
      if (e)
        try {
          const s = fr(e, i.base64Decode);
          if (s.uid && s.utid)
            return `${s.uid}.${s.utid}`;
        } catch {
        }
      n.warning("No client info in response");
    }
    return (o == null ? void 0 : o.sub) || "";
  }
  /**
   * Validates an entity: checks for all expected params
   * @param entity
   */
  static isAccountEntity(e) {
    return e ? e.hasOwnProperty("homeAccountId") && e.hasOwnProperty("environment") && e.hasOwnProperty("realm") && e.hasOwnProperty("localAccountId") && e.hasOwnProperty("username") && e.hasOwnProperty("authorityType") : !1;
  }
  /**
   * Helper function to determine whether 2 accountInfo objects represent the same account
   * @param accountA
   * @param accountB
   * @param compareClaims - If set to true idTokenClaims will also be compared to determine account equality
   */
  static accountInfoIsEqual(e, t, n) {
    if (!e || !t)
      return !1;
    let i = !0;
    if (n) {
      const o = e.idTokenClaims || {}, s = t.idTokenClaims || {};
      i = o.iat === s.iat && o.nonce === s.nonce;
    }
    return e.homeAccountId === t.homeAccountId && e.localAccountId === t.localAccountId && e.username === t.username && e.tenantId === t.tenantId && e.loginHint === t.loginHint && e.environment === t.environment && e.nativeAccountId === t.nativeAccountId && i;
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function Ln(r, e) {
  const t = Wu(r);
  try {
    const n = e(t);
    return JSON.parse(n);
  } catch {
    throw N(so);
  }
}
function Yu(r) {
  if (!r.signin_state)
    return !1;
  const e = ["kmsi", "dvc_dmjd"];
  return r.signin_state.some((n) => e.includes(n.trim().toLowerCase()));
}
function Wu(r) {
  if (!r)
    throw N(Cc);
  const t = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/.exec(r);
  if (!t || t.length < 4)
    throw N(so);
  return t[2];
}
function Zc(r, e) {
  if (e === 0 || Date.now() - 3e5 > r + e)
    throw N(Rc);
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function Qu(r) {
  return r.startsWith("#/") ? r.substring(2) : r.startsWith("#") || r.startsWith("?") ? r.substring(1) : r;
}
function Xc(r) {
  if (!r || r.indexOf("=") < 0)
    return null;
  try {
    const e = Qu(r), t = Object.fromEntries(new URLSearchParams(e));
    if (t.code || t.ear_jwe || t.error || t.error_description || t.state)
      return t;
  } catch {
    throw N(Ic);
  }
  return null;
}
function Ie(r, e = !0, t) {
  const n = new Array();
  return r.forEach((i, o) => {
    !e && t && o in t ? n.push(`${o}=${i}`) : n.push(`${o}=${encodeURIComponent(i)}`);
  }), n.join("&");
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class K {
  get urlString() {
    return this._urlString;
  }
  constructor(e) {
    if (this._urlString = e, !this._urlString)
      throw re(go);
    e.includes("#") || (this._urlString = K.canonicalizeUri(e));
  }
  /**
   * Ensure urls are lower case and end with a / character.
   * @param url
   */
  static canonicalizeUri(e) {
    if (e) {
      let t = e.toLowerCase();
      return ve.endsWith(t, "?") ? t = t.slice(0, -1) : ve.endsWith(t, "?/") && (t = t.slice(0, -2)), ve.endsWith(t, "/") || (t += "/"), t;
    }
    return e;
  }
  /**
   * Throws if urlString passed is not a valid authority URI string.
   */
  validateAsUri() {
    let e;
    try {
      e = this.getUrlComponents();
    } catch {
      throw re(En);
    }
    if (!e.HostNameAndPort || !e.PathSegments)
      throw re(En);
    if (!e.Protocol || e.Protocol.toLowerCase() !== "https:")
      throw re(qc);
  }
  /**
   * Given a url and a query string return the url with provided query string appended
   * @param url
   * @param queryString
   */
  static appendQueryString(e, t) {
    return t ? e.indexOf("?") < 0 ? `${e}?${t}` : `${e}&${t}` : e;
  }
  /**
   * Returns a url with the hash removed
   * @param url
   */
  static removeHashFromUrl(e) {
    return K.canonicalizeUri(e.split("#")[0]);
  }
  /**
   * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
   * @param href The url
   * @param tenantId The tenant id to replace
   */
  replaceTenantPath(e) {
    const t = this.getUrlComponents(), n = t.PathSegments;
    return e && n.length !== 0 && (n[0] === Ke.COMMON || n[0] === Ke.ORGANIZATIONS) && (n[0] = e), K.constructAuthorityUriFromObject(t);
  }
  /**
   * Parses out the components from a url string.
   * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
   */
  getUrlComponents() {
    const e = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?"), t = this.urlString.match(e);
    if (!t)
      throw re(En);
    const n = {
      Protocol: t[1],
      HostNameAndPort: t[4],
      AbsolutePath: t[5],
      QueryString: t[7]
    };
    let i = n.AbsolutePath.split("/");
    return i = i.filter((o) => o && o.length > 0), n.PathSegments = i, n.QueryString && n.QueryString.endsWith("/") && (n.QueryString = n.QueryString.substring(0, n.QueryString.length - 1)), n;
  }
  static getDomainFromUrl(e) {
    const t = RegExp("^([^:/?#]+://)?([^/?#]*)"), n = e.match(t);
    if (!n)
      throw re(En);
    return n[2];
  }
  static getAbsoluteUrl(e, t) {
    if (e[0] === w.FORWARD_SLASH) {
      const i = new K(t).getUrlComponents();
      return i.Protocol + "//" + i.HostNameAndPort + e;
    }
    return e;
  }
  static constructAuthorityUriFromObject(e) {
    return new K(e.Protocol + "//" + e.HostNameAndPort + "/" + e.PathSegments.join("/"));
  }
  /**
   * Check if the hash of the URL string contains known properties
   * @deprecated This API will be removed in a future version
   */
  static hashContainsKnownProperties(e) {
    return !!Xc(e);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const el = {
  endpointMetadata: {
    "login.microsoftonline.com": {
      token_endpoint: "https://login.microsoftonline.com/{tenantid}/oauth2/v2.0/token",
      jwks_uri: "https://login.microsoftonline.com/{tenantid}/discovery/v2.0/keys",
      issuer: "https://login.microsoftonline.com/{tenantid}/v2.0",
      authorization_endpoint: "https://login.microsoftonline.com/{tenantid}/oauth2/v2.0/authorize",
      end_session_endpoint: "https://login.microsoftonline.com/{tenantid}/oauth2/v2.0/logout"
    },
    "login.chinacloudapi.cn": {
      token_endpoint: "https://login.chinacloudapi.cn/{tenantid}/oauth2/v2.0/token",
      jwks_uri: "https://login.chinacloudapi.cn/{tenantid}/discovery/v2.0/keys",
      issuer: "https://login.partner.microsoftonline.cn/{tenantid}/v2.0",
      authorization_endpoint: "https://login.chinacloudapi.cn/{tenantid}/oauth2/v2.0/authorize",
      end_session_endpoint: "https://login.chinacloudapi.cn/{tenantid}/oauth2/v2.0/logout"
    },
    "login.microsoftonline.us": {
      token_endpoint: "https://login.microsoftonline.us/{tenantid}/oauth2/v2.0/token",
      jwks_uri: "https://login.microsoftonline.us/{tenantid}/discovery/v2.0/keys",
      issuer: "https://login.microsoftonline.us/{tenantid}/v2.0",
      authorization_endpoint: "https://login.microsoftonline.us/{tenantid}/oauth2/v2.0/authorize",
      end_session_endpoint: "https://login.microsoftonline.us/{tenantid}/oauth2/v2.0/logout"
    }
  },
  instanceDiscoveryMetadata: {
    metadata: [
      {
        preferred_network: "login.microsoftonline.com",
        preferred_cache: "login.windows.net",
        aliases: [
          "login.microsoftonline.com",
          "login.windows.net",
          "login.microsoft.com",
          "sts.windows.net"
        ]
      },
      {
        preferred_network: "login.partner.microsoftonline.cn",
        preferred_cache: "login.partner.microsoftonline.cn",
        aliases: [
          "login.partner.microsoftonline.cn",
          "login.chinacloudapi.cn"
        ]
      },
      {
        preferred_network: "login.microsoftonline.de",
        preferred_cache: "login.microsoftonline.de",
        aliases: ["login.microsoftonline.de"]
      },
      {
        preferred_network: "login.microsoftonline.us",
        preferred_cache: "login.microsoftonline.us",
        aliases: [
          "login.microsoftonline.us",
          "login.usgovcloudapi.net"
        ]
      },
      {
        preferred_network: "login-us.microsoftonline.com",
        preferred_cache: "login-us.microsoftonline.com",
        aliases: ["login-us.microsoftonline.com"]
      }
    ]
  }
}, ss = el.endpointMetadata, Eo = el.instanceDiscoveryMetadata, tl = /* @__PURE__ */ new Set();
Eo.metadata.forEach((r) => {
  r.aliases.forEach((e) => {
    tl.add(e);
  });
});
function Ju(r, e) {
  var i;
  let t;
  const n = r.canonicalAuthority;
  if (n) {
    const o = new K(n).getUrlComponents().HostNameAndPort;
    t = as(o, (i = r.cloudDiscoveryMetadata) == null ? void 0 : i.metadata, _e.CONFIG, e) || as(o, Eo.metadata, _e.HARDCODED_VALUES, e) || r.knownAuthorities;
  }
  return t || [];
}
function as(r, e, t, n) {
  if (n == null || n.trace(`getAliasesFromMetadata called with source: ${t}`), r && e) {
    const i = gr(e, r);
    if (i)
      return n == null || n.trace(`getAliasesFromMetadata: found cloud discovery metadata in ${t}, returning aliases`), i.aliases;
    n == null || n.trace(`getAliasesFromMetadata: did not find cloud discovery metadata in ${t}`);
  }
  return null;
}
function Zu(r) {
  return gr(Eo.metadata, r);
}
function gr(r, e) {
  for (let t = 0; t < r.length; t++) {
    const n = r[t];
    if (n.aliases.includes(e))
      return n;
  }
  return null;
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const nl = "cache_quota_exceeded", Ao = "cache_error_unknown";
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Fr = {
  [nl]: "Exceeded cache storage capacity.",
  [Ao]: "Unexpected error occurred when using cache storage."
};
class kn extends Z {
  constructor(e, t) {
    const n = t || (Fr[e] ? Fr[e] : Fr[Ao]);
    super(`${e}: ${n}`), Object.setPrototypeOf(this, kn.prototype), this.name = "CacheError", this.errorCode = e, this.errorMessage = n;
  }
}
function Xu(r) {
  return r instanceof Error ? r.name === "QuotaExceededError" || r.name === "NS_ERROR_DOM_QUOTA_REACHED" || r.message.includes("exceeded the quota") ? new kn(nl) : new kn(r.name, r.message) : new kn(Ao);
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class Co {
  constructor(e, t, n, i, o) {
    this.clientId = e, this.cryptoImpl = t, this.commonLogger = n.clone(Fc, ho), this.staticAuthorityOptions = o, this.performanceClient = i;
  }
  /**
   * Returns all the accounts in the cache that match the optional filter. If no filter is provided, all accounts are returned.
   * @param accountFilter - (Optional) filter to narrow down the accounts returned
   * @returns Array of AccountInfo objects in cache
   */
  getAllAccounts(e, t) {
    return this.buildTenantProfiles(this.getAccountsFilteredBy(e, t), t, e);
  }
  /**
   * Gets first tenanted AccountInfo object found based on provided filters
   */
  getAccountInfoFilteredBy(e, t) {
    if (Object.keys(e).length === 0 || Object.values(e).every((i) => !i))
      return this.commonLogger.warning("getAccountInfoFilteredBy: Account filter is empty or invalid, returning null"), null;
    const n = this.getAllAccounts(e, t);
    return n.length > 1 ? n.sort((o) => o.idTokenClaims ? -1 : 1)[0] : n.length === 1 ? n[0] : null;
  }
  /**
   * Returns a single matching
   * @param accountFilter
   * @returns
   */
  getBaseAccountInfo(e, t) {
    const n = this.getAccountsFilteredBy(e, t);
    return n.length > 0 ? Oe.getAccountInfo(n[0]) : null;
  }
  /**
   * Matches filtered account entities with cached ID tokens that match the tenant profile-specific account filters
   * and builds the account info objects from the matching ID token's claims
   * @param cachedAccounts
   * @param accountFilter
   * @returns Array of AccountInfo objects that match account and tenant profile filters
   */
  buildTenantProfiles(e, t, n) {
    return e.flatMap((i) => this.getTenantProfilesFromAccountEntity(i, t, n == null ? void 0 : n.tenantId, n));
  }
  getTenantedAccountInfoByFilter(e, t, n, i, o) {
    let s = null, a;
    if (o && !this.tenantProfileMatchesFilter(n, o))
      return null;
    const c = this.getIdToken(e, i, t, n.tenantId);
    return c && (a = Ln(c.secret, this.cryptoImpl.base64Decode), !this.idTokenClaimsMatchTenantProfileFilter(a, o)) ? null : (s = Qc(e, n, a, c == null ? void 0 : c.secret), s);
  }
  getTenantProfilesFromAccountEntity(e, t, n, i) {
    const o = Oe.getAccountInfo(e);
    let s = o.tenantProfiles || /* @__PURE__ */ new Map();
    const a = this.getTokenKeys();
    if (n) {
      const l = s.get(n);
      if (l)
        s = /* @__PURE__ */ new Map([
          [n, l]
        ]);
      else
        return [];
    }
    const c = [];
    return s.forEach((l) => {
      const u = this.getTenantedAccountInfoByFilter(o, a, l, t, i);
      u && c.push(u);
    }), c;
  }
  tenantProfileMatchesFilter(e, t) {
    return !(t.localAccountId && !this.matchLocalAccountIdFromTenantProfile(e, t.localAccountId) || t.name && e.name !== t.name || t.isHomeTenant !== void 0 && e.isHomeTenant !== t.isHomeTenant);
  }
  idTokenClaimsMatchTenantProfileFilter(e, t) {
    return !(t && (t.localAccountId && !this.matchLocalAccountIdFromTokenClaims(e, t.localAccountId) || t.loginHint && !this.matchLoginHintFromTokenClaims(e, t.loginHint) || t.username && !this.matchUsername(e.preferred_username, t.username) || t.name && !this.matchName(e, t.name) || t.sid && !this.matchSid(e, t.sid)));
  }
  /**
   * saves a cache record
   * @param cacheRecord {CacheRecord}
   * @param correlationId {?string} correlation id
   * @param kmsi - Keep Me Signed In
   * @param apiId - API identifier for telemetry tracking
   * @param storeInCache {?StoreInCache}
   */
  async saveCacheRecord(e, t, n, i, o) {
    var s;
    if (!e)
      throw N(Dc);
    try {
      e.account && await this.setAccount(e.account, t, n, i), e.idToken && (o == null ? void 0 : o.idToken) !== !1 && await this.setIdTokenCredential(e.idToken, t, n), e.accessToken && (o == null ? void 0 : o.accessToken) !== !1 && await this.saveAccessToken(e.accessToken, t, n), e.refreshToken && (o == null ? void 0 : o.refreshToken) !== !1 && await this.setRefreshTokenCredential(e.refreshToken, t, n), e.appMetadata && this.setAppMetadata(e.appMetadata, t);
    } catch (a) {
      throw (s = this.commonLogger) == null || s.error("CacheManager.saveCacheRecord: failed"), a instanceof Z ? a : Xu(a);
    }
  }
  /**
   * saves access token credential
   * @param credential
   */
  async saveAccessToken(e, t, n) {
    const i = {
      clientId: e.clientId,
      credentialType: e.credentialType,
      environment: e.environment,
      homeAccountId: e.homeAccountId,
      realm: e.realm,
      tokenType: e.tokenType,
      requestedClaimsHash: e.requestedClaimsHash
    }, o = this.getTokenKeys(), s = de.fromString(e.target);
    o.accessToken.forEach((a) => {
      if (!this.accessTokenKeyMatchesFilter(a, i, !1))
        return;
      const c = this.getAccessTokenCredential(a, t);
      c && this.credentialMatchesFilter(c, i) && de.fromString(c.target).intersectingScopeSets(s) && this.removeAccessToken(a, t);
    }), await this.setAccessTokenCredential(e, t, n);
  }
  /**
   * Retrieve account entities matching all provided tenant-agnostic filters; if no filter is set, get all account entities in the cache
   * Not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
   * @param accountFilter - An object containing Account properties to filter by
   */
  getAccountsFilteredBy(e, t) {
    const n = this.getAccountKeys(), i = [];
    return n.forEach((o) => {
      var l;
      const s = this.getAccount(o, t);
      if (!s || e.homeAccountId && !this.matchHomeAccountId(s, e.homeAccountId) || e.username && !this.matchUsername(s.username, e.username) || e.environment && !this.matchEnvironment(s, e.environment) || e.realm && !this.matchRealm(s, e.realm) || e.nativeAccountId && !this.matchNativeAccountId(s, e.nativeAccountId) || e.authorityType && !this.matchAuthorityType(s, e.authorityType))
        return;
      const a = {
        localAccountId: e == null ? void 0 : e.localAccountId,
        name: e == null ? void 0 : e.name
      }, c = (l = s.tenantProfiles) == null ? void 0 : l.filter((u) => this.tenantProfileMatchesFilter(u, a));
      c && c.length === 0 || i.push(s);
    }), i;
  }
  /**
   * Returns whether or not the given credential entity matches the filter
   * @param entity
   * @param filter
   * @returns
   */
  credentialMatchesFilter(e, t) {
    return !(t.clientId && !this.matchClientId(e, t.clientId) || t.userAssertionHash && !this.matchUserAssertionHash(e, t.userAssertionHash) || typeof t.homeAccountId == "string" && !this.matchHomeAccountId(e, t.homeAccountId) || t.environment && !this.matchEnvironment(e, t.environment) || t.realm && !this.matchRealm(e, t.realm) || t.credentialType && !this.matchCredentialType(e, t.credentialType) || t.familyId && !this.matchFamilyId(e, t.familyId) || t.target && !this.matchTarget(e, t.target) || (t.requestedClaimsHash || e.requestedClaimsHash) && e.requestedClaimsHash !== t.requestedClaimsHash || e.credentialType === ee.ACCESS_TOKEN_WITH_AUTH_SCHEME && (t.tokenType && !this.matchTokenType(e, t.tokenType) || t.tokenType === Q.SSH && t.keyId && !this.matchKeyId(e, t.keyId)));
  }
  /**
   * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
   * @param filter
   */
  getAppMetadataFilteredBy(e) {
    const t = this.getKeys(), n = {};
    return t.forEach((i) => {
      if (!this.isAppMetadata(i))
        return;
      const o = this.getAppMetadata(i);
      o && (e.environment && !this.matchEnvironment(o, e.environment) || e.clientId && !this.matchClientId(o, e.clientId) || (n[i] = o));
    }), n;
  }
  /**
   * retrieve authorityMetadata that contains a matching alias
   * @param filter
   */
  getAuthorityMetadataByAlias(e) {
    const t = this.getAuthorityMetadataKeys();
    let n = null;
    return t.forEach((i) => {
      if (!this.isAuthorityMetadata(i) || i.indexOf(this.clientId) === -1)
        return;
      const o = this.getAuthorityMetadata(i);
      o && o.aliases.indexOf(e) !== -1 && (n = o);
    }), n;
  }
  /**
   * Removes all accounts and related tokens from cache.
   */
  removeAllAccounts(e) {
    this.getAllAccounts({}, e).forEach((n) => {
      this.removeAccount(n, e);
    });
  }
  /**
   * Removes the account and related tokens for a given account key
   * @param account
   */
  removeAccount(e, t) {
    this.removeAccountContext(e, t);
    const n = this.getAccountKeys(), i = (o) => o.includes(e.homeAccountId) && o.includes(e.environment);
    n.filter(i).forEach((o) => {
      this.removeItem(o, t), this.performanceClient.incrementFields({ accountsRemoved: 1 }, t);
    });
  }
  /**
   * Removes credentials associated with the provided account
   * @param account
   */
  removeAccountContext(e, t) {
    const n = this.getTokenKeys(), i = (o) => o.includes(e.homeAccountId) && o.includes(e.environment);
    n.idToken.filter(i).forEach((o) => {
      this.removeIdToken(o, t);
    }), n.accessToken.filter(i).forEach((o) => {
      this.removeAccessToken(o, t);
    }), n.refreshToken.filter(i).forEach((o) => {
      this.removeRefreshToken(o, t);
    });
  }
  /**
   * Removes accessToken from the cache
   * @param key
   * @param correlationId
   */
  removeAccessToken(e, t) {
    const n = this.getAccessTokenCredential(e, t);
    if (this.removeItem(e, t), this.performanceClient.incrementFields({ accessTokensRemoved: 1 }, t), !n || n.credentialType.toLowerCase() !== ee.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase() || n.tokenType !== Q.POP)
      return;
    const i = n.keyId;
    i && this.cryptoImpl.removeTokenBindingKey(i).catch(() => {
      var o;
      this.commonLogger.error(`Failed to remove token binding key ${i}`, t), (o = this.performanceClient) == null || o.incrementFields({ removeTokenBindingKeyFailure: 1 }, t);
    });
  }
  /**
   * Removes all app metadata objects from cache.
   */
  removeAppMetadata(e) {
    return this.getKeys().forEach((n) => {
      this.isAppMetadata(n) && this.removeItem(n, e);
    }), !0;
  }
  /**
   * Retrieve IdTokenEntity from cache
   * @param account {AccountInfo}
   * @param tokenKeys {?TokenKeys}
   * @param targetRealm {?string}
   * @param performanceClient {?IPerformanceClient}
   * @param correlationId {?string}
   */
  getIdToken(e, t, n, i, o) {
    this.commonLogger.trace("CacheManager - getIdToken called");
    const s = {
      homeAccountId: e.homeAccountId,
      environment: e.environment,
      credentialType: ee.ID_TOKEN,
      clientId: this.clientId,
      realm: i
    }, a = this.getIdTokensByFilter(s, t, n), c = a.size;
    if (c < 1)
      return this.commonLogger.info("CacheManager:getIdToken - No token found"), null;
    if (c > 1) {
      let l = a;
      if (!i) {
        const u = /* @__PURE__ */ new Map();
        a.forEach((f, p) => {
          f.realm === e.tenantId && u.set(p, f);
        });
        const d = u.size;
        if (d < 1)
          return this.commonLogger.info("CacheManager:getIdToken - Multiple ID tokens found for account but none match account entity tenant id, returning first result"), a.values().next().value;
        if (d === 1)
          return this.commonLogger.info("CacheManager:getIdToken - Multiple ID tokens found for account, defaulting to home tenant profile"), u.values().next().value;
        l = u;
      }
      return this.commonLogger.info("CacheManager:getIdToken - Multiple matching ID tokens found, clearing them"), l.forEach((u, d) => {
        this.removeIdToken(d, t);
      }), o && t && o.addFields({ multiMatchedID: a.size }, t), null;
    }
    return this.commonLogger.info("CacheManager:getIdToken - Returning ID token"), a.values().next().value;
  }
  /**
   * Gets all idTokens matching the given filter
   * @param filter
   * @returns
   */
  getIdTokensByFilter(e, t, n) {
    const i = n && n.idToken || this.getTokenKeys().idToken, o = /* @__PURE__ */ new Map();
    return i.forEach((s) => {
      if (!this.idTokenKeyMatchesFilter(s, {
        clientId: this.clientId,
        ...e
      }))
        return;
      const a = this.getIdTokenCredential(s, t);
      a && this.credentialMatchesFilter(a, e) && o.set(s, a);
    }), o;
  }
  /**
   * Validate the cache key against filter before retrieving and parsing cache value
   * @param key
   * @param filter
   * @returns
   */
  idTokenKeyMatchesFilter(e, t) {
    const n = e.toLowerCase();
    return !(t.clientId && n.indexOf(t.clientId.toLowerCase()) === -1 || t.homeAccountId && n.indexOf(t.homeAccountId.toLowerCase()) === -1);
  }
  /**
   * Removes idToken from the cache
   * @param key
   */
  removeIdToken(e, t) {
    this.removeItem(e, t);
  }
  /**
   * Removes refresh token from the cache
   * @param key
   */
  removeRefreshToken(e, t) {
    this.removeItem(e, t);
  }
  /**
   * Retrieve AccessTokenEntity from cache
   * @param account {AccountInfo}
   * @param request {BaseAuthRequest}
   * @param correlationId {?string}
   * @param tokenKeys {?TokenKeys}
   * @param performanceClient {?IPerformanceClient}
   */
  getAccessToken(e, t, n, i) {
    const o = t.correlationId;
    this.commonLogger.trace("CacheManager - getAccessToken called", o);
    const s = de.createSearchScopes(t.scopes), a = t.authenticationScheme || Q.BEARER, c = a.toLowerCase() !== Q.BEARER.toLowerCase() ? ee.ACCESS_TOKEN_WITH_AUTH_SCHEME : ee.ACCESS_TOKEN, l = {
      homeAccountId: e.homeAccountId,
      environment: e.environment,
      credentialType: c,
      clientId: this.clientId,
      realm: i || e.tenantId,
      target: s,
      tokenType: a,
      keyId: t.sshKid,
      requestedClaimsHash: t.requestedClaimsHash
    }, u = n && n.accessToken || this.getTokenKeys().accessToken, d = [];
    u.forEach((p) => {
      if (this.accessTokenKeyMatchesFilter(p, l, !0)) {
        const h = this.getAccessTokenCredential(p, o);
        h && this.credentialMatchesFilter(h, l) && d.push(h);
      }
    });
    const f = d.length;
    return f < 1 ? (this.commonLogger.info("CacheManager:getAccessToken - No token found", o), null) : f > 1 ? (this.commonLogger.info("CacheManager:getAccessToken - Multiple access tokens found, clearing them", o), d.forEach((p) => {
      this.removeAccessToken(this.generateCredentialKey(p), o);
    }), this.performanceClient.addFields({ multiMatchedAT: d.length }, o), null) : (this.commonLogger.info("CacheManager:getAccessToken - Returning access token", o), d[0]);
  }
  /**
   * Validate the cache key against filter before retrieving and parsing cache value
   * @param key
   * @param filter
   * @param keyMustContainAllScopes
   * @returns
   */
  accessTokenKeyMatchesFilter(e, t, n) {
    const i = e.toLowerCase();
    if (t.clientId && i.indexOf(t.clientId.toLowerCase()) === -1 || t.homeAccountId && i.indexOf(t.homeAccountId.toLowerCase()) === -1 || t.realm && i.indexOf(t.realm.toLowerCase()) === -1 || t.requestedClaimsHash && i.indexOf(t.requestedClaimsHash.toLowerCase()) === -1)
      return !1;
    if (t.target) {
      const o = t.target.asArray();
      for (let s = 0; s < o.length; s++) {
        if (n && !i.includes(o[s].toLowerCase()))
          return !1;
        if (!n && i.includes(o[s].toLowerCase()))
          return !0;
      }
    }
    return !0;
  }
  /**
   * Gets all access tokens matching the filter
   * @param filter
   * @returns
   */
  getAccessTokensByFilter(e, t) {
    const n = this.getTokenKeys(), i = [];
    return n.accessToken.forEach((o) => {
      if (!this.accessTokenKeyMatchesFilter(o, e, !0))
        return;
      const s = this.getAccessTokenCredential(o, t);
      s && this.credentialMatchesFilter(s, e) && i.push(s);
    }), i;
  }
  /**
   * Helper to retrieve the appropriate refresh token from cache
   * @param account {AccountInfo}
   * @param familyRT {boolean}
   * @param correlationId {?string}
   * @param tokenKeys {?TokenKeys}
   * @param performanceClient {?IPerformanceClient}
   */
  getRefreshToken(e, t, n, i, o) {
    this.commonLogger.trace("CacheManager - getRefreshToken called");
    const s = t ? ur : void 0, a = {
      homeAccountId: e.homeAccountId,
      environment: e.environment,
      credentialType: ee.REFRESH_TOKEN,
      clientId: this.clientId,
      familyId: s
    }, c = i && i.refreshToken || this.getTokenKeys().refreshToken, l = [];
    c.forEach((d) => {
      if (this.refreshTokenKeyMatchesFilter(d, a)) {
        const f = this.getRefreshTokenCredential(d, n);
        f && this.credentialMatchesFilter(f, a) && l.push(f);
      }
    });
    const u = l.length;
    return u < 1 ? (this.commonLogger.info("CacheManager:getRefreshToken - No refresh token found."), null) : (u > 1 && o && n && o.addFields({ multiMatchedRT: u }, n), this.commonLogger.info("CacheManager:getRefreshToken - returning refresh token"), l[0]);
  }
  /**
   * Validate the cache key against filter before retrieving and parsing cache value
   * @param key
   * @param filter
   */
  refreshTokenKeyMatchesFilter(e, t) {
    const n = e.toLowerCase();
    return !(t.familyId && n.indexOf(t.familyId.toLowerCase()) === -1 || !t.familyId && t.clientId && n.indexOf(t.clientId.toLowerCase()) === -1 || t.homeAccountId && n.indexOf(t.homeAccountId.toLowerCase()) === -1);
  }
  /**
   * Retrieve AppMetadataEntity from cache
   */
  readAppMetadataFromCache(e) {
    const t = {
      environment: e,
      clientId: this.clientId
    }, n = this.getAppMetadataFilteredBy(t), i = Object.keys(n).map((s) => n[s]), o = i.length;
    if (o < 1)
      return null;
    if (o > 1)
      throw N(bc);
    return i[0];
  }
  /**
   * Return the family_id value associated  with FOCI
   * @param environment
   * @param clientId
   */
  isAppMetadataFOCI(e) {
    const t = this.readAppMetadataFromCache(e);
    return !!(t && t.familyId === ur);
  }
  /**
   * helper to match account ids
   * @param value
   * @param homeAccountId
   */
  matchHomeAccountId(e, t) {
    return typeof e.homeAccountId == "string" && t === e.homeAccountId;
  }
  /**
   * helper to match account ids
   * @param entity
   * @param localAccountId
   * @returns
   */
  matchLocalAccountIdFromTokenClaims(e, t) {
    const n = e.oid || e.sub;
    return t === n;
  }
  matchLocalAccountIdFromTenantProfile(e, t) {
    return e.localAccountId === t;
  }
  /**
   * helper to match names
   * @param entity
   * @param name
   * @returns true if the downcased name properties are present and match in the filter and the entity
   */
  matchName(e, t) {
    var n;
    return t.toLowerCase() === ((n = e.name) == null ? void 0 : n.toLowerCase());
  }
  /**
   * helper to match usernames
   * @param entity
   * @param username
   * @returns
   */
  matchUsername(e, t) {
    return !!(e && typeof e == "string" && (t == null ? void 0 : t.toLowerCase()) === e.toLowerCase());
  }
  /**
   * helper to match assertion
   * @param value
   * @param oboAssertion
   */
  matchUserAssertionHash(e, t) {
    return !!(e.userAssertionHash && t === e.userAssertionHash);
  }
  /**
   * helper to match environment
   * @param value
   * @param environment
   */
  matchEnvironment(e, t) {
    if (this.staticAuthorityOptions) {
      const i = Ju(this.staticAuthorityOptions, this.commonLogger);
      if (i.includes(t) && i.includes(e.environment))
        return !0;
    }
    const n = this.getAuthorityMetadataByAlias(t);
    return !!(n && n.aliases.indexOf(e.environment) > -1);
  }
  /**
   * helper to match credential type
   * @param entity
   * @param credentialType
   */
  matchCredentialType(e, t) {
    return e.credentialType && t.toLowerCase() === e.credentialType.toLowerCase();
  }
  /**
   * helper to match client ids
   * @param entity
   * @param clientId
   */
  matchClientId(e, t) {
    return !!(e.clientId && t === e.clientId);
  }
  /**
   * helper to match family ids
   * @param entity
   * @param familyId
   */
  matchFamilyId(e, t) {
    return !!(e.familyId && t === e.familyId);
  }
  /**
   * helper to match realm
   * @param entity
   * @param realm
   */
  matchRealm(e, t) {
    var n;
    return ((n = e.realm) == null ? void 0 : n.toLowerCase()) === t.toLowerCase();
  }
  /**
   * helper to match nativeAccountId
   * @param entity
   * @param nativeAccountId
   * @returns boolean indicating the match result
   */
  matchNativeAccountId(e, t) {
    return !!(e.nativeAccountId && t === e.nativeAccountId);
  }
  /**
   * helper to match loginHint which can be either:
   * 1. login_hint ID token claim
   * 2. username in cached account object
   * 3. upn in ID token claims
   * @param entity
   * @param loginHint
   * @returns
   */
  matchLoginHintFromTokenClaims(e, t) {
    return e.login_hint === t || e.preferred_username === t || e.upn === t;
  }
  /**
   * Helper to match sid
   * @param entity
   * @param sid
   * @returns true if the sid claim is present and matches the filter
   */
  matchSid(e, t) {
    return e.sid === t;
  }
  matchAuthorityType(e, t) {
    return !!(e.authorityType && t.toLowerCase() === e.authorityType.toLowerCase());
  }
  /**
   * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
   * @param entity
   * @param target
   */
  matchTarget(e, t) {
    return e.credentialType !== ee.ACCESS_TOKEN && e.credentialType !== ee.ACCESS_TOKEN_WITH_AUTH_SCHEME || !e.target ? !1 : de.fromString(e.target).containsScopeSet(t);
  }
  /**
   * Returns true if the credential's tokenType or Authentication Scheme matches the one in the request, false otherwise
   * @param entity
   * @param tokenType
   */
  matchTokenType(e, t) {
    return !!(e.tokenType && e.tokenType === t);
  }
  /**
   * Returns true if the credential's keyId matches the one in the request, false otherwise
   * @param entity
   * @param keyId
   */
  matchKeyId(e, t) {
    return !!(e.keyId && e.keyId === t);
  }
  /**
   * returns if a given cache entity is of the type appmetadata
   * @param key
   */
  isAppMetadata(e) {
    return e.indexOf(io) !== -1;
  }
  /**
   * returns if a given cache entity is of the type authoritymetadata
   * @param key
   */
  isAuthorityMetadata(e) {
    return e.indexOf(hr.CACHE_KEY) !== -1;
  }
  /**
   * returns cache key used for cloud instance metadata
   */
  generateAuthorityMetadataCacheKey(e) {
    return `${hr.CACHE_KEY}-${this.clientId}-${e}`;
  }
  /**
   * Helper to convert serialized data to object
   * @param obj
   * @param json
   */
  static toObject(e, t) {
    for (const n in t)
      e[n] = t[n];
    return e;
  }
}
class eh extends Co {
  async setAccount() {
    throw N(q);
  }
  getAccount() {
    throw N(q);
  }
  async setIdTokenCredential() {
    throw N(q);
  }
  getIdTokenCredential() {
    throw N(q);
  }
  async setAccessTokenCredential() {
    throw N(q);
  }
  getAccessTokenCredential() {
    throw N(q);
  }
  async setRefreshTokenCredential() {
    throw N(q);
  }
  getRefreshTokenCredential() {
    throw N(q);
  }
  setAppMetadata() {
    throw N(q);
  }
  getAppMetadata() {
    throw N(q);
  }
  setServerTelemetry() {
    throw N(q);
  }
  getServerTelemetry() {
    throw N(q);
  }
  setAuthorityMetadata() {
    throw N(q);
  }
  getAuthorityMetadata() {
    throw N(q);
  }
  getAuthorityMetadataKeys() {
    throw N(q);
  }
  setThrottlingCache() {
    throw N(q);
  }
  getThrottlingCache() {
    throw N(q);
  }
  removeItem() {
    throw N(q);
  }
  getKeys() {
    throw N(q);
  }
  getAccountKeys() {
    throw N(q);
  }
  getTokenKeys() {
    throw N(q);
  }
  generateCredentialKey() {
    throw N(q);
  }
  generateAccountKey() {
    throw N(q);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const U = {
  /**
   * acquireTokenByCode API (msal-browser and msal-node).
   * Used to acquire tokens by trading an authorization code against the token endpoint.
   */
  AcquireTokenByCode: "acquireTokenByCode",
  /**
   * acquireTokenByRefreshToken API (msal-browser and msal-node).
   * Used to renew an access token using a refresh token against the token endpoint.
   */
  AcquireTokenByRefreshToken: "acquireTokenByRefreshToken",
  /**
   * acquireTokenSilent API (msal-browser and msal-node).
   * Used to silently acquire a new access token (from the cache or the network).
   */
  AcquireTokenSilent: "acquireTokenSilent",
  /**
   * acquireTokenSilentAsync (msal-browser).
   * Internal API for acquireTokenSilent.
   */
  AcquireTokenSilentAsync: "acquireTokenSilentAsync",
  /**
   * acquireTokenPopup (msal-browser).
   * Used to acquire a new access token interactively through pop ups
   */
  AcquireTokenPopup: "acquireTokenPopup",
  /**
   * acquireTokenPreRedirect (msal-browser).
   * First part of the redirect flow.
   * Used to acquire a new access token interactively through redirects.
   */
  AcquireTokenPreRedirect: "acquireTokenPreRedirect",
  /**
   * acquireTokenRedirect (msal-browser).
   * Second part of the redirect flow.
   * Used to acquire a new access token interactively through redirects.
   */
  AcquireTokenRedirect: "acquireTokenRedirect",
  /**
   * getPublicKeyThumbprint API in CryptoOpts class (msal-browser).
   * Used to generate a public/private keypair and generate a public key thumbprint for pop requests.
   */
  CryptoOptsGetPublicKeyThumbprint: "cryptoOptsGetPublicKeyThumbprint",
  /**
   * signJwt API in CryptoOpts class (msal-browser).
   * Used to signed a pop token.
   */
  CryptoOptsSignJwt: "cryptoOptsSignJwt",
  /**
   * acquireToken API in the SilentCacheClient class (msal-browser).
   * Used to read access tokens from the cache.
   */
  SilentCacheClientAcquireToken: "silentCacheClientAcquireToken",
  /**
   * acquireToken API in the SilentIframeClient class (msal-browser).
   * Used to acquire a new set of tokens from the authorize endpoint in a hidden iframe.
   */
  SilentIframeClientAcquireToken: "silentIframeClientAcquireToken",
  AwaitConcurrentIframe: "awaitConcurrentIframe",
  /**
   * acquireToken API in SilentRereshClient (msal-browser).
   * Used to acquire a new set of tokens from the token endpoint using a refresh token.
   */
  SilentRefreshClientAcquireToken: "silentRefreshClientAcquireToken",
  /**
   * ssoSilent API (msal-browser).
   * Used to silently acquire an authorization code and set of tokens using a hidden iframe.
   */
  SsoSilent: "ssoSilent",
  /**
   * getDiscoveredAuthority API in StandardInteractionClient class (msal-browser).
   * Used to load authority metadata for a request.
   */
  StandardInteractionClientGetDiscoveredAuthority: "standardInteractionClientGetDiscoveredAuthority",
  /**
   * acquireToken APIs in msal-browser.
   * Used to make an /authorize endpoint call with native brokering enabled.
   */
  FetchAccountIdWithNativeBroker: "fetchAccountIdWithNativeBroker",
  /**
   * acquireToken API in NativeInteractionClient class (msal-browser).
   * Used to acquire a token from Native component when native brokering is enabled.
   */
  NativeInteractionClientAcquireToken: "nativeInteractionClientAcquireToken",
  /**
   * Time spent creating default headers for requests to token endpoint
   */
  BaseClientCreateTokenRequestHeaders: "baseClientCreateTokenRequestHeaders",
  /**
   * Time spent sending/waiting for the response of a request to the token endpoint
   */
  NetworkClientSendPostRequestAsync: "networkClientSendPostRequestAsync",
  RefreshTokenClientExecutePostToTokenEndpoint: "refreshTokenClientExecutePostToTokenEndpoint",
  AuthorizationCodeClientExecutePostToTokenEndpoint: "authorizationCodeClientExecutePostToTokenEndpoint",
  /**
   * Used to measure the time taken for completing embedded-broker handshake (PW-Broker).
   */
  BrokerHandhshake: "brokerHandshake",
  /**
   * acquireTokenByRefreshToken API in BrokerClientApplication (PW-Broker) .
   */
  AcquireTokenByRefreshTokenInBroker: "acquireTokenByRefreshTokenInBroker",
  /**
   * Time taken for token acquisition by broker
   */
  AcquireTokenByBroker: "acquireTokenByBroker",
  /**
   * Time spent on the network for refresh token acquisition
   */
  RefreshTokenClientExecuteTokenRequest: "refreshTokenClientExecuteTokenRequest",
  /**
   * Time taken for acquiring refresh token , records RT size
   */
  RefreshTokenClientAcquireToken: "refreshTokenClientAcquireToken",
  /**
   * Time taken for acquiring cached refresh token
   */
  RefreshTokenClientAcquireTokenWithCachedRefreshToken: "refreshTokenClientAcquireTokenWithCachedRefreshToken",
  /**
   * acquireTokenByRefreshToken API in RefreshTokenClient (msal-common).
   */
  RefreshTokenClientAcquireTokenByRefreshToken: "refreshTokenClientAcquireTokenByRefreshToken",
  /**
   * Helper function to create token request body in RefreshTokenClient (msal-common).
   */
  RefreshTokenClientCreateTokenRequestBody: "refreshTokenClientCreateTokenRequestBody",
  /**
   * acquireTokenFromCache (msal-browser).
   * Internal API for acquiring token from cache
   */
  AcquireTokenFromCache: "acquireTokenFromCache",
  SilentFlowClientAcquireCachedToken: "silentFlowClientAcquireCachedToken",
  SilentFlowClientGenerateResultFromCacheRecord: "silentFlowClientGenerateResultFromCacheRecord",
  /**
   * acquireTokenBySilentIframe (msal-browser).
   * Internal API for acquiring token by silent Iframe
   */
  AcquireTokenBySilentIframe: "acquireTokenBySilentIframe",
  /**
   * Internal API for initializing base request in BaseInteractionClient (msal-browser)
   */
  InitializeBaseRequest: "initializeBaseRequest",
  /**
   * Internal API for initializing silent request in SilentCacheClient (msal-browser)
   */
  InitializeSilentRequest: "initializeSilentRequest",
  InitializeClientApplication: "initializeClientApplication",
  InitializeCache: "initializeCache",
  /**
   * Helper function in SilentIframeClient class (msal-browser).
   */
  SilentIframeClientTokenHelper: "silentIframeClientTokenHelper",
  /**
   * SilentHandler
   */
  SilentHandlerInitiateAuthRequest: "silentHandlerInitiateAuthRequest",
  SilentHandlerMonitorIframeForHash: "silentHandlerMonitorIframeForHash",
  SilentHandlerLoadFrame: "silentHandlerLoadFrame",
  SilentHandlerLoadFrameSync: "silentHandlerLoadFrameSync",
  /**
   * Helper functions in StandardInteractionClient class (msal-browser)
   */
  StandardInteractionClientCreateAuthCodeClient: "standardInteractionClientCreateAuthCodeClient",
  StandardInteractionClientGetClientConfiguration: "standardInteractionClientGetClientConfiguration",
  StandardInteractionClientInitializeAuthorizationRequest: "standardInteractionClientInitializeAuthorizationRequest",
  /**
   * getAuthCodeUrl API (msal-browser and msal-node).
   */
  GetAuthCodeUrl: "getAuthCodeUrl",
  GetStandardParams: "getStandardParams",
  /**
   * Functions from InteractionHandler (msal-browser)
   */
  HandleCodeResponseFromServer: "handleCodeResponseFromServer",
  HandleCodeResponse: "handleCodeResponse",
  HandleResponseEar: "handleResponseEar",
  HandleResponsePlatformBroker: "handleResponsePlatformBroker",
  HandleResponseCode: "handleResponseCode",
  UpdateTokenEndpointAuthority: "updateTokenEndpointAuthority",
  /**
   * APIs in Authorization Code Client (msal-common)
   */
  AuthClientAcquireToken: "authClientAcquireToken",
  AuthClientExecuteTokenRequest: "authClientExecuteTokenRequest",
  AuthClientCreateTokenRequestBody: "authClientCreateTokenRequestBody",
  /**
   * Generate functions in PopTokenGenerator (msal-common)
   */
  PopTokenGenerateCnf: "popTokenGenerateCnf",
  PopTokenGenerateKid: "popTokenGenerateKid",
  /**
   * handleServerTokenResponse API in ResponseHandler (msal-common)
   */
  HandleServerTokenResponse: "handleServerTokenResponse",
  DeserializeResponse: "deserializeResponse",
  /**
   * Authority functions
   */
  AuthorityFactoryCreateDiscoveredInstance: "authorityFactoryCreateDiscoveredInstance",
  AuthorityResolveEndpointsAsync: "authorityResolveEndpointsAsync",
  AuthorityResolveEndpointsFromLocalSources: "authorityResolveEndpointsFromLocalSources",
  AuthorityGetCloudDiscoveryMetadataFromNetwork: "authorityGetCloudDiscoveryMetadataFromNetwork",
  AuthorityUpdateCloudDiscoveryMetadata: "authorityUpdateCloudDiscoveryMetadata",
  AuthorityGetEndpointMetadataFromNetwork: "authorityGetEndpointMetadataFromNetwork",
  AuthorityUpdateEndpointMetadata: "authorityUpdateEndpointMetadata",
  AuthorityUpdateMetadataWithRegionalInformation: "authorityUpdateMetadataWithRegionalInformation",
  /**
   * Region Discovery functions
   */
  RegionDiscoveryDetectRegion: "regionDiscoveryDetectRegion",
  RegionDiscoveryGetRegionFromIMDS: "regionDiscoveryGetRegionFromIMDS",
  RegionDiscoveryGetCurrentVersion: "regionDiscoveryGetCurrentVersion",
  AcquireTokenByCodeAsync: "acquireTokenByCodeAsync",
  GetEndpointMetadataFromNetwork: "getEndpointMetadataFromNetwork",
  GetCloudDiscoveryMetadataFromNetworkMeasurement: "getCloudDiscoveryMetadataFromNetworkMeasurement",
  HandleRedirectPromiseMeasurement: "handleRedirectPromise",
  HandleNativeRedirectPromiseMeasurement: "handleNativeRedirectPromise",
  UpdateCloudDiscoveryMetadataMeasurement: "updateCloudDiscoveryMetadataMeasurement",
  UsernamePasswordClientAcquireToken: "usernamePasswordClientAcquireToken",
  NativeMessageHandlerHandshake: "nativeMessageHandlerHandshake",
  NativeGenerateAuthResult: "nativeGenerateAuthResult",
  RemoveHiddenIframe: "removeHiddenIframe",
  /**
   * Cache operations
   */
  ClearTokensAndKeysWithClaims: "clearTokensAndKeysWithClaims",
  CacheManagerGetRefreshToken: "cacheManagerGetRefreshToken",
  ImportExistingCache: "importExistingCache",
  SetUserData: "setUserData",
  LocalStorageUpdated: "localStorageUpdated",
  /**
   * Crypto Operations
   */
  GeneratePkceCodes: "generatePkceCodes",
  GenerateCodeVerifier: "generateCodeVerifier",
  GenerateCodeChallengeFromVerifier: "generateCodeChallengeFromVerifier",
  Sha256Digest: "sha256Digest",
  GetRandomValues: "getRandomValues",
  GenerateHKDF: "generateHKDF",
  GenerateBaseKey: "generateBaseKey",
  Base64Decode: "base64Decode",
  UrlEncodeArr: "urlEncodeArr",
  Encrypt: "encrypt",
  Decrypt: "decrypt",
  GenerateEarKey: "generateEarKey",
  DecryptEarResponse: "decryptEarResponse",
  LoadExternalTokens: "LoadExternalTokens",
  LoadAccount: "loadAccount",
  LoadIdToken: "loadIdToken",
  LoadAccessToken: "loadAccessToken",
  LoadRefreshToken: "loadRefreshToken"
}, th = {
  InProgress: 1
};
/*! @azure/msal-common v15.14.1 2026-01-17 */
class cs {
  startMeasurement() {
  }
  endMeasurement() {
  }
  flushMeasurement() {
    return null;
  }
}
class rl {
  generateId() {
    return "callback-id";
  }
  startMeasurement(e, t) {
    return {
      end: () => null,
      discard: () => {
      },
      add: () => {
      },
      increment: () => {
      },
      event: {
        eventId: this.generateId(),
        status: th.InProgress,
        authority: "",
        libraryName: "",
        libraryVersion: "",
        clientId: "",
        name: e,
        startTimeMs: Date.now(),
        correlationId: t || ""
      },
      measurement: new cs()
    };
  }
  startPerformanceMeasurement() {
    return new cs();
  }
  calculateQueuedTime() {
    return 0;
  }
  addQueueMeasurement() {
  }
  setPreQueueTime() {
  }
  endMeasurement() {
    return null;
  }
  discardMeasurements() {
  }
  removePerformanceCallback() {
    return !0;
  }
  addPerformanceCallback() {
    return "";
  }
  emitEvents() {
  }
  addFields() {
  }
  incrementFields() {
  }
  cacheEventByCorrelationId() {
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const nh = {
  tokenRenewalOffsetSeconds: Tc,
  preventCorsPreflight: !1
}, rh = {
  loggerCallback: () => {
  },
  piiLoggingEnabled: !1,
  logLevel: W.Info,
  correlationId: w.EMPTY_STRING
}, ih = {
  claimsBasedCachingEnabled: !1
}, oh = {
  async sendGetRequestAsync() {
    throw N(q);
  },
  async sendPostRequestAsync() {
    throw N(q);
  }
}, sh = {
  sku: w.SKU,
  version: ho,
  cpu: w.EMPTY_STRING,
  os: w.EMPTY_STRING
}, ah = {
  clientSecret: w.EMPTY_STRING,
  clientAssertion: void 0
}, ch = {
  azureCloudInstance: fo.None,
  tenant: `${w.DEFAULT_COMMON_TENANT}`
}, lh = {
  application: {
    appName: "",
    appVersion: ""
  }
};
function dh({ authOptions: r, systemOptions: e, loggerOptions: t, cacheOptions: n, storageInterface: i, networkInterface: o, cryptoInterface: s, clientCredentials: a, libraryInfo: c, telemetry: l, serverTelemetryManager: u, persistencePlugin: d, serializableCache: f }) {
  const p = {
    ...rh,
    ...t
  };
  return {
    authOptions: uh(r),
    systemOptions: { ...nh, ...e },
    loggerOptions: p,
    cacheOptions: { ...ih, ...n },
    storageInterface: i || new eh(r.clientId, xi, new it(p), new rl()),
    networkInterface: o || oh,
    cryptoInterface: s || xi,
    clientCredentials: a || ah,
    libraryInfo: { ...sh, ...c },
    telemetry: { ...lh, ...l },
    serverTelemetryManager: u || null,
    persistencePlugin: d || null,
    serializableCache: f || null
  };
}
function uh(r) {
  return {
    clientCapabilities: [],
    azureCloudOptions: ch,
    skipAuthorityMetadataCache: !1,
    instanceAware: !1,
    encodeExtraQueryParams: !1,
    ...r
  };
}
function il(r) {
  return r.authOptions.authority.options.protocolMode === At.OIDC;
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Le = {
  HOME_ACCOUNT_ID: "home_account_id",
  UPN: "UPN"
};
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Hn = "client_id", ol = "redirect_uri", hh = "response_type", fh = "response_mode", gh = "grant_type", ph = "claims", mh = "scope", yh = "refresh_token", Th = "state", Eh = "nonce", Ah = "prompt", Ch = "code", _h = "code_challenge", Ih = "code_challenge_method", Sh = "code_verifier", wh = "client-request-id", Rh = "x-client-SKU", bh = "x-client-VER", kh = "x-client-OS", vh = "x-client-CPU", Oh = "x-client-current-telemetry", Ph = "x-client-last-telemetry", Nh = "x-ms-lib-capability", Mh = "x-app-name", Dh = "x-app-ver", Uh = "post_logout_redirect_uri", xh = "id_token_hint", Lh = "device_code", Hh = "client_secret", $h = "client_assertion", Bh = "client_assertion_type", sl = "token_type", al = "req_cnf", Fh = "assertion", zh = "requested_token_use", qh = "on_behalf_of", ls = "return_spa_code", Gh = "logout_hint", Vh = "sid", jh = "login_hint", Kh = "domain_hint", ds = "x-client-xtra-sku", Li = "brk_client_id", us = "brk_redirect_uri", Hi = "instance_aware";
/*! @azure/msal-common v15.14.1 2026-01-17 */
function _o(r, e, t) {
  if (!e)
    return;
  const n = r.get(Hn);
  n && r.has(Li) && (t == null || t.addFields({
    embeddedClientId: n,
    embeddedRedirectUri: r.get(ol)
  }, e));
}
function cl(r, e) {
  r.set(hh, e);
}
function Yh(r, e) {
  r.set(fh, e || ro.QUERY);
}
function ot(r, e, t = !0, n = je) {
  t && !n.includes("openid") && !e.includes("openid") && n.push("openid");
  const i = t ? [...e || [], ...n] : e || [], o = new de(i);
  r.set(mh, o.printScopes());
}
function st(r, e) {
  r.set(Hn, e);
}
function Io(r, e) {
  r.set(ol, e);
}
function Wh(r, e) {
  r.set(Uh, e);
}
function Qh(r, e) {
  r.set(xh, e);
}
function Jh(r, e) {
  r.set(Kh, e);
}
function Kn(r, e) {
  r.set(jh, e);
}
function Dn(r, e) {
  r.set(ae.CCS_HEADER, `UPN:${e}`);
}
function vn(r, e) {
  r.set(ae.CCS_HEADER, `Oid:${e.uid}@${e.utid}`);
}
function hs(r, e) {
  r.set(Vh, e);
}
function at(r, e, t) {
  const n = cf(e, t);
  try {
    JSON.parse(n);
  } catch {
    throw re(po);
  }
  r.set(ph, n);
}
function Ct(r, e) {
  r.set(wh, e);
}
function _t(r, e) {
  r.set(Rh, e.sku), r.set(bh, e.version), e.os && r.set(kh, e.os), e.cpu && r.set(vh, e.cpu);
}
function It(r, e) {
  e != null && e.appName && r.set(Mh, e.appName), e != null && e.appVersion && r.set(Dh, e.appVersion);
}
function Zh(r, e) {
  r.set(Ah, e);
}
function ll(r, e) {
  e && r.set(Th, e);
}
function Xh(r, e) {
  r.set(Eh, e);
}
function ef(r, e, t) {
  if (e && t)
    r.set(_h, e), r.set(Ih, t);
  else
    throw re(Kc);
}
function tf(r, e) {
  r.set(Ch, e);
}
function nf(r, e) {
  r.set(Lh, e);
}
function rf(r, e) {
  r.set(yh, e);
}
function of(r, e) {
  r.set(Sh, e);
}
function $n(r, e) {
  r.set(Hh, e);
}
function Bn(r, e) {
  e && r.set($h, e);
}
function Fn(r, e) {
  e && r.set(Bh, e);
}
function sf(r, e) {
  r.set(Fh, e);
}
function af(r, e) {
  r.set(zh, e);
}
function jt(r, e) {
  r.set(gh, e);
}
function Kt(r) {
  r.set(Iu, "1");
}
function dl(r) {
  r.has(Hi) || r.set(Hi, "true");
}
function He(r, e) {
  Object.entries(e).forEach(([t, n]) => {
    !r.has(t) && n && r.set(t, n);
  });
}
function cf(r, e) {
  let t;
  if (!r)
    t = {};
  else
    try {
      t = JSON.parse(r);
    } catch {
      throw re(po);
    }
  return e && e.length > 0 && (t.hasOwnProperty(Vn.ACCESS_TOKEN) || (t[Vn.ACCESS_TOKEN] = {}), t[Vn.ACCESS_TOKEN][Vn.XMS_CC] = {
    values: e
  }), JSON.stringify(t);
}
function lf(r, e) {
  r.set(yc.username, e);
}
function df(r, e) {
  r.set(yc.password, e);
}
function ul(r, e) {
  e && (r.set(sl, Q.POP), r.set(al, e));
}
function hl(r, e) {
  e && (r.set(sl, Q.SSH), r.set(al, e));
}
function Yt(r, e) {
  r.set(Oh, e.generateCurrentRequestHeaderValue()), r.set(Ph, e.generateLastRequestHeaderValue());
}
function Wt(r) {
  r.set(Nh, Rn.X_MS_LIB_CAPABILITY_VALUE);
}
function uf(r, e) {
  r.set(Gh, e);
}
function Sr(r, e, t) {
  r.has(Li) || r.set(Li, e), r.has(us) || r.set(us, t);
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function hf(r) {
  return r.hasOwnProperty("authorization_endpoint") && r.hasOwnProperty("token_endpoint") && r.hasOwnProperty("issuer") && r.hasOwnProperty("jwks_uri");
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function ff(r) {
  return r.hasOwnProperty("tenant_discovery_endpoint") && r.hasOwnProperty("metadata");
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function gf(r) {
  return r.hasOwnProperty("error") && r.hasOwnProperty("error_description");
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const pf = (r, e, t, n, i) => (...o) => {
  t.trace(`Executing function ${e}`);
  const s = n == null ? void 0 : n.startMeasurement(e, i);
  if (i) {
    const a = e + "CallCount";
    n == null || n.incrementFields({ [a]: 1 }, i);
  }
  try {
    const a = r(...o);
    return s == null || s.end({
      success: !0
    }), t.trace(`Returning result from ${e}`), a;
  } catch (a) {
    t.trace(`Error occurred in ${e}`);
    try {
      t.trace(JSON.stringify(a));
    } catch {
      t.trace("Unable to print error message.");
    }
    throw s == null || s.end({
      success: !1
    }, a), a;
  }
}, Y = (r, e, t, n, i) => (...o) => {
  t.trace(`Executing function ${e}`);
  const s = n == null ? void 0 : n.startMeasurement(e, i);
  if (i) {
    const a = e + "CallCount";
    n == null || n.incrementFields({ [a]: 1 }, i);
  }
  return n == null || n.setPreQueueTime(e, i), r(...o).then((a) => (t.trace(`Returning result from ${e}`), s == null || s.end({
    success: !0
  }), a)).catch((a) => {
    t.trace(`Error occurred in ${e}`);
    try {
      t.trace(JSON.stringify(a));
    } catch {
      t.trace("Unable to print error message.");
    }
    throw s == null || s.end({
      success: !1
    }, a), a;
  });
};
/*! @azure/msal-common v15.14.1 2026-01-17 */
class wr {
  constructor(e, t, n, i) {
    this.networkInterface = e, this.logger = t, this.performanceClient = n, this.correlationId = i;
  }
  /**
   * Detect the region from the application's environment.
   *
   * @returns Promise<string | null>
   */
  async detectRegion(e, t) {
    var i;
    (i = this.performanceClient) == null || i.addQueueMeasurement(U.RegionDiscoveryDetectRegion, this.correlationId);
    let n = e;
    if (n)
      t.region_source = bt.ENVIRONMENT_VARIABLE;
    else {
      const o = wr.IMDS_OPTIONS;
      try {
        const s = await Y(this.getRegionFromIMDS.bind(this), U.RegionDiscoveryGetRegionFromIMDS, this.logger, this.performanceClient, this.correlationId)(w.IMDS_VERSION, o);
        if (s.status === G.SUCCESS && (n = s.body, t.region_source = bt.IMDS), s.status === G.BAD_REQUEST) {
          const a = await Y(this.getCurrentVersion.bind(this), U.RegionDiscoveryGetCurrentVersion, this.logger, this.performanceClient, this.correlationId)(o);
          if (!a)
            return t.region_source = bt.FAILED_AUTO_DETECTION, null;
          const c = await Y(this.getRegionFromIMDS.bind(this), U.RegionDiscoveryGetRegionFromIMDS, this.logger, this.performanceClient, this.correlationId)(a, o);
          c.status === G.SUCCESS && (n = c.body, t.region_source = bt.IMDS);
        }
      } catch {
        return t.region_source = bt.FAILED_AUTO_DETECTION, null;
      }
    }
    return n || (t.region_source = bt.FAILED_AUTO_DETECTION), n || null;
  }
  /**
   * Make the call to the IMDS endpoint
   *
   * @param imdsEndpointUrl
   * @returns Promise<NetworkResponse<string>>
   */
  async getRegionFromIMDS(e, t) {
    var n;
    return (n = this.performanceClient) == null || n.addQueueMeasurement(U.RegionDiscoveryGetRegionFromIMDS, this.correlationId), this.networkInterface.sendGetRequestAsync(`${w.IMDS_ENDPOINT}?api-version=${e}&format=text`, t, w.IMDS_TIMEOUT);
  }
  /**
   * Get the most recent version of the IMDS endpoint available
   *
   * @returns Promise<string | null>
   */
  async getCurrentVersion(e) {
    var t;
    (t = this.performanceClient) == null || t.addQueueMeasurement(U.RegionDiscoveryGetCurrentVersion, this.correlationId);
    try {
      const n = await this.networkInterface.sendGetRequestAsync(`${w.IMDS_ENDPOINT}?format=json`, e);
      return n.status === G.BAD_REQUEST && n.body && n.body["newest-versions"] && n.body["newest-versions"].length > 0 ? n.body["newest-versions"][0] : null;
    } catch {
      return null;
    }
  }
}
wr.IMDS_OPTIONS = {
  headers: {
    Metadata: "true"
  }
};
/*! @azure/msal-common v15.14.1 2026-01-17 */
function te() {
  return Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
}
function zr(r) {
  return r ? new Date(Number(r) * 1e3) : /* @__PURE__ */ new Date();
}
function Ft(r, e) {
  const t = Number(r) || 0;
  return te() + e > t;
}
function mf(r) {
  return Number(r) > te();
}
function yf(r, e) {
  return new Promise((t) => setTimeout(() => t(e), r));
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function Tf(r, e, t, n, i) {
  return {
    credentialType: ee.ID_TOKEN,
    homeAccountId: r,
    environment: e,
    clientId: n,
    secret: t,
    realm: i,
    lastUpdatedAt: Date.now().toString()
    // Set the last updated time to now
  };
}
function Ef(r, e, t, n, i, o, s, a, c, l, u, d, f, p, h) {
  var T, g;
  const y = {
    homeAccountId: r,
    credentialType: ee.ACCESS_TOKEN,
    secret: t,
    cachedAt: te().toString(),
    expiresOn: s.toString(),
    extendedExpiresOn: a.toString(),
    environment: e,
    clientId: n,
    realm: i,
    target: o,
    tokenType: u || Q.BEARER,
    lastUpdatedAt: Date.now().toString()
    // Set the last updated time to now
  };
  if (d && (y.userAssertionHash = d), l && (y.refreshOn = l.toString()), p && (y.requestedClaims = p, y.requestedClaimsHash = h), ((T = y.tokenType) == null ? void 0 : T.toLowerCase()) !== Q.BEARER.toLowerCase())
    switch (y.credentialType = ee.ACCESS_TOKEN_WITH_AUTH_SCHEME, y.tokenType) {
      case Q.POP:
        const m = Ln(t, c);
        if (!((g = m == null ? void 0 : m.cnf) != null && g.kid))
          throw N(Lc);
        y.keyId = m.cnf.kid;
        break;
      case Q.SSH:
        y.keyId = f;
    }
  return y;
}
function Af(r, e, t, n, i, o, s) {
  const a = {
    credentialType: ee.REFRESH_TOKEN,
    homeAccountId: r,
    environment: e,
    clientId: n,
    secret: t,
    lastUpdatedAt: Date.now().toString()
  };
  return o && (a.userAssertionHash = o), i && (a.familyId = i), s && (a.expiresOn = s.toString()), a;
}
function So(r) {
  return r.hasOwnProperty("homeAccountId") && r.hasOwnProperty("environment") && r.hasOwnProperty("credentialType") && r.hasOwnProperty("clientId") && r.hasOwnProperty("secret");
}
function fs(r) {
  return r ? So(r) && r.hasOwnProperty("realm") && r.hasOwnProperty("target") && (r.credentialType === ee.ACCESS_TOKEN || r.credentialType === ee.ACCESS_TOKEN_WITH_AUTH_SCHEME) : !1;
}
function gs(r) {
  return r ? So(r) && r.hasOwnProperty("realm") && r.credentialType === ee.ID_TOKEN : !1;
}
function ps(r) {
  return r ? So(r) && r.credentialType === ee.REFRESH_TOKEN : !1;
}
function Cf(r, e) {
  const t = r.indexOf(se.CACHE_KEY) === 0;
  let n = !0;
  return e && (n = e.hasOwnProperty("failedRequests") && e.hasOwnProperty("errors") && e.hasOwnProperty("cacheHits")), t && n;
}
function _f(r, e) {
  let t = !1;
  r && (t = r.indexOf(Rn.THROTTLING_PREFIX) === 0);
  let n = !0;
  return e && (n = e.hasOwnProperty("throttleTime")), t && n;
}
function If({ environment: r, clientId: e }) {
  return [
    io,
    r,
    e
  ].join(Mn.CACHE_KEY_SEPARATOR).toLowerCase();
}
function ms(r, e) {
  return e ? r.indexOf(io) === 0 && e.hasOwnProperty("clientId") && e.hasOwnProperty("environment") : !1;
}
function Sf(r, e) {
  return e ? r.indexOf(hr.CACHE_KEY) === 0 && e.hasOwnProperty("aliases") && e.hasOwnProperty("preferred_cache") && e.hasOwnProperty("preferred_network") && e.hasOwnProperty("canonical_authority") && e.hasOwnProperty("authorization_endpoint") && e.hasOwnProperty("token_endpoint") && e.hasOwnProperty("issuer") && e.hasOwnProperty("aliasesFromNetwork") && e.hasOwnProperty("endpointsFromNetwork") && e.hasOwnProperty("expiresAt") && e.hasOwnProperty("jwks_uri") : !1;
}
function ys() {
  return te() + hr.REFRESH_TIME_SECONDS;
}
function Yn(r, e, t) {
  r.authorization_endpoint = e.authorization_endpoint, r.token_endpoint = e.token_endpoint, r.end_session_endpoint = e.end_session_endpoint, r.issuer = e.issuer, r.endpointsFromNetwork = t, r.jwks_uri = e.jwks_uri;
}
function qr(r, e, t) {
  r.aliases = e.aliases, r.preferred_cache = e.preferred_cache, r.preferred_network = e.preferred_network, r.aliasesFromNetwork = t;
}
function Ts(r) {
  return r.expiresAt <= te();
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class ge {
  constructor(e, t, n, i, o, s, a, c) {
    this.canonicalAuthority = e, this._canonicalAuthority.validateAsUri(), this.networkInterface = t, this.cacheManager = n, this.authorityOptions = i, this.regionDiscoveryMetadata = {
      region_used: void 0,
      region_source: void 0,
      region_outcome: void 0
    }, this.logger = o, this.performanceClient = a, this.correlationId = s, this.managedIdentity = c || !1, this.regionDiscovery = new wr(t, this.logger, this.performanceClient, this.correlationId);
  }
  /**
   * Get {@link AuthorityType}
   * @param authorityUri {@link IUri}
   * @private
   */
  getAuthorityType(e) {
    if (e.HostNameAndPort.endsWith(w.CIAM_AUTH_URL))
      return xe.Ciam;
    const t = e.PathSegments;
    if (t.length)
      switch (t[0].toLowerCase()) {
        case w.ADFS:
          return xe.Adfs;
        case w.DSTS:
          return xe.Dsts;
      }
    return xe.Default;
  }
  // See above for AuthorityType
  get authorityType() {
    return this.getAuthorityType(this.canonicalAuthorityUrlComponents);
  }
  /**
   * ProtocolMode enum representing the way endpoints are constructed.
   */
  get protocolMode() {
    return this.authorityOptions.protocolMode;
  }
  /**
   * Returns authorityOptions which can be used to reinstantiate a new authority instance
   */
  get options() {
    return this.authorityOptions;
  }
  /**
   * A URL that is the authority set by the developer
   */
  get canonicalAuthority() {
    return this._canonicalAuthority.urlString;
  }
  /**
   * Sets canonical authority.
   */
  set canonicalAuthority(e) {
    this._canonicalAuthority = new K(e), this._canonicalAuthority.validateAsUri(), this._canonicalAuthorityUrlComponents = null;
  }
  /**
   * Get authority components.
   */
  get canonicalAuthorityUrlComponents() {
    return this._canonicalAuthorityUrlComponents || (this._canonicalAuthorityUrlComponents = this._canonicalAuthority.getUrlComponents()), this._canonicalAuthorityUrlComponents;
  }
  /**
   * Get hostname and port i.e. login.microsoftonline.com
   */
  get hostnameAndPort() {
    return this.canonicalAuthorityUrlComponents.HostNameAndPort.toLowerCase();
  }
  /**
   * Get tenant for authority.
   */
  get tenant() {
    return this.canonicalAuthorityUrlComponents.PathSegments[0];
  }
  /**
   * OAuth /authorize endpoint for requests
   */
  get authorizationEndpoint() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.authorization_endpoint);
    throw N(Ge);
  }
  /**
   * OAuth /token endpoint for requests
   */
  get tokenEndpoint() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.token_endpoint);
    throw N(Ge);
  }
  get deviceCodeEndpoint() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
    throw N(Ge);
  }
  /**
   * OAuth logout endpoint for requests
   */
  get endSessionEndpoint() {
    if (this.discoveryComplete()) {
      if (!this.metadata.end_session_endpoint)
        throw N(Hc);
      return this.replacePath(this.metadata.end_session_endpoint);
    } else
      throw N(Ge);
  }
  /**
   * OAuth issuer for requests
   */
  get selfSignedJwtAudience() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.issuer);
    throw N(Ge);
  }
  /**
   * Jwks_uri for token signing keys
   */
  get jwksUri() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.jwks_uri);
    throw N(Ge);
  }
  /**
   * Returns a flag indicating that tenant name can be replaced in authority {@link IUri}
   * @param authorityUri {@link IUri}
   * @private
   */
  canReplaceTenant(e) {
    return e.PathSegments.length === 1 && !ge.reservedTenantDomains.has(e.PathSegments[0]) && this.getAuthorityType(e) === xe.Default && this.protocolMode !== At.OIDC;
  }
  /**
   * Replaces tenant in url path with current tenant. Defaults to common.
   * @param urlString
   */
  replaceTenant(e) {
    return e.replace(/{tenant}|{tenantid}/g, this.tenant);
  }
  /**
   * Replaces path such as tenant or policy with the current tenant or policy.
   * @param urlString
   */
  replacePath(e) {
    let t = e;
    const i = new K(this.metadata.canonical_authority).getUrlComponents(), o = i.PathSegments;
    return this.canonicalAuthorityUrlComponents.PathSegments.forEach((a, c) => {
      let l = o[c];
      if (c === 0 && this.canReplaceTenant(i)) {
        const u = new K(this.metadata.authorization_endpoint).getUrlComponents().PathSegments[0];
        l !== u && (this.logger.verbose(`Replacing tenant domain name ${l} with id ${u}`), l = u);
      }
      a !== l && (t = t.replace(`/${l}/`, `/${a}/`));
    }), this.replaceTenant(t);
  }
  /**
   * The default open id configuration endpoint for any canonical authority.
   */
  get defaultOpenIdConfigurationEndpoint() {
    const e = this.hostnameAndPort;
    return this.canonicalAuthority.endsWith("v2.0/") || this.authorityType === xe.Adfs || this.protocolMode === At.OIDC && !this.isAliasOfKnownMicrosoftAuthority(e) ? `${this.canonicalAuthority}.well-known/openid-configuration` : `${this.canonicalAuthority}v2.0/.well-known/openid-configuration`;
  }
  /**
   * Boolean that returns whether or not tenant discovery has been completed.
   */
  discoveryComplete() {
    return !!this.metadata;
  }
  /**
   * Perform endpoint discovery to discover aliases, preferred_cache, preferred_network
   * and the /authorize, /token and logout endpoints.
   */
  async resolveEndpointsAsync() {
    var i, o;
    (i = this.performanceClient) == null || i.addQueueMeasurement(U.AuthorityResolveEndpointsAsync, this.correlationId);
    const e = this.getCurrentMetadataEntity(), t = await Y(this.updateCloudDiscoveryMetadata.bind(this), U.AuthorityUpdateCloudDiscoveryMetadata, this.logger, this.performanceClient, this.correlationId)(e);
    this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, e.preferred_network);
    const n = await Y(this.updateEndpointMetadata.bind(this), U.AuthorityUpdateEndpointMetadata, this.logger, this.performanceClient, this.correlationId)(e);
    this.updateCachedMetadata(e, t, {
      source: n
    }), (o = this.performanceClient) == null || o.addFields({
      cloudDiscoverySource: t,
      authorityEndpointSource: n
    }, this.correlationId);
  }
  /**
   * Returns metadata entity from cache if it exists, otherwiser returns a new metadata entity built
   * from the configured canonical authority
   * @returns
   */
  getCurrentMetadataEntity() {
    let e = this.cacheManager.getAuthorityMetadataByAlias(this.hostnameAndPort);
    return e || (e = {
      aliases: [],
      preferred_cache: this.hostnameAndPort,
      preferred_network: this.hostnameAndPort,
      canonical_authority: this.canonicalAuthority,
      authorization_endpoint: "",
      token_endpoint: "",
      end_session_endpoint: "",
      issuer: "",
      aliasesFromNetwork: !1,
      endpointsFromNetwork: !1,
      expiresAt: ys(),
      jwks_uri: ""
    }), e;
  }
  /**
   * Updates cached metadata based on metadata source and sets the instance's metadata
   * property to the same value
   * @param metadataEntity
   * @param cloudDiscoverySource
   * @param endpointMetadataResult
   */
  updateCachedMetadata(e, t, n) {
    t !== _e.CACHE && (n == null ? void 0 : n.source) !== _e.CACHE && (e.expiresAt = ys(), e.canonical_authority = this.canonicalAuthority);
    const i = this.cacheManager.generateAuthorityMetadataCacheKey(e.preferred_cache);
    this.cacheManager.setAuthorityMetadata(i, e), this.metadata = e;
  }
  /**
   * Update AuthorityMetadataEntity with new endpoints and return where the information came from
   * @param metadataEntity
   */
  async updateEndpointMetadata(e) {
    var i, o, s;
    (i = this.performanceClient) == null || i.addQueueMeasurement(U.AuthorityUpdateEndpointMetadata, this.correlationId);
    const t = this.updateEndpointMetadataFromLocalSources(e);
    if (t) {
      if (t.source === _e.HARDCODED_VALUES && (o = this.authorityOptions.azureRegionConfiguration) != null && o.azureRegion && t.metadata) {
        const a = await Y(this.updateMetadataWithRegionalInformation.bind(this), U.AuthorityUpdateMetadataWithRegionalInformation, this.logger, this.performanceClient, this.correlationId)(t.metadata);
        Yn(e, a, !1), e.canonical_authority = this.canonicalAuthority;
      }
      return t.source;
    }
    let n = await Y(this.getEndpointMetadataFromNetwork.bind(this), U.AuthorityGetEndpointMetadataFromNetwork, this.logger, this.performanceClient, this.correlationId)();
    if (n)
      return (s = this.authorityOptions.azureRegionConfiguration) != null && s.azureRegion && (n = await Y(this.updateMetadataWithRegionalInformation.bind(this), U.AuthorityUpdateMetadataWithRegionalInformation, this.logger, this.performanceClient, this.correlationId)(n)), Yn(e, n, !0), _e.NETWORK;
    throw N(_c, this.defaultOpenIdConfigurationEndpoint);
  }
  /**
   * Updates endpoint metadata from local sources and returns where the information was retrieved from and the metadata config
   * response if the source is hardcoded metadata
   * @param metadataEntity
   * @returns
   */
  updateEndpointMetadataFromLocalSources(e) {
    this.logger.verbose("Attempting to get endpoint metadata from authority configuration");
    const t = this.getEndpointMetadataFromConfig();
    if (t)
      return this.logger.verbose("Found endpoint metadata in authority configuration"), Yn(e, t, !1), {
        source: _e.CONFIG
      };
    if (this.logger.verbose("Did not find endpoint metadata in the config... Attempting to get endpoint metadata from the hardcoded values."), this.authorityOptions.skipAuthorityMetadataCache)
      this.logger.verbose("Skipping hardcoded metadata cache since skipAuthorityMetadataCache is set to true. Attempting to get endpoint metadata from the network metadata cache.");
    else {
      const i = this.getEndpointMetadataFromHardcodedValues();
      if (i)
        return Yn(e, i, !1), {
          source: _e.HARDCODED_VALUES,
          metadata: i
        };
      this.logger.verbose("Did not find endpoint metadata in hardcoded values... Attempting to get endpoint metadata from the network metadata cache.");
    }
    const n = Ts(e);
    return this.isAuthoritySameType(e) && e.endpointsFromNetwork && !n ? (this.logger.verbose("Found endpoint metadata in the cache."), { source: _e.CACHE }) : (n && this.logger.verbose("The metadata entity is expired."), null);
  }
  /**
   * Compares the number of url components after the domain to determine if the cached
   * authority metadata can be used for the requested authority. Protects against same domain different
   * authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
   * @param metadataEntity
   */
  isAuthoritySameType(e) {
    return new K(e.canonical_authority).getUrlComponents().PathSegments.length === this.canonicalAuthorityUrlComponents.PathSegments.length;
  }
  /**
   * Parse authorityMetadata config option
   */
  getEndpointMetadataFromConfig() {
    if (this.authorityOptions.authorityMetadata)
      try {
        return JSON.parse(this.authorityOptions.authorityMetadata);
      } catch {
        throw re(Yc);
      }
    return null;
  }
  /**
   * Gets OAuth endpoints from the given OpenID configuration endpoint.
   *
   * @param hasHardcodedMetadata boolean
   */
  async getEndpointMetadataFromNetwork() {
    var n;
    (n = this.performanceClient) == null || n.addQueueMeasurement(U.AuthorityGetEndpointMetadataFromNetwork, this.correlationId);
    const e = {}, t = this.defaultOpenIdConfigurationEndpoint;
    this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: attempting to retrieve OAuth endpoints from ${t}`);
    try {
      const i = await this.networkInterface.sendGetRequestAsync(t, e);
      return hf(i.body) ? i.body : (this.logger.verbose("Authority.getEndpointMetadataFromNetwork: could not parse response as OpenID configuration"), null);
    } catch (i) {
      return this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: ${i}`), null;
    }
  }
  /**
   * Get OAuth endpoints for common authorities.
   */
  getEndpointMetadataFromHardcodedValues() {
    return this.hostnameAndPort in ss ? ss[this.hostnameAndPort] : null;
  }
  /**
   * Update the retrieved metadata with regional information.
   * User selected Azure region will be used if configured.
   */
  async updateMetadataWithRegionalInformation(e) {
    var n, i, o;
    (n = this.performanceClient) == null || n.addQueueMeasurement(U.AuthorityUpdateMetadataWithRegionalInformation, this.correlationId);
    const t = (i = this.authorityOptions.azureRegionConfiguration) == null ? void 0 : i.azureRegion;
    if (t) {
      if (t !== w.AZURE_REGION_AUTO_DISCOVER_FLAG)
        return this.regionDiscoveryMetadata.region_outcome = Br.CONFIGURED_NO_AUTO_DETECTION, this.regionDiscoveryMetadata.region_used = t, ge.replaceWithRegionalInformation(e, t);
      const s = await Y(this.regionDiscovery.detectRegion.bind(this.regionDiscovery), U.RegionDiscoveryDetectRegion, this.logger, this.performanceClient, this.correlationId)((o = this.authorityOptions.azureRegionConfiguration) == null ? void 0 : o.environmentRegion, this.regionDiscoveryMetadata);
      if (s)
        return this.regionDiscoveryMetadata.region_outcome = Br.AUTO_DETECTION_REQUESTED_SUCCESSFUL, this.regionDiscoveryMetadata.region_used = s, ge.replaceWithRegionalInformation(e, s);
      this.regionDiscoveryMetadata.region_outcome = Br.AUTO_DETECTION_REQUESTED_FAILED;
    }
    return e;
  }
  /**
   * Updates the AuthorityMetadataEntity with new aliases, preferred_network and preferred_cache
   * and returns where the information was retrieved from
   * @param metadataEntity
   * @returns AuthorityMetadataSource
   */
  async updateCloudDiscoveryMetadata(e) {
    var i;
    (i = this.performanceClient) == null || i.addQueueMeasurement(U.AuthorityUpdateCloudDiscoveryMetadata, this.correlationId);
    const t = this.updateCloudDiscoveryMetadataFromLocalSources(e);
    if (t)
      return t;
    const n = await Y(this.getCloudDiscoveryMetadataFromNetwork.bind(this), U.AuthorityGetCloudDiscoveryMetadataFromNetwork, this.logger, this.performanceClient, this.correlationId)();
    if (n)
      return qr(e, n, !0), _e.NETWORK;
    throw re(Wc);
  }
  updateCloudDiscoveryMetadataFromLocalSources(e) {
    this.logger.verbose("Attempting to get cloud discovery metadata  from authority configuration"), this.logger.verbosePii(`Known Authorities: ${this.authorityOptions.knownAuthorities || w.NOT_APPLICABLE}`), this.logger.verbosePii(`Authority Metadata: ${this.authorityOptions.authorityMetadata || w.NOT_APPLICABLE}`), this.logger.verbosePii(`Canonical Authority: ${e.canonical_authority || w.NOT_APPLICABLE}`);
    const t = this.getCloudDiscoveryMetadataFromConfig();
    if (t)
      return this.logger.verbose("Found cloud discovery metadata in authority configuration"), qr(e, t, !1), _e.CONFIG;
    if (this.logger.verbose("Did not find cloud discovery metadata in the config... Attempting to get cloud discovery metadata from the hardcoded values."), this.options.skipAuthorityMetadataCache)
      this.logger.verbose("Skipping hardcoded cloud discovery metadata cache since skipAuthorityMetadataCache is set to true. Attempting to get cloud discovery metadata from the network metadata cache.");
    else {
      const i = Zu(this.hostnameAndPort);
      if (i)
        return this.logger.verbose("Found cloud discovery metadata from hardcoded values."), qr(e, i, !1), _e.HARDCODED_VALUES;
      this.logger.verbose("Did not find cloud discovery metadata in hardcoded values... Attempting to get cloud discovery metadata from the network metadata cache.");
    }
    const n = Ts(e);
    return this.isAuthoritySameType(e) && e.aliasesFromNetwork && !n ? (this.logger.verbose("Found cloud discovery metadata in the cache."), _e.CACHE) : (n && this.logger.verbose("The metadata entity is expired."), null);
  }
  /**
   * Parse cloudDiscoveryMetadata config or check knownAuthorities
   */
  getCloudDiscoveryMetadataFromConfig() {
    if (this.authorityType === xe.Ciam)
      return this.logger.verbose("CIAM authorities do not support cloud discovery metadata, generate the aliases from authority host."), ge.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
    if (this.authorityOptions.cloudDiscoveryMetadata) {
      this.logger.verbose("The cloud discovery metadata has been provided as a network response, in the config.");
      try {
        this.logger.verbose("Attempting to parse the cloud discovery metadata.");
        const e = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata), t = gr(e.metadata, this.hostnameAndPort);
        if (this.logger.verbose("Parsed the cloud discovery metadata."), t)
          return this.logger.verbose("There is returnable metadata attached to the parsed cloud discovery metadata."), t;
        this.logger.verbose("There is no metadata attached to the parsed cloud discovery metadata.");
      } catch {
        throw this.logger.verbose("Unable to parse the cloud discovery metadata. Throwing Invalid Cloud Discovery Metadata Error."), re(mo);
      }
    }
    return this.isInKnownAuthorities() ? (this.logger.verbose("The host is included in knownAuthorities. Creating new cloud discovery metadata from the host."), ge.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort)) : null;
  }
  /**
   * Called to get metadata from network if CloudDiscoveryMetadata was not populated by config
   *
   * @param hasHardcodedMetadata boolean
   */
  async getCloudDiscoveryMetadataFromNetwork() {
    var i;
    (i = this.performanceClient) == null || i.addQueueMeasurement(U.AuthorityGetCloudDiscoveryMetadataFromNetwork, this.correlationId);
    const e = `${w.AAD_INSTANCE_DISCOVERY_ENDPT}${this.canonicalAuthority}oauth2/v2.0/authorize`, t = {};
    let n = null;
    try {
      const o = await this.networkInterface.sendGetRequestAsync(e, t);
      let s, a;
      if (ff(o.body))
        s = o.body, a = s.metadata, this.logger.verbosePii(`tenant_discovery_endpoint is: ${s.tenant_discovery_endpoint}`);
      else if (gf(o.body)) {
        if (this.logger.warning(`A CloudInstanceDiscoveryErrorResponse was returned. The cloud instance discovery network request's status code is: ${o.status}`), s = o.body, s.error === w.INVALID_INSTANCE)
          return this.logger.error("The CloudInstanceDiscoveryErrorResponse error is invalid_instance."), null;
        this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error is ${s.error}`), this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error description is ${s.error_description}`), this.logger.warning("Setting the value of the CloudInstanceDiscoveryMetadata (returned from the network) to []"), a = [];
      } else
        return this.logger.error("AAD did not return a CloudInstanceDiscoveryResponse or CloudInstanceDiscoveryErrorResponse"), null;
      this.logger.verbose("Attempting to find a match between the developer's authority and the CloudInstanceDiscoveryMetadata returned from the network request."), n = gr(a, this.hostnameAndPort);
    } catch (o) {
      if (o instanceof Z)
        this.logger.error(`There was a network error while attempting to get the cloud discovery instance metadata.
Error: ${o.errorCode}
Error Description: ${o.errorMessage}`);
      else {
        const s = o;
        this.logger.error(`A non-MSALJS error was thrown while attempting to get the cloud instance discovery metadata.
Error: ${s.name}
Error Description: ${s.message}`);
      }
      return null;
    }
    return n || (this.logger.warning("The developer's authority was not found within the CloudInstanceDiscoveryMetadata returned from the network request."), this.logger.verbose("Creating custom Authority for custom domain scenario."), n = ge.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort)), n;
  }
  /**
   * Helper function to determine if this host is included in the knownAuthorities config option
   */
  isInKnownAuthorities() {
    return this.authorityOptions.knownAuthorities.filter((t) => t && K.getDomainFromUrl(t).toLowerCase() === this.hostnameAndPort).length > 0;
  }
  /**
   * helper function to populate the authority based on azureCloudOptions
   * @param authorityString
   * @param azureCloudOptions
   */
  static generateAuthority(e, t) {
    let n;
    if (t && t.azureCloudInstance !== fo.None) {
      const i = t.tenant ? t.tenant : w.DEFAULT_COMMON_TENANT;
      n = `${t.azureCloudInstance}/${i}/`;
    }
    return n || e;
  }
  /**
   * Creates cloud discovery metadata object from a given host
   * @param host
   */
  static createCloudDiscoveryMetadataFromHost(e) {
    return {
      preferred_network: e,
      preferred_cache: e,
      aliases: [e]
    };
  }
  /**
   * helper function to generate environment from authority object
   */
  getPreferredCache() {
    if (this.managedIdentity)
      return w.DEFAULT_AUTHORITY_HOST;
    if (this.discoveryComplete())
      return this.metadata.preferred_cache;
    throw N(Ge);
  }
  /**
   * Returns whether or not the provided host is an alias of this authority instance
   * @param host
   */
  isAlias(e) {
    return this.metadata.aliases.indexOf(e) > -1;
  }
  /**
   * Returns whether or not the provided host is an alias of a known Microsoft authority for purposes of endpoint discovery
   * @param host
   */
  isAliasOfKnownMicrosoftAuthority(e) {
    return tl.has(e);
  }
  /**
   * Checks whether the provided host is that of a public cloud authority
   *
   * @param authority string
   * @returns bool
   */
  static isPublicCloudAuthority(e) {
    return w.KNOWN_PUBLIC_CLOUDS.indexOf(e) >= 0;
  }
  /**
   * Rebuild the authority string with the region
   *
   * @param host string
   * @param region string
   */
  static buildRegionalAuthorityString(e, t, n) {
    const i = new K(e);
    i.validateAsUri();
    const o = i.getUrlComponents();
    let s = `${t}.${o.HostNameAndPort}`;
    this.isPublicCloudAuthority(o.HostNameAndPort) && (s = `${t}.${w.REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX}`);
    const a = K.constructAuthorityUriFromObject({
      ...i.getUrlComponents(),
      HostNameAndPort: s
    }).urlString;
    return n ? `${a}?${n}` : a;
  }
  /**
   * Replace the endpoints in the metadata object with their regional equivalents.
   *
   * @param metadata OpenIdConfigResponse
   * @param azureRegion string
   */
  static replaceWithRegionalInformation(e, t) {
    const n = { ...e };
    return n.authorization_endpoint = ge.buildRegionalAuthorityString(n.authorization_endpoint, t), n.token_endpoint = ge.buildRegionalAuthorityString(n.token_endpoint, t), n.end_session_endpoint && (n.end_session_endpoint = ge.buildRegionalAuthorityString(n.end_session_endpoint, t)), n;
  }
  /**
   * Transform CIAM_AUTHORIY as per the below rules:
   * If no path segments found and it is a CIAM authority (hostname ends with .ciamlogin.com), then transform it
   *
   * NOTE: The transformation path should go away once STS supports CIAM with the format: `tenantIdorDomain.ciamlogin.com`
   * `ciamlogin.com` can also change in the future and we should accommodate the same
   *
   * @param authority
   */
  static transformCIAMAuthority(e) {
    let t = e;
    const i = new K(e).getUrlComponents();
    if (i.PathSegments.length === 0 && i.HostNameAndPort.endsWith(w.CIAM_AUTH_URL)) {
      const o = i.HostNameAndPort.split(".")[0];
      t = `${t}${o}${w.AAD_TENANT_DOMAIN_SUFFIX}`;
    }
    return t;
  }
}
ge.reservedTenantDomains = /* @__PURE__ */ new Set([
  "{tenant}",
  "{tenantid}",
  Ke.COMMON,
  Ke.CONSUMERS,
  Ke.ORGANIZATIONS
]);
function wf(r) {
  var i;
  const n = (i = new K(r).getUrlComponents().PathSegments.slice(-1)[0]) == null ? void 0 : i.toLowerCase();
  switch (n) {
    case Ke.COMMON:
    case Ke.ORGANIZATIONS:
    case Ke.CONSUMERS:
      return;
    default:
      return n;
  }
}
function fl(r) {
  return r.endsWith(w.FORWARD_SLASH) ? r : `${r}${w.FORWARD_SLASH}`;
}
function Rf(r) {
  const e = r.cloudDiscoveryMetadata;
  let t;
  if (e)
    try {
      t = JSON.parse(e);
    } catch {
      throw re(mo);
    }
  return {
    canonicalAuthority: r.authority ? fl(r.authority) : void 0,
    knownAuthorities: r.knownAuthorities,
    cloudDiscoveryMetadata: t
  };
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
async function gl(r, e, t, n, i, o, s) {
  s == null || s.addQueueMeasurement(U.AuthorityFactoryCreateDiscoveredInstance, o);
  const a = ge.transformCIAMAuthority(fl(r)), c = new ge(a, e, t, n, i, o, s);
  try {
    return await Y(c.resolveEndpointsAsync.bind(c), U.AuthorityResolveEndpointsAsync, i, s, o)(), c;
  } catch {
    throw N(Ge);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class Qt extends Z {
  constructor(e, t, n, i, o) {
    super(e, t, n), this.name = "ServerError", this.errorNo = i, this.status = o, Object.setPrototypeOf(this, Qt.prototype);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function wo(r, e, t) {
  var n;
  return {
    clientId: r,
    authority: e.authority,
    scopes: e.scopes,
    homeAccountIdentifier: t,
    claims: e.claims,
    authenticationScheme: e.authenticationScheme,
    resourceRequestMethod: e.resourceRequestMethod,
    resourceRequestUri: e.resourceRequestUri,
    shrClaims: e.shrClaims,
    sshKid: e.sshKid,
    embeddedClientId: e.embeddedClientId || ((n = e.tokenBodyParameters) == null ? void 0 : n.clientId)
  };
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class et {
  /**
   * Prepares a RequestThumbprint to be stored as a key.
   * @param thumbprint
   */
  static generateThrottlingStorageKey(e) {
    return `${Rn.THROTTLING_PREFIX}.${JSON.stringify(e)}`;
  }
  /**
   * Performs necessary throttling checks before a network request.
   * @param cacheManager
   * @param thumbprint
   */
  static preProcess(e, t, n) {
    var s;
    const i = et.generateThrottlingStorageKey(t), o = e.getThrottlingCache(i);
    if (o) {
      if (o.throttleTime < Date.now()) {
        e.removeItem(i, n);
        return;
      }
      throw new Qt(((s = o.errorCodes) == null ? void 0 : s.join(" ")) || w.EMPTY_STRING, o.errorMessage, o.subError);
    }
  }
  /**
   * Performs necessary throttling checks after a network request.
   * @param cacheManager
   * @param thumbprint
   * @param response
   */
  static postProcess(e, t, n, i) {
    if (et.checkResponseStatus(n) || et.checkResponseForRetryAfter(n)) {
      const o = {
        throttleTime: et.calculateThrottleTime(parseInt(n.headers[ae.RETRY_AFTER])),
        error: n.body.error,
        errorCodes: n.body.error_codes,
        errorMessage: n.body.error_description,
        subError: n.body.suberror
      };
      e.setThrottlingCache(et.generateThrottlingStorageKey(t), o, i);
    }
  }
  /**
   * Checks a NetworkResponse object's status codes against 429 or 5xx
   * @param response
   */
  static checkResponseStatus(e) {
    return e.status === 429 || e.status >= 500 && e.status < 600;
  }
  /**
   * Checks a NetworkResponse object's RetryAfter header
   * @param response
   */
  static checkResponseForRetryAfter(e) {
    return e.headers ? e.headers.hasOwnProperty(ae.RETRY_AFTER) && (e.status < 200 || e.status >= 300) : !1;
  }
  /**
   * Calculates the Unix-time value for a throttle to expire given throttleTime in seconds.
   * @param throttleTime
   */
  static calculateThrottleTime(e) {
    const t = e <= 0 ? 0 : e, n = Date.now() / 1e3;
    return Math.floor(Math.min(n + (t || Rn.DEFAULT_THROTTLE_TIME_SECONDS), n + Rn.DEFAULT_MAX_THROTTLE_TIME_SECONDS) * 1e3);
  }
  static removeThrottle(e, t, n, i) {
    const o = wo(t, n, i), s = this.generateThrottlingStorageKey(o);
    e.removeItem(s, n.correlationId);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class Ro extends Z {
  constructor(e, t, n) {
    super(e.errorCode, e.errorMessage, e.subError), Object.setPrototypeOf(this, Ro.prototype), this.name = "NetworkError", this.error = e, this.httpStatus = t, this.responseHeaders = n;
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class St {
  constructor(e, t) {
    this.config = dh(e), this.logger = new it(this.config.loggerOptions, Fc, ho), this.cryptoUtils = this.config.cryptoInterface, this.cacheManager = this.config.storageInterface, this.networkClient = this.config.networkInterface, this.serverTelemetryManager = this.config.serverTelemetryManager, this.authority = this.config.authOptions.authority, this.performanceClient = t;
  }
  /**
   * Creates default headers for requests to token endpoint
   */
  createTokenRequestHeaders(e) {
    const t = {};
    if (t[ae.CONTENT_TYPE] = w.URL_FORM_CONTENT_TYPE, !this.config.systemOptions.preventCorsPreflight && e)
      switch (e.type) {
        case Le.HOME_ACCOUNT_ID:
          try {
            const n = Ut(e.credential);
            t[ae.CCS_HEADER] = `Oid:${n.uid}@${n.utid}`;
          } catch (n) {
            this.logger.verbose("Could not parse home account ID for CCS Header: " + n);
          }
          break;
        case Le.UPN:
          t[ae.CCS_HEADER] = `UPN: ${e.credential}`;
          break;
      }
    return t;
  }
  /**
   * Http post to token endpoint
   * @param tokenEndpoint
   * @param queryString
   * @param headers
   * @param thumbprint
   */
  async executePostToTokenEndpoint(e, t, n, i, o, s) {
    var c;
    s && ((c = this.performanceClient) == null || c.addQueueMeasurement(s, o));
    const a = await this.sendPostRequest(i, e, { body: t, headers: n }, o);
    return this.config.serverTelemetryManager && a.status < 500 && a.status !== 429 && this.config.serverTelemetryManager.clearTelemetryCache(), a;
  }
  /**
   * Wraps sendPostRequestAsync with necessary preflight and postflight logic
   * @param thumbprint - Request thumbprint for throttling
   * @param tokenEndpoint - Endpoint to make the POST to
   * @param options - Body and Headers to include on the POST request
   * @param correlationId - CorrelationId for telemetry
   */
  async sendPostRequest(e, t, n, i) {
    var s, a, c;
    et.preProcess(this.cacheManager, e, i);
    let o;
    try {
      o = await Y(this.networkClient.sendPostRequestAsync.bind(this.networkClient), U.NetworkClientSendPostRequestAsync, this.logger, this.performanceClient, i)(t, n);
      const l = o.headers || {};
      (a = this.performanceClient) == null || a.addFields({
        refreshTokenSize: ((s = o.body.refresh_token) == null ? void 0 : s.length) || 0,
        httpVerToken: l[ae.X_MS_HTTP_VERSION] || "",
        requestId: l[ae.X_MS_REQUEST_ID] || ""
      }, i);
    } catch (l) {
      if (l instanceof Ro) {
        const u = l.responseHeaders;
        throw u && ((c = this.performanceClient) == null || c.addFields({
          httpVerToken: u[ae.X_MS_HTTP_VERSION] || "",
          requestId: u[ae.X_MS_REQUEST_ID] || "",
          contentTypeHeader: u[ae.CONTENT_TYPE] || void 0,
          contentLengthHeader: u[ae.CONTENT_LENGTH] || void 0,
          httpStatus: l.httpStatus
        }, i)), l.error;
      }
      throw l instanceof Z ? l : N(_r);
    }
    return et.postProcess(this.cacheManager, e, o, i), o;
  }
  /**
   * Updates the authority object of the client. Endpoint discovery must be completed.
   * @param updatedAuthority
   */
  async updateAuthority(e, t) {
    var o;
    (o = this.performanceClient) == null || o.addQueueMeasurement(U.UpdateTokenEndpointAuthority, t);
    const n = `https://${e}/${this.authority.tenant}/`, i = await gl(n, this.networkClient, this.cacheManager, this.authority.options, this.logger, t, this.performanceClient);
    this.authority = i;
  }
  /**
   * Creates query string for the /token request
   * @param request
   */
  createTokenQueryParameters(e) {
    const t = /* @__PURE__ */ new Map();
    return e.embeddedClientId && Sr(t, this.config.authOptions.clientId, this.config.authOptions.redirectUri), e.tokenQueryParameters && He(t, e.tokenQueryParameters), Ct(t, e.correlationId), _o(t, e.correlationId, this.performanceClient), Ie(t);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const $i = "no_tokens_found", bf = "native_account_unavailable", pl = "refresh_token_expired", ml = "ux_not_allowed", kf = "interaction_required", vf = "consent_required", Of = "login_required", bo = "bad_token";
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Es = [
  kf,
  vf,
  Of,
  bo,
  ml
], Pf = [
  "message_only",
  "additional_action",
  "basic_action",
  "user_password_expired",
  "consent_required",
  "bad_token"
], Nf = {
  [$i]: "No refresh token found in the cache. Please sign-in.",
  [bf]: "The requested account is not available in the native broker. It may have been deleted or logged out. Please sign-in again using an interactive API.",
  [pl]: "Refresh token has expired.",
  [bo]: "Identity provider returned bad_token due to an expired or invalid refresh token. Please invoke an interactive API to resolve.",
  [ml]: "`canShowUI` flag in Edge was set to false. User interaction required on web page. Please invoke an interactive API to resolve."
};
class zt extends Z {
  constructor(e, t, n, i, o, s, a, c) {
    super(e, t, n), Object.setPrototypeOf(this, zt.prototype), this.timestamp = i || w.EMPTY_STRING, this.traceId = o || w.EMPTY_STRING, this.correlationId = s || w.EMPTY_STRING, this.claims = a || w.EMPTY_STRING, this.name = "InteractionRequiredAuthError", this.errorNo = c;
  }
}
function Mf(r, e, t) {
  const n = !!r && Es.indexOf(r) > -1, i = !!t && Pf.indexOf(t) > -1, o = !!e && Es.some((s) => e.indexOf(s) > -1);
  return n || o || i;
}
function As(r) {
  return new zt(r, Nf[r]);
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class ko {
  /**
   * Appends user state with random guid, or returns random guid.
   * @param userState
   * @param randomGuid
   */
  static setRequestState(e, t, n) {
    const i = ko.generateLibraryState(e, n);
    return t ? `${i}${w.RESOURCE_DELIM}${t}` : i;
  }
  /**
   * Generates the state value used by the common library.
   * @param randomGuid
   * @param cryptoObj
   */
  static generateLibraryState(e, t) {
    if (!e)
      throw N(Di);
    const n = {
      id: e.createNewGuid()
    };
    t && (n.meta = t);
    const i = JSON.stringify(n);
    return e.base64Encode(i);
  }
  /**
   * Parses the state into the RequestStateObject, which contains the LibraryState info and the state passed by the user.
   * @param state
   * @param cryptoObj
   */
  static parseRequestState(e, t) {
    if (!e)
      throw N(Di);
    if (!t)
      throw N(Ni);
    try {
      const n = t.split(w.RESOURCE_DELIM), i = n[0], o = n.length > 1 ? n.slice(1).join(w.RESOURCE_DELIM) : w.EMPTY_STRING, s = e.base64Decode(i), a = JSON.parse(s);
      return {
        userRequestState: o || w.EMPTY_STRING,
        libraryState: a
      };
    } catch {
      throw N(Ni);
    }
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Df = {
  SW: "sw"
};
class vo {
  constructor(e, t) {
    this.cryptoUtils = e, this.performanceClient = t;
  }
  /**
   * Generates the req_cnf validated at the RP in the POP protocol for SHR parameters
   * and returns an object containing the keyid, the full req_cnf string and the req_cnf string hash
   * @param request
   * @returns
   */
  async generateCnf(e, t) {
    var o;
    (o = this.performanceClient) == null || o.addQueueMeasurement(U.PopTokenGenerateCnf, e.correlationId);
    const n = await Y(this.generateKid.bind(this), U.PopTokenGenerateCnf, t, this.performanceClient, e.correlationId)(e), i = this.cryptoUtils.base64UrlEncode(JSON.stringify(n));
    return {
      kid: n.kid,
      reqCnfString: i
    };
  }
  /**
   * Generates key_id for a SHR token request
   * @param request
   * @returns
   */
  async generateKid(e) {
    var n;
    return (n = this.performanceClient) == null || n.addQueueMeasurement(U.PopTokenGenerateKid, e.correlationId), {
      kid: await this.cryptoUtils.getPublicKeyThumbprint(e),
      xms_ksl: Df.SW
    };
  }
  /**
   * Signs the POP access_token with the local generated key-pair
   * @param accessToken
   * @param request
   * @returns
   */
  async signPopToken(e, t, n) {
    return this.signPayload(e, t, n);
  }
  /**
   * Utility function to generate the signed JWT for an access_token
   * @param payload
   * @param kid
   * @param request
   * @param claims
   * @returns
   */
  async signPayload(e, t, n, i) {
    const { resourceRequestMethod: o, resourceRequestUri: s, shrClaims: a, shrNonce: c, shrOptions: l } = n, u = s ? new K(s) : void 0, d = u == null ? void 0 : u.getUrlComponents();
    return this.cryptoUtils.signJwt({
      at: e,
      ts: te(),
      m: o == null ? void 0 : o.toUpperCase(),
      u: d == null ? void 0 : d.HostNameAndPort,
      nonce: c || this.cryptoUtils.createNewGuid(),
      p: d == null ? void 0 : d.AbsolutePath,
      q: d != null && d.QueryString ? [[], d.QueryString] : void 0,
      client_claims: a || void 0,
      ...i
    }, t, l, n.correlationId);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class On {
  constructor(e, t) {
    this.cache = e, this.hasChanged = t;
  }
  /**
   * boolean which indicates the changes in cache
   */
  get cacheHasChanged() {
    return this.hasChanged;
  }
  /**
   * function to retrieve the token cache
   */
  get tokenCache() {
    return this.cache;
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class Se {
  constructor(e, t, n, i, o, s, a) {
    this.clientId = e, this.cacheStorage = t, this.cryptoObj = n, this.logger = i, this.serializableCache = o, this.persistencePlugin = s, this.performanceClient = a;
  }
  /**
   * Function which validates server authorization token response.
   * @param serverResponse
   * @param refreshAccessToken
   */
  validateTokenResponse(e, t) {
    var n;
    if (e.error || e.error_description || e.suberror) {
      const i = `Error(s): ${e.error_codes || w.NOT_AVAILABLE} - Timestamp: ${e.timestamp || w.NOT_AVAILABLE} - Description: ${e.error_description || w.NOT_AVAILABLE} - Correlation ID: ${e.correlation_id || w.NOT_AVAILABLE} - Trace ID: ${e.trace_id || w.NOT_AVAILABLE}`, o = (n = e.error_codes) != null && n.length ? e.error_codes[0] : void 0, s = new Qt(e.error, i, e.suberror, o, e.status);
      if (t && e.status && e.status >= G.SERVER_ERROR_RANGE_START && e.status <= G.SERVER_ERROR_RANGE_END) {
        this.logger.warning(`executeTokenRequest:validateTokenResponse - AAD is currently unavailable and the access token is unable to be refreshed.
${s}`);
        return;
      } else if (t && e.status && e.status >= G.CLIENT_ERROR_RANGE_START && e.status <= G.CLIENT_ERROR_RANGE_END) {
        this.logger.warning(`executeTokenRequest:validateTokenResponse - AAD is currently available but is unable to refresh the access token.
${s}`);
        return;
      }
      throw Mf(e.error, e.error_description, e.suberror) ? new zt(e.error, e.error_description, e.suberror, e.timestamp || w.EMPTY_STRING, e.trace_id || w.EMPTY_STRING, e.correlation_id || w.EMPTY_STRING, e.claims || w.EMPTY_STRING, o) : s;
    }
  }
  /**
   * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
   * @param serverTokenResponse
   * @param authority
   */
  async handleServerTokenResponse(e, t, n, i, o, s, a, c, l, u) {
    var y, T;
    (y = this.performanceClient) == null || y.addQueueMeasurement(U.HandleServerTokenResponse, e.correlation_id);
    let d;
    if (e.id_token) {
      if (d = Ln(e.id_token || w.EMPTY_STRING, this.cryptoObj.base64Decode), s && s.nonce && d.nonce !== s.nonce)
        throw N(wc);
      if (i.maxAge || i.maxAge === 0) {
        const g = d.auth_time;
        if (!g)
          throw N(ao);
        Zc(g, i.maxAge);
      }
    }
    this.homeAccountIdentifier = Oe.generateHomeAccountId(e.client_info || w.EMPTY_STRING, t.authorityType, this.logger, this.cryptoObj, d);
    let f;
    s && s.state && (f = ko.parseRequestState(this.cryptoObj, s.state)), e.key_id = e.key_id || i.sshKid || void 0;
    const p = this.generateCacheRecord(e, t, n, i, d, a, s);
    let h;
    try {
      if (this.persistencePlugin && this.serializableCache && (this.logger.verbose("Persistence enabled, calling beforeCacheAccess"), h = new On(this.serializableCache, !0), await this.persistencePlugin.beforeCacheAccess(h)), c && !l && p.account && this.cacheStorage.getAllAccounts({
        homeAccountId: p.account.homeAccountId,
        environment: p.account.environment
      }, i.correlationId).length < 1)
        return this.logger.warning("Account used to refresh tokens not in persistence, refreshed tokens will not be stored in the cache"), (T = this.performanceClient) == null || T.addFields({
          acntLoggedOut: !0
        }, i.correlationId), await Se.generateAuthenticationResult(this.cryptoObj, t, p, !1, i, d, f, void 0, u);
      await this.cacheStorage.saveCacheRecord(p, i.correlationId, Yu(d || {}), o, i.storeInCache);
    } finally {
      this.persistencePlugin && this.serializableCache && h && (this.logger.verbose("Persistence enabled, calling afterCacheAccess"), await this.persistencePlugin.afterCacheAccess(h));
    }
    return Se.generateAuthenticationResult(this.cryptoObj, t, p, !1, i, d, f, e, u);
  }
  /**
   * Generates CacheRecord
   * @param serverTokenResponse
   * @param idTokenObj
   * @param authority
   */
  generateCacheRecord(e, t, n, i, o, s, a) {
    var y;
    const c = t.getPreferredCache();
    if (!c)
      throw N(uo);
    const l = Jc(o);
    let u, d;
    e.id_token && o && (u = Tf(this.homeAccountIdentifier, c, e.id_token, this.clientId, l || ""), d = Uf(
      this.cacheStorage,
      t,
      this.homeAccountIdentifier,
      this.cryptoObj.base64Decode,
      i.correlationId,
      o,
      e.client_info,
      c,
      l,
      a,
      void 0,
      // nativeAccountId
      this.logger
    ));
    let f = null;
    if (e.access_token) {
      const T = e.scope ? de.fromString(e.scope) : new de(i.scopes || []), g = (typeof e.expires_in == "string" ? parseInt(e.expires_in, 10) : e.expires_in) || 0, m = (typeof e.ext_expires_in == "string" ? parseInt(e.ext_expires_in, 10) : e.ext_expires_in) || 0, E = (typeof e.refresh_in == "string" ? parseInt(e.refresh_in, 10) : e.refresh_in) || void 0, C = n + g, P = C + m, k = E && E > 0 ? n + E : void 0;
      f = Ef(this.homeAccountIdentifier, c, e.access_token, this.clientId, l || t.tenant || "", T.printScopes(), C, P, this.cryptoObj.base64Decode, k, e.token_type, s, e.key_id, i.claims, i.requestedClaimsHash);
    }
    let p = null;
    if (e.refresh_token) {
      let T;
      if (e.refresh_token_expires_in) {
        const g = typeof e.refresh_token_expires_in == "string" ? parseInt(e.refresh_token_expires_in, 10) : e.refresh_token_expires_in;
        T = n + g, (y = this.performanceClient) == null || y.addFields({
          ntwkRtExpiresOnSeconds: T
        }, i.correlationId);
      }
      p = Af(this.homeAccountIdentifier, c, e.refresh_token, this.clientId, e.foci, s, T);
    }
    let h = null;
    return e.foci && (h = {
      clientId: this.clientId,
      environment: c,
      familyId: e.foci
    }), {
      account: d,
      idToken: u,
      accessToken: f,
      refreshToken: p,
      appMetadata: h
    };
  }
  /**
   * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
   *
   * Optionally takes a state string that is set as-is in the response.
   *
   * @param cacheRecord
   * @param idTokenObj
   * @param fromTokenCache
   * @param stateString
   */
  static async generateAuthenticationResult(e, t, n, i, o, s, a, c, l) {
    var E, C, P, k, I;
    let u = w.EMPTY_STRING, d = [], f = null, p, h, y = w.EMPTY_STRING;
    if (n.accessToken) {
      if (n.accessToken.tokenType === Q.POP && !o.popKid) {
        const _ = new vo(e), { secret: A, keyId: R } = n.accessToken;
        if (!R)
          throw N($c);
        u = await _.signPopToken(A, R, o);
      } else
        u = n.accessToken.secret;
      d = de.fromString(n.accessToken.target).asArray(), f = zr(n.accessToken.expiresOn), p = zr(n.accessToken.extendedExpiresOn), n.accessToken.refreshOn && (h = zr(n.accessToken.refreshOn));
    }
    n.appMetadata && (y = n.appMetadata.familyId === ur ? ur : "");
    const T = (s == null ? void 0 : s.oid) || (s == null ? void 0 : s.sub) || "", g = (s == null ? void 0 : s.tid) || "";
    c != null && c.spa_accountid && n.account && (n.account.nativeAccountId = c == null ? void 0 : c.spa_accountid);
    const m = n.account ? Qc(
      Oe.getAccountInfo(n.account),
      void 0,
      // tenantProfile optional
      s,
      (E = n.idToken) == null ? void 0 : E.secret
    ) : null;
    return {
      authority: t.canonicalAuthority,
      uniqueId: T,
      tenantId: g,
      scopes: d,
      account: m,
      idToken: ((C = n == null ? void 0 : n.idToken) == null ? void 0 : C.secret) || "",
      idTokenClaims: s || {},
      accessToken: u,
      fromCache: i,
      expiresOn: f,
      extExpiresOn: p,
      refreshOn: h,
      correlationId: o.correlationId,
      requestId: l || w.EMPTY_STRING,
      familyId: y,
      tokenType: ((P = n.accessToken) == null ? void 0 : P.tokenType) || w.EMPTY_STRING,
      state: a ? a.userRequestState : w.EMPTY_STRING,
      cloudGraphHostName: ((k = n.account) == null ? void 0 : k.cloudGraphHostName) || w.EMPTY_STRING,
      msGraphHost: ((I = n.account) == null ? void 0 : I.msGraphHost) || w.EMPTY_STRING,
      code: c == null ? void 0 : c.spa_code,
      fromNativeBroker: !1
    };
  }
}
function Uf(r, e, t, n, i, o, s, a, c, l, u, d) {
  d == null || d.verbose("setCachedAccount called");
  const p = r.getAccountKeys().find((m) => m.startsWith(t));
  let h = null;
  p && (h = r.getAccount(p, i));
  const y = h || Oe.createAccount({
    homeAccountId: t,
    idTokenClaims: o,
    clientInfo: s,
    environment: a,
    cloudGraphHostName: l == null ? void 0 : l.cloud_graph_host_name,
    msGraphHost: l == null ? void 0 : l.msgraph_host,
    nativeAccountId: u
  }, e, n), T = y.tenantProfiles || [], g = c || y.realm;
  if (g && !T.find((m) => m.tenantId === g)) {
    const m = bn(t, y.localAccountId, g, o);
    T.push(m);
  }
  return y.tenantProfiles = T, y;
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
async function wt(r, e, t) {
  return typeof r == "string" ? r : r({
    clientId: e,
    tokenEndpoint: t
  });
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class xf extends St {
  constructor(e, t) {
    var n;
    super(e, t), this.includeRedirectUri = !0, this.oidcDefaultScopes = (n = this.config.authOptions.authority.options.OIDCOptions) == null ? void 0 : n.defaultScopes;
  }
  /**
   * API to acquire a token in exchange of 'authorization_code` acquired by the user in the first leg of the
   * authorization_code_grant
   * @param request
   * @param apiId - API identifier for telemetry tracking
   */
  async acquireToken(e, t, n) {
    var c, l;
    if ((c = this.performanceClient) == null || c.addQueueMeasurement(U.AuthClientAcquireToken, e.correlationId), !e.code)
      throw N(kc);
    const i = te(), o = await Y(this.executeTokenRequest.bind(this), U.AuthClientExecuteTokenRequest, this.logger, this.performanceClient, e.correlationId)(this.authority, e), s = (l = o.headers) == null ? void 0 : l[ae.X_MS_REQUEST_ID], a = new Se(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin, this.performanceClient);
    return a.validateTokenResponse(o.body), Y(a.handleServerTokenResponse.bind(a), U.HandleServerTokenResponse, this.logger, this.performanceClient, e.correlationId)(o.body, this.authority, i, e, t, n, void 0, void 0, void 0, s);
  }
  /**
   * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
   * Default behaviour is to redirect the user to `window.location.href`.
   * @param authorityUri
   */
  getLogoutUri(e) {
    if (!e)
      throw re(jc);
    const t = this.createLogoutUrlQueryString(e);
    return K.appendQueryString(this.authority.endSessionEndpoint, t);
  }
  /**
   * Executes POST request to token endpoint
   * @param authority
   * @param request
   */
  async executeTokenRequest(e, t) {
    var l;
    (l = this.performanceClient) == null || l.addQueueMeasurement(U.AuthClientExecuteTokenRequest, t.correlationId);
    const n = this.createTokenQueryParameters(t), i = K.appendQueryString(e.tokenEndpoint, n), o = await Y(this.createTokenRequestBody.bind(this), U.AuthClientCreateTokenRequestBody, this.logger, this.performanceClient, t.correlationId)(t);
    let s;
    if (t.clientInfo)
      try {
        const u = fr(t.clientInfo, this.cryptoUtils.base64Decode);
        s = {
          credential: `${u.uid}${Mn.CLIENT_INFO_SEPARATOR}${u.utid}`,
          type: Le.HOME_ACCOUNT_ID
        };
      } catch (u) {
        this.logger.verbose("Could not parse client info for CCS Header: " + u);
      }
    const a = this.createTokenRequestHeaders(s || t.ccsCredential), c = wo(this.config.authOptions.clientId, t);
    return Y(this.executePostToTokenEndpoint.bind(this), U.AuthorizationCodeClientExecutePostToTokenEndpoint, this.logger, this.performanceClient, t.correlationId)(i, o, a, c, t.correlationId, U.AuthorizationCodeClientExecutePostToTokenEndpoint);
  }
  /**
   * Generates a map for all the params to be sent to the service
   * @param request
   */
  async createTokenRequestBody(e) {
    var i, o;
    (i = this.performanceClient) == null || i.addQueueMeasurement(U.AuthClientCreateTokenRequestBody, e.correlationId);
    const t = /* @__PURE__ */ new Map();
    if (st(t, e.embeddedClientId || ((o = e.tokenBodyParameters) == null ? void 0 : o[Hn]) || this.config.authOptions.clientId), this.includeRedirectUri)
      Io(t, e.redirectUri);
    else if (!e.redirectUri)
      throw re(zc);
    if (ot(t, e.scopes, !0, this.oidcDefaultScopes), tf(t, e.code), _t(t, this.config.libraryInfo), It(t, this.config.telemetry.application), Wt(t), this.serverTelemetryManager && !il(this.config) && Yt(t, this.serverTelemetryManager), e.codeVerifier && of(t, e.codeVerifier), this.config.clientCredentials.clientSecret && $n(t, this.config.clientCredentials.clientSecret), this.config.clientCredentials.clientAssertion) {
      const s = this.config.clientCredentials.clientAssertion;
      Bn(t, await wt(s.assertion, this.config.authOptions.clientId, e.resourceRequestUri)), Fn(t, s.assertionType);
    }
    if (jt(t, Vt.AUTHORIZATION_CODE_GRANT), Kt(t), e.authenticationScheme === Q.POP) {
      const s = new vo(this.cryptoUtils, this.performanceClient);
      let a;
      e.popKid ? a = this.cryptoUtils.encodeKid(e.popKid) : a = (await Y(s.generateCnf.bind(s), U.PopTokenGenerateCnf, this.logger, this.performanceClient, e.correlationId)(e, this.logger)).reqCnfString, ul(t, a);
    } else if (e.authenticationScheme === Q.SSH)
      if (e.sshJwk)
        hl(t, e.sshJwk);
      else
        throw re(yo);
    (!ve.isEmptyObj(e.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && at(t, e.claims, this.config.authOptions.clientCapabilities);
    let n;
    if (e.clientInfo)
      try {
        const s = fr(e.clientInfo, this.cryptoUtils.base64Decode);
        n = {
          credential: `${s.uid}${Mn.CLIENT_INFO_SEPARATOR}${s.utid}`,
          type: Le.HOME_ACCOUNT_ID
        };
      } catch (s) {
        this.logger.verbose("Could not parse client info for CCS Header: " + s);
      }
    else
      n = e.ccsCredential;
    if (this.config.systemOptions.preventCorsPreflight && n)
      switch (n.type) {
        case Le.HOME_ACCOUNT_ID:
          try {
            const s = Ut(n.credential);
            vn(t, s);
          } catch (s) {
            this.logger.verbose("Could not parse home account ID for CCS Header: " + s);
          }
          break;
        case Le.UPN:
          Dn(t, n.credential);
          break;
      }
    return e.embeddedClientId && Sr(t, this.config.authOptions.clientId, this.config.authOptions.redirectUri), e.tokenBodyParameters && He(t, e.tokenBodyParameters), e.enableSpaAuthorizationCode && (!e.tokenBodyParameters || !e.tokenBodyParameters[ls]) && He(t, {
      [ls]: "1"
    }), _o(t, e.correlationId, this.performanceClient), Ie(t);
  }
  /**
   * This API validates the `EndSessionRequest` and creates a URL
   * @param request
   */
  createLogoutUrlQueryString(e) {
    const t = /* @__PURE__ */ new Map();
    return e.postLogoutRedirectUri && Wh(t, e.postLogoutRedirectUri), e.correlationId && Ct(t, e.correlationId), e.idTokenHint && Qh(t, e.idTokenHint), e.state && ll(t, e.state), e.logoutHint && uf(t, e.logoutHint), e.extraQueryParameters && He(t, e.extraQueryParameters), this.config.authOptions.instanceAware && dl(t), Ie(t, this.config.authOptions.encodeExtraQueryParams, e.extraQueryParameters);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Lf = 300;
class Gr extends St {
  constructor(e, t) {
    super(e, t);
  }
  async acquireToken(e, t) {
    var a, c;
    (a = this.performanceClient) == null || a.addQueueMeasurement(U.RefreshTokenClientAcquireToken, e.correlationId);
    const n = te(), i = await Y(this.executeTokenRequest.bind(this), U.RefreshTokenClientExecuteTokenRequest, this.logger, this.performanceClient, e.correlationId)(e, this.authority), o = (c = i.headers) == null ? void 0 : c[ae.X_MS_REQUEST_ID], s = new Se(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
    return s.validateTokenResponse(i.body), Y(s.handleServerTokenResponse.bind(s), U.HandleServerTokenResponse, this.logger, this.performanceClient, e.correlationId)(i.body, this.authority, n, e, t, void 0, void 0, !0, e.forceCache, o);
  }
  /**
   * Gets cached refresh token and attaches to request, then calls acquireToken API
   * @param request
   */
  async acquireTokenByRefreshToken(e, t) {
    var i;
    if (!e)
      throw re(Vc);
    if ((i = this.performanceClient) == null || i.addQueueMeasurement(U.RefreshTokenClientAcquireTokenByRefreshToken, e.correlationId), !e.account)
      throw N(lo);
    if (this.cacheManager.isAppMetadataFOCI(e.account.environment))
      try {
        return await Y(this.acquireTokenWithCachedRefreshToken.bind(this), U.RefreshTokenClientAcquireTokenWithCachedRefreshToken, this.logger, this.performanceClient, e.correlationId)(e, !0, t);
      } catch (o) {
        const s = o instanceof zt && o.errorCode === $i, a = o instanceof Qt && o.errorCode === ns.INVALID_GRANT_ERROR && o.subError === ns.CLIENT_MISMATCH_ERROR;
        if (s || a)
          return Y(this.acquireTokenWithCachedRefreshToken.bind(this), U.RefreshTokenClientAcquireTokenWithCachedRefreshToken, this.logger, this.performanceClient, e.correlationId)(e, !1, t);
        throw o;
      }
    return Y(this.acquireTokenWithCachedRefreshToken.bind(this), U.RefreshTokenClientAcquireTokenWithCachedRefreshToken, this.logger, this.performanceClient, e.correlationId)(e, !1, t);
  }
  /**
   * makes a network call to acquire tokens by exchanging RefreshToken available in userCache; throws if refresh token is not cached
   * @param request
   */
  async acquireTokenWithCachedRefreshToken(e, t, n) {
    var s, a;
    (s = this.performanceClient) == null || s.addQueueMeasurement(U.RefreshTokenClientAcquireTokenWithCachedRefreshToken, e.correlationId);
    const i = pf(this.cacheManager.getRefreshToken.bind(this.cacheManager), U.CacheManagerGetRefreshToken, this.logger, this.performanceClient, e.correlationId)(e.account, t, e.correlationId, void 0, this.performanceClient);
    if (!i)
      throw As($i);
    if (i.expiresOn) {
      const c = e.refreshTokenExpirationOffsetSeconds || Lf;
      if ((a = this.performanceClient) == null || a.addFields({
        cacheRtExpiresOnSeconds: Number(i.expiresOn),
        rtOffsetSeconds: c
      }, e.correlationId), Ft(i.expiresOn, c))
        throw As(pl);
    }
    const o = {
      ...e,
      refreshToken: i.secret,
      authenticationScheme: e.authenticationScheme || Q.BEARER,
      ccsCredential: {
        credential: e.account.homeAccountId,
        type: Le.HOME_ACCOUNT_ID
      }
    };
    try {
      return await Y(this.acquireToken.bind(this), U.RefreshTokenClientAcquireToken, this.logger, this.performanceClient, e.correlationId)(o, n);
    } catch (c) {
      if (c instanceof zt && c.subError === bo) {
        this.logger.verbose("acquireTokenWithRefreshToken: bad refresh token, removing from cache");
        const l = this.cacheManager.generateCredentialKey(i);
        this.cacheManager.removeRefreshToken(l, e.correlationId);
      }
      throw c;
    }
  }
  /**
   * Constructs the network message and makes a NW call to the underlying secure token service
   * @param request
   * @param authority
   */
  async executeTokenRequest(e, t) {
    var c;
    (c = this.performanceClient) == null || c.addQueueMeasurement(U.RefreshTokenClientExecuteTokenRequest, e.correlationId);
    const n = this.createTokenQueryParameters(e), i = K.appendQueryString(t.tokenEndpoint, n), o = await Y(this.createTokenRequestBody.bind(this), U.RefreshTokenClientCreateTokenRequestBody, this.logger, this.performanceClient, e.correlationId)(e), s = this.createTokenRequestHeaders(e.ccsCredential), a = wo(this.config.authOptions.clientId, e);
    return Y(this.executePostToTokenEndpoint.bind(this), U.RefreshTokenClientExecutePostToTokenEndpoint, this.logger, this.performanceClient, e.correlationId)(i, o, s, a, e.correlationId, U.RefreshTokenClientExecutePostToTokenEndpoint);
  }
  /**
   * Helper function to create the token request body
   * @param request
   */
  async createTokenRequestBody(e) {
    var n, i, o;
    (n = this.performanceClient) == null || n.addQueueMeasurement(U.RefreshTokenClientCreateTokenRequestBody, e.correlationId);
    const t = /* @__PURE__ */ new Map();
    if (st(t, e.embeddedClientId || ((i = e.tokenBodyParameters) == null ? void 0 : i[Hn]) || this.config.authOptions.clientId), e.redirectUri && Io(t, e.redirectUri), ot(t, e.scopes, !0, (o = this.config.authOptions.authority.options.OIDCOptions) == null ? void 0 : o.defaultScopes), jt(t, Vt.REFRESH_TOKEN_GRANT), Kt(t), _t(t, this.config.libraryInfo), It(t, this.config.telemetry.application), Wt(t), this.serverTelemetryManager && !il(this.config) && Yt(t, this.serverTelemetryManager), rf(t, e.refreshToken), this.config.clientCredentials.clientSecret && $n(t, this.config.clientCredentials.clientSecret), this.config.clientCredentials.clientAssertion) {
      const s = this.config.clientCredentials.clientAssertion;
      Bn(t, await wt(s.assertion, this.config.authOptions.clientId, e.resourceRequestUri)), Fn(t, s.assertionType);
    }
    if (e.authenticationScheme === Q.POP) {
      const s = new vo(this.cryptoUtils, this.performanceClient);
      let a;
      e.popKid ? a = this.cryptoUtils.encodeKid(e.popKid) : a = (await Y(s.generateCnf.bind(s), U.PopTokenGenerateCnf, this.logger, this.performanceClient, e.correlationId)(e, this.logger)).reqCnfString, ul(t, a);
    } else if (e.authenticationScheme === Q.SSH)
      if (e.sshJwk)
        hl(t, e.sshJwk);
      else
        throw re(yo);
    if ((!ve.isEmptyObj(e.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && at(t, e.claims, this.config.authOptions.clientCapabilities), this.config.systemOptions.preventCorsPreflight && e.ccsCredential)
      switch (e.ccsCredential.type) {
        case Le.HOME_ACCOUNT_ID:
          try {
            const s = Ut(e.ccsCredential.credential);
            vn(t, s);
          } catch (s) {
            this.logger.verbose("Could not parse home account ID for CCS Header: " + s);
          }
          break;
        case Le.UPN:
          Dn(t, e.ccsCredential.credential);
          break;
      }
    return e.embeddedClientId && Sr(t, this.config.authOptions.clientId, this.config.authOptions.redirectUri), e.tokenBodyParameters && He(t, e.tokenBodyParameters), _o(t, e.correlationId, this.performanceClient), Ie(t);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
class Hf extends St {
  constructor(e, t) {
    super(e, t);
  }
  /**
   * Retrieves token from cache or throws an error if it must be refreshed.
   * @param request
   */
  async acquireCachedToken(e) {
    var c;
    (c = this.performanceClient) == null || c.addQueueMeasurement(U.SilentFlowClientAcquireCachedToken, e.correlationId);
    let t = oe.NOT_APPLICABLE;
    if (e.forceRefresh || !this.config.cacheOptions.claimsBasedCachingEnabled && !ve.isEmptyObj(e.claims))
      throw this.setCacheOutcome(oe.FORCE_REFRESH_OR_CLAIMS, e.correlationId), N(yt);
    if (!e.account)
      throw N(lo);
    const n = e.account.tenantId || wf(e.authority), i = this.cacheManager.getTokenKeys(), o = this.cacheManager.getAccessToken(e.account, e, i, n);
    if (o) {
      if (mf(o.cachedAt) || Ft(o.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds))
        throw this.setCacheOutcome(oe.CACHED_ACCESS_TOKEN_EXPIRED, e.correlationId), N(yt);
      o.refreshOn && Ft(o.refreshOn, 0) && (t = oe.PROACTIVELY_REFRESHED);
    } else throw this.setCacheOutcome(oe.NO_CACHED_ACCESS_TOKEN, e.correlationId), N(yt);
    const s = e.authority || this.authority.getPreferredCache(), a = {
      account: this.cacheManager.getAccount(this.cacheManager.generateAccountKey(e.account), e.correlationId),
      accessToken: o,
      idToken: this.cacheManager.getIdToken(e.account, e.correlationId, i, n, this.performanceClient),
      refreshToken: null,
      appMetadata: this.cacheManager.readAppMetadataFromCache(s)
    };
    return this.setCacheOutcome(t, e.correlationId), this.config.serverTelemetryManager && this.config.serverTelemetryManager.incrementCacheHits(), [
      await Y(this.generateResultFromCacheRecord.bind(this), U.SilentFlowClientGenerateResultFromCacheRecord, this.logger, this.performanceClient, e.correlationId)(a, e),
      t
    ];
  }
  setCacheOutcome(e, t) {
    var n, i;
    (n = this.serverTelemetryManager) == null || n.setCacheOutcome(e), (i = this.performanceClient) == null || i.addFields({
      cacheOutcome: e
    }, t), e !== oe.NOT_APPLICABLE && this.logger.info(`Token refresh is required due to cache outcome: ${e}`);
  }
  /**
   * Helper function to build response object from the CacheRecord
   * @param cacheRecord
   */
  async generateResultFromCacheRecord(e, t) {
    var i;
    (i = this.performanceClient) == null || i.addQueueMeasurement(U.SilentFlowClientGenerateResultFromCacheRecord, t.correlationId);
    let n;
    if (e.idToken && (n = Ln(e.idToken.secret, this.config.cryptoInterface.base64Decode)), t.maxAge || t.maxAge === 0) {
      const o = n == null ? void 0 : n.auth_time;
      if (!o)
        throw N(ao);
      Zc(o, t.maxAge);
    }
    return Se.generateAuthenticationResult(this.cryptoUtils, this.authority, e, !0, t, n);
  }
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
function $f(r, e, t, n) {
  var a, c;
  const i = e.correlationId, o = /* @__PURE__ */ new Map();
  st(o, e.embeddedClientId || ((a = e.extraQueryParameters) == null ? void 0 : a[Hn]) || r.clientId);
  const s = [
    ...e.scopes || [],
    ...e.extraScopesToConsent || []
  ];
  if (ot(o, s, !0, (c = r.authority.options.OIDCOptions) == null ? void 0 : c.defaultScopes), Io(o, e.redirectUri), Ct(o, i), Yh(o, e.responseMode), Kt(o), e.prompt && Zh(o, e.prompt), e.domainHint && Jh(o, e.domainHint), e.prompt !== $r.SELECT_ACCOUNT)
    if (e.sid && e.prompt === $r.NONE)
      t.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from request"), hs(o, e.sid);
    else if (e.account) {
      const l = Ff(e.account);
      let u = zf(e.account);
      if (u && e.domainHint && (t.warning('AuthorizationCodeClient.createAuthCodeUrlQueryString: "domainHint" param is set, skipping opaque "login_hint" claim. Please consider not passing domainHint'), u = null), u) {
        t.verbose("createAuthCodeUrlQueryString: login_hint claim present on account"), Kn(o, u);
        try {
          const d = Ut(e.account.homeAccountId);
          vn(o, d);
        } catch {
          t.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
        }
      } else if (l && e.prompt === $r.NONE) {
        t.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from account"), hs(o, l);
        try {
          const d = Ut(e.account.homeAccountId);
          vn(o, d);
        } catch {
          t.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
        }
      } else if (e.loginHint)
        t.verbose("createAuthCodeUrlQueryString: Adding login_hint from request"), Kn(o, e.loginHint), Dn(o, e.loginHint);
      else if (e.account.username) {
        t.verbose("createAuthCodeUrlQueryString: Adding login_hint from account"), Kn(o, e.account.username);
        try {
          const d = Ut(e.account.homeAccountId);
          vn(o, d);
        } catch {
          t.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
        }
      }
    } else e.loginHint && (t.verbose("createAuthCodeUrlQueryString: No account, adding login_hint from request"), Kn(o, e.loginHint), Dn(o, e.loginHint));
  else
    t.verbose("createAuthCodeUrlQueryString: Prompt is select_account, ignoring account hints");
  return e.nonce && Xh(o, e.nonce), e.state && ll(o, e.state), (e.claims || r.clientCapabilities && r.clientCapabilities.length > 0) && at(o, e.claims, r.clientCapabilities), e.embeddedClientId && Sr(o, r.clientId, r.redirectUri), r.instanceAware && (!e.extraQueryParameters || !Object.keys(e.extraQueryParameters).includes(Hi)) && dl(o), o;
}
function Bf(r, e, t, n) {
  const i = Ie(e, t, n);
  return K.appendQueryString(r.authorizationEndpoint, i);
}
function Ff(r) {
  var e;
  return ((e = r.idTokenClaims) == null ? void 0 : e.sid) || null;
}
function zf(r) {
  var e;
  return r.loginHint || ((e = r.idTokenClaims) == null ? void 0 : e.login_hint) || null;
}
/*! @azure/msal-common v15.14.1 2026-01-17 */
const Cs = ",", yl = "|";
function qf(r) {
  const { skus: e, libraryName: t, libraryVersion: n, extensionName: i, extensionVersion: o } = r, s = /* @__PURE__ */ new Map([
    [0, [t, n]],
    [2, [i, o]]
  ]);
  let a = [];
  if (e != null && e.length) {
    if (a = e.split(Cs), a.length < 4)
      return e;
  } else
    a = Array.from({ length: 4 }, () => yl);
  return s.forEach((c, l) => {
    var u, d;
    c.length === 2 && ((u = c[0]) != null && u.length) && ((d = c[1]) != null && d.length) && Gf({
      skuArr: a,
      index: l,
      skuName: c[0],
      skuVersion: c[1]
    });
  }), a.join(Cs);
}
function Gf(r) {
  const { skuArr: e, index: t, skuName: n, skuVersion: i } = r;
  t >= e.length || (e[t] = [n, i].join(yl));
}
class Un {
  constructor(e, t) {
    this.cacheOutcome = oe.NOT_APPLICABLE, this.cacheManager = t, this.apiId = e.apiId, this.correlationId = e.correlationId, this.wrapperSKU = e.wrapperSKU || w.EMPTY_STRING, this.wrapperVer = e.wrapperVer || w.EMPTY_STRING, this.telemetryCacheKey = se.CACHE_KEY + Mn.CACHE_KEY_SEPARATOR + e.clientId;
  }
  /**
   * API to add MSER Telemetry to request
   */
  generateCurrentRequestHeaderValue() {
    const e = `${this.apiId}${se.VALUE_SEPARATOR}${this.cacheOutcome}`, t = [this.wrapperSKU, this.wrapperVer], n = this.getNativeBrokerErrorCode();
    n != null && n.length && t.push(`broker_error=${n}`);
    const i = t.join(se.VALUE_SEPARATOR), o = this.getRegionDiscoveryFields(), s = [
      e,
      o
    ].join(se.VALUE_SEPARATOR);
    return [
      se.SCHEMA_VERSION,
      s,
      i
    ].join(se.CATEGORY_SEPARATOR);
  }
  /**
   * API to add MSER Telemetry for the last failed request
   */
  generateLastRequestHeaderValue() {
    const e = this.getLastRequests(), t = Un.maxErrorsToSend(e), n = e.failedRequests.slice(0, 2 * t).join(se.VALUE_SEPARATOR), i = e.errors.slice(0, t).join(se.VALUE_SEPARATOR), o = e.errors.length, s = t < o ? se.OVERFLOW_TRUE : se.OVERFLOW_FALSE, a = [o, s].join(se.VALUE_SEPARATOR);
    return [
      se.SCHEMA_VERSION,
      e.cacheHits,
      n,
      i,
      a
    ].join(se.CATEGORY_SEPARATOR);
  }
  /**
   * API to cache token failures for MSER data capture
   * @param error
   */
  cacheFailedRequest(e) {
    const t = this.getLastRequests();
    t.errors.length >= se.MAX_CACHED_ERRORS && (t.failedRequests.shift(), t.failedRequests.shift(), t.errors.shift()), t.failedRequests.push(this.apiId, this.correlationId), e instanceof Error && e && e.toString() ? e instanceof Z ? e.subError ? t.errors.push(e.subError) : e.errorCode ? t.errors.push(e.errorCode) : t.errors.push(e.toString()) : t.errors.push(e.toString()) : t.errors.push(se.UNKNOWN_ERROR), this.cacheManager.setServerTelemetry(this.telemetryCacheKey, t, this.correlationId);
  }
  /**
   * Update server telemetry cache entry by incrementing cache hit counter
   */
  incrementCacheHits() {
    const e = this.getLastRequests();
    return e.cacheHits += 1, this.cacheManager.setServerTelemetry(this.telemetryCacheKey, e, this.correlationId), e.cacheHits;
  }
  /**
   * Get the server telemetry entity from cache or initialize a new one
   */
  getLastRequests() {
    const e = {
      failedRequests: [],
      errors: [],
      cacheHits: 0
    };
    return this.cacheManager.getServerTelemetry(this.telemetryCacheKey) || e;
  }
  /**
   * Remove server telemetry cache entry
   */
  clearTelemetryCache() {
    const e = this.getLastRequests(), t = Un.maxErrorsToSend(e), n = e.errors.length;
    if (t === n)
      this.cacheManager.removeItem(this.telemetryCacheKey, this.correlationId);
    else {
      const i = {
        failedRequests: e.failedRequests.slice(t * 2),
        errors: e.errors.slice(t),
        cacheHits: 0
      };
      this.cacheManager.setServerTelemetry(this.telemetryCacheKey, i, this.correlationId);
    }
  }
  /**
   * Returns the maximum number of errors that can be flushed to the server in the next network request
   * @param serverTelemetryEntity
   */
  static maxErrorsToSend(e) {
    let t, n = 0, i = 0;
    const o = e.errors.length;
    for (t = 0; t < o; t++) {
      const s = e.failedRequests[2 * t] || w.EMPTY_STRING, a = e.failedRequests[2 * t + 1] || w.EMPTY_STRING, c = e.errors[t] || w.EMPTY_STRING;
      if (i += s.toString().length + a.toString().length + c.length + 3, i < se.MAX_LAST_HEADER_BYTES)
        n += 1;
      else
        break;
    }
    return n;
  }
  /**
   * Get the region discovery fields
   *
   * @returns string
   */
  getRegionDiscoveryFields() {
    const e = [];
    return e.push(this.regionUsed || w.EMPTY_STRING), e.push(this.regionSource || w.EMPTY_STRING), e.push(this.regionOutcome || w.EMPTY_STRING), e.join(",");
  }
  /**
   * Update the region discovery metadata
   *
   * @param regionDiscoveryMetadata
   * @returns void
   */
  updateRegionDiscoveryMetadata(e) {
    this.regionUsed = e.region_used, this.regionSource = e.region_source, this.regionOutcome = e.region_outcome;
  }
  /**
   * Set cache outcome
   */
  setCacheOutcome(e) {
    this.cacheOutcome = e;
  }
  setNativeBrokerErrorCode(e) {
    const t = this.getLastRequests();
    t.nativeBrokerErrorCode = e, this.cacheManager.setServerTelemetry(this.telemetryCacheKey, t, this.correlationId);
  }
  getNativeBrokerErrorCode() {
    return this.getLastRequests().nativeBrokerErrorCode;
  }
  clearNativeBrokerErrorCode() {
    const e = this.getLastRequests();
    delete e.nativeBrokerErrorCode, this.cacheManager.setServerTelemetry(this.telemetryCacheKey, e, this.correlationId);
  }
  static makeExtraSkuString(e) {
    return qf(e);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Bi {
  /**
   * Parse the JSON blob in memory and deserialize the content
   * @param cachedJson - JSON blob cache
   */
  static deserializeJSONBlob(e) {
    return e ? JSON.parse(e) : {};
  }
  /**
   * Deserializes accounts to AccountEntity objects
   * @param accounts - accounts of type SerializedAccountEntity
   */
  static deserializeAccounts(e) {
    const t = {};
    return e && Object.keys(e).map(function(n) {
      var a;
      const i = e[n], o = {
        homeAccountId: i.home_account_id,
        environment: i.environment,
        realm: i.realm,
        localAccountId: i.local_account_id,
        username: i.username,
        authorityType: i.authority_type,
        name: i.name,
        clientInfo: i.client_info,
        lastModificationTime: i.last_modification_time,
        lastModificationApp: i.last_modification_app,
        tenantProfiles: (a = i.tenantProfiles) == null ? void 0 : a.map((c) => JSON.parse(c)),
        lastUpdatedAt: Date.now().toString()
      }, s = new Oe();
      Co.toObject(s, o), t[n] = s;
    }), t;
  }
  /**
   * Deserializes id tokens to IdTokenEntity objects
   * @param idTokens - credentials of type SerializedIdTokenEntity
   */
  static deserializeIdTokens(e) {
    const t = {};
    return e && Object.keys(e).map(function(n) {
      const i = e[n], o = {
        homeAccountId: i.home_account_id,
        environment: i.environment,
        credentialType: i.credential_type,
        clientId: i.client_id,
        secret: i.secret,
        realm: i.realm,
        lastUpdatedAt: Date.now().toString()
      };
      t[n] = o;
    }), t;
  }
  /**
   * Deserializes access tokens to AccessTokenEntity objects
   * @param accessTokens - access tokens of type SerializedAccessTokenEntity
   */
  static deserializeAccessTokens(e) {
    const t = {};
    return e && Object.keys(e).map(function(n) {
      const i = e[n], o = {
        homeAccountId: i.home_account_id,
        environment: i.environment,
        credentialType: i.credential_type,
        clientId: i.client_id,
        secret: i.secret,
        realm: i.realm,
        target: i.target,
        cachedAt: i.cached_at,
        expiresOn: i.expires_on,
        extendedExpiresOn: i.extended_expires_on,
        refreshOn: i.refresh_on,
        keyId: i.key_id,
        tokenType: i.token_type,
        requestedClaims: i.requestedClaims,
        requestedClaimsHash: i.requestedClaimsHash,
        userAssertionHash: i.userAssertionHash,
        lastUpdatedAt: Date.now().toString()
      };
      t[n] = o;
    }), t;
  }
  /**
   * Deserializes refresh tokens to RefreshTokenEntity objects
   * @param refreshTokens - refresh tokens of type SerializedRefreshTokenEntity
   */
  static deserializeRefreshTokens(e) {
    const t = {};
    return e && Object.keys(e).map(function(n) {
      const i = e[n], o = {
        homeAccountId: i.home_account_id,
        environment: i.environment,
        credentialType: i.credential_type,
        clientId: i.client_id,
        secret: i.secret,
        familyId: i.family_id,
        target: i.target,
        realm: i.realm,
        lastUpdatedAt: Date.now().toString()
      };
      t[n] = o;
    }), t;
  }
  /**
   * Deserializes appMetadata to AppMetaData objects
   * @param appMetadata - app metadata of type SerializedAppMetadataEntity
   */
  static deserializeAppMetadata(e) {
    const t = {};
    return e && Object.keys(e).map(function(n) {
      const i = e[n];
      t[n] = {
        clientId: i.client_id,
        environment: i.environment,
        familyId: i.family_id
      };
    }), t;
  }
  /**
   * Deserialize an inMemory Cache
   * @param jsonCache - JSON blob cache
   */
  static deserializeAllCache(e) {
    return {
      accounts: e.Account ? this.deserializeAccounts(e.Account) : {},
      idTokens: e.IdToken ? this.deserializeIdTokens(e.IdToken) : {},
      accessTokens: e.AccessToken ? this.deserializeAccessTokens(e.AccessToken) : {},
      refreshTokens: e.RefreshToken ? this.deserializeRefreshTokens(e.RefreshToken) : {},
      appMetadata: e.AppMetadata ? this.deserializeAppMetadata(e.AppMetadata) : {}
    };
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const Vf = "system_assigned_managed_identity", jf = "managed_identity", _s = `https://login.microsoftonline.com/${jf}/`, ct = {
  AUTHORIZATION_HEADER_NAME: "Authorization",
  METADATA_HEADER_NAME: "Metadata",
  APP_SERVICE_SECRET_HEADER_NAME: "X-IDENTITY-HEADER",
  ML_AND_SF_SECRET_HEADER_NAME: "secret"
}, we = {
  API_VERSION: "api-version",
  RESOURCE: "resource",
  SHA256_TOKEN_TO_REFRESH: "token_sha256_to_refresh",
  XMS_CC: "xms_cc"
}, B = {
  AZURE_POD_IDENTITY_AUTHORITY_HOST: "AZURE_POD_IDENTITY_AUTHORITY_HOST",
  DEFAULT_IDENTITY_CLIENT_ID: "DEFAULT_IDENTITY_CLIENT_ID",
  IDENTITY_ENDPOINT: "IDENTITY_ENDPOINT",
  IDENTITY_HEADER: "IDENTITY_HEADER",
  IDENTITY_SERVER_THUMBPRINT: "IDENTITY_SERVER_THUMBPRINT",
  IMDS_ENDPOINT: "IMDS_ENDPOINT",
  MSI_ENDPOINT: "MSI_ENDPOINT",
  MSI_SECRET: "MSI_SECRET"
}, z = {
  APP_SERVICE: "AppService",
  AZURE_ARC: "AzureArc",
  CLOUD_SHELL: "CloudShell",
  DEFAULT_TO_IMDS: "DefaultToImds",
  IMDS: "Imds",
  MACHINE_LEARNING: "MachineLearning",
  SERVICE_FABRIC: "ServiceFabric"
}, me = {
  SYSTEM_ASSIGNED: "system-assigned",
  USER_ASSIGNED_CLIENT_ID: "user-assigned-client-id",
  USER_ASSIGNED_RESOURCE_ID: "user-assigned-resource-id",
  USER_ASSIGNED_OBJECT_ID: "user-assigned-object-id"
}, le = {
  GET: "get",
  POST: "post"
}, Vr = {
  SUCCESS_RANGE_START: G.SUCCESS_RANGE_START,
  SUCCESS_RANGE_END: G.SUCCESS_RANGE_END,
  SERVER_ERROR: G.SERVER_ERROR
}, Kf = "REGION_NAME", Yf = "MSAL_FORCE_REGION", Wf = 32, Qf = {
  SHA256: "sha256"
}, jr = {
  CV_CHARSET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
}, Tl = {
  KEY_SEPARATOR: "-"
}, lt = {
  MSAL_SKU: "msal.js.node",
  JWT_BEARER_ASSERTION_TYPE: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  AUTHORIZATION_PENDING: "authorization_pending",
  HTTP_PROTOCOL: "http://",
  LOCALHOST: "localhost"
}, pe = {
  acquireTokenSilent: 62,
  acquireTokenByUsernamePassword: 371,
  acquireTokenByDeviceCode: 671,
  acquireTokenByClientCredential: 771,
  acquireTokenByOBO: 772,
  acquireTokenWithManagedIdentity: 773,
  acquireTokenByCode: 871,
  acquireTokenByRefreshToken: 872
}, Pe = {
  RSA_256: "RS256",
  PSS_256: "PS256",
  X5T_256: "x5t#S256",
  X5T: "x5t",
  X5C: "x5c",
  AUDIENCE: "aud",
  EXPIRATION_TIME: "exp",
  ISSUER: "iss",
  SUBJECT: "sub",
  NOT_BEFORE: "nbf",
  JWT_ID: "jti"
}, Kr = {
  INTERVAL_MS: 100,
  TIMEOUT_MS: 5e3
}, Jf = 4096;
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Yr {
  static getNetworkResponse(e, t, n) {
    return {
      headers: e,
      body: t,
      status: n
    };
  }
  /*
   * Utility function that converts a URL object into an ordinary options object as expected by the
   * http.request and https.request APIs.
   * https://github.com/nodejs/node/blob/main/lib/internal/url.js#L1090
   */
  static urlToHttpOptions(e) {
    const t = {
      protocol: e.protocol,
      hostname: e.hostname && e.hostname.startsWith("[") ? e.hostname.slice(1, -1) : e.hostname,
      hash: e.hash,
      search: e.search,
      pathname: e.pathname,
      path: `${e.pathname || ""}${e.search || ""}`,
      href: e.href
    };
    return e.port !== "" && (t.port = Number(e.port)), (e.username || e.password) && (t.auth = `${decodeURIComponent(e.username)}:${decodeURIComponent(e.password)}`), t;
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const Oo = "@azure/msal-node", qt = "3.8.6";
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Po {
  constructor(e, t, n) {
    this.networkRequestViaProxy = (i, o, s, a) => {
      const c = new URL(o), l = new URL(this.proxyUrl), u = (s == null ? void 0 : s.headers) || {}, d = {
        host: l.hostname,
        port: l.port,
        method: "CONNECT",
        path: c.hostname,
        headers: u
      };
      this.customAgentOptions && Object.keys(this.customAgentOptions).length && (d.agent = new Mt.Agent(this.customAgentOptions));
      let f = "";
      if (i === le.POST) {
        const h = (s == null ? void 0 : s.body) || "";
        f = `Content-Type: application/x-www-form-urlencoded\r
Content-Length: ${h.length}\r
\r
${h}`;
      } else
        a && (d.timeout = a);
      const p = `${i.toUpperCase()} ${c.href} HTTP/1.1\r
Host: ${c.host}\r
Connection: close\r
` + f + `\r
`;
      return new Promise((h, y) => {
        const T = Mt.request(d);
        a && T.on("timeout", () => {
          this.logUrlWithPiiAwareness(`Request timeout after ${a}ms for URL`, o), T.destroy(), y(new Error(`Request time out after ${a}ms`));
        }), T.end(), T.on("connect", (g, m) => {
          const E = (g == null ? void 0 : g.statusCode) || Vr.SERVER_ERROR;
          (E < Vr.SUCCESS_RANGE_START || E > Vr.SUCCESS_RANGE_END) && (T.destroy(), m.destroy(), y(new Error(`Error connecting to proxy. Http status code: ${g.statusCode}. Http status message: ${(g == null ? void 0 : g.statusMessage) || "Unknown"}`))), m.write(p);
          const C = [];
          m.on("data", (P) => {
            C.push(P);
          }), m.on("end", () => {
            const k = Buffer.concat([...C]).toString().split(`\r
`), I = parseInt(k[0].split(" ")[1]), _ = k[0].split(" ").slice(2).join(" "), A = k[k.length - 1], R = k.slice(1, k.length - 2), O = /* @__PURE__ */ new Map();
            R.forEach((D) => {
              const F = D.split(new RegExp(/:\s(.*)/s)), V = F[0];
              let j = F[1];
              try {
                const ye = JSON.parse(j);
                ye && typeof ye == "object" && (j = ye);
              } catch {
              }
              O.set(V, j);
            });
            const v = Object.fromEntries(O), H = Yr.getNetworkResponse(v, this.parseBody(I, _, v, A), I);
            this.shouldDestroyRequest(I, H) && T.destroy(), h(H);
          }), m.on("error", (P) => {
            T.destroy(), m.destroy(), y(new Error(P.toString()));
          });
        }), T.on("error", (g) => {
          this.logger.error(`HttpClient - Proxy request error: ${g.toString()}`, ""), this.logUrlWithPiiAwareness("Destination URL", o), this.logUrlWithPiiAwareness("Proxy URL", this.proxyUrl), this.logger.error(`HttpClient - Method: ${i}`, ""), this.logger.errorPii(`HttpClient - Headers: ${JSON.stringify(u)}`, ""), T.destroy(), y(new Error(g.toString()));
        });
      });
    }, this.networkRequestViaHttps = (i, o, s, a) => {
      const c = i === le.POST, l = (s == null ? void 0 : s.body) || "", u = new URL(o), d = (s == null ? void 0 : s.headers) || {}, f = {
        method: i,
        headers: d,
        ...Yr.urlToHttpOptions(u)
      };
      return this.customAgentOptions && Object.keys(this.customAgentOptions).length && (f.agent = new cr.Agent(this.customAgentOptions)), c ? f.headers = {
        ...f.headers,
        "Content-Length": l.length
      } : a && (f.timeout = a), new Promise((p, h) => {
        let y;
        f.protocol === "http:" ? y = Mt.request(f) : y = cr.request(f), c && y.write(l), a && y.on("timeout", () => {
          this.logUrlWithPiiAwareness(`HTTPS request timeout after ${a}ms for URL`, o), y.destroy(), h(new Error(`Request time out after ${a}ms`));
        }), y.end(), y.on("response", (T) => {
          const g = T.headers, m = T.statusCode, E = T.statusMessage, C = [];
          T.on("data", (P) => {
            C.push(P);
          }), T.on("end", () => {
            const P = Buffer.concat([...C]).toString(), k = g, I = Yr.getNetworkResponse(k, this.parseBody(m, E, k, P), m);
            this.shouldDestroyRequest(m, I) && y.destroy(), p(I);
          });
        }), y.on("error", (T) => {
          this.logger.error(`HttpClient - HTTPS request error: ${T.toString()}`, ""), this.logUrlWithPiiAwareness("URL", o), this.logger.error(`HttpClient - Method: ${i}`, ""), this.logger.errorPii(`HttpClient - Headers: ${JSON.stringify(d)}`, ""), y.destroy(), h(new Error(T.toString()));
        });
      });
    }, this.parseBody = (i, o, s, a) => {
      let c;
      try {
        c = JSON.parse(a);
      } catch {
        let u, d;
        i >= G.CLIENT_ERROR_RANGE_START && i <= G.CLIENT_ERROR_RANGE_END ? (u = "client_error", d = "A client") : i >= G.SERVER_ERROR_RANGE_START && i <= G.SERVER_ERROR_RANGE_END ? (u = "server_error", d = "A server") : (u = "unknown_error", d = "An unknown"), c = {
          error: u,
          error_description: `${d} error occured.
Http status code: ${i}
Http status message: ${o || "Unknown"}
Headers: ${JSON.stringify(s)}`
        };
      }
      return c;
    }, this.logUrlWithPiiAwareness = (i, o) => {
      if (this.isPiiEnabled)
        this.logger.errorPii(`HttpClient - ${i}: ${o}`, "");
      else {
        let s;
        try {
          const a = new URL(o);
          s = `${a.protocol}//${a.host}${a.pathname}`;
        } catch {
          s = o.split("?")[0] || "unknown";
        }
        this.logger.error(`HttpClient - ${i}: ${s} [Enable PII logging to see additional details]`, "");
      }
    }, this.shouldDestroyRequest = (i, o) => (i < G.SUCCESS_RANGE_START || i > G.SUCCESS_RANGE_END) && // do not destroy the request for the device code flow
    !(o.body && typeof o.body == "object" && "error" in o.body && o.body.error === lt.AUTHORIZATION_PENDING), this.proxyUrl = e || "", this.customAgentOptions = t || {}, this.logger = new it(n || {}, Oo, qt), this.isPiiEnabled = this.logger.isPiiLoggingEnabled();
  }
  /**
   * Http Get request
   * @param url
   * @param options
   */
  async sendGetRequestAsync(e, t, n) {
    return this.proxyUrl ? this.networkRequestViaProxy(le.GET, e, t, n) : this.networkRequestViaHttps(le.GET, e, t, n);
  }
  /**
   * Http Post request
   * @param url
   * @param options
   */
  async sendPostRequestAsync(e, t) {
    return this.proxyUrl ? this.networkRequestViaProxy(le.POST, e, t) : this.networkRequestViaHttps(le.POST, e, t);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const El = "invalid_file_extension", Al = "invalid_file_path", Pn = "invalid_managed_identity_id_type", Cl = "invalid_secret", Zf = "missing_client_id", Xf = "network_unavailable", _l = "platform_not_supported", Il = "unable_to_create_azure_arc", Sl = "unable_to_create_cloud_shell", wl = "unable_to_create_source", Fi = "unable_to_read_secret_file", eg = "user_assigned_not_available_at_runtime", Rl = "www_authenticate_header_missing", bl = "www_authenticate_header_unsupported_format", An = {
  [B.AZURE_POD_IDENTITY_AUTHORITY_HOST]: "azure_pod_identity_authority_host_url_malformed",
  [B.IDENTITY_ENDPOINT]: "identity_endpoint_url_malformed",
  [B.IMDS_ENDPOINT]: "imds_endpoint_url_malformed",
  [B.MSI_ENDPOINT]: "msi_endpoint_url_malformed"
};
/*! @azure/msal-node v3.8.6 2026-01-17 */
const tg = {
  [El]: "The file path in the WWW-Authenticate header does not contain a .key file.",
  [Al]: "The file path in the WWW-Authenticate header is not in a valid Windows or Linux Format.",
  [Pn]: "More than one ManagedIdentityIdType was provided.",
  [Cl]: "The secret in the file on the file path in the WWW-Authenticate header is greater than 4096 bytes.",
  [_l]: "The platform is not supported by Azure Arc. Azure Arc only supports Windows and Linux.",
  [Zf]: "A ManagedIdentityId id was not provided.",
  [An.AZURE_POD_IDENTITY_AUTHORITY_HOST]: `The Managed Identity's '${B.AZURE_POD_IDENTITY_AUTHORITY_HOST}' environment variable is malformed.`,
  [An.IDENTITY_ENDPOINT]: `The Managed Identity's '${B.IDENTITY_ENDPOINT}' environment variable is malformed.`,
  [An.IMDS_ENDPOINT]: `The Managed Identity's '${B.IMDS_ENDPOINT}' environment variable is malformed.`,
  [An.MSI_ENDPOINT]: `The Managed Identity's '${B.MSI_ENDPOINT}' environment variable is malformed.`,
  [Xf]: "Authentication unavailable. The request to the managed identity endpoint timed out.",
  [Il]: "Azure Arc Managed Identities can only be system assigned.",
  [Sl]: "Cloud Shell Managed Identities can only be system assigned.",
  [wl]: "Unable to create a Managed Identity source based on environment variables.",
  [Fi]: "Unable to read the secret file.",
  [eg]: "Service Fabric user assigned managed identity ClientId or ResourceId is not configurable at runtime.",
  [Rl]: "A 401 response was received form the Azure Arc Managed Identity, but the www-authenticate header is missing.",
  [bl]: "A 401 response was received form the Azure Arc Managed Identity, but the www-authenticate header is in an unsupported format."
};
class No extends Z {
  constructor(e) {
    super(e, tg[e]), this.name = "ManagedIdentityError", Object.setPrototypeOf(this, No.prototype);
  }
}
function ce(r) {
  return new No(r);
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class ng {
  get id() {
    return this._id;
  }
  set id(e) {
    this._id = e;
  }
  get idType() {
    return this._idType;
  }
  set idType(e) {
    this._idType = e;
  }
  constructor(e) {
    const t = e == null ? void 0 : e.userAssignedClientId, n = e == null ? void 0 : e.userAssignedResourceId, i = e == null ? void 0 : e.userAssignedObjectId;
    if (t) {
      if (n || i)
        throw ce(Pn);
      this.id = t, this.idType = me.USER_ASSIGNED_CLIENT_ID;
    } else if (n) {
      if (t || i)
        throw ce(Pn);
      this.id = n, this.idType = me.USER_ASSIGNED_RESOURCE_ID;
    } else if (i) {
      if (t || n)
        throw ce(Pn);
      this.id = i, this.idType = me.USER_ASSIGNED_OBJECT_ID;
    } else
      this.id = Vf, this.idType = me.SYSTEM_ASSIGNED;
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const ie = {
  invalidLoopbackAddressType: {
    code: "invalid_loopback_server_address_type",
    desc: "Loopback server address is not type string. This is unexpected."
  },
  unableToLoadRedirectUri: {
    code: "unable_to_load_redirectUrl",
    desc: "Loopback server callback was invoked without a url. This is unexpected."
  },
  noAuthCodeInResponse: {
    code: "no_auth_code_in_response",
    desc: "No auth code found in the server response. Please check your network trace to determine what happened."
  },
  noLoopbackServerExists: {
    code: "no_loopback_server_exists",
    desc: "No loopback server exists yet."
  },
  loopbackServerAlreadyExists: {
    code: "loopback_server_already_exists",
    desc: "Loopback server already exists. Cannot create another."
  },
  loopbackServerTimeout: {
    code: "loopback_server_timeout",
    desc: "Timed out waiting for auth code listener to be registered."
  },
  stateNotFoundError: {
    code: "state_not_found",
    desc: "State not found. Please verify that the request originated from msal."
  },
  thumbprintMissing: {
    code: "thumbprint_missing_from_client_certificate",
    desc: "Client certificate does not contain a SHA-1 or SHA-256 thumbprint."
  },
  redirectUriNotSupported: {
    code: "redirect_uri_not_supported",
    desc: "RedirectUri is not supported in this scenario. Please remove redirectUri from the request."
  }
};
class ne extends Z {
  constructor(e, t) {
    super(e, t), this.name = "NodeAuthError";
  }
  /**
   * Creates an error thrown if loopback server address is of type string.
   */
  static createInvalidLoopbackAddressTypeError() {
    return new ne(ie.invalidLoopbackAddressType.code, `${ie.invalidLoopbackAddressType.desc}`);
  }
  /**
   * Creates an error thrown if the loopback server is unable to get a url.
   */
  static createUnableToLoadRedirectUrlError() {
    return new ne(ie.unableToLoadRedirectUri.code, `${ie.unableToLoadRedirectUri.desc}`);
  }
  /**
   * Creates an error thrown if the server response does not contain an auth code.
   */
  static createNoAuthCodeInResponseError() {
    return new ne(ie.noAuthCodeInResponse.code, `${ie.noAuthCodeInResponse.desc}`);
  }
  /**
   * Creates an error thrown if the loopback server has not been spun up yet.
   */
  static createNoLoopbackServerExistsError() {
    return new ne(ie.noLoopbackServerExists.code, `${ie.noLoopbackServerExists.desc}`);
  }
  /**
   * Creates an error thrown if a loopback server already exists when attempting to create another one.
   */
  static createLoopbackServerAlreadyExistsError() {
    return new ne(ie.loopbackServerAlreadyExists.code, `${ie.loopbackServerAlreadyExists.desc}`);
  }
  /**
   * Creates an error thrown if the loopback server times out registering the auth code listener.
   */
  static createLoopbackServerTimeoutError() {
    return new ne(ie.loopbackServerTimeout.code, `${ie.loopbackServerTimeout.desc}`);
  }
  /**
   * Creates an error thrown when the state is not present.
   */
  static createStateNotFoundError() {
    return new ne(ie.stateNotFoundError.code, ie.stateNotFoundError.desc);
  }
  /**
   * Creates an error thrown when client certificate was provided, but neither the SHA-1 or SHA-256 thumbprints were provided
   */
  static createThumbprintMissingError() {
    return new ne(ie.thumbprintMissing.code, ie.thumbprintMissing.desc);
  }
  /**
   * Creates an error thrown when redirectUri is provided in an unsupported scenario
   */
  static createRedirectUriNotSupportedError() {
    return new ne(ie.redirectUriNotSupported.code, ie.redirectUriNotSupported.desc);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const rg = {
  clientId: w.EMPTY_STRING,
  authority: w.DEFAULT_AUTHORITY,
  clientSecret: w.EMPTY_STRING,
  clientAssertion: w.EMPTY_STRING,
  clientCertificate: {
    thumbprint: w.EMPTY_STRING,
    thumbprintSha256: w.EMPTY_STRING,
    privateKey: w.EMPTY_STRING,
    x5c: w.EMPTY_STRING
  },
  knownAuthorities: [],
  cloudDiscoveryMetadata: w.EMPTY_STRING,
  authorityMetadata: w.EMPTY_STRING,
  clientCapabilities: [],
  protocolMode: At.AAD,
  azureCloudOptions: {
    azureCloudInstance: fo.None,
    tenant: w.EMPTY_STRING
  },
  skipAuthorityMetadataCache: !1,
  encodeExtraQueryParams: !1
}, ig = {
  claimsBasedCachingEnabled: !1
}, Mo = {
  loggerCallback: () => {
  },
  piiLoggingEnabled: !1,
  logLevel: W.Info
}, og = {
  loggerOptions: Mo,
  networkClient: new Po(),
  proxyUrl: w.EMPTY_STRING,
  customAgentOptions: {},
  disableInternalRetries: !1
}, sg = {
  application: {
    appName: w.EMPTY_STRING,
    appVersion: w.EMPTY_STRING
  }
};
function ag({ auth: r, broker: e, cache: t, system: n, telemetry: i }) {
  const o = {
    ...og,
    networkClient: new Po(n == null ? void 0 : n.proxyUrl, n == null ? void 0 : n.customAgentOptions),
    loggerOptions: (n == null ? void 0 : n.loggerOptions) || Mo,
    disableInternalRetries: (n == null ? void 0 : n.disableInternalRetries) || !1
  };
  if (r.clientCertificate && !r.clientCertificate.thumbprint && !r.clientCertificate.thumbprintSha256)
    throw ne.createStateNotFoundError();
  return {
    auth: { ...rg, ...r },
    broker: { ...e },
    cache: { ...ig, ...t },
    system: { ...o, ...n },
    telemetry: { ...sg, ...i }
  };
}
function cg({ clientCapabilities: r, managedIdentityIdParams: e, system: t }) {
  const n = new ng(e), i = (t == null ? void 0 : t.loggerOptions) || Mo;
  let o;
  return t != null && t.networkClient ? o = t.networkClient : o = new Po(t == null ? void 0 : t.proxyUrl, t == null ? void 0 : t.customAgentOptions), {
    clientCapabilities: r || [],
    managedIdentityId: n,
    system: {
      loggerOptions: i,
      networkClient: o
    },
    disableInternalRetries: (t == null ? void 0 : t.disableInternalRetries) || !1
  };
}
var Wr = {}, tn = {}, Wn = {}, Is;
function kl() {
  if (Is) return Wn;
  Is = 1, Object.defineProperty(Wn, "__esModule", {
    value: !0
  }), Wn.default = i;
  var r = e(dt);
  function e(o) {
    return o && o.__esModule ? o : { default: o };
  }
  const t = new Uint8Array(256);
  let n = t.length;
  function i() {
    return n > t.length - 16 && (r.default.randomFillSync(t), n = 0), t.slice(n, n += 16);
  }
  return Wn;
}
var nn = {}, rn = {}, on = {}, Ss;
function lg() {
  if (Ss) return on;
  Ss = 1, Object.defineProperty(on, "__esModule", {
    value: !0
  }), on.default = void 0;
  var r = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  return on.default = r, on;
}
var ws;
function Rr() {
  if (ws) return rn;
  ws = 1, Object.defineProperty(rn, "__esModule", {
    value: !0
  }), rn.default = void 0;
  var r = e(/* @__PURE__ */ lg());
  function e(i) {
    return i && i.__esModule ? i : { default: i };
  }
  function t(i) {
    return typeof i == "string" && r.default.test(i);
  }
  var n = t;
  return rn.default = n, rn;
}
var Rs;
function br() {
  if (Rs) return nn;
  Rs = 1, Object.defineProperty(nn, "__esModule", {
    value: !0
  }), nn.default = void 0;
  var r = e(/* @__PURE__ */ Rr());
  function e(o) {
    return o && o.__esModule ? o : { default: o };
  }
  const t = [];
  for (let o = 0; o < 256; ++o)
    t.push((o + 256).toString(16).substr(1));
  function n(o, s = 0) {
    const a = (t[o[s + 0]] + t[o[s + 1]] + t[o[s + 2]] + t[o[s + 3]] + "-" + t[o[s + 4]] + t[o[s + 5]] + "-" + t[o[s + 6]] + t[o[s + 7]] + "-" + t[o[s + 8]] + t[o[s + 9]] + "-" + t[o[s + 10]] + t[o[s + 11]] + t[o[s + 12]] + t[o[s + 13]] + t[o[s + 14]] + t[o[s + 15]]).toLowerCase();
    if (!(0, r.default)(a))
      throw TypeError("Stringified UUID is invalid");
    return a;
  }
  var i = n;
  return nn.default = i, nn;
}
var bs;
function dg() {
  if (bs) return tn;
  bs = 1, Object.defineProperty(tn, "__esModule", {
    value: !0
  }), tn.default = void 0;
  var r = t(/* @__PURE__ */ kl()), e = t(/* @__PURE__ */ br());
  function t(l) {
    return l && l.__esModule ? l : { default: l };
  }
  let n, i, o = 0, s = 0;
  function a(l, u, d) {
    let f = u && d || 0;
    const p = u || new Array(16);
    l = l || {};
    let h = l.node || n, y = l.clockseq !== void 0 ? l.clockseq : i;
    if (h == null || y == null) {
      const P = l.random || (l.rng || r.default)();
      h == null && (h = n = [P[0] | 1, P[1], P[2], P[3], P[4], P[5]]), y == null && (y = i = (P[6] << 8 | P[7]) & 16383);
    }
    let T = l.msecs !== void 0 ? l.msecs : Date.now(), g = l.nsecs !== void 0 ? l.nsecs : s + 1;
    const m = T - o + (g - s) / 1e4;
    if (m < 0 && l.clockseq === void 0 && (y = y + 1 & 16383), (m < 0 || T > o) && l.nsecs === void 0 && (g = 0), g >= 1e4)
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    o = T, s = g, i = y, T += 122192928e5;
    const E = ((T & 268435455) * 1e4 + g) % 4294967296;
    p[f++] = E >>> 24 & 255, p[f++] = E >>> 16 & 255, p[f++] = E >>> 8 & 255, p[f++] = E & 255;
    const C = T / 4294967296 * 1e4 & 268435455;
    p[f++] = C >>> 8 & 255, p[f++] = C & 255, p[f++] = C >>> 24 & 15 | 16, p[f++] = C >>> 16 & 255, p[f++] = y >>> 8 | 128, p[f++] = y & 255;
    for (let P = 0; P < 6; ++P)
      p[f + P] = h[P];
    return u || (0, e.default)(p);
  }
  var c = a;
  return tn.default = c, tn;
}
var sn = {}, Ze = {}, an = {}, ks;
function vl() {
  if (ks) return an;
  ks = 1, Object.defineProperty(an, "__esModule", {
    value: !0
  }), an.default = void 0;
  var r = e(/* @__PURE__ */ Rr());
  function e(i) {
    return i && i.__esModule ? i : { default: i };
  }
  function t(i) {
    if (!(0, r.default)(i))
      throw TypeError("Invalid UUID");
    let o;
    const s = new Uint8Array(16);
    return s[0] = (o = parseInt(i.slice(0, 8), 16)) >>> 24, s[1] = o >>> 16 & 255, s[2] = o >>> 8 & 255, s[3] = o & 255, s[4] = (o = parseInt(i.slice(9, 13), 16)) >>> 8, s[5] = o & 255, s[6] = (o = parseInt(i.slice(14, 18), 16)) >>> 8, s[7] = o & 255, s[8] = (o = parseInt(i.slice(19, 23), 16)) >>> 8, s[9] = o & 255, s[10] = (o = parseInt(i.slice(24, 36), 16)) / 1099511627776 & 255, s[11] = o / 4294967296 & 255, s[12] = o >>> 24 & 255, s[13] = o >>> 16 & 255, s[14] = o >>> 8 & 255, s[15] = o & 255, s;
  }
  var n = t;
  return an.default = n, an;
}
var vs;
function Ol() {
  if (vs) return Ze;
  vs = 1, Object.defineProperty(Ze, "__esModule", {
    value: !0
  }), Ze.default = s, Ze.URL = Ze.DNS = void 0;
  var r = t(/* @__PURE__ */ br()), e = t(/* @__PURE__ */ vl());
  function t(a) {
    return a && a.__esModule ? a : { default: a };
  }
  function n(a) {
    a = unescape(encodeURIComponent(a));
    const c = [];
    for (let l = 0; l < a.length; ++l)
      c.push(a.charCodeAt(l));
    return c;
  }
  const i = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  Ze.DNS = i;
  const o = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  Ze.URL = o;
  function s(a, c, l) {
    function u(d, f, p, h) {
      if (typeof d == "string" && (d = n(d)), typeof f == "string" && (f = (0, e.default)(f)), f.length !== 16)
        throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      let y = new Uint8Array(16 + d.length);
      if (y.set(f), y.set(d, f.length), y = l(y), y[6] = y[6] & 15 | c, y[8] = y[8] & 63 | 128, p) {
        h = h || 0;
        for (let T = 0; T < 16; ++T)
          p[h + T] = y[T];
        return p;
      }
      return (0, r.default)(y);
    }
    try {
      u.name = a;
    } catch {
    }
    return u.DNS = i, u.URL = o, u;
  }
  return Ze;
}
var cn = {}, Os;
function ug() {
  if (Os) return cn;
  Os = 1, Object.defineProperty(cn, "__esModule", {
    value: !0
  }), cn.default = void 0;
  var r = e(dt);
  function e(i) {
    return i && i.__esModule ? i : { default: i };
  }
  function t(i) {
    return Array.isArray(i) ? i = Buffer.from(i) : typeof i == "string" && (i = Buffer.from(i, "utf8")), r.default.createHash("md5").update(i).digest();
  }
  var n = t;
  return cn.default = n, cn;
}
var Ps;
function hg() {
  if (Ps) return sn;
  Ps = 1, Object.defineProperty(sn, "__esModule", {
    value: !0
  }), sn.default = void 0;
  var r = t(/* @__PURE__ */ Ol()), e = t(/* @__PURE__ */ ug());
  function t(o) {
    return o && o.__esModule ? o : { default: o };
  }
  var i = (0, r.default)("v3", 48, e.default);
  return sn.default = i, sn;
}
var ln = {}, Ns;
function fg() {
  if (Ns) return ln;
  Ns = 1, Object.defineProperty(ln, "__esModule", {
    value: !0
  }), ln.default = void 0;
  var r = t(/* @__PURE__ */ kl()), e = t(/* @__PURE__ */ br());
  function t(o) {
    return o && o.__esModule ? o : { default: o };
  }
  function n(o, s, a) {
    o = o || {};
    const c = o.random || (o.rng || r.default)();
    if (c[6] = c[6] & 15 | 64, c[8] = c[8] & 63 | 128, s) {
      a = a || 0;
      for (let l = 0; l < 16; ++l)
        s[a + l] = c[l];
      return s;
    }
    return (0, e.default)(c);
  }
  var i = n;
  return ln.default = i, ln;
}
var dn = {}, un = {}, Ms;
function gg() {
  if (Ms) return un;
  Ms = 1, Object.defineProperty(un, "__esModule", {
    value: !0
  }), un.default = void 0;
  var r = e(dt);
  function e(i) {
    return i && i.__esModule ? i : { default: i };
  }
  function t(i) {
    return Array.isArray(i) ? i = Buffer.from(i) : typeof i == "string" && (i = Buffer.from(i, "utf8")), r.default.createHash("sha1").update(i).digest();
  }
  var n = t;
  return un.default = n, un;
}
var Ds;
function pg() {
  if (Ds) return dn;
  Ds = 1, Object.defineProperty(dn, "__esModule", {
    value: !0
  }), dn.default = void 0;
  var r = t(/* @__PURE__ */ Ol()), e = t(/* @__PURE__ */ gg());
  function t(o) {
    return o && o.__esModule ? o : { default: o };
  }
  var i = (0, r.default)("v5", 80, e.default);
  return dn.default = i, dn;
}
var hn = {}, Us;
function mg() {
  if (Us) return hn;
  Us = 1, Object.defineProperty(hn, "__esModule", {
    value: !0
  }), hn.default = void 0;
  var r = "00000000-0000-0000-0000-000000000000";
  return hn.default = r, hn;
}
var fn = {}, xs;
function yg() {
  if (xs) return fn;
  xs = 1, Object.defineProperty(fn, "__esModule", {
    value: !0
  }), fn.default = void 0;
  var r = e(/* @__PURE__ */ Rr());
  function e(i) {
    return i && i.__esModule ? i : { default: i };
  }
  function t(i) {
    if (!(0, r.default)(i))
      throw TypeError("Invalid UUID");
    return parseInt(i.substr(14, 1), 16);
  }
  var n = t;
  return fn.default = n, fn;
}
var Ls;
function Tg() {
  return Ls || (Ls = 1, (function(r) {
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), Object.defineProperty(r, "v1", {
      enumerable: !0,
      get: function() {
        return e.default;
      }
    }), Object.defineProperty(r, "v3", {
      enumerable: !0,
      get: function() {
        return t.default;
      }
    }), Object.defineProperty(r, "v4", {
      enumerable: !0,
      get: function() {
        return n.default;
      }
    }), Object.defineProperty(r, "v5", {
      enumerable: !0,
      get: function() {
        return i.default;
      }
    }), Object.defineProperty(r, "NIL", {
      enumerable: !0,
      get: function() {
        return o.default;
      }
    }), Object.defineProperty(r, "version", {
      enumerable: !0,
      get: function() {
        return s.default;
      }
    }), Object.defineProperty(r, "validate", {
      enumerable: !0,
      get: function() {
        return a.default;
      }
    }), Object.defineProperty(r, "stringify", {
      enumerable: !0,
      get: function() {
        return c.default;
      }
    }), Object.defineProperty(r, "parse", {
      enumerable: !0,
      get: function() {
        return l.default;
      }
    });
    var e = u(/* @__PURE__ */ dg()), t = u(/* @__PURE__ */ hg()), n = u(/* @__PURE__ */ fg()), i = u(/* @__PURE__ */ pg()), o = u(/* @__PURE__ */ mg()), s = u(/* @__PURE__ */ yg()), a = u(/* @__PURE__ */ Rr()), c = u(/* @__PURE__ */ br()), l = u(/* @__PURE__ */ vl());
    function u(d) {
      return d && d.__esModule ? d : { default: d };
    }
  })(Wr)), Wr;
}
var Eg = /* @__PURE__ */ Tg();
const We = /* @__PURE__ */ ec(Eg);
We.v1;
We.v3;
const Ag = We.v4;
We.v5;
We.NIL;
We.version;
We.validate;
We.stringify;
We.parse;
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Pl {
  /**
   *
   * RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or pseudo-random numbers.
   * uuidv4 generates guids from cryprtographically-string random
   */
  generateGuid() {
    return Ag();
  }
  /**
   * verifies if a string is  GUID
   * @param guid
   */
  isGuid(e) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class $e {
  /**
   * 'utf8': Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
   * 'base64': Base64 encoding.
   *
   * @param str text
   */
  static base64Encode(e, t) {
    return Buffer.from(e, t).toString(Ye.BASE64);
  }
  /**
   * encode a URL
   * @param str
   */
  static base64EncodeUrl(e, t) {
    return $e.base64Encode(e, t).replace(/=/g, w.EMPTY_STRING).replace(/\+/g, "-").replace(/\//g, "_");
  }
  /**
   * 'utf8': Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
   * 'base64': Base64 encoding.
   *
   * @param base64Str Base64 encoded text
   */
  static base64Decode(e) {
    return Buffer.from(e, Ye.BASE64).toString("utf8");
  }
  /**
   * @param base64Str Base64 encoded Url
   */
  static base64DecodeUrl(e) {
    let t = e.replace(/-/g, "+").replace(/_/g, "/");
    for (; t.length % 4; )
      t += "=";
    return $e.base64Decode(t);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Do {
  /**
   * generate 'SHA256' hash
   * @param buffer
   */
  sha256(e) {
    return dt.createHash(Qf.SHA256).update(e).digest();
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Cg {
  constructor() {
    this.hashUtils = new Do();
  }
  /**
   * generates the codeVerfier and the challenge from the codeVerfier
   * reference: https://tools.ietf.org/html/rfc7636#section-4.1 and https://tools.ietf.org/html/rfc7636#section-4.2
   */
  async generatePkceCodes() {
    const e = this.generateCodeVerifier(), t = this.generateCodeChallengeFromVerifier(e);
    return { verifier: e, challenge: t };
  }
  /**
   * generates the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.1
   */
  generateCodeVerifier() {
    const e = [], t = 256 - 256 % jr.CV_CHARSET.length;
    for (; e.length <= Wf; ) {
      const i = dt.randomBytes(1)[0];
      if (i >= t)
        continue;
      const o = i % jr.CV_CHARSET.length;
      e.push(jr.CV_CHARSET[o]);
    }
    const n = e.join(w.EMPTY_STRING);
    return $e.base64EncodeUrl(n);
  }
  /**
   * generate the challenge from the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.2
   * @param codeVerifier
   */
  generateCodeChallengeFromVerifier(e) {
    return $e.base64EncodeUrl(this.hashUtils.sha256(e).toString(Ye.BASE64), Ye.BASE64);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Uo {
  constructor() {
    this.pkceGenerator = new Cg(), this.guidGenerator = new Pl(), this.hashUtils = new Do();
  }
  /**
   * base64 URL safe encoded string
   */
  base64UrlEncode() {
    throw new Error("Method not implemented.");
  }
  /**
   * Stringifies and base64Url encodes input public key
   * @param inputKid - public key id
   * @returns Base64Url encoded public key
   */
  encodeKid() {
    throw new Error("Method not implemented.");
  }
  /**
   * Creates a new random GUID - used to populate state and nonce.
   * @returns string (GUID)
   */
  createNewGuid() {
    return this.guidGenerator.generateGuid();
  }
  /**
   * Encodes input string to base64.
   * @param input - string to be encoded
   */
  base64Encode(e) {
    return $e.base64Encode(e);
  }
  /**
   * Decodes input string from base64.
   * @param input - string to be decoded
   */
  base64Decode(e) {
    return $e.base64Decode(e);
  }
  /**
   * Generates PKCE codes used in Authorization Code Flow.
   */
  generatePkceCodes() {
    return this.pkceGenerator.generatePkceCodes();
  }
  /**
   * Generates a keypair, stores it and returns a thumbprint - not yet implemented for node
   */
  getPublicKeyThumbprint() {
    throw new Error("Method not implemented.");
  }
  /**
   * Removes cryptographic keypair from key store matching the keyId passed in
   * @param kid - public key id
   */
  removeTokenBindingKey() {
    throw new Error("Method not implemented.");
  }
  /**
   * Removes all cryptographic keys from Keystore
   */
  clearKeystore() {
    throw new Error("Method not implemented.");
  }
  /**
   * Signs the given object as a jwt payload with private key retrieved by given kid - currently not implemented for node
   */
  signJwt() {
    throw new Error("Method not implemented.");
  }
  /**
   * Returns the SHA-256 hash of an input string
   */
  async hashString(e) {
    return $e.base64EncodeUrl(this.hashUtils.sha256(e).toString(Ye.BASE64), Ye.BASE64);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
function _g(r) {
  const e = r.credentialType === ee.REFRESH_TOKEN && r.familyId || r.clientId, t = r.tokenType && r.tokenType.toLowerCase() !== Q.BEARER.toLowerCase() ? r.tokenType.toLowerCase() : "";
  return [
    r.homeAccountId,
    r.environment,
    r.credentialType,
    e,
    r.realm || "",
    r.target || "",
    r.requestedClaimsHash || "",
    t
  ].join(Tl.KEY_SEPARATOR).toLowerCase();
}
function Ig(r) {
  const e = r.homeAccountId.split(".")[1];
  return [
    r.homeAccountId,
    r.environment,
    e || r.tenantId || ""
  ].join(Tl.KEY_SEPARATOR).toLowerCase();
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class xo extends Co {
  constructor(e, t, n, i) {
    super(t, n, e, new rl(), i), this.cache = {}, this.changeEmitters = [], this.logger = e;
  }
  /**
   * Queue up callbacks
   * @param func - a callback function for cache change indication
   */
  registerChangeEmitter(e) {
    this.changeEmitters.push(e);
  }
  /**
   * Invoke the callback when cache changes
   */
  emitChange() {
    this.changeEmitters.forEach((e) => e.call(null));
  }
  /**
   * Converts cacheKVStore to InMemoryCache
   * @param cache - key value store
   */
  cacheToInMemoryCache(e) {
    const t = {
      accounts: {},
      idTokens: {},
      accessTokens: {},
      refreshTokens: {},
      appMetadata: {}
    };
    for (const n in e) {
      const i = e[n];
      if (typeof i == "object")
        if (i instanceof Oe)
          t.accounts[n] = i;
        else if (gs(i))
          t.idTokens[n] = i;
        else if (fs(i))
          t.accessTokens[n] = i;
        else if (ps(i))
          t.refreshTokens[n] = i;
        else if (ms(n, i))
          t.appMetadata[n] = i;
        else
          continue;
    }
    return t;
  }
  /**
   * converts inMemoryCache to CacheKVStore
   * @param inMemoryCache - kvstore map for inmemory
   */
  inMemoryCacheToCache(e) {
    let t = this.getCache();
    return t = {
      ...t,
      ...e.accounts,
      ...e.idTokens,
      ...e.accessTokens,
      ...e.refreshTokens,
      ...e.appMetadata
    }, t;
  }
  /**
   * gets the current in memory cache for the client
   */
  getInMemoryCache() {
    return this.logger.trace("Getting in-memory cache"), this.cacheToInMemoryCache(this.getCache());
  }
  /**
   * sets the current in memory cache for the client
   * @param inMemoryCache - key value map in memory
   */
  setInMemoryCache(e) {
    this.logger.trace("Setting in-memory cache");
    const t = this.inMemoryCacheToCache(e);
    this.setCache(t), this.emitChange();
  }
  /**
   * get the current cache key-value store
   */
  getCache() {
    return this.logger.trace("Getting cache key-value store"), this.cache;
  }
  /**
   * sets the current cache (key value store)
   * @param cacheMap - key value map
   */
  setCache(e) {
    this.logger.trace("Setting cache key value store"), this.cache = e, this.emitChange();
  }
  /**
   * Gets cache item with given key.
   * @param key - lookup key for the cache entry
   */
  getItem(e) {
    return this.logger.tracePii(`Item key: ${e}`), this.getCache()[e];
  }
  /**
   * Gets cache item with given key-value
   * @param key - lookup key for the cache entry
   * @param value - value of the cache entry
   */
  setItem(e, t) {
    this.logger.tracePii(`Item key: ${e}`);
    const n = this.getCache();
    n[e] = t, this.setCache(n);
  }
  generateCredentialKey(e) {
    return _g(e);
  }
  generateAccountKey(e) {
    return Ig(e);
  }
  getAccountKeys() {
    const e = this.getInMemoryCache();
    return Object.keys(e.accounts);
  }
  getTokenKeys() {
    const e = this.getInMemoryCache();
    return {
      idToken: Object.keys(e.idTokens),
      accessToken: Object.keys(e.accessTokens),
      refreshToken: Object.keys(e.refreshTokens)
    };
  }
  /**
   * Reads account from cache, builds it into an account entity and returns it.
   * @param accountKey - lookup key to fetch cache type AccountEntity
   * @returns
   */
  getAccount(e) {
    return this.getItem(e) ? Object.assign(new Oe(), this.getItem(e)) : null;
  }
  /**
   * set account entity
   * @param account - cache value to be set of type AccountEntity
   */
  async setAccount(e) {
    const t = this.generateAccountKey(Oe.getAccountInfo(e));
    this.setItem(t, e);
  }
  /**
   * fetch the idToken credential
   * @param idTokenKey - lookup key to fetch cache type IdTokenEntity
   */
  getIdTokenCredential(e) {
    const t = this.getItem(e);
    return gs(t) ? t : null;
  }
  /**
   * set idToken credential
   * @param idToken - cache value to be set of type IdTokenEntity
   */
  async setIdTokenCredential(e) {
    const t = this.generateCredentialKey(e);
    this.setItem(t, e);
  }
  /**
   * fetch the accessToken credential
   * @param accessTokenKey - lookup key to fetch cache type AccessTokenEntity
   */
  getAccessTokenCredential(e) {
    const t = this.getItem(e);
    return fs(t) ? t : null;
  }
  /**
   * set accessToken credential
   * @param accessToken -  cache value to be set of type AccessTokenEntity
   */
  async setAccessTokenCredential(e) {
    const t = this.generateCredentialKey(e);
    this.setItem(t, e);
  }
  /**
   * fetch the refreshToken credential
   * @param refreshTokenKey - lookup key to fetch cache type RefreshTokenEntity
   */
  getRefreshTokenCredential(e) {
    const t = this.getItem(e);
    return ps(t) ? t : null;
  }
  /**
   * set refreshToken credential
   * @param refreshToken - cache value to be set of type RefreshTokenEntity
   */
  async setRefreshTokenCredential(e) {
    const t = this.generateCredentialKey(e);
    this.setItem(t, e);
  }
  /**
   * fetch appMetadata entity from the platform cache
   * @param appMetadataKey - lookup key to fetch cache type AppMetadataEntity
   */
  getAppMetadata(e) {
    const t = this.getItem(e);
    return ms(e, t) ? t : null;
  }
  /**
   * set appMetadata entity to the platform cache
   * @param appMetadata - cache value to be set of type AppMetadataEntity
   */
  setAppMetadata(e) {
    const t = If(e);
    this.setItem(t, e);
  }
  /**
   * fetch server telemetry entity from the platform cache
   * @param serverTelemetrykey - lookup key to fetch cache type ServerTelemetryEntity
   */
  getServerTelemetry(e) {
    const t = this.getItem(e);
    return t && Cf(e, t) ? t : null;
  }
  /**
   * set server telemetry entity to the platform cache
   * @param serverTelemetryKey - lookup key to fetch cache type ServerTelemetryEntity
   * @param serverTelemetry - cache value to be set of type ServerTelemetryEntity
   */
  setServerTelemetry(e, t) {
    this.setItem(e, t);
  }
  /**
   * fetch authority metadata entity from the platform cache
   * @param key - lookup key to fetch cache type AuthorityMetadataEntity
   */
  getAuthorityMetadata(e) {
    const t = this.getItem(e);
    return t && Sf(e, t) ? t : null;
  }
  /**
   * Get all authority metadata keys
   */
  getAuthorityMetadataKeys() {
    return this.getKeys().filter((e) => this.isAuthorityMetadata(e));
  }
  /**
   * set authority metadata entity to the platform cache
   * @param key - lookup key to fetch cache type AuthorityMetadataEntity
   * @param metadata - cache value to be set of type AuthorityMetadataEntity
   */
  setAuthorityMetadata(e, t) {
    this.setItem(e, t);
  }
  /**
   * fetch throttling entity from the platform cache
   * @param throttlingCacheKey - lookup key to fetch cache type ThrottlingEntity
   */
  getThrottlingCache(e) {
    const t = this.getItem(e);
    return t && _f(e, t) ? t : null;
  }
  /**
   * set throttling entity to the platform cache
   * @param throttlingCacheKey - lookup key to fetch cache type ThrottlingEntity
   * @param throttlingCache - cache value to be set of type ThrottlingEntity
   */
  setThrottlingCache(e, t) {
    this.setItem(e, t);
  }
  /**
   * Removes the cache item from memory with the given key.
   * @param key - lookup key to remove a cache entity
   * @param inMemory - key value map of the cache
   */
  removeItem(e) {
    this.logger.tracePii(`Item key: ${e}`);
    let t = !1;
    const n = this.getCache();
    return n[e] && (delete n[e], t = !0), t && (this.setCache(n), this.emitChange()), t;
  }
  /**
   * Remove account entity from the platform cache if it's outdated
   * @param accountKey - lookup key to fetch cache type AccountEntity
   */
  removeOutdatedAccount(e) {
    this.removeItem(e);
  }
  /**
   * Checks whether key is in cache.
   * @param key - look up key for a cache entity
   */
  containsKey(e) {
    return this.getKeys().includes(e);
  }
  /**
   * Gets all keys in window.
   */
  getKeys() {
    this.logger.trace("Retrieving all cache keys");
    const e = this.getCache();
    return [...Object.keys(e)];
  }
  /**
   * Clears all cache entries created by MSAL (except tokens).
   */
  clear() {
    this.logger.trace("Clearing cache entries created by MSAL"), this.getKeys().forEach((t) => {
      this.removeItem(t);
    }), this.emitChange();
  }
  /**
   * Initialize in memory cache from an exisiting cache vault
   * @param cache - blob formatted cache (JSON)
   */
  static generateInMemoryCache(e) {
    return Bi.deserializeAllCache(Bi.deserializeJSONBlob(e));
  }
  /**
   * retrieves the final JSON
   * @param inMemoryCache - itemised cache read from the JSON
   */
  static generateJsonCache(e) {
    return pc.serializeAllCache(e);
  }
  /**
   * Updates a credential's cache key if the current cache key is outdated
   */
  updateCredentialCacheKey(e, t) {
    const n = this.generateCredentialKey(t);
    if (e !== n) {
      const i = this.getItem(e);
      if (i)
        return this.removeItem(e), this.setItem(n, i), this.logger.verbose(`Updated an outdated ${t.credentialType} cache key`), n;
      this.logger.error(`Attempted to update an outdated ${t.credentialType} cache key but no item matching the outdated key was found in storage`);
    }
    return e;
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const gn = {
  Account: {},
  IdToken: {},
  AccessToken: {},
  RefreshToken: {},
  AppMetadata: {}
};
class Sg {
  constructor(e, t, n) {
    this.cacheHasChanged = !1, this.storage = e, this.storage.registerChangeEmitter(this.handleChangeEvent.bind(this)), n && (this.persistence = n), this.logger = t;
  }
  /**
   * Set to true if cache state has changed since last time serialize or writeToPersistence was called
   */
  hasChanged() {
    return this.cacheHasChanged;
  }
  /**
   * Serializes in memory cache to JSON
   */
  serialize() {
    this.logger.trace("Serializing in-memory cache");
    let e = pc.serializeAllCache(this.storage.getInMemoryCache());
    return this.cacheSnapshot ? (this.logger.trace("Reading cache snapshot from disk"), e = this.mergeState(JSON.parse(this.cacheSnapshot), e)) : this.logger.trace("No cache snapshot to merge"), this.cacheHasChanged = !1, JSON.stringify(e);
  }
  /**
   * Deserializes JSON to in-memory cache. JSON should be in MSAL cache schema format
   * @param cache - blob formatted cache
   */
  deserialize(e) {
    if (this.logger.trace("Deserializing JSON to in-memory cache"), this.cacheSnapshot = e, this.cacheSnapshot) {
      this.logger.trace("Reading cache snapshot from disk");
      const t = Bi.deserializeAllCache(this.overlayDefaults(JSON.parse(this.cacheSnapshot)));
      this.storage.setInMemoryCache(t);
    } else
      this.logger.trace("No cache snapshot to deserialize");
  }
  /**
   * Fetches the cache key-value map
   */
  getKVStore() {
    return this.storage.getCache();
  }
  /**
   * Gets cache snapshot in CacheKVStore format
   */
  getCacheSnapshot() {
    const e = xo.generateInMemoryCache(this.cacheSnapshot);
    return this.storage.inMemoryCacheToCache(e);
  }
  /**
   * API that retrieves all accounts currently in cache to the user
   */
  async getAllAccounts(e = new Uo().createNewGuid()) {
    this.logger.trace("getAllAccounts called");
    let t;
    try {
      return this.persistence && (t = new On(this, !1), await this.persistence.beforeCacheAccess(t)), this.storage.getAllAccounts({}, e);
    } finally {
      this.persistence && t && await this.persistence.afterCacheAccess(t);
    }
  }
  /**
   * Returns the signed in account matching homeAccountId.
   * (the account object is created at the time of successful login)
   * or null when no matching account is found
   * @param homeAccountId - unique identifier for an account (uid.utid)
   */
  async getAccountByHomeId(e) {
    const t = await this.getAllAccounts();
    return e && t && t.length && t.filter((n) => n.homeAccountId === e)[0] || null;
  }
  /**
   * Returns the signed in account matching localAccountId.
   * (the account object is created at the time of successful login)
   * or null when no matching account is found
   * @param localAccountId - unique identifier of an account (sub/obj when homeAccountId cannot be populated)
   */
  async getAccountByLocalId(e) {
    const t = await this.getAllAccounts();
    return e && t && t.length && t.filter((n) => n.localAccountId === e)[0] || null;
  }
  /**
   * API to remove a specific account and the relevant data from cache
   * @param account - AccountInfo passed by the user
   */
  async removeAccount(e, t) {
    this.logger.trace("removeAccount called");
    let n;
    try {
      this.persistence && (n = new On(this, !0), await this.persistence.beforeCacheAccess(n)), this.storage.removeAccount(e, t || new Pl().generateGuid());
    } finally {
      this.persistence && n && await this.persistence.afterCacheAccess(n);
    }
  }
  /**
   * Overwrites in-memory cache with persistent cache
   */
  async overwriteCache() {
    if (!this.persistence) {
      this.logger.info("No persistence layer specified, cache cannot be overwritten");
      return;
    }
    this.logger.info("Overwriting in-memory cache with persistent cache"), this.storage.clear();
    const e = new On(this, !1);
    await this.persistence.beforeCacheAccess(e);
    const t = this.getCacheSnapshot();
    this.storage.setCache(t), await this.persistence.afterCacheAccess(e);
  }
  /**
   * Called when the cache has changed state.
   */
  handleChangeEvent() {
    this.cacheHasChanged = !0;
  }
  /**
   * Merge in memory cache with the cache snapshot.
   * @param oldState - cache before changes
   * @param currentState - current cache state in the library
   */
  mergeState(e, t) {
    this.logger.trace("Merging in-memory cache with cache snapshot");
    const n = this.mergeRemovals(e, t);
    return this.mergeUpdates(n, t);
  }
  /**
   * Deep update of oldState based on newState values
   * @param oldState - cache before changes
   * @param newState - updated cache
   */
  mergeUpdates(e, t) {
    return Object.keys(t).forEach((n) => {
      const i = t[n];
      if (!e.hasOwnProperty(n))
        i !== null && (e[n] = i);
      else {
        const o = i !== null, s = typeof i == "object", a = !Array.isArray(i), c = typeof e[n] < "u" && e[n] !== null;
        o && s && a && c ? this.mergeUpdates(e[n], i) : e[n] = i;
      }
    }), e;
  }
  /**
   * Removes entities in oldState that the were removed from newState. If there are any unknown values in root of
   * oldState that are not recognized, they are left untouched.
   * @param oldState - cache before changes
   * @param newState - updated cache
   */
  mergeRemovals(e, t) {
    this.logger.trace("Remove updated entries in cache");
    const n = e.Account ? this.mergeRemovalsDict(e.Account, t.Account) : e.Account, i = e.AccessToken ? this.mergeRemovalsDict(e.AccessToken, t.AccessToken) : e.AccessToken, o = e.RefreshToken ? this.mergeRemovalsDict(e.RefreshToken, t.RefreshToken) : e.RefreshToken, s = e.IdToken ? this.mergeRemovalsDict(e.IdToken, t.IdToken) : e.IdToken, a = e.AppMetadata ? this.mergeRemovalsDict(e.AppMetadata, t.AppMetadata) : e.AppMetadata;
    return {
      ...e,
      Account: n,
      AccessToken: i,
      RefreshToken: o,
      IdToken: s,
      AppMetadata: a
    };
  }
  /**
   * Helper to merge new cache with the old one
   * @param oldState - cache before changes
   * @param newState - updated cache
   */
  mergeRemovalsDict(e, t) {
    const n = { ...e };
    return Object.keys(e).forEach((i) => {
      (!t || !t.hasOwnProperty(i)) && delete n[i];
    }), n;
  }
  /**
   * Helper to overlay as a part of cache merge
   * @param passedInCache - cache read from the blob
   */
  overlayDefaults(e) {
    return this.logger.trace("Overlaying input cache with the default cache"), {
      Account: {
        ...gn.Account,
        ...e.Account
      },
      IdToken: {
        ...gn.IdToken,
        ...e.IdToken
      },
      AccessToken: {
        ...gn.AccessToken,
        ...e.AccessToken
      },
      RefreshToken: {
        ...gn.RefreshToken,
        ...e.RefreshToken
      },
      AppMetadata: {
        ...gn.AppMetadata,
        ...e.AppMetadata
      }
    };
  }
}
var ze = {}, Qn = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Hs;
function zn() {
  return Hs || (Hs = 1, (function(r, e) {
    var t = lr, n = t.Buffer;
    function i(s, a) {
      for (var c in s)
        a[c] = s[c];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = t : (i(t, e), e.Buffer = o);
    function o(s, a, c) {
      return n(s, a, c);
    }
    o.prototype = Object.create(n.prototype), i(n, o), o.from = function(s, a, c) {
      if (typeof s == "number")
        throw new TypeError("Argument must not be a number");
      return n(s, a, c);
    }, o.alloc = function(s, a, c) {
      if (typeof s != "number")
        throw new TypeError("Argument must be a number");
      var l = n(s);
      return a !== void 0 ? typeof c == "string" ? l.fill(a, c) : l.fill(a) : l.fill(0), l;
    }, o.allocUnsafe = function(s) {
      if (typeof s != "number")
        throw new TypeError("Argument must be a number");
      return n(s);
    }, o.allocUnsafeSlow = function(s) {
      if (typeof s != "number")
        throw new TypeError("Argument must be a number");
      return t.SlowBuffer(s);
    };
  })(Qn, Qn.exports)), Qn.exports;
}
var Qr, $s;
function Nl() {
  if ($s) return Qr;
  $s = 1;
  var r = zn().Buffer, e = Yi, t = Ar;
  function n(i) {
    if (this.buffer = null, this.writable = !0, this.readable = !0, !i)
      return this.buffer = r.alloc(0), this;
    if (typeof i.pipe == "function")
      return this.buffer = r.alloc(0), i.pipe(this), this;
    if (i.length || typeof i == "object")
      return this.buffer = i, this.writable = !1, process.nextTick((function() {
        this.emit("end", i), this.readable = !1, this.emit("close");
      }).bind(this)), this;
    throw new TypeError("Unexpected data type (" + typeof i + ")");
  }
  return t.inherits(n, e), n.prototype.write = function(o) {
    this.buffer = r.concat([this.buffer, r.from(o)]), this.emit("data", o);
  }, n.prototype.end = function(o) {
    o && this.write(o), this.emit("end", o), this.emit("close"), this.writable = !1, this.readable = !1;
  }, Qr = n, Qr;
}
var Jr, Bs;
function wg() {
  if (Bs) return Jr;
  Bs = 1;
  function r(n) {
    var i = (n / 8 | 0) + (n % 8 === 0 ? 0 : 1);
    return i;
  }
  var e = {
    ES256: r(256),
    ES384: r(384),
    ES512: r(521)
  };
  function t(n) {
    var i = e[n];
    if (i)
      return i;
    throw new Error('Unknown algorithm "' + n + '"');
  }
  return Jr = t, Jr;
}
var Zr, Fs;
function Rg() {
  if (Fs) return Zr;
  Fs = 1;
  var r = zn().Buffer, e = wg(), t = 128, n = 0, i = 32, o = 16, s = 2, a = o | i | n << 6, c = s | n << 6;
  function l(h) {
    return h.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  function u(h) {
    if (r.isBuffer(h))
      return h;
    if (typeof h == "string")
      return r.from(h, "base64");
    throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
  }
  function d(h, y) {
    h = u(h);
    var T = e(y), g = T + 1, m = h.length, E = 0;
    if (h[E++] !== a)
      throw new Error('Could not find expected "seq"');
    var C = h[E++];
    if (C === (t | 1) && (C = h[E++]), m - E < C)
      throw new Error('"seq" specified length of "' + C + '", only "' + (m - E) + '" remaining');
    if (h[E++] !== c)
      throw new Error('Could not find expected "int" for "r"');
    var P = h[E++];
    if (m - E - 2 < P)
      throw new Error('"r" specified length of "' + P + '", only "' + (m - E - 2) + '" available');
    if (g < P)
      throw new Error('"r" specified length of "' + P + '", max of "' + g + '" is acceptable');
    var k = E;
    if (E += P, h[E++] !== c)
      throw new Error('Could not find expected "int" for "s"');
    var I = h[E++];
    if (m - E !== I)
      throw new Error('"s" specified length of "' + I + '", expected "' + (m - E) + '"');
    if (g < I)
      throw new Error('"s" specified length of "' + I + '", max of "' + g + '" is acceptable');
    var _ = E;
    if (E += I, E !== m)
      throw new Error('Expected to consume entire buffer, but "' + (m - E) + '" bytes remain');
    var A = T - P, R = T - I, O = r.allocUnsafe(A + P + R + I);
    for (E = 0; E < A; ++E)
      O[E] = 0;
    h.copy(O, E, k + Math.max(-A, 0), k + P), E = T;
    for (var M = E; E < M + R; ++E)
      O[E] = 0;
    return h.copy(O, E, _ + Math.max(-R, 0), _ + I), O = O.toString("base64"), O = l(O), O;
  }
  function f(h, y, T) {
    for (var g = 0; y + g < T && h[y + g] === 0; )
      ++g;
    var m = h[y + g] >= t;
    return m && --g, g;
  }
  function p(h, y) {
    h = u(h);
    var T = e(y), g = h.length;
    if (g !== T * 2)
      throw new TypeError('"' + y + '" signatures must be "' + T * 2 + '" bytes, saw "' + g + '"');
    var m = f(h, 0, T), E = f(h, T, h.length), C = T - m, P = T - E, k = 2 + C + 1 + 1 + P, I = k < t, _ = r.allocUnsafe((I ? 2 : 3) + k), A = 0;
    return _[A++] = a, I ? _[A++] = k : (_[A++] = t | 1, _[A++] = k & 255), _[A++] = c, _[A++] = C, m < 0 ? (_[A++] = 0, A += h.copy(_, A, 0, T)) : A += h.copy(_, A, m, T), _[A++] = c, _[A++] = P, E < 0 ? (_[A++] = 0, h.copy(_, A, T)) : h.copy(_, A, T + E), _;
  }
  return Zr = {
    derToJose: d,
    joseToDer: p
  }, Zr;
}
var Xr, zs;
function bg() {
  if (zs) return Xr;
  zs = 1;
  var r = lr.Buffer, e = lr.SlowBuffer;
  Xr = t;
  function t(o, s) {
    if (!r.isBuffer(o) || !r.isBuffer(s) || o.length !== s.length)
      return !1;
    for (var a = 0, c = 0; c < o.length; c++)
      a |= o[c] ^ s[c];
    return a === 0;
  }
  t.install = function() {
    r.prototype.equal = e.prototype.equal = function(s) {
      return t(this, s);
    };
  };
  var n = r.prototype.equal, i = e.prototype.equal;
  return t.restore = function() {
    r.prototype.equal = n, e.prototype.equal = i;
  }, Xr;
}
var ei, qs;
function Ml() {
  if (qs) return ei;
  qs = 1;
  var r = zn().Buffer, e = dt, t = Rg(), n = Ar, i = `"%s" is not a valid algorithm.
  Supported algorithms are:
  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".`, o = "secret must be a string or buffer", s = "key must be a string or a buffer", a = "key must be a string, a buffer or an object", c = typeof e.createPublicKey == "function";
  c && (s += " or a KeyObject", o += "or a KeyObject");
  function l(v) {
    if (!r.isBuffer(v) && typeof v != "string" && (!c || typeof v != "object" || typeof v.type != "string" || typeof v.asymmetricKeyType != "string" || typeof v.export != "function"))
      throw h(s);
  }
  function u(v) {
    if (!r.isBuffer(v) && typeof v != "string" && typeof v != "object")
      throw h(a);
  }
  function d(v) {
    if (!r.isBuffer(v)) {
      if (typeof v == "string")
        return v;
      if (!c || typeof v != "object" || v.type !== "secret" || typeof v.export != "function")
        throw h(o);
    }
  }
  function f(v) {
    return v.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  function p(v) {
    v = v.toString();
    var H = 4 - v.length % 4;
    if (H !== 4)
      for (var D = 0; D < H; ++D)
        v += "=";
    return v.replace(/\-/g, "+").replace(/_/g, "/");
  }
  function h(v) {
    var H = [].slice.call(arguments, 1), D = n.format.bind(n, v).apply(null, H);
    return new TypeError(D);
  }
  function y(v) {
    return r.isBuffer(v) || typeof v == "string";
  }
  function T(v) {
    return y(v) || (v = JSON.stringify(v)), v;
  }
  function g(v) {
    return function(D, F) {
      d(F), D = T(D);
      var V = e.createHmac("sha" + v, F), j = (V.update(D), V.digest("base64"));
      return f(j);
    };
  }
  var m, E = "timingSafeEqual" in e ? function(H, D) {
    return H.byteLength !== D.byteLength ? !1 : e.timingSafeEqual(H, D);
  } : function(H, D) {
    return m || (m = bg()), m(H, D);
  };
  function C(v) {
    return function(D, F, V) {
      var j = g(v)(D, V);
      return E(r.from(F), r.from(j));
    };
  }
  function P(v) {
    return function(D, F) {
      u(F), D = T(D);
      var V = e.createSign("RSA-SHA" + v), j = (V.update(D), V.sign(F, "base64"));
      return f(j);
    };
  }
  function k(v) {
    return function(D, F, V) {
      l(V), D = T(D), F = p(F);
      var j = e.createVerify("RSA-SHA" + v);
      return j.update(D), j.verify(V, F, "base64");
    };
  }
  function I(v) {
    return function(D, F) {
      u(F), D = T(D);
      var V = e.createSign("RSA-SHA" + v), j = (V.update(D), V.sign({
        key: F,
        padding: e.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: e.constants.RSA_PSS_SALTLEN_DIGEST
      }, "base64"));
      return f(j);
    };
  }
  function _(v) {
    return function(D, F, V) {
      l(V), D = T(D), F = p(F);
      var j = e.createVerify("RSA-SHA" + v);
      return j.update(D), j.verify({
        key: V,
        padding: e.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: e.constants.RSA_PSS_SALTLEN_DIGEST
      }, F, "base64");
    };
  }
  function A(v) {
    var H = P(v);
    return function() {
      var F = H.apply(null, arguments);
      return F = t.derToJose(F, "ES" + v), F;
    };
  }
  function R(v) {
    var H = k(v);
    return function(F, V, j) {
      V = t.joseToDer(V, "ES" + v).toString("base64");
      var ye = H(F, V, j);
      return ye;
    };
  }
  function O() {
    return function() {
      return "";
    };
  }
  function M() {
    return function(H, D) {
      return D === "";
    };
  }
  return ei = function(H) {
    var D = {
      hs: g,
      rs: P,
      ps: I,
      es: A,
      none: O
    }, F = {
      hs: C,
      rs: k,
      ps: _,
      es: R,
      none: M
    }, V = H.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
    if (!V)
      throw h(i, H);
    var j = (V[1] || V[3]).toLowerCase(), ye = V[2];
    return {
      sign: D[j](ye),
      verify: F[j](ye)
    };
  }, ei;
}
var ti, Gs;
function Dl() {
  if (Gs) return ti;
  Gs = 1;
  var r = lr.Buffer;
  return ti = function(t) {
    return typeof t == "string" ? t : typeof t == "number" || r.isBuffer(t) ? t.toString() : JSON.stringify(t);
  }, ti;
}
var ni, Vs;
function kg() {
  if (Vs) return ni;
  Vs = 1;
  var r = zn().Buffer, e = Nl(), t = Ml(), n = Yi, i = Dl(), o = Ar;
  function s(u, d) {
    return r.from(u, d).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  function a(u, d, f) {
    f = f || "utf8";
    var p = s(i(u), "binary"), h = s(i(d), f);
    return o.format("%s.%s", p, h);
  }
  function c(u) {
    var d = u.header, f = u.payload, p = u.secret || u.privateKey, h = u.encoding, y = t(d.alg), T = a(d, f, h), g = y.sign(T, p);
    return o.format("%s.%s", T, g);
  }
  function l(u) {
    var d = u.secret;
    if (d = d ?? u.privateKey, d = d ?? u.key, /^hs/i.test(u.header.alg) === !0 && d == null)
      throw new TypeError("secret must be a string or buffer or a KeyObject");
    var f = new e(d);
    this.readable = !0, this.header = u.header, this.encoding = u.encoding, this.secret = this.privateKey = this.key = f, this.payload = new e(u.payload), this.secret.once("close", (function() {
      !this.payload.writable && this.readable && this.sign();
    }).bind(this)), this.payload.once("close", (function() {
      !this.secret.writable && this.readable && this.sign();
    }).bind(this));
  }
  return o.inherits(l, n), l.prototype.sign = function() {
    try {
      var d = c({
        header: this.header,
        payload: this.payload.buffer,
        secret: this.secret.buffer,
        encoding: this.encoding
      });
      return this.emit("done", d), this.emit("data", d), this.emit("end"), this.readable = !1, d;
    } catch (f) {
      this.readable = !1, this.emit("error", f), this.emit("close");
    }
  }, l.sign = c, ni = l, ni;
}
var ri, js;
function vg() {
  if (js) return ri;
  js = 1;
  var r = zn().Buffer, e = Nl(), t = Ml(), n = Yi, i = Dl(), o = Ar, s = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
  function a(g) {
    return Object.prototype.toString.call(g) === "[object Object]";
  }
  function c(g) {
    if (a(g))
      return g;
    try {
      return JSON.parse(g);
    } catch {
      return;
    }
  }
  function l(g) {
    var m = g.split(".", 1)[0];
    return c(r.from(m, "base64").toString("binary"));
  }
  function u(g) {
    return g.split(".", 2).join(".");
  }
  function d(g) {
    return g.split(".")[2];
  }
  function f(g, m) {
    m = m || "utf8";
    var E = g.split(".")[1];
    return r.from(E, "base64").toString(m);
  }
  function p(g) {
    return s.test(g) && !!l(g);
  }
  function h(g, m, E) {
    if (!m) {
      var C = new Error("Missing algorithm parameter for jws.verify");
      throw C.code = "MISSING_ALGORITHM", C;
    }
    g = i(g);
    var P = d(g), k = u(g), I = t(m);
    return I.verify(k, P, E);
  }
  function y(g, m) {
    if (m = m || {}, g = i(g), !p(g))
      return null;
    var E = l(g);
    if (!E)
      return null;
    var C = f(g);
    return (E.typ === "JWT" || m.json) && (C = JSON.parse(C, m.encoding)), {
      header: E,
      payload: C,
      signature: d(g)
    };
  }
  function T(g) {
    g = g || {};
    var m = g.secret;
    if (m = m ?? g.publicKey, m = m ?? g.key, /^hs/i.test(g.algorithm) === !0 && m == null)
      throw new TypeError("secret must be a string or buffer or a KeyObject");
    var E = new e(m);
    this.readable = !0, this.algorithm = g.algorithm, this.encoding = g.encoding, this.secret = this.publicKey = this.key = E, this.signature = new e(g.signature), this.secret.once("close", (function() {
      !this.signature.writable && this.readable && this.verify();
    }).bind(this)), this.signature.once("close", (function() {
      !this.secret.writable && this.readable && this.verify();
    }).bind(this));
  }
  return o.inherits(T, n), T.prototype.verify = function() {
    try {
      var m = h(this.signature.buffer, this.algorithm, this.key.buffer), E = y(this.signature.buffer, this.encoding);
      return this.emit("done", m, E), this.emit("data", m), this.emit("end"), this.readable = !1, m;
    } catch (C) {
      this.readable = !1, this.emit("error", C), this.emit("close");
    }
  }, T.decode = y, T.isValid = p, T.verify = h, ri = T, ri;
}
var Ks;
function Lo() {
  if (Ks) return ze;
  Ks = 1;
  var r = kg(), e = vg(), t = [
    "HS256",
    "HS384",
    "HS512",
    "RS256",
    "RS384",
    "RS512",
    "PS256",
    "PS384",
    "PS512",
    "ES256",
    "ES384",
    "ES512"
  ];
  return ze.ALGORITHMS = t, ze.sign = r.sign, ze.verify = e.verify, ze.decode = e.decode, ze.isValid = e.isValid, ze.createSign = function(i) {
    return new r(i);
  }, ze.createVerify = function(i) {
    return new e(i);
  }, ze;
}
var ii, Ys;
function Ul() {
  if (Ys) return ii;
  Ys = 1;
  var r = Lo();
  return ii = function(e, t) {
    t = t || {};
    var n = r.decode(e, t);
    if (!n)
      return null;
    var i = n.payload;
    if (typeof i == "string")
      try {
        var o = JSON.parse(i);
        o !== null && typeof o == "object" && (i = o);
      } catch {
      }
    return t.complete === !0 ? {
      header: n.header,
      payload: i,
      signature: n.signature
    } : i;
  }, ii;
}
var oi, Ws;
function kr() {
  if (Ws) return oi;
  Ws = 1;
  var r = function(e, t) {
    Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name = "JsonWebTokenError", this.message = e, t && (this.inner = t);
  };
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, oi = r, oi;
}
var si, Qs;
function xl() {
  if (Qs) return si;
  Qs = 1;
  var r = kr(), e = function(t, n) {
    r.call(this, t), this.name = "NotBeforeError", this.date = n;
  };
  return e.prototype = Object.create(r.prototype), e.prototype.constructor = e, si = e, si;
}
var ai, Js;
function Ll() {
  if (Js) return ai;
  Js = 1;
  var r = kr(), e = function(t, n) {
    r.call(this, t), this.name = "TokenExpiredError", this.expiredAt = n;
  };
  return e.prototype = Object.create(r.prototype), e.prototype.constructor = e, ai = e, ai;
}
var ci, Zs;
function Hl() {
  if (Zs) return ci;
  Zs = 1;
  var r = zd();
  return ci = function(e, t) {
    var n = t || Math.floor(Date.now() / 1e3);
    if (typeof e == "string") {
      var i = r(e);
      return typeof i > "u" ? void 0 : Math.floor(n + i / 1e3);
    } else return typeof e == "number" ? n + e : void 0;
  }, ci;
}
var li, Xs;
function Og() {
  return Xs || (Xs = 1, li = Qi().satisfies(process.version, ">=15.7.0")), li;
}
var di, ea;
function Pg() {
  return ea || (ea = 1, di = Qi().satisfies(process.version, ">=16.9.0")), di;
}
var ui, ta;
function $l() {
  if (ta) return ui;
  ta = 1;
  const r = Og(), e = Pg(), t = {
    ec: ["ES256", "ES384", "ES512"],
    rsa: ["RS256", "PS256", "RS384", "PS384", "RS512", "PS512"],
    "rsa-pss": ["PS256", "PS384", "PS512"]
  }, n = {
    ES256: "prime256v1",
    ES384: "secp384r1",
    ES512: "secp521r1"
  };
  return ui = function(i, o) {
    if (!i || !o) return;
    const s = o.asymmetricKeyType;
    if (!s) return;
    const a = t[s];
    if (!a)
      throw new Error(`Unknown key type "${s}".`);
    if (!a.includes(i))
      throw new Error(`"alg" parameter for "${s}" key type must be one of: ${a.join(", ")}.`);
    if (r)
      switch (s) {
        case "ec":
          const c = o.asymmetricKeyDetails.namedCurve, l = n[i];
          if (c !== l)
            throw new Error(`"alg" parameter "${i}" requires curve "${l}".`);
          break;
        case "rsa-pss":
          if (e) {
            const u = parseInt(i.slice(-3), 10), { hashAlgorithm: d, mgf1HashAlgorithm: f, saltLength: p } = o.asymmetricKeyDetails;
            if (d !== `sha${u}` || f !== d)
              throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${i}.`);
            if (p !== void 0 && p > u >> 3)
              throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${i}.`);
          }
          break;
      }
  }, ui;
}
var hi, na;
function Bl() {
  if (na) return hi;
  na = 1;
  var r = Qi();
  return hi = r.satisfies(process.version, "^6.12.0 || >=8.0.0"), hi;
}
var fi, ra;
function Ng() {
  if (ra) return fi;
  ra = 1;
  const r = kr(), e = xl(), t = Ll(), n = Ul(), i = Hl(), o = $l(), s = Bl(), a = Lo(), { KeyObject: c, createSecretKey: l, createPublicKey: u } = dt, d = ["RS256", "RS384", "RS512"], f = ["ES256", "ES384", "ES512"], p = ["RS256", "RS384", "RS512"], h = ["HS256", "HS384", "HS512"];
  return s && (d.splice(d.length, 0, "PS256", "PS384", "PS512"), p.splice(p.length, 0, "PS256", "PS384", "PS512")), fi = function(y, T, g, m) {
    typeof g == "function" && !m && (m = g, g = {}), g || (g = {}), g = Object.assign({}, g);
    let E;
    if (m ? E = m : E = function(A, R) {
      if (A) throw A;
      return R;
    }, g.clockTimestamp && typeof g.clockTimestamp != "number")
      return E(new r("clockTimestamp must be a number"));
    if (g.nonce !== void 0 && (typeof g.nonce != "string" || g.nonce.trim() === ""))
      return E(new r("nonce must be a non-empty string"));
    if (g.allowInvalidAsymmetricKeyTypes !== void 0 && typeof g.allowInvalidAsymmetricKeyTypes != "boolean")
      return E(new r("allowInvalidAsymmetricKeyTypes must be a boolean"));
    const C = g.clockTimestamp || Math.floor(Date.now() / 1e3);
    if (!y)
      return E(new r("jwt must be provided"));
    if (typeof y != "string")
      return E(new r("jwt must be a string"));
    const P = y.split(".");
    if (P.length !== 3)
      return E(new r("jwt malformed"));
    let k;
    try {
      k = n(y, { complete: !0 });
    } catch (A) {
      return E(A);
    }
    if (!k)
      return E(new r("invalid token"));
    const I = k.header;
    let _;
    if (typeof T == "function") {
      if (!m)
        return E(new r("verify must be called asynchronous if secret or public key is provided as a callback"));
      _ = T;
    } else
      _ = function(A, R) {
        return R(null, T);
      };
    return _(I, function(A, R) {
      if (A)
        return E(new r("error in secret or public key callback: " + A.message));
      const O = P[2].trim() !== "";
      if (!O && R)
        return E(new r("jwt signature is required"));
      if (O && !R)
        return E(new r("secret or public key must be provided"));
      if (!O && !g.algorithms)
        return E(new r('please specify "none" in "algorithms" to verify unsigned tokens'));
      if (R != null && !(R instanceof c))
        try {
          R = u(R);
        } catch {
          try {
            R = l(typeof R == "string" ? Buffer.from(R) : R);
          } catch {
            return E(new r("secretOrPublicKey is not valid key material"));
          }
        }
      if (g.algorithms || (R.type === "secret" ? g.algorithms = h : ["rsa", "rsa-pss"].includes(R.asymmetricKeyType) ? g.algorithms = p : R.asymmetricKeyType === "ec" ? g.algorithms = f : g.algorithms = d), g.algorithms.indexOf(k.header.alg) === -1)
        return E(new r("invalid algorithm"));
      if (I.alg.startsWith("HS") && R.type !== "secret")
        return E(new r(`secretOrPublicKey must be a symmetric key when using ${I.alg}`));
      if (/^(?:RS|PS|ES)/.test(I.alg) && R.type !== "public")
        return E(new r(`secretOrPublicKey must be an asymmetric key when using ${I.alg}`));
      if (!g.allowInvalidAsymmetricKeyTypes)
        try {
          o(I.alg, R);
        } catch (H) {
          return E(H);
        }
      let M;
      try {
        M = a.verify(y, k.header.alg, R);
      } catch (H) {
        return E(H);
      }
      if (!M)
        return E(new r("invalid signature"));
      const v = k.payload;
      if (typeof v.nbf < "u" && !g.ignoreNotBefore) {
        if (typeof v.nbf != "number")
          return E(new r("invalid nbf value"));
        if (v.nbf > C + (g.clockTolerance || 0))
          return E(new e("jwt not active", new Date(v.nbf * 1e3)));
      }
      if (typeof v.exp < "u" && !g.ignoreExpiration) {
        if (typeof v.exp != "number")
          return E(new r("invalid exp value"));
        if (C >= v.exp + (g.clockTolerance || 0))
          return E(new t("jwt expired", new Date(v.exp * 1e3)));
      }
      if (g.audience) {
        const H = Array.isArray(g.audience) ? g.audience : [g.audience];
        if (!(Array.isArray(v.aud) ? v.aud : [v.aud]).some(function(V) {
          return H.some(function(j) {
            return j instanceof RegExp ? j.test(V) : j === V;
          });
        }))
          return E(new r("jwt audience invalid. expected: " + H.join(" or ")));
      }
      if (g.issuer && (typeof g.issuer == "string" && v.iss !== g.issuer || Array.isArray(g.issuer) && g.issuer.indexOf(v.iss) === -1))
        return E(new r("jwt issuer invalid. expected: " + g.issuer));
      if (g.subject && v.sub !== g.subject)
        return E(new r("jwt subject invalid. expected: " + g.subject));
      if (g.jwtid && v.jti !== g.jwtid)
        return E(new r("jwt jwtid invalid. expected: " + g.jwtid));
      if (g.nonce && v.nonce !== g.nonce)
        return E(new r("jwt nonce invalid. expected: " + g.nonce));
      if (g.maxAge) {
        if (typeof v.iat != "number")
          return E(new r("iat required when maxAge is specified"));
        const H = i(g.maxAge, v.iat);
        if (typeof H > "u")
          return E(new r('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        if (C >= H + (g.clockTolerance || 0))
          return E(new t("maxAge exceeded", new Date(H * 1e3)));
      }
      if (g.complete === !0) {
        const H = k.signature;
        return E(null, {
          header: I,
          payload: v,
          signature: H
        });
      }
      return E(null, v);
    });
  }, fi;
}
var gi, ia;
function Mg() {
  if (ia) return gi;
  ia = 1;
  var r = 1 / 0, e = 9007199254740991, t = 17976931348623157e292, n = NaN, i = "[object Arguments]", o = "[object Function]", s = "[object GeneratorFunction]", a = "[object String]", c = "[object Symbol]", l = /^\s+|\s+$/g, u = /^[-+]0x[0-9a-f]+$/i, d = /^0b[01]+$/i, f = /^0o[0-7]+$/i, p = /^(?:0|[1-9]\d*)$/, h = parseInt;
  function y(S, x) {
    for (var $ = -1, ue = S ? S.length : 0, be = Array(ue); ++$ < ue; )
      be[$] = x(S[$], $, S);
    return be;
  }
  function T(S, x, $, ue) {
    for (var be = S.length, Fe = $ + -1; ++Fe < be; )
      if (x(S[Fe], Fe, S))
        return Fe;
    return -1;
  }
  function g(S, x, $) {
    if (x !== x)
      return T(S, m, $);
    for (var ue = $ - 1, be = S.length; ++ue < be; )
      if (S[ue] === x)
        return ue;
    return -1;
  }
  function m(S) {
    return S !== S;
  }
  function E(S, x) {
    for (var $ = -1, ue = Array(S); ++$ < S; )
      ue[$] = x($);
    return ue;
  }
  function C(S, x) {
    return y(x, function($) {
      return S[$];
    });
  }
  function P(S, x) {
    return function($) {
      return S(x($));
    };
  }
  var k = Object.prototype, I = k.hasOwnProperty, _ = k.toString, A = k.propertyIsEnumerable, R = P(Object.keys, Object), O = Math.max;
  function M(S, x) {
    var $ = j(S) || V(S) ? E(S.length, String) : [], ue = $.length, be = !!ue;
    for (var Fe in S)
      I.call(S, Fe) && !(be && (Fe == "length" || H(Fe, ue))) && $.push(Fe);
    return $;
  }
  function v(S) {
    if (!D(S))
      return R(S);
    var x = [];
    for (var $ in Object(S))
      I.call(S, $) && $ != "constructor" && x.push($);
    return x;
  }
  function H(S, x) {
    return x = x ?? e, !!x && (typeof S == "number" || p.test(S)) && S > -1 && S % 1 == 0 && S < x;
  }
  function D(S) {
    var x = S && S.constructor, $ = typeof x == "function" && x.prototype || k;
    return S === $;
  }
  function F(S, x, $, ue) {
    S = ye(S) ? S : xd(S), $ = $ && !ue ? Md($) : 0;
    var be = S.length;
    return $ < 0 && ($ = O(be + $, 0)), Od(S) ? $ <= be && S.indexOf(x, $) > -1 : !!be && g(S, x, $) > -1;
  }
  function V(S) {
    return bd(S) && I.call(S, "callee") && (!A.call(S, "callee") || _.call(S) == i);
  }
  var j = Array.isArray;
  function ye(S) {
    return S != null && vd(S.length) && !kd(S);
  }
  function bd(S) {
    return Mr(S) && ye(S);
  }
  function kd(S) {
    var x = Nr(S) ? _.call(S) : "";
    return x == o || x == s;
  }
  function vd(S) {
    return typeof S == "number" && S > -1 && S % 1 == 0 && S <= e;
  }
  function Nr(S) {
    var x = typeof S;
    return !!S && (x == "object" || x == "function");
  }
  function Mr(S) {
    return !!S && typeof S == "object";
  }
  function Od(S) {
    return typeof S == "string" || !j(S) && Mr(S) && _.call(S) == a;
  }
  function Pd(S) {
    return typeof S == "symbol" || Mr(S) && _.call(S) == c;
  }
  function Nd(S) {
    if (!S)
      return S === 0 ? S : 0;
    if (S = Dd(S), S === r || S === -r) {
      var x = S < 0 ? -1 : 1;
      return x * t;
    }
    return S === S ? S : 0;
  }
  function Md(S) {
    var x = Nd(S), $ = x % 1;
    return x === x ? $ ? x - $ : x : 0;
  }
  function Dd(S) {
    if (typeof S == "number")
      return S;
    if (Pd(S))
      return n;
    if (Nr(S)) {
      var x = typeof S.valueOf == "function" ? S.valueOf() : S;
      S = Nr(x) ? x + "" : x;
    }
    if (typeof S != "string")
      return S === 0 ? S : +S;
    S = S.replace(l, "");
    var $ = d.test(S);
    return $ || f.test(S) ? h(S.slice(2), $ ? 2 : 8) : u.test(S) ? n : +S;
  }
  function Ud(S) {
    return ye(S) ? M(S) : v(S);
  }
  function xd(S) {
    return S ? C(S, Ud(S)) : [];
  }
  return gi = F, gi;
}
var pi, oa;
function Dg() {
  if (oa) return pi;
  oa = 1;
  var r = "[object Boolean]", e = Object.prototype, t = e.toString;
  function n(o) {
    return o === !0 || o === !1 || i(o) && t.call(o) == r;
  }
  function i(o) {
    return !!o && typeof o == "object";
  }
  return pi = n, pi;
}
var mi, sa;
function Ug() {
  if (sa) return mi;
  sa = 1;
  var r = 1 / 0, e = 17976931348623157e292, t = NaN, n = "[object Symbol]", i = /^\s+|\s+$/g, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, a = /^0o[0-7]+$/i, c = parseInt, l = Object.prototype, u = l.toString;
  function d(m) {
    return typeof m == "number" && m == T(m);
  }
  function f(m) {
    var E = typeof m;
    return !!m && (E == "object" || E == "function");
  }
  function p(m) {
    return !!m && typeof m == "object";
  }
  function h(m) {
    return typeof m == "symbol" || p(m) && u.call(m) == n;
  }
  function y(m) {
    if (!m)
      return m === 0 ? m : 0;
    if (m = g(m), m === r || m === -r) {
      var E = m < 0 ? -1 : 1;
      return E * e;
    }
    return m === m ? m : 0;
  }
  function T(m) {
    var E = y(m), C = E % 1;
    return E === E ? C ? E - C : E : 0;
  }
  function g(m) {
    if (typeof m == "number")
      return m;
    if (h(m))
      return t;
    if (f(m)) {
      var E = typeof m.valueOf == "function" ? m.valueOf() : m;
      m = f(E) ? E + "" : E;
    }
    if (typeof m != "string")
      return m === 0 ? m : +m;
    m = m.replace(i, "");
    var C = s.test(m);
    return C || a.test(m) ? c(m.slice(2), C ? 2 : 8) : o.test(m) ? t : +m;
  }
  return mi = d, mi;
}
var yi, aa;
function xg() {
  if (aa) return yi;
  aa = 1;
  var r = "[object Number]", e = Object.prototype, t = e.toString;
  function n(o) {
    return !!o && typeof o == "object";
  }
  function i(o) {
    return typeof o == "number" || n(o) && t.call(o) == r;
  }
  return yi = i, yi;
}
var Ti, ca;
function Lg() {
  if (ca) return Ti;
  ca = 1;
  var r = "[object Object]";
  function e(f) {
    var p = !1;
    if (f != null && typeof f.toString != "function")
      try {
        p = !!(f + "");
      } catch {
      }
    return p;
  }
  function t(f, p) {
    return function(h) {
      return f(p(h));
    };
  }
  var n = Function.prototype, i = Object.prototype, o = n.toString, s = i.hasOwnProperty, a = o.call(Object), c = i.toString, l = t(Object.getPrototypeOf, Object);
  function u(f) {
    return !!f && typeof f == "object";
  }
  function d(f) {
    if (!u(f) || c.call(f) != r || e(f))
      return !1;
    var p = l(f);
    if (p === null)
      return !0;
    var h = s.call(p, "constructor") && p.constructor;
    return typeof h == "function" && h instanceof h && o.call(h) == a;
  }
  return Ti = d, Ti;
}
var Ei, la;
function Hg() {
  if (la) return Ei;
  la = 1;
  var r = "[object String]", e = Object.prototype, t = e.toString, n = Array.isArray;
  function i(s) {
    return !!s && typeof s == "object";
  }
  function o(s) {
    return typeof s == "string" || !n(s) && i(s) && t.call(s) == r;
  }
  return Ei = o, Ei;
}
var Ai, da;
function $g() {
  if (da) return Ai;
  da = 1;
  var r = "Expected a function", e = 1 / 0, t = 17976931348623157e292, n = NaN, i = "[object Symbol]", o = /^\s+|\s+$/g, s = /^[-+]0x[0-9a-f]+$/i, a = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt, u = Object.prototype, d = u.toString;
  function f(C, P) {
    var k;
    if (typeof P != "function")
      throw new TypeError(r);
    return C = m(C), function() {
      return --C > 0 && (k = P.apply(this, arguments)), C <= 1 && (P = void 0), k;
    };
  }
  function p(C) {
    return f(2, C);
  }
  function h(C) {
    var P = typeof C;
    return !!C && (P == "object" || P == "function");
  }
  function y(C) {
    return !!C && typeof C == "object";
  }
  function T(C) {
    return typeof C == "symbol" || y(C) && d.call(C) == i;
  }
  function g(C) {
    if (!C)
      return C === 0 ? C : 0;
    if (C = E(C), C === e || C === -e) {
      var P = C < 0 ? -1 : 1;
      return P * t;
    }
    return C === C ? C : 0;
  }
  function m(C) {
    var P = g(C), k = P % 1;
    return P === P ? k ? P - k : P : 0;
  }
  function E(C) {
    if (typeof C == "number")
      return C;
    if (T(C))
      return n;
    if (h(C)) {
      var P = typeof C.valueOf == "function" ? C.valueOf() : C;
      C = h(P) ? P + "" : P;
    }
    if (typeof C != "string")
      return C === 0 ? C : +C;
    C = C.replace(o, "");
    var k = a.test(C);
    return k || c.test(C) ? l(C.slice(2), k ? 2 : 8) : s.test(C) ? n : +C;
  }
  return Ai = p, Ai;
}
var Ci, ua;
function Bg() {
  if (ua) return Ci;
  ua = 1;
  const r = Hl(), e = Bl(), t = $l(), n = Lo(), i = Mg(), o = Dg(), s = Ug(), a = xg(), c = Lg(), l = Hg(), u = $g(), { KeyObject: d, createSecretKey: f, createPrivateKey: p } = dt, h = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
  e && h.splice(3, 0, "PS256", "PS384", "PS512");
  const y = {
    expiresIn: { isValid: function(k) {
      return s(k) || l(k) && k;
    }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
    notBefore: { isValid: function(k) {
      return s(k) || l(k) && k;
    }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
    audience: { isValid: function(k) {
      return l(k) || Array.isArray(k);
    }, message: '"audience" must be a string or array' },
    algorithm: { isValid: i.bind(null, h), message: '"algorithm" must be a valid string enum value' },
    header: { isValid: c, message: '"header" must be an object' },
    encoding: { isValid: l, message: '"encoding" must be a string' },
    issuer: { isValid: l, message: '"issuer" must be a string' },
    subject: { isValid: l, message: '"subject" must be a string' },
    jwtid: { isValid: l, message: '"jwtid" must be a string' },
    noTimestamp: { isValid: o, message: '"noTimestamp" must be a boolean' },
    keyid: { isValid: l, message: '"keyid" must be a string' },
    mutatePayload: { isValid: o, message: '"mutatePayload" must be a boolean' },
    allowInsecureKeySizes: { isValid: o, message: '"allowInsecureKeySizes" must be a boolean' },
    allowInvalidAsymmetricKeyTypes: { isValid: o, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean' }
  }, T = {
    iat: { isValid: a, message: '"iat" should be a number of seconds' },
    exp: { isValid: a, message: '"exp" should be a number of seconds' },
    nbf: { isValid: a, message: '"nbf" should be a number of seconds' }
  };
  function g(k, I, _, A) {
    if (!c(_))
      throw new Error('Expected "' + A + '" to be a plain object.');
    Object.keys(_).forEach(function(R) {
      const O = k[R];
      if (!O) {
        if (!I)
          throw new Error('"' + R + '" is not allowed in "' + A + '"');
        return;
      }
      if (!O.isValid(_[R]))
        throw new Error(O.message);
    });
  }
  function m(k) {
    return g(y, !1, k, "options");
  }
  function E(k) {
    return g(T, !0, k, "payload");
  }
  const C = {
    audience: "aud",
    issuer: "iss",
    subject: "sub",
    jwtid: "jti"
  }, P = [
    "expiresIn",
    "notBefore",
    "noTimestamp",
    "audience",
    "issuer",
    "subject",
    "jwtid"
  ];
  return Ci = function(k, I, _, A) {
    typeof _ == "function" ? (A = _, _ = {}) : _ = _ || {};
    const R = typeof k == "object" && !Buffer.isBuffer(k), O = Object.assign({
      alg: _.algorithm || "HS256",
      typ: R ? "JWT" : void 0,
      kid: _.keyid
    }, _.header);
    function M(D) {
      if (A)
        return A(D);
      throw D;
    }
    if (!I && _.algorithm !== "none")
      return M(new Error("secretOrPrivateKey must have a value"));
    if (I != null && !(I instanceof d))
      try {
        I = p(I);
      } catch {
        try {
          I = f(typeof I == "string" ? Buffer.from(I) : I);
        } catch {
          return M(new Error("secretOrPrivateKey is not valid key material"));
        }
      }
    if (O.alg.startsWith("HS") && I.type !== "secret")
      return M(new Error(`secretOrPrivateKey must be a symmetric key when using ${O.alg}`));
    if (/^(?:RS|PS|ES)/.test(O.alg)) {
      if (I.type !== "private")
        return M(new Error(`secretOrPrivateKey must be an asymmetric key when using ${O.alg}`));
      if (!_.allowInsecureKeySizes && !O.alg.startsWith("ES") && I.asymmetricKeyDetails !== void 0 && //KeyObject.asymmetricKeyDetails is supported in Node 15+
      I.asymmetricKeyDetails.modulusLength < 2048)
        return M(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${O.alg}`));
    }
    if (typeof k > "u")
      return M(new Error("payload is required"));
    if (R) {
      try {
        E(k);
      } catch (D) {
        return M(D);
      }
      _.mutatePayload || (k = Object.assign({}, k));
    } else {
      const D = P.filter(function(F) {
        return typeof _[F] < "u";
      });
      if (D.length > 0)
        return M(new Error("invalid " + D.join(",") + " option for " + typeof k + " payload"));
    }
    if (typeof k.exp < "u" && typeof _.expiresIn < "u")
      return M(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
    if (typeof k.nbf < "u" && typeof _.notBefore < "u")
      return M(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
    try {
      m(_);
    } catch (D) {
      return M(D);
    }
    if (!_.allowInvalidAsymmetricKeyTypes)
      try {
        t(O.alg, I);
      } catch (D) {
        return M(D);
      }
    const v = k.iat || Math.floor(Date.now() / 1e3);
    if (_.noTimestamp ? delete k.iat : R && (k.iat = v), typeof _.notBefore < "u") {
      try {
        k.nbf = r(_.notBefore, v);
      } catch (D) {
        return M(D);
      }
      if (typeof k.nbf > "u")
        return M(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
    if (typeof _.expiresIn < "u" && typeof k == "object") {
      try {
        k.exp = r(_.expiresIn, v);
      } catch (D) {
        return M(D);
      }
      if (typeof k.exp > "u")
        return M(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
    Object.keys(C).forEach(function(D) {
      const F = C[D];
      if (typeof _[D] < "u") {
        if (typeof k[F] < "u")
          return M(new Error('Bad "options.' + D + '" option. The payload already has an "' + F + '" property.'));
        k[F] = _[D];
      }
    });
    const H = _.encoding || "utf8";
    if (typeof A == "function")
      A = A && u(A), n.createSign({
        header: O,
        privateKey: I,
        payload: k,
        encoding: H
      }).once("error", A).once("done", function(D) {
        if (!_.allowInsecureKeySizes && /^(?:RS|PS)/.test(O.alg) && D.length < 256)
          return A(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${O.alg}`));
        A(null, D);
      });
    else {
      let D = n.sign({ header: O, payload: k, secret: I, encoding: H });
      if (!_.allowInsecureKeySizes && /^(?:RS|PS)/.test(O.alg) && D.length < 256)
        throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${O.alg}`);
      return D;
    }
  }, Ci;
}
var _i, ha;
function Fg() {
  return ha || (ha = 1, _i = {
    decode: Ul(),
    verify: Ng(),
    sign: Bg(),
    JsonWebTokenError: kr(),
    NotBeforeError: xl(),
    TokenExpiredError: Ll()
  }), _i;
}
var zg = Fg();
const qg = /* @__PURE__ */ ec(zg);
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Tt {
  /**
   * Initialize the ClientAssertion class from the clientAssertion passed by the user
   * @param assertion - refer https://tools.ietf.org/html/rfc7521
   */
  static fromAssertion(e) {
    const t = new Tt();
    return t.jwt = e, t;
  }
  /**
   * @deprecated Use fromCertificateWithSha256Thumbprint instead, with a SHA-256 thumprint
   * Initialize the ClientAssertion class from the certificate passed by the user
   * @param thumbprint - identifier of a certificate
   * @param privateKey - secret key
   * @param publicCertificate - electronic document provided to prove the ownership of the public key
   */
  static fromCertificate(e, t, n) {
    const i = new Tt();
    return i.privateKey = t, i.thumbprint = e, i.useSha256 = !1, n && (i.publicCertificate = this.parseCertificate(n)), i;
  }
  /**
   * Initialize the ClientAssertion class from the certificate passed by the user
   * @param thumbprint - identifier of a certificate
   * @param privateKey - secret key
   * @param publicCertificate - electronic document provided to prove the ownership of the public key
   */
  static fromCertificateWithSha256Thumbprint(e, t, n) {
    const i = new Tt();
    return i.privateKey = t, i.thumbprint = e, i.useSha256 = !0, n && (i.publicCertificate = this.parseCertificate(n)), i;
  }
  /**
   * Update JWT for certificate based clientAssertion, if passed by the user, uses it as is
   * @param cryptoProvider - library's crypto helper
   * @param issuer - iss claim
   * @param jwtAudience - aud claim
   */
  getJwt(e, t, n) {
    if (this.privateKey && this.thumbprint)
      return this.jwt && !this.isExpired() && t === this.issuer && n === this.jwtAudience ? this.jwt : this.createJwt(e, t, n);
    if (this.jwt)
      return this.jwt;
    throw N(Uc);
  }
  /**
   * JWT format and required claims specified: https://tools.ietf.org/html/rfc7523#section-3
   */
  createJwt(e, t, n) {
    this.issuer = t, this.jwtAudience = n;
    const i = te();
    this.expirationTime = i + 600;
    const s = {
      alg: this.useSha256 ? Pe.PSS_256 : Pe.RSA_256
    }, a = this.useSha256 ? Pe.X5T_256 : Pe.X5T;
    Object.assign(s, {
      [a]: $e.base64EncodeUrl(this.thumbprint, Ye.HEX)
    }), this.publicCertificate && Object.assign(s, {
      [Pe.X5C]: this.publicCertificate
    });
    const c = {
      [Pe.AUDIENCE]: this.jwtAudience,
      [Pe.EXPIRATION_TIME]: this.expirationTime,
      [Pe.ISSUER]: this.issuer,
      [Pe.SUBJECT]: this.issuer,
      [Pe.NOT_BEFORE]: i,
      [Pe.JWT_ID]: e.createNewGuid()
    };
    return this.jwt = qg.sign(c, this.privateKey, { header: s }), this.jwt;
  }
  /**
   * Utility API to check expiration
   */
  isExpired() {
    return this.expirationTime < te();
  }
  /**
   * Extracts the raw certs from a given certificate string and returns them in an array.
   * @param publicCertificate - electronic document provided to prove the ownership of the public key
   */
  static parseCertificate(e) {
    const t = /-----BEGIN CERTIFICATE-----\r*\n(.+?)\r*\n-----END CERTIFICATE-----/gs, n = [];
    let i;
    for (; (i = t.exec(e)) !== null; )
      n.push(i[1].replace(/\r*\n/g, w.EMPTY_STRING));
    return n;
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Gg extends St {
  constructor(e) {
    super(e);
  }
  /**
   * API to acquire a token by passing the username and password to the service in exchage of credentials
   * password_grant
   * @param request - CommonUsernamePasswordRequest
   */
  async acquireToken(e) {
    this.logger.info("in acquireToken call in username-password client");
    const t = te(), n = await this.executeTokenRequest(this.authority, e), i = new Se(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
    return i.validateTokenResponse(n.body), i.handleServerTokenResponse(n.body, this.authority, t, e, pe.acquireTokenByUsernamePassword);
  }
  /**
   * Executes POST request to token endpoint
   * @param authority - authority object
   * @param request - CommonUsernamePasswordRequest provided by the developer
   */
  async executeTokenRequest(e, t) {
    const n = this.createTokenQueryParameters(t), i = K.appendQueryString(e.tokenEndpoint, n), o = await this.createTokenRequestBody(t), s = this.createTokenRequestHeaders({
      credential: t.username,
      type: Le.UPN
    }), a = {
      clientId: this.config.authOptions.clientId,
      authority: e.canonicalAuthority,
      scopes: t.scopes,
      claims: t.claims,
      authenticationScheme: t.authenticationScheme,
      resourceRequestMethod: t.resourceRequestMethod,
      resourceRequestUri: t.resourceRequestUri,
      shrClaims: t.shrClaims,
      sshKid: t.sshKid
    };
    return this.executePostToTokenEndpoint(i, o, s, a, t.correlationId);
  }
  /**
   * Generates a map for all the params to be sent to the service
   * @param request - CommonUsernamePasswordRequest provided by the developer
   */
  async createTokenRequestBody(e) {
    const t = /* @__PURE__ */ new Map();
    st(t, this.config.authOptions.clientId), lf(t, e.username), df(t, e.password), ot(t, e.scopes), cl(t, mc.IDTOKEN_TOKEN), jt(t, Vt.RESOURCE_OWNER_PASSWORD_GRANT), Kt(t), _t(t, this.config.libraryInfo), It(t, this.config.telemetry.application), Wt(t), this.serverTelemetryManager && Yt(t, this.serverTelemetryManager);
    const n = e.correlationId || this.config.cryptoInterface.createNewGuid();
    Ct(t, n), this.config.clientCredentials.clientSecret && $n(t, this.config.clientCredentials.clientSecret);
    const i = this.config.clientCredentials.clientAssertion;
    return i && (Bn(t, await wt(i.assertion, this.config.authOptions.clientId, e.resourceRequestUri)), Fn(t, i.assertionType)), (!ve.isEmptyObj(e.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && at(t, e.claims, this.config.authOptions.clientCapabilities), this.config.systemOptions.preventCorsPreflight && e.username && Dn(t, e.username), Ie(t);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
function Vg(r, e, t, n) {
  const i = $f({
    ...r.auth,
    authority: e,
    redirectUri: t.redirectUri || ""
  }, t, n);
  return _t(i, {
    sku: lt.MSAL_SKU,
    version: qt,
    cpu: process.arch || "",
    os: process.platform || ""
  }), r.auth.protocolMode !== At.OIDC && It(i, r.telemetry.application), cl(i, mc.CODE), t.codeChallenge && t.codeChallengeMethod && ef(i, t.codeChallenge, t.codeChallengeMethod), He(i, t.extraQueryParameters || {}), Bf(e, i, r.auth.encodeExtraQueryParams, t.extraQueryParameters);
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Fl {
  /**
   * Constructor for the ClientApplication
   */
  constructor(e) {
    this.config = ag(e), this.cryptoProvider = new Uo(), this.logger = new it(this.config.system.loggerOptions, Oo, qt), this.storage = new xo(this.logger, this.config.auth.clientId, this.cryptoProvider, Rf(this.config.auth)), this.tokenCache = new Sg(this.storage, this.logger, this.config.cache.cachePlugin);
  }
  /**
   * Creates the URL of the authorization request, letting the user input credentials and consent to the
   * application. The URL targets the /authorize endpoint of the authority configured in the
   * application object.
   *
   * Once the user inputs their credentials and consents, the authority will send a response to the redirect URI
   * sent in the request and should contain an authorization code, which can then be used to acquire tokens via
   * `acquireTokenByCode(AuthorizationCodeRequest)`.
   */
  async getAuthCodeUrl(e) {
    this.logger.info("getAuthCodeUrl called", e.correlationId);
    const t = {
      ...e,
      ...await this.initializeBaseRequest(e),
      responseMode: e.responseMode || ro.QUERY,
      authenticationScheme: Q.BEARER,
      state: e.state || "",
      nonce: e.nonce || ""
    }, n = await this.createAuthority(t.authority, t.correlationId, void 0, e.azureCloudOptions);
    return Vg(this.config, n, t, this.logger);
  }
  /**
   * Acquires a token by exchanging the Authorization Code received from the first step of OAuth2.0
   * Authorization Code flow.
   *
   * `getAuthCodeUrl(AuthorizationCodeUrlRequest)` can be used to create the URL for the first step of OAuth2.0
   * Authorization Code flow. Ensure that values for redirectUri and scopes in AuthorizationCodeUrlRequest and
   * AuthorizationCodeRequest are the same.
   */
  async acquireTokenByCode(e, t) {
    this.logger.info("acquireTokenByCode called"), e.state && t && (this.logger.info("acquireTokenByCode - validating state"), this.validateState(e.state, t.state || ""), t = { ...t, state: "" });
    const n = {
      ...e,
      ...await this.initializeBaseRequest(e),
      authenticationScheme: Q.BEARER
    }, i = this.initializeServerTelemetryManager(pe.acquireTokenByCode, n.correlationId);
    try {
      const o = await this.createAuthority(n.authority, n.correlationId, void 0, e.azureCloudOptions), s = await this.buildOauthClientConfiguration(o, n.correlationId, n.redirectUri, i), a = new xf(s);
      return this.logger.verbose("Auth code client created", n.correlationId), await a.acquireToken(n, pe.acquireTokenByCode, t);
    } catch (o) {
      throw o instanceof Z && o.setCorrelationId(n.correlationId), i.cacheFailedRequest(o), o;
    }
  }
  /**
   * Acquires a token by exchanging the refresh token provided for a new set of tokens.
   *
   * This API is provided only for scenarios where you would like to migrate from ADAL to MSAL. Otherwise, it is
   * recommended that you use `acquireTokenSilent()` for silent scenarios. When using `acquireTokenSilent()`, MSAL will
   * handle the caching and refreshing of tokens automatically.
   */
  async acquireTokenByRefreshToken(e) {
    this.logger.info("acquireTokenByRefreshToken called", e.correlationId);
    const t = {
      ...e,
      ...await this.initializeBaseRequest(e),
      authenticationScheme: Q.BEARER
    }, n = this.initializeServerTelemetryManager(pe.acquireTokenByRefreshToken, t.correlationId);
    try {
      const i = await this.createAuthority(t.authority, t.correlationId, void 0, e.azureCloudOptions), o = await this.buildOauthClientConfiguration(i, t.correlationId, t.redirectUri || "", n), s = new Gr(o);
      return this.logger.verbose("Refresh token client created", t.correlationId), await s.acquireToken(t, pe.acquireTokenByRefreshToken);
    } catch (i) {
      throw i instanceof Z && i.setCorrelationId(t.correlationId), n.cacheFailedRequest(i), i;
    }
  }
  /**
   * Acquires a token silently when a user specifies the account the token is requested for.
   *
   * This API expects the user to provide an account object and looks into the cache to retrieve the token if present.
   * There is also an optional "forceRefresh" boolean the user can send to bypass the cache for access_token and id_token.
   * In case the refresh_token is expired or not found, an error is thrown
   * and the guidance is for the user to call any interactive token acquisition API (eg: `acquireTokenByCode()`).
   */
  async acquireTokenSilent(e) {
    const t = {
      ...e,
      ...await this.initializeBaseRequest(e),
      forceRefresh: e.forceRefresh || !1
    }, n = this.initializeServerTelemetryManager(pe.acquireTokenSilent, t.correlationId, t.forceRefresh);
    try {
      const i = await this.createAuthority(t.authority, t.correlationId, void 0, e.azureCloudOptions), o = await this.buildOauthClientConfiguration(i, t.correlationId, t.redirectUri || "", n), s = new Hf(o);
      this.logger.verbose("Silent flow client created", t.correlationId);
      try {
        return await this.tokenCache.overwriteCache(), await this.acquireCachedTokenSilent(t, s, o);
      } catch (a) {
        if (a instanceof Ir && a.errorCode === yt)
          return new Gr(o).acquireTokenByRefreshToken(t, pe.acquireTokenSilent);
        throw a;
      }
    } catch (i) {
      throw i instanceof Z && i.setCorrelationId(t.correlationId), n.cacheFailedRequest(i), i;
    }
  }
  async acquireCachedTokenSilent(e, t, n) {
    var s;
    const [i, o] = await t.acquireCachedToken({
      ...e,
      scopes: (s = e.scopes) != null && s.length ? e.scopes : [...je]
    });
    if (o === oe.PROACTIVELY_REFRESHED) {
      this.logger.info("ClientApplication:acquireCachedTokenSilent - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed.");
      const a = new Gr(n);
      try {
        await a.acquireTokenByRefreshToken(e, pe.acquireTokenSilent);
      } catch {
      }
    }
    return i;
  }
  /**
   * Acquires tokens with password grant by exchanging client applications username and password for credentials
   *
   * The latest OAuth 2.0 Security Best Current Practice disallows the password grant entirely.
   * More details on this recommendation at https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-3.4
   * Microsoft's documentation and recommendations are at:
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-authentication-flows#usernamepassword
   *
   * @param request - UsenamePasswordRequest
   * @deprecated - Use a more secure flow instead
   */
  async acquireTokenByUsernamePassword(e) {
    this.logger.info("acquireTokenByUsernamePassword called", e.correlationId);
    const t = {
      ...e,
      ...await this.initializeBaseRequest(e)
    }, n = this.initializeServerTelemetryManager(pe.acquireTokenByUsernamePassword, t.correlationId);
    try {
      const i = await this.createAuthority(t.authority, t.correlationId, void 0, e.azureCloudOptions), o = await this.buildOauthClientConfiguration(i, t.correlationId, "", n), s = new Gg(o);
      return this.logger.verbose("Username password client created", t.correlationId), await s.acquireToken(t);
    } catch (i) {
      throw i instanceof Z && i.setCorrelationId(t.correlationId), n.cacheFailedRequest(i), i;
    }
  }
  /**
   * Gets the token cache for the application.
   */
  getTokenCache() {
    return this.logger.info("getTokenCache called"), this.tokenCache;
  }
  /**
   * Validates OIDC state by comparing the user cached state with the state received from the server.
   *
   * This API is provided for scenarios where you would use OAuth2.0 state parameter to mitigate against
   * CSRF attacks.
   * For more information about state, visit https://datatracker.ietf.org/doc/html/rfc6819#section-3.6.
   * @param state - Unique GUID generated by the user that is cached by the user and sent to the server during the first leg of the flow
   * @param cachedState - This string is sent back by the server with the authorization code
   */
  validateState(e, t) {
    if (!e)
      throw ne.createStateNotFoundError();
    if (e !== t)
      throw N(Sc);
  }
  /**
   * Returns the logger instance
   */
  getLogger() {
    return this.logger;
  }
  /**
   * Replaces the default logger set in configurations with new Logger with new configurations
   * @param logger - Logger instance
   */
  setLogger(e) {
    this.logger = e;
  }
  /**
   * Builds the common configuration to be passed to the common component based on the platform configurarion
   * @param authority - user passed authority in configuration
   * @param serverTelemetryManager - initializes servertelemetry if passed
   */
  async buildOauthClientConfiguration(e, t, n, i) {
    return this.logger.verbose("buildOauthClientConfiguration called", t), this.logger.info(`Building oauth client configuration with the following authority: ${e.tokenEndpoint}.`, t), i == null || i.updateRegionDiscoveryMetadata(e.regionDiscoveryMetadata), {
      authOptions: {
        clientId: this.config.auth.clientId,
        authority: e,
        clientCapabilities: this.config.auth.clientCapabilities,
        redirectUri: n
      },
      loggerOptions: {
        logLevel: this.config.system.loggerOptions.logLevel,
        loggerCallback: this.config.system.loggerOptions.loggerCallback,
        piiLoggingEnabled: this.config.system.loggerOptions.piiLoggingEnabled,
        correlationId: t
      },
      cacheOptions: {
        claimsBasedCachingEnabled: this.config.cache.claimsBasedCachingEnabled
      },
      cryptoInterface: this.cryptoProvider,
      networkInterface: this.config.system.networkClient,
      storageInterface: this.storage,
      serverTelemetryManager: i,
      clientCredentials: {
        clientSecret: this.clientSecret,
        clientAssertion: await this.getClientAssertion(e)
      },
      libraryInfo: {
        sku: lt.MSAL_SKU,
        version: qt,
        cpu: process.arch || w.EMPTY_STRING,
        os: process.platform || w.EMPTY_STRING
      },
      telemetry: this.config.telemetry,
      persistencePlugin: this.config.cache.cachePlugin,
      serializableCache: this.tokenCache
    };
  }
  async getClientAssertion(e) {
    return this.developerProvidedClientAssertion && (this.clientAssertion = Tt.fromAssertion(await wt(this.developerProvidedClientAssertion, this.config.auth.clientId, e.tokenEndpoint))), this.clientAssertion && {
      assertion: this.clientAssertion.getJwt(this.cryptoProvider, this.config.auth.clientId, e.tokenEndpoint),
      assertionType: lt.JWT_BEARER_ASSERTION_TYPE
    };
  }
  /**
   * Generates a request with the default scopes & generates a correlationId.
   * @param authRequest - BaseAuthRequest for initialization
   */
  async initializeBaseRequest(e) {
    return this.logger.verbose("initializeRequestScopes called", e.correlationId), e.authenticationScheme && e.authenticationScheme === Q.POP && this.logger.verbose("Authentication Scheme 'pop' is not supported yet, setting Authentication Scheme to 'Bearer' for request", e.correlationId), e.authenticationScheme = Q.BEARER, this.config.cache.claimsBasedCachingEnabled && e.claims && // Checks for empty stringified object "{}" which doesn't qualify as requested claims
    !ve.isEmptyObj(e.claims) && (e.requestedClaimsHash = await this.cryptoProvider.hashString(e.claims)), {
      ...e,
      scopes: [
        ...e && e.scopes || [],
        ...je
      ],
      correlationId: e && e.correlationId || this.cryptoProvider.createNewGuid(),
      authority: e.authority || this.config.auth.authority
    };
  }
  /**
   * Initializes the server telemetry payload
   * @param apiId - Id for a specific request
   * @param correlationId - GUID
   * @param forceRefresh - boolean to indicate network call
   */
  initializeServerTelemetryManager(e, t, n) {
    const i = {
      clientId: this.config.auth.clientId,
      correlationId: t,
      apiId: e,
      forceRefresh: n || !1
    };
    return new Un(i, this.storage);
  }
  /**
   * Create authority instance. If authority not passed in request, default to authority set on the application
   * object. If no authority set in application object, then default to common authority.
   * @param authorityString - authority from user configuration
   */
  async createAuthority(e, t, n, i) {
    this.logger.verbose("createAuthority called", t);
    const o = ge.generateAuthority(e, i || this.config.auth.azureCloudOptions), s = {
      protocolMode: this.config.auth.protocolMode,
      knownAuthorities: this.config.auth.knownAuthorities,
      cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata,
      authorityMetadata: this.config.auth.authorityMetadata,
      azureRegionConfiguration: n,
      skipAuthorityMetadataCache: this.config.auth.skipAuthorityMetadataCache
    };
    return gl(o, this.config.system.networkClient, this.storage, s, this.logger, t);
  }
  /**
   * Clear the cache
   */
  clearCache() {
    this.storage.clear();
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class jg {
  /**
   * Spins up a loopback server which returns the server response when the localhost redirectUri is hit
   * @param successTemplate
   * @param errorTemplate
   * @returns
   */
  async listenForAuthCode(e, t) {
    if (this.server)
      throw ne.createLoopbackServerAlreadyExistsError();
    return new Promise((n, i) => {
      this.server = Mt.createServer((o, s) => {
        const a = o.url;
        if (a) {
          if (a === w.FORWARD_SLASH) {
            s.end(e || "Auth code was successfully acquired. You can close this window now.");
            return;
          }
        } else {
          s.end(t || "Error occurred loading redirectUrl"), i(ne.createUnableToLoadRedirectUrlError());
          return;
        }
        const c = this.getRedirectUri(), l = new URL(a, c), u = Xc(l.search) || {};
        u.code && (s.writeHead(G.REDIRECT, {
          location: c
        }), s.end()), u.error && s.end(t || `Error occurred: ${u.error}`), n(u);
      }), this.server.listen(0, "127.0.0.1");
    });
  }
  /**
   * Get the port that the loopback server is running on
   * @returns
   */
  getRedirectUri() {
    if (!this.server || !this.server.listening)
      throw ne.createNoLoopbackServerExistsError();
    const e = this.server.address();
    if (!e || typeof e == "string" || !e.port)
      throw this.closeServer(), ne.createInvalidLoopbackAddressTypeError();
    const t = e && e.port;
    return `${lt.HTTP_PROTOCOL}${lt.LOCALHOST}:${t}`;
  }
  /**
   * Close the loopback server
   */
  closeServer() {
    this.server && (this.server.close(), typeof this.server.closeAllConnections == "function" && this.server.closeAllConnections(), this.server.unref(), this.server = void 0);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Kg extends St {
  constructor(e) {
    super(e);
  }
  /**
   * Gets device code from device code endpoint, calls back to with device code response, and
   * polls token endpoint to exchange device code for tokens
   * @param request - developer provided CommonDeviceCodeRequest
   */
  async acquireToken(e) {
    const t = await this.getDeviceCode(e);
    e.deviceCodeCallback(t);
    const n = te(), i = await this.acquireTokenWithDeviceCode(e, t), o = new Se(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
    return o.validateTokenResponse(i), o.handleServerTokenResponse(i, this.authority, n, e, pe.acquireTokenByDeviceCode);
  }
  /**
   * Creates device code request and executes http GET
   * @param request - developer provided CommonDeviceCodeRequest
   */
  async getDeviceCode(e) {
    const t = this.createExtraQueryParameters(e), n = K.appendQueryString(this.authority.deviceCodeEndpoint, t), i = this.createQueryString(e), o = this.createTokenRequestHeaders(), s = {
      clientId: this.config.authOptions.clientId,
      authority: e.authority,
      scopes: e.scopes,
      claims: e.claims,
      authenticationScheme: e.authenticationScheme,
      resourceRequestMethod: e.resourceRequestMethod,
      resourceRequestUri: e.resourceRequestUri,
      shrClaims: e.shrClaims,
      sshKid: e.sshKid
    };
    return this.executePostRequestToDeviceCodeEndpoint(n, i, o, s, e.correlationId);
  }
  /**
   * Creates query string for the device code request
   * @param request - developer provided CommonDeviceCodeRequest
   */
  createExtraQueryParameters(e) {
    const t = /* @__PURE__ */ new Map();
    return e.extraQueryParameters && He(t, e.extraQueryParameters), Ie(t);
  }
  /**
   * Executes POST request to device code endpoint
   * @param deviceCodeEndpoint - token endpoint
   * @param queryString - string to be used in the body of the request
   * @param headers - headers for the request
   * @param thumbprint - unique request thumbprint
   * @param correlationId - correlation id to be used in the request
   */
  async executePostRequestToDeviceCodeEndpoint(e, t, n, i, o) {
    const { body: { user_code: s, device_code: a, verification_uri: c, expires_in: l, interval: u, message: d } } = await this.sendPostRequest(i, e, {
      body: t,
      headers: n
    }, o);
    return {
      userCode: s,
      deviceCode: a,
      verificationUri: c,
      expiresIn: l,
      interval: u,
      message: d
    };
  }
  /**
   * Create device code endpoint query parameters and returns string
   * @param request - developer provided CommonDeviceCodeRequest
   */
  createQueryString(e) {
    const t = /* @__PURE__ */ new Map();
    return ot(t, e.scopes), st(t, this.config.authOptions.clientId), e.extraQueryParameters && He(t, e.extraQueryParameters), (e.claims || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && at(t, e.claims, this.config.authOptions.clientCapabilities), Ie(t);
  }
  /**
   * Breaks the polling with specific conditions
   * @param deviceCodeExpirationTime - expiration time for the device code request
   * @param userSpecifiedTimeout - developer provided timeout, to be compared against deviceCodeExpirationTime
   * @param userSpecifiedCancelFlag - boolean indicating the developer would like to cancel the request
   */
  continuePolling(e, t, n) {
    if (n)
      throw this.logger.error("Token request cancelled by setting DeviceCodeRequest.cancel = true"), N(Pc);
    if (t && t < e && te() > t)
      throw this.logger.error(`User defined timeout for device code polling reached. The timeout was set for ${t}`), N(xc);
    if (te() > e)
      throw t && this.logger.verbose(`User specified timeout ignored as the device code has expired before the timeout elapsed. The user specified timeout was set for ${t}`), this.logger.error(`Device code expired. Expiration time of device code was ${e}`), N(Nc);
    return !0;
  }
  /**
   * Creates token request with device code response and polls token endpoint at interval set by the device code response
   * @param request - developer provided CommonDeviceCodeRequest
   * @param deviceCodeResponse - DeviceCodeResponse returned by the security token service device code endpoint
   */
  async acquireTokenWithDeviceCode(e, t) {
    const n = this.createTokenQueryParameters(e), i = K.appendQueryString(this.authority.tokenEndpoint, n), o = this.createTokenRequestBody(e, t), s = this.createTokenRequestHeaders(), a = e.timeout ? te() + e.timeout : void 0, c = te() + t.expiresIn, l = t.interval * 1e3;
    for (; this.continuePolling(c, a, e.cancel); ) {
      const u = {
        clientId: this.config.authOptions.clientId,
        authority: e.authority,
        scopes: e.scopes,
        claims: e.claims,
        authenticationScheme: e.authenticationScheme,
        resourceRequestMethod: e.resourceRequestMethod,
        resourceRequestUri: e.resourceRequestUri,
        shrClaims: e.shrClaims,
        sshKid: e.sshKid
      }, d = await this.executePostToTokenEndpoint(i, o, s, u, e.correlationId);
      if (d.body && d.body.error)
        if (d.body.error === w.AUTHORIZATION_PENDING)
          this.logger.info("Authorization pending. Continue polling."), await yf(l);
        else
          throw this.logger.info("Unexpected error in polling from the server"), wu(Ec, d.body.error);
      else
        return this.logger.verbose("Authorization completed successfully. Polling stopped."), d.body;
    }
    throw this.logger.error("Polling stopped for unknown reasons."), N(Mc);
  }
  /**
   * Creates query parameters and converts to string.
   * @param request - developer provided CommonDeviceCodeRequest
   * @param deviceCodeResponse - DeviceCodeResponse returned by the security token service device code endpoint
   */
  createTokenRequestBody(e, t) {
    const n = /* @__PURE__ */ new Map();
    ot(n, e.scopes), st(n, this.config.authOptions.clientId), jt(n, Vt.DEVICE_CODE_GRANT), nf(n, t.deviceCode);
    const i = e.correlationId || this.config.cryptoInterface.createNewGuid();
    return Ct(n, i), Kt(n), _t(n, this.config.libraryInfo), It(n, this.config.telemetry.application), Wt(n), this.serverTelemetryManager && Yt(n, this.serverTelemetryManager), (!ve.isEmptyObj(e.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && at(n, e.claims, this.config.authOptions.clientCapabilities), Ie(n);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Yg extends Fl {
  /**
   * Important attributes in the Configuration object for auth are:
   * - clientID: the application ID of your application. You can obtain one by registering your application with our Application registration portal.
   * - authority: the authority URL for your application.
   *
   * AAD authorities are of the form https://login.microsoftonline.com/\{Enter_the_Tenant_Info_Here\}.
   * - If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
   * - If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
   * - If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
   * - To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
   *
   * Azure B2C authorities are of the form https://\{instance\}/\{tenant\}/\{policy\}. Each policy is considered
   * its own authority. You will have to set the all of the knownAuthorities at the time of the client application
   * construction.
   *
   * ADFS authorities are of the form https://\{instance\}/adfs.
   */
  constructor(e) {
    super(e), this.config.broker.nativeBrokerPlugin && (this.config.broker.nativeBrokerPlugin.isBrokerAvailable ? (this.nativeBrokerPlugin = this.config.broker.nativeBrokerPlugin, this.nativeBrokerPlugin.setLogger(this.config.system.loggerOptions)) : this.logger.warning("NativeBroker implementation was provided but the broker is unavailable.")), this.skus = Un.makeExtraSkuString({
      libraryName: lt.MSAL_SKU,
      libraryVersion: qt
    });
  }
  /**
   * Acquires a token from the authority using OAuth2.0 device code flow.
   * This flow is designed for devices that do not have access to a browser or have input constraints.
   * The authorization server issues a DeviceCode object with a verification code, an end-user code,
   * and the end-user verification URI. The DeviceCode object is provided through a callback, and the end-user should be
   * instructed to use another device to navigate to the verification URI to input credentials.
   * Since the client cannot receive incoming requests, it polls the authorization server repeatedly
   * until the end-user completes input of credentials.
   */
  async acquireTokenByDeviceCode(e) {
    this.logger.info("acquireTokenByDeviceCode called", e.correlationId);
    const t = Object.assign(e, await this.initializeBaseRequest(e)), n = this.initializeServerTelemetryManager(pe.acquireTokenByDeviceCode, t.correlationId);
    try {
      const i = await this.createAuthority(t.authority, t.correlationId, void 0, e.azureCloudOptions), o = await this.buildOauthClientConfiguration(i, t.correlationId, "", n), s = new Kg(o);
      return this.logger.verbose("Device code client created", t.correlationId), await s.acquireToken(t);
    } catch (i) {
      throw i instanceof Z && i.setCorrelationId(t.correlationId), n.cacheFailedRequest(i), i;
    }
  }
  /**
   * Acquires a token interactively via the browser by requesting an authorization code then exchanging it for a token.
   */
  async acquireTokenInteractive(e) {
    var h;
    const t = e.correlationId || this.cryptoProvider.createNewGuid();
    this.logger.trace("acquireTokenInteractive called", t);
    const { openBrowser: n, successTemplate: i, errorTemplate: o, windowHandle: s, loopbackClient: a, ...c } = e;
    if (this.nativeBrokerPlugin) {
      const y = {
        ...c,
        clientId: this.config.auth.clientId,
        scopes: e.scopes || je,
        redirectUri: e.redirectUri || "",
        authority: e.authority || this.config.auth.authority,
        correlationId: t,
        extraParameters: {
          ...c.extraQueryParameters,
          ...c.tokenQueryParameters,
          [ds]: this.skus
        },
        accountId: (h = c.account) == null ? void 0 : h.nativeAccountId
      };
      return this.nativeBrokerPlugin.acquireTokenInteractive(y, s);
    }
    if (e.redirectUri) {
      if (!this.config.broker.nativeBrokerPlugin)
        throw ne.createRedirectUriNotSupportedError();
      e.redirectUri = "";
    }
    const { verifier: l, challenge: u } = await this.cryptoProvider.generatePkceCodes(), d = a || new jg();
    let f = {}, p = null;
    try {
      const y = d.listenForAuthCode(i, o).then((P) => {
        f = P;
      }).catch((P) => {
        p = P;
      }), T = await this.waitForRedirectUri(d), g = {
        ...c,
        correlationId: t,
        scopes: e.scopes || je,
        redirectUri: T,
        responseMode: ro.QUERY,
        codeChallenge: u,
        codeChallengeMethod: _u.S256
      }, m = await this.getAuthCodeUrl(g);
      if (await n(m), await y, p)
        throw p;
      if (f.error)
        throw new Qt(f.error, f.error_description, f.suberror);
      if (!f.code)
        throw ne.createNoAuthCodeInResponseError();
      const E = f.client_info, C = {
        code: f.code,
        codeVerifier: l,
        clientInfo: E || w.EMPTY_STRING,
        ...g
      };
      return await this.acquireTokenByCode(C);
    } finally {
      d.closeServer();
    }
  }
  /**
   * Returns a token retrieved either from the cache or by exchanging the refresh token for a fresh access token. If brokering is enabled the token request will be serviced by the broker.
   * @param request - developer provided SilentFlowRequest
   * @returns
   */
  async acquireTokenSilent(e) {
    const t = e.correlationId || this.cryptoProvider.createNewGuid();
    if (this.logger.trace("acquireTokenSilent called", t), this.nativeBrokerPlugin) {
      const n = {
        ...e,
        clientId: this.config.auth.clientId,
        scopes: e.scopes || je,
        redirectUri: e.redirectUri || "",
        authority: e.authority || this.config.auth.authority,
        correlationId: t,
        extraParameters: {
          ...e.tokenQueryParameters,
          [ds]: this.skus
        },
        accountId: e.account.nativeAccountId,
        forceRefresh: e.forceRefresh || !1
      };
      return this.nativeBrokerPlugin.acquireTokenSilent(n);
    }
    if (e.redirectUri) {
      if (!this.config.broker.nativeBrokerPlugin)
        throw ne.createRedirectUriNotSupportedError();
      e.redirectUri = "";
    }
    return super.acquireTokenSilent(e);
  }
  /**
   * Removes cache artifacts associated with the given account
   * @param request - developer provided SignOutRequest
   * @returns
   */
  async signOut(e) {
    if (this.nativeBrokerPlugin && e.account.nativeAccountId) {
      const t = {
        clientId: this.config.auth.clientId,
        accountId: e.account.nativeAccountId,
        correlationId: e.correlationId || this.cryptoProvider.createNewGuid()
      };
      await this.nativeBrokerPlugin.signOut(t);
    }
    await this.getTokenCache().removeAccount(e.account, e.correlationId);
  }
  /**
   * Returns all cached accounts for this application. If brokering is enabled this request will be serviced by the broker.
   * @returns
   */
  async getAllAccounts() {
    if (this.nativeBrokerPlugin) {
      const e = this.cryptoProvider.createNewGuid();
      return this.nativeBrokerPlugin.getAllAccounts(this.config.auth.clientId, e);
    }
    return this.getTokenCache().getAllAccounts();
  }
  /**
   * Attempts to retrieve the redirectUri from the loopback server. If the loopback server does not start listening for requests within the timeout this will throw.
   * @param loopbackClient - developer provided custom loopback server implementation
   * @returns
   */
  async waitForRedirectUri(e) {
    return new Promise((t, n) => {
      let i = 0;
      const o = setInterval(() => {
        if (Kr.TIMEOUT_MS / Kr.INTERVAL_MS < i) {
          clearInterval(o), n(ne.createLoopbackServerTimeoutError());
          return;
        }
        try {
          const s = e.getRedirectUri();
          clearInterval(o), t(s);
          return;
        } catch (s) {
          if (s instanceof Z && s.errorCode === ie.noLoopbackServerExists.code) {
            i++;
            return;
          }
          clearInterval(o), n(s);
          return;
        }
      }, Kr.INTERVAL_MS);
    });
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class zl extends St {
  constructor(e, t) {
    super(e), this.appTokenProvider = t;
  }
  /**
   * Public API to acquire a token with ClientCredential Flow for Confidential clients
   * @param request - CommonClientCredentialRequest provided by the developer
   */
  async acquireToken(e) {
    if (e.skipCache || e.claims)
      return this.executeTokenRequest(e, this.authority);
    const [t, n] = await this.getCachedAuthenticationResult(e, this.config, this.cryptoUtils, this.authority, this.cacheManager, this.serverTelemetryManager);
    return t ? (n === oe.PROACTIVELY_REFRESHED && (this.logger.info("ClientCredentialClient:getCachedAuthenticationResult - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed."), await this.executeTokenRequest(e, this.authority, !0)), t) : this.executeTokenRequest(e, this.authority);
  }
  /**
   * looks up cache if the tokens are cached already
   */
  async getCachedAuthenticationResult(e, t, n, i, o, s) {
    var f, p;
    const a = t, c = t;
    let l = oe.NOT_APPLICABLE, u;
    a.serializableCache && a.persistencePlugin && (u = new On(a.serializableCache, !1), await a.persistencePlugin.beforeCacheAccess(u));
    const d = this.readAccessTokenFromCache(i, ((f = c.managedIdentityId) == null ? void 0 : f.id) || a.authOptions.clientId, new de(e.scopes || []), o, e.correlationId);
    return a.serializableCache && a.persistencePlugin && u && await a.persistencePlugin.afterCacheAccess(u), d ? Ft(d.expiresOn, ((p = a.systemOptions) == null ? void 0 : p.tokenRenewalOffsetSeconds) || Tc) ? (s == null || s.setCacheOutcome(oe.CACHED_ACCESS_TOKEN_EXPIRED), [null, oe.CACHED_ACCESS_TOKEN_EXPIRED]) : (d.refreshOn && Ft(d.refreshOn.toString(), 0) && (l = oe.PROACTIVELY_REFRESHED, s == null || s.setCacheOutcome(oe.PROACTIVELY_REFRESHED)), [
      await Se.generateAuthenticationResult(n, i, {
        account: null,
        idToken: null,
        accessToken: d,
        refreshToken: null,
        appMetadata: null
      }, !0, e),
      l
    ]) : (s == null || s.setCacheOutcome(oe.NO_CACHED_ACCESS_TOKEN), [null, oe.NO_CACHED_ACCESS_TOKEN]);
  }
  /**
   * Reads access token from the cache
   */
  readAccessTokenFromCache(e, t, n, i, o) {
    const s = {
      homeAccountId: w.EMPTY_STRING,
      environment: e.canonicalAuthorityUrlComponents.HostNameAndPort,
      credentialType: ee.ACCESS_TOKEN,
      clientId: t,
      realm: e.tenant,
      target: de.createSearchScopes(n.asArray())
    }, a = i.getAccessTokensByFilter(s, o);
    if (a.length < 1)
      return null;
    if (a.length > 1)
      throw N(co);
    return a[0];
  }
  /**
   * Makes a network call to request the token from the service
   * @param request - CommonClientCredentialRequest provided by the developer
   * @param authority - authority object
   */
  async executeTokenRequest(e, t, n) {
    let i, o;
    if (this.appTokenProvider) {
      this.logger.info("Using appTokenProvider extensibility.");
      const c = {
        correlationId: e.correlationId,
        tenantId: this.config.authOptions.authority.tenant,
        scopes: e.scopes,
        claims: e.claims
      };
      o = te();
      const l = await this.appTokenProvider(c);
      i = {
        access_token: l.accessToken,
        expires_in: l.expiresInSeconds,
        refresh_in: l.refreshInSeconds,
        token_type: Q.BEARER
      };
    } else {
      const c = this.createTokenQueryParameters(e), l = K.appendQueryString(t.tokenEndpoint, c), u = await this.createTokenRequestBody(e), d = this.createTokenRequestHeaders(), f = {
        clientId: this.config.authOptions.clientId,
        authority: e.authority,
        scopes: e.scopes,
        claims: e.claims,
        authenticationScheme: e.authenticationScheme,
        resourceRequestMethod: e.resourceRequestMethod,
        resourceRequestUri: e.resourceRequestUri,
        shrClaims: e.shrClaims,
        sshKid: e.sshKid
      };
      this.logger.info("Sending token request to endpoint: " + t.tokenEndpoint), o = te();
      const p = await this.executePostToTokenEndpoint(l, u, d, f, e.correlationId);
      i = p.body, i.status = p.status;
    }
    const s = new Se(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
    return s.validateTokenResponse(i, n), await s.handleServerTokenResponse(i, this.authority, o, e, pe.acquireTokenByClientCredential);
  }
  /**
   * generate the request to the server in the acceptable format
   * @param request - CommonClientCredentialRequest provided by the developer
   */
  async createTokenRequestBody(e) {
    const t = /* @__PURE__ */ new Map();
    st(t, this.config.authOptions.clientId), ot(t, e.scopes, !1), jt(t, Vt.CLIENT_CREDENTIALS_GRANT), _t(t, this.config.libraryInfo), It(t, this.config.telemetry.application), Wt(t), this.serverTelemetryManager && Yt(t, this.serverTelemetryManager);
    const n = e.correlationId || this.config.cryptoInterface.createNewGuid();
    Ct(t, n), this.config.clientCredentials.clientSecret && $n(t, this.config.clientCredentials.clientSecret);
    const i = e.clientAssertion || this.config.clientCredentials.clientAssertion;
    return i && (Bn(t, await wt(i.assertion, this.config.authOptions.clientId, e.resourceRequestUri)), Fn(t, i.assertionType)), (!ve.isEmptyObj(e.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && at(t, e.claims, this.config.authOptions.clientCapabilities), Ie(t);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Wg extends St {
  constructor(e) {
    super(e);
  }
  /**
   * Public API to acquire tokens with on behalf of flow
   * @param request - developer provided CommonOnBehalfOfRequest
   */
  async acquireToken(e) {
    if (this.scopeSet = new de(e.scopes || []), this.userAssertionHash = await this.cryptoUtils.hashString(e.oboAssertion), e.skipCache || e.claims)
      return this.executeTokenRequest(e, this.authority, this.userAssertionHash);
    try {
      return await this.getCachedAuthenticationResult(e);
    } catch {
      return await this.executeTokenRequest(e, this.authority, this.userAssertionHash);
    }
  }
  /**
   * look up cache for tokens
   * Find idtoken in the cache
   * Find accessToken based on user assertion and account info in the cache
   * Please note we are not yet supported OBO tokens refreshed with long lived RT. User will have to send a new assertion if the current access token expires
   * This is to prevent security issues when the assertion changes over time, however, longlived RT helps retaining the session
   * @param request - developer provided CommonOnBehalfOfRequest
   */
  async getCachedAuthenticationResult(e) {
    var s, a;
    const t = this.readAccessTokenFromCacheForOBO(this.config.authOptions.clientId, e);
    if (t) {
      if (Ft(t.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds))
        throw (a = this.serverTelemetryManager) == null || a.setCacheOutcome(oe.CACHED_ACCESS_TOKEN_EXPIRED), this.logger.info(`OnbehalfofFlow:getCachedAuthenticationResult - Cached access token is expired or will expire within ${this.config.systemOptions.tokenRenewalOffsetSeconds} seconds.`), N(yt);
    } else throw (s = this.serverTelemetryManager) == null || s.setCacheOutcome(oe.NO_CACHED_ACCESS_TOKEN), this.logger.info("SilentFlowClient:acquireCachedToken - No access token found in cache for the given properties."), N(yt);
    const n = this.readIdTokenFromCacheForOBO(t.homeAccountId, e.correlationId);
    let i, o = null;
    if (n) {
      i = Ln(n.secret, $e.base64Decode);
      const c = i.oid || i.sub, l = {
        homeAccountId: n.homeAccountId,
        environment: n.environment,
        tenantId: n.realm,
        username: w.EMPTY_STRING,
        localAccountId: c || w.EMPTY_STRING
      };
      o = this.cacheManager.getAccount(this.cacheManager.generateAccountKey(l), e.correlationId);
    }
    return this.config.serverTelemetryManager && this.config.serverTelemetryManager.incrementCacheHits(), Se.generateAuthenticationResult(this.cryptoUtils, this.authority, {
      account: o,
      accessToken: t,
      idToken: n,
      refreshToken: null,
      appMetadata: null
    }, !0, e, i);
  }
  /**
   * read idtoken from cache, this is a specific implementation for OBO as the requirements differ from a generic lookup in the cacheManager
   * Certain use cases of OBO flow do not expect an idToken in the cache/or from the service
   * @param atHomeAccountId - account id
   */
  readIdTokenFromCacheForOBO(e, t) {
    const n = {
      homeAccountId: e,
      environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
      credentialType: ee.ID_TOKEN,
      clientId: this.config.authOptions.clientId,
      realm: this.authority.tenant
    }, i = this.cacheManager.getIdTokensByFilter(n, t);
    return Object.values(i).length < 1 ? null : Object.values(i)[0];
  }
  /**
   * Fetches the cached access token based on incoming assertion
   * @param clientId - client id
   * @param request - developer provided CommonOnBehalfOfRequest
   */
  readAccessTokenFromCacheForOBO(e, t) {
    const n = t.authenticationScheme || Q.BEARER, o = {
      credentialType: n.toLowerCase() !== Q.BEARER.toLowerCase() ? ee.ACCESS_TOKEN_WITH_AUTH_SCHEME : ee.ACCESS_TOKEN,
      clientId: e,
      target: de.createSearchScopes(this.scopeSet.asArray()),
      tokenType: n,
      keyId: t.sshKid,
      requestedClaimsHash: t.requestedClaimsHash,
      userAssertionHash: this.userAssertionHash
    }, s = this.cacheManager.getAccessTokensByFilter(o, t.correlationId), a = s.length;
    if (a < 1)
      return null;
    if (a > 1)
      throw N(co);
    return s[0];
  }
  /**
   * Make a network call to the server requesting credentials
   * @param request - developer provided CommonOnBehalfOfRequest
   * @param authority - authority object
   */
  async executeTokenRequest(e, t, n) {
    const i = this.createTokenQueryParameters(e), o = K.appendQueryString(t.tokenEndpoint, i), s = await this.createTokenRequestBody(e), a = this.createTokenRequestHeaders(), c = {
      clientId: this.config.authOptions.clientId,
      authority: e.authority,
      scopes: e.scopes,
      claims: e.claims,
      authenticationScheme: e.authenticationScheme,
      resourceRequestMethod: e.resourceRequestMethod,
      resourceRequestUri: e.resourceRequestUri,
      shrClaims: e.shrClaims,
      sshKid: e.sshKid
    }, l = te(), u = await this.executePostToTokenEndpoint(o, s, a, c, e.correlationId), d = new Se(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
    return d.validateTokenResponse(u.body), await d.handleServerTokenResponse(u.body, this.authority, l, e, pe.acquireTokenByOBO, void 0, n);
  }
  /**
   * generate a server request in accepable format
   * @param request - developer provided CommonOnBehalfOfRequest
   */
  async createTokenRequestBody(e) {
    const t = /* @__PURE__ */ new Map();
    st(t, this.config.authOptions.clientId), ot(t, e.scopes), jt(t, Vt.JWT_BEARER), Kt(t), _t(t, this.config.libraryInfo), It(t, this.config.telemetry.application), Wt(t), this.serverTelemetryManager && Yt(t, this.serverTelemetryManager);
    const n = e.correlationId || this.config.cryptoInterface.createNewGuid();
    Ct(t, n), af(t, qh), sf(t, e.oboAssertion), this.config.clientCredentials.clientSecret && $n(t, this.config.clientCredentials.clientSecret);
    const i = this.config.clientCredentials.clientAssertion;
    return i && (Bn(t, await wt(i.assertion, this.config.authOptions.clientId, e.resourceRequestUri)), Fn(t, i.assertionType)), (e.claims || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && at(t, e.claims, this.config.authOptions.clientCapabilities), Ie(t);
  }
}
class Qg extends Fl {
  /**
   * Constructor for the ConfidentialClientApplication
   *
   * Required attributes in the Configuration object are:
   * - clientID: the application ID of your application. You can obtain one by registering your application with our application registration portal
   * - authority: the authority URL for your application.
   * - client credential: Must set either client secret, certificate, or assertion for confidential clients. You can obtain a client secret from the application registration portal.
   *
   * In Azure AD, authority is a URL indicating of the form https://login.microsoftonline.com/\{Enter_the_Tenant_Info_Here\}.
   * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
   * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
   * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
   * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
   *
   * In Azure B2C, authority is of the form https://\{instance\}/tfp/\{tenant\}/\{policyName\}/
   * Full B2C functionality will be available in this library in future versions.
   *
   * @param Configuration - configuration object for the MSAL ConfidentialClientApplication instance
   */
  constructor(e) {
    var o, s, a;
    super(e);
    const t = !!this.config.auth.clientSecret, n = !!this.config.auth.clientAssertion, i = (!!((o = this.config.auth.clientCertificate) != null && o.thumbprint) || !!((s = this.config.auth.clientCertificate) != null && s.thumbprintSha256)) && !!((a = this.config.auth.clientCertificate) != null && a.privateKey);
    if (!this.appTokenProvider) {
      if (t && n || n && i || t && i)
        throw N(Ui);
      if (this.config.auth.clientSecret) {
        this.clientSecret = this.config.auth.clientSecret;
        return;
      }
      if (this.config.auth.clientAssertion) {
        this.developerProvidedClientAssertion = this.config.auth.clientAssertion;
        return;
      }
      if (i)
        this.clientAssertion = this.config.auth.clientCertificate.thumbprintSha256 ? Tt.fromCertificateWithSha256Thumbprint(this.config.auth.clientCertificate.thumbprintSha256, this.config.auth.clientCertificate.privateKey, this.config.auth.clientCertificate.x5c) : Tt.fromCertificate(
          // guaranteed to be a string, due to prior error checking in this function
          this.config.auth.clientCertificate.thumbprint,
          this.config.auth.clientCertificate.privateKey,
          this.config.auth.clientCertificate.x5c
        );
      else
        throw N(Ui);
      this.appTokenProvider = void 0;
    }
  }
  /**
   * This extensibility point only works for the client_credential flow, i.e. acquireTokenByClientCredential and
   * is meant for Azure SDK to enhance Managed Identity support.
   *
   * @param IAppTokenProvider  - Extensibility interface, which allows the app developer to return a token from a custom source.
   */
  SetAppTokenProvider(e) {
    this.appTokenProvider = e;
  }
  /**
   * Acquires tokens from the authority for the application (not for an end user).
   */
  async acquireTokenByClientCredential(e) {
    this.logger.info("acquireTokenByClientCredential called", e.correlationId);
    let t;
    e.clientAssertion && (t = {
      assertion: await wt(
        e.clientAssertion,
        this.config.auth.clientId
        // tokenEndpoint will be undefined. resourceRequestUri is omitted in ClientCredentialRequest
      ),
      assertionType: lt.JWT_BEARER_ASSERTION_TYPE
    });
    const n = await this.initializeBaseRequest(e), i = {
      ...n,
      scopes: n.scopes.filter((f) => !je.includes(f))
    }, o = {
      ...e,
      ...i,
      clientAssertion: t
    }, a = new K(o.authority).getUrlComponents().PathSegments[0];
    if (Object.values(Ke).includes(a))
      throw N(Bc);
    const c = process.env[Yf];
    let l;
    o.azureRegion !== "DisableMsalForceRegion" && (!o.azureRegion && c ? l = c : l = o.azureRegion);
    const u = {
      azureRegion: l,
      environmentRegion: process.env[Kf]
    }, d = this.initializeServerTelemetryManager(pe.acquireTokenByClientCredential, o.correlationId, o.skipCache);
    try {
      const f = await this.createAuthority(o.authority, o.correlationId, u, e.azureCloudOptions), p = await this.buildOauthClientConfiguration(f, o.correlationId, "", d), h = new zl(p, this.appTokenProvider);
      return this.logger.verbose("Client credential client created", o.correlationId), await h.acquireToken(o);
    } catch (f) {
      throw f instanceof Z && f.setCorrelationId(o.correlationId), d.cacheFailedRequest(f), f;
    }
  }
  /**
   * Acquires tokens from the authority for the application.
   *
   * Used in scenarios where the current app is a middle-tier service which was called with a token
   * representing an end user. The current app can use the token (oboAssertion) to request another
   * token to access downstream web API, on behalf of that user.
   *
   * The current middle-tier app has no user interaction to obtain consent.
   * See how to gain consent upfront for your middle-tier app from this article.
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow#gaining-consent-for-the-middle-tier-application
   */
  async acquireTokenOnBehalfOf(e) {
    this.logger.info("acquireTokenOnBehalfOf called", e.correlationId);
    const t = {
      ...e,
      ...await this.initializeBaseRequest(e)
    };
    try {
      const n = await this.createAuthority(t.authority, t.correlationId, void 0, e.azureCloudOptions), i = await this.buildOauthClientConfiguration(n, t.correlationId, "", void 0), o = new Wg(i);
      return this.logger.verbose("On behalf of client created", t.correlationId), await o.acquireToken(t);
    } catch (n) {
      throw n instanceof Z && n.setCorrelationId(t.correlationId), n;
    }
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
function Jg(r) {
  if (typeof r != "string")
    return !1;
  const e = new Date(r);
  return !isNaN(e.getTime()) && e.toISOString() === r;
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Zg {
  constructor(e, t, n) {
    this.httpClientNoRetries = e, this.retryPolicy = t, this.logger = n;
  }
  async sendNetworkRequestAsyncHelper(e, t, n) {
    return e === le.GET ? this.httpClientNoRetries.sendGetRequestAsync(t, n) : this.httpClientNoRetries.sendPostRequestAsync(t, n);
  }
  async sendNetworkRequestAsync(e, t, n) {
    let i = await this.sendNetworkRequestAsyncHelper(e, t, n);
    "isNewRequest" in this.retryPolicy && (this.retryPolicy.isNewRequest = !0);
    let o = 0;
    for (; await this.retryPolicy.pauseForRetry(i.status, o, this.logger, i.headers[ae.RETRY_AFTER]); )
      i = await this.sendNetworkRequestAsyncHelper(e, t, n), o++;
    return i;
  }
  async sendGetRequestAsync(e, t) {
    return this.sendNetworkRequestAsync(le.GET, e, t);
  }
  async sendPostRequestAsync(e, t) {
    return this.sendNetworkRequestAsync(le.POST, e, t);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const Pt = {
  MANAGED_IDENTITY_CLIENT_ID_2017: "clientid",
  MANAGED_IDENTITY_CLIENT_ID: "client_id",
  MANAGED_IDENTITY_OBJECT_ID: "object_id",
  MANAGED_IDENTITY_RESOURCE_ID_IMDS: "msi_res_id",
  MANAGED_IDENTITY_RESOURCE_ID_NON_IMDS: "mi_res_id"
};
class Rt {
  /**
   * Creates an instance of BaseManagedIdentitySource.
   *
   * @param logger - Logger instance for diagnostic information
   * @param nodeStorage - Storage interface for caching tokens
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic provider for token operations
   * @param disableInternalRetries - Whether to disable automatic retry logic
   */
  constructor(e, t, n, i, o) {
    this.logger = e, this.nodeStorage = t, this.networkClient = n, this.cryptoProvider = i, this.disableInternalRetries = o;
  }
  /**
   * Processes the network response and converts it to a standardized server token response.
   * This async version allows for source-specific response processing logic while maintaining
   * backward compatibility with the synchronous version.
   *
   * @param response - The network response containing the managed identity token
   * @param _networkClient - Network client used for the request (unused in base implementation)
   * @param _networkRequest - The original network request parameters (unused in base implementation)
   * @param _networkRequestOptions - The network request options (unused in base implementation)
   *
   * @returns Promise resolving to a standardized server authorization token response
   */
  async getServerTokenResponseAsync(e, t, n, i) {
    return this.getServerTokenResponse(e);
  }
  /**
   * Converts a managed identity token response to a standardized server authorization token response.
   * Handles time format conversion, expiration calculation, and error mapping to ensure
   * compatibility with the MSAL response handling pipeline.
   *
   * @param response - The network response containing the managed identity token
   *
   * @returns Standardized server authorization token response with normalized fields
   */
  getServerTokenResponse(e) {
    var o, s;
    let t, n;
    return e.body.expires_on && (Jg(e.body.expires_on) && (e.body.expires_on = new Date(e.body.expires_on).getTime() / 1e3), n = e.body.expires_on - te(), n > 2 * 3600 && (t = n / 2)), {
      status: e.status,
      // success
      access_token: e.body.access_token,
      expires_in: n,
      scope: e.body.resource,
      token_type: e.body.token_type,
      refresh_in: t,
      // error
      correlation_id: e.body.correlation_id || e.body.correlationId,
      error: typeof e.body.error == "string" ? e.body.error : (o = e.body.error) == null ? void 0 : o.code,
      error_description: e.body.message || (typeof e.body.error == "string" ? e.body.error_description : (s = e.body.error) == null ? void 0 : s.message),
      error_codes: e.body.error_codes,
      timestamp: e.body.timestamp,
      trace_id: e.body.trace_id
    };
  }
  /**
   * Acquires an access token using the managed identity endpoint for the specified resource.
   * This is the primary method for token acquisition, handling the complete flow from
   * request creation through response processing and token caching.
   *
   * @param managedIdentityRequest - The managed identity request containing resource and optional parameters
   * @param managedIdentityId - The managed identity configuration (system or user-assigned)
   * @param fakeAuthority - Authority instance used for token caching (managed identity uses a placeholder authority)
   * @param refreshAccessToken - Whether this is a token refresh operation
   *
   * @returns Promise resolving to an authentication result containing the access token and metadata
   *
   * @throws {AuthError} When network requests fail or token validation fails
   * @throws {ClientAuthError} When network errors occur during the request
   */
  async acquireTokenWithManagedIdentity(e, t, n, i) {
    var p;
    const o = this.createRequest(e.resource, t);
    if (e.revokedTokenSha256Hash && (this.logger.info(`[Managed Identity] The following claims are present in the request: ${e.claims}`), o.queryParameters[we.SHA256_TOKEN_TO_REFRESH] = e.revokedTokenSha256Hash), (p = e.clientCapabilities) != null && p.length) {
      const h = e.clientCapabilities.toString();
      this.logger.info(`[Managed Identity] The following client capabilities are present in the request: ${h}`), o.queryParameters[we.XMS_CC] = h;
    }
    const s = o.headers;
    s[ae.CONTENT_TYPE] = w.URL_FORM_CONTENT_TYPE;
    const a = { headers: s };
    Object.keys(o.bodyParameters).length && (a.body = o.computeParametersBodyString());
    const c = this.disableInternalRetries ? this.networkClient : new Zg(this.networkClient, o.retryPolicy, this.logger), l = te();
    let u;
    try {
      o.httpMethod === le.POST ? u = await c.sendPostRequestAsync(o.computeUri(), a) : u = await c.sendGetRequestAsync(o.computeUri(), a);
    } catch (h) {
      throw h instanceof Z ? h : N(_r);
    }
    const d = new Se(t.id, this.nodeStorage, this.cryptoProvider, this.logger, null, null), f = await this.getServerTokenResponseAsync(u, c, o, a);
    return d.validateTokenResponse(f, i), d.handleServerTokenResponse(f, n, l, e, pe.acquireTokenWithManagedIdentity);
  }
  /**
   * Determines the appropriate query parameter name for user-assigned managed identity
   * based on the identity type, API version, and endpoint characteristics.
   * Different Azure services and API versions use different parameter names for the same identity types.
   *
   * @param managedIdentityIdType - The type of user-assigned managed identity (client ID, object ID, or resource ID)
   * @param isImds - Whether the request is being made to the IMDS (Instance Metadata Service) endpoint
   * @param usesApi2017 - Whether the endpoint uses the 2017-09-01 API version (affects client ID parameter name)
   *
   * @returns The correct query parameter name for the specified identity type and endpoint
   *
   * @throws {ManagedIdentityError} When an invalid managed identity ID type is provided
   */
  getManagedIdentityUserAssignedIdQueryParameterKey(e, t, n) {
    switch (e) {
      case me.USER_ASSIGNED_CLIENT_ID:
        return this.logger.info(`[Managed Identity] [API version ${n ? "2017+" : "2019+"}] Adding user assigned client id to the request.`), n ? Pt.MANAGED_IDENTITY_CLIENT_ID_2017 : Pt.MANAGED_IDENTITY_CLIENT_ID;
      case me.USER_ASSIGNED_RESOURCE_ID:
        return this.logger.info("[Managed Identity] Adding user assigned resource id to the request."), t ? Pt.MANAGED_IDENTITY_RESOURCE_ID_IMDS : Pt.MANAGED_IDENTITY_RESOURCE_ID_NON_IMDS;
      case me.USER_ASSIGNED_OBJECT_ID:
        return this.logger.info("[Managed Identity] Adding user assigned object id to the request."), Pt.MANAGED_IDENTITY_OBJECT_ID;
      default:
        throw ce(Pn);
    }
  }
}
Rt.getValidatedEnvVariableUrlString = (r, e, t, n) => {
  try {
    return new K(e).urlString;
  } catch {
    throw n.info(`[Managed Identity] ${t} managed identity is unavailable because the '${r}' environment variable is malformed.`), ce(An[r]);
  }
};
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Xg {
  /**
   * Calculates the number of milliseconds to sleep based on the `retry-after` HTTP header.
   *
   * @param retryHeader - The value of the `retry-after` HTTP header. This can be either a number of seconds
   *                      or an HTTP date string.
   * @returns The number of milliseconds to sleep before retrying the request. If the `retry-after` header is not
   *          present or cannot be parsed, returns 0.
   */
  calculateDelay(e, t) {
    if (!e)
      return t;
    let n = Math.round(parseFloat(e) * 1e3);
    return isNaN(n) && (n = new Date(e).valueOf() - (/* @__PURE__ */ new Date()).valueOf()), Math.max(t, n);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const ep = 3, tp = 1e3, np = [
  G.NOT_FOUND,
  G.REQUEST_TIMEOUT,
  G.TOO_MANY_REQUESTS,
  G.SERVER_ERROR,
  G.SERVICE_UNAVAILABLE,
  G.GATEWAY_TIMEOUT
];
class Ho {
  constructor() {
    this.linearRetryStrategy = new Xg();
  }
  /*
   * this is defined here as a static variable despite being defined as a constant outside of the
   * class because it needs to be overridden in the unit tests so that the unit tests run faster
   */
  static get DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS() {
    return tp;
  }
  async pauseForRetry(e, t, n, i) {
    if (np.includes(e) && t < ep) {
      const o = this.linearRetryStrategy.calculateDelay(i, Ho.DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS);
      return n.verbose(`Retrying request in ${o}ms (retry attempt: ${t + 1})`), await new Promise((s) => setTimeout(s, o)), !0;
    }
    return !1;
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class Jt {
  constructor(e, t, n) {
    this.httpMethod = e, this._baseEndpoint = t, this.headers = {}, this.bodyParameters = {}, this.queryParameters = {}, this.retryPolicy = n || new Ho();
  }
  computeUri() {
    const e = /* @__PURE__ */ new Map();
    this.queryParameters && He(e, this.queryParameters);
    const t = Ie(e);
    return K.appendQueryString(this._baseEndpoint, t);
  }
  computeParametersBodyString() {
    const e = /* @__PURE__ */ new Map();
    return this.bodyParameters && He(e, this.bodyParameters), Ie(e);
  }
}
const rp = "2019-08-01";
class xt extends Rt {
  /**
   * Creates a new instance of the AppService managed identity source.
   *
   * @param logger - Logger instance for diagnostic output
   * @param nodeStorage - Node.js storage implementation for caching
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable internal retry logic
   * @param identityEndpoint - The App Service identity endpoint URL
   * @param identityHeader - The secret header value required for authentication
   */
  constructor(e, t, n, i, o, s, a) {
    super(e, t, n, i, o), this.identityEndpoint = s, this.identityHeader = a;
  }
  /**
   * Retrieves the required environment variables for App Service managed identity.
   *
   * App Service managed identity requires two environment variables:
   * - IDENTITY_ENDPOINT: The URL of the local metadata service
   * - IDENTITY_HEADER: A secret header value for authentication
   *
   * @returns An array containing [identityEndpoint, identityHeader] values from environment variables.
   *          Either value may be undefined if the environment variable is not set.
   */
  static getEnvironmentVariables() {
    const e = process.env[B.IDENTITY_ENDPOINT], t = process.env[B.IDENTITY_HEADER];
    return [e, t];
  }
  /**
   * Attempts to create an AppService managed identity source if the environment supports it.
   *
   * This method checks for the presence of required environment variables and validates
   * the identity endpoint URL. If the environment is not suitable for App Service managed
   * identity (missing environment variables or invalid endpoint), it returns null.
   *
   * @param logger - Logger instance for diagnostic output
   * @param nodeStorage - Node.js storage implementation for caching
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable internal retry logic
   *
   * @returns A new AppService instance if the environment is suitable, null otherwise
   */
  static tryCreate(e, t, n, i, o) {
    const [s, a] = xt.getEnvironmentVariables();
    if (!s || !a)
      return e.info(`[Managed Identity] ${z.APP_SERVICE} managed identity is unavailable because one or both of the '${B.IDENTITY_HEADER}' and '${B.IDENTITY_ENDPOINT}' environment variables are not defined.`), null;
    const c = xt.getValidatedEnvVariableUrlString(B.IDENTITY_ENDPOINT, s, z.APP_SERVICE, e);
    return e.info(`[Managed Identity] Environment variables validation passed for ${z.APP_SERVICE} managed identity. Endpoint URI: ${c}. Creating ${z.APP_SERVICE} managed identity.`), new xt(e, t, n, i, o, s, a);
  }
  /**
   * Creates a managed identity token request for the App Service environment.
   *
   * This method constructs an HTTP GET request to the App Service identity endpoint
   * with the required headers, query parameters, and managed identity configuration.
   * The request includes the secret header for authentication and appropriate API version.
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   * @param managedIdentityId - The managed identity configuration specifying whether to use system-assigned or user-assigned identity
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(e, t) {
    const n = new Jt(le.GET, this.identityEndpoint);
    return n.headers[ct.APP_SERVICE_SECRET_HEADER_NAME] = this.identityHeader, n.queryParameters[we.API_VERSION] = rp, n.queryParameters[we.RESOURCE] = e, t.idType !== me.SYSTEM_ASSIGNED && (n.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(t.idType)] = t.id), n;
  }
}
const ip = "2019-11-01", fa = "http://127.0.0.1:40342/metadata/identity/oauth2/token", ga = "N/A: himds executable exists", pa = {
  win32: `${process.env.ProgramData}\\AzureConnectedMachineAgent\\Tokens\\`,
  linux: "/var/opt/azcmagent/tokens/"
}, op = {
  win32: `${process.env.ProgramFiles}\\AzureConnectedMachineAgent\\himds.exe`,
  linux: "/opt/azcmagent/bin/himds"
};
class mt extends Rt {
  /**
   * Creates a new instance of the AzureArc managed identity source.
   *
   * @param logger - Logger instance for capturing telemetry and diagnostic information
   * @param nodeStorage - Storage implementation for caching tokens and metadata
   * @param networkClient - Network client for making HTTP requests to the identity endpoint
   * @param cryptoProvider - Cryptographic operations provider for token validation and encryption
   * @param disableInternalRetries - Flag to disable automatic retry logic for failed requests
   * @param identityEndpoint - The Azure Arc identity endpoint URL for token requests
   */
  constructor(e, t, n, i, o, s) {
    super(e, t, n, i, o), this.identityEndpoint = s;
  }
  /**
   * Retrieves and validates Azure Arc environment variables for managed identity configuration.
   *
   * This method checks for IDENTITY_ENDPOINT and IMDS_ENDPOINT environment variables.
   * If either is missing, it attempts to detect the Azure Arc environment by checking for
   * the HIMDS executable at platform-specific paths. On successful detection, it returns
   * the default identity endpoint and a helper string indicating file-based detection.
   *
   * @returns An array containing [identityEndpoint, imdsEndpoint] where both values are
   *          strings if Azure Arc is available, or undefined if not available.
   */
  static getEnvironmentVariables() {
    let e = process.env[B.IDENTITY_ENDPOINT], t = process.env[B.IMDS_ENDPOINT];
    if (!e || !t) {
      const n = op[process.platform];
      try {
        qd(n, qo.F_OK | qo.R_OK), e = fa, t = ga;
      } catch {
      }
    }
    return [e, t];
  }
  /**
   * Attempts to create an AzureArc managed identity source instance.
   *
   * Validates the Azure Arc environment by checking environment variables
   * and performing file-based detection. It ensures that only system-assigned managed identities
   * are supported for Azure Arc scenarios. The method performs comprehensive validation of
   * endpoint URLs and logs detailed information about the detection process.
   *
   * @param logger - Logger instance for capturing creation and validation steps
   * @param nodeStorage - Storage implementation for the managed identity source
   * @param networkClient - Network client for HTTP communication
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic retry mechanisms
   * @param managedIdentityId - The managed identity configuration, must be system-assigned
   *
   * @returns AzureArc instance if the environment supports Azure Arc managed identity, null otherwise
   *
   * @throws {ManagedIdentityError} When a user-assigned managed identity is specified (not supported for Azure Arc)
   */
  static tryCreate(e, t, n, i, o, s) {
    const [a, c] = mt.getEnvironmentVariables();
    if (!a || !c)
      return e.info(`[Managed Identity] ${z.AZURE_ARC} managed identity is unavailable through environment variables because one or both of '${B.IDENTITY_ENDPOINT}' and '${B.IMDS_ENDPOINT}' are not defined. ${z.AZURE_ARC} managed identity is also unavailable through file detection.`), null;
    if (c === ga)
      e.info(`[Managed Identity] ${z.AZURE_ARC} managed identity is available through file detection. Defaulting to known ${z.AZURE_ARC} endpoint: ${fa}. Creating ${z.AZURE_ARC} managed identity.`);
    else {
      const l = mt.getValidatedEnvVariableUrlString(B.IDENTITY_ENDPOINT, a, z.AZURE_ARC, e);
      l.endsWith("/") && l.slice(0, -1), mt.getValidatedEnvVariableUrlString(B.IMDS_ENDPOINT, c, z.AZURE_ARC, e), e.info(`[Managed Identity] Environment variables validation passed for ${z.AZURE_ARC} managed identity. Endpoint URI: ${l}. Creating ${z.AZURE_ARC} managed identity.`);
    }
    if (s.idType !== me.SYSTEM_ASSIGNED)
      throw ce(Il);
    return new mt(e, t, n, i, o, a);
  }
  /**
   * Creates a properly formatted HTTP request for acquiring tokens from the Azure Arc identity endpoint.
   *
   * This method constructs a GET request to the Azure Arc HIMDS endpoint with the required metadata header
   * and query parameters. The endpoint URL is normalized to use 127.0.0.1 instead of localhost for
   * consistency. Additional body parameters are calculated by the base class during token acquisition.
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(e) {
    const t = new Jt(le.GET, this.identityEndpoint.replace("localhost", "127.0.0.1"));
    return t.headers[ct.METADATA_HEADER_NAME] = "true", t.queryParameters[we.API_VERSION] = ip, t.queryParameters[we.RESOURCE] = e, t;
  }
  /**
   * Processes the server response and handles Azure Arc-specific authentication challenges.
   *
   * This method implements the Azure Arc authentication flow which may require reading a secret file
   * for authorization. When the initial request returns HTTP 401 Unauthorized, it extracts the file
   * path from the WWW-Authenticate header, validates the file location and size, reads the secret,
   * and retries the request with Basic authentication. The method includes comprehensive security
   * validations to prevent path traversal and ensure file integrity.
   *
   * @param originalResponse - The initial HTTP response from the identity endpoint
   * @param networkClient - Network client for making the retry request if needed
   * @param networkRequest - The original request parameters (modified with auth header for retry)
   * @param networkRequestOptions - Additional options for network requests
   *
   * @returns A promise that resolves to the server token response with access token and metadata
   *
   * @throws {ManagedIdentityError} When:
   *   - WWW-Authenticate header is missing or has unsupported format
   *   - Platform is not supported (not Windows or Linux)
   *   - Secret file has invalid extension (not .key)
   *   - Secret file path doesn't match expected platform path
   *   - Secret file cannot be read or is too large (>4096 bytes)
   * @throws {ClientAuthError} When network errors occur during retry request
   */
  async getServerTokenResponseAsync(e, t, n, i) {
    let o;
    if (e.status === G.UNAUTHORIZED) {
      const s = e.headers["www-authenticate"];
      if (!s)
        throw ce(Rl);
      if (!s.includes("Basic realm="))
        throw ce(bl);
      const a = s.split("Basic realm=")[1];
      if (!pa.hasOwnProperty(process.platform))
        throw ce(_l);
      const c = pa[process.platform], l = jd.basename(a);
      if (!l.endsWith(".key"))
        throw ce(El);
      if (c + l !== a)
        throw ce(Al);
      let u;
      try {
        u = await Gd(a).size;
      } catch {
        throw ce(Fi);
      }
      if (u > Jf)
        throw ce(Cl);
      let d;
      try {
        d = Vd(a, Ye.UTF8);
      } catch {
        throw ce(Fi);
      }
      const f = `Basic ${d}`;
      this.logger.info("[Managed Identity] Adding authorization header to the request."), n.headers[ct.AUTHORIZATION_HEADER_NAME] = f;
      try {
        o = await t.sendGetRequestAsync(n.computeUri(), i);
      } catch (p) {
        throw p instanceof Z ? p : N(_r);
      }
    }
    return this.getServerTokenResponse(o || e);
  }
}
class Lt extends Rt {
  /**
   * Creates a new CloudShell managed identity source instance.
   *
   * @param logger - Logger instance for diagnostic logging
   * @param nodeStorage - Node.js storage implementation for caching
   * @param networkClient - HTTP client for making requests to the managed identity endpoint
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic retry logic for failed requests
   * @param msiEndpoint - The MSI endpoint URL obtained from environment variables
   */
  constructor(e, t, n, i, o, s) {
    super(e, t, n, i, o), this.msiEndpoint = s;
  }
  /**
   * Retrieves the required environment variables for Cloud Shell managed identity.
   *
   * Cloud Shell requires the MSI_ENDPOINT environment variable to be set, which
   * contains the URL of the managed identity service endpoint.
   *
   * @returns An array containing the MSI_ENDPOINT environment variable value (or undefined if not set)
   */
  static getEnvironmentVariables() {
    return [process.env[B.MSI_ENDPOINT]];
  }
  /**
   * Attempts to create a CloudShell managed identity source instance.
   *
   * This method validates that the required environment variables are present and
   * creates a CloudShell instance if the environment is properly configured.
   * Cloud Shell only supports system-assigned managed identities.
   *
   * @param logger - Logger instance for diagnostic logging
   * @param nodeStorage - Node.js storage implementation for caching
   * @param networkClient - HTTP client for making requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic retry logic
   * @param managedIdentityId - The managed identity configuration (must be system-assigned)
   *
   * @returns A CloudShell instance if the environment is valid, null otherwise
   *
   * @throws {ManagedIdentityError} When a user-assigned managed identity is requested,
   *         as Cloud Shell only supports system-assigned identities
   */
  static tryCreate(e, t, n, i, o, s) {
    const [a] = Lt.getEnvironmentVariables();
    if (!a)
      return e.info(`[Managed Identity] ${z.CLOUD_SHELL} managed identity is unavailable because the '${B.MSI_ENDPOINT} environment variable is not defined.`), null;
    const c = Lt.getValidatedEnvVariableUrlString(B.MSI_ENDPOINT, a, z.CLOUD_SHELL, e);
    if (e.info(`[Managed Identity] Environment variable validation passed for ${z.CLOUD_SHELL} managed identity. Endpoint URI: ${c}. Creating ${z.CLOUD_SHELL} managed identity.`), s.idType !== me.SYSTEM_ASSIGNED)
      throw ce(Sl);
    return new Lt(e, t, n, i, o, a);
  }
  /**
   * Creates an HTTP request to acquire an access token from the Cloud Shell managed identity endpoint.
   *
   * This method constructs a POST request to the MSI endpoint with the required headers and
   * body parameters for Cloud Shell authentication. The request includes the target resource
   * for which the access token is being requested.
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(e) {
    const t = new Jt(le.POST, this.msiEndpoint);
    return t.headers[ct.METADATA_HEADER_NAME] = "true", t.bodyParameters[we.RESOURCE] = e, t;
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class sp {
  constructor(e, t, n) {
    this.minExponentialBackoff = e, this.maxExponentialBackoff = t, this.exponentialDeltaBackoff = n;
  }
  /**
   * Calculates the exponential delay based on the current retry attempt.
   *
   * @param {number} currentRetry - The current retry attempt number.
   * @returns {number} - The calculated exponential delay in milliseconds.
   *
   * The delay is calculated using the formula:
   * - If `currentRetry` is 0, it returns the minimum backoff time.
   * - Otherwise, it calculates the delay as the minimum of:
   *   - `(2^(currentRetry - 1)) * deltaBackoff`
   *   - `maxBackoff`
   *
   * This ensures that the delay increases exponentially with each retry attempt,
   * but does not exceed the maximum backoff time.
   */
  calculateDelay(e) {
    return e === 0 ? this.minExponentialBackoff : Math.min(Math.pow(2, e - 1) * this.exponentialDeltaBackoff, this.maxExponentialBackoff);
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const ap = [
  G.NOT_FOUND,
  G.REQUEST_TIMEOUT,
  G.GONE,
  G.TOO_MANY_REQUESTS
], cp = 3, lp = 7, dp = 1e3, up = 4e3, hp = 2e3, fp = 10 * 1e3;
class Nt {
  constructor() {
    this.exponentialRetryStrategy = new sp(Nt.MIN_EXPONENTIAL_BACKOFF_MS, Nt.MAX_EXPONENTIAL_BACKOFF_MS, Nt.EXPONENTIAL_DELTA_BACKOFF_MS);
  }
  /*
   * these are defined here as static variables despite being defined as constants outside of the
   * class because they need to be overridden in the unit tests so that the unit tests run faster
   */
  static get MIN_EXPONENTIAL_BACKOFF_MS() {
    return dp;
  }
  static get MAX_EXPONENTIAL_BACKOFF_MS() {
    return up;
  }
  static get EXPONENTIAL_DELTA_BACKOFF_MS() {
    return hp;
  }
  static get HTTP_STATUS_GONE_RETRY_AFTER_MS() {
    return fp;
  }
  set isNewRequest(e) {
    this._isNewRequest = e;
  }
  /**
   * Pauses execution for a calculated delay before retrying a request.
   *
   * @param httpStatusCode - The HTTP status code of the response.
   * @param currentRetry - The current retry attempt number.
   * @param retryAfterHeader - The value of the "retry-after" header from the response.
   * @returns A promise that resolves to a boolean indicating whether a retry should be attempted.
   */
  async pauseForRetry(e, t, n) {
    if (this._isNewRequest && (this._isNewRequest = !1, this.maxRetries = e === G.GONE ? lp : cp), (ap.includes(e) || e >= G.SERVER_ERROR_RANGE_START && e <= G.SERVER_ERROR_RANGE_END && t < this.maxRetries) && t < this.maxRetries) {
      const i = e === G.GONE ? Nt.HTTP_STATUS_GONE_RETRY_AFTER_MS : this.exponentialRetryStrategy.calculateDelay(t);
      return n.verbose(`Retrying request in ${i}ms (retry attempt: ${t + 1})`), await new Promise((o) => setTimeout(o, i)), !0;
    }
    return !1;
  }
}
const ql = "/metadata/identity/oauth2/token", gp = `http://169.254.169.254${ql}`, pp = "2018-02-01";
class pr extends Rt {
  /**
   * Constructs an Imds instance with the specified configuration.
   *
   * @param logger - Logger instance for recording debug information and errors
   * @param nodeStorage - NodeStorage instance used for token caching operations
   * @param networkClient - Network client implementation for making HTTP requests to IMDS
   * @param cryptoProvider - CryptoProvider for generating correlation IDs and other cryptographic operations
   * @param disableInternalRetries - When true, disables the built-in retry logic for IMDS requests
   * @param identityEndpoint - The complete IMDS endpoint URL including the token path
   */
  constructor(e, t, n, i, o, s) {
    super(e, t, n, i, o), this.identityEndpoint = s;
  }
  /**
   * Creates an Imds instance with the appropriate endpoint configuration.
   *
   * This method checks for the presence of the AZURE_POD_IDENTITY_AUTHORITY_HOST environment
   * variable, which is used in Azure Kubernetes Service (AKS) environments with Azure AD
   * Pod Identity. If found, it uses that endpoint; otherwise, it falls back to the standard
   * IMDS endpoint (169.254.169.254).
   *
   * @param logger - Logger instance for recording endpoint discovery and validation
   * @param nodeStorage - NodeStorage instance for token caching
   * @param networkClient - Network client for HTTP requests
   * @param cryptoProvider - CryptoProvider for cryptographic operations
   * @param disableInternalRetries - Whether to disable built-in retry logic
   *
   * @returns A configured Imds instance ready to make token requests
   */
  static tryCreate(e, t, n, i, o) {
    let s;
    return process.env[B.AZURE_POD_IDENTITY_AUTHORITY_HOST] ? (e.info(`[Managed Identity] Environment variable ${B.AZURE_POD_IDENTITY_AUTHORITY_HOST} for ${z.IMDS} returned endpoint: ${process.env[B.AZURE_POD_IDENTITY_AUTHORITY_HOST]}`), s = pr.getValidatedEnvVariableUrlString(B.AZURE_POD_IDENTITY_AUTHORITY_HOST, `${process.env[B.AZURE_POD_IDENTITY_AUTHORITY_HOST]}${ql}`, z.IMDS, e)) : (e.info(`[Managed Identity] Unable to find ${B.AZURE_POD_IDENTITY_AUTHORITY_HOST} environment variable for ${z.IMDS}, using the default endpoint.`), s = gp), new pr(e, t, n, i, o, s);
  }
  /**
   * Creates a properly configured HTTP request for acquiring an access token from IMDS.
   *
   * This method builds a complete request object with all necessary headers, query parameters,
   * and retry policies required by the Azure Instance Metadata Service.
   *
   * Key request components:
   * - HTTP GET method to the IMDS token endpoint
   * - Metadata header set to "true" (required by IMDS)
   * - API version parameter (currently "2018-02-01")
   * - Resource parameter specifying the target audience
   * - Identity-specific parameters for user-assigned managed identities
   * - IMDS-specific retry policy
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   * @param managedIdentityId - The managed identity configuration specifying whether to use system-assigned or user-assigned identity
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(e, t) {
    const n = new Jt(le.GET, this.identityEndpoint);
    return n.headers[ct.METADATA_HEADER_NAME] = "true", n.queryParameters[we.API_VERSION] = pp, n.queryParameters[we.RESOURCE] = e, t.idType !== me.SYSTEM_ASSIGNED && (n.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(
      t.idType,
      !0
      // indicates source is IMDS
    )] = t.id), n.retryPolicy = new Nt(), n;
  }
}
const mp = "2019-07-01-preview";
class Ht extends Rt {
  /**
   * Constructs a new ServiceFabric managed identity source for acquiring tokens from Azure Service Fabric clusters.
   *
   * Service Fabric managed identity allows applications running in Service Fabric clusters to authenticate
   * without storing credentials in code. This source handles token acquisition using the Service Fabric
   * Managed Identity Token Service (MITS).
   *
   * @param logger - Logger instance for logging authentication events and debugging information
   * @param nodeStorage - NodeStorage instance for caching tokens and other authentication artifacts
   * @param networkClient - Network client for making HTTP requests to the Service Fabric identity endpoint
   * @param cryptoProvider - Crypto provider for cryptographic operations like token validation
   * @param disableInternalRetries - Whether to disable internal retry logic for failed requests
   * @param identityEndpoint - The Service Fabric managed identity endpoint URL
   * @param identityHeader - The Service Fabric managed identity secret header value
   */
  constructor(e, t, n, i, o, s, a) {
    super(e, t, n, i, o), this.identityEndpoint = s, this.identityHeader = a;
  }
  /**
   * Retrieves the environment variables required for Service Fabric managed identity authentication.
   *
   * Service Fabric managed identity requires three specific environment variables to be set by the
   * Service Fabric runtime:
   * - IDENTITY_ENDPOINT: The endpoint URL for the Managed Identity Token Service (MITS)
   * - IDENTITY_HEADER: A secret value used for authentication with the MITS
   * - IDENTITY_SERVER_THUMBPRINT: The thumbprint of the MITS server certificate for secure communication
   *
   * @returns An array containing the identity endpoint, identity header, and identity server thumbprint values.
   *          Elements will be undefined if the corresponding environment variables are not set.
   */
  static getEnvironmentVariables() {
    const e = process.env[B.IDENTITY_ENDPOINT], t = process.env[B.IDENTITY_HEADER], n = process.env[B.IDENTITY_SERVER_THUMBPRINT];
    return [e, t, n];
  }
  /**
   * Attempts to create a ServiceFabric managed identity source if the runtime environment supports it.
   *
   * Checks for the presence of all required Service Fabric environment variables
   * and validates the endpoint URL format. It will only create a ServiceFabric instance if the application
   * is running in a properly configured Service Fabric cluster with managed identity enabled.
   *
   * Note: User-assigned managed identities must be configured at the cluster level, not at runtime.
   * This method will log a warning if a user-assigned identity is requested.
   *
   * @param logger - Logger instance for logging creation events and validation results
   * @param nodeStorage - NodeStorage instance for caching tokens and authentication artifacts
   * @param networkClient - Network client for making HTTP requests to the identity endpoint
   * @param cryptoProvider - Crypto provider for cryptographic operations
   * @param disableInternalRetries - Whether to disable internal retry logic for failed requests
   * @param managedIdentityId - Managed identity identifier specifying system-assigned or user-assigned identity
   *
   * @returns A ServiceFabric instance if all environment variables are valid and present, otherwise null
   */
  static tryCreate(e, t, n, i, o, s) {
    const [a, c, l] = Ht.getEnvironmentVariables();
    if (!a || !c || !l)
      return e.info(`[Managed Identity] ${z.SERVICE_FABRIC} managed identity is unavailable because one or all of the '${B.IDENTITY_HEADER}', '${B.IDENTITY_ENDPOINT}' or '${B.IDENTITY_SERVER_THUMBPRINT}' environment variables are not defined.`), null;
    const u = Ht.getValidatedEnvVariableUrlString(B.IDENTITY_ENDPOINT, a, z.SERVICE_FABRIC, e);
    return e.info(`[Managed Identity] Environment variables validation passed for ${z.SERVICE_FABRIC} managed identity. Endpoint URI: ${u}. Creating ${z.SERVICE_FABRIC} managed identity.`), s.idType !== me.SYSTEM_ASSIGNED && e.warning(`[Managed Identity] ${z.SERVICE_FABRIC} user assigned managed identity is configured in the cluster, not during runtime. See also: https://learn.microsoft.com/en-us/azure/service-fabric/configure-existing-cluster-enable-managed-identity-token-service.`), new Ht(e, t, n, i, o, a, c);
  }
  /**
   * Creates HTTP request parameters for acquiring an access token from the Service Fabric Managed Identity Token Service (MITS).
   *
   * This method constructs a properly formatted HTTP GET request that includes:
   * - The secret header for authentication with MITS
   * - API version parameter for the Service Fabric MSI endpoint
   * - Resource parameter specifying the target Azure service
   * - Optional identity parameters for user-assigned managed identities
   *
   * The request follows the Service Fabric managed identity protocol and uses the 2019-07-01-preview API version.
   * For user-assigned identities, the appropriate query parameter (client_id, object_id, or resource_id) is added
   * based on the identity type.
   *
   * @param resource - The Azure resource URI for which the access token is requested (e.g., "https://vault.azure.net/")
   * @param managedIdentityId - The managed identity configuration specifying system-assigned or user-assigned identity details
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(e, t) {
    const n = new Jt(le.GET, this.identityEndpoint);
    return n.headers[ct.ML_AND_SF_SECRET_HEADER_NAME] = this.identityHeader, n.queryParameters[we.API_VERSION] = mp, n.queryParameters[we.RESOURCE] = e, t.idType !== me.SYSTEM_ASSIGNED && (n.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(t.idType)] = t.id), n;
  }
}
const yp = "2017-09-01", Tp = `Only client id is supported for user-assigned managed identity in ${z.MACHINE_LEARNING}.`;
class $t extends Rt {
  /**
   * Creates a new MachineLearning managed identity source instance.
   *
   * @param logger - Logger instance for diagnostic information
   * @param nodeStorage - Node storage implementation for caching
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic request retries
   * @param msiEndpoint - The MSI endpoint URL from environment variables
   * @param secret - The MSI secret from environment variables
   */
  constructor(e, t, n, i, o, s, a) {
    super(e, t, n, i, o), this.msiEndpoint = s, this.secret = a;
  }
  /**
   * Retrieves the required environment variables for Azure Machine Learning managed identity.
   *
   * This method checks for the presence of MSI_ENDPOINT and MSI_SECRET environment variables
   * that are automatically set by the Azure Machine Learning platform when managed identity
   * is enabled for the compute instance or cluster.
   *
   * @returns An array containing [msiEndpoint, secret] where either value may be undefined
   *          if the corresponding environment variable is not set
   */
  static getEnvironmentVariables() {
    const e = process.env[B.MSI_ENDPOINT], t = process.env[B.MSI_SECRET];
    return [e, t];
  }
  /**
   * Attempts to create a MachineLearning managed identity source.
   *
   * This method validates the Azure Machine Learning environment by checking for the required
   * MSI_ENDPOINT and MSI_SECRET environment variables. If both are present and valid,
   * it creates and returns a MachineLearning instance. If either is missing or invalid,
   * it returns null, indicating that this managed identity source is not available
   * in the current environment.
   *
   * @param logger - Logger instance for diagnostic information
   * @param nodeStorage - Node storage implementation for caching
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic request retries
   *
   * @returns A new MachineLearning instance if the environment is valid, null otherwise
   */
  static tryCreate(e, t, n, i, o) {
    const [s, a] = $t.getEnvironmentVariables();
    if (!s || !a)
      return e.info(`[Managed Identity] ${z.MACHINE_LEARNING} managed identity is unavailable because one or both of the '${B.MSI_ENDPOINT}' and '${B.MSI_SECRET}' environment variables are not defined.`), null;
    const c = $t.getValidatedEnvVariableUrlString(B.MSI_ENDPOINT, s, z.MACHINE_LEARNING, e);
    return e.info(`[Managed Identity] Environment variables validation passed for ${z.MACHINE_LEARNING} managed identity. Endpoint URI: ${c}. Creating ${z.MACHINE_LEARNING} managed identity.`), new $t(e, t, n, i, o, s, a);
  }
  /**
   * Creates a managed identity token request for Azure Machine Learning environments.
   *
   * This method constructs the HTTP request parameters needed to acquire an access token
   * from the Azure Machine Learning managed identity endpoint. It handles both system-assigned
   * and user-assigned managed identities with specific logic for each type:
   *
   * - System-assigned: Uses the DEFAULT_IDENTITY_CLIENT_ID environment variable
   * - User-assigned: Only supports client ID-based identification (not object ID or resource ID)
   *
   * The request uses the 2017-09-01 API version and includes the required secret header
   * for authentication with the MSI endpoint.
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   * @param managedIdentityId - The managed identity configuration specifying whether to use system-assigned or user-assigned identity
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   *
   * @throws Error if an unsupported managed identity ID type is specified (only client ID is supported for user-assigned)
   */
  createRequest(e, t) {
    const n = new Jt(le.GET, this.msiEndpoint);
    if (n.headers[ct.METADATA_HEADER_NAME] = "true", n.headers[ct.ML_AND_SF_SECRET_HEADER_NAME] = this.secret, n.queryParameters[we.API_VERSION] = yp, n.queryParameters[we.RESOURCE] = e, t.idType === me.SYSTEM_ASSIGNED)
      n.queryParameters[Pt.MANAGED_IDENTITY_CLIENT_ID_2017] = process.env[B.DEFAULT_IDENTITY_CLIENT_ID];
    else if (t.idType === me.USER_ASSIGNED_CLIENT_ID)
      n.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(
        t.idType,
        !1,
        // isIMDS
        !0
        // uses2017API
      )] = t.id;
    else
      throw new Error(Tp);
    return n;
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
class tt {
  constructor(e, t, n, i, o) {
    this.logger = e, this.nodeStorage = t, this.networkClient = n, this.cryptoProvider = i, this.disableInternalRetries = o;
  }
  async sendManagedIdentityTokenRequest(e, t, n, i) {
    return tt.identitySource || (tt.identitySource = this.selectManagedIdentitySource(this.logger, this.nodeStorage, this.networkClient, this.cryptoProvider, this.disableInternalRetries, t)), tt.identitySource.acquireTokenWithManagedIdentity(e, t, n, i);
  }
  allEnvironmentVariablesAreDefined(e) {
    return Object.values(e).every((t) => t !== void 0);
  }
  /**
   * Determine the Managed Identity Source based on available environment variables. This API is consumed by ManagedIdentityApplication's getManagedIdentitySource.
   * @returns ManagedIdentitySourceNames - The Managed Identity source's name
   */
  getManagedIdentitySource() {
    return tt.sourceName = this.allEnvironmentVariablesAreDefined(Ht.getEnvironmentVariables()) ? z.SERVICE_FABRIC : this.allEnvironmentVariablesAreDefined(xt.getEnvironmentVariables()) ? z.APP_SERVICE : this.allEnvironmentVariablesAreDefined($t.getEnvironmentVariables()) ? z.MACHINE_LEARNING : this.allEnvironmentVariablesAreDefined(Lt.getEnvironmentVariables()) ? z.CLOUD_SHELL : this.allEnvironmentVariablesAreDefined(mt.getEnvironmentVariables()) ? z.AZURE_ARC : z.DEFAULT_TO_IMDS, tt.sourceName;
  }
  /**
   * Tries to create a managed identity source for all sources
   * @returns the managed identity Source
   */
  selectManagedIdentitySource(e, t, n, i, o, s) {
    const a = Ht.tryCreate(e, t, n, i, o, s) || xt.tryCreate(e, t, n, i, o) || $t.tryCreate(e, t, n, i, o) || Lt.tryCreate(e, t, n, i, o, s) || mt.tryCreate(e, t, n, i, o, s) || pr.tryCreate(e, t, n, i, o);
    if (!a)
      throw ce(wl);
    return a;
  }
}
/*! @azure/msal-node v3.8.6 2026-01-17 */
const Ep = [z.SERVICE_FABRIC];
class pt {
  constructor(e) {
    this.config = cg(e || {}), this.logger = new it(this.config.system.loggerOptions, Oo, qt);
    const t = {
      canonicalAuthority: w.DEFAULT_AUTHORITY
    };
    pt.nodeStorage || (pt.nodeStorage = new xo(this.logger, this.config.managedIdentityId.id, xi, t)), this.networkClient = this.config.system.networkClient, this.cryptoProvider = new Uo();
    const n = {
      protocolMode: At.AAD,
      knownAuthorities: [_s],
      cloudDiscoveryMetadata: "",
      authorityMetadata: ""
    };
    this.fakeAuthority = new ge(
      _s,
      this.networkClient,
      pt.nodeStorage,
      n,
      this.logger,
      this.cryptoProvider.createNewGuid(),
      // correlationID
      void 0,
      !0
    ), this.fakeClientCredentialClient = new zl({
      authOptions: {
        clientId: this.config.managedIdentityId.id,
        authority: this.fakeAuthority
      }
    }), this.managedIdentityClient = new tt(this.logger, pt.nodeStorage, this.networkClient, this.cryptoProvider, this.config.disableInternalRetries), this.hashUtils = new Do();
  }
  /**
   * Acquire an access token from the cache or the managed identity
   * @param managedIdentityRequest - the ManagedIdentityRequestParams object passed in by the developer
   * @returns the access token
   */
  async acquireToken(e) {
    if (!e.resource)
      throw re(go);
    const t = {
      forceRefresh: e.forceRefresh,
      resource: e.resource.replace("/.default", ""),
      scopes: [
        e.resource.replace("/.default", "")
      ],
      authority: this.fakeAuthority.canonicalAuthority,
      correlationId: this.cryptoProvider.createNewGuid(),
      claims: e.claims,
      clientCapabilities: this.config.clientCapabilities
    };
    if (t.forceRefresh)
      return this.acquireTokenFromManagedIdentity(t, this.config.managedIdentityId, this.fakeAuthority);
    const [n, i] = await this.fakeClientCredentialClient.getCachedAuthenticationResult(t, this.config, this.cryptoProvider, this.fakeAuthority, pt.nodeStorage);
    if (t.claims) {
      const o = this.managedIdentityClient.getManagedIdentitySource();
      if (n && Ep.includes(o)) {
        const s = this.hashUtils.sha256(n.accessToken).toString(Ye.HEX);
        t.revokedTokenSha256Hash = s;
      }
      return this.acquireTokenFromManagedIdentity(t, this.config.managedIdentityId, this.fakeAuthority);
    }
    return n ? (i === oe.PROACTIVELY_REFRESHED && (this.logger.info("ClientCredentialClient:getCachedAuthenticationResult - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed."), await this.acquireTokenFromManagedIdentity(t, this.config.managedIdentityId, this.fakeAuthority, !0)), n) : this.acquireTokenFromManagedIdentity(t, this.config.managedIdentityId, this.fakeAuthority);
  }
  /**
   * Acquires a token from a managed identity endpoint.
   *
   * @param managedIdentityRequest - The request object containing parameters for the managed identity token request.
   * @param managedIdentityId - The identifier for the managed identity (e.g., client ID or resource ID).
   * @param fakeAuthority - A placeholder authority used for the token request.
   * @param refreshAccessToken - Optional flag indicating whether to force a refresh of the access token.
   * @returns A promise that resolves to an AuthenticationResult containing the acquired token and related information.
   */
  async acquireTokenFromManagedIdentity(e, t, n, i) {
    return this.managedIdentityClient.sendManagedIdentityTokenRequest(e, t, n, i);
  }
  /**
   * Determine the Managed Identity Source based on available environment variables. This API is consumed by Azure Identity SDK.
   * @returns ManagedIdentitySourceNames - The Managed Identity source's name
   */
  getManagedIdentitySource() {
    return tt.sourceName || this.managedIdentityClient.getManagedIdentitySource();
  }
}
function Ap(r, e) {
  return r = Math.ceil(r), e = Math.floor(e), Math.floor(Math.random() * (e - r + 1)) + r;
}
function Gl(r, e) {
  const t = e.retryDelayInMs * Math.pow(2, r), n = Math.min(e.maxRetryDelayInMs, t);
  return { retryAfterInMs: n / 2 + Ap(0, n / 2) };
}
function Vl(r) {
  return typeof r == "object" && r !== null && !Array.isArray(r) && !(r instanceof RegExp) && !(r instanceof Date);
}
function $o(r) {
  if (Vl(r)) {
    const e = typeof r.name == "string", t = typeof r.message == "string";
    return e && t;
  }
  return !1;
}
function jl() {
  return crypto.randomUUID();
}
typeof Deno < "u" && typeof Deno.version < "u" && typeof Deno.version.deno < "u";
typeof Bun < "u" && typeof Bun.version < "u";
var Xa;
const Bo = typeof globalThis.process < "u" && !!globalThis.process.version && !!((Xa = globalThis.process.versions) != null && Xa.node);
function ft(r, e) {
  return Buffer.from(r, e);
}
const Ii = "REDACTED", Cp = [
  "x-ms-client-request-id",
  "x-ms-return-client-request-id",
  "x-ms-useragent",
  "x-ms-correlation-request-id",
  "x-ms-request-id",
  "client-request-id",
  "ms-cv",
  "return-client-request-id",
  "traceparent",
  "Access-Control-Allow-Credentials",
  "Access-Control-Allow-Headers",
  "Access-Control-Allow-Methods",
  "Access-Control-Allow-Origin",
  "Access-Control-Expose-Headers",
  "Access-Control-Max-Age",
  "Access-Control-Request-Headers",
  "Access-Control-Request-Method",
  "Origin",
  "Accept",
  "Accept-Encoding",
  "Cache-Control",
  "Connection",
  "Content-Length",
  "Content-Type",
  "Date",
  "ETag",
  "Expires",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Unmodified-Since",
  "Last-Modified",
  "Pragma",
  "Request-Id",
  "Retry-After",
  "Server",
  "Transfer-Encoding",
  "User-Agent",
  "WWW-Authenticate"
], _p = ["api-version"];
class vr {
  constructor({ additionalAllowedHeaderNames: e = [], additionalAllowedQueryParameters: t = [] } = {}) {
    b(this, "allowedHeaderNames");
    b(this, "allowedQueryParameters");
    e = Cp.concat(e), t = _p.concat(t), this.allowedHeaderNames = new Set(e.map((n) => n.toLowerCase())), this.allowedQueryParameters = new Set(t.map((n) => n.toLowerCase()));
  }
  /**
   * Sanitizes an object for logging.
   * @param obj - The object to sanitize
   * @returns - The sanitized object as a string
   */
  sanitize(e) {
    const t = /* @__PURE__ */ new Set();
    return JSON.stringify(e, (n, i) => {
      if (i instanceof Error)
        return {
          ...i,
          name: i.name,
          message: i.message
        };
      if (n === "headers")
        return this.sanitizeHeaders(i);
      if (n === "url")
        return this.sanitizeUrl(i);
      if (n === "query")
        return this.sanitizeQuery(i);
      if (n === "body")
        return;
      if (n === "response")
        return;
      if (n === "operationSpec")
        return;
      if (Array.isArray(i) || Vl(i)) {
        if (t.has(i))
          return "[Circular]";
        t.add(i);
      }
      return i;
    }, 2);
  }
  /**
   * Sanitizes a URL for logging.
   * @param value - The URL to sanitize
   * @returns - The sanitized URL as a string
   */
  sanitizeUrl(e) {
    if (typeof e != "string" || e === null || e === "")
      return e;
    const t = new URL(e);
    if (!t.search)
      return e;
    for (const [n] of t.searchParams)
      this.allowedQueryParameters.has(n.toLowerCase()) || t.searchParams.set(n, Ii);
    return t.toString();
  }
  sanitizeHeaders(e) {
    const t = {};
    for (const n of Object.keys(e))
      this.allowedHeaderNames.has(n.toLowerCase()) ? t[n] = e[n] : t[n] = Ii;
    return t;
  }
  sanitizeQuery(e) {
    if (typeof e != "object" || e === null)
      return e;
    const t = {};
    for (const n of Object.keys(e))
      this.allowedQueryParameters.has(n.toLowerCase()) ? t[n] = e[n] : t[n] = Ii;
    return t;
  }
}
let Kl = class extends Error {
  constructor(e) {
    super(e), this.name = "AbortError";
  }
};
function Ip(r, e) {
  const { cleanupBeforeAbort: t, abortSignal: n, abortErrorMsg: i } = e ?? {};
  return new Promise((o, s) => {
    function a() {
      s(new Kl(i ?? "The operation was aborted."));
    }
    function c() {
      n == null || n.removeEventListener("abort", l);
    }
    function l() {
      t == null || t(), c(), a();
    }
    if (n != null && n.aborted)
      return a();
    try {
      r((u) => {
        c(), o(u);
      }, (u) => {
        c(), s(u);
      });
    } catch (u) {
      s(u);
    }
    n == null || n.addEventListener("abort", l);
  });
}
const Sp = "The delay was aborted.";
function wp(r, e) {
  let t;
  const { abortSignal: n, abortErrorMsg: i } = {};
  return Ip((o) => {
    t = setTimeout(o, r);
  }, {
    cleanupBeforeAbort: () => clearTimeout(t),
    abortSignal: n,
    abortErrorMsg: i ?? Sp
  });
}
function Or(r) {
  if ($o(r))
    return r.message;
  {
    let e;
    try {
      typeof r == "object" && r ? e = JSON.stringify(r) : e = String(r);
    } catch {
      e = "[unable to stringify input]";
    }
    return `Unknown error ${e}`;
  }
}
function Rp(r, e) {
  return Gl(r, e);
}
function Yl(r) {
  return $o(r);
}
const Wl = Bo, zi = Bo, Cn = X("IdentityUtils"), Ql = "1.0";
function kt(r, e, t) {
  const n = (i) => (Cn.getToken.info(i), new Dt({
    scopes: Array.isArray(r) ? r : [r],
    getTokenOptions: t,
    message: i
  }));
  if (!e)
    throw n("No response");
  if (!e.expiresOn)
    throw n('Response had no "expiresOn" property.');
  if (!e.accessToken)
    throw n('Response had no "accessToken" property.');
}
function Jl(r) {
  let e = r == null ? void 0 : r.authorityHost;
  return !e && zi && (e = process.env.AZURE_AUTHORITY_HOST), e ?? eo;
}
function Zl(r, e) {
  return e || (e = eo), new RegExp(`${r}/?$`).test(e) ? e : e.endsWith("/") ? e + r : `${e}/${r}`;
}
function bp(r, e, t) {
  return r === "adfs" && e || t ? [e] : [];
}
const Xl = (r, e = Wl ? "Node" : "Browser") => (t, n, i) => {
  if (!i)
    switch (t) {
      case W.Error:
        r.info(`MSAL ${e} V2 error: ${n}`);
        return;
      case W.Info:
        r.info(`MSAL ${e} V2 info message: ${n}`);
        return;
      case W.Verbose:
        r.info(`MSAL ${e} V2 verbose message: ${n}`);
        return;
      case W.Warning:
        r.info(`MSAL ${e} V2 warning: ${n}`);
        return;
    }
};
function ed(r) {
  switch (r) {
    case "error":
      return W.Error;
    case "info":
      return W.Info;
    case "verbose":
      return W.Verbose;
    case "warning":
      return W.Warning;
    default:
      return W.Info;
  }
}
function vt(r, e, t) {
  if (e.name === "AuthError" || e.name === "ClientAuthError" || e.name === "BrowserAuthError") {
    const n = e;
    switch (n.errorCode) {
      case "endpoints_resolution_error":
        return Cn.info(J(r, e.message)), new L(e.message);
      case "device_code_polling_cancelled":
        return new Kl("The authentication has been aborted by the caller.");
      case "consent_required":
      case "interaction_required":
      case "login_required":
        Cn.info(J(r, `Authentication returned errorCode ${n.errorCode}`));
        break;
      default:
        Cn.info(J(r, `Failed to acquire token: ${e.message}`));
        break;
    }
  }
  return e.name === "ClientConfigurationError" || e.name === "BrowserConfigurationAuthError" || e.name === "AbortError" || e.name === "AuthenticationError" ? e : e.name === "NativeAuthError" ? (Cn.info(J(r, `Error from the native broker: ${e.message} with status code: ${e.statusCode}`)), e) : new Dt({ scopes: r, getTokenOptions: t, message: e.message });
}
function kp(r) {
  return {
    localAccountId: r.homeAccountId,
    environment: r.authority,
    username: r.username,
    homeAccountId: r.homeAccountId,
    tenantId: r.tenantId
  };
}
function vp(r, e) {
  return {
    authority: e.environment ?? Xd,
    homeAccountId: e.homeAccountId,
    tenantId: e.tenantId || Zd,
    username: e.username,
    clientId: r,
    version: Ql
  };
}
function Op(r) {
  const e = JSON.parse(r);
  if (e.version && e.version !== Ql)
    throw Error("Unsupported AuthenticationRecord version");
  return e;
}
const td = "$", nd = "_";
function Pp(r, e) {
  return e !== "Composite" && e !== "Dictionary" && (typeof r == "string" || typeof r == "number" || typeof r == "boolean" || (e == null ? void 0 : e.match(/^(Date|DateTime|DateTimeRfc1123|UnixTime|ByteArray|Base64Url)$/i)) !== null || r === void 0 || r === null);
}
function Np(r) {
  const e = {
    ...r.headers,
    ...r.body
  };
  return r.hasNullableType && Object.getOwnPropertyNames(e).length === 0 ? r.shouldWrapBody ? { body: null } : null : r.shouldWrapBody ? {
    ...r.headers,
    body: r.body
  } : e;
}
function ma(r, e) {
  var c;
  const t = r.parsedHeaders;
  if (r.request.method === "HEAD")
    return {
      ...t,
      body: r.parsedBody
    };
  const n = e && e.bodyMapper, i = !!(n != null && n.nullable), o = n == null ? void 0 : n.type.name;
  if (o === "Stream")
    return {
      ...t,
      blobBody: r.blobBody,
      readableStreamBody: r.readableStreamBody
    };
  const s = o === "Composite" && n.type.modelProperties || {}, a = Object.keys(s).some((l) => s[l].serializedName === "");
  if (o === "Sequence" || a) {
    const l = r.parsedBody ?? [];
    for (const u of Object.keys(s))
      s[u].serializedName && (l[u] = (c = r.parsedBody) == null ? void 0 : c[u]);
    if (t)
      for (const u of Object.keys(t))
        l[u] = t[u];
    return i && !r.parsedBody && !t && Object.getOwnPropertyNames(s).length === 0 ? null : l;
  }
  return Np({
    body: r.parsedBody,
    headers: t,
    hasNullableType: i,
    shouldWrapBody: Pp(r.parsedBody, o)
  });
}
const Bt = {
  Base64Url: "Base64Url",
  Boolean: "Boolean",
  ByteArray: "ByteArray",
  Composite: "Composite",
  Date: "Date",
  DateTime: "DateTime",
  DateTimeRfc1123: "DateTimeRfc1123",
  Dictionary: "Dictionary",
  Enum: "Enum",
  Number: "Number",
  Object: "Object",
  Sequence: "Sequence",
  String: "String",
  Stream: "Stream",
  TimeSpan: "TimeSpan",
  UnixTime: "UnixTime"
};
class mr extends Error {
  constructor(e) {
    super(e), this.name = "AbortError";
  }
}
function Jn(r) {
  return r.toLowerCase();
}
function* Mp(r) {
  for (const e of r.values())
    yield [e.name, e.value];
}
class Dp {
  constructor(e) {
    b(this, "_headersMap");
    if (this._headersMap = /* @__PURE__ */ new Map(), e)
      for (const t of Object.keys(e))
        this.set(t, e[t]);
  }
  /**
   * Set a header in this collection with the provided name and value. The name is
   * case-insensitive.
   * @param name - The name of the header to set. This value is case-insensitive.
   * @param value - The value of the header to set.
   */
  set(e, t) {
    this._headersMap.set(Jn(e), { name: e, value: String(t).trim() });
  }
  /**
   * Get the header value for the provided header name, or undefined if no header exists in this
   * collection with the provided name.
   * @param name - The name of the header. This value is case-insensitive.
   */
  get(e) {
    var t;
    return (t = this._headersMap.get(Jn(e))) == null ? void 0 : t.value;
  }
  /**
   * Get whether or not this header collection contains a header entry for the provided header name.
   * @param name - The name of the header to set. This value is case-insensitive.
   */
  has(e) {
    return this._headersMap.has(Jn(e));
  }
  /**
   * Remove the header with the provided headerName.
   * @param name - The name of the header to remove.
   */
  delete(e) {
    this._headersMap.delete(Jn(e));
  }
  /**
   * Get the JSON object representation of this HTTP header collection.
   */
  toJSON(e = {}) {
    const t = {};
    if (e.preserveCase)
      for (const n of this._headersMap.values())
        t[n.name] = n.value;
    else
      for (const [n, i] of this._headersMap)
        t[n] = i.value;
    return t;
  }
  /**
   * Get the string representation of this HTTP header collection.
   */
  toString() {
    return JSON.stringify(this.toJSON({ preserveCase: !0 }));
  }
  /**
   * Iterate over tuples of header [name, value] pairs.
   */
  [Symbol.iterator]() {
    return Mp(this._headersMap);
  }
}
function xn(r) {
  return new Dp(r);
}
class Up {
  constructor(e) {
    b(this, "url");
    b(this, "method");
    b(this, "headers");
    b(this, "timeout");
    b(this, "withCredentials");
    b(this, "body");
    b(this, "multipartBody");
    b(this, "formData");
    b(this, "streamResponseStatusCodes");
    b(this, "enableBrowserStreams");
    b(this, "proxySettings");
    b(this, "disableKeepAlive");
    b(this, "abortSignal");
    b(this, "requestId");
    b(this, "allowInsecureConnection");
    b(this, "onUploadProgress");
    b(this, "onDownloadProgress");
    b(this, "requestOverrides");
    b(this, "authSchemes");
    this.url = e.url, this.body = e.body, this.headers = e.headers ?? xn(), this.method = e.method ?? "GET", this.timeout = e.timeout ?? 0, this.multipartBody = e.multipartBody, this.formData = e.formData, this.disableKeepAlive = e.disableKeepAlive ?? !1, this.proxySettings = e.proxySettings, this.streamResponseStatusCodes = e.streamResponseStatusCodes, this.withCredentials = e.withCredentials ?? !1, this.abortSignal = e.abortSignal, this.onUploadProgress = e.onUploadProgress, this.onDownloadProgress = e.onDownloadProgress, this.requestId = e.requestId || jl(), this.allowInsecureConnection = e.allowInsecureConnection ?? !1, this.enableBrowserStreams = e.enableBrowserStreams ?? !1, this.requestOverrides = e.requestOverrides, this.authSchemes = e.authSchemes;
  }
}
function xp(r) {
  return new Up(r);
}
const ya = /* @__PURE__ */ new Set(["Deserialize", "Serialize", "Retry", "Sign"]);
class yr {
  constructor(e) {
    b(this, "_policies", []);
    b(this, "_orderedPolicies");
    this._policies = (e == null ? void 0 : e.slice(0)) ?? [], this._orderedPolicies = void 0;
  }
  addPolicy(e, t = {}) {
    if (t.phase && t.afterPhase)
      throw new Error("Policies inside a phase cannot specify afterPhase.");
    if (t.phase && !ya.has(t.phase))
      throw new Error(`Invalid phase name: ${t.phase}`);
    if (t.afterPhase && !ya.has(t.afterPhase))
      throw new Error(`Invalid afterPhase name: ${t.afterPhase}`);
    this._policies.push({
      policy: e,
      options: t
    }), this._orderedPolicies = void 0;
  }
  removePolicy(e) {
    const t = [];
    return this._policies = this._policies.filter((n) => e.name && n.policy.name === e.name || e.phase && n.options.phase === e.phase ? (t.push(n.policy), !1) : !0), this._orderedPolicies = void 0, t;
  }
  sendRequest(e, t) {
    return this.getOrderedPolicies().reduceRight((o, s) => (a) => s.sendRequest(a, o), (o) => e.sendRequest(o))(t);
  }
  getOrderedPolicies() {
    return this._orderedPolicies || (this._orderedPolicies = this.orderPolicies()), this._orderedPolicies;
  }
  clone() {
    return new yr(this._policies);
  }
  static create() {
    return new yr();
  }
  orderPolicies() {
    const e = [], t = /* @__PURE__ */ new Map();
    function n(h) {
      return {
        name: h,
        policies: /* @__PURE__ */ new Set(),
        hasRun: !1,
        hasAfterPolicies: !1
      };
    }
    const i = n("Serialize"), o = n("None"), s = n("Deserialize"), a = n("Retry"), c = n("Sign"), l = [i, o, s, a, c];
    function u(h) {
      return h === "Retry" ? a : h === "Serialize" ? i : h === "Deserialize" ? s : h === "Sign" ? c : o;
    }
    for (const h of this._policies) {
      const y = h.policy, T = h.options, g = y.name;
      if (t.has(g))
        throw new Error("Duplicate policy names not allowed in pipeline");
      const m = {
        policy: y,
        dependsOn: /* @__PURE__ */ new Set(),
        dependants: /* @__PURE__ */ new Set()
      };
      T.afterPhase && (m.afterPhase = u(T.afterPhase), m.afterPhase.hasAfterPolicies = !0), t.set(g, m), u(T.phase).policies.add(m);
    }
    for (const h of this._policies) {
      const { policy: y, options: T } = h, g = y.name, m = t.get(g);
      if (!m)
        throw new Error(`Missing node for policy ${g}`);
      if (T.afterPolicies)
        for (const E of T.afterPolicies) {
          const C = t.get(E);
          C && (m.dependsOn.add(C), C.dependants.add(m));
        }
      if (T.beforePolicies)
        for (const E of T.beforePolicies) {
          const C = t.get(E);
          C && (C.dependsOn.add(m), m.dependants.add(C));
        }
    }
    function d(h) {
      h.hasRun = !0;
      for (const y of h.policies)
        if (!(y.afterPhase && (!y.afterPhase.hasRun || y.afterPhase.policies.size)) && y.dependsOn.size === 0) {
          e.push(y.policy);
          for (const T of y.dependants)
            T.dependsOn.delete(y);
          t.delete(y.policy.name), h.policies.delete(y);
        }
    }
    function f() {
      for (const h of l) {
        if (d(h), h.policies.size > 0 && h !== o) {
          o.hasRun || d(o);
          return;
        }
        h.hasAfterPolicies && d(o);
      }
    }
    let p = 0;
    for (; t.size > 0; ) {
      p++;
      const h = e.length;
      if (f(), e.length <= h && p > 1)
        throw new Error("Cannot satisfy policy dependencies due to requirements cycle.");
    }
    return e;
  }
}
function Lp() {
  return yr.create();
}
const Hp = Fd.custom, $p = new vr();
var nt;
let Et = (nt = class extends Error {
  constructor(t, n = {}) {
    var o;
    super(t);
    /**
     * The code of the error itself (use statics on RestError if possible.)
     */
    b(this, "code");
    /**
     * The HTTP status code of the request (if applicable.)
     */
    b(this, "statusCode");
    /**
     * The request that was made.
     * This property is non-enumerable.
     */
    b(this, "request");
    /**
     * The response received (if any.)
     * This property is non-enumerable.
     */
    b(this, "response");
    /**
     * Bonus property set by the throw site.
     */
    b(this, "details");
    this.name = "RestError", this.code = n.code, this.statusCode = n.statusCode, Object.defineProperty(this, "request", { value: n.request, enumerable: !1 }), Object.defineProperty(this, "response", { value: n.response, enumerable: !1 });
    const i = (o = this.request) != null && o.agent ? {
      maxFreeSockets: this.request.agent.maxFreeSockets,
      maxSockets: this.request.agent.maxSockets
    } : void 0;
    Object.defineProperty(this, Hp, {
      value: () => `RestError: ${this.message} 
 ${$p.sanitize({
        ...this,
        request: { ...this.request, agent: i },
        response: this.response
      })}`,
      enumerable: !1
    }), Object.setPrototypeOf(this, nt.prototype);
  }
}, /**
 * Something went wrong when making the request.
 * This means the actual request failed for some reason,
 * such as a DNS issue or the connection being lost.
 */
b(nt, "REQUEST_SEND_ERROR", "REQUEST_SEND_ERROR"), /**
 * This means that parsing the response from the server failed.
 * It may have been malformed.
 */
b(nt, "PARSE_ERROR", "PARSE_ERROR"), nt);
function Bp(r) {
  return r instanceof Et ? !0 : $o(r) && r.name === "RestError";
}
const Xe = dc("ts-http-runtime"), Fp = {};
function _n(r) {
  return r && typeof r.pipe == "function";
}
function Ta(r) {
  return r.readable === !1 ? Promise.resolve() : new Promise((e) => {
    const t = () => {
      e(), r.removeListener("close", t), r.removeListener("end", t), r.removeListener("error", t);
    };
    r.on("close", t), r.on("end", t), r.on("error", t);
  });
}
function rd(r) {
  return r && typeof r.byteLength == "number";
}
class Ea extends Wd {
  constructor(t) {
    super();
    b(this, "loadedBytes", 0);
    b(this, "progressCallback");
    this.progressCallback = t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  _transform(t, n, i) {
    this.push(t), this.loadedBytes += t.length;
    try {
      this.progressCallback({ loadedBytes: this.loadedBytes }), i();
    } catch (o) {
      i(o);
    }
  }
}
class zp {
  constructor() {
    b(this, "cachedHttpAgent");
    b(this, "cachedHttpsAgents", /* @__PURE__ */ new WeakMap());
  }
  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request - The request to be made.
   */
  async sendRequest(e) {
    var l, u;
    const t = new AbortController();
    let n;
    if (e.abortSignal) {
      if (e.abortSignal.aborted)
        throw new mr("The operation was aborted. Request has already been canceled.");
      n = (d) => {
        d.type === "abort" && t.abort();
      }, e.abortSignal.addEventListener("abort", n);
    }
    let i;
    e.timeout > 0 && (i = setTimeout(() => {
      const d = new vr();
      Xe.info(`request to '${d.sanitizeUrl(e.url)}' timed out. canceling...`), t.abort();
    }, e.timeout));
    const o = e.headers.get("Accept-Encoding"), s = (o == null ? void 0 : o.includes("gzip")) || (o == null ? void 0 : o.includes("deflate"));
    let a = typeof e.body == "function" ? e.body() : e.body;
    if (a && !e.headers.has("Content-Length")) {
      const d = jp(a);
      d !== null && e.headers.set("Content-Length", d);
    }
    let c;
    try {
      if (a && e.onUploadProgress) {
        const T = e.onUploadProgress, g = new Ea(T);
        g.on("error", (m) => {
          Xe.error("Error in upload progress", m);
        }), _n(a) ? a.pipe(g) : g.end(a), a = g;
      }
      const d = await this.makeRequest(e, t, a);
      i !== void 0 && clearTimeout(i);
      const f = qp(d), h = {
        status: d.statusCode ?? 0,
        headers: f,
        request: e
      };
      if (e.method === "HEAD")
        return d.resume(), h;
      c = s ? Gp(d, f) : d;
      const y = e.onDownloadProgress;
      if (y) {
        const T = new Ea(y);
        T.on("error", (g) => {
          Xe.error("Error in download progress", g);
        }), c.pipe(T), c = T;
      }
      return /* Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code */ (l = e.streamResponseStatusCodes) != null && l.has(Number.POSITIVE_INFINITY) || (u = e.streamResponseStatusCodes) != null && u.has(h.status) ? h.readableStreamBody = c : h.bodyAsText = await Vp(c), h;
    } finally {
      if (e.abortSignal && n) {
        let d = Promise.resolve();
        _n(a) && (d = Ta(a));
        let f = Promise.resolve();
        _n(c) && (f = Ta(c)), Promise.all([d, f]).then(() => {
          var p;
          n && ((p = e.abortSignal) == null || p.removeEventListener("abort", n));
        }).catch((p) => {
          Xe.warning("Error when cleaning up abortListener on httpRequest", p);
        });
      }
    }
  }
  makeRequest(e, t, n) {
    const i = new URL(e.url), o = i.protocol !== "https:";
    if (o && !e.allowInsecureConnection)
      throw new Error(`Cannot connect to ${e.url} while allowInsecureConnection is false.`);
    const a = {
      agent: e.agent ?? this.getOrCreateAgent(e, o),
      hostname: i.hostname,
      path: `${i.pathname}${i.search}`,
      port: i.port,
      method: e.method,
      headers: e.headers.toJSON({ preserveCase: !0 }),
      ...e.requestOverrides
    };
    return new Promise((c, l) => {
      const u = o ? Ur.request(a, c) : xr.request(a, c);
      u.once("error", (d) => {
        l(new Et(d.message, { code: d.code ?? Et.REQUEST_SEND_ERROR, request: e }));
      }), t.signal.addEventListener("abort", () => {
        const d = new mr("The operation was aborted. Rejecting from abort signal callback while making request.");
        u.destroy(d), l(d);
      }), n && _n(n) ? n.pipe(u) : n ? typeof n == "string" || Buffer.isBuffer(n) ? u.end(n) : rd(n) ? u.end(ArrayBuffer.isView(n) ? Buffer.from(n.buffer) : Buffer.from(n)) : (Xe.error("Unrecognized body type", n), l(new Et("Unrecognized body type"))) : u.end();
    });
  }
  getOrCreateAgent(e, t) {
    const n = e.disableKeepAlive;
    if (t)
      return n ? Ur.globalAgent : (this.cachedHttpAgent || (this.cachedHttpAgent = new Ur.Agent({ keepAlive: !0 })), this.cachedHttpAgent);
    {
      if (n && !e.tlsSettings)
        return xr.globalAgent;
      const i = e.tlsSettings ?? Fp;
      let o = this.cachedHttpsAgents.get(i);
      return o && o.options.keepAlive === !n || (Xe.info("No cached TLS Agent exist, creating a new Agent"), o = new xr.Agent({
        // keepAlive is true if disableKeepAlive is false.
        keepAlive: !n,
        // Since we are spreading, if no tslSettings were provided, nothing is added to the agent options.
        ...i
      }), this.cachedHttpsAgents.set(i, o)), o;
    }
  }
}
function qp(r) {
  const e = xn();
  for (const t of Object.keys(r.headers)) {
    const n = r.headers[t];
    Array.isArray(n) ? n.length > 0 && e.set(t, n[0]) : n && e.set(t, n);
  }
  return e;
}
function Gp(r, e) {
  const t = e.get("Content-Encoding");
  if (t === "gzip") {
    const n = Go.createGunzip();
    return r.pipe(n), n;
  } else if (t === "deflate") {
    const n = Go.createInflate();
    return r.pipe(n), n;
  }
  return r;
}
function Vp(r) {
  return new Promise((e, t) => {
    const n = [];
    r.on("data", (i) => {
      Buffer.isBuffer(i) ? n.push(i) : n.push(Buffer.from(i));
    }), r.on("end", () => {
      e(Buffer.concat(n).toString("utf8"));
    }), r.on("error", (i) => {
      i && (i == null ? void 0 : i.name) === "AbortError" ? t(i) : t(new Et(`Error reading response as text: ${i.message}`, {
        code: Et.PARSE_ERROR
      }));
    });
  });
}
function jp(r) {
  return r ? Buffer.isBuffer(r) ? r.length : _n(r) ? null : rd(r) ? r.byteLength : typeof r == "string" ? Buffer.from(r).length : null : 0;
}
function Kp() {
  return new zp();
}
function Yp() {
  return Kp();
}
const Wp = "logPolicy";
function Qp(r = {}) {
  const e = r.logger ?? Xe.info, t = new vr({
    additionalAllowedHeaderNames: r.additionalAllowedHeaderNames,
    additionalAllowedQueryParameters: r.additionalAllowedQueryParameters
  });
  return {
    name: Wp,
    async sendRequest(n, i) {
      if (!e.enabled)
        return i(n);
      e(`Request: ${t.sanitize(n)}`);
      const o = await i(n);
      return e(`Response status code: ${o.status}`), e(`Headers: ${t.sanitize(o.headers)}`), o;
    }
  };
}
const Jp = "redirectPolicy", Aa = ["GET", "HEAD"];
function Zp(r = {}) {
  const { maxRetries: e = 20 } = r;
  return {
    name: Jp,
    async sendRequest(t, n) {
      const i = await n(t);
      return id(n, i, e);
    }
  };
}
async function id(r, e, t, n = 0) {
  const { request: i, status: o, headers: s } = e, a = s.get("location");
  if (a && (o === 300 || o === 301 && Aa.includes(i.method) || o === 302 && Aa.includes(i.method) || o === 303 && i.method === "POST" || o === 307) && n < t) {
    const c = new URL(a, i.url);
    i.url = c.toString(), o === 303 && (i.method = "GET", i.headers.delete("Content-Length"), delete i.body), i.headers.delete("Authorization");
    const l = await r(i);
    return id(r, l, t, n + 1);
  }
  return e;
}
const qi = 3, Xp = "decompressResponsePolicy";
function em() {
  return {
    name: Xp,
    async sendRequest(r, e) {
      return r.method !== "HEAD" && r.headers.set("Accept-Encoding", "gzip,deflate"), e(r);
    }
  };
}
const tm = "The operation was aborted.";
function nm(r, e, t) {
  return new Promise((n, i) => {
    let o, s;
    const a = () => i(new mr(t != null && t.abortErrorMsg ? t == null ? void 0 : t.abortErrorMsg : tm)), c = () => {
      t != null && t.abortSignal && s && t.abortSignal.removeEventListener("abort", s);
    };
    if (s = () => (o && clearTimeout(o), c(), a()), t != null && t.abortSignal && t.abortSignal.aborted)
      return a();
    o = setTimeout(() => {
      c(), n(e);
    }, r), t != null && t.abortSignal && t.abortSignal.addEventListener("abort", s);
  });
}
function rm(r, e) {
  const t = r.headers.get(e);
  if (!t)
    return;
  const n = Number(t);
  if (!Number.isNaN(n))
    return n;
}
const Gi = "Retry-After", im = ["retry-after-ms", "x-ms-retry-after-ms", Gi];
function od(r) {
  if (r && [429, 503].includes(r.status))
    try {
      for (const i of im) {
        const o = rm(r, i);
        if (o === 0 || o)
          return o * (i === Gi ? 1e3 : 1);
      }
      const e = r.headers.get(Gi);
      if (!e)
        return;
      const n = Date.parse(e) - Date.now();
      return Number.isFinite(n) ? Math.max(0, n) : void 0;
    } catch {
      return;
    }
}
function om(r) {
  return Number.isFinite(od(r));
}
function sm() {
  return {
    name: "throttlingRetryStrategy",
    retry({ response: r }) {
      const e = od(r);
      return Number.isFinite(e) ? {
        retryAfterInMs: e
      } : { skipStrategy: !0 };
    }
  };
}
const am = 1e3, cm = 1e3 * 64;
function lm(r = {}) {
  const e = r.retryDelayInMs ?? am, t = r.maxRetryDelayInMs ?? cm;
  return {
    name: "exponentialRetryStrategy",
    retry({ retryCount: n, response: i, responseError: o }) {
      const s = um(o), a = s && r.ignoreSystemErrors, c = dm(i), l = c && r.ignoreHttpStatusCodes;
      return i && (om(i) || !c) || l || a ? { skipStrategy: !0 } : o && !s && !c ? { errorToThrow: o } : Gl(n, {
        retryDelayInMs: e,
        maxRetryDelayInMs: t
      });
    }
  };
}
function dm(r) {
  return !!(r && r.status !== void 0 && (r.status >= 500 || r.status === 408) && r.status !== 501 && r.status !== 505);
}
function um(r) {
  return r ? r.code === "ETIMEDOUT" || r.code === "ESOCKETTIMEDOUT" || r.code === "ECONNREFUSED" || r.code === "ECONNRESET" || r.code === "ENOENT" || r.code === "ENOTFOUND" : !1;
}
const hm = dc("ts-http-runtime retryPolicy"), fm = "retryPolicy";
function sd(r, e = { maxRetries: qi }) {
  const t = e.logger || hm;
  return {
    name: fm,
    async sendRequest(n, i) {
      var c;
      let o, s, a = -1;
      e: for (; ; ) {
        a += 1, o = void 0, s = void 0;
        try {
          t.info(`Retry ${a}: Attempting to send request`, n.requestId), o = await i(n), t.info(`Retry ${a}: Received a response from request`, n.requestId);
        } catch (l) {
          if (t.error(`Retry ${a}: Received an error from request`, n.requestId), s = l, !l || s.name !== "RestError")
            throw l;
          o = s.response;
        }
        if ((c = n.abortSignal) != null && c.aborted)
          throw t.error(`Retry ${a}: Request aborted.`), new mr();
        if (a >= (e.maxRetries ?? qi)) {
          if (t.info(`Retry ${a}: Maximum retries reached. Returning the last received response, or throwing the last received error.`), s)
            throw s;
          if (o)
            return o;
          throw new Error("Maximum retries reached with no response or error to throw");
        }
        t.info(`Retry ${a}: Processing ${r.length} retry strategies.`);
        t: for (const l of r) {
          const u = l.logger || t;
          u.info(`Retry ${a}: Processing retry strategy ${l.name}.`);
          const d = l.retry({
            retryCount: a,
            response: o,
            responseError: s
          });
          if (d.skipStrategy) {
            u.info(`Retry ${a}: Skipped.`);
            continue t;
          }
          const { errorToThrow: f, retryAfterInMs: p, redirectTo: h } = d;
          if (f)
            throw u.error(`Retry ${a}: Retry strategy ${l.name} throws error:`, f), f;
          if (p || p === 0) {
            u.info(`Retry ${a}: Retry strategy ${l.name} retries after ${p}`), await nm(p, void 0, { abortSignal: n.abortSignal });
            continue e;
          }
          if (h) {
            u.info(`Retry ${a}: Retry strategy ${l.name} redirects to ${h}`), n.url = h;
            continue e;
          }
        }
        if (s)
          throw t.info("None of the retry strategies could work with the received error. Throwing it."), s;
        if (o)
          return t.info("None of the retry strategies could work with the received response. Returning it."), o;
      }
    }
  };
}
const gm = "defaultRetryPolicy";
function pm(r = {}) {
  return {
    name: gm,
    sendRequest: sd([sm(), lm(r)], {
      maxRetries: r.maxRetries ?? qi
    }).sendRequest
  };
}
const mm = "formDataPolicy";
function ym(r) {
  const e = {};
  for (const [t, n] of r.entries())
    e[t] ?? (e[t] = []), e[t].push(n);
  return e;
}
function Tm() {
  return {
    name: mm,
    async sendRequest(r, e) {
      if (Bo && typeof FormData < "u" && r.body instanceof FormData && (r.formData = ym(r.body), r.body = void 0), r.formData) {
        const t = r.headers.get("Content-Type");
        t && t.indexOf("application/x-www-form-urlencoded") !== -1 ? r.body = Em(r.formData) : await Am(r.formData, r), r.formData = void 0;
      }
      return e(r);
    }
  };
}
function Em(r) {
  const e = new URLSearchParams();
  for (const [t, n] of Object.entries(r))
    if (Array.isArray(n))
      for (const i of n)
        e.append(t, i.toString());
    else
      e.append(t, n.toString());
  return e.toString();
}
async function Am(r, e) {
  const t = e.headers.get("Content-Type");
  if (t && !t.startsWith("multipart/form-data"))
    return;
  e.headers.set("Content-Type", t ?? "multipart/form-data");
  const n = [];
  for (const [i, o] of Object.entries(r))
    for (const s of Array.isArray(o) ? o : [o])
      if (typeof s == "string")
        n.push({
          headers: xn({
            "Content-Disposition": `form-data; name="${i}"`
          }),
          body: ft(s, "utf-8")
        });
      else {
        if (s == null || typeof s != "object")
          throw new Error(`Unexpected value for key ${i}: ${s}. Value should be serialized to string first.`);
        {
          const a = s.name || "blob", c = xn();
          c.set("Content-Disposition", `form-data; name="${i}"; filename="${a}"`), c.set("Content-Type", s.type || "application/octet-stream"), n.push({
            headers: c,
            body: s
          });
        }
      }
  e.multipartBody = { parts: n };
}
var Te = {}, Ne = {}, he = {}, Ca;
function Cm() {
  if (Ca) return he;
  Ca = 1;
  var r = he && he.__createBinding || (Object.create ? (function(c, l, u, d) {
    d === void 0 && (d = u);
    var f = Object.getOwnPropertyDescriptor(l, u);
    (!f || ("get" in f ? !l.__esModule : f.writable || f.configurable)) && (f = { enumerable: !0, get: function() {
      return l[u];
    } }), Object.defineProperty(c, d, f);
  }) : (function(c, l, u, d) {
    d === void 0 && (d = u), c[d] = l[u];
  })), e = he && he.__setModuleDefault || (Object.create ? (function(c, l) {
    Object.defineProperty(c, "default", { enumerable: !0, value: l });
  }) : function(c, l) {
    c.default = l;
  }), t = he && he.__importStar || function(c) {
    if (c && c.__esModule) return c;
    var l = {};
    if (c != null) for (var u in c) u !== "default" && Object.prototype.hasOwnProperty.call(c, u) && r(l, c, u);
    return e(l, c), l;
  };
  Object.defineProperty(he, "__esModule", { value: !0 }), he.req = he.json = he.toBuffer = void 0;
  const n = t(Mt), i = t(cr);
  async function o(c) {
    let l = 0;
    const u = [];
    for await (const d of c)
      l += d.length, u.push(d);
    return Buffer.concat(u, l);
  }
  he.toBuffer = o;
  async function s(c) {
    const u = (await o(c)).toString("utf8");
    try {
      return JSON.parse(u);
    } catch (d) {
      const f = d;
      throw f.message += ` (input: ${u})`, f;
    }
  }
  he.json = s;
  function a(c, l = {}) {
    const d = ((typeof c == "string" ? c : c.href).startsWith("https:") ? i : n).request(c, l), f = new Promise((p, h) => {
      d.once("response", p).once("error", h).end();
    });
    return d.then = f.then.bind(f), d;
  }
  return he.req = a, he;
}
var _a;
function ad() {
  return _a || (_a = 1, (function(r) {
    var e = Ne && Ne.__createBinding || (Object.create ? (function(u, d, f, p) {
      p === void 0 && (p = f);
      var h = Object.getOwnPropertyDescriptor(d, f);
      (!h || ("get" in h ? !d.__esModule : h.writable || h.configurable)) && (h = { enumerable: !0, get: function() {
        return d[f];
      } }), Object.defineProperty(u, p, h);
    }) : (function(u, d, f, p) {
      p === void 0 && (p = f), u[p] = d[f];
    })), t = Ne && Ne.__setModuleDefault || (Object.create ? (function(u, d) {
      Object.defineProperty(u, "default", { enumerable: !0, value: d });
    }) : function(u, d) {
      u.default = d;
    }), n = Ne && Ne.__importStar || function(u) {
      if (u && u.__esModule) return u;
      var d = {};
      if (u != null) for (var f in u) f !== "default" && Object.prototype.hasOwnProperty.call(u, f) && e(d, u, f);
      return t(d, u), d;
    }, i = Ne && Ne.__exportStar || function(u, d) {
      for (var f in u) f !== "default" && !Object.prototype.hasOwnProperty.call(d, f) && e(d, u, f);
    };
    Object.defineProperty(r, "__esModule", { value: !0 }), r.Agent = void 0;
    const o = n(Zi), s = n(Mt), a = cr;
    i(Cm(), r);
    const c = Symbol("AgentBaseInternalState");
    class l extends s.Agent {
      constructor(d) {
        super(d), this[c] = {};
      }
      /**
       * Determine whether this is an `http` or `https` request.
       */
      isSecureEndpoint(d) {
        if (d) {
          if (typeof d.secureEndpoint == "boolean")
            return d.secureEndpoint;
          if (typeof d.protocol == "string")
            return d.protocol === "https:";
        }
        const { stack: f } = new Error();
        return typeof f != "string" ? !1 : f.split(`
`).some((p) => p.indexOf("(https.js:") !== -1 || p.indexOf("node:https:") !== -1);
      }
      // In order to support async signatures in `connect()` and Node's native
      // connection pooling in `http.Agent`, the array of sockets for each origin
      // has to be updated synchronously. This is so the length of the array is
      // accurate when `addRequest()` is next called. We achieve this by creating a
      // fake socket and adding it to `sockets[origin]` and incrementing
      // `totalSocketCount`.
      incrementSockets(d) {
        if (this.maxSockets === 1 / 0 && this.maxTotalSockets === 1 / 0)
          return null;
        this.sockets[d] || (this.sockets[d] = []);
        const f = new o.Socket({ writable: !1 });
        return this.sockets[d].push(f), this.totalSocketCount++, f;
      }
      decrementSockets(d, f) {
        if (!this.sockets[d] || f === null)
          return;
        const p = this.sockets[d], h = p.indexOf(f);
        h !== -1 && (p.splice(h, 1), this.totalSocketCount--, p.length === 0 && delete this.sockets[d]);
      }
      // In order to properly update the socket pool, we need to call `getName()` on
      // the core `https.Agent` if it is a secureEndpoint.
      getName(d) {
        return this.isSecureEndpoint(d) ? a.Agent.prototype.getName.call(this, d) : super.getName(d);
      }
      createSocket(d, f, p) {
        const h = {
          ...f,
          secureEndpoint: this.isSecureEndpoint(f)
        }, y = this.getName(h), T = this.incrementSockets(y);
        Promise.resolve().then(() => this.connect(d, h)).then((g) => {
          if (this.decrementSockets(y, T), g instanceof s.Agent)
            try {
              return g.addRequest(d, h);
            } catch (m) {
              return p(m);
            }
          this[c].currentSocket = g, super.createSocket(d, f, p);
        }, (g) => {
          this.decrementSockets(y, T), p(g);
        });
      }
      createConnection() {
        const d = this[c].currentSocket;
        if (this[c].currentSocket = void 0, !d)
          throw new Error("No socket was returned in the `connect()` function");
        return d;
      }
      get defaultPort() {
        return this[c].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
      }
      set defaultPort(d) {
        this[c] && (this[c].defaultPort = d);
      }
      get protocol() {
        return this[c].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
      }
      set protocol(d) {
        this[c] && (this[c].protocol = d);
      }
    }
    r.Agent = l;
  })(Ne)), Ne;
}
var ut = {}, Ia;
function _m() {
  if (Ia) return ut;
  Ia = 1;
  var r = ut && ut.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  };
  Object.defineProperty(ut, "__esModule", { value: !0 }), ut.parseProxyResponse = void 0;
  const t = (0, r(Ji()).default)("https-proxy-agent:parse-proxy-response");
  function n(i) {
    return new Promise((o, s) => {
      let a = 0;
      const c = [];
      function l() {
        const h = i.read();
        h ? p(h) : i.once("readable", l);
      }
      function u() {
        i.removeListener("end", d), i.removeListener("error", f), i.removeListener("readable", l);
      }
      function d() {
        u(), t("onend"), s(new Error("Proxy connection ended before receiving CONNECT response"));
      }
      function f(h) {
        u(), t("onerror %o", h), s(h);
      }
      function p(h) {
        c.push(h), a += h.length;
        const y = Buffer.concat(c, a), T = y.indexOf(`\r
\r
`);
        if (T === -1) {
          t("have not received end of HTTP headers yet..."), l();
          return;
        }
        const g = y.slice(0, T).toString("ascii").split(`\r
`), m = g.shift();
        if (!m)
          return i.destroy(), s(new Error("No header received from proxy CONNECT response"));
        const E = m.split(" "), C = +E[1], P = E.slice(2).join(" "), k = {};
        for (const I of g) {
          if (!I)
            continue;
          const _ = I.indexOf(":");
          if (_ === -1)
            return i.destroy(), s(new Error(`Invalid header from proxy CONNECT response: "${I}"`));
          const A = I.slice(0, _).toLowerCase(), R = I.slice(_ + 1).trimStart(), O = k[A];
          typeof O == "string" ? k[A] = [O, R] : Array.isArray(O) ? O.push(R) : k[A] = R;
        }
        t("got proxy server response: %o %o", m, k), u(), o({
          connect: {
            statusCode: C,
            statusText: P,
            headers: k
          },
          buffered: y
        });
      }
      i.on("error", f), i.on("end", d), l();
    });
  }
  return ut.parseProxyResponse = n, ut;
}
var Sa;
function Im() {
  if (Sa) return Te;
  Sa = 1;
  var r = Te && Te.__createBinding || (Object.create ? (function(T, g, m, E) {
    E === void 0 && (E = m);
    var C = Object.getOwnPropertyDescriptor(g, m);
    (!C || ("get" in C ? !g.__esModule : C.writable || C.configurable)) && (C = { enumerable: !0, get: function() {
      return g[m];
    } }), Object.defineProperty(T, E, C);
  }) : (function(T, g, m, E) {
    E === void 0 && (E = m), T[E] = g[m];
  })), e = Te && Te.__setModuleDefault || (Object.create ? (function(T, g) {
    Object.defineProperty(T, "default", { enumerable: !0, value: g });
  }) : function(T, g) {
    T.default = g;
  }), t = Te && Te.__importStar || function(T) {
    if (T && T.__esModule) return T;
    var g = {};
    if (T != null) for (var m in T) m !== "default" && Object.prototype.hasOwnProperty.call(T, m) && r(g, T, m);
    return e(g, T), g;
  }, n = Te && Te.__importDefault || function(T) {
    return T && T.__esModule ? T : { default: T };
  };
  Object.defineProperty(Te, "__esModule", { value: !0 }), Te.HttpsProxyAgent = void 0;
  const i = t(Zi), o = t(tc), s = n(Kd), a = n(Ji()), c = ad(), l = nc, u = _m(), d = (0, a.default)("https-proxy-agent"), f = (T) => T.servername === void 0 && T.host && !i.isIP(T.host) ? {
    ...T,
    servername: T.host
  } : T;
  class p extends c.Agent {
    constructor(g, m) {
      super(m), this.options = { path: void 0 }, this.proxy = typeof g == "string" ? new l.URL(g) : g, this.proxyHeaders = (m == null ? void 0 : m.headers) ?? {}, d("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
      const E = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""), C = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
      this.connectOpts = {
        // Attempt to negotiate http/1.1 for proxy servers that support http/2
        ALPNProtocols: ["http/1.1"],
        ...m ? y(m, "headers") : null,
        host: E,
        port: C
      };
    }
    /**
     * Called when the node-core HTTP client library is creating a
     * new HTTP request.
     */
    async connect(g, m) {
      const { proxy: E } = this;
      if (!m.host)
        throw new TypeError('No "host" provided');
      let C;
      E.protocol === "https:" ? (d("Creating `tls.Socket`: %o", this.connectOpts), C = o.connect(f(this.connectOpts))) : (d("Creating `net.Socket`: %o", this.connectOpts), C = i.connect(this.connectOpts));
      const P = typeof this.proxyHeaders == "function" ? this.proxyHeaders() : { ...this.proxyHeaders }, k = i.isIPv6(m.host) ? `[${m.host}]` : m.host;
      let I = `CONNECT ${k}:${m.port} HTTP/1.1\r
`;
      if (E.username || E.password) {
        const M = `${decodeURIComponent(E.username)}:${decodeURIComponent(E.password)}`;
        P["Proxy-Authorization"] = `Basic ${Buffer.from(M).toString("base64")}`;
      }
      P.Host = `${k}:${m.port}`, P["Proxy-Connection"] || (P["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close");
      for (const M of Object.keys(P))
        I += `${M}: ${P[M]}\r
`;
      const _ = (0, u.parseProxyResponse)(C);
      C.write(`${I}\r
`);
      const { connect: A, buffered: R } = await _;
      if (g.emit("proxyConnect", A), this.emit("proxyConnect", A, g), A.statusCode === 200)
        return g.once("socket", h), m.secureEndpoint ? (d("Upgrading socket connection to TLS"), o.connect({
          ...y(f(m), "host", "path", "port"),
          socket: C
        })) : C;
      C.destroy();
      const O = new i.Socket({ writable: !1 });
      return O.readable = !0, g.once("socket", (M) => {
        d("Replaying proxy buffer for failed request"), (0, s.default)(M.listenerCount("data") > 0), M.push(R), M.push(null);
      }), O;
    }
  }
  p.protocols = ["http", "https"], Te.HttpsProxyAgent = p;
  function h(T) {
    T.resume();
  }
  function y(T, ...g) {
    const m = {};
    let E;
    for (E in T)
      g.includes(E) || (m[E] = T[E]);
    return m;
  }
  return Te;
}
var Sm = Im(), Ee = {}, wa;
function wm() {
  if (wa) return Ee;
  wa = 1;
  var r = Ee && Ee.__createBinding || (Object.create ? (function(p, h, y, T) {
    T === void 0 && (T = y);
    var g = Object.getOwnPropertyDescriptor(h, y);
    (!g || ("get" in g ? !h.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
      return h[y];
    } }), Object.defineProperty(p, T, g);
  }) : (function(p, h, y, T) {
    T === void 0 && (T = y), p[T] = h[y];
  })), e = Ee && Ee.__setModuleDefault || (Object.create ? (function(p, h) {
    Object.defineProperty(p, "default", { enumerable: !0, value: h });
  }) : function(p, h) {
    p.default = h;
  }), t = Ee && Ee.__importStar || function(p) {
    if (p && p.__esModule) return p;
    var h = {};
    if (p != null) for (var y in p) y !== "default" && Object.prototype.hasOwnProperty.call(p, y) && r(h, p, y);
    return e(h, p), h;
  }, n = Ee && Ee.__importDefault || function(p) {
    return p && p.__esModule ? p : { default: p };
  };
  Object.defineProperty(Ee, "__esModule", { value: !0 }), Ee.HttpProxyAgent = void 0;
  const i = t(Zi), o = t(tc), s = n(Ji()), a = Yd, c = ad(), l = nc, u = (0, s.default)("http-proxy-agent");
  class d extends c.Agent {
    constructor(h, y) {
      super(y), this.proxy = typeof h == "string" ? new l.URL(h) : h, this.proxyHeaders = (y == null ? void 0 : y.headers) ?? {}, u("Creating new HttpProxyAgent instance: %o", this.proxy.href);
      const T = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""), g = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
      this.connectOpts = {
        ...y ? f(y, "headers") : null,
        host: T,
        port: g
      };
    }
    addRequest(h, y) {
      h._header = null, this.setRequestProps(h, y), super.addRequest(h, y);
    }
    setRequestProps(h, y) {
      const { proxy: T } = this, g = y.secureEndpoint ? "https:" : "http:", m = h.getHeader("host") || "localhost", E = `${g}//${m}`, C = new l.URL(h.path, E);
      y.port !== 80 && (C.port = String(y.port)), h.path = String(C);
      const P = typeof this.proxyHeaders == "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
      if (T.username || T.password) {
        const k = `${decodeURIComponent(T.username)}:${decodeURIComponent(T.password)}`;
        P["Proxy-Authorization"] = `Basic ${Buffer.from(k).toString("base64")}`;
      }
      P["Proxy-Connection"] || (P["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close");
      for (const k of Object.keys(P)) {
        const I = P[k];
        I && h.setHeader(k, I);
      }
    }
    async connect(h, y) {
      h._header = null, h.path.includes("://") || this.setRequestProps(h, y);
      let T, g;
      u("Regenerating stored HTTP header string for request"), h._implicitHeader(), h.outputData && h.outputData.length > 0 && (u("Patching connection write() output buffer with updated header"), T = h.outputData[0].data, g = T.indexOf(`\r
\r
`) + 4, h.outputData[0].data = h._header + T.substring(g), u("Output buffer: %o", h.outputData[0].data));
      let m;
      return this.proxy.protocol === "https:" ? (u("Creating `tls.Socket`: %o", this.connectOpts), m = o.connect(this.connectOpts)) : (u("Creating `net.Socket`: %o", this.connectOpts), m = i.connect(this.connectOpts)), await (0, a.once)(m, "connect"), m;
    }
  }
  d.protocols = ["http", "https"], Ee.HttpProxyAgent = d;
  function f(p, ...h) {
    const y = {};
    let T;
    for (T in p)
      h.includes(T) || (y[T] = p[T]);
    return y;
  }
  return Ee;
}
var Rm = wm();
const bm = "HTTPS_PROXY", km = "HTTP_PROXY", vm = "ALL_PROXY", Om = "NO_PROXY", Pm = "proxyPolicy", Ra = [];
let cd = !1;
const Nm = /* @__PURE__ */ new Map();
function ir(r) {
  if (process.env[r])
    return process.env[r];
  if (process.env[r.toLowerCase()])
    return process.env[r.toLowerCase()];
}
function Mm() {
  if (!process)
    return;
  const r = ir(bm), e = ir(vm), t = ir(km);
  return r || e || t;
}
function Dm(r, e, t) {
  if (e.length === 0)
    return !1;
  const n = new URL(r).hostname;
  if (t != null && t.has(n))
    return t.get(n);
  let i = !1;
  for (const o of e)
    o[0] === "." ? (n.endsWith(o) || n.length === o.length - 1 && n === o.slice(1)) && (i = !0) : n === o && (i = !0);
  return t == null || t.set(n, i), i;
}
function Um() {
  const r = ir(Om);
  return cd = !0, r ? r.split(",").map((e) => e.trim()).filter((e) => e.length) : [];
}
function xm() {
  const r = Mm();
  return r ? new URL(r) : void 0;
}
function ba(r) {
  let e;
  try {
    e = new URL(r.host);
  } catch {
    throw new Error(`Expecting a valid host string in proxy settings, but found "${r.host}".`);
  }
  return e.port = String(r.port), r.username && (e.username = r.username), r.password && (e.password = r.password), e;
}
function ka(r, e, t) {
  if (r.agent)
    return;
  const i = new URL(r.url).protocol !== "https:";
  r.tlsSettings && Xe.warning("TLS settings are not supported in combination with custom Proxy, certificates provided to the client will be ignored.");
  const o = r.headers.toJSON();
  i ? (e.httpProxyAgent || (e.httpProxyAgent = new Rm.HttpProxyAgent(t, { headers: o })), r.agent = e.httpProxyAgent) : (e.httpsProxyAgent || (e.httpsProxyAgent = new Sm.HttpsProxyAgent(t, { headers: o })), r.agent = e.httpsProxyAgent);
}
function Lm(r, e) {
  cd || Ra.push(...Um());
  const t = r ? ba(r) : xm(), n = {};
  return {
    name: Pm,
    async sendRequest(i, o) {
      return !i.proxySettings && t && !Dm(i.url, Ra, Nm) ? ka(i, n, t) : i.proxySettings && ka(i, n, ba(i.proxySettings)), o(i);
    }
  };
}
const Hm = "agentPolicy";
function $m(r) {
  return {
    name: Hm,
    sendRequest: async (e, t) => (e.agent || (e.agent = r), t(e))
  };
}
const Bm = "tlsPolicy";
function Fm(r) {
  return {
    name: Bm,
    sendRequest: async (e, t) => (e.tlsSettings || (e.tlsSettings = r), t(e))
  };
}
function ld(r) {
  return typeof r.stream == "function";
}
async function* va() {
  const r = this.getReader();
  try {
    for (; ; ) {
      const { done: e, value: t } = await r.read();
      if (e)
        return;
      yield t;
    }
  } finally {
    r.releaseLock();
  }
}
function zm(r) {
  r[Symbol.asyncIterator] || (r[Symbol.asyncIterator] = va.bind(r)), r.values || (r.values = va.bind(r));
}
function Oa(r) {
  return r instanceof ReadableStream ? (zm(r), Wi.fromWeb(r)) : r;
}
function qm(r) {
  return r instanceof Uint8Array ? Wi.from(Buffer.from(r)) : ld(r) ? Oa(r.stream()) : Oa(r);
}
async function Gm(r) {
  return function() {
    const e = r.map((t) => typeof t == "function" ? t() : t).map(qm);
    return Wi.from((async function* () {
      for (const t of e)
        for await (const n of t)
          yield n;
    })());
  };
}
function Vm() {
  return `----AzSDKFormBoundary${jl()}`;
}
function jm(r) {
  let e = "";
  for (const [t, n] of r)
    e += `${t}: ${n}\r
`;
  return e;
}
function Km(r) {
  return r instanceof Uint8Array ? r.byteLength : ld(r) ? r.size === -1 ? void 0 : r.size : void 0;
}
function Ym(r) {
  let e = 0;
  for (const t of r) {
    const n = Km(t);
    if (n === void 0)
      return;
    e += n;
  }
  return e;
}
async function Wm(r, e, t) {
  const n = [
    ft(`--${t}`, "utf-8"),
    ...e.flatMap((o) => [
      ft(`\r
`, "utf-8"),
      ft(jm(o.headers), "utf-8"),
      ft(`\r
`, "utf-8"),
      o.body,
      ft(`\r
--${t}`, "utf-8")
    ]),
    ft(`--\r
\r
`, "utf-8")
  ], i = Ym(n);
  i && r.headers.set("Content-Length", i), r.body = await Gm(n);
}
const dd = "multipartPolicy", Qm = 70, Jm = new Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'()+,-./:=?");
function Zm(r) {
  if (r.length > Qm)
    throw new Error(`Multipart boundary "${r}" exceeds maximum length of 70 characters`);
  if (Array.from(r).some((e) => !Jm.has(e)))
    throw new Error(`Multipart boundary "${r}" contains invalid characters`);
}
function Xm() {
  return {
    name: dd,
    async sendRequest(r, e) {
      if (!r.multipartBody)
        return e(r);
      if (r.body)
        throw new Error("multipartBody and regular body cannot be set at the same time");
      let t = r.multipartBody.boundary;
      const n = r.headers.get("Content-Type") ?? "multipart/mixed", i = n.match(/^(multipart\/[^ ;]+)(?:; *boundary=(.+))?$/);
      if (!i)
        throw new Error(`Got multipart request body, but content-type header was not multipart: ${n}`);
      const [, o, s] = i;
      if (s && t && s !== t)
        throw new Error(`Multipart boundary was specified as ${s} in the header, but got ${t} in the request body`);
      return t ?? (t = s), t ? Zm(t) : t = Vm(), r.headers.set("Content-Type", `${o}; boundary=${t}`), await Wm(r, r.multipartBody.parts, t), r.multipartBody = void 0, e(r);
    }
  };
}
function ey() {
  return Lp();
}
const Zt = Cr("core-rest-pipeline");
function ty(r = {}) {
  return Qp({
    logger: Zt.info,
    ...r
  });
}
function ny(r = {}) {
  return Zp(r);
}
function ry() {
  return "User-Agent";
}
async function iy(r) {
  if (rr && rr.versions) {
    const e = `${Dr.type()} ${Dr.release()}; ${Dr.arch()}`, t = rr.versions;
    t.bun ? r.set("Bun", `${t.bun} (${e})`) : t.deno ? r.set("Deno", `${t.deno} (${e})`) : t.node && r.set("Node", `${t.node} (${e})`);
  }
}
const ud = "1.22.2", oy = 3;
function sy(r) {
  const e = [];
  for (const [t, n] of r) {
    const i = n ? `${t}/${n}` : t;
    e.push(i);
  }
  return e.join(" ");
}
function ay() {
  return ry();
}
async function hd(r) {
  const e = /* @__PURE__ */ new Map();
  e.set("core-rest-pipeline", ud), await iy(e);
  const t = sy(e);
  return r ? `${r} ${t}` : t;
}
const Pa = ay(), cy = "userAgentPolicy";
function ly(r = {}) {
  const e = hd(r.userAgentPrefix);
  return {
    name: cy,
    async sendRequest(t, n) {
      return t.headers.has(Pa) || t.headers.set(Pa, await e), n(t);
    }
  };
}
const fd = Symbol("rawContent");
function gd(r) {
  return typeof r[fd] == "function";
}
function dy(r) {
  return gd(r) ? r[fd]() : r;
}
const pd = dd;
function uy() {
  const r = Xm();
  return {
    name: pd,
    sendRequest: async (e, t) => {
      if (e.multipartBody)
        for (const n of e.multipartBody.parts)
          gd(n.body) && (n.body = dy(n.body));
      return r.sendRequest(e, t);
    }
  };
}
function hy() {
  return em();
}
function fy(r = {}) {
  return pm(r);
}
function gy() {
  return Tm();
}
function py(r, e) {
  return Lm(r);
}
const my = "setClientRequestIdPolicy";
function yy(r = "x-ms-client-request-id") {
  return {
    name: my,
    async sendRequest(e, t) {
      return e.headers.has(r) || e.headers.set(r, e.requestId), t(e);
    }
  };
}
function Ty(r) {
  return $m(r);
}
function Ey(r) {
  return Fm(r);
}
const Tr = Et;
function md(r) {
  return Bp(r);
}
const Ay = "tracingPolicy";
function Cy(r = {}) {
  const e = hd(r.userAgentPrefix), t = new vr({
    additionalAllowedQueryParameters: r.additionalAllowedQueryParameters
  }), n = _y();
  return {
    name: Ay,
    async sendRequest(i, o) {
      if (!n)
        return o(i);
      const s = await e, a = {
        "http.url": t.sanitizeUrl(i.url),
        "http.method": i.method,
        "http.user_agent": s,
        requestId: i.requestId
      };
      s && (a["http.user_agent"] = s);
      const { span: c, tracingContext: l } = Iy(n, i, a) ?? {};
      if (!c || !l)
        return o(i);
      try {
        const u = await n.withContext(l, o, i);
        return wy(c, u), u;
      } catch (u) {
        throw Sy(c, u), u;
      }
    }
  };
}
function _y() {
  try {
    return gc({
      namespace: "",
      packageName: "@azure/core-rest-pipeline",
      packageVersion: ud
    });
  } catch (r) {
    Zt.warning(`Error when creating the TracingClient: ${Or(r)}`);
    return;
  }
}
function Iy(r, e, t) {
  try {
    const { span: n, updatedOptions: i } = r.startSpan(`HTTP ${e.method}`, { tracingOptions: e.tracingOptions }, {
      spanKind: "client",
      spanAttributes: t
    });
    if (!n.isRecording()) {
      n.end();
      return;
    }
    const o = r.createRequestHeaders(i.tracingOptions.tracingContext);
    for (const [s, a] of Object.entries(o))
      e.headers.set(s, a);
    return { span: n, tracingContext: i.tracingOptions.tracingContext };
  } catch (n) {
    Zt.warning(`Skipping creating a tracing span due to an error: ${Or(n)}`);
    return;
  }
}
function Sy(r, e) {
  try {
    r.setStatus({
      status: "error",
      error: Yl(e) ? e : void 0
    }), md(e) && e.statusCode && r.setAttribute("http.status_code", e.statusCode), r.end();
  } catch (t) {
    Zt.warning(`Skipping tracing span processing due to an error: ${Or(t)}`);
  }
}
function wy(r, e) {
  try {
    r.setAttribute("http.status_code", e.status);
    const t = e.headers.get("x-ms-request-id");
    t && r.setAttribute("serviceRequestId", t), e.status >= 400 && r.setStatus({
      status: "error"
    }), r.end();
  } catch (t) {
    Zt.warning(`Skipping tracing span processing due to an error: ${Or(t)}`);
  }
}
function yd(r) {
  if (r instanceof AbortSignal)
    return { abortSignal: r };
  if (r.aborted)
    return { abortSignal: AbortSignal.abort(r.reason) };
  const e = new AbortController();
  let t = !0;
  function n() {
    t && (r.removeEventListener("abort", i), t = !1);
  }
  function i() {
    e.abort(r.reason), n();
  }
  return r.addEventListener("abort", i), { abortSignal: e.signal, cleanup: n };
}
const Ry = "wrapAbortSignalLikePolicy";
function by() {
  return {
    name: Ry,
    sendRequest: async (r, e) => {
      if (!r.abortSignal)
        return e(r);
      const { abortSignal: t, cleanup: n } = yd(r.abortSignal);
      r.abortSignal = t;
      try {
        return await e(r);
      } finally {
        n == null || n();
      }
    }
  };
}
function ky(r) {
  var t;
  const e = ey();
  return zi && (r.agent && e.addPolicy(Ty(r.agent)), r.tlsOptions && e.addPolicy(Ey(r.tlsOptions)), e.addPolicy(py(r.proxyOptions)), e.addPolicy(hy())), e.addPolicy(by()), e.addPolicy(gy(), { beforePolicies: [pd] }), e.addPolicy(ly(r.userAgentOptions)), e.addPolicy(yy((t = r.telemetryOptions) == null ? void 0 : t.clientRequestIdHeaderName)), e.addPolicy(uy(), { afterPhase: "Deserialize" }), e.addPolicy(fy(r.retryOptions), { phase: "Retry" }), e.addPolicy(Cy({ ...r.userAgentOptions, ...r.loggingOptions }), {
    afterPhase: "Retry"
  }), zi && e.addPolicy(ny(r.redirectOptions), { afterPhase: "Retry" }), e.addPolicy(ty(r.loggingOptions), { afterPhase: "Sign" }), e;
}
function vy() {
  const r = Yp();
  return {
    async sendRequest(e) {
      const { abortSignal: t, cleanup: n } = e.abortSignal ? yd(e.abortSignal) : {};
      try {
        return e.abortSignal = t, await r.sendRequest(e);
      } finally {
        n == null || n();
      }
    }
  };
}
function or(r) {
  return xn(r);
}
function Nn(r) {
  return xp(r);
}
const Oy = Cr("core-rest-pipeline retryPolicy");
function Py(r, e = { maxRetries: oy }) {
  return sd(r, {
    logger: Oy,
    ...e
  });
}
const Ny = {
  forcedRefreshWindowInMs: 1e3,
  // Force waiting for a refresh 1s before the token expires
  retryIntervalInMs: 3e3,
  // Allow refresh attempts every 3s
  refreshWindowInMs: 1e3 * 60 * 2
  // Start refreshing 2m before expiry
};
async function My(r, e, t) {
  async function n() {
    if (Date.now() < t)
      try {
        return await r();
      } catch {
        return null;
      }
    else {
      const o = await r();
      if (o === null)
        throw new Error("Failed to refresh access token.");
      return o;
    }
  }
  let i = await n();
  for (; i === null; )
    await wp(e), i = await n();
  return i;
}
function Dy(r, e) {
  let t = null, n = null, i;
  const o = {
    ...Ny,
    ...e
  }, s = {
    /**
     * Produces true if a refresh job is currently in progress.
     */
    get isRefreshing() {
      return t !== null;
    },
    /**
     * Produces true if the cycler SHOULD refresh (we are within the refresh
     * window and not already refreshing)
     */
    get shouldRefresh() {
      return s.isRefreshing ? !1 : n != null && n.refreshAfterTimestamp && n.refreshAfterTimestamp < Date.now() ? !0 : ((n == null ? void 0 : n.expiresOnTimestamp) ?? 0) - o.refreshWindowInMs < Date.now();
    },
    /**
     * Produces true if the cycler MUST refresh (null or nearly-expired
     * token).
     */
    get mustRefresh() {
      return n === null || n.expiresOnTimestamp - o.forcedRefreshWindowInMs < Date.now();
    }
  };
  function a(c, l) {
    return s.isRefreshing || (t = My(
      () => r.getToken(c, l),
      o.retryIntervalInMs,
      // If we don't have a token, then we should timeout immediately
      (n == null ? void 0 : n.expiresOnTimestamp) ?? Date.now()
    ).then((d) => (t = null, n = d, i = l.tenantId, n)).catch((d) => {
      throw t = null, n = null, i = void 0, d;
    })), t;
  }
  return async (c, l) => {
    const u = !!l.claims, d = i !== l.tenantId;
    return u && (n = null), d || u || s.mustRefresh ? a(c, l) : (s.shouldRefresh && a(c, l), n);
  };
}
const Uy = "bearerTokenAuthenticationPolicy";
async function Zn(r, e) {
  try {
    return [await e(r), void 0];
  } catch (t) {
    if (md(t) && t.response)
      return [t.response, t];
    throw t;
  }
}
async function xy(r) {
  const { scopes: e, getAccessToken: t, request: n } = r, i = {
    abortSignal: n.abortSignal,
    tracingOptions: n.tracingOptions,
    enableCae: !0
  }, o = await t(e, i);
  o && r.request.headers.set("Authorization", `Bearer ${o.token}`);
}
function Na(r) {
  return r.status === 401 && r.headers.has("WWW-Authenticate");
}
async function Ma(r, e) {
  const { scopes: t } = r, n = await r.getAccessToken(t, {
    enableCae: !0,
    claims: e
  });
  return n ? (r.request.headers.set("Authorization", `${n.tokenType ?? "Bearer"} ${n.token}`), !0) : !1;
}
function Ly(r) {
  var a, c;
  const { credential: e, scopes: t, challengeCallbacks: n } = r, i = r.logger || Zt, o = {
    authorizeRequest: ((a = n == null ? void 0 : n.authorizeRequest) == null ? void 0 : a.bind(n)) ?? xy,
    authorizeRequestOnChallenge: (c = n == null ? void 0 : n.authorizeRequestOnChallenge) == null ? void 0 : c.bind(n)
  }, s = e ? Dy(
    e
    /* , options */
  ) : () => Promise.resolve(null);
  return {
    name: Uy,
    /**
     * If there's no challenge parameter:
     * - It will try to retrieve the token using the cache, or the credential's getToken.
     * - Then it will try the next policy with or without the retrieved token.
     *
     * It uses the challenge parameters to:
     * - Skip a first attempt to get the token from the credential if there's no cached token,
     *   since it expects the token to be retrievable only after the challenge.
     * - Prepare the outgoing request if the `prepareRequest` method has been provided.
     * - Send an initial request to receive the challenge if it fails.
     * - Process a challenge if the response contains it.
     * - Retrieve a token with the challenge information, then re-send the request.
     */
    async sendRequest(l, u) {
      if (!l.url.toLowerCase().startsWith("https://"))
        throw new Error("Bearer token authentication is not permitted for non-TLS protected (non-https) URLs.");
      await o.authorizeRequest({
        scopes: Array.isArray(t) ? t : [t],
        request: l,
        getAccessToken: s,
        logger: i
      });
      let d, f, p;
      if ([d, f] = await Zn(l, u), Na(d)) {
        let h = Da(d.headers.get("WWW-Authenticate"));
        if (h) {
          let y;
          try {
            y = atob(h);
          } catch {
            return i.warning(`The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${h}`), d;
          }
          p = await Ma({
            scopes: Array.isArray(t) ? t : [t],
            response: d,
            request: l,
            getAccessToken: s,
            logger: i
          }, y), p && ([d, f] = await Zn(l, u));
        } else if (o.authorizeRequestOnChallenge && (p = await o.authorizeRequestOnChallenge({
          scopes: Array.isArray(t) ? t : [t],
          request: l,
          response: d,
          getAccessToken: s,
          logger: i
        }), p && ([d, f] = await Zn(l, u)), Na(d) && (h = Da(d.headers.get("WWW-Authenticate")), h))) {
          let y;
          try {
            y = atob(h);
          } catch {
            return i.warning(`The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${h}`), d;
          }
          p = await Ma({
            scopes: Array.isArray(t) ? t : [t],
            response: d,
            request: l,
            getAccessToken: s,
            logger: i
          }, y), p && ([d, f] = await Zn(l, u));
        }
      }
      if (f)
        throw f;
      return d;
    }
  };
}
function Hy(r) {
  const e = /(\w+)\s+((?:\w+=(?:"[^"]*"|[^,]*),?\s*)+)/g, t = /(\w+)="([^"]*)"/g, n = [];
  let i;
  for (; (i = e.exec(r)) !== null; ) {
    const o = i[1], s = i[2], a = {};
    let c;
    for (; (c = t.exec(s)) !== null; )
      a[c[1]] = c[2];
    n.push({ scheme: o, params: a });
  }
  return n;
}
function Da(r) {
  var t;
  return r ? (t = Hy(r).find((n) => n.scheme === "Bearer" && n.params.claims && n.params.error === "insufficient_claims")) == null ? void 0 : t.params.claims : void 0;
}
var pn = {}, Ua;
function $y() {
  return Ua || (Ua = 1, Object.defineProperty(pn, "__esModule", { value: !0 }), pn.state = void 0, pn.state = {
    operationRequestMap: /* @__PURE__ */ new WeakMap()
  }), pn;
}
var By = $y();
const xa = By.state;
function Gt(r, e, t) {
  let n = e.parameterPath;
  const i = e.mapper;
  let o;
  if (typeof n == "string" && (n = [n]), Array.isArray(n)) {
    if (n.length > 0)
      if (i.isConstant)
        o = i.defaultValue;
      else {
        let s = La(r, n);
        !s.propertyFound && t && (s = La(t, n));
        let a = !1;
        s.propertyFound || (a = i.required || n[0] === "options" && n.length === 2), o = a ? i.defaultValue : s.propertyValue;
      }
  } else {
    i.required && (o = {});
    for (const s in n) {
      const a = i.type.modelProperties[s], c = n[s], l = Gt(r, {
        parameterPath: c,
        mapper: a
      }, t);
      l !== void 0 && (o || (o = {}), o[s] = l);
    }
  }
  return o;
}
function La(r, e) {
  const t = { propertyFound: !1 };
  let n = 0;
  for (; n < e.length; ++n) {
    const i = e[n];
    if (r && i in r)
      r = r[i];
    else
      break;
  }
  return n === e.length && (t.propertyValue = r, t.propertyFound = !0), t;
}
const Td = Symbol.for("@azure/core-client original request");
function Fy(r) {
  return Td in r;
}
function Xt(r) {
  if (Fy(r))
    return Xt(r[Td]);
  let e = xa.operationRequestMap.get(r);
  return e || (e = {}, xa.operationRequestMap.set(r, e)), e;
}
const zy = ["application/json", "text/json"], qy = ["application/xml", "application/atom+xml"], Gy = "deserializationPolicy";
function Vy(r = {}) {
  var s, a;
  const e = ((s = r.expectedContentTypes) == null ? void 0 : s.json) ?? zy, t = ((a = r.expectedContentTypes) == null ? void 0 : a.xml) ?? qy, n = r.parseXML, i = r.serializerOptions, o = {
    xml: {
      rootName: (i == null ? void 0 : i.xml.rootName) ?? "",
      includeRoot: (i == null ? void 0 : i.xml.includeRoot) ?? !1,
      xmlCharKey: (i == null ? void 0 : i.xml.xmlCharKey) ?? nd
    }
  };
  return {
    name: Gy,
    async sendRequest(c, l) {
      const u = await l(c);
      return Yy(e, t, u, o, n);
    }
  };
}
function jy(r) {
  let e;
  const t = r.request, n = Xt(t), i = n == null ? void 0 : n.operationSpec;
  return i && (n != null && n.operationResponseGetter ? e = n == null ? void 0 : n.operationResponseGetter(i, r) : e = i.responses[r.status]), e;
}
function Ky(r) {
  const e = r.request, t = Xt(e), n = t == null ? void 0 : t.shouldDeserialize;
  let i;
  return n === void 0 ? i = !0 : typeof n == "boolean" ? i = n : i = n(r), i;
}
async function Yy(r, e, t, n, i) {
  const o = await Jy(r, e, t, n, i);
  if (!Ky(o))
    return o;
  const s = Xt(o.request), a = s == null ? void 0 : s.operationSpec;
  if (!a || !a.responses)
    return o;
  const c = jy(o), { error: l, shouldReturnResponse: u } = Qy(o, a, c, n);
  if (l)
    throw l;
  if (u)
    return o;
  if (c) {
    if (c.bodyMapper) {
      let d = o.parsedBody;
      a.isXML && c.bodyMapper.type.name === Bt.Sequence && (d = typeof d == "object" ? d[c.bodyMapper.xmlElementName] : []);
      try {
        o.parsedBody = a.serializer.deserialize(c.bodyMapper, d, "operationRes.parsedBody", n);
      } catch (f) {
        throw new Tr(`Error ${f} occurred in deserializing the responseBody - ${o.bodyAsText}`, {
          statusCode: o.status,
          request: o.request,
          response: o
        });
      }
    } else a.httpMethod === "HEAD" && (o.parsedBody = t.status >= 200 && t.status < 300);
    c.headersMapper && (o.parsedHeaders = a.serializer.deserialize(c.headersMapper, o.headers.toJSON(), "operationRes.parsedHeaders", { xml: {}, ignoreUnknownProperties: !0 }));
  }
  return o;
}
function Wy(r) {
  const e = Object.keys(r.responses);
  return e.length === 0 || e.length === 1 && e[0] === "default";
}
function Qy(r, e, t, n) {
  var d, f, p, h, y;
  const i = 200 <= r.status && r.status < 300;
  if (Wy(e) ? i : !!t)
    if (t) {
      if (!t.isError)
        return { error: null, shouldReturnResponse: !1 };
    } else
      return { error: null, shouldReturnResponse: !1 };
  const s = t ?? e.responses.default, a = (d = r.request.streamResponseStatusCodes) != null && d.has(r.status) ? `Unexpected status code: ${r.status}` : r.bodyAsText, c = new Tr(a, {
    statusCode: r.status,
    request: r.request,
    response: r
  });
  if (!s && !((p = (f = r.parsedBody) == null ? void 0 : f.error) != null && p.code && ((y = (h = r.parsedBody) == null ? void 0 : h.error) != null && y.message)))
    throw c;
  const l = s == null ? void 0 : s.bodyMapper, u = s == null ? void 0 : s.headersMapper;
  try {
    if (r.parsedBody) {
      const T = r.parsedBody;
      let g;
      if (l) {
        let E = T;
        if (e.isXML && l.type.name === Bt.Sequence) {
          E = [];
          const C = l.xmlElementName;
          typeof T == "object" && C && (E = T[C]);
        }
        g = e.serializer.deserialize(l, E, "error.response.parsedBody", n);
      }
      const m = T.error || g || T;
      c.code = m.code, m.message && (c.message = m.message), l && (c.response.parsedBody = g);
    }
    r.headers && u && (c.response.parsedHeaders = e.serializer.deserialize(u, r.headers.toJSON(), "operationRes.parsedHeaders"));
  } catch (T) {
    c.message = `Error "${T.message}" occurred in deserializing the responseBody - "${r.bodyAsText}" for the default response.`;
  }
  return { error: c, shouldReturnResponse: !1 };
}
async function Jy(r, e, t, n, i) {
  var o;
  if (!((o = t.request.streamResponseStatusCodes) != null && o.has(t.status)) && t.bodyAsText) {
    const s = t.bodyAsText, a = t.headers.get("Content-Type") || "", c = a ? a.split(";").map((l) => l.toLowerCase()) : [];
    try {
      if (c.length === 0 || c.some((l) => r.indexOf(l) !== -1))
        return t.parsedBody = JSON.parse(s), t;
      if (c.some((l) => e.indexOf(l) !== -1)) {
        if (!i)
          throw new Error("Parsing XML not supported.");
        const l = await i(s, n.xml);
        return t.parsedBody = l, t;
      }
    } catch (l) {
      const u = `Error "${l}" occurred while parsing the response body - ${t.bodyAsText}.`, d = l.code || Tr.PARSE_ERROR;
      throw new Tr(u, {
        code: d,
        statusCode: t.status,
        request: t.request,
        response: t
      });
    }
  }
  return t;
}
function Zy(r) {
  const e = /* @__PURE__ */ new Set();
  for (const t in r.responses) {
    const n = r.responses[t];
    n.bodyMapper && n.bodyMapper.type.name === Bt.Stream && e.add(Number(t));
  }
  return e;
}
function rt(r) {
  const { parameterPath: e, mapper: t } = r;
  let n;
  return typeof e == "string" ? n = e : Array.isArray(e) ? n = e.join(".") : n = t.serializedName, n;
}
const Xy = "serializationPolicy";
function eT(r = {}) {
  const e = r.stringifyXML;
  return {
    name: Xy,
    async sendRequest(t, n) {
      const i = Xt(t), o = i == null ? void 0 : i.operationSpec, s = i == null ? void 0 : i.operationArguments;
      return o && s && (tT(t, s, o), nT(t, s, o, e)), n(t);
    }
  };
}
function tT(r, e, t) {
  var i, o;
  if (t.headerParameters)
    for (const s of t.headerParameters) {
      let a = Gt(e, s);
      if (a != null || s.mapper.required) {
        a = t.serializer.serialize(s.mapper, a, rt(s));
        const c = s.mapper.headerCollectionPrefix;
        if (c)
          for (const l of Object.keys(a))
            r.headers.set(c + l, a[l]);
        else
          r.headers.set(s.mapper.serializedName || rt(s), a);
      }
    }
  const n = (o = (i = e.options) == null ? void 0 : i.requestOptions) == null ? void 0 : o.customHeaders;
  if (n)
    for (const s of Object.keys(n))
      r.headers.set(s, n[s]);
}
function nT(r, e, t, n = function() {
  throw new Error("XML serialization unsupported!");
}) {
  var a, c;
  const i = (a = e.options) == null ? void 0 : a.serializerOptions, o = {
    xml: {
      rootName: (i == null ? void 0 : i.xml.rootName) ?? "",
      includeRoot: (i == null ? void 0 : i.xml.includeRoot) ?? !1,
      xmlCharKey: (i == null ? void 0 : i.xml.xmlCharKey) ?? nd
    }
  }, s = o.xml.xmlCharKey;
  if (t.requestBody && t.requestBody.mapper) {
    r.body = Gt(e, t.requestBody);
    const l = t.requestBody.mapper, { required: u, serializedName: d, xmlName: f, xmlElementName: p, xmlNamespace: h, xmlNamespacePrefix: y, nullable: T } = l, g = l.type.name;
    try {
      if (r.body !== void 0 && r.body !== null || T && r.body === null || u) {
        const m = rt(t.requestBody);
        r.body = t.serializer.serialize(l, r.body, m, o);
        const E = g === Bt.Stream;
        if (t.isXML) {
          const C = y ? `xmlns:${y}` : "xmlns", P = rT(h, C, g, r.body, o);
          g === Bt.Sequence ? r.body = n(iT(P, p || f || d, C, h), { rootName: f || d, xmlCharKey: s }) : E || (r.body = n(P, {
            rootName: f || d,
            xmlCharKey: s
          }));
        } else {
          if (g === Bt.String && ((c = t.contentType) != null && c.match("text/plain") || t.mediaType === "text"))
            return;
          E || (r.body = JSON.stringify(r.body));
        }
      }
    } catch (m) {
      throw new Error(`Error "${m.message}" occurred in serializing the payload - ${JSON.stringify(d, void 0, "  ")}.`);
    }
  } else if (t.formDataParameters && t.formDataParameters.length > 0) {
    r.formData = {};
    for (const l of t.formDataParameters) {
      const u = Gt(e, l);
      if (u != null) {
        const d = l.mapper.serializedName || rt(l);
        r.formData[d] = t.serializer.serialize(l.mapper, u, rt(l), o);
      }
    }
  }
}
function rT(r, e, t, n, i) {
  if (r && !["Composite", "Sequence", "Dictionary"].includes(t)) {
    const o = {};
    return o[i.xml.xmlCharKey] = n, o[td] = { [e]: r }, o;
  }
  return n;
}
function iT(r, e, t, n) {
  if (Array.isArray(r) || (r = [r]), !t || !n)
    return { [e]: r };
  const i = { [e]: r };
  return i[td] = { [t]: n }, i;
}
function oT(r = {}) {
  const e = ky(r ?? {});
  return r.credentialOptions && e.addPolicy(Ly({
    credential: r.credentialOptions.credential,
    scopes: r.credentialOptions.credentialScopes
  })), e.addPolicy(eT(r.serializationOptions), { phase: "Serialize" }), e.addPolicy(Vy(r.deserializationOptions), {
    phase: "Deserialize"
  }), e;
}
let Si;
function sT() {
  return Si || (Si = vy()), Si;
}
const aT = {
  CSV: ",",
  SSV: " ",
  Multi: "Multi",
  TSV: "	",
  Pipes: "|"
};
function cT(r, e, t, n) {
  const i = lT(e, t, n);
  let o = !1, s = Ha(r, i);
  if (e.path) {
    let l = Ha(e.path, i);
    e.path === "/{nextLink}" && l.startsWith("/") && (l = l.substring(1)), dT(l) ? (s = l, o = !0) : s = uT(s, l);
  }
  const { queryParams: a, sequenceParams: c } = hT(e, t, n);
  return s = gT(s, a, c, o), s;
}
function Ha(r, e) {
  let t = r;
  for (const [n, i] of e)
    t = t.split(n).join(i);
  return t;
}
function lT(r, e, t) {
  var i;
  const n = /* @__PURE__ */ new Map();
  if ((i = r.urlParameters) != null && i.length)
    for (const o of r.urlParameters) {
      let s = Gt(e, o, t);
      const a = rt(o);
      s = r.serializer.serialize(o.mapper, s, a), o.skipEncoding || (s = encodeURIComponent(s)), n.set(`{${o.mapper.serializedName || a}}`, s);
    }
  return n;
}
function dT(r) {
  return r.includes("://");
}
function uT(r, e) {
  if (!e)
    return r;
  const t = new URL(r);
  let n = t.pathname;
  n.endsWith("/") || (n = `${n}/`), e.startsWith("/") && (e = e.substring(1));
  const i = e.indexOf("?");
  if (i !== -1) {
    const o = e.substring(0, i), s = e.substring(i + 1);
    n = n + o, s && (t.search = t.search ? `${t.search}&${s}` : s);
  } else
    n = n + e;
  return t.pathname = n, t.toString();
}
function hT(r, e, t) {
  var o;
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
  if ((o = r.queryParameters) != null && o.length)
    for (const s of r.queryParameters) {
      s.mapper.type.name === "Sequence" && s.mapper.serializedName && i.add(s.mapper.serializedName);
      let a = Gt(e, s, t);
      if (a != null || s.mapper.required) {
        a = r.serializer.serialize(s.mapper, a, rt(s));
        const c = s.collectionFormat ? aT[s.collectionFormat] : "";
        if (Array.isArray(a) && (a = a.map((l) => l ?? "")), s.collectionFormat === "Multi" && a.length === 0)
          continue;
        Array.isArray(a) && (s.collectionFormat === "SSV" || s.collectionFormat === "TSV") && (a = a.join(c)), s.skipEncoding || (Array.isArray(a) ? a = a.map((l) => encodeURIComponent(l)) : a = encodeURIComponent(a)), Array.isArray(a) && (s.collectionFormat === "CSV" || s.collectionFormat === "Pipes") && (a = a.join(c)), n.set(s.mapper.serializedName || rt(s), a);
      }
    }
  return {
    queryParams: n,
    sequenceParams: i
  };
}
function fT(r) {
  const e = /* @__PURE__ */ new Map();
  if (!r || r[0] !== "?")
    return e;
  r = r.slice(1);
  const t = r.split("&");
  for (const n of t) {
    const [i, o] = n.split("=", 2), s = e.get(i);
    s ? Array.isArray(s) ? s.push(o) : e.set(i, [s, o]) : e.set(i, o);
  }
  return e;
}
function gT(r, e, t, n = !1) {
  if (e.size === 0)
    return r;
  const i = new URL(r), o = fT(i.search);
  for (const [a, c] of e) {
    const l = o.get(a);
    if (Array.isArray(l))
      if (Array.isArray(c)) {
        l.push(...c);
        const u = new Set(l);
        o.set(a, Array.from(u));
      } else
        l.push(c);
    else l ? (Array.isArray(c) ? c.unshift(l) : t.has(a) && o.set(a, [l, c]), n || o.set(a, c)) : o.set(a, c);
  }
  const s = [];
  for (const [a, c] of o)
    if (typeof c == "string")
      s.push(`${a}=${c}`);
    else if (Array.isArray(c))
      for (const l of c)
        s.push(`${a}=${l}`);
    else
      s.push(`${a}=${c}`);
  return i.search = s.length ? `?${s.join("&")}` : "", i.toString();
}
const pT = Cr("core-client");
class mT {
  /**
   * The ServiceClient constructor
   * @param options - The service client options that govern the behavior of the client.
   */
  constructor(e = {}) {
    /**
     * If specified, this is the base URI that requests will be made against for this ServiceClient.
     * If it is not specified, then all OperationSpecs must contain a baseUrl property.
     */
    b(this, "_endpoint");
    /**
     * The default request content type for the service.
     * Used if no requestContentType is present on an OperationSpec.
     */
    b(this, "_requestContentType");
    /**
     * Set to true if the request is sent over HTTP instead of HTTPS
     */
    b(this, "_allowInsecureConnection");
    /**
     * The HTTP client that will be used to send requests.
     */
    b(this, "_httpClient");
    /**
     * The pipeline used by this client to make requests
     */
    b(this, "pipeline");
    var t;
    if (this._requestContentType = e.requestContentType, this._endpoint = e.endpoint ?? e.baseUri, e.baseUri && pT.warning("The baseUri option for SDK Clients has been deprecated, please use endpoint instead."), this._allowInsecureConnection = e.allowInsecureConnection, this._httpClient = e.httpClient || sT(), this.pipeline = e.pipeline || yT(e), (t = e.additionalPolicies) != null && t.length)
      for (const { policy: n, position: i } of e.additionalPolicies) {
        const o = i === "perRetry" ? "Sign" : void 0;
        this.pipeline.addPolicy(n, {
          afterPhase: o
        });
      }
  }
  /**
   * Send the provided httpRequest.
   */
  async sendRequest(e) {
    return this.pipeline.sendRequest(this._httpClient, e);
  }
  /**
   * Send an HTTP request that is populated using the provided OperationSpec.
   * @typeParam T - The typed result of the request, based on the OperationSpec.
   * @param operationArguments - The arguments that the HTTP request's templated values will be populated from.
   * @param operationSpec - The OperationSpec to use to populate the httpRequest.
   */
  async sendOperationRequest(e, t) {
    const n = t.baseUrl || this._endpoint;
    if (!n)
      throw new Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a endpoint string property that contains the base URL to use.");
    const i = cT(n, t, e, this), o = Nn({
      url: i
    });
    o.method = t.httpMethod;
    const s = Xt(o);
    s.operationSpec = t, s.operationArguments = e;
    const a = t.contentType || this._requestContentType;
    a && t.requestBody && o.headers.set("Content-Type", a);
    const c = e.options;
    if (c) {
      const l = c.requestOptions;
      l && (l.timeout && (o.timeout = l.timeout), l.onUploadProgress && (o.onUploadProgress = l.onUploadProgress), l.onDownloadProgress && (o.onDownloadProgress = l.onDownloadProgress), l.shouldDeserialize !== void 0 && (s.shouldDeserialize = l.shouldDeserialize), l.allowInsecureConnection && (o.allowInsecureConnection = !0)), c.abortSignal && (o.abortSignal = c.abortSignal), c.tracingOptions && (o.tracingOptions = c.tracingOptions);
    }
    this._allowInsecureConnection && (o.allowInsecureConnection = !0), o.streamResponseStatusCodes === void 0 && (o.streamResponseStatusCodes = Zy(t));
    try {
      const l = await this.sendRequest(o), u = ma(l, t.responses[l.status]);
      return c != null && c.onResponse && c.onResponse(l, u), u;
    } catch (l) {
      if (typeof l == "object" && (l != null && l.response)) {
        const u = l.response, d = ma(u, t.responses[l.statusCode] || t.responses.default);
        l.details = d, c != null && c.onResponse && c.onResponse(u, d, l);
      }
      throw l;
    }
  }
}
function yT(r) {
  const e = TT(r), t = r.credential && e ? { credentialScopes: e, credential: r.credential } : void 0;
  return oT({
    ...r,
    credentialOptions: t
  });
}
function TT(r) {
  if (r.credentialScopes)
    return r.credentialScopes;
  if (r.endpoint)
    return `${r.endpoint}/.default`;
  if (r.baseUri)
    return `${r.baseUri}/.default`;
  if (r.credential && !r.credentialScopes)
    throw new Error("When using credentials, the ServiceClientOptions must contain either a endpoint or a credentialScopes. Unable to create a bearerTokenAuthenticationPolicy");
}
function ET(r) {
  return r === "adfs" ? "oauth2/token" : "oauth2/v2.0/token";
}
const $a = "/.default", AT = "Specifying a `clientId` or `resourceId` is not supported by the Service Fabric managed identity environment. The managed identity configuration is determined by the Service Fabric cluster resource configuration. See https://aka.ms/servicefabricmi for more information";
function Fo(r) {
  let e = "";
  if (Array.isArray(r)) {
    if (r.length !== 1)
      return;
    e = r[0];
  } else typeof r == "string" && (e = r);
  return e.endsWith($a) ? e.substr(0, e.lastIndexOf($a)) : e;
}
function CT(r) {
  if (typeof r.expires_on == "number")
    return r.expires_on * 1e3;
  if (typeof r.expires_on == "string") {
    const e = +r.expires_on;
    if (!isNaN(e))
      return e * 1e3;
    const t = Date.parse(r.expires_on);
    if (!isNaN(t))
      return t;
  }
  if (typeof r.expires_in == "number")
    return Date.now() + r.expires_in * 1e3;
  throw new Error(`Failed to parse token expiration from body. expires_in="${r.expires_in}", expires_on="${r.expires_on}"`);
}
function _T(r) {
  if (r.refresh_on) {
    if (typeof r.refresh_on == "number")
      return r.refresh_on * 1e3;
    if (typeof r.refresh_on == "string") {
      const e = +r.refresh_on;
      if (!isNaN(e))
        return e * 1e3;
      const t = Date.parse(r.refresh_on);
      if (!isNaN(t))
        return t;
    }
    throw new Error(`Failed to parse refresh_on from body. refresh_on="${r.refresh_on}"`);
  } else
    return;
}
const mn = "noCorrelationId";
function IT(r) {
  let e = r == null ? void 0 : r.authorityHost;
  return Wl && (e = e ?? process.env.AZURE_AUTHORITY_HOST), e ?? eo;
}
class Vi extends mT {
  constructor(t) {
    var s, a;
    const n = `azsdk-js-identity/${ic}`, i = (s = t == null ? void 0 : t.userAgentOptions) != null && s.userAgentPrefix ? `${t.userAgentOptions.userAgentPrefix} ${n}` : `${n}`, o = IT(t);
    if (!o.startsWith("https:"))
      throw new Error("The authorityHost address must use the 'https' protocol.");
    super({
      requestContentType: "application/json; charset=utf-8",
      retryOptions: {
        maxRetries: 3
      },
      ...t,
      userAgentOptions: {
        userAgentPrefix: i
      },
      baseUri: o
    });
    b(this, "authorityHost");
    b(this, "allowLoggingAccountIdentifiers");
    b(this, "abortControllers");
    b(this, "allowInsecureConnection", !1);
    // used for WorkloadIdentity
    b(this, "tokenCredentialOptions");
    this.authorityHost = o, this.abortControllers = /* @__PURE__ */ new Map(), this.allowLoggingAccountIdentifiers = (a = t == null ? void 0 : t.loggingOptions) == null ? void 0 : a.allowLoggingAccountIdentifiers, this.tokenCredentialOptions = { ...t }, t != null && t.allowInsecureConnection && (this.allowInsecureConnection = t.allowInsecureConnection);
  }
  async sendTokenRequest(t) {
    Me.info(`IdentityClient: sending token request to [${t.url}]`);
    const n = await this.sendRequest(t);
    if (n.bodyAsText && (n.status === 200 || n.status === 201)) {
      const i = JSON.parse(n.bodyAsText);
      if (!i.access_token)
        return null;
      this.logIdentifiers(n);
      const o = {
        accessToken: {
          token: i.access_token,
          expiresOnTimestamp: CT(i),
          refreshAfterTimestamp: _T(i),
          tokenType: "Bearer"
        },
        refreshToken: i.refresh_token
      };
      return Me.info(`IdentityClient: [${t.url}] token acquired, expires on ${o.accessToken.expiresOnTimestamp}`), o;
    } else {
      const i = new sc(n.status, n.bodyAsText);
      throw Me.warning(`IdentityClient: authentication error. HTTP status: ${n.status}, ${i.errorResponse.errorDescription}`), i;
    }
  }
  async refreshAccessToken(t, n, i, o, s, a = {}) {
    if (o === void 0)
      return null;
    Me.info(`IdentityClient: refreshing access token with client ID: ${n}, scopes: ${i} started`);
    const c = {
      grant_type: "refresh_token",
      client_id: n,
      refresh_token: o,
      scope: i
    };
    s !== void 0 && (c.client_secret = s);
    const l = new URLSearchParams(c);
    return Re.withSpan("IdentityClient.refreshAccessToken", a, async (u) => {
      try {
        const d = ET(t), f = Nn({
          url: `${this.authorityHost}/${t}/${d}`,
          method: "POST",
          body: l.toString(),
          abortSignal: a.abortSignal,
          headers: or({
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }),
          tracingOptions: u.tracingOptions
        }), p = await this.sendTokenRequest(f);
        return Me.info(`IdentityClient: refreshed token for client ID: ${n}`), p;
      } catch (d) {
        if (d.name === oc && d.errorResponse.error === "interaction_required")
          return Me.info(`IdentityClient: interaction required for client ID: ${n}`), null;
        throw Me.warning(`IdentityClient: failed refreshing token for client ID: ${n}: ${d}`), d;
      }
    });
  }
  // Here is a custom layer that allows us to abort requests that go through MSAL,
  // since MSAL doesn't allow us to pass options all the way through.
  generateAbortSignal(t) {
    const n = new AbortController(), i = this.abortControllers.get(t) || [];
    i.push(n), this.abortControllers.set(t, i);
    const o = n.signal.onabort;
    return n.signal.onabort = (...s) => {
      this.abortControllers.set(t, void 0), o && o.apply(n.signal, s);
    }, n.signal;
  }
  abortRequests(t) {
    const n = t || mn, i = [
      ...this.abortControllers.get(n) || [],
      // MSAL passes no correlation ID to the get requests...
      ...this.abortControllers.get(mn) || []
    ];
    if (i.length) {
      for (const o of i)
        o.abort();
      this.abortControllers.set(n, void 0);
    }
  }
  getCorrelationId(t) {
    var i;
    const n = (i = t == null ? void 0 : t.body) == null ? void 0 : i.split("&").map((o) => o.split("=")).find(([o]) => o === "client-request-id");
    return n && n.length && n[1] || mn;
  }
  // The MSAL network module methods follow
  async sendGetRequestAsync(t, n) {
    const i = Nn({
      url: t,
      method: "GET",
      body: n == null ? void 0 : n.body,
      allowInsecureConnection: this.allowInsecureConnection,
      headers: or(n == null ? void 0 : n.headers),
      abortSignal: this.generateAbortSignal(mn)
    }), o = await this.sendRequest(i);
    return this.logIdentifiers(o), {
      body: o.bodyAsText ? JSON.parse(o.bodyAsText) : void 0,
      headers: o.headers.toJSON(),
      status: o.status
    };
  }
  async sendPostRequestAsync(t, n) {
    const i = Nn({
      url: t,
      method: "POST",
      body: n == null ? void 0 : n.body,
      headers: or(n == null ? void 0 : n.headers),
      allowInsecureConnection: this.allowInsecureConnection,
      // MSAL doesn't send the correlation ID on the get requests.
      abortSignal: this.generateAbortSignal(this.getCorrelationId(n))
    }), o = await this.sendRequest(i);
    return this.logIdentifiers(o), {
      body: o.bodyAsText ? JSON.parse(o.bodyAsText) : void 0,
      headers: o.headers.toJSON(),
      status: o.status
    };
  }
  /**
   *
   * @internal
   */
  getTokenCredentialOptions() {
    return this.tokenCredentialOptions;
  }
  /**
   * If allowLoggingAccountIdentifiers was set on the constructor options
   * we try to log the account identifiers by parsing the received access token.
   *
   * The account identifiers we try to log are:
   * - `appid`: The application or Client Identifier.
   * - `upn`: User Principal Name.
   *   - It might not be available in some authentication scenarios.
   *   - If it's not available, we put a placeholder: "No User Principal Name available".
   * - `tid`: Tenant Identifier.
   * - `oid`: Object Identifier of the authenticated user.
   */
  logIdentifiers(t) {
    if (!this.allowLoggingAccountIdentifiers || !t.bodyAsText)
      return;
    const n = "No User Principal Name available";
    try {
      const o = (t.parsedBody || JSON.parse(t.bodyAsText)).access_token;
      if (!o)
        return;
      const s = o.split(".")[1], { appid: a, upn: c, tid: l, oid: u } = JSON.parse(Buffer.from(s, "base64").toString("utf8"));
      Me.info(`[Authenticated account] Client ID: ${a}. Tenant ID: ${l}. User Principal Name: ${c || n}. Object ID (user): ${u}`);
    } catch (i) {
      Me.warning("allowLoggingAccountIdentifiers was set, but we couldn't log the account information. Error:", i.message);
    }
  }
}
var ji;
(function(r) {
  r.AutoDiscoverRegion = "AutoDiscoverRegion", r.USWest = "westus", r.USWest2 = "westus2", r.USCentral = "centralus", r.USEast = "eastus", r.USEast2 = "eastus2", r.USNorthCentral = "northcentralus", r.USSouthCentral = "southcentralus", r.USWestCentral = "westcentralus", r.CanadaCentral = "canadacentral", r.CanadaEast = "canadaeast", r.BrazilSouth = "brazilsouth", r.EuropeNorth = "northeurope", r.EuropeWest = "westeurope", r.UKSouth = "uksouth", r.UKWest = "ukwest", r.FranceCentral = "francecentral", r.FranceSouth = "francesouth", r.SwitzerlandNorth = "switzerlandnorth", r.SwitzerlandWest = "switzerlandwest", r.GermanyNorth = "germanynorth", r.GermanyWestCentral = "germanywestcentral", r.NorwayWest = "norwaywest", r.NorwayEast = "norwayeast", r.AsiaEast = "eastasia", r.AsiaSouthEast = "southeastasia", r.JapanEast = "japaneast", r.JapanWest = "japanwest", r.AustraliaEast = "australiaeast", r.AustraliaSouthEast = "australiasoutheast", r.AustraliaCentral = "australiacentral", r.AustraliaCentral2 = "australiacentral2", r.IndiaCentral = "centralindia", r.IndiaSouth = "southindia", r.IndiaWest = "westindia", r.KoreaSouth = "koreasouth", r.KoreaCentral = "koreacentral", r.UAECentral = "uaecentral", r.UAENorth = "uaenorth", r.SouthAfricaNorth = "southafricanorth", r.SouthAfricaWest = "southafricawest", r.ChinaNorth = "chinanorth", r.ChinaEast = "chinaeast", r.ChinaNorth2 = "chinanorth2", r.ChinaEast2 = "chinaeast2", r.GermanyCentral = "germanycentral", r.GermanyNorthEast = "germanynortheast", r.GovernmentUSVirginia = "usgovvirginia", r.GovernmentUSIowa = "usgoviowa", r.GovernmentUSArizona = "usgovarizona", r.GovernmentUSTexas = "usgovtexas", r.GovernmentUSDodEast = "usdodeast", r.GovernmentUSDodCentral = "usdodcentral";
})(ji || (ji = {}));
function wi(r) {
  var t, n;
  let e = r;
  return e === void 0 && ((n = (t = globalThis.process) == null ? void 0 : t.env) == null ? void 0 : n.AZURE_REGIONAL_AUTHORITY_NAME) !== void 0 && (e = process.env.AZURE_REGIONAL_AUTHORITY_NAME), e === ji.AutoDiscoverRegion ? "AUTO_DISCOVER" : e;
}
function ST(r) {
  return `The current credential is not configured to acquire tokens for tenant ${r}. To enable acquiring tokens for this tenant add it to the AdditionallyAllowedTenants on the credential options, or add "*" to AdditionallyAllowedTenants to allow acquiring tokens for any tenant.`;
}
function Qe(r, e, t = [], n) {
  let i;
  if (process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH || r === "adfs" ? i = r : i = (e == null ? void 0 : e.tenantId) ?? r, r && i !== r && !t.includes("*") && !t.some((o) => o.localeCompare(i) === 0)) {
    const o = ST(i);
    throw n == null || n.info(o), new L(o);
  }
  return i;
}
function Be(r, e) {
  if (!e.match(/^[0-9a-zA-Z-.]+$/)) {
    const t = new Error("Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://learn.microsoft.com/partner-center/find-ids-and-domain-names.");
    throw r.info(J("", t)), t;
  }
}
function Ed(r, e, t) {
  return e ? (Be(r, e), e) : (t || (t = bi), t !== bi ? "common" : "organizations");
}
function Je(r) {
  return !r || r.length === 0 ? [] : r.includes("*") ? eu : r;
}
const fe = X("MsalClient");
function wT(r, e, t = {}) {
  var a;
  const n = Ed(t.logger ?? fe, e, r), i = Zl(n, Jl(t)), o = new Vi({
    ...t.tokenCredentialOptions,
    authorityHost: i,
    loggingOptions: t.loggingOptions
  });
  return {
    auth: {
      clientId: r,
      authority: i,
      knownAuthorities: bp(n, i, t.disableInstanceDiscovery)
    },
    system: {
      networkClient: o,
      loggerOptions: {
        loggerCallback: Xl(t.logger ?? fe),
        logLevel: ed(hc()),
        piiLoggingEnabled: (a = t.loggingOptions) == null ? void 0 : a.enableUnsafeSupportLogging
      }
    }
  };
}
function qn(r, e, t = {}) {
  const n = {
    msalConfig: wT(r, e, t),
    cachedAccount: t.authenticationRecord ? kp(t.authenticationRecord) : null,
    pluginConfiguration: su.generatePluginConfiguration(t),
    logger: t.logger ?? fe
  }, i = /* @__PURE__ */ new Map();
  async function o(I = {}) {
    const _ = I.enableCae ? "CAE" : "default";
    let A = i.get(_);
    if (A)
      return n.logger.getToken.info("Existing PublicClientApplication found in cache, returning it."), A;
    n.logger.getToken.info(`Creating new PublicClientApplication with CAE ${I.enableCae ? "enabled" : "disabled"}.`);
    const R = I.enableCae ? n.pluginConfiguration.cache.cachePluginCae : n.pluginConfiguration.cache.cachePlugin;
    return n.msalConfig.auth.clientCapabilities = I.enableCae ? ["cp1"] : void 0, A = new Yg({
      ...n.msalConfig,
      broker: { nativeBrokerPlugin: n.pluginConfiguration.broker.nativeBrokerPlugin },
      cache: { cachePlugin: await R }
    }), i.set(_, A), A;
  }
  const s = /* @__PURE__ */ new Map();
  async function a(I = {}) {
    const _ = I.enableCae ? "CAE" : "default";
    let A = s.get(_);
    if (A)
      return n.logger.getToken.info("Existing ConfidentialClientApplication found in cache, returning it."), A;
    n.logger.getToken.info(`Creating new ConfidentialClientApplication with CAE ${I.enableCae ? "enabled" : "disabled"}.`);
    const R = I.enableCae ? n.pluginConfiguration.cache.cachePluginCae : n.pluginConfiguration.cache.cachePlugin;
    return n.msalConfig.auth.clientCapabilities = I.enableCae ? ["cp1"] : void 0, A = new Qg({
      ...n.msalConfig,
      broker: { nativeBrokerPlugin: n.pluginConfiguration.broker.nativeBrokerPlugin },
      cache: { cachePlugin: await R }
    }), s.set(_, A), A;
  }
  async function c(I, _, A = {}) {
    if (n.cachedAccount === null)
      throw n.logger.getToken.info("No cached account found in local state."), new Dt({ scopes: _ });
    A.claims && (n.cachedClaims = A.claims);
    const R = {
      account: n.cachedAccount,
      scopes: _,
      claims: n.cachedClaims
    };
    n.pluginConfiguration.broker.isEnabled && (R.tokenQueryParameters || (R.tokenQueryParameters = {}), n.pluginConfiguration.broker.enableMsaPassthrough && (R.tokenQueryParameters.msal_request_type = "consumer_passthrough")), A.proofOfPossessionOptions && (R.shrNonce = A.proofOfPossessionOptions.nonce, R.authenticationScheme = "pop", R.resourceRequestMethod = A.proofOfPossessionOptions.resourceRequestMethod, R.resourceRequestUri = A.proofOfPossessionOptions.resourceRequestUrl), n.logger.getToken.info("Attempting to acquire token silently");
    try {
      return await I.acquireTokenSilent(R);
    } catch (O) {
      throw vt(_, O, A);
    }
  }
  function l(I) {
    return I != null && I.tenantId ? Zl(I.tenantId, Jl(t)) : n.msalConfig.auth.authority;
  }
  async function u(I, _, A, R) {
    var M;
    let O = null;
    try {
      O = await c(I, _, A);
    } catch (v) {
      if (v.name !== "AuthenticationRequiredError")
        throw v;
      if (A.disableAutomaticAuthentication)
        throw new Dt({
          scopes: _,
          getTokenOptions: A,
          message: "Automatic authentication has been disabled. You may call the authentication() method."
        });
    }
    if (O === null)
      try {
        O = await R();
      } catch (v) {
        throw vt(_, v, A);
      }
    return kt(_, O, A), n.cachedAccount = (O == null ? void 0 : O.account) ?? null, n.logger.getToken.info(ke(_)), {
      token: O.accessToken,
      expiresOnTimestamp: O.expiresOn.getTime(),
      refreshAfterTimestamp: (M = O.refreshOn) == null ? void 0 : M.getTime(),
      tokenType: O.tokenType
    };
  }
  async function d(I, _, A = {}) {
    var O;
    n.logger.getToken.info("Attempting to acquire token using client secret"), n.msalConfig.auth.clientSecret = _;
    const R = await a(A);
    try {
      const M = await R.acquireTokenByClientCredential({
        scopes: I,
        authority: l(A),
        azureRegion: wi(),
        claims: A == null ? void 0 : A.claims
      });
      return kt(I, M, A), n.logger.getToken.info(ke(I)), {
        token: M.accessToken,
        expiresOnTimestamp: M.expiresOn.getTime(),
        refreshAfterTimestamp: (O = M.refreshOn) == null ? void 0 : O.getTime(),
        tokenType: M.tokenType
      };
    } catch (M) {
      throw vt(I, M, A);
    }
  }
  async function f(I, _, A = {}) {
    var O;
    n.logger.getToken.info("Attempting to acquire token using client assertion"), n.msalConfig.auth.clientAssertion = _;
    const R = await a(A);
    try {
      const M = await R.acquireTokenByClientCredential({
        scopes: I,
        authority: l(A),
        azureRegion: wi(),
        claims: A == null ? void 0 : A.claims,
        clientAssertion: _
      });
      return kt(I, M, A), n.logger.getToken.info(ke(I)), {
        token: M.accessToken,
        expiresOnTimestamp: M.expiresOn.getTime(),
        refreshAfterTimestamp: (O = M.refreshOn) == null ? void 0 : O.getTime(),
        tokenType: M.tokenType
      };
    } catch (M) {
      throw vt(I, M, A);
    }
  }
  async function p(I, _, A = {}) {
    var O;
    n.logger.getToken.info("Attempting to acquire token using client certificate"), n.msalConfig.auth.clientCertificate = _;
    const R = await a(A);
    try {
      const M = await R.acquireTokenByClientCredential({
        scopes: I,
        authority: l(A),
        azureRegion: wi(),
        claims: A == null ? void 0 : A.claims
      });
      return kt(I, M, A), n.logger.getToken.info(ke(I)), {
        token: M.accessToken,
        expiresOnTimestamp: M.expiresOn.getTime(),
        refreshAfterTimestamp: (O = M.refreshOn) == null ? void 0 : O.getTime(),
        tokenType: M.tokenType
      };
    } catch (M) {
      throw vt(I, M, A);
    }
  }
  async function h(I, _, A = {}) {
    n.logger.getToken.info("Attempting to acquire token using device code");
    const R = await o(A);
    return u(R, I, A, () => {
      var v;
      const O = {
        scopes: I,
        cancel: ((v = A == null ? void 0 : A.abortSignal) == null ? void 0 : v.aborted) ?? !1,
        deviceCodeCallback: _,
        authority: l(A),
        claims: A == null ? void 0 : A.claims
      }, M = R.acquireTokenByDeviceCode(O);
      return A.abortSignal && A.abortSignal.addEventListener("abort", () => {
        O.cancel = !0;
      }), M;
    });
  }
  async function y(I, _, A, R = {}) {
    n.logger.getToken.info("Attempting to acquire token using username and password");
    const O = await o(R);
    return u(O, I, R, () => {
      const M = {
        scopes: I,
        username: _,
        password: A,
        authority: l(R),
        claims: R == null ? void 0 : R.claims
      };
      return O.acquireTokenByUsernamePassword(M);
    });
  }
  function T() {
    if (n.cachedAccount)
      return vp(r, n.cachedAccount);
  }
  async function g(I, _, A, R, O = {}) {
    n.logger.getToken.info("Attempting to acquire token using authorization code");
    let M;
    return R ? (n.msalConfig.auth.clientSecret = R, M = await a(O)) : M = await o(O), u(M, I, O, () => M.acquireTokenByCode({
      scopes: I,
      redirectUri: _,
      code: A,
      authority: l(O),
      claims: O == null ? void 0 : O.claims
    }));
  }
  async function m(I, _, A, R = {}) {
    var M;
    fe.getToken.info("Attempting to acquire token on behalf of another user"), typeof A == "string" ? (fe.getToken.info("Using client secret for on behalf of flow"), n.msalConfig.auth.clientSecret = A) : typeof A == "function" ? (fe.getToken.info("Using client assertion callback for on behalf of flow"), n.msalConfig.auth.clientAssertion = A) : (fe.getToken.info("Using client certificate for on behalf of flow"), n.msalConfig.auth.clientCertificate = A);
    const O = await a(R);
    try {
      const v = await O.acquireTokenOnBehalfOf({
        scopes: I,
        authority: l(R),
        claims: R.claims,
        oboAssertion: _
      });
      return kt(I, v, R), fe.getToken.info(ke(I)), {
        token: v.accessToken,
        expiresOnTimestamp: v.expiresOn.getTime(),
        refreshAfterTimestamp: (M = v.refreshOn) == null ? void 0 : M.getTime(),
        tokenType: v.tokenType
      };
    } catch (v) {
      throw vt(I, v, R);
    }
  }
  function E(I, _) {
    var A, R;
    return {
      openBrowser: async (O) => {
        await (await import("./index-CLY3pofV.js")).default(O, { newInstance: !0 });
      },
      scopes: I,
      authority: l(_),
      claims: _ == null ? void 0 : _.claims,
      loginHint: _ == null ? void 0 : _.loginHint,
      errorTemplate: (A = _ == null ? void 0 : _.browserCustomizationOptions) == null ? void 0 : A.errorMessage,
      successTemplate: (R = _ == null ? void 0 : _.browserCustomizationOptions) == null ? void 0 : R.successMessage,
      prompt: _ != null && _.loginHint ? "login" : "select_account"
    };
  }
  async function C(I, _, A = {}) {
    fe.verbose("Authentication will resume through the broker");
    const R = await o(A), O = E(I, A);
    n.pluginConfiguration.broker.parentWindowHandle ? O.windowHandle = Buffer.from(n.pluginConfiguration.broker.parentWindowHandle) : fe.warning("Parent window handle is not specified for the broker. This may cause unexpected behavior. Please provide the parentWindowHandle."), n.pluginConfiguration.broker.enableMsaPassthrough && ((O.tokenQueryParameters ?? (O.tokenQueryParameters = {})).msal_request_type = "consumer_passthrough"), _ ? (O.prompt = "none", fe.verbose("Attempting broker authentication using the default broker account")) : fe.verbose("Attempting broker authentication without the default broker account"), A.proofOfPossessionOptions && (O.shrNonce = A.proofOfPossessionOptions.nonce, O.authenticationScheme = "pop", O.resourceRequestMethod = A.proofOfPossessionOptions.resourceRequestMethod, O.resourceRequestUri = A.proofOfPossessionOptions.resourceRequestUrl);
    try {
      return await R.acquireTokenInteractive(O);
    } catch (M) {
      if (fe.verbose(`Failed to authenticate through the broker: ${M.message}`), A.disableAutomaticAuthentication)
        throw new Dt({
          scopes: I,
          getTokenOptions: A,
          message: "Cannot silently authenticate with default broker account."
        });
      if (_)
        return C(I, !1, A);
      throw M;
    }
  }
  async function P(I, _, A = {}) {
    var O;
    fe.getToken.info(`Attempting to acquire token using brokered authentication with useDefaultBrokerAccount: ${_}`);
    const R = await C(I, _, A);
    return kt(I, R, A), n.cachedAccount = (R == null ? void 0 : R.account) ?? null, n.logger.getToken.info(ke(I)), {
      token: R.accessToken,
      expiresOnTimestamp: R.expiresOn.getTime(),
      refreshAfterTimestamp: (O = R.refreshOn) == null ? void 0 : O.getTime(),
      tokenType: R.tokenType
    };
  }
  async function k(I, _ = {}) {
    fe.getToken.info("Attempting to acquire token interactively");
    const A = await o(_);
    return u(A, I, _, async () => {
      const R = E(I, _);
      return n.pluginConfiguration.broker.isEnabled ? C(I, n.pluginConfiguration.broker.useDefaultBrokerAccount ?? !1, _) : (_.proofOfPossessionOptions && (R.shrNonce = _.proofOfPossessionOptions.nonce, R.authenticationScheme = "pop", R.resourceRequestMethod = _.proofOfPossessionOptions.resourceRequestMethod, R.resourceRequestUri = _.proofOfPossessionOptions.resourceRequestUrl), A.acquireTokenInteractive(R));
    });
  }
  return {
    getActiveAccount: T,
    getBrokeredToken: P,
    getTokenByClientSecret: d,
    getTokenByClientAssertion: f,
    getTokenByClientCertificate: p,
    getTokenByDeviceCode: h,
    getTokenByUsernamePassword: y,
    getTokenByAuthorizationCode: g,
    getTokenOnBehalfOf: m,
    getTokenByInteractiveRequest: k
  };
}
const In = "ClientCertificateCredential", Ba = X(In);
class RT {
  constructor(e, t, n, i = {}) {
    b(this, "tenantId");
    b(this, "additionallyAllowedTenantIds");
    b(this, "certificateConfiguration");
    b(this, "sendCertificateChain");
    b(this, "msalClient");
    if (!e || !t)
      throw new Error(`${In}: tenantId and clientId are required parameters.`);
    this.tenantId = e, this.additionallyAllowedTenantIds = Je(i == null ? void 0 : i.additionallyAllowedTenants), this.sendCertificateChain = i.sendCertificateChain, this.certificateConfiguration = {
      ...typeof n == "string" ? {
        certificatePath: n
      } : n
    };
    const o = this.certificateConfiguration.certificate, s = this.certificateConfiguration.certificatePath;
    if (!this.certificateConfiguration || !(o || s))
      throw new Error(`${In}: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
    if (o && s)
      throw new Error(`${In}: To avoid unexpected behaviors, providing both the contents of a PEM certificate and the path to a PEM certificate is forbidden. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
    this.msalClient = qn(t, e, {
      ...i,
      logger: Ba,
      tokenCredentialOptions: i
    });
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(e, t = {}) {
    return Re.withSpan(`${In}.getToken`, t, async (n) => {
      n.tenantId = Qe(this.tenantId, n, this.additionallyAllowedTenantIds, Ba);
      const i = Array.isArray(e) ? e : [e], o = await this.buildClientCertificate();
      return this.msalClient.getTokenByClientCertificate(i, o, n);
    });
  }
  async buildClientCertificate() {
    const e = await bT(this.certificateConfiguration, this.sendCertificateChain ?? !1);
    let t;
    return this.certificateConfiguration.certificatePassword !== void 0 ? t = Qd({
      key: e.certificateContents,
      passphrase: this.certificateConfiguration.certificatePassword,
      format: "pem"
    }).export({
      format: "pem",
      type: "pkcs8"
    }).toString() : t = e.certificateContents, {
      thumbprint: e.thumbprint,
      thumbprintSha256: e.thumbprintSha256,
      privateKey: t,
      x5c: e.x5c
    };
  }
}
async function bT(r, e) {
  const t = r.certificate, n = r.certificatePath, i = t || await Xi(n, "utf8"), o = e ? i : void 0, s = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g, a = [];
  let c;
  do
    c = s.exec(i), c && a.push(c[3]);
  while (c);
  if (a.length === 0)
    throw new Error("The file at the specified path does not contain a PEM-encoded certificate.");
  const l = Vo("sha1").update(Buffer.from(a[0], "base64")).digest("hex").toUpperCase(), u = Vo("sha256").update(Buffer.from(a[0], "base64")).digest("hex").toUpperCase();
  return {
    certificateContents: i,
    thumbprintSha256: u,
    thumbprint: l,
    x5c: o
  };
}
function Pr(r) {
  return Array.isArray(r) ? r : [r];
}
function zo(r, e) {
  if (!r.match(/^[0-9a-zA-Z-_.:/]+$/)) {
    const t = new Error("Invalid scope was specified by the user or calling client");
    throw e.getToken.info(J(r, t)), t;
  }
}
function Ad(r) {
  return r.replace(/\/.default$/, "");
}
const Fa = X("ClientSecretCredential");
class kT {
  /**
   * Creates an instance of the ClientSecretCredential with the details
   * needed to authenticate against Microsoft Entra ID with a client
   * secret.
   *
   * @param tenantId - The Microsoft Entra tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param clientSecret - A client secret that was generated for the App Registration.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(e, t, n, i = {}) {
    b(this, "tenantId");
    b(this, "additionallyAllowedTenantIds");
    b(this, "msalClient");
    b(this, "clientSecret");
    if (!e)
      throw new L("ClientSecretCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
    if (!t)
      throw new L("ClientSecretCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
    if (!n)
      throw new L("ClientSecretCredential: clientSecret is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
    this.clientSecret = n, this.tenantId = e, this.additionallyAllowedTenantIds = Je(i == null ? void 0 : i.additionallyAllowedTenants), this.msalClient = qn(t, e, {
      ...i,
      logger: Fa,
      tokenCredentialOptions: i
    });
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(e, t = {}) {
    return Re.withSpan(`${this.constructor.name}.getToken`, t, async (n) => {
      n.tenantId = Qe(this.tenantId, n, this.additionallyAllowedTenantIds, Fa);
      const i = Pr(e);
      return this.msalClient.getTokenByClientSecret(i, this.clientSecret, n);
    });
  }
}
const vT = X("UsernamePasswordCredential");
class OT {
  /**
   * Creates an instance of the UsernamePasswordCredential with the details
   * needed to authenticate against Microsoft Entra ID with a username
   * and password.
   *
   * @param tenantId - The Microsoft Entra tenant (directory).
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param username - The user account's e-mail address (user name).
   * @param password - The user account's account password
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(e, t, n, i, o = {}) {
    b(this, "tenantId");
    b(this, "additionallyAllowedTenantIds");
    b(this, "msalClient");
    b(this, "username");
    b(this, "password");
    if (!e)
      throw new L("UsernamePasswordCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
    if (!t)
      throw new L("UsernamePasswordCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
    if (!n)
      throw new L("UsernamePasswordCredential: username is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
    if (!i)
      throw new L("UsernamePasswordCredential: password is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
    this.tenantId = e, this.additionallyAllowedTenantIds = Je(o == null ? void 0 : o.additionallyAllowedTenants), this.username = n, this.password = i, this.msalClient = qn(t, this.tenantId, {
      ...o,
      tokenCredentialOptions: o ?? {}
    });
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * If the user provided the option `disableAutomaticAuthentication`,
   * once the token can't be retrieved silently,
   * this method won't attempt to request user interaction to retrieve the token.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(e, t = {}) {
    return Re.withSpan(`${this.constructor.name}.getToken`, t, async (n) => {
      n.tenantId = Qe(this.tenantId, n, this.additionallyAllowedTenantIds, vT);
      const i = Pr(e);
      return this.msalClient.getTokenByUsernamePassword(i, this.username, this.password, n);
    });
  }
}
const PT = [
  "AZURE_TENANT_ID",
  "AZURE_CLIENT_ID",
  "AZURE_CLIENT_SECRET",
  "AZURE_CLIENT_CERTIFICATE_PATH",
  "AZURE_CLIENT_CERTIFICATE_PASSWORD",
  "AZURE_USERNAME",
  "AZURE_PASSWORD",
  "AZURE_ADDITIONALLY_ALLOWED_TENANTS",
  "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN"
];
function NT() {
  return (process.env.AZURE_ADDITIONALLY_ALLOWED_TENANTS ?? "").split(";");
}
const sr = "EnvironmentCredential", qe = X(sr);
function MT() {
  const r = (process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN ?? "").toLowerCase(), e = r === "true" || r === "1";
  return qe.verbose(`AZURE_CLIENT_SEND_CERTIFICATE_CHAIN: ${process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN}; sendCertificateChain: ${e}`), e;
}
class DT {
  /**
   * Creates an instance of the EnvironmentCredential class and decides what credential to use depending on the available environment variables.
   *
   * Required environment variables:
   * - `AZURE_TENANT_ID`: The Microsoft Entra tenant (directory) ID.
   * - `AZURE_CLIENT_ID`: The client (application) ID of an App Registration in the tenant.
   *
   * If setting the AZURE_TENANT_ID, then you can also set the additionally allowed tenants
   * - `AZURE_ADDITIONALLY_ALLOWED_TENANTS`: For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens with a single semicolon delimited string. Use * to allow all tenants.
   *
   * Environment variables used for client credential authentication:
   * - `AZURE_CLIENT_SECRET`: A client secret that was generated for the App Registration.
   * - `AZURE_CLIENT_CERTIFICATE_PATH`: The path to a PEM certificate to use during the authentication, instead of the client secret.
   * - `AZURE_CLIENT_CERTIFICATE_PASSWORD`: (optional) password for the certificate file.
   * - `AZURE_CLIENT_SEND_CERTIFICATE_CHAIN`: (optional) indicates that the certificate chain should be set in x5c header to support subject name / issuer based authentication.
   *
   * Username and password authentication is deprecated, since it doesn't support multifactor authentication (MFA). See https://aka.ms/azsdk/identity/mfa for more details. Users can still provide environment variables for this authentication method:
   * - `AZURE_USERNAME`: Username to authenticate with.
   * - `AZURE_PASSWORD`: Password to authenticate with.
   *
   * If the environment variables required to perform the authentication are missing, a {@link CredentialUnavailableError} will be thrown.
   * If the authentication fails, or if there's an unknown error, an {@link AuthenticationError} will be thrown.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(e) {
    b(this, "_credential");
    const t = fc(PT).assigned.join(", ");
    qe.info(`Found the following environment variables: ${t}`);
    const n = process.env.AZURE_TENANT_ID, i = process.env.AZURE_CLIENT_ID, o = process.env.AZURE_CLIENT_SECRET, s = NT(), a = MT(), c = { ...e, additionallyAllowedTenantIds: s, sendCertificateChain: a };
    if (n && Be(qe, n), n && i && o) {
      qe.info(`Invoking ClientSecretCredential with tenant ID: ${n}, clientId: ${i} and clientSecret: [REDACTED]`), this._credential = new kT(n, i, o, c);
      return;
    }
    const l = process.env.AZURE_CLIENT_CERTIFICATE_PATH, u = process.env.AZURE_CLIENT_CERTIFICATE_PASSWORD;
    if (n && i && l) {
      qe.info(`Invoking ClientCertificateCredential with tenant ID: ${n}, clientId: ${i} and certificatePath: ${l}`), this._credential = new RT(n, i, { certificatePath: l, certificatePassword: u }, c);
      return;
    }
    const d = process.env.AZURE_USERNAME, f = process.env.AZURE_PASSWORD;
    n && i && d && f && (qe.info(`Invoking UsernamePasswordCredential with tenant ID: ${n}, clientId: ${i} and username: ${d}`), qe.warning("Environment is configured to use username and password authentication. This authentication method is deprecated, as it doesn't support multifactor authentication (MFA). Use a more secure credential. For more details, see https://aka.ms/azsdk/identity/mfa."), this._credential = new OT(n, i, d, f, c));
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - Optional parameters. See {@link GetTokenOptions}.
   */
  async getToken(e, t = {}) {
    return Re.withSpan(`${sr}.getToken`, t, async (n) => {
      if (this._credential)
        try {
          const i = await this._credential.getToken(e, n);
          return qe.getToken.info(ke(e)), i;
        } catch (i) {
          const o = new sc(400, {
            error: `${sr} authentication failed. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`,
            error_description: i.message.toString().split("More details:").join("")
          });
          throw qe.getToken.info(J(e, o)), o;
        }
      throw new L(`${sr} is unavailable. No underlying credential could be used. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`);
    });
  }
}
const UT = 1e3 * 64, xT = 3e3;
function LT(r) {
  return Py([
    {
      name: "imdsRetryPolicy",
      retry: ({ retryCount: e, response: t }) => {
        if ((t == null ? void 0 : t.status) !== 404 && (t == null ? void 0 : t.status) !== 410)
          return { skipStrategy: !0 };
        const n = (t == null ? void 0 : t.status) === 410 ? Math.max(xT, r.startDelayInMs) : r.startDelayInMs;
        return Rp(e, {
          retryDelayInMs: n,
          maxRetryDelayInMs: UT
        });
      }
    }
  ], {
    maxRetries: r.maxRetries
  });
}
const Ve = "ManagedIdentityCredential - IMDS", ht = X(Ve), HT = "http://169.254.169.254", $T = "/metadata/identity/oauth2/token";
function BT(r) {
  if (!Fo(r))
    throw new Error(`${Ve}: Multiple scopes are not supported.`);
  const t = new URL($T, process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST ?? HT), n = {
    Accept: "application/json"
    // intentionally leave out the Metadata header to invoke an error from IMDS endpoint.
  };
  return {
    // intentionally not including any query
    url: `${t}`,
    method: "GET",
    headers: or(n)
  };
}
const FT = {
  name: "imdsMsi",
  async isAvailable(r) {
    const { scopes: e, identityClient: t, getTokenOptions: n } = r, i = Fo(e);
    if (!i)
      return ht.info(`${Ve}: Unavailable. Multiple scopes are not supported.`), !1;
    if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST)
      return !0;
    if (!t)
      throw new Error("Missing IdentityClient");
    const o = BT(i);
    return Re.withSpan("ManagedIdentityCredential-pingImdsEndpoint", n ?? {}, async (s) => {
      var l, u;
      o.tracingOptions = s.tracingOptions;
      const a = Nn(o);
      a.timeout = ((l = s.requestOptions) == null ? void 0 : l.timeout) || 1e3, a.allowInsecureConnection = !0;
      let c;
      try {
        ht.info(`${Ve}: Pinging the Azure IMDS endpoint`), c = await t.sendRequest(a);
      } catch (d) {
        return Yl(d) && ht.verbose(`${Ve}: Caught error ${d.name}: ${d.message}`), ht.info(`${Ve}: The Azure IMDS endpoint is unavailable`), !1;
      }
      return c.status === 403 && (u = c.bodyAsText) != null && u.includes("unreachable") ? (ht.info(`${Ve}: The Azure IMDS endpoint is unavailable`), ht.info(`${Ve}: ${c.bodyAsText}`), !1) : (ht.info(`${Ve}: The Azure IMDS endpoint is available`), !0);
    });
  }
}, za = X("ClientAssertionCredential");
class zT {
  /**
   * Creates an instance of the ClientAssertionCredential with the details
   * needed to authenticate against Microsoft Entra ID with a client
   * assertion provided by the developer through the `getAssertion` function parameter.
   *
   * @param tenantId - The Microsoft Entra tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param getAssertion - A function that retrieves the assertion for the credential to use.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(e, t, n, i = {}) {
    b(this, "msalClient");
    b(this, "tenantId");
    b(this, "additionallyAllowedTenantIds");
    b(this, "getAssertion");
    b(this, "options");
    if (!e)
      throw new L("ClientAssertionCredential: tenantId is a required parameter.");
    if (!t)
      throw new L("ClientAssertionCredential: clientId is a required parameter.");
    if (!n)
      throw new L("ClientAssertionCredential: clientAssertion is a required parameter.");
    this.tenantId = e, this.additionallyAllowedTenantIds = Je(i == null ? void 0 : i.additionallyAllowedTenants), this.options = i, this.getAssertion = n, this.msalClient = qn(t, e, {
      ...i,
      logger: za,
      tokenCredentialOptions: this.options
    });
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(e, t = {}) {
    return Re.withSpan(`${this.constructor.name}.getToken`, t, async (n) => {
      n.tenantId = Qe(this.tenantId, n, this.additionallyAllowedTenantIds, za);
      const i = Array.isArray(e) ? e : [e];
      return this.msalClient.getTokenByClientAssertion(i, this.getAssertion, n);
    });
  }
}
const gt = "WorkloadIdentityCredential", qT = [
  "AZURE_TENANT_ID",
  "AZURE_CLIENT_ID",
  "AZURE_FEDERATED_TOKEN_FILE"
], yn = X(gt);
class ar {
  /**
   * WorkloadIdentityCredential supports Microsoft Entra Workload ID on Kubernetes.
   *
   * @param options - The identity client options to use for authentication.
   */
  constructor(e) {
    b(this, "client");
    b(this, "azureFederatedTokenFileContent");
    b(this, "cacheDate");
    b(this, "federatedTokenFilePath");
    const t = fc(qT).assigned.join(", ");
    yn.info(`Found the following environment variables: ${t}`);
    const n = e ?? {}, i = n.tenantId || process.env.AZURE_TENANT_ID, o = n.clientId || process.env.AZURE_CLIENT_ID;
    if (this.federatedTokenFilePath = n.tokenFilePath || process.env.AZURE_FEDERATED_TOKEN_FILE, i && Be(yn, i), !o)
      throw new L(`${gt}: is unavailable. clientId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_CLIENT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
    if (!i)
      throw new L(`${gt}: is unavailable. tenantId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_TENANT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
    if (!this.federatedTokenFilePath)
      throw new L(`${gt}: is unavailable. federatedTokenFilePath is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_FEDERATED_TOKEN_FILE".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
    yn.info(`Invoking ClientAssertionCredential with tenant ID: ${i}, clientId: ${n.clientId} and federated token path: [REDACTED]`), this.client = new zT(i, o, this.readFileContents.bind(this), e);
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(e, t) {
    if (!this.client) {
      const n = `${gt}: is unavailable. tenantId, clientId, and federatedTokenFilePath are required parameters. 
      In DefaultAzureCredential and ManagedIdentityCredential, these can be provided as environment variables - 
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_ID",
      "AZURE_FEDERATED_TOKEN_FILE". See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`;
      throw yn.info(n), new L(n);
    }
    return yn.info("Invoking getToken() of Client Assertion Credential"), this.client.getToken(e, t);
  }
  async readFileContents() {
    if (this.cacheDate !== void 0 && Date.now() - this.cacheDate >= 1e3 * 60 * 5 && (this.azureFederatedTokenFileContent = void 0), !this.federatedTokenFilePath)
      throw new L(`${gt}: is unavailable. Invalid file path provided ${this.federatedTokenFilePath}.`);
    if (!this.azureFederatedTokenFileContent) {
      const t = (await Xi(this.federatedTokenFilePath, "utf8")).trim();
      if (t)
        this.azureFederatedTokenFileContent = t, this.cacheDate = Date.now();
      else
        throw new L(`${gt}: is unavailable. No content on the file ${this.federatedTokenFilePath}.`);
    }
    return this.azureFederatedTokenFileContent;
  }
}
const Cd = "ManagedIdentityCredential - Token Exchange", GT = X(Cd), qa = {
  name: "tokenExchangeMsi",
  async isAvailable(r) {
    const e = process.env, t = !!((r || e.AZURE_CLIENT_ID) && e.AZURE_TENANT_ID && process.env.AZURE_FEDERATED_TOKEN_FILE);
    return t || GT.info(`${Cd}: Unavailable. The environment variables needed are: AZURE_CLIENT_ID (or the client ID sent through the parameters), AZURE_TENANT_ID and AZURE_FEDERATED_TOKEN_FILE`), t;
  },
  async getToken(r, e = {}) {
    const { scopes: t, clientId: n } = r, i = {};
    return new ar({
      clientId: n,
      tenantId: process.env.AZURE_TENANT_ID,
      tokenFilePath: process.env.AZURE_FEDERATED_TOKEN_FILE,
      ...i,
      disableInstanceDiscovery: !0
    }).getToken(t, e);
  }
}, Ae = X("ManagedIdentityCredential");
class Xn {
  /**
   * @internal
   * @hidden
   */
  constructor(e, t) {
    b(this, "managedIdentityApp");
    b(this, "identityClient");
    b(this, "clientId");
    b(this, "resourceId");
    b(this, "objectId");
    b(this, "msiRetryConfig", {
      maxRetries: 5,
      startDelayInMs: 800,
      intervalIncrement: 2
    });
    b(this, "isAvailableIdentityClient");
    b(this, "sendProbeRequest");
    var s, a;
    let n;
    typeof e == "string" ? (this.clientId = e, n = t ?? {}) : (this.clientId = e == null ? void 0 : e.clientId, n = e ?? {}), this.resourceId = n == null ? void 0 : n.resourceId, this.objectId = n == null ? void 0 : n.objectId, this.sendProbeRequest = (n == null ? void 0 : n.sendProbeRequest) ?? !1;
    const i = [
      { key: "clientId", value: this.clientId },
      { key: "resourceId", value: this.resourceId },
      { key: "objectId", value: this.objectId }
    ].filter((c) => c.value);
    if (i.length > 1)
      throw new Error(`ManagedIdentityCredential: only one of 'clientId', 'resourceId', or 'objectId' can be provided. Received values: ${JSON.stringify({ clientId: this.clientId, resourceId: this.resourceId, objectId: this.objectId })}`);
    n.allowInsecureConnection = !0, ((s = n.retryOptions) == null ? void 0 : s.maxRetries) !== void 0 && (this.msiRetryConfig.maxRetries = n.retryOptions.maxRetries), this.identityClient = new Vi({
      ...n,
      additionalPolicies: [{ policy: LT(this.msiRetryConfig), position: "perCall" }]
    }), this.managedIdentityApp = new pt({
      managedIdentityIdParams: {
        userAssignedClientId: this.clientId,
        userAssignedResourceId: this.resourceId,
        userAssignedObjectId: this.objectId
      },
      system: {
        disableInternalRetries: !0,
        networkClient: this.identityClient,
        loggerOptions: {
          logLevel: ed(hc()),
          piiLoggingEnabled: (a = n.loggingOptions) == null ? void 0 : a.enableUnsafeSupportLogging,
          loggerCallback: Xl(Ae)
        }
      }
    }), this.isAvailableIdentityClient = new Vi({
      ...n,
      retryOptions: {
        maxRetries: 0
      }
    });
    const o = this.managedIdentityApp.getManagedIdentitySource();
    if (o === "CloudShell" && (this.clientId || this.resourceId || this.objectId))
      throw Ae.warning(`CloudShell MSI detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
        clientId: this.clientId,
        resourceId: this.resourceId,
        objectId: this.objectId
      })}.`), new L("ManagedIdentityCredential: Specifying a user-assigned managed identity is not supported for CloudShell at runtime. When using Managed Identity in CloudShell, omit the clientId, resourceId, and objectId parameters.");
    if (o === "ServiceFabric" && (this.clientId || this.resourceId || this.objectId))
      throw Ae.warning(`Service Fabric detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
        clientId: this.clientId,
        resourceId: this.resourceId,
        objectId: this.objectId
      })}.`), new L(`ManagedIdentityCredential: ${AT}`);
    if (Ae.info(`Using ${o} managed identity.`), i.length === 1) {
      const { key: c, value: l } = i[0];
      Ae.info(`${o} with ${c}: ${l}`);
    }
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   * If an unexpected error occurs, an {@link AuthenticationError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(e, t = {}) {
    Ae.getToken.info("Using the MSAL provider for Managed Identity.");
    const n = Fo(e);
    if (!n)
      throw new L(`ManagedIdentityCredential: Multiple scopes are not supported. Scopes: ${JSON.stringify(e)}`);
    return Re.withSpan("ManagedIdentityCredential.getToken", t, async () => {
      var i;
      try {
        const o = await qa.isAvailable(this.clientId), s = this.managedIdentityApp.getManagedIdentitySource(), a = s === "DefaultToImds" || s === "Imds";
        if (Ae.getToken.info(`MSAL Identity source: ${s}`), o) {
          Ae.getToken.info("Using the token exchange managed identity.");
          const l = await qa.getToken({
            scopes: e,
            clientId: this.clientId,
            identityClient: this.identityClient,
            retryConfig: this.msiRetryConfig,
            resourceId: this.resourceId
          });
          if (l === null)
            throw new L("Attempted to use the token exchange managed identity, but received a null response.");
          return l;
        } else if (a && this.sendProbeRequest && (Ae.getToken.info("Using the IMDS endpoint to probe for availability."), !await FT.isAvailable({
          scopes: e,
          clientId: this.clientId,
          getTokenOptions: t,
          identityClient: this.isAvailableIdentityClient,
          resourceId: this.resourceId
        })))
          throw new L("Attempted to use the IMDS endpoint, but it is not available.");
        Ae.getToken.info("Calling into MSAL for managed identity token.");
        const c = await this.managedIdentityApp.acquireToken({
          resource: n
        });
        return this.ensureValidMsalToken(e, c, t), Ae.getToken.info(ke(e)), {
          expiresOnTimestamp: c.expiresOn.getTime(),
          token: c.accessToken,
          refreshAfterTimestamp: (i = c.refreshOn) == null ? void 0 : i.getTime(),
          tokenType: "Bearer"
        };
      } catch (o) {
        throw Ae.getToken.error(J(e, o)), o.name === "AuthenticationRequiredError" ? o : VT(o) ? new L(`ManagedIdentityCredential: Network unreachable. Message: ${o.message}`, { cause: o }) : new L(`ManagedIdentityCredential: Authentication failed. Message ${o.message}`, { cause: o });
      }
    });
  }
  /**
   * Ensures the validity of the MSAL token
   */
  ensureValidMsalToken(e, t, n) {
    const i = (o) => (Ae.getToken.info(o), new Dt({
      scopes: Array.isArray(e) ? e : [e],
      getTokenOptions: n,
      message: o
    }));
    if (!t)
      throw i("No response.");
    if (!t.expiresOn)
      throw i('Response had no "expiresOn" property.');
    if (!t.accessToken)
      throw i('Response had no "accessToken" property.');
  }
}
function VT(r) {
  return !!(r.errorCode === "network_error" || r.code === "ENETUNREACH" || r.code === "EHOSTUNREACH" || (r.statusCode === 403 || r.code === 403) && r.message.includes("unreachable"));
}
const De = X("AzureDeveloperCliCredential"), er = {
  notInstalled: "Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
  login: "Please run 'azd auth login' from a command prompt to authenticate before using this credential. For more information, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
  unknown: "Unknown error while trying to retrieve the access token",
  claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:"
}, _d = {
  /**
   * @internal
   */
  getSafeWorkingDir() {
    if (process.platform === "win32") {
      let r = process.env.SystemRoot || process.env.SYSTEMROOT;
      return r || (De.getToken.warning("The SystemRoot environment variable is not set. This may cause issues when using the Azure Developer CLI credential."), r = "C:\\Windows"), r;
    } else
      return "/bin";
  },
  /**
   * Gets the access token from Azure Developer CLI
   * @param scopes - The scopes to use when getting the token
   * @internal
   */
  async getAzdAccessToken(r, e, t, n) {
    let i = [];
    e && (i = ["--tenant-id", e]);
    let o = [];
    return n && (o = ["--claims", btoa(n)]), new Promise((s, a) => {
      try {
        const l = ["azd", ...[
          "auth",
          "token",
          "--output",
          "json",
          "--no-prompt",
          ...r.reduce((u, d) => u.concat("--scope", d), []),
          ...i,
          ...o
        ]].join(" ");
        rc.exec(l, {
          cwd: _d.getSafeWorkingDir(),
          timeout: t
        }, (u, d, f) => {
          s({ stdout: d, stderr: f, error: u });
        });
      } catch (c) {
        a(c);
      }
    });
  }
};
class jT {
  /**
   * Creates an instance of the {@link AzureDeveloperCliCredential}.
   *
   * To use this credential, ensure that you have already logged
   * in via the 'azd' tool using the command "azd auth login" from the commandline.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(e) {
    b(this, "tenantId");
    b(this, "additionallyAllowedTenantIds");
    b(this, "timeout");
    e != null && e.tenantId && (Be(De, e == null ? void 0 : e.tenantId), this.tenantId = e == null ? void 0 : e.tenantId), this.additionallyAllowedTenantIds = Je(e == null ? void 0 : e.additionallyAllowedTenants), this.timeout = e == null ? void 0 : e.processTimeoutInMs;
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(e, t = {}) {
    const n = Qe(this.tenantId, t, this.additionallyAllowedTenantIds);
    n && Be(De, n);
    let i;
    return typeof e == "string" ? i = [e] : i = e, De.getToken.info(`Using the scopes ${e}`), Re.withSpan(`${this.constructor.name}.getToken`, t, async () => {
      var o, s, a, c, l, u;
      try {
        i.forEach((y) => {
          zo(y, De);
        });
        const d = await _d.getAzdAccessToken(i, n, this.timeout, t.claims), f = ((o = d.stderr) == null ? void 0 : o.match("must use multi-factor authentication")) || ((s = d.stderr) == null ? void 0 : s.match("reauthentication required")), p = ((a = d.stderr) == null ? void 0 : a.match("not logged in, run `azd login` to login")) || ((c = d.stderr) == null ? void 0 : c.match("not logged in, run `azd auth login` to login"));
        if (((l = d.stderr) == null ? void 0 : l.match("azd:(.*)not found")) || ((u = d.stderr) == null ? void 0 : u.startsWith("'azd' is not recognized")) || d.error && d.error.code === "ENOENT") {
          const y = new L(er.notInstalled);
          throw De.getToken.info(J(e, y)), y;
        }
        if (p) {
          const y = new L(er.login);
          throw De.getToken.info(J(e, y)), y;
        }
        if (f) {
          const T = `azd auth login ${i.reduce((m, E) => m.concat("--scope", E), []).join(" ")}`, g = new L(`${er.claim} ${T}`);
          throw De.getToken.info(J(e, g)), g;
        }
        try {
          const y = JSON.parse(d.stdout);
          return De.getToken.info(ke(e)), {
            token: y.token,
            expiresOnTimestamp: new Date(y.expiresOn).getTime(),
            tokenType: "Bearer"
          };
        } catch (y) {
          throw d.stderr ? new L(d.stderr) : y;
        }
      } catch (d) {
        const f = d.name === "CredentialUnavailableError" ? d : new L(d.message || er.unknown);
        throw De.getToken.info(J(e, f)), f;
      }
    });
  }
}
function Ga(r, e) {
  if (!e.match(/^[0-9a-zA-Z-._ ]+$/)) {
    const t = new Error(`Subscription '${e}' contains invalid characters. If this is the name of a subscription, use its ID instead. You can locate your subscription by following the instructions listed here: https://learn.microsoft.com/azure/azure-portal/get-subscription-tenant-id`);
    throw r.info(J("", t)), t;
  }
}
const Ce = X("AzureCliCredential"), Tn = {
  claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:",
  notInstalled: "Azure CLI could not be found. Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'.",
  login: "Please run 'az login' from a command prompt to authenticate before using this credential.",
  unknown: "Unknown error while trying to retrieve the access token",
  unexpectedResponse: 'Unexpected response from Azure CLI when getting token. Expected "expiresOn" to be a RFC3339 date string. Got:'
}, Id = {
  /**
   * @internal
   */
  getSafeWorkingDir() {
    if (process.platform === "win32") {
      let r = process.env.SystemRoot || process.env.SYSTEMROOT;
      return r || (Ce.getToken.warning("The SystemRoot environment variable is not set. This may cause issues when using the Azure CLI credential."), r = "C:\\Windows"), r;
    } else
      return "/bin";
  },
  /**
   * Gets the access token from Azure CLI
   * @param resource - The resource to use when getting the token
   * @internal
   */
  async getAzureCliAccessToken(r, e, t, n) {
    let i = [], o = [];
    return e && (i = ["--tenant", e]), t && (o = ["--subscription", `"${t}"`]), new Promise((s, a) => {
      try {
        const l = ["az", ...[
          "account",
          "get-access-token",
          "--output",
          "json",
          "--resource",
          r,
          ...i,
          ...o
        ]].join(" ");
        rc.exec(l, { cwd: Id.getSafeWorkingDir(), timeout: n }, (u, d, f) => {
          s({ stdout: d, stderr: f, error: u });
        });
      } catch (c) {
        a(c);
      }
    });
  }
};
class KT {
  /**
   * Creates an instance of the {@link AzureCliCredential}.
   *
   * To use this credential, ensure that you have already logged
   * in via the 'az' tool using the command "az login" from the commandline.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(e) {
    b(this, "tenantId");
    b(this, "additionallyAllowedTenantIds");
    b(this, "timeout");
    b(this, "subscription");
    e != null && e.tenantId && (Be(Ce, e == null ? void 0 : e.tenantId), this.tenantId = e == null ? void 0 : e.tenantId), e != null && e.subscription && (Ga(Ce, e == null ? void 0 : e.subscription), this.subscription = e == null ? void 0 : e.subscription), this.additionallyAllowedTenantIds = Je(e == null ? void 0 : e.additionallyAllowedTenants), this.timeout = e == null ? void 0 : e.processTimeoutInMs;
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(e, t = {}) {
    const n = typeof e == "string" ? e : e[0], i = t.claims;
    if (i && i.trim()) {
      let a = `az login --claims-challenge ${btoa(i)} --scope ${n}`;
      const c = t.tenantId;
      c && (a += ` --tenant ${c}`);
      const l = new L(`${Tn.claim} ${a}`);
      throw Ce.getToken.info(J(n, l)), l;
    }
    const o = Qe(this.tenantId, t, this.additionallyAllowedTenantIds);
    return o && Be(Ce, o), this.subscription && Ga(Ce, this.subscription), Ce.getToken.info(`Using the scope ${n}`), Re.withSpan(`${this.constructor.name}.getToken`, t, async () => {
      var s, a, c, l;
      try {
        zo(n, Ce);
        const u = Ad(n), d = await Id.getAzureCliAccessToken(u, o, this.subscription, this.timeout), f = (s = d.stderr) == null ? void 0 : s.match("(.*)az login --scope(.*)"), p = ((a = d.stderr) == null ? void 0 : a.match("(.*)az login(.*)")) && !f;
        if (((c = d.stderr) == null ? void 0 : c.match("az:(.*)not found")) || ((l = d.stderr) == null ? void 0 : l.startsWith("'az' is not recognized"))) {
          const y = new L(Tn.notInstalled);
          throw Ce.getToken.info(J(e, y)), y;
        }
        if (p) {
          const y = new L(Tn.login);
          throw Ce.getToken.info(J(e, y)), y;
        }
        try {
          const y = d.stdout, T = this.parseRawResponse(y);
          return Ce.getToken.info(ke(e)), T;
        } catch (y) {
          throw d.stderr ? new L(d.stderr) : y;
        }
      } catch (u) {
        const d = u.name === "CredentialUnavailableError" ? u : new L(u.message || Tn.unknown);
        throw Ce.getToken.info(J(e, d)), d;
      }
    });
  }
  /**
   * Parses the raw JSON response from the Azure CLI into a usable AccessToken object
   *
   * @param rawResponse - The raw JSON response from the Azure CLI
   * @returns An access token with the expiry time parsed from the raw response
   *
   * The expiryTime of the credential's access token, in milliseconds, is calculated as follows:
   *
   * When available, expires_on (introduced in Azure CLI v2.54.0) will be preferred. Otherwise falls back to expiresOn.
   */
  parseRawResponse(e) {
    const t = JSON.parse(e), n = t.accessToken;
    let i = Number.parseInt(t.expires_on, 10) * 1e3;
    if (!isNaN(i))
      return Ce.getToken.info("expires_on is available and is valid, using it"), {
        token: n,
        expiresOnTimestamp: i,
        tokenType: "Bearer"
      };
    if (i = new Date(t.expiresOn).getTime(), isNaN(i))
      throw new L(`${Tn.unexpectedResponse} "${t.expiresOn}"`);
    return {
      token: n,
      expiresOnTimestamp: i,
      tokenType: "Bearer"
    };
  }
}
const YT = {
  /**
   * Promisifying childProcess.execFile
   * @internal
   */
  execFile(r, e, t) {
    return new Promise((n, i) => {
      Jd.execFile(r, e, t, (o, s, a) => {
        Buffer.isBuffer(s) && (s = s.toString("utf8")), Buffer.isBuffer(a) && (a = a.toString("utf8")), a || o ? i(a ? new Error(a) : o) : n(s);
      });
    });
  }
}, Ue = X("AzurePowerShellCredential"), Sd = process.platform === "win32";
function wd(r) {
  return Sd ? `${r}.exe` : r;
}
async function Va(r, e) {
  const t = [];
  for (const n of r) {
    const [i, ...o] = n, s = await YT.execFile(i, o, {
      encoding: "utf8",
      timeout: e
    });
    t.push(s);
  }
  return t;
}
const Rd = {
  login: "Run Connect-AzAccount to login",
  installed: "The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory"
}, tr = {
  login: "Please run 'Connect-AzAccount' from PowerShell to authenticate before using this credential.",
  installed: `The 'Az.Account' module >= 2.2.0 is not installed. Install the Azure Az PowerShell module with: "Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force".`,
  claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:",
  troubleshoot: "To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot."
}, WT = (r) => r.message.match(`(.*)${Rd.login}(.*)`), QT = (r) => r.message.match(Rd.installed), Ki = [wd("pwsh")];
Sd && Ki.push(wd("powershell"));
class JT {
  /**
   * Creates an instance of the {@link AzurePowerShellCredential}.
   *
   * To use this credential:
   * - Install the Azure Az PowerShell module with:
   *   `Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force`.
   * - You have already logged in to Azure PowerShell using the command
   * `Connect-AzAccount` from the command line.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(e) {
    b(this, "tenantId");
    b(this, "additionallyAllowedTenantIds");
    b(this, "timeout");
    e != null && e.tenantId && (Be(Ue, e == null ? void 0 : e.tenantId), this.tenantId = e == null ? void 0 : e.tenantId), this.additionallyAllowedTenantIds = Je(e == null ? void 0 : e.additionallyAllowedTenants), this.timeout = e == null ? void 0 : e.processTimeoutInMs;
  }
  /**
   * Gets the access token from Azure PowerShell
   * @param resource - The resource to use when getting the token
   */
  async getAzurePowerShellAccessToken(e, t, n) {
    for (const i of [...Ki]) {
      try {
        await Va([[i, "/?"]], n);
      } catch {
        Ki.shift();
        continue;
      }
      const s = (await Va([
        [
          i,
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          `
          $tenantId = "${t ?? ""}"
          $m = Import-Module Az.Accounts -MinimumVersion 2.2.0 -PassThru
          $useSecureString = $m.Version -ge [version]'2.17.0' -and $m.Version -lt [version]'5.0.0'

          $params = @{
            ResourceUrl = "${e}"
          }

          if ($tenantId.Length -gt 0) {
            $params["TenantId"] = $tenantId
          }

          if ($useSecureString) {
            $params["AsSecureString"] = $true
          }

          $token = Get-AzAccessToken @params

          $result = New-Object -TypeName PSObject
          $result | Add-Member -MemberType NoteProperty -Name ExpiresOn -Value $token.ExpiresOn

          if ($token.Token -is [System.Security.SecureString]) {
            if ($PSVersionTable.PSVersion.Major -lt 7) {
              $ssPtr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token.Token)
              try {
                $result | Add-Member -MemberType NoteProperty -Name Token -Value ([System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ssPtr))
              }
              finally {
                [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
              }
            }
            else {
              $result | Add-Member -MemberType NoteProperty -Name Token -Value ($token.Token | ConvertFrom-SecureString -AsPlainText)
            }
          }
          else {
            $result | Add-Member -MemberType NoteProperty -Name Token -Value $token.Token
          }

          Write-Output (ConvertTo-Json $result)
          `
        ]
      ]))[0];
      return ZT(s);
    }
    throw new Error("Unable to execute PowerShell. Ensure that it is installed in your system");
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If the authentication cannot be performed through PowerShell, a {@link CredentialUnavailableError} will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this TokenCredential implementation might make.
   */
  async getToken(e, t = {}) {
    return Re.withSpan(`${this.constructor.name}.getToken`, t, async () => {
      const n = typeof e == "string" ? e : e[0], i = t.claims;
      if (i && i.trim()) {
        let a = `Connect-AzAccount -ClaimsChallenge ${btoa(i)}`;
        const c = t.tenantId;
        c && (a += ` -Tenant ${c}`);
        const l = new L(`${tr.claim} ${a}`);
        throw Ue.getToken.info(J(n, l)), l;
      }
      const o = Qe(this.tenantId, t, this.additionallyAllowedTenantIds);
      o && Be(Ue, o);
      try {
        zo(n, Ue), Ue.getToken.info(`Using the scope ${n}`);
        const s = Ad(n), a = await this.getAzurePowerShellAccessToken(s, o, this.timeout);
        return Ue.getToken.info(ke(e)), {
          token: a.Token,
          expiresOnTimestamp: new Date(a.ExpiresOn).getTime(),
          tokenType: "Bearer"
        };
      } catch (s) {
        if (QT(s)) {
          const c = new L(tr.installed);
          throw Ue.getToken.info(J(n, c)), c;
        } else if (WT(s)) {
          const c = new L(tr.login);
          throw Ue.getToken.info(J(n, c)), c;
        }
        const a = new L(`${s}. ${tr.troubleshoot}`);
        throw Ue.getToken.info(J(n, a)), a;
      }
    });
  }
}
async function ZT(r) {
  const e = /{[^{}]*}/g, t = r.match(e);
  let n = r;
  if (t)
    try {
      for (const i of t)
        try {
          const o = JSON.parse(i);
          if (o != null && o.Token)
            return n = n.replace(i, ""), n && Ue.getToken.warning(n), o;
        } catch {
          continue;
        }
    } catch {
      throw new Error(`Unable to parse the output of PowerShell. Received output: ${r}`);
    }
  throw new Error(`No access token found in the output. Received output: ${r}`);
}
const XT = "common", Ri = X("VisualStudioCodeCredential"), eE = {
  adfs: "The VisualStudioCodeCredential does not support authentication with ADFS tenants."
};
function tE(r) {
  const e = eE[r];
  if (e)
    throw new L(e);
}
class nE {
  /**
   * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
   *
   * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
   * `@azure/identity-vscode`. If this package is not installed, then authentication using
   * `VisualStudioCodeCredential` will not be available.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(e) {
    b(this, "tenantId");
    b(this, "additionallyAllowedTenantIds");
    b(this, "msalClient");
    b(this, "options");
    /**
     * The promise of the single preparation that will be executed at the first getToken request for an instance of this class.
     */
    b(this, "preparePromise");
    this.options = e || {}, e && e.tenantId ? (Be(Ri, e.tenantId), this.tenantId = e.tenantId) : this.tenantId = XT, this.additionallyAllowedTenantIds = Je(e == null ? void 0 : e.additionallyAllowedTenants), tE(this.tenantId);
  }
  /**
   * Runs preparations for any further getToken request:
   *   - Validates that the plugin is available.
   *   - Loads the authentication record from VSCode if available.
   *   - Creates the MSAL client with the loaded plugin and authentication record.
   */
  async prepare(e) {
    throw Qe(this.tenantId, this.options, this.additionallyAllowedTenantIds, Ri) || this.tenantId, new L("Visual Studio Code Authentication is not available. Ensure you have have Azure Resources Extension installed in VS Code, signed into Azure via VS Code, installed the @azure/identity-vscode package, and properly configured the extension.");
  }
  /**
   * Runs preparations for any further getToken, but only once.
   */
  prepareOnce(e) {
    return this.preparePromise || (this.preparePromise = this.prepare(e)), this.preparePromise;
  }
  /**
   * Returns the token found by searching VSCode's authentication cache or
   * returns null if no token could be found.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                `TokenCredential` implementation might make.
   */
  async getToken(e, t) {
    const n = Pr(e);
    if (await this.prepareOnce(n), !this.msalClient)
      throw new L("Visual Studio Code Authentication failed to initialize. Ensure you have have Azure Resources Extension installed in VS Code, signed into Azure via VS Code, installed the @azure/identity-vscode package, and properly configured the extension.");
    return this.msalClient.getTokenByInteractiveRequest(n, {
      ...t,
      disableAutomaticAuthentication: !0
    });
  }
  /**
   * Loads the authentication record from the specified path.
   * @param authRecordPath - The path to the authentication record file.
   * @param scopes - The list of scopes for which the token will have access.
   * @returns The authentication record or undefined if loading fails.
   */
  async loadAuthRecord(e, t) {
    try {
      const n = await Xi(e, { encoding: "utf8" });
      return Op(n);
    } catch (n) {
      throw Ri.getToken.info(J(t, n)), new L("Cannot load authentication record in Visual Studio Code. Ensure you have have Azure Resources Extension installed in VS Code, signed into Azure via VS Code, installed the @azure/identity-vscode package, and properly configured the extension.");
    }
  }
}
const nr = X("BrokerCredential");
class rE {
  /**
   * Creates an instance of BrokerCredential with the required broker options.
   *
   * This credential uses WAM (Web Account Manager) for authentication, which provides
   * better security and user experience on Windows platforms.
   *
   * @param options - Options for configuring the broker credential, including required broker options.
   */
  constructor(e) {
    b(this, "brokerMsalClient");
    b(this, "brokerTenantId");
    b(this, "brokerAdditionallyAllowedTenantIds");
    this.brokerTenantId = Ed(nr, e.tenantId), this.brokerAdditionallyAllowedTenantIds = Je(e == null ? void 0 : e.additionallyAllowedTenants);
    const t = {
      ...e,
      tokenCredentialOptions: e,
      logger: nr,
      brokerOptions: {
        enabled: !0,
        parentWindowHandle: new Uint8Array(0),
        useDefaultBrokerAccount: !0
      }
    };
    this.brokerMsalClient = qn(bi, this.brokerTenantId, t);
  }
  /**
   * Authenticates with Microsoft Entra ID using WAM broker and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * This method extends the base getToken method to support silentAuthenticationOnly option
   * when using broker authentication.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure the token request, including silentAuthenticationOnly option.
   */
  async getToken(e, t = {}) {
    return Re.withSpan(`${this.constructor.name}.getToken`, t, async (n) => {
      n.tenantId = Qe(this.brokerTenantId, n, this.brokerAdditionallyAllowedTenantIds, nr);
      const i = Pr(e);
      try {
        return this.brokerMsalClient.getBrokeredToken(i, !0, {
          ...n,
          disableAutomaticAuthentication: !0
        });
      } catch (o) {
        throw nr.getToken.info(J(i, o)), new L("Failed to acquire token using broker authentication", { cause: o });
      }
    });
  }
}
function iE(r = {}) {
  return new rE(r);
}
function ja(r = {}) {
  return new nE(r);
}
function Ka(r = {}) {
  r.retryOptions ?? (r.retryOptions = {
    maxRetries: 5,
    retryDelayInMs: 800
  }), r.sendProbeRequest ?? (r.sendProbeRequest = !0);
  const e = (r == null ? void 0 : r.managedIdentityClientId) ?? process.env.AZURE_CLIENT_ID, t = (r == null ? void 0 : r.workloadIdentityClientId) ?? e, n = r == null ? void 0 : r.managedIdentityResourceId, i = process.env.AZURE_FEDERATED_TOKEN_FILE, o = (r == null ? void 0 : r.tenantId) ?? process.env.AZURE_TENANT_ID;
  if (n) {
    const s = {
      ...r,
      resourceId: n
    };
    return new Xn(s);
  }
  if (i && t) {
    const s = {
      ...r,
      tenantId: o
    };
    return new Xn(t, s);
  }
  if (e) {
    const s = {
      ...r,
      clientId: e
    };
    return new Xn(s);
  }
  return new Xn(r);
}
function Ya(r) {
  const e = (r == null ? void 0 : r.managedIdentityClientId) ?? process.env.AZURE_CLIENT_ID, t = (r == null ? void 0 : r.workloadIdentityClientId) ?? e, n = process.env.AZURE_FEDERATED_TOKEN_FILE, i = (r == null ? void 0 : r.tenantId) ?? process.env.AZURE_TENANT_ID;
  if (n && t) {
    const o = {
      ...r,
      tenantId: i,
      clientId: t,
      tokenFilePath: n
    };
    return new ar(o);
  }
  if (i) {
    const o = {
      ...r,
      tenantId: i
    };
    return new ar(o);
  }
  return new ar(r);
}
function Wa(r = {}) {
  return new jT(r);
}
function Qa(r = {}) {
  return new KT(r);
}
function Ja(r = {}) {
  return new JT(r);
}
function Za(r = {}) {
  return new DT(r);
}
const Er = X("DefaultAzureCredential");
class oE {
  constructor(e, t) {
    b(this, "credentialUnavailableErrorMessage");
    b(this, "credentialName");
    this.credentialName = e, this.credentialUnavailableErrorMessage = t;
  }
  getToken() {
    return Er.getToken.info(`Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`), Promise.resolve(null);
  }
}
class LE extends Cu {
  constructor(e) {
    sE(e);
    const t = process.env.AZURE_TOKEN_CREDENTIALS ? process.env.AZURE_TOKEN_CREDENTIALS.trim().toLowerCase() : void 0, n = [
      ja,
      Qa,
      Ja,
      Wa,
      iE
    ], i = [
      Za,
      Ya,
      Ka
    ];
    let o = [];
    const s = "EnvironmentCredential, WorkloadIdentityCredential, ManagedIdentityCredential, VisualStudioCodeCredential, AzureCliCredential, AzurePowerShellCredential, AzureDeveloperCliCredential";
    if (t)
      switch (t) {
        case "dev":
          o = n;
          break;
        case "prod":
          o = i;
          break;
        case "environmentcredential":
          o = [Za];
          break;
        case "workloadidentitycredential":
          o = [Ya];
          break;
        case "managedidentitycredential":
          o = [
            () => Ka({ sendProbeRequest: !1 })
          ];
          break;
        case "visualstudiocodecredential":
          o = [ja];
          break;
        case "azureclicredential":
          o = [Qa];
          break;
        case "azurepowershellcredential":
          o = [Ja];
          break;
        case "azuredeveloperclicredential":
          o = [Wa];
          break;
        default: {
          const c = `Invalid value for AZURE_TOKEN_CREDENTIALS = ${process.env.AZURE_TOKEN_CREDENTIALS}. Valid values are 'prod' or 'dev' or any of these credentials - ${s}.`;
          throw Er.warning(c), new Error(c);
        }
      }
    else
      o = [...i, ...n];
    const a = o.map((c) => {
      try {
        return c(e ?? {});
      } catch (l) {
        return Er.warning(`Skipped ${c.name} because of an error creating the credential: ${l}`), new oE(c.name, l.message);
      }
    });
    super(...a);
  }
}
function sE(r) {
  if (r != null && r.requiredEnvVars) {
    const t = (Array.isArray(r.requiredEnvVars) ? r.requiredEnvVars : [r.requiredEnvVars]).filter((n) => !process.env[n]);
    if (t.length > 0) {
      const n = `Required environment ${t.length === 1 ? "variable" : "variables"} '${t.join(", ")}' for DefaultAzureCredential ${t.length === 1 ? "is" : "are"} not set or empty.`;
      throw Er.warning(n), new Error(n);
    }
  }
}
X("InteractiveBrowserCredential");
X("DeviceCodeCredential");
const aE = "AzurePipelinesCredential";
X(aE);
X("AuthorizationCodeCredential");
const cE = "OnBehalfOfCredential";
X(cE);
export {
  du as AggregateAuthenticationError,
  lu as AggregateAuthenticationErrorName,
  sc as AuthenticationError,
  oc as AuthenticationErrorName,
  Dt as AuthenticationRequiredError,
  ki as AzureAuthorityHosts,
  KT as AzureCliCredential,
  jT as AzureDeveloperCliCredential,
  JT as AzurePowerShellCredential,
  Cu as ChainedTokenCredential,
  zT as ClientAssertionCredential,
  RT as ClientCertificateCredential,
  kT as ClientSecretCredential,
  L as CredentialUnavailableError,
  cu as CredentialUnavailableErrorName,
  LE as DefaultAzureCredential,
  DT as EnvironmentCredential,
  Xn as ManagedIdentityCredential,
  OT as UsernamePasswordCredential,
  nE as VisualStudioCodeCredential,
  ar as WorkloadIdentityCredential,
  Op as deserializeAuthenticationRecord,
  Me as logger
};
