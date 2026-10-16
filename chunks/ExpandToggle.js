/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { n as p } from "./ref.js";
import { A as x, b as y } from "./index.js";
import { S as a } from "./resources3.js";
import { S as C } from "./resources4.js";
const s = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function L(e, c) {
  return c || e.closest("calcite-shell-panel")?.position || "start";
}
function k({ actions: e, expandables: c, expanded: o }) {
  e.filter((t) => t.slot !== a.menuActions).forEach((t) => t.textEnabled = o), c.forEach((t) => t.expanded = o);
}
function B({ el: e, expanded: c }) {
  Array.from(e.querySelectorAll("calcite-action")).filter((o) => o.slot !== a.menuActions && (o.closest("calcite-action-menu") ? o.slot === C.trigger : !0)).forEach((o) => o.textEnabled = c), e.querySelectorAll("calcite-action-group, calcite-action-menu").forEach((o) => o.expanded = c);
}
const d = ({ tooltip: e, referenceElement: c, expanded: o, ref: t }) => (e && (e.referenceElement = !o && c ? c : void 0), t && t(c), c), P = ({ collapseText: e, collapseLabel: c, direction: o, expanded: t, expandText: f, expandLabel: g, toggle: h, el: u, position: m, tooltip: n, ref: $, scale: v }) => {
  const A = o === "rtl", l = t ? e : f, S = t ? c : g, i = [s.chevronsLeft, s.chevronsRight];
  A && i.reverse();
  const r = L(u, m) === "end", E = r ? i[1] : i[0], T = r ? i[0] : i[1];
  return y`<calcite-action .aria=${{ expanded: t }} .icon=${t ? E : T} id=expand-toggle .label=${S} @click=${h} .scale=${v} .text=${l} .textEnabled=${t} title=${(!t && !n ? l : void 0) ?? x} ${p((b) => d({ tooltip: n, referenceElement: b, expanded: t, ref: $ }))}></calcite-action>`;
};
export {
  P as E,
  B as l,
  k as t
};
