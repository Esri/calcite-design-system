import { c as l } from "./iframe.js";
import { c as p, a as v } from "./focusTrapComponent.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
function n(a, { focusTrapOptions: e }, i) {
  return !e?.extraContainers && !i ? a : [a, ...o(e?.extraContainers), ...o(i)];
}
function o(a = []) {
  return Array.isArray(a) ? a : [a];
}
const E = (a) => l((e, i) => {
  let t, u, c;
  const d = a.focusTrapOptions;
  i.onConnected(() => {
    e[a.triggerProp] && t && s.activate();
  }), i.onUpdate((r) => {
    e.hasUpdated && r.has("focusTrapDisabled") && (e.focusTrapDisabled ? s.deactivate() : s.activate());
  }), i.onDisconnected(() => s.deactivate());
  const s = {
    activate: () => {
      const r = u || e.el;
      if (r.isConnected) {
        if (!t) {
          const f = {
            ...d,
            ...e.focusTrapOptions
          };
          c ||= n(r, e), t = p(c, v(r, f));
        }
        (typeof e.focusTrapDisabledOverride == "function" ? !e.focusTrapDisabledOverride() : !e.focusTrapDisabled) && t.activate();
      }
    },
    deactivate: () => t?.deactivate(),
    overrideFocusTrapEl: (r) => {
      if (t)
        throw new Error("Focus trap already created");
      u = r;
    },
    setExtraContainers: (r) => {
      const f = u || e.el;
      c = n(f, e, r);
    },
    updateContainerElements: () => t?.updateContainerElements(c)
  };
  return s;
});
export {
  E as u
};
