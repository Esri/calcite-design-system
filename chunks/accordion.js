/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as i, L as a, c as t, s as n, b as o, d as r } from "./index.js";
import { c as s } from "./observers.js";
const c = {
  accordion: "accordion",
  transparent: "accordion--transparent"
}, l = i`:host{position:relative;display:block;max-inline-size:100%;line-height:var(--calcite-font-line-height-relative-normal)}.accordion{border-width:var(--calcite-border-width-sm);border-style:solid;border-block-end-width:var(--calcite-border-width-none);border-color:var(--calcite-accordion-border-color, var(--calcite-color-border-2));background-color:var(--calcite-accordion-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)))}.accordion--transparent{--calcite-accordion-border-color: transparent;border-color:var(--calcite-color-transparent);background-color:var(--calcite-color-transparent)}:host([scale=s]){--calcite-internal-accordion-item-spacing-unit: var(--calcite-space-2xs);--calcite-internal-accordion-icon-margin: var(--calcite-space-sm);--calcite-internal-accordion-item-padding: var(--calcite-internal-accordion-item-spacing-unit) var(--calcite-space-sm);font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=m]){--calcite-internal-accordion-item-spacing-unit: var(--calcite-space-sm);--calcite-internal-accordion-icon-margin: var(--calcite-space-md);--calcite-internal-accordion-item-padding: var(--calcite-internal-accordion-item-spacing-unit) var(--calcite-space-md);font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=l]){--calcite-internal-accordion-item-spacing-unit: var(--calcite-space-md);--calcite-internal-accordion-icon-margin: var(--calcite-space-lg);--calcite-internal-accordion-item-padding: var(--calcite-internal-accordion-item-spacing-unit) var(--calcite-space-lg);font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([hidden]){display:none}[hidden]{display:none}`;
class d extends a {
  constructor() {
    super(), this.mutationObserver = s("mutation", () => this.updateAccordionItems()), this.appearance = "solid", this.iconPosition = "end", this.iconType = "chevron", this.scale = "m", this.selectionMode = "multiple", this.calciteInternalAccordionChange = t({
      cancelable: !1
    }), this.listen("calciteInternalAccordionItemSelect", this.updateActiveItemOnChange);
  }
  static {
    this.properties = { appearance: 3, iconPosition: 3, iconType: 3, scale: 3, selectionMode: 3 };
  }
  static {
    this.styles = l;
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0 }), this.updateAccordionItems();
  }
  willUpdate(e) {
    (e.has("appearance") && (this.hasUpdated || this.appearance !== "solid") || e.has("iconPosition") && (this.hasUpdated || this.iconPosition !== "end") || e.has("iconType") && (this.hasUpdated || this.iconType !== "chevron") || e.has("scale") && (this.hasUpdated || this.scale !== "m") || e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "multiple")) && this.updateAccordionItems();
  }
  loaded() {
    this.dispatchAccordionItemsSync();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  updateActiveItemOnChange(e) {
    this.calciteInternalAccordionChange.emit({
      requestedAccordionItem: e.detail.requestedAccordionItem
    }), e.stopPropagation();
  }
  updateAccordionItems() {
    this.el.querySelectorAll("calcite-accordion-item").forEach((e) => {
      e.appearance = this.appearance, e.iconPosition = this.iconPosition, e.iconType = this.iconType, e.scale = this.scale;
    }), this.manager.loadedCalled && this.dispatchAccordionItemsSync();
  }
  dispatchAccordionItemsSync() {
    document.dispatchEvent(new CustomEvent("calciteInternalAccordionItemsSync"));
  }
  render() {
    const e = this.appearance === "transparent";
    return o`<div class=${n({
      [c.transparent]: e,
      [c.accordion]: !e
    })}><slot></slot></div>`;
  }
}
r("calcite-accordion", d);
export {
  d as Accordion
};
