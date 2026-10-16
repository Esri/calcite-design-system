/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
var Pe = {}, ge = (e = 0) => (t) => `\x1B[${t + e}m`, Ee = (e = 0) => (t) => `\x1B[${38 + e};5;${t}m`, he = (e = 0) => (t, r, o) => `\x1B[${38 + e};2;${t};${r};${o}m`, P = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
Object.keys(P.modifier);
var Ie = Object.keys(P.color), je = Object.keys(P.bgColor);
[...Ie, ...je];
function Be() {
  let e = /* @__PURE__ */ new Map();
  for (let [t, r] of Object.entries(P)) {
    for (let [o, m] of Object.entries(r))
      P[o] = {
        open: `\x1B[${m[0]}m`,
        close: `\x1B[${m[1]}m`
      }, r[o] = P[o], e.set(m[0], m[1]);
    Object.defineProperty(P, t, {
      value: r,
      enumerable: !1
    });
  }
  return Object.defineProperty(P, "codes", {
    value: e,
    enumerable: !1
  }), P.color.close = "\x1B[39m", P.bgColor.close = "\x1B[49m", P.color.ansi = ge(), P.color.ansi256 = Ee(), P.color.ansi16m = he(), P.bgColor.ansi = ge(10), P.bgColor.ansi256 = Ee(10), P.bgColor.ansi16m = he(10), Object.defineProperties(P, {
    rgbToAnsi256: {
      value(t, r, o) {
        return t === r && r === o ? t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(r / 255 * 5) + Math.round(o / 255 * 5);
      },
      enumerable: !1
    },
    hexToRgb: {
      value(t) {
        let r = /[a-f\d]{6}|[a-f\d]{3}/i.exec(t.toString(16));
        if (!r)
          return [0, 0, 0];
        let [o] = r;
        o.length === 3 && (o = [...o].map((h) => h + h).join(""));
        let m = Number.parseInt(o, 16);
        return [
          /* eslint-disable no-bitwise */
          m >> 16 & 255,
          m >> 8 & 255,
          m & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: !1
    },
    hexToAnsi256: {
      value: (t) => P.rgbToAnsi256(...P.hexToRgb(t)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value(t) {
        if (t < 8)
          return 30 + t;
        if (t < 16)
          return 90 + (t - 8);
        let r, o, m;
        if (t >= 232)
          r = ((t - 232) * 10 + 8) / 255, o = r, m = r;
        else {
          t -= 16;
          let u = t % 36;
          r = Math.floor(t / 36) / 5, o = Math.floor(u / 6) / 5, m = u % 6 / 5;
        }
        let h = Math.max(r, o, m) * 2;
        if (h === 0)
          return 30;
        let p = 30 + (Math.round(m) << 2 | Math.round(o) << 1 | Math.round(r));
        return h === 2 && (p += 60), p;
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (t, r, o) => P.ansi256ToAnsi(P.rgbToAnsi256(t, r, o)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (t) => P.ansi256ToAnsi(P.hexToAnsi256(t)),
      enumerable: !1
    }
  }), P;
}
var Le = Be(), q = Le, Oe = (() => {
  if (!("navigator" in globalThis))
    return 0;
  if (globalThis.navigator.userAgentData) {
    let e = navigator.userAgentData.brands.find(({ brand: t }) => t === "Chromium");
    if (e && e.version > 93)
      return 3;
  }
  return /\b(Chrome|Chromium)\//.test(globalThis.navigator.userAgent) ? 1 : 0;
})(), Se = Oe !== 0 && {
  level: Oe
}, De = {
  stdout: Se,
  stderr: Se
}, Fe = De;
function ke(e, t, r) {
  let o = e.indexOf(t);
  if (o === -1)
    return e;
  let m = t.length, h = 0, p = "";
  do
    p += e.slice(h, o) + t + r, h = o + m, o = e.indexOf(t, h);
  while (o !== -1);
  return p += e.slice(h), p;
}
function ze(e, t, r, o) {
  let m = 0, h = "";
  do {
    let p = e[o - 1] === "\r";
    h += e.slice(m, p ? o - 1 : o) + t + (p ? `\r
` : `
`) + r, m = o + 1, o = e.indexOf(`
`, m);
  } while (o !== -1);
  return h += e.slice(m), h;
}
var { stdout: Te, stderr: $e } = Fe, fe = /* @__PURE__ */ Symbol("GENERATOR"), H = /* @__PURE__ */ Symbol("STYLER"), X = /* @__PURE__ */ Symbol("IS_EMPTY"), Me = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], K = /* @__PURE__ */ Object.create(null), Ye = (e, t = {}) => {
  if (t.level && !(Number.isInteger(t.level) && t.level >= 0 && t.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  let r = Te ? Te.level : 0;
  e.level = t.level === void 0 ? r : t.level;
}, Ue = (e) => {
  let t = (...r) => r.join(" ");
  return Ye(t, e), Object.setPrototypeOf(t, Z.prototype), t;
};
function Z(e) {
  return Ue(e);
}
Object.setPrototypeOf(Z.prototype, Function.prototype);
for (let [e, t] of Object.entries(q))
  K[e] = {
    get() {
      let r = oe(this, pe(t.open, t.close, this[H]), this[X]);
      return Object.defineProperty(this, e, { value: r }), r;
    }
  };
K.visible = {
  get() {
    let e = oe(this, this[H], !0);
    return Object.defineProperty(this, "visible", { value: e }), e;
  }
};
var de = (e, t, r, ...o) => e === "rgb" ? t === "ansi16m" ? q[r].ansi16m(...o) : t === "ansi256" ? q[r].ansi256(q.rgbToAnsi256(...o)) : q[r].ansi(q.rgbToAnsi(...o)) : e === "hex" ? de("rgb", t, r, ...q.hexToRgb(...o)) : q[r][e](...o), qe = ["rgb", "hex", "ansi256"];
for (let e of qe) {
  K[e] = {
    get() {
      let { level: r } = this;
      return function(...o) {
        let m = pe(de(e, Me[r], "color", ...o), q.color.close, this[H]);
        return oe(this, m, this[X]);
      };
    }
  };
  let t = "bg" + e[0].toUpperCase() + e.slice(1);
  K[t] = {
    get() {
      let { level: r } = this;
      return function(...o) {
        let m = pe(de(e, Me[r], "bgColor", ...o), q.bgColor.close, this[H]);
        return oe(this, m, this[X]);
      };
    }
  };
}
var Ve = Object.defineProperties(() => {
}, {
  ...K,
  level: {
    enumerable: !0,
    get() {
      return this[fe].level;
    },
    set(e) {
      this[fe].level = e;
    }
  }
}), pe = (e, t, r) => {
  let o, m;
  return r === void 0 ? (o = e, m = t) : (o = r.openAll + e, m = t + r.closeAll), {
    open: e,
    close: t,
    openAll: o,
    closeAll: m,
    parent: r
  };
}, oe = (e, t, r) => {
  let o = (...m) => Ge(o, m.length === 1 ? "" + m[0] : m.join(" "));
  return Object.setPrototypeOf(o, Ve), o[fe] = e, o[H] = t, o[X] = r, o;
}, Ge = (e, t) => {
  if (e.level <= 0 || !t)
    return e[X] ? "" : t;
  let r = e[H];
  if (r === void 0)
    return t;
  let { openAll: o, closeAll: m } = r;
  if (t.includes("\x1B"))
    for (; r !== void 0; )
      t = ke(t, r.close, r.open), r = r.parent;
  let h = t.indexOf(`
`);
  return h !== -1 && (t = ze(t, m, o, h)), o + t + m;
};
Object.defineProperties(Z.prototype, K);
var We = Z();
Z({ level: $e ? $e.level : 0 });
var W = We, He = Object.create, Re = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, ve = Object.getOwnPropertyNames, Je = Object.getPrototypeOf, Xe = Object.prototype.hasOwnProperty, F = (e, t) => function() {
  return t || (0, e[ve(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Ze = (e, t, r, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let m of ve(t))
      !Xe.call(e, m) && m !== r && Re(e, m, { get: () => t[m], enumerable: !(o = Ke(t, m)) || o.enumerable });
  return e;
}, xe = (e, t, r) => (r = e != null ? He(Je(e)) : {}, Ze(Re(r, "default", { value: e, enumerable: !0 }), e)), Ne = F({
  "node_modules/pretty-format/node_modules/ansi-styles/index.js"(e, t) {
    var r = 10, o = (p = 0) => (u) => `\x1B[${38 + p};5;${u}m`, m = (p = 0) => (u, E, a) => `\x1B[${38 + p};2;${u};${E};${a}m`;
    function h() {
      let p = /* @__PURE__ */ new Map(), u = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      u.color.gray = u.color.blackBright, u.bgColor.bgGray = u.bgColor.bgBlackBright, u.color.grey = u.color.blackBright, u.bgColor.bgGrey = u.bgColor.bgBlackBright;
      for (let [E, a] of Object.entries(u)) {
        for (let [f, c] of Object.entries(a))
          u[f] = {
            open: `\x1B[${c[0]}m`,
            close: `\x1B[${c[1]}m`
          }, a[f] = u[f], p.set(c[0], c[1]);
        Object.defineProperty(u, E, {
          value: a,
          enumerable: !1
        });
      }
      return Object.defineProperty(u, "codes", {
        value: p,
        enumerable: !1
      }), u.color.close = "\x1B[39m", u.bgColor.close = "\x1B[49m", u.color.ansi256 = o(), u.color.ansi16m = m(), u.bgColor.ansi256 = o(r), u.bgColor.ansi16m = m(r), Object.defineProperties(u, {
        rgbToAnsi256: {
          value: (E, a, f) => E === a && a === f ? E < 8 ? 16 : E > 248 ? 231 : Math.round((E - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(E / 255 * 5) + 6 * Math.round(a / 255 * 5) + Math.round(f / 255 * 5),
          enumerable: !1
        },
        hexToRgb: {
          value: (E) => {
            let a = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(E.toString(16));
            if (!a)
              return [0, 0, 0];
            let { colorString: f } = a.groups;
            f.length === 3 && (f = f.split("").map((l) => l + l).join(""));
            let c = Number.parseInt(f, 16);
            return [
              c >> 16 & 255,
              c >> 8 & 255,
              c & 255
            ];
          },
          enumerable: !1
        },
        hexToAnsi256: {
          value: (E) => u.rgbToAnsi256(...u.hexToRgb(E)),
          enumerable: !1
        }
      }), u;
    }
    Object.defineProperty(t, "exports", {
      enumerable: !0,
      get: h
    });
  }
}), ae = F({
  "node_modules/pretty-format/build/collections.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.printIteratorEntries = r, e.printIteratorValues = o, e.printListItems = m, e.printObjectProperties = h;
    var t = (p, u) => {
      let E = Object.keys(p).sort(u);
      return Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(p).forEach((a) => {
        Object.getOwnPropertyDescriptor(p, a).enumerable && E.push(a);
      }), E;
    };
    function r(p, u, E, a, f, c, l = ": ") {
      let i = "", d = 0, g = p.next();
      if (!g.done) {
        i += u.spacingOuter;
        let b = E + u.indent;
        for (; !g.done; ) {
          if (i += b, d++ === u.maxWidth) {
            i += "…";
            break;
          }
          let s = c(g.value[0], u, b, a, f), T = c(g.value[1], u, b, a, f);
          i += s + l + T, g = p.next(), g.done ? u.min || (i += ",") : i += `,${u.spacingInner}`;
        }
        i += u.spacingOuter + E;
      }
      return i;
    }
    function o(p, u, E, a, f, c) {
      let l = "", i = 0, d = p.next();
      if (!d.done) {
        l += u.spacingOuter;
        let g = E + u.indent;
        for (; !d.done; ) {
          if (l += g, i++ === u.maxWidth) {
            l += "…";
            break;
          }
          l += c(d.value, u, g, a, f), d = p.next(), d.done ? u.min || (l += ",") : l += `,${u.spacingInner}`;
        }
        l += u.spacingOuter + E;
      }
      return l;
    }
    function m(p, u, E, a, f, c) {
      let l = "";
      if (p.length) {
        l += u.spacingOuter;
        let i = E + u.indent;
        for (let d = 0; d < p.length; d++) {
          if (l += i, d === u.maxWidth) {
            l += "…";
            break;
          }
          d in p && (l += c(p[d], u, i, a, f)), d < p.length - 1 ? l += `,${u.spacingInner}` : u.min || (l += ",");
        }
        l += u.spacingOuter + E;
      }
      return l;
    }
    function h(p, u, E, a, f, c) {
      let l = "", i = t(p, u.compareKeys);
      if (i.length) {
        l += u.spacingOuter;
        let d = E + u.indent;
        for (let g = 0; g < i.length; g++) {
          let b = i[g], s = c(b, u, d, a, f), T = c(p[b], u, d, a, f);
          l += `${d + s}: ${T}`, g < i.length - 1 ? l += `,${u.spacingInner}` : u.min || (l += ",");
        }
        l += u.spacingOuter + E;
      }
      return l;
    }
  }
}), Qe = F({
  "node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.test = e.serialize = e.default = void 0;
    var t = ae(), r = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol, o = typeof r == "function" && r.for ? r.for("jest.asymmetricMatcher") : 1267621, m = " ", h = (a, f, c, l, i, d) => {
      let g = a.toString();
      if (g === "ArrayContaining" || g === "ArrayNotContaining")
        return ++l > f.maxDepth ? `[${g}]` : `${g + m}[${(0, t.printListItems)(a.sample, f, c, l, i, d)}]`;
      if (g === "ObjectContaining" || g === "ObjectNotContaining")
        return ++l > f.maxDepth ? `[${g}]` : `${g + m}{${(0, t.printObjectProperties)(a.sample, f, c, l, i, d)}}`;
      if (g === "StringMatching" || g === "StringNotMatching" || g === "StringContaining" || g === "StringNotContaining")
        return g + m + d(a.sample, f, c, l, i);
      if (typeof a.toAsymmetricMatcher != "function")
        throw new Error(`Asymmetric matcher ${a.constructor.name} does not implement toAsymmetricMatcher()`);
      return a.toAsymmetricMatcher();
    };
    e.serialize = h;
    var p = (a) => a && a.$$typeof === o;
    e.test = p;
    var u = {
      serialize: h,
      test: p
    }, E = u;
    e.default = E;
  }
}), et = F({
  "node_modules/ansi-regex/index.js"(e, t) {
    t.exports = ({ onlyFirst: r = !1 } = {}) => {
      let o = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
      ].join("|");
      return new RegExp(o, r ? void 0 : "g");
    };
  }
}), tt = F({
  "node_modules/pretty-format/build/plugins/ConvertAnsi.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.test = e.serialize = e.default = void 0;
    var t = o(et()), r = o(Ne());
    function o(a) {
      return a && a.__esModule ? a : { default: a };
    }
    var m = (a) => a.replace((0, t.default)(), (f) => {
      switch (f) {
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
    }), h = (a) => typeof a == "string" && !!a.match((0, t.default)());
    e.test = h;
    var p = (a, f, c, l, i, d) => d(m(a), f, c, l, i);
    e.serialize = p;
    var u = {
      serialize: p,
      test: h
    }, E = u;
    e.default = E;
  }
}), rt = F({
  "node_modules/pretty-format/build/plugins/DOMCollection.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.test = e.serialize = e.default = void 0;
    var t = ae(), r = " ", o = ["DOMStringMap", "NamedNodeMap"], m = /^(HTML\w*Collection|NodeList)$/, h = (c) => o.indexOf(c) !== -1 || m.test(c), p = (c) => c && c.constructor && !!c.constructor.name && h(c.constructor.name);
    e.test = p;
    var u = (c) => c.constructor.name === "NamedNodeMap", E = (c, l, i, d, g, b) => {
      let s = c.constructor.name;
      return ++d > l.maxDepth ? `[${s}]` : (l.min ? "" : s + r) + (o.indexOf(s) !== -1 ? `{${(0, t.printObjectProperties)(u(c) ? Array.from(c).reduce((T, w) => (T[w.name] = w.value, T), {}) : { ...c }, l, i, d, g, b)}}` : `[${(0, t.printListItems)(Array.from(c), l, i, d, g, b)}]`);
    };
    e.serialize = E;
    var a = {
      serialize: E,
      test: p
    }, f = a;
    e.default = f;
  }
}), nt = F({
  "node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = t;
    function t(r) {
      return r.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }
}), _e = F({
  "node_modules/pretty-format/build/plugins/lib/markup.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.printText = e.printProps = e.printElementAsLeaf = e.printElement = e.printComment = e.printChildren = void 0;
    var t = r(nt());
    function r(a) {
      return a && a.__esModule ? a : { default: a };
    }
    var o = (a, f, c, l, i, d, g) => {
      let b = l + c.indent, s = c.colors;
      return a.map((T) => {
        let w = f[T], j = g(w, c, b, i, d);
        return typeof w != "string" && (j.indexOf(`
`) !== -1 && (j = c.spacingOuter + b + j + c.spacingOuter + l), j = `{${j}}`), `${c.spacingInner + l + s.prop.open + T + s.prop.close}=${s.value.open}${j}${s.value.close}`;
      }).join("");
    };
    e.printProps = o;
    var m = (a, f, c, l, i, d) => a.map((g) => f.spacingOuter + c + (typeof g == "string" ? h(g, f) : d(g, f, c, l, i))).join("");
    e.printChildren = m;
    var h = (a, f) => {
      let c = f.colors.content;
      return c.open + (0, t.default)(a) + c.close;
    };
    e.printText = h;
    var p = (a, f) => {
      let c = f.colors.comment;
      return `${c.open}<!--${(0, t.default)(a)}-->${c.close}`;
    };
    e.printComment = p;
    var u = (a, f, c, l, i) => {
      let d = l.colors.tag;
      return `${d.open}<${a}${f && d.close + f + l.spacingOuter + i + d.open}${c ? `>${d.close}${c}${l.spacingOuter}${i}${d.open}</${a}` : `${f && !l.min ? "" : " "}/`}>${d.close}`;
    };
    e.printElement = u;
    var E = (a, f) => {
      let c = f.colors.tag;
      return `${c.open}<${a}${c.close} …${c.open} />${c.close}`;
    };
    e.printElementAsLeaf = E;
  }
}), lt = F({
  "node_modules/pretty-format/build/plugins/DOMElement.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.test = e.serialize = e.default = void 0;
    var t = _e(), r = 1, o = 3, m = 8, h = 11, p = /^((HTML|SVG)\w*)?Element$/, u = (b) => {
      try {
        return typeof b.hasAttribute == "function" && b.hasAttribute("is");
      } catch {
        return !1;
      }
    }, E = (b) => {
      let s = b.constructor.name, { nodeType: T, tagName: w } = b, j = typeof w == "string" && w.includes("-") || u(b);
      return T === r && (p.test(s) || j) || T === o && s === "Text" || T === m && s === "Comment" || T === h && s === "DocumentFragment";
    }, a = (b) => {
      var s;
      return (b == null || (s = b.constructor) === null || s === void 0 ? void 0 : s.name) && E(b);
    };
    e.test = a;
    function f(b) {
      return b.nodeType === o;
    }
    function c(b) {
      return b.nodeType === m;
    }
    function l(b) {
      return b.nodeType === h;
    }
    var i = (b, s, T, w, j, V) => {
      if (f(b))
        return (0, t.printText)(b.data, s);
      if (c(b))
        return (0, t.printComment)(b.data, s);
      let B = l(b) ? "DocumentFragment" : b.tagName.toLowerCase();
      return ++w > s.maxDepth ? (0, t.printElementAsLeaf)(B, s) : (0, t.printElement)(B, (0, t.printProps)(l(b) ? [] : Array.from(b.attributes).map((z) => z.name).sort(), l(b) ? {} : Array.from(b.attributes).reduce((z, O) => (z[O.name] = O.value, z), {}), s, T + s.indent, w, j, V), (0, t.printChildren)(Array.prototype.slice.call(b.childNodes || b.children), s, T + s.indent, w, j, V), s, T);
    };
    e.serialize = i;
    var d = {
      serialize: i,
      test: a
    }, g = d;
    e.default = g;
  }
}), it = F({
  "node_modules/pretty-format/build/plugins/Immutable.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.test = e.serialize = e.default = void 0;
    var t = ae(), r = "@@__IMMUTABLE_ITERABLE__@@", o = "@@__IMMUTABLE_LIST__@@", m = "@@__IMMUTABLE_KEYED__@@", h = "@@__IMMUTABLE_MAP__@@", p = "@@__IMMUTABLE_ORDERED__@@", u = "@@__IMMUTABLE_RECORD__@@", E = "@@__IMMUTABLE_SEQ__@@", a = "@@__IMMUTABLE_SET__@@", f = "@@__IMMUTABLE_STACK__@@", c = (O) => `Immutable.${O}`, l = (O) => `[${O}]`, i = " ", d = "…", g = (O, C, R, A, L, I, D) => ++A > C.maxDepth ? l(c(D)) : `${c(D) + i}{${(0, t.printIteratorEntries)(O.entries(), C, R, A, L, I)}}`;
    function b(O) {
      let C = 0;
      return {
        next() {
          if (C < O._keys.length) {
            let R = O._keys[C++];
            return {
              done: !1,
              value: [R, O.get(R)]
            };
          }
          return {
            done: !0,
            value: void 0
          };
        }
      };
    }
    var s = (O, C, R, A, L, I) => {
      let D = c(O._name || "Record");
      return ++A > C.maxDepth ? l(D) : `${D + i}{${(0, t.printIteratorEntries)(b(O), C, R, A, L, I)}}`;
    }, T = (O, C, R, A, L, I) => {
      let D = c("Seq");
      return ++A > C.maxDepth ? l(D) : O[m] ? `${D + i}{${O._iter || O._object ? (0, t.printIteratorEntries)(O.entries(), C, R, A, L, I) : d}}` : `${D + i}[${O._iter || O._array || O._collection || O._iterable ? (0, t.printIteratorValues)(O.values(), C, R, A, L, I) : d}]`;
    }, w = (O, C, R, A, L, I, D) => ++A > C.maxDepth ? l(c(D)) : `${c(D) + i}[${(0, t.printIteratorValues)(O.values(), C, R, A, L, I)}]`, j = (O, C, R, A, L, I) => O[h] ? g(O, C, R, A, L, I, O[p] ? "OrderedMap" : "Map") : O[o] ? w(O, C, R, A, L, I, "List") : O[a] ? w(O, C, R, A, L, I, O[p] ? "OrderedSet" : "Set") : O[f] ? w(O, C, R, A, L, I, "Stack") : O[E] ? T(O, C, R, A, L, I) : s(O, C, R, A, L, I);
    e.serialize = j;
    var V = (O) => O && (O[r] === !0 || O[u] === !0);
    e.test = V;
    var B = {
      serialize: j,
      test: V
    }, z = B;
    e.default = z;
  }
}), ot = F({
  "node_modules/react-is/cjs/react-is.production.min.js"(e) {
    var t = /* @__PURE__ */ Symbol.for("react.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), m = /* @__PURE__ */ Symbol.for("react.strict_mode"), h = /* @__PURE__ */ Symbol.for("react.profiler"), p = /* @__PURE__ */ Symbol.for("react.provider"), u = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.server_context"), a = /* @__PURE__ */ Symbol.for("react.forward_ref"), f = /* @__PURE__ */ Symbol.for("react.suspense"), c = /* @__PURE__ */ Symbol.for("react.suspense_list"), l = /* @__PURE__ */ Symbol.for("react.memo"), i = /* @__PURE__ */ Symbol.for("react.lazy"), d = /* @__PURE__ */ Symbol.for("react.offscreen"), g;
    g = /* @__PURE__ */ Symbol.for("react.module.reference");
    function b(s) {
      if (typeof s == "object" && s !== null) {
        var T = s.$$typeof;
        switch (T) {
          case t:
            switch (s = s.type, s) {
              case o:
              case h:
              case m:
              case f:
              case c:
                return s;
              default:
                switch (s = s && s.$$typeof, s) {
                  case E:
                  case u:
                  case a:
                  case i:
                  case l:
                  case p:
                    return s;
                  default:
                    return T;
                }
            }
          case r:
            return T;
        }
      }
    }
    e.ContextConsumer = u, e.ContextProvider = p, e.Element = t, e.ForwardRef = a, e.Fragment = o, e.Lazy = i, e.Memo = l, e.Portal = r, e.Profiler = h, e.StrictMode = m, e.Suspense = f, e.SuspenseList = c, e.isAsyncMode = function() {
      return !1;
    }, e.isConcurrentMode = function() {
      return !1;
    }, e.isContextConsumer = function(s) {
      return b(s) === u;
    }, e.isContextProvider = function(s) {
      return b(s) === p;
    }, e.isElement = function(s) {
      return typeof s == "object" && s !== null && s.$$typeof === t;
    }, e.isForwardRef = function(s) {
      return b(s) === a;
    }, e.isFragment = function(s) {
      return b(s) === o;
    }, e.isLazy = function(s) {
      return b(s) === i;
    }, e.isMemo = function(s) {
      return b(s) === l;
    }, e.isPortal = function(s) {
      return b(s) === r;
    }, e.isProfiler = function(s) {
      return b(s) === h;
    }, e.isStrictMode = function(s) {
      return b(s) === m;
    }, e.isSuspense = function(s) {
      return b(s) === f;
    }, e.isSuspenseList = function(s) {
      return b(s) === c;
    }, e.isValidElementType = function(s) {
      return typeof s == "string" || typeof s == "function" || s === o || s === h || s === m || s === f || s === c || s === d || typeof s == "object" && s !== null && (s.$$typeof === i || s.$$typeof === l || s.$$typeof === p || s.$$typeof === u || s.$$typeof === a || s.$$typeof === g || s.getModuleId !== void 0);
    }, e.typeOf = b;
  }
}), at = F({
  "node_modules/react-is/cjs/react-is.development.js"(e) {
    Pe.NODE_ENV !== "production" && (function() {
      var t = /* @__PURE__ */ Symbol.for("react.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), m = /* @__PURE__ */ Symbol.for("react.strict_mode"), h = /* @__PURE__ */ Symbol.for("react.profiler"), p = /* @__PURE__ */ Symbol.for("react.provider"), u = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.server_context"), a = /* @__PURE__ */ Symbol.for("react.forward_ref"), f = /* @__PURE__ */ Symbol.for("react.suspense"), c = /* @__PURE__ */ Symbol.for("react.suspense_list"), l = /* @__PURE__ */ Symbol.for("react.memo"), i = /* @__PURE__ */ Symbol.for("react.lazy"), d = /* @__PURE__ */ Symbol.for("react.offscreen"), g = !1, b = !1, s = !1, T = !1, w = !1, j;
      j = /* @__PURE__ */ Symbol.for("react.module.reference");
      function V(y) {
        return !!(typeof y == "string" || typeof y == "function" || y === o || y === h || w || y === m || y === f || y === c || T || y === d || g || b || s || typeof y == "object" && y !== null && (y.$$typeof === i || y.$$typeof === l || y.$$typeof === p || y.$$typeof === u || y.$$typeof === a || y.$$typeof === j || y.getModuleId !== void 0));
      }
      function B(y) {
        if (typeof y == "object" && y !== null) {
          var v = y.$$typeof;
          switch (v) {
            case t:
              var N = y.type;
              switch (N) {
                case o:
                case h:
                case m:
                case f:
                case c:
                  return N;
                default:
                  var U = N && N.$$typeof;
                  switch (U) {
                    case E:
                    case u:
                    case a:
                    case i:
                    case l:
                    case p:
                      return U;
                    default:
                      return v;
                  }
              }
            case r:
              return v;
          }
        }
      }
      var z = u, O = p, C = t, R = a, A = o, L = i, I = l, D = r, Y = h, J = m, x = f, k = c, Q = !1, ee = !1;
      function ue(y) {
        return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
      }
      function te(y) {
        return ee || (ee = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
      }
      function re(y) {
        return B(y) === u;
      }
      function ne(y) {
        return B(y) === p;
      }
      function le(y) {
        return typeof y == "object" && y !== null && y.$$typeof === t;
      }
      function se(y) {
        return B(y) === a;
      }
      function ie(y) {
        return B(y) === o;
      }
      function ce(y) {
        return B(y) === i;
      }
      function me(y) {
        return B(y) === l;
      }
      function n(y) {
        return B(y) === r;
      }
      function _(y) {
        return B(y) === h;
      }
      function S(y) {
        return B(y) === m;
      }
      function M(y) {
        return B(y) === f;
      }
      function $(y) {
        return B(y) === c;
      }
      e.ContextConsumer = z, e.ContextProvider = O, e.Element = C, e.ForwardRef = R, e.Fragment = A, e.Lazy = L, e.Memo = I, e.Portal = D, e.Profiler = Y, e.StrictMode = J, e.Suspense = x, e.SuspenseList = k, e.isAsyncMode = ue, e.isConcurrentMode = te, e.isContextConsumer = re, e.isContextProvider = ne, e.isElement = le, e.isForwardRef = se, e.isFragment = ie, e.isLazy = ce, e.isMemo = me, e.isPortal = n, e.isProfiler = _, e.isStrictMode = S, e.isSuspense = M, e.isSuspenseList = $, e.isValidElementType = V, e.typeOf = B;
    })();
  }
}), ut = F({
  "node_modules/react-is/index.js"(e, t) {
    Pe.NODE_ENV === "production" ? t.exports = ot() : t.exports = at();
  }
}), st = F({
  "node_modules/pretty-format/build/plugins/ReactElement.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.test = e.serialize = e.default = void 0;
    var t = m(ut()), r = _e();
    function o(l) {
      if (typeof WeakMap != "function")
        return null;
      var i = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap();
      return (o = function(g) {
        return g ? d : i;
      })(l);
    }
    function m(l, i) {
      if (l && l.__esModule)
        return l;
      if (l === null || typeof l != "object" && typeof l != "function")
        return { default: l };
      var d = o(i);
      if (d && d.has(l))
        return d.get(l);
      var g = {}, b = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var s in l)
        if (s !== "default" && Object.prototype.hasOwnProperty.call(l, s)) {
          var T = b ? Object.getOwnPropertyDescriptor(l, s) : null;
          T && (T.get || T.set) ? Object.defineProperty(g, s, T) : g[s] = l[s];
        }
      return g.default = l, d && d.set(l, g), g;
    }
    var h = (l, i = []) => (Array.isArray(l) ? l.forEach((d) => {
      h(d, i);
    }) : l != null && l !== !1 && i.push(l), i), p = (l) => {
      let i = l.type;
      if (typeof i == "string")
        return i;
      if (typeof i == "function")
        return i.displayName || i.name || "Unknown";
      if (t.isFragment(l))
        return "React.Fragment";
      if (t.isSuspense(l))
        return "React.Suspense";
      if (typeof i == "object" && i !== null) {
        if (t.isContextProvider(l))
          return "Context.Provider";
        if (t.isContextConsumer(l))
          return "Context.Consumer";
        if (t.isForwardRef(l)) {
          if (i.displayName)
            return i.displayName;
          let d = i.render.displayName || i.render.name || "";
          return d !== "" ? `ForwardRef(${d})` : "ForwardRef";
        }
        if (t.isMemo(l)) {
          let d = i.displayName || i.type.displayName || i.type.name || "";
          return d !== "" ? `Memo(${d})` : "Memo";
        }
      }
      return "UNDEFINED";
    }, u = (l) => {
      let { props: i } = l;
      return Object.keys(i).filter((d) => d !== "children" && i[d] !== void 0).sort();
    }, E = (l, i, d, g, b, s) => ++g > i.maxDepth ? (0, r.printElementAsLeaf)(p(l), i) : (0, r.printElement)(p(l), (0, r.printProps)(u(l), l.props, i, d + i.indent, g, b, s), (0, r.printChildren)(h(l.props.children), i, d + i.indent, g, b, s), i, d);
    e.serialize = E;
    var a = (l) => l != null && t.isElement(l);
    e.test = a;
    var f = {
      serialize: E,
      test: a
    }, c = f;
    e.default = c;
  }
}), ct = F({
  "node_modules/pretty-format/build/plugins/ReactTestComponent.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.test = e.serialize = e.default = void 0;
    var t = _e(), r = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol, o = typeof r == "function" && r.for ? r.for("react.test.json") : 245830487, m = (a) => {
      let { props: f } = a;
      return f ? Object.keys(f).filter((c) => f[c] !== void 0).sort() : [];
    }, h = (a, f, c, l, i, d) => ++l > f.maxDepth ? (0, t.printElementAsLeaf)(a.type, f) : (0, t.printElement)(a.type, a.props ? (0, t.printProps)(m(a), a.props, f, c + f.indent, l, i, d) : "", a.children ? (0, t.printChildren)(a.children, f, c + f.indent, l, i, d) : "", f, c);
    e.serialize = h;
    var p = (a) => a && a.$$typeof === o;
    e.test = p;
    var u = {
      serialize: h,
      test: p
    }, E = u;
    e.default = E;
  }
}), mt = F({
  "node_modules/pretty-format/build/index.js"(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = e.DEFAULT_OPTIONS = void 0, e.format = ie, e.plugins = void 0;
    var t = f(Ne()), r = ae(), o = f(Qe()), m = f(tt()), h = f(rt()), p = f(lt()), u = f(it()), E = f(st()), a = f(ct());
    function f(n) {
      return n && n.__esModule ? n : { default: n };
    }
    var c = Object.prototype.toString, l = Date.prototype.toISOString, i = Error.prototype.toString, d = RegExp.prototype.toString, g = (n) => typeof n.constructor == "function" && n.constructor.name || "Object", b = (n) => typeof window < "u" && n === window, s = /^Symbol\((.*)\)(.*)$/, T = /\n/gi, w = class extends Error {
      constructor(n, _) {
        super(n), this.stack = _, this.name = this.constructor.name;
      }
    };
    function j(n) {
      return n === "[object Array]" || n === "[object ArrayBuffer]" || n === "[object DataView]" || n === "[object Float32Array]" || n === "[object Float64Array]" || n === "[object Int8Array]" || n === "[object Int16Array]" || n === "[object Int32Array]" || n === "[object Uint8Array]" || n === "[object Uint8ClampedArray]" || n === "[object Uint16Array]" || n === "[object Uint32Array]";
    }
    function V(n) {
      return Object.is(n, -0) ? "-0" : String(n);
    }
    function B(n) {
      return `${n}n`;
    }
    function z(n, _) {
      return _ ? `[Function ${n.name || "anonymous"}]` : "[Function]";
    }
    function O(n) {
      return String(n).replace(s, "Symbol($1)");
    }
    function C(n) {
      return `[${i.call(n)}]`;
    }
    function R(n, _, S, M) {
      if (n === !0 || n === !1)
        return `${n}`;
      if (n === void 0)
        return "undefined";
      if (n === null)
        return "null";
      let $ = typeof n;
      if ($ === "number")
        return V(n);
      if ($ === "bigint")
        return B(n);
      if ($ === "string")
        return M ? `"${n.replace(/"|\\/g, "\\$&")}"` : `"${n}"`;
      if ($ === "function")
        return z(n, _);
      if ($ === "symbol")
        return O(n);
      let y = c.call(n);
      return y === "[object WeakMap]" ? "WeakMap {}" : y === "[object WeakSet]" ? "WeakSet {}" : y === "[object Function]" || y === "[object GeneratorFunction]" ? z(n, _) : y === "[object Symbol]" ? O(n) : y === "[object Date]" ? isNaN(+n) ? "Date { NaN }" : l.call(n) : y === "[object Error]" ? C(n) : y === "[object RegExp]" ? S ? d.call(n).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&") : d.call(n) : n instanceof Error ? C(n) : null;
    }
    function A(n, _, S, M, $, y) {
      if ($.indexOf(n) !== -1)
        return "[Circular]";
      $ = $.slice(), $.push(n);
      let v = ++M > _.maxDepth, N = _.min;
      if (_.callToJSON && !v && n.toJSON && typeof n.toJSON == "function" && !y)
        return Y(n.toJSON(), _, S, M, $, !0);
      let U = c.call(n);
      return U === "[object Arguments]" ? v ? "[Arguments]" : `${N ? "" : "Arguments "}[${(0, r.printListItems)(n, _, S, M, $, Y)}]` : j(U) ? v ? `[${n.constructor.name}]` : `${N || !_.printBasicPrototype && n.constructor.name === "Array" ? "" : `${n.constructor.name} `}[${(0, r.printListItems)(n, _, S, M, $, Y)}]` : U === "[object Map]" ? v ? "[Map]" : `Map {${(0, r.printIteratorEntries)(n.entries(), _, S, M, $, Y, " => ")}}` : U === "[object Set]" ? v ? "[Set]" : `Set {${(0, r.printIteratorValues)(n.values(), _, S, M, $, Y)}}` : v || b(n) ? `[${g(n)}]` : `${N || !_.printBasicPrototype && g(n) === "Object" ? "" : `${g(n)} `}{${(0, r.printObjectProperties)(n, _, S, M, $, Y)}}`;
    }
    function L(n) {
      return n.serialize != null;
    }
    function I(n, _, S, M, $, y) {
      let v;
      try {
        v = L(n) ? n.serialize(_, S, M, $, y, Y) : n.print(_, (N) => Y(N, S, M, $, y), (N) => {
          let U = M + S.indent;
          return U + N.replace(T, `
${U}`);
        }, {
          edgeSpacing: S.spacingOuter,
          min: S.min,
          spacing: S.spacingInner
        }, S.colors);
      } catch (N) {
        throw new w(N.message, N.stack);
      }
      if (typeof v != "string")
        throw new Error(`pretty-format: Plugin must return type "string" but instead returned "${typeof v}".`);
      return v;
    }
    function D(n, _) {
      for (let S = 0; S < n.length; S++)
        try {
          if (n[S].test(_))
            return n[S];
        } catch (M) {
          throw new w(M.message, M.stack);
        }
      return null;
    }
    function Y(n, _, S, M, $, y) {
      let v = D(_.plugins, n);
      if (v !== null)
        return I(v, n, _, S, M, $);
      let N = R(n, _.printFunctionName, _.escapeRegex, _.escapeString);
      return N !== null ? N : A(n, _, S, M, $, y);
    }
    var J = {
      comment: "gray",
      content: "reset",
      prop: "yellow",
      tag: "cyan",
      value: "green"
    }, x = Object.keys(J), k = {
      callToJSON: !0,
      compareKeys: void 0,
      escapeRegex: !1,
      escapeString: !0,
      highlight: !1,
      indent: 2,
      maxDepth: 1 / 0,
      maxWidth: 1 / 0,
      min: !1,
      plugins: [],
      printBasicPrototype: !0,
      printFunctionName: !0,
      theme: J
    };
    e.DEFAULT_OPTIONS = k;
    function Q(n) {
      if (Object.keys(n).forEach((_) => {
        if (!Object.prototype.hasOwnProperty.call(k, _))
          throw new Error(`pretty-format: Unknown option "${_}".`);
      }), n.min && n.indent !== void 0 && n.indent !== 0)
        throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
      if (n.theme !== void 0) {
        if (n.theme === null)
          throw new Error('pretty-format: Option "theme" must not be null.');
        if (typeof n.theme != "object")
          throw new Error(`pretty-format: Option "theme" must be of type "object" but instead received "${typeof n.theme}".`);
      }
    }
    var ee = (n) => x.reduce((_, S) => {
      let M = n.theme && n.theme[S] !== void 0 ? n.theme[S] : J[S], $ = M && t.default[M];
      if ($ && typeof $.close == "string" && typeof $.open == "string")
        _[S] = $;
      else
        throw new Error(`pretty-format: Option "theme" has a key "${S}" whose value "${M}" is undefined in ansi-styles.`);
      return _;
    }, /* @__PURE__ */ Object.create(null)), ue = () => x.reduce((n, _) => (n[_] = {
      close: "",
      open: ""
    }, n), /* @__PURE__ */ Object.create(null)), te = (n) => {
      var _;
      return (_ = n?.printFunctionName) !== null && _ !== void 0 ? _ : k.printFunctionName;
    }, re = (n) => {
      var _;
      return (_ = n?.escapeRegex) !== null && _ !== void 0 ? _ : k.escapeRegex;
    }, ne = (n) => {
      var _;
      return (_ = n?.escapeString) !== null && _ !== void 0 ? _ : k.escapeString;
    }, le = (n) => {
      var _, S, M, $, y, v, N;
      return {
        callToJSON: (_ = n?.callToJSON) !== null && _ !== void 0 ? _ : k.callToJSON,
        colors: n != null && n.highlight ? ee(n) : ue(),
        compareKeys: typeof n?.compareKeys == "function" ? n.compareKeys : k.compareKeys,
        escapeRegex: re(n),
        escapeString: ne(n),
        indent: n != null && n.min ? "" : se((S = n?.indent) !== null && S !== void 0 ? S : k.indent),
        maxDepth: (M = n?.maxDepth) !== null && M !== void 0 ? M : k.maxDepth,
        maxWidth: ($ = n?.maxWidth) !== null && $ !== void 0 ? $ : k.maxWidth,
        min: (y = n?.min) !== null && y !== void 0 ? y : k.min,
        plugins: (v = n?.plugins) !== null && v !== void 0 ? v : k.plugins,
        printBasicPrototype: (N = n?.printBasicPrototype) !== null && N !== void 0 ? N : !0,
        printFunctionName: te(n),
        spacingInner: n != null && n.min ? " " : `
`,
        spacingOuter: n != null && n.min ? "" : `
`
      };
    };
    function se(n) {
      return new Array(n + 1).join(" ");
    }
    function ie(n, _) {
      if (_ && (Q(_), _.plugins)) {
        let M = D(_.plugins, n);
        if (M !== null)
          return I(M, n, le(_), "", 0, []);
      }
      let S = R(n, te(_), re(_), ne(_));
      return S !== null ? S : A(n, le(_), "", 0, []);
    }
    var ce = {
      AsymmetricMatcher: o.default,
      ConvertAnsi: m.default,
      DOMCollection: h.default,
      DOMElement: p.default,
      Immutable: u.default,
      ReactElement: E.default,
      ReactTestComponent: a.default
    };
    e.plugins = ce;
    var me = ie;
    e.default = me;
  }
}), ye = xe(mt()), {
  AsymmetricMatcher: ft,
  DOMCollection: dt,
  DOMElement: pt,
  Immutable: yt,
  ReactElement: bt,
  ReactTestComponent: _t
} = ye.plugins, Ce = [
  _t,
  bt,
  pt,
  dt,
  yt,
  ft
], G = W.dim, Ae = W.green, we = W.red, gt = "·";
function be(e, t = 10, r = 10) {
  let o = 1e4, m;
  try {
    m = (0, ye.format)(e, {
      maxDepth: t,
      maxWidth: r,
      min: !0,
      plugins: Ce
    });
  } catch {
    m = (0, ye.format)(e, {
      callToJSON: !1,
      maxDepth: t,
      maxWidth: r,
      min: !0,
      plugins: Ce
    });
  }
  return m.length >= o && t > 1 ? be(e, Math.floor(t / 2), r) : m.length >= o && r > 1 ? be(e, t, Math.floor(r / 2)) : m;
}
function Et(e) {
  return e.replace(/\s+$/gm, (t) => gt.repeat(t.length));
}
function ht(e) {
  return we(Et(be(e)));
}
function Ot(e, t = "received", r = "expected", o = {}) {
  let {
    comment: m = "",
    expectedColor: h = Ae,
    isDirectExpectCall: p = !1,
    isNot: u = !1,
    promise: E = "",
    receivedColor: a = we,
    secondArgument: f = "",
    secondArgumentColor: c = Ae
  } = o, l = "", i = "expect";
  return !p && t !== "" && (l += G(`${i}(`) + a(t), i = ")"), E !== "" && (l += G(`${i}.`) + E, i = ""), u && (l += `${G(`${i}.`)}not`, i = ""), e.includes(".") ? i += e : (l += G(`${i}.`) + e, i = ""), r === "" ? i += "()" : (l += G(`${i}(`) + h(r), f && (l += G(", ") + c(f)), i = ")"), m !== "" && (i += ` // ${m}`), i !== "" && (l += G(i)), l;
}
function Tt(e) {
  if (typeof e.violations > "u")
    throw new Error("No violations found in aXe results object");
  let t = St(e.violations, e.toolOptions ? e.toolOptions.impactLevels : []);
  function r(p) {
    if (p.length === 0)
      return [];
    let u = `

`;
    return p.map((E) => E.nodes.map((a) => `Expected the HTML found at $('${a.target.join(", ")}') to have no violations:` + u + W.grey(a.html) + u + "Received:" + u + ht(`${E.help} (${E.id})`) + u + W.yellow(a.failureSummary) + u + (E.helpUrl ? `You can find more information on this issue here: 
${W.blue(E.helpUrl)}` : "")).join(u)).join(u + "────────" + u);
  }
  let o = r(t), m = o.length === 0;
  function h() {
    if (!m)
      return Ot(".toHaveNoViolations") + `

${o}`;
  }
  return { actual: t, message: h, pass: m };
}
function St(e, t) {
  return t && t.length > 0 ? e.filter((r) => t.includes(r.impact)) : e;
}
export {
  Tt as toHaveNoViolations
};
