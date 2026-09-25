/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as a } from "./index2.js";
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
