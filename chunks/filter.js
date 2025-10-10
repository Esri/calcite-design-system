import { e as p } from "./escapeRegExp.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function d(e) {
  return e;
}
function y(e, t = d) {
  if (e == null)
    return e;
  for (const n in e)
    if (t(e[n], n, e) === !1)
      break;
  return e;
}
const m = (e, t, n) => {
  const s = p(t), c = new RegExp(s, "i");
  if (e.length === 0 && console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`), t === "")
    return e;
  const u = (f, o, l) => {
    if (f?.filterDisabled)
      return !0;
    let i = !1;
    return y(f, (r, a) => {
      typeof r == "function" || r == null || l && !l.includes(a) || (Array.isArray(r) || typeof r == "object" && r !== null ? u(r, o) && (i = !0) : o.test(r) && (i = !0));
    }), i;
  };
  return e.filter((f) => u(f, c, n));
};
export {
  m as f
};
