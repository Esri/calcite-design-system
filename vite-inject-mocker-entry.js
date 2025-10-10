/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
class he {
  registryByUrl = /* @__PURE__ */ new Map();
  registryById = /* @__PURE__ */ new Map();
  clear() {
    this.registryByUrl.clear(), this.registryById.clear();
  }
  keys() {
    return this.registryByUrl.keys();
  }
  add(e) {
    this.registryByUrl.set(e.url, e), this.registryById.set(e.id, e);
  }
  register(e, t, n, i, a) {
    const c = typeof e == "object" ? e.type : e;
    if (typeof e == "object") {
      const s = e;
      if (s instanceof W || s instanceof B || s instanceof j || s instanceof D)
        throw new TypeError(`[vitest] Cannot register a mock that is already defined. Expected a JSON representation from \`MockedModule.toJSON\`, instead got "${s.type}". Use "registry.add()" to update a mock instead.`);
      if (s.type === "automock") {
        const l = W.fromJSON(s);
        return this.add(l), l;
      } else if (s.type === "autospy") {
        const l = B.fromJSON(s);
        return this.add(l), l;
      } else if (s.type === "redirect") {
        const l = D.fromJSON(s);
        return this.add(l), l;
      } else throw s.type === "manual" ? new Error("Cannot set serialized manual mock. Define a factory function manually with `ManualMockedModule.fromJSON()`.") : new Error(`Unknown mock type: ${s.type}`);
    }
    if (typeof t != "string")
      throw new TypeError("[vitest] Mocks require a raw string.");
    if (typeof i != "string")
      throw new TypeError("[vitest] Mocks require a url string.");
    if (typeof n != "string")
      throw new TypeError("[vitest] Mocks require an id string.");
    if (c === "manual") {
      if (typeof a != "function")
        throw new TypeError("[vitest] Manual mocks require a factory function.");
      const s = new j(t, n, i, a);
      return this.add(s), s;
    } else if (c === "automock" || c === "autospy") {
      const s = c === "automock" ? new W(t, n, i) : new B(t, n, i);
      return this.add(s), s;
    } else if (c === "redirect") {
      if (typeof a != "string")
        throw new TypeError("[vitest] Redirect mocks require a redirect string.");
      const s = new D(t, n, i, a);
      return this.add(s), s;
    } else
      throw new Error(`[vitest] Unknown mock type: ${c}`);
  }
  delete(e) {
    this.registryByUrl.delete(e);
  }
  get(e) {
    return this.registryByUrl.get(e);
  }
  getById(e) {
    return this.registryById.get(e);
  }
  has(e) {
    return this.registryByUrl.has(e);
  }
}
class W {
  type = "automock";
  constructor(e, t, n) {
    this.raw = e, this.id = t, this.url = n;
  }
  static fromJSON(e) {
    return new B(e.raw, e.id, e.url);
  }
  toJSON() {
    return {
      type: this.type,
      url: this.url,
      raw: this.raw,
      id: this.id
    };
  }
}
class B {
  type = "autospy";
  constructor(e, t, n) {
    this.raw = e, this.id = t, this.url = n;
  }
  static fromJSON(e) {
    return new B(e.raw, e.id, e.url);
  }
  toJSON() {
    return {
      type: this.type,
      url: this.url,
      id: this.id,
      raw: this.raw
    };
  }
}
class D {
  type = "redirect";
  constructor(e, t, n, i) {
    this.raw = e, this.id = t, this.url = n, this.redirect = i;
  }
  static fromJSON(e) {
    return new D(e.raw, e.id, e.url, e.redirect);
  }
  toJSON() {
    return {
      type: this.type,
      url: this.url,
      raw: this.raw,
      id: this.id,
      redirect: this.redirect
    };
  }
}
class j {
  cache;
  type = "manual";
  constructor(e, t, n, i) {
    this.raw = e, this.id = t, this.url = n, this.factory = i;
  }
  async resolve() {
    if (this.cache)
      return this.cache;
    let e;
    try {
      e = await this.factory();
    } catch (t) {
      const n = new Error('[vitest] There was an error when mocking a module. If you are using "vi.mock" factory, make sure there are no top level variables inside, since this call is hoisted to top of the file. Read more: https://vitest.dev/api/vi.html#vi-mock');
      throw n.cause = t, n;
    }
    if (e === null || typeof e != "object" || Array.isArray(e))
      throw new TypeError(`[vitest] vi.mock("${this.raw}", factory?: () => unknown) is not returning an object. Did you mean to return an object with a "default" key?`);
    return this.cache = e;
  }
  static fromJSON(e, t) {
    return new j(e.raw, e.id, e.url, t);
  }
  toJSON() {
    return {
      type: this.type,
      url: this.url,
      id: this.id,
      raw: this.raw
    };
  }
}
function Ye(r, e, t = {}) {
  const n = new Array(), i = new Be(), a = (l, f, m) => {
    try {
      return l[f] = m, !0;
    } catch {
      return !1;
    }
  }, c = (l, f) => {
    const m = Z(l), h = m === "Module" || !!l.__esModule;
    for (const { key: g, descriptor: P } of ne(l, h, r.globalConstructors)) {
      if (!h && P.get) {
        try {
          Object.defineProperty(f, g, P);
        } catch {
        }
        continue;
      }
      if (De(g, m))
        continue;
      const v = l[g], o = i.getId(v);
      if (o !== void 0) {
        n.push(() => a(f, g, i.getMockedValue(o)));
        continue;
      }
      const u = Z(v);
      if (Array.isArray(v)) {
        a(f, g, []);
        continue;
      }
      const x = u.includes("Function") && typeof v == "function";
      if ((!x || v._isMockFunction) && u !== "Object" && u !== "Module") {
        a(f, g, v);
        continue;
      }
      if (a(f, g, x ? v : {})) {
        if (x) {
          let b = function() {
            if (this instanceof f[g])
              for (const { key: R, descriptor: O } of ne(this, !1, r.globalConstructors)) {
                if (O.get)
                  continue;
                const N = this[R];
                if (Z(N).includes("Function") && typeof N == "function") {
                  const L = this[R], d = A(this, R).mockImplementation(L), M = d.mockReset;
                  d.mockRestore = d.mockReset = () => (M.call(d), d.mockImplementation(L), d);
                }
              }
          };
          if (!r.spyOn)
            throw new Error("[@vitest/mocker] `spyOn` is not defined. This is a Vitest error. Please open a new issue with reproduction.");
          const A = r.spyOn, C = A(f, g);
          if (r.type === "automock") {
            C.mockImplementation(b);
            const R = C.mockReset;
            C.mockRestore = C.mockReset = () => (R.call(C), C.mockImplementation(b), C);
          }
          Object.defineProperty(f[g], "length", { value: 0 });
        }
        i.track(v, f[g]), c(v, f[g]);
      }
    }
  }, s = t;
  c(e, s);
  for (const l of n)
    l();
  return s;
}
class Be {
  idMap = /* @__PURE__ */ new Map();
  mockedValueMap = /* @__PURE__ */ new Map();
  getId(e) {
    return this.idMap.get(e);
  }
  getMockedValue(e) {
    return this.mockedValueMap.get(e);
  }
  track(e, t) {
    const n = this.idMap.size;
    return this.idMap.set(e, n), this.mockedValueMap.set(n, t), n;
  }
}
function Z(r) {
  return Object.prototype.toString.apply(r).slice(8, -1);
}
function De(r, e) {
  return e.includes("Function") && typeof r == "string" && [
    "arguments",
    "callee",
    "caller",
    "length",
    "name"
  ].includes(r);
}
function ne(r, e, t) {
  const { Map: n, Object: i, Function: a, RegExp: c, Array: s } = t, l = new n();
  let f = r;
  do {
    if (f === i.prototype || f === a.prototype || f === c.prototype)
      break;
    Xe(f, (m) => {
      const h = i.getOwnPropertyDescriptor(f, m);
      h && l.set(m, {
        key: m,
        descriptor: h
      });
    });
  } while (f = i.getPrototypeOf(f));
  if (e && !l.has("default") && "default" in r) {
    const m = i.getOwnPropertyDescriptor(r, "default");
    m && l.set("default", {
      key: "default",
      descriptor: m
    });
  }
  return s.from(l.values());
}
function Xe(r, e) {
  const t = typeof e == "function" ? e : (n) => e.add(n);
  Object.getOwnPropertyNames(r).forEach(t), Object.getOwnPropertySymbols(r).forEach(t);
}
const qe = /^[A-Za-z]:\//;
function ge(r = "") {
  return r && r.replace(/\\/g, "/").replace(qe, (e) => e.toUpperCase());
}
const ze = /^[/\\]{2}/, Ue = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/, Ve = /^[A-Za-z]:$/, We = /.(\.[^./]+|\.)$/, je = function(r) {
  if (r.length === 0)
    return ".";
  r = ge(r);
  const e = r.match(ze), t = oe(r), n = r[r.length - 1] === "/";
  return r = Ke(r, !t), r.length === 0 ? t ? "/" : n ? "./" : "." : (n && (r += "/"), Ve.test(r) && (r += "/"), e ? t ? `//${r}` : `//./${r}` : t && !oe(r) ? `/${r}` : r);
}, He = function(...r) {
  let e = "";
  for (const t of r)
    if (t)
      if (e.length > 0) {
        const n = e[e.length - 1] === "/", i = t[0] === "/";
        n && i ? e += t.slice(1) : e += n || i ? t : `/${t}`;
      } else
        e += t;
  return je(e);
};
function Ke(r, e) {
  let t = "", n = 0, i = -1, a = 0, c = null;
  for (let s = 0; s <= r.length; ++s) {
    if (s < r.length)
      c = r[s];
    else {
      if (c === "/")
        break;
      c = "/";
    }
    if (c === "/") {
      if (!(i === s - 1 || a === 1)) if (a === 2) {
        if (t.length < 2 || n !== 2 || t[t.length - 1] !== "." || t[t.length - 2] !== ".") {
          if (t.length > 2) {
            const l = t.lastIndexOf("/");
            l === -1 ? (t = "", n = 0) : (t = t.slice(0, l), n = t.length - 1 - t.lastIndexOf("/")), i = s, a = 0;
            continue;
          } else if (t.length > 0) {
            t = "", n = 0, i = s, a = 0;
            continue;
          }
        }
        e && (t += t.length > 0 ? "/.." : "..", n = 2);
      } else
        t.length > 0 ? t += `/${r.slice(i + 1, s)}` : t = r.slice(i + 1, s), n = s - i - 1;
      i = s, a = 0;
    } else c === "." && a !== -1 ? ++a : a = -1;
  }
  return t;
}
const oe = function(r) {
  return Ue.test(r);
}, Ze = function(r) {
  if (r === "..") return "";
  const e = We.exec(ge(r));
  return e && e[1] || "";
};
var H = {}, Ge = {
  reset: [0, 0],
  bold: [1, 22, "\x1B[22m\x1B[1m"],
  dim: [2, 22, "\x1B[22m\x1B[2m"],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  blackBright: [90, 39],
  redBright: [91, 39],
  greenBright: [92, 39],
  yellowBright: [93, 39],
  blueBright: [94, 39],
  magentaBright: [95, 39],
  cyanBright: [96, 39],
  whiteBright: [97, 39],
  bgBlackBright: [100, 49],
  bgRedBright: [101, 49],
  bgGreenBright: [102, 49],
  bgYellowBright: [103, 49],
  bgBlueBright: [104, 49],
  bgMagentaBright: [105, 49],
  bgCyanBright: [106, 49],
  bgWhiteBright: [107, 49]
}, Qe = Object.entries(Ge);
function ee(r) {
  return String(r);
}
ee.open = "";
ee.close = "";
function et(r = !1) {
  let e = typeof process < "u" ? process : void 0, t = e?.env || {}, n = e?.argv || [];
  return !("NO_COLOR" in t || n.includes("--no-color")) && ("FORCE_COLOR" in t || n.includes("--color") || e?.platform === "win32" || r && t.TERM !== "dumb" || "CI" in t) || typeof window < "u" && !!window.chrome;
}
function tt(r = !1) {
  let e = et(r), t = (c, s, l, f) => {
    let m = "", h = 0;
    do
      m += c.substring(h, f) + l, h = f + s.length, f = c.indexOf(s, h);
    while (~f);
    return m + c.substring(h);
  }, n = (c, s, l = c) => {
    let f = (m) => {
      let h = String(m), g = h.indexOf(s, c.length);
      return ~g ? c + t(h, s, l, g) + s : c + h + s;
    };
    return f.open = c, f.close = s, f;
  }, i = {
    isColorSupported: e
  }, a = (c) => `\x1B[${c}m`;
  for (let [c, s] of Qe)
    i[c] = e ? n(
      a(s[0]),
      a(s[1]),
      s[2]
    ) : ee;
  return i;
}
tt();
function Ee(r, e) {
  return e.forEach(function(t) {
    t && typeof t != "string" && !Array.isArray(t) && Object.keys(t).forEach(function(n) {
      if (n !== "default" && !(n in r)) {
        var i = Object.getOwnPropertyDescriptor(t, n);
        Object.defineProperty(r, n, i.get ? i : {
          enumerable: !0,
          get: function() {
            return t[n];
          }
        });
      }
    });
  }), Object.freeze(r);
}
function ve(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var U = { exports: {} }, w = {};
/**
* @license React
* react-is.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var ie;
function rt() {
  if (ie) return w;
  ie = 1;
  var r = Symbol.for("react.transitional.element"), e = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), c = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), g = Symbol.for("react.view_transition"), P = Symbol.for("react.client.reference");
  function v(o) {
    if (typeof o == "object" && o !== null) {
      var u = o.$$typeof;
      switch (u) {
        case r:
          switch (o = o.type, o) {
            case t:
            case i:
            case n:
            case l:
            case f:
            case g:
              return o;
            default:
              switch (o = o && o.$$typeof, o) {
                case c:
                case s:
                case h:
                case m:
                  return o;
                case a:
                  return o;
                default:
                  return u;
              }
          }
        case e:
          return u;
      }
    }
  }
  return w.ContextConsumer = a, w.ContextProvider = c, w.Element = r, w.ForwardRef = s, w.Fragment = t, w.Lazy = h, w.Memo = m, w.Portal = e, w.Profiler = i, w.StrictMode = n, w.Suspense = l, w.SuspenseList = f, w.isContextConsumer = function(o) {
    return v(o) === a;
  }, w.isContextProvider = function(o) {
    return v(o) === c;
  }, w.isElement = function(o) {
    return typeof o == "object" && o !== null && o.$$typeof === r;
  }, w.isForwardRef = function(o) {
    return v(o) === s;
  }, w.isFragment = function(o) {
    return v(o) === t;
  }, w.isLazy = function(o) {
    return v(o) === h;
  }, w.isMemo = function(o) {
    return v(o) === m;
  }, w.isPortal = function(o) {
    return v(o) === e;
  }, w.isProfiler = function(o) {
    return v(o) === i;
  }, w.isStrictMode = function(o) {
    return v(o) === n;
  }, w.isSuspense = function(o) {
    return v(o) === l;
  }, w.isSuspenseList = function(o) {
    return v(o) === f;
  }, w.isValidElementType = function(o) {
    return typeof o == "string" || typeof o == "function" || o === t || o === i || o === n || o === l || o === f || typeof o == "object" && o !== null && (o.$$typeof === h || o.$$typeof === m || o.$$typeof === c || o.$$typeof === a || o.$$typeof === s || o.$$typeof === P || o.getModuleId !== void 0);
  }, w.typeOf = v, w;
}
var k = {};
/**
* @license React
* react-is.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var se;
function nt() {
  return se || (se = 1, H.NODE_ENV !== "production" && (function() {
    function r(o) {
      if (typeof o == "object" && o !== null) {
        var u = o.$$typeof;
        switch (u) {
          case e:
            switch (o = o.type, o) {
              case n:
              case a:
              case i:
              case f:
              case m:
              case P:
                return o;
              default:
                switch (o = o && o.$$typeof, o) {
                  case s:
                  case l:
                  case g:
                  case h:
                    return o;
                  case c:
                    return o;
                  default:
                    return u;
                }
            }
          case t:
            return u;
        }
      }
    }
    var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), P = Symbol.for("react.view_transition"), v = Symbol.for("react.client.reference");
    k.ContextConsumer = c, k.ContextProvider = s, k.Element = e, k.ForwardRef = l, k.Fragment = n, k.Lazy = g, k.Memo = h, k.Portal = t, k.Profiler = a, k.StrictMode = i, k.Suspense = f, k.SuspenseList = m, k.isContextConsumer = function(o) {
      return r(o) === c;
    }, k.isContextProvider = function(o) {
      return r(o) === s;
    }, k.isElement = function(o) {
      return typeof o == "object" && o !== null && o.$$typeof === e;
    }, k.isForwardRef = function(o) {
      return r(o) === l;
    }, k.isFragment = function(o) {
      return r(o) === n;
    }, k.isLazy = function(o) {
      return r(o) === g;
    }, k.isMemo = function(o) {
      return r(o) === h;
    }, k.isPortal = function(o) {
      return r(o) === t;
    }, k.isProfiler = function(o) {
      return r(o) === a;
    }, k.isStrictMode = function(o) {
      return r(o) === i;
    }, k.isSuspense = function(o) {
      return r(o) === f;
    }, k.isSuspenseList = function(o) {
      return r(o) === m;
    }, k.isValidElementType = function(o) {
      return typeof o == "string" || typeof o == "function" || o === n || o === a || o === i || o === f || o === m || typeof o == "object" && o !== null && (o.$$typeof === g || o.$$typeof === h || o.$$typeof === s || o.$$typeof === c || o.$$typeof === l || o.$$typeof === v || o.getModuleId !== void 0);
    }, k.typeOf = r;
  })()), k;
}
var ae;
function ot() {
  return ae || (ae = 1, H.NODE_ENV === "production" ? U.exports = rt() : U.exports = nt()), U.exports;
}
var Se = ot(), it = /* @__PURE__ */ ve(Se), st = /* @__PURE__ */ Ee({
  __proto__: null,
  default: it
}, [Se]), V = { exports: {} }, S = {};
/**
* @license React
* react-is.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var ce;
function at() {
  if (ce) return S;
  ce = 1;
  var r = Symbol.for("react.element"), e = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), c = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function o(u) {
    if (typeof u == "object" && u !== null) {
      var x = u.$$typeof;
      switch (x) {
        case r:
          switch (u = u.type, u) {
            case t:
            case i:
            case n:
            case f:
            case m:
              return u;
            default:
              switch (u = u && u.$$typeof, u) {
                case s:
                case c:
                case l:
                case g:
                case h:
                case a:
                  return u;
                default:
                  return x;
              }
          }
        case e:
          return x;
      }
    }
  }
  return S.ContextConsumer = c, S.ContextProvider = a, S.Element = r, S.ForwardRef = l, S.Fragment = t, S.Lazy = g, S.Memo = h, S.Portal = e, S.Profiler = i, S.StrictMode = n, S.Suspense = f, S.SuspenseList = m, S.isAsyncMode = function() {
    return !1;
  }, S.isConcurrentMode = function() {
    return !1;
  }, S.isContextConsumer = function(u) {
    return o(u) === c;
  }, S.isContextProvider = function(u) {
    return o(u) === a;
  }, S.isElement = function(u) {
    return typeof u == "object" && u !== null && u.$$typeof === r;
  }, S.isForwardRef = function(u) {
    return o(u) === l;
  }, S.isFragment = function(u) {
    return o(u) === t;
  }, S.isLazy = function(u) {
    return o(u) === g;
  }, S.isMemo = function(u) {
    return o(u) === h;
  }, S.isPortal = function(u) {
    return o(u) === e;
  }, S.isProfiler = function(u) {
    return o(u) === i;
  }, S.isStrictMode = function(u) {
    return o(u) === n;
  }, S.isSuspense = function(u) {
    return o(u) === f;
  }, S.isSuspenseList = function(u) {
    return o(u) === m;
  }, S.isValidElementType = function(u) {
    return typeof u == "string" || typeof u == "function" || u === t || u === i || u === n || u === f || u === m || u === P || typeof u == "object" && u !== null && (u.$$typeof === g || u.$$typeof === h || u.$$typeof === a || u.$$typeof === c || u.$$typeof === l || u.$$typeof === v || u.getModuleId !== void 0);
  }, S.typeOf = o, S;
}
var _ = {};
/**
* @license React
* react-is.development.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var le;
function ct() {
  return le || (le = 1, H.NODE_ENV !== "production" && (function() {
    var r = Symbol.for("react.element"), e = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), c = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), v = !1, o = !1, u = !1, x = !1, A = !1, b;
    b = Symbol.for("react.module.reference");
    function C(p) {
      return !!(typeof p == "string" || typeof p == "function" || p === t || p === i || A || p === n || p === f || p === m || x || p === P || v || o || u || typeof p == "object" && p !== null && (p.$$typeof === g || p.$$typeof === h || p.$$typeof === a || p.$$typeof === c || p.$$typeof === l || p.$$typeof === b || p.getModuleId !== void 0));
    }
    function R(p) {
      if (typeof p == "object" && p !== null) {
        var K = p.$$typeof;
        switch (K) {
          case r:
            var z = p.type;
            switch (z) {
              case t:
              case i:
              case n:
              case f:
              case m:
                return z;
              default:
                var re = z && z.$$typeof;
                switch (re) {
                  case s:
                  case c:
                  case l:
                  case g:
                  case h:
                  case a:
                    return re;
                  default:
                    return K;
                }
            }
          case e:
            return K;
        }
      }
    }
    var O = c, N = a, y = r, E = l, L = t, d = g, M = h, q = e, $ = i, F = n, T = f, J = m, I = !1, te = !1;
    function Re(p) {
      return I || (I = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function be(p) {
      return te || (te = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function Ie(p) {
      return R(p) === c;
    }
    function Pe(p) {
      return R(p) === a;
    }
    function xe(p) {
      return typeof p == "object" && p !== null && p.$$typeof === r;
    }
    function $e(p) {
      return R(p) === l;
    }
    function Me(p) {
      return R(p) === t;
    }
    function Ce(p) {
      return R(p) === g;
    }
    function Ae(p) {
      return R(p) === h;
    }
    function Oe(p) {
      return R(p) === e;
    }
    function Ne(p) {
      return R(p) === i;
    }
    function Le(p) {
      return R(p) === n;
    }
    function Fe(p) {
      return R(p) === f;
    }
    function Je(p) {
      return R(p) === m;
    }
    _.ContextConsumer = O, _.ContextProvider = N, _.Element = y, _.ForwardRef = E, _.Fragment = L, _.Lazy = d, _.Memo = M, _.Portal = q, _.Profiler = $, _.StrictMode = F, _.Suspense = T, _.SuspenseList = J, _.isAsyncMode = Re, _.isConcurrentMode = be, _.isContextConsumer = Ie, _.isContextProvider = Pe, _.isElement = xe, _.isForwardRef = $e, _.isFragment = Me, _.isLazy = Ce, _.isMemo = Ae, _.isPortal = Oe, _.isProfiler = Ne, _.isStrictMode = Le, _.isSuspense = Fe, _.isSuspenseList = Je, _.isValidElementType = C, _.typeOf = R;
  })()), _;
}
var ue;
function lt() {
  return ue || (ue = 1, H.NODE_ENV === "production" ? V.exports = at() : V.exports = ct()), V.exports;
}
var _e = lt(), ut = /* @__PURE__ */ ve(_e), ft = /* @__PURE__ */ Ee({
  __proto__: null,
  default: ut
}, [_e]);
const dt = [
  "isAsyncMode",
  "isConcurrentMode",
  "isContextConsumer",
  "isContextProvider",
  "isElement",
  "isForwardRef",
  "isFragment",
  "isLazy",
  "isMemo",
  "isPortal",
  "isProfiler",
  "isStrictMode",
  "isSuspense",
  "isSuspenseList",
  "isValidElementType"
];
Object.fromEntries(dt.map((r) => [r, (e) => ft[r](e) || st[r](e)]));
let pt = () => "Promise{…}";
try {
  const { getPromiseDetails: r, kPending: e, kRejected: t } = process.binding("util");
  Array.isArray(r(Promise.resolve())) && (pt = (n, i) => {
    const [a, c] = r(n);
    return a === e ? "Promise{<pending>}" : `Promise${a === t ? "!" : ""}{${i.inspect(c, i)}}`;
  });
} catch {
}
function mt(r) {
  const { message: e = "$$stack trace error", stackTraceLimit: t = 1 } = r || {}, n = Error.stackTraceLimit, i = Error.prepareStackTrace;
  Error.stackTraceLimit = t, Error.prepareStackTrace = (s) => s.stack;
  const c = new Error(e).stack || "";
  return Error.prepareStackTrace = i, Error.stackTraceLimit = n, c;
}
var G, fe;
function yt() {
  if (fe) return G;
  fe = 1;
  var r, e, t, n, i, a, c, s, l, f, m, h, g, P, v, o, u, x, A;
  return g = /\/(?![*\/])(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\\]).|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/uy, h = /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y, r = /(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/uy, v = /(['"])(?:(?!\1)[^\\\n\r]|\\(?:\r\n|[^]))*(\1)?/y, m = /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y, o = /[`}](?:[^`\\$]|\\[^]|\$(?!\{))*(`|\$\{)?/y, A = /[\t\v\f\ufeff\p{Zs}]+/uy, s = /\r?\n|[\r\u2028\u2029]/y, l = /\/\*(?:[^*]|\*(?!\/))*(\*\/)?/y, P = /\/\/.*/y, t = /[<>.:={}]|\/(?![\/*])/y, e = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/uy, n = /(['"])(?:(?!\1)[^])*(\1)?/y, i = /[^<>{}]+/y, x = /^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/, u = /^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/, a = /^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/, c = /^(?:return|throw|yield)$/, f = RegExp(s.source), G = function* (b, { jsx: C = !1 } = {}) {
    var R, O, N, y, E, L, d, M, q, $, F, T, J, I;
    for ({ length: L } = b, y = 0, E = "", I = [{ tag: "JS" }], R = [], F = 0, T = !1; y < L; ) {
      switch (M = I[I.length - 1], M.tag) {
        case "JS":
        case "JSNonExpressionParen":
        case "InterpolationInTemplate":
        case "InterpolationInJSX":
          if (b[y] === "/" && (x.test(E) || a.test(E)) && (g.lastIndex = y, d = g.exec(b))) {
            y = g.lastIndex, E = d[0], T = !0, yield {
              type: "RegularExpressionLiteral",
              value: d[0],
              closed: d[1] !== void 0 && d[1] !== "\\"
            };
            continue;
          }
          if (h.lastIndex = y, d = h.exec(b)) {
            switch (J = d[0], q = h.lastIndex, $ = J, J) {
              case "(":
                E === "?NonExpressionParenKeyword" && I.push({
                  tag: "JSNonExpressionParen",
                  nesting: F
                }), F++, T = !1;
                break;
              case ")":
                F--, T = !0, M.tag === "JSNonExpressionParen" && F === M.nesting && (I.pop(), $ = "?NonExpressionParenEnd", T = !1);
                break;
              case "{":
                h.lastIndex = 0, N = !u.test(E) && (x.test(E) || a.test(E)), R.push(N), T = !1;
                break;
              case "}":
                switch (M.tag) {
                  case "InterpolationInTemplate":
                    if (R.length === M.nesting) {
                      o.lastIndex = y, d = o.exec(b), y = o.lastIndex, E = d[0], d[1] === "${" ? (E = "?InterpolationInTemplate", T = !1, yield {
                        type: "TemplateMiddle",
                        value: d[0]
                      }) : (I.pop(), T = !0, yield {
                        type: "TemplateTail",
                        value: d[0],
                        closed: d[1] === "`"
                      });
                      continue;
                    }
                    break;
                  case "InterpolationInJSX":
                    if (R.length === M.nesting) {
                      I.pop(), y += 1, E = "}", yield {
                        type: "JSXPunctuator",
                        value: "}"
                      };
                      continue;
                    }
                }
                T = R.pop(), $ = T ? "?ExpressionBraceEnd" : "}";
                break;
              case "]":
                T = !0;
                break;
              case "++":
              case "--":
                $ = T ? "?PostfixIncDec" : "?UnaryIncDec";
                break;
              case "<":
                if (C && (x.test(E) || a.test(E))) {
                  I.push({ tag: "JSXTag" }), y += 1, E = "<", yield {
                    type: "JSXPunctuator",
                    value: J
                  };
                  continue;
                }
                T = !1;
                break;
              default:
                T = !1;
            }
            y = q, E = $, yield {
              type: "Punctuator",
              value: J
            };
            continue;
          }
          if (r.lastIndex = y, d = r.exec(b)) {
            switch (y = r.lastIndex, $ = d[0], d[0]) {
              case "for":
              case "if":
              case "while":
              case "with":
                E !== "." && E !== "?." && ($ = "?NonExpressionParenKeyword");
            }
            E = $, T = !a.test(d[0]), yield {
              type: d[1] === "#" ? "PrivateIdentifier" : "IdentifierName",
              value: d[0]
            };
            continue;
          }
          if (v.lastIndex = y, d = v.exec(b)) {
            y = v.lastIndex, E = d[0], T = !0, yield {
              type: "StringLiteral",
              value: d[0],
              closed: d[2] !== void 0
            };
            continue;
          }
          if (m.lastIndex = y, d = m.exec(b)) {
            y = m.lastIndex, E = d[0], T = !0, yield {
              type: "NumericLiteral",
              value: d[0]
            };
            continue;
          }
          if (o.lastIndex = y, d = o.exec(b)) {
            y = o.lastIndex, E = d[0], d[1] === "${" ? (E = "?InterpolationInTemplate", I.push({
              tag: "InterpolationInTemplate",
              nesting: R.length
            }), T = !1, yield {
              type: "TemplateHead",
              value: d[0]
            }) : (T = !0, yield {
              type: "NoSubstitutionTemplate",
              value: d[0],
              closed: d[1] === "`"
            });
            continue;
          }
          break;
        case "JSXTag":
        case "JSXTagEnd":
          if (t.lastIndex = y, d = t.exec(b)) {
            switch (y = t.lastIndex, $ = d[0], d[0]) {
              case "<":
                I.push({ tag: "JSXTag" });
                break;
              case ">":
                I.pop(), E === "/" || M.tag === "JSXTagEnd" ? ($ = "?JSX", T = !0) : I.push({ tag: "JSXChildren" });
                break;
              case "{":
                I.push({
                  tag: "InterpolationInJSX",
                  nesting: R.length
                }), $ = "?InterpolationInJSX", T = !1;
                break;
              case "/":
                E === "<" && (I.pop(), I[I.length - 1].tag === "JSXChildren" && I.pop(), I.push({ tag: "JSXTagEnd" }));
            }
            E = $, yield {
              type: "JSXPunctuator",
              value: d[0]
            };
            continue;
          }
          if (e.lastIndex = y, d = e.exec(b)) {
            y = e.lastIndex, E = d[0], yield {
              type: "JSXIdentifier",
              value: d[0]
            };
            continue;
          }
          if (n.lastIndex = y, d = n.exec(b)) {
            y = n.lastIndex, E = d[0], yield {
              type: "JSXString",
              value: d[0],
              closed: d[2] !== void 0
            };
            continue;
          }
          break;
        case "JSXChildren":
          if (i.lastIndex = y, d = i.exec(b)) {
            y = i.lastIndex, E = d[0], yield {
              type: "JSXText",
              value: d[0]
            };
            continue;
          }
          switch (b[y]) {
            case "<":
              I.push({ tag: "JSXTag" }), y++, E = "<", yield {
                type: "JSXPunctuator",
                value: "<"
              };
              continue;
            case "{":
              I.push({
                tag: "InterpolationInJSX",
                nesting: R.length
              }), y++, E = "?InterpolationInJSX", T = !1, yield {
                type: "JSXPunctuator",
                value: "{"
              };
              continue;
          }
      }
      if (A.lastIndex = y, d = A.exec(b)) {
        y = A.lastIndex, yield {
          type: "WhiteSpace",
          value: d[0]
        };
        continue;
      }
      if (s.lastIndex = y, d = s.exec(b)) {
        y = s.lastIndex, T = !1, c.test(E) && (E = "?NoLineTerminatorHere"), yield {
          type: "LineTerminatorSequence",
          value: d[0]
        };
        continue;
      }
      if (l.lastIndex = y, d = l.exec(b)) {
        y = l.lastIndex, f.test(d[0]) && (T = !1, c.test(E) && (E = "?NoLineTerminatorHere")), yield {
          type: "MultiLineComment",
          value: d[0],
          closed: d[1] !== void 0
        };
        continue;
      }
      if (P.lastIndex = y, d = P.exec(b)) {
        y = P.lastIndex, T = !1, yield {
          type: "SingleLineComment",
          value: d[0]
        };
        continue;
      }
      O = String.fromCodePoint(b.codePointAt(y)), y += O.length, E = O, T = !1, yield {
        type: M.tag.startsWith("JSX") ? "JSXInvalid" : "Invalid",
        value: O
      };
    }
  }, G;
}
yt();
var Te = {
  keyword: [
    "break",
    "case",
    "catch",
    "continue",
    "debugger",
    "default",
    "do",
    "else",
    "finally",
    "for",
    "function",
    "if",
    "return",
    "switch",
    "throw",
    "try",
    "var",
    "const",
    "while",
    "with",
    "new",
    "this",
    "super",
    "class",
    "extends",
    "export",
    "import",
    "null",
    "true",
    "false",
    "in",
    "instanceof",
    "typeof",
    "void",
    "delete"
  ],
  strict: [
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "yield"
  ]
};
new Set(Te.keyword);
new Set(Te.strict);
const de = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ht = new Uint8Array(64), gt = new Uint8Array(128);
for (let r = 0; r < de.length; r++) {
  const e = de.charCodeAt(r);
  ht[r] = e, gt[e] = r;
}
var pe;
(function(r) {
  r[r.Empty = 1] = "Empty", r[r.Hash = 2] = "Hash", r[r.Query = 3] = "Query", r[r.RelativePath = 4] = "RelativePath", r[r.AbsolutePath = 5] = "AbsolutePath", r[r.SchemeRelative = 6] = "SchemeRelative", r[r.Absolute = 7] = "Absolute";
})(pe || (pe = {}));
const Et = /^[A-Za-z]:\//;
function vt(r = "") {
  return r && r.replace(/\\/g, "/").replace(Et, (e) => e.toUpperCase());
}
const St = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
function _t() {
  return typeof process < "u" && typeof process.cwd == "function" ? process.cwd().replace(/\\/g, "/") : "/";
}
const Tt = function(...r) {
  r = r.map((n) => vt(n));
  let e = "", t = !1;
  for (let n = r.length - 1; n >= -1 && !t; n--) {
    const i = n >= 0 ? r[n] : _t();
    !i || i.length === 0 || (e = `${i}/${e}`, t = me(i));
  }
  return e = wt(e, !t), t && !me(e) ? `/${e}` : e.length > 0 ? e : ".";
};
function wt(r, e) {
  let t = "", n = 0, i = -1, a = 0, c = null;
  for (let s = 0; s <= r.length; ++s) {
    if (s < r.length)
      c = r[s];
    else {
      if (c === "/")
        break;
      c = "/";
    }
    if (c === "/") {
      if (!(i === s - 1 || a === 1)) if (a === 2) {
        if (t.length < 2 || n !== 2 || t[t.length - 1] !== "." || t[t.length - 2] !== ".") {
          if (t.length > 2) {
            const l = t.lastIndexOf("/");
            l === -1 ? (t = "", n = 0) : (t = t.slice(0, l), n = t.length - 1 - t.lastIndexOf("/")), i = s, a = 0;
            continue;
          } else if (t.length > 0) {
            t = "", n = 0, i = s, a = 0;
            continue;
          }
        }
        e && (t += t.length > 0 ? "/.." : "..", n = 2);
      } else
        t.length > 0 ? t += `/${r.slice(i + 1, s)}` : t = r.slice(i + 1, s), n = s - i - 1;
      i = s, a = 0;
    } else c === "." && a !== -1 ? ++a : a = -1;
  }
  return t;
}
const me = function(r) {
  return St.test(r);
}, we = /^\s*at .*(?:\S:\d+|\(native\))/m, kt = /^(?:eval@)?(?:\[native code\])?$/;
function ke(r) {
  if (!r.includes(":"))
    return [r];
  const t = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(r.replace(/^\(|\)$/g, ""));
  if (!t)
    return [r];
  let n = t[1];
  if (n.startsWith("async ") && (n = n.slice(6)), n.startsWith("http:") || n.startsWith("https:")) {
    const i = new URL(n);
    i.searchParams.delete("import"), i.searchParams.delete("browserv"), n = i.pathname + i.hash + i.search;
  }
  if (n.startsWith("/@fs/")) {
    const i = /^\/@fs\/[a-zA-Z]:\//.test(n);
    n = n.slice(i ? 5 : 4);
  }
  return [
    n,
    t[2] || void 0,
    t[3] || void 0
  ];
}
function Rt(r) {
  let e = r.trim();
  if (kt.test(e) || (e.includes(" > eval") && (e = e.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), !e.includes("@") && !e.includes(":")))
    return null;
  const t = /((.*".+"[^@]*)?[^@]*)(@)/, n = e.match(t), i = n && n[1] ? n[1] : void 0, [a, c, s] = ke(e.replace(t, ""));
  return !a || !c || !s ? null : {
    file: a,
    method: i || "",
    line: Number.parseInt(c),
    column: Number.parseInt(s)
  };
}
function bt(r) {
  const e = r.trim();
  return we.test(e) ? It(e) : Rt(e);
}
function It(r) {
  let e = r.trim();
  if (!we.test(e))
    return null;
  e.includes("(eval ") && (e = e.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
  let t = e.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
  const n = t.match(/ (\(.+\)$)/);
  t = n ? t.replace(n[0], "") : t;
  const [i, a, c] = ke(n ? n[1] : t);
  let s = n && t || "", l = i && ["eval", "<anonymous>"].includes(i) ? void 0 : i;
  return !l || !a || !c ? null : (s.startsWith("async ") && (s = s.slice(6)), l.startsWith("file://") && (l = l.slice(7)), l = l.startsWith("node:") || l.startsWith("internal:") ? l : Tt(l), s && (s = s.replace(/__vite_ssr_import_\d+__\./g, "")), {
    method: s,
    file: l,
    line: Number.parseInt(a),
    column: Number.parseInt(c)
  });
}
function Pt(r) {
  const e = r?.globalThisKey || "__vitest_mocker__";
  function t() {
    return typeof globalThis[e] < "u" ? globalThis[e] : new Proxy({}, { get(n, i) {
      throw new Error(`Vitest mocker was not initialized in this environment. vi.${String(i)}() is forbidden.`);
    } });
  }
  return {
    hoisted(n) {
      if (typeof n != "function")
        throw new TypeError(`vi.hoisted() expects a function, but received a ${typeof n}`);
      return n();
    },
    mock(n, i) {
      if (typeof n != "string")
        throw new TypeError(`vi.mock() expects a string path, but received a ${typeof n}`);
      const a = Y("mock");
      t().queueMock(n, a, typeof i == "function" ? () => i(() => t().importActual(n, a)) : i);
    },
    unmock(n) {
      if (typeof n != "string")
        throw new TypeError(`vi.unmock() expects a string path, but received a ${typeof n}`);
      t().queueUnmock(n, Y("unmock"));
    },
    doMock(n, i) {
      if (typeof n != "string")
        throw new TypeError(`vi.doMock() expects a string path, but received a ${typeof n}`);
      const a = Y("doMock");
      t().queueMock(n, a, typeof i == "function" ? () => i(() => t().importActual(n, a)) : i);
    },
    doUnmock(n) {
      if (typeof n != "string")
        throw new TypeError(`vi.doUnmock() expects a string path, but received a ${typeof n}`);
      t().queueUnmock(n, Y("doUnmock"));
    },
    async importActual(n) {
      return t().importActual(n, Y("importActual"));
    },
    async importMock(n) {
      return t().importMock(n, Y("importMock"));
    }
  };
}
function Y(r) {
  const t = (/* @__PURE__ */ mt({ stackTraceLimit: 5 })).split(`
`), n = t.findIndex((a) => a.includes(` at Object.${r}`) || a.includes(`${r}@`)), i = /* @__PURE__ */ bt(t[n + 1]);
  return i?.file || "";
}
const { now: ye } = Date;
class xt {
  registry = new he();
  queue = /* @__PURE__ */ new Set();
  mockedIds = /* @__PURE__ */ new Set();
  constructor(e, t, n, i) {
    this.interceptor = e, this.rpc = t, this.spyOn = n, this.config = i;
  }
  async prepare() {
    this.queue.size && await Promise.all([...this.queue.values()]);
  }
  async resolveFactoryModule(e) {
    const t = this.registry.get(e);
    if (!t || t.type !== "manual")
      throw new Error(`Mock ${e} wasn't registered. This is probably a Vitest error. Please, open a new issue with reproduction.`);
    return await t.resolve();
  }
  getFactoryModule(e) {
    const t = this.registry.get(e);
    if (!t || t.type !== "manual")
      throw new Error(`Mock ${e} wasn't registered. This is probably a Vitest error. Please, open a new issue with reproduction.`);
    if (!t.cache)
      throw new Error(`Mock ${e} wasn't resolved. This is probably a Vitest error. Please, open a new issue with reproduction.`);
    return t.cache;
  }
  async invalidate() {
    const e = Array.from(this.mockedIds);
    e.length && (await this.rpc.invalidate(e), await this.interceptor.invalidate(), this.registry.clear());
  }
  async importActual(e, t) {
    const n = await this.rpc.resolveId(e, t);
    if (n == null)
      throw new Error(`[vitest] Cannot resolve "${e}" imported from "${t}"`);
    const i = Ze(n.id), a = new URL(n.url, location.href), c = `_vitest_original&ext${i}`, s = `${a.pathname}${a.search ? `${a.search}&${c}` : `?${c}`}${a.hash}`;
    return this.wrapDynamicImport(() => import(
      /* @vite-ignore */
      s
    )).then((l) => {
      if (!n.optimized || typeof l.default > "u")
        return l;
      const f = l.default;
      return f?.__esModule ? f : {
        ...typeof f == "object" && !Array.isArray(f) || typeof f == "function" ? f : {},
        default: f
      };
    });
  }
  async importMock(e, t) {
    await this.prepare();
    const { resolvedId: n, resolvedUrl: i, redirectUrl: a } = await this.rpc.resolveMock(e, t, { mock: "auto" }), c = this.resolveMockPath(X(i));
    let s = this.registry.get(c);
    if (!s)
      if (a) {
        const l = new URL(this.resolveMockPath(X(a)), location.href).toString();
        s = new D(e, n, c, l);
      } else
        s = new W(e, n, c);
    if (s.type === "manual")
      return await s.resolve();
    if (s.type === "automock" || s.type === "autospy") {
      const l = new URL(`/@id/${n}`, location.href), f = l.search ? `${l.search}&t=${ye()}` : `?t=${ye()}`, m = await import(
        /* @vite-ignore */
        `${l.pathname}${f}&mock=${s.type}${l.hash}`
      );
      return this.mockObject(m, s.type);
    }
    return import(
      /* @vite-ignore */
      s.redirect
    );
  }
  mockObject(e, t = "automock") {
    return Ye({
      globalConstructors: {
        Object,
        Function,
        Array,
        Map,
        RegExp
      },
      spyOn: this.spyOn,
      type: t
    }, e);
  }
  queueMock(e, t, n) {
    const i = this.rpc.resolveMock(e, t, { mock: typeof n == "function" ? "factory" : n?.spy ? "spy" : "auto" }).then(async ({ redirectUrl: a, resolvedId: c, resolvedUrl: s, needsInterop: l, mockType: f }) => {
      const m = this.resolveMockPath(X(s));
      this.mockedIds.add(c);
      const h = typeof n == "function" ? async () => {
        const v = await n();
        return l ? { default: v } : v;
      } : void 0, g = typeof a == "string" ? new URL(this.resolveMockPath(X(a)), location.href).toString() : null;
      let P;
      f === "manual" ? P = this.registry.register("manual", e, c, m, h) : f === "autospy" ? P = this.registry.register("autospy", e, c, m) : f === "redirect" ? P = this.registry.register("redirect", e, c, m, g) : P = this.registry.register("automock", e, c, m), await this.interceptor.register(P);
    }).finally(() => {
      this.queue.delete(i);
    });
    this.queue.add(i);
  }
  queueUnmock(e, t) {
    const n = this.rpc.resolveId(e, t).then(async (i) => {
      if (!i)
        return;
      const a = this.resolveMockPath(X(i.url));
      this.mockedIds.add(i.id), this.registry.delete(a), await this.interceptor.delete(a);
    }).finally(() => {
      this.queue.delete(n);
    });
    this.queue.add(n);
  }
  // We need to await mock registration before importing the actual module
  // In case there is a mocked module in the import chain
  wrapDynamicImport(e) {
    return typeof e == "function" ? new Promise((n, i) => {
      this.prepare().finally(() => {
        e().then(n, i);
      });
    }) : e;
  }
  resolveMockPath(e) {
    const t = this.config, n = He("/@fs/", t.root);
    return e.startsWith(t.root) ? e.slice(t.root.length) : e.startsWith(n) ? e.slice(n.length) : e;
  }
}
const $t = /(\?|&)v=\w{8}/;
function X(r) {
  return r.replace($t, "");
}
class Mt {
  // A registry for runtime mocks (e.g., `sb.mock('path', () => ({}))`)
  mocks = new he();
  constructor() {
  }
  /**
   * Called by ModuleMocker when `sb.mock()` is executed. We just store the mock in our registry.
   * The dynamic MSW handler will pick it up on the next relevant network request. Currently, we
   * don't use this.mocks in any way. Mocks will be registered in the user's preview file and live
   * until the end. There is no way to invalidate or delete them.
   */
  async register(e) {
    this.mocks.add(e);
  }
  async delete(e) {
    this.mocks.delete(e);
  }
  async invalidate() {
    this.mocks.clear();
  }
}
const Q = (r) => {
  switch (r) {
    case "resolveId":
      return Promise.resolve({
        id: "",
        url: "",
        optimized: !1
      });
    case "resolveMock":
      return Promise.resolve({
        mockType: "dummy",
        resolvedId: "",
        resolvedUrl: "",
        redirectUrl: "",
        needsInterop: !1
      });
    case "invalidate":
      return Promise.resolve();
  }
};
class Ct extends xt {
  queueMock() {
  }
}
function At(r) {
  const e = new Ct(
    r("__vitest_mocker__"),
    {
      resolveId(t, n) {
        return Q("resolveId");
      },
      resolveMock(t, n, i) {
        return Q("resolveMock");
      },
      async invalidate(t) {
        return Q("invalidate");
      }
    },
    (...t) => globalThis.__STORYBOOK_MODULE_TEST__.spyOn(...t),
    {
      root: ""
    }
  );
  return globalThis.__vitest_mocker__ = e, Pt({
    globalThisKey: "__vitest_mocker__"
  });
}
globalThis.__STORYBOOK_MOCKER__ = At(() => new Mt());
export {
  Mt as ModuleMockerInterceptor
};
