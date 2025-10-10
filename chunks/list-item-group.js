import { b as c, L as s, c as l, s as e, x as n, q as o } from "./index.js";
import { u as r, I as d } from "./interactive.js";
import { M as h } from "./resources13.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const a = {
  container: "container",
  heading: "heading"
}, g = c`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}:host([filter-hidden]){display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{margin:0;display:flex;flex:1 1 0%;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1));color:var(--calcite-list-color, var(--calcite-color-text-1))}.heading{font-weight:var(--calcite-font-weight-bold)}:host([scale=s]) .container{padding-inline:var(--calcite-spacing-sm)}:host([scale=s]) .heading{font-size:var(--calcite-font-size-sm);line-height:var(--calcite-font-line-height-fixed-base);padding-block:var(--calcite-spacing-sm) var(--calcite-spacing-xxs)}:host([scale=s]:not(:first-child)) .container{padding-block-start:var(--calcite-spacing-sm)}:host([scale=m]) .container{padding-inline:var(--calcite-spacing-md)}:host([scale=m]) .heading{font-size:var(--calcite-font-size);line-height:var(--calcite-font-line-height-fixed-base);padding-block:var(--calcite-spacing-lg) var(--calcite-spacing-sm)}:host([scale=m]:not(:first-child)) .container{padding-block-start:var(--calcite-spacing-md)}:host([scale=l]) .container{padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .heading{font-size:var(--calcite-font-size-md);line-height:var(--calcite-font-line-height-fixed-lg);padding-block:var(--calcite-spacing-xl) var(--calcite-spacing-sm-plus, .625rem)}:host([scale=l]:not(:first-child)) .container{padding-block-start:var(--calcite-spacing-md-plus, .875rem)}.heading{padding:0}:host([hidden]){display:none}[hidden]{display:none}`;
class p extends s {
  constructor() {
    super(...arguments), this.disabled = !1, this.filterHidden = !1, this.scale = "m", this.calciteInternalListItemGroupDefaultSlotChange = l({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, filterHidden: 7, heading: 3, scale: 3 };
  }
  static {
    this.styles = g;
  }
  updated() {
    r(this);
  }
  handleDefaultSlotChange() {
    this.calciteInternalListItemGroupDefaultSlotChange.emit();
  }
  render() {
    const { disabled: t, heading: i } = this;
    return d({ disabled: t, children: n`<div class=${e(a.container)} role=row><div .ariaColSpan=${h} class=${e(a.heading)} role=cell>${i}</div></div><slot @slotchange=${this.handleDefaultSlotChange}></slot>` });
  }
}
o("calcite-list-item-group", p);
export {
  p as ListItemGroup
};
