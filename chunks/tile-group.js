import { b as a, L as l, c, s as o, x as n, q as r } from "./index.js";
import { n as d } from "./ref.js";
import { u as h, I as p } from "./interactive.js";
import { c as m } from "./observers.js";
import { b as i } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const u = {
  container: "container"
}, f = a`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{box-sizing:border-box;display:inline-block}:host ::slotted(calcite-tile){margin-block-end:var(--calcite-spacing-px);margin-inline-end:var(--calcite-spacing-px)}.container{display:grid;grid-auto-rows:minmax(auto,1fr)}:host([scale=s]) .container{grid-template-columns:repeat(auto-fit,minmax(100px,1fr))}:host([scale=m]) .container{grid-template-columns:repeat(auto-fit,minmax(140px,1fr))}:host([scale=l]) .container{grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}:host([layout=vertical]) .container{display:flex;flex-direction:column}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class b extends l {
  constructor() {
    super(), this.items = [], this.mutationObserver = m("mutation", () => this.updateTiles()), this.alignment = "start", this.disabled = !1, this.layout = "horizontal", this.scale = "m", this.selectedItems = [], this.selectionAppearance = "icon", this.selectionMode = "none", this.calciteTileGroupSelect = c({ cancelable: !1 }), this.listen("calciteInternalTileKeyEvent", this.calciteInternalTileKeyEventListener), this.listen("calciteTileSelect", this.calciteTileSelectHandler);
  }
  static {
    this.properties = { alignment: 3, disabled: 7, label: 1, layout: 3, scale: 3, selectedItems: 0, selectionAppearance: 3, selectionMode: 3 };
  }
  static {
    this.styles = f;
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0 }), this.updateTiles();
  }
  willUpdate(e) {
    (e.has("scale") && (this.hasUpdated || this.scale !== "m") || e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") || e.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "icon")) && this.updateTiles();
  }
  updated() {
    h(this);
  }
  loaded() {
    this.updateSelectedItems();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  getSlottedTiles() {
    return this.slotEl?.assignedElements({ flatten: !0 }).filter((e) => e?.matches("calcite-tile"));
  }
  selectItem(e) {
    e && (this.items?.forEach((t) => {
      const s = e === t;
      switch (this.selectionMode) {
        case "multiple":
          s && (t.selected = !t.selected);
          break;
        case "single":
          t.selected = s && !t.selected;
          break;
        case "single-persist":
          t.selected = !!s;
          break;
      }
    }), this.updateSelectedItems(), this.calciteTileGroupSelect.emit());
  }
  setSlotEl(e) {
    this.slotEl = e;
  }
  updateSelectedItems() {
    const e = this.items?.filter((t) => t.selected);
    (this.selectionMode === "single" || this.selectionMode === "single-persist") && e?.length > 1 ? (this.selectedItems = [e.pop()], this.items?.forEach((t) => {
      this.selectedItems.indexOf(t) === -1 && (t.selected = !1);
    })) : this.selectedItems = e ?? [];
  }
  updateTiles() {
    this.items = this.getSlottedTiles(), this.items?.forEach((e) => {
      e.alignment = this.alignment, e.interactive = !0, e.layout = this.layout, e.scale = this.scale, e.selectionAppearance = this.selectionAppearance, e.selectionMode = this.selectionMode;
    }), this.updateSelectedItems();
  }
  calciteInternalTileKeyEventListener(e) {
    if (e.composedPath().includes(this.el)) {
      e.preventDefault(), e.stopPropagation();
      const t = this.items?.filter((s) => !s.disabled);
      switch (e.detail.key) {
        case "ArrowDown":
        case "ArrowRight":
          i(t, e.detail.target, "next", !0, !1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          i(t, e.detail.target, "previous", !0, !1);
          break;
        case "Home":
          i(t, e.detail.target, "first", !0, !1);
          break;
        case "End":
          i(t, e.detail.target, "last", !0, !1);
          break;
      }
    }
  }
  calciteTileSelectHandler(e) {
    e.composedPath().includes(this.el) && this.selectItem(e.target);
  }
  render() {
    const e = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
    return p({ disabled: this.disabled, children: n`<div .ariaLabel=${this.label} class=${o(u.container)} .role=${e}><slot @slotchange=${this.updateTiles} ${d(this.setSlotEl)}></slot></div>` });
  }
}
r("calcite-tile-group", b);
export {
  b as TileGroup
};
