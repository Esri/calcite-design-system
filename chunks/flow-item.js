import { b as x, L as B, c as l, s as C, E as S, x as d, q as F } from "./index.js";
import { i as y } from "./keyed.js";
import { e as h, n as p } from "./ref.js";
import { a as P } from "./dom.js";
import { u as R, I as T } from "./interactive.js";
import { S as o } from "./resources7.js";
import { u as E } from "./useT9n.js";
import { u as A } from "./useSetFocus.js";
import { I as f, S as t, C as L } from "./resources11.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const O = x`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:none;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([selected]){display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.back-button{border-width:0px;border-style:solid;border-inline-end-width:1px;border-color:var(--calcite-flow-border-color, var(--calcite-color-border-3))}calcite-panel{--calcite-panel-background-color: var(--calcite-flow-background-color);--calcite-panel-border-color: var(--calcite-flow-border-color, var(--calcite-flow-item-header-border-block-end));--calcite-panel-corner-radius: var(--calcite-flow-corner-radius);--calcite-panel-description-text-color: var(--calcite-flow-description-text-color);--calcite-panel-footer-background-color: var(--calcite-flow-footer-background-color);--calcite-panel-footer-space: var(--calcite-flow-footer-space, var(--calcite-flow-item-footer-padding));--calcite-panel-header-action-background-color-hover: var(--calcite-flow-header-action-background-color-hover);--calcite-panel-header-action-background-color-press: var(--calcite-flow-header-action-background-color-press);--calcite-panel-header-action-background-color: var(--calcite-flow-header-action-background-color);--calcite-panel-header-action-indicator-color: var(--calcite-flow-header-action-indicator-color);--calcite-panel-header-action-text-color-press: var(--calcite-flow-header-action-text-color-press);--calcite-panel-header-action-text-color: var(--calcite-flow-header-action-text-color);--calcite-panel-header-background-color: var(--calcite-flow-header-background-color);--calcite-panel-header-content-space: var(--calcite-flow-header-content-space);--calcite-panel-heading-text-color: var(--calcite-flow-heading-text-color);--calcite-panel-icon-color: var(--calcite-flow-icon-color);--calcite-panel-space: var(--calcite-flow-space)}:host([hidden]){display:none}[hidden]{display:none}`;
class z extends B {
  constructor() {
    super(...arguments), this.backButtonRef = h(), this.containerRef = h(), this.messages = E(), this.focusSetter = A()(this), this.closable = !1, this.closed = !1, this.collapseDirection = "down", this.collapsed = !1, this.collapsible = !1, this.disabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.menuOpen = !1, this.overlayPositioning = "absolute", this.scale = "m", this.selected = !1, this.showBackButton = !1, this.calciteFlowItemBack = l(), this.calciteFlowItemClose = l({ cancelable: !1 }), this.calciteFlowItemCollapse = l({ cancelable: !1 }), this.calciteFlowItemExpand = l({ cancelable: !1 }), this.calciteFlowItemScroll = l({ cancelable: !1 }), this.calciteFlowItemToggle = l({ cancelable: !1 }), this.calciteInternalFlowItemChange = l({ cancelable: !1 });
  }
  static {
    this.properties = { beforeBack: 0, beforeClose: 0, closable: 7, closed: 7, collapseDirection: 1, collapsed: 7, collapsible: 7, description: 1, disabled: 7, heading: 1, headingLevel: 11, icon: [3, { type: String }], iconFlipRtl: 7, loading: 7, menuOpen: 7, messageOverrides: 0, overlayPositioning: 3, scale: 3, selected: 7, showBackButton: 5 };
  }
  static {
    this.styles = O;
  }
  async scrollContentTo(e) {
    await this.containerRef.value?.scrollContentTo(e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.backButtonRef.value || this.containerRef.value, e);
  }
  willUpdate(e) {
    e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.calciteInternalFlowItemChange.emit(), e.has("collapsed") && this.hasUpdated && (this.collapsed ? this.calciteFlowItemCollapse.emit() : this.calciteFlowItemExpand.emit());
  }
  updated() {
    R(this);
  }
  handleInternalPanelScroll(e) {
    e.target === this.containerRef.value && (e.stopPropagation(), this.calciteFlowItemScroll.emit());
  }
  handleInternalPanelClose(e) {
    e.target === this.containerRef.value && (e.stopPropagation(), this.closed = !0, this.calciteFlowItemClose.emit());
  }
  handleInternalPanelToggle(e) {
    e.target === this.containerRef.value && (e.stopPropagation(), this.collapsed = e.target.collapsed, this.calciteFlowItemToggle.emit());
  }
  backButtonClick() {
    this.calciteFlowItemBack.emit();
  }
  renderBackButton() {
    const { el: e } = this, i = P(e) === "rtl", { showBackButton: s, backButtonClick: n, messages: r } = this, a = r.back, c = i ? f.backRight : f.backLeft;
    return s ? y("flow-back-button", d`<calcite-action .ariaLabel=${a} class=${C(L.backButton)} .icon=${c} @click=${n} scale=s slot=${t.headerActionsStart} .text=${a} title=${a ?? S} ${p(this.backButtonRef)}></calcite-action>`) : null;
  }
  render() {
    const { collapsed: e, collapseDirection: i, collapsible: s, closable: n, closed: r, description: a, disabled: c, heading: b, headingLevel: u, loading: m, menuOpen: g, messages: $, overlayPositioning: w, beforeClose: v, icon: k, iconFlipRtl: I } = this;
    return T({ disabled: c, children: d`<calcite-panel .beforeClose=${v} .closable=${n} .closed=${r} .collapseDirection=${i} .collapsed=${e} .collapsible=${s} .description=${a} .disabled=${c} .heading=${b} .headingLevel=${u} .icon=${k} .iconFlipRtl=${I} .loading=${m} .menuOpen=${g} .messageOverrides=${$} @calcitePanelClose=${this.handleInternalPanelClose} @calcitePanelScroll=${this.handleInternalPanelScroll} @calcitePanelToggle=${this.handleInternalPanelToggle} .overlayPositioning=${w} .scale=${this.scale} ${p(this.containerRef)}>${this.renderBackButton()}<slot name=${t.actionBar} slot=${o.actionBar}></slot><slot name=${t.alerts} slot=${o.alerts}></slot><slot name=${t.headerActionsStart} slot=${o.headerActionsStart}></slot><slot name=${t.headerActionsEnd} slot=${o.headerActionsEnd}></slot><slot name=${t.headerContent} slot=${o.headerContent}></slot><slot name=${t.headerMenuActions} slot=${o.headerMenuActions}></slot><slot name=${t.fab} slot=${o.fab}></slot><slot name=${t.contentTop} slot=${o.contentTop}></slot><slot name=${t.contentBottom} slot=${o.contentBottom}></slot><slot name=${t.footerStart} slot=${o.footerStart}></slot><slot name=${t.footer} slot=${o.footer}></slot><slot name=${t.footerEnd} slot=${o.footerEnd}></slot><slot name=${t.footerActions} slot=${o.footerActions}></slot><slot></slot></calcite-panel>` });
  }
}
F("calcite-flow-item", z);
export {
  z as FlowItem
};
