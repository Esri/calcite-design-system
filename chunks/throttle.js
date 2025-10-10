import { d as u } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function f(o, l, { signal: c, edges: a = ["leading", "trailing"] } = {}) {
  let n = null;
  const e = u(o, l, { signal: c, edges: a }), t = function(...i) {
    n == null ? n = Date.now() : Date.now() - n >= l && (n = Date.now(), e.cancel()), e(...i);
  };
  return t.cancel = e.cancel, t.flush = e.flush, t;
}
export {
  f as t
};
