/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import "./index.js";
import { i as c } from "./resources2.js";
import { i as l, a } from "./resources35.js";
const h = {
  container: "container",
  table: "table",
  scrim: "scrim",
  stack: "stack",
  tableContainer: "table-container",
  sticky: "sticky-pos",
  assistiveText: "assistive-text",
  containerHeight: "container-height"
}, g = {
  emptyContent: "empty-content",
  filterNoResults: "filter-no-results",
  filterActionsStart: "filter-actions-start",
  filterActionsEnd: "filter-actions-end"
}, m = c("calcite-list"), S = "calcite-list", C = "calcite-list-item-group", r = "calcite-list-item";
function f(s) {
  const t = s.parentElement?.closest(r);
  t && (t.open = !0, f(t));
}
function E(s) {
  const t = s.assignedElements({ flatten: !0 }), i = t.filter(a).map((o) => Array.from(o.querySelectorAll(r))).flat(), e = t.filter(l);
  return {
    lists: t.filter(m),
    items: i.concat(e)
  };
}
function L(s) {
  const t = s.assignedElements({ flatten: !0 }).filter(l), i = t.filter((e) => !e.filterHidden);
  t.forEach((e) => {
    const n = i.indexOf(e);
    e.setPosition = n === -1 ? void 0 : n + 1, e.setSize = n === -1 ? void 0 : i.length;
  });
}
function x(s, t = !1) {
  const i = t ? "ancestor::calcite-list-item | ancestor::calcite-list-item-group" : "ancestor::calcite-list-item";
  return document.evaluate(i, s, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;
}
export {
  h as C,
  g as S,
  S as a,
  C as b,
  E as c,
  f as e,
  x as g,
  r as l,
  L as u
};
