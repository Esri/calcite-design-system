/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { n as h } from "./locale.js";
function m(t, e, n) {
  if (!t)
    return !1;
  const r = t.getTime(), a = !(e instanceof Date) || r >= e.getTime(), o = !(n instanceof Date) || r <= n.getTime();
  return a && o;
}
function p(t, e, n) {
  if (!(t instanceof Date))
    return;
  const r = t.getTime(), a = e instanceof Date && r < e.getTime(), o = n instanceof Date && r > n.getTime();
  return a ? e : o ? n : t;
}
function O(t, e = !1) {
  if (t instanceof Date)
    return t;
  if (!t || typeof t != "string")
    return;
  const n = t.split(/[: T-]/).map(parseFloat), r = new Date(n[0], (n[1] || 1) - 1, n[2] || 1);
  if (r.setFullYear(n[0]), isNaN(r.getTime()))
    throw new Error(`Invalid ISO 8601 date: "${t}"`);
  return e ? T(r) : r;
}
function w(t, e) {
  if (!e)
    return;
  const { separator: n } = e, r = y(t, e), { day: a, month: o } = r, s = M(r.year, e), i = new Date(s, o, a);
  i.setFullYear(s);
  const c = a > 0, u = o > -1, g = !isNaN(i.getTime()), l = t.split(n).filter((d) => d).length > 2, D = s.toString().length > 0;
  if (c && u && g && l && D)
    return i;
}
function M(t, e) {
  return f(t, e, "read");
}
function v(t, e) {
  return f(t, e, "write");
}
function f(t, e, n) {
  if (e["default-calendar"] !== "buddhist")
    return t;
  const a = 543 * (n === "read" ? -1 : 1);
  return t + a;
}
function F(t, e) {
  const { separator: n, unitOrder: r } = e, a = S(r), o = t.split(n).map((u) => h.delocalize(u)), s = o[a.indexOf("d")], i = o[a.indexOf("m")], c = o[a.indexOf("y")];
  return { day: s, month: i, year: c };
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
function E(t, e) {
  return t instanceof Date && e instanceof Date && t.getDate() === e.getDate() && t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear();
}
function A(t) {
  const e = t.getMonth(), n = new Date(t);
  return n.setMonth(e - 1), e === n.getMonth() ? new Date(t.getFullYear(), e, 0) : n;
}
function C(t, e) {
  const n = new Date(t);
  return n.setMonth(e), n;
}
function L(t, e, n) {
  if (!t)
    return;
  const r = new Date(t);
  return r.setDate(1), m(r, e, n) ? r : p(r, e, n);
}
function N(t) {
  const e = t.getMonth(), n = new Date(t);
  return n.setMonth(e + 1), (e + 2) % 7 === n.getMonth() % 7 ? new Date(t.getFullYear(), e + 2, 0) : n;
}
function y(t, e) {
  const { day: n, month: r, year: a } = F(t, e);
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
function R(t, e) {
  const n = t.getTime(), r = e.getTime();
  return (n - r) / (1e3 * 3600 * 24);
}
function T(t) {
  return t.setHours(23, 59, 59, 999), t;
}
function _(t, e) {
  return !!(t && e && t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear());
}
export {
  I as a,
  p as b,
  L as c,
  O as d,
  M as e,
  v as f,
  R as g,
  _ as h,
  m as i,
  C as j,
  S as k,
  x as l,
  F as m,
  N as n,
  w as o,
  A as p,
  E as s
};
