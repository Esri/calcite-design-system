import { b as d, L as h, s as c, E as n, x as o, q as u } from "./index.js";
import { e as b, n as p } from "./ref.js";
import { g as m } from "./component.js";
import { u as v } from "./useT9n.js";
import { u as g } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const e = {
  contentCell: "content-cell",
  numberCell: "number-cell",
  selectionCell: "selection-cell",
  bodyRow: "body-row",
  footerRow: "footer-row",
  heading: "heading",
  description: "description",
  multipleSelectionCell: "cell--multiple-selection",
  assistiveText: "assistive-text",
  active: "active",
  selectedCell: "selected-cell",
  lastCell: "last-cell",
  staticCell: "static-cell"
}, i = {
  checked: "check-square-f",
  indeterminate: "minus-square-f",
  unchecked: "square"
}, w = d`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:contents}:host([alignment=center]) th{text-align:center}:host([alignment=end]) th{text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}th{white-space:normal;text-align:start;vertical-align:top;font-weight:var(--calcite-font-weight-medium);border-block-end:var(--calcite-border-width-sm) solid var(--calcite-table-header-border-color, var(--calcite-table-border-color, var(--calcite-color-border-3)));padding-block:calc(var(--calcite-internal-table-cell-padding) * 1.5);padding-inline:var(--calcite-internal-table-cell-padding);background-color:var(--calcite-table-header-background-color, var(--calcite-table-header-background, var(--calcite-color-foreground-2)));font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-table-cell-border-color, var(--calcite-table-border-color, var(--calcite-color-border-3)))}th:not(.static-cell){outline-color:transparent}th:not(.static-cell):not(.static-cell):focus-within{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}th:not(.center):not(.end).content-cell{vertical-align:top}th.center{vertical-align:middle}th.end.content-cell{vertical-align:bottom}th.body-row,th.footer-row{padding-block:var(--calcite-internal-table-cell-padding);border-block-end:0}th.footer-row{border-block-start:var(--calcite-border-width-sm) solid var(--calcite-table-header-border-color, var(--calcite-table-border-color, var(--calcite-color-border-3)))}th.last-cell{border-inline-end:0}.cell--multiple-selection{cursor:pointer;vertical-align:middle;color:var(--calcite-table-selection-cell-icon-color, var(--calcite-color-text-3));background-color:var(--calcite-table-selection-cell-background-color, var(--calcite-color-foreground-2))}.cell--multiple-selection.selected-cell{background-color:var(--calcite-table-selection-cell-background-color-selected, var(--calcite-color-foreground-2))}.cell--multiple-selection:not(.end){vertical-align:middle}.number-cell{background-color:var(--calcite-table-number-cell-background-color, var(--calcite-table-cell-background-color, var(--calcite-color-foreground-2)))}.number-cell,.selection-cell{inline-size:2rem;min-inline-size:2rem}.selection-cell calcite-icon.active{color:var(--calcite-table-selection-cell-icon-color-selected, var(--calcite-color-brand))}.number-cell calcite-icon,.selection-cell calcite-icon{margin-inline-start:auto;margin-inline-end:auto;vertical-align:middle}.heading{color:var(--calcite-table-header-heading-text-color, var(--calcite-color-text-1))}.description{color:var(--calcite-table-header-description-text-color, var(--calcite-color-text-3));font-size:var(--calcite-internal-table-cell-font-size-secondary)}`;
class f extends h {
  constructor() {
    super(...arguments), this.containerRef = b(), this.messages = v({ blocking: !0 }), this.focusSetter = g()(this), this.focused = !1, this.screenReaderText = "", this.alignment = "start", this.interactionMode = "interactive", this.numberCell = !1, this.parentRowAlignment = "start", this.selectionCell = !1;
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
    const t = this.rowSpan ? "rowgroup" : this.colSpan ? "colgroup" : this.parentRowType === "body" ? "row" : "col", l = this.selectedRowCount === this.bodyRowCount, a = this.selectedRowCount > 0, s = l ? i.checked : a ? i.indeterminate : i.unchecked, r = this.interactionMode === "static" && !this.selectionCell;
    return o`<th .ariaColIndex=${this.parentRowType === "head" ? this.positionInRow : void 0} class=${c({
      [e.bodyRow]: this.parentRowType === "body",
      [e.footerRow]: this.parentRowType === "foot",
      [e.contentCell]: !this.numberCell && !this.selectionCell,
      [e.numberCell]: this.numberCell,
      [e.selectionCell]: this.selectionCell,
      [e.selectedCell]: this.parentRowIsSelected,
      [e.multipleSelectionCell]: this.selectionMode === "multiple",
      [e.staticCell]: r,
      [e.lastCell]: this.lastCell && (!this.rowSpan || this.colSpan && !!this.rowSpan),
      [this.parentRowAlignment]: this.parentRowAlignment === "center" || this.parentRowAlignment === "end"
    })} colSpan=${this.colSpan ?? n} @blur=${this.onContainerBlur} @focus=${this.onContainerFocus} .role=${this.parentRowType === "head" ? "columnheader" : "rowheader"} rowSpan=${this.rowSpan ?? n} scope=${t} .tabIndex=${this.selectionCell ? 0 : r ? -1 : 0} ${p(this.containerRef)}>${this.heading && o`<div class=${c(e.heading)}>${this.heading}</div>` || ""}${this.description && o`<div class=${c(e.description)}>${this.description}</div>` || ""}${this.selectionCell && this.selectionMode === "multiple" && o`<calcite-icon class=${c({ [e.active]: a || l })} .icon=${s} .scale=${m(this.scale)}></calcite-icon>` || ""}${(this.selectionCell || this.numberCell) && o`<span .ariaLive=${this.focused ? "polite" : "off"} class=${c(e.assistiveText)}>${this.screenReaderText}</span>` || ""}</th>`;
  }
}
u("calcite-table-header", f);
export {
  f as TableHeader
};
