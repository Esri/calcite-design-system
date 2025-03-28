import { d as E, L as g, j as v, s as c, x as a, E as l, h as x } from "./iframe.js";
import { n as r } from "./ref.js";
import { g as u } from "./array.js";
import { a as I, t as b } from "./dom.js";
import { g as M } from "./guid.js";
import { i as B } from "./key.js";
import { c as $ } from "./component.js";
import { a as A, S as d, I as w, C as h } from "./resources2.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const C = E`:host{box-sizing:border-box;display:flex;flex-direction:column;font-size:var(--calcite-font-size-1)}::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}.default-trigger{position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}.menu{display:flex;max-block-size:45vh;flex-direction:column;flex-wrap:nowrap;overflow-y:auto;overflow-x:hidden;outline:2px solid transparent;outline-offset:2px;gap:var(--calcite-action-menu-items-space, 0)}:host([hidden]){display:none}[hidden]{display:none}`, y = ["ArrowUp", "ArrowDown", "End", "Home"];
class P extends g {
  constructor() {
    super(...arguments), this.guid = `calcite-action-menu-${M()}`, this.actionElements = [], this.menuButtonClick = () => {
      this.toggleOpen();
    }, this.menuButtonId = `${this.guid}-menu-button`, this.menuButtonKeyDown = (e) => {
      const { key: t } = e, { actionElements: n, activeMenuItemIndex: o, open: i } = this;
      if (n.length) {
        if (B(t)) {
          if (e.preventDefault(), !i) {
            this.toggleOpen();
            return;
          }
          const s = n[o];
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
    }, this.menuId = `${this.guid}-menu`, this._open = !1, this.updateAction = (e, t) => {
      const { guid: n, activeMenuItemIndex: o } = this, i = `${n}-action-${t}`;
      e.tabIndex = -1, e.setAttribute("role", "menuitem"), e.id || (e.id = i), e.toggleAttribute(A, t === o);
    }, this.activeMenuItemIndex = -1, this.appearance = "solid", this.expanded = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.scale = "m", this.calciteActionMenuOpen = v({ cancelable: !1 });
  }
  static {
    this.properties = { activeMenuItemIndex: 16, menuButtonEl: 16, appearance: 3, expanded: 7, flipPlacements: 0, label: 1, open: 7, overlayPositioning: 3, placement: 3, scale: 3 };
  }
  static {
    this.styles = C;
  }
  /** When `true`, the component is open. */
  get open() {
    return this._open;
  }
  set open(e) {
    const t = this._open;
    e !== t && (this._open = e, this.openHandler(e));
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    return await $(this), I(this.menuButtonEl);
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), this.connectMenuButtonEl();
  }
  willUpdate(e) {
    e.has("expanded") && (this.hasUpdated || this.expanded !== !1) && this.expandedHandler(), e.has("activeMenuItemIndex") && (this.hasUpdated || this.activeMenuItemIndex !== -1) && this.updateActions(this.actionElements);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectMenuButtonEl();
  }
  // #endregion
  // #region Private Methods
  expandedHandler() {
    this.open = !1, this.setTooltipReferenceElement();
  }
  openHandler(e) {
    this.menuButtonEl && (this.menuButtonEl.active = e), this.popoverEl && (this.popoverEl.open = e), this.activeMenuItemIndex = this.open ? 0 : -1, this.calciteActionMenuOpen.emit(), this.setTooltipReferenceElement();
  }
  connectMenuButtonEl() {
    const { menuButtonId: e, menuId: t, open: n, label: o } = this, i = this.slottedMenuButtonEl || this.defaultMenuButtonEl;
    this.menuButtonEl !== i && (this.disconnectMenuButtonEl(), this.menuButtonEl = i, this.setTooltipReferenceElement(), i && (i.active = n, i.setAttribute("aria-controls", t), i.setAttribute("aria-expanded", b(n)), i.setAttribute("aria-haspopup", "true"), i.id || (i.id = e), i.label || (i.label = o), i.text || (i.text = o), i.addEventListener("click", this.menuButtonClick), i.addEventListener("keydown", this.menuButtonKeyDown)));
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
    this.defaultMenuButtonEl = e, e && this.connectMenuButtonEl();
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
    const { tooltipEl: e, expanded: t, menuButtonEl: n, open: o } = this;
    e && (e.referenceElement = !t && !o ? n : null);
  }
  updateActions(e) {
    e?.forEach(this.updateAction);
  }
  handleDefaultSlotChange(e) {
    const t = e.target.assignedElements({
      flatten: !0
    }).reduce((n, o) => o?.matches("calcite-action") ? (n.push(o), n) : o?.matches("calcite-action-group") ? n.concat(Array.from(o.querySelectorAll("calcite-action"))) : n, []);
    this.actionElements = t.filter((n) => !n.disabled && !n.hidden);
  }
  isValidKey(e, t) {
    return !!t.find((n) => n === e);
  }
  handleActionNavigation(e, t, n) {
    if (!this.isValidKey(t, y))
      return;
    if (e.preventDefault(), !this.open) {
      this.toggleOpen(), (t === "Home" || t === "ArrowDown") && (this.activeMenuItemIndex = 0), (t === "End" || t === "ArrowUp") && (this.activeMenuItemIndex = n.length - 1);
      return;
    }
    t === "Home" && (this.activeMenuItemIndex = 0), t === "End" && (this.activeMenuItemIndex = n.length - 1);
    const o = this.activeMenuItemIndex;
    t === "ArrowUp" && (this.activeMenuItemIndex = u(Math.max(o - 1, -1), n.length)), t === "ArrowDown" && (this.activeMenuItemIndex = u(o + 1, n.length));
  }
  toggleOpen(e = !this.open) {
    this.open = e;
  }
  handlePopoverOpen() {
    this.open = !0, this.setFocus();
  }
  handlePopoverClose() {
    this.open = !1;
  }
  // #endregion
  // #region Rendering
  renderMenuButton() {
    const { appearance: e, label: t, scale: n, expanded: o } = this;
    return a`<slot name=${d.trigger} @slotchange=${this.setMenuButtonEl}><calcite-action .appearance=${e} class=${c(h.defaultTrigger)} .icon=${w.menu} .scale=${n} .text=${t} .textEnabled=${o} ${r(this.setDefaultMenuButtonEl)}></calcite-action></slot>`;
  }
  renderMenuItems() {
    const { actionElements: e, activeMenuItemIndex: t, menuId: n, menuButtonEl: o, label: i, placement: s, overlayPositioning: p, flipPlacements: m } = this, f = e[t]?.id || null;
    return a`<calcite-popover auto-close .flipPlacements=${m} focus-trap-disabled .label=${i} offset-distance=0 @calcitePopoverClose=${this.handlePopoverClose} @calcitePopoverOpen=${this.handlePopoverOpen} .overlayPositioning=${p} .placement=${s} pointer-disabled .referenceElement=${o} trigger-disabled ${r(this.setPopoverEl)}><div aria-activedescendant=${f ?? l} aria-labelledby=${o?.id ?? l} class=${c(h.menu)} id=${n ?? l} @click=${this.handleCalciteActionClick} role=menu tabindex=-1><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></calcite-popover>`;
  }
  render() {
    return a`${this.renderMenuButton()}${this.renderMenuItems()}<slot name=${d.tooltip} @slotchange=${this.updateTooltip}></slot>`;
  }
}
x("calcite-action-menu", P);
export {
  P as ActionMenu
};
