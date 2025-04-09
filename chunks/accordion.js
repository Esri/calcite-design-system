import { c as t, L as c, h as n, s as a, x as o, d as r } from "./iframe.js";
import { c as s } from "./observers.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
const i = {
  accordion: "accordion",
  transparent: "accordion--transparent"
}, l = t`:host{position:relative;display:block;max-inline-size:100%;line-height:1.5rem}.accordion{border-width:1px;border-block-end-width:0px;border-style:solid;border-color:var(--calcite-accordion-border-color, var(--calcite-color-border-2));background-color:var(--calcite-accordion-background-color, var(--calcite-color-foreground-1))}.accordion--transparent{--calcite-accordion-border-color: transparent;border-color:var(--calcite-color-transparent);background-color:var(--calcite-color-transparent)}:host([scale=s]){--calcite-internal-accordion-item-spacing-unit: .25rem;--calcite-internal-accordion-icon-margin: .5rem;--calcite-internal-accordion-item-padding: var(--calcite-internal-accordion-item-spacing-unit) .5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-internal-accordion-item-spacing-unit: .5rem;--calcite-internal-accordion-icon-margin: .75rem;--calcite-internal-accordion-item-padding: var(--calcite-internal-accordion-item-spacing-unit) .75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-internal-accordion-item-spacing-unit: .75rem;--calcite-internal-accordion-icon-margin: 1rem;--calcite-internal-accordion-item-padding: var(--calcite-internal-accordion-item-spacing-unit) 1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([hidden]){display:none}[hidden]{display:none}`;
class d extends c {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.mutationObserver = s("mutation", () => this.updateAccordionItems()), this.appearance = "solid", this.iconPosition = "end", this.iconType = "chevron", this.scale = "m", this.selectionMode = "multiple", this.calciteInternalAccordionChange = n({ cancelable: !1 }), this.listen("calciteInternalAccordionItemSelect", this.updateActiveItemOnChange);
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
    (e.has("iconPosition") && (this.hasUpdated || this.iconPosition !== "end") || e.has("iconType") && (this.hasUpdated || this.iconType !== "chevron") || e.has("scale") && (this.hasUpdated || this.scale !== "m") || e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "multiple")) && this.updateAccordionItems();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  // #endregion
  // #region Private Methods
  updateActiveItemOnChange(e) {
    this.calciteInternalAccordionChange.emit({
      requestedAccordionItem: e.detail.requestedAccordionItem
    }), e.stopPropagation();
  }
  updateAccordionItems() {
    this.el.querySelectorAll("calcite-accordion-item").forEach((e) => {
      e.iconPosition = this.iconPosition, e.iconType = this.iconType, e.scale = this.scale;
    }), document.dispatchEvent(new CustomEvent("calciteInternalAccordionItemsSync"));
  }
  // #endregion
  // #region Rendering
  render() {
    const e = this.appearance === "transparent";
    return o`<div class=${a({
      [i.transparent]: e,
      [i.accordion]: !e
    })}><slot></slot></div>`;
  }
}
r("calcite-accordion", d);
export {
  d as Accordion
};
