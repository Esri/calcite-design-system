/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as n } from "./index2.js";
const d = (e) => n((t, i) => {
  let a = !1;
  i.onConnected(() => {
    a && o(!0);
  });
  async function o(s) {
    await t.componentOnReady();
    const r = typeof e.target == "function" ? e.target() : e.target.value;
    if (!r || !r.hasAttribute("popover"))
      return;
    if (e.disabledOverride?.() || "topLayerDisabled" in t && t.topLayerDisabled === !0 || !s) {
      a = !1, r.hidePopover();
      return;
    }
    a = !0, r.showPopover();
  }
  return {
    show: async () => {
      await o(!0);
    },
    hide: async () => {
      await o(!1);
    }
  };
});
export {
  d as u
};
