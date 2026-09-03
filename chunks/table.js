/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as P, L as H, c as f, s as c, A as F, b as n, S as I, d as E } from "./index.js";
import { e as p, n as h } from "./ref.js";
import { n as C } from "./locale.js";
import { u as M } from "./useT9n.js";
import { i as U } from "./resources29.js";
import { i as v } from "./component.js";
import { c as L } from "./observers.js";
function B() {
  return navigator.userAgentData;
}
function D() {
  const u = B();
  return u?.brands ? u.brands.map(({ brand: e, version: t }) => `${e}/${t}`).join(" ") : navigator.userAgent;
}
const l = {
  bordered: "bordered",
  striped: "striped",
  selectionArea: "selection-area",
  paginationArea: "pagination-area",
  container: "container",
  tableContainer: "table-container",
  tableContainerOverflow: "table-container--overflow",
  tableFixed: "table--fixed",
  assistiveText: "assistive-text",
  selectionActions: "selection-actions",
  dismissButton: "dismiss-button",
  selectionChipActive: "selection-chip--active",
  selectionCountChip: "selection-chip",
  selectionOutOfViewChip: "selection-chip--out-of-view"
}, m = {
  selectionActions: "selection-actions",
  tableHeader: "table-header",
  tableFooter: "table-footer"
}, $ = {
  hideEmpty: "hide-empty",
  clear: "x"
}, N = P`@charset "UTF-8";:host{display:flex;--calcite-internal-table-border-collapse: collapse}:host([scale=s]){--calcite-internal-table-cell-padding: .25rem;--calcite-internal-table-cell-font-size: var(--calcite-font-size--2);--calcite-internal-table-cell-font-size-secondary: var(--calcite-font-size--3)}:host([scale=m]){--calcite-internal-table-cell-padding: .5rem;--calcite-internal-table-cell-font-size: var(--calcite-font-size--1);--calcite-internal-table-cell-font-size-secondary: var(--calcite-font-size--2)}:host(:is([scale=s],[scale=m])){--calcite-internal-table-selection-action-spacing: var(--calcite-spacing-xxs)}:host([scale=l]){--calcite-internal-table-selection-action-spacing: var(--calcite-spacing-xs);--calcite-internal-table-cell-padding: 1rem;--calcite-internal-table-cell-font-size: var(--calcite-font-size-0);--calcite-internal-table-cell-font-size-secondary: var(--calcite-font-size--1)}:host([sticky-header]){--calcite-internal-table-border-collapse: separate;--calcite-internal-table-header-border-block-end-width: 0;--calcite-internal-table-sticky-header-border-shadow: inset 0 calc(-1 * var(--calcite-border-width-sm)) 0 0 var(--calcite-table-header-border-color, var(--calcite-table-border-color, var(--calcite-color-border-2)))}:host([sticky-header]) .table-container{position:relative}.container{display:flex;flex-direction:column;inline-size:var(--calcite-container-size-content-fluid);block-size:var(--calcite-container-size-content-fluid)}.table-container{white-space:nowrap;line-height:var(--calcite-font-line-height-relative-tight);border:var(--calcite-border-width-sm) solid var(--calcite-table-border-color, var(--calcite-color-border-2));border-radius:var(--calcite-table-corner-radius, var(--calcite-corner-radius-sharp));box-shadow:var(--calcite-table-shadow, var(--calcite-shadow-none));overflow:auto}.table-container--overflow{overscroll-behavior-y:none}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}table{border-collapse:var(--calcite-internal-table-border-collapse);border-spacing:0;inline-size:var(--calcite-container-size-content-fluid)}@-moz-document url-prefix(){table{border-collapse:separate;border-spacing:0}}.table--fixed{table-layout:fixed}.bordered ::slotted(calcite-table-row){--calcite-table-row-border-color: var(--calcite-table-border-color, var(--calcite-color-border-2))}.striped ::slotted(calcite-table-row:nth-child(2n+1)){--calcite-table-row-background-color: var( --calcite-table-row-background-color-striped, var(--calcite-color-foreground-2) )}.selection-actions{display:flex;flex-direction:row;gap:var(--calcite-internal-table-selection-action-spacing);margin-inline-start:auto}.selection-area{display:flex;flex-direction:row;align-items:center;padding-block:var(--calcite-internal-table-cell-padding)}.selection-area calcite-chip:last-of-type{margin-inline-end:.5rem}.selection-area calcite-chip:last-of-type:not(:first-of-type){margin-inline-start:.5rem}.selection-area calcite-button{margin-inline-end:1rem}.selection-chip{--calcite-chip-background-color: var(--calcite-table-selection-chip-background-color);--calcite-chip-border-color: var(--calcite-table-selection-chip-border-color);--calcite-chip-corner-radius: var(--calcite-table-selection-chip-corner-radius);--calcite-chip-shadow: var(--calcite-table-selection-chip-shadow);--calcite-chip-text-color: var(--calcite-table-selection-chip-text-color)}.selection-chip.selection-chip--active{--calcite-chip-background-color: var(--calcite-table-selection-chip-background-color-selected);--calcite-chip-border-color: var(--calcite-table-selection-chip-border-color-selected);--calcite-chip-text-color: var(--calcite-table-selection-chip-text-color-selected)}.selection-chip--out-of-view{--calcite-chip-background-color: var(--calcite-table-selection-out-of-view-chip-background-color);--calcite-chip-border-color: var(--calcite-table-selection-out-of-view-chip-border-color);--calcite-chip-corner-radius: var(--calcite-table-selection-out-of-view-chip-corner-radius);--calcite-chip-shadow: var(--calcite-table-selection-out-of-view-chip-shadow);--calcite-chip-text-color: var(--calcite-table-selection-out-of-view-chip-text-color);--calcite-chip-icon-color: var(--calcite-table-selection-out-of-view-chip-icon-color)}.pagination-area{display:flex;inline-size:100%;flex-direction:row;justify-content:center;padding-block:var(--calcite-internal-table-cell-padding)}calcite-pagination{flex:1;justify-content:center;--calcite-pagination-color: var(--calcite-table-pagination-color);--calcite-pagination-color-hover: var(--calcite-table-pagination-color-hover);--calcite-pagination-color-border-hover: var(--calcite-table-pagination-color-border-hover);--calcite-pagination-color-border-active: var(--calcite-table-pagination-color-border-active);--calcite-pagination-background-color: var(--calcite-table-pagination-background-color);--calcite-pagination-icon-color-background-hover: var(--calcite-table-pagination-icon-color-background-hover)}.dismiss-button{margin-inline-end:1rem;--calcite-button-background-color: var(--calcite-table-selection-dismiss-button-background-color);--calcite-button-border-color: var(--calcite-table-selection-dismiss-button-border-color);--calcite-button-corner-radius: var(--calcite-table-selection-dismiss-button-corner-radius);--calcite-button-shadow: var(--calcite-table-selection-dismiss-button-shadow);--calcite-button-text-color: var(--calcite-table-selection-dismiss-button-text-color)}.dismiss-button:hover{--calcite-button-background-color: var(--calcite-table-selection-dismiss-button-background-color-hover);--calcite-button-border-color: var(--calcite-table-selection-dismiss-button-border-color-hover);--calcite-button-text-color: var(--calcite-table-selection-dismiss-button-text-color-hover)}.dismiss-button:active{--calcite-button-background-color: var(--calcite-table-selection-dismiss-button-background-color-active);--calcite-button-border-color: var(--calcite-table-selection-dismiss-button-border-color-active);--calcite-button-text-color: var(--calcite-table-selection-dismiss-button-text-color-active)}:host([hidden]){display:none}[hidden]{display:none}`;
class V extends H {
  constructor() {
    super(), this.allRows = [], this.bodyRows = [], this.footRows = [], this.headRows = [], this.paginationRef = p(), this.tableContainerRef = p(), this.tableEl = null, this.tableBodySlotRef = p(), this.tableFootSlotRef = p(), this.tableHeadSlotRef = p(), this.tableContainerOverflowAnimationFrame = null, this.tableContainerResizeObserver = L("resize", () => this.scheduleTableContainerOverflowUpdate()), this.messages = M({ blocking: !0 }), this.colCount = 0, this.pageStartRow = 1, this.readCellContentsToAT = !1, this.selectedCount = 0, this.tableContainerHasOverflow = !1, this._selectedItems = [], this.bordered = !1, this.currentPage = 0, this.groupSeparator = !1, this.interactionMode = "interactive", this.layout = "auto", this.numbered = !1, this.pageSize = 0, this.scale = "m", this.selectionDisplay = "top", this.selectionMode = "none", this.striped = !1, this.stickyHeader = !1, this.calciteInternalTableRowFocusChange = f({ cancelable: !1 }), this.calciteTablePageChange = f({ cancelable: !1 }), this.calciteTableSelect = f({ cancelable: !1 }), this.listen("calciteTableRowSelect", this.calciteTableRowSelectListener), this.listen("calciteInternalTableRowSelect", this.calciteInternalTableRowSelectListener), this.listen("calciteInternalTableRowFocusRequest", this.calciteInternalTableRowFocusEvent);
  }
  static {
    this.properties = { colCount: 16, pageStartRow: 16, readCellContentsToAT: 16, selectedCount: 16, tableContainerHasOverflow: 16, _selectedItems: 16, bordered: 7, caption: 1, currentPage: 11, groupSeparator: 7, interactionMode: 3, layout: 3, messageOverrides: 0, numbered: 7, numberingSystem: 3, pageSize: 11, scale: 3, selectedItems: 32, selectionDisplay: 3, selectionMode: 3, striped: 7, stickyHeader: 7 };
  }
  static {
    this.styles = N;
  }
  get selectedItems() {
    return this._selectedItems;
  }
  async load() {
    this.readCellContentsToAT = /safari/i.test(D()), this.listenOn(this.el.shadowRoot, "slotchange", this.handleSlotChange);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.tableContainerOverflowAnimationFrame !== null && (cancelAnimationFrame(this.tableContainerOverflowAnimationFrame), this.tableContainerOverflowAnimationFrame = null), this.tableContainerResizeObserver?.disconnect();
  }
  willUpdate(e) {
    (e.has("groupSeparator") && (this.hasUpdated || this.groupSeparator !== !1) || e.has("interactionMode") && (this.hasUpdated || this.interactionMode !== "interactive") || e.has("numbered") && (this.hasUpdated || this.numbered !== !1) || e.has("numberingSystem") || e.has("pageSize") && (this.hasUpdated || this.pageSize !== 0) || e.has("scale") && (this.hasUpdated || this.scale !== "m") || e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") || e.has("currentPage") && (this.hasUpdated || this.currentPage > 1) && this.pageSize > 0) && this.updateRows(), e.has("stickyHeader") && (this.hasUpdated || this.stickyHeader !== !1) && (this.allRows?.forEach((t) => {
      t.stickyHeaderEnabled = this.stickyHeader;
    }), this.stickyHeader ? this.applyHeaderRowPositionStyles() : this.resetStickyHeaderState());
  }
  handleSlotChange() {
    this.updateRows();
  }
  clearStickyHeaderRowStyles() {
    this.headRows?.forEach((e) => {
      e.style.removeProperty("--calcite-internal-table-header-offset"), e.style.removeProperty("--calcite-internal-table-header-z-index"), e.style.removeProperty("--calcite-internal-table-header-row-position");
    });
  }
  resetStickyHeaderState() {
    this.clearStickyHeaderRowStyles();
  }
  calciteTableRowSelectListener(e) {
    e.composedPath().includes(this.el) && this.setSelectedItems(e.target);
  }
  calciteInternalTableRowSelectListener(e) {
    e.composedPath().includes(this.el) && (this.updateSelectedItems(!1), e.stopPropagation());
  }
  calciteInternalTableRowFocusEvent(e) {
    const t = e.detail.cellPosition, a = e.detail.rowPosition, o = e.detail.destination, r = e.detail.lastCell, i = this.bodyRows?.filter((b) => !v(b)), s = this.allRows?.filter((b) => !v(b)), w = this.headRows[this.headRows.length - 1]?.positionAll, R = i[0]?.positionAll, S = i[i.length - 1]?.positionAll, y = this.footRows[0]?.positionAll, z = s[s.length - 1]?.positionAll, x = o === "next" && a === w, k = o === "previous" && a === y, T = o === "previous" && a === R, A = o === "next" && a === S;
    let d;
    switch (o) {
      case "first":
        d = 0;
        break;
      case "last":
        d = z;
        break;
      case "next":
        d = x ? R : A ? y : a + 1;
        break;
      case "previous":
        d = k ? S : T ? w : a - 1;
        break;
    }
    const g = this.allRows.find((b) => b.positionAll === d)?.cellCount, O = g && t > g ? g : t;
    d !== void 0 && this.calciteInternalTableRowFocusChange.emit({
      cellPosition: O,
      rowPosition: d,
      destination: o,
      lastCell: r
    });
  }
  getSlottedRows(e) {
    return e ? e.assignedElements({ flatten: !0 }).filter(U) : [];
  }
  observeTableContainer() {
    this.tableContainerResizeObserver?.disconnect();
    const e = this.tableContainerRef.value, t = this.tableEl;
    e && this.tableContainerResizeObserver?.observe(e), t && this.tableContainerResizeObserver?.observe(t);
  }
  scheduleTableContainerOverflowUpdate() {
    this.tableContainerOverflowAnimationFrame !== null && cancelAnimationFrame(this.tableContainerOverflowAnimationFrame), this.tableContainerOverflowAnimationFrame = requestAnimationFrame(() => {
      this.tableContainerOverflowAnimationFrame = null, this.updateTableContainerOverflow();
    });
  }
  applyHeaderRowPositionStyles() {
    this.clearStickyHeaderRowStyles();
    const e = this.headRows?.[0];
    e && (e.style.setProperty("--calcite-internal-table-header-offset", "0"), e.style.setProperty("--calcite-internal-table-header-z-index", "2"), e.style.setProperty("--calcite-internal-table-header-row-position", this.stickyHeader ? "sticky" : "static"));
  }
  updateTableContainerOverflow() {
    const e = this.tableContainerRef.value;
    this.tableContainerHasOverflow = !!e && (e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth);
  }
  updateRows() {
    const e = this.getSlottedRows(this.tableHeadSlotRef.value), t = this.getSlottedRows(this.tableBodySlotRef.value), a = this.getSlottedRows(this.tableFootSlotRef.value), o = [...e, ...t, ...a];
    e.forEach((i) => {
      const s = e.indexOf(i);
      i.rowType = "head", i.positionSection = s, i.positionSectionLocalized = this.localizeNumber((s + 1).toString());
    }), t.forEach((i) => {
      const s = t.indexOf(i);
      i.rowType = "body", i.positionSection = s, i.positionSectionLocalized = this.localizeNumber((s + 1).toString());
    }), a.forEach((i) => {
      const s = a.indexOf(i);
      i.rowType = "foot", i.positionSection = s, i.positionSectionLocalized = this.localizeNumber((s + 1).toString());
    }), o.forEach((i) => {
      i.interactionMode = this.interactionMode, i.selectionMode = this.selectionMode, i.bodyRowCount = t?.length, i.positionAll = o?.indexOf(i), i.numbered = this.numbered, i.scale = this.scale, i.readCellContentsToAT = this.readCellContentsToAT, i.lastVisibleRow = o?.indexOf(i) === o.length - 1;
    });
    const r = e[0]?.cellCount || 0;
    this.colCount = r, this.headRows = e, this.bodyRows = t, this.footRows = a, this.allRows = o, this.applyHeaderRowPositionStyles(), this.observeTableContainer(), this.scheduleTableContainerOverflowUpdate(), this.handleCurrentPageRange(), this.updateSelectedItems();
  }
  handleCurrentPageRange() {
    const e = this.currentPage, t = this.bodyRows?.length || 0, a = this.pageSize > 0 ? Math.ceil(t / this.pageSize) : 1;
    if (a > 0) {
      const o = Math.min(Math.max(e, 1), a);
      this.currentPage = o, this.pageStartRow = (o - 1) * this.pageSize + 1;
    }
    this.paginateRows();
  }
  handlePaginationChange() {
    const e = this.paginationRef.value?.startItem;
    this.pageStartRow = e || 1, this.currentPage = Math.ceil(this.pageStartRow / this.pageSize), this.calciteTablePageChange.emit(), this.updateRows();
  }
  paginateRows() {
    this.bodyRows?.forEach((e) => {
      const t = e.positionSection + 1, a = t >= this.pageStartRow && t < this.pageStartRow + this.pageSize;
      e.itemHidden = this.pageSize > 0 && !a && !this.footRows.includes(e), e.lastVisibleRow = t === this.pageStartRow + this.pageSize - 1 || t === this.bodyRows.length;
    });
  }
  async updateSelectedItems(e) {
    const t = this.bodyRows?.filter((a) => a.selected);
    this._selectedItems = t, this.selectedCount = t?.length, this.allRows?.forEach((a) => {
      a.selectedRowCount = this.selectedCount, a.selectedRowCountLocalized = this.localizeNumber(this.selectedCount);
    }), e && this.calciteTableSelect.emit();
  }
  handleDeselectAllRows() {
    this.bodyRows?.forEach((e) => {
      e.selected = !1;
    }), this.updateSelectedItems(!0);
  }
  setSelectedItems(e) {
    this.bodyRows?.forEach((t) => {
      e?.rowType === "head" ? t.selected = this.selectedCount !== this.bodyRows?.length : t.selected = this.selectionMode === "multiple" || e === t ? t.selected : !1;
    }), this.updateSelectedItems(!0);
  }
  localizeNumber(e) {
    return C.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, C.localize(e.toString());
  }
  renderSelectionArea() {
    const e = this._selectedItems?.filter((i) => v(i))?.length, t = this.localizeNumber(e?.toString()), o = `${this.localizeNumber(this.selectedCount?.toString())} ${this.messages.selected}`, r = `${t} ${this.messages.hiddenSelected}`;
    return n`<div class=${c(l.selectionArea)}><calcite-chip class=${c({
      [l.selectionCountChip]: !0,
      [l.selectionChipActive]: this.selectedCount > 0
    })} .kind=${this.selectedCount > 0 ? "brand" : "neutral"} .label=${o} .scale=${this.scale} .value=${o}>${o}</calcite-chip>${e > 0 && n`<calcite-chip class=${c(l.selectionOutOfViewChip)} .icon=${$.hideEmpty} .label=${r} .scale=${this.scale} title=${r ?? F} .value=${r}>${t}</calcite-chip>` || ""}${this.selectedCount > 0 && n`<calcite-button class=${c(l.dismissButton)} .iconStart=${$.clear} kind=neutral @click=${this.handleDeselectAllRows} round .scale=${this.scale} .title=${`${this.messages.clear} ${o} ${this.messages.row}`}>${this.messages.clear}</calcite-button>` || ""}<div class=${c(l.selectionActions)}><slot name=${m.selectionActions}></slot></div></div>`;
  }
  renderPaginationArea() {
    return n`<div class=${c(l.paginationArea)}><calcite-pagination .groupSeparator=${this.groupSeparator} .numberingSystem=${this.numberingSystem} @calcitePaginationChange=${this.handlePaginationChange} .pageSize=${this.pageSize} .scale=${this.scale} .startItem=${this.pageStartRow} .totalItems=${this.bodyRows?.length} ${h(this.paginationRef)}></calcite-pagination></div>`;
  }
  renderTHead() {
    return n`<thead><slot name=${m.tableHeader} ${h(this.tableHeadSlotRef)}></slot></thead>`;
  }
  renderTBody() {
    return n`<tbody><slot ${h(this.tableBodySlotRef)}></slot></tbody>`;
  }
  renderTFoot() {
    return n`<tfoot><slot name=${m.tableFooter} ${h(this.tableFootSlotRef)}></slot></tfoot>`;
  }
  render() {
    return n`<div class=${c(l.container)}>${this.selectionMode !== "none" && this.selectionDisplay !== "none" && this.renderSelectionArea() || ""}<div class=${c({
      [l.bordered]: this.bordered,
      [l.striped]: this.striped,
      [l.tableContainer]: !0,
      [l.tableContainerOverflow]: this.tableContainerHasOverflow
    })} ${h(this.tableContainerRef)}><table .ariaColCount=${this.colCount} .ariaMultiSelectable=${/* workaround to ensure the attr gets removed; we should be able to avoid the ternary when fixed */
    this.selectionMode === "multiple" ? "true" : void 0} .ariaRowCount=${this.allRows?.length} class=${c({ [l.tableFixed]: this.layout === "fixed" })} .role=${this.interactionMode === "interactive" ? "grid" : "table"} ${h((e) => {
      e && (this.tableEl = e, I(n`<caption class=${c(l.assistiveText)}>${this.caption}</caption>${this.renderTHead()}${this.renderTBody()}${this.renderTFoot()}`, e));
    })}></table></div>${this.pageSize > 0 && this.renderPaginationArea() || ""}</div>`;
  }
}
E("calcite-table", V);
export {
  V as Table
};
