import { b as w, L as p, c as d, x as s, s as m, I as f, q as R } from "./index.js";
import { i as a } from "./keyed.js";
import { e as C, n as b } from "./ref.js";
import { b as c } from "./dom.js";
import { i as g } from "./key.js";
import { u as y, I as T } from "./interactive.js";
import { g as k } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const $ = {
  lastVisibleRow: "last-visible-row"
}, r = {
  checkSquare: "check-square-f",
  square: "square",
  circleF: "circle-f",
  circle: "circle"
}, S = w`@charset "UTF-8";:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:contents}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) tr{pointer-events:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-table-cell{--calcite-internal-table-cell-background-color: var( --calcite-table-row-background-color, var(--calcite-table-row-background, var(--calcite-color-foreground-1)) )}:host([selected]) calcite-table-cell{--calcite-internal-table-cell-background-color: var( --calcite-table-row-background-color-selected, var(--calcite-color-foreground-1) )}tr{border-block-end:var(--calcite-border-width-sm) solid var(--calcite-table-row-border-color, transparent);background-color:var(--calcite-table-row-background-color, var(--calcite-table-row-background, var(--calcite-color-foreground-1)))}tr.last-visible-row{border-block-end:0}@-moz-document url-prefix(){tr{box-shadow:inset 0 -1px 0 0 var(--calcite-table-row-border-color)}tr.last-visible-row{box-shadow:inset 0 -1px 0 0 transparent}}:host([item-hidden]){display:none}`;
class A extends p {
  constructor() {
    super(), this.rowCells = [], this.tableRowSlotRef = C(), this.userTriggered = !1, this._selected = !1, this.clickHandler = () => {
      this.handleRowSelection();
    }, this.handleKeyboardSelection = (e) => {
      g(e.key) && (e.key === " " && e.preventDefault(), this.handleRowSelection());
    }, this.itemHidden = !1, this.disabled = !1, this.interactionMode = "interactive", this.numbered = !1, this.selectionMode = "none", this.calciteInternalTableRowFocusRequest = d({ cancelable: !1 }), this.calciteInternalTableRowSelect = d({ cancelable: !1 }), this.calciteTableRowSelect = d({ cancelable: !1 }), this.listenOn(document, "calciteInternalTableRowFocusChange", this.calciteInternalTableRowFocusChangeHandler);
  }
  static {
    this.properties = { alignment: 3, itemHidden: 7, bodyRowCount: 9, cellCount: 9, disabled: 7, interactionMode: 1, lastVisibleRow: 5, numbered: 5, positionAll: 9, positionSection: 9, positionSectionLocalized: 1, readCellContentsToAT: 5, rowType: 1, scale: 1, selected: 7, selectedRowCount: 9, selectedRowCountLocalized: 1, selectionMode: 1 };
  }
  static {
    this.styles = S;
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
  updated() {
    y(this);
  }
  loaded() {
    this.tableRowEl && this.rowCells.length > 0 && this.updateCells();
  }
  handleSlotChange() {
    this.updateCells();
  }
  handleCellChanges() {
    this.tableRowEl && this.rowCells.length > 0 && this.updateCells();
  }
  handleDelayedCellChanges() {
    this.tableRowEl && this.rowCells.length > 0 && requestAnimationFrame(() => this.updateCells());
  }
  calciteInternalTableRowFocusChangeHandler(e) {
    if (e.target.contains(this.el)) {
      const l = e.detail.cellPosition, o = e.detail.rowPosition, i = e.detail.destination, t = e.detail.lastCell;
      if (o === this.positionAll) {
        if (this.disabled) {
          const h = i === "last" ? "previous" : i === "first" ? "next" : i;
          this.emitTableRowFocusRequest(l, this.positionAll, h);
          return;
        }
        const n = t ? this.rowCells[this.rowCells.length - 1] : this.rowCells?.find((h, u) => u + 1 === l);
        n && n.setFocus();
      }
    }
  }
  keyDownHandler(e) {
    if (this.interactionMode !== "interactive")
      return;
    const l = e.target, o = e.key, i = e.ctrlKey, t = this.rowCells;
    if (l.matches("calcite-table-cell") || l.matches("calcite-table-header"))
      switch (o) {
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
          c(t, l, "previous", !1, !1), e.preventDefault();
          break;
        case "ArrowRight":
          c(t, l, "next", !1, !1), e.preventDefault();
          break;
        case "Home":
          i ? (this.emitTableRowFocusRequest(1, this.positionAll, "first"), e.preventDefault()) : (c(t, l, "first", !1, !1), e.preventDefault());
          break;
        case "End":
          i ? (this.emitTableRowFocusRequest(this.rowCells?.length, this.positionAll, "last", !0), e.preventDefault()) : (c(t, l, "last", !1, !1), e.preventDefault());
          break;
      }
  }
  emitTableRowFocusRequest(e, l, o, i) {
    this.calciteInternalTableRowFocusRequest.emit({
      cellPosition: e,
      rowPosition: l,
      destination: o,
      lastCell: i
    });
  }
  updateCells() {
    const e = this.alignment ? this.alignment : this.rowType !== "head" ? "center" : "start", l = this.tableRowSlotRef.value?.assignedElements({ flatten: !0 })?.filter((t) => t.matches("calcite-table-cell") || t.matches("calcite-table-header")), o = Array.from(this.tableRowEl?.querySelectorAll("calcite-table-header, calcite-table-cell"))?.filter((t) => t.numberCell || t.selectionCell), i = o ? o.concat(l) : l;
    i.length > 0 && i?.forEach((t, n) => {
      t.interactionMode = this.interactionMode, t.lastCell = n === i.length - 1, t.parentRowAlignment = e, t.parentRowIsSelected = this.selected, t.parentRowType = this.rowType, t.positionInRow = n + 1, t.scale = this.scale, t.nodeName === "CALCITE-TABLE-CELL" && (t.readCellContentsToAT = this.readCellContentsToAT, t.disabled = this.disabled);
    }), this.rowCells = i || [], this.cellCount = i?.length;
  }
  async handleRowSelection() {
    (this.rowType === "body" || this.rowType === "head" && this.selectionMode === "multiple") && (this.userTriggered = !0, this.selected = !this.selected, await this.updateComplete, this.calciteTableRowSelect.emit());
  }
  renderSelectionIcon() {
    const e = this.selectionMode === "multiple" && this.selected ? r.checkSquare : this.selectionMode === "multiple" ? r.square : this.selected ? r.circleF : r.circle;
    return s`<calcite-icon .icon=${e} .scale=${k(this.scale)}></calcite-icon>`;
  }
  renderSelectableCell() {
    return this.rowType === "head" ? a("selection-head", s`<calcite-table-header alignment=center .bodyRowCount=${this.bodyRowCount} @click=${this.clickHandler} @keydown=${this.handleKeyboardSelection} .parentRowAlignment=${this.alignment} .selectedRowCount=${this.selectedRowCount} .selectedRowCountLocalized=${this.selectedRowCountLocalized} .selectionCell=${!0} .selectionMode=${this.selectionMode}></calcite-table-header>`) : this.rowType === "body" ? a("selection-body", s`<calcite-table-cell alignment=center @click=${this.clickHandler} @keydown=${this.handleKeyboardSelection} .parentRowAlignment=${this.alignment} .parentRowIsSelected=${this.selected} .parentRowPositionLocalized=${this.positionSectionLocalized} .selectionCell=${!0}>${this.renderSelectionIcon()}</calcite-table-cell>`) : a("selection-foot", s`<calcite-table-cell alignment=center .parentRowAlignment=${this.alignment} .selectionCell=${!0}></calcite-table-cell>`);
  }
  renderNumberedCell() {
    return this.rowType === "head" ? a("numbered-head", s`<calcite-table-header alignment=center .numberCell=${!0} .parentRowAlignment=${this.alignment}></calcite-table-header>`) : this.rowType === "body" ? a("numbered-body", s`<calcite-table-cell alignment=center .numberCell=${!0} .parentRowAlignment=${this.alignment}>${this.positionSectionLocalized}</calcite-table-cell>`) : a("numbered-foot", s`<calcite-table-cell alignment=center .numberCell=${!0} .parentRowAlignment=${this.alignment}></calcite-table-cell>`);
  }
  render() {
    return T({ disabled: this.disabled, children: s`<tr .ariaRowIndex=${this.positionAll + 1} .ariaSelected=${this.selected} class=${m({ [$.lastVisibleRow]: this.lastVisibleRow })} @keydown=${this.keyDownHandler} ${b((e) => {
      e && (this.tableRowEl = e, f(s`${this.numbered && this.renderNumberedCell() || ""}${this.selectionMode !== "none" && this.renderSelectableCell() || ""}<slot ${b(this.tableRowSlotRef)}></slot>`, e));
    })}></tr>` });
  }
}
R("calcite-table-row", A);
export {
  A as TableRow
};
