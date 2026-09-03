/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as b, L as M, c as l, s as m, b as u, A as d, d as B } from "./index.js";
import { e as f, n as c } from "./ref.js";
import { g } from "./array.js";
import { t as S } from "./aria.js";
import { a as r } from "./dom.js";
import { g as C } from "./guid.js";
import { i as $ } from "./key.js";
import { i as v } from "./resources.js";
import { i as A } from "./resources3.js";
import { i as w } from "./resources5.js";
import { u as y } from "./useSetFocus.js";
import { I as h, C as p, S as E, a as D } from "./resources4.js";
const P = b`:host([scale=s]){--calcite-internal-action-menu-gap: var(--calcite-action-menu-items-space, var(--calcite-spacing-xxs));--calcite-internal-action-menu-padding: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-action-menu-gap: var(--calcite-action-menu-items-space, var(--calcite-spacing-sm));--calcite-internal-action-menu-padding: var(--calcite-spacing-sm)}:host([scale=l]){--calcite-internal-action-menu-gap: var(--calcite-action-menu-items-space, var(--calcite-spacing-sm-plus));--calcite-internal-action-menu-padding: var(--calcite-spacing-sm-plus)}:host{box-sizing:border-box;display:flex;flex-direction:column;font-size:var(--calcite-font-size-relative-lg)}::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm);padding-block-end:var(--calcite-internal-action-menu-padding)}.default-trigger{position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}.menu{display:flex;max-block-size:45vh;flex-direction:column;flex-wrap:nowrap;overflow-y:auto;overflow-x:hidden;outline:2px solid transparent;outline-offset:2px;gap:var(--calcite-internal-action-menu-gap);padding:var(--calcite-internal-action-menu-padding)}:host([hidden]){display:none}[hidden]{display:none}`, R = ["ArrowUp", "ArrowDown", "End", "Home"];
class O extends M {
  constructor() {
    super(), this.guid = C(), this._actions = [], this.navigableActions = [], this.defaultSlotRef = f(), this.triggerSlotRef = f(), this.menuButtonClick = () => {
      this.toggleOpen();
    }, this.menuButtonId = h.button(this.guid), this.menuButtonKeyDown = (t) => {
      const { key: e } = t, { activeMenuItemIndex: s, navigableActions: i, open: n } = this;
      if (i.length) {
        if ($(e)) {
          if (t.preventDefault(), !n) {
            this.toggleOpen();
            return;
          }
          const o = i[s];
          o ? o.click() : this.toggleOpen(!1);
        }
        if (e === "Tab") {
          this.open = !1;
          return;
        }
        if (e === "Escape") {
          this.toggleOpen(!1), t.preventDefault();
          return;
        }
        this.handleActionNavigation(t, e, i);
      }
    }, this.menuId = h.menu(this.guid), this._open = !1, this.updateAction = (t, e) => {
      const { guid: s, activeMenuItemIndex: i } = this, n = h.action(s, e);
      t.tabIndex = -1, t.setAttribute("role", "menuitem"), t.id || (t.id = n), t.activeDescendant = e === i;
    }, this.focusSetter = y()(this), this.mouseDownHandler = (t) => {
      t.composedPath().some(v) && (this.activeMenuItemIndex = this.navigableActions.findIndex((e) => e === t.target));
    }, this.activeMenuItemIndex = -1, this.appearance = "solid", this.expanded = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.topLayerDisabled = !1, this.scale = "m", this.calciteActionMenuCollapse = l({ cancelable: !1 }), this.calciteActionMenuExpand = l({ cancelable: !1 }), this.calciteActionMenuOpen = l({ cancelable: !1 }), this.calciteInternalActionMenuActionsChange = l({ cancelable: !1 }), this.listen("calciteInternalActionGroupActionsChange", this.handleActionGroupActionsChange);
  }
  static {
    this.properties = { activeMenuItemIndex: 16, menuButtonEl: 16, appearance: 3, expanded: 7, flipPlacements: 0, label: 1, open: 7, overlayPositioning: 3, placement: 3, topLayerDisabled: 7, scale: 3, actions: 32 };
  }
  static {
    this.styles = P;
  }
  get open() {
    return this._open;
  }
  set open(t) {
    const e = this._open;
    t !== e && (this._open = t, this.openHandler(t));
  }
  get actions() {
    return this._actions;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.menuButtonEl, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectMenuButtonEl(), this.listen("mousedown", this.mouseDownHandler);
  }
  willUpdate(t) {
    t.has("expanded") && (this.hasUpdated || this.expanded !== !1) && this.expandedHandler(), t.has("activeMenuItemIndex") && (this.hasUpdated || this.activeMenuItemIndex !== -1) && this.updateActions(this.navigableActions), t.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteActionMenuExpand.emit() : this.calciteActionMenuCollapse.emit());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectMenuButtonEl();
  }
  expandedHandler() {
    this.open = !1, this.setTooltipReferenceElement();
  }
  openHandler(t) {
    this.menuButtonEl && (this.menuButtonEl.active = t, this.menuButtonEl.aria = {
      expanded: t
    }), this.popoverEl && (this.popoverEl.open = t), this.activeMenuItemIndex = this.open ? 0 : -1, this.calciteActionMenuOpen.emit(), this.setTooltipReferenceElement();
  }
  connectMenuButtonEl() {
    const { menuButtonId: t, menuId: e, open: s, label: i } = this, n = this.slottedMenuButtonEl || this.defaultMenuButtonEl;
    this.menuButtonEl !== n && (this.disconnectMenuButtonEl(), this.menuButtonEl = n, this.setTooltipReferenceElement(), n && (n.active = s, n.setAttribute("aria-controls", e), n.setAttribute("aria-expanded", S(s)), n.setAttribute("aria-haspopup", "true"), n.id || (n.id = t), n.label || (n.label = i), n.text || (n.text = i), n.addEventListener("click", this.menuButtonClick), n.addEventListener("keydown", this.menuButtonKeyDown)));
  }
  disconnectMenuButtonEl() {
    const { menuButtonEl: t } = this;
    t && (t.removeEventListener("click", this.menuButtonClick), t.removeEventListener("keydown", this.menuButtonKeyDown), this.menuButtonEl = void 0);
  }
  syncActions() {
    const t = this.triggerSlotRef.value, e = t ? r(t, "calcite-action").filter((a) => !a.classList.contains(p.defaultTrigger)) : [], s = new Set(e), i = this.defaultSlotRef.value ? r(this.defaultSlotRef.value).flatMap((a) => v(a) ? a : A(a) ? a.actions : []) : [], n = [], o = /* @__PURE__ */ new Set();
    [...e, ...i].forEach((a) => {
      o.has(a) || (o.add(a), n.push(a));
    }), this._actions = n, this.navigableActions = n.filter((a) => !s.has(a) && !a.disabled && !a.hidden), !this.open || !this.navigableActions.length ? this.activeMenuItemIndex = -1 : (this.activeMenuItemIndex < 0 || this.activeMenuItemIndex >= this.navigableActions.length) && (this.activeMenuItemIndex = 0), this.updateActions(this.navigableActions);
  }
  setMenuButtonEl() {
    this.slottedMenuButtonEl = this.triggerSlotRef.value ? r(this.triggerSlotRef.value, "calcite-action")[0] : void 0, this.connectMenuButtonEl();
  }
  syncActionsAndEmitChange() {
    this.syncActions(), this.calciteInternalActionMenuActionsChange.emit();
  }
  handleTriggerSlotChange() {
    this.setMenuButtonEl(), this.syncActionsAndEmitChange();
  }
  setDefaultMenuButtonEl(t) {
    this.defaultMenuButtonEl = t, this.connectMenuButtonEl();
  }
  setPopoverEl(t) {
    t && (this.popoverEl = t, t.open = this.open);
  }
  handleCalciteActionClick(t) {
    this.navigableActions.some((e) => t.composedPath().includes(e)) && (this.open = !1, this.setFocus());
  }
  updateTooltip(t) {
    const e = t.target.assignedElements({
      flatten: !0
    }).filter(w);
    this.tooltipEl = e[0], this.setTooltipReferenceElement();
  }
  setTooltipReferenceElement() {
    const { tooltipEl: t, expanded: e, menuButtonEl: s, open: i } = this;
    t && (t.referenceElement = !e && !i ? s : void 0);
  }
  updateActions(t) {
    t.forEach(this.updateAction);
  }
  async handleDefaultSlotChange() {
    await this.componentOnReady(), this.syncActionsAndEmitChange();
  }
  handleActionGroupActionsChange(t) {
    const e = t.target;
    (this.defaultSlotRef.value ? r(this.defaultSlotRef.value).filter((i) => A(i)) : []).includes(e) && this.syncActionsAndEmitChange();
  }
  isValidKey(t, e) {
    return !!e.find((s) => s === t);
  }
  handleActionNavigation(t, e, s) {
    if (!this.isValidKey(e, R))
      return;
    if (t.preventDefault(), !this.open) {
      this.toggleOpen(), (e === "Home" || e === "ArrowDown") && (this.activeMenuItemIndex = 0), (e === "End" || e === "ArrowUp") && (this.activeMenuItemIndex = s.length - 1);
      return;
    }
    e === "Home" && (this.activeMenuItemIndex = 0), e === "End" && (this.activeMenuItemIndex = s.length - 1);
    const i = this.activeMenuItemIndex;
    e === "ArrowUp" && (this.activeMenuItemIndex = g(Math.max(i - 1, -1), s.length)), e === "ArrowDown" && (this.activeMenuItemIndex = g(i + 1, s.length));
  }
  toggleOpen(t = !this.open) {
    this.open = t;
  }
  handlePopoverOpen(t) {
    t.stopPropagation(), this.open = !0, this.setFocus();
  }
  handlePopoverClose(t) {
    t.stopPropagation(), this.open = !1;
  }
  renderMenuButton() {
    const { appearance: t, label: e, scale: s, expanded: i } = this;
    return u`<slot name=${E.trigger} @slotchange=${this.handleTriggerSlotChange} ${c(this.triggerSlotRef)}><calcite-action .appearance=${t} .aria=${{ expanded: i }} class=${m(p.defaultTrigger)} .icon=${D.menu} .scale=${s} .text=${e} .textEnabled=${i} ${c(this.setDefaultMenuButtonEl)}></calcite-action></slot>`;
  }
  renderMenuItems() {
    const { navigableActions: t, activeMenuItemIndex: e, menuId: s, menuButtonEl: i, label: n, placement: o, overlayPositioning: a, flipPlacements: x } = this, I = t[e]?.id || null;
    return u`<calcite-popover auto-close .flipPlacements=${x} focus-trap-disabled .label=${n} offset-distance=0 @calcitePopoverClose=${this.handlePopoverClose} @calcitePopoverOpen=${this.handlePopoverOpen} .overlayPositioning=${a} .placement=${o} pointer-disabled .referenceElement=${i} .scale=${this.scale} .topLayerDisabled=${this.topLayerDisabled} trigger-disabled ${c(this.setPopoverEl)}><div aria-activedescendant=${I ?? void 0 ?? d} aria-labelledby=${i?.id ?? d} class=${m(p.menu)} id=${s ?? d} @click=${this.handleCalciteActionClick} role=menu tabindex=-1><slot @slotchange=${this.handleDefaultSlotChange} ${c(this.defaultSlotRef)}></slot></div></calcite-popover>`;
  }
  render() {
    return u`${this.renderMenuButton()}${this.renderMenuItems()}<slot name=${E.tooltip} @slotchange=${this.updateTooltip}></slot>`;
  }
}
B("calcite-action-menu", O);
export {
  O as ActionMenu
};
