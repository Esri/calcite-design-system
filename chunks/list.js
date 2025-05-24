import { a as A, L as $, d as p, s as h, x as d, D as P, c as y } from "./iframe.js";
import { n as S } from "./ref.js";
import { i as I } from "./keyed.js";
import { s as g, C as w } from "./dom.js";
import { u as D, I as k } from "./interactive.js";
import { c as M } from "./observers.js";
import { b as u, u as T, l as b, c as E, i as F, e as O } from "./utils3.js";
import { d as R, c as H } from "./sortableComponent.js";
import { S as C } from "./resources11.js";
import { c as N } from "./component.js";
import { n as x } from "./locale.js";
import { g as U } from "./guid.js";
import { u as G } from "./useT9n.js";
import { d as z } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const f = {
  container: "container",
  table: "table",
  scrim: "scrim",
  stack: "stack",
  tableContainer: "table-container",
  sticky: "sticky-pos",
  assistiveText: "assistive-text"
}, v = {
  filterNoResults: "filter-no-results",
  filterActionsStart: "filter-actions-start",
  filterActionsEnd: "filter-actions-end"
}, q = A`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{position:relative;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.table-container{box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%}.stack{--calcite-stack-padding-inline: 0;--calcite-stack-padding-block: 0}.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index-sticky);background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}`, B = `${E}, ${u}`;
class W extends $ {
  constructor() {
    super(), this.dragSelector = u, this.focusableItems = [], this.handleSelector = "calcite-sort-handle", this.listItems = [], this.listItemGroups = [], this.mutationObserver = M("mutation", () => {
      this.willPerformFilter = !0, this.updateListItems();
    }), this.updateListItems = z(() => {
      this.updateGroupItems();
      const { selectionAppearance: t, selectionMode: e, interactionMode: i, dragEnabled: l, el: s, filterEl: n, moveToItems: a, displayMode: r, scale: c } = this, m = Array.from(this.el.querySelectorAll(u));
      if (m.forEach((o) => {
        o.scale = c, o.selectionAppearance = t, o.selectionMode = e, o.interactionMode = i, o.closest(b) === s && (o.moveToItems = a.filter((L) => L.element !== s && !o.contains(L.element)), o.dragHandle = l, o.displayMode = r);
      }), this.parentListEl) {
        this.setUpSorting();
        return;
      }
      this.listItems = m, this.filterEnabled && this.willPerformFilter && (this.willPerformFilter = !1, this.dataForFilter = this.getItemData(), n && (n.items = this.dataForFilter, this.filterAndUpdateData())), this.visibleItems = this.listItems.filter((o) => !o.closed && !o.hidden), this.updateFilteredItems(), this.borderItems(), this.focusableItems = this.filteredItems.filter((o) => !o.disabled), this.setActiveListItem(), this.updateSelectedItems(), this.setUpSorting();
    }, P.nextTick), this.visibleItems = [], this.willFilterEmit = !1, this.willPerformFilter = !1, this.messages = G({ blocking: !0 }), this.dataForFilter = [], this.hasFilterActionsEnd = !1, this.hasFilterActionsStart = !1, this.hasFilterNoResults = !1, this.moveToItems = [], this.disabled = !1, this.dragEnabled = !1, this.filterEnabled = !1, this.filteredData = [], this.filteredItems = [], this.interactionMode = "interactive", this.loading = !1, this.displayMode = "flat", this.scale = "m", this.selectedItems = [], this.selectionAppearance = "icon", this.selectionMode = "none", this.calciteInternalListDefaultSlotChange = p({ cancelable: !1 }), this.calciteListChange = p({ cancelable: !1 }), this.calciteListDragEnd = p({ cancelable: !1 }), this.calciteListDragStart = p({ cancelable: !1 }), this.calciteListFilter = p({ cancelable: !1 }), this.calciteListMoveHalt = p({ cancelable: !1 }), this.calciteListOrderChange = p({ cancelable: !1 }), this.listen("calciteInternalListItemToggle", this.handleCalciteListItemToggle), this.listen("calciteInternalFocusPreviousItem", this.handleCalciteInternalFocusPreviousItem), this.listen("calciteInternalListItemActive", this.handleCalciteInternalListItemActive), this.listen("calciteListItemSelect", this.handleCalciteListItemSelect), this.listen("calciteInternalAssistiveTextChange", this.handleCalciteInternalAssistiveTextChange), this.listen("calciteSortHandleReorder", this.handleSortReorder), this.listen("calciteSortHandleMove", this.handleSortMove), this.listen("calciteInternalListItemSelect", this.handleCalciteInternalListItemSelect), this.listen("calciteInternalListItemSelectMultiple", this.handleCalciteInternalListItemSelectMultiple), this.listen("calciteInternalListItemChange", this.handleCalciteInternalListItemChange), this.listen("calciteInternalListItemGroupDefaultSlotChange", this.handleCalciteInternalListItemGroupDefaultSlotChange);
  }
  static {
    this.properties = { assistiveText: 16, dataForFilter: 16, hasFilterActionsEnd: 16, hasFilterActionsStart: 16, hasFilterNoResults: 16, moveToItems: 16, hasActiveFilter: 16, showNoResultsContainer: 16, canPull: 0, canPut: 0, disabled: 7, dragEnabled: 7, filterEnabled: 7, filterPredicate: 0, filterLabel: 3, filterPlaceholder: 3, filterProps: 0, filterText: 3, filteredData: 0, filteredItems: 0, group: 3, interactionMode: 3, label: 1, loading: 7, messageOverrides: 0, displayMode: 3, numberingSystem: 1, scale: 3, selectedItems: 0, selectionAppearance: 3, selectionMode: 3 };
  }
  static {
    this.styles = q;
  }
  get hasActiveFilter() {
    return this.filterEnabled && this.filterText && this.filteredItems.length !== this.visibleItems.length;
  }
  get showNoResultsContainer() {
    return this.filterEnabled && this.filterText && this.hasFilterNoResults && this.visibleItems.length && !this.filteredItems.length;
  }
  putFailed(t) {
    this.calciteListMoveHalt.emit(t);
  }
  async setFocus() {
    return await N(this), this.filterEnabled ? this.filterEl?.setFocus() : this.focusableItems.find((t) => t.active)?.setFocus();
  }
  connectedCallback() {
    super.connectedCallback(), this.connectObserver(), this.willPerformFilter = !0, this.updateListItems(), this.setUpSorting(), this.setParentList(), this.setListItemGroups();
  }
  async load() {
    this.handleInteractionModeWarning();
  }
  willUpdate(t) {
    (t.has("filterText") || t.has("filterProps") || t.has("filterPredicate")) && this.performFilter(), (t.has("filterEnabled") && (this.hasUpdated || this.filterEnabled !== !1) || t.has("group") || t.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1) || t.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") || t.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "icon") || t.has("displayMode") && this.hasUpdated || t.has("scale") && this.hasUpdated || t.has("filterPredicate") && this.hasUpdated) && this.handleListItemChange();
  }
  updated() {
    D(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectObserver(), R(this);
  }
  handleListItemChange() {
    this.willPerformFilter = !0, this.updateListItems();
  }
  handleCalciteListItemToggle(t) {
    this.parentListEl || (t.stopPropagation(), this.borderItems());
  }
  handleCalciteInternalFocusPreviousItem(t) {
    if (this.parentListEl)
      return;
    t.stopPropagation();
    const { focusableItems: e } = this, l = e.findIndex((s) => s.active) - 1;
    e[l] && this.focusRow(e[l]);
  }
  handleCalciteInternalListItemActive(t) {
    if (this.parentListEl)
      return;
    t.stopPropagation();
    const e = t.target, { listItems: i } = this;
    i.forEach((l) => {
      l.active = l === e;
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
  handleSortMove(t) {
    this.parentListEl || t.defaultPrevented || (t.preventDefault(), this.handleMove(t));
  }
  handleCalciteInternalListItemSelect(t) {
    if (this.parentListEl)
      return;
    t.stopPropagation();
    const e = t.target, { listItems: i, selectionMode: l } = this;
    e.selected && (l === "single" || l === "single-persist") && i.forEach((s) => s.selected = s === e), this.updateSelectedItems();
  }
  handleCalciteInternalListItemSelectMultiple(t) {
    if (this.parentListEl)
      return;
    t.stopPropagation();
    const { target: e, detail: i } = t, { focusableItems: l, lastSelectedInfo: s } = this, n = e;
    if (i.selectMultiple && s) {
      const a = l.indexOf(n), r = l.indexOf(s.selectedItem), c = Math.min(r, a), m = Math.max(r, a);
      l.slice(c, m + 1).forEach((o) => o.selected = s.selected);
    } else
      this.lastSelectedInfo = { selectedItem: n, selected: n.selected };
  }
  handleCalciteInternalListItemChange(t) {
    this.parentListEl || (t.stopPropagation(), this.updateListItems());
  }
  handleCalciteInternalListItemGroupDefaultSlotChange(t) {
    t.stopPropagation();
  }
  connectObserver() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  disconnectObserver() {
    this.mutationObserver?.disconnect();
  }
  setUpSorting() {
    const { dragEnabled: t, defaultSlotEl: e } = this;
    t && (e && T(e), H(this));
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
    this.setParentList(), this.updateListItems(), this.calciteListOrderChange.emit(t);
  }
  setParentList() {
    this.parentListEl = this.el.parentElement?.closest(b);
  }
  handleDefaultSlotChange() {
    this.parentListEl && this.calciteInternalListDefaultSlotChange.emit();
  }
  setListItemGroups() {
    this.listItemGroups = Array.from(this.el.querySelectorAll(E));
  }
  handleFilterActionsStartSlotChange(t) {
    this.hasFilterActionsStart = g(t);
  }
  handleFilterActionsEndSlotChange(t) {
    this.hasFilterActionsEnd = g(t);
  }
  handleFilterNoResultsSlotChange(t) {
    this.hasFilterNoResults = g(t);
  }
  setActiveListItem() {
    const { focusableItems: t } = this;
    t.some((e) => e.active) || t[0] && (t[0].active = !0);
  }
  async updateSelectedItems(t = !1) {
    await this.updateComplete, this.selectedItems = this.visibleItems.filter((e) => e.selected), t && this.calciteListChange.emit();
  }
  filterElements({ el: t, filteredItems: e, visibleParents: i }) {
    const l = !i.has(t) && !e.includes(t);
    t.filterHidden = l;
    const s = t.parentElement.closest(B);
    s && (l || i.add(s), this.filterElements({
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
    const { visibleItems: t, filteredData: e, filterText: i, filterPredicate: l } = this, s = t?.filter((r) => t.every((c) => c === r || !r.contains(c))), n = l ? t.filter(l) : i ? e.map((r) => r.el) : t || [], a = /* @__PURE__ */ new WeakSet();
    s.forEach((r) => this.filterElements({ el: r, filteredItems: n, visibleParents: a })), this.filteredItems = n, this.willFilterEmit && (this.willFilterEmit = !1, this.calciteListFilter.emit());
  }
  updateFilteredData() {
    const { filterEl: t } = this;
    t && (t.filteredItems && (this.filteredData = t.filteredItems), this.updateListItems());
  }
  async filterAndUpdateData() {
    await this.filterEl?.filter(this.filterText), this.updateFilteredData();
  }
  get effectiveFilterProps() {
    return this.filterProps ? this.filterProps.filter((t) => t !== "el") : ["description", "label", "metadata", "heading"];
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
    return this.listItemGroups.filter((i) => i.contains(t)).map((i) => i.heading);
  }
  updateGroupItems() {
    const { el: t, group: e, scale: i } = this, l = w(t), s = e ? Array.from(l.querySelectorAll(`${b}[group="${e}"]`)).filter((a) => !a.disabled && a.dragEnabled) : [];
    this.moveToItems = s.map((a) => ({
      element: a,
      label: a.label ?? a.id,
      id: U()
    })), Array.from(this.el.querySelectorAll(E)).forEach((a) => {
      a.scale = i;
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
    const { key: e } = t, i = this.focusableItems.filter((s) => this.isNavigable(s)), l = i.findIndex((s) => s.active);
    if (e === "ArrowDown") {
      t.preventDefault();
      const s = t.target === this.filterEl ? 0 : l + 1;
      i[s] && this.focusRow(i[s]);
    } else if (e === "ArrowUp") {
      if (t.preventDefault(), l === 0 && this.filterEnabled) {
        this.filterEl?.setFocus();
        return;
      }
      const s = l - 1;
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
    this.interactionMode === "static" && this.selectionMode !== "none" && this.selectionAppearance === "border" && console.warn('selection-appearance="border" requires interaction-mode="interactive"');
  }
  handleMove(t) {
    const { moveTo: e } = t.detail, i = t.target, l = i?.parentElement, s = e.element, a = Array.from(l.children).filter(F).indexOf(i), r = 0;
    if (l) {
      if (l.canPull?.({
        toEl: s,
        fromEl: l,
        dragEl: i,
        newIndex: r,
        oldIndex: a
      }) === !1) {
        this.calciteListMoveHalt.emit({ toEl: s, fromEl: l, dragEl: i, oldIndex: a, newIndex: r });
        return;
      }
      if (s.canPut?.({
        toEl: s,
        fromEl: l,
        dragEl: i,
        newIndex: r,
        oldIndex: a
      }) === !1) {
        s.putFailed({ toEl: s, fromEl: l, dragEl: i, oldIndex: a, newIndex: r });
        return;
      }
      i.sortHandleOpen = !1, this.disconnectObserver(), s.prepend(i), O(i), this.updateListItems(), this.connectObserver(), this.calciteListOrderChange.emit({
        dragEl: i,
        fromEl: l,
        toEl: s,
        newIndex: r,
        oldIndex: a
      });
    }
  }
  handleReorder(t) {
    const { reorder: e } = t.detail, i = t.target, l = i?.parentElement;
    if (!l)
      return;
    i.sortHandleOpen = !1;
    const s = Array.from(l.children).filter(F), n = s.length - 1, a = s.indexOf(i);
    let r = a;
    switch (e) {
      case "top":
        r = 0;
        break;
      case "bottom":
        r = n;
        break;
      case "up":
        r = a === 0 ? 0 : a - 1;
        break;
      case "down":
        r = a === n ? n : a + 1;
        break;
    }
    this.disconnectObserver();
    const c = e === "up" || e === "top" ? s[r] : s[r].nextSibling;
    l.insertBefore(i, c), this.updateListItems(), this.connectObserver(), this.calciteListOrderChange.emit({
      dragEl: i,
      fromEl: l,
      toEl: l,
      newIndex: r,
      oldIndex: a
    });
  }
  render() {
    const { loading: t, label: e, disabled: i, dataForFilter: l, filterEnabled: s, filterPlaceholder: n, filterText: a, filterLabel: r, hasFilterActionsStart: c, hasFilterActionsEnd: m, effectiveFilterProps: o } = this;
    return k({ disabled: this.disabled, children: d`<div class=${h(f.container)}>${this.dragEnabled ? d`<span aria-live=assertive class=${h(f.assistiveText)}>${this.assistiveText}</span>` : null}${this.renderItemAriaLive()}${t ? d`<calcite-scrim class=${h(f.scrim)} .loading=${t}></calcite-scrim>` : null}<div .ariaBusy=${t} .ariaLabel=${e || ""} class=${h(f.table)} @keydown=${this.handleListKeydown} role=treegrid>${s || c || m ? d`<div class=${h(f.sticky)} role=rowgroup><div role=row><div role=columnheader><calcite-stack class=${h(f.stack)}><slot name=${v.filterActionsStart} @slotchange=${this.handleFilterActionsStartSlotChange} slot=${C.actionsStart}></slot><calcite-filter .ariaLabel=${n} .disabled=${i} .filterProps=${o} .items=${l} .label=${r} @calciteFilterChange=${this.handleFilterChange} .placeholder=${n} .scale=${this.scale} .value=${a} ${S(this.setFilterEl)}></calcite-filter><slot name=${v.filterActionsEnd} @slotchange=${this.handleFilterActionsEndSlotChange} slot=${C.actionsEnd}></slot></calcite-stack></div></div></div>` : null}<div class=${h(f.tableContainer)} role=rowgroup><slot @slotchange=${this.handleDefaultSlotChange} ${S(this.setDefaultSlotEl)}></slot></div></div><div aria-live=polite data-test-id=no-results-container .hidden=${!this.showNoResultsContainer}><slot name=${v.filterNoResults} @slotchange=${this.handleFilterNoResultsSlotChange}></slot></div></div>` });
  }
  renderItemAriaLive() {
    const { messages: t, filteredItems: e, parentListEl: i, messages: { _lang: l }, numberingSystem: s } = this;
    return x.numberFormatOptions = {
      locale: l,
      numberingSystem: s
    }, i ? null : d`<div aria-live=polite class=${h(f.assistiveText)}>${this.hasActiveFilter ? I("aria-filter-enabled", d`<div>${t.filterEnabled}</div>`) : null}${I("aria-item-count", d`<div>${t.total.replace("{count}", x.localize(e.length.toString()))}</div>`)}${e.length ? I("aria-item-list", d`<ol>${e.map((n) => d`<li>${n.label}</li>`)}</ol>`) : null}</div>`;
  }
}
y("calcite-list", W);
export {
  W as List
};
