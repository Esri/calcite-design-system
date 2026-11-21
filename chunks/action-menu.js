/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as T, L as w, d as u, s as v, b as d, A, f as y } from "./index.js";
import { e as b, n as r } from "./ref.js";
import { g as E } from "./array.js";
import { b as c } from "./dom.js";
import { g as $ } from "./guid.js";
import { i as x } from "./resources.js";
import { i as M, S as I } from "./resources4.js";
import { i as D } from "./resources6.js";
import { i as F } from "./resources3.js";
import { u as R } from "./useFocusable.js";
import { I as p, C as m, S as B, a as _ } from "./resources5.js";
const L = T`:host([scale=s]){--calcite-internal-action-menu-gap: var( --calcite-action-menu-items-space, var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs)) );--calcite-internal-action-menu-padding: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=m]){--calcite-internal-action-menu-gap: var( --calcite-action-menu-items-space, var(--calcite-theme-space-sm, var(--calcite-spacing-sm)) );--calcite-internal-action-menu-padding: var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]){--calcite-internal-action-menu-gap: var( --calcite-action-menu-items-space, var(--calcite-theme-space-sm-plus, var(--calcite-spacing-sm-plus)) );--calcite-internal-action-menu-padding: var(--calcite-theme-space-sm-plus, var(--calcite-spacing-sm-plus))}:host{font-size:var(--calcite-font-size-relative-lg);box-sizing:border-box;display:flex;flex-direction:column}::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm);padding-block-end:var(--calcite-internal-action-menu-padding)}.default-trigger{position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}.menu{outline:var(--calcite-border-width-md) solid transparent;outline-offset:var(--calcite-border-width-md);display:flex;flex-direction:column;flex-wrap:nowrap;overflow-y:auto;overflow-x:hidden;max-block-size:45vh;gap:var(--calcite-internal-action-menu-gap);padding:var(--calcite-internal-action-menu-padding)}:host([hidden]){display:none}[hidden]{display:none}`, k = ["ArrowUp", "ArrowDown", "End", "Home"], O = ["ArrowLeft", "ArrowRight"], P = ["ArrowUp", "ArrowDown"], H = [...O, ...P], C = ["left", "right", "leading", "trailing"], S = ["top", "bottom"];
class N extends w {
  constructor() {
    super(), this.guid = $(), this._actions = [], this.navigableActions = [], this.defaultSlotRef = b(), this.triggerSlotRef = b(), this.menuButtonClick = () => {
      this.toggleOpen();
    }, this.menuButtonId = p.button(this.guid), this.handleDocumentMouseDown = (t) => {
      this.open && !t.composedPath().includes(this.el) && (this.focusMenuButtonOnClose = !1);
    }, this.handleDocumentFocusIn = (t) => {
      const e = t.composedPath();
      this.menuHasFocus = this.navigableActions.some((n) => e.includes(n));
    }, this.menuButtonKeyDown = (t) => {
      const { defaultPrevented: e, key: n } = t, { navigableActions: i } = this;
      if (e || !i.length || this.isValidKey(n, H) && t.composedPath().some((l) => l instanceof Element && D(l)))
        return;
      const o = this.placementOrientation, a = o === "horizontal" ? O : o === "vertical" || !o ? P : void 0;
      !a || !this.isValidKey(n, a) || (t.preventDefault(), this.toggleOpen(!0), this.activeMenuItemIndex = n === "ArrowDown" || n === "ArrowRight" ? 0 : i.length - 1, this.updateActions(i), this.setFocus());
    }, this.menuKeyDown = (t) => {
      const { key: e } = t, { navigableActions: n } = this;
      if (n.length) {
        if (e === "Tab") {
          this.focusMenuButtonOnClose = !1, this.restoreMenuButtonTabIndexOnClose = !1, this.open = !1, this.menuButtonTabIndexFrame = requestAnimationFrame(() => {
            this.menuButtonTabIndexFrame = void 0, this.open || this.restoreMenuButtonTabIndex(), this.restoreMenuButtonTabIndexOnClose = !0;
          });
          return;
        }
        if (e === "Escape") {
          this.focusMenuButtonOnClose = !0, this.restoreMenuButtonTabIndexOnClose = !0, this.toggleOpen(!1), t.preventDefault();
          return;
        }
        this.handleActionNavigation(t, e, n);
      }
    }, this.menuId = p.menu(this.guid), this._open = !1, this.updateAction = (t, e) => {
      const { guid: n, activeMenuItemIndex: i, open: o } = this, a = p.action(n, e);
      t.tabIndex = o && e === i ? 0 : -1, t.aria = {
        ...t.aria,
        checked: void 0,
        label: t.label || t.text,
        role: "menuitem"
      }, t.ariaChecked = null, t.id || (t.id = a);
    }, this.focusSetter = R()(this).setFocus, this.focusMenuButtonOnClose = !0, this.menuHasFocus = !1, this.restoreMenuButtonTabIndexOnClose = !0, this.mouseDownHandler = (t) => {
      t.composedPath().some((e) => e instanceof Element && x(e)) && (this.focusMenuButtonOnClose = !1, this.activeMenuItemIndex = this.navigableActions.findIndex((e) => e === t.target));
    }, this.handleActionFocus = (t) => {
      const e = this.navigableActions.findIndex((n) => t.composedPath().includes(n));
      e !== -1 && (this.activeMenuItemIndex = e);
    }, this.activeMenuItemIndex = -1, this.appearance = "solid", this.expanded = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.topLayerDisabled = !1, this.scale = "m", this.calciteActionMenuCollapse = u({ cancelable: !1 }), this.calciteActionMenuExpand = u({ cancelable: !1 }), this.calciteActionMenuOpen = u({ cancelable: !1 }), this.calciteInternalActionMenuActionsChange = u({ cancelable: !1 }), this.listen("calciteInternalActionGroupActionsChange", this.handleActionGroupActionsChange);
  }
  static {
    this.properties = { activeMenuItemIndex: 16, menuButtonEl: 16, appearance: 3, expanded: 7, flipPlacements: 0, label: 1, open: 7, overlayPositioning: 3, placement: 3, topLayerDisabled: 7, scale: 3, actions: 32 };
  }
  static {
    this.styles = L;
  }
  get placementOrientation() {
    const e = (this.flipPlacements?.length ? this.flipPlacements : [this.placement]).find((n) => this.hasPlacementPrefix(n, C.concat(S)));
    if (e) {
      if (this.hasPlacementPrefix(e, C))
        return "horizontal";
      if (this.hasPlacementPrefix(e, S))
        return "vertical";
    }
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
    return this.open ? (await this.updateComplete, this.open ? this.navigableActions[this.activeMenuItemIndex]?.setFocus({
      preventScroll: !0,
      ...t
    }) : void 0) : this.focusSetter(() => this.menuButtonEl || this.el, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectMenuButtonEl(), this.listen("mousedown", this.mouseDownHandler), this.listenOn(document, "focusin", this.handleDocumentFocusIn), this.listenOn(document, "mousedown", this.handleDocumentMouseDown);
  }
  willUpdate(t) {
    t.has("expanded") && (this.hasUpdated || this.expanded !== !1) && this.expandedHandler(), t.has("activeMenuItemIndex") && (this.hasUpdated || this.activeMenuItemIndex !== -1) && this.updateActions(this.navigableActions), t.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteActionMenuExpand.emit() : this.calciteActionMenuCollapse.emit());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.menuButtonTabIndexFrame != null && (cancelAnimationFrame(this.menuButtonTabIndexFrame), this.menuButtonTabIndexFrame = void 0), this.disconnectMenuButtonEl();
  }
  expandedHandler() {
    this.open = !1, this.setTooltipReferenceElement();
  }
  focusMenuButton(t) {
    return this.focusSetter(() => this.menuButtonEl, t);
  }
  openHandler(t) {
    this.menuButtonEl && (this.menuButtonEl.active = t, this.syncMenuButtonAria()), this.popoverEl && (this.popoverEl.open = t), this.activeMenuItemIndex = this.open ? 0 : -1, this.updateActions(this.navigableActions), t ? this.disableMenuButtonTabStop() : this.restoreMenuButtonTabIndexOnClose && this.restoreMenuButtonTabIndex(), this.calciteActionMenuOpen.emit(), this.setTooltipReferenceElement();
  }
  connectMenuButtonEl() {
    const { menuButtonId: t, open: e, label: n } = this, i = this.slottedMenuButtonEl || this.defaultMenuButtonEl;
    this.menuButtonEl !== i && (this.disconnectMenuButtonEl(), this.menuButtonEl = i, this.popoverEl && i && (this.popoverEl.referenceElement = i, this.popoverEl.referenceEl = i, this.open && this.popoverEl.reposition(!0)), this.setTooltipReferenceElement(), i && (i.active = e, this.syncMenuButtonAria(), e && this.disableMenuButtonTabStop(), i.id || (i.id = t), i.label || (i.label = n), i.text || (i.text = n), i.addEventListener("click", this.menuButtonClick), i.addEventListener("keydown", this.menuButtonKeyDown)));
  }
  disconnectMenuButtonEl() {
    const { menuButtonEl: t } = this;
    t && (this.restoreMenuButtonTabIndex(), t.removeEventListener("click", this.menuButtonClick), t.removeEventListener("keydown", this.menuButtonKeyDown), this.menuButtonEl = void 0);
  }
  disableMenuButtonTabStop() {
    const { menuButtonEl: t } = this;
    t && (this.menuButtonTabIndex === void 0 && (this.menuButtonTabIndex = t.getAttribute("tabindex")), t.tabIndex = -1);
  }
  restoreMenuButtonTabIndex() {
    const { menuButtonEl: t, menuButtonTabIndex: e } = this;
    !t || e === void 0 || (e === null ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", e), this.menuButtonTabIndex = void 0);
  }
  syncActions() {
    const t = this.navigableActions[this.activeMenuItemIndex], e = this.activeMenuItemIndex, n = this.menuHasFocus, i = this.triggerSlotRef.value, o = i ? c(i, "calcite-action").filter((s) => !s.classList.contains(m.defaultTrigger)) : [], a = new Set(o), l = this.defaultSlotRef.value ? c(this.defaultSlotRef.value).flatMap((s) => x(s) ? s : s instanceof HTMLSlotElement ? c(s, "calcite-action") : M(s) ? s.actions : []) : [], h = [], f = /* @__PURE__ */ new Set();
    [...o, ...l].forEach((s) => {
      f.has(s) || (f.add(s), h.push(s));
    }), this._actions = h, this.navigableActions = h.filter((s) => !a.has(s) && !s.disabled && !s.hidden);
    const g = this.navigableActions.indexOf(t);
    !this.open || !this.navigableActions.length ? this.activeMenuItemIndex = -1 : g !== -1 ? this.activeMenuItemIndex = g : e < 0 ? this.activeMenuItemIndex = 0 : this.activeMenuItemIndex = Math.min(e, this.navigableActions.length - 1), this.updateActions(this.navigableActions), n && (this.navigableActions.length ? this.setFocus() : (this.open = !1, this.focusMenuButton()));
  }
  setMenuButtonEl() {
    this.slottedMenuButtonEl = this.triggerSlotRef.value ? c(this.triggerSlotRef.value, "calcite-action")[0] : void 0, this.connectMenuButtonEl();
  }
  syncMenuButtonAria() {
    const { menuButtonEl: t, open: e } = this;
    t && (t.aria = {
      ...t.aria,
      expanded: e,
      hasPopup: "menu"
    });
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
    t && (this.popoverEl = t, this.menuButtonEl && (t.referenceElement = this.menuButtonEl, t.referenceEl = this.menuButtonEl), t.open = this.open);
  }
  handleCalciteActionClick(t) {
    const e = this.navigableActions.find((a) => t.composedPath().includes(a));
    if (!e)
      return;
    this.activeMenuItemIndex = this.navigableActions.indexOf(e), this.focusMenuButtonOnClose = !1;
    const n = e.closest("calcite-action-group"), i = e.slot === I.menuActions && n?.selectionMode === "none" && !!n.closest("calcite-action-bar"), o = !!n && n.selectionMode !== "none" && n.actions.includes(e) && e.slot !== I.menuActions;
    !i && !o && (e.active = !e.active), this.open = !1, this.menuHasFocus && this.setFocus();
  }
  updateTooltip(t) {
    const e = t.target.assignedElements({
      flatten: !0
    }).filter(F);
    this.tooltipEl = e[0], this.setTooltipReferenceElement();
  }
  setTooltipReferenceElement() {
    const { tooltipEl: t, expanded: e, menuButtonEl: n, open: i } = this;
    t && (t.referenceElement = !e && !i ? n : void 0);
  }
  updateActions(t) {
    t?.forEach(this.updateAction);
  }
  async handleDefaultSlotChange() {
    await this.componentOnReady(), this.syncActionsAndEmitChange();
  }
  handleActionGroupActionsChange(t) {
    const e = t.target;
    (this.defaultSlotRef.value ? c(this.defaultSlotRef.value).filter((i) => M(i)) : []).includes(e) && this.syncActionsAndEmitChange();
  }
  isValidKey(t, e) {
    return !!e.find((n) => n === t);
  }
  hasPlacementPrefix(t, e) {
    return e.some((n) => t === n || t.startsWith(`${n}-`));
  }
  handleActionNavigation(t, e, n) {
    if (!this.open || !this.isValidKey(e, k))
      return;
    t.preventDefault(), e === "Home" && (this.activeMenuItemIndex = 0), e === "End" && (this.activeMenuItemIndex = n.length - 1);
    const i = this.activeMenuItemIndex;
    e === "ArrowUp" && (this.activeMenuItemIndex = E(Math.max(i - 1, -1), n.length)), e === "ArrowDown" && (this.activeMenuItemIndex = E(i + 1, n.length)), this.updateActions(n), this.setFocus();
  }
  toggleOpen(t = !this.open) {
    this.open = t;
  }
  handlePopoverOpen(t) {
    t.stopPropagation(), this.open = !0, this.setFocus();
  }
  handlePopoverClose(t) {
    const { focusMenuButtonOnClose: e, menuHasFocus: n } = this;
    this.focusMenuButtonOnClose = !0, t.stopPropagation(), this.open = !1, e && n && this.focusMenuButton();
  }
  renderMenuButton() {
    const { appearance: t, label: e, scale: n, expanded: i, open: o } = this;
    return d`<slot name=${B.trigger} @slotchange=${this.handleTriggerSlotChange} ${r(this.triggerSlotRef)}><calcite-action .appearance=${t} .aria=${{ expanded: o, hasPopup: "menu" }} class=${v(m.defaultTrigger)} .icon=${_.menu} .scale=${n} .text=${e} .textEnabled=${i} ${r(this.setDefaultMenuButtonEl)}></calcite-action></slot>`;
  }
  renderMenuItems() {
    const { menuId: t, menuButtonEl: e, label: n, placement: i, overlayPositioning: o, flipPlacements: a } = this;
    return d`<calcite-popover auto-close .flipPlacements=${a} focus-trap-disabled .label=${n} offset-distance=0 @calcitePopoverClose=${this.handlePopoverClose} @calcitePopoverOpen=${this.handlePopoverOpen} .overlayPositioning=${o} .placement=${i} pointer-disabled .referenceElement=${e} .scale=${this.scale} .topLayerDisabled=${this.topLayerDisabled} trigger-disabled ${r(this.setPopoverEl)}><div aria-labelledby=${e?.id ?? A} .ariaOrientation=${this.placementOrientation === "vertical" ? "vertical" : void 0} class=${v(m.menu)} id=${t ?? A} @click=${this.handleCalciteActionClick} @focusin=${this.handleActionFocus} @keydown=${this.menuKeyDown} role=menu tabindex=-1><slot @slotchange=${this.handleDefaultSlotChange} ${r(this.defaultSlotRef)}></slot></div></calcite-popover>`;
  }
  render() {
    return d`${this.renderMenuButton()}${this.renderMenuItems()}<slot name=${B.tooltip} @slotchange=${this.updateTooltip}></slot>`;
  }
}
y("calcite-action-menu", N);
export {
  N as ActionMenu
};
