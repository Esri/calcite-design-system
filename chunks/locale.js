import { n as b } from "./key.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const C = new RegExp("\\.(0+)?$"), A = new RegExp("0+$");
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
    const [s, n] = j(t).split(".").concat("");
    this.value = BigInt(s + n.padEnd(i.DECIMALS, "0").slice(0, i.DECIMALS)) + BigInt(i.ROUNDED && n[i.DECIMALS] >= "5"), this.isNegative = t.charAt(0) === "-";
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
    const t = this.value.toString().replace("-", "").padStart(i.DECIMALS + 1, "0"), s = t.slice(0, -i.DECIMALS), n = t.slice(-i.DECIMALS).replace(A, "");
    return { integers: s, decimals: n };
  }
  toString() {
    const { integers: t, decimals: s } = this.getIntegersAndDecimals();
    return `${this.isNegative ? "-" : ""}${t}${s.length ? "." + s : ""}`;
  }
  formatToParts(t) {
    const { integers: s, decimals: n } = this.getIntegersAndDecimals(), r = t.numberFormatter.formatToParts(BigInt(s));
    return this.isNegative && r.unshift({ type: "minusSign", value: t.minusSign }), n.length && (r.push({ type: "decimal", value: t.decimal }), n.split("").forEach((a) => r.push({ type: "fraction", value: a }))), r;
  }
  format(t) {
    const { integers: s, decimals: n } = this.getIntegersAndDecimals(), r = `${this.isNegative ? t.minusSign : ""}${t.numberFormatter.format(
      BigInt(s)
    )}`, a = n.length ? `${t.decimal}${n.split("").map((p) => t.numberFormatter.format(Number(p))).join("")}` : "";
    return `${r}${a}`;
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
function $(e) {
  return !(!e || isNaN(Number(e)));
}
function K(e) {
  return !e || !R(e) ? "" : l(e, (t) => {
    let s = !1;
    const n = t.split("").filter((r, a) => r.match(/\./g) && !s ? (s = !0, !0) : r.match(/-/g) && a === 0 ? !0 : b.includes(r)).join("");
    return $(n) ? new i(n).toString() : "";
  });
}
const v = /^([-0])0+(?=\d)/, D = /(?!^\.)\.$/, L = /(?!^-)-/g, T = /^-\b0\b\.?0*$/, x = /0*$/, _ = /* @__PURE__ */ new Set(["e", "E", "-", ",", ".", ...b]), J = (e) => {
  const t = Array.from(e).filter((s) => _.has(s)).join("");
  return l(t, (s) => {
    const n = s.replace(L, "").replace(D, "").replace(v, "$1");
    return $(n) ? T.test(n) ? n : M(n) : s;
  });
};
function M(e) {
  const t = e.split(".")[1], s = new i(e).toString(), [n, r] = s.split(".");
  return t && r !== t ? `${n}.${t}` : s;
}
function l(e, t) {
  if (!e)
    return e;
  const s = e.toLowerCase().indexOf("e") + 1;
  return s ? e.replace(/[eE]*$/g, "").substring(0, s).concat(e.slice(s).replace(/[eE]/g, "")).split(/[eE]/).map((n, r) => t(r === 1 ? n.replace(/\./g, "") : n)).join("e").replace(/^e/, "1e") : t(e);
}
function j(e) {
  const t = e.split(/[eE]/);
  if (t.length === 1)
    return e;
  const s = +e;
  if (Number.isSafeInteger(s))
    return `${s}`;
  const n = e.charAt(0) === "-", r = +t[1], a = t[0].split("."), p = (n ? a[0].substring(1) : a[0]) || "", S = a[1] || "", O = (m, o) => {
    const c = Math.abs(o) - m.length, g = c > 0 ? `${"0".repeat(c)}${m}` : m;
    return `${g.slice(0, o)}.${g.slice(o)}`;
  }, E = (m, o) => {
    const c = o > m.length ? `${m}${"0".repeat(o - m.length)}` : m;
    return `${c.slice(0, o)}.${c.slice(o)}`;
  }, F = r > 0 ? `${p}${E(S, r)}` : `${O(p, r)}${S}`;
  return `${n ? "-" : ""}${F.charAt(0) === "." ? "0" : ""}${F.replace(C, "").replace(v, "")}`;
}
function R(e) {
  return b.some((t) => e.includes(t));
}
function X(e, t, s) {
  const n = t.split(".")[1];
  if (n) {
    const r = n.match(x)[0];
    if (r && s.delocalize(e).length !== t.length && n.indexOf("e") === -1) {
      const a = s.decimal;
      return e = e.includes(a) ? e : `${e}${a}`, e.padEnd(e.length + r.length, s.localize("0"));
    }
  }
  return e;
}
const h = "en", H = [
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
  h,
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
), k = ["arab", "arabext", "latn"], d = [...H], w = (e) => k.includes(e), f = new Intl.NumberFormat().resolvedOptions().numberingSystem, N = f === "arab" || !w(f) ? "latn" : f, P = (e) => w(e) ? e : N;
function y(e) {
  return e ? d.includes(e) ? e : (e = e.toLowerCase(), e.includes("-") && (e = e.replace(/(\w+)-(\w+)/, (t, s, n) => `${s}-${n.toUpperCase()}`), d.includes(e) || (e = e.split("-")[0])), e === "nb" || e === "nn" ? "no" : e === "zh" ? "zh-CN" : d.includes(e) ? e : (console.warn(
    `Translations for the "${e}" locale are not available and will fall back to the default, English (en).`
  ), h)) : h;
}
function q(e) {
  switch (e) {
    case "it-CH":
      return "de-CH";
    case "bs":
      return "sr-Latn-CS";
    default:
      return e;
  }
}
class Z {
  constructor() {
    this.delocalize = (t) => (
      // For performance, (de)localization is skipped if the formatter isn't initialized.
      // In order to localize/delocalize, e.g. when lang/numberingSystem props are not default values,
      // `numberFormatOptions` must be set in a component to create and cache the formatter.
      this._numberFormatOptions ? l(
        t,
        (s) => s.replace(new RegExp(`[${this._minusSign}]`, "g"), "-").replace(new RegExp(`[${this._group}]`, "g"), "").replace(new RegExp(`[${this._decimal}]`, "g"), ".").replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex)
      ) : t
    ), this.localize = (t) => this._numberFormatOptions ? l(
      t,
      (s) => $(s.trim()) ? new i(s.trim()).format(this).replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group) : s
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
    if (t.locale = y(t?.locale), t.numberingSystem = P(t?.numberingSystem), // No need to create the formatter if `locale` and `numberingSystem`
    // are the default values and `numberFormatOptions` has not been set
    !this._numberFormatOptions && t.locale === h && t.numberingSystem === N && // don't skip initialization if any options besides locale/numberingSystem are set
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
    const s = new Map(this._digits.map((r, a) => [r, a])), n = new Intl.NumberFormat(this._numberFormatOptions.locale, {
      numberingSystem: this._numberFormatOptions.numberingSystem
    }).formatToParts(-123456789e-1);
    this._actualGroup = n.find((r) => r.type === "group").value, this._group = this._actualGroup.trim().length === 0 || this._actualGroup == " " ? " " : this._actualGroup, this._decimal = t.locale === "bs" || t.locale === "mk" ? "," : n.find((r) => r.type === "decimal").value, this._minusSign = n.find((r) => r.type === "minusSign").value, this._getDigitIndex = (r) => s.get(r);
  }
}
const Q = new Z();
let u, I;
function z(e = {}) {
  return Object.entries(e).sort(([t], [s]) => t.localeCompare(s)).map((t) => `${t[0]}-${t[1]}`).flat().join(":");
}
function Y(e, t) {
  e = y(e), u || (u = /* @__PURE__ */ new Map()), I !== e && (u.clear(), I = e);
  const s = z(t), n = u.get(s);
  if (n)
    return n;
  const r = new Intl.DateTimeFormat(e, t);
  return u.set(s, r), r;
}
export {
  i as B,
  Z as N,
  P as a,
  Y as b,
  H as c,
  h as d,
  k as e,
  N as f,
  y as g,
  X as h,
  $ as i,
  q as j,
  W as l,
  Q as n,
  K as p,
  J as s
};
