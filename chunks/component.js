import { l as t } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function r(i) {
  return i === "l" ? "m" : "s";
}
function o(i, n, a) {
  !i[n] && !i[a] && t.warn(`[${i.el.localName}] "${n.toString()}" or "${a.toString()}" is required.`);
}
function s(i) {
  return i.hidden || i.itemHidden;
}
async function u(i) {
  await i.componentOnReady(), await i.updateComplete;
}
export {
  u as c,
  r as g,
  s as i,
  o as w
};
