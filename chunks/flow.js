import { b as r, L as c, s as l, x as d, q as f } from "./index.js";
import { e as m, n as h } from "./ref.js";
import { c as u } from "./observers.js";
import { p } from "./dom.js";
import { u as w } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const n = {
  frame: "frame",
  frameAdvancing: "frame--advancing",
  frameRetreating: "frame--retreating"
}, g = r`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;align-items:stretch;overflow:hidden;background-color:transparent}:host .frame{position:relative;margin:0;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;padding:0;animation-name:none;animation-duration:var(--calcite-animation-timing);background-color:var(--calcite-flow-background-color)}:host ::slotted(*){display:none;block-size:100%}:host ::slotted(*[selected]){display:flex}:host ::slotted(.calcite-match-height:last-child){display:flex;flex:1 1 auto;overflow:hidden}:host .frame--advancing{animation-name:calcite-frame-advance}:host .frame--retreating{animation-name:calcite-frame-retreat}@keyframes calcite-frame-advance{0%{--tw-bg-opacity: .5;transform:translate3d(50px,0,0)}to{--tw-bg-opacity: 1;transform:translateZ(0)}}@keyframes calcite-frame-retreat{0%{--tw-bg-opacity: .5;transform:translate3d(-50px,0,0)}to{--tw-bg-opacity: 1;transform:translateZ(0)}}:host([hidden]){display:none}[hidden]{display:none}`;
class b extends c {
  constructor() {
    super(), this.frameRef = m(), this.itemMutationObserver = u("mutation", () => this.updateItemsAndProps()), this.items = [], this.selectedIndex = -1, this.focusSetter = w()(this), this.flowDirection = "standby", this.listen("calciteInternalFlowItemChange", this.handleCalciteInternalFlowItemChange), this.listen("calciteFlowItemBack", this.handleItemBackClick);
  }
  static {
    this.properties = { flowDirection: 16, customItemSelectors: 1 };
  }
  static {
    this.styles = g;
  }
  async back() {
    const { items: e, selectedIndex: i } = this, t = e[i], a = e[i - 1];
    if (!t || !a)
      return;
    const s = t.beforeBack ? t.beforeBack : () => Promise.resolve();
    try {
      await s.call(t);
    } catch {
      return;
    }
    return t.selected = !1, a.selected = !0, a;
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
  getFlowDirection(e, i) {
    const t = e > 0;
    return !(e > -1 && i > 0) && !t ? "standby" : i < e ? "retreating" : "advancing";
  }
  updateItemsAndProps() {
    const { customItemSelectors: e, el: i } = this, t = Array.from(i.querySelectorAll(`calcite-flow-item${e ? `,${e}` : ""}`)).filter((a) => a.closest("calcite-flow") === i);
    this.items = t, this.ensureSelectedFlowItemExists(), this.updateFlowProps();
  }
  updateFlowProps() {
    const { selectedIndex: e, items: i } = this, t = this.findSelectedFlowItemIndex(i);
    i.forEach((a, s) => {
      const o = s === t;
      o || (a.menuOpen = !1), a.showBackButton = o && t > 0;
    }), t !== -1 && (e !== t && (this.flowDirection = this.getFlowDirection(e, t)), this.selectedIndex = t);
  }
  findSelectedFlowItemIndex(e) {
    const i = e.slice(0).reverse().find((t) => !!t.selected);
    return e.indexOf(i);
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
      [n.frame]: !0,
      [n.frameAdvancing]: e === "advancing",
      [n.frameRetreating]: e === "retreating"
    };
    return d`<div class=${l(i)} ${h(this.frameRef)}><slot></slot></div>`;
  }
}
f("calcite-flow", b);
export {
  b as Flow
};
