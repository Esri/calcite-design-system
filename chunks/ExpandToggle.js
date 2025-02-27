import { n as b } from "./ref.js";
import { E as C, x as T } from "./iframe.js";
import { g as q } from "./dom.js";
import { S as a } from "./resources.js";
import { S as L } from "./resources2.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
const I = 2, g = (t) => t.reduce((o, e) => o + e, 0) / t.length, D = (t) => {
  const o = t.filter((n) => n.slot !== a.menuActions), e = o?.length;
  return {
    actionWidth: e ? g(o.map((n) => n.clientWidth || 0)) : 0,
    actionHeight: e ? g(o.map((n) => n.clientHeight || 0)) : 0
  };
}, N = ({
  width: t,
  actionWidth: o,
  layout: e,
  height: n,
  actionHeight: i,
  groupCount: r
}) => {
  const c = e === "horizontal" ? t : n, s = e === "horizontal" ? o : i;
  return Math.floor((c - r * I) / s);
}, H = ({
  layout: t,
  actionCount: o,
  actionWidth: e,
  width: n,
  actionHeight: i,
  height: r,
  groupCount: c
}) => Math.max(o - N({ width: n, actionWidth: e, layout: t, height: r, actionHeight: i, groupCount: c }), 0), A = (t) => Array.from(t.querySelectorAll("calcite-action")).filter(
  (o) => o.closest("calcite-action-menu") ? o.slot === L.trigger : !0
), k = ({
  actionGroups: t,
  expanded: o,
  overflowCount: e
}) => {
  let n = e;
  t.reverse().forEach((i) => {
    let r = 0;
    const c = A(i).reverse();
    c.forEach((s) => {
      s.slot === a.menuActions && (s.removeAttribute("slot"), s.textEnabled = o);
    }), n > 0 && c.some((s) => (c.filter((f) => !f.slot).length > 1 && c.length > 2 && !s.closest("calcite-action-menu") && (s.textEnabled = !0, s.setAttribute("slot", a.menuActions), r++, r > 1 && n--), n < 1)), i.manager.component.requestUpdate();
  });
}, v = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function O(t, o) {
  return t || o.closest("calcite-shell-panel")?.position || "start";
}
function B({ el: t, expanded: o }) {
  A(t).filter((e) => e.slot !== a.menuActions).forEach((e) => e.textEnabled = o), t.querySelectorAll("calcite-action-group, calcite-action-menu").forEach((e) => e.expanded = o);
}
const P = ({ tooltip: t, referenceElement: o, expanded: e, ref: n }) => (t && (t.referenceElement = !e && o ? o : null), n && n(o), o), G = ({ expanded: t, expandText: o, collapseText: e, expandLabel: n, collapseLabel: i, toggle: r, el: c, position: s, tooltip: u, ref: f, scale: x }) => {
  const d = q(c) === "rtl", h = t ? e : o, S = t ? i : n, l = [v.chevronsLeft, v.chevronsRight];
  d && l.reverse();
  const m = O(s, c) === "end", E = m ? l[1] : l[0], p = m ? l[0] : l[1];
  return T`<calcite-action .icon=${t ? E : p} id=expand-toggle .label=${S} @click=${r} .scale=${x} .text=${h} .textEnabled=${t} title=${(!t && !u ? h : null) ?? C} ${b(($) => P({ tooltip: u, referenceElement: $, expanded: t, ref: f }))}></calcite-action>`;
};
export {
  G as E,
  H as a,
  D as g,
  k as o,
  A as q,
  B as t
};
