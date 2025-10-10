import { b as o, L as r, c as l, s as t, x as i, q as c } from "./index.js";
import { c as n } from "./observers.js";
import { C as d } from "./resources9.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const s = {
  title: "title",
  firstTitle: "first-title",
  separator: "separator"
}, p = o`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block}.container{text-align:start}.title{margin-block-end:-1px;display:block;cursor:default;overflow-wrap:break-word;border-width:0px;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-dropdown-group-title-text-color, var(--calcite-color-text-1))}.separator{display:block;block-size:1px;background-color:var(--calcite-dropdown-group-border-color, var(--calcite-color-border-3))}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .title{padding-block:var(--calcite-spacing-xxs);padding-inline:var(--calcite-spacing-sm)}:host([scale=s]) .first-title{padding-block-start:var(--calcite-spacing-sm)}:host([scale=s]) .separator{margin-block:var(--calcite-spacing-xxs);margin-inline:var(--calcite-spacing-sm)}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .title{padding-block:var(--calcite-spacing-sm);padding-inline:var(--calcite-spacing-md)}:host([scale=m]) .first-title{padding-block-start:var(--calcite-spacing-lg)}:host([scale=m]) .separator{margin-block:var(--calcite-spacing-sm);margin-inline:var(--calcite-spacing-md)}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .title{padding-block:var(--calcite-spacing-sm-plus);padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .first-title{padding-block-start:var(--calcite-spacing-xl)}:host([scale=l]) .separator{margin-block:var(--calcite-spacing-sm-plus);margin-inline:var(--calcite-spacing-lg)}:host([hidden]){display:none}[hidden]{display:none}`;
class h extends r {
  constructor() {
    super(), this.mutationObserver = n("mutation", () => this.updateItems()), this.position = -1, this.scale = "m", this.selectionMode = "single", this.calciteInternalDropdownItemChange = l({ cancelable: !1 }), this.listen("calciteInternalDropdownItemSelect", this.updateActiveItemOnChange);
  }
  static {
    this.properties = { groupTitle: 3, position: 9, scale: 3, selectionMode: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = p;
  }
  connectedCallback() {
    super.connectedCallback(), this.updateItems(), this.mutationObserver?.observe(this.el, { childList: !0 });
  }
  willUpdate(e) {
    e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "single") && this.updateItems();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  updateActiveItemOnChange(e) {
    this.requestedDropdownGroup = e.detail.requestedDropdownGroup, this.requestedDropdownItem = e.detail.requestedDropdownItem, this.calciteInternalDropdownItemChange.emit({
      requestedDropdownGroup: this.requestedDropdownGroup,
      requestedDropdownItem: this.requestedDropdownItem
    });
  }
  updateItems() {
    Array.from(this.el.querySelectorAll("calcite-dropdown-item")).forEach((e) => e.selectionMode = this.selectionMode);
  }
  render() {
    const e = this.groupTitle ? i`<span aria-hidden=true class=${t({ [s.title]: !0, [s.firstTitle]: this.position === 0 })}>${this.groupTitle}</span>` : null, a = this.position > 0 ? i`<div class=${t(s.separator)} role=separator></div>` : null;
    return this.el.ariaLabel = this.groupTitle, this.el.role = "group", i`<div class=${t({
      [d.container]: !0
    })}>${a}${e}<slot></slot></div>`;
  }
}
c("calcite-dropdown-group", h);
export {
  h as DropdownGroup
};
