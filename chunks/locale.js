/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { d as S } from "./dom2.js";
import { n as f } from "./key.js";
const x = new RegExp("\\.(0+)?$"), A = new RegExp("0+$");
class a {
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
    if (t instanceof a)
      return t;
    const [e, r] = j(t).split(".").concat("");
    this.value = BigInt(e + r.padEnd(a.DECIMALS, "0").slice(0, a.DECIMALS)) + BigInt(a.ROUNDED && r[a.DECIMALS] >= "5"), this.isNegative = t.charAt(0) === "-";
  }
  static {
    this._divRound = (t, e) => a.fromBigInt(
      t / e + (a.ROUNDED ? t * BigInt(2) / e % BigInt(2) : BigInt(0))
    );
  }
  static {
    this.fromBigInt = (t) => Object.assign(Object.create(a.prototype), { value: t, isNegative: t < BigInt(0) });
  }
  getIntegersAndDecimals() {
    const t = this.value.toString().replace("-", "").padStart(a.DECIMALS + 1, "0"), e = t.slice(0, -a.DECIMALS), r = t.slice(-a.DECIMALS).replace(A, "");
    return { integers: e, decimals: r };
  }
  toString() {
    const { integers: t, decimals: e } = this.getIntegersAndDecimals();
    return `${this.isNegative ? "-" : ""}${t}${e.length ? "." + e : ""}`;
  }
  /**
   * Formats the number into localized parts.
   *
   * @param formatter - number formatter instance to localize the number value.
   * @param includeDirectionalMarks - when true, preserves `Intl.NumberFormat` directional marks for read-only display.
   */
  formatToParts(t, e = !1) {
    const { integers: r, decimals: n } = this.getIntegersAndDecimals(), i = I(t, r, this.isNegative, e);
    return n.length && (i.push({ type: "decimal", value: t.decimal }), n.split("").forEach((c) => i.push({ type: "fraction", value: c }))), i;
  }
  /**
   * Formats the number as a localized string.
   *
   * @param formatter - number formatter instance to localize the number value.
   * @param includeDirectionalMarks - when true, preserves `Intl.NumberFormat` directional marks for read-only display.
   */
  format(t, e = !1) {
    const { integers: r, decimals: n } = this.getIntegersAndDecimals(), i = I(t, r, this.isNegative, e).map((l) => l.value).join(""), c = n.length ? `${t.decimal}${n.split("").map((l) => t.numberFormatter.format(Number(l))).join("")}` : "";
    return `${i}${c}`;
  }
  add(t) {
    return a.fromBigInt(this.value + new a(t).value);
  }
  subtract(t) {
    return a.fromBigInt(this.value - new a(t).value);
  }
  multiply(t) {
    return a._divRound(this.value * new a(t).value, a.SHIFT);
  }
  divide(t) {
    return a._divRound(this.value * a.SHIFT, new a(t).value);
  }
}
function I(s, t, e, r) {
  const n = s.numberFormatter.formatToParts(
    r && e && t === "0" ? -0 : BigInt(`${r && e ? "-" : ""}${t}`)
  );
  return e && !r && n.unshift({ type: "minusSign", value: s.minusSign }), n;
}
function b(s) {
  return !(!s || isNaN(Number(s)));
}
function J(s) {
  return !s || !M(s) ? "" : h(s, (t) => {
    let e = !1;
    const r = t.split("").filter((n, i) => n.match(/\./g) && !e ? (e = !0, !0) : n.match(/-/g) && i === 0 ? !0 : f.includes(n)).join("");
    return b(r) ? new a(r).toString() : "";
  });
}
const O = /^([-0])0+(?=\d)/, D = /(?!^\.)\.$/, _ = /(?!^-)-/g, C = /^-\b0\b\.?0*$/, L = /0*$/, R = /* @__PURE__ */ new Set(["e", "E", "-", ",", ".", ...f]), K = (s) => {
  const t = Array.from(s).filter((e) => R.has(e)).join("");
  return h(t, (e) => {
    const r = e.replace(_, "").replace(D, "").replace(O, "$1");
    return b(r) ? C.test(r) ? r : T(r) : e;
  });
};
function T(s) {
  const t = s.split(".")[1], e = new a(s).toString(), [r, n] = e.split(".");
  return t && n !== t ? `${r}.${t}` : e;
}
function h(s, t) {
  if (!s)
    return s;
  const e = s.toLowerCase().indexOf("e") + 1;
  return e ? s.replace(/[eE]*$/g, "").substring(0, e).concat(s.slice(e).replace(/[eE]/g, "")).split(/[eE]/).map((r, n) => t(n === 1 ? r.replace(/\./g, "") : r)).join("e").replace(/^e/, "1e") : t(s);
}
function j(s) {
  const t = s.split(/[eE]/);
  if (t.length === 1)
    return s;
  const e = +s;
  if (Number.isSafeInteger(e))
    return `${e}`;
  const r = s.charAt(0) === "-", n = +t[1], i = t[0].split("."), c = (r ? i[0].substring(1) : i[0]) || "", l = i[1] || "", N = (m, o) => {
    const u = Math.abs(o) - m.length, g = u > 0 ? `${"0".repeat(u)}${m}` : m;
    return `${g.slice(0, o)}.${g.slice(o)}`;
  }, v = (m, o) => {
    const u = o > m.length ? `${m}${"0".repeat(o - m.length)}` : m;
    return `${u.slice(0, o)}.${u.slice(o)}`;
  }, $ = n > 0 ? `${c}${v(l, n)}` : `${N(c, n)}${l}`;
  return `${r ? "-" : ""}${$.charAt(0) === "." ? "0" : ""}${$.replace(x, "").replace(O, "")}`;
}
function M(s) {
  return f.some((t) => s.includes(t));
}
function X(s, t, e) {
  const r = t.split(".")[1];
  if (r) {
    const n = r.match(L)?.[0];
    if (n && e.delocalize(s).length !== t.length && r.indexOf("e") === -1) {
      const i = e.decimal;
      return s = s.includes(i) ? s : `${s}${i}`, s.padEnd(s.length + n.length, e.localize("0"));
    }
  }
  return s;
}
const q = new Map(
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
), F = ["arab", "arabext", "latn"], w = (s) => !!(F && F.includes(s)), d = new Intl.NumberFormat().resolvedOptions().numberingSystem, P = /[\u061C\u200E\u200F]/g, E = d === "arab" || !w(d) ? "latn" : d, H = (s) => w(s) ? s : E;
function Q(s) {
  switch (s) {
    case "it-CH":
      return "de-CH";
    case "bs":
      return "sr-Latn-CS";
    default:
      return s;
  }
}
class Z {
  constructor() {
    this.delocalize = (t) => this._numberFormatOptions ? h(
      t,
      (e) => this.#t(this.#e(e))
    ) : t, this.localize = (t, e = !1) => this._numberFormatOptions ? h(
      t,
      (r) => b(r.trim()) ? new a(r.trim()).format(this, e).replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group) : r
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
    if (t.numberingSystem = H(t?.numberingSystem), t.locale = t?.locale || S, // No need to create the formatter if `locale` and `numberingSystem`
    // are the default values and `numberFormatOptions` has not been set
    !this._numberFormatOptions && t.locale === S && t.numberingSystem === E && // don't skip initialization if any options besides locale/numberingSystem are set
    Object.keys(t).length === 2 || // cache formatter by only recreating when options change
    JSON.stringify(this._numberFormatOptions) === JSON.stringify(t))
      return;
    this._numberFormatOptions = t, this._numberFormatter = new Intl.NumberFormat(this._numberFormatOptions.locale, this._numberFormatOptions), this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: !1,
        numberingSystem: this._numberFormatOptions.numberingSystem
      }).format(9876543210)
    ].reverse();
    const e = new Map(this._digits.map((n, i) => [n, i])), r = new Intl.NumberFormat(this._numberFormatOptions.locale, {
      numberingSystem: this._numberFormatOptions.numberingSystem
    }).formatToParts(-123456789e-1);
    this._actualGroup = r.find((n) => n.type === "group").value, this._group = this._actualGroup.trim().length === 0 || this._actualGroup == " " ? " " : this._actualGroup, this._decimal = t.locale === "bs" || t.locale === "mk" ? "," : r.find((n) => n.type === "decimal").value, this._minusSign = r.find((n) => n.type === "minusSign").value, this._getDigitIndex = (n) => `${e.get(n) ?? ""}`;
  }
  #t(t) {
    return t.replace(P, "").replace(new RegExp(`[${this._minusSign}]`, "g"), "-").replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex);
  }
  #e(t) {
    if (this._group !== this._decimal)
      return t.replace(new RegExp(`[${this._group}]`, "g"), "").replace(new RegExp(`[${this._decimal}]`, "g"), ".");
    const e = t.lastIndexOf(this._decimal);
    if (e === -1)
      return t;
    const r = t.slice(0, e).replace(new RegExp(`[${this._group}]`, "g"), ""), n = t.slice(e + 1);
    return `${r}.${n}`;
  }
}
const W = new Z();
let p, y;
function G(s = {}) {
  return Object.entries(s).sort(([t], [e]) => t.localeCompare(e)).map((t) => `${t[0]}-${t[1]}`).flat().join(":");
}
function Y(s, t) {
  p || (p = /* @__PURE__ */ new Map()), y !== s && (p.clear(), y = s);
  const e = G(t), r = p.get(e);
  if (r)
    return r;
  const n = new Intl.DateTimeFormat(s, t);
  return p.set(e, n), n;
}
export {
  a as B,
  Z as N,
  H as a,
  X as b,
  Q as c,
  E as d,
  Y as g,
  b as i,
  q as l,
  W as n,
  J as p,
  K as s
};
