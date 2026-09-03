/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as l, L as c, c as d, s as r, b as o, d as n } from "./index.js";
import { e as h, n as p } from "./ref.js";
import { d as a } from "./dom.js";
import { i as u } from "./resources11.js";
import { u as m } from "./useSetFocus.js";
import { u as f } from "./useInteractive.js";
const b = l`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{display:flex;flex-wrap:wrap;gap:var(--calcite-card-group-space, var(--calcite-card-group-gap, var(--calcite-spacing-md)))}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`, S = {
  container: "container"
};
class I extends c {
  constructor() {
    super(), this.items = [], this.slotRef = h(), this.focusSetter = m()(this), this.interactiveContainer = f(this), this.disabled = !1, this.scale = "m", this.selectedItems = [], this.selectionMode = "none", this.calciteCardGroupSelect = d({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listen("calciteCardSelect", this.calciteCardSelectListener);
  }
  static {
    this.properties = { disabled: 7, label: 1, scale: 3, selectedItems: 0, selectionMode: 3 };
  }
  static {
    this.styles = b;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.items[0], e);
  }
  willUpdate(e) {
    e.has("selectionMode") && this.hasUpdated && this.updateItemsOnSelectionModeChange(), e.has("scale") && (this.hasUpdated || this.scale !== "m") && this.updateItemsScale();
  }
  loaded() {
    this.updateSelectedItems();
  }
  keyDownHandler(e) {
    if (e.defaultPrevented || this.disabled || !e.composedPath().includes(this.el))
      return;
    const s = this.items.find((i) => i === e.target);
    if (!s || s.disabled || s.selectable)
      return;
    const t = this.items.filter((i) => !i.disabled);
    switch (e.key) {
      case "ArrowRight":
        a(t, s, "next", !0, !1), e.preventDefault();
        break;
      case "ArrowLeft":
        a(t, s, "previous", !0, !1), e.preventDefault();
        break;
      case "Home":
        a(t, s, "first", !0, !1), e.preventDefault();
        break;
      case "End":
        a(t, s, "last", !0, !1), e.preventDefault();
        break;
    }
  }
  calciteCardSelectListener(e) {
    e.composedPath().includes(this.el) && !e.target.selectable && this.setSelectedItems(!0, e.target);
  }
  updateItemsOnSelectionModeChange() {
    this.updateSlottedItems(this.slotRef.value), this.updateSelectedItems();
  }
  updateItemsOnSlotChange(e) {
    this.updateSlottedItems(e.target), this.updateSelectedItems(), this.updateItemsScale();
  }
  updateSlottedItems(e) {
    this.items = e?.assignedElements({ flatten: !0 }).filter(u) || [];
  }
  updateItemsScale() {
    this.items.forEach((e) => {
      e.scale = this.scale;
    });
  }
  updateSelectedItems() {
    this.items.forEach((e) => {
      e.selectionMode = this.selectionMode;
    }), this.setSelectedItems(!1);
  }
  setSelectedItems(e, s) {
    s && this.items.forEach((t) => {
      const i = s === t;
      switch (this.selectionMode) {
        case "multiple":
          i && (t.selected = !t.selected);
          break;
        case "single":
          t.selected = i ? !t.selected : !1;
          break;
        case "single-persist":
          t.selected = !!i;
          break;
      }
    }), this.selectedItems = this.items.filter((t) => t.selected), e && this.selectionMode !== "none" && !this.disabled && this.calciteCardGroupSelect.emit();
  }
  render() {
    const e = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
    return this.interactiveContainer({ disabled: this.disabled, children: o`<div .ariaLabel=${this.label} class=${r(S.container)} .role=${e}><slot @slotchange=${this.updateItemsOnSlotChange} ${p(this.slotRef)}></slot></div>` });
  }
}
n("calcite-card-group", I);
export {
  I as CardGroup
};
