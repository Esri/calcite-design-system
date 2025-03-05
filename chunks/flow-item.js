import { h as k, L as v, k as c, s as B, E as I, x as d, j as C } from "./iframe.js";
import { n as h } from "./ref.js";
import { i as x } from "./keyed.js";
import { g as y } from "./dom.js";
import { u as S, I as E } from "./interactive.js";
import { c as P } from "./component.js";
import { S as t } from "./resources6.js";
import { u as F } from "./useT9n.js";
import { I as p, C as T, S as o } from "./resources10.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
const L = k`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:none;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([selected]){display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.back-button{border-width:0px;border-style:solid;border-inline-end-width:1px;border-color:var(--calcite-flow-border-color, var(--calcite-color-border-3))}calcite-panel{--calcite-panel-background-color: var(--calcite-flow-background-color);--calcite-panel-border-color: var(--calcite-flow-border-color, var(--calcite-flow-item-header-border-block-end));--calcite-panel-corner-radius: var(--calcite-flow-corner-radius);--calcite-panel-description-text-color: var(--calcite-flow-description-text-color);--calcite-panel-footer-background-color: var(--calcite-flow-footer-background-color);--calcite-panel-footer-space: var(--calcite-flow-footer-space, var(--calcite-flow-item-footer-padding));--calcite-panel-header-action-background-color-hover: var(--calcite-flow-header-action-background-color-hover);--calcite-panel-header-action-background-color-press: var(--calcite-flow-header-action-background-color-press);--calcite-panel-header-action-background-color: var(--calcite-flow-header-action-background-color);--calcite-panel-header-action-indicator-color: var(--calcite-flow-header-action-indicator-color);--calcite-panel-header-action-text-color-press: var(--calcite-flow-header-action-text-color-press);--calcite-panel-header-action-text-color: var(--calcite-flow-header-action-text-color);--calcite-panel-header-background-color: var(--calcite-flow-header-background-color);--calcite-panel-header-content-space: var(--calcite-flow-header-content-space);--calcite-panel-heading-text-color: var(--calcite-flow-heading-text-color);--calcite-panel-space: var(--calcite-flow-space)}:host([hidden]){display:none}[hidden]{display:none}`;
class O extends v {
  constructor() {
    super(...arguments), this.closable = !1, this.closed = !1, this.collapseDirection = "down", this.collapsed = !1, this.collapsible = !1, this.disabled = !1, this.loading = !1, this.menuOpen = !1, this.messages = F(), this.overlayPositioning = "absolute", this.scale = "m", this.selected = !1, this.showBackButton = !1, this.calciteFlowItemBack = c(), this.calciteFlowItemClose = c({ cancelable: !1 }), this.calciteFlowItemScroll = c({ cancelable: !1 }), this.calciteFlowItemToggle = c({ cancelable: !1 }), this.calciteInternalFlowItemChange = c({ cancelable: !1 });
  }
  static {
    this.properties = { beforeBack: 0, beforeClose: 0, closable: 7, closed: 7, collapseDirection: 1, collapsed: 7, collapsible: 7, description: 1, disabled: 7, heading: 1, headingLevel: 11, loading: 7, menuOpen: 7, messageOverrides: 0, overlayPositioning: 3, scale: 3, selected: 7, showBackButton: 5 };
  }
  static {
    this.styles = L;
  }
  // #endregion
  // #region Public Methods
  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @example
   * myCalciteFlowItem.scrollContentTo({
   *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   * });
   * @param options - allows specific coordinates to be defined.
   * @returns - promise that resolves once the content is scrolled to.
   */
  async scrollContentTo(e) {
    await this.containerEl?.scrollContentTo(e);
  }
  /**
   * Sets focus on the component.
   *
   * @returns promise.
   */
  async setFocus() {
    await P(this);
    const { backButtonEl: e, containerEl: a } = this;
    if (e)
      return e.setFocus();
    if (a)
      return a.setFocus();
  }
  // #endregion
  // #region Lifecycle
  willUpdate(e) {
    e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.calciteInternalFlowItemChange.emit();
  }
  updated() {
    S(this);
  }
  // #endregion
  // #region Private Methods
  handleInternalPanelScroll(e) {
    e.target === this.containerEl && (e.stopPropagation(), this.calciteFlowItemScroll.emit());
  }
  handleInternalPanelClose(e) {
    e.target === this.containerEl && (e.stopPropagation(), this.closed = !0, this.calciteFlowItemClose.emit());
  }
  handleInternalPanelToggle(e) {
    e.target === this.containerEl && (e.stopPropagation(), this.collapsed = e.target.collapsed, this.calciteFlowItemToggle.emit());
  }
  backButtonClick() {
    this.calciteFlowItemBack.emit();
  }
  setBackRef(e) {
    this.backButtonEl = e;
  }
  setContainerRef(e) {
    this.containerEl = e;
  }
  // #endregion
  // #region Rendering
  renderBackButton() {
    const { el: e } = this, a = y(e) === "rtl", { showBackButton: i, backButtonClick: n, messages: r } = this, l = r.back, s = a ? p.backRight : p.backLeft;
    return i ? x("flow-back-button", d`<calcite-action .ariaLabel=${l} class=${B(T.backButton)} .icon=${s} @click=${n} scale=s slot=header-actions-start .text=${l} title=${l ?? I} ${h(this.setBackRef)}></calcite-action>`) : null;
  }
  render() {
    const { collapsed: e, collapseDirection: a, collapsible: i, closable: n, closed: r, description: l, disabled: s, heading: f, headingLevel: b, loading: m, menuOpen: u, messages: g, overlayPositioning: $, beforeClose: w } = this;
    return E({ disabled: s, children: d`<calcite-panel .beforeClose=${w} .closable=${n} .closed=${r} .collapseDirection=${a} .collapsed=${e} .collapsible=${i} .description=${l} .disabled=${s} .heading=${f} .headingLevel=${b} .loading=${m} .menuOpen=${u} .messageOverrides=${g} @calcitePanelClose=${this.handleInternalPanelClose} @calcitePanelScroll=${this.handleInternalPanelScroll} @calcitePanelToggle=${this.handleInternalPanelToggle} .overlayPositioning=${$} .scale=${this.scale} ${h(this.setContainerRef)}>${this.renderBackButton()}<slot name=${o.actionBar} slot=${t.actionBar}></slot><slot name=${o.alerts} slot=${t.alerts}></slot><slot name=${o.headerActionsStart} slot=${t.headerActionsStart}></slot><slot name=${o.headerActionsEnd} slot=${t.headerActionsEnd}></slot><slot name=${o.headerContent} slot=${t.headerContent}></slot><slot name=${o.headerMenuActions} slot=${t.headerMenuActions}></slot><slot name=${o.fab} slot=${t.fab}></slot><slot name=${o.contentTop} slot=${t.contentTop}></slot><slot name=${o.contentBottom} slot=${t.contentBottom}></slot><slot name=${o.footerStart} slot=${t.footerStart}></slot><slot name=${o.footer} slot=${t.footer}></slot><slot name=${o.footerEnd} slot=${t.footerEnd}></slot><slot name=${o.footerActions} slot=${t.footerActions}></slot><slot></slot></calcite-panel>` });
  }
}
C("calcite-flow-item", O);
export {
  O as FlowItem
};
