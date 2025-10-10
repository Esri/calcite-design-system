import { b as P, L as M, c as g, s, E as F, x as n, I as O, q as E } from "./index.js";
import { e as u, n as b } from "./ref.js";
import { n as $ } from "./locale.js";
import { u as H } from "./useT9n.js";
import { i as f } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function B() {
  return navigator.userAgentData;
}
function L() {
  const p = B();
  return p?.brands ? p.brands.map(({ brand: e, version: i }) => `${e}/${i}`).join(" ") : navigator.userAgent;
}
const l = {
  bordered: "bordered",
  striped: "striped",
  selectionArea: "selection-area",
  paginationArea: "pagination-area",
  container: "container",
  tableContainer: "table-container",
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
}, C = {
  hideEmpty: "hide-empty",
  clear: "x"
}, U = P`@charset "UTF-8";:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([scale=s]){--calcite-internal-table-cell-padding: .25rem;--calcite-internal-table-cell-font-size: var(--calcite-font-size--2);--calcite-internal-table-cell-font-size-secondary: var(--calcite-font-size--3)}:host([scale=m]){--calcite-internal-table-cell-padding: .5rem;--calcite-internal-table-cell-font-size: var(--calcite-font-size--1);--calcite-internal-table-cell-font-size-secondary: var(--calcite-font-size--2)}:host([scale=l]){--calcite-internal-table-cell-padding: 1rem;--calcite-internal-table-cell-font-size: var(--calcite-font-size-0);--calcite-internal-table-cell-font-size-secondary: var(--calcite-font-size--1)}:host{display:flex}.container{display:flex;flex-direction:column;inline-size:var(--calcite-container-size-content-fluid);block-size:var(--calcite-container-size-content-fluid)}.table-container{overflow:auto;white-space:nowrap;border:var(--calcite-border-width-sm) solid var(--calcite-table-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-table-corner-radius, var(--calcite-corner-radius-sharp));box-shadow:var(--calcite-table-shadow, var(--calcite-shadow-none))}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}table{border-collapse:collapse;overflow-x:scroll;inline-size:var(--calcite-container-size-content-fluid)}@-moz-document url-prefix(){table{border-collapse:separate;border-spacing:0}}.table--fixed{table-layout:fixed}.bordered ::slotted(calcite-table-row){--calcite-table-row-border-color: var(--calcite-table-border-color, var(--calcite-color-border-3))}.striped ::slotted(calcite-table-row:nth-child(2n+1)){--calcite-table-row-background-color: var( --calcite-table-row-background-color-striped, var(--calcite-color-foreground-2) )}.selection-actions{display:flex;flex-direction:row;margin-inline-start:auto}.selection-area{display:flex;flex-direction:row;align-items:center;padding-block:var(--calcite-internal-table-cell-padding)}.selection-area calcite-chip:last-of-type{margin-inline-end:.5rem}.selection-area calcite-chip:last-of-type:not(:first-of-type){margin-inline-start:.5rem}.selection-area calcite-button{margin-inline-end:1rem}.selection-chip{--calcite-chip-background-color: var(--calcite-table-selection-chip-background-color);--calcite-chip-border-color: var(--calcite-table-selection-chip-border-color);--calcite-chip-corner-radius: var(--calcite-table-selection-chip-corner-radius);--calcite-chip-shadow: var(--calcite-table-selection-chip-shadow);--calcite-chip-text-color: var(--calcite-table-selection-chip-text-color)}.selection-chip.selection-chip--active{--calcite-chip-background-color: var(--calcite-table-selection-chip-background-color-selected);--calcite-chip-border-color: var(--calcite-table-selection-chip-border-color-selected);--calcite-chip-text-color: var(--calcite-table-selection-chip-text-color-selected)}.selection-chip--out-of-view{--calcite-chip-background-color: var(--calcite-table-selection-out-of-view-chip-background-color);--calcite-chip-border-color: var(--calcite-table-selection-out-of-view-chip-border-color);--calcite-chip-corner-radius: var(--calcite-table-selection-out-of-view-chip-corner-radius);--calcite-chip-shadow: var(--calcite-table-selection-out-of-view-chip-shadow);--calcite-chip-text-color: var(--calcite-table-selection-out-of-view-chip-text-color);--calcite-chip-icon-color: var(--calcite-table-selection-out-of-view-chip-icon-color)}.pagination-area{display:flex;inline-size:100%;flex-direction:row;justify-content:center;padding-block:var(--calcite-internal-table-cell-padding)}calcite-pagination{flex:1;justify-content:center;--calcite-pagination-color: var(--calcite-table-pagination-color);--calcite-pagination-color-hover: var(--calcite-table-pagination-color-hover);--calcite-pagination-color-border-hover: var(--calcite-table-pagination-color-border-hover);--calcite-pagination-color-border-active: var(--calcite-table-pagination-color-border-active);--calcite-pagination-background-color: var(--calcite-table-pagination-background-color);--calcite-pagination-icon-color-background-hover: var(--calcite-table-pagination-icon-color-background-hover)}.dismiss-button{margin-inline-end:1rem;--calcite-button-background-color: var(--calcite-table-selection-dismiss-button-background-color);--calcite-button-border-color: var(--calcite-table-selection-dismiss-button-border-color);--calcite-button-corner-radius: var(--calcite-table-selection-dismiss-button-corner-radius);--calcite-button-shadow: var(--calcite-table-selection-dismiss-button-shadow);--calcite-button-text-color: var(--calcite-table-selection-dismiss-button-text-color)}.dismiss-button:hover{--calcite-button-background-color: var(--calcite-table-selection-dismiss-button-background-color-hover);--calcite-button-border-color: var(--calcite-table-selection-dismiss-button-border-color-hover);--calcite-button-text-color: var(--calcite-table-selection-dismiss-button-text-color-hover)}.dismiss-button:active{--calcite-button-background-color: var(--calcite-table-selection-dismiss-button-background-color-active);--calcite-button-border-color: var(--calcite-table-selection-dismiss-button-border-color-active);--calcite-button-text-color: var(--calcite-table-selection-dismiss-button-text-color-active)}:host([hidden]){display:none}[hidden]{display:none}`;
class D extends M {
  constructor() {
    super(), this.paginationRef = u(), this.tableBodySlotRef = u(), this.tableFootSlotRef = u(), this.tableHeadSlotRef = u(), this.messages = H({ blocking: !0 }), this.colCount = 0, this.pageStartRow = 1, this.selectedCount = 0, this._selectedItems = [], this.bordered = !1, this.currentPage = 0, this.groupSeparator = !1, this.interactionMode = "interactive", this.layout = "auto", this.numbered = !1, this.pageSize = 0, this.scale = "m", this.selectionDisplay = "top", this.selectionMode = "none", this.striped = !1, this.calciteInternalTableRowFocusChange = g({ cancelable: !1 }), this.calciteTablePageChange = g({ cancelable: !1 }), this.calciteTableSelect = g({ cancelable: !1 }), this.listen("calciteTableRowSelect", this.calciteTableRowSelectListener), this.listen("calciteInternalTableRowSelect", this.calciteInternalTableRowSelectListener), this.listen("calciteInternalTableRowFocusRequest", this.calciteInternalTableRowFocusEvent);
  }
  static {
    this.properties = { colCount: 16, pageStartRow: 16, readCellContentsToAT: 16, selectedCount: 16, _selectedItems: 16, bordered: 7, caption: 1, currentPage: 11, groupSeparator: 7, interactionMode: 3, layout: 3, messageOverrides: 0, numbered: 7, numberingSystem: 3, pageSize: 11, scale: 3, selectedItems: 32, selectionDisplay: 3, selectionMode: 3, striped: 7 };
  }
  static {
    this.styles = U;
  }
  get selectedItems() {
    return this._selectedItems;
  }
  async load() {
    this.readCellContentsToAT = /safari/i.test(L()), this.listenOn(this.el.shadowRoot, "slotchange", this.handleSlotChange);
  }
  willUpdate(e) {
    (e.has("groupSeparator") && (this.hasUpdated || this.groupSeparator !== !1) || e.has("interactionMode") && (this.hasUpdated || this.interactionMode !== "interactive") || e.has("numbered") && (this.hasUpdated || this.numbered !== !1) || e.has("numberingSystem") || e.has("pageSize") && (this.hasUpdated || this.pageSize !== 0) || e.has("scale") && (this.hasUpdated || this.scale !== "m") || e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") || e.has("currentPage") && (this.hasUpdated || this.currentPage > 1) && this.pageSize > 0) && this.updateRows();
  }
  handleSlotChange() {
    this.updateRows();
  }
  calciteTableRowSelectListener(e) {
    e.composedPath().includes(this.el) && this.setSelectedItems(e.target);
  }
  calciteInternalTableRowSelectListener(e) {
    e.composedPath().includes(this.el) && (this.updateSelectedItems(!1), e.stopPropagation());
  }
  calciteInternalTableRowFocusEvent(e) {
    const i = e.detail.cellPosition, o = e.detail.rowPosition, a = e.detail.destination, r = e.detail.lastCell, t = this.bodyRows?.filter((h) => !f(h)), c = this.allRows?.filter((h) => !f(h)), v = this.headRows[this.headRows.length - 1]?.positionAll, w = t[0]?.positionAll, S = t[t.length - 1]?.positionAll, R = this.footRows[0]?.positionAll, x = c[c.length - 1]?.positionAll, z = a === "next" && o === v, T = a === "previous" && o === R, A = a === "previous" && o === w, k = a === "next" && o === S;
    let d;
    switch (a) {
      case "first":
        d = 0;
        break;
      case "last":
        d = x;
        break;
      case "next":
        d = z ? w : k ? R : o + 1;
        break;
      case "previous":
        d = T ? S : A ? v : o - 1;
        break;
    }
    const y = this.allRows?.find((h) => h.positionAll === d)?.cellCount, I = i > y ? y : i;
    d !== void 0 && this.calciteInternalTableRowFocusChange.emit({
      cellPosition: I,
      rowPosition: d,
      destination: a,
      lastCell: r
    });
  }
  getSlottedRows(e) {
    return e?.assignedElements({ flatten: !0 })?.filter((i) => i?.matches("calcite-table-row"));
  }
  updateRows() {
    const e = this.getSlottedRows(this.tableHeadSlotRef.value) || [], i = this.getSlottedRows(this.tableBodySlotRef.value) || [], o = this.getSlottedRows(this.tableFootSlotRef.value) || [], a = [...e, ...i, ...o];
    e?.forEach((t) => {
      const c = e?.indexOf(t);
      t.rowType = "head", t.positionSection = c, t.positionSectionLocalized = this.localizeNumber((c + 1).toString());
    }), i?.forEach((t) => {
      const c = i?.indexOf(t);
      t.rowType = "body", t.positionSection = c, t.positionSectionLocalized = this.localizeNumber((c + 1).toString());
    }), o?.forEach((t) => {
      const c = o?.indexOf(t);
      t.rowType = "foot", t.positionSection = c, t.positionSectionLocalized = this.localizeNumber((c + 1).toString());
    }), a?.forEach((t) => {
      t.interactionMode = this.interactionMode, t.selectionMode = this.selectionMode, t.bodyRowCount = i?.length, t.positionAll = a?.indexOf(t), t.numbered = this.numbered, t.scale = this.scale, t.readCellContentsToAT = this.readCellContentsToAT, t.lastVisibleRow = a?.indexOf(t) === a.length - 1;
    });
    const r = e[0]?.cellCount || e[0]?.querySelectorAll("calcite-table-header")?.length;
    this.colCount = r, this.headRows = e, this.bodyRows = i, this.footRows = o, this.allRows = a, this.handleCurrentPageRange(), this.updateSelectedItems();
  }
  handleCurrentPageRange() {
    const e = this.currentPage, i = this.bodyRows?.length || 0, o = this.pageSize > 0 ? Math.ceil(i / this.pageSize) : 1;
    if (o > 0) {
      const a = Math.min(Math.max(e, 1), o);
      this.currentPage = a, this.pageStartRow = (a - 1) * this.pageSize + 1;
    }
    this.paginateRows();
  }
  handlePaginationChange() {
    const e = this.paginationRef.value?.startItem;
    this.pageStartRow = e || 1, this.currentPage = Math.ceil(this.pageStartRow / this.pageSize), this.calciteTablePageChange.emit(), this.updateRows();
  }
  paginateRows() {
    this.bodyRows?.forEach((e) => {
      const i = e.positionSection + 1, o = i >= this.pageStartRow && i < this.pageStartRow + this.pageSize;
      e.itemHidden = this.pageSize > 0 && !o && !this.footRows.includes(e), e.lastVisibleRow = i === this.pageStartRow + this.pageSize - 1 || i === this.bodyRows.length;
    });
  }
  async updateSelectedItems(e) {
    const i = this.bodyRows?.filter((o) => o.selected);
    this._selectedItems = i, this.selectedCount = i?.length, this.allRows?.forEach((o) => {
      o.selectedRowCount = this.selectedCount, o.selectedRowCountLocalized = this.localizeNumber(this.selectedCount);
    }), e && this.calciteTableSelect.emit();
  }
  handleDeselectAllRows() {
    this.bodyRows?.forEach((e) => {
      e.selected = !1;
    }), this.updateSelectedItems(!0);
  }
  setSelectedItems(e) {
    this.bodyRows?.forEach((i) => {
      e?.rowType === "head" ? i.selected = this.selectedCount !== this.bodyRows?.length : i.selected = this.selectionMode === "multiple" || e === i ? i.selected : !1;
    }), this.updateSelectedItems(!0);
  }
  localizeNumber(e) {
    return $.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, $.localize(e.toString());
  }
  renderSelectionArea() {
    const e = this._selectedItems?.filter((t) => f(t))?.length, i = this.localizeNumber(e?.toString()), a = `${this.localizeNumber(this.selectedCount?.toString())} ${this.messages.selected}`, r = `${i} ${this.messages.hiddenSelected}`;
    return n`<div class=${s(l.selectionArea)}><calcite-chip class=${s({
      [l.selectionCountChip]: !0,
      [l.selectionChipActive]: this.selectedCount > 0
    })} .kind=${this.selectedCount > 0 ? "brand" : "neutral"} .label=${a} .scale=${this.scale} .value=${a}>${a}</calcite-chip>${e > 0 && n`<calcite-chip class=${s(l.selectionOutOfViewChip)} .icon=${C.hideEmpty} .label=${r} .scale=${this.scale} title=${r ?? F} .value=${r}>${i}</calcite-chip>` || ""}${this.selectedCount > 0 && n`<calcite-button class=${s(l.dismissButton)} .iconStart=${C.clear} kind=neutral @click=${this.handleDeselectAllRows} round .scale=${this.scale} .title=${`${this.messages.clear} ${a} ${this.messages.row}`}>${this.messages.clear}</calcite-button>` || ""}<div class=${s(l.selectionActions)}><slot name=${m.selectionActions}></slot></div></div>`;
  }
  renderPaginationArea() {
    return n`<div class=${s(l.paginationArea)}><calcite-pagination .groupSeparator=${this.groupSeparator} .numberingSystem=${this.numberingSystem} @calcitePaginationChange=${this.handlePaginationChange} .pageSize=${this.pageSize} .scale=${this.scale} .startItem=${this.pageStartRow} .totalItems=${this.bodyRows?.length} ${b(this.paginationRef)}></calcite-pagination></div>`;
  }
  renderTHead() {
    return n`<thead><slot name=${m.tableHeader} ${b(this.tableHeadSlotRef)}></slot></thead>`;
  }
  renderTBody() {
    return n`<tbody><slot ${b(this.tableBodySlotRef)}></slot></tbody>`;
  }
  renderTFoot() {
    return n`<tfoot><slot name=${m.tableFooter} ${b(this.tableFootSlotRef)}></slot></tfoot>`;
  }
  render() {
    return n`<div class=${s(l.container)}>${this.selectionMode !== "none" && this.selectionDisplay !== "none" && this.renderSelectionArea() || ""}<div class=${s({
      [l.bordered]: this.bordered,
      [l.striped]: this.striped,
      [l.tableContainer]: !0
    })}><table .ariaColCount=${this.colCount} .ariaMultiSelectable=${/* workaround to ensure the attr gets removed; we should be able to avoid the ternary when fixed */
    this.selectionMode === "multiple" ? "true" : null} .ariaRowCount=${this.allRows?.length} class=${s({ [l.tableFixed]: this.layout === "fixed" })} .role=${this.interactionMode === "interactive" ? "grid" : "table"} ${b((e) => {
      e && O(n`<caption class=${s(l.assistiveText)}>${this.caption}</caption>${this.renderTHead()}${this.renderTBody()}${this.renderTFoot()}`, e);
    })}></table></div>${this.pageSize > 0 && this.renderPaginationArea() || ""}</div>`;
  }
}
E("calcite-table", D);
export {
  D as Table
};
