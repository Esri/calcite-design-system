import { i as r } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
const c = "calcite-list", o = "calcite-list-item-group", i = "calcite-list-item";
function a(e) {
  const t = e.parentElement?.closest(i);
  t && (t.open = !0, a(t));
}
function f(e) {
  const t = e.assignedElements({ flatten: !0 }), s = t.filter((n) => n?.matches(o)).map((n) => Array.from(n.querySelectorAll(i))).flat(), l = t.filter((n) => n?.matches(i));
  return {
    lists: t.filter((n) => n?.matches(c)),
    items: s.concat(l)
  };
}
function h(e) {
  const t = e.assignedElements({ flatten: !0 }).filter((s) => s.matches(i));
  t.forEach((s) => {
    s.setPosition = t.indexOf(s) + 1, s.setSize = t.length;
  });
}
function p(e, t = !1) {
  if (!r())
    return 0;
  const s = t ? "ancestor::calcite-list-item | ancestor::calcite-list-item-group" : "ancestor::calcite-list-item";
  return document.evaluate(s, e, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;
}
function d(e) {
  return e.tagName === "CALCITE-LIST-ITEM";
}
export {
  f as a,
  i as b,
  o as c,
  p as g,
  d as i,
  c as l,
  a as o,
  h as u
};
