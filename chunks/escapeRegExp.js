import { a as u, S as i } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
function y(r, e) {
  for (var n = -1, t = r == null ? 0 : r.length, o = Array(t); ++n < t; )
    o[n] = e(r[n], n, r);
  return o;
}
var c = Array.isArray, f = i ? i.prototype : void 0, p = f ? f.toString : void 0;
function s(r) {
  if (typeof r == "string")
    return r;
  if (c(r))
    return y(r, s) + "";
  if (u(r))
    return p ? p.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -1 / 0 ? "-0" : e;
}
function l(r) {
  return r == null ? "" : s(r);
}
var a = /[\\^$.*+?()[\]{}|]/g, g = RegExp(a.source);
function m(r) {
  return r = l(r), r && g.test(r) ? r.replace(a, "\\$&") : r;
}
export {
  m as e,
  c as i
};
