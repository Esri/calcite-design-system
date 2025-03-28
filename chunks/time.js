import { l as M, i as h, n as T, a as A, b as F } from "./locale.js";
import { d as $ } from "./math.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const U = ["12", "24"], V = 5;
function p({
  locale: t,
  numberingSystem: e,
  includeSeconds: n = !0,
  fractionalSecondDigits: r,
  hour12: i
}) {
  const o = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    numberingSystem: A(e)
  };
  return typeof i == "boolean" && (o.hour12 = i), n && (o.second = "2-digit", r && (o.fractionalSecondDigits = r)), F(t, o);
}
function S(t, e) {
  if (t == null)
    return;
  const n = t.toString(), r = $(t);
  if (t < 1 && r > 0 && r < 4) {
    const i = n.replace("0.", "");
    return !e || i.length === e ? i : i.length < e ? i.padEnd(e, "0") : i;
  }
  if (t >= 0 && t < 10)
    return n.padStart(2, "0");
  if (t >= 10)
    return n;
}
function k(t) {
  if (!g(t))
    return null;
  const { hour: e, minute: n, second: r, fractionalSecond: i } = x(t);
  let o = `${S(parseInt(e))}:${S(parseInt(n))}`;
  return r && (o += `:${S(parseInt(r))}`, i && (o += `.${i}`)), o;
}
function b(t) {
  return parseInt((parseFloat(`0.${t}`) / 1e-3).toFixed(3));
}
function O(t) {
  const e = { locale: t };
  t === "mk" ? e.hour12 = !1 : t.toLowerCase() === "es-mx" && (e.hour12 = !0);
  const r = p(e).formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return l("meridiem", r) ? "12" : "24";
}
function H(t) {
  return O(t) === "24" ? "12" : "24";
}
function P(t, e, n = "latn") {
  const r = p({ hour12: !0, locale: t, numberingSystem: n }), i = 6, o = 18, u = new Date(
    Date.UTC(0, 0, 0, e === "AM" ? i : o, 0)
  ), c = r.formatToParts(u);
  return l("meridiem", c);
}
function D(t, e) {
  return T.numberFormatOptions = {
    locale: t,
    numberingSystem: e
  }, T.localize("1.1").split("")[1];
}
function W(t, e, n = "latn") {
  const i = p({ locale: e, numberingSystem: n }).formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return l(`${t}Suffix`, i);
}
function l(t, e) {
  if (!t || !e)
    return null;
  if (t === "hourSuffix") {
    const n = e.indexOf(e.find(({ type: o }) => o === "hour")), r = e.indexOf(e.find(({ type: o }) => o === "minute")), i = e[n + 1];
    return i && i.type === "literal" && r - n === 2 && i.value?.trim() || null;
  }
  if (t === "minuteSuffix") {
    const n = e.indexOf(e.find(({ type: o }) => o === "minute")), r = e.indexOf(e.find(({ type: o }) => o === "second")), i = e[n + 1];
    return i && i.type === "literal" && r - n === 2 && i.value?.trim() || null;
  }
  if (t === "secondSuffix") {
    const n = e.indexOf(e.find(({ type: i }) => i === "second")), r = e[n + 1];
    return r && r.type === "literal" && r.value?.trim() || null;
  }
  return e.find(({ type: n }) => t == "meridiem" ? n === "dayPeriod" : n === t)?.value || null;
}
function E(t) {
  if (!h(t))
    return null;
  const e = parseInt(t);
  return e >= 0 && e <= 11 ? "AM" : "PM";
}
function Z(t) {
  const e = P(t, "AM"), n = P(t, "PM"), r = L(t), i = z({
    hour12: !0,
    value: "00:00:00",
    locale: t,
    numberingSystem: "latn"
  }), o = i[r === 0 ? 1 : r - 1].type === "hour" || i[r - 1]?.type === "second" ? "" : " ";
  return (
    // Unknown dayjs parsing bug with norwegian.  Dayjs only accepts uppercase meridiems for some reason, despite the LT/LTS config
    t !== "no" && e === e.toLocaleLowerCase(t) && n === n.toLocaleLowerCase(t) ? r === 0 ? `a${o}` : `${o}a` : r === 0 ? `A${o}` : `${o}A`
  );
}
function L(t) {
  return z({
    hour12: !0,
    value: "00:00:00",
    locale: t,
    numberingSystem: "latn"
  }).findIndex((n) => n.type === "dayPeriod");
}
function j(t, e) {
  return t === H(e);
}
function g(t) {
  if (!t || t.startsWith(":") || t.endsWith(":"))
    return !1;
  const e = t.split(":");
  if (!(e.length > 1 && e.length < 4))
    return !1;
  const [r, i, o] = e, u = parseInt(e[0]), c = parseInt(e[1]), f = parseInt(e[2]), d = h(r) && u >= 0 && u < 24, a = h(i) && c >= 0 && c < 60, m = h(o) && f >= 0 && f < 60;
  if (d && a && !o || d && a && m)
    return !0;
}
function w(t, e) {
  if (e === "meridiem")
    return t === "AM" || t === "PM";
  if (!h(t))
    return !1;
  const n = Number(t);
  return e === "hour" ? n >= 0 && n < 24 : n >= 0 && n < 60;
}
function y({
  value: t,
  part: e,
  locale: n,
  numberingSystem: r = "latn",
  hour12: i
}) {
  if (e === "fractionalSecond") {
    const d = D(n, r);
    let a = null;
    if (t) {
      T.numberFormatOptions = {
        locale: n,
        numberingSystem: r
      };
      const m = T.localize("0");
      parseInt(t) === 0 ? a = "".padStart(t.length, m) : (a = T.localize(`0.${t}`).replace(`${m}${d}`, ""), a.length < t.length && (a = a.padEnd(t.length, m)));
    }
    return a;
  }
  if (!w(t, e))
    return;
  const o = parseInt(t), u = new Date(
    Date.UTC(
      0,
      0,
      0,
      e === "hour" ? o : e === "meridiem" ? t === "AM" ? 0 : 12 : 0,
      e === "minute" ? o : 0,
      e === "second" ? o : 0
    )
  );
  if (!u)
    return;
  const f = p({ hour12: i, locale: n, numberingSystem: r }).formatToParts(u);
  return l(e, f);
}
function q({
  value: t,
  locale: e,
  numberingSystem: n = "latn",
  includeSeconds: r = !0,
  fractionalSecondDigits: i,
  hour12: o
}) {
  if (!g(t))
    return null;
  const { hour: u, minute: c, second: f = "0", fractionalSecond: d } = x(t), a = new Date(
    Date.UTC(
      0,
      0,
      0,
      parseInt(u),
      parseInt(c),
      parseInt(f),
      d && b(d)
    )
  );
  let s = p({
    locale: e,
    numberingSystem: n,
    includeSeconds: r,
    fractionalSecondDigits: i,
    hour12: o
  }).format(a) || null;
  if (s && e === "bg" && s.includes(" ч.") && (s = s.replaceAll(" ч.", "")), e === "bs" || e === "mk") {
    const I = M.get(e);
    s.includes("AM") ? s = s.replaceAll("AM", I.am) : s.includes("PM") && (s = s.replaceAll("PM", I.pm)), s.indexOf(".") !== s.length - 1 && (s = s.replace(".", ","));
  }
  return s;
}
function B({
  value: t,
  locale: e,
  numberingSystem: n = "latn",
  hour12: r
}) {
  if (!g(t))
    return null;
  const { hour: i, minute: o, second: u = "0", fractionalSecond: c } = x(t), f = new Date(Date.UTC(0, 0, 0, parseInt(i), parseInt(o), parseInt(u)));
  if (f) {
    const a = p({ locale: e, numberingSystem: n, hour12: r }).formatToParts(f);
    let m = l("meridiem", a);
    if (r && (e === "bs" || e === "mk")) {
      const s = M.get(e);
      m = f.getHours() > 11 ? s.am : s.pm;
    }
    return {
      localizedHour: l("hour", a),
      localizedHourSuffix: l("hourSuffix", a),
      localizedMinute: l("minute", a),
      localizedMinuteSuffix: l("minuteSuffix", a),
      localizedSecond: l("second", a),
      localizedDecimalSeparator: D(e, n),
      localizedFractionalSecond: y({
        value: c,
        part: "fractionalSecond",
        locale: e,
        numberingSystem: n
      }),
      localizedSecondSuffix: l("secondSuffix", a),
      localizedMeridiem: m
    };
  }
  return null;
}
function z({
  hour12: t,
  value: e,
  locale: n,
  numberingSystem: r
}) {
  if (!g(e))
    return null;
  const { hour: i, minute: o, second: u = "0" } = x(e), c = new Date(Date.UTC(0, 0, 0, parseInt(i), parseInt(o), parseInt(u)));
  return c ? p({ hour12: t, locale: n, numberingSystem: r }).formatToParts(c) : null;
}
function x(t) {
  if (g(t)) {
    const [e, n, r] = t.split(":");
    let i = r, o = null;
    return r?.includes(".") && ([i, o] = r.split(".")), {
      fractionalSecond: o,
      hour: e,
      minute: n,
      second: i
    };
  }
  return {
    fractionalSecond: null,
    hour: null,
    minute: null,
    second: null
  };
}
function G(t, e = !0) {
  if (!g(t))
    return "";
  const { hour: n, minute: r, second: i, fractionalSecond: o } = x(t);
  let u = `${S(parseInt(n))}:${S(parseInt(r))}`;
  return e && (u += `:${S(parseInt(e && i || "0"))}`, o && (u += `.${o}`)), u;
}
export {
  W as a,
  D as b,
  y as c,
  O as d,
  L as e,
  S as f,
  E as g,
  U as h,
  g as i,
  j,
  H as k,
  B as l,
  V as m,
  Z as n,
  q as o,
  x as p,
  k as q,
  G as t
};
