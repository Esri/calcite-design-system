import { b as c, L as o, c as n, x as r, q as h } from "./index.js";
import { e as d, n as p } from "./ref.js";
import { b as l, d as m } from "./dom.js";
import { u as f, I as u } from "./interactive.js";
import { u as I } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const g = c`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.container{display:flex;inline-size:100%;flex-wrap:wrap;gap:.5rem}::slotted(calcite-chip){flex:none}:host([scale=s]) .container{gap:.25rem}:host([scale=l]) .container{gap:.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class S extends o {
  constructor() {
    super(), this.items = [], this.slotRef = d(), this.focusSetter = I()(this), this.disabled = !1, this.scale = "m", this.selectedItems = [], this.selectionMode = "none", this.calciteChipGroupSelect = n({ cancelable: !1 }), this.listen("calciteInternalChipKeyEvent", this.calciteInternalChipKeyEventListener), this.listen("calciteChipClose", this.calciteChipCloseListener), this.listen("calciteChipSelect", this.calciteChipSelectListener), this.listen("calciteInternalChipSelect", this.calciteInternalChipSelectListener), this.listen("calciteInternalSyncSelectedChips", this.calciteInternalSyncSelectedChips);
  }
  static {
    this.properties = { disabled: 7, label: 1, scale: 3, selectedItems: 0, selectionMode: 3 };
  }
  static {
    this.styles = g;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.selectedItems[0] || this.items[0], e);
  }
  willUpdate(e) {
    e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") && this.updateItems();
  }
  updated() {
    f(this);
  }
  calciteInternalChipKeyEventListener(e) {
    if (e.composedPath().includes(this.el)) {
      const t = {
        ArrowRight: "next",
        ArrowLeft: "previous",
        Home: "first",
        End: "last"
      }[e.detail.key];
      if (t) {
        const i = this.items?.filter((a) => !a.disabled);
        l(i, e.detail.target, t, !0, !0, !0);
      }
    }
    e.stopPropagation();
  }
  calciteChipCloseListener(e) {
    const s = e.target;
    this.items?.includes(s) && (this.items?.indexOf(s) > 0 ? l(this.items, s, "previous", !1, !1) : this.items?.indexOf(s) === 0 ? l(this.items, s, "next", !1, !1) : l(this.items, s, "first", !1, !1)), this.items = this.items?.filter((t) => t !== s), e.stopPropagation();
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
    const s = this.slotRef.value?.assignedElements({ flatten: !0 }).filter((t) => t?.matches("calcite-chip"));
    this.items = e ? m(e) : s, !(this.items?.length < 1) && (this.items?.forEach((t) => {
      t.interactive = !0, t.scale = this.scale, t.selectionMode = this.selectionMode, t.parentChipGroup = this.el;
    }), this.setSelectedItems(!1));
  }
  updateSelectedItems() {
    this.selectedItems = this.items?.filter((e) => e.selected);
  }
  setSelectedItems(e, s) {
    s && this.items?.forEach((t) => {
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
    }), this.updateSelectedItems(), e && this.calciteChipGroupSelect.emit();
  }
  render() {
    const e = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup", { disabled: s } = this;
    return u({ disabled: s, children: r`<div .ariaLabel=${this.label} class="container" .role=${e}><slot @slotchange=${this.updateItems} ${p(this.slotRef)}></slot></div>` });
  }
}
h("calcite-chip-group", S);
export {
  S as ChipGroup
};
