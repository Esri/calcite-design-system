/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as M, L as G, c, l as g, b as a, s as i, A as $, d as U } from "./index.js";
import { i as b } from "./keyed.js";
import { n as F } from "./ref.js";
import { s as r, b as R } from "./dom.js";
import { H as j } from "./Heading.js";
import { g as m } from "./component.js";
import { t as N } from "./openCloseComponent.js";
import { a as V } from "./floating-ui.js";
import { u as q } from "./useT9n.js";
import { u as J } from "./useSetFocus.js";
import { s as K } from "./sortable.js";
import { s as Q } from "./header.js";
import { u as W } from "./useInteractive.js";
import { C as t, I as v, S as d, a as s } from "./resources10.js";
const X = M`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .header{gap:var(--calcite-spacing-sm)}:host([scale=s]) .icon-end-container{gap:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .heading{font-size:var(--calcite-font-size-sm)}:host([scale=s]) .description{font-size:var(--calcite-font-size-xs)}:host([scale=s]){--calcite-internal-block-actions-spacing: var(--calcite-spacing-xxs);--calcite-internal-block-header-content-padding: var(--calcite-spacing-sm);--calcite-internal-block-padding-block: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-xxs)) );--calcite-internal-block-padding-inline: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-sm)) )}:host([scale=m]) .header{gap:var(--calcite-spacing-md)}:host([scale=m]) .icon-end-container{gap:var(--calcite-spacing-md);padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .heading{font-size:var(--calcite-font-size)}:host([scale=m]) .description{font-size:var(--calcite-font-size-sm)}:host([scale=m]){--calcite-internal-block-actions-spacing: var(--calcite-spacing-xxs);--calcite-internal-block-header-content-padding: var(--calcite-spacing-md);--calcite-internal-block-padding-block: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-sm)) );--calcite-internal-block-padding-inline: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-md)) )}:host([scale=l]) .header{gap:var(--calcite-spacing-lg)}:host([scale=l]) .icon-end-container{gap:var(--calcite-spacing-lg);padding-inline-end:var(--calcite-spacing-lg)}:host([scale=l]) .heading{font-size:var(--calcite-font-size-md)}:host([scale=l]) .description{font-size:var(--calcite-font-size)}:host([scale=l]){--calcite-internal-block-actions-spacing: var(--calcite-spacing-xs);--calcite-internal-block-header-content-padding: var(--calcite-spacing-lg);--calcite-internal-block-padding-block: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-md)) );--calcite-internal-block-padding-inline: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-lg)) )}:host{display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;border-width:0px;border-block-end-width:1px;border-style:solid;padding:0;transition-property:margin;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.215,.44,.42,.88);flex-basis:auto;border-color:var(--calcite-block-border-color, var(--calcite-color-border-3));background-color:var(--calcite-block-background-color, var(--calcite-color-foreground-1))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{justify-content:flex-start}.header--has-content{padding:var(--calcite-internal-block-header-content-padding)}.header--draggable{padding-inline-start:var(--calcite-spacing-xxs)}.header,.toggle{grid-area:header}.header-container{display:grid;align-items:stretch;grid-template:auto/auto 1fr auto auto auto auto;grid-template-areas:"handle header icon-end menu actions-end"}.icon--start{color:var(--calcite-block-icon-start-color, var(--calcite-block-icon-color, var(--calcite-color-text-3)))}.icon--end{color:var(--calcite-block-icon-end-color, var(--calcite-block-icon-color, var(--calcite-color-text-3)))}.actions-end{align-items:center;display:flex;gap:var(--calcite-internal-block-actions-spacing);grid-area:actions-end;padding-block:var(--calcite-internal-block-actions-spacing);padding-inline-end:var(--calcite-internal-block-actions-spacing)}.toggle{margin:0;display:flex;cursor:pointer;flex-wrap:nowrap;align-items:center;justify-content:space-between;border-style:none;padding:0;outline-color:transparent;font-family:inherit;text-align:initial;background-color:var(--calcite-block-header-background-color, transparent)}.toggle:hover{background-color:var(--calcite-block-header-background-color-hover, var(--calcite-color-foreground-2))}.toggle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.toggle:active{background-color:var(--calcite-block-header-background-color-press, var(--calcite-color-foreground-3))}calcite-loader[inline]{align-self:center}calcite-sort-handle{align-self:center;grid-area:handle;margin-block:var(--calcite-internal-block-actions-spacing);padding-inline-start:var(--calcite-spacing-xxs)}.title{display:flex;flex-direction:column}.header .title .heading{padding:0;word-wrap:break-word;word-break:break-word;color:var(--calcite-block-heading-text-color, var(--calcite-color-text-1));font-weight:var(--calcite-font-weight-normal);line-height:var(--calcite-font-line-height-relative-snug)}.description{padding:0;word-wrap:break-word;word-break:break-word;color:var(--calcite-block-description-text-color, var(--calcite-color-text-3));font-weight:var(--calcite-font-weight-regular);line-height:var(--calcite-font-line-height-relative-snug)}.icon{display:flex}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}@keyframes spin{0%{transform:rotate(0)}50%{transform:rotate(180deg)}to{transform:rotate(360deg)}}.icon-end-container{display:flex;align-items:center;grid-area:icon-end}.toggle-icon{align-self:center;justify-self:end;transition-property:color;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1);color:var(--calcite-block-collapsible-icon-color, var(--calcite-block-icon-color, var(--calcite-color-text-3)))}.toggle:hover .toggle-icon{color:var(--calcite-block-collapsible-icon-color-hover, var(--calcite-block-icon-color-hover, var(--calcite-color-text-1)))}.container{position:relative;display:flex;block-size:100%;flex-direction:column}.content{position:relative;min-block-size:0px;flex:1 1 0%;opacity:0;transition:opacity var(--calcite-internal-animation-timing-slow) ease-in-out}.has-slotted-content{padding-block:var(--calcite-internal-block-padding-block);padding-inline:var(--calcite-internal-block-padding-inline)}.content-end,.content-start{display:flex;align-items:center;color:var(--calcite-block-text-color, var(--calcite-color-text-3))}calcite-action-menu{align-self:center;grid-area:menu;margin-inline-end:var(--calcite-internal-block-actions-spacing)}:host([expanded]){margin-block:.5rem}:host([expanded]) .header .title .heading{color:var(--calcite-block-heading-text-color, var(--calcite-block-heading-text-color-press, var(--calcite-color-text-1)));font-weight:var(--calcite-font-weight-medium)}:host([expanded]) .description{color:var(--calcite-block-description-text-color, var(--calcite-color-text-2))}:host([expanded]) .icon--start{color:var(--calcite-block-icon-start-color, var(--calcite-block-icon-color, var(--calcite-color-text-1)))}:host([expanded]) .icon--end{color:var(--calcite-block-icon-end-color, var(--calcite-block-icon-color, var(--calcite-color-text-1)))}:host([expanded]) .content{opacity:1}@starting-style{:host([expanded]){margin-block-start:0;opacity:0}}:host([expanded][scale=s]){margin-block:var(--calcite-spacing-xxs)}:host([expanded][scale=l]){margin-block:var(--calcite-spacing-md)}:host([hidden]){display:none}[hidden]{display:none}slot[name=children]::slotted(calcite-block){border-block-end-width:0}`;
class Y extends G {
  constructor() {
    super(...arguments), this.transitionProp = "margin-top", this.blockSectionChildren = [], this.messages = q(), this.focusSetter = J()(this), this.interactiveContainer = W(this), this.hasContentEnd = !1, this.hasContentStart = !1, this.hasEndActions = !1, this.hasMenuActions = !1, this.hasContent = !1, this.disabled = !1, this.dragDisabled = !1, this.dragHandle = !1, this.expanded = !1, this.expandable = !1, this.loading = !1, this.menuPlacement = V, this.addToItems = [], this.moveToItems = [], this.sortDisabled = !1, this.overlayPositioning = "absolute", this.scale = "m", this.sortHandleOpen = !1, this.toggleDisplay = "button", this.topLayerDisabled = !1, this.calciteBlockBeforeClose = c({ cancelable: !1 }), this.calciteBlockBeforeOpen = c({ cancelable: !1 }), this.calciteBlockClose = c({ cancelable: !1 }), this.calciteBlockCollapse = c({ cancelable: !1 }), this.calciteBlockExpand = c({ cancelable: !1 }), this.calciteBlockOpen = c({ cancelable: !1 }), this.calciteBlockSortHandleBeforeClose = c({ cancelable: !1 }), this.calciteBlockSortHandleBeforeOpen = c({ cancelable: !1 }), this.calciteBlockSortHandleClose = c({ cancelable: !1 }), this.calciteBlockSortHandleOpen = c({ cancelable: !1 }), this.calciteBlockToggle = c({ cancelable: !1 }), this.calciteInternalBlockUpdateSortMenuItems = c({ cancelable: !1 }), this.calciteInternalBlockChange = c({
      cancelable: !1
    });
  }
  static {
    this.properties = { hasContentEnd: 16, hasContentStart: 16, hasEndActions: 16, hasMenuActions: 16, hasContent: 16, description: 1, disabled: 7, dragDisabled: 7, dragHandle: 7, expanded: 7, expandable: 7, collapsible: 7, heading: 1, headingLevel: 11, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, loading: 7, label: 1, menuFlipPlacements: 0, menuPlacement: 3, messageOverrides: 0, addToItems: 0, moveToItems: 0, sortDisabled: 5, open: 7, overlayPositioning: 3, scale: 3, setPosition: 9, setSize: 9, sortHandleOpen: 7, status: 3, toggleDisplay: 3, topLayerDisabled: 7 };
  }
  static {
    this.styles = [Q, X, K];
  }
  get collapsible() {
    return this.expandable;
  }
  set collapsible(e) {
    g.deprecated("property", {
      component: this,
      name: "collapsible",
      removalVersion: 7,
      suggested: "expandable"
    }), this.expandable = e;
  }
  get open() {
    return this.expanded;
  }
  set open(e) {
    g.deprecated("property", {
      component: this,
      name: "open",
      removalVersion: 5,
      suggested: "expanded"
    }), this.expanded = e;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.transitionEl = this.el, this.setParentBlockGroupElement();
  }
  load() {
    !this.heading && !this.label && g.warn(`${this.el.tagName} is missing both heading & label. Please provide a heading or label for the component to be accessible.`);
  }
  willUpdate(e) {
    e.has("expanded") && (this.hasUpdated || this.expanded !== !1) && N(this), e.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== !1) && this.sortHandleOpenHandler(), e.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteBlockExpand.emit() : this.calciteBlockCollapse.emit()), e.has("scale") && this.hasUpdated && this.updateBlockSectionScale(), (e.has("moveToItems") || e.has("addToItems")) && this.hasUpdated && this.setParentBlockGroupElement();
  }
  onBeforeOpen() {
    this.calciteBlockBeforeOpen.emit();
  }
  onOpen() {
    this.calciteBlockOpen.emit();
  }
  onBeforeClose() {
    this.calciteBlockBeforeClose.emit();
  }
  onClose() {
    this.calciteBlockClose.emit();
  }
  sortHandleOpenHandler() {
    this.sortHandleEl && (this.sortHandleEl.open = this.sortHandleOpen);
  }
  setSortHandleEl(e) {
    this.sortHandleEl = e, this.sortHandleOpenHandler();
  }
  handleSortHandleBeforeOpen(e) {
    e.stopPropagation(), this.calciteBlockSortHandleBeforeOpen.emit();
  }
  handleSortHandleBeforeClose(e) {
    e.stopPropagation(), this.calciteBlockSortHandleBeforeClose.emit();
  }
  handleSortHandleClose(e) {
    e.stopPropagation(), this.sortHandleOpen = !1, this.calciteBlockSortHandleClose.emit();
  }
  handleSortHandleOpen(e) {
    e.stopPropagation(), this.sortHandleOpen = !0, this.calciteBlockSortHandleOpen.emit();
  }
  onHeaderClick() {
    this.calciteBlockToggle.emit(), this.parentBlockGroupElement ? this.calciteInternalBlockChange.emit({
      el: this.el,
      parentElement: this.parentBlockGroupElement
    }) : this.expanded = !this.expanded;
  }
  menuActionsSlotChangeHandler(e) {
    this.hasMenuActions = r(e);
  }
  actionsEndSlotChangeHandler(e) {
    this.hasEndActions = r(e);
  }
  handleContentEndSlotChange(e) {
    this.hasContentEnd = r(e);
  }
  handleContentStartSlotChange(e) {
    this.hasContentStart = r(e);
  }
  handleDefaultSlotChange(e) {
    this.blockSectionChildren = R(e, "calcite-block-section"), this.hasContent = r(e), this.updateBlockSectionScale();
  }
  updateBlockSectionScale() {
    this.blockSectionChildren.forEach((e) => {
      e.scale = this.scale;
    });
  }
  setParentBlockGroupElement() {
    this.parentBlockGroupElement = this.el.parentElement?.closest("calcite-block-group");
  }
  renderScrim() {
    const { loading: e } = this, l = a`<slot @slotchange=${this.handleDefaultSlotChange}></slot>`;
    return [e ? a`<calcite-scrim .loading=${e}></calcite-scrim>` : null, l];
  }
  renderLoaderStatusIcon() {
    const { loading: e, messages: l, status: n } = this;
    return e ? b("loader", a`<div class=${i(t.icon)}><calcite-loader inline .label=${l.loading} .scale=${this.scale}></calcite-loader></div>`) : n ? b("status-icon", a`<div class=${i(t.icon)}><calcite-icon class=${i({
      [t.statusIcon]: !0,
      [t.valid]: n == "valid",
      [t.invalid]: n == "invalid"
    })} .icon=${v[n]} .scale=${m(this.scale)}></calcite-icon></div>`) : null;
  }
  renderActionsEnd() {
    return a`<div class=${i(t.actionsEnd)} .hidden=${!this.hasEndActions}><slot name=${d.actionsEnd} @slotchange=${this.actionsEndSlotChangeHandler}></slot></div>`;
  }
  renderContentEnd() {
    return a`<div class=${i({ [t.iconEndContainer]: !this.iconEnd && !this.expandable })} .hidden=${!this.hasContentEnd}><div class=${i(t.contentEnd)}><slot name=${d.contentEnd} @slotchange=${this.handleContentEndSlotChange}></slot></div></div>`;
  }
  renderContentStart() {
    return a`<div class=${i(t.contentStart)} .hidden=${!this.hasContentStart}><slot name=${d.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  renderTitle() {
    const { heading: e, headingLevel: l, description: n } = this;
    return e || n ? a`<div class=${i(t.title)}>${j({ class: t.heading, level: l, children: e })}${n ? a`<div class=${i(t.description)}>${n}</div>` : null}</div>` : null;
  }
  renderIcon(e) {
    const { iconFlipRtl: l } = this, n = l === "both" || e === "start" ? l === "start" : l === "end", o = e === "start" ? this.iconStart : this.iconEnd, h = e === "start" ? t.iconStart : t.iconEnd;
    if (o)
      return b(o, a`<calcite-icon class=${i(h)} .flipRtl=${n} .icon=${o} .scale=${m(this.scale)}></calcite-icon>`);
  }
  render() {
    const { expandable: e, loading: l, expanded: n, label: o, heading: h, messages: p, description: x, menuFlipPlacements: C, menuPlacement: S, moveToItems: y, addToItems: E, setPosition: H, setSize: B, dragDisabled: w, sortDisabled: O, iconEnd: f, hasContentEnd: I, hasContentStart: z, iconStart: P, status: D } = this, u = n ? p.collapse : p.expand, A = !!(h || x || I || z || P || l || D), k = a`<header class=${i({
      [t.header]: !0,
      [t.headerHasContent]: A,
      [t.headerDraggable]: this.dragHandle
    })} id=${s.header}>${this.renderIcon("start")}${this.renderContentStart()}${this.renderLoaderStatusIcon()}${this.renderTitle()}</header>`, T = n ? v.expanded : v.collapsed, L = a`<div class=${i(t.headerContainer)}>${this.dragHandle ? a`<calcite-sort-handle .addToItems=${E} .disabled=${w} .label=${h || o} .moveToItems=${y} @calciteSortHandleBeforeClose=${this.handleSortHandleBeforeClose} @calciteSortHandleBeforeOpen=${this.handleSortHandleBeforeOpen} @calciteSortHandleClose=${this.handleSortHandleClose} @calciteSortHandleOpen=${this.handleSortHandleOpen} overlay-positioning=fixed .scale=${this.scale} .setPosition=${H} .setSize=${B} .sortDisabled=${O} .topLayerDisabled=${this.topLayerDisabled} ${F(this.setSortHandleEl)}></calcite-sort-handle>` : null}${e ? a`<button aria-controls=${s.content} aria-describedby=${s.header} .ariaExpanded=${e ? n : void 0} class=${i(t.toggle)} id=${s.toggle} @click=${this.onHeaderClick} title=${u ?? $} type=button>${k}<div class=${i(t.iconEndContainer)}>${this.renderContentEnd()}${this.renderIcon("end")}${this.toggleDisplay === "switch" ? a`<calcite-switch .checked=${n} .disabled=${this.disabled} inert .label=${u} .scale=${this.scale}></calcite-switch>` : a`<calcite-icon class=${i(t.toggleIcon)} .icon=${T} .scale=${m(this.scale)}></calcite-icon>`}</div></button>` : k}${f && !e ? a`<div class=${i(t.iconEndContainer)}>${this.renderContentEnd()}${this.renderIcon("end")}</div>` : !f && !e ? this.renderContentEnd() : null}<calcite-action-menu .flipPlacements=${C ?? ["top", "bottom"]} .hidden=${!this.hasMenuActions} .label=${p.options} .overlayPositioning=${this.overlayPositioning} .placement=${S} .scale=${this.scale} .topLayerDisabled=${this.topLayerDisabled}><slot name=${d.headerMenuActions} @slotchange=${this.menuActionsSlotChangeHandler}></slot></calcite-action-menu>${this.renderActionsEnd()}</div>`;
    return this.interactiveContainer({ disabled: this.disabled, children: a`<article aria-label=${o ?? $} .ariaBusy=${l} class=${i({
      [t.container]: !0
    })}>${L}<section aria-labelledby=${s.toggle} class=${i({
      [t.content]: !0,
      [t.hasSlottedContent]: this.hasContent || l
    })} .hidden=${!n} id=${s.content}>${this.renderScrim()}</section><slot .hidden=${!n} name=${d.children}></slot></article>` });
  }
}
U("calcite-block", Y);
export {
  Y as Block
};
