import { b as D, L as z, c, s as i, x as s, E as M, q as O } from "./index.js";
import { i as h } from "./keyed.js";
import { e as b, n as v } from "./ref.js";
import { s as C, l as T, a as P } from "./dom.js";
import { u as U, I as F } from "./interactive.js";
import { u as G } from "./useT9n.js";
import { g as S } from "./component.js";
import { l as K } from "./logger.js";
import { s as j } from "./sortable.js";
import { u as N } from "./useSetFocus.js";
import { l as W, g as q, a as V } from "./utils3.js";
import { a as L, I as m, C as a, S as x } from "./resources13.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const J = D`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}:host([filter-hidden]),:host([closed]){display:none}.wrapper--bordered{border-block-end:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{box-sizing:border-box;display:flex;flex:1 1 0%;overflow:hidden;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.container *{box-sizing:border-box}.container--hover:hover{cursor:pointer;background-color:var(--calcite-list-background-color-hover, var(--calcite-color-foreground-2))}.container:active{background-color:var(--calcite-list-background-color-press, var(--calcite-color-foreground-3))}.container--border{position:relative}.container--border:before{position:absolute;inline-size:var(--calcite-border-width-lg);inset-block:0;inset-inline-start:0;background-color:transparent;content:""}.container--border-selected:before{background-color:var(--calcite-list-selection-border-color, var(--calcite-color-brand))}.container--border-selected:focus{box-shadow:inset var(--calcite-border-width-lg) 0 0 0 var(--calcite-list-selection-border-color, var(--calcite-color-brand))}.nested-container{display:none;flex-direction:column;border-width:0px;border-style:solid;border-color:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3));margin-inline-start:var(--calcite-list-spacing-indent, 1.5rem)}.nested-container--expanded{display:flex}.selection-container{display:flex;padding-block:0px;color:var(--calcite-list-icon-color, var(--calcite-color-border-input))}:host(:not([disabled]):not([selected])) .container:hover .selection-container--single{color:var(--calcite-list-icon-color, var(--calcite-color-border-input))}:host([selected]:hover) .selection-container,:host([selected]:hover) .selection-container--single,:host([selected]) .selection-container{color:var(--calcite-list-icon-color, var(--calcite-color-brand))}.content-container-wrapper{display:flex;flex:1 1 auto}.content-container-wrapper--bordered{border-block-end:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3))}.content-container{display:flex;flex:1 1 auto;-webkit-user-select:none;user-select:none;align-items:stretch;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-list-content-text-color, var(--calcite-color-text-2))}.content-container--unavailable{opacity:var(--calcite-opacity-disabled)}.row,.grid-cell{outline-color:transparent}.row{position:relative}.row:focus,.grid-cell:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.content,.custom-content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;line-height:var(--calcite-font-line-height-relative-snug)}.label{color:var(--calcite-list-label-text-color, var(--calcite-color-text-1))}.description{color:var(--calcite-list-description-text-color, var(--calcite-color-text-3))}.icon{align-self:center;color:var(--calcite-list-icon-color, var(--calcite-color-text-3))}.icon:hover,.icon:active{color:var(--calcite-color-text-1)}:host([display-mode=flat][drag-handle]:is([selection-mode=none],[selection-appearance=border])) .drag-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s]) .actions-start{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .content-container{gap:var(--calcite-spacing-sm);min-block-size:32px;padding-block:var(--calcite-spacing-xxs);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .content,:host([scale=s]) .custom-content,:host([scale=s]) .label{font-size:var(--calcite-font-size--2)}:host([scale=s]) .description{font-size:var(--calcite-font-size--3)}:host([scale=s][display-mode=flat]:not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=s][display-mode=flat]:not([drag-handle])) .selection-container{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s][display-mode=flat][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=s][display-mode=nested]) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=s][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s][display-mode=nested][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs)}:host([scale=m]) .actions-start{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .content-container{gap:var(--calcite-spacing-sm);min-block-size:40px;padding-block:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .content,:host([scale=m]) .custom-content{font-size:var(--calcite-font-size--2)}:host([scale=m]) .label{font-size:var(--calcite-font-size--1)}:host([scale=m]) .description{font-size:var(--calcite-font-size--2)}:host([scale=m][display-mode=flat]) .container{padding-inline-start:var(--calcite-spacing-md)}:host([scale=m][display-mode=flat]) .selection-container{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m][display-mode=flat][drag-handle]) .container{padding-inline-start:0}:host([scale=m][display-mode=flat][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=m][display-mode=nested]) .container{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=m][display-mode=nested]) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=m][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-md)}:host([scale=m][display-mode=nested][drag-handle]) .container{padding-inline-start:0}:host([scale=m][display-mode=nested][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs)}:host([scale=l]) .actions-start{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .content-container{gap:var(--calcite-spacing-md);min-block-size:56px;padding-block:.625rem;padding-inline-end:var(--calcite-spacing-lg)}:host([scale=l]) .content,:host([scale=l]) .custom-content,:host([scale=l]) .label{font-size:var(--calcite-font-size-0)}:host([scale=l]) .description{font-size:var(--calcite-font-size--1)}:host([scale=l]) .nested-container{margin-inline-start:1.75rem}:host([scale=l][display-mode=flat]) .container{padding-inline-start:var(--calcite-spacing-lg)}:host([scale=l][display-mode=flat]) .selection-container{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l][display-mode=flat][drag-handle]) .container{padding-inline-start:0}:host([scale=l][display-mode=flat][drag-handle]) .selection-container{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l][display-mode=nested]) .container{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=l][display-mode=nested][drag-handle]) .container{padding-inline-start:0}:host([scale=l][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-lg)}.label,.description,.content-bottom{font-family:var(--calcite-font-family);font-weight:var(--calcite-font-weight-normal);word-wrap:break-word;word-break:break-word}:host([selected]) .label{font-weight:var(--calcite-font-weight-medium)}:host([selected]) .icon{color:var(--calcite-list-icon-color, var(--calcite-color-text-1))}:host([selected]) .description{color:var(--calcite-list-description-text-color, var(--calcite-color-text-2))}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:1 1 auto}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){align-self:center}.content-bottom{display:flex;flex-direction:column}.content-container--has-center-content .content-start,.content-container--has-center-content .content-end{flex:0 1 auto}.expanded-container{color:var(--calcite-list-icon-color, var(--calcite-color-text-3));padding-inline:var(--calcite-spacing-xxs)}:host(:not([disabled])) .expanded-container:hover{color:var(--calcite-list-icon-color, var(--calcite-color-text-1))}.actions-start,.actions-end,.content-start,.content-end,.selection-container,.drag-container,.expanded-container{display:flex;align-items:center}.actions-start calcite-action,.actions-start calcite-sort-handle,.actions-end calcite-action,.actions-end calcite-sort-handle,.content-start calcite-action,.content-start calcite-sort-handle,.content-end calcite-action,.content-end calcite-sort-handle,.selection-container calcite-action,.selection-container calcite-sort-handle,.drag-container calcite-action,.drag-container calcite-sort-handle,.expanded-container calcite-action,.expanded-container calcite-sort-handle{align-self:stretch}.drag-container,.selection-container,.expanded-container{padding-block-end:var(--calcite-spacing-px)}.expanded-container,.selection-container{cursor:pointer}.actions-start,.actions-end{position:relative;padding:0}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-sort-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-sort-handle),.actions-end ::slotted(calcite-dropdown){align-self:stretch;color:inherit}.row:focus .actions-start,.row:focus .actions-end{inset-block:.125rem}.row:focus .actions-start .close,.row:focus .actions-start ::slotted(calcite-action),.row:focus .actions-start ::slotted(calcite-action-menu),.row:focus .actions-start ::slotted(calcite-sort-handle),.row:focus .actions-start ::slotted(calcite-dropdown),.row:focus .actions-end .close,.row:focus .actions-end ::slotted(calcite-action),.row:focus .actions-end ::slotted(calcite-action-menu),.row:focus .actions-end ::slotted(calcite-sort-handle),.row:focus .actions-end ::slotted(calcite-dropdown){block-size:calc(100% - .25rem)}.row:focus:after,.row:focus:before{position:absolute;content:"";inline-size:.125rem;z-index:var(--calcite-z-index-header);background-color:var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));inset-block:0}.row:focus:before{inset-inline-start:0}.row:focus:after{inset-inline-end:0}.container--border:focus:before{display:none}::slotted(calcite-list:empty){border-block-start-width:0px}:host([hidden]){display:none}[hidden]{display:none}`, $ = /* @__PURE__ */ new Map();
class Q extends z {
  constructor() {
    super(), this.actionsEndRef = b(), this.actionsStartRef = b(), this.containerRef = b(), this.contentRef = b(), this.defaultSlotRef = b(), this.handleGridRef = b(), this.messages = G(), this.focusSetter = N()(this), this.hasActionsEnd = !1, this.hasActionsStart = !1, this.hasContentBottom = !1, this.hasContentEnd = !1, this.hasContentStart = !1, this.hasCustomContent = !1, this.level = null, this.expandable = !1, this.active = !1, this.bordered = !1, this.sortDisabled = !1, this.closable = !1, this.closed = !1, this.disabled = !1, this.dragDisabled = !1, this.dragHandle = !1, this.expanded = !1, this.filterHidden = !1, this.interactionMode = null, this.displayMode = "flat", this.addToItems = [], this.moveToItems = [], this.scale = "m", this.selected = !1, this.selectionAppearance = null, this.selectionMode = null, this.sortHandleOpen = !1, this.unavailable = !1, this.calciteInternalFocusPreviousItem = c({ cancelable: !1 }), this.calciteInternalListItemActive = c({ cancelable: !1 }), this.calciteInternalListItemChange = c({ cancelable: !1 }), this.calciteInternalListItemSelect = c({ cancelable: !1 }), this.calciteInternalListItemSelectMultiple = c({ cancelable: !1 }), this.calciteInternalListItemToggle = c({ cancelable: !1 }), this.calciteListItemClose = c({ cancelable: !1 }), this.calciteListItemCollapse = c({ cancelable: !1 }), this.calciteListItemExpand = c({ cancelable: !1 }), this.calciteListItemSelect = c({ cancelable: !1 }), this.calciteListItemSortHandleBeforeClose = c({ cancelable: !1 }), this.calciteListItemSortHandleBeforeOpen = c({ cancelable: !1 }), this.calciteListItemSortHandleClose = c({ cancelable: !1 }), this.calciteListItemSortHandleOpen = c({ cancelable: !1 }), this.calciteListItemToggle = c({ cancelable: !1 }), this.listen("calciteInternalListItemGroupDefaultSlotChange", this.handleCalciteInternalListDefaultSlotChanges), this.listen("calciteInternalListDefaultSlotChange", this.handleCalciteInternalListDefaultSlotChanges);
  }
  static {
    this.properties = { hasActionsEnd: 16, hasActionsStart: 16, hasContentBottom: 16, hasContentEnd: 16, hasContentStart: 16, hasCustomContent: 16, level: 16, expandable: 16, parentListEl: 16, active: 5, bordered: 5, sortDisabled: 5, closable: 7, closed: 7, description: 1, disabled: 7, dragDisabled: 7, dragHandle: 7, expanded: 7, filterHidden: 7, interactionMode: 1, label: 1, messageOverrides: 0, metadata: 0, displayMode: 3, addToItems: 0, moveToItems: 0, open: 7, scale: 3, selected: 7, selectionAppearance: 3, selectionMode: 3, setPosition: 9, setSize: 9, sortHandleOpen: 7, unavailable: 7, value: 1, iconStart: [3, { type: String }], iconEnd: [3, { type: String }], iconFlipRtl: 3 };
  }
  static {
    this.styles = [J, j];
  }
  get open() {
    return this.expanded;
  }
  set open(e) {
    K.deprecated("property", {
      name: "open",
      removalVersion: 4,
      suggested: "expanded"
    }), this.expanded = e;
  }
  async setFocus(e) {
    return this.focusSetter(() => {
      const { containerRef: t, parentListEl: n } = this, l = $.get(n);
      if (typeof l == "number") {
        const o = this.getGridCells()[l];
        if (o) {
          this.focusCell(o);
          return;
        }
      }
      return { target: t.value, includeContainer: !0, strategy: "focusable" };
    }, e);
  }
  connectedCallback() {
    super.connectedCallback();
    const { el: e } = this;
    this.parentListEl = e.closest(W), this.level = q(e) + 1, this.setSelectionDefaults();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), $.clear();
  }
  willUpdate(e) {
    e.has("active") && (this.hasUpdated || this.active !== !1) && this.activeHandler(this.active), e.has("closed") && (this.hasUpdated || this.closed !== !1) && this.handleClosedChange(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(), e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.handleSelectedChange(), e.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== !1) && this.sortHandleOpenHandler(), e.has("displayMode") && this.hasUpdated && this.handleExpandableChange(this.defaultSlotRef.value), e.has("expanded") && this.hasUpdated && (this.expanded ? (this.handleExpandedChange(), this.calciteListItemExpand.emit()) : this.calciteListItemCollapse.emit());
  }
  updated() {
    U(this);
  }
  activeHandler(e) {
    e || this.focusCell(null, !1);
  }
  handleClosedChange() {
    this.emitCalciteInternalListItemChange();
  }
  handleDisabledChange() {
    this.emitCalciteInternalListItemChange();
  }
  handleExpandedChange() {
    this.emitCalciteInternalListItemToggle();
  }
  handleSelectedChange() {
    this.calciteInternalListItemSelect.emit();
  }
  sortHandleOpenHandler() {
    this.sortHandleEl && (this.sortHandleEl.open = this.sortHandleOpen);
  }
  handleCalciteInternalListDefaultSlotChanges(e) {
    e.stopPropagation(), this.handleExpandableChange(this.defaultSlotRef.value);
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
  handleExpandableChange(e) {
    if (!e)
      return;
    const t = V(e);
    t.lists.forEach((n) => {
      n.displayMode = this.displayMode;
    }), this.expandable = this.displayMode === "nested" && (t.lists.length > 0 || t.items.length > 0);
  }
  handleDefaultSlotChange(e) {
    this.handleExpandableChange(e.target);
  }
  handleToggleClick() {
    this.toggle();
  }
  toggle(e = !this.expanded) {
    this.expanded = e, this.calciteListItemToggle.emit();
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
      this.handleGridRef.value,
      this.actionsStartRef.value,
      this.contentRef.value,
      this.actionsEndRef.value
    ].filter((e) => e && !e.hidden);
  }
  handleItemKeyDown(e) {
    if (e.defaultPrevented)
      return;
    const { key: t } = e, n = e.composedPath(), { containerRef: l, actionsStartRef: { value: o }, actionsEndRef: { value: r }, expanded: p, expandable: u } = this, d = this.getGridCells(), f = d.findIndex((g) => n.includes(g));
    if (t === "Enter" && !n.includes(o) && !n.includes(r))
      e.preventDefault(), this.toggleSelected(e.shiftKey);
    else if (t === "ArrowRight") {
      e.preventDefault();
      const g = f + 1;
      f === -1 ? !p && u ? (this.toggle(!0), this.focusCell(null)) : d[0] && this.focusCell(d[0]) : d[f] && d[g] && this.focusCell(d[g]);
    } else if (t === "ArrowLeft") {
      e.preventDefault();
      const g = f - 1;
      f === -1 ? (this.focusCell(null), p && u ? this.toggle(!1) : this.calciteInternalFocusPreviousItem.emit()) : f === 0 ? (this.focusCell(null), l.value.focus()) : d[f] && d[g] && this.focusCell(d[g]);
    }
  }
  focusCellNull() {
    this.focusCell(null);
  }
  setFocusCell(e, t, n) {
    const { parentListEl: l } = this;
    n && $.set(l, null);
    const o = this.getGridCells();
    o.forEach((r) => {
      r.removeAttribute("tabindex"), r.removeAttribute(L);
    }), e && (e === t ? e.tabIndex = 0 : e.removeAttribute("tabindex"), e.setAttribute(L, ""), n && $.set(l, o.indexOf(e)));
  }
  focusCell(e, t = !0) {
    const n = T(e);
    this.setFocusCell(e, n, t), n?.focus();
  }
  renderSelected() {
    const { selected: e, selectionMode: t, selectionAppearance: n } = this;
    return t === "none" || n === "border" ? null : h("selection-container", s`<div class=${i({
      [a.selectionContainer]: !0,
      [a.selectionContainerSingle]: t === "single" || t === "single-persist"
    })} @click=${this.handleItemClick}><calcite-icon .icon=${e ? t === "multiple" ? m.selectedMultiple : m.selectedSingle : t === "multiple" ? m.unselectedMultiple : m.unselectedSingle} .scale=${S(this.scale)}></calcite-icon></div>`);
  }
  renderDragHandle() {
    const { label: e, dragHandle: t, dragDisabled: n, setPosition: l, setSize: o, moveToItems: r, sortDisabled: p, addToItems: u } = this;
    return t ? h("drag-handle-container", s`<div .ariaLabel=${e} class=${i({ [a.dragContainer]: !0, [a.gridCell]: !0 })} role=gridcell ${v(this.handleGridRef)}><calcite-sort-handle .addToItems=${u} .disabled=${n} .label=${e} .moveToItems=${r} @calciteSortHandleBeforeClose=${this.handleSortHandleBeforeClose} @calciteSortHandleBeforeOpen=${this.handleSortHandleBeforeOpen} @calciteSortHandleClose=${this.handleSortHandleClose} @calciteSortHandleOpen=${this.handleSortHandleOpen} overlay-positioning=fixed .scale=${this.scale} .setPosition=${l} .setSize=${o} .sortDisabled=${p} ${v(this.setSortHandleEl)}></calcite-sort-handle></div>`) : null;
  }
  renderExpanded() {
    const { el: e, expanded: t, expandable: n, messages: l, displayMode: o, scale: r } = this;
    if (o !== "nested")
      return null;
    const p = P(e), u = n ? t ? m.open : p === "rtl" ? m.collapsedRTL : m.collapsedLTR : m.blank, d = S(r), f = n ? t ? l.collapse : l.expand : void 0, g = n ? this.handleToggleClick : void 0;
    return h("expanded-container", s`<div class=${i(a.expandedContainer)} @click=${g} title=${f ?? M}>${h(u, s`<calcite-icon .icon=${u} .scale=${d}></calcite-icon>`)}</div>`);
  }
  renderActionsStart() {
    const { label: e, hasActionsStart: t } = this;
    return h("actions-start-container", s`<div .ariaLabel=${e} class=${i({ [a.actionsStart]: !0, [a.gridCell]: !0 })} .hidden=${!t} role=gridcell ${v(this.actionsStartRef)}><slot name=${x.actionsStart} @slotchange=${this.handleActionsStartSlotChange}></slot></div>`);
  }
  renderActionsEnd() {
    const { label: e, hasActionsEnd: t, closable: n, messages: l } = this;
    return h("actions-end-container", s`<div .ariaLabel=${e} class=${i({ [a.actionsEnd]: !0, [a.gridCell]: !0 })} .hidden=${!(t || n)} role=gridcell ${v(this.actionsEndRef)}><slot name=${x.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot>${n ? h("close-action", s`<calcite-action appearance=transparent class=${i(a.close)} .icon=${m.close} .label=${l.close} @click=${this.handleCloseClick} .scale=${this.scale} .text=${l.close}></calcite-action>`) : null}</div>`);
  }
  renderContentStart() {
    const { hasContentStart: e } = this;
    return s`<div class=${i(a.contentStart)} .hidden=${!e}><slot name=${x.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  renderCustomContent() {
    const { hasCustomContent: e } = this;
    return s`<div class=${i(a.customContent)} .hidden=${!e}><slot name=${x.content} @slotchange=${this.handleContentSlotChange}></slot></div>`;
  }
  renderIconStart() {
    const { iconStart: e, iconFlipRtl: t, scale: n } = this;
    return e ? h("icon-start", s`<calcite-icon class=${i(a.icon)} .flipRtl=${t === "both" || t === "start"} .icon=${e} .scale=${S(n)}></calcite-icon>`) : null;
  }
  renderIconEnd() {
    const { iconEnd: e, iconFlipRtl: t, scale: n } = this;
    return e ? h("icon-end", s`<calcite-icon class=${i(a.icon)} .flipRtl=${t === "both" || t === "end"} .icon=${e} .scale=${S(n)}></calcite-icon>`) : null;
  }
  renderContentEnd() {
    const { hasContentEnd: e } = this;
    return s`<div class=${i(a.contentEnd)} .hidden=${!e}><slot name=${x.contentEnd} @slotchange=${this.handleContentEndSlotChange}></slot></div>`;
  }
  renderContentBottom() {
    const { hasContentBottom: e } = this;
    return s`<div class=${i(a.contentBottom)} .hidden=${!e}><slot name=${x.contentBottom} @slotchange=${this.handleContentBottomSlotChange}></slot></div>`;
  }
  renderDefaultContainer() {
    return s`<div class=${i({
      [a.nestedContainer]: !0,
      [a.nestedContainerExpanded]: this.expandable && this.expanded
    })}><slot @slotchange=${this.handleDefaultSlotChange} ${v(this.defaultSlotRef)}></slot></div>`;
  }
  renderContentProperties() {
    const { label: e, description: t, hasCustomContent: n } = this;
    return !n && (e || t) ? h("content", s`<div class=${i(a.content)}>${e ? h("label", s`<div class=${i(a.label)}>${e}</div>`) : null}${t ? h("description", s`<div class=${i(a.description)}>${t}</div>`) : null}</div>`) : null;
  }
  renderContentContainer() {
    const { description: e, label: t, selectionMode: n, hasCustomContent: l, unavailable: o } = this, r = l || !!t || !!e, p = [
      this.renderContentStart(),
      this.renderCustomContent(),
      this.renderIconStart(),
      this.renderContentProperties(),
      this.renderIconEnd(),
      this.renderContentEnd()
    ];
    return h("content-container", s`<div .ariaLabel=${t} class=${i({
      [a.gridCell]: !0,
      [a.contentContainer]: !0,
      [a.contentContainerUnavailable]: o,
      [a.contentContainerSelectable]: n !== "none",
      [a.contentContainerHasCenterContent]: r
    })} @click=${this.handleItemClick} role=gridcell ${v(this.contentRef)}>${p}</div>`);
  }
  render() {
    const { expandable: e, expanded: t, level: n, active: l, label: o, selected: r, selectionAppearance: p, selectionMode: u, interactionMode: d, closed: f, filterHidden: g, bordered: y, disabled: E, hasContentBottom: w } = this, H = y && w, k = y && !w, I = u !== "none" && p === "border", A = I && r, B = I && !r, R = d === "interactive" || d === "static" && u !== "none" && p === "border";
    return F({ disabled: E, children: s`<div class=${i({ [a.wrapper]: !0, [a.wrapperBordered]: H })}><div .ariaExpanded=${e ? t : null} .ariaLabel=${o} .ariaLevel=${n} .ariaSelected=${r} class=${i({
      [a.row]: !0,
      [a.container]: !0,
      [a.containerHover]: R,
      [a.containerBorder]: I,
      [a.containerBorderSelected]: A,
      [a.containerBorderUnselected]: B
    })} .hidden=${f || g} @focus=${this.focusCellNull} @focusin=${this.emitInternalListItemActive} @keydown=${this.handleItemKeyDown} role=row .tabIndex=${l ? 0 : -1} ${v(this.containerRef)}>${this.renderDragHandle()}${this.renderSelected()}${this.renderExpanded()}<div class=${i({
      [a.contentContainerWrapper]: !0,
      [a.contentContainerWrapperBordered]: k
    })}>${this.renderActionsStart()}${this.renderContentContainer()}${this.renderActionsEnd()}</div></div>${this.renderContentBottom()}</div>${this.renderDefaultContainer()}` });
  }
}
O("calcite-list-item", Q);
export {
  Q as ListItem
};
