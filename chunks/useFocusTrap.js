import { d as l } from "./iframe.js";
import { c as p, a as v } from "./focusTrapComponent.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
function o(r, { focusTrapOptions: e }, i) {
  return !e?.extraContainers && !i ? r : [r, ...u(e?.extraContainers), ...u(i)];
}
function u(r = []) {
  return Array.isArray(r) ? r : [r];
}
const E = (r) => l((e, i) => {
  let t, c, n;
  const f = r.focusTrapOptions;
  return i.onConnected(() => {
    e[r.triggerProp] && t && t.activate();
  }), i.onDisconnected(() => t?.deactivate()), {
    activate: (a) => {
      const s = c || e.el;
      if (s.isConnected) {
        if (!t) {
          const d = {
            ...f,
            ...e.focusTrapOptions
          };
          n ||= o(s, e), t = p(n, v(s, d));
        }
        (typeof e.focusTrapDisabledOverride == "function" ? !e.focusTrapDisabledOverride() : !e.focusTrapDisabled) && t.activate(a);
      }
    },
    deactivate: (a) => t?.deactivate(a),
    overrideFocusTrapEl: (a) => {
      if (t)
        throw new Error("Focus trap already created");
      c = a;
    },
    setExtraContainers: (a) => {
      const s = c || e.el;
      n = o(s, e, a);
    },
    updateContainerElements: () => t?.updateContainerElements(n)
  };
});
export {
  E as u
};
