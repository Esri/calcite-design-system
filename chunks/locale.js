import { n as v } from "./key.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
const D = new RegExp("\\.(0+)?$"), A = new RegExp("0+$");
class i {
  static {
    this.DECIMALS = 100;
  }
  static {
    this.ROUNDED = !0;
  }
  static {
    this.SHIFT = BigInt("1" + "0".repeat(this.DECIMALS));
  }
  // derived constant
  constructor(t) {
    if (t instanceof i)
      return t;
    const [s, r] = M(t).split(".").concat("");
    this.value = BigInt(s + r.padEnd(i.DECIMALS, "0").slice(0, i.DECIMALS)) + BigInt(i.ROUNDED && r[i.DECIMALS] >= "5"), this.isNegative = t.charAt(0) === "-";
  }
  static {
    this._divRound = (t, s) => i.fromBigInt(
      t / s + (i.ROUNDED ? t * BigInt(2) / s % BigInt(2) : BigInt(0))
    );
  }
  static {
    this.fromBigInt = (t) => Object.assign(Object.create(i.prototype), { value: t, isNegative: t < BigInt(0) });
  }
  getIntegersAndDecimals() {
    const t = this.value.toString().replace("-", "").padStart(i.DECIMALS + 1, "0"), s = t.slice(0, -i.DECIMALS), r = t.slice(-i.DECIMALS).replace(A, "");
    return { integers: s, decimals: r };
  }
  toString() {
    const { integers: t, decimals: s } = this.getIntegersAndDecimals();
    return `${this.isNegative ? "-" : ""}${t}${s.length ? "." + s : ""}`;
  }
  formatToParts(t) {
    const { integers: s, decimals: r } = this.getIntegersAndDecimals(), n = t.numberFormatter.formatToParts(BigInt(s));
    return this.isNegative && n.unshift({ type: "minusSign", value: t.minusSign }), r.length && (n.push({ type: "decimal", value: t.decimal }), r.split("").forEach((a) => n.push({ type: "fraction", value: a }))), n;
  }
  format(t) {
    const { integers: s, decimals: r } = this.getIntegersAndDecimals(), n = `${this.isNegative ? t.minusSign : ""}${t.numberFormatter.format(
      BigInt(s)
    )}`, a = r.length ? `${t.decimal}${r.split("").map((l) => t.numberFormatter.format(Number(l))).join("")}` : "";
    return `${n}${a}`;
  }
  add(t) {
    return i.fromBigInt(this.value + new i(t).value);
  }
  subtract(t) {
    return i.fromBigInt(this.value - new i(t).value);
  }
  multiply(t) {
    return i._divRound(this.value * new i(t).value, i.SHIFT);
  }
  divide(t) {
    return i._divRound(this.value * i.SHIFT, new i(t).value);
  }
}
function f(e) {
  return !(!e || isNaN(Number(e)));
}
function U(e) {
  return !e || !j(e) ? "" : h(e, (t) => {
    let s = !1;
    const r = t.split("").filter((n, a) => n.match(/\./g) && !s ? (s = !0, !0) : n.match(/-/g) && a === 0 ? !0 : v.includes(n)).join("");
    return f(r) ? new i(r).toString() : "";
  });
}
const F = /^([-0])0+(?=\d)/, T = /(?!^\.)\.$/, L = /(?!^-)-/g, x = /^-\b0\b\.?0*$/, _ = /0*$/, K = (e) => h(e, (t) => {
  const s = t.replace(L, "").replace(T, "").replace(F, "$1");
  return f(s) ? x.test(s) ? s : R(s) : t;
});
function R(e) {
  const t = e.split(".")[1], s = new i(e).toString(), [r, n] = s.split(".");
  return t && n !== t ? `${r}.${t}` : s;
}
function h(e, t) {
  if (!e)
    return e;
  const s = e.toLowerCase().indexOf("e") + 1;
  return s ? e.replace(/[eE]*$/g, "").substring(0, s).concat(e.slice(s).replace(/[eE]/g, "")).split(/[eE]/).map((r, n) => t(n === 1 ? r.replace(/\./g, "") : r)).join("e").replace(/^e/, "1e") : t(e);
}
function M(e) {
  const t = e.split(/[eE]/);
  if (t.length === 1)
    return e;
  const s = +e;
  if (Number.isSafeInteger(s))
    return `${s}`;
  const r = e.charAt(0) === "-", n = +t[1], a = t[0].split("."), l = (r ? a[0].substring(1) : a[0]) || "", b = a[1] || "", E = (m, o) => {
    const c = Math.abs(o) - m.length, d = c > 0 ? `${"0".repeat(c)}${m}` : m;
    return `${d.slice(0, o)}.${d.slice(o)}`;
  }, C = (m, o) => {
    const c = o > m.length ? `${m}${"0".repeat(o - m.length)}` : m;
    return `${c.slice(0, o)}.${c.slice(o)}`;
  }, $ = n > 0 ? `${l}${C(b, n)}` : `${E(l, n)}${b}`;
  return `${r ? "-" : ""}${$.charAt(0) === "." ? "0" : ""}${$.replace(D, "").replace(F, "")}`;
}
function j(e) {
  return v.some((t) => e.includes(t));
}
function J(e, t, s) {
  const r = t.split(".")[1];
  if (r) {
    const n = r.match(_)[0];
    if (n && s.delocalize(e).length !== t.length && r.indexOf("e") === -1) {
      const a = s.decimal;
      return e = e.includes(a) ? e : `${e}${a}`, e.padEnd(e.length + n.length, s.localize("0"));
    }
  }
  return e;
}
const p = "en", I = [
  "ar",
  "bg",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  p,
  "es",
  "et",
  "fi",
  "fr",
  "he",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lt",
  "lv",
  "no",
  "nl",
  "pl",
  "pt-BR",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW"
], N = [
  "ar",
  "bg",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "de-AT",
  "de-CH",
  "el",
  p,
  "en-AU",
  "en-CA",
  "en-GB",
  "es",
  "es-MX",
  "et",
  "fi",
  "fr",
  "fr-CH",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "it-CH",
  "ja",
  "ko",
  "lt",
  "lv",
  "mk",
  "no",
  "nl",
  "pl",
  "pt",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW"
], W = new Map(
  Object.entries({
    bg: { am: "пр.об.", pm: "сл.об." },
    bs: { am: "prijepodne", pm: "popodne" },
    ca: { am: "a. m.", pm: "p. m." },
    cs: { am: "dop.", pm: "odp." },
    es: { am: "a. m.", pm: "p. m." },
    "es-mx": { am: "a.m.", pm: "p.m." },
    "es-MX": { am: "a.m.", pm: "p.m." },
    fi: { am: "ap.", pm: "ip." },
    he: { am: "לפנה״צ", pm: "אחה״צ" },
    hu: { am: "de. ", pm: "du." },
    lt: { am: "priešpiet", pm: "popiet" },
    lv: { am: "priekšpusdienā", pm: "pēcpusdienā" },
    mk: { am: "претпл.", pm: "попл." },
    no: { am: "a.m.", pm: "p.m." },
    nl: { am: "a.m.", pm: "p.m." },
    "pt-pt": { am: "da manhã", pm: "da tarde" },
    "pt-PT": { am: "da manhã", pm: "da tarde" },
    ro: { am: "a.m.", pm: "p.m." },
    sl: { am: "dop.", pm: "pop." },
    sv: { am: "fm", pm: "em" },
    th: { am: "ก่อนเที่ยง", pm: "หลังเที่ยง" },
    tr: { am: "ÖÖ", pm: "ÖS" },
    uk: { am: "дп", pm: "пп" },
    vi: { am: "SA", pm: "CH" }
  })
), k = ["arab", "arabext", "latn"];
[.../* @__PURE__ */ new Set([...I, ...N])];
const w = (e) => k.includes(e), g = new Intl.NumberFormat().resolvedOptions().numberingSystem, y = g === "arab" || !w(g) ? "latn" : g, H = (e) => w(e) ? e : y;
function O(e, t = "cldr") {
  const s = t === "cldr" ? N : I;
  return e ? s.includes(e) ? e : (e = e.toLowerCase(), e === "nb" ? "no" : t === "t9n" && e === "pt" ? "pt-BR" : (e.includes("-") && (e = e.replace(/(\w+)-(\w+)/, (r, n, a) => `${n}-${a.toUpperCase()}`), s.includes(e) || (e = e.split("-")[0])), e === "zh" ? "zh-CN" : s.includes(e) ? e : (console.warn(
    `Translations for the "${e}" locale are not available and will fall back to the default, English (en).`
  ), p))) : p;
}
function X(e) {
  switch (e) {
    case "it-CH":
      return "de-CH";
    case "bs":
      return "bs-Cyrl";
    default:
      return e;
  }
}
class z {
  constructor() {
    this.delocalize = (t) => (
      // For performance, (de)localization is skipped if the formatter isn't initialized.
      // In order to localize/delocalize, e.g. when lang/numberingSystem props are not default values,
      // `numberFormatOptions` must be set in a component to create and cache the formatter.
      this._numberFormatOptions ? h(
        t,
        (s) => s.replace(new RegExp(`[${this._minusSign}]`, "g"), "-").replace(new RegExp(`[${this._group}]`, "g"), "").replace(new RegExp(`[${this._decimal}]`, "g"), ".").replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex)
      ) : t
    ), this.localize = (t) => this._numberFormatOptions ? h(
      t,
      (s) => f(s.trim()) ? new i(s.trim()).format(this).replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group) : s
    ) : t;
  }
  get group() {
    return this._group;
  }
  get decimal() {
    return this._decimal;
  }
  get minusSign() {
    return this._minusSign;
  }
  get digits() {
    return this._digits;
  }
  get numberFormatter() {
    return this._numberFormatter;
  }
  get numberFormatOptions() {
    return this._numberFormatOptions;
  }
  /** numberFormatOptions needs to be set before localize/delocalize is called to ensure the options are up to date */
  set numberFormatOptions(t) {
    if (t.locale = O(t?.locale), t.numberingSystem = H(t?.numberingSystem), // No need to create the formatter if `locale` and `numberingSystem`
    // are the default values and `numberFormatOptions` has not been set
    !this._numberFormatOptions && t.locale === p && t.numberingSystem === y && // don't skip initialization if any options besides locale/numberingSystem are set
    Object.keys(t).length === 2 || // cache formatter by only recreating when options change
    JSON.stringify(this._numberFormatOptions) === JSON.stringify(t))
      return;
    this._numberFormatOptions = t, this._numberFormatter = new Intl.NumberFormat(
      this._numberFormatOptions.locale,
      this._numberFormatOptions
    ), this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: !1,
        numberingSystem: this._numberFormatOptions.numberingSystem
      }).format(9876543210)
    ].reverse();
    const s = new Map(this._digits.map((n, a) => [n, a])), r = new Intl.NumberFormat(this._numberFormatOptions.locale, {
      numberingSystem: this._numberFormatOptions.numberingSystem
    }).formatToParts(-123456789e-1);
    this._actualGroup = r.find((n) => n.type === "group").value, this._group = this._actualGroup.trim().length === 0 || this._actualGroup == " " ? " " : this._actualGroup, this._decimal = t.locale === "bs" || t.locale === "mk" ? "," : r.find((n) => n.type === "decimal").value, this._minusSign = r.find((n) => n.type === "minusSign").value, this._getDigitIndex = (n) => s.get(n);
  }
}
const q = new z();
let u, S;
function P(e = {}) {
  return Object.entries(e).sort(([t], [s]) => t.localeCompare(s)).map((t) => `${t[0]}-${t[1]}`).flat().join(":");
}
function Q(e, t) {
  e = O(e), u || (u = /* @__PURE__ */ new Map()), S !== e && (u.clear(), S = e);
  const s = P(t), r = u.get(s);
  if (r)
    return r;
  const n = new Intl.DateTimeFormat(e, t);
  return u.set(s, n), n;
}
export {
  i as B,
  z as N,
  H as a,
  Q as b,
  N as c,
  p as d,
  k as e,
  y as f,
  O as g,
  J as h,
  f as i,
  X as j,
  W as l,
  q as n,
  U as p,
  K as s
};
