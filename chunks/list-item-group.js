/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as s, L as l, c as a, s as t, b as n, d as r } from "./index.js";
import { M as o, c as i } from "./resources35.js";
import { u as d } from "./useInteractive.js";
const h = s`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}:host([filter-hidden]){display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{margin:0;display:flex;flex:1 1 0%;position:sticky;inset-block-start:var(--calcite-internal-filter-enabled-offset, 0);z-index:var(--calcite-z-index-sticky);background-color:var(--calcite-list-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));color:var(--calcite-list-color, var(--calcite-color-text-1))}.heading{font-weight:var(--calcite-font-weight-bold)}:host([scale=s]) .container{padding-inline:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .heading{font-size:var(--calcite-font-size-sm);line-height:var(--calcite-font-line-height-fixed-base);padding-block:var(--calcite-theme-space-sm, var(--calcite-spacing-sm)) var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=s]:not(:first-child)) .container{padding-block-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .container{padding-inline:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=m]) .heading{font-size:var(--calcite-font-size);line-height:var(--calcite-font-line-height-fixed-base);padding-block:var(--calcite-theme-space-lg, var(--calcite-spacing-lg)) var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]:not(:first-child)) .container{padding-block-start:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .container{padding-inline:var(--calcite-theme-space-lg, var(--calcite-spacing-lg))}:host([scale=l]) .heading{font-size:var(--calcite-font-size-md);line-height:var(--calcite-font-line-height-fixed-lg);padding-block:var(--calcite-theme-space-xl, var(--calcite-spacing-xl)) var(--calcite-theme-space-sm-plus, var(--calcite-spacing-sm-plus, .625rem))}:host([scale=l]:not(:first-child)) .container{padding-block-start:var(--calcite-theme-space-md-plus, var(--calcite-spacing-md-plus, .875rem))}.heading{padding:0}:host([hidden]){display:none}[hidden]{display:none}`;
class p extends l {
  constructor() {
    super(...arguments), this.interactiveContainer = d(this), this.disabled = !1, this.filterHidden = !1, this.scale = "m", this.calciteInternalListItemGroupChange = a({ cancelable: !1 }), this.calciteInternalListItemGroupDefaultSlotChange = a({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, filterHidden: 7, heading: 3, scale: 3 };
  }
  static {
    this.styles = h;
  }
  willUpdate(e) {
    e.has("heading") && this.calciteInternalListItemGroupChange.emit();
  }
  handleDefaultSlotChange() {
    this.calciteInternalListItemGroupDefaultSlotChange.emit();
  }
  render() {
    const { disabled: e, heading: c } = this;
    return this.interactiveContainer({ disabled: e, children: n`<div class=${t(i.container)} role=row><div .ariaColSpan=${o} class=${t(i.heading)} role=cell>${c}</div></div><slot @slotchange=${this.handleDefaultSlotChange}></slot>` });
  }
}
r("calcite-list-item-group", p);
export {
  p as ListItemGroup
};
