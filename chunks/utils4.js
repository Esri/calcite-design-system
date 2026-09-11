/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as X, i as D, j as U } from "./global.js";
function E(t, e) {
  const n = { ...t };
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    delete n[o];
  }
  return n;
}
const H = {
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
for (const t in H) Object.freeze(H[t]);
const x = Object.freeze(H), q = /* @__PURE__ */ Object.create(null);
for (const t in x)
  Object.hasOwn(x, t) && (q[x[t]] = t);
const p = {
  to: {},
  get: {}
};
p.get = function(t) {
  const e = t.slice(0, 3).toLowerCase();
  let n, r;
  switch (e) {
    case "hsl": {
      n = p.get.hsl(t), r = "hsl";
      break;
    }
    case "hwb": {
      n = p.get.hwb(t), r = "hwb";
      break;
    }
    default: {
      n = p.get.rgb(t), r = "rgb";
      break;
    }
  }
  return n ? { model: r, value: n } : null;
};
p.get.rgb = function(t) {
  if (!t)
    return null;
  const e = /^#([a-f\d]{3,4})$/i, n = /^#([a-f\d]{6})([a-f\d]{2})?$/i, r = /^rgba?\(\s*([+-]?(?:\d*\.)?\d+(?:e\d+)?)(?=[\s,])\s*(?:,\s*)?([+-]?(?:\d*\.)?\d+(?:e\d+)?)(?=[\s,])\s*(?:,\s*)?([+-]?(?:\d*\.)?\d+(?:e\d+)?)\s*(?:[\s,|/]\s*([+-]?(?:\d*\.)?\d+(?:e\d+)?)(%?)\s*)?\)$/i, o = /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[\s,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/i, a = /^(\w+)$/;
  let s = [0, 0, 0, 1], l, i, h;
  if (l = t.match(n)) {
    for (h = l[2], l = l[1], i = 0; i < 3; i++) {
      const m = i * 2;
      s[i] = Number.parseInt(l.slice(m, m + 2), 16);
    }
    h && (s[3] = Number.parseInt(h, 16) / 255);
  } else if (l = t.match(e)) {
    for (l = l[1], h = l[3], i = 0; i < 3; i++)
      s[i] = Number.parseInt(l[i] + l[i], 16);
    h && (s[3] = Number.parseInt(h + h, 16) / 255);
  } else if (l = t.match(r)) {
    for (i = 0; i < 3; i++)
      s[i] = Number.parseFloat(l[i + 1]);
    l[4] && (s[3] = l[5] ? Number.parseFloat(l[4]) * 0.01 : Number.parseFloat(l[4]));
  } else if (l = t.match(o)) {
    for (i = 0; i < 3; i++)
      s[i] = Math.round(Number.parseFloat(l[i + 1]) * 2.55);
    l[4] && (s[3] = l[5] ? Number.parseFloat(l[4]) * 0.01 : Number.parseFloat(l[4]));
  } else return (l = t.toLowerCase().match(a)) ? l[1] === "transparent" ? [0, 0, 0, 0] : Object.hasOwn(x, l[1]) ? (s = x[l[1]].slice(), s[3] = 1, s) : null : null;
  for (i = 0; i < 3; i++)
    s[i] = k(s[i], 0, 255);
  return s[3] = k(s[3], 0, 1), s;
};
p.get.hsl = function(t) {
  if (!t)
    return null;
  const e = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:e[+-]?\d+)?)\s*)?\)$/i, n = t.match(e);
  if (n) {
    const r = Number.parseFloat(n[4]), o = (Number.parseFloat(n[1]) % 360 + 360) % 360, a = k(Number.parseFloat(n[2]), 0, 100), s = k(Number.parseFloat(n[3]), 0, 100), l = k(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, a, s, l];
  }
  return null;
};
p.get.hwb = function(t) {
  if (!t)
    return null;
  const e = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*[\s,]\s*([+-]?[\d.]+)%\s*[\s,]\s*([+-]?[\d.]+)%\s*(?:[\s,]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:e[+-]?\d+)?)\s*)?\)$/i, n = t.match(e);
  if (n) {
    const r = Number.parseFloat(n[4]), o = (Number.parseFloat(n[1]) % 360 + 360) % 360, a = k(Number.parseFloat(n[2]), 0, 100), s = k(Number.parseFloat(n[3]), 0, 100), l = k(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, a, s, l];
  }
  return null;
};
p.to.hex = function(...t) {
  return "#" + F(t[0]) + F(t[1]) + F(t[2]) + (t[3] < 1 ? F(Math.round(t[3] * 255)) : "");
};
p.to.rgb = function(...t) {
  return t.length < 4 || t[3] === 1 ? "rgb(" + Math.round(t[0]) + ", " + Math.round(t[1]) + ", " + Math.round(t[2]) + ")" : "rgba(" + Math.round(t[0]) + ", " + Math.round(t[1]) + ", " + Math.round(t[2]) + ", " + t[3] + ")";
};
p.to.rgb.percent = function(...t) {
  const e = Math.round(t[0] / 255 * 100), n = Math.round(t[1] / 255 * 100), r = Math.round(t[2] / 255 * 100);
  return t.length < 4 || t[3] === 1 ? "rgb(" + e + "%, " + n + "%, " + r + "%)" : "rgba(" + e + "%, " + n + "%, " + r + "%, " + t[3] + ")";
};
p.to.hsl = function(...t) {
  return t.length < 4 || t[3] === 1 ? "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)" : "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + t[3] + ")";
};
p.to.hwb = function(...t) {
  let e = "";
  return t.length >= 4 && t[3] !== 1 && (e = ", " + t[3]), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + e + ")";
};
p.to.keyword = function(...t) {
  return q[t.slice(0, 3)];
};
function k(t, e, n) {
  return Math.min(Math.max(e, t), n);
}
function F(t) {
  const e = Math.round(t).toString(16).toUpperCase();
  return e.length < 2 ? "0" + e : e;
}
const N = {
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
for (const t in N) Object.freeze(N[t]);
const A = Object.freeze(N), B = {};
for (const t of Object.keys(A))
  B[A[t]] = t;
const c = {
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
}, w = (6 / 29) ** 3;
function S(t) {
  const e = t > 31308e-7 ? 1.055 * t ** 0.4166666666666667 - 0.055 : t * 12.92;
  return Math.min(Math.max(0, e), 1);
}
function M(t) {
  return t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92;
}
for (const t of Object.keys(c)) {
  if (!("channels" in c[t]))
    throw new Error("missing channels property: " + t);
  if (!("labels" in c[t]))
    throw new Error("missing channel labels property: " + t);
  if (c[t].labels.length !== c[t].channels)
    throw new Error("channel and label counts mismatch: " + t);
  const { channels: e, labels: n } = c[t];
  delete c[t].channels, delete c[t].labels, Object.defineProperty(c[t], "channels", { value: e }), Object.defineProperty(c[t], "labels", { value: n });
}
c.rgb.hsl = function(t) {
  const e = t[0] / 255, n = t[1] / 255, r = t[2] / 255, o = Math.min(e, n, r), a = Math.max(e, n, r), s = a - o;
  let l, i;
  switch (a) {
    case o: {
      l = 0;
      break;
    }
    case e: {
      l = (n - r) / s;
      break;
    }
    case n: {
      l = 2 + (r - e) / s;
      break;
    }
    case r: {
      l = 4 + (e - n) / s;
      break;
    }
  }
  l = Math.min(l * 60, 360), l < 0 && (l += 360);
  const h = (o + a) / 2;
  return a === o ? i = 0 : h <= 0.5 ? i = s / (a + o) : i = s / (2 - a - o), [l, i * 100, h * 100];
};
c.rgb.hsv = function(t) {
  let e, n, r, o, a;
  const s = t[0] / 255, l = t[1] / 255, i = t[2] / 255, h = Math.max(s, l, i), m = h - Math.min(s, l, i), y = function(P) {
    return (h - P) / 6 / m + 1 / 2;
  };
  if (m === 0)
    o = 0, a = 0;
  else {
    switch (a = m / h, e = y(s), n = y(l), r = y(i), h) {
      case s: {
        o = r - n;
        break;
      }
      case l: {
        o = 1 / 3 + e - r;
        break;
      }
      case i: {
        o = 2 / 3 + n - e;
        break;
      }
    }
    o < 0 ? o += 1 : o > 1 && (o -= 1);
  }
  return [
    o * 360,
    a * 100,
    h * 100
  ];
};
c.rgb.hwb = function(t) {
  const e = t[0], n = t[1];
  let r = t[2];
  const o = c.rgb.hsl(t)[0], a = 1 / 255 * Math.min(e, Math.min(n, r));
  return r = 1 - 1 / 255 * Math.max(e, Math.max(n, r)), [o, a * 100, r * 100];
};
c.rgb.oklab = function(t) {
  const e = M(t[0] / 255), n = M(t[1] / 255), r = M(t[2] / 255), o = Math.cbrt(0.4122214708 * e + 0.5363325363 * n + 0.0514459929 * r), a = Math.cbrt(0.2119034982 * e + 0.6806995451 * n + 0.1073969566 * r), s = Math.cbrt(0.0883024619 * e + 0.2817188376 * n + 0.6299787005 * r), l = 0.2104542553 * o + 0.793617785 * a - 0.0040720468 * s, i = 1.9779984951 * o - 2.428592205 * a + 0.4505937099 * s, h = 0.0259040371 * o + 0.7827717662 * a - 0.808675766 * s;
  return [l * 100, i * 100, h * 100];
};
c.rgb.cmyk = function(t) {
  const e = t[0] / 255, n = t[1] / 255, r = t[2] / 255, o = Math.min(1 - e, 1 - n, 1 - r), a = (1 - e - o) / (1 - o) || 0, s = (1 - n - o) / (1 - o) || 0, l = (1 - r - o) / (1 - o) || 0;
  return [a * 100, s * 100, l * 100, o * 100];
};
function K(t, e) {
  return (t[0] - e[0]) ** 2 + (t[1] - e[1]) ** 2 + (t[2] - e[2]) ** 2;
}
c.rgb.keyword = function(t) {
  const e = B[t];
  if (e)
    return e;
  let n = Number.POSITIVE_INFINITY, r;
  for (const o of Object.keys(A)) {
    const a = A[o], s = K(t, a);
    s < n && (n = s, r = o);
  }
  return r;
};
c.keyword.rgb = function(t) {
  return [...A[t]];
};
c.rgb.xyz = function(t) {
  const e = M(t[0] / 255), n = M(t[1] / 255), r = M(t[2] / 255), o = e * 0.4124564 + n * 0.3575761 + r * 0.1804375, a = e * 0.2126729 + n * 0.7151522 + r * 0.072175, s = e * 0.0193339 + n * 0.119192 + r * 0.9503041;
  return [o * 100, a * 100, s * 100];
};
c.rgb.lab = function(t) {
  const e = c.rgb.xyz(t);
  let n = e[0], r = e[1], o = e[2];
  n /= 95.047, r /= 100, o /= 108.883, n = n > w ? n ** (1 / 3) : 7.787 * n + 16 / 116, r = r > w ? r ** (1 / 3) : 7.787 * r + 16 / 116, o = o > w ? o ** (1 / 3) : 7.787 * o + 16 / 116;
  const a = 116 * r - 16, s = 500 * (n - r), l = 200 * (r - o);
  return [a, s, l];
};
c.hsl.rgb = function(t) {
  const e = t[0] / 360, n = t[1] / 100, r = t[2] / 100;
  let o, a;
  if (n === 0)
    return a = r * 255, [a, a, a];
  const s = r < 0.5 ? r * (1 + n) : r + n - r * n, l = 2 * r - s, i = [0, 0, 0];
  for (let h = 0; h < 3; h++)
    o = e + 1 / 3 * -(h - 1), o < 0 && o++, o > 1 && o--, 6 * o < 1 ? a = l + (s - l) * 6 * o : 2 * o < 1 ? a = s : 3 * o < 2 ? a = l + (s - l) * (2 / 3 - o) * 6 : a = l, i[h] = a * 255;
  return i;
};
c.hsl.hsv = function(t) {
  const e = t[0];
  let n = t[1] / 100, r = t[2] / 100, o = n;
  const a = Math.max(r, 0.01);
  r *= 2, n *= r <= 1 ? r : 2 - r, o *= a <= 1 ? a : 2 - a;
  const s = (r + n) / 2, l = r === 0 ? 2 * o / (a + o) : 2 * n / (r + n);
  return [e, l * 100, s * 100];
};
c.hsv.rgb = function(t) {
  const e = t[0] / 60, n = t[1] / 100;
  let r = t[2] / 100;
  const o = Math.floor(e) % 6, a = e - Math.floor(e), s = 255 * r * (1 - n), l = 255 * r * (1 - n * a), i = 255 * r * (1 - n * (1 - a));
  switch (r *= 255, o) {
    case 0:
      return [r, i, s];
    case 1:
      return [l, r, s];
    case 2:
      return [s, r, i];
    case 3:
      return [s, l, r];
    case 4:
      return [i, s, r];
    case 5:
      return [r, s, l];
  }
};
c.hsv.hsl = function(t) {
  const e = t[0], n = t[1] / 100, r = t[2] / 100, o = Math.max(r, 0.01);
  let a, s;
  s = (2 - n) * r;
  const l = (2 - n) * o;
  return a = n * o, a /= l <= 1 ? l : 2 - l, a = a || 0, s /= 2, [e, a * 100, s * 100];
};
c.hwb.rgb = function(t) {
  const e = t[0] / 360;
  let n = t[1] / 100, r = t[2] / 100;
  const o = n + r;
  let a;
  o > 1 && (n /= o, r /= o);
  const s = Math.floor(6 * e), l = 1 - r;
  a = 6 * e - s, (s & 1) !== 0 && (a = 1 - a);
  const i = n + a * (l - n);
  let h, m, y;
  switch (s) {
    default:
    case 6:
    case 0: {
      h = l, m = i, y = n;
      break;
    }
    case 1: {
      h = i, m = l, y = n;
      break;
    }
    case 2: {
      h = n, m = l, y = i;
      break;
    }
    case 3: {
      h = n, m = i, y = l;
      break;
    }
    case 4: {
      h = i, m = n, y = l;
      break;
    }
    case 5: {
      h = l, m = n, y = i;
      break;
    }
  }
  return [h * 255, m * 255, y * 255];
};
c.cmyk.rgb = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100, o = t[3] / 100, a = 1 - Math.min(1, e * (1 - o) + o), s = 1 - Math.min(1, n * (1 - o) + o), l = 1 - Math.min(1, r * (1 - o) + o);
  return [a * 255, s * 255, l * 255];
};
c.xyz.rgb = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100;
  let o, a, s;
  return o = e * 3.2404542 + n * -1.5371385 + r * -0.4985314, a = e * -0.969266 + n * 1.8760108 + r * 0.041556, s = e * 0.0556434 + n * -0.2040259 + r * 1.0572252, o = S(o), a = S(a), s = S(s), [o * 255, a * 255, s * 255];
};
c.xyz.lab = function(t) {
  let e = t[0], n = t[1], r = t[2];
  e /= 95.047, n /= 100, r /= 108.883, e = e > w ? e ** (1 / 3) : 7.787 * e + 16 / 116, n = n > w ? n ** (1 / 3) : 7.787 * n + 16 / 116, r = r > w ? r ** (1 / 3) : 7.787 * r + 16 / 116;
  const o = 116 * n - 16, a = 500 * (e - n), s = 200 * (n - r);
  return [o, a, s];
};
c.xyz.oklab = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100, o = Math.cbrt(0.8189330101 * e + 0.3618667424 * n - 0.1288597137 * r), a = Math.cbrt(0.0329845436 * e + 0.9293118715 * n + 0.0361456387 * r), s = Math.cbrt(0.0482003018 * e + 0.2643662691 * n + 0.633851707 * r), l = 0.2104542553 * o + 0.793617785 * a - 0.0040720468 * s, i = 1.9779984951 * o - 2.428592205 * a + 0.4505937099 * s, h = 0.0259040371 * o + 0.7827717662 * a - 0.808675766 * s;
  return [l * 100, i * 100, h * 100];
};
c.oklab.oklch = function(t) {
  return c.lab.lch(t);
};
c.oklab.xyz = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100, o = (0.999999998 * e + 0.396337792 * n + 0.215803758 * r) ** 3, a = (1.000000008 * e - 0.105561342 * n - 0.063854175 * r) ** 3, s = (1.000000055 * e - 0.089484182 * n - 1.291485538 * r) ** 3, l = 1.227013851 * o - 0.55779998 * a + 0.281256149 * s, i = -0.040580178 * o + 1.11225687 * a - 0.071676679 * s, h = -0.076381285 * o - 0.421481978 * a + 1.58616322 * s;
  return [l * 100, i * 100, h * 100];
};
c.oklab.rgb = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100, o = (e + 0.3963377774 * n + 0.2158037573 * r) ** 3, a = (e - 0.1055613458 * n - 0.0638541728 * r) ** 3, s = (e - 0.0894841775 * n - 1.291485548 * r) ** 3, l = S(4.0767416621 * o - 3.3077115913 * a + 0.2309699292 * s), i = S(-1.2684380046 * o + 2.6097574011 * a - 0.3413193965 * s), h = S(-0.0041960863 * o - 0.7034186147 * a + 1.707614701 * s);
  return [l * 255, i * 255, h * 255];
};
c.oklch.oklab = function(t) {
  return c.lch.lab(t);
};
c.lab.xyz = function(t) {
  const e = t[0], n = t[1], r = t[2];
  let o, a, s;
  a = (e + 16) / 116, o = n / 500 + a, s = a - r / 200;
  const l = a ** 3, i = o ** 3, h = s ** 3;
  return a = l > w ? l : (a - 16 / 116) / 7.787, o = i > w ? i : (o - 16 / 116) / 7.787, s = h > w ? h : (s - 16 / 116) / 7.787, o *= 95.047, a *= 100, s *= 108.883, [o, a, s];
};
c.lab.lch = function(t) {
  const e = t[0], n = t[1], r = t[2];
  let o;
  o = Math.atan2(r, n) * 360 / 2 / Math.PI, o < 0 && (o += 360);
  const s = Math.sqrt(n * n + r * r);
  return [e, s, o];
};
c.lch.lab = function(t) {
  const e = t[0], n = t[1], o = t[2] / 360 * 2 * Math.PI, a = n * Math.cos(o), s = n * Math.sin(o);
  return [e, a, s];
};
c.rgb.ansi16 = function(t, e = null) {
  const [n, r, o] = t;
  let a = e === null ? c.rgb.hsv(t)[2] : e;
  if (a = Math.round(a / 50), a === 0)
    return 30;
  let s = 30 + (Math.round(o / 255) << 2 | Math.round(r / 255) << 1 | Math.round(n / 255));
  return a === 2 && (s += 60), s;
};
c.hsv.ansi16 = function(t) {
  return c.rgb.ansi16(c.hsv.rgb(t), t[2]);
};
c.rgb.ansi256 = function(t) {
  const e = t[0], n = t[1], r = t[2];
  return e >> 4 === n >> 4 && n >> 4 === r >> 4 ? e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(r / 255 * 5);
};
c.ansi16.rgb = function(t) {
  t = t[0];
  let e = t % 10;
  if (e === 0 || e === 7)
    return t > 50 && (e += 3.5), e = e / 10.5 * 255, [e, e, e];
  const n = (Math.trunc(t > 50) + 1) * 0.5, r = (e & 1) * n * 255, o = (e >> 1 & 1) * n * 255, a = (e >> 2 & 1) * n * 255;
  return [r, o, a];
};
c.ansi256.rgb = function(t) {
  if (t = t[0], t >= 232) {
    const a = (t - 232) * 10 + 8;
    return [a, a, a];
  }
  t -= 16;
  let e;
  const n = Math.floor(t / 36) / 5 * 255, r = Math.floor((e = t % 36) / 6) / 5 * 255, o = e % 6 / 5 * 255;
  return [n, r, o];
};
c.rgb.hex = function(t) {
  const n = (((Math.round(t[0]) & 255) << 16) + ((Math.round(t[1]) & 255) << 8) + (Math.round(t[2]) & 255)).toString(16).toUpperCase();
  return "000000".slice(n.length) + n;
};
c.hex.rgb = function(t) {
  const e = t.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);
  if (!e)
    return [0, 0, 0];
  let n = e[0];
  e[0].length === 3 && (n = [...n].map((l) => l + l).join(""));
  const r = Number.parseInt(n, 16), o = r >> 16 & 255, a = r >> 8 & 255, s = r & 255;
  return [o, a, s];
};
c.rgb.hcg = function(t) {
  const e = t[0] / 255, n = t[1] / 255, r = t[2] / 255, o = Math.max(Math.max(e, n), r), a = Math.min(Math.min(e, n), r), s = o - a;
  let l;
  const i = s < 1 ? a / (1 - s) : 0;
  return s <= 0 ? l = 0 : o === e ? l = (n - r) / s % 6 : o === n ? l = 2 + (r - e) / s : l = 4 + (e - n) / s, l /= 6, l %= 1, [l * 360, s * 100, i * 100];
};
c.hsl.hcg = function(t) {
  const e = t[1] / 100, n = t[2] / 100, r = n < 0.5 ? 2 * e * n : 2 * e * (1 - n);
  let o = 0;
  return r < 1 && (o = (n - 0.5 * r) / (1 - r)), [t[0], r * 100, o * 100];
};
c.hsv.hcg = function(t) {
  const e = t[1] / 100, n = t[2] / 100, r = e * n;
  let o = 0;
  return r < 1 && (o = (n - r) / (1 - r)), [t[0], r * 100, o * 100];
};
c.hcg.rgb = function(t) {
  const e = t[0] / 360, n = t[1] / 100, r = t[2] / 100;
  if (n === 0)
    return [r * 255, r * 255, r * 255];
  const o = [0, 0, 0], a = e % 1 * 6, s = a % 1, l = 1 - s;
  let i = 0;
  switch (Math.floor(a)) {
    case 0: {
      o[0] = 1, o[1] = s, o[2] = 0;
      break;
    }
    case 1: {
      o[0] = l, o[1] = 1, o[2] = 0;
      break;
    }
    case 2: {
      o[0] = 0, o[1] = 1, o[2] = s;
      break;
    }
    case 3: {
      o[0] = 0, o[1] = l, o[2] = 1;
      break;
    }
    case 4: {
      o[0] = s, o[1] = 0, o[2] = 1;
      break;
    }
    default:
      o[0] = 1, o[1] = 0, o[2] = l;
  }
  return i = (1 - n) * r, [
    (n * o[0] + i) * 255,
    (n * o[1] + i) * 255,
    (n * o[2] + i) * 255
  ];
};
c.hcg.hsv = function(t) {
  const e = t[1] / 100, n = t[2] / 100, r = e + n * (1 - e);
  let o = 0;
  return r > 0 && (o = e / r), [t[0], o * 100, r * 100];
};
c.hcg.hsl = function(t) {
  const e = t[1] / 100, r = t[2] / 100 * (1 - e) + 0.5 * e;
  let o = 0;
  return r > 0 && r < 0.5 ? o = e / (2 * r) : r >= 0.5 && r < 1 && (o = e / (2 * (1 - r))), [t[0], o * 100, r * 100];
};
c.hcg.hwb = function(t) {
  const e = t[1] / 100, n = t[2] / 100, r = e + n * (1 - e);
  return [t[0], (r - e) * 100, (1 - r) * 100];
};
c.hwb.hcg = function(t) {
  const e = t[1] / 100, r = 1 - t[2] / 100, o = r - e;
  let a = 0;
  return o < 1 && (a = (r - o) / (1 - o)), [t[0], o * 100, a * 100];
};
c.apple.rgb = function(t) {
  return [t[0] / 65535 * 255, t[1] / 65535 * 255, t[2] / 65535 * 255];
};
c.rgb.apple = function(t) {
  return [t[0] / 255 * 65535, t[1] / 255 * 65535, t[2] / 255 * 65535];
};
c.gray.rgb = function(t) {
  return [t[0] / 100 * 255, t[0] / 100 * 255, t[0] / 100 * 255];
};
c.gray.hsl = function(t) {
  return [0, 0, t[0]];
};
c.gray.hsv = c.gray.hsl;
c.gray.hwb = function(t) {
  return [0, 100, t[0]];
};
c.gray.cmyk = function(t) {
  return [0, 0, 0, t[0]];
};
c.gray.lab = function(t) {
  return [t[0], 0, 0];
};
c.gray.hex = function(t) {
  const e = Math.round(t[0] / 100 * 255) & 255, r = ((e << 16) + (e << 8) + e).toString(16).toUpperCase();
  return "000000".slice(r.length) + r;
};
c.rgb.gray = function(t) {
  return [(t[0] + t[1] + t[2]) / 3 / 255 * 100];
};
function Y() {
  const t = {}, e = Object.keys(c);
  for (let { length: n } = e, r = 0; r < n; r++)
    t[e[r]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  return t;
}
function J(t) {
  const e = Y(), n = [t];
  for (e[t].distance = 0; n.length > 0; ) {
    const r = n.pop(), o = Object.keys(c[r]);
    for (let { length: a } = o, s = 0; s < a; s++) {
      const l = o[s], i = e[l];
      i.distance === -1 && (i.distance = e[r].distance + 1, i.parent = r, n.unshift(l));
    }
  }
  return e;
}
function Z(t, e) {
  return function(n) {
    return e(t(n));
  };
}
function Q(t, e) {
  const n = [e[t].parent, t];
  let r = c[e[t].parent][t], o = e[t].parent;
  for (; e[o].parent; )
    n.unshift(e[o].parent), r = Z(c[e[o].parent][o], r), o = e[o].parent;
  return r.conversion = n, r;
}
function V(t) {
  const e = J(t), n = {}, r = Object.keys(e);
  for (let { length: o } = r, a = 0; a < o; a++) {
    const s = r[a];
    e[s].parent !== null && (n[s] = Q(s, e));
  }
  return n;
}
const _ = {}, tt = Object.keys(c);
function et(t) {
  const e = function(...n) {
    const r = n[0];
    return r == null ? r : (r.length > 1 && (n = r), t(n));
  };
  return "conversion" in t && (e.conversion = t.conversion), e;
}
function nt(t) {
  const e = function(...n) {
    const r = n[0];
    if (r == null)
      return r;
    r.length > 1 && (n = r);
    const o = t(n);
    if (typeof o == "object")
      for (let { length: a } = o, s = 0; s < a; s++)
        o[s] = Math.round(o[s]);
    return o;
  };
  return "conversion" in t && (e.conversion = t.conversion), e;
}
for (const t of tt) {
  _[t] = {}, Object.defineProperty(_[t], "channels", { value: c[t].channels }), Object.defineProperty(_[t], "labels", { value: c[t].labels });
  const e = V(t), n = Object.keys(e);
  for (const r of n) {
    const o = e[r];
    _[t][r] = nt(o), _[t][r].raw = et(o);
  }
}
const G = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  "keyword",
  // Gray conflicts with some method names, and has its own method defined.
  "gray",
  // Shouldn't really be in color-convert either...
  "hex"
], I = {};
for (const t of Object.keys(_))
  I[[..._[t].labels].sort().join("")] = t;
const O = {};
function g(t, e) {
  if (!(this instanceof g))
    return new g(t, e);
  if (e && e in G && (e = null), e && !(e in _))
    throw new Error("Unknown model: " + e);
  let n, r;
  if (t == null)
    this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
  else if (t instanceof g)
    this.model = t.model, this.color = [...t.color], this.valpha = t.valpha;
  else if (typeof t == "string") {
    const o = p.get(t);
    if (o === null)
      throw new Error("Unable to parse color from string: " + t);
    this.model = o.model, r = _[this.model].channels, this.color = o.value.slice(0, r), this.valpha = typeof o.value[r] == "number" ? o.value[r] : 1;
  } else if (t.length > 0) {
    this.model = e || "rgb", r = _[this.model].channels;
    const o = Array.prototype.slice.call(t, 0, r);
    this.color = L(o, r), this.valpha = typeof t[r] == "number" ? t[r] : 1;
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
    const a = o.sort().join("");
    if (!(a in I))
      throw new Error("Unable to parse color from object: " + JSON.stringify(t));
    this.model = I[a];
    const { labels: s } = _[this.model], l = [];
    for (n = 0; n < s.length; n++)
      l.push(t[s[n]]);
    this.color = L(l);
  }
  if (O[this.model])
    for (r = _[this.model].channels, n = 0; n < r; n++) {
      const o = O[this.model][n];
      o && (this.color[n] = o(this.color[n]));
    }
  this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze && Object.freeze(this);
}
g.prototype = {
  toString() {
    return this.string();
  },
  toJSON() {
    return this[this.model]();
  },
  string(t) {
    let e = this.model in p.to ? this : this.rgb();
    e = e.round(typeof t == "number" ? t : 1);
    const n = e.valpha === 1 ? e.color : [...e.color, this.valpha];
    return p.to[e.model](...n);
  },
  percentString(t) {
    const e = this.rgb().round(typeof t == "number" ? t : 1), n = e.valpha === 1 ? e.color : [...e.color, this.valpha];
    return p.to.rgb.percent(...n);
  },
  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
  },
  object() {
    const t = {}, { channels: e } = _[this.model], { labels: n } = _[this.model];
    for (let r = 0; r < e; r++)
      t[n[r]] = this.color[r];
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
    return t = Math.max(t || 0, 0), new g([...this.color.map(ot(t)), this.valpha], this.model);
  },
  alpha(t) {
    return t !== void 0 ? new g([...this.color, Math.max(0, Math.min(1, t))], this.model) : this.valpha;
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
    return t !== void 0 ? new g(t) : _[this.model].keyword(this.color);
  },
  hex(t) {
    return t !== void 0 ? new g(t) : p.to.hex(...this.rgb().round().color);
  },
  hexa(t) {
    if (t !== void 0)
      return new g(t);
    const e = this.rgb().round().color;
    let n = Math.round(this.valpha * 255).toString(16).toUpperCase();
    return n.length === 1 && (n = "0" + n), p.to.hex(...e) + n;
  },
  rgbNumber() {
    const t = this.rgb().color;
    return (t[0] & 255) << 16 | (t[1] & 255) << 8 | t[2] & 255;
  },
  luminosity() {
    const t = this.rgb().color, e = [];
    for (const [n, r] of t.entries()) {
      const o = r / 255;
      e[n] = o <= 0.04045 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
  },
  contrast(t) {
    const e = this.luminosity(), n = t.luminosity();
    return e > n ? (e + 0.05) / (n + 0.05) : (n + 0.05) / (e + 0.05);
  },
  level(t) {
    const e = this.contrast(t);
    return e >= 7 ? "AAA" : e >= 4.5 ? "AA" : "";
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
    for (let e = 0; e < 3; e++)
      t.color[e] = 255 - t.color[e];
    return t;
  },
  lighten(t) {
    const e = this.hsl();
    return e.color[2] += e.color[2] * t, e;
  },
  darken(t) {
    const e = this.hsl();
    return e.color[2] -= e.color[2] * t, e;
  },
  saturate(t) {
    const e = this.hsl();
    return e.color[1] += e.color[1] * t, e;
  },
  desaturate(t) {
    const e = this.hsl();
    return e.color[1] -= e.color[1] * t, e;
  },
  whiten(t) {
    const e = this.hwb();
    return e.color[1] += e.color[1] * t, e;
  },
  blacken(t) {
    const e = this.hwb();
    return e.color[2] += e.color[2] * t, e;
  },
  grayscale() {
    const t = this.rgb().color, e = t[0] * 0.3 + t[1] * 0.59 + t[2] * 0.11;
    return g.rgb(e, e, e);
  },
  fade(t) {
    return this.alpha(this.valpha - this.valpha * t);
  },
  opaquer(t) {
    return this.alpha(this.valpha + this.valpha * t);
  },
  rotate(t) {
    const e = this.hsl();
    let n = e.color[0];
    return n = (n + t) % 360, n = n < 0 ? 360 + n : n, e.color[0] = n, e;
  },
  mix(t, e) {
    if (!t || !t.rgb)
      throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof t);
    const n = t.rgb(), r = this.rgb(), o = e === void 0 ? 0.5 : e, a = 2 * o - 1, s = n.alpha() - r.alpha(), l = ((a * s === -1 ? a : (a + s) / (1 + a * s)) + 1) / 2, i = 1 - l;
    return g.rgb(
      l * n.red() + i * r.red(),
      l * n.green() + i * r.green(),
      l * n.blue() + i * r.blue(),
      n.alpha() * o + r.alpha() * (1 - o)
    );
  }
};
for (const t of Object.keys(_)) {
  if (G.includes(t))
    continue;
  const { channels: e } = _[t];
  g.prototype[t] = function(...n) {
    return this.model === t ? new g(this) : n.length > 0 ? new g(n, t) : new g([...st(_[this.model][t].raw(this.color)), this.valpha], t);
  }, g[t] = function(...n) {
    let r = n[0];
    return typeof r == "number" && (r = L(n, e)), new g(r, t);
  };
}
function rt(t, e) {
  return Number(t.toFixed(e));
}
function ot(t) {
  return function(e) {
    return rt(e, t);
  };
}
function u(t, e, n) {
  t = Array.isArray(t) ? t : [t];
  for (const r of t)
    (O[r] ||= [])[e] = n;
  return t = t[0], function(r) {
    let o;
    return r !== void 0 ? (n && (r = n(r)), o = this[t](), o.color[e] = r, o) : (o = this[t]().color[e], n && (o = n(o)), o);
  };
}
function b(t) {
  return function(e) {
    return Math.max(0, Math.min(t, e));
  };
}
function st(t) {
  return Array.isArray(t) ? t : [t];
}
function L(t, e) {
  for (let n = 0; n < e; n++)
    typeof t[n] != "number" && (t[n] = 0);
  return t;
}
const mt = {
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
}, yt = g("#007AC2"), wt = "calcite-color-", kt = {
  r: 255,
  g: 255,
  b: 255
}, at = {
  h: 360,
  s: 100,
  v: 100
}, vt = at.h - 1, St = {
  min: 0,
  max: 100
}, lt = {
  s: {
    gap: parseInt(U, 10),
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
    gap: parseInt(D, 10),
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
    gap: parseInt(X, 10),
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
}, Mt = 1, xt = {
  minus: "minus",
  plus: "plus"
}, At = /^[0-9A-F]$/i, it = /^#[0-9A-F]{3}$/i, ct = /^#[0-9A-F]{6}$/i, ht = /^#[0-9A-F]{4}$/i, ut = /^#[0-9A-F]{8}$/i;
function Ft(t, e = !1, n) {
  if (!(e && !t))
    return g(
      t != null && typeof t == "object" && gt(n) ? bt(t) : t
    );
}
const Ct = (t) => Number((t * 100).toFixed()), Ht = (t) => Number((t / 100).toFixed(2));
function ft(t, e = !1) {
  return z(t, e) || dt(t, e);
}
function T(t, e, n) {
  return t ? t.length === e && n.test(t) : !1;
}
function z(t, e = !1) {
  return T(t, e ? 5 : 4, e ? ht : it);
}
function dt(t, e = !1) {
  return T(t, e ? 9 : 7, e ? ut : ct);
}
function Nt(t, e = !1, n = !1) {
  if (t = t.toLowerCase(), t.startsWith("#") || (t = `#${t}`), z(t, e))
    return R($(t));
  if (e && n && ft(
    t,
    !1
    /* we only care about RGB hex for conversion */
  )) {
    const r = z(t, !1);
    return R($(`${t}${r ? "f" : "ff"}`));
  }
  return t;
}
function It(t, e = !1) {
  return e ? t.hexa() : t.hex();
}
function R(t) {
  const { r: e, g: n, b: r } = t, o = C(e), a = C(n), s = C(r), l = "a" in t ? C(t.a * 255) : "";
  return `#${o}${a}${s}${l}`.toLowerCase();
}
function C(t) {
  return t.toString(16).padStart(2, "0");
}
function Ot(t) {
  return {
    ...E(t, ["alpha"]),
    a: t.alpha ?? 1
    /* Color() will omit alpha if 1 */
  };
}
function bt(t) {
  return { ...E(t, ["a"]), alpha: t.a ?? 1 };
}
function $(t) {
  t = t.replace("#", "");
  let e, n, r, o;
  if (t.length === 3 || t.length === 4) {
    const [s, l, i, h] = t.split("");
    e = parseInt(`${s}${s}`, 16), n = parseInt(`${l}${l}`, 16), r = parseInt(`${i}${i}`, 16), o = parseInt(`${h}${h}`, 16) / 255;
  } else
    e = parseInt(t.slice(0, 2), 16), n = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16), o = parseInt(t.slice(6, 8), 16) / 255;
  return isNaN(o) ? { r: e, g: n, b: r } : { r: e, g: n, b: r, a: o };
}
const W = (t) => t, f = W({
  HEX: "hex",
  HEXA: "hexa",
  RGB_CSS: "rgb-css",
  RGBA_CSS: "rgba-css",
  HSL_CSS: "hsl-css",
  HSLA_CSS: "hsla-css"
}), d = W({
  RGB: "rgb",
  RGBA: "rgba",
  HSL: "hsl",
  HSLA: "hsla",
  HSV: "hsv",
  HSVA: "hsva"
});
function Lt(t) {
  if (typeof t == "string") {
    if (t.startsWith("#")) {
      const { length: e } = t;
      if (e === 4 || e === 7)
        return f.HEX;
      if (e === 5 || e === 9)
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
    if (v(t, "r", "g", "b"))
      return v(t, "a") ? d.RGBA : d.RGB;
    if (v(t, "h", "s", "l"))
      return v(t, "a") ? d.HSLA : d.HSL;
    if (v(t, "h", "s", "v"))
      return v(t, "a") ? d.HSVA : d.HSV;
  }
}
function v(t, ...e) {
  return e.every((n) => n && t && `${n}` in t);
}
function zt(t, e) {
  return t?.rgb().array().toString() === e?.rgb().array().toString();
}
function gt(t) {
  return t === f.HEXA || t === f.RGBA_CSS || t === f.HSLA_CSS || t === d.RGBA || t === d.HSLA || t === d.HSVA;
}
function Rt(t) {
  return t === f.HEX ? f.HEXA : t === f.RGB_CSS ? f.RGBA_CSS : t === f.HSL_CSS ? f.HSLA_CSS : t === d.RGB ? d.RGBA : t === d.HSL ? d.HSLA : t === d.HSV ? d.HSVA : t;
}
function $t(t) {
  return t === f.HEXA ? f.HEX : t === f.RGBA_CSS ? f.RGB_CSS : t === f.HSLA_CSS ? f.HSL_CSS : t === d.RGBA ? d.RGB : t === d.HSLA ? d.HSL : t === d.HSVA ? d.HSV : t;
}
const pt = 1, j = pt * 2;
function Et(t, e, n) {
  const r = n ? lt.l.preview.size : e.preview.size, o = t - j, a = e.gap * 3;
  return Math.max(o - a - r, 0);
}
function qt(t) {
  const n = t - j;
  return {
    width: Math.max(n, 0),
    height: Math.max(Math.floor(n / 1.8), 0)
  };
}
export {
  f as C,
  yt as D,
  at as H,
  xt as I,
  St as O,
  kt as R,
  lt as S,
  qt as a,
  wt as b,
  Ft as c,
  gt as d,
  zt as e,
  g as f,
  Et as g,
  It as h,
  mt as i,
  $t as j,
  vt as k,
  Ot as l,
  Ct as m,
  Nt as n,
  Ht as o,
  Lt as p,
  Mt as q,
  ft as r,
  dt as s,
  Rt as t,
  z as u,
  R as v,
  At as w,
  $ as x
};
