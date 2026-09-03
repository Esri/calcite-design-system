/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { w as r } from "./dom.js";
function a(i) {
  return s(i) ? i[i.openProp] : i.open;
}
function s(i) {
  return i.openProp !== void 0;
}
async function f(i) {
  await i.updateComplete, a(i) ? i.onBeforeOpen() : i.onBeforeClose(), await i.updateComplete;
  const e = i.transitionRef?.value ?? i.transitionEl;
  e && await r(e, i.transitionProp), a(i) ? i.onOpen() : i.onClose();
}
export {
  f as t
};
