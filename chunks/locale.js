/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { n as b } from "./key.js";
const C = "ar,bg,bs,ca,cs,da,de,el,en,es,et,fi,fr,he,hr,hu,id,it,ja,ko,lt,lv,nl,nb,no,pl,pt-BR,pt-PT,ro,ru,sk,sl,sr,sv,th,tr,uk,vi,zh-CN,zh-HK,zh-TW".split(
  ","
), L = (
  //#endregion supportedLocales
  /* @__PURE__ */ new Set(C)
), f = "en", A = {
  //#region localeEquivalencies
  // Locale equivalencies aligned with ArcGIS Maps SDK for JavaScript:
  // https://developers.arcgis.com/javascript/latest/localization/#locale-support
  // We resolve to `pt-BR` as it will have the same translations as `pt`, which has no corresponding bundle
  pt: "pt-BR",
  // We support both 'nb' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  nb: "no",
  // We support both 'nn' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  // See https://devtopia.esri.com/WebGIS/webgis-sdk/issues/4667
  nn: "no",
  // We use `zh-CN` as base translation for chinese locales which has no corresponding bundle.
  zh: "zh-CN"
  //#endregion localeEquivalencies
}, x = (s) => {
  const [t, e] = s.split("-"), n = t.toLowerCase();
  let r = n;
  return e && (r = `${n}-${e.toUpperCase()}`), r = A[r] ?? r, L.has(r) ? r : e ? x(n) : f;
}, D = new RegExp("\\.(0+)?$"), _ = new RegExp("0+$");
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
    const [e, n] = H(t).split(".").concat("");
    this.value = BigInt(e + n.padEnd(a.DECIMALS, "0").slice(0, a.DECIMALS)) + BigInt(a.ROUNDED && n[a.DECIMALS] >= "5"), this.isNegative = t.charAt(0) === "-";
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
    const t = this.value.toString().replace("-", "").padStart(a.DECIMALS + 1, "0"), e = t.slice(0, -a.DECIMALS), n = t.slice(-a.DECIMALS).replace(_, "");
    return { integers: e, decimals: n };
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
    const { integers: n, decimals: r } = this.getIntegersAndDecimals(), i = I(t, n, this.isNegative, e);
    return r.length && (i.push({ type: "decimal", value: t.decimal }), r.split("").forEach((c) => i.push({ type: "fraction", value: c }))), i;
  }
  /**
   * Formats the number as a localized string.
   *
   * @param formatter - number formatter instance to localize the number value.
   * @param includeDirectionalMarks - when true, preserves `Intl.NumberFormat` directional marks for read-only display.
   */
  format(t, e = !1) {
    const { integers: n, decimals: r } = this.getIntegersAndDecimals(), i = I(t, n, this.isNegative, e).map((l) => l.value).join(""), c = r.length ? `${t.decimal}${r.split("").map((l) => t.numberFormatter.format(Number(l))).join("")}` : "";
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
function I(s, t, e, n) {
  const r = s.numberFormatter.formatToParts(
    n && e && t === "0" ? -0 : BigInt(`${n && e ? "-" : ""}${t}`)
  );
  return e && !n && r.unshift({ type: "minusSign", value: s.minusSign }), r;
}
function $(s) {
  return !(!s || isNaN(Number(s)));
}
function W(s) {
  return !s || !Z(s) ? "" : h(s, (t) => {
    let e = !1;
    const n = t.split("").filter((r, i) => r.match(/\./g) && !e ? (e = !0, !0) : r.match(/-/g) && i === 0 ? !0 : b.includes(r)).join("");
    return $(n) ? new a(n).toString() : "";
  });
}
const y = /^([-0])0+(?=\d)/, R = /(?!^\.)\.$/, T = /(?!^-)-/g, j = /^-\b0\b\.?0*$/, M = /0*$/, z = /* @__PURE__ */ new Set(["e", "E", "-", ",", ".", ...b]), X = (s) => {
  const t = Array.from(s).filter((e) => z.has(e)).join("");
  return h(t, (e) => {
    const n = e.replace(T, "").replace(R, "").replace(y, "$1");
    return $(n) ? j.test(n) ? n : P(n) : e;
  });
};
function P(s) {
  const t = s.split(".")[1], e = new a(s).toString(), [n, r] = e.split(".");
  return t && r !== t ? `${n}.${t}` : e;
}
function h(s, t) {
  if (!s)
    return s;
  const e = s.toLowerCase().indexOf("e") + 1;
  return e ? s.replace(/[eE]*$/g, "").substring(0, e).concat(s.slice(e).replace(/[eE]/g, "")).split(/[eE]/).map((n, r) => t(r === 1 ? n.replace(/\./g, "") : n)).join("e").replace(/^e/, "1e") : t(s);
}
function H(s) {
  const t = s.split(/[eE]/);
  if (t.length === 1)
    return s;
  const e = +s;
  if (Number.isSafeInteger(e))
    return `${e}`;
  const n = s.charAt(0) === "-", r = +t[1], i = t[0].split("."), c = (n ? i[0].substring(1) : i[0]) || "", l = i[1] || "", v = (o, m) => {
    const u = Math.abs(m) - o.length, g = u > 0 ? `${"0".repeat(u)}${o}` : o;
    return `${g.slice(0, m)}.${g.slice(m)}`;
  }, E = (o, m) => {
    const u = m > o.length ? `${o}${"0".repeat(m - o.length)}` : o;
    return `${u.slice(0, m)}.${u.slice(m)}`;
  }, S = r > 0 ? `${c}${E(l, r)}` : `${v(c, r)}${l}`;
  return `${n ? "-" : ""}${S.charAt(0) === "." ? "0" : ""}${S.replace(D, "").replace(y, "")}`;
}
function Z(s) {
  return b.some((t) => s.includes(t));
}
function Q(s, t, e) {
  const n = t.split(".")[1];
  if (n) {
    const r = n.match(M)?.[0];
    if (r && e.delocalize(s).length !== t.length && n.indexOf("e") === -1) {
      const i = e.decimal;
      return s = s.includes(i) ? s : `${s}${i}`, s.padEnd(s.length + r.length, e.localize("0"));
    }
  }
  return s;
}
const Y = new Map(
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
), F = ["arab", "arabext", "latn"], N = (s) => !!(F && F.includes(s)), d = new Intl.NumberFormat().resolvedOptions().numberingSystem, k = /[\u061C\u200E\u200F]/g, O = d === "arab" || !N(d) ? "latn" : d, G = (s) => N(s) ? s : O;
function V(s) {
  switch (s) {
    case "it-CH":
      return "de-CH";
    case "bs":
      return "sr-Latn-CS";
    default:
      return s;
  }
}
class U {
  constructor() {
    this.delocalize = (t) => this._numberFormatOptions ? h(
      t,
      (e) => this.#t(this.#e(e))
    ) : t, this.localize = (t, e = !1) => this._numberFormatOptions ? h(
      t,
      (n) => $(n.trim()) ? new a(n.trim()).format(this, e).replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group) : n
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
    if (t.numberingSystem = G(t?.numberingSystem), t.locale = t?.locale || f, // No need to create the formatter if `locale` and `numberingSystem`
    // are the default values and `numberFormatOptions` has not been set
    !this._numberFormatOptions && t.locale === f && t.numberingSystem === O && // don't skip initialization if any options besides locale/numberingSystem are set
    Object.keys(t).length === 2 || // cache formatter by only recreating when options change
    JSON.stringify(this._numberFormatOptions) === JSON.stringify(t))
      return;
    this._numberFormatOptions = t, this._numberFormatter = new Intl.NumberFormat(this._numberFormatOptions.locale, this._numberFormatOptions), this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: !1,
        numberingSystem: this._numberFormatOptions.numberingSystem
      }).format(9876543210)
    ].reverse();
    const e = new Map(this._digits.map((r, i) => [r, i])), n = new Intl.NumberFormat(this._numberFormatOptions.locale, {
      numberingSystem: this._numberFormatOptions.numberingSystem
    }).formatToParts(-123456789e-1);
    this._actualGroup = n.find((r) => r.type === "group").value, this._group = this._actualGroup.trim().length === 0 || this._actualGroup == " " ? " " : this._actualGroup, this._decimal = t.locale === "bs" || t.locale === "mk" ? "," : n.find((r) => r.type === "decimal").value, this._minusSign = n.find((r) => r.type === "minusSign").value, this._getDigitIndex = (r) => `${e.get(r) ?? ""}`;
  }
  #t(t) {
    return t.replace(k, "").replace(new RegExp(`[${this._minusSign}]`, "g"), "-").replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex);
  }
  #e(t) {
    if (this._group !== this._decimal)
      return t.replace(new RegExp(`[${this._group}]`, "g"), "").replace(new RegExp(`[${this._decimal}]`, "g"), ".");
    const e = t.lastIndexOf(this._decimal);
    if (e === -1)
      return t;
    const n = t.slice(0, e).replace(new RegExp(`[${this._group}]`, "g"), ""), r = t.slice(e + 1);
    return `${n}.${r}`;
  }
}
const B = new U();
let p, w;
function K(s = {}) {
  return Object.entries(s).sort(([t], [e]) => t.localeCompare(e)).map((t) => `${t[0]}-${t[1]}`).flat().join(":");
}
function tt(s, t) {
  p || (p = /* @__PURE__ */ new Map()), w !== s && (p.clear(), w = s);
  const e = K(t), n = p.get(e);
  if (n)
    return n;
  const r = new Intl.DateTimeFormat(s, t);
  return p.set(e, r), r;
}
export {
  a as B,
  U as N,
  x as a,
  G as b,
  O as c,
  f as d,
  X as e,
  Q as f,
  tt as g,
  V as h,
  $ as i,
  Y as l,
  B as n,
  W as p,
  L as s
};
