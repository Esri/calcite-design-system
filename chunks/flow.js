/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as m, L as f, s as h, b as u, d as p } from "./index.js";
import { e as c, n as l } from "./ref.js";
import { B as g, a as w } from "./dom.js";
import { c as b } from "./observers.js";
import { u as v } from "./useSetFocus.js";
const o = {
  frame: "frame",
  frameAdvancing: "frame--advancing",
  frameRetreating: "frame--retreating"
}, d = {
  item: "calcite-flow-item"
}, I = m`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;align-items:stretch;overflow:hidden;background-color:transparent}:host .frame{position:relative;margin:0;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;padding:0;animation-name:none;animation-duration:var(--calcite-animation-timing);background-color:var(--calcite-flow-background-color)}:host ::slotted(*){display:none;block-size:100%}:host ::slotted(*[selected]){display:flex}:host .frame--advancing{animation-name:calcite-frame-advance}:host .frame--retreating{animation-name:calcite-frame-retreat}@keyframes calcite-frame-advance{0%{--tw-bg-opacity: .5;transform:translate3d(50px,0,0)}to{--tw-bg-opacity: 1;transform:translateZ(0)}}@keyframes calcite-frame-retreat{0%{--tw-bg-opacity: .5;transform:translate3d(-50px,0,0)}to{--tw-bg-opacity: 1;transform:translateZ(0)}}:host([hidden]){display:none}[hidden]{display:none}`;
function x(a) {
  return a ? `${d.item},${a}` : d.item;
}
class y extends f {
  constructor() {
    super(), this.frameRef = c(), this.defaultSlotRef = c(), this.itemMutationObserver = b("mutation", () => this.updateItemsAndProps()), this.items = [], this.selectedIndex = -1, this.focusSetter = v()(this), this.flowDirection = "standby", this.listen("calciteInternalFlowItemChange", this.handleCalciteInternalFlowItemChange), this.listen("calciteFlowItemBack", this.handleItemBackClick);
  }
  static {
    this.properties = { flowDirection: 16, customItemSelectors: 1 };
  }
  static {
    this.styles = I;
  }
  async back() {
    const { items: e, selectedIndex: i } = this, t = e[i], s = e[i - 1];
    if (!t || !s)
      return;
    const n = t.beforeBack ? t.beforeBack : () => Promise.resolve();
    try {
      await n.call(t);
    } catch {
      return;
    }
    return t.selected = !1, s.selected = !0, s;
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
    e === "standby" || !this.frameRef.value || (await g(this.frameRef.value, e === "retreating" ? "calcite-frame-retreat" : "calcite-frame-advance"), this.resetFlowDirection());
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
  getFlowDirection(e, i) {
    const t = e > 0;
    return !(e > -1 && i > 0) && !t ? "standby" : i < e ? "retreating" : "advancing";
  }
  updateItemsAndProps() {
    const e = x(this.customItemSelectors), i = this.defaultSlotRef.value ? w(this.defaultSlotRef.value, e) : [];
    this.items = i, this.ensureSelectedFlowItemExists(), this.updateFlowProps();
  }
  updateFlowProps() {
    const { selectedIndex: e, items: i } = this, t = this.findSelectedFlowItemIndex(i);
    i.forEach((s, n) => {
      const r = n === t;
      r || (s.menuOpen = !1), s.showBackButton = r && t > 0;
    }), t !== -1 && (e !== t && (this.flowDirection = this.getFlowDirection(e, t)), this.selectedIndex = t);
  }
  findSelectedFlowItemIndex(e) {
    const i = e.slice(0).reverse().find((t) => !!t.selected);
    return i ? e.indexOf(i) : -1;
  }
  ensureSelectedFlowItemExists() {
    const { items: e } = this;
    if (this.findSelectedFlowItemIndex(e) !== -1)
      return;
    const t = e[e.length - 1];
    t && (t.selected = !0);
  }
  render() {
    const { flowDirection: e } = this, i = {
      [o.frame]: !0,
      [o.frameAdvancing]: e === "advancing",
      [o.frameRetreating]: e === "retreating"
    };
    return u`<div class=${h(i)} ${l(this.frameRef)}><slot @slotchange=${this.updateItemsAndProps} ${l(this.defaultSlotRef)}></slot></div>`;
  }
}
p("calcite-flow", y);
export {
  y as Flow
};
