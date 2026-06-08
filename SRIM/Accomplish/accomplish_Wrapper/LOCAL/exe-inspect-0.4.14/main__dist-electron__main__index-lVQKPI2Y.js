var sn = Object.defineProperty;
var an = (e, t, n) => t in e ? sn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var R = (e, t, n) => an(e, typeof t != "symbol" ? t + "" : t, n);
import { u as un, v as Te, l as ln, w as dn, x as se, y as be, z as cn, B as pn, A as St, aw as mn } from "./index-ChliSiZl.js";
import { r as hn, a as _n, b as Sn, c as vn, d as En, e as yn, f as Pn, g as gn, h as Cn, i as An, j as Rn, k as vt, l as fn, m as Et, u as yt, n as In, o as Tn, p as Pt, q as bn, s as Dn, t as wn } from "./index-Bd73Qarf.js";
(function() {
  try {
    var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
    t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "f6220832-5fb5-45f9-9251-2a46fe8d766b", e._sentryDebugIdIdentifier = "sentry-dbid-f6220832-5fb5-45f9-9251-2a46fe8d766b");
  } catch {
  }
})();
function xn(e, t) {
  for (var n = 0; n < t.length; n++) {
    const i = t[n];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const d in i)
        if (d !== "default" && !(d in e)) {
          const c = Object.getOwnPropertyDescriptor(i, d);
          c && Object.defineProperty(e, d, c.get ? c : {
            enumerable: !0,
            get: () => i[d]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var Re = {}, fe = {}, Ie = {}, st;
function gt() {
  return st || (st = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.resolveHttpAuthSchemeConfig = e.resolveStsAuthConfig = e.defaultSTSHttpAuthSchemeProvider = e.defaultSTSHttpAuthSchemeParametersProvider = void 0;
    const t = /* @__PURE__ */ Te(), n = un, i = /* @__PURE__ */ At(), d = async (r, S, u) => ({
      operation: (0, n.getSmithyContext)(S).operation,
      region: await (0, n.normalizeProvider)(r.region)() || (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })()
    });
    e.defaultSTSHttpAuthSchemeParametersProvider = d;
    function c(r) {
      return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
          name: "sts",
          region: r.region
        },
        propertiesExtractor: (S, u) => ({
          signingProperties: {
            config: S,
            context: u
          }
        })
      };
    }
    function p(r) {
      return {
        schemeId: "smithy.api#noAuth"
      };
    }
    const _ = (r) => {
      const S = [];
      switch (r.operation) {
        case "AssumeRoleWithWebIdentity": {
          S.push(p());
          break;
        }
        default:
          S.push(c(r));
      }
      return S;
    };
    e.defaultSTSHttpAuthSchemeProvider = _;
    const a = (r) => Object.assign(r, {
      stsClientCtor: i.STSClient
    });
    e.resolveStsAuthConfig = a;
    const C = (r) => {
      const S = (0, e.resolveStsAuthConfig)(r), u = (0, t.resolveAwsSdkSigV4Config)(S);
      return Object.assign(u, {
        authSchemePreference: (0, n.normalizeProvider)(r.authSchemePreference ?? [])
      });
    };
    e.resolveHttpAuthSchemeConfig = C;
  })(Ie)), Ie;
}
var L = {}, at;
function Ct() {
  if (at) return L;
  at = 1, Object.defineProperty(L, "__esModule", { value: !0 }), L.commonParams = L.resolveClientEndpointParameters = void 0;
  const e = (t) => Object.assign(t, {
    useDualstackEndpoint: t.useDualstackEndpoint ?? !1,
    useFipsEndpoint: t.useFipsEndpoint ?? !1,
    useGlobalEndpoint: t.useGlobalEndpoint ?? !1,
    defaultSigningName: "sts"
  });
  return L.resolveClientEndpointParameters = e, L.commonParams = {
    UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" },
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
  }, L;
}
var te = {}, ne = {}, re = {}, oe = {}, ut;
function kn() {
  if (ut) return oe;
  ut = 1, Object.defineProperty(oe, "__esModule", { value: !0 }), oe.ruleSet = void 0;
  const e = "required", t = "type", n = "fn", i = "argv", d = "ref", c = !1, p = !0, _ = "booleanEquals", a = "stringEquals", C = "sigv4", r = "sts", S = "us-east-1", u = "endpoint", w = "https://sts.{Region}.{PartitionResult#dnsSuffix}", y = "tree", f = "error", s = "getAttr", k = { [e]: !1, [t]: "string" }, x = { [e]: !0, default: !1, [t]: "boolean" }, T = { [d]: "Endpoint" }, I = { [n]: "isSet", [i]: [{ [d]: "Region" }] }, v = { [d]: "Region" }, D = { [n]: "aws.partition", [i]: [v], assign: "PartitionResult" }, G = { [d]: "UseFIPS" }, z = { [d]: "UseDualStack" }, E = { url: "https://sts.amazonaws.com", properties: { authSchemes: [{ name: C, signingName: r, signingRegion: S }] }, headers: {} }, g = {}, $ = { conditions: [{ [n]: a, [i]: [v, "aws-global"] }], [u]: E, [t]: u }, V = { [n]: _, [i]: [G, !0] }, W = { [n]: _, [i]: [z, !0] }, ae = { [n]: s, [i]: [{ [d]: "PartitionResult" }, "supportsFIPS"] }, ue = { [d]: "PartitionResult" }, le = { [n]: _, [i]: [!0, { [n]: s, [i]: [ue, "supportsDualStack"] }] }, de = [{ [n]: "isSet", [i]: [T] }], ce = [V], pe = [W], _e = { version: "1.0", parameters: { Region: k, UseDualStack: x, UseFIPS: x, Endpoint: k, UseGlobalEndpoint: x }, rules: [{ conditions: [{ [n]: _, [i]: [{ [d]: "UseGlobalEndpoint" }, p] }, { [n]: "not", [i]: de }, I, D, { [n]: _, [i]: [G, c] }, { [n]: _, [i]: [z, c] }], rules: [{ conditions: [{ [n]: a, [i]: [v, "ap-northeast-1"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "ap-south-1"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "ap-southeast-1"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "ap-southeast-2"] }], endpoint: E, [t]: u }, $, { conditions: [{ [n]: a, [i]: [v, "ca-central-1"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "eu-central-1"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "eu-north-1"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "eu-west-1"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "eu-west-2"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "eu-west-3"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "sa-east-1"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, S] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "us-east-2"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "us-west-1"] }], endpoint: E, [t]: u }, { conditions: [{ [n]: a, [i]: [v, "us-west-2"] }], endpoint: E, [t]: u }, { endpoint: { url: w, properties: { authSchemes: [{ name: C, signingName: r, signingRegion: "{Region}" }] }, headers: g }, [t]: u }], [t]: y }, { conditions: de, rules: [{ conditions: ce, error: "Invalid Configuration: FIPS and custom endpoint are not supported", [t]: f }, { conditions: pe, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", [t]: f }, { endpoint: { url: T, properties: g, headers: g }, [t]: u }], [t]: y }, { conditions: [I], rules: [{ conditions: [D], rules: [{ conditions: [V, W], rules: [{ conditions: [{ [n]: _, [i]: [p, ae] }, le], rules: [{ endpoint: { url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: g, headers: g }, [t]: u }], [t]: y }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", [t]: f }], [t]: y }, { conditions: ce, rules: [{ conditions: [{ [n]: _, [i]: [ae, p] }], rules: [{ conditions: [{ [n]: a, [i]: [{ [n]: s, [i]: [ue, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://sts.{Region}.amazonaws.com", properties: g, headers: g }, [t]: u }, { endpoint: { url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}", properties: g, headers: g }, [t]: u }], [t]: y }, { error: "FIPS is enabled but this partition does not support FIPS", [t]: f }], [t]: y }, { conditions: pe, rules: [{ conditions: [le], rules: [{ endpoint: { url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: g, headers: g }, [t]: u }], [t]: y }, { error: "DualStack is enabled but this partition does not support DualStack", [t]: f }], [t]: y }, $, { endpoint: { url: w, properties: g, headers: g }, [t]: u }], [t]: y }], [t]: y }, { error: "Invalid Configuration: Missing Region", [t]: f }] };
  return oe.ruleSet = _e, oe;
}
var lt;
function $n() {
  if (lt) return re;
  lt = 1, Object.defineProperty(re, "__esModule", { value: !0 }), re.defaultEndpointResolver = void 0;
  const e = _n, t = hn, n = /* @__PURE__ */ kn(), i = new t.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
  }), d = (c, p = {}) => i.get(c, () => (0, t.resolveEndpoint)(n.ruleSet, {
    endpointParams: c,
    logger: p.logger
  }));
  return re.defaultEndpointResolver = d, t.customEndpointFunctions.aws = e.awsEndpointFunctions, re;
}
var dt;
function qn() {
  if (dt) return ne;
  dt = 1, Object.defineProperty(ne, "__esModule", { value: !0 }), ne.getRuntimeConfig = void 0;
  const e = /* @__PURE__ */ Te(), t = /* @__PURE__ */ dn(), n = /* @__PURE__ */ be(), i = se, d = Sn, c = cn, p = ln, _ = /* @__PURE__ */ gt(), a = /* @__PURE__ */ $n(), C = (r) => ({
    apiVersion: "2011-06-15",
    base64Decoder: (r == null ? void 0 : r.base64Decoder) ?? c.fromBase64,
    base64Encoder: (r == null ? void 0 : r.base64Encoder) ?? c.toBase64,
    disableHostPrefix: (r == null ? void 0 : r.disableHostPrefix) ?? !1,
    endpointProvider: (r == null ? void 0 : r.endpointProvider) ?? a.defaultEndpointResolver,
    extensions: (r == null ? void 0 : r.extensions) ?? [],
    httpAuthSchemeProvider: (r == null ? void 0 : r.httpAuthSchemeProvider) ?? _.defaultSTSHttpAuthSchemeProvider,
    httpAuthSchemes: (r == null ? void 0 : r.httpAuthSchemes) ?? [
      {
        schemeId: "aws.auth#sigv4",
        identityProvider: (S) => S.getIdentityProvider("aws.auth#sigv4"),
        signer: new e.AwsSdkSigV4Signer()
      },
      {
        schemeId: "smithy.api#noAuth",
        identityProvider: (S) => S.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        signer: new n.NoAuthSigner()
      }
    ],
    logger: (r == null ? void 0 : r.logger) ?? new i.NoOpLogger(),
    protocol: (r == null ? void 0 : r.protocol) ?? t.AwsQueryProtocol,
    protocolSettings: (r == null ? void 0 : r.protocolSettings) ?? {
      defaultNamespace: "com.amazonaws.sts",
      xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/",
      version: "2011-06-15",
      serviceTarget: "AWSSecurityTokenServiceV20110615"
    },
    serviceId: (r == null ? void 0 : r.serviceId) ?? "STS",
    urlParser: (r == null ? void 0 : r.urlParser) ?? d.parseUrl,
    utf8Decoder: (r == null ? void 0 : r.utf8Decoder) ?? p.fromUtf8,
    utf8Encoder: (r == null ? void 0 : r.utf8Encoder) ?? p.toUtf8
  });
  return ne.getRuntimeConfig = C, ne;
}
var ct;
function Wn() {
  if (ct) return te;
  ct = 1, Object.defineProperty(te, "__esModule", { value: !0 }), te.getRuntimeConfig = void 0;
  const t = (/* @__PURE__ */ vn()).__importDefault(En), n = /* @__PURE__ */ Te(), i = An, d = vt, c = /* @__PURE__ */ be(), p = Cn, _ = Et, a = Pn, C = gn, r = se, S = Rn, u = yn, w = fn, y = /* @__PURE__ */ qn(), f = (s) => {
    (0, r.emitWarningIfUnsupportedVersion)(process.version);
    const k = (0, u.resolveDefaultsModeConfig)(s), x = () => k().then(r.loadConfigsForDefaultMode), T = (0, y.getRuntimeConfig)(s);
    (0, n.emitWarningIfUnsupportedVersion)(process.version);
    const I = {
      profile: s == null ? void 0 : s.profile,
      logger: T.logger
    };
    return {
      ...T,
      ...s,
      runtime: "node",
      defaultsMode: k,
      authSchemePreference: (s == null ? void 0 : s.authSchemePreference) ?? (0, a.loadConfig)(n.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, I),
      bodyLengthChecker: (s == null ? void 0 : s.bodyLengthChecker) ?? S.calculateBodyLength,
      defaultUserAgentProvider: (s == null ? void 0 : s.defaultUserAgentProvider) ?? (0, i.createDefaultUserAgentProvider)({ serviceId: T.serviceId, clientVersion: t.default.version }),
      httpAuthSchemes: (s == null ? void 0 : s.httpAuthSchemes) ?? [
        {
          schemeId: "aws.auth#sigv4",
          identityProvider: (v) => v.getIdentityProvider("aws.auth#sigv4") || (async (D) => await s.credentialDefaultProvider((D == null ? void 0 : D.__config) || {})()),
          signer: new n.AwsSdkSigV4Signer()
        },
        {
          schemeId: "smithy.api#noAuth",
          identityProvider: (v) => v.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new c.NoAuthSigner()
        }
      ],
      maxAttempts: (s == null ? void 0 : s.maxAttempts) ?? (0, a.loadConfig)(_.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, s),
      region: (s == null ? void 0 : s.region) ?? (0, a.loadConfig)(d.NODE_REGION_CONFIG_OPTIONS, { ...d.NODE_REGION_CONFIG_FILE_OPTIONS, ...I }),
      requestHandler: C.NodeHttpHandler.create((s == null ? void 0 : s.requestHandler) ?? x),
      retryMode: (s == null ? void 0 : s.retryMode) ?? (0, a.loadConfig)({
        ..._.NODE_RETRY_MODE_CONFIG_OPTIONS,
        default: async () => (await x()).retryMode || w.DEFAULT_RETRY_MODE
      }, s),
      sha256: (s == null ? void 0 : s.sha256) ?? p.Hash.bind(null, "sha256"),
      streamCollector: (s == null ? void 0 : s.streamCollector) ?? C.streamCollector,
      useDualstackEndpoint: (s == null ? void 0 : s.useDualstackEndpoint) ?? (0, a.loadConfig)(d.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, I),
      useFipsEndpoint: (s == null ? void 0 : s.useFipsEndpoint) ?? (0, a.loadConfig)(d.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, I),
      userAgentAppId: (s == null ? void 0 : s.userAgentAppId) ?? (0, a.loadConfig)(i.NODE_APP_ID_CONFIG_OPTIONS, I)
    };
  };
  return te.getRuntimeConfig = f, te;
}
var ie = {}, K = {}, pt;
function Hn() {
  if (pt) return K;
  pt = 1, Object.defineProperty(K, "__esModule", { value: !0 }), K.resolveHttpAuthRuntimeConfig = K.getHttpAuthExtensionConfiguration = void 0;
  const e = (n) => {
    const i = n.httpAuthSchemes;
    let d = n.httpAuthSchemeProvider, c = n.credentials;
    return {
      setHttpAuthScheme(p) {
        const _ = i.findIndex((a) => a.schemeId === p.schemeId);
        _ === -1 ? i.push(p) : i.splice(_, 1, p);
      },
      httpAuthSchemes() {
        return i;
      },
      setHttpAuthSchemeProvider(p) {
        d = p;
      },
      httpAuthSchemeProvider() {
        return d;
      },
      setCredentials(p) {
        c = p;
      },
      credentials() {
        return c;
      }
    };
  };
  K.getHttpAuthExtensionConfiguration = e;
  const t = (n) => ({
    httpAuthSchemes: n.httpAuthSchemes(),
    httpAuthSchemeProvider: n.httpAuthSchemeProvider(),
    credentials: n.credentials()
  });
  return K.resolveHttpAuthRuntimeConfig = t, K;
}
var mt;
function Nn() {
  if (mt) return ie;
  mt = 1, Object.defineProperty(ie, "__esModule", { value: !0 }), ie.resolveRuntimeExtensions = void 0;
  const e = yt, t = pn, n = se, i = /* @__PURE__ */ Hn(), d = (c, p) => {
    const _ = Object.assign((0, e.getAwsRegionExtensionConfiguration)(c), (0, n.getDefaultExtensionConfiguration)(c), (0, t.getHttpHandlerExtensionConfiguration)(c), (0, i.getHttpAuthExtensionConfiguration)(c));
    return p.forEach((a) => a.configure(_)), Object.assign(c, (0, e.resolveAwsRegionExtensionConfiguration)(_), (0, n.resolveDefaultRuntimeConfig)(_), (0, t.resolveHttpHandlerRuntimeConfig)(_), (0, i.resolveHttpAuthRuntimeConfig)(_));
  };
  return ie.resolveRuntimeExtensions = d, ie;
}
var ht;
function At() {
  return ht || (ht = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.STSClient = e.__Client = void 0;
    const t = Tn, n = Dn, i = wn, d = In, c = vt, p = /* @__PURE__ */ be(), _ = /* @__PURE__ */ St(), a = bn, C = Pt, r = Et, S = se;
    Object.defineProperty(e, "__Client", { enumerable: !0, get: function() {
      return S.Client;
    } });
    const u = /* @__PURE__ */ gt(), w = /* @__PURE__ */ Ct(), y = /* @__PURE__ */ Wn(), f = /* @__PURE__ */ Nn();
    class s extends S.Client {
      constructor(...[T]) {
        const I = (0, y.getRuntimeConfig)(T || {});
        super(I);
        R(this, "config");
        this.initConfig = I;
        const v = (0, w.resolveClientEndpointParameters)(I), D = (0, d.resolveUserAgentConfig)(v), G = (0, r.resolveRetryConfig)(D), z = (0, c.resolveRegionConfig)(G), E = (0, t.resolveHostHeaderConfig)(z), g = (0, C.resolveEndpointConfig)(E), $ = (0, u.resolveHttpAuthSchemeConfig)(g), V = (0, f.resolveRuntimeExtensions)($, (T == null ? void 0 : T.extensions) || []);
        this.config = V, this.middlewareStack.use((0, _.getSchemaSerdePlugin)(this.config)), this.middlewareStack.use((0, d.getUserAgentPlugin)(this.config)), this.middlewareStack.use((0, r.getRetryPlugin)(this.config)), this.middlewareStack.use((0, a.getContentLengthPlugin)(this.config)), this.middlewareStack.use((0, t.getHostHeaderPlugin)(this.config)), this.middlewareStack.use((0, n.getLoggerPlugin)(this.config)), this.middlewareStack.use((0, i.getRecursionDetectionPlugin)(this.config)), this.middlewareStack.use((0, p.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
          httpAuthSchemeParametersProvider: u.defaultSTSHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: async (W) => new p.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": W.credentials
          })
        })), this.middlewareStack.use((0, p.getHttpSigningPlugin)(this.config));
      }
      destroy() {
        super.destroy();
      }
    }
    e.STSClient = s;
  })(fe)), fe;
}
var _t;
function jn() {
  return _t || (_t = 1, (function(e) {
    var t = /* @__PURE__ */ At(), n = se, i = Pt, d = /* @__PURE__ */ Ct(), c = /* @__PURE__ */ St(), p = /* @__PURE__ */ mn(), _ = yt;
    class a extends n.ServiceException {
      constructor(l) {
        super(l), Object.setPrototypeOf(this, a.prototype);
      }
    }
    class C extends a {
      constructor(h) {
        super({
          name: "ExpiredTokenException",
          $fault: "client",
          ...h
        });
        R(this, "name", "ExpiredTokenException");
        R(this, "$fault", "client");
        Object.setPrototypeOf(this, C.prototype);
      }
    }
    class r extends a {
      constructor(h) {
        super({
          name: "MalformedPolicyDocumentException",
          $fault: "client",
          ...h
        });
        R(this, "name", "MalformedPolicyDocumentException");
        R(this, "$fault", "client");
        Object.setPrototypeOf(this, r.prototype);
      }
    }
    class S extends a {
      constructor(h) {
        super({
          name: "PackedPolicyTooLargeException",
          $fault: "client",
          ...h
        });
        R(this, "name", "PackedPolicyTooLargeException");
        R(this, "$fault", "client");
        Object.setPrototypeOf(this, S.prototype);
      }
    }
    class u extends a {
      constructor(h) {
        super({
          name: "RegionDisabledException",
          $fault: "client",
          ...h
        });
        R(this, "name", "RegionDisabledException");
        R(this, "$fault", "client");
        Object.setPrototypeOf(this, u.prototype);
      }
    }
    class w extends a {
      constructor(h) {
        super({
          name: "IDPRejectedClaimException",
          $fault: "client",
          ...h
        });
        R(this, "name", "IDPRejectedClaimException");
        R(this, "$fault", "client");
        Object.setPrototypeOf(this, w.prototype);
      }
    }
    class y extends a {
      constructor(h) {
        super({
          name: "InvalidIdentityTokenException",
          $fault: "client",
          ...h
        });
        R(this, "name", "InvalidIdentityTokenException");
        R(this, "$fault", "client");
        Object.setPrototypeOf(this, y.prototype);
      }
    }
    class f extends a {
      constructor(h) {
        super({
          name: "IDPCommunicationErrorException",
          $fault: "client",
          ...h
        });
        R(this, "name", "IDPCommunicationErrorException");
        R(this, "$fault", "client");
        Object.setPrototypeOf(this, f.prototype);
      }
    }
    const s = "Arn", k = "AccessKeyId", x = "AssumeRole", T = "AssumedRoleId", I = "AssumeRoleRequest", v = "AssumeRoleResponse", D = "AssumedRoleUser", G = "AssumeRoleWithWebIdentity", z = "AssumeRoleWithWebIdentityRequest", E = "AssumeRoleWithWebIdentityResponse", g = "Audience", $ = "Credentials", V = "ContextAssertion", W = "DurationSeconds", ae = "Expiration", ue = "ExternalId", le = "ExpiredTokenException", de = "IDPCommunicationErrorException", ce = "IDPRejectedClaimException", pe = "InvalidIdentityTokenException", _e = "Key", Rt = "MalformedPolicyDocumentException", De = "Policy", we = "PolicyArns", ft = "ProviderArn", It = "ProvidedContexts", Tt = "ProvidedContextsListType", bt = "ProvidedContext", Dt = "PolicyDescriptorType", wt = "ProviderId", xe = "PackedPolicySize", xt = "PackedPolicyTooLargeException", kt = "Provider", ke = "RoleArn", $t = "RegionDisabledException", $e = "RoleSessionName", qt = "SecretAccessKey", Wt = "SubjectFromWebIdentityToken", Se = "SourceIdentity", Ht = "SerialNumber", Nt = "SessionToken", jt = "Tags", Ft = "TokenCode", Ot = "TransitiveTagKeys", Mt = "Tag", Ut = "Value", Lt = "WebIdentityToken", Kt = "arn", Gt = "accessKeySecretType", H = "awsQueryError", N = "client", zt = "clientTokenType", j = "error", F = "httpError", O = "message", Vt = "policyDescriptorListType", qe = "smithy.ts.sdk.synthetic.com.amazonaws.sts", Bt = "tagListType", m = "com.amazonaws.sts";
    var Qt = [0, m, Gt, 8, 0], Yt = [0, m, zt, 8, 0], ve = [3, m, D, 0, [T, s], [0, 0], 2], We = [
      3,
      m,
      I,
      0,
      [ke, $e, we, De, W, jt, Ot, ue, Ht, Ft, Se, It],
      [0, 0, () => Ye, 0, 1, () => Xt, 64, 0, 0, 0, 0, () => Jt],
      2
    ], He = [
      3,
      m,
      v,
      0,
      [$, D, xe, Se],
      [[() => Ee, 0], () => ve, 1, 0]
    ], Ne = [
      3,
      m,
      z,
      0,
      [ke, $e, Lt, wt, we, De, W],
      [0, 0, [() => Yt, 0], 0, () => Ye, 0, 1],
      3
    ], je = [
      3,
      m,
      E,
      0,
      [$, Wt, D, xe, kt, g, Se],
      [[() => Ee, 0], 0, () => ve, 1, 0, 0, 0]
    ], Ee = [
      3,
      m,
      $,
      0,
      [k, qt, Nt, ae],
      [0, [() => Qt, 0], 0, 4],
      4
    ], Fe = [
      -3,
      m,
      le,
      { [H]: ["ExpiredTokenException", 400], [j]: N, [F]: 400 },
      [O],
      [0]
    ];
    c.TypeRegistry.for(m).registerError(Fe, C);
    var Oe = [
      -3,
      m,
      de,
      { [H]: ["IDPCommunicationError", 400], [j]: N, [F]: 400 },
      [O],
      [0]
    ];
    c.TypeRegistry.for(m).registerError(Oe, f);
    var Me = [
      -3,
      m,
      ce,
      { [H]: ["IDPRejectedClaim", 403], [j]: N, [F]: 403 },
      [O],
      [0]
    ];
    c.TypeRegistry.for(m).registerError(Me, w);
    var Ue = [
      -3,
      m,
      pe,
      { [H]: ["InvalidIdentityToken", 400], [j]: N, [F]: 400 },
      [O],
      [0]
    ];
    c.TypeRegistry.for(m).registerError(Ue, y);
    var Le = [
      -3,
      m,
      Rt,
      { [H]: ["MalformedPolicyDocument", 400], [j]: N, [F]: 400 },
      [O],
      [0]
    ];
    c.TypeRegistry.for(m).registerError(Le, r);
    var Ke = [
      -3,
      m,
      xt,
      { [H]: ["PackedPolicyTooLarge", 400], [j]: N, [F]: 400 },
      [O],
      [0]
    ];
    c.TypeRegistry.for(m).registerError(Ke, S);
    var Ge = [3, m, Dt, 0, [Kt], [0]], ze = [3, m, bt, 0, [ft, V], [0, 0]], Ve = [
      -3,
      m,
      $t,
      { [H]: ["RegionDisabledException", 403], [j]: N, [F]: 403 },
      [O],
      [0]
    ];
    c.TypeRegistry.for(m).registerError(Ve, u);
    var Be = [3, m, Mt, 0, [_e, Ut], [0, 0], 2], Qe = [-3, qe, "STSServiceException", 0, [], []];
    c.TypeRegistry.for(qe).registerError(Qe, a);
    var Ye = [1, m, Vt, 0, () => Ge], Jt = [1, m, Tt, 0, () => ze], Xt = [1, m, Bt, 0, () => Be], Je = [9, m, x, 0, () => We, () => He], Xe = [
      9,
      m,
      G,
      0,
      () => Ne,
      () => je
    ];
    class ye extends n.Command.classBuilder().ep(d.commonParams).m(function(l, h, b, P) {
      return [i.getEndpointPlugin(b, l.getEndpointParameterInstructions())];
    }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").sc(Je).build() {
    }
    class Pe extends n.Command.classBuilder().ep(d.commonParams).m(function(l, h, b, P) {
      return [i.getEndpointPlugin(b, l.getEndpointParameterInstructions())];
    }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").sc(Xe).build() {
    }
    const Zt = {
      AssumeRoleCommand: ye,
      AssumeRoleWithWebIdentityCommand: Pe
    };
    class Ze extends t.STSClient {
    }
    n.createAggregatedClient(Zt, Ze);
    const et = (o) => {
      if (typeof (o == null ? void 0 : o.Arn) == "string") {
        const l = o.Arn.split(":");
        if (l.length > 4 && l[4] !== "")
          return l[4];
      }
    }, tt = async (o, l, h, b = {}) => {
      var q;
      const P = typeof o == "function" ? await o() : o, M = typeof l == "function" ? await l() : l;
      let A = "";
      const U = P ?? M ?? (A = await _.stsRegionDefaultResolver(b)());
      return (q = h == null ? void 0 : h.debug) == null || q.call(h, "@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${P} (credential provider clientConfig)`, `${M} (contextual client)`, `${A} (STS default: AWS_REGION, profile region, or us-east-1)`), U;
    }, en = (o, l) => {
      let h, b;
      return async (P, M) => {
        var Q, Y, J, X, Z;
        if (b = P, !h) {
          const { logger: me = (Q = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : Q.logger, profile: ee = (Y = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : Y.profile, region: ge, requestHandler: he = (J = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : J.requestHandler, credentialProviderLogger: Ce, userAgentAppId: Ae = (X = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : X.userAgentAppId } = o, rn = await tt(ge, (Z = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : Z.region, Ce, {
            logger: me,
            profile: ee
          }), on = !nt(he);
          h = new l({
            ...o,
            userAgentAppId: Ae,
            profile: ee,
            credentialDefaultProvider: () => async () => b,
            region: rn,
            requestHandler: on ? he : void 0,
            logger: me
          });
        }
        const { Credentials: A, AssumedRoleUser: U } = await h.send(new ye(M));
        if (!A || !A.AccessKeyId || !A.SecretAccessKey)
          throw new Error(`Invalid response from STS.assumeRole call with role ${M.RoleArn}`);
        const q = et(U), B = {
          accessKeyId: A.AccessKeyId,
          secretAccessKey: A.SecretAccessKey,
          sessionToken: A.SessionToken,
          expiration: A.Expiration,
          ...A.CredentialScope && { credentialScope: A.CredentialScope },
          ...q && { accountId: q }
        };
        return p.setCredentialFeature(B, "CREDENTIALS_STS_ASSUME_ROLE", "i"), B;
      };
    }, tn = (o, l) => {
      let h;
      return async (b) => {
        var q, B, Q, Y, J;
        if (!h) {
          const { logger: X = (q = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : q.logger, profile: Z = (B = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : B.profile, region: me, requestHandler: ee = (Q = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : Q.requestHandler, credentialProviderLogger: ge, userAgentAppId: he = (Y = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : Y.userAgentAppId } = o, Ce = await tt(me, (J = o == null ? void 0 : o.parentClientConfig) == null ? void 0 : J.region, ge, {
            logger: X,
            profile: Z
          }), Ae = !nt(ee);
          h = new l({
            ...o,
            userAgentAppId: he,
            profile: Z,
            region: Ce,
            requestHandler: Ae ? ee : void 0,
            logger: X
          });
        }
        const { Credentials: P, AssumedRoleUser: M } = await h.send(new Pe(b));
        if (!P || !P.AccessKeyId || !P.SecretAccessKey)
          throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${b.RoleArn}`);
        const A = et(M), U = {
          accessKeyId: P.AccessKeyId,
          secretAccessKey: P.SecretAccessKey,
          sessionToken: P.SessionToken,
          expiration: P.Expiration,
          ...P.CredentialScope && { credentialScope: P.CredentialScope },
          ...A && { accountId: A }
        };
        return A && p.setCredentialFeature(U, "RESOLVED_ACCOUNT_ID", "T"), p.setCredentialFeature(U, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k"), U;
      };
    }, nt = (o) => {
      var l;
      return ((l = o == null ? void 0 : o.metadata) == null ? void 0 : l.handlerProtocol) === "h2";
    }, rt = (o, l) => l ? class extends o {
      constructor(b) {
        super(b);
        for (const P of l)
          this.middlewareStack.use(P);
      }
    } : o, ot = (o = {}, l) => en(o, rt(t.STSClient, l)), it = (o = {}, l) => tn(o, rt(t.STSClient, l)), nn = (o) => (l) => o({
      roleAssumer: ot(l),
      roleAssumerWithWebIdentity: it(l),
      ...l
    });
    Object.defineProperty(e, "$Command", {
      enumerable: !0,
      get: function() {
        return n.Command;
      }
    }), e.AssumeRole$ = Je, e.AssumeRoleCommand = ye, e.AssumeRoleRequest$ = We, e.AssumeRoleResponse$ = He, e.AssumeRoleWithWebIdentity$ = Xe, e.AssumeRoleWithWebIdentityCommand = Pe, e.AssumeRoleWithWebIdentityRequest$ = Ne, e.AssumeRoleWithWebIdentityResponse$ = je, e.AssumedRoleUser$ = ve, e.Credentials$ = Ee, e.ExpiredTokenException = C, e.ExpiredTokenException$ = Fe, e.IDPCommunicationErrorException = f, e.IDPCommunicationErrorException$ = Oe, e.IDPRejectedClaimException = w, e.IDPRejectedClaimException$ = Me, e.InvalidIdentityTokenException = y, e.InvalidIdentityTokenException$ = Ue, e.MalformedPolicyDocumentException = r, e.MalformedPolicyDocumentException$ = Le, e.PackedPolicyTooLargeException = S, e.PackedPolicyTooLargeException$ = Ke, e.PolicyDescriptorType$ = Ge, e.ProvidedContext$ = ze, e.RegionDisabledException = u, e.RegionDisabledException$ = Ve, e.STS = Ze, e.STSServiceException = a, e.STSServiceException$ = Qe, e.Tag$ = Be, e.decorateDefaultCredentialProvider = nn, e.getDefaultRoleAssumer = ot, e.getDefaultRoleAssumerWithWebIdentity = it, Object.keys(t).forEach(function(o) {
      o !== "default" && !Object.prototype.hasOwnProperty.call(e, o) && Object.defineProperty(e, o, {
        enumerable: !0,
        get: function() {
          return t[o];
        }
      });
    });
  })(Re)), Re;
}
var Fn = /* @__PURE__ */ jn();
const Kn = /* @__PURE__ */ xn({
  __proto__: null
}, [Fn]);
export {
  Kn as i
};
