/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import "./index.js";
function t(n) {
  return n === "l" ? "m" : "s";
}
function a(n) {
  return n.hidden !== !1 || n.itemHidden;
}
async function i(n) {
  await n.componentOnReady(), await n.updateComplete;
}
export {
  i as c,
  t as g,
  a as i
};
