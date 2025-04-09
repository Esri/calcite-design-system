import "./iframe.js";
import { l as r } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
function s(i) {
  return i === "l" ? "m" : "s";
}
function o(i, n, e) {
  !i[n] && !i[e] && r.warn(`[${i.el.localName}] "${n.toString()}" or "${e.toString()}" is required.`);
}
function u(i) {
  return i.hidden || i.itemHidden;
}
async function c(i) {
  return await i.componentOnReady(), i.requestUpdate(), new Promise((n) => requestAnimationFrame(() => n()));
}
export {
  c,
  s as g,
  u as i,
  o as w
};
