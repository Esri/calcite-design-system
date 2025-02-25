import { h as z, L as M, k as r, s as i, x as o, E as D, j as T } from "./iframe.js";
import { i as d } from "./keyed.js";
import { e as b, n as v } from "./ref.js";
import { s as C, r as P, g as U } from "./dom.js";
import { u as F, I as G } from "./interactive.js";
import { c as R, g as $ } from "./component.js";
import { u as j } from "./useT9n.js";
import { l as K, g as N, a as W } from "./utils3.js";
import { a as w, I as u, C as a, S } from "./resources12.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const q = z`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}:host([filter-hidden]),:host([closed]){display:none}.wrapper--bordered{border-block-end:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{box-sizing:border-box;display:flex;flex:1 1 0%;overflow:hidden;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.container *{box-sizing:border-box}.container--hover:hover{cursor:pointer;background-color:var(--calcite-list-background-color-hover, var(--calcite-color-foreground-2))}.container:active{background-color:var(--calcite-list-background-color-press, var(--calcite-color-foreground-1))}.container--border{position:relative}.container--border:before{position:absolute;inline-size:var(--calcite-border-width-lg);inset-block:0;inset-inline-start:0;background-color:transparent;content:""}.container--border-selected:before{background-color:var(--calcite-list-selection-border-color, var(--calcite-color-brand))}.container:hover.container--border-unselected:before{background-color:var(--calcite-list-selection-border-color, var(--calcite-color-border-1))}.nested-container{display:none;flex-direction:column;border-width:0px;border-style:solid;border-color:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3));margin-inline-start:var(--calcite-list-spacing-indent, 1.5rem)}.nested-container--open{display:flex}.selection-container{display:flex;padding-block:0px;color:var(--calcite-list-icon-color, var(--calcite-color-border-input))}:host(:not([disabled]):not([selected])) .container:hover .selection-container--single{color:var(--calcite-list-icon-color, var(--calcite-color-border-input))}:host([selected]:hover) .selection-container,:host([selected]:hover) .selection-container--single,:host([selected]) .selection-container{color:var(--calcite-list-icon-color, var(--calcite-color-brand))}.content-container-wrapper{display:flex;flex:1 1 auto}.content-container-wrapper--bordered{border-block-end:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3))}.content-container{display:flex;flex:1 1 auto;-webkit-user-select:none;user-select:none;align-items:stretch;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-list-content-text-color, var(--calcite-color-text-2))}.content-container--unavailable{opacity:var(--calcite-opacity-disabled)}.row,.grid-cell{outline-color:transparent}.row{position:relative}.row:focus,.grid-cell:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.content,.custom-content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;line-height:var(--calcite-font-line-height-relative-snug)}.label{color:var(--calcite-list-label-text-color, var(--calcite-color-text-1))}.description{color:var(--calcite-list-description-text-color, var(--calcite-color-text-3))}.icon{align-self:center;color:var(--calcite-list-icon-color, var(--calcite-color-text-3))}:host([display-mode=flat][drag-handle]:is([selection-mode=none],[selection-appearance=border])) .drag-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s]) .actions-start{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .content-container{gap:var(--calcite-spacing-sm);min-block-size:32px;padding-block:var(--calcite-spacing-xxs);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .content,:host([scale=s]) .custom-content,:host([scale=s]) .label{font-size:var(--calcite-font-size--2)}:host([scale=s]) .description{font-size:var(--calcite-font-size--3)}:host([scale=s][display-mode=flat]:not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=s][display-mode=flat]:not([drag-handle])) .selection-container{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s][display-mode=flat][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=s][display-mode=nested]) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=s][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s][display-mode=nested][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs)}:host([scale=m]) .actions-start{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .content-container{gap:var(--calcite-spacing-sm);min-block-size:40px;padding-block:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .content,:host([scale=m]) .custom-content{font-size:var(--calcite-font-size--2)}:host([scale=m]) .label{font-size:var(--calcite-font-size--1)}:host([scale=m]) .description{font-size:var(--calcite-font-size--2)}:host([scale=m][display-mode=flat]) .container{padding-inline-start:var(--calcite-spacing-md)}:host([scale=m][display-mode=flat]) .selection-container{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m][display-mode=flat][drag-handle]) .container{padding-inline-start:0}:host([scale=m][display-mode=flat][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=m][display-mode=nested]) .container{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=m][display-mode=nested]) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=m][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-md)}:host([scale=m][display-mode=nested][drag-handle]) .container{padding-inline-start:0}:host([scale=m][display-mode=nested][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs)}:host([scale=l]) .actions-start{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .content-container{gap:var(--calcite-spacing-md);min-block-size:56px;padding-block:.625rem;padding-inline-end:var(--calcite-spacing-lg)}:host([scale=l]) .content,:host([scale=l]) .custom-content,:host([scale=l]) .label{font-size:var(--calcite-font-size-0)}:host([scale=l]) .description{font-size:var(--calcite-font-size--1)}:host([scale=l]) .nested-container{margin-inline-start:1.75rem}:host([scale=l][display-mode=flat]) .container{padding-inline-start:var(--calcite-spacing-lg)}:host([scale=l][display-mode=flat]) .selection-container{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l][display-mode=flat][drag-handle]) .container{padding-inline-start:0}:host([scale=l][display-mode=flat][drag-handle]) .selection-container{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l][display-mode=nested]) .container{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=l][display-mode=nested][drag-handle]) .container{padding-inline-start:0}:host([scale=l][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-lg)}.label,.description,.content-bottom{font-family:var(--calcite-font-family);font-weight:var(--calcite-font-weight-normal);word-wrap:break-word;word-break:break-word}:host([selected]) .label{font-weight:var(--calcite-font-weight-medium)}:host([selected]) .icon{color:var(--calcite-list-icon-color, var(--calcite-color-text-1))}:host([selected]) .description{color:var(--calcite-list-description-text-color, var(--calcite-color-text-2))}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:1 1 auto}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){align-self:center}.content-bottom{display:flex;flex-direction:column}.content-container--has-center-content .content-start,.content-container--has-center-content .content-end{flex:0 1 auto}.open-container{color:var(--calcite-list-icon-color, var(--calcite-color-text-3));padding-inline:var(--calcite-spacing-xxs)}:host(:not([disabled])) .container:hover .open-container{color:var(--calcite-list-icon-color, var(--calcite-color-text-1))}.actions-start,.actions-end,.content-start,.content-end,.selection-container,.drag-container,.open-container{display:flex;align-items:center}.actions-start calcite-action,.actions-start calcite-sort-handle,.actions-end calcite-action,.actions-end calcite-sort-handle,.content-start calcite-action,.content-start calcite-sort-handle,.content-end calcite-action,.content-end calcite-sort-handle,.selection-container calcite-action,.selection-container calcite-sort-handle,.drag-container calcite-action,.drag-container calcite-sort-handle,.open-container calcite-action,.open-container calcite-sort-handle{align-self:stretch}.open-container,.selection-container{cursor:pointer}.actions-start,.actions-end{position:relative;padding:0}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-sort-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-sort-handle),.actions-end ::slotted(calcite-dropdown){align-self:stretch;color:inherit}.row:focus .actions-start,.row:focus .actions-end{inset-block:.125rem}.row:focus .actions-start .close,.row:focus .actions-start ::slotted(calcite-action),.row:focus .actions-start ::slotted(calcite-action-menu),.row:focus .actions-start ::slotted(calcite-sort-handle),.row:focus .actions-start ::slotted(calcite-dropdown),.row:focus .actions-end .close,.row:focus .actions-end ::slotted(calcite-action),.row:focus .actions-end ::slotted(calcite-action-menu),.row:focus .actions-end ::slotted(calcite-sort-handle),.row:focus .actions-end ::slotted(calcite-dropdown){block-size:calc(100% - .25rem)}.row:focus:after,.row:focus:before{position:absolute;content:"";inline-size:.125rem;z-index:var(--calcite-z-index-header);background-color:var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));inset-block:0}.row:focus:before{inset-inline-start:0}.row:focus:after{inset-inline-end:0}.container--border:focus:before{display:none}::slotted(calcite-list:empty){border-block-start-width:0px}:host([hidden]){display:none}[hidden]{display:none}`, I = /* @__PURE__ */ new Map();
class J extends M {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.actionsEndEl = b(), this.actionsStartEl = b(), this.containerEl = b(), this.contentEl = b(), this.defaultSlotEl = b(), this.handleGridEl = b(), this.hasActionsEnd = !1, this.hasActionsStart = !1, this.hasContentBottom = !1, this.hasContentEnd = !1, this.hasContentStart = !1, this.hasCustomContent = !1, this.level = null, this.openable = !1, this.active = !1, this.bordered = !1, this.closable = !1, this.closed = !1, this.disabled = !1, this.dragDisabled = !1, this.dragHandle = !1, this.filterHidden = !1, this.interactionMode = null, this.messages = j(), this.displayMode = "flat", this.moveToItems = [], this.open = !1, this.scale = "m", this.selected = !1, this.selectionAppearance = null, this.selectionMode = null, this.setPosition = null, this.setSize = null, this.sortHandleOpen = !1, this.unavailable = !1, this.calciteInternalFocusPreviousItem = r({ cancelable: !1 }), this.calciteInternalListItemActive = r({ cancelable: !1 }), this.calciteInternalListItemChange = r({ cancelable: !1 }), this.calciteInternalListItemSelect = r({ cancelable: !1 }), this.calciteInternalListItemSelectMultiple = r({ cancelable: !1 }), this.calciteInternalListItemToggle = r({ cancelable: !1 }), this.calciteListItemClose = r({ cancelable: !1 }), this.calciteListItemSelect = r({ cancelable: !1 }), this.calciteListItemSortHandleBeforeClose = r({ cancelable: !1 }), this.calciteListItemSortHandleBeforeOpen = r({ cancelable: !1 }), this.calciteListItemSortHandleClose = r({ cancelable: !1 }), this.calciteListItemSortHandleOpen = r({ cancelable: !1 }), this.calciteListItemToggle = r({ cancelable: !1 }), this.listen("calciteInternalListItemGroupDefaultSlotChange", this.handleCalciteInternalListDefaultSlotChanges), this.listen("calciteInternalListDefaultSlotChange", this.handleCalciteInternalListDefaultSlotChanges);
  }
  static {
    this.properties = { hasActionsEnd: 16, hasActionsStart: 16, hasContentBottom: 16, hasContentEnd: 16, hasContentStart: 16, hasCustomContent: 16, level: 16, openable: 16, parentListEl: 16, active: 5, bordered: 5, closable: 7, closed: 7, description: 1, disabled: 7, dragDisabled: 7, dragHandle: 7, filterHidden: 7, interactionMode: 1, label: 1, messageOverrides: 0, metadata: 0, displayMode: 3, moveToItems: 0, open: 7, scale: 3, selected: 7, selectionAppearance: 3, selectionMode: 3, setPosition: 9, setSize: 9, sortHandleOpen: 7, unavailable: 7, value: 1, iconStart: 3, iconEnd: 3, iconFlipRtl: 3 };
  }
  static {
    this.styles = q;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await R(this);
    const { containerEl: { value: e }, parentListEl: t } = this, n = I.get(t);
    if (typeof n == "number") {
      const l = this.getGridCells();
      l[n] ? this.focusCell(l[n]) : e?.focus();
      return;
    }
    e?.focus();
  }
  connectedCallback() {
    super.connectedCallback();
    const { el: e } = this;
    this.parentListEl = e.closest(K), this.level = N(e) + 1, this.setSelectionDefaults();
  }
  /**
   * TODO: [MIGRATION] Consider inlining some of the watch functions called inside of this method to reduce boilerplate code
   *
   * @param changes
   */
  willUpdate(e) {
    e.has("active") && (this.hasUpdated || this.active !== !1) && this.activeHandler(this.active), e.has("closed") && (this.hasUpdated || this.closed !== !1) && this.handleClosedChange(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(), e.has("open") && (this.hasUpdated || this.open !== !1) && this.handleOpenChange(), e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.handleSelectedChange(), e.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== !1) && this.sortHandleOpenHandler(), e.has("displayMode") && this.hasUpdated && this.handleOpenableChange(this.defaultSlotEl.value);
  }
  updated() {
    F(this);
  }
  // #endregion
  // #region Private Methods
  activeHandler(e) {
    e || this.focusCell(null, !1);
  }
  handleClosedChange() {
    this.emitCalciteInternalListItemChange();
  }
  handleDisabledChange() {
    this.emitCalciteInternalListItemChange();
  }
  handleOpenChange() {
    this.emitCalciteInternalListItemToggle();
  }
  handleSelectedChange() {
    this.calciteInternalListItemSelect.emit();
  }
  sortHandleOpenHandler() {
    this.sortHandleEl && (this.sortHandleEl.open = this.sortHandleOpen);
  }
  handleCalciteInternalListDefaultSlotChanges(e) {
    e.stopPropagation(), this.handleOpenableChange(this.defaultSlotEl.value);
  }
  setSortHandleEl(e) {
    this.sortHandleEl = e, this.sortHandleOpenHandler();
  }
  handleSortHandleBeforeOpen(e) {
    e.stopPropagation(), this.calciteListItemSortHandleBeforeOpen.emit();
  }
  handleSortHandleBeforeClose(e) {
    e.stopPropagation(), this.calciteListItemSortHandleBeforeClose.emit();
  }
  handleSortHandleClose(e) {
    e.stopPropagation(), this.sortHandleOpen = !1, this.calciteListItemSortHandleClose.emit();
  }
  handleSortHandleOpen(e) {
    e.stopPropagation(), this.sortHandleOpen = !0, this.calciteListItemSortHandleOpen.emit();
  }
  emitInternalListItemActive() {
    this.calciteInternalListItemActive.emit();
  }
  emitCalciteInternalListItemToggle() {
    this.calciteInternalListItemToggle.emit();
  }
  emitCalciteInternalListItemChange() {
    this.calciteInternalListItemChange.emit();
  }
  handleCloseClick() {
    this.closed = !0, this.calciteListItemClose.emit();
  }
  handleContentSlotChange(e) {
    this.hasCustomContent = C(e);
  }
  handleActionsStartSlotChange(e) {
    this.hasActionsStart = C(e);
  }
  handleActionsEndSlotChange(e) {
    this.hasActionsEnd = C(e);
  }
  handleContentStartSlotChange(e) {
    this.hasContentStart = C(e);
  }
  handleContentEndSlotChange(e) {
    this.hasContentEnd = C(e);
  }
  handleContentBottomSlotChange(e) {
    this.hasContentBottom = C(e);
  }
  setSelectionDefaults() {
    const { parentListEl: e, selectionMode: t, selectionAppearance: n } = this;
    e && (t || (this.selectionMode = e.selectionMode), n || (this.selectionAppearance = e.selectionAppearance));
  }
  handleOpenableChange(e) {
    if (!e)
      return;
    const t = W(e);
    t.lists.forEach((n) => {
      n.displayMode = this.displayMode;
    }), this.openable = this.displayMode === "nested" && (t.lists.length > 0 || t.items.length > 0);
  }
  handleDefaultSlotChange(e) {
    this.handleOpenableChange(e.target);
  }
  handleToggleClick() {
    this.toggle();
  }
  toggle(e = !this.open) {
    this.open = e, this.calciteListItemToggle.emit();
  }
  handleItemClick(e) {
    e.defaultPrevented || this.toggleSelected(e.shiftKey);
  }
  async toggleSelected(e) {
    const { selectionMode: t, selected: n } = this;
    this.disabled || (t === "multiple" || t === "single" ? this.selected = !n : t === "single-persist" && (this.selected = !0), this.calciteInternalListItemSelectMultiple.emit({
      selectMultiple: e && t === "multiple"
    }), await this.updateComplete, this.calciteListItemSelect.emit());
  }
  getGridCells() {
    return [
      this.handleGridEl.value,
      this.actionsStartEl.value,
      this.contentEl.value,
      this.actionsEndEl.value
    ].filter((e) => e && !e.hidden);
  }
  handleItemKeyDown(e) {
    if (e.defaultPrevented)
      return;
    const { key: t } = e, n = e.composedPath(), { containerEl: { value: l }, actionsStartEl: { value: h }, actionsEndEl: { value: s }, open: g, openable: m } = this, c = this.getGridCells(), p = c.findIndex((f) => n.includes(f));
    if (t === "Enter" && !n.includes(h) && !n.includes(s))
      e.preventDefault(), this.toggleSelected(e.shiftKey);
    else if (t === "ArrowRight") {
      e.preventDefault();
      const f = p + 1;
      p === -1 ? !g && m ? (this.toggle(!0), this.focusCell(null)) : c[0] && this.focusCell(c[0]) : c[p] && c[f] && this.focusCell(c[f]);
    } else if (t === "ArrowLeft") {
      e.preventDefault();
      const f = p - 1;
      p === -1 ? (this.focusCell(null), g && m ? this.toggle(!1) : this.calciteInternalFocusPreviousItem.emit()) : p === 0 ? (this.focusCell(null), l.focus()) : c[p] && c[f] && this.focusCell(c[f]);
    }
  }
  focusCellNull() {
    this.focusCell(null);
  }
  setFocusCell(e, t, n) {
    const { parentListEl: l } = this;
    n && I.set(l, null);
    const h = this.getGridCells();
    h.forEach((s) => {
      s.removeAttribute("tabindex"), s.removeAttribute(w);
    }), e && (e === t ? e.tabIndex = 0 : e.removeAttribute("tabindex"), e.setAttribute(w, ""), n && I.set(l, h.indexOf(e)));
  }
  focusCell(e, t = !0) {
    const n = P(e);
    this.setFocusCell(e, n, t), n?.focus();
  }
  // #endregion
  // #region Rendering
  renderSelected() {
    const { selected: e, selectionMode: t, selectionAppearance: n } = this;
    return t === "none" || n === "border" ? null : d("selection-container", o`<div class=${i({
      [a.selectionContainer]: !0,
      [a.selectionContainerSingle]: t === "single" || t === "single-persist"
    })} @click=${this.handleItemClick}><calcite-icon .icon=${e ? t === "multiple" ? u.selectedMultiple : u.selectedSingle : t === "multiple" ? u.unselectedMultiple : u.unselectedSingle} .scale=${$(this.scale)}></calcite-icon></div>`);
  }
  renderDragHandle() {
    const { label: e, dragHandle: t, dragDisabled: n, setPosition: l, setSize: h, moveToItems: s } = this;
    return t ? d("drag-handle-container", o`<div .ariaLabel=${e} class=${i({ [a.dragContainer]: !0, [a.gridCell]: !0 })} role=gridcell ${v(this.handleGridEl)}><calcite-sort-handle .disabled=${n} .label=${e} .moveToItems=${s} @calciteSortHandleBeforeClose=${this.handleSortHandleBeforeClose} @calciteSortHandleBeforeOpen=${this.handleSortHandleBeforeOpen} @calciteSortHandleClose=${this.handleSortHandleClose} @calciteSortHandleOpen=${this.handleSortHandleOpen} overlay-positioning=fixed .scale=${this.scale} .setPosition=${l} .setSize=${h} ${v(this.setSortHandleEl)}></calcite-sort-handle></div>`) : null;
  }
  renderOpen() {
    const { el: e, open: t, openable: n, messages: l, displayMode: h, scale: s } = this;
    if (h !== "nested")
      return null;
    const g = U(e), m = n ? t ? u.open : g === "rtl" ? u.closedRTL : u.closedLTR : u.blank, c = $(s), p = n ? t ? l.collapse : l.expand : void 0, f = n ? this.handleToggleClick : void 0;
    return d("open-container", o`<div class=${i(a.openContainer)} @click=${f} title=${p ?? D}>${d(m, o`<calcite-icon .icon=${m} .scale=${c}></calcite-icon>`)}</div>`);
  }
  renderActionsStart() {
    const { label: e, hasActionsStart: t } = this;
    return d("actions-start-container", o`<div .ariaLabel=${e} class=${i({ [a.actionsStart]: !0, [a.gridCell]: !0 })} .hidden=${!t} role=gridcell ${v(this.actionsStartEl)}><slot name=${S.actionsStart} @slotchange=${this.handleActionsStartSlotChange}></slot></div>`);
  }
  renderActionsEnd() {
    const { label: e, hasActionsEnd: t, closable: n, messages: l } = this;
    return d("actions-end-container", o`<div .ariaLabel=${e} class=${i({ [a.actionsEnd]: !0, [a.gridCell]: !0 })} .hidden=${!(t || n)} role=gridcell ${v(this.actionsEndEl)}><slot name=${S.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot>${n ? d("close-action", o`<calcite-action appearance=transparent class=${i(a.close)} .icon=${u.close} .label=${l.close} @click=${this.handleCloseClick} .scale=${this.scale} .text=${l.close}></calcite-action>`) : null}</div>`);
  }
  renderContentStart() {
    const { hasContentStart: e } = this;
    return o`<div class=${i(a.contentStart)} .hidden=${!e}><slot name=${S.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  renderCustomContent() {
    const { hasCustomContent: e } = this;
    return o`<div class=${i(a.customContent)} .hidden=${!e}><slot name=${S.content} @slotchange=${this.handleContentSlotChange}></slot></div>`;
  }
  renderIconStart() {
    const { iconStart: e, iconFlipRtl: t, scale: n } = this;
    return e ? d("icon-start", o`<calcite-icon class=${i(a.icon)} .flipRtl=${t === "both" || t === "start"} .icon=${e} .scale=${$(n)}></calcite-icon>`) : null;
  }
  renderIconEnd() {
    const { iconEnd: e, iconFlipRtl: t, scale: n } = this;
    return e ? d("icon-end", o`<calcite-icon class=${i(a.icon)} .flipRtl=${t === "both" || t === "end"} .icon=${e} .scale=${$(n)}></calcite-icon>`) : null;
  }
  renderContentEnd() {
    const { hasContentEnd: e } = this;
    return o`<div class=${i(a.contentEnd)} .hidden=${!e}><slot name=${S.contentEnd} @slotchange=${this.handleContentEndSlotChange}></slot></div>`;
  }
  renderContentBottom() {
    const { hasContentBottom: e } = this;
    return o`<div class=${i(a.contentBottom)} .hidden=${!e}><slot name=${S.contentBottom} @slotchange=${this.handleContentBottomSlotChange}></slot></div>`;
  }
  renderDefaultContainer() {
    return o`<div class=${i({
      [a.nestedContainer]: !0,
      [a.nestedContainerOpen]: this.openable && this.open
    })}><slot @slotchange=${this.handleDefaultSlotChange} ${v(this.defaultSlotEl)}></slot></div>`;
  }
  renderContentProperties() {
    const { label: e, description: t, hasCustomContent: n } = this;
    return !n && (e || t) ? d("content", o`<div class=${i(a.content)}>${e ? d("label", o`<div class=${i(a.label)}>${e}</div>`) : null}${t ? d("description", o`<div class=${i(a.description)}>${t}</div>`) : null}</div>`) : null;
  }
  renderContentContainer() {
    const { description: e, label: t, selectionMode: n, hasCustomContent: l, unavailable: h } = this, s = l || !!t || !!e, g = [
      this.renderContentStart(),
      this.renderCustomContent(),
      this.renderIconStart(),
      this.renderContentProperties(),
      this.renderIconEnd(),
      this.renderContentEnd()
    ];
    return d("content-container", o`<div .ariaLabel=${t} class=${i({
      [a.gridCell]: !0,
      [a.contentContainer]: !0,
      [a.contentContainerUnavailable]: h,
      [a.contentContainerSelectable]: n !== "none",
      [a.contentContainerHasCenterContent]: s
    })} @click=${this.handleItemClick} role=gridcell ${v(this.contentEl)}>${g}</div>`);
  }
  render() {
    const { openable: e, open: t, level: n, active: l, label: h, selected: s, selectionAppearance: g, selectionMode: m, interactionMode: c, closed: p, filterHidden: f, bordered: y, disabled: L, hasContentBottom: E } = this, H = y && E, k = y && !E, x = m !== "none" && g === "border", A = x && s, O = x && !s, B = c === "interactive" || c === "static" && m !== "none" && g === "border";
    return G({ disabled: L, children: o`<div class=${i({ [a.wrapper]: !0, [a.wrapperBordered]: H })}><div .ariaExpanded=${e ? t : null} .ariaLabel=${h} .ariaLevel=${n} .ariaSelected=${s} class=${i({
      [a.row]: !0,
      [a.container]: !0,
      [a.containerHover]: B,
      [a.containerBorder]: x,
      [a.containerBorderSelected]: A,
      [a.containerBorderUnselected]: O
    })} .hidden=${p || f} @focus=${this.focusCellNull} @focusin=${this.emitInternalListItemActive} @keydown=${this.handleItemKeyDown} role=row .tabIndex=${l ? 0 : -1} ${v(this.containerEl)}>${this.renderDragHandle()}${this.renderSelected()}${this.renderOpen()}<div class=${i({
      [a.contentContainerWrapper]: !0,
      [a.contentContainerWrapperBordered]: k
    })}>${this.renderActionsStart()}${this.renderContentContainer()}${this.renderActionsEnd()}</div></div>${this.renderContentBottom()}</div>${this.renderDefaultContainer()}` });
  }
}
T("calcite-list-item", J);
export {
  J as ListItem
};
