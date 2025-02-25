import { h as r, L as c, s as l, x as d, j as m } from "./iframe.js";
import { n as f } from "./ref.js";
import { c as h } from "./observers.js";
import { c as u } from "./component.js";
import { x as p } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const n = {
  frame: "frame",
  frameAdvancing: "frame--advancing",
  frameRetreating: "frame--retreating"
}, w = r`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;align-items:stretch;overflow:hidden;background-color:transparent}:host .frame{position:relative;margin:0;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;padding:0;animation-name:none;animation-duration:var(--calcite-animation-timing);background-color:var(--calcite-flow-background-color)}:host ::slotted(*){display:none;block-size:100%}:host ::slotted(*[selected]){display:flex}:host ::slotted(.calcite-match-height:last-child){display:flex;flex:1 1 auto;overflow:hidden}:host .frame--advancing{animation-name:calcite-frame-advance}:host .frame--retreating{animation-name:calcite-frame-retreat}@keyframes calcite-frame-advance{0%{--tw-bg-opacity: .5;transform:translate3d(50px,0,0)}to{--tw-bg-opacity: 1;transform:translateZ(0)}}@keyframes calcite-frame-retreat{0%{--tw-bg-opacity: .5;transform:translate3d(-50px,0,0)}to{--tw-bg-opacity: 1;transform:translateZ(0)}}:host([hidden]){display:none}[hidden]{display:none}`;
class g extends c {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.itemMutationObserver = h("mutation", () => this.updateItemsAndProps()), this.items = [], this.selectedIndex = -1, this.flowDirection = "standby", this.listen("calciteInternalFlowItemChange", this.handleCalciteInternalFlowItemChange), this.listen("calciteFlowItemBack", this.handleItemBackClick);
  }
  static {
    this.properties = { flowDirection: 16, customItemSelectors: 1 };
  }
  static {
    this.styles = w;
  }
  // #endregion
  // #region Public Methods
  /**
   * Removes the currently active `calcite-flow-item`.
   *
   * @returns Promise<HTMLCalciteFlowItemElement | FlowItemLikeElement>
   */
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
  /**
   * Sets focus on the component.
   *
   * @returns Promise<void>
   */
  async setFocus() {
    await u(this);
    const { items: e } = this;
    return e[this.selectedIndex]?.setFocus();
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
  // #endregion
  // #region Private Methods
  async handleFlowDirectionChange(e) {
    e !== "standby" && (await p(this.frameEl, e === "retreating" ? "calcite-frame-retreat" : "calcite-frame-advance"), this.resetFlowDirection());
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
  setFrameEl(e) {
    this.frameEl = e;
  }
  // #endregion
  // #region Rendering
  render() {
    const { flowDirection: e } = this, i = {
      [n.frame]: !0,
      [n.frameAdvancing]: e === "advancing",
      [n.frameRetreating]: e === "retreating"
    };
    return d`<div class=${l(i)} ${f(this.setFrameEl)}><slot></slot></div>`;
  }
}
m("calcite-flow", g);
export {
  g as Flow
};
