import { w as r } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
function e(i) {
  return i[i.openProp || "open"];
}
async function a(i) {
  e(i) ? i.onBeforeOpen() : i.onBeforeClose(), await i.updateComplete, i.transitionEl && await r(i.transitionEl, i.transitionProp), e(i) ? i.onOpen() : i.onClose();
}
export {
  a as t
};
