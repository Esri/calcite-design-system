/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as R, L as B, c as r, l as M, s, b as l, A as z, d as O } from "./index.js";
import { i as h } from "./keyed.js";
import { i as T } from "./isEqual.js";
import { e as b, n as v } from "./ref.js";
import { u as P } from "./index2.js";
import { s as C, v as F } from "./dom.js";
import { u as U } from "./useT9n.js";
import { g as S } from "./component.js";
import { s as G } from "./sortable.js";
import { u as K } from "./useSetFocus.js";
import { u as j } from "./useInteractive.js";
import { a as W, g as q, c as N } from "./utils5.js";
import { b as E, I as u, C as a, S as x } from "./resources35.js";
const V = R`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}:host([scale=s]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xxs)}:host([scale=l]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xs)}:host([filter-hidden]),:host([closed]){display:none}.wrapper--bordered{border-block-end:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{box-sizing:border-box;display:flex;flex:1 1 0%;overflow:hidden;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.container *{box-sizing:border-box}.container--border{position:relative}.container--border:before{position:absolute;inline-size:var(--calcite-border-width-lg);inset-block:0;inset-inline-start:0;background-color:transparent;content:""}.container--border-selected:before{background-color:var(--calcite-list-selection-border-color, var(--calcite-color-brand))}.container--border-selected:focus{box-shadow:inset var(--calcite-border-width-lg) 0 0 0 var(--calcite-list-selection-border-color, var(--calcite-color-brand))}.container--highlight-selected{background-color:var(--calcite-color-surface-highlight)}.nested-container{display:none;flex-direction:column;border-width:0px;border-style:solid;border-color:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3));margin-inline-start:var(--calcite-list-spacing-indent, 1.5rem)}.nested-container--expanded{display:flex}.selection-container{display:flex;padding-block:0px;color:var(--calcite-list-icon-color, var(--calcite-color-border-input))}:host([selected]) .selection-container{color:var(--calcite-list-icon-color, var(--calcite-color-brand))}.content-container-wrapper{display:flex;flex:1 1 auto}.content-container-wrapper--bordered{border-block-end:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3))}.content-container{display:flex;flex:1 1 auto;align-items:stretch;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-list-content-text-color, var(--calcite-color-text-2))}.content-container--unavailable{opacity:var(--calcite-opacity-disabled)}:host(:not([interaction-mode=static])):not([disabled]):not([selected]) .container:hover .selection-container--single{color:var(--calcite-list-icon-color, var(--calcite-color-border-input))}:host(:not([interaction-mode=static])):not([disabled]) .expanded-container:hover{color:var(--calcite-list-icon-color, var(--calcite-color-text-1))}:host(:not([interaction-mode=static]))[selected]:hover .selection-container,:host(:not([interaction-mode=static]))[selected]:hover .selection-container--single{color:var(--calcite-list-icon-color, var(--calcite-color-brand))}:host(:not([interaction-mode=static])) .content-container{-webkit-user-select:none;user-select:none}:host(:not([interaction-mode=static])) .container--hover:hover{cursor:pointer;background-color:var(--calcite-list-background-color-hover, var(--calcite-color-foreground-2))}:host(:not([interaction-mode=static])) .container:active{background-color:var(--calcite-list-background-color-press, var(--calcite-color-foreground-3))}:host(:not([interaction-mode=static])) .icon:hover,:host(:not([interaction-mode=static])) .icon:active{color:var(--calcite-color-text-1)}.row,.grid-cell{outline-color:transparent}.row{position:relative}.row:focus,.grid-cell:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.content,.custom-content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;line-height:var(--calcite-font-line-height-relative-snug)}.label{color:var(--calcite-list-label-text-color, var(--calcite-color-text-1))}.description{color:var(--calcite-list-description-text-color, var(--calcite-color-text-3))}.icon{align-self:center;color:var(--calcite-list-icon-color, var(--calcite-color-text-3))}.actions-start,.actions-end{margin-inline-end:var(--calcite-internal-list-action-spacing);gap:var(--calcite-internal-list-action-spacing)}:host([scale=s]) .content-container{gap:var(--calcite-spacing-sm);min-block-size:32px;padding-block:var(--calcite-spacing-xxs);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .content,:host([scale=s]) .custom-content,:host([scale=s]) .label{font-size:var(--calcite-font-size--2)}:host([scale=s]) .description{font-size:var(--calcite-font-size--3)}:host([scale=s][display-mode=flat]:not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=s][display-mode=flat]:not([drag-handle])) .selection-container{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s][display-mode=flat][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=s][display-mode=nested]) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=s][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s][display-mode=nested][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs)}:host([scale=m]) .content-container{gap:var(--calcite-spacing-sm);min-block-size:40px;padding-block:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .content,:host([scale=m]) .custom-content{font-size:var(--calcite-font-size--2)}:host([scale=m]) .label{font-size:var(--calcite-font-size--1)}:host([scale=m]) .description{font-size:var(--calcite-font-size--2)}:host([scale=m][display-mode=flat]) .container{padding-inline-start:var(--calcite-spacing-md)}:host([scale=m][display-mode=flat]) .selection-container{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m][display-mode=flat][drag-handle]) .container{padding-inline-start:0}:host([scale=m][display-mode=flat][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=m][display-mode=nested]) .container{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=m][display-mode=nested]) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=m][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-md)}:host([scale=m][display-mode=nested][drag-handle]) .container{padding-inline-start:0}:host([scale=m][display-mode=nested][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs)}:host([scale=l]) .content-container{gap:var(--calcite-spacing-md);min-block-size:56px;padding-block:var(--calcite-space-sm-plus);padding-inline-end:var(--calcite-spacing-lg)}:host([scale=l]) .content,:host([scale=l]) .custom-content,:host([scale=l]) .label{font-size:var(--calcite-font-size-0)}:host([scale=l]) .description{font-size:var(--calcite-font-size--1)}:host([scale=l]) .nested-container{margin-inline-start:1.75rem}:host([scale=l][display-mode=flat]) .container{padding-inline-start:var(--calcite-spacing-lg)}:host([scale=l][display-mode=flat]) .selection-container{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l][display-mode=flat][drag-handle]) .container{padding-inline-start:0}:host([scale=l][display-mode=flat][drag-handle]) .selection-container{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l][display-mode=nested]) .container{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=l][display-mode=nested][drag-handle]) .container{padding-inline-start:0}:host([scale=l][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-lg)}.label,.description,.content-bottom{font-weight:var(--calcite-font-weight-normal);word-wrap:break-word;word-break:break-word}:host([selected]) .label{font-weight:var(--calcite-font-weight-medium)}:host([selected]) .icon{color:var(--calcite-list-icon-color, var(--calcite-color-text-1))}:host([selected]) .description{color:var(--calcite-list-description-text-color, var(--calcite-color-text-2))}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:1 1 auto}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){align-self:center}.content-bottom{display:flex;flex-direction:column}.content-container--has-center-content .content-start,.content-container--has-center-content .content-end{flex:0 1 auto}.expanded-container{color:var(--calcite-list-icon-color, var(--calcite-color-text-3));padding-inline:var(--calcite-spacing-xxs)}.actions-start,.actions-end,.content-start,.content-end,.selection-container,.drag-container,.expanded-container,.close{display:flex;align-items:center}.drag-container,.selection-container,.expanded-container{padding-block-end:var(--calcite-spacing-px)}.expanded-container,.selection-container{cursor:pointer}.actions-start,.actions-end{position:relative;padding:0}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-sort-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-sort-handle),.actions-end ::slotted(calcite-dropdown){color:inherit}.row:focus:after,.row:focus:before{position:absolute;content:"";inline-size:.125rem;z-index:var(--calcite-z-index-header);background-color:var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));inset-block:0}.row:focus:before{inset-inline-start:0}.row:focus:after{inset-inline-end:0}.container--border:focus:before{display:none}::slotted(calcite-list:empty){border-block-start-width:0px}.drag-container calcite-action,.drag-container ::slotted(calcite-action),.actions-start calcite-action,.actions-start ::slotted(calcite-action),.actions-end calcite-action,.actions-end ::slotted(calcite-action),.close calcite-action,.close ::slotted(calcite-action){align-items:center}.drag-container{margin-inline:var(--calcite-spacing-xxs)}:host([display-mode=nested]) .drag-container,:host([selection-appearance=icon]:not([selection-mode=none])) .drag-container{margin-inline:var(--calcite-spacing-xxs) 0}:host([hidden]){display:none}[hidden]{display:none}`, $ = /* @__PURE__ */ new Map();
class J extends B {
  constructor() {
    super(), this.actionsEndRef = b(), this.actionsStartRef = b(), this.containerRef = b(), this.contentRef = b(), this.defaultSlotRef = b(), this.direction = P(), this.handleGridRef = b(), this.messages = U(), this.focusSetter = K()(this), this.interactiveContainer = j(this), this.hasActionsEnd = !1, this.hasActionsStart = !1, this.hasContentBottom = !1, this.hasContentEnd = !1, this.hasContentStart = !1, this.hasCustomContent = !1, this.expandable = !1, this.active = !1, this.bordered = !1, this.sortDisabled = !1, this.closable = !1, this.closed = !1, this.disabled = !1, this.dragDisabled = !1, this.dragHandle = !1, this.expanded = !1, this.filterHidden = !1, this.displayMode = "flat", this.addToItems = [], this.moveToItems = [], this.scale = "m", this.selected = !1, this.sortHandleOpen = !1, this.unavailable = !1, this.topLayerDisabled = !1, this.calciteInternalFocusPreviousItem = r({ cancelable: !1 }), this.calciteInternalListItemActive = r({ cancelable: !1 }), this.calciteInternalListItemChange = r({ cancelable: !1 }), this.calciteInternalListItemSelect = r({ cancelable: !1 }), this.calciteInternalListItemSelectMultiple = r({ cancelable: !1 }), this.calciteInternalListItemToggle = r({ cancelable: !1 }), this.calciteListItemClose = r({ cancelable: !1 }), this.calciteListItemCollapse = r({ cancelable: !1 }), this.calciteListItemExpand = r({ cancelable: !1 }), this.calciteListItemSelect = r({ cancelable: !1 }), this.calciteListItemSortHandleBeforeClose = r({ cancelable: !1 }), this.calciteListItemSortHandleBeforeOpen = r({ cancelable: !1 }), this.calciteListItemSortHandleClose = r({ cancelable: !1 }), this.calciteListItemSortHandleOpen = r({ cancelable: !1 }), this.calciteListItemToggle = r({ cancelable: !1 }), this.listen("calciteInternalListItemGroupDefaultSlotChange", this.handleCalciteInternalListDefaultSlotChanges), this.listen("calciteInternalListDefaultSlotChange", this.handleCalciteInternalListDefaultSlotChanges);
  }
  static {
    this.properties = { hasActionsEnd: 16, hasActionsStart: 16, hasContentBottom: 16, hasContentEnd: 16, hasContentStart: 16, hasCustomContent: 16, level: 16, expandable: 16, parentListEl: 16, active: 5, bordered: 5, sortDisabled: 5, closable: 7, closed: 7, description: 1, disabled: 7, dragDisabled: 7, dragHandle: 7, expanded: 7, filterHidden: 7, interactionMode: 3, label: 1, messageOverrides: 0, metadata: 0, displayMode: 3, addToItems: 0, moveToItems: 0, open: 7, scale: 3, selected: 7, selectionAppearance: 3, selectionMode: 3, setPosition: 9, setSize: 9, sortHandleOpen: 7, unavailable: 7, value: 1, iconStart: 3, iconEnd: 3, iconFlipRtl: 3, topLayerDisabled: 7 };
  }
  static {
    this.styles = [V, G];
  }
  get open() {
    return this.expanded;
  }
  set open(e) {
    M.deprecated("property", {
      component: this,
      name: "open",
      removalVersion: 5,
      suggested: "expanded"
    }), this.expanded = e;
  }
  async setFocus(e) {
    return this.focusSetter(() => {
      const { containerRef: t, parentListEl: n } = this, i = $.get(n);
      if (typeof i == "number") {
        const o = this.getGridCells()[i];
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
    this.parentListEl = e.closest(W) || void 0, this.level = q(e) + 1, this.setSelectionDefaults();
  }
  willUpdate(e) {
    e.has("active") && (this.hasUpdated || this.active !== !1) && this.activeHandler(this.active), e.has("closed") && (this.hasUpdated || this.closed !== !1) && this.handleClosedChange(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(), e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.handleSelectedChange(), e.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== !1) && this.sortHandleOpenHandler(), e.has("displayMode") && this.hasUpdated && this.handleExpandableChange(this.defaultSlotRef.value);
    const t = e.has("metadata"), n = e.get("metadata"), i = t && !T(this.metadata, n);
    (e.has("label") || e.has("description") || i) && this.hasUpdated && this.emitCalciteInternalListItemChange(), e.has("expanded") && this.hasUpdated && (this.expanded ? (this.handleExpandedChange(), this.calciteListItemExpand.emit()) : this.calciteListItemCollapse.emit());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), $.clear();
  }
  activeHandler(e) {
    e || this.focusCell(void 0, !1);
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
    const t = N(e);
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
    ].filter((e) => !!(e && !e.hidden));
  }
  handleItemKeyDown(e) {
    if (e.defaultPrevented)
      return;
    const { key: t } = e, n = e.composedPath(), { containerRef: i, actionsStartRef: { value: o }, actionsEndRef: { value: c }, expanded: p, expandable: f } = this, d = this.getGridCells(), g = d.findIndex((m) => n.includes(m));
    if (t === "Enter" && o && !n.includes(o) && c && !n.includes(c))
      e.preventDefault(), this.toggleSelected(e.shiftKey);
    else if (t === "ArrowRight") {
      e.preventDefault();
      const m = g + 1;
      g === -1 ? !p && f ? (this.toggle(!0), this.focusCell()) : d[0] && this.focusCell(d[0]) : d[g] && d[m] && this.focusCell(d[m]);
    } else if (t === "ArrowLeft") {
      e.preventDefault();
      const m = g - 1;
      g === -1 ? (this.focusCell(), p && f ? this.toggle(!1) : this.calciteInternalFocusPreviousItem.emit()) : g === 0 ? (this.focusCell(), i.value.focus()) : d[g] && d[m] && this.focusCell(d[m]);
    }
  }
  clearCellFocus() {
    this.focusCell();
  }
  setFocusCell(e, t, n) {
    const { parentListEl: i } = this;
    n && $.set(i, void 0);
    const o = this.getGridCells();
    o.forEach((c) => {
      c.removeAttribute("tabindex"), c.removeAttribute(E);
    }), e && (e === t ? e.tabIndex = 0 : e.removeAttribute("tabindex"), e.setAttribute(E, ""), n && $.set(i, o.indexOf(e)));
  }
  focusCell(e, t = !0) {
    const n = F(e);
    this.setFocusCell(e, n, t), n?.focus();
  }
  renderSelected() {
    const { selected: e, selectionMode: t, selectionAppearance: n } = this;
    return t === "none" || n !== "icon" ? null : h("selection-container", l`<div class=${s({
      [a.selectionContainer]: !0,
      [a.selectionContainerSingle]: t === "single" || t === "single-persist"
    })} @click=${this.handleItemClick}><calcite-icon .icon=${e ? t === "multiple" ? u.selectedMultiple : u.selectedSingle : t === "multiple" ? u.unselectedMultiple : u.unselectedSingle} .scale=${S(this.scale)}></calcite-icon></div>`);
  }
  renderDragHandle() {
    const { label: e, dragHandle: t, dragDisabled: n, setPosition: i, setSize: o, moveToItems: c, sortDisabled: p, addToItems: f } = this;
    return t ? h("drag-handle-container", l`<div .ariaLabel=${e} class=${s({ [a.dragContainer]: !0, [a.gridCell]: !0 })} role=gridcell ${v(this.handleGridRef)}><calcite-sort-handle .addToItems=${f} .disabled=${n} .label=${e} .moveToItems=${c} @calciteSortHandleBeforeClose=${this.handleSortHandleBeforeClose} @calciteSortHandleBeforeOpen=${this.handleSortHandleBeforeOpen} @calciteSortHandleClose=${this.handleSortHandleClose} @calciteSortHandleOpen=${this.handleSortHandleOpen} overlay-positioning=fixed .scale=${this.scale} .setPosition=${i} .setSize=${o} .sortDisabled=${p} .topLayerDisabled=${this.topLayerDisabled} ${v(this.setSortHandleEl)}></calcite-sort-handle></div>`) : null;
  }
  renderExpanded() {
    const { expanded: e, expandable: t, messages: n, displayMode: i, scale: o } = this;
    if (i !== "nested")
      return null;
    const c = this.direction, p = t ? e ? u.open : c === "rtl" ? u.collapsedRTL : u.collapsedLTR : u.blank, f = S(o), d = t ? e ? n.collapse : n.expand : void 0, g = t ? this.handleToggleClick : void 0;
    return h("expanded-container", l`<div class=${s(a.expandedContainer)} @click=${g} title=${d ?? z}>${h(p, l`<calcite-icon .icon=${p} .scale=${f}></calcite-icon>`)}</div>`);
  }
  renderActionsStart() {
    const { label: e, hasActionsStart: t } = this;
    return h("actions-start-container", l`<div .ariaLabel=${e} class=${s({ [a.actionsStart]: !0, [a.gridCell]: !0 })} .hidden=${!t} role=gridcell ${v(this.actionsStartRef)}><slot name=${x.actionsStart} @slotchange=${this.handleActionsStartSlotChange}></slot></div>`);
  }
  renderActionsEnd() {
    const { label: e, hasActionsEnd: t, closable: n, messages: i } = this;
    return h("actions-end-container", l`<div .ariaLabel=${e} class=${s({ [a.actionsEnd]: !0, [a.gridCell]: !0 })} .hidden=${!(t || n)} role=gridcell ${v(this.actionsEndRef)}><slot name=${x.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot>${n ? h("close-action", l`<calcite-action class=${s(a.close)} .icon=${u.close} .label=${i.close} @click=${this.handleCloseClick} .scale=${this.scale} .text=${i.close}></calcite-action>`) : null}</div>`);
  }
  renderContentStart() {
    const { hasContentStart: e } = this;
    return l`<div class=${s(a.contentStart)} .hidden=${!e}><slot name=${x.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  renderCustomContent() {
    const { hasCustomContent: e } = this;
    return l`<div class=${s(a.customContent)} .hidden=${!e}><slot name=${x.content} @slotchange=${this.handleContentSlotChange}></slot></div>`;
  }
  renderIconStart() {
    const { iconStart: e, iconFlipRtl: t, scale: n } = this;
    return e ? h("icon-start", l`<calcite-icon class=${s(a.icon)} .flipRtl=${t === "both" || t === "start"} .icon=${e} .scale=${S(n)}></calcite-icon>`) : null;
  }
  renderIconEnd() {
    const { iconEnd: e, iconFlipRtl: t, scale: n } = this;
    return e ? h("icon-end", l`<calcite-icon class=${s(a.icon)} .flipRtl=${t === "both" || t === "end"} .icon=${e} .scale=${S(n)}></calcite-icon>`) : null;
  }
  renderContentEnd() {
    const { hasContentEnd: e } = this;
    return l`<div class=${s(a.contentEnd)} .hidden=${!e}><slot name=${x.contentEnd} @slotchange=${this.handleContentEndSlotChange}></slot></div>`;
  }
  renderContentBottom() {
    const { hasContentBottom: e } = this;
    return l`<div class=${s(a.contentBottom)} .hidden=${!e}><slot name=${x.contentBottom} @slotchange=${this.handleContentBottomSlotChange}></slot></div>`;
  }
  renderDefaultContainer() {
    return l`<div class=${s({
      [a.nestedContainer]: !0,
      [a.nestedContainerExpanded]: this.expandable && this.expanded
    })}><slot @slotchange=${this.handleDefaultSlotChange} ${v(this.defaultSlotRef)}></slot></div>`;
  }
  renderContentProperties() {
    const { label: e, description: t, hasCustomContent: n } = this;
    return !n && (e || t) ? h("content", l`<div class=${s(a.content)}>${e ? h("label", l`<div class=${s(a.label)}>${e}</div>`) : null}${t ? h("description", l`<div class=${s(a.description)}>${t}</div>`) : null}</div>`) : null;
  }
  renderContentContainer() {
    const { description: e, label: t, selectionMode: n, hasCustomContent: i, unavailable: o } = this, c = i || !!t || !!e, p = [
      this.renderContentStart(),
      this.renderIconStart(),
      this.renderCustomContent(),
      this.renderContentProperties(),
      this.renderIconEnd(),
      this.renderContentEnd()
    ];
    return h("content-container", l`<div .ariaLabel=${t} class=${s({
      [a.gridCell]: !0,
      [a.contentContainer]: !0,
      [a.contentContainerUnavailable]: o,
      [a.contentContainerSelectable]: n !== "none",
      [a.contentContainerHasCenterContent]: c
    })} @click=${this.handleItemClick} role=gridcell ${v(this.contentRef)}>${p}</div>`);
  }
  render() {
    const { expandable: e, expanded: t, level: n, active: i, label: o, selected: c, selectionAppearance: p, selectionMode: f, interactionMode: d, closed: g, filterHidden: m, bordered: I, disabled: H, hasContentBottom: y } = this, k = I && y, w = I && !y, L = f !== "none" && p === "border", A = f !== "none" && p === "highlight", D = d === "interactive";
    return this.interactiveContainer({ disabled: H, children: l`<div class=${s({ [a.wrapper]: !0, [a.wrapperBordered]: k })}><div .ariaExpanded=${e ? t : void 0} .ariaLabel=${o} .ariaLevel=${n} .ariaSelected=${c} class=${s({
      [a.row]: !0,
      [a.container]: !0,
      [a.containerHover]: D,
      [a.containerBorder]: L,
      [a.containerBorderSelected]: L && c,
      [a.containerHighlightSelected]: A && c
    })} .hidden=${g || m} @focus=${this.clearCellFocus} @focusin=${this.emitInternalListItemActive} @keydown=${this.handleItemKeyDown} role=row .tabIndex=${i ? 0 : -1} ${v(this.containerRef)}>${this.renderDragHandle()}${this.renderSelected()}${this.renderExpanded()}<div class=${s({
      [a.contentContainerWrapper]: !0,
      [a.contentContainerWrapperBordered]: w
    })}>${this.renderActionsStart()}${this.renderContentContainer()}${this.renderActionsEnd()}</div></div>${this.renderContentBottom()}</div>${this.renderDefaultContainer()}` });
  }
}
O("calcite-list-item", J);
export {
  J as ListItem
};
