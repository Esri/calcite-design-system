import { d } from "./iframe.js";
import { c as l, a as p } from "./focusTrapComponent.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
function u(r, { focusTrapOptions: e }, i) {
  return !e?.extraContainers && !i ? r : [r, ...n(e?.extraContainers), ...n(i)];
}
function n(r = []) {
  return Array.isArray(r) ? r : [r];
}
const C = (r) => d((e, i) => {
  let t, c;
  const o = r.focusTrapOptions;
  return i.onConnected(() => {
    e[r.triggerProp] && t && t.activate();
  }), i.onDisconnected(() => t?.deactivate()), {
    activate: (a) => {
      const s = c || e.el;
      if (s.isConnected) {
        if (!t) {
          const f = {
            ...o,
            ...e.focusTrapOptions
          };
          t = l(
            u(s, e),
            p(s, f)
          );
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
    updateContainerElements: (a) => {
      const s = c || e.el;
      return t?.updateContainerElements(u(s, e, a));
    }
  };
});
export {
  C as u
};
