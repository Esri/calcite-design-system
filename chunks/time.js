import { i as h, n as x, a as b, b as y, l as P } from "./locale.js";
import { d as g } from "./math.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const N = ["12", "24"], U = 5;
function S({
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
    numberingSystem: b(t)
  };
  return typeof n == "boolean" && (o.hour12 = n), r && (o.second = "2-digit", i && (o.fractionalSecondDigits = i)), y(e, o);
}
function F(e, t) {
  return parseFloat(`0.${e}`).toFixed(g(t)).replace("0.", "");
}
function p(e, t) {
  if (e == null)
    return;
  const r = e.toString(), i = g(e);
  if (e < 1 && i > 0 && i < 4) {
    const n = r.replace("0.", "");
    return !t || n.length === t ? n : n.length < t ? n.padEnd(t, "0") : n;
  }
  if (e >= 0 && e < 10)
    return r.padStart(2, "0");
  if (e >= 10)
    return r;
}
function A(e) {
  return parseInt((parseFloat(`0.${e}`) / 1e-3).toFixed(3));
}
function L(e) {
  const t = { locale: e };
  return e === "mk" ? t.hour12 = !1 : e.toLowerCase() === "es-mx" && (t.hour12 = !0), S(t).formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0))).find(({ type: n }) => n === "dayPeriod")?.value ? "12" : "24";
}
function w({
  locale: e,
  meridiem: t,
  parts: r
}) {
  const i = ["he", "bs", "mk"];
  let n;
  if (r) {
    if (n = r.find(({ type: o }) => o === "dayPeriod")?.value || null, e && i.includes(e)) {
      const o = P.get(e);
      n === "PM" && (n = o.pm), n === "AM" && (n = o.am);
    }
  } else if (t)
    if (i.includes(e)) {
      const o = P.get(e);
      n = t === "PM" ? o.pm : o.am;
    } else {
      const o = S({ locale: e, hour12: !0 }), s = 6, c = 18, l = new Date(
        Date.UTC(0, 0, 0, t === "AM" ? s : c, 0)
      );
      n = o.formatToParts(l).find(({ type: d }) => d === "dayPeriod")?.value || null;
    }
  return n;
}
function D(e, t) {
  return x.numberFormatOptions = {
    locale: e,
    numberingSystem: t
  }, x.localize("1.1").split("")[1];
}
function H(e, t, r = "latn") {
  const n = S({ locale: t, numberingSystem: r }).formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return f(`${e}Suffix`, n);
}
function f(e, t, r = "en") {
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
  return e === "meridiem" && (t.find(({ type: n }) => n === "dayPeriod")?.value || null) ? w({ locale: r, parts: t }) : t.find(({ type: i }) => i === e)?.value || null;
}
function V(e) {
  if (!h(e))
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
function T(e) {
  const t = typeof e == "string";
  if (!e || t && (e.startsWith(":") || e.endsWith(":")) || !t && (!e.hour || !e.minute))
    return !1;
  let r, i, n;
  if (t ? [r, i, n] = e.split(":") : { hour: r, minute: i, second: n } = e, !r || !i)
    return !1;
  const o = parseInt(r), s = parseInt(i), c = parseInt(n), l = h(r) && o >= 0 && o < 24, m = h(i) && s >= 0 && s < 60, d = h(n) && c >= 0 && c < 60;
  return !!(l && m && !n || l && m && d);
}
function O(e, t) {
  if (t === "meridiem")
    return e === "AM" || e === "PM";
  if (!h(e))
    return !1;
  const r = Number(e), i = r >= 0, n = r < 24, o = r < 60, s = r <= 999;
  return t === "hour" ? i && n : t === "fractionalSecond" ? i && s : i && o;
}
function k({
  value: e,
  part: t,
  locale: r,
  numberingSystem: i = "latn",
  hour12: n
}) {
  if (!O(e, t))
    return;
  if (t === "fractionalSecond") {
    const m = D(r, i);
    let d = null;
    if (e) {
      x.numberFormatOptions = {
        locale: r,
        numberingSystem: i
      };
      const u = x.localize("0");
      parseInt(e) === 0 ? d = "".padStart(e.length, u) : (d = x.localize(`0.${e}`).replace(`${u}${m}`, ""), d.length < e.length && (d = d.padEnd(e.length, u)));
    }
    return d;
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
  const l = S({ hour12: n, locale: r, numberingSystem: i }).formatToParts(s);
  return f(t, l, r);
}
function W({
  hour12: e,
  includeSeconds: t = !0,
  locale: r,
  numberingSystem: i = "latn",
  parts: n = !1,
  step: o,
  value: s
}) {
  if (!T(s))
    return null;
  const { hour: c, minute: l, second: m = "0", fractionalSecond: d } = z(s, o), u = new Date(
    Date.UTC(
      0,
      0,
      0,
      parseInt(c),
      parseInt(l),
      parseInt(m),
      d && A(d)
    )
  ), M = S({
    fractionalSecondDigits: g(o),
    hour12: e,
    includeSeconds: t,
    locale: r,
    numberingSystem: i
  });
  if (n) {
    const a = M.formatToParts(u);
    return {
      hour: f("hour", a),
      hourSuffix: f("hourSuffix", a),
      minute: f("minute", a),
      minuteSuffix: f("minuteSuffix", a),
      second: f("second", a),
      decimalSeparator: D(r, i),
      fractionalSecond: f("fractionalSecond", a),
      secondSuffix: r !== "bg" && f("secondSuffix", a),
      meridiem: f("meridiem", a, r)
    };
  } else {
    let a = M.format(u) || null;
    if (!n && typeof a == "string" && r === "bg" && a && a.includes(" ч.") && (a = a.replaceAll(" ч.", "")), ["he", "bs", "mk"].includes(r)) {
      const I = P.get(r);
      a.includes("AM") ? a = a.replaceAll("AM", I.am) : a.includes("PM") && (a = a.replaceAll("PM", I.pm)), r !== "he" && a.indexOf(".") !== a.length - 1 && (a = a.replace(".", ","));
    }
    return a;
  }
}
function Z({
  hour12: e,
  locale: t,
  numberingSystem: r = "latn",
  step: i = 60,
  value: n
}) {
  if (!T(n))
    return null;
  const { hour: o, minute: s, second: c = "0", fractionalSecond: l } = z(n, i), m = new Date(
    Date.UTC(
      0,
      0,
      0,
      parseInt(o),
      parseInt(s),
      parseInt(c),
      l && A(l)
    )
  );
  if (m) {
    const u = S({
      fractionalSecondDigits: g(i),
      hour12: e,
      locale: t,
      numberingSystem: r
    }).formatToParts(m);
    return {
      hour: f("hour", u),
      hourSuffix: f("hourSuffix", u),
      minute: f("minute", u),
      minuteSuffix: f("minuteSuffix", u),
      second: f("second", u),
      decimalSeparator: D(t, r),
      fractionalSecond: f("fractionalSecond", u),
      secondSuffix: t !== "bg" && f("secondSuffix", u),
      meridiem: f("meridiem", u, t)
    };
  }
  return null;
}
function z(e, t) {
  if (T(e)) {
    const [r, i, n] = e.split(":");
    let o = n, s = null;
    return n?.includes(".") && ([o, s] = n.split(".")), t && (s = F(s, t)), {
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
function E(e, t = 60) {
  if (!T(e))
    return null;
  let r, i, n, o, s, c = null;
  return typeof e == "string" ? ([r, i, o] = e.split(":"), [n, s] = o?.split(".") || ["0"]) : (r = e.hour, i = e.minute, n = e.second, s = e.fractionalSecond), r && i && (c = `${p(parseInt(r))}:${p(parseInt(i))}`, t < 60 && (c += `:${p(parseInt(n || "0"))}`, t < 1 && (c += `.${F(s || "0", t)}`))), c;
}
export {
  H as a,
  D as b,
  k as c,
  L as d,
  B as e,
  p as f,
  V as g,
  N as h,
  T as i,
  W as j,
  w as k,
  Z as l,
  U as m,
  z as p,
  E as t
};
