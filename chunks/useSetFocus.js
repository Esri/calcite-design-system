import { m as f } from "./index2.js";
import { c as g } from "./component.js";
import { g as v, f as C } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const L = () => f((e, n) => {
  let t;
  function r() {
    t?.abort();
  }
  return n.onLoad(() => {
    e.listen("focus", () => {
      t = new AbortController(), e.el.addEventListener("focusout", r, { signal: t.signal });
    });
  }), n.onDisconnected(() => {
    e.el.removeEventListener("focusout", r);
  }), async (s, a) => {
    if (e.disabled)
      return;
    const o = E(s());
    if (!o)
      return;
    const { target: u, includeContainer: l, strategy: c } = o, i = v(e.el), d = i.activeElement;
    if (await g(e), !(d !== i.activeElement || t && !t?.signal.aborted))
      return e.el.removeEventListener("focus", r), C(u, l, c, e.el, a);
  };
});
function m(e) {
  return "target" in e && ("includeContainer" in e || "strategy" in e);
}
function E(e) {
  if (e)
    return m(e) ? e : { target: e };
}
export {
  L as u
};
