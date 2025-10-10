import { h as P, i as j, j as X } from "./global.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
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
}, E = /* @__PURE__ */ Object.create(null);
for (const t in x)
  Object.hasOwn(x, t) && (E[x[t]] = t);
const p = {
  to: {},
  get: {}
};
p.get = function(t) {
  const n = t.slice(0, 3).toLowerCase();
  let e, r;
  switch (n) {
    case "hsl": {
      e = p.get.hsl(t), r = "hsl";
      break;
    }
    case "hwb": {
      e = p.get.hwb(t), r = "hwb";
      break;
    }
    default: {
      e = p.get.rgb(t), r = "rgb";
      break;
    }
  }
  return e ? { model: r, value: e } : null;
};
p.get.rgb = function(t) {
  if (!t)
    return null;
  const n = /^#([a-f\d]{3,4})$/i, e = /^#([a-f\d]{6})([a-f\d]{2})?$/i, r = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[\s,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/, o = /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[\s,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/, s = /^(\w+)$/;
  let a = [0, 0, 0, 1], l, i, h;
  if (l = t.match(e)) {
    for (h = l[2], l = l[1], i = 0; i < 3; i++) {
      const _ = i * 2;
      a[i] = Number.parseInt(l.slice(_, _ + 2), 16);
    }
    h && (a[3] = Number.parseInt(h, 16) / 255);
  } else if (l = t.match(n)) {
    for (l = l[1], h = l[3], i = 0; i < 3; i++)
      a[i] = Number.parseInt(l[i] + l[i], 16);
    h && (a[3] = Number.parseInt(h + h, 16) / 255);
  } else if (l = t.match(r)) {
    for (i = 0; i < 3; i++)
      a[i] = Number.parseInt(l[i + 1], 10);
    l[4] && (a[3] = l[5] ? Number.parseFloat(l[4]) * 0.01 : Number.parseFloat(l[4]));
  } else if (l = t.match(o)) {
    for (i = 0; i < 3; i++)
      a[i] = Math.round(Number.parseFloat(l[i + 1]) * 2.55);
    l[4] && (a[3] = l[5] ? Number.parseFloat(l[4]) * 0.01 : Number.parseFloat(l[4]));
  } else return (l = t.match(s)) ? l[1] === "transparent" ? [0, 0, 0, 0] : Object.hasOwn(x, l[1]) ? (a = x[l[1]], a[3] = 1, a) : null : null;
  for (i = 0; i < 3; i++)
    a[i] = k(a[i], 0, 255);
  return a[3] = k(a[3], 0, 1), a;
};
p.get.hsl = function(t) {
  if (!t)
    return null;
  const n = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, e = t.match(n);
  if (e) {
    const r = Number.parseFloat(e[4]), o = (Number.parseFloat(e[1]) % 360 + 360) % 360, s = k(Number.parseFloat(e[2]), 0, 100), a = k(Number.parseFloat(e[3]), 0, 100), l = k(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, s, a, l];
  }
  return null;
};
p.get.hwb = function(t) {
  if (!t)
    return null;
  const n = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*[\s,]\s*([+-]?[\d.]+)%\s*[\s,]\s*([+-]?[\d.]+)%\s*(?:[\s,]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, e = t.match(n);
  if (e) {
    const r = Number.parseFloat(e[4]), o = (Number.parseFloat(e[1]) % 360 + 360) % 360, s = k(Number.parseFloat(e[2]), 0, 100), a = k(Number.parseFloat(e[3]), 0, 100), l = k(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, s, a, l];
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
  const n = Math.round(t[0] / 255 * 100), e = Math.round(t[1] / 255 * 100), r = Math.round(t[2] / 255 * 100);
  return t.length < 4 || t[3] === 1 ? "rgb(" + n + "%, " + e + "%, " + r + "%)" : "rgba(" + n + "%, " + e + "%, " + r + "%, " + t[3] + ")";
};
p.to.hsl = function(...t) {
  return t.length < 4 || t[3] === 1 ? "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)" : "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + t[3] + ")";
};
p.to.hwb = function(...t) {
  let n = "";
  return t.length >= 4 && t[3] !== 1 && (n = ", " + t[3]), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + n + ")";
};
p.to.keyword = function(...t) {
  return E[t.slice(0, 3)];
};
function k(t, n, e) {
  return Math.min(Math.max(n, t), e);
}
function F(t) {
  const n = Math.round(t).toString(16).toUpperCase();
  return n.length < 2 ? "0" + n : n;
}
const A = {
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
}, R = {};
for (const t of Object.keys(A))
  R[A[t]] = t;
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
  const n = t > 31308e-7 ? 1.055 * t ** 0.4166666666666667 - 0.055 : t * 12.92;
  return Math.min(Math.max(0, n), 1);
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
  const { channels: n, labels: e } = c[t];
  delete c[t].channels, delete c[t].labels, Object.defineProperty(c[t], "channels", { value: n }), Object.defineProperty(c[t], "labels", { value: e });
}
c.rgb.hsl = function(t) {
  const n = t[0] / 255, e = t[1] / 255, r = t[2] / 255, o = Math.min(n, e, r), s = Math.max(n, e, r), a = s - o;
  let l, i;
  switch (s) {
    case o: {
      l = 0;
      break;
    }
    case n: {
      l = (e - r) / a;
      break;
    }
    case e: {
      l = 2 + (r - n) / a;
      break;
    }
    case r: {
      l = 4 + (n - e) / a;
      break;
    }
  }
  l = Math.min(l * 60, 360), l < 0 && (l += 360);
  const h = (o + s) / 2;
  return s === o ? i = 0 : h <= 0.5 ? i = a / (s + o) : i = a / (2 - s - o), [l, i * 100, h * 100];
};
c.rgb.hsv = function(t) {
  let n, e, r, o, s;
  const a = t[0] / 255, l = t[1] / 255, i = t[2] / 255, h = Math.max(a, l, i), _ = h - Math.min(a, l, i), y = function(W) {
    return (h - W) / 6 / _ + 1 / 2;
  };
  if (_ === 0)
    o = 0, s = 0;
  else {
    switch (s = _ / h, n = y(a), e = y(l), r = y(i), h) {
      case a: {
        o = r - e;
        break;
      }
      case l: {
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
    s * 100,
    h * 100
  ];
};
c.rgb.hwb = function(t) {
  const n = t[0], e = t[1];
  let r = t[2];
  const o = c.rgb.hsl(t)[0], s = 1 / 255 * Math.min(n, Math.min(e, r));
  return r = 1 - 1 / 255 * Math.max(n, Math.max(e, r)), [o, s * 100, r * 100];
};
c.rgb.oklab = function(t) {
  const n = M(t[0] / 255), e = M(t[1] / 255), r = M(t[2] / 255), o = Math.cbrt(0.4122214708 * n + 0.5363325363 * e + 0.0514459929 * r), s = Math.cbrt(0.2119034982 * n + 0.6806995451 * e + 0.1073969566 * r), a = Math.cbrt(0.0883024619 * n + 0.2817188376 * e + 0.6299787005 * r), l = 0.2104542553 * o + 0.793617785 * s - 0.0040720468 * a, i = 1.9779984951 * o - 2.428592205 * s + 0.4505937099 * a, h = 0.0259040371 * o + 0.7827717662 * s - 0.808675766 * a;
  return [l * 100, i * 100, h * 100];
};
c.rgb.cmyk = function(t) {
  const n = t[0] / 255, e = t[1] / 255, r = t[2] / 255, o = Math.min(1 - n, 1 - e, 1 - r), s = (1 - n - o) / (1 - o) || 0, a = (1 - e - o) / (1 - o) || 0, l = (1 - r - o) / (1 - o) || 0;
  return [s * 100, a * 100, l * 100, o * 100];
};
function D(t, n) {
  return (t[0] - n[0]) ** 2 + (t[1] - n[1]) ** 2 + (t[2] - n[2]) ** 2;
}
c.rgb.keyword = function(t) {
  const n = R[t];
  if (n)
    return n;
  let e = Number.POSITIVE_INFINITY, r;
  for (const o of Object.keys(A)) {
    const s = A[o], a = D(t, s);
    a < e && (e = a, r = o);
  }
  return r;
};
c.keyword.rgb = function(t) {
  return A[t];
};
c.rgb.xyz = function(t) {
  const n = M(t[0] / 255), e = M(t[1] / 255), r = M(t[2] / 255), o = n * 0.4124564 + e * 0.3575761 + r * 0.1804375, s = n * 0.2126729 + e * 0.7151522 + r * 0.072175, a = n * 0.0193339 + e * 0.119192 + r * 0.9503041;
  return [o * 100, s * 100, a * 100];
};
c.rgb.lab = function(t) {
  const n = c.rgb.xyz(t);
  let e = n[0], r = n[1], o = n[2];
  e /= 95.047, r /= 100, o /= 108.883, e = e > w ? e ** (1 / 3) : 7.787 * e + 16 / 116, r = r > w ? r ** (1 / 3) : 7.787 * r + 16 / 116, o = o > w ? o ** (1 / 3) : 7.787 * o + 16 / 116;
  const s = 116 * r - 16, a = 500 * (e - r), l = 200 * (r - o);
  return [s, a, l];
};
c.hsl.rgb = function(t) {
  const n = t[0] / 360, e = t[1] / 100, r = t[2] / 100;
  let o, s;
  if (e === 0)
    return s = r * 255, [s, s, s];
  const a = r < 0.5 ? r * (1 + e) : r + e - r * e, l = 2 * r - a, i = [0, 0, 0];
  for (let h = 0; h < 3; h++)
    o = n + 1 / 3 * -(h - 1), o < 0 && o++, o > 1 && o--, 6 * o < 1 ? s = l + (a - l) * 6 * o : 2 * o < 1 ? s = a : 3 * o < 2 ? s = l + (a - l) * (2 / 3 - o) * 6 : s = l, i[h] = s * 255;
  return i;
};
c.hsl.hsv = function(t) {
  const n = t[0];
  let e = t[1] / 100, r = t[2] / 100, o = e;
  const s = Math.max(r, 0.01);
  r *= 2, e *= r <= 1 ? r : 2 - r, o *= s <= 1 ? s : 2 - s;
  const a = (r + e) / 2, l = r === 0 ? 2 * o / (s + o) : 2 * e / (r + e);
  return [n, l * 100, a * 100];
};
c.hsv.rgb = function(t) {
  const n = t[0] / 60, e = t[1] / 100;
  let r = t[2] / 100;
  const o = Math.floor(n) % 6, s = n - Math.floor(n), a = 255 * r * (1 - e), l = 255 * r * (1 - e * s), i = 255 * r * (1 - e * (1 - s));
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
c.hsv.hsl = function(t) {
  const n = t[0], e = t[1] / 100, r = t[2] / 100, o = Math.max(r, 0.01);
  let s, a;
  a = (2 - e) * r;
  const l = (2 - e) * o;
  return s = e * o, s /= l <= 1 ? l : 2 - l, s = s || 0, a /= 2, [n, s * 100, a * 100];
};
c.hwb.rgb = function(t) {
  const n = t[0] / 360;
  let e = t[1] / 100, r = t[2] / 100;
  const o = e + r;
  let s;
  o > 1 && (e /= o, r /= o);
  const a = Math.floor(6 * n), l = 1 - r;
  s = 6 * n - a, (a & 1) !== 0 && (s = 1 - s);
  const i = e + s * (l - e);
  let h, _, y;
  switch (a) {
    default:
    case 6:
    case 0: {
      h = l, _ = i, y = e;
      break;
    }
    case 1: {
      h = i, _ = l, y = e;
      break;
    }
    case 2: {
      h = e, _ = l, y = i;
      break;
    }
    case 3: {
      h = e, _ = i, y = l;
      break;
    }
    case 4: {
      h = i, _ = e, y = l;
      break;
    }
    case 5: {
      h = l, _ = e, y = i;
      break;
    }
  }
  return [h * 255, _ * 255, y * 255];
};
c.cmyk.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100, o = t[3] / 100, s = 1 - Math.min(1, n * (1 - o) + o), a = 1 - Math.min(1, e * (1 - o) + o), l = 1 - Math.min(1, r * (1 - o) + o);
  return [s * 255, a * 255, l * 255];
};
c.xyz.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100;
  let o, s, a;
  return o = n * 3.2404542 + e * -1.5371385 + r * -0.4985314, s = n * -0.969266 + e * 1.8760108 + r * 0.041556, a = n * 0.0556434 + e * -0.2040259 + r * 1.0572252, o = S(o), s = S(s), a = S(a), [o * 255, s * 255, a * 255];
};
c.xyz.lab = function(t) {
  let n = t[0], e = t[1], r = t[2];
  n /= 95.047, e /= 100, r /= 108.883, n = n > w ? n ** (1 / 3) : 7.787 * n + 16 / 116, e = e > w ? e ** (1 / 3) : 7.787 * e + 16 / 116, r = r > w ? r ** (1 / 3) : 7.787 * r + 16 / 116;
  const o = 116 * e - 16, s = 500 * (n - e), a = 200 * (e - r);
  return [o, s, a];
};
c.xyz.oklab = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100, o = Math.cbrt(0.8189330101 * n + 0.3618667424 * e - 0.1288597137 * r), s = Math.cbrt(0.0329845436 * n + 0.9293118715 * e + 0.0361456387 * r), a = Math.cbrt(0.0482003018 * n + 0.2643662691 * e + 0.633851707 * r), l = 0.2104542553 * o + 0.793617785 * s - 0.0040720468 * a, i = 1.9779984951 * o - 2.428592205 * s + 0.4505937099 * a, h = 0.0259040371 * o + 0.7827717662 * s - 0.808675766 * a;
  return [l * 100, i * 100, h * 100];
};
c.oklab.oklch = function(t) {
  return c.lab.lch(t);
};
c.oklab.xyz = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100, o = (0.999999998 * n + 0.396337792 * e + 0.215803758 * r) ** 3, s = (1.000000008 * n - 0.105561342 * e - 0.063854175 * r) ** 3, a = (1.000000055 * n - 0.089484182 * e - 1.291485538 * r) ** 3, l = 1.227013851 * o - 0.55779998 * s + 0.281256149 * a, i = -0.040580178 * o + 1.11225687 * s - 0.071676679 * a, h = -0.076381285 * o - 0.421481978 * s + 1.58616322 * a;
  return [l * 100, i * 100, h * 100];
};
c.oklab.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100, o = (n + 0.3963377774 * e + 0.2158037573 * r) ** 3, s = (n - 0.1055613458 * e - 0.0638541728 * r) ** 3, a = (n - 0.0894841775 * e - 1.291485548 * r) ** 3, l = S(4.0767416621 * o - 3.3077115913 * s + 0.2309699292 * a), i = S(-1.2684380046 * o + 2.6097574011 * s - 0.3413193965 * a), h = S(-0.0041960863 * o - 0.7034186147 * s + 1.707614701 * a);
  return [l * 255, i * 255, h * 255];
};
c.oklch.oklab = function(t) {
  return c.lch.lab(t);
};
c.lab.xyz = function(t) {
  const n = t[0], e = t[1], r = t[2];
  let o, s, a;
  s = (n + 16) / 116, o = e / 500 + s, a = s - r / 200;
  const l = s ** 3, i = o ** 3, h = a ** 3;
  return s = l > w ? l : (s - 16 / 116) / 7.787, o = i > w ? i : (o - 16 / 116) / 7.787, a = h > w ? h : (a - 16 / 116) / 7.787, o *= 95.047, s *= 100, a *= 108.883, [o, s, a];
};
c.lab.lch = function(t) {
  const n = t[0], e = t[1], r = t[2];
  let o;
  o = Math.atan2(r, e) * 360 / 2 / Math.PI, o < 0 && (o += 360);
  const a = Math.sqrt(e * e + r * r);
  return [n, a, o];
};
c.lch.lab = function(t) {
  const n = t[0], e = t[1], o = t[2] / 360 * 2 * Math.PI, s = e * Math.cos(o), a = e * Math.sin(o);
  return [n, s, a];
};
c.rgb.ansi16 = function(t, n = null) {
  const [e, r, o] = t;
  let s = n === null ? c.rgb.hsv(t)[2] : n;
  if (s = Math.round(s / 50), s === 0)
    return 30;
  let a = 30 + (Math.round(o / 255) << 2 | Math.round(r / 255) << 1 | Math.round(e / 255));
  return s === 2 && (a += 60), a;
};
c.hsv.ansi16 = function(t) {
  return c.rgb.ansi16(c.hsv.rgb(t), t[2]);
};
c.rgb.ansi256 = function(t) {
  const n = t[0], e = t[1], r = t[2];
  return n >> 4 === e >> 4 && e >> 4 === r >> 4 ? n < 8 ? 16 : n > 248 ? 231 : Math.round((n - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(n / 255 * 5) + 6 * Math.round(e / 255 * 5) + Math.round(r / 255 * 5);
};
c.ansi16.rgb = function(t) {
  t = t[0];
  let n = t % 10;
  if (n === 0 || n === 7)
    return t > 50 && (n += 3.5), n = n / 10.5 * 255, [n, n, n];
  const e = (Math.trunc(t > 50) + 1) * 0.5, r = (n & 1) * e * 255, o = (n >> 1 & 1) * e * 255, s = (n >> 2 & 1) * e * 255;
  return [r, o, s];
};
c.ansi256.rgb = function(t) {
  if (t = t[0], t >= 232) {
    const s = (t - 232) * 10 + 8;
    return [s, s, s];
  }
  t -= 16;
  let n;
  const e = Math.floor(t / 36) / 5 * 255, r = Math.floor((n = t % 36) / 6) / 5 * 255, o = n % 6 / 5 * 255;
  return [e, r, o];
};
c.rgb.hex = function(t) {
  const e = (((Math.round(t[0]) & 255) << 16) + ((Math.round(t[1]) & 255) << 8) + (Math.round(t[2]) & 255)).toString(16).toUpperCase();
  return "000000".slice(e.length) + e;
};
c.hex.rgb = function(t) {
  const n = t.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);
  if (!n)
    return [0, 0, 0];
  let e = n[0];
  n[0].length === 3 && (e = [...e].map((l) => l + l).join(""));
  const r = Number.parseInt(e, 16), o = r >> 16 & 255, s = r >> 8 & 255, a = r & 255;
  return [o, s, a];
};
c.rgb.hcg = function(t) {
  const n = t[0] / 255, e = t[1] / 255, r = t[2] / 255, o = Math.max(Math.max(n, e), r), s = Math.min(Math.min(n, e), r), a = o - s;
  let l;
  const i = a < 1 ? s / (1 - a) : 0;
  return a <= 0 ? l = 0 : o === n ? l = (e - r) / a % 6 : o === e ? l = 2 + (r - n) / a : l = 4 + (n - e) / a, l /= 6, l %= 1, [l * 360, a * 100, i * 100];
};
c.hsl.hcg = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = e < 0.5 ? 2 * n * e : 2 * n * (1 - e);
  let o = 0;
  return r < 1 && (o = (e - 0.5 * r) / (1 - r)), [t[0], r * 100, o * 100];
};
c.hsv.hcg = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = n * e;
  let o = 0;
  return r < 1 && (o = (e - r) / (1 - r)), [t[0], r * 100, o * 100];
};
c.hcg.rgb = function(t) {
  const n = t[0] / 360, e = t[1] / 100, r = t[2] / 100;
  if (e === 0)
    return [r * 255, r * 255, r * 255];
  const o = [0, 0, 0], s = n % 1 * 6, a = s % 1, l = 1 - a;
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
  return i = (1 - e) * r, [
    (e * o[0] + i) * 255,
    (e * o[1] + i) * 255,
    (e * o[2] + i) * 255
  ];
};
c.hcg.hsv = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = n + e * (1 - n);
  let o = 0;
  return r > 0 && (o = n / r), [t[0], o * 100, r * 100];
};
c.hcg.hsl = function(t) {
  const n = t[1] / 100, r = t[2] / 100 * (1 - n) + 0.5 * n;
  let o = 0;
  return r > 0 && r < 0.5 ? o = n / (2 * r) : r >= 0.5 && r < 1 && (o = n / (2 * (1 - r))), [t[0], o * 100, r * 100];
};
c.hcg.hwb = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = n + e * (1 - n);
  return [t[0], (r - n) * 100, (1 - r) * 100];
};
c.hwb.hcg = function(t) {
  const n = t[1] / 100, r = 1 - t[2] / 100, o = r - n;
  let s = 0;
  return o < 1 && (s = (r - o) / (1 - o)), [t[0], o * 100, s * 100];
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
  const n = Math.round(t[0] / 100 * 255) & 255, r = ((n << 16) + (n << 8) + n).toString(16).toUpperCase();
  return "000000".slice(r.length) + r;
};
c.rgb.gray = function(t) {
  return [(t[0] + t[1] + t[2]) / 3 / 255 * 100];
};
function U() {
  const t = {}, n = Object.keys(c);
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
    const r = e.pop(), o = Object.keys(c[r]);
    for (let { length: s } = o, a = 0; a < s; a++) {
      const l = o[a], i = n[l];
      i.distance === -1 && (i.distance = n[r].distance + 1, i.parent = r, e.unshift(l));
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
  let r = c[n[t].parent][t], o = n[t].parent;
  for (; n[o].parent; )
    e.unshift(n[o].parent), r = Y(c[n[o].parent][o], r), o = n[o].parent;
  return r.conversion = e, r;
}
function Z(t) {
  const n = K(t), e = {}, r = Object.keys(n);
  for (let { length: o } = r, s = 0; s < o; s++) {
    const a = r[s];
    n[a].parent !== null && (e[a] = J(a, n));
  }
  return e;
}
const m = {}, Q = Object.keys(c);
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
      for (let { length: s } = o, a = 0; a < s; a++)
        o[a] = Math.round(o[a]);
    return o;
  };
  return "conversion" in t && (n.conversion = t.conversion), n;
}
for (const t of Q) {
  m[t] = {}, Object.defineProperty(m[t], "channels", { value: c[t].channels }), Object.defineProperty(m[t], "labels", { value: c[t].labels });
  const n = Z(t), e = Object.keys(n);
  for (const r of e) {
    const o = n[r];
    m[t][r] = tt(o), m[t][r].raw = V(o);
  }
}
const $ = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  "keyword",
  // Gray conflicts with some method names, and has its own method defined.
  "gray",
  // Shouldn't really be in color-convert either...
  "hex"
], H = {};
for (const t of Object.keys(m))
  H[[...m[t].labels].sort().join("")] = t;
const N = {};
function g(t, n) {
  if (!(this instanceof g))
    return new g(t, n);
  if (n && n in $ && (n = null), n && !(n in m))
    throw new Error("Unknown model: " + n);
  let e, r;
  if (t == null)
    this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
  else if (t instanceof g)
    this.model = t.model, this.color = [...t.color], this.valpha = t.valpha;
  else if (typeof t == "string") {
    const o = p.get(t);
    if (o === null)
      throw new Error("Unable to parse color from string: " + t);
    this.model = o.model, r = m[this.model].channels, this.color = o.value.slice(0, r), this.valpha = typeof o.value[r] == "number" ? o.value[r] : 1;
  } else if (t.length > 0) {
    this.model = n || "rgb", r = m[this.model].channels;
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
    const s = o.sort().join("");
    if (!(s in H))
      throw new Error("Unable to parse color from object: " + JSON.stringify(t));
    this.model = H[s];
    const { labels: a } = m[this.model], l = [];
    for (e = 0; e < a.length; e++)
      l.push(t[a[e]]);
    this.color = I(l);
  }
  if (N[this.model])
    for (r = m[this.model].channels, e = 0; e < r; e++) {
      const o = N[this.model][e];
      o && (this.color[e] = o(this.color[e]));
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
    let n = this.model in p.to ? this : this.rgb();
    n = n.round(typeof t == "number" ? t : 1);
    const e = n.valpha === 1 ? n.color : [...n.color, this.valpha];
    return p.to[n.model](...e);
  },
  percentString(t) {
    const n = this.rgb().round(typeof t == "number" ? t : 1), e = n.valpha === 1 ? n.color : [...n.color, this.valpha];
    return p.to.rgb.percent(...e);
  },
  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
  },
  object() {
    const t = {}, { channels: n } = m[this.model], { labels: e } = m[this.model];
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
    return t = Math.max(t || 0, 0), new g([...this.color.map(et(t)), this.valpha], this.model);
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
    return t !== void 0 ? new g(t) : m[this.model].keyword(this.color);
  },
  hex(t) {
    return t !== void 0 ? new g(t) : p.to.hex(...this.rgb().round().color);
  },
  hexa(t) {
    if (t !== void 0)
      return new g(t);
    const n = this.rgb().round().color;
    let e = Math.round(this.valpha * 255).toString(16).toUpperCase();
    return e.length === 1 && (e = "0" + e), p.to.hex(...n) + e;
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
    return g.rgb(n, n, n);
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
    const e = t.rgb(), r = this.rgb(), o = n === void 0 ? 0.5 : n, s = 2 * o - 1, a = e.alpha() - r.alpha(), l = ((s * a === -1 ? s : (s + a) / (1 + s * a)) + 1) / 2, i = 1 - l;
    return g.rgb(
      l * e.red() + i * r.red(),
      l * e.green() + i * r.green(),
      l * e.blue() + i * r.blue(),
      e.alpha() * o + r.alpha() * (1 - o)
    );
  }
};
for (const t of Object.keys(m)) {
  if ($.includes(t))
    continue;
  const { channels: n } = m[t];
  g.prototype[t] = function(...e) {
    return this.model === t ? new g(this) : e.length > 0 ? new g(e, t) : new g([...rt(m[this.model][t].raw(this.color)), this.valpha], t);
  }, g[t] = function(...e) {
    let r = e[0];
    return typeof r == "number" && (r = I(e, n)), new g(r, t);
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
const gt = {
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
}, pt = g("#007AC2"), mt = "calcite-color-", _t = {
  r: 255,
  g: 255,
  b: 255
}, ot = {
  h: 360,
  s: 100,
  v: 100
}, yt = ot.h - 1, wt = {
  min: 0,
  max: 100
}, st = {
  s: {
    gap: parseInt(X),
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
    gap: parseInt(j),
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
    gap: parseInt(P),
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
}, kt = 1, vt = {
  minus: "minus",
  plus: "plus"
}, St = /^[0-9A-F]$/i, at = /^#[0-9A-F]{3}$/i, lt = /^#[0-9A-F]{6}$/i, it = /^#[0-9A-F]{4}$/i, ct = /^#[0-9A-F]{8}$/i;
function Mt(t, n = !1, e) {
  return n && !t ? null : g(
    t != null && typeof t == "object" && ft(e) ? ut(t) : t
  );
}
const xt = (t) => Number((t * 100).toFixed()), At = (t) => Number((t / 100).toFixed(2));
function q(t, n = !1) {
  return O(t, n) || ht(t, n);
}
function B(t, n, e) {
  return t ? t.length === n && e.test(t) : !1;
}
function O(t, n = !1) {
  return B(t, n ? 5 : 4, n ? it : at);
}
function ht(t, n = !1) {
  return B(t, n ? 9 : 7, n ? ct : lt);
}
function Ft(t, n = !1, e = !1) {
  if (t = t.toLowerCase(), t.startsWith("#") || (t = `#${t}`), O(t, n))
    return L(z(t, n));
  if (n && e && q(
    t,
    !1
    /* we only care about RGB hex for conversion */
  )) {
    const r = O(t, !1);
    return L(z(`${t}${r ? "f" : "ff"}`, !0));
  }
  return t;
}
function Ct(t, n = !1) {
  return n ? t.hexa() : t.hex();
}
function L(t) {
  const { r: n, g: e, b: r } = t, o = C(n), s = C(e), a = C(r), l = "a" in t ? C(t.a * 255) : "";
  return `#${o}${s}${a}${l}`.toLowerCase();
}
function C(t) {
  return t.toString(16).padStart(2, "0");
}
function Ht(t) {
  const n = {
    ...t,
    a: t.alpha ?? 1
    /* Color() will omit alpha if 1 */
  };
  return delete n.alpha, n;
}
function ut(t) {
  const n = { ...t, alpha: t.a ?? 1 };
  return delete n.a, n;
}
function z(t, n = !1) {
  if (!q(t, n))
    return null;
  t = t.replace("#", "");
  let e, r, o, s;
  if (t.length === 3 || t.length === 4) {
    const [l, i, h, _] = t.split("");
    e = parseInt(`${l}${l}`, 16), r = parseInt(`${i}${i}`, 16), o = parseInt(`${h}${h}`, 16), s = parseInt(`${_}${_}`, 16) / 255;
  } else
    e = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), o = parseInt(t.slice(4, 6), 16), s = parseInt(t.slice(6, 8), 16) / 255;
  return isNaN(s) ? { r: e, g: r, b: o } : { r: e, g: r, b: o, a: s };
}
const G = (t) => t, f = G({
  HEX: "hex",
  HEXA: "hexa",
  RGB_CSS: "rgb-css",
  RGBA_CSS: "rgba-css",
  HSL_CSS: "hsl-css",
  HSLA_CSS: "hsla-css"
}), d = G({
  RGB: "rgb",
  RGBA: "rgba",
  HSL: "hsl",
  HSLA: "hsla",
  HSV: "hsv",
  HSVA: "hsva"
});
function Nt(t) {
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
    if (v(t, "r", "g", "b"))
      return v(t, "a") ? d.RGBA : d.RGB;
    if (v(t, "h", "s", "l"))
      return v(t, "a") ? d.HSLA : d.HSL;
    if (v(t, "h", "s", "v"))
      return v(t, "a") ? d.HSVA : d.HSV;
  }
  return null;
}
function v(t, ...n) {
  return n.every((e) => e && t && `${e}` in t);
}
function It(t, n) {
  return t?.rgb().array().toString() === n?.rgb().array().toString();
}
function ft(t) {
  return t === f.HEXA || t === f.RGBA_CSS || t === f.HSLA_CSS || t === d.RGBA || t === d.HSLA || t === d.HSVA;
}
function Ot(t) {
  return t === f.HEX ? f.HEXA : t === f.RGB_CSS ? f.RGBA_CSS : t === f.HSL_CSS ? f.HSLA_CSS : t === d.RGB ? d.RGBA : t === d.HSL ? d.HSLA : t === d.HSV ? d.HSVA : t;
}
function Lt(t) {
  return t === f.HEXA ? f.HEX : t === f.RGBA_CSS ? f.RGB_CSS : t === f.HSLA_CSS ? f.HSL_CSS : t === d.RGBA ? d.RGB : t === d.HSLA ? d.HSL : t === d.HSVA ? d.HSV : t;
}
const dt = 1, T = dt * 2;
function zt(t, n, e) {
  const r = e ? st.l.preview.size : n.preview.size, o = t - T, s = n.gap * 3;
  return Math.max(o - s - r, 0);
}
function Et(t) {
  const e = t - T;
  return {
    width: Math.max(e, 0),
    height: Math.max(Math.floor(e / 1.8), 0)
  };
}
export {
  f as C,
  pt as D,
  ot as H,
  vt as I,
  wt as O,
  _t as R,
  st as S,
  Et as a,
  mt as b,
  Mt as c,
  ft as d,
  It as e,
  g as f,
  zt as g,
  Ct as h,
  gt as i,
  Lt as j,
  yt as k,
  Ht as l,
  xt as m,
  Ft as n,
  At as o,
  Nt as p,
  kt as q,
  q as r,
  ht as s,
  Ot as t,
  O as u,
  L as v,
  St as w,
  z as x
};
