/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as z, L as F, c as C, s as o, b as n, A as E, d as P } from "./index.js";
import { i as b } from "./keyed.js";
import { e as B, n as T } from "./ref.js";
import { s as p, b as H, x as k, y as A } from "./dom.js";
import { g as D } from "./component.js";
import { c as N, u as O } from "./observers.js";
import { S as L } from "./resources4.js";
import { H as R } from "./Heading.js";
import { a as M } from "./floating-ui.js";
import { u as I } from "./useT9n.js";
import { i as j } from "./resources6.js";
import { u as _ } from "./useSetFocus.js";
import { s as K } from "./header.js";
import { u as U } from "./useInteractive.js";
import { u as V } from "./useFocusTrap.js";
import { C as t, S as l, I as x, a as w } from "./resources14.js";
const G = z`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;overflow:hidden;border-radius:var(--calcite-panel-corner-radius, var(--calcite-corner-radius-sharp))}slot[name=alerts]::slotted(calcite-alert){block-size:0}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-internal-panel-default-space: var(--calcite-spacing-sm);--calcite-internal-panel-header-vertical-padding: var(--calcite-spacing-sm-plus)}:host([scale=s]) .header-content .heading{font-size:var(--calcite-font-size--1)}:host([scale=s]) .header-content .description{font-size:var(--calcite-font-size--2)}:host([scale=s]) .header-content .icon{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]){--calcite-internal-panel-default-space: var(--calcite-spacing-md);--calcite-internal-panel-header-vertical-padding: var(--calcite-spacing-md-plus)}:host([scale=m]) .header-content .heading{font-size:var(--calcite-font-size-0)}:host([scale=m]) .header-content .description{font-size:var(--calcite-font-size--1)}:host([scale=m]) .header-content .icon{margin-inline-end:var(--calcite-spacing-md)}:host(:is([scale=s],[scale=m])){--calcite-internal-panel-action-spacing: var(--calcite-spacing-xxs)}:host([scale=l]){--calcite-internal-panel-action-spacing: var(--calcite-spacing-xs);--calcite-internal-panel-default-space: var(--calcite-spacing-lg);--calcite-internal-panel-header-vertical-padding: var(--calcite-spacing-xl)}:host([scale=l]) .header-content .heading{font-size:var(--calcite-font-size-1)}:host([scale=l]) .header-content .description{font-size:var(--calcite-font-size-0)}:host([scale=l]) .header-content .icon{margin-inline-end:var(--calcite-spacing-lg)}.content-top,.content-bottom{display:flex;align-items:flex-start;align-self:stretch;border-block-start:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3));background-color:var(--calcite-panel-background-color, var(--calcite-color-foreground-1))}.content-top{padding:var(--calcite-panel-content-top-space, var(--calcite-internal-panel-default-space))}.content-bottom{padding:var(--calcite-panel-content-bottom-space, var(--calcite-internal-panel-default-space))}.container{position:relative;margin:0;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;overflow:hidden;background-color:var(--calcite-color-background);padding:0;font-size:var(--calcite-font-size-relative-base);color:var(--calcite-color-text-2);transition:max-block-size var(--calcite-animation-timing),inline-size var(--calcite-animation-timing);box-sizing:border-box;font-size:var(--calcite-font-size--1)}.container *{box-sizing:border-box}.header{z-index:var(--calcite-z-index-header);display:flex;flex-direction:column;background-color:var(--calcite-panel-header-background-color, var(--calcite-color-foreground-1));border-block-end:1px solid var(--calcite-panel-border-color, var(--calcite-panel-header-border-block-end, var(--calcite-color-border-3)))}.header--no-row{border-block-end:0}.content-top--no-border{border-block-start:0}.header-container{display:flex;inline-size:100%;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:0 0 auto}.header-container--border-end{border-block-end:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3))}.header-top{inline-size:100%;border-block-end:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3));padding:var(--calcite-panel-header-top-space, var(--calcite-internal-panel-default-space))}.action-bar-container{inline-size:100%}.action-bar-container ::slotted(calcite-action-bar){inline-size:100%}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:.75rem;padding-block:.875rem;margin-inline-end:auto;justify-content:center}.header-content .heading-text-content{flex:1 1 auto;overflow:hidden}.header-content .heading,.header-content .description{display:block;flex:none;overflow-wrap:break-word;padding:0;line-height:var(--calcite-font-line-height-relative-snug)}.header-content .heading{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-panel-heading-text-color, var(--calcite-color-text-1))}.header-content .heading:only-child{margin-block-end:0px}.header-content .description{color:var(--calcite-panel-description-text-color, var(--calcite-color-text-2))}#close,#collapse,calcite-action-menu{--calcite-action-background-color: var(--calcite-panel-header-action-background-color);--calcite-action-background-color-hover: var(--calcite-panel-header-action-background-color-hover);--calcite-action-background-color-press: var(--calcite-panel-header-action-background-color-press);--calcite-action-text-color: var(--calcite-panel-header-action-text-color);--calcite-action-text-color-press: var(--calcite-panel-header-action-text-color-press)}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;margin:auto;gap:var(--calcite-internal-panel-action-spacing)}.header-actions--start{margin-inline-start:var(--calcite-internal-panel-action-spacing)}.header-actions--end{margin-inline-end:var(--calcite-internal-panel-action-spacing)}.content-wrapper{position:relative;display:flex;block-size:100%;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;overflow:auto;color:var(--calcite-color-text-2);outline-color:transparent;padding:var(--calcite-panel-space, var(--calcite-panel-content-space, 0));background:var(--calcite-panel-background-color, var(--calcite-color-background))}.content-wrapper:focus-visible{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.header-content{flex:1 1 auto;justify-content:center;padding-block:var(--calcite-internal-panel-header-vertical-padding);padding-inline:var(--calcite-internal-panel-default-space)}.header-content.header--slotted-content{padding:var(--calcite-panel-header-content-space, var(--calcite-internal-panel-header-vertical-padding) var(--calcite-internal-panel-default-space))}.header-content.header--non-slotted-content{align-items:center;flex-direction:row}.footer{margin-block-start:auto;display:flex;flex-direction:row;align-content:space-between;align-items:center;justify-content:center;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug);border-block-start:1px solid var(--calcite-panel-border-color, var(--calcite-color-border-3));padding:var(--calcite-panel-footer-space, var(--calcite-panel-footer-padding, var(--calcite-internal-panel-default-space)));background-color:var(--calcite-panel-footer-background-color, var(--calcite-color-foreground-1))}.footer-content{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:center}.footer-start{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-start;margin-inline-end:auto;gap:var(--calcite-internal-panel-default-space)}.footer-end{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-end;margin-inline-start:auto;gap:var(--calcite-internal-panel-default-space)}.fab-container{position:sticky;inset-block-end:0px;z-index:var(--calcite-z-index-sticky);margin-block:0px;margin-inline:auto;display:block;padding:.5rem;inset-inline:0;inline-size:fit-content}calcite-icon{--calcite-icon-color: var(--calcite-panel-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-text-1)))}:host([hidden]){display:none}[hidden]{display:none}`;
class W extends F {
  constructor() {
    super(), this.containerRef = B(), this.resizeObserver = N("resize", () => this.resizeHandler()), this.messages = I(), this._closed = !1, this.focusSetter = _()(this), this.focusTrapController = V({
      focusTrapOptions: {
        allowOutsideClick: !0,
        escapeDeactivates: (e) => (!e.defaultPrevented && this.closable && (this.emitCloseEvent(), e.preventDefault()), !1)
      }
    })(this), this.interactiveContainer = U(this), this.hasActionBar = !1, this.hasContentBottom = !1, this.hasContentTop = !1, this.hasEndActions = !1, this.hasFab = !1, this.hasFooterContent = !1, this.hasFooterEndContent = !1, this.hasFooterStartContent = !1, this.hasHeaderContent = !1, this.hasHeaderDescription = !1, this.hasHeaderHeading = !1, this.hasHeaderTop = !1, this.hasMenuItems = !1, this.hasStartActions = !1, this.showHeaderContent = !1, this.closable = !1, this.collapseDirection = "down", this.collapsed = !1, this.collapsible = !1, this.disabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.focusTrapEnabled = !1, this.menuOpen = !1, this.menuPlacement = M, this.overlayPositioning = "absolute", this.scale = "m", this.topLayerDisabled = !1, this.calcitePanelClose = C({ cancelable: !0 }), this.calcitePanelCollapse = C({ cancelable: !1 }), this.calcitePanelExpand = C({ cancelable: !1 }), this.calcitePanelScroll = C({ cancelable: !1 }), this.calcitePanelToggle = C({ cancelable: !1 }), this.listen("keydown", this.panelKeyDownHandler), this.listen("calcitePanelClose", this.panelCloseHandler);
  }
  static {
    this.properties = { hasActionBar: 16, hasContentBottom: 16, hasContentTop: 16, hasEndActions: 16, hasFab: 16, hasFooterContent: 16, hasFooterEndContent: 16, hasFooterStartContent: 16, hasHeaderContent: 16, hasHeaderDescription: 16, hasHeaderHeading: 16, hasHeaderTop: 16, hasMenuItems: 16, hasStartActions: 16, showHeaderContent: 16, beforeClose: 0, closable: 7, closed: 7, collapseDirection: 1, collapsed: 7, collapsible: 7, description: 1, disabled: 7, heading: 1, headingLevel: 11, icon: 3, iconFlipRtl: 7, loading: 7, focusTrapEnabled: 7, focusTrapOptions: 0, menuFlipPlacements: 0, menuOpen: 7, menuPlacement: 3, messageOverrides: 0, overlayPositioning: 3, scale: 3, topLayerDisabled: 7 };
  }
  static {
    this.styles = [K, G];
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
  async updateFocusTrapElements(e) {
    this.focusTrapController.setExtraContainers(e), this.focusTrapController.updateContainerElements();
  }
  willUpdate(e) {
    e.has("collapsed") && this.hasUpdated && (this.collapsed ? this.calcitePanelCollapse.emit() : this.calcitePanelExpand.emit());
  }
  updated(e) {
    (e.has("focusTrapEnabled") || e.has("closable") || e.has("closed")) && (!this.closed && this.closable && this.focusTrapEnabled ? this.focusTrapController.activate() : this.focusTrapController.deactivate());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  focusTrapDisabledOverride() {
    return !this.focusTrapEnabled || !this.closable || this.closed;
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
    e.key !== "Escape" || e.defaultPrevented || this.closed || !this.closable || (e.preventDefault(), this.emitCloseEvent());
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
    this.hasStartActions = p(e);
  }
  handleHeaderActionsEndSlotChange(e) {
    this.hasEndActions = p(e);
  }
  handleHeaderMenuActionsSlotChange(e) {
    this.hasMenuItems = p(e);
  }
  handleActionBarSlotChange(e) {
    const a = H(e).filter(j);
    a.forEach((i) => i.layout = "horizontal"), this.hasActionBar = !!a.length;
  }
  handleHeaderContentSlotChange(e) {
    this.hasHeaderContent = p(e);
  }
  handleHeaderTopSlotChange(e) {
    this.hasHeaderTop = p(e);
  }
  handleHeaderDescriptionSlotChange(e) {
    this.hasHeaderDescription = k(e) || H(e).some(A);
  }
  handleHeaderHeadingSlotChange(e) {
    this.hasHeaderHeading = k(e) || H(e).some(A);
  }
  handleFabSlotChange(e) {
    this.hasFab = p(e);
  }
  handleFooterEndSlotChange(e) {
    this.hasFooterEndContent = p(e);
  }
  handleFooterStartSlotChange(e) {
    this.hasFooterStartContent = p(e);
  }
  handleFooterSlotChange(e) {
    this.hasFooterContent = p(e);
  }
  contentBottomSlotChangeHandler(e) {
    this.hasContentBottom = p(e);
  }
  contentTopSlotChangeHandler(e) {
    this.hasContentTop = p(e);
  }
  setPanelScrollEl(e) {
    O(this.resizeObserver, this.panelScrollEl, e), this.panelScrollEl = e;
  }
  handleAlertsSlotChange(e) {
    H(e)?.map((a) => {
      a.nodeName === "CALCITE-ALERT" && (a.embedded = !0);
    });
  }
  get hasHeaderRow() {
    return this.hasHeaderContent || !!this.heading || !!this.description || this.hasHeaderHeading || this.hasHeaderDescription || this.hasStartActions || this.hasEndActions || this.collapsible || this.closable || this.hasMenuItems;
  }
  renderHeaderContent() {
    const { heading: e, headingLevel: a, description: i, hasHeaderContent: s, hasHeaderDescription: r, hasHeaderHeading: c, icon: g, scale: d } = this, u = !!e || c, h = !!i || r, f = u || h, v = g ? n`<calcite-icon class=${o(t.icon)} .flipRtl=${this.iconFlipRtl} .icon=${g} .scale=${D(d)}></calcite-icon>` : null, m = R({ class: t.heading, hidden: !u, level: a, children: n`<slot .hidden=${!c} name=${l.heading} @slotchange=${this.handleHeaderHeadingSlotChange}></slot>${c ? null : e}` }), $ = n`<span class=${o(t.description)} .hidden=${!h}><slot .hidden=${!r} name=${l.description} @slotchange=${this.handleHeaderDescriptionSlotChange}></slot>${r ? null : i}</span>`;
    return b("header-content", n`<div class=${o({ [t.headerContent]: !0, [t.headerNonSlottedContent]: !0 })} .hidden=${s || !f}>${v}<div class=${o(t.headingTextContent)}>${m}${$}</div></div>`);
  }
  renderActionBar() {
    return n`<div class=${o(t.actionBarContainer)} .hidden=${!this.hasActionBar}><slot name=${l.actionBar} @slotchange=${this.handleActionBarSlotChange}></slot></div>`;
  }
  renderHeaderSlottedContent() {
    return b("slotted-header-content", n`<div class=${o({ [t.headerContent]: !0, [t.headerSlottedContent]: !0 })} .hidden=${!this.hasHeaderContent}><slot name=${l.headerContent} @slotchange=${this.handleHeaderContentSlotChange}></slot></div>`);
  }
  renderHeaderTop() {
    return n`<div class=${o(t.headerTop)} .hidden=${!this.hasHeaderTop}><slot name=${l.headerTop} @slotchange=${this.handleHeaderTopSlotChange}></slot></div>`;
  }
  renderHeaderStartActions() {
    const { hasStartActions: e } = this;
    return b("header-actions-start", n`<div class=${o({ [t.headerActionsStart]: !0, [t.headerActions]: !0 })} .hidden=${!e}><slot name=${l.headerActionsStart} @slotchange=${this.handleHeaderActionsStartSlotChange}></slot></div>`);
  }
  renderHeaderActionsEnd() {
    const { hasEndActions: e, messages: a, closable: i, collapsed: s, collapseDirection: r, collapsible: c, hasMenuItems: g } = this, { collapse: d, expand: u, close: h } = a, f = [x.expand, x.collapse];
    r === "up" && f.reverse();
    const v = c ? n`<calcite-action .aria=${{ expanded: !s }} .icon=${s ? f[0] : f[1]} id=${w.collapse} .label=${d} @click=${this.collapse} .scale=${this.scale} .text=${d} title=${(s ? u : d) ?? E}></calcite-action>` : null, m = i ? n`<calcite-action .ariaLabel=${h} .icon=${x.close} id=${w.close} @click=${this.closeClickHandler} .scale=${this.scale} .text=${h} title=${h ?? E}></calcite-action>` : null, $ = n`<slot name=${l.headerActionsEnd} @slotchange=${this.handleHeaderActionsEndSlotChange}></slot>`, y = e || v || m || g;
    return b("header-actions-end", n`<div class=${o({ [t.headerActionsEnd]: !0, [t.headerActions]: !0 })} .hidden=${!y}>${$}${this.renderMenu()}${v}${m}</div>`);
  }
  renderMenu() {
    const { hasMenuItems: e, messages: a, menuOpen: i, menuFlipPlacements: s, menuPlacement: r, scale: c } = this;
    return b("menu", n`<calcite-action-menu .flipPlacements=${s ?? ["top", "bottom"]} .hidden=${!e} .label=${a.options} .open=${i} .overlayPositioning=${this.overlayPositioning} .placement=${r} .scale=${c} .topLayerDisabled=${this.topLayerDisabled}><calcite-action class=${o(t.menuAction)} .icon=${x.menu} .scale=${c} slot=${L.trigger} .text=${a.options}></calcite-action><slot name=${l.headerMenuActions} @slotchange=${this.handleHeaderMenuActionsSlotChange}></slot></calcite-action-menu>`);
  }
  renderHeaderNode() {
    const { hasHeaderContent: e, hasHeaderDescription: a, hasHeaderHeading: i, hasHeaderTop: s, hasStartActions: r, hasEndActions: c, closable: g, collapsible: d, hasMenuItems: u, hasActionBar: h, hasContentTop: f, heading: v, description: m } = this, $ = this.renderHeaderContent(), S = e || (!!v || !!m || i || a) || s || r || c || d || g || u || h || f;
    return this.showHeaderContent = S, n`<header class=${o({
      [t.header]: !0,
      [t.headerNoRow]: s && !this.hasHeaderRow && !h && !f
    })} .hidden=${!(S || h || f)}>${this.renderHeaderTop()}<div class=${o({
      [t.headerContainer]: !0,
      [t.headerContainerBorderEnd]: h && this.hasHeaderRow
    })} .hidden=${!S}>${this.renderHeaderStartActions()}${this.renderHeaderSlottedContent()}${$}${this.renderHeaderActionsEnd()}</div>${this.renderActionBar()}${this.renderContentTop()}</header>`;
  }
  renderFooterNode() {
    const { hasFooterEndContent: e, hasFooterStartContent: a, hasFooterContent: i } = this, s = a || e || i;
    return n`<footer class=${o(t.footer)} .hidden=${!s}><div class=${o(t.footerContent)} .hidden=${!i}><slot name=${l.footer} @slotchange=${this.handleFooterSlotChange}></slot></div><div class=${o(t.footerStart)} .hidden=${i || !a}><slot name=${l.footerStart} @slotchange=${this.handleFooterStartSlotChange}></slot></div><div class=${o(t.footerEnd)} .hidden=${i || !e}><slot name=${l.footerEnd} @slotchange=${this.handleFooterEndSlotChange}></slot></div></footer>`;
  }
  renderContent() {
    return n`<div class=${o(t.contentWrapper)} .hidden=${this.collapsible && this.collapsed} @scroll=${this.panelScrollHandler} ${T(this.setPanelScrollEl)}><slot></slot>${this.renderFab()}</div>`;
  }
  renderContentBottom() {
    return n`<div class=${o(t.contentBottom)} .hidden=${!this.hasContentBottom}><slot name=${l.contentBottom} @slotchange=${this.contentBottomSlotChangeHandler}></slot></div>`;
  }
  renderContentTop() {
    return n`<div class=${o({
      [t.contentTop]: !0,
      [t.contentTopNoBorder]: this.hasHeaderTop && !this.hasHeaderRow && !this.hasActionBar
    })} .hidden=${!this.hasContentTop}><slot name=${l.contentTop} @slotchange=${this.contentTopSlotChangeHandler}></slot></div>`;
  }
  renderFab() {
    return n`<div class=${o(t.fabContainer)} .hidden=${!this.hasFab}><slot name=${l.fab} @slotchange=${this.handleFabSlotChange}></slot></div>`;
  }
  render() {
    const { disabled: e, loading: a, closed: i, heading: s, description: r, focusTrapEnabled: c, closable: g } = this, d = c && g, u = n`<div .ariaBusy=${a} .ariaDescription=${d && r ? r : void 0} .ariaLabel=${d && s ? s : void 0} .ariaLive=${d ? "polite" : void 0} class=${o(t.container)} .hidden=${i} .role=${d ? "dialog" : "article"} ${T(this.containerRef)}>${this.renderHeaderNode()}${this.renderContent()}${this.renderContentBottom()}${this.renderFooterNode()}${b("alerts", n`<slot name=${l.alerts} @slotchange=${this.handleAlertsSlotChange}></slot>`)}</div>`;
    return this.interactiveContainer({ disabled: e, children: n`${a ? n`<calcite-scrim .loading=${a}></calcite-scrim>` : null}${u}` });
  }
}
P("calcite-panel", W);
export {
  W as Panel
};
