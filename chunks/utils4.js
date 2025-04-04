import { h as T, i as q, j as W } from "./global.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
const v = {
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
}, L = /* @__PURE__ */ Object.create(null);
for (const t in v)
  Object.hasOwn(v, t) && (L[v[t]] = t);
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
  const n = /^#([a-f\d]{3,4})$/i, e = /^#([a-f\d]{6})([a-f\d]{2})?$/i, r = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/, s = /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/, o = /^(\w+)$/;
  let a = [0, 0, 0, 1], i, c, h;
  if (i = t.match(e)) {
    for (h = i[2], i = i[1], c = 0; c < 3; c++) {
      const y = c * 2;
      a[c] = Number.parseInt(i.slice(y, y + 2), 16);
    }
    h && (a[3] = Number.parseInt(h, 16) / 255);
  } else if (i = t.match(n)) {
    for (i = i[1], h = i[3], c = 0; c < 3; c++)
      a[c] = Number.parseInt(i[c] + i[c], 16);
    h && (a[3] = Number.parseInt(h + h, 16) / 255);
  } else if (i = t.match(r)) {
    for (c = 0; c < 3; c++)
      a[c] = Number.parseInt(i[c + 1], 10);
    i[4] && (a[3] = i[5] ? Number.parseFloat(i[4]) * 0.01 : Number.parseFloat(i[4]));
  } else if (i = t.match(s)) {
    for (c = 0; c < 3; c++)
      a[c] = Math.round(Number.parseFloat(i[c + 1]) * 2.55);
    i[4] && (a[3] = i[5] ? Number.parseFloat(i[4]) * 0.01 : Number.parseFloat(i[4]));
  } else return (i = t.match(o)) ? i[1] === "transparent" ? [0, 0, 0, 0] : Object.hasOwn(v, i[1]) ? (a = v[i[1]], a[3] = 1, a) : null : null;
  for (c = 0; c < 3; c++)
    a[c] = k(a[c], 0, 255);
  return a[3] = k(a[3], 0, 1), a;
};
p.get.hsl = function(t) {
  if (!t)
    return null;
  const n = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, e = t.match(n);
  if (e) {
    const r = Number.parseFloat(e[4]), s = (Number.parseFloat(e[1]) % 360 + 360) % 360, o = k(Number.parseFloat(e[2]), 0, 100), a = k(Number.parseFloat(e[3]), 0, 100), i = k(Number.isNaN(r) ? 1 : r, 0, 1);
    return [s, o, a, i];
  }
  return null;
};
p.get.hwb = function(t) {
  if (!t)
    return null;
  const n = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, e = t.match(n);
  if (e) {
    const r = Number.parseFloat(e[4]), s = (Number.parseFloat(e[1]) % 360 + 360) % 360, o = k(Number.parseFloat(e[2]), 0, 100), a = k(Number.parseFloat(e[3]), 0, 100), i = k(Number.isNaN(r) ? 1 : r, 0, 1);
    return [s, o, a, i];
  }
  return null;
};
p.to.hex = function(...t) {
  return "#" + x(t[0]) + x(t[1]) + x(t[2]) + (t[3] < 1 ? x(Math.round(t[3] * 255)) : "");
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
  return L[t.slice(0, 3)];
};
function k(t, n, e) {
  return Math.min(Math.max(n, t), e);
}
function x(t) {
  const n = Math.round(t).toString(16).toUpperCase();
  return n.length < 2 ? "0" + n : n;
}
const O = {};
for (const t of Object.keys(v))
  O[v[t]] = t;
const l = {
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
}, S = (6 / 29) ** 3;
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
  const n = t[0] / 255, e = t[1] / 255, r = t[2] / 255, s = Math.min(n, e, r), o = Math.max(n, e, r), a = o - s;
  let i, c;
  switch (o) {
    case s: {
      i = 0;
      break;
    }
    case n: {
      i = (e - r) / a;
      break;
    }
    case e: {
      i = 2 + (r - n) / a;
      break;
    }
    case r: {
      i = 4 + (n - e) / a;
      break;
    }
  }
  i = Math.min(i * 60, 360), i < 0 && (i += 360);
  const h = (s + o) / 2;
  return o === s ? c = 0 : h <= 0.5 ? c = a / (o + s) : c = a / (2 - o - s), [i, c * 100, h * 100];
};
l.rgb.hsv = function(t) {
  let n, e, r, s, o;
  const a = t[0] / 255, i = t[1] / 255, c = t[2] / 255, h = Math.max(a, i, c), y = h - Math.min(a, i, c), w = function(G) {
    return (h - G) / 6 / y + 1 / 2;
  };
  if (y === 0)
    s = 0, o = 0;
  else {
    switch (o = y / h, n = w(a), e = w(i), r = w(c), h) {
      case a: {
        s = r - e;
        break;
      }
      case i: {
        s = 1 / 3 + n - r;
        break;
      }
      case c: {
        s = 2 / 3 + e - n;
        break;
      }
    }
    s < 0 ? s += 1 : s > 1 && (s -= 1);
  }
  return [
    s * 360,
    o * 100,
    h * 100
  ];
};
l.rgb.hwb = function(t) {
  const n = t[0], e = t[1];
  let r = t[2];
  const s = l.rgb.hsl(t)[0], o = 1 / 255 * Math.min(n, Math.min(e, r));
  return r = 1 - 1 / 255 * Math.max(n, Math.max(e, r)), [s, o * 100, r * 100];
};
l.rgb.cmyk = function(t) {
  const n = t[0] / 255, e = t[1] / 255, r = t[2] / 255, s = Math.min(1 - n, 1 - e, 1 - r), o = (1 - n - s) / (1 - s) || 0, a = (1 - e - s) / (1 - s) || 0, i = (1 - r - s) / (1 - s) || 0;
  return [o * 100, a * 100, i * 100, s * 100];
};
function P(t, n) {
  return (t[0] - n[0]) ** 2 + (t[1] - n[1]) ** 2 + (t[2] - n[2]) ** 2;
}
l.rgb.keyword = function(t) {
  const n = O[t];
  if (n)
    return n;
  let e = Number.POSITIVE_INFINITY, r;
  for (const s of Object.keys(v)) {
    const o = v[s], a = P(t, o);
    a < e && (e = a, r = s);
  }
  return r;
};
l.keyword.rgb = function(t) {
  return v[t];
};
l.rgb.xyz = function(t) {
  let n = t[0] / 255, e = t[1] / 255, r = t[2] / 255;
  n = n > 0.04045 ? ((n + 0.055) / 1.055) ** 2.4 : n / 12.92, e = e > 0.04045 ? ((e + 0.055) / 1.055) ** 2.4 : e / 12.92, r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  const s = n * 0.4124564 + e * 0.3575761 + r * 0.1804375, o = n * 0.2126729 + e * 0.7151522 + r * 0.072175, a = n * 0.0193339 + e * 0.119192 + r * 0.9503041;
  return [s * 100, o * 100, a * 100];
};
l.rgb.lab = function(t) {
  const n = l.rgb.xyz(t);
  let e = n[0], r = n[1], s = n[2];
  e /= 95.047, r /= 100, s /= 108.883, e = e > S ? e ** (1 / 3) : 7.787 * e + 16 / 116, r = r > S ? r ** (1 / 3) : 7.787 * r + 16 / 116, s = s > S ? s ** (1 / 3) : 7.787 * s + 16 / 116;
  const o = 116 * r - 16, a = 500 * (e - r), i = 200 * (r - s);
  return [o, a, i];
};
l.hsl.rgb = function(t) {
  const n = t[0] / 360, e = t[1] / 100, r = t[2] / 100;
  let s, o;
  if (e === 0)
    return o = r * 255, [o, o, o];
  const a = r < 0.5 ? r * (1 + e) : r + e - r * e, i = 2 * r - a, c = [0, 0, 0];
  for (let h = 0; h < 3; h++)
    s = n + 1 / 3 * -(h - 1), s < 0 && s++, s > 1 && s--, 6 * s < 1 ? o = i + (a - i) * 6 * s : 2 * s < 1 ? o = a : 3 * s < 2 ? o = i + (a - i) * (2 / 3 - s) * 6 : o = i, c[h] = o * 255;
  return c;
};
l.hsl.hsv = function(t) {
  const n = t[0];
  let e = t[1] / 100, r = t[2] / 100, s = e;
  const o = Math.max(r, 0.01);
  r *= 2, e *= r <= 1 ? r : 2 - r, s *= o <= 1 ? o : 2 - o;
  const a = (r + e) / 2, i = r === 0 ? 2 * s / (o + s) : 2 * e / (r + e);
  return [n, i * 100, a * 100];
};
l.hsv.rgb = function(t) {
  const n = t[0] / 60, e = t[1] / 100;
  let r = t[2] / 100;
  const s = Math.floor(n) % 6, o = n - Math.floor(n), a = 255 * r * (1 - e), i = 255 * r * (1 - e * o), c = 255 * r * (1 - e * (1 - o));
  switch (r *= 255, s) {
    case 0:
      return [r, c, a];
    case 1:
      return [i, r, a];
    case 2:
      return [a, r, c];
    case 3:
      return [a, i, r];
    case 4:
      return [c, a, r];
    case 5:
      return [r, a, i];
  }
};
l.hsv.hsl = function(t) {
  const n = t[0], e = t[1] / 100, r = t[2] / 100, s = Math.max(r, 0.01);
  let o, a;
  a = (2 - e) * r;
  const i = (2 - e) * s;
  return o = e * s, o /= i <= 1 ? i : 2 - i, o = o || 0, a /= 2, [n, o * 100, a * 100];
};
l.hwb.rgb = function(t) {
  const n = t[0] / 360;
  let e = t[1] / 100, r = t[2] / 100;
  const s = e + r;
  let o;
  s > 1 && (e /= s, r /= s);
  const a = Math.floor(6 * n), i = 1 - r;
  o = 6 * n - a, a & 1 && (o = 1 - o);
  const c = e + o * (i - e);
  let h, y, w;
  switch (a) {
    default:
    case 6:
    case 0: {
      h = i, y = c, w = e;
      break;
    }
    case 1: {
      h = c, y = i, w = e;
      break;
    }
    case 2: {
      h = e, y = i, w = c;
      break;
    }
    case 3: {
      h = e, y = c, w = i;
      break;
    }
    case 4: {
      h = c, y = e, w = i;
      break;
    }
    case 5: {
      h = i, y = e, w = c;
      break;
    }
  }
  return [h * 255, y * 255, w * 255];
};
l.cmyk.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100, s = t[3] / 100, o = 1 - Math.min(1, n * (1 - s) + s), a = 1 - Math.min(1, e * (1 - s) + s), i = 1 - Math.min(1, r * (1 - s) + s);
  return [o * 255, a * 255, i * 255];
};
l.xyz.rgb = function(t) {
  const n = t[0] / 100, e = t[1] / 100, r = t[2] / 100;
  let s, o, a;
  return s = n * 3.2404542 + e * -1.5371385 + r * -0.4985314, o = n * -0.969266 + e * 1.8760108 + r * 0.041556, a = n * 0.0556434 + e * -0.2040259 + r * 1.0572252, s = s > 31308e-7 ? 1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92, o = o > 31308e-7 ? 1.055 * o ** (1 / 2.4) - 0.055 : o * 12.92, a = a > 31308e-7 ? 1.055 * a ** (1 / 2.4) - 0.055 : a * 12.92, s = Math.min(Math.max(0, s), 1), o = Math.min(Math.max(0, o), 1), a = Math.min(Math.max(0, a), 1), [s * 255, o * 255, a * 255];
};
l.xyz.lab = function(t) {
  let n = t[0], e = t[1], r = t[2];
  n /= 95.047, e /= 100, r /= 108.883, n = n > S ? n ** (1 / 3) : 7.787 * n + 16 / 116, e = e > S ? e ** (1 / 3) : 7.787 * e + 16 / 116, r = r > S ? r ** (1 / 3) : 7.787 * r + 16 / 116;
  const s = 116 * e - 16, o = 500 * (n - e), a = 200 * (e - r);
  return [s, o, a];
};
l.lab.xyz = function(t) {
  const n = t[0], e = t[1], r = t[2];
  let s, o, a;
  o = (n + 16) / 116, s = e / 500 + o, a = o - r / 200;
  const i = o ** 3, c = s ** 3, h = a ** 3;
  return o = i > S ? i : (o - 16 / 116) / 7.787, s = c > S ? c : (s - 16 / 116) / 7.787, a = h > S ? h : (a - 16 / 116) / 7.787, s *= 95.047, o *= 100, a *= 108.883, [s, o, a];
};
l.lab.lch = function(t) {
  const n = t[0], e = t[1], r = t[2];
  let s;
  s = Math.atan2(r, e) * 360 / 2 / Math.PI, s < 0 && (s += 360);
  const a = Math.sqrt(e * e + r * r);
  return [n, a, s];
};
l.lch.lab = function(t) {
  const n = t[0], e = t[1], s = t[2] / 360 * 2 * Math.PI, o = e * Math.cos(s), a = e * Math.sin(s);
  return [n, o, a];
};
l.rgb.ansi16 = function(t, n = null) {
  const [e, r, s] = t;
  let o = n === null ? l.rgb.hsv(t)[2] : n;
  if (o = Math.round(o / 50), o === 0)
    return 30;
  let a = 30 + (Math.round(s / 255) << 2 | Math.round(r / 255) << 1 | Math.round(e / 255));
  return o === 2 && (a += 60), a;
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
  const e = (Math.trunc(t > 50) + 1) * 0.5, r = (n & 1) * e * 255, s = (n >> 1 & 1) * e * 255, o = (n >> 2 & 1) * e * 255;
  return [r, s, o];
};
l.ansi256.rgb = function(t) {
  if (t = t[0], t >= 232) {
    const o = (t - 232) * 10 + 8;
    return [o, o, o];
  }
  t -= 16;
  let n;
  const e = Math.floor(t / 36) / 5 * 255, r = Math.floor((n = t % 36) / 6) / 5 * 255, s = n % 6 / 5 * 255;
  return [e, r, s];
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
  n[0].length === 3 && (e = [...e].map((i) => i + i).join(""));
  const r = Number.parseInt(e, 16), s = r >> 16 & 255, o = r >> 8 & 255, a = r & 255;
  return [s, o, a];
};
l.rgb.hcg = function(t) {
  const n = t[0] / 255, e = t[1] / 255, r = t[2] / 255, s = Math.max(Math.max(n, e), r), o = Math.min(Math.min(n, e), r), a = s - o;
  let i;
  const c = a < 1 ? o / (1 - a) : 0;
  return a <= 0 ? i = 0 : s === n ? i = (e - r) / a % 6 : s === e ? i = 2 + (r - n) / a : i = 4 + (n - e) / a, i /= 6, i %= 1, [i * 360, a * 100, c * 100];
};
l.hsl.hcg = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = e < 0.5 ? 2 * n * e : 2 * n * (1 - e);
  let s = 0;
  return r < 1 && (s = (e - 0.5 * r) / (1 - r)), [t[0], r * 100, s * 100];
};
l.hsv.hcg = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = n * e;
  let s = 0;
  return r < 1 && (s = (e - r) / (1 - r)), [t[0], r * 100, s * 100];
};
l.hcg.rgb = function(t) {
  const n = t[0] / 360, e = t[1] / 100, r = t[2] / 100;
  if (e === 0)
    return [r * 255, r * 255, r * 255];
  const s = [0, 0, 0], o = n % 1 * 6, a = o % 1, i = 1 - a;
  let c = 0;
  switch (Math.floor(o)) {
    case 0: {
      s[0] = 1, s[1] = a, s[2] = 0;
      break;
    }
    case 1: {
      s[0] = i, s[1] = 1, s[2] = 0;
      break;
    }
    case 2: {
      s[0] = 0, s[1] = 1, s[2] = a;
      break;
    }
    case 3: {
      s[0] = 0, s[1] = i, s[2] = 1;
      break;
    }
    case 4: {
      s[0] = a, s[1] = 0, s[2] = 1;
      break;
    }
    default:
      s[0] = 1, s[1] = 0, s[2] = i;
  }
  return c = (1 - e) * r, [
    (e * s[0] + c) * 255,
    (e * s[1] + c) * 255,
    (e * s[2] + c) * 255
  ];
};
l.hcg.hsv = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = n + e * (1 - n);
  let s = 0;
  return r > 0 && (s = n / r), [t[0], s * 100, r * 100];
};
l.hcg.hsl = function(t) {
  const n = t[1] / 100, r = t[2] / 100 * (1 - n) + 0.5 * n;
  let s = 0;
  return r > 0 && r < 0.5 ? s = n / (2 * r) : r >= 0.5 && r < 1 && (s = n / (2 * (1 - r))), [t[0], s * 100, r * 100];
};
l.hcg.hwb = function(t) {
  const n = t[1] / 100, e = t[2] / 100, r = n + e * (1 - n);
  return [t[0], (r - n) * 100, (1 - r) * 100];
};
l.hwb.hcg = function(t) {
  const n = t[1] / 100, r = 1 - t[2] / 100, s = r - n;
  let o = 0;
  return s < 1 && (o = (r - s) / (1 - s)), [t[0], s * 100, o * 100];
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
function X() {
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
function j(t) {
  const n = X(), e = [t];
  for (n[t].distance = 0; e.length > 0; ) {
    const r = e.pop(), s = Object.keys(l[r]);
    for (let { length: o } = s, a = 0; a < o; a++) {
      const i = s[a], c = n[i];
      c.distance === -1 && (c.distance = n[r].distance + 1, c.parent = r, e.unshift(i));
    }
  }
  return n;
}
function D(t, n) {
  return function(e) {
    return n(t(e));
  };
}
function U(t, n) {
  const e = [n[t].parent, t];
  let r = l[n[t].parent][t], s = n[t].parent;
  for (; n[s].parent; )
    e.unshift(n[s].parent), r = D(l[n[s].parent][s], r), s = n[s].parent;
  return r.conversion = e, r;
}
function K(t) {
  const n = j(t), e = {}, r = Object.keys(n);
  for (let { length: s } = r, o = 0; o < s; o++) {
    const a = r[o];
    n[a].parent !== null && (e[a] = U(a, n));
  }
  return e;
}
const m = {}, Y = Object.keys(l);
function J(t) {
  const n = function(...e) {
    const r = e[0];
    return r == null ? r : (r.length > 1 && (e = r), t(e));
  };
  return "conversion" in t && (n.conversion = t.conversion), n;
}
function Z(t) {
  const n = function(...e) {
    const r = e[0];
    if (r == null)
      return r;
    r.length > 1 && (e = r);
    const s = t(e);
    if (typeof s == "object")
      for (let { length: o } = s, a = 0; a < o; a++)
        s[a] = Math.round(s[a]);
    return s;
  };
  return "conversion" in t && (n.conversion = t.conversion), n;
}
for (const t of Y) {
  m[t] = {}, Object.defineProperty(m[t], "channels", { value: l[t].channels }), Object.defineProperty(m[t], "labels", { value: l[t].labels });
  const n = K(t), e = Object.keys(n);
  for (const r of e) {
    const s = n[r];
    m[t][r] = Z(s), m[t][r].raw = J(s);
  }
}
const E = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  "keyword",
  // Gray conflicts with some method names, and has its own method defined.
  "gray",
  // Shouldn't really be in color-convert either...
  "hex"
], A = {};
for (const t of Object.keys(m))
  A[[...m[t].labels].sort().join("")] = t;
const F = {};
function g(t, n) {
  if (!(this instanceof g))
    return new g(t, n);
  if (n && n in E && (n = null), n && !(n in m))
    throw new Error("Unknown model: " + n);
  let e, r;
  if (t == null)
    this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
  else if (t instanceof g)
    this.model = t.model, this.color = [...t.color], this.valpha = t.valpha;
  else if (typeof t == "string") {
    const s = p.get(t);
    if (s === null)
      throw new Error("Unable to parse color from string: " + t);
    this.model = s.model, r = m[this.model].channels, this.color = s.value.slice(0, r), this.valpha = typeof s.value[r] == "number" ? s.value[r] : 1;
  } else if (t.length > 0) {
    this.model = n || "rgb", r = m[this.model].channels;
    const s = Array.prototype.slice.call(t, 0, r);
    this.color = C(s, r), this.valpha = typeof t[r] == "number" ? t[r] : 1;
  } else if (typeof t == "number")
    this.model = "rgb", this.color = [
      t >> 16 & 255,
      t >> 8 & 255,
      t & 255
    ], this.valpha = 1;
  else {
    this.valpha = 1;
    const s = Object.keys(t);
    "alpha" in t && (s.splice(s.indexOf("alpha"), 1), this.valpha = typeof t.alpha == "number" ? t.alpha : 0);
    const o = s.sort().join("");
    if (!(o in A))
      throw new Error("Unable to parse color from object: " + JSON.stringify(t));
    this.model = A[o];
    const { labels: a } = m[this.model], i = [];
    for (e = 0; e < a.length; e++)
      i.push(t[a[e]]);
    this.color = C(i);
  }
  if (F[this.model])
    for (r = m[this.model].channels, e = 0; e < r; e++) {
      const s = F[this.model][e];
      s && (this.color[e] = s(this.color[e]));
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
    return t = Math.max(t || 0, 0), new g([...this.color.map(V(t)), this.valpha], this.model);
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
      const s = r / 255;
      n[e] = s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
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
    const e = t.rgb(), r = this.rgb(), s = n === void 0 ? 0.5 : n, o = 2 * s - 1, a = e.alpha() - r.alpha(), i = ((o * a === -1 ? o : (o + a) / (1 + o * a)) + 1) / 2, c = 1 - i;
    return g.rgb(
      i * e.red() + c * r.red(),
      i * e.green() + c * r.green(),
      i * e.blue() + c * r.blue(),
      e.alpha() * s + r.alpha() * (1 - s)
    );
  }
};
for (const t of Object.keys(m)) {
  if (E.includes(t))
    continue;
  const { channels: n } = m[t];
  g.prototype[t] = function(...e) {
    return this.model === t ? new g(this) : e.length > 0 ? new g(e, t) : new g([...tt(m[this.model][t].raw(this.color)), this.valpha], t);
  }, g[t] = function(...e) {
    let r = e[0];
    return typeof r == "number" && (r = C(e, n)), new g(r, t);
  };
}
function Q(t, n) {
  return Number(t.toFixed(n));
}
function V(t) {
  return function(n) {
    return Q(n, t);
  };
}
function u(t, n, e) {
  t = Array.isArray(t) ? t : [t];
  for (const r of t)
    (F[r] ||= [])[n] = e;
  return t = t[0], function(r) {
    let s;
    return r !== void 0 ? (e && (r = e(r)), s = this[t](), s.color[n] = r, s) : (s = this[t]().color[n], e && (s = e(s)), s);
  };
}
function b(t) {
  return function(n) {
    return Math.max(0, Math.min(t, n));
  };
}
function tt(t) {
  return Array.isArray(t) ? t : [t];
}
function C(t, n) {
  for (let e = 0; e < n; e++)
    typeof t[e] != "number" && (t[e] = 0);
  return t;
}
const ht = {
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
}, ut = g("#007AC2"), ft = "calcite-color-", dt = {
  r: 255,
  g: 255,
  b: 255
}, nt = {
  h: 360,
  s: 100,
  v: 100
}, bt = nt.h - 1, pt = {
  min: 0,
  max: 100
}, et = {
  s: {
    gap: parseInt(W),
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
    gap: parseInt(q),
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
}, gt = 1, mt = /^[0-9A-F]$/i, rt = /^#[0-9A-F]{3}$/i, st = /^#[0-9A-F]{6}$/i, ot = /^#[0-9A-F]{4}$/i, at = /^#[0-9A-F]{8}$/i, yt = (t) => Number((t * 100).toFixed()), wt = (t) => Number((t / 100).toFixed(2));
function R(t, n = !1) {
  return H(t, n) || it(t, n);
}
function z(t, n, e) {
  return t ? t.length === n && e.test(t) : !1;
}
function H(t, n = !1) {
  return z(t, n ? 5 : 4, n ? ot : rt);
}
function it(t, n = !1) {
  return z(t, n ? 9 : 7, n ? at : st);
}
function vt(t, n = !1, e = !1) {
  if (t = t.toLowerCase(), t.startsWith("#") || (t = `#${t}`), H(t, n))
    return N(I(t, n));
  if (n && e && R(
    t,
    !1
    /* we only care about RGB hex for conversion */
  )) {
    const r = H(t, !1);
    return N(I(`${t}${r ? "f" : "ff"}`, !0));
  }
  return t;
}
function St(t, n = !1) {
  return n ? t.hexa() : t.hex();
}
function N(t) {
  const { r: n, g: e, b: r } = t, s = _(n), o = _(e), a = _(r), i = "a" in t ? _(t.a * 255) : "";
  return `#${s}${o}${a}${i}`.toLowerCase();
}
function _(t) {
  return t.toString(16).padStart(2, "0");
}
function kt(t) {
  const n = {
    ...t,
    a: t.alpha ?? 1
    /* Color() will omit alpha if 1 */
  };
  return delete n.alpha, n;
}
function Mt(t) {
  const n = { ...t, alpha: t.a ?? 1 };
  return delete n.a, n;
}
function I(t, n = !1) {
  if (!R(t, n))
    return null;
  t = t.replace("#", "");
  let e, r, s, o;
  if (t.length === 3 || t.length === 4) {
    const [i, c, h, y] = t.split("");
    e = parseInt(`${i}${i}`, 16), r = parseInt(`${c}${c}`, 16), s = parseInt(`${h}${h}`, 16), o = parseInt(`${y}${y}`, 16) / 255;
  } else
    e = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16), o = parseInt(t.slice(6, 8), 16) / 255;
  return isNaN(o) ? { r: e, g: r, b: s } : { r: e, g: r, b: s, a: o };
}
const $ = (t) => t, f = $({
  HEX: "hex",
  HEXA: "hexa",
  RGB_CSS: "rgb-css",
  RGBA_CSS: "rgba-css",
  HSL_CSS: "hsl-css",
  HSLA_CSS: "hsla-css"
}), d = $({
  RGB: "rgb",
  RGBA: "rgba",
  HSL: "hsl",
  HSLA: "hsla",
  HSV: "hsv",
  HSVA: "hsva"
});
function xt(t) {
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
    if (M(t, "r", "g", "b"))
      return M(t, "a") ? d.RGBA : d.RGB;
    if (M(t, "h", "s", "l"))
      return M(t, "a") ? d.HSLA : d.HSL;
    if (M(t, "h", "s", "v"))
      return M(t, "a") ? d.HSVA : d.HSV;
  }
  return null;
}
function M(t, ...n) {
  return n.every((e) => e && t && `${e}` in t);
}
function _t(t, n) {
  return t?.rgb().array().toString() === n?.rgb().array().toString();
}
function At(t) {
  return t === f.HEXA || t === f.RGBA_CSS || t === f.HSLA_CSS || t === d.RGBA || t === d.HSLA || t === d.HSVA;
}
function Ft(t) {
  return t === f.HEX ? f.HEXA : t === f.RGB_CSS ? f.RGBA_CSS : t === f.HSL_CSS ? f.HSLA_CSS : t === d.RGB ? d.RGBA : t === d.HSL ? d.HSLA : t === d.HSV ? d.HSVA : t;
}
function Ct(t) {
  return t === f.HEXA ? f.HEX : t === f.RGBA_CSS ? f.RGB_CSS : t === f.HSLA_CSS ? f.HSL_CSS : t === d.RGBA ? d.RGB : t === d.HSLA ? d.HSL : t === d.HSVA ? d.HSV : t;
}
const ct = 1, B = ct * 2;
function Ht(t, n, e) {
  const r = e ? et.l.preview.size : n.preview.size, s = t - B, o = n.gap * 3;
  return Math.max(s - o - r, 0);
}
function Nt(t) {
  const e = t - B;
  return {
    width: Math.max(e, 0),
    height: Math.max(Math.floor(e / 1.8), 0)
  };
}
export {
  f as C,
  ut as D,
  nt as H,
  pt as O,
  dt as R,
  et as S,
  Nt as a,
  g as b,
  ft as c,
  At as d,
  Mt as e,
  _t as f,
  Ht as g,
  St as h,
  ht as i,
  Ct as j,
  bt as k,
  kt as l,
  yt as m,
  vt as n,
  wt as o,
  xt as p,
  gt as q,
  R as r,
  it as s,
  Ft as t,
  H as u,
  N as v,
  mt as w,
  I as x
};
