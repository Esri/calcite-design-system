/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { d as S } from "./dom2.js";
import { n as d } from "./key.js";
const v = new RegExp("\\.(0+)?$"), D = new RegExp("0+$");
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
    const [e, r] = T(t).split(".").concat("");
    this.value = BigInt(e + r.padEnd(i.DECIMALS, "0").slice(0, i.DECIMALS)) + BigInt(i.ROUNDED && r[i.DECIMALS] >= "5"), this.isNegative = t.charAt(0) === "-";
  }
  static {
    this._divRound = (t, e) => i.fromBigInt(
      t / e + (i.ROUNDED ? t * BigInt(2) / e % BigInt(2) : BigInt(0))
    );
  }
  static {
    this.fromBigInt = (t) => Object.assign(Object.create(i.prototype), { value: t, isNegative: t < BigInt(0) });
  }
  getIntegersAndDecimals() {
    const t = this.value.toString().replace("-", "").padStart(i.DECIMALS + 1, "0"), e = t.slice(0, -i.DECIMALS), r = t.slice(-i.DECIMALS).replace(D, "");
    return { integers: e, decimals: r };
  }
  toString() {
    const { integers: t, decimals: e } = this.getIntegersAndDecimals();
    return `${this.isNegative ? "-" : ""}${t}${e.length ? "." + e : ""}`;
  }
  formatToParts(t) {
    const { integers: e, decimals: r } = this.getIntegersAndDecimals(), n = t.numberFormatter.formatToParts(BigInt(e));
    return this.isNegative && n.unshift({ type: "minusSign", value: t.minusSign }), r.length && (n.push({ type: "decimal", value: t.decimal }), r.split("").forEach((a) => n.push({ type: "fraction", value: a }))), n;
  }
  format(t) {
    const { integers: e, decimals: r } = this.getIntegersAndDecimals(), n = `${this.isNegative ? t.minusSign : ""}${t.numberFormatter.format(
      BigInt(e)
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
function f(s) {
  return !(!s || isNaN(Number(s)));
}
function z(s) {
  return !s || !M(s) ? "" : p(s, (t) => {
    let e = !1;
    const r = t.split("").filter((n, a) => n.match(/\./g) && !e ? (e = !0, !0) : n.match(/-/g) && a === 0 ? !0 : d.includes(n)).join("");
    return f(r) ? new i(r).toString() : "";
  });
}
const y = /^([-0])0+(?=\d)/, x = /(?!^\.)\.$/, A = /(?!^-)-/g, _ = /^-\b0\b\.?0*$/, C = /0*$/, L = /* @__PURE__ */ new Set(["e", "E", "-", ",", ".", ...d]), U = (s) => {
  const t = Array.from(s).filter((e) => L.has(e)).join("");
  return p(t, (e) => {
    const r = e.replace(A, "").replace(x, "").replace(y, "$1");
    return f(r) ? _.test(r) ? r : R(r) : e;
  });
};
function R(s) {
  const t = s.split(".")[1], e = new i(s).toString(), [r, n] = e.split(".");
  return t && n !== t ? `${r}.${t}` : e;
}
function p(s, t) {
  if (!s)
    return s;
  const e = s.toLowerCase().indexOf("e") + 1;
  return e ? s.replace(/[eE]*$/g, "").substring(0, e).concat(s.slice(e).replace(/[eE]/g, "")).split(/[eE]/).map((r, n) => t(n === 1 ? r.replace(/\./g, "") : r)).join("e").replace(/^e/, "1e") : t(s);
}
function T(s) {
  const t = s.split(/[eE]/);
  if (t.length === 1)
    return s;
  const e = +s;
  if (Number.isSafeInteger(e))
    return `${e}`;
  const r = s.charAt(0) === "-", n = +t[1], a = t[0].split("."), l = (r ? a[0].substring(1) : a[0]) || "", b = a[1] || "", w = (m, o) => {
    const c = Math.abs(o) - m.length, g = c > 0 ? `${"0".repeat(c)}${m}` : m;
    return `${g.slice(0, o)}.${g.slice(o)}`;
  }, E = (m, o) => {
    const c = o > m.length ? `${m}${"0".repeat(o - m.length)}` : m;
    return `${c.slice(0, o)}.${c.slice(o)}`;
  }, $ = n > 0 ? `${l}${E(b, n)}` : `${w(l, n)}${b}`;
  return `${r ? "-" : ""}${$.charAt(0) === "." ? "0" : ""}${$.replace(v, "").replace(y, "")}`;
}
function M(s) {
  return d.some((t) => s.includes(t));
}
function J(s, t, e) {
  const r = t.split(".")[1];
  if (r) {
    const n = r.match(C)?.[0];
    if (n && e.delocalize(s).length !== t.length && r.indexOf("e") === -1) {
      const a = e.decimal;
      return s = s.includes(a) ? s : `${s}${a}`, s.padEnd(s.length + n.length, e.localize("0"));
    }
  }
  return s;
}
const K = new Map(
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
), I = ["arab", "arabext", "latn"], N = (s) => !!(I && I.includes(s)), h = new Intl.NumberFormat().resolvedOptions().numberingSystem, O = h === "arab" || !N(h) ? "latn" : h, j = (s) => N(s) ? s : O;
function X(s) {
  switch (s) {
    case "it-CH":
      return "de-CH";
    case "bs":
      return "sr-Latn-CS";
    default:
      return s;
  }
}
class P {
  constructor() {
    this.delocalize = (t) => this._numberFormatOptions ? p(
      t,
      (e) => this.#t(this.#e(e))
    ) : t, this.localize = (t) => this._numberFormatOptions ? p(
      t,
      (e) => f(e.trim()) ? new i(e.trim()).format(this).replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group) : e
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
    if (t.numberingSystem = j(t?.numberingSystem), t.locale = t?.locale || S, // No need to create the formatter if `locale` and `numberingSystem`
    // are the default values and `numberFormatOptions` has not been set
    !this._numberFormatOptions && t.locale === S && t.numberingSystem === O && // don't skip initialization if any options besides locale/numberingSystem are set
    Object.keys(t).length === 2 || // cache formatter by only recreating when options change
    JSON.stringify(this._numberFormatOptions) === JSON.stringify(t))
      return;
    this._numberFormatOptions = t, this._numberFormatter = new Intl.NumberFormat(this._numberFormatOptions.locale, this._numberFormatOptions), this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: !1,
        numberingSystem: this._numberFormatOptions.numberingSystem
      }).format(9876543210)
    ].reverse();
    const e = new Map(this._digits.map((n, a) => [n, a])), r = new Intl.NumberFormat(this._numberFormatOptions.locale, {
      numberingSystem: this._numberFormatOptions.numberingSystem
    }).formatToParts(-123456789e-1);
    this._actualGroup = r.find((n) => n.type === "group").value, this._group = this._actualGroup.trim().length === 0 || this._actualGroup == " " ? " " : this._actualGroup, this._decimal = t.locale === "bs" || t.locale === "mk" ? "," : r.find((n) => n.type === "decimal").value, this._minusSign = r.find((n) => n.type === "minusSign").value, this._getDigitIndex = (n) => `${e.get(n) ?? ""}`;
  }
  #t(t) {
    return t.replace(new RegExp(`[${this._minusSign}]`, "g"), "-").replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex);
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
const q = new P();
let u, F;
function H(s = {}) {
  return Object.entries(s).sort(([t], [e]) => t.localeCompare(e)).map((t) => `${t[0]}-${t[1]}`).flat().join(":");
}
function Q(s, t) {
  u || (u = /* @__PURE__ */ new Map()), F !== s && (u.clear(), F = s);
  const e = H(t), r = u.get(e);
  if (r)
    return r;
  const n = new Intl.DateTimeFormat(s, t);
  return u.set(e, n), n;
}
export {
  i as B,
  P as N,
  j as a,
  J as b,
  X as c,
  O as d,
  Q as g,
  f as i,
  K as l,
  q as n,
  z as p,
  U as s
};
