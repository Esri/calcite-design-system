/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as g, l as p, n as h, g as F, a as y } from "./locale.js";
import { d as P } from "./math.js";
const N = ["12", "24"], U = 5;
function x({
  locale: e,
  numberingSystem: t,
  includeSeconds: o,
  fractionalSecondDigits: i,
  hour12: n
}) {
  const r = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    numberingSystem: y(t)
  };
  return typeof n == "boolean" && (r.hour12 = n), o && (r.second = "2-digit", i && (r.fractionalSecondDigits = i)), F(e, r);
}
function A(e, t) {
  return parseFloat(`0.${e}`).toFixed(P(t)).replace("0.", "");
}
function T(e, t) {
  if (e == null)
    return;
  const o = e.toString(), i = P(e);
  if (e < 1 && i > 0 && i < 4) {
    const n = o.replace("0.", "");
    return !t || n.length === t ? n : n.length < t ? n.padEnd(t, "0") : n;
  }
  if (e >= 0 && e < 10)
    return o.padStart(2, "0");
  if (e >= 10)
    return o;
}
function z(e) {
  return parseInt((parseFloat(`0.${e}`) / 1e-3).toFixed(3), 10);
}
function L(e) {
  const t = { locale: e };
  return e === "mk" ? t.hour12 = !1 : e.toLowerCase() === "es-mx" && (t.hour12 = !0), x(t).formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0))).find(({ type: n }) => n === "dayPeriod")?.value ? "12" : "24";
}
function b({
  locale: e,
  meridiem: t,
  parts: o
}) {
  const i = ["he", "bs", "mk"];
  let n;
  if (o) {
    if (n = o.find(({ type: r }) => r === "dayPeriod")?.value || null, e && i.includes(e)) {
      const r = p.get(e);
      n === "PM" && (n = r.pm), n === "AM" && (n = r.am);
    }
  } else if (t)
    if (i.includes(e)) {
      const r = p.get(e);
      n = t === "PM" ? r.pm : r.am;
    } else {
      const r = x({ locale: e, hour12: !0 }), s = 6, c = 18, u = new Date(
        Date.UTC(0, 0, 0, t === "AM" ? s : c, 0)
      );
      n = r.formatToParts(u).find(({ type: l }) => l === "dayPeriod")?.value || null;
    }
  return n;
}
function I(e, t) {
  return h.numberFormatOptions = {
    locale: e,
    numberingSystem: t
  }, h.localize("1.1").split("")[1];
}
function H({
  hour12: e,
  locale: t,
  numberingSystem: o = "latn",
  part: i,
  step: n
}) {
  const s = x({ hour12: e, includeSeconds: n < 60, locale: t, numberingSystem: o }).formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return f(`${i}Suffix`, s, t);
}
function f(e, t, o = "en") {
  if (!e || !t)
    return null;
  if (e === "hourSuffix") {
    const i = t.find(({ type: u }) => u === "hour"), n = t.find(({ type: u }) => u === "minute"), r = i ? t.indexOf(i) : -1, s = n ? t.indexOf(n) : -1, c = t[r + 1];
    return c?.type === "literal" && s - r === 2 && c.value || null;
  }
  if (e === "minuteSuffix") {
    const i = t.find(({ type: s }) => s === "minute"), n = i ? t.indexOf(i) : -1, r = t[n + 1];
    return r?.type === "literal" && r.value || null;
  }
  if (e === "secondSuffix") {
    let i;
    const n = t.find(({ type: s }) => s === "fractionalSecond"), r = n ? t.indexOf(n) : -1;
    if (r !== -1)
      i = t[r + 1];
    else {
      const s = t.find(({ type: u }) => u === "second"), c = s ? t.indexOf(s) : -1;
      i = t[c + 1];
    }
    return i?.type === "literal" && i.value || null;
  }
  return e === "meridiem" && (t.find(({ type: n }) => n === "dayPeriod")?.value || null) ? b({ locale: o, parts: t }) ?? null : t.find(({ type: i }) => i === e)?.value || null;
}
function V(e) {
  if (!g(e))
    return null;
  const t = parseInt(e, 10);
  return t >= 0 && t <= 11 ? "AM" : "PM";
}
function B(e) {
  return new Intl.DateTimeFormat(e, {
    hour: "2-digit",
    hour12: !0,
    minute: "2-digit",
    timeZone: "UTC"
  }).formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0))).findIndex((i) => i.type === "dayPeriod");
}
function M(e) {
  const t = typeof e == "string";
  if (!e || t && (e.startsWith(":") || e.endsWith(":")) || !t && (!e.hour || !e.minute))
    return !1;
  let o, i, n;
  if (t ? [o, i, n] = e.split(":") : { hour: o, minute: i, second: n } = e, !o || !i)
    return !1;
  const r = parseInt(o, 10), s = parseInt(i, 10), c = parseInt(n ?? "", 10), u = g(o) && r >= 0 && r < 24, m = g(i) && s >= 0 && s < 60, l = g(n) && c >= 0 && c < 60;
  return u && m && (!n || l);
}
function w(e, t) {
  if (t === "meridiem")
    return e === "AM" || e === "PM";
  if (!g(e))
    return !1;
  const i = Number(e), n = i >= 0, r = i < 24, s = i < 60, c = i <= 999;
  return t === "hour" ? n && r : t === "fractionalSecond" ? n && c : n && s;
}
function W({
  value: e,
  part: t,
  locale: o,
  numberingSystem: i = "latn",
  hour12: n
}) {
  if (!w(e, t))
    return;
  if (t === "fractionalSecond") {
    const l = I(o, i);
    let d = null;
    if (e) {
      h.numberFormatOptions = {
        locale: o,
        numberingSystem: i
      };
      const S = h.localize("0");
      parseInt(e, 10) === 0 ? d = "".padStart(e.length, S) : (d = h.localize(`0.${e}`).replace(`${S}${l}`, ""), d.length < e.length && (d = d.padEnd(e.length, S)));
    }
    return d;
  }
  const r = parseInt(e, 10), s = new Date(
    Date.UTC(
      0,
      0,
      0,
      t === "hour" ? r : t === "meridiem" ? e === "AM" ? 0 : 12 : 0,
      t === "minute" ? r : 0,
      t === "second" ? r : 0
    )
  );
  if (!s)
    return;
  const c = ["second", "fractionalSecond"].includes(t), m = x({ hour12: n, includeSeconds: c, locale: o, numberingSystem: i }).formatToParts(s);
  return f(t, m, o);
}
function Z({
  hour12: e,
  locale: t,
  numberingSystem: o = "latn",
  parts: i = !1,
  step: n,
  value: r
}) {
  if (!M(r))
    return null;
  const { hour: s, minute: c, second: u = "0", fractionalSecond: m } = O(r, n), l = n < 60, d = new Date(
    Date.UTC(
      0,
      0,
      0,
      parseInt(s, 10),
      parseInt(c, 10),
      l && typeof u == "string" ? parseInt(u, 10) : 0,
      l && m ? z(m) : 0
    )
  ), S = x({
    fractionalSecondDigits: P(n),
    hour12: e,
    includeSeconds: l,
    locale: t,
    numberingSystem: o
  });
  if (i) {
    const a = S.formatToParts(d);
    return {
      hour: f("hour", a),
      hourSuffix: f("hourSuffix", a),
      minute: f("minute", a),
      minuteSuffix: f("minuteSuffix", a),
      second: f("second", a),
      decimalSeparator: I(t, o),
      fractionalSecond: f("fractionalSecond", a),
      secondSuffix: t !== "bg" ? f("secondSuffix", a) : null,
      meridiem: f("meridiem", a, t)
    };
  } else {
    let a = S.format(d) || null;
    if (!i && typeof a == "string" && t === "bg" && a && a.includes(" ч.") && (a = a.replaceAll(" ч.", "")), ["he", "bs", "mk"].includes(t)) {
      const D = p.get(t);
      a.includes("AM") ? a = a.replaceAll("AM", D.am) : a.includes("PM") && (a = a.replaceAll("PM", D.pm)), t !== "he" && a.indexOf(".") !== a.length - 1 && (a = a.replace(".", ","));
    }
    return a;
  }
}
function O(e, t) {
  if (M(e)) {
    const [o, i, n] = e.split(":");
    let r = n, s = null;
    return n?.includes(".") && ([r, s] = n.split(".")), t && typeof s == "string" && (s = A(s, t)), {
      fractionalSecond: s,
      hour: o,
      minute: i,
      second: r
    };
  }
  return {
    fractionalSecond: null,
    hour: null,
    minute: null,
    second: null
  };
}
function k(e, t = 60) {
  if (!M(e))
    return null;
  let o, i, n, r, s, c = null;
  return typeof e == "string" ? ([o, i, r] = e.split(":"), [n, s] = r?.split(".") || ["0"]) : (o = e.hour, i = e.minute, n = e.second, s = e.fractionalSecond), o && i && (c = `${T(parseInt(o, 10))}:${T(parseInt(i, 10))}`, t < 60 && (c += `:${T(parseInt(n || "0", 10))}`, t < 1 && (c += `.${A(s || "0", t)}`))), c;
}
export {
  B as a,
  V as b,
  H as c,
  I as d,
  W as e,
  T as f,
  L as g,
  b as h,
  M as i,
  N as j,
  Z as l,
  U as m,
  O as p,
  k as t
};
