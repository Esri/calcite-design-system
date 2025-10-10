import { n as x } from "./ref.js";
import { E as T, x as p } from "./index.js";
import { a as q } from "./dom.js";
import { S as f } from "./resources.js";
import { S as C } from "./resources3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const v = (t) => Array.from(t.querySelectorAll("calcite-action")).filter(
  (o) => o.closest("calcite-action-menu") ? o.slot === C.trigger : !0
), D = ({
  actionGroups: t,
  expanded: o,
  overflowCount: e
}) => {
  let c = e;
  t.reverse().forEach((i) => {
    let r = 0;
    const s = v(i).reverse();
    s.forEach((n) => {
      n.slot === f.menuActions && (n.removeAttribute("slot"), n.textEnabled = o);
    }), c > 0 && s.some((n) => (s.filter((u) => !u.slot).length > 1 && s.length > 2 && !n.closest("calcite-action-menu") && (n.textEnabled = !0, n.setAttribute("slot", f.menuActions), r++, r > 1 && c--), c < 1)), i.manager.component.requestUpdate();
  });
}, g = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function y(t, o) {
  return t || o.closest("calcite-shell-panel")?.position || "start";
}
function G({ el: t, expanded: o }) {
  v(t).filter((e) => e.slot !== f.menuActions).forEach((e) => e.textEnabled = o), t.querySelectorAll("calcite-action-group, calcite-action-menu").forEach((e) => e.expanded = o);
}
const L = ({ tooltip: t, referenceElement: o, expanded: e, ref: c }) => (t && (t.referenceElement = !e && o ? o : null), c && c(o), o), P = ({ expanded: t, expandText: o, collapseText: e, expandLabel: c, collapseLabel: i, toggle: r, el: s, position: n, tooltip: a, ref: u, scale: A }) => {
  const E = q(s) === "rtl", m = t ? e : o, S = t ? i : c, l = [g.chevronsLeft, g.chevronsRight];
  E && l.reverse();
  const h = y(n, s) === "end", $ = h ? l[1] : l[0], b = h ? l[0] : l[1];
  return p`<calcite-action .aria=${{ expanded: t }} .icon=${t ? $ : b} id=expand-toggle .label=${S} @click=${r} .scale=${A} .text=${m} .textEnabled=${t} title=${(!t && !a ? m : null) ?? T} ${x((d) => L({ tooltip: a, referenceElement: d, expanded: t, ref: u }))}></calcite-action>`;
};
export {
  P as E,
  D as o,
  v as q,
  G as t
};
