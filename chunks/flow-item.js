import { a as B, L as I, d as c, s as C, E as x, x as d, c as y } from "./iframe.js";
import { n as h } from "./ref.js";
import { i as F } from "./keyed.js";
import { g as S } from "./dom.js";
import { u as E, I as P } from "./interactive.js";
import { c as T } from "./component.js";
import { S as t } from "./resources6.js";
import { u as L } from "./useT9n.js";
import { I as p, C as O, S as o } from "./resources10.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const R = B`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:none;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([selected]){display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.back-button{border-width:0px;border-style:solid;border-inline-end-width:1px;border-color:var(--calcite-flow-border-color, var(--calcite-color-border-3))}calcite-panel{--calcite-panel-background-color: var(--calcite-flow-background-color);--calcite-panel-border-color: var(--calcite-flow-border-color, var(--calcite-flow-item-header-border-block-end));--calcite-panel-corner-radius: var(--calcite-flow-corner-radius);--calcite-panel-description-text-color: var(--calcite-flow-description-text-color);--calcite-panel-footer-background-color: var(--calcite-flow-footer-background-color);--calcite-panel-footer-space: var(--calcite-flow-footer-space, var(--calcite-flow-item-footer-padding));--calcite-panel-header-action-background-color-hover: var(--calcite-flow-header-action-background-color-hover);--calcite-panel-header-action-background-color-press: var(--calcite-flow-header-action-background-color-press);--calcite-panel-header-action-background-color: var(--calcite-flow-header-action-background-color);--calcite-panel-header-action-indicator-color: var(--calcite-flow-header-action-indicator-color);--calcite-panel-header-action-text-color-press: var(--calcite-flow-header-action-text-color-press);--calcite-panel-header-action-text-color: var(--calcite-flow-header-action-text-color);--calcite-panel-header-background-color: var(--calcite-flow-header-background-color);--calcite-panel-header-content-space: var(--calcite-flow-header-content-space);--calcite-panel-heading-text-color: var(--calcite-flow-heading-text-color);--calcite-panel-icon-color: var(--calcite-flow-icon-color);--calcite-panel-space: var(--calcite-flow-space)}:host([hidden]){display:none}[hidden]{display:none}`;
class A extends I {
  constructor() {
    super(...arguments), this.messages = L(), this.closable = !1, this.closed = !1, this.collapseDirection = "down", this.collapsed = !1, this.collapsible = !1, this.disabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.menuOpen = !1, this.overlayPositioning = "absolute", this.scale = "m", this.selected = !1, this.showBackButton = !1, this.calciteFlowItemBack = c(), this.calciteFlowItemClose = c({ cancelable: !1 }), this.calciteFlowItemScroll = c({ cancelable: !1 }), this.calciteFlowItemToggle = c({ cancelable: !1 }), this.calciteInternalFlowItemChange = c({ cancelable: !1 });
  }
  static {
    this.properties = { beforeBack: 0, beforeClose: 0, closable: 7, closed: 7, collapseDirection: 1, collapsed: 7, collapsible: 7, description: 1, disabled: 7, heading: 1, headingLevel: 11, icon: 3, iconFlipRtl: 7, loading: 7, menuOpen: 7, messageOverrides: 0, overlayPositioning: 3, scale: 3, selected: 7, showBackButton: 5 };
  }
  static {
    this.styles = R;
  }
  async scrollContentTo(e) {
    await this.containerEl?.scrollContentTo(e);
  }
  async setFocus() {
    await T(this);
    const { backButtonEl: e, containerEl: l } = this;
    if (e)
      return e.setFocus();
    if (l)
      return l.setFocus();
  }
  willUpdate(e) {
    e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.calciteInternalFlowItemChange.emit();
  }
  updated() {
    E(this);
  }
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
  renderBackButton() {
    const { el: e } = this, l = S(e) === "rtl", { showBackButton: i, backButtonClick: n, messages: r } = this, a = r.back, s = l ? p.backRight : p.backLeft;
    return i ? F("flow-back-button", d`<calcite-action .ariaLabel=${a} class=${C(O.backButton)} .icon=${s} @click=${n} scale=s slot=header-actions-start .text=${a} title=${a ?? x} ${h(this.setBackRef)}></calcite-action>`) : null;
  }
  render() {
    const { collapsed: e, collapseDirection: l, collapsible: i, closable: n, closed: r, description: a, disabled: s, heading: f, headingLevel: b, loading: m, menuOpen: u, messages: g, overlayPositioning: $, beforeClose: w, icon: k, iconFlipRtl: v } = this;
    return P({ disabled: s, children: d`<calcite-panel .beforeClose=${w} .closable=${n} .closed=${r} .collapseDirection=${l} .collapsed=${e} .collapsible=${i} .description=${a} .disabled=${s} .heading=${f} .headingLevel=${b} .icon=${k} .iconFlipRtl=${v} .loading=${m} .menuOpen=${u} .messageOverrides=${g} @calcitePanelClose=${this.handleInternalPanelClose} @calcitePanelScroll=${this.handleInternalPanelScroll} @calcitePanelToggle=${this.handleInternalPanelToggle} .overlayPositioning=${$} .scale=${this.scale} ${h(this.setContainerRef)}>${this.renderBackButton()}<slot name=${o.actionBar} slot=${t.actionBar}></slot><slot name=${o.alerts} slot=${t.alerts}></slot><slot name=${o.headerActionsStart} slot=${t.headerActionsStart}></slot><slot name=${o.headerActionsEnd} slot=${t.headerActionsEnd}></slot><slot name=${o.headerContent} slot=${t.headerContent}></slot><slot name=${o.headerMenuActions} slot=${t.headerMenuActions}></slot><slot name=${o.fab} slot=${t.fab}></slot><slot name=${o.contentTop} slot=${t.contentTop}></slot><slot name=${o.contentBottom} slot=${t.contentBottom}></slot><slot name=${o.footerStart} slot=${t.footerStart}></slot><slot name=${o.footer} slot=${t.footer}></slot><slot name=${o.footerEnd} slot=${t.footerEnd}></slot><slot name=${o.footerActions} slot=${t.footerActions}></slot><slot></slot></calcite-panel>` });
  }
}
y("calcite-flow-item", A);
export {
  A as FlowItem
};
