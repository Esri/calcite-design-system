import "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const c = "calcite-list", o = "calcite-list-item-group", r = "calcite-list-item";
function a(s) {
  const t = s.parentElement?.closest(r);
  t && (t.open = !0, a(t));
}
function m(s) {
  const t = s.assignedElements({ flatten: !0 }), n = t.filter((i) => i?.matches(o)).map((i) => Array.from(i.querySelectorAll(r))).flat(), e = t.filter((i) => i?.matches(r));
  return {
    lists: t.filter((i) => i?.matches(c)),
    items: n.concat(e)
  };
}
function d(s) {
  const t = s.assignedElements({ flatten: !0 }).filter((e) => e.matches(r)), n = t.filter((e) => !e.filterHidden);
  t.forEach((e) => {
    const l = n.indexOf(e);
    e.setPosition = l === -1 ? void 0 : l + 1, e.setSize = l === -1 ? void 0 : n.length;
  });
}
function f(s, t = !1) {
  const n = t ? "ancestor::calcite-list-item | ancestor::calcite-list-item-group" : "ancestor::calcite-list-item";
  return document.evaluate(n, s, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;
}
function h(s) {
  return s.tagName === "CALCITE-LIST-ITEM";
}
export {
  m as a,
  r as b,
  o as c,
  a as e,
  f as g,
  h as i,
  c as l,
  d as u
};
