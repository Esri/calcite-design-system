/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as d, L as p, c as h, s as r, b as c, d as m } from "./index.js";
import { c as u } from "./observers.js";
import { C as g } from "./resources17.js";
import { C as o } from "./resources16.js";
const b = d`:host{display:block}.container{text-align:start}.title{margin-block-end:-1px;display:block;cursor:default;overflow-wrap:break-word;border-width:0px;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-dropdown-group-title-text-color, var(--calcite-color-text-1))}.separator{display:block;block-size:1px;background-color:var(--calcite-dropdown-group-border-color, var(--calcite-color-border-3))}:host([scale=s]){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=s]) .title{padding-block:var(--calcite-spacing-xxs);padding-inline:var(--calcite-spacing-sm)}:host([scale=s]) .first-title{padding-block-start:var(--calcite-spacing-sm)}:host([scale=s]) .separator{margin-block:var(--calcite-spacing-xxs);margin-inline:var(--calcite-spacing-sm)}:host([scale=m]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=m]) .title{padding-block:var(--calcite-spacing-sm);padding-inline:var(--calcite-spacing-md)}:host([scale=m]) .first-title{padding-block-start:var(--calcite-spacing-lg)}:host([scale=m]) .separator{margin-block:var(--calcite-spacing-sm);margin-inline:var(--calcite-spacing-md)}:host([scale=l]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l]) .title{padding-block:var(--calcite-spacing-sm-plus);padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .first-title{padding-block-start:var(--calcite-spacing-xl)}:host([scale=l]) .separator{margin-block:var(--calcite-spacing-sm-plus);margin-inline:var(--calcite-spacing-lg)}:host([hidden]){display:none}[hidden]{display:none}`;
class v extends p {
  constructor() {
    super(), this.mutationObserver = u("mutation", () => this.updateItems()), this.items = [], this.describedItems = /* @__PURE__ */ new Set(), this.currentItems = /* @__PURE__ */ new Set(), this.position = -1, this.scale = "m", this.selectionMode = "single", this.calciteInternalDropdownItemChange = h({ cancelable: !1 }), this.listen("calciteInternalDropdownItemSelect", this.updateActiveItemOnChange);
  }
  static {
    this.properties = { groupTitle: 3, position: 9, scale: 3, selectionMode: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = b;
  }
  connectedCallback() {
    super.connectedCallback(), this.updateItems(), this.mutationObserver?.observe(this.el, { childList: !0 });
  }
  willUpdate(e) {
    e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "single") && this.updateItems();
  }
  updated(e) {
    e.has("groupTitle") && this.syncItemGroupDescriptions(this.getItems());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.describedItems.forEach((e) => {
      e.ariaDescribedByElements = e.ariaDescribedByElements?.filter((s) => s !== this.el) ?? null;
    }), this.describedItems.clear(), this.currentItems.clear(), this.items = [];
  }
  updateActiveItemOnChange(e) {
    this.requestedDropdownGroup = e.detail.requestedDropdownGroup, this.requestedDropdownItem = e.detail.requestedDropdownItem, this.calciteInternalDropdownItemChange.emit({
      requestedDropdownGroup: this.requestedDropdownGroup,
      requestedDropdownItem: this.requestedDropdownItem
    });
  }
  updateItems() {
    const e = this.getItems();
    this.items = e, e.forEach((s) => {
      s.selectionMode = this.selectionMode;
    }), this.syncItemGroupDescriptions(e);
  }
  getItems() {
    return Array.from(this.el.querySelectorAll("calcite-dropdown-item"));
  }
  syncItemGroupDescriptions(e = this.items) {
    const s = this.groupTitle ? this.el : null, i = this.currentItems;
    i.clear(), e.forEach((t) => i.add(t));
    const l = [];
    this.describedItems.forEach((t) => {
      i.has(t) || (t.ariaDescribedByElements = t.ariaDescribedByElements?.filter((a) => a !== this.el) ?? null, l.push(t));
    }), l.forEach((t) => this.describedItems.delete(t)), i.forEach((t) => {
      const a = t.ariaDescribedByElements?.filter((n) => n !== this.el) ?? [];
      t.ariaDescribedByElements = s ? [...a, s] : a, this.describedItems.add(t);
    }), this.items = e;
  }
  render() {
    const e = this.groupTitle ? c`<span aria-hidden=true class=${r({ [o.title]: !0, [o.firstTitle]: this.position === 0 })}>${this.groupTitle}</span>` : null, s = this.position > 0 ? c`<div class=${r(o.separator)} role=separator></div>` : null;
    return this.el.ariaLabel = this.groupTitle ?? null, this.el.role = "group", c`<div class=${r({
      [g.container]: !0
    })}>${s}${e}<slot></slot></div>`;
  }
}
m("calcite-dropdown-group", v);
export {
  v as DropdownGroup
};
