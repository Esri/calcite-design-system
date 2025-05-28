import { a as g, L as E, d as v, s as c, x as a, E as l, c as x } from "./iframe.js";
import { n as r } from "./ref.js";
import { g as u } from "./array.js";
import { a as I, t as b } from "./dom.js";
import { g as M } from "./guid.js";
import { i as B } from "./key.js";
import { c as $ } from "./component.js";
import { a as A, S as d, I as w, C as h } from "./resources2.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const C = g`:host{box-sizing:border-box;display:flex;flex-direction:column;font-size:var(--calcite-font-size-1)}::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}.default-trigger{position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}.menu{display:flex;max-block-size:45vh;flex-direction:column;flex-wrap:nowrap;overflow-y:auto;overflow-x:hidden;outline:2px solid transparent;outline-offset:2px;gap:var(--calcite-action-menu-items-space, 0)}:host([hidden]){display:none}[hidden]{display:none}`, P = ["ArrowUp", "ArrowDown", "End", "Home"];
class y extends E {
  constructor() {
    super(...arguments), this.guid = `calcite-action-menu-${M()}`, this.actionElements = [], this.menuButtonClick = () => {
      this.toggleOpen();
    }, this.menuButtonId = `${this.guid}-menu-button`, this.menuButtonKeyDown = (t) => {
      const { key: e } = t, { actionElements: n, activeMenuItemIndex: o, open: i } = this;
      if (n.length) {
        if (B(e)) {
          if (t.preventDefault(), !i) {
            this.toggleOpen();
            return;
          }
          const s = n[o];
          s ? s.click() : this.toggleOpen(!1);
        }
        if (e === "Tab") {
          this.open = !1;
          return;
        }
        if (e === "Escape") {
          this.toggleOpen(!1), t.preventDefault();
          return;
        }
        this.handleActionNavigation(t, e, n);
      }
    }, this.menuId = `${this.guid}-menu`, this._open = !1, this.updateAction = (t, e) => {
      const { guid: n, activeMenuItemIndex: o } = this, i = `${n}-action-${e}`;
      t.tabIndex = -1, t.setAttribute("role", "menuitem"), t.id || (t.id = i), t.toggleAttribute(A, e === o);
    }, this.activeMenuItemIndex = -1, this.appearance = "solid", this.expanded = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.scale = "m", this.calciteActionMenuOpen = v({ cancelable: !1 });
  }
  static {
    this.properties = { activeMenuItemIndex: 16, menuButtonEl: 16, appearance: 3, expanded: 7, flipPlacements: 0, label: 1, open: 7, overlayPositioning: 3, placement: 3, scale: 3 };
  }
  static {
    this.styles = C;
  }
  get open() {
    return this._open;
  }
  set open(t) {
    const e = this._open;
    t !== e && (this._open = t, this.openHandler(t));
  }
  async setFocus() {
    return await $(this), I(this.menuButtonEl);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectMenuButtonEl();
  }
  willUpdate(t) {
    t.has("expanded") && (this.hasUpdated || this.expanded !== !1) && this.expandedHandler(), t.has("activeMenuItemIndex") && (this.hasUpdated || this.activeMenuItemIndex !== -1) && this.updateActions(this.actionElements);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectMenuButtonEl();
  }
  expandedHandler() {
    this.open = !1, this.setTooltipReferenceElement();
  }
  openHandler(t) {
    this.menuButtonEl && (this.menuButtonEl.active = t), this.popoverEl && (this.popoverEl.open = t), this.activeMenuItemIndex = this.open ? 0 : -1, this.calciteActionMenuOpen.emit(), this.setTooltipReferenceElement();
  }
  connectMenuButtonEl() {
    const { menuButtonId: t, menuId: e, open: n, label: o } = this, i = this.slottedMenuButtonEl || this.defaultMenuButtonEl;
    this.menuButtonEl !== i && (this.disconnectMenuButtonEl(), this.menuButtonEl = i, this.setTooltipReferenceElement(), i && (i.active = n, i.setAttribute("aria-controls", e), i.setAttribute("aria-expanded", b(n)), i.setAttribute("aria-haspopup", "true"), i.id || (i.id = t), i.label || (i.label = o), i.text || (i.text = o), i.addEventListener("click", this.menuButtonClick), i.addEventListener("keydown", this.menuButtonKeyDown)));
  }
  disconnectMenuButtonEl() {
    const { menuButtonEl: t } = this;
    t && (t.removeEventListener("click", this.menuButtonClick), t.removeEventListener("keydown", this.menuButtonKeyDown), this.menuButtonEl = null);
  }
  setMenuButtonEl(t) {
    const e = t.target.assignedElements({
      flatten: !0
    }).filter((n) => n?.matches("calcite-action"));
    this.slottedMenuButtonEl = e[0], this.connectMenuButtonEl();
  }
  setDefaultMenuButtonEl(t) {
    this.defaultMenuButtonEl = t, t && this.connectMenuButtonEl();
  }
  setPopoverEl(t) {
    t && (this.popoverEl = t, t.open = this.open);
  }
  handleCalciteActionClick() {
    this.open = !1, this.setFocus();
  }
  updateTooltip(t) {
    const e = t.target.assignedElements({
      flatten: !0
    }).filter((n) => n?.matches("calcite-tooltip"));
    this.tooltipEl = e[0], this.setTooltipReferenceElement();
  }
  setTooltipReferenceElement() {
    const { tooltipEl: t, expanded: e, menuButtonEl: n, open: o } = this;
    t && (t.referenceElement = !e && !o ? n : null);
  }
  updateActions(t) {
    t?.forEach(this.updateAction);
  }
  handleDefaultSlotChange(t) {
    const e = t.target.assignedElements({
      flatten: !0
    }).reduce((n, o) => o?.matches("calcite-action") ? (n.push(o), n) : o?.matches("calcite-action-group") ? n.concat(Array.from(o.querySelectorAll("calcite-action"))) : n, []);
    this.actionElements = e.filter((n) => !n.disabled && !n.hidden);
  }
  isValidKey(t, e) {
    return !!e.find((n) => n === t);
  }
  handleActionNavigation(t, e, n) {
    if (!this.isValidKey(e, P))
      return;
    if (t.preventDefault(), !this.open) {
      this.toggleOpen(), (e === "Home" || e === "ArrowDown") && (this.activeMenuItemIndex = 0), (e === "End" || e === "ArrowUp") && (this.activeMenuItemIndex = n.length - 1);
      return;
    }
    e === "Home" && (this.activeMenuItemIndex = 0), e === "End" && (this.activeMenuItemIndex = n.length - 1);
    const o = this.activeMenuItemIndex;
    e === "ArrowUp" && (this.activeMenuItemIndex = u(Math.max(o - 1, -1), n.length)), e === "ArrowDown" && (this.activeMenuItemIndex = u(o + 1, n.length));
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
    const { appearance: t, label: e, scale: n, expanded: o } = this;
    return a`<slot name=${d.trigger} @slotchange=${this.setMenuButtonEl}><calcite-action .appearance=${t} class=${c(h.defaultTrigger)} .icon=${w.menu} .scale=${n} .text=${e} .textEnabled=${o} ${r(this.setDefaultMenuButtonEl)}></calcite-action></slot>`;
  }
  renderMenuItems() {
    const { actionElements: t, activeMenuItemIndex: e, menuId: n, menuButtonEl: o, label: i, placement: s, overlayPositioning: p, flipPlacements: m } = this, f = t[e]?.id || null;
    return a`<calcite-popover auto-close .flipPlacements=${m} focus-trap-disabled .label=${i} offset-distance=0 @calcitePopoverClose=${this.handlePopoverClose} @calcitePopoverOpen=${this.handlePopoverOpen} .overlayPositioning=${p} .placement=${s} pointer-disabled .referenceElement=${o} trigger-disabled ${r(this.setPopoverEl)}><div aria-activedescendant=${f ?? l} aria-labelledby=${o?.id ?? l} class=${c(h.menu)} id=${n ?? l} @click=${this.handleCalciteActionClick} role=menu tabindex=-1><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></calcite-popover>`;
  }
  render() {
    return a`${this.renderMenuButton()}${this.renderMenuItems()}<slot name=${d.tooltip} @slotchange=${this.updateTooltip}></slot>`;
  }
}
x("calcite-action-menu", y);
export {
  y as ActionMenu
};
