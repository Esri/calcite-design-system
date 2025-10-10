import { n as d } from "./locale.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function m(t, n, e) {
  if (!t)
    return;
  const r = t.getTime(), a = !(n instanceof Date) || r >= n.getTime(), o = !(e instanceof Date) || r <= e.getTime();
  return a && o;
}
function p(t, n, e) {
  if (!(t instanceof Date))
    return null;
  const r = t.getTime(), a = n instanceof Date && r < n.getTime(), o = e instanceof Date && r > e.getTime();
  return a ? n : o ? e : t;
}
function O(t, n = !1) {
  if (t instanceof Date)
    return t;
  if (!t || typeof t != "string")
    return null;
  const e = t.split(/[: T-]/).map(parseFloat), r = new Date(e[0], (e[1] || 1) - 1, e[2] || 1);
  if (r.setFullYear(e[0]), isNaN(r.getTime()))
    throw new Error(`Invalid ISO 8601 date: "${t}"`);
  return n ? T(r) : r;
}
function w(t, n) {
  if (!n)
    return null;
  const { separator: e } = n, r = y(t, n), { day: a, month: o } = r, s = M(r.year, n), i = new Date(s, o, a);
  i.setFullYear(s);
  const c = a > 0, u = o > -1, g = !isNaN(i.getTime()), l = t.split(e).filter((h) => h).length > 2, D = s.toString().length > 0;
  return c && u && g && l && D ? i : null;
}
function M(t, n) {
  return f(t, n, "read");
}
function I(t, n) {
  return f(t, n, "write");
}
function f(t, n, e) {
  if (n["default-calendar"] !== "buddhist")
    return t;
  const a = 543 * (e === "read" ? -1 : 1);
  return t + a;
}
function F(t, n) {
  const { separator: e, unitOrder: r } = n, a = S(r), o = t.split(e).map((u) => d.delocalize(u)), s = o[a.indexOf("d")], i = o[a.indexOf("m")], c = o[a.indexOf("y")];
  return { day: s, month: i, year: c };
}
function x(t) {
  if (t instanceof Date) {
    const n = String(t.getMonth() + 1).padStart(2, "0"), e = String(t.getDate()).padStart(2, "0");
    return `${String(t.getFullYear()).padStart(4, "0")}-${n}-${e}`;
  }
  return "";
}
function E(t) {
  const n = t.split("-");
  return { day: n[2], month: n[1], year: n[0] };
}
function v(t, n) {
  return t instanceof Date && n instanceof Date && t.getDate() === n.getDate() && t.getMonth() === n.getMonth() && t.getFullYear() === n.getFullYear();
}
function A(t) {
  const n = t.getMonth(), e = new Date(t);
  return e.setMonth(n - 1), n === e.getMonth() ? new Date(t.getFullYear(), n, 0) : e;
}
function C(t, n) {
  const e = new Date(t);
  return e.setMonth(n), e;
}
function L(t, n, e) {
  const r = new Date(t);
  return r.setDate(1), m(r, n, e) ? r : p(r, n, e);
}
function N(t) {
  const n = t.getMonth(), e = new Date(t);
  return e.setMonth(n + 1), (n + 2) % 7 === e.getMonth() % 7 ? new Date(t.getFullYear(), n + 2, 0) : e;
}
function y(t, n) {
  const { day: e, month: r, year: a } = F(t, n);
  return {
    day: parseInt(e),
    month: parseInt(r) - 1,
    // this subtracts by 1 because the month in the Date constructor is zero-based https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
    year: parseInt(a)
  };
}
function S(t) {
  const n = ["d", "m", "y"], e = t.toLowerCase();
  return n.sort((r, a) => e.indexOf(r) - e.indexOf(a));
}
function R(t, n) {
  const e = t.getTime(), r = n.getTime();
  return (e - r) / (1e3 * 3600 * 24);
}
function T(t) {
  return t.setHours(23, 59, 59, 999), t;
}
function _(t, n) {
  return t && n && t.getMonth() === n.getMonth() && t.getFullYear() === n.getFullYear();
}
export {
  x as a,
  p as b,
  L as c,
  O as d,
  M as e,
  I as f,
  R as g,
  _ as h,
  m as i,
  C as j,
  S as k,
  E as l,
  F as m,
  N as n,
  w as o,
  A as p,
  v as s
};
