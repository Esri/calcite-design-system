import { m as a } from "./index2.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const s = () => a((c, n) => {
  const e = /* @__PURE__ */ new Set();
  return n.onDisconnected(() => {
    e.forEach((r) => r.cancel());
  }), {
    add: (r) => {
      [r].flat().forEach((o) => e.add(o));
    },
    resources: e
  };
});
export {
  s as u
};
