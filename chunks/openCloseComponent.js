import { w as a } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.1-next.1 */
function e(i) {
  return i[i.openProp || "open"];
}
async function s(i) {
  await i.updateComplete, e(i) ? i.onBeforeOpen() : i.onBeforeClose(), await i.updateComplete, i.transitionEl && await a(i.transitionEl, i.transitionProp), e(i) ? i.onOpen() : i.onClose();
}
export {
  s as t
};
