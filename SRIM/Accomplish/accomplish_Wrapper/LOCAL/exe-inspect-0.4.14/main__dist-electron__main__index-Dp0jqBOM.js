import "./index-ChliSiZl.js";
import rt from "tty";
import at from "util";
import ct from "os";
(function() {
  try {
    var a = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, c = new a.Error().stack;
    c && (a._sentryDebugIds = a._sentryDebugIds || {}, a._sentryDebugIds[c] = "51e94b6c-0cf5-40cd-8e63-f9c98a61b594", a._sentryDebugIdIdentifier = "sentry-dbid-51e94b6c-0cf5-40cd-8e63-f9c98a61b594");
  } catch {
  }
})();
var se, sr;
function ut() {
  if (sr) return se;
  sr = 1;
  var a = 1e3, c = a * 60, o = c * 60, r = o * 24, u = r * 7, E = r * 365.25;
  se = function(e, t) {
    t = t || {};
    var s = typeof e;
    if (s === "string" && e.length > 0)
      return l(e);
    if (s === "number" && isFinite(e))
      return t.long ? n(e) : p(e);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(e)
    );
  };
  function l(e) {
    if (e = String(e), !(e.length > 100)) {
      var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        e
      );
      if (t) {
        var s = parseFloat(t[1]), f = (t[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return s * E;
          case "weeks":
          case "week":
          case "w":
            return s * u;
          case "days":
          case "day":
          case "d":
            return s * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return s * o;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return s * c;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return s * a;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return s;
          default:
            return;
        }
      }
    }
  }
  function p(e) {
    var t = Math.abs(e);
    return t >= r ? Math.round(e / r) + "d" : t >= o ? Math.round(e / o) + "h" : t >= c ? Math.round(e / c) + "m" : t >= a ? Math.round(e / a) + "s" : e + "ms";
  }
  function n(e) {
    var t = Math.abs(e);
    return t >= r ? i(e, t, r, "day") : t >= o ? i(e, t, o, "hour") : t >= c ? i(e, t, c, "minute") : t >= a ? i(e, t, a, "second") : e + " ms";
  }
  function i(e, t, s, f) {
    var R = t >= s * 1.5;
    return Math.round(e / s) + " " + f + (R ? "s" : "");
  }
  return se;
}
var B = { exports: {} }, ne, nr;
function z() {
  if (nr) return ne;
  nr = 1;
  const a = "2.0.0", c = 256, o = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, r = 16, u = c - 6;
  return ne = {
    MAX_LENGTH: c,
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: u,
    MAX_SAFE_INTEGER: o,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: a,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, ne;
}
var ie, ir;
function Z() {
  return ir || (ir = 1, ie = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...c) => console.error("SEMVER", ...c) : () => {
  }), ie;
}
var or;
function k() {
  return or || (or = 1, (function(a, c) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: o,
      MAX_SAFE_BUILD_LENGTH: r,
      MAX_LENGTH: u
    } = z(), E = Z();
    c = a.exports = {};
    const l = c.re = [], p = c.safeRe = [], n = c.src = [], i = c.safeSrc = [], e = c.t = {};
    let t = 0;
    const s = "[a-zA-Z0-9-]", f = [
      ["\\s", 1],
      ["\\d", u],
      [s, r]
    ], R = (C) => {
      for (const [$, T] of f)
        C = C.split(`${$}*`).join(`${$}{0,${T}}`).split(`${$}+`).join(`${$}{1,${T}}`);
      return C;
    }, h = (C, $, T) => {
      const w = R($), _ = t++;
      E(C, _, $), e[C] = _, n[_] = $, i[_] = w, l[_] = new RegExp($, T ? "g" : void 0), p[_] = new RegExp(w, T ? "g" : void 0);
    };
    h("NUMERICIDENTIFIER", "0|[1-9]\\d*"), h("NUMERICIDENTIFIERLOOSE", "\\d+"), h("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${s}*`), h("MAINVERSION", `(${n[e.NUMERICIDENTIFIER]})\\.(${n[e.NUMERICIDENTIFIER]})\\.(${n[e.NUMERICIDENTIFIER]})`), h("MAINVERSIONLOOSE", `(${n[e.NUMERICIDENTIFIERLOOSE]})\\.(${n[e.NUMERICIDENTIFIERLOOSE]})\\.(${n[e.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASEIDENTIFIER", `(?:${n[e.NONNUMERICIDENTIFIER]}|${n[e.NUMERICIDENTIFIER]})`), h("PRERELEASEIDENTIFIERLOOSE", `(?:${n[e.NONNUMERICIDENTIFIER]}|${n[e.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASE", `(?:-(${n[e.PRERELEASEIDENTIFIER]}(?:\\.${n[e.PRERELEASEIDENTIFIER]})*))`), h("PRERELEASELOOSE", `(?:-?(${n[e.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${n[e.PRERELEASEIDENTIFIERLOOSE]})*))`), h("BUILDIDENTIFIER", `${s}+`), h("BUILD", `(?:\\+(${n[e.BUILDIDENTIFIER]}(?:\\.${n[e.BUILDIDENTIFIER]})*))`), h("FULLPLAIN", `v?${n[e.MAINVERSION]}${n[e.PRERELEASE]}?${n[e.BUILD]}?`), h("FULL", `^${n[e.FULLPLAIN]}$`), h("LOOSEPLAIN", `[v=\\s]*${n[e.MAINVERSIONLOOSE]}${n[e.PRERELEASELOOSE]}?${n[e.BUILD]}?`), h("LOOSE", `^${n[e.LOOSEPLAIN]}$`), h("GTLT", "((?:<|>)?=?)"), h("XRANGEIDENTIFIERLOOSE", `${n[e.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), h("XRANGEIDENTIFIER", `${n[e.NUMERICIDENTIFIER]}|x|X|\\*`), h("XRANGEPLAIN", `[v=\\s]*(${n[e.XRANGEIDENTIFIER]})(?:\\.(${n[e.XRANGEIDENTIFIER]})(?:\\.(${n[e.XRANGEIDENTIFIER]})(?:${n[e.PRERELEASE]})?${n[e.BUILD]}?)?)?`), h("XRANGEPLAINLOOSE", `[v=\\s]*(${n[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[e.XRANGEIDENTIFIERLOOSE]})(?:${n[e.PRERELEASELOOSE]})?${n[e.BUILD]}?)?)?`), h("XRANGE", `^${n[e.GTLT]}\\s*${n[e.XRANGEPLAIN]}$`), h("XRANGELOOSE", `^${n[e.GTLT]}\\s*${n[e.XRANGEPLAINLOOSE]}$`), h("COERCEPLAIN", `(^|[^\\d])(\\d{1,${o}})(?:\\.(\\d{1,${o}}))?(?:\\.(\\d{1,${o}}))?`), h("COERCE", `${n[e.COERCEPLAIN]}(?:$|[^\\d])`), h("COERCEFULL", n[e.COERCEPLAIN] + `(?:${n[e.PRERELEASE]})?(?:${n[e.BUILD]})?(?:$|[^\\d])`), h("COERCERTL", n[e.COERCE], !0), h("COERCERTLFULL", n[e.COERCEFULL], !0), h("LONETILDE", "(?:~>?)"), h("TILDETRIM", `(\\s*)${n[e.LONETILDE]}\\s+`, !0), c.tildeTrimReplace = "$1~", h("TILDE", `^${n[e.LONETILDE]}${n[e.XRANGEPLAIN]}$`), h("TILDELOOSE", `^${n[e.LONETILDE]}${n[e.XRANGEPLAINLOOSE]}$`), h("LONECARET", "(?:\\^)"), h("CARETTRIM", `(\\s*)${n[e.LONECARET]}\\s+`, !0), c.caretTrimReplace = "$1^", h("CARET", `^${n[e.LONECARET]}${n[e.XRANGEPLAIN]}$`), h("CARETLOOSE", `^${n[e.LONECARET]}${n[e.XRANGEPLAINLOOSE]}$`), h("COMPARATORLOOSE", `^${n[e.GTLT]}\\s*(${n[e.LOOSEPLAIN]})$|^$`), h("COMPARATOR", `^${n[e.GTLT]}\\s*(${n[e.FULLPLAIN]})$|^$`), h("COMPARATORTRIM", `(\\s*)${n[e.GTLT]}\\s*(${n[e.LOOSEPLAIN]}|${n[e.XRANGEPLAIN]})`, !0), c.comparatorTrimReplace = "$1$2$3", h("HYPHENRANGE", `^\\s*(${n[e.XRANGEPLAIN]})\\s+-\\s+(${n[e.XRANGEPLAIN]})\\s*$`), h("HYPHENRANGELOOSE", `^\\s*(${n[e.XRANGEPLAINLOOSE]})\\s+-\\s+(${n[e.XRANGEPLAINLOOSE]})\\s*$`), h("STAR", "(<|>)?=?\\s*\\*"), h("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), h("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(B, B.exports)), B.exports;
}
var oe, ar;
function Je() {
  if (ar) return oe;
  ar = 1;
  const a = Object.freeze({ loose: !0 }), c = Object.freeze({});
  return oe = (r) => r ? typeof r != "object" ? a : r : c, oe;
}
var ae, cr;
function tt() {
  if (cr) return ae;
  cr = 1;
  const a = /^[0-9]+$/, c = (r, u) => {
    if (typeof r == "number" && typeof u == "number")
      return r === u ? 0 : r < u ? -1 : 1;
    const E = a.test(r), l = a.test(u);
    return E && l && (r = +r, u = +u), r === u ? 0 : E && !l ? -1 : l && !E ? 1 : r < u ? -1 : 1;
  };
  return ae = {
    compareIdentifiers: c,
    rcompareIdentifiers: (r, u) => c(u, r)
  }, ae;
}
var ce, ur;
function G() {
  if (ur) return ce;
  ur = 1;
  const a = Z(), { MAX_LENGTH: c, MAX_SAFE_INTEGER: o } = z(), { safeRe: r, t: u } = k(), E = Je(), { compareIdentifiers: l } = tt();
  class p {
    constructor(i, e) {
      if (e = E(e), i instanceof p) {
        if (i.loose === !!e.loose && i.includePrerelease === !!e.includePrerelease)
          return i;
        i = i.version;
      } else if (typeof i != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof i}".`);
      if (i.length > c)
        throw new TypeError(
          `version is longer than ${c} characters`
        );
      a("SemVer", i, e), this.options = e, this.loose = !!e.loose, this.includePrerelease = !!e.includePrerelease;
      const t = i.trim().match(e.loose ? r[u.LOOSE] : r[u.FULL]);
      if (!t)
        throw new TypeError(`Invalid Version: ${i}`);
      if (this.raw = i, this.major = +t[1], this.minor = +t[2], this.patch = +t[3], this.major > o || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > o || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > o || this.patch < 0)
        throw new TypeError("Invalid patch version");
      t[4] ? this.prerelease = t[4].split(".").map((s) => {
        if (/^[0-9]+$/.test(s)) {
          const f = +s;
          if (f >= 0 && f < o)
            return f;
        }
        return s;
      }) : this.prerelease = [], this.build = t[5] ? t[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(i) {
      if (a("SemVer.compare", this.version, this.options, i), !(i instanceof p)) {
        if (typeof i == "string" && i === this.version)
          return 0;
        i = new p(i, this.options);
      }
      return i.version === this.version ? 0 : this.compareMain(i) || this.comparePre(i);
    }
    compareMain(i) {
      return i instanceof p || (i = new p(i, this.options)), this.major < i.major ? -1 : this.major > i.major ? 1 : this.minor < i.minor ? -1 : this.minor > i.minor ? 1 : this.patch < i.patch ? -1 : this.patch > i.patch ? 1 : 0;
    }
    comparePre(i) {
      if (i instanceof p || (i = new p(i, this.options)), this.prerelease.length && !i.prerelease.length)
        return -1;
      if (!this.prerelease.length && i.prerelease.length)
        return 1;
      if (!this.prerelease.length && !i.prerelease.length)
        return 0;
      let e = 0;
      do {
        const t = this.prerelease[e], s = i.prerelease[e];
        if (a("prerelease compare", e, t, s), t === void 0 && s === void 0)
          return 0;
        if (s === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === s)
          continue;
        return l(t, s);
      } while (++e);
    }
    compareBuild(i) {
      i instanceof p || (i = new p(i, this.options));
      let e = 0;
      do {
        const t = this.build[e], s = i.build[e];
        if (a("build compare", e, t, s), t === void 0 && s === void 0)
          return 0;
        if (s === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === s)
          continue;
        return l(t, s);
      } while (++e);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(i, e, t) {
      if (i.startsWith("pre")) {
        if (!e && t === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (e) {
          const s = `-${e}`.match(this.options.loose ? r[u.PRERELEASELOOSE] : r[u.PRERELEASE]);
          if (!s || s[1] !== e)
            throw new Error(`invalid identifier: ${e}`);
        }
      }
      switch (i) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", e, t);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", e, t);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", e, t), this.inc("pre", e, t);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", e, t), this.inc("pre", e, t);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const s = Number(t) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [s];
          else {
            let f = this.prerelease.length;
            for (; --f >= 0; )
              typeof this.prerelease[f] == "number" && (this.prerelease[f]++, f = -2);
            if (f === -1) {
              if (e === this.prerelease.join(".") && t === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(s);
            }
          }
          if (e) {
            let f = [e, s];
            t === !1 && (f = [e]), l(this.prerelease[0], e) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = f) : this.prerelease = f;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${i}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return ce = p, ce;
}
var ue, lr;
function M() {
  if (lr) return ue;
  lr = 1;
  const a = G();
  return ue = (o, r, u = !1) => {
    if (o instanceof a)
      return o;
    try {
      return new a(o, r);
    } catch (E) {
      if (!u)
        return null;
      throw E;
    }
  }, ue;
}
var le, fr;
function lt() {
  if (fr) return le;
  fr = 1;
  const a = M();
  return le = (o, r) => {
    const u = a(o, r);
    return u ? u.version : null;
  }, le;
}
var fe, hr;
function ft() {
  if (hr) return fe;
  hr = 1;
  const a = M();
  return fe = (o, r) => {
    const u = a(o.trim().replace(/^[=v]+/, ""), r);
    return u ? u.version : null;
  }, fe;
}
var he, pr;
function ht() {
  if (pr) return he;
  pr = 1;
  const a = G();
  return he = (o, r, u, E, l) => {
    typeof u == "string" && (l = E, E = u, u = void 0);
    try {
      return new a(
        o instanceof a ? o.version : o,
        u
      ).inc(r, E, l).version;
    } catch {
      return null;
    }
  }, he;
}
var pe, Er;
function pt() {
  if (Er) return pe;
  Er = 1;
  const a = M();
  return pe = (o, r) => {
    const u = a(o, null, !0), E = a(r, null, !0), l = u.compare(E);
    if (l === 0)
      return null;
    const p = l > 0, n = p ? u : E, i = p ? E : u, e = !!n.prerelease.length;
    if (!!i.prerelease.length && !e) {
      if (!i.patch && !i.minor)
        return "major";
      if (i.compareMain(n) === 0)
        return i.minor && !i.patch ? "minor" : "patch";
    }
    const s = e ? "pre" : "";
    return u.major !== E.major ? s + "major" : u.minor !== E.minor ? s + "minor" : u.patch !== E.patch ? s + "patch" : "prerelease";
  }, pe;
}
var Ee, dr;
function Et() {
  if (dr) return Ee;
  dr = 1;
  const a = G();
  return Ee = (o, r) => new a(o, r).major, Ee;
}
var de, mr;
function dt() {
  if (mr) return de;
  mr = 1;
  const a = G();
  return de = (o, r) => new a(o, r).minor, de;
}
var me, Rr;
function mt() {
  if (Rr) return me;
  Rr = 1;
  const a = G();
  return me = (o, r) => new a(o, r).patch, me;
}
var Re, Cr;
function Rt() {
  if (Cr) return Re;
  Cr = 1;
  const a = M();
  return Re = (o, r) => {
    const u = a(o, r);
    return u && u.prerelease.length ? u.prerelease : null;
  }, Re;
}
var Ce, vr;
function j() {
  if (vr) return Ce;
  vr = 1;
  const a = G();
  return Ce = (o, r, u) => new a(o, u).compare(new a(r, u)), Ce;
}
var ve, Ir;
function Ct() {
  if (Ir) return ve;
  Ir = 1;
  const a = j();
  return ve = (o, r, u) => a(r, o, u), ve;
}
var Ie, gr;
function vt() {
  if (gr) return Ie;
  gr = 1;
  const a = j();
  return Ie = (o, r) => a(o, r, !0), Ie;
}
var ge, Or;
function Ke() {
  if (Or) return ge;
  Or = 1;
  const a = G();
  return ge = (o, r, u) => {
    const E = new a(o, u), l = new a(r, u);
    return E.compare(l) || E.compareBuild(l);
  }, ge;
}
var Oe, $r;
function It() {
  if ($r) return Oe;
  $r = 1;
  const a = Ke();
  return Oe = (o, r) => o.sort((u, E) => a(u, E, r)), Oe;
}
var $e, Lr;
function gt() {
  if (Lr) return $e;
  Lr = 1;
  const a = Ke();
  return $e = (o, r) => o.sort((u, E) => a(E, u, r)), $e;
}
var Le, Nr;
function J() {
  if (Nr) return Le;
  Nr = 1;
  const a = j();
  return Le = (o, r, u) => a(o, r, u) > 0, Le;
}
var Ne, Sr;
function Qe() {
  if (Sr) return Ne;
  Sr = 1;
  const a = j();
  return Ne = (o, r, u) => a(o, r, u) < 0, Ne;
}
var Se, wr;
function st() {
  if (wr) return Se;
  wr = 1;
  const a = j();
  return Se = (o, r, u) => a(o, r, u) === 0, Se;
}
var we, Ar;
function nt() {
  if (Ar) return we;
  Ar = 1;
  const a = j();
  return we = (o, r, u) => a(o, r, u) !== 0, we;
}
var Ae, Tr;
function er() {
  if (Tr) return Ae;
  Tr = 1;
  const a = j();
  return Ae = (o, r, u) => a(o, r, u) >= 0, Ae;
}
var Te, yr;
function rr() {
  if (yr) return Te;
  yr = 1;
  const a = j();
  return Te = (o, r, u) => a(o, r, u) <= 0, Te;
}
var ye, Fr;
function it() {
  if (Fr) return ye;
  Fr = 1;
  const a = st(), c = nt(), o = J(), r = er(), u = Qe(), E = rr();
  return ye = (p, n, i, e) => {
    switch (n) {
      case "===":
        return typeof p == "object" && (p = p.version), typeof i == "object" && (i = i.version), p === i;
      case "!==":
        return typeof p == "object" && (p = p.version), typeof i == "object" && (i = i.version), p !== i;
      case "":
      case "=":
      case "==":
        return a(p, i, e);
      case "!=":
        return c(p, i, e);
      case ">":
        return o(p, i, e);
      case ">=":
        return r(p, i, e);
      case "<":
        return u(p, i, e);
      case "<=":
        return E(p, i, e);
      default:
        throw new TypeError(`Invalid operator: ${n}`);
    }
  }, ye;
}
var Fe, qr;
function Ot() {
  if (qr) return Fe;
  qr = 1;
  const a = G(), c = M(), { safeRe: o, t: r } = k();
  return Fe = (E, l) => {
    if (E instanceof a)
      return E;
    if (typeof E == "number" && (E = String(E)), typeof E != "string")
      return null;
    l = l || {};
    let p = null;
    if (!l.rtl)
      p = E.match(l.includePrerelease ? o[r.COERCEFULL] : o[r.COERCE]);
    else {
      const f = l.includePrerelease ? o[r.COERCERTLFULL] : o[r.COERCERTL];
      let R;
      for (; (R = f.exec(E)) && (!p || p.index + p[0].length !== E.length); )
        (!p || R.index + R[0].length !== p.index + p[0].length) && (p = R), f.lastIndex = R.index + R[1].length + R[2].length;
      f.lastIndex = -1;
    }
    if (p === null)
      return null;
    const n = p[2], i = p[3] || "0", e = p[4] || "0", t = l.includePrerelease && p[5] ? `-${p[5]}` : "", s = l.includePrerelease && p[6] ? `+${p[6]}` : "";
    return c(`${n}.${i}.${e}${t}${s}`, l);
  }, Fe;
}
var qe, Pr;
function $t() {
  if (Pr) return qe;
  Pr = 1;
  class a {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(o) {
      const r = this.map.get(o);
      if (r !== void 0)
        return this.map.delete(o), this.map.set(o, r), r;
    }
    delete(o) {
      return this.map.delete(o);
    }
    set(o, r) {
      if (!this.delete(o) && r !== void 0) {
        if (this.map.size >= this.max) {
          const E = this.map.keys().next().value;
          this.delete(E);
        }
        this.map.set(o, r);
      }
      return this;
    }
  }
  return qe = a, qe;
}
var Pe, br;
function U() {
  if (br) return Pe;
  br = 1;
  const a = /\s+/g;
  class c {
    constructor(d, g) {
      if (g = u(g), d instanceof c)
        return d.loose === !!g.loose && d.includePrerelease === !!g.includePrerelease ? d : new c(d.raw, g);
      if (d instanceof E)
        return this.raw = d.value, this.set = [[d]], this.formatted = void 0, this;
      if (this.options = g, this.loose = !!g.loose, this.includePrerelease = !!g.includePrerelease, this.raw = d.trim().replace(a, " "), this.set = this.raw.split("||").map((v) => this.parseRange(v.trim())).filter((v) => v.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const v = this.set[0];
        if (this.set = this.set.filter((O) => !h(O[0])), this.set.length === 0)
          this.set = [v];
        else if (this.set.length > 1) {
          for (const O of this.set)
            if (O.length === 1 && C(O[0])) {
              this.set = [O];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let d = 0; d < this.set.length; d++) {
          d > 0 && (this.formatted += "||");
          const g = this.set[d];
          for (let v = 0; v < g.length; v++)
            v > 0 && (this.formatted += " "), this.formatted += g[v].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(d) {
      const v = ((this.options.includePrerelease && f) | (this.options.loose && R)) + ":" + d, O = r.get(v);
      if (O)
        return O;
      const I = this.options.loose, N = I ? n[i.HYPHENRANGELOOSE] : n[i.HYPHENRANGE];
      d = d.replace(N, re(this.options.includePrerelease)), l("hyphen replace", d), d = d.replace(n[i.COMPARATORTRIM], e), l("comparator trim", d), d = d.replace(n[i.TILDETRIM], t), l("tilde trim", d), d = d.replace(n[i.CARETTRIM], s), l("caret trim", d);
      let A = d.split(" ").map((P) => T(P, this.options)).join(" ").split(/\s+/).map((P) => ee(P, this.options));
      I && (A = A.filter((P) => (l("loose invalid filter", P, this.options), !!P.match(n[i.COMPARATORLOOSE])))), l("range list", A);
      const S = /* @__PURE__ */ new Map(), F = A.map((P) => new E(P, this.options));
      for (const P of F) {
        if (h(P))
          return [P];
        S.set(P.value, P);
      }
      S.size > 1 && S.has("") && S.delete("");
      const D = [...S.values()];
      return r.set(v, D), D;
    }
    intersects(d, g) {
      if (!(d instanceof c))
        throw new TypeError("a Range is required");
      return this.set.some((v) => $(v, g) && d.set.some((O) => $(O, g) && v.every((I) => O.every((N) => I.intersects(N, g)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(d) {
      if (!d)
        return !1;
      if (typeof d == "string")
        try {
          d = new p(d, this.options);
        } catch {
          return !1;
        }
      for (let g = 0; g < this.set.length; g++)
        if (te(this.set[g], d, this.options))
          return !0;
      return !1;
    }
  }
  Pe = c;
  const o = $t(), r = new o(), u = Je(), E = K(), l = Z(), p = G(), {
    safeRe: n,
    t: i,
    comparatorTrimReplace: e,
    tildeTrimReplace: t,
    caretTrimReplace: s
  } = k(), { FLAG_INCLUDE_PRERELEASE: f, FLAG_LOOSE: R } = z(), h = (m) => m.value === "<0.0.0-0", C = (m) => m.value === "", $ = (m, d) => {
    let g = !0;
    const v = m.slice();
    let O = v.pop();
    for (; g && v.length; )
      g = v.every((I) => O.intersects(I, d)), O = v.pop();
    return g;
  }, T = (m, d) => (m = m.replace(n[i.BUILD], ""), l("comp", m, d), m = y(m, d), l("caret", m), m = _(m, d), l("tildes", m), m = L(m, d), l("xrange", m), m = V(m, d), l("stars", m), m), w = (m) => !m || m.toLowerCase() === "x" || m === "*", _ = (m, d) => m.trim().split(/\s+/).map((g) => b(g, d)).join(" "), b = (m, d) => {
    const g = d.loose ? n[i.TILDELOOSE] : n[i.TILDE];
    return m.replace(g, (v, O, I, N, A) => {
      l("tilde", m, v, O, I, N, A);
      let S;
      return w(O) ? S = "" : w(I) ? S = `>=${O}.0.0 <${+O + 1}.0.0-0` : w(N) ? S = `>=${O}.${I}.0 <${O}.${+I + 1}.0-0` : A ? (l("replaceTilde pr", A), S = `>=${O}.${I}.${N}-${A} <${O}.${+I + 1}.0-0`) : S = `>=${O}.${I}.${N} <${O}.${+I + 1}.0-0`, l("tilde return", S), S;
    });
  }, y = (m, d) => m.trim().split(/\s+/).map((g) => q(g, d)).join(" "), q = (m, d) => {
    l("caret", m, d);
    const g = d.loose ? n[i.CARETLOOSE] : n[i.CARET], v = d.includePrerelease ? "-0" : "";
    return m.replace(g, (O, I, N, A, S) => {
      l("caret", m, O, I, N, A, S);
      let F;
      return w(I) ? F = "" : w(N) ? F = `>=${I}.0.0${v} <${+I + 1}.0.0-0` : w(A) ? I === "0" ? F = `>=${I}.${N}.0${v} <${I}.${+N + 1}.0-0` : F = `>=${I}.${N}.0${v} <${+I + 1}.0.0-0` : S ? (l("replaceCaret pr", S), I === "0" ? N === "0" ? F = `>=${I}.${N}.${A}-${S} <${I}.${N}.${+A + 1}-0` : F = `>=${I}.${N}.${A}-${S} <${I}.${+N + 1}.0-0` : F = `>=${I}.${N}.${A}-${S} <${+I + 1}.0.0-0`) : (l("no pr"), I === "0" ? N === "0" ? F = `>=${I}.${N}.${A}${v} <${I}.${N}.${+A + 1}-0` : F = `>=${I}.${N}.${A}${v} <${I}.${+N + 1}.0-0` : F = `>=${I}.${N}.${A} <${+I + 1}.0.0-0`), l("caret return", F), F;
    });
  }, L = (m, d) => (l("replaceXRanges", m, d), m.split(/\s+/).map((g) => x(g, d)).join(" ")), x = (m, d) => {
    m = m.trim();
    const g = d.loose ? n[i.XRANGELOOSE] : n[i.XRANGE];
    return m.replace(g, (v, O, I, N, A, S) => {
      l("xRange", m, v, O, I, N, A, S);
      const F = w(I), D = F || w(N), P = D || w(A), X = P;
      return O === "=" && X && (O = ""), S = d.includePrerelease ? "-0" : "", F ? O === ">" || O === "<" ? v = "<0.0.0-0" : v = "*" : O && X ? (D && (N = 0), A = 0, O === ">" ? (O = ">=", D ? (I = +I + 1, N = 0, A = 0) : (N = +N + 1, A = 0)) : O === "<=" && (O = "<", D ? I = +I + 1 : N = +N + 1), O === "<" && (S = "-0"), v = `${O + I}.${N}.${A}${S}`) : D ? v = `>=${I}.0.0${S} <${+I + 1}.0.0-0` : P && (v = `>=${I}.${N}.0${S} <${I}.${+N + 1}.0-0`), l("xRange return", v), v;
    });
  }, V = (m, d) => (l("replaceStars", m, d), m.trim().replace(n[i.STAR], "")), ee = (m, d) => (l("replaceGTE0", m, d), m.trim().replace(n[d.includePrerelease ? i.GTE0PRE : i.GTE0], "")), re = (m) => (d, g, v, O, I, N, A, S, F, D, P, X) => (w(v) ? g = "" : w(O) ? g = `>=${v}.0.0${m ? "-0" : ""}` : w(I) ? g = `>=${v}.${O}.0${m ? "-0" : ""}` : N ? g = `>=${g}` : g = `>=${g}${m ? "-0" : ""}`, w(F) ? S = "" : w(D) ? S = `<${+F + 1}.0.0-0` : w(P) ? S = `<${F}.${+D + 1}.0-0` : X ? S = `<=${F}.${D}.${P}-${X}` : m ? S = `<${F}.${D}.${+P + 1}-0` : S = `<=${S}`, `${g} ${S}`.trim()), te = (m, d, g) => {
    for (let v = 0; v < m.length; v++)
      if (!m[v].test(d))
        return !1;
    if (d.prerelease.length && !g.includePrerelease) {
      for (let v = 0; v < m.length; v++)
        if (l(m[v].semver), m[v].semver !== E.ANY && m[v].semver.prerelease.length > 0) {
          const O = m[v].semver;
          if (O.major === d.major && O.minor === d.minor && O.patch === d.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Pe;
}
var be, _r;
function K() {
  if (_r) return be;
  _r = 1;
  const a = Symbol("SemVer ANY");
  class c {
    static get ANY() {
      return a;
    }
    constructor(e, t) {
      if (t = o(t), e instanceof c) {
        if (e.loose === !!t.loose)
          return e;
        e = e.value;
      }
      e = e.trim().split(/\s+/).join(" "), l("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === a ? this.value = "" : this.value = this.operator + this.semver.version, l("comp", this);
    }
    parse(e) {
      const t = this.options.loose ? r[u.COMPARATORLOOSE] : r[u.COMPARATOR], s = e.match(t);
      if (!s)
        throw new TypeError(`Invalid comparator: ${e}`);
      this.operator = s[1] !== void 0 ? s[1] : "", this.operator === "=" && (this.operator = ""), s[2] ? this.semver = new p(s[2], this.options.loose) : this.semver = a;
    }
    toString() {
      return this.value;
    }
    test(e) {
      if (l("Comparator.test", e, this.options.loose), this.semver === a || e === a)
        return !0;
      if (typeof e == "string")
        try {
          e = new p(e, this.options);
        } catch {
          return !1;
        }
      return E(e, this.operator, this.semver, this.options);
    }
    intersects(e, t) {
      if (!(e instanceof c))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new n(e.value, t).test(this.value) : e.operator === "" ? e.value === "" ? !0 : new n(this.value, t).test(e.semver) : (t = o(t), t.includePrerelease && (this.value === "<0.0.0-0" || e.value === "<0.0.0-0") || !t.includePrerelease && (this.value.startsWith("<0.0.0") || e.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && e.operator.startsWith(">") || this.operator.startsWith("<") && e.operator.startsWith("<") || this.semver.version === e.semver.version && this.operator.includes("=") && e.operator.includes("=") || E(this.semver, "<", e.semver, t) && this.operator.startsWith(">") && e.operator.startsWith("<") || E(this.semver, ">", e.semver, t) && this.operator.startsWith("<") && e.operator.startsWith(">")));
    }
  }
  be = c;
  const o = Je(), { safeRe: r, t: u } = k(), E = it(), l = Z(), p = G(), n = U();
  return be;
}
var _e, Dr;
function Q() {
  if (Dr) return _e;
  Dr = 1;
  const a = U();
  return _e = (o, r, u) => {
    try {
      r = new a(r, u);
    } catch {
      return !1;
    }
    return r.test(o);
  }, _e;
}
var De, Gr;
function Lt() {
  if (Gr) return De;
  Gr = 1;
  const a = U();
  return De = (o, r) => new a(o, r).set.map((u) => u.map((E) => E.value).join(" ").trim().split(" ")), De;
}
var Ge, jr;
function Nt() {
  if (jr) return Ge;
  jr = 1;
  const a = G(), c = U();
  return Ge = (r, u, E) => {
    let l = null, p = null, n = null;
    try {
      n = new c(u, E);
    } catch {
      return null;
    }
    return r.forEach((i) => {
      n.test(i) && (!l || p.compare(i) === -1) && (l = i, p = new a(l, E));
    }), l;
  }, Ge;
}
var je, Ur;
function St() {
  if (Ur) return je;
  Ur = 1;
  const a = G(), c = U();
  return je = (r, u, E) => {
    let l = null, p = null, n = null;
    try {
      n = new c(u, E);
    } catch {
      return null;
    }
    return r.forEach((i) => {
      n.test(i) && (!l || p.compare(i) === 1) && (l = i, p = new a(l, E));
    }), l;
  }, je;
}
var Ue, xr;
function wt() {
  if (xr) return Ue;
  xr = 1;
  const a = G(), c = U(), o = J();
  return Ue = (u, E) => {
    u = new c(u, E);
    let l = new a("0.0.0");
    if (u.test(l) || (l = new a("0.0.0-0"), u.test(l)))
      return l;
    l = null;
    for (let p = 0; p < u.set.length; ++p) {
      const n = u.set[p];
      let i = null;
      n.forEach((e) => {
        const t = new a(e.semver.version);
        switch (e.operator) {
          case ">":
            t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
          /* fallthrough */
          case "":
          case ">=":
            (!i || o(t, i)) && (i = t);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${e.operator}`);
        }
      }), i && (!l || o(l, i)) && (l = i);
    }
    return l && u.test(l) ? l : null;
  }, Ue;
}
var xe, Mr;
function At() {
  if (Mr) return xe;
  Mr = 1;
  const a = U();
  return xe = (o, r) => {
    try {
      return new a(o, r).range || "*";
    } catch {
      return null;
    }
  }, xe;
}
var Me, Vr;
function tr() {
  if (Vr) return Me;
  Vr = 1;
  const a = G(), c = K(), { ANY: o } = c, r = U(), u = Q(), E = J(), l = Qe(), p = rr(), n = er();
  return Me = (e, t, s, f) => {
    e = new a(e, f), t = new r(t, f);
    let R, h, C, $, T;
    switch (s) {
      case ">":
        R = E, h = p, C = l, $ = ">", T = ">=";
        break;
      case "<":
        R = l, h = n, C = E, $ = "<", T = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (u(e, t, f))
      return !1;
    for (let w = 0; w < t.set.length; ++w) {
      const _ = t.set[w];
      let b = null, y = null;
      if (_.forEach((q) => {
        q.semver === o && (q = new c(">=0.0.0")), b = b || q, y = y || q, R(q.semver, b.semver, f) ? b = q : C(q.semver, y.semver, f) && (y = q);
      }), b.operator === $ || b.operator === T || (!y.operator || y.operator === $) && h(e, y.semver))
        return !1;
      if (y.operator === T && C(e, y.semver))
        return !1;
    }
    return !0;
  }, Me;
}
var Ve, Xr;
function Tt() {
  if (Xr) return Ve;
  Xr = 1;
  const a = tr();
  return Ve = (o, r, u) => a(o, r, ">", u), Ve;
}
var Xe, kr;
function yt() {
  if (kr) return Xe;
  kr = 1;
  const a = tr();
  return Xe = (o, r, u) => a(o, r, "<", u), Xe;
}
var ke, Br;
function Ft() {
  if (Br) return ke;
  Br = 1;
  const a = U();
  return ke = (o, r, u) => (o = new a(o, u), r = new a(r, u), o.intersects(r, u)), ke;
}
var Be, Hr;
function qt() {
  if (Hr) return Be;
  Hr = 1;
  const a = Q(), c = j();
  return Be = (o, r, u) => {
    const E = [];
    let l = null, p = null;
    const n = o.sort((s, f) => c(s, f, u));
    for (const s of n)
      a(s, r, u) ? (p = s, l || (l = s)) : (p && E.push([l, p]), p = null, l = null);
    l && E.push([l, null]);
    const i = [];
    for (const [s, f] of E)
      s === f ? i.push(s) : !f && s === n[0] ? i.push("*") : f ? s === n[0] ? i.push(`<=${f}`) : i.push(`${s} - ${f}`) : i.push(`>=${s}`);
    const e = i.join(" || "), t = typeof r.raw == "string" ? r.raw : String(r);
    return e.length < t.length ? e : r;
  }, Be;
}
var He, Yr;
function Pt() {
  if (Yr) return He;
  Yr = 1;
  const a = U(), c = K(), { ANY: o } = c, r = Q(), u = j(), E = (t, s, f = {}) => {
    if (t === s)
      return !0;
    t = new a(t, f), s = new a(s, f);
    let R = !1;
    e: for (const h of t.set) {
      for (const C of s.set) {
        const $ = n(h, C, f);
        if (R = R || $ !== null, $)
          continue e;
      }
      if (R)
        return !1;
    }
    return !0;
  }, l = [new c(">=0.0.0-0")], p = [new c(">=0.0.0")], n = (t, s, f) => {
    if (t === s)
      return !0;
    if (t.length === 1 && t[0].semver === o) {
      if (s.length === 1 && s[0].semver === o)
        return !0;
      f.includePrerelease ? t = l : t = p;
    }
    if (s.length === 1 && s[0].semver === o) {
      if (f.includePrerelease)
        return !0;
      s = p;
    }
    const R = /* @__PURE__ */ new Set();
    let h, C;
    for (const L of t)
      L.operator === ">" || L.operator === ">=" ? h = i(h, L, f) : L.operator === "<" || L.operator === "<=" ? C = e(C, L, f) : R.add(L.semver);
    if (R.size > 1)
      return null;
    let $;
    if (h && C) {
      if ($ = u(h.semver, C.semver, f), $ > 0)
        return null;
      if ($ === 0 && (h.operator !== ">=" || C.operator !== "<="))
        return null;
    }
    for (const L of R) {
      if (h && !r(L, String(h), f) || C && !r(L, String(C), f))
        return null;
      for (const x of s)
        if (!r(L, String(x), f))
          return !1;
      return !0;
    }
    let T, w, _, b, y = C && !f.includePrerelease && C.semver.prerelease.length ? C.semver : !1, q = h && !f.includePrerelease && h.semver.prerelease.length ? h.semver : !1;
    y && y.prerelease.length === 1 && C.operator === "<" && y.prerelease[0] === 0 && (y = !1);
    for (const L of s) {
      if (b = b || L.operator === ">" || L.operator === ">=", _ = _ || L.operator === "<" || L.operator === "<=", h) {
        if (q && L.semver.prerelease && L.semver.prerelease.length && L.semver.major === q.major && L.semver.minor === q.minor && L.semver.patch === q.patch && (q = !1), L.operator === ">" || L.operator === ">=") {
          if (T = i(h, L, f), T === L && T !== h)
            return !1;
        } else if (h.operator === ">=" && !r(h.semver, String(L), f))
          return !1;
      }
      if (C) {
        if (y && L.semver.prerelease && L.semver.prerelease.length && L.semver.major === y.major && L.semver.minor === y.minor && L.semver.patch === y.patch && (y = !1), L.operator === "<" || L.operator === "<=") {
          if (w = e(C, L, f), w === L && w !== C)
            return !1;
        } else if (C.operator === "<=" && !r(C.semver, String(L), f))
          return !1;
      }
      if (!L.operator && (C || h) && $ !== 0)
        return !1;
    }
    return !(h && _ && !C && $ !== 0 || C && b && !h && $ !== 0 || q || y);
  }, i = (t, s, f) => {
    if (!t)
      return s;
    const R = u(t.semver, s.semver, f);
    return R > 0 ? t : R < 0 || s.operator === ">" && t.operator === ">=" ? s : t;
  }, e = (t, s, f) => {
    if (!t)
      return s;
    const R = u(t.semver, s.semver, f);
    return R < 0 ? t : R > 0 || s.operator === "<" && t.operator === "<=" ? s : t;
  };
  return He = E, He;
}
var Ye, Wr;
function Vt() {
  if (Wr) return Ye;
  Wr = 1;
  const a = k(), c = z(), o = G(), r = tt(), u = M(), E = lt(), l = ft(), p = ht(), n = pt(), i = Et(), e = dt(), t = mt(), s = Rt(), f = j(), R = Ct(), h = vt(), C = Ke(), $ = It(), T = gt(), w = J(), _ = Qe(), b = st(), y = nt(), q = er(), L = rr(), x = it(), V = Ot(), ee = K(), re = U(), te = Q(), m = Lt(), d = Nt(), g = St(), v = wt(), O = At(), I = tr(), N = Tt(), A = yt(), S = Ft(), F = qt(), D = Pt();
  return Ye = {
    parse: u,
    valid: E,
    clean: l,
    inc: p,
    diff: n,
    major: i,
    minor: e,
    patch: t,
    prerelease: s,
    compare: f,
    rcompare: R,
    compareLoose: h,
    compareBuild: C,
    sort: $,
    rsort: T,
    gt: w,
    lt: _,
    eq: b,
    neq: y,
    gte: q,
    lte: L,
    cmp: x,
    coerce: V,
    Comparator: ee,
    Range: re,
    satisfies: te,
    toComparators: m,
    maxSatisfying: d,
    minSatisfying: g,
    minVersion: v,
    validRange: O,
    outside: I,
    gtr: N,
    ltr: A,
    intersects: S,
    simplifyRange: F,
    subset: D,
    SemVer: o,
    re: a.re,
    src: a.src,
    tokens: a.t,
    SEMVER_SPEC_VERSION: c.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: c.RELEASE_TYPES,
    compareIdentifiers: r.compareIdentifiers,
    rcompareIdentifiers: r.rcompareIdentifiers
  }, Ye;
}
var H = { exports: {} }, Y = { exports: {} }, We, zr;
function ot() {
  if (zr) return We;
  zr = 1;
  function a(c) {
    r.debug = r, r.default = r, r.coerce = i, r.disable = p, r.enable = E, r.enabled = n, r.humanize = ut(), r.destroy = e, Object.keys(c).forEach((t) => {
      r[t] = c[t];
    }), r.names = [], r.skips = [], r.formatters = {};
    function o(t) {
      let s = 0;
      for (let f = 0; f < t.length; f++)
        s = (s << 5) - s + t.charCodeAt(f), s |= 0;
      return r.colors[Math.abs(s) % r.colors.length];
    }
    r.selectColor = o;
    function r(t) {
      let s, f = null, R, h;
      function C(...$) {
        if (!C.enabled)
          return;
        const T = C, w = Number(/* @__PURE__ */ new Date()), _ = w - (s || w);
        T.diff = _, T.prev = s, T.curr = w, s = w, $[0] = r.coerce($[0]), typeof $[0] != "string" && $.unshift("%O");
        let b = 0;
        $[0] = $[0].replace(/%([a-zA-Z%])/g, (q, L) => {
          if (q === "%%")
            return "%";
          b++;
          const x = r.formatters[L];
          if (typeof x == "function") {
            const V = $[b];
            q = x.call(T, V), $.splice(b, 1), b--;
          }
          return q;
        }), r.formatArgs.call(T, $), (T.log || r.log).apply(T, $);
      }
      return C.namespace = t, C.useColors = r.useColors(), C.color = r.selectColor(t), C.extend = u, C.destroy = r.destroy, Object.defineProperty(C, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => f !== null ? f : (R !== r.namespaces && (R = r.namespaces, h = r.enabled(t)), h),
        set: ($) => {
          f = $;
        }
      }), typeof r.init == "function" && r.init(C), C;
    }
    function u(t, s) {
      const f = r(this.namespace + (typeof s > "u" ? ":" : s) + t);
      return f.log = this.log, f;
    }
    function E(t) {
      r.save(t), r.namespaces = t, r.names = [], r.skips = [];
      const s = (typeof t == "string" ? t : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const f of s)
        f[0] === "-" ? r.skips.push(f.slice(1)) : r.names.push(f);
    }
    function l(t, s) {
      let f = 0, R = 0, h = -1, C = 0;
      for (; f < t.length; )
        if (R < s.length && (s[R] === t[f] || s[R] === "*"))
          s[R] === "*" ? (h = R, C = f, R++) : (f++, R++);
        else if (h !== -1)
          R = h + 1, C++, f = C;
        else
          return !1;
      for (; R < s.length && s[R] === "*"; )
        R++;
      return R === s.length;
    }
    function p() {
      const t = [
        ...r.names,
        ...r.skips.map((s) => "-" + s)
      ].join(",");
      return r.enable(""), t;
    }
    function n(t) {
      for (const s of r.skips)
        if (l(t, s))
          return !1;
      for (const s of r.names)
        if (l(t, s))
          return !0;
      return !1;
    }
    function i(t) {
      return t instanceof Error ? t.stack || t.message : t;
    }
    function e() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return We = a, We;
}
var Zr;
function bt() {
  return Zr || (Zr = 1, (function(a, c) {
    c.formatArgs = r, c.save = u, c.load = E, c.useColors = o, c.storage = l(), c.destroy = /* @__PURE__ */ (() => {
      let n = !1;
      return () => {
        n || (n = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), c.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function o() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let n;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (n = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(n[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(n) {
      if (n[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + n[0] + (this.useColors ? "%c " : " ") + "+" + a.exports.humanize(this.diff), !this.useColors)
        return;
      const i = "color: " + this.color;
      n.splice(1, 0, i, "color: inherit");
      let e = 0, t = 0;
      n[0].replace(/%[a-zA-Z%]/g, (s) => {
        s !== "%%" && (e++, s === "%c" && (t = e));
      }), n.splice(t, 0, i);
    }
    c.log = console.debug || console.log || (() => {
    });
    function u(n) {
      try {
        n ? c.storage.setItem("debug", n) : c.storage.removeItem("debug");
      } catch {
      }
    }
    function E() {
      let n;
      try {
        n = c.storage.getItem("debug") || c.storage.getItem("DEBUG");
      } catch {
      }
      return !n && typeof process < "u" && "env" in process && (n = process.env.DEBUG), n;
    }
    function l() {
      try {
        return localStorage;
      } catch {
      }
    }
    a.exports = ot()(c);
    const { formatters: p } = a.exports;
    p.j = function(n) {
      try {
        return JSON.stringify(n);
      } catch (i) {
        return "[UnexpectedJSONParseError]: " + i.message;
      }
    };
  })(Y, Y.exports)), Y.exports;
}
var W = { exports: {} }, ze, Jr;
function _t() {
  return Jr || (Jr = 1, ze = (a, c = process.argv) => {
    const o = a.startsWith("-") ? "" : a.length === 1 ? "-" : "--", r = c.indexOf(o + a), u = c.indexOf("--");
    return r !== -1 && (u === -1 || r < u);
  }), ze;
}
var Ze, Kr;
function Dt() {
  if (Kr) return Ze;
  Kr = 1;
  const a = ct, c = rt, o = _t(), { env: r } = process;
  let u;
  o("no-color") || o("no-colors") || o("color=false") || o("color=never") ? u = 0 : (o("color") || o("colors") || o("color=true") || o("color=always")) && (u = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? u = 1 : r.FORCE_COLOR === "false" ? u = 0 : u = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function E(n) {
    return n === 0 ? !1 : {
      level: n,
      hasBasic: !0,
      has256: n >= 2,
      has16m: n >= 3
    };
  }
  function l(n, i) {
    if (u === 0)
      return 0;
    if (o("color=16m") || o("color=full") || o("color=truecolor"))
      return 3;
    if (o("color=256"))
      return 2;
    if (n && !i && u === void 0)
      return 0;
    const e = u || 0;
    if (r.TERM === "dumb")
      return e;
    if (process.platform === "win32") {
      const t = a.release().split(".");
      return Number(t[0]) >= 10 && Number(t[2]) >= 10586 ? Number(t[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((t) => t in r) || r.CI_NAME === "codeship" ? 1 : e;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const t = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return t >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : e;
  }
  function p(n) {
    const i = l(n, n && n.isTTY);
    return E(i);
  }
  return Ze = {
    supportsColor: p,
    stdout: E(l(!0, c.isatty(1))),
    stderr: E(l(!0, c.isatty(2)))
  }, Ze;
}
var Qr;
function Gt() {
  return Qr || (Qr = 1, (function(a, c) {
    const o = rt, r = at;
    c.init = e, c.log = p, c.formatArgs = E, c.save = n, c.load = i, c.useColors = u, c.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), c.colors = [6, 2, 3, 4, 5, 1];
    try {
      const s = Dt();
      s && (s.stderr || s).level >= 2 && (c.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    c.inspectOpts = Object.keys(process.env).filter((s) => /^debug_/i.test(s)).reduce((s, f) => {
      const R = f.substring(6).toLowerCase().replace(/_([a-z])/g, (C, $) => $.toUpperCase());
      let h = process.env[f];
      return /^(yes|on|true|enabled)$/i.test(h) ? h = !0 : /^(no|off|false|disabled)$/i.test(h) ? h = !1 : h === "null" ? h = null : h = Number(h), s[R] = h, s;
    }, {});
    function u() {
      return "colors" in c.inspectOpts ? !!c.inspectOpts.colors : o.isatty(process.stderr.fd);
    }
    function E(s) {
      const { namespace: f, useColors: R } = this;
      if (R) {
        const h = this.color, C = "\x1B[3" + (h < 8 ? h : "8;5;" + h), $ = `  ${C};1m${f} \x1B[0m`;
        s[0] = $ + s[0].split(`
`).join(`
` + $), s.push(C + "m+" + a.exports.humanize(this.diff) + "\x1B[0m");
      } else
        s[0] = l() + f + " " + s[0];
    }
    function l() {
      return c.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function p(...s) {
      return process.stderr.write(r.formatWithOptions(c.inspectOpts, ...s) + `
`);
    }
    function n(s) {
      s ? process.env.DEBUG = s : delete process.env.DEBUG;
    }
    function i() {
      return process.env.DEBUG;
    }
    function e(s) {
      s.inspectOpts = {};
      const f = Object.keys(c.inspectOpts);
      for (let R = 0; R < f.length; R++)
        s.inspectOpts[f[R]] = c.inspectOpts[f[R]];
    }
    a.exports = ot()(c);
    const { formatters: t } = a.exports;
    t.o = function(s) {
      return this.inspectOpts.colors = this.useColors, r.inspect(s, this.inspectOpts).split(`
`).map((f) => f.trim()).join(" ");
    }, t.O = function(s) {
      return this.inspectOpts.colors = this.useColors, r.inspect(s, this.inspectOpts);
    };
  })(W, W.exports)), W.exports;
}
var et;
function Xt() {
  return et || (et = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? H.exports = bt() : H.exports = Gt()), H.exports;
}
export {
  Vt as a,
  ut as b,
  Xt as r
};
