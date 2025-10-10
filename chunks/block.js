import { b as D, L as M, c, x as i, s as a, E as f, q as L } from "./index.js";
import { i as r } from "./keyed.js";
import { n as F } from "./ref.js";
import { s as d, d as U } from "./dom.js";
import { u as R, I as j } from "./interactive.js";
import { H as N } from "./Heading.js";
import { g as m } from "./component.js";
import { t as V } from "./openCloseComponent.js";
import { a as q } from "./floating-ui.js";
import { u as G } from "./useT9n.js";
import { l as u } from "./logger.js";
import { u as J } from "./useSetFocus.js";
import { s as K } from "./sortable.js";
import { s as Q } from "./header.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const l = {
  content: "content",
  toggle: "toggle",
  header: "header"
}, t = {
  actionsEnd: "actions-end",
  container: "container",
  content: "content",
  contentStart: "content-start",
  controlContainer: "control-container",
  description: "description",
  header: "header",
  headerContainer: "header-container",
  headerHasContent: "header--has-content",
  heading: "heading",
  icon: "icon",
  iconStart: "icon--start",
  iconEnd: "icon--end",
  iconEndContainer: "icon-end-container",
  invalid: "invalid",
  statusIcon: "status-icon",
  title: "title",
  toggle: "toggle",
  toggleIcon: "toggle-icon",
  valid: "valid"
}, h = {
  actionsEnd: "actions-end",
  contentStart: "content-start",
  control: "control",
  headerMenuActions: "header-menu-actions",
  icon: "icon"
}, v = {
  expanded: "chevron-up",
  collapsed: "chevron-down",
  valid: "check-circle",
  invalid: "exclamation-mark-triangle"
}, W = D`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .header{gap:var(--calcite-spacing-sm)}:host([scale=s]) .header--has-content{padding:var(--calcite-spacing-sm)}:host([scale=s]) .icon-end-container{gap:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .heading{font-size:var(--calcite-font-size-sm)}:host([scale=s]) .description{font-size:var(--calcite-font-size-xs)}:host([scale=s]){--calcite-internal-block-padding-block: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-xxs)) );--calcite-internal-block-padding-inline: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-sm)) )}:host([scale=m]) .header{gap:var(--calcite-spacing-md)}:host([scale=m]) .header--has-content{padding:var(--calcite-spacing-md)}:host([scale=m]) .icon-end-container{gap:var(--calcite-spacing-md);padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .heading{font-size:var(--calcite-font-size)}:host([scale=m]) .description{font-size:var(--calcite-font-size-sm)}:host([scale=m]){--calcite-internal-block-padding-block: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-sm)) );--calcite-internal-block-padding-inline: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-md)) )}:host([scale=l]) .header{gap:var(--calcite-spacing-lg)}:host([scale=l]) .header--has-content{padding:var(--calcite-spacing-lg)}:host([scale=l]) .icon-end-container{gap:var(--calcite-spacing-lg);padding-inline-end:var(--calcite-spacing-lg)}:host([scale=l]) .heading{font-size:var(--calcite-font-size-md)}:host([scale=l]) .description{font-size:var(--calcite-font-size)}:host([scale=l]){--calcite-internal-block-padding-block: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-md)) );--calcite-internal-block-padding-inline: var( --calcite-block-content-space, var(--calcite-block-padding, var(--calcite-spacing-lg)) )}:host{display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;border-width:0px;border-block-end-width:1px;border-style:solid;padding:0;transition-property:margin;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.215,.44,.42,.88);flex-basis:auto;border-color:var(--calcite-block-border-color, var(--calcite-color-border-3))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{justify-content:flex-start}.header,.toggle{grid-area:header}.header-container{display:grid;align-items:stretch;grid-template:auto/auto 1fr auto auto auto auto;grid-template-areas:"handle header icon-end control menu actions-end"}.icon--start,.icon--end{color:var(--calcite-block-icon-color, var(--calcite-color-text-3))}.actions-end{grid-area:actions-end}.toggle{margin:0;display:flex;cursor:pointer;flex-wrap:nowrap;align-items:center;justify-content:space-between;border-style:none;padding:0;font-family:var(--calcite-font-family);outline-color:transparent;text-align:initial;background-color:var(--calcite-block-header-background-color, transparent)}.toggle:hover{background-color:var(--calcite-block-header-background-color-hover, var(--calcite-color-foreground-2))}.toggle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.toggle:active{background-color:var(--calcite-block-header-background-color-press, var(--calcite-color-foreground-3))}calcite-loader[inline]{align-self:center}calcite-sort-handle{grid-area:handle}.title{display:flex;flex-direction:column}.header .title .heading{padding:0;transition-property:color;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1);word-wrap:break-word;word-break:break-word;color:var(--calcite-block-heading-text-color, var(--calcite-color-text-2));font-weight:var(--calcite-font-weight-medium);line-height:var(--calcite-font-line-height-relative-snug)}.description{padding:0;word-wrap:break-word;word-break:break-word;color:var(--calcite-block-description-text-color, var(--calcite-color-text-3));font-weight:var(--calcite-font-weight-regular);line-height:var(--calcite-font-line-height-relative-snug)}.icon{display:flex}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}@keyframes spin{0%{transform:rotate(0)}50%{transform:rotate(180deg)}to{transform:rotate(360deg)}}.icon-end-container{display:flex;align-items:center;grid-area:icon-end}.toggle-icon{align-self:center;justify-self:end;transition-property:color;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1);color:var(--calcite-block-icon-color, var(--calcite-color-text-3))}.toggle:hover .toggle-icon{color:var(--calcite-block-icon-color-hover, var(--calcite-color-text-1))}.container{position:relative;display:flex;block-size:100%;flex-direction:column}.content{position:relative;min-block-size:0px;flex:1 1 0%}@keyframes in{0%{opacity:0}to{opacity:1}}.content{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;padding-block:var(--calcite-internal-block-padding-block);padding-inline:var(--calcite-internal-block-padding-inline)}.content-start{display:flex;align-items:center;color:var(--calcite-block-text-color, var(--calcite-color-text-3))}.control-container{margin:0;display:flex;grid-area:control}calcite-action-menu{grid-area:menu}.actions-end{display:flex;align-items:stretch}:host([expanded]){margin-block:.5rem}:host([expanded]) .header .title .heading{color:var(--calcite-block-heading-text-color, var(--calcite-block-heading-text-color-press, var(--calcite-color-text-1)))}:host([expanded]) .description{color:var(--calcite-block-description-text-color, var(--calcite-color-text-2))}:host([expanded]) .icon--start,:host([expanded]) .icon--end{color:var(--calcite-block-icon-color, var(--calcite-color-text-1))}:host([expanded][scale=s]){margin-block:var(--calcite-spacing-xxs)}:host([expanded][scale=l]){margin-block:var(--calcite-spacing-md)}:host([hidden]){display:none}[hidden]{display:none}`;
class X extends M {
  constructor() {
    super(...arguments), this.transitionProp = "margin-top", this.blockSectionChildren = [], this.messages = G(), this.focusSetter = J()(this), this.hasContentStart = !1, this.hasControl = !1, this.hasEndActions = !1, this.hasIcon = !1, this.hasMenuActions = !1, this.collapsible = !1, this.disabled = !1, this.dragDisabled = !1, this.dragHandle = !1, this.expanded = !1, this.loading = !1, this.menuPlacement = q, this.addToItems = [], this.moveToItems = [], this.sortDisabled = !1, this.overlayPositioning = "absolute", this.scale = "m", this.setPosition = null, this.setSize = null, this.sortHandleOpen = !1, this.calciteInternalBlockUpdateSortMenuItems = c({ cancelable: !1 }), this.calciteBlockBeforeClose = c({ cancelable: !1 }), this.calciteBlockBeforeOpen = c({ cancelable: !1 }), this.calciteBlockClose = c({ cancelable: !1 }), this.calciteBlockCollapse = c({ cancelable: !1 }), this.calciteBlockExpand = c({ cancelable: !1 }), this.calciteBlockOpen = c({ cancelable: !1 }), this.calciteBlockSortHandleBeforeClose = c({ cancelable: !1 }), this.calciteBlockSortHandleBeforeOpen = c({ cancelable: !1 }), this.calciteBlockSortHandleClose = c({ cancelable: !1 }), this.calciteBlockSortHandleOpen = c({ cancelable: !1 }), this.calciteBlockToggle = c({ cancelable: !1 });
  }
  static {
    this.properties = { hasContentStart: 16, hasControl: 16, hasEndActions: 16, hasIcon: 16, hasMenuActions: 16, collapsible: 7, description: 1, disabled: 7, dragDisabled: 7, dragHandle: 7, expanded: 7, heading: 1, headingLevel: 11, iconEnd: [3, { type: String }], iconFlipRtl: 3, iconStart: [3, { type: String }], loading: 7, label: 1, menuFlipPlacements: 0, menuPlacement: 3, messageOverrides: 0, addToItems: 0, moveToItems: 0, sortDisabled: 5, open: 7, overlayPositioning: 3, scale: 3, setPosition: 9, setSize: 9, sortHandleOpen: 7, status: 3 };
  }
  static {
    this.styles = [Q, W, K];
  }
  get open() {
    return this.expanded;
  }
  set open(e) {
    u.deprecated("property", {
      name: "open",
      removalVersion: 4,
      suggested: "expanded"
    }), this.expanded = e;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.transitionEl = this.el;
  }
  load() {
    !this.heading && !this.label && u.warn(`${this.el.tagName} is missing both heading & label. Please provide a heading or label for the component to be accessible.`);
  }
  willUpdate(e) {
    e.has("expanded") && (this.hasUpdated || this.expanded !== !1) && V(this), e.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== !1) && this.sortHandleOpenHandler(), e.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteBlockExpand.emit() : this.calciteBlockCollapse.emit()), e.has("scale") && this.hasUpdated && this.updateBlockSectionScale();
  }
  updated() {
    R(this);
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
    this.expanded = !this.expanded, this.calciteBlockToggle.emit();
  }
  controlSlotChangeHandler(e) {
    this.hasControl = d(e);
  }
  menuActionsSlotChangeHandler(e) {
    this.hasMenuActions = d(e);
  }
  iconSlotChangeHandler(e) {
    this.hasIcon = d(e);
  }
  actionsEndSlotChangeHandler(e) {
    this.hasEndActions = d(e);
  }
  handleContentStartSlotChange(e) {
    this.hasContentStart = d(e);
  }
  handleDefaultSlotChange(e) {
    this.blockSectionChildren = U(e, "calcite-block-section"), this.updateBlockSectionScale();
  }
  updateBlockSectionScale() {
    this.blockSectionChildren.forEach((e) => {
      e.scale = this.scale;
    });
  }
  renderScrim() {
    const { loading: e } = this, o = i`<slot @slotchange=${this.handleDefaultSlotChange}></slot>`;
    return [e ? i`<calcite-scrim .loading=${e}></calcite-scrim>` : null, o];
  }
  renderLoaderStatusIcon() {
    const { loading: e, messages: o, status: n } = this;
    return e ? r("loader", i`<div class=${a(t.icon)}><calcite-loader inline .label=${o.loading} .scale=${this.scale}></calcite-loader></div>`) : n ? r("status-icon", i`<div class=${a(t.icon)}><calcite-icon class=${a({
      [t.statusIcon]: !0,
      [t.valid]: n == "valid",
      [t.invalid]: n == "invalid"
    })} .icon=${v[n]} .scale=${m(this.scale)}></calcite-icon></div>`) : r("icon-slot", i`<div class=${a(t.icon)} .hidden=${!this.hasIcon}>${r("icon-slot", i`<slot name=${h.icon} @slotchange=${this.iconSlotChangeHandler}></slot>`)}</div>`);
  }
  renderActionsEnd() {
    return i`<div class=${a(t.actionsEnd)} .hidden=${!this.hasEndActions}><slot name=${h.actionsEnd} @slotchange=${this.actionsEndSlotChangeHandler}></slot></div>`;
  }
  renderContentStart() {
    return i`<div class=${a(t.contentStart)} .hidden=${!this.hasContentStart}><slot name=${h.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  renderTitle() {
    const { heading: e, headingLevel: o, description: n } = this;
    return e || n ? i`<div class=${a(t.title)}>${N({ class: t.heading, level: o, children: e })}${n ? i`<div class=${a(t.description)}>${n}</div>` : null}</div>` : null;
  }
  renderIcon(e) {
    const { iconFlipRtl: o } = this, n = o === "both" || e === "start" ? o === "start" : o === "end", s = e === "start" ? this.iconStart : this.iconEnd, p = e === "start" ? t.iconStart : t.iconEnd;
    if (s)
      return r(s, i`<calcite-icon class=${a(p)} .flipRtl=${n} .icon=${s} .scale=${m(this.scale)}></calcite-icon>`);
  }
  render() {
    const { collapsible: e, loading: o, expanded: n, label: s, heading: p, messages: g, description: k, menuFlipPlacements: $, menuPlacement: S, moveToItems: x, addToItems: C, setPosition: H, setSize: y, dragDisabled: B, sortDisabled: E, iconEnd: I, hasContentStart: O, iconStart: w } = this, z = n ? g.collapse : g.expand, P = !!(p || k || O || w || o || status), b = i`<header class=${a({
      [t.header]: !0,
      [t.headerHasContent]: P
    })} id=${l.header}>${this.renderIcon("start")}${this.renderContentStart()}${this.renderLoaderStatusIcon()}${this.renderTitle()}</header>`, A = n ? v.expanded : v.collapsed, T = i`<div class=${a(t.headerContainer)}>${this.dragHandle ? i`<calcite-sort-handle .addToItems=${C} .disabled=${B} .label=${p || s} .moveToItems=${x} @calciteSortHandleBeforeClose=${this.handleSortHandleBeforeClose} @calciteSortHandleBeforeOpen=${this.handleSortHandleBeforeOpen} @calciteSortHandleClose=${this.handleSortHandleClose} @calciteSortHandleOpen=${this.handleSortHandleOpen} overlay-positioning=fixed .scale=${this.scale} .setPosition=${H} .setSize=${y} .sortDisabled=${E} ${F(this.setSortHandleEl)}></calcite-sort-handle>` : null}${e ? i`<button aria-controls=${l.content} aria-describedby=${l.header} .ariaExpanded=${e ? n : null} class=${a(t.toggle)} id=${l.toggle} @click=${this.onHeaderClick} title=${z ?? f}>${b}<div class=${a(t.iconEndContainer)}>${this.renderIcon("end")}<calcite-icon class=${a(t.toggleIcon)} .icon=${A} .scale=${m(this.scale)}></calcite-icon></div></button>` : b}${I && !e ? i`<div class=${a(t.iconEndContainer)}>${this.renderIcon("end")}</div>` : null}<div aria-labelledby=${l.header} class=${a(t.controlContainer)} .hidden=${!this.hasControl}><slot name=${h.control} @slotchange=${this.controlSlotChangeHandler}></slot></div><calcite-action-menu .flipPlacements=${$ ?? ["top", "bottom"]} .hidden=${!this.hasMenuActions} .label=${g.options} .overlayPositioning=${this.overlayPositioning} .placement=${S} .scale=${this.scale}><slot name=${h.headerMenuActions} @slotchange=${this.menuActionsSlotChangeHandler}></slot></calcite-action-menu>${this.renderActionsEnd()}</div>`;
    return j({ disabled: this.disabled, children: i`<article aria-label=${s ?? f} .ariaBusy=${o} class=${a({
      [t.container]: !0
    })}>${T}<section aria-labelledby=${l.toggle} class=${a(t.content)} .hidden=${!n} id=${l.content}>${this.renderScrim()}</section></article>` });
  }
}
L("calcite-block", X);
export {
  X as Block
};
