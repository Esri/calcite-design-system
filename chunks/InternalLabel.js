import { s as e, E as g, x as t } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const n = {
  alignmentCenter: "internal-label-alignment--center",
  alignmentEnd: "internal-label-alignment--end",
  container: "internal-label--container",
  requiredIndicator: "internal-label-required--indicator",
  spacingBottom: "internal-label-spacing--bottom",
  spacingInlineEnd: "internal-label-spacing-inline--end",
  spacingInlineStart: "internal-label-spacing-inline--start",
  text: "internal-label--text"
}, b = ({ alignmentCenter: a, bottomSpacingDisabled: i, labelText: l, onClick: r, required: s, spacingInlineEnd: c, spacingInlineStart: o, tooltipText: d }) => t`<div class=${e({
  [n.alignmentCenter]: a,
  [n.alignmentEnd]: !a,
  [n.container]: !0,
  [n.spacingBottom]: !i,
  [n.spacingInlineEnd]: c,
  [n.spacingInlineStart]: o
})} @click=${r}><div class=${e(n.text)}>${l}${s && t`<span aria-hidden=true class=${e(n.requiredIndicator)} title=${d ?? g}>*</span>` || ""}</div><slot name=label-content></slot></div>`;
export {
  b as I
};
