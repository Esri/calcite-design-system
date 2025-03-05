import { h as T, i as W, j as P } from "./global.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
const M = {
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
}, O = /* @__PURE__ */ Object.create(null);
for (const e in M)
  Object.hasOwn(M, e) && (O[M[e]] = e);
const b = {
  to: {},
  get: {}
};
b.get = function(e) {
  const t = e.slice(0, 3).toLowerCase();
  let n, r;
  switch (t) {
    case "hsl": {
      n = b.get.hsl(e), r = "hsl";
      break;
    }
    case "hwb": {
      n = b.get.hwb(e), r = "hwb";
      break;
    }
    default: {
      n = b.get.rgb(e), r = "rgb";
      break;
    }
  }
  return n ? { model: r, value: n } : null;
};
b.get.rgb = function(e) {
  if (!e)
    return null;
  const t = /^#([a-f\d]{3,4})$/i, n = /^#([a-f\d]{6})([a-f\d]{2})?$/i, r = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/, o = /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/, s = /^(\w+)$/;
  let a = [0, 0, 0, 1], l, i, h;
  if (l = e.match(n)) {
    for (h = l[2], l = l[1], i = 0; i < 3; i++) {
      const y = i * 2;
      a[i] = Number.parseInt(l.slice(y, y + 2), 16);
    }
    h && (a[3] = Number.parseInt(h, 16) / 255);
  } else if (l = e.match(t)) {
    for (l = l[1], h = l[3], i = 0; i < 3; i++)
      a[i] = Number.parseInt(l[i] + l[i], 16);
    h && (a[3] = Number.parseInt(h + h, 16) / 255);
  } else if (l = e.match(r)) {
    for (i = 0; i < 3; i++)
      a[i] = Number.parseInt(l[i + 1], 10);
    l[4] && (a[3] = l[5] ? Number.parseFloat(l[4]) * 0.01 : Number.parseFloat(l[4]));
  } else if (l = e.match(o)) {
    for (i = 0; i < 3; i++)
      a[i] = Math.round(Number.parseFloat(l[i + 1]) * 2.55);
    l[4] && (a[3] = l[5] ? Number.parseFloat(l[4]) * 0.01 : Number.parseFloat(l[4]));
  } else return (l = e.match(s)) ? l[1] === "transparent" ? [0, 0, 0, 0] : Object.hasOwn(M, l[1]) ? (a = M[l[1]], a[3] = 1, a) : null : null;
  for (i = 0; i < 3; i++)
    a[i] = k(a[i], 0, 255);
  return a[3] = k(a[3], 0, 1), a;
};
b.get.hsl = function(e) {
  if (!e)
    return null;
  const t = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, n = e.match(t);
  if (n) {
    const r = Number.parseFloat(n[4]), o = (Number.parseFloat(n[1]) % 360 + 360) % 360, s = k(Number.parseFloat(n[2]), 0, 100), a = k(Number.parseFloat(n[3]), 0, 100), l = k(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, s, a, l];
  }
  return null;
};
b.get.hwb = function(e) {
  if (!e)
    return null;
  const t = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, n = e.match(t);
  if (n) {
    const r = Number.parseFloat(n[4]), o = (Number.parseFloat(n[1]) % 360 + 360) % 360, s = k(Number.parseFloat(n[2]), 0, 100), a = k(Number.parseFloat(n[3]), 0, 100), l = k(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, s, a, l];
  }
  return null;
};
b.to.hex = function(...e) {
  return "#" + _(e[0]) + _(e[1]) + _(e[2]) + (e[3] < 1 ? _(Math.round(e[3] * 255)) : "");
};
b.to.rgb = function(...e) {
  return e.length < 4 || e[3] === 1 ? "rgb(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ")" : "rgba(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ", " + e[3] + ")";
};
b.to.rgb.percent = function(...e) {
  const t = Math.round(e[0] / 255 * 100), n = Math.round(e[1] / 255 * 100), r = Math.round(e[2] / 255 * 100);
  return e.length < 4 || e[3] === 1 ? "rgb(" + t + "%, " + n + "%, " + r + "%)" : "rgba(" + t + "%, " + n + "%, " + r + "%, " + e[3] + ")";
};
b.to.hsl = function(...e) {
  return e.length < 4 || e[3] === 1 ? "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)" : "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + e[3] + ")";
};
b.to.hwb = function(...e) {
  let t = "";
  return e.length >= 4 && e[3] !== 1 && (t = ", " + e[3]), "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + t + ")";
};
b.to.keyword = function(...e) {
  return O[e.slice(0, 3)];
};
function k(e, t, n) {
  return Math.min(Math.max(t, e), n);
}
function _(e) {
  const t = Math.round(e).toString(16).toUpperCase();
  return t.length < 2 ? "0" + t : t;
}
const x = {
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
}, E = {};
for (const e of Object.keys(x))
  E[x[e]] = e;
const c = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
}, v = (6 / 29) ** 3;
for (const e of Object.keys(c)) {
  if (!("channels" in c[e]))
    throw new Error("missing channels property: " + e);
  if (!("labels" in c[e]))
    throw new Error("missing channel labels property: " + e);
  if (c[e].labels.length !== c[e].channels)
    throw new Error("channel and label counts mismatch: " + e);
  const { channels: t, labels: n } = c[e];
  delete c[e].channels, delete c[e].labels, Object.defineProperty(c[e], "channels", { value: t }), Object.defineProperty(c[e], "labels", { value: n });
}
c.rgb.hsl = function(e) {
  const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, o = Math.min(t, n, r), s = Math.max(t, n, r), a = s - o;
  let l, i;
  switch (s) {
    case o: {
      l = 0;
      break;
    }
    case t: {
      l = (n - r) / a;
      break;
    }
    case n: {
      l = 2 + (r - t) / a;
      break;
    }
    case r: {
      l = 4 + (t - n) / a;
      break;
    }
  }
  l = Math.min(l * 60, 360), l < 0 && (l += 360);
  const h = (o + s) / 2;
  return s === o ? i = 0 : h <= 0.5 ? i = a / (s + o) : i = a / (2 - s - o), [l, i * 100, h * 100];
};
c.rgb.hsv = function(e) {
  let t, n, r, o, s;
  const a = e[0] / 255, l = e[1] / 255, i = e[2] / 255, h = Math.max(a, l, i), y = h - Math.min(a, l, i), w = function(G) {
    return (h - G) / 6 / y + 1 / 2;
  };
  if (y === 0)
    o = 0, s = 0;
  else {
    switch (s = y / h, t = w(a), n = w(l), r = w(i), h) {
      case a: {
        o = r - n;
        break;
      }
      case l: {
        o = 1 / 3 + t - r;
        break;
      }
      case i: {
        o = 2 / 3 + n - t;
        break;
      }
    }
    o < 0 ? o += 1 : o > 1 && (o -= 1);
  }
  return [
    o * 360,
    s * 100,
    h * 100
  ];
};
c.rgb.hwb = function(e) {
  const t = e[0], n = e[1];
  let r = e[2];
  const o = c.rgb.hsl(e)[0], s = 1 / 255 * Math.min(t, Math.min(n, r));
  return r = 1 - 1 / 255 * Math.max(t, Math.max(n, r)), [o, s * 100, r * 100];
};
c.rgb.cmyk = function(e) {
  const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, o = Math.min(1 - t, 1 - n, 1 - r), s = (1 - t - o) / (1 - o) || 0, a = (1 - n - o) / (1 - o) || 0, l = (1 - r - o) / (1 - o) || 0;
  return [s * 100, a * 100, l * 100, o * 100];
};
function j(e, t) {
  return (e[0] - t[0]) ** 2 + (e[1] - t[1]) ** 2 + (e[2] - t[2]) ** 2;
}
c.rgb.keyword = function(e) {
  const t = E[e];
  if (t)
    return t;
  let n = Number.POSITIVE_INFINITY, r;
  for (const o of Object.keys(x)) {
    const s = x[o], a = j(e, s);
    a < n && (n = a, r = o);
  }
  return r;
};
c.keyword.rgb = function(e) {
  return x[e];
};
c.rgb.xyz = function(e) {
  let t = e[0] / 255, n = e[1] / 255, r = e[2] / 255;
  t = t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92, n = n > 0.04045 ? ((n + 0.055) / 1.055) ** 2.4 : n / 12.92, r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  const o = t * 0.4124564 + n * 0.3575761 + r * 0.1804375, s = t * 0.2126729 + n * 0.7151522 + r * 0.072175, a = t * 0.0193339 + n * 0.119192 + r * 0.9503041;
  return [o * 100, s * 100, a * 100];
};
c.rgb.lab = function(e) {
  const t = c.rgb.xyz(e);
  let n = t[0], r = t[1], o = t[2];
  n /= 95.047, r /= 100, o /= 108.883, n = n > v ? n ** (1 / 3) : 7.787 * n + 16 / 116, r = r > v ? r ** (1 / 3) : 7.787 * r + 16 / 116, o = o > v ? o ** (1 / 3) : 7.787 * o + 16 / 116;
  const s = 116 * r - 16, a = 500 * (n - r), l = 200 * (r - o);
  return [s, a, l];
};
c.hsl.rgb = function(e) {
  const t = e[0] / 360, n = e[1] / 100, r = e[2] / 100;
  let o, s;
  if (n === 0)
    return s = r * 255, [s, s, s];
  const a = r < 0.5 ? r * (1 + n) : r + n - r * n, l = 2 * r - a, i = [0, 0, 0];
  for (let h = 0; h < 3; h++)
    o = t + 1 / 3 * -(h - 1), o < 0 && o++, o > 1 && o--, 6 * o < 1 ? s = l + (a - l) * 6 * o : 2 * o < 1 ? s = a : 3 * o < 2 ? s = l + (a - l) * (2 / 3 - o) * 6 : s = l, i[h] = s * 255;
  return i;
};
c.hsl.hsv = function(e) {
  const t = e[0];
  let n = e[1] / 100, r = e[2] / 100, o = n;
  const s = Math.max(r, 0.01);
  r *= 2, n *= r <= 1 ? r : 2 - r, o *= s <= 1 ? s : 2 - s;
  const a = (r + n) / 2, l = r === 0 ? 2 * o / (s + o) : 2 * n / (r + n);
  return [t, l * 100, a * 100];
};
c.hsv.rgb = function(e) {
  const t = e[0] / 60, n = e[1] / 100;
  let r = e[2] / 100;
  const o = Math.floor(t) % 6, s = t - Math.floor(t), a = 255 * r * (1 - n), l = 255 * r * (1 - n * s), i = 255 * r * (1 - n * (1 - s));
  switch (r *= 255, o) {
    case 0:
      return [r, i, a];
    case 1:
      return [l, r, a];
    case 2:
      return [a, r, i];
    case 3:
      return [a, l, r];
    case 4:
      return [i, a, r];
    case 5:
      return [r, a, l];
  }
};
c.hsv.hsl = function(e) {
  const t = e[0], n = e[1] / 100, r = e[2] / 100, o = Math.max(r, 0.01);
  let s, a;
  a = (2 - n) * r;
  const l = (2 - n) * o;
  return s = n * o, s /= l <= 1 ? l : 2 - l, s = s || 0, a /= 2, [t, s * 100, a * 100];
};
c.hwb.rgb = function(e) {
  const t = e[0] / 360;
  let n = e[1] / 100, r = e[2] / 100;
  const o = n + r;
  let s;
  o > 1 && (n /= o, r /= o);
  const a = Math.floor(6 * t), l = 1 - r;
  s = 6 * t - a, a & 1 && (s = 1 - s);
  const i = n + s * (l - n);
  let h, y, w;
  switch (a) {
    default:
    case 6:
    case 0: {
      h = l, y = i, w = n;
      break;
    }
    case 1: {
      h = i, y = l, w = n;
      break;
    }
    case 2: {
      h = n, y = l, w = i;
      break;
    }
    case 3: {
      h = n, y = i, w = l;
      break;
    }
    case 4: {
      h = i, y = n, w = l;
      break;
    }
    case 5: {
      h = l, y = n, w = i;
      break;
    }
  }
  return [h * 255, y * 255, w * 255];
};
c.cmyk.rgb = function(e) {
  const t = e[0] / 100, n = e[1] / 100, r = e[2] / 100, o = e[3] / 100, s = 1 - Math.min(1, t * (1 - o) + o), a = 1 - Math.min(1, n * (1 - o) + o), l = 1 - Math.min(1, r * (1 - o) + o);
  return [s * 255, a * 255, l * 255];
};
c.xyz.rgb = function(e) {
  const t = e[0] / 100, n = e[1] / 100, r = e[2] / 100;
  let o, s, a;
  return o = t * 3.2404542 + n * -1.5371385 + r * -0.4985314, s = t * -0.969266 + n * 1.8760108 + r * 0.041556, a = t * 0.0556434 + n * -0.2040259 + r * 1.0572252, o = o > 31308e-7 ? 1.055 * o ** (1 / 2.4) - 0.055 : o * 12.92, s = s > 31308e-7 ? 1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92, a = a > 31308e-7 ? 1.055 * a ** (1 / 2.4) - 0.055 : a * 12.92, o = Math.min(Math.max(0, o), 1), s = Math.min(Math.max(0, s), 1), a = Math.min(Math.max(0, a), 1), [o * 255, s * 255, a * 255];
};
c.xyz.lab = function(e) {
  let t = e[0], n = e[1], r = e[2];
  t /= 95.047, n /= 100, r /= 108.883, t = t > v ? t ** (1 / 3) : 7.787 * t + 16 / 116, n = n > v ? n ** (1 / 3) : 7.787 * n + 16 / 116, r = r > v ? r ** (1 / 3) : 7.787 * r + 16 / 116;
  const o = 116 * n - 16, s = 500 * (t - n), a = 200 * (n - r);
  return [o, s, a];
};
c.lab.xyz = function(e) {
  const t = e[0], n = e[1], r = e[2];
  let o, s, a;
  s = (t + 16) / 116, o = n / 500 + s, a = s - r / 200;
  const l = s ** 3, i = o ** 3, h = a ** 3;
  return s = l > v ? l : (s - 16 / 116) / 7.787, o = i > v ? i : (o - 16 / 116) / 7.787, a = h > v ? h : (a - 16 / 116) / 7.787, o *= 95.047, s *= 100, a *= 108.883, [o, s, a];
};
c.lab.lch = function(e) {
  const t = e[0], n = e[1], r = e[2];
  let o;
  o = Math.atan2(r, n) * 360 / 2 / Math.PI, o < 0 && (o += 360);
  const a = Math.sqrt(n * n + r * r);
  return [t, a, o];
};
c.lch.lab = function(e) {
  const t = e[0], n = e[1], o = e[2] / 360 * 2 * Math.PI, s = n * Math.cos(o), a = n * Math.sin(o);
  return [t, s, a];
};
c.rgb.ansi16 = function(e, t = null) {
  const [n, r, o] = e;
  let s = t === null ? c.rgb.hsv(e)[2] : t;
  if (s = Math.round(s / 50), s === 0)
    return 30;
  let a = 30 + (Math.round(o / 255) << 2 | Math.round(r / 255) << 1 | Math.round(n / 255));
  return s === 2 && (a += 60), a;
};
c.hsv.ansi16 = function(e) {
  return c.rgb.ansi16(c.hsv.rgb(e), e[2]);
};
c.rgb.ansi256 = function(e) {
  const t = e[0], n = e[1], r = e[2];
  return t >> 4 === n >> 4 && n >> 4 === r >> 4 ? t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(r / 255 * 5);
};
c.ansi16.rgb = function(e) {
  e = e[0];
  let t = e % 10;
  if (t === 0 || t === 7)
    return e > 50 && (t += 3.5), t = t / 10.5 * 255, [t, t, t];
  const n = (Math.trunc(e > 50) + 1) * 0.5, r = (t & 1) * n * 255, o = (t >> 1 & 1) * n * 255, s = (t >> 2 & 1) * n * 255;
  return [r, o, s];
};
c.ansi256.rgb = function(e) {
  if (e = e[0], e >= 232) {
    const s = (e - 232) * 10 + 8;
    return [s, s, s];
  }
  e -= 16;
  let t;
  const n = Math.floor(e / 36) / 5 * 255, r = Math.floor((t = e % 36) / 6) / 5 * 255, o = t % 6 / 5 * 255;
  return [n, r, o];
};
c.rgb.hex = function(e) {
  const n = (((Math.round(e[0]) & 255) << 16) + ((Math.round(e[1]) & 255) << 8) + (Math.round(e[2]) & 255)).toString(16).toUpperCase();
  return "000000".slice(n.length) + n;
};
c.hex.rgb = function(e) {
  const t = e.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);
  if (!t)
    return [0, 0, 0];
  let n = t[0];
  t[0].length === 3 && (n = [...n].map((l) => l + l).join(""));
  const r = Number.parseInt(n, 16), o = r >> 16 & 255, s = r >> 8 & 255, a = r & 255;
  return [o, s, a];
};
c.rgb.hcg = function(e) {
  const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, o = Math.max(Math.max(t, n), r), s = Math.min(Math.min(t, n), r), a = o - s;
  let l;
  const i = a < 1 ? s / (1 - a) : 0;
  return a <= 0 ? l = 0 : o === t ? l = (n - r) / a % 6 : o === n ? l = 2 + (r - t) / a : l = 4 + (t - n) / a, l /= 6, l %= 1, [l * 360, a * 100, i * 100];
};
c.hsl.hcg = function(e) {
  const t = e[1] / 100, n = e[2] / 100, r = n < 0.5 ? 2 * t * n : 2 * t * (1 - n);
  let o = 0;
  return r < 1 && (o = (n - 0.5 * r) / (1 - r)), [e[0], r * 100, o * 100];
};
c.hsv.hcg = function(e) {
  const t = e[1] / 100, n = e[2] / 100, r = t * n;
  let o = 0;
  return r < 1 && (o = (n - r) / (1 - r)), [e[0], r * 100, o * 100];
};
c.hcg.rgb = function(e) {
  const t = e[0] / 360, n = e[1] / 100, r = e[2] / 100;
  if (n === 0)
    return [r * 255, r * 255, r * 255];
  const o = [0, 0, 0], s = t % 1 * 6, a = s % 1, l = 1 - a;
  let i = 0;
  switch (Math.floor(s)) {
    case 0: {
      o[0] = 1, o[1] = a, o[2] = 0;
      break;
    }
    case 1: {
      o[0] = l, o[1] = 1, o[2] = 0;
      break;
    }
    case 2: {
      o[0] = 0, o[1] = 1, o[2] = a;
      break;
    }
    case 3: {
      o[0] = 0, o[1] = l, o[2] = 1;
      break;
    }
    case 4: {
      o[0] = a, o[1] = 0, o[2] = 1;
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
c.hcg.hsv = function(e) {
  const t = e[1] / 100, n = e[2] / 100, r = t + n * (1 - t);
  let o = 0;
  return r > 0 && (o = t / r), [e[0], o * 100, r * 100];
};
c.hcg.hsl = function(e) {
  const t = e[1] / 100, r = e[2] / 100 * (1 - t) + 0.5 * t;
  let o = 0;
  return r > 0 && r < 0.5 ? o = t / (2 * r) : r >= 0.5 && r < 1 && (o = t / (2 * (1 - r))), [e[0], o * 100, r * 100];
};
c.hcg.hwb = function(e) {
  const t = e[1] / 100, n = e[2] / 100, r = t + n * (1 - t);
  return [e[0], (r - t) * 100, (1 - r) * 100];
};
c.hwb.hcg = function(e) {
  const t = e[1] / 100, r = 1 - e[2] / 100, o = r - t;
  let s = 0;
  return o < 1 && (s = (r - o) / (1 - o)), [e[0], o * 100, s * 100];
};
c.apple.rgb = function(e) {
  return [e[0] / 65535 * 255, e[1] / 65535 * 255, e[2] / 65535 * 255];
};
c.rgb.apple = function(e) {
  return [e[0] / 255 * 65535, e[1] / 255 * 65535, e[2] / 255 * 65535];
};
c.gray.rgb = function(e) {
  return [e[0] / 100 * 255, e[0] / 100 * 255, e[0] / 100 * 255];
};
c.gray.hsl = function(e) {
  return [0, 0, e[0]];
};
c.gray.hsv = c.gray.hsl;
c.gray.hwb = function(e) {
  return [0, 100, e[0]];
};
c.gray.cmyk = function(e) {
  return [0, 0, 0, e[0]];
};
c.gray.lab = function(e) {
  return [e[0], 0, 0];
};
c.gray.hex = function(e) {
  const t = Math.round(e[0] / 100 * 255) & 255, r = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
  return "000000".slice(r.length) + r;
};
c.rgb.gray = function(e) {
  return [(e[0] + e[1] + e[2]) / 3 / 255 * 100];
};
function X() {
  const e = {}, t = Object.keys(c);
  for (let { length: n } = t, r = 0; r < n; r++)
    e[t[r]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  return e;
}
function D(e) {
  const t = X(), n = [e];
  for (t[e].distance = 0; n.length > 0; ) {
    const r = n.pop(), o = Object.keys(c[r]);
    for (let { length: s } = o, a = 0; a < s; a++) {
      const l = o[a], i = t[l];
      i.distance === -1 && (i.distance = t[r].distance + 1, i.parent = r, n.unshift(l));
    }
  }
  return t;
}
function U(e, t) {
  return function(n) {
    return t(e(n));
  };
}
function K(e, t) {
  const n = [t[e].parent, e];
  let r = c[t[e].parent][e], o = t[e].parent;
  for (; t[o].parent; )
    n.unshift(t[o].parent), r = U(c[t[o].parent][o], r), o = t[o].parent;
  return r.conversion = n, r;
}
function Y(e) {
  const t = D(e), n = {}, r = Object.keys(t);
  for (let { length: o } = r, s = 0; s < o; s++) {
    const a = r[s];
    t[a].parent !== null && (n[a] = K(a, t));
  }
  return n;
}
const m = {}, J = Object.keys(c);
function Z(e) {
  const t = function(...n) {
    const r = n[0];
    return r == null ? r : (r.length > 1 && (n = r), e(n));
  };
  return "conversion" in e && (t.conversion = e.conversion), t;
}
function Q(e) {
  const t = function(...n) {
    const r = n[0];
    if (r == null)
      return r;
    r.length > 1 && (n = r);
    const o = e(n);
    if (typeof o == "object")
      for (let { length: s } = o, a = 0; a < s; a++)
        o[a] = Math.round(o[a]);
    return o;
  };
  return "conversion" in e && (t.conversion = e.conversion), t;
}
for (const e of J) {
  m[e] = {}, Object.defineProperty(m[e], "channels", { value: c[e].channels }), Object.defineProperty(m[e], "labels", { value: c[e].labels });
  const t = Y(e), n = Object.keys(t);
  for (const r of n) {
    const o = t[r];
    m[e][r] = Q(o), m[e][r].raw = Z(o);
  }
}
const z = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  "keyword",
  // Gray conflicts with some method names, and has its own method defined.
  "gray",
  // Shouldn't really be in color-convert either...
  "hex"
], F = {};
for (const e of Object.keys(m))
  F[[...m[e].labels].sort().join("")] = e;
const C = {};
function p(e, t) {
  if (!(this instanceof p))
    return new p(e, t);
  if (t && t in z && (t = null), t && !(t in m))
    throw new Error("Unknown model: " + t);
  let n, r;
  if (e == null)
    this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
  else if (e instanceof p)
    this.model = e.model, this.color = [...e.color], this.valpha = e.valpha;
  else if (typeof e == "string") {
    const o = b.get(e);
    if (o === null)
      throw new Error("Unable to parse color from string: " + e);
    this.model = o.model, r = m[this.model].channels, this.color = o.value.slice(0, r), this.valpha = typeof o.value[r] == "number" ? o.value[r] : 1;
  } else if (e.length > 0) {
    this.model = t || "rgb", r = m[this.model].channels;
    const o = Array.prototype.slice.call(e, 0, r);
    this.color = H(o, r), this.valpha = typeof e[r] == "number" ? e[r] : 1;
  } else if (typeof e == "number")
    this.model = "rgb", this.color = [
      e >> 16 & 255,
      e >> 8 & 255,
      e & 255
    ], this.valpha = 1;
  else {
    this.valpha = 1;
    const o = Object.keys(e);
    "alpha" in e && (o.splice(o.indexOf("alpha"), 1), this.valpha = typeof e.alpha == "number" ? e.alpha : 0);
    const s = o.sort().join("");
    if (!(s in F))
      throw new Error("Unable to parse color from object: " + JSON.stringify(e));
    this.model = F[s];
    const { labels: a } = m[this.model], l = [];
    for (n = 0; n < a.length; n++)
      l.push(e[a[n]]);
    this.color = H(l);
  }
  if (C[this.model])
    for (r = m[this.model].channels, n = 0; n < r; n++) {
      const o = C[this.model][n];
      o && (this.color[n] = o(this.color[n]));
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
  string(e) {
    let t = this.model in b.to ? this : this.rgb();
    t = t.round(typeof e == "number" ? e : 1);
    const n = t.valpha === 1 ? t.color : [...t.color, this.valpha];
    return b.to[t.model](...n);
  },
  percentString(e) {
    const t = this.rgb().round(typeof e == "number" ? e : 1), n = t.valpha === 1 ? t.color : [...t.color, this.valpha];
    return b.to.rgb.percent(...n);
  },
  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
  },
  object() {
    const e = {}, { channels: t } = m[this.model], { labels: n } = m[this.model];
    for (let r = 0; r < t; r++)
      e[n[r]] = this.color[r];
    return this.valpha !== 1 && (e.alpha = this.valpha), e;
  },
  unitArray() {
    const e = this.rgb().color;
    return e[0] /= 255, e[1] /= 255, e[2] /= 255, this.valpha !== 1 && e.push(this.valpha), e;
  },
  unitObject() {
    const e = this.rgb().object();
    return e.r /= 255, e.g /= 255, e.b /= 255, this.valpha !== 1 && (e.alpha = this.valpha), e;
  },
  round(e) {
    return e = Math.max(e || 0, 0), new p([...this.color.map(ee(e)), this.valpha], this.model);
  },
  alpha(e) {
    return e !== void 0 ? new p([...this.color, Math.max(0, Math.min(1, e))], this.model) : this.valpha;
  },
  // Rgb
  red: u("rgb", 0, g(255)),
  green: u("rgb", 1, g(255)),
  blue: u("rgb", 2, g(255)),
  hue: u(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (e) => (e % 360 + 360) % 360),
  saturationl: u("hsl", 1, g(100)),
  lightness: u("hsl", 2, g(100)),
  saturationv: u("hsv", 1, g(100)),
  value: u("hsv", 2, g(100)),
  chroma: u("hcg", 1, g(100)),
  gray: u("hcg", 2, g(100)),
  white: u("hwb", 1, g(100)),
  wblack: u("hwb", 2, g(100)),
  cyan: u("cmyk", 0, g(100)),
  magenta: u("cmyk", 1, g(100)),
  yellow: u("cmyk", 2, g(100)),
  black: u("cmyk", 3, g(100)),
  x: u("xyz", 0, g(95.047)),
  y: u("xyz", 1, g(100)),
  z: u("xyz", 2, g(108.833)),
  l: u("lab", 0, g(100)),
  a: u("lab", 1),
  b: u("lab", 2),
  keyword(e) {
    return e !== void 0 ? new p(e) : m[this.model].keyword(this.color);
  },
  hex(e) {
    return e !== void 0 ? new p(e) : b.to.hex(...this.rgb().round().color);
  },
  hexa(e) {
    if (e !== void 0)
      return new p(e);
    const t = this.rgb().round().color;
    let n = Math.round(this.valpha * 255).toString(16).toUpperCase();
    return n.length === 1 && (n = "0" + n), b.to.hex(...t) + n;
  },
  rgbNumber() {
    const e = this.rgb().color;
    return (e[0] & 255) << 16 | (e[1] & 255) << 8 | e[2] & 255;
  },
  luminosity() {
    const e = this.rgb().color, t = [];
    for (const [n, r] of e.entries()) {
      const o = r / 255;
      t[n] = o <= 0.04045 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2];
  },
  contrast(e) {
    const t = this.luminosity(), n = e.luminosity();
    return t > n ? (t + 0.05) / (n + 0.05) : (n + 0.05) / (t + 0.05);
  },
  level(e) {
    const t = this.contrast(e);
    return t >= 7 ? "AAA" : t >= 4.5 ? "AA" : "";
  },
  isDark() {
    const e = this.rgb().color;
    return (e[0] * 2126 + e[1] * 7152 + e[2] * 722) / 1e4 < 128;
  },
  isLight() {
    return !this.isDark();
  },
  negate() {
    const e = this.rgb();
    for (let t = 0; t < 3; t++)
      e.color[t] = 255 - e.color[t];
    return e;
  },
  lighten(e) {
    const t = this.hsl();
    return t.color[2] += t.color[2] * e, t;
  },
  darken(e) {
    const t = this.hsl();
    return t.color[2] -= t.color[2] * e, t;
  },
  saturate(e) {
    const t = this.hsl();
    return t.color[1] += t.color[1] * e, t;
  },
  desaturate(e) {
    const t = this.hsl();
    return t.color[1] -= t.color[1] * e, t;
  },
  whiten(e) {
    const t = this.hwb();
    return t.color[1] += t.color[1] * e, t;
  },
  blacken(e) {
    const t = this.hwb();
    return t.color[2] += t.color[2] * e, t;
  },
  grayscale() {
    const e = this.rgb().color, t = e[0] * 0.3 + e[1] * 0.59 + e[2] * 0.11;
    return p.rgb(t, t, t);
  },
  fade(e) {
    return this.alpha(this.valpha - this.valpha * e);
  },
  opaquer(e) {
    return this.alpha(this.valpha + this.valpha * e);
  },
  rotate(e) {
    const t = this.hsl();
    let n = t.color[0];
    return n = (n + e) % 360, n = n < 0 ? 360 + n : n, t.color[0] = n, t;
  },
  mix(e, t) {
    if (!e || !e.rgb)
      throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof e);
    const n = e.rgb(), r = this.rgb(), o = t === void 0 ? 0.5 : t, s = 2 * o - 1, a = n.alpha() - r.alpha(), l = ((s * a === -1 ? s : (s + a) / (1 + s * a)) + 1) / 2, i = 1 - l;
    return p.rgb(
      l * n.red() + i * r.red(),
      l * n.green() + i * r.green(),
      l * n.blue() + i * r.blue(),
      n.alpha() * o + r.alpha() * (1 - o)
    );
  }
};
for (const e of Object.keys(m)) {
  if (z.includes(e))
    continue;
  const { channels: t } = m[e];
  p.prototype[e] = function(...n) {
    return this.model === e ? new p(this) : n.length > 0 ? new p(n, e) : new p([...te(m[this.model][e].raw(this.color)), this.valpha], e);
  }, p[e] = function(...n) {
    let r = n[0];
    return typeof r == "number" && (r = H(n, t)), new p(r, e);
  };
}
function V(e, t) {
  return Number(e.toFixed(t));
}
function ee(e) {
  return function(t) {
    return V(t, e);
  };
}
function u(e, t, n) {
  e = Array.isArray(e) ? e : [e];
  for (const r of e)
    (C[r] ||= [])[t] = n;
  return e = e[0], function(r) {
    let o;
    return r !== void 0 ? (n && (r = n(r)), o = this[e](), o.color[t] = r, o) : (o = this[e]().color[t], n && (o = n(o)), o);
  };
}
function g(e) {
  return function(t) {
    return Math.max(0, Math.min(e, t));
  };
}
function te(e) {
  return Array.isArray(e) ? e : [e];
}
function H(e, t) {
  for (let n = 0; n < t; n++)
    typeof e[n] != "number" && (e[n] = 0);
  return e;
}
const ue = {
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
  savedColors: "saved-colors",
  savedColorsButtons: "saved-colors-buttons",
  savedColorsSection: "saved-colors-section",
  scope: "scope",
  section: "section",
  slider: "slider",
  sliders: "sliders",
  splitSection: "section--split"
}, de = p("#007AC2"), fe = "calcite-color-", ge = {
  r: 255,
  g: 255,
  b: 255
}, ne = {
  h: 360,
  s: 100,
  v: 100
}, be = ne.h - 1, pe = {
  min: 0,
  max: 100
}, re = {
  s: {
    gap: parseInt(P),
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
    gap: parseInt(W),
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
    gap: parseInt(T),
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
}, me = 1, ye = /^[0-9A-F]$/i, oe = /^#[0-9A-F]{3}$/i, se = /^#[0-9A-F]{6}$/i, ae = /^#[0-9A-F]{4}$/i, le = /^#[0-9A-F]{8}$/i, we = (e) => Number((e * 100).toFixed()), ve = (e) => Number((e / 100).toFixed(2));
function R(e, t = !1) {
  return N(e, t) || ie(e, t);
}
function $(e, t, n) {
  return e ? e.length === t && n.test(e) : !1;
}
function N(e, t = !1) {
  return $(e, t ? 5 : 4, t ? ae : oe);
}
function ie(e, t = !1) {
  return $(e, t ? 9 : 7, t ? le : se);
}
function ke(e, t = !1, n = !1) {
  if (e = e.toLowerCase(), e.startsWith("#") || (e = `#${e}`), N(e, t))
    return I(L(e, t));
  if (t && n && R(
    e,
    !1
    /* we only care about RGB hex for conversion */
  )) {
    const r = N(e, !1);
    return I(L(`${e}${r ? "f" : "ff"}`, !0));
  }
  return e;
}
function Se(e, t = !1) {
  return t ? e.hexa() : e.hex();
}
function I(e) {
  const { r: t, g: n, b: r } = e, o = A(t), s = A(n), a = A(r), l = "a" in e ? A(e.a * 255) : "";
  return `#${o}${s}${a}${l}`.toLowerCase();
}
function A(e) {
  return e.toString(16).padStart(2, "0");
}
function Me(e) {
  const t = {
    ...e,
    a: e.alpha ?? 1
    /* Color() will omit alpha if 1 */
  };
  return delete t.alpha, t;
}
function xe(e) {
  const t = { ...e, alpha: e.a ?? 1 };
  return delete t.a, t;
}
function L(e, t = !1) {
  if (!R(e, t))
    return null;
  e = e.replace("#", "");
  let n, r, o, s;
  if (e.length === 3 || e.length === 4) {
    const [l, i, h, y] = e.split("");
    n = parseInt(`${l}${l}`, 16), r = parseInt(`${i}${i}`, 16), o = parseInt(`${h}${h}`, 16), s = parseInt(`${y}${y}`, 16) / 255;
  } else
    n = parseInt(e.slice(0, 2), 16), r = parseInt(e.slice(2, 4), 16), o = parseInt(e.slice(4, 6), 16), s = parseInt(e.slice(6, 8), 16) / 255;
  return isNaN(s) ? { r: n, g: r, b: o } : { r: n, g: r, b: o, a: s };
}
const q = (e) => e, d = q({
  HEX: "hex",
  HEXA: "hexa",
  RGB_CSS: "rgb-css",
  RGBA_CSS: "rgba-css",
  HSL_CSS: "hsl-css",
  HSLA_CSS: "hsla-css"
}), f = q({
  RGB: "rgb",
  RGBA: "rgba",
  HSL: "hsl",
  HSLA: "hsla",
  HSV: "hsv",
  HSVA: "hsva"
});
function _e(e) {
  if (typeof e == "string") {
    if (e.startsWith("#")) {
      const { length: t } = e;
      if (t === 4 || t === 7)
        return d.HEX;
      if (t === 5 || t === 9)
        return d.HEXA;
    }
    if (e.startsWith("rgba("))
      return d.RGBA_CSS;
    if (e.startsWith("rgb("))
      return d.RGB_CSS;
    if (e.startsWith("hsl("))
      return d.HSL_CSS;
    if (e.startsWith("hsla("))
      return d.HSLA_CSS;
  }
  if (typeof e == "object") {
    if (S(e, "r", "g", "b"))
      return S(e, "a") ? f.RGBA : f.RGB;
    if (S(e, "h", "s", "l"))
      return S(e, "a") ? f.HSLA : f.HSL;
    if (S(e, "h", "s", "v"))
      return S(e, "a") ? f.HSVA : f.HSV;
  }
  return null;
}
function S(e, ...t) {
  return t.every((n) => n && e && `${n}` in e);
}
function Ae(e, t) {
  return e?.rgb().array().toString() === t?.rgb().array().toString();
}
function Fe(e) {
  return e === d.HEXA || e === d.RGBA_CSS || e === d.HSLA_CSS || e === f.RGBA || e === f.HSLA || e === f.HSVA;
}
function Ce(e) {
  return e === d.HEX ? d.HEXA : e === d.RGB_CSS ? d.RGBA_CSS : e === d.HSL_CSS ? d.HSLA_CSS : e === f.RGB ? f.RGBA : e === f.HSL ? f.HSLA : e === f.HSV ? f.HSVA : e;
}
function He(e) {
  return e === d.HEXA ? d.HEX : e === d.RGBA_CSS ? d.RGB_CSS : e === d.HSLA_CSS ? d.HSL_CSS : e === f.RGBA ? f.RGB : e === f.HSLA ? f.HSL : e === f.HSVA ? f.HSV : e;
}
const ce = 1, B = ce * 2;
function Ne(e, t, n) {
  const r = n ? re.l.preview.size : t.preview.size, o = e - B, s = t.gap * 3;
  return Math.max(o - s - r, 0);
}
function Ie(e) {
  const n = e - B;
  return {
    width: Math.max(n, 0),
    height: Math.max(Math.floor(n / 1.8), 0)
  };
}
export {
  d as C,
  de as D,
  ne as H,
  pe as O,
  ge as R,
  re as S,
  Ie as a,
  p as b,
  fe as c,
  Fe as d,
  xe as e,
  Ae as f,
  Ne as g,
  Se as h,
  ue as i,
  He as j,
  be as k,
  Me as l,
  we as m,
  ke as n,
  ve as o,
  _e as p,
  me as q,
  R as r,
  ie as s,
  Ce as t,
  N as u,
  I as v,
  ye as w,
  L as x
};
