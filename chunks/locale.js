/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { n as f } from "./key.js";
const E = "ar,bg,bs,ca,cs,da,de,el,en,es,et,fi,fr,he,hr,hu,id,it,ja,ko,lt,lv,nl,nb,no,pl,pt-BR,pt-PT,ro,ru,sk,sl,sr,sv,th,tr,uk,vi,zh-CN,zh-HK,zh-TW".split(
  ","
), C = (
  //#endregion supportedLocales
  /* @__PURE__ */ new Set(E)
), d = "en", D = {
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
}, A = (s) => {
  const [t, e] = s.split("-"), n = t.toLowerCase();
  let r = n;
  return e && (r = `${n}-${e.toUpperCase()}`), r = D[r] ?? r, C.has(r) ? r : e ? A(n) : d;
}, L = new RegExp("\\.(0+)?$"), x = new RegExp("0+$");
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
    const [e, n] = P(t).split(".").concat("");
    this.value = BigInt(e + n.padEnd(i.DECIMALS, "0").slice(0, i.DECIMALS)) + BigInt(i.ROUNDED && n[i.DECIMALS] >= "5"), this.isNegative = t.charAt(0) === "-";
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
    const t = this.value.toString().replace("-", "").padStart(i.DECIMALS + 1, "0"), e = t.slice(0, -i.DECIMALS), n = t.slice(-i.DECIMALS).replace(x, "");
    return { integers: e, decimals: n };
  }
  toString() {
    const { integers: t, decimals: e } = this.getIntegersAndDecimals();
    return `${this.isNegative ? "-" : ""}${t}${e.length ? "." + e : ""}`;
  }
  formatToParts(t) {
    const { integers: e, decimals: n } = this.getIntegersAndDecimals(), r = t.numberFormatter.formatToParts(BigInt(e));
    return this.isNegative && r.unshift({ type: "minusSign", value: t.minusSign }), n.length && (r.push({ type: "decimal", value: t.decimal }), n.split("").forEach((a) => r.push({ type: "fraction", value: a }))), r;
  }
  format(t) {
    const { integers: e, decimals: n } = this.getIntegersAndDecimals(), r = `${this.isNegative ? t.minusSign : ""}${t.numberFormatter.format(
      BigInt(e)
    )}`, a = n.length ? `${t.decimal}${n.split("").map((u) => t.numberFormatter.format(Number(u))).join("")}` : "";
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
function b(s) {
  return !(!s || isNaN(Number(s)));
}
function J(s) {
  return !s || !H(s) ? "" : p(s, (t) => {
    let e = !1;
    const n = t.split("").filter((r, a) => r.match(/\./g) && !e ? (e = !0, !0) : r.match(/-/g) && a === 0 ? !0 : f.includes(r)).join("");
    return b(n) ? new i(n).toString() : "";
  });
}
const w = /^([-0])0+(?=\d)/, _ = /(?!^\.)\.$/, R = /(?!^-)-/g, T = /^-\b0\b\.?0*$/, M = /0*$/, j = /* @__PURE__ */ new Set(["e", "E", "-", ",", ".", ...f]), q = (s) => {
  const t = Array.from(s).filter((e) => j.has(e)).join("");
  return p(t, (e) => {
    const n = e.replace(R, "").replace(_, "").replace(w, "$1");
    return b(n) ? T.test(n) ? n : z(n) : e;
  });
};
function z(s) {
  const t = s.split(".")[1], e = new i(s).toString(), [n, r] = e.split(".");
  return t && r !== t ? `${n}.${t}` : e;
}
function p(s, t) {
  if (!s)
    return s;
  const e = s.toLowerCase().indexOf("e") + 1;
  return e ? s.replace(/[eE]*$/g, "").substring(0, e).concat(s.slice(e).replace(/[eE]/g, "")).split(/[eE]/).map((n, r) => t(r === 1 ? n.replace(/\./g, "") : n)).join("e").replace(/^e/, "1e") : t(s);
}
function P(s) {
  const t = s.split(/[eE]/);
  if (t.length === 1)
    return s;
  const e = +s;
  if (Number.isSafeInteger(e))
    return `${e}`;
  const n = s.charAt(0) === "-", r = +t[1], a = t[0].split("."), u = (n ? a[0].substring(1) : a[0]) || "", $ = a[1] || "", v = (o, m) => {
    const c = Math.abs(m) - o.length, h = c > 0 ? `${"0".repeat(c)}${o}` : o;
    return `${h.slice(0, m)}.${h.slice(m)}`;
  }, O = (o, m) => {
    const c = m > o.length ? `${o}${"0".repeat(m - o.length)}` : o;
    return `${c.slice(0, m)}.${c.slice(m)}`;
  }, S = r > 0 ? `${u}${O($, r)}` : `${v(u, r)}${$}`;
  return `${n ? "-" : ""}${S.charAt(0) === "." ? "0" : ""}${S.replace(L, "").replace(w, "")}`;
}
function H(s) {
  return f.some((t) => s.includes(t));
}
function W(s, t, e) {
  const n = t.split(".")[1];
  if (n) {
    const r = n.match(M)?.[0];
    if (r && e.delocalize(s).length !== t.length && n.indexOf("e") === -1) {
      const a = e.decimal;
      return s = s.includes(a) ? s : `${s}${a}`, s.padEnd(s.length + r.length, e.localize("0"));
    }
  }
  return s;
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
), I = ["arab", "arabext", "latn"], N = (s) => !!(I && I.includes(s)), g = new Intl.NumberFormat().resolvedOptions().numberingSystem, y = g === "arab" || !N(g) ? "latn" : g, k = (s) => N(s) ? s : y;
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
    this.delocalize = (t) => this._numberFormatOptions ? p(
      t,
      (e) => this.#t(this.#e(e))
    ) : t, this.localize = (t) => this._numberFormatOptions ? p(
      t,
      (e) => b(e.trim()) ? new i(e.trim()).format(this).replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group) : e
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
    if (t.numberingSystem = k(t?.numberingSystem), t.locale = t?.locale || d, // No need to create the formatter if `locale` and `numberingSystem`
    // are the default values and `numberFormatOptions` has not been set
    !this._numberFormatOptions && t.locale === d && t.numberingSystem === y && // don't skip initialization if any options besides locale/numberingSystem are set
    Object.keys(t).length === 2 || // cache formatter by only recreating when options change
    JSON.stringify(this._numberFormatOptions) === JSON.stringify(t))
      return;
    this._numberFormatOptions = t, this._numberFormatter = new Intl.NumberFormat(this._numberFormatOptions.locale, this._numberFormatOptions), this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: !1,
        numberingSystem: this._numberFormatOptions.numberingSystem
      }).format(9876543210)
    ].reverse();
    const e = new Map(this._digits.map((r, a) => [r, a])), n = new Intl.NumberFormat(this._numberFormatOptions.locale, {
      numberingSystem: this._numberFormatOptions.numberingSystem
    }).formatToParts(-123456789e-1);
    this._actualGroup = n.find((r) => r.type === "group").value, this._group = this._actualGroup.trim().length === 0 || this._actualGroup == " " ? " " : this._actualGroup, this._decimal = t.locale === "bs" || t.locale === "mk" ? "," : n.find((r) => r.type === "decimal").value, this._minusSign = n.find((r) => r.type === "minusSign").value, this._getDigitIndex = (r) => `${e.get(r) ?? ""}`;
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
    const n = t.slice(0, e).replace(new RegExp(`[${this._group}]`, "g"), ""), r = t.slice(e + 1);
    return `${n}.${r}`;
  }
}
const Y = new Z();
let l, F;
function G(s = {}) {
  return Object.entries(s).sort(([t], [e]) => t.localeCompare(e)).map((t) => `${t[0]}-${t[1]}`).flat().join(":");
}
function B(s, t) {
  l || (l = /* @__PURE__ */ new Map()), F !== s && (l.clear(), F = s);
  const e = G(t), n = l.get(e);
  if (n)
    return n;
  const r = new Intl.DateTimeFormat(s, t);
  return l.set(e, r), r;
}
export {
  i as B,
  Z as N,
  A as a,
  k as b,
  y as c,
  d,
  q as e,
  W as f,
  B as g,
  Q as h,
  b as i,
  X as l,
  Y as n,
  J as p,
  C as s
};
