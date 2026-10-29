/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as M, L as G, d as l, c as g, b as t, s as c, A as $, f as F } from "./index.js";
import { i as m } from "./keyed.js";
import { n as U } from "./ref.js";
import { s as r, b as R, d as j } from "./dom.js";
import { H as N } from "./Heading.js";
import { g as v } from "./component.js";
import { a as V } from "./floating-ui.js";
import { u as q } from "./useT9n.js";
import { u as J } from "./useFocusable.js";
import { s as K } from "./sortable.js";
import { s as Q } from "./header.js";
import { u as W } from "./useInteractive.js";
import { C as a, I as b, S as d, a as s } from "./resources10.js";
import { t as X } from "./aria.js";
const Y = M`:host{box-sizing:border-box;background-color:var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1));color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .header{gap:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .icon-end-container{gap:var(--calcite-theme-space-sm, var(--calcite-spacing-sm));padding-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .heading{font-size:var(--calcite-font-size-sm)}:host([scale=s]) .description{font-size:var(--calcite-font-size-xs)}:host([scale=s]){--calcite-internal-block-actions-spacing: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs));--calcite-internal-block-header-content-padding: var(--calcite-theme-space-sm, var(--calcite-spacing-sm));--calcite-internal-block-padding-block: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))) );--calcite-internal-block-padding-inline: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-theme-space-sm, var(--calcite-spacing-sm))) )}:host([scale=m]) .header{gap:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=m]) .icon-end-container{gap:var(--calcite-theme-space-md, var(--calcite-spacing-md));padding-inline-end:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=m]) .heading{font-size:var(--calcite-font-size)}:host([scale=m]) .description{font-size:var(--calcite-font-size-sm)}:host([scale=m]){--calcite-internal-block-actions-spacing: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs));--calcite-internal-block-header-content-padding: var(--calcite-theme-space-md, var(--calcite-spacing-md));--calcite-internal-block-padding-block: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-theme-space-sm, var(--calcite-spacing-sm))) );--calcite-internal-block-padding-inline: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-theme-space-md, var(--calcite-spacing-md))) )}:host([scale=l]) .header{gap:var(--calcite-theme-space-lg, var(--calcite-spacing-lg))}:host([scale=l]) .icon-end-container{gap:var(--calcite-theme-space-lg, var(--calcite-spacing-lg));padding-inline-end:var(--calcite-theme-space-lg, var(--calcite-spacing-lg))}:host([scale=l]) .heading{font-size:var(--calcite-font-size-md)}:host([scale=l]) .description{font-size:var(--calcite-font-size)}:host([scale=l]){--calcite-internal-block-actions-spacing: var(--calcite-theme-space-xs, var(--calcite-spacing-xs));--calcite-internal-block-header-content-padding: var(--calcite-theme-space-lg, var(--calcite-spacing-lg));--calcite-internal-block-padding-block: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-theme-space-md, var(--calcite-spacing-md))) );--calcite-internal-block-padding-inline: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-theme-space-lg, var(--calcite-spacing-lg))) )}:host{transition-property:margin;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;transition-timing-function:var(--calcite-animation-easing-function);display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;border-width:var(--calcite-border-width-none);border-block-end-width:var(--calcite-border-width-sm);border-style:solid;padding:0;flex-basis:auto;border-color:var(--calcite-block-border-color, var(--calcite-color-border-3));background-color:var(--calcite-block-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{justify-content:flex-start}.header--has-content{padding:var(--calcite-internal-block-header-content-padding)}.header--draggable{padding-inline-start:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}.header,.toggle{grid-area:header}.header-container{display:grid;align-items:stretch;grid-template:auto/auto 1fr auto auto auto auto;grid-template-areas:"handle header icon-end menu actions-end"}.icon--start{color:var(--calcite-block-icon-start-color, var(--calcite-block-icon-color, var(--calcite-color-text-3)))}.icon--end{color:var(--calcite-block-icon-end-color, var(--calcite-block-icon-color, var(--calcite-color-text-3)))}.actions-end{align-items:center;display:flex;gap:var(--calcite-internal-block-actions-spacing);grid-area:actions-end;padding-block:var(--calcite-internal-block-actions-spacing);padding-inline-end:var(--calcite-internal-block-actions-spacing)}.toggle{outline-color:transparent;display:flex;cursor:pointer;flex-wrap:nowrap;align-items:center;justify-content:space-between;border-style:none;margin:0;padding:0;font-family:inherit;text-align:initial;background-color:var(--calcite-block-header-background-color, transparent)}.toggle:hover{background-color:var(--calcite-block-header-background-color-hover, var(--calcite-theme-color-surface-3, var(--calcite-color-foreground-2)))}.toggle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}.toggle:active{background-color:var(--calcite-block-header-background-color-press, var(--calcite-theme-color-surface-4, var(--calcite-color-foreground-3)))}calcite-loader[inline]{align-self:center}calcite-sort-handle{align-self:center;grid-area:handle;margin-block:var(--calcite-internal-block-actions-spacing);padding-inline-start:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}.title{display:flex;flex-direction:column}.header .title .heading{overflow-wrap:break-word;word-break:break-word;padding:0;color:var(--calcite-block-heading-text-color, var(--calcite-color-text-1));font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal));line-height:var(--calcite-font-line-height-relative-snug)}.description{overflow-wrap:break-word;word-break:break-word;padding:0;color:var(--calcite-block-description-text-color, var(--calcite-color-text-3));font-weight:var(--calcite-font-weight-regular);line-height:var(--calcite-font-line-height-relative-snug)}.icon{display:flex}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}@keyframes spin{0%{transform:rotate(0)}50%{transform:rotate(180deg)}to{transform:rotate(360deg)}}.icon-end-container{display:flex;align-items:center;grid-area:icon-end}.toggle-icon{transition-property:color;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;align-self:center;justify-self:end;transition-timing-function:var(--calcite-animation-easing-function);color:var(--calcite-block-expandable-icon-color, var(--calcite-block-collapsible-icon-color, var(--calcite-block-icon-color, var(--calcite-color-text-3))))}.toggle:hover .toggle-icon{color:var(--calcite-block-expandable-icon-color-hover, var(--calcite-block-collapsible-icon-color-hover, var(--calcite-block-icon-color-hover, var(--calcite-color-text-1))))}.container{display:flex;flex-direction:column;block-size:100%;position:relative}.content{flex:1 1 0%;position:relative;min-block-size:0;opacity:0;transition:opacity var(--calcite-internal-animation-timing-slow) ease-in-out}.has-slotted-content{padding-block:var(--calcite-internal-block-padding-block);padding-inline:var(--calcite-internal-block-padding-inline)}.content-end,.content-start{display:flex;align-items:center;color:var(--calcite-block-text-color, var(--calcite-color-text-3))}calcite-action-menu{align-self:center;grid-area:menu;margin-inline-end:var(--calcite-internal-block-actions-spacing)}:host([expanded]){margin-block:var(--calcite-space-sm)}:host([expanded]) .header .title .heading{color:var(--calcite-block-heading-text-color, var(--calcite-block-heading-text-color-press, var(--calcite-color-text-1)));font-weight:var(--calcite-font-weight-medium)}:host([expanded]) .description{color:var(--calcite-block-description-text-color, var(--calcite-color-text-2))}:host([expanded]) .icon--start{color:var(--calcite-block-icon-start-color, var(--calcite-block-icon-color, var(--calcite-color-text-1)))}:host([expanded]) .icon--end{color:var(--calcite-block-icon-end-color, var(--calcite-block-icon-color, var(--calcite-color-text-1)))}:host([expanded]) .content{opacity:1}@starting-style{:host([expanded]){margin-block-start:0;opacity:0}}:host([expanded][scale=s]){margin-block:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([expanded][scale=l]){margin-block:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([hidden]){display:none}[hidden]{display:none}slot[name=children]::slotted(calcite-block){border-block-end-width:0}`;
class Z extends G {
  constructor() {
    super(...arguments), this.blockSectionChildren = [], this.messages = q(), this.focusSetter = J()(this), this.interactiveContainer = W(this), this.hasContentEnd = !1, this.hasContentStart = !1, this.hasEndActions = !1, this.hasMenuActions = !1, this.hasContent = !1, this.disabled = !1, this.dragDisabled = !1, this.dragHandle = !1, this.expanded = !1, this.expandable = !1, this.loading = !1, this.menuPlacement = V, this.addToItems = [], this.moveToItems = [], this.sortDisabled = !1, this.overlayPositioning = "absolute", this.scale = "m", this.sortHandleOpen = !1, this.toggleDisplay = "button", this.topLayerDisabled = !1, this.calciteBlockCollapse = l({ cancelable: !1 }), this.calciteBlockExpand = l({ cancelable: !1 }), this.calciteBlockSortHandleBeforeClose = l({ cancelable: !1 }), this.calciteBlockSortHandleBeforeOpen = l({ cancelable: !1 }), this.calciteBlockSortHandleClose = l({ cancelable: !1 }), this.calciteBlockSortHandleOpen = l({ cancelable: !1 }), this.calciteInternalBlockChange = l({
      cancelable: !1
    }), this.calciteInternalBlockUpdateSortMenuItems = l({ cancelable: !1 });
  }
  static {
    this.properties = { hasContentEnd: 16, hasContentStart: 16, hasEndActions: 16, hasMenuActions: 16, hasContent: 16, description: 1, disabled: 7, dragDisabled: 7, dragHandle: 7, expanded: 7, expandable: 7, collapsible: 7, heading: 1, headingLevel: 11, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, loading: 7, label: 1, menuFlipPlacements: 0, menuPlacement: 3, messageOverrides: 0, addToItems: 0, moveToItems: 0, sortDisabled: 5, open: 7, overlayPositioning: 3, scale: 3, setPosition: 9, setSize: 9, sortHandleOpen: 7, status: 3, toggleDisplay: 3, topLayerDisabled: 7 };
  }
  static {
    this.styles = [Q, Y, K];
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
    super.connectedCallback(), this.setParentBlockGroupElement();
  }
  load() {
    !this.heading && !this.label && g.warn(`${this.el.tagName} is missing both heading & label. Please provide a heading or label for the component to be accessible.`);
  }
  willUpdate(e) {
    e.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== !1) && this.sortHandleOpenHandler(), e.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteBlockExpand.emit() : this.calciteBlockCollapse.emit()), e.has("scale") && this.hasUpdated && this.updateBlockSectionScale(), (e.has("moveToItems") || e.has("addToItems")) && this.hasUpdated && this.setParentBlockGroupElement();
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
    this.parentBlockGroupElement ? this.calciteInternalBlockChange.emit({
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
    this.blockSectionChildren = R(e, "calcite-block-section"), this.hasContent = j(e) || r(e), this.updateBlockSectionScale();
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
    const { loading: e } = this, n = t`<slot @slotchange=${this.handleDefaultSlotChange}></slot>`;
    return [e ? t`<calcite-scrim .loading=${e}></calcite-scrim>` : null, n];
  }
  renderLoaderStatusIcon() {
    const { loading: e, messages: n, status: i } = this;
    return e ? m("loader", t`<div class=${c(a.icon)}><calcite-loader inline .label=${n.loading} .scale=${this.scale}></calcite-loader></div>`) : i ? m("status-icon", t`<div class=${c(a.icon)}><calcite-icon class=${c({
      [a.statusIcon]: !0,
      [a.valid]: i == "valid",
      [a.invalid]: i == "invalid"
    })} .icon=${b[i]} .scale=${v(this.scale)}></calcite-icon></div>`) : null;
  }
  renderActionsEnd() {
    return t`<div class=${c(a.actionsEnd)} .hidden=${!this.hasEndActions}><slot name=${d.actionsEnd} @slotchange=${this.actionsEndSlotChangeHandler}></slot></div>`;
  }
  renderContentEnd() {
    return t`<div class=${c({ [a.iconEndContainer]: !this.iconEnd && !this.expandable })} .hidden=${!this.hasContentEnd}><div class=${c(a.contentEnd)}><slot name=${d.contentEnd} @slotchange=${this.handleContentEndSlotChange}></slot></div></div>`;
  }
  renderContentStart() {
    return t`<div class=${c(a.contentStart)} .hidden=${!this.hasContentStart}><slot name=${d.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  renderTitle() {
    const { heading: e, headingLevel: n, description: i } = this;
    return e || i ? t`<div class=${c(a.title)}>${N({ class: a.heading, level: n, children: e })}${i ? t`<div class=${c(a.description)}>${i}</div>` : null}</div>` : null;
  }
  renderIcon(e) {
    const { iconFlipRtl: n } = this, i = n === "both" || e === "start" ? n === "start" : n === "end", o = e === "start" ? this.iconStart : this.iconEnd, h = e === "start" ? a.iconStart : a.iconEnd;
    if (o)
      return m(o, t`<calcite-icon class=${c(h)} .flipRtl=${i} .icon=${o} .scale=${v(this.scale)}></calcite-icon>`);
  }
  render() {
    const { expandable: e, loading: n, expanded: i, label: o, heading: h, messages: p, description: x, menuFlipPlacements: S, menuPlacement: C, moveToItems: y, addToItems: E, setPosition: H, setSize: B, dragDisabled: w, sortDisabled: I, iconEnd: u, hasContentEnd: O, hasContentStart: P, iconStart: z, status: D } = this, f = i ? p.collapse : p.expand, A = !!(h || x || O || P || z || n || D), k = t`<header class=${c({
      [a.header]: !0,
      [a.headerHasContent]: A,
      [a.headerDraggable]: this.dragHandle
    })} id=${s.header}>${this.renderIcon("start")}${this.renderContentStart()}${this.renderLoaderStatusIcon()}${this.renderTitle()}</header>`, T = i ? b.expanded : b.collapsed, L = t`<div class=${c(a.headerContainer)}>${this.dragHandle ? t`<calcite-sort-handle .addToItems=${E} .disabled=${w} .label=${h || o} .moveToItems=${y} @calciteSortHandleBeforeClose=${this.handleSortHandleBeforeClose} @calciteSortHandleBeforeOpen=${this.handleSortHandleBeforeOpen} @calciteSortHandleClose=${this.handleSortHandleClose} @calciteSortHandleOpen=${this.handleSortHandleOpen} overlay-positioning=fixed .scale=${this.scale} .setPosition=${H} .setSize=${B} .sortDisabled=${I} .topLayerDisabled=${this.topLayerDisabled} ${U(this.setSortHandleEl)}></calcite-sort-handle>` : null}${e ? t`<button aria-controls=${s.content} aria-describedby=${s.header} .ariaExpanded=${e ? i : void 0} class=${c(a.toggle)} id=${s.toggle} @click=${this.onHeaderClick} title=${f ?? $} type=button>${k}<div class=${c(a.iconEndContainer)}>${this.renderContentEnd()}${this.renderIcon("end")}${this.toggleDisplay === "switch" ? t`<calcite-switch .checked=${i} .disabled=${this.disabled} inert .label=${f} .scale=${this.scale}></calcite-switch>` : t`<calcite-icon class=${c(a.toggleIcon)} .icon=${T} .scale=${v(this.scale)}></calcite-icon>`}</div></button>` : k}${u && !e ? t`<div class=${c(a.iconEndContainer)}>${this.renderContentEnd()}${this.renderIcon("end")}</div>` : !u && !e ? this.renderContentEnd() : null}<calcite-action-menu .flipPlacements=${S ?? ["top", "bottom"]} .hidden=${!this.hasMenuActions} .label=${p.options} .overlayPositioning=${this.overlayPositioning} .placement=${C} .scale=${this.scale} .topLayerDisabled=${this.topLayerDisabled}><slot name=${d.headerMenuActions} @slotchange=${this.menuActionsSlotChangeHandler}></slot></calcite-action-menu>${this.renderActionsEnd()}</div>`;
    return this.interactiveContainer({ disabled: this.disabled, children: t`<article aria-label=${o ?? $} .ariaBusy=${X(n, void 0)} class=${c({
      [a.container]: !0
    })}>${L}<section aria-labelledby=${s.toggle} class=${c({
      [a.content]: !0,
      [a.hasSlottedContent]: this.hasContent || n
    })} .hidden=${!i} id=${s.content}>${this.renderScrim()}</section><slot .hidden=${!i} name=${d.children}></slot></article>` });
  }
}
F("calcite-block", Z);
export {
  Z as Block
};
