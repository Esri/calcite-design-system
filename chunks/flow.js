/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as f, L as m, s as h, b as u, f as g } from "./index.js";
import { e as c, n as l } from "./ref.js";
import { B as p, a as b } from "./dom.js";
import { c as w } from "./observers.js";
import { u as v } from "./useFocusable.js";
const s = {
  frame: "frame",
  frameAdvancing: "frame--advancing",
  frameRetreating: "frame--retreating"
}, d = {
  item: "calcite-flow-item"
}, I = f`:host{box-sizing:border-box;background-color:var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1));color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;align-items:stretch;overflow:hidden;background-color:var(--calcite-color-transparent)}:host .frame{position:relative;margin:var(--calcite-space-none);display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;padding:var(--calcite-space-none);animation-name:none;animation-duration:var(--calcite-animation-timing);background-color:var(--calcite-flow-background-color)}:host ::slotted(*){block-size:100%;display:none}:host ::slotted(*[selected]){display:flex}:host .frame--advancing{animation-name:calcite-frame-advance}:host .frame--retreating{animation-name:calcite-frame-retreat}@keyframes calcite-frame-advance{0%{background-color:color-mix(in srgb,var(--calcite-flow-background-color) 50%,transparent);transform:translate3d(50px,0,0)}to{background-color:var(--calcite-flow-background-color);transform:translateZ(0)}}@keyframes calcite-frame-retreat{0%{background-color:color-mix(in srgb,var(--calcite-flow-background-color) 50%,transparent);transform:translate3d(-50px,0,0)}to{background-color:var(--calcite-flow-background-color);transform:translateZ(0)}}:host([hidden]){display:none}[hidden]{display:none}`;
function k(n) {
  return n ? `${d.item},${n}` : d.item;
}
class x extends m {
  constructor() {
    super(), this.frameRef = c(), this.defaultSlotRef = c(), this.itemMutationObserver = w("mutation", () => this.updateItemsAndProps()), this.items = [], this.selectedIndex = -1, this.focusSetter = v()(this), this.flowDirection = "standby", this.listen("calciteInternalFlowItemChange", this.handleCalciteInternalFlowItemChange), this.listen("calciteFlowItemBack", this.handleItemBackClick);
  }
  static {
    this.properties = { flowDirection: 16, customItemSelectors: 1 };
  }
  static {
    this.styles = I;
  }
  async back() {
    const { items: e, selectedIndex: a } = this, t = e[a], i = e[a - 1];
    if (!t || !i)
      return;
    const o = t.beforeBack ? t.beforeBack : () => Promise.resolve();
    try {
      await o.call(t);
    } catch {
      return;
    }
    return t.selected = !1, i.selected = !0, i;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.items[this.selectedIndex], e);
  }
  connectedCallback() {
    super.connectedCallback(), this.itemMutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  willUpdate(e) {
    e.has("flowDirection") && (this.hasUpdated || this.flowDirection !== "standby") && this.handleFlowDirectionChange(this.flowDirection);
  }
  loaded() {
    this.updateItemsAndProps();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.itemMutationObserver?.disconnect();
  }
  async handleFlowDirectionChange(e) {
    e === "standby" || !this.frameRef.value || (await p(this.frameRef.value, e === "retreating" ? "calcite-frame-retreat" : "calcite-frame-advance"), this.resetFlowDirection());
  }
  handleCalciteInternalFlowItemChange(e) {
    e.stopPropagation(), this.updateFlowProps();
  }
  async handleItemBackClick(e) {
    if (!e.defaultPrevented)
      return await this.back(), this.setFocus();
  }
  resetFlowDirection() {
    this.flowDirection = "standby";
  }
  getFlowDirection(e, a) {
    const t = e > 0;
    return !(e > -1 && a > 0) && !t ? "standby" : a < e ? "retreating" : "advancing";
  }
  updateItemsAndProps() {
    const e = k(this.customItemSelectors), a = this.defaultSlotRef.value ? b(this.defaultSlotRef.value, e) : [];
    this.items = a, this.ensureSelectedFlowItemExists(), this.updateFlowProps();
  }
  updateFlowProps() {
    const { selectedIndex: e, items: a } = this, t = this.findSelectedFlowItemIndex(a);
    a.forEach((i, o) => {
      const r = o === t;
      r || (i.menuOpen = !1), i.showBackButton = r && t > 0;
    }), t !== -1 && (e !== t && (this.flowDirection = this.getFlowDirection(e, t)), this.selectedIndex = t);
  }
  findSelectedFlowItemIndex(e) {
    const a = e.slice(0).reverse().find((t) => !!t.selected);
    return a ? e.indexOf(a) : -1;
  }
  ensureSelectedFlowItemExists() {
    const { items: e } = this;
    if (this.findSelectedFlowItemIndex(e) !== -1)
      return;
    const t = e[e.length - 1];
    t && (t.selected = !0);
  }
  render() {
    const { flowDirection: e } = this, a = {
      [s.frame]: !0,
      [s.frameAdvancing]: e === "advancing",
      [s.frameRetreating]: e === "retreating"
    };
    return u`<div class=${h(a)} ${l(this.frameRef)}><slot @slotchange=${this.updateItemsAndProps} ${l(this.defaultSlotRef)}></slot></div>`;
  }
}
g("calcite-flow", x);
export {
  x as Flow
};
