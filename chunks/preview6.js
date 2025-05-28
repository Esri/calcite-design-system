/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
var Id = {};
const { once: Py } = __STORYBOOK_MODULE_CLIENT_LOGGER__, { FORCE_REMOUNT: Bs, STORY_RENDER_PHASE_CHANGED: Oy, SET_CURRENT_STORY: Ty } = __STORYBOOK_MODULE_CORE_EVENTS__, { addons: Sy } = __STORYBOOK_MODULE_PREVIEW_API__, { global: Le } = __STORYBOOK_MODULE_GLOBAL__;
var My = ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
}), Ay = { reset: [0, 0], bold: [1, 22, "\x1B[22m\x1B[1m"], dim: [2, 22, "\x1B[22m\x1B[2m"], italic: [3, 23], underline: [4, 24], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29], black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], gray: [90, 39], bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] }, xy = Object.entries(Ay);
function ai(e) {
  return String(e);
}
ai.open = "";
ai.close = "";
function jy(e = !1) {
  let t = typeof process < "u" ? process : void 0, r = t?.env || {}, n = t?.argv || [];
  return !("NO_COLOR" in r || n.includes("--no-color")) && ("FORCE_COLOR" in r || n.includes("--color") || t?.platform === "win32" || e && r.TERM !== "dumb" || "CI" in r) || typeof window < "u" && !!window.chrome;
}
function Ny(e = !1) {
  let t = jy(e), r = (a, i, u, c) => {
    let s = "", d = 0;
    do
      s += a.substring(d, c) + u, d = c + i.length, c = a.indexOf(i, d);
    while (~c);
    return s + a.substring(d);
  }, n = (a, i, u = a) => {
    let c = (s) => {
      let d = String(s), f = d.indexOf(i, a.length);
      return ~f ? a + r(d, i, u, f) + i : a + d + i;
    };
    return c.open = a, c.close = i, c;
  }, o = { isColorSupported: t }, l = (a) => `\x1B[${a}m`;
  for (let [a, i] of xy) o[a] = t ? n(l(i[0]), l(i[1]), i[2]) : ai;
  return o;
}
var ht = Ny(!1);
function $y(e, t) {
  let r = Object.keys(e), n = t === null ? r : r.sort(t);
  if (Object.getOwnPropertySymbols) for (let o of Object.getOwnPropertySymbols(e)) Object.getOwnPropertyDescriptor(e, o).enumerable && n.push(o);
  return n;
}
function po(e, t, r, n, o, l, a = ": ") {
  let i = "", u = 0, c = e.next();
  if (!c.done) {
    i += t.spacingOuter;
    let s = r + t.indent;
    for (; !c.done; ) {
      if (i += s, u++ === t.maxWidth) {
        i += "…";
        break;
      }
      let d = l(c.value[0], t, s, n, o), f = l(c.value[1], t, s, n, o);
      i += d + a + f, c = e.next(), c.done ? t.min || (i += ",") : i += `,${t.spacingInner}`;
    }
    i += t.spacingOuter + r;
  }
  return i;
}
function li(e, t, r, n, o, l) {
  let a = "", i = 0, u = e.next();
  if (!u.done) {
    a += t.spacingOuter;
    let c = r + t.indent;
    for (; !u.done; ) {
      if (a += c, i++ === t.maxWidth) {
        a += "…";
        break;
      }
      a += l(u.value, t, c, n, o), u = e.next(), u.done ? t.min || (a += ",") : a += `,${t.spacingInner}`;
    }
    a += t.spacingOuter + r;
  }
  return a;
}
function Vn(e, t, r, n, o, l) {
  let a = "";
  e = e instanceof ArrayBuffer ? new DataView(e) : e;
  let i = (c) => c instanceof DataView, u = i(e) ? e.byteLength : e.length;
  if (u > 0) {
    a += t.spacingOuter;
    let c = r + t.indent;
    for (let s = 0; s < u; s++) {
      if (a += c, s === t.maxWidth) {
        a += "…";
        break;
      }
      (i(e) || s in e) && (a += l(i(e) ? e.getInt8(s) : e[s], t, c, n, o)), s < u - 1 ? a += `,${t.spacingInner}` : t.min || (a += ",");
    }
    a += t.spacingOuter + r;
  }
  return a;
}
function ii(e, t, r, n, o, l) {
  let a = "", i = $y(e, t.compareKeys);
  if (i.length > 0) {
    a += t.spacingOuter;
    let u = r + t.indent;
    for (let c = 0; c < i.length; c++) {
      let s = i[c], d = l(s, t, u, n, o), f = l(e[s], t, u, n, o);
      a += `${u + d}: ${f}`, c < i.length - 1 ? a += `,${t.spacingInner}` : t.min || (a += ",");
    }
    a += t.spacingOuter + r;
  }
  return a;
}
var Iy = typeof Symbol == "function" && Symbol.for ? Symbol.for("jest.asymmetricMatcher") : 1267621, _a = " ", Ly = (e, t, r, n, o, l) => {
  let a = e.toString();
  if (a === "ArrayContaining" || a === "ArrayNotContaining") return ++n > t.maxDepth ? `[${a}]` : `${a + _a}[${Vn(e.sample, t, r, n, o, l)}]`;
  if (a === "ObjectContaining" || a === "ObjectNotContaining") return ++n > t.maxDepth ? `[${a}]` : `${a + _a}{${ii(e.sample, t, r, n, o, l)}}`;
  if (a === "StringMatching" || a === "StringNotMatching" || a === "StringContaining" || a === "StringNotContaining") return a + _a + l(e.sample, t, r, n, o);
  if (typeof e.toAsymmetricMatcher != "function") throw new TypeError(`Asymmetric matcher ${e.constructor.name} does not implement toAsymmetricMatcher()`);
  return e.toAsymmetricMatcher();
}, ky = (e) => e && e.$$typeof === Iy, By = { serialize: Ly, test: ky }, Dy = " ", Ld = /* @__PURE__ */ new Set(["DOMStringMap", "NamedNodeMap"]), Fy = /^(?:HTML\w*Collection|NodeList)$/;
function Uy(e) {
  return Ld.has(e) || Fy.test(e);
}
var Hy = (e) => e && e.constructor && !!e.constructor.name && Uy(e.constructor.name);
function Vy(e) {
  return e.constructor.name === "NamedNodeMap";
}
var zy = (e, t, r, n, o, l) => {
  let a = e.constructor.name;
  return ++n > t.maxDepth ? `[${a}]` : (t.min ? "" : a + Dy) + (Ld.has(a) ? `{${ii(Vy(e) ? [...e].reduce((i, u) => (i[u.name] = u.value, i), {}) : { ...e }, t, r, n, o, l)}}` : `[${Vn([...e], t, r, n, o, l)}]`);
}, Gy = { serialize: zy, test: Hy };
function kd(e) {
  return e.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function si(e, t, r, n, o, l, a) {
  let i = n + r.indent, u = r.colors;
  return e.map((c) => {
    let s = t[c], d = a(s, r, i, o, l);
    return typeof s != "string" && (d.includes(`
`) && (d = r.spacingOuter + i + d + r.spacingOuter + n), d = `{${d}}`), `${r.spacingInner + n + u.prop.open + c + u.prop.close}=${u.value.open}${d}${u.value.close}`;
  }).join("");
}
function ui(e, t, r, n, o, l) {
  return e.map((a) => t.spacingOuter + r + (typeof a == "string" ? Bd(a, t) : l(a, t, r, n, o))).join("");
}
function Bd(e, t) {
  let r = t.colors.content;
  return r.open + kd(e) + r.close;
}
function Wy(e, t) {
  let r = t.colors.comment;
  return `${r.open}<!--${kd(e)}-->${r.close}`;
}
function ci(e, t, r, n, o) {
  let l = n.colors.tag;
  return `${l.open}<${e}${t && l.close + t + n.spacingOuter + o + l.open}${r ? `>${l.close}${r}${n.spacingOuter}${o}${l.open}</${e}` : `${t && !n.min ? "" : " "}/`}>${l.close}`;
}
function di(e, t) {
  let r = t.colors.tag;
  return `${r.open}<${e}${r.close} …${r.open} />${r.close}`;
}
var Ky = 1, Dd = 3, Fd = 8, Ud = 11, Yy = /^(?:(?:HTML|SVG)\w*)?Element$/;
function Jy(e) {
  try {
    return typeof e.hasAttribute == "function" && e.hasAttribute("is");
  } catch {
    return !1;
  }
}
function Xy(e) {
  let t = e.constructor.name, { nodeType: r, tagName: n } = e, o = typeof n == "string" && n.includes("-") || Jy(e);
  return r === Ky && (Yy.test(t) || o) || r === Dd && t === "Text" || r === Fd && t === "Comment" || r === Ud && t === "DocumentFragment";
}
var Qy = (e) => {
  var t;
  return ((t = e?.constructor) == null ? void 0 : t.name) && Xy(e);
};
function Zy(e) {
  return e.nodeType === Dd;
}
function eg(e) {
  return e.nodeType === Fd;
}
function Ra(e) {
  return e.nodeType === Ud;
}
var tg = (e, t, r, n, o, l) => {
  if (Zy(e)) return Bd(e.data, t);
  if (eg(e)) return Wy(e.data, t);
  let a = Ra(e) ? "DocumentFragment" : e.tagName.toLowerCase();
  return ++n > t.maxDepth ? di(a, t) : ci(a, si(Ra(e) ? [] : Array.from(e.attributes, (i) => i.name).sort(), Ra(e) ? {} : [...e.attributes].reduce((i, u) => (i[u.name] = u.value, i), {}), t, r + t.indent, n, o, l), ui(Array.prototype.slice.call(e.childNodes || e.children), t, r + t.indent, n, o, l), t, r);
}, rg = { serialize: tg, test: Qy }, ng = "@@__IMMUTABLE_ITERABLE__@@", og = "@@__IMMUTABLE_LIST__@@", ag = "@@__IMMUTABLE_KEYED__@@", lg = "@@__IMMUTABLE_MAP__@@", Ds = "@@__IMMUTABLE_ORDERED__@@", ig = "@@__IMMUTABLE_RECORD__@@", sg = "@@__IMMUTABLE_SEQ__@@", ug = "@@__IMMUTABLE_SET__@@", cg = "@@__IMMUTABLE_STACK__@@", gr = (e) => `Immutable.${e}`, fo = (e) => `[${e}]`, Kr = " ", Fs = "…";
function dg(e, t, r, n, o, l, a) {
  return ++n > t.maxDepth ? fo(gr(a)) : `${gr(a) + Kr}{${po(e.entries(), t, r, n, o, l)}}`;
}
function pg(e) {
  let t = 0;
  return { next() {
    if (t < e._keys.length) {
      let r = e._keys[t++];
      return { done: !1, value: [r, e.get(r)] };
    }
    return { done: !0, value: void 0 };
  } };
}
function fg(e, t, r, n, o, l) {
  let a = gr(e._name || "Record");
  return ++n > t.maxDepth ? fo(a) : `${a + Kr}{${po(pg(e), t, r, n, o, l)}}`;
}
function mg(e, t, r, n, o, l) {
  let a = gr("Seq");
  return ++n > t.maxDepth ? fo(a) : e[ag] ? `${a + Kr}{${e._iter || e._object ? po(e.entries(), t, r, n, o, l) : Fs}}` : `${a + Kr}[${e._iter || e._array || e._collection || e._iterable ? li(e.values(), t, r, n, o, l) : Fs}]`;
}
function wa(e, t, r, n, o, l, a) {
  return ++n > t.maxDepth ? fo(gr(a)) : `${gr(a) + Kr}[${li(e.values(), t, r, n, o, l)}]`;
}
var hg = (e, t, r, n, o, l) => e[lg] ? dg(e, t, r, n, o, l, e[Ds] ? "OrderedMap" : "Map") : e[og] ? wa(e, t, r, n, o, l, "List") : e[ug] ? wa(e, t, r, n, o, l, e[Ds] ? "OrderedSet" : "Set") : e[cg] ? wa(e, t, r, n, o, l, "Stack") : e[sg] ? mg(e, t, r, n, o, l) : fg(e, t, r, n, o, l), bg = (e) => e && (e[ng] === !0 || e[ig] === !0), yg = { serialize: hg, test: bg }, Ea = { exports: {} }, ie = {}, Us;
function gg() {
  if (Us) return ie;
  Us = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), a = Symbol.for("react.context"), i = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function b(h) {
    if (typeof h == "object" && h !== null) {
      var y = h.$$typeof;
      switch (y) {
        case e:
          switch (h = h.type, h) {
            case r:
            case o:
            case n:
            case c:
            case s:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case i:
                case a:
                case u:
                case f:
                case d:
                case l:
                  return h;
                default:
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return ie.ContextConsumer = a, ie.ContextProvider = l, ie.Element = e, ie.ForwardRef = u, ie.Fragment = r, ie.Lazy = f, ie.Memo = d, ie.Portal = t, ie.Profiler = o, ie.StrictMode = n, ie.Suspense = c, ie.SuspenseList = s, ie.isAsyncMode = function() {
    return !1;
  }, ie.isConcurrentMode = function() {
    return !1;
  }, ie.isContextConsumer = function(h) {
    return b(h) === a;
  }, ie.isContextProvider = function(h) {
    return b(h) === l;
  }, ie.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, ie.isForwardRef = function(h) {
    return b(h) === u;
  }, ie.isFragment = function(h) {
    return b(h) === r;
  }, ie.isLazy = function(h) {
    return b(h) === f;
  }, ie.isMemo = function(h) {
    return b(h) === d;
  }, ie.isPortal = function(h) {
    return b(h) === t;
  }, ie.isProfiler = function(h) {
    return b(h) === o;
  }, ie.isStrictMode = function(h) {
    return b(h) === n;
  }, ie.isSuspense = function(h) {
    return b(h) === c;
  }, ie.isSuspenseList = function(h) {
    return b(h) === s;
  }, ie.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === r || h === o || h === n || h === c || h === s || h === p || typeof h == "object" && h !== null && (h.$$typeof === f || h.$$typeof === d || h.$$typeof === l || h.$$typeof === a || h.$$typeof === u || h.$$typeof === m || h.getModuleId !== void 0);
  }, ie.typeOf = b, ie;
}
var ce = {}, Hs;
function vg() {
  return Hs || (Hs = 1, Id.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), a = Symbol.for("react.context"), i = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m = !1, b = !1, h = !1, y = !1, g = !1, q;
    q = Symbol.for("react.module.reference");
    function C(I) {
      return !!(typeof I == "string" || typeof I == "function" || I === r || I === o || g || I === n || I === c || I === s || y || I === p || m || b || h || typeof I == "object" && I !== null && (I.$$typeof === f || I.$$typeof === d || I.$$typeof === l || I.$$typeof === a || I.$$typeof === u || I.$$typeof === q || I.getModuleId !== void 0));
    }
    function E(I) {
      if (typeof I == "object" && I !== null) {
        var le = I.$$typeof;
        switch (le) {
          case e:
            var fe = I.type;
            switch (fe) {
              case r:
              case o:
              case n:
              case c:
              case s:
                return fe;
              default:
                var ge = fe && fe.$$typeof;
                switch (ge) {
                  case i:
                  case a:
                  case u:
                  case f:
                  case d:
                  case l:
                    return ge;
                  default:
                    return le;
                }
            }
          case t:
            return le;
        }
      }
    }
    var _ = a, v = l, w = e, P = u, j = r, $ = f, k = d, L = t, S = o, B = n, z = c, Y = s, K = !1, Z = !1;
    function he(I) {
      return K || (K = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function ue(I) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(I) {
      return E(I) === a;
    }
    function D(I) {
      return E(I) === l;
    }
    function F(I) {
      return typeof I == "object" && I !== null && I.$$typeof === e;
    }
    function W(I) {
      return E(I) === u;
    }
    function V(I) {
      return E(I) === r;
    }
    function ee(I) {
      return E(I) === f;
    }
    function ne(I) {
      return E(I) === d;
    }
    function Ie(I) {
      return E(I) === t;
    }
    function A(I) {
      return E(I) === o;
    }
    function G(I) {
      return E(I) === n;
    }
    function H(I) {
      return E(I) === c;
    }
    function Q(I) {
      return E(I) === s;
    }
    ce.ContextConsumer = _, ce.ContextProvider = v, ce.Element = w, ce.ForwardRef = P, ce.Fragment = j, ce.Lazy = $, ce.Memo = k, ce.Portal = L, ce.Profiler = S, ce.StrictMode = B, ce.Suspense = z, ce.SuspenseList = Y, ce.isAsyncMode = he, ce.isConcurrentMode = ue, ce.isContextConsumer = U, ce.isContextProvider = D, ce.isElement = F, ce.isForwardRef = W, ce.isFragment = V, ce.isLazy = ee, ce.isMemo = ne, ce.isPortal = Ie, ce.isProfiler = A, ce.isStrictMode = G, ce.isSuspense = H, ce.isSuspenseList = Q, ce.isValidElementType = C, ce.typeOf = E;
  }()), ce;
}
var Vs;
function _g() {
  return Vs || (Vs = 1, Id.NODE_ENV === "production" ? Ea.exports = gg() : Ea.exports = vg()), Ea.exports;
}
var Ut = _g();
function Hd(e, t = []) {
  if (Array.isArray(e)) for (let r of e) Hd(r, t);
  else e != null && e !== !1 && e !== "" && t.push(e);
  return t;
}
function zs(e) {
  let t = e.type;
  if (typeof t == "string") return t;
  if (typeof t == "function") return t.displayName || t.name || "Unknown";
  if (Ut.isFragment(e)) return "React.Fragment";
  if (Ut.isSuspense(e)) return "React.Suspense";
  if (typeof t == "object" && t !== null) {
    if (Ut.isContextProvider(e)) return "Context.Provider";
    if (Ut.isContextConsumer(e)) return "Context.Consumer";
    if (Ut.isForwardRef(e)) {
      if (t.displayName) return t.displayName;
      let r = t.render.displayName || t.render.name || "";
      return r === "" ? "ForwardRef" : `ForwardRef(${r})`;
    }
    if (Ut.isMemo(e)) {
      let r = t.displayName || t.type.displayName || t.type.name || "";
      return r === "" ? "Memo" : `Memo(${r})`;
    }
  }
  return "UNDEFINED";
}
function Rg(e) {
  let { props: t } = e;
  return Object.keys(t).filter((r) => r !== "children" && t[r] !== void 0).sort();
}
var wg = (e, t, r, n, o, l) => ++n > t.maxDepth ? di(zs(e), t) : ci(zs(e), si(Rg(e), e.props, t, r + t.indent, n, o, l), ui(Hd(e.props.children), t, r + t.indent, n, o, l), t, r), Eg = (e) => e != null && Ut.isElement(e), Cg = { serialize: wg, test: Eg }, qg = typeof Symbol == "function" && Symbol.for ? Symbol.for("react.test.json") : 245830487;
function Pg(e) {
  let { props: t } = e;
  return t ? Object.keys(t).filter((r) => t[r] !== void 0).sort() : [];
}
var Og = (e, t, r, n, o, l) => ++n > t.maxDepth ? di(e.type, t) : ci(e.type, e.props ? si(Pg(e), e.props, t, r + t.indent, n, o, l) : "", e.children ? ui(e.children, t, r + t.indent, n, o, l) : "", t, r), Tg = (e) => e && e.$$typeof === qg, Sg = { serialize: Og, test: Tg }, Vd = Object.prototype.toString, Mg = Date.prototype.toISOString, Ag = Error.prototype.toString, Gs = RegExp.prototype.toString;
function Ca(e) {
  return typeof e.constructor == "function" && e.constructor.name || "Object";
}
function xg(e) {
  return typeof window < "u" && e === window;
}
var jg = /^Symbol\((.*)\)(.*)$/, Ng = /\n/g, zd = class extends Error {
  constructor(t, r) {
    super(t), this.stack = r, this.name = this.constructor.name;
  }
};
function $g(e) {
  return e === "[object Array]" || e === "[object ArrayBuffer]" || e === "[object DataView]" || e === "[object Float32Array]" || e === "[object Float64Array]" || e === "[object Int8Array]" || e === "[object Int16Array]" || e === "[object Int32Array]" || e === "[object Uint8Array]" || e === "[object Uint8ClampedArray]" || e === "[object Uint16Array]" || e === "[object Uint32Array]";
}
function Ig(e) {
  return Object.is(e, -0) ? "-0" : String(e);
}
function Lg(e) {
  return `${e}n`;
}
function Ws(e, t) {
  return t ? `[Function ${e.name || "anonymous"}]` : "[Function]";
}
function Ks(e) {
  return String(e).replace(jg, "Symbol($1)");
}
function Ys(e) {
  return `[${Ag.call(e)}]`;
}
function Gd(e, t, r, n) {
  if (e === !0 || e === !1) return `${e}`;
  if (e === void 0) return "undefined";
  if (e === null) return "null";
  let o = typeof e;
  if (o === "number") return Ig(e);
  if (o === "bigint") return Lg(e);
  if (o === "string") return n ? `"${e.replaceAll(/"|\\/g, "\\$&")}"` : `"${e}"`;
  if (o === "function") return Ws(e, t);
  if (o === "symbol") return Ks(e);
  let l = Vd.call(e);
  return l === "[object WeakMap]" ? "WeakMap {}" : l === "[object WeakSet]" ? "WeakSet {}" : l === "[object Function]" || l === "[object GeneratorFunction]" ? Ws(e, t) : l === "[object Symbol]" ? Ks(e) : l === "[object Date]" ? Number.isNaN(+e) ? "Date { NaN }" : Mg.call(e) : l === "[object Error]" ? Ys(e) : l === "[object RegExp]" ? r ? Gs.call(e).replaceAll(/[$()*+.?[\\\]^{|}]/g, "\\$&") : Gs.call(e) : e instanceof Error ? Ys(e) : null;
}
function Wd(e, t, r, n, o, l) {
  if (o.includes(e)) return "[Circular]";
  o = [...o], o.push(e);
  let a = ++n > t.maxDepth, i = t.min;
  if (t.callToJSON && !a && e.toJSON && typeof e.toJSON == "function" && !l) return Mt(e.toJSON(), t, r, n, o, !0);
  let u = Vd.call(e);
  return u === "[object Arguments]" ? a ? "[Arguments]" : `${i ? "" : "Arguments "}[${Vn(e, t, r, n, o, Mt)}]` : $g(u) ? a ? `[${e.constructor.name}]` : `${i || !t.printBasicPrototype && e.constructor.name === "Array" ? "" : `${e.constructor.name} `}[${Vn(e, t, r, n, o, Mt)}]` : u === "[object Map]" ? a ? "[Map]" : `Map {${po(e.entries(), t, r, n, o, Mt, " => ")}}` : u === "[object Set]" ? a ? "[Set]" : `Set {${li(e.values(), t, r, n, o, Mt)}}` : a || xg(e) ? `[${Ca(e)}]` : `${i || !t.printBasicPrototype && Ca(e) === "Object" ? "" : `${Ca(e)} `}{${ii(e, t, r, n, o, Mt)}}`;
}
function kg(e) {
  return e.serialize != null;
}
function Kd(e, t, r, n, o, l) {
  let a;
  try {
    a = kg(e) ? e.serialize(t, r, n, o, l, Mt) : e.print(t, (i) => Mt(i, r, n, o, l), (i) => {
      let u = n + r.indent;
      return u + i.replaceAll(Ng, `
${u}`);
    }, { edgeSpacing: r.spacingOuter, min: r.min, spacing: r.spacingInner }, r.colors);
  } catch (i) {
    throw new zd(i.message, i.stack);
  }
  if (typeof a != "string") throw new TypeError(`pretty-format: Plugin must return type "string" but instead returned "${typeof a}".`);
  return a;
}
function Yd(e, t) {
  for (let r of e) try {
    if (r.test(t)) return r;
  } catch (n) {
    throw new zd(n.message, n.stack);
  }
  return null;
}
function Mt(e, t, r, n, o, l) {
  let a = Yd(t.plugins, e);
  if (a !== null) return Kd(a, e, t, r, n, o);
  let i = Gd(e, t.printFunctionName, t.escapeRegex, t.escapeString);
  return i !== null ? i : Wd(e, t, r, n, o, l);
}
var pi = { comment: "gray", content: "reset", prop: "yellow", tag: "cyan", value: "green" }, Jd = Object.keys(pi), Je = { callToJSON: !0, compareKeys: void 0, escapeRegex: !1, escapeString: !0, highlight: !1, indent: 2, maxDepth: Number.POSITIVE_INFINITY, maxWidth: Number.POSITIVE_INFINITY, min: !1, plugins: [], printBasicPrototype: !0, printFunctionName: !0, theme: pi };
function Bg(e) {
  for (let t of Object.keys(e)) if (!Object.prototype.hasOwnProperty.call(Je, t)) throw new Error(`pretty-format: Unknown option "${t}".`);
  if (e.min && e.indent !== void 0 && e.indent !== 0) throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
}
function Dg() {
  return Jd.reduce((e, t) => {
    let r = pi[t], n = r && ht[r];
    if (n && typeof n.close == "string" && typeof n.open == "string") e[t] = n;
    else throw new Error(`pretty-format: Option "theme" has a key "${t}" whose value "${r}" is undefined in ansi-styles.`);
    return e;
  }, /* @__PURE__ */ Object.create(null));
}
function Fg() {
  return Jd.reduce((e, t) => (e[t] = { close: "", open: "" }, e), /* @__PURE__ */ Object.create(null));
}
function Xd(e) {
  return e?.printFunctionName ?? Je.printFunctionName;
}
function Qd(e) {
  return e?.escapeRegex ?? Je.escapeRegex;
}
function Zd(e) {
  return e?.escapeString ?? Je.escapeString;
}
function Js(e) {
  return { callToJSON: e?.callToJSON ?? Je.callToJSON, colors: e?.highlight ? Dg() : Fg(), compareKeys: typeof e?.compareKeys == "function" || e?.compareKeys === null ? e.compareKeys : Je.compareKeys, escapeRegex: Qd(e), escapeString: Zd(e), indent: e?.min ? "" : Ug(e?.indent ?? Je.indent), maxDepth: e?.maxDepth ?? Je.maxDepth, maxWidth: e?.maxWidth ?? Je.maxWidth, min: e?.min ?? Je.min, plugins: e?.plugins ?? Je.plugins, printBasicPrototype: e?.printBasicPrototype ?? !0, printFunctionName: Xd(e), spacingInner: e?.min ? " " : `
`, spacingOuter: e?.min ? "" : `
` };
}
function Ug(e) {
  return Array.from({ length: e + 1 }).join(" ");
}
function at(e, t) {
  if (t && (Bg(t), t.plugins)) {
    let n = Yd(t.plugins, e);
    if (n !== null) return Kd(n, e, Js(t), "", 0, []);
  }
  let r = Gd(e, Xd(t), Qd(t), Zd(t));
  return r !== null ? r : Wd(e, Js(t), "", 0, []);
}
var ep = { AsymmetricMatcher: By, DOMCollection: Gy, DOMElement: rg, Immutable: yg, ReactElement: Cg, ReactTestComponent: Sg }, Xs = { bold: ["1", "22"], dim: ["2", "22"], italic: ["3", "23"], underline: ["4", "24"], inverse: ["7", "27"], hidden: ["8", "28"], strike: ["9", "29"], black: ["30", "39"], red: ["31", "39"], green: ["32", "39"], yellow: ["33", "39"], blue: ["34", "39"], magenta: ["35", "39"], cyan: ["36", "39"], white: ["37", "39"], brightblack: ["30;1", "39"], brightred: ["31;1", "39"], brightgreen: ["32;1", "39"], brightyellow: ["33;1", "39"], brightblue: ["34;1", "39"], brightmagenta: ["35;1", "39"], brightcyan: ["36;1", "39"], brightwhite: ["37;1", "39"], grey: ["90", "39"] }, Hg = { special: "cyan", number: "yellow", bigint: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", symbol: "green", date: "magenta", regexp: "red" }, vr = "…";
function Vg(e, t) {
  let r = Xs[Hg[t]] || Xs[t] || "";
  return r ? `\x1B[${r[0]}m${String(e)}\x1B[${r[1]}m` : String(e);
}
function zg({ showHidden: e = !1, depth: t = 2, colors: r = !1, customInspect: n = !0, showProxy: o = !1, maxArrayLength: l = 1 / 0, breakLength: a = 1 / 0, seen: i = [], truncate: u = 1 / 0, stylize: c = String } = {}, s) {
  let d = { showHidden: !!e, depth: Number(t), colors: !!r, customInspect: !!n, showProxy: !!o, maxArrayLength: Number(l), breakLength: Number(a), truncate: Number(u), seen: i, inspect: s, stylize: c };
  return d.colors && (d.stylize = Vg), d;
}
function Gg(e) {
  return e >= "\uD800" && e <= "\uDBFF";
}
function kt(e, t, r = vr) {
  e = String(e);
  let n = r.length, o = e.length;
  if (n > t && o > n) return r;
  if (o > t && o > n) {
    let l = t - n;
    return l > 0 && Gg(e[l - 1]) && (l = l - 1), `${e.slice(0, l)}${r}`;
  }
  return e;
}
function tt(e, t, r, n = ", ") {
  r = r || t.inspect;
  let o = e.length;
  if (o === 0) return "";
  let l = t.truncate, a = "", i = "", u = "";
  for (let c = 0; c < o; c += 1) {
    let s = c + 1 === e.length, d = c + 2 === e.length;
    u = `${vr}(${e.length - c})`;
    let f = e[c];
    t.truncate = l - a.length - (s ? 0 : n.length);
    let p = i || r(f, t) + (s ? "" : n), m = a.length + p.length, b = m + u.length;
    if (s && m > l && a.length + u.length <= l || !s && !d && b > l || (i = s ? "" : r(e[c + 1], t) + (d ? "" : n), !s && d && b > l && m + i.length > l)) break;
    if (a += p, !s && !d && m + i.length >= l) {
      u = `${vr}(${e.length - c - 1})`;
      break;
    }
    u = "";
  }
  return `${a}${u}`;
}
function Wg(e) {
  return e.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/) ? e : JSON.stringify(e).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
function Yr([e, t], r) {
  return r.truncate -= 2, typeof e == "string" ? e = Wg(e) : typeof e != "number" && (e = `[${r.inspect(e, r)}]`), r.truncate -= e.length, t = r.inspect(t, r), `${e}: ${t}`;
}
function Kg(e, t) {
  let r = Object.keys(e).slice(e.length);
  if (!e.length && !r.length) return "[]";
  t.truncate -= 4;
  let n = tt(e, t);
  t.truncate -= n.length;
  let o = "";
  return r.length && (o = tt(r.map((l) => [l, e[l]]), t, Yr)), `[ ${n}${o ? `, ${o}` : ""} ]`;
}
var Yg = (e) => typeof Buffer == "function" && e instanceof Buffer ? "Buffer" : e[Symbol.toStringTag] ? e[Symbol.toStringTag] : e.constructor.name;
function dt(e, t) {
  let r = Yg(e);
  t.truncate -= r.length + 4;
  let n = Object.keys(e).slice(e.length);
  if (!e.length && !n.length) return `${r}[]`;
  let o = "";
  for (let a = 0; a < e.length; a++) {
    let i = `${t.stylize(kt(e[a], t.truncate), "number")}${a === e.length - 1 ? "" : ", "}`;
    if (t.truncate -= i.length, e[a] !== e.length && t.truncate <= 3) {
      o += `${vr}(${e.length - e[a] + 1})`;
      break;
    }
    o += i;
  }
  let l = "";
  return n.length && (l = tt(n.map((a) => [a, e[a]]), t, Yr)), `${r}[ ${o}${l ? `, ${l}` : ""} ]`;
}
function Jg(e, t) {
  let r = e.toJSON();
  if (r === null) return "Invalid Date";
  let n = r.split("T"), o = n[0];
  return t.stylize(`${o}T${kt(n[1], t.truncate - o.length - 1)}`, "date");
}
function Qs(e, t) {
  let r = e[Symbol.toStringTag] || "Function", n = e.name;
  return n ? t.stylize(`[${r} ${kt(n, t.truncate - 11)}]`, "special") : t.stylize(`[${r}]`, "special");
}
function Xg([e, t], r) {
  return r.truncate -= 4, e = r.inspect(e, r), r.truncate -= e.length, t = r.inspect(t, r), `${e} => ${t}`;
}
function Qg(e) {
  let t = [];
  return e.forEach((r, n) => {
    t.push([n, r]);
  }), t;
}
function Zg(e, t) {
  return e.size - 1 <= 0 ? "Map{}" : (t.truncate -= 7, `Map{ ${tt(Qg(e), t, Xg)} }`);
}
var ev = Number.isNaN || ((e) => e !== e);
function Zs(e, t) {
  return ev(e) ? t.stylize("NaN", "number") : e === 1 / 0 ? t.stylize("Infinity", "number") : e === -1 / 0 ? t.stylize("-Infinity", "number") : e === 0 ? t.stylize(1 / e === 1 / 0 ? "+0" : "-0", "number") : t.stylize(kt(String(e), t.truncate), "number");
}
function eu(e, t) {
  let r = kt(e.toString(), t.truncate - 1);
  return r !== vr && (r += "n"), t.stylize(r, "bigint");
}
function tv(e, t) {
  let r = e.toString().split("/")[2], n = t.truncate - (2 + r.length), o = e.source;
  return t.stylize(`/${kt(o, n)}/${r}`, "regexp");
}
function rv(e) {
  let t = [];
  return e.forEach((r) => {
    t.push(r);
  }), t;
}
function nv(e, t) {
  return e.size === 0 ? "Set{}" : (t.truncate -= 7, `Set{ ${tt(rv(e), t)} }`);
}
var tu = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g"), ov = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "'": "\\'", "\\": "\\\\" }, av = 16;
function lv(e) {
  return ov[e] || `\\u${`0000${e.charCodeAt(0).toString(av)}`.slice(-4)}`;
}
function ru(e, t) {
  return tu.test(e) && (e = e.replace(tu, lv)), t.stylize(`'${kt(e, t.truncate - 2)}'`, "string");
}
function nu(e) {
  return "description" in Symbol.prototype ? e.description ? `Symbol(${e.description})` : "Symbol()" : e.toString();
}
var tp = () => "Promise{…}";
try {
  let { getPromiseDetails: e, kPending: t, kRejected: r } = process.binding("util");
  Array.isArray(e(Promise.resolve())) && (tp = (n, o) => {
    let [l, a] = e(n);
    return l === t ? "Promise{<pending>}" : `Promise${l === r ? "!" : ""}{${o.inspect(a, o)}}`;
  });
} catch {
}
var iv = tp;
function $n(e, t) {
  let r = Object.getOwnPropertyNames(e), n = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : [];
  if (r.length === 0 && n.length === 0) return "{}";
  if (t.truncate -= 4, t.seen = t.seen || [], t.seen.includes(e)) return "[Circular]";
  t.seen.push(e);
  let o = tt(r.map((i) => [i, e[i]]), t, Yr), l = tt(n.map((i) => [i, e[i]]), t, Yr);
  t.seen.pop();
  let a = "";
  return o && l && (a = ", "), `{ ${o}${a}${l} }`;
}
var qa = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : !1;
function sv(e, t) {
  let r = "";
  return qa && qa in e && (r = e[qa]), r = r || e.constructor.name, (!r || r === "_class") && (r = "<Anonymous Class>"), t.truncate -= r.length, `${r}${$n(e, t)}`;
}
function uv(e, t) {
  return e.length === 0 ? "Arguments[]" : (t.truncate -= 13, `Arguments[ ${tt(e, t)} ]`);
}
var cv = ["stack", "line", "column", "name", "message", "fileName", "lineNumber", "columnNumber", "number", "description", "cause"];
function dv(e, t) {
  let r = Object.getOwnPropertyNames(e).filter((a) => cv.indexOf(a) === -1), n = e.name;
  t.truncate -= n.length;
  let o = "";
  if (typeof e.message == "string" ? o = kt(e.message, t.truncate) : r.unshift("message"), o = o ? `: ${o}` : "", t.truncate -= o.length + 5, t.seen = t.seen || [], t.seen.includes(e)) return "[Circular]";
  t.seen.push(e);
  let l = tt(r.map((a) => [a, e[a]]), t, Yr);
  return `${n}${o}${l ? ` { ${l} }` : ""}`;
}
function pv([e, t], r) {
  return r.truncate -= 3, t ? `${r.stylize(String(e), "yellow")}=${r.stylize(`"${t}"`, "string")}` : `${r.stylize(String(e), "yellow")}`;
}
function Qa(e, t) {
  return tt(e, t, rp, `
`);
}
function rp(e, t) {
  let r = e.getAttributeNames(), n = e.tagName.toLowerCase(), o = t.stylize(`<${n}`, "special"), l = t.stylize(">", "special"), a = t.stylize(`</${n}>`, "special");
  t.truncate -= n.length * 2 + 5;
  let i = "";
  r.length > 0 && (i += " ", i += tt(r.map((s) => [s, e.getAttribute(s)]), t, pv, " ")), t.truncate -= i.length;
  let u = t.truncate, c = Qa(e.children, t);
  return c && c.length > u && (c = `${vr}(${e.children.length})`), `${o}${i}${l}${c}${a}`;
}
var fv = typeof Symbol == "function" && typeof Symbol.for == "function", Pa = fv ? Symbol.for("chai/inspect") : "@@chai/inspect", ar = !1;
try {
  let e = My("util");
  ar = e.inspect ? e.inspect.custom : !1;
} catch {
  ar = !1;
}
var ou = /* @__PURE__ */ new WeakMap(), au = {}, lu = { undefined: (e, t) => t.stylize("undefined", "undefined"), null: (e, t) => t.stylize("null", "null"), boolean: (e, t) => t.stylize(String(e), "boolean"), Boolean: (e, t) => t.stylize(String(e), "boolean"), number: Zs, Number: Zs, bigint: eu, BigInt: eu, string: ru, String: ru, function: Qs, Function: Qs, symbol: nu, Symbol: nu, Array: Kg, Date: Jg, Map: Zg, Set: nv, RegExp: tv, Promise: iv, WeakSet: (e, t) => t.stylize("WeakSet{…}", "special"), WeakMap: (e, t) => t.stylize("WeakMap{…}", "special"), Arguments: uv, Int8Array: dt, Uint8Array: dt, Uint8ClampedArray: dt, Int16Array: dt, Uint16Array: dt, Int32Array: dt, Uint32Array: dt, Float32Array: dt, Float64Array: dt, Generator: () => "", DataView: () => "", ArrayBuffer: () => "", Error: dv, HTMLCollection: Qa, NodeList: Qa }, mv = (e, t, r) => Pa in e && typeof e[Pa] == "function" ? e[Pa](t) : ar && ar in e && typeof e[ar] == "function" ? e[ar](t.depth, t) : "inspect" in e && typeof e.inspect == "function" ? e.inspect(t.depth, t) : "constructor" in e && ou.has(e.constructor) ? ou.get(e.constructor)(e, t) : au[r] ? au[r](e, t) : "", hv = Object.prototype.toString;
function Za(e, t = {}) {
  let r = zg(t, Za), { customInspect: n } = r, o = e === null ? "null" : typeof e;
  if (o === "object" && (o = hv.call(e).slice(8, -1)), o in lu) return lu[o](e, r);
  if (n && e) {
    let a = mv(e, r, o);
    if (a) return typeof a == "string" ? a : Za(a, r);
  }
  let l = e ? Object.getPrototypeOf(e) : !1;
  return l === Object.prototype || l === null ? $n(e, r) : e && typeof HTMLElement == "function" && e instanceof HTMLElement ? rp(e, r) : "constructor" in e ? e.constructor !== Object ? sv(e, r) : $n(e, r) : e === Object(e) ? $n(e, r) : r.stylize(String(e), o);
}
var { AsymmetricMatcher: bv, DOMCollection: yv, DOMElement: gv, Immutable: vv, ReactElement: _v, ReactTestComponent: Rv } = ep, iu = [Rv, _v, gv, yv, vv, bv];
function Jr(e, t = 10, { maxLength: r, ...n } = {}) {
  let o = r ?? 1e4, l;
  try {
    l = at(e, { maxDepth: t, escapeString: !1, plugins: iu, ...n });
  } catch {
    l = at(e, { callToJSON: !1, maxDepth: t, escapeString: !1, plugins: iu, ...n });
  }
  return l.length >= o && t > 1 ? Jr(e, Math.floor(t / 2)) : l;
}
var wv = /%[sdjifoOc%]/g;
function Ev(...e) {
  if (typeof e[0] != "string") {
    let l = [];
    for (let a = 0; a < e.length; a++) l.push(Lr(e[a], { depth: 0, colors: !1 }));
    return l.join(" ");
  }
  let t = e.length, r = 1, n = e[0], o = String(n).replace(wv, (l) => {
    if (l === "%%") return "%";
    if (r >= t) return l;
    switch (l) {
      case "%s": {
        let a = e[r++];
        return typeof a == "bigint" ? `${a.toString()}n` : typeof a == "number" && a === 0 && 1 / a < 0 ? "-0" : typeof a == "object" && a !== null ? Lr(a, { depth: 0, colors: !1 }) : String(a);
      }
      case "%d": {
        let a = e[r++];
        return typeof a == "bigint" ? `${a.toString()}n` : Number(a).toString();
      }
      case "%i": {
        let a = e[r++];
        return typeof a == "bigint" ? `${a.toString()}n` : Number.parseInt(String(a)).toString();
      }
      case "%f":
        return Number.parseFloat(String(e[r++])).toString();
      case "%o":
        return Lr(e[r++], { showHidden: !0, showProxy: !0 });
      case "%O":
        return Lr(e[r++]);
      case "%c":
        return r++, "";
      case "%j":
        try {
          return JSON.stringify(e[r++]);
        } catch (a) {
          let i = a.message;
          if (i.includes("circular structure") || i.includes("cyclic structures") || i.includes("cyclic object")) return "[Circular]";
          throw a;
        }
      default:
        return l;
    }
  });
  for (let l = e[r]; r < t; l = e[++r]) l === null || typeof l != "object" ? o += ` ${l}` : o += ` ${Lr(l)}`;
  return o;
}
function Lr(e, t = {}) {
  return t.truncate === 0 && (t.truncate = Number.POSITIVE_INFINITY), Za(e, t);
}
function Cv(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function qv(e) {
  return e === Object.prototype || e === Function.prototype || e === RegExp.prototype;
}
function el(e) {
  return Object.prototype.toString.apply(e).slice(8, -1);
}
function Pv(e, t) {
  let r = typeof t == "function" ? t : (n) => t.add(n);
  Object.getOwnPropertyNames(e).forEach(r), Object.getOwnPropertySymbols(e).forEach(r);
}
function np(e) {
  let t = /* @__PURE__ */ new Set();
  return qv(e) ? [] : (Pv(e, t), Array.from(t));
}
var op = { forceWritable: !1 };
function su(e, t = op) {
  return tl(e, /* @__PURE__ */ new WeakMap(), t);
}
function tl(e, t, r = op) {
  let n, o;
  if (t.has(e)) return t.get(e);
  if (Array.isArray(e)) {
    for (o = Array.from({ length: n = e.length }), t.set(e, o); n--; ) o[n] = tl(e[n], t, r);
    return o;
  }
  if (Object.prototype.toString.call(e) === "[object Object]") {
    o = Object.create(Object.getPrototypeOf(e)), t.set(e, o);
    let l = np(e);
    for (let a of l) {
      let i = Object.getOwnPropertyDescriptor(e, a);
      if (!i) continue;
      let u = tl(e[a], t, r);
      r.forceWritable ? Object.defineProperty(o, a, { enumerable: i.enumerable, configurable: !0, writable: !0, value: u }) : "get" in i ? Object.defineProperty(o, a, { ...i, get() {
        return u;
      } }) : Object.defineProperty(o, a, { ...i, value: u });
    }
    return o;
  }
  return e;
}
function uu(e) {
  if (e === void 0) return "undefined";
  if (e === null) return "null";
  if (Array.isArray(e)) return "array";
  if (typeof e == "boolean") return "boolean";
  if (typeof e == "function") return "function";
  if (typeof e == "number") return "number";
  if (typeof e == "string") return "string";
  if (typeof e == "bigint") return "bigint";
  if (typeof e == "object") {
    if (e != null) {
      if (e.constructor === RegExp) return "regexp";
      if (e.constructor === Map) return "map";
      if (e.constructor === Set) return "set";
      if (e.constructor === Date) return "date";
    }
    return "object";
  } else if (typeof e == "symbol") return "symbol";
  throw new Error(`value of unknown type: ${e}`);
}
var Me = -1, Oe = 1, we = 0, ve = class {
  0;
  1;
  constructor(t, r) {
    this[0] = t, this[1] = r;
  }
}, Ov = function(e, t) {
  if (!e || !t || e.charAt(0) !== t.charAt(0)) return 0;
  let r = 0, n = Math.min(e.length, t.length), o = n, l = 0;
  for (; r < o; ) e.substring(l, o) === t.substring(l, o) ? (r = o, l = r) : n = o, o = Math.floor((n - r) / 2 + r);
  return o;
}, ap = function(e, t) {
  if (!e || !t || e.charAt(e.length - 1) !== t.charAt(t.length - 1)) return 0;
  let r = 0, n = Math.min(e.length, t.length), o = n, l = 0;
  for (; r < o; ) e.substring(e.length - o, e.length - l) === t.substring(t.length - o, t.length - l) ? (r = o, l = r) : n = o, o = Math.floor((n - r) / 2 + r);
  return o;
}, cu = function(e, t) {
  let r = e.length, n = t.length;
  if (r === 0 || n === 0) return 0;
  r > n ? e = e.substring(r - n) : r < n && (t = t.substring(0, r));
  let o = Math.min(r, n);
  if (e === t) return o;
  let l = 0, a = 1;
  for (; ; ) {
    let i = e.substring(o - a), u = t.indexOf(i);
    if (u === -1) return l;
    a += u, (u === 0 || e.substring(o - a) === t.substring(0, a)) && (l = a, a++);
  }
}, Tv = function(e) {
  let t = !1, r = [], n = 0, o = null, l = 0, a = 0, i = 0, u = 0, c = 0;
  for (; l < e.length; ) e[l][0] === we ? (r[n++] = l, a = u, i = c, u = 0, c = 0, o = e[l][1]) : (e[l][0] === Oe ? u += e[l][1].length : c += e[l][1].length, o && o.length <= Math.max(a, i) && o.length <= Math.max(u, c) && (e.splice(r[n - 1], 0, new ve(Me, o)), e[r[n - 1] + 1][0] = Oe, n--, n--, l = n > 0 ? r[n - 1] : -1, a = 0, i = 0, u = 0, c = 0, o = null, t = !0)), l++;
  for (t && lp(e), Av(e), l = 1; l < e.length; ) {
    if (e[l - 1][0] === Me && e[l][0] === Oe) {
      let s = e[l - 1][1], d = e[l][1], f = cu(s, d), p = cu(d, s);
      f >= p ? (f >= s.length / 2 || f >= d.length / 2) && (e.splice(l, 0, new ve(we, d.substring(0, f))), e[l - 1][1] = s.substring(0, s.length - f), e[l + 1][1] = d.substring(f), l++) : (p >= s.length / 2 || p >= d.length / 2) && (e.splice(l, 0, new ve(we, s.substring(0, p))), e[l - 1][0] = Oe, e[l - 1][1] = d.substring(0, d.length - p), e[l + 1][0] = Me, e[l + 1][1] = s.substring(p), l++), l++;
    }
    l++;
  }
}, du = /[^a-z0-9]/i, pu = /\s/, fu = /[\r\n]/, Sv = /\n\r?\n$/, Mv = /^\r?\n\r?\n/;
function Av(e) {
  let t = 1;
  for (; t < e.length - 1; ) {
    if (e[t - 1][0] === we && e[t + 1][0] === we) {
      let r = e[t - 1][1], n = e[t][1], o = e[t + 1][1], l = ap(r, n);
      if (l) {
        let s = n.substring(n.length - l);
        r = r.substring(0, r.length - l), n = s + n.substring(0, n.length - l), o = s + o;
      }
      let a = r, i = n, u = o, c = Pn(r, n) + Pn(n, o);
      for (; n.charAt(0) === o.charAt(0); ) {
        r += n.charAt(0), n = n.substring(1) + o.charAt(0), o = o.substring(1);
        let s = Pn(r, n) + Pn(n, o);
        s >= c && (c = s, a = r, i = n, u = o);
      }
      e[t - 1][1] !== a && (a ? e[t - 1][1] = a : (e.splice(t - 1, 1), t--), e[t][1] = i, u ? e[t + 1][1] = u : (e.splice(t + 1, 1), t--));
    }
    t++;
  }
}
function lp(e) {
  e.push(new ve(we, ""));
  let t = 0, r = 0, n = 0, o = "", l = "", a;
  for (; t < e.length; ) switch (e[t][0]) {
    case Oe:
      n++, l += e[t][1], t++;
      break;
    case Me:
      r++, o += e[t][1], t++;
      break;
    case we:
      r + n > 1 ? (r !== 0 && n !== 0 && (a = Ov(l, o), a !== 0 && (t - r - n > 0 && e[t - r - n - 1][0] === we ? e[t - r - n - 1][1] += l.substring(0, a) : (e.splice(0, 0, new ve(we, l.substring(0, a))), t++), l = l.substring(a), o = o.substring(a)), a = ap(l, o), a !== 0 && (e[t][1] = l.substring(l.length - a) + e[t][1], l = l.substring(0, l.length - a), o = o.substring(0, o.length - a))), t -= r + n, e.splice(t, r + n), o.length && (e.splice(t, 0, new ve(Me, o)), t++), l.length && (e.splice(t, 0, new ve(Oe, l)), t++), t++) : t !== 0 && e[t - 1][0] === we ? (e[t - 1][1] += e[t][1], e.splice(t, 1)) : t++, n = 0, r = 0, o = "", l = "";
      break;
  }
  e[e.length - 1][1] === "" && e.pop();
  let i = !1;
  for (t = 1; t < e.length - 1; ) e[t - 1][0] === we && e[t + 1][0] === we && (e[t][1].substring(e[t][1].length - e[t - 1][1].length) === e[t - 1][1] ? (e[t][1] = e[t - 1][1] + e[t][1].substring(0, e[t][1].length - e[t - 1][1].length), e[t + 1][1] = e[t - 1][1] + e[t + 1][1], e.splice(t - 1, 1), i = !0) : e[t][1].substring(0, e[t + 1][1].length) === e[t + 1][1] && (e[t - 1][1] += e[t + 1][1], e[t][1] = e[t][1].substring(e[t + 1][1].length) + e[t + 1][1], e.splice(t + 1, 1), i = !0)), t++;
  i && lp(e);
}
function Pn(e, t) {
  if (!e || !t) return 6;
  let r = e.charAt(e.length - 1), n = t.charAt(0), o = r.match(du), l = n.match(du), a = o && r.match(pu), i = l && n.match(pu), u = a && r.match(fu), c = i && n.match(fu), s = u && e.match(Sv), d = c && t.match(Mv);
  return s || d ? 5 : u || c ? 4 : o && !a && i ? 3 : a || i ? 2 : o || l ? 1 : 0;
}
var ip = "Compared values have no visual difference.", xv = "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.", On = {}, mu;
function jv() {
  if (mu) return On;
  mu = 1, Object.defineProperty(On, "__esModule", { value: !0 }), On.default = f;
  let e = "diff-sequences", t = 0, r = (p, m, b, h, y) => {
    let g = 0;
    for (; p < m && b < h && y(p, b); ) p += 1, b += 1, g += 1;
    return g;
  }, n = (p, m, b, h, y) => {
    let g = 0;
    for (; p <= m && b <= h && y(m, h); ) m -= 1, h -= 1, g += 1;
    return g;
  }, o = (p, m, b, h, y, g, q) => {
    let C = 0, E = -p, _ = g[C], v = _;
    g[C] += r(_ + 1, m, h + _ - E + 1, b, y);
    let w = p < q ? p : q;
    for (C += 1, E += 2; C <= w; C += 1, E += 2) {
      if (C !== p && v < g[C]) _ = g[C];
      else if (_ = v + 1, m <= _) return C - 1;
      v = g[C], g[C] = _ + r(_ + 1, m, h + _ - E + 1, b, y);
    }
    return q;
  }, l = (p, m, b, h, y, g, q) => {
    let C = 0, E = p, _ = g[C], v = _;
    g[C] -= n(m, _ - 1, b, h + _ - E - 1, y);
    let w = p < q ? p : q;
    for (C += 1, E -= 2; C <= w; C += 1, E -= 2) {
      if (C !== p && g[C] < v) _ = g[C];
      else if (_ = v - 1, _ < m) return C - 1;
      v = g[C], g[C] = _ - n(m, _ - 1, b, h + _ - E - 1, y);
    }
    return q;
  }, a = (p, m, b, h, y, g, q, C, E, _, v) => {
    let w = h - m, P = b - m, j = y - h - P, $ = -j - (p - 1), k = -j + (p - 1), L = t, S = p < C ? p : C;
    for (let B = 0, z = -p; B <= S; B += 1, z += 2) {
      let Y = B === 0 || B !== p && L < q[B], K = Y ? q[B] : L, Z = Y ? K : K + 1, he = w + Z - z, ue = r(Z + 1, b, he + 1, y, g), U = Z + ue;
      if (L = q[B], q[B] = U, $ <= z && z <= k) {
        let D = (p - 1 - (z + j)) / 2;
        if (D <= _ && E[D] - 1 <= U) {
          let F = w + K - (Y ? z + 1 : z - 1), W = n(m, K, h, F, g), V = K - W, ee = F - W, ne = V + 1, Ie = ee + 1;
          v.nChangePreceding = p - 1, p - 1 === ne + Ie - m - h ? (v.aEndPreceding = m, v.bEndPreceding = h) : (v.aEndPreceding = ne, v.bEndPreceding = Ie), v.nCommonPreceding = W, W !== 0 && (v.aCommonPreceding = ne, v.bCommonPreceding = Ie), v.nCommonFollowing = ue, ue !== 0 && (v.aCommonFollowing = Z + 1, v.bCommonFollowing = he + 1);
          let A = U + 1, G = he + ue + 1;
          return v.nChangeFollowing = p - 1, p - 1 === b + y - A - G ? (v.aStartFollowing = b, v.bStartFollowing = y) : (v.aStartFollowing = A, v.bStartFollowing = G), !0;
        }
      }
    }
    return !1;
  }, i = (p, m, b, h, y, g, q, C, E, _, v) => {
    let w = y - b, P = b - m, j = y - h - P, $ = j - p, k = j + p, L = t, S = p < _ ? p : _;
    for (let B = 0, z = p; B <= S; B += 1, z -= 2) {
      let Y = B === 0 || B !== p && E[B] < L, K = Y ? E[B] : L, Z = Y ? K : K - 1, he = w + Z - z, ue = n(m, Z - 1, h, he - 1, g), U = Z - ue;
      if (L = E[B], E[B] = U, $ <= z && z <= k) {
        let D = (p + (z - j)) / 2;
        if (D <= C && U - 1 <= q[D]) {
          let F = he - ue;
          if (v.nChangePreceding = p, p === U + F - m - h ? (v.aEndPreceding = m, v.bEndPreceding = h) : (v.aEndPreceding = U, v.bEndPreceding = F), v.nCommonPreceding = ue, ue !== 0 && (v.aCommonPreceding = U, v.bCommonPreceding = F), v.nChangeFollowing = p - 1, p === 1) v.nCommonFollowing = 0, v.aStartFollowing = b, v.bStartFollowing = y;
          else {
            let W = w + K - (Y ? z - 1 : z + 1), V = r(K, b, W, y, g);
            v.nCommonFollowing = V, V !== 0 && (v.aCommonFollowing = K, v.bCommonFollowing = W);
            let ee = K + V, ne = W + V;
            p - 1 === b + y - ee - ne ? (v.aStartFollowing = b, v.bStartFollowing = y) : (v.aStartFollowing = ee, v.bStartFollowing = ne);
          }
          return !0;
        }
      }
    }
    return !1;
  }, u = (p, m, b, h, y, g, q, C, E) => {
    let _ = h - m, v = y - b, w = b - m, P = y - h, j = P - w, $ = w, k = w;
    if (q[0] = m - 1, C[0] = b, j % 2 === 0) {
      let L = (p || j) / 2, S = (w + P) / 2;
      for (let B = 1; B <= S; B += 1) if ($ = o(B, b, y, _, g, q, $), B < L) k = l(B, m, h, v, g, C, k);
      else if (i(B, m, b, h, y, g, q, $, C, k, E)) return;
    } else {
      let L = ((p || j) + 1) / 2, S = (w + P + 1) / 2, B = 1;
      for ($ = o(B, b, y, _, g, q, $), B += 1; B <= S; B += 1) if (k = l(B - 1, m, h, v, g, C, k), B < L) $ = o(B, b, y, _, g, q, $);
      else if (a(B, m, b, h, y, g, q, $, C, k, E)) return;
    }
    throw new Error(`${e}: no overlap aStart=${m} aEnd=${b} bStart=${h} bEnd=${y}`);
  }, c = (p, m, b, h, y, g, q, C, E, _) => {
    if (y - h < b - m) {
      if (g = !g, g && q.length === 1) {
        let { foundSubsequence: D, isCommon: F } = q[0];
        q[1] = { foundSubsequence: (W, V, ee) => {
          D(W, ee, V);
        }, isCommon: (W, V) => F(V, W) };
      }
      let ue = m, U = b;
      m = h, b = y, h = ue, y = U;
    }
    let { foundSubsequence: v, isCommon: w } = q[g ? 1 : 0];
    u(p, m, b, h, y, w, C, E, _);
    let { nChangePreceding: P, aEndPreceding: j, bEndPreceding: $, nCommonPreceding: k, aCommonPreceding: L, bCommonPreceding: S, nCommonFollowing: B, aCommonFollowing: z, bCommonFollowing: Y, nChangeFollowing: K, aStartFollowing: Z, bStartFollowing: he } = _;
    m < j && h < $ && c(P, m, j, h, $, g, q, C, E, _), k !== 0 && v(k, L, S), B !== 0 && v(B, z, Y), Z < b && he < y && c(K, Z, b, he, y, g, q, C, E, _);
  }, s = (p, m) => {
    if (typeof m != "number") throw new TypeError(`${e}: ${p} typeof ${typeof m} is not a number`);
    if (!Number.isSafeInteger(m)) throw new RangeError(`${e}: ${p} value ${m} is not a safe integer`);
    if (m < 0) throw new RangeError(`${e}: ${p} value ${m} is a negative integer`);
  }, d = (p, m) => {
    let b = typeof m;
    if (b !== "function") throw new TypeError(`${e}: ${p} typeof ${b} is not a function`);
  };
  function f(p, m, b, h) {
    s("aLength", p), s("bLength", m), d("isCommon", b), d("foundSubsequence", h);
    let y = r(0, p, 0, m, b);
    if (y !== 0 && h(y, 0, 0), p !== y || m !== y) {
      let g = y, q = y, C = n(g, p - 1, q, m - 1, b), E = p - C, _ = m - C, v = y + C;
      p !== v && m !== v && c(0, g, E, q, _, !1, [{ foundSubsequence: h, isCommon: b }], [t], [t], { aCommonFollowing: t, aCommonPreceding: t, aEndPreceding: t, aStartFollowing: t, bCommonFollowing: t, bCommonPreceding: t, bEndPreceding: t, bStartFollowing: t, nChangeFollowing: t, nChangePreceding: t, nCommonFollowing: t, nCommonPreceding: t }), C !== 0 && h(C, E, _);
    }
  }
  return On;
}
var Nv = jv(), sp = Cv(Nv);
function $v(e, t) {
  return e.replace(/\s+$/, (r) => t(r));
}
function fi(e, t, r, n, o, l) {
  return e.length !== 0 ? r(`${n} ${$v(e, o)}`) : n !== " " ? r(n) : t && l.length !== 0 ? r(`${n} ${l}`) : "";
}
function up(e, t, { aColor: r, aIndicator: n, changeLineTrailingSpaceColor: o, emptyFirstOrLastLinePlaceholder: l }) {
  return fi(e, t, r, n, o, l);
}
function cp(e, t, { bColor: r, bIndicator: n, changeLineTrailingSpaceColor: o, emptyFirstOrLastLinePlaceholder: l }) {
  return fi(e, t, r, n, o, l);
}
function dp(e, t, { commonColor: r, commonIndicator: n, commonLineTrailingSpaceColor: o, emptyFirstOrLastLinePlaceholder: l }) {
  return fi(e, t, r, n, o, l);
}
function hu(e, t, r, n, { patchColor: o }) {
  return o(`@@ -${e + 1},${t - e} +${r + 1},${n - r} @@`);
}
function Iv(e, t) {
  let r = e.length, n = t.contextLines, o = n + n, l = r, a = !1, i = 0, u = 0;
  for (; u !== r; ) {
    let C = u;
    for (; u !== r && e[u][0] === we; ) u += 1;
    if (C !== u) if (C === 0) u > n && (l -= u - n, a = !0);
    else if (u === r) {
      let E = u - C;
      E > n && (l -= E - n, a = !0);
    } else {
      let E = u - C;
      E > o && (l -= E - o, i += 1);
    }
    for (; u !== r && e[u][0] !== we; ) u += 1;
  }
  let c = i !== 0 || a;
  i !== 0 ? l += i + 1 : a && (l += 1);
  let s = l - 1, d = [], f = 0;
  c && d.push("");
  let p = 0, m = 0, b = 0, h = 0, y = (C) => {
    let E = d.length;
    d.push(dp(C, E === 0 || E === s, t)), b += 1, h += 1;
  }, g = (C) => {
    let E = d.length;
    d.push(up(C, E === 0 || E === s, t)), b += 1;
  }, q = (C) => {
    let E = d.length;
    d.push(cp(C, E === 0 || E === s, t)), h += 1;
  };
  for (u = 0; u !== r; ) {
    let C = u;
    for (; u !== r && e[u][0] === we; ) u += 1;
    if (C !== u) if (C === 0) {
      u > n && (C = u - n, p = C, m = C, b = p, h = m);
      for (let E = C; E !== u; E += 1) y(e[E][1]);
    } else if (u === r) {
      let E = u - C > n ? C + n : u;
      for (let _ = C; _ !== E; _ += 1) y(e[_][1]);
    } else {
      let E = u - C;
      if (E > o) {
        let _ = C + n;
        for (let w = C; w !== _; w += 1) y(e[w][1]);
        d[f] = hu(p, b, m, h, t), f = d.length, d.push("");
        let v = E - o;
        p = b + v, m = h + v, b = p, h = m;
        for (let w = u - n; w !== u; w += 1) y(e[w][1]);
      } else for (let _ = C; _ !== u; _ += 1) y(e[_][1]);
    }
    for (; u !== r && e[u][0] === Me; ) g(e[u][1]), u += 1;
    for (; u !== r && e[u][0] === Oe; ) q(e[u][1]), u += 1;
  }
  return c && (d[f] = hu(p, b, m, h, t)), d.join(`
`);
}
function Lv(e, t) {
  return e.map((r, n, o) => {
    let l = r[1], a = n === 0 || n === o.length - 1;
    switch (r[0]) {
      case Me:
        return up(l, a, t);
      case Oe:
        return cp(l, a, t);
      default:
        return dp(l, a, t);
    }
  }).join(`
`);
}
var Oa = (e) => e, pp = 5, kv = 0;
function Bv() {
  return { aAnnotation: "Expected", aColor: ht.green, aIndicator: "-", bAnnotation: "Received", bColor: ht.red, bIndicator: "+", changeColor: ht.inverse, changeLineTrailingSpaceColor: Oa, commonColor: ht.dim, commonIndicator: " ", commonLineTrailingSpaceColor: Oa, compareKeys: void 0, contextLines: pp, emptyFirstOrLastLinePlaceholder: "", expand: !0, includeChangeCounts: !1, omitAnnotationLines: !1, patchColor: ht.yellow, truncateThreshold: kv, truncateAnnotation: "... Diff result is truncated", truncateAnnotationColor: Oa };
}
function Dv(e) {
  return e && typeof e == "function" ? e : void 0;
}
function Fv(e) {
  return typeof e == "number" && Number.isSafeInteger(e) && e >= 0 ? e : pp;
}
function Qt(e = {}) {
  return { ...Bv(), ...e, compareKeys: Dv(e.compareKeys), contextLines: Fv(e.contextLines) };
}
function lr(e) {
  return e.length === 1 && e[0].length === 0;
}
function Uv(e) {
  let t = 0, r = 0;
  return e.forEach((n) => {
    switch (n[0]) {
      case Me:
        t += 1;
        break;
      case Oe:
        r += 1;
        break;
    }
  }), { a: t, b: r };
}
function Hv({ aAnnotation: e, aColor: t, aIndicator: r, bAnnotation: n, bColor: o, bIndicator: l, includeChangeCounts: a, omitAnnotationLines: i }, u) {
  if (i) return "";
  let c = "", s = "";
  if (a) {
    let p = String(u.a), m = String(u.b), b = n.length - e.length, h = " ".repeat(Math.max(0, b)), y = " ".repeat(Math.max(0, -b)), g = m.length - p.length, q = " ".repeat(Math.max(0, g)), C = " ".repeat(Math.max(0, -g));
    c = `${h}  ${r} ${q}${p}`, s = `${y}  ${l} ${C}${m}`;
  }
  let d = `${r} ${e}${c}`, f = `${l} ${n}${s}`;
  return `${t(d)}
${o(f)}

`;
}
function mi(e, t, r) {
  return Hv(r, Uv(e)) + (r.expand ? Lv(e, r) : Iv(e, r)) + (t ? r.truncateAnnotationColor(`
${r.truncateAnnotation}`) : "");
}
function mo(e, t, r) {
  let n = Qt(r), [o, l] = fp(lr(e) ? [] : e, lr(t) ? [] : t, n);
  return mi(o, l, n);
}
function Vv(e, t, r, n, o) {
  if (lr(e) && lr(r) && (e = [], r = []), lr(t) && lr(n) && (t = [], n = []), e.length !== r.length || t.length !== n.length) return mo(e, t, o);
  let [l, a] = fp(r, n, o), i = 0, u = 0;
  return l.forEach((c) => {
    switch (c[0]) {
      case Me:
        c[1] = e[i], i += 1;
        break;
      case Oe:
        c[1] = t[u], u += 1;
        break;
      default:
        c[1] = t[u], i += 1, u += 1;
    }
  }), mi(l, a, Qt(o));
}
function fp(e, t, r) {
  let n = r?.truncateThreshold ?? !1, o = Math.max(Math.floor(r?.truncateThreshold ?? 0), 0), l = n ? Math.min(e.length, o) : e.length, a = n ? Math.min(t.length, o) : t.length, i = l !== e.length || a !== t.length, u = (f, p) => e[f] === t[p], c = [], s = 0, d = 0;
  for (sp(l, a, u, (f, p, m) => {
    for (; s !== p; s += 1) c.push(new ve(Me, e[s]));
    for (; d !== m; d += 1) c.push(new ve(Oe, t[d]));
    for (; f !== 0; f -= 1, s += 1, d += 1) c.push(new ve(we, t[d]));
  }); s !== l; s += 1) c.push(new ve(Me, e[s]));
  for (; d !== a; d += 1) c.push(new ve(Oe, t[d]));
  return [c, i];
}
function bu(e) {
  return e.includes(`\r
`) ? `\r
` : `
`;
}
function zv(e, t, r) {
  let n = r?.truncateThreshold ?? !1, o = Math.max(Math.floor(r?.truncateThreshold ?? 0), 0), l = e.length, a = t.length;
  if (n) {
    let f = e.includes(`
`), p = t.includes(`
`), m = bu(e), b = bu(t), h = f ? `${e.split(m, o).join(m)}
` : e, y = p ? `${t.split(b, o).join(b)}
` : t;
    l = h.length, a = y.length;
  }
  let i = l !== e.length || a !== t.length, u = (f, p) => e[f] === t[p], c = 0, s = 0, d = [];
  return sp(l, a, u, (f, p, m) => {
    c !== p && d.push(new ve(Me, e.slice(c, p))), s !== m && d.push(new ve(Oe, t.slice(s, m))), c = p + f, s = m + f, d.push(new ve(we, t.slice(m, s)));
  }), c !== l && d.push(new ve(Me, e.slice(c))), s !== a && d.push(new ve(Oe, t.slice(s))), [d, i];
}
function Gv(e, t, r) {
  return t.reduce((n, o) => n + (o[0] === we ? o[1] : o[0] === e && o[1].length !== 0 ? r(o[1]) : ""), "");
}
var yu = class {
  op;
  line;
  lines;
  changeColor;
  constructor(t, r) {
    this.op = t, this.line = [], this.lines = [], this.changeColor = r;
  }
  pushSubstring(t) {
    this.pushDiff(new ve(this.op, t));
  }
  pushLine() {
    this.lines.push(this.line.length !== 1 ? new ve(this.op, Gv(this.op, this.line, this.changeColor)) : this.line[0][0] === this.op ? this.line[0] : new ve(this.op, this.line[0][1])), this.line.length = 0;
  }
  isLineEmpty() {
    return this.line.length === 0;
  }
  pushDiff(t) {
    this.line.push(t);
  }
  align(t) {
    let r = t[1];
    if (r.includes(`
`)) {
      let n = r.split(`
`), o = n.length - 1;
      n.forEach((l, a) => {
        a < o ? (this.pushSubstring(l), this.pushLine()) : l.length !== 0 && this.pushSubstring(l);
      });
    } else this.pushDiff(t);
  }
  moveLinesTo(t) {
    this.isLineEmpty() || this.pushLine(), t.push(...this.lines), this.lines.length = 0;
  }
}, Wv = class {
  deleteBuffer;
  insertBuffer;
  lines;
  constructor(t, r) {
    this.deleteBuffer = t, this.insertBuffer = r, this.lines = [];
  }
  pushDiffCommonLine(t) {
    this.lines.push(t);
  }
  pushDiffChangeLines(t) {
    let r = t[1].length === 0;
    (!r || this.deleteBuffer.isLineEmpty()) && this.deleteBuffer.pushDiff(t), (!r || this.insertBuffer.isLineEmpty()) && this.insertBuffer.pushDiff(t);
  }
  flushChangeLines() {
    this.deleteBuffer.moveLinesTo(this.lines), this.insertBuffer.moveLinesTo(this.lines);
  }
  align(t) {
    let r = t[0], n = t[1];
    if (n.includes(`
`)) {
      let o = n.split(`
`), l = o.length - 1;
      o.forEach((a, i) => {
        if (i === 0) {
          let u = new ve(r, a);
          this.deleteBuffer.isLineEmpty() && this.insertBuffer.isLineEmpty() ? (this.flushChangeLines(), this.pushDiffCommonLine(u)) : (this.pushDiffChangeLines(u), this.flushChangeLines());
        } else i < l ? this.pushDiffCommonLine(new ve(r, a)) : a.length !== 0 && this.pushDiffChangeLines(new ve(r, a));
      });
    } else this.pushDiffChangeLines(t);
  }
  getLines() {
    return this.flushChangeLines(), this.lines;
  }
};
function Kv(e, t) {
  let r = new yu(Me, t), n = new yu(Oe, t), o = new Wv(r, n);
  return e.forEach((l) => {
    switch (l[0]) {
      case Me:
        r.align(l);
        break;
      case Oe:
        n.align(l);
        break;
      default:
        o.align(l);
    }
  }), o.getLines();
}
function Yv(e, t) {
  if (t) {
    let r = e.length - 1;
    return e.some((n, o) => n[0] === we && (o !== r || n[1] !== `
`));
  }
  return e.some((r) => r[0] === we);
}
function Jv(e, t, r) {
  if (e !== t && e.length !== 0 && t.length !== 0) {
    let n = e.includes(`
`) || t.includes(`
`), [o, l] = mp(n ? `${e}
` : e, n ? `${t}
` : t, !0, r);
    if (Yv(o, n)) {
      let a = Qt(r), i = Kv(o, a.changeColor);
      return mi(i, l, a);
    }
  }
  return mo(e.split(`
`), t.split(`
`), r);
}
function mp(e, t, r, n) {
  let [o, l] = zv(e, t, n);
  return Tv(o), [o, l];
}
function rl(e, t) {
  let { commonColor: r } = Qt(t);
  return r(e);
}
var { AsymmetricMatcher: Xv, DOMCollection: Qv, DOMElement: Zv, Immutable: e_, ReactElement: t_, ReactTestComponent: r_ } = ep, hp = [r_, t_, Zv, Qv, e_, Xv], nl = { plugins: hp }, bp = { callToJSON: !1, maxDepth: 10, plugins: hp };
function n_(e, t, r) {
  if (Object.is(e, t)) return "";
  let n = uu(e), o = n, l = !1;
  if (n === "object" && typeof e.asymmetricMatch == "function") {
    if (e.$$typeof !== Symbol.for("jest.asymmetricMatcher") || typeof e.getExpectedType != "function") return;
    o = e.getExpectedType(), l = o === "string";
  }
  if (o !== uu(t)) {
    let { aAnnotation: a, aColor: i, aIndicator: u, bAnnotation: c, bColor: s, bIndicator: d } = Qt(r), f = ol(bp, r), p = at(e, f), m = at(t, f), b = `${i(`${u} ${a}:`)} 
${p}`, h = `${s(`${d} ${c}:`)} 
${m}`;
    return `${b}

${h}`;
  }
  if (!l) switch (n) {
    case "string":
      return mo(e.split(`
`), t.split(`
`), r);
    case "boolean":
    case "number":
      return o_(e, t, r);
    case "map":
      return Ta(gu(e), gu(t), r);
    case "set":
      return Ta(vu(e), vu(t), r);
    default:
      return Ta(e, t, r);
  }
}
function o_(e, t, r) {
  let n = at(e, nl), o = at(t, nl);
  return n === o ? "" : mo(n.split(`
`), o.split(`
`), r);
}
function gu(e) {
  return new Map(Array.from(e.entries()).sort());
}
function vu(e) {
  return new Set(Array.from(e.values()).sort());
}
function Ta(e, t, r) {
  let n, o = !1;
  try {
    let a = ol(nl, r);
    n = _u(e, t, a, r);
  } catch {
    o = !0;
  }
  let l = rl(ip, r);
  if (n === void 0 || n === l) {
    let a = ol(bp, r);
    n = _u(e, t, a, r), n !== l && !o && (n = `${rl(xv, r)}

${n}`);
  }
  return n;
}
function ol(e, t) {
  let { compareKeys: r } = Qt(t);
  return { ...e, compareKeys: r };
}
function _u(e, t, r, n) {
  let o = { ...r, indent: 0 }, l = at(e, o), a = at(t, o);
  if (l === a) return rl(ip, n);
  {
    let i = at(e, r), u = at(t, r);
    return Vv(i.split(`
`), u.split(`
`), l.split(`
`), a.split(`
`), n);
  }
}
var Ru = 2e4;
function wu(e) {
  return el(e) === "Object" && typeof e.asymmetricMatch == "function";
}
function Eu(e, t) {
  let r = el(e), n = el(t);
  return r === n && (r === "Object" || r === "Array");
}
function a_(e, t, r) {
  let { aAnnotation: n, bAnnotation: o } = Qt(r);
  if (typeof e == "string" && typeof t == "string" && e.length > 0 && t.length > 0 && e.length <= Ru && t.length <= Ru && e !== t) {
    if (e.includes(`
`) || t.includes(`
`)) return Jv(t, e, r);
    let [c] = mp(t, e), s = c.some((m) => m[0] === we), d = l_(n, o), f = d(n) + u_(Cu(c, Me, s)), p = d(o) + s_(Cu(c, Oe, s));
    return `${f}
${p}`;
  }
  let l = su(e, { forceWritable: !0 }), a = su(t, { forceWritable: !0 }), { replacedExpected: i, replacedActual: u } = yp(l, a);
  return n_(i, u, r);
}
function yp(e, t, r = /* @__PURE__ */ new WeakSet(), n = /* @__PURE__ */ new WeakSet()) {
  return Eu(e, t) ? r.has(e) || n.has(t) ? { replacedActual: e, replacedExpected: t } : (r.add(e), n.add(t), np(t).forEach((o) => {
    let l = t[o], a = e[o];
    if (wu(l)) l.asymmetricMatch(a) && (e[o] = l);
    else if (wu(a)) a.asymmetricMatch(l) && (t[o] = a);
    else if (Eu(a, l)) {
      let i = yp(a, l, r, n);
      e[o] = i.replacedActual, t[o] = i.replacedExpected;
    }
  }), { replacedActual: e, replacedExpected: t }) : { replacedActual: e, replacedExpected: t };
}
function l_(...e) {
  let t = e.reduce((r, n) => n.length > r ? n.length : r, 0);
  return (r) => `${r}: ${" ".repeat(t - r.length)}`;
}
var i_ = "·";
function gp(e) {
  return e.replace(/\s+$/gm, (t) => i_.repeat(t.length));
}
function s_(e) {
  return ht.red(gp(Jr(e)));
}
function u_(e) {
  return ht.green(gp(Jr(e)));
}
function Cu(e, t, r) {
  return e.reduce((n, o) => n + (o[0] === we ? o[1] : o[0] === t ? r ? ht.inverse(o[1]) : o[1] : ""), "");
}
var c_ = "@@__IMMUTABLE_RECORD__@@", d_ = "@@__IMMUTABLE_ITERABLE__@@";
function p_(e) {
  return e && (e[d_] || e[c_]);
}
var f_ = Object.getPrototypeOf({});
function qu(e) {
  return e instanceof Error ? `<unserializable>: ${e.message}` : typeof e == "string" ? `<unserializable>: ${e}` : "<unserializable>";
}
function ir(e, t = /* @__PURE__ */ new WeakMap()) {
  if (!e || typeof e == "string") return e;
  if (typeof e == "function") return `Function<${e.name || "anonymous"}>`;
  if (typeof e == "symbol") return e.toString();
  if (typeof e != "object") return e;
  if (p_(e)) return ir(e.toJSON(), t);
  if (e instanceof Promise || e.constructor && e.constructor.prototype === "AsyncFunction") return "Promise";
  if (typeof Element < "u" && e instanceof Element) return e.tagName;
  if (typeof e.asymmetricMatch == "function") return `${e.toString()} ${Ev(e.sample)}`;
  if (typeof e.toJSON == "function") return ir(e.toJSON(), t);
  if (t.has(e)) return t.get(e);
  if (Array.isArray(e)) {
    let r = new Array(e.length);
    return t.set(e, r), e.forEach((n, o) => {
      try {
        r[o] = ir(n, t);
      } catch (l) {
        r[o] = qu(l);
      }
    }), r;
  } else {
    let r = /* @__PURE__ */ Object.create(null);
    t.set(e, r);
    let n = e;
    for (; n && n !== f_; ) Object.getOwnPropertyNames(n).forEach((o) => {
      if (!(o in r)) try {
        r[o] = ir(e[o], t);
      } catch (l) {
        delete r[o], r[o] = qu(l);
      }
    }), n = Object.getPrototypeOf(n);
    return r;
  }
}
function m_(e) {
  return e.replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "");
}
function vp(e, t, r = /* @__PURE__ */ new WeakSet()) {
  if (!e || typeof e != "object") return { message: String(e) };
  let n = e;
  n.stack && (n.stackStr = String(n.stack)), n.name && (n.nameStr = String(n.name)), (n.showDiff || n.showDiff === void 0 && n.expected !== void 0 && n.actual !== void 0) && (n.diff = a_(n.actual, n.expected, { ...t, ...n.diffOptions })), typeof n.expected != "string" && (n.expected = Jr(n.expected, 10)), typeof n.actual != "string" && (n.actual = Jr(n.actual, 10));
  try {
    typeof n.message == "string" && (n.message = m_(n.message));
  } catch {
  }
  try {
    !r.has(n) && typeof n.cause == "object" && (r.add(n), n.cause = vp(n.cause, t, r));
  } catch {
  }
  try {
    return ir(n);
  } catch (o) {
    return ir(new Error(`Failed to fully serialize error: ${o?.message}
Inner error message: ${n?.message}`));
  }
}
var h_ = ((e) => (e.DONE = "done", e.ERROR = "error", e.ACTIVE = "active", e.WAITING = "waiting", e))(h_ || {}), pt = { CALL: "storybook/instrumenter/call", SYNC: "storybook/instrumenter/sync", START: "storybook/instrumenter/start", BACK: "storybook/instrumenter/back", GOTO: "storybook/instrumenter/goto", NEXT: "storybook/instrumenter/next", END: "storybook/instrumenter/end" }, Pu = { start: !1, back: !1, goto: !1, next: !1, end: !1 }, b_ = new Error("This function ran after the play function completed. Did you forget to `await` it?"), Ou = (e) => Object.prototype.toString.call(e) === "[object Object]", y_ = (e) => Object.prototype.toString.call(e) === "[object Module]", g_ = (e) => {
  if (!Ou(e) && !y_(e)) return !1;
  if (e.constructor === void 0) return !0;
  let t = e.constructor.prototype;
  return !!Ou(t);
}, v_ = (e) => {
  try {
    return new e.constructor();
  } catch {
    return {};
  }
}, Sa = () => ({ renderPhase: void 0, isDebugging: !1, isPlaying: !1, isLocked: !1, cursor: 0, calls: [], shadowCalls: [], callRefsByResult: /* @__PURE__ */ new Map(), chainedCallIds: /* @__PURE__ */ new Set(), ancestors: [], playUntil: void 0, resolvers: {}, syncTimeout: void 0 }), Tu = (e, t = !1) => {
  let r = (t ? e.shadowCalls : e.calls).filter((o) => o.retain);
  if (!r.length) return;
  let n = new Map(Array.from(e.callRefsByResult.entries()).filter(([, o]) => o.retain));
  return { cursor: r.length, calls: r, callRefsByResult: n };
}, __ = class {
  constructor() {
    this.initialized = !1, this.channel = Sy.getChannel(), this.state = Le.window?.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ || {};
    let e = ({ storyId: a, isPlaying: i = !0, isDebugging: u = !1 }) => {
      let c = this.getState(a);
      this.setState(a, { ...Sa(), ...Tu(c, u), shadowCalls: u ? c.shadowCalls : [], chainedCallIds: u ? c.chainedCallIds : /* @__PURE__ */ new Set(), playUntil: u ? c.playUntil : void 0, isPlaying: i, isDebugging: u }), this.sync(a);
    };
    this.channel.on(Bs, e), this.channel.on(Oy, ({ storyId: a, newPhase: i }) => {
      let { isDebugging: u } = this.getState(a);
      this.setState(a, { renderPhase: i }), i === "preparing" && u && e({ storyId: a }), i === "playing" && e({ storyId: a, isDebugging: u }), i === "played" && this.setState(a, { isLocked: !1, isPlaying: !1, isDebugging: !1 }), i === "errored" && this.setState(a, { isLocked: !1, isPlaying: !1 });
    }), this.channel.on(Ty, () => {
      this.initialized ? this.cleanup() : this.initialized = !0;
    });
    let t = ({ storyId: a, playUntil: i }) => {
      this.getState(a).isDebugging || this.setState(a, ({ calls: c }) => ({ calls: [], shadowCalls: c.map((s) => ({ ...s, status: "waiting" })), isDebugging: !0 }));
      let u = this.getLog(a);
      this.setState(a, ({ shadowCalls: c }) => {
        if (i || !u.length) return { playUntil: i };
        let s = c.findIndex((d) => d.id === u[0].callId);
        return { playUntil: c.slice(0, s).filter((d) => d.interceptable && !d.ancestors?.length).slice(-1)[0]?.id };
      }), this.channel.emit(Bs, { storyId: a, isDebugging: !0 });
    }, r = ({ storyId: a }) => {
      let i = this.getLog(a).filter((c) => !c.ancestors?.length), u = i.reduceRight((c, s, d) => c >= 0 || s.status === "waiting" ? c : d, -1);
      t({ storyId: a, playUntil: i[u - 1]?.callId });
    }, n = ({ storyId: a, callId: i }) => {
      let { calls: u, shadowCalls: c, resolvers: s } = this.getState(a), d = u.find(({ id: p }) => p === i), f = c.find(({ id: p }) => p === i);
      if (!d && f && Object.values(s).length > 0) {
        let p = this.getLog(a).find((m) => m.status === "waiting")?.callId;
        f.id !== p && this.setState(a, { playUntil: f.id }), Object.values(s).forEach((m) => m());
      } else t({ storyId: a, playUntil: i });
    }, o = ({ storyId: a }) => {
      let { resolvers: i } = this.getState(a);
      if (Object.values(i).length > 0) Object.values(i).forEach((u) => u());
      else {
        let u = this.getLog(a).find((c) => c.status === "waiting")?.callId;
        u ? t({ storyId: a, playUntil: u }) : l({ storyId: a });
      }
    }, l = ({ storyId: a }) => {
      this.setState(a, { playUntil: void 0, isDebugging: !1 }), Object.values(this.getState(a).resolvers).forEach((i) => i());
    };
    this.channel.on(pt.START, t), this.channel.on(pt.BACK, r), this.channel.on(pt.GOTO, n), this.channel.on(pt.NEXT, o), this.channel.on(pt.END, l);
  }
  getState(e) {
    return this.state[e] || Sa();
  }
  setState(e, t) {
    let r = this.getState(e), n = typeof t == "function" ? t(r) : t;
    this.state = { ...this.state, [e]: { ...r, ...n } }, Le.window?.parent && (Le.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ = this.state);
  }
  cleanup() {
    this.state = Object.entries(this.state).reduce((t, [r, n]) => {
      let o = Tu(n);
      return o && (t[r] = Object.assign(Sa(), o)), t;
    }, {});
    let e = { controlStates: Pu, logItems: [] };
    this.channel.emit(pt.SYNC, e), Le.window?.parent && (Le.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ = this.state);
  }
  getLog(e) {
    let { calls: t, shadowCalls: r } = this.getState(e), n = [...r];
    t.forEach((l, a) => {
      n[a] = l;
    });
    let o = /* @__PURE__ */ new Set();
    return n.reduceRight((l, a) => (a.args.forEach((i) => {
      i?.__callId__ && o.add(i.__callId__);
    }), a.path.forEach((i) => {
      i.__callId__ && o.add(i.__callId__);
    }), (a.interceptable || a.exception) && !o.has(a.id) && (l.unshift({ callId: a.id, status: a.status, ancestors: a.ancestors }), o.add(a.id)), l), []);
  }
  instrument(e, t, r = 0) {
    if (!g_(e)) return e;
    let { mutate: n = !1, path: o = [] } = t, l = t.getKeys ? t.getKeys(e, r) : Object.keys(e);
    return r += 1, l.reduce((a, i) => {
      let u = R_(e, i);
      if (typeof u?.get == "function") {
        let s = () => u?.get?.bind(e)?.();
        return Object.defineProperty(a, i, { get: () => this.instrument(s(), { ...t, path: o.concat(i) }, r) }), a;
      }
      let c = e[i];
      return typeof c != "function" ? (a[i] = this.instrument(c, { ...t, path: o.concat(i) }, r), a) : "__originalFn__" in c && typeof c.__originalFn__ == "function" ? (a[i] = c, a) : (a[i] = (...s) => this.track(i, c, e, s, t), a[i].__originalFn__ = c, Object.defineProperty(a[i], "name", { value: i, writable: !1 }), Object.keys(c).length > 0 && Object.assign(a[i], this.instrument({ ...c }, { ...t, path: o.concat(i) }, r)), a);
    }, n ? e : v_(e));
  }
  track(e, t, r, n, o) {
    let l = n?.[0]?.__storyId__ || Le.__STORYBOOK_PREVIEW__?.selectionStore?.selection?.storyId, { cursor: a, ancestors: i } = this.getState(l);
    this.setState(l, { cursor: a + 1 });
    let u = `${i.slice(-1)[0] || l} [${a}] ${e}`, { path: c = [], intercept: s = !1, retain: d = !1 } = o, f = typeof s == "function" ? s(e, c) : s, p = { id: u, cursor: a, storyId: l, ancestors: i, path: c, method: e, args: n, interceptable: f, retain: d }, m = (f && !i.length ? this.intercept : this.invoke).call(this, t, r, p, o);
    return this.instrument(m, { ...o, mutate: !0, path: [{ __callId__: p.id }] });
  }
  intercept(e, t, r, n) {
    let { chainedCallIds: o, isDebugging: l, playUntil: a } = this.getState(r.storyId), i = o.has(r.id);
    return !l || i || a ? (a === r.id && this.setState(r.storyId, { playUntil: void 0 }), this.invoke(e, t, r, n)) : new Promise((u) => {
      this.setState(r.storyId, ({ resolvers: c }) => ({ isLocked: !1, resolvers: { ...c, [r.id]: u } }));
    }).then(() => (this.setState(r.storyId, (u) => {
      let { [r.id]: c, ...s } = u.resolvers;
      return { isLocked: !0, resolvers: s };
    }), this.invoke(e, t, r, n)));
  }
  invoke(e, t, r, n) {
    let { callRefsByResult: o, renderPhase: l } = this.getState(r.storyId), a = 25, i = (s, d, f) => {
      if (f.includes(s)) return "[Circular]";
      if (f = [...f, s], d > a) return "...";
      if (o.has(s)) return o.get(s);
      if (s instanceof Array) return s.map((p) => i(p, ++d, f));
      if (s instanceof Date) return { __date__: { value: s.toISOString() } };
      if (s instanceof Error) {
        let { name: p, message: m, stack: b } = s;
        return { __error__: { name: p, message: m, stack: b } };
      }
      if (s instanceof RegExp) {
        let { flags: p, source: m } = s;
        return { __regexp__: { flags: p, source: m } };
      }
      if (s instanceof Le.window?.HTMLElement) {
        let { prefix: p, localName: m, id: b, classList: h, innerText: y } = s, g = Array.from(h);
        return { __element__: { prefix: p, localName: m, id: b, classNames: g, innerText: y } };
      }
      return typeof s == "function" ? { __function__: { name: "getMockName" in s ? s.getMockName() : s.name } } : typeof s == "symbol" ? { __symbol__: { description: s.description } } : typeof s == "object" && s?.constructor?.name && s?.constructor?.name !== "Object" ? { __class__: { name: s.constructor.name } } : Object.prototype.toString.call(s) === "[object Object]" ? Object.fromEntries(Object.entries(s).map(([p, m]) => [p, i(m, ++d, f)])) : s;
    }, u = { ...r, args: r.args.map((s) => i(s, 0, [])) };
    r.path.forEach((s) => {
      s?.__callId__ && this.setState(r.storyId, ({ chainedCallIds: d }) => ({ chainedCallIds: new Set(Array.from(d).concat(s.__callId__)) }));
    });
    let c = (s) => {
      if (s instanceof Error) {
        let { name: d, message: f, stack: p, callId: m = r.id } = s, { showDiff: b = void 0, diff: h = void 0, actual: y = void 0, expected: g = void 0 } = s.name === "AssertionError" ? vp(s) : s, q = { name: d, message: f, stack: p, callId: m, showDiff: b, diff: h, actual: y, expected: g };
        if (this.update({ ...u, status: "error", exception: q }), this.setState(r.storyId, (C) => ({ callRefsByResult: new Map([...Array.from(C.callRefsByResult.entries()), [s, { __callId__: r.id, retain: r.retain }]]) })), r.ancestors?.length) throw Object.prototype.hasOwnProperty.call(s, "callId") || Object.defineProperty(s, "callId", { value: r.id }), s;
      }
      throw s;
    };
    try {
      if (l === "played" && !r.retain) throw b_;
      let s = (n.getArgs ? n.getArgs(r, this.getState(r.storyId)) : r.args).map((f) => typeof f != "function" || Object.keys(f).length ? f : (...p) => {
        let { cursor: m, ancestors: b } = this.getState(r.storyId);
        this.setState(r.storyId, { cursor: 0, ancestors: [...b, r.id] });
        let h = () => this.setState(r.storyId, { cursor: m, ancestors: b }), y = !1;
        try {
          let g = f(...p);
          return g instanceof Promise ? (y = !0, g.finally(h)) : g;
        } finally {
          y || h();
        }
      }), d = e.apply(t, s);
      return d && ["object", "function", "symbol"].includes(typeof d) && this.setState(r.storyId, (f) => ({ callRefsByResult: new Map([...Array.from(f.callRefsByResult.entries()), [d, { __callId__: r.id, retain: r.retain }]]) })), this.update({ ...u, status: d instanceof Promise ? "active" : "done" }), d instanceof Promise ? d.then((f) => (this.update({ ...u, status: "done" }), f), c) : d;
    } catch (s) {
      return c(s);
    }
  }
  update(e) {
    this.channel.emit(pt.CALL, e), this.setState(e.storyId, ({ calls: t }) => {
      let r = t.concat(e).reduce((n, o) => Object.assign(n, { [o.id]: o }), {});
      return { calls: Object.values(r).sort((n, o) => n.id.localeCompare(o.id, void 0, { numeric: !0 })) };
    }), this.sync(e.storyId);
  }
  sync(e) {
    let t = () => {
      let { isLocked: r, isPlaying: n } = this.getState(e), o = this.getLog(e), l = o.filter(({ ancestors: c }) => !c.length).find((c) => c.status === "waiting")?.callId, a = o.some((c) => c.status === "active");
      if (r || a || o.length === 0) {
        let c = { controlStates: Pu, logItems: o };
        this.channel.emit(pt.SYNC, c);
        return;
      }
      let i = o.some((c) => c.status === "done" || c.status === "error"), u = { controlStates: { start: i, back: i, goto: !0, next: n, end: n }, logItems: o, pausedAt: l };
      this.channel.emit(pt.SYNC, u);
    };
    this.setState(e, ({ syncTimeout: r }) => (clearTimeout(r), { syncTimeout: setTimeout(t, 0) }));
  }
};
function hi(e, t = {}) {
  try {
    let r = !1, n = !1;
    return Le.window?.location?.search?.includes("instrument=true") ? r = !0 : Le.window?.location?.search?.includes("instrument=false") && (n = !0), Le.window?.parent === Le.window && !r || n ? e : (Le.window && !Le.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__ && (Le.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__ = new __()), (Le.window?.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__).instrument(e, t));
  } catch (r) {
    return Py.warn(r), e;
  }
}
function R_(e, t) {
  let r = e;
  for (; r != null; ) {
    let n = Object.getOwnPropertyDescriptor(r, t);
    if (n) return n;
    r = Object.getPrototypeOf(r);
  }
}
var Wt = {};
const { global: _p } = __STORYBOOK_MODULE_GLOBAL__, { once: w_ } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
var E_ = Object.create, bi = Object.defineProperty, C_ = Object.getOwnPropertyDescriptor, Rp = Object.getOwnPropertyNames, q_ = Object.getPrototypeOf, P_ = Object.prototype.hasOwnProperty, O_ = ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
}), R = (e, t) => function() {
  return t || (0, e[Rp(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, yi = (e, t) => {
  for (var r in t) bi(e, r, { get: t[r], enumerable: !0 });
}, T_ = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function") for (let o of Rp(t)) !P_.call(e, o) && o !== r && bi(e, o, { get: () => t[o], enumerable: !(n = C_(t, o)) || n.enumerable });
  return e;
}, He = (e, t, r) => (r = e != null ? E_(q_(e)) : {}, T_(t || !e || !e.__esModule ? bi(r, "default", { value: e, enumerable: !0 }) : r, e)), S_ = R({ "../../node_modules/min-indent/index.js"(e, t) {
  t.exports = (r) => {
    let n = r.match(/^[ \t]*(?=\S)/gm);
    return n ? n.reduce((o, l) => Math.min(o, l.length), 1 / 0) : 0;
  };
} }), M_ = R({ "../../node_modules/strip-indent/index.js"(e, t) {
  var r = S_();
  t.exports = (n) => {
    let o = r(n);
    if (o === 0) return n;
    let l = new RegExp(`^[ \\t]{${o}}`, "gm");
    return n.replace(l, "");
  };
} }), A_ = R({ "../../node_modules/indent-string/index.js"(e, t) {
  t.exports = (r, n = 1, o) => {
    if (o = { indent: " ", includeEmptyLines: !1, ...o }, typeof r != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof r}\``);
    if (typeof n != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof n}\``);
    if (typeof o.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof o.indent}\``);
    if (n === 0) return r;
    let l = o.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return r.replace(l, o.indent.repeat(n));
  };
} }), wp = R({ "../../node_modules/redent/index.js"(e, t) {
  var r = M_(), n = A_();
  t.exports = (o, l = 0, a) => n(r(o), l, a);
} }), x_ = R({ "../../node_modules/aria-query/lib/util/iteratorProxy.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  function t() {
    var r = this, n = 0, o = { "@@iterator": function() {
      return o;
    }, next: function() {
      if (n < r.length) {
        var l = r[n];
        return n = n + 1, { done: !1, value: l };
      } else return { done: !0 };
    } };
    return o;
  }
  e.default = t;
} }), mn = R({ "../../node_modules/aria-query/lib/util/iterationDecorator.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = o;
  var t = r(x_());
  function r(l) {
    return l && l.__esModule ? l : { default: l };
  }
  function n(l) {
    "@babel/helpers - typeof";
    return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
      return typeof a;
    } : function(a) {
      return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, n(l);
  }
  function o(l, a) {
    return typeof Symbol == "function" && n(Symbol.iterator) === "symbol" && Object.defineProperty(l, Symbol.iterator, { value: t.default.bind(a) }), l;
  }
} }), j_ = R({ "../../node_modules/aria-query/lib/ariaPropsMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = r(mn());
  function r(d) {
    return d && d.__esModule ? d : { default: d };
  }
  function n(d, f) {
    return u(d) || i(d, f) || l(d, f) || o();
  }
  function o() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function l(d, f) {
    if (d) {
      if (typeof d == "string") return a(d, f);
      var p = {}.toString.call(d).slice(8, -1);
      return p === "Object" && d.constructor && (p = d.constructor.name), p === "Map" || p === "Set" ? Array.from(d) : p === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(p) ? a(d, f) : void 0;
    }
  }
  function a(d, f) {
    (f == null || f > d.length) && (f = d.length);
    for (var p = 0, m = Array(f); p < f; p++) m[p] = d[p];
    return m;
  }
  function i(d, f) {
    var p = d == null ? null : typeof Symbol < "u" && d[Symbol.iterator] || d["@@iterator"];
    if (p != null) {
      var m, b, h, y, g = [], q = !0, C = !1;
      try {
        if (h = (p = p.call(d)).next, f === 0) {
          if (Object(p) !== p) return;
          q = !1;
        } else for (; !(q = (m = h.call(p)).done) && (g.push(m.value), g.length !== f); q = !0) ;
      } catch (E) {
        C = !0, b = E;
      } finally {
        try {
          if (!q && p.return != null && (y = p.return(), Object(y) !== y)) return;
        } finally {
          if (C) throw b;
        }
      }
      return g;
    }
  }
  function u(d) {
    if (Array.isArray(d)) return d;
  }
  var c = [["aria-activedescendant", { type: "id" }], ["aria-atomic", { type: "boolean" }], ["aria-autocomplete", { type: "token", values: ["inline", "list", "both", "none"] }], ["aria-braillelabel", { type: "string" }], ["aria-brailleroledescription", { type: "string" }], ["aria-busy", { type: "boolean" }], ["aria-checked", { type: "tristate" }], ["aria-colcount", { type: "integer" }], ["aria-colindex", { type: "integer" }], ["aria-colspan", { type: "integer" }], ["aria-controls", { type: "idlist" }], ["aria-current", { type: "token", values: ["page", "step", "location", "date", "time", !0, !1] }], ["aria-describedby", { type: "idlist" }], ["aria-description", { type: "string" }], ["aria-details", { type: "id" }], ["aria-disabled", { type: "boolean" }], ["aria-dropeffect", { type: "tokenlist", values: ["copy", "execute", "link", "move", "none", "popup"] }], ["aria-errormessage", { type: "id" }], ["aria-expanded", { type: "boolean", allowundefined: !0 }], ["aria-flowto", { type: "idlist" }], ["aria-grabbed", { type: "boolean", allowundefined: !0 }], ["aria-haspopup", { type: "token", values: [!1, !0, "menu", "listbox", "tree", "grid", "dialog"] }], ["aria-hidden", { type: "boolean", allowundefined: !0 }], ["aria-invalid", { type: "token", values: ["grammar", !1, "spelling", !0] }], ["aria-keyshortcuts", { type: "string" }], ["aria-label", { type: "string" }], ["aria-labelledby", { type: "idlist" }], ["aria-level", { type: "integer" }], ["aria-live", { type: "token", values: ["assertive", "off", "polite"] }], ["aria-modal", { type: "boolean" }], ["aria-multiline", { type: "boolean" }], ["aria-multiselectable", { type: "boolean" }], ["aria-orientation", { type: "token", values: ["vertical", "undefined", "horizontal"] }], ["aria-owns", { type: "idlist" }], ["aria-placeholder", { type: "string" }], ["aria-posinset", { type: "integer" }], ["aria-pressed", { type: "tristate" }], ["aria-readonly", { type: "boolean" }], ["aria-relevant", { type: "tokenlist", values: ["additions", "all", "removals", "text"] }], ["aria-required", { type: "boolean" }], ["aria-roledescription", { type: "string" }], ["aria-rowcount", { type: "integer" }], ["aria-rowindex", { type: "integer" }], ["aria-rowspan", { type: "integer" }], ["aria-selected", { type: "boolean", allowundefined: !0 }], ["aria-setsize", { type: "integer" }], ["aria-sort", { type: "token", values: ["ascending", "descending", "none", "other"] }], ["aria-valuemax", { type: "number" }], ["aria-valuemin", { type: "number" }], ["aria-valuenow", { type: "number" }], ["aria-valuetext", { type: "string" }]], s = { entries: function() {
    return c;
  }, forEach: function(d) {
    for (var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, p = 0, m = c; p < m.length; p++) {
      var b = n(m[p], 2), h = b[0], y = b[1];
      d.call(f, y, h, c);
    }
  }, get: function(d) {
    var f = c.filter(function(p) {
      return p[0] === d;
    })[0];
    return f && f[1];
  }, has: function(d) {
    return !!s.get(d);
  }, keys: function() {
    return c.map(function(d) {
      var f = n(d, 1), p = f[0];
      return p;
    });
  }, values: function() {
    return c.map(function(d) {
      var f = n(d, 2), p = f[1];
      return p;
    });
  } };
  e.default = (0, t.default)(s, s.entries());
} }), N_ = R({ "../../node_modules/aria-query/lib/domMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = r(mn());
  function r(d) {
    return d && d.__esModule ? d : { default: d };
  }
  function n(d, f) {
    return u(d) || i(d, f) || l(d, f) || o();
  }
  function o() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function l(d, f) {
    if (d) {
      if (typeof d == "string") return a(d, f);
      var p = {}.toString.call(d).slice(8, -1);
      return p === "Object" && d.constructor && (p = d.constructor.name), p === "Map" || p === "Set" ? Array.from(d) : p === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(p) ? a(d, f) : void 0;
    }
  }
  function a(d, f) {
    (f == null || f > d.length) && (f = d.length);
    for (var p = 0, m = Array(f); p < f; p++) m[p] = d[p];
    return m;
  }
  function i(d, f) {
    var p = d == null ? null : typeof Symbol < "u" && d[Symbol.iterator] || d["@@iterator"];
    if (p != null) {
      var m, b, h, y, g = [], q = !0, C = !1;
      try {
        if (h = (p = p.call(d)).next, f === 0) {
          if (Object(p) !== p) return;
          q = !1;
        } else for (; !(q = (m = h.call(p)).done) && (g.push(m.value), g.length !== f); q = !0) ;
      } catch (E) {
        C = !0, b = E;
      } finally {
        try {
          if (!q && p.return != null && (y = p.return(), Object(y) !== y)) return;
        } finally {
          if (C) throw b;
        }
      }
      return g;
    }
  }
  function u(d) {
    if (Array.isArray(d)) return d;
  }
  var c = [["a", { reserved: !1 }], ["abbr", { reserved: !1 }], ["acronym", { reserved: !1 }], ["address", { reserved: !1 }], ["applet", { reserved: !1 }], ["area", { reserved: !1 }], ["article", { reserved: !1 }], ["aside", { reserved: !1 }], ["audio", { reserved: !1 }], ["b", { reserved: !1 }], ["base", { reserved: !0 }], ["bdi", { reserved: !1 }], ["bdo", { reserved: !1 }], ["big", { reserved: !1 }], ["blink", { reserved: !1 }], ["blockquote", { reserved: !1 }], ["body", { reserved: !1 }], ["br", { reserved: !1 }], ["button", { reserved: !1 }], ["canvas", { reserved: !1 }], ["caption", { reserved: !1 }], ["center", { reserved: !1 }], ["cite", { reserved: !1 }], ["code", { reserved: !1 }], ["col", { reserved: !0 }], ["colgroup", { reserved: !0 }], ["content", { reserved: !1 }], ["data", { reserved: !1 }], ["datalist", { reserved: !1 }], ["dd", { reserved: !1 }], ["del", { reserved: !1 }], ["details", { reserved: !1 }], ["dfn", { reserved: !1 }], ["dialog", { reserved: !1 }], ["dir", { reserved: !1 }], ["div", { reserved: !1 }], ["dl", { reserved: !1 }], ["dt", { reserved: !1 }], ["em", { reserved: !1 }], ["embed", { reserved: !1 }], ["fieldset", { reserved: !1 }], ["figcaption", { reserved: !1 }], ["figure", { reserved: !1 }], ["font", { reserved: !1 }], ["footer", { reserved: !1 }], ["form", { reserved: !1 }], ["frame", { reserved: !1 }], ["frameset", { reserved: !1 }], ["h1", { reserved: !1 }], ["h2", { reserved: !1 }], ["h3", { reserved: !1 }], ["h4", { reserved: !1 }], ["h5", { reserved: !1 }], ["h6", { reserved: !1 }], ["head", { reserved: !0 }], ["header", { reserved: !1 }], ["hgroup", { reserved: !1 }], ["hr", { reserved: !1 }], ["html", { reserved: !0 }], ["i", { reserved: !1 }], ["iframe", { reserved: !1 }], ["img", { reserved: !1 }], ["input", { reserved: !1 }], ["ins", { reserved: !1 }], ["kbd", { reserved: !1 }], ["keygen", { reserved: !1 }], ["label", { reserved: !1 }], ["legend", { reserved: !1 }], ["li", { reserved: !1 }], ["link", { reserved: !0 }], ["main", { reserved: !1 }], ["map", { reserved: !1 }], ["mark", { reserved: !1 }], ["marquee", { reserved: !1 }], ["menu", { reserved: !1 }], ["menuitem", { reserved: !1 }], ["meta", { reserved: !0 }], ["meter", { reserved: !1 }], ["nav", { reserved: !1 }], ["noembed", { reserved: !0 }], ["noscript", { reserved: !0 }], ["object", { reserved: !1 }], ["ol", { reserved: !1 }], ["optgroup", { reserved: !1 }], ["option", { reserved: !1 }], ["output", { reserved: !1 }], ["p", { reserved: !1 }], ["param", { reserved: !0 }], ["picture", { reserved: !0 }], ["pre", { reserved: !1 }], ["progress", { reserved: !1 }], ["q", { reserved: !1 }], ["rp", { reserved: !1 }], ["rt", { reserved: !1 }], ["rtc", { reserved: !1 }], ["ruby", { reserved: !1 }], ["s", { reserved: !1 }], ["samp", { reserved: !1 }], ["script", { reserved: !0 }], ["section", { reserved: !1 }], ["select", { reserved: !1 }], ["small", { reserved: !1 }], ["source", { reserved: !0 }], ["spacer", { reserved: !1 }], ["span", { reserved: !1 }], ["strike", { reserved: !1 }], ["strong", { reserved: !1 }], ["style", { reserved: !0 }], ["sub", { reserved: !1 }], ["summary", { reserved: !1 }], ["sup", { reserved: !1 }], ["table", { reserved: !1 }], ["tbody", { reserved: !1 }], ["td", { reserved: !1 }], ["textarea", { reserved: !1 }], ["tfoot", { reserved: !1 }], ["th", { reserved: !1 }], ["thead", { reserved: !1 }], ["time", { reserved: !1 }], ["title", { reserved: !0 }], ["tr", { reserved: !1 }], ["track", { reserved: !0 }], ["tt", { reserved: !1 }], ["u", { reserved: !1 }], ["ul", { reserved: !1 }], ["var", { reserved: !1 }], ["video", { reserved: !1 }], ["wbr", { reserved: !1 }], ["xmp", { reserved: !1 }]], s = { entries: function() {
    return c;
  }, forEach: function(d) {
    for (var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, p = 0, m = c; p < m.length; p++) {
      var b = n(m[p], 2), h = b[0], y = b[1];
      d.call(f, y, h, c);
    }
  }, get: function(d) {
    var f = c.filter(function(p) {
      return p[0] === d;
    })[0];
    return f && f[1];
  }, has: function(d) {
    return !!s.get(d);
  }, keys: function() {
    return c.map(function(d) {
      var f = n(d, 1), p = f[0];
      return p;
    });
  }, values: function() {
    return c.map(function(d) {
      var f = n(d, 2), p = f[1];
      return p;
    });
  } };
  e.default = (0, t.default)(s, s.entries());
} }), $_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/commandRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget"]] };
  e.default = t;
} }), I_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-disabled": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget"]] };
  e.default = t;
} }), L_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/inputRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null }, relatedConcepts: [{ concept: { name: "input" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget"]] };
  e.default = t;
} }), k_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), B_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-valuemax": null, "aria-valuemin": null, "aria-valuenow": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] };
  e.default = t;
} }), D_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: { "aria-atomic": null, "aria-busy": null, "aria-controls": null, "aria-current": null, "aria-describedby": null, "aria-details": null, "aria-dropeffect": null, "aria-flowto": null, "aria-grabbed": null, "aria-hidden": null, "aria-keyshortcuts": null, "aria-label": null, "aria-labelledby": null, "aria-live": null, "aria-owns": null, "aria-relevant": null, "aria-roledescription": null }, relatedConcepts: [{ concept: { name: "role" }, module: "XHTML" }, { concept: { name: "type" }, module: "Dublin Core" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [] };
  e.default = t;
} }), F_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "frontmatter" }, module: "DTB" }, { concept: { name: "level" }, module: "DTB" }, { concept: { name: "level" }, module: "SMIL" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] };
  e.default = t;
} }), U_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] };
  e.default = t;
} }), H_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/selectRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]] };
  e.default = t;
} }), V_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/structureRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype"]] };
  e.default = t;
} }), z_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype"]] };
  e.default = t;
} }), G_ = R({ "../../node_modules/aria-query/lib/etc/roles/abstract/windowRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-modal": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype"]] };
  e.default = t;
} }), W_ = R({ "../../node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = p($_()), r = p(I_()), n = p(L_()), o = p(k_()), l = p(B_()), a = p(D_()), i = p(F_()), u = p(U_()), c = p(H_()), s = p(V_()), d = p(z_()), f = p(G_());
  function p(b) {
    return b && b.__esModule ? b : { default: b };
  }
  var m = [["command", t.default], ["composite", r.default], ["input", n.default], ["landmark", o.default], ["range", l.default], ["roletype", a.default], ["section", i.default], ["sectionhead", u.default], ["select", c.default], ["structure", s.default], ["widget", d.default], ["window", f.default]];
  e.default = m;
} }), K_ = R({ "../../node_modules/aria-query/lib/etc/roles/literal/alertRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-atomic": "true", "aria-live": "assertive" }, relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), Y_ = R({ "../../node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]] };
  e.default = t;
} }), J_ = R({ "../../node_modules/aria-query/lib/etc/roles/literal/applicationRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "Device Independence Delivery Unit" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] };
  e.default = t;
} }), X_ = R({ "../../node_modules/aria-query/lib/etc/roles/literal/articleRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { name: "article" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "document"]] };
  e.default = t;
} }), Q_ = R({ "../../node_modules/aria-query/lib/etc/roles/literal/bannerRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { constraints: ["scoped to the body element"], name: "header" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Z_ = R({ "../../node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "blockquote" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), eR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/buttonRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null, "aria-pressed": null }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "button" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ name: "type", value: "image" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ name: "type", value: "reset" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ name: "type", value: "submit" }], name: "input" }, module: "HTML" }, { concept: { name: "button" }, module: "HTML" }, { concept: { name: "trigger" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command"]] };
  e.default = t;
} }), tR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/captionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "caption" }, module: "HTML" }], requireContextRole: ["figure", "grid", "table"], requiredContextRole: ["figure", "grid", "table"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), rR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/cellRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-colindex": null, "aria-colspan": null, "aria-rowindex": null, "aria-rowspan": null }, relatedConcepts: [{ concept: { constraints: ["ancestor table element has table role"], name: "td" }, module: "HTML" }], requireContextRole: ["row"], requiredContextRole: ["row"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), nR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-checked": null, "aria-errormessage": null, "aria-expanded": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "checkbox" }], name: "input" }, module: "HTML" }, { concept: { name: "option" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input"]] };
  e.default = t;
} }), oR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/codeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "code" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), aR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-sort": null }, relatedConcepts: [{ concept: { name: "th" }, module: "HTML" }, { concept: { attributes: [{ name: "scope", value: "col" }], name: "th" }, module: "HTML" }, { concept: { attributes: [{ name: "scope", value: "colgroup" }], name: "th" }, module: "HTML" }], requireContextRole: ["row"], requiredContextRole: ["row"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]] };
  e.default = t;
} }), lR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-autocomplete": null, "aria-errormessage": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null, "aria-expanded": "false", "aria-haspopup": "listbox" }, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "email" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "search" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "tel" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "text" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "url" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "url" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "multiple" }, { constraints: ["undefined"], name: "size" }], constraints: ["the multiple attribute is not set and the size attribute does not have a value greater than 1"], name: "select" }, module: "HTML" }, { concept: { name: "select" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-controls": null, "aria-expanded": "false" }, superClass: [["roletype", "widget", "input"]] };
  e.default = t;
} }), iR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { constraints: ["scoped to the body element", "scoped to the main element"], name: "aside" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-label" }], constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "aside" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-labelledby" }], constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "aside" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), sR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { constraints: ["scoped to the body element"], name: "footer" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), uR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/definitionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "dd" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), cR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/deletionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "del" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), dR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/dialogRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "dialog" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "window"]] };
  e.default = t;
} }), pR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/directoryRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ module: "DAISY Guide" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "list"]] };
  e.default = t;
} }), fR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/documentRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "Device Independence Delivery Unit" } }, { concept: { name: "html" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] };
  e.default = t;
} }), mR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "em" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), hR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/feedRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["article"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "list"]] };
  e.default = t;
} }), bR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/figureRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "figure" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), yR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/formRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "aria-label" }], name: "form" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-labelledby" }], name: "form" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "name" }], name: "form" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), gR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/genericRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "a" }, module: "HTML" }, { concept: { name: "area" }, module: "HTML" }, { concept: { name: "aside" }, module: "HTML" }, { concept: { name: "b" }, module: "HTML" }, { concept: { name: "bdo" }, module: "HTML" }, { concept: { name: "body" }, module: "HTML" }, { concept: { name: "data" }, module: "HTML" }, { concept: { name: "div" }, module: "HTML" }, { concept: { constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "footer" }, module: "HTML" }, { concept: { constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "header" }, module: "HTML" }, { concept: { name: "hgroup" }, module: "HTML" }, { concept: { name: "i" }, module: "HTML" }, { concept: { name: "pre" }, module: "HTML" }, { concept: { name: "q" }, module: "HTML" }, { concept: { name: "samp" }, module: "HTML" }, { concept: { name: "section" }, module: "HTML" }, { concept: { name: "small" }, module: "HTML" }, { concept: { name: "span" }, module: "HTML" }, { concept: { name: "u" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] };
  e.default = t;
} }), vR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/gridRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-multiselectable": null, "aria-readonly": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["row"], ["row", "rowgroup"]], requiredProps: {}, superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]] };
  e.default = t;
} }), _R = R({ "../../node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null, "aria-selected": null }, relatedConcepts: [{ concept: { constraints: ["ancestor table element has grid role", "ancestor table element has treegrid role"], name: "td" }, module: "HTML" }], requireContextRole: ["row"], requiredContextRole: ["row"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]] };
  e.default = t;
} }), RR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/groupRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-disabled": null }, relatedConcepts: [{ concept: { name: "details" }, module: "HTML" }, { concept: { name: "fieldset" }, module: "HTML" }, { concept: { name: "optgroup" }, module: "HTML" }, { concept: { name: "address" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), wR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/headingRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-level": "2" }, relatedConcepts: [{ concept: { name: "h1" }, module: "HTML" }, { concept: { name: "h2" }, module: "HTML" }, { concept: { name: "h3" }, module: "HTML" }, { concept: { name: "h4" }, module: "HTML" }, { concept: { name: "h5" }, module: "HTML" }, { concept: { name: "h6" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-level": "2" }, superClass: [["roletype", "structure", "sectionhead"]] };
  e.default = t;
} }), ER = R({ "../../node_modules/aria-query/lib/etc/roles/literal/imgRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "alt" }], name: "img" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "alt" }], name: "img" }, module: "HTML" }, { concept: { name: "imggroup" }, module: "DTB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), CR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/insertionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "ins" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), qR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/linkRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null }, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "href" }], name: "a" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "href" }], name: "area" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command"]] };
  e.default = t;
} }), PR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/listRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "menu" }, module: "HTML" }, { concept: { name: "ol" }, module: "HTML" }, { concept: { name: "ul" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["listitem"]], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), OR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/listboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-expanded": null, "aria-invalid": null, "aria-multiselectable": null, "aria-readonly": null, "aria-required": null, "aria-orientation": "vertical" }, relatedConcepts: [{ concept: { attributes: [{ constraints: [">1"], name: "size" }], constraints: ["the size attribute value is greater than 1"], name: "select" }, module: "HTML" }, { concept: { attributes: [{ name: "multiple" }], name: "select" }, module: "HTML" }, { concept: { name: "datalist" }, module: "HTML" }, { concept: { name: "list" }, module: "ARIA" }, { concept: { name: "select" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["option", "group"], ["option"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] };
  e.default = t;
} }), TR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/listitemRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-level": null, "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { constraints: ["direct descendant of ol", "direct descendant of ul", "direct descendant of menu"], name: "li" }, module: "HTML" }, { concept: { name: "item" }, module: "XForms" }], requireContextRole: ["directory", "list"], requiredContextRole: ["directory", "list"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), SR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/logRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-live": "polite" }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), MR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/mainRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "main" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), AR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/markRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: [], props: { "aria-braillelabel": null, "aria-brailleroledescription": null, "aria-description": null }, relatedConcepts: [{ concept: { name: "mark" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), xR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), jR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/mathRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "math" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), NR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/menuRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": "vertical" }, relatedConcepts: [{ concept: { name: "MENU" }, module: "JAPI" }, { concept: { name: "list" }, module: "ARIA" }, { concept: { name: "select" }, module: "XForms" }, { concept: { name: "sidebar" }, module: "DTB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] };
  e.default = t;
} }), $R = R({ "../../node_modules/aria-query/lib/etc/roles/literal/menubarRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": "horizontal" }, relatedConcepts: [{ concept: { name: "toolbar" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]] };
  e.default = t;
} }), IR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null, "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { name: "MENU_ITEM" }, module: "JAPI" }, { concept: { name: "listitem" }, module: "ARIA" }, { concept: { name: "option" }, module: "ARIA" }], requireContextRole: ["group", "menu", "menubar"], requiredContextRole: ["group", "menu", "menubar"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command"]] };
  e.default = t;
} }), LR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }], requireContextRole: ["group", "menu", "menubar"], requiredContextRole: ["group", "menu", "menubar"], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]] };
  e.default = t;
} }), kR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }], requireContextRole: ["group", "menu", "menubar"], requiredContextRole: ["group", "menu", "menubar"], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]] };
  e.default = t;
} }), BR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/meterRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-valuetext": null, "aria-valuemax": "100", "aria-valuemin": "0" }, relatedConcepts: [{ concept: { name: "meter" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-valuenow": null }, superClass: [["roletype", "structure", "range"]] };
  e.default = t;
} }), DR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/navigationRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "nav" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), FR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/noneRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [] };
  e.default = t;
} }), UR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/noteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), HR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/optionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-checked": null, "aria-posinset": null, "aria-setsize": null, "aria-selected": "false" }, relatedConcepts: [{ concept: { name: "item" }, module: "XForms" }, { concept: { name: "listitem" }, module: "ARIA" }, { concept: { name: "option" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-selected": "false" }, superClass: [["roletype", "widget", "input"]] };
  e.default = t;
} }), VR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "p" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), zR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/presentationRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { attributes: [{ name: "alt", value: "" }], name: "img" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] };
  e.default = t;
} }), GR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-valuetext": null }, relatedConcepts: [{ concept: { name: "progress" }, module: "HTML" }, { concept: { name: "status" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "range"], ["roletype", "widget"]] };
  e.default = t;
} }), WR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/radioRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-checked": null, "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "radio" }], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input"]] };
  e.default = t;
} }), KR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null }, relatedConcepts: [{ concept: { name: "list" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["radio"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] };
  e.default = t;
} }), YR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/regionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "aria-label" }], name: "section" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-labelledby" }], name: "section" }, module: "HTML" }, { concept: { name: "Device Independence Glossart perceivable unit" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), JR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/rowRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-colindex": null, "aria-expanded": null, "aria-level": null, "aria-posinset": null, "aria-rowindex": null, "aria-selected": null, "aria-setsize": null }, relatedConcepts: [{ concept: { name: "tr" }, module: "HTML" }], requireContextRole: ["grid", "rowgroup", "table", "treegrid"], requiredContextRole: ["grid", "rowgroup", "table", "treegrid"], requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]] };
  e.default = t;
} }), XR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "tbody" }, module: "HTML" }, { concept: { name: "tfoot" }, module: "HTML" }, { concept: { name: "thead" }, module: "HTML" }], requireContextRole: ["grid", "table", "treegrid"], requiredContextRole: ["grid", "table", "treegrid"], requiredOwnedElements: [["row"]], requiredProps: {}, superClass: [["roletype", "structure"]] };
  e.default = t;
} }), QR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-sort": null }, relatedConcepts: [{ concept: { attributes: [{ name: "scope", value: "row" }], name: "th" }, module: "HTML" }, { concept: { attributes: [{ name: "scope", value: "rowgroup" }], name: "th" }, module: "HTML" }], requireContextRole: ["row", "rowgroup"], requiredContextRole: ["row", "rowgroup"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]] };
  e.default = t;
} }), ZR = R({ "../../node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-valuetext": null, "aria-orientation": "vertical", "aria-valuemax": "100", "aria-valuemin": "0" }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-controls": null, "aria-valuenow": null }, superClass: [["roletype", "structure", "range"], ["roletype", "widget"]] };
  e.default = t;
} }), ew = R({ "../../node_modules/aria-query/lib/etc/roles/literal/searchRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), tw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "search" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "input", "textbox"]] };
  e.default = t;
} }), rw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/separatorRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-orientation": "horizontal", "aria-valuemax": "100", "aria-valuemin": "0", "aria-valuenow": null, "aria-valuetext": null }, relatedConcepts: [{ concept: { name: "hr" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] };
  e.default = t;
} }), nw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/sliderRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-haspopup": null, "aria-invalid": null, "aria-readonly": null, "aria-valuetext": null, "aria-orientation": "horizontal", "aria-valuemax": "100", "aria-valuemin": "0" }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "range" }], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-valuenow": null }, superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]] };
  e.default = t;
} }), ow = R({ "../../node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null, "aria-valuetext": null, "aria-valuenow": "0" }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "number" }], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]] };
  e.default = t;
} }), aw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/statusRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-atomic": "true", "aria-live": "polite" }, relatedConcepts: [{ concept: { name: "output" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), lw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/strongRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "strong" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), iw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "sub" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), sw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "sup" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), uw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/switchRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "button" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input", "checkbox"]] };
  e.default = t;
} }), cw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/tabRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null, "aria-posinset": null, "aria-setsize": null, "aria-selected": "false" }, relatedConcepts: [], requireContextRole: ["tablist"], requiredContextRole: ["tablist"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]] };
  e.default = t;
} }), dw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/tableRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-colcount": null, "aria-rowcount": null }, relatedConcepts: [{ concept: { name: "table" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["row"], ["row", "rowgroup"]], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), pw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/tablistRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-level": null, "aria-multiselectable": null, "aria-orientation": "horizontal" }, relatedConcepts: [{ module: "DAISY", concept: { name: "guide" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["tab"]], requiredProps: {}, superClass: [["roletype", "widget", "composite"]] };
  e.default = t;
} }), fw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), mw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/termRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "dfn" }, module: "HTML" }, { concept: { name: "dt" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), hw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/textboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-autocomplete": null, "aria-errormessage": null, "aria-haspopup": null, "aria-invalid": null, "aria-multiline": null, "aria-placeholder": null, "aria-readonly": null, "aria-required": null }, relatedConcepts: [{ concept: { attributes: [{ constraints: ["undefined"], name: "type" }, { constraints: ["undefined"], name: "list" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "email" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "tel" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "text" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "url" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { name: "input" }, module: "XForms" }, { concept: { name: "textarea" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "input"]] };
  e.default = t;
} }), bw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/timeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "time" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), yw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/timerRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "status"]] };
  e.default = t;
} }), gw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": "horizontal" }, relatedConcepts: [{ concept: { name: "menubar" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "group"]] };
  e.default = t;
} }), vw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), _w = R({ "../../node_modules/aria-query/lib/etc/roles/literal/treeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null, "aria-multiselectable": null, "aria-required": null, "aria-orientation": "vertical" }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["treeitem", "group"], ["treeitem"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] };
  e.default = t;
} }), Rw = R({ "../../node_modules/aria-query/lib/etc/roles/literal/treegridRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["row"], ["row", "rowgroup"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]] };
  e.default = t;
} }), ww = R({ "../../node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-expanded": null, "aria-haspopup": null }, relatedConcepts: [], requireContextRole: ["group", "tree"], requiredContextRole: ["group", "tree"], requiredOwnedElements: [], requiredProps: { "aria-selected": null }, superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]] };
  e.default = t;
} }), Ew = R({ "../../node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = x(K_()), r = x(Y_()), n = x(J_()), o = x(X_()), l = x(Q_()), a = x(Z_()), i = x(eR()), u = x(tR()), c = x(rR()), s = x(nR()), d = x(oR()), f = x(aR()), p = x(lR()), m = x(iR()), b = x(sR()), h = x(uR()), y = x(cR()), g = x(dR()), q = x(pR()), C = x(fR()), E = x(mR()), _ = x(hR()), v = x(bR()), w = x(yR()), P = x(gR()), j = x(vR()), $ = x(_R()), k = x(RR()), L = x(wR()), S = x(ER()), B = x(CR()), z = x(qR()), Y = x(PR()), K = x(OR()), Z = x(TR()), he = x(SR()), ue = x(MR()), U = x(AR()), D = x(xR()), F = x(jR()), W = x(NR()), V = x($R()), ee = x(IR()), ne = x(LR()), Ie = x(kR()), A = x(BR()), G = x(DR()), H = x(FR()), Q = x(UR()), I = x(HR()), le = x(VR()), fe = x(zR()), ge = x(GR()), Ye = x(WR()), Vo = x(KR()), zo = x(YR()), Go = x(JR()), Wo = x(XR()), Ko = x(QR()), Yo = x(ZR()), Jo = x(ew()), Xo = x(tw()), Qo = x(rw()), Zo = x(nw()), ea = x(ow()), ta = x(aw()), ra = x(lw()), na = x(iw()), oa = x(sw()), aa = x(uw()), la = x(cw()), ia = x(dw()), sa = x(pw()), ua = x(fw()), ca = x(mw()), da = x(hw()), pa = x(bw()), fa = x(yw()), ma = x(gw()), ha = x(vw()), ba = x(_w()), ya = x(Rw()), ga = x(ww());
  function x(nr) {
    return nr && nr.__esModule ? nr : { default: nr };
  }
  var va = [["alert", t.default], ["alertdialog", r.default], ["application", n.default], ["article", o.default], ["banner", l.default], ["blockquote", a.default], ["button", i.default], ["caption", u.default], ["cell", c.default], ["checkbox", s.default], ["code", d.default], ["columnheader", f.default], ["combobox", p.default], ["complementary", m.default], ["contentinfo", b.default], ["definition", h.default], ["deletion", y.default], ["dialog", g.default], ["directory", q.default], ["document", C.default], ["emphasis", E.default], ["feed", _.default], ["figure", v.default], ["form", w.default], ["generic", P.default], ["grid", j.default], ["gridcell", $.default], ["group", k.default], ["heading", L.default], ["img", S.default], ["insertion", B.default], ["link", z.default], ["list", Y.default], ["listbox", K.default], ["listitem", Z.default], ["log", he.default], ["main", ue.default], ["mark", U.default], ["marquee", D.default], ["math", F.default], ["menu", W.default], ["menubar", V.default], ["menuitem", ee.default], ["menuitemcheckbox", ne.default], ["menuitemradio", Ie.default], ["meter", A.default], ["navigation", G.default], ["none", H.default], ["note", Q.default], ["option", I.default], ["paragraph", le.default], ["presentation", fe.default], ["progressbar", ge.default], ["radio", Ye.default], ["radiogroup", Vo.default], ["region", zo.default], ["row", Go.default], ["rowgroup", Wo.default], ["rowheader", Ko.default], ["scrollbar", Yo.default], ["search", Jo.default], ["searchbox", Xo.default], ["separator", Qo.default], ["slider", Zo.default], ["spinbutton", ea.default], ["status", ta.default], ["strong", ra.default], ["subscript", na.default], ["superscript", oa.default], ["switch", aa.default], ["tab", la.default], ["table", ia.default], ["tablist", sa.default], ["tabpanel", ua.default], ["term", ca.default], ["textbox", da.default], ["time", pa.default], ["timer", fa.default], ["toolbar", ma.default], ["tooltip", ha.default], ["tree", ba.default], ["treegrid", ya.default], ["treeitem", ga.default]];
  e.default = va;
} }), Cw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "abstract [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), qw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "acknowledgments [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Pw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "afterword [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Ow = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "appendix [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Tw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "referrer [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] };
  e.default = t;
} }), Sw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "EPUB biblioentry [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: ["doc-bibliography"], requiredContextRole: ["doc-bibliography"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "listitem"]] };
  e.default = t;
} }), Mw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "bibliography [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["doc-biblioentry"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Aw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "biblioref [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] };
  e.default = t;
} }), xw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "chapter [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), jw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "colophon [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), Nw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "conclusion [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), $w = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "cover [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "img"]] };
  e.default = t;
} }), Iw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "credit [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), Lw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "credits [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), kw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "dedication [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), Bw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "rearnote [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: ["doc-endnotes"], requiredContextRole: ["doc-endnotes"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "listitem"]] };
  e.default = t;
} }), Dw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "rearnotes [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["doc-endnote"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Fw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "epigraph [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), Uw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "epilogue [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Hw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "errata [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Vw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), zw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "footnote [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), Gw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "foreword [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Ww = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "glossary [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["definition"], ["term"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Kw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "glossref [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] };
  e.default = t;
} }), Yw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "index [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark", "navigation"]] };
  e.default = t;
} }), Jw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "introduction [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), Xw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "noteref [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] };
  e.default = t;
} }), Qw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "notice [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "note"]] };
  e.default = t;
} }), Zw = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "pagebreak [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "separator"]] };
  e.default = t;
} }), eE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPagefooterRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: [], props: { "aria-braillelabel": null, "aria-brailleroledescription": null, "aria-description": null, "aria-disabled": null, "aria-errormessage": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), tE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPageheaderRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: [], props: { "aria-braillelabel": null, "aria-brailleroledescription": null, "aria-description": null, "aria-disabled": null, "aria-errormessage": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), rE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "page-list [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark", "navigation"]] };
  e.default = t;
} }), nE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "part [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), oE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "preface [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), aE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "prologue [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] };
  e.default = t;
} }), lE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "pullquote [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["none"]] };
  e.default = t;
} }), iE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "qna [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] };
  e.default = t;
} }), sE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "subtitle [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "sectionhead"]] };
  e.default = t;
} }), uE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "help [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "note"]] };
  e.default = t;
} }), cE = R({ "../../node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "toc [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark", "navigation"]] };
  e.default = t;
} }), dE = R({ "../../node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = V(Cw()), r = V(qw()), n = V(Pw()), o = V(Ow()), l = V(Tw()), a = V(Sw()), i = V(Mw()), u = V(Aw()), c = V(xw()), s = V(jw()), d = V(Nw()), f = V($w()), p = V(Iw()), m = V(Lw()), b = V(kw()), h = V(Bw()), y = V(Dw()), g = V(Fw()), q = V(Uw()), C = V(Hw()), E = V(Vw()), _ = V(zw()), v = V(Gw()), w = V(Ww()), P = V(Kw()), j = V(Yw()), $ = V(Jw()), k = V(Xw()), L = V(Qw()), S = V(Zw()), B = V(eE()), z = V(tE()), Y = V(rE()), K = V(nE()), Z = V(oE()), he = V(aE()), ue = V(lE()), U = V(iE()), D = V(sE()), F = V(uE()), W = V(cE());
  function V(ne) {
    return ne && ne.__esModule ? ne : { default: ne };
  }
  var ee = [["doc-abstract", t.default], ["doc-acknowledgments", r.default], ["doc-afterword", n.default], ["doc-appendix", o.default], ["doc-backlink", l.default], ["doc-biblioentry", a.default], ["doc-bibliography", i.default], ["doc-biblioref", u.default], ["doc-chapter", c.default], ["doc-colophon", s.default], ["doc-conclusion", d.default], ["doc-cover", f.default], ["doc-credit", p.default], ["doc-credits", m.default], ["doc-dedication", b.default], ["doc-endnote", h.default], ["doc-endnotes", y.default], ["doc-epigraph", g.default], ["doc-epilogue", q.default], ["doc-errata", C.default], ["doc-example", E.default], ["doc-footnote", _.default], ["doc-foreword", v.default], ["doc-glossary", w.default], ["doc-glossref", P.default], ["doc-index", j.default], ["doc-introduction", $.default], ["doc-noteref", k.default], ["doc-notice", L.default], ["doc-pagebreak", S.default], ["doc-pagefooter", B.default], ["doc-pageheader", z.default], ["doc-pagelist", Y.default], ["doc-part", K.default], ["doc-preface", Z.default], ["doc-prologue", he.default], ["doc-pullquote", ue.default], ["doc-qna", U.default], ["doc-subtitle", D.default], ["doc-tip", F.default], ["doc-toc", W.default]];
  e.default = ee;
} }), pE = R({ "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ module: "GRAPHICS", concept: { name: "graphics-object" } }, { module: "ARIA", concept: { name: "img" } }, { module: "ARIA", concept: { name: "article" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "document"]] };
  e.default = t;
} }), fE = R({ "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ module: "GRAPHICS", concept: { name: "graphics-document" } }, { module: "ARIA", concept: { name: "group" } }, { module: "ARIA", concept: { name: "img" } }, { module: "GRAPHICS", concept: { name: "graphics-symbol" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "group"]] };
  e.default = t;
} }), mE = R({ "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "img"]] };
  e.default = t;
} }), hE = R({ "../../node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = o(pE()), r = o(fE()), n = o(mE());
  function o(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var l = [["graphics-document", t.default], ["graphics-object", r.default], ["graphics-symbol", n.default]];
  e.default = l;
} }), gi = R({ "../../node_modules/aria-query/lib/rolesMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = a(W_()), r = a(Ew()), n = a(dE()), o = a(hE()), l = a(mn());
  function a(h) {
    return h && h.__esModule ? h : { default: h };
  }
  function i(h, y) {
    var g = typeof Symbol < "u" && h[Symbol.iterator] || h["@@iterator"];
    if (!g) {
      if (Array.isArray(h) || (g = s(h)) || y) {
        g && (h = g);
        var q = 0, C = function() {
        };
        return { s: C, n: function() {
          return q >= h.length ? { done: !0 } : { done: !1, value: h[q++] };
        }, e: function(w) {
          throw w;
        }, f: C };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var E, _ = !0, v = !1;
    return { s: function() {
      g = g.call(h);
    }, n: function() {
      var w = g.next();
      return _ = w.done, w;
    }, e: function(w) {
      v = !0, E = w;
    }, f: function() {
      try {
        _ || g.return == null || g.return();
      } finally {
        if (v) throw E;
      }
    } };
  }
  function u(h, y) {
    return p(h) || f(h, y) || s(h, y) || c();
  }
  function c() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function s(h, y) {
    if (h) {
      if (typeof h == "string") return d(h, y);
      var g = {}.toString.call(h).slice(8, -1);
      return g === "Object" && h.constructor && (g = h.constructor.name), g === "Map" || g === "Set" ? Array.from(h) : g === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(g) ? d(h, y) : void 0;
    }
  }
  function d(h, y) {
    (y == null || y > h.length) && (y = h.length);
    for (var g = 0, q = Array(y); g < y; g++) q[g] = h[g];
    return q;
  }
  function f(h, y) {
    var g = h == null ? null : typeof Symbol < "u" && h[Symbol.iterator] || h["@@iterator"];
    if (g != null) {
      var q, C, E, _, v = [], w = !0, P = !1;
      try {
        if (E = (g = g.call(h)).next, y === 0) {
          if (Object(g) !== g) return;
          w = !1;
        } else for (; !(w = (q = E.call(g)).done) && (v.push(q.value), v.length !== y); w = !0) ;
      } catch (j) {
        P = !0, C = j;
      } finally {
        try {
          if (!w && g.return != null && (_ = g.return(), Object(_) !== _)) return;
        } finally {
          if (P) throw C;
        }
      }
      return v;
    }
  }
  function p(h) {
    if (Array.isArray(h)) return h;
  }
  var m = [].concat(t.default, r.default, n.default, o.default);
  m.forEach(function(h) {
    var y = u(h, 2), g = y[1], q = i(g.superClass), C;
    try {
      for (q.s(); !(C = q.n()).done; ) {
        var E = C.value, _ = i(E), v;
        try {
          var w = function() {
            var P = v.value, j = m.filter(function(B) {
              var z = u(B, 1), Y = z[0];
              return Y === P;
            })[0];
            if (j) for (var $ = j[1], k = 0, L = Object.keys($.props); k < L.length; k++) {
              var S = L[k];
              Object.prototype.hasOwnProperty.call(g.props, S) || (g.props[S] = $.props[S]);
            }
          };
          for (_.s(); !(v = _.n()).done; ) w();
        } catch (P) {
          _.e(P);
        } finally {
          _.f();
        }
      }
    } catch (P) {
      q.e(P);
    } finally {
      q.f();
    }
  });
  var b = { entries: function() {
    return m;
  }, forEach: function(h) {
    var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, g = i(m), q;
    try {
      for (g.s(); !(q = g.n()).done; ) {
        var C = u(q.value, 2), E = C[0], _ = C[1];
        h.call(y, _, E, m);
      }
    } catch (v) {
      g.e(v);
    } finally {
      g.f();
    }
  }, get: function(h) {
    var y = m.filter(function(g) {
      return g[0] === h;
    })[0];
    return y && y[1];
  }, has: function(h) {
    return !!b.get(h);
  }, keys: function() {
    return m.map(function(h) {
      var y = u(h, 1), g = y[0];
      return g;
    });
  }, values: function() {
    return m.map(function(h) {
      var y = u(h, 2), g = y[1];
      return g;
    });
  } };
  e.default = (0, l.default)(b, b.entries());
} }), bE = R({ "../../node_modules/aria-query/lib/elementRoleMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = n(mn()), r = n(gi());
  function n(_) {
    return _ && _.__esModule ? _ : { default: _ };
  }
  function o(_, v) {
    return c(_) || u(_, v) || a(_, v) || l();
  }
  function l() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function a(_, v) {
    if (_) {
      if (typeof _ == "string") return i(_, v);
      var w = {}.toString.call(_).slice(8, -1);
      return w === "Object" && _.constructor && (w = _.constructor.name), w === "Map" || w === "Set" ? Array.from(_) : w === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(w) ? i(_, v) : void 0;
    }
  }
  function i(_, v) {
    (v == null || v > _.length) && (v = _.length);
    for (var w = 0, P = Array(v); w < v; w++) P[w] = _[w];
    return P;
  }
  function u(_, v) {
    var w = _ == null ? null : typeof Symbol < "u" && _[Symbol.iterator] || _["@@iterator"];
    if (w != null) {
      var P, j, $, k, L = [], S = !0, B = !1;
      try {
        if ($ = (w = w.call(_)).next, v === 0) {
          if (Object(w) !== w) return;
          S = !1;
        } else for (; !(S = (P = $.call(w)).done) && (L.push(P.value), L.length !== v); S = !0) ;
      } catch (z) {
        B = !0, j = z;
      } finally {
        try {
          if (!S && w.return != null && (k = w.return(), Object(k) !== k)) return;
        } finally {
          if (B) throw j;
        }
      }
      return L;
    }
  }
  function c(_) {
    if (Array.isArray(_)) return _;
  }
  var s = [], d = r.default.keys();
  for (y = 0; y < d.length; y++) if (f = d[y], p = r.default.get(f), p) for (m = [].concat(p.baseConcepts, p.relatedConcepts), b = function() {
    var _ = m[h];
    if (_.module === "HTML") {
      var v = _.concept;
      if (v) {
        var w = s.filter(function(k) {
          return q(k[0], v);
        })[0], P;
        w ? P = w[1] : P = [];
        for (var j = !0, $ = 0; $ < P.length; $++) if (P[$] === f) {
          j = !1;
          break;
        }
        j && P.push(f), w || s.push([v, P]);
      }
    }
  }, h = 0; h < m.length; h++) b();
  var f, p, m, b, h, y, g = { entries: function() {
    return s;
  }, forEach: function(_) {
    for (var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, w = 0, P = s; w < P.length; w++) {
      var j = o(P[w], 2), $ = j[0], k = j[1];
      _.call(v, k, $, s);
    }
  }, get: function(_) {
    var v = s.filter(function(w) {
      return _.name === w[0].name && E(_.attributes, w[0].attributes);
    })[0];
    return v && v[1];
  }, has: function(_) {
    return !!g.get(_);
  }, keys: function() {
    return s.map(function(_) {
      var v = o(_, 1), w = v[0];
      return w;
    });
  }, values: function() {
    return s.map(function(_) {
      var v = o(_, 2), w = v[1];
      return w;
    });
  } };
  function q(_, v) {
    return _.name === v.name && C(_.constraints, v.constraints) && E(_.attributes, v.attributes);
  }
  function C(_, v) {
    if (_ === void 0 && v !== void 0 || _ !== void 0 && v === void 0) return !1;
    if (_ !== void 0 && v !== void 0) {
      if (_.length !== v.length) return !1;
      for (var w = 0; w < _.length; w++) if (_[w] !== v[w]) return !1;
    }
    return !0;
  }
  function E(_, v) {
    if (_ === void 0 && v !== void 0 || _ !== void 0 && v === void 0) return !1;
    if (_ !== void 0 && v !== void 0) {
      if (_.length !== v.length) return !1;
      for (var w = 0; w < _.length; w++) {
        if (_[w].name !== v[w].name || _[w].value !== v[w].value || _[w].constraints === void 0 && v[w].constraints !== void 0 || _[w].constraints !== void 0 && v[w].constraints === void 0) return !1;
        if (_[w].constraints !== void 0 && v[w].constraints !== void 0) {
          if (_[w].constraints.length !== v[w].constraints.length) return !1;
          for (var P = 0; P < _[w].constraints.length; P++) if (_[w].constraints[P] !== v[w].constraints[P]) return !1;
        }
      }
    }
    return !0;
  }
  e.default = (0, t.default)(g, g.entries());
} }), yE = R({ "../../node_modules/aria-query/lib/roleElementMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = n(mn()), r = n(gi());
  function n(E) {
    return E && E.__esModule ? E : { default: E };
  }
  function o(E, _) {
    return c(E) || u(E, _) || a(E, _) || l();
  }
  function l() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function a(E, _) {
    if (E) {
      if (typeof E == "string") return i(E, _);
      var v = {}.toString.call(E).slice(8, -1);
      return v === "Object" && E.constructor && (v = E.constructor.name), v === "Map" || v === "Set" ? Array.from(E) : v === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v) ? i(E, _) : void 0;
    }
  }
  function i(E, _) {
    (_ == null || _ > E.length) && (_ = E.length);
    for (var v = 0, w = Array(_); v < _; v++) w[v] = E[v];
    return w;
  }
  function u(E, _) {
    var v = E == null ? null : typeof Symbol < "u" && E[Symbol.iterator] || E["@@iterator"];
    if (v != null) {
      var w, P, j, $, k = [], L = !0, S = !1;
      try {
        if (j = (v = v.call(E)).next, _ === 0) {
          if (Object(v) !== v) return;
          L = !1;
        } else for (; !(L = (w = j.call(v)).done) && (k.push(w.value), k.length !== _); L = !0) ;
      } catch (B) {
        S = !0, P = B;
      } finally {
        try {
          if (!L && v.return != null && ($ = v.return(), Object($) !== $)) return;
        } finally {
          if (S) throw P;
        }
      }
      return k;
    }
  }
  function c(E) {
    if (Array.isArray(E)) return E;
  }
  var s = [], d = r.default.keys();
  for (q = 0; q < d.length; q++) if (f = d[q], p = r.default.get(f), m = [], p) {
    for (b = [].concat(p.baseConcepts, p.relatedConcepts), g = 0; g < b.length; g++) h = b[g], h.module === "HTML" && (y = h.concept, y != null && m.push(y));
    m.length > 0 && s.push([f, m]);
  }
  var f, p, m, b, h, y, g, q, C = { entries: function() {
    return s;
  }, forEach: function(E) {
    for (var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, v = 0, w = s; v < w.length; v++) {
      var P = o(w[v], 2), j = P[0], $ = P[1];
      E.call(_, $, j, s);
    }
  }, get: function(E) {
    var _ = s.filter(function(v) {
      return v[0] === E;
    })[0];
    return _ && _[1];
  }, has: function(E) {
    return !!C.get(E);
  }, keys: function() {
    return s.map(function(E) {
      var _ = o(E, 1), v = _[0];
      return v;
    });
  }, values: function() {
    return s.map(function(E) {
      var _ = o(E, 2), v = _[1];
      return v;
    });
  } };
  e.default = (0, t.default)(C, C.entries());
} }), Ep = R({ "../../node_modules/aria-query/lib/index.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.roles = e.roleElements = e.elementRoles = e.dom = e.aria = void 0;
  var t = a(j_()), r = a(N_()), n = a(gi()), o = a(bE()), l = a(yE());
  function a(i) {
    return i && i.__esModule ? i : { default: i };
  }
  e.aria = t.default, e.dom = r.default, e.roles = n.default, e.elementRoles = o.default, e.roleElements = l.default;
} }), gE = R({ "../../node_modules/color-name/index.js"(e, t) {
  t.exports = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] };
} }), Cp = R({ "../../node_modules/color-convert/conversions.js"(e, t) {
  var r = gE(), n = {};
  for (let a of Object.keys(r)) n[r[a]] = a;
  var o = { rgb: { channels: 3, labels: "rgb" }, hsl: { channels: 3, labels: "hsl" }, hsv: { channels: 3, labels: "hsv" }, hwb: { channels: 3, labels: "hwb" }, cmyk: { channels: 4, labels: "cmyk" }, xyz: { channels: 3, labels: "xyz" }, lab: { channels: 3, labels: "lab" }, lch: { channels: 3, labels: "lch" }, hex: { channels: 1, labels: ["hex"] }, keyword: { channels: 1, labels: ["keyword"] }, ansi16: { channels: 1, labels: ["ansi16"] }, ansi256: { channels: 1, labels: ["ansi256"] }, hcg: { channels: 3, labels: ["h", "c", "g"] }, apple: { channels: 3, labels: ["r16", "g16", "b16"] }, gray: { channels: 1, labels: ["gray"] } };
  t.exports = o;
  for (let a of Object.keys(o)) {
    if (!("channels" in o[a])) throw new Error("missing channels property: " + a);
    if (!("labels" in o[a])) throw new Error("missing channel labels property: " + a);
    if (o[a].labels.length !== o[a].channels) throw new Error("channel and label counts mismatch: " + a);
    let { channels: i, labels: u } = o[a];
    delete o[a].channels, delete o[a].labels, Object.defineProperty(o[a], "channels", { value: i }), Object.defineProperty(o[a], "labels", { value: u });
  }
  o.rgb.hsl = function(a) {
    let i = a[0] / 255, u = a[1] / 255, c = a[2] / 255, s = Math.min(i, u, c), d = Math.max(i, u, c), f = d - s, p, m;
    d === s ? p = 0 : i === d ? p = (u - c) / f : u === d ? p = 2 + (c - i) / f : c === d && (p = 4 + (i - u) / f), p = Math.min(p * 60, 360), p < 0 && (p += 360);
    let b = (s + d) / 2;
    return d === s ? m = 0 : b <= 0.5 ? m = f / (d + s) : m = f / (2 - d - s), [p, m * 100, b * 100];
  }, o.rgb.hsv = function(a) {
    let i, u, c, s, d, f = a[0] / 255, p = a[1] / 255, m = a[2] / 255, b = Math.max(f, p, m), h = b - Math.min(f, p, m), y = function(g) {
      return (b - g) / 6 / h + 1 / 2;
    };
    return h === 0 ? (s = 0, d = 0) : (d = h / b, i = y(f), u = y(p), c = y(m), f === b ? s = c - u : p === b ? s = 1 / 3 + i - c : m === b && (s = 2 / 3 + u - i), s < 0 ? s += 1 : s > 1 && (s -= 1)), [s * 360, d * 100, b * 100];
  }, o.rgb.hwb = function(a) {
    let i = a[0], u = a[1], c = a[2], s = o.rgb.hsl(a)[0], d = 1 / 255 * Math.min(i, Math.min(u, c));
    return c = 1 - 1 / 255 * Math.max(i, Math.max(u, c)), [s, d * 100, c * 100];
  }, o.rgb.cmyk = function(a) {
    let i = a[0] / 255, u = a[1] / 255, c = a[2] / 255, s = Math.min(1 - i, 1 - u, 1 - c), d = (1 - i - s) / (1 - s) || 0, f = (1 - u - s) / (1 - s) || 0, p = (1 - c - s) / (1 - s) || 0;
    return [d * 100, f * 100, p * 100, s * 100];
  };
  function l(a, i) {
    return (a[0] - i[0]) ** 2 + (a[1] - i[1]) ** 2 + (a[2] - i[2]) ** 2;
  }
  o.rgb.keyword = function(a) {
    let i = n[a];
    if (i) return i;
    let u = 1 / 0, c;
    for (let s of Object.keys(r)) {
      let d = r[s], f = l(a, d);
      f < u && (u = f, c = s);
    }
    return c;
  }, o.keyword.rgb = function(a) {
    return r[a];
  }, o.rgb.xyz = function(a) {
    let i = a[0] / 255, u = a[1] / 255, c = a[2] / 255;
    i = i > 0.04045 ? ((i + 0.055) / 1.055) ** 2.4 : i / 12.92, u = u > 0.04045 ? ((u + 0.055) / 1.055) ** 2.4 : u / 12.92, c = c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92;
    let s = i * 0.4124 + u * 0.3576 + c * 0.1805, d = i * 0.2126 + u * 0.7152 + c * 0.0722, f = i * 0.0193 + u * 0.1192 + c * 0.9505;
    return [s * 100, d * 100, f * 100];
  }, o.rgb.lab = function(a) {
    let i = o.rgb.xyz(a), u = i[0], c = i[1], s = i[2];
    u /= 95.047, c /= 100, s /= 108.883, u = u > 8856e-6 ? u ** (1 / 3) : 7.787 * u + 16 / 116, c = c > 8856e-6 ? c ** (1 / 3) : 7.787 * c + 16 / 116, s = s > 8856e-6 ? s ** (1 / 3) : 7.787 * s + 16 / 116;
    let d = 116 * c - 16, f = 500 * (u - c), p = 200 * (c - s);
    return [d, f, p];
  }, o.hsl.rgb = function(a) {
    let i = a[0] / 360, u = a[1] / 100, c = a[2] / 100, s, d, f;
    if (u === 0) return f = c * 255, [f, f, f];
    c < 0.5 ? s = c * (1 + u) : s = c + u - c * u;
    let p = 2 * c - s, m = [0, 0, 0];
    for (let b = 0; b < 3; b++) d = i + 1 / 3 * -(b - 1), d < 0 && d++, d > 1 && d--, 6 * d < 1 ? f = p + (s - p) * 6 * d : 2 * d < 1 ? f = s : 3 * d < 2 ? f = p + (s - p) * (2 / 3 - d) * 6 : f = p, m[b] = f * 255;
    return m;
  }, o.hsl.hsv = function(a) {
    let i = a[0], u = a[1] / 100, c = a[2] / 100, s = u, d = Math.max(c, 0.01);
    c *= 2, u *= c <= 1 ? c : 2 - c, s *= d <= 1 ? d : 2 - d;
    let f = (c + u) / 2, p = c === 0 ? 2 * s / (d + s) : 2 * u / (c + u);
    return [i, p * 100, f * 100];
  }, o.hsv.rgb = function(a) {
    let i = a[0] / 60, u = a[1] / 100, c = a[2] / 100, s = Math.floor(i) % 6, d = i - Math.floor(i), f = 255 * c * (1 - u), p = 255 * c * (1 - u * d), m = 255 * c * (1 - u * (1 - d));
    switch (c *= 255, s) {
      case 0:
        return [c, m, f];
      case 1:
        return [p, c, f];
      case 2:
        return [f, c, m];
      case 3:
        return [f, p, c];
      case 4:
        return [m, f, c];
      case 5:
        return [c, f, p];
    }
  }, o.hsv.hsl = function(a) {
    let i = a[0], u = a[1] / 100, c = a[2] / 100, s = Math.max(c, 0.01), d, f;
    f = (2 - u) * c;
    let p = (2 - u) * s;
    return d = u * s, d /= p <= 1 ? p : 2 - p, d = d || 0, f /= 2, [i, d * 100, f * 100];
  }, o.hwb.rgb = function(a) {
    let i = a[0] / 360, u = a[1] / 100, c = a[2] / 100, s = u + c, d;
    s > 1 && (u /= s, c /= s);
    let f = Math.floor(6 * i), p = 1 - c;
    d = 6 * i - f, (f & 1) !== 0 && (d = 1 - d);
    let m = u + d * (p - u), b, h, y;
    switch (f) {
      default:
      case 6:
      case 0:
        b = p, h = m, y = u;
        break;
      case 1:
        b = m, h = p, y = u;
        break;
      case 2:
        b = u, h = p, y = m;
        break;
      case 3:
        b = u, h = m, y = p;
        break;
      case 4:
        b = m, h = u, y = p;
        break;
      case 5:
        b = p, h = u, y = m;
        break;
    }
    return [b * 255, h * 255, y * 255];
  }, o.cmyk.rgb = function(a) {
    let i = a[0] / 100, u = a[1] / 100, c = a[2] / 100, s = a[3] / 100, d = 1 - Math.min(1, i * (1 - s) + s), f = 1 - Math.min(1, u * (1 - s) + s), p = 1 - Math.min(1, c * (1 - s) + s);
    return [d * 255, f * 255, p * 255];
  }, o.xyz.rgb = function(a) {
    let i = a[0] / 100, u = a[1] / 100, c = a[2] / 100, s, d, f;
    return s = i * 3.2406 + u * -1.5372 + c * -0.4986, d = i * -0.9689 + u * 1.8758 + c * 0.0415, f = i * 0.0557 + u * -0.204 + c * 1.057, s = s > 31308e-7 ? 1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92, d = d > 31308e-7 ? 1.055 * d ** (1 / 2.4) - 0.055 : d * 12.92, f = f > 31308e-7 ? 1.055 * f ** (1 / 2.4) - 0.055 : f * 12.92, s = Math.min(Math.max(0, s), 1), d = Math.min(Math.max(0, d), 1), f = Math.min(Math.max(0, f), 1), [s * 255, d * 255, f * 255];
  }, o.xyz.lab = function(a) {
    let i = a[0], u = a[1], c = a[2];
    i /= 95.047, u /= 100, c /= 108.883, i = i > 8856e-6 ? i ** (1 / 3) : 7.787 * i + 16 / 116, u = u > 8856e-6 ? u ** (1 / 3) : 7.787 * u + 16 / 116, c = c > 8856e-6 ? c ** (1 / 3) : 7.787 * c + 16 / 116;
    let s = 116 * u - 16, d = 500 * (i - u), f = 200 * (u - c);
    return [s, d, f];
  }, o.lab.xyz = function(a) {
    let i = a[0], u = a[1], c = a[2], s, d, f;
    d = (i + 16) / 116, s = u / 500 + d, f = d - c / 200;
    let p = d ** 3, m = s ** 3, b = f ** 3;
    return d = p > 8856e-6 ? p : (d - 16 / 116) / 7.787, s = m > 8856e-6 ? m : (s - 16 / 116) / 7.787, f = b > 8856e-6 ? b : (f - 16 / 116) / 7.787, s *= 95.047, d *= 100, f *= 108.883, [s, d, f];
  }, o.lab.lch = function(a) {
    let i = a[0], u = a[1], c = a[2], s;
    s = Math.atan2(c, u) * 360 / 2 / Math.PI, s < 0 && (s += 360);
    let d = Math.sqrt(u * u + c * c);
    return [i, d, s];
  }, o.lch.lab = function(a) {
    let i = a[0], u = a[1], c = a[2] / 360 * 2 * Math.PI, s = u * Math.cos(c), d = u * Math.sin(c);
    return [i, s, d];
  }, o.rgb.ansi16 = function(a, i = null) {
    let [u, c, s] = a, d = i === null ? o.rgb.hsv(a)[2] : i;
    if (d = Math.round(d / 50), d === 0) return 30;
    let f = 30 + (Math.round(s / 255) << 2 | Math.round(c / 255) << 1 | Math.round(u / 255));
    return d === 2 && (f += 60), f;
  }, o.hsv.ansi16 = function(a) {
    return o.rgb.ansi16(o.hsv.rgb(a), a[2]);
  }, o.rgb.ansi256 = function(a) {
    let i = a[0], u = a[1], c = a[2];
    return i === u && u === c ? i < 8 ? 16 : i > 248 ? 231 : Math.round((i - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(i / 255 * 5) + 6 * Math.round(u / 255 * 5) + Math.round(c / 255 * 5);
  }, o.ansi16.rgb = function(a) {
    let i = a % 10;
    if (i === 0 || i === 7) return a > 50 && (i += 3.5), i = i / 10.5 * 255, [i, i, i];
    let u = (~~(a > 50) + 1) * 0.5, c = (i & 1) * u * 255, s = (i >> 1 & 1) * u * 255, d = (i >> 2 & 1) * u * 255;
    return [c, s, d];
  }, o.ansi256.rgb = function(a) {
    if (a >= 232) {
      let d = (a - 232) * 10 + 8;
      return [d, d, d];
    }
    a -= 16;
    let i, u = Math.floor(a / 36) / 5 * 255, c = Math.floor((i = a % 36) / 6) / 5 * 255, s = i % 6 / 5 * 255;
    return [u, c, s];
  }, o.rgb.hex = function(a) {
    let i = (((Math.round(a[0]) & 255) << 16) + ((Math.round(a[1]) & 255) << 8) + (Math.round(a[2]) & 255)).toString(16).toUpperCase();
    return "000000".substring(i.length) + i;
  }, o.hex.rgb = function(a) {
    let i = a.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!i) return [0, 0, 0];
    let u = i[0];
    i[0].length === 3 && (u = u.split("").map((p) => p + p).join(""));
    let c = parseInt(u, 16), s = c >> 16 & 255, d = c >> 8 & 255, f = c & 255;
    return [s, d, f];
  }, o.rgb.hcg = function(a) {
    let i = a[0] / 255, u = a[1] / 255, c = a[2] / 255, s = Math.max(Math.max(i, u), c), d = Math.min(Math.min(i, u), c), f = s - d, p, m;
    return f < 1 ? p = d / (1 - f) : p = 0, f <= 0 ? m = 0 : s === i ? m = (u - c) / f % 6 : s === u ? m = 2 + (c - i) / f : m = 4 + (i - u) / f, m /= 6, m %= 1, [m * 360, f * 100, p * 100];
  }, o.hsl.hcg = function(a) {
    let i = a[1] / 100, u = a[2] / 100, c = u < 0.5 ? 2 * i * u : 2 * i * (1 - u), s = 0;
    return c < 1 && (s = (u - 0.5 * c) / (1 - c)), [a[0], c * 100, s * 100];
  }, o.hsv.hcg = function(a) {
    let i = a[1] / 100, u = a[2] / 100, c = i * u, s = 0;
    return c < 1 && (s = (u - c) / (1 - c)), [a[0], c * 100, s * 100];
  }, o.hcg.rgb = function(a) {
    let i = a[0] / 360, u = a[1] / 100, c = a[2] / 100;
    if (u === 0) return [c * 255, c * 255, c * 255];
    let s = [0, 0, 0], d = i % 1 * 6, f = d % 1, p = 1 - f, m = 0;
    switch (Math.floor(d)) {
      case 0:
        s[0] = 1, s[1] = f, s[2] = 0;
        break;
      case 1:
        s[0] = p, s[1] = 1, s[2] = 0;
        break;
      case 2:
        s[0] = 0, s[1] = 1, s[2] = f;
        break;
      case 3:
        s[0] = 0, s[1] = p, s[2] = 1;
        break;
      case 4:
        s[0] = f, s[1] = 0, s[2] = 1;
        break;
      default:
        s[0] = 1, s[1] = 0, s[2] = p;
    }
    return m = (1 - u) * c, [(u * s[0] + m) * 255, (u * s[1] + m) * 255, (u * s[2] + m) * 255];
  }, o.hcg.hsv = function(a) {
    let i = a[1] / 100, u = a[2] / 100, c = i + u * (1 - i), s = 0;
    return c > 0 && (s = i / c), [a[0], s * 100, c * 100];
  }, o.hcg.hsl = function(a) {
    let i = a[1] / 100, u = a[2] / 100 * (1 - i) + 0.5 * i, c = 0;
    return u > 0 && u < 0.5 ? c = i / (2 * u) : u >= 0.5 && u < 1 && (c = i / (2 * (1 - u))), [a[0], c * 100, u * 100];
  }, o.hcg.hwb = function(a) {
    let i = a[1] / 100, u = a[2] / 100, c = i + u * (1 - i);
    return [a[0], (c - i) * 100, (1 - c) * 100];
  }, o.hwb.hcg = function(a) {
    let i = a[1] / 100, u = 1 - a[2] / 100, c = u - i, s = 0;
    return c < 1 && (s = (u - c) / (1 - c)), [a[0], c * 100, s * 100];
  }, o.apple.rgb = function(a) {
    return [a[0] / 65535 * 255, a[1] / 65535 * 255, a[2] / 65535 * 255];
  }, o.rgb.apple = function(a) {
    return [a[0] / 255 * 65535, a[1] / 255 * 65535, a[2] / 255 * 65535];
  }, o.gray.rgb = function(a) {
    return [a[0] / 100 * 255, a[0] / 100 * 255, a[0] / 100 * 255];
  }, o.gray.hsl = function(a) {
    return [0, 0, a[0]];
  }, o.gray.hsv = o.gray.hsl, o.gray.hwb = function(a) {
    return [0, 100, a[0]];
  }, o.gray.cmyk = function(a) {
    return [0, 0, 0, a[0]];
  }, o.gray.lab = function(a) {
    return [a[0], 0, 0];
  }, o.gray.hex = function(a) {
    let i = Math.round(a[0] / 100 * 255) & 255, u = ((i << 16) + (i << 8) + i).toString(16).toUpperCase();
    return "000000".substring(u.length) + u;
  }, o.rgb.gray = function(a) {
    return [(a[0] + a[1] + a[2]) / 3 / 255 * 100];
  };
} }), vE = R({ "../../node_modules/color-convert/route.js"(e, t) {
  var r = Cp();
  function n() {
    let i = {}, u = Object.keys(r);
    for (let c = u.length, s = 0; s < c; s++) i[u[s]] = { distance: -1, parent: null };
    return i;
  }
  function o(i) {
    let u = n(), c = [i];
    for (u[i].distance = 0; c.length; ) {
      let s = c.pop(), d = Object.keys(r[s]);
      for (let f = d.length, p = 0; p < f; p++) {
        let m = d[p], b = u[m];
        b.distance === -1 && (b.distance = u[s].distance + 1, b.parent = s, c.unshift(m));
      }
    }
    return u;
  }
  function l(i, u) {
    return function(c) {
      return u(i(c));
    };
  }
  function a(i, u) {
    let c = [u[i].parent, i], s = r[u[i].parent][i], d = u[i].parent;
    for (; u[d].parent; ) c.unshift(u[d].parent), s = l(r[u[d].parent][d], s), d = u[d].parent;
    return s.conversion = c, s;
  }
  t.exports = function(i) {
    let u = o(i), c = {}, s = Object.keys(u);
    for (let d = s.length, f = 0; f < d; f++) {
      let p = s[f];
      u[p].parent !== null && (c[p] = a(p, u));
    }
    return c;
  };
} }), _E = R({ "../../node_modules/color-convert/index.js"(e, t) {
  var r = Cp(), n = vE(), o = {}, l = Object.keys(r);
  function a(u) {
    let c = function(...s) {
      let d = s[0];
      return d == null ? d : (d.length > 1 && (s = d), u(s));
    };
    return "conversion" in u && (c.conversion = u.conversion), c;
  }
  function i(u) {
    let c = function(...s) {
      let d = s[0];
      if (d == null) return d;
      d.length > 1 && (s = d);
      let f = u(s);
      if (typeof f == "object") for (let p = f.length, m = 0; m < p; m++) f[m] = Math.round(f[m]);
      return f;
    };
    return "conversion" in u && (c.conversion = u.conversion), c;
  }
  l.forEach((u) => {
    o[u] = {}, Object.defineProperty(o[u], "channels", { value: r[u].channels }), Object.defineProperty(o[u], "labels", { value: r[u].labels });
    let c = n(u);
    Object.keys(c).forEach((s) => {
      let d = c[s];
      o[u][s] = i(d), o[u][s].raw = a(d);
    });
  }), t.exports = o;
} }), RE = R({ "../../node_modules/ansi-styles/index.js"(e, t) {
  var r = (d, f) => (...p) => `\x1B[${d(...p) + f}m`, n = (d, f) => (...p) => {
    let m = d(...p);
    return `\x1B[${38 + f};5;${m}m`;
  }, o = (d, f) => (...p) => {
    let m = d(...p);
    return `\x1B[${38 + f};2;${m[0]};${m[1]};${m[2]}m`;
  }, l = (d) => d, a = (d, f, p) => [d, f, p], i = (d, f, p) => {
    Object.defineProperty(d, f, { get: () => {
      let m = p();
      return Object.defineProperty(d, f, { value: m, enumerable: !0, configurable: !0 }), m;
    }, enumerable: !0, configurable: !0 });
  }, u, c = (d, f, p, m) => {
    u === void 0 && (u = _E());
    let b = m ? 10 : 0, h = {};
    for (let [y, g] of Object.entries(u)) {
      let q = y === "ansi16" ? "ansi" : y;
      y === f ? h[q] = d(p, b) : typeof g == "object" && (h[q] = d(g[f], b));
    }
    return h;
  };
  function s() {
    let d = /* @__PURE__ */ new Map(), f = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
    f.color.gray = f.color.blackBright, f.bgColor.bgGray = f.bgColor.bgBlackBright, f.color.grey = f.color.blackBright, f.bgColor.bgGrey = f.bgColor.bgBlackBright;
    for (let [p, m] of Object.entries(f)) {
      for (let [b, h] of Object.entries(m)) f[b] = { open: `\x1B[${h[0]}m`, close: `\x1B[${h[1]}m` }, m[b] = f[b], d.set(h[0], h[1]);
      Object.defineProperty(f, p, { value: m, enumerable: !1 });
    }
    return Object.defineProperty(f, "codes", { value: d, enumerable: !1 }), f.color.close = "\x1B[39m", f.bgColor.close = "\x1B[49m", i(f.color, "ansi", () => c(r, "ansi16", l, !1)), i(f.color, "ansi256", () => c(n, "ansi256", l, !1)), i(f.color, "ansi16m", () => c(o, "rgb", a, !1)), i(f.bgColor, "ansi", () => c(r, "ansi16", l, !0)), i(f.bgColor, "ansi256", () => c(n, "ansi256", l, !0)), i(f.bgColor, "ansi16m", () => c(o, "rgb", a, !0)), f;
  }
  Object.defineProperty(t, "exports", { enumerable: !0, get: s });
} }), wE = R({ "../../node_modules/supports-color/browser.js"(e, t) {
  t.exports = { stdout: !1, stderr: !1 };
} }), EE = R({ "../../node_modules/@testing-library/jest-dom/node_modules/chalk/source/util.js"(e, t) {
  var r = (o, l, a) => {
    let i = o.indexOf(l);
    if (i === -1) return o;
    let u = l.length, c = 0, s = "";
    do
      s += o.substr(c, i - c) + l + a, c = i + u, i = o.indexOf(l, c);
    while (i !== -1);
    return s += o.substr(c), s;
  }, n = (o, l, a, i) => {
    let u = 0, c = "";
    do {
      let s = o[i - 1] === "\r";
      c += o.substr(u, (s ? i - 1 : i) - u) + l + (s ? `\r
` : `
`) + a, u = i + 1, i = o.indexOf(`
`, u);
    } while (i !== -1);
    return c += o.substr(u), c;
  };
  t.exports = { stringReplaceAll: r, stringEncaseCRLFWithFirstIndex: n };
} }), CE = R({ "../../node_modules/@testing-library/jest-dom/node_modules/chalk/source/templates.js"(e, t) {
  var r = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi, n = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g, o = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/, l = /\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.)|([^\\])/gi, a = /* @__PURE__ */ new Map([["n", `
`], ["r", "\r"], ["t", "	"], ["b", "\b"], ["f", "\f"], ["v", "\v"], ["0", "\0"], ["\\", "\\"], ["e", "\x1B"], ["a", "\x07"]]);
  function i(d) {
    let f = d[0] === "u", p = d[1] === "{";
    return f && !p && d.length === 5 || d[0] === "x" && d.length === 3 ? String.fromCharCode(parseInt(d.slice(1), 16)) : f && p ? String.fromCodePoint(parseInt(d.slice(2, -1), 16)) : a.get(d) || d;
  }
  function u(d, f) {
    let p = [], m = f.trim().split(/\s*,\s*/g), b;
    for (let h of m) {
      let y = Number(h);
      if (!Number.isNaN(y)) p.push(y);
      else if (b = h.match(o)) p.push(b[2].replace(l, (g, q, C) => q ? i(q) : C));
      else throw new Error(`Invalid Chalk template style argument: ${h} (in style '${d}')`);
    }
    return p;
  }
  function c(d) {
    n.lastIndex = 0;
    let f = [], p;
    for (; (p = n.exec(d)) !== null; ) {
      let m = p[1];
      if (p[2]) {
        let b = u(m, p[2]);
        f.push([m].concat(b));
      } else f.push([m]);
    }
    return f;
  }
  function s(d, f) {
    let p = {};
    for (let b of f) for (let h of b.styles) p[h[0]] = b.inverse ? null : h.slice(1);
    let m = d;
    for (let [b, h] of Object.entries(p)) if (Array.isArray(h)) {
      if (!(b in m)) throw new Error(`Unknown Chalk style: ${b}`);
      m = h.length > 0 ? m[b](...h) : m[b];
    }
    return m;
  }
  t.exports = (d, f) => {
    let p = [], m = [], b = [];
    if (f.replace(r, (h, y, g, q, C, E) => {
      if (y) b.push(i(y));
      else if (q) {
        let _ = b.join("");
        b = [], m.push(p.length === 0 ? _ : s(d, p)(_)), p.push({ inverse: g, styles: c(q) });
      } else if (C) {
        if (p.length === 0) throw new Error("Found extraneous } in Chalk template literal");
        m.push(s(d, p)(b.join(""))), b = [], p.pop();
      } else b.push(E);
    }), m.push(b.join("")), p.length > 0) {
      let h = `Chalk template literal is missing ${p.length} closing bracket${p.length === 1 ? "" : "s"} (\`}\`)`;
      throw new Error(h);
    }
    return m.join("");
  };
} }), qp = R({ "../../node_modules/@testing-library/jest-dom/node_modules/chalk/source/index.js"(e, t) {
  var r = RE(), { stdout: n, stderr: o } = wE(), { stringReplaceAll: l, stringEncaseCRLFWithFirstIndex: a } = EE(), i = ["ansi", "ansi", "ansi256", "ansi16m"], u = /* @__PURE__ */ Object.create(null), c = (E, _ = {}) => {
    if (_.level > 3 || _.level < 0) throw new Error("The `level` option should be an integer from 0 to 3");
    let v = n ? n.level : 0;
    E.level = _.level === void 0 ? v : _.level;
  }, s = class {
    constructor(E) {
      return d(E);
    }
  }, d = (E) => {
    let _ = {};
    return c(_, E), _.template = (...v) => q(_.template, ...v), Object.setPrototypeOf(_, f.prototype), Object.setPrototypeOf(_.template, _), _.template.constructor = () => {
      throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
    }, _.template.Instance = s, _.template;
  };
  function f(E) {
    return d(E);
  }
  for (let [E, _] of Object.entries(r)) u[E] = { get() {
    let v = h(this, b(_.open, _.close, this._styler), this._isEmpty);
    return Object.defineProperty(this, E, { value: v }), v;
  } };
  u.visible = { get() {
    let E = h(this, this._styler, !0);
    return Object.defineProperty(this, "visible", { value: E }), E;
  } };
  var p = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
  for (let E of p) u[E] = { get() {
    let { level: _ } = this;
    return function(...v) {
      let w = b(r.color[i[_]][E](...v), r.color.close, this._styler);
      return h(this, w, this._isEmpty);
    };
  } };
  for (let E of p) {
    let _ = "bg" + E[0].toUpperCase() + E.slice(1);
    u[_] = { get() {
      let { level: v } = this;
      return function(...w) {
        let P = b(r.bgColor[i[v]][E](...w), r.bgColor.close, this._styler);
        return h(this, P, this._isEmpty);
      };
    } };
  }
  var m = Object.defineProperties(() => {
  }, { ...u, level: { enumerable: !0, get() {
    return this._generator.level;
  }, set(E) {
    this._generator.level = E;
  } } }), b = (E, _, v) => {
    let w, P;
    return v === void 0 ? (w = E, P = _) : (w = v.openAll + E, P = _ + v.closeAll), { open: E, close: _, openAll: w, closeAll: P, parent: v };
  }, h = (E, _, v) => {
    let w = (...P) => y(w, P.length === 1 ? "" + P[0] : P.join(" "));
    return w.__proto__ = m, w._generator = E, w._styler = _, w._isEmpty = v, w;
  }, y = (E, _) => {
    if (E.level <= 0 || !_) return E._isEmpty ? "" : _;
    let v = E._styler;
    if (v === void 0) return _;
    let { openAll: w, closeAll: P } = v;
    if (_.indexOf("\x1B") !== -1) for (; v !== void 0; ) _ = l(_, v.close, v.open), v = v.parent;
    let j = _.indexOf(`
`);
    return j !== -1 && (_ = a(_, P, w, j)), w + _ + P;
  }, g, q = (E, ..._) => {
    let [v] = _;
    if (!Array.isArray(v)) return _.join(" ");
    let w = _.slice(1), P = [v.raw[0]];
    for (let j = 1; j < v.length; j++) P.push(String(w[j - 1]).replace(/[{}\\]/g, "\\$&"), String(v.raw[j]));
    return g === void 0 && (g = CE()), g(E, P.join(""));
  };
  Object.defineProperties(f.prototype, u);
  var C = f();
  C.supportsColor = n, C.stderr = f({ level: o ? o.level : 0 }), C.stderr.supportsColor = o, C.Level = { None: 0, Basic: 1, Ansi256: 2, TrueColor: 3, 0: "None", 1: "Basic", 2: "Ansi256", 3: "TrueColor" }, t.exports = C;
} }), qE = R({ "../../node_modules/lodash/_listCacheClear.js"(e, t) {
  function r() {
    this.__data__ = [], this.size = 0;
  }
  t.exports = r;
} }), Pp = R({ "../../node_modules/lodash/eq.js"(e, t) {
  function r(n, o) {
    return n === o || n !== n && o !== o;
  }
  t.exports = r;
} }), ho = R({ "../../node_modules/lodash/_assocIndexOf.js"(e, t) {
  var r = Pp();
  function n(o, l) {
    for (var a = o.length; a--; ) if (r(o[a][0], l)) return a;
    return -1;
  }
  t.exports = n;
} }), PE = R({ "../../node_modules/lodash/_listCacheDelete.js"(e, t) {
  var r = ho(), n = Array.prototype, o = n.splice;
  function l(a) {
    var i = this.__data__, u = r(i, a);
    if (u < 0) return !1;
    var c = i.length - 1;
    return u == c ? i.pop() : o.call(i, u, 1), --this.size, !0;
  }
  t.exports = l;
} }), OE = R({ "../../node_modules/lodash/_listCacheGet.js"(e, t) {
  var r = ho();
  function n(o) {
    var l = this.__data__, a = r(l, o);
    return a < 0 ? void 0 : l[a][1];
  }
  t.exports = n;
} }), TE = R({ "../../node_modules/lodash/_listCacheHas.js"(e, t) {
  var r = ho();
  function n(o) {
    return r(this.__data__, o) > -1;
  }
  t.exports = n;
} }), SE = R({ "../../node_modules/lodash/_listCacheSet.js"(e, t) {
  var r = ho();
  function n(o, l) {
    var a = this.__data__, i = r(a, o);
    return i < 0 ? (++this.size, a.push([o, l])) : a[i][1] = l, this;
  }
  t.exports = n;
} }), bo = R({ "../../node_modules/lodash/_ListCache.js"(e, t) {
  var r = qE(), n = PE(), o = OE(), l = TE(), a = SE();
  function i(u) {
    var c = -1, s = u == null ? 0 : u.length;
    for (this.clear(); ++c < s; ) {
      var d = u[c];
      this.set(d[0], d[1]);
    }
  }
  i.prototype.clear = r, i.prototype.delete = n, i.prototype.get = o, i.prototype.has = l, i.prototype.set = a, t.exports = i;
} }), ME = R({ "../../node_modules/lodash/_stackClear.js"(e, t) {
  var r = bo();
  function n() {
    this.__data__ = new r(), this.size = 0;
  }
  t.exports = n;
} }), AE = R({ "../../node_modules/lodash/_stackDelete.js"(e, t) {
  function r(n) {
    var o = this.__data__, l = o.delete(n);
    return this.size = o.size, l;
  }
  t.exports = r;
} }), xE = R({ "../../node_modules/lodash/_stackGet.js"(e, t) {
  function r(n) {
    return this.__data__.get(n);
  }
  t.exports = r;
} }), jE = R({ "../../node_modules/lodash/_stackHas.js"(e, t) {
  function r(n) {
    return this.__data__.has(n);
  }
  t.exports = r;
} }), Op = R({ "../../node_modules/lodash/_freeGlobal.js"(e, t) {
  var r = typeof global == "object" && global && global.Object === Object && global;
  t.exports = r;
} }), Rt = R({ "../../node_modules/lodash/_root.js"(e, t) {
  var r = Op(), n = typeof self == "object" && self && self.Object === Object && self, o = r || n || Function("return this")();
  t.exports = o;
} }), vi = R({ "../../node_modules/lodash/_Symbol.js"(e, t) {
  var r = Rt(), n = r.Symbol;
  t.exports = n;
} }), NE = R({ "../../node_modules/lodash/_getRawTag.js"(e, t) {
  var r = vi(), n = Object.prototype, o = n.hasOwnProperty, l = n.toString, a = r ? r.toStringTag : void 0;
  function i(u) {
    var c = o.call(u, a), s = u[a];
    try {
      u[a] = void 0;
      var d = !0;
    } catch {
    }
    var f = l.call(u);
    return d && (c ? u[a] = s : delete u[a]), f;
  }
  t.exports = i;
} }), $E = R({ "../../node_modules/lodash/_objectToString.js"(e, t) {
  var r = Object.prototype, n = r.toString;
  function o(l) {
    return n.call(l);
  }
  t.exports = o;
} }), yo = R({ "../../node_modules/lodash/_baseGetTag.js"(e, t) {
  var r = vi(), n = NE(), o = $E(), l = "[object Null]", a = "[object Undefined]", i = r ? r.toStringTag : void 0;
  function u(c) {
    return c == null ? c === void 0 ? a : l : i && i in Object(c) ? n(c) : o(c);
  }
  t.exports = u;
} }), Tp = R({ "../../node_modules/lodash/isObject.js"(e, t) {
  function r(n) {
    var o = typeof n;
    return n != null && (o == "object" || o == "function");
  }
  t.exports = r;
} }), Sp = R({ "../../node_modules/lodash/isFunction.js"(e, t) {
  var r = yo(), n = Tp(), o = "[object AsyncFunction]", l = "[object Function]", a = "[object GeneratorFunction]", i = "[object Proxy]";
  function u(c) {
    if (!n(c)) return !1;
    var s = r(c);
    return s == l || s == a || s == o || s == i;
  }
  t.exports = u;
} }), IE = R({ "../../node_modules/lodash/_coreJsData.js"(e, t) {
  var r = Rt(), n = r["__core-js_shared__"];
  t.exports = n;
} }), LE = R({ "../../node_modules/lodash/_isMasked.js"(e, t) {
  var r = IE(), n = function() {
    var l = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
    return l ? "Symbol(src)_1." + l : "";
  }();
  function o(l) {
    return !!n && n in l;
  }
  t.exports = o;
} }), Mp = R({ "../../node_modules/lodash/_toSource.js"(e, t) {
  var r = Function.prototype, n = r.toString;
  function o(l) {
    if (l != null) {
      try {
        return n.call(l);
      } catch {
      }
      try {
        return l + "";
      } catch {
      }
    }
    return "";
  }
  t.exports = o;
} }), kE = R({ "../../node_modules/lodash/_baseIsNative.js"(e, t) {
  var r = Sp(), n = LE(), o = Tp(), l = Mp(), a = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, u = Function.prototype, c = Object.prototype, s = u.toString, d = c.hasOwnProperty, f = RegExp("^" + s.call(d).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function p(m) {
    if (!o(m) || n(m)) return !1;
    var b = r(m) ? f : i;
    return b.test(l(m));
  }
  t.exports = p;
} }), BE = R({ "../../node_modules/lodash/_getValue.js"(e, t) {
  function r(n, o) {
    return n?.[o];
  }
  t.exports = r;
} }), jr = R({ "../../node_modules/lodash/_getNative.js"(e, t) {
  var r = kE(), n = BE();
  function o(l, a) {
    var i = n(l, a);
    return r(i) ? i : void 0;
  }
  t.exports = o;
} }), _i = R({ "../../node_modules/lodash/_Map.js"(e, t) {
  var r = jr(), n = Rt(), o = r(n, "Map");
  t.exports = o;
} }), go = R({ "../../node_modules/lodash/_nativeCreate.js"(e, t) {
  var r = jr(), n = r(Object, "create");
  t.exports = n;
} }), DE = R({ "../../node_modules/lodash/_hashClear.js"(e, t) {
  var r = go();
  function n() {
    this.__data__ = r ? r(null) : {}, this.size = 0;
  }
  t.exports = n;
} }), FE = R({ "../../node_modules/lodash/_hashDelete.js"(e, t) {
  function r(n) {
    var o = this.has(n) && delete this.__data__[n];
    return this.size -= o ? 1 : 0, o;
  }
  t.exports = r;
} }), UE = R({ "../../node_modules/lodash/_hashGet.js"(e, t) {
  var r = go(), n = "__lodash_hash_undefined__", o = Object.prototype, l = o.hasOwnProperty;
  function a(i) {
    var u = this.__data__;
    if (r) {
      var c = u[i];
      return c === n ? void 0 : c;
    }
    return l.call(u, i) ? u[i] : void 0;
  }
  t.exports = a;
} }), HE = R({ "../../node_modules/lodash/_hashHas.js"(e, t) {
  var r = go(), n = Object.prototype, o = n.hasOwnProperty;
  function l(a) {
    var i = this.__data__;
    return r ? i[a] !== void 0 : o.call(i, a);
  }
  t.exports = l;
} }), VE = R({ "../../node_modules/lodash/_hashSet.js"(e, t) {
  var r = go(), n = "__lodash_hash_undefined__";
  function o(l, a) {
    var i = this.__data__;
    return this.size += this.has(l) ? 0 : 1, i[l] = r && a === void 0 ? n : a, this;
  }
  t.exports = o;
} }), zE = R({ "../../node_modules/lodash/_Hash.js"(e, t) {
  var r = DE(), n = FE(), o = UE(), l = HE(), a = VE();
  function i(u) {
    var c = -1, s = u == null ? 0 : u.length;
    for (this.clear(); ++c < s; ) {
      var d = u[c];
      this.set(d[0], d[1]);
    }
  }
  i.prototype.clear = r, i.prototype.delete = n, i.prototype.get = o, i.prototype.has = l, i.prototype.set = a, t.exports = i;
} }), GE = R({ "../../node_modules/lodash/_mapCacheClear.js"(e, t) {
  var r = zE(), n = bo(), o = _i();
  function l() {
    this.size = 0, this.__data__ = { hash: new r(), map: new (o || n)(), string: new r() };
  }
  t.exports = l;
} }), WE = R({ "../../node_modules/lodash/_isKeyable.js"(e, t) {
  function r(n) {
    var o = typeof n;
    return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? n !== "__proto__" : n === null;
  }
  t.exports = r;
} }), vo = R({ "../../node_modules/lodash/_getMapData.js"(e, t) {
  var r = WE();
  function n(o, l) {
    var a = o.__data__;
    return r(l) ? a[typeof l == "string" ? "string" : "hash"] : a.map;
  }
  t.exports = n;
} }), KE = R({ "../../node_modules/lodash/_mapCacheDelete.js"(e, t) {
  var r = vo();
  function n(o) {
    var l = r(this, o).delete(o);
    return this.size -= l ? 1 : 0, l;
  }
  t.exports = n;
} }), YE = R({ "../../node_modules/lodash/_mapCacheGet.js"(e, t) {
  var r = vo();
  function n(o) {
    return r(this, o).get(o);
  }
  t.exports = n;
} }), JE = R({ "../../node_modules/lodash/_mapCacheHas.js"(e, t) {
  var r = vo();
  function n(o) {
    return r(this, o).has(o);
  }
  t.exports = n;
} }), XE = R({ "../../node_modules/lodash/_mapCacheSet.js"(e, t) {
  var r = vo();
  function n(o, l) {
    var a = r(this, o), i = a.size;
    return a.set(o, l), this.size += a.size == i ? 0 : 1, this;
  }
  t.exports = n;
} }), Ap = R({ "../../node_modules/lodash/_MapCache.js"(e, t) {
  var r = GE(), n = KE(), o = YE(), l = JE(), a = XE();
  function i(u) {
    var c = -1, s = u == null ? 0 : u.length;
    for (this.clear(); ++c < s; ) {
      var d = u[c];
      this.set(d[0], d[1]);
    }
  }
  i.prototype.clear = r, i.prototype.delete = n, i.prototype.get = o, i.prototype.has = l, i.prototype.set = a, t.exports = i;
} }), QE = R({ "../../node_modules/lodash/_stackSet.js"(e, t) {
  var r = bo(), n = _i(), o = Ap(), l = 200;
  function a(i, u) {
    var c = this.__data__;
    if (c instanceof r) {
      var s = c.__data__;
      if (!n || s.length < l - 1) return s.push([i, u]), this.size = ++c.size, this;
      c = this.__data__ = new o(s);
    }
    return c.set(i, u), this.size = c.size, this;
  }
  t.exports = a;
} }), ZE = R({ "../../node_modules/lodash/_Stack.js"(e, t) {
  var r = bo(), n = ME(), o = AE(), l = xE(), a = jE(), i = QE();
  function u(c) {
    var s = this.__data__ = new r(c);
    this.size = s.size;
  }
  u.prototype.clear = n, u.prototype.delete = o, u.prototype.get = l, u.prototype.has = a, u.prototype.set = i, t.exports = u;
} }), e0 = R({ "../../node_modules/lodash/_setCacheAdd.js"(e, t) {
  var r = "__lodash_hash_undefined__";
  function n(o) {
    return this.__data__.set(o, r), this;
  }
  t.exports = n;
} }), t0 = R({ "../../node_modules/lodash/_setCacheHas.js"(e, t) {
  function r(n) {
    return this.__data__.has(n);
  }
  t.exports = r;
} }), r0 = R({ "../../node_modules/lodash/_SetCache.js"(e, t) {
  var r = Ap(), n = e0(), o = t0();
  function l(a) {
    var i = -1, u = a == null ? 0 : a.length;
    for (this.__data__ = new r(); ++i < u; ) this.add(a[i]);
  }
  l.prototype.add = l.prototype.push = n, l.prototype.has = o, t.exports = l;
} }), n0 = R({ "../../node_modules/lodash/_arraySome.js"(e, t) {
  function r(n, o) {
    for (var l = -1, a = n == null ? 0 : n.length; ++l < a; ) if (o(n[l], l, n)) return !0;
    return !1;
  }
  t.exports = r;
} }), o0 = R({ "../../node_modules/lodash/_cacheHas.js"(e, t) {
  function r(n, o) {
    return n.has(o);
  }
  t.exports = r;
} }), xp = R({ "../../node_modules/lodash/_equalArrays.js"(e, t) {
  var r = r0(), n = n0(), o = o0(), l = 1, a = 2;
  function i(u, c, s, d, f, p) {
    var m = s & l, b = u.length, h = c.length;
    if (b != h && !(m && h > b)) return !1;
    var y = p.get(u), g = p.get(c);
    if (y && g) return y == c && g == u;
    var q = -1, C = !0, E = s & a ? new r() : void 0;
    for (p.set(u, c), p.set(c, u); ++q < b; ) {
      var _ = u[q], v = c[q];
      if (d) var w = m ? d(v, _, q, c, u, p) : d(_, v, q, u, c, p);
      if (w !== void 0) {
        if (w) continue;
        C = !1;
        break;
      }
      if (E) {
        if (!n(c, function(P, j) {
          if (!o(E, j) && (_ === P || f(_, P, s, d, p))) return E.push(j);
        })) {
          C = !1;
          break;
        }
      } else if (!(_ === v || f(_, v, s, d, p))) {
        C = !1;
        break;
      }
    }
    return p.delete(u), p.delete(c), C;
  }
  t.exports = i;
} }), a0 = R({ "../../node_modules/lodash/_Uint8Array.js"(e, t) {
  var r = Rt(), n = r.Uint8Array;
  t.exports = n;
} }), l0 = R({ "../../node_modules/lodash/_mapToArray.js"(e, t) {
  function r(n) {
    var o = -1, l = Array(n.size);
    return n.forEach(function(a, i) {
      l[++o] = [i, a];
    }), l;
  }
  t.exports = r;
} }), i0 = R({ "../../node_modules/lodash/_setToArray.js"(e, t) {
  function r(n) {
    var o = -1, l = Array(n.size);
    return n.forEach(function(a) {
      l[++o] = a;
    }), l;
  }
  t.exports = r;
} }), s0 = R({ "../../node_modules/lodash/_equalByTag.js"(e, t) {
  var r = vi(), n = a0(), o = Pp(), l = xp(), a = l0(), i = i0(), u = 1, c = 2, s = "[object Boolean]", d = "[object Date]", f = "[object Error]", p = "[object Map]", m = "[object Number]", b = "[object RegExp]", h = "[object Set]", y = "[object String]", g = "[object Symbol]", q = "[object ArrayBuffer]", C = "[object DataView]", E = r ? r.prototype : void 0, _ = E ? E.valueOf : void 0;
  function v(w, P, j, $, k, L, S) {
    switch (j) {
      case C:
        if (w.byteLength != P.byteLength || w.byteOffset != P.byteOffset) return !1;
        w = w.buffer, P = P.buffer;
      case q:
        return !(w.byteLength != P.byteLength || !L(new n(w), new n(P)));
      case s:
      case d:
      case m:
        return o(+w, +P);
      case f:
        return w.name == P.name && w.message == P.message;
      case b:
      case y:
        return w == P + "";
      case p:
        var B = a;
      case h:
        var z = $ & u;
        if (B || (B = i), w.size != P.size && !z) return !1;
        var Y = S.get(w);
        if (Y) return Y == P;
        $ |= c, S.set(w, P);
        var K = l(B(w), B(P), $, k, L, S);
        return S.delete(w), K;
      case g:
        if (_) return _.call(w) == _.call(P);
    }
    return !1;
  }
  t.exports = v;
} }), u0 = R({ "../../node_modules/lodash/_arrayPush.js"(e, t) {
  function r(n, o) {
    for (var l = -1, a = o.length, i = n.length; ++l < a; ) n[i + l] = o[l];
    return n;
  }
  t.exports = r;
} }), Ri = R({ "../../node_modules/lodash/isArray.js"(e, t) {
  var r = Array.isArray;
  t.exports = r;
} }), c0 = R({ "../../node_modules/lodash/_baseGetAllKeys.js"(e, t) {
  var r = u0(), n = Ri();
  function o(l, a, i) {
    var u = a(l);
    return n(l) ? u : r(u, i(l));
  }
  t.exports = o;
} }), d0 = R({ "../../node_modules/lodash/_arrayFilter.js"(e, t) {
  function r(n, o) {
    for (var l = -1, a = n == null ? 0 : n.length, i = 0, u = []; ++l < a; ) {
      var c = n[l];
      o(c, l, n) && (u[i++] = c);
    }
    return u;
  }
  t.exports = r;
} }), p0 = R({ "../../node_modules/lodash/stubArray.js"(e, t) {
  function r() {
    return [];
  }
  t.exports = r;
} }), f0 = R({ "../../node_modules/lodash/_getSymbols.js"(e, t) {
  var r = d0(), n = p0(), o = Object.prototype, l = o.propertyIsEnumerable, a = Object.getOwnPropertySymbols, i = a ? function(u) {
    return u == null ? [] : (u = Object(u), r(a(u), function(c) {
      return l.call(u, c);
    }));
  } : n;
  t.exports = i;
} }), m0 = R({ "../../node_modules/lodash/_baseTimes.js"(e, t) {
  function r(n, o) {
    for (var l = -1, a = Array(n); ++l < n; ) a[l] = o(l);
    return a;
  }
  t.exports = r;
} }), _o = R({ "../../node_modules/lodash/isObjectLike.js"(e, t) {
  function r(n) {
    return n != null && typeof n == "object";
  }
  t.exports = r;
} }), h0 = R({ "../../node_modules/lodash/_baseIsArguments.js"(e, t) {
  var r = yo(), n = _o(), o = "[object Arguments]";
  function l(a) {
    return n(a) && r(a) == o;
  }
  t.exports = l;
} }), b0 = R({ "../../node_modules/lodash/isArguments.js"(e, t) {
  var r = h0(), n = _o(), o = Object.prototype, l = o.hasOwnProperty, a = o.propertyIsEnumerable, i = r(/* @__PURE__ */ function() {
    return arguments;
  }()) ? r : function(u) {
    return n(u) && l.call(u, "callee") && !a.call(u, "callee");
  };
  t.exports = i;
} }), y0 = R({ "../../node_modules/lodash/stubFalse.js"(e, t) {
  function r() {
    return !1;
  }
  t.exports = r;
} }), jp = R({ "../../node_modules/lodash/isBuffer.js"(e, t) {
  var r = Rt(), n = y0(), o = typeof e == "object" && e && !e.nodeType && e, l = o && typeof t == "object" && t && !t.nodeType && t, a = l && l.exports === o, i = a ? r.Buffer : void 0, u = i ? i.isBuffer : void 0, c = u || n;
  t.exports = c;
} }), g0 = R({ "../../node_modules/lodash/_isIndex.js"(e, t) {
  var r = 9007199254740991, n = /^(?:0|[1-9]\d*)$/;
  function o(l, a) {
    var i = typeof l;
    return a = a ?? r, !!a && (i == "number" || i != "symbol" && n.test(l)) && l > -1 && l % 1 == 0 && l < a;
  }
  t.exports = o;
} }), Np = R({ "../../node_modules/lodash/isLength.js"(e, t) {
  var r = 9007199254740991;
  function n(o) {
    return typeof o == "number" && o > -1 && o % 1 == 0 && o <= r;
  }
  t.exports = n;
} }), v0 = R({ "../../node_modules/lodash/_baseIsTypedArray.js"(e, t) {
  var r = yo(), n = Np(), o = _o(), l = "[object Arguments]", a = "[object Array]", i = "[object Boolean]", u = "[object Date]", c = "[object Error]", s = "[object Function]", d = "[object Map]", f = "[object Number]", p = "[object Object]", m = "[object RegExp]", b = "[object Set]", h = "[object String]", y = "[object WeakMap]", g = "[object ArrayBuffer]", q = "[object DataView]", C = "[object Float32Array]", E = "[object Float64Array]", _ = "[object Int8Array]", v = "[object Int16Array]", w = "[object Int32Array]", P = "[object Uint8Array]", j = "[object Uint8ClampedArray]", $ = "[object Uint16Array]", k = "[object Uint32Array]", L = {};
  L[C] = L[E] = L[_] = L[v] = L[w] = L[P] = L[j] = L[$] = L[k] = !0, L[l] = L[a] = L[g] = L[i] = L[q] = L[u] = L[c] = L[s] = L[d] = L[f] = L[p] = L[m] = L[b] = L[h] = L[y] = !1;
  function S(B) {
    return o(B) && n(B.length) && !!L[r(B)];
  }
  t.exports = S;
} }), _0 = R({ "../../node_modules/lodash/_baseUnary.js"(e, t) {
  function r(n) {
    return function(o) {
      return n(o);
    };
  }
  t.exports = r;
} }), R0 = R({ "../../node_modules/lodash/_nodeUtil.js"(e, t) {
  var r = Op(), n = typeof e == "object" && e && !e.nodeType && e, o = n && typeof t == "object" && t && !t.nodeType && t, l = o && o.exports === n, a = l && r.process, i = function() {
    try {
      var u = o && o.require && o.require("util").types;
      return u || a && a.binding && a.binding("util");
    } catch {
    }
  }();
  t.exports = i;
} }), $p = R({ "../../node_modules/lodash/isTypedArray.js"(e, t) {
  var r = v0(), n = _0(), o = R0(), l = o && o.isTypedArray, a = l ? n(l) : r;
  t.exports = a;
} }), w0 = R({ "../../node_modules/lodash/_arrayLikeKeys.js"(e, t) {
  var r = m0(), n = b0(), o = Ri(), l = jp(), a = g0(), i = $p(), u = Object.prototype, c = u.hasOwnProperty;
  function s(d, f) {
    var p = o(d), m = !p && n(d), b = !p && !m && l(d), h = !p && !m && !b && i(d), y = p || m || b || h, g = y ? r(d.length, String) : [], q = g.length;
    for (var C in d) (f || c.call(d, C)) && !(y && (C == "length" || b && (C == "offset" || C == "parent") || h && (C == "buffer" || C == "byteLength" || C == "byteOffset") || a(C, q))) && g.push(C);
    return g;
  }
  t.exports = s;
} }), E0 = R({ "../../node_modules/lodash/_isPrototype.js"(e, t) {
  var r = Object.prototype;
  function n(o) {
    var l = o && o.constructor, a = typeof l == "function" && l.prototype || r;
    return o === a;
  }
  t.exports = n;
} }), C0 = R({ "../../node_modules/lodash/_overArg.js"(e, t) {
  function r(n, o) {
    return function(l) {
      return n(o(l));
    };
  }
  t.exports = r;
} }), q0 = R({ "../../node_modules/lodash/_nativeKeys.js"(e, t) {
  var r = C0(), n = r(Object.keys, Object);
  t.exports = n;
} }), P0 = R({ "../../node_modules/lodash/_baseKeys.js"(e, t) {
  var r = E0(), n = q0(), o = Object.prototype, l = o.hasOwnProperty;
  function a(i) {
    if (!r(i)) return n(i);
    var u = [];
    for (var c in Object(i)) l.call(i, c) && c != "constructor" && u.push(c);
    return u;
  }
  t.exports = a;
} }), O0 = R({ "../../node_modules/lodash/isArrayLike.js"(e, t) {
  var r = Sp(), n = Np();
  function o(l) {
    return l != null && n(l.length) && !r(l);
  }
  t.exports = o;
} }), T0 = R({ "../../node_modules/lodash/keys.js"(e, t) {
  var r = w0(), n = P0(), o = O0();
  function l(a) {
    return o(a) ? r(a) : n(a);
  }
  t.exports = l;
} }), S0 = R({ "../../node_modules/lodash/_getAllKeys.js"(e, t) {
  var r = c0(), n = f0(), o = T0();
  function l(a) {
    return r(a, o, n);
  }
  t.exports = l;
} }), M0 = R({ "../../node_modules/lodash/_equalObjects.js"(e, t) {
  var r = S0(), n = 1, o = Object.prototype, l = o.hasOwnProperty;
  function a(i, u, c, s, d, f) {
    var p = c & n, m = r(i), b = m.length, h = r(u), y = h.length;
    if (b != y && !p) return !1;
    for (var g = b; g--; ) {
      var q = m[g];
      if (!(p ? q in u : l.call(u, q))) return !1;
    }
    var C = f.get(i), E = f.get(u);
    if (C && E) return C == u && E == i;
    var _ = !0;
    f.set(i, u), f.set(u, i);
    for (var v = p; ++g < b; ) {
      q = m[g];
      var w = i[q], P = u[q];
      if (s) var j = p ? s(P, w, q, u, i, f) : s(w, P, q, i, u, f);
      if (!(j === void 0 ? w === P || d(w, P, c, s, f) : j)) {
        _ = !1;
        break;
      }
      v || (v = q == "constructor");
    }
    if (_ && !v) {
      var $ = i.constructor, k = u.constructor;
      $ != k && "constructor" in i && "constructor" in u && !(typeof $ == "function" && $ instanceof $ && typeof k == "function" && k instanceof k) && (_ = !1);
    }
    return f.delete(i), f.delete(u), _;
  }
  t.exports = a;
} }), A0 = R({ "../../node_modules/lodash/_DataView.js"(e, t) {
  var r = jr(), n = Rt(), o = r(n, "DataView");
  t.exports = o;
} }), x0 = R({ "../../node_modules/lodash/_Promise.js"(e, t) {
  var r = jr(), n = Rt(), o = r(n, "Promise");
  t.exports = o;
} }), j0 = R({ "../../node_modules/lodash/_Set.js"(e, t) {
  var r = jr(), n = Rt(), o = r(n, "Set");
  t.exports = o;
} }), N0 = R({ "../../node_modules/lodash/_WeakMap.js"(e, t) {
  var r = jr(), n = Rt(), o = r(n, "WeakMap");
  t.exports = o;
} }), $0 = R({ "../../node_modules/lodash/_getTag.js"(e, t) {
  var r = A0(), n = _i(), o = x0(), l = j0(), a = N0(), i = yo(), u = Mp(), c = "[object Map]", s = "[object Object]", d = "[object Promise]", f = "[object Set]", p = "[object WeakMap]", m = "[object DataView]", b = u(r), h = u(n), y = u(o), g = u(l), q = u(a), C = i;
  (r && C(new r(new ArrayBuffer(1))) != m || n && C(new n()) != c || o && C(o.resolve()) != d || l && C(new l()) != f || a && C(new a()) != p) && (C = function(E) {
    var _ = i(E), v = _ == s ? E.constructor : void 0, w = v ? u(v) : "";
    if (w) switch (w) {
      case b:
        return m;
      case h:
        return c;
      case y:
        return d;
      case g:
        return f;
      case q:
        return p;
    }
    return _;
  }), t.exports = C;
} }), I0 = R({ "../../node_modules/lodash/_baseIsEqualDeep.js"(e, t) {
  var r = ZE(), n = xp(), o = s0(), l = M0(), a = $0(), i = Ri(), u = jp(), c = $p(), s = 1, d = "[object Arguments]", f = "[object Array]", p = "[object Object]", m = Object.prototype, b = m.hasOwnProperty;
  function h(y, g, q, C, E, _) {
    var v = i(y), w = i(g), P = v ? f : a(y), j = w ? f : a(g);
    P = P == d ? p : P, j = j == d ? p : j;
    var $ = P == p, k = j == p, L = P == j;
    if (L && u(y)) {
      if (!u(g)) return !1;
      v = !0, $ = !1;
    }
    if (L && !$) return _ || (_ = new r()), v || c(y) ? n(y, g, q, C, E, _) : o(y, g, P, q, C, E, _);
    if (!(q & s)) {
      var S = $ && b.call(y, "__wrapped__"), B = k && b.call(g, "__wrapped__");
      if (S || B) {
        var z = S ? y.value() : y, Y = B ? g.value() : g;
        return _ || (_ = new r()), E(z, Y, q, C, _);
      }
    }
    return L ? (_ || (_ = new r()), l(y, g, q, C, E, _)) : !1;
  }
  t.exports = h;
} }), L0 = R({ "../../node_modules/lodash/_baseIsEqual.js"(e, t) {
  var r = I0(), n = _o();
  function o(l, a, i, u, c) {
    return l === a ? !0 : l == null || a == null || !n(l) && !n(a) ? l !== l && a !== a : r(l, a, i, u, o, c);
  }
  t.exports = o;
} }), Ip = R({ "../../node_modules/lodash/isEqualWith.js"(e, t) {
  var r = L0();
  function n(o, l, a) {
    a = typeof a == "function" ? a : void 0;
    var i = a ? a(o, l) : void 0;
    return i === void 0 ? r(o, l, void 0, a) : !!i;
  }
  t.exports = n;
} }), Lp = R({ "../../node_modules/css.escape/css.escape.js"(e, t) {
  (function(r, n) {
    typeof e == "object" ? t.exports = n(r) : typeof define == "function" && define.amd ? define([], n.bind(r, r)) : n(r);
  })(typeof global < "u" ? global : e, function(r) {
    if (r.CSS && r.CSS.escape) return r.CSS.escape;
    var n = function(o) {
      if (arguments.length == 0) throw new TypeError("`CSS.escape` requires an argument.");
      for (var l = String(o), a = l.length, i = -1, u, c = "", s = l.charCodeAt(0); ++i < a; ) {
        if (u = l.charCodeAt(i), u == 0) {
          c += "�";
          continue;
        }
        if (u >= 1 && u <= 31 || u == 127 || i == 0 && u >= 48 && u <= 57 || i == 1 && u >= 48 && u <= 57 && s == 45) {
          c += "\\" + u.toString(16) + " ";
          continue;
        }
        if (i == 0 && a == 1 && u == 45) {
          c += "\\" + l.charAt(i);
          continue;
        }
        if (u >= 128 || u == 45 || u == 95 || u >= 48 && u <= 57 || u >= 65 && u <= 90 || u >= 97 && u <= 122) {
          c += l.charAt(i);
          continue;
        }
        c += "\\" + l.charAt(i);
      }
      return c;
    };
    return r.CSS || (r.CSS = {}), r.CSS.escape = n, n;
  });
} }), kp = R({ "../../node_modules/@testing-library/dom/node_modules/ansi-styles/index.js"(e, t) {
  var r = (l = 0) => (a) => `\x1B[${38 + l};5;${a}m`, n = (l = 0) => (a, i, u) => `\x1B[${38 + l};2;${a};${i};${u}m`;
  function o() {
    let l = /* @__PURE__ */ new Map(), a = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
    a.color.gray = a.color.blackBright, a.bgColor.bgGray = a.bgColor.bgBlackBright, a.color.grey = a.color.blackBright, a.bgColor.bgGrey = a.bgColor.bgBlackBright;
    for (let [i, u] of Object.entries(a)) {
      for (let [c, s] of Object.entries(u)) a[c] = { open: `\x1B[${s[0]}m`, close: `\x1B[${s[1]}m` }, u[c] = a[c], l.set(s[0], s[1]);
      Object.defineProperty(a, i, { value: u, enumerable: !1 });
    }
    return Object.defineProperty(a, "codes", { value: l, enumerable: !1 }), a.color.close = "\x1B[39m", a.bgColor.close = "\x1B[49m", a.color.ansi256 = r(), a.color.ansi16m = n(), a.bgColor.ansi256 = r(10), a.bgColor.ansi16m = n(10), Object.defineProperties(a, { rgbToAnsi256: { value: (i, u, c) => i === u && u === c ? i < 8 ? 16 : i > 248 ? 231 : Math.round((i - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(i / 255 * 5) + 6 * Math.round(u / 255 * 5) + Math.round(c / 255 * 5), enumerable: !1 }, hexToRgb: { value: (i) => {
      let u = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(i.toString(16));
      if (!u) return [0, 0, 0];
      let { colorString: c } = u.groups;
      c.length === 3 && (c = c.split("").map((d) => d + d).join(""));
      let s = Number.parseInt(c, 16);
      return [s >> 16 & 255, s >> 8 & 255, s & 255];
    }, enumerable: !1 }, hexToAnsi256: { value: (i) => a.rgbToAnsi256(...a.hexToRgb(i)), enumerable: !1 } }), a;
  }
  Object.defineProperty(t, "exports", { enumerable: !0, get: o });
} }), Ro = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/collections.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.printIteratorEntries = r, e.printIteratorValues = n, e.printListItems = o, e.printObjectProperties = l;
  var t = (a, i) => {
    let u = Object.keys(a).sort(i);
    return Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(a).forEach((c) => {
      Object.getOwnPropertyDescriptor(a, c).enumerable && u.push(c);
    }), u;
  };
  function r(a, i, u, c, s, d, f = ": ") {
    let p = "", m = a.next();
    if (!m.done) {
      p += i.spacingOuter;
      let b = u + i.indent;
      for (; !m.done; ) {
        let h = d(m.value[0], i, b, c, s), y = d(m.value[1], i, b, c, s);
        p += b + h + f + y, m = a.next(), m.done ? i.min || (p += ",") : p += "," + i.spacingInner;
      }
      p += i.spacingOuter + u;
    }
    return p;
  }
  function n(a, i, u, c, s, d) {
    let f = "", p = a.next();
    if (!p.done) {
      f += i.spacingOuter;
      let m = u + i.indent;
      for (; !p.done; ) f += m + d(p.value, i, m, c, s), p = a.next(), p.done ? i.min || (f += ",") : f += "," + i.spacingInner;
      f += i.spacingOuter + u;
    }
    return f;
  }
  function o(a, i, u, c, s, d) {
    let f = "";
    if (a.length) {
      f += i.spacingOuter;
      let p = u + i.indent;
      for (let m = 0; m < a.length; m++) f += p, m in a && (f += d(a[m], i, p, c, s)), m < a.length - 1 ? f += "," + i.spacingInner : i.min || (f += ",");
      f += i.spacingOuter + u;
    }
    return f;
  }
  function l(a, i, u, c, s, d) {
    let f = "", p = t(a, i.compareKeys);
    if (p.length) {
      f += i.spacingOuter;
      let m = u + i.indent;
      for (let b = 0; b < p.length; b++) {
        let h = p[b], y = d(h, i, m, c, s), g = d(a[h], i, m, c, s);
        f += m + y + ": " + g, b < p.length - 1 ? f += "," + i.spacingInner : i.min || (f += ",");
      }
      f += i.spacingOuter + u;
    }
    return f;
  }
} }), k0 = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = Ro(), r = function() {
    return typeof globalThis < "u" ? globalThis : typeof r < "u" ? r : typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")();
  }(), n = r["jest-symbol-do-not-touch"] || r.Symbol, o = typeof n == "function" && n.for ? n.for("jest.asymmetricMatcher") : 1267621, l = " ", a = (s, d, f, p, m, b) => {
    let h = s.toString();
    return h === "ArrayContaining" || h === "ArrayNotContaining" ? ++p > d.maxDepth ? "[" + h + "]" : h + l + "[" + (0, t.printListItems)(s.sample, d, f, p, m, b) + "]" : h === "ObjectContaining" || h === "ObjectNotContaining" ? ++p > d.maxDepth ? "[" + h + "]" : h + l + "{" + (0, t.printObjectProperties)(s.sample, d, f, p, m, b) + "}" : h === "StringMatching" || h === "StringNotMatching" || h === "StringContaining" || h === "StringNotContaining" ? h + l + b(s.sample, d, f, p, m) : s.toAsymmetricMatcher();
  };
  e.serialize = a;
  var i = (s) => s && s.$$typeof === o;
  e.test = i;
  var u = { serialize: a, test: i }, c = u;
  e.default = c;
} }), B0 = R({ "../../node_modules/@testing-library/dom/node_modules/ansi-regex/index.js"(e, t) {
  t.exports = ({ onlyFirst: r = !1 } = {}) => {
    let n = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
    return new RegExp(n, r ? void 0 : "g");
  };
} }), D0 = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/plugins/ConvertAnsi.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = n(B0()), r = n(kp());
  function n(c) {
    return c && c.__esModule ? c : { default: c };
  }
  var o = (c) => c.replace((0, t.default)(), (s) => {
    switch (s) {
      case r.default.red.close:
      case r.default.green.close:
      case r.default.cyan.close:
      case r.default.gray.close:
      case r.default.white.close:
      case r.default.yellow.close:
      case r.default.bgRed.close:
      case r.default.bgGreen.close:
      case r.default.bgYellow.close:
      case r.default.inverse.close:
      case r.default.dim.close:
      case r.default.bold.close:
      case r.default.reset.open:
      case r.default.reset.close:
        return "</>";
      case r.default.red.open:
        return "<red>";
      case r.default.green.open:
        return "<green>";
      case r.default.cyan.open:
        return "<cyan>";
      case r.default.gray.open:
        return "<gray>";
      case r.default.white.open:
        return "<white>";
      case r.default.yellow.open:
        return "<yellow>";
      case r.default.bgRed.open:
        return "<bgRed>";
      case r.default.bgGreen.open:
        return "<bgGreen>";
      case r.default.bgYellow.open:
        return "<bgYellow>";
      case r.default.inverse.open:
        return "<inverse>";
      case r.default.dim.open:
        return "<dim>";
      case r.default.bold.open:
        return "<bold>";
      default:
        return "";
    }
  }), l = (c) => typeof c == "string" && !!c.match((0, t.default)());
  e.test = l;
  var a = (c, s, d, f, p, m) => m(o(c), s, d, f, p);
  e.serialize = a;
  var i = { serialize: a, test: l }, u = i;
  e.default = u;
} }), F0 = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/plugins/DOMCollection.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = Ro(), r = " ", n = ["DOMStringMap", "NamedNodeMap"], o = /^(HTML\w*Collection|NodeList)$/, l = (d) => n.indexOf(d) !== -1 || o.test(d), a = (d) => d && d.constructor && !!d.constructor.name && l(d.constructor.name);
  e.test = a;
  var i = (d) => d.constructor.name === "NamedNodeMap", u = (d, f, p, m, b, h) => {
    let y = d.constructor.name;
    return ++m > f.maxDepth ? "[" + y + "]" : (f.min ? "" : y + r) + (n.indexOf(y) !== -1 ? "{" + (0, t.printObjectProperties)(i(d) ? Array.from(d).reduce((g, q) => (g[q.name] = q.value, g), {}) : { ...d }, f, p, m, b, h) + "}" : "[" + (0, t.printListItems)(Array.from(d), f, p, m, b, h) + "]");
  };
  e.serialize = u;
  var c = { serialize: u, test: a }, s = c;
  e.default = s;
} }), U0 = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t;
  function t(r) {
    return r.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
} }), wi = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/plugins/lib/markup.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.printText = e.printProps = e.printElementAsLeaf = e.printElement = e.printComment = e.printChildren = void 0;
  var t = r(U0());
  function r(c) {
    return c && c.__esModule ? c : { default: c };
  }
  var n = (c, s, d, f, p, m, b) => {
    let h = f + d.indent, y = d.colors;
    return c.map((g) => {
      let q = s[g], C = b(q, d, h, p, m);
      return typeof q != "string" && (C.indexOf(`
`) !== -1 && (C = d.spacingOuter + h + C + d.spacingOuter + f), C = "{" + C + "}"), d.spacingInner + f + y.prop.open + g + y.prop.close + "=" + y.value.open + C + y.value.close;
    }).join("");
  };
  e.printProps = n;
  var o = (c, s, d, f, p, m) => c.map((b) => s.spacingOuter + d + (typeof b == "string" ? l(b, s) : m(b, s, d, f, p))).join("");
  e.printChildren = o;
  var l = (c, s) => {
    let d = s.colors.content;
    return d.open + (0, t.default)(c) + d.close;
  };
  e.printText = l;
  var a = (c, s) => {
    let d = s.colors.comment;
    return d.open + "<!--" + (0, t.default)(c) + "-->" + d.close;
  };
  e.printComment = a;
  var i = (c, s, d, f, p) => {
    let m = f.colors.tag;
    return m.open + "<" + c + (s && m.close + s + f.spacingOuter + p + m.open) + (d ? ">" + m.close + d + f.spacingOuter + p + m.open + "</" + c : (s && !f.min ? "" : " ") + "/") + ">" + m.close;
  };
  e.printElement = i;
  var u = (c, s) => {
    let d = s.colors.tag;
    return d.open + "<" + c + d.close + " …" + d.open + " />" + d.close;
  };
  e.printElementAsLeaf = u;
} }), H0 = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/plugins/DOMElement.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = wi(), r = 1, n = 3, o = 8, l = 11, a = /^((HTML|SVG)\w*)?Element$/, i = (h) => {
    try {
      return typeof h.hasAttribute == "function" && h.hasAttribute("is");
    } catch {
      return !1;
    }
  }, u = (h) => {
    let y = h.constructor.name, { nodeType: g, tagName: q } = h, C = typeof q == "string" && q.includes("-") || i(h);
    return g === r && (a.test(y) || C) || g === n && y === "Text" || g === o && y === "Comment" || g === l && y === "DocumentFragment";
  }, c = (h) => {
    var y;
    return (h == null || (y = h.constructor) === null || y === void 0 ? void 0 : y.name) && u(h);
  };
  e.test = c;
  function s(h) {
    return h.nodeType === n;
  }
  function d(h) {
    return h.nodeType === o;
  }
  function f(h) {
    return h.nodeType === l;
  }
  var p = (h, y, g, q, C, E) => {
    if (s(h)) return (0, t.printText)(h.data, y);
    if (d(h)) return (0, t.printComment)(h.data, y);
    let _ = f(h) ? "DocumentFragment" : h.tagName.toLowerCase();
    return ++q > y.maxDepth ? (0, t.printElementAsLeaf)(_, y) : (0, t.printElement)(_, (0, t.printProps)(f(h) ? [] : Array.from(h.attributes).map((v) => v.name).sort(), f(h) ? {} : Array.from(h.attributes).reduce((v, w) => (v[w.name] = w.value, v), {}), y, g + y.indent, q, C, E), (0, t.printChildren)(Array.prototype.slice.call(h.childNodes || h.children), y, g + y.indent, q, C, E), y, g);
  };
  e.serialize = p;
  var m = { serialize: p, test: c }, b = m;
  e.default = b;
} }), V0 = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/plugins/Immutable.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = Ro(), r = "@@__IMMUTABLE_ITERABLE__@@", n = "@@__IMMUTABLE_LIST__@@", o = "@@__IMMUTABLE_KEYED__@@", l = "@@__IMMUTABLE_MAP__@@", a = "@@__IMMUTABLE_ORDERED__@@", i = "@@__IMMUTABLE_RECORD__@@", u = "@@__IMMUTABLE_SEQ__@@", c = "@@__IMMUTABLE_SET__@@", s = "@@__IMMUTABLE_STACK__@@", d = (w) => "Immutable." + w, f = (w) => "[" + w + "]", p = " ", m = "…", b = (w, P, j, $, k, L, S) => ++$ > P.maxDepth ? f(d(S)) : d(S) + p + "{" + (0, t.printIteratorEntries)(w.entries(), P, j, $, k, L) + "}";
  function h(w) {
    let P = 0;
    return { next() {
      if (P < w._keys.length) {
        let j = w._keys[P++];
        return { done: !1, value: [j, w.get(j)] };
      }
      return { done: !0, value: void 0 };
    } };
  }
  var y = (w, P, j, $, k, L) => {
    let S = d(w._name || "Record");
    return ++$ > P.maxDepth ? f(S) : S + p + "{" + (0, t.printIteratorEntries)(h(w), P, j, $, k, L) + "}";
  }, g = (w, P, j, $, k, L) => {
    let S = d("Seq");
    return ++$ > P.maxDepth ? f(S) : w[o] ? S + p + "{" + (w._iter || w._object ? (0, t.printIteratorEntries)(w.entries(), P, j, $, k, L) : m) + "}" : S + p + "[" + (w._iter || w._array || w._collection || w._iterable ? (0, t.printIteratorValues)(w.values(), P, j, $, k, L) : m) + "]";
  }, q = (w, P, j, $, k, L, S) => ++$ > P.maxDepth ? f(d(S)) : d(S) + p + "[" + (0, t.printIteratorValues)(w.values(), P, j, $, k, L) + "]", C = (w, P, j, $, k, L) => w[l] ? b(w, P, j, $, k, L, w[a] ? "OrderedMap" : "Map") : w[n] ? q(w, P, j, $, k, L, "List") : w[c] ? q(w, P, j, $, k, L, w[a] ? "OrderedSet" : "Set") : w[s] ? q(w, P, j, $, k, L, "Stack") : w[u] ? g(w, P, j, $, k, L) : y(w, P, j, $, k, L);
  e.serialize = C;
  var E = (w) => w && (w[r] === !0 || w[i] === !0);
  e.test = E;
  var _ = { serialize: C, test: E }, v = _;
  e.default = v;
} }), z0 = R({ "../../node_modules/@testing-library/dom/node_modules/react-is/cjs/react-is.production.min.js"(e) {
  var t = 60103, r = 60106, n = 60107, o = 60108, l = 60114, a = 60109, i = 60110, u = 60112, c = 60113, s = 60120, d = 60115, f = 60116, p = 60121, m = 60122, b = 60117, h = 60129, y = 60131;
  typeof Symbol == "function" && Symbol.for && (g = Symbol.for, t = g("react.element"), r = g("react.portal"), n = g("react.fragment"), o = g("react.strict_mode"), l = g("react.profiler"), a = g("react.provider"), i = g("react.context"), u = g("react.forward_ref"), c = g("react.suspense"), s = g("react.suspense_list"), d = g("react.memo"), f = g("react.lazy"), p = g("react.block"), m = g("react.server.block"), b = g("react.fundamental"), h = g("react.debug_trace_mode"), y = g("react.legacy_hidden"));
  var g;
  function q(S) {
    if (typeof S == "object" && S !== null) {
      var B = S.$$typeof;
      switch (B) {
        case t:
          switch (S = S.type, S) {
            case n:
            case l:
            case o:
            case c:
            case s:
              return S;
            default:
              switch (S = S && S.$$typeof, S) {
                case i:
                case u:
                case f:
                case d:
                case a:
                  return S;
                default:
                  return B;
              }
          }
        case r:
          return B;
      }
    }
  }
  var C = a, E = t, _ = u, v = n, w = f, P = d, j = r, $ = l, k = o, L = c;
  e.ContextConsumer = i, e.ContextProvider = C, e.Element = E, e.ForwardRef = _, e.Fragment = v, e.Lazy = w, e.Memo = P, e.Portal = j, e.Profiler = $, e.StrictMode = k, e.Suspense = L, e.isAsyncMode = function() {
    return !1;
  }, e.isConcurrentMode = function() {
    return !1;
  }, e.isContextConsumer = function(S) {
    return q(S) === i;
  }, e.isContextProvider = function(S) {
    return q(S) === a;
  }, e.isElement = function(S) {
    return typeof S == "object" && S !== null && S.$$typeof === t;
  }, e.isForwardRef = function(S) {
    return q(S) === u;
  }, e.isFragment = function(S) {
    return q(S) === n;
  }, e.isLazy = function(S) {
    return q(S) === f;
  }, e.isMemo = function(S) {
    return q(S) === d;
  }, e.isPortal = function(S) {
    return q(S) === r;
  }, e.isProfiler = function(S) {
    return q(S) === l;
  }, e.isStrictMode = function(S) {
    return q(S) === o;
  }, e.isSuspense = function(S) {
    return q(S) === c;
  }, e.isValidElementType = function(S) {
    return typeof S == "string" || typeof S == "function" || S === n || S === l || S === h || S === o || S === c || S === s || S === y || typeof S == "object" && S !== null && (S.$$typeof === f || S.$$typeof === d || S.$$typeof === a || S.$$typeof === i || S.$$typeof === u || S.$$typeof === b || S.$$typeof === p || S[0] === m);
  }, e.typeOf = q;
} }), G0 = R({ "../../node_modules/@testing-library/dom/node_modules/react-is/cjs/react-is.development.js"(e) {
  Wt.NODE_ENV !== "production" && function() {
    var t = 60103, r = 60106, n = 60107, o = 60108, l = 60114, a = 60109, i = 60110, u = 60112, c = 60113, s = 60120, d = 60115, f = 60116, p = 60121, m = 60122, b = 60117, h = 60129, y = 60131;
    if (typeof Symbol == "function" && Symbol.for) {
      var g = Symbol.for;
      t = g("react.element"), r = g("react.portal"), n = g("react.fragment"), o = g("react.strict_mode"), l = g("react.profiler"), a = g("react.provider"), i = g("react.context"), u = g("react.forward_ref"), c = g("react.suspense"), s = g("react.suspense_list"), d = g("react.memo"), f = g("react.lazy"), p = g("react.block"), m = g("react.server.block"), b = g("react.fundamental"), g("react.scope"), g("react.opaque.id"), h = g("react.debug_trace_mode"), g("react.offscreen"), y = g("react.legacy_hidden");
    }
    var q = !1;
    function C(H) {
      return !!(typeof H == "string" || typeof H == "function" || H === n || H === l || H === h || H === o || H === c || H === s || H === y || q || typeof H == "object" && H !== null && (H.$$typeof === f || H.$$typeof === d || H.$$typeof === a || H.$$typeof === i || H.$$typeof === u || H.$$typeof === b || H.$$typeof === p || H[0] === m));
    }
    function E(H) {
      if (typeof H == "object" && H !== null) {
        var Q = H.$$typeof;
        switch (Q) {
          case t:
            var I = H.type;
            switch (I) {
              case n:
              case l:
              case o:
              case c:
              case s:
                return I;
              default:
                var le = I && I.$$typeof;
                switch (le) {
                  case i:
                  case u:
                  case f:
                  case d:
                  case a:
                    return le;
                  default:
                    return Q;
                }
            }
          case r:
            return Q;
        }
      }
    }
    var _ = i, v = a, w = t, P = u, j = n, $ = f, k = d, L = r, S = l, B = o, z = c, Y = !1, K = !1;
    function Z(H) {
      return Y || (Y = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function he(H) {
      return K || (K = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function ue(H) {
      return E(H) === i;
    }
    function U(H) {
      return E(H) === a;
    }
    function D(H) {
      return typeof H == "object" && H !== null && H.$$typeof === t;
    }
    function F(H) {
      return E(H) === u;
    }
    function W(H) {
      return E(H) === n;
    }
    function V(H) {
      return E(H) === f;
    }
    function ee(H) {
      return E(H) === d;
    }
    function ne(H) {
      return E(H) === r;
    }
    function Ie(H) {
      return E(H) === l;
    }
    function A(H) {
      return E(H) === o;
    }
    function G(H) {
      return E(H) === c;
    }
    e.ContextConsumer = _, e.ContextProvider = v, e.Element = w, e.ForwardRef = P, e.Fragment = j, e.Lazy = $, e.Memo = k, e.Portal = L, e.Profiler = S, e.StrictMode = B, e.Suspense = z, e.isAsyncMode = Z, e.isConcurrentMode = he, e.isContextConsumer = ue, e.isContextProvider = U, e.isElement = D, e.isForwardRef = F, e.isFragment = W, e.isLazy = V, e.isMemo = ee, e.isPortal = ne, e.isProfiler = Ie, e.isStrictMode = A, e.isSuspense = G, e.isValidElementType = C, e.typeOf = E;
  }();
} }), W0 = R({ "../../node_modules/@testing-library/dom/node_modules/react-is/index.js"(e, t) {
  Wt.NODE_ENV === "production" ? t.exports = z0() : t.exports = G0();
} }), K0 = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/plugins/ReactElement.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = o(W0()), r = wi();
  function n(f) {
    if (typeof WeakMap != "function") return null;
    var p = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakMap();
    return (n = function(b) {
      return b ? m : p;
    })(f);
  }
  function o(f, p) {
    if (f && f.__esModule) return f;
    if (f === null || typeof f != "object" && typeof f != "function") return { default: f };
    var m = n(p);
    if (m && m.has(f)) return m.get(f);
    var b = {}, h = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var y in f) if (y !== "default" && Object.prototype.hasOwnProperty.call(f, y)) {
      var g = h ? Object.getOwnPropertyDescriptor(f, y) : null;
      g && (g.get || g.set) ? Object.defineProperty(b, y, g) : b[y] = f[y];
    }
    return b.default = f, m && m.set(f, b), b;
  }
  var l = (f, p = []) => (Array.isArray(f) ? f.forEach((m) => {
    l(m, p);
  }) : f != null && f !== !1 && p.push(f), p), a = (f) => {
    let p = f.type;
    if (typeof p == "string") return p;
    if (typeof p == "function") return p.displayName || p.name || "Unknown";
    if (t.isFragment(f)) return "React.Fragment";
    if (t.isSuspense(f)) return "React.Suspense";
    if (typeof p == "object" && p !== null) {
      if (t.isContextProvider(f)) return "Context.Provider";
      if (t.isContextConsumer(f)) return "Context.Consumer";
      if (t.isForwardRef(f)) {
        if (p.displayName) return p.displayName;
        let m = p.render.displayName || p.render.name || "";
        return m !== "" ? "ForwardRef(" + m + ")" : "ForwardRef";
      }
      if (t.isMemo(f)) {
        let m = p.displayName || p.type.displayName || p.type.name || "";
        return m !== "" ? "Memo(" + m + ")" : "Memo";
      }
    }
    return "UNDEFINED";
  }, i = (f) => {
    let { props: p } = f;
    return Object.keys(p).filter((m) => m !== "children" && p[m] !== void 0).sort();
  }, u = (f, p, m, b, h, y) => ++b > p.maxDepth ? (0, r.printElementAsLeaf)(a(f), p) : (0, r.printElement)(a(f), (0, r.printProps)(i(f), f.props, p, m + p.indent, b, h, y), (0, r.printChildren)(l(f.props.children), p, m + p.indent, b, h, y), p, m);
  e.serialize = u;
  var c = (f) => f != null && t.isElement(f);
  e.test = c;
  var s = { serialize: u, test: c }, d = s;
  e.default = d;
} }), Y0 = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/plugins/ReactTestComponent.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = wi(), r = function() {
    return typeof globalThis < "u" ? globalThis : typeof r < "u" ? r : typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")();
  }(), n = r["jest-symbol-do-not-touch"] || r.Symbol, o = typeof n == "function" && n.for ? n.for("react.test.json") : 245830487, l = (s) => {
    let { props: d } = s;
    return d ? Object.keys(d).filter((f) => d[f] !== void 0).sort() : [];
  }, a = (s, d, f, p, m, b) => ++p > d.maxDepth ? (0, t.printElementAsLeaf)(s.type, d) : (0, t.printElement)(s.type, s.props ? (0, t.printProps)(l(s), s.props, d, f + d.indent, p, m, b) : "", s.children ? (0, t.printChildren)(s.children, d, f + d.indent, p, m, b) : "", d, f);
  e.serialize = a;
  var i = (s) => s && s.$$typeof === o;
  e.test = i;
  var u = { serialize: a, test: i }, c = u;
  e.default = c;
} }), J0 = R({ "../../node_modules/@testing-library/dom/node_modules/pretty-format/build/index.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.DEFAULT_OPTIONS = void 0, e.format = ee, e.plugins = void 0;
  var t = s(kp()), r = Ro(), n = s(k0()), o = s(D0()), l = s(F0()), a = s(H0()), i = s(V0()), u = s(K0()), c = s(Y0());
  function s(A) {
    return A && A.__esModule ? A : { default: A };
  }
  var d = Object.prototype.toString, f = Date.prototype.toISOString, p = Error.prototype.toString, m = RegExp.prototype.toString, b = (A) => typeof A.constructor == "function" && A.constructor.name || "Object", h = (A) => typeof window < "u" && A === window, y = /^Symbol\((.*)\)(.*)$/, g = /\n/gi, q = class extends Error {
    constructor(A, G) {
      super(A), this.stack = G, this.name = this.constructor.name;
    }
  };
  function C(A) {
    return A === "[object Array]" || A === "[object ArrayBuffer]" || A === "[object DataView]" || A === "[object Float32Array]" || A === "[object Float64Array]" || A === "[object Int8Array]" || A === "[object Int16Array]" || A === "[object Int32Array]" || A === "[object Uint8Array]" || A === "[object Uint8ClampedArray]" || A === "[object Uint16Array]" || A === "[object Uint32Array]";
  }
  function E(A) {
    return Object.is(A, -0) ? "-0" : String(A);
  }
  function _(A) {
    return `${A}n`;
  }
  function v(A, G) {
    return G ? "[Function " + (A.name || "anonymous") + "]" : "[Function]";
  }
  function w(A) {
    return String(A).replace(y, "Symbol($1)");
  }
  function P(A) {
    return "[" + p.call(A) + "]";
  }
  function j(A, G, H, Q) {
    if (A === !0 || A === !1) return "" + A;
    if (A === void 0) return "undefined";
    if (A === null) return "null";
    let I = typeof A;
    if (I === "number") return E(A);
    if (I === "bigint") return _(A);
    if (I === "string") return Q ? '"' + A.replace(/"|\\/g, "\\$&") + '"' : '"' + A + '"';
    if (I === "function") return v(A, G);
    if (I === "symbol") return w(A);
    let le = d.call(A);
    return le === "[object WeakMap]" ? "WeakMap {}" : le === "[object WeakSet]" ? "WeakSet {}" : le === "[object Function]" || le === "[object GeneratorFunction]" ? v(A, G) : le === "[object Symbol]" ? w(A) : le === "[object Date]" ? isNaN(+A) ? "Date { NaN }" : f.call(A) : le === "[object Error]" ? P(A) : le === "[object RegExp]" ? H ? m.call(A).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&") : m.call(A) : A instanceof Error ? P(A) : null;
  }
  function $(A, G, H, Q, I, le) {
    if (I.indexOf(A) !== -1) return "[Circular]";
    I = I.slice(), I.push(A);
    let fe = ++Q > G.maxDepth, ge = G.min;
    if (G.callToJSON && !fe && A.toJSON && typeof A.toJSON == "function" && !le) return B(A.toJSON(), G, H, Q, I, !0);
    let Ye = d.call(A);
    return Ye === "[object Arguments]" ? fe ? "[Arguments]" : (ge ? "" : "Arguments ") + "[" + (0, r.printListItems)(A, G, H, Q, I, B) + "]" : C(Ye) ? fe ? "[" + A.constructor.name + "]" : (ge || !G.printBasicPrototype && A.constructor.name === "Array" ? "" : A.constructor.name + " ") + "[" + (0, r.printListItems)(A, G, H, Q, I, B) + "]" : Ye === "[object Map]" ? fe ? "[Map]" : "Map {" + (0, r.printIteratorEntries)(A.entries(), G, H, Q, I, B, " => ") + "}" : Ye === "[object Set]" ? fe ? "[Set]" : "Set {" + (0, r.printIteratorValues)(A.values(), G, H, Q, I, B) + "}" : fe || h(A) ? "[" + b(A) + "]" : (ge || !G.printBasicPrototype && b(A) === "Object" ? "" : b(A) + " ") + "{" + (0, r.printObjectProperties)(A, G, H, Q, I, B) + "}";
  }
  function k(A) {
    return A.serialize != null;
  }
  function L(A, G, H, Q, I, le) {
    let fe;
    try {
      fe = k(A) ? A.serialize(G, H, Q, I, le, B) : A.print(G, (ge) => B(ge, H, Q, I, le), (ge) => {
        let Ye = Q + H.indent;
        return Ye + ge.replace(g, `
` + Ye);
      }, { edgeSpacing: H.spacingOuter, min: H.min, spacing: H.spacingInner }, H.colors);
    } catch (ge) {
      throw new q(ge.message, ge.stack);
    }
    if (typeof fe != "string") throw new Error(`pretty-format: Plugin must return type "string" but instead returned "${typeof fe}".`);
    return fe;
  }
  function S(A, G) {
    for (let H = 0; H < A.length; H++) try {
      if (A[H].test(G)) return A[H];
    } catch (Q) {
      throw new q(Q.message, Q.stack);
    }
    return null;
  }
  function B(A, G, H, Q, I, le) {
    let fe = S(G.plugins, A);
    if (fe !== null) return L(fe, A, G, H, Q, I);
    let ge = j(A, G.printFunctionName, G.escapeRegex, G.escapeString);
    return ge !== null ? ge : $(A, G, H, Q, I, le);
  }
  var z = { comment: "gray", content: "reset", prop: "yellow", tag: "cyan", value: "green" }, Y = Object.keys(z), K = { callToJSON: !0, compareKeys: void 0, escapeRegex: !1, escapeString: !0, highlight: !1, indent: 2, maxDepth: 1 / 0, min: !1, plugins: [], printBasicPrototype: !0, printFunctionName: !0, theme: z };
  e.DEFAULT_OPTIONS = K;
  function Z(A) {
    if (Object.keys(A).forEach((G) => {
      if (!K.hasOwnProperty(G)) throw new Error(`pretty-format: Unknown option "${G}".`);
    }), A.min && A.indent !== void 0 && A.indent !== 0) throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
    if (A.theme !== void 0) {
      if (A.theme === null) throw new Error('pretty-format: Option "theme" must not be null.');
      if (typeof A.theme != "object") throw new Error(`pretty-format: Option "theme" must be of type "object" but instead received "${typeof A.theme}".`);
    }
  }
  var he = (A) => Y.reduce((G, H) => {
    let Q = A.theme && A.theme[H] !== void 0 ? A.theme[H] : z[H], I = Q && t.default[Q];
    if (I && typeof I.close == "string" && typeof I.open == "string") G[H] = I;
    else throw new Error(`pretty-format: Option "theme" has a key "${H}" whose value "${Q}" is undefined in ansi-styles.`);
    return G;
  }, /* @__PURE__ */ Object.create(null)), ue = () => Y.reduce((A, G) => (A[G] = { close: "", open: "" }, A), /* @__PURE__ */ Object.create(null)), U = (A) => A && A.printFunctionName !== void 0 ? A.printFunctionName : K.printFunctionName, D = (A) => A && A.escapeRegex !== void 0 ? A.escapeRegex : K.escapeRegex, F = (A) => A && A.escapeString !== void 0 ? A.escapeString : K.escapeString, W = (A) => {
    var G;
    return { callToJSON: A && A.callToJSON !== void 0 ? A.callToJSON : K.callToJSON, colors: A && A.highlight ? he(A) : ue(), compareKeys: A && typeof A.compareKeys == "function" ? A.compareKeys : K.compareKeys, escapeRegex: D(A), escapeString: F(A), indent: A && A.min ? "" : V(A && A.indent !== void 0 ? A.indent : K.indent), maxDepth: A && A.maxDepth !== void 0 ? A.maxDepth : K.maxDepth, min: A && A.min !== void 0 ? A.min : K.min, plugins: A && A.plugins !== void 0 ? A.plugins : K.plugins, printBasicPrototype: (G = A?.printBasicPrototype) !== null && G !== void 0 ? G : !0, printFunctionName: U(A), spacingInner: A && A.min ? " " : `
`, spacingOuter: A && A.min ? "" : `
` };
  };
  function V(A) {
    return new Array(A + 1).join(" ");
  }
  function ee(A, G) {
    if (G && (Z(G), G.plugins)) {
      let Q = S(G.plugins, A);
      if (Q !== null) return L(Q, A, W(G), "", 0, []);
    }
    let H = j(A, U(G), D(G), F(G));
    return H !== null ? H : $(A, W(G), "", 0, []);
  }
  var ne = { AsymmetricMatcher: n.default, ConvertAnsi: o.default, DOMCollection: l.default, DOMElement: a.default, Immutable: i.default, ReactElement: u.default, ReactTestComponent: c.default };
  e.plugins = ne;
  var Ie = ee;
  e.default = Ie;
} }), X0 = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/util/iteratorProxy.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  function t() {
    var n = this, o = 0, l = { "@@iterator": function() {
      return l;
    }, next: function() {
      if (o < n.length) {
        var a = n[o];
        return o = o + 1, { done: !1, value: a };
      } else return { done: !0 };
    } };
    return l;
  }
  var r = t;
  e.default = r;
} }), hn = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/util/iterationDecorator.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = o;
  var t = r(X0());
  function r(l) {
    return l && l.__esModule ? l : { default: l };
  }
  function n(l) {
    "@babel/helpers - typeof";
    return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
      return typeof a;
    } : function(a) {
      return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, n(l);
  }
  function o(l, a) {
    return typeof Symbol == "function" && n(Symbol.iterator) === "symbol" && Object.defineProperty(l, Symbol.iterator, { value: t.default.bind(a) }), l;
  }
} }), Q0 = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/ariaPropsMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = r(hn());
  function r(p) {
    return p && p.__esModule ? p : { default: p };
  }
  function n(p, m) {
    return a(p) || l(p, m) || u(p, m) || o();
  }
  function o() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function l(p, m) {
    var b = p == null ? null : typeof Symbol < "u" && p[Symbol.iterator] || p["@@iterator"];
    if (b != null) {
      var h = [], y = !0, g = !1, q, C;
      try {
        for (b = b.call(p); !(y = (q = b.next()).done) && (h.push(q.value), !(m && h.length === m)); y = !0) ;
      } catch (E) {
        g = !0, C = E;
      } finally {
        try {
          !y && b.return != null && b.return();
        } finally {
          if (g) throw C;
        }
      }
      return h;
    }
  }
  function a(p) {
    if (Array.isArray(p)) return p;
  }
  function i(p, m) {
    var b = typeof Symbol < "u" && p[Symbol.iterator] || p["@@iterator"];
    if (!b) {
      if (Array.isArray(p) || (b = u(p)) || m) {
        b && (p = b);
        var h = 0, y = function() {
        };
        return { s: y, n: function() {
          return h >= p.length ? { done: !0 } : { done: !1, value: p[h++] };
        }, e: function(E) {
          throw E;
        }, f: y };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var g = !0, q = !1, C;
    return { s: function() {
      b = b.call(p);
    }, n: function() {
      var E = b.next();
      return g = E.done, E;
    }, e: function(E) {
      q = !0, C = E;
    }, f: function() {
      try {
        !g && b.return != null && b.return();
      } finally {
        if (q) throw C;
      }
    } };
  }
  function u(p, m) {
    if (p) {
      if (typeof p == "string") return c(p, m);
      var b = Object.prototype.toString.call(p).slice(8, -1);
      if (b === "Object" && p.constructor && (b = p.constructor.name), b === "Map" || b === "Set") return Array.from(p);
      if (b === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b)) return c(p, m);
    }
  }
  function c(p, m) {
    (m == null || m > p.length) && (m = p.length);
    for (var b = 0, h = new Array(m); b < m; b++) h[b] = p[b];
    return h;
  }
  var s = [["aria-activedescendant", { type: "id" }], ["aria-atomic", { type: "boolean" }], ["aria-autocomplete", { type: "token", values: ["inline", "list", "both", "none"] }], ["aria-braillelabel", { type: "string" }], ["aria-brailleroledescription", { type: "string" }], ["aria-busy", { type: "boolean" }], ["aria-checked", { type: "tristate" }], ["aria-colcount", { type: "integer" }], ["aria-colindex", { type: "integer" }], ["aria-colspan", { type: "integer" }], ["aria-controls", { type: "idlist" }], ["aria-current", { type: "token", values: ["page", "step", "location", "date", "time", !0, !1] }], ["aria-describedby", { type: "idlist" }], ["aria-description", { type: "string" }], ["aria-details", { type: "id" }], ["aria-disabled", { type: "boolean" }], ["aria-dropeffect", { type: "tokenlist", values: ["copy", "execute", "link", "move", "none", "popup"] }], ["aria-errormessage", { type: "id" }], ["aria-expanded", { type: "boolean", allowundefined: !0 }], ["aria-flowto", { type: "idlist" }], ["aria-grabbed", { type: "boolean", allowundefined: !0 }], ["aria-haspopup", { type: "token", values: [!1, !0, "menu", "listbox", "tree", "grid", "dialog"] }], ["aria-hidden", { type: "boolean", allowundefined: !0 }], ["aria-invalid", { type: "token", values: ["grammar", !1, "spelling", !0] }], ["aria-keyshortcuts", { type: "string" }], ["aria-label", { type: "string" }], ["aria-labelledby", { type: "idlist" }], ["aria-level", { type: "integer" }], ["aria-live", { type: "token", values: ["assertive", "off", "polite"] }], ["aria-modal", { type: "boolean" }], ["aria-multiline", { type: "boolean" }], ["aria-multiselectable", { type: "boolean" }], ["aria-orientation", { type: "token", values: ["vertical", "undefined", "horizontal"] }], ["aria-owns", { type: "idlist" }], ["aria-placeholder", { type: "string" }], ["aria-posinset", { type: "integer" }], ["aria-pressed", { type: "tristate" }], ["aria-readonly", { type: "boolean" }], ["aria-relevant", { type: "tokenlist", values: ["additions", "all", "removals", "text"] }], ["aria-required", { type: "boolean" }], ["aria-roledescription", { type: "string" }], ["aria-rowcount", { type: "integer" }], ["aria-rowindex", { type: "integer" }], ["aria-rowspan", { type: "integer" }], ["aria-selected", { type: "boolean", allowundefined: !0 }], ["aria-setsize", { type: "integer" }], ["aria-sort", { type: "token", values: ["ascending", "descending", "none", "other"] }], ["aria-valuemax", { type: "number" }], ["aria-valuemin", { type: "number" }], ["aria-valuenow", { type: "number" }], ["aria-valuetext", { type: "string" }]], d = { entries: function() {
    return s;
  }, forEach: function(p) {
    var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, b = i(s), h;
    try {
      for (b.s(); !(h = b.n()).done; ) {
        var y = n(h.value, 2), g = y[0], q = y[1];
        p.call(m, q, g, s);
      }
    } catch (C) {
      b.e(C);
    } finally {
      b.f();
    }
  }, get: function(p) {
    var m = s.find(function(b) {
      return b[0] === p;
    });
    return m && m[1];
  }, has: function(p) {
    return !!d.get(p);
  }, keys: function() {
    return s.map(function(p) {
      var m = n(p, 1), b = m[0];
      return b;
    });
  }, values: function() {
    return s.map(function(p) {
      var m = n(p, 2), b = m[1];
      return b;
    });
  } }, f = (0, t.default)(d, d.entries());
  e.default = f;
} }), Z0 = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/domMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = r(hn());
  function r(p) {
    return p && p.__esModule ? p : { default: p };
  }
  function n(p, m) {
    return a(p) || l(p, m) || u(p, m) || o();
  }
  function o() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function l(p, m) {
    var b = p == null ? null : typeof Symbol < "u" && p[Symbol.iterator] || p["@@iterator"];
    if (b != null) {
      var h = [], y = !0, g = !1, q, C;
      try {
        for (b = b.call(p); !(y = (q = b.next()).done) && (h.push(q.value), !(m && h.length === m)); y = !0) ;
      } catch (E) {
        g = !0, C = E;
      } finally {
        try {
          !y && b.return != null && b.return();
        } finally {
          if (g) throw C;
        }
      }
      return h;
    }
  }
  function a(p) {
    if (Array.isArray(p)) return p;
  }
  function i(p, m) {
    var b = typeof Symbol < "u" && p[Symbol.iterator] || p["@@iterator"];
    if (!b) {
      if (Array.isArray(p) || (b = u(p)) || m) {
        b && (p = b);
        var h = 0, y = function() {
        };
        return { s: y, n: function() {
          return h >= p.length ? { done: !0 } : { done: !1, value: p[h++] };
        }, e: function(E) {
          throw E;
        }, f: y };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var g = !0, q = !1, C;
    return { s: function() {
      b = b.call(p);
    }, n: function() {
      var E = b.next();
      return g = E.done, E;
    }, e: function(E) {
      q = !0, C = E;
    }, f: function() {
      try {
        !g && b.return != null && b.return();
      } finally {
        if (q) throw C;
      }
    } };
  }
  function u(p, m) {
    if (p) {
      if (typeof p == "string") return c(p, m);
      var b = Object.prototype.toString.call(p).slice(8, -1);
      if (b === "Object" && p.constructor && (b = p.constructor.name), b === "Map" || b === "Set") return Array.from(p);
      if (b === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b)) return c(p, m);
    }
  }
  function c(p, m) {
    (m == null || m > p.length) && (m = p.length);
    for (var b = 0, h = new Array(m); b < m; b++) h[b] = p[b];
    return h;
  }
  var s = [["a", { reserved: !1 }], ["abbr", { reserved: !1 }], ["acronym", { reserved: !1 }], ["address", { reserved: !1 }], ["applet", { reserved: !1 }], ["area", { reserved: !1 }], ["article", { reserved: !1 }], ["aside", { reserved: !1 }], ["audio", { reserved: !1 }], ["b", { reserved: !1 }], ["base", { reserved: !0 }], ["bdi", { reserved: !1 }], ["bdo", { reserved: !1 }], ["big", { reserved: !1 }], ["blink", { reserved: !1 }], ["blockquote", { reserved: !1 }], ["body", { reserved: !1 }], ["br", { reserved: !1 }], ["button", { reserved: !1 }], ["canvas", { reserved: !1 }], ["caption", { reserved: !1 }], ["center", { reserved: !1 }], ["cite", { reserved: !1 }], ["code", { reserved: !1 }], ["col", { reserved: !0 }], ["colgroup", { reserved: !0 }], ["content", { reserved: !1 }], ["data", { reserved: !1 }], ["datalist", { reserved: !1 }], ["dd", { reserved: !1 }], ["del", { reserved: !1 }], ["details", { reserved: !1 }], ["dfn", { reserved: !1 }], ["dialog", { reserved: !1 }], ["dir", { reserved: !1 }], ["div", { reserved: !1 }], ["dl", { reserved: !1 }], ["dt", { reserved: !1 }], ["em", { reserved: !1 }], ["embed", { reserved: !1 }], ["fieldset", { reserved: !1 }], ["figcaption", { reserved: !1 }], ["figure", { reserved: !1 }], ["font", { reserved: !1 }], ["footer", { reserved: !1 }], ["form", { reserved: !1 }], ["frame", { reserved: !1 }], ["frameset", { reserved: !1 }], ["h1", { reserved: !1 }], ["h2", { reserved: !1 }], ["h3", { reserved: !1 }], ["h4", { reserved: !1 }], ["h5", { reserved: !1 }], ["h6", { reserved: !1 }], ["head", { reserved: !0 }], ["header", { reserved: !1 }], ["hgroup", { reserved: !1 }], ["hr", { reserved: !1 }], ["html", { reserved: !0 }], ["i", { reserved: !1 }], ["iframe", { reserved: !1 }], ["img", { reserved: !1 }], ["input", { reserved: !1 }], ["ins", { reserved: !1 }], ["kbd", { reserved: !1 }], ["keygen", { reserved: !1 }], ["label", { reserved: !1 }], ["legend", { reserved: !1 }], ["li", { reserved: !1 }], ["link", { reserved: !0 }], ["main", { reserved: !1 }], ["map", { reserved: !1 }], ["mark", { reserved: !1 }], ["marquee", { reserved: !1 }], ["menu", { reserved: !1 }], ["menuitem", { reserved: !1 }], ["meta", { reserved: !0 }], ["meter", { reserved: !1 }], ["nav", { reserved: !1 }], ["noembed", { reserved: !0 }], ["noscript", { reserved: !0 }], ["object", { reserved: !1 }], ["ol", { reserved: !1 }], ["optgroup", { reserved: !1 }], ["option", { reserved: !1 }], ["output", { reserved: !1 }], ["p", { reserved: !1 }], ["param", { reserved: !0 }], ["picture", { reserved: !0 }], ["pre", { reserved: !1 }], ["progress", { reserved: !1 }], ["q", { reserved: !1 }], ["rp", { reserved: !1 }], ["rt", { reserved: !1 }], ["rtc", { reserved: !1 }], ["ruby", { reserved: !1 }], ["s", { reserved: !1 }], ["samp", { reserved: !1 }], ["script", { reserved: !0 }], ["section", { reserved: !1 }], ["select", { reserved: !1 }], ["small", { reserved: !1 }], ["source", { reserved: !0 }], ["spacer", { reserved: !1 }], ["span", { reserved: !1 }], ["strike", { reserved: !1 }], ["strong", { reserved: !1 }], ["style", { reserved: !0 }], ["sub", { reserved: !1 }], ["summary", { reserved: !1 }], ["sup", { reserved: !1 }], ["table", { reserved: !1 }], ["tbody", { reserved: !1 }], ["td", { reserved: !1 }], ["textarea", { reserved: !1 }], ["tfoot", { reserved: !1 }], ["th", { reserved: !1 }], ["thead", { reserved: !1 }], ["time", { reserved: !1 }], ["title", { reserved: !0 }], ["tr", { reserved: !1 }], ["track", { reserved: !0 }], ["tt", { reserved: !1 }], ["u", { reserved: !1 }], ["ul", { reserved: !1 }], ["var", { reserved: !1 }], ["video", { reserved: !1 }], ["wbr", { reserved: !1 }], ["xmp", { reserved: !1 }]], d = { entries: function() {
    return s;
  }, forEach: function(p) {
    var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, b = i(s), h;
    try {
      for (b.s(); !(h = b.n()).done; ) {
        var y = n(h.value, 2), g = y[0], q = y[1];
        p.call(m, q, g, s);
      }
    } catch (C) {
      b.e(C);
    } finally {
      b.f();
    }
  }, get: function(p) {
    var m = s.find(function(b) {
      return b[0] === p;
    });
    return m && m[1];
  }, has: function(p) {
    return !!d.get(p);
  }, keys: function() {
    return s.map(function(p) {
      var m = n(p, 1), b = m[0];
      return b;
    });
  }, values: function() {
    return s.map(function(p) {
      var m = n(p, 2), b = m[1];
      return b;
    });
  } }, f = (0, t.default)(d, d.entries());
  e.default = f;
} }), eC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/commandRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget"]] }, r = t;
  e.default = r;
} }), tC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-disabled": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget"]] }, r = t;
  e.default = r;
} }), rC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/inputRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null }, relatedConcepts: [{ concept: { name: "input" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget"]] }, r = t;
  e.default = r;
} }), nC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), oC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-valuemax": null, "aria-valuemin": null, "aria-valuenow": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, r = t;
  e.default = r;
} }), aC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: { "aria-atomic": null, "aria-busy": null, "aria-controls": null, "aria-current": null, "aria-describedby": null, "aria-details": null, "aria-dropeffect": null, "aria-flowto": null, "aria-grabbed": null, "aria-hidden": null, "aria-keyshortcuts": null, "aria-label": null, "aria-labelledby": null, "aria-live": null, "aria-owns": null, "aria-relevant": null, "aria-roledescription": null }, relatedConcepts: [{ concept: { name: "role" }, module: "XHTML" }, { concept: { name: "type" }, module: "Dublin Core" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [] }, r = t;
  e.default = r;
} }), lC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "frontmatter" }, module: "DTB" }, { concept: { name: "level" }, module: "DTB" }, { concept: { name: "level" }, module: "SMIL" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, r = t;
  e.default = r;
} }), iC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, r = t;
  e.default = r;
} }), sC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/selectRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]] }, r = t;
  e.default = r;
} }), uC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/structureRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype"]] }, r = t;
  e.default = r;
} }), cC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype"]] }, r = t;
  e.default = r;
} }), dC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/abstract/windowRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !0, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-modal": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype"]] }, r = t;
  e.default = r;
} }), pC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = p(eC()), r = p(tC()), n = p(rC()), o = p(nC()), l = p(oC()), a = p(aC()), i = p(lC()), u = p(iC()), c = p(sC()), s = p(uC()), d = p(cC()), f = p(dC());
  function p(h) {
    return h && h.__esModule ? h : { default: h };
  }
  var m = [["command", t.default], ["composite", r.default], ["input", n.default], ["landmark", o.default], ["range", l.default], ["roletype", a.default], ["section", i.default], ["sectionhead", u.default], ["select", c.default], ["structure", s.default], ["widget", d.default], ["window", f.default]], b = m;
  e.default = b;
} }), fC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/alertRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-atomic": "true", "aria-live": "assertive" }, relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), mC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "alert" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]] }, r = t;
  e.default = r;
} }), hC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/applicationRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "Device Independence Delivery Unit" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, r = t;
  e.default = r;
} }), bC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/articleRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { name: "article" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "document"]] }, r = t;
  e.default = r;
} }), yC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/bannerRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { constraints: ["scoped to the body element"], name: "header" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), gC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "blockquote" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), vC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/buttonRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null, "aria-pressed": null }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "button" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ name: "type", value: "image" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ name: "type", value: "reset" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ name: "type", value: "submit" }], name: "input" }, module: "HTML" }, { concept: { name: "button" }, module: "HTML" }, { concept: { name: "trigger" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command"]] }, r = t;
  e.default = r;
} }), _C = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/captionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "caption" }, module: "HTML" }], requireContextRole: ["figure", "grid", "table"], requiredContextRole: ["figure", "grid", "table"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), RC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/cellRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-colindex": null, "aria-colspan": null, "aria-rowindex": null, "aria-rowspan": null }, relatedConcepts: [{ concept: { constraints: ["ancestor table element has table role"], name: "td" }, module: "HTML" }], requireContextRole: ["row"], requiredContextRole: ["row"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), wC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-checked": null, "aria-errormessage": null, "aria-expanded": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "checkbox" }], name: "input" }, module: "HTML" }, { concept: { name: "option" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input"]] }, r = t;
  e.default = r;
} }), EC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/codeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "code" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), CC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-sort": null }, relatedConcepts: [{ concept: { name: "th" }, module: "HTML" }, { concept: { attributes: [{ name: "scope", value: "col" }], name: "th" }, module: "HTML" }, { concept: { attributes: [{ name: "scope", value: "colgroup" }], name: "th" }, module: "HTML" }], requireContextRole: ["row"], requiredContextRole: ["row"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]] }, r = t;
  e.default = r;
} }), qC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-autocomplete": null, "aria-errormessage": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null, "aria-expanded": "false", "aria-haspopup": "listbox" }, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "email" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "search" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "tel" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "text" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "url" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "list" }, { name: "type", value: "url" }], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "multiple" }, { constraints: ["undefined"], name: "size" }], constraints: ["the multiple attribute is not set and the size attribute does not have a value greater than 1"], name: "select" }, module: "HTML" }, { concept: { name: "select" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-controls": null, "aria-expanded": "false" }, superClass: [["roletype", "widget", "input"]] }, r = t;
  e.default = r;
} }), PC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "aside" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-label" }], constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "aside" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-labelledby" }], constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "aside" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), OC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { constraints: ["scoped to the body element"], name: "footer" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), TC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/definitionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "dd" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), SC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/deletionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "del" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), MC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/dialogRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "dialog" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "window"]] }, r = t;
  e.default = r;
} }), AC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/directoryRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ module: "DAISY Guide" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "list"]] }, r = t;
  e.default = r;
} }), xC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/documentRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "Device Independence Delivery Unit" } }, { concept: { name: "html" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, r = t;
  e.default = r;
} }), jC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "em" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), NC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/feedRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["article"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "list"]] }, r = t;
  e.default = r;
} }), $C = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/figureRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "figure" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), IC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/formRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "aria-label" }], name: "form" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-labelledby" }], name: "form" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "name" }], name: "form" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), LC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/genericRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "a" }, module: "HTML" }, { concept: { name: "area" }, module: "HTML" }, { concept: { name: "aside" }, module: "HTML" }, { concept: { name: "b" }, module: "HTML" }, { concept: { name: "bdo" }, module: "HTML" }, { concept: { name: "body" }, module: "HTML" }, { concept: { name: "data" }, module: "HTML" }, { concept: { name: "div" }, module: "HTML" }, { concept: { constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "footer" }, module: "HTML" }, { concept: { constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"], name: "header" }, module: "HTML" }, { concept: { name: "hgroup" }, module: "HTML" }, { concept: { name: "i" }, module: "HTML" }, { concept: { name: "pre" }, module: "HTML" }, { concept: { name: "q" }, module: "HTML" }, { concept: { name: "samp" }, module: "HTML" }, { concept: { name: "section" }, module: "HTML" }, { concept: { name: "small" }, module: "HTML" }, { concept: { name: "span" }, module: "HTML" }, { concept: { name: "u" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, r = t;
  e.default = r;
} }), kC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/gridRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-multiselectable": null, "aria-readonly": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["row"], ["row", "rowgroup"]], requiredProps: {}, superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]] }, r = t;
  e.default = r;
} }), BC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null, "aria-selected": null }, relatedConcepts: [{ concept: { constraints: ["ancestor table element has grid role", "ancestor table element has treegrid role"], name: "td" }, module: "HTML" }], requireContextRole: ["row"], requiredContextRole: ["row"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]] }, r = t;
  e.default = r;
} }), DC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/groupRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-disabled": null }, relatedConcepts: [{ concept: { name: "details" }, module: "HTML" }, { concept: { name: "fieldset" }, module: "HTML" }, { concept: { name: "optgroup" }, module: "HTML" }, { concept: { name: "address" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), FC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/headingRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-level": "2" }, relatedConcepts: [{ concept: { name: "h1" }, module: "HTML" }, { concept: { name: "h2" }, module: "HTML" }, { concept: { name: "h3" }, module: "HTML" }, { concept: { name: "h4" }, module: "HTML" }, { concept: { name: "h5" }, module: "HTML" }, { concept: { name: "h6" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-level": "2" }, superClass: [["roletype", "structure", "sectionhead"]] }, r = t;
  e.default = r;
} }), UC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/imgRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "alt" }], name: "img" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "alt" }], name: "img" }, module: "HTML" }, { concept: { name: "imggroup" }, module: "DTB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), HC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/insertionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "ins" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), VC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/linkRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null }, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "href" }], name: "a" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "href" }], name: "area" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command"]] }, r = t;
  e.default = r;
} }), zC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/listRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "menu" }, module: "HTML" }, { concept: { name: "ol" }, module: "HTML" }, { concept: { name: "ul" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["listitem"]], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), GC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/listboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-expanded": null, "aria-invalid": null, "aria-multiselectable": null, "aria-readonly": null, "aria-required": null, "aria-orientation": "vertical" }, relatedConcepts: [{ concept: { attributes: [{ constraints: [">1"], name: "size" }], constraints: ["the size attribute value is greater than 1"], name: "select" }, module: "HTML" }, { concept: { attributes: [{ name: "multiple" }], name: "select" }, module: "HTML" }, { concept: { name: "datalist" }, module: "HTML" }, { concept: { name: "list" }, module: "ARIA" }, { concept: { name: "select" }, module: "XForms" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["option", "group"], ["option"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] }, r = t;
  e.default = r;
} }), WC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/listitemRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-level": null, "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { constraints: ["direct descendant of ol", "direct descendant of ul", "direct descendant of menu"], name: "li" }, module: "HTML" }, { concept: { name: "item" }, module: "XForms" }], requireContextRole: ["directory", "list"], requiredContextRole: ["directory", "list"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), KC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/logRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-live": "polite" }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), YC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/mainRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "main" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), JC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/markRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: [], props: { "aria-braillelabel": null, "aria-brailleroledescription": null, "aria-description": null }, relatedConcepts: [{ concept: { name: "mark" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), XC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), QC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/mathRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "math" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), ZC = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/menuRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": "vertical" }, relatedConcepts: [{ concept: { name: "MENU" }, module: "JAPI" }, { concept: { name: "list" }, module: "ARIA" }, { concept: { name: "select" }, module: "XForms" }, { concept: { name: "sidebar" }, module: "DTB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] }, r = t;
  e.default = r;
} }), eq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/menubarRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": "horizontal" }, relatedConcepts: [{ concept: { name: "toolbar" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]] }, r = t;
  e.default = r;
} }), tq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null, "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { name: "MENU_ITEM" }, module: "JAPI" }, { concept: { name: "listitem" }, module: "ARIA" }, { concept: { name: "option" }, module: "ARIA" }], requireContextRole: ["group", "menu", "menubar"], requiredContextRole: ["group", "menu", "menubar"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command"]] }, r = t;
  e.default = r;
} }), rq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }], requireContextRole: ["group", "menu", "menubar"], requiredContextRole: ["group", "menu", "menubar"], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]] }, r = t;
  e.default = r;
} }), nq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "menuitem" }, module: "ARIA" }], requireContextRole: ["group", "menu", "menubar"], requiredContextRole: ["group", "menu", "menubar"], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]] }, r = t;
  e.default = r;
} }), oq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/meterRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-valuetext": null, "aria-valuemax": "100", "aria-valuemin": "0" }, relatedConcepts: [{ concept: { name: "meter" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-valuenow": null }, superClass: [["roletype", "structure", "range"]] }, r = t;
  e.default = r;
} }), aq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/navigationRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "nav" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), lq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/noneRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: [], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [] }, r = t;
  e.default = r;
} }), iq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/noteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), sq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/optionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-checked": null, "aria-posinset": null, "aria-setsize": null, "aria-selected": "false" }, relatedConcepts: [{ concept: { name: "item" }, module: "XForms" }, { concept: { name: "listitem" }, module: "ARIA" }, { concept: { name: "option" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-selected": "false" }, superClass: [["roletype", "widget", "input"]] }, r = t;
  e.default = r;
} }), uq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "p" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), cq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/presentationRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { attributes: [{ name: "alt", value: "" }], name: "img" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, r = t;
  e.default = r;
} }), dq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-valuetext": null }, relatedConcepts: [{ concept: { name: "progress" }, module: "HTML" }, { concept: { name: "status" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "range"], ["roletype", "widget"]] }, r = t;
  e.default = r;
} }), pq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/radioRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-checked": null, "aria-posinset": null, "aria-setsize": null }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "radio" }], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input"]] }, r = t;
  e.default = r;
} }), fq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null }, relatedConcepts: [{ concept: { name: "list" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["radio"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] }, r = t;
  e.default = r;
} }), mq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/regionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["set"], name: "aria-label" }], name: "section" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["set"], name: "aria-labelledby" }], name: "section" }, module: "HTML" }, { concept: { name: "Device Independence Glossart perceivable unit" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), hq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/rowRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-colindex": null, "aria-expanded": null, "aria-level": null, "aria-posinset": null, "aria-rowindex": null, "aria-selected": null, "aria-setsize": null }, relatedConcepts: [{ concept: { name: "tr" }, module: "HTML" }], requireContextRole: ["grid", "rowgroup", "table", "treegrid"], requiredContextRole: ["grid", "rowgroup", "table", "treegrid"], requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]] }, r = t;
  e.default = r;
} }), bq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "tbody" }, module: "HTML" }, { concept: { name: "tfoot" }, module: "HTML" }, { concept: { name: "thead" }, module: "HTML" }], requireContextRole: ["grid", "table", "treegrid"], requiredContextRole: ["grid", "table", "treegrid"], requiredOwnedElements: [["row"]], requiredProps: {}, superClass: [["roletype", "structure"]] }, r = t;
  e.default = r;
} }), yq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-sort": null }, relatedConcepts: [{ concept: { attributes: [{ name: "scope", value: "row" }], name: "th" }, module: "HTML" }, { concept: { attributes: [{ name: "scope", value: "rowgroup" }], name: "th" }, module: "HTML" }], requireContextRole: ["row", "rowgroup"], requiredContextRole: ["row", "rowgroup"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]] }, r = t;
  e.default = r;
} }), gq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-valuetext": null, "aria-orientation": "vertical", "aria-valuemax": "100", "aria-valuemin": "0" }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-controls": null, "aria-valuenow": null }, superClass: [["roletype", "structure", "range"], ["roletype", "widget"]] }, r = t;
  e.default = r;
} }), vq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/searchRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), _q = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "search" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "input", "textbox"]] }, r = t;
  e.default = r;
} }), Rq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/separatorRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-orientation": "horizontal", "aria-valuemax": "100", "aria-valuemin": "0", "aria-valuenow": null, "aria-valuetext": null }, relatedConcepts: [{ concept: { name: "hr" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure"]] }, r = t;
  e.default = r;
} }), wq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/sliderRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-haspopup": null, "aria-invalid": null, "aria-readonly": null, "aria-valuetext": null, "aria-orientation": "horizontal", "aria-valuemax": "100", "aria-valuemin": "0" }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "range" }], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-valuenow": null }, superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]] }, r = t;
  e.default = r;
} }), Eq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null, "aria-readonly": null, "aria-required": null, "aria-valuetext": null, "aria-valuenow": "0" }, relatedConcepts: [{ concept: { attributes: [{ name: "type", value: "number" }], name: "input" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]] }, r = t;
  e.default = r;
} }), Cq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/statusRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-atomic": "true", "aria-live": "polite" }, relatedConcepts: [{ concept: { name: "output" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), qq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/strongRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "strong" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), Pq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "sub" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), Oq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["prohibited"], prohibitedProps: ["aria-label", "aria-labelledby"], props: {}, relatedConcepts: [{ concept: { name: "sup" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), Tq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/switchRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "button" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: { "aria-checked": null }, superClass: [["roletype", "widget", "input", "checkbox"]] }, r = t;
  e.default = r;
} }), Sq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/tabRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-disabled": null, "aria-expanded": null, "aria-haspopup": null, "aria-posinset": null, "aria-setsize": null, "aria-selected": "false" }, relatedConcepts: [], requireContextRole: ["tablist"], requiredContextRole: ["tablist"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]] }, r = t;
  e.default = r;
} }), Mq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/tableRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-colcount": null, "aria-rowcount": null }, relatedConcepts: [{ concept: { name: "table" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["row"], ["row", "rowgroup"]], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), Aq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/tablistRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-level": null, "aria-multiselectable": null, "aria-orientation": "horizontal" }, relatedConcepts: [{ module: "DAISY", concept: { name: "guide" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["tab"]], requiredProps: {}, superClass: [["roletype", "widget", "composite"]] }, r = t;
  e.default = r;
} }), xq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), jq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/termRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "dfn" }, module: "HTML" }, { concept: { name: "dt" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), Nq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/textboxRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-activedescendant": null, "aria-autocomplete": null, "aria-errormessage": null, "aria-haspopup": null, "aria-invalid": null, "aria-multiline": null, "aria-placeholder": null, "aria-readonly": null, "aria-required": null }, relatedConcepts: [{ concept: { attributes: [{ constraints: ["undefined"], name: "type" }, { constraints: ["undefined"], name: "list" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "email" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "tel" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "text" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { attributes: [{ constraints: ["undefined"], name: "list" }, { name: "type", value: "url" }], constraints: ["the list attribute is not set"], name: "input" }, module: "HTML" }, { concept: { name: "input" }, module: "XForms" }, { concept: { name: "textarea" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "input"]] }, r = t;
  e.default = r;
} }), $q = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/timeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "time" }, module: "HTML" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), Iq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/timerRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "status"]] }, r = t;
  e.default = r;
} }), Lq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-orientation": "horizontal" }, relatedConcepts: [{ concept: { name: "menubar" }, module: "ARIA" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "group"]] }, r = t;
  e.default = r;
} }), kq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), Bq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/treeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null, "aria-multiselectable": null, "aria-required": null, "aria-orientation": "vertical" }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["treeitem", "group"], ["treeitem"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]] }, r = t;
  e.default = r;
} }), Dq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/treegridRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["row"], ["row", "rowgroup"]], requiredProps: {}, superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]] }, r = t;
  e.default = r;
} }), Fq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-expanded": null, "aria-haspopup": null }, relatedConcepts: [], requireContextRole: ["group", "tree"], requiredContextRole: ["group", "tree"], requiredOwnedElements: [], requiredProps: { "aria-selected": null }, superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]] }, r = t;
  e.default = r;
} }), Uq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = x(fC()), r = x(mC()), n = x(hC()), o = x(bC()), l = x(yC()), a = x(gC()), i = x(vC()), u = x(_C()), c = x(RC()), s = x(wC()), d = x(EC()), f = x(CC()), p = x(qC()), m = x(PC()), b = x(OC()), h = x(TC()), y = x(SC()), g = x(MC()), q = x(AC()), C = x(xC()), E = x(jC()), _ = x(NC()), v = x($C()), w = x(IC()), P = x(LC()), j = x(kC()), $ = x(BC()), k = x(DC()), L = x(FC()), S = x(UC()), B = x(HC()), z = x(VC()), Y = x(zC()), K = x(GC()), Z = x(WC()), he = x(KC()), ue = x(YC()), U = x(JC()), D = x(XC()), F = x(QC()), W = x(ZC()), V = x(eq()), ee = x(tq()), ne = x(rq()), Ie = x(nq()), A = x(oq()), G = x(aq()), H = x(lq()), Q = x(iq()), I = x(sq()), le = x(uq()), fe = x(cq()), ge = x(dq()), Ye = x(pq()), Vo = x(fq()), zo = x(mq()), Go = x(hq()), Wo = x(bq()), Ko = x(yq()), Yo = x(gq()), Jo = x(vq()), Xo = x(_q()), Qo = x(Rq()), Zo = x(wq()), ea = x(Eq()), ta = x(Cq()), ra = x(qq()), na = x(Pq()), oa = x(Oq()), aa = x(Tq()), la = x(Sq()), ia = x(Mq()), sa = x(Aq()), ua = x(xq()), ca = x(jq()), da = x(Nq()), pa = x($q()), fa = x(Iq()), ma = x(Lq()), ha = x(kq()), ba = x(Bq()), ya = x(Dq()), ga = x(Fq());
  function x(qn) {
    return qn && qn.__esModule ? qn : { default: qn };
  }
  var va = [["alert", t.default], ["alertdialog", r.default], ["application", n.default], ["article", o.default], ["banner", l.default], ["blockquote", a.default], ["button", i.default], ["caption", u.default], ["cell", c.default], ["checkbox", s.default], ["code", d.default], ["columnheader", f.default], ["combobox", p.default], ["complementary", m.default], ["contentinfo", b.default], ["definition", h.default], ["deletion", y.default], ["dialog", g.default], ["directory", q.default], ["document", C.default], ["emphasis", E.default], ["feed", _.default], ["figure", v.default], ["form", w.default], ["generic", P.default], ["grid", j.default], ["gridcell", $.default], ["group", k.default], ["heading", L.default], ["img", S.default], ["insertion", B.default], ["link", z.default], ["list", Y.default], ["listbox", K.default], ["listitem", Z.default], ["log", he.default], ["main", ue.default], ["mark", U.default], ["marquee", D.default], ["math", F.default], ["menu", W.default], ["menubar", V.default], ["menuitem", ee.default], ["menuitemcheckbox", ne.default], ["menuitemradio", Ie.default], ["meter", A.default], ["navigation", G.default], ["none", H.default], ["note", Q.default], ["option", I.default], ["paragraph", le.default], ["presentation", fe.default], ["progressbar", ge.default], ["radio", Ye.default], ["radiogroup", Vo.default], ["region", zo.default], ["row", Go.default], ["rowgroup", Wo.default], ["rowheader", Ko.default], ["scrollbar", Yo.default], ["search", Jo.default], ["searchbox", Xo.default], ["separator", Qo.default], ["slider", Zo.default], ["spinbutton", ea.default], ["status", ta.default], ["strong", ra.default], ["subscript", na.default], ["superscript", oa.default], ["switch", aa.default], ["tab", la.default], ["table", ia.default], ["tablist", sa.default], ["tabpanel", ua.default], ["term", ca.default], ["textbox", da.default], ["time", pa.default], ["timer", fa.default], ["toolbar", ma.default], ["tooltip", ha.default], ["tree", ba.default], ["treegrid", ya.default], ["treeitem", ga.default]], nr = va;
  e.default = nr;
} }), Hq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "abstract [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), Vq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "acknowledgments [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), zq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "afterword [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), Gq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "appendix [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), Wq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "referrer [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] }, r = t;
  e.default = r;
} }), Kq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "EPUB biblioentry [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: ["doc-bibliography"], requiredContextRole: ["doc-bibliography"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "listitem"]] }, r = t;
  e.default = r;
} }), Yq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "bibliography [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["doc-biblioentry"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), Jq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "biblioref [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] }, r = t;
  e.default = r;
} }), Xq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "chapter [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), Qq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "colophon [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), Zq = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "conclusion [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), eP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "cover [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "img"]] }, r = t;
  e.default = r;
} }), tP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "credit [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), rP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "credits [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), nP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "dedication [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), oP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "rearnote [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: ["doc-endnotes"], requiredContextRole: ["doc-endnotes"], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "listitem"]] }, r = t;
  e.default = r;
} }), aP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "rearnotes [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["doc-endnote"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), lP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "epigraph [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), iP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "epilogue [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), sP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "errata [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), uP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), cP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "footnote [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), dP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "foreword [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), pP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "glossary [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [["definition"], ["term"]], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), fP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "glossref [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] }, r = t;
  e.default = r;
} }), mP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "index [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark", "navigation"]] }, r = t;
  e.default = r;
} }), hP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "introduction [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), bP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "noteref [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "widget", "command", "link"]] }, r = t;
  e.default = r;
} }), yP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "notice [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "note"]] }, r = t;
  e.default = r;
} }), gP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "pagebreak [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "separator"]] }, r = t;
  e.default = r;
} }), vP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "page-list [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark", "navigation"]] }, r = t;
  e.default = r;
} }), _P = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "part [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), RP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "preface [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), wP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "prologue [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark"]] }, r = t;
  e.default = r;
} }), EP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: {}, relatedConcepts: [{ concept: { name: "pullquote [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["none"]] }, r = t;
  e.default = r;
} }), CP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "qna [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section"]] }, r = t;
  e.default = r;
} }), qP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "subtitle [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "sectionhead"]] }, r = t;
  e.default = r;
} }), PP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "help [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "note"]] }, r = t;
  e.default = r;
} }), OP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ concept: { name: "toc [EPUB-SSV]" }, module: "EPUB" }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "landmark", "navigation"]] }, r = t;
  e.default = r;
} }), TP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = F(Hq()), r = F(Vq()), n = F(zq()), o = F(Gq()), l = F(Wq()), a = F(Kq()), i = F(Yq()), u = F(Jq()), c = F(Xq()), s = F(Qq()), d = F(Zq()), f = F(eP()), p = F(tP()), m = F(rP()), b = F(nP()), h = F(oP()), y = F(aP()), g = F(lP()), q = F(iP()), C = F(sP()), E = F(uP()), _ = F(cP()), v = F(dP()), w = F(pP()), P = F(fP()), j = F(mP()), $ = F(hP()), k = F(bP()), L = F(yP()), S = F(gP()), B = F(vP()), z = F(_P()), Y = F(RP()), K = F(wP()), Z = F(EP()), he = F(CP()), ue = F(qP()), U = F(PP()), D = F(OP());
  function F(ee) {
    return ee && ee.__esModule ? ee : { default: ee };
  }
  var W = [["doc-abstract", t.default], ["doc-acknowledgments", r.default], ["doc-afterword", n.default], ["doc-appendix", o.default], ["doc-backlink", l.default], ["doc-biblioentry", a.default], ["doc-bibliography", i.default], ["doc-biblioref", u.default], ["doc-chapter", c.default], ["doc-colophon", s.default], ["doc-conclusion", d.default], ["doc-cover", f.default], ["doc-credit", p.default], ["doc-credits", m.default], ["doc-dedication", b.default], ["doc-endnote", h.default], ["doc-endnotes", y.default], ["doc-epigraph", g.default], ["doc-epilogue", q.default], ["doc-errata", C.default], ["doc-example", E.default], ["doc-footnote", _.default], ["doc-foreword", v.default], ["doc-glossary", w.default], ["doc-glossref", P.default], ["doc-index", j.default], ["doc-introduction", $.default], ["doc-noteref", k.default], ["doc-notice", L.default], ["doc-pagebreak", S.default], ["doc-pagelist", B.default], ["doc-part", z.default], ["doc-preface", Y.default], ["doc-prologue", K.default], ["doc-pullquote", Z.default], ["doc-qna", he.default], ["doc-subtitle", ue.default], ["doc-tip", U.default], ["doc-toc", D.default]], V = W;
  e.default = V;
} }), SP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ module: "GRAPHICS", concept: { name: "graphics-object" } }, { module: "ARIA", concept: { name: "img" } }, { module: "ARIA", concept: { name: "article" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "document"]] }, r = t;
  e.default = r;
} }), MP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !1, baseConcepts: [], childrenPresentational: !1, nameFrom: ["author", "contents"], prohibitedProps: [], props: { "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [{ module: "GRAPHICS", concept: { name: "graphics-document" } }, { module: "ARIA", concept: { name: "group" } }, { module: "ARIA", concept: { name: "img" } }, { module: "GRAPHICS", concept: { name: "graphics-symbol" } }], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "group"]] }, r = t;
  e.default = r;
} }), AP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = { abstract: !1, accessibleNameRequired: !0, baseConcepts: [], childrenPresentational: !0, nameFrom: ["author"], prohibitedProps: [], props: { "aria-disabled": null, "aria-errormessage": null, "aria-expanded": null, "aria-haspopup": null, "aria-invalid": null }, relatedConcepts: [], requireContextRole: [], requiredContextRole: [], requiredOwnedElements: [], requiredProps: {}, superClass: [["roletype", "structure", "section", "img"]] }, r = t;
  e.default = r;
} }), xP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = o(SP()), r = o(MP()), n = o(AP());
  function o(i) {
    return i && i.__esModule ? i : { default: i };
  }
  var l = [["graphics-document", t.default], ["graphics-object", r.default], ["graphics-symbol", n.default]], a = l;
  e.default = a;
} }), Ei = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/rolesMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = a(pC()), r = a(Uq()), n = a(TP()), o = a(xP()), l = a(hn());
  function a(g) {
    return g && g.__esModule ? g : { default: g };
  }
  function i(g, q, C) {
    return q in g ? Object.defineProperty(g, q, { value: C, enumerable: !0, configurable: !0, writable: !0 }) : g[q] = C, g;
  }
  function u(g, q) {
    var C = typeof Symbol < "u" && g[Symbol.iterator] || g["@@iterator"];
    if (!C) {
      if (Array.isArray(g) || (C = d(g)) || q) {
        C && (g = C);
        var E = 0, _ = function() {
        };
        return { s: _, n: function() {
          return E >= g.length ? { done: !0 } : { done: !1, value: g[E++] };
        }, e: function(j) {
          throw j;
        }, f: _ };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var v = !0, w = !1, P;
    return { s: function() {
      C = C.call(g);
    }, n: function() {
      var j = C.next();
      return v = j.done, j;
    }, e: function(j) {
      w = !0, P = j;
    }, f: function() {
      try {
        !v && C.return != null && C.return();
      } finally {
        if (w) throw P;
      }
    } };
  }
  function c(g, q) {
    return m(g) || p(g, q) || d(g, q) || s();
  }
  function s() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function d(g, q) {
    if (g) {
      if (typeof g == "string") return f(g, q);
      var C = Object.prototype.toString.call(g).slice(8, -1);
      if (C === "Object" && g.constructor && (C = g.constructor.name), C === "Map" || C === "Set") return Array.from(g);
      if (C === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(C)) return f(g, q);
    }
  }
  function f(g, q) {
    (q == null || q > g.length) && (q = g.length);
    for (var C = 0, E = new Array(q); C < q; C++) E[C] = g[C];
    return E;
  }
  function p(g, q) {
    var C = g == null ? null : typeof Symbol < "u" && g[Symbol.iterator] || g["@@iterator"];
    if (C != null) {
      var E = [], _ = !0, v = !1, w, P;
      try {
        for (C = C.call(g); !(_ = (w = C.next()).done) && (E.push(w.value), !(q && E.length === q)); _ = !0) ;
      } catch (j) {
        v = !0, P = j;
      } finally {
        try {
          !_ && C.return != null && C.return();
        } finally {
          if (v) throw P;
        }
      }
      return E;
    }
  }
  function m(g) {
    if (Array.isArray(g)) return g;
  }
  var b = [].concat(t.default, r.default, n.default, o.default);
  b.forEach(function(g) {
    var q = c(g, 2), C = q[1], E = u(C.superClass), _;
    try {
      for (E.s(); !(_ = E.n()).done; ) {
        var v = _.value, w = u(v), P;
        try {
          var j = function() {
            var $ = P.value, k = b.find(function(Y) {
              var K = c(Y, 1), Z = K[0];
              return Z === $;
            });
            if (k) for (var L = k[1], S = 0, B = Object.keys(L.props); S < B.length; S++) {
              var z = B[S];
              Object.prototype.hasOwnProperty.call(C.props, z) || Object.assign(C.props, i({}, z, L.props[z]));
            }
          };
          for (w.s(); !(P = w.n()).done; ) j();
        } catch ($) {
          w.e($);
        } finally {
          w.f();
        }
      }
    } catch ($) {
      E.e($);
    } finally {
      E.f();
    }
  });
  var h = { entries: function() {
    return b;
  }, forEach: function(g) {
    var q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, C = u(b), E;
    try {
      for (C.s(); !(E = C.n()).done; ) {
        var _ = c(E.value, 2), v = _[0], w = _[1];
        g.call(q, w, v, b);
      }
    } catch (P) {
      C.e(P);
    } finally {
      C.f();
    }
  }, get: function(g) {
    var q = b.find(function(C) {
      return C[0] === g;
    });
    return q && q[1];
  }, has: function(g) {
    return !!h.get(g);
  }, keys: function() {
    return b.map(function(g) {
      var q = c(g, 1), C = q[0];
      return C;
    });
  }, values: function() {
    return b.map(function(g) {
      var q = c(g, 2), C = q[1];
      return C;
    });
  } }, y = (0, l.default)(h, h.entries());
  e.default = y;
} }), jP = R({ "../../node_modules/dequal/lite/index.js"(e) {
  var t = Object.prototype.hasOwnProperty;
  function r(n, o) {
    var l, a;
    if (n === o) return !0;
    if (n && o && (l = n.constructor) === o.constructor) {
      if (l === Date) return n.getTime() === o.getTime();
      if (l === RegExp) return n.toString() === o.toString();
      if (l === Array) {
        if ((a = n.length) === o.length) for (; a-- && r(n[a], o[a]); ) ;
        return a === -1;
      }
      if (!l || typeof n == "object") {
        a = 0;
        for (l in n) if (t.call(n, l) && ++a && !t.call(o, l) || !(l in o) || !r(n[l], o[l])) return !1;
        return Object.keys(o).length === a;
      }
    }
    return n !== n && o !== o;
  }
  e.dequal = r;
} }), NP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/elementRoleMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = jP(), r = o(hn()), n = o(Ei());
  function o(_) {
    return _ && _.__esModule ? _ : { default: _ };
  }
  function l(_, v) {
    return u(_) || i(_, v) || s(_, v) || a();
  }
  function a() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function i(_, v) {
    var w = _ == null ? null : typeof Symbol < "u" && _[Symbol.iterator] || _["@@iterator"];
    if (w != null) {
      var P = [], j = !0, $ = !1, k, L;
      try {
        for (w = w.call(_); !(j = (k = w.next()).done) && (P.push(k.value), !(v && P.length === v)); j = !0) ;
      } catch (S) {
        $ = !0, L = S;
      } finally {
        try {
          !j && w.return != null && w.return();
        } finally {
          if ($) throw L;
        }
      }
      return P;
    }
  }
  function u(_) {
    if (Array.isArray(_)) return _;
  }
  function c(_, v) {
    var w = typeof Symbol < "u" && _[Symbol.iterator] || _["@@iterator"];
    if (!w) {
      if (Array.isArray(_) || (w = s(_)) || v) {
        w && (_ = w);
        var P = 0, j = function() {
        };
        return { s: j, n: function() {
          return P >= _.length ? { done: !0 } : { done: !1, value: _[P++] };
        }, e: function(S) {
          throw S;
        }, f: j };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var $ = !0, k = !1, L;
    return { s: function() {
      w = w.call(_);
    }, n: function() {
      var S = w.next();
      return $ = S.done, S;
    }, e: function(S) {
      k = !0, L = S;
    }, f: function() {
      try {
        !$ && w.return != null && w.return();
      } finally {
        if (k) throw L;
      }
    } };
  }
  function s(_, v) {
    if (_) {
      if (typeof _ == "string") return d(_, v);
      var w = Object.prototype.toString.call(_).slice(8, -1);
      if (w === "Object" && _.constructor && (w = _.constructor.name), w === "Map" || w === "Set") return Array.from(_);
      if (w === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(w)) return d(_, v);
    }
  }
  function d(_, v) {
    (v == null || v > _.length) && (v = _.length);
    for (var w = 0, P = new Array(v); w < v; w++) P[w] = _[w];
    return P;
  }
  var f = [], p = n.default.keys();
  for (q = 0; q < p.length; q++) if (m = p[q], b = n.default.get(m), b) for (h = [].concat(b.baseConcepts, b.relatedConcepts), g = 0; g < h.length; g++) y = h[g], y.module === "HTML" && function() {
    var _ = y.concept;
    if (_) {
      var v = f.find(function($) {
        return (0, t.dequal)($, _);
      }), w;
      v ? w = v[1] : w = [];
      for (var P = !0, j = 0; j < w.length; j++) if (w[j] === m) {
        P = !1;
        break;
      }
      P && w.push(m), f.push([_, w]);
    }
  }();
  var m, b, h, y, g, q, C = { entries: function() {
    return f;
  }, forEach: function(_) {
    var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, w = c(f), P;
    try {
      for (w.s(); !(P = w.n()).done; ) {
        var j = l(P.value, 2), $ = j[0], k = j[1];
        _.call(v, k, $, f);
      }
    } catch (L) {
      w.e(L);
    } finally {
      w.f();
    }
  }, get: function(_) {
    var v = f.find(function(w) {
      return _.name === w[0].name && (0, t.dequal)(_.attributes, w[0].attributes);
    });
    return v && v[1];
  }, has: function(_) {
    return !!C.get(_);
  }, keys: function() {
    return f.map(function(_) {
      var v = l(_, 1), w = v[0];
      return w;
    });
  }, values: function() {
    return f.map(function(_) {
      var v = l(_, 2), w = v[1];
      return w;
    });
  } }, E = (0, r.default)(C, C.entries());
  e.default = E;
} }), $P = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/roleElementMap.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
  var t = n(hn()), r = n(Ei());
  function n(v) {
    return v && v.__esModule ? v : { default: v };
  }
  function o(v, w) {
    return i(v) || a(v, w) || c(v, w) || l();
  }
  function l() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function a(v, w) {
    var P = v == null ? null : typeof Symbol < "u" && v[Symbol.iterator] || v["@@iterator"];
    if (P != null) {
      var j = [], $ = !0, k = !1, L, S;
      try {
        for (P = P.call(v); !($ = (L = P.next()).done) && (j.push(L.value), !(w && j.length === w)); $ = !0) ;
      } catch (B) {
        k = !0, S = B;
      } finally {
        try {
          !$ && P.return != null && P.return();
        } finally {
          if (k) throw S;
        }
      }
      return j;
    }
  }
  function i(v) {
    if (Array.isArray(v)) return v;
  }
  function u(v, w) {
    var P = typeof Symbol < "u" && v[Symbol.iterator] || v["@@iterator"];
    if (!P) {
      if (Array.isArray(v) || (P = c(v)) || w) {
        P && (v = P);
        var j = 0, $ = function() {
        };
        return { s: $, n: function() {
          return j >= v.length ? { done: !0 } : { done: !1, value: v[j++] };
        }, e: function(B) {
          throw B;
        }, f: $ };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var k = !0, L = !1, S;
    return { s: function() {
      P = P.call(v);
    }, n: function() {
      var B = P.next();
      return k = B.done, B;
    }, e: function(B) {
      L = !0, S = B;
    }, f: function() {
      try {
        !k && P.return != null && P.return();
      } finally {
        if (L) throw S;
      }
    } };
  }
  function c(v, w) {
    if (v) {
      if (typeof v == "string") return s(v, w);
      var P = Object.prototype.toString.call(v).slice(8, -1);
      if (P === "Object" && v.constructor && (P = v.constructor.name), P === "Map" || P === "Set") return Array.from(v);
      if (P === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(P)) return s(v, w);
    }
  }
  function s(v, w) {
    (w == null || w > v.length) && (w = v.length);
    for (var P = 0, j = new Array(w); P < w; P++) j[P] = v[P];
    return j;
  }
  var d = [], f = r.default.keys();
  for (C = 0; C < f.length; C++) if (p = f[C], m = r.default.get(p), b = [], m) {
    for (h = [].concat(m.baseConcepts, m.relatedConcepts), q = 0; q < h.length; q++) y = h[q], y.module === "HTML" && (g = y.concept, g != null && b.push(g));
    b.length > 0 && d.push([p, b]);
  }
  var p, m, b, h, y, g, q, C, E = { entries: function() {
    return d;
  }, forEach: function(v) {
    var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, P = u(d), j;
    try {
      for (P.s(); !(j = P.n()).done; ) {
        var $ = o(j.value, 2), k = $[0], L = $[1];
        v.call(w, L, k, d);
      }
    } catch (S) {
      P.e(S);
    } finally {
      P.f();
    }
  }, get: function(v) {
    var w = d.find(function(P) {
      return P[0] === v;
    });
    return w && w[1];
  }, has: function(v) {
    return !!E.get(v);
  }, keys: function() {
    return d.map(function(v) {
      var w = o(v, 1), P = w[0];
      return P;
    });
  }, values: function() {
    return d.map(function(v) {
      var w = o(v, 2), P = w[1];
      return P;
    });
  } }, _ = (0, t.default)(E, E.entries());
  e.default = _;
} }), IP = R({ "../../node_modules/@testing-library/dom/node_modules/aria-query/lib/index.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.roles = e.roleElements = e.elementRoles = e.dom = e.aria = void 0;
  var t = a(Q0()), r = a(Z0()), n = a(Ei()), o = a(NP()), l = a($P());
  function a(f) {
    return f && f.__esModule ? f : { default: f };
  }
  var i = t.default;
  e.aria = i;
  var u = r.default;
  e.dom = u;
  var c = n.default;
  e.roles = c;
  var s = o.default;
  e.elementRoles = s;
  var d = l.default;
  e.roleElements = d;
} }), LP = R({ "../../node_modules/lz-string/libs/lz-string.js"(e, t) {
  var r = function() {
    var n = String.fromCharCode, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", a = {};
    function i(c, s) {
      if (!a[c]) {
        a[c] = {};
        for (var d = 0; d < c.length; d++) a[c][c.charAt(d)] = d;
      }
      return a[c][s];
    }
    var u = { compressToBase64: function(c) {
      if (c == null) return "";
      var s = u._compress(c, 6, function(d) {
        return o.charAt(d);
      });
      switch (s.length % 4) {
        default:
        case 0:
          return s;
        case 1:
          return s + "===";
        case 2:
          return s + "==";
        case 3:
          return s + "=";
      }
    }, decompressFromBase64: function(c) {
      return c == null ? "" : c == "" ? null : u._decompress(c.length, 32, function(s) {
        return i(o, c.charAt(s));
      });
    }, compressToUTF16: function(c) {
      return c == null ? "" : u._compress(c, 15, function(s) {
        return n(s + 32);
      }) + " ";
    }, decompressFromUTF16: function(c) {
      return c == null ? "" : c == "" ? null : u._decompress(c.length, 16384, function(s) {
        return c.charCodeAt(s) - 32;
      });
    }, compressToUint8Array: function(c) {
      for (var s = u.compress(c), d = new Uint8Array(s.length * 2), f = 0, p = s.length; f < p; f++) {
        var m = s.charCodeAt(f);
        d[f * 2] = m >>> 8, d[f * 2 + 1] = m % 256;
      }
      return d;
    }, decompressFromUint8Array: function(c) {
      if (c == null) return u.decompress(c);
      for (var s = new Array(c.length / 2), d = 0, f = s.length; d < f; d++) s[d] = c[d * 2] * 256 + c[d * 2 + 1];
      var p = [];
      return s.forEach(function(m) {
        p.push(n(m));
      }), u.decompress(p.join(""));
    }, compressToEncodedURIComponent: function(c) {
      return c == null ? "" : u._compress(c, 6, function(s) {
        return l.charAt(s);
      });
    }, decompressFromEncodedURIComponent: function(c) {
      return c == null ? "" : c == "" ? null : (c = c.replace(/ /g, "+"), u._decompress(c.length, 32, function(s) {
        return i(l, c.charAt(s));
      }));
    }, compress: function(c) {
      return u._compress(c, 16, function(s) {
        return n(s);
      });
    }, _compress: function(c, s, d) {
      if (c == null) return "";
      var f, p, m = {}, b = {}, h = "", y = "", g = "", q = 2, C = 3, E = 2, _ = [], v = 0, w = 0, P;
      for (P = 0; P < c.length; P += 1) if (h = c.charAt(P), Object.prototype.hasOwnProperty.call(m, h) || (m[h] = C++, b[h] = !0), y = g + h, Object.prototype.hasOwnProperty.call(m, y)) g = y;
      else {
        if (Object.prototype.hasOwnProperty.call(b, g)) {
          if (g.charCodeAt(0) < 256) {
            for (f = 0; f < E; f++) v = v << 1, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++;
            for (p = g.charCodeAt(0), f = 0; f < 8; f++) v = v << 1 | p & 1, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++, p = p >> 1;
          } else {
            for (p = 1, f = 0; f < E; f++) v = v << 1 | p, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++, p = 0;
            for (p = g.charCodeAt(0), f = 0; f < 16; f++) v = v << 1 | p & 1, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++, p = p >> 1;
          }
          q--, q == 0 && (q = Math.pow(2, E), E++), delete b[g];
        } else for (p = m[g], f = 0; f < E; f++) v = v << 1 | p & 1, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++, p = p >> 1;
        q--, q == 0 && (q = Math.pow(2, E), E++), m[y] = C++, g = String(h);
      }
      if (g !== "") {
        if (Object.prototype.hasOwnProperty.call(b, g)) {
          if (g.charCodeAt(0) < 256) {
            for (f = 0; f < E; f++) v = v << 1, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++;
            for (p = g.charCodeAt(0), f = 0; f < 8; f++) v = v << 1 | p & 1, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++, p = p >> 1;
          } else {
            for (p = 1, f = 0; f < E; f++) v = v << 1 | p, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++, p = 0;
            for (p = g.charCodeAt(0), f = 0; f < 16; f++) v = v << 1 | p & 1, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++, p = p >> 1;
          }
          q--, q == 0 && (q = Math.pow(2, E), E++), delete b[g];
        } else for (p = m[g], f = 0; f < E; f++) v = v << 1 | p & 1, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++, p = p >> 1;
        q--, q == 0 && (q = Math.pow(2, E), E++);
      }
      for (p = 2, f = 0; f < E; f++) v = v << 1 | p & 1, w == s - 1 ? (w = 0, _.push(d(v)), v = 0) : w++, p = p >> 1;
      for (; ; ) if (v = v << 1, w == s - 1) {
        _.push(d(v));
        break;
      } else w++;
      return _.join("");
    }, decompress: function(c) {
      return c == null ? "" : c == "" ? null : u._decompress(c.length, 32768, function(s) {
        return c.charCodeAt(s);
      });
    }, _decompress: function(c, s, d) {
      var f = [], p = 4, m = 4, b = 3, h = "", y = [], g, q, C, E, _, v, w, P = { val: d(0), position: s, index: 1 };
      for (g = 0; g < 3; g += 1) f[g] = g;
      for (C = 0, _ = Math.pow(2, 2), v = 1; v != _; ) E = P.val & P.position, P.position >>= 1, P.position == 0 && (P.position = s, P.val = d(P.index++)), C |= (E > 0 ? 1 : 0) * v, v <<= 1;
      switch (C) {
        case 0:
          for (C = 0, _ = Math.pow(2, 8), v = 1; v != _; ) E = P.val & P.position, P.position >>= 1, P.position == 0 && (P.position = s, P.val = d(P.index++)), C |= (E > 0 ? 1 : 0) * v, v <<= 1;
          w = n(C);
          break;
        case 1:
          for (C = 0, _ = Math.pow(2, 16), v = 1; v != _; ) E = P.val & P.position, P.position >>= 1, P.position == 0 && (P.position = s, P.val = d(P.index++)), C |= (E > 0 ? 1 : 0) * v, v <<= 1;
          w = n(C);
          break;
        case 2:
          return "";
      }
      for (f[3] = w, q = w, y.push(w); ; ) {
        if (P.index > c) return "";
        for (C = 0, _ = Math.pow(2, b), v = 1; v != _; ) E = P.val & P.position, P.position >>= 1, P.position == 0 && (P.position = s, P.val = d(P.index++)), C |= (E > 0 ? 1 : 0) * v, v <<= 1;
        switch (w = C) {
          case 0:
            for (C = 0, _ = Math.pow(2, 8), v = 1; v != _; ) E = P.val & P.position, P.position >>= 1, P.position == 0 && (P.position = s, P.val = d(P.index++)), C |= (E > 0 ? 1 : 0) * v, v <<= 1;
            f[m++] = n(C), w = m - 1, p--;
            break;
          case 1:
            for (C = 0, _ = Math.pow(2, 16), v = 1; v != _; ) E = P.val & P.position, P.position >>= 1, P.position == 0 && (P.position = s, P.val = d(P.index++)), C |= (E > 0 ? 1 : 0) * v, v <<= 1;
            f[m++] = n(C), w = m - 1, p--;
            break;
          case 2:
            return y.join("");
        }
        if (p == 0 && (p = Math.pow(2, b), b++), f[w]) h = f[w];
        else if (w === m) h = q + q.charAt(0);
        else return null;
        y.push(h), f[m++] = q + h.charAt(0), p--, q = h, p == 0 && (p = Math.pow(2, b), b++);
      }
    } };
    return u;
  }();
  typeof define == "function" && define.amd ? define(function() {
    return r;
  }) : typeof t < "u" && t != null ? t.exports = r : typeof angular < "u" && angular != null && angular.module("LZString", []).factory("LZString", function() {
    return r;
  });
} }), Bp = Object.defineProperty, kP = Object.getOwnPropertyNames, N = (e, t) => Bp(e, "name", { value: t, configurable: !0 }), BP = (e, t) => function() {
  return t || (0, e[kP(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Ci = (e, t) => {
  for (var r in t) Bp(e, r, { get: t[r], enumerable: !0 });
}, DP = BP({ "(disabled):util"() {
} }), lt = {};
Ci(lt, { addChainableMethod: () => Ii, addLengthGuard: () => gn, addMethod: () => ji, addProperty: () => xi, checkError: () => Fe, compareByInspect: () => Kn, eql: () => ff, expectTypes: () => Gp, flag: () => J, getActual: () => Eo, getMessage: () => Oi, getName: () => qo, getOperator: () => Di, getOwnEnumerableProperties: () => Bi, getOwnEnumerablePropertySymbols: () => ki, getPathInfo: () => Ai, hasProperty: () => Co, inspect: () => re, isNaN: () => Yn, isNumeric: () => Pe, isProxyEnabled: () => yn, isRegExp: () => Jn, objDisplay: () => Vt, overwriteChainableMethod: () => Li, overwriteMethod: () => $i, overwriteProperty: () => Ni, proxify: () => Nr, test: () => qi, transferFlags: () => rt, type: () => me });
var Fe = {};
Ci(Fe, { compatibleConstructor: () => Up, compatibleInstance: () => Fp, compatibleMessage: () => Hp, getConstructorName: () => Vp, getMessage: () => zp });
function wo(e) {
  return e instanceof Error || Object.prototype.toString.call(e) === "[object Error]";
}
N(wo, "isErrorInstance");
function Dp(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
N(Dp, "isRegExp");
function Fp(e, t) {
  return wo(t) && e === t;
}
N(Fp, "compatibleInstance");
function Up(e, t) {
  return wo(t) ? e.constructor === t.constructor || e instanceof t.constructor : (typeof t == "object" || typeof t == "function") && t.prototype ? e.constructor === t || e instanceof t : !1;
}
N(Up, "compatibleConstructor");
function Hp(e, t) {
  let r = typeof e == "string" ? e : e.message;
  return Dp(t) ? t.test(r) : typeof t == "string" ? r.indexOf(t) !== -1 : !1;
}
N(Hp, "compatibleMessage");
function Vp(e) {
  let t = e;
  return wo(e) ? t = e.constructor.name : typeof e == "function" && (t = e.name, t === "" && (t = new e().name || t)), t;
}
N(Vp, "getConstructorName");
function zp(e) {
  let t = "";
  return e && e.message ? t = e.message : typeof e == "string" && (t = e), t;
}
N(zp, "getMessage");
function J(e, t, r) {
  var n = e.__flags || (e.__flags = /* @__PURE__ */ Object.create(null));
  if (arguments.length === 3) n[t] = r;
  else return n[t];
}
N(J, "flag");
function qi(e, t) {
  var r = J(e, "negate"), n = t[0];
  return r ? !n : n;
}
N(qi, "test");
function me(e) {
  if (typeof e > "u") return "undefined";
  if (e === null) return "null";
  let t = e[Symbol.toStringTag];
  return typeof t == "string" ? t : Object.prototype.toString.call(e).slice(8, -1);
}
N(me, "type");
var FP = "captureStackTrace" in Error, Tn, ae = (Tn = class extends Error {
  message;
  get name() {
    return "AssertionError";
  }
  get ok() {
    return !1;
  }
  constructor(e = "Unspecified AssertionError", t, r) {
    super(e), this.message = e, FP && Error.captureStackTrace(this, r || Tn);
    for (let n in t) n in this || (this[n] = t[n]);
  }
  toJSON(e) {
    return { ...this, name: this.name, message: this.message, ok: !1, stack: e !== !1 ? this.stack : void 0 };
  }
}, N(Tn, "AssertionError"), Tn);
function Gp(e, t) {
  var r = J(e, "message"), n = J(e, "ssfi");
  r = r ? r + ": " : "", e = J(e, "object"), t = t.map(function(a) {
    return a.toLowerCase();
  }), t.sort();
  var o = t.map(function(a, i) {
    var u = ~["a", "e", "i", "o", "u"].indexOf(a.charAt(0)) ? "an" : "a", c = t.length > 1 && i === t.length - 1 ? "or " : "";
    return c + u + " " + a;
  }).join(", "), l = me(e).toLowerCase();
  if (!t.some(function(a) {
    return l === a;
  })) throw new ae(r + "object tested must be " + o + ", but " + l + " given", void 0, n);
}
N(Gp, "expectTypes");
function Eo(e, t) {
  return t.length > 4 ? t[4] : e._obj;
}
N(Eo, "getActual");
var Su = { bold: ["1", "22"], dim: ["2", "22"], italic: ["3", "23"], underline: ["4", "24"], inverse: ["7", "27"], hidden: ["8", "28"], strike: ["9", "29"], black: ["30", "39"], red: ["31", "39"], green: ["32", "39"], yellow: ["33", "39"], blue: ["34", "39"], magenta: ["35", "39"], cyan: ["36", "39"], white: ["37", "39"], brightblack: ["30;1", "39"], brightred: ["31;1", "39"], brightgreen: ["32;1", "39"], brightyellow: ["33;1", "39"], brightblue: ["34;1", "39"], brightmagenta: ["35;1", "39"], brightcyan: ["36;1", "39"], brightwhite: ["37;1", "39"], grey: ["90", "39"] }, UP = { special: "cyan", number: "yellow", bigint: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", symbol: "green", date: "magenta", regexp: "red" }, _r = "…";
function Wp(e, t) {
  let r = Su[UP[t]] || Su[t] || "";
  return r ? `\x1B[${r[0]}m${String(e)}\x1B[${r[1]}m` : String(e);
}
N(Wp, "colorise");
function Kp({ showHidden: e = !1, depth: t = 2, colors: r = !1, customInspect: n = !0, showProxy: o = !1, maxArrayLength: l = 1 / 0, breakLength: a = 1 / 0, seen: i = [], truncate: u = 1 / 0, stylize: c = String } = {}, s) {
  let d = { showHidden: !!e, depth: Number(t), colors: !!r, customInspect: !!n, showProxy: !!o, maxArrayLength: Number(l), breakLength: Number(a), truncate: Number(u), seen: i, inspect: s, stylize: c };
  return d.colors && (d.stylize = Wp), d;
}
N(Kp, "normaliseOptions");
function Yp(e) {
  return e >= "\uD800" && e <= "\uDBFF";
}
N(Yp, "isHighSurrogate");
function wt(e, t, r = _r) {
  e = String(e);
  let n = r.length, o = e.length;
  if (n > t && o > n) return r;
  if (o > t && o > n) {
    let l = t - n;
    return l > 0 && Yp(e[l - 1]) && (l = l - 1), `${e.slice(0, l)}${r}`;
  }
  return e;
}
N(wt, "truncate");
function We(e, t, r, n = ", ") {
  r = r || t.inspect;
  let o = e.length;
  if (o === 0) return "";
  let l = t.truncate, a = "", i = "", u = "";
  for (let c = 0; c < o; c += 1) {
    let s = c + 1 === e.length, d = c + 2 === e.length;
    u = `${_r}(${e.length - c})`;
    let f = e[c];
    t.truncate = l - a.length - (s ? 0 : n.length);
    let p = i || r(f, t) + (s ? "" : n), m = a.length + p.length, b = m + u.length;
    if (s && m > l && a.length + u.length <= l || !s && !d && b > l || (i = s ? "" : r(e[c + 1], t) + (d ? "" : n), !s && d && b > l && m + i.length > l)) break;
    if (a += p, !s && !d && m + i.length >= l) {
      u = `${_r}(${e.length - c - 1})`;
      break;
    }
    u = "";
  }
  return `${a}${u}`;
}
N(We, "inspectList");
function Jp(e) {
  return e.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/) ? e : JSON.stringify(e).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
N(Jp, "quoteComplexKey");
function Rr([e, t], r) {
  return r.truncate -= 2, typeof e == "string" ? e = Jp(e) : typeof e != "number" && (e = `[${r.inspect(e, r)}]`), r.truncate -= e.length, t = r.inspect(t, r), `${e}: ${t}`;
}
N(Rr, "inspectProperty");
function Xp(e, t) {
  let r = Object.keys(e).slice(e.length);
  if (!e.length && !r.length) return "[]";
  t.truncate -= 4;
  let n = We(e, t);
  t.truncate -= n.length;
  let o = "";
  return r.length && (o = We(r.map((l) => [l, e[l]]), t, Rr)), `[ ${n}${o ? `, ${o}` : ""} ]`;
}
N(Xp, "inspectArray");
var HP = N((e) => typeof Buffer == "function" && e instanceof Buffer ? "Buffer" : e[Symbol.toStringTag] ? e[Symbol.toStringTag] : e.constructor.name, "getArrayName");
function ot(e, t) {
  let r = HP(e);
  t.truncate -= r.length + 4;
  let n = Object.keys(e).slice(e.length);
  if (!e.length && !n.length) return `${r}[]`;
  let o = "";
  for (let a = 0; a < e.length; a++) {
    let i = `${t.stylize(wt(e[a], t.truncate), "number")}${a === e.length - 1 ? "" : ", "}`;
    if (t.truncate -= i.length, e[a] !== e.length && t.truncate <= 3) {
      o += `${_r}(${e.length - e[a] + 1})`;
      break;
    }
    o += i;
  }
  let l = "";
  return n.length && (l = We(n.map((a) => [a, e[a]]), t, Rr)), `${r}[ ${o}${l ? `, ${l}` : ""} ]`;
}
N(ot, "inspectTypedArray");
function Qp(e, t) {
  let r = e.toJSON();
  if (r === null) return "Invalid Date";
  let n = r.split("T"), o = n[0];
  return t.stylize(`${o}T${wt(n[1], t.truncate - o.length - 1)}`, "date");
}
N(Qp, "inspectDate");
function al(e, t) {
  let r = e[Symbol.toStringTag] || "Function", n = e.name;
  return n ? t.stylize(`[${r} ${wt(n, t.truncate - 11)}]`, "special") : t.stylize(`[${r}]`, "special");
}
N(al, "inspectFunction");
function Zp([e, t], r) {
  return r.truncate -= 4, e = r.inspect(e, r), r.truncate -= e.length, t = r.inspect(t, r), `${e} => ${t}`;
}
N(Zp, "inspectMapEntry");
function ef(e) {
  let t = [];
  return e.forEach((r, n) => {
    t.push([n, r]);
  }), t;
}
N(ef, "mapToEntries");
function tf(e, t) {
  return e.size - 1 <= 0 ? "Map{}" : (t.truncate -= 7, `Map{ ${We(ef(e), t, Zp)} }`);
}
N(tf, "inspectMap");
var VP = Number.isNaN || ((e) => e !== e);
function ll(e, t) {
  return VP(e) ? t.stylize("NaN", "number") : e === 1 / 0 ? t.stylize("Infinity", "number") : e === -1 / 0 ? t.stylize("-Infinity", "number") : e === 0 ? t.stylize(1 / e === 1 / 0 ? "+0" : "-0", "number") : t.stylize(wt(String(e), t.truncate), "number");
}
N(ll, "inspectNumber");
function il(e, t) {
  let r = wt(e.toString(), t.truncate - 1);
  return r !== _r && (r += "n"), t.stylize(r, "bigint");
}
N(il, "inspectBigInt");
function rf(e, t) {
  let r = e.toString().split("/")[2], n = t.truncate - (2 + r.length), o = e.source;
  return t.stylize(`/${wt(o, n)}/${r}`, "regexp");
}
N(rf, "inspectRegExp");
function nf(e) {
  let t = [];
  return e.forEach((r) => {
    t.push(r);
  }), t;
}
N(nf, "arrayFromSet");
function of(e, t) {
  return e.size === 0 ? "Set{}" : (t.truncate -= 7, `Set{ ${We(nf(e), t)} }`);
}
N(of, "inspectSet");
var Mu = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g"), zP = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "'": "\\'", "\\": "\\\\" }, GP = 16;
function af(e) {
  return zP[e] || `\\u${`0000${e.charCodeAt(0).toString(GP)}`.slice(-4)}`;
}
N(af, "escape");
function sl(e, t) {
  return Mu.test(e) && (e = e.replace(Mu, af)), t.stylize(`'${wt(e, t.truncate - 2)}'`, "string");
}
N(sl, "inspectString");
function ul(e) {
  return "description" in Symbol.prototype ? e.description ? `Symbol(${e.description})` : "Symbol()" : e.toString();
}
N(ul, "inspectSymbol");
var lf = N(() => "Promise{…}", "getPromiseValue");
try {
  let { getPromiseDetails: e, kPending: t, kRejected: r } = process.binding("util");
  Array.isArray(e(Promise.resolve())) && (lf = N((n, o) => {
    let [l, a] = e(n);
    return l === t ? "Promise{<pending>}" : `Promise${l === r ? "!" : ""}{${o.inspect(a, o)}}`;
  }, "getPromiseValue"));
} catch {
}
var WP = lf;
function Vr(e, t) {
  let r = Object.getOwnPropertyNames(e), n = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : [];
  if (r.length === 0 && n.length === 0) return "{}";
  if (t.truncate -= 4, t.seen = t.seen || [], t.seen.includes(e)) return "[Circular]";
  t.seen.push(e);
  let o = We(r.map((i) => [i, e[i]]), t, Rr), l = We(n.map((i) => [i, e[i]]), t, Rr);
  t.seen.pop();
  let a = "";
  return o && l && (a = ", "), `{ ${o}${a}${l} }`;
}
N(Vr, "inspectObject");
var Ma = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : !1;
function sf(e, t) {
  let r = "";
  return Ma && Ma in e && (r = e[Ma]), r = r || e.constructor.name, (!r || r === "_class") && (r = "<Anonymous Class>"), t.truncate -= r.length, `${r}${Vr(e, t)}`;
}
N(sf, "inspectClass");
function uf(e, t) {
  return e.length === 0 ? "Arguments[]" : (t.truncate -= 13, `Arguments[ ${We(e, t)} ]`);
}
N(uf, "inspectArguments");
var KP = ["stack", "line", "column", "name", "message", "fileName", "lineNumber", "columnNumber", "number", "description", "cause"];
function cf(e, t) {
  let r = Object.getOwnPropertyNames(e).filter((a) => KP.indexOf(a) === -1), n = e.name;
  t.truncate -= n.length;
  let o = "";
  if (typeof e.message == "string" ? o = wt(e.message, t.truncate) : r.unshift("message"), o = o ? `: ${o}` : "", t.truncate -= o.length + 5, t.seen = t.seen || [], t.seen.includes(e)) return "[Circular]";
  t.seen.push(e);
  let l = We(r.map((a) => [a, e[a]]), t, Rr);
  return `${n}${o}${l ? ` { ${l} }` : ""}`;
}
N(cf, "inspectObject");
function df([e, t], r) {
  return r.truncate -= 3, t ? `${r.stylize(String(e), "yellow")}=${r.stylize(`"${t}"`, "string")}` : `${r.stylize(String(e), "yellow")}`;
}
N(df, "inspectAttribute");
function zn(e, t) {
  return We(e, t, Pi, `
`);
}
N(zn, "inspectHTMLCollection");
function Pi(e, t) {
  let r = e.getAttributeNames(), n = e.tagName.toLowerCase(), o = t.stylize(`<${n}`, "special"), l = t.stylize(">", "special"), a = t.stylize(`</${n}>`, "special");
  t.truncate -= n.length * 2 + 5;
  let i = "";
  r.length > 0 && (i += " ", i += We(r.map((s) => [s, e.getAttribute(s)]), t, df, " ")), t.truncate -= i.length;
  let u = t.truncate, c = zn(e.children, t);
  return c && c.length > u && (c = `${_r}(${e.children.length})`), `${o}${i}${l}${c}${a}`;
}
N(Pi, "inspectHTML");
var YP = typeof Symbol == "function" && typeof Symbol.for == "function", Aa = YP ? Symbol.for("chai/inspect") : "@@chai/inspect", sr = !1;
try {
  let e = DP();
  sr = e.inspect ? e.inspect.custom : !1;
} catch {
  sr = !1;
}
var Au = /* @__PURE__ */ new WeakMap(), xu = {}, ju = { undefined: (e, t) => t.stylize("undefined", "undefined"), null: (e, t) => t.stylize("null", "null"), boolean: (e, t) => t.stylize(String(e), "boolean"), Boolean: (e, t) => t.stylize(String(e), "boolean"), number: ll, Number: ll, bigint: il, BigInt: il, string: sl, String: sl, function: al, Function: al, symbol: ul, Symbol: ul, Array: Xp, Date: Qp, Map: tf, Set: of, RegExp: rf, Promise: WP, WeakSet: (e, t) => t.stylize("WeakSet{…}", "special"), WeakMap: (e, t) => t.stylize("WeakMap{…}", "special"), Arguments: uf, Int8Array: ot, Uint8Array: ot, Uint8ClampedArray: ot, Int16Array: ot, Uint16Array: ot, Int32Array: ot, Uint32Array: ot, Float32Array: ot, Float64Array: ot, Generator: () => "", DataView: () => "", ArrayBuffer: () => "", Error: cf, HTMLCollection: zn, NodeList: zn }, JP = N((e, t, r) => Aa in e && typeof e[Aa] == "function" ? e[Aa](t) : sr && sr in e && typeof e[sr] == "function" ? e[sr](t.depth, t) : "inspect" in e && typeof e.inspect == "function" ? e.inspect(t.depth, t) : "constructor" in e && Au.has(e.constructor) ? Au.get(e.constructor)(e, t) : xu[r] ? xu[r](e, t) : "", "inspectCustom"), XP = Object.prototype.toString;
function Gn(e, t = {}) {
  let r = Kp(t, Gn), { customInspect: n } = r, o = e === null ? "null" : typeof e;
  if (o === "object" && (o = XP.call(e).slice(8, -1)), o in ju) return ju[o](e, r);
  if (n && e) {
    let a = JP(e, r, o);
    if (a) return typeof a == "string" ? a : Gn(a, r);
  }
  let l = e ? Object.getPrototypeOf(e) : !1;
  return l === Object.prototype || l === null ? Vr(e, r) : e && typeof HTMLElement == "function" && e instanceof HTMLElement ? Pi(e, r) : "constructor" in e ? e.constructor !== Object ? sf(e, r) : Vr(e, r) : e === Object(e) ? Vr(e, r) : r.stylize(String(e), o);
}
N(Gn, "inspect");
var Be = { includeStack: !1, showDiff: !0, truncateThreshold: 40, useProxy: !0, proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"], deepEqual: null };
function re(e, t, r, n) {
  var o = { colors: n, depth: typeof r > "u" ? 2 : r, showHidden: t, truncate: Be.truncateThreshold ? Be.truncateThreshold : 1 / 0 };
  return Gn(e, o);
}
N(re, "inspect");
function Vt(e) {
  var t = re(e), r = Object.prototype.toString.call(e);
  if (Be.truncateThreshold && t.length >= Be.truncateThreshold) {
    if (r === "[object Function]") return !e.name || e.name === "" ? "[Function]" : "[Function: " + e.name + "]";
    if (r === "[object Array]") return "[ Array(" + e.length + ") ]";
    if (r === "[object Object]") {
      var n = Object.keys(e), o = n.length > 2 ? n.splice(0, 2).join(", ") + ", ..." : n.join(", ");
      return "{ Object (" + o + ") }";
    } else return t;
  } else return t;
}
N(Vt, "objDisplay");
function Oi(e, t) {
  var r = J(e, "negate"), n = J(e, "object"), o = t[3], l = Eo(e, t), a = r ? t[2] : t[1], i = J(e, "message");
  return typeof a == "function" && (a = a()), a = a || "", a = a.replace(/#\{this\}/g, function() {
    return Vt(n);
  }).replace(/#\{act\}/g, function() {
    return Vt(l);
  }).replace(/#\{exp\}/g, function() {
    return Vt(o);
  }), i ? i + ": " + a : a;
}
N(Oi, "getMessage");
function rt(e, t, r) {
  var n = e.__flags || (e.__flags = /* @__PURE__ */ Object.create(null));
  t.__flags || (t.__flags = /* @__PURE__ */ Object.create(null)), r = arguments.length === 3 ? r : !0;
  for (var o in n) (r || o !== "object" && o !== "ssfi" && o !== "lockSsfi" && o != "message") && (t.__flags[o] = n[o]);
}
N(rt, "transferFlags");
function cl(e) {
  if (typeof e > "u") return "undefined";
  if (e === null) return "null";
  let t = e[Symbol.toStringTag];
  return typeof t == "string" ? t : Object.prototype.toString.call(e).slice(8, -1);
}
N(cl, "type");
function Ti() {
  this._key = "chai/deep-eql__" + Math.random() + Date.now();
}
N(Ti, "FakeMap");
Ti.prototype = { get: N(function(e) {
  return e[this._key];
}, "get"), set: N(function(e, t) {
  Object.isExtensible(e) && Object.defineProperty(e, this._key, { value: t, configurable: !0 });
}, "set") };
var pf = typeof WeakMap == "function" ? WeakMap : Ti;
function dl(e, t, r) {
  if (!r || Kt(e) || Kt(t)) return null;
  var n = r.get(e);
  if (n) {
    var o = n.get(t);
    if (typeof o == "boolean") return o;
  }
  return null;
}
N(dl, "memoizeCompare");
function Dr(e, t, r, n) {
  if (!(!r || Kt(e) || Kt(t))) {
    var o = r.get(e);
    o ? o.set(t, n) : (o = new pf(), o.set(t, n), r.set(e, o));
  }
}
N(Dr, "memoizeSet");
var ff = bn;
function bn(e, t, r) {
  if (r && r.comparator) return pl(e, t, r);
  var n = Si(e, t);
  return n !== null ? n : pl(e, t, r);
}
N(bn, "deepEqual");
function Si(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t ? !0 : Kt(e) || Kt(t) ? !1 : null;
}
N(Si, "simpleEqual");
function pl(e, t, r) {
  r = r || {}, r.memoize = r.memoize === !1 ? !1 : r.memoize || new pf();
  var n = r && r.comparator, o = dl(e, t, r.memoize);
  if (o !== null) return o;
  var l = dl(t, e, r.memoize);
  if (l !== null) return l;
  if (n) {
    var a = n(e, t);
    if (a === !1 || a === !0) return Dr(e, t, r.memoize, a), a;
    var i = Si(e, t);
    if (i !== null) return i;
  }
  var u = cl(e);
  if (u !== cl(t)) return Dr(e, t, r.memoize, !1), !1;
  Dr(e, t, r.memoize, !0);
  var c = mf(e, t, u, r);
  return Dr(e, t, r.memoize, c), c;
}
N(pl, "extensiveDeepEqual");
function mf(e, t, r, n) {
  switch (r) {
    case "String":
    case "Number":
    case "Boolean":
    case "Date":
      return bn(e.valueOf(), t.valueOf());
    case "Promise":
    case "Symbol":
    case "function":
    case "WeakMap":
    case "WeakSet":
      return e === t;
    case "Error":
      return Mi(e, t, ["name", "message", "code"], n);
    case "Arguments":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "Array":
      return jt(e, t, n);
    case "RegExp":
      return hf(e, t);
    case "Generator":
      return bf(e, t, n);
    case "DataView":
      return jt(new Uint8Array(e.buffer), new Uint8Array(t.buffer), n);
    case "ArrayBuffer":
      return jt(new Uint8Array(e), new Uint8Array(t), n);
    case "Set":
      return fl(e, t, n);
    case "Map":
      return fl(e, t, n);
    case "Temporal.PlainDate":
    case "Temporal.PlainTime":
    case "Temporal.PlainDateTime":
    case "Temporal.Instant":
    case "Temporal.ZonedDateTime":
    case "Temporal.PlainYearMonth":
    case "Temporal.PlainMonthDay":
      return e.equals(t);
    case "Temporal.Duration":
      return e.total("nanoseconds") === t.total("nanoseconds");
    case "Temporal.TimeZone":
    case "Temporal.Calendar":
      return e.toString() === t.toString();
    default:
      return gf(e, t, n);
  }
}
N(mf, "extensiveDeepEqualByType");
function hf(e, t) {
  return e.toString() === t.toString();
}
N(hf, "regexpEqual");
function fl(e, t, r) {
  try {
    if (e.size !== t.size) return !1;
    if (e.size === 0) return !0;
  } catch {
    return !1;
  }
  var n = [], o = [];
  return e.forEach(N(function(l, a) {
    n.push([l, a]);
  }, "gatherEntries")), t.forEach(N(function(l, a) {
    o.push([l, a]);
  }, "gatherEntries")), jt(n.sort(), o.sort(), r);
}
N(fl, "entriesEqual");
function jt(e, t, r) {
  var n = e.length;
  if (n !== t.length) return !1;
  if (n === 0) return !0;
  for (var o = -1; ++o < n; ) if (bn(e[o], t[o], r) === !1) return !1;
  return !0;
}
N(jt, "iterableEqual");
function bf(e, t, r) {
  return jt(Wn(e), Wn(t), r);
}
N(bf, "generatorEqual");
function yf(e) {
  return typeof Symbol < "u" && typeof e == "object" && typeof Symbol.iterator < "u" && typeof e[Symbol.iterator] == "function";
}
N(yf, "hasIteratorFunction");
function ml(e) {
  if (yf(e)) try {
    return Wn(e[Symbol.iterator]());
  } catch {
    return [];
  }
  return [];
}
N(ml, "getIteratorEntries");
function Wn(e) {
  for (var t = e.next(), r = [t.value]; t.done === !1; ) t = e.next(), r.push(t.value);
  return r;
}
N(Wn, "getGeneratorEntries");
function hl(e) {
  var t = [];
  for (var r in e) t.push(r);
  return t;
}
N(hl, "getEnumerableKeys");
function bl(e) {
  for (var t = [], r = Object.getOwnPropertySymbols(e), n = 0; n < r.length; n += 1) {
    var o = r[n];
    Object.getOwnPropertyDescriptor(e, o).enumerable && t.push(o);
  }
  return t;
}
N(bl, "getEnumerableSymbols");
function Mi(e, t, r, n) {
  var o = r.length;
  if (o === 0) return !0;
  for (var l = 0; l < o; l += 1) if (bn(e[r[l]], t[r[l]], n) === !1) return !1;
  return !0;
}
N(Mi, "keysEqual");
function gf(e, t, r) {
  var n = hl(e), o = hl(t), l = bl(e), a = bl(t);
  if (n = n.concat(l), o = o.concat(a), n.length && n.length === o.length) return jt(yl(n).sort(), yl(o).sort()) === !1 ? !1 : Mi(e, t, n, r);
  var i = ml(e), u = ml(t);
  return i.length && i.length === u.length ? (i.sort(), u.sort(), jt(i, u, r)) : n.length === 0 && i.length === 0 && o.length === 0 && u.length === 0;
}
N(gf, "objectEqual");
function Kt(e) {
  return e === null || typeof e != "object";
}
N(Kt, "isPrimitive");
function yl(e) {
  return e.map(N(function(t) {
    return typeof t == "symbol" ? t.toString() : t;
  }, "mapSymbol"));
}
N(yl, "mapSymbols");
function Co(e, t) {
  return typeof e > "u" || e === null ? !1 : t in Object(e);
}
N(Co, "hasProperty");
function vf(e) {
  return e.replace(/([^\\])\[/g, "$1.[").match(/(\\\.|[^.]+?)+/g).map((t) => {
    if (t === "constructor" || t === "__proto__" || t === "prototype") return {};
    let r = /^\[(\d+)\]$/.exec(t), n = null;
    return r ? n = { i: parseFloat(r[1]) } : n = { p: t.replace(/\\([.[\]])/g, "$1") }, n;
  });
}
N(vf, "parsePath");
function gl(e, t, r) {
  let n = e, o = null;
  r = typeof r > "u" ? t.length : r;
  for (let l = 0; l < r; l++) {
    let a = t[l];
    n && (typeof a.p > "u" ? n = n[a.i] : n = n[a.p], l === r - 1 && (o = n));
  }
  return o;
}
N(gl, "internalGetPathValue");
function Ai(e, t) {
  let r = vf(t), n = r[r.length - 1], o = { parent: r.length > 1 ? gl(e, r, r.length - 1) : e, name: n.p || n.i, value: gl(e, r) };
  return o.exists = Co(o.parent, o.name), o;
}
N(Ai, "getPathInfo");
function T(e, t, r, n) {
  return J(this, "ssfi", r || T), J(this, "lockSsfi", n), J(this, "object", e), J(this, "message", t), J(this, "eql", Be.deepEqual || ff), Nr(this);
}
N(T, "Assertion");
Object.defineProperty(T, "includeStack", { get: function() {
  return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."), Be.includeStack;
}, set: function(e) {
  console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."), Be.includeStack = e;
} });
Object.defineProperty(T, "showDiff", { get: function() {
  return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."), Be.showDiff;
}, set: function(e) {
  console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."), Be.showDiff = e;
} });
T.addProperty = function(e, t) {
  xi(this.prototype, e, t);
};
T.addMethod = function(e, t) {
  ji(this.prototype, e, t);
};
T.addChainableMethod = function(e, t, r) {
  Ii(this.prototype, e, t, r);
};
T.overwriteProperty = function(e, t) {
  Ni(this.prototype, e, t);
};
T.overwriteMethod = function(e, t) {
  $i(this.prototype, e, t);
};
T.overwriteChainableMethod = function(e, t, r) {
  Li(this.prototype, e, t, r);
};
T.prototype.assert = function(e, t, r, n, o, l) {
  var a = qi(this, arguments);
  if (l !== !1 && (l = !0), n === void 0 && o === void 0 && (l = !1), Be.showDiff !== !0 && (l = !1), !a) {
    t = Oi(this, arguments);
    var i = Eo(this, arguments), u = { actual: i, expected: n, showDiff: l }, c = Di(this, arguments);
    throw c && (u.operator = c), new ae(t, u, Be.includeStack ? this.assert : J(this, "ssfi"));
  }
};
Object.defineProperty(T.prototype, "_obj", { get: function() {
  return J(this, "object");
}, set: function(e) {
  J(this, "object", e);
} });
function yn() {
  return Be.useProxy && typeof Proxy < "u" && typeof Reflect < "u";
}
N(yn, "isProxyEnabled");
function xi(e, t, r) {
  r = r === void 0 ? function() {
  } : r, Object.defineProperty(e, t, { get: N(function n() {
    !yn() && !J(this, "lockSsfi") && J(this, "ssfi", n);
    var o = r.call(this);
    if (o !== void 0) return o;
    var l = new T();
    return rt(this, l), l;
  }, "propertyGetter"), configurable: !0 });
}
N(xi, "addProperty");
var QP = Object.getOwnPropertyDescriptor(function() {
}, "length");
function gn(e, t, r) {
  return QP.configurable && Object.defineProperty(e, "length", { get: function() {
    throw Error(r ? "Invalid Chai property: " + t + '.length. Due to a compatibility issue, "length" cannot directly follow "' + t + '". Use "' + t + '.lengthOf" instead.' : "Invalid Chai property: " + t + '.length. See docs for proper usage of "' + t + '".');
  } }), e;
}
N(gn, "addLengthGuard");
function _f(e) {
  var t = Object.getOwnPropertyNames(e);
  function r(o) {
    t.indexOf(o) === -1 && t.push(o);
  }
  N(r, "addProperty");
  for (var n = Object.getPrototypeOf(e); n !== null; ) Object.getOwnPropertyNames(n).forEach(r), n = Object.getPrototypeOf(n);
  return t;
}
N(_f, "getProperties");
var Nu = ["__flags", "__methods", "_obj", "assert"];
function Nr(e, t) {
  return yn() ? new Proxy(e, { get: N(function r(n, o) {
    if (typeof o == "string" && Be.proxyExcludedKeys.indexOf(o) === -1 && !Reflect.has(n, o)) {
      if (t) throw Error("Invalid Chai property: " + t + "." + o + '. See docs for proper usage of "' + t + '".');
      var l = null, a = 4;
      throw _f(n).forEach(function(i) {
        if (!Object.prototype.hasOwnProperty(i) && Nu.indexOf(i) === -1) {
          var u = Rf(o, i, a);
          u < a && (l = i, a = u);
        }
      }), Error(l !== null ? "Invalid Chai property: " + o + '. Did you mean "' + l + '"?' : "Invalid Chai property: " + o);
    }
    return Nu.indexOf(o) === -1 && !J(n, "lockSsfi") && J(n, "ssfi", r), Reflect.get(n, o);
  }, "proxyGetter") }) : e;
}
N(Nr, "proxify");
function Rf(e, t, r) {
  if (Math.abs(e.length - t.length) >= r) return r;
  var n = [];
  for (let l = 0; l <= e.length; l++) n[l] = Array(t.length + 1).fill(0), n[l][0] = l;
  for (let l = 0; l < t.length; l++) n[0][l] = l;
  for (let l = 1; l <= e.length; l++) {
    var o = e.charCodeAt(l - 1);
    for (let a = 1; a <= t.length; a++) {
      if (Math.abs(l - a) >= r) {
        n[l][a] = r;
        continue;
      }
      n[l][a] = Math.min(n[l - 1][a] + 1, n[l][a - 1] + 1, n[l - 1][a - 1] + (o === t.charCodeAt(a - 1) ? 0 : 1));
    }
  }
  return n[e.length][t.length];
}
N(Rf, "stringDistanceCapped");
function ji(e, t, r) {
  var n = N(function() {
    J(this, "lockSsfi") || J(this, "ssfi", n);
    var o = r.apply(this, arguments);
    if (o !== void 0) return o;
    var l = new T();
    return rt(this, l), l;
  }, "methodWrapper");
  gn(n, t, !1), e[t] = Nr(n, t);
}
N(ji, "addMethod");
function Ni(e, t, r) {
  var n = Object.getOwnPropertyDescriptor(e, t), o = N(function() {
  }, "_super");
  n && typeof n.get == "function" && (o = n.get), Object.defineProperty(e, t, { get: N(function l() {
    !yn() && !J(this, "lockSsfi") && J(this, "ssfi", l);
    var a = J(this, "lockSsfi");
    J(this, "lockSsfi", !0);
    var i = r(o).call(this);
    if (J(this, "lockSsfi", a), i !== void 0) return i;
    var u = new T();
    return rt(this, u), u;
  }, "overwritingPropertyGetter"), configurable: !0 });
}
N(Ni, "overwriteProperty");
function $i(e, t, r) {
  var n = e[t], o = N(function() {
    throw new Error(t + " is not a function");
  }, "_super");
  n && typeof n == "function" && (o = n);
  var l = N(function() {
    J(this, "lockSsfi") || J(this, "ssfi", l);
    var a = J(this, "lockSsfi");
    J(this, "lockSsfi", !0);
    var i = r(o).apply(this, arguments);
    if (J(this, "lockSsfi", a), i !== void 0) return i;
    var u = new T();
    return rt(this, u), u;
  }, "overwritingMethodWrapper");
  gn(l, t, !1), e[t] = Nr(l, t);
}
N($i, "overwriteMethod");
var ZP = typeof Object.setPrototypeOf == "function", $u = N(function() {
}, "testFn"), e1 = Object.getOwnPropertyNames($u).filter(function(e) {
  var t = Object.getOwnPropertyDescriptor($u, e);
  return typeof t != "object" ? !0 : !t.configurable;
}), t1 = Function.prototype.call, r1 = Function.prototype.apply;
function Ii(e, t, r, n) {
  typeof n != "function" && (n = N(function() {
  }, "chainingBehavior"));
  var o = { method: r, chainingBehavior: n };
  e.__methods || (e.__methods = {}), e.__methods[t] = o, Object.defineProperty(e, t, { get: N(function() {
    o.chainingBehavior.call(this);
    var l = N(function() {
      J(this, "lockSsfi") || J(this, "ssfi", l);
      var u = o.method.apply(this, arguments);
      if (u !== void 0) return u;
      var c = new T();
      return rt(this, c), c;
    }, "chainableMethodWrapper");
    if (gn(l, t, !0), ZP) {
      var a = Object.create(this);
      a.call = t1, a.apply = r1, Object.setPrototypeOf(l, a);
    } else {
      var i = Object.getOwnPropertyNames(e);
      i.forEach(function(u) {
        if (e1.indexOf(u) === -1) {
          var c = Object.getOwnPropertyDescriptor(e, u);
          Object.defineProperty(l, u, c);
        }
      });
    }
    return rt(this, l), Nr(l);
  }, "chainableMethodGetter"), configurable: !0 });
}
N(Ii, "addChainableMethod");
function Li(e, t, r, n) {
  var o = e.__methods[t], l = o.chainingBehavior;
  o.chainingBehavior = N(function() {
    var i = n(l).call(this);
    if (i !== void 0) return i;
    var u = new T();
    return rt(this, u), u;
  }, "overwritingChainableMethodGetter");
  var a = o.method;
  o.method = N(function() {
    var i = r(a).apply(this, arguments);
    if (i !== void 0) return i;
    var u = new T();
    return rt(this, u), u;
  }, "overwritingChainableMethodWrapper");
}
N(Li, "overwriteChainableMethod");
function Kn(e, t) {
  return re(e) < re(t) ? -1 : 1;
}
N(Kn, "compareByInspect");
function ki(e) {
  return typeof Object.getOwnPropertySymbols != "function" ? [] : Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.getOwnPropertyDescriptor(e, t).enumerable;
  });
}
N(ki, "getOwnEnumerablePropertySymbols");
function Bi(e) {
  return Object.keys(e).concat(ki(e));
}
N(Bi, "getOwnEnumerableProperties");
var Yn = Number.isNaN;
function wf(e) {
  var t = me(e), r = ["Array", "Object", "Function"];
  return r.indexOf(t) !== -1;
}
N(wf, "isObjectType");
function Di(e, t) {
  var r = J(e, "operator"), n = J(e, "negate"), o = t[3], l = n ? t[2] : t[1];
  if (r) return r;
  if (typeof l == "function" && (l = l()), l = l || "", !!l && !/\shave\s/.test(l)) {
    var a = wf(o);
    return /\snot\s/.test(l) ? a ? "notDeepStrictEqual" : "notStrictEqual" : a ? "deepStrictEqual" : "strictEqual";
  }
}
N(Di, "getOperator");
function qo(e) {
  return e.name;
}
N(qo, "getName");
function Jn(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
N(Jn, "isRegExp");
function Pe(e) {
  return ["Number", "BigInt"].includes(me(e));
}
N(Pe, "isNumeric");
var { flag: M } = lt;
["to", "be", "been", "is", "and", "has", "have", "with", "that", "which", "at", "of", "same", "but", "does", "still", "also"].forEach(function(e) {
  T.addProperty(e);
});
T.addProperty("not", function() {
  M(this, "negate", !0);
});
T.addProperty("deep", function() {
  M(this, "deep", !0);
});
T.addProperty("nested", function() {
  M(this, "nested", !0);
});
T.addProperty("own", function() {
  M(this, "own", !0);
});
T.addProperty("ordered", function() {
  M(this, "ordered", !0);
});
T.addProperty("any", function() {
  M(this, "any", !0), M(this, "all", !1);
});
T.addProperty("all", function() {
  M(this, "all", !0), M(this, "any", !1);
});
var Iu = { function: ["function", "asyncfunction", "generatorfunction", "asyncgeneratorfunction"], asyncfunction: ["asyncfunction", "asyncgeneratorfunction"], generatorfunction: ["generatorfunction", "asyncgeneratorfunction"], asyncgeneratorfunction: ["asyncgeneratorfunction"] };
function Fi(e, t) {
  t && M(this, "message", t), e = e.toLowerCase();
  var r = M(this, "object"), n = ~["a", "e", "i", "o", "u"].indexOf(e.charAt(0)) ? "an " : "a ";
  let o = me(r).toLowerCase();
  Iu.function.includes(e) ? this.assert(Iu[e].includes(o), "expected #{this} to be " + n + e, "expected #{this} not to be " + n + e) : this.assert(e === o, "expected #{this} to be " + n + e, "expected #{this} not to be " + n + e);
}
N(Fi, "an");
T.addChainableMethod("an", Fi);
T.addChainableMethod("a", Fi);
function Ef(e, t) {
  return Yn(e) && Yn(t) || e === t;
}
N(Ef, "SameValueZero");
function vn() {
  M(this, "contains", !0);
}
N(vn, "includeChainingBehavior");
function _n(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = me(r).toLowerCase(), o = M(this, "message"), l = M(this, "negate"), a = M(this, "ssfi"), i = M(this, "deep"), u = i ? "deep " : "", c = i ? M(this, "eql") : Ef;
  o = o ? o + ": " : "";
  var s = !1;
  switch (n) {
    case "string":
      s = r.indexOf(e) !== -1;
      break;
    case "weakset":
      if (i) throw new ae(o + "unable to use .deep.include with WeakSet", void 0, a);
      s = r.has(e);
      break;
    case "map":
      r.forEach(function(m) {
        s = s || c(m, e);
      });
      break;
    case "set":
      i ? r.forEach(function(m) {
        s = s || c(m, e);
      }) : s = r.has(e);
      break;
    case "array":
      i ? s = r.some(function(m) {
        return c(m, e);
      }) : s = r.indexOf(e) !== -1;
      break;
    default:
      if (e !== Object(e)) throw new ae(o + "the given combination of arguments (" + n + " and " + me(e).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + me(e).toLowerCase(), void 0, a);
      var d = Object.keys(e), f = null, p = 0;
      if (d.forEach(function(m) {
        var b = new T(r);
        if (rt(this, b, !0), M(b, "lockSsfi", !0), !l || d.length === 1) {
          b.property(m, e[m]);
          return;
        }
        try {
          b.property(m, e[m]);
        } catch (h) {
          if (!Fe.compatibleConstructor(h, ae)) throw h;
          f === null && (f = h), p++;
        }
      }, this), l && d.length > 1 && p === d.length) throw f;
      return;
  }
  this.assert(s, "expected #{this} to " + u + "include " + re(e), "expected #{this} to not " + u + "include " + re(e));
}
N(_n, "include");
T.addChainableMethod("include", _n, vn);
T.addChainableMethod("contain", _n, vn);
T.addChainableMethod("contains", _n, vn);
T.addChainableMethod("includes", _n, vn);
T.addProperty("ok", function() {
  this.assert(M(this, "object"), "expected #{this} to be truthy", "expected #{this} to be falsy");
});
T.addProperty("true", function() {
  this.assert(M(this, "object") === !0, "expected #{this} to be true", "expected #{this} to be false", !M(this, "negate"));
});
T.addProperty("numeric", function() {
  let e = M(this, "object");
  this.assert(["Number", "BigInt"].includes(me(e)), "expected #{this} to be numeric", "expected #{this} to not be numeric", !M(this, "negate"));
});
T.addProperty("callable", function() {
  let e = M(this, "object"), t = M(this, "ssfi"), r = M(this, "message"), n = r ? `${r}: ` : "", o = M(this, "negate"), l = o ? `${n}expected ${re(e)} not to be a callable function` : `${n}expected ${re(e)} to be a callable function`, a = ["Function", "AsyncFunction", "GeneratorFunction", "AsyncGeneratorFunction"].includes(me(e));
  if (a && o || !a && !o) throw new ae(l, void 0, t);
});
T.addProperty("false", function() {
  this.assert(M(this, "object") === !1, "expected #{this} to be false", "expected #{this} to be true", !!M(this, "negate"));
});
T.addProperty("null", function() {
  this.assert(M(this, "object") === null, "expected #{this} to be null", "expected #{this} not to be null");
});
T.addProperty("undefined", function() {
  this.assert(M(this, "object") === void 0, "expected #{this} to be undefined", "expected #{this} not to be undefined");
});
T.addProperty("NaN", function() {
  this.assert(Yn(M(this, "object")), "expected #{this} to be NaN", "expected #{this} not to be NaN");
});
function Ui() {
  var e = M(this, "object");
  this.assert(e != null, "expected #{this} to exist", "expected #{this} to not exist");
}
N(Ui, "assertExist");
T.addProperty("exist", Ui);
T.addProperty("exists", Ui);
T.addProperty("empty", function() {
  var e = M(this, "object"), t = M(this, "ssfi"), r = M(this, "message"), n;
  switch (r = r ? r + ": " : "", me(e).toLowerCase()) {
    case "array":
    case "string":
      n = e.length;
      break;
    case "map":
    case "set":
      n = e.size;
      break;
    case "weakmap":
    case "weakset":
      throw new ae(r + ".empty was passed a weak collection", void 0, t);
    case "function":
      var o = r + ".empty was passed a function " + qo(e);
      throw new ae(o.trim(), void 0, t);
    default:
      if (e !== Object(e)) throw new ae(r + ".empty was passed non-string primitive " + re(e), void 0, t);
      n = Object.keys(e).length;
  }
  this.assert(n === 0, "expected #{this} to be empty", "expected #{this} not to be empty");
});
function Hi() {
  var e = M(this, "object"), t = me(e);
  this.assert(t === "Arguments", "expected #{this} to be arguments but got " + t, "expected #{this} to not be arguments");
}
N(Hi, "checkArguments");
T.addProperty("arguments", Hi);
T.addProperty("Arguments", Hi);
function Po(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object");
  if (M(this, "deep")) {
    var n = M(this, "lockSsfi");
    M(this, "lockSsfi", !0), this.eql(e), M(this, "lockSsfi", n);
  } else this.assert(e === r, "expected #{this} to equal #{exp}", "expected #{this} to not equal #{exp}", e, this._obj, !0);
}
N(Po, "assertEqual");
T.addMethod("equal", Po);
T.addMethod("equals", Po);
T.addMethod("eq", Po);
function Vi(e, t) {
  t && M(this, "message", t);
  var r = M(this, "eql");
  this.assert(r(e, M(this, "object")), "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", e, this._obj, !0);
}
N(Vi, "assertEql");
T.addMethod("eql", Vi);
T.addMethod("eqls", Vi);
function Oo(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = M(this, "doLength"), o = M(this, "message"), l = o ? o + ": " : "", a = M(this, "ssfi"), i = me(r).toLowerCase(), u = me(e).toLowerCase();
  if (n && i !== "map" && i !== "set" && new T(r, o, a, !0).to.have.property("length"), !n && i === "date" && u !== "date") throw new ae(l + "the argument to above must be a date", void 0, a);
  if (!Pe(e) && (n || Pe(r))) throw new ae(l + "the argument to above must be a number", void 0, a);
  if (!n && i !== "date" && !Pe(r)) {
    var c = i === "string" ? "'" + r + "'" : r;
    throw new ae(l + "expected " + c + " to be a number or a date", void 0, a);
  }
  if (n) {
    var s = "length", d;
    i === "map" || i === "set" ? (s = "size", d = r.size) : d = r.length, this.assert(d > e, "expected #{this} to have a " + s + " above #{exp} but got #{act}", "expected #{this} to not have a " + s + " above #{exp}", e, d);
  } else this.assert(r > e, "expected #{this} to be above #{exp}", "expected #{this} to be at most #{exp}", e);
}
N(Oo, "assertAbove");
T.addMethod("above", Oo);
T.addMethod("gt", Oo);
T.addMethod("greaterThan", Oo);
function To(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = M(this, "doLength"), o = M(this, "message"), l = o ? o + ": " : "", a = M(this, "ssfi"), i = me(r).toLowerCase(), u = me(e).toLowerCase(), c, s = !0;
  if (n && i !== "map" && i !== "set" && new T(r, o, a, !0).to.have.property("length"), !n && i === "date" && u !== "date") c = l + "the argument to least must be a date";
  else if (!Pe(e) && (n || Pe(r))) c = l + "the argument to least must be a number";
  else if (!n && i !== "date" && !Pe(r)) {
    var d = i === "string" ? "'" + r + "'" : r;
    c = l + "expected " + d + " to be a number or a date";
  } else s = !1;
  if (s) throw new ae(c, void 0, a);
  if (n) {
    var f = "length", p;
    i === "map" || i === "set" ? (f = "size", p = r.size) : p = r.length, this.assert(p >= e, "expected #{this} to have a " + f + " at least #{exp} but got #{act}", "expected #{this} to have a " + f + " below #{exp}", e, p);
  } else this.assert(r >= e, "expected #{this} to be at least #{exp}", "expected #{this} to be below #{exp}", e);
}
N(To, "assertLeast");
T.addMethod("least", To);
T.addMethod("gte", To);
T.addMethod("greaterThanOrEqual", To);
function So(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = M(this, "doLength"), o = M(this, "message"), l = o ? o + ": " : "", a = M(this, "ssfi"), i = me(r).toLowerCase(), u = me(e).toLowerCase(), c, s = !0;
  if (n && i !== "map" && i !== "set" && new T(r, o, a, !0).to.have.property("length"), !n && i === "date" && u !== "date") c = l + "the argument to below must be a date";
  else if (!Pe(e) && (n || Pe(r))) c = l + "the argument to below must be a number";
  else if (!n && i !== "date" && !Pe(r)) {
    var d = i === "string" ? "'" + r + "'" : r;
    c = l + "expected " + d + " to be a number or a date";
  } else s = !1;
  if (s) throw new ae(c, void 0, a);
  if (n) {
    var f = "length", p;
    i === "map" || i === "set" ? (f = "size", p = r.size) : p = r.length, this.assert(p < e, "expected #{this} to have a " + f + " below #{exp} but got #{act}", "expected #{this} to not have a " + f + " below #{exp}", e, p);
  } else this.assert(r < e, "expected #{this} to be below #{exp}", "expected #{this} to be at least #{exp}", e);
}
N(So, "assertBelow");
T.addMethod("below", So);
T.addMethod("lt", So);
T.addMethod("lessThan", So);
function Mo(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = M(this, "doLength"), o = M(this, "message"), l = o ? o + ": " : "", a = M(this, "ssfi"), i = me(r).toLowerCase(), u = me(e).toLowerCase(), c, s = !0;
  if (n && i !== "map" && i !== "set" && new T(r, o, a, !0).to.have.property("length"), !n && i === "date" && u !== "date") c = l + "the argument to most must be a date";
  else if (!Pe(e) && (n || Pe(r))) c = l + "the argument to most must be a number";
  else if (!n && i !== "date" && !Pe(r)) {
    var d = i === "string" ? "'" + r + "'" : r;
    c = l + "expected " + d + " to be a number or a date";
  } else s = !1;
  if (s) throw new ae(c, void 0, a);
  if (n) {
    var f = "length", p;
    i === "map" || i === "set" ? (f = "size", p = r.size) : p = r.length, this.assert(p <= e, "expected #{this} to have a " + f + " at most #{exp} but got #{act}", "expected #{this} to have a " + f + " above #{exp}", e, p);
  } else this.assert(r <= e, "expected #{this} to be at most #{exp}", "expected #{this} to be above #{exp}", e);
}
N(Mo, "assertMost");
T.addMethod("most", Mo);
T.addMethod("lte", Mo);
T.addMethod("lessThanOrEqual", Mo);
T.addMethod("within", function(e, t, r) {
  r && M(this, "message", r);
  var n = M(this, "object"), o = M(this, "doLength"), l = M(this, "message"), a = l ? l + ": " : "", i = M(this, "ssfi"), u = me(n).toLowerCase(), c = me(e).toLowerCase(), s = me(t).toLowerCase(), d, f = !0, p = c === "date" && s === "date" ? e.toISOString() + ".." + t.toISOString() : e + ".." + t;
  if (o && u !== "map" && u !== "set" && new T(n, l, i, !0).to.have.property("length"), !o && u === "date" && (c !== "date" || s !== "date")) d = a + "the arguments to within must be dates";
  else if ((!Pe(e) || !Pe(t)) && (o || Pe(n))) d = a + "the arguments to within must be numbers";
  else if (!o && u !== "date" && !Pe(n)) {
    var m = u === "string" ? "'" + n + "'" : n;
    d = a + "expected " + m + " to be a number or a date";
  } else f = !1;
  if (f) throw new ae(d, void 0, i);
  if (o) {
    var b = "length", h;
    u === "map" || u === "set" ? (b = "size", h = n.size) : h = n.length, this.assert(h >= e && h <= t, "expected #{this} to have a " + b + " within " + p, "expected #{this} to not have a " + b + " within " + p);
  } else this.assert(n >= e && n <= t, "expected #{this} to be within " + p, "expected #{this} to not be within " + p);
});
function zi(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = M(this, "ssfi"), o = M(this, "message");
  try {
    var l = r instanceof e;
  } catch (i) {
    throw i instanceof TypeError ? (o = o ? o + ": " : "", new ae(o + "The instanceof assertion needs a constructor but " + me(e) + " was given.", void 0, n)) : i;
  }
  var a = qo(e);
  a == null && (a = "an unnamed constructor"), this.assert(l, "expected #{this} to be an instance of " + a, "expected #{this} to not be an instance of " + a);
}
N(zi, "assertInstanceOf");
T.addMethod("instanceof", zi);
T.addMethod("instanceOf", zi);
function Gi(e, t, r) {
  r && M(this, "message", r);
  var n = M(this, "nested"), o = M(this, "own"), l = M(this, "message"), a = M(this, "object"), i = M(this, "ssfi"), u = typeof e;
  if (l = l ? l + ": " : "", n) {
    if (u !== "string") throw new ae(l + "the argument to property must be a string when using nested syntax", void 0, i);
  } else if (u !== "string" && u !== "number" && u !== "symbol") throw new ae(l + "the argument to property must be a string, number, or symbol", void 0, i);
  if (n && o) throw new ae(l + 'The "nested" and "own" flags cannot be combined.', void 0, i);
  if (a == null) throw new ae(l + "Target cannot be null or undefined.", void 0, i);
  var c = M(this, "deep"), s = M(this, "negate"), d = n ? Ai(a, e) : null, f = n ? d.value : a[e], p = c ? M(this, "eql") : (h, y) => h === y, m = "";
  c && (m += "deep "), o && (m += "own "), n && (m += "nested "), m += "property ";
  var b;
  o ? b = Object.prototype.hasOwnProperty.call(a, e) : n ? b = d.exists : b = Co(a, e), (!s || arguments.length === 1) && this.assert(b, "expected #{this} to have " + m + re(e), "expected #{this} to not have " + m + re(e)), arguments.length > 1 && this.assert(b && p(t, f), "expected #{this} to have " + m + re(e) + " of #{exp}, but got #{act}", "expected #{this} to not have " + m + re(e) + " of #{act}", t, f), M(this, "object", f);
}
N(Gi, "assertProperty");
T.addMethod("property", Gi);
function Wi(e, t, r) {
  M(this, "own", !0), Gi.apply(this, arguments);
}
N(Wi, "assertOwnProperty");
T.addMethod("ownProperty", Wi);
T.addMethod("haveOwnProperty", Wi);
function Ki(e, t, r) {
  typeof t == "string" && (r = t, t = null), r && M(this, "message", r);
  var n = M(this, "object"), o = Object.getOwnPropertyDescriptor(Object(n), e), l = M(this, "eql");
  o && t ? this.assert(l(t, o), "expected the own property descriptor for " + re(e) + " on #{this} to match " + re(t) + ", got " + re(o), "expected the own property descriptor for " + re(e) + " on #{this} to not match " + re(t), t, o, !0) : this.assert(o, "expected #{this} to have an own property descriptor for " + re(e), "expected #{this} to not have an own property descriptor for " + re(e)), M(this, "object", o);
}
N(Ki, "assertOwnPropertyDescriptor");
T.addMethod("ownPropertyDescriptor", Ki);
T.addMethod("haveOwnPropertyDescriptor", Ki);
function Yi() {
  M(this, "doLength", !0);
}
N(Yi, "assertLengthChain");
function Ji(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = me(r).toLowerCase(), o = M(this, "message"), l = M(this, "ssfi"), a = "length", i;
  switch (n) {
    case "map":
    case "set":
      a = "size", i = r.size;
      break;
    default:
      new T(r, o, l, !0).to.have.property("length"), i = r.length;
  }
  this.assert(i == e, "expected #{this} to have a " + a + " of #{exp} but got #{act}", "expected #{this} to not have a " + a + " of #{act}", e, i);
}
N(Ji, "assertLength");
T.addChainableMethod("length", Ji, Yi);
T.addChainableMethod("lengthOf", Ji, Yi);
function Xi(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object");
  this.assert(e.exec(r), "expected #{this} to match " + e, "expected #{this} not to match " + e);
}
N(Xi, "assertMatch");
T.addMethod("match", Xi);
T.addMethod("matches", Xi);
T.addMethod("string", function(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = M(this, "message"), o = M(this, "ssfi");
  new T(r, n, o, !0).is.a("string"), this.assert(~r.indexOf(e), "expected #{this} to contain " + re(e), "expected #{this} to not contain " + re(e));
});
function Qi(e) {
  var t = M(this, "object"), r = me(t), n = me(e), o = M(this, "ssfi"), l = M(this, "deep"), a, i = "", u, c = !0, s = M(this, "message");
  s = s ? s + ": " : "";
  var d = s + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
  if (r === "Map" || r === "Set") i = l ? "deeply " : "", u = [], t.forEach(function(g, q) {
    u.push(q);
  }), n !== "Array" && (e = Array.prototype.slice.call(arguments));
  else {
    switch (u = Bi(t), n) {
      case "Array":
        if (arguments.length > 1) throw new ae(d, void 0, o);
        break;
      case "Object":
        if (arguments.length > 1) throw new ae(d, void 0, o);
        e = Object.keys(e);
        break;
      default:
        e = Array.prototype.slice.call(arguments);
    }
    e = e.map(function(g) {
      return typeof g == "symbol" ? g : String(g);
    });
  }
  if (!e.length) throw new ae(s + "keys required", void 0, o);
  var f = e.length, p = M(this, "any"), m = M(this, "all"), b = e, h = l ? M(this, "eql") : (g, q) => g === q;
  if (!p && !m && (m = !0), p && (c = b.some(function(g) {
    return u.some(function(q) {
      return h(g, q);
    });
  })), m && (c = b.every(function(g) {
    return u.some(function(q) {
      return h(g, q);
    });
  }), M(this, "contains") || (c = c && e.length == u.length)), f > 1) {
    e = e.map(function(g) {
      return re(g);
    });
    var y = e.pop();
    m && (a = e.join(", ") + ", and " + y), p && (a = e.join(", ") + ", or " + y);
  } else a = re(e[0]);
  a = (f > 1 ? "keys " : "key ") + a, a = (M(this, "contains") ? "contain " : "have ") + a, this.assert(c, "expected #{this} to " + i + a, "expected #{this} to not " + i + a, b.slice(0).sort(Kn), u.sort(Kn), !0);
}
N(Qi, "assertKeys");
T.addMethod("keys", Qi);
T.addMethod("key", Qi);
function Ao(e, t, r) {
  r && M(this, "message", r);
  var n = M(this, "object"), o = M(this, "ssfi"), l = M(this, "message"), a = M(this, "negate") || !1;
  new T(n, l, o, !0).is.a("function"), (Jn(e) || typeof e == "string") && (t = e, e = null);
  let i, u = !1;
  try {
    n();
  } catch (g) {
    u = !0, i = g;
  }
  var c = e === void 0 && t === void 0, s = !!(e && t), d = !1, f = !1;
  if (c || !c && !a) {
    var p = "an error";
    e instanceof Error ? p = "#{exp}" : e && (p = Fe.getConstructorName(e));
    let g = i;
    if (i instanceof Error) g = i.toString();
    else if (typeof i == "string") g = i;
    else if (i && (typeof i == "object" || typeof i == "function")) try {
      g = Fe.getConstructorName(i);
    } catch {
    }
    this.assert(u, "expected #{this} to throw " + p, "expected #{this} to not throw an error but #{act} was thrown", e && e.toString(), g);
  }
  if (e && i) {
    if (e instanceof Error) {
      var m = Fe.compatibleInstance(i, e);
      m === a && (s && a ? d = !0 : this.assert(a, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (i && !a ? " but #{act} was thrown" : ""), e.toString(), i.toString()));
    }
    var b = Fe.compatibleConstructor(i, e);
    b === a && (s && a ? d = !0 : this.assert(a, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (i ? " but #{act} was thrown" : ""), e instanceof Error ? e.toString() : e && Fe.getConstructorName(e), i instanceof Error ? i.toString() : i && Fe.getConstructorName(i)));
  }
  if (i && t !== void 0 && t !== null) {
    var h = "including";
    Jn(t) && (h = "matching");
    var y = Fe.compatibleMessage(i, t);
    y === a && (s && a ? f = !0 : this.assert(a, "expected #{this} to throw error " + h + " #{exp} but got #{act}", "expected #{this} to throw error not " + h + " #{exp}", t, Fe.getMessage(i)));
  }
  d && f && this.assert(a, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (i ? " but #{act} was thrown" : ""), e instanceof Error ? e.toString() : e && Fe.getConstructorName(e), i instanceof Error ? i.toString() : i && Fe.getConstructorName(i)), M(this, "object", i);
}
N(Ao, "assertThrows");
T.addMethod("throw", Ao);
T.addMethod("throws", Ao);
T.addMethod("Throw", Ao);
function Zi(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = M(this, "itself"), o = typeof r == "function" && !n ? r.prototype[e] : r[e];
  this.assert(typeof o == "function", "expected #{this} to respond to " + re(e), "expected #{this} to not respond to " + re(e));
}
N(Zi, "respondTo");
T.addMethod("respondTo", Zi);
T.addMethod("respondsTo", Zi);
T.addProperty("itself", function() {
  M(this, "itself", !0);
});
function es(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = e(r);
  this.assert(n, "expected #{this} to satisfy " + Vt(e), "expected #{this} to not satisfy" + Vt(e), !M(this, "negate"), n);
}
N(es, "satisfy");
T.addMethod("satisfy", es);
T.addMethod("satisfies", es);
function ts(e, t, r) {
  r && M(this, "message", r);
  var n = M(this, "object"), o = M(this, "message"), l = M(this, "ssfi");
  new T(n, o, l, !0).is.numeric;
  let a = "A `delta` value is required for `closeTo`";
  if (t == null) throw new ae(o ? `${o}: ${a}` : a, void 0, l);
  if (new T(t, o, l, !0).is.numeric, a = "A `expected` value is required for `closeTo`", e == null) throw new ae(o ? `${o}: ${a}` : a, void 0, l);
  new T(e, o, l, !0).is.numeric;
  let i = N((c) => c < 0n ? -c : c, "abs"), u = N((c) => parseFloat(parseFloat(c).toPrecision(12)), "strip");
  this.assert(u(i(n - e)) <= t, "expected #{this} to be close to " + e + " +/- " + t, "expected #{this} not to be close to " + e + " +/- " + t);
}
N(ts, "closeTo");
T.addMethod("closeTo", ts);
T.addMethod("approximately", ts);
function Cf(e, t, r, n, o) {
  let l = Array.from(t), a = Array.from(e);
  if (!n) {
    if (a.length !== l.length) return !1;
    l = l.slice();
  }
  return a.every(function(i, u) {
    if (o) return r ? r(i, l[u]) : i === l[u];
    if (!r) {
      var c = l.indexOf(i);
      return c === -1 ? !1 : (n || l.splice(c, 1), !0);
    }
    return l.some(function(s, d) {
      return r(i, s) ? (n || l.splice(d, 1), !0) : !1;
    });
  });
}
N(Cf, "isSubsetOf");
T.addMethod("members", function(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = M(this, "message"), o = M(this, "ssfi");
  new T(r, n, o, !0).to.be.iterable, new T(e, n, o, !0).to.be.iterable;
  var l = M(this, "contains"), a = M(this, "ordered"), i, u, c;
  l ? (i = a ? "an ordered superset" : "a superset", u = "expected #{this} to be " + i + " of #{exp}", c = "expected #{this} to not be " + i + " of #{exp}") : (i = a ? "ordered members" : "members", u = "expected #{this} to have the same " + i + " as #{exp}", c = "expected #{this} to not have the same " + i + " as #{exp}");
  var s = M(this, "deep") ? M(this, "eql") : void 0;
  this.assert(Cf(e, r, s, l, a), u, c, e, r, !0);
});
T.addProperty("iterable", function(e) {
  e && M(this, "message", e);
  var t = M(this, "object");
  this.assert(t != null && t[Symbol.iterator], "expected #{this} to be an iterable", "expected #{this} to not be an iterable", t);
});
function qf(e, t) {
  t && M(this, "message", t);
  var r = M(this, "object"), n = M(this, "message"), o = M(this, "ssfi"), l = M(this, "contains"), a = M(this, "deep"), i = M(this, "eql");
  new T(e, n, o, !0).to.be.an("array"), l ? this.assert(e.some(function(u) {
    return r.indexOf(u) > -1;
  }), "expected #{this} to contain one of #{exp}", "expected #{this} to not contain one of #{exp}", e, r) : a ? this.assert(e.some(function(u) {
    return i(r, u);
  }), "expected #{this} to deeply equal one of #{exp}", "expected #{this} to deeply equal one of #{exp}", e, r) : this.assert(e.indexOf(r) > -1, "expected #{this} to be one of #{exp}", "expected #{this} to not be one of #{exp}", e, r);
}
N(qf, "oneOf");
T.addMethod("oneOf", qf);
function rs(e, t, r) {
  r && M(this, "message", r);
  var n = M(this, "object"), o = M(this, "message"), l = M(this, "ssfi");
  new T(n, o, l, !0).is.a("function");
  var a;
  t ? (new T(e, o, l, !0).to.have.property(t), a = e[t]) : (new T(e, o, l, !0).is.a("function"), a = e()), n();
  var i = t == null ? e() : e[t], u = t == null ? a : "." + t;
  M(this, "deltaMsgObj", u), M(this, "initialDeltaValue", a), M(this, "finalDeltaValue", i), M(this, "deltaBehavior", "change"), M(this, "realDelta", i !== a), this.assert(a !== i, "expected " + u + " to change", "expected " + u + " to not change");
}
N(rs, "assertChanges");
T.addMethod("change", rs);
T.addMethod("changes", rs);
function ns(e, t, r) {
  r && M(this, "message", r);
  var n = M(this, "object"), o = M(this, "message"), l = M(this, "ssfi");
  new T(n, o, l, !0).is.a("function");
  var a;
  t ? (new T(e, o, l, !0).to.have.property(t), a = e[t]) : (new T(e, o, l, !0).is.a("function"), a = e()), new T(a, o, l, !0).is.a("number"), n();
  var i = t == null ? e() : e[t], u = t == null ? a : "." + t;
  M(this, "deltaMsgObj", u), M(this, "initialDeltaValue", a), M(this, "finalDeltaValue", i), M(this, "deltaBehavior", "increase"), M(this, "realDelta", i - a), this.assert(i - a > 0, "expected " + u + " to increase", "expected " + u + " to not increase");
}
N(ns, "assertIncreases");
T.addMethod("increase", ns);
T.addMethod("increases", ns);
function os(e, t, r) {
  r && M(this, "message", r);
  var n = M(this, "object"), o = M(this, "message"), l = M(this, "ssfi");
  new T(n, o, l, !0).is.a("function");
  var a;
  t ? (new T(e, o, l, !0).to.have.property(t), a = e[t]) : (new T(e, o, l, !0).is.a("function"), a = e()), new T(a, o, l, !0).is.a("number"), n();
  var i = t == null ? e() : e[t], u = t == null ? a : "." + t;
  M(this, "deltaMsgObj", u), M(this, "initialDeltaValue", a), M(this, "finalDeltaValue", i), M(this, "deltaBehavior", "decrease"), M(this, "realDelta", a - i), this.assert(i - a < 0, "expected " + u + " to decrease", "expected " + u + " to not decrease");
}
N(os, "assertDecreases");
T.addMethod("decrease", os);
T.addMethod("decreases", os);
function Pf(e, t) {
  t && M(this, "message", t);
  var r = M(this, "deltaMsgObj"), n = M(this, "initialDeltaValue"), o = M(this, "finalDeltaValue"), l = M(this, "deltaBehavior"), a = M(this, "realDelta"), i;
  l === "change" ? i = Math.abs(o - n) === Math.abs(e) : i = a === Math.abs(e), this.assert(i, "expected " + r + " to " + l + " by " + e, "expected " + r + " to not " + l + " by " + e);
}
N(Pf, "assertDelta");
T.addMethod("by", Pf);
T.addProperty("extensible", function() {
  var e = M(this, "object"), t = e === Object(e) && Object.isExtensible(e);
  this.assert(t, "expected #{this} to be extensible", "expected #{this} to not be extensible");
});
T.addProperty("sealed", function() {
  var e = M(this, "object"), t = e === Object(e) ? Object.isSealed(e) : !0;
  this.assert(t, "expected #{this} to be sealed", "expected #{this} to not be sealed");
});
T.addProperty("frozen", function() {
  var e = M(this, "object"), t = e === Object(e) ? Object.isFrozen(e) : !0;
  this.assert(t, "expected #{this} to be frozen", "expected #{this} to not be frozen");
});
T.addProperty("finite", function(e) {
  var t = M(this, "object");
  this.assert(typeof t == "number" && isFinite(t), "expected #{this} to be a finite number", "expected #{this} to not be a finite number");
});
function Xn(e, t) {
  return e === t ? !0 : typeof t != typeof e ? !1 : typeof e != "object" || e === null ? e === t : t ? Array.isArray(e) ? Array.isArray(t) ? e.every(function(r) {
    return t.some(function(n) {
      return Xn(r, n);
    });
  }) : !1 : e instanceof Date ? t instanceof Date ? e.getTime() === t.getTime() : !1 : Object.keys(e).every(function(r) {
    var n = e[r], o = t[r];
    return typeof n == "object" && n !== null && o !== null ? Xn(n, o) : typeof n == "function" ? n(o) : o === n;
  }) : !1;
}
N(Xn, "compareSubset");
T.addMethod("containSubset", function(e) {
  let t = J(this, "object"), r = Be.showDiff;
  this.assert(Xn(e, t), "expected #{act} to contain subset #{exp}", "expected #{act} to not contain subset #{exp}", e, t, r);
});
function zt(e, t) {
  return new T(e, t);
}
N(zt, "expect");
zt.fail = function(e, t, r, n) {
  throw arguments.length < 2 && (r = e, e = void 0), r = r || "expect.fail()", new ae(r, { actual: e, expected: t, operator: n }, zt.fail);
};
var Of = {};
Ci(Of, { Should: () => o1, should: () => n1 });
function as() {
  function e() {
    return this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol == "function" && this instanceof Symbol || typeof BigInt == "function" && this instanceof BigInt ? new T(this.valueOf(), null, e) : new T(this, null, e);
  }
  N(e, "shouldGetter");
  function t(n) {
    Object.defineProperty(this, "should", { value: n, enumerable: !0, configurable: !0, writable: !0 });
  }
  N(t, "shouldSetter"), Object.defineProperty(Object.prototype, "should", { set: t, get: e, configurable: !0 });
  var r = {};
  return r.fail = function(n, o, l, a) {
    throw arguments.length < 2 && (l = n, n = void 0), l = l || "should.fail()", new ae(l, { actual: n, expected: o, operator: a }, r.fail);
  }, r.equal = function(n, o, l) {
    new T(n, l).to.equal(o);
  }, r.Throw = function(n, o, l, a) {
    new T(n, a).to.Throw(o, l);
  }, r.exist = function(n, o) {
    new T(n, o).to.exist;
  }, r.not = {}, r.not.equal = function(n, o, l) {
    new T(n, l).to.not.equal(o);
  }, r.not.Throw = function(n, o, l, a) {
    new T(n, a).to.not.Throw(o, l);
  }, r.not.exist = function(n, o) {
    new T(n, o).to.not.exist;
  }, r.throw = r.Throw, r.not.throw = r.not.Throw, r;
}
N(as, "loadShould");
var n1 = as, o1 = as;
function O(e, t) {
  var r = new T(null, null, O, !0);
  r.assert(e, t, "[ negation message unavailable ]");
}
N(O, "assert");
O.fail = function(e, t, r, n) {
  throw arguments.length < 2 && (r = e, e = void 0), r = r || "assert.fail()", new ae(r, { actual: e, expected: t, operator: n }, O.fail);
};
O.isOk = function(e, t) {
  new T(e, t, O.isOk, !0).is.ok;
};
O.isNotOk = function(e, t) {
  new T(e, t, O.isNotOk, !0).is.not.ok;
};
O.equal = function(e, t, r) {
  var n = new T(e, r, O.equal, !0);
  n.assert(t == J(n, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", t, e, !0);
};
O.notEqual = function(e, t, r) {
  var n = new T(e, r, O.notEqual, !0);
  n.assert(t != J(n, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", t, e, !0);
};
O.strictEqual = function(e, t, r) {
  new T(e, r, O.strictEqual, !0).to.equal(t);
};
O.notStrictEqual = function(e, t, r) {
  new T(e, r, O.notStrictEqual, !0).to.not.equal(t);
};
O.deepEqual = O.deepStrictEqual = function(e, t, r) {
  new T(e, r, O.deepEqual, !0).to.eql(t);
};
O.notDeepEqual = function(e, t, r) {
  new T(e, r, O.notDeepEqual, !0).to.not.eql(t);
};
O.isAbove = function(e, t, r) {
  new T(e, r, O.isAbove, !0).to.be.above(t);
};
O.isAtLeast = function(e, t, r) {
  new T(e, r, O.isAtLeast, !0).to.be.least(t);
};
O.isBelow = function(e, t, r) {
  new T(e, r, O.isBelow, !0).to.be.below(t);
};
O.isAtMost = function(e, t, r) {
  new T(e, r, O.isAtMost, !0).to.be.most(t);
};
O.isTrue = function(e, t) {
  new T(e, t, O.isTrue, !0).is.true;
};
O.isNotTrue = function(e, t) {
  new T(e, t, O.isNotTrue, !0).to.not.equal(!0);
};
O.isFalse = function(e, t) {
  new T(e, t, O.isFalse, !0).is.false;
};
O.isNotFalse = function(e, t) {
  new T(e, t, O.isNotFalse, !0).to.not.equal(!1);
};
O.isNull = function(e, t) {
  new T(e, t, O.isNull, !0).to.equal(null);
};
O.isNotNull = function(e, t) {
  new T(e, t, O.isNotNull, !0).to.not.equal(null);
};
O.isNaN = function(e, t) {
  new T(e, t, O.isNaN, !0).to.be.NaN;
};
O.isNotNaN = function(e, t) {
  new T(e, t, O.isNotNaN, !0).not.to.be.NaN;
};
O.exists = function(e, t) {
  new T(e, t, O.exists, !0).to.exist;
};
O.notExists = function(e, t) {
  new T(e, t, O.notExists, !0).to.not.exist;
};
O.isUndefined = function(e, t) {
  new T(e, t, O.isUndefined, !0).to.equal(void 0);
};
O.isDefined = function(e, t) {
  new T(e, t, O.isDefined, !0).to.not.equal(void 0);
};
O.isCallable = function(e, t) {
  new T(e, t, O.isCallable, !0).is.callable;
};
O.isNotCallable = function(e, t) {
  new T(e, t, O.isNotCallable, !0).is.not.callable;
};
O.isObject = function(e, t) {
  new T(e, t, O.isObject, !0).to.be.a("object");
};
O.isNotObject = function(e, t) {
  new T(e, t, O.isNotObject, !0).to.not.be.a("object");
};
O.isArray = function(e, t) {
  new T(e, t, O.isArray, !0).to.be.an("array");
};
O.isNotArray = function(e, t) {
  new T(e, t, O.isNotArray, !0).to.not.be.an("array");
};
O.isString = function(e, t) {
  new T(e, t, O.isString, !0).to.be.a("string");
};
O.isNotString = function(e, t) {
  new T(e, t, O.isNotString, !0).to.not.be.a("string");
};
O.isNumber = function(e, t) {
  new T(e, t, O.isNumber, !0).to.be.a("number");
};
O.isNotNumber = function(e, t) {
  new T(e, t, O.isNotNumber, !0).to.not.be.a("number");
};
O.isNumeric = function(e, t) {
  new T(e, t, O.isNumeric, !0).is.numeric;
};
O.isNotNumeric = function(e, t) {
  new T(e, t, O.isNotNumeric, !0).is.not.numeric;
};
O.isFinite = function(e, t) {
  new T(e, t, O.isFinite, !0).to.be.finite;
};
O.isBoolean = function(e, t) {
  new T(e, t, O.isBoolean, !0).to.be.a("boolean");
};
O.isNotBoolean = function(e, t) {
  new T(e, t, O.isNotBoolean, !0).to.not.be.a("boolean");
};
O.typeOf = function(e, t, r) {
  new T(e, r, O.typeOf, !0).to.be.a(t);
};
O.notTypeOf = function(e, t, r) {
  new T(e, r, O.notTypeOf, !0).to.not.be.a(t);
};
O.instanceOf = function(e, t, r) {
  new T(e, r, O.instanceOf, !0).to.be.instanceOf(t);
};
O.notInstanceOf = function(e, t, r) {
  new T(e, r, O.notInstanceOf, !0).to.not.be.instanceOf(t);
};
O.include = function(e, t, r) {
  new T(e, r, O.include, !0).include(t);
};
O.notInclude = function(e, t, r) {
  new T(e, r, O.notInclude, !0).not.include(t);
};
O.deepInclude = function(e, t, r) {
  new T(e, r, O.deepInclude, !0).deep.include(t);
};
O.notDeepInclude = function(e, t, r) {
  new T(e, r, O.notDeepInclude, !0).not.deep.include(t);
};
O.nestedInclude = function(e, t, r) {
  new T(e, r, O.nestedInclude, !0).nested.include(t);
};
O.notNestedInclude = function(e, t, r) {
  new T(e, r, O.notNestedInclude, !0).not.nested.include(t);
};
O.deepNestedInclude = function(e, t, r) {
  new T(e, r, O.deepNestedInclude, !0).deep.nested.include(t);
};
O.notDeepNestedInclude = function(e, t, r) {
  new T(e, r, O.notDeepNestedInclude, !0).not.deep.nested.include(t);
};
O.ownInclude = function(e, t, r) {
  new T(e, r, O.ownInclude, !0).own.include(t);
};
O.notOwnInclude = function(e, t, r) {
  new T(e, r, O.notOwnInclude, !0).not.own.include(t);
};
O.deepOwnInclude = function(e, t, r) {
  new T(e, r, O.deepOwnInclude, !0).deep.own.include(t);
};
O.notDeepOwnInclude = function(e, t, r) {
  new T(e, r, O.notDeepOwnInclude, !0).not.deep.own.include(t);
};
O.match = function(e, t, r) {
  new T(e, r, O.match, !0).to.match(t);
};
O.notMatch = function(e, t, r) {
  new T(e, r, O.notMatch, !0).to.not.match(t);
};
O.property = function(e, t, r) {
  new T(e, r, O.property, !0).to.have.property(t);
};
O.notProperty = function(e, t, r) {
  new T(e, r, O.notProperty, !0).to.not.have.property(t);
};
O.propertyVal = function(e, t, r, n) {
  new T(e, n, O.propertyVal, !0).to.have.property(t, r);
};
O.notPropertyVal = function(e, t, r, n) {
  new T(e, n, O.notPropertyVal, !0).to.not.have.property(t, r);
};
O.deepPropertyVal = function(e, t, r, n) {
  new T(e, n, O.deepPropertyVal, !0).to.have.deep.property(t, r);
};
O.notDeepPropertyVal = function(e, t, r, n) {
  new T(e, n, O.notDeepPropertyVal, !0).to.not.have.deep.property(t, r);
};
O.ownProperty = function(e, t, r) {
  new T(e, r, O.ownProperty, !0).to.have.own.property(t);
};
O.notOwnProperty = function(e, t, r) {
  new T(e, r, O.notOwnProperty, !0).to.not.have.own.property(t);
};
O.ownPropertyVal = function(e, t, r, n) {
  new T(e, n, O.ownPropertyVal, !0).to.have.own.property(t, r);
};
O.notOwnPropertyVal = function(e, t, r, n) {
  new T(e, n, O.notOwnPropertyVal, !0).to.not.have.own.property(t, r);
};
O.deepOwnPropertyVal = function(e, t, r, n) {
  new T(e, n, O.deepOwnPropertyVal, !0).to.have.deep.own.property(t, r);
};
O.notDeepOwnPropertyVal = function(e, t, r, n) {
  new T(e, n, O.notDeepOwnPropertyVal, !0).to.not.have.deep.own.property(t, r);
};
O.nestedProperty = function(e, t, r) {
  new T(e, r, O.nestedProperty, !0).to.have.nested.property(t);
};
O.notNestedProperty = function(e, t, r) {
  new T(e, r, O.notNestedProperty, !0).to.not.have.nested.property(t);
};
O.nestedPropertyVal = function(e, t, r, n) {
  new T(e, n, O.nestedPropertyVal, !0).to.have.nested.property(t, r);
};
O.notNestedPropertyVal = function(e, t, r, n) {
  new T(e, n, O.notNestedPropertyVal, !0).to.not.have.nested.property(t, r);
};
O.deepNestedPropertyVal = function(e, t, r, n) {
  new T(e, n, O.deepNestedPropertyVal, !0).to.have.deep.nested.property(t, r);
};
O.notDeepNestedPropertyVal = function(e, t, r, n) {
  new T(e, n, O.notDeepNestedPropertyVal, !0).to.not.have.deep.nested.property(t, r);
};
O.lengthOf = function(e, t, r) {
  new T(e, r, O.lengthOf, !0).to.have.lengthOf(t);
};
O.hasAnyKeys = function(e, t, r) {
  new T(e, r, O.hasAnyKeys, !0).to.have.any.keys(t);
};
O.hasAllKeys = function(e, t, r) {
  new T(e, r, O.hasAllKeys, !0).to.have.all.keys(t);
};
O.containsAllKeys = function(e, t, r) {
  new T(e, r, O.containsAllKeys, !0).to.contain.all.keys(t);
};
O.doesNotHaveAnyKeys = function(e, t, r) {
  new T(e, r, O.doesNotHaveAnyKeys, !0).to.not.have.any.keys(t);
};
O.doesNotHaveAllKeys = function(e, t, r) {
  new T(e, r, O.doesNotHaveAllKeys, !0).to.not.have.all.keys(t);
};
O.hasAnyDeepKeys = function(e, t, r) {
  new T(e, r, O.hasAnyDeepKeys, !0).to.have.any.deep.keys(t);
};
O.hasAllDeepKeys = function(e, t, r) {
  new T(e, r, O.hasAllDeepKeys, !0).to.have.all.deep.keys(t);
};
O.containsAllDeepKeys = function(e, t, r) {
  new T(e, r, O.containsAllDeepKeys, !0).to.contain.all.deep.keys(t);
};
O.doesNotHaveAnyDeepKeys = function(e, t, r) {
  new T(e, r, O.doesNotHaveAnyDeepKeys, !0).to.not.have.any.deep.keys(t);
};
O.doesNotHaveAllDeepKeys = function(e, t, r) {
  new T(e, r, O.doesNotHaveAllDeepKeys, !0).to.not.have.all.deep.keys(t);
};
O.throws = function(e, t, r, n) {
  (typeof t == "string" || t instanceof RegExp) && (r = t, t = null);
  var o = new T(e, n, O.throws, !0).to.throw(t, r);
  return J(o, "object");
};
O.doesNotThrow = function(e, t, r, n) {
  (typeof t == "string" || t instanceof RegExp) && (r = t, t = null), new T(e, n, O.doesNotThrow, !0).to.not.throw(t, r);
};
O.operator = function(e, t, r, n) {
  var o;
  switch (t) {
    case "==":
      o = e == r;
      break;
    case "===":
      o = e === r;
      break;
    case ">":
      o = e > r;
      break;
    case ">=":
      o = e >= r;
      break;
    case "<":
      o = e < r;
      break;
    case "<=":
      o = e <= r;
      break;
    case "!=":
      o = e != r;
      break;
    case "!==":
      o = e !== r;
      break;
    default:
      throw n = n && n + ": ", new ae(n + 'Invalid operator "' + t + '"', void 0, O.operator);
  }
  var l = new T(o, n, O.operator, !0);
  l.assert(J(l, "object") === !0, "expected " + re(e) + " to be " + t + " " + re(r), "expected " + re(e) + " to not be " + t + " " + re(r));
};
O.closeTo = function(e, t, r, n) {
  new T(e, n, O.closeTo, !0).to.be.closeTo(t, r);
};
O.approximately = function(e, t, r, n) {
  new T(e, n, O.approximately, !0).to.be.approximately(t, r);
};
O.sameMembers = function(e, t, r) {
  new T(e, r, O.sameMembers, !0).to.have.same.members(t);
};
O.notSameMembers = function(e, t, r) {
  new T(e, r, O.notSameMembers, !0).to.not.have.same.members(t);
};
O.sameDeepMembers = function(e, t, r) {
  new T(e, r, O.sameDeepMembers, !0).to.have.same.deep.members(t);
};
O.notSameDeepMembers = function(e, t, r) {
  new T(e, r, O.notSameDeepMembers, !0).to.not.have.same.deep.members(t);
};
O.sameOrderedMembers = function(e, t, r) {
  new T(e, r, O.sameOrderedMembers, !0).to.have.same.ordered.members(t);
};
O.notSameOrderedMembers = function(e, t, r) {
  new T(e, r, O.notSameOrderedMembers, !0).to.not.have.same.ordered.members(t);
};
O.sameDeepOrderedMembers = function(e, t, r) {
  new T(e, r, O.sameDeepOrderedMembers, !0).to.have.same.deep.ordered.members(t);
};
O.notSameDeepOrderedMembers = function(e, t, r) {
  new T(e, r, O.notSameDeepOrderedMembers, !0).to.not.have.same.deep.ordered.members(t);
};
O.includeMembers = function(e, t, r) {
  new T(e, r, O.includeMembers, !0).to.include.members(t);
};
O.notIncludeMembers = function(e, t, r) {
  new T(e, r, O.notIncludeMembers, !0).to.not.include.members(t);
};
O.includeDeepMembers = function(e, t, r) {
  new T(e, r, O.includeDeepMembers, !0).to.include.deep.members(t);
};
O.notIncludeDeepMembers = function(e, t, r) {
  new T(e, r, O.notIncludeDeepMembers, !0).to.not.include.deep.members(t);
};
O.includeOrderedMembers = function(e, t, r) {
  new T(e, r, O.includeOrderedMembers, !0).to.include.ordered.members(t);
};
O.notIncludeOrderedMembers = function(e, t, r) {
  new T(e, r, O.notIncludeOrderedMembers, !0).to.not.include.ordered.members(t);
};
O.includeDeepOrderedMembers = function(e, t, r) {
  new T(e, r, O.includeDeepOrderedMembers, !0).to.include.deep.ordered.members(t);
};
O.notIncludeDeepOrderedMembers = function(e, t, r) {
  new T(e, r, O.notIncludeDeepOrderedMembers, !0).to.not.include.deep.ordered.members(t);
};
O.oneOf = function(e, t, r) {
  new T(e, r, O.oneOf, !0).to.be.oneOf(t);
};
O.isIterable = function(e, t) {
  if (e == null || !e[Symbol.iterator]) throw t = t ? `${t} expected ${re(e)} to be an iterable` : `expected ${re(e)} to be an iterable`, new ae(t, void 0, O.isIterable);
};
O.changes = function(e, t, r, n) {
  arguments.length === 3 && typeof t == "function" && (n = r, r = null), new T(e, n, O.changes, !0).to.change(t, r);
};
O.changesBy = function(e, t, r, n, o) {
  if (arguments.length === 4 && typeof t == "function") {
    var l = n;
    n = r, o = l;
  } else arguments.length === 3 && (n = r, r = null);
  new T(e, o, O.changesBy, !0).to.change(t, r).by(n);
};
O.doesNotChange = function(e, t, r, n) {
  return arguments.length === 3 && typeof t == "function" && (n = r, r = null), new T(e, n, O.doesNotChange, !0).to.not.change(t, r);
};
O.changesButNotBy = function(e, t, r, n, o) {
  if (arguments.length === 4 && typeof t == "function") {
    var l = n;
    n = r, o = l;
  } else arguments.length === 3 && (n = r, r = null);
  new T(e, o, O.changesButNotBy, !0).to.change(t, r).but.not.by(n);
};
O.increases = function(e, t, r, n) {
  return arguments.length === 3 && typeof t == "function" && (n = r, r = null), new T(e, n, O.increases, !0).to.increase(t, r);
};
O.increasesBy = function(e, t, r, n, o) {
  if (arguments.length === 4 && typeof t == "function") {
    var l = n;
    n = r, o = l;
  } else arguments.length === 3 && (n = r, r = null);
  new T(e, o, O.increasesBy, !0).to.increase(t, r).by(n);
};
O.doesNotIncrease = function(e, t, r, n) {
  return arguments.length === 3 && typeof t == "function" && (n = r, r = null), new T(e, n, O.doesNotIncrease, !0).to.not.increase(t, r);
};
O.increasesButNotBy = function(e, t, r, n, o) {
  if (arguments.length === 4 && typeof t == "function") {
    var l = n;
    n = r, o = l;
  } else arguments.length === 3 && (n = r, r = null);
  new T(e, o, O.increasesButNotBy, !0).to.increase(t, r).but.not.by(n);
};
O.decreases = function(e, t, r, n) {
  return arguments.length === 3 && typeof t == "function" && (n = r, r = null), new T(e, n, O.decreases, !0).to.decrease(t, r);
};
O.decreasesBy = function(e, t, r, n, o) {
  if (arguments.length === 4 && typeof t == "function") {
    var l = n;
    n = r, o = l;
  } else arguments.length === 3 && (n = r, r = null);
  new T(e, o, O.decreasesBy, !0).to.decrease(t, r).by(n);
};
O.doesNotDecrease = function(e, t, r, n) {
  return arguments.length === 3 && typeof t == "function" && (n = r, r = null), new T(e, n, O.doesNotDecrease, !0).to.not.decrease(t, r);
};
O.doesNotDecreaseBy = function(e, t, r, n, o) {
  if (arguments.length === 4 && typeof t == "function") {
    var l = n;
    n = r, o = l;
  } else arguments.length === 3 && (n = r, r = null);
  return new T(e, o, O.doesNotDecreaseBy, !0).to.not.decrease(t, r).by(n);
};
O.decreasesButNotBy = function(e, t, r, n, o) {
  if (arguments.length === 4 && typeof t == "function") {
    var l = n;
    n = r, o = l;
  } else arguments.length === 3 && (n = r, r = null);
  new T(e, o, O.decreasesButNotBy, !0).to.decrease(t, r).but.not.by(n);
};
O.ifError = function(e) {
  if (e) throw e;
};
O.isExtensible = function(e, t) {
  new T(e, t, O.isExtensible, !0).to.be.extensible;
};
O.isNotExtensible = function(e, t) {
  new T(e, t, O.isNotExtensible, !0).to.not.be.extensible;
};
O.isSealed = function(e, t) {
  new T(e, t, O.isSealed, !0).to.be.sealed;
};
O.isNotSealed = function(e, t) {
  new T(e, t, O.isNotSealed, !0).to.not.be.sealed;
};
O.isFrozen = function(e, t) {
  new T(e, t, O.isFrozen, !0).to.be.frozen;
};
O.isNotFrozen = function(e, t) {
  new T(e, t, O.isNotFrozen, !0).to.not.be.frozen;
};
O.isEmpty = function(e, t) {
  new T(e, t, O.isEmpty, !0).to.be.empty;
};
O.isNotEmpty = function(e, t) {
  new T(e, t, O.isNotEmpty, !0).to.not.be.empty;
};
O.containsSubset = function(e, t, r) {
  new T(e, r).to.containSubset(t);
};
O.doesNotContainSubset = function(e, t, r) {
  new T(e, r).to.not.containSubset(t);
};
var a1 = [["isOk", "ok"], ["isNotOk", "notOk"], ["throws", "throw"], ["throws", "Throw"], ["isExtensible", "extensible"], ["isNotExtensible", "notExtensible"], ["isSealed", "sealed"], ["isNotSealed", "notSealed"], ["isFrozen", "frozen"], ["isNotFrozen", "notFrozen"], ["isEmpty", "empty"], ["isNotEmpty", "notEmpty"], ["isCallable", "isFunction"], ["isNotCallable", "isNotFunction"], ["containsSubset", "containSubset"]];
for (let [e, t] of a1) O[t] = O[e];
var Lu = [];
function mr(e) {
  let t = { use: mr, AssertionError: ae, util: lt, config: Be, expect: zt, assert: O, Assertion: T, ...Of };
  return ~Lu.indexOf(e) || (e(t, lt), Lu.push(e)), t;
}
N(mr, "use");
var Tf = {};
yi(Tf, { toBeChecked: () => bm, toBeDisabled: () => sm, toBeEmpty: () => Wf, toBeEmptyDOMElement: () => Kf, toBeEnabled: () => um, toBeInTheDOM: () => Rl, toBeInTheDocument: () => Gf, toBeInvalid: () => pm, toBePartiallyChecked: () => gm, toBeRequired: () => cm, toBeValid: () => fm, toBeVisible: () => nm, toContainElement: () => wl, toContainHTML: () => Yf, toHaveAccessibleDescription: () => El, toHaveAccessibleErrorMessage: () => Xf, toHaveAccessibleName: () => ql, toHaveAttribute: () => Qf, toHaveClass: () => Zf, toHaveDescription: () => vm, toHaveDisplayValue: () => hm, toHaveErrorMessage: () => _m, toHaveFocus: () => em, toHaveFormValues: () => tm, toHaveRole: () => Cl, toHaveStyle: () => Pl, toHaveTextContent: () => Jf, toHaveValue: () => mm });
var ku = He(wp(), 1);
function Sf(e) {
  Object.defineProperty(e, "__esModule", { value: !0, configurable: !0 });
}
function ls(e, t, r, n) {
  Object.defineProperty(e, t, { get: r, set: n, enumerable: !0, configurable: !0 });
}
var Mf = {};
Sf(Mf);
ls(Mf, "default", () => Af);
var Af = class extends Error {
  constructor(e, t, r, n, o) {
    super(e + ":" + r + ":" + n + ": " + t), this.reason = t, this.filename = e, this.line = r, this.column = n, this.source = o;
  }
}, xf = {};
Sf(xf);
ls(xf, "default", () => jf);
var jf = class {
  constructor(e, t, r) {
    this.start = e, this.end = t, this.source = r;
  }
}, l1 = {};
ls(l1, "CssTypes", () => Ce);
var Ce;
(function(e) {
  e.stylesheet = "stylesheet", e.rule = "rule", e.declaration = "declaration", e.comment = "comment", e.container = "container", e.charset = "charset", e.document = "document", e.customMedia = "custom-media", e.fontFace = "font-face", e.host = "host", e.import = "import", e.keyframes = "keyframes", e.keyframe = "keyframe", e.layer = "layer", e.media = "media", e.namespace = "namespace", e.page = "page", e.startingStyle = "starting-style", e.supports = "supports";
})(Ce || (Ce = {}));
var xa = /\/\*[^]*?(?:\*\/|$)/g, i1 = (e, t) => {
  t = t || {};
  let r = 1, n = 1;
  function o(U) {
    let D = U.match(/\n/g);
    D && (r += D.length);
    let F = U.lastIndexOf(`
`);
    n = ~F ? U.length - F : n + U.length;
  }
  function l() {
    let U = { line: r, column: n };
    return function(D) {
      return D.position = new jf(U, { line: r, column: n }, t?.source || ""), p(), D;
    };
  }
  let a = [];
  function i(U) {
    let D = new Af(t?.source || "", U, r, n, e);
    if (t?.silent) a.push(D);
    else throw D;
  }
  function u() {
    let U = d();
    return { type: Ce.stylesheet, stylesheet: { source: t?.source, rules: U, parsingErrors: a } };
  }
  function c() {
    return f(/^{\s*/);
  }
  function s() {
    return f(/^}/);
  }
  function d() {
    let U, D = [];
    for (p(), m(D); e.length && e.charAt(0) !== "}" && (U = he() || ue()); ) U && (D.push(U), m(D));
    return D;
  }
  function f(U) {
    let D = U.exec(e);
    if (!D) return;
    let F = D[0];
    return o(F), e = e.slice(F.length), D;
  }
  function p() {
    f(/^\s*/);
  }
  function m(U) {
    let D;
    for (U = U || []; D = b(); ) D && U.push(D);
    return U;
  }
  function b() {
    let U = l();
    if (e.charAt(0) !== "/" || e.charAt(1) !== "*") return;
    let D = f(/^\/\*[^]*?\*\//);
    return D ? U({ type: Ce.comment, comment: D[0].slice(2, -2) }) : i("End of comment missing");
  }
  function h(U, D, F) {
    let W = D + 1, V = !1, ee = U.indexOf(")", W);
    for (; !V && ee !== -1; ) {
      let ne = U.indexOf("(", W);
      ne !== -1 && ne < ee ? (W = h(U, ne + 1) + 1, ee = U.indexOf(")", W)) : V = !0;
    }
    return V && ee !== -1 ? ee : -1;
  }
  function y() {
    let U = f(/^([^{]+)/);
    if (!U) return;
    let D = Ve(U[0]).replace(xa, "");
    if (D.indexOf(",") === -1) return [D];
    let F = 0, W = D.indexOf("(", F);
    for (; W !== -1; ) {
      let V = h(D, W);
      if (V === -1) break;
      F = V + 1, D = D.substring(0, W) + D.substring(W, V).replace(/,/g, "‌") + D.substring(V), W = D.indexOf("(", F);
    }
    return D = D.replace(/("|')(?:\\\1|.)*?\1/g, (V) => V.replace(/,/g, "‌")), D.split(",").map((V) => Ve(V.replace(/\u200C/g, ",")));
  }
  function g() {
    let U = l(), D = f(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!D) return;
    let F = Ve(D[0]);
    if (!f(/^:\s*/)) return i("property missing ':'");
    let W = f(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/), V = U({ type: Ce.declaration, property: F.replace(xa, ""), value: W ? Ve(W[0]).replace(xa, "") : "" });
    return f(/^[;\s]*/), V;
  }
  function q() {
    let U = [];
    if (!c()) return i("missing '{'");
    m(U);
    let D;
    for (; D = g(); ) D && (U.push(D), m(U));
    return s() ? U : i("missing '}'");
  }
  function C() {
    let U, D = [], F = l();
    for (; U = f(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/); ) D.push(U[1]), f(/^,\s*/);
    if (D.length) return F({ type: Ce.keyframe, values: D, declarations: q() || [] });
  }
  function E() {
    let U = l(), D = f(/^@([-\w]+)?keyframes\s*/);
    if (!D) return;
    let F = D[1], W = f(/^([-\w]+)\s*/);
    if (!W) return i("@keyframes missing name");
    let V = W[1];
    if (!c()) return i("@keyframes missing '{'");
    let ee, ne = m();
    for (; ee = C(); ) ne.push(ee), ne = ne.concat(m());
    return s() ? U({ type: Ce.keyframes, name: V, vendor: F, keyframes: ne }) : i("@keyframes missing '}'");
  }
  function _() {
    let U = l(), D = f(/^@supports *([^{]+)/);
    if (!D) return;
    let F = Ve(D[1]);
    if (!c()) return i("@supports missing '{'");
    let W = m().concat(d());
    return s() ? U({ type: Ce.supports, supports: F, rules: W }) : i("@supports missing '}'");
  }
  function v() {
    let U = l();
    if (!f(/^@host\s*/)) return;
    if (!c()) return i("@host missing '{'");
    let D = m().concat(d());
    return s() ? U({ type: Ce.host, rules: D }) : i("@host missing '}'");
  }
  function w() {
    let U = l(), D = f(/^@container *([^{]+)/);
    if (!D) return;
    let F = Ve(D[1]);
    if (!c()) return i("@container missing '{'");
    let W = m().concat(d());
    return s() ? U({ type: Ce.container, container: F, rules: W }) : i("@container missing '}'");
  }
  function P() {
    let U = l(), D = f(/^@layer *([^{;@]+)/);
    if (!D) return;
    let F = Ve(D[1]);
    if (!c()) return f(/^[;\s]*/), U({ type: Ce.layer, layer: F });
    let W = m().concat(d());
    return s() ? U({ type: Ce.layer, layer: F, rules: W }) : i("@layer missing '}'");
  }
  function j() {
    let U = l(), D = f(/^@media *([^{]+)/);
    if (!D) return;
    let F = Ve(D[1]);
    if (!c()) return i("@media missing '{'");
    let W = m().concat(d());
    return s() ? U({ type: Ce.media, media: F, rules: W }) : i("@media missing '}'");
  }
  function $() {
    let U = l(), D = f(/^@custom-media\s+(--\S+)\s*([^{;\s][^{;]*);/);
    if (D) return U({ type: Ce.customMedia, name: Ve(D[1]), media: Ve(D[2]) });
  }
  function k() {
    let U = l();
    if (!f(/^@page */)) return;
    let D = y() || [];
    if (!c()) return i("@page missing '{'");
    let F = m(), W;
    for (; W = g(); ) F.push(W), F = F.concat(m());
    return s() ? U({ type: Ce.page, selectors: D, declarations: F }) : i("@page missing '}'");
  }
  function L() {
    let U = l(), D = f(/^@([-\w]+)?document *([^{]+)/);
    if (!D) return;
    let F = Ve(D[1]), W = Ve(D[2]);
    if (!c()) return i("@document missing '{'");
    let V = m().concat(d());
    return s() ? U({ type: Ce.document, document: W, vendor: F, rules: V }) : i("@document missing '}'");
  }
  function S() {
    let U = l();
    if (!f(/^@font-face\s*/)) return;
    if (!c()) return i("@font-face missing '{'");
    let D = m(), F;
    for (; F = g(); ) D.push(F), D = D.concat(m());
    return s() ? U({ type: Ce.fontFace, declarations: D }) : i("@font-face missing '}'");
  }
  function B() {
    let U = l();
    if (!f(/^@starting-style\s*/)) return;
    if (!c()) return i("@starting-style missing '{'");
    let D = m().concat(d());
    return s() ? U({ type: Ce.startingStyle, rules: D }) : i("@starting-style missing '}'");
  }
  let z = Z("import"), Y = Z("charset"), K = Z("namespace");
  function Z(U) {
    let D = new RegExp("^@" + U + `\\s*((?::?[^;'"]|"(?:\\\\"|[^"])*?"|'(?:\\\\'|[^'])*?')+)(?:;|$)`);
    return function() {
      let F = l(), W = f(D);
      if (!W) return;
      let V = { type: U };
      return V[U] = W[1].trim(), F(V);
    };
  }
  function he() {
    if (e[0] === "@") return E() || j() || $() || _() || z() || Y() || K() || L() || k() || v() || S() || w() || B() || P();
  }
  function ue() {
    let U = l(), D = y();
    return D ? (m(), U({ type: Ce.rule, selectors: D, declarations: q() || [] })) : i("selector missing");
  }
  return vl(u());
};
function Ve(e) {
  return e ? e.trim() : "";
}
function vl(e, t) {
  let r = e && typeof e.type == "string", n = r ? e : t;
  for (let o in e) {
    let l = e[o];
    Array.isArray(l) ? l.forEach((a) => {
      vl(a, n);
    }) : l && typeof l == "object" && vl(l, n);
  }
  return r && Object.defineProperty(e, "parent", { configurable: !0, writable: !0, enumerable: !1, value: t || null }), e;
}
var s1 = i1, u1 = s1, c1 = Object.prototype.toString;
function d1(e) {
  return typeof e == "function" || c1.call(e) === "[object Function]";
}
function p1(e) {
  var t = Number(e);
  return isNaN(t) ? 0 : t === 0 || !isFinite(t) ? t : (t > 0 ? 1 : -1) * Math.floor(Math.abs(t));
}
var f1 = Math.pow(2, 53) - 1;
function m1(e) {
  var t = p1(e);
  return Math.min(Math.max(t, 0), f1);
}
function Qe(e, t) {
  var r = Array, n = Object(e);
  if (e == null) throw new TypeError("Array.from requires an array-like object - not null or undefined");
  for (var o = m1(n.length), l = d1(r) ? Object(new r(o)) : new Array(o), a = 0, i; a < o; ) i = n[a], l[a] = i, a += 1;
  return l.length = o, l;
}
function Xr(e) {
  "@babel/helpers - typeof";
  return Xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xr(e);
}
function h1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function b1(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Nf(n.key), n);
  }
}
function y1(e, t, r) {
  return t && b1(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function g1(e, t, r) {
  return t = Nf(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Nf(e) {
  var t = v1(e, "string");
  return Xr(t) === "symbol" ? t : String(t);
}
function v1(e, t) {
  if (Xr(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xr(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var _1 = function() {
  function e() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    h1(this, e), g1(this, "items", void 0), this.items = t;
  }
  return y1(e, [{ key: "add", value: function(t) {
    return this.has(t) === !1 && this.items.push(t), this;
  } }, { key: "clear", value: function() {
    this.items = [];
  } }, { key: "delete", value: function(t) {
    var r = this.items.length;
    return this.items = this.items.filter(function(n) {
      return n !== t;
    }), r !== this.items.length;
  } }, { key: "forEach", value: function(t) {
    var r = this;
    this.items.forEach(function(n) {
      t(n, n, r);
    });
  } }, { key: "has", value: function(t) {
    return this.items.indexOf(t) !== -1;
  } }, { key: "size", get: function() {
    return this.items.length;
  } }]), e;
}(), R1 = typeof Set > "u" ? Set : _1;
function je(e) {
  var t;
  return (t = e.localName) !== null && t !== void 0 ? t : e.tagName.toLowerCase();
}
var w1 = { article: "article", aside: "complementary", button: "button", datalist: "listbox", dd: "definition", details: "group", dialog: "dialog", dt: "term", fieldset: "group", figure: "figure", form: "form", footer: "contentinfo", h1: "heading", h2: "heading", h3: "heading", h4: "heading", h5: "heading", h6: "heading", header: "banner", hr: "separator", html: "document", legend: "legend", li: "listitem", math: "math", main: "main", menu: "list", nav: "navigation", ol: "list", optgroup: "group", option: "option", output: "status", progress: "progressbar", section: "region", summary: "button", table: "table", tbody: "rowgroup", textarea: "textbox", tfoot: "rowgroup", td: "cell", th: "columnheader", thead: "rowgroup", tr: "row", ul: "list" }, E1 = { caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]), insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), none: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]) };
function C1(e, t) {
  return ["aria-atomic", "aria-busy", "aria-controls", "aria-current", "aria-description", "aria-describedby", "aria-details", "aria-dropeffect", "aria-flowto", "aria-grabbed", "aria-hidden", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-live", "aria-owns", "aria-relevant", "aria-roledescription"].some(function(r) {
    var n;
    return e.hasAttribute(r) && !((n = E1[t]) !== null && n !== void 0 && n.has(r));
  });
}
function $f(e, t) {
  return C1(e, t);
}
function q1(e) {
  var t = O1(e);
  if (t === null || _l.indexOf(t) !== -1) {
    var r = P1(e);
    if (_l.indexOf(t || "") === -1 || $f(e, r || "")) return r;
  }
  return t;
}
function P1(e) {
  var t = w1[je(e)];
  if (t !== void 0) return t;
  switch (je(e)) {
    case "a":
    case "area":
    case "link":
      if (e.hasAttribute("href")) return "link";
      break;
    case "img":
      return e.getAttribute("alt") === "" && !$f(e, "img") ? "presentation" : "img";
    case "input": {
      var r = e, n = r.type;
      switch (n) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return n;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          return e.hasAttribute("list") ? "combobox" : "textbox";
        case "search":
          return e.hasAttribute("list") ? "combobox" : "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      return e.hasAttribute("multiple") || e.size > 1 ? "listbox" : "combobox";
  }
  return null;
}
function O1(e) {
  var t = e.getAttribute("role");
  if (t !== null) {
    var r = t.trim().split(" ")[0];
    if (r.length > 0) return r;
  }
  return null;
}
var _l = ["presentation", "none"];
function be(e) {
  return e !== null && e.nodeType === e.ELEMENT_NODE;
}
function If(e) {
  return be(e) && je(e) === "caption";
}
function In(e) {
  return be(e) && je(e) === "input";
}
function T1(e) {
  return be(e) && je(e) === "optgroup";
}
function S1(e) {
  return be(e) && je(e) === "select";
}
function M1(e) {
  return be(e) && je(e) === "table";
}
function A1(e) {
  return be(e) && je(e) === "textarea";
}
function x1(e) {
  var t = e.ownerDocument === null ? e : e.ownerDocument, r = t.defaultView;
  if (r === null) throw new TypeError("no window available");
  return r;
}
function j1(e) {
  return be(e) && je(e) === "fieldset";
}
function N1(e) {
  return be(e) && je(e) === "legend";
}
function $1(e) {
  return be(e) && je(e) === "slot";
}
function I1(e) {
  return be(e) && e.ownerSVGElement !== void 0;
}
function L1(e) {
  return be(e) && je(e) === "svg";
}
function k1(e) {
  return I1(e) && je(e) === "title";
}
function Qn(e, t) {
  if (be(e) && e.hasAttribute(t)) {
    var r = e.getAttribute(t).split(" "), n = e.getRootNode ? e.getRootNode() : e.ownerDocument;
    return r.map(function(o) {
      return n.getElementById(o);
    }).filter(function(o) {
      return o !== null;
    });
  }
  return [];
}
function bt(e, t) {
  return be(e) ? t.indexOf(q1(e)) !== -1 : !1;
}
function B1(e) {
  return e.trim().replace(/\s\s+/g, " ");
}
function D1(e, t) {
  if (!be(e)) return !1;
  if (e.hasAttribute("hidden") || e.getAttribute("aria-hidden") === "true") return !0;
  var r = t(e);
  return r.getPropertyValue("display") === "none" || r.getPropertyValue("visibility") === "hidden";
}
function F1(e) {
  return bt(e, ["button", "combobox", "listbox", "textbox"]) || Lf(e, "range");
}
function Lf(e, t) {
  if (!be(e)) return !1;
  switch (t) {
    case "range":
      return bt(e, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
    default:
      throw new TypeError("No knowledge about abstract role '".concat(t, "'. This is likely a bug :("));
  }
}
function Bu(e, t) {
  var r = Qe(e.querySelectorAll(t));
  return Qn(e, "aria-owns").forEach(function(n) {
    r.push.apply(r, Qe(n.querySelectorAll(t)));
  }), r;
}
function U1(e) {
  return S1(e) ? e.selectedOptions || Bu(e, "[selected]") : Bu(e, '[aria-selected="true"]');
}
function H1(e) {
  return bt(e, _l);
}
function V1(e) {
  return If(e);
}
function z1(e) {
  return bt(e, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
function G1(e) {
  return !1;
}
function W1(e) {
  return In(e) || A1(e) ? e.value : e.textContent || "";
}
function Du(e) {
  var t = e.getPropertyValue("content");
  return /^["'].*["']$/.test(t) ? t.slice(1, -1) : "";
}
function kf(e) {
  var t = je(e);
  return t === "button" || t === "input" && e.getAttribute("type") !== "hidden" || t === "meter" || t === "output" || t === "progress" || t === "select" || t === "textarea";
}
function Bf(e) {
  if (kf(e)) return e;
  var t = null;
  return e.childNodes.forEach(function(r) {
    if (t === null && be(r)) {
      var n = Bf(r);
      n !== null && (t = n);
    }
  }), t;
}
function K1(e) {
  if (e.control !== void 0) return e.control;
  var t = e.getAttribute("for");
  return t !== null ? e.ownerDocument.getElementById(t) : Bf(e);
}
function Y1(e) {
  var t = e.labels;
  if (t === null) return t;
  if (t !== void 0) return Qe(t);
  if (!kf(e)) return null;
  var r = e.ownerDocument;
  return Qe(r.querySelectorAll("label")).filter(function(n) {
    return K1(n) === e;
  });
}
function J1(e) {
  var t = e.assignedNodes();
  return t.length === 0 ? Qe(e.childNodes) : t;
}
function Df(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = new R1(), n = x1(e), o = t.compute, l = o === void 0 ? "name" : o, a = t.computedStyleSupportsPseudoElements, i = a === void 0 ? t.getComputedStyle !== void 0 : a, u = t.getComputedStyle, c = u === void 0 ? n.getComputedStyle.bind(n) : u, s = t.hidden, d = s === void 0 ? !1 : s;
  function f(y, g) {
    var q = "";
    if (be(y) && i) {
      var C = c(y, "::before"), E = Du(C);
      q = "".concat(E, " ").concat(q);
    }
    var _ = $1(y) ? J1(y) : Qe(y.childNodes).concat(Qn(y, "aria-owns"));
    if (_.forEach(function(P) {
      var j = h(P, { isEmbeddedInLabel: g.isEmbeddedInLabel, isReferenced: !1, recursion: !0 }), $ = be(P) ? c(P).getPropertyValue("display") : "inline", k = $ !== "inline" ? " " : "";
      q += "".concat(k).concat(j).concat(k);
    }), be(y) && i) {
      var v = c(y, "::after"), w = Du(v);
      q = "".concat(q, " ").concat(w);
    }
    return q.trim();
  }
  function p(y, g) {
    var q = y.getAttributeNode(g);
    return q !== null && !r.has(q) && q.value.trim() !== "" ? (r.add(q), q.value) : null;
  }
  function m(y) {
    return be(y) ? p(y, "title") : null;
  }
  function b(y) {
    if (!be(y)) return null;
    if (j1(y)) {
      r.add(y);
      for (var g = Qe(y.childNodes), q = 0; q < g.length; q += 1) {
        var C = g[q];
        if (N1(C)) return h(C, { isEmbeddedInLabel: !1, isReferenced: !1, recursion: !1 });
      }
    } else if (M1(y)) {
      r.add(y);
      for (var E = Qe(y.childNodes), _ = 0; _ < E.length; _ += 1) {
        var v = E[_];
        if (If(v)) return h(v, { isEmbeddedInLabel: !1, isReferenced: !1, recursion: !1 });
      }
    } else if (L1(y)) {
      r.add(y);
      for (var w = Qe(y.childNodes), P = 0; P < w.length; P += 1) {
        var j = w[P];
        if (k1(j)) return j.textContent;
      }
      return null;
    } else if (je(y) === "img" || je(y) === "area") {
      var $ = p(y, "alt");
      if ($ !== null) return $;
    } else if (T1(y)) {
      var k = p(y, "label");
      if (k !== null) return k;
    }
    if (In(y) && (y.type === "button" || y.type === "submit" || y.type === "reset")) {
      var L = p(y, "value");
      if (L !== null) return L;
      if (y.type === "submit") return "Submit";
      if (y.type === "reset") return "Reset";
    }
    var S = Y1(y);
    if (S !== null && S.length !== 0) return r.add(y), Qe(S).map(function(K) {
      return h(K, { isEmbeddedInLabel: !0, isReferenced: !1, recursion: !0 });
    }).filter(function(K) {
      return K.length > 0;
    }).join(" ");
    if (In(y) && y.type === "image") {
      var B = p(y, "alt");
      if (B !== null) return B;
      var z = p(y, "title");
      return z !== null ? z : "Submit Query";
    }
    if (bt(y, ["button"])) {
      var Y = f(y, { isEmbeddedInLabel: !1 });
      if (Y !== "") return Y;
    }
    return null;
  }
  function h(y, g) {
    if (r.has(y)) return "";
    if (!d && D1(y, c) && !g.isReferenced) return r.add(y), "";
    var q = be(y) ? y.getAttributeNode("aria-labelledby") : null, C = q !== null && !r.has(q) ? Qn(y, "aria-labelledby") : [];
    if (l === "name" && !g.isReferenced && C.length > 0) return r.add(q), C.map(function($) {
      return h($, { isEmbeddedInLabel: g.isEmbeddedInLabel, isReferenced: !0, recursion: !1 });
    }).join(" ");
    var E = g.recursion && F1(y) && l === "name";
    if (!E) {
      var _ = (be(y) && y.getAttribute("aria-label") || "").trim();
      if (_ !== "" && l === "name") return r.add(y), _;
      if (!H1(y)) {
        var v = b(y);
        if (v !== null) return r.add(y), v;
      }
    }
    if (bt(y, ["menu"])) return r.add(y), "";
    if (E || g.isEmbeddedInLabel || g.isReferenced) {
      if (bt(y, ["combobox", "listbox"])) {
        r.add(y);
        var w = U1(y);
        return w.length === 0 ? In(y) ? y.value : "" : Qe(w).map(function($) {
          return h($, { isEmbeddedInLabel: g.isEmbeddedInLabel, isReferenced: !1, recursion: !0 });
        }).join(" ");
      }
      if (Lf(y, "range")) return r.add(y), y.hasAttribute("aria-valuetext") ? y.getAttribute("aria-valuetext") : y.hasAttribute("aria-valuenow") ? y.getAttribute("aria-valuenow") : y.getAttribute("value") || "";
      if (bt(y, ["textbox"])) return r.add(y), W1(y);
    }
    if (z1(y) || be(y) && g.isReferenced || V1(y) || G1()) {
      var P = f(y, { isEmbeddedInLabel: g.isEmbeddedInLabel });
      if (P !== "") return r.add(y), P;
    }
    if (y.nodeType === y.TEXT_NODE) return r.add(y), y.textContent || "";
    if (g.recursion) return r.add(y), f(y, { isEmbeddedInLabel: g.isEmbeddedInLabel });
    var j = m(y);
    return j !== null ? (r.add(y), j) : (r.add(y), "");
  }
  return B1(h(e, { isEmbeddedInLabel: !1, isReferenced: l === "description", recursion: !1 }));
}
function Qr(e) {
  "@babel/helpers - typeof";
  return Qr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qr(e);
}
function Fu(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Uu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fu(Object(r), !0).forEach(function(n) {
      X1(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fu(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function X1(e, t, r) {
  return t = Q1(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Q1(e) {
  var t = Z1(e, "string");
  return Qr(t) === "symbol" ? t : String(t);
}
function Z1(e, t) {
  if (Qr(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Qr(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function eO(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Qn(e, "aria-describedby").map(function(l) {
    return Df(l, Uu(Uu({}, t), {}, { compute: "description" }));
  }).join(" ");
  if (r === "") {
    var n = e.getAttribute("aria-description");
    r = n === null ? "" : n;
  }
  if (r === "") {
    var o = e.getAttribute("title");
    r = o === null ? "" : o;
  }
  return r;
}
function tO(e) {
  return bt(e, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "none", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
function rO(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return tO(e) ? "" : Df(e, t);
}
var is = He(Ep(), 1), nO = He(qp(), 1), Ff = He(Ip(), 1), oO = He(Lp(), 1), Uf = class extends Error {
  constructor(e, t, r, n) {
    super(), Error.captureStackTrace && Error.captureStackTrace(this, r);
    let o = "";
    try {
      o = n.utils.printWithType("Received", t, n.utils.printReceived);
    } catch {
    }
    this.message = [n.utils.matcherHint(`${n.isNot ? ".not" : ""}.${r.name}`, "received", ""), "", `${n.utils.RECEIVED_COLOR("received")} value must ${e}.`, o].join(`
`);
  }
}, Hu = class extends Uf {
  constructor(...e) {
    super("be an HTMLElement or an SVGElement", ...e);
  }
}, Vu = class extends Uf {
  constructor(...e) {
    super("be a Node", ...e);
  }
};
function Hf(e, t, ...r) {
  if (!e || !e.ownerDocument || !e.ownerDocument.defaultView) throw new t(e, ...r);
}
function aO(e, ...t) {
  Hf(e, Vu, ...t);
  let r = e.ownerDocument.defaultView;
  if (!(e instanceof r.Node)) throw new Vu(e, ...t);
}
function pe(e, ...t) {
  Hf(e, Hu, ...t);
  let r = e.ownerDocument.defaultView;
  if (!(e instanceof r.HTMLElement) && !(e instanceof r.SVGElement)) throw new Hu(e, ...t);
}
var lO = class extends Error {
  constructor(e, t, r) {
    super(), Error.captureStackTrace && Error.captureStackTrace(this, t), this.message = [e.message, "", r.utils.RECEIVED_COLOR("Failing css:"), r.utils.RECEIVED_COLOR(`${e.css}`)].join(`
`);
  }
};
function iO(e, ...t) {
  let r = u1(`selector { ${e} }`, { silent: !0 }).stylesheet;
  if (r.parsingErrors && r.parsingErrors.length > 0) {
    let { reason: n, line: o } = r.parsingErrors[0];
    throw new lO({ css: e, message: `Syntax error parsing expected css: ${n} on line: ${o}` }, ...t);
  }
  return r.rules[0].declarations.filter((n) => n.type === "declaration").reduce((n, { property: o, value: l }) => Object.assign(n, { [o]: l }), {});
}
function zu(e, t) {
  return typeof t == "string" ? t : e.utils.stringify(t);
}
function Ae(e, t, r, n, o, l) {
  return [`${t}
`, `${r}:
${e.utils.EXPECTED_COLOR((0, ku.default)(zu(e, n), 2))}`, `${o}:
${e.utils.RECEIVED_COLOR((0, ku.default)(zu(e, l), 2))}`].join(`
`);
}
function sO(e, t) {
  return t instanceof RegExp ? t.test(e) : e.includes(String(t));
}
function xo(e, t) {
  console.warn(`Warning: ${e} has been deprecated and will be removed in future updates.`, t);
}
function jo(e) {
  return e.replace(/\s+/g, " ").trim();
}
function Nt(e) {
  return e.tagName && e.tagName.toLowerCase();
}
function uO({ multiple: e, options: t }) {
  let r = [...t].filter((n) => n.selected);
  if (e) return [...r].map((n) => n.value);
  if (r.length !== 0) return r[0].value;
}
function cO(e) {
  switch (e.type) {
    case "number":
      return e.value === "" ? null : Number(e.value);
    case "checkbox":
      return e.checked;
    default:
      return e.value;
  }
}
var dO = ["meter", "progressbar", "slider", "spinbutton"];
function pO(e) {
  if (dO.includes(e.getAttribute("role"))) return Number(e.getAttribute("aria-valuenow"));
}
function Vf(e) {
  if (e) switch (e.tagName.toLowerCase()) {
    case "input":
      return cO(e);
    case "select":
      return uO(e);
    default:
      return e.value ?? pO(e);
  }
}
function fO(e, { wordConnector: t = ", ", lastWordConnector: r = " and " } = {}) {
  return [e.slice(0, -1).join(t), e[e.length - 1]].join(e.length > 1 ? r : "");
}
function zf(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) return [...new Set(e)].every((r) => new Set(t).has(r));
}
function Rl(e, t) {
  return xo("toBeInTheDOM", "Please use toBeInTheDocument for searching the entire document and toContainElement for searching a specific container."), e && pe(e, Rl, this), t && pe(t, Rl, this), { pass: t ? t.contains(e) : !!e, message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeInTheDOM`, "element", ""), "", "Received:", `  ${this.utils.printReceived(e && e.cloneNode(!1))}`].join(`
`) };
}
function Gf(e) {
  (e !== null || !this.isNot) && pe(e, Gf, this);
  let t = e === null ? !1 : e.ownerDocument === e.getRootNode({ composed: !0 }), r = () => `expected document not to contain element, found ${this.utils.stringify(e.cloneNode(!0))} instead`, n = () => "element could not be found in the document";
  return { pass: t, message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeInTheDocument`, "element", ""), "", this.utils.RECEIVED_COLOR(this.isNot ? r() : n())].join(`
`) };
}
function Wf(e) {
  return xo("toBeEmpty", "Please use instead toBeEmptyDOMElement for finding empty nodes in the DOM."), pe(e, Wf, this), { pass: e.innerHTML === "", message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeEmpty`, "element", ""), "", "Received:", `  ${this.utils.printReceived(e.innerHTML)}`].join(`
`) };
}
function Kf(e) {
  return pe(e, Kf, this), { pass: mO(e), message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeEmptyDOMElement`, "element", ""), "", "Received:", `  ${this.utils.printReceived(e.innerHTML)}`].join(`
`) };
}
function mO(e) {
  return [...e.childNodes].filter((t) => t.nodeType !== 8).length === 0;
}
function wl(e, t) {
  return pe(e, wl, this), t !== null && pe(t, wl, this), { pass: e.contains(t), message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toContainElement`, "element", "element"), "", this.utils.RECEIVED_COLOR(`${this.utils.stringify(e.cloneNode(!1))} ${this.isNot ? "contains:" : "does not contain:"} ${this.utils.stringify(t && t.cloneNode(!1))}
        `)].join(`
`) };
}
function hO(e, t) {
  let r = e.ownerDocument.createElement("div");
  return r.innerHTML = t, r.innerHTML;
}
function Yf(e, t) {
  if (pe(e, Yf, this), typeof t != "string") throw new Error(`.toContainHTML() expects a string value, got ${t}`);
  return { pass: e.outerHTML.includes(hO(e, t)), message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toContainHTML`, "element", ""), "Expected:", `  ${this.utils.EXPECTED_COLOR(t)}`, "Received:", `  ${this.utils.printReceived(e.cloneNode(!0))}`].join(`
`) };
}
function Jf(e, t, r = { normalizeWhitespace: !0 }) {
  aO(e, Jf, this);
  let n = r.normalizeWhitespace ? jo(e.textContent) : e.textContent.replace(/\u00a0/g, " "), o = n !== "" && t === "";
  return { pass: !o && sO(n, t), message: () => {
    let l = this.isNot ? "not to" : "to";
    return Ae(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveTextContent`, "element", ""), o ? "Checking with empty string will always match, use .toBeEmptyDOMElement() instead" : `Expected element ${l} have text content`, t, "Received", n);
  } };
}
function El(e, t) {
  pe(e, El, this);
  let r = eO(e), n = arguments.length === 1, o = !1;
  return n ? o = r !== "" : o = t instanceof RegExp ? t.test(r) : this.equals(r, t), { pass: o, message: () => {
    let l = this.isNot ? "not to" : "to";
    return Ae(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.${El.name}`, "element", ""), `Expected element ${l} have accessible description`, t, "Received", r);
  } };
}
var kr = "aria-invalid", bO = ["false"];
function Xf(e, t) {
  pe(e, Xf, this);
  let r = this.isNot ? "not to" : "to", n = this.isNot ? ".not.toHaveAccessibleErrorMessage" : ".toHaveAccessibleErrorMessage", o = e.getAttribute("aria-errormessage");
  if (o && /\s+/.test(o)) return { pass: !1, message: () => Ae(this, this.utils.matcherHint(n, "element"), "Expected element's `aria-errormessage` attribute to be empty or a single, valid ID", "", "Received", `aria-errormessage="${o}"`) };
  let l = e.getAttribute(kr);
  if (!e.hasAttribute(kr) || bO.includes(l)) return { pass: !1, message: () => Ae(this, this.utils.matcherHint(n, "element"), "Expected element to be marked as invalid with attribute", `${kr}="${String(!0)}"`, "Received", e.hasAttribute("aria-invalid") ? `${kr}="${e.getAttribute(kr)}` : null) };
  let a = jo(e.ownerDocument.getElementById(o)?.textContent ?? "");
  return { pass: t === void 0 ? !!a : t instanceof RegExp ? t.test(a) : this.equals(a, t), message: () => Ae(this, this.utils.matcherHint(n, "element"), `Expected element ${r} have accessible error message`, t ?? "", "Received", a) };
}
var yO = _O(is.elementRoles);
function Cl(e, t) {
  pe(e, Cl, this);
  let r = gO(e);
  return { pass: r.some((n) => n === t), message: () => {
    let n = this.isNot ? "not to" : "to";
    return Ae(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.${Cl.name}`, "element", ""), `Expected element ${n} have role`, t, "Received", r.join(", "));
  } };
}
function gO(e) {
  return e.hasAttribute("role") ? e.getAttribute("role").split(" ").filter(Boolean) : vO(e);
}
function vO(e) {
  for (let { match: t, roles: r } of yO) if (t(e)) return [...r];
  return [];
}
function _O(e) {
  function t({ name: a, attributes: i }) {
    return `${a}${i.map(({ name: u, value: c, constraints: s = [] }) => s.indexOf("undefined") !== -1 ? `:not([${u}])` : c ? `[${u}="${c}"]` : `[${u}]`).join("")}`;
  }
  function r({ attributes: a = [] }) {
    return a.length;
  }
  function n({ specificity: a }, { specificity: i }) {
    return i - a;
  }
  function o(a) {
    let { attributes: i = [] } = a, u = i.findIndex((s) => s.value && s.name === "type" && s.value === "text");
    u >= 0 && (i = [...i.slice(0, u), ...i.slice(u + 1)]);
    let c = t({ ...a, attributes: i });
    return (s) => u >= 0 && s.type !== "text" ? !1 : s.matches(c);
  }
  let l = [];
  for (let [a, i] of e.entries()) l = [...l, { match: o(a), roles: Array.from(i), specificity: r(a) }];
  return l.sort(n);
}
function ql(e, t) {
  pe(e, ql, this);
  let r = rO(e), n = arguments.length === 1, o = !1;
  return n ? o = r !== "" : o = t instanceof RegExp ? t.test(r) : this.equals(r, t), { pass: o, message: () => {
    let l = this.isNot ? "not to" : "to";
    return Ae(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.${ql.name}`, "element", ""), `Expected element ${l} have accessible name`, t, "Received", r);
  } };
}
function Gu(e, t, r) {
  return r === void 0 ? t : `${t}=${e(r)}`;
}
function RO(e, t, r) {
  return r === void 0 ? `element.hasAttribute(${e(t)})` : `element.getAttribute(${e(t)}) === ${e(r)}`;
}
function Qf(e, t, r) {
  pe(e, Qf, this);
  let n = r !== void 0, o = e.hasAttribute(t), l = e.getAttribute(t);
  return { pass: n ? o && this.equals(l, r) : o, message: () => {
    let a = this.isNot ? "not to" : "to", i = o ? Gu(this.utils.stringify, t, l) : null, u = this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveAttribute`, "element", this.utils.printExpected(t), { secondArgument: n ? this.utils.printExpected(r) : void 0, comment: RO(this.utils.stringify, t, r) });
    return Ae(this, u, `Expected the element ${a} have attribute`, Gu(this.utils.stringify, t, r), "Received", i);
  } };
}
function wO(e) {
  let t = e.pop(), r, n;
  return typeof t == "object" && !(t instanceof RegExp) ? (r = e, n = t) : (r = e.concat(t), n = { exact: !1 }), { expectedClassNames: r, options: n };
}
function Wu(e) {
  return e ? e.split(/\s+/).filter((t) => t.length > 0) : [];
}
function Ku(e, t) {
  return e.every((r) => typeof r == "string" ? t.includes(r) : t.some((n) => r.test(n)));
}
function Zf(e, ...t) {
  pe(e, Zf, this);
  let { expectedClassNames: r, options: n } = wO(t), o = Wu(e.getAttribute("class")), l = r.reduce((i, u) => i.concat(typeof u == "string" || !u ? Wu(u) : u), []), a = l.some((i) => i instanceof RegExp);
  if (n.exact && a) throw new Error("Exact option does not support RegExp expected class names");
  return n.exact ? { pass: Ku(l, o) && l.length === o.length, message: () => {
    let i = this.isNot ? "not to" : "to";
    return Ae(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveClass`, "element", this.utils.printExpected(l.join(" "))), `Expected the element ${i} have EXACTLY defined classes`, l.join(" "), "Received", o.join(" "));
  } } : l.length > 0 ? { pass: Ku(l, o), message: () => {
    let i = this.isNot ? "not to" : "to";
    return Ae(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveClass`, "element", this.utils.printExpected(l.join(" "))), `Expected the element ${i} have class`, l.join(" "), "Received", o.join(" "));
  } } : { pass: this.isNot ? o.length > 0 : !1, message: () => this.isNot ? Ae(this, this.utils.matcherHint(".not.toHaveClass", "element", ""), "Expected the element to have classes", "(none)", "Received", o.join(" ")) : [this.utils.matcherHint(".toHaveClass", "element"), "At least one expected class must be provided."].join(`
`) };
}
function EO(e, t) {
  let r = {}, n = e.createElement("div");
  return Object.keys(t).forEach((o) => {
    n.style[o] = t[o], r[o] = n.style[o];
  }), r;
}
function CO(e, t) {
  return !!Object.keys(e).length && Object.entries(e).every(([r, n]) => {
    let o = r.startsWith("--"), l = [r];
    return o || l.push(r.toLowerCase()), l.some((a) => t[a] === n || t.getPropertyValue(a) === n);
  });
}
function Yu(e) {
  return Object.keys(e).sort().map((t) => `${t}: ${e[t]};`).join(`
`);
}
function qO(e, t, r) {
  let n = Array.from(r).filter((o) => t[o] !== void 0).reduce((o, l) => Object.assign(o, { [l]: r.getPropertyValue(l) }), {});
  return e(Yu(t), Yu(n)).replace(`${nO.default.red("+ Received")}
`, "");
}
function Pl(e, t) {
  pe(e, Pl, this);
  let r = typeof t == "object" ? t : iO(t, Pl, this), { getComputedStyle: n } = e.ownerDocument.defaultView, o = EO(e.ownerDocument, r), l = n(e);
  return { pass: CO(o, l), message: () => {
    let a = `${this.isNot ? ".not" : ""}.toHaveStyle`;
    return [this.utils.matcherHint(a, "element", ""), qO(this.utils.diff, o, l)].join(`

`);
  } };
}
function em(e) {
  return pe(e, em, this), { pass: e.ownerDocument.activeElement === e, message: () => [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveFocus`, "element", ""), "", ...this.isNot ? ["Received element is focused:", `  ${this.utils.printReceived(e)}`] : ["Expected element with focus:", `  ${this.utils.printExpected(e)}`, "Received element with focus:", `  ${this.utils.printReceived(e.ownerDocument.activeElement)}`]].join(`
`) };
}
function PO(e) {
  let t = [...new Set(e.map((r) => r.type))];
  if (t.length !== 1) throw new Error("Multiple form elements with the same name must be of the same type");
  switch (t[0]) {
    case "radio": {
      let r = e.find((n) => n.checked);
      return r ? r.value : void 0;
    }
    case "checkbox":
      return e.filter((r) => r.checked).map((r) => r.value);
    default:
      return e.map((r) => r.value);
  }
}
function OO(e, t) {
  let r = [...e.querySelectorAll(`[name="${(0, oO.default)(t)}"]`)];
  if (r.length !== 0) switch (r.length) {
    case 1:
      return Vf(r[0]);
    default:
      return PO(r);
  }
}
function TO(e) {
  return /\[\]$/.test(e) ? e.slice(0, -2) : e;
}
function SO(e) {
  return Array.from(e.elements).map((t) => t.name).reduce((t, r) => ({ ...t, [TO(r)]: OO(e, r) }), {});
}
function tm(e, t) {
  if (pe(e, tm, this), !e.elements) throw new Error("toHaveFormValues must be called on a form or a fieldset");
  let r = SO(e);
  return { pass: Object.entries(t).every(([n, o]) => (0, Ff.default)(r[n], o, zf)), message: () => {
    let n = this.isNot ? "not to" : "to", o = `${this.isNot ? ".not" : ""}.toHaveFormValues`, l = Object.keys(r).filter((a) => t.hasOwnProperty(a)).reduce((a, i) => ({ ...a, [i]: r[i] }), {});
    return [this.utils.matcherHint(o, "element", ""), `Expected the element ${n} have form values`, this.utils.diff(t, l)].join(`

`);
  } };
}
function MO(e) {
  let { getComputedStyle: t } = e.ownerDocument.defaultView, { display: r, visibility: n, opacity: o } = t(e);
  return r !== "none" && n !== "hidden" && n !== "collapse" && o !== "0" && o !== 0;
}
function AO(e, t) {
  let r;
  return t ? r = e.nodeName === "DETAILS" && t.nodeName !== "SUMMARY" ? e.hasAttribute("open") : !0 : r = e.nodeName === "DETAILS" ? e.hasAttribute("open") : !0, !e.hasAttribute("hidden") && r;
}
function rm(e, t) {
  return MO(e) && AO(e, t) && (!e.parentElement || rm(e.parentElement, e));
}
function nm(e) {
  pe(e, nm, this);
  let t = e.ownerDocument === e.getRootNode({ composed: !0 }), r = t && rm(e);
  return { pass: r, message: () => {
    let n = r ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeVisible`, "element", ""), "", `Received element ${n} visible${t ? "" : " (element is not in the document)"}:`, `  ${this.utils.printReceived(e.cloneNode(!1))}`].join(`
`);
  } };
}
var xO = ["fieldset", "input", "select", "optgroup", "option", "button", "textarea"];
function jO(e, t) {
  return Nt(e) === "legend" && Nt(t) === "fieldset" && e.isSameNode(Array.from(t.children).find((r) => Nt(r) === "legend"));
}
function NO(e, t) {
  return am(t) && !jO(e, t);
}
function $O(e) {
  return e.includes("-");
}
function om(e) {
  let t = Nt(e);
  return xO.includes(t) || $O(t);
}
function am(e) {
  return om(e) && e.hasAttribute("disabled");
}
function lm(e) {
  let t = e.parentElement;
  return !!t && (NO(e, t) || lm(t));
}
function im(e) {
  return om(e) && (am(e) || lm(e));
}
function sm(e) {
  pe(e, sm, this);
  let t = im(e);
  return { pass: t, message: () => {
    let r = t ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeDisabled`, "element", ""), "", `Received element ${r} disabled:`, `  ${this.utils.printReceived(e.cloneNode(!1))}`].join(`
`);
  } };
}
function um(e) {
  pe(e, um, this);
  let t = !im(e);
  return { pass: t, message: () => {
    let r = t ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeEnabled`, "element", ""), "", `Received element ${r} enabled:`, `  ${this.utils.printReceived(e.cloneNode(!1))}`].join(`
`);
  } };
}
var IO = ["select", "textarea"], LO = ["input", "select", "textarea"], kO = ["color", "hidden", "range", "submit", "image", "reset"], BO = ["checkbox", "combobox", "gridcell", "listbox", "radiogroup", "spinbutton", "textbox", "tree"];
function DO(e) {
  return IO.includes(Nt(e)) && e.hasAttribute("required");
}
function FO(e) {
  return Nt(e) === "input" && e.hasAttribute("required") && (e.hasAttribute("type") && !kO.includes(e.getAttribute("type")) || !e.hasAttribute("type"));
}
function UO(e) {
  return e.hasAttribute("aria-required") && e.getAttribute("aria-required") === "true" && (LO.includes(Nt(e)) || e.hasAttribute("role") && BO.includes(e.getAttribute("role")));
}
function cm(e) {
  pe(e, cm, this);
  let t = DO(e) || FO(e) || UO(e);
  return { pass: t, message: () => {
    let r = t ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeRequired`, "element", ""), "", `Received element ${r} required:`, `  ${this.utils.printReceived(e.cloneNode(!1))}`].join(`
`);
  } };
}
var HO = ["form", "input", "select", "textarea"];
function VO(e) {
  return e.hasAttribute("aria-invalid") && e.getAttribute("aria-invalid") !== "false";
}
function zO(e) {
  return HO.includes(Nt(e));
}
function dm(e) {
  let t = VO(e);
  return zO(e) ? t || !e.checkValidity() : t;
}
function pm(e) {
  pe(e, pm, this);
  let t = dm(e);
  return { pass: t, message: () => {
    let r = t ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeInvalid`, "element", ""), "", `Received element ${r} currently invalid:`, `  ${this.utils.printReceived(e.cloneNode(!1))}`].join(`
`);
  } };
}
function fm(e) {
  pe(e, fm, this);
  let t = !dm(e);
  return { pass: t, message: () => {
    let r = t ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeValid`, "element", ""), "", `Received element ${r} currently valid:`, `  ${this.utils.printReceived(e.cloneNode(!1))}`].join(`
`);
  } };
}
function mm(e, t) {
  if (pe(e, mm, this), e.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(e.type)) throw new Error("input with type=checkbox or type=radio cannot be used with .toHaveValue(). Use .toBeChecked() for type=checkbox or .toHaveFormValues() instead");
  let r = Vf(e), n = t !== void 0, o = t, l = r;
  return t == r && t !== r && (o = `${t} (${typeof t})`, l = `${r} (${typeof r})`), { pass: n ? (0, Ff.default)(r, t, zf) : !!r, message: () => {
    let a = this.isNot ? "not to" : "to", i = this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveValue`, "element", t);
    return Ae(this, i, `Expected the element ${a} have value`, n ? o : "(any)", "Received", l);
  } };
}
function hm(e, t) {
  pe(e, hm, this);
  let r = e.tagName.toLowerCase();
  if (!["select", "input", "textarea"].includes(r)) throw new Error(".toHaveDisplayValue() currently supports only input, textarea or select elements, try with another matcher instead.");
  if (r === "input" && ["radio", "checkbox"].includes(e.type)) throw new Error(`.toHaveDisplayValue() currently does not support input[type="${e.type}"], try with another matcher instead.`);
  let n = GO(r, e), o = WO(t), l = o.filter((u) => n.some((c) => u instanceof RegExp ? u.test(c) : this.equals(c, String(u)))).length, a = l === n.length, i = l === o.length;
  return { pass: a && i, message: () => Ae(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveDisplayValue`, "element", ""), `Expected element ${this.isNot ? "not " : ""}to have display value`, t, "Received", n) };
}
function GO(e, t) {
  return e === "select" ? Array.from(t).filter((r) => r.selected).map((r) => r.textContent) : [t.value];
}
function WO(e) {
  return e instanceof Array ? e : [e];
}
function bm(e) {
  pe(e, bm, this);
  let t = () => e.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(e.type), r = () => ym(e.getAttribute("role")) && ["true", "false"].includes(e.getAttribute("aria-checked"));
  if (!t() && !r()) return { pass: !1, message: () => `only inputs with type="checkbox" or type="radio" or elements with ${KO()} and a valid aria-checked attribute can be used with .toBeChecked(). Use .toHaveValue() instead` };
  let n = () => t() ? e.checked : e.getAttribute("aria-checked") === "true";
  return { pass: n(), message: () => {
    let o = n() ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBeChecked`, "element", ""), "", `Received element ${o} checked:`, `  ${this.utils.printReceived(e.cloneNode(!1))}`].join(`
`);
  } };
}
function KO() {
  return fO(YO().map((e) => `role="${e}"`), { lastWordConnector: " or " });
}
function YO() {
  return is.roles.keys().filter(ym);
}
function ym(e) {
  return is.roles.get(e)?.props["aria-checked"] !== void 0;
}
function gm(e) {
  pe(e, gm, this);
  let t = () => e.tagName.toLowerCase() === "input" && e.type === "checkbox", r = () => e.getAttribute("role") === "checkbox";
  if (!t() && !r()) return { pass: !1, message: () => 'only inputs with type="checkbox" or elements with role="checkbox" and a valid aria-checked attribute can be used with .toBePartiallyChecked(). Use .toHaveValue() instead' };
  let n = () => {
    let o = e.getAttribute("aria-checked") === "mixed";
    return t() && e.indeterminate || o;
  };
  return { pass: n(), message: () => {
    let o = n() ? "is" : "is not";
    return [this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toBePartiallyChecked`, "element", ""), "", `Received element ${o} partially checked:`, `  ${this.utils.printReceived(e.cloneNode(!1))}`].join(`
`);
  } };
}
function vm(e, t) {
  xo("toHaveDescription", "Please use toHaveAccessibleDescription."), pe(e, vm, this);
  let r = t !== void 0, n = (e.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean), o = "";
  if (n.length > 0) {
    let l = e.ownerDocument, a = n.map((i) => l.getElementById(i)).filter(Boolean);
    o = jo(a.map((i) => i.textContent).join(" "));
  }
  return { pass: r ? t instanceof RegExp ? t.test(o) : this.equals(o, t) : !!o, message: () => {
    let l = this.isNot ? "not to" : "to";
    return Ae(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveDescription`, "element", ""), `Expected the element ${l} have description`, this.utils.printExpected(t), "Received", this.utils.printReceived(o));
  } };
}
function _m(e, t) {
  if (xo("toHaveErrorMessage", "Please use toHaveAccessibleErrorMessage."), pe(e, _m, this), !e.hasAttribute("aria-invalid") || e.getAttribute("aria-invalid") === "false") {
    let l = this.isNot ? ".not" : "";
    return { pass: !1, message: () => Ae(this, this.utils.matcherHint(`${l}.toHaveErrorMessage`, "element", ""), "Expected the element to have invalid state indicated by", 'aria-invalid="true"', "Received", e.hasAttribute("aria-invalid") ? `aria-invalid="${e.getAttribute("aria-invalid")}"` : this.utils.printReceived("")) };
  }
  let r = t !== void 0, n = (e.getAttribute("aria-errormessage") || "").split(/\s+/).filter(Boolean), o = "";
  if (n.length > 0) {
    let l = e.ownerDocument, a = n.map((i) => l.getElementById(i)).filter(Boolean);
    o = jo(a.map((i) => i.textContent).join(" "));
  }
  return { pass: r ? t instanceof RegExp ? t.test(o) : this.equals(o, t) : !!o, message: () => {
    let l = this.isNot ? "not to" : "to";
    return Ae(this, this.utils.matcherHint(`${this.isNot ? ".not" : ""}.toHaveErrorMessage`, "element", ""), `Expected the element ${l} have error message`, this.utils.printExpected(t), "Received", this.utils.printReceived(o));
  } };
}
He(wp(), 1);
He(Ep(), 1);
He(qp(), 1);
He(Ip(), 1);
He(Lp(), 1);
function ft(e, t, r) {
  let n = typeof e;
  if (!r.includes(n)) throw new TypeError(`${t} value must be ${r.join(" or ")}, received "${n}"`);
}
function Ln(e) {
  return e != null && typeof e == "object" && !Array.isArray(e);
}
function JO(e) {
  return e === Object.prototype || e === Function.prototype || e === RegExp.prototype;
}
function Ol(e) {
  return Object.prototype.toString.apply(e).slice(8, -1);
}
function XO(e, t) {
  let r = typeof t == "function" ? t : (n) => t.add(n);
  Object.getOwnPropertyNames(e).forEach(r), Object.getOwnPropertySymbols(e).forEach(r);
}
function Rm(e) {
  let t = /* @__PURE__ */ new Set();
  return JO(e) ? [] : (XO(e, t), Array.from(t));
}
var wm = { forceWritable: !1 };
function Ju(e, t = wm) {
  return Tl(e, /* @__PURE__ */ new WeakMap(), t);
}
function Tl(e, t, r = wm) {
  let n, o;
  if (t.has(e)) return t.get(e);
  if (Array.isArray(e)) {
    for (o = Array(n = e.length), t.set(e, o); n--; ) o[n] = Tl(e[n], t, r);
    return o;
  }
  if (Object.prototype.toString.call(e) === "[object Object]") {
    o = Object.create(Object.getPrototypeOf(e)), t.set(e, o);
    let l = Rm(e);
    for (let a of l) {
      let i = Object.getOwnPropertyDescriptor(e, a);
      if (!i) continue;
      let u = Tl(e[a], t, r);
      r.forceWritable ? Object.defineProperty(o, a, { enumerable: i.enumerable, configurable: !0, writable: !0, value: u }) : "get" in i ? Object.defineProperty(o, a, { ...i, get() {
        return u;
      } }) : Object.defineProperty(o, a, { ...i, value: u });
    }
    return o;
  }
  return e;
}
var Xu = { bold: ["1", "22"], dim: ["2", "22"], italic: ["3", "23"], underline: ["4", "24"], inverse: ["7", "27"], hidden: ["8", "28"], strike: ["9", "29"], black: ["30", "39"], red: ["31", "39"], green: ["32", "39"], yellow: ["33", "39"], blue: ["34", "39"], magenta: ["35", "39"], cyan: ["36", "39"], white: ["37", "39"], brightblack: ["30;1", "39"], brightred: ["31;1", "39"], brightgreen: ["32;1", "39"], brightyellow: ["33;1", "39"], brightblue: ["34;1", "39"], brightmagenta: ["35;1", "39"], brightcyan: ["36;1", "39"], brightwhite: ["37;1", "39"], grey: ["90", "39"] }, QO = { special: "cyan", number: "yellow", bigint: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", symbol: "green", date: "magenta", regexp: "red" }, wr = "…";
function ZO(e, t) {
  let r = Xu[QO[t]] || Xu[t] || "";
  return r ? `\x1B[${r[0]}m${String(e)}\x1B[${r[1]}m` : String(e);
}
function eT({ showHidden: e = !1, depth: t = 2, colors: r = !1, customInspect: n = !0, showProxy: o = !1, maxArrayLength: l = 1 / 0, breakLength: a = 1 / 0, seen: i = [], truncate: u = 1 / 0, stylize: c = String } = {}, s) {
  let d = { showHidden: !!e, depth: Number(t), colors: !!r, customInspect: !!n, showProxy: !!o, maxArrayLength: Number(l), breakLength: Number(a), truncate: Number(u), seen: i, inspect: s, stylize: c };
  return d.colors && (d.stylize = ZO), d;
}
function tT(e) {
  return e >= "\uD800" && e <= "\uDBFF";
}
function Bt(e, t, r = wr) {
  e = String(e);
  let n = r.length, o = e.length;
  if (n > t && o > n) return r;
  if (o > t && o > n) {
    let l = t - n;
    return l > 0 && tT(e[l - 1]) && (l = l - 1), `${e.slice(0, l)}${r}`;
  }
  return e;
}
function nt(e, t, r, n = ", ") {
  r = r || t.inspect;
  let o = e.length;
  if (o === 0) return "";
  let l = t.truncate, a = "", i = "", u = "";
  for (let c = 0; c < o; c += 1) {
    let s = c + 1 === e.length, d = c + 2 === e.length;
    u = `${wr}(${e.length - c})`;
    let f = e[c];
    t.truncate = l - a.length - (s ? 0 : n.length);
    let p = i || r(f, t) + (s ? "" : n), m = a.length + p.length, b = m + u.length;
    if (s && m > l && a.length + u.length <= l || !s && !d && b > l || (i = s ? "" : r(e[c + 1], t) + (d ? "" : n), !s && d && b > l && m + i.length > l)) break;
    if (a += p, !s && !d && m + i.length >= l) {
      u = `${wr}(${e.length - c - 1})`;
      break;
    }
    u = "";
  }
  return `${a}${u}`;
}
function rT(e) {
  return e.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/) ? e : JSON.stringify(e).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
function Zr([e, t], r) {
  return r.truncate -= 2, typeof e == "string" ? e = rT(e) : typeof e != "number" && (e = `[${r.inspect(e, r)}]`), r.truncate -= e.length, t = r.inspect(t, r), `${e}: ${t}`;
}
function nT(e, t) {
  let r = Object.keys(e).slice(e.length);
  if (!e.length && !r.length) return "[]";
  t.truncate -= 4;
  let n = nt(e, t);
  t.truncate -= n.length;
  let o = "";
  return r.length && (o = nt(r.map((l) => [l, e[l]]), t, Zr)), `[ ${n}${o ? `, ${o}` : ""} ]`;
}
var oT = (e) => typeof Buffer == "function" && e instanceof Buffer ? "Buffer" : e[Symbol.toStringTag] ? e[Symbol.toStringTag] : e.constructor.name;
function mt(e, t) {
  let r = oT(e);
  t.truncate -= r.length + 4;
  let n = Object.keys(e).slice(e.length);
  if (!e.length && !n.length) return `${r}[]`;
  let o = "";
  for (let a = 0; a < e.length; a++) {
    let i = `${t.stylize(Bt(e[a], t.truncate), "number")}${a === e.length - 1 ? "" : ", "}`;
    if (t.truncate -= i.length, e[a] !== e.length && t.truncate <= 3) {
      o += `${wr}(${e.length - e[a] + 1})`;
      break;
    }
    o += i;
  }
  let l = "";
  return n.length && (l = nt(n.map((a) => [a, e[a]]), t, Zr)), `${r}[ ${o}${l ? `, ${l}` : ""} ]`;
}
function aT(e, t) {
  let r = e.toJSON();
  if (r === null) return "Invalid Date";
  let n = r.split("T"), o = n[0];
  return t.stylize(`${o}T${Bt(n[1], t.truncate - o.length - 1)}`, "date");
}
function Qu(e, t) {
  let r = e[Symbol.toStringTag] || "Function", n = e.name;
  return n ? t.stylize(`[${r} ${Bt(n, t.truncate - 11)}]`, "special") : t.stylize(`[${r}]`, "special");
}
function lT([e, t], r) {
  return r.truncate -= 4, e = r.inspect(e, r), r.truncate -= e.length, t = r.inspect(t, r), `${e} => ${t}`;
}
function iT(e) {
  let t = [];
  return e.forEach((r, n) => {
    t.push([n, r]);
  }), t;
}
function sT(e, t) {
  return e.size - 1 <= 0 ? "Map{}" : (t.truncate -= 7, `Map{ ${nt(iT(e), t, lT)} }`);
}
var uT = Number.isNaN || ((e) => e !== e);
function Zu(e, t) {
  return uT(e) ? t.stylize("NaN", "number") : e === 1 / 0 ? t.stylize("Infinity", "number") : e === -1 / 0 ? t.stylize("-Infinity", "number") : e === 0 ? t.stylize(1 / e === 1 / 0 ? "+0" : "-0", "number") : t.stylize(Bt(String(e), t.truncate), "number");
}
function ec(e, t) {
  let r = Bt(e.toString(), t.truncate - 1);
  return r !== wr && (r += "n"), t.stylize(r, "bigint");
}
function cT(e, t) {
  let r = e.toString().split("/")[2], n = t.truncate - (2 + r.length), o = e.source;
  return t.stylize(`/${Bt(o, n)}/${r}`, "regexp");
}
function dT(e) {
  let t = [];
  return e.forEach((r) => {
    t.push(r);
  }), t;
}
function pT(e, t) {
  return e.size === 0 ? "Set{}" : (t.truncate -= 7, `Set{ ${nt(dT(e), t)} }`);
}
var tc = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g"), fT = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "'": "\\'", "\\": "\\\\" }, mT = 16;
function hT(e) {
  return fT[e] || `\\u${`0000${e.charCodeAt(0).toString(mT)}`.slice(-4)}`;
}
function rc(e, t) {
  return tc.test(e) && (e = e.replace(tc, hT)), t.stylize(`'${Bt(e, t.truncate - 2)}'`, "string");
}
function nc(e) {
  return "description" in Symbol.prototype ? e.description ? `Symbol(${e.description})` : "Symbol()" : e.toString();
}
var Em = () => "Promise{…}";
try {
  let { getPromiseDetails: e, kPending: t, kRejected: r } = process.binding("util");
  Array.isArray(e(Promise.resolve())) && (Em = (n, o) => {
    let [l, a] = e(n);
    return l === t ? "Promise{<pending>}" : `Promise${l === r ? "!" : ""}{${o.inspect(a, o)}}`;
  });
} catch {
}
var bT = Em;
function kn(e, t) {
  let r = Object.getOwnPropertyNames(e), n = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : [];
  if (r.length === 0 && n.length === 0) return "{}";
  if (t.truncate -= 4, t.seen = t.seen || [], t.seen.includes(e)) return "[Circular]";
  t.seen.push(e);
  let o = nt(r.map((i) => [i, e[i]]), t, Zr), l = nt(n.map((i) => [i, e[i]]), t, Zr);
  t.seen.pop();
  let a = "";
  return o && l && (a = ", "), `{ ${o}${a}${l} }`;
}
var ja = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : !1;
function yT(e, t) {
  let r = "";
  return ja && ja in e && (r = e[ja]), r = r || e.constructor.name, (!r || r === "_class") && (r = "<Anonymous Class>"), t.truncate -= r.length, `${r}${kn(e, t)}`;
}
function gT(e, t) {
  return e.length === 0 ? "Arguments[]" : (t.truncate -= 13, `Arguments[ ${nt(e, t)} ]`);
}
var vT = ["stack", "line", "column", "name", "message", "fileName", "lineNumber", "columnNumber", "number", "description", "cause"];
function _T(e, t) {
  let r = Object.getOwnPropertyNames(e).filter((a) => vT.indexOf(a) === -1), n = e.name;
  t.truncate -= n.length;
  let o = "";
  if (typeof e.message == "string" ? o = Bt(e.message, t.truncate) : r.unshift("message"), o = o ? `: ${o}` : "", t.truncate -= o.length + 5, t.seen = t.seen || [], t.seen.includes(e)) return "[Circular]";
  t.seen.push(e);
  let l = nt(r.map((a) => [a, e[a]]), t, Zr);
  return `${n}${o}${l ? ` { ${l} }` : ""}`;
}
function RT([e, t], r) {
  return r.truncate -= 3, t ? `${r.stylize(String(e), "yellow")}=${r.stylize(`"${t}"`, "string")}` : `${r.stylize(String(e), "yellow")}`;
}
function Sl(e, t) {
  return nt(e, t, Cm, `
`);
}
function Cm(e, t) {
  let r = e.getAttributeNames(), n = e.tagName.toLowerCase(), o = t.stylize(`<${n}`, "special"), l = t.stylize(">", "special"), a = t.stylize(`</${n}>`, "special");
  t.truncate -= n.length * 2 + 5;
  let i = "";
  r.length > 0 && (i += " ", i += nt(r.map((s) => [s, e.getAttribute(s)]), t, RT, " ")), t.truncate -= i.length;
  let u = t.truncate, c = Sl(e.children, t);
  return c && c.length > u && (c = `${wr}(${e.children.length})`), `${o}${i}${l}${c}${a}`;
}
var wT = typeof Symbol == "function" && typeof Symbol.for == "function", Na = wT ? Symbol.for("chai/inspect") : "@@chai/inspect", ur = !1;
try {
  let e = O_("util");
  ur = e.inspect ? e.inspect.custom : !1;
} catch {
  ur = !1;
}
var oc = /* @__PURE__ */ new WeakMap(), ac = {}, lc = { undefined: (e, t) => t.stylize("undefined", "undefined"), null: (e, t) => t.stylize("null", "null"), boolean: (e, t) => t.stylize(String(e), "boolean"), Boolean: (e, t) => t.stylize(String(e), "boolean"), number: Zu, Number: Zu, bigint: ec, BigInt: ec, string: rc, String: rc, function: Qu, Function: Qu, symbol: nc, Symbol: nc, Array: nT, Date: aT, Map: sT, Set: pT, RegExp: cT, Promise: bT, WeakSet: (e, t) => t.stylize("WeakSet{…}", "special"), WeakMap: (e, t) => t.stylize("WeakMap{…}", "special"), Arguments: gT, Int8Array: mt, Uint8Array: mt, Uint8ClampedArray: mt, Int16Array: mt, Uint16Array: mt, Int32Array: mt, Uint32Array: mt, Float32Array: mt, Float64Array: mt, Generator: () => "", DataView: () => "", ArrayBuffer: () => "", Error: _T, HTMLCollection: Sl, NodeList: Sl }, ET = (e, t, r) => Na in e && typeof e[Na] == "function" ? e[Na](t) : ur && ur in e && typeof e[ur] == "function" ? e[ur](t.depth, t) : "inspect" in e && typeof e.inspect == "function" ? e.inspect(t.depth, t) : "constructor" in e && oc.has(e.constructor) ? oc.get(e.constructor)(e, t) : ac[r] ? ac[r](e, t) : "", CT = Object.prototype.toString;
function Ml(e, t = {}) {
  let r = eT(t, Ml), { customInspect: n } = r, o = e === null ? "null" : typeof e;
  if (o === "object" && (o = CT.call(e).slice(8, -1)), o in lc) return lc[o](e, r);
  if (n && e) {
    let a = ET(e, r, o);
    if (a) return typeof a == "string" ? a : Ml(a, r);
  }
  let l = e ? Object.getPrototypeOf(e) : !1;
  return l === Object.prototype || l === null ? kn(e, r) : e && typeof HTMLElement == "function" && e instanceof HTMLElement ? Cm(e, r) : "constructor" in e ? e.constructor !== Object ? yT(e, r) : kn(e, r) : e === Object(e) ? kn(e, r) : r.stylize(String(e), o);
}
var qT = { reset: [0, 0], bold: [1, 22, "\x1B[22m\x1B[1m"], dim: [2, 22, "\x1B[22m\x1B[2m"], italic: [3, 23], underline: [4, 24], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29], black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], gray: [90, 39], bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] }, PT = Object.entries(qT);
function ss(e) {
  return String(e);
}
ss.open = "";
ss.close = "";
function OT(e = !1) {
  let t = typeof process < "u" ? process : void 0, r = t?.env || {}, n = t?.argv || [];
  return !("NO_COLOR" in r || n.includes("--no-color")) && ("FORCE_COLOR" in r || n.includes("--color") || t?.platform === "win32" || e && r.TERM !== "dumb" || "CI" in r) || typeof window < "u" && !!window.chrome;
}
function TT(e = !1) {
  let t = OT(e), r = (a, i, u, c) => {
    let s = "", d = 0;
    do
      s += a.substring(d, c) + u, d = c + i.length, c = a.indexOf(i, d);
    while (~c);
    return s + a.substring(d);
  }, n = (a, i, u = a) => {
    let c = (s) => {
      let d = String(s), f = d.indexOf(i, a.length);
      return ~f ? a + r(d, i, u, f) + i : a + d + i;
    };
    return c.open = a, c.close = i, c;
  }, o = { isColorSupported: t }, l = (a) => `\x1B[${a}m`;
  for (let [a, i] of PT) o[a] = t ? n(l(i[0]), l(i[1]), i[2]) : ss;
  return o;
}
var Re = TT(!1);
function ST(e, t) {
  let r = Object.keys(e), n = t === null ? r : r.sort(t);
  if (Object.getOwnPropertySymbols) for (let o of Object.getOwnPropertySymbols(e)) Object.getOwnPropertyDescriptor(e, o).enumerable && n.push(o);
  return n;
}
function No(e, t, r, n, o, l, a = ": ") {
  let i = "", u = 0, c = e.next();
  if (!c.done) {
    i += t.spacingOuter;
    let s = r + t.indent;
    for (; !c.done; ) {
      if (i += s, u++ === t.maxWidth) {
        i += "…";
        break;
      }
      let d = l(c.value[0], t, s, n, o), f = l(c.value[1], t, s, n, o);
      i += d + a + f, c = e.next(), c.done ? t.min || (i += ",") : i += `,${t.spacingInner}`;
    }
    i += t.spacingOuter + r;
  }
  return i;
}
function us(e, t, r, n, o, l) {
  let a = "", i = 0, u = e.next();
  if (!u.done) {
    a += t.spacingOuter;
    let c = r + t.indent;
    for (; !u.done; ) {
      if (a += c, i++ === t.maxWidth) {
        a += "…";
        break;
      }
      a += l(u.value, t, c, n, o), u = e.next(), u.done ? t.min || (a += ",") : a += `,${t.spacingInner}`;
    }
    a += t.spacingOuter + r;
  }
  return a;
}
function Zn(e, t, r, n, o, l) {
  let a = "";
  e = e instanceof ArrayBuffer ? new DataView(e) : e;
  let i = (c) => c instanceof DataView, u = i(e) ? e.byteLength : e.length;
  if (u > 0) {
    a += t.spacingOuter;
    let c = r + t.indent;
    for (let s = 0; s < u; s++) {
      if (a += c, s === t.maxWidth) {
        a += "…";
        break;
      }
      (i(e) || s in e) && (a += l(i(e) ? e.getInt8(s) : e[s], t, c, n, o)), s < u - 1 ? a += `,${t.spacingInner}` : t.min || (a += ",");
    }
    a += t.spacingOuter + r;
  }
  return a;
}
function cs(e, t, r, n, o, l) {
  let a = "", i = ST(e, t.compareKeys);
  if (i.length > 0) {
    a += t.spacingOuter;
    let u = r + t.indent;
    for (let c = 0; c < i.length; c++) {
      let s = i[c], d = l(s, t, u, n, o), f = l(e[s], t, u, n, o);
      a += `${u + d}: ${f}`, c < i.length - 1 ? a += `,${t.spacingInner}` : t.min || (a += ",");
    }
    a += t.spacingOuter + r;
  }
  return a;
}
var MT = typeof Symbol == "function" && Symbol.for ? Symbol.for("jest.asymmetricMatcher") : 1267621, $a = " ", AT = (e, t, r, n, o, l) => {
  let a = e.toString();
  if (a === "ArrayContaining" || a === "ArrayNotContaining") return ++n > t.maxDepth ? `[${a}]` : `${a + $a}[${Zn(e.sample, t, r, n, o, l)}]`;
  if (a === "ObjectContaining" || a === "ObjectNotContaining") return ++n > t.maxDepth ? `[${a}]` : `${a + $a}{${cs(e.sample, t, r, n, o, l)}}`;
  if (a === "StringMatching" || a === "StringNotMatching" || a === "StringContaining" || a === "StringNotContaining") return a + $a + l(e.sample, t, r, n, o);
  if (typeof e.toAsymmetricMatcher != "function") throw new TypeError(`Asymmetric matcher ${e.constructor.name} does not implement toAsymmetricMatcher()`);
  return e.toAsymmetricMatcher();
}, xT = (e) => e && e.$$typeof === MT, jT = { serialize: AT, test: xT }, NT = " ", qm = /* @__PURE__ */ new Set(["DOMStringMap", "NamedNodeMap"]), $T = /^(?:HTML\w*Collection|NodeList)$/;
function IT(e) {
  return qm.has(e) || $T.test(e);
}
var LT = (e) => e && e.constructor && !!e.constructor.name && IT(e.constructor.name);
function kT(e) {
  return e.constructor.name === "NamedNodeMap";
}
var BT = (e, t, r, n, o, l) => {
  let a = e.constructor.name;
  return ++n > t.maxDepth ? `[${a}]` : (t.min ? "" : a + NT) + (qm.has(a) ? `{${cs(kT(e) ? [...e].reduce((i, u) => (i[u.name] = u.value, i), {}) : { ...e }, t, r, n, o, l)}}` : `[${Zn([...e], t, r, n, o, l)}]`);
}, DT = { serialize: BT, test: LT };
function Pm(e) {
  return e.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function ds(e, t, r, n, o, l, a) {
  let i = n + r.indent, u = r.colors;
  return e.map((c) => {
    let s = t[c], d = a(s, r, i, o, l);
    return typeof s != "string" && (d.includes(`
`) && (d = r.spacingOuter + i + d + r.spacingOuter + n), d = `{${d}}`), `${r.spacingInner + n + u.prop.open + c + u.prop.close}=${u.value.open}${d}${u.value.close}`;
  }).join("");
}
function ps(e, t, r, n, o, l) {
  return e.map((a) => t.spacingOuter + r + (typeof a == "string" ? Om(a, t) : l(a, t, r, n, o))).join("");
}
function Om(e, t) {
  let r = t.colors.content;
  return r.open + Pm(e) + r.close;
}
function FT(e, t) {
  let r = t.colors.comment;
  return `${r.open}<!--${Pm(e)}-->${r.close}`;
}
function fs(e, t, r, n, o) {
  let l = n.colors.tag;
  return `${l.open}<${e}${t && l.close + t + n.spacingOuter + o + l.open}${r ? `>${l.close}${r}${n.spacingOuter}${o}${l.open}</${e}` : `${t && !n.min ? "" : " "}/`}>${l.close}`;
}
function ms(e, t) {
  let r = t.colors.tag;
  return `${r.open}<${e}${r.close} …${r.open} />${r.close}`;
}
var UT = 1, Tm = 3, Sm = 8, Mm = 11, HT = /^(?:(?:HTML|SVG)\w*)?Element$/;
function VT(e) {
  try {
    return typeof e.hasAttribute == "function" && e.hasAttribute("is");
  } catch {
    return !1;
  }
}
function zT(e) {
  let t = e.constructor.name, { nodeType: r, tagName: n } = e, o = typeof n == "string" && n.includes("-") || VT(e);
  return r === UT && (HT.test(t) || o) || r === Tm && t === "Text" || r === Sm && t === "Comment" || r === Mm && t === "DocumentFragment";
}
var GT = (e) => {
  var t;
  return ((t = e?.constructor) == null ? void 0 : t.name) && zT(e);
};
function WT(e) {
  return e.nodeType === Tm;
}
function KT(e) {
  return e.nodeType === Sm;
}
function Ia(e) {
  return e.nodeType === Mm;
}
var YT = (e, t, r, n, o, l) => {
  if (WT(e)) return Om(e.data, t);
  if (KT(e)) return FT(e.data, t);
  let a = Ia(e) ? "DocumentFragment" : e.tagName.toLowerCase();
  return ++n > t.maxDepth ? ms(a, t) : fs(a, ds(Ia(e) ? [] : Array.from(e.attributes, (i) => i.name).sort(), Ia(e) ? {} : [...e.attributes].reduce((i, u) => (i[u.name] = u.value, i), {}), t, r + t.indent, n, o, l), ps(Array.prototype.slice.call(e.childNodes || e.children), t, r + t.indent, n, o, l), t, r);
}, JT = { serialize: YT, test: GT }, XT = "@@__IMMUTABLE_ITERABLE__@@", QT = "@@__IMMUTABLE_LIST__@@", ZT = "@@__IMMUTABLE_KEYED__@@", eS = "@@__IMMUTABLE_MAP__@@", ic = "@@__IMMUTABLE_ORDERED__@@", tS = "@@__IMMUTABLE_RECORD__@@", rS = "@@__IMMUTABLE_SEQ__@@", nS = "@@__IMMUTABLE_SET__@@", oS = "@@__IMMUTABLE_STACK__@@", Er = (e) => `Immutable.${e}`, $o = (e) => `[${e}]`, en = " ", sc = "…";
function aS(e, t, r, n, o, l, a) {
  return ++n > t.maxDepth ? $o(Er(a)) : `${Er(a) + en}{${No(e.entries(), t, r, n, o, l)}}`;
}
function lS(e) {
  let t = 0;
  return { next() {
    if (t < e._keys.length) {
      let r = e._keys[t++];
      return { done: !1, value: [r, e.get(r)] };
    }
    return { done: !0, value: void 0 };
  } };
}
function iS(e, t, r, n, o, l) {
  let a = Er(e._name || "Record");
  return ++n > t.maxDepth ? $o(a) : `${a + en}{${No(lS(e), t, r, n, o, l)}}`;
}
function sS(e, t, r, n, o, l) {
  let a = Er("Seq");
  return ++n > t.maxDepth ? $o(a) : e[ZT] ? `${a + en}{${e._iter || e._object ? No(e.entries(), t, r, n, o, l) : sc}}` : `${a + en}[${e._iter || e._array || e._collection || e._iterable ? us(e.values(), t, r, n, o, l) : sc}]`;
}
function La(e, t, r, n, o, l, a) {
  return ++n > t.maxDepth ? $o(Er(a)) : `${Er(a) + en}[${us(e.values(), t, r, n, o, l)}]`;
}
var uS = (e, t, r, n, o, l) => e[eS] ? aS(e, t, r, n, o, l, e[ic] ? "OrderedMap" : "Map") : e[QT] ? La(e, t, r, n, o, l, "List") : e[nS] ? La(e, t, r, n, o, l, e[ic] ? "OrderedSet" : "Set") : e[oS] ? La(e, t, r, n, o, l, "Stack") : e[rS] ? sS(e, t, r, n, o, l) : iS(e, t, r, n, o, l), cS = (e) => e && (e[XT] === !0 || e[tS] === !0), dS = { serialize: uS, test: cS }, Al = { exports: {} }, se = {}, uc;
function pS() {
  if (uc) return se;
  uc = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), a = Symbol.for("react.context"), i = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function b(h) {
    if (typeof h == "object" && h !== null) {
      var y = h.$$typeof;
      switch (y) {
        case e:
          switch (h = h.type, h) {
            case r:
            case o:
            case n:
            case c:
            case s:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case i:
                case a:
                case u:
                case f:
                case d:
                case l:
                  return h;
                default:
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return se.ContextConsumer = a, se.ContextProvider = l, se.Element = e, se.ForwardRef = u, se.Fragment = r, se.Lazy = f, se.Memo = d, se.Portal = t, se.Profiler = o, se.StrictMode = n, se.Suspense = c, se.SuspenseList = s, se.isAsyncMode = function() {
    return !1;
  }, se.isConcurrentMode = function() {
    return !1;
  }, se.isContextConsumer = function(h) {
    return b(h) === a;
  }, se.isContextProvider = function(h) {
    return b(h) === l;
  }, se.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, se.isForwardRef = function(h) {
    return b(h) === u;
  }, se.isFragment = function(h) {
    return b(h) === r;
  }, se.isLazy = function(h) {
    return b(h) === f;
  }, se.isMemo = function(h) {
    return b(h) === d;
  }, se.isPortal = function(h) {
    return b(h) === t;
  }, se.isProfiler = function(h) {
    return b(h) === o;
  }, se.isStrictMode = function(h) {
    return b(h) === n;
  }, se.isSuspense = function(h) {
    return b(h) === c;
  }, se.isSuspenseList = function(h) {
    return b(h) === s;
  }, se.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === r || h === o || h === n || h === c || h === s || h === p || typeof h == "object" && h !== null && (h.$$typeof === f || h.$$typeof === d || h.$$typeof === l || h.$$typeof === a || h.$$typeof === u || h.$$typeof === m || h.getModuleId !== void 0);
  }, se.typeOf = b, se;
}
var de = {}, cc;
function fS() {
  return cc || (cc = 1, Wt.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), a = Symbol.for("react.context"), i = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m = !1, b = !1, h = !1, y = !1, g = !1, q;
    q = Symbol.for("react.module.reference");
    function C(I) {
      return !!(typeof I == "string" || typeof I == "function" || I === r || I === o || g || I === n || I === c || I === s || y || I === p || m || b || h || typeof I == "object" && I !== null && (I.$$typeof === f || I.$$typeof === d || I.$$typeof === l || I.$$typeof === a || I.$$typeof === u || I.$$typeof === q || I.getModuleId !== void 0));
    }
    function E(I) {
      if (typeof I == "object" && I !== null) {
        var le = I.$$typeof;
        switch (le) {
          case e:
            var fe = I.type;
            switch (fe) {
              case r:
              case o:
              case n:
              case c:
              case s:
                return fe;
              default:
                var ge = fe && fe.$$typeof;
                switch (ge) {
                  case i:
                  case a:
                  case u:
                  case f:
                  case d:
                  case l:
                    return ge;
                  default:
                    return le;
                }
            }
          case t:
            return le;
        }
      }
    }
    var _ = a, v = l, w = e, P = u, j = r, $ = f, k = d, L = t, S = o, B = n, z = c, Y = s, K = !1, Z = !1;
    function he(I) {
      return K || (K = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function ue(I) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(I) {
      return E(I) === a;
    }
    function D(I) {
      return E(I) === l;
    }
    function F(I) {
      return typeof I == "object" && I !== null && I.$$typeof === e;
    }
    function W(I) {
      return E(I) === u;
    }
    function V(I) {
      return E(I) === r;
    }
    function ee(I) {
      return E(I) === f;
    }
    function ne(I) {
      return E(I) === d;
    }
    function Ie(I) {
      return E(I) === t;
    }
    function A(I) {
      return E(I) === o;
    }
    function G(I) {
      return E(I) === n;
    }
    function H(I) {
      return E(I) === c;
    }
    function Q(I) {
      return E(I) === s;
    }
    de.ContextConsumer = _, de.ContextProvider = v, de.Element = w, de.ForwardRef = P, de.Fragment = j, de.Lazy = $, de.Memo = k, de.Portal = L, de.Profiler = S, de.StrictMode = B, de.Suspense = z, de.SuspenseList = Y, de.isAsyncMode = he, de.isConcurrentMode = ue, de.isContextConsumer = U, de.isContextProvider = D, de.isElement = F, de.isForwardRef = W, de.isFragment = V, de.isLazy = ee, de.isMemo = ne, de.isPortal = Ie, de.isProfiler = A, de.isStrictMode = G, de.isSuspense = H, de.isSuspenseList = Q, de.isValidElementType = C, de.typeOf = E;
  }()), de;
}
Wt.NODE_ENV === "production" ? Al.exports = pS() : Al.exports = fS();
var Ht = Al.exports;
function Am(e, t = []) {
  if (Array.isArray(e)) for (let r of e) Am(r, t);
  else e != null && e !== !1 && e !== "" && t.push(e);
  return t;
}
function dc(e) {
  let t = e.type;
  if (typeof t == "string") return t;
  if (typeof t == "function") return t.displayName || t.name || "Unknown";
  if (Ht.isFragment(e)) return "React.Fragment";
  if (Ht.isSuspense(e)) return "React.Suspense";
  if (typeof t == "object" && t !== null) {
    if (Ht.isContextProvider(e)) return "Context.Provider";
    if (Ht.isContextConsumer(e)) return "Context.Consumer";
    if (Ht.isForwardRef(e)) {
      if (t.displayName) return t.displayName;
      let r = t.render.displayName || t.render.name || "";
      return r === "" ? "ForwardRef" : `ForwardRef(${r})`;
    }
    if (Ht.isMemo(e)) {
      let r = t.displayName || t.type.displayName || t.type.name || "";
      return r === "" ? "Memo" : `Memo(${r})`;
    }
  }
  return "UNDEFINED";
}
function mS(e) {
  let { props: t } = e;
  return Object.keys(t).filter((r) => r !== "children" && t[r] !== void 0).sort();
}
var hS = (e, t, r, n, o, l) => ++n > t.maxDepth ? ms(dc(e), t) : fs(dc(e), ds(mS(e), e.props, t, r + t.indent, n, o, l), ps(Am(e.props.children), t, r + t.indent, n, o, l), t, r), bS = (e) => e != null && Ht.isElement(e), yS = { serialize: hS, test: bS }, gS = typeof Symbol == "function" && Symbol.for ? Symbol.for("react.test.json") : 245830487;
function vS(e) {
  let { props: t } = e;
  return t ? Object.keys(t).filter((r) => t[r] !== void 0).sort() : [];
}
var _S = (e, t, r, n, o, l) => ++n > t.maxDepth ? ms(e.type, t) : fs(e.type, e.props ? ds(vS(e), e.props, t, r + t.indent, n, o, l) : "", e.children ? ps(e.children, t, r + t.indent, n, o, l) : "", t, r), RS = (e) => e && e.$$typeof === gS, wS = { serialize: _S, test: RS }, xm = Object.prototype.toString, ES = Date.prototype.toISOString, CS = Error.prototype.toString, pc = RegExp.prototype.toString;
function ka(e) {
  return typeof e.constructor == "function" && e.constructor.name || "Object";
}
function qS(e) {
  return typeof window < "u" && e === window;
}
var PS = /^Symbol\((.*)\)(.*)$/, OS = /\n/g, jm = class extends Error {
  constructor(e, t) {
    super(e), this.stack = t, this.name = this.constructor.name;
  }
};
function TS(e) {
  return e === "[object Array]" || e === "[object ArrayBuffer]" || e === "[object DataView]" || e === "[object Float32Array]" || e === "[object Float64Array]" || e === "[object Int8Array]" || e === "[object Int16Array]" || e === "[object Int32Array]" || e === "[object Uint8Array]" || e === "[object Uint8ClampedArray]" || e === "[object Uint16Array]" || e === "[object Uint32Array]";
}
function SS(e) {
  return Object.is(e, -0) ? "-0" : String(e);
}
function MS(e) {
  return `${e}n`;
}
function fc(e, t) {
  return t ? `[Function ${e.name || "anonymous"}]` : "[Function]";
}
function mc(e) {
  return String(e).replace(PS, "Symbol($1)");
}
function hc(e) {
  return `[${CS.call(e)}]`;
}
function Nm(e, t, r, n) {
  if (e === !0 || e === !1) return `${e}`;
  if (e === void 0) return "undefined";
  if (e === null) return "null";
  let o = typeof e;
  if (o === "number") return SS(e);
  if (o === "bigint") return MS(e);
  if (o === "string") return n ? `"${e.replaceAll(/"|\\/g, "\\$&")}"` : `"${e}"`;
  if (o === "function") return fc(e, t);
  if (o === "symbol") return mc(e);
  let l = xm.call(e);
  return l === "[object WeakMap]" ? "WeakMap {}" : l === "[object WeakSet]" ? "WeakSet {}" : l === "[object Function]" || l === "[object GeneratorFunction]" ? fc(e, t) : l === "[object Symbol]" ? mc(e) : l === "[object Date]" ? Number.isNaN(+e) ? "Date { NaN }" : ES.call(e) : l === "[object Error]" ? hc(e) : l === "[object RegExp]" ? r ? pc.call(e).replaceAll(/[$()*+.?[\\\]^{|}]/g, "\\$&") : pc.call(e) : e instanceof Error ? hc(e) : null;
}
function $m(e, t, r, n, o, l) {
  if (o.includes(e)) return "[Circular]";
  o = [...o], o.push(e);
  let a = ++n > t.maxDepth, i = t.min;
  if (t.callToJSON && !a && e.toJSON && typeof e.toJSON == "function" && !l) return At(e.toJSON(), t, r, n, o, !0);
  let u = xm.call(e);
  return u === "[object Arguments]" ? a ? "[Arguments]" : `${i ? "" : "Arguments "}[${Zn(e, t, r, n, o, At)}]` : TS(u) ? a ? `[${e.constructor.name}]` : `${i || !t.printBasicPrototype && e.constructor.name === "Array" ? "" : `${e.constructor.name} `}[${Zn(e, t, r, n, o, At)}]` : u === "[object Map]" ? a ? "[Map]" : `Map {${No(e.entries(), t, r, n, o, At, " => ")}}` : u === "[object Set]" ? a ? "[Set]" : `Set {${us(e.values(), t, r, n, o, At)}}` : a || qS(e) ? `[${ka(e)}]` : `${i || !t.printBasicPrototype && ka(e) === "Object" ? "" : `${ka(e)} `}{${cs(e, t, r, n, o, At)}}`;
}
function AS(e) {
  return e.serialize != null;
}
function Im(e, t, r, n, o, l) {
  let a;
  try {
    a = AS(e) ? e.serialize(t, r, n, o, l, At) : e.print(t, (i) => At(i, r, n, o, l), (i) => {
      let u = n + r.indent;
      return u + i.replaceAll(OS, `
${u}`);
    }, { edgeSpacing: r.spacingOuter, min: r.min, spacing: r.spacingInner }, r.colors);
  } catch (i) {
    throw new jm(i.message, i.stack);
  }
  if (typeof a != "string") throw new TypeError(`pretty-format: Plugin must return type "string" but instead returned "${typeof a}".`);
  return a;
}
function Lm(e, t) {
  for (let r of e) try {
    if (r.test(t)) return r;
  } catch (n) {
    throw new jm(n.message, n.stack);
  }
  return null;
}
function At(e, t, r, n, o, l) {
  let a = Lm(t.plugins, e);
  if (a !== null) return Im(a, e, t, r, n, o);
  let i = Nm(e, t.printFunctionName, t.escapeRegex, t.escapeString);
  return i !== null ? i : $m(e, t, r, n, o, l);
}
var hs = { comment: "gray", content: "reset", prop: "yellow", tag: "cyan", value: "green" }, km = Object.keys(hs), Xe = { callToJSON: !0, compareKeys: void 0, escapeRegex: !1, escapeString: !0, highlight: !1, indent: 2, maxDepth: Number.POSITIVE_INFINITY, maxWidth: Number.POSITIVE_INFINITY, min: !1, plugins: [], printBasicPrototype: !0, printFunctionName: !0, theme: hs };
function xS(e) {
  for (let t of Object.keys(e)) if (!Object.prototype.hasOwnProperty.call(Xe, t)) throw new Error(`pretty-format: Unknown option "${t}".`);
  if (e.min && e.indent !== void 0 && e.indent !== 0) throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
}
function jS() {
  return km.reduce((e, t) => {
    let r = hs[t], n = r && Re[r];
    if (n && typeof n.close == "string" && typeof n.open == "string") e[t] = n;
    else throw new Error(`pretty-format: Option "theme" has a key "${t}" whose value "${r}" is undefined in ansi-styles.`);
    return e;
  }, /* @__PURE__ */ Object.create(null));
}
function NS() {
  return km.reduce((e, t) => (e[t] = { close: "", open: "" }, e), /* @__PURE__ */ Object.create(null));
}
function Bm(e) {
  return e?.printFunctionName ?? Xe.printFunctionName;
}
function Dm(e) {
  return e?.escapeRegex ?? Xe.escapeRegex;
}
function Fm(e) {
  return e?.escapeString ?? Xe.escapeString;
}
function bc(e) {
  return { callToJSON: e?.callToJSON ?? Xe.callToJSON, colors: e?.highlight ? jS() : NS(), compareKeys: typeof e?.compareKeys == "function" || e?.compareKeys === null ? e.compareKeys : Xe.compareKeys, escapeRegex: Dm(e), escapeString: Fm(e), indent: e?.min ? "" : $S(e?.indent ?? Xe.indent), maxDepth: e?.maxDepth ?? Xe.maxDepth, maxWidth: e?.maxWidth ?? Xe.maxWidth, min: e?.min ?? Xe.min, plugins: e?.plugins ?? Xe.plugins, printBasicPrototype: e?.printBasicPrototype ?? !0, printFunctionName: Bm(e), spacingInner: e?.min ? " " : `
`, spacingOuter: e?.min ? "" : `
` };
}
function $S(e) {
  return Array.from({ length: e + 1 }).join(" ");
}
function it(e, t) {
  if (t && (xS(t), t.plugins)) {
    let n = Lm(t.plugins, e);
    if (n !== null) return Im(n, e, bc(t), "", 0, []);
  }
  let r = Nm(e, Bm(t), Dm(t), Fm(t));
  return r !== null ? r : $m(e, bc(t), "", 0, []);
}
var Um = { AsymmetricMatcher: jT, DOMCollection: DT, DOMElement: JT, Immutable: dS, ReactElement: yS, ReactTestComponent: wS }, { AsymmetricMatcher: IS, DOMCollection: LS, DOMElement: kS, Immutable: BS, ReactElement: DS, ReactTestComponent: FS } = Um, yc = [FS, DS, kS, LS, BS, IS];
function Ke(e, t = 10, { maxLength: r, ...n } = {}) {
  let o = r ?? 1e4, l;
  try {
    l = it(e, { maxDepth: t, escapeString: !1, plugins: yc, ...n });
  } catch {
    l = it(e, { callToJSON: !1, maxDepth: t, escapeString: !1, plugins: yc, ...n });
  }
  return l.length >= o && t > 1 ? Ke(e, Math.floor(t / 2)) : l;
}
var US = /%[sdjifoOc%]/g;
function HS(...e) {
  if (typeof e[0] != "string") {
    let l = [];
    for (let a = 0; a < e.length; a++) l.push(Br(e[a], { depth: 0, colors: !1 }));
    return l.join(" ");
  }
  let t = e.length, r = 1, n = e[0], o = String(n).replace(US, (l) => {
    if (l === "%%") return "%";
    if (r >= t) return l;
    switch (l) {
      case "%s": {
        let a = e[r++];
        return typeof a == "bigint" ? `${a.toString()}n` : typeof a == "number" && a === 0 && 1 / a < 0 ? "-0" : typeof a == "object" && a !== null ? Br(a, { depth: 0, colors: !1 }) : String(a);
      }
      case "%d": {
        let a = e[r++];
        return typeof a == "bigint" ? `${a.toString()}n` : Number(a).toString();
      }
      case "%i": {
        let a = e[r++];
        return typeof a == "bigint" ? `${a.toString()}n` : Number.parseInt(String(a)).toString();
      }
      case "%f":
        return Number.parseFloat(String(e[r++])).toString();
      case "%o":
        return Br(e[r++], { showHidden: !0, showProxy: !0 });
      case "%O":
        return Br(e[r++]);
      case "%c":
        return r++, "";
      case "%j":
        try {
          return JSON.stringify(e[r++]);
        } catch (a) {
          let i = a.message;
          if (i.includes("circular structure") || i.includes("cyclic structures") || i.includes("cyclic object")) return "[Circular]";
          throw a;
        }
      default:
        return l;
    }
  });
  for (let l = e[r]; r < t; l = e[++r]) l === null || typeof l != "object" ? o += ` ${l}` : o += ` ${Br(l)}`;
  return o;
}
function Br(e, t = {}) {
  return t.truncate === 0 && (t.truncate = Number.POSITIVE_INFINITY), Ml(e, t);
}
var Hm;
Hm = /\r?\n|[\r\u2028\u2029]/y;
RegExp(Hm.source);
var Vm = { keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"], strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"] };
new Set(Vm.keyword);
new Set(Vm.strict);
function gc(e) {
  if (e === void 0) return "undefined";
  if (e === null) return "null";
  if (Array.isArray(e)) return "array";
  if (typeof e == "boolean") return "boolean";
  if (typeof e == "function") return "function";
  if (typeof e == "number") return "number";
  if (typeof e == "string") return "string";
  if (typeof e == "bigint") return "bigint";
  if (typeof e == "object") {
    if (e != null) {
      if (e.constructor === RegExp) return "regexp";
      if (e.constructor === Map) return "map";
      if (e.constructor === Set) return "set";
      if (e.constructor === Date) return "date";
    }
    return "object";
  } else if (typeof e == "symbol") return "symbol";
  throw new Error(`value of unknown type: ${e}`);
}
var xe = -1, Te = 1, Ee = 0, _e = class {
  0;
  1;
  constructor(e, t) {
    this[0] = e, this[1] = t;
  }
}, VS = function(e, t) {
  if (!e || !t || e.charAt(0) !== t.charAt(0)) return 0;
  let r = 0, n = Math.min(e.length, t.length), o = n, l = 0;
  for (; r < o; ) e.substring(l, o) === t.substring(l, o) ? (r = o, l = r) : n = o, o = Math.floor((n - r) / 2 + r);
  return o;
}, zm = function(e, t) {
  if (!e || !t || e.charAt(e.length - 1) !== t.charAt(t.length - 1)) return 0;
  let r = 0, n = Math.min(e.length, t.length), o = n, l = 0;
  for (; r < o; ) e.substring(e.length - o, e.length - l) === t.substring(t.length - o, t.length - l) ? (r = o, l = r) : n = o, o = Math.floor((n - r) / 2 + r);
  return o;
}, vc = function(e, t) {
  let r = e.length, n = t.length;
  if (r === 0 || n === 0) return 0;
  r > n ? e = e.substring(r - n) : r < n && (t = t.substring(0, r));
  let o = Math.min(r, n);
  if (e === t) return o;
  let l = 0, a = 1;
  for (; ; ) {
    let i = e.substring(o - a), u = t.indexOf(i);
    if (u === -1) return l;
    a += u, (u === 0 || e.substring(o - a) === t.substring(0, a)) && (l = a, a++);
  }
}, zS = function(e) {
  let t = !1, r = [], n = 0, o = null, l = 0, a = 0, i = 0, u = 0, c = 0;
  for (; l < e.length; ) e[l][0] === Ee ? (r[n++] = l, a = u, i = c, u = 0, c = 0, o = e[l][1]) : (e[l][0] === Te ? u += e[l][1].length : c += e[l][1].length, o && o.length <= Math.max(a, i) && o.length <= Math.max(u, c) && (e.splice(r[n - 1], 0, new _e(xe, o)), e[r[n - 1] + 1][0] = Te, n--, n--, l = n > 0 ? r[n - 1] : -1, a = 0, i = 0, u = 0, c = 0, o = null, t = !0)), l++;
  for (t && Gm(e), KS(e), l = 1; l < e.length; ) {
    if (e[l - 1][0] === xe && e[l][0] === Te) {
      let s = e[l - 1][1], d = e[l][1], f = vc(s, d), p = vc(d, s);
      f >= p ? (f >= s.length / 2 || f >= d.length / 2) && (e.splice(l, 0, new _e(Ee, d.substring(0, f))), e[l - 1][1] = s.substring(0, s.length - f), e[l + 1][1] = d.substring(f), l++) : (p >= s.length / 2 || p >= d.length / 2) && (e.splice(l, 0, new _e(Ee, s.substring(0, p))), e[l - 1][0] = Te, e[l - 1][1] = d.substring(0, d.length - p), e[l + 1][0] = xe, e[l + 1][1] = s.substring(p), l++), l++;
    }
    l++;
  }
}, _c = /[^a-z0-9]/i, Rc = /\s/, wc = /[\r\n]/, GS = /\n\r?\n$/, WS = /^\r?\n\r?\n/;
function KS(e) {
  function t(n, o) {
    if (!n || !o) return 6;
    let l = n.charAt(n.length - 1), a = o.charAt(0), i = l.match(_c), u = a.match(_c), c = i && l.match(Rc), s = u && a.match(Rc), d = c && l.match(wc), f = s && a.match(wc), p = d && n.match(GS), m = f && o.match(WS);
    return p || m ? 5 : d || f ? 4 : i && !c && s ? 3 : c || s ? 2 : i || u ? 1 : 0;
  }
  let r = 1;
  for (; r < e.length - 1; ) {
    if (e[r - 1][0] === Ee && e[r + 1][0] === Ee) {
      let n = e[r - 1][1], o = e[r][1], l = e[r + 1][1], a = zm(n, o);
      if (a) {
        let d = o.substring(o.length - a);
        n = n.substring(0, n.length - a), o = d + o.substring(0, o.length - a), l = d + l;
      }
      let i = n, u = o, c = l, s = t(n, o) + t(o, l);
      for (; o.charAt(0) === l.charAt(0); ) {
        n += o.charAt(0), o = o.substring(1) + l.charAt(0), l = l.substring(1);
        let d = t(n, o) + t(o, l);
        d >= s && (s = d, i = n, u = o, c = l);
      }
      e[r - 1][1] !== i && (i ? e[r - 1][1] = i : (e.splice(r - 1, 1), r--), e[r][1] = u, c ? e[r + 1][1] = c : (e.splice(r + 1, 1), r--));
    }
    r++;
  }
}
function Gm(e) {
  e.push(new _e(Ee, ""));
  let t = 0, r = 0, n = 0, o = "", l = "", a;
  for (; t < e.length; ) switch (e[t][0]) {
    case Te:
      n++, l += e[t][1], t++;
      break;
    case xe:
      r++, o += e[t][1], t++;
      break;
    case Ee:
      r + n > 1 ? (r !== 0 && n !== 0 && (a = VS(l, o), a !== 0 && (t - r - n > 0 && e[t - r - n - 1][0] === Ee ? e[t - r - n - 1][1] += l.substring(0, a) : (e.splice(0, 0, new _e(Ee, l.substring(0, a))), t++), l = l.substring(a), o = o.substring(a)), a = zm(l, o), a !== 0 && (e[t][1] = l.substring(l.length - a) + e[t][1], l = l.substring(0, l.length - a), o = o.substring(0, o.length - a))), t -= r + n, e.splice(t, r + n), o.length && (e.splice(t, 0, new _e(xe, o)), t++), l.length && (e.splice(t, 0, new _e(Te, l)), t++), t++) : t !== 0 && e[t - 1][0] === Ee ? (e[t - 1][1] += e[t][1], e.splice(t, 1)) : t++, n = 0, r = 0, o = "", l = "";
      break;
  }
  e[e.length - 1][1] === "" && e.pop();
  let i = !1;
  for (t = 1; t < e.length - 1; ) e[t - 1][0] === Ee && e[t + 1][0] === Ee && (e[t][1].substring(e[t][1].length - e[t - 1][1].length) === e[t - 1][1] ? (e[t][1] = e[t - 1][1] + e[t][1].substring(0, e[t][1].length - e[t - 1][1].length), e[t + 1][1] = e[t - 1][1] + e[t + 1][1], e.splice(t - 1, 1), i = !0) : e[t][1].substring(0, e[t + 1][1].length) === e[t + 1][1] && (e[t - 1][1] += e[t + 1][1], e[t][1] = e[t][1].substring(e[t + 1][1].length) + e[t + 1][1], e.splice(t + 1, 1), i = !0)), t++;
  i && Gm(e);
}
var Wm = "Compared values have no visual difference.", YS = "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.", Km = {};
Object.defineProperty(Km, "__esModule", { value: !0 });
var Ym = Km.default = ZS, zr = "diff-sequences", Se = 0, tn = (e, t, r, n, o) => {
  let l = 0;
  for (; e < t && r < n && o(e, r); ) e += 1, r += 1, l += 1;
  return l;
}, rn = (e, t, r, n, o) => {
  let l = 0;
  for (; e <= t && r <= n && o(t, n); ) t -= 1, n -= 1, l += 1;
  return l;
}, Ba = (e, t, r, n, o, l, a) => {
  let i = 0, u = -e, c = l[i], s = c;
  l[i] += tn(c + 1, t, n + c - u + 1, r, o);
  let d = e < a ? e : a;
  for (i += 1, u += 2; i <= d; i += 1, u += 2) {
    if (i !== e && s < l[i]) c = l[i];
    else if (c = s + 1, t <= c) return i - 1;
    s = l[i], l[i] = c + tn(c + 1, t, n + c - u + 1, r, o);
  }
  return a;
}, Ec = (e, t, r, n, o, l, a) => {
  let i = 0, u = e, c = l[i], s = c;
  l[i] -= rn(t, c - 1, r, n + c - u - 1, o);
  let d = e < a ? e : a;
  for (i += 1, u -= 2; i <= d; i += 1, u -= 2) {
    if (i !== e && l[i] < s) c = l[i];
    else if (c = s - 1, c < t) return i - 1;
    s = l[i], l[i] = c - rn(t, c - 1, r, n + c - u - 1, o);
  }
  return a;
}, JS = (e, t, r, n, o, l, a, i, u, c, s) => {
  let d = n - t, f = r - t, p = o - n - f, m = -p - (e - 1), b = -p + (e - 1), h = Se, y = e < i ? e : i;
  for (let g = 0, q = -e; g <= y; g += 1, q += 2) {
    let C = g === 0 || g !== e && h < a[g], E = C ? a[g] : h, _ = C ? E : E + 1, v = d + _ - q, w = tn(_ + 1, r, v + 1, o, l), P = _ + w;
    if (h = a[g], a[g] = P, m <= q && q <= b) {
      let j = (e - 1 - (q + p)) / 2;
      if (j <= c && u[j] - 1 <= P) {
        let $ = d + E - (C ? q + 1 : q - 1), k = rn(t, E, n, $, l), L = E - k, S = $ - k, B = L + 1, z = S + 1;
        s.nChangePreceding = e - 1, e - 1 === B + z - t - n ? (s.aEndPreceding = t, s.bEndPreceding = n) : (s.aEndPreceding = B, s.bEndPreceding = z), s.nCommonPreceding = k, k !== 0 && (s.aCommonPreceding = B, s.bCommonPreceding = z), s.nCommonFollowing = w, w !== 0 && (s.aCommonFollowing = _ + 1, s.bCommonFollowing = v + 1);
        let Y = P + 1, K = v + w + 1;
        return s.nChangeFollowing = e - 1, e - 1 === r + o - Y - K ? (s.aStartFollowing = r, s.bStartFollowing = o) : (s.aStartFollowing = Y, s.bStartFollowing = K), !0;
      }
    }
  }
  return !1;
}, XS = (e, t, r, n, o, l, a, i, u, c, s) => {
  let d = o - r, f = r - t, p = o - n - f, m = p - e, b = p + e, h = Se, y = e < c ? e : c;
  for (let g = 0, q = e; g <= y; g += 1, q -= 2) {
    let C = g === 0 || g !== e && u[g] < h, E = C ? u[g] : h, _ = C ? E : E - 1, v = d + _ - q, w = rn(t, _ - 1, n, v - 1, l), P = _ - w;
    if (h = u[g], u[g] = P, m <= q && q <= b) {
      let j = (e + (q - p)) / 2;
      if (j <= i && P - 1 <= a[j]) {
        let $ = v - w;
        if (s.nChangePreceding = e, e === P + $ - t - n ? (s.aEndPreceding = t, s.bEndPreceding = n) : (s.aEndPreceding = P, s.bEndPreceding = $), s.nCommonPreceding = w, w !== 0 && (s.aCommonPreceding = P, s.bCommonPreceding = $), s.nChangeFollowing = e - 1, e === 1) s.nCommonFollowing = 0, s.aStartFollowing = r, s.bStartFollowing = o;
        else {
          let k = d + E - (C ? q - 1 : q + 1), L = tn(E, r, k, o, l);
          s.nCommonFollowing = L, L !== 0 && (s.aCommonFollowing = E, s.bCommonFollowing = k);
          let S = E + L, B = k + L;
          e - 1 === r + o - S - B ? (s.aStartFollowing = r, s.bStartFollowing = o) : (s.aStartFollowing = S, s.bStartFollowing = B);
        }
        return !0;
      }
    }
  }
  return !1;
}, QS = (e, t, r, n, o, l, a, i, u) => {
  let c = n - t, s = o - r, d = r - t, f = o - n, p = f - d, m = d, b = d;
  if (a[0] = t - 1, i[0] = r, p % 2 === 0) {
    let h = (e || p) / 2, y = (d + f) / 2;
    for (let g = 1; g <= y; g += 1) if (m = Ba(g, r, o, c, l, a, m), g < h) b = Ec(g, t, n, s, l, i, b);
    else if (XS(g, t, r, n, o, l, a, m, i, b, u)) return;
  } else {
    let h = ((e || p) + 1) / 2, y = (d + f + 1) / 2, g = 1;
    for (m = Ba(g, r, o, c, l, a, m), g += 1; g <= y; g += 1) if (b = Ec(g - 1, t, n, s, l, i, b), g < h) m = Ba(g, r, o, c, l, a, m);
    else if (JS(g, t, r, n, o, l, a, m, i, b, u)) return;
  }
  throw new Error(`${zr}: no overlap aStart=${t} aEnd=${r} bStart=${n} bEnd=${o}`);
}, xl = (e, t, r, n, o, l, a, i, u, c) => {
  if (o - n < r - t) {
    if (l = !l, l && a.length === 1) {
      let { foundSubsequence: j, isCommon: $ } = a[0];
      a[1] = { foundSubsequence: (k, L, S) => {
        j(k, S, L);
      }, isCommon: (k, L) => $(L, k) };
    }
    let w = t, P = r;
    t = n, r = o, n = w, o = P;
  }
  let { foundSubsequence: s, isCommon: d } = a[l ? 1 : 0];
  QS(e, t, r, n, o, d, i, u, c);
  let { nChangePreceding: f, aEndPreceding: p, bEndPreceding: m, nCommonPreceding: b, aCommonPreceding: h, bCommonPreceding: y, nCommonFollowing: g, aCommonFollowing: q, bCommonFollowing: C, nChangeFollowing: E, aStartFollowing: _, bStartFollowing: v } = c;
  t < p && n < m && xl(f, t, p, n, m, l, a, i, u, c), b !== 0 && s(b, h, y), g !== 0 && s(g, q, C), _ < r && v < o && xl(E, _, r, v, o, l, a, i, u, c);
}, Cc = (e, t) => {
  if (typeof t != "number") throw new TypeError(`${zr}: ${e} typeof ${typeof t} is not a number`);
  if (!Number.isSafeInteger(t)) throw new RangeError(`${zr}: ${e} value ${t} is not a safe integer`);
  if (t < 0) throw new RangeError(`${zr}: ${e} value ${t} is a negative integer`);
}, qc = (e, t) => {
  let r = typeof t;
  if (r !== "function") throw new TypeError(`${zr}: ${e} typeof ${r} is not a function`);
};
function ZS(e, t, r, n) {
  Cc("aLength", e), Cc("bLength", t), qc("isCommon", r), qc("foundSubsequence", n);
  let o = tn(0, e, 0, t, r);
  if (o !== 0 && n(o, 0, 0), e !== o || t !== o) {
    let l = o, a = o, i = rn(l, e - 1, a, t - 1, r), u = e - i, c = t - i, s = o + i;
    e !== s && t !== s && xl(0, l, u, a, c, !1, [{ foundSubsequence: n, isCommon: r }], [Se], [Se], { aCommonFollowing: Se, aCommonPreceding: Se, aEndPreceding: Se, aStartFollowing: Se, bCommonFollowing: Se, bCommonPreceding: Se, bEndPreceding: Se, bStartFollowing: Se, nChangeFollowing: Se, nChangePreceding: Se, nCommonFollowing: Se, nCommonPreceding: Se }), i !== 0 && n(i, u, c);
  }
}
function eM(e, t) {
  return e.replace(/\s+$/, (r) => t(r));
}
function bs(e, t, r, n, o, l) {
  return e.length !== 0 ? r(`${n} ${eM(e, o)}`) : n !== " " ? r(n) : t && l.length !== 0 ? r(`${n} ${l}`) : "";
}
function Jm(e, t, { aColor: r, aIndicator: n, changeLineTrailingSpaceColor: o, emptyFirstOrLastLinePlaceholder: l }) {
  return bs(e, t, r, n, o, l);
}
function Xm(e, t, { bColor: r, bIndicator: n, changeLineTrailingSpaceColor: o, emptyFirstOrLastLinePlaceholder: l }) {
  return bs(e, t, r, n, o, l);
}
function Qm(e, t, { commonColor: r, commonIndicator: n, commonLineTrailingSpaceColor: o, emptyFirstOrLastLinePlaceholder: l }) {
  return bs(e, t, r, n, o, l);
}
function Pc(e, t, r, n, { patchColor: o }) {
  return o(`@@ -${e + 1},${t - e} +${r + 1},${n - r} @@`);
}
function tM(e, t) {
  let r = e.length, n = t.contextLines, o = n + n, l = r, a = !1, i = 0, u = 0;
  for (; u !== r; ) {
    let C = u;
    for (; u !== r && e[u][0] === Ee; ) u += 1;
    if (C !== u) if (C === 0) u > n && (l -= u - n, a = !0);
    else if (u === r) {
      let E = u - C;
      E > n && (l -= E - n, a = !0);
    } else {
      let E = u - C;
      E > o && (l -= E - o, i += 1);
    }
    for (; u !== r && e[u][0] !== Ee; ) u += 1;
  }
  let c = i !== 0 || a;
  i !== 0 ? l += i + 1 : a && (l += 1);
  let s = l - 1, d = [], f = 0;
  c && d.push("");
  let p = 0, m = 0, b = 0, h = 0, y = (C) => {
    let E = d.length;
    d.push(Qm(C, E === 0 || E === s, t)), b += 1, h += 1;
  }, g = (C) => {
    let E = d.length;
    d.push(Jm(C, E === 0 || E === s, t)), b += 1;
  }, q = (C) => {
    let E = d.length;
    d.push(Xm(C, E === 0 || E === s, t)), h += 1;
  };
  for (u = 0; u !== r; ) {
    let C = u;
    for (; u !== r && e[u][0] === Ee; ) u += 1;
    if (C !== u) if (C === 0) {
      u > n && (C = u - n, p = C, m = C, b = p, h = m);
      for (let E = C; E !== u; E += 1) y(e[E][1]);
    } else if (u === r) {
      let E = u - C > n ? C + n : u;
      for (let _ = C; _ !== E; _ += 1) y(e[_][1]);
    } else {
      let E = u - C;
      if (E > o) {
        let _ = C + n;
        for (let w = C; w !== _; w += 1) y(e[w][1]);
        d[f] = Pc(p, b, m, h, t), f = d.length, d.push("");
        let v = E - o;
        p = b + v, m = h + v, b = p, h = m;
        for (let w = u - n; w !== u; w += 1) y(e[w][1]);
      } else for (let _ = C; _ !== u; _ += 1) y(e[_][1]);
    }
    for (; u !== r && e[u][0] === xe; ) g(e[u][1]), u += 1;
    for (; u !== r && e[u][0] === Te; ) q(e[u][1]), u += 1;
  }
  return c && (d[f] = Pc(p, b, m, h, t)), d.join(`
`);
}
function rM(e, t) {
  return e.map((r, n, o) => {
    let l = r[1], a = n === 0 || n === o.length - 1;
    switch (r[0]) {
      case xe:
        return Jm(l, a, t);
      case Te:
        return Xm(l, a, t);
      default:
        return Qm(l, a, t);
    }
  }).join(`
`);
}
var Da = (e) => e, Zm = 5, nM = 0;
function oM() {
  return { aAnnotation: "Expected", aColor: Re.green, aIndicator: "-", bAnnotation: "Received", bColor: Re.red, bIndicator: "+", changeColor: Re.inverse, changeLineTrailingSpaceColor: Da, commonColor: Re.dim, commonIndicator: " ", commonLineTrailingSpaceColor: Da, compareKeys: void 0, contextLines: Zm, emptyFirstOrLastLinePlaceholder: "", expand: !0, includeChangeCounts: !1, omitAnnotationLines: !1, patchColor: Re.yellow, truncateThreshold: nM, truncateAnnotation: "... Diff result is truncated", truncateAnnotationColor: Da };
}
function aM(e) {
  return e && typeof e == "function" ? e : void 0;
}
function lM(e) {
  return typeof e == "number" && Number.isSafeInteger(e) && e >= 0 ? e : Zm;
}
function Zt(e = {}) {
  return { ...oM(), ...e, compareKeys: aM(e.compareKeys), contextLines: lM(e.contextLines) };
}
function cr(e) {
  return e.length === 1 && e[0].length === 0;
}
function iM(e) {
  let t = 0, r = 0;
  return e.forEach((n) => {
    switch (n[0]) {
      case xe:
        t += 1;
        break;
      case Te:
        r += 1;
        break;
    }
  }), { a: t, b: r };
}
function sM({ aAnnotation: e, aColor: t, aIndicator: r, bAnnotation: n, bColor: o, bIndicator: l, includeChangeCounts: a, omitAnnotationLines: i }, u) {
  if (i) return "";
  let c = "", s = "";
  if (a) {
    let p = String(u.a), m = String(u.b), b = n.length - e.length, h = " ".repeat(Math.max(0, b)), y = " ".repeat(Math.max(0, -b)), g = m.length - p.length, q = " ".repeat(Math.max(0, g)), C = " ".repeat(Math.max(0, -g));
    c = `${h}  ${r} ${q}${p}`, s = `${y}  ${l} ${C}${m}`;
  }
  let d = `${r} ${e}${c}`, f = `${l} ${n}${s}`;
  return `${t(d)}
${o(f)}

`;
}
function ys(e, t, r) {
  return sM(r, iM(e)) + (r.expand ? rM(e, r) : tM(e, r)) + (t ? r.truncateAnnotationColor(`
${r.truncateAnnotation}`) : "");
}
function Io(e, t, r) {
  let n = Zt(r), [o, l] = eh(cr(e) ? [] : e, cr(t) ? [] : t, n);
  return ys(o, l, n);
}
function uM(e, t, r, n, o) {
  if (cr(e) && cr(r) && (e = [], r = []), cr(t) && cr(n) && (t = [], n = []), e.length !== r.length || t.length !== n.length) return Io(e, t, o);
  let [l, a] = eh(r, n, o), i = 0, u = 0;
  return l.forEach((c) => {
    switch (c[0]) {
      case xe:
        c[1] = e[i], i += 1;
        break;
      case Te:
        c[1] = t[u], u += 1;
        break;
      default:
        c[1] = t[u], i += 1, u += 1;
    }
  }), ys(l, a, Zt(o));
}
function eh(e, t, r) {
  let n = r?.truncateThreshold ?? !1, o = Math.max(Math.floor(r?.truncateThreshold ?? 0), 0), l = n ? Math.min(e.length, o) : e.length, a = n ? Math.min(t.length, o) : t.length, i = l !== e.length || a !== t.length, u = (f, p) => e[f] === t[p], c = [], s = 0, d = 0;
  for (Ym(l, a, u, (f, p, m) => {
    for (; s !== p; s += 1) c.push(new _e(xe, e[s]));
    for (; d !== m; d += 1) c.push(new _e(Te, t[d]));
    for (; f !== 0; f -= 1, s += 1, d += 1) c.push(new _e(Ee, t[d]));
  }); s !== l; s += 1) c.push(new _e(xe, e[s]));
  for (; d !== a; d += 1) c.push(new _e(Te, t[d]));
  return [c, i];
}
function Oc(e) {
  return e.includes(`\r
`) ? `\r
` : `
`;
}
function cM(e, t, r) {
  let n = r?.truncateThreshold ?? !1, o = Math.max(Math.floor(r?.truncateThreshold ?? 0), 0), l = e.length, a = t.length;
  if (n) {
    let f = e.includes(`
`), p = t.includes(`
`), m = Oc(e), b = Oc(t), h = f ? `${e.split(m, o).join(m)}
` : e, y = p ? `${t.split(b, o).join(b)}
` : t;
    l = h.length, a = y.length;
  }
  let i = l !== e.length || a !== t.length, u = (f, p) => e[f] === t[p], c = 0, s = 0, d = [];
  return Ym(l, a, u, (f, p, m) => {
    c !== p && d.push(new _e(xe, e.slice(c, p))), s !== m && d.push(new _e(Te, t.slice(s, m))), c = p + f, s = m + f, d.push(new _e(Ee, t.slice(m, s)));
  }), c !== l && d.push(new _e(xe, e.slice(c))), s !== a && d.push(new _e(Te, t.slice(s))), [d, i];
}
function dM(e, t, r) {
  return t.reduce((n, o) => n + (o[0] === Ee ? o[1] : o[0] === e && o[1].length !== 0 ? r(o[1]) : ""), "");
}
var Tc = class {
  op;
  line;
  lines;
  changeColor;
  constructor(e, t) {
    this.op = e, this.line = [], this.lines = [], this.changeColor = t;
  }
  pushSubstring(e) {
    this.pushDiff(new _e(this.op, e));
  }
  pushLine() {
    this.lines.push(this.line.length !== 1 ? new _e(this.op, dM(this.op, this.line, this.changeColor)) : this.line[0][0] === this.op ? this.line[0] : new _e(this.op, this.line[0][1])), this.line.length = 0;
  }
  isLineEmpty() {
    return this.line.length === 0;
  }
  pushDiff(e) {
    this.line.push(e);
  }
  align(e) {
    let t = e[1];
    if (t.includes(`
`)) {
      let r = t.split(`
`), n = r.length - 1;
      r.forEach((o, l) => {
        l < n ? (this.pushSubstring(o), this.pushLine()) : o.length !== 0 && this.pushSubstring(o);
      });
    } else this.pushDiff(e);
  }
  moveLinesTo(e) {
    this.isLineEmpty() || this.pushLine(), e.push(...this.lines), this.lines.length = 0;
  }
}, pM = class {
  deleteBuffer;
  insertBuffer;
  lines;
  constructor(e, t) {
    this.deleteBuffer = e, this.insertBuffer = t, this.lines = [];
  }
  pushDiffCommonLine(e) {
    this.lines.push(e);
  }
  pushDiffChangeLines(e) {
    let t = e[1].length === 0;
    (!t || this.deleteBuffer.isLineEmpty()) && this.deleteBuffer.pushDiff(e), (!t || this.insertBuffer.isLineEmpty()) && this.insertBuffer.pushDiff(e);
  }
  flushChangeLines() {
    this.deleteBuffer.moveLinesTo(this.lines), this.insertBuffer.moveLinesTo(this.lines);
  }
  align(e) {
    let t = e[0], r = e[1];
    if (r.includes(`
`)) {
      let n = r.split(`
`), o = n.length - 1;
      n.forEach((l, a) => {
        if (a === 0) {
          let i = new _e(t, l);
          this.deleteBuffer.isLineEmpty() && this.insertBuffer.isLineEmpty() ? (this.flushChangeLines(), this.pushDiffCommonLine(i)) : (this.pushDiffChangeLines(i), this.flushChangeLines());
        } else a < o ? this.pushDiffCommonLine(new _e(t, l)) : l.length !== 0 && this.pushDiffChangeLines(new _e(t, l));
      });
    } else this.pushDiffChangeLines(e);
  }
  getLines() {
    return this.flushChangeLines(), this.lines;
  }
};
function fM(e, t) {
  let r = new Tc(xe, t), n = new Tc(Te, t), o = new pM(r, n);
  return e.forEach((l) => {
    switch (l[0]) {
      case xe:
        r.align(l);
        break;
      case Te:
        n.align(l);
        break;
      default:
        o.align(l);
    }
  }), o.getLines();
}
function mM(e, t) {
  if (t) {
    let r = e.length - 1;
    return e.some((n, o) => n[0] === Ee && (o !== r || n[1] !== `
`));
  }
  return e.some((r) => r[0] === Ee);
}
function hM(e, t, r) {
  if (e !== t && e.length !== 0 && t.length !== 0) {
    let n = e.includes(`
`) || t.includes(`
`), [o, l] = th(n ? `${e}
` : e, n ? `${t}
` : t, !0, r);
    if (mM(o, n)) {
      let a = Zt(r), i = fM(o, a.changeColor);
      return ys(i, l, a);
    }
  }
  return Io(e.split(`
`), t.split(`
`), r);
}
function th(e, t, r, n) {
  let [o, l] = cM(e, t, n);
  return zS(o), [o, l];
}
function jl(e, t) {
  let { commonColor: r } = Zt(t);
  return r(e);
}
var { AsymmetricMatcher: bM, DOMCollection: yM, DOMElement: gM, Immutable: vM, ReactElement: _M, ReactTestComponent: RM } = Um, rh = [RM, _M, gM, yM, vM, bM], Nl = { plugins: rh }, nh = { callToJSON: !1, maxDepth: 10, plugins: rh };
function Cr(e, t, r) {
  if (Object.is(e, t)) return "";
  let n = gc(e), o = n, l = !1;
  if (n === "object" && typeof e.asymmetricMatch == "function") {
    if (e.$$typeof !== Symbol.for("jest.asymmetricMatcher") || typeof e.getExpectedType != "function") return;
    o = e.getExpectedType(), l = o === "string";
  }
  if (o !== gc(t)) {
    let { aAnnotation: a, aColor: i, aIndicator: u, bAnnotation: c, bColor: s, bIndicator: d } = Zt(r), f = $l(nh, r), p = it(e, f), m = it(t, f), b = `${i(`${u} ${a}:`)} 
${p}`, h = `${s(`${d} ${c}:`)} 
${m}`;
    return `${b}

${h}`;
  }
  if (!l) switch (n) {
    case "string":
      return Io(e.split(`
`), t.split(`
`), r);
    case "boolean":
    case "number":
      return wM(e, t, r);
    case "map":
      return Fa(Sc(e), Sc(t), r);
    case "set":
      return Fa(Mc(e), Mc(t), r);
    default:
      return Fa(e, t, r);
  }
}
function wM(e, t, r) {
  let n = it(e, Nl), o = it(t, Nl);
  return n === o ? "" : Io(n.split(`
`), o.split(`
`), r);
}
function Sc(e) {
  return new Map(Array.from(e.entries()).sort());
}
function Mc(e) {
  return new Set(Array.from(e.values()).sort());
}
function Fa(e, t, r) {
  let n, o = !1;
  try {
    let a = $l(Nl, r);
    n = Ac(e, t, a, r);
  } catch {
    o = !0;
  }
  let l = jl(Wm, r);
  if (n === void 0 || n === l) {
    let a = $l(nh, r);
    n = Ac(e, t, a, r), n !== l && !o && (n = `${jl(YS, r)}

${n}`);
  }
  return n;
}
function $l(e, t) {
  let { compareKeys: r } = Zt(t);
  return { ...e, compareKeys: r };
}
function Ac(e, t, r, n) {
  let o = { ...r, indent: 0 }, l = it(e, o), a = it(t, o);
  if (l === a) return jl(Wm, n);
  {
    let i = it(e, r), u = it(t, r);
    return uM(i.split(`
`), u.split(`
`), l.split(`
`), a.split(`
`), n);
  }
}
var xc = 2e4;
function jc(e) {
  return Ol(e) === "Object" && typeof e.asymmetricMatch == "function";
}
function Nc(e, t) {
  let r = Ol(e), n = Ol(t);
  return r === n && (r === "Object" || r === "Array");
}
function oh(e, t, r) {
  let { aAnnotation: n, bAnnotation: o } = Zt(r);
  if (typeof e == "string" && typeof t == "string" && e.length > 0 && t.length > 0 && e.length <= xc && t.length <= xc && e !== t) {
    if (e.includes(`
`) || t.includes(`
`)) return hM(t, e, r);
    let [c] = th(t, e), s = c.some((m) => m[0] === Ee), d = EM(n, o), f = d(n) + PM($c(c, xe, s)), p = d(o) + qM($c(c, Te, s));
    return `${f}
${p}`;
  }
  let l = Ju(e, { forceWritable: !0 }), a = Ju(t, { forceWritable: !0 }), { replacedExpected: i, replacedActual: u } = ah(l, a);
  return Cr(i, u, r);
}
function ah(e, t, r = /* @__PURE__ */ new WeakSet(), n = /* @__PURE__ */ new WeakSet()) {
  return Nc(e, t) ? r.has(e) || n.has(t) ? { replacedActual: e, replacedExpected: t } : (r.add(e), n.add(t), Rm(t).forEach((o) => {
    let l = t[o], a = e[o];
    if (jc(l)) l.asymmetricMatch(a) && (e[o] = l);
    else if (jc(a)) a.asymmetricMatch(l) && (t[o] = a);
    else if (Nc(a, l)) {
      let i = ah(a, l, r, n);
      e[o] = i.replacedActual, t[o] = i.replacedExpected;
    }
  }), { replacedActual: e, replacedExpected: t }) : { replacedActual: e, replacedExpected: t };
}
function EM(...e) {
  let t = e.reduce((r, n) => n.length > r ? n.length : r, 0);
  return (r) => `${r}: ${" ".repeat(t - r.length)}`;
}
var CM = "·";
function lh(e) {
  return e.replace(/\s+$/gm, (t) => CM.repeat(t.length));
}
function qM(e) {
  return Re.red(lh(Ke(e)));
}
function PM(e) {
  return Re.green(lh(Ke(e)));
}
function $c(e, t, r) {
  return e.reduce((n, o) => n + (o[0] === Ee ? o[1] : o[0] === t ? r ? Re.inverse(o[1]) : o[1] : ""), "");
}
function Bn(e, t) {
  if (!e) throw new Error(t);
}
function dr(e, t) {
  return typeof t === e;
}
function OM(e) {
  return e instanceof Promise;
}
function Il(e, t, r) {
  Object.defineProperty(e, t, r);
}
function hr(e, t, r) {
  Object.defineProperty(e, t, { value: r });
}
var Gr = Symbol.for("tinyspy:spy"), TM = /* @__PURE__ */ new Set(), SM = (e) => {
  e.called = !1, e.callCount = 0, e.calls = [], e.results = [], e.resolves = [], e.next = [];
}, MM = (e) => (Il(e, Gr, { value: { reset: () => SM(e[Gr]) } }), e[Gr]), eo = (e) => e[Gr] || MM(e);
function AM(e) {
  Bn(dr("function", e) || dr("undefined", e), "cannot spy on a non-function value");
  let t = function(...n) {
    let o = eo(t);
    o.called = !0, o.callCount++, o.calls.push(n);
    let l = o.next.shift();
    if (l) {
      o.results.push(l);
      let [s, d] = l;
      if (s === "ok") return d;
      throw d;
    }
    let a, i = "ok", u = o.results.length;
    if (o.impl) try {
      new.target ? a = Reflect.construct(o.impl, n, new.target) : a = o.impl.apply(this, n), i = "ok";
    } catch (s) {
      throw a = s, i = "error", o.results.push([i, s]), s;
    }
    let c = [i, a];
    return OM(a) && a.then((s) => o.resolves[u] = ["ok", s], (s) => o.resolves[u] = ["error", s]), o.results.push(c), a;
  };
  hr(t, "_isMockFunction", !0), hr(t, "length", e ? e.length : 0), hr(t, "name", e && e.name || "spy");
  let r = eo(t);
  return r.reset(), r.impl = e, t;
}
var Ic = (e, t) => Object.getOwnPropertyDescriptor(e, t), Lc = (e, t) => {
  t != null && typeof t == "function" && t.prototype != null && Object.setPrototypeOf(e.prototype, t.prototype);
};
function xM(e, t, r) {
  Bn(!dr("undefined", e), "spyOn could not find an object to spy upon"), Bn(dr("object", e) || dr("function", e), "cannot spyOn on a primitive value");
  let [n, o] = (() => {
    if (!dr("object", t)) return [t, "value"];
    if ("getter" in t && "setter" in t) throw new Error("cannot spy on both getter and setter");
    if ("getter" in t) return [t.getter, "get"];
    if ("setter" in t) return [t.setter, "set"];
    throw new Error("specify getter or setter to spy on");
  })(), l = Ic(e, n), a = Object.getPrototypeOf(e), i = a && Ic(a, n), u = l || i;
  Bn(u || n in e, `${String(n)} does not exist`);
  let c = !1;
  o === "value" && u && !u.value && u.get && (o = "get", c = !0, r = u.get());
  let s;
  u ? s = u[o] : o !== "value" ? s = () => e[n] : s = e[n];
  let d = (b) => {
    let { value: h, ...y } = u || { configurable: !0, writable: !0 };
    o !== "value" && delete y.writable, y[o] = b, Il(e, n, y);
  }, f = () => u ? Il(e, n, u) : d(s);
  r || (r = s);
  let p = AM(r);
  o === "value" && Lc(p, s);
  let m = p[Gr];
  return hr(m, "restore", f), hr(m, "getOriginal", () => c ? s() : s), hr(m, "willCall", (b) => (m.impl = b, p)), d(c ? () => (Lc(p, r), p) : p), TM.add(p), p;
}
var Lo = /* @__PURE__ */ new Set();
function ih(e) {
  return typeof e == "function" && "_isMockFunction" in e && e._isMockFunction;
}
var jM = 0;
function NM(e) {
  let t = e, r, n = [], o = [], l = [], a = eo(e), i = { get calls() {
    return a.calls;
  }, get contexts() {
    return o;
  }, get instances() {
    return n;
  }, get invocationCallOrder() {
    return l;
  }, get results() {
    return a.results.map(([p, m]) => ({ type: p === "error" ? "throw" : "return", value: m }));
  }, get settledResults() {
    return a.resolves.map(([p, m]) => ({ type: p === "error" ? "rejected" : "fulfilled", value: m }));
  }, get lastCall() {
    return a.calls[a.calls.length - 1];
  } }, u = [], c = !1;
  function s(...p) {
    return n.push(this), o.push(this), l.push(++jM), (c ? r : u.shift() || r || a.getOriginal() || (() => {
    })).apply(this, p);
  }
  let d = t.name;
  t.getMockName = () => d || "vi.fn()", t.mockName = (p) => (d = p, t), t.mockClear = () => (a.reset(), n = [], o = [], l = [], t), t.mockReset = () => (t.mockClear(), r = () => {
  }, u = [], t), t.mockRestore = () => (t.mockReset(), a.restore(), r = void 0, t), t.getMockImplementation = () => r, t.mockImplementation = (p) => (r = p, a.willCall(s), t), t.mockImplementationOnce = (p) => (u.push(p), t);
  function f(p, m) {
    let b = r;
    r = p, a.willCall(s), c = !0;
    let h = () => {
      r = b, c = !1;
    }, y = m();
    return y instanceof Promise ? y.then(() => (h(), t)) : (h(), t);
  }
  return t.withImplementation = f, t.mockReturnThis = () => t.mockImplementation(function() {
    return this;
  }), t.mockReturnValue = (p) => t.mockImplementation(() => p), t.mockReturnValueOnce = (p) => t.mockImplementationOnce(() => p), t.mockResolvedValue = (p) => t.mockImplementation(() => Promise.resolve(p)), t.mockResolvedValueOnce = (p) => t.mockImplementationOnce(() => Promise.resolve(p)), t.mockRejectedValue = (p) => t.mockImplementation(() => Promise.reject(p)), t.mockRejectedValueOnce = (p) => t.mockImplementationOnce(() => Promise.reject(p)), Object.defineProperty(t, "mock", { get: () => i }), a.willCall(s), Lo.add(t), t;
}
function kc(e) {
  let t = NM(xM({ spy: e || function() {
  } }, "spy"));
  return e && t.mockImplementation(e), t;
}
var $M = "@@__IMMUTABLE_RECORD__@@", IM = "@@__IMMUTABLE_ITERABLE__@@";
function LM(e) {
  return e && (e[IM] || e[$M]);
}
var kM = Object.getPrototypeOf({});
function Bc(e) {
  return e instanceof Error ? `<unserializable>: ${e.message}` : typeof e == "string" ? `<unserializable>: ${e}` : "<unserializable>";
}
function pr(e, t = /* @__PURE__ */ new WeakMap()) {
  if (!e || typeof e == "string") return e;
  if (typeof e == "function") return `Function<${e.name || "anonymous"}>`;
  if (typeof e == "symbol") return e.toString();
  if (typeof e != "object") return e;
  if (LM(e)) return pr(e.toJSON(), t);
  if (e instanceof Promise || e.constructor && e.constructor.prototype === "AsyncFunction") return "Promise";
  if (typeof Element < "u" && e instanceof Element) return e.tagName;
  if (typeof e.asymmetricMatch == "function") return `${e.toString()} ${HS(e.sample)}`;
  if (typeof e.toJSON == "function") return pr(e.toJSON(), t);
  if (t.has(e)) return t.get(e);
  if (Array.isArray(e)) {
    let r = new Array(e.length);
    return t.set(e, r), e.forEach((n, o) => {
      try {
        r[o] = pr(n, t);
      } catch (l) {
        r[o] = Bc(l);
      }
    }), r;
  } else {
    let r = /* @__PURE__ */ Object.create(null);
    t.set(e, r);
    let n = e;
    for (; n && n !== kM; ) Object.getOwnPropertyNames(n).forEach((o) => {
      if (!(o in r)) try {
        r[o] = pr(e[o], t);
      } catch (l) {
        delete r[o], r[o] = Bc(l);
      }
    }), n = Object.getPrototypeOf(n);
    return r;
  }
}
function BM(e) {
  return e.replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "");
}
function sh(e, t, r = /* @__PURE__ */ new WeakSet()) {
  if (!e || typeof e != "object") return { message: String(e) };
  let n = e;
  n.stack && (n.stackStr = String(n.stack)), n.name && (n.nameStr = String(n.name)), (n.showDiff || n.showDiff === void 0 && n.expected !== void 0 && n.actual !== void 0) && (n.diff = oh(n.actual, n.expected, { ...t, ...n.diffOptions })), typeof n.expected != "string" && (n.expected = Ke(n.expected, 10)), typeof n.actual != "string" && (n.actual = Ke(n.actual, 10));
  try {
    typeof n.message == "string" && (n.message = BM(n.message));
  } catch {
  }
  try {
    !r.has(n) && typeof n.cause == "object" && (r.add(n), n.cause = sh(n.cause, t, r));
  } catch {
  }
  try {
    return pr(n);
  } catch (o) {
    return pr(new Error(`Failed to fully serialize error: ${o?.message}
Inner error message: ${n?.message}`));
  }
}
var nn = Symbol.for("matchers-object"), on = Symbol.for("$$jest-matchers-object-storybook"), gs = Symbol.for("expect-global"), Ll = Symbol.for("asymmetric-matchers-object");
if (!Object.prototype.hasOwnProperty.call(globalThis, nn)) {
  let e = /* @__PURE__ */ new WeakMap();
  Object.defineProperty(globalThis, nn, { get: () => e });
}
if (!Object.prototype.hasOwnProperty.call(globalThis, on)) {
  let e = /* @__PURE__ */ Object.create(null), t = [];
  Object.defineProperty(globalThis, on, { configurable: !0, get: () => ({ state: globalThis[nn].get(globalThis[gs]), matchers: e, customEqualityTesters: t }) });
}
if (!Object.prototype.hasOwnProperty.call(globalThis, Ll)) {
  let e = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(globalThis, Ll, { get: () => e });
}
function to(e) {
  return globalThis[nn].get(e);
}
function Ua(e, t) {
  let r = globalThis[nn], n = r.get(t) || {};
  Object.assign(n, e), r.set(t, n);
}
var ro = Re.green, vs = Re.red, DM = Re.inverse, FM = Re.bold, St = Re.dim;
function UM(e, t = "received", r = "expected", n = {}) {
  let { comment: o = "", isDirectExpectCall: l = !1, isNot: a = !1, promise: i = "", secondArgument: u = "", expectedColor: c = ro, receivedColor: s = vs, secondArgumentColor: d = ro } = n, f = "", p = "expect";
  return !l && t !== "" && (f += St(`${p}(`) + s(t), p = ")"), i !== "" && (f += St(`${p}.`) + i, p = ""), a && (f += `${St(`${p}.`)}not`, p = ""), e.includes(".") ? p += e : (f += St(`${p}.`) + e, p = ""), r === "" ? p += "()" : (f += St(`${p}(`) + c(r), u && (f += St(", ") + d(u)), p = ")"), o !== "" && (p += ` // ${o}`), p !== "" && (f += St(p)), f;
}
var HM = "·";
function uh(e) {
  return e.replace(/\s+$/gm, (t) => HM.repeat(t.length));
}
function VM(e) {
  return vs(uh(Ke(e)));
}
function zM(e) {
  return ro(uh(Ke(e)));
}
function ch() {
  return { EXPECTED_COLOR: ro, RECEIVED_COLOR: vs, INVERTED_COLOR: DM, BOLD_WEIGHT: FM, DIM_COLOR: St, diff: Cr, matcherHint: UM, printReceived: VM, printExpected: zM, printDiffOrStringify: oh };
}
function _s() {
  return globalThis[on].customEqualityTesters;
}
function oe(e, t, r, n) {
  return r = r || [], dh(e, t, [], [], r, n ? ph : WM);
}
function Dc(e) {
  return !!e && typeof e == "object" && "asymmetricMatch" in e && et("Function", e.asymmetricMatch);
}
function GM(e, t) {
  let r = Dc(e), n = Dc(t);
  if (!(r && n)) {
    if (r) return e.asymmetricMatch(t);
    if (n) return t.asymmetricMatch(e);
  }
}
function dh(e, t, r, n, o, l) {
  let a = !0, i = GM(e, t);
  if (i !== void 0) return i;
  let u = { equals: oe };
  for (let m = 0; m < o.length; m++) {
    let b = o[m].call(u, e, t, o);
    if (b !== void 0) return b;
  }
  if (e instanceof Error && t instanceof Error) return e.message === t.message;
  if (typeof URL == "function" && e instanceof URL && t instanceof URL) return e.href === t.href;
  if (Object.is(e, t)) return !0;
  if (e === null || t === null) return e === t;
  let c = Object.prototype.toString.call(e);
  if (c !== Object.prototype.toString.call(t)) return !1;
  switch (c) {
    case "[object Boolean]":
    case "[object String]":
    case "[object Number]":
      return typeof e != typeof t ? !1 : typeof e != "object" && typeof t != "object" ? Object.is(e, t) : Object.is(e.valueOf(), t.valueOf());
    case "[object Date]": {
      let m = +e, b = +t;
      return m === b || Number.isNaN(m) && Number.isNaN(b);
    }
    case "[object RegExp]":
      return e.source === t.source && e.flags === t.flags;
  }
  if (typeof e != "object" || typeof t != "object") return !1;
  if (Uc(e) && Uc(t)) return e.isEqualNode(t);
  let s = r.length;
  for (; s--; ) {
    if (r[s] === e) return n[s] === t;
    if (n[s] === t) return !1;
  }
  if (r.push(e), n.push(t), c === "[object Array]" && e.length !== t.length) return !1;
  let d = Fc(e, l), f, p = d.length;
  if (Fc(t, l).length !== p) return !1;
  for (; p--; ) if (f = d[p], a = l(t, f) && dh(e[f], t[f], r, n, o, l), !a) return !1;
  return r.pop(), n.pop(), a;
}
function Fc(e, t) {
  let r = [];
  for (let n in e) t(e, n) && r.push(n);
  return r.concat(Object.getOwnPropertySymbols(e).filter((n) => Object.getOwnPropertyDescriptor(e, n).enumerable));
}
function WM(e, t) {
  return ph(e, t) && e[t] !== void 0;
}
function ph(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function et(e, t) {
  return Object.prototype.toString.apply(t) === `[object ${e}]`;
}
function Uc(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && typeof e.nodeType == "number" && "nodeName" in e && typeof e.nodeName == "string" && "isEqualNode" in e && typeof e.isEqualNode == "function";
}
var fh = "@@__IMMUTABLE_KEYED__@@", mh = "@@__IMMUTABLE_SET__@@", KM = "@@__IMMUTABLE_LIST__@@", ko = "@@__IMMUTABLE_ORDERED__@@", YM = "@@__IMMUTABLE_RECORD__@@";
function JM(e) {
  return !!(e && e[fh] && !e[ko]);
}
function XM(e) {
  return !!(e && e[mh] && !e[ko]);
}
function Bo(e) {
  return e != null && typeof e == "object" && !Array.isArray(e);
}
function QM(e) {
  return !!(e && Bo(e) && e[KM]);
}
function ZM(e) {
  return !!(e && Bo(e) && e[fh] && e[ko]);
}
function eA(e) {
  return !!(e && Bo(e) && e[mh] && e[ko]);
}
function tA(e) {
  return !!(e && Bo(e) && e[YM]);
}
var hh = Symbol.iterator;
function Hc(e) {
  return !!(e != null && e[hh]);
}
function Ue(e, t, r = [], n = [], o = []) {
  if (typeof e != "object" || typeof t != "object" || Array.isArray(e) || Array.isArray(t) || !Hc(e) || !Hc(t)) return;
  if (e.constructor !== t.constructor) return !1;
  let l = n.length;
  for (; l--; ) if (n[l] === e) return o[l] === t;
  n.push(e), o.push(t);
  let a = [...r.filter((c) => c !== Ue), i];
  function i(c, s) {
    return Ue(c, s, [...r], [...n], [...o]);
  }
  if (e.size !== void 0) {
    if (e.size !== t.size) return !1;
    if (et("Set", e) || XM(e)) {
      let c = !0;
      for (let s of e) if (!t.has(s)) {
        let d = !1;
        for (let f of t) oe(s, f, a) === !0 && (d = !0);
        if (d === !1) {
          c = !1;
          break;
        }
      }
      return n.pop(), o.pop(), c;
    } else if (et("Map", e) || JM(e)) {
      let c = !0;
      for (let s of e) if (!t.has(s[0]) || !oe(s[1], t.get(s[0]), a)) {
        let d = !1;
        for (let f of t) {
          let p = oe(s[0], f[0], a), m = !1;
          p === !0 && (m = oe(s[1], f[1], a)), m === !0 && (d = !0);
        }
        if (d === !1) {
          c = !1;
          break;
        }
      }
      return n.pop(), o.pop(), c;
    }
  }
  let u = t[hh]();
  for (let c of e) {
    let s = u.next();
    if (s.done || !oe(c, s.value, a)) return !1;
  }
  if (!u.next().done) return !1;
  if (!QM(e) && !ZM(e) && !eA(e) && !tA(e)) {
    let c = Object.entries(e), s = Object.entries(t);
    if (!oe(c, s)) return !1;
  }
  return n.pop(), o.pop(), !0;
}
function Rs(e, t) {
  return !e || typeof e != "object" || e === Object.prototype ? !1 : Object.prototype.hasOwnProperty.call(e, t) || Rs(Object.getPrototypeOf(e), t);
}
function rA(e) {
  return Ln(e) && !(e instanceof Error) && !Array.isArray(e) && !(e instanceof Date);
}
function Rn(e, t, r = []) {
  let n = r.filter((l) => l !== Rn), o = (l = /* @__PURE__ */ new WeakMap()) => (a, i) => {
    if (rA(i)) return Object.keys(i).every((u) => {
      if (i[u] != null && typeof i[u] == "object") {
        if (l.has(i[u])) return oe(a[u], i[u], n);
        l.set(i[u], !0);
      }
      let c = a != null && Rs(a, u) && oe(a[u], i[u], [...n, o(l)]);
      return l.delete(i[u]), c;
    });
  };
  return o()(e, t);
}
function Vc(e, t) {
  if (!(e == null || t == null || e.constructor === t.constructor)) return !1;
}
function zc(e, t) {
  let r = e, n = t;
  if (!(e instanceof DataView && t instanceof DataView)) {
    if (!(e instanceof ArrayBuffer) || !(t instanceof ArrayBuffer)) return;
    try {
      r = new DataView(e), n = new DataView(t);
    } catch {
      return;
    }
  }
  if (r.byteLength !== n.byteLength) return !1;
  for (let o = 0; o < r.byteLength; o++) if (r.getUint8(o) !== n.getUint8(o)) return !1;
  return !0;
}
function kl(e, t, r = []) {
  if (!Array.isArray(e) || !Array.isArray(t)) return;
  let n = Object.keys(e), o = Object.keys(t), l = r.filter((a) => a !== kl);
  return oe(e, t, l, !0) && oe(n, o);
}
function nA(e, t = "#{this}", r = "#{exp}") {
  let n = `expected ${t} to be ${r} // Object.is equality`;
  return ["toStrictEqual", "toEqual"].includes(e) ? `${n}

If it should pass with deep equality, replace "toBe" with "${e}"

Expected: ${t}
Received: serializes to the same string
` : n;
}
function oA(e, t) {
  return `${t} ${e}${t === 1 ? "" : "s"}`;
}
function Ha(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e).filter((t) => {
    var r;
    return (r = Object.getOwnPropertyDescriptor(e, t)) == null ? void 0 : r.enumerable;
  })];
}
function aA(e, t, r = []) {
  let n = 0, o = (l = /* @__PURE__ */ new WeakMap()) => (a, i) => {
    if (Array.isArray(a)) {
      if (Array.isArray(i) && i.length === a.length) return i.map((u, c) => o(l)(a[c], u));
    } else {
      if (a instanceof Date) return a;
      if (Ln(a) && Ln(i)) {
        if (oe(a, i, [...r, Ue, Rn])) return i;
        let u = {};
        l.set(a, u);
        for (let c of Ha(a)) Rs(i, c) ? u[c] = l.has(a[c]) ? l.get(a[c]) : o(l)(a[c], i[c]) : l.has(a[c]) || (n += 1, Ln(a[c]) && (n += Ha(a[c]).length), o(l)(a[c], i[c]));
        if (Ha(u).length > 0) return u;
      }
    }
    return a;
  };
  return { subset: o()(e, t), stripped: n };
}
var Dt = class {
  constructor(e, t = !1) {
    this.sample = e, this.inverse = t;
  }
  $$typeof = Symbol.for("jest.asymmetricMatcher");
  getMatcherContext(e) {
    return { ...to(e || globalThis[gs]), equals: oe, isNot: this.inverse, customTesters: _s(), utils: { ...ch(), diff: Cr, stringify: Ke, iterableEquality: Ue, subsetEquality: Rn } };
  }
  [Symbol.for("chai/inspect")](e) {
    let t = Ke(this, e.depth, { min: !0 });
    return t.length <= e.truncate ? t : `${this.toString()}{…}`;
  }
}, Gc = class extends Dt {
  constructor(e, t = !1) {
    if (!et("String", e)) throw new Error("Expected is not a string");
    super(e, t);
  }
  asymmetricMatch(e) {
    let t = et("String", e) && e.includes(this.sample);
    return this.inverse ? !t : t;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "string";
  }
}, lA = class extends Dt {
  asymmetricMatch(e) {
    return e != null;
  }
  toString() {
    return "Anything";
  }
  toAsymmetricMatcher() {
    return "Anything";
  }
}, Wc = class extends Dt {
  constructor(e, t = !1) {
    super(e, t);
  }
  getPrototype(e) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.constructor.prototype === e ? null : e.constructor.prototype;
  }
  hasProperty(e, t) {
    return e ? Object.prototype.hasOwnProperty.call(e, t) ? !0 : this.hasProperty(this.getPrototype(e), t) : !1;
  }
  asymmetricMatch(e) {
    if (typeof this.sample != "object") throw new TypeError(`You must provide an object to ${this.toString()}, not '${typeof this.sample}'.`);
    let t = !0, r = this.getMatcherContext();
    for (let n in this.sample) if (!this.hasProperty(e, n) || !oe(this.sample[n], e[n], r.customTesters)) {
      t = !1;
      break;
    }
    return this.inverse ? !t : t;
  }
  toString() {
    return `Object${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "object";
  }
}, Kc = class extends Dt {
  constructor(e, t = !1) {
    super(e, t);
  }
  asymmetricMatch(e) {
    if (!Array.isArray(this.sample)) throw new TypeError(`You must provide an array to ${this.toString()}, not '${typeof this.sample}'.`);
    let t = this.getMatcherContext(), r = this.sample.length === 0 || Array.isArray(e) && this.sample.every((n) => e.some((o) => oe(n, o, t.customTesters)));
    return this.inverse ? !r : r;
  }
  toString() {
    return `Array${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "array";
  }
}, iA = class extends Dt {
  constructor(e) {
    if (typeof e > "u") throw new TypeError("any() expects to be passed a constructor function. Please pass one or use anything() to match any object.");
    super(e);
  }
  fnNameFor(e) {
    if (e.name) return e.name;
    let t = Function.prototype.toString.call(e).match(/^(?:async)?\s*function\s*(?:\*\s*)?([\w$]+)\s*\(/);
    return t ? t[1] : "<anonymous>";
  }
  asymmetricMatch(e) {
    return this.sample === String ? typeof e == "string" || e instanceof String : this.sample === Number ? typeof e == "number" || e instanceof Number : this.sample === Function ? typeof e == "function" || e instanceof Function : this.sample === Boolean ? typeof e == "boolean" || e instanceof Boolean : this.sample === BigInt ? typeof e == "bigint" || e instanceof BigInt : this.sample === Symbol ? typeof e == "symbol" || e instanceof Symbol : this.sample === Object ? typeof e == "object" : e instanceof this.sample;
  }
  toString() {
    return "Any";
  }
  getExpectedType() {
    return this.sample === String ? "string" : this.sample === Number ? "number" : this.sample === Function ? "function" : this.sample === Object ? "object" : this.sample === Boolean ? "boolean" : this.fnNameFor(this.sample);
  }
  toAsymmetricMatcher() {
    return `Any<${this.fnNameFor(this.sample)}>`;
  }
}, Yc = class extends Dt {
  constructor(e, t = !1) {
    if (!et("String", e) && !et("RegExp", e)) throw new Error("Expected is not a String or a RegExp");
    super(new RegExp(e), t);
  }
  asymmetricMatch(e) {
    let t = et("String", e) && this.sample.test(e);
    return this.inverse ? !t : t;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Matching`;
  }
  getExpectedType() {
    return "string";
  }
}, Jc = class extends Dt {
  precision;
  constructor(e, t = 2, r = !1) {
    if (!et("Number", e)) throw new Error("Expected is not a Number");
    if (!et("Number", t)) throw new Error("Precision is not a Number");
    super(e), this.inverse = r, this.precision = t;
  }
  asymmetricMatch(e) {
    if (!et("Number", e)) return !1;
    let t = !1;
    return e === Number.POSITIVE_INFINITY && this.sample === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY && this.sample === Number.NEGATIVE_INFINITY ? t = !0 : t = Math.abs(this.sample - e) < 10 ** -this.precision / 2, this.inverse ? !t : t;
  }
  toString() {
    return `Number${this.inverse ? "Not" : ""}CloseTo`;
  }
  getExpectedType() {
    return "number";
  }
  toAsymmetricMatcher() {
    return [this.toString(), this.sample, `(${oA("digit", this.precision)})`].join(" ");
  }
}, sA = (e, t) => {
  t.addMethod(e.expect, "anything", () => new lA()), t.addMethod(e.expect, "any", (r) => new iA(r)), t.addMethod(e.expect, "stringContaining", (r) => new Gc(r)), t.addMethod(e.expect, "objectContaining", (r) => new Wc(r)), t.addMethod(e.expect, "arrayContaining", (r) => new Kc(r)), t.addMethod(e.expect, "stringMatching", (r) => new Yc(r)), t.addMethod(e.expect, "closeTo", (r, n) => new Jc(r, n)), e.expect.not = { stringContaining: (r) => new Gc(r, !0), objectContaining: (r) => new Wc(r, !0), arrayContaining: (r) => new Kc(r, !0), stringMatching: (r) => new Yc(r, !0), closeTo: (r, n) => new Jc(r, n, !0) };
};
function Xc(e, t) {
  return e && t instanceof Promise && (t = t.finally(() => {
    let r = e.promises.indexOf(t);
    r !== -1 && e.promises.splice(r, 1);
  }), e.promises || (e.promises = []), e.promises.push(t)), t;
}
function bh(e, t) {
  return function(...r) {
    var n;
    if (!e.flag(this, "soft")) return t.apply(this, r);
    let o = e.flag(this, "vitest-test");
    if (!o) throw new Error("expect.soft() can only be used inside a test");
    try {
      return t.apply(this, r);
    } catch (l) {
      o.result || (o.result = { state: "fail" }), o.result.state = "fail", (n = o.result).errors || (n.errors = []), o.result.errors.push(sh(l));
    }
  };
}
var uA = (e, t) => {
  let { AssertionError: r } = e, n = _s();
  function o(s, d) {
    let f = (p) => {
      let m = bh(t, d);
      t.addMethod(e.Assertion.prototype, p, m), t.addMethod(globalThis[on].matchers, p, m);
    };
    Array.isArray(s) ? s.forEach((p) => f(p)) : f(s);
  }
  ["throw", "throws", "Throw"].forEach((s) => {
    t.overwriteMethod(e.Assertion.prototype, s, (d) => function(...f) {
      let p = t.flag(this, "promise"), m = t.flag(this, "object"), b = t.flag(this, "negate");
      if (p === "rejects") t.flag(this, "object", () => {
        throw m;
      });
      else if (p === "resolves" && typeof m != "function") {
        if (b) return;
        {
          let h = t.flag(this, "message") || "expected promise to throw an error, but it didn't", y = { showDiff: !1 };
          throw new r(h, y, t.flag(this, "ssfi"));
        }
      }
      d.apply(this, f);
    });
  }), o("withTest", function(s) {
    return t.flag(this, "vitest-test", s), this;
  }), o("toEqual", function(s) {
    let d = t.flag(this, "object"), f = oe(d, s, [...n, Ue]);
    return this.assert(f, "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", s, d);
  }), o("toStrictEqual", function(s) {
    let d = t.flag(this, "object"), f = oe(d, s, [...n, Ue, Vc, kl, zc], !0);
    return this.assert(f, "expected #{this} to strictly equal #{exp}", "expected #{this} to not strictly equal #{exp}", s, d);
  }), o("toBe", function(s) {
    let d = this._obj, f = Object.is(d, s), p = "";
    return f || (oe(d, s, [...n, Ue, Vc, kl, zc], !0) ? p = "toStrictEqual" : oe(d, s, [...n, Ue]) && (p = "toEqual")), this.assert(f, nA(p), "expected #{this} not to be #{exp} // Object.is equality", s, d);
  }), o("toMatchObject", function(s) {
    let d = this._obj, f = oe(d, s, [...n, Ue, Rn]), p = t.flag(this, "negate"), { subset: m, stripped: b } = aA(d, s);
    if (f && p || !f && !p) {
      let h = t.getMessage(this, [f, "expected #{this} to match object #{exp}", "expected #{this} to not match object #{exp}", s, m, !1]), y = b === 0 ? h : `${h}
(${b} matching ${b === 1 ? "property" : "properties"} omitted from actual)`;
      throw new r(y, { showDiff: !0, expected: s, actual: m });
    }
  }), o("toMatch", function(s) {
    let d = this._obj;
    if (typeof d != "string") throw new TypeError(`.toMatch() expects to receive a string, but got ${typeof d}`);
    return this.assert(typeof s == "string" ? d.includes(s) : d.match(s), "expected #{this} to match #{exp}", "expected #{this} not to match #{exp}", s, d);
  }), o("toContain", function(s) {
    let d = this._obj;
    if (typeof Node < "u" && d instanceof Node) {
      if (!(s instanceof Node)) throw new TypeError(`toContain() expected a DOM node as the argument, but got ${typeof s}`);
      return this.assert(d.contains(s), "expected #{this} to contain element #{exp}", "expected #{this} not to contain element #{exp}", s, d);
    }
    if (typeof DOMTokenList < "u" && d instanceof DOMTokenList) {
      ft(s, "class name", ["string"]);
      let f = t.flag(this, "negate") ? d.value.replace(s, "").trim() : `${d.value} ${s}`;
      return this.assert(d.contains(s), `expected "${d.value}" to contain "${s}"`, `expected "${d.value}" not to contain "${s}"`, f, d.value);
    }
    return typeof d == "string" && typeof s == "string" ? this.assert(d.includes(s), "expected #{this} to contain #{exp}", "expected #{this} not to contain #{exp}", s, d) : (d != null && typeof d != "string" && t.flag(this, "object", Array.from(d)), this.contain(s));
  }), o("toContainEqual", function(s) {
    let d = t.flag(this, "object"), f = Array.from(d).findIndex((p) => oe(p, s, n));
    this.assert(f !== -1, "expected #{this} to deep equally contain #{exp}", "expected #{this} to not deep equally contain #{exp}", s);
  }), o("toBeTruthy", function() {
    let s = t.flag(this, "object");
    this.assert(!!s, "expected #{this} to be truthy", "expected #{this} to not be truthy", s, !1);
  }), o("toBeFalsy", function() {
    let s = t.flag(this, "object");
    this.assert(!s, "expected #{this} to be falsy", "expected #{this} to not be falsy", s, !1);
  }), o("toBeGreaterThan", function(s) {
    let d = this._obj;
    return ft(d, "actual", ["number", "bigint"]), ft(s, "expected", ["number", "bigint"]), this.assert(d > s, `expected ${d} to be greater than ${s}`, `expected ${d} to be not greater than ${s}`, d, s, !1);
  }), o("toBeGreaterThanOrEqual", function(s) {
    let d = this._obj;
    return ft(d, "actual", ["number", "bigint"]), ft(s, "expected", ["number", "bigint"]), this.assert(d >= s, `expected ${d} to be greater than or equal to ${s}`, `expected ${d} to be not greater than or equal to ${s}`, d, s, !1);
  }), o("toBeLessThan", function(s) {
    let d = this._obj;
    return ft(d, "actual", ["number", "bigint"]), ft(s, "expected", ["number", "bigint"]), this.assert(d < s, `expected ${d} to be less than ${s}`, `expected ${d} to be not less than ${s}`, d, s, !1);
  }), o("toBeLessThanOrEqual", function(s) {
    let d = this._obj;
    return ft(d, "actual", ["number", "bigint"]), ft(s, "expected", ["number", "bigint"]), this.assert(d <= s, `expected ${d} to be less than or equal to ${s}`, `expected ${d} to be not less than or equal to ${s}`, d, s, !1);
  }), o("toBeNaN", function() {
    return this.be.NaN;
  }), o("toBeUndefined", function() {
    return this.be.undefined;
  }), o("toBeNull", function() {
    return this.be.null;
  }), o("toBeDefined", function() {
    let s = t.flag(this, "negate");
    return t.flag(this, "negate", !1), s ? this.be.undefined : this.not.be.undefined;
  }), o("toBeTypeOf", function(s) {
    let d = typeof this._obj, f = s === d;
    return this.assert(f, "expected #{this} to be type of #{exp}", "expected #{this} not to be type of #{exp}", s, d);
  }), o("toBeInstanceOf", function(s) {
    return this.instanceOf(s);
  }), o("toHaveLength", function(s) {
    return this.have.length(s);
  }), o("toHaveProperty", function(...s) {
    Array.isArray(s[0]) && (s[0] = s[0].map((q) => String(q).replace(/([.[\]])/g, "\\$1")).join("."));
    let d = this._obj, [f, p] = s, m = () => Object.prototype.hasOwnProperty.call(d, f) ? { value: d[f], exists: !0 } : t.getPathInfo(d, f), { value: b, exists: h } = m(), y = h && (s.length === 1 || oe(p, b, n)), g = s.length === 1 ? "" : ` with value ${t.objDisplay(p)}`;
    return this.assert(y, `expected #{this} to have property "${f}"${g}`, `expected #{this} to not have property "${f}"${g}`, p, h ? b : void 0);
  }), o("toBeCloseTo", function(s, d = 2) {
    let f = this._obj, p = !1, m = 0, b = 0;
    return s === Number.POSITIVE_INFINITY && f === Number.POSITIVE_INFINITY || s === Number.NEGATIVE_INFINITY && f === Number.NEGATIVE_INFINITY ? p = !0 : (m = 10 ** -d / 2, b = Math.abs(f - s), p = b < m), this.assert(p, `expected #{this} to be close to #{exp}, received difference is ${b}, but expected ${m}`, `expected #{this} to not be close to #{exp}, received difference is ${b}, but expected ${m}`, s, f, !1);
  });
  let l = (s) => {
    if (!ih(s._obj)) throw new TypeError(`${t.inspect(s._obj)} is not a spy or a call to a spy!`);
  }, a = (s) => (l(s), s._obj), i = (s) => {
    let d = s % 10, f = s % 100;
    return d === 1 && f !== 11 ? `${s}st` : d === 2 && f !== 12 ? `${s}nd` : d === 3 && f !== 13 ? `${s}rd` : `${s}th`;
  }, u = (s, d, f) => (s.mock.calls && (d += Re.gray(`

Received: 

${s.mock.calls.map((p, m) => {
    let b = Re.bold(`  ${i(m + 1)} ${s.getMockName()} call:

`);
    return f ? b += Cr(f, p, { omitAnnotationLines: !0 }) : b += Ke(p).split(`
`).map((h) => `    ${h}`).join(`
`), b += `
`, b;
  }).join(`
`)}`)), d += Re.gray(`

Number of calls: ${Re.bold(s.mock.calls.length)}
`), d), c = (s, d, f, p) => (f += Re.gray(`

Received: 

${d.map((m, b) => {
    let h = Re.bold(`  ${i(b + 1)} ${s.getMockName()} call return:

`);
    return p ? h += Cr(p, m.value, { omitAnnotationLines: !0 }) : h += Ke(m).split(`
`).map((y) => `    ${y}`).join(`
`), h += `
`, h;
  }).join(`
`)}`), f += Re.gray(`

Number of calls: ${Re.bold(s.mock.calls.length)}
`), f);
  o(["toHaveBeenCalledTimes", "toBeCalledTimes"], function(s) {
    let d = a(this), f = d.getMockName(), p = d.mock.calls.length;
    return this.assert(p === s, `expected "${f}" to be called #{exp} times, but got ${p} times`, `expected "${f}" to not be called #{exp} times`, s, p, !1);
  }), o("toHaveBeenCalledOnce", function() {
    let s = a(this), d = s.getMockName(), f = s.mock.calls.length;
    return this.assert(f === 1, `expected "${d}" to be called once, but got ${f} times`, `expected "${d}" to not be called once`, 1, f, !1);
  }), o(["toHaveBeenCalled", "toBeCalled"], function() {
    let s = a(this), d = s.getMockName(), f = s.mock.calls.length, p = f > 0, m = t.flag(this, "negate"), b = t.getMessage(this, [p, `expected "${d}" to be called at least once`, `expected "${d}" to not be called at all, but actually been called ${f} times`, !0, p]);
    if (p && m && (b = u(s, b)), p && m || !p && !m) throw new r(b);
  }), o(["toHaveBeenCalledWith", "toBeCalledWith"], function(...s) {
    let d = a(this), f = d.getMockName(), p = d.mock.calls.some((h) => oe(h, s, [...n, Ue])), m = t.flag(this, "negate"), b = t.getMessage(this, [p, `expected "${f}" to be called with arguments: #{exp}`, `expected "${f}" to not be called with arguments: #{exp}`, s]);
    if (p && m || !p && !m) throw new r(u(d, b, s));
  }), o(["toHaveBeenNthCalledWith", "nthCalledWith"], function(s, ...d) {
    let f = a(this), p = f.getMockName(), m = f.mock.calls[s - 1], b = f.mock.calls.length, h = s <= b;
    this.assert(oe(m, d, [...n, Ue]), `expected ${i(s)} "${p}" call to have been called with #{exp}${h ? "" : `, but called only ${b} times`}`, `expected ${i(s)} "${p}" call to not have been called with #{exp}`, d, m, h);
  }), o(["toHaveBeenLastCalledWith", "lastCalledWith"], function(...s) {
    let d = a(this), f = d.getMockName(), p = d.mock.calls[d.mock.calls.length - 1];
    this.assert(oe(p, s, [...n, Ue]), `expected last "${f}" call to have been called with #{exp}`, `expected last "${f}" call to not have been called with #{exp}`, s, p);
  }), o(["toThrow", "toThrowError"], function(s) {
    if (typeof s == "string" || typeof s > "u" || s instanceof RegExp) return this.throws(s);
    let d = this._obj, f = t.flag(this, "promise"), p = t.flag(this, "negate"), m = null;
    if (f === "rejects") m = d;
    else if (f === "resolves" && typeof d != "function") {
      if (p) return;
      {
        let b = t.flag(this, "message") || "expected promise to throw an error, but it didn't", h = { showDiff: !1 };
        throw new r(b, h, t.flag(this, "ssfi"));
      }
    } else {
      let b = !1;
      try {
        d();
      } catch (h) {
        b = !0, m = h;
      }
      if (!b && !p) {
        let h = t.flag(this, "message") || "expected function to throw an error, but it didn't", y = { showDiff: !1 };
        throw new r(h, y, t.flag(this, "ssfi"));
      }
    }
    if (typeof s == "function") {
      let b = s.name || s.prototype.constructor.name;
      return this.assert(m && m instanceof s, `expected error to be instance of ${b}`, `expected error not to be instance of ${b}`, s, m);
    }
    if (s instanceof Error) return this.assert(m && s.message === m.message, `expected error to have message: ${s.message}`, `expected error not to have message: ${s.message}`, s.message, m && m.message);
    if (typeof s == "object" && "asymmetricMatch" in s && typeof s.asymmetricMatch == "function") {
      let b = s;
      return this.assert(m && b.asymmetricMatch(m), "expected error to match asymmetric matcher", "expected error not to match asymmetric matcher", b, m);
    }
    throw new Error(`"toThrow" expects string, RegExp, function, Error instance or asymmetric matcher, got "${typeof s}"`);
  }), [{ name: "toHaveResolved", condition: (s) => s.mock.settledResults.length > 0 && s.mock.settledResults.some(({ type: d }) => d === "fulfilled"), action: "resolved" }, { name: ["toHaveReturned", "toReturn"], condition: (s) => s.mock.calls.length > 0 && s.mock.results.some(({ type: d }) => d !== "throw"), action: "called" }].forEach(({ name: s, condition: d, action: f }) => {
    o(s, function() {
      let p = a(this), m = p.getMockName(), b = d(p);
      this.assert(b, `expected "${m}" to be successfully ${f} at least once`, `expected "${m}" to not be successfully ${f}`, b, !b, !1);
    });
  }), [{ name: "toHaveResolvedTimes", condition: (s, d) => s.mock.settledResults.reduce((f, { type: p }) => p === "fulfilled" ? ++f : f, 0) === d, action: "resolved" }, { name: ["toHaveReturnedTimes", "toReturnTimes"], condition: (s, d) => s.mock.results.reduce((f, { type: p }) => p === "throw" ? f : ++f, 0) === d, action: "called" }].forEach(({ name: s, condition: d, action: f }) => {
    o(s, function(p) {
      let m = a(this), b = m.getMockName(), h = d(m, p);
      this.assert(h, `expected "${b}" to be successfully ${f} ${p} times`, `expected "${b}" to not be successfully ${f} ${p} times`, `expected resolved times: ${p}`, `received resolved times: ${h}`, !1);
    });
  }), [{ name: "toHaveResolvedWith", condition: (s, d) => s.mock.settledResults.some(({ type: f, value: p }) => f === "fulfilled" && oe(d, p)), action: "resolve" }, { name: ["toHaveReturnedWith", "toReturnWith"], condition: (s, d) => s.mock.results.some(({ type: f, value: p }) => f === "return" && oe(d, p)), action: "return" }].forEach(({ name: s, condition: d, action: f }) => {
    o(s, function(p) {
      let m = a(this), b = d(m, p), h = t.flag(this, "negate");
      if (b && h || !b && !h) {
        let y = m.getMockName(), g = t.getMessage(this, [b, `expected "${y}" to ${f} with: #{exp} at least once`, `expected "${y}" to not ${f} with: #{exp}`, p]), q = f === "return" ? m.mock.results : m.mock.settledResults;
        throw new r(c(m, q, g, p));
      }
    });
  }), [{ name: "toHaveLastResolvedWith", condition: (s, d) => {
    let f = s.mock.settledResults[s.mock.settledResults.length - 1];
    return f && f.type === "fulfilled" && oe(f.value, d);
  }, action: "resolve" }, { name: ["toHaveLastReturnedWith", "lastReturnedWith"], condition: (s, d) => {
    let f = s.mock.results[s.mock.results.length - 1];
    return f && f.type === "return" && oe(f.value, d);
  }, action: "return" }].forEach(({ name: s, condition: d, action: f }) => {
    o(s, function(p) {
      let m = a(this), b = f === "return" ? m.mock.results : m.mock.settledResults, h = b[b.length - 1], y = m.getMockName();
      this.assert(d(m, p), `expected last "${y}" call to ${f} #{exp}`, `expected last "${y}" call to not ${f} #{exp}`, p, h?.value);
    });
  }), [{ name: "toHaveNthResolvedWith", condition: (s, d, f) => {
    let p = s.mock.settledResults[d - 1];
    return p && p.type === "fulfilled" && oe(p.value, f);
  }, action: "resolve" }, { name: ["toHaveNthReturnedWith", "nthReturnedWith"], condition: (s, d, f) => {
    let p = s.mock.results[d - 1];
    return p && p.type === "return" && oe(p.value, f);
  }, action: "return" }].forEach(({ name: s, condition: d, action: f }) => {
    o(s, function(p, m) {
      let b = a(this), h = b.getMockName(), y = (f === "return" ? b.mock.results : b.mock.settledResults)[p - 1], g = `${i(p)} call`;
      this.assert(d(b, p, m), `expected ${g} "${h}" call to ${f} #{exp}`, `expected ${g} "${h}" call to not ${f} #{exp}`, m, y?.value);
    });
  }), o("toSatisfy", function(s, d) {
    return this.be.satisfy(s, d);
  }), o("withContext", function(s) {
    for (let d in s) t.flag(this, d, s[d]);
    return this;
  }), t.addProperty(e.Assertion.prototype, "resolves", function() {
    let s = new Error("resolves");
    t.flag(this, "promise", "resolves"), t.flag(this, "error", s);
    let d = t.flag(this, "vitest-test"), f = t.flag(this, "object");
    if (t.flag(this, "poll")) throw new SyntaxError("expect.poll() is not supported in combination with .resolves");
    if (typeof f?.then != "function") throw new TypeError(`You must provide a Promise to expect() when using .resolves, not '${typeof f}'.`);
    let p = new Proxy(this, { get: (m, b, h) => {
      let y = Reflect.get(m, b, h);
      return typeof y != "function" ? y instanceof e.Assertion ? p : y : async (...g) => {
        let q = f.then((C) => (t.flag(this, "object", C), y.call(this, ...g)), (C) => {
          let E = new r(`promise rejected "${t.inspect(C)}" instead of resolving`, { showDiff: !1 });
          throw E.cause = C, E.stack = s.stack.replace(s.message, E.message), E;
        });
        return Xc(d, q);
      };
    } });
    return p;
  }), t.addProperty(e.Assertion.prototype, "rejects", function() {
    let s = new Error("rejects");
    t.flag(this, "promise", "rejects"), t.flag(this, "error", s);
    let d = t.flag(this, "vitest-test"), f = t.flag(this, "object"), p = typeof f == "function" ? f() : f;
    if (t.flag(this, "poll")) throw new SyntaxError("expect.poll() is not supported in combination with .rejects");
    if (typeof p?.then != "function") throw new TypeError(`You must provide a Promise to expect() when using .rejects, not '${typeof p}'.`);
    let m = new Proxy(this, { get: (b, h, y) => {
      let g = Reflect.get(b, h, y);
      return typeof g != "function" ? g instanceof e.Assertion ? m : g : async (...q) => {
        let C = p.then((E) => {
          let _ = new r(`promise resolved "${t.inspect(E)}" instead of rejecting`, { showDiff: !0, expected: new Error("rejected promise"), actual: E });
          throw _.stack = s.stack.replace(s.message, _.message), _;
        }, (E) => (t.flag(this, "object", E), g.call(this, ...q)));
        return Xc(d, C);
      };
    } });
    return m;
  });
};
function cA(e, t) {
  let r = e._obj, n = lt.flag(e, "negate"), o = lt.flag(e, "promise") || "", l = { ...ch(), diff: Cr, stringify: Ke, iterableEquality: Ue, subsetEquality: Rn };
  return { state: { ...to(t), customTesters: _s(), isNot: n, utils: l, promise: o, equals: oe, suppressedErrors: [], soft: lt.flag(e, "soft"), poll: lt.flag(e, "poll") }, isNot: n, obj: r };
}
var Qc = class extends Error {
  constructor(e, t, r) {
    super(e), this.actual = t, this.expected = r;
  }
};
function dA(e, t, r) {
  return (n, o) => {
    Object.entries(r).forEach(([l, a]) => {
      function i(...d) {
        let { state: f, isNot: p, obj: m } = cA(this, t), b = a.call(f, m, ...d);
        if (b && typeof b == "object" && b instanceof Promise) return b.then(({ pass: C, message: E, actual: _, expected: v }) => {
          if (C && p || !C && !p) throw new Qc(E(), _, v);
        });
        let { pass: h, message: y, actual: g, expected: q } = b;
        if (h && p || !h && !p) throw new Qc(y(), g, q);
      }
      let u = bh(o, i);
      o.addMethod(globalThis[on].matchers, l, u), o.addMethod(e.Assertion.prototype, l, u);
      class c extends Dt {
        constructor(f = !1, ...p) {
          super(p, f);
        }
        asymmetricMatch(f) {
          let { pass: p } = a.call(this.getMatcherContext(t), f, ...this.sample);
          return this.inverse ? !p : p;
        }
        toString() {
          return `${this.inverse ? "not." : ""}${l}`;
        }
        getExpectedType() {
          return "any";
        }
        toAsymmetricMatcher() {
          return `${this.toString()}<${this.sample.map(String).join(", ")}>`;
        }
      }
      let s = (...d) => new c(!1, ...d);
      Object.defineProperty(t, l, { configurable: !0, enumerable: !0, value: s, writable: !0 }), Object.defineProperty(t.not, l, { configurable: !0, enumerable: !0, value: (...d) => new c(!0, ...d), writable: !0 }), Object.defineProperty(globalThis[Ll], l, { configurable: !0, enumerable: !0, value: s, writable: !0 });
    });
  };
}
var pA = (e, t) => {
  t.addMethod(e.expect, "extend", (r, n) => {
    mr(dA(e, r, n));
  });
};
function fA() {
  mr(pA), mr(uA), mr(sA);
  let e = (n, o) => {
    let { assertionCalls: l } = to(e);
    return Ua({ assertionCalls: l + 1, soft: !1 }, e), zt(n, o);
  };
  Object.assign(e, zt), e.getState = () => to(e), e.setState = (n) => Ua(n, e), e.extend = (n) => zt.extend(e, n), e.soft = (...n) => {
    let o = e(...n);
    return e.setState({ soft: !0 }), o;
  }, e.unreachable = (n) => {
    O.fail(`expected${n ? ` "${n}" ` : " "}not to be reached`);
  };
  function t(n) {
    let o = () => new Error(`expected number of assertions to be ${n}, but got ${e.getState().assertionCalls}`);
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(o(), t), e.setState({ expectedAssertionsNumber: n, expectedAssertionsNumberErrorGen: o });
  }
  function r() {
    let n = new Error("expected any number of assertion, but got none");
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(n, r), e.setState({ isExpectingAssertions: !0, isExpectingAssertionsError: n });
  }
  return Ua({ assertionCalls: 0, isExpectingAssertions: !1, isExpectingAssertionsError: null, expectedAssertionsNumber: null, expectedAssertionsNumberErrorGen: null }, e), lt.addMethod(e, "assertions", t), lt.addMethod(e, "hasAssertions", r), e.extend(Tf), e;
}
var yh = fA();
Object.defineProperty(globalThis, gs, { value: yh, writable: !0, configurable: !0 });
var Bl = /* @__PURE__ */ new Set();
function mA(e) {
  return Bl.add(e), () => void Bl.delete(e);
}
function hA(e) {
  let t = e ? kc(e) : kc();
  return bA(t);
}
function bA(e) {
  let t = Zc(e), r = t.mockImplementation.bind(null);
  return t.mockImplementation = (n) => Zc(r(n)), t;
}
function Zc(e) {
  let t = eo(e), r = t.impl;
  return t.willCall(function(...n) {
    return Bl.forEach((o) => o(e, n)), r?.apply(this, n);
  }), e;
}
function yA() {
  Lo.forEach((e) => e.mockClear());
}
function gA() {
  Lo.forEach((e) => e.mockReset());
}
function vA() {
  Lo.forEach((e) => e.mockRestore());
}
var gh = {};
yi(gh, { buildQueries: () => Ct, configure: () => xx, createEvent: () => Fn, findAllByAltText: () => wb, findAllByDisplayValue: () => bb, findAllByLabelText: () => Yh, findAllByPlaceholderText: () => ob, findAllByRole: () => $b, findAllByTestId: () => Fb, findAllByText: () => cb, findAllByTitle: () => Tb, findByAltText: () => Eb, findByDisplayValue: () => yb, findByLabelText: () => Jh, findByPlaceholderText: () => ab, findByRole: () => Ib, findByTestId: () => Ub, findByText: () => db, findByTitle: () => Sb, fireEvent: () => cn, getAllByAltText: () => _b, getAllByDisplayValue: () => mb, getAllByLabelText: () => Xh, getAllByPlaceholderText: () => rb, getAllByRole: () => jb, getAllByTestId: () => Bb, getAllByText: () => sb, getAllByTitle: () => Pb, getByAltText: () => Rb, getByDisplayValue: () => hb, getByLabelText: () => Qh, getByPlaceholderText: () => nb, getByRole: () => Nb, getByTestId: () => Db, getByText: () => ub, getByTitle: () => Ob, getConfig: () => te, getDefaultNormalizer: () => Os, getElementError: () => Fo, getMultipleElementsFoundError: () => Uo, getNodeText: () => wn, getQueriesForElement: () => Yl, getRoles: () => Uh, getSuggestedQuery: () => oo, isInaccessible: () => Do, logDOM: () => Dl, logRoles: () => Lx, makeFindQuery: () => Pr, makeGetAllQuery: () => Ms, makeSingleQuery: () => qr, prettyDOM: () => sn, prettyFormat: () => ws, queries: () => ao, queryAllByAltText: () => gb, queryAllByAttribute: () => tr, queryAllByDisplayValue: () => pb, queryAllByLabelText: () => Zh, queryAllByPlaceholderText: () => eb, queryAllByRole: () => Ab, queryAllByTestId: () => Lb, queryAllByText: () => lb, queryAllByTitle: () => Cb, queryByAltText: () => vb, queryByAttribute: () => Vh, queryByDisplayValue: () => fb, queryByLabelText: () => Wh, queryByPlaceholderText: () => tb, queryByRole: () => xb, queryByTestId: () => kb, queryByText: () => ib, queryByTitle: () => qb, queryHelpers: () => Xx, screen: () => qj, waitFor: () => Ss, waitForElementToBeRemoved: () => gj, within: () => Yl, wrapAllByQueryWithSuggestion: () => De, wrapSingleQueryWithSuggestion: () => $t });
var ws = He(J0()), _A = Object.prototype.toString;
function RA(e) {
  return typeof e == "function" || _A.call(e) === "[object Function]";
}
function wA(e) {
  var t = Number(e);
  return isNaN(t) ? 0 : t === 0 || !isFinite(t) ? t : (t > 0 ? 1 : -1) * Math.floor(Math.abs(t));
}
var EA = Math.pow(2, 53) - 1;
function CA(e) {
  var t = wA(e);
  return Math.min(Math.max(t, 0), EA);
}
function Ze(e, t) {
  var r = Array, n = Object(e);
  if (e == null) throw new TypeError("Array.from requires an array-like object - not null or undefined");
  for (var o = CA(n.length), l = RA(r) ? Object(new r(o)) : new Array(o), a = 0, i; a < o; ) i = n[a], l[a] = i, a += 1;
  return l.length = o, l;
}
function an(e) {
  "@babel/helpers - typeof";
  return an = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, an(e);
}
function qA(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function PA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, vh(n.key), n);
  }
}
function OA(e, t, r) {
  return t && PA(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function TA(e, t, r) {
  return t = vh(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vh(e) {
  var t = SA(e, "string");
  return an(t) === "symbol" ? t : String(t);
}
function SA(e, t) {
  if (an(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (an(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var MA = function() {
  function e() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    qA(this, e), TA(this, "items", void 0), this.items = t;
  }
  return OA(e, [{ key: "add", value: function(t) {
    return this.has(t) === !1 && this.items.push(t), this;
  } }, { key: "clear", value: function() {
    this.items = [];
  } }, { key: "delete", value: function(t) {
    var r = this.items.length;
    return this.items = this.items.filter(function(n) {
      return n !== t;
    }), r !== this.items.length;
  } }, { key: "forEach", value: function(t) {
    var r = this;
    this.items.forEach(function(n) {
      t(n, n, r);
    });
  } }, { key: "has", value: function(t) {
    return this.items.indexOf(t) !== -1;
  } }, { key: "size", get: function() {
    return this.items.length;
  } }]), e;
}(), AA = typeof Set > "u" ? Set : MA;
function Ne(e) {
  var t;
  return (t = e.localName) !== null && t !== void 0 ? t : e.tagName.toLowerCase();
}
var xA = { article: "article", aside: "complementary", button: "button", datalist: "listbox", dd: "definition", details: "group", dialog: "dialog", dt: "term", fieldset: "group", figure: "figure", form: "form", footer: "contentinfo", h1: "heading", h2: "heading", h3: "heading", h4: "heading", h5: "heading", h6: "heading", header: "banner", hr: "separator", html: "document", legend: "legend", li: "listitem", math: "math", main: "main", menu: "list", nav: "navigation", ol: "list", optgroup: "group", option: "option", output: "status", progress: "progressbar", section: "region", summary: "button", table: "table", tbody: "rowgroup", textarea: "textbox", tfoot: "rowgroup", td: "cell", th: "columnheader", thead: "rowgroup", tr: "row", ul: "list" }, jA = { caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]), insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]), superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]) };
function NA(e, t) {
  return ["aria-atomic", "aria-busy", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-dropeffect", "aria-flowto", "aria-grabbed", "aria-hidden", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-live", "aria-owns", "aria-relevant", "aria-roledescription"].some(function(r) {
    var n;
    return e.hasAttribute(r) && !((n = jA[t]) !== null && n !== void 0 && n.has(r));
  });
}
function _h(e, t) {
  return NA(e, t);
}
function $A(e) {
  var t = LA(e);
  if (t === null || t === "presentation") {
    var r = IA(e);
    if (t !== "presentation" || _h(e, r || "")) return r;
  }
  return t;
}
function IA(e) {
  var t = xA[Ne(e)];
  if (t !== void 0) return t;
  switch (Ne(e)) {
    case "a":
    case "area":
    case "link":
      if (e.hasAttribute("href")) return "link";
      break;
    case "img":
      return e.getAttribute("alt") === "" && !_h(e, "img") ? "presentation" : "img";
    case "input": {
      var r = e, n = r.type;
      switch (n) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return n;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          return e.hasAttribute("list") ? "combobox" : "textbox";
        case "search":
          return e.hasAttribute("list") ? "combobox" : "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      return e.hasAttribute("multiple") || e.size > 1 ? "listbox" : "combobox";
  }
  return null;
}
function LA(e) {
  var t = e.getAttribute("role");
  if (t !== null) {
    var r = t.trim().split(" ")[0];
    if (r.length > 0) return r;
  }
  return null;
}
function ye(e) {
  return e !== null && e.nodeType === e.ELEMENT_NODE;
}
function Rh(e) {
  return ye(e) && Ne(e) === "caption";
}
function Dn(e) {
  return ye(e) && Ne(e) === "input";
}
function kA(e) {
  return ye(e) && Ne(e) === "optgroup";
}
function BA(e) {
  return ye(e) && Ne(e) === "select";
}
function DA(e) {
  return ye(e) && Ne(e) === "table";
}
function FA(e) {
  return ye(e) && Ne(e) === "textarea";
}
function UA(e) {
  var t = e.ownerDocument === null ? e : e.ownerDocument, r = t.defaultView;
  if (r === null) throw new TypeError("no window available");
  return r;
}
function HA(e) {
  return ye(e) && Ne(e) === "fieldset";
}
function VA(e) {
  return ye(e) && Ne(e) === "legend";
}
function zA(e) {
  return ye(e) && Ne(e) === "slot";
}
function GA(e) {
  return ye(e) && e.ownerSVGElement !== void 0;
}
function WA(e) {
  return ye(e) && Ne(e) === "svg";
}
function KA(e) {
  return GA(e) && Ne(e) === "title";
}
function no(e, t) {
  if (ye(e) && e.hasAttribute(t)) {
    var r = e.getAttribute(t).split(" "), n = e.getRootNode ? e.getRootNode() : e.ownerDocument;
    return r.map(function(o) {
      return n.getElementById(o);
    }).filter(function(o) {
      return o !== null;
    });
  }
  return [];
}
function yt(e, t) {
  return ye(e) ? t.indexOf($A(e)) !== -1 : !1;
}
function YA(e) {
  return e.trim().replace(/\s\s+/g, " ");
}
function JA(e, t) {
  if (!ye(e)) return !1;
  if (e.hasAttribute("hidden") || e.getAttribute("aria-hidden") === "true") return !0;
  var r = t(e);
  return r.getPropertyValue("display") === "none" || r.getPropertyValue("visibility") === "hidden";
}
function XA(e) {
  return yt(e, ["button", "combobox", "listbox", "textbox"]) || wh(e, "range");
}
function wh(e, t) {
  if (!ye(e)) return !1;
  switch (t) {
    case "range":
      return yt(e, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
    default:
      throw new TypeError("No knowledge about abstract role '".concat(t, "'. This is likely a bug :("));
  }
}
function ed(e, t) {
  var r = Ze(e.querySelectorAll(t));
  return no(e, "aria-owns").forEach(function(n) {
    r.push.apply(r, Ze(n.querySelectorAll(t)));
  }), r;
}
function QA(e) {
  return BA(e) ? e.selectedOptions || ed(e, "[selected]") : ed(e, '[aria-selected="true"]');
}
function ZA(e) {
  return yt(e, ["none", "presentation"]);
}
function ex(e) {
  return Rh(e);
}
function tx(e) {
  return yt(e, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
function rx(e) {
  return !1;
}
function nx(e) {
  return Dn(e) || FA(e) ? e.value : e.textContent || "";
}
function td(e) {
  var t = e.getPropertyValue("content");
  return /^["'].*["']$/.test(t) ? t.slice(1, -1) : "";
}
function Eh(e) {
  var t = Ne(e);
  return t === "button" || t === "input" && e.getAttribute("type") !== "hidden" || t === "meter" || t === "output" || t === "progress" || t === "select" || t === "textarea";
}
function Ch(e) {
  if (Eh(e)) return e;
  var t = null;
  return e.childNodes.forEach(function(r) {
    if (t === null && ye(r)) {
      var n = Ch(r);
      n !== null && (t = n);
    }
  }), t;
}
function ox(e) {
  if (e.control !== void 0) return e.control;
  var t = e.getAttribute("for");
  return t !== null ? e.ownerDocument.getElementById(t) : Ch(e);
}
function ax(e) {
  var t = e.labels;
  if (t === null) return t;
  if (t !== void 0) return Ze(t);
  if (!Eh(e)) return null;
  var r = e.ownerDocument;
  return Ze(r.querySelectorAll("label")).filter(function(n) {
    return ox(n) === e;
  });
}
function lx(e) {
  var t = e.assignedNodes();
  return t.length === 0 ? Ze(e.childNodes) : t;
}
function qh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = new AA(), n = UA(e), o = t.compute, l = o === void 0 ? "name" : o, a = t.computedStyleSupportsPseudoElements, i = a === void 0 ? t.getComputedStyle !== void 0 : a, u = t.getComputedStyle, c = u === void 0 ? n.getComputedStyle.bind(n) : u, s = t.hidden, d = s === void 0 ? !1 : s;
  function f(y, g) {
    var q = "";
    if (ye(y) && i) {
      var C = c(y, "::before"), E = td(C);
      q = "".concat(E, " ").concat(q);
    }
    var _ = zA(y) ? lx(y) : Ze(y.childNodes).concat(no(y, "aria-owns"));
    if (_.forEach(function(P) {
      var j = h(P, { isEmbeddedInLabel: g.isEmbeddedInLabel, isReferenced: !1, recursion: !0 }), $ = ye(P) ? c(P).getPropertyValue("display") : "inline", k = $ !== "inline" ? " " : "";
      q += "".concat(k).concat(j).concat(k);
    }), ye(y) && i) {
      var v = c(y, "::after"), w = td(v);
      q = "".concat(q, " ").concat(w);
    }
    return q.trim();
  }
  function p(y, g) {
    var q = y.getAttributeNode(g);
    return q !== null && !r.has(q) && q.value.trim() !== "" ? (r.add(q), q.value) : null;
  }
  function m(y) {
    return ye(y) ? p(y, "title") : null;
  }
  function b(y) {
    if (!ye(y)) return null;
    if (HA(y)) {
      r.add(y);
      for (var g = Ze(y.childNodes), q = 0; q < g.length; q += 1) {
        var C = g[q];
        if (VA(C)) return h(C, { isEmbeddedInLabel: !1, isReferenced: !1, recursion: !1 });
      }
    } else if (DA(y)) {
      r.add(y);
      for (var E = Ze(y.childNodes), _ = 0; _ < E.length; _ += 1) {
        var v = E[_];
        if (Rh(v)) return h(v, { isEmbeddedInLabel: !1, isReferenced: !1, recursion: !1 });
      }
    } else if (WA(y)) {
      r.add(y);
      for (var w = Ze(y.childNodes), P = 0; P < w.length; P += 1) {
        var j = w[P];
        if (KA(j)) return j.textContent;
      }
      return null;
    } else if (Ne(y) === "img" || Ne(y) === "area") {
      var $ = p(y, "alt");
      if ($ !== null) return $;
    } else if (kA(y)) {
      var k = p(y, "label");
      if (k !== null) return k;
    }
    if (Dn(y) && (y.type === "button" || y.type === "submit" || y.type === "reset")) {
      var L = p(y, "value");
      if (L !== null) return L;
      if (y.type === "submit") return "Submit";
      if (y.type === "reset") return "Reset";
    }
    var S = ax(y);
    if (S !== null && S.length !== 0) return r.add(y), Ze(S).map(function(K) {
      return h(K, { isEmbeddedInLabel: !0, isReferenced: !1, recursion: !0 });
    }).filter(function(K) {
      return K.length > 0;
    }).join(" ");
    if (Dn(y) && y.type === "image") {
      var B = p(y, "alt");
      if (B !== null) return B;
      var z = p(y, "title");
      return z !== null ? z : "Submit Query";
    }
    if (yt(y, ["button"])) {
      var Y = f(y, { isEmbeddedInLabel: !1 });
      if (Y !== "") return Y;
    }
    return null;
  }
  function h(y, g) {
    if (r.has(y)) return "";
    if (!d && JA(y, c) && !g.isReferenced) return r.add(y), "";
    var q = ye(y) ? y.getAttributeNode("aria-labelledby") : null, C = q !== null && !r.has(q) ? no(y, "aria-labelledby") : [];
    if (l === "name" && !g.isReferenced && C.length > 0) return r.add(q), C.map(function($) {
      return h($, { isEmbeddedInLabel: g.isEmbeddedInLabel, isReferenced: !0, recursion: !1 });
    }).join(" ");
    var E = g.recursion && XA(y) && l === "name";
    if (!E) {
      var _ = (ye(y) && y.getAttribute("aria-label") || "").trim();
      if (_ !== "" && l === "name") return r.add(y), _;
      if (!ZA(y)) {
        var v = b(y);
        if (v !== null) return r.add(y), v;
      }
    }
    if (yt(y, ["menu"])) return r.add(y), "";
    if (E || g.isEmbeddedInLabel || g.isReferenced) {
      if (yt(y, ["combobox", "listbox"])) {
        r.add(y);
        var w = QA(y);
        return w.length === 0 ? Dn(y) ? y.value : "" : Ze(w).map(function($) {
          return h($, { isEmbeddedInLabel: g.isEmbeddedInLabel, isReferenced: !1, recursion: !0 });
        }).join(" ");
      }
      if (wh(y, "range")) return r.add(y), y.hasAttribute("aria-valuetext") ? y.getAttribute("aria-valuetext") : y.hasAttribute("aria-valuenow") ? y.getAttribute("aria-valuenow") : y.getAttribute("value") || "";
      if (yt(y, ["textbox"])) return r.add(y), nx(y);
    }
    if (tx(y) || ye(y) && g.isReferenced || ex(y) || rx()) {
      var P = f(y, { isEmbeddedInLabel: g.isEmbeddedInLabel });
      if (P !== "") return r.add(y), P;
    }
    if (y.nodeType === y.TEXT_NODE) return r.add(y), y.textContent || "";
    if (g.recursion) return r.add(y), f(y, { isEmbeddedInLabel: g.isEmbeddedInLabel });
    var j = m(y);
    return j !== null ? (r.add(y), j) : (r.add(y), "");
  }
  return YA(h(e, { isEmbeddedInLabel: !1, isReferenced: l === "description", recursion: !1 }));
}
function ln(e) {
  "@babel/helpers - typeof";
  return ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ln(e);
}
function rd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rd(Object(r), !0).forEach(function(n) {
      ix(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ix(e, t, r) {
  return t = sx(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sx(e) {
  var t = ux(e, "string");
  return ln(t) === "symbol" ? t : String(t);
}
function ux(e, t) {
  if (ln(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ln(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ph(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = no(e, "aria-describedby").map(function(o) {
    return qh(o, nd(nd({}, t), {}, { compute: "description" }));
  }).join(" ");
  if (r === "") {
    var n = e.getAttribute("title");
    r = n === null ? "" : n;
  }
  return r;
}
function cx(e) {
  return yt(e, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
function Es(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return cx(e) ? "" : qh(e, t);
}
var ze = He(IP()), dx = He(LP());
function Oh(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var px = (e, t, r, n, o, l, a) => {
  let i = n + r.indent, u = r.colors;
  return e.map((c) => {
    let s = t[c], d = a(s, r, i, o, l);
    return typeof s != "string" && (d.indexOf(`
`) !== -1 && (d = r.spacingOuter + i + d + r.spacingOuter + n), d = "{" + d + "}"), r.spacingInner + n + u.prop.open + c + u.prop.close + "=" + u.value.open + d + u.value.close;
  }).join("");
}, fx = 3, mx = (e, t, r, n, o, l) => e.map((a) => {
  let i = typeof a == "string" ? Th(a, t) : l(a, t, r, n, o);
  return i === "" && typeof a == "object" && a !== null && a.nodeType !== fx ? "" : t.spacingOuter + r + i;
}).join(""), Th = (e, t) => {
  let r = t.colors.content;
  return r.open + Oh(e) + r.close;
}, hx = (e, t) => {
  let r = t.colors.comment;
  return r.open + "<!--" + Oh(e) + "-->" + r.close;
}, bx = (e, t, r, n, o) => {
  let l = n.colors.tag;
  return l.open + "<" + e + (t && l.close + t + n.spacingOuter + o + l.open) + (r ? ">" + l.close + r + n.spacingOuter + o + l.open + "</" + e : (t && !n.min ? "" : " ") + "/") + ">" + l.close;
}, yx = (e, t) => {
  let r = t.colors.tag;
  return r.open + "<" + e + r.close + " …" + r.open + " />" + r.close;
}, gx = 1, Sh = 3, Mh = 8, Ah = 11, vx = /^((HTML|SVG)\w*)?Element$/, xh = (e) => {
  let { tagName: t } = e;
  return !!(typeof t == "string" && t.includes("-") || typeof e.hasAttribute == "function" && e.hasAttribute("is"));
}, _x = (e) => {
  let t = e.constructor.name, { nodeType: r } = e;
  return r === gx && (vx.test(t) || xh(e)) || r === Sh && t === "Text" || r === Mh && t === "Comment" || r === Ah && t === "DocumentFragment";
};
function Rx(e) {
  return e.nodeType === Sh;
}
function wx(e) {
  return e.nodeType === Mh;
}
function Va(e) {
  return e.nodeType === Ah;
}
function Ex(e) {
  return { test: (t) => {
    var r;
    return ((t == null || (r = t.constructor) == null ? void 0 : r.name) || xh(t)) && _x(t);
  }, serialize: (t, r, n, o, l, a) => {
    if (Rx(t)) return Th(t.data, r);
    if (wx(t)) return hx(t.data, r);
    let i = Va(t) ? "DocumentFragment" : t.tagName.toLowerCase();
    return ++o > r.maxDepth ? yx(i, r) : bx(i, px(Va(t) ? [] : Array.from(t.attributes).map((u) => u.name).sort(), Va(t) ? {} : Array.from(t.attributes).reduce((u, c) => (u[c.name] = c.value, u), {}), r, n + r.indent, o, l, a), mx(Array.prototype.slice.call(t.childNodes || t.children).filter(e), r, n + r.indent, o, l, a), r, n);
  } };
}
var jh = null, Cs = null, qs = null;
try {
  let e = module && module.require;
  Cs = e.call(module, "fs").readFileSync, qs = e.call(module, "@babel/code-frame").codeFrameColumns, jh = e.call(module, "chalk");
} catch {
}
function Cx(e) {
  let t = e.indexOf("(") + 1, r = e.indexOf(")"), n = e.slice(t, r), o = n.split(":"), [l, a, i] = [o[0], parseInt(o[1], 10), parseInt(o[2], 10)], u = "";
  try {
    u = Cs(l, "utf-8");
  } catch {
    return "";
  }
  let c = qs(u, { start: { line: a, column: i } }, { highlightCode: !0, linesBelow: 0 });
  return jh.dim(n) + `
` + c + `
`;
}
function qx() {
  if (!Cs || !qs) return "";
  let e = new Error().stack.split(`
`).slice(1).find((t) => !t.includes("node_modules/"));
  return Cx(e);
}
var Nh = 3;
function za() {
  return typeof jest < "u" && jest !== null ? setTimeout._isMockFunction === !0 || Object.prototype.hasOwnProperty.call(setTimeout, "clock") : !1;
}
function Ps() {
  if (typeof window > "u") throw new Error("Could not find default container");
  return window.document;
}
function $h(e) {
  if (e.defaultView) return e.defaultView;
  if (e.ownerDocument && e.ownerDocument.defaultView) return e.ownerDocument.defaultView;
  if (e.window) return e.window;
  throw e.ownerDocument && e.ownerDocument.defaultView === null ? new Error("It looks like the window object is not available for the provided node.") : e.then instanceof Function ? new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?") : Array.isArray(e) ? new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?") : typeof e.debug == "function" && typeof e.logTestingPlaygroundURL == "function" ? new Error("It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?") : new Error("The given node is not an Element, the node type is: " + typeof e + ".");
}
function Et(e) {
  if (!e || typeof e.querySelector != "function" || typeof e.querySelectorAll != "function") throw new TypeError("Expected container to be an Element, a Document or a DocumentFragment but got " + t(e) + ".");
  function t(r) {
    return typeof r == "object" ? r === null ? "null" : r.constructor.name : typeof r;
  }
}
var Px = () => {
  if (typeof process > "u") return !1;
  let e;
  try {
    var t;
    let r = (t = Wt) == null ? void 0 : t.COLORS;
    r && (e = JSON.parse(r));
  } catch {
  }
  return typeof e == "boolean" ? e : process.versions !== void 0 && process.versions.node !== void 0;
}, { DOMCollection: Ox } = ws.plugins, Tx = 1, Sx = 8;
function Mx(e) {
  return e.nodeType !== Sx && (e.nodeType !== Tx || !e.matches(te().defaultIgnore));
}
function sn(e, t, r) {
  if (r === void 0 && (r = {}), e || (e = Ps().body), typeof t != "number" && (t = typeof process < "u" && typeof Wt < "u" && Wt.DEBUG_PRINT_LIMIT || 7e3), t === 0) return "";
  e.documentElement && (e = e.documentElement);
  let n = typeof e;
  if (n === "object" ? n = e.constructor.name : e = {}, !("outerHTML" in e)) throw new TypeError("Expected an element or document but got " + n);
  let { filterNode: o = Mx, ...l } = r, a = ws.format(e, { plugins: [Ex(o), Ox], printFunctionName: !1, highlight: Px(), ...l });
  return t !== void 0 && e.outerHTML.length > t ? a.slice(0, t) + "..." : a;
}
var Dl = function() {
  let e = qx();
  console.log(e ? sn(...arguments) + `

` + e : sn(...arguments));
}, Gt = { testIdAttribute: "data-testid", asyncUtilTimeout: 1e3, asyncWrapper: (e) => e(), unstable_advanceTimersWrapper: (e) => e(), eventWrapper: (e) => e(), defaultHidden: !1, defaultIgnore: "script, style", showOriginalStackTrace: !1, throwSuggestions: !1, getElementError(e, t) {
  let r = sn(t), n = new Error([e, "Ignored nodes: comments, " + Gt.defaultIgnore + `
` + r].filter(Boolean).join(`

`));
  return n.name = "TestingLibraryElementError", n;
}, _disableExpensiveErrorDiagnostics: !1, computedStyleSupportsPseudoElements: !1 };
function Ax(e) {
  try {
    return Gt._disableExpensiveErrorDiagnostics = !0, e();
  } finally {
    Gt._disableExpensiveErrorDiagnostics = !1;
  }
}
function xx(e) {
  typeof e == "function" && (e = e(Gt)), Gt = { ...Gt, ...e };
}
function te() {
  return Gt;
}
var jx = ["button", "meter", "output", "progress", "select", "textarea", "input"];
function Ih(e) {
  return jx.includes(e.nodeName.toLowerCase()) ? "" : e.nodeType === Nh ? e.textContent : Array.from(e.childNodes).map((t) => Ih(t)).join("");
}
function Fl(e) {
  let t;
  return e.tagName.toLowerCase() === "label" ? t = Ih(e) : t = e.value || e.textContent, t;
}
function Lh(e) {
  if (e.labels !== void 0) {
    var t;
    return (t = e.labels) != null ? t : [];
  }
  if (!Nx(e)) return [];
  let r = e.ownerDocument.querySelectorAll("label");
  return Array.from(r).filter((n) => n.control === e);
}
function Nx(e) {
  return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(e.tagName) || e.tagName === "INPUT" && e.getAttribute("type") !== "hidden";
}
function kh(e, t, r) {
  let { selector: n = "*" } = r === void 0 ? {} : r, o = t.getAttribute("aria-labelledby"), l = o ? o.split(" ") : [];
  return l.length ? l.map((a) => {
    let i = e.querySelector('[id="' + a + '"]');
    return i ? { content: Fl(i), formControl: null } : { content: "", formControl: null };
  }) : Array.from(Lh(t)).map((a) => {
    let i = Fl(a), u = Array.from(a.querySelectorAll("button, input, meter, output, progress, select, textarea")).filter((c) => c.matches(n))[0];
    return { content: i, formControl: u };
  });
}
function Bh(e) {
  if (e == null) throw new Error("It looks like " + e + " was passed instead of a matcher. Did you do something like getByText(" + e + ")?");
}
function $r(e, t, r, n) {
  if (typeof e != "string") return !1;
  Bh(r);
  let o = n(e);
  return typeof r == "string" || typeof r == "number" ? o.toLowerCase().includes(r.toString().toLowerCase()) : typeof r == "function" ? r(o, t) : Dh(r, o);
}
function vt(e, t, r, n) {
  if (typeof e != "string") return !1;
  Bh(r);
  let o = n(e);
  return r instanceof Function ? r(o, t) : r instanceof RegExp ? Dh(r, o) : o === String(r);
}
function Os(e) {
  let { trim: t = !0, collapseWhitespace: r = !0 } = e === void 0 ? {} : e;
  return (n) => {
    let o = n;
    return o = t ? o.trim() : o, o = r ? o.replace(/\s+/g, " ") : o, o;
  };
}
function er(e) {
  let { trim: t, collapseWhitespace: r, normalizer: n } = e;
  if (!n) return Os({ trim: t, collapseWhitespace: r });
  if (typeof t < "u" || typeof r < "u") throw new Error('trim and collapseWhitespace are not supported with a normalizer. If you want to use the default trim and collapseWhitespace logic in your normalizer, use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
  return n;
}
function Dh(e, t) {
  let r = e.test(t);
  return e.global && e.lastIndex !== 0 && (console.warn("To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp."), e.lastIndex = 0), r;
}
function wn(e) {
  return e.matches("input[type=submit], input[type=button], input[type=reset]") ? e.value : Array.from(e.childNodes).filter((t) => t.nodeType === Nh && !!t.textContent).map((t) => t.textContent).join("");
}
var $x = Ix(ze.elementRoles);
function Fh(e) {
  return e.hidden === !0 || e.getAttribute("aria-hidden") === "true" || e.ownerDocument.defaultView.getComputedStyle(e).display === "none";
}
function Do(e, t) {
  t === void 0 && (t = {});
  let { isSubtreeInaccessible: r = Fh } = t;
  if (e.ownerDocument.defaultView.getComputedStyle(e).visibility === "hidden") return !0;
  let n = e;
  for (; n; ) {
    if (r(n)) return !0;
    n = n.parentElement;
  }
  return !1;
}
function Ts(e) {
  for (let { match: t, roles: r } of $x) if (t(e)) return [...r];
  return [];
}
function Ix(e) {
  function t(a) {
    let { name: i, attributes: u } = a;
    return "" + i + u.map((c) => {
      let { name: s, value: d, constraints: f = [] } = c, p = f.indexOf("undefined") !== -1, m = f.indexOf("set") !== -1;
      return typeof d < "u" ? "[" + s + '="' + d + '"]' : p ? ":not([" + s + "])" : m ? "[" + s + "]:not([" + s + '=""])' : "[" + s + "]";
    }).join("");
  }
  function r(a) {
    let { attributes: i = [] } = a;
    return i.length;
  }
  function n(a, i) {
    let { specificity: u } = a, { specificity: c } = i;
    return c - u;
  }
  function o(a) {
    let { attributes: i = [] } = a, u = i.findIndex((s) => s.value && s.name === "type" && s.value === "text");
    u >= 0 && (i = [...i.slice(0, u), ...i.slice(u + 1)]);
    let c = t({ ...a, attributes: i });
    return (s) => u >= 0 && s.type !== "text" ? !1 : s.matches(c);
  }
  let l = [];
  for (let [a, i] of e.entries()) l = [...l, { match: o(a), roles: Array.from(i), specificity: r(a) }];
  return l.sort(n);
}
function Uh(e, t) {
  let { hidden: r = !1 } = t === void 0 ? {} : t;
  function n(o) {
    return [o, ...Array.from(o.children).reduce((l, a) => [...l, ...n(a)], [])];
  }
  return n(e).filter((o) => r === !1 ? Do(o) === !1 : !0).reduce((o, l) => {
    let a = [];
    return l.hasAttribute("role") ? a = l.getAttribute("role").split(" ").slice(0, 1) : a = Ts(l), a.reduce((i, u) => Array.isArray(i[u]) ? { ...i, [u]: [...i[u], l] } : { ...i, [u]: [l] }, o);
  }, {});
}
function Hh(e, t) {
  let { hidden: r, includeDescription: n } = t, o = Uh(e, { hidden: r });
  return Object.entries(o).filter((l) => {
    let [a] = l;
    return a !== "generic";
  }).map((l) => {
    let [a, i] = l, u = "-".repeat(50), c = i.map((s) => {
      let d = 'Name "' + Es(s, { computedStyleSupportsPseudoElements: te().computedStyleSupportsPseudoElements }) + `":
`, f = sn(s.cloneNode(!1));
      if (n) {
        let p = 'Description "' + Ph(s, { computedStyleSupportsPseudoElements: te().computedStyleSupportsPseudoElements }) + `":
`;
        return "" + d + p + f;
      }
      return "" + d + f;
    }).join(`

`);
    return a + `:

` + c + `

` + u;
  }).join(`
`);
}
var Lx = function(e, t) {
  let { hidden: r = !1 } = t === void 0 ? {} : t;
  return console.log(Hh(e, { hidden: r }));
};
function kx(e) {
  return e.tagName === "OPTION" ? e.selected : En(e, "aria-selected");
}
function Bx(e) {
  return e.getAttribute("aria-busy") === "true";
}
function Dx(e) {
  if (!("indeterminate" in e && e.indeterminate)) return "checked" in e ? e.checked : En(e, "aria-checked");
}
function Fx(e) {
  return En(e, "aria-pressed");
}
function Ux(e) {
  var t, r;
  return (t = (r = En(e, "aria-current")) != null ? r : e.getAttribute("aria-current")) != null ? t : !1;
}
function Hx(e) {
  return En(e, "aria-expanded");
}
function En(e, t) {
  let r = e.getAttribute(t);
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function Vx(e) {
  let t = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 };
  return e.getAttribute("aria-level") && Number(e.getAttribute("aria-level")) || t[e.tagName];
}
function zx(e) {
  let t = e.getAttribute("aria-valuenow");
  return t === null ? void 0 : +t;
}
function Gx(e) {
  let t = e.getAttribute("aria-valuemax");
  return t === null ? void 0 : +t;
}
function Wx(e) {
  let t = e.getAttribute("aria-valuemin");
  return t === null ? void 0 : +t;
}
function Kx(e) {
  let t = e.getAttribute("aria-valuetext");
  return t === null ? void 0 : t;
}
var od = Os();
function Yx(e) {
  return e.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}
function ad(e) {
  return new RegExp(Yx(e.toLowerCase()), "i");
}
function qt(e, t, r, n) {
  let { variant: o, name: l } = n, a = "", i = {}, u = [["Role", "TestId"].includes(e) ? r : ad(r)];
  l && (i.name = ad(l)), e === "Role" && Do(t) && (i.hidden = !0, a = `Element is inaccessible. This means that the element and all its children are invisible to screen readers.
    If you are using the aria-hidden prop, make sure this is the right choice for your case.
    `), Object.keys(i).length > 0 && u.push(i);
  let c = o + "By" + e;
  return { queryName: e, queryMethod: c, queryArgs: u, variant: o, warning: a, toString() {
    a && console.warn(a);
    let [s, d] = u;
    return s = typeof s == "string" ? "'" + s + "'" : s, d = d ? ", { " + Object.entries(d).map((f) => {
      let [p, m] = f;
      return p + ": " + m;
    }).join(", ") + " }" : "", c + "(" + s + d + ")";
  } };
}
function Pt(e, t, r) {
  return r && (!t || t.toLowerCase() === e.toLowerCase());
}
function oo(e, t, r) {
  var n, o;
  if (t === void 0 && (t = "get"), e.matches(te().defaultIgnore)) return;
  let l = (n = e.getAttribute("role")) != null ? n : (o = Ts(e)) == null ? void 0 : o[0];
  if (l !== "generic" && Pt("Role", r, l)) return qt("Role", e, l, { variant: t, name: Es(e, { computedStyleSupportsPseudoElements: te().computedStyleSupportsPseudoElements }) });
  let a = kh(document, e).map((f) => f.content).join(" ");
  if (Pt("LabelText", r, a)) return qt("LabelText", e, a, { variant: t });
  let i = e.getAttribute("placeholder");
  if (Pt("PlaceholderText", r, i)) return qt("PlaceholderText", e, i, { variant: t });
  let u = od(wn(e));
  if (Pt("Text", r, u)) return qt("Text", e, u, { variant: t });
  if (Pt("DisplayValue", r, e.value)) return qt("DisplayValue", e, od(e.value), { variant: t });
  let c = e.getAttribute("alt");
  if (Pt("AltText", r, c)) return qt("AltText", e, c, { variant: t });
  let s = e.getAttribute("title");
  if (Pt("Title", r, s)) return qt("Title", e, s, { variant: t });
  let d = e.getAttribute(te().testIdAttribute);
  if (Pt("TestId", r, d)) return qt("TestId", e, d, { variant: t });
}
function Sn(e, t) {
  e.stack = t.stack.replace(t.message, e.message);
}
function Jx(e, t) {
  let { container: r = Ps(), timeout: n = te().asyncUtilTimeout, showOriginalStackTrace: o = te().showOriginalStackTrace, stackTraceError: l, interval: a = 50, onTimeout: i = (c) => (Object.defineProperty(c, "message", { value: te().getElementError(c.message, r).message }), c), mutationObserverOptions: u = { subtree: !0, childList: !0, attributes: !0, characterData: !0 } } = t;
  if (typeof e != "function") throw new TypeError("Received `callback` arg must be a function");
  return new Promise(async (c, s) => {
    let d, f, p, m = !1, b = "idle", h = setTimeout(E, n), y = za();
    if (y) {
      let { unstable_advanceTimersWrapper: _ } = te();
      for (C(); !m; ) {
        if (!za()) {
          let v = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
          o || Sn(v, l), s(v);
          return;
        }
        if (await _(async () => {
          jest.advanceTimersByTime(a);
        }), m) break;
        C();
      }
    } else {
      try {
        Et(r);
      } catch (v) {
        s(v);
        return;
      }
      f = setInterval(q, a);
      let { MutationObserver: _ } = $h(r);
      p = new _(q), p.observe(r, u), C();
    }
    function g(_, v) {
      m = !0, clearTimeout(h), y || (clearInterval(f), p.disconnect()), _ ? s(_) : c(v);
    }
    function q() {
      if (za()) {
        let _ = new Error("Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
        return o || Sn(_, l), s(_);
      } else return C();
    }
    function C() {
      if (b !== "pending") try {
        let _ = Ax(e);
        typeof _?.then == "function" ? (b = "pending", _.then((v) => {
          b = "resolved", g(null, v);
        }, (v) => {
          b = "rejected", d = v;
        })) : g(null, _);
      } catch (_) {
        d = _;
      }
    }
    function E() {
      let _;
      d ? (_ = d, !o && _.name === "TestingLibraryElementError" && Sn(_, l)) : (_ = new Error("Timed out in waitFor."), o || Sn(_, l)), g(i(_), null);
    }
  });
}
function Ss(e, t) {
  let r = new Error("STACK_TRACE_MESSAGE");
  return te().asyncWrapper(() => Jx(e, { stackTraceError: r, ...t }));
}
function Fo(e, t) {
  return te().getElementError(e, t);
}
function Uo(e, t) {
  return Fo(e + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", t);
}
function tr(e, t, r, n) {
  let { exact: o = !0, collapseWhitespace: l, trim: a, normalizer: i } = n === void 0 ? {} : n, u = o ? vt : $r, c = er({ collapseWhitespace: l, trim: a, normalizer: i });
  return Array.from(t.querySelectorAll("[" + e + "]")).filter((s) => u(s.getAttribute(e), s, r, c));
}
function Vh(e, t, r, n) {
  let o = tr(e, t, r, n);
  if (o.length > 1) throw Uo("Found multiple elements by [" + e + "=" + r + "]", t);
  return o[0] || null;
}
function qr(e, t) {
  return function(r) {
    for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), l = 1; l < n; l++) o[l - 1] = arguments[l];
    let a = e(r, ...o);
    if (a.length > 1) {
      let i = a.map((u) => Fo(null, u).message).join(`

`);
      throw Uo(t(r, ...o) + `

Here are the matching elements:

` + i, r);
    }
    return a[0] || null;
  };
}
function zh(e, t) {
  return te().getElementError(`A better query is available, try this:
` + e.toString() + `
`, t);
}
function Ms(e, t) {
  return function(r) {
    for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), l = 1; l < n; l++) o[l - 1] = arguments[l];
    let a = e(r, ...o);
    if (!a.length) throw te().getElementError(t(r, ...o), r);
    return a;
  };
}
function Pr(e) {
  return (t, r, n, o) => Ss(() => e(t, r, n), { container: t, ...o });
}
var $t = (e, t, r) => function(n) {
  for (var o = arguments.length, l = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) l[a - 1] = arguments[a];
  let i = e(n, ...l), [{ suggest: u = te().throwSuggestions } = {}] = l.slice(-1);
  if (i && u) {
    let c = oo(i, r);
    if (c && !t.endsWith(c.queryName)) throw zh(c.toString(), n);
  }
  return i;
}, De = (e, t, r) => function(n) {
  for (var o = arguments.length, l = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) l[a - 1] = arguments[a];
  let i = e(n, ...l), [{ suggest: u = te().throwSuggestions } = {}] = l.slice(-1);
  if (i.length && u) {
    let c = [...new Set(i.map((s) => {
      var d;
      return (d = oo(s, r)) == null ? void 0 : d.toString();
    }))];
    if (c.length === 1 && !t.endsWith(oo(i[0], r).queryName)) throw zh(c[0], n);
  }
  return i;
};
function Ct(e, t, r) {
  let n = $t(qr(e, t), e.name, "query"), o = Ms(e, r), l = qr(o, t), a = $t(l, e.name, "get"), i = De(o, e.name.replace("query", "get"), "getAll"), u = Pr(De(o, e.name, "findAll")), c = Pr($t(l, e.name, "find"));
  return [n, i, a, u, c];
}
var Xx = Object.freeze({ __proto__: null, getElementError: Fo, wrapAllByQueryWithSuggestion: De, wrapSingleQueryWithSuggestion: $t, getMultipleElementsFoundError: Uo, queryAllByAttribute: tr, queryByAttribute: Vh, makeSingleQuery: qr, makeGetAllQuery: Ms, makeFindQuery: Pr, buildQueries: Ct });
function Qx(e) {
  return Array.from(e.querySelectorAll("label,input")).map((t) => ({ node: t, textToMatch: Fl(t) })).filter((t) => {
    let { textToMatch: r } = t;
    return r !== null;
  });
}
var Zx = function(e, t, r) {
  let { exact: n = !0, trim: o, collapseWhitespace: l, normalizer: a } = r === void 0 ? {} : r, i = n ? vt : $r, u = er({ collapseWhitespace: l, trim: o, normalizer: a });
  return Qx(e).filter((c) => {
    let { node: s, textToMatch: d } = c;
    return i(d, s, t, u);
  }).map((c) => {
    let { node: s } = c;
    return s;
  });
}, un = function(e, t, r) {
  let { selector: n = "*", exact: o = !0, collapseWhitespace: l, trim: a, normalizer: i } = r === void 0 ? {} : r;
  Et(e);
  let u = o ? vt : $r, c = er({ collapseWhitespace: l, trim: a, normalizer: i }), s = Array.from(e.querySelectorAll("*")).filter((d) => Lh(d).length || d.hasAttribute("aria-labelledby")).reduce((d, f) => {
    let p = kh(e, f, { selector: n });
    p.filter((b) => !!b.formControl).forEach((b) => {
      u(b.content, b.formControl, t, c) && b.formControl && d.push(b.formControl);
    });
    let m = p.filter((b) => !!b.content).map((b) => b.content);
    return u(m.join(" "), f, t, c) && d.push(f), m.length > 1 && m.forEach((b, h) => {
      u(b, f, t, c) && d.push(f);
      let y = [...m];
      y.splice(h, 1), y.length > 1 && u(y.join(" "), f, t, c) && d.push(f);
    }), d;
  }, []).concat(tr("aria-label", e, t, { exact: o, normalizer: c }));
  return Array.from(new Set(s)).filter((d) => d.matches(n));
}, Yt = function(e, t) {
  for (var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) n[o - 2] = arguments[o];
  let l = un(e, t, ...n);
  if (!l.length) {
    let a = Zx(e, t, ...n);
    if (a.length) {
      let i = a.map((u) => ej(e, u)).filter((u) => !!u);
      throw i.length ? te().getElementError(i.map((u) => "Found a label with the text of: " + t + ", however the element associated with this label (<" + u + " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" + u + " />, you can use aria-label or aria-labelledby instead.").join(`

`), e) : te().getElementError("Found a label with the text of: " + t + `, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`, e);
    } else throw te().getElementError("Unable to find a label with the text of: " + t, e);
  }
  return l;
};
function ej(e, t) {
  let r = t.getAttribute("for");
  if (!r) return null;
  let n = e.querySelector('[id="' + r + '"]');
  return n ? n.tagName.toLowerCase() : null;
}
var Gh = (e, t) => "Found multiple elements with the text of: " + t, Wh = $t(qr(un, Gh), un.name, "query"), Kh = qr(Yt, Gh), Yh = Pr(De(Yt, Yt.name, "findAll")), Jh = Pr($t(Kh, Yt.name, "find")), Xh = De(Yt, Yt.name, "getAll"), Qh = $t(Kh, Yt.name, "get"), Zh = De(un, un.name, "queryAll"), Ul = function() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
  return Et(t[0]), tr("placeholder", ...t);
}, tj = (e, t) => "Found multiple elements with the placeholder text of: " + t, rj = (e, t) => "Unable to find an element with the placeholder text of: " + t, eb = De(Ul, Ul.name, "queryAll"), [tb, rb, nb, ob, ab] = Ct(Ul, tj, rj), Hl = function(e, t, r) {
  let { selector: n = "*", exact: o = !0, collapseWhitespace: l, trim: a, ignore: i = te().defaultIgnore, normalizer: u } = r === void 0 ? {} : r;
  Et(e);
  let c = o ? vt : $r, s = er({ collapseWhitespace: l, trim: a, normalizer: u }), d = [];
  return typeof e.matches == "function" && e.matches(n) && (d = [e]), [...d, ...Array.from(e.querySelectorAll(n))].filter((f) => !i || !f.matches(i)).filter((f) => c(wn(f), f, t, s));
}, nj = (e, t) => "Found multiple elements with the text: " + t, oj = function(e, t, r) {
  r === void 0 && (r = {});
  let { collapseWhitespace: n, trim: o, normalizer: l, selector: a } = r, i = er({ collapseWhitespace: n, trim: o, normalizer: l })(t.toString()), u = i !== t.toString(), c = (a ?? "*") !== "*";
  return "Unable to find an element with the text: " + (u ? i + " (normalized from '" + t + "')" : t) + (c ? ", which matches selector '" + a + "'" : "") + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
}, lb = De(Hl, Hl.name, "queryAll"), [ib, sb, ub, cb, db] = Ct(Hl, nj, oj), Vl = function(e, t, r) {
  let { exact: n = !0, collapseWhitespace: o, trim: l, normalizer: a } = r === void 0 ? {} : r;
  Et(e);
  let i = n ? vt : $r, u = er({ collapseWhitespace: o, trim: l, normalizer: a });
  return Array.from(e.querySelectorAll("input,textarea,select")).filter((c) => c.tagName === "SELECT" ? Array.from(c.options).filter((s) => s.selected).some((s) => i(wn(s), s, t, u)) : i(c.value, c, t, u));
}, aj = (e, t) => "Found multiple elements with the display value: " + t + ".", lj = (e, t) => "Unable to find an element with the display value: " + t + ".", pb = De(Vl, Vl.name, "queryAll"), [fb, mb, hb, bb, yb] = Ct(Vl, aj, lj), ij = /^(img|input|area|.+-.+)$/i, zl = function(e, t, r) {
  return r === void 0 && (r = {}), Et(e), tr("alt", e, t, r).filter((n) => ij.test(n.tagName));
}, sj = (e, t) => "Found multiple elements with the alt text: " + t, uj = (e, t) => "Unable to find an element with the alt text: " + t, gb = De(zl, zl.name, "queryAll"), [vb, _b, Rb, wb, Eb] = Ct(zl, sj, uj), cj = (e) => {
  var t;
  return e.tagName.toLowerCase() === "title" && ((t = e.parentElement) == null ? void 0 : t.tagName.toLowerCase()) === "svg";
}, Gl = function(e, t, r) {
  let { exact: n = !0, collapseWhitespace: o, trim: l, normalizer: a } = r === void 0 ? {} : r;
  Et(e);
  let i = n ? vt : $r, u = er({ collapseWhitespace: o, trim: l, normalizer: a });
  return Array.from(e.querySelectorAll("[title], svg > title")).filter((c) => i(c.getAttribute("title"), c, t, u) || cj(c) && i(wn(c), c, t, u));
}, dj = (e, t) => "Found multiple elements with the title: " + t + ".", pj = (e, t) => "Unable to find an element with the title: " + t + ".", Cb = De(Gl, Gl.name, "queryAll"), [qb, Pb, Ob, Tb, Sb] = Ct(Gl, dj, pj), Wl = function(e, t, r) {
  let { hidden: n = te().defaultHidden, name: o, description: l, queryFallbacks: a = !1, selected: i, busy: u, checked: c, pressed: s, current: d, level: f, expanded: p, value: { now: m, min: b, max: h, text: y } = {} } = r === void 0 ? {} : r;
  if (Et(e), i !== void 0) {
    var g;
    if (((g = ze.roles.get(t)) == null ? void 0 : g.props["aria-selected"]) === void 0) throw new Error('"aria-selected" is not supported on role "' + t + '".');
  }
  if (u !== void 0) {
    var q;
    if (((q = ze.roles.get(t)) == null ? void 0 : q.props["aria-busy"]) === void 0) throw new Error('"aria-busy" is not supported on role "' + t + '".');
  }
  if (c !== void 0) {
    var C;
    if (((C = ze.roles.get(t)) == null ? void 0 : C.props["aria-checked"]) === void 0) throw new Error('"aria-checked" is not supported on role "' + t + '".');
  }
  if (s !== void 0) {
    var E;
    if (((E = ze.roles.get(t)) == null ? void 0 : E.props["aria-pressed"]) === void 0) throw new Error('"aria-pressed" is not supported on role "' + t + '".');
  }
  if (d !== void 0) {
    var _;
    if (((_ = ze.roles.get(t)) == null ? void 0 : _.props["aria-current"]) === void 0) throw new Error('"aria-current" is not supported on role "' + t + '".');
  }
  if (f !== void 0 && t !== "heading") throw new Error('Role "' + t + '" cannot have "level" property.');
  if (m !== void 0) {
    var v;
    if (((v = ze.roles.get(t)) == null ? void 0 : v.props["aria-valuenow"]) === void 0) throw new Error('"aria-valuenow" is not supported on role "' + t + '".');
  }
  if (h !== void 0) {
    var w;
    if (((w = ze.roles.get(t)) == null ? void 0 : w.props["aria-valuemax"]) === void 0) throw new Error('"aria-valuemax" is not supported on role "' + t + '".');
  }
  if (b !== void 0) {
    var P;
    if (((P = ze.roles.get(t)) == null ? void 0 : P.props["aria-valuemin"]) === void 0) throw new Error('"aria-valuemin" is not supported on role "' + t + '".');
  }
  if (y !== void 0) {
    var j;
    if (((j = ze.roles.get(t)) == null ? void 0 : j.props["aria-valuetext"]) === void 0) throw new Error('"aria-valuetext" is not supported on role "' + t + '".');
  }
  if (p !== void 0) {
    var $;
    if ((($ = ze.roles.get(t)) == null ? void 0 : $.props["aria-expanded"]) === void 0) throw new Error('"aria-expanded" is not supported on role "' + t + '".');
  }
  let k = /* @__PURE__ */ new WeakMap();
  function L(S) {
    return k.has(S) || k.set(S, Fh(S)), k.get(S);
  }
  return Array.from(e.querySelectorAll(fj(t))).filter((S) => {
    if (S.hasAttribute("role")) {
      let B = S.getAttribute("role");
      if (a) return B.split(" ").filter(Boolean).some((Y) => Y === t);
      let [z] = B.split(" ");
      return z === t;
    }
    return Ts(S).some((B) => B === t);
  }).filter((S) => {
    if (i !== void 0) return i === kx(S);
    if (u !== void 0) return u === Bx(S);
    if (c !== void 0) return c === Dx(S);
    if (s !== void 0) return s === Fx(S);
    if (d !== void 0) return d === Ux(S);
    if (p !== void 0) return p === Hx(S);
    if (f !== void 0) return f === Vx(S);
    if (m !== void 0 || h !== void 0 || b !== void 0 || y !== void 0) {
      let z = !0;
      if (m !== void 0 && z && (z = m === zx(S)), h !== void 0 && z && (z = h === Gx(S)), b !== void 0 && z && (z = b === Wx(S)), y !== void 0) {
        var B;
        z && (z = vt((B = Kx(S)) != null ? B : null, S, y, (Y) => Y));
      }
      return z;
    }
    return !0;
  }).filter((S) => o === void 0 ? !0 : vt(Es(S, { computedStyleSupportsPseudoElements: te().computedStyleSupportsPseudoElements }), S, o, (B) => B)).filter((S) => l === void 0 ? !0 : vt(Ph(S, { computedStyleSupportsPseudoElements: te().computedStyleSupportsPseudoElements }), S, l, (B) => B)).filter((S) => n === !1 ? Do(S, { isSubtreeInaccessible: L }) === !1 : !0);
};
function fj(e) {
  var t;
  let r = '*[role~="' + e + '"]', n = (t = ze.roleElements.get(e)) != null ? t : /* @__PURE__ */ new Set(), o = new Set(Array.from(n).map((l) => {
    let { name: a } = l;
    return a;
  }));
  return [r].concat(Array.from(o)).join(",");
}
var Mb = (e) => {
  let t = "";
  return e === void 0 ? t = "" : typeof e == "string" ? t = ' and name "' + e + '"' : t = " and name `" + e + "`", t;
}, mj = function(e, t, r) {
  let { name: n } = r === void 0 ? {} : r;
  return 'Found multiple elements with the role "' + t + '"' + Mb(n);
}, hj = function(e, t, r) {
  let { hidden: n = te().defaultHidden, name: o, description: l } = r === void 0 ? {} : r;
  if (te()._disableExpensiveErrorDiagnostics) return 'Unable to find role="' + t + '"' + Mb(o);
  let a = "";
  Array.from(e.children).forEach((s) => {
    a += Hh(s, { hidden: n, includeDescription: l !== void 0 });
  });
  let i;
  a.length === 0 ? n === !1 ? i = "There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole" : i = "There are no available roles." : i = (`
Here are the ` + (n === !1 ? "accessible" : "available") + ` roles:

  ` + a.replace(/\n/g, `
  `).replace(/\n\s\s\n/g, `

`) + `
`).trim();
  let u = "";
  o === void 0 ? u = "" : typeof o == "string" ? u = ' and name "' + o + '"' : u = " and name `" + o + "`";
  let c = "";
  return l === void 0 ? c = "" : typeof l == "string" ? c = ' and description "' + l + '"' : c = " and description `" + l + "`", (`
Unable to find an ` + (n === !1 ? "accessible " : "") + 'element with the role "' + t + '"' + u + c + `

` + i).trim();
}, Ab = De(Wl, Wl.name, "queryAll"), [xb, jb, Nb, $b, Ib] = Ct(Wl, mj, hj), As = () => te().testIdAttribute, Kl = function() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
  return Et(t[0]), tr(As(), ...t);
}, bj = (e, t) => "Found multiple elements by: [" + As() + '="' + t + '"]', yj = (e, t) => "Unable to find an element by: [" + As() + '="' + t + '"]', Lb = De(Kl, Kl.name, "queryAll"), [kb, Bb, Db, Fb, Ub] = Ct(Kl, bj, yj), ao = Object.freeze({ __proto__: null, queryAllByLabelText: Zh, queryByLabelText: Wh, getAllByLabelText: Xh, getByLabelText: Qh, findAllByLabelText: Yh, findByLabelText: Jh, queryByPlaceholderText: tb, queryAllByPlaceholderText: eb, getByPlaceholderText: nb, getAllByPlaceholderText: rb, findAllByPlaceholderText: ob, findByPlaceholderText: ab, queryByText: ib, queryAllByText: lb, getByText: ub, getAllByText: sb, findAllByText: cb, findByText: db, queryByDisplayValue: fb, queryAllByDisplayValue: pb, getByDisplayValue: hb, getAllByDisplayValue: mb, findAllByDisplayValue: bb, findByDisplayValue: yb, queryByAltText: vb, queryAllByAltText: gb, getByAltText: Rb, getAllByAltText: _b, findAllByAltText: wb, findByAltText: Eb, queryByTitle: qb, queryAllByTitle: Cb, getByTitle: Ob, getAllByTitle: Pb, findAllByTitle: Tb, findByTitle: Sb, queryByRole: xb, queryAllByRole: Ab, getAllByRole: jb, getByRole: Nb, findAllByRole: $b, findByRole: Ib, queryByTestId: kb, queryAllByTestId: Lb, getByTestId: Db, getAllByTestId: Bb, findAllByTestId: Fb, findByTestId: Ub });
function Yl(e, t, r) {
  return t === void 0 && (t = ao), r === void 0 && (r = {}), Object.keys(t).reduce((n, o) => {
    let l = t[o];
    return n[o] = l.bind(null, e), n;
  }, r);
}
var Hb = (e) => !e || Array.isArray(e) && !e.length;
function ld(e) {
  if (Hb(e)) throw new Error("The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.");
}
async function gj(e, t) {
  let r = new Error("Timed out in waitForElementToBeRemoved.");
  if (typeof e != "function") {
    ld(e);
    let n = (Array.isArray(e) ? e : [e]).map((o) => {
      let l = o.parentElement;
      if (l === null) return () => null;
      for (; l.parentElement; ) l = l.parentElement;
      return () => l.contains(o) ? o : null;
    });
    e = () => n.map((o) => o()).filter(Boolean);
  }
  return ld(e()), Ss(() => {
    let n;
    try {
      n = e();
    } catch (o) {
      if (o.name === "TestingLibraryElementError") return;
      throw o;
    }
    if (!Hb(n)) throw r;
  }, t);
}
var id = { copy: { EventType: "ClipboardEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, cut: { EventType: "ClipboardEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, paste: { EventType: "ClipboardEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, compositionEnd: { EventType: "CompositionEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, compositionStart: { EventType: "CompositionEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, compositionUpdate: { EventType: "CompositionEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, keyDown: { EventType: "KeyboardEvent", defaultInit: { bubbles: !0, cancelable: !0, charCode: 0, composed: !0 } }, keyPress: { EventType: "KeyboardEvent", defaultInit: { bubbles: !0, cancelable: !0, charCode: 0, composed: !0 } }, keyUp: { EventType: "KeyboardEvent", defaultInit: { bubbles: !0, cancelable: !0, charCode: 0, composed: !0 } }, focus: { EventType: "FocusEvent", defaultInit: { bubbles: !1, cancelable: !1, composed: !0 } }, blur: { EventType: "FocusEvent", defaultInit: { bubbles: !1, cancelable: !1, composed: !0 } }, focusIn: { EventType: "FocusEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, focusOut: { EventType: "FocusEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, change: { EventType: "Event", defaultInit: { bubbles: !0, cancelable: !1 } }, input: { EventType: "InputEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, invalid: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !0 } }, submit: { EventType: "Event", defaultInit: { bubbles: !0, cancelable: !0 } }, reset: { EventType: "Event", defaultInit: { bubbles: !0, cancelable: !0 } }, click: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, button: 0, composed: !0 } }, contextMenu: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, dblClick: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, drag: { EventType: "DragEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, dragEnd: { EventType: "DragEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, dragEnter: { EventType: "DragEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, dragExit: { EventType: "DragEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, dragLeave: { EventType: "DragEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, dragOver: { EventType: "DragEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, dragStart: { EventType: "DragEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, drop: { EventType: "DragEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, mouseDown: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, mouseEnter: { EventType: "MouseEvent", defaultInit: { bubbles: !1, cancelable: !1, composed: !0 } }, mouseLeave: { EventType: "MouseEvent", defaultInit: { bubbles: !1, cancelable: !1, composed: !0 } }, mouseMove: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, mouseOut: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, mouseOver: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, mouseUp: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, select: { EventType: "Event", defaultInit: { bubbles: !0, cancelable: !1 } }, touchCancel: { EventType: "TouchEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, touchEnd: { EventType: "TouchEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, touchMove: { EventType: "TouchEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, touchStart: { EventType: "TouchEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, resize: { EventType: "UIEvent", defaultInit: { bubbles: !1, cancelable: !1 } }, scroll: { EventType: "UIEvent", defaultInit: { bubbles: !1, cancelable: !1 } }, wheel: { EventType: "WheelEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, abort: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, canPlay: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, canPlayThrough: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, durationChange: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, emptied: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, encrypted: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, ended: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, loadedData: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, loadedMetadata: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, loadStart: { EventType: "ProgressEvent", defaultInit: { bubbles: !1, cancelable: !1 } }, pause: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, play: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, playing: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, progress: { EventType: "ProgressEvent", defaultInit: { bubbles: !1, cancelable: !1 } }, rateChange: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, seeked: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, seeking: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, stalled: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, suspend: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, timeUpdate: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, volumeChange: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, waiting: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, load: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, error: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, animationStart: { EventType: "AnimationEvent", defaultInit: { bubbles: !0, cancelable: !1 } }, animationEnd: { EventType: "AnimationEvent", defaultInit: { bubbles: !0, cancelable: !1 } }, animationIteration: { EventType: "AnimationEvent", defaultInit: { bubbles: !0, cancelable: !1 } }, transitionCancel: { EventType: "TransitionEvent", defaultInit: { bubbles: !0, cancelable: !1 } }, transitionEnd: { EventType: "TransitionEvent", defaultInit: { bubbles: !0, cancelable: !0 } }, transitionRun: { EventType: "TransitionEvent", defaultInit: { bubbles: !0, cancelable: !1 } }, transitionStart: { EventType: "TransitionEvent", defaultInit: { bubbles: !0, cancelable: !1 } }, pointerOver: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointerEnter: { EventType: "PointerEvent", defaultInit: { bubbles: !1, cancelable: !1 } }, pointerDown: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointerMove: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointerUp: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointerCancel: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, pointerOut: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointerLeave: { EventType: "PointerEvent", defaultInit: { bubbles: !1, cancelable: !1 } }, gotPointerCapture: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, lostPointerCapture: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, popState: { EventType: "PopStateEvent", defaultInit: { bubbles: !0, cancelable: !1 } }, offline: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, online: { EventType: "Event", defaultInit: { bubbles: !1, cancelable: !1 } }, pageHide: { EventType: "PageTransitionEvent", defaultInit: { bubbles: !0, cancelable: !0 } }, pageShow: { EventType: "PageTransitionEvent", defaultInit: { bubbles: !0, cancelable: !0 } } }, sd = { doubleClick: "dblClick" };
function cn(e, t) {
  return te().eventWrapper(() => {
    if (!t) throw new Error("Unable to fire an event - please provide an event object.");
    if (!e) throw new Error('Unable to fire a "' + t.type + '" event - please provide a DOM element.');
    return e.dispatchEvent(t);
  });
}
function Fn(e, t, r, n) {
  let { EventType: o = "Event", defaultInit: l = {} } = n === void 0 ? {} : n;
  if (!t) throw new Error('Unable to fire a "' + e + '" event - please provide a DOM element.');
  let a = { ...l, ...r }, { target: { value: i, files: u, ...c } = {} } = a;
  i !== void 0 && vj(t, i), u !== void 0 && Object.defineProperty(t, "files", { configurable: !0, enumerable: !0, writable: !0, value: u }), Object.assign(t, c);
  let s = $h(t), d = s[o] || s.Event, f;
  if (typeof d == "function") f = new d(e, a);
  else {
    f = s.document.createEvent(o);
    let { bubbles: p, cancelable: m, detail: b, ...h } = a;
    f.initEvent(e, p, m, b), Object.keys(h).forEach((y) => {
      f[y] = h[y];
    });
  }
  return ["dataTransfer", "clipboardData"].forEach((p) => {
    let m = a[p];
    typeof m == "object" && (typeof s.DataTransfer == "function" ? Object.defineProperty(f, p, { value: Object.getOwnPropertyNames(m).reduce((b, h) => (Object.defineProperty(b, h, { value: m[h] }), b), new s.DataTransfer()) }) : Object.defineProperty(f, p, { value: m }));
  }), f;
}
Object.keys(id).forEach((e) => {
  let { EventType: t, defaultInit: r } = id[e], n = e.toLowerCase();
  Fn[e] = (o, l) => Fn(n, o, l, { EventType: t, defaultInit: r }), cn[e] = (o, l) => cn(o, Fn[e](o, l));
});
function vj(e, t) {
  let { set: r } = Object.getOwnPropertyDescriptor(e, "value") || {}, n = Object.getPrototypeOf(e), { set: o } = Object.getOwnPropertyDescriptor(n, "value") || {};
  if (o && r !== o) o.call(e, t);
  else if (r) r.call(e, t);
  else throw new Error("The given element does not have a value setter");
}
Object.keys(sd).forEach((e) => {
  let t = sd[e];
  cn[e] = function() {
    return cn[t](...arguments);
  };
});
function _j(e) {
  return e.replace(/[ \t]*[\n][ \t]*/g, `
`);
}
function Rj(e) {
  return dx.default.compressToEncodedURIComponent(_j(e));
}
function wj(e) {
  return "https://testing-playground.com/#markup=" + Rj(e);
}
var Ej = (e, t, r) => Array.isArray(e) ? e.forEach((n) => Dl(n, t, r)) : Dl(e, t, r), Cj = function(e) {
  if (e === void 0 && (e = Ps().body), !e || !("innerHTML" in e)) {
    console.log("The element you're providing isn't a valid DOM element.");
    return;
  }
  if (!e.innerHTML) {
    console.log("The provided element doesn't have any children.");
    return;
  }
  let t = wj(e.innerHTML);
  return console.log(`Open this URL in your browser

` + t), t;
}, ud = { debug: Ej, logTestingPlaygroundURL: Cj }, qj = typeof document < "u" && document.body ? Yl(document.body, ao, ud) : Object.keys(ao).reduce((e, t) => (e[t] = () => {
  throw new TypeError("For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error");
}, e), ud);
function X(e, t, r) {
  return e.namespaceURI && e.namespaceURI !== "http://www.w3.org/1999/xhtml" || (t = Array.isArray(t) ? t : [t], !t.includes(e.tagName.toLowerCase())) ? !1 : r ? Object.entries(r).every(([n, o]) => e[n] === o) : !0;
}
var Jl;
(function(e) {
  e.button = "button", e.color = "color", e.file = "file", e.image = "image", e.reset = "reset", e.submit = "submit", e.checkbox = "checkbox", e.radio = "radio";
})(Jl || (Jl = {}));
function Vb(e) {
  return X(e, "button") || X(e, "input") && e.type in Jl;
}
function st(e) {
  var t;
  if (Pj(e) && e.defaultView) return e.defaultView;
  if (!((t = e.ownerDocument) === null || t === void 0) && t.defaultView) return e.ownerDocument.defaultView;
  throw new Error(`Could not determine window of node. Node was ${Oj(e)}`);
}
function Pj(e) {
  return e.nodeType === 9;
}
function Oj(e) {
  return typeof e == "function" ? `function ${e.name}` : e === null ? "null" : String(e);
}
function zb(e, t) {
  return new Promise((r, n) => {
    let o = new t();
    o.onerror = n, o.onabort = n, o.onload = () => {
      r(String(o.result));
    }, o.readAsText(e);
  });
}
function xs(e, t) {
  let r = { ...t, length: t.length, item: (n) => r[n], [Symbol.iterator]: function* () {
    for (let n = 0; n < r.length; n++) yield r[n];
  } };
  return r.constructor = e.FileList, e.FileList && Object.setPrototypeOf(r, e.FileList.prototype), Object.freeze(r), r;
}
function xt(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
var Gb = class {
  getAsFile() {
    return this.file;
  }
  getAsString(e) {
    typeof this.data == "string" && e(this.data);
  }
  webkitGetAsEntry() {
    throw new Error("not implemented");
  }
  constructor(e, t) {
    xt(this, "kind", void 0), xt(this, "type", void 0), xt(this, "file", null), xt(this, "data", void 0), typeof e == "string" ? (this.kind = "string", this.type = String(t), this.data = e) : (this.kind = "file", this.type = e.type, this.file = e);
  }
}, Tj = class extends Array {
  add(...e) {
    let t = new Gb(e[0], e[1]);
    return this.push(t), t;
  }
  clear() {
    this.splice(0, this.length);
  }
  remove(e) {
    this.splice(e, 1);
  }
};
function Mn(e, t) {
  let [r, n] = e.split("/"), o = !n || n === "*";
  return (l) => t ? l.type === (o ? r : e) : o ? l.type.startsWith(`${r}/`) : l.type === r;
}
function Sj(e) {
  return new class {
    getData(t) {
      var r;
      let n = (r = this.items.find(Mn(t, !0))) !== null && r !== void 0 ? r : this.items.find(Mn(t, !1)), o = "";
      return n?.getAsString((l) => {
        o = l;
      }), o;
    }
    setData(t, r) {
      let n = this.items.findIndex(Mn(t, !0)), o = new Gb(r, t);
      n >= 0 ? this.items.splice(n, 1, o) : this.items.push(o);
    }
    clearData(t) {
      if (t) {
        let r = this.items.findIndex(Mn(t, !0));
        r >= 0 && this.items.remove(r);
      } else this.items.clear();
    }
    get types() {
      let t = [];
      return this.files.length && t.push("Files"), this.items.forEach((r) => t.push(r.type)), Object.freeze(t), t;
    }
    setDragImage() {
    }
    constructor() {
      xt(this, "dropEffect", "none"), xt(this, "effectAllowed", "uninitialized"), xt(this, "items", new Tj()), xt(this, "files", xs(e, []));
    }
  }();
}
function js(e, t = []) {
  let r = typeof e.DataTransfer > "u" ? Sj(e) : new e.DataTransfer();
  return Object.defineProperty(r, "files", { get: () => xs(e, t) }), r;
}
function Mj(e, t) {
  if (t.kind === "file") return t.getAsFile();
  let r = "";
  return t.getAsString((n) => {
    r = n;
  }), new e.Blob([r], { type: t.type });
}
function Wb(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Kb(e, ...t) {
  let r = Object.fromEntries(t.map((n) => [typeof n == "string" ? "text/plain" : n.type, Promise.resolve(n)]));
  return typeof e.ClipboardItem < "u" ? new e.ClipboardItem(r) : new class {
    get types() {
      return Array.from(Object.keys(this.data));
    }
    async getType(n) {
      let o = await this.data[n];
      if (!o) throw new Error(`${n} is not one of the available MIME types on this item.`);
      return o instanceof e.Blob ? o : new e.Blob([o], { type: n });
    }
    constructor(n) {
      Wb(this, "data", void 0), this.data = n;
    }
  }(r);
}
var Or = Symbol("Manage ClipboardSub");
function cd(e, t) {
  return Object.assign(new class extends e.EventTarget {
    async read() {
      return Array.from(this.items);
    }
    async readText() {
      let r = "";
      for (let n of this.items) {
        let o = n.types.includes("text/plain") ? "text/plain" : n.types.find((l) => l.startsWith("text/"));
        o && (r += await n.getType(o).then((l) => zb(l, e.FileReader)));
      }
      return r;
    }
    async write(r) {
      this.items = r;
    }
    async writeText(r) {
      this.items = [Kb(e, r)];
    }
    constructor(...r) {
      super(...r), Wb(this, "items", []);
    }
  }(), { [Or]: t });
}
function Ns(e) {
  return !!e?.[Or];
}
function Aj(e) {
  if (Ns(e.navigator.clipboard)) return e.navigator.clipboard[Or];
  let t = Object.getOwnPropertyDescriptor(e.navigator, "clipboard"), r, n = { resetClipboardStub: () => {
    r = cd(e, n);
  }, detachClipboardStub: () => {
    t ? Object.defineProperty(e.navigator, "clipboard", t) : Object.defineProperty(e.navigator, "clipboard", { value: void 0, configurable: !0 });
  } };
  return r = cd(e, n), Object.defineProperty(e.navigator, "clipboard", { get: () => r, configurable: !0 }), r[Or];
}
function xj(e) {
  Ns(e.navigator.clipboard) && e.navigator.clipboard[Or].resetClipboardStub();
}
function jj(e) {
  Ns(e.navigator.clipboard) && e.navigator.clipboard[Or].detachClipboardStub();
}
async function Nj(e) {
  let t = e.defaultView, r = t?.navigator.clipboard, n = r && await r.read();
  if (!n) throw new Error("The Clipboard API is unavailable.");
  let o = js(t);
  for (let l of n) for (let a of l.types) o.setData(a, await l.getType(a).then((i) => zb(i, t.FileReader)));
  return o;
}
async function Yb(e, t) {
  let r = st(e), n = r.navigator.clipboard, o = [];
  for (let l = 0; l < t.items.length; l++) {
    let a = t.items[l], i = Mj(r, a);
    o.push(Kb(r, i));
  }
  if (!(n && await n.write(o).then(() => !0, () => !1))) throw new Error("The Clipboard API is unavailable.");
}
var lo = globalThis;
typeof lo.afterEach == "function" && lo.afterEach(() => xj(globalThis.window));
typeof lo.afterAll == "function" && lo.afterAll(() => jj(globalThis.window));
function Jt(e) {
  return e.hasAttribute("contenteditable") && (e.getAttribute("contenteditable") == "true" || e.getAttribute("contenteditable") == "");
}
function dn(e) {
  let t = $j(e);
  return t && (t.closest('[contenteditable=""]') || t.closest('[contenteditable="true"]'));
}
function $j(e) {
  return e.nodeType === 1 ? e : e.parentElement;
}
function Tr(e) {
  return Jb(e) && !e.readOnly || Jt(e);
}
var Xl;
(function(e) {
  e.text = "text", e.date = "date", e["datetime-local"] = "datetime-local", e.email = "email", e.month = "month", e.number = "number", e.password = "password", e.search = "search", e.tel = "tel", e.time = "time", e.url = "url", e.week = "week";
})(Xl || (Xl = {}));
function Jb(e) {
  return X(e, "textarea") || X(e, "input") && e.type in Xl;
}
var Ql;
(function(e) {
  e.email = "email", e.password = "password", e.search = "search", e.telephone = "telephone", e.text = "text", e.url = "url";
})(Ql || (Ql = {}));
function Ij(e) {
  var t;
  let r = (t = e.getAttribute("maxlength")) !== null && t !== void 0 ? t : "";
  return /^\d+$/.test(r) && Number(r) >= 0 ? Number(r) : void 0;
}
function Lj(e) {
  return X(e, "textarea") || X(e, "input") && e.type in Ql;
}
var Xb = ["input:not([type=hidden]):not([disabled])", "button:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[contenteditable=""]', '[contenteditable="true"]', "a[href]", "[tabindex]:not([disabled])"].join(", ");
function $s(e) {
  return e.matches(Xb);
}
var io;
(function(e) {
  e["{"] = "}", e["["] = "]";
})(io || (io = {}));
function Qb(e, t) {
  let r = 0, n = e[r] in io ? e[r] : "";
  r += n.length;
  let o = new RegExp(`^\\${n}{2}`).test(e) ? "" : n;
  return { type: o, ...o === "" ? kj(e, r, t) : Bj(e, r, o, t) };
}
function kj(e, t, r) {
  let n = e[t];
  return Zb(n, e, t, r), t += n.length, { consumedLength: t, descriptor: n, releasePrevious: !1, releaseSelf: !0, repeat: 1 };
}
function Bj(e, t, r, n) {
  var o, l;
  let a = e[t] === "/" ? "/" : "";
  t += a.length;
  let i = r === "{" && e[t] === "\\";
  t += Number(i);
  let u = i ? e[t] : (o = e.slice(t).match(r === "{" ? /^\w+|^[^}>/]/ : /^\w+/)) === null || o === void 0 ? void 0 : o[0];
  Zb(u, e, t, n), t += u.length;
  var c;
  let s = (c = (l = e.slice(t).match(/^>\d+/)) === null || l === void 0 ? void 0 : l[0]) !== null && c !== void 0 ? c : "";
  t += s.length;
  let d = e[t] === "/" || !s && e[t] === ">" ? e[t] : "";
  t += d.length;
  let f = io[r], p = e[t] === f ? f : "";
  if (!p) throw new Error(ey([!s && "repeat modifier", !d && "release modifier", `"${f}"`].filter(Boolean).join(" or "), e[t], e, n));
  return t += p.length, { consumedLength: t, descriptor: u, releasePrevious: !!a, repeat: s ? Math.max(Number(s.substr(1)), 1) : 1, releaseSelf: Dj(d, s) };
}
function Zb(e, t, r, n) {
  if (!e) throw new Error(ey("key descriptor", t[r], t, n));
}
function Dj(e, t) {
  if (e) return e === "/";
  if (t) return !1;
}
function ey(e, t, r, n) {
  return `Expected ${e} but found "${t ?? ""}" in "${r}"
    See ${n === "pointer" ? "https://testing-library.com/docs/user-event/pointer#pressing-a-button-or-touching-the-screen" : "https://testing-library.com/docs/user-event/keyboard"}
    for more information about how userEvent parses your input.`;
}
function Fj(e) {
  return new e.constructor(e.type, e);
}
var ke;
(function(e) {
  e[e.Trigger = 2] = "Trigger", e[e.Call = 1] = "Call";
})(ke || (ke = {}));
function Fr(e, t) {
  e.levelRefs[t] = {};
}
function An(e, t) {
  return e.levelRefs[t];
}
var br;
(function(e) {
  e[e.EachTrigger = 4] = "EachTrigger", e[e.EachApiCall = 2] = "EachApiCall", e[e.EachTarget = 1] = "EachTarget", e[e.Never = 0] = "Never";
})(br || (br = {}));
function _t(e) {
  for (let r = e; r; r = r.parentElement) if (X(r, ["button", "input", "select", "textarea", "optgroup", "option"])) {
    if (r.hasAttribute("disabled")) return !0;
  } else if (X(r, "fieldset")) {
    var t;
    if (r.hasAttribute("disabled") && !(!((t = r.querySelector(":scope > legend")) === null || t === void 0) && t.contains(e))) return !0;
  } else if (r.tagName.includes("-") && r.constructor.formAssociated && r.hasAttribute("disabled")) return !0;
  return !1;
}
function Ho(e) {
  let t = e.activeElement;
  return t?.shadowRoot ? Ho(t.shadowRoot) : _t(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : t;
}
function Ga(e) {
  var t;
  return (t = Ho(e)) !== null && t !== void 0 ? t : e.body;
}
function Uj(e, t) {
  let r = e;
  do {
    if (t(r)) return r;
    r = r.parentElement;
  } while (r && r !== e.ownerDocument.body);
}
function ut(e) {
  return ty(e) && Jb(e);
}
function Hj(e) {
  return ty(e) && Vb(e);
}
function ty(e) {
  return e.nodeType === 1;
}
function Vj(e) {
  let t = e.ownerDocument.getSelection();
  if (t?.focusNode && ut(e)) {
    let n = dn(t.focusNode);
    if (n) {
      if (!t.isCollapsed) {
        var r;
        let o = ((r = n.firstChild) === null || r === void 0 ? void 0 : r.nodeType) === 3 ? n.firstChild : n;
        t.setBaseAndExtent(o, 0, o, 0);
      }
    } else t.setBaseAndExtent(e, 0, e, 0);
  }
}
function Sr(e, t) {
  return te().eventWrapper(e);
}
function It(e) {
  let t = Uj(e, $s), r = Ho(e.ownerDocument);
  (t ?? e.ownerDocument.body) !== r && (Sr(t ? () => t.focus() : () => r?.blur()), Vj(t ?? e.ownerDocument.body));
}
function zj(e) {
  !$s(e) || Ho(e.ownerDocument) !== e || Sr(() => e.blur());
}
var Lt = {};
Lt.click = (e, t, r) => {
  let n = t.closest("button,input,label,select,textarea"), o = n && X(n, "label") && n.control;
  if (o) return () => {
    $s(o) && It(o), r.dispatchEvent(o, Fj(e));
  };
  if (X(t, "input", { type: "file" })) return () => {
    zj(t), t.dispatchEvent(new (st(t)).Event("fileDialog")), It(t);
  };
};
var Mr = Symbol("Displayed value in UI"), gt = Symbol("Displayed selection in UI"), so = Symbol("Initial value to compare on blur");
function Gj(e) {
  return typeof e == "object" && Mr in e;
}
function Wj(e) {
  return !!e && typeof e == "object" && gt in e;
}
function Kj(e, t) {
  e[so] === void 0 && (e[so] = e.value), e[Mr] = t, e.value = Object.assign(new String(t), { [Mr]: !0 });
}
function ct(e) {
  return e[Mr] === void 0 ? e.value : String(e[Mr]);
}
function Is(e) {
  e[Mr] = void 0;
}
function ry(e) {
  e[so] = void 0;
}
function Yj(e) {
  return e[so];
}
function Jj(e, t) {
  e[gt] = t;
}
function Ir(e, { focusOffset: t, anchorOffset: r = t }, n = "replace") {
  let o = ct(e).length, l = (d) => Math.max(0, Math.min(o, d)), a = n === "replace" || e[gt] === void 0 ? l(r) : e[gt].anchorOffset, i = l(t), u = Math.min(a, i), c = Math.max(a, i);
  if (e[gt] = { anchorOffset: a, focusOffset: i }, e.selectionStart === u && e.selectionEnd === c) return;
  let s = Object.assign(new Number(u), { [gt]: !0 });
  try {
    e.setSelectionRange(s, c);
  } catch {
  }
}
function pn(e) {
  var t, r, n;
  let o = (n = e[gt]) !== null && n !== void 0 ? n : { anchorOffset: (t = e.selectionStart) !== null && t !== void 0 ? t : 0, focusOffset: (r = e.selectionEnd) !== null && r !== void 0 ? r : 0 };
  return { ...o, startOffset: Math.min(o.anchorOffset, o.focusOffset), endOffset: Math.max(o.anchorOffset, o.focusOffset) };
}
function Xj(e) {
  return !!e[gt];
}
function Un(e) {
  e[gt] = void 0;
}
var uo = globalThis.parseInt;
function Qj(e) {
  let t = e.replace(/\D/g, "");
  if (t.length < 2) return e;
  let r = uo(t[0], 10), n = uo(t[1], 10);
  if (r >= 3 || r === 2 && n >= 4) {
    let o;
    return r >= 3 ? o = 1 : o = 2, dd(t, o);
  }
  return e.length === 2 ? e : dd(t, 2);
}
function dd(e, t) {
  let r = e.slice(0, t), n = Math.min(uo(r, 10), 23), o = e.slice(t), l = uo(o, 10), a = Math.min(l, 59);
  return `${n.toString().padStart(2, "0")}:${a.toString().padStart(2, "0")}`;
}
function ny(e, t) {
  let r = e.cloneNode();
  return r.value = t, r.value === t;
}
function oy(e, t, r, n) {
  if (Hn(e) && t + r >= 0 && t + r <= e.nodeValue.length) return { node: e, offset: t + r };
  let o = pd(e, t, r);
  if (o) {
    if (Hn(o)) return { node: o, offset: r > 0 ? Math.min(1, o.nodeValue.length) : Math.max(o.nodeValue.length - 1, 0) };
    if (X(o, "br")) {
      let l = pd(o, void 0, r);
      return l ? Hn(l) ? { node: l, offset: r > 0 ? 0 : l.nodeValue.length } : r < 0 && X(l, "br") ? { node: o.parentNode, offset: xn(o) } : { node: l.parentNode, offset: xn(l) + (r > 0 ? 0 : 1) } : r < 0 && n === "deleteContentBackward" ? { node: o.parentNode, offset: xn(o) } : void 0;
    } else return { node: o.parentNode, offset: xn(o) + (r > 0 ? 1 : 0) };
  }
}
function pd(e, t, r) {
  let n = Number(t) + (r < 0 ? -1 : 0);
  return t !== void 0 && Ls(e) && n >= 0 && n < e.children.length && (e = e.children[n]), eN(e, r === 1 ? "next" : "previous", Zj);
}
function Zj(e) {
  if (Hn(e)) return !0;
  if (Ls(e)) {
    if (X(e, ["input", "textarea"])) return e.type !== "hidden";
    if (X(e, "br")) return !0;
  }
  return !1;
}
function xn(e) {
  let t = 0;
  for (; e.previousSibling; ) t++, e = e.previousSibling;
  return t;
}
function Ls(e) {
  return e.nodeType === 1;
}
function Hn(e) {
  return e.nodeType === 3;
}
function eN(e, t, r) {
  for (; ; ) {
    var n;
    let o = e[`${t}Sibling`];
    if (o) {
      if (e = tN(o, t === "next" ? "first" : "last"), r(e)) return e;
    } else if (e.parentNode && (!Ls(e.parentNode) || !Jt(e.parentNode) && e.parentNode !== ((n = e.ownerDocument) === null || n === void 0 ? void 0 : n.body))) e = e.parentNode;
    else break;
  }
}
function tN(e, t) {
  for (; e.hasChildNodes(); ) e = e[`${t}Child`];
  return e;
}
var fn = Symbol("Track programmatic changes for React workaround");
function rN(e) {
  return Object.getOwnPropertyNames(e).some((t) => t.startsWith("__react")) && st(e).REACT_VERSION === 17;
}
function nN(e) {
  rN(e) && (e[fn] = { previousValue: String(e.value), tracked: [] });
}
function oN(e, t) {
  var r, n;
  (n = e[fn]) === null || n === void 0 || (r = n.tracked) === null || r === void 0 || r.push(t), e[fn] || (Is(e), Ir(e, { focusOffset: t.length }));
}
function aN(e, t) {
  var r;
  let n = e[fn];
  if (e[fn] = void 0, !(!(n == null || (r = n.tracked) === null || r === void 0) && r.length)) return;
  let o = n.tracked.length === 2 && n.tracked[0] === n.previousValue && n.tracked[1] === e.value;
  o || Is(e), Xj(e) && Ir(e, { focusOffset: o ? t : e.value.length });
}
function ay(e) {
  let t = lN(e);
  if (t && ut(t)) return { type: "input", selection: pn(t) };
  let r = t?.ownerDocument.getSelection();
  return { type: dn(e) && r?.anchorNode && dn(r.anchorNode) ? "contenteditable" : "default", selection: r };
}
function lN(e) {
  return e.nodeType === 1 ? e : e.parentElement;
}
function iN(e) {
  let t = ay(e);
  if (t.type === "input") return t.selection;
  if (t.type === "contenteditable") {
    var r;
    return (r = t.selection) === null || r === void 0 ? void 0 : r.getRangeAt(0);
  }
}
function Xt({ focusNode: e, focusOffset: t, anchorNode: r = e, anchorOffset: n = t }) {
  var o, l;
  if (ay(e).type === "input") return Ir(e, { anchorOffset: n, focusOffset: t });
  (l = r.ownerDocument) === null || l === void 0 || (o = l.getSelection()) === null || o === void 0 || o.setBaseAndExtent(r, n, e, t);
}
function ly(e) {
  return X(e, "input") && ["date", "time"].includes(e.type);
}
function Ar(e, t, r, n = "insertText") {
  let o = iN(t);
  o && (!ly(t) && !e.dispatchUIEvent(t, "beforeinput", { inputType: n, data: r }) || ("startContainer" in o ? sN(e, t, o, r, n) : uN(e, t, o, r, n)));
}
function sN(e, t, r, n, o) {
  let l = !1;
  if (!r.collapsed) l = !0, r.deleteContents();
  else if (["deleteContentBackward", "deleteContentForward"].includes(o)) {
    let a = oy(r.startContainer, r.startOffset, o === "deleteContentBackward" ? -1 : 1, o);
    if (a) {
      l = !0;
      let i = r.cloneRange();
      i.comparePoint(a.node, a.offset) < 0 ? i.setStart(a.node, a.offset) : i.setEnd(a.node, a.offset), i.deleteContents();
    }
  }
  if (n) if (r.endContainer.nodeType === 3) {
    let a = r.endOffset;
    r.endContainer.insertData(a, n), r.setStart(r.endContainer, a + n.length), r.setEnd(r.endContainer, a + n.length);
  } else {
    let a = t.ownerDocument.createTextNode(n);
    r.insertNode(a), r.setStart(a, n.length), r.setEnd(a, n.length);
  }
  (l || n) && e.dispatchUIEvent(t, "input", { inputType: o });
}
function uN(e, t, r, n, o) {
  let l = n;
  if (Lj(t)) {
    let c = Ij(t);
    if (c !== void 0 && n.length > 0) {
      let s = c - t.value.length;
      if (s > 0) l = n.substring(0, s);
      else return;
    }
  }
  let { newValue: a, newOffset: i, oldValue: u } = cN(l, t, r, o);
  a === u && i === r.startOffset && i === r.endOffset || X(t, "input", { type: "number" }) && !dN(a) || (Kj(t, a), Xt({ focusNode: t, anchorOffset: i, focusOffset: i }), ly(t) ? ny(t, a) && (fd(e, t, i, {}), e.dispatchUIEvent(t, "change"), ry(t)) : fd(e, t, i, { data: n, inputType: o }));
}
function cN(e, t, { startOffset: r, endOffset: n }, o) {
  let l = ct(t), a = Math.max(0, r === n && o === "deleteContentBackward" ? r - 1 : r), i = l.substring(0, a), u = Math.min(l.length, r === n && o === "deleteContentForward" ? r + 1 : n), c = l.substring(u, l.length), s = `${i}${e}${c}`, d = a + e.length;
  if (X(t, "input", { type: "time" })) {
    let f = Qj(s);
    f !== "" && ny(t, f) && (s = f, d = f.length);
  }
  return { oldValue: l, newValue: s, newOffset: d };
}
function fd(e, t, r, n) {
  e.dispatchUIEvent(t, "input", n), aN(t, r);
}
function dN(e) {
  var t, r;
  let n = e.split("e", 2);
  return !(/[^\d.\-e]/.test(e) || Number((t = e.match(/-/g)) === null || t === void 0 ? void 0 : t.length) > 2 || Number((r = e.match(/\./g)) === null || r === void 0 ? void 0 : r.length) > 1 || n[1] && !/^-?\d*$/.test(n[1]));
}
Lt.cut = (e, t, r) => () => {
  Tr(t) && Ar(r, t, "", "deleteByCut");
};
function pN(e) {
  return e ? Jt(e) ? e.textContent : ct(e) : null;
}
function fN(e) {
  let t = st(e);
  for (let r = e; r?.ownerDocument; r = r.parentElement) {
    let { display: n, visibility: o } = t.getComputedStyle(r);
    if (n === "none" || o === "hidden") return !1;
  }
  return !0;
}
function mN(e, t) {
  let r = e.ownerDocument, n = r.querySelectorAll(Xb), o = Array.from(n).filter((u) => u === e || !(Number(u.getAttribute("tabindex")) < 0 || _t(u)));
  Number(e.getAttribute("tabindex")) >= 0 && o.sort((u, c) => {
    let s = Number(u.getAttribute("tabindex")), d = Number(c.getAttribute("tabindex"));
    return s === d ? 0 : s === 0 ? 1 : d === 0 ? -1 : s - d;
  });
  let l = {}, a = [r.body], i = X(e, "input", { type: "radio" }) ? e.name : void 0;
  o.forEach((u) => {
    let c = u;
    if (X(c, "input", { type: "radio" }) && c.name) {
      if (c === e) {
        a.push(c);
        return;
      } else if (c.name === i) return;
      if (c.checked) {
        a = a.filter((s) => !X(s, "input", { type: "radio", name: c.name })), a.push(c), l[c.name] = c;
        return;
      }
      if (typeof l[c.name] < "u") return;
    }
    a.push(c);
  });
  for (let u = a.findIndex((c) => c === e); ; ) if (u += t ? -1 : 1, u === a.length ? u = 0 : u === -1 && (u = a.length - 1), a[u] === e || a[u] === r.body || fN(a[u])) return a[u];
}
function md(e, t) {
  if (ut(e)) {
    let r = pn(e);
    Xt({ focusNode: e, focusOffset: r.startOffset === r.endOffset ? r.focusOffset + t : t < 0 ? r.startOffset : r.endOffset });
  } else {
    let r = e.ownerDocument.getSelection();
    if (!r?.focusNode) return;
    if (r.isCollapsed) {
      let n = oy(r.focusNode, r.focusOffset, t);
      n && Xt({ focusNode: n.node, focusOffset: n.offset });
    } else r[t < 0 ? "collapseToStart" : "collapseToEnd"]();
  }
}
function iy(e) {
  if (ut(e)) return Xt({ focusNode: e, anchorOffset: 0, focusOffset: ct(e).length });
  var t;
  let r = (t = dn(e)) !== null && t !== void 0 ? t : e.ownerDocument.body;
  Xt({ focusNode: r, anchorOffset: 0, focusOffset: r.childNodes.length });
}
function hN(e) {
  if (ut(e)) return pn(e).startOffset === 0 && pn(e).endOffset === ct(e).length;
  var t;
  let r = (t = dn(e)) !== null && t !== void 0 ? t : e.ownerDocument.body, n = e.ownerDocument.getSelection();
  return n?.anchorNode === r && n.focusNode === r && n.anchorOffset === 0 && n.focusOffset === r.childNodes.length;
}
function Ur(e, t, r) {
  var n;
  if (ut(e)) return Xt({ focusNode: e, anchorOffset: t, focusOffset: r });
  if (Jt(e) && ((n = e.firstChild) === null || n === void 0 ? void 0 : n.nodeType) === 3) return Xt({ focusNode: e.firstChild, anchorOffset: t, focusOffset: r });
  throw new Error("Not implemented. The result of this interaction is unreliable.");
}
function jn(e, t, r) {
  let n = st(t), o = Array.from(t.ownerDocument.querySelectorAll(t.name ? `input[type="radio"][name="${n.CSS.escape(t.name)}"]` : 'input[type="radio"][name=""], input[type="radio"]:not([name])'));
  for (let l = o.findIndex((a) => a === t) + r; ; l += r) {
    if (o[l] || (l = r > 0 ? 0 : o.length - 1), o[l] === t) return;
    _t(o[l]) || (It(o[l]), e.dispatchUIEvent(o[l], "click"));
  }
}
Lt.keydown = (e, t, r) => {
  var n, o;
  return (o = (n = hd[e.key]) === null || n === void 0 ? void 0 : n.call(hd, e, t, r)) !== null && o !== void 0 ? o : bN(e, t, r);
};
var hd = { ArrowDown: (e, t, r) => {
  if (X(t, "input", { type: "radio" })) return () => jn(r, t, -1);
}, ArrowLeft: (e, t, r) => X(t, "input", { type: "radio" }) ? () => jn(r, t, -1) : () => md(t, -1), ArrowRight: (e, t, r) => X(t, "input", { type: "radio" }) ? () => jn(r, t, 1) : () => md(t, 1), ArrowUp: (e, t, r) => {
  if (X(t, "input", { type: "radio" })) return () => jn(r, t, 1);
}, Backspace: (e, t, r) => {
  if (Tr(t)) return () => {
    Ar(r, t, "", "deleteContentBackward");
  };
}, Delete: (e, t, r) => {
  if (Tr(t)) return () => {
    Ar(r, t, "", "deleteContentForward");
  };
}, End: (e, t) => {
  if (X(t, ["input", "textarea"]) || Jt(t)) return () => {
    var r, n;
    let o = (n = (r = pN(t)) === null || r === void 0 ? void 0 : r.length) !== null && n !== void 0 ? n : 0;
    Ur(t, o, o);
  };
}, Home: (e, t) => {
  if (X(t, ["input", "textarea"]) || Jt(t)) return () => {
    Ur(t, 0, 0);
  };
}, PageDown: (e, t) => {
  if (X(t, ["input"])) return () => {
    let r = ct(t).length;
    Ur(t, r, r);
  };
}, PageUp: (e, t) => {
  if (X(t, ["input"])) return () => {
    Ur(t, 0, 0);
  };
}, Tab: (e, t, r) => () => {
  let n = mN(t, r.system.keyboard.modifiers.Shift);
  It(n), ut(n) && Ir(n, { anchorOffset: 0, focusOffset: n.value.length });
} }, bN = (e, t, r) => {
  if (e.code === "KeyA" && r.system.keyboard.modifiers.Control) return () => iy(t);
};
Lt.keypress = (e, t, r) => {
  if (e.key === "Enter") {
    if (X(t, "button") || X(t, "input") && yN.includes(t.type) || X(t, "a") && t.href) return () => {
      r.dispatchUIEvent(t, "click");
    };
    if (X(t, "input")) {
      let n = t.form, o = n?.querySelector('input[type="submit"], button:not([type]), button[type="submit"]');
      return o ? () => r.dispatchUIEvent(o, "click") : n && gN.includes(t.type) && n.querySelectorAll("input").length === 1 ? () => r.dispatchUIEvent(n, "submit") : void 0;
    }
  }
  if (Tr(t)) {
    let n = e.key === "Enter" ? Jt(t) && !r.system.keyboard.modifiers.Shift ? "insertParagraph" : "insertLineBreak" : "insertText", o = e.key === "Enter" ? `
` : e.key;
    return () => Ar(r, t, o, n);
  }
};
var yN = ["button", "color", "file", "image", "reset", "submit"], gN = ["email", "month", "password", "search", "tel", "text", "url", "week"];
Lt.keyup = (e, t, r) => {
  var n;
  return (n = bd[e.key]) === null || n === void 0 ? void 0 : n.call(bd, e, t, r);
};
var bd = { " ": (e, t, r) => {
  if (Vb(t)) return () => r.dispatchUIEvent(t, "click");
} };
Lt.paste = (e, t, r) => {
  if (Tr(t)) return () => {
    var n;
    let o = (n = e.clipboardData) === null || n === void 0 ? void 0 : n.getData("text");
    o && Ar(r, t, o, "insertFromPaste");
  };
};
var sy = { auxclick: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, beforeinput: { EventType: "InputEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, click: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, contextmenu: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, copy: { EventType: "ClipboardEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, change: { EventType: "Event", defaultInit: { bubbles: !0, cancelable: !1 } }, cut: { EventType: "ClipboardEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, dblclick: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, keydown: { EventType: "KeyboardEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, keypress: { EventType: "KeyboardEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, keyup: { EventType: "KeyboardEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, paste: { EventType: "ClipboardEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, input: { EventType: "InputEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, mousedown: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, mouseenter: { EventType: "MouseEvent", defaultInit: { bubbles: !1, cancelable: !1, composed: !0 } }, mouseleave: { EventType: "MouseEvent", defaultInit: { bubbles: !1, cancelable: !1, composed: !0 } }, mousemove: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, mouseout: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, mouseover: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, mouseup: { EventType: "MouseEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointerover: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointerenter: { EventType: "PointerEvent", defaultInit: { bubbles: !1, cancelable: !1 } }, pointerdown: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointermove: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointerup: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointercancel: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !1, composed: !0 } }, pointerout: { EventType: "PointerEvent", defaultInit: { bubbles: !0, cancelable: !0, composed: !0 } }, pointerleave: { EventType: "PointerEvent", defaultInit: { bubbles: !1, cancelable: !1 } }, submit: { EventType: "Event", defaultInit: { bubbles: !0, cancelable: !0 } } };
function uy(e) {
  return sy[e].EventType;
}
var vN = ["MouseEvent", "PointerEvent"];
function _N(e) {
  return vN.includes(uy(e));
}
function RN(e) {
  return uy(e) === "KeyboardEvent";
}
var wN = { ClipboardEvent: [CN], Event: [], InputEvent: [Nn, qN], MouseEvent: [Nn, Wa, yd], PointerEvent: [Nn, Wa, yd, ON], KeyboardEvent: [Nn, Wa, PN] };
function cy(e, t, r) {
  let n = st(t), { EventType: o, defaultInit: l } = sy[e], a = new (EN(n))[o](e, l);
  return wN[o].forEach((i) => i(a, r ?? {})), a;
}
function EN(e) {
  var t;
  let r = (t = e.Event) !== null && t !== void 0 ? t : class {
  };
  var n;
  let o = (n = e.AnimationEvent) !== null && n !== void 0 ? n : class extends r {
  };
  var l;
  let a = (l = e.ClipboardEvent) !== null && l !== void 0 ? l : class extends r {
  };
  var i;
  let u = (i = e.PopStateEvent) !== null && i !== void 0 ? i : class extends r {
  };
  var c;
  let s = (c = e.ProgressEvent) !== null && c !== void 0 ? c : class extends r {
  };
  var d;
  let f = (d = e.TransitionEvent) !== null && d !== void 0 ? d : class extends r {
  };
  var p;
  let m = (p = e.UIEvent) !== null && p !== void 0 ? p : class extends r {
  };
  var b;
  let h = (b = e.CompositionEvent) !== null && b !== void 0 ? b : class extends m {
  };
  var y;
  let g = (y = e.FocusEvent) !== null && y !== void 0 ? y : class extends m {
  };
  var q;
  let C = (q = e.InputEvent) !== null && q !== void 0 ? q : class extends m {
  };
  var E;
  let _ = (E = e.KeyboardEvent) !== null && E !== void 0 ? E : class extends m {
  };
  var v;
  let w = (v = e.MouseEvent) !== null && v !== void 0 ? v : class extends m {
  };
  var P;
  let j = (P = e.DragEvent) !== null && P !== void 0 ? P : class extends w {
  };
  var $;
  let k = ($ = e.PointerEvent) !== null && $ !== void 0 ? $ : class extends w {
  };
  var L;
  let S = (L = e.TouchEvent) !== null && L !== void 0 ? L : class extends m {
  };
  return { Event: r, AnimationEvent: o, ClipboardEvent: a, PopStateEvent: u, ProgressEvent: s, TransitionEvent: f, UIEvent: m, CompositionEvent: h, FocusEvent: g, InputEvent: C, KeyboardEvent: _, MouseEvent: w, DragEvent: j, PointerEvent: k, TouchEvent: S };
}
function rr(e, t) {
  for (let [r, n] of Object.entries(t)) Object.defineProperty(e, r, { get: () => n ?? null });
}
function qe(e) {
  return Number(e ?? 0);
}
function CN(e, { clipboardData: t }) {
  rr(e, { clipboardData: t });
}
function qN(e, { data: t, inputType: r, isComposing: n }) {
  rr(e, { data: t, isComposing: !!n, inputType: String(r) });
}
function Nn(e, { view: t, detail: r }) {
  rr(e, { view: t, detail: qe(r ?? 0) });
}
function Wa(e, { altKey: t, ctrlKey: r, metaKey: n, shiftKey: o, modifierAltGraph: l, modifierCapsLock: a, modifierFn: i, modifierFnLock: u, modifierNumLock: c, modifierScrollLock: s, modifierSymbol: d, modifierSymbolLock: f }) {
  rr(e, { altKey: !!t, ctrlKey: !!r, metaKey: !!n, shiftKey: !!o, getModifierState(p) {
    return !!{ Alt: t, AltGraph: l, CapsLock: a, Control: r, Fn: i, FnLock: u, Meta: n, NumLock: c, ScrollLock: s, Shift: o, Symbol: d, SymbolLock: f }[p];
  } });
}
function PN(e, { key: t, code: r, location: n, repeat: o, isComposing: l, charCode: a }) {
  rr(e, { key: String(t), code: String(r), location: qe(n), repeat: !!o, isComposing: !!l, charCode: a });
}
function yd(e, { x: t, y: r, screenX: n, screenY: o, clientX: l = t, clientY: a = r, button: i, buttons: u, relatedTarget: c }) {
  rr(e, { screenX: qe(n), screenY: qe(o), clientX: qe(l), x: qe(l), clientY: qe(a), y: qe(a), button: qe(i), buttons: qe(u), relatedTarget: c });
}
function ON(e, { pointerId: t, width: r, height: n, pressure: o, tangentialPressure: l, tiltX: a, tiltY: i, twist: u, pointerType: c, isPrimary: s }) {
  rr(e, { pointerId: qe(t), width: qe(r), height: qe(n), pressure: qe(o), tangentialPressure: qe(l), tiltX: qe(a), tiltY: qe(i), twist: qe(u), pointerType: String(c), isPrimary: !!s });
}
function TN(e, t, r, n = !1) {
  (_N(t) || RN(t)) && (r = { ...r, ...this.system.getUIEventModifiers() });
  let o = cy(t, e, r);
  return dy.call(this, e, o, n);
}
function dy(e, t, r = !1) {
  var n;
  let o = t.type, l = r ? () => {
  } : (n = Lt[o]) === null || n === void 0 ? void 0 : n.call(Lt, t, e, this);
  if (l) {
    t.preventDefault();
    let a = !1;
    return Object.defineProperty(t, "defaultPrevented", { get: () => a }), Object.defineProperty(t, "preventDefault", { value: () => {
      a = t.cancelable;
    } }), Sr(() => e.dispatchEvent(t)), a || l(), !a;
  }
  return Sr(() => e.dispatchEvent(t));
}
function SN(e, t, r) {
  let n = cy(t, e, r);
  Sr(() => e.dispatchEvent(n));
}
var Ka = Symbol("Interceptor for programmatical calls");
function fr(e, t, r) {
  let n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = Object.getOwnPropertyDescriptor(e, t), l = n?.set ? "set" : "value";
  if (typeof n?.[l] != "function" || n[l][Ka]) throw new Error(`Element ${e.tagName} does not implement "${String(t)}".`);
  function a(...i) {
    let { applyNative: u = !1, realArgs: c, then: s } = r.call(this, ...i), d = (!u && o || n)[l];
    l === "set" ? d.call(this, c) : d.call(this, ...c), s?.();
  }
  a[Ka] = Ka, Object.defineProperty(e, t, { ...o ?? n, [l]: a });
}
function MN(e) {
  fr(e, "value", function(t) {
    let r = Gj(t);
    return r && nN(this), { applyNative: !!r, realArgs: AN(this, t), then: r ? void 0 : () => oN(this, String(t)) };
  });
}
function AN(e, t) {
  return X(e, "input", { type: "number" }) && String(t) !== "" && !Number.isNaN(Number(t)) ? String(Number(t)) : String(t);
}
function xN(e) {
  fr(e, "setSelectionRange", function(t, ...r) {
    let n = Wj(t);
    return { applyNative: !!n, realArgs: [Number(t), ...r], then: () => n ? void 0 : Un(e) };
  }), fr(e, "selectionStart", function(t) {
    return { realArgs: t, then: () => Un(e) };
  }), fr(e, "selectionEnd", function(t) {
    return { realArgs: t, then: () => Un(e) };
  }), fr(e, "select", function() {
    return { realArgs: [], then: () => Jj(e, { anchorOffset: 0, focusOffset: ct(e).length }) };
  });
}
function jN(e) {
  fr(e, "setRangeText", function(...t) {
    return { realArgs: t, then: () => {
      Is(e), Un(e);
    } };
  });
}
var yr = Symbol("Node prepared with document state workarounds");
function py(e) {
  e[yr] || (e.addEventListener("focus", (t) => {
    let r = t.target;
    gd(r);
  }, { capture: !0, passive: !0 }), e.activeElement && gd(e.activeElement), e.addEventListener("blur", (t) => {
    let r = t.target, n = Yj(r);
    n !== void 0 && (r.value !== n && SN(r, "change"), ry(r));
  }, { capture: !0, passive: !0 }), e[yr] = yr);
}
function gd(e) {
  e[yr] || (X(e, ["input", "textarea"]) && (MN(e), xN(e), jN(e)), e[yr] = yr);
}
function NN(e) {
  return $N(e) ? e : e.ownerDocument;
}
function $N(e) {
  return e.nodeType === 9;
}
function xr(e) {
  let t = e.delay;
  if (typeof t == "number") return Promise.all([new Promise((r) => globalThis.setTimeout(() => r(), t)), e.advanceTimers(t)]);
}
function or(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
var Ge;
(function(e) {
  e[e.STANDARD = 0] = "STANDARD", e[e.LEFT = 1] = "LEFT", e[e.RIGHT = 2] = "RIGHT", e[e.NUMPAD = 3] = "NUMPAD";
})(Ge || (Ge = {}));
var IN = ["Alt", "AltGraph", "Control", "Fn", "Meta", "Shift", "Symbol"];
function vd(e) {
  return IN.includes(e);
}
var LN = ["CapsLock", "FnLock", "NumLock", "ScrollLock", "SymbolLock"];
function _d(e) {
  return LN.includes(e);
}
var kN = class {
  isKeyPressed(e) {
    return !!this.pressed[String(e.code)];
  }
  getPressedKeys() {
    return Object.values(this.pressed).map((e) => e.keyDef);
  }
  async keydown(e, t) {
    var r, n, o;
    let l = String(t.key), a = String(t.code), i = Ga(e.config.document);
    this.setKeydownTarget(i);
    var u;
    (u = (r = this.pressed)[n = a]) !== null && u !== void 0 || (r[n] = { keyDef: t, unpreventedDefault: !1 }), vd(l) && (this.modifiers[l] = !0);
    let c = e.dispatchUIEvent(i, "keydown", { key: l, code: a });
    _d(l) && !this.modifiers[l] && (this.modifiers[l] = !0, this.modifierLockStart[l] = !0), (o = this.pressed[a]).unpreventedDefault || (o.unpreventedDefault = c), c && this.hasKeyPress(l) && e.dispatchUIEvent(Ga(e.config.document), "keypress", { key: l, code: a, charCode: t.key === "Enter" ? 13 : String(t.key).charCodeAt(0) });
  }
  async keyup(e, t) {
    let r = String(t.key), n = String(t.code), o = this.pressed[n].unpreventedDefault;
    delete this.pressed[n], vd(r) && !Object.values(this.pressed).find((l) => l.keyDef.key === r) && (this.modifiers[r] = !1), e.dispatchUIEvent(Ga(e.config.document), "keyup", { key: r, code: n }, !o), _d(r) && this.modifiers[r] && (this.modifierLockStart[r] ? this.modifierLockStart[r] = !1 : this.modifiers[r] = !1);
  }
  setKeydownTarget(e) {
    e !== this.lastKeydownTarget && (this.carryChar = ""), this.lastKeydownTarget = e;
  }
  hasKeyPress(e) {
    return (e.length === 1 || e === "Enter") && !this.modifiers.Control && !this.modifiers.Alt;
  }
  constructor(e) {
    or(this, "system", void 0), or(this, "modifiers", { Alt: !1, AltGraph: !1, CapsLock: !1, Control: !1, Fn: !1, FnLock: !1, Meta: !1, NumLock: !1, ScrollLock: !1, Shift: !1, Symbol: !1, SymbolLock: !1 }), or(this, "pressed", {}), or(this, "carryChar", ""), or(this, "lastKeydownTarget", void 0), or(this, "modifierLockStart", {}), this.system = e;
  }
}, BN = [..."0123456789".split("").map((e) => ({ code: `Digit${e}`, key: e })), ...")!@#$%^&*(".split("").map((e, t) => ({ code: `Digit${t}`, key: e, shiftKey: !0 })), ..."abcdefghijklmnopqrstuvwxyz".split("").map((e) => ({ code: `Key${e.toUpperCase()}`, key: e })), ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((e) => ({ code: `Key${e}`, key: e, shiftKey: !0 })), { code: "Space", key: " " }, { code: "AltLeft", key: "Alt", location: Ge.LEFT }, { code: "AltRight", key: "Alt", location: Ge.RIGHT }, { code: "ShiftLeft", key: "Shift", location: Ge.LEFT }, { code: "ShiftRight", key: "Shift", location: Ge.RIGHT }, { code: "ControlLeft", key: "Control", location: Ge.LEFT }, { code: "ControlRight", key: "Control", location: Ge.RIGHT }, { code: "MetaLeft", key: "Meta", location: Ge.LEFT }, { code: "MetaRight", key: "Meta", location: Ge.RIGHT }, { code: "OSLeft", key: "OS", location: Ge.LEFT }, { code: "OSRight", key: "OS", location: Ge.RIGHT }, { code: "Tab", key: "Tab" }, { code: "CapsLock", key: "CapsLock" }, { code: "Backspace", key: "Backspace" }, { code: "Enter", key: "Enter" }, { code: "Escape", key: "Escape" }, { code: "ArrowUp", key: "ArrowUp" }, { code: "ArrowDown", key: "ArrowDown" }, { code: "ArrowLeft", key: "ArrowLeft" }, { code: "ArrowRight", key: "ArrowRight" }, { code: "Home", key: "Home" }, { code: "End", key: "End" }, { code: "Delete", key: "Delete" }, { code: "PageUp", key: "PageUp" }, { code: "PageDown", key: "PageDown" }, { code: "Fn", key: "Fn" }, { code: "Symbol", key: "Symbol" }, { code: "AltRight", key: "AltGraph" }], DN = [{ name: "MouseLeft", pointerType: "mouse", button: "primary" }, { name: "MouseRight", pointerType: "mouse", button: "secondary" }, { name: "MouseMiddle", pointerType: "mouse", button: "auxiliary" }, { name: "TouchA", pointerType: "touch" }, { name: "TouchB", pointerType: "touch" }, { name: "TouchC", pointerType: "touch" }];
function FN(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
var fy = class {
  getButtons() {
    let e = 0;
    for (let t of Object.keys(this.pressed)) e |= 2 ** Number(t);
    return e;
  }
  down(e) {
    let t = Zl(e.button);
    if (t in this.pressed) {
      this.pressed[t].push(e);
      return;
    }
    return this.pressed[t] = [e], t;
  }
  up(e) {
    let t = Zl(e.button);
    if (t in this.pressed && (this.pressed[t] = this.pressed[t].filter((r) => r.name !== e.name), this.pressed[t].length === 0)) return delete this.pressed[t], t;
  }
  constructor() {
    FN(this, "pressed", {});
  }
}, Rd = { primary: 0, secondary: 1, auxiliary: 2, back: 3, X1: 3, forward: 4, X2: 4 };
function Zl(e = 0) {
  return e in Rd ? Rd[e] : Number(e);
}
var wd = { 1: 2, 2: 1 };
function Ed(e) {
  return e = Zl(e), e in wd ? wd[e] : e;
}
function UN(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
var HN = class {
  get countPressed() {
    return this.pressedKeys.size;
  }
  isPressed(e) {
    return this.pressedKeys.has(e.name);
  }
  addPressed(e) {
    return this.pressedKeys.add(e.name);
  }
  removePressed(e) {
    return this.pressedKeys.delete(e.name);
  }
  constructor() {
    UN(this, "pressedKeys", /* @__PURE__ */ new Set());
  }
};
function Wr(e, t) {
  let r = [];
  for (let l = e; l; l = l.parentElement) r.push(l);
  let n = [];
  for (let l = t; l; l = l.parentElement) n.push(l);
  let o = 0;
  for (; !(o >= r.length || o >= n.length || r[r.length - 1 - o] !== n[n.length - 1 - o]); o++) ;
  return [r.slice(0, r.length - o), n.slice(0, n.length - o), n.slice(n.length - o)];
}
function ei({ target: e, node: t, offset: r }) {
  return ut(e) ? { node: e, offset: r ?? ct(e).length } : t ? { node: t, offset: r ?? (t.nodeType === 3 ? t.nodeValue.length : t.childNodes.length) } : my(e, r);
}
function my(e, t, r = !0) {
  let n = t === void 0 ? e.childNodes.length - 1 : 0, o = t === void 0 ? -1 : 1;
  for (; t === void 0 ? n >= (r ? Math.max(e.childNodes.length - 1, 0) : 0) : n <= e.childNodes.length; ) {
    if (t && n === e.childNodes.length) throw new Error("The given offset is out of bounds.");
    let l = e.childNodes.item(n), a = String(l.textContent);
    if (a.length) if (t !== void 0 && a.length < t) t -= a.length;
    else {
      if (l.nodeType === 1) return my(l, t, !1);
      if (l.nodeType === 3) return { node: l, offset: t ?? l.nodeValue.length };
    }
    n += o;
  }
  return { node: e, offset: e.childNodes.length };
}
function VN({ document: e, target: t, clickCount: r, node: n, offset: o }) {
  if (Hj(t)) return;
  let l = ut(t), a = String(l ? ct(t) : t.textContent), [i, u] = n ? [o, o] : zN(a, o, r);
  if (l) return Ir(t, { anchorOffset: i ?? a.length, focusOffset: u ?? a.length }), { node: t, start: i ?? 0, end: u ?? a.length };
  {
    let { node: c, offset: s } = ei({ target: t, node: n, offset: i }), { node: d, offset: f } = ei({ target: t, node: n, offset: u }), p = t.ownerDocument.createRange();
    try {
      p.setStart(c, s), p.setEnd(d, f);
    } catch {
      throw new Error("The given offset is out of bounds.");
    }
    let m = e.getSelection();
    return m?.removeAllRanges(), m?.addRange(p.cloneRange()), p;
  }
}
function zN(e, t, r) {
  if (r % 3 === 1 || e.length === 0) return [t, t];
  let n = t ?? e.length;
  return r % 3 === 2 ? [n - e.substr(0, t).match(/(\w+|\s+|\W)?$/)[0].length, t === void 0 ? t : t + e.substr(t).match(/^(\w+|\s+|\W)?/)[0].length] : [n - e.substr(0, t).match(/[^\r\n]*$/)[0].length, t === void 0 ? t : t + e.substr(t).match(/^[^\r\n]*/)[0].length];
}
function GN(e, { document: t, target: r, node: n, offset: o }) {
  let l = ei({ target: r, node: n, offset: o });
  if ("node" in e) {
    if (l.node === e.node) {
      let a = l.offset < e.start ? e.end : e.start, i = l.offset > e.end || l.offset < e.start ? l.offset : e.end;
      Ir(e.node, { anchorOffset: a, focusOffset: i });
    }
  } else {
    let a = e.cloneRange(), i = a.comparePoint(l.node, l.offset);
    i < 0 ? a.setStart(l.node, l.offset) : i > 0 && a.setEnd(l.node, l.offset);
    let u = t.getSelection();
    u?.removeAllRanges(), u?.addRange(a.cloneRange());
  }
}
function hy(e, t) {
  var r, n, o, l, a, i, u, c;
  return e.target !== t.target || ((r = e.coords) === null || r === void 0 ? void 0 : r.x) !== ((n = t.coords) === null || n === void 0 ? void 0 : n.y) || ((o = e.coords) === null || o === void 0 ? void 0 : o.y) !== ((l = t.coords) === null || l === void 0 ? void 0 : l.y) || ((a = e.caret) === null || a === void 0 ? void 0 : a.node) !== ((i = t.caret) === null || i === void 0 ? void 0 : i.node) || ((u = e.caret) === null || u === void 0 ? void 0 : u.offset) !== ((c = t.caret) === null || c === void 0 ? void 0 : c.offset);
}
function Ft(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
var WN = class {
  move(e, t) {
    let r = this.position, n = this.getTarget(e);
    if (this.position = t, !hy(r, t)) return;
    let o = this.getTarget(e), l = this.getEventInit("mousemove"), [a, i] = Wr(n, o);
    return { leave: () => {
      n !== o && (e.dispatchUIEvent(n, "mouseout", l), a.forEach((u) => e.dispatchUIEvent(u, "mouseleave", l)));
    }, enter: () => {
      n !== o && (e.dispatchUIEvent(o, "mouseover", l), i.forEach((u) => e.dispatchUIEvent(u, "mouseenter", l)));
    }, move: () => {
      e.dispatchUIEvent(o, "mousemove", l), this.modifySelecting(e);
    } };
  }
  down(e, t, r) {
    let n = this.buttons.down(t);
    if (n === void 0) return;
    let o = this.getTarget(e);
    this.buttonDownTarget[n] = o;
    let l = _t(o), a = this.getEventInit("mousedown", t.button);
    (l || e.dispatchUIEvent(o, "mousedown", a)) && (this.startSelecting(e, a.detail), It(o)), !l && Ed(t.button) === 2 && e.dispatchUIEvent(o, "contextmenu", this.getEventInit("contextmenu", t.button, r));
  }
  up(e, t, r) {
    let n = this.buttons.up(t);
    if (n === void 0) return;
    let o = this.getTarget(e);
    if (!_t(o)) {
      e.dispatchUIEvent(o, "mouseup", this.getEventInit("mouseup", t.button)), this.endSelecting();
      let l = Wr(this.buttonDownTarget[n], o)[2][0];
      if (l) {
        let a = this.getEventInit("click", t.button, r);
        a.detail && (e.dispatchUIEvent(l, a.button === 0 ? "click" : "auxclick", a), a.button === 0 && a.detail === 2 && e.dispatchUIEvent(l, "dblclick", { ...this.getEventInit("dblclick", t.button), detail: a.detail }));
      }
    }
  }
  resetClickCount() {
    this.clickCount.reset();
  }
  getEventInit(e, t, r) {
    let n = { ...this.position.coords };
    return r && (n.pointerId = r.pointerId, n.pointerType = r.pointerType, n.isPrimary = r.isPrimary), n.button = Ed(t), n.buttons = this.buttons.getButtons(), e === "mousedown" ? n.detail = this.clickCount.getOnDown(n.button) : e === "mouseup" ? n.detail = this.clickCount.getOnUp(n.button) : (e === "click" || e === "auxclick") && (n.detail = this.clickCount.incOnClick(n.button)), n;
  }
  getTarget(e) {
    var t;
    return (t = this.position.target) !== null && t !== void 0 ? t : e.config.document.body;
  }
  startSelecting(e, t) {
    var r, n;
    this.selecting = VN({ document: e.config.document, target: this.getTarget(e), node: (r = this.position.caret) === null || r === void 0 ? void 0 : r.node, offset: (n = this.position.caret) === null || n === void 0 ? void 0 : n.offset, clickCount: t });
  }
  modifySelecting(e) {
    var t, r;
    this.selecting && GN(this.selecting, { document: e.config.document, target: this.getTarget(e), node: (t = this.position.caret) === null || t === void 0 ? void 0 : t.node, offset: (r = this.position.caret) === null || r === void 0 ? void 0 : r.offset });
  }
  endSelecting() {
    this.selecting = void 0;
  }
  constructor() {
    Ft(this, "position", {}), Ft(this, "buttons", new fy()), Ft(this, "selecting", void 0), Ft(this, "buttonDownTarget", {}), Ft(this, "clickCount", new class {
      incOnClick(e) {
        let t = this.down[e] === void 0 ? void 0 : Number(this.down[e]) + 1;
        return this.count = this.count[e] === void 0 ? {} : { [e]: Number(this.count[e]) + 1 }, t;
      }
      getOnDown(e) {
        var t;
        this.down = { [e]: (t = this.count[e]) !== null && t !== void 0 ? t : 0 };
        var r;
        return this.count = { [e]: (r = this.count[e]) !== null && r !== void 0 ? r : 0 }, Number(this.count[e]) + 1;
      }
      getOnUp(e) {
        return this.down[e] === void 0 ? void 0 : Number(this.down[e]) + 1;
      }
      reset() {
        this.count = {};
      }
      constructor() {
        Ft(this, "down", {}), Ft(this, "count", {});
      }
    }());
  }
};
function co(e, t) {
  var r;
  return ((r = by(e, t)) === null || r === void 0 ? void 0 : r.pointerEvents) !== "none";
}
function KN(e) {
  let t = st(e);
  for (let r = e, n = []; r?.ownerDocument; r = r.parentElement) {
    n.push(r);
    let o = t.getComputedStyle(r).pointerEvents;
    if (o && !["inherit", "unset"].includes(o)) return { pointerEvents: o, tree: n };
  }
}
var Cd = Symbol("Last check for pointer-events");
function by(e, t) {
  let r = t[Cd];
  if (!(e.config.pointerEventsCheck !== br.Never && (!r || qd(e.config.pointerEventsCheck, br.EachApiCall) && r[ke.Call] !== An(e, ke.Call) || qd(e.config.pointerEventsCheck, br.EachTrigger) && r[ke.Trigger] !== An(e, ke.Trigger)))) return r?.result;
  let n = KN(t);
  return t[Cd] = { [ke.Call]: An(e, ke.Call), [ke.Trigger]: An(e, ke.Trigger), result: n }, n;
}
function Hr(e, t) {
  let r = by(e, t);
  if (r?.pointerEvents === "none") throw new Error([`Unable to perform pointer interaction as the element ${r.tree.length > 1 ? "inherits" : "has"} \`pointer-events: none\`:`, "", YN(r.tree)].join(`
`));
}
function YN(e) {
  return e.reverse().map((t, r) => ["".padEnd(r), t.tagName, t.id && `#${t.id}`, t.hasAttribute("data-testid") && `(testId=${t.getAttribute("data-testid")})`, JN(t), e.length > 1 && r === 0 && "  <-- This element declared `pointer-events: none`", e.length > 1 && r === e.length - 1 && "  <-- Asserted pointer events here"].filter(Boolean).join("")).join(`
`);
}
function JN(e) {
  var t;
  let r;
  if (e.hasAttribute("aria-label")) r = e.getAttribute("aria-label");
  else if (e.hasAttribute("aria-labelledby")) {
    var n, o;
    r = (o = e.ownerDocument.getElementById(e.getAttribute("aria-labelledby"))) === null || o === void 0 || (n = o.textContent) === null || n === void 0 ? void 0 : n.trim();
  } else if (X(e, ["button", "input", "meter", "output", "progress", "select", "textarea"]) && !((t = e.labels) === null || t === void 0) && t.length) r = Array.from(e.labels).map((a) => {
    var i;
    return (i = a.textContent) === null || i === void 0 ? void 0 : i.trim();
  }).join("|");
  else if (X(e, "button")) {
    var l;
    r = (l = e.textContent) === null || l === void 0 ? void 0 : l.trim();
  }
  return r = r?.replace(/\n/g, "  "), Number(r?.length) > 30 && (r = `${r?.substring(0, 29)}…`), r ? `(label=${r})` : "";
}
function qd(e, t) {
  return (e & t) > 0;
}
function Ot(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
var Pd = class {
  init(e, t) {
    this.position = t;
    let r = this.getTarget(e), [, n] = Wr(null, r), o = this.getEventInit();
    return Hr(e, r), e.dispatchUIEvent(r, "pointerover", o), n.forEach((l) => e.dispatchUIEvent(l, "pointerenter", o)), this;
  }
  move(e, t) {
    let r = this.position, n = this.getTarget(e);
    if (this.position = t, !hy(r, t)) return;
    let o = this.getTarget(e), l = this.getEventInit(), [a, i] = Wr(n, o);
    return { leave: () => {
      co(e, n) && n !== o && (e.dispatchUIEvent(n, "pointerout", l), a.forEach((u) => e.dispatchUIEvent(u, "pointerleave", l)));
    }, enter: () => {
      Hr(e, o), n !== o && (e.dispatchUIEvent(o, "pointerover", l), i.forEach((u) => e.dispatchUIEvent(u, "pointerenter", l)));
    }, move: () => {
      e.dispatchUIEvent(o, "pointermove", l);
    } };
  }
  down(e, t) {
    if (this.isDown) return;
    let r = this.getTarget(e);
    Hr(e, r), this.isDown = !0, this.isPrevented = !e.dispatchUIEvent(r, "pointerdown", this.getEventInit());
  }
  up(e, t) {
    if (!this.isDown) return;
    let r = this.getTarget(e);
    Hr(e, r), this.isDown = !1, e.dispatchUIEvent(r, "pointerup", this.getEventInit());
  }
  release(e) {
    let t = this.getTarget(e), [r] = Wr(t, null), n = this.getEventInit();
    co(e, t) && (e.dispatchUIEvent(t, "pointerout", n), r.forEach((o) => e.dispatchUIEvent(o, "pointerleave", n))), this.isCancelled = !0;
  }
  getTarget(e) {
    var t;
    return (t = this.position.target) !== null && t !== void 0 ? t : e.config.document.body;
  }
  getEventInit() {
    return { ...this.position.coords, pointerId: this.pointerId, pointerType: this.pointerType, isPrimary: this.isPrimary };
  }
  constructor({ pointerId: e, pointerType: t, isPrimary: r }) {
    Ot(this, "pointerId", void 0), Ot(this, "pointerType", void 0), Ot(this, "isPrimary", void 0), Ot(this, "isMultitouch", !1), Ot(this, "isCancelled", !1), Ot(this, "isDown", !1), Ot(this, "isPrevented", !1), Ot(this, "position", {}), this.pointerId = e, this.pointerType = t, this.isPrimary = r, this.isMultitouch = !r;
  }
};
function Tt(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
var XN = class {
  isKeyPressed(e) {
    return this.devices.get(e.pointerType).isPressed(e);
  }
  async press(e, t, r) {
    let n = this.getPointerName(t), o = t.pointerType === "touch" ? this.pointers.new(n, t).init(e, r) : this.pointers.get(n);
    o.position = r, o.pointerType !== "touch" && (this.mouse.position = r), this.devices.get(t.pointerType).addPressed(t), this.buttons.down(t), o.down(e, t), o.pointerType !== "touch" && !o.isPrevented && this.mouse.down(e, t, o);
  }
  async move(e, t, r) {
    let n = this.pointers.get(t), o = n.move(e, r), l = n.pointerType === "touch" || n.isPrevented && n.isDown ? void 0 : this.mouse.move(e, r);
    o?.leave(), l?.leave(), o?.enter(), l?.enter(), o?.move(), l?.move();
  }
  async release(e, t, r) {
    let n = this.devices.get(t.pointerType);
    n.removePressed(t), this.buttons.up(t);
    let o = this.pointers.get(this.getPointerName(t));
    if (o.position = r, o.pointerType !== "touch" && (this.mouse.position = r), n.countPressed === 0 && o.up(e, t), o.pointerType === "touch" && o.release(e), !o.isPrevented) {
      if (o.pointerType === "touch" && !o.isMultitouch) {
        let l = this.mouse.move(e, o.position);
        l?.leave(), l?.enter(), l?.move(), this.mouse.down(e, t, o);
      }
      if (!o.isMultitouch) {
        let l = this.mouse.move(e, o.position);
        l?.leave(), l?.enter(), l?.move(), this.mouse.up(e, t, o);
      }
    }
  }
  getPointerName(e) {
    return e.pointerType === "touch" ? e.name : e.pointerType;
  }
  getPreviousPosition(e) {
    return this.pointers.has(e) ? this.pointers.get(e).position : void 0;
  }
  resetClickCount() {
    this.mouse.resetClickCount();
  }
  getMouseTarget(e) {
    var t;
    return (t = this.mouse.position.target) !== null && t !== void 0 ? t : e.config.document.body;
  }
  setMousePosition(e) {
    this.mouse.position = e, this.pointers.get("mouse").position = e;
  }
  constructor(e) {
    Tt(this, "system", void 0), Tt(this, "mouse", void 0), Tt(this, "buttons", void 0), Tt(this, "devices", new class {
      get(t) {
        var r, n, o;
        return (o = (r = this.registry)[n = t]) !== null && o !== void 0 || (r[n] = new HN()), this.registry[t];
      }
      constructor() {
        Tt(this, "registry", {});
      }
    }()), Tt(this, "pointers", new class {
      new(t, r) {
        let n = r.pointerType !== "touch" || !Object.values(this.registry).some((o) => o.pointerType === "touch" && !o.isCancelled);
        return n || Object.values(this.registry).forEach((o) => {
          o.pointerType === r.pointerType && !o.isCancelled && (o.isMultitouch = !0);
        }), this.registry[t] = new Pd({ pointerId: this.nextId++, pointerType: r.pointerType, isPrimary: n }), this.registry[t];
      }
      get(t) {
        if (!this.has(t)) throw new Error(`Trying to access pointer "${t}" which does not exist.`);
        return this.registry[t];
      }
      has(t) {
        return t in this.registry;
      }
      constructor() {
        Tt(this, "registry", { mouse: new Pd({ pointerId: 1, pointerType: "mouse", isPrimary: !0 }) }), Tt(this, "nextId", 2);
      }
    }()), this.system = e, this.buttons = new fy(), this.mouse = new WN();
  }
};
function Od(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
var yy = class {
  getUIEventModifiers() {
    return { altKey: this.keyboard.modifiers.Alt, ctrlKey: this.keyboard.modifiers.Control, metaKey: this.keyboard.modifiers.Meta, shiftKey: this.keyboard.modifiers.Shift, modifierAltGraph: this.keyboard.modifiers.AltGraph, modifierCapsLock: this.keyboard.modifiers.CapsLock, modifierFn: this.keyboard.modifiers.Fn, modifierFnLock: this.keyboard.modifiers.FnLock, modifierNumLock: this.keyboard.modifiers.NumLock, modifierScrollLock: this.keyboard.modifiers.ScrollLock, modifierSymbol: this.keyboard.modifiers.Symbol, modifierSymbolLock: this.keyboard.modifiers.SymbolLock };
  }
  constructor() {
    Od(this, "keyboard", new kN(this)), Od(this, "pointer", new XN(this));
  }
};
async function QN(e) {
  let t = [];
  return this.config.skipHover || t.push({ target: e }), t.push({ keys: "[MouseLeft]", target: e }), this.pointer(t);
}
async function ZN(e) {
  return this.pointer([{ target: e }, "[MouseLeft][MouseLeft]"]);
}
async function e$(e) {
  return this.pointer([{ target: e }, "[MouseLeft][MouseLeft][MouseLeft]"]);
}
async function t$(e) {
  return this.pointer({ target: e });
}
async function r$(e) {
  return Hr(this, this.system.pointer.getMouseTarget(this)), this.pointer({ target: e.ownerDocument.body });
}
async function n$({ shift: e } = {}) {
  return this.keyboard(e === !0 ? "{Shift>}{Tab}{/Shift}" : e === !1 ? "[/ShiftLeft][/ShiftRight]{Tab}" : "{Tab}");
}
function o$(e, t) {
  let r = [];
  do {
    let { type: o, descriptor: l, consumedLength: a, releasePrevious: i, releaseSelf: u = !0, repeat: c } = Qb(t, "keyboard");
    var n;
    let s = (n = e.find((d) => {
      if (o === "[") {
        var f;
        return ((f = d.code) === null || f === void 0 ? void 0 : f.toLowerCase()) === l.toLowerCase();
      } else if (o === "{") {
        var p;
        return ((p = d.key) === null || p === void 0 ? void 0 : p.toLowerCase()) === l.toLowerCase();
      }
      return d.key === l;
    })) !== null && n !== void 0 ? n : { key: "Unknown", code: "Unknown", [o === "[" ? "code" : "key"]: l };
    r.push({ keyDef: s, releasePrevious: i, releaseSelf: u, repeat: c }), t = t.slice(a);
  } while (t);
  return r;
}
async function a$(e) {
  let t = o$(this.config.keyboardMap, e);
  for (let r = 0; r < t.length; r++) await xr(this.config), await l$(this, t[r]);
}
async function l$(e, { keyDef: t, releasePrevious: r, releaseSelf: n, repeat: o }) {
  let { system: l } = e;
  if (l.keyboard.isKeyPressed(t) && await l.keyboard.keyup(e, t), !r) {
    for (let a = 1; a <= o; a++) await l.keyboard.keydown(e, t), a < o && await xr(e.config);
    n && await l.keyboard.keyup(e, t);
  }
}
async function i$(e) {
  for (let t of e.system.keyboard.getPressedKeys()) await e.system.keyboard.keyup(e, t);
}
function gy(e) {
  let t = ut(e) ? { "text/plain": s$(e) } : { "text/plain": String(e.ownerDocument.getSelection()) }, r = js(st(e));
  for (let n in t) t[n] && r.setData(n, t[n]);
  return r;
}
function s$(e) {
  let t = pn(e);
  return ct(e).substring(t.startOffset, t.endOffset);
}
async function u$() {
  let e = this.config.document;
  var t;
  let r = (t = e.activeElement) !== null && t !== void 0 ? t : e.body, n = gy(r);
  if (n.items.length !== 0) return this.dispatchUIEvent(r, "copy", { clipboardData: n }) && this.config.writeToClipboard && await Yb(e, n), n;
}
async function c$() {
  let e = this.config.document;
  var t;
  let r = (t = e.activeElement) !== null && t !== void 0 ? t : e.body, n = gy(r);
  if (n.items.length !== 0) return this.dispatchUIEvent(r, "cut", { clipboardData: n }) && this.config.writeToClipboard && await Yb(r.ownerDocument, n), n;
}
async function d$(e) {
  let t = this.config.document;
  var r;
  let n = (r = t.activeElement) !== null && r !== void 0 ? r : t.body;
  var o;
  let l = (o = typeof e == "string" ? p$(t, e) : e) !== null && o !== void 0 ? o : await Nj(t).catch(() => {
    throw new Error("`userEvent.paste()` without `clipboardData` requires the `ClipboardAPI` to be available.");
  });
  this.dispatchUIEvent(n, "paste", { clipboardData: l });
}
function p$(e, t) {
  let r = js(st(e));
  return r.setData("text", t), r;
}
function Td(e, t) {
  let r = [];
  do {
    let { descriptor: n, consumedLength: o, releasePrevious: l, releaseSelf: a = !0 } = Qb(t, "pointer"), i = e.find((u) => u.name === n);
    i && r.push({ keyDef: i, releasePrevious: l, releaseSelf: a }), t = t.slice(o);
  } while (t);
  return r;
}
async function f$(e) {
  let { pointerMap: t } = this.config, r = [];
  (Array.isArray(e) ? e : [e]).forEach((n) => {
    typeof n == "string" ? r.push(...Td(t, n)) : "keys" in n ? r.push(...Td(t, n.keys).map((o) => ({ ...n, ...o }))) : r.push(n);
  });
  for (let n = 0; n < r.length; n++) await xr(this.config), await m$(this, r[n]);
  this.system.pointer.resetClickCount();
}
async function m$(e, t) {
  var r, n;
  let o = "pointerName" in t && t.pointerName ? t.pointerName : "keyDef" in t ? e.system.pointer.getPointerName(t.keyDef) : "mouse", l = e.system.pointer.getPreviousPosition(o);
  var a, i, u, c;
  let s = { target: (a = t.target) !== null && a !== void 0 ? a : h$(e, l), coords: (i = t.coords) !== null && i !== void 0 ? i : l?.coords, caret: { node: (u = t.node) !== null && u !== void 0 ? u : Sd(t) || l == null || (r = l.caret) === null || r === void 0 ? void 0 : r.node, offset: (c = t.offset) !== null && c !== void 0 ? c : Sd(t) || l == null || (n = l.caret) === null || n === void 0 ? void 0 : n.offset } };
  "keyDef" in t ? (e.system.pointer.isKeyPressed(t.keyDef) && (Fr(e, ke.Trigger), await e.system.pointer.release(e, t.keyDef, s)), t.releasePrevious || (Fr(e, ke.Trigger), await e.system.pointer.press(e, t.keyDef, s), t.releaseSelf && (Fr(e, ke.Trigger), await e.system.pointer.release(e, t.keyDef, s)))) : (Fr(e, ke.Trigger), await e.system.pointer.move(e, o, s));
}
function Sd(e) {
  var t, r;
  return !!((r = (t = e.target) !== null && t !== void 0 ? t : e.node) !== null && r !== void 0 ? r : e.offset !== void 0);
}
function h$(e, t) {
  if (!t) throw new Error("This pointer has no previous position. Provide a target property!");
  var r;
  return (r = t.target) !== null && r !== void 0 ? r : e.config.document.body;
}
async function b$(e) {
  if (!Tr(e) || _t(e)) throw new Error("clear()` is only supported on editable elements.");
  if (It(e), e.ownerDocument.activeElement !== e) throw new Error("The element to be cleared could not be focused.");
  if (iy(e), !hN(e)) throw new Error("The element content to be cleared could not be selected.");
  Ar(this, e, "", "deleteContentBackward");
}
async function y$(e, t) {
  return vy.call(this, !0, e, t);
}
async function g$(e, t) {
  return vy.call(this, !1, e, t);
}
async function vy(e, t, r) {
  if (!e && !t.multiple) throw te().getElementError("Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.", t);
  let n = Array.isArray(r) ? r : [r], o = Array.from(t.querySelectorAll('option, [role="option"]')), l = n.map((i) => {
    if (typeof i != "string" && o.includes(i)) return i;
    {
      let u = o.find((c) => c.value === i || c.innerHTML === i);
      if (u) return u;
      throw te().getElementError(`Value "${String(i)}" not found in options`, t);
    }
  }).filter((i) => !_t(i));
  if (_t(t) || !l.length) return;
  let a = (i) => {
    i.selected = e, this.dispatchUIEvent(t, "input", { bubbles: !0, cancelable: !1, composed: !0 }), this.dispatchUIEvent(t, "change");
  };
  if (X(t, "select")) if (t.multiple) for (let i of l) {
    let u = this.config.pointerEventsCheck === 0 ? !0 : co(this, i);
    u && (this.dispatchUIEvent(i, "pointerover"), this.dispatchUIEvent(t, "pointerenter"), this.dispatchUIEvent(i, "mouseover"), this.dispatchUIEvent(t, "mouseenter"), this.dispatchUIEvent(i, "pointermove"), this.dispatchUIEvent(i, "mousemove"), this.dispatchUIEvent(i, "pointerdown"), this.dispatchUIEvent(i, "mousedown")), It(t), u && (this.dispatchUIEvent(i, "pointerup"), this.dispatchUIEvent(i, "mouseup")), a(i), u && this.dispatchUIEvent(i, "click"), await xr(this.config);
  }
  else if (l.length === 1) {
    let i = this.config.pointerEventsCheck === 0 ? !0 : co(this, t);
    i ? await this.click(t) : It(t), a(l[0]), i && (this.dispatchUIEvent(t, "pointerover"), this.dispatchUIEvent(t, "pointerenter"), this.dispatchUIEvent(t, "mouseover"), this.dispatchUIEvent(t, "mouseenter"), this.dispatchUIEvent(t, "pointerup"), this.dispatchUIEvent(t, "mouseup"), this.dispatchUIEvent(t, "click")), await xr(this.config);
  } else throw te().getElementError("Cannot select multiple options on a non-multiple select", t);
  else if (t.getAttribute("role") === "listbox") for (let i of l) await this.click(i), await this.unhover(i);
  else throw te().getElementError("Cannot select options on elements that are neither select nor listbox elements", t);
}
async function v$(e, t, { skipClick: r = this.config.skipClick, skipAutoClose: n = this.config.skipAutoClose, initialSelectionStart: o, initialSelectionEnd: l } = {}) {
  e.disabled || (r || await this.click(e), o !== void 0 && Ur(e, o, l ?? o), await this.keyboard(t), n || await i$(this));
}
var Md = Symbol("files and value properties are mocked");
function Ya(e, t, r) {
  r ? Object.defineProperty(e, t, r) : delete e[t];
}
function _$(e, t) {
  var r;
  (r = e[Md]) === null || r === void 0 || r.restore();
  let n = Object.getOwnPropertyDescriptor(e, "type"), o = Object.getOwnPropertyDescriptor(e, "value"), l = Object.getOwnPropertyDescriptor(e, "files");
  function a() {
    Ya(e, "type", n), Ya(e, "value", o), Ya(e, "files", l);
  }
  e[Md] = { restore: a }, Object.defineProperties(e, { files: { configurable: !0, get: () => t }, value: { configurable: !0, get: () => t.length ? `C:\\fakepath\\${t[0].name}` : "", set(i) {
    if (i === "") a();
    else {
      var u;
      o == null || (u = o.set) === null || u === void 0 || u.call(e, i);
    }
  } }, type: { configurable: !0, get: () => "file", set(i) {
    i !== "file" && (a(), e.type = i);
  } } });
}
async function R$(e, t) {
  let r = X(e, "label") ? e.control : e;
  if (!r || !X(r, "input", { type: "file" })) throw new TypeError(`The ${r === e ? "given" : "associated"} ${r?.tagName} element does not accept file uploads`);
  if (_t(e)) return;
  let n = (Array.isArray(t) ? t : [t]).filter((l) => !this.config.applyAccept || w$(l, r.accept)).slice(0, r.multiple ? void 0 : 1), o = () => {
    var l;
    n.length === ((l = r.files) === null || l === void 0 ? void 0 : l.length) && n.every((a, i) => {
      var u;
      return a === ((u = r.files) === null || u === void 0 ? void 0 : u.item(i));
    }) || (_$(r, xs(st(e), n)), this.dispatchUIEvent(r, "input"), this.dispatchUIEvent(r, "change"));
  };
  r.addEventListener("fileDialog", o), await this.click(e), r.removeEventListener("fileDialog", o);
}
function w$(e, t) {
  if (!t) return !0;
  let r = ["audio/*", "image/*", "video/*"];
  return t.split(",").some((n) => n.startsWith(".") ? e.name.endsWith(n) : r.includes(n) ? e.type.startsWith(n.substr(0, n.length - 1)) : e.type === n);
}
var Ad = { click: QN, dblClick: ZN, tripleClick: e$, hover: t$, unhover: r$, tab: n$, keyboard: a$, copy: u$, cut: c$, paste: d$, pointer: f$, clear: b$, deselectOptions: g$, selectOptions: y$, type: v$, upload: R$ };
function E$(e) {
  return te().asyncWrapper(e);
}
var _y = { applyAccept: !0, autoModify: !0, delay: 0, document: globalThis.document, keyboardMap: BN, pointerMap: DN, pointerEventsCheck: br.EachApiCall, skipAutoClose: !1, skipClick: !1, skipHover: !1, writeToClipboard: !1, advanceTimers: () => Promise.resolve() }, C$ = { ..._y, writeToClipboard: !0 };
function Ry(e = {}, t = C$, r) {
  let n = T$(e, r, t);
  return { ...t, ...e, document: n };
}
function q$(e = {}) {
  let t = Ry(e);
  py(t.document);
  var r;
  let n = (r = t.document.defaultView) !== null && r !== void 0 ? r : globalThis.window;
  return Aj(n), ks(t).api;
}
function $e({ keyboardState: e, pointerState: t, ...r } = {}, n) {
  let o = Ry(r, _y, n);
  py(o.document);
  var l;
  let a = (l = t ?? e) !== null && l !== void 0 ? l : new yy();
  return { api: ks(o, a).api, system: a };
}
function P$(e) {
  return ks({ ...this.config, ...e }, this.system).api;
}
function O$(e, t) {
  function r(...n) {
    return Fr(e, ke.Call), E$(() => t.apply(e, n).then(async (o) => (await xr(e.config), o)));
  }
  return Object.defineProperty(r, "name", { get: () => t.name }), r;
}
function ks(e, t = new yy()) {
  let r = {};
  return Object.assign(r, { config: e, dispatchEvent: dy.bind(r), dispatchUIEvent: TN.bind(r), system: t, levelRefs: {}, ...Ad }), { instance: r, api: { ...Object.fromEntries(Object.entries(Ad).map(([n, o]) => [n, O$(r, o)])), setup: P$.bind(r) } };
}
function T$(e, t, r) {
  var n, o;
  return (o = (n = e.document) !== null && n !== void 0 ? n : t && NN(t)) !== null && o !== void 0 ? o : r.document;
}
var wy = {};
yi(wy, { clear: () => S$, click: () => M$, copy: () => A$, cut: () => x$, dblClick: () => j$, deselectOptions: () => N$, hover: () => $$, keyboard: () => I$, paste: () => k$, pointer: () => L$, selectOptions: () => B$, tab: () => V$, tripleClick: () => D$, type: () => F$, unhover: () => U$, upload: () => H$ });
function S$(e) {
  return $e().api.clear(e);
}
function M$(e, t = {}) {
  return $e(t, e).api.click(e);
}
function A$(e = {}) {
  return $e(e).api.copy();
}
function x$(e = {}) {
  return $e(e).api.cut();
}
function j$(e, t = {}) {
  return $e(t).api.dblClick(e);
}
function N$(e, t, r = {}) {
  return $e(r).api.deselectOptions(e, t);
}
function $$(e, t = {}) {
  return $e(t).api.hover(e);
}
async function I$(e, t = {}) {
  let { api: r, system: n } = $e(t);
  return r.keyboard(e).then(() => n);
}
async function L$(e, t = {}) {
  let { api: r, system: n } = $e(t);
  return r.pointer(e).then(() => n);
}
function k$(e, t) {
  return $e(t).api.paste(e);
}
function B$(e, t, r = {}) {
  return $e(r).api.selectOptions(e, t);
}
function D$(e, t = {}) {
  return $e(t).api.tripleClick(e);
}
function F$(e, t, r = {}) {
  return $e(r, e).api.type(e, t, r);
}
function U$(e, t = {}) {
  let { api: r, system: n } = $e(t);
  return n.pointer.setMousePosition({ target: e }), r.unhover(e);
}
function H$(e, t, r = {}) {
  return $e(r).api.upload(e, t);
}
function V$(e = {}) {
  return $e().api.tab(e);
}
var z$ = { ...wy, setup: q$ };
function G$(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  var n = Array.from(typeof e == "string" ? [e] : e);
  n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var o = n.reduce(function(i, u) {
    var c = u.match(/\n([\t ]+|(?!\s).)/g);
    return c ? i.concat(c.map(function(s) {
      var d, f;
      return (f = (d = s.match(/[\t ]/g)) === null || d === void 0 ? void 0 : d.length) !== null && f !== void 0 ? f : 0;
    })) : i;
  }, []);
  if (o.length) {
    var l = new RegExp(`
[	 ]{` + Math.min.apply(Math, o) + "}", "g");
    n = n.map(function(i) {
      return i.replace(l, `
`);
    });
  }
  n[0] = n[0].replace(/^\r?\n/, "");
  var a = n[0];
  return t.forEach(function(i, u) {
    var c = a.match(/(?:^|\n)( *)$/), s = c ? c[1] : "", d = i;
    typeof i == "string" && i.includes(`
`) && (d = String(i).split(`
`).map(function(f, p) {
      return p === 0 ? f : "" + s + f;
    }).join(`
`)), a += d + n[u + 1];
  }), a;
}
var W$ = G$, ti = hi({ ...gh }, { intercept: (e, t) => t[0] === "fireEvent" || e.startsWith("find") || e.startsWith("waitFor") });
ti.screen = new Proxy(ti.screen, { get(e, t, r) {
  return w_.warn(W$`
          You are using Testing Library's \`screen\` object. Use \`within(canvasElement)\` instead.
          More info: https://storybook.js.org/docs/essentials/interactions
        `), Reflect.get(e, t, r);
} });
var { buildQueries: cI, configure: dI, createEvent: pI, fireEvent: fI, findAllByAltText: mI, findAllByDisplayValue: hI, findAllByLabelText: bI, findAllByPlaceholderText: yI, findAllByRole: gI, findAllByTestId: vI, findAllByText: _I, findAllByTitle: RI, findByAltText: wI, findByDisplayValue: EI, findByLabelText: CI, findByPlaceholderText: qI, findByRole: PI, findByTestId: OI, findByText: TI, findByTitle: SI, getAllByAltText: MI, getAllByDisplayValue: AI, getAllByLabelText: xI, getAllByPlaceholderText: jI, getAllByRole: NI, getAllByTestId: $I, getAllByText: II, getAllByTitle: LI, getByAltText: kI, getByDisplayValue: BI, getByLabelText: DI, getByPlaceholderText: FI, getByRole: UI, getByTestId: HI, getByText: VI, getByTitle: zI, getConfig: GI, getDefaultNormalizer: WI, getElementError: KI, getNodeText: YI, getQueriesForElement: JI, getRoles: XI, getSuggestedQuery: QI, isInaccessible: ZI, logDOM: e2, logRoles: t2, prettyDOM: r2, queries: n2, queryAllByAltText: o2, queryAllByAttribute: a2, queryAllByDisplayValue: l2, queryAllByLabelText: i2, queryAllByPlaceholderText: s2, queryAllByRole: u2, queryAllByTestId: c2, queryAllByText: d2, queryAllByTitle: p2, queryByAltText: f2, queryByAttribute: m2, queryByDisplayValue: h2, queryByLabelText: b2, queryByPlaceholderText: y2, queryByRole: g2, queryByTestId: v2, queryByText: _2, queryByTitle: R2, queryHelpers: w2, screen: E2, waitFor: C2, waitForElementToBeRemoved: q2, within: K$, prettyFormat: P2 } = ti, { userEvent: O2 } = hi({ userEvent: z$ }, { intercept: !0 }), { expect: xd } = hi({ expect: yh }, { getKeys: (e, t) => {
  let r = ["assert", "__methods", "__flags", "_obj"];
  if (e.constructor === T) {
    let n = Object.keys(Object.getPrototypeOf(e)).filter((o) => !r.includes(o));
    return t > 2 ? n : [...n, "not"];
  }
  return Object.keys(e);
}, intercept: (e) => e !== "expect" }), Y$ = ({ parameters: e }) => {
  e?.test?.mockReset === !0 ? gA() : e?.test?.clearMocks === !0 ? yA() : e?.test?.restoreMocks !== !1 && vA();
}, ri = (e, t = 0, r) => {
  if (t > 5 || e == null) return e;
  if (ih(e)) return r && e.mockName(r), e;
  if (typeof e == "function" && "isAction" in e && e.isAction && !("implicit" in e && e.implicit)) {
    let n = hA(e);
    return r && n.mockName(r), n;
  }
  if (Array.isArray(e)) {
    t++;
    for (let n = 0; n < e.length; n++) e[n] = ri(e[n], t);
  }
  if (typeof e == "object" && e.constructor === Object) {
    t++;
    for (let [n, o] of Object.entries(e)) Object.getOwnPropertyDescriptor(e, n)?.writable && (e[n] = ri(o, t, n));
    return e;
  }
  return e;
}, J$ = ({ initialArgs: e }) => {
  ri(e);
}, X$ = (e) => {
  globalThis.HTMLElement && e.canvasElement instanceof globalThis.HTMLElement && (e.canvas = K$(e.canvasElement));
};
_p.__STORYBOOK_TEST_LOADERS__ = [Y$, J$, X$];
_p.__STORYBOOK_TEST_ON_MOCK_CALL__ = mA;
const { addons: Q$ } = __STORYBOOK_MODULE_PREVIEW_API__, { global: Z$ } = __STORYBOOK_MODULE_GLOBAL__;
var Cn = "storybook/a11y", eI = `${Cn}/result`, tI = `${Cn}/request`, rI = `${Cn}/running`, nI = `${Cn}/error`, oI = `${Cn}/manual`, Ja = { RESULT: eI, REQUEST: tI, RUNNING: rI, ERROR: nI, MANUAL: oI }, { document: jd } = Z$, Xa = Q$.getChannel(), Ey = { config: {}, options: {} }, aI = ["region"], ni = [], oi = !1, Cy = async () => {
  if (ni.length === 0) {
    oi = !1;
    return;
  }
  oi = !0;
  let e = ni.shift();
  e && await e(), Cy();
}, qy = async (e = Ey) => {
  let { default: t } = await import("./axe.js").then((i) => i.a), { element: r = "body", config: n = {}, options: o = {} } = e, l = jd.querySelector(r) ?? jd.body;
  if (!l) return;
  t.reset();
  let a = { ...n, rules: [...aI.map((i) => ({ id: i, enabled: !1 })), ...n?.rules ?? []] };
  return t.configure(a), new Promise((i, u) => {
    let c = async () => {
      try {
        let s = await t.run(l, o);
        i(s);
      } catch (s) {
        u(s);
      }
    };
    ni.push(c), oi || Cy();
  });
};
Xa.on(Ja.MANUAL, async (e, t = Ey) => {
  try {
    let r = await qy(t), n = JSON.parse(JSON.stringify(r));
    Xa.emit(Ja.RESULT, n, e);
  } catch (r) {
    Xa.emit(Ja.ERROR, r);
  }
});
function Nd() {
  try {
    return !1;
  } catch {
    return !1;
  }
}
var $d = !1, T2 = async ({ reporting: e, parameters: t, globals: r }) => {
  let n = t.a11y, o = r.a11y, l = n?.manual !== !0 && n?.disable !== !0 && n?.test !== "off" && o?.manual !== !0, a = () => {
    switch (n?.test) {
      case "todo":
        return "warning";
      case "error":
      default:
        return "failed";
    }
  };
  if (l) try {
    let i = await qy(n);
    if (i) {
      let u = (i?.violations.length ?? 0) > 0;
      if (e.addReport({ type: "a11y", version: 1, result: i, status: u ? a() : "passed" }), Nd() && u && a() === "failed") {
        if (!$d) {
          let { toHaveNoViolations: c } = await import("./matchers-7Z3WT2CE.js");
          xd.extend({ toHaveNoViolations: c }), $d = !0;
        }
        xd(i).toHaveNoViolations();
      }
    }
  } catch (i) {
    if (e.addReport({ type: "a11y", version: 1, result: { error: i }, status: "failed" }), Nd()) throw i;
  }
}, S2 = { a11y: { manual: !1 } }, M2 = { a11y: { test: "todo" } };
export {
  T2 as experimental_afterEach,
  S2 as initialGlobals,
  M2 as parameters
};
