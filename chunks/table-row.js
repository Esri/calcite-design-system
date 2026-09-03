/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as p, L as f, c as w, b as s, s as m, S as C, d as R } from "./index.js";
import { i as n } from "./keyed.js";
import { e as d, n as o } from "./ref.js";
import { d as h, a as g } from "./dom.js";
import { i as y } from "./key.js";
import { g as T } from "./component.js";
import { i as $ } from "./resources31.js";
import { i as k } from "./resources30.js";
import { u as S } from "./useInteractive.js";
import { I as b, C as A } from "./resources29.js";
const v = p`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:contents}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) tr{pointer-events:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-table-cell{--calcite-internal-table-cell-background-color: var( --calcite-table-row-background-color, var(--calcite-table-row-background, var(--calcite-color-foreground-1)) )}:host([slot=table-header]) tr{position:var(--calcite-internal-table-header-row-position);inset-block-start:var(--calcite-internal-table-header-offset, 0);z-index:var(--calcite-internal-table-header-z-index, calc(var(--calcite-z-index) + 1))}:host([selected]) calcite-table-cell{--calcite-internal-table-cell-background-color: var( --calcite-table-row-background-color-selected, var(--calcite-color-foreground-1) )}tr{--calcite-internal-table-row-border-block-end-width: var(--calcite-border-width-sm);--calcite-internal-table-row-border-block-end-color: var(--calcite-table-row-border-color, transparent);background-color:var(--calcite-table-row-background-color, var(--calcite-table-row-background, var(--calcite-color-foreground-1)))}tr.last-visible-row{--calcite-internal-table-row-border-block-end-width: 0;--calcite-internal-table-row-border-block-end-color: transparent}:host([item-hidden]){display:none}`;
class I extends f {
  constructor() {
    super(), this.numberedCellRef = d(), this.numberedHeaderRef = d(), this.rowCells = [], this.rowSlotRef = d(), this.selectionCellRef = d(), this.selectionHeaderRef = d(), this.userTriggered = !1, this._selected = !1, this.clickHandler = () => {
      this.handleRowSelection();
    }, this.handleKeyboardSelection = (e) => {
      y(e.key) && (e.key === " " && e.preventDefault(), this.handleRowSelection());
    }, this.interactiveContainer = S(this), this.itemHidden = !1, this.disabled = !1, this.interactionMode = "interactive", this.lastVisibleRow = !1, this.numbered = !1, this.stickyHeaderEnabled = !1, this.selectionMode = "none", this.calciteInternalTableRowFocusRequest = w({ cancelable: !1 }), this.calciteInternalTableRowSelect = w({ cancelable: !1 }), this.calciteTableRowSelect = w({ cancelable: !1 }), this.listenOn(document, "calciteInternalTableRowFocusChange", this.calciteInternalTableRowFocusChangeHandler);
  }
  static {
    this.properties = { alignment: 3, itemHidden: 7, bodyRowCount: 9, cellCount: 9, disabled: 7, interactionMode: 1, lastVisibleRow: 5, numbered: 5, positionAll: 9, positionSection: 9, positionSectionLocalized: 1, readCellContentsToAT: 5, rowType: 1, scale: 1, stickyHeaderEnabled: 5, selected: 7, selectedRowCount: 9, selectedRowCountLocalized: 1, selectionMode: 1 };
  }
  static {
    this.styles = v;
  }
  get selected() {
    return this._selected;
  }
  set selected(e) {
    const l = this._selected;
    e !== l && (this._selected = e, this.handleCellChanges());
  }
  load() {
    this.listenOn(this.el.shadowRoot, "slotchange", this.handleSlotChange);
  }
  willUpdate(e) {
    (e.has("bodyRowCount") || e.has("scale") || e.has("selectedRowCount") || e.has("interactionMode") && (this.hasUpdated || this.interactionMode !== "interactive")) && this.handleCellChanges(), (e.has("numbered") && (this.hasUpdated || this.numbered !== !1) || e.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none")) && this.handleDelayedCellChanges(), e.has("selected") && (this.hasUpdated || this.selected !== !1) && !this.userTriggered && this.calciteInternalTableRowSelect.emit();
  }
  loaded() {
    this.rowCells.length > 0 && this.updateCells();
  }
  handleSlotChange() {
    this.updateCells();
  }
  handleCellChanges() {
    this.rowCells.length > 0 && this.updateCells();
  }
  handleDelayedCellChanges() {
    this.rowCells.length > 0 && requestAnimationFrame(() => this.updateCells());
  }
  calciteInternalTableRowFocusChangeHandler(e) {
    if (e.target.contains(this.el)) {
      const l = e.detail.cellPosition, a = e.detail.rowPosition, i = e.detail.destination, t = e.detail.lastCell;
      if (a === this.positionAll) {
        if (this.disabled) {
          const c = i === "last" ? "previous" : i === "first" ? "next" : i;
          this.emitTableRowFocusRequest(l, this.positionAll, c);
          return;
        }
        const r = t ? this.rowCells[this.rowCells.length - 1] : this.rowCells?.find((c, u) => u + 1 === l);
        r && r.setFocus();
      }
    }
  }
  keyDownHandler(e) {
    if (this.interactionMode !== "interactive")
      return;
    const l = e.target, a = e.key, i = e.ctrlKey, t = this.rowCells;
    if (k(l) || $(l))
      switch (a) {
        case "ArrowUp":
          this.emitTableRowFocusRequest(l.positionInRow, this.positionAll, "previous"), e.preventDefault();
          break;
        case "ArrowDown":
          this.emitTableRowFocusRequest(l.positionInRow, this.positionAll, "next"), e.preventDefault();
          break;
        case "PageUp":
          this.emitTableRowFocusRequest(l.positionInRow, this.positionAll, "first"), e.preventDefault();
          break;
        case "PageDown":
          this.emitTableRowFocusRequest(l.positionInRow, this.positionAll, "last"), e.preventDefault();
          break;
        case "ArrowLeft":
          h(t, l, "previous", !1, !1), e.preventDefault();
          break;
        case "ArrowRight":
          h(t, l, "next", !1, !1), e.preventDefault();
          break;
        case "Home":
          i ? (this.emitTableRowFocusRequest(1, this.positionAll, "first"), e.preventDefault()) : (h(t, l, "first", !1, !1), e.preventDefault());
          break;
        case "End":
          i ? (this.emitTableRowFocusRequest(this.rowCells?.length, this.positionAll, "last", !0), e.preventDefault()) : (h(t, l, "last", !1, !1), e.preventDefault());
          break;
      }
  }
  emitTableRowFocusRequest(e, l, a, i = !1) {
    this.calciteInternalTableRowFocusRequest.emit({
      cellPosition: e,
      rowPosition: l,
      destination: a,
      lastCell: i
    });
  }
  updateCells() {
    const e = this.alignment ? this.alignment : this.rowType !== "head" ? "center" : "start", l = this.rowSlotRef.value ? g(this.rowSlotRef.value, "calcite-table-cell, calcite-table-header") : [], i = [
      this.numberedCellRef.value,
      this.numberedHeaderRef.value,
      this.selectionCellRef.value,
      this.selectionHeaderRef.value
    ].filter((t) => t != null).concat(l);
    i.length > 0 && i?.forEach((t, r) => {
      if (t.interactionMode = this.interactionMode, t.lastCell = r === i.length - 1, t.parentRowAlignment = e, t.parentRowIsSelected = this.selected, t.parentRowType = this.rowType, t.positionInRow = r + 1, t.scale = this.scale, t.nodeName === "CALCITE-TABLE-CELL") {
        const c = t.rowSpan || 1, u = this.rowType === "body" && c > 1 && this.positionSection + c >= this.bodyRowCount;
        t.readCellContentsToAT = this.readCellContentsToAT, t.disabled = this.disabled, t.reachesBodyEnd = u;
      }
    }), this.rowCells = i || [], this.cellCount = i?.length;
  }
  async handleRowSelection() {
    (this.rowType === "body" || this.rowType === "head" && this.selectionMode === "multiple") && (this.userTriggered = !0, this.selected = !this.selected, await this.updateComplete, this.calciteTableRowSelect.emit());
  }
  renderSelectionIcon() {
    const e = this.selectionMode === "multiple" && this.selected ? b.checkSquare : this.selectionMode === "multiple" ? b.square : this.selected ? b.circleF : b.circle;
    return s`<calcite-icon .icon=${e} .scale=${T(this.scale)}></calcite-icon>`;
  }
  renderSelectableCell() {
    return this.rowType === "head" ? n("selection-head", s`<calcite-table-header alignment=center .bodyRowCount=${this.bodyRowCount} @click=${this.clickHandler} @keydown=${this.handleKeyboardSelection} .parentRowAlignment=${this.alignment} .selectedRowCount=${this.selectedRowCount} .selectedRowCountLocalized=${this.selectedRowCountLocalized} .selectionCell=${!0} .selectionMode=${this.selectionMode} ${o(this.selectionHeaderRef)}></calcite-table-header>`) : this.rowType === "body" ? n("selection-body", s`<calcite-table-cell alignment=center @click=${this.clickHandler} @keydown=${this.handleKeyboardSelection} .parentRowAlignment=${this.alignment} .parentRowIsSelected=${this.selected} .parentRowPositionLocalized=${this.positionSectionLocalized} .selectionCell=${!0} ${o(this.selectionCellRef)}>${this.renderSelectionIcon()}</calcite-table-cell>`) : n("selection-foot", s`<calcite-table-cell alignment=center .parentRowAlignment=${this.alignment} .selectionCell=${!0} ${o(this.selectionCellRef)}></calcite-table-cell>`);
  }
  renderNumberedCell() {
    return this.rowType === "head" ? n("numbered-head", s`<calcite-table-header alignment=center .numberCell=${!0} .parentRowAlignment=${this.alignment} ${o(this.numberedHeaderRef)}></calcite-table-header>`) : this.rowType === "body" ? n("numbered-body", s`<calcite-table-cell alignment=center .numberCell=${!0} .parentRowAlignment=${this.alignment} ${o(this.numberedCellRef)}>${this.positionSectionLocalized}</calcite-table-cell>`) : n("numbered-foot", s`<calcite-table-cell alignment=center .numberCell=${!0} .parentRowAlignment=${this.alignment} ${o(this.numberedCellRef)}></calcite-table-cell>`);
  }
  render() {
    return this.interactiveContainer({ disabled: this.disabled, children: s`<tr .ariaRowIndex=${this.positionAll + 1} .ariaSelected=${this.selected} class=${m({ [A.lastVisibleRow]: this.lastVisibleRow })} @keydown=${this.keyDownHandler} ${o((e) => {
      e && C(s`${this.numbered && this.renderNumberedCell() || ""}${this.selectionMode !== "none" && this.renderSelectableCell() || ""}<slot ${o(this.rowSlotRef)}></slot>`, e);
    })}></tr>` });
  }
}
R("calcite-table-row", I);
export {
  I as TableRow
};
