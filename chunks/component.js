import { l as n } from "./logger.js";
import { i as t } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
function o(i) {
  return i === "l" ? "m" : "s";
}
function u(i, r, e) {
  !i[r] && !i[e] && n.warn(`[${i.el.localName}] "${r.toString()}" or "${e.toString()}" is required.`);
}
function f(i) {
  return i.hidden || i.itemHidden;
}
async function m(i) {
  if (await i.componentOnReady(), !!t())
    return i.requestUpdate(), new Promise((r) => requestAnimationFrame(() => r()));
}
export {
  m as c,
  o as g,
  f as i,
  u as w
};
