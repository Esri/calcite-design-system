import { b as l, L as c, c as o, s as r, x as d, q as n } from "./index.js";
import { e as h, n as p } from "./ref.js";
import { b as a } from "./dom.js";
import { u, I as m } from "./interactive.js";
import { u as f } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const b = l`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{display:flex;flex-wrap:wrap;gap:var(--calcite-card-group-space, var(--calcite-card-group-gap, var(--calcite-spacing-md)))}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`, g = {
  container: "container"
};
class I extends c {
  constructor() {
    super(), this.items = [], this.slotRef = h(), this.focusSetter = f()(this), this.disabled = !1, this.selectedItems = [], this.selectionMode = "none", this.calciteCardGroupSelect = o({ cancelable: !1 }), this.listen("calciteInternalCardKeyEvent", this.calciteInternalCardKeyEventListener), this.listen("calciteCardSelect", this.calciteCardSelectListener);
  }
  static {
    this.properties = { disabled: 7, label: 1, selectedItems: 0, selectionMode: 3 };
  }
  static {
    this.styles = b;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.items[0], e);
  }
  willUpdate(e) {
    e.has("selectionMode") && this.hasUpdated && this.updateItemsOnSelectionModeChange();
  }
  updated() {
    u(this);
  }
  loaded() {
    this.updateSelectedItems();
  }
  calciteInternalCardKeyEventListener(e) {
    if (e.composedPath().includes(this.el)) {
      const s = this.items.filter((t) => !t.disabled);
      switch (e.detail.key) {
        case "ArrowRight":
          a(s, e.target, "next", !0, !1);
          break;
        case "ArrowLeft":
          a(s, e.target, "previous", !0, !1);
          break;
        case "Home":
          a(s, e.target, "first", !0, !1);
          break;
        case "End":
          a(s, e.target, "last", !0, !1);
          break;
      }
    }
  }
  calciteCardSelectListener(e) {
    e.composedPath().includes(this.el) && !e.target.selectable && this.setSelectedItems(!0, e.target);
  }
  updateItemsOnSelectionModeChange() {
    this.updateSlottedItems(this.slotRef.value), this.updateSelectedItems();
  }
  updateItemsOnSlotChange(e) {
    this.updateSlottedItems(e.target), this.updateSelectedItems();
  }
  updateSlottedItems(e) {
    this.items = e?.assignedElements({ flatten: !0 }).filter((s) => s?.matches("calcite-card")) || [];
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
    return m({ disabled: this.disabled, children: d`<div .ariaLabel=${this.label} class=${r(g.container)} .role=${e}><slot @slotchange=${this.updateItemsOnSlotChange} ${p(this.slotRef)}></slot></div>` });
  }
}
n("calcite-card-group", I);
export {
  I as CardGroup
};
