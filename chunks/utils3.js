import { i as r } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const c = "calcite-list", a = "calcite-list-item-group", i = "calcite-list-item";
function o(e) {
  const t = e.parentElement?.closest(i);
  t && (t.open = !0, o(t));
}
function f(e) {
  const t = e.assignedElements({ flatten: !0 }), s = t.filter((n) => n?.matches(a)).map((n) => Array.from(n.querySelectorAll(i))).flat(), l = t.filter((n) => n?.matches(i));
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
function d(e, t = !1) {
  if (!r())
    return 0;
  const s = t ? "ancestor::calcite-list-item | ancestor::calcite-list-item-group" : "ancestor::calcite-list-item";
  return document.evaluate(s, e, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;
}
function p(e) {
  return e.tagName === "CALCITE-LIST-ITEM";
}
export {
  f as a,
  i as b,
  a as c,
  o as e,
  d as g,
  p as i,
  c as l,
  h as u
};
