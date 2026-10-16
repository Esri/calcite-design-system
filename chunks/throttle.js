/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { d as u } from "./debounce.js";
function d(o, a, { signal: c, edges: i = ["leading", "trailing"] } = {}) {
  let n = null;
  const t = u(function(...e) {
    n = Date.now(), o.apply(this, e);
  }, a, {
    signal: c,
    edges: i
  }), l = function(...e) {
    if (n == null && (n = Date.now()), Date.now() - n >= a) {
      n = Date.now(), o.apply(this, e), t.cancel(), t.schedule();
      return;
    }
    t.apply(this, e);
  };
  return l.cancel = t.cancel, l.flush = t.flush, l;
}
export {
  d as t
};
