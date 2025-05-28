import { n as x } from "./ref.js";
import { E as p, x as T } from "./iframe.js";
import { g as q } from "./dom.js";
import { S as f } from "./resources.js";
import { S as C } from "./resources2.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const v = (t) => Array.from(t.querySelectorAll("calcite-action")).filter(
  (e) => e.closest("calcite-action-menu") ? e.slot === C.trigger : !0
), D = ({
  actionGroups: t,
  expanded: e,
  overflowCount: o
}) => {
  let c = o;
  t.reverse().forEach((i) => {
    let r = 0;
    const s = v(i).reverse();
    s.forEach((n) => {
      n.slot === f.menuActions && (n.removeAttribute("slot"), n.textEnabled = e);
    }), c > 0 && s.some((n) => (s.filter((u) => !u.slot).length > 1 && s.length > 2 && !n.closest("calcite-action-menu") && (n.textEnabled = !0, n.setAttribute("slot", f.menuActions), r++, r > 1 && c--), c < 1)), i.manager.component.requestUpdate();
  });
}, g = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function y(t, e) {
  return t || e.closest("calcite-shell-panel")?.position || "start";
}
function G({ el: t, expanded: e }) {
  v(t).filter((o) => o.slot !== f.menuActions).forEach((o) => o.textEnabled = e), t.querySelectorAll("calcite-action-group, calcite-action-menu").forEach((o) => o.expanded = e);
}
const L = ({ tooltip: t, referenceElement: e, expanded: o, ref: c }) => (t && (t.referenceElement = !o && e ? e : null), c && c(e), e), P = ({ expanded: t, expandText: e, collapseText: o, expandLabel: c, collapseLabel: i, toggle: r, el: s, position: n, tooltip: a, ref: u, scale: A }) => {
  const E = q(s) === "rtl", m = t ? o : e, S = t ? i : c, l = [g.chevronsLeft, g.chevronsRight];
  E && l.reverse();
  const h = y(n, s) === "end", $ = h ? l[1] : l[0], b = h ? l[0] : l[1];
  return T`<calcite-action .icon=${t ? $ : b} id=expand-toggle .label=${S} @click=${r} .scale=${A} .text=${m} .textEnabled=${t} title=${(!t && !a ? m : null) ?? p} ${x((d) => L({ tooltip: a, referenceElement: d, expanded: t, ref: u }))}></calcite-action>`;
};
export {
  P as E,
  D as o,
  v as q,
  G as t
};
