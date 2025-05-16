import { a as l, L as c, d, x as o, c as r } from "./iframe.js";
import { e as n, n as h } from "./ref.js";
import { a as p, b as i } from "./dom.js";
import { u as m, I as u } from "./interactive.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
const f = l`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{display:flex;flex-wrap:wrap;gap:var(--calcite-card-group-space, var(--calcite-card-group-gap, var(--calcite-spacing-md)))}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class b extends c {
  constructor() {
    super(), this.items = [], this.slotRefEl = n(), this.disabled = !1, this.selectedItems = [], this.selectionMode = "none", this.calciteCardGroupSelect = d({ cancelable: !1 }), this.listen("calciteInternalCardKeyEvent", this.calciteInternalCardKeyEventListener), this.listen("calciteCardSelect", this.calciteCardSelectListener);
  }
  static {
    this.properties = { disabled: 7, label: 1, selectedItems: 0, selectionMode: 3 };
  }
  static {
    this.styles = f;
  }
  async setFocus() {
    await this.componentOnReady(), this.disabled || p(this.items[0]);
  }
  willUpdate(e) {
    e.has("selectionMode") && this.hasUpdated && this.updateItemsOnSelectionModeChange();
  }
  updated() {
    m(this);
  }
  loaded() {
    this.updateSelectedItems();
  }
  calciteInternalCardKeyEventListener(e) {
    if (e.composedPath().includes(this.el)) {
      const s = this.items.filter((t) => !t.disabled);
      switch (e.detail.key) {
        case "ArrowRight":
          i(s, e.target, "next");
          break;
        case "ArrowLeft":
          i(s, e.target, "previous");
          break;
        case "Home":
          i(s, e.target, "first");
          break;
        case "End":
          i(s, e.target, "last");
          break;
      }
    }
  }
  calciteCardSelectListener(e) {
    e.composedPath().includes(this.el) && !e.target.selectable && this.setSelectedItems(!0, e.target);
  }
  updateItemsOnSelectionModeChange() {
    this.updateSlottedItems(this.slotRefEl.value), this.updateSelectedItems();
  }
  updateItemsOnSlotChange(e) {
    this.updateSlottedItems(e.target), this.updateSelectedItems();
  }
  updateSlottedItems(e) {
    this.items = e.assignedElements({ flatten: !0 }).filter((s) => s?.matches("calcite-card"));
  }
  updateSelectedItems() {
    this.items.forEach((e) => {
      e.selectionMode = this.selectionMode;
    }), this.setSelectedItems(!1);
  }
  setSelectedItems(e, s) {
    s && this.items.forEach((t) => {
      const a = s === t;
      switch (this.selectionMode) {
        case "multiple":
          a && (t.selected = !t.selected);
          break;
        case "single":
          t.selected = a ? !t.selected : !1;
          break;
        case "single-persist":
          t.selected = !!a;
          break;
      }
    }), this.selectedItems = this.items.filter((t) => t.selected), e && this.selectionMode !== "none" && !this.disabled && this.calciteCardGroupSelect.emit();
  }
  render() {
    const e = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
    return u({ disabled: this.disabled, children: o`<div .ariaLabel=${this.label} class="container" .role=${e}><slot @slotchange=${this.updateItemsOnSlotChange} ${h(this.slotRefEl)}></slot></div>` });
  }
}
r("calcite-card-group", b);
export {
  b as CardGroup
};
