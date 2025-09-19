import { e as d } from "./escapeRegExp.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.1-next.1 */
function p(e) {
  return e;
}
function y(e, f = p) {
  if (e == null)
    return e;
  for (const n in e)
    if (f(e[n], n, e) === !1)
      break;
  return e;
}
const h = (e, f, n) => {
  const i = d(f), l = new RegExp(i, "i");
  e.length === 0 && console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
  const u = (t, o, a) => {
    if (t?.constant || t?.filterDisabled)
      return !0;
    let s = !1;
    return y(t, (r, c) => {
      typeof r == "function" || r == null || a && !a.includes(c) || (Array.isArray(r) || typeof r == "object" && r !== null ? u(r, o) && (s = !0) : o.test(r) && (s = !0));
    }), s;
  };
  return e.filter((t) => u(t, l, n));
};
export {
  h as f
};
