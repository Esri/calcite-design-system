/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as P, i as j, j as X } from "./global.js";
function R(t, n) {
  const e = { ...t };
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    delete e[o];
  }
  return e;
}
const C = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
for (const t in C) Object.freeze(C[t]);
const w = Object.freeze(C), E = /* @__PURE__ */ Object.create(null);
for (const t in w)
  Object.hasOwn(w, t) && (E[w[t]] = t);
const _ = {
  to: {},
  get: {}
};
_.get = function(t) {
  const n = t.slice(0, 3).toLowerCase();
  let e, r;
  switch (n) {
    case "hsl": {
      e = _.get.hsl(t), r = "hsl";
      break;
    }
    case "hwb": {
      e = _.get.hwb(t), r = "hwb";
      break;
    }
    default: {
      e = _.get.rgb(t), r = "rgb";
      break;
    }
  }
  return e ? { model: r, value: e } : null;
};
_.get.rgb = function(t) {
  if (!t)
    return null;
  const n = /^#([a-f\d]{3,4})$/i, e = /^#([a-f\d]{6})([a-f\d]{2})?$/i, r = /^rgba?\(\s*([+-]?(?:\d*\.)?\d+(?:e\d+)?)(?=[\s,])\s*(?:,\s*)?([+-]?(?:\d*\.)?\d+(?:e\d+)?)(?=[\s,])\s*(?:,\s*)?([+-]?(?:\d*\.)?\d+(?:e\d+)?)\s*(?:[\s,|/]\s*([+-]?(?:\d*\.)?\d+(?:e\d+)?)(%?)\s*)?\)$/i, o = /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[\s,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/i, c = /^(\w+)$/;
  let s = [0, 0, 0, 1], a, i, h;
  if (a = t.match(e)) {
    for (h = a[2], a = a[1], i = 0; i < 3; i++) {
      const m = i * 2;
      s[i] = Number.parseInt(a.slice(m, m + 2), 16);
    }
    h && (s[3] = Number.parseInt(h, 16) / 255);
  } else if (a = t.match(n)) {
    for (a = a[1], h = a[3], i = 0; i < 3; i++)
      s[i] = Number.parseInt(a[i] + a[i], 16);
    h && (s[3] = Number.parseInt(h + h, 16) / 255);
  } else if (a = t.match(r)) {
    for (i = 0; i < 3; i++)
      s[i] = Number.parseFloat(a[i + 1]);
    a[4] && (s[3] = a[5] ? Number.parseFloat(a[4]) * 0.01 : Number.parseFloat(a[4]));
  } else if (a = t.match(o)) {
    for (i = 0; i < 3; i++)
      s[i] = Math.round(Number.parseFloat(a[i + 1]) * 2.55);
    a[4] && (s[3] = a[5] ? Number.parseFloat(a[4]) * 0.01 : Number.parseFloat(a[4]));
  } else return (a = t.toLowerCase().match(c)) ? a[1] === "transparent" ? [0, 0, 0, 0] : Object.hasOwn(w, a[1]) ? (s = w[a[1]].slice(), s[3] = 1, s) : null : null;
  for (i = 0; i < 3; i++)
    s[i] = v(s[i], 0, 255);
  return s[3] = v(s[3], 0, 1), s;
};
_.get.hsl = function(t) {
  if (!t)
    return null;
  const n = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:e[+-]?\d+)?)\s*)?\)$/i, e = t.match(n);
  if (e) {
    const r = Number.parseFloat(e[4]), o = (Number.parseFloat(e[1]) % 360 + 360) % 360, c = v(Number.parseFloat(e[2]), 0, 100), s = v(Number.parseFloat(e[3]), 0, 100), a = v(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, c, s, a];
  }
  return null;
};
_.get.hwb = function(t) {
  if (!t)
    return null;
  const n = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*[\s,]\s*([+-]?[\d.]+)%\s*[\s,]\s*([+-]?[\d.]+)%\s*(?:[\s,]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:e[+-]?\d+)?)\s*)?\)$/i, e = t.match(n);
  if (e) {
    const r = Number.parseFloat(e[4]), o = (Number.parseFloat(e[1]) % 360 + 360) % 360, c = v(Number.parseFloat(e[2]), 0, 100), s = v(Number.parseFloat(e[3]), 0, 100), a = v(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, c, s, a];
  }
  return null;
};
_.to.hex = function(...t) {
  return "#" + A(t[0]) + A(t[1]) + A(t[2]) + (t[3] < 1 ? A(Math.round(t[3] * 255)) : "");
};
_.to.rgb = function(...t) {
  return t.length < 4 || t[3] === 1 ? "rgb(" + Math.round(t[0]) + ", " + Math.round(t[1]) + ", " + Math.round(t[2]) + ")" : "rgba(" + Math.round(t[0]) + ", " + Math.round(t[1]) + ", " + Math.round(t[2]) + ", " + t[3] + ")";
};
_.to.rgb.percent = function(...t) {
  const n = Math.round(t[0] / 255 * 100), e = Math.round(t[1] / 255 * 100), r = Math.round(t[2] / 255 * 100);
  return t.length < 4 || t[3] === 1 ? "rgb(" + n + "%, " + e + "%, " + r + "%)" : "rgba(" + n + "%, " + e + "%, " + r + "%, " + t[3] + ")";
};
_.to.hsl = function(...t) {
  return t.length < 4 || t[3] === 1 ? "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)" : "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + t[3] + ")";
};
_.to.hwb = function(...t) {
  let n = "";
  return t.length >= 4 && t[3] !== 1 && (n = ", " + t[3]), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + n + ")";
};
_.to.keyword = function(...t) {
  return E[t.slice(0, 3)];
};
function v(t, n, e) {
  return Math.min(Math.max(n, t), e);
}
function A(t) {
  const n = Math.round(t).toString(16).toUpperCase();
  return n.length < 2 ? "0" + n : n;
}
const $ = {};
for (const t of Object.keys(w))
  $[w[t]] = t;
const l = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  oklab: { channels: 3, labels: ["okl", "oka", "okb"] },
  lch: { channels: 3, labels: "lch" },
  oklch: { channels: 3, labels: ["okl", "okc", "okh"] },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
}, S = (6 / 29) ** 3;
function M(t) {
  const n = t > 31308e-7 ? 1.055 * t ** 0.4166666666666667 - 0.055 : t * 12.92;
  return Math.min(Math.max(0, n), 1);
}
function x(t) {
  return t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92;
}
for (const t of Object.keys(l)) {
  if (!("channels" in l[t]))
    throw new Error("missing channels property: " + t);
  if (!("labels" in l[t]))
    throw new Error("missing channel labels property: " + t);
  if (l[t].labels.length !== l[t].channels)
    throw new Error("channel and label counts mismatch: " + t);
  const { channels: n, labels: e } = l[t];
  delete l[t].channels, delete l[t].labels, Object.defineProperty(l[t], "channels", { value: n }), Object.defineProperty(l[t], "labels", { value: e });
}
l.rgb.hsl = function(t) {
  const n = t[0] / 255, e = t[1] / 255, r = t[2] / 255, o = Math.min(n, e, r), c = Math.max(n, e, r), s = c - o;
  let a, i;
  switch (c) {
    case o: {
      a = 0;
      break;
    }
    case n: {
      a = (e - r) / s;
      break;
    }
    case e: {
      a = 2 + (r - n) / s;
      break;
    }
    case r: {
      a = 4 + (n - e) / s;
      break;
    }
  }
  a = Math.min(a * 60, 360), a < 0 && (a += 360);
  const h = (o + c) / 2;
  return c === o ? i = 0 : h <= 0.5 ? i = s / (c + o) : i = s / (2 - c - o), [a, i * 100, h * 100];
};
l.rgb.hsv = function(t) {
  let n, e, r, o, c;
  const s = t[0] / 255, a = t[1] / 255, i = t[2] / 255, h = Math.max(s, a, i), m = h - Math.min(s, a, i), y = function(W) {
    return (h - W) / 6 / m + 1 / 2;
  };
  if (m === 0)
    o = 0, c = 0;
  else {
    switch (c = m / h, n = y(s), e = y(a), r = y(i), h) {
      case s: {
        o = r - e;
        break;
      }
      case a: {
        o = 1 / 3 + n - r;
        break;
      }
      case i: {
        o = 2 / 3 + e - n;
        break;
      }
    }
    o < 0 ? o += 1 : o > 1 && (o -= 1);
  }
  return [
    o * 360,
    c * 100,
    h * 100
  ];
};
l.rgb.hwb = function(t) {
  const n = t[0], e = t[1];
  let r = t[2];
  const o = l.rgb.hsl(t)[0], c = 1 / 255 * Math.min(n, Math.min(e, r));
  return r = 1 - 1 / 255 * Math.max(n, Math.max(e, r)), [o, c * 100, r * 100];
};
l.rgb.oklab = function(t) {
  const n = x(t[0] / 255), e = x(t[1] / 255), r = x(t[2] / 255), o = Math.cbrt(0.4122214708 * n + 0.5363325363 * e + 0.0514459929 * r), c = Math.cbrt(0.2119034982 * n + 0.6806995451 * e + 0.1073969566 * r), s = Math.cbrt(0.0883024619 * n + 0.2817188376 * e + 0.6299787005 * r), a = 0.2104542553 * o + 0.793617785 * c - 0.0040720468 * s, i = 1.9779984951 * o - 2.428592205 * c + 0.4505937099 * s, h = 0.0259040371 * o + 0.7827717662 * c - 0.808675766 * s;
  return [a * 100, i * 100, h * 100];
};
l.rgb.cmyk = function(t) {
  const n = t[0] / 255, e = t[1] / 255, r = t[2] / 255, o = Math.min(1 - n, 1 - e, 1 - r), c = (1 - n - o) / (1 - o) || 0, s = (1 - e - o) / (1 - o) || 0, a = (1 - r - o) / (1 - o) || 0;
  return [c * 100, s * 100, a * 100, o * 100];
};
function D(t, n) {
  return (t[0] - n[0]) ** 2 + (t[1] - n[1]) ** 2 + (t[2] - n[2]) ** 2;
}
l.rgb.keyword = function(t) {
  const n = $[t];
  if (n)
    return n;
  let e = Number.POSITIVE_INFINITY, r;
  for (const o of Object.keys(w)) {
    const c = w[o], s = D(t, c);
    s < e && (e = s, r = o);
  }
  return r;
};
l.keyword.rgb = function(t) {
  return [...w[t]];
};
l.rgb.xyz = function(t) {
  const n = x(t[0] / 255), e = x(t[1] / 255), r = x(t[2] / 255), o = n * 0.4124564 + e * 0.3575761 + r * 0.1804375, c = n * 0.2126729 + e * 0.7151522 + r * 0.072175, s = n * 0.0193339 + e * 0.119192 + r * 0.9503041;
  return [o * 100, c * 100, s * 100];
};
l.rgb.lab = function(t) {
  const n = l.rgb.xyz(t);
  let e = n[0], r = n[1], o = n[2];
  e /= 95.047, r /= 100, o /= 108.883, e = e > S ? e ** (1 / 3) : 7.787 * e + 16 / 116, r = r > S ? r ** (1 / 3) : 7.787 * r + 16 / 116, o = o > S ? o ** (1 / 3) : 7.787 * o + 16 / 116;
  const c = 116 * r - 16, s = 500 * (e - r), a = 200 * (r - o);
  return [c, s, a];
};
l.hsl.rgb = function(t) {
  const n = t[0] / 360, e = t[1] / 100, r = t[2] / 100;
  let o, c;
  if (e === 0)
    return c = r * 255, [c, c, c];
  const s = r < 0.5 ? r * (1 + e) : r + e - r * e, a = 2 * r - s, i = [0, 0, 0];
  for (let h = 0; h < 3; h++)
    o = n + 1 / 3 * -(h - 1), o < 0 && o++, o > 1 && o--, 6 * o < 1 ? c = a + (s - a) * 6 * o : 2 * o < 1 ? c = s : 3 * o < 2 ? c = a + (s - a) * (2 / 3 - o) * 6 : c = a, i[h] = c * 255;
  return i;
};
l.hsl.hsv = function(t) {
  const n = t[0];
  let e = t[1] / 100, r = t[2] / 100, o = e;
  const c = Math.max(r, 0.01);
  r *= 2, e *= r <= 1 ? r : 2 - r, o *= c <= 1 ? c : 2 - c;
  const s = (r + e) / 2, a = r === 0 ? 2 * o / (c + o) : 2 * e / (r + e);
  return [n, a * 100, s * 100];
};
l.hsv.rgb = function(t) {
  const n = t[0] / 60, e = t[1] / 100;
  let r = t[2] / 100;
  const o = Math.floor(n) % 6, c = n - Math.floor(n), s = 255 * r * (1 - e), a = 255 * r * (1 - e * c), i = 255 * r * (1 - e * (1 - c));
  switch (r *= 255, o) {
    case 0:
      return [r, i, s];
    case 1:
      return [a, r, s];
    case 2:
      return [s, r, i];
    case 3:
      return [s, a, r];
    case 4:
      return [i, s, r];
    case 5:
      return [r, s, a];
  }
};
l.hsv.hsl = function(t) {
  const n = t[0], e = t[1] / 100, r = t[2] / 100, o = Math.max(r, 0.01);
  let c, s;
  s = (2 - e) * r;
  const a = (2 - e) * o;
  return c = e * o, c /= a <= 1 ? a : 2 - a, c = c || 0, s /= 2, [n, c * 100, s * 100];
};
l.hwb.rgb = function(t) {
  const n = t[0] / 360;
  let e = t[1] / 100, r = t[2] / 100;
  const o = e + r;
  let c;
  o > 1 && (e /= o, r /= o);
  const s = Math.floor(6 * n), a = 1 - r;
  c = 6 * n - s, (s & 1) !== 0 && (c = 1 - c);
  const i = e + c * (a - e);
  let h, m, y;
  switch (s) {
    default:
    case 6:
    case 0: {
      h = a, m = i, y = e;
      break;
    }
    case 1: {
      h = i, m = a, y = e;
      break;
    }
    case 2: {
      h = e, m = a, y = i;
      break;
    }
    case 3: {
      h = e, m = i, y = a;
      break;
    }
    case 4: {
      h = i, m = e, y = a;
      break;
    }
    case 5: {
      h = a, m = e, y = i;
      break;
    }
  }
  return [h * 255, m * 255, y * 255];
};
l.cmyk.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100, o = t[3] / 100, c = 1 - Math.min(1, n * (1 - o) + o), s = 1 - Math.min(1, e * (1 - o) + o), a = 1 - Math.min(1, r * (1 - o) + o);
  return [c * 255, s * 255, a * 255];
};
l.xyz.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100;
  let o, c, s;
  return o = n * 3.2404542 + e * -1.5371385 + r * -0.4985314, c = n * -0.969266 + e * 1.8760108 + r * 0.041556, s = n * 0.0556434 + e * -0.2040259 + r * 1.0572252, o = M(o), c = M(c), s = M(s), [o * 255, c * 255, s * 255];
};
l.xyz.lab = function(t) {
  let n = t[0], e = t[1], r = t[2];
  n /= 95.047, e /= 100, r /= 108.883, n = n > S ? n ** (1 / 3) : 7.787 * n + 16 / 116, e = e > S ? e ** (1 / 3) : 7.787 * e + 16 / 116, r = r > S ? r ** (1 / 3) : 7.787 * r + 16 / 116;
  const o = 116 * e - 16, c = 500 * (n - e), s = 200 * (e - r);
  return [o, c, s];
};
l.xyz.oklab = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100, o = Math.cbrt(0.8189330101 * n + 0.3618667424 * e - 0.1288597137 * r), c = Math.cbrt(0.0329845436 * n + 0.9293118715 * e + 0.0361456387 * r), s = Math.cbrt(0.0482003018 * n + 0.2643662691 * e + 0.633851707 * r), a = 0.2104542553 * o + 0.793617785 * c - 0.0040720468 * s, i = 1.9779984951 * o - 2.428592205 * c + 0.4505937099 * s, h = 0.0259040371 * o + 0.7827717662 * c - 0.808675766 * s;
  return [a * 100, i * 100, h * 100];
};
l.oklab.oklch = function(t) {
  return l.lab.lch(t);
};
l.oklab.xyz = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100, o = (0.999999998 * n + 0.396337792 * e + 0.215803758 * r) ** 3, c = (1.000000008 * n - 0.105561342 * e - 0.063854175 * r) ** 3, s = (1.000000055 * n - 0.089484182 * e - 1.291485538 * r) ** 3, a = 1.227013851 * o - 0.55779998 * c + 0.281256149 * s, i = -0.040580178 * o + 1.11225687 * c - 0.071676679 * s, h = -0.076381285 * o - 0.421481978 * c + 1.58616322 * s;
  return [a * 100, i * 100, h * 100];
};
l.oklab.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100, o = (n + 0.3963377774 * e + 0.2158037573 * r) ** 3, c = (n - 0.1055613458 * e - 0.0638541728 * r) ** 3, s = (n - 0.0894841775 * e - 1.291485548 * r) ** 3, a = M(4.0767416621 * o - 3.3077115913 * c + 0.2309699292 * s), i = M(-1.2684380046 * o + 2.6097574011 * c - 0.3413193965 * s), h = M(-0.0041960863 * o - 0.7034186147 * c + 1.707614701 * s);
  return [a * 255, i * 255, h * 255];
};
l.oklch.oklab = function(t) {
  return l.lch.lab(t);
};
l.lab.xyz = function(t) {
  const n = t[0], e = t[1], r = t[2];
  let o, c, s;
  c = (n + 16) / 116, o = e / 500 + c, s = c - r / 200;
  const a = c ** 3, i = o ** 3, h = s ** 3;
  return c = a > S ? a : (c - 16 / 116) / 7.787, o = i > S ? i : (o - 16 / 116) / 7.787, s = h > S ? h : (s - 16 / 116) / 7.787, o *= 95.047, c *= 100, s *= 108.883, [o, c, s];
};
l.lab.lch = function(t) {
  const n = t[0], e = t[1], r = t[2];
  let o;
  o = Math.atan2(r, e) * 360 / 2 / Math.PI, o < 0 && (o += 360);
  const s = Math.sqrt(e * e + r * r);
  return [n, s, o];
};
l.lch.lab = function(t) {
  const n = t[0], e = t[1], o = t[2] / 360 * 2 * Math.PI, c = e * Math.cos(o), s = e * Math.sin(o);
  return [n, c, s];
};
l.rgb.ansi16 = function(t, n = null) {
  const [e, r, o] = t;
  let c = n === null ? l.rgb.hsv(t)[2] : n;
  if (c = Math.round(c / 50), c === 0)
    return 30;
  let s = 30 + (Math.round(o / 255) << 2 | Math.round(r / 255) << 1 | Math.round(e / 255));
  return c === 2 && (s += 60), s;
};
l.hsv.ansi16 = function(t) {
  return l.rgb.ansi16(l.hsv.rgb(t), t[2]);
};
l.rgb.ansi256 = function(t) {
  const n = t[0], e = t[1], r = t[2];
  return n >> 4 === e >> 4 && e >> 4 === r >> 4 ? n < 8 ? 16 : n > 248 ? 231 : Math.round((n - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(n / 255 * 5) + 6 * Math.round(e / 255 * 5) + Math.round(r / 255 * 5);
};
l.ansi16.rgb = function(t) {
  t = t[0];
  let n = t % 10;
  if (n === 0 || n === 7)
    return t > 50 && (n += 3.5), n = n / 10.5 * 255, [n, n, n];
  const e = (Math.trunc(t > 50) + 1) * 0.5, r = (n & 1) * e * 255, o = (n >> 1 & 1) * e * 255, c = (n >> 2 & 1) * e * 255;
  return [r, o, c];
};
l.ansi256.rgb = function(t) {
  if (t = t[0], t >= 232) {
    const c = (t - 232) * 10 + 8;
    return [c, c, c];
  }
  t -= 16;
  let n;
  const e = Math.floor(t / 36) / 5 * 255, r = Math.floor((n = t % 36) / 6) / 5 * 255, o = n % 6 / 5 * 255;
  return [e, r, o];
};
l.rgb.hex = function(t) {
  const e = (((Math.round(t[0]) & 255) << 16) + ((Math.round(t[1]) & 255) << 8) + (Math.round(t[2]) & 255)).toString(16).toUpperCase();
  return "000000".slice(e.length) + e;
};
l.hex.rgb = function(t) {
  const n = t.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);
  if (!n)
    return [0, 0, 0];
  let e = n[0];
  n[0].length === 3 && (e = [...e].map((a) => a + a).join(""));
  const r = Number.parseInt(e, 16), o = r >> 16 & 255, c = r >> 8 & 255, s = r & 255;
  return [o, c, s];
};
l.rgb.hcg = function(t) {
  const n = t[0] / 255, e = t[1] / 255, r = t[2] / 255, o = Math.max(Math.max(n, e), r), c = Math.min(Math.min(n, e), r), s = o - c;
  let a;
  const i = s < 1 ? c / (1 - s) : 0;
  return s <= 0 ? a = 0 : o === n ? a = (e - r) / s % 6 : o === e ? a = 2 + (r - n) / s : a = 4 + (n - e) / s, a /= 6, a %= 1, [a * 360, s * 100, i * 100];
};
l.hsl.hcg = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = e < 0.5 ? 2 * n * e : 2 * n * (1 - e);
  let o = 0;
  return r < 1 && (o = (e - 0.5 * r) / (1 - r)), [t[0], r * 100, o * 100];
};
l.hsv.hcg = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = n * e;
  let o = 0;
  return r < 1 && (o = (e - r) / (1 - r)), [t[0], r * 100, o * 100];
};
l.hcg.rgb = function(t) {
  const n = t[0] / 360, e = t[1] / 100, r = t[2] / 100;
  if (e === 0)
    return [r * 255, r * 255, r * 255];
  const o = [0, 0, 0], c = n % 1 * 6, s = c % 1, a = 1 - s;
  let i = 0;
  switch (Math.floor(c)) {
    case 0: {
      o[0] = 1, o[1] = s, o[2] = 0;
      break;
    }
    case 1: {
      o[0] = a, o[1] = 1, o[2] = 0;
      break;
    }
    case 2: {
      o[0] = 0, o[1] = 1, o[2] = s;
      break;
    }
    case 3: {
      o[0] = 0, o[1] = a, o[2] = 1;
      break;
    }
    case 4: {
      o[0] = s, o[1] = 0, o[2] = 1;
      break;
    }
    default:
      o[0] = 1, o[1] = 0, o[2] = a;
  }
  return i = (1 - e) * r, [
    (e * o[0] + i) * 255,
    (e * o[1] + i) * 255,
    (e * o[2] + i) * 255
  ];
};
l.hcg.hsv = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = n + e * (1 - n);
  let o = 0;
  return r > 0 && (o = n / r), [t[0], o * 100, r * 100];
};
l.hcg.hsl = function(t) {
  const n = t[1] / 100, r = t[2] / 100 * (1 - n) + 0.5 * n;
  let o = 0;
  return r > 0 && r < 0.5 ? o = n / (2 * r) : r >= 0.5 && r < 1 && (o = n / (2 * (1 - r))), [t[0], o * 100, r * 100];
};
l.hcg.hwb = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = n + e * (1 - n);
  return [t[0], (r - n) * 100, (1 - r) * 100];
};
l.hwb.hcg = function(t) {
  const n = t[1] / 100, r = 1 - t[2] / 100, o = r - n;
  let c = 0;
  return o < 1 && (c = (r - o) / (1 - o)), [t[0], o * 100, c * 100];
};
l.apple.rgb = function(t) {
  return [t[0] / 65535 * 255, t[1] / 65535 * 255, t[2] / 65535 * 255];
};
l.rgb.apple = function(t) {
  return [t[0] / 255 * 65535, t[1] / 255 * 65535, t[2] / 255 * 65535];
};
l.gray.rgb = function(t) {
  return [t[0] / 100 * 255, t[0] / 100 * 255, t[0] / 100 * 255];
};
l.gray.hsl = function(t) {
  return [0, 0, t[0]];
};
l.gray.hsv = l.gray.hsl;
l.gray.hwb = function(t) {
  return [0, 100, t[0]];
};
l.gray.cmyk = function(t) {
  return [0, 0, 0, t[0]];
};
l.gray.lab = function(t) {
  return [t[0], 0, 0];
};
l.gray.hex = function(t) {
  const n = Math.round(t[0] / 100 * 255) & 255, r = ((n << 16) + (n << 8) + n).toString(16).toUpperCase();
  return "000000".slice(r.length) + r;
};
l.rgb.gray = function(t) {
  return [(t[0] + t[1] + t[2]) / 3 / 255 * 100];
};
function U() {
  const t = {}, n = Object.keys(l);
  for (let { length: e } = n, r = 0; r < e; r++)
    t[n[r]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  return t;
}
function K(t) {
  const n = U(), e = [t];
  for (n[t].distance = 0; e.length > 0; ) {
    const r = e.pop(), o = Object.keys(l[r]);
    for (let { length: c } = o, s = 0; s < c; s++) {
      const a = o[s], i = n[a];
      i.distance === -1 && (i.distance = n[r].distance + 1, i.parent = r, e.unshift(a));
    }
  }
  return n;
}
function Y(t, n) {
  return function(e) {
    return n(t(e));
  };
}
function J(t, n) {
  const e = [n[t].parent, t];
  let r = l[n[t].parent][t], o = n[t].parent;
  for (; n[o].parent; )
    e.unshift(n[o].parent), r = Y(l[n[o].parent][o], r), o = n[o].parent;
  return r.conversion = e, r;
}
function Z(t) {
  const n = K(t), e = {}, r = Object.keys(n);
  for (let { length: o } = r, c = 0; c < o; c++) {
    const s = r[c];
    n[s].parent !== null && (e[s] = J(s, n));
  }
  return e;
}
const g = {}, Q = Object.keys(l);
function V(t) {
  const n = function(...e) {
    const r = e[0];
    return r == null ? r : (r.length > 1 && (e = r), t(e));
  };
  return "conversion" in t && (n.conversion = t.conversion), n;
}
function tt(t) {
  const n = function(...e) {
    const r = e[0];
    if (r == null)
      return r;
    r.length > 1 && (e = r);
    const o = t(e);
    if (typeof o == "object")
      for (let { length: c } = o, s = 0; s < c; s++)
        o[s] = Math.round(o[s]);
    return o;
  };
  return "conversion" in t && (n.conversion = t.conversion), n;
}
for (const t of Q) {
  g[t] = {}, Object.defineProperty(g[t], "channels", { value: l[t].channels }), Object.defineProperty(g[t], "labels", { value: l[t].labels });
  const n = Z(t), e = Object.keys(n);
  for (const r of e) {
    const o = n[r];
    g[t][r] = tt(o), g[t][r].raw = V(o);
  }
}
const B = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  "keyword",
  // Gray conflicts with some method names, and has its own method defined.
  "gray",
  // Shouldn't really be in color-convert either...
  "hex"
], H = {};
for (const t of Object.keys(g))
  H[[...g[t].labels].sort().join("")] = t;
const N = {};
function p(t, n) {
  if (!(this instanceof p))
    return new p(t, n);
  if (n && n in B && (n = null), n && !(n in g))
    throw new Error("Unknown model: " + n);
  let e, r;
  if (t == null)
    this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
  else if (t instanceof p)
    this.model = t.model, this.color = [...t.color], this.valpha = t.valpha;
  else if (typeof t == "string") {
    const o = _.get(t);
    if (o === null)
      throw new Error("Unable to parse color from string: " + t);
    this.model = o.model, r = g[this.model].channels, this.color = o.value.slice(0, r), this.valpha = typeof o.value[r] == "number" ? o.value[r] : 1;
  } else if (t.length > 0) {
    this.model = n || "rgb", r = g[this.model].channels;
    const o = Array.prototype.slice.call(t, 0, r);
    this.color = I(o, r), this.valpha = typeof t[r] == "number" ? t[r] : 1;
  } else if (typeof t == "number")
    this.model = "rgb", this.color = [
      t >> 16 & 255,
      t >> 8 & 255,
      t & 255
    ], this.valpha = 1;
  else {
    this.valpha = 1;
    const o = Object.keys(t);
    "alpha" in t && (o.splice(o.indexOf("alpha"), 1), this.valpha = typeof t.alpha == "number" ? t.alpha : 0);
    const c = o.sort().join("");
    if (!(c in H))
      throw new Error("Unable to parse color from object: " + JSON.stringify(t));
    this.model = H[c];
    const { labels: s } = g[this.model], a = [];
    for (e = 0; e < s.length; e++)
      a.push(t[s[e]]);
    this.color = I(a);
  }
  if (N[this.model])
    for (r = g[this.model].channels, e = 0; e < r; e++) {
      const o = N[this.model][e];
      o && (this.color[e] = o(this.color[e]));
    }
  this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze && Object.freeze(this);
}
p.prototype = {
  toString() {
    return this.string();
  },
  toJSON() {
    return this[this.model]();
  },
  string(t) {
    let n = this.model in _.to ? this : this.rgb();
    n = n.round(typeof t == "number" ? t : 1);
    const e = n.valpha === 1 ? n.color : [...n.color, this.valpha];
    return _.to[n.model](...e);
  },
  percentString(t) {
    const n = this.rgb().round(typeof t == "number" ? t : 1), e = n.valpha === 1 ? n.color : [...n.color, this.valpha];
    return _.to.rgb.percent(...e);
  },
  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
  },
  object() {
    const t = {}, { channels: n } = g[this.model], { labels: e } = g[this.model];
    for (let r = 0; r < n; r++)
      t[e[r]] = this.color[r];
    return this.valpha !== 1 && (t.alpha = this.valpha), t;
  },
  unitArray() {
    const t = this.rgb().color;
    return t[0] /= 255, t[1] /= 255, t[2] /= 255, this.valpha !== 1 && t.push(this.valpha), t;
  },
  unitObject() {
    const t = this.rgb().object();
    return t.r /= 255, t.g /= 255, t.b /= 255, this.valpha !== 1 && (t.alpha = this.valpha), t;
  },
  round(t) {
    return t = Math.max(t || 0, 0), new p([...this.color.map(et(t)), this.valpha], this.model);
  },
  alpha(t) {
    return t !== void 0 ? new p([...this.color, Math.max(0, Math.min(1, t))], this.model) : this.valpha;
  },
  // Rgb
  red: u("rgb", 0, b(255)),
  green: u("rgb", 1, b(255)),
  blue: u("rgb", 2, b(255)),
  hue: u(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (t) => (t % 360 + 360) % 360),
  saturationl: u("hsl", 1, b(100)),
  lightness: u("hsl", 2, b(100)),
  saturationv: u("hsv", 1, b(100)),
  value: u("hsv", 2, b(100)),
  chroma: u("hcg", 1, b(100)),
  gray: u("hcg", 2, b(100)),
  white: u("hwb", 1, b(100)),
  wblack: u("hwb", 2, b(100)),
  cyan: u("cmyk", 0, b(100)),
  magenta: u("cmyk", 1, b(100)),
  yellow: u("cmyk", 2, b(100)),
  black: u("cmyk", 3, b(100)),
  x: u("xyz", 0, b(95.047)),
  y: u("xyz", 1, b(100)),
  z: u("xyz", 2, b(108.833)),
  l: u("lab", 0, b(100)),
  a: u("lab", 1),
  b: u("lab", 2),
  keyword(t) {
    return t !== void 0 ? new p(t) : g[this.model].keyword(this.color);
  },
  hex(t) {
    return t !== void 0 ? new p(t) : _.to.hex(...this.rgb().round().color);
  },
  hexa(t) {
    if (t !== void 0)
      return new p(t);
    const n = this.rgb().round().color;
    let e = Math.round(this.valpha * 255).toString(16).toUpperCase();
    return e.length === 1 && (e = "0" + e), _.to.hex(...n) + e;
  },
  rgbNumber() {
    const t = this.rgb().color;
    return (t[0] & 255) << 16 | (t[1] & 255) << 8 | t[2] & 255;
  },
  luminosity() {
    const t = this.rgb().color, n = [];
    for (const [e, r] of t.entries()) {
      const o = r / 255;
      n[e] = o <= 0.04045 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
  },
  contrast(t) {
    const n = this.luminosity(), e = t.luminosity();
    return n > e ? (n + 0.05) / (e + 0.05) : (e + 0.05) / (n + 0.05);
  },
  level(t) {
    const n = this.contrast(t);
    return n >= 7 ? "AAA" : n >= 4.5 ? "AA" : "";
  },
  isDark() {
    const t = this.rgb().color;
    return (t[0] * 2126 + t[1] * 7152 + t[2] * 722) / 1e4 < 128;
  },
  isLight() {
    return !this.isDark();
  },
  negate() {
    const t = this.rgb();
    for (let n = 0; n < 3; n++)
      t.color[n] = 255 - t.color[n];
    return t;
  },
  lighten(t) {
    const n = this.hsl();
    return n.color[2] += n.color[2] * t, n;
  },
  darken(t) {
    const n = this.hsl();
    return n.color[2] -= n.color[2] * t, n;
  },
  saturate(t) {
    const n = this.hsl();
    return n.color[1] += n.color[1] * t, n;
  },
  desaturate(t) {
    const n = this.hsl();
    return n.color[1] -= n.color[1] * t, n;
  },
  whiten(t) {
    const n = this.hwb();
    return n.color[1] += n.color[1] * t, n;
  },
  blacken(t) {
    const n = this.hwb();
    return n.color[2] += n.color[2] * t, n;
  },
  grayscale() {
    const t = this.rgb().color, n = t[0] * 0.3 + t[1] * 0.59 + t[2] * 0.11;
    return p.rgb(n, n, n);
  },
  fade(t) {
    return this.alpha(this.valpha - this.valpha * t);
  },
  opaquer(t) {
    return this.alpha(this.valpha + this.valpha * t);
  },
  rotate(t) {
    const n = this.hsl();
    let e = n.color[0];
    return e = (e + t) % 360, e = e < 0 ? 360 + e : e, n.color[0] = e, n;
  },
  mix(t, n) {
    if (!t || !t.rgb)
      throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof t);
    const e = t.rgb(), r = this.rgb(), o = n === void 0 ? 0.5 : n, c = 2 * o - 1, s = e.alpha() - r.alpha(), a = ((c * s === -1 ? c : (c + s) / (1 + c * s)) + 1) / 2, i = 1 - a;
    return p.rgb(
      a * e.red() + i * r.red(),
      a * e.green() + i * r.green(),
      a * e.blue() + i * r.blue(),
      e.alpha() * o + r.alpha() * (1 - o)
    );
  }
};
for (const t of Object.keys(g)) {
  if (B.includes(t))
    continue;
  const { channels: n } = g[t];
  p.prototype[t] = function(...e) {
    return this.model === t ? new p(this) : e.length > 0 ? new p(e, t) : new p([...rt(g[this.model][t].raw(this.color)), this.valpha], t);
  }, p[t] = function(...e) {
    let r = e[0];
    return typeof r == "number" && (r = I(e, n)), new p(r, t);
  };
}
function nt(t, n) {
  return Number(t.toFixed(n));
}
function et(t) {
  return function(n) {
    return nt(n, t);
  };
}
function u(t, n, e) {
  t = Array.isArray(t) ? t : [t];
  for (const r of t)
    (N[r] ||= [])[n] = e;
  return t = t[0], function(r) {
    let o;
    return r !== void 0 ? (e && (r = e(r)), o = this[t](), o.color[n] = r, o) : (o = this[t]().color[n], e && (o = e(o)), o);
  };
}
function b(t) {
  return function(n) {
    return Math.max(0, Math.min(t, n));
  };
}
function rt(t) {
  return Array.isArray(t) ? t : [t];
}
function I(t, n) {
  for (let e = 0; e < n; e++)
    typeof t[e] != "number" && (t[e] = 0);
  return t;
}
const _t = {
  channel: "channel",
  channels: "channels",
  colorField: "color-field",
  colorFieldScope: "scope--color-field",
  colorMode: "color-mode",
  colorModeContainer: "color-mode-container",
  container: "container",
  control: "control",
  controlAndScope: "control-and-scope",
  controlSection: "control-section",
  deleteColor: "delete-color",
  header: "header",
  hexAndChannelsGroup: "hex-and-channels-group",
  hexOptions: "color-hex-options",
  hueScope: "scope--hue",
  hueSlider: "hue-slider",
  opacityScope: "scope--opacity",
  opacitySlider: "opacity-slider",
  preview: "preview",
  previewAndSliders: "preview-and-sliders",
  saveColor: "save-color",
  savedColor: "saved-color",
  savedColorsButtons: "saved-colors-buttons",
  savedColorsSection: "saved-colors-section",
  scope: "scope",
  section: "section",
  slider: "slider",
  sliders: "sliders",
  splitSection: "section--split",
  swatchGroup: "swatch-group"
}, gt = p("#007AC2"), mt = "calcite-color-", yt = {
  r: 255,
  g: 255,
  b: 255
}, ot = {
  h: 360,
  s: 100,
  v: 100
}, wt = ot.h - 1, St = {
  min: 0,
  max: 100
}, st = {
  s: {
    gap: parseInt(X, 10),
    slider: {
      height: 12
    },
    thumb: {
      radius: 7
    },
    preview: {
      size: 20
    },
    minWidth: 200
  },
  m: {
    gap: parseInt(j, 10),
    slider: {
      height: 12
    },
    thumb: {
      radius: 7
    },
    preview: {
      size: 24
    },
    minWidth: 240
  },
  l: {
    gap: parseInt(P, 10),
    slider: {
      height: 12
    },
    thumb: {
      radius: 7
    },
    preview: {
      size: 32
    },
    minWidth: 304
  }
}, vt = 1, kt = {
  minus: "minus",
  plus: "plus"
}, Mt = /^[0-9A-F]$/i, ct = /^#[0-9A-F]{3}$/i, at = /^#[0-9A-F]{6}$/i, it = /^#[0-9A-F]{4}$/i, lt = /^#[0-9A-F]{8}$/i;
function xt(t, n = !1, e) {
  if (!(n && !t))
    return p(
      t != null && typeof t == "object" && dt(e) ? ft(t) : t
    );
}
const At = (t) => Number((t * 100).toFixed()), Ft = (t) => Number((t / 100).toFixed(2));
function ht(t, n = !1) {
  return O(t, n) || ut(t, n);
}
function G(t, n, e) {
  return t ? t.length === n && e.test(t) : !1;
}
function O(t, n = !1) {
  return G(t, n ? 5 : 4, n ? it : ct);
}
function ut(t, n = !1) {
  return G(t, n ? 9 : 7, n ? lt : at);
}
function Ct(t, n = !1, e = !1) {
  if (t = t.toLowerCase(), t.startsWith("#") || (t = `#${t}`), O(t, n))
    return L(z(t));
  if (n && e && ht(
    t,
    !1
    /* we only care about RGB hex for conversion */
  )) {
    const r = O(t, !1);
    return L(z(`${t}${r ? "f" : "ff"}`));
  }
  return t;
}
function Ht(t, n = !1) {
  return n ? t.hexa() : t.hex();
}
function L(t) {
  const { r: n, g: e, b: r } = t, o = F(n), c = F(e), s = F(r), a = "a" in t ? F(t.a * 255) : "";
  return `#${o}${c}${s}${a}`.toLowerCase();
}
function F(t) {
  return t.toString(16).padStart(2, "0");
}
function Nt(t) {
  return {
    ...R(t, ["alpha"]),
    a: t.alpha ?? 1
    /* Color() will omit alpha if 1 */
  };
}
function ft(t) {
  return { ...R(t, ["a"]), alpha: t.a ?? 1 };
}
function z(t) {
  t = t.replace("#", "");
  let n, e, r, o;
  if (t.length === 3 || t.length === 4) {
    const [s, a, i, h] = t.split("");
    n = parseInt(`${s}${s}`, 16), e = parseInt(`${a}${a}`, 16), r = parseInt(`${i}${i}`, 16), o = parseInt(`${h}${h}`, 16) / 255;
  } else
    n = parseInt(t.slice(0, 2), 16), e = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16), o = parseInt(t.slice(6, 8), 16) / 255;
  return isNaN(o) ? { r: n, g: e, b: r } : { r: n, g: e, b: r, a: o };
}
const T = (t) => t, f = T({
  HEX: "hex",
  HEXA: "hexa",
  RGB_CSS: "rgb-css",
  RGBA_CSS: "rgba-css",
  HSL_CSS: "hsl-css",
  HSLA_CSS: "hsla-css"
}), d = T({
  RGB: "rgb",
  RGBA: "rgba",
  HSL: "hsl",
  HSLA: "hsla",
  HSV: "hsv",
  HSVA: "hsva"
});
function It(t) {
  if (typeof t == "string") {
    if (t.startsWith("#")) {
      const { length: n } = t;
      if (n === 4 || n === 7)
        return f.HEX;
      if (n === 5 || n === 9)
        return f.HEXA;
    }
    if (t.startsWith("rgba("))
      return f.RGBA_CSS;
    if (t.startsWith("rgb("))
      return f.RGB_CSS;
    if (t.startsWith("hsl("))
      return f.HSL_CSS;
    if (t.startsWith("hsla("))
      return f.HSLA_CSS;
  }
  if (typeof t == "object") {
    if (k(t, "r", "g", "b"))
      return k(t, "a") ? d.RGBA : d.RGB;
    if (k(t, "h", "s", "l"))
      return k(t, "a") ? d.HSLA : d.HSL;
    if (k(t, "h", "s", "v"))
      return k(t, "a") ? d.HSVA : d.HSV;
  }
}
function k(t, ...n) {
  return n.every((e) => e && t && `${e}` in t);
}
function Ot(t, n) {
  return t?.rgb().array().toString() === n?.rgb().array().toString();
}
function dt(t) {
  return t === f.HEXA || t === f.RGBA_CSS || t === f.HSLA_CSS || t === d.RGBA || t === d.HSLA || t === d.HSVA;
}
function Lt(t) {
  return t === f.HEX ? f.HEXA : t === f.RGB_CSS ? f.RGBA_CSS : t === f.HSL_CSS ? f.HSLA_CSS : t === d.RGB ? d.RGBA : t === d.HSL ? d.HSLA : t === d.HSV ? d.HSVA : t;
}
function zt(t) {
  return t === f.HEXA ? f.HEX : t === f.RGBA_CSS ? f.RGB_CSS : t === f.HSLA_CSS ? f.HSL_CSS : t === d.RGBA ? d.RGB : t === d.HSLA ? d.HSL : t === d.HSVA ? d.HSV : t;
}
const bt = 1, q = bt * 2;
function Rt(t, n, e) {
  const r = e ? st.l.preview.size : n.preview.size, o = t - q, c = n.gap * 3;
  return Math.max(o - c - r, 0);
}
function Et(t) {
  const e = t - q;
  return {
    width: Math.max(e, 0),
    height: Math.max(Math.floor(e / 1.8), 0)
  };
}
export {
  f as C,
  gt as D,
  ot as H,
  kt as I,
  St as O,
  yt as R,
  st as S,
  Et as a,
  mt as b,
  xt as c,
  dt as d,
  Ot as e,
  p as f,
  Rt as g,
  Ht as h,
  _t as i,
  zt as j,
  wt as k,
  Nt as l,
  At as m,
  Ct as n,
  Ft as o,
  It as p,
  vt as q,
  ht as r,
  ut as s,
  Lt as t,
  O as u,
  L as v,
  Mt as w,
  z as x
};
