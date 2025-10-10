import { b as w, L as E, c as m, s as o, x as n, E as x, q as F } from "./index.js";
import { i as g } from "./keyed.js";
import { e as z, n as S } from "./ref.js";
import { s, d as y } from "./dom.js";
import { u as P, I as B } from "./interactive.js";
import { g as T } from "./component.js";
import { c as N, u as I } from "./observers.js";
import { S as M } from "./resources3.js";
import { H as O } from "./Heading.js";
import { a as L } from "./floating-ui.js";
import { u as R } from "./useT9n.js";
import { u as j } from "./useSetFocus.js";
import { s as D } from "./header.js";
import { C as t, S as c, I as v, a as A } from "./resources7.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const _ = w`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;overflow:hidden;border-radius:var(--calcite-panel-corner-radius, var(--calcite-corner-radius-sharp))}slot[name=alerts]::slotted(calcite-alert){block-size:0}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-internal-panel-default-space: var(--calcite-spacing-sm);--calcite-internal-panel-header-vertical-padding: var(--calcite-spacing-sm-plus)}:host([scale=s]) .header-content .heading{font-size:var(--calcite-font-size--1)}:host([scale=s]) .header-content .description{font-size:var(--calcite-font-size--2)}:host([scale=s]) .header-content .icon{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]){--calcite-internal-panel-default-space: var(--calcite-spacing-md);--calcite-internal-panel-header-vertical-padding: var(--calcite-spacing-md-plus)}:host([scale=m]) .header-content .heading{font-size:var(--calcite-font-size-0)}:host([scale=m]) .header-content .description{font-size:var(--calcite-font-size--1)}:host([scale=m]) .header-content .icon{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]){--calcite-internal-panel-default-space: var(--calcite-spacing-lg);--calcite-internal-panel-header-vertical-padding: var(--calcite-spacing-xl)}:host([scale=l]) .header-content .heading{font-size:var(--calcite-font-size-1)}:host([scale=l]) .header-content .description{font-size:var(--calcite-font-size-0)}:host([scale=l]) .header-content .icon{margin-inline-end:var(--calcite-spacing-lg)}.content-top,.content-bottom{display:flex;align-items:flex-start;align-self:stretch;padding:var(--calcite-internal-panel-default-space);border-block-start:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3));background-color:var(--calcite-panel-background-color, var(--calcite-color-foreground-1))}.container{position:relative;margin:0;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;overflow:hidden;background-color:var(--calcite-color-background);padding:0;color:var(--calcite-color-text-2);transition:max-block-size var(--calcite-animation-timing),inline-size var(--calcite-animation-timing);box-sizing:border-box;font-size:var(--calcite-font-size--1)}.container *{box-sizing:border-box}.header{z-index:var(--calcite-z-index-header);display:flex;flex-direction:column;background-color:var(--calcite-panel-header-background-color, var(--calcite-color-foreground-1));border-block-end:1px solid var(--calcite-panel-border-color, var(--calcite-panel-header-border-block-end, var(--calcite-color-border-3)))}.header-container{display:flex;inline-size:100%;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:0 0 auto}.header-container--border-end{border-block-end:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3))}.action-bar-container{inline-size:100%}.action-bar-container ::slotted(calcite-action-bar){inline-size:100%}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:.75rem;padding-block:.875rem;margin-inline-end:auto;justify-content:center}.header-content .heading-text-content{flex:1 1 auto;overflow:hidden}.header-content .heading,.header-content .description{display:block;flex:none;overflow-wrap:break-word;padding:0;line-height:var(--calcite-font-line-height-relative-snug)}.header-content .heading{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-panel-heading-text-color, var(--calcite-color-text-1))}.header-content .heading:only-child{margin-block-end:0px}.header-content .description{color:var(--calcite-panel-description-text-color, var(--calcite-color-text-2))}#close,#collapse,.back-button,calcite-action-menu{--calcite-action-background-color: var(--calcite-panel-header-action-background-color);--calcite-action-background-color-hover: var(--calcite-panel-header-action-background-color-hover);--calcite-action-background-color-press: var(--calcite-panel-header-action-background-color-press);--calcite-action-text-color: var(--calcite-panel-header-action-text-color);--calcite-action-text-color-press: var(--calcite-panel-header-action-text-color-press)}.back-button{border-width:0px;border-style:solid;border-inline-end-width:1px;border-color:var(--calcite-panel-border-color, var(--calcite-color-border-3))}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{margin-inline-start:auto}.content-wrapper{position:relative;display:flex;block-size:100%;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;overflow:auto;color:var(--calcite-color-text-2);outline-color:transparent;padding:var(--calcite-panel-space, var(--calcite-panel-content-space, 0));background:var(--calcite-panel-background-color, var(--calcite-color-background))}.content-wrapper:focus-visible{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.header-content{flex:1 1 auto;justify-content:center;padding-block:var(--calcite-internal-panel-header-vertical-padding);padding-inline:var(--calcite-internal-panel-default-space)}.header-content.header--slotted-content{padding:var(--calcite-panel-header-content-space, var(--calcite-internal-panel-header-vertical-padding) var(--calcite-internal-panel-default-space))}.header-content.header--non-slotted-content{align-items:center;flex-direction:row}.footer{margin-block-start:auto;display:flex;flex-direction:row;align-content:space-between;align-items:center;justify-content:center;font-size:var(--calcite-font-size--2);line-height:1.375;border-block-start:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3));padding:var(--calcite-panel-footer-space, var(--calcite-panel-footer-padding, var(--calcite-internal-panel-default-space)));background-color:var(--calcite-panel-footer-background-color, var(--calcite-color-foreground-1))}.footer-content{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:center}.footer-actions{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:space-evenly;gap:var(--calcite-internal-panel-default-space)}.footer-start{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-start;margin-inline-end:auto;gap:var(--calcite-internal-panel-default-space)}.footer-end{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-end;margin-inline-start:auto;gap:var(--calcite-internal-panel-default-space)}.fab-container{position:sticky;inset-block-end:0px;z-index:var(--calcite-z-index-sticky);margin-block:0px;margin-inline:auto;display:block;padding:.5rem;inset-inline:0;inline-size:fit-content}calcite-icon{--calcite-icon-color: var(--calcite-panel-icon-color, var(--calcite-color-text-1))}:host([hidden]){display:none}[hidden]{display:none}`;
class K extends E {
  constructor() {
    super(), this.containerRef = z(), this.resizeObserver = N("resize", () => this.resizeHandler()), this.messages = R(), this._closed = !1, this.focusSetter = j()(this), this.hasActionBar = !1, this.hasContentBottom = !1, this.hasContentTop = !1, this.hasEndActions = !1, this.hasFab = !1, this.hasFooterActions = !1, this.hasFooterContent = !1, this.hasFooterEndContent = !1, this.hasFooterStartContent = !1, this.hasHeaderContent = !1, this.hasMenuItems = !1, this.hasStartActions = !1, this.showHeaderContent = !1, this.closable = !1, this.collapseDirection = "down", this.collapsed = !1, this.collapsible = !1, this.disabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.menuOpen = !1, this.menuPlacement = L, this.overlayPositioning = "absolute", this.scale = "m", this.calcitePanelClose = m({ cancelable: !0 }), this.calcitePanelCollapse = m({ cancelable: !1 }), this.calcitePanelExpand = m({ cancelable: !1 }), this.calcitePanelScroll = m({ cancelable: !1 }), this.calcitePanelToggle = m({ cancelable: !1 }), this.listen("keydown", this.panelKeyDownHandler), this.listen("calcitePanelClose", this.panelCloseHandler);
  }
  static {
    this.properties = { hasActionBar: 16, hasContentBottom: 16, hasContentTop: 16, hasEndActions: 16, hasFab: 16, hasFooterActions: 16, hasFooterContent: 16, hasFooterEndContent: 16, hasFooterStartContent: 16, hasHeaderContent: 16, hasMenuItems: 16, hasStartActions: 16, showHeaderContent: 16, beforeClose: 0, closable: 7, closed: 7, collapseDirection: 1, collapsed: 7, collapsible: 7, description: 1, disabled: 7, heading: 1, headingLevel: 11, icon: [3, { type: String }], iconFlipRtl: 7, loading: 7, menuFlipPlacements: 0, menuOpen: 7, menuPlacement: 3, messageOverrides: 0, overlayPositioning: 3, scale: 3 };
  }
  static {
    this.styles = [D, _];
  }
  get closed() {
    return this._closed;
  }
  set closed(e) {
    const a = this._closed;
    e !== a && this.setClosedState(e);
  }
  async scrollContentTo(e) {
    this.panelScrollEl?.scrollTo(e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.containerRef.value, e);
  }
  willUpdate(e) {
    e.has("collapsed") && this.hasUpdated && (this.collapsed ? this.calcitePanelCollapse.emit() : this.calcitePanelExpand.emit());
  }
  updated() {
    P(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  async setClosedState(e) {
    if (this.beforeClose && e)
      try {
        await this.beforeClose?.();
      } catch {
        return;
      }
    this._closed = e;
  }
  resizeHandler() {
    const { panelScrollEl: e } = this;
    if (!e || typeof e.scrollHeight != "number" || typeof e.offsetHeight != "number")
      return;
    e.scrollHeight > e.offsetHeight ? e.setAttribute("tabindex", "0") : e.removeAttribute("tabindex");
  }
  closeClickHandler() {
    this.emitCloseEvent();
  }
  emitCloseEvent() {
    this.calcitePanelClose.emit();
  }
  panelKeyDownHandler(e) {
    this.closable && e.key === "Escape" && !e.defaultPrevented && (this.emitCloseEvent(), e.preventDefault());
  }
  panelCloseHandler(e) {
    e.defaultPrevented || e.target !== this.el || (this.closed = !0);
  }
  collapse() {
    this.collapsed = !this.collapsed, this.calcitePanelToggle.emit();
  }
  panelScrollHandler() {
    this.calcitePanelScroll.emit();
  }
  handleHeaderActionsStartSlotChange(e) {
    this.hasStartActions = s(e);
  }
  handleHeaderActionsEndSlotChange(e) {
    this.hasEndActions = s(e);
  }
  handleHeaderMenuActionsSlotChange(e) {
    this.hasMenuItems = s(e);
  }
  handleActionBarSlotChange(e) {
    const a = y(e).filter((l) => l?.matches("calcite-action-bar"));
    a.forEach((l) => l.layout = "horizontal"), this.hasActionBar = !!a.length;
  }
  handleHeaderContentSlotChange(e) {
    this.hasHeaderContent = s(e);
  }
  handleFabSlotChange(e) {
    this.hasFab = s(e);
  }
  handleFooterActionsSlotChange(e) {
    this.hasFooterActions = s(e);
  }
  handleFooterEndSlotChange(e) {
    this.hasFooterEndContent = s(e);
  }
  handleFooterStartSlotChange(e) {
    this.hasFooterStartContent = s(e);
  }
  handleFooterSlotChange(e) {
    this.hasFooterContent = s(e);
  }
  contentBottomSlotChangeHandler(e) {
    this.hasContentBottom = s(e);
  }
  contentTopSlotChangeHandler(e) {
    this.hasContentTop = s(e);
  }
  setPanelScrollEl(e) {
    I(this.resizeObserver, this.panelScrollEl, e), this.panelScrollEl = e;
  }
  handleAlertsSlotChange(e) {
    y(e)?.map((a) => {
      a.nodeName === "CALCITE-ALERT" && (a.embedded = !0);
    });
  }
  renderHeaderContent() {
    const { heading: e, headingLevel: a, description: l, hasHeaderContent: i, icon: r, scale: u } = this, h = r ? n`<calcite-icon class=${o(t.icon)} .flipRtl=${this.iconFlipRtl} .icon=${r} .scale=${T(u)}></calcite-icon>` : null, d = e ? O({ class: t.heading, level: a, children: e }) : null, p = l ? n`<span class=${o(t.description)}>${l}</span>` : null;
    return !i && (d || p) ? g("header-content", n`<div class=${o({ [t.headerContent]: !0, [t.headerNonSlottedContent]: !0 })}>${h}<div class=${o(t.headingTextContent)}>${d}${p}</div></div>`) : null;
  }
  renderActionBar() {
    return n`<div class=${o(t.actionBarContainer)} .hidden=${!this.hasActionBar}><slot name=${c.actionBar} @slotchange=${this.handleActionBarSlotChange}></slot></div>`;
  }
  renderHeaderSlottedContent() {
    return g("slotted-header-content", n`<div class=${o({ [t.headerContent]: !0, [t.headerSlottedContent]: !0 })} .hidden=${!this.hasHeaderContent}><slot name=${c.headerContent} @slotchange=${this.handleHeaderContentSlotChange}></slot></div>`);
  }
  renderHeaderStartActions() {
    const { hasStartActions: e } = this;
    return g("header-actions-start", n`<div class=${o({ [t.headerActionsStart]: !0, [t.headerActions]: !0 })} .hidden=${!e}><slot name=${c.headerActionsStart} @slotchange=${this.handleHeaderActionsStartSlotChange}></slot></div>`);
  }
  renderHeaderActionsEnd() {
    const { hasEndActions: e, messages: a, closable: l, collapsed: i, collapseDirection: r, collapsible: u, hasMenuItems: h } = this, { collapse: d, expand: p, close: f } = a, b = [v.expand, v.collapse];
    r === "up" && b.reverse();
    const $ = u ? n`<calcite-action .aria=${{ expanded: !i }} .icon=${i ? b[0] : b[1]} id=${A.collapse} .label=${d} @click=${this.collapse} .scale=${this.scale} .text=${d} title=${(i ? p : d) ?? x}></calcite-action>` : null, C = l ? n`<calcite-action .ariaLabel=${f} .icon=${v.close} id=${A.close} @click=${this.closeClickHandler} .scale=${this.scale} .text=${f} title=${f ?? x}></calcite-action>` : null, H = n`<slot name=${c.headerActionsEnd} @slotchange=${this.handleHeaderActionsEndSlotChange}></slot>`, k = e || $ || C || h;
    return g("header-actions-end", n`<div class=${o({ [t.headerActionsEnd]: !0, [t.headerActions]: !0 })} .hidden=${!k}>${H}${this.renderMenu()}${$}${C}</div>`);
  }
  renderMenu() {
    const { hasMenuItems: e, messages: a, menuOpen: l, menuFlipPlacements: i, menuPlacement: r } = this;
    return g("menu", n`<calcite-action-menu .flipPlacements=${i ?? ["top", "bottom"]} .hidden=${!e} .label=${a.options} .open=${l} .overlayPositioning=${this.overlayPositioning} .placement=${r}><calcite-action class=${o(t.menuAction)} .icon=${v.menu} .scale=${this.scale} slot=${M.trigger} .text=${a.options}></calcite-action><slot name=${c.headerMenuActions} @slotchange=${this.handleHeaderMenuActionsSlotChange}></slot></calcite-action-menu>`);
  }
  renderHeaderNode() {
    const { hasHeaderContent: e, hasStartActions: a, hasEndActions: l, closable: i, collapsible: r, hasMenuItems: u, hasActionBar: h, hasContentTop: d } = this, p = this.renderHeaderContent(), f = e || !!p || a || l || r || i || u || h || d;
    return this.showHeaderContent = f, n`<header class=${o(t.header)} .hidden=${!(f || h || d)}><div class=${o({ [t.headerContainer]: !0, [t.headerContainerBorderEnd]: h })} .hidden=${!f}>${this.renderHeaderStartActions()}${this.renderHeaderSlottedContent()}${p}${this.renderHeaderActionsEnd()}</div>${this.renderActionBar()}${this.renderContentTop()}</header>`;
  }
  renderFooterNode() {
    const { hasFooterEndContent: e, hasFooterStartContent: a, hasFooterContent: l, hasFooterActions: i } = this, r = a || e || l || i;
    return n`<footer class=${o(t.footer)} .hidden=${!r}><div class=${o(t.footerContent)} .hidden=${!l}><slot name=${c.footer} @slotchange=${this.handleFooterSlotChange}></slot></div><div class=${o(t.footerStart)} .hidden=${l || !a}><slot name=${c.footerStart} @slotchange=${this.handleFooterStartSlotChange}></slot></div><div class=${o(t.footerEnd)} .hidden=${l || !e}><slot name=${c.footerEnd} @slotchange=${this.handleFooterEndSlotChange}></slot></div><div class=${o(t.footerActions)} .hidden=${l || !i}>${g("footer-actions-slot", n`<slot name=${c.footerActions} @slotchange=${this.handleFooterActionsSlotChange}></slot>`)}</div></footer>`;
  }
  renderContent() {
    return n`<div class=${o(t.contentWrapper)} .hidden=${this.collapsible && this.collapsed} @scroll=${this.panelScrollHandler} ${S(this.setPanelScrollEl)}><slot></slot>${this.renderFab()}</div>`;
  }
  renderContentBottom() {
    return n`<div class=${o(t.contentBottom)} .hidden=${!this.hasContentBottom}><slot name=${c.contentBottom} @slotchange=${this.contentBottomSlotChangeHandler}></slot></div>`;
  }
  renderContentTop() {
    return n`<div class=${o(t.contentTop)} .hidden=${!this.hasContentTop}><slot name=${c.contentTop} @slotchange=${this.contentTopSlotChangeHandler}></slot></div>`;
  }
  renderFab() {
    return n`<div class=${o(t.fabContainer)} .hidden=${!this.hasFab}><slot name=${c.fab} @slotchange=${this.handleFabSlotChange}></slot></div>`;
  }
  render() {
    const { disabled: e, loading: a, closed: l } = this, i = n`<article .ariaBusy=${a} class=${o(t.container)} .hidden=${l} ${S(this.containerRef)}>${this.renderHeaderNode()}${this.renderContent()}${this.renderContentBottom()}${this.renderFooterNode()}${g("alerts", n`<slot name=${c.alerts} @slotchange=${this.handleAlertsSlotChange}></slot>`)}</article>`;
    return B({ disabled: e, children: n`${a ? n`<calcite-scrim .loading=${a}></calcite-scrim>` : null}${i}` });
  }
}
F("calcite-panel", K);
export {
  K as Panel
};
