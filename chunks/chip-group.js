/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as n, L as r, c as h, b as d, d as p } from "./index.js";
import { e as m, n as f } from "./ref.js";
import { d as l, b as u } from "./dom.js";
import { u as S } from "./useSetFocus.js";
import { u as I } from "./useInteractive.js";
import { i as a } from "./resources12.js";
const g = n`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.container{display:flex;inline-size:100%;flex-wrap:wrap;gap:.5rem}::slotted(calcite-chip){flex:none}:host([scale=s]) .container{gap:.25rem}:host([scale=l]) .container{gap:.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class C extends r {
  constructor() {
    super(), this.items = [], this.slotRef = m(), this.focusSetter = S()(this), this.interactiveContainer = I(this), this.disabled = !1, this.scale = "m", this.selectedItems = [], this.selectionMode = "none", this.calciteChipGroupSelect = h({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listen("calciteChipClose", this.calciteChipCloseListener), this.listen("calciteChipSelect", this.calciteChipSelectListener), this.listen("calciteInternalChipSelect", this.calciteInternalChipSelectListener), this.listen("calciteInternalSyncSelectedChips", this.calciteInternalSyncSelectedChips);
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
    (e.has("scale") || e.has("selectionMode")) && (this.hasUpdated || this.selectionMode !== "none") && this.updateItems();
  }
  keyDownHandler(e) {
    const t = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      Home: "first",
      End: "last"
    }[e.key];
    if (e.defaultPrevented || !t)
      return;
    const i = e.composedPath().find(a);
    if (!i || !this.items.includes(i))
      return;
    const c = this.items.filter((o) => !o.disabled);
    l(c, i, t, !0, !0, !0);
  }
  calciteChipCloseListener(e) {
    const s = e.target;
    this.items?.includes(s) && (this.items?.indexOf(s) > 0 ? l(this.items, s, "previous", !1, !1) : this.items?.indexOf(s) === 0 ? l(this.items, s, "next", !1, !1) : l(this.items, s, "first", !1, !1)), this.items = this.items.filter((t) => t !== s), e.stopPropagation();
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
    const s = this.slotRef.value?.assignedElements({ flatten: !0 }).filter(a) || [];
    this.items = e ? u(e) : s, !(this.items?.length < 1) && (this.items?.forEach((t) => {
      t.interactive = !0, t.scale = this.scale, t.selectionMode = this.selectionMode, t.parentChipGroup = this.el;
    }), this.setSelectedItems(!1));
  }
  updateSelectedItems() {
    this.selectedItems = this.items.filter((e) => e.selected);
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
    return this.interactiveContainer({ disabled: s, children: d`<div .ariaLabel=${this.label} class="container" .role=${e}><slot @slotchange=${this.updateItems} ${f(this.slotRef)}></slot></div>` });
  }
}
p("calcite-chip-group", C);
export {
  C as ChipGroup
};
