/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { e as D } from "./escapeRegExp.js";
import { n as h } from "./locale.js";
function p(t, e, n) {
  if (!t)
    return !1;
  const r = t.getTime(), a = !(e instanceof Date) || r >= e.getTime(), o = !(n instanceof Date) || r <= n.getTime();
  return a && o;
}
function y(t, e, n) {
  if (!(t instanceof Date))
    return;
  const r = t.getTime(), a = e instanceof Date && r < e.getTime(), o = n instanceof Date && r > n.getTime();
  return a ? e : o ? n : t;
}
function Y(t, e = !1) {
  if (t instanceof Date)
    return t;
  if (!t || typeof t != "string")
    return;
  const n = t.split(/[: T-]/).map(parseFloat), r = new Date(n[0], (n[1] || 1) - 1, n[2] || 1);
  if (r.setFullYear(n[0]), isNaN(r.getTime()))
    throw new Error(`Invalid ISO 8601 date: "${t}"`);
  return e ? w(r) : r;
}
function v(t, e) {
  if (!e)
    return;
  const n = M(t, e), { day: r, month: a } = n, o = F(n.year, e), s = new Date(o, a, r);
  s.setFullYear(o);
  const c = r > 0, u = a > -1, f = !isNaN(s.getTime()), g = Object.values(d(t, e)).every(Boolean), i = o.toString().length > 0;
  if (c && u && f && g && i)
    return s;
}
function F(t, e) {
  return l(t, e, "read");
}
function E(t, e) {
  return l(t, e, "write");
}
function l(t, e, n) {
  if (e["default-calendar"] !== "buddhist")
    return t;
  const a = 543 * (n === "read" ? -1 : 1);
  return t + a;
}
function d(t, e) {
  const { unitOrder: n } = e, r = String.raw`[\s\u061C\u200E\u200F]*`, a = n.split(/([dmy]+)/giu).filter(Boolean).map((i) => /^[dmy]+$/iu.test(i) ? String.raw`(\p{Decimal_Number}+)` : r + Array.from(i).filter((m) => !/[\s\u061C\u200E\u200F]/u.test(m)).map(D).join(r) + r).join(""), o = t.match(
    new RegExp(`^${r}${a}${r}$`, "u")
  );
  if (!o)
    return { day: "", month: "", year: "" };
  const s = S(n), c = o.slice(1).map((i) => h.delocalize(i)), u = c[s.indexOf("d")], f = c[s.indexOf("m")], g = c[s.indexOf("y")];
  return { day: u, month: f, year: g };
}
function I(t) {
  if (t instanceof Date) {
    const e = String(t.getMonth() + 1).padStart(2, "0"), n = String(t.getDate()).padStart(2, "0");
    return `${String(t.getFullYear()).padStart(4, "0")}-${e}-${n}`;
  }
  return "";
}
function x(t) {
  const e = t.split("-");
  return { day: e[2], month: e[1], year: e[0] };
}
function C(t, e) {
  return t instanceof Date && e instanceof Date && t.getDate() === e.getDate() && t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear();
}
function $(t) {
  const e = t.getMonth(), n = new Date(t);
  return n.setMonth(e - 1), e === n.getMonth() ? new Date(t.getFullYear(), e, 0) : n;
}
function A(t, e) {
  const n = new Date(t);
  return n.setMonth(e), n;
}
function R(t, e, n) {
  if (!t)
    return;
  const r = new Date(t);
  return r.setDate(1), p(r, e, n) ? r : y(r, e, n);
}
function b(t) {
  const e = t.getMonth(), n = new Date(t);
  return n.setMonth(e + 1), (e + 2) % 7 === n.getMonth() % 7 ? new Date(t.getFullYear(), e + 2, 0) : n;
}
function M(t, e) {
  const { day: n, month: r, year: a } = d(t, e);
  return {
    day: parseInt(n, 10),
    month: parseInt(r, 10) - 1,
    // this subtracts by 1 because the month in the Date constructor is zero-based https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
    year: parseInt(a, 10)
  };
}
function S(t) {
  const e = ["d", "m", "y"], n = t.toLowerCase();
  return e.sort((r, a) => n.indexOf(r) - n.indexOf(a));
}
function N(t, e) {
  const n = t.getTime(), r = e.getTime();
  return (n - r) / (1e3 * 3600 * 24);
}
function w(t) {
  return t.setHours(23, 59, 59, 999), t;
}
function _(t, e) {
  return !!(t && e && t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear());
}
export {
  I as a,
  y as b,
  R as c,
  Y as d,
  F as e,
  E as f,
  N as g,
  _ as h,
  p as i,
  A as j,
  S as k,
  x as l,
  d as m,
  b as n,
  v as o,
  $ as p,
  C as s
};
