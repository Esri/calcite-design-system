import { l as T, i as S, n as h, a as A, b as y } from "./locale.js";
import { d as p } from "./math.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const N = ["12", "24"], U = 5;
function g({
  locale: e,
  numberingSystem: t,
  includeSeconds: r = !0,
  fractionalSecondDigits: i,
  hour12: n
}) {
  const o = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    numberingSystem: A(t)
  };
  return typeof n == "boolean" && (o.hour12 = n), r && (o.second = "2-digit", i && (o.fractionalSecondDigits = i)), y(e, o);
}
function I(e, t) {
  return parseFloat(`0.${e}`).toFixed(p(t)).replace("0.", "");
}
function x(e, t) {
  if (e == null)
    return;
  const r = e.toString(), i = p(e);
  if (e < 1 && i > 0 && i < 4) {
    const n = r.replace("0.", "");
    return !t || n.length === t ? n : n.length < t ? n.padEnd(t, "0") : n;
  }
  if (e >= 0 && e < 10)
    return r.padStart(2, "0");
  if (e >= 10)
    return r;
}
function b(e) {
  return parseInt((parseFloat(`0.${e}`) / 1e-3).toFixed(3));
}
function L(e) {
  const t = { locale: e };
  return e === "mk" ? t.hour12 = !1 : e.toLowerCase() === "es-mx" && (t.hour12 = !0), g(t).formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0))).find(({ type: n }) => n === "dayPeriod")?.value ? "12" : "24";
}
function z({
  locale: e,
  meridiem: t,
  parts: r
}) {
  const i = ["he", "bs", "mk"];
  let n;
  if (r) {
    if (n = r.find(({ type: o }) => o === "dayPeriod")?.value || null, e && i.includes(e)) {
      const o = T.get(e);
      n === "PM" && (n = o.pm), n === "AM" && (n = o.am);
    }
  } else if (t)
    if (i.includes(e)) {
      const o = T.get(e);
      n = t === "PM" ? o.pm : o.am;
    } else {
      const o = g({ locale: e, hour12: !0 }), s = 6, c = 18, l = new Date(
        Date.UTC(0, 0, 0, t === "AM" ? s : c, 0)
      );
      n = o.formatToParts(l).find(({ type: f }) => f === "dayPeriod")?.value || null;
    }
  return n;
}
function F(e, t) {
  return h.numberFormatOptions = {
    locale: e,
    numberingSystem: t
  }, h.localize("1.1").split("")[1];
}
function H(e, t, r = "latn") {
  const n = g({ locale: t, numberingSystem: r }).formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return u(`${e}Suffix`, n);
}
function u(e, t, r = "en") {
  if (!e || !t)
    return null;
  if (e === "hourSuffix") {
    const i = t.indexOf(t.find(({ type: s }) => s === "hour")), n = t.indexOf(t.find(({ type: s }) => s === "minute")), o = t[i + 1];
    return o && o.type === "literal" && n - i === 2 && o.value?.trim() || null;
  }
  if (e === "minuteSuffix") {
    const i = t.indexOf(t.find(({ type: s }) => s === "minute")), n = t.indexOf(t.find(({ type: s }) => s === "second")), o = t[i + 1];
    return o && o.type === "literal" && n - i === 2 && o.value?.trim() || null;
  }
  if (e === "secondSuffix") {
    let i;
    const n = t.indexOf(t.find(({ type: o }) => o === "fractionalSecond"));
    if (n)
      i = t[n + 1];
    else {
      const o = t.indexOf(t.find(({ type: s }) => s === "second"));
      i = t[o + 1];
    }
    return i?.type === "literal" && i.value?.trim() || null;
  }
  return e === "meridiem" && (t.find(({ type: n }) => n === "dayPeriod")?.value || null) ? z({ locale: r, parts: t }) : t.find(({ type: i }) => i === e)?.value || null;
}
function V(e) {
  if (!S(e))
    return null;
  const t = parseInt(e);
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
function P(e) {
  const t = typeof e == "string";
  if (!e || t && (e.startsWith(":") || e.endsWith(":")) || !t && (!e.hour || !e.minute))
    return !1;
  let r, i, n;
  if (t ? [r, i, n] = e.split(":") : { hour: r, minute: i, second: n } = e, !r || !i)
    return !1;
  const o = parseInt(r), s = parseInt(i), c = parseInt(n), l = S(r) && o >= 0 && o < 24, d = S(i) && s >= 0 && s < 60, f = S(n) && c >= 0 && c < 60;
  return !!(l && d && !n || l && d && f);
}
function O(e, t) {
  if (t === "meridiem")
    return e === "AM" || e === "PM";
  if (!S(e))
    return !1;
  const r = Number(e), i = r >= 0, n = r < 24, o = r < 60, s = r <= 999;
  return t === "hour" ? i && n : t === "fractionalSecond" ? i && s : i && o;
}
function W({
  value: e,
  part: t,
  locale: r,
  numberingSystem: i = "latn",
  hour12: n
}) {
  if (!O(e, t))
    return;
  if (t === "fractionalSecond") {
    const d = F(r, i);
    let f = null;
    if (e) {
      h.numberFormatOptions = {
        locale: r,
        numberingSystem: i
      };
      const m = h.localize("0");
      parseInt(e) === 0 ? f = "".padStart(e.length, m) : (f = h.localize(`0.${e}`).replace(`${m}${d}`, ""), f.length < e.length && (f = f.padEnd(e.length, m)));
    }
    return f;
  }
  const o = parseInt(e), s = new Date(
    Date.UTC(
      0,
      0,
      0,
      t === "hour" ? o : t === "meridiem" ? e === "AM" ? 0 : 12 : 0,
      t === "minute" ? o : 0,
      t === "second" ? o : 0
    )
  );
  if (!s)
    return;
  const l = g({ hour12: n, locale: r, numberingSystem: i }).formatToParts(s);
  return u(t, l, r);
}
function Z({
  hour12: e,
  includeSeconds: t = !0,
  locale: r,
  numberingSystem: i = "latn",
  parts: n = !1,
  step: o,
  value: s
}) {
  if (!P(s))
    return null;
  const { hour: c, minute: l, second: d = "0", fractionalSecond: f } = w(s, o), m = new Date(
    Date.UTC(
      0,
      0,
      0,
      parseInt(c),
      parseInt(l),
      parseInt(d),
      f && b(f)
    )
  ), M = g({
    fractionalSecondDigits: p(o),
    hour12: e,
    includeSeconds: t,
    locale: r,
    numberingSystem: i
  });
  if (n) {
    const a = M.formatToParts(m);
    return {
      hour: u("hour", a),
      hourSuffix: u("hourSuffix", a),
      minute: u("minute", a),
      minuteSuffix: u("minuteSuffix", a),
      second: u("second", a),
      decimalSeparator: F(r, i),
      fractionalSecond: u("fractionalSecond", a),
      secondSuffix: r !== "bg" && u("secondSuffix", a),
      meridiem: u("meridiem", a, r)
    };
  } else {
    let a = M.format(m) || null;
    if (!n && typeof a == "string" && r === "bg" && a && a.includes(" ч.") && (a = a.replaceAll(" ч.", "")), ["he", "bs", "mk"].includes(r)) {
      const D = T.get(r);
      a.includes("AM") ? a = a.replaceAll("AM", D.am) : a.includes("PM") && (a = a.replaceAll("PM", D.pm)), r !== "he" && a.indexOf(".") !== a.length - 1 && (a = a.replace(".", ","));
    }
    return a;
  }
}
function w(e, t) {
  if (P(e)) {
    const [r, i, n] = e.split(":");
    let o = n, s = null;
    return n?.includes(".") && ([o, s] = n.split(".")), t && (s = I(s, t)), {
      fractionalSecond: s,
      hour: r,
      minute: i,
      second: o
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
  if (!P(e))
    return null;
  let r, i, n, o, s, c = null;
  return typeof e == "string" ? ([r, i, o] = e.split(":"), [n, s] = o?.split(".") || ["0"]) : (r = e.hour, i = e.minute, n = e.second, s = e.fractionalSecond), r && i && (c = `${x(parseInt(r))}:${x(parseInt(i))}`, t < 60 && (c += `:${x(parseInt(n || "0"))}`, t < 1 && (c += `.${I(s || "0", t)}`))), c;
}
export {
  B as a,
  V as b,
  H as c,
  F as d,
  W as e,
  x as f,
  L as g,
  z as h,
  P as i,
  N as j,
  Z as l,
  U as m,
  w as p,
  k as t
};
