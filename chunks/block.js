import { h as E, L as O, k as l, x as n, s as a, E as u, j as w } from "./iframe.js";
import { i as r } from "./keyed.js";
import { n as I } from "./ref.js";
import { f as P, s as d } from "./dom.js";
import { u as z, I as A } from "./interactive.js";
import { H as T } from "./Heading.js";
import { c as L } from "./component.js";
import { o as M } from "./openCloseComponent.js";
import { a as F } from "./floating-ui.js";
import { u as j } from "./useT9n.js";
import { l as D } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
const c = {
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
  headerHasText: "header--has-text",
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
}, f = {
  opened: "chevron-up",
  closed: "chevron-down",
  valid: "check-circle",
  invalid: "exclamation-mark-triangle"
}, R = E`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size: 1rem;--calcite-spacing-eighth: .125rem;--calcite-spacing-quarter: .25rem;--calcite-spacing-half: .5rem;--calcite-spacing-three-quarters: .75rem;--calcite-spacing: 1rem;--calcite-spacing-plus-quarter: 1.25rem;--calcite-spacing-plus-half: 1.5rem;--calcite-spacing-double: 2rem;--calcite-menu-min-width: 10rem;--calcite-header-min-height: 3rem;--calcite-footer-min-height: 3rem}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;border-width:0px;border-block-end-width:1px;border-style:solid;padding:0;transition-property:margin;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:cubic-bezier(.215,.44,.42,.88);flex-basis:auto;transition-duration:var(--calcite-animation-timing);border-color:var(--calcite-block-border-color, var(--calcite-color-border-3))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0;padding:0;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:.5rem}.header{justify-content:flex-start}.header--has-text{padding:var(--calcite-spacing-md)}.header,.toggle{grid-area:header}.header-container{display:grid;align-items:stretch;grid-template:auto/auto 1fr auto auto;grid-template-areas:"handle header control menu actions-end";grid-column:header-start/actions-end;grid-row:1/2}.content-start,.icon,.icon--start,.icon--end{margin-inline-end:var(--calcite-spacing-md)}.icon calcite-loader{margin-inline-end:var(--calcite-spacing-xxxs)}.icon--start,.icon--end{color:var(--calcite-block-text-color, var(--calcite-color-text-3))}.actions-end{grid-area:actions-end}.toggle{margin:0;display:flex;cursor:pointer;flex-wrap:nowrap;align-items:center;justify-content:space-between;border-style:none;padding:0;font-family:var(--calcite-font-family);outline-color:transparent;text-align:initial;background-color:var(--calcite-block-header-background-color, transparent)}.toggle:hover{background-color:var(--calcite-block-header-background-color-hover, var(--calcite-color-foreground-2))}.toggle:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}calcite-loader[inline]{grid-area:control;align-self:center}calcite-handle{grid-area:handle}.title{margin:0}.header .title .heading{padding:0;font-size:var(--calcite-font-size--1);font-weight:var(--calcite-font-weight-medium);line-height:1.25;transition-property:color;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);word-wrap:break-word;word-break:break-word;color:var(--calcite-block-heading-text-color, var(--calcite-color-text-2))}.description{margin-block-start:.125rem;padding:0;font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word;color:var(--calcite-block-text-color, var(--calcite-color-text-3))}.icon{display:flex}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}@keyframes spin{0%{transform:rotate(0)}50%{transform:rotate(180deg)}to{transform:rotate(360deg)}}.icon-end-container{display:flex;align-items:center;margin-inline-start:auto}.toggle-icon{align-self:center;justify-self:end;transition-property:color;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);margin-inline-end:var(--calcite-spacing-md);color:var(--calcite-block-text-color, var(--calcite-color-text-3))}.toggle:hover .toggle-icon{color:var(--calcite-block-heading-text-color-press, var(--calcite-color-text-1))}.container{position:relative;display:flex;block-size:100%;flex-direction:column}.content{position:relative;min-block-size:0px;flex:1 1 0%}@keyframes in{0%{opacity:0}to{opacity:1}}.content{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;padding-block:var(--calcite-block-padding, var(--calcite-spacing-sm));padding-inline:var(--calcite-block-padding, var(--calcite-spacing-md))}.content-start{display:flex;align-items:center;color:var(--calcite-block-text-color, var(--calcite-color-text-3))}.control-container{margin:0;display:flex;grid-area:control}calcite-action-menu{grid-area:menu}.actions-end{display:flex;align-items:stretch}:host([open]){margin-block:.5rem}:host([open]) .header .title .heading{color:var(--calcite-block-heading-text-color-press, var(--calcite-color-text-1))}:host([hidden]){display:none}[hidden]{display:none}`;
class q extends O {
  constructor() {
    super(...arguments), this.transitionProp = "margin-top", this.hasContentStart = !1, this.hasControl = !1, this.hasEndActions = !1, this.hasIcon = !1, this.hasMenuActions = !1, this.collapsible = !1, this.disabled = !1, this.dragDisabled = !1, this.dragHandle = !1, this.loading = !1, this.menuPlacement = F, this.messages = j(), this.moveToItems = [], this.open = !1, this.overlayPositioning = "absolute", this.setPosition = null, this.setSize = null, this.sortHandleOpen = !1, this.calciteBlockBeforeClose = l({ cancelable: !1 }), this.calciteBlockBeforeOpen = l({ cancelable: !1 }), this.calciteBlockClose = l({ cancelable: !1 }), this.calciteBlockOpen = l({ cancelable: !1 }), this.calciteBlockSortHandleBeforeClose = l({ cancelable: !1 }), this.calciteBlockSortHandleBeforeOpen = l({ cancelable: !1 }), this.calciteBlockSortHandleClose = l({ cancelable: !1 }), this.calciteBlockSortHandleOpen = l({ cancelable: !1 }), this.calciteBlockToggle = l({ cancelable: !1 });
  }
  static {
    this.properties = { hasContentStart: 16, hasControl: 16, hasEndActions: 16, hasIcon: 16, hasMenuActions: 16, collapsible: 7, description: 1, disabled: 7, dragDisabled: 7, dragHandle: 7, heading: 1, headingLevel: 11, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, loading: 7, label: 1, menuFlipPlacements: 0, menuPlacement: 3, messageOverrides: 0, moveToItems: 0, open: 7, overlayPositioning: 3, setPosition: 9, setSize: 9, sortHandleOpen: 7, status: 3 };
  }
  static {
    this.styles = R;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component's first tabbable element. */
  async setFocus() {
    await L(this), P(this.el);
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), this.transitionEl = this.el;
  }
  load() {
    !this.heading && !this.label && D.warn(`${this.el.tagName} is missing both heading & label. Please provide a heading or label for the component to be accessible.`);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && M(this), e.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== !1) && this.sortHandleOpenHandler();
  }
  updated() {
    z(this);
  }
  // #endregion
  // #region Private Methods
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
    this.open = !this.open, this.calciteBlockToggle.emit();
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
  // #endregion
  // #region Rendering
  renderScrim() {
    const { loading: e } = this, o = n`<slot></slot>`;
    return [e ? n`<calcite-scrim .loading=${e}></calcite-scrim>` : null, o];
  }
  renderLoaderStatusIcon() {
    const { loading: e, messages: o, status: i } = this;
    return e ? r("loader", n`<div class=${a(t.icon)}><calcite-loader inline .label=${o.loading}></calcite-loader></div>`) : i ? r("status-icon", n`<div class=${a(t.icon)}><calcite-icon class=${a({
      [t.statusIcon]: !0,
      [t.valid]: i == "valid",
      [t.invalid]: i == "invalid"
    })} .icon=${f[i]} scale=s></calcite-icon></div>`) : r("icon-slot", n`<div class=${a(t.icon)} .hidden=${!this.hasIcon}>${r("icon-slot", n`<slot name=${h.icon} @slotchange=${this.iconSlotChangeHandler}></slot>`)}</div>`);
  }
  renderActionsEnd() {
    return n`<div class=${a(t.actionsEnd)} .hidden=${!this.hasEndActions}><slot name=${h.actionsEnd} @slotchange=${this.actionsEndSlotChangeHandler}></slot></div>`;
  }
  renderContentStart() {
    return n`<div class=${a(t.contentStart)} .hidden=${!this.hasContentStart}><slot name=${h.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  renderTitle() {
    const { heading: e, headingLevel: o, description: i } = this;
    return e || i ? n`<div class=${a(t.title)}>${T({ class: t.heading, level: o, children: e })}${i ? n`<div class=${a(t.description)}>${i}</div>` : null}</div>` : null;
  }
  renderIcon(e) {
    const { iconFlipRtl: o } = this, i = o === "both" || e === "start" ? o === "start" : o === "end", s = e === "start" ? this.iconStart : this.iconEnd, g = e === "start" ? t.iconStart : t.iconEnd;
    if (s)
      return r(s, n`<calcite-icon class=${a(g)} .flipRtl=${i} .icon=${s} scale=s></calcite-icon>`);
  }
  render() {
    const { collapsible: e, loading: o, open: i, label: s, heading: g, messages: p, description: b, menuFlipPlacements: v, menuPlacement: $, moveToItems: S, setPosition: k, setSize: x, dragDisabled: C } = this, H = i ? p.collapse : p.expand, m = n`<header class=${a({ [t.header]: !0, [t.headerHasText]: !!(g || b) })} id=${c.header}>${this.renderIcon("start")}${this.renderContentStart()}${this.renderLoaderStatusIcon()}${this.renderTitle()}</header>`, y = i ? f.opened : f.closed, B = n`<div class=${a(t.headerContainer)}>${this.dragHandle ? n`<calcite-sort-handle .disabled=${C} .label=${g || s} .moveToItems=${S} @calciteSortHandleBeforeClose=${this.handleSortHandleBeforeClose} @calciteSortHandleBeforeOpen=${this.handleSortHandleBeforeOpen} @calciteSortHandleClose=${this.handleSortHandleClose} @calciteSortHandleOpen=${this.handleSortHandleOpen} overlay-positioning=fixed .setPosition=${k} .setSize=${x} ${I(this.setSortHandleEl)}></calcite-sort-handle>` : null}${e ? n`<button aria-controls=${c.content} aria-describedby=${c.header} .ariaExpanded=${e ? i : null} class=${a(t.toggle)} id=${c.toggle} @click=${this.onHeaderClick} title=${H ?? u}>${m}<div class=${a(t.iconEndContainer)}>${this.renderIcon("end")}<calcite-icon class=${a(t.toggleIcon)} .icon=${y} scale=s></calcite-icon></div></button>` : this.iconEnd ? n`<div>${m}<div class=${a(t.iconEndContainer)}>${this.renderIcon("end")}</div></div>` : m}<div aria-labelledby=${c.header} class=${a(t.controlContainer)} .hidden=${!this.hasControl}><slot name=${h.control} @slotchange=${this.controlSlotChangeHandler}></slot></div><calcite-action-menu .flipPlacements=${v ?? ["top", "bottom"]} .hidden=${!this.hasMenuActions} .label=${p.options} .overlayPositioning=${this.overlayPositioning} .placement=${$}><slot name=${h.headerMenuActions} @slotchange=${this.menuActionsSlotChangeHandler}></slot></calcite-action-menu>${this.renderActionsEnd()}</div>`;
    return A({ disabled: this.disabled, children: n`<article aria-label=${s ?? u} .ariaBusy=${o} class=${a({
      [t.container]: !0
    })}>${B}<section aria-labelledby=${c.toggle} class=${a(t.content)} .hidden=${!i} id=${c.content}>${this.renderScrim()}</section></article>` });
  }
}
w("calcite-block", q);
export {
  q as Block
};
