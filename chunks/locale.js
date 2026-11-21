/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { d as S } from "./intl.js";
import { n as f } from "./key.js";
const D = new RegExp("\\.(0+)?$"), A = new RegExp("0+$");
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
    const [n, s] = R(t).split(".").concat("");
    this.value = BigInt(n + s.padEnd(a.DECIMALS, "0").slice(0, a.DECIMALS)) + BigInt(a.ROUNDED && s[a.DECIMALS] >= "5"), this.isNegative = t.charAt(0) === "-";
  }
  static {
    this._divRound = (t, n) => a.fromBigInt(
      t / n + (a.ROUNDED ? t * BigInt(2) / n % BigInt(2) : BigInt(0))
    );
  }
  static {
    this.fromBigInt = (t) => Object.assign(Object.create(a.prototype), { value: t, isNegative: t < BigInt(0) });
  }
  getIntegersAndDecimals() {
    const t = this.value.toString().replace("-", "").padStart(a.DECIMALS + 1, "0"), n = t.slice(0, -a.DECIMALS), s = t.slice(-a.DECIMALS).replace(A, "");
    return { integers: n, decimals: s };
  }
  toString() {
    const { integers: t, decimals: n } = this.getIntegersAndDecimals();
    return `${this.isNegative ? "-" : ""}${t}${n.length ? "." + n : ""}`;
  }
  /**
   * Formats the number into localized parts.
   *
   * @param formatter - number formatter instance to localize the number value.
   * @param includeDirectionalMarks - when true, preserves `Intl.NumberFormat` directional marks for read-only display.
   */
  formatToParts(t, n = !1) {
    const { integers: s, decimals: r } = this.getIntegersAndDecimals(), i = F(t, s, this.isNegative, n);
    return r.length && (i.push({ type: "decimal", value: t.decimal }), r.split("").forEach((m) => i.push({ type: "fraction", value: m }))), i;
  }
  /**
   * Formats the number as a localized string.
   *
   * @param formatter - number formatter instance to localize the number value.
   * @param includeDirectionalMarks - when true, preserves `Intl.NumberFormat` directional marks for read-only display.
   */
  format(t, n = !1) {
    const { integers: s, decimals: r } = this.getIntegersAndDecimals(), i = F(t, s, this.isNegative, n).map((o) => o.value).join(""), m = r.length ? `${t.decimal}${r.split("").map((o) => t.numberFormatter.format(Number(o))).join("")}` : "";
    return `${i}${m}`;
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
function F(e, t, n, s) {
  const r = e.numberFormatter.formatToParts(
    s && n && t === "0" ? -0 : BigInt(`${s && n ? "-" : ""}${t}`)
  );
  for (const i of r)
    i.type === "group" && (i.value = e.group);
  return n && !s && r.unshift({ type: "minusSign", value: e.minusSign }), r;
}
function b(e) {
  return !(!e || isNaN(Number(e)));
}
function J(e) {
  return !e || !_(e) ? "" : g(e, (t) => {
    let n = !1;
    const s = t.split("").filter((r, i) => r.match(/\./g) && !n ? (n = !0, !0) : r.match(/-/g) && i === 0 ? !0 : f.includes(r)).join("");
    return b(s) ? new a(s).toString() : "";
  });
}
const v = /^([-0])0+(?=\d)/, C = /(?!^\.)\.$/, x = /(?!^-)-/g, L = /^-\b0\b\.?0*$/, T = /0*$/, j = /* @__PURE__ */ new Set(["e", "E", "-", ",", ".", ...f]), K = (e) => {
  const t = Array.from(e).filter((n) => j.has(n)).join("");
  return g(t, (n) => {
    const s = n.replace(x, "").replace(C, "").replace(v, "$1");
    return b(s) ? L.test(s) ? s : M(s) : n;
  });
};
function M(e) {
  const t = e.split(".")[1], n = new a(e).toString(), [s, r] = n.split(".");
  return t && r !== t ? `${s}.${t}` : n;
}
function g(e, t) {
  if (!e)
    return e;
  const n = e.toLowerCase().indexOf("e") + 1;
  return n ? e.replace(/[eE]*$/g, "").substring(0, n).concat(e.slice(n).replace(/[eE]/g, "")).split(/[eE]/).map((s, r) => t(r === 1 ? s.replace(/\./g, "") : s)).join("e").replace(/^e/, "1e") : t(e);
}
function R(e) {
  const t = e.split(/[eE]/);
  if (t.length === 1)
    return e;
  const n = +e;
  if (Number.isSafeInteger(n))
    return `${n}`;
  const s = e.charAt(0) === "-", r = +t[1], i = t[0].split("."), m = (s ? i[0].substring(1) : i[0]) || "", o = i[1] || "", w = (c, u) => {
    const l = Math.abs(u) - c.length, h = l > 0 ? `${"0".repeat(l)}${c}` : c;
    return `${h.slice(0, u)}.${h.slice(u)}`;
  }, E = (c, u) => {
    const l = u > c.length ? `${c}${"0".repeat(u - c.length)}` : c;
    return `${l.slice(0, u)}.${l.slice(u)}`;
  }, $ = r > 0 ? `${m}${E(o, r)}` : `${w(m, r)}${o}`;
  return `${s ? "-" : ""}${$.charAt(0) === "." ? "0" : ""}${$.replace(D, "").replace(v, "")}`;
}
function _(e) {
  return f.some((t) => e.includes(t));
}
function W(e, t, n) {
  const s = t.split(".")[1];
  if (s) {
    const r = s.match(T)?.[0];
    if (r && n.delocalize(e).length !== t.length && s.indexOf("e") === -1) {
      const i = n.decimal;
      return e = e.includes(i) ? e : `${e}${i}`, e.padEnd(e.length + r.length, n.localize("0"));
    }
  }
  return e;
}
const X = new Map(
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
), I = ["arab", "arabext", "latn"], O = (e) => !!(I && I.includes(e)), d = new Intl.NumberFormat().resolvedOptions().numberingSystem, P = /[\u061C\u200E\u200F]/g, N = d === "arab" || !O(d) ? "latn" : d, H = (e) => O(e) ? e : N;
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
    this.delocalize = (t) => this._numberFormatOptions ? g(
      t,
      (n) => this.#t(this.#e(n))
    ) : t, this.localize = (t, n = !1) => this._numberFormatOptions ? g(
      t,
      (s) => b(s.trim()) ? new a(s.trim()).format(this, n) : s
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
    !this._numberFormatOptions && t.locale === S && t.numberingSystem === N && // don't skip initialization if any options besides locale/numberingSystem are set
    Object.keys(t).length === 2 || // cache formatter by only recreating when options change
    JSON.stringify(this._numberFormatOptions) === JSON.stringify(t))
      return;
    this._numberFormatOptions = t, this._numberFormatter = new Intl.NumberFormat(this._numberFormatOptions.locale, this._numberFormatOptions), this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: !1,
        numberingSystem: this._numberFormatOptions.numberingSystem
      }).format(9876543210)
    ].reverse();
    const n = new Map(this._digits.map((m, o) => [m, o])), s = new Intl.NumberFormat(this._numberFormatOptions.locale, {
      numberingSystem: this._numberFormatOptions.numberingSystem
    }).formatToParts(-123456789e-1), r = s.find((m) => m.type === "group").value, i = t.locale === "bs" || t.locale === "mk";
    this._group = i && t.numberingSystem === "latn" ? "." : r.trim().length === 0 || r === " " ? " " : r, this._decimal = i ? "," : s.find((m) => m.type === "decimal").value, this._minusSign = s.find((m) => m.type === "minusSign").value, this._getDigitIndex = (m) => `${n.get(m) ?? ""}`;
  }
  #t(t) {
    return t.replace(P, "").replace(new RegExp(`[${this._minusSign}]`, "g"), "-").replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex);
  }
  #e(t) {
    return t.replace(new RegExp(`[${this._group}]`, "g"), "").replace(new RegExp(`[${this._decimal}]`, "g"), ".");
  }
}
const Q = new Z();
let p, y;
function k(e = {}) {
  return Object.entries(e).sort(([t], [n]) => t.localeCompare(n)).map((t) => `${t[0]}-${t[1]}`).flat().join(":");
}
function Y(e, t) {
  p || (p = /* @__PURE__ */ new Map()), y !== e && (p.clear(), y = e);
  const n = k(t), s = p.get(n);
  if (s)
    return s;
  const r = new Intl.DateTimeFormat(e, t);
  return p.set(n, r), r;
}
export {
  a as B,
  Z as N,
  H as a,
  W as b,
  q as c,
  N as d,
  Y as g,
  b as i,
  X as l,
  Q as n,
  J as p,
  K as s
};
