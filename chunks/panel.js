import { a as w, L as z, d as b, s as o, x as n, E as x, c as F } from "./iframe.js";
import { i as p } from "./keyed.js";
import { n as S } from "./ref.js";
import { f as E, s as c, d as y } from "./dom.js";
import { u as B, I as P } from "./interactive.js";
import { c as T, g as N } from "./component.js";
import { c as I } from "./observers.js";
import { S as M } from "./resources2.js";
import { H as O } from "./Heading.js";
import { a as L } from "./floating-ui.js";
import { u as j } from "./useT9n.js";
import { C as t, S as s, I as u, a as A } from "./resources6.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const D = w`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;overflow:hidden;--calcite-min-header-height: calc(var(--calcite-icon-size) * 3);border-radius:var(--calcite-panel-corner-radius, var(--calcite-corner-radius-sharp))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0;padding:0;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:.5rem}:host([scale=s]){--calcite-internal-panel-default-space: var(--calcite-spacing-sm);--calcite-internal-panel-header-vertical-padding: var(--calcite-spacing-sm-plus)}:host([scale=s]) .header-content .heading{font-size:var(--calcite-font-size--1)}:host([scale=s]) .header-content .description{font-size:var(--calcite-font-size--2)}:host([scale=s]) .header-content .icon{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]){--calcite-internal-panel-default-space: var(--calcite-spacing-md);--calcite-internal-panel-header-vertical-padding: var(--calcite-spacing-md-plus)}:host([scale=m]) .header-content .heading{font-size:var(--calcite-font-size-0)}:host([scale=m]) .header-content .description{font-size:var(--calcite-font-size--1)}:host([scale=m]) .header-content .icon{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]){--calcite-internal-panel-default-space: var(--calcite-spacing-lg);--calcite-internal-panel-header-vertical-padding: var(--calcite-spacing-xl)}:host([scale=l]) .header-content .heading{font-size:var(--calcite-font-size-1)}:host([scale=l]) .header-content .description{font-size:var(--calcite-font-size-0)}:host([scale=l]) .header-content .icon{margin-inline-end:var(--calcite-spacing-lg)}.content-top,.content-bottom{display:flex;align-items:flex-start;align-self:stretch;padding:var(--calcite-internal-panel-default-space);border-block-start:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3));background-color:var(--calcite-panel-background-color, var(--calcite-color-foreground-1))}.container{position:relative;margin:0;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;overflow:hidden;background-color:var(--calcite-color-background);padding:0;color:var(--calcite-color-text-2);transition:max-block-size var(--calcite-animation-timing),inline-size var(--calcite-animation-timing);box-sizing:border-box;font-size:var(--calcite-font-size--1)}.container *{box-sizing:border-box}.container[hidden]{display:none}.header{z-index:var(--calcite-z-index-header);display:flex;flex-direction:column;background-color:var(--calcite-panel-header-background-color, var(--calcite-color-foreground-1));border-block-end:1px solid var(--calcite-panel-border-color, var(--calcite-panel-header-border-block-end, var(--calcite-color-border-3)))}.header-container{display:flex;inline-size:100%;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:0 0 auto}.header-container--border-end{border-block-end:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3))}.action-bar-container{inline-size:100%}.action-bar-container ::slotted(calcite-action-bar){inline-size:100%}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:.75rem;padding-block:.875rem;margin-inline-end:auto;justify-content:center}.header-content .heading-text-content{flex:1 1 auto}.header-content .heading,.header-content .description{display:block;flex:none;overflow-wrap:break-word;padding:0;line-height:var(--calcite-font-line-height-relative-snug)}.header-content .heading{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-panel-heading-text-color, var(--calcite-color-text-1))}.header-content .heading:only-child{margin-block-end:0px}.header-content .description{color:var(--calcite-panel-description-text-color, var(--calcite-color-text-2))}#close,#collapse,.back-button,calcite-action-menu{--calcite-action-background-color: var(--calcite-panel-header-action-background-color);--calcite-action-background-color-hover: var(--calcite-panel-header-action-background-color-hover);--calcite-action-background-color-press: var(--calcite-panel-header-action-background-color-press);--calcite-action-text-color: var(--calcite-panel-header-action-text-color);--calcite-action-text-color-press: var(--calcite-panel-header-action-text-color-press)}.back-button{border-width:0px;border-style:solid;border-inline-end-width:1px;border-color:var(--calcite-panel-border-color, var(--calcite-color-border-3))}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{margin-inline-start:auto}.content-wrapper{position:relative;display:flex;block-size:100%;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;overflow:auto;color:var(--calcite-color-text-2);outline-color:transparent;padding:var(--calcite-panel-space, var(--calcite-panel-content-space, 0));background:var(--calcite-panel-background-color, var(--calcite-color-background))}.content-wrapper:focus-visible{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.header-content{flex:1 1 auto;justify-content:center;padding-block:var(--calcite-internal-panel-header-vertical-padding);padding-inline:var(--calcite-internal-panel-default-space)}.header-content.header--slotted-content{padding:var(--calcite-panel-header-content-space, var(--calcite-internal-panel-header-vertical-padding) var(--calcite-internal-panel-default-space))}.header-content.header--non-slotted-content{align-items:center;flex-direction:row}.footer{margin-block-start:auto;display:flex;flex-direction:row;align-content:space-between;align-items:center;justify-content:center;font-size:var(--calcite-font-size--2);line-height:1.375;border-block-start:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3));padding:var(--calcite-panel-footer-space, var(--calcite-panel-footer-padding, var(--calcite-internal-panel-default-space)));background-color:var(--calcite-panel-footer-background-color, var(--calcite-color-foreground-1))}.footer-content{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:center}.footer-actions{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:space-evenly;gap:var(--calcite-internal-panel-default-space)}.footer-start{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-start;margin-inline-end:auto;gap:var(--calcite-internal-panel-default-space)}.footer-end{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-end;margin-inline-start:auto;gap:var(--calcite-internal-panel-default-space)}.fab-container{position:sticky;inset-block-end:0px;z-index:var(--calcite-z-index-sticky);margin-block:0px;margin-inline:auto;display:block;padding:.5rem;inset-inline:0;inline-size:fit-content}calcite-icon{--calcite-icon-color: var(--calcite-panel-icon-color, var(--calcite-color-text-1))}:host([hidden]){display:none}[hidden]{display:none}`;
class R extends z {
  constructor() {
    super(), this.resizeObserver = I("resize", () => this.resizeHandler()), this.messages = j(), this.hasActionBar = !1, this.hasContentBottom = !1, this.hasContentTop = !1, this.hasEndActions = !1, this.hasFab = !1, this.hasFooterActions = !1, this.hasFooterContent = !1, this.hasFooterEndContent = !1, this.hasFooterStartContent = !1, this.hasHeaderContent = !1, this.hasMenuItems = !1, this.hasStartActions = !1, this.isClosed = !1, this.showHeaderContent = !1, this.closable = !1, this.closed = !1, this.collapseDirection = "down", this.collapsed = !1, this.collapsible = !1, this.disabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.menuOpen = !1, this.menuPlacement = L, this.overlayPositioning = "absolute", this.scale = "m", this.calcitePanelClose = b({ cancelable: !1 }), this.calcitePanelScroll = b({ cancelable: !1 }), this.calcitePanelToggle = b({ cancelable: !1 }), this.listen("keydown", this.panelKeyDownHandler);
  }
  static {
    this.properties = { hasActionBar: 16, hasContentBottom: 16, hasContentTop: 16, hasEndActions: 16, hasFab: 16, hasFooterActions: 16, hasFooterContent: 16, hasFooterEndContent: 16, hasFooterStartContent: 16, hasHeaderContent: 16, hasMenuItems: 16, hasStartActions: 16, isClosed: 16, showHeaderContent: 16, beforeClose: 0, closable: 7, closed: 7, collapseDirection: 1, collapsed: 7, collapsible: 7, description: 1, disabled: 7, heading: 1, headingLevel: 11, icon: 3, iconFlipRtl: 7, loading: 7, menuFlipPlacements: 0, menuOpen: 7, menuPlacement: 3, messageOverrides: 0, overlayPositioning: 3, scale: 3 };
  }
  static {
    this.styles = D;
  }
  async scrollContentTo(e) {
    this.panelScrollEl?.scrollTo(e);
  }
  async setFocus() {
    await T(this), E(this.containerEl);
  }
  async load() {
    this.isClosed = this.closed;
  }
  willUpdate(e) {
    e.has("closed") && this.hasUpdated && (this.closed ? this.close() : this.open());
  }
  updated() {
    B(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  resizeHandler() {
    const { panelScrollEl: e } = this;
    if (!e || typeof e.scrollHeight != "number" || typeof e.offsetHeight != "number")
      return;
    e.scrollHeight > e.offsetHeight ? e.setAttribute("tabindex", "0") : e.removeAttribute("tabindex");
  }
  setContainerRef(e) {
    this.containerEl = e;
  }
  panelKeyDownHandler(e) {
    this.closable && e.key === "Escape" && !e.defaultPrevented && (this.handleUserClose(), e.preventDefault());
  }
  handleUserClose() {
    this.closed = !0, this.calcitePanelClose.emit();
  }
  open() {
    this.isClosed = !1;
  }
  async close() {
    const e = this.beforeClose ?? (() => Promise.resolve());
    try {
      await e();
    } catch {
      requestAnimationFrame(() => {
        this.closed = !1;
      });
      return;
    }
    this.isClosed = !0;
  }
  collapse() {
    this.collapsed = !this.collapsed, this.calcitePanelToggle.emit();
  }
  panelScrollHandler() {
    this.calcitePanelScroll.emit();
  }
  handleHeaderActionsStartSlotChange(e) {
    this.hasStartActions = c(e);
  }
  handleHeaderActionsEndSlotChange(e) {
    this.hasEndActions = c(e);
  }
  handleHeaderMenuActionsSlotChange(e) {
    this.hasMenuItems = c(e);
  }
  handleActionBarSlotChange(e) {
    const a = y(e).filter((i) => i?.matches("calcite-action-bar"));
    a.forEach((i) => i.layout = "horizontal"), this.hasActionBar = !!a.length;
  }
  handleHeaderContentSlotChange(e) {
    this.hasHeaderContent = c(e);
  }
  handleFabSlotChange(e) {
    this.hasFab = c(e);
  }
  handleFooterActionsSlotChange(e) {
    this.hasFooterActions = c(e);
  }
  handleFooterEndSlotChange(e) {
    this.hasFooterEndContent = c(e);
  }
  handleFooterStartSlotChange(e) {
    this.hasFooterStartContent = c(e);
  }
  handleFooterSlotChange(e) {
    this.hasFooterContent = c(e);
  }
  contentBottomSlotChangeHandler(e) {
    this.hasContentBottom = c(e);
  }
  contentTopSlotChangeHandler(e) {
    this.hasContentTop = c(e);
  }
  setPanelScrollEl(e) {
    this.panelScrollEl = e, this.resizeObserver?.disconnect(), e && (this.resizeObserver?.observe(e), this.resizeHandler());
  }
  handleAlertsSlotChange(e) {
    y(e)?.map((a) => {
      a.nodeName === "CALCITE-ALERT" && (a.embedded = !0);
    });
  }
  renderHeaderContent() {
    const { heading: e, headingLevel: a, description: i, hasHeaderContent: l, icon: r, scale: g } = this, f = r ? n`<calcite-icon class=${o(t.icon)} .icon=${r} .scale=${N(g)}></calcite-icon>` : null, d = e ? O({ class: t.heading, level: a, children: e }) : null, h = i ? n`<span class=${o(t.description)}>${i}</span>` : null;
    return !l && (d || h) ? p("header-content", n`<div class=${o({ [t.headerContent]: !0, [t.headerNonSlottedContent]: !0 })}>${f}<div class=${o(t.headingTextContent)}>${d}${h}</div></div>`) : null;
  }
  renderActionBar() {
    return n`<div class=${o(t.actionBarContainer)} .hidden=${!this.hasActionBar}><slot name=${s.actionBar} @slotchange=${this.handleActionBarSlotChange}></slot></div>`;
  }
  renderHeaderSlottedContent() {
    return p("slotted-header-content", n`<div class=${o({ [t.headerContent]: !0, [t.headerSlottedContent]: !0 })} .hidden=${!this.hasHeaderContent}><slot name=${s.headerContent} @slotchange=${this.handleHeaderContentSlotChange}></slot></div>`);
  }
  renderHeaderStartActions() {
    const { hasStartActions: e } = this;
    return p("header-actions-start", n`<div class=${o({ [t.headerActionsStart]: !0, [t.headerActions]: !0 })} .hidden=${!e}><slot name=${s.headerActionsStart} @slotchange=${this.handleHeaderActionsStartSlotChange}></slot></div>`);
  }
  renderHeaderActionsEnd() {
    const { hasEndActions: e, messages: a, closable: i, collapsed: l, collapseDirection: r, collapsible: g, hasMenuItems: f } = this, { collapse: d, expand: h, close: m } = a, v = [u.expand, u.collapse];
    r === "up" && v.reverse();
    const $ = g ? n`<calcite-action .ariaExpanded=${!l} .ariaLabel=${d} .icon=${l ? v[0] : v[1]} id=${A.collapse} @click=${this.collapse} .scale=${this.scale} .text=${d} title=${(l ? h : d) ?? x}></calcite-action>` : null, C = i ? n`<calcite-action .ariaLabel=${m} .icon=${u.close} id=${A.close} @click=${this.handleUserClose} .scale=${this.scale} .text=${m} title=${m ?? x}></calcite-action>` : null, H = n`<slot name=${s.headerActionsEnd} @slotchange=${this.handleHeaderActionsEndSlotChange}></slot>`, k = e || $ || C || f;
    return p("header-actions-end", n`<div class=${o({ [t.headerActionsEnd]: !0, [t.headerActions]: !0 })} .hidden=${!k}>${H}${this.renderMenu()}${$}${C}</div>`);
  }
  renderMenu() {
    const { hasMenuItems: e, messages: a, menuOpen: i, menuFlipPlacements: l, menuPlacement: r } = this;
    return p("menu", n`<calcite-action-menu .flipPlacements=${l ?? ["top", "bottom"]} .hidden=${!e} .label=${a.options} .open=${i} .overlayPositioning=${this.overlayPositioning} .placement=${r}><calcite-action class=${o(t.menuAction)} .icon=${u.menu} .scale=${this.scale} slot=${M.trigger} .text=${a.options}></calcite-action><slot name=${s.headerMenuActions} @slotchange=${this.handleHeaderMenuActionsSlotChange}></slot></calcite-action-menu>`);
  }
  renderHeaderNode() {
    const { hasHeaderContent: e, hasStartActions: a, hasEndActions: i, closable: l, collapsible: r, hasMenuItems: g, hasActionBar: f } = this, d = this.renderHeaderContent(), h = e || !!d || a || i || r || l || g;
    return this.showHeaderContent = h, n`<header class=${o(t.header)} .hidden=${!(h || f)}><div class=${o({ [t.headerContainer]: !0, [t.headerContainerBorderEnd]: f })} .hidden=${!h}>${this.renderHeaderStartActions()}${this.renderHeaderSlottedContent()}${d}${this.renderHeaderActionsEnd()}</div>${this.renderActionBar()}${this.renderContentTop()}</header>`;
  }
  renderFooterNode() {
    const { hasFooterEndContent: e, hasFooterStartContent: a, hasFooterContent: i, hasFooterActions: l } = this, r = a || e || i || l;
    return n`<footer class=${o(t.footer)} .hidden=${!r}><div class=${o(t.footerContent)} .hidden=${!i}><slot name=${s.footer} @slotchange=${this.handleFooterSlotChange}></slot></div><div class=${o(t.footerStart)} .hidden=${i || !a}><slot name=${s.footerStart} @slotchange=${this.handleFooterStartSlotChange}></slot></div><div class=${o(t.footerEnd)} .hidden=${i || !e}><slot name=${s.footerEnd} @slotchange=${this.handleFooterEndSlotChange}></slot></div><div class=${o(t.footerActions)} .hidden=${i || !l}>${p("footer-actions-slot", n`<slot name=${s.footerActions} @slotchange=${this.handleFooterActionsSlotChange}></slot>`)}</div></footer>`;
  }
  renderContent() {
    return n`<div class=${o(t.contentWrapper)} .hidden=${this.collapsible && this.collapsed} @scroll=${this.panelScrollHandler} ${S(this.setPanelScrollEl)}><slot></slot>${this.renderFab()}</div>`;
  }
  renderContentBottom() {
    return n`<div class=${o(t.contentBottom)} .hidden=${!this.hasContentBottom}><slot name=${s.contentBottom} @slotchange=${this.contentBottomSlotChangeHandler}></slot></div>`;
  }
  renderContentTop() {
    return n`<div class=${o(t.contentTop)} .hidden=${!this.hasContentTop}><slot name=${s.contentTop} @slotchange=${this.contentTopSlotChangeHandler}></slot></div>`;
  }
  renderFab() {
    return n`<div class=${o(t.fabContainer)} .hidden=${!this.hasFab}><slot name=${s.fab} @slotchange=${this.handleFabSlotChange}></slot></div>`;
  }
  render() {
    const { disabled: e, loading: a, isClosed: i } = this, l = n`<article .ariaBusy=${a} class=${o(t.container)} .hidden=${i} ${S(this.setContainerRef)}>${this.renderHeaderNode()}${this.renderContent()}${this.renderContentBottom()}${this.renderFooterNode()}${p("alerts", n`<slot name=${s.alerts} @slotchange=${this.handleAlertsSlotChange}></slot>`)}</article>`;
    return P({ disabled: e, children: n`${a ? n`<calcite-scrim .loading=${a}></calcite-scrim>` : null}${l}` });
  }
}
F("calcite-panel", R);
export {
  R as Panel
};
