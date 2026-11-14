/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { m } from "./index2.js";
import { c as g } from "./component.js";
import { g as h, a as s, f as F } from "./dom.js";
const L = () => m((e, i) => {
  let o;
  function r() {
    o?.abort();
  }
  i.onLoad(() => {
    e.listen("focus", () => {
      o = new AbortController(), e.el.addEventListener("focusout", r, { signal: o.signal });
    });
  }), i.onDisconnected(() => {
    e.el.removeEventListener("focusout", r);
  });
  async function u(n, t) {
    if (e.disabled)
      return;
    const c = C(n());
    if (!c)
      return;
    const { target: d, includeContainer: f, strategy: v } = c, l = s(e.el), E = l.activeElement;
    if (await g(e), !(E !== l.activeElement || o && !o?.signal.aborted))
      return e.el.removeEventListener("focus", r), F(d, f, v, e.el, t);
  }
  const a = {
    getDeepActiveElement() {
      let t = s(e.el).activeElement ?? e.el.ownerDocument.activeElement;
      for (; t?.shadowRoot?.activeElement; )
        t = t.shadowRoot.activeElement;
      return t;
    },
    getFocusableElements: h,
    get hasFocus() {
      return e.el.matches(":focus-within");
    },
    isFocusUnchanged(n) {
      return a.getDeepActiveElement() === n;
    },
    isFocusedWithin(n) {
      const t = s(n).activeElement;
      return n.contains(t);
    },
    setFocus: u
  };
  return a;
});
function b(e) {
  return "target" in e && ("includeContainer" in e || "strategy" in e);
}
function C(e) {
  if (e)
    return b(e) ? e : { target: e };
}
export {
  L as u
};
