import { j as a, L as c, n as o, x as n, k as r } from "./iframe.js";
import { e as h, n as d } from "./ref.js";
import { b as i, d as p } from "./dom.js";
import { u as m, I as f } from "./interactive.js";
import { c as u } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const g = a`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.container{display:flex;inline-size:100%;flex-wrap:wrap;gap:.5rem}::slotted(calcite-chip){flex:none}:host([scale=s]) .container{gap:.25rem}:host([scale=l]) .container{gap:.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class I extends c {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.items = [], this.slotRefEl = h(), this.disabled = !1, this.scale = "m", this.selectedItems = [], this.selectionMode = "none", this.calciteChipGroupSelect = o({ cancelable: !1 }), this.listen("calciteInternalChipKeyEvent", this.calciteInternalChipKeyEventListener), this.listen("calciteChipClose", this.calciteChipCloseListener), this.listen("calciteChipSelect", this.calciteChipSelectListener), this.listen("calciteInternalChipSelect", this.calciteInternalChipSelectListener), this.listen("calciteInternalSyncSelectedChips", this.calciteInternalSyncSelectedChips);
  }
  static {
    this.properties = { disabled: 7, label: 1, scale: 3, selectedItems: 0, selectionMode: 3 };
  }
  static {
    this.styles = g;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    if (await u(this), !this.disabled)
      return (this.selectedItems[0] || this.items[0])?.setFocus();
  }
  willUpdate(e) {
    e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") && this.updateItems();
  }
  updated() {
    m(this);
  }
  // #endregion
  // #region Private Methods
  calciteInternalChipKeyEventListener(e) {
    if (e.composedPath().includes(this.el)) {
      const t = this.items?.filter((s) => !s.disabled);
      switch (e.detail.key) {
        case "ArrowRight":
          i(t, e.detail.target, "next");
          break;
        case "ArrowLeft":
          i(t, e.detail.target, "previous");
          break;
        case "Home":
          i(t, e.detail.target, "first");
          break;
        case "End":
          i(t, e.detail.target, "last");
          break;
      }
    }
    e.stopPropagation();
  }
  calciteChipCloseListener(e) {
    const t = e.target;
    this.items?.includes(t) && (this.items?.indexOf(t) > 0 ? i(this.items, t, "previous") : this.items?.indexOf(t) === 0 ? i(this.items, t, "next") : i(this.items, t, "first")), this.items = this.items?.filter((s) => s !== t), e.stopPropagation();
  }
  calciteChipSelectListener(e) {
    e.composedPath().includes(this.el) && this.setSelectedItems(!0, e.target), e.stopPropagation();
  }
  calciteInternalChipSelectListener(e) {
    e.composedPath().includes(this.el) && this.setSelectedItems(!1, e.target), e.stopPropagation();
  }
  calciteInternalSyncSelectedChips(e) {
    e.composedPath().includes(this.el) && (this.updateSelectedItems(), this.selectionMode === "single" && this.selectedItems.length > 1 && this.setSelectedItems(!1, e.target)), e.stopPropagation();
  }
  updateItems(e) {
    const t = this.slotRefEl.value?.assignedElements({ flatten: !0 }).filter((s) => s?.matches("calcite-chip"));
    this.items = e ? p(e) : t, !(this.items?.length < 1) && (this.items?.forEach((s) => {
      s.interactive = !0, s.scale = this.scale, s.selectionMode = this.selectionMode, s.parentChipGroup = this.el;
    }), this.setSelectedItems(!1));
  }
  updateSelectedItems() {
    this.selectedItems = this.items?.filter((e) => e.selected);
  }
  setSelectedItems(e, t) {
    t && this.items?.forEach((s) => {
      const l = t === s;
      switch (this.selectionMode) {
        case "multiple":
          l && (s.selected = !s.selected);
          break;
        case "single":
          s.selected = l ? !s.selected : !1;
          break;
        case "single-persist":
          s.selected = !!l;
          break;
      }
    }), this.updateSelectedItems(), e && this.calciteChipGroupSelect.emit();
  }
  // #endregion
  // #region Rendering
  render() {
    const e = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup", { disabled: t } = this;
    return f({ disabled: t, children: n`<div .ariaLabel=${this.label} class="container" .role=${e}><slot @slotchange=${this.updateItems} ${d(this.slotRefEl)}></slot></div>` });
  }
}
r("calcite-chip-group", I);
export {
  I as ChipGroup
};
