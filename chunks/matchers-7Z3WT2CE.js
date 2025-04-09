/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
var _e = (e = 0) => (t) => `\x1B[${t + e}m`, Ee = (e = 0) => (t) => `\x1B[${38 + e};5;${t}m`, he = (e = 0) => (t, n, i) => `\x1B[${38 + e};2;${t};${n};${i}m`, P = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
Object.keys(P.modifier);
var Ie = Object.keys(P.color), we = Object.keys(P.bgColor);
[...Ie, ...we];
function je() {
  let e = /* @__PURE__ */ new Map();
  for (let [t, n] of Object.entries(P)) {
    for (let [i, c] of Object.entries(n)) P[i] = { open: `\x1B[${c[0]}m`, close: `\x1B[${c[1]}m` }, n[i] = P[i], e.set(c[0], c[1]);
    Object.defineProperty(P, t, { value: n, enumerable: !1 });
  }
  return Object.defineProperty(P, "codes", { value: e, enumerable: !1 }), P.color.close = "\x1B[39m", P.bgColor.close = "\x1B[49m", P.color.ansi = _e(), P.color.ansi256 = Ee(), P.color.ansi16m = he(), P.bgColor.ansi = _e(10), P.bgColor.ansi256 = Ee(10), P.bgColor.ansi16m = he(10), Object.defineProperties(P, { rgbToAnsi256: { value(t, n, i) {
    return t === n && n === i ? t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(i / 255 * 5);
  }, enumerable: !1 }, hexToRgb: { value(t) {
    let n = /[a-f\d]{6}|[a-f\d]{3}/i.exec(t.toString(16));
    if (!n) return [0, 0, 0];
    let [i] = n;
    i.length === 3 && (i = [...i].map((_) => _ + _).join(""));
    let c = Number.parseInt(i, 16);
    return [c >> 16 & 255, c >> 8 & 255, c & 255];
  }, enumerable: !1 }, hexToAnsi256: { value: (t) => P.rgbToAnsi256(...P.hexToRgb(t)), enumerable: !1 }, ansi256ToAnsi: { value(t) {
    if (t < 8) return 30 + t;
    if (t < 16) return 90 + (t - 8);
    let n, i, c;
    if (t >= 232) n = ((t - 232) * 10 + 8) / 255, i = n, c = n;
    else {
      t -= 16;
      let u = t % 36;
      n = Math.floor(t / 36) / 5, i = Math.floor(u / 6) / 5, c = u % 6 / 5;
    }
    let _ = Math.max(n, i, c) * 2;
    if (_ === 0) return 30;
    let p = 30 + (Math.round(c) << 2 | Math.round(i) << 1 | Math.round(n));
    return _ === 2 && (p += 60), p;
  }, enumerable: !1 }, rgbToAnsi: { value: (t, n, i) => P.ansi256ToAnsi(P.rgbToAnsi256(t, n, i)), enumerable: !1 }, hexToAnsi: { value: (t) => P.ansi256ToAnsi(P.hexToAnsi256(t)), enumerable: !1 } }), P;
}
var Be = je(), x = Be, Oe = (() => {
  if (!("navigator" in globalThis)) return 0;
  if (globalThis.navigator.userAgentData) {
    let e = navigator.userAgentData.brands.find(({ brand: t }) => t === "Chromium");
    if (e && e.version > 93) return 3;
  }
  return /\b(Chrome|Chromium)\//.test(globalThis.navigator.userAgent) ? 1 : 0;
})(), Te = Oe !== 0 && { level: Oe }, Le = { stdout: Te, stderr: Te }, De = Le;
function Fe(e, t, n) {
  let i = e.indexOf(t);
  if (i === -1) return e;
  let c = t.length, _ = 0, p = "";
  do
    p += e.slice(_, i) + t + n, _ = i + c, i = e.indexOf(t, _);
  while (i !== -1);
  return p += e.slice(_), p;
}
function ke(e, t, n, i) {
  let c = 0, _ = "";
  do {
    let p = e[i - 1] === "\r";
    _ += e.slice(c, p ? i - 1 : i) + t + (p ? `\r
` : `
`) + n, c = i + 1, i = e.indexOf(`
`, c);
  } while (i !== -1);
  return _ += e.slice(c), _;
}
var { stdout: Se, stderr: Me } = De, de = Symbol("GENERATOR"), V = Symbol("STYLER"), J = Symbol("IS_EMPTY"), Ae = ["ansi", "ansi", "ansi256", "ansi16m"], H = /* @__PURE__ */ Object.create(null), Ye = (e, t = {}) => {
  if (t.level && !(Number.isInteger(t.level) && t.level >= 0 && t.level <= 3)) throw new Error("The `level` option should be an integer from 0 to 3");
  let n = Se ? Se.level : 0;
  e.level = t.level === void 0 ? n : t.level;
}, ze = (e) => {
  let t = (...n) => n.join(" ");
  return Ye(t, e), Object.setPrototypeOf(t, X.prototype), t;
};
function X(e) {
  return ze(e);
}
Object.setPrototypeOf(X.prototype, Function.prototype);
for (let [e, t] of Object.entries(x)) H[e] = { get() {
  let n = ie(this, pe(t.open, t.close, this[V]), this[J]);
  return Object.defineProperty(this, e, { value: n }), n;
} };
H.visible = { get() {
  let e = ie(this, this[V], !0);
  return Object.defineProperty(this, "visible", { value: e }), e;
} };
var fe = (e, t, n, ...i) => e === "rgb" ? t === "ansi16m" ? x[n].ansi16m(...i) : t === "ansi256" ? x[n].ansi256(x.rgbToAnsi256(...i)) : x[n].ansi(x.rgbToAnsi(...i)) : e === "hex" ? fe("rgb", t, n, ...x.hexToRgb(...i)) : x[n][e](...i), Ue = ["rgb", "hex", "ansi256"];
for (let e of Ue) {
  H[e] = { get() {
    let { level: n } = this;
    return function(...i) {
      let c = pe(fe(e, Ae[n], "color", ...i), x.color.close, this[V]);
      return ie(this, c, this[J]);
    };
  } };
  let t = "bg" + e[0].toUpperCase() + e.slice(1);
  H[t] = { get() {
    let { level: n } = this;
    return function(...i) {
      let c = pe(fe(e, Ae[n], "bgColor", ...i), x.bgColor.close, this[V]);
      return ie(this, c, this[J]);
    };
  } };
}
var xe = Object.defineProperties(() => {
}, { ...H, level: { enumerable: !0, get() {
  return this[de].level;
}, set(e) {
  this[de].level = e;
} } }), pe = (e, t, n) => {
  let i, c;
  return n === void 0 ? (i = e, c = t) : (i = n.openAll + e, c = t + n.closeAll), { open: e, close: t, openAll: i, closeAll: c, parent: n };
}, ie = (e, t, n) => {
  let i = (...c) => Ge(i, c.length === 1 ? "" + c[0] : c.join(" "));
  return Object.setPrototypeOf(i, xe), i[de] = e, i[V] = t, i[J] = n, i;
}, Ge = (e, t) => {
  if (e.level <= 0 || !t) return e[J] ? "" : t;
  let n = e[V];
  if (n === void 0) return t;
  let { openAll: i, closeAll: c } = n;
  if (t.includes("\x1B")) for (; n !== void 0; ) t = Fe(t, n.close, n.open), n = n.parent;
  let _ = t.indexOf(`
`);
  return _ !== -1 && (t = ke(t, c, i, _)), i + t + c;
};
Object.defineProperties(X.prototype, H);
var qe = X();
X({ level: Me ? Me.level : 0 });
var W = qe, We = Object.create, Pe = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, Re = Object.getOwnPropertyNames, He = Object.getPrototypeOf, Ke = Object.prototype.hasOwnProperty, F = (e, t) => function() {
  return t || (0, e[Re(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Je = (e, t, n, i) => {
  if (t && typeof t == "object" || typeof t == "function") for (let c of Re(t)) !Ke.call(e, c) && c !== n && Pe(e, c, { get: () => t[c], enumerable: !(i = Ve(t, c)) || i.enumerable });
  return e;
}, Xe = (e, t, n) => (n = e != null ? We(He(e)) : {}, Je(Pe(n, "default", { value: e, enumerable: !0 }), e)), Ne = F({ "node_modules/pretty-format/node_modules/ansi-styles/index.js"(e, t) {
  var n = 10, i = (p = 0) => (u) => `\x1B[${38 + p};5;${u}m`, c = (p = 0) => (u, y, o) => `\x1B[${38 + p};2;${u};${y};${o}m`;
  function _() {
    let p = /* @__PURE__ */ new Map(), u = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
    u.color.gray = u.color.blackBright, u.bgColor.bgGray = u.bgColor.bgBlackBright, u.color.grey = u.color.blackBright, u.bgColor.bgGrey = u.bgColor.bgBlackBright;
    for (let [y, o] of Object.entries(u)) {
      for (let [m, s] of Object.entries(o)) u[m] = { open: `\x1B[${s[0]}m`, close: `\x1B[${s[1]}m` }, o[m] = u[m], p.set(s[0], s[1]);
      Object.defineProperty(u, y, { value: o, enumerable: !1 });
    }
    return Object.defineProperty(u, "codes", { value: p, enumerable: !1 }), u.color.close = "\x1B[39m", u.bgColor.close = "\x1B[49m", u.color.ansi256 = i(), u.color.ansi16m = c(), u.bgColor.ansi256 = i(n), u.bgColor.ansi16m = c(n), Object.defineProperties(u, { rgbToAnsi256: { value: (y, o, m) => y === o && o === m ? y < 8 ? 16 : y > 248 ? 231 : Math.round((y - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(y / 255 * 5) + 6 * Math.round(o / 255 * 5) + Math.round(m / 255 * 5), enumerable: !1 }, hexToRgb: { value: (y) => {
      let o = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(y.toString(16));
      if (!o) return [0, 0, 0];
      let { colorString: m } = o.groups;
      m.length === 3 && (m = m.split("").map((l) => l + l).join(""));
      let s = Number.parseInt(m, 16);
      return [s >> 16 & 255, s >> 8 & 255, s & 255];
    }, enumerable: !1 }, hexToAnsi256: { value: (y) => u.rgbToAnsi256(...u.hexToRgb(y)), enumerable: !1 } }), u;
  }
  Object.defineProperty(t, "exports", { enumerable: !0, get: _ });
} }), oe = F({ "node_modules/pretty-format/build/collections.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.printIteratorEntries = n, e.printIteratorValues = i, e.printListItems = c, e.printObjectProperties = _;
  var t = (p, u) => {
    let y = Object.keys(p).sort(u);
    return Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(p).forEach((o) => {
      Object.getOwnPropertyDescriptor(p, o).enumerable && y.push(o);
    }), y;
  };
  function n(p, u, y, o, m, s, l = ": ") {
    let a = "", d = 0, g = p.next();
    if (!g.done) {
      a += u.spacingOuter;
      let E = y + u.indent;
      for (; !g.done; ) {
        if (a += E, d++ === u.maxWidth) {
          a += "…";
          break;
        }
        let O = s(g.value[0], u, E, o, m), A = s(g.value[1], u, E, o, m);
        a += O + l + A, g = p.next(), g.done ? u.min || (a += ",") : a += `,${u.spacingInner}`;
      }
      a += u.spacingOuter + y;
    }
    return a;
  }
  function i(p, u, y, o, m, s) {
    let l = "", a = 0, d = p.next();
    if (!d.done) {
      l += u.spacingOuter;
      let g = y + u.indent;
      for (; !d.done; ) {
        if (l += g, a++ === u.maxWidth) {
          l += "…";
          break;
        }
        l += s(d.value, u, g, o, m), d = p.next(), d.done ? u.min || (l += ",") : l += `,${u.spacingInner}`;
      }
      l += u.spacingOuter + y;
    }
    return l;
  }
  function c(p, u, y, o, m, s) {
    let l = "";
    if (p.length) {
      l += u.spacingOuter;
      let a = y + u.indent;
      for (let d = 0; d < p.length; d++) {
        if (l += a, d === u.maxWidth) {
          l += "…";
          break;
        }
        d in p && (l += s(p[d], u, a, o, m)), d < p.length - 1 ? l += `,${u.spacingInner}` : u.min || (l += ",");
      }
      l += u.spacingOuter + y;
    }
    return l;
  }
  function _(p, u, y, o, m, s) {
    let l = "", a = t(p, u.compareKeys);
    if (a.length) {
      l += u.spacingOuter;
      let d = y + u.indent;
      for (let g = 0; g < a.length; g++) {
        let E = a[g], O = s(E, u, d, o, m), A = s(p[E], u, d, o, m);
        l += `${d + O}: ${A}`, g < a.length - 1 ? l += `,${u.spacingInner}` : u.min || (l += ",");
      }
      l += u.spacingOuter + y;
    }
    return l;
  }
} }), Ze = F({ "node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = oe(), n = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol, i = typeof n == "function" && n.for ? n.for("jest.asymmetricMatcher") : 1267621, c = " ", _ = (o, m, s, l, a, d) => {
    let g = o.toString();
    if (g === "ArrayContaining" || g === "ArrayNotContaining") return ++l > m.maxDepth ? `[${g}]` : `${g + c}[${(0, t.printListItems)(o.sample, m, s, l, a, d)}]`;
    if (g === "ObjectContaining" || g === "ObjectNotContaining") return ++l > m.maxDepth ? `[${g}]` : `${g + c}{${(0, t.printObjectProperties)(o.sample, m, s, l, a, d)}}`;
    if (g === "StringMatching" || g === "StringNotMatching" || g === "StringContaining" || g === "StringNotContaining") return g + c + d(o.sample, m, s, l, a);
    if (typeof o.toAsymmetricMatcher != "function") throw new Error(`Asymmetric matcher ${o.constructor.name} does not implement toAsymmetricMatcher()`);
    return o.toAsymmetricMatcher();
  };
  e.serialize = _;
  var p = (o) => o && o.$$typeof === i;
  e.test = p;
  var u = { serialize: _, test: p }, y = u;
  e.default = y;
} }), Qe = F({ "node_modules/ansi-regex/index.js"(e, t) {
  t.exports = ({ onlyFirst: n = !1 } = {}) => {
    let i = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
    return new RegExp(i, n ? void 0 : "g");
  };
} }), et = F({ "node_modules/pretty-format/build/plugins/ConvertAnsi.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = i(Qe()), n = i(Ne());
  function i(o) {
    return o && o.__esModule ? o : { default: o };
  }
  var c = (o) => o.replace((0, t.default)(), (m) => {
    switch (m) {
      case n.default.red.close:
      case n.default.green.close:
      case n.default.cyan.close:
      case n.default.gray.close:
      case n.default.white.close:
      case n.default.yellow.close:
      case n.default.bgRed.close:
      case n.default.bgGreen.close:
      case n.default.bgYellow.close:
      case n.default.inverse.close:
      case n.default.dim.close:
      case n.default.bold.close:
      case n.default.reset.open:
      case n.default.reset.close:
        return "</>";
      case n.default.red.open:
        return "<red>";
      case n.default.green.open:
        return "<green>";
      case n.default.cyan.open:
        return "<cyan>";
      case n.default.gray.open:
        return "<gray>";
      case n.default.white.open:
        return "<white>";
      case n.default.yellow.open:
        return "<yellow>";
      case n.default.bgRed.open:
        return "<bgRed>";
      case n.default.bgGreen.open:
        return "<bgGreen>";
      case n.default.bgYellow.open:
        return "<bgYellow>";
      case n.default.inverse.open:
        return "<inverse>";
      case n.default.dim.open:
        return "<dim>";
      case n.default.bold.open:
        return "<bold>";
      default:
        return "";
    }
  }), _ = (o) => typeof o == "string" && !!o.match((0, t.default)());
  e.test = _;
  var p = (o, m, s, l, a, d) => d(c(o), m, s, l, a);
  e.serialize = p;
  var u = { serialize: p, test: _ }, y = u;
  e.default = y;
} }), tt = F({ "node_modules/pretty-format/build/plugins/DOMCollection.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = oe(), n = " ", i = ["DOMStringMap", "NamedNodeMap"], c = /^(HTML\w*Collection|NodeList)$/, _ = (s) => i.indexOf(s) !== -1 || c.test(s), p = (s) => s && s.constructor && !!s.constructor.name && _(s.constructor.name);
  e.test = p;
  var u = (s) => s.constructor.name === "NamedNodeMap", y = (s, l, a, d, g, E) => {
    let O = s.constructor.name;
    return ++d > l.maxDepth ? `[${O}]` : (l.min ? "" : O + n) + (i.indexOf(O) !== -1 ? `{${(0, t.printObjectProperties)(u(s) ? Array.from(s).reduce((A, I) => (A[I.name] = I.value, A), {}) : { ...s }, l, a, d, g, E)}}` : `[${(0, t.printListItems)(Array.from(s), l, a, d, g, E)}]`);
  };
  e.serialize = y;
  var o = { serialize: y, test: p }, m = o;
  e.default = m;
} }), rt = F({ "node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t;
  function t(n) {
    return n.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
} }), ge = F({ "node_modules/pretty-format/build/plugins/lib/markup.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.printText = e.printProps = e.printElementAsLeaf = e.printElement = e.printComment = e.printChildren = void 0;
  var t = n(rt());
  function n(o) {
    return o && o.__esModule ? o : { default: o };
  }
  var i = (o, m, s, l, a, d, g) => {
    let E = l + s.indent, O = s.colors;
    return o.map((A) => {
      let I = m[A], j = g(I, s, E, a, d);
      return typeof I != "string" && (j.indexOf(`
`) !== -1 && (j = s.spacingOuter + E + j + s.spacingOuter + l), j = `{${j}}`), `${s.spacingInner + l + O.prop.open + A + O.prop.close}=${O.value.open}${j}${O.value.close}`;
    }).join("");
  };
  e.printProps = i;
  var c = (o, m, s, l, a, d) => o.map((g) => m.spacingOuter + s + (typeof g == "string" ? _(g, m) : d(g, m, s, l, a))).join("");
  e.printChildren = c;
  var _ = (o, m) => {
    let s = m.colors.content;
    return s.open + (0, t.default)(o) + s.close;
  };
  e.printText = _;
  var p = (o, m) => {
    let s = m.colors.comment;
    return `${s.open}<!--${(0, t.default)(o)}-->${s.close}`;
  };
  e.printComment = p;
  var u = (o, m, s, l, a) => {
    let d = l.colors.tag;
    return `${d.open}<${o}${m && d.close + m + l.spacingOuter + a + d.open}${s ? `>${d.close}${s}${l.spacingOuter}${a}${d.open}</${o}` : `${m && !l.min ? "" : " "}/`}>${d.close}`;
  };
  e.printElement = u;
  var y = (o, m) => {
    let s = m.colors.tag;
    return `${s.open}<${o}${s.close} …${s.open} />${s.close}`;
  };
  e.printElementAsLeaf = y;
} }), nt = F({ "node_modules/pretty-format/build/plugins/DOMElement.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = ge(), n = 1, i = 3, c = 8, _ = 11, p = /^((HTML|SVG)\w*)?Element$/, u = (E) => {
    try {
      return typeof E.hasAttribute == "function" && E.hasAttribute("is");
    } catch {
      return !1;
    }
  }, y = (E) => {
    let O = E.constructor.name, { nodeType: A, tagName: I } = E, j = typeof I == "string" && I.includes("-") || u(E);
    return A === n && (p.test(O) || j) || A === i && O === "Text" || A === c && O === "Comment" || A === _ && O === "DocumentFragment";
  }, o = (E) => {
    var O;
    return (E == null || (O = E.constructor) === null || O === void 0 ? void 0 : O.name) && y(E);
  };
  e.test = o;
  function m(E) {
    return E.nodeType === i;
  }
  function s(E) {
    return E.nodeType === c;
  }
  function l(E) {
    return E.nodeType === _;
  }
  var a = (E, O, A, I, j, G) => {
    if (m(E)) return (0, t.printText)(E.data, O);
    if (s(E)) return (0, t.printComment)(E.data, O);
    let B = l(E) ? "DocumentFragment" : E.tagName.toLowerCase();
    return ++I > O.maxDepth ? (0, t.printElementAsLeaf)(B, O) : (0, t.printElement)(B, (0, t.printProps)(l(E) ? [] : Array.from(E.attributes).map((Y) => Y.name).sort(), l(E) ? {} : Array.from(E.attributes).reduce((Y, h) => (Y[h.name] = h.value, Y), {}), O, A + O.indent, I, j, G), (0, t.printChildren)(Array.prototype.slice.call(E.childNodes || E.children), O, A + O.indent, I, j, G), O, A);
  };
  e.serialize = a;
  var d = { serialize: a, test: o }, g = d;
  e.default = g;
} }), lt = F({ "node_modules/pretty-format/build/plugins/Immutable.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = oe(), n = "@@__IMMUTABLE_ITERABLE__@@", i = "@@__IMMUTABLE_LIST__@@", c = "@@__IMMUTABLE_KEYED__@@", _ = "@@__IMMUTABLE_MAP__@@", p = "@@__IMMUTABLE_ORDERED__@@", u = "@@__IMMUTABLE_RECORD__@@", y = "@@__IMMUTABLE_SEQ__@@", o = "@@__IMMUTABLE_SET__@@", m = "@@__IMMUTABLE_STACK__@@", s = (h) => `Immutable.${h}`, l = (h) => `[${h}]`, a = " ", d = "…", g = (h, $, R, C, L, w, D) => ++C > $.maxDepth ? l(s(D)) : `${s(D) + a}{${(0, t.printIteratorEntries)(h.entries(), $, R, C, L, w)}}`;
  function E(h) {
    let $ = 0;
    return { next() {
      if ($ < h._keys.length) {
        let R = h._keys[$++];
        return { done: !1, value: [R, h.get(R)] };
      }
      return { done: !0, value: void 0 };
    } };
  }
  var O = (h, $, R, C, L, w) => {
    let D = s(h._name || "Record");
    return ++C > $.maxDepth ? l(D) : `${D + a}{${(0, t.printIteratorEntries)(E(h), $, R, C, L, w)}}`;
  }, A = (h, $, R, C, L, w) => {
    let D = s("Seq");
    return ++C > $.maxDepth ? l(D) : h[c] ? `${D + a}{${h._iter || h._object ? (0, t.printIteratorEntries)(h.entries(), $, R, C, L, w) : d}}` : `${D + a}[${h._iter || h._array || h._collection || h._iterable ? (0, t.printIteratorValues)(h.values(), $, R, C, L, w) : d}]`;
  }, I = (h, $, R, C, L, w, D) => ++C > $.maxDepth ? l(s(D)) : `${s(D) + a}[${(0, t.printIteratorValues)(h.values(), $, R, C, L, w)}]`, j = (h, $, R, C, L, w) => h[_] ? g(h, $, R, C, L, w, h[p] ? "OrderedMap" : "Map") : h[i] ? I(h, $, R, C, L, w, "List") : h[o] ? I(h, $, R, C, L, w, h[p] ? "OrderedSet" : "Set") : h[m] ? I(h, $, R, C, L, w, "Stack") : h[y] ? A(h, $, R, C, L, w) : O(h, $, R, C, L, w);
  e.serialize = j;
  var G = (h) => h && (h[n] === !0 || h[u] === !0);
  e.test = G;
  var B = { serialize: j, test: G }, Y = B;
  e.default = Y;
} }), at = F({ "node_modules/react-is/cjs/react-is.development.js"(e) {
  (function() {
    var t = Symbol.for("react.element"), n = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), u = Symbol.for("react.context"), y = Symbol.for("react.server_context"), o = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), a = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), g = !1, E = !1, O = !1, A = !1, I = !1, j;
    j = Symbol.for("react.module.reference");
    function G(f) {
      return !!(typeof f == "string" || typeof f == "function" || f === i || f === _ || I || f === c || f === m || f === s || A || f === d || g || E || O || typeof f == "object" && f !== null && (f.$$typeof === a || f.$$typeof === l || f.$$typeof === p || f.$$typeof === u || f.$$typeof === o || f.$$typeof === j || f.getModuleId !== void 0));
    }
    function B(f) {
      if (typeof f == "object" && f !== null) {
        var N = f.$$typeof;
        switch (N) {
          case t:
            var v = f.type;
            switch (v) {
              case i:
              case _:
              case c:
              case m:
              case s:
                return v;
              default:
                var U = v && v.$$typeof;
                switch (U) {
                  case y:
                  case u:
                  case o:
                  case a:
                  case l:
                  case p:
                    return U;
                  default:
                    return N;
                }
            }
          case n:
            return N;
        }
      }
    }
    var Y = u, h = p, $ = t, R = o, C = i, L = a, w = l, D = n, z = _, K = c, Z = m, k = s, Q = !1, ee = !1;
    function ue(f) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function te(f) {
      return ee || (ee = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function re(f) {
      return B(f) === u;
    }
    function ne(f) {
      return B(f) === p;
    }
    function le(f) {
      return typeof f == "object" && f !== null && f.$$typeof === t;
    }
    function se(f) {
      return B(f) === o;
    }
    function ae(f) {
      return B(f) === i;
    }
    function ce(f) {
      return B(f) === a;
    }
    function me(f) {
      return B(f) === l;
    }
    function r(f) {
      return B(f) === n;
    }
    function b(f) {
      return B(f) === _;
    }
    function T(f) {
      return B(f) === c;
    }
    function M(f) {
      return B(f) === m;
    }
    function S(f) {
      return B(f) === s;
    }
    e.ContextConsumer = Y, e.ContextProvider = h, e.Element = $, e.ForwardRef = R, e.Fragment = C, e.Lazy = L, e.Memo = w, e.Portal = D, e.Profiler = z, e.StrictMode = K, e.Suspense = Z, e.SuspenseList = k, e.isAsyncMode = ue, e.isConcurrentMode = te, e.isContextConsumer = re, e.isContextProvider = ne, e.isElement = le, e.isForwardRef = se, e.isFragment = ae, e.isLazy = ce, e.isMemo = me, e.isPortal = r, e.isProfiler = b, e.isStrictMode = T, e.isSuspense = M, e.isSuspenseList = S, e.isValidElementType = G, e.typeOf = B;
  })();
} }), it = F({ "node_modules/react-is/index.js"(e, t) {
  t.exports = at();
} }), ot = F({ "node_modules/pretty-format/build/plugins/ReactElement.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = c(it()), n = ge();
  function i(l) {
    if (typeof WeakMap != "function") return null;
    var a = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap();
    return (i = function(g) {
      return g ? d : a;
    })(l);
  }
  function c(l, a) {
    if (l && l.__esModule) return l;
    if (l === null || typeof l != "object" && typeof l != "function") return { default: l };
    var d = i(a);
    if (d && d.has(l)) return d.get(l);
    var g = {}, E = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var O in l) if (O !== "default" && Object.prototype.hasOwnProperty.call(l, O)) {
      var A = E ? Object.getOwnPropertyDescriptor(l, O) : null;
      A && (A.get || A.set) ? Object.defineProperty(g, O, A) : g[O] = l[O];
    }
    return g.default = l, d && d.set(l, g), g;
  }
  var _ = (l, a = []) => (Array.isArray(l) ? l.forEach((d) => {
    _(d, a);
  }) : l != null && l !== !1 && a.push(l), a), p = (l) => {
    let a = l.type;
    if (typeof a == "string") return a;
    if (typeof a == "function") return a.displayName || a.name || "Unknown";
    if (t.isFragment(l)) return "React.Fragment";
    if (t.isSuspense(l)) return "React.Suspense";
    if (typeof a == "object" && a !== null) {
      if (t.isContextProvider(l)) return "Context.Provider";
      if (t.isContextConsumer(l)) return "Context.Consumer";
      if (t.isForwardRef(l)) {
        if (a.displayName) return a.displayName;
        let d = a.render.displayName || a.render.name || "";
        return d !== "" ? `ForwardRef(${d})` : "ForwardRef";
      }
      if (t.isMemo(l)) {
        let d = a.displayName || a.type.displayName || a.type.name || "";
        return d !== "" ? `Memo(${d})` : "Memo";
      }
    }
    return "UNDEFINED";
  }, u = (l) => {
    let { props: a } = l;
    return Object.keys(a).filter((d) => d !== "children" && a[d] !== void 0).sort();
  }, y = (l, a, d, g, E, O) => ++g > a.maxDepth ? (0, n.printElementAsLeaf)(p(l), a) : (0, n.printElement)(p(l), (0, n.printProps)(u(l), l.props, a, d + a.indent, g, E, O), (0, n.printChildren)(_(l.props.children), a, d + a.indent, g, E, O), a, d);
  e.serialize = y;
  var o = (l) => l != null && t.isElement(l);
  e.test = o;
  var m = { serialize: y, test: o }, s = m;
  e.default = s;
} }), ut = F({ "node_modules/pretty-format/build/plugins/ReactTestComponent.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.test = e.serialize = e.default = void 0;
  var t = ge(), n = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol, i = typeof n == "function" && n.for ? n.for("react.test.json") : 245830487, c = (o) => {
    let { props: m } = o;
    return m ? Object.keys(m).filter((s) => m[s] !== void 0).sort() : [];
  }, _ = (o, m, s, l, a, d) => ++l > m.maxDepth ? (0, t.printElementAsLeaf)(o.type, m) : (0, t.printElement)(o.type, o.props ? (0, t.printProps)(c(o), o.props, m, s + m.indent, l, a, d) : "", o.children ? (0, t.printChildren)(o.children, m, s + m.indent, l, a, d) : "", m, s);
  e.serialize = _;
  var p = (o) => o && o.$$typeof === i;
  e.test = p;
  var u = { serialize: _, test: p }, y = u;
  e.default = y;
} }), st = F({ "node_modules/pretty-format/build/index.js"(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.DEFAULT_OPTIONS = void 0, e.format = ae, e.plugins = void 0;
  var t = m(Ne()), n = oe(), i = m(Ze()), c = m(et()), _ = m(tt()), p = m(nt()), u = m(lt()), y = m(ot()), o = m(ut());
  function m(r) {
    return r && r.__esModule ? r : { default: r };
  }
  var s = Object.prototype.toString, l = Date.prototype.toISOString, a = Error.prototype.toString, d = RegExp.prototype.toString, g = (r) => typeof r.constructor == "function" && r.constructor.name || "Object", E = (r) => typeof window < "u" && r === window, O = /^Symbol\((.*)\)(.*)$/, A = /\n/gi, I = class extends Error {
    constructor(r, b) {
      super(r), this.stack = b, this.name = this.constructor.name;
    }
  };
  function j(r) {
    return r === "[object Array]" || r === "[object ArrayBuffer]" || r === "[object DataView]" || r === "[object Float32Array]" || r === "[object Float64Array]" || r === "[object Int8Array]" || r === "[object Int16Array]" || r === "[object Int32Array]" || r === "[object Uint8Array]" || r === "[object Uint8ClampedArray]" || r === "[object Uint16Array]" || r === "[object Uint32Array]";
  }
  function G(r) {
    return Object.is(r, -0) ? "-0" : String(r);
  }
  function B(r) {
    return `${r}n`;
  }
  function Y(r, b) {
    return b ? `[Function ${r.name || "anonymous"}]` : "[Function]";
  }
  function h(r) {
    return String(r).replace(O, "Symbol($1)");
  }
  function $(r) {
    return `[${a.call(r)}]`;
  }
  function R(r, b, T, M) {
    if (r === !0 || r === !1) return `${r}`;
    if (r === void 0) return "undefined";
    if (r === null) return "null";
    let S = typeof r;
    if (S === "number") return G(r);
    if (S === "bigint") return B(r);
    if (S === "string") return M ? `"${r.replace(/"|\\/g, "\\$&")}"` : `"${r}"`;
    if (S === "function") return Y(r, b);
    if (S === "symbol") return h(r);
    let f = s.call(r);
    return f === "[object WeakMap]" ? "WeakMap {}" : f === "[object WeakSet]" ? "WeakSet {}" : f === "[object Function]" || f === "[object GeneratorFunction]" ? Y(r, b) : f === "[object Symbol]" ? h(r) : f === "[object Date]" ? isNaN(+r) ? "Date { NaN }" : l.call(r) : f === "[object Error]" ? $(r) : f === "[object RegExp]" ? T ? d.call(r).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&") : d.call(r) : r instanceof Error ? $(r) : null;
  }
  function C(r, b, T, M, S, f) {
    if (S.indexOf(r) !== -1) return "[Circular]";
    S = S.slice(), S.push(r);
    let N = ++M > b.maxDepth, v = b.min;
    if (b.callToJSON && !N && r.toJSON && typeof r.toJSON == "function" && !f) return z(r.toJSON(), b, T, M, S, !0);
    let U = s.call(r);
    return U === "[object Arguments]" ? N ? "[Arguments]" : `${v ? "" : "Arguments "}[${(0, n.printListItems)(r, b, T, M, S, z)}]` : j(U) ? N ? `[${r.constructor.name}]` : `${v || !b.printBasicPrototype && r.constructor.name === "Array" ? "" : `${r.constructor.name} `}[${(0, n.printListItems)(r, b, T, M, S, z)}]` : U === "[object Map]" ? N ? "[Map]" : `Map {${(0, n.printIteratorEntries)(r.entries(), b, T, M, S, z, " => ")}}` : U === "[object Set]" ? N ? "[Set]" : `Set {${(0, n.printIteratorValues)(r.values(), b, T, M, S, z)}}` : N || E(r) ? `[${g(r)}]` : `${v || !b.printBasicPrototype && g(r) === "Object" ? "" : `${g(r)} `}{${(0, n.printObjectProperties)(r, b, T, M, S, z)}}`;
  }
  function L(r) {
    return r.serialize != null;
  }
  function w(r, b, T, M, S, f) {
    let N;
    try {
      N = L(r) ? r.serialize(b, T, M, S, f, z) : r.print(b, (v) => z(v, T, M, S, f), (v) => {
        let U = M + T.indent;
        return U + v.replace(A, `
${U}`);
      }, { edgeSpacing: T.spacingOuter, min: T.min, spacing: T.spacingInner }, T.colors);
    } catch (v) {
      throw new I(v.message, v.stack);
    }
    if (typeof N != "string") throw new Error(`pretty-format: Plugin must return type "string" but instead returned "${typeof N}".`);
    return N;
  }
  function D(r, b) {
    for (let T = 0; T < r.length; T++) try {
      if (r[T].test(b)) return r[T];
    } catch (M) {
      throw new I(M.message, M.stack);
    }
    return null;
  }
  function z(r, b, T, M, S, f) {
    let N = D(b.plugins, r);
    if (N !== null) return w(N, r, b, T, M, S);
    let v = R(r, b.printFunctionName, b.escapeRegex, b.escapeString);
    return v !== null ? v : C(r, b, T, M, S, f);
  }
  var K = { comment: "gray", content: "reset", prop: "yellow", tag: "cyan", value: "green" }, Z = Object.keys(K), k = { callToJSON: !0, compareKeys: void 0, escapeRegex: !1, escapeString: !0, highlight: !1, indent: 2, maxDepth: 1 / 0, maxWidth: 1 / 0, min: !1, plugins: [], printBasicPrototype: !0, printFunctionName: !0, theme: K };
  e.DEFAULT_OPTIONS = k;
  function Q(r) {
    if (Object.keys(r).forEach((b) => {
      if (!Object.prototype.hasOwnProperty.call(k, b)) throw new Error(`pretty-format: Unknown option "${b}".`);
    }), r.min && r.indent !== void 0 && r.indent !== 0) throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
    if (r.theme !== void 0) {
      if (r.theme === null) throw new Error('pretty-format: Option "theme" must not be null.');
      if (typeof r.theme != "object") throw new Error(`pretty-format: Option "theme" must be of type "object" but instead received "${typeof r.theme}".`);
    }
  }
  var ee = (r) => Z.reduce((b, T) => {
    let M = r.theme && r.theme[T] !== void 0 ? r.theme[T] : K[T], S = M && t.default[M];
    if (S && typeof S.close == "string" && typeof S.open == "string") b[T] = S;
    else throw new Error(`pretty-format: Option "theme" has a key "${T}" whose value "${M}" is undefined in ansi-styles.`);
    return b;
  }, /* @__PURE__ */ Object.create(null)), ue = () => Z.reduce((r, b) => (r[b] = { close: "", open: "" }, r), /* @__PURE__ */ Object.create(null)), te = (r) => {
    var b;
    return (b = r?.printFunctionName) !== null && b !== void 0 ? b : k.printFunctionName;
  }, re = (r) => {
    var b;
    return (b = r?.escapeRegex) !== null && b !== void 0 ? b : k.escapeRegex;
  }, ne = (r) => {
    var b;
    return (b = r?.escapeString) !== null && b !== void 0 ? b : k.escapeString;
  }, le = (r) => {
    var b, T, M, S, f, N, v;
    return { callToJSON: (b = r?.callToJSON) !== null && b !== void 0 ? b : k.callToJSON, colors: r != null && r.highlight ? ee(r) : ue(), compareKeys: typeof r?.compareKeys == "function" ? r.compareKeys : k.compareKeys, escapeRegex: re(r), escapeString: ne(r), indent: r != null && r.min ? "" : se((T = r?.indent) !== null && T !== void 0 ? T : k.indent), maxDepth: (M = r?.maxDepth) !== null && M !== void 0 ? M : k.maxDepth, maxWidth: (S = r?.maxWidth) !== null && S !== void 0 ? S : k.maxWidth, min: (f = r?.min) !== null && f !== void 0 ? f : k.min, plugins: (N = r?.plugins) !== null && N !== void 0 ? N : k.plugins, printBasicPrototype: (v = r?.printBasicPrototype) !== null && v !== void 0 ? v : !0, printFunctionName: te(r), spacingInner: r != null && r.min ? " " : `
`, spacingOuter: r != null && r.min ? "" : `
` };
  };
  function se(r) {
    return new Array(r + 1).join(" ");
  }
  function ae(r, b) {
    if (b && (Q(b), b.plugins)) {
      let M = D(b.plugins, r);
      if (M !== null) return w(M, r, le(b), "", 0, []);
    }
    let T = R(r, te(b), re(b), ne(b));
    return T !== null ? T : C(r, le(b), "", 0, []);
  }
  var ce = { AsymmetricMatcher: i.default, ConvertAnsi: c.default, DOMCollection: _.default, DOMElement: p.default, Immutable: u.default, ReactElement: y.default, ReactTestComponent: o.default };
  e.plugins = ce;
  var me = ae;
  e.default = me;
} }), be = Xe(st()), { AsymmetricMatcher: ct, DOMCollection: mt, DOMElement: dt, Immutable: ft, ReactElement: pt, ReactTestComponent: bt } = be.plugins, $e = [bt, pt, dt, mt, ft, ct], q = W.dim, Ce = W.green, ve = W.red, yt = "·";
function ye(e, t = 10, n = 10) {
  let i = 1e4, c;
  try {
    c = (0, be.format)(e, { maxDepth: t, maxWidth: n, min: !0, plugins: $e });
  } catch {
    c = (0, be.format)(e, { callToJSON: !1, maxDepth: t, maxWidth: n, min: !0, plugins: $e });
  }
  return c.length >= i && t > 1 ? ye(e, Math.floor(t / 2), n) : c.length >= i && n > 1 ? ye(e, t, Math.floor(n / 2)) : c;
}
function gt(e) {
  return e.replace(/\s+$/gm, (t) => yt.repeat(t.length));
}
function _t(e) {
  return ve(gt(ye(e)));
}
function Et(e, t = "received", n = "expected", i = {}) {
  let { comment: c = "", expectedColor: _ = Ce, isDirectExpectCall: p = !1, isNot: u = !1, promise: y = "", receivedColor: o = ve, secondArgument: m = "", secondArgumentColor: s = Ce } = i, l = "", a = "expect";
  return !p && t !== "" && (l += q(`${a}(`) + o(t), a = ")"), y !== "" && (l += q(`${a}.`) + y, a = ""), u && (l += `${q(`${a}.`)}not`, a = ""), e.includes(".") ? a += e : (l += q(`${a}.`) + e, a = ""), n === "" ? a += "()" : (l += q(`${a}(`) + _(n), m && (l += q(", ") + s(m)), a = ")"), c !== "" && (a += ` // ${c}`), a !== "" && (l += q(a)), l;
}
function Ot(e) {
  if (typeof e.violations > "u") throw new Error("No violations found in aXe results object");
  let t = ht(e.violations, e.toolOptions ? e.toolOptions.impactLevels : []);
  function n(p) {
    if (p.length === 0) return [];
    let u = `

`;
    return p.map((y) => y.nodes.map((o) => `Expected the HTML found at $('${o.target.join(", ")}') to have no violations:` + u + W.grey(o.html) + u + "Received:" + u + _t(`${y.help} (${y.id})`) + u + W.yellow(o.failureSummary) + u + (y.helpUrl ? `You can find more information on this issue here: 
${W.blue(y.helpUrl)}` : "")).join(u)).join(u + "────────" + u);
  }
  let i = n(t), c = i.length === 0;
  function _() {
    if (!c) return Et(".toHaveNoViolations") + `

${i}`;
  }
  return { actual: t, message: _, pass: c };
}
function ht(e, t) {
  return t && t.length > 0 ? e.filter((n) => t.includes(n.impact)) : e;
}
export {
  Ot as toHaveNoViolations
};
