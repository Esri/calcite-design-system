/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as o, L as c, c as n, s as r, b as d, d as h } from "./index.js";
import { n as p } from "./ref.js";
import { c as m } from "./observers.js";
import { d as a } from "./dom.js";
import { i as u } from "./resources32.js";
import { u as f } from "./useInteractive.js";
const b = {
  container: "container"
}, g = o`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{box-sizing:border-box;display:inline-block}:host ::slotted(calcite-tile){margin-block-end:var(--calcite-spacing-px);margin-inline-end:var(--calcite-spacing-px)}.container{display:grid;grid-auto-rows:minmax(auto,1fr);grid-auto-flow:column}:host([scale=s]) .container{grid-template-columns:repeat(auto-fit,minmax(100px,1fr))}:host([scale=m]) .container{grid-template-columns:repeat(auto-fit,minmax(140px,1fr))}:host([scale=l]) .container{grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}:host([layout=vertical]) .container{display:flex;flex-direction:column}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class y extends c {
  constructor() {
    super(), this.items = [], this.mutationObserver = m("mutation", () => this.updateTiles()), this.interactiveContainer = f(this), this.alignment = "start", this.disabled = !1, this.layout = "horizontal", this.scale = "m", this.selectedItems = [], this.selectionAppearance = "icon", this.selectionMode = "none", this.calciteTileGroupSelect = n({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listen("calciteTileSelect", this.calciteTileSelectHandler);
  }
  static {
    this.properties = { alignment: 3, disabled: 7, label: 1, layout: 3, scale: 3, selectedItems: 0, selectionAppearance: 3, selectionMode: 3 };
  }
  static {
    this.styles = g;
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0 }), this.updateTiles();
  }
  willUpdate(e) {
    (e.has("scale") && (this.hasUpdated || this.scale !== "m") || e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") || e.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "icon")) && this.updateTiles();
  }
  loaded() {
    this.updateSelectedItems();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  getSlottedTiles() {
    return this.slotEl?.assignedElements({ flatten: !0 }).filter(u) ?? [];
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
  keyDownHandler(e) {
    const t = e.composedPath();
    if (e.defaultPrevented || this.disabled || !t.includes(this.el))
      return;
    const s = this.items.find((l) => l === e.target);
    if (!s || s.disabled)
      return;
    const i = this.items?.filter((l) => !l.disabled);
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault(), a(i, s, "next", !0, !1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault(), a(i, s, "previous", !0, !1);
        break;
      case "Home":
        e.preventDefault(), a(i, s, "first", !0, !1);
        break;
      case "End":
        e.preventDefault(), a(i, s, "last", !0, !1);
        break;
    }
  }
  calciteTileSelectHandler(e) {
    e.composedPath().includes(this.el) && this.selectItem(e.target);
  }
  render() {
    const e = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
    return this.interactiveContainer({ disabled: this.disabled, children: d`<div .ariaLabel=${this.label} class=${r(b.container)} .role=${e}><slot @slotchange=${this.updateTiles} ${p(this.setSlotEl)}></slot></div>` });
  }
}
h("calcite-tile-group", y);
export {
  y as TileGroup
};
