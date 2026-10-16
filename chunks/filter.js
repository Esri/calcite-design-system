/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { e as y } from "./escapeRegExp.js";
function g(e) {
  return e;
}
function m(e, n = g) {
  if (e == null) return e;
  for (const t in e) if (n(e[t], t, e) === !1) break;
  return e;
}
const d = (e, n, t) => {
  const o = y(n), c = new RegExp(o, "i");
  if (n === "" || e.length === 0)
    return e;
  const u = (f, s, l) => {
    if (f?.filterDisabled)
      return !0;
    let i = !1;
    return m(f, (r, p) => {
      typeof r == "function" || r == null || l && !l.includes(p) || (Array.isArray(r) || typeof r == "object" && r !== null ? u(r, s) && (i = !0) : s.test(r) && (i = !0));
    }), i;
  };
  return e.filter((f) => u(f, c, t));
};
export {
  d as f
};
