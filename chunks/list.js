import { b as $, L as w, c as m, s as u, x as d, D as M, q as O } from "./index.js";
import { n as D } from "./ref.js";
import { i as E } from "./keyed.js";
import { s as L, g as k } from "./dom.js";
import { u as T, I as H } from "./interactive.js";
import { c as R } from "./observers.js";
import { b as I, i as b, l as S, u as U, c as C, e as A } from "./utils3.js";
import { d as N, c as G } from "./sortableComponent.js";
import { S as P } from "./resources12.js";
import { n as y } from "./locale.js";
import { g as z } from "./guid.js";
import { u as q } from "./useT9n.js";
import { u as B } from "./useCancelable.js";
import { u as W } from "./useSetFocus.js";
import { d as K } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const h = {
  container: "container",
  table: "table",
  scrim: "scrim",
  stack: "stack",
  tableContainer: "table-container",
  sticky: "sticky-pos",
  assistiveText: "assistive-text",
  containerHeight: "container-height"
}, x = {
  filterNoResults: "filter-no-results",
  filterActionsStart: "filter-actions-start",
  filterActionsEnd: "filter-actions-end"
}, _ = $`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{position:relative;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.container-height{block-size:100%}.table-container{box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%}.stack{--calcite-stack-padding-inline: 0;--calcite-stack-padding-block: 0}.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index-sticky);background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}`, j = `${C}, ${I}`;
class J extends w {
  constructor() {
    super(), this.dragSelector = I, this.focusableItems = [], this.handleSelector = "calcite-sort-handle", this.listItems = [], this.listItemGroups = [], this.mutationObserver = R("mutation", () => {
      this.willPerformFilter = !0, this.updateListItemsDebounced();
    }), this.cancelable = B()(this), this.updateListItemsDebounced = K(this.updateListItems, M.nextTick), this.visibleItems = [], this.willFilterEmit = !1, this.willPerformFilter = !1, this.messages = q({ blocking: !0 }), this.focusSetter = W()(this), this.dataForFilter = [], this.hasFilterActionsEnd = !1, this.hasFilterActionsStart = !1, this.hasFilterNoResults = !1, this.sortHandleMenuItems = [], this.disabled = !1, this.dragEnabled = !1, this.filterEnabled = !1, this.filteredData = [], this.filteredItems = [], this.interactionMode = "interactive", this.loading = !1, this.displayMode = "flat", this.scale = "m", this.selectedItems = [], this.selectionAppearance = "icon", this.selectionMode = "none", this.sortDisabled = !1, this.calciteInternalListDefaultSlotChange = m({ cancelable: !1 }), this.calciteListChange = m({ cancelable: !1 }), this.calciteListDragEnd = m({ cancelable: !1 }), this.calciteListDragStart = m({ cancelable: !1 }), this.calciteListFilter = m({ cancelable: !1 }), this.calciteListMoveHalt = m({ cancelable: !1 }), this.calciteListOrderChange = m({ cancelable: !1 }), this.listen("calciteInternalListItemToggle", this.handleCalciteListItemToggle), this.listen("calciteInternalFocusPreviousItem", this.handleCalciteInternalFocusPreviousItem), this.listen("calciteInternalListItemActive", this.handleCalciteInternalListItemActive), this.listen("calciteListItemSelect", this.handleCalciteListItemSelect), this.listen("calciteInternalAssistiveTextChange", this.handleCalciteInternalAssistiveTextChange), this.listen("calciteListItemSortHandleBeforeOpen", this.updateListItemsDebounced), this.listen("calciteSortHandleReorder", this.handleSortReorder), this.listen("calciteSortHandleMove", this.handleSortMove), this.listen("calciteSortHandleAdd", this.handleSortAdd), this.listen("calciteInternalListItemSelect", this.handleCalciteInternalListItemSelect), this.listen("calciteInternalListItemSelectMultiple", this.handleCalciteInternalListItemSelectMultiple), this.listen("calciteInternalListItemChange", this.handleCalciteInternalListItemChange), this.listen("calciteInternalListItemGroupDefaultSlotChange", this.handleCalciteInternalListItemGroupDefaultSlotChange);
  }
  static {
    this.properties = { assistiveText: 16, dataForFilter: 16, hasFilterActionsEnd: 16, hasFilterActionsStart: 16, hasFilterNoResults: 16, sortHandleMenuItems: 16, canPull: 0, canPut: 0, disabled: 7, dragEnabled: 7, filterEnabled: 7, filterPredicate: 0, filterLabel: 3, filterPlaceholder: 3, filterProps: 0, filterText: 3, filteredData: 0, filteredItems: 0, group: 3, interactionMode: 3, label: 1, loading: 7, messageOverrides: 0, displayMode: 3, numberingSystem: 1, scale: 3, selectedItems: 0, selectionAppearance: 3, selectionMode: 3, sortDisabled: 7 };
  }
  static {
    this.styles = _;
  }
  get hasActiveFilter() {
    return this.filterEnabled && this.filterText && this.filteredItems.length !== this.visibleItems.length;
  }
  get showNoResultsContainer() {
    return this.filterEnabled && this.filterText && this.hasFilterNoResults && this.visibleItems.length && !this.filteredItems.length;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.filterEnabled ? this.filterEl : this.focusableItems.find((t) => t.active), e);
  }
  emitOrderChangeEvent(e) {
    this.calciteListOrderChange.emit(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectObserver(), this.willPerformFilter = !0, this.updateListItemsDebounced(), this.setUpSorting(), this.setParentList(), this.setListItemGroups(), this.cancelable.add(this.updateListItemsDebounced);
  }
  async load() {
    this.handleInteractionModeWarning();
  }
  willUpdate(e) {
    (e.has("filterText") || e.has("filterProps") || e.has("filterPredicate")) && this.performFilter(), (e.has("filterEnabled") && (this.hasUpdated || this.filterEnabled !== !1) || e.has("group") || e.has("sortDisabled") && (this.hasUpdated || this.sortDisabled !== !1) || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1) || e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") || e.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "icon") || e.has("displayMode") && this.hasUpdated || e.has("scale") && this.hasUpdated || e.has("canPull") && this.hasUpdated || e.has("canPut") && this.hasUpdated || e.has("filterPredicate") && this.hasUpdated) && this.handleListItemChange();
  }
  updated() {
    T(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectObserver(), N(this);
  }
  updateListItems() {
    this.updateGroupItems();
    const { selectionAppearance: e, selectionMode: t, interactionMode: s, dragEnabled: a, el: i, filterEl: n, displayMode: l, scale: r, sortDisabled: c, sortHandleMenuItems: f } = this, p = Array.from(this.el.querySelectorAll(I)), g = i, F = Array.from(g.children).filter(b);
    if (p.forEach((o) => {
      o.scale = r, o.selectionAppearance = e, o.selectionMode = t, o.interactionMode = s, o.closest(S) === i && (o.moveToItems = f.filter((v) => this.validateSortMenuItem({
        type: "move",
        fromEl: g,
        toEl: v.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: F.indexOf(o)
      })), o.addToItems = this.sortHandleMenuItems.filter((v) => this.validateSortMenuItem({
        type: "add",
        fromEl: g,
        toEl: v.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: F.indexOf(o)
      })), o.dragHandle = a, o.displayMode = l, o.sortDisabled = c);
    }), this.parentListEl) {
      this.setUpSorting();
      return;
    }
    this.listItems = p, this.filterEnabled && this.willPerformFilter && (this.willPerformFilter = !1, this.dataForFilter = this.getItemData(), n && (n.items = this.dataForFilter, this.filterAndUpdateData())), this.visibleItems = this.listItems.filter((o) => !o.closed && !o.hidden), this.updateFilteredItems(), this.borderItems(), this.focusableItems = this.filteredItems.filter((o) => !o.disabled), this.setActiveListItem(), this.updateSelectedItems(), this.setUpSorting();
  }
  handleListItemChange() {
    this.willPerformFilter = !0, this.updateListItemsDebounced();
  }
  handleCalciteListItemToggle(e) {
    this.parentListEl || (e.stopPropagation(), this.borderItems());
  }
  handleCalciteInternalFocusPreviousItem(e) {
    if (this.parentListEl)
      return;
    e.stopPropagation();
    const { focusableItems: t } = this, a = t.findIndex((i) => i.active) - 1;
    t[a] && this.focusRow(t[a]);
  }
  handleCalciteInternalListItemActive(e) {
    if (this.parentListEl)
      return;
    e.stopPropagation();
    const t = e.target, { listItems: s } = this;
    s.forEach((a) => {
      a.active = a === t;
    });
  }
  handleCalciteListItemSelect() {
    this.parentListEl || this.updateSelectedItems(!0);
  }
  handleCalciteInternalAssistiveTextChange(e) {
    this.assistiveText = e.detail.message, e.stopPropagation();
  }
  handleSortReorder(e) {
    this.parentListEl || e.defaultPrevented || (e.preventDefault(), this.handleReorder(e));
  }
  handleSortAdd(e) {
    this.parentListEl || e.defaultPrevented || (e.preventDefault(), this.handleAdd(e));
  }
  handleSortMove(e) {
    this.parentListEl || e.defaultPrevented || (e.preventDefault(), this.handleMove(e));
  }
  handleCalciteInternalListItemSelect(e) {
    if (this.parentListEl)
      return;
    e.stopPropagation();
    const t = e.target, { listItems: s, selectionMode: a } = this;
    t.selected && (a === "single" || a === "single-persist") && s.forEach((i) => i.selected = i === t), this.updateSelectedItems();
  }
  handleCalciteInternalListItemSelectMultiple(e) {
    if (this.parentListEl)
      return;
    e.stopPropagation();
    const { target: t, detail: s } = e, { focusableItems: a, lastSelectedInfo: i } = this, n = t;
    if (s.selectMultiple && i) {
      const l = a.indexOf(n), r = a.indexOf(i.selectedItem), c = Math.min(r, l), f = Math.max(r, l);
      a.slice(c, f + 1).forEach((p) => p.selected = i.selected);
    } else
      this.lastSelectedInfo = { selectedItem: n, selected: n.selected };
  }
  handleCalciteInternalListItemChange(e) {
    this.parentListEl || (e.stopPropagation(), this.updateListItemsDebounced());
  }
  handleCalciteInternalListItemGroupDefaultSlotChange(e) {
    e.stopPropagation();
  }
  connectObserver() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  disconnectObserver() {
    this.mutationObserver?.disconnect();
  }
  setUpSorting() {
    const { dragEnabled: e, defaultSlotEl: t } = this;
    e && (t && U(t), G(this));
  }
  onGlobalDragStart() {
    this.disconnectObserver();
  }
  onGlobalDragEnd() {
    this.connectObserver();
  }
  onDragEnd(e) {
    this.calciteListDragEnd.emit(e);
  }
  onDragStart(e) {
    e.dragEl.sortHandleOpen = !1, this.calciteListDragStart.emit(e);
  }
  onDragSort(e) {
    this.setParentList(), this.updateListItemsDebounced(), this.calciteListOrderChange.emit(e);
  }
  setParentList() {
    this.parentListEl = this.el.parentElement?.closest(S);
  }
  handleDefaultSlotChange() {
    this.parentListEl && this.calciteInternalListDefaultSlotChange.emit();
  }
  setListItemGroups() {
    this.listItemGroups = Array.from(this.el.querySelectorAll(C));
  }
  handleFilterActionsStartSlotChange(e) {
    this.hasFilterActionsStart = L(e);
  }
  handleFilterActionsEndSlotChange(e) {
    this.hasFilterActionsEnd = L(e);
  }
  handleFilterNoResultsSlotChange(e) {
    this.hasFilterNoResults = L(e);
  }
  setActiveListItem() {
    const { focusableItems: e } = this;
    e.some((t) => t.active) || e[0] && (e[0].active = !0);
  }
  async updateSelectedItems(e = !1) {
    await this.updateComplete, this.selectedItems = this.visibleItems.filter((t) => t.selected), e && this.calciteListChange.emit();
  }
  filterElements({ el: e, filteredItems: t, visibleParents: s }) {
    const a = !s.has(e) && !t.includes(e);
    e.filterHidden = a;
    const i = e.parentElement.closest(j);
    i && (a || s.add(i), this.filterElements({
      el: i,
      filteredItems: t,
      visibleParents: s
    }));
  }
  allParentListItemsExpanded(e) {
    const t = e.parentElement?.closest(I);
    if (t) {
      if (!t.expanded)
        return !1;
    } else return !0;
    return this.allParentListItemsExpanded(t);
  }
  borderItems() {
    const e = this.visibleItems.filter((t) => !t.filterHidden && this.allParentListItemsExpanded(t));
    e.forEach((t) => t.bordered = t !== e[e.length - 1]);
  }
  updateFilteredItems() {
    const { visibleItems: e, filteredData: t, filterText: s, filterPredicate: a } = this, i = e?.filter((r) => e.every((c) => c === r || !r.contains(c))), n = a ? e.filter(a) : s ? t.map((r) => r.el) : e || [], l = /* @__PURE__ */ new WeakSet();
    i.forEach((r) => this.filterElements({ el: r, filteredItems: n, visibleParents: l })), this.filteredItems = n, this.willFilterEmit && (this.willFilterEmit = !1, this.calciteListFilter.emit());
  }
  updateFilteredData() {
    const { filterEl: e } = this;
    e && (e.filteredItems && (this.filteredData = e.filteredItems), this.updateListItemsDebounced());
  }
  async filterAndUpdateData() {
    await this.filterEl?.filter(this.filterText), this.updateFilteredData();
  }
  get effectiveFilterProps() {
    return this.filterProps ? this.filterProps.filter((e) => e !== "el") : ["description", "label", "metadata", "heading"];
  }
  performFilter() {
    const { filterEl: e, filterText: t, effectiveFilterProps: s } = this;
    e && (e.value = t, e.filterProps = s, this.filterAndUpdateData());
  }
  setDefaultSlotEl(e) {
    this.defaultSlotEl = e;
  }
  setFilterEl(e) {
    this.filterEl = e, this.performFilter();
  }
  handleFilterChange(e) {
    e.stopPropagation();
    const { value: t } = e.currentTarget;
    this.filterText = t, this.willFilterEmit = !0, this.updateFilteredData();
  }
  getItemData() {
    return this.listItems.map((e) => ({
      label: e.label,
      description: e.description,
      metadata: e.metadata,
      heading: this.getGroupHeading(e),
      el: e
    }));
  }
  getGroupHeading(e) {
    return this.listItemGroups.filter((s) => s.contains(e)).map((s) => s.heading);
  }
  updateGroupItems() {
    const { el: e, group: t, scale: s } = this, a = k(e), i = t ? Array.from(a.querySelectorAll(`${S}[group="${t}"]`)).filter((l) => !l.disabled && l.dragEnabled) : [];
    this.sortHandleMenuItems = i.map((l) => ({
      element: l,
      label: l.label ?? l.id,
      id: z()
    })), Array.from(this.el.querySelectorAll(C)).forEach((l) => {
      l.scale = s;
    });
  }
  focusRow(e) {
    const { focusableItems: t } = this;
    e && (t.forEach((s) => s.active = s === e), e.setFocus());
  }
  isNavigable(e) {
    const t = e.parentElement?.closest(I);
    return t ? t.expanded && this.isNavigable(t) : !0;
  }
  handleListKeydown(e) {
    if (e.defaultPrevented || this.parentListEl)
      return;
    const { key: t } = e, s = this.focusableItems.filter((i) => this.isNavigable(i)), a = s.findIndex((i) => i.active);
    if (t === "ArrowDown") {
      e.preventDefault();
      const i = e.target === this.filterEl ? 0 : a + 1;
      s[i] && this.focusRow(s[i]);
    } else if (t === "ArrowUp") {
      if (e.preventDefault(), a === 0 && this.filterEnabled) {
        this.filterEl.setFocus();
        return;
      }
      const i = a - 1;
      s[i] && this.focusRow(s[i]);
    } else if (t === "Home") {
      e.preventDefault();
      const i = s[0];
      i && this.focusRow(i);
    } else if (t === "End") {
      e.preventDefault();
      const i = s[s.length - 1];
      i && this.focusRow(i);
    }
  }
  handleInteractionModeWarning() {
    this.interactionMode === "static" && this.selectionMode !== "none" && this.selectionAppearance === "border" && console.warn('selection-appearance="border" requires interaction-mode="interactive"');
  }
  validateSortMenuItem({ fromEl: e, toEl: t, dragEl: s, newIndex: a, oldIndex: i, type: n }) {
    if (!e || !t || t === e || s.contains(t))
      return !1;
    const l = e.canPull?.({
      toEl: t,
      fromEl: e,
      dragEl: s,
      newIndex: a,
      oldIndex: i
    }) ?? !0, r = t.canPut?.({
      toEl: t,
      fromEl: e,
      dragEl: s,
      newIndex: a,
      oldIndex: i
    }) ?? !0;
    return (n === "add" ? l === "clone" : l === !0) && r;
  }
  handleAdd(e) {
    const { addTo: t } = e.detail, s = e.target, a = s?.parentElement, i = t.element, l = Array.from(a.children).filter(b).indexOf(s), r = 0;
    if (!this.validateSortMenuItem({ type: "add", fromEl: a, toEl: i, dragEl: s, newIndex: r, oldIndex: l }))
      return;
    s.sortHandleOpen = !1, this.disconnectObserver();
    const c = s.cloneNode();
    i.prepend(c), A(s), this.updateListItemsDebounced(), this.connectObserver();
    const f = {
      dragEl: s,
      fromEl: a,
      toEl: i,
      newIndex: r,
      oldIndex: l
    };
    this.calciteListOrderChange.emit(f), i.emitOrderChangeEvent(f);
  }
  handleMove(e) {
    const { moveTo: t } = e.detail, s = e.target, a = s?.parentElement, i = t.element, l = Array.from(a.children).filter(b).indexOf(s), r = 0;
    if (!this.validateSortMenuItem({ type: "move", fromEl: a, toEl: i, dragEl: s, newIndex: r, oldIndex: l }))
      return;
    s.sortHandleOpen = !1, this.disconnectObserver(), i.prepend(s), A(s), this.updateListItemsDebounced(), this.connectObserver();
    const c = {
      dragEl: s,
      fromEl: a,
      toEl: i,
      newIndex: r,
      oldIndex: l
    };
    this.calciteListOrderChange.emit(c), i.emitOrderChangeEvent(c);
  }
  handleReorder(e) {
    const { reorder: t } = e.detail, s = e.target, a = s?.parentElement;
    if (!a)
      return;
    s.sortHandleOpen = !1;
    const i = Array.from(a.children).filter(b), n = i.length - 1, l = i.indexOf(s);
    let r = l;
    switch (t) {
      case "top":
        r = 0;
        break;
      case "bottom":
        r = n;
        break;
      case "up":
        r = l === 0 ? 0 : l - 1;
        break;
      case "down":
        r = l === n ? n : l + 1;
        break;
    }
    this.disconnectObserver();
    const c = t === "up" || t === "top" ? i[r] : i[r].nextSibling;
    a.insertBefore(s, c), this.updateListItemsDebounced(), this.connectObserver(), this.calciteListOrderChange.emit({
      dragEl: s,
      fromEl: a,
      toEl: a,
      newIndex: r,
      oldIndex: l
    });
  }
  render() {
    const { loading: e, label: t, disabled: s, dataForFilter: a, filterEnabled: i, filterPlaceholder: n, filterText: l, filterLabel: r, hasFilterActionsStart: c, hasFilterActionsEnd: f, effectiveFilterProps: p } = this;
    return H({ disabled: this.disabled, children: d`<div class=${u({
      [h.container]: !0,
      [h.containerHeight]: this.listItems.length < 1 && e
    })}>${this.dragEnabled ? d`<span aria-live=assertive class=${u(h.assistiveText)}>${this.assistiveText}</span>` : null}${this.renderItemAriaLive()}${e ? d`<calcite-scrim class=${u(h.scrim)} .loading=${e}></calcite-scrim>` : null}<div .ariaBusy=${e} .ariaLabel=${t || ""} class=${u(h.table)} @keydown=${this.handleListKeydown} role=treegrid>${i || c || f ? d`<div class=${u(h.sticky)} role=rowgroup><div role=row><div role=columnheader><calcite-stack class=${u(h.stack)}><slot name=${x.filterActionsStart} @slotchange=${this.handleFilterActionsStartSlotChange} slot=${P.actionsStart}></slot><calcite-filter .ariaLabel=${n} .disabled=${s} .filterProps=${p} .items=${a} .label=${r} @calciteFilterChange=${this.handleFilterChange} .placeholder=${n} .scale=${this.scale} .value=${l} ${D(this.setFilterEl)}></calcite-filter><slot name=${x.filterActionsEnd} @slotchange=${this.handleFilterActionsEndSlotChange} slot=${P.actionsEnd}></slot></calcite-stack></div></div></div>` : null}<div class=${u(h.tableContainer)} role=rowgroup><slot @slotchange=${this.handleDefaultSlotChange} ${D(this.setDefaultSlotEl)}></slot></div></div><div aria-live=polite data-test-id=no-results-container .hidden=${!this.showNoResultsContainer}><slot name=${x.filterNoResults} @slotchange=${this.handleFilterNoResultsSlotChange}></slot></div></div>` });
  }
  renderItemAriaLive() {
    const { messages: e, filteredItems: t, parentListEl: s, messages: { _lang: a }, numberingSystem: i } = this;
    return y.numberFormatOptions = {
      locale: a,
      numberingSystem: i
    }, s ? null : d`<div aria-live=polite class=${u(h.assistiveText)}>${this.hasActiveFilter ? E("aria-filter-enabled", d`<div>${e.filterEnabled}</div>`) : null}${E("aria-item-count", d`<div>${e.total.replace("{count}", y.localize(t.length.toString()))}</div>`)}${t.length ? E("aria-item-list", d`<ol>${t.map((n) => d`<li>${n.label}</li>`)}</ol>`) : null}</div>`;
  }
}
O("calcite-list", J);
export {
  J as List
};
