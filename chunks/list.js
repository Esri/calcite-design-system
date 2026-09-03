/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as O, L as M, P as R, c as m, l as k, s as p, J as H, b as d, d as T } from "./index.js";
import { n as L } from "./ref.js";
import { i as C } from "./keyed.js";
import { d as U } from "./debounce.js";
import { u as y, s as S, g as G } from "./dom.js";
import { c as D } from "./observers.js";
import { l as u, a as F, u as N, b as x, e as A, S as I, C as h } from "./utils5.js";
import { S as $ } from "./resources19.js";
import { n as P } from "./locale.js";
import { g as z } from "./guid.js";
import { u as q } from "./useT9n.js";
import { u as B } from "./useCancelable.js";
import { u as W } from "./useSetFocus.js";
import { u as K } from "./useInteractive.js";
import { u as J } from "./useSortable.js";
import { i as b } from "./resources35.js";
const V = O`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xxs)}:host([scale=l]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xs)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{position:relative;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.container-height{block-size:100%}.table-container{box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%}.stack{--calcite-stack-padding-inline: 0;--calcite-stack-padding-block: 0}.sticky-pos{position:sticky;inset-block-start:0px;z-index:calc(var(--calcite-z-index-sticky) + 1);background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}::slotted(:is(calcite-action[slot=filter-actions-start],calcite-action[slot=filter-actions-end])){gap:var(--calcite-internal-list-action-spacing);align-self:center}::slotted(calcite-action[slot=filter-actions-start]){margin-inline-start:var(--calcite-internal-list-action-spacing)}::slotted(calcite-action[slot=filter-actions-end]){margin-inline-end:var(--calcite-internal-list-action-spacing)}:host([hidden]){display:none}[hidden]{display:none}`, _ = `${x}, ${u}`;
class j extends M {
  constructor() {
    super(), this.dragSelector = u, this.focusableItems = [], this.handleSelector = "calcite-sort-handle", this.listItems = [], this.listItemGroups = [], this.mutationObserver = D("mutation", () => {
      this.willPerformFilter = !0, this.updateListItemsDebounced();
    }), this.cancelable = B()(this), this.sortable = J()(this), this.updateListItemsDebounced = U(this.updateListItems, R.nextTick), this.visibleItems = [], this.willFilterEmit = !1, this.willPerformFilter = !1, this.messages = q({ blocking: !0 }), this.focusSetter = W()(this), this.interactiveContainer = K(this), this.filterRowResizeObserver = D("resize", () => this.updateFilterRowHeight()), this.setFilterContainerEl = (t) => {
      this.filterContainerEl = t, this.observeFilterRow();
    }, this.dataForFilter = [], this.hasFilterActionsEnd = !1, this.hasFilterActionsStart = !1, this.hasFilterNoResults = !1, this.sortHandleMenuItems = [], this.hasContent = !1, this.hasEmptyContent = !1, this.filterRowHeight = 0, this.disabled = !1, this.dragEnabled = !1, this.filterEnabled = !1, this.filterText = "", this.filteredData = [], this.filteredItems = [], this.interactionMode = "interactive", this.loading = !1, this.displayMode = "flat", this.scale = "m", this.selectedItems = [], this.selectionAppearance = "icon", this.selectionMode = "none", this.sortDisabled = !1, this.calciteInternalListDefaultSlotChange = m({ cancelable: !1 }), this.calciteListChange = m({ cancelable: !1 }), this.calciteListDragEnd = m({ cancelable: !1 }), this.calciteListDragStart = m({ cancelable: !1 }), this.calciteListFilter = m({ cancelable: !1 }), this.calciteListMoveHalt = m({ cancelable: !1 }), this.calciteListOrderChange = m({ cancelable: !1 }), this.listen("calciteInternalListItemToggle", this.handleCalciteListItemToggle), this.listen("calciteInternalFocusPreviousItem", this.handleCalciteInternalFocusPreviousItem), this.listen("calciteInternalListItemActive", this.handleCalciteInternalListItemActive), this.listen("calciteListItemSelect", this.handleCalciteListItemSelect), this.listen("calciteInternalAssistiveTextChange", this.handleCalciteInternalAssistiveTextChange), this.listen("calciteListItemSortHandleBeforeOpen", this.updateListItemsDebounced), this.listen("calciteSortHandleReorder", this.handleSortReorder), this.listen("calciteSortHandleMove", this.handleSortMove), this.listen("calciteSortHandleAdd", this.handleSortAdd), this.listen("calciteInternalListItemSelect", this.handleCalciteInternalListItemSelect), this.listen("calciteInternalListItemSelectMultiple", this.handleCalciteInternalListItemSelectMultiple), this.listen("calciteInternalListItemChange", this.handleCalciteInternalListItemChange), this.listen("calciteInternalListItemGroupDefaultSlotChange", this.handleCalciteInternalListItemGroupDefaultSlotChange), this.listen("calciteInternalListItemGroupChange", this.handleCalciteInternalListItemChange);
  }
  static {
    this.properties = { assistiveText: 16, dataForFilter: 16, hasFilterActionsEnd: 16, hasFilterActionsStart: 16, hasFilterNoResults: 16, sortHandleMenuItems: 16, hasContent: 16, hasEmptyContent: 16, filterRowHeight: 16, canPull: 0, canPut: 0, disabled: 7, dragEnabled: 7, filterEnabled: 7, filterPredicate: 0, filterLabel: 3, filterPlaceholder: 3, filterProps: 0, filterText: 3, filteredData: 0, filteredItems: 0, group: 3, interactionMode: 3, label: 1, loading: 7, messageOverrides: 0, displayMode: 3, numberingSystem: 1, scale: 3, selectedItems: 0, selectionAppearance: 3, selectionMode: 3, sortDisabled: 7 };
  }
  static {
    this.styles = V;
  }
  get hasActiveFilter() {
    return !!(this.filterEnabled && this.filterText && this.filteredItems.length !== this.visibleItems.length);
  }
  get showEmptyContentContainer() {
    return !this.hasContent && this.hasEmptyContent;
  }
  get showNoResultsContainer() {
    return !!(this.filterEnabled && this.filterText && this.hasFilterNoResults && this.visibleItems.length && !this.filteredItems.length);
  }
  get effectiveFilterProps() {
    return this.filterProps ? this.filterProps.filter((t) => t !== "el") : ["description", "label", "metadata", "heading"];
  }
  emitOrderChangeEvent(t) {
    this.calciteListOrderChange.emit(t);
  }
  async setFocus(t) {
    return this.focusSetter(() => this.filterEnabled ? this.filterEl : this.focusableItems.find((e) => e.active), t);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectObserver(), this.willPerformFilter = !0, this.updateListItemsDebounced(), this.setUpSorting(), this.setParentList(), this.setListItemGroups(), this.cancelable.add(this.updateListItemsDebounced);
  }
  async load() {
    this.handleInteractionModeWarning();
  }
  willUpdate(t) {
    (t.has("filterText") || t.has("filterProps") || t.has("filterPredicate")) && this.performFilter(), (t.has("filterEnabled") && (this.hasUpdated || this.filterEnabled !== !1) || t.has("group") || t.has("sortDisabled") && (this.hasUpdated || this.sortDisabled !== !1) || t.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1) || t.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") || t.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "icon") || t.has("displayMode") && this.hasUpdated || t.has("scale") && this.hasUpdated || t.has("canPull") && this.hasUpdated || t.has("canPut") && this.hasUpdated || t.has("filterPredicate") && this.hasUpdated) && this.handleListItemChange();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectObserver(), this.unobserveFilterRow();
  }
  updateListItems() {
    this.updateFilterRowHeight(), this.updateGroupItems();
    const { selectionAppearance: t, selectionMode: e, interactionMode: i, dragEnabled: a, el: s, filterEl: n, displayMode: l, scale: r, sortDisabled: c, sortHandleMenuItems: f } = this, g = Array.from(this.el.querySelectorAll(u)), v = s, w = Array.from(v.children).filter(b);
    if (g.forEach((o) => {
      o.closest(F) === s && (o.scale = r, o.selectionAppearance = t, o.selectionMode = e, o.interactionMode = i, o.moveToItems = f.filter((E) => this.validateSortMenuItem({
        type: "move",
        fromEl: v,
        toEl: E.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: w.indexOf(o)
      })), o.addToItems = this.sortHandleMenuItems.filter((E) => this.validateSortMenuItem({
        type: "add",
        fromEl: v,
        toEl: E.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: w.indexOf(o)
      })), o.dragHandle = a, o.displayMode = l, o.sortDisabled = c);
    }), this.parentListEl) {
      this.setUpSorting();
      return;
    }
    this.listItems = g, this.filterEnabled && this.willPerformFilter && (this.willPerformFilter = !1, this.dataForFilter = this.getItemData(), n && (n.items = this.dataForFilter, this.filterAndUpdateData())), this.visibleItems = this.listItems.filter((o) => !o.closed && !o.hidden), this.updateFilteredItems(), this.borderItems(), this.focusableItems = this.filteredItems.filter((o) => !o.disabled), this.setActiveListItem(), this.updateSelectedItems(), this.setUpSorting();
  }
  unobserveFilterRow() {
    this.filterRowResizeObserver?.disconnect();
  }
  observeFilterRow() {
    this.unobserveFilterRow();
    const t = this.filterContainerEl;
    t && this.filterRowResizeObserver?.observe(t);
  }
  updateFilterRowHeight() {
    this.filterRowHeight = this.filterContainerEl?.clientHeight ?? 0;
  }
  handleListItemChange() {
    this.willPerformFilter = !0, this.updateListItemsDebounced();
  }
  handleCalciteListItemToggle(t) {
    this.parentListEl || (t.stopPropagation(), this.borderItems());
  }
  handleCalciteInternalFocusPreviousItem(t) {
    if (this.parentListEl)
      return;
    t.stopPropagation();
    const { focusableItems: e } = this, a = e.findIndex((s) => s.active) - 1;
    e[a] && this.focusRow(e[a]);
  }
  handleCalciteInternalListItemActive(t) {
    if (this.parentListEl)
      return;
    t.stopPropagation();
    const e = t.target, { listItems: i } = this;
    i.forEach((a) => {
      a.active = a === e;
    });
  }
  handleCalciteListItemSelect() {
    this.parentListEl || this.updateSelectedItems(!0);
  }
  handleCalciteInternalAssistiveTextChange(t) {
    this.assistiveText = t.detail.message, t.stopPropagation();
  }
  handleSortReorder(t) {
    this.parentListEl || t.defaultPrevented || (t.preventDefault(), this.handleReorder(t));
  }
  handleSortAdd(t) {
    this.parentListEl || t.defaultPrevented || (t.preventDefault(), this.handleAdd(t));
  }
  handleSortMove(t) {
    this.parentListEl || t.defaultPrevented || (t.preventDefault(), this.handleMove(t));
  }
  handleCalciteInternalListItemSelect(t) {
    if (this.parentListEl)
      return;
    t.stopPropagation();
    const e = t.target, { listItems: i, selectionMode: a } = this;
    e.selected && (a === "single" || a === "single-persist") && i.forEach((s) => s.selected = s === e), this.updateSelectedItems();
  }
  handleCalciteInternalListItemSelectMultiple(t) {
    if (this.parentListEl)
      return;
    t.stopPropagation();
    const { target: e, detail: i } = t, { focusableItems: a, lastSelectedInfo: s } = this, n = e;
    if (i.selectMultiple && s) {
      const l = a.indexOf(n), r = a.indexOf(s.selectedItem), c = Math.min(r, l), f = Math.max(r, l);
      a.slice(c, f + 1).forEach((g) => g.selected = s.selected);
    } else
      this.lastSelectedInfo = { selectedItem: n, selected: n.selected };
  }
  handleCalciteInternalListItemChange(t) {
    this.parentListEl || (t.stopPropagation(), this.handleListItemChange());
  }
  handleCalciteInternalListItemGroupDefaultSlotChange(t) {
    this.parentListEl || (t.stopPropagation(), this.handleListItemChange());
  }
  connectObserver() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  disconnectObserver() {
    this.mutationObserver?.disconnect();
  }
  setUpSorting() {
    const { dragEnabled: t, defaultSlotEl: e } = this;
    t && e && N(e), this.sortable.reset();
  }
  onGlobalDragStart() {
    this.disconnectObserver();
  }
  onGlobalDragEnd() {
    this.connectObserver();
  }
  onDragEnd(t) {
    this.calciteListDragEnd.emit(t);
  }
  onDragStart(t) {
    t.dragEl.sortHandleOpen = !1, this.calciteListDragStart.emit(t);
  }
  onDragSort(t) {
    this.setParentList(), this.updateListItemsDebounced(), this.calciteListOrderChange.emit(t);
  }
  setParentList() {
    this.parentListEl = this.el.parentElement?.closest(F) || void 0;
  }
  handleDefaultSlotChange(t) {
    this.parentListEl && this.calciteInternalListDefaultSlotChange.emit(), this.hasContent = y(t);
  }
  handleEmptyContentSlotChange(t) {
    this.hasEmptyContent = y(t);
  }
  setListItemGroups() {
    this.listItemGroups = Array.from(this.el.querySelectorAll(x));
  }
  handleFilterActionsStartSlotChange(t) {
    this.hasFilterActionsStart = S(t);
  }
  handleFilterActionsEndSlotChange(t) {
    this.hasFilterActionsEnd = S(t);
  }
  handleFilterNoResultsSlotChange(t) {
    this.hasFilterNoResults = S(t);
  }
  setActiveListItem() {
    const { focusableItems: t } = this;
    t.some((e) => e.active) || t[0] && (t[0].active = !0);
  }
  async updateSelectedItems(t = !1) {
    await this.updateComplete, this.selectedItems = this.visibleItems.filter((e) => e.selected), t && this.calciteListChange.emit();
  }
  filterElements({ el: t, filteredItems: e, visibleParents: i }) {
    const a = !i.has(t) && !e.includes(t);
    t.filterHidden = a;
    const s = t.parentElement.closest(_);
    s && (a || i.add(s), this.filterElements({
      el: s,
      filteredItems: e,
      visibleParents: i
    }));
  }
  allParentListItemsExpanded(t) {
    const e = t.parentElement?.closest(u);
    if (e) {
      if (!e.expanded)
        return !1;
    } else return !0;
    return this.allParentListItemsExpanded(e);
  }
  borderItems() {
    const t = this.visibleItems.filter((e) => !e.filterHidden && this.allParentListItemsExpanded(e));
    t.forEach((e) => e.bordered = e !== t[t.length - 1]);
  }
  updateFilteredItems() {
    const { visibleItems: t, filteredData: e, filterText: i, filterPredicate: a } = this, s = t?.filter((r) => t.every((c) => c === r || !r.contains(c))), n = a ? t.filter(a) : i ? e.map((r) => r.el) : t || [], l = /* @__PURE__ */ new WeakSet();
    s.forEach((r) => this.filterElements({ el: r, filteredItems: n, visibleParents: l })), this.filteredItems = n, this.willFilterEmit && (this.willFilterEmit = !1, this.calciteListFilter.emit());
  }
  updateFilteredData() {
    const { filterEl: t } = this;
    t && (t.filteredItems && (this.filteredData = t.filteredItems), this.updateListItemsDebounced());
  }
  async filterAndUpdateData() {
    const t = this.filterEl?.value ?? this.filterText;
    await this.filterEl?.filter(t), this.updateFilteredData();
  }
  performFilter() {
    const { filterEl: t, filterText: e, effectiveFilterProps: i } = this;
    t && (t.value = e, t.filterProps = i, this.filterAndUpdateData());
  }
  setDefaultSlotEl(t) {
    this.defaultSlotEl = t;
  }
  setFilterEl(t) {
    this.filterEl = t, this.performFilter();
  }
  handleFilterChange(t) {
    t.stopPropagation();
    const { value: e } = t.currentTarget;
    this.filterText = e, this.willFilterEmit = !0, this.updateFilteredData();
  }
  getItemData() {
    return this.listItems.map((t) => ({
      label: t.label,
      description: t.description,
      metadata: t.metadata,
      heading: this.getGroupHeading(t),
      el: t
    }));
  }
  getGroupHeading(t) {
    return this.listItemGroups.filter((e) => e.contains(t) && e.heading).map((e) => e.heading);
  }
  updateGroupItems() {
    const { el: t, group: e, scale: i } = this, a = G(t), s = e ? Array.from(a.querySelectorAll(`${F}[group="${e}"]`)).filter((l) => !l.disabled && l.dragEnabled) : [];
    this.sortHandleMenuItems = s.map((l) => ({
      element: l,
      label: l.label ?? l.id,
      id: z()
    })), Array.from(this.el.querySelectorAll(x)).forEach((l) => {
      l.scale = i;
    });
  }
  focusRow(t) {
    const { focusableItems: e } = this;
    t && (e.forEach((i) => i.active = i === t), t.setFocus());
  }
  isNavigable(t) {
    const e = t.parentElement?.closest(u);
    return e ? e.expanded && this.isNavigable(e) : !0;
  }
  handleListKeydown(t) {
    if (t.defaultPrevented || this.parentListEl)
      return;
    const { key: e } = t, i = this.focusableItems.filter((s) => this.isNavigable(s)), a = i.findIndex((s) => s.active);
    if (e === "ArrowDown") {
      t.preventDefault();
      const s = t.target === this.filterEl ? 0 : a + 1;
      i[s] && this.focusRow(i[s]);
    } else if (e === "ArrowUp") {
      if (t.preventDefault(), a === 0 && this.filterEnabled) {
        this.filterEl.setFocus();
        return;
      }
      const s = a - 1;
      i[s] && this.focusRow(i[s]);
    } else if (e === "Home") {
      t.preventDefault();
      const s = i[0];
      s && this.focusRow(s);
    } else if (e === "End") {
      t.preventDefault();
      const s = i[i.length - 1];
      s && this.focusRow(s);
    }
  }
  handleInteractionModeWarning() {
    this.interactionMode === "static" && this.selectionMode !== "none" && this.selectionAppearance === "border" && k.warn('selection-appearance="border" requires interaction-mode="interactive"');
  }
  validateSortMenuItem({ fromEl: t, toEl: e, dragEl: i, newIndex: a, oldIndex: s, type: n }) {
    if (!t || !e || e === t || i.contains(e))
      return !1;
    const l = t.canPull?.({
      toEl: e,
      fromEl: t,
      dragEl: i,
      newIndex: a,
      oldIndex: s
    }) ?? !0, r = e.canPut?.({
      toEl: e,
      fromEl: t,
      dragEl: i,
      newIndex: a,
      oldIndex: s
    }) ?? !0;
    return (n === "add" ? l === "clone" : l === !0) && r;
  }
  handleAdd(t) {
    const { addTo: e } = t.detail, i = t.target, a = i?.parentElement, s = e.element, l = Array.from(a.children).filter(b).indexOf(i), r = 0;
    if (!this.validateSortMenuItem({ type: "add", fromEl: a, toEl: s, dragEl: i, newIndex: r, oldIndex: l }))
      return;
    i.sortHandleOpen = !1, this.disconnectObserver();
    const c = i.cloneNode();
    s.prepend(c), A(i), this.updateListItemsDebounced(), this.connectObserver();
    const f = {
      dragEl: i,
      fromEl: a,
      toEl: s,
      newIndex: r,
      oldIndex: l
    };
    this.calciteListOrderChange.emit(f), s.emitOrderChangeEvent(f);
  }
  handleMove(t) {
    const { moveTo: e } = t.detail, i = t.target, a = i?.parentElement, s = e.element, l = Array.from(a.children).filter(b).indexOf(i), r = 0;
    if (!this.validateSortMenuItem({ type: "move", fromEl: a, toEl: s, dragEl: i, newIndex: r, oldIndex: l }))
      return;
    i.sortHandleOpen = !1, this.disconnectObserver(), s.prepend(i), A(i), this.updateListItemsDebounced(), this.connectObserver();
    const c = {
      dragEl: i,
      fromEl: a,
      toEl: s,
      newIndex: r,
      oldIndex: l
    };
    this.calciteListOrderChange.emit(c), s.emitOrderChangeEvent(c);
  }
  handleReorder(t) {
    const { reorder: e } = t.detail, i = t.target, a = i?.parentElement;
    if (!a)
      return;
    i.sortHandleOpen = !1;
    const s = Array.from(a.children).filter(b), n = s.length - 1, l = s.indexOf(i);
    let r = l;
    switch (e) {
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
    const c = e === "up" || e === "top" ? s[r] : s[r].nextSibling;
    a.insertBefore(i, c), this.updateListItemsDebounced(), this.connectObserver(), this.calciteListOrderChange.emit({
      dragEl: i,
      fromEl: a,
      toEl: a,
      newIndex: r,
      oldIndex: l
    });
  }
  render() {
    const { loading: t, label: e, disabled: i, dataForFilter: a, filterEnabled: s, filterPlaceholder: n, filterLabel: l, hasFilterActionsStart: r, hasFilterActionsEnd: c, effectiveFilterProps: f } = this;
    return this.interactiveContainer({ disabled: this.disabled, children: d`<div class=${p({
      [h.container]: !0,
      [h.containerHeight]: this.listItems.length < 1 && t
    })} style=${H({
      "--calcite-internal-filter-enabled-offset": `${this.filterRowHeight}px`
    })}>${this.dragEnabled ? d`<span aria-live=assertive class=${p(h.assistiveText)}>${this.assistiveText}</span>` : null}${this.renderItemAriaLive()}${t ? d`<calcite-scrim class=${p(h.scrim)} .loading=${t}></calcite-scrim>` : null}<div .ariaBusy=${t} .ariaLabel=${e || ""} class=${p(h.table)} @keydown=${this.handleListKeydown} role=treegrid>${s || r || c ? d`<div class=${p(h.sticky)} role=rowgroup ${L(this.setFilterContainerEl)}><div role=row><div role=columnheader><calcite-stack class=${p(h.stack)}><slot name=${I.filterActionsStart} @slotchange=${this.handleFilterActionsStartSlotChange} slot=${$.actionsStart}></slot><calcite-filter .ariaLabel=${n} .disabled=${i} .filterProps=${f} .items=${a} .label=${l} @calciteFilterChange=${this.handleFilterChange} .placeholder=${n} .scale=${this.scale} ${L(this.setFilterEl)}></calcite-filter><slot name=${I.filterActionsEnd} @slotchange=${this.handleFilterActionsEndSlotChange} slot=${$.actionsEnd}></slot></calcite-stack></div></div></div>` : null}<div class=${p(h.tableContainer)} role=rowgroup><div .hidden=${!this.showEmptyContentContainer}><slot name=${I.emptyContent} @slotchange=${this.handleEmptyContentSlotChange}></slot></div><slot @slotchange=${this.handleDefaultSlotChange} ${L(this.setDefaultSlotEl)}></slot></div></div><div aria-live=polite .hidden=${!this.showNoResultsContainer}><slot name=${I.filterNoResults} @slotchange=${this.handleFilterNoResultsSlotChange}></slot></div></div>` });
  }
  renderItemAriaLive() {
    const { messages: t, filteredItems: e, parentListEl: i, messages: { _lang: a }, numberingSystem: s } = this;
    return P.numberFormatOptions = {
      locale: a,
      numberingSystem: s
    }, i ? null : d`<div aria-live=polite class=${p(h.assistiveText)}>${this.hasActiveFilter ? C("aria-filter-enabled", d`<div>${t.filterEnabled}</div>`) : null}${C("aria-item-count", d`<div>${t.total.replace("{count}", P.localize(e.length.toString()))}</div>`)}${e.length ? C("aria-item-list", d`<ol>${e.map((n) => d`<li>${n.label}</li>`)}</ol>`) : null}</div>`;
  }
}
T("calcite-list", j);
export {
  j as List
};
