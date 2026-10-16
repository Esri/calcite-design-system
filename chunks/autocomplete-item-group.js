/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as l, L as o, c as r, s as a, b as i, H as n, d as s } from "./index.js";
import { e as p, n as m } from "./ref.js";
import { a as g } from "./dom.js";
import { i as u } from "./resources8.js";
import { C as e } from "./resources9.js";
const h = l`.scale--s{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);--calcite-internal-autocomplete-item-group-horizontal-spacing-unit: var( --calcite-theme-space-sm, var(--calcite-spacing-sm) );--calcite-internal-autocomplete-item-group-vertical-spacing-unit: var( --calcite-theme-space-2xs, var(--calcite-spacing-xxs) )}.scale--s .first-title{padding-block-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}.scale--s .separator{margin-block:var(--calcite-internal-autocomplete-item-group-vertical-spacing-unit);margin-inline:var(--calcite-internal-autocomplete-item-group-horizontal-spacing-unit)}.scale--m{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);--calcite-internal-autocomplete-item-group-horizontal-spacing-unit: var( --calcite-theme-space-md, var(--calcite-spacing-md) );--calcite-internal-autocomplete-item-group-vertical-spacing-unit: var( --calcite-theme-space-xs, var(--calcite-spacing-xs) )}.scale--m .first-title{padding-block-start:var(--calcite-theme-space-md, var(--calcite-spacing-md))}.scale--m .separator{margin-block:var(--calcite-internal-autocomplete-item-group-vertical-spacing-unit);margin-inline:var(--calcite-internal-autocomplete-item-group-horizontal-spacing-unit)}.scale--l{font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);--calcite-internal-autocomplete-item-group-horizontal-spacing-unit: var( --calcite-theme-space-lg, var(--calcite-spacing-lg) );--calcite-internal-autocomplete-item-group-vertical-spacing-unit: var( --calcite-theme-space-sm-plus, var(--calcite-spacing-sm-plus) )}.scale--l .first-title{padding-block-start:var(--calcite-theme-space-xl, var(--calcite-spacing-xl))}.scale--l .separator{margin-block:var(--calcite-internal-autocomplete-item-group-vertical-spacing-unit);margin-inline:var(--calcite-internal-autocomplete-item-group-horizontal-spacing-unit)}:host{margin:0;display:flex;flex-direction:column}.container{display:flex;flex-direction:column;background-color:var(--calcite-autocomplete-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)))}.container--no-spacing{padding-block-start:0}.separator{block-size:var(--calcite-theme-space-px, var(--calcite-spacing-px));background-color:var(--calcite-autocomplete-border-color, var(--calcite-color-border-3))}.heading{box-sizing:border-box;inline-size:100%;min-inline-size:0px;max-inline-size:100%;font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;color:var(--calcite-autocomplete-text-color, var(--calcite-color-text-1));padding-block:var(--calcite-internal-autocomplete-item-group-vertical-spacing-unit);padding-inline:var(--calcite-internal-autocomplete-item-group-horizontal-spacing-unit)}:host([hidden]){display:none}[hidden]{display:none}`, d = "calcite-autocomplete-item";
class v extends o {
  constructor() {
    super(...arguments), this.defaultSlotRef = p(), this._items = [], this.disableSpacing = !1, this.position = 0, this.scale = "m", this.calciteInternalAutocompleteItemGroupItemsChange = r({ cancelable: !1 });
  }
  static {
    this.properties = { disableSpacing: 5, heading: 1, label: 1, position: 9, scale: 1, items: 32 };
  }
  static {
    this.styles = h;
  }
  get items() {
    return this._items;
  }
  loaded() {
    this.updateItems();
  }
  handleDefaultSlotChange() {
    this.updateItems();
  }
  updateItems() {
    const t = this.defaultSlotRef.value ? g(this.defaultSlotRef.value, d) : Array.from(this.el.children).filter(u);
    this._items = t, this.calciteInternalAutocompleteItemGroupItemsChange.emit();
  }
  render() {
    const { scale: t } = this, c = this.position > 0 ? i`<div class=${a(e.separator)} role=separator></div>` : null;
    return i`<div aria-label=${this.label ?? this.heading ?? n} class=${a({
      [e.container]: !0,
      [e.containerNoSpacing]: this.disableSpacing,
      [e.scale(t)]: !0
    })} role=group>${c}<div class=${a({ [e.heading]: !0, [e.firstTitle]: this.position === 0 })}>${this.heading}</div><slot @slotchange=${this.handleDefaultSlotChange} ${m(this.defaultSlotRef)}></slot></div>`;
  }
}
s("calcite-autocomplete-item-group", v);
export {
  v as AutocompleteItemGroup
};
