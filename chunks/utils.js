import "./index.js";
import { n as a } from "./dom.js";
import { A as r, C as c, a as s } from "./resources2.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function b(e) {
  const o = e.parentElement?.closest(r), t = o?.parentElement?.closest(r);
  return [o, t].filter((n) => n);
}
function d(e) {
  return e.ancestors?.filter((o) => o.nodeName === "CALCITE-COMBOBOX-ITEM") || [];
}
function f(e) {
  return a(e.querySelectorAll("calcite-combobox-item"));
}
function p(e) {
  return a(e.querySelectorAll("calcite-combobox-item")).filter((t) => t.selected).length > 0;
}
function g(e) {
  const o = document.evaluate(
    "ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",
    e,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  ), t = o.snapshotLength;
  if (t > 0 && e.nodeName === c) {
    for (let n = 0; n < t; n++)
      if (o.snapshotItem(n).nodeName === s)
        return t;
  } else if (e.nodeName === s)
    return t;
  return t + 1;
}
function h(e) {
  return e.includes("single");
}
function A(e) {
  return e.shortHeading || e.heading || e.textLabel;
}
export {
  d as a,
  f as b,
  b as c,
  g as d,
  A as g,
  p as h,
  h as i
};
