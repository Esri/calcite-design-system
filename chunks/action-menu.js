import { b as v, L as x, c as a, s as u, x as l, E as c, q as I } from "./index.js";
import { n as d } from "./ref.js";
import { g as h } from "./array.js";
import { t as M } from "./dom.js";
import { g as b } from "./guid.js";
import { i as B } from "./key.js";
import { u as A } from "./useSetFocus.js";
import { I as r, S as p, a as $, C as m } from "./resources3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const w = v`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;display:flex;flex-direction:column;font-size:var(--calcite-font-size-1)}::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}.default-trigger{position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}.menu{display:flex;max-block-size:45vh;flex-direction:column;flex-wrap:nowrap;overflow-y:auto;overflow-x:hidden;outline:2px solid transparent;outline-offset:2px;gap:var(--calcite-action-menu-items-space, 0)}:host([hidden]){display:none}[hidden]{display:none}`, C = ["ArrowUp", "ArrowDown", "End", "Home"];
class y extends x {
  constructor() {
    super(...arguments), this.guid = b(), this.actionElements = [], this.menuButtonClick = () => {
      this.toggleOpen();
    }, this.menuButtonId = r.button(this.guid), this.menuButtonKeyDown = (e) => {
      const { key: t } = e, { actionElements: n, activeMenuItemIndex: i, open: o } = this;
      if (n.length) {
        if (B(t)) {
          if (e.preventDefault(), !o) {
            this.toggleOpen();
            return;
          }
          const s = n[i];
          s ? s.click() : this.toggleOpen(!1);
        }
        if (t === "Tab") {
          this.open = !1;
          return;
        }
        if (t === "Escape") {
          this.toggleOpen(!1), e.preventDefault();
          return;
        }
        this.handleActionNavigation(e, t, n);
      }
    }, this.menuId = r.menu(this.guid), this._open = !1, this.updateAction = (e, t) => {
      const { guid: n, activeMenuItemIndex: i } = this, o = r.action(n, t);
      e.tabIndex = -1, e.setAttribute("role", "menuitem"), e.id || (e.id = o), e.activeDescendant = t === i;
    }, this.focusSetter = A()(this), this.activeMenuItemIndex = -1, this.appearance = "solid", this.expanded = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.scale = "m", this.calciteActionMenuCollapse = a({ cancelable: !1 }), this.calciteActionMenuExpand = a({ cancelable: !1 }), this.calciteActionMenuOpen = a({ cancelable: !1 });
  }
  static {
    this.properties = { activeMenuItemIndex: 16, menuButtonEl: 16, appearance: 3, expanded: 7, flipPlacements: 0, label: 1, open: 7, overlayPositioning: 3, placement: 3, scale: 3 };
  }
  static {
    this.styles = w;
  }
  get open() {
    return this._open;
  }
  set open(e) {
    const t = this._open;
    e !== t && (this._open = e, this.openHandler(e));
  }
  async setFocus(e) {
    return this.focusSetter(() => this.menuButtonEl, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectMenuButtonEl();
  }
  willUpdate(e) {
    e.has("expanded") && (this.hasUpdated || this.expanded !== !1) && this.expandedHandler(), e.has("activeMenuItemIndex") && (this.hasUpdated || this.activeMenuItemIndex !== -1) && this.updateActions(this.actionElements), e.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteActionMenuExpand.emit() : this.calciteActionMenuCollapse.emit());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectMenuButtonEl();
  }
  expandedHandler() {
    this.open = !1, this.setTooltipReferenceElement();
  }
  openHandler(e) {
    this.menuButtonEl && (this.menuButtonEl.active = e, this.menuButtonEl.aria = {
      expanded: e
    }), this.popoverEl && (this.popoverEl.open = e), this.activeMenuItemIndex = this.open ? 0 : -1, this.calciteActionMenuOpen.emit(), this.setTooltipReferenceElement();
  }
  connectMenuButtonEl() {
    const { menuButtonId: e, menuId: t, open: n, label: i } = this, o = this.slottedMenuButtonEl || this.defaultMenuButtonEl;
    this.menuButtonEl !== o && (this.disconnectMenuButtonEl(), this.menuButtonEl = o, this.setTooltipReferenceElement(), o && (o.active = n, o.setAttribute("aria-controls", t), o.setAttribute("aria-expanded", M(n)), o.setAttribute("aria-haspopup", "true"), o.id || (o.id = e), o.label || (o.label = i), o.text || (o.text = i), o.addEventListener("click", this.menuButtonClick), o.addEventListener("keydown", this.menuButtonKeyDown)));
  }
  disconnectMenuButtonEl() {
    const { menuButtonEl: e } = this;
    e && (e.removeEventListener("click", this.menuButtonClick), e.removeEventListener("keydown", this.menuButtonKeyDown), this.menuButtonEl = null);
  }
  setMenuButtonEl(e) {
    const t = e.target.assignedElements({
      flatten: !0
    }).filter((n) => n?.matches("calcite-action"));
    this.slottedMenuButtonEl = t[0], this.connectMenuButtonEl();
  }
  setDefaultMenuButtonEl(e) {
    this.defaultMenuButtonEl = e, this.connectMenuButtonEl();
  }
  setPopoverEl(e) {
    e && (this.popoverEl = e, e.open = this.open);
  }
  handleCalciteActionClick() {
    this.open = !1, this.setFocus();
  }
  updateTooltip(e) {
    const t = e.target.assignedElements({
      flatten: !0
    }).filter((n) => n?.matches("calcite-tooltip"));
    this.tooltipEl = t[0], this.setTooltipReferenceElement();
  }
  setTooltipReferenceElement() {
    const { tooltipEl: e, expanded: t, menuButtonEl: n, open: i } = this;
    e && (e.referenceElement = !t && !i ? n : null);
  }
  updateActions(e) {
    e?.forEach(this.updateAction);
  }
  async handleDefaultSlotChange(e) {
    const t = e.target.assignedElements({
      flatten: !0
    }).reduce((n, i) => i?.matches("calcite-action") ? (n.push(i), n) : i?.matches("calcite-action-group") ? n.concat(Array.from(i.querySelectorAll("calcite-action"))) : n, []);
    await this.componentOnReady(), this.actionElements = t.filter((n) => !n.disabled && !n.hidden);
  }
  isValidKey(e, t) {
    return !!t.find((n) => n === e);
  }
  handleActionNavigation(e, t, n) {
    if (!this.isValidKey(t, C))
      return;
    if (e.preventDefault(), !this.open) {
      this.toggleOpen(), (t === "Home" || t === "ArrowDown") && (this.activeMenuItemIndex = 0), (t === "End" || t === "ArrowUp") && (this.activeMenuItemIndex = n.length - 1);
      return;
    }
    t === "Home" && (this.activeMenuItemIndex = 0), t === "End" && (this.activeMenuItemIndex = n.length - 1);
    const i = this.activeMenuItemIndex;
    t === "ArrowUp" && (this.activeMenuItemIndex = h(Math.max(i - 1, -1), n.length)), t === "ArrowDown" && (this.activeMenuItemIndex = h(i + 1, n.length));
  }
  toggleOpen(e = !this.open) {
    this.open = e;
  }
  handlePopoverOpen(e) {
    e.stopPropagation(), this.open = !0, this.setFocus();
  }
  handlePopoverClose(e) {
    e.stopPropagation(), this.open = !1;
  }
  renderMenuButton() {
    const { appearance: e, label: t, scale: n, expanded: i } = this;
    return l`<slot name=${p.trigger} @slotchange=${this.setMenuButtonEl}><calcite-action .appearance=${e} .aria=${{ expanded: i }} class=${u(m.defaultTrigger)} .icon=${$.menu} .scale=${n} .text=${t} .textEnabled=${i} ${d(this.setDefaultMenuButtonEl)}></calcite-action></slot>`;
  }
  renderMenuItems() {
    const { actionElements: e, activeMenuItemIndex: t, menuId: n, menuButtonEl: i, label: o, placement: s, overlayPositioning: f, flipPlacements: E } = this, g = e[t]?.id || null;
    return l`<calcite-popover auto-close .flipPlacements=${E} focus-trap-disabled .label=${o} offset-distance=0 @calcitePopoverClose=${this.handlePopoverClose} @calcitePopoverOpen=${this.handlePopoverOpen} .overlayPositioning=${f} .placement=${s} pointer-disabled .referenceElement=${i} trigger-disabled ${d(this.setPopoverEl)}><div aria-activedescendant=${g ?? c} aria-labelledby=${i?.id ?? c} class=${u(m.menu)} id=${n ?? c} @click=${this.handleCalciteActionClick} role=menu tabindex=-1><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></calcite-popover>`;
  }
  render() {
    return l`${this.renderMenuButton()}${this.renderMenuItems()}<slot name=${p.tooltip} @slotchange=${this.updateTooltip}></slot>`;
  }
}
I("calcite-action-menu", y);
export {
  y as ActionMenu
};
