import { by as Je } from "./index-ChliSiZl.js";
import ut from "fs";
import qs from "constants";
import sr from "stream";
import co from "util";
import fo from "assert";
import Re from "path";
import Pr from "child_process";
import ho from "events";
import lr from "crypto";
import { r as Ms, a as po } from "./index-Dp0jqBOM.js";
import ct from "url";
import Bs from "string_decoder";
import qn from "os";
import Et from "electron";
import mo from "zlib";
import $s from "http";
(function() {
  try {
    var t = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, m = new t.Error().stack;
    m && (t._sentryDebugIds = t._sentryDebugIds || {}, t._sentryDebugIds[m] = "cf57d44c-88e7-47a1-a031-6f2cbee9b49c", t._sentryDebugIdIdentifier = "sentry-dbid-cf57d44c-88e7-47a1-a031-6f2cbee9b49c");
  } catch {
  }
})();
function Hs(t, m) {
  for (var y = 0; y < m.length; y++) {
    const v = m[y];
    if (typeof v != "string" && !Array.isArray(v)) {
      for (const f in v)
        if (f !== "default" && !(f in t)) {
          const a = Object.getOwnPropertyDescriptor(v, f);
          a && Object.defineProperty(t, f, a.get ? a : {
            enumerable: !0,
            get: () => v[f]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var yt = {}, Ir = {}, yr = {}, ai;
function Ge() {
  return ai || (ai = 1, yr.fromCallback = function(t) {
    return Object.defineProperty(function(...m) {
      if (typeof m[m.length - 1] == "function") t.apply(this, m);
      else
        return new Promise((y, v) => {
          m.push((f, a) => f != null ? v(f) : y(a)), t.apply(this, m);
        });
    }, "name", { value: t.name });
  }, yr.fromPromise = function(t) {
    return Object.defineProperty(function(...m) {
      const y = m[m.length - 1];
      if (typeof y != "function") return t.apply(this, m);
      m.pop(), t.apply(this, m).then((v) => y(null, v), y);
    }, "name", { value: t.name });
  }), yr;
}
var xr, oi;
function js() {
  if (oi) return xr;
  oi = 1;
  var t = qs, m = process.cwd, y = null, v = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return y || (y = m.call(process)), y;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var f = process.chdir;
    process.chdir = function(r) {
      y = null, f.call(process, r);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, f);
  }
  xr = a;
  function a(r) {
    t.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && o(r), r.lutimes || s(r), r.chown = i(r.chown), r.fchown = i(r.fchown), r.lchown = i(r.lchown), r.chmod = l(r.chmod), r.fchmod = l(r.fchmod), r.lchmod = l(r.lchmod), r.chownSync = n(r.chownSync), r.fchownSync = n(r.fchownSync), r.lchownSync = n(r.lchownSync), r.chmodSync = u(r.chmodSync), r.fchmodSync = u(r.fchmodSync), r.lchmodSync = u(r.lchmodSync), r.stat = p(r.stat), r.fstat = p(r.fstat), r.lstat = p(r.lstat), r.statSync = g(r.statSync), r.fstatSync = g(r.fstatSync), r.lstatSync = g(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(c, E, T) {
      T && process.nextTick(T);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(c, E, T, C) {
      C && process.nextTick(C);
    }, r.lchownSync = function() {
    }), v === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : (function(c) {
      function E(T, C, O) {
        var D = Date.now(), N = 0;
        c(T, C, function P(S) {
          if (S && (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") && Date.now() - D < 6e4) {
            setTimeout(function() {
              r.stat(C, function(h, F) {
                h && h.code === "ENOENT" ? c(T, C, P) : O(S);
              });
            }, N), N < 100 && (N += 10);
            return;
          }
          O && O(S);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(E, c), E;
    })(r.rename)), r.read = typeof r.read != "function" ? r.read : (function(c) {
      function E(T, C, O, D, N, P) {
        var S;
        if (P && typeof P == "function") {
          var h = 0;
          S = function(F, U, I) {
            if (F && F.code === "EAGAIN" && h < 10)
              return h++, c.call(r, T, C, O, D, N, S);
            P.apply(this, arguments);
          };
        }
        return c.call(r, T, C, O, D, N, S);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(E, c), E;
    })(r.read), r.readSync = typeof r.readSync != "function" ? r.readSync : /* @__PURE__ */ (function(c) {
      return function(E, T, C, O, D) {
        for (var N = 0; ; )
          try {
            return c.call(r, E, T, C, O, D);
          } catch (P) {
            if (P.code === "EAGAIN" && N < 10) {
              N++;
              continue;
            }
            throw P;
          }
      };
    })(r.readSync);
    function o(c) {
      c.lchmod = function(E, T, C) {
        c.open(
          E,
          t.O_WRONLY | t.O_SYMLINK,
          T,
          function(O, D) {
            if (O) {
              C && C(O);
              return;
            }
            c.fchmod(D, T, function(N) {
              c.close(D, function(P) {
                C && C(N || P);
              });
            });
          }
        );
      }, c.lchmodSync = function(E, T) {
        var C = c.openSync(E, t.O_WRONLY | t.O_SYMLINK, T), O = !0, D;
        try {
          D = c.fchmodSync(C, T), O = !1;
        } finally {
          if (O)
            try {
              c.closeSync(C);
            } catch {
            }
          else
            c.closeSync(C);
        }
        return D;
      };
    }
    function s(c) {
      t.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(E, T, C, O) {
        c.open(E, t.O_SYMLINK, function(D, N) {
          if (D) {
            O && O(D);
            return;
          }
          c.futimes(N, T, C, function(P) {
            c.close(N, function(S) {
              O && O(P || S);
            });
          });
        });
      }, c.lutimesSync = function(E, T, C) {
        var O = c.openSync(E, t.O_SYMLINK), D, N = !0;
        try {
          D = c.futimesSync(O, T, C), N = !1;
        } finally {
          if (N)
            try {
              c.closeSync(O);
            } catch {
            }
          else
            c.closeSync(O);
        }
        return D;
      }) : c.futimes && (c.lutimes = function(E, T, C, O) {
        O && process.nextTick(O);
      }, c.lutimesSync = function() {
      });
    }
    function l(c) {
      return c && function(E, T, C) {
        return c.call(r, E, T, function(O) {
          A(O) && (O = null), C && C.apply(this, arguments);
        });
      };
    }
    function u(c) {
      return c && function(E, T) {
        try {
          return c.call(r, E, T);
        } catch (C) {
          if (!A(C)) throw C;
        }
      };
    }
    function i(c) {
      return c && function(E, T, C, O) {
        return c.call(r, E, T, C, function(D) {
          A(D) && (D = null), O && O.apply(this, arguments);
        });
      };
    }
    function n(c) {
      return c && function(E, T, C) {
        try {
          return c.call(r, E, T, C);
        } catch (O) {
          if (!A(O)) throw O;
        }
      };
    }
    function p(c) {
      return c && function(E, T, C) {
        typeof T == "function" && (C = T, T = null);
        function O(D, N) {
          N && (N.uid < 0 && (N.uid += 4294967296), N.gid < 0 && (N.gid += 4294967296)), C && C.apply(this, arguments);
        }
        return T ? c.call(r, E, T, O) : c.call(r, E, O);
      };
    }
    function g(c) {
      return c && function(E, T) {
        var C = T ? c.call(r, E, T) : c.call(r, E);
        return C && (C.uid < 0 && (C.uid += 4294967296), C.gid < 0 && (C.gid += 4294967296)), C;
      };
    }
    function A(c) {
      if (!c || c.code === "ENOSYS")
        return !0;
      var E = !process.getuid || process.getuid() !== 0;
      return !!(E && (c.code === "EINVAL" || c.code === "EPERM"));
    }
  }
  return xr;
}
var Ur, si;
function Gs() {
  if (si) return Ur;
  si = 1;
  var t = sr.Stream;
  Ur = m;
  function m(y) {
    return {
      ReadStream: v,
      WriteStream: f
    };
    function v(a, r) {
      if (!(this instanceof v)) return new v(a, r);
      t.call(this);
      var o = this;
      this.path = a, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
      for (var s = Object.keys(r), l = 0, u = s.length; l < u; l++) {
        var i = s[l];
        this[i] = r[i];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          o._read();
        });
        return;
      }
      y.open(this.path, this.flags, this.mode, function(n, p) {
        if (n) {
          o.emit("error", n), o.readable = !1;
          return;
        }
        o.fd = p, o.emit("open", p), o._read();
      });
    }
    function f(a, r) {
      if (!(this instanceof f)) return new f(a, r);
      t.call(this), this.path = a, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
      for (var o = Object.keys(r), s = 0, l = o.length; s < l; s++) {
        var u = o[s];
        this[u] = r[u];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = y.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Ur;
}
var Fr, li;
function Ws() {
  if (li) return Fr;
  li = 1, Fr = m;
  var t = Object.getPrototypeOf || function(y) {
    return y.__proto__;
  };
  function m(y) {
    if (y === null || typeof y != "object")
      return y;
    if (y instanceof Object)
      var v = { __proto__: t(y) };
    else
      var v = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(y).forEach(function(f) {
      Object.defineProperty(v, f, Object.getOwnPropertyDescriptor(y, f));
    }), v;
  }
  return Fr;
}
var vr, ui;
function He() {
  if (ui) return vr;
  ui = 1;
  var t = ut, m = js(), y = Gs(), v = Ws(), f = co, a, r;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (a = Symbol.for("graceful-fs.queue"), r = Symbol.for("graceful-fs.previous")) : (a = "___graceful-fs.queue", r = "___graceful-fs.previous");
  function o() {
  }
  function s(c, E) {
    Object.defineProperty(c, a, {
      get: function() {
        return E;
      }
    });
  }
  var l = o;
  if (f.debuglog ? l = f.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (l = function() {
    var c = f.format.apply(f, arguments);
    c = "GFS4: " + c.split(/\n/).join(`
GFS4: `), console.error(c);
  }), !t[a]) {
    var u = Je[a] || [];
    s(t, u), t.close = (function(c) {
      function E(T, C) {
        return c.call(t, T, function(O) {
          O || g(), typeof C == "function" && C.apply(this, arguments);
        });
      }
      return Object.defineProperty(E, r, {
        value: c
      }), E;
    })(t.close), t.closeSync = (function(c) {
      function E(T) {
        c.apply(t, arguments), g();
      }
      return Object.defineProperty(E, r, {
        value: c
      }), E;
    })(t.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      l(t[a]), fo.equal(t[a].length, 0);
    });
  }
  Je[a] || s(Je, t[a]), vr = i(v(t)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !t.__patched && (vr = i(t), t.__patched = !0);
  function i(c) {
    m(c), c.gracefulify = i, c.createReadStream = De, c.createWriteStream = _e;
    var E = c.readFile;
    c.readFile = T;
    function T(Q, me, _) {
      return typeof me == "function" && (_ = me, me = null), d(Q, me, _);
      function d(B, R, se, ce) {
        return E(B, R, function(fe) {
          fe && (fe.code === "EMFILE" || fe.code === "ENFILE") ? n([d, [B, R, se], fe, ce || Date.now(), Date.now()]) : typeof se == "function" && se.apply(this, arguments);
        });
      }
    }
    var C = c.writeFile;
    c.writeFile = O;
    function O(Q, me, _, d) {
      return typeof _ == "function" && (d = _, _ = null), B(Q, me, _, d);
      function B(R, se, ce, fe, ye) {
        return C(R, se, ce, function(he) {
          he && (he.code === "EMFILE" || he.code === "ENFILE") ? n([B, [R, se, ce, fe], he, ye || Date.now(), Date.now()]) : typeof fe == "function" && fe.apply(this, arguments);
        });
      }
    }
    var D = c.appendFile;
    D && (c.appendFile = N);
    function N(Q, me, _, d) {
      return typeof _ == "function" && (d = _, _ = null), B(Q, me, _, d);
      function B(R, se, ce, fe, ye) {
        return D(R, se, ce, function(he) {
          he && (he.code === "EMFILE" || he.code === "ENFILE") ? n([B, [R, se, ce, fe], he, ye || Date.now(), Date.now()]) : typeof fe == "function" && fe.apply(this, arguments);
        });
      }
    }
    var P = c.copyFile;
    P && (c.copyFile = S);
    function S(Q, me, _, d) {
      return typeof _ == "function" && (d = _, _ = 0), B(Q, me, _, d);
      function B(R, se, ce, fe, ye) {
        return P(R, se, ce, function(he) {
          he && (he.code === "EMFILE" || he.code === "ENFILE") ? n([B, [R, se, ce, fe], he, ye || Date.now(), Date.now()]) : typeof fe == "function" && fe.apply(this, arguments);
        });
      }
    }
    var h = c.readdir;
    c.readdir = U;
    var F = /^v[0-5]\./;
    function U(Q, me, _) {
      typeof me == "function" && (_ = me, me = null);
      var d = F.test(process.version) ? function(se, ce, fe, ye) {
        return h(se, B(
          se,
          ce,
          fe,
          ye
        ));
      } : function(se, ce, fe, ye) {
        return h(se, ce, B(
          se,
          ce,
          fe,
          ye
        ));
      };
      return d(Q, me, _);
      function B(R, se, ce, fe) {
        return function(ye, he) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? n([
            d,
            [R, se, ce],
            ye,
            fe || Date.now(),
            Date.now()
          ]) : (he && he.sort && he.sort(), typeof ce == "function" && ce.call(this, ye, he));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var I = y(c);
      L = I.ReadStream, le = I.WriteStream;
    }
    var k = c.ReadStream;
    k && (L.prototype = Object.create(k.prototype), L.prototype.open = ie);
    var $ = c.WriteStream;
    $ && (le.prototype = Object.create($.prototype), le.prototype.open = pe), Object.defineProperty(c, "ReadStream", {
      get: function() {
        return L;
      },
      set: function(Q) {
        L = Q;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(c, "WriteStream", {
      get: function() {
        return le;
      },
      set: function(Q) {
        le = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    var H = L;
    Object.defineProperty(c, "FileReadStream", {
      get: function() {
        return H;
      },
      set: function(Q) {
        H = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    var ee = le;
    Object.defineProperty(c, "FileWriteStream", {
      get: function() {
        return ee;
      },
      set: function(Q) {
        ee = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    function L(Q, me) {
      return this instanceof L ? (k.apply(this, arguments), this) : L.apply(Object.create(L.prototype), arguments);
    }
    function ie() {
      var Q = this;
      Ae(Q.path, Q.flags, Q.mode, function(me, _) {
        me ? (Q.autoClose && Q.destroy(), Q.emit("error", me)) : (Q.fd = _, Q.emit("open", _), Q.read());
      });
    }
    function le(Q, me) {
      return this instanceof le ? ($.apply(this, arguments), this) : le.apply(Object.create(le.prototype), arguments);
    }
    function pe() {
      var Q = this;
      Ae(Q.path, Q.flags, Q.mode, function(me, _) {
        me ? (Q.destroy(), Q.emit("error", me)) : (Q.fd = _, Q.emit("open", _));
      });
    }
    function De(Q, me) {
      return new c.ReadStream(Q, me);
    }
    function _e(Q, me) {
      return new c.WriteStream(Q, me);
    }
    var Fe = c.open;
    c.open = Ae;
    function Ae(Q, me, _, d) {
      return typeof _ == "function" && (d = _, _ = null), B(Q, me, _, d);
      function B(R, se, ce, fe, ye) {
        return Fe(R, se, ce, function(he, $e) {
          he && (he.code === "EMFILE" || he.code === "ENFILE") ? n([B, [R, se, ce, fe], he, ye || Date.now(), Date.now()]) : typeof fe == "function" && fe.apply(this, arguments);
        });
      }
    }
    return c;
  }
  function n(c) {
    l("ENQUEUE", c[0].name, c[1]), t[a].push(c), A();
  }
  var p;
  function g() {
    for (var c = Date.now(), E = 0; E < t[a].length; ++E)
      t[a][E].length > 2 && (t[a][E][3] = c, t[a][E][4] = c);
    A();
  }
  function A() {
    if (clearTimeout(p), p = void 0, t[a].length !== 0) {
      var c = t[a].shift(), E = c[0], T = c[1], C = c[2], O = c[3], D = c[4];
      if (O === void 0)
        l("RETRY", E.name, T), E.apply(null, T);
      else if (Date.now() - O >= 6e4) {
        l("TIMEOUT", E.name, T);
        var N = T.pop();
        typeof N == "function" && N.call(null, C);
      } else {
        var P = Date.now() - D, S = Math.max(D - O, 1), h = Math.min(S * 1.2, 100);
        P >= h ? (l("RETRY", E.name, T), E.apply(null, T.concat([O]))) : t[a].push(c);
      }
      p === void 0 && (p = setTimeout(A, 0));
    }
  }
  return vr;
}
var ci;
function xt() {
  return ci || (ci = 1, (function(t) {
    const m = Ge().fromCallback, y = He(), v = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((f) => typeof y[f] == "function");
    Object.assign(t, y), v.forEach((f) => {
      t[f] = m(y[f]);
    }), t.exists = function(f, a) {
      return typeof a == "function" ? y.exists(f, a) : new Promise((r) => y.exists(f, r));
    }, t.read = function(f, a, r, o, s, l) {
      return typeof l == "function" ? y.read(f, a, r, o, s, l) : new Promise((u, i) => {
        y.read(f, a, r, o, s, (n, p, g) => {
          if (n) return i(n);
          u({ bytesRead: p, buffer: g });
        });
      });
    }, t.write = function(f, a, ...r) {
      return typeof r[r.length - 1] == "function" ? y.write(f, a, ...r) : new Promise((o, s) => {
        y.write(f, a, ...r, (l, u, i) => {
          if (l) return s(l);
          o({ bytesWritten: u, buffer: i });
        });
      });
    }, typeof y.writev == "function" && (t.writev = function(f, a, ...r) {
      return typeof r[r.length - 1] == "function" ? y.writev(f, a, ...r) : new Promise((o, s) => {
        y.writev(f, a, ...r, (l, u, i) => {
          if (l) return s(l);
          o({ bytesWritten: u, buffers: i });
        });
      });
    }), typeof y.realpath.native == "function" ? t.realpath.native = m(y.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  })(Ir)), Ir;
}
var _r = {}, kr = {}, fi;
function Ys() {
  if (fi) return kr;
  fi = 1;
  const t = Re;
  return kr.checkPath = function(y) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(y.replace(t.parse(y).root, ""))) {
      const f = new Error(`Path contains invalid characters: ${y}`);
      throw f.code = "EINVAL", f;
    }
  }, kr;
}
var di;
function Vs() {
  if (di) return _r;
  di = 1;
  const t = /* @__PURE__ */ xt(), { checkPath: m } = /* @__PURE__ */ Ys(), y = (v) => {
    const f = { mode: 511 };
    return typeof v == "number" ? v : { ...f, ...v }.mode;
  };
  return _r.makeDir = async (v, f) => (m(v), t.mkdir(v, {
    mode: y(f),
    recursive: !0
  })), _r.makeDirSync = (v, f) => (m(v), t.mkdirSync(v, {
    mode: y(f),
    recursive: !0
  })), _r;
}
var Lr, hi;
function Qe() {
  if (hi) return Lr;
  hi = 1;
  const t = Ge().fromPromise, { makeDir: m, makeDirSync: y } = /* @__PURE__ */ Vs(), v = t(m);
  return Lr = {
    mkdirs: v,
    mkdirsSync: y,
    // alias
    mkdirp: v,
    mkdirpSync: y,
    ensureDir: v,
    ensureDirSync: y
  }, Lr;
}
var qr, pi;
function bt() {
  if (pi) return qr;
  pi = 1;
  const t = Ge().fromPromise, m = /* @__PURE__ */ xt();
  function y(v) {
    return m.access(v).then(() => !0).catch(() => !1);
  }
  return qr = {
    pathExists: t(y),
    pathExistsSync: m.existsSync
  }, qr;
}
var Mr, mi;
function go() {
  if (mi) return Mr;
  mi = 1;
  const t = He();
  function m(v, f, a, r) {
    t.open(v, "r+", (o, s) => {
      if (o) return r(o);
      t.futimes(s, f, a, (l) => {
        t.close(s, (u) => {
          r && r(l || u);
        });
      });
    });
  }
  function y(v, f, a) {
    const r = t.openSync(v, "r+");
    return t.futimesSync(r, f, a), t.closeSync(r);
  }
  return Mr = {
    utimesMillis: m,
    utimesMillisSync: y
  }, Mr;
}
var Br, gi;
function Ut() {
  if (gi) return Br;
  gi = 1;
  const t = /* @__PURE__ */ xt(), m = Re, y = co;
  function v(n, p, g) {
    const A = g.dereference ? (c) => t.stat(c, { bigint: !0 }) : (c) => t.lstat(c, { bigint: !0 });
    return Promise.all([
      A(n),
      A(p).catch((c) => {
        if (c.code === "ENOENT") return null;
        throw c;
      })
    ]).then(([c, E]) => ({ srcStat: c, destStat: E }));
  }
  function f(n, p, g) {
    let A;
    const c = g.dereference ? (T) => t.statSync(T, { bigint: !0 }) : (T) => t.lstatSync(T, { bigint: !0 }), E = c(n);
    try {
      A = c(p);
    } catch (T) {
      if (T.code === "ENOENT") return { srcStat: E, destStat: null };
      throw T;
    }
    return { srcStat: E, destStat: A };
  }
  function a(n, p, g, A, c) {
    y.callbackify(v)(n, p, A, (E, T) => {
      if (E) return c(E);
      const { srcStat: C, destStat: O } = T;
      if (O) {
        if (l(C, O)) {
          const D = m.basename(n), N = m.basename(p);
          return g === "move" && D !== N && D.toLowerCase() === N.toLowerCase() ? c(null, { srcStat: C, destStat: O, isChangingCase: !0 }) : c(new Error("Source and destination must not be the same."));
        }
        if (C.isDirectory() && !O.isDirectory())
          return c(new Error(`Cannot overwrite non-directory '${p}' with directory '${n}'.`));
        if (!C.isDirectory() && O.isDirectory())
          return c(new Error(`Cannot overwrite directory '${p}' with non-directory '${n}'.`));
      }
      return C.isDirectory() && u(n, p) ? c(new Error(i(n, p, g))) : c(null, { srcStat: C, destStat: O });
    });
  }
  function r(n, p, g, A) {
    const { srcStat: c, destStat: E } = f(n, p, A);
    if (E) {
      if (l(c, E)) {
        const T = m.basename(n), C = m.basename(p);
        if (g === "move" && T !== C && T.toLowerCase() === C.toLowerCase())
          return { srcStat: c, destStat: E, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (c.isDirectory() && !E.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${n}'.`);
      if (!c.isDirectory() && E.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${n}'.`);
    }
    if (c.isDirectory() && u(n, p))
      throw new Error(i(n, p, g));
    return { srcStat: c, destStat: E };
  }
  function o(n, p, g, A, c) {
    const E = m.resolve(m.dirname(n)), T = m.resolve(m.dirname(g));
    if (T === E || T === m.parse(T).root) return c();
    t.stat(T, { bigint: !0 }, (C, O) => C ? C.code === "ENOENT" ? c() : c(C) : l(p, O) ? c(new Error(i(n, g, A))) : o(n, p, T, A, c));
  }
  function s(n, p, g, A) {
    const c = m.resolve(m.dirname(n)), E = m.resolve(m.dirname(g));
    if (E === c || E === m.parse(E).root) return;
    let T;
    try {
      T = t.statSync(E, { bigint: !0 });
    } catch (C) {
      if (C.code === "ENOENT") return;
      throw C;
    }
    if (l(p, T))
      throw new Error(i(n, g, A));
    return s(n, p, E, A);
  }
  function l(n, p) {
    return p.ino && p.dev && p.ino === n.ino && p.dev === n.dev;
  }
  function u(n, p) {
    const g = m.resolve(n).split(m.sep).filter((c) => c), A = m.resolve(p).split(m.sep).filter((c) => c);
    return g.reduce((c, E, T) => c && A[T] === E, !0);
  }
  function i(n, p, g) {
    return `Cannot ${g} '${n}' to a subdirectory of itself, '${p}'.`;
  }
  return Br = {
    checkPaths: a,
    checkPathsSync: r,
    checkParentPaths: o,
    checkParentPathsSync: s,
    isSrcSubdir: u,
    areIdentical: l
  }, Br;
}
var $r, yi;
function zs() {
  if (yi) return $r;
  yi = 1;
  const t = He(), m = Re, y = Qe().mkdirs, v = bt().pathExists, f = go().utimesMillis, a = /* @__PURE__ */ Ut();
  function r(U, I, k, $) {
    typeof k == "function" && !$ ? ($ = k, k = {}) : typeof k == "function" && (k = { filter: k }), $ = $ || function() {
    }, k = k || {}, k.clobber = "clobber" in k ? !!k.clobber : !0, k.overwrite = "overwrite" in k ? !!k.overwrite : k.clobber, k.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), a.checkPaths(U, I, "copy", k, (H, ee) => {
      if (H) return $(H);
      const { srcStat: L, destStat: ie } = ee;
      a.checkParentPaths(U, L, I, "copy", (le) => le ? $(le) : k.filter ? s(o, ie, U, I, k, $) : o(ie, U, I, k, $));
    });
  }
  function o(U, I, k, $, H) {
    const ee = m.dirname(k);
    v(ee, (L, ie) => {
      if (L) return H(L);
      if (ie) return u(U, I, k, $, H);
      y(ee, (le) => le ? H(le) : u(U, I, k, $, H));
    });
  }
  function s(U, I, k, $, H, ee) {
    Promise.resolve(H.filter(k, $)).then((L) => L ? U(I, k, $, H, ee) : ee(), (L) => ee(L));
  }
  function l(U, I, k, $, H) {
    return $.filter ? s(u, U, I, k, $, H) : u(U, I, k, $, H);
  }
  function u(U, I, k, $, H) {
    ($.dereference ? t.stat : t.lstat)(I, (L, ie) => L ? H(L) : ie.isDirectory() ? O(ie, U, I, k, $, H) : ie.isFile() || ie.isCharacterDevice() || ie.isBlockDevice() ? i(ie, U, I, k, $, H) : ie.isSymbolicLink() ? h(U, I, k, $, H) : ie.isSocket() ? H(new Error(`Cannot copy a socket file: ${I}`)) : ie.isFIFO() ? H(new Error(`Cannot copy a FIFO pipe: ${I}`)) : H(new Error(`Unknown file: ${I}`)));
  }
  function i(U, I, k, $, H, ee) {
    return I ? n(U, k, $, H, ee) : p(U, k, $, H, ee);
  }
  function n(U, I, k, $, H) {
    if ($.overwrite)
      t.unlink(k, (ee) => ee ? H(ee) : p(U, I, k, $, H));
    else return $.errorOnExist ? H(new Error(`'${k}' already exists`)) : H();
  }
  function p(U, I, k, $, H) {
    t.copyFile(I, k, (ee) => ee ? H(ee) : $.preserveTimestamps ? g(U.mode, I, k, H) : T(k, U.mode, H));
  }
  function g(U, I, k, $) {
    return A(U) ? c(k, U, (H) => H ? $(H) : E(U, I, k, $)) : E(U, I, k, $);
  }
  function A(U) {
    return (U & 128) === 0;
  }
  function c(U, I, k) {
    return T(U, I | 128, k);
  }
  function E(U, I, k, $) {
    C(I, k, (H) => H ? $(H) : T(k, U, $));
  }
  function T(U, I, k) {
    return t.chmod(U, I, k);
  }
  function C(U, I, k) {
    t.stat(U, ($, H) => $ ? k($) : f(I, H.atime, H.mtime, k));
  }
  function O(U, I, k, $, H, ee) {
    return I ? N(k, $, H, ee) : D(U.mode, k, $, H, ee);
  }
  function D(U, I, k, $, H) {
    t.mkdir(k, (ee) => {
      if (ee) return H(ee);
      N(I, k, $, (L) => L ? H(L) : T(k, U, H));
    });
  }
  function N(U, I, k, $) {
    t.readdir(U, (H, ee) => H ? $(H) : P(ee, U, I, k, $));
  }
  function P(U, I, k, $, H) {
    const ee = U.pop();
    return ee ? S(U, ee, I, k, $, H) : H();
  }
  function S(U, I, k, $, H, ee) {
    const L = m.join(k, I), ie = m.join($, I);
    a.checkPaths(L, ie, "copy", H, (le, pe) => {
      if (le) return ee(le);
      const { destStat: De } = pe;
      l(De, L, ie, H, (_e) => _e ? ee(_e) : P(U, k, $, H, ee));
    });
  }
  function h(U, I, k, $, H) {
    t.readlink(I, (ee, L) => {
      if (ee) return H(ee);
      if ($.dereference && (L = m.resolve(process.cwd(), L)), U)
        t.readlink(k, (ie, le) => ie ? ie.code === "EINVAL" || ie.code === "UNKNOWN" ? t.symlink(L, k, H) : H(ie) : ($.dereference && (le = m.resolve(process.cwd(), le)), a.isSrcSubdir(L, le) ? H(new Error(`Cannot copy '${L}' to a subdirectory of itself, '${le}'.`)) : U.isDirectory() && a.isSrcSubdir(le, L) ? H(new Error(`Cannot overwrite '${le}' with '${L}'.`)) : F(L, k, H)));
      else
        return t.symlink(L, k, H);
    });
  }
  function F(U, I, k) {
    t.unlink(I, ($) => $ ? k($) : t.symlink(U, I, k));
  }
  return $r = r, $r;
}
var Hr, vi;
function Ks() {
  if (vi) return Hr;
  vi = 1;
  const t = He(), m = Re, y = Qe().mkdirsSync, v = go().utimesMillisSync, f = /* @__PURE__ */ Ut();
  function a(P, S, h) {
    typeof h == "function" && (h = { filter: h }), h = h || {}, h.clobber = "clobber" in h ? !!h.clobber : !0, h.overwrite = "overwrite" in h ? !!h.overwrite : h.clobber, h.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: F, destStat: U } = f.checkPathsSync(P, S, "copy", h);
    return f.checkParentPathsSync(P, F, S, "copy"), r(U, P, S, h);
  }
  function r(P, S, h, F) {
    if (F.filter && !F.filter(S, h)) return;
    const U = m.dirname(h);
    return t.existsSync(U) || y(U), s(P, S, h, F);
  }
  function o(P, S, h, F) {
    if (!(F.filter && !F.filter(S, h)))
      return s(P, S, h, F);
  }
  function s(P, S, h, F) {
    const I = (F.dereference ? t.statSync : t.lstatSync)(S);
    if (I.isDirectory()) return E(I, P, S, h, F);
    if (I.isFile() || I.isCharacterDevice() || I.isBlockDevice()) return l(I, P, S, h, F);
    if (I.isSymbolicLink()) return D(P, S, h, F);
    throw I.isSocket() ? new Error(`Cannot copy a socket file: ${S}`) : I.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${S}`) : new Error(`Unknown file: ${S}`);
  }
  function l(P, S, h, F, U) {
    return S ? u(P, h, F, U) : i(P, h, F, U);
  }
  function u(P, S, h, F) {
    if (F.overwrite)
      return t.unlinkSync(h), i(P, S, h, F);
    if (F.errorOnExist)
      throw new Error(`'${h}' already exists`);
  }
  function i(P, S, h, F) {
    return t.copyFileSync(S, h), F.preserveTimestamps && n(P.mode, S, h), A(h, P.mode);
  }
  function n(P, S, h) {
    return p(P) && g(h, P), c(S, h);
  }
  function p(P) {
    return (P & 128) === 0;
  }
  function g(P, S) {
    return A(P, S | 128);
  }
  function A(P, S) {
    return t.chmodSync(P, S);
  }
  function c(P, S) {
    const h = t.statSync(P);
    return v(S, h.atime, h.mtime);
  }
  function E(P, S, h, F, U) {
    return S ? C(h, F, U) : T(P.mode, h, F, U);
  }
  function T(P, S, h, F) {
    return t.mkdirSync(h), C(S, h, F), A(h, P);
  }
  function C(P, S, h) {
    t.readdirSync(P).forEach((F) => O(F, P, S, h));
  }
  function O(P, S, h, F) {
    const U = m.join(S, P), I = m.join(h, P), { destStat: k } = f.checkPathsSync(U, I, "copy", F);
    return o(k, U, I, F);
  }
  function D(P, S, h, F) {
    let U = t.readlinkSync(S);
    if (F.dereference && (U = m.resolve(process.cwd(), U)), P) {
      let I;
      try {
        I = t.readlinkSync(h);
      } catch (k) {
        if (k.code === "EINVAL" || k.code === "UNKNOWN") return t.symlinkSync(U, h);
        throw k;
      }
      if (F.dereference && (I = m.resolve(process.cwd(), I)), f.isSrcSubdir(U, I))
        throw new Error(`Cannot copy '${U}' to a subdirectory of itself, '${I}'.`);
      if (t.statSync(h).isDirectory() && f.isSrcSubdir(I, U))
        throw new Error(`Cannot overwrite '${I}' with '${U}'.`);
      return N(U, h);
    } else
      return t.symlinkSync(U, h);
  }
  function N(P, S) {
    return t.unlinkSync(S), t.symlinkSync(P, S);
  }
  return Hr = a, Hr;
}
var jr, _i;
function Mn() {
  if (_i) return jr;
  _i = 1;
  const t = Ge().fromCallback;
  return jr = {
    copy: t(/* @__PURE__ */ zs()),
    copySync: /* @__PURE__ */ Ks()
  }, jr;
}
var Gr, wi;
function Js() {
  if (wi) return Gr;
  wi = 1;
  const t = He(), m = Re, y = fo, v = process.platform === "win32";
  function f(g) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((c) => {
      g[c] = g[c] || t[c], c = c + "Sync", g[c] = g[c] || t[c];
    }), g.maxBusyTries = g.maxBusyTries || 3;
  }
  function a(g, A, c) {
    let E = 0;
    typeof A == "function" && (c = A, A = {}), y(g, "rimraf: missing path"), y.strictEqual(typeof g, "string", "rimraf: path should be a string"), y.strictEqual(typeof c, "function", "rimraf: callback function required"), y(A, "rimraf: invalid options argument provided"), y.strictEqual(typeof A, "object", "rimraf: options should be object"), f(A), r(g, A, function T(C) {
      if (C) {
        if ((C.code === "EBUSY" || C.code === "ENOTEMPTY" || C.code === "EPERM") && E < A.maxBusyTries) {
          E++;
          const O = E * 100;
          return setTimeout(() => r(g, A, T), O);
        }
        C.code === "ENOENT" && (C = null);
      }
      c(C);
    });
  }
  function r(g, A, c) {
    y(g), y(A), y(typeof c == "function"), A.lstat(g, (E, T) => {
      if (E && E.code === "ENOENT")
        return c(null);
      if (E && E.code === "EPERM" && v)
        return o(g, A, E, c);
      if (T && T.isDirectory())
        return l(g, A, E, c);
      A.unlink(g, (C) => {
        if (C) {
          if (C.code === "ENOENT")
            return c(null);
          if (C.code === "EPERM")
            return v ? o(g, A, C, c) : l(g, A, C, c);
          if (C.code === "EISDIR")
            return l(g, A, C, c);
        }
        return c(C);
      });
    });
  }
  function o(g, A, c, E) {
    y(g), y(A), y(typeof E == "function"), A.chmod(g, 438, (T) => {
      T ? E(T.code === "ENOENT" ? null : c) : A.stat(g, (C, O) => {
        C ? E(C.code === "ENOENT" ? null : c) : O.isDirectory() ? l(g, A, c, E) : A.unlink(g, E);
      });
    });
  }
  function s(g, A, c) {
    let E;
    y(g), y(A);
    try {
      A.chmodSync(g, 438);
    } catch (T) {
      if (T.code === "ENOENT")
        return;
      throw c;
    }
    try {
      E = A.statSync(g);
    } catch (T) {
      if (T.code === "ENOENT")
        return;
      throw c;
    }
    E.isDirectory() ? n(g, A, c) : A.unlinkSync(g);
  }
  function l(g, A, c, E) {
    y(g), y(A), y(typeof E == "function"), A.rmdir(g, (T) => {
      T && (T.code === "ENOTEMPTY" || T.code === "EEXIST" || T.code === "EPERM") ? u(g, A, E) : T && T.code === "ENOTDIR" ? E(c) : E(T);
    });
  }
  function u(g, A, c) {
    y(g), y(A), y(typeof c == "function"), A.readdir(g, (E, T) => {
      if (E) return c(E);
      let C = T.length, O;
      if (C === 0) return A.rmdir(g, c);
      T.forEach((D) => {
        a(m.join(g, D), A, (N) => {
          if (!O) {
            if (N) return c(O = N);
            --C === 0 && A.rmdir(g, c);
          }
        });
      });
    });
  }
  function i(g, A) {
    let c;
    A = A || {}, f(A), y(g, "rimraf: missing path"), y.strictEqual(typeof g, "string", "rimraf: path should be a string"), y(A, "rimraf: missing options"), y.strictEqual(typeof A, "object", "rimraf: options should be object");
    try {
      c = A.lstatSync(g);
    } catch (E) {
      if (E.code === "ENOENT")
        return;
      E.code === "EPERM" && v && s(g, A, E);
    }
    try {
      c && c.isDirectory() ? n(g, A, null) : A.unlinkSync(g);
    } catch (E) {
      if (E.code === "ENOENT")
        return;
      if (E.code === "EPERM")
        return v ? s(g, A, E) : n(g, A, E);
      if (E.code !== "EISDIR")
        throw E;
      n(g, A, E);
    }
  }
  function n(g, A, c) {
    y(g), y(A);
    try {
      A.rmdirSync(g);
    } catch (E) {
      if (E.code === "ENOTDIR")
        throw c;
      if (E.code === "ENOTEMPTY" || E.code === "EEXIST" || E.code === "EPERM")
        p(g, A);
      else if (E.code !== "ENOENT")
        throw E;
    }
  }
  function p(g, A) {
    if (y(g), y(A), A.readdirSync(g).forEach((c) => i(m.join(g, c), A)), v) {
      const c = Date.now();
      do
        try {
          return A.rmdirSync(g, A);
        } catch {
        }
      while (Date.now() - c < 500);
    } else
      return A.rmdirSync(g, A);
  }
  return Gr = a, a.sync = i, Gr;
}
var Wr, Ei;
function Dr() {
  if (Ei) return Wr;
  Ei = 1;
  const t = He(), m = Ge().fromCallback, y = /* @__PURE__ */ Js();
  function v(a, r) {
    if (t.rm) return t.rm(a, { recursive: !0, force: !0 }, r);
    y(a, r);
  }
  function f(a) {
    if (t.rmSync) return t.rmSync(a, { recursive: !0, force: !0 });
    y.sync(a);
  }
  return Wr = {
    remove: m(v),
    removeSync: f
  }, Wr;
}
var Yr, bi;
function Xs() {
  if (bi) return Yr;
  bi = 1;
  const t = Ge().fromPromise, m = /* @__PURE__ */ xt(), y = Re, v = /* @__PURE__ */ Qe(), f = /* @__PURE__ */ Dr(), a = t(async function(s) {
    let l;
    try {
      l = await m.readdir(s);
    } catch {
      return v.mkdirs(s);
    }
    return Promise.all(l.map((u) => f.remove(y.join(s, u))));
  });
  function r(o) {
    let s;
    try {
      s = m.readdirSync(o);
    } catch {
      return v.mkdirsSync(o);
    }
    s.forEach((l) => {
      l = y.join(o, l), f.removeSync(l);
    });
  }
  return Yr = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: a,
    emptydir: a
  }, Yr;
}
var Vr, Ai;
function Qs() {
  if (Ai) return Vr;
  Ai = 1;
  const t = Ge().fromCallback, m = Re, y = He(), v = /* @__PURE__ */ Qe();
  function f(r, o) {
    function s() {
      y.writeFile(r, "", (l) => {
        if (l) return o(l);
        o();
      });
    }
    y.stat(r, (l, u) => {
      if (!l && u.isFile()) return o();
      const i = m.dirname(r);
      y.stat(i, (n, p) => {
        if (n)
          return n.code === "ENOENT" ? v.mkdirs(i, (g) => {
            if (g) return o(g);
            s();
          }) : o(n);
        p.isDirectory() ? s() : y.readdir(i, (g) => {
          if (g) return o(g);
        });
      });
    });
  }
  function a(r) {
    let o;
    try {
      o = y.statSync(r);
    } catch {
    }
    if (o && o.isFile()) return;
    const s = m.dirname(r);
    try {
      y.statSync(s).isDirectory() || y.readdirSync(s);
    } catch (l) {
      if (l && l.code === "ENOENT") v.mkdirsSync(s);
      else throw l;
    }
    y.writeFileSync(r, "");
  }
  return Vr = {
    createFile: t(f),
    createFileSync: a
  }, Vr;
}
var zr, Ti;
function Zs() {
  if (Ti) return zr;
  Ti = 1;
  const t = Ge().fromCallback, m = Re, y = He(), v = /* @__PURE__ */ Qe(), f = bt().pathExists, { areIdentical: a } = /* @__PURE__ */ Ut();
  function r(s, l, u) {
    function i(n, p) {
      y.link(n, p, (g) => {
        if (g) return u(g);
        u(null);
      });
    }
    y.lstat(l, (n, p) => {
      y.lstat(s, (g, A) => {
        if (g)
          return g.message = g.message.replace("lstat", "ensureLink"), u(g);
        if (p && a(A, p)) return u(null);
        const c = m.dirname(l);
        f(c, (E, T) => {
          if (E) return u(E);
          if (T) return i(s, l);
          v.mkdirs(c, (C) => {
            if (C) return u(C);
            i(s, l);
          });
        });
      });
    });
  }
  function o(s, l) {
    let u;
    try {
      u = y.lstatSync(l);
    } catch {
    }
    try {
      const p = y.lstatSync(s);
      if (u && a(p, u)) return;
    } catch (p) {
      throw p.message = p.message.replace("lstat", "ensureLink"), p;
    }
    const i = m.dirname(l);
    return y.existsSync(i) || v.mkdirsSync(i), y.linkSync(s, l);
  }
  return zr = {
    createLink: t(r),
    createLinkSync: o
  }, zr;
}
var Kr, Si;
function el() {
  if (Si) return Kr;
  Si = 1;
  const t = Re, m = He(), y = bt().pathExists;
  function v(a, r, o) {
    if (t.isAbsolute(a))
      return m.lstat(a, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), o(s)) : o(null, {
        toCwd: a,
        toDst: a
      }));
    {
      const s = t.dirname(r), l = t.join(s, a);
      return y(l, (u, i) => u ? o(u) : i ? o(null, {
        toCwd: l,
        toDst: a
      }) : m.lstat(a, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), o(n)) : o(null, {
        toCwd: a,
        toDst: t.relative(s, a)
      })));
    }
  }
  function f(a, r) {
    let o;
    if (t.isAbsolute(a)) {
      if (o = m.existsSync(a), !o) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: a,
        toDst: a
      };
    } else {
      const s = t.dirname(r), l = t.join(s, a);
      if (o = m.existsSync(l), o)
        return {
          toCwd: l,
          toDst: a
        };
      if (o = m.existsSync(a), !o) throw new Error("relative srcpath does not exist");
      return {
        toCwd: a,
        toDst: t.relative(s, a)
      };
    }
  }
  return Kr = {
    symlinkPaths: v,
    symlinkPathsSync: f
  }, Kr;
}
var Jr, Pi;
function tl() {
  if (Pi) return Jr;
  Pi = 1;
  const t = He();
  function m(v, f, a) {
    if (a = typeof f == "function" ? f : a, f = typeof f == "function" ? !1 : f, f) return a(null, f);
    t.lstat(v, (r, o) => {
      if (r) return a(null, "file");
      f = o && o.isDirectory() ? "dir" : "file", a(null, f);
    });
  }
  function y(v, f) {
    let a;
    if (f) return f;
    try {
      a = t.lstatSync(v);
    } catch {
      return "file";
    }
    return a && a.isDirectory() ? "dir" : "file";
  }
  return Jr = {
    symlinkType: m,
    symlinkTypeSync: y
  }, Jr;
}
var Xr, Di;
function rl() {
  if (Di) return Xr;
  Di = 1;
  const t = Ge().fromCallback, m = Re, y = /* @__PURE__ */ xt(), v = /* @__PURE__ */ Qe(), f = v.mkdirs, a = v.mkdirsSync, r = /* @__PURE__ */ el(), o = r.symlinkPaths, s = r.symlinkPathsSync, l = /* @__PURE__ */ tl(), u = l.symlinkType, i = l.symlinkTypeSync, n = bt().pathExists, { areIdentical: p } = /* @__PURE__ */ Ut();
  function g(E, T, C, O) {
    O = typeof C == "function" ? C : O, C = typeof C == "function" ? !1 : C, y.lstat(T, (D, N) => {
      !D && N.isSymbolicLink() ? Promise.all([
        y.stat(E),
        y.stat(T)
      ]).then(([P, S]) => {
        if (p(P, S)) return O(null);
        A(E, T, C, O);
      }) : A(E, T, C, O);
    });
  }
  function A(E, T, C, O) {
    o(E, T, (D, N) => {
      if (D) return O(D);
      E = N.toDst, u(N.toCwd, C, (P, S) => {
        if (P) return O(P);
        const h = m.dirname(T);
        n(h, (F, U) => {
          if (F) return O(F);
          if (U) return y.symlink(E, T, S, O);
          f(h, (I) => {
            if (I) return O(I);
            y.symlink(E, T, S, O);
          });
        });
      });
    });
  }
  function c(E, T, C) {
    let O;
    try {
      O = y.lstatSync(T);
    } catch {
    }
    if (O && O.isSymbolicLink()) {
      const S = y.statSync(E), h = y.statSync(T);
      if (p(S, h)) return;
    }
    const D = s(E, T);
    E = D.toDst, C = i(D.toCwd, C);
    const N = m.dirname(T);
    return y.existsSync(N) || a(N), y.symlinkSync(E, T, C);
  }
  return Xr = {
    createSymlink: t(g),
    createSymlinkSync: c
  }, Xr;
}
var Qr, Ci;
function nl() {
  if (Ci) return Qr;
  Ci = 1;
  const { createFile: t, createFileSync: m } = /* @__PURE__ */ Qs(), { createLink: y, createLinkSync: v } = /* @__PURE__ */ Zs(), { createSymlink: f, createSymlinkSync: a } = /* @__PURE__ */ rl();
  return Qr = {
    // file
    createFile: t,
    createFileSync: m,
    ensureFile: t,
    ensureFileSync: m,
    // link
    createLink: y,
    createLinkSync: v,
    ensureLink: y,
    ensureLinkSync: v,
    // symlink
    createSymlink: f,
    createSymlinkSync: a,
    ensureSymlink: f,
    ensureSymlinkSync: a
  }, Qr;
}
var Zr, Ri;
function Bn() {
  if (Ri) return Zr;
  Ri = 1;
  function t(y, { EOL: v = `
`, finalEOL: f = !0, replacer: a = null, spaces: r } = {}) {
    const o = f ? v : "";
    return JSON.stringify(y, a, r).replace(/\n/g, v) + o;
  }
  function m(y) {
    return Buffer.isBuffer(y) && (y = y.toString("utf8")), y.replace(/^\uFEFF/, "");
  }
  return Zr = { stringify: t, stripBom: m }, Zr;
}
var en, Oi;
function il() {
  if (Oi) return en;
  Oi = 1;
  let t;
  try {
    t = He();
  } catch {
    t = ut;
  }
  const m = Ge(), { stringify: y, stripBom: v } = Bn();
  async function f(u, i = {}) {
    typeof i == "string" && (i = { encoding: i });
    const n = i.fs || t, p = "throws" in i ? i.throws : !0;
    let g = await m.fromCallback(n.readFile)(u, i);
    g = v(g);
    let A;
    try {
      A = JSON.parse(g, i ? i.reviver : null);
    } catch (c) {
      if (p)
        throw c.message = `${u}: ${c.message}`, c;
      return null;
    }
    return A;
  }
  const a = m.fromPromise(f);
  function r(u, i = {}) {
    typeof i == "string" && (i = { encoding: i });
    const n = i.fs || t, p = "throws" in i ? i.throws : !0;
    try {
      let g = n.readFileSync(u, i);
      return g = v(g), JSON.parse(g, i.reviver);
    } catch (g) {
      if (p)
        throw g.message = `${u}: ${g.message}`, g;
      return null;
    }
  }
  async function o(u, i, n = {}) {
    const p = n.fs || t, g = y(i, n);
    await m.fromCallback(p.writeFile)(u, g, n);
  }
  const s = m.fromPromise(o);
  function l(u, i, n = {}) {
    const p = n.fs || t, g = y(i, n);
    return p.writeFileSync(u, g, n);
  }
  return en = {
    readFile: a,
    readFileSync: r,
    writeFile: s,
    writeFileSync: l
  }, en;
}
var tn, Ni;
function al() {
  if (Ni) return tn;
  Ni = 1;
  const t = il();
  return tn = {
    // jsonfile exports
    readJson: t.readFile,
    readJsonSync: t.readFileSync,
    writeJson: t.writeFile,
    writeJsonSync: t.writeFileSync
  }, tn;
}
var rn, Ii;
function $n() {
  if (Ii) return rn;
  Ii = 1;
  const t = Ge().fromCallback, m = He(), y = Re, v = /* @__PURE__ */ Qe(), f = bt().pathExists;
  function a(o, s, l, u) {
    typeof l == "function" && (u = l, l = "utf8");
    const i = y.dirname(o);
    f(i, (n, p) => {
      if (n) return u(n);
      if (p) return m.writeFile(o, s, l, u);
      v.mkdirs(i, (g) => {
        if (g) return u(g);
        m.writeFile(o, s, l, u);
      });
    });
  }
  function r(o, ...s) {
    const l = y.dirname(o);
    if (m.existsSync(l))
      return m.writeFileSync(o, ...s);
    v.mkdirsSync(l), m.writeFileSync(o, ...s);
  }
  return rn = {
    outputFile: t(a),
    outputFileSync: r
  }, rn;
}
var nn, xi;
function ol() {
  if (xi) return nn;
  xi = 1;
  const { stringify: t } = Bn(), { outputFile: m } = /* @__PURE__ */ $n();
  async function y(v, f, a = {}) {
    const r = t(f, a);
    await m(v, r, a);
  }
  return nn = y, nn;
}
var an, Ui;
function sl() {
  if (Ui) return an;
  Ui = 1;
  const { stringify: t } = Bn(), { outputFileSync: m } = /* @__PURE__ */ $n();
  function y(v, f, a) {
    const r = t(f, a);
    m(v, r, a);
  }
  return an = y, an;
}
var on, Fi;
function ll() {
  if (Fi) return on;
  Fi = 1;
  const t = Ge().fromPromise, m = /* @__PURE__ */ al();
  return m.outputJson = t(/* @__PURE__ */ ol()), m.outputJsonSync = /* @__PURE__ */ sl(), m.outputJSON = m.outputJson, m.outputJSONSync = m.outputJsonSync, m.writeJSON = m.writeJson, m.writeJSONSync = m.writeJsonSync, m.readJSON = m.readJson, m.readJSONSync = m.readJsonSync, on = m, on;
}
var sn, ki;
function ul() {
  if (ki) return sn;
  ki = 1;
  const t = He(), m = Re, y = Mn().copy, v = Dr().remove, f = Qe().mkdirp, a = bt().pathExists, r = /* @__PURE__ */ Ut();
  function o(n, p, g, A) {
    typeof g == "function" && (A = g, g = {}), g = g || {};
    const c = g.overwrite || g.clobber || !1;
    r.checkPaths(n, p, "move", g, (E, T) => {
      if (E) return A(E);
      const { srcStat: C, isChangingCase: O = !1 } = T;
      r.checkParentPaths(n, C, p, "move", (D) => {
        if (D) return A(D);
        if (s(p)) return l(n, p, c, O, A);
        f(m.dirname(p), (N) => N ? A(N) : l(n, p, c, O, A));
      });
    });
  }
  function s(n) {
    const p = m.dirname(n);
    return m.parse(p).root === p;
  }
  function l(n, p, g, A, c) {
    if (A) return u(n, p, g, c);
    if (g)
      return v(p, (E) => E ? c(E) : u(n, p, g, c));
    a(p, (E, T) => E ? c(E) : T ? c(new Error("dest already exists.")) : u(n, p, g, c));
  }
  function u(n, p, g, A) {
    t.rename(n, p, (c) => c ? c.code !== "EXDEV" ? A(c) : i(n, p, g, A) : A());
  }
  function i(n, p, g, A) {
    y(n, p, {
      overwrite: g,
      errorOnExist: !0
    }, (E) => E ? A(E) : v(n, A));
  }
  return sn = o, sn;
}
var ln, Li;
function cl() {
  if (Li) return ln;
  Li = 1;
  const t = He(), m = Re, y = Mn().copySync, v = Dr().removeSync, f = Qe().mkdirpSync, a = /* @__PURE__ */ Ut();
  function r(i, n, p) {
    p = p || {};
    const g = p.overwrite || p.clobber || !1, { srcStat: A, isChangingCase: c = !1 } = a.checkPathsSync(i, n, "move", p);
    return a.checkParentPathsSync(i, A, n, "move"), o(n) || f(m.dirname(n)), s(i, n, g, c);
  }
  function o(i) {
    const n = m.dirname(i);
    return m.parse(n).root === n;
  }
  function s(i, n, p, g) {
    if (g) return l(i, n, p);
    if (p)
      return v(n), l(i, n, p);
    if (t.existsSync(n)) throw new Error("dest already exists.");
    return l(i, n, p);
  }
  function l(i, n, p) {
    try {
      t.renameSync(i, n);
    } catch (g) {
      if (g.code !== "EXDEV") throw g;
      return u(i, n, p);
    }
  }
  function u(i, n, p) {
    return y(i, n, {
      overwrite: p,
      errorOnExist: !0
    }), v(i);
  }
  return ln = r, ln;
}
var un, qi;
function fl() {
  if (qi) return un;
  qi = 1;
  const t = Ge().fromCallback;
  return un = {
    move: t(/* @__PURE__ */ ul()),
    moveSync: /* @__PURE__ */ cl()
  }, un;
}
var cn, Mi;
function ft() {
  return Mi || (Mi = 1, cn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ xt(),
    // Export extra methods:
    .../* @__PURE__ */ Mn(),
    .../* @__PURE__ */ Xs(),
    .../* @__PURE__ */ nl(),
    .../* @__PURE__ */ ll(),
    .../* @__PURE__ */ Qe(),
    .../* @__PURE__ */ fl(),
    .../* @__PURE__ */ $n(),
    .../* @__PURE__ */ bt(),
    .../* @__PURE__ */ Dr()
  }), cn;
}
var Lt = {}, vt = {}, fn = {}, _t = {}, Bi;
function Hn() {
  if (Bi) return _t;
  Bi = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.CancellationError = _t.CancellationToken = void 0;
  const t = ho;
  let m = class extends t.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(f) {
      this.removeParentCancelHandler(), this._parent = f, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(f) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, f != null && (this.parent = f);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(f) {
      this.cancelled ? f() : this.once("cancel", f);
    }
    createPromise(f) {
      if (this.cancelled)
        return Promise.reject(new y());
      const a = () => {
        if (r != null)
          try {
            this.removeListener("cancel", r), r = null;
          } catch {
          }
      };
      let r = null;
      return new Promise((o, s) => {
        let l = null;
        if (r = () => {
          try {
            l != null && (l(), l = null);
          } finally {
            s(new y());
          }
        }, this.cancelled) {
          r();
          return;
        }
        this.onCancel(r), f(o, s, (u) => {
          l = u;
        });
      }).then((o) => (a(), o)).catch((o) => {
        throw a(), o;
      });
    }
    removeParentCancelHandler() {
      const f = this._parent;
      f != null && this.parentCancelHandler != null && (f.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  _t.CancellationToken = m;
  class y extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return _t.CancellationError = y, _t;
}
var wr = {}, $i;
function Cr() {
  if ($i) return wr;
  $i = 1, Object.defineProperty(wr, "__esModule", { value: !0 }), wr.newError = t;
  function t(m, y) {
    const v = new Error(m);
    return v.code = y, v;
  }
  return wr;
}
var Le = {}, qt = {}, Hi;
function yo() {
  if (Hi) return qt;
  Hi = 1, Object.defineProperty(qt, "__esModule", { value: !0 }), qt.ProgressCallbackTransform = void 0;
  const t = sr;
  let m = class extends t.Transform {
    constructor(v, f, a) {
      super(), this.total = v, this.cancellationToken = f, this.onProgress = a, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(v, f, a) {
      if (this.cancellationToken.cancelled) {
        a(new Error("cancelled"), null);
        return;
      }
      this.transferred += v.length, this.delta += v.length;
      const r = Date.now();
      r >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = r + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((r - this.start) / 1e3))
      }), this.delta = 0), a(null, v);
    }
    _flush(v) {
      if (this.cancellationToken.cancelled) {
        v(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, v(null);
    }
  };
  return qt.ProgressCallbackTransform = m, qt;
}
var ji;
function dl() {
  if (ji) return Le;
  ji = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.DigestTransform = Le.HttpExecutor = Le.HttpError = void 0, Le.createHttpError = l, Le.parseJson = n, Le.configureRequestOptionsFromUrl = A, Le.configureRequestUrl = c, Le.safeGetHeader = C, Le.configureRequestOptions = D, Le.safeStringifyJson = N;
  const t = lr, m = Ms(), y = ut, v = sr, f = ct, a = Hn(), r = Cr(), o = yo(), s = (0, m.default)("electron-builder");
  function l(P, S = null) {
    return new i(P.statusCode || -1, `${P.statusCode} ${P.statusMessage}` + (S == null ? "" : `
` + JSON.stringify(S, null, "  ")) + `
Headers: ` + N(P.headers), S);
  }
  const u = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class i extends Error {
    constructor(S, h = `HTTP error: ${u.get(S) || S}`, F = null) {
      super(h), this.statusCode = S, this.description = F, this.name = "HttpError", this.code = `HTTP_ERROR_${S}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  Le.HttpError = i;
  function n(P) {
    return P.then((S) => S == null || S.length === 0 ? null : JSON.parse(S));
  }
  class p {
    constructor() {
      this.maxRedirects = 10;
    }
    request(S, h = new a.CancellationToken(), F) {
      D(S);
      const U = F == null ? void 0 : JSON.stringify(F), I = U ? Buffer.from(U) : void 0;
      if (I != null) {
        s(U);
        const { headers: k, ...$ } = S;
        S = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": I.length,
            ...k
          },
          ...$
        };
      }
      return this.doApiRequest(S, h, (k) => k.end(I));
    }
    doApiRequest(S, h, F, U = 0) {
      return s.enabled && s(`Request: ${N(S)}`), h.createPromise((I, k, $) => {
        const H = this.createRequest(S, (ee) => {
          try {
            this.handleResponse(ee, S, h, I, k, U, F);
          } catch (L) {
            k(L);
          }
        });
        this.addErrorAndTimeoutHandlers(H, k, S.timeout), this.addRedirectHandlers(H, S, k, U, (ee) => {
          this.doApiRequest(ee, h, F, U).then(I).catch(k);
        }), F(H, k), $(() => H.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(S, h, F, U, I) {
    }
    addErrorAndTimeoutHandlers(S, h, F = 60 * 1e3) {
      this.addTimeOutHandler(S, h, F), S.on("error", h), S.on("aborted", () => {
        h(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(S, h, F, U, I, k, $) {
      var H;
      if (s.enabled && s(`Response: ${S.statusCode} ${S.statusMessage}, request options: ${N(h)}`), S.statusCode === 404) {
        I(l(S, `method: ${h.method || "GET"} url: ${h.protocol || "https:"}//${h.hostname}${h.port ? `:${h.port}` : ""}${h.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (S.statusCode === 204) {
        U();
        return;
      }
      const ee = (H = S.statusCode) !== null && H !== void 0 ? H : 0, L = ee >= 300 && ee < 400, ie = C(S, "location");
      if (L && ie != null) {
        if (k > this.maxRedirects) {
          I(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(p.prepareRedirectUrlOptions(ie, h), F, $, k).then(U).catch(I);
        return;
      }
      S.setEncoding("utf8");
      let le = "";
      S.on("error", I), S.on("data", (pe) => le += pe), S.on("end", () => {
        try {
          if (S.statusCode != null && S.statusCode >= 400) {
            const pe = C(S, "content-type"), De = pe != null && (Array.isArray(pe) ? pe.find((_e) => _e.includes("json")) != null : pe.includes("json"));
            I(l(S, `method: ${h.method || "GET"} url: ${h.protocol || "https:"}//${h.hostname}${h.port ? `:${h.port}` : ""}${h.path}

          Data:
          ${De ? JSON.stringify(JSON.parse(le)) : le}
          `));
          } else
            U(le.length === 0 ? null : le);
        } catch (pe) {
          I(pe);
        }
      });
    }
    async downloadToBuffer(S, h) {
      return await h.cancellationToken.createPromise((F, U, I) => {
        const k = [], $ = {
          headers: h.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        c(S, $), D($), this.doDownload($, {
          destination: null,
          options: h,
          onCancel: I,
          callback: (H) => {
            H == null ? F(Buffer.concat(k)) : U(H);
          },
          responseHandler: (H, ee) => {
            let L = 0;
            H.on("data", (ie) => {
              if (L += ie.length, L > 524288e3) {
                ee(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              k.push(ie);
            }), H.on("end", () => {
              ee(null);
            });
          }
        }, 0);
      });
    }
    doDownload(S, h, F) {
      const U = this.createRequest(S, (I) => {
        if (I.statusCode >= 400) {
          h.callback(new Error(`Cannot download "${S.protocol || "https:"}//${S.hostname}${S.path}", status ${I.statusCode}: ${I.statusMessage}`));
          return;
        }
        I.on("error", h.callback);
        const k = C(I, "location");
        if (k != null) {
          F < this.maxRedirects ? this.doDownload(p.prepareRedirectUrlOptions(k, S), h, F++) : h.callback(this.createMaxRedirectError());
          return;
        }
        h.responseHandler == null ? O(h, I) : h.responseHandler(I, h.callback);
      });
      this.addErrorAndTimeoutHandlers(U, h.callback, S.timeout), this.addRedirectHandlers(U, S, h.callback, F, (I) => {
        this.doDownload(I, h, F++);
      }), U.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(S, h, F) {
      S.on("socket", (U) => {
        U.setTimeout(F, () => {
          S.abort(), h(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(S, h) {
      const F = A(S, { ...h }), U = F.headers;
      if (U != null && U.authorization) {
        const I = p.reconstructOriginalUrl(h), k = g(S, h);
        p.isCrossOriginRedirect(I, k) && (s.enabled && s(`Given the cross-origin redirect (from ${I.host} to ${k.host}), the Authorization header will be stripped out.`), delete U.authorization);
      }
      return F;
    }
    static reconstructOriginalUrl(S) {
      const h = S.protocol || "https:";
      if (!S.hostname)
        throw new Error("Missing hostname in request options");
      const F = S.hostname, U = S.port ? `:${S.port}` : "", I = S.path || "/";
      return new f.URL(`${h}//${F}${U}${I}`);
    }
    static isCrossOriginRedirect(S, h) {
      if (S.hostname.toLowerCase() !== h.hostname.toLowerCase())
        return !0;
      if (S.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
      ["80", ""].includes(S.port) && h.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
      ["443", ""].includes(h.port))
        return !1;
      if (S.protocol !== h.protocol)
        return !0;
      const F = S.port, U = h.port;
      return F !== U;
    }
    static retryOnServerError(S, h = 3) {
      for (let F = 0; ; F++)
        try {
          return S();
        } catch (U) {
          if (F < h && (U instanceof i && U.isServerError() || U.code === "EPIPE"))
            continue;
          throw U;
        }
    }
  }
  Le.HttpExecutor = p;
  function g(P, S) {
    try {
      return new f.URL(P);
    } catch {
      const h = S.hostname, F = S.protocol || "https:", U = S.port ? `:${S.port}` : "", I = `${F}//${h}${U}`;
      return new f.URL(P, I);
    }
  }
  function A(P, S) {
    const h = D(S), F = g(P, S);
    return c(F, h), h;
  }
  function c(P, S) {
    S.protocol = P.protocol, S.hostname = P.hostname, P.port ? S.port = P.port : S.port && delete S.port, S.path = P.pathname + P.search;
  }
  class E extends v.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(S, h = "sha512", F = "base64") {
      super(), this.expected = S, this.algorithm = h, this.encoding = F, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, t.createHash)(h);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(S, h, F) {
      this.digester.update(S), F(null, S);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(S) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (h) {
          S(h);
          return;
        }
      S(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, r.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, r.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  Le.DigestTransform = E;
  function T(P, S, h) {
    return P != null && S != null && P !== S ? (h(new Error(`checksum mismatch: expected ${S} but got ${P} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function C(P, S) {
    const h = P.headers[S];
    return h == null ? null : Array.isArray(h) ? h.length === 0 ? null : h[h.length - 1] : h;
  }
  function O(P, S) {
    if (!T(C(S, "X-Checksum-Sha2"), P.options.sha2, P.callback))
      return;
    const h = [];
    if (P.options.onProgress != null) {
      const k = C(S, "content-length");
      k != null && h.push(new o.ProgressCallbackTransform(parseInt(k, 10), P.options.cancellationToken, P.options.onProgress));
    }
    const F = P.options.sha512;
    F != null ? h.push(new E(F, "sha512", F.length === 128 && !F.includes("+") && !F.includes("Z") && !F.includes("=") ? "hex" : "base64")) : P.options.sha2 != null && h.push(new E(P.options.sha2, "sha256", "hex"));
    const U = (0, y.createWriteStream)(P.destination);
    h.push(U);
    let I = S;
    for (const k of h)
      k.on("error", ($) => {
        U.close(), P.options.cancellationToken.cancelled || P.callback($);
      }), I = I.pipe(k);
    U.on("finish", () => {
      U.close(P.callback);
    });
  }
  function D(P, S, h) {
    h != null && (P.method = h), P.headers = { ...P.headers };
    const F = P.headers;
    return S != null && (F.authorization = S.startsWith("Basic") || S.startsWith("Bearer") ? S : `token ${S}`), F["User-Agent"] == null && (F["User-Agent"] = "electron-builder"), (h == null || h === "GET" || F["Cache-Control"] == null) && (F["Cache-Control"] = "no-cache"), P.protocol == null && process.versions.electron != null && (P.protocol = "https:"), P;
  }
  function N(P, S) {
    return JSON.stringify(P, (h, F) => h.endsWith("Authorization") || h.endsWith("authorization") || h.endsWith("Password") || h.endsWith("PASSWORD") || h.endsWith("Token") || h.includes("password") || h.includes("token") || S != null && S.has(h) ? "<stripped sensitive data>" : F, 2);
  }
  return Le;
}
var Mt = {}, Gi;
function hl() {
  if (Gi) return Mt;
  Gi = 1, Object.defineProperty(Mt, "__esModule", { value: !0 }), Mt.MemoLazy = void 0;
  let t = class {
    constructor(v, f) {
      this.selector = v, this.creator = f, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const v = this.selector();
      if (this._value !== void 0 && m(this.selected, v))
        return this._value;
      this.selected = v;
      const f = this.creator(v);
      return this.value = f, f;
    }
    set value(v) {
      this._value = v;
    }
  };
  Mt.MemoLazy = t;
  function m(y, v) {
    if (typeof y == "object" && y !== null && (typeof v == "object" && v !== null)) {
      const r = Object.keys(y), o = Object.keys(v);
      return r.length === o.length && r.every((s) => m(y[s], v[s]));
    }
    return y === v;
  }
  return Mt;
}
var Dt = {}, Wi;
function pl() {
  if (Wi) return Dt;
  Wi = 1, Object.defineProperty(Dt, "__esModule", { value: !0 }), Dt.githubUrl = t, Dt.githubTagPrefix = m, Dt.getS3LikeProviderBaseUrl = y;
  function t(r, o = "github.com") {
    return `${r.protocol || "https"}://${r.host || o}`;
  }
  function m(r) {
    var o;
    return r.tagNamePrefix ? r.tagNamePrefix : !((o = r.vPrefixedTagName) !== null && o !== void 0) || o ? "v" : "";
  }
  function y(r) {
    const o = r.provider;
    if (o === "s3")
      return v(r);
    if (o === "spaces")
      return a(r);
    throw new Error(`Not supported provider: ${o}`);
  }
  function v(r) {
    let o;
    if (r.accelerate == !0)
      o = `https://${r.bucket}.s3-accelerate.amazonaws.com`;
    else if (r.endpoint != null)
      o = `${r.endpoint}/${r.bucket}`;
    else if (r.bucket.includes(".")) {
      if (r.region == null)
        throw new Error(`Bucket name "${r.bucket}" includes a dot, but S3 region is missing`);
      r.region === "us-east-1" ? o = `https://s3.amazonaws.com/${r.bucket}` : o = `https://s3-${r.region}.amazonaws.com/${r.bucket}`;
    } else r.region === "cn-north-1" ? o = `https://${r.bucket}.s3.${r.region}.amazonaws.com.cn` : o = `https://${r.bucket}.s3.amazonaws.com`;
    return f(o, r.path);
  }
  function f(r, o) {
    return o != null && o.length > 0 && (o.startsWith("/") || (r += "/"), r += o), r;
  }
  function a(r) {
    if (r.name == null)
      throw new Error("name is missing");
    if (r.region == null)
      throw new Error("region is missing");
    return f(`https://${r.name}.${r.region}.digitaloceanspaces.com`, r.path);
  }
  return Dt;
}
var Er = {}, Yi;
function ml() {
  if (Yi) return Er;
  Yi = 1, Object.defineProperty(Er, "__esModule", { value: !0 }), Er.retry = m;
  const t = Hn();
  async function m(y, v) {
    var f;
    const { retries: a, interval: r, backoff: o = 0, attempt: s = 0, shouldRetry: l, cancellationToken: u = new t.CancellationToken() } = v;
    try {
      return await y();
    } catch (i) {
      if (await Promise.resolve((f = l == null ? void 0 : l(i)) !== null && f !== void 0 ? f : !0) && a > 0 && !u.cancelled)
        return await new Promise((n) => setTimeout(n, r + o * s)), await m(y, { ...v, retries: a - 1, attempt: s + 1 });
      throw i;
    }
  }
  return Er;
}
var br = {}, Vi;
function gl() {
  if (Vi) return br;
  Vi = 1, Object.defineProperty(br, "__esModule", { value: !0 }), br.parseDn = t;
  function t(m) {
    let y = !1, v = null, f = "", a = 0;
    m = m.trim();
    const r = /* @__PURE__ */ new Map();
    for (let o = 0; o <= m.length; o++) {
      if (o === m.length) {
        v !== null && r.set(v, f);
        break;
      }
      const s = m[o];
      if (y) {
        if (s === '"') {
          y = !1;
          continue;
        }
      } else {
        if (s === '"') {
          y = !0;
          continue;
        }
        if (s === "\\") {
          o++;
          const l = parseInt(m.slice(o, o + 2), 16);
          Number.isNaN(l) ? f += m[o] : (o++, f += String.fromCharCode(l));
          continue;
        }
        if (v === null && s === "=") {
          v = f, f = "";
          continue;
        }
        if (s === "," || s === ";" || s === "+") {
          v !== null && r.set(v, f), v = null, f = "";
          continue;
        }
      }
      if (s === " " && !y) {
        if (f.length === 0)
          continue;
        if (o > a) {
          let l = o;
          for (; m[l] === " "; )
            l++;
          a = l;
        }
        if (a >= m.length || m[a] === "," || m[a] === ";" || v === null && m[a] === "=" || v !== null && m[a] === "+") {
          o = a - 1;
          continue;
        }
      }
      f += s;
    }
    return r;
  }
  return br;
}
var wt = {}, zi;
function yl() {
  if (zi) return wt;
  zi = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.nil = wt.UUID = void 0;
  const t = lr, m = Cr(), y = "options.name must be either a string or a Buffer", v = (0, t.randomBytes)(16);
  v[0] = v[0] | 1;
  const f = {}, a = [];
  for (let i = 0; i < 256; i++) {
    const n = (i + 256).toString(16).substr(1);
    f[n] = i, a[i] = n;
  }
  class r {
    constructor(n) {
      this.ascii = null, this.binary = null;
      const p = r.check(n);
      if (!p)
        throw new Error("not a UUID");
      this.version = p.version, p.format === "ascii" ? this.ascii = n : this.binary = n;
    }
    static v5(n, p) {
      return l(n, "sha1", 80, p);
    }
    toString() {
      return this.ascii == null && (this.ascii = u(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(n, p = 0) {
      if (typeof n == "string")
        return n = n.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(n) ? n === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (f[n[14] + n[15]] & 240) >> 4,
          variant: o((f[n[19] + n[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(n)) {
        if (n.length < p + 16)
          return !1;
        let g = 0;
        for (; g < 16 && n[p + g] === 0; g++)
          ;
        return g === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (n[p + 6] & 240) >> 4,
          variant: o((n[p + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, m.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(n) {
      const p = Buffer.allocUnsafe(16);
      let g = 0;
      for (let A = 0; A < 16; A++)
        p[A] = f[n[g++] + n[g++]], (A === 3 || A === 5 || A === 7 || A === 9) && (g += 1);
      return p;
    }
  }
  wt.UUID = r, r.OID = r.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function o(i) {
    switch (i) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var s;
  (function(i) {
    i[i.ASCII = 0] = "ASCII", i[i.BINARY = 1] = "BINARY", i[i.OBJECT = 2] = "OBJECT";
  })(s || (s = {}));
  function l(i, n, p, g, A = s.ASCII) {
    const c = (0, t.createHash)(n);
    if (typeof i != "string" && !Buffer.isBuffer(i))
      throw (0, m.newError)(y, "ERR_INVALID_UUID_NAME");
    c.update(g), c.update(i);
    const T = c.digest();
    let C;
    switch (A) {
      case s.BINARY:
        T[6] = T[6] & 15 | p, T[8] = T[8] & 63 | 128, C = T;
        break;
      case s.OBJECT:
        T[6] = T[6] & 15 | p, T[8] = T[8] & 63 | 128, C = new r(T);
        break;
      default:
        C = a[T[0]] + a[T[1]] + a[T[2]] + a[T[3]] + "-" + a[T[4]] + a[T[5]] + "-" + a[T[6] & 15 | p] + a[T[7]] + "-" + a[T[8] & 63 | 128] + a[T[9]] + "-" + a[T[10]] + a[T[11]] + a[T[12]] + a[T[13]] + a[T[14]] + a[T[15]];
        break;
    }
    return C;
  }
  function u(i) {
    return a[i[0]] + a[i[1]] + a[i[2]] + a[i[3]] + "-" + a[i[4]] + a[i[5]] + "-" + a[i[6]] + a[i[7]] + "-" + a[i[8]] + a[i[9]] + "-" + a[i[10]] + a[i[11]] + a[i[12]] + a[i[13]] + a[i[14]] + a[i[15]];
  }
  return wt.nil = new r("00000000-0000-0000-0000-000000000000"), wt;
}
var Ct = {}, dn = {}, Ki;
function vl() {
  return Ki || (Ki = 1, (function(t) {
    (function(m) {
      m.parser = function(_, d) {
        return new v(_, d);
      }, m.SAXParser = v, m.SAXStream = u, m.createStream = l, m.MAX_BUFFER_LENGTH = 64 * 1024;
      var y = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      m.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function v(_, d) {
        if (!(this instanceof v))
          return new v(_, d);
        var B = this;
        a(B), B.q = B.c = "", B.bufferCheckPosition = m.MAX_BUFFER_LENGTH, B.opt = d || {}, B.opt.lowercase = B.opt.lowercase || B.opt.lowercasetags, B.looseCase = B.opt.lowercase ? "toLowerCase" : "toUpperCase", B.tags = [], B.closed = B.closedRoot = B.sawRoot = !1, B.tag = B.error = null, B.strict = !!_, B.noscript = !!(_ || B.opt.noscript), B.state = h.BEGIN, B.strictEntities = B.opt.strictEntities, B.ENTITIES = B.strictEntities ? Object.create(m.XML_ENTITIES) : Object.create(m.ENTITIES), B.attribList = [], B.opt.xmlns && (B.ns = Object.create(A)), B.opt.unquotedAttributeValues === void 0 && (B.opt.unquotedAttributeValues = !_), B.trackPosition = B.opt.position !== !1, B.trackPosition && (B.position = B.line = B.column = 0), U(B, "onready");
      }
      Object.create || (Object.create = function(_) {
        function d() {
        }
        d.prototype = _;
        var B = new d();
        return B;
      }), Object.keys || (Object.keys = function(_) {
        var d = [];
        for (var B in _) _.hasOwnProperty(B) && d.push(B);
        return d;
      });
      function f(_) {
        for (var d = Math.max(m.MAX_BUFFER_LENGTH, 10), B = 0, R = 0, se = y.length; R < se; R++) {
          var ce = _[y[R]].length;
          if (ce > d)
            switch (y[R]) {
              case "textNode":
                k(_);
                break;
              case "cdata":
                I(_, "oncdata", _.cdata), _.cdata = "";
                break;
              case "script":
                I(_, "onscript", _.script), _.script = "";
                break;
              default:
                H(_, "Max buffer length exceeded: " + y[R]);
            }
          B = Math.max(B, ce);
        }
        var fe = m.MAX_BUFFER_LENGTH - B;
        _.bufferCheckPosition = fe + _.position;
      }
      function a(_) {
        for (var d = 0, B = y.length; d < B; d++)
          _[y[d]] = "";
      }
      function r(_) {
        k(_), _.cdata !== "" && (I(_, "oncdata", _.cdata), _.cdata = ""), _.script !== "" && (I(_, "onscript", _.script), _.script = "");
      }
      v.prototype = {
        end: function() {
          ee(this);
        },
        write: me,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          r(this);
        }
      };
      var o;
      try {
        o = require("stream").Stream;
      } catch {
        o = function() {
        };
      }
      o || (o = function() {
      });
      var s = m.EVENTS.filter(function(_) {
        return _ !== "error" && _ !== "end";
      });
      function l(_, d) {
        return new u(_, d);
      }
      function u(_, d) {
        if (!(this instanceof u))
          return new u(_, d);
        o.apply(this), this._parser = new v(_, d), this.writable = !0, this.readable = !0;
        var B = this;
        this._parser.onend = function() {
          B.emit("end");
        }, this._parser.onerror = function(R) {
          B.emit("error", R), B._parser.error = null;
        }, this._decoder = null, s.forEach(function(R) {
          Object.defineProperty(B, "on" + R, {
            get: function() {
              return B._parser["on" + R];
            },
            set: function(se) {
              if (!se)
                return B.removeAllListeners(R), B._parser["on" + R] = se, se;
              B.on(R, se);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      u.prototype = Object.create(o.prototype, {
        constructor: {
          value: u
        }
      }), u.prototype.write = function(_) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(_)) {
          if (!this._decoder) {
            var d = Bs.StringDecoder;
            this._decoder = new d("utf8");
          }
          _ = this._decoder.write(_);
        }
        return this._parser.write(_.toString()), this.emit("data", _), !0;
      }, u.prototype.end = function(_) {
        return _ && _.length && this.write(_), this._parser.end(), !0;
      }, u.prototype.on = function(_, d) {
        var B = this;
        return !B._parser["on" + _] && s.indexOf(_) !== -1 && (B._parser["on" + _] = function() {
          var R = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          R.splice(0, 0, _), B.emit.apply(B, R);
        }), o.prototype.on.call(B, _, d);
      };
      var i = "[CDATA[", n = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", g = "http://www.w3.org/2000/xmlns/", A = { xml: p, xmlns: g }, c = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, E = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, C = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function O(_) {
        return _ === " " || _ === `
` || _ === "\r" || _ === "	";
      }
      function D(_) {
        return _ === '"' || _ === "'";
      }
      function N(_) {
        return _ === ">" || O(_);
      }
      function P(_, d) {
        return _.test(d);
      }
      function S(_, d) {
        return !P(_, d);
      }
      var h = 0;
      m.STATE = {
        BEGIN: h++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: h++,
        // leading whitespace
        TEXT: h++,
        // general stuff
        TEXT_ENTITY: h++,
        // &amp and such.
        OPEN_WAKA: h++,
        // <
        SGML_DECL: h++,
        // <!BLARG
        SGML_DECL_QUOTED: h++,
        // <!BLARG foo "bar
        DOCTYPE: h++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: h++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: h++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: h++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: h++,
        // <!-
        COMMENT: h++,
        // <!--
        COMMENT_ENDING: h++,
        // <!-- blah -
        COMMENT_ENDED: h++,
        // <!-- blah --
        CDATA: h++,
        // <![CDATA[ something
        CDATA_ENDING: h++,
        // ]
        CDATA_ENDING_2: h++,
        // ]]
        PROC_INST: h++,
        // <?hi
        PROC_INST_BODY: h++,
        // <?hi there
        PROC_INST_ENDING: h++,
        // <?hi "there" ?
        OPEN_TAG: h++,
        // <strong
        OPEN_TAG_SLASH: h++,
        // <strong /
        ATTRIB: h++,
        // <a
        ATTRIB_NAME: h++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: h++,
        // <a foo _
        ATTRIB_VALUE: h++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: h++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: h++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: h++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: h++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: h++,
        // <foo bar=&quot
        CLOSE_TAG: h++,
        // </a
        CLOSE_TAG_SAW_WHITE: h++,
        // </a   >
        SCRIPT: h++,
        // <script> ...
        SCRIPT_ENDING: h++
        // <script> ... <
      }, m.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, m.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(m.ENTITIES).forEach(function(_) {
        var d = m.ENTITIES[_], B = typeof d == "number" ? String.fromCharCode(d) : d;
        m.ENTITIES[_] = B;
      });
      for (var F in m.STATE)
        m.STATE[m.STATE[F]] = F;
      h = m.STATE;
      function U(_, d, B) {
        _[d] && _[d](B);
      }
      function I(_, d, B) {
        _.textNode && k(_), U(_, d, B);
      }
      function k(_) {
        _.textNode = $(_.opt, _.textNode), _.textNode && U(_, "ontext", _.textNode), _.textNode = "";
      }
      function $(_, d) {
        return _.trim && (d = d.trim()), _.normalize && (d = d.replace(/\s+/g, " ")), d;
      }
      function H(_, d) {
        return k(_), _.trackPosition && (d += `
Line: ` + _.line + `
Column: ` + _.column + `
Char: ` + _.c), d = new Error(d), _.error = d, U(_, "onerror", d), _;
      }
      function ee(_) {
        return _.sawRoot && !_.closedRoot && L(_, "Unclosed root tag"), _.state !== h.BEGIN && _.state !== h.BEGIN_WHITESPACE && _.state !== h.TEXT && H(_, "Unexpected end"), k(_), _.c = "", _.closed = !0, U(_, "onend"), v.call(_, _.strict, _.opt), _;
      }
      function L(_, d) {
        if (typeof _ != "object" || !(_ instanceof v))
          throw new Error("bad call to strictFail");
        _.strict && H(_, d);
      }
      function ie(_) {
        _.strict || (_.tagName = _.tagName[_.looseCase]());
        var d = _.tags[_.tags.length - 1] || _, B = _.tag = { name: _.tagName, attributes: {} };
        _.opt.xmlns && (B.ns = d.ns), _.attribList.length = 0, I(_, "onopentagstart", B);
      }
      function le(_, d) {
        var B = _.indexOf(":"), R = B < 0 ? ["", _] : _.split(":"), se = R[0], ce = R[1];
        return d && _ === "xmlns" && (se = "xmlns", ce = ""), { prefix: se, local: ce };
      }
      function pe(_) {
        if (_.strict || (_.attribName = _.attribName[_.looseCase]()), _.attribList.indexOf(_.attribName) !== -1 || _.tag.attributes.hasOwnProperty(_.attribName)) {
          _.attribName = _.attribValue = "";
          return;
        }
        if (_.opt.xmlns) {
          var d = le(_.attribName, !0), B = d.prefix, R = d.local;
          if (B === "xmlns")
            if (R === "xml" && _.attribValue !== p)
              L(
                _,
                "xml: prefix must be bound to " + p + `
Actual: ` + _.attribValue
              );
            else if (R === "xmlns" && _.attribValue !== g)
              L(
                _,
                "xmlns: prefix must be bound to " + g + `
Actual: ` + _.attribValue
              );
            else {
              var se = _.tag, ce = _.tags[_.tags.length - 1] || _;
              se.ns === ce.ns && (se.ns = Object.create(ce.ns)), se.ns[R] = _.attribValue;
            }
          _.attribList.push([_.attribName, _.attribValue]);
        } else
          _.tag.attributes[_.attribName] = _.attribValue, I(_, "onattribute", {
            name: _.attribName,
            value: _.attribValue
          });
        _.attribName = _.attribValue = "";
      }
      function De(_, d) {
        if (_.opt.xmlns) {
          var B = _.tag, R = le(_.tagName);
          B.prefix = R.prefix, B.local = R.local, B.uri = B.ns[R.prefix] || "", B.prefix && !B.uri && (L(
            _,
            "Unbound namespace prefix: " + JSON.stringify(_.tagName)
          ), B.uri = R.prefix);
          var se = _.tags[_.tags.length - 1] || _;
          B.ns && se.ns !== B.ns && Object.keys(B.ns).forEach(function(e) {
            I(_, "onopennamespace", {
              prefix: e,
              uri: B.ns[e]
            });
          });
          for (var ce = 0, fe = _.attribList.length; ce < fe; ce++) {
            var ye = _.attribList[ce], he = ye[0], $e = ye[1], we = le(he, !0), Me = we.prefix, nt = we.local, Ze = Me === "" ? "" : B.ns[Me] || "", Xe = {
              name: he,
              value: $e,
              prefix: Me,
              local: nt,
              uri: Ze
            };
            Me && Me !== "xmlns" && !Ze && (L(
              _,
              "Unbound namespace prefix: " + JSON.stringify(Me)
            ), Xe.uri = Me), _.tag.attributes[he] = Xe, I(_, "onattribute", Xe);
          }
          _.attribList.length = 0;
        }
        _.tag.isSelfClosing = !!d, _.sawRoot = !0, _.tags.push(_.tag), I(_, "onopentag", _.tag), d || (!_.noscript && _.tagName.toLowerCase() === "script" ? _.state = h.SCRIPT : _.state = h.TEXT, _.tag = null, _.tagName = ""), _.attribName = _.attribValue = "", _.attribList.length = 0;
      }
      function _e(_) {
        if (!_.tagName) {
          L(_, "Weird empty close tag."), _.textNode += "</>", _.state = h.TEXT;
          return;
        }
        if (_.script) {
          if (_.tagName !== "script") {
            _.script += "</" + _.tagName + ">", _.tagName = "", _.state = h.SCRIPT;
            return;
          }
          I(_, "onscript", _.script), _.script = "";
        }
        var d = _.tags.length, B = _.tagName;
        _.strict || (B = B[_.looseCase]());
        for (var R = B; d--; ) {
          var se = _.tags[d];
          if (se.name !== R)
            L(_, "Unexpected close tag");
          else
            break;
        }
        if (d < 0) {
          L(_, "Unmatched closing tag: " + _.tagName), _.textNode += "</" + _.tagName + ">", _.state = h.TEXT;
          return;
        }
        _.tagName = B;
        for (var ce = _.tags.length; ce-- > d; ) {
          var fe = _.tag = _.tags.pop();
          _.tagName = _.tag.name, I(_, "onclosetag", _.tagName);
          var ye = {};
          for (var he in fe.ns)
            ye[he] = fe.ns[he];
          var $e = _.tags[_.tags.length - 1] || _;
          _.opt.xmlns && fe.ns !== $e.ns && Object.keys(fe.ns).forEach(function(we) {
            var Me = fe.ns[we];
            I(_, "onclosenamespace", { prefix: we, uri: Me });
          });
        }
        d === 0 && (_.closedRoot = !0), _.tagName = _.attribValue = _.attribName = "", _.attribList.length = 0, _.state = h.TEXT;
      }
      function Fe(_) {
        var d = _.entity, B = d.toLowerCase(), R, se = "";
        return _.ENTITIES[d] ? _.ENTITIES[d] : _.ENTITIES[B] ? _.ENTITIES[B] : (d = B, d.charAt(0) === "#" && (d.charAt(1) === "x" ? (d = d.slice(2), R = parseInt(d, 16), se = R.toString(16)) : (d = d.slice(1), R = parseInt(d, 10), se = R.toString(10))), d = d.replace(/^0+/, ""), isNaN(R) || se.toLowerCase() !== d || R < 0 || R > 1114111 ? (L(_, "Invalid character entity"), "&" + _.entity + ";") : String.fromCodePoint(R));
      }
      function Ae(_, d) {
        d === "<" ? (_.state = h.OPEN_WAKA, _.startTagPosition = _.position) : O(d) || (L(_, "Non-whitespace before first tag."), _.textNode = d, _.state = h.TEXT);
      }
      function Q(_, d) {
        var B = "";
        return d < _.length && (B = _.charAt(d)), B;
      }
      function me(_) {
        var d = this;
        if (this.error)
          throw this.error;
        if (d.closed)
          return H(
            d,
            "Cannot write after close. Assign an onready handler."
          );
        if (_ === null)
          return ee(d);
        typeof _ == "object" && (_ = _.toString());
        for (var B = 0, R = ""; R = Q(_, B++), d.c = R, !!R; )
          switch (d.trackPosition && (d.position++, R === `
` ? (d.line++, d.column = 0) : d.column++), d.state) {
            case h.BEGIN:
              if (d.state = h.BEGIN_WHITESPACE, R === "\uFEFF")
                continue;
              Ae(d, R);
              continue;
            case h.BEGIN_WHITESPACE:
              Ae(d, R);
              continue;
            case h.TEXT:
              if (d.sawRoot && !d.closedRoot) {
                for (var ce = B - 1; R && R !== "<" && R !== "&"; )
                  R = Q(_, B++), R && d.trackPosition && (d.position++, R === `
` ? (d.line++, d.column = 0) : d.column++);
                d.textNode += _.substring(ce, B - 1);
              }
              R === "<" && !(d.sawRoot && d.closedRoot && !d.strict) ? (d.state = h.OPEN_WAKA, d.startTagPosition = d.position) : (!O(R) && (!d.sawRoot || d.closedRoot) && L(d, "Text data outside of root node."), R === "&" ? d.state = h.TEXT_ENTITY : d.textNode += R);
              continue;
            case h.SCRIPT:
              R === "<" ? d.state = h.SCRIPT_ENDING : d.script += R;
              continue;
            case h.SCRIPT_ENDING:
              R === "/" ? d.state = h.CLOSE_TAG : (d.script += "<" + R, d.state = h.SCRIPT);
              continue;
            case h.OPEN_WAKA:
              if (R === "!")
                d.state = h.SGML_DECL, d.sgmlDecl = "";
              else if (!O(R)) if (P(c, R))
                d.state = h.OPEN_TAG, d.tagName = R;
              else if (R === "/")
                d.state = h.CLOSE_TAG, d.tagName = "";
              else if (R === "?")
                d.state = h.PROC_INST, d.procInstName = d.procInstBody = "";
              else {
                if (L(d, "Unencoded <"), d.startTagPosition + 1 < d.position) {
                  var se = d.position - d.startTagPosition;
                  R = new Array(se).join(" ") + R;
                }
                d.textNode += "<" + R, d.state = h.TEXT;
              }
              continue;
            case h.SGML_DECL:
              if (d.sgmlDecl + R === "--") {
                d.state = h.COMMENT, d.comment = "", d.sgmlDecl = "";
                continue;
              }
              d.doctype && d.doctype !== !0 && d.sgmlDecl ? (d.state = h.DOCTYPE_DTD, d.doctype += "<!" + d.sgmlDecl + R, d.sgmlDecl = "") : (d.sgmlDecl + R).toUpperCase() === i ? (I(d, "onopencdata"), d.state = h.CDATA, d.sgmlDecl = "", d.cdata = "") : (d.sgmlDecl + R).toUpperCase() === n ? (d.state = h.DOCTYPE, (d.doctype || d.sawRoot) && L(
                d,
                "Inappropriately located doctype declaration"
              ), d.doctype = "", d.sgmlDecl = "") : R === ">" ? (I(d, "onsgmldeclaration", d.sgmlDecl), d.sgmlDecl = "", d.state = h.TEXT) : (D(R) && (d.state = h.SGML_DECL_QUOTED), d.sgmlDecl += R);
              continue;
            case h.SGML_DECL_QUOTED:
              R === d.q && (d.state = h.SGML_DECL, d.q = ""), d.sgmlDecl += R;
              continue;
            case h.DOCTYPE:
              R === ">" ? (d.state = h.TEXT, I(d, "ondoctype", d.doctype), d.doctype = !0) : (d.doctype += R, R === "[" ? d.state = h.DOCTYPE_DTD : D(R) && (d.state = h.DOCTYPE_QUOTED, d.q = R));
              continue;
            case h.DOCTYPE_QUOTED:
              d.doctype += R, R === d.q && (d.q = "", d.state = h.DOCTYPE);
              continue;
            case h.DOCTYPE_DTD:
              R === "]" ? (d.doctype += R, d.state = h.DOCTYPE) : R === "<" ? (d.state = h.OPEN_WAKA, d.startTagPosition = d.position) : D(R) ? (d.doctype += R, d.state = h.DOCTYPE_DTD_QUOTED, d.q = R) : d.doctype += R;
              continue;
            case h.DOCTYPE_DTD_QUOTED:
              d.doctype += R, R === d.q && (d.state = h.DOCTYPE_DTD, d.q = "");
              continue;
            case h.COMMENT:
              R === "-" ? d.state = h.COMMENT_ENDING : d.comment += R;
              continue;
            case h.COMMENT_ENDING:
              R === "-" ? (d.state = h.COMMENT_ENDED, d.comment = $(d.opt, d.comment), d.comment && I(d, "oncomment", d.comment), d.comment = "") : (d.comment += "-" + R, d.state = h.COMMENT);
              continue;
            case h.COMMENT_ENDED:
              R !== ">" ? (L(d, "Malformed comment"), d.comment += "--" + R, d.state = h.COMMENT) : d.doctype && d.doctype !== !0 ? d.state = h.DOCTYPE_DTD : d.state = h.TEXT;
              continue;
            case h.CDATA:
              for (var ce = B - 1; R && R !== "]"; )
                R = Q(_, B++), R && d.trackPosition && (d.position++, R === `
` ? (d.line++, d.column = 0) : d.column++);
              d.cdata += _.substring(ce, B - 1), R === "]" && (d.state = h.CDATA_ENDING);
              continue;
            case h.CDATA_ENDING:
              R === "]" ? d.state = h.CDATA_ENDING_2 : (d.cdata += "]" + R, d.state = h.CDATA);
              continue;
            case h.CDATA_ENDING_2:
              R === ">" ? (d.cdata && I(d, "oncdata", d.cdata), I(d, "onclosecdata"), d.cdata = "", d.state = h.TEXT) : R === "]" ? d.cdata += "]" : (d.cdata += "]]" + R, d.state = h.CDATA);
              continue;
            case h.PROC_INST:
              R === "?" ? d.state = h.PROC_INST_ENDING : O(R) ? d.state = h.PROC_INST_BODY : d.procInstName += R;
              continue;
            case h.PROC_INST_BODY:
              if (!d.procInstBody && O(R))
                continue;
              R === "?" ? d.state = h.PROC_INST_ENDING : d.procInstBody += R;
              continue;
            case h.PROC_INST_ENDING:
              R === ">" ? (I(d, "onprocessinginstruction", {
                name: d.procInstName,
                body: d.procInstBody
              }), d.procInstName = d.procInstBody = "", d.state = h.TEXT) : (d.procInstBody += "?" + R, d.state = h.PROC_INST_BODY);
              continue;
            case h.OPEN_TAG:
              P(E, R) ? d.tagName += R : (ie(d), R === ">" ? De(d) : R === "/" ? d.state = h.OPEN_TAG_SLASH : (O(R) || L(d, "Invalid character in tag name"), d.state = h.ATTRIB));
              continue;
            case h.OPEN_TAG_SLASH:
              R === ">" ? (De(d, !0), _e(d)) : (L(
                d,
                "Forward-slash in opening tag not followed by >"
              ), d.state = h.ATTRIB);
              continue;
            case h.ATTRIB:
              if (O(R))
                continue;
              R === ">" ? De(d) : R === "/" ? d.state = h.OPEN_TAG_SLASH : P(c, R) ? (d.attribName = R, d.attribValue = "", d.state = h.ATTRIB_NAME) : L(d, "Invalid attribute name");
              continue;
            case h.ATTRIB_NAME:
              R === "=" ? d.state = h.ATTRIB_VALUE : R === ">" ? (L(d, "Attribute without value"), d.attribValue = d.attribName, pe(d), De(d)) : O(R) ? d.state = h.ATTRIB_NAME_SAW_WHITE : P(E, R) ? d.attribName += R : L(d, "Invalid attribute name");
              continue;
            case h.ATTRIB_NAME_SAW_WHITE:
              if (R === "=")
                d.state = h.ATTRIB_VALUE;
              else {
                if (O(R))
                  continue;
                L(d, "Attribute without value"), d.tag.attributes[d.attribName] = "", d.attribValue = "", I(d, "onattribute", {
                  name: d.attribName,
                  value: ""
                }), d.attribName = "", R === ">" ? De(d) : P(c, R) ? (d.attribName = R, d.state = h.ATTRIB_NAME) : (L(d, "Invalid attribute name"), d.state = h.ATTRIB);
              }
              continue;
            case h.ATTRIB_VALUE:
              if (O(R))
                continue;
              D(R) ? (d.q = R, d.state = h.ATTRIB_VALUE_QUOTED) : (d.opt.unquotedAttributeValues || H(d, "Unquoted attribute value"), d.state = h.ATTRIB_VALUE_UNQUOTED, d.attribValue = R);
              continue;
            case h.ATTRIB_VALUE_QUOTED:
              if (R !== d.q) {
                R === "&" ? d.state = h.ATTRIB_VALUE_ENTITY_Q : d.attribValue += R;
                continue;
              }
              pe(d), d.q = "", d.state = h.ATTRIB_VALUE_CLOSED;
              continue;
            case h.ATTRIB_VALUE_CLOSED:
              O(R) ? d.state = h.ATTRIB : R === ">" ? De(d) : R === "/" ? d.state = h.OPEN_TAG_SLASH : P(c, R) ? (L(d, "No whitespace between attributes"), d.attribName = R, d.attribValue = "", d.state = h.ATTRIB_NAME) : L(d, "Invalid attribute name");
              continue;
            case h.ATTRIB_VALUE_UNQUOTED:
              if (!N(R)) {
                R === "&" ? d.state = h.ATTRIB_VALUE_ENTITY_U : d.attribValue += R;
                continue;
              }
              pe(d), R === ">" ? De(d) : d.state = h.ATTRIB;
              continue;
            case h.CLOSE_TAG:
              if (d.tagName)
                R === ">" ? _e(d) : P(E, R) ? d.tagName += R : d.script ? (d.script += "</" + d.tagName, d.tagName = "", d.state = h.SCRIPT) : (O(R) || L(d, "Invalid tagname in closing tag"), d.state = h.CLOSE_TAG_SAW_WHITE);
              else {
                if (O(R))
                  continue;
                S(c, R) ? d.script ? (d.script += "</" + R, d.state = h.SCRIPT) : L(d, "Invalid tagname in closing tag.") : d.tagName = R;
              }
              continue;
            case h.CLOSE_TAG_SAW_WHITE:
              if (O(R))
                continue;
              R === ">" ? _e(d) : L(d, "Invalid characters in closing tag");
              continue;
            case h.TEXT_ENTITY:
            case h.ATTRIB_VALUE_ENTITY_Q:
            case h.ATTRIB_VALUE_ENTITY_U:
              var fe, ye;
              switch (d.state) {
                case h.TEXT_ENTITY:
                  fe = h.TEXT, ye = "textNode";
                  break;
                case h.ATTRIB_VALUE_ENTITY_Q:
                  fe = h.ATTRIB_VALUE_QUOTED, ye = "attribValue";
                  break;
                case h.ATTRIB_VALUE_ENTITY_U:
                  fe = h.ATTRIB_VALUE_UNQUOTED, ye = "attribValue";
                  break;
              }
              if (R === ";") {
                var he = Fe(d);
                d.opt.unparsedEntities && !Object.values(m.XML_ENTITIES).includes(he) ? (d.entity = "", d.state = fe, d.write(he)) : (d[ye] += he, d.entity = "", d.state = fe);
              } else P(d.entity.length ? C : T, R) ? d.entity += R : (L(d, "Invalid character in entity name"), d[ye] += "&" + d.entity + R, d.entity = "", d.state = fe);
              continue;
            default:
              throw new Error(d, "Unknown state: " + d.state);
          }
        return d.position >= d.bufferCheckPosition && f(d), d;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || (function() {
        var _ = String.fromCharCode, d = Math.floor, B = function() {
          var R = 16384, se = [], ce, fe, ye = -1, he = arguments.length;
          if (!he)
            return "";
          for (var $e = ""; ++ye < he; ) {
            var we = Number(arguments[ye]);
            if (!isFinite(we) || // `NaN`, `+Infinity`, or `-Infinity`
            we < 0 || // not a valid Unicode code point
            we > 1114111 || // not a valid Unicode code point
            d(we) !== we)
              throw RangeError("Invalid code point: " + we);
            we <= 65535 ? se.push(we) : (we -= 65536, ce = (we >> 10) + 55296, fe = we % 1024 + 56320, se.push(ce, fe)), (ye + 1 === he || se.length > R) && ($e += _.apply(null, se), se.length = 0);
          }
          return $e;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: B,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = B;
      })();
    })(t);
  })(dn)), dn;
}
var Ji;
function _l() {
  if (Ji) return Ct;
  Ji = 1, Object.defineProperty(Ct, "__esModule", { value: !0 }), Ct.XElement = void 0, Ct.parseXml = r;
  const t = vl(), m = Cr();
  class y {
    constructor(s) {
      if (this.name = s, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !s)
        throw (0, m.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!f(s))
        throw (0, m.newError)(`Invalid element name: ${s}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(s) {
      const l = this.attributes === null ? null : this.attributes[s];
      if (l == null)
        throw (0, m.newError)(`No attribute "${s}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return l;
    }
    removeAttribute(s) {
      this.attributes !== null && delete this.attributes[s];
    }
    element(s, l = !1, u = null) {
      const i = this.elementOrNull(s, l);
      if (i === null)
        throw (0, m.newError)(u || `No element "${s}"`, "ERR_XML_MISSED_ELEMENT");
      return i;
    }
    elementOrNull(s, l = !1) {
      if (this.elements === null)
        return null;
      for (const u of this.elements)
        if (a(u, s, l))
          return u;
      return null;
    }
    getElements(s, l = !1) {
      return this.elements === null ? [] : this.elements.filter((u) => a(u, s, l));
    }
    elementValueOrEmpty(s, l = !1) {
      const u = this.elementOrNull(s, l);
      return u === null ? "" : u.value;
    }
  }
  Ct.XElement = y;
  const v = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function f(o) {
    return v.test(o);
  }
  function a(o, s, l) {
    const u = o.name;
    return u === s || l === !0 && u.length === s.length && u.toLowerCase() === s.toLowerCase();
  }
  function r(o) {
    let s = null;
    const l = t.parser(!0, {}), u = [];
    return l.onopentag = (i) => {
      const n = new y(i.name);
      if (n.attributes = i.attributes, s === null)
        s = n;
      else {
        const p = u[u.length - 1];
        p.elements == null && (p.elements = []), p.elements.push(n);
      }
      u.push(n);
    }, l.onclosetag = () => {
      u.pop();
    }, l.ontext = (i) => {
      u.length > 0 && (u[u.length - 1].value = i);
    }, l.oncdata = (i) => {
      const n = u[u.length - 1];
      n.value = i, n.isCData = !0;
    }, l.onerror = (i) => {
      throw i;
    }, l.write(o), s;
  }
  return Ct;
}
var Xi;
function xe() {
  return Xi || (Xi = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.CURRENT_APP_PACKAGE_FILE_NAME = t.CURRENT_APP_INSTALLER_FILE_NAME = t.XElement = t.parseXml = t.UUID = t.parseDn = t.retry = t.githubTagPrefix = t.githubUrl = t.getS3LikeProviderBaseUrl = t.ProgressCallbackTransform = t.MemoLazy = t.safeStringifyJson = t.safeGetHeader = t.parseJson = t.HttpExecutor = t.HttpError = t.DigestTransform = t.createHttpError = t.configureRequestUrl = t.configureRequestOptionsFromUrl = t.configureRequestOptions = t.newError = t.CancellationToken = t.CancellationError = void 0, t.asArray = i;
    var m = Hn();
    Object.defineProperty(t, "CancellationError", { enumerable: !0, get: function() {
      return m.CancellationError;
    } }), Object.defineProperty(t, "CancellationToken", { enumerable: !0, get: function() {
      return m.CancellationToken;
    } });
    var y = Cr();
    Object.defineProperty(t, "newError", { enumerable: !0, get: function() {
      return y.newError;
    } });
    var v = dl();
    Object.defineProperty(t, "configureRequestOptions", { enumerable: !0, get: function() {
      return v.configureRequestOptions;
    } }), Object.defineProperty(t, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return v.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(t, "configureRequestUrl", { enumerable: !0, get: function() {
      return v.configureRequestUrl;
    } }), Object.defineProperty(t, "createHttpError", { enumerable: !0, get: function() {
      return v.createHttpError;
    } }), Object.defineProperty(t, "DigestTransform", { enumerable: !0, get: function() {
      return v.DigestTransform;
    } }), Object.defineProperty(t, "HttpError", { enumerable: !0, get: function() {
      return v.HttpError;
    } }), Object.defineProperty(t, "HttpExecutor", { enumerable: !0, get: function() {
      return v.HttpExecutor;
    } }), Object.defineProperty(t, "parseJson", { enumerable: !0, get: function() {
      return v.parseJson;
    } }), Object.defineProperty(t, "safeGetHeader", { enumerable: !0, get: function() {
      return v.safeGetHeader;
    } }), Object.defineProperty(t, "safeStringifyJson", { enumerable: !0, get: function() {
      return v.safeStringifyJson;
    } });
    var f = hl();
    Object.defineProperty(t, "MemoLazy", { enumerable: !0, get: function() {
      return f.MemoLazy;
    } });
    var a = yo();
    Object.defineProperty(t, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return a.ProgressCallbackTransform;
    } });
    var r = pl();
    Object.defineProperty(t, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return r.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(t, "githubUrl", { enumerable: !0, get: function() {
      return r.githubUrl;
    } }), Object.defineProperty(t, "githubTagPrefix", { enumerable: !0, get: function() {
      return r.githubTagPrefix;
    } });
    var o = ml();
    Object.defineProperty(t, "retry", { enumerable: !0, get: function() {
      return o.retry;
    } });
    var s = gl();
    Object.defineProperty(t, "parseDn", { enumerable: !0, get: function() {
      return s.parseDn;
    } });
    var l = yl();
    Object.defineProperty(t, "UUID", { enumerable: !0, get: function() {
      return l.UUID;
    } });
    var u = _l();
    Object.defineProperty(t, "parseXml", { enumerable: !0, get: function() {
      return u.parseXml;
    } }), Object.defineProperty(t, "XElement", { enumerable: !0, get: function() {
      return u.XElement;
    } }), t.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", t.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function i(n) {
      return n == null ? [] : Array.isArray(n) ? n : [n];
    }
  })(fn)), fn;
}
var qe = {}, Ar = {}, st = {}, Qi;
function ur() {
  if (Qi) return st;
  Qi = 1;
  function t(r) {
    return typeof r > "u" || r === null;
  }
  function m(r) {
    return typeof r == "object" && r !== null;
  }
  function y(r) {
    return Array.isArray(r) ? r : t(r) ? [] : [r];
  }
  function v(r, o) {
    var s, l, u, i;
    if (o)
      for (i = Object.keys(o), s = 0, l = i.length; s < l; s += 1)
        u = i[s], r[u] = o[u];
    return r;
  }
  function f(r, o) {
    var s = "", l;
    for (l = 0; l < o; l += 1)
      s += r;
    return s;
  }
  function a(r) {
    return r === 0 && Number.NEGATIVE_INFINITY === 1 / r;
  }
  return st.isNothing = t, st.isObject = m, st.toArray = y, st.repeat = f, st.isNegativeZero = a, st.extend = v, st;
}
var hn, Zi;
function cr() {
  if (Zi) return hn;
  Zi = 1;
  function t(y, v) {
    var f = "", a = y.reason || "(unknown reason)";
    return y.mark ? (y.mark.name && (f += 'in "' + y.mark.name + '" '), f += "(" + (y.mark.line + 1) + ":" + (y.mark.column + 1) + ")", !v && y.mark.snippet && (f += `

` + y.mark.snippet), a + " " + f) : a;
  }
  function m(y, v) {
    Error.call(this), this.name = "YAMLException", this.reason = y, this.mark = v, this.message = t(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return m.prototype = Object.create(Error.prototype), m.prototype.constructor = m, m.prototype.toString = function(v) {
    return this.name + ": " + t(this, v);
  }, hn = m, hn;
}
var pn, ea;
function wl() {
  if (ea) return pn;
  ea = 1;
  var t = ur();
  function m(f, a, r, o, s) {
    var l = "", u = "", i = Math.floor(s / 2) - 1;
    return o - a > i && (l = " ... ", a = o - i + l.length), r - o > i && (u = " ...", r = o + i - u.length), {
      str: l + f.slice(a, r).replace(/\t/g, "→") + u,
      pos: o - a + l.length
      // relative position
    };
  }
  function y(f, a) {
    return t.repeat(" ", a - f.length) + f;
  }
  function v(f, a) {
    if (a = Object.create(a || null), !f.buffer) return null;
    a.maxLength || (a.maxLength = 79), typeof a.indent != "number" && (a.indent = 1), typeof a.linesBefore != "number" && (a.linesBefore = 3), typeof a.linesAfter != "number" && (a.linesAfter = 2);
    for (var r = /\r?\n|\r|\0/g, o = [0], s = [], l, u = -1; l = r.exec(f.buffer); )
      s.push(l.index), o.push(l.index + l[0].length), f.position <= l.index && u < 0 && (u = o.length - 2);
    u < 0 && (u = o.length - 1);
    var i = "", n, p, g = Math.min(f.line + a.linesAfter, s.length).toString().length, A = a.maxLength - (a.indent + g + 3);
    for (n = 1; n <= a.linesBefore && !(u - n < 0); n++)
      p = m(
        f.buffer,
        o[u - n],
        s[u - n],
        f.position - (o[u] - o[u - n]),
        A
      ), i = t.repeat(" ", a.indent) + y((f.line - n + 1).toString(), g) + " | " + p.str + `
` + i;
    for (p = m(f.buffer, o[u], s[u], f.position, A), i += t.repeat(" ", a.indent) + y((f.line + 1).toString(), g) + " | " + p.str + `
`, i += t.repeat("-", a.indent + g + 3 + p.pos) + `^
`, n = 1; n <= a.linesAfter && !(u + n >= s.length); n++)
      p = m(
        f.buffer,
        o[u + n],
        s[u + n],
        f.position - (o[u] - o[u + n]),
        A
      ), i += t.repeat(" ", a.indent) + y((f.line + n + 1).toString(), g) + " | " + p.str + `
`;
    return i.replace(/\n$/, "");
  }
  return pn = v, pn;
}
var mn, ta;
function Be() {
  if (ta) return mn;
  ta = 1;
  var t = cr(), m = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], y = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function v(a) {
    var r = {};
    return a !== null && Object.keys(a).forEach(function(o) {
      a[o].forEach(function(s) {
        r[String(s)] = o;
      });
    }), r;
  }
  function f(a, r) {
    if (r = r || {}, Object.keys(r).forEach(function(o) {
      if (m.indexOf(o) === -1)
        throw new t('Unknown option "' + o + '" is met in definition of "' + a + '" YAML type.');
    }), this.options = r, this.tag = a, this.kind = r.kind || null, this.resolve = r.resolve || function() {
      return !0;
    }, this.construct = r.construct || function(o) {
      return o;
    }, this.instanceOf = r.instanceOf || null, this.predicate = r.predicate || null, this.represent = r.represent || null, this.representName = r.representName || null, this.defaultStyle = r.defaultStyle || null, this.multi = r.multi || !1, this.styleAliases = v(r.styleAliases || null), y.indexOf(this.kind) === -1)
      throw new t('Unknown kind "' + this.kind + '" is specified for "' + a + '" YAML type.');
  }
  return mn = f, mn;
}
var gn, ra;
function vo() {
  if (ra) return gn;
  ra = 1;
  var t = cr(), m = Be();
  function y(a, r) {
    var o = [];
    return a[r].forEach(function(s) {
      var l = o.length;
      o.forEach(function(u, i) {
        u.tag === s.tag && u.kind === s.kind && u.multi === s.multi && (l = i);
      }), o[l] = s;
    }), o;
  }
  function v() {
    var a = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, r, o;
    function s(l) {
      l.multi ? (a.multi[l.kind].push(l), a.multi.fallback.push(l)) : a[l.kind][l.tag] = a.fallback[l.tag] = l;
    }
    for (r = 0, o = arguments.length; r < o; r += 1)
      arguments[r].forEach(s);
    return a;
  }
  function f(a) {
    return this.extend(a);
  }
  return f.prototype.extend = function(r) {
    var o = [], s = [];
    if (r instanceof m)
      s.push(r);
    else if (Array.isArray(r))
      s = s.concat(r);
    else if (r && (Array.isArray(r.implicit) || Array.isArray(r.explicit)))
      r.implicit && (o = o.concat(r.implicit)), r.explicit && (s = s.concat(r.explicit));
    else
      throw new t("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    o.forEach(function(u) {
      if (!(u instanceof m))
        throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (u.loadKind && u.loadKind !== "scalar")
        throw new t("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (u.multi)
        throw new t("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), s.forEach(function(u) {
      if (!(u instanceof m))
        throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var l = Object.create(f.prototype);
    return l.implicit = (this.implicit || []).concat(o), l.explicit = (this.explicit || []).concat(s), l.compiledImplicit = y(l, "implicit"), l.compiledExplicit = y(l, "explicit"), l.compiledTypeMap = v(l.compiledImplicit, l.compiledExplicit), l;
  }, gn = f, gn;
}
var yn, na;
function _o() {
  if (na) return yn;
  na = 1;
  var t = Be();
  return yn = new t("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(m) {
      return m !== null ? m : "";
    }
  }), yn;
}
var vn, ia;
function wo() {
  if (ia) return vn;
  ia = 1;
  var t = Be();
  return vn = new t("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(m) {
      return m !== null ? m : [];
    }
  }), vn;
}
var _n, aa;
function Eo() {
  if (aa) return _n;
  aa = 1;
  var t = Be();
  return _n = new t("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(m) {
      return m !== null ? m : {};
    }
  }), _n;
}
var wn, oa;
function bo() {
  if (oa) return wn;
  oa = 1;
  var t = vo();
  return wn = new t({
    explicit: [
      _o(),
      wo(),
      Eo()
    ]
  }), wn;
}
var En, sa;
function Ao() {
  if (sa) return En;
  sa = 1;
  var t = Be();
  function m(f) {
    if (f === null) return !0;
    var a = f.length;
    return a === 1 && f === "~" || a === 4 && (f === "null" || f === "Null" || f === "NULL");
  }
  function y() {
    return null;
  }
  function v(f) {
    return f === null;
  }
  return En = new t("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: m,
    construct: y,
    predicate: v,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  }), En;
}
var bn, la;
function To() {
  if (la) return bn;
  la = 1;
  var t = Be();
  function m(f) {
    if (f === null) return !1;
    var a = f.length;
    return a === 4 && (f === "true" || f === "True" || f === "TRUE") || a === 5 && (f === "false" || f === "False" || f === "FALSE");
  }
  function y(f) {
    return f === "true" || f === "True" || f === "TRUE";
  }
  function v(f) {
    return Object.prototype.toString.call(f) === "[object Boolean]";
  }
  return bn = new t("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: m,
    construct: y,
    predicate: v,
    represent: {
      lowercase: function(f) {
        return f ? "true" : "false";
      },
      uppercase: function(f) {
        return f ? "TRUE" : "FALSE";
      },
      camelcase: function(f) {
        return f ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), bn;
}
var An, ua;
function So() {
  if (ua) return An;
  ua = 1;
  var t = ur(), m = Be();
  function y(s) {
    return 48 <= s && s <= 57 || 65 <= s && s <= 70 || 97 <= s && s <= 102;
  }
  function v(s) {
    return 48 <= s && s <= 55;
  }
  function f(s) {
    return 48 <= s && s <= 57;
  }
  function a(s) {
    if (s === null) return !1;
    var l = s.length, u = 0, i = !1, n;
    if (!l) return !1;
    if (n = s[u], (n === "-" || n === "+") && (n = s[++u]), n === "0") {
      if (u + 1 === l) return !0;
      if (n = s[++u], n === "b") {
        for (u++; u < l; u++)
          if (n = s[u], n !== "_") {
            if (n !== "0" && n !== "1") return !1;
            i = !0;
          }
        return i && n !== "_";
      }
      if (n === "x") {
        for (u++; u < l; u++)
          if (n = s[u], n !== "_") {
            if (!y(s.charCodeAt(u))) return !1;
            i = !0;
          }
        return i && n !== "_";
      }
      if (n === "o") {
        for (u++; u < l; u++)
          if (n = s[u], n !== "_") {
            if (!v(s.charCodeAt(u))) return !1;
            i = !0;
          }
        return i && n !== "_";
      }
    }
    if (n === "_") return !1;
    for (; u < l; u++)
      if (n = s[u], n !== "_") {
        if (!f(s.charCodeAt(u)))
          return !1;
        i = !0;
      }
    return !(!i || n === "_");
  }
  function r(s) {
    var l = s, u = 1, i;
    if (l.indexOf("_") !== -1 && (l = l.replace(/_/g, "")), i = l[0], (i === "-" || i === "+") && (i === "-" && (u = -1), l = l.slice(1), i = l[0]), l === "0") return 0;
    if (i === "0") {
      if (l[1] === "b") return u * parseInt(l.slice(2), 2);
      if (l[1] === "x") return u * parseInt(l.slice(2), 16);
      if (l[1] === "o") return u * parseInt(l.slice(2), 8);
    }
    return u * parseInt(l, 10);
  }
  function o(s) {
    return Object.prototype.toString.call(s) === "[object Number]" && s % 1 === 0 && !t.isNegativeZero(s);
  }
  return An = new m("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: a,
    construct: r,
    predicate: o,
    represent: {
      binary: function(s) {
        return s >= 0 ? "0b" + s.toString(2) : "-0b" + s.toString(2).slice(1);
      },
      octal: function(s) {
        return s >= 0 ? "0o" + s.toString(8) : "-0o" + s.toString(8).slice(1);
      },
      decimal: function(s) {
        return s.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(s) {
        return s >= 0 ? "0x" + s.toString(16).toUpperCase() : "-0x" + s.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), An;
}
var Tn, ca;
function Po() {
  if (ca) return Tn;
  ca = 1;
  var t = ur(), m = Be(), y = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function v(s) {
    return !(s === null || !y.test(s) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    s[s.length - 1] === "_");
  }
  function f(s) {
    var l, u;
    return l = s.replace(/_/g, "").toLowerCase(), u = l[0] === "-" ? -1 : 1, "+-".indexOf(l[0]) >= 0 && (l = l.slice(1)), l === ".inf" ? u === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : l === ".nan" ? NaN : u * parseFloat(l, 10);
  }
  var a = /^[-+]?[0-9]+e/;
  function r(s, l) {
    var u;
    if (isNaN(s))
      switch (l) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === s)
      switch (l) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === s)
      switch (l) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (t.isNegativeZero(s))
      return "-0.0";
    return u = s.toString(10), a.test(u) ? u.replace("e", ".e") : u;
  }
  function o(s) {
    return Object.prototype.toString.call(s) === "[object Number]" && (s % 1 !== 0 || t.isNegativeZero(s));
  }
  return Tn = new m("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: v,
    construct: f,
    predicate: o,
    represent: r,
    defaultStyle: "lowercase"
  }), Tn;
}
var Sn, fa;
function Do() {
  return fa || (fa = 1, Sn = bo().extend({
    implicit: [
      Ao(),
      To(),
      So(),
      Po()
    ]
  })), Sn;
}
var Pn, da;
function Co() {
  return da || (da = 1, Pn = Do()), Pn;
}
var Dn, ha;
function Ro() {
  if (ha) return Dn;
  ha = 1;
  var t = Be(), m = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), y = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function v(r) {
    return r === null ? !1 : m.exec(r) !== null || y.exec(r) !== null;
  }
  function f(r) {
    var o, s, l, u, i, n, p, g = 0, A = null, c, E, T;
    if (o = m.exec(r), o === null && (o = y.exec(r)), o === null) throw new Error("Date resolve error");
    if (s = +o[1], l = +o[2] - 1, u = +o[3], !o[4])
      return new Date(Date.UTC(s, l, u));
    if (i = +o[4], n = +o[5], p = +o[6], o[7]) {
      for (g = o[7].slice(0, 3); g.length < 3; )
        g += "0";
      g = +g;
    }
    return o[9] && (c = +o[10], E = +(o[11] || 0), A = (c * 60 + E) * 6e4, o[9] === "-" && (A = -A)), T = new Date(Date.UTC(s, l, u, i, n, p, g)), A && T.setTime(T.getTime() - A), T;
  }
  function a(r) {
    return r.toISOString();
  }
  return Dn = new t("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: v,
    construct: f,
    instanceOf: Date,
    represent: a
  }), Dn;
}
var Cn, pa;
function Oo() {
  if (pa) return Cn;
  pa = 1;
  var t = Be();
  function m(y) {
    return y === "<<" || y === null;
  }
  return Cn = new t("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: m
  }), Cn;
}
var Rn, ma;
function No() {
  if (ma) return Rn;
  ma = 1;
  var t = Be(), m = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function y(r) {
    if (r === null) return !1;
    var o, s, l = 0, u = r.length, i = m;
    for (s = 0; s < u; s++)
      if (o = i.indexOf(r.charAt(s)), !(o > 64)) {
        if (o < 0) return !1;
        l += 6;
      }
    return l % 8 === 0;
  }
  function v(r) {
    var o, s, l = r.replace(/[\r\n=]/g, ""), u = l.length, i = m, n = 0, p = [];
    for (o = 0; o < u; o++)
      o % 4 === 0 && o && (p.push(n >> 16 & 255), p.push(n >> 8 & 255), p.push(n & 255)), n = n << 6 | i.indexOf(l.charAt(o));
    return s = u % 4 * 6, s === 0 ? (p.push(n >> 16 & 255), p.push(n >> 8 & 255), p.push(n & 255)) : s === 18 ? (p.push(n >> 10 & 255), p.push(n >> 2 & 255)) : s === 12 && p.push(n >> 4 & 255), new Uint8Array(p);
  }
  function f(r) {
    var o = "", s = 0, l, u, i = r.length, n = m;
    for (l = 0; l < i; l++)
      l % 3 === 0 && l && (o += n[s >> 18 & 63], o += n[s >> 12 & 63], o += n[s >> 6 & 63], o += n[s & 63]), s = (s << 8) + r[l];
    return u = i % 3, u === 0 ? (o += n[s >> 18 & 63], o += n[s >> 12 & 63], o += n[s >> 6 & 63], o += n[s & 63]) : u === 2 ? (o += n[s >> 10 & 63], o += n[s >> 4 & 63], o += n[s << 2 & 63], o += n[64]) : u === 1 && (o += n[s >> 2 & 63], o += n[s << 4 & 63], o += n[64], o += n[64]), o;
  }
  function a(r) {
    return Object.prototype.toString.call(r) === "[object Uint8Array]";
  }
  return Rn = new t("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: y,
    construct: v,
    predicate: a,
    represent: f
  }), Rn;
}
var On, ga;
function Io() {
  if (ga) return On;
  ga = 1;
  var t = Be(), m = Object.prototype.hasOwnProperty, y = Object.prototype.toString;
  function v(a) {
    if (a === null) return !0;
    var r = [], o, s, l, u, i, n = a;
    for (o = 0, s = n.length; o < s; o += 1) {
      if (l = n[o], i = !1, y.call(l) !== "[object Object]") return !1;
      for (u in l)
        if (m.call(l, u))
          if (!i) i = !0;
          else return !1;
      if (!i) return !1;
      if (r.indexOf(u) === -1) r.push(u);
      else return !1;
    }
    return !0;
  }
  function f(a) {
    return a !== null ? a : [];
  }
  return On = new t("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: v,
    construct: f
  }), On;
}
var Nn, ya;
function xo() {
  if (ya) return Nn;
  ya = 1;
  var t = Be(), m = Object.prototype.toString;
  function y(f) {
    if (f === null) return !0;
    var a, r, o, s, l, u = f;
    for (l = new Array(u.length), a = 0, r = u.length; a < r; a += 1) {
      if (o = u[a], m.call(o) !== "[object Object]" || (s = Object.keys(o), s.length !== 1)) return !1;
      l[a] = [s[0], o[s[0]]];
    }
    return !0;
  }
  function v(f) {
    if (f === null) return [];
    var a, r, o, s, l, u = f;
    for (l = new Array(u.length), a = 0, r = u.length; a < r; a += 1)
      o = u[a], s = Object.keys(o), l[a] = [s[0], o[s[0]]];
    return l;
  }
  return Nn = new t("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: y,
    construct: v
  }), Nn;
}
var In, va;
function Uo() {
  if (va) return In;
  va = 1;
  var t = Be(), m = Object.prototype.hasOwnProperty;
  function y(f) {
    if (f === null) return !0;
    var a, r = f;
    for (a in r)
      if (m.call(r, a) && r[a] !== null)
        return !1;
    return !0;
  }
  function v(f) {
    return f !== null ? f : {};
  }
  return In = new t("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: y,
    construct: v
  }), In;
}
var xn, _a;
function jn() {
  return _a || (_a = 1, xn = Co().extend({
    implicit: [
      Ro(),
      Oo()
    ],
    explicit: [
      No(),
      Io(),
      xo(),
      Uo()
    ]
  })), xn;
}
var wa;
function El() {
  if (wa) return Ar;
  wa = 1;
  var t = ur(), m = cr(), y = wl(), v = jn(), f = Object.prototype.hasOwnProperty, a = 1, r = 2, o = 3, s = 4, l = 1, u = 2, i = 3, n = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, p = /[\x85\u2028\u2029]/, g = /[,\[\]\{\}]/, A = /^(?:!|!!|![a-z\-]+!)$/i, c = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function E(e) {
    return Object.prototype.toString.call(e);
  }
  function T(e) {
    return e === 10 || e === 13;
  }
  function C(e) {
    return e === 9 || e === 32;
  }
  function O(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function D(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function N(e) {
    var M;
    return 48 <= e && e <= 57 ? e - 48 : (M = e | 32, 97 <= M && M <= 102 ? M - 97 + 10 : -1);
  }
  function P(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function S(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function h(e) {
    return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
  }
  function F(e) {
    return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
      (e - 65536 >> 10) + 55296,
      (e - 65536 & 1023) + 56320
    );
  }
  function U(e, M, j) {
    M === "__proto__" ? Object.defineProperty(e, M, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: j
    }) : e[M] = j;
  }
  for (var I = new Array(256), k = new Array(256), $ = 0; $ < 256; $++)
    I[$] = h($) ? 1 : 0, k[$] = h($);
  function H(e, M) {
    this.input = e, this.filename = M.filename || null, this.schema = M.schema || v, this.onWarning = M.onWarning || null, this.legacy = M.legacy || !1, this.json = M.json || !1, this.listener = M.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function ee(e, M) {
    var j = {
      name: e.filename,
      buffer: e.input.slice(0, -1),
      // omit trailing \0
      position: e.position,
      line: e.line,
      column: e.position - e.lineStart
    };
    return j.snippet = y(j), new m(M, j);
  }
  function L(e, M) {
    throw ee(e, M);
  }
  function ie(e, M) {
    e.onWarning && e.onWarning.call(null, ee(e, M));
  }
  var le = {
    YAML: function(M, j, Z) {
      var G, X, K;
      M.version !== null && L(M, "duplication of %YAML directive"), Z.length !== 1 && L(M, "YAML directive accepts exactly one argument"), G = /^([0-9]+)\.([0-9]+)$/.exec(Z[0]), G === null && L(M, "ill-formed argument of the YAML directive"), X = parseInt(G[1], 10), K = parseInt(G[2], 10), X !== 1 && L(M, "unacceptable YAML version of the document"), M.version = Z[0], M.checkLineBreaks = K < 2, K !== 1 && K !== 2 && ie(M, "unsupported YAML version of the document");
    },
    TAG: function(M, j, Z) {
      var G, X;
      Z.length !== 2 && L(M, "TAG directive accepts exactly two arguments"), G = Z[0], X = Z[1], A.test(G) || L(M, "ill-formed tag handle (first argument) of the TAG directive"), f.call(M.tagMap, G) && L(M, 'there is a previously declared suffix for "' + G + '" tag handle'), c.test(X) || L(M, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        X = decodeURIComponent(X);
      } catch {
        L(M, "tag prefix is malformed: " + X);
      }
      M.tagMap[G] = X;
    }
  };
  function pe(e, M, j, Z) {
    var G, X, K, re;
    if (M < j) {
      if (re = e.input.slice(M, j), Z)
        for (G = 0, X = re.length; G < X; G += 1)
          K = re.charCodeAt(G), K === 9 || 32 <= K && K <= 1114111 || L(e, "expected valid JSON character");
      else n.test(re) && L(e, "the stream contains non-printable characters");
      e.result += re;
    }
  }
  function De(e, M, j, Z) {
    var G, X, K, re;
    for (t.isObject(j) || L(e, "cannot merge mappings; the provided source object is unacceptable"), G = Object.keys(j), K = 0, re = G.length; K < re; K += 1)
      X = G[K], f.call(M, X) || (U(M, X, j[X]), Z[X] = !0);
  }
  function _e(e, M, j, Z, G, X, K, re, oe) {
    var Ee, be;
    if (Array.isArray(G))
      for (G = Array.prototype.slice.call(G), Ee = 0, be = G.length; Ee < be; Ee += 1)
        Array.isArray(G[Ee]) && L(e, "nested arrays are not supported inside keys"), typeof G == "object" && E(G[Ee]) === "[object Object]" && (G[Ee] = "[object Object]");
    if (typeof G == "object" && E(G) === "[object Object]" && (G = "[object Object]"), G = String(G), M === null && (M = {}), Z === "tag:yaml.org,2002:merge")
      if (Array.isArray(X))
        for (Ee = 0, be = X.length; Ee < be; Ee += 1)
          De(e, M, X[Ee], j);
      else
        De(e, M, X, j);
    else
      !e.json && !f.call(j, G) && f.call(M, G) && (e.line = K || e.line, e.lineStart = re || e.lineStart, e.position = oe || e.position, L(e, "duplicated mapping key")), U(M, G, X), delete j[G];
    return M;
  }
  function Fe(e) {
    var M;
    M = e.input.charCodeAt(e.position), M === 10 ? e.position++ : M === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : L(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
  }
  function Ae(e, M, j) {
    for (var Z = 0, G = e.input.charCodeAt(e.position); G !== 0; ) {
      for (; C(G); )
        G === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), G = e.input.charCodeAt(++e.position);
      if (M && G === 35)
        do
          G = e.input.charCodeAt(++e.position);
        while (G !== 10 && G !== 13 && G !== 0);
      if (T(G))
        for (Fe(e), G = e.input.charCodeAt(e.position), Z++, e.lineIndent = 0; G === 32; )
          e.lineIndent++, G = e.input.charCodeAt(++e.position);
      else
        break;
    }
    return j !== -1 && Z !== 0 && e.lineIndent < j && ie(e, "deficient indentation"), Z;
  }
  function Q(e) {
    var M = e.position, j;
    return j = e.input.charCodeAt(M), !!((j === 45 || j === 46) && j === e.input.charCodeAt(M + 1) && j === e.input.charCodeAt(M + 2) && (M += 3, j = e.input.charCodeAt(M), j === 0 || O(j)));
  }
  function me(e, M) {
    M === 1 ? e.result += " " : M > 1 && (e.result += t.repeat(`
`, M - 1));
  }
  function _(e, M, j) {
    var Z, G, X, K, re, oe, Ee, be, de = e.kind, w = e.result, q;
    if (q = e.input.charCodeAt(e.position), O(q) || D(q) || q === 35 || q === 38 || q === 42 || q === 33 || q === 124 || q === 62 || q === 39 || q === 34 || q === 37 || q === 64 || q === 96 || (q === 63 || q === 45) && (G = e.input.charCodeAt(e.position + 1), O(G) || j && D(G)))
      return !1;
    for (e.kind = "scalar", e.result = "", X = K = e.position, re = !1; q !== 0; ) {
      if (q === 58) {
        if (G = e.input.charCodeAt(e.position + 1), O(G) || j && D(G))
          break;
      } else if (q === 35) {
        if (Z = e.input.charCodeAt(e.position - 1), O(Z))
          break;
      } else {
        if (e.position === e.lineStart && Q(e) || j && D(q))
          break;
        if (T(q))
          if (oe = e.line, Ee = e.lineStart, be = e.lineIndent, Ae(e, !1, -1), e.lineIndent >= M) {
            re = !0, q = e.input.charCodeAt(e.position);
            continue;
          } else {
            e.position = K, e.line = oe, e.lineStart = Ee, e.lineIndent = be;
            break;
          }
      }
      re && (pe(e, X, K, !1), me(e, e.line - oe), X = K = e.position, re = !1), C(q) || (K = e.position + 1), q = e.input.charCodeAt(++e.position);
    }
    return pe(e, X, K, !1), e.result ? !0 : (e.kind = de, e.result = w, !1);
  }
  function d(e, M) {
    var j, Z, G;
    if (j = e.input.charCodeAt(e.position), j !== 39)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, Z = G = e.position; (j = e.input.charCodeAt(e.position)) !== 0; )
      if (j === 39)
        if (pe(e, Z, e.position, !0), j = e.input.charCodeAt(++e.position), j === 39)
          Z = e.position, e.position++, G = e.position;
        else
          return !0;
      else T(j) ? (pe(e, Z, G, !0), me(e, Ae(e, !1, M)), Z = G = e.position) : e.position === e.lineStart && Q(e) ? L(e, "unexpected end of the document within a single quoted scalar") : (e.position++, G = e.position);
    L(e, "unexpected end of the stream within a single quoted scalar");
  }
  function B(e, M) {
    var j, Z, G, X, K, re;
    if (re = e.input.charCodeAt(e.position), re !== 34)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, j = Z = e.position; (re = e.input.charCodeAt(e.position)) !== 0; ) {
      if (re === 34)
        return pe(e, j, e.position, !0), e.position++, !0;
      if (re === 92) {
        if (pe(e, j, e.position, !0), re = e.input.charCodeAt(++e.position), T(re))
          Ae(e, !1, M);
        else if (re < 256 && I[re])
          e.result += k[re], e.position++;
        else if ((K = P(re)) > 0) {
          for (G = K, X = 0; G > 0; G--)
            re = e.input.charCodeAt(++e.position), (K = N(re)) >= 0 ? X = (X << 4) + K : L(e, "expected hexadecimal character");
          e.result += F(X), e.position++;
        } else
          L(e, "unknown escape sequence");
        j = Z = e.position;
      } else T(re) ? (pe(e, j, Z, !0), me(e, Ae(e, !1, M)), j = Z = e.position) : e.position === e.lineStart && Q(e) ? L(e, "unexpected end of the document within a double quoted scalar") : (e.position++, Z = e.position);
    }
    L(e, "unexpected end of the stream within a double quoted scalar");
  }
  function R(e, M) {
    var j = !0, Z, G, X, K = e.tag, re, oe = e.anchor, Ee, be, de, w, q, W = /* @__PURE__ */ Object.create(null), Y, V, te, J;
    if (J = e.input.charCodeAt(e.position), J === 91)
      be = 93, q = !1, re = [];
    else if (J === 123)
      be = 125, q = !0, re = {};
    else
      return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = re), J = e.input.charCodeAt(++e.position); J !== 0; ) {
      if (Ae(e, !0, M), J = e.input.charCodeAt(e.position), J === be)
        return e.position++, e.tag = K, e.anchor = oe, e.kind = q ? "mapping" : "sequence", e.result = re, !0;
      j ? J === 44 && L(e, "expected the node content, but found ','") : L(e, "missed comma between flow collection entries"), V = Y = te = null, de = w = !1, J === 63 && (Ee = e.input.charCodeAt(e.position + 1), O(Ee) && (de = w = !0, e.position++, Ae(e, !0, M))), Z = e.line, G = e.lineStart, X = e.position, we(e, M, a, !1, !0), V = e.tag, Y = e.result, Ae(e, !0, M), J = e.input.charCodeAt(e.position), (w || e.line === Z) && J === 58 && (de = !0, J = e.input.charCodeAt(++e.position), Ae(e, !0, M), we(e, M, a, !1, !0), te = e.result), q ? _e(e, re, W, V, Y, te, Z, G, X) : de ? re.push(_e(e, null, W, V, Y, te, Z, G, X)) : re.push(Y), Ae(e, !0, M), J = e.input.charCodeAt(e.position), J === 44 ? (j = !0, J = e.input.charCodeAt(++e.position)) : j = !1;
    }
    L(e, "unexpected end of the stream within a flow collection");
  }
  function se(e, M) {
    var j, Z, G = l, X = !1, K = !1, re = M, oe = 0, Ee = !1, be, de;
    if (de = e.input.charCodeAt(e.position), de === 124)
      Z = !1;
    else if (de === 62)
      Z = !0;
    else
      return !1;
    for (e.kind = "scalar", e.result = ""; de !== 0; )
      if (de = e.input.charCodeAt(++e.position), de === 43 || de === 45)
        l === G ? G = de === 43 ? i : u : L(e, "repeat of a chomping mode identifier");
      else if ((be = S(de)) >= 0)
        be === 0 ? L(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : K ? L(e, "repeat of an indentation width identifier") : (re = M + be - 1, K = !0);
      else
        break;
    if (C(de)) {
      do
        de = e.input.charCodeAt(++e.position);
      while (C(de));
      if (de === 35)
        do
          de = e.input.charCodeAt(++e.position);
        while (!T(de) && de !== 0);
    }
    for (; de !== 0; ) {
      for (Fe(e), e.lineIndent = 0, de = e.input.charCodeAt(e.position); (!K || e.lineIndent < re) && de === 32; )
        e.lineIndent++, de = e.input.charCodeAt(++e.position);
      if (!K && e.lineIndent > re && (re = e.lineIndent), T(de)) {
        oe++;
        continue;
      }
      if (e.lineIndent < re) {
        G === i ? e.result += t.repeat(`
`, X ? 1 + oe : oe) : G === l && X && (e.result += `
`);
        break;
      }
      for (Z ? C(de) ? (Ee = !0, e.result += t.repeat(`
`, X ? 1 + oe : oe)) : Ee ? (Ee = !1, e.result += t.repeat(`
`, oe + 1)) : oe === 0 ? X && (e.result += " ") : e.result += t.repeat(`
`, oe) : e.result += t.repeat(`
`, X ? 1 + oe : oe), X = !0, K = !0, oe = 0, j = e.position; !T(de) && de !== 0; )
        de = e.input.charCodeAt(++e.position);
      pe(e, j, e.position, !1);
    }
    return !0;
  }
  function ce(e, M) {
    var j, Z = e.tag, G = e.anchor, X = [], K, re = !1, oe;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = X), oe = e.input.charCodeAt(e.position); oe !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), !(oe !== 45 || (K = e.input.charCodeAt(e.position + 1), !O(K)))); ) {
      if (re = !0, e.position++, Ae(e, !0, -1) && e.lineIndent <= M) {
        X.push(null), oe = e.input.charCodeAt(e.position);
        continue;
      }
      if (j = e.line, we(e, M, o, !1, !0), X.push(e.result), Ae(e, !0, -1), oe = e.input.charCodeAt(e.position), (e.line === j || e.lineIndent > M) && oe !== 0)
        L(e, "bad indentation of a sequence entry");
      else if (e.lineIndent < M)
        break;
    }
    return re ? (e.tag = Z, e.anchor = G, e.kind = "sequence", e.result = X, !0) : !1;
  }
  function fe(e, M, j) {
    var Z, G, X, K, re, oe, Ee = e.tag, be = e.anchor, de = {}, w = /* @__PURE__ */ Object.create(null), q = null, W = null, Y = null, V = !1, te = !1, J;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = de), J = e.input.charCodeAt(e.position); J !== 0; ) {
      if (!V && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), Z = e.input.charCodeAt(e.position + 1), X = e.line, (J === 63 || J === 58) && O(Z))
        J === 63 ? (V && (_e(e, de, w, q, W, null, K, re, oe), q = W = Y = null), te = !0, V = !0, G = !0) : V ? (V = !1, G = !0) : L(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, J = Z;
      else {
        if (K = e.line, re = e.lineStart, oe = e.position, !we(e, j, r, !1, !0))
          break;
        if (e.line === X) {
          for (J = e.input.charCodeAt(e.position); C(J); )
            J = e.input.charCodeAt(++e.position);
          if (J === 58)
            J = e.input.charCodeAt(++e.position), O(J) || L(e, "a whitespace character is expected after the key-value separator within a block mapping"), V && (_e(e, de, w, q, W, null, K, re, oe), q = W = Y = null), te = !0, V = !1, G = !1, q = e.tag, W = e.result;
          else if (te)
            L(e, "can not read an implicit mapping pair; a colon is missed");
          else
            return e.tag = Ee, e.anchor = be, !0;
        } else if (te)
          L(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return e.tag = Ee, e.anchor = be, !0;
      }
      if ((e.line === X || e.lineIndent > M) && (V && (K = e.line, re = e.lineStart, oe = e.position), we(e, M, s, !0, G) && (V ? W = e.result : Y = e.result), V || (_e(e, de, w, q, W, Y, K, re, oe), q = W = Y = null), Ae(e, !0, -1), J = e.input.charCodeAt(e.position)), (e.line === X || e.lineIndent > M) && J !== 0)
        L(e, "bad indentation of a mapping entry");
      else if (e.lineIndent < M)
        break;
    }
    return V && _e(e, de, w, q, W, null, K, re, oe), te && (e.tag = Ee, e.anchor = be, e.kind = "mapping", e.result = de), te;
  }
  function ye(e) {
    var M, j = !1, Z = !1, G, X, K;
    if (K = e.input.charCodeAt(e.position), K !== 33) return !1;
    if (e.tag !== null && L(e, "duplication of a tag property"), K = e.input.charCodeAt(++e.position), K === 60 ? (j = !0, K = e.input.charCodeAt(++e.position)) : K === 33 ? (Z = !0, G = "!!", K = e.input.charCodeAt(++e.position)) : G = "!", M = e.position, j) {
      do
        K = e.input.charCodeAt(++e.position);
      while (K !== 0 && K !== 62);
      e.position < e.length ? (X = e.input.slice(M, e.position), K = e.input.charCodeAt(++e.position)) : L(e, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; K !== 0 && !O(K); )
        K === 33 && (Z ? L(e, "tag suffix cannot contain exclamation marks") : (G = e.input.slice(M - 1, e.position + 1), A.test(G) || L(e, "named tag handle cannot contain such characters"), Z = !0, M = e.position + 1)), K = e.input.charCodeAt(++e.position);
      X = e.input.slice(M, e.position), g.test(X) && L(e, "tag suffix cannot contain flow indicator characters");
    }
    X && !c.test(X) && L(e, "tag name cannot contain such characters: " + X);
    try {
      X = decodeURIComponent(X);
    } catch {
      L(e, "tag name is malformed: " + X);
    }
    return j ? e.tag = X : f.call(e.tagMap, G) ? e.tag = e.tagMap[G] + X : G === "!" ? e.tag = "!" + X : G === "!!" ? e.tag = "tag:yaml.org,2002:" + X : L(e, 'undeclared tag handle "' + G + '"'), !0;
  }
  function he(e) {
    var M, j;
    if (j = e.input.charCodeAt(e.position), j !== 38) return !1;
    for (e.anchor !== null && L(e, "duplication of an anchor property"), j = e.input.charCodeAt(++e.position), M = e.position; j !== 0 && !O(j) && !D(j); )
      j = e.input.charCodeAt(++e.position);
    return e.position === M && L(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(M, e.position), !0;
  }
  function $e(e) {
    var M, j, Z;
    if (Z = e.input.charCodeAt(e.position), Z !== 42) return !1;
    for (Z = e.input.charCodeAt(++e.position), M = e.position; Z !== 0 && !O(Z) && !D(Z); )
      Z = e.input.charCodeAt(++e.position);
    return e.position === M && L(e, "name of an alias node must contain at least one character"), j = e.input.slice(M, e.position), f.call(e.anchorMap, j) || L(e, 'unidentified alias "' + j + '"'), e.result = e.anchorMap[j], Ae(e, !0, -1), !0;
  }
  function we(e, M, j, Z, G) {
    var X, K, re, oe = 1, Ee = !1, be = !1, de, w, q, W, Y, V;
    if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, X = K = re = s === j || o === j, Z && Ae(e, !0, -1) && (Ee = !0, e.lineIndent > M ? oe = 1 : e.lineIndent === M ? oe = 0 : e.lineIndent < M && (oe = -1)), oe === 1)
      for (; ye(e) || he(e); )
        Ae(e, !0, -1) ? (Ee = !0, re = X, e.lineIndent > M ? oe = 1 : e.lineIndent === M ? oe = 0 : e.lineIndent < M && (oe = -1)) : re = !1;
    if (re && (re = Ee || G), (oe === 1 || s === j) && (a === j || r === j ? Y = M : Y = M + 1, V = e.position - e.lineStart, oe === 1 ? re && (ce(e, V) || fe(e, V, Y)) || R(e, Y) ? be = !0 : (K && se(e, Y) || d(e, Y) || B(e, Y) ? be = !0 : $e(e) ? (be = !0, (e.tag !== null || e.anchor !== null) && L(e, "alias node should not have any properties")) : _(e, Y, a === j) && (be = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : oe === 0 && (be = re && ce(e, V))), e.tag === null)
      e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
    else if (e.tag === "?") {
      for (e.result !== null && e.kind !== "scalar" && L(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), de = 0, w = e.implicitTypes.length; de < w; de += 1)
        if (W = e.implicitTypes[de], W.resolve(e.result)) {
          e.result = W.construct(e.result), e.tag = W.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else if (e.tag !== "!") {
      if (f.call(e.typeMap[e.kind || "fallback"], e.tag))
        W = e.typeMap[e.kind || "fallback"][e.tag];
      else
        for (W = null, q = e.typeMap.multi[e.kind || "fallback"], de = 0, w = q.length; de < w; de += 1)
          if (e.tag.slice(0, q[de].tag.length) === q[de].tag) {
            W = q[de];
            break;
          }
      W || L(e, "unknown tag !<" + e.tag + ">"), e.result !== null && W.kind !== e.kind && L(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + W.kind + '", not "' + e.kind + '"'), W.resolve(e.result, e.tag) ? (e.result = W.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : L(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
    }
    return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || be;
  }
  function Me(e) {
    var M = e.position, j, Z, G, X = !1, K;
    for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (K = e.input.charCodeAt(e.position)) !== 0 && (Ae(e, !0, -1), K = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || K !== 37)); ) {
      for (X = !0, K = e.input.charCodeAt(++e.position), j = e.position; K !== 0 && !O(K); )
        K = e.input.charCodeAt(++e.position);
      for (Z = e.input.slice(j, e.position), G = [], Z.length < 1 && L(e, "directive name must not be less than one character in length"); K !== 0; ) {
        for (; C(K); )
          K = e.input.charCodeAt(++e.position);
        if (K === 35) {
          do
            K = e.input.charCodeAt(++e.position);
          while (K !== 0 && !T(K));
          break;
        }
        if (T(K)) break;
        for (j = e.position; K !== 0 && !O(K); )
          K = e.input.charCodeAt(++e.position);
        G.push(e.input.slice(j, e.position));
      }
      K !== 0 && Fe(e), f.call(le, Z) ? le[Z](e, Z, G) : ie(e, 'unknown document directive "' + Z + '"');
    }
    if (Ae(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ae(e, !0, -1)) : X && L(e, "directives end mark is expected"), we(e, e.lineIndent - 1, s, !1, !0), Ae(e, !0, -1), e.checkLineBreaks && p.test(e.input.slice(M, e.position)) && ie(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Q(e)) {
      e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ae(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1)
      L(e, "end of the stream or a document separator is expected");
    else
      return;
  }
  function nt(e, M) {
    e = String(e), M = M || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
    var j = new H(e, M), Z = e.indexOf("\0");
    for (Z !== -1 && (j.position = Z, L(j, "null byte is not allowed in input")), j.input += "\0"; j.input.charCodeAt(j.position) === 32; )
      j.lineIndent += 1, j.position += 1;
    for (; j.position < j.length - 1; )
      Me(j);
    return j.documents;
  }
  function Ze(e, M, j) {
    M !== null && typeof M == "object" && typeof j > "u" && (j = M, M = null);
    var Z = nt(e, j);
    if (typeof M != "function")
      return Z;
    for (var G = 0, X = Z.length; G < X; G += 1)
      M(Z[G]);
  }
  function Xe(e, M) {
    var j = nt(e, M);
    if (j.length !== 0) {
      if (j.length === 1)
        return j[0];
      throw new m("expected a single document in the stream, but found more");
    }
  }
  return Ar.loadAll = Ze, Ar.load = Xe, Ar;
}
var Un = {}, Ea;
function bl() {
  if (Ea) return Un;
  Ea = 1;
  var t = ur(), m = cr(), y = jn(), v = Object.prototype.toString, f = Object.prototype.hasOwnProperty, a = 65279, r = 9, o = 10, s = 13, l = 32, u = 33, i = 34, n = 35, p = 37, g = 38, A = 39, c = 42, E = 44, T = 45, C = 58, O = 61, D = 62, N = 63, P = 64, S = 91, h = 93, F = 96, U = 123, I = 124, k = 125, $ = {};
  $[0] = "\\0", $[7] = "\\a", $[8] = "\\b", $[9] = "\\t", $[10] = "\\n", $[11] = "\\v", $[12] = "\\f", $[13] = "\\r", $[27] = "\\e", $[34] = '\\"', $[92] = "\\\\", $[133] = "\\N", $[160] = "\\_", $[8232] = "\\L", $[8233] = "\\P";
  var H = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], ee = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function L(w, q) {
    var W, Y, V, te, J, ne, ue;
    if (q === null) return {};
    for (W = {}, Y = Object.keys(q), V = 0, te = Y.length; V < te; V += 1)
      J = Y[V], ne = String(q[J]), J.slice(0, 2) === "!!" && (J = "tag:yaml.org,2002:" + J.slice(2)), ue = w.compiledTypeMap.fallback[J], ue && f.call(ue.styleAliases, ne) && (ne = ue.styleAliases[ne]), W[J] = ne;
    return W;
  }
  function ie(w) {
    var q, W, Y;
    if (q = w.toString(16).toUpperCase(), w <= 255)
      W = "x", Y = 2;
    else if (w <= 65535)
      W = "u", Y = 4;
    else if (w <= 4294967295)
      W = "U", Y = 8;
    else
      throw new m("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + W + t.repeat("0", Y - q.length) + q;
  }
  var le = 1, pe = 2;
  function De(w) {
    this.schema = w.schema || y, this.indent = Math.max(1, w.indent || 2), this.noArrayIndent = w.noArrayIndent || !1, this.skipInvalid = w.skipInvalid || !1, this.flowLevel = t.isNothing(w.flowLevel) ? -1 : w.flowLevel, this.styleMap = L(this.schema, w.styles || null), this.sortKeys = w.sortKeys || !1, this.lineWidth = w.lineWidth || 80, this.noRefs = w.noRefs || !1, this.noCompatMode = w.noCompatMode || !1, this.condenseFlow = w.condenseFlow || !1, this.quotingType = w.quotingType === '"' ? pe : le, this.forceQuotes = w.forceQuotes || !1, this.replacer = typeof w.replacer == "function" ? w.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function _e(w, q) {
    for (var W = t.repeat(" ", q), Y = 0, V = -1, te = "", J, ne = w.length; Y < ne; )
      V = w.indexOf(`
`, Y), V === -1 ? (J = w.slice(Y), Y = ne) : (J = w.slice(Y, V + 1), Y = V + 1), J.length && J !== `
` && (te += W), te += J;
    return te;
  }
  function Fe(w, q) {
    return `
` + t.repeat(" ", w.indent * q);
  }
  function Ae(w, q) {
    var W, Y, V;
    for (W = 0, Y = w.implicitTypes.length; W < Y; W += 1)
      if (V = w.implicitTypes[W], V.resolve(q))
        return !0;
    return !1;
  }
  function Q(w) {
    return w === l || w === r;
  }
  function me(w) {
    return 32 <= w && w <= 126 || 161 <= w && w <= 55295 && w !== 8232 && w !== 8233 || 57344 <= w && w <= 65533 && w !== a || 65536 <= w && w <= 1114111;
  }
  function _(w) {
    return me(w) && w !== a && w !== s && w !== o;
  }
  function d(w, q, W) {
    var Y = _(w), V = Y && !Q(w);
    return (
      // ns-plain-safe
      (W ? (
        // c = flow-in
        Y
      ) : Y && w !== E && w !== S && w !== h && w !== U && w !== k) && w !== n && !(q === C && !V) || _(q) && !Q(q) && w === n || q === C && V
    );
  }
  function B(w) {
    return me(w) && w !== a && !Q(w) && w !== T && w !== N && w !== C && w !== E && w !== S && w !== h && w !== U && w !== k && w !== n && w !== g && w !== c && w !== u && w !== I && w !== O && w !== D && w !== A && w !== i && w !== p && w !== P && w !== F;
  }
  function R(w) {
    return !Q(w) && w !== C;
  }
  function se(w, q) {
    var W = w.charCodeAt(q), Y;
    return W >= 55296 && W <= 56319 && q + 1 < w.length && (Y = w.charCodeAt(q + 1), Y >= 56320 && Y <= 57343) ? (W - 55296) * 1024 + Y - 56320 + 65536 : W;
  }
  function ce(w) {
    var q = /^\n* /;
    return q.test(w);
  }
  var fe = 1, ye = 2, he = 3, $e = 4, we = 5;
  function Me(w, q, W, Y, V, te, J, ne) {
    var ue, ge = 0, Se = null, Oe = !1, Te = !1, St = Y !== -1, ze = -1, dt = B(se(w, 0)) && R(se(w, w.length - 1));
    if (q || J)
      for (ue = 0; ue < w.length; ge >= 65536 ? ue += 2 : ue++) {
        if (ge = se(w, ue), !me(ge))
          return we;
        dt = dt && d(ge, Se, ne), Se = ge;
      }
    else {
      for (ue = 0; ue < w.length; ge >= 65536 ? ue += 2 : ue++) {
        if (ge = se(w, ue), ge === o)
          Oe = !0, St && (Te = Te || // Foldable line = too long, and not more-indented.
          ue - ze - 1 > Y && w[ze + 1] !== " ", ze = ue);
        else if (!me(ge))
          return we;
        dt = dt && d(ge, Se, ne), Se = ge;
      }
      Te = Te || St && ue - ze - 1 > Y && w[ze + 1] !== " ";
    }
    return !Oe && !Te ? dt && !J && !V(w) ? fe : te === pe ? we : ye : W > 9 && ce(w) ? we : J ? te === pe ? we : ye : Te ? $e : he;
  }
  function nt(w, q, W, Y, V) {
    w.dump = (function() {
      if (q.length === 0)
        return w.quotingType === pe ? '""' : "''";
      if (!w.noCompatMode && (H.indexOf(q) !== -1 || ee.test(q)))
        return w.quotingType === pe ? '"' + q + '"' : "'" + q + "'";
      var te = w.indent * Math.max(1, W), J = w.lineWidth === -1 ? -1 : Math.max(Math.min(w.lineWidth, 40), w.lineWidth - te), ne = Y || w.flowLevel > -1 && W >= w.flowLevel;
      function ue(ge) {
        return Ae(w, ge);
      }
      switch (Me(
        q,
        ne,
        w.indent,
        J,
        ue,
        w.quotingType,
        w.forceQuotes && !Y,
        V
      )) {
        case fe:
          return q;
        case ye:
          return "'" + q.replace(/'/g, "''") + "'";
        case he:
          return "|" + Ze(q, w.indent) + Xe(_e(q, te));
        case $e:
          return ">" + Ze(q, w.indent) + Xe(_e(e(q, J), te));
        case we:
          return '"' + j(q) + '"';
        default:
          throw new m("impossible error: invalid scalar style");
      }
    })();
  }
  function Ze(w, q) {
    var W = ce(w) ? String(q) : "", Y = w[w.length - 1] === `
`, V = Y && (w[w.length - 2] === `
` || w === `
`), te = V ? "+" : Y ? "" : "-";
    return W + te + `
`;
  }
  function Xe(w) {
    return w[w.length - 1] === `
` ? w.slice(0, -1) : w;
  }
  function e(w, q) {
    for (var W = /(\n+)([^\n]*)/g, Y = (function() {
      var ge = w.indexOf(`
`);
      return ge = ge !== -1 ? ge : w.length, W.lastIndex = ge, M(w.slice(0, ge), q);
    })(), V = w[0] === `
` || w[0] === " ", te, J; J = W.exec(w); ) {
      var ne = J[1], ue = J[2];
      te = ue[0] === " ", Y += ne + (!V && !te && ue !== "" ? `
` : "") + M(ue, q), V = te;
    }
    return Y;
  }
  function M(w, q) {
    if (w === "" || w[0] === " ") return w;
    for (var W = / [^ ]/g, Y, V = 0, te, J = 0, ne = 0, ue = ""; Y = W.exec(w); )
      ne = Y.index, ne - V > q && (te = J > V ? J : ne, ue += `
` + w.slice(V, te), V = te + 1), J = ne;
    return ue += `
`, w.length - V > q && J > V ? ue += w.slice(V, J) + `
` + w.slice(J + 1) : ue += w.slice(V), ue.slice(1);
  }
  function j(w) {
    for (var q = "", W = 0, Y, V = 0; V < w.length; W >= 65536 ? V += 2 : V++)
      W = se(w, V), Y = $[W], !Y && me(W) ? (q += w[V], W >= 65536 && (q += w[V + 1])) : q += Y || ie(W);
    return q;
  }
  function Z(w, q, W) {
    var Y = "", V = w.tag, te, J, ne;
    for (te = 0, J = W.length; te < J; te += 1)
      ne = W[te], w.replacer && (ne = w.replacer.call(W, String(te), ne)), (oe(w, q, ne, !1, !1) || typeof ne > "u" && oe(w, q, null, !1, !1)) && (Y !== "" && (Y += "," + (w.condenseFlow ? "" : " ")), Y += w.dump);
    w.tag = V, w.dump = "[" + Y + "]";
  }
  function G(w, q, W, Y) {
    var V = "", te = w.tag, J, ne, ue;
    for (J = 0, ne = W.length; J < ne; J += 1)
      ue = W[J], w.replacer && (ue = w.replacer.call(W, String(J), ue)), (oe(w, q + 1, ue, !0, !0, !1, !0) || typeof ue > "u" && oe(w, q + 1, null, !0, !0, !1, !0)) && ((!Y || V !== "") && (V += Fe(w, q)), w.dump && o === w.dump.charCodeAt(0) ? V += "-" : V += "- ", V += w.dump);
    w.tag = te, w.dump = V || "[]";
  }
  function X(w, q, W) {
    var Y = "", V = w.tag, te = Object.keys(W), J, ne, ue, ge, Se;
    for (J = 0, ne = te.length; J < ne; J += 1)
      Se = "", Y !== "" && (Se += ", "), w.condenseFlow && (Se += '"'), ue = te[J], ge = W[ue], w.replacer && (ge = w.replacer.call(W, ue, ge)), oe(w, q, ue, !1, !1) && (w.dump.length > 1024 && (Se += "? "), Se += w.dump + (w.condenseFlow ? '"' : "") + ":" + (w.condenseFlow ? "" : " "), oe(w, q, ge, !1, !1) && (Se += w.dump, Y += Se));
    w.tag = V, w.dump = "{" + Y + "}";
  }
  function K(w, q, W, Y) {
    var V = "", te = w.tag, J = Object.keys(W), ne, ue, ge, Se, Oe, Te;
    if (w.sortKeys === !0)
      J.sort();
    else if (typeof w.sortKeys == "function")
      J.sort(w.sortKeys);
    else if (w.sortKeys)
      throw new m("sortKeys must be a boolean or a function");
    for (ne = 0, ue = J.length; ne < ue; ne += 1)
      Te = "", (!Y || V !== "") && (Te += Fe(w, q)), ge = J[ne], Se = W[ge], w.replacer && (Se = w.replacer.call(W, ge, Se)), oe(w, q + 1, ge, !0, !0, !0) && (Oe = w.tag !== null && w.tag !== "?" || w.dump && w.dump.length > 1024, Oe && (w.dump && o === w.dump.charCodeAt(0) ? Te += "?" : Te += "? "), Te += w.dump, Oe && (Te += Fe(w, q)), oe(w, q + 1, Se, !0, Oe) && (w.dump && o === w.dump.charCodeAt(0) ? Te += ":" : Te += ": ", Te += w.dump, V += Te));
    w.tag = te, w.dump = V || "{}";
  }
  function re(w, q, W) {
    var Y, V, te, J, ne, ue;
    for (V = W ? w.explicitTypes : w.implicitTypes, te = 0, J = V.length; te < J; te += 1)
      if (ne = V[te], (ne.instanceOf || ne.predicate) && (!ne.instanceOf || typeof q == "object" && q instanceof ne.instanceOf) && (!ne.predicate || ne.predicate(q))) {
        if (W ? ne.multi && ne.representName ? w.tag = ne.representName(q) : w.tag = ne.tag : w.tag = "?", ne.represent) {
          if (ue = w.styleMap[ne.tag] || ne.defaultStyle, v.call(ne.represent) === "[object Function]")
            Y = ne.represent(q, ue);
          else if (f.call(ne.represent, ue))
            Y = ne.represent[ue](q, ue);
          else
            throw new m("!<" + ne.tag + '> tag resolver accepts not "' + ue + '" style');
          w.dump = Y;
        }
        return !0;
      }
    return !1;
  }
  function oe(w, q, W, Y, V, te, J) {
    w.tag = null, w.dump = W, re(w, W, !1) || re(w, W, !0);
    var ne = v.call(w.dump), ue = Y, ge;
    Y && (Y = w.flowLevel < 0 || w.flowLevel > q);
    var Se = ne === "[object Object]" || ne === "[object Array]", Oe, Te;
    if (Se && (Oe = w.duplicates.indexOf(W), Te = Oe !== -1), (w.tag !== null && w.tag !== "?" || Te || w.indent !== 2 && q > 0) && (V = !1), Te && w.usedDuplicates[Oe])
      w.dump = "*ref_" + Oe;
    else {
      if (Se && Te && !w.usedDuplicates[Oe] && (w.usedDuplicates[Oe] = !0), ne === "[object Object]")
        Y && Object.keys(w.dump).length !== 0 ? (K(w, q, w.dump, V), Te && (w.dump = "&ref_" + Oe + w.dump)) : (X(w, q, w.dump), Te && (w.dump = "&ref_" + Oe + " " + w.dump));
      else if (ne === "[object Array]")
        Y && w.dump.length !== 0 ? (w.noArrayIndent && !J && q > 0 ? G(w, q - 1, w.dump, V) : G(w, q, w.dump, V), Te && (w.dump = "&ref_" + Oe + w.dump)) : (Z(w, q, w.dump), Te && (w.dump = "&ref_" + Oe + " " + w.dump));
      else if (ne === "[object String]")
        w.tag !== "?" && nt(w, w.dump, q, te, ue);
      else {
        if (ne === "[object Undefined]")
          return !1;
        if (w.skipInvalid) return !1;
        throw new m("unacceptable kind of an object to dump " + ne);
      }
      w.tag !== null && w.tag !== "?" && (ge = encodeURI(
        w.tag[0] === "!" ? w.tag.slice(1) : w.tag
      ).replace(/!/g, "%21"), w.tag[0] === "!" ? ge = "!" + ge : ge.slice(0, 18) === "tag:yaml.org,2002:" ? ge = "!!" + ge.slice(18) : ge = "!<" + ge + ">", w.dump = ge + " " + w.dump);
    }
    return !0;
  }
  function Ee(w, q) {
    var W = [], Y = [], V, te;
    for (be(w, W, Y), V = 0, te = Y.length; V < te; V += 1)
      q.duplicates.push(W[Y[V]]);
    q.usedDuplicates = new Array(te);
  }
  function be(w, q, W) {
    var Y, V, te;
    if (w !== null && typeof w == "object")
      if (V = q.indexOf(w), V !== -1)
        W.indexOf(V) === -1 && W.push(V);
      else if (q.push(w), Array.isArray(w))
        for (V = 0, te = w.length; V < te; V += 1)
          be(w[V], q, W);
      else
        for (Y = Object.keys(w), V = 0, te = Y.length; V < te; V += 1)
          be(w[Y[V]], q, W);
  }
  function de(w, q) {
    q = q || {};
    var W = new De(q);
    W.noRefs || Ee(w, W);
    var Y = w;
    return W.replacer && (Y = W.replacer.call({ "": Y }, "", Y)), oe(W, 0, Y, !0, !0) ? W.dump + `
` : "";
  }
  return Un.dump = de, Un;
}
var ba;
function Gn() {
  if (ba) return qe;
  ba = 1;
  var t = El(), m = bl();
  function y(v, f) {
    return function() {
      throw new Error("Function yaml." + v + " is removed in js-yaml 4. Use yaml." + f + " instead, which is now safe by default.");
    };
  }
  return qe.Type = Be(), qe.Schema = vo(), qe.FAILSAFE_SCHEMA = bo(), qe.JSON_SCHEMA = Do(), qe.CORE_SCHEMA = Co(), qe.DEFAULT_SCHEMA = jn(), qe.load = t.load, qe.loadAll = t.loadAll, qe.dump = m.dump, qe.YAMLException = cr(), qe.types = {
    binary: No(),
    float: Po(),
    map: Eo(),
    null: Ao(),
    pairs: xo(),
    set: Uo(),
    timestamp: Ro(),
    bool: To(),
    int: So(),
    merge: Oo(),
    omap: Io(),
    seq: wo(),
    str: _o()
  }, qe.safeLoad = y("safeLoad", "load"), qe.safeLoadAll = y("safeLoadAll", "loadAll"), qe.safeDump = y("safeDump", "dump"), qe;
}
var Bt = {}, Aa;
function Al() {
  if (Aa) return Bt;
  Aa = 1, Object.defineProperty(Bt, "__esModule", { value: !0 }), Bt.Lazy = void 0;
  class t {
    constructor(y) {
      this._value = null, this.creator = y;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const y = this.creator();
      return this.value = y, y;
    }
    set value(y) {
      this._value = y, this.creator = null;
    }
  }
  return Bt.Lazy = t, Bt;
}
var Rt = {}, or = { exports: {} };
or.exports;
var Ta;
function Tl() {
  return Ta || (Ta = 1, (function(t, m) {
    var y = 200, v = "__lodash_hash_undefined__", f = 1, a = 2, r = 9007199254740991, o = "[object Arguments]", s = "[object Array]", l = "[object AsyncFunction]", u = "[object Boolean]", i = "[object Date]", n = "[object Error]", p = "[object Function]", g = "[object GeneratorFunction]", A = "[object Map]", c = "[object Number]", E = "[object Null]", T = "[object Object]", C = "[object Promise]", O = "[object Proxy]", D = "[object RegExp]", N = "[object Set]", P = "[object String]", S = "[object Symbol]", h = "[object Undefined]", F = "[object WeakMap]", U = "[object ArrayBuffer]", I = "[object DataView]", k = "[object Float32Array]", $ = "[object Float64Array]", H = "[object Int8Array]", ee = "[object Int16Array]", L = "[object Int32Array]", ie = "[object Uint8Array]", le = "[object Uint8ClampedArray]", pe = "[object Uint16Array]", De = "[object Uint32Array]", _e = /[\\^$.*+?()[\]{}|]/g, Fe = /^\[object .+?Constructor\]$/, Ae = /^(?:0|[1-9]\d*)$/, Q = {};
    Q[k] = Q[$] = Q[H] = Q[ee] = Q[L] = Q[ie] = Q[le] = Q[pe] = Q[De] = !0, Q[o] = Q[s] = Q[U] = Q[u] = Q[I] = Q[i] = Q[n] = Q[p] = Q[A] = Q[c] = Q[T] = Q[D] = Q[N] = Q[P] = Q[F] = !1;
    var me = typeof Je == "object" && Je && Je.Object === Object && Je, _ = typeof self == "object" && self && self.Object === Object && self, d = me || _ || Function("return this")(), B = m && !m.nodeType && m, R = B && !0 && t && !t.nodeType && t, se = R && R.exports === B, ce = se && me.process, fe = (function() {
      try {
        return ce && ce.binding && ce.binding("util");
      } catch {
      }
    })(), ye = fe && fe.isTypedArray;
    function he(b, x) {
      for (var z = -1, ae = b == null ? 0 : b.length, Pe = 0, ve = []; ++z < ae; ) {
        var Ne = b[z];
        x(Ne, z, b) && (ve[Pe++] = Ne);
      }
      return ve;
    }
    function $e(b, x) {
      for (var z = -1, ae = x.length, Pe = b.length; ++z < ae; )
        b[Pe + z] = x[z];
      return b;
    }
    function we(b, x) {
      for (var z = -1, ae = b == null ? 0 : b.length; ++z < ae; )
        if (x(b[z], z, b))
          return !0;
      return !1;
    }
    function Me(b, x) {
      for (var z = -1, ae = Array(b); ++z < b; )
        ae[z] = x(z);
      return ae;
    }
    function nt(b) {
      return function(x) {
        return b(x);
      };
    }
    function Ze(b, x) {
      return b.has(x);
    }
    function Xe(b, x) {
      return b == null ? void 0 : b[x];
    }
    function e(b) {
      var x = -1, z = Array(b.size);
      return b.forEach(function(ae, Pe) {
        z[++x] = [Pe, ae];
      }), z;
    }
    function M(b, x) {
      return function(z) {
        return b(x(z));
      };
    }
    function j(b) {
      var x = -1, z = Array(b.size);
      return b.forEach(function(ae) {
        z[++x] = ae;
      }), z;
    }
    var Z = Array.prototype, G = Function.prototype, X = Object.prototype, K = d["__core-js_shared__"], re = G.toString, oe = X.hasOwnProperty, Ee = (function() {
      var b = /[^.]+$/.exec(K && K.keys && K.keys.IE_PROTO || "");
      return b ? "Symbol(src)_1." + b : "";
    })(), be = X.toString, de = RegExp(
      "^" + re.call(oe).replace(_e, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), w = se ? d.Buffer : void 0, q = d.Symbol, W = d.Uint8Array, Y = X.propertyIsEnumerable, V = Z.splice, te = q ? q.toStringTag : void 0, J = Object.getOwnPropertySymbols, ne = w ? w.isBuffer : void 0, ue = M(Object.keys, Object), ge = Pt(d, "DataView"), Se = Pt(d, "Map"), Oe = Pt(d, "Promise"), Te = Pt(d, "Set"), St = Pt(d, "WeakMap"), ze = Pt(Object, "create"), dt = mt(ge), Wo = mt(Se), Yo = mt(Oe), Vo = mt(Te), zo = mt(St), zn = q ? q.prototype : void 0, Or = zn ? zn.valueOf : void 0;
    function ht(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++x < z; ) {
        var ae = b[x];
        this.set(ae[0], ae[1]);
      }
    }
    function Ko() {
      this.__data__ = ze ? ze(null) : {}, this.size = 0;
    }
    function Jo(b) {
      var x = this.has(b) && delete this.__data__[b];
      return this.size -= x ? 1 : 0, x;
    }
    function Xo(b) {
      var x = this.__data__;
      if (ze) {
        var z = x[b];
        return z === v ? void 0 : z;
      }
      return oe.call(x, b) ? x[b] : void 0;
    }
    function Qo(b) {
      var x = this.__data__;
      return ze ? x[b] !== void 0 : oe.call(x, b);
    }
    function Zo(b, x) {
      var z = this.__data__;
      return this.size += this.has(b) ? 0 : 1, z[b] = ze && x === void 0 ? v : x, this;
    }
    ht.prototype.clear = Ko, ht.prototype.delete = Jo, ht.prototype.get = Xo, ht.prototype.has = Qo, ht.prototype.set = Zo;
    function et(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++x < z; ) {
        var ae = b[x];
        this.set(ae[0], ae[1]);
      }
    }
    function es() {
      this.__data__ = [], this.size = 0;
    }
    function ts(b) {
      var x = this.__data__, z = dr(x, b);
      if (z < 0)
        return !1;
      var ae = x.length - 1;
      return z == ae ? x.pop() : V.call(x, z, 1), --this.size, !0;
    }
    function rs(b) {
      var x = this.__data__, z = dr(x, b);
      return z < 0 ? void 0 : x[z][1];
    }
    function ns(b) {
      return dr(this.__data__, b) > -1;
    }
    function is(b, x) {
      var z = this.__data__, ae = dr(z, b);
      return ae < 0 ? (++this.size, z.push([b, x])) : z[ae][1] = x, this;
    }
    et.prototype.clear = es, et.prototype.delete = ts, et.prototype.get = rs, et.prototype.has = ns, et.prototype.set = is;
    function pt(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++x < z; ) {
        var ae = b[x];
        this.set(ae[0], ae[1]);
      }
    }
    function as() {
      this.size = 0, this.__data__ = {
        hash: new ht(),
        map: new (Se || et)(),
        string: new ht()
      };
    }
    function os(b) {
      var x = hr(this, b).delete(b);
      return this.size -= x ? 1 : 0, x;
    }
    function ss(b) {
      return hr(this, b).get(b);
    }
    function ls(b) {
      return hr(this, b).has(b);
    }
    function us(b, x) {
      var z = hr(this, b), ae = z.size;
      return z.set(b, x), this.size += z.size == ae ? 0 : 1, this;
    }
    pt.prototype.clear = as, pt.prototype.delete = os, pt.prototype.get = ss, pt.prototype.has = ls, pt.prototype.set = us;
    function fr(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.__data__ = new pt(); ++x < z; )
        this.add(b[x]);
    }
    function cs(b) {
      return this.__data__.set(b, v), this;
    }
    function fs(b) {
      return this.__data__.has(b);
    }
    fr.prototype.add = fr.prototype.push = cs, fr.prototype.has = fs;
    function it(b) {
      var x = this.__data__ = new et(b);
      this.size = x.size;
    }
    function ds() {
      this.__data__ = new et(), this.size = 0;
    }
    function hs(b) {
      var x = this.__data__, z = x.delete(b);
      return this.size = x.size, z;
    }
    function ps(b) {
      return this.__data__.get(b);
    }
    function ms(b) {
      return this.__data__.has(b);
    }
    function gs(b, x) {
      var z = this.__data__;
      if (z instanceof et) {
        var ae = z.__data__;
        if (!Se || ae.length < y - 1)
          return ae.push([b, x]), this.size = ++z.size, this;
        z = this.__data__ = new pt(ae);
      }
      return z.set(b, x), this.size = z.size, this;
    }
    it.prototype.clear = ds, it.prototype.delete = hs, it.prototype.get = ps, it.prototype.has = ms, it.prototype.set = gs;
    function ys(b, x) {
      var z = pr(b), ae = !z && Is(b), Pe = !z && !ae && Nr(b), ve = !z && !ae && !Pe && ni(b), Ne = z || ae || Pe || ve, Ie = Ne ? Me(b.length, String) : [], Ue = Ie.length;
      for (var Ce in b)
        oe.call(b, Ce) && !(Ne && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ce == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Pe && (Ce == "offset" || Ce == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        ve && (Ce == "buffer" || Ce == "byteLength" || Ce == "byteOffset") || // Skip index properties.
        Ds(Ce, Ue))) && Ie.push(Ce);
      return Ie;
    }
    function dr(b, x) {
      for (var z = b.length; z--; )
        if (Zn(b[z][0], x))
          return z;
      return -1;
    }
    function vs(b, x, z) {
      var ae = x(b);
      return pr(b) ? ae : $e(ae, z(b));
    }
    function Ft(b) {
      return b == null ? b === void 0 ? h : E : te && te in Object(b) ? Ss(b) : Ns(b);
    }
    function Kn(b) {
      return kt(b) && Ft(b) == o;
    }
    function Jn(b, x, z, ae, Pe) {
      return b === x ? !0 : b == null || x == null || !kt(b) && !kt(x) ? b !== b && x !== x : _s(b, x, z, ae, Jn, Pe);
    }
    function _s(b, x, z, ae, Pe, ve) {
      var Ne = pr(b), Ie = pr(x), Ue = Ne ? s : at(b), Ce = Ie ? s : at(x);
      Ue = Ue == o ? T : Ue, Ce = Ce == o ? T : Ce;
      var je = Ue == T, Ke = Ce == T, ke = Ue == Ce;
      if (ke && Nr(b)) {
        if (!Nr(x))
          return !1;
        Ne = !0, je = !1;
      }
      if (ke && !je)
        return ve || (ve = new it()), Ne || ni(b) ? Xn(b, x, z, ae, Pe, ve) : As(b, x, Ue, z, ae, Pe, ve);
      if (!(z & f)) {
        var Ye = je && oe.call(b, "__wrapped__"), Ve = Ke && oe.call(x, "__wrapped__");
        if (Ye || Ve) {
          var ot = Ye ? b.value() : b, tt = Ve ? x.value() : x;
          return ve || (ve = new it()), Pe(ot, tt, z, ae, ve);
        }
      }
      return ke ? (ve || (ve = new it()), Ts(b, x, z, ae, Pe, ve)) : !1;
    }
    function ws(b) {
      if (!ri(b) || Rs(b))
        return !1;
      var x = ei(b) ? de : Fe;
      return x.test(mt(b));
    }
    function Es(b) {
      return kt(b) && ti(b.length) && !!Q[Ft(b)];
    }
    function bs(b) {
      if (!Os(b))
        return ue(b);
      var x = [];
      for (var z in Object(b))
        oe.call(b, z) && z != "constructor" && x.push(z);
      return x;
    }
    function Xn(b, x, z, ae, Pe, ve) {
      var Ne = z & f, Ie = b.length, Ue = x.length;
      if (Ie != Ue && !(Ne && Ue > Ie))
        return !1;
      var Ce = ve.get(b);
      if (Ce && ve.get(x))
        return Ce == x;
      var je = -1, Ke = !0, ke = z & a ? new fr() : void 0;
      for (ve.set(b, x), ve.set(x, b); ++je < Ie; ) {
        var Ye = b[je], Ve = x[je];
        if (ae)
          var ot = Ne ? ae(Ve, Ye, je, x, b, ve) : ae(Ye, Ve, je, b, x, ve);
        if (ot !== void 0) {
          if (ot)
            continue;
          Ke = !1;
          break;
        }
        if (ke) {
          if (!we(x, function(tt, gt) {
            if (!Ze(ke, gt) && (Ye === tt || Pe(Ye, tt, z, ae, ve)))
              return ke.push(gt);
          })) {
            Ke = !1;
            break;
          }
        } else if (!(Ye === Ve || Pe(Ye, Ve, z, ae, ve))) {
          Ke = !1;
          break;
        }
      }
      return ve.delete(b), ve.delete(x), Ke;
    }
    function As(b, x, z, ae, Pe, ve, Ne) {
      switch (z) {
        case I:
          if (b.byteLength != x.byteLength || b.byteOffset != x.byteOffset)
            return !1;
          b = b.buffer, x = x.buffer;
        case U:
          return !(b.byteLength != x.byteLength || !ve(new W(b), new W(x)));
        case u:
        case i:
        case c:
          return Zn(+b, +x);
        case n:
          return b.name == x.name && b.message == x.message;
        case D:
        case P:
          return b == x + "";
        case A:
          var Ie = e;
        case N:
          var Ue = ae & f;
          if (Ie || (Ie = j), b.size != x.size && !Ue)
            return !1;
          var Ce = Ne.get(b);
          if (Ce)
            return Ce == x;
          ae |= a, Ne.set(b, x);
          var je = Xn(Ie(b), Ie(x), ae, Pe, ve, Ne);
          return Ne.delete(b), je;
        case S:
          if (Or)
            return Or.call(b) == Or.call(x);
      }
      return !1;
    }
    function Ts(b, x, z, ae, Pe, ve) {
      var Ne = z & f, Ie = Qn(b), Ue = Ie.length, Ce = Qn(x), je = Ce.length;
      if (Ue != je && !Ne)
        return !1;
      for (var Ke = Ue; Ke--; ) {
        var ke = Ie[Ke];
        if (!(Ne ? ke in x : oe.call(x, ke)))
          return !1;
      }
      var Ye = ve.get(b);
      if (Ye && ve.get(x))
        return Ye == x;
      var Ve = !0;
      ve.set(b, x), ve.set(x, b);
      for (var ot = Ne; ++Ke < Ue; ) {
        ke = Ie[Ke];
        var tt = b[ke], gt = x[ke];
        if (ae)
          var ii = Ne ? ae(gt, tt, ke, x, b, ve) : ae(tt, gt, ke, b, x, ve);
        if (!(ii === void 0 ? tt === gt || Pe(tt, gt, z, ae, ve) : ii)) {
          Ve = !1;
          break;
        }
        ot || (ot = ke == "constructor");
      }
      if (Ve && !ot) {
        var mr = b.constructor, gr = x.constructor;
        mr != gr && "constructor" in b && "constructor" in x && !(typeof mr == "function" && mr instanceof mr && typeof gr == "function" && gr instanceof gr) && (Ve = !1);
      }
      return ve.delete(b), ve.delete(x), Ve;
    }
    function Qn(b) {
      return vs(b, Fs, Ps);
    }
    function hr(b, x) {
      var z = b.__data__;
      return Cs(x) ? z[typeof x == "string" ? "string" : "hash"] : z.map;
    }
    function Pt(b, x) {
      var z = Xe(b, x);
      return ws(z) ? z : void 0;
    }
    function Ss(b) {
      var x = oe.call(b, te), z = b[te];
      try {
        b[te] = void 0;
        var ae = !0;
      } catch {
      }
      var Pe = be.call(b);
      return ae && (x ? b[te] = z : delete b[te]), Pe;
    }
    var Ps = J ? function(b) {
      return b == null ? [] : (b = Object(b), he(J(b), function(x) {
        return Y.call(b, x);
      }));
    } : ks, at = Ft;
    (ge && at(new ge(new ArrayBuffer(1))) != I || Se && at(new Se()) != A || Oe && at(Oe.resolve()) != C || Te && at(new Te()) != N || St && at(new St()) != F) && (at = function(b) {
      var x = Ft(b), z = x == T ? b.constructor : void 0, ae = z ? mt(z) : "";
      if (ae)
        switch (ae) {
          case dt:
            return I;
          case Wo:
            return A;
          case Yo:
            return C;
          case Vo:
            return N;
          case zo:
            return F;
        }
      return x;
    });
    function Ds(b, x) {
      return x = x ?? r, !!x && (typeof b == "number" || Ae.test(b)) && b > -1 && b % 1 == 0 && b < x;
    }
    function Cs(b) {
      var x = typeof b;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? b !== "__proto__" : b === null;
    }
    function Rs(b) {
      return !!Ee && Ee in b;
    }
    function Os(b) {
      var x = b && b.constructor, z = typeof x == "function" && x.prototype || X;
      return b === z;
    }
    function Ns(b) {
      return be.call(b);
    }
    function mt(b) {
      if (b != null) {
        try {
          return re.call(b);
        } catch {
        }
        try {
          return b + "";
        } catch {
        }
      }
      return "";
    }
    function Zn(b, x) {
      return b === x || b !== b && x !== x;
    }
    var Is = Kn(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Kn : function(b) {
      return kt(b) && oe.call(b, "callee") && !Y.call(b, "callee");
    }, pr = Array.isArray;
    function xs(b) {
      return b != null && ti(b.length) && !ei(b);
    }
    var Nr = ne || Ls;
    function Us(b, x) {
      return Jn(b, x);
    }
    function ei(b) {
      if (!ri(b))
        return !1;
      var x = Ft(b);
      return x == p || x == g || x == l || x == O;
    }
    function ti(b) {
      return typeof b == "number" && b > -1 && b % 1 == 0 && b <= r;
    }
    function ri(b) {
      var x = typeof b;
      return b != null && (x == "object" || x == "function");
    }
    function kt(b) {
      return b != null && typeof b == "object";
    }
    var ni = ye ? nt(ye) : Es;
    function Fs(b) {
      return xs(b) ? ys(b) : bs(b);
    }
    function ks() {
      return [];
    }
    function Ls() {
      return !1;
    }
    t.exports = Us;
  })(or, or.exports)), or.exports;
}
var Sa;
function Sl() {
  if (Sa) return Rt;
  Sa = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.DownloadedUpdateHelper = void 0, Rt.createTempUpdateFile = o;
  const t = lr, m = ut, y = Tl(), v = /* @__PURE__ */ ft(), f = Re;
  let a = class {
    constructor(l) {
      this.cacheDir = l, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
    }
    get downloadedFileInfo() {
      return this._downloadedFileInfo;
    }
    get file() {
      return this._file;
    }
    get packageFile() {
      return this._packageFile;
    }
    get cacheDirForPendingUpdate() {
      return f.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(l, u, i, n) {
      if (this.versionInfo != null && this.file === l && this.fileInfo != null)
        return y(this.versionInfo, u) && y(this.fileInfo.info, i.info) && await (0, v.pathExists)(l) ? l : null;
      const p = await this.getValidCachedUpdateFile(i, n);
      return p === null ? null : (n.info(`Update has already been downloaded to ${l}).`), this._file = p, p);
    }
    async setDownloadedFile(l, u, i, n, p, g) {
      this._file = l, this._packageFile = u, this.versionInfo = i, this.fileInfo = n, this._downloadedFileInfo = {
        fileName: p,
        sha512: n.info.sha512,
        isAdminRightsRequired: n.info.isAdminRightsRequired === !0
      }, g && await (0, v.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, v.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(l, u) {
      const i = this.getUpdateInfoFile();
      if (!await (0, v.pathExists)(i))
        return null;
      let p;
      try {
        p = await (0, v.readJson)(i);
      } catch (E) {
        let T = "No cached update info available";
        return E.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), T += ` (error on read: ${E.message})`), u.info(T), null;
      }
      if (!((p == null ? void 0 : p.fileName) !== null))
        return u.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (l.info.sha512 !== p.sha512)
        return u.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p.sha512}, expected: ${l.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const A = f.join(this.cacheDirForPendingUpdate, p.fileName);
      if (!await (0, v.pathExists)(A))
        return u.info("Cached update file doesn't exist"), null;
      const c = await r(A);
      return l.info.sha512 !== c ? (u.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${l.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = p, A);
    }
    getUpdateInfoFile() {
      return f.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  Rt.DownloadedUpdateHelper = a;
  function r(s, l = "sha512", u = "base64", i) {
    return new Promise((n, p) => {
      const g = (0, t.createHash)(l);
      g.on("error", p).setEncoding(u), (0, m.createReadStream)(s, {
        ...i,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", p).on("end", () => {
        g.end(), n(g.read());
      }).pipe(g, { end: !1 });
    });
  }
  async function o(s, l, u) {
    let i = 0, n = f.join(l, s);
    for (let p = 0; p < 3; p++)
      try {
        return await (0, v.unlink)(n), n;
      } catch (g) {
        if (g.code === "ENOENT")
          return n;
        u.warn(`Error on remove temp update file: ${g}`), n = f.join(l, `${i++}-${s}`);
      }
    return n;
  }
  return Rt;
}
var $t = {}, Tr = {}, Pa;
function Pl() {
  if (Pa) return Tr;
  Pa = 1, Object.defineProperty(Tr, "__esModule", { value: !0 }), Tr.getAppCacheDir = y;
  const t = Re, m = qn;
  function y() {
    const v = (0, m.homedir)();
    let f;
    return process.platform === "win32" ? f = process.env.LOCALAPPDATA || t.join(v, "AppData", "Local") : process.platform === "darwin" ? f = t.join(v, "Library", "Caches") : f = process.env.XDG_CACHE_HOME || t.join(v, ".cache"), f;
  }
  return Tr;
}
var Da;
function Dl() {
  if (Da) return $t;
  Da = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.ElectronAppAdapter = void 0;
  const t = Re, m = Pl();
  let y = class {
    constructor(f = Et.app) {
      this.app = f;
    }
    whenReady() {
      return this.app.whenReady();
    }
    get version() {
      return this.app.getVersion();
    }
    get name() {
      return this.app.getName();
    }
    get isPackaged() {
      return this.app.isPackaged === !0;
    }
    get appUpdateConfigPath() {
      return this.isPackaged ? t.join(process.resourcesPath, "app-update.yml") : t.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, m.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(f) {
      this.app.once("quit", (a, r) => f(r));
    }
  };
  return $t.ElectronAppAdapter = y, $t;
}
var Fn = {}, Ca;
function Cl() {
  return Ca || (Ca = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.ElectronHttpExecutor = t.NET_SESSION_NAME = void 0, t.getNetSession = y;
    const m = xe();
    t.NET_SESSION_NAME = "electron-updater";
    function y() {
      return Et.session.fromPartition(t.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class v extends m.HttpExecutor {
      constructor(a) {
        super(), this.proxyLoginCallback = a, this.cachedSession = null;
      }
      async download(a, r, o) {
        return await o.cancellationToken.createPromise((s, l, u) => {
          const i = {
            headers: o.headers || void 0,
            redirect: "manual"
          };
          (0, m.configureRequestUrl)(a, i), (0, m.configureRequestOptions)(i), this.doDownload(i, {
            destination: r,
            options: o,
            onCancel: u,
            callback: (n) => {
              n == null ? s(r) : l(n);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(a, r) {
        a.headers && a.headers.Host && (a.host = a.headers.Host, delete a.headers.Host), this.cachedSession == null && (this.cachedSession = y());
        const o = Et.net.request({
          ...a,
          session: this.cachedSession
        });
        return o.on("response", r), this.proxyLoginCallback != null && o.on("login", this.proxyLoginCallback), o;
      }
      addRedirectHandlers(a, r, o, s, l) {
        a.on("redirect", (u, i, n) => {
          a.abort(), s > this.maxRedirects ? o(this.createMaxRedirectError()) : l(m.HttpExecutor.prepareRedirectUrlOptions(n, r));
        });
      }
    }
    t.ElectronHttpExecutor = v;
  })(Fn)), Fn;
}
var Ht = {}, Ot = {}, Ra;
function At() {
  if (Ra) return Ot;
  Ra = 1, Object.defineProperty(Ot, "__esModule", { value: !0 }), Ot.newBaseUrl = m, Ot.newUrlFromBase = y, Ot.getChannelFilename = v;
  const t = ct;
  function m(f) {
    const a = new t.URL(f);
    return a.pathname.endsWith("/") || (a.pathname += "/"), a;
  }
  function y(f, a, r = !1) {
    const o = new t.URL(f, a), s = a.search;
    return s != null && s.length !== 0 ? o.search = s : r && (o.search = `noCache=${Date.now().toString(32)}`), o;
  }
  function v(f) {
    return `${f}.yml`;
  }
  return Ot;
}
var rt = {}, kn, Oa;
function Fo() {
  if (Oa) return kn;
  Oa = 1;
  var t = "[object Symbol]", m = /[\\^$.*+?()[\]{}|]/g, y = RegExp(m.source), v = typeof Je == "object" && Je && Je.Object === Object && Je, f = typeof self == "object" && self && self.Object === Object && self, a = v || f || Function("return this")(), r = Object.prototype, o = r.toString, s = a.Symbol, l = s ? s.prototype : void 0, u = l ? l.toString : void 0;
  function i(c) {
    if (typeof c == "string")
      return c;
    if (p(c))
      return u ? u.call(c) : "";
    var E = c + "";
    return E == "0" && 1 / c == -1 / 0 ? "-0" : E;
  }
  function n(c) {
    return !!c && typeof c == "object";
  }
  function p(c) {
    return typeof c == "symbol" || n(c) && o.call(c) == t;
  }
  function g(c) {
    return c == null ? "" : i(c);
  }
  function A(c) {
    return c = g(c), c && y.test(c) ? c.replace(m, "\\$&") : c;
  }
  return kn = A, kn;
}
var Na;
function We() {
  if (Na) return rt;
  Na = 1, Object.defineProperty(rt, "__esModule", { value: !0 }), rt.Provider = void 0, rt.findFile = r, rt.parseUpdateInfo = o, rt.getFileList = s, rt.resolveFiles = l;
  const t = xe(), m = Gn(), y = ct, v = At(), f = Fo();
  let a = class {
    constructor(i) {
      this.runtimeOptions = i, this.requestHeaders = null, this.executor = i.executor;
    }
    // By default, the blockmap file is in the same directory as the main file
    // But some providers may have a different blockmap file, so we need to override this method
    getBlockMapFiles(i, n, p, g = null) {
      const A = (0, v.newUrlFromBase)(`${i.pathname}.blockmap`, i);
      return [(0, v.newUrlFromBase)(`${i.pathname.replace(new RegExp(f(p), "g"), n)}.blockmap`, g ? new y.URL(g) : i), A];
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const i = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (i === "x64" ? "" : `-${i}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(i) {
      return `${i}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(i) {
      this.requestHeaders = i;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(i, n, p) {
      return this.executor.request(this.createRequestOptions(i, n), p);
    }
    createRequestOptions(i, n) {
      const p = {};
      return this.requestHeaders == null ? n != null && (p.headers = n) : p.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, t.configureRequestUrl)(i, p), p;
    }
  };
  rt.Provider = a;
  function r(u, i, n) {
    var p;
    if (u.length === 0)
      throw (0, t.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const g = u.filter((c) => c.url.pathname.toLowerCase().endsWith(`.${i.toLowerCase()}`)), A = (p = g.find((c) => [c.url.pathname, c.info.url].some((E) => E.includes(process.arch)))) !== null && p !== void 0 ? p : g.shift();
    return A || (n == null ? u[0] : u.find((c) => !n.some((E) => c.url.pathname.toLowerCase().endsWith(`.${E.toLowerCase()}`))));
  }
  function o(u, i, n) {
    if (u == null)
      throw (0, t.newError)(`Cannot parse update info from ${i} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let p;
    try {
      p = (0, m.load)(u);
    } catch (g) {
      throw (0, t.newError)(`Cannot parse update info from ${i} in the latest release artifacts (${n}): ${g.stack || g.message}, rawData: ${u}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return p;
  }
  function s(u) {
    const i = u.files;
    if (i != null && i.length > 0)
      return i;
    if (u.path != null)
      return [
        {
          url: u.path,
          sha2: u.sha2,
          sha512: u.sha512
        }
      ];
    throw (0, t.newError)(`No files provided: ${(0, t.safeStringifyJson)(u)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function l(u, i, n = (p) => p) {
    const g = s(u).map((E) => {
      if (E.sha2 == null && E.sha512 == null)
        throw (0, t.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, t.safeStringifyJson)(E)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, v.newUrlFromBase)(n(E.url), i),
        info: E
      };
    }), A = u.packages, c = A == null ? null : A[process.arch] || A.ia32;
    return c != null && (g[0].packageInfo = {
      ...c,
      path: (0, v.newUrlFromBase)(n(c.path), i).href
    }), g;
  }
  return rt;
}
var Ia;
function ko() {
  if (Ia) return Ht;
  Ia = 1, Object.defineProperty(Ht, "__esModule", { value: !0 }), Ht.GenericProvider = void 0;
  const t = xe(), m = At(), y = We();
  let v = class extends y.Provider {
    constructor(a, r, o) {
      super(o), this.configuration = a, this.updater = r, this.baseUrl = (0, m.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const a = this.updater.channel || this.configuration.channel;
      return a == null ? this.getDefaultChannelName() : this.getCustomChannelName(a);
    }
    async getLatestVersion() {
      const a = (0, m.getChannelFilename)(this.channel), r = (0, m.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let o = 0; ; o++)
        try {
          return (0, y.parseUpdateInfo)(await this.httpRequest(r), a, r);
        } catch (s) {
          if (s instanceof t.HttpError && s.statusCode === 404)
            throw (0, t.newError)(`Cannot find channel "${a}" update info: ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (s.code === "ECONNREFUSED" && o < 3) {
            await new Promise((l, u) => {
              try {
                setTimeout(l, 1e3 * o);
              } catch (i) {
                u(i);
              }
            });
            continue;
          }
          throw s;
        }
    }
    resolveFiles(a) {
      return (0, y.resolveFiles)(a, this.baseUrl);
    }
  };
  return Ht.GenericProvider = v, Ht;
}
var jt = {}, Gt = {}, xa;
function Rl() {
  if (xa) return Gt;
  xa = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.BitbucketProvider = void 0;
  const t = xe(), m = At(), y = We();
  let v = class extends y.Provider {
    constructor(a, r, o) {
      super({
        ...o,
        isUseMultipleRangeRequest: !1
      }), this.configuration = a, this.updater = r;
      const { owner: s, slug: l } = a;
      this.baseUrl = (0, m.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${s}/${l}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const a = new t.CancellationToken(), r = (0, m.getChannelFilename)(this.getCustomChannelName(this.channel)), o = (0, m.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const s = await this.httpRequest(o, void 0, a);
        return (0, y.parseUpdateInfo)(s, r, o);
      } catch (s) {
        throw (0, t.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${s.stack || s.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(a) {
      return (0, y.resolveFiles)(a, this.baseUrl);
    }
    toString() {
      const { owner: a, slug: r } = this.configuration;
      return `Bitbucket (owner: ${a}, slug: ${r}, channel: ${this.channel})`;
    }
  };
  return Gt.BitbucketProvider = v, Gt;
}
var lt = {}, Ua;
function Lo() {
  if (Ua) return lt;
  Ua = 1, Object.defineProperty(lt, "__esModule", { value: !0 }), lt.GitHubProvider = lt.BaseGitHubProvider = void 0, lt.computeReleaseNotes = l;
  const t = xe(), m = po(), y = ct, v = At(), f = We(), a = /\/tag\/([^/]+)$/;
  class r extends f.Provider {
    constructor(i, n, p) {
      super({
        ...p,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = i, this.baseUrl = (0, v.newBaseUrl)((0, t.githubUrl)(i, n));
      const g = n === "github.com" ? "api.github.com" : n;
      this.baseApiUrl = (0, v.newBaseUrl)((0, t.githubUrl)(i, g));
    }
    computeGithubBasePath(i) {
      const n = this.options.host;
      return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${i}` : i;
    }
  }
  lt.BaseGitHubProvider = r;
  let o = class extends r {
    constructor(i, n, p) {
      super(i, "github.com", p), this.options = i, this.updater = n;
    }
    get channel() {
      const i = this.updater.channel || this.options.channel;
      return i == null ? this.getDefaultChannelName() : this.getCustomChannelName(i);
    }
    async getLatestVersion() {
      var i, n, p, g, A;
      const c = new t.CancellationToken(), E = await this.httpRequest((0, v.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, c), T = (0, t.parseXml)(E);
      let C = T.element("entry", !1, "No published versions on GitHub"), O = null;
      try {
        if (this.updater.allowPrerelease) {
          const F = ((i = this.updater) === null || i === void 0 ? void 0 : i.channel) || ((n = m.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
          if (F === null)
            O = a.exec(C.element("link").attribute("href"))[1];
          else
            for (const U of T.getElements("entry")) {
              const I = a.exec(U.element("link").attribute("href"));
              if (I === null)
                continue;
              const k = I[1], $ = ((p = m.prerelease(k)) === null || p === void 0 ? void 0 : p[0]) || null, H = !F || ["alpha", "beta"].includes(F), ee = $ !== null && !["alpha", "beta"].includes(String($));
              if (H && !ee && !(F === "beta" && $ === "alpha")) {
                O = k;
                break;
              }
              if ($ && $ === F) {
                O = k;
                break;
              }
            }
        } else {
          O = await this.getLatestTagName(c);
          for (const F of T.getElements("entry"))
            if (a.exec(F.element("link").attribute("href"))[1] === O) {
              C = F;
              break;
            }
        }
      } catch (F) {
        throw (0, t.newError)(`Cannot parse releases feed: ${F.stack || F.message},
XML:
${E}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (O == null)
        throw (0, t.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let D, N = "", P = "";
      const S = async (F) => {
        N = (0, v.getChannelFilename)(F), P = (0, v.newUrlFromBase)(this.getBaseDownloadPath(String(O), N), this.baseUrl);
        const U = this.createRequestOptions(P);
        try {
          return await this.executor.request(U, c);
        } catch (I) {
          throw I instanceof t.HttpError && I.statusCode === 404 ? (0, t.newError)(`Cannot find ${N} in the latest release artifacts (${P}): ${I.stack || I.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : I;
        }
      };
      try {
        let F = this.channel;
        this.updater.allowPrerelease && (!((g = m.prerelease(O)) === null || g === void 0) && g[0]) && (F = this.getCustomChannelName(String((A = m.prerelease(O)) === null || A === void 0 ? void 0 : A[0]))), D = await S(F);
      } catch (F) {
        if (this.updater.allowPrerelease)
          D = await S(this.getDefaultChannelName());
        else
          throw F;
      }
      const h = (0, f.parseUpdateInfo)(D, N, P);
      return h.releaseName == null && (h.releaseName = C.elementValueOrEmpty("title")), h.releaseNotes == null && (h.releaseNotes = l(this.updater.currentVersion, this.updater.fullChangelog, T, C)), {
        tag: O,
        ...h
      };
    }
    async getLatestTagName(i) {
      const n = this.options, p = n.host == null || n.host === "github.com" ? (0, v.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new y.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const g = await this.httpRequest(p, { Accept: "application/json" }, i);
        return g == null ? null : JSON.parse(g).tag_name;
      } catch (g) {
        throw (0, t.newError)(`Unable to find latest version on GitHub (${p}), please ensure a production release exists: ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(i) {
      return (0, f.resolveFiles)(i, this.baseUrl, (n) => this.getBaseDownloadPath(i.tag, n.replace(/ /g, "-")));
    }
    getBaseDownloadPath(i, n) {
      return `${this.basePath}/download/${i}/${n}`;
    }
  };
  lt.GitHubProvider = o;
  function s(u) {
    const i = u.elementValueOrEmpty("content");
    return i === "No content." ? "" : i;
  }
  function l(u, i, n, p) {
    if (!i)
      return s(p);
    const g = [];
    for (const A of n.getElements("entry")) {
      const c = /\/tag\/v?([^/]+)$/.exec(A.element("link").attribute("href"))[1];
      m.lt(u, c) && g.push({
        version: c,
        note: s(A)
      });
    }
    return g.sort((A, c) => m.rcompare(A.version, c.version));
  }
  return lt;
}
var Wt = {}, Fa;
function Ol() {
  if (Fa) return Wt;
  Fa = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.GitLabProvider = void 0;
  const t = xe(), m = ct, y = Fo(), v = At(), f = We();
  let a = class extends f.Provider {
    /**
     * Normalizes filenames by replacing spaces and underscores with dashes.
     *
     * This is a workaround to handle filename formatting differences between tools:
     * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
     * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
     *
     * Because of this mismatch, we can't reliably extract the correct filename from
     * the asset path without normalization. This function ensures consistent matching
     * across different filename formats by converting all spaces and underscores to dashes.
     *
     * @param filename The filename to normalize
     * @returns The normalized filename with spaces and underscores replaced by dashes
     */
    normalizeFilename(o) {
      return o.replace(/ |_/g, "-");
    }
    constructor(o, s, l) {
      super({
        ...l,
        // GitLab might not support multiple range requests efficiently
        isUseMultipleRangeRequest: !1
      }), this.options = o, this.updater = s, this.cachedLatestVersion = null;
      const i = o.host || "gitlab.com";
      this.baseApiUrl = (0, v.newBaseUrl)(`https://${i}/api/v4`);
    }
    get channel() {
      const o = this.updater.channel || this.options.channel;
      return o == null ? this.getDefaultChannelName() : this.getCustomChannelName(o);
    }
    async getLatestVersion() {
      const o = new t.CancellationToken(), s = (0, v.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
      let l;
      try {
        const T = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, C = await this.httpRequest(s, T, o);
        if (!C)
          throw (0, t.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
        l = JSON.parse(C);
      } catch (T) {
        throw (0, t.newError)(`Unable to find latest release on GitLab (${s}): ${T.stack || T.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
      const u = l.tag_name;
      let i = null, n = "", p = null;
      const g = async (T) => {
        n = (0, v.getChannelFilename)(T);
        const C = l.assets.links.find((D) => D.name === n);
        if (!C)
          throw (0, t.newError)(`Cannot find ${n} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        p = new m.URL(C.direct_asset_url);
        const O = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
        try {
          const D = await this.httpRequest(p, O, o);
          if (!D)
            throw (0, t.newError)(`Empty response from ${p}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          return D;
        } catch (D) {
          throw D instanceof t.HttpError && D.statusCode === 404 ? (0, t.newError)(`Cannot find ${n} in the latest release artifacts (${p}): ${D.stack || D.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : D;
        }
      };
      try {
        i = await g(this.channel);
      } catch (T) {
        if (this.channel !== this.getDefaultChannelName())
          i = await g(this.getDefaultChannelName());
        else
          throw T;
      }
      if (!i)
        throw (0, t.newError)(`Unable to parse channel data from ${n}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
      const A = (0, f.parseUpdateInfo)(i, n, p);
      A.releaseName == null && (A.releaseName = l.name), A.releaseNotes == null && (A.releaseNotes = l.description || null);
      const c = /* @__PURE__ */ new Map();
      for (const T of l.assets.links)
        c.set(this.normalizeFilename(T.name), T.direct_asset_url);
      const E = {
        tag: u,
        assets: c,
        ...A
      };
      return this.cachedLatestVersion = E, E;
    }
    /**
     * Utility function to convert GitlabReleaseAsset to Map<string, string>
     * Maps asset names to their download URLs
     */
    convertAssetsToMap(o) {
      const s = /* @__PURE__ */ new Map();
      for (const l of o.links)
        s.set(this.normalizeFilename(l.name), l.direct_asset_url);
      return s;
    }
    /**
     * Find blockmap file URL in assets map for a specific filename
     */
    findBlockMapInAssets(o, s) {
      const l = [`${s}.blockmap`, `${this.normalizeFilename(s)}.blockmap`];
      for (const u of l) {
        const i = o.get(u);
        if (i)
          return new m.URL(i);
      }
      return null;
    }
    async fetchReleaseInfoByVersion(o) {
      const s = new t.CancellationToken(), l = [`v${o}`, o];
      for (const u of l) {
        const i = (0, v.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(u)}`, this.baseApiUrl);
        try {
          const n = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, p = await this.httpRequest(i, n, s);
          if (p)
            return JSON.parse(p);
        } catch (n) {
          if (n instanceof t.HttpError && n.statusCode === 404)
            continue;
          throw (0, t.newError)(`Unable to find release ${u} on GitLab (${i}): ${n.stack || n.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
        }
      }
      throw (0, t.newError)(`Unable to find release with version ${o} (tried: ${l.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
    }
    setAuthHeaderForToken(o) {
      const s = {};
      return o != null && (o.startsWith("Bearer") ? s.authorization = o : s["PRIVATE-TOKEN"] = o), s;
    }
    /**
     * Get version info for blockmap files, using cache when possible
     */
    async getVersionInfoForBlockMap(o) {
      if (this.cachedLatestVersion && this.cachedLatestVersion.version === o)
        return this.cachedLatestVersion.assets;
      const s = await this.fetchReleaseInfoByVersion(o);
      return s && s.assets ? this.convertAssetsToMap(s.assets) : null;
    }
    /**
     * Find blockmap URLs from version assets
     */
    async findBlockMapUrlsFromAssets(o, s, l) {
      let u = null, i = null;
      const n = await this.getVersionInfoForBlockMap(s);
      n && (u = this.findBlockMapInAssets(n, l));
      const p = await this.getVersionInfoForBlockMap(o);
      if (p) {
        const g = l.replace(new RegExp(y(s), "g"), o);
        i = this.findBlockMapInAssets(p, g);
      }
      return [i, u];
    }
    async getBlockMapFiles(o, s, l, u = null) {
      if (this.options.uploadTarget === "project_upload") {
        const i = o.pathname.split("/").pop() || "", [n, p] = await this.findBlockMapUrlsFromAssets(s, l, i);
        if (!p)
          throw (0, t.newError)(`Cannot find blockmap file for ${l} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        if (!n)
          throw (0, t.newError)(`Cannot find blockmap file for ${s} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        return [n, p];
      } else
        return super.getBlockMapFiles(o, s, l, u);
    }
    resolveFiles(o) {
      return (0, f.getFileList)(o).map((s) => {
        const u = [
          s.url,
          // Original filename
          this.normalizeFilename(s.url)
          // Normalized filename (spaces/underscores → dashes)
        ].find((n) => o.assets.has(n)), i = u ? o.assets.get(u) : void 0;
        if (!i)
          throw (0, t.newError)(`Cannot find asset "${s.url}" in GitLab release assets. Available assets: ${Array.from(o.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new m.URL(i),
          info: s
        };
      });
    }
    toString() {
      return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
    }
  };
  return Wt.GitLabProvider = a, Wt;
}
var Yt = {}, ka;
function Nl() {
  if (ka) return Yt;
  ka = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.KeygenProvider = void 0;
  const t = xe(), m = At(), y = We();
  let v = class extends y.Provider {
    constructor(a, r, o) {
      super({
        ...o,
        isUseMultipleRangeRequest: !1
      }), this.configuration = a, this.updater = r, this.defaultHostname = "api.keygen.sh";
      const s = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, m.newBaseUrl)(`https://${s}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const a = new t.CancellationToken(), r = (0, m.getChannelFilename)(this.getCustomChannelName(this.channel)), o = (0, m.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const s = await this.httpRequest(o, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, a);
        return (0, y.parseUpdateInfo)(s, r, o);
      } catch (s) {
        throw (0, t.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${s.stack || s.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(a) {
      return (0, y.resolveFiles)(a, this.baseUrl);
    }
    toString() {
      const { account: a, product: r, platform: o } = this.configuration;
      return `Keygen (account: ${a}, product: ${r}, platform: ${o}, channel: ${this.channel})`;
    }
  };
  return Yt.KeygenProvider = v, Yt;
}
var Vt = {}, La;
function Il() {
  if (La) return Vt;
  La = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.PrivateGitHubProvider = void 0;
  const t = xe(), m = Gn(), y = Re, v = ct, f = At(), a = Lo(), r = We();
  let o = class extends a.BaseGitHubProvider {
    constructor(l, u, i, n) {
      super(l, "api.github.com", n), this.updater = u, this.token = i;
    }
    createRequestOptions(l, u) {
      const i = super.createRequestOptions(l, u);
      return i.redirect = "manual", i;
    }
    async getLatestVersion() {
      const l = new t.CancellationToken(), u = (0, f.getChannelFilename)(this.getDefaultChannelName()), i = await this.getLatestVersionInfo(l), n = i.assets.find((A) => A.name === u);
      if (n == null)
        throw (0, t.newError)(`Cannot find ${u} in the release ${i.html_url || i.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const p = new v.URL(n.url);
      let g;
      try {
        g = (0, m.load)(await this.httpRequest(p, this.configureHeaders("application/octet-stream"), l));
      } catch (A) {
        throw A instanceof t.HttpError && A.statusCode === 404 ? (0, t.newError)(`Cannot find ${u} in the latest release artifacts (${p}): ${A.stack || A.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : A;
      }
      return g.assets = i.assets, g;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(l) {
      return {
        accept: l,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(l) {
      const u = this.updater.allowPrerelease;
      let i = this.basePath;
      u || (i = `${i}/latest`);
      const n = (0, f.newUrlFromBase)(i, this.baseUrl);
      try {
        const p = JSON.parse(await this.httpRequest(n, this.configureHeaders("application/vnd.github.v3+json"), l));
        return u ? p.find((g) => g.prerelease) || p[0] : p;
      } catch (p) {
        throw (0, t.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${p.stack || p.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(l) {
      return (0, r.getFileList)(l).map((u) => {
        const i = y.posix.basename(u.url).replace(/ /g, "-"), n = l.assets.find((p) => p != null && p.name === i);
        if (n == null)
          throw (0, t.newError)(`Cannot find asset "${i}" in: ${JSON.stringify(l.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new v.URL(n.url),
          info: u
        };
      });
    }
  };
  return Vt.PrivateGitHubProvider = o, Vt;
}
var qa;
function xl() {
  if (qa) return jt;
  qa = 1, Object.defineProperty(jt, "__esModule", { value: !0 }), jt.isUrlProbablySupportMultiRangeRequests = o, jt.createClient = s;
  const t = xe(), m = Rl(), y = ko(), v = Lo(), f = Ol(), a = Nl(), r = Il();
  function o(l) {
    return !l.includes("s3.amazonaws.com");
  }
  function s(l, u, i) {
    if (typeof l == "string")
      throw (0, t.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const n = l.provider;
    switch (n) {
      case "github": {
        const p = l, g = (p.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || p.token;
        return g == null ? new v.GitHubProvider(p, u, i) : new r.PrivateGitHubProvider(p, u, g, i);
      }
      case "bitbucket":
        return new m.BitbucketProvider(l, u, i);
      case "gitlab":
        return new f.GitLabProvider(l, u, i);
      case "keygen":
        return new a.KeygenProvider(l, u, i);
      case "s3":
      case "spaces":
        return new y.GenericProvider({
          provider: "generic",
          url: (0, t.getS3LikeProviderBaseUrl)(l),
          channel: l.channel || null
        }, u, {
          ...i,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const p = l;
        return new y.GenericProvider(p, u, {
          ...i,
          isUseMultipleRangeRequest: p.useMultipleRangeRequest !== !1 && o(p.url)
        });
      }
      case "custom": {
        const p = l, g = p.updateProvider;
        if (!g)
          throw (0, t.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new g(p, u, i);
      }
      default:
        throw (0, t.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return jt;
}
var zt = {}, Kt = {}, Nt = {}, It = {}, Ma;
function Wn() {
  if (Ma) return It;
  Ma = 1, Object.defineProperty(It, "__esModule", { value: !0 }), It.OperationKind = void 0, It.computeOperations = m;
  var t;
  (function(r) {
    r[r.COPY = 0] = "COPY", r[r.DOWNLOAD = 1] = "DOWNLOAD";
  })(t || (It.OperationKind = t = {}));
  function m(r, o, s) {
    const l = a(r.files), u = a(o.files);
    let i = null;
    const n = o.files[0], p = [], g = n.name, A = l.get(g);
    if (A == null)
      throw new Error(`no file ${g} in old blockmap`);
    const c = u.get(g);
    let E = 0;
    const { checksumToOffset: T, checksumToOldSize: C } = f(l.get(g), A.offset, s);
    let O = n.offset;
    for (let D = 0; D < c.checksums.length; O += c.sizes[D], D++) {
      const N = c.sizes[D], P = c.checksums[D];
      let S = T.get(P);
      S != null && C.get(P) !== N && (s.warn(`Checksum ("${P}") matches, but size differs (old: ${C.get(P)}, new: ${N})`), S = void 0), S === void 0 ? (E++, i != null && i.kind === t.DOWNLOAD && i.end === O ? i.end += N : (i = {
        kind: t.DOWNLOAD,
        start: O,
        end: O + N
        // oldBlocks: null,
      }, v(i, p, P, D))) : i != null && i.kind === t.COPY && i.end === S ? i.end += N : (i = {
        kind: t.COPY,
        start: S,
        end: S + N
        // oldBlocks: [checksum]
      }, v(i, p, P, D));
    }
    return E > 0 && s.info(`File${n.name === "file" ? "" : " " + n.name} has ${E} changed blocks`), p;
  }
  const y = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function v(r, o, s, l) {
    if (y && o.length !== 0) {
      const u = o[o.length - 1];
      if (u.kind === r.kind && r.start < u.end && r.start > u.start) {
        const i = [u.start, u.end, r.start, r.end].reduce((n, p) => n < p ? n : p);
        throw new Error(`operation (block index: ${l}, checksum: ${s}, kind: ${t[r.kind]}) overlaps previous operation (checksum: ${s}):
abs: ${u.start} until ${u.end} and ${r.start} until ${r.end}
rel: ${u.start - i} until ${u.end - i} and ${r.start - i} until ${r.end - i}`);
      }
    }
    o.push(r);
  }
  function f(r, o, s) {
    const l = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    let i = o;
    for (let n = 0; n < r.checksums.length; n++) {
      const p = r.checksums[n], g = r.sizes[n], A = u.get(p);
      if (A === void 0)
        l.set(p, i), u.set(p, g);
      else if (s.debug != null) {
        const c = A === g ? "(same size)" : `(size: ${A}, this size: ${g})`;
        s.debug(`${p} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      i += g;
    }
    return { checksumToOffset: l, checksumToOldSize: u };
  }
  function a(r) {
    const o = /* @__PURE__ */ new Map();
    for (const s of r)
      o.set(s.name, s);
    return o;
  }
  return It;
}
var Ba;
function qo() {
  if (Ba) return Nt;
  Ba = 1, Object.defineProperty(Nt, "__esModule", { value: !0 }), Nt.DataSplitter = void 0, Nt.copyData = r;
  const t = xe(), m = ut, y = sr, v = Wn(), f = Buffer.from(`\r
\r
`);
  var a;
  (function(s) {
    s[s.INIT = 0] = "INIT", s[s.HEADER = 1] = "HEADER", s[s.BODY = 2] = "BODY";
  })(a || (a = {}));
  function r(s, l, u, i, n) {
    const p = (0, m.createReadStream)("", {
      fd: u,
      autoClose: !1,
      start: s.start,
      // end is inclusive
      end: s.end - 1
    });
    p.on("error", i), p.once("end", n), p.pipe(l, {
      end: !1
    });
  }
  let o = class extends y.Writable {
    constructor(l, u, i, n, p, g) {
      super(), this.out = l, this.options = u, this.partIndexToTaskIndex = i, this.partIndexToLength = p, this.finishHandler = g, this.partIndex = -1, this.headerListBuffer = null, this.readState = a.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = n.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(l, u, i) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${l.length} bytes`);
        return;
      }
      this.handleData(l).then(i).catch(i);
    }
    async handleData(l) {
      let u = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, t.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const i = Math.min(this.ignoreByteCount, l.length);
        this.ignoreByteCount -= i, u = i;
      } else if (this.remainingPartDataCount > 0) {
        const i = Math.min(this.remainingPartDataCount, l.length);
        this.remainingPartDataCount -= i, await this.processPartData(l, 0, i), u = i;
      }
      if (u !== l.length) {
        if (this.readState === a.HEADER) {
          const i = this.searchHeaderListEnd(l, u);
          if (i === -1)
            return;
          u = i, this.readState = a.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === a.BODY)
            this.readState = a.INIT;
          else {
            this.partIndex++;
            let g = this.partIndexToTaskIndex.get(this.partIndex);
            if (g == null)
              if (this.isFinished)
                g = this.options.end;
              else
                throw (0, t.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const A = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (A < g)
              await this.copyExistingData(A, g);
            else if (A > g)
              throw (0, t.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (u = this.searchHeaderListEnd(l, u), u === -1) {
              this.readState = a.HEADER;
              return;
            }
          }
          const i = this.partIndexToLength[this.partIndex], n = u + i, p = Math.min(n, l.length);
          if (await this.processPartStarted(l, u, p), this.remainingPartDataCount = i - (p - u), this.remainingPartDataCount > 0)
            return;
          if (u = n + this.boundaryLength, u >= l.length) {
            this.ignoreByteCount = this.boundaryLength - (l.length - n);
            return;
          }
        }
      }
    }
    copyExistingData(l, u) {
      return new Promise((i, n) => {
        const p = () => {
          if (l === u) {
            i();
            return;
          }
          const g = this.options.tasks[l];
          if (g.kind !== v.OperationKind.COPY) {
            n(new Error("Task kind must be COPY"));
            return;
          }
          r(g, this.out, this.options.oldFileFd, n, () => {
            l++, p();
          });
        };
        p();
      });
    }
    searchHeaderListEnd(l, u) {
      const i = l.indexOf(f, u);
      if (i !== -1)
        return i + f.length;
      const n = u === 0 ? l : l.slice(u);
      return this.headerListBuffer == null ? this.headerListBuffer = n : this.headerListBuffer = Buffer.concat([this.headerListBuffer, n]), -1;
    }
    onPartEnd() {
      const l = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== l)
        throw (0, t.newError)(`Expected length: ${l} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(l, u, i) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(l, u, i);
    }
    processPartData(l, u, i) {
      this.actualPartLength += i - u;
      const n = this.out;
      return n.write(u === 0 && l.length === i ? l : l.slice(u, i)) ? Promise.resolve() : new Promise((p, g) => {
        n.on("error", g), n.once("drain", () => {
          n.removeListener("error", g), p();
        });
      });
    }
  };
  return Nt.DataSplitter = o, Nt;
}
var Jt = {}, $a;
function Ul() {
  if ($a) return Jt;
  $a = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.executeTasksUsingMultipleRangeRequests = v, Jt.checkIsRangesSupported = a;
  const t = xe(), m = qo(), y = Wn();
  function v(r, o, s, l, u) {
    const i = (n) => {
      if (n >= o.length) {
        r.fileMetadataBuffer != null && s.write(r.fileMetadataBuffer), s.end();
        return;
      }
      const p = n + 1e3;
      f(r, {
        tasks: o,
        start: n,
        end: Math.min(o.length, p),
        oldFileFd: l
      }, s, () => i(p), u);
    };
    return i;
  }
  function f(r, o, s, l, u) {
    let i = "bytes=", n = 0;
    const p = /* @__PURE__ */ new Map(), g = [];
    for (let E = o.start; E < o.end; E++) {
      const T = o.tasks[E];
      T.kind === y.OperationKind.DOWNLOAD && (i += `${T.start}-${T.end - 1}, `, p.set(n, E), n++, g.push(T.end - T.start));
    }
    if (n <= 1) {
      const E = (T) => {
        if (T >= o.end) {
          l();
          return;
        }
        const C = o.tasks[T++];
        if (C.kind === y.OperationKind.COPY)
          (0, m.copyData)(C, s, o.oldFileFd, u, () => E(T));
        else {
          const O = r.createRequestOptions();
          O.headers.Range = `bytes=${C.start}-${C.end - 1}`;
          const D = r.httpExecutor.createRequest(O, (N) => {
            N.on("error", u), a(N, u) && (N.pipe(s, {
              end: !1
            }), N.once("end", () => E(T)));
          });
          r.httpExecutor.addErrorAndTimeoutHandlers(D, u), D.end();
        }
      };
      E(o.start);
      return;
    }
    const A = r.createRequestOptions();
    A.headers.Range = i.substring(0, i.length - 2);
    const c = r.httpExecutor.createRequest(A, (E) => {
      if (!a(E, u))
        return;
      const T = (0, t.safeGetHeader)(E, "content-type"), C = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(T);
      if (C == null) {
        u(new Error(`Content-Type "multipart/byteranges" is expected, but got "${T}"`));
        return;
      }
      const O = new m.DataSplitter(s, o, p, C[1] || C[2], g, l);
      O.on("error", u), E.pipe(O), E.on("end", () => {
        setTimeout(() => {
          c.abort(), u(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    r.httpExecutor.addErrorAndTimeoutHandlers(c, u), c.end();
  }
  function a(r, o) {
    if (r.statusCode >= 400)
      return o((0, t.createHttpError)(r)), !1;
    if (r.statusCode !== 206) {
      const s = (0, t.safeGetHeader)(r, "accept-ranges");
      if (s == null || s === "none")
        return o(new Error(`Server doesn't support Accept-Ranges (response code ${r.statusCode})`)), !1;
    }
    return !0;
  }
  return Jt;
}
var Xt = {}, Ha;
function Fl() {
  if (Ha) return Xt;
  Ha = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.ProgressDifferentialDownloadCallbackTransform = void 0;
  const t = sr;
  var m;
  (function(v) {
    v[v.COPY = 0] = "COPY", v[v.DOWNLOAD = 1] = "DOWNLOAD";
  })(m || (m = {}));
  let y = class extends t.Transform {
    constructor(f, a, r) {
      super(), this.progressDifferentialDownloadInfo = f, this.cancellationToken = a, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = m.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(f, a, r) {
      if (this.cancellationToken.cancelled) {
        r(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == m.COPY) {
        r(null, f);
        return;
      }
      this.transferred += f.length, this.delta += f.length;
      const o = Date.now();
      o >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = o + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((o - this.start) / 1e3))
      }), this.delta = 0), r(null, f);
    }
    beginFileCopy() {
      this.operationType = m.COPY;
    }
    beginRangeDownload() {
      this.operationType = m.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
    }
    endRangeDownload() {
      this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
    // Called when we are 100% done with the connection/download
    _flush(f) {
      if (this.cancellationToken.cancelled) {
        f(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, f(null);
    }
  };
  return Xt.ProgressDifferentialDownloadCallbackTransform = y, Xt;
}
var ja;
function Mo() {
  if (ja) return Kt;
  ja = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.DifferentialDownloader = void 0;
  const t = xe(), m = /* @__PURE__ */ ft(), y = ut, v = qo(), f = ct, a = Wn(), r = Ul(), o = Fl();
  let s = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(n, p, g) {
      this.blockAwareFileInfo = n, this.httpExecutor = p, this.options = g, this.fileMetadataBuffer = null, this.logger = g.logger;
    }
    createRequestOptions() {
      const n = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, t.configureRequestUrl)(this.options.newUrl, n), (0, t.configureRequestOptions)(n), n;
    }
    doDownload(n, p) {
      if (n.version !== p.version)
        throw new Error(`version is different (${n.version} - ${p.version}), full download is required`);
      const g = this.logger, A = (0, a.computeOperations)(n, p, g);
      g.debug != null && g.debug(JSON.stringify(A, null, 2));
      let c = 0, E = 0;
      for (const C of A) {
        const O = C.end - C.start;
        C.kind === a.OperationKind.DOWNLOAD ? c += O : E += O;
      }
      const T = this.blockAwareFileInfo.size;
      if (c + E + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== T)
        throw new Error(`Internal error, size mismatch: downloadSize: ${c}, copySize: ${E}, newSize: ${T}`);
      return g.info(`Full: ${l(T)}, To download: ${l(c)} (${Math.round(c / (T / 100))}%)`), this.downloadFile(A);
    }
    downloadFile(n) {
      const p = [], g = () => Promise.all(p.map((A) => (0, m.close)(A.descriptor).catch((c) => {
        this.logger.error(`cannot close file "${A.path}": ${c}`);
      })));
      return this.doDownloadFile(n, p).then(g).catch((A) => g().catch((c) => {
        try {
          this.logger.error(`cannot close files: ${c}`);
        } catch (E) {
          try {
            console.error(E);
          } catch {
          }
        }
        throw A;
      }).then(() => {
        throw A;
      }));
    }
    async doDownloadFile(n, p) {
      const g = await (0, m.open)(this.options.oldFile, "r");
      p.push({ descriptor: g, path: this.options.oldFile });
      const A = await (0, m.open)(this.options.newFile, "w");
      p.push({ descriptor: A, path: this.options.newFile });
      const c = (0, y.createWriteStream)(this.options.newFile, { fd: A });
      await new Promise((E, T) => {
        const C = [];
        let O;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const I = [];
          let k = 0;
          for (const H of n)
            H.kind === a.OperationKind.DOWNLOAD && (I.push(H.end - H.start), k += H.end - H.start);
          const $ = {
            expectedByteCounts: I,
            grandTotal: k
          };
          O = new o.ProgressDifferentialDownloadCallbackTransform($, this.options.cancellationToken, this.options.onProgress), C.push(O);
        }
        const D = new t.DigestTransform(this.blockAwareFileInfo.sha512);
        D.isValidateOnEnd = !1, C.push(D), c.on("finish", () => {
          c.close(() => {
            p.splice(1, 1);
            try {
              D.validate();
            } catch (I) {
              T(I);
              return;
            }
            E(void 0);
          });
        }), C.push(c);
        let N = null;
        for (const I of C)
          I.on("error", T), N == null ? N = I : N = N.pipe(I);
        const P = C[0];
        let S;
        if (this.options.isUseMultipleRangeRequest) {
          S = (0, r.executeTasksUsingMultipleRangeRequests)(this, n, P, g, T), S(0);
          return;
        }
        let h = 0, F = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const U = this.createRequestOptions();
        U.redirect = "manual", S = (I) => {
          var k, $;
          if (I >= n.length) {
            this.fileMetadataBuffer != null && P.write(this.fileMetadataBuffer), P.end();
            return;
          }
          const H = n[I++];
          if (H.kind === a.OperationKind.COPY) {
            O && O.beginFileCopy(), (0, v.copyData)(H, P, g, T, () => S(I));
            return;
          }
          const ee = `bytes=${H.start}-${H.end - 1}`;
          U.headers.range = ee, ($ = (k = this.logger) === null || k === void 0 ? void 0 : k.debug) === null || $ === void 0 || $.call(k, `download range: ${ee}`), O && O.beginRangeDownload();
          const L = this.httpExecutor.createRequest(U, (ie) => {
            ie.on("error", T), ie.on("aborted", () => {
              T(new Error("response has been aborted by the server"));
            }), ie.statusCode >= 400 && T((0, t.createHttpError)(ie)), ie.pipe(P, {
              end: !1
            }), ie.once("end", () => {
              O && O.endRangeDownload(), ++h === 100 ? (h = 0, setTimeout(() => S(I), 1e3)) : S(I);
            });
          });
          L.on("redirect", (ie, le, pe) => {
            this.logger.info(`Redirect to ${u(pe)}`), F = pe, (0, t.configureRequestUrl)(new f.URL(F), U), L.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(L, T), L.end();
        }, S(0);
      });
    }
    async readRemoteBytes(n, p) {
      const g = Buffer.allocUnsafe(p + 1 - n), A = this.createRequestOptions();
      A.headers.range = `bytes=${n}-${p}`;
      let c = 0;
      if (await this.request(A, (E) => {
        E.copy(g, c), c += E.length;
      }), c !== g.length)
        throw new Error(`Received data length ${c} is not equal to expected ${g.length}`);
      return g;
    }
    request(n, p) {
      return new Promise((g, A) => {
        const c = this.httpExecutor.createRequest(n, (E) => {
          (0, r.checkIsRangesSupported)(E, A) && (E.on("error", A), E.on("aborted", () => {
            A(new Error("response has been aborted by the server"));
          }), E.on("data", p), E.on("end", () => g()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(c, A), c.end();
      });
    }
  };
  Kt.DifferentialDownloader = s;
  function l(i, n = " KB") {
    return new Intl.NumberFormat("en").format((i / 1024).toFixed(2)) + n;
  }
  function u(i) {
    const n = i.indexOf("?");
    return n < 0 ? i : i.substring(0, n);
  }
  return Kt;
}
var Ga;
function kl() {
  if (Ga) return zt;
  Ga = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.GenericDifferentialDownloader = void 0;
  const t = Mo();
  let m = class extends t.DifferentialDownloader {
    download(v, f) {
      return this.doDownload(v, f);
    }
  };
  return zt.GenericDifferentialDownloader = m, zt;
}
var Ln = {}, Wa;
function Tt() {
  return Wa || (Wa = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.UpdaterSignal = t.UPDATE_DOWNLOADED = t.DOWNLOAD_PROGRESS = t.CancellationToken = void 0, t.addHandler = v;
    const m = xe();
    Object.defineProperty(t, "CancellationToken", { enumerable: !0, get: function() {
      return m.CancellationToken;
    } }), t.DOWNLOAD_PROGRESS = "download-progress", t.UPDATE_DOWNLOADED = "update-downloaded";
    class y {
      constructor(a) {
        this.emitter = a;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(a) {
        v(this.emitter, "login", a);
      }
      progress(a) {
        v(this.emitter, t.DOWNLOAD_PROGRESS, a);
      }
      updateDownloaded(a) {
        v(this.emitter, t.UPDATE_DOWNLOADED, a);
      }
      updateCancelled(a) {
        v(this.emitter, "update-cancelled", a);
      }
    }
    t.UpdaterSignal = y;
    function v(f, a, r) {
      f.on(a, r);
    }
  })(Ln)), Ln;
}
var Ya;
function Yn() {
  if (Ya) return vt;
  Ya = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.NoOpLogger = vt.AppUpdater = void 0;
  const t = xe(), m = lr, y = qn, v = ho, f = /* @__PURE__ */ ft(), a = Gn(), r = Al(), o = Re, s = po(), l = Sl(), u = Dl(), i = Cl(), n = ko(), p = xl(), g = mo, A = kl(), c = Tt();
  let E = class Bo extends v.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(D) {
      if (this._channel != null) {
        if (typeof D != "string")
          throw (0, t.newError)(`Channel must be a string, but got: ${D}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (D.length === 0)
          throw (0, t.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = D, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(D) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: D
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, i.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(D) {
      this._logger = D ?? new C();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(D) {
      this.clientPromise = null, this._appUpdateConfigPath = D, this.configOnDisk = new r.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(D) {
      D && (this._isUpdateSupported = D);
    }
    /**
     * Allows developer to override default logic for determining if the user is below the rollout threshold.
     * The default logic compares the staging percentage with numerical representation of user ID.
     * An override can define custom logic, or bypass it if needed.
     */
    get isUserWithinRollout() {
      return this._isUserWithinRollout;
    }
    set isUserWithinRollout(D) {
      D && (this._isUserWithinRollout = D);
    }
    constructor(D, N) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new c.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (h) => this.checkIfUpdateSupported(h), this._isUserWithinRollout = (h) => this.isStagingMatch(h), this.clientPromise = null, this.stagingUserIdPromise = new r.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new r.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (h) => {
        this._logger.error(`Error: ${h.stack || h.message}`);
      }), N == null ? (this.app = new u.ElectronAppAdapter(), this.httpExecutor = new i.ElectronHttpExecutor((h, F) => this.emit("login", h, F))) : (this.app = N, this.httpExecutor = null);
      const P = this.app.version, S = (0, s.parse)(P);
      if (S == null)
        throw (0, t.newError)(`App version is not a valid semver version: "${P}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = S, this.allowPrerelease = T(S), D != null && (this.setFeedURL(D), typeof D != "string" && D.requestHeaders && (this.requestHeaders = D.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(D) {
      const N = this.createProviderRuntimeOptions();
      let P;
      typeof D == "string" ? P = new n.GenericProvider({ provider: "generic", url: D }, this, {
        ...N,
        isUseMultipleRangeRequest: (0, p.isUrlProbablySupportMultiRangeRequests)(D)
      }) : P = (0, p.createClient)(D, this, N), this.clientPromise = Promise.resolve(P);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let D = this.checkForUpdatesPromise;
      if (D != null)
        return this._logger.info("Checking for update (already in progress)"), D;
      const N = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), D = this.doCheckForUpdates().then((P) => (N(), P)).catch((P) => {
        throw N(), this.emit("error", P, `Cannot check for updates: ${(P.stack || P).toString()}`), P;
      }), this.checkForUpdatesPromise = D, D;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(D) {
      return this.checkForUpdates().then((N) => N != null && N.downloadPromise ? (N.downloadPromise.then(() => {
        const P = Bo.formatDownloadNotification(N.updateInfo.version, this.app.name, D);
        new Et.Notification(P).show();
      }), N) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), N));
    }
    static formatDownloadNotification(D, N, P) {
      return P == null && (P = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), P = {
        title: P.title.replace("{appName}", N).replace("{version}", D),
        body: P.body.replace("{appName}", N).replace("{version}", D)
      }, P;
    }
    async isStagingMatch(D) {
      const N = D.stagingPercentage;
      let P = N;
      if (P == null)
        return !0;
      if (P = parseInt(P, 10), isNaN(P))
        return this._logger.warn(`Staging percentage is NaN: ${N}`), !0;
      P = P / 100;
      const S = await this.stagingUserIdPromise.value, F = t.UUID.parse(S).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${P}, percentage: ${F}, user id: ${S}`), F < P;
    }
    computeFinalHeaders(D) {
      return this.requestHeaders != null && Object.assign(D, this.requestHeaders), D;
    }
    async isUpdateAvailable(D) {
      const N = (0, s.parse)(D.version);
      if (N == null)
        throw (0, t.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${D.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const P = this.currentVersion;
      if ((0, s.eq)(N, P) || !await Promise.resolve(this.isUpdateSupported(D)) || !await Promise.resolve(this.isUserWithinRollout(D)))
        return !1;
      const h = (0, s.gt)(N, P), F = (0, s.lt)(N, P);
      return h ? !0 : this.allowDowngrade && F;
    }
    checkIfUpdateSupported(D) {
      const N = D == null ? void 0 : D.minimumSystemVersion, P = (0, y.release)();
      if (N)
        try {
          if ((0, s.lt)(P, N))
            return this._logger.info(`Current OS version ${P} is less than the minimum OS version required ${N} for version ${P}`), !1;
        } catch (S) {
          this._logger.warn(`Failed to compare current OS version(${P}) with minimum OS version(${N}): ${(S.message || S).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((P) => (0, p.createClient)(P, this, this.createProviderRuntimeOptions())));
      const D = await this.clientPromise, N = await this.stagingUserIdPromise.value;
      return D.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": N })), {
        info: await D.getLatestVersion(),
        provider: D
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const D = await this.getUpdateInfoAndProvider(), N = D.info;
      if (!await this.isUpdateAvailable(N))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${N.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", N), {
          isUpdateAvailable: !1,
          versionInfo: N,
          updateInfo: N
        };
      this.updateInfoAndProvider = D, this.onUpdateAvailable(N);
      const P = new t.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: N,
        updateInfo: N,
        cancellationToken: P,
        downloadPromise: this.autoDownload ? this.downloadUpdate(P) : null
      };
    }
    onUpdateAvailable(D) {
      this._logger.info(`Found version ${D.version} (url: ${(0, t.asArray)(D.files).map((N) => N.url).join(", ")})`), this.emit("update-available", D);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(D = new t.CancellationToken()) {
      const N = this.updateInfoAndProvider;
      if (N == null) {
        const S = new Error("Please check update first");
        return this.dispatchError(S), Promise.reject(S);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, t.asArray)(N.info.files).map((S) => S.url).join(", ")}`);
      const P = (S) => {
        if (!(S instanceof t.CancellationError))
          try {
            this.dispatchError(S);
          } catch (h) {
            this._logger.warn(`Cannot dispatch error event: ${h.stack || h}`);
          }
        return S;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: N,
        requestHeaders: this.computeRequestHeaders(N.provider),
        cancellationToken: D,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((S) => {
        throw P(S);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(D) {
      this.emit("error", D, (D.stack || D).toString());
    }
    dispatchUpdateDownloaded(D) {
      this.emit(c.UPDATE_DOWNLOADED, D);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, a.load)(await (0, f.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(D) {
      const N = D.fileExtraDownloadHeaders;
      if (N != null) {
        const P = this.requestHeaders;
        return P == null ? N : {
          ...N,
          ...P
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const D = o.join(this.app.userDataPath, ".updaterId");
      try {
        const P = await (0, f.readFile)(D, "utf-8");
        if (t.UUID.check(P))
          return P;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${P}`);
      } catch (P) {
        P.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${P}`);
      }
      const N = t.UUID.v5((0, m.randomBytes)(4096), t.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${N}`);
      try {
        await (0, f.outputFile)(D, N);
      } catch (P) {
        this._logger.warn(`Couldn't write out staging user ID: ${P}`);
      }
      return N;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const D = this.requestHeaders;
      if (D == null)
        return !0;
      for (const N of Object.keys(D)) {
        const P = N.toLowerCase();
        if (P === "authorization" || P === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let D = this.downloadedUpdateHelper;
      if (D == null) {
        const N = (await this.configOnDisk.value).updaterCacheDirName, P = this._logger;
        N == null && P.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const S = o.join(this.app.baseCachePath, N || this.app.name);
        P.debug != null && P.debug(`updater cache dir: ${S}`), D = new l.DownloadedUpdateHelper(S), this.downloadedUpdateHelper = D;
      }
      return D;
    }
    async executeDownload(D) {
      const N = D.fileInfo, P = {
        headers: D.downloadUpdateOptions.requestHeaders,
        cancellationToken: D.downloadUpdateOptions.cancellationToken,
        sha2: N.info.sha2,
        sha512: N.info.sha512
      };
      this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (P.onProgress = (_e) => this.emit(c.DOWNLOAD_PROGRESS, _e));
      const S = D.downloadUpdateOptions.updateInfoAndProvider.info, h = S.version, F = N.packageInfo;
      function U() {
        const _e = decodeURIComponent(D.fileInfo.url.pathname);
        return _e.toLowerCase().endsWith(`.${D.fileExtension.toLowerCase()}`) ? o.basename(_e) : D.fileInfo.info.url;
      }
      const I = await this.getOrCreateDownloadHelper(), k = I.cacheDirForPendingUpdate;
      await (0, f.mkdir)(k, { recursive: !0 });
      const $ = U();
      let H = o.join(k, $);
      const ee = F == null ? null : o.join(k, `package-${h}${o.extname(F.path) || ".7z"}`), L = async (_e) => {
        await I.setDownloadedFile(H, ee, S, N, $, _e), await D.done({
          ...S,
          downloadedFile: H
        });
        const Fe = o.join(k, "current.blockmap");
        return await (0, f.pathExists)(Fe) && await (0, f.copyFile)(Fe, o.join(I.cacheDir, "current.blockmap")), ee == null ? [H] : [H, ee];
      }, ie = this._logger, le = await I.validateDownloadedPath(H, S, N, ie);
      if (le != null)
        return H = le, await L(!1);
      const pe = async () => (await I.clear().catch(() => {
      }), await (0, f.unlink)(H).catch(() => {
      })), De = await (0, l.createTempUpdateFile)(`temp-${$}`, k, ie);
      try {
        await D.task(De, P, ee, pe), await (0, t.retry)(() => (0, f.rename)(De, H), {
          retries: 60,
          interval: 500,
          shouldRetry: (_e) => _e instanceof Error && /^EBUSY:/.test(_e.message) ? !0 : (ie.warn(`Cannot rename temp file to final file: ${_e.message || _e.stack}`), !1)
        });
      } catch (_e) {
        throw await pe(), _e instanceof t.CancellationError && (ie.info("cancelled"), this.emit("update-cancelled", S)), _e;
      }
      return ie.info(`New version ${h} has been downloaded to ${H}`), await L(!0);
    }
    async differentialDownloadInstaller(D, N, P, S, h) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const F = N.updateInfoAndProvider.provider, U = await F.getBlockMapFiles(D.url, this.app.version, N.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
        this._logger.info(`Download block maps (old: "${U[0]}", new: ${U[1]})`);
        const I = async (ie) => {
          const le = await this.httpExecutor.downloadToBuffer(ie, {
            headers: N.requestHeaders,
            cancellationToken: N.cancellationToken
          });
          if (le == null || le.length === 0)
            throw new Error(`Blockmap "${ie.href}" is empty`);
          try {
            return JSON.parse((0, g.gunzipSync)(le).toString());
          } catch (pe) {
            throw new Error(`Cannot parse blockmap "${ie.href}", error: ${pe}`);
          }
        }, k = {
          newUrl: D.url,
          oldFile: o.join(this.downloadedUpdateHelper.cacheDir, h),
          logger: this._logger,
          newFile: P,
          isUseMultipleRangeRequest: F.isUseMultipleRangeRequest,
          requestHeaders: N.requestHeaders,
          cancellationToken: N.cancellationToken
        };
        this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (k.onProgress = (ie) => this.emit(c.DOWNLOAD_PROGRESS, ie));
        const $ = async (ie, le) => {
          const pe = o.join(le, "current.blockmap");
          await (0, f.outputFile)(pe, (0, g.gzipSync)(JSON.stringify(ie)));
        }, H = async (ie) => {
          const le = o.join(ie, "current.blockmap");
          try {
            if (await (0, f.pathExists)(le))
              return JSON.parse((0, g.gunzipSync)(await (0, f.readFile)(le)).toString());
          } catch (pe) {
            this._logger.warn(`Cannot parse blockmap "${le}", error: ${pe}`);
          }
          return null;
        }, ee = await I(U[1]);
        await $(ee, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
        let L = await H(this.downloadedUpdateHelper.cacheDir);
        return L == null && (L = await I(U[0])), await new A.GenericDifferentialDownloader(D.info, this.httpExecutor, k).download(L, ee), !1;
      } catch (F) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${F.stack || F}`), this._testOnlyOptions != null)
          throw F;
        return !0;
      }
    }
  };
  vt.AppUpdater = E;
  function T(O) {
    const D = (0, s.prerelease)(O);
    return D != null && D.length > 0;
  }
  class C {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(D) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(D) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(D) {
    }
  }
  return vt.NoOpLogger = C, vt;
}
var Va;
function Rr() {
  if (Va) return Lt;
  Va = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.BaseUpdater = void 0;
  const t = Pr, m = Yn();
  let y = class extends m.AppUpdater {
    constructor(f, a) {
      super(f, a), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(f = !1, a = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(f, f ? a : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Et.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(f) {
      return super.executeDownload({
        ...f,
        done: (a) => (this.dispatchUpdateDownloaded(a), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(f = !1, a = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const r = this.downloadedUpdateHelper, o = this.installerPath, s = r == null ? null : r.downloadedFileInfo;
      if (o == null || s == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${f}, isForceRunAfter: ${a}`), this.doInstall({
          isSilent: f,
          isForceRunAfter: a,
          isAdminRightsRequired: s.isAdminRightsRequired
        });
      } catch (l) {
        return this.dispatchError(l), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((f) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (f !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${f}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    spawnSyncLog(f, a = [], r = {}) {
      this._logger.info(`Executing: ${f} with args: ${a}`);
      const o = (0, t.spawnSync)(f, a, {
        env: { ...process.env, ...r },
        encoding: "utf-8",
        shell: !0
      }), { error: s, status: l, stdout: u, stderr: i } = o;
      if (s != null)
        throw this._logger.error(i), s;
      if (l != null && l !== 0)
        throw this._logger.error(i), new Error(`Command ${f} exited with code ${l}`);
      return u.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(f, a = [], r = void 0, o = "ignore") {
      return this._logger.info(`Executing: ${f} with args: ${a}`), new Promise((s, l) => {
        try {
          const u = { stdio: o, env: r, detached: !0 }, i = (0, t.spawn)(f, a, u);
          i.on("error", (n) => {
            l(n);
          }), i.unref(), i.pid !== void 0 && s(!0);
        } catch (u) {
          l(u);
        }
      });
    }
  };
  return Lt.BaseUpdater = y, Lt;
}
var Qt = {}, Zt = {}, za;
function $o() {
  if (za) return Zt;
  za = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const t = /* @__PURE__ */ ft(), m = Mo(), y = mo;
  let v = class extends m.DifferentialDownloader {
    async download() {
      const o = this.blockAwareFileInfo, s = o.size, l = s - (o.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(l, s - 1);
      const u = f(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await a(this.options.oldFile), u);
    }
  };
  Zt.FileWithEmbeddedBlockMapDifferentialDownloader = v;
  function f(r) {
    return JSON.parse((0, y.inflateRawSync)(r).toString());
  }
  async function a(r) {
    const o = await (0, t.open)(r, "r");
    try {
      const s = (await (0, t.fstat)(o)).size, l = Buffer.allocUnsafe(4);
      await (0, t.read)(o, l, 0, l.length, s - l.length);
      const u = Buffer.allocUnsafe(l.readUInt32BE(0));
      return await (0, t.read)(o, u, 0, u.length, s - l.length - u.length), await (0, t.close)(o), f(u);
    } catch (s) {
      throw await (0, t.close)(o), s;
    }
  }
  return Zt;
}
var Ka;
function Ja() {
  if (Ka) return Qt;
  Ka = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.AppImageUpdater = void 0;
  const t = xe(), m = Pr, y = /* @__PURE__ */ ft(), v = ut, f = Re, a = Rr(), r = $o(), o = We(), s = Tt();
  let l = class extends a.BaseUpdater {
    constructor(i, n) {
      super(i, n);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(i) {
      const n = i.updateInfoAndProvider.provider, p = (0, o.findFile)(n.resolveFiles(i.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: p,
        downloadUpdateOptions: i,
        task: async (g, A) => {
          const c = process.env.APPIMAGE;
          if (c == null)
            throw (0, t.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (i.disableDifferentialDownload || await this.downloadDifferential(p, c, g, n, i)) && await this.httpExecutor.download(p.url, g, A), await (0, y.chmod)(g, 493);
        }
      });
    }
    async downloadDifferential(i, n, p, g, A) {
      try {
        const c = {
          newUrl: i.url,
          oldFile: n,
          logger: this._logger,
          newFile: p,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          requestHeaders: A.requestHeaders,
          cancellationToken: A.cancellationToken
        };
        return this.listenerCount(s.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (E) => this.emit(s.DOWNLOAD_PROGRESS, E)), await new r.FileWithEmbeddedBlockMapDifferentialDownloader(i.info, this.httpExecutor, c).download(), !1;
      } catch (c) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${c.stack || c}`), process.platform === "linux";
      }
    }
    doInstall(i) {
      const n = process.env.APPIMAGE;
      if (n == null)
        throw (0, t.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, v.unlinkSync)(n);
      let p;
      const g = f.basename(n), A = this.installerPath;
      if (A == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      f.basename(A) === g || !/\d+\.\d+\.\d+/.test(g) ? p = n : p = f.join(f.dirname(n), f.basename(A)), (0, m.execFileSync)("mv", ["-f", A, p]), p !== n && this.emit("appimage-filename-updated", p);
      const c = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return i.isForceRunAfter ? this.spawnLog(p, [], c) : (c.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, m.execFileSync)(p, [], { env: c })), !0;
    }
  };
  return Qt.AppImageUpdater = l, Qt;
}
var er = {}, tr = {}, Xa;
function Vn() {
  if (Xa) return tr;
  Xa = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.LinuxUpdater = void 0;
  const t = Rr();
  let m = class extends t.BaseUpdater {
    constructor(v, f) {
      super(v, f);
    }
    /**
     * Returns true if the current process is running as root.
     */
    isRunningAsRoot() {
      var v;
      return ((v = process.getuid) === null || v === void 0 ? void 0 : v.call(process)) === 0;
    }
    /**
     * Sanitizies the installer path for using with command line tools.
     */
    get installerPath() {
      var v, f;
      return (f = (v = super.installerPath) === null || v === void 0 ? void 0 : v.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && f !== void 0 ? f : null;
    }
    runCommandWithSudoIfNeeded(v) {
      if (this.isRunningAsRoot())
        return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(v[0], v.slice(1));
      const { name: f } = this.app, a = `"${f} would like to update"`, r = this.sudoWithArgs(a);
      this._logger.info(`Running as non-root user, using sudo to install: ${r}`);
      let o = '"';
      return (/pkexec/i.test(r[0]) || r[0] === "sudo") && (o = ""), this.spawnSyncLog(r[0], [...r.length > 1 ? r.slice(1) : [], `${o}/bin/bash`, "-c", `'${v.join(" ")}'${o}`]);
    }
    sudoWithArgs(v) {
      const f = this.determineSudoCommand(), a = [f];
      return /kdesudo/i.test(f) ? (a.push("--comment", v), a.push("-c")) : /gksudo/i.test(f) ? a.push("--message", v) : /pkexec/i.test(f) && a.push("--disable-internal-agent"), a;
    }
    hasCommand(v) {
      try {
        return this.spawnSyncLog("command", ["-v", v]), !0;
      } catch {
        return !1;
      }
    }
    determineSudoCommand() {
      const v = ["gksudo", "kdesudo", "pkexec", "beesu"];
      for (const f of v)
        if (this.hasCommand(f))
          return f;
      return "sudo";
    }
    /**
     * Detects the package manager to use based on the available commands.
     * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
     * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
     * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
     * @param pms - An array of package manager commands to check for, in priority order.
     * @returns The detected package manager command or "unknown" if none are found.
     */
    detectPackageManager(v) {
      var f;
      const a = (f = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || f === void 0 ? void 0 : f.trim();
      if (a)
        return a;
      for (const r of v)
        if (this.hasCommand(r))
          return r;
      return this._logger.warn(`No package manager found in the list: ${v.join(", ")}. Defaulting to the first one: ${v[0]}`), v[0];
    }
  };
  return tr.LinuxUpdater = m, tr;
}
var Qa;
function Za() {
  if (Qa) return er;
  Qa = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.DebUpdater = void 0;
  const t = We(), m = Tt(), y = Vn();
  let v = class Ho extends y.LinuxUpdater {
    constructor(a, r) {
      super(a, r);
    }
    /*** @private */
    doDownloadUpdate(a) {
      const r = a.updateInfoAndProvider.provider, o = (0, t.findFile)(r.resolveFiles(a.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: o,
        downloadUpdateOptions: a,
        task: async (s, l) => {
          this.listenerCount(m.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (u) => this.emit(m.DOWNLOAD_PROGRESS, u)), await this.httpExecutor.download(o.url, s, l);
        }
      });
    }
    doInstall(a) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
        return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
      const o = ["dpkg", "apt"], s = this.detectPackageManager(o);
      try {
        Ho.installWithCommandRunner(s, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (l) {
        return this.dispatchError(l), !1;
      }
      return a.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(a, r, o, s) {
      var l;
      if (a === "dpkg")
        try {
          o(["dpkg", "-i", r]);
        } catch (u) {
          s.warn((l = u.message) !== null && l !== void 0 ? l : u), s.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), o(["apt-get", "install", "-f", "-y"]);
        }
      else if (a === "apt")
        s.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), o([
          "apt",
          "install",
          "-y",
          "--allow-unauthenticated",
          // needed for unsigned .debs
          "--allow-downgrades",
          // allow lower version installs
          "--allow-change-held-packages",
          r
        ]);
      else
        throw new Error(`Package manager ${a} not supported`);
    }
  };
  return er.DebUpdater = v, er;
}
var rr = {}, eo;
function to() {
  if (eo) return rr;
  eo = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.PacmanUpdater = void 0;
  const t = Tt(), m = We(), y = Vn();
  let v = class jo extends y.LinuxUpdater {
    constructor(a, r) {
      super(a, r);
    }
    /*** @private */
    doDownloadUpdate(a) {
      const r = a.updateInfoAndProvider.provider, o = (0, m.findFile)(r.resolveFiles(a.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: o,
        downloadUpdateOptions: a,
        task: async (s, l) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (u) => this.emit(t.DOWNLOAD_PROGRESS, u)), await this.httpExecutor.download(o.url, s, l);
        }
      });
    }
    doInstall(a) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      try {
        jo.installWithCommandRunner(r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (o) {
        return this.dispatchError(o), !1;
      }
      return a.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(a, r, o) {
      var s;
      try {
        r(["pacman", "-U", "--noconfirm", a]);
      } catch (l) {
        o.warn((s = l.message) !== null && s !== void 0 ? s : l), o.warn("pacman installation failed, attempting to update package database and retry");
        try {
          r(["pacman", "-Sy", "--noconfirm"]), r(["pacman", "-U", "--noconfirm", a]);
        } catch (u) {
          throw o.error("Retry after pacman -Sy failed"), u;
        }
      }
    }
  };
  return rr.PacmanUpdater = v, rr;
}
var nr = {}, ro;
function no() {
  if (ro) return nr;
  ro = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.RpmUpdater = void 0;
  const t = Tt(), m = We(), y = Vn();
  let v = class Go extends y.LinuxUpdater {
    constructor(a, r) {
      super(a, r);
    }
    /*** @private */
    doDownloadUpdate(a) {
      const r = a.updateInfoAndProvider.provider, o = (0, m.findFile)(r.resolveFiles(a.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: o,
        downloadUpdateOptions: a,
        task: async (s, l) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (u) => this.emit(t.DOWNLOAD_PROGRESS, u)), await this.httpExecutor.download(o.url, s, l);
        }
      });
    }
    doInstall(a) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const o = ["zypper", "dnf", "yum", "rpm"], s = this.detectPackageManager(o);
      try {
        Go.installWithCommandRunner(s, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (l) {
        return this.dispatchError(l), !1;
      }
      return a.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(a, r, o, s) {
      if (a === "zypper")
        return o(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", r]);
      if (a === "dnf")
        return o(["dnf", "install", "--nogpgcheck", "-y", r]);
      if (a === "yum")
        return o(["yum", "install", "--nogpgcheck", "-y", r]);
      if (a === "rpm")
        return s.warn("Installing with rpm only (no dependency resolution)."), o(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", r]);
      throw new Error(`Package manager ${a} not supported`);
    }
  };
  return nr.RpmUpdater = v, nr;
}
var ir = {}, io;
function ao() {
  if (io) return ir;
  io = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.MacUpdater = void 0;
  const t = xe(), m = /* @__PURE__ */ ft(), y = ut, v = Re, f = $s, a = Yn(), r = We(), o = Pr, s = lr;
  let l = class extends a.AppUpdater {
    constructor(i, n) {
      super(i, n), this.nativeUpdater = Et.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (p) => {
        this._logger.warn(p), this.emit("error", p);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(i) {
      this._logger.debug != null && this._logger.debug(i);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((i) => {
        i && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(i) {
      let n = i.updateInfoAndProvider.provider.resolveFiles(i.updateInfoAndProvider.info);
      const p = this._logger, g = "sysctl.proc_translated";
      let A = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), A = (0, o.execFileSync)("sysctl", [g], { encoding: "utf8" }).includes(`${g}: 1`), p.info(`Checked for macOS Rosetta environment (isRosetta=${A})`);
      } catch (D) {
        p.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${D}`);
      }
      let c = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const N = (0, o.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        p.info(`Checked 'uname -a': arm64=${N}`), c = c || N;
      } catch (D) {
        p.warn(`uname shell command to check for arm64 failed: ${D}`);
      }
      c = c || process.arch === "arm64" || A;
      const E = (D) => {
        var N;
        return D.url.pathname.includes("arm64") || ((N = D.info.url) === null || N === void 0 ? void 0 : N.includes("arm64"));
      };
      c && n.some(E) ? n = n.filter((D) => c === E(D)) : n = n.filter((D) => !E(D));
      const T = (0, r.findFile)(n, "zip", ["pkg", "dmg"]);
      if (T == null)
        throw (0, t.newError)(`ZIP file not provided: ${(0, t.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const C = i.updateInfoAndProvider.provider, O = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: T,
        downloadUpdateOptions: i,
        task: async (D, N) => {
          const P = v.join(this.downloadedUpdateHelper.cacheDir, O), S = () => (0, m.pathExistsSync)(P) ? !i.disableDifferentialDownload : (p.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let h = !0;
          S() && (h = await this.differentialDownloadInstaller(T, i, D, C, O)), h && await this.httpExecutor.download(T.url, D, N);
        },
        done: async (D) => {
          if (!i.disableDifferentialDownload)
            try {
              const N = v.join(this.downloadedUpdateHelper.cacheDir, O);
              await (0, m.copyFile)(D.downloadedFile, N);
            } catch (N) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${N.message}`);
            }
          return this.updateDownloaded(T, D);
        }
      });
    }
    async updateDownloaded(i, n) {
      var p;
      const g = n.downloadedFile, A = (p = i.info.size) !== null && p !== void 0 ? p : (await (0, m.stat)(g)).size, c = this._logger, E = `fileToProxy=${i.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${E})`), this.server = (0, f.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${E})`), this.server.on("close", () => {
        c.info(`Proxy server for native Squirrel.Mac is closed (${E})`);
      });
      const T = (C) => {
        const O = C.address();
        return typeof O == "string" ? O : `http://127.0.0.1:${O == null ? void 0 : O.port}`;
      };
      return await new Promise((C, O) => {
        const D = (0, s.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), N = Buffer.from(`autoupdater:${D}`, "ascii"), P = `/${(0, s.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (S, h) => {
          const F = S.url;
          if (c.info(`${F} requested`), F === "/") {
            if (!S.headers.authorization || S.headers.authorization.indexOf("Basic ") === -1) {
              h.statusCode = 401, h.statusMessage = "Invalid Authentication Credentials", h.end(), c.warn("No authenthication info");
              return;
            }
            const k = S.headers.authorization.split(" ")[1], $ = Buffer.from(k, "base64").toString("ascii"), [H, ee] = $.split(":");
            if (H !== "autoupdater" || ee !== D) {
              h.statusCode = 401, h.statusMessage = "Invalid Authentication Credentials", h.end(), c.warn("Invalid authenthication credentials");
              return;
            }
            const L = Buffer.from(`{ "url": "${T(this.server)}${P}" }`);
            h.writeHead(200, { "Content-Type": "application/json", "Content-Length": L.length }), h.end(L);
            return;
          }
          if (!F.startsWith(P)) {
            c.warn(`${F} requested, but not supported`), h.writeHead(404), h.end();
            return;
          }
          c.info(`${P} requested by Squirrel.Mac, pipe ${g}`);
          let U = !1;
          h.on("finish", () => {
            U || (this.nativeUpdater.removeListener("error", O), C([]));
          });
          const I = (0, y.createReadStream)(g);
          I.on("error", (k) => {
            try {
              h.end();
            } catch ($) {
              c.warn(`cannot end response: ${$}`);
            }
            U = !0, this.nativeUpdater.removeListener("error", O), O(new Error(`Cannot pipe "${g}": ${k}`));
          }), h.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": A
          }), I.pipe(h);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${E})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${T(this.server)}, ${E})`), this.nativeUpdater.setFeedURL({
            url: T(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${N.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(n), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", O), this.nativeUpdater.checkForUpdates()) : C([]);
        });
      });
    }
    handleUpdateDownloaded() {
      this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return ir.MacUpdater = l, ir;
}
var ar = {}, Sr = {}, oo;
function Ll() {
  if (oo) return Sr;
  oo = 1, Object.defineProperty(Sr, "__esModule", { value: !0 }), Sr.verifySignature = a;
  const t = xe(), m = Pr, y = qn, v = Re;
  function f(l, u) {
    return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", l], {
      shell: !0,
      timeout: u
    }];
  }
  function a(l, u, i) {
    return new Promise((n, p) => {
      const g = u.replace(/'/g, "''");
      i.info(`Verifying signature ${g}`), (0, m.execFile)(...f(`"Get-AuthenticodeSignature -LiteralPath '${g}' | ConvertTo-Json -Compress"`, 20 * 1e3), (A, c, E) => {
        var T;
        try {
          if (A != null || E) {
            o(i, A, E, p), n(null);
            return;
          }
          const C = r(c);
          if (C.Status === 0) {
            try {
              const P = v.normalize(C.Path), S = v.normalize(u);
              if (i.info(`LiteralPath: ${P}. Update Path: ${S}`), P !== S) {
                o(i, new Error(`LiteralPath of ${P} is different than ${S}`), E, p), n(null);
                return;
              }
            } catch (P) {
              i.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(T = P.message) !== null && T !== void 0 ? T : P.stack}`);
            }
            const D = (0, t.parseDn)(C.SignerCertificate.Subject);
            let N = !1;
            for (const P of l) {
              const S = (0, t.parseDn)(P);
              if (S.size ? N = Array.from(S.keys()).every((F) => S.get(F) === D.get(F)) : P === D.get("CN") && (i.warn(`Signature validated using only CN ${P}. Please add your full Distinguished Name (DN) to publisherNames configuration`), N = !0), N) {
                n(null);
                return;
              }
            }
          }
          const O = `publisherNames: ${l.join(" | ")}, raw info: ` + JSON.stringify(C, (D, N) => D === "RawData" ? void 0 : N, 2);
          i.warn(`Sign verification failed, installer signed with incorrect certificate: ${O}`), n(O);
        } catch (C) {
          o(i, C, null, p), n(null);
          return;
        }
      });
    });
  }
  function r(l) {
    const u = JSON.parse(l);
    delete u.PrivateKey, delete u.IsOSBinary, delete u.SignatureType;
    const i = u.SignerCertificate;
    return i != null && (delete i.Archived, delete i.Extensions, delete i.Handle, delete i.HasPrivateKey, delete i.SubjectName), u;
  }
  function o(l, u, i, n) {
    if (s()) {
      l.warn(`Cannot execute Get-AuthenticodeSignature: ${u || i}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, m.execFileSync)(...f("ConvertTo-Json test", 10 * 1e3));
    } catch (p) {
      l.warn(`Cannot execute ConvertTo-Json: ${p.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    u != null && n(u), i && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${i}. Failing signature validation due to unknown stderr.`));
  }
  function s() {
    const l = y.release();
    return l.startsWith("6.") && !l.startsWith("6.3");
  }
  return Sr;
}
var so;
function lo() {
  if (so) return ar;
  so = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.NsisUpdater = void 0;
  const t = xe(), m = Re, y = Rr(), v = $o(), f = Tt(), a = We(), r = /* @__PURE__ */ ft(), o = Ll(), s = ct;
  let l = class extends y.BaseUpdater {
    constructor(i, n) {
      super(i, n), this._verifyUpdateCodeSignature = (p, g) => (0, o.verifySignature)(p, g, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(i) {
      i && (this._verifyUpdateCodeSignature = i);
    }
    /*** @private */
    doDownloadUpdate(i) {
      const n = i.updateInfoAndProvider.provider, p = (0, a.findFile)(n.resolveFiles(i.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: i,
        fileInfo: p,
        task: async (g, A, c, E) => {
          const T = p.packageInfo, C = T != null && c != null;
          if (C && i.disableWebInstaller)
            throw (0, t.newError)(`Unable to download new version ${i.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !C && !i.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (C || i.disableDifferentialDownload || await this.differentialDownloadInstaller(p, i, g, n, t.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(p.url, g, A);
          const O = await this.verifySignature(g);
          if (O != null)
            throw await E(), (0, t.newError)(`New version ${i.updateInfoAndProvider.info.version} is not signed by the application owner: ${O}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (C && await this.differentialDownloadWebPackage(i, T, c, n))
            try {
              await this.httpExecutor.download(new s.URL(T.path), c, {
                headers: i.requestHeaders,
                cancellationToken: i.cancellationToken,
                sha512: T.sha512
              });
            } catch (D) {
              try {
                await (0, r.unlink)(c);
              } catch {
              }
              throw D;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(i) {
      let n;
      try {
        if (n = (await this.configOnDisk.value).publisherName, n == null)
          return null;
      } catch (p) {
        if (p.code === "ENOENT")
          return null;
        throw p;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(n) ? n : [n], i);
    }
    doInstall(i) {
      const n = this.installerPath;
      if (n == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const p = ["--updated"];
      i.isSilent && p.push("/S"), i.isForceRunAfter && p.push("--force-run"), this.installDirectory && p.push(`/D=${this.installDirectory}`);
      const g = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      g != null && p.push(`--package-file=${g}`);
      const A = () => {
        this.spawnLog(m.join(process.resourcesPath, "elevate.exe"), [n].concat(p)).catch((c) => this.dispatchError(c));
      };
      return i.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), A(), !0) : (this.spawnLog(n, p).catch((c) => {
        const E = c.code;
        this._logger.info(`Cannot run installer: error code: ${E}, error message: "${c.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), E === "UNKNOWN" || E === "EACCES" ? A() : E === "ENOENT" ? Et.shell.openPath(n).catch((T) => this.dispatchError(T)) : this.dispatchError(c);
      }), !0);
    }
    async differentialDownloadWebPackage(i, n, p, g) {
      if (n.blockMapSize == null)
        return !0;
      try {
        const A = {
          newUrl: new s.URL(n.path),
          oldFile: m.join(this.downloadedUpdateHelper.cacheDir, t.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: p,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          cancellationToken: i.cancellationToken
        };
        this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (A.onProgress = (c) => this.emit(f.DOWNLOAD_PROGRESS, c)), await new v.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, A).download();
      } catch (A) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${A.stack || A}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return ar.NsisUpdater = l, ar;
}
var uo;
function ql() {
  return uo || (uo = 1, (function(t) {
    var m = yt && yt.__createBinding || (Object.create ? (function(c, E, T, C) {
      C === void 0 && (C = T);
      var O = Object.getOwnPropertyDescriptor(E, T);
      (!O || ("get" in O ? !E.__esModule : O.writable || O.configurable)) && (O = { enumerable: !0, get: function() {
        return E[T];
      } }), Object.defineProperty(c, C, O);
    }) : (function(c, E, T, C) {
      C === void 0 && (C = T), c[C] = E[T];
    })), y = yt && yt.__exportStar || function(c, E) {
      for (var T in c) T !== "default" && !Object.prototype.hasOwnProperty.call(E, T) && m(E, c, T);
    };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.NsisUpdater = t.MacUpdater = t.RpmUpdater = t.PacmanUpdater = t.DebUpdater = t.AppImageUpdater = t.Provider = t.NoOpLogger = t.AppUpdater = t.BaseUpdater = void 0;
    const v = /* @__PURE__ */ ft(), f = Re;
    var a = Rr();
    Object.defineProperty(t, "BaseUpdater", { enumerable: !0, get: function() {
      return a.BaseUpdater;
    } });
    var r = Yn();
    Object.defineProperty(t, "AppUpdater", { enumerable: !0, get: function() {
      return r.AppUpdater;
    } }), Object.defineProperty(t, "NoOpLogger", { enumerable: !0, get: function() {
      return r.NoOpLogger;
    } });
    var o = We();
    Object.defineProperty(t, "Provider", { enumerable: !0, get: function() {
      return o.Provider;
    } });
    var s = Ja();
    Object.defineProperty(t, "AppImageUpdater", { enumerable: !0, get: function() {
      return s.AppImageUpdater;
    } });
    var l = Za();
    Object.defineProperty(t, "DebUpdater", { enumerable: !0, get: function() {
      return l.DebUpdater;
    } });
    var u = to();
    Object.defineProperty(t, "PacmanUpdater", { enumerable: !0, get: function() {
      return u.PacmanUpdater;
    } });
    var i = no();
    Object.defineProperty(t, "RpmUpdater", { enumerable: !0, get: function() {
      return i.RpmUpdater;
    } });
    var n = ao();
    Object.defineProperty(t, "MacUpdater", { enumerable: !0, get: function() {
      return n.MacUpdater;
    } });
    var p = lo();
    Object.defineProperty(t, "NsisUpdater", { enumerable: !0, get: function() {
      return p.NsisUpdater;
    } }), y(Tt(), t);
    let g;
    function A() {
      if (process.platform === "win32")
        g = new (lo()).NsisUpdater();
      else if (process.platform === "darwin")
        g = new (ao()).MacUpdater();
      else {
        g = new (Ja()).AppImageUpdater();
        try {
          const c = f.join(process.resourcesPath, "package-type");
          if (!(0, v.existsSync)(c))
            return g;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const E = (0, v.readFileSync)(c).toString().trim();
          switch (console.info("Found package-type:", E), E) {
            case "deb":
              g = new (Za()).DebUpdater();
              break;
            case "rpm":
              g = new (no()).RpmUpdater();
              break;
            case "pacman":
              g = new (to()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (c) {
          console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", c.message);
        }
      }
      return g;
    }
    Object.defineProperty(t, "autoUpdater", {
      enumerable: !0,
      get: () => g || A()
    });
  })(yt)), yt;
}
var Ml = ql();
const Su = /* @__PURE__ */ Hs({
  __proto__: null
}, [Ml]);
export {
  Su as m
};
