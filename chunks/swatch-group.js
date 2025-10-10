import { b as c, L as l, c as o, s as r, x as n, q as d } from "./index.js";
import { e as h, n as p } from "./ref.js";
import { b as i, d as m } from "./dom.js";
import { u, I as S } from "./interactive.js";
import { u as f } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const g = {
  container: "container"
}, I = c`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.container{display:flex;flex-wrap:wrap;gap:var(--calcite-swatch-group-space, var(--calcite-spacing-sm))}:host([scale=s]) .container{gap:var(--calcite-swatch-group-space, var(--calcite-spacing-xs))}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class w extends l {
  constructor() {
    super(), this.items = [], this.slotRef = h(), this.focusSetter = f()(this), this.disabled = !1, this.scale = "m", this.selectedItems = [], this.selectionMode = "none", this.calciteSwatchGroupSelect = o({ cancelable: !1 }), this.listen("calciteInternalSwatchKeyEvent", this.calciteInternalSwatchKeyEventListener), this.listen("calciteSwatchSelect", this.calciteSwatchSelectListener), this.listen("calciteInternalSwatchSelect", this.calciteInternalSwatchSelectListener), this.listen("calciteInternalSyncSelectedSwatches", this.calciteInternalSyncSelectedSwatches);
  }
  static {
    this.properties = { disabled: 7, label: 1, scale: 3, selectedItems: 0, selectionMode: 3 };
  }
  static {
    this.styles = I;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  willUpdate(e) {
    e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") && this.updateItems();
  }
  updated() {
    u(this);
  }
  calciteInternalSwatchKeyEventListener(e) {
    if (e.composedPath().includes(this.el)) {
      const s = this.items?.filter((t) => !t.disabled);
      switch (e.detail.key) {
        case "ArrowRight":
          i(s, e.detail.target, "next");
          break;
        case "ArrowLeft":
          i(s, e.detail.target, "previous");
          break;
        case "Home":
          i(s, e.detail.target, "first");
          break;
        case "End":
          i(s, e.detail.target, "last");
          break;
      }
    }
    e.stopPropagation();
  }
  calciteSwatchSelectListener(e) {
    e.composedPath().includes(this.el) && this.setSelectedItems(!0, e.target), e.stopPropagation();
  }
  calciteInternalSwatchSelectListener(e) {
    e.composedPath().includes(this.el) && this.setSelectedItems(!1, e.target), e.stopPropagation();
  }
  calciteInternalSyncSelectedSwatches(e) {
    e.composedPath().includes(this.el) && (this.updateSelectedItems(), this.selectionMode === "single" && this.selectedItems.length > 1 && this.setSelectedItems(!1, e.target)), e.stopPropagation();
  }
  updateItems(e) {
    const s = this.slotRef.value?.assignedElements({ flatten: !0 }).filter((t) => t?.matches("calcite-swatch"));
    this.items = e ? m(e) : s, !(this.items?.length < 1) && (this.items?.forEach((t) => {
      t.interactive = !0, t.scale = this.scale, t.selectionMode = this.selectionMode, t.parentSwatchGroup = this.el;
    }), this.setSelectedItems(!1));
  }
  updateSelectedItems() {
    this.selectedItems = this.items?.filter((e) => e.selected);
  }
  setSelectedItems(e, s) {
    s && this.items?.forEach((t) => {
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
    }), this.updateSelectedItems(), e && this.calciteSwatchGroupSelect.emit();
  }
  render() {
    const e = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup", { disabled: s } = this;
    return S({ disabled: s, children: n`<div .ariaLabel=${this.label} class=${r(g.container)} .role=${e}><slot @slotchange=${this.updateItems} ${p(this.slotRef)}></slot></div>` });
  }
}
d("calcite-swatch-group", w);
export {
  w as SwatchGroup
};
