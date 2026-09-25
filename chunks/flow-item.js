/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as C, L as F, c as a, A as S, s as x, b as d, d as E } from "./index.js";
import { i as P } from "./keyed.js";
import { e as h, n as p } from "./ref.js";
import { u as R } from "./index2.js";
import { S as o } from "./resources14.js";
import { u as O } from "./useT9n.js";
import { u as L } from "./useInteractive.js";
const A = {
  backButton: "back-button"
}, f = {
  backLeft: "chevron-left",
  backRight: "chevron-right"
}, t = {
  actionBar: "action-bar",
  alerts: "alerts",
  contentTop: "content-top",
  contentBottom: "content-bottom",
  headerTop: "header-top",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  description: "description",
  heading: "heading",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerEnd: "footer-end",
  footerStart: "footer-start"
}, D = C`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:none;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([selected]){display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-panel{--calcite-panel-background-color: var(--calcite-flow-background-color);--calcite-panel-border-color: var(--calcite-flow-border-color, var(--calcite-flow-item-header-border-block-end));--calcite-panel-corner-radius: var(--calcite-flow-corner-radius);--calcite-panel-description-text-color: var(--calcite-flow-description-text-color);--calcite-panel-footer-background-color: var(--calcite-flow-footer-background-color);--calcite-panel-footer-space: var(--calcite-flow-footer-space, var(--calcite-flow-item-footer-padding));--calcite-panel-header-action-background-color-hover: var(--calcite-flow-header-action-background-color-hover);--calcite-panel-header-action-background-color-press: var(--calcite-flow-header-action-background-color-press);--calcite-panel-header-action-background-color: var(--calcite-flow-header-action-background-color);--calcite-panel-header-action-indicator-color: var(--calcite-flow-header-action-indicator-color);--calcite-panel-header-action-text-color-press: var(--calcite-flow-header-action-text-color-press);--calcite-panel-header-action-text-color: var(--calcite-flow-header-action-text-color);--calcite-panel-header-background-color: var(--calcite-flow-header-background-color);--calcite-panel-header-content-space: var(--calcite-flow-header-content-space);--calcite-panel-header-top-space: var(--calcite-flow-header-top-space);--calcite-panel-heading-text-color: var(--calcite-flow-heading-text-color);--calcite-panel-icon-color: var(--calcite-flow-icon-color);--calcite-panel-space: var(--calcite-flow-space);--calcite-panel-content-top-space: var(--calcite-flow-content-top-space);--calcite-panel-content-bottom-space: var(--calcite-flow-content-bottom-space)}:host([hidden]){display:none}[hidden]{display:none}`;
class b extends F {
  constructor() {
    super(...arguments), this.backButtonRef = h(), this.containerRef = h(), this.direction = R(), this.messages = O(), this.interactiveContainer = L(this), this.closable = !1, this.closed = !1, this.collapseDirection = "down", this.collapsed = !1, this.collapsible = !1, this.disabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.focusTrapEnabled = !1, this.menuOpen = !1, this.overlayPositioning = "absolute", this.scale = "m", this.selected = !1, this.showBackButton = !1, this.topLayerDisabled = !1, this.calciteFlowItemBack = a(), this.calciteFlowItemClose = a({ cancelable: !1 }), this.calciteFlowItemCollapse = a({ cancelable: !1 }), this.calciteFlowItemExpand = a({ cancelable: !1 }), this.calciteFlowItemScroll = a({ cancelable: !1 }), this.calciteFlowItemToggle = a({ cancelable: !1 }), this.calciteInternalFlowItemChange = a({ cancelable: !1 });
  }
  static {
    this.properties = { beforeBack: 0, beforeClose: 0, closable: 7, closed: 7, collapseDirection: 1, collapsed: 7, collapsible: 7, description: 1, disabled: 7, heading: 1, headingLevel: 11, icon: 3, iconFlipRtl: 7, loading: 7, focusTrapEnabled: 7, focusTrapOptions: 0, menuOpen: 7, messageOverrides: 0, overlayPositioning: 3, scale: 3, selected: 7, showBackButton: 5, topLayerDisabled: 7 };
  }
  static {
    this.styles = D;
  }
  async scrollContentTo(e) {
    await this.containerRef.value?.scrollContentTo(e);
  }
  async setFocus(e) {
    return this.containerRef.value?.setFocus(e);
  }
  async updateFocusTrapElements(e) {
    this.containerRef.value?.updateFocusTrapElements(e);
  }
  willUpdate(e) {
    e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.calciteInternalFlowItemChange.emit(), e.has("collapsed") && this.hasUpdated && (this.collapsed ? this.calciteFlowItemCollapse.emit() : this.calciteFlowItemExpand.emit());
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
    const e = this.direction === "rtl", { showBackButton: c, backButtonClick: s, messages: i } = this, l = i.back, n = e ? f.backRight : f.backLeft;
    return c ? P("flow-back-button", d`<calcite-action class=${x(A.backButton)} .icon=${n} @click=${s} .scale=${this.scale} slot=${t.headerActionsStart} .text=${l} title=${l ?? S} ${p(this.backButtonRef)}></calcite-action>`) : null;
  }
  render() {
    const { collapsed: e, collapseDirection: c, collapsible: s, closable: i, closed: l, description: n, disabled: r, heading: u, headingLevel: m, loading: g, menuOpen: $, messageOverrides: v, overlayPositioning: w, beforeClose: k, icon: I, iconFlipRtl: T, focusTrapEnabled: y, focusTrapOptions: B } = this;
    return this.interactiveContainer({ disabled: r, children: d`<calcite-panel .beforeClose=${k} .closable=${i} .closed=${l} .collapsed=${e} .collapseDirection=${c} .collapsible=${s} .description=${n} .disabled=${r} .focusTrapEnabled=${y} .focusTrapOptions=${B} .heading=${u} .headingLevel=${m} .icon=${I} .iconFlipRtl=${T} .loading=${g} .menuOpen=${$} .messageOverrides=${v} @calcitePanelClose=${this.handleInternalPanelClose} @calcitePanelScroll=${this.handleInternalPanelScroll} @calcitePanelToggle=${this.handleInternalPanelToggle} .overlayPositioning=${w} .scale=${this.scale} .topLayerDisabled=${this.topLayerDisabled} ${p(this.containerRef)}>${this.renderBackButton()}<slot name=${t.actionBar} slot=${o.actionBar}></slot><slot name=${t.alerts} slot=${o.alerts}></slot><slot name=${t.headerActionsStart} slot=${o.headerActionsStart}></slot><slot name=${t.headerActionsEnd} slot=${o.headerActionsEnd}></slot><slot name=${t.headerTop} slot=${o.headerTop}></slot><slot name=${t.description} slot=${o.description}></slot><slot name=${t.heading} slot=${o.heading}></slot><slot name=${t.headerContent} slot=${o.headerContent}></slot><slot name=${t.headerMenuActions} slot=${o.headerMenuActions}></slot><slot name=${t.fab} slot=${o.fab}></slot><slot name=${t.contentTop} slot=${o.contentTop}></slot><slot name=${t.contentBottom} slot=${o.contentBottom}></slot><slot name=${t.footerStart} slot=${o.footerStart}></slot><slot name=${t.footer} slot=${o.footer}></slot><slot name=${t.footerEnd} slot=${o.footerEnd}></slot><slot></slot></calcite-panel>` });
  }
}
E("calcite-flow-item", b);
const H = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FlowItem: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  t as S,
  H as f
};
