/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as d, L as h, A as i, s as o, b as c, d as b } from "./index.js";
import { e as u, n as p } from "./ref.js";
import { g as m } from "./component.js";
import { u as g } from "./useT9n.js";
import { u as v } from "./useSetFocus.js";
import { C as e, I as a } from "./resources31.js";
const w = d`:host{display:contents}:host([alignment=center]) th{text-align:center}:host([alignment=end]) th{text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}th{white-space:normal;text-align:start;vertical-align:top;font-weight:var(--calcite-font-weight-medium);border-block-end:var(--calcite-border-width-sm) solid var(--calcite-table-header-border-color, var(--calcite-table-border-color, var(--calcite-color-border-2)));padding-block:calc(var(--calcite-internal-table-cell-padding) * 1.5);padding-inline:var(--calcite-internal-table-cell-padding);background-color:var(--calcite-table-header-background-color, var(--calcite-table-header-background, var(--calcite-color-foreground-2)));font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-table-cell-border-color, var(--calcite-table-border-color, var(--calcite-color-border-2)))}th:not(.static-cell){outline-color:transparent}th:not(.static-cell):not(.static-cell):focus-within{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}th:not(.body-row):not(.footer-row){border-block-end-width:var(--calcite-internal-table-header-border-block-end-width, var(--calcite-border-width-sm));box-shadow:var(--calcite-internal-table-sticky-header-border-shadow, 0 0 0 0 transparent)}th:not(.center):not(.end).content-cell{vertical-align:top}th.center{vertical-align:middle}th.end.content-cell{vertical-align:bottom}th.body-row,th.footer-row{padding-block:var(--calcite-internal-table-cell-padding);border-block-end:0}th.footer-row{border-block-start:var(--calcite-border-width-sm) solid var(--calcite-table-header-border-color, var(--calcite-table-border-color, var(--calcite-color-border-2)))}th.last-cell{border-inline-end:0}.cell--multiple-selection{cursor:pointer;vertical-align:middle;color:var(--calcite-table-selection-cell-icon-color, var(--calcite-color-text-3));background-color:var(--calcite-table-selection-cell-background-color, var(--calcite-color-foreground-2))}.cell--multiple-selection.selected-cell{background-color:var(--calcite-table-selection-cell-background-color-selected, var(--calcite-color-foreground-2))}.cell--multiple-selection:not(.end){vertical-align:middle}.number-cell{background-color:var(--calcite-table-number-cell-background-color, var(--calcite-table-cell-background-color, var(--calcite-color-foreground-2)))}.number-cell,.selection-cell{inline-size:2rem;min-inline-size:2rem}.selection-cell calcite-icon.active{color:var(--calcite-table-selection-cell-icon-color-selected, var(--calcite-color-brand))}.number-cell calcite-icon,.selection-cell calcite-icon{margin-inline-start:auto;margin-inline-end:auto;vertical-align:middle}.heading{color:var(--calcite-table-header-heading-text-color, var(--calcite-color-text-1))}.description{color:var(--calcite-table-header-description-text-color, var(--calcite-color-text-3));font-size:var(--calcite-internal-table-cell-font-size-secondary)}`;
class f extends h {
  constructor() {
    super(...arguments), this.containerRef = u(), this.messages = g({ blocking: !0 }), this.focusSetter = v()(this), this.focused = !1, this.screenReaderText = "", this.alignment = "start", this.interactionMode = "interactive", this.lastCell = !1, this.numberCell = !1, this.parentRowAlignment = "start", this.parentRowIsSelected = !1, this.selectionCell = !1;
  }
  static {
    this.properties = { focused: 16, screenReaderText: 16, alignment: 3, bodyRowCount: 9, colSpan: 11, description: 3, heading: 3, interactionMode: 1, lastCell: 5, messageOverrides: 0, numberCell: 5, parentRowAlignment: 1, parentRowIsSelected: 5, parentRowType: 1, positionInRow: 9, rowSpan: 11, scale: 1, selectedRowCount: 9, selectedRowCountLocalized: 1, selectionCell: 5, selectionMode: 1 };
  }
  static {
    this.styles = w;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.containerRef.value, t);
  }
  async load() {
    this.updateScreenReaderText();
  }
  willUpdate(t) {
    (t.has("selectedRowCount") || t.has("selectedRowCountLocalized")) && this.updateScreenReaderText();
  }
  updateScreenReaderText() {
    let t = "";
    const l = `${this.selectedRowCountLocalized} ${this.messages?.selected}`;
    this.numberCell ? t = this.messages?.rowNumber : this.selectionMode === "single" ? t = `${this.messages?.selectionColumn}. ${l}` : this.bodyRowCount === this.selectedRowCount ? t = `${this.messages?.selectionColumn}. ${this.messages?.all} ${l} ${this.messages?.keyboardDeselectAll}` : t = `${this.messages?.selectionColumn}. ${l} ${this.messages?.keyboardSelectAll}`, this.screenReaderText = t;
  }
  onContainerBlur() {
    this.focused = !1;
  }
  onContainerFocus() {
    this.focused = !0;
  }
  render() {
    const t = this.rowSpan ? "rowgroup" : this.colSpan ? "colgroup" : this.parentRowType === "body" ? "row" : "col", l = this.selectedRowCount === this.bodyRowCount, r = this.selectedRowCount > 0, s = l ? a.checked : r ? a.indeterminate : a.unchecked, n = this.interactionMode === "static" && !this.selectionCell;
    return c`<th .ariaColIndex=${this.parentRowType === "head" ? this.positionInRow : void 0} class=${o({
      [e.bodyRow]: this.parentRowType === "body",
      [e.footerRow]: this.parentRowType === "foot",
      [e.contentCell]: !this.numberCell && !this.selectionCell,
      [e.numberCell]: this.numberCell,
      [e.selectionCell]: this.selectionCell,
      [e.selectedCell]: this.parentRowIsSelected,
      [e.multipleSelectionCell]: this.selectionMode === "multiple",
      [e.staticCell]: n,
      [e.lastCell]: this.lastCell && (!this.rowSpan || this.colSpan && !!this.rowSpan),
      [this.parentRowAlignment]: this.parentRowAlignment === "center" || this.parentRowAlignment === "end"
    })} colSpan=${this.colSpan ?? i} @blur=${this.onContainerBlur} @focus=${this.onContainerFocus} .role=${this.parentRowType === "head" ? "columnheader" : "rowheader"} rowSpan=${this.rowSpan ?? i} scope=${t ?? i} .tabIndex=${this.selectionCell ? 0 : n ? -1 : 0} ${p(this.containerRef)}>${this.heading && c`<div class=${o(e.heading)}>${this.heading}</div>` || ""}${this.description && c`<div class=${o(e.description)}>${this.description}</div>` || ""}${this.selectionCell && this.selectionMode === "multiple" && c`<calcite-icon class=${o({ [e.active]: r || l })} .icon=${s} .scale=${m(this.scale)}></calcite-icon>` || ""}${(this.selectionCell || this.numberCell) && c`<span .ariaLive=${this.focused ? "polite" : "off"} class=${o(e.assistiveText)}>${this.screenReaderText}</span>` || ""}</th>`;
  }
}
b("calcite-table-header", f);
export {
  f as TableHeader
};
