/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as c, L as l, c as o, s as n, b as r, d as h } from "./index.js";
import { e as d, n as p } from "./ref.js";
import { d as a, b as m } from "./dom.js";
import { u } from "./useSetFocus.js";
import { u as f } from "./useInteractive.js";
import { i as S } from "./resources27.js";
const w = {
  container: "container"
}, g = c`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.container{display:flex;flex-wrap:wrap;gap:var(--calcite-swatch-group-space, var(--calcite-spacing-sm))}:host([scale=s]) .container{gap:var(--calcite-swatch-group-space, var(--calcite-spacing-xs))}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class b extends l {
  constructor() {
    super(), this.items = [], this.slotRef = d(), this.focusSetter = u()(this), this.interactiveContainer = f(this), this.disabled = !1, this.scale = "m", this.selectedItems = [], this.selectionMode = "none", this.calciteSwatchGroupSelect = o({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listen("calciteSwatchSelect", this.calciteSwatchSelectListener), this.listen("calciteInternalSwatchSelect", this.calciteInternalSwatchSelectListener), this.listen("calciteInternalSyncSelectedSwatches", this.calciteInternalSyncSelectedSwatches);
  }
  static {
    this.properties = { disabled: 7, label: 1, scale: 3, selectedItems: 0, selectionMode: 3 };
  }
  static {
    this.styles = g;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  willUpdate(e) {
    (e.has("scale") || e.has("selectionMode")) && (this.hasUpdated || this.selectionMode !== "none") && this.updateItems();
  }
  keyDownHandler(e) {
    const t = e.composedPath().find(S);
    if (e.defaultPrevented || !t || !this.el.contains(t))
      return;
    const s = this.items.filter((i) => !i.disabled);
    if (s.includes(t))
      switch (e.key) {
        case "ArrowRight":
          a(s, t, "next"), e.preventDefault();
          break;
        case "ArrowLeft":
          a(s, t, "previous"), e.preventDefault();
          break;
        case "Home":
          a(s, t, "first"), e.preventDefault();
          break;
        case "End":
          a(s, t, "last"), e.preventDefault();
          break;
      }
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
  handleSlotChange(e) {
    this.updateItems(m(e, "calcite-swatch"));
  }
  updateItems(e = this.items) {
    this.items = e, !(this.items.length < 1) && (this.items.forEach((t) => {
      t.interactive = !0, t.scale = this.scale, t.selectionMode = this.selectionMode, t.parentSwatchGroup = this.el;
    }), this.setSelectedItems(!1));
  }
  updateSelectedItems() {
    this.selectedItems = this.items.filter((e) => e.selected);
  }
  setSelectedItems(e, t) {
    t && this.items.forEach((s) => {
      const i = t === s;
      switch (this.selectionMode) {
        case "multiple":
          i && (s.selected = !s.selected);
          break;
        case "single":
          s.selected = i ? !s.selected : !1;
          break;
        case "single-persist":
          s.selected = !!i;
          break;
      }
    }), this.updateSelectedItems(), e && this.calciteSwatchGroupSelect.emit();
  }
  render() {
    const e = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup", { disabled: t } = this;
    return this.interactiveContainer({ disabled: t, children: r`<div .ariaLabel=${this.label} class=${n(w.container)} .role=${e}><slot @slotchange=${this.handleSlotChange} ${p(this.slotRef)}></slot></div>` });
  }
}
h("calcite-swatch-group", b);
export {
  b as SwatchGroup
};
