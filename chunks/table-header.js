import { c as d, L as h, s as i, E as c, x as o, d as p } from "./iframe.js";
import { e as u, n as m } from "./ref.js";
import { c as b, g } from "./component.js";
import { u as w } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
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
}, n = {
  checked: "check-square-f",
  indeterminate: "minus-square-f",
  unchecked: "square"
}, C = d`:host{--calcite-internal-table-header-background: var(--calcite-table-header-background, var(--calcite-color-foreground-2));--calcite-internal-table-header-border-color: var(--calcite-table-border-color, var(--calcite-color-border-3));display:contents}:host([alignment=center]) th{text-align:center}:host([alignment=end]) th{text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}th{white-space:normal;text-align:start;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:1px solid var(--calcite-internal-table-header-border-color);border-block-end:1px solid var(--calcite-internal-table-header-border-color);padding-block:calc(var(--calcite-internal-table-cell-padding) * 1.5);padding-inline:var(--calcite-internal-table-cell-padding);background-color:var(--calcite-internal-table-header-background)}th:not(.static-cell){outline-color:transparent}th:not(.static-cell):not(.static-cell):focus-within{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}th:not(.center):not(.end).content-cell{vertical-align:top}th.center{vertical-align:middle}th.end.content-cell{vertical-align:bottom}th.body-row,th.footer-row{padding-block:var(--calcite-internal-table-cell-padding);border-block-end:0}th.footer-row{border-block-start:1px solid var(--calcite-internal-table-header-border-color)}th.last-cell{border-inline-end:0}.cell--multiple-selection{cursor:pointer;vertical-align:middle;color:var(--calcite-color-text-3)}.cell--multiple-selection:not(.end){vertical-align:middle}.selected-cell:not(.number-cell):not(.footer-cell){--calcite-internal-table-header-background: var(--calcite-color-foreground-current)}.number-cell,.selection-cell{color:var(--calcite-color-text-2);inline-size:2rem;min-inline-size:2rem}.selection-cell calcite-icon.active{color:var(--calcite-color-brand)}.number-cell calcite-icon,.selection-cell calcite-icon{margin-inline-start:auto;margin-inline-end:auto;vertical-align:middle}.heading{color:var(--calcite-color-text-1)}.description{color:var(--calcite-color-text-3);font-size:var(--calcite-internal-table-cell-font-size-secondary)}`;
class v extends h {
  constructor() {
    super(...arguments), this.containerEl = u(), this.focused = !1, this.screenReaderText = "", this.alignment = "start", this.interactionMode = "interactive", this.messages = w({ blocking: !0 }), this.numberCell = !1, this.parentRowAlignment = "start", this.selectionCell = !1;
  }
  static {
    this.properties = { focused: 16, screenReaderText: 16, alignment: 3, bodyRowCount: 9, colSpan: 11, description: 3, heading: 3, interactionMode: 1, lastCell: 5, messageOverrides: 0, numberCell: 5, parentRowAlignment: 1, parentRowIsSelected: 5, parentRowType: 1, positionInRow: 9, rowSpan: 11, scale: 1, selectedRowCount: 9, selectedRowCountLocalized: 1, selectionCell: 5, selectionMode: 1 };
  }
  static {
    this.styles = C;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await b(this), this.containerEl.value.focus();
  }
  // #endregion
  // #region Lifecycle
  async load() {
    this.updateScreenReaderText();
  }
  willUpdate(t) {
    (t.has("selectedRowCount") || t.has("selectedRowCountLocalized")) && this.updateScreenReaderText();
  }
  // #endregion
  // #region Private Methods
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
  // #endregion
  // #region Rendering
  render() {
    const t = this.rowSpan ? "rowgroup" : this.colSpan ? "colgroup" : this.parentRowType === "body" ? "row" : "col", l = this.selectedRowCount === this.bodyRowCount, s = this.selectedRowCount > 0, r = l ? n.checked : s ? n.indeterminate : n.unchecked, a = this.interactionMode === "static" && !this.selectionCell;
    return o`<th .ariaColIndex=${this.parentRowType === "head" ? this.positionInRow : void 0} class=${i({
      [e.bodyRow]: this.parentRowType === "body",
      [e.footerRow]: this.parentRowType === "foot",
      [e.contentCell]: !this.numberCell && !this.selectionCell,
      [e.numberCell]: this.numberCell,
      [e.selectionCell]: this.selectionCell,
      [e.selectedCell]: this.parentRowIsSelected,
      [e.multipleSelectionCell]: this.selectionMode === "multiple",
      [e.staticCell]: a,
      [e.lastCell]: this.lastCell && (!this.rowSpan || this.colSpan && !!this.rowSpan),
      [this.parentRowAlignment]: this.parentRowAlignment === "center" || this.parentRowAlignment === "end"
    })} colSpan=${this.colSpan ?? c} @blur=${this.onContainerBlur} @focus=${this.onContainerFocus} .role=${this.parentRowType === "head" ? "columnheader" : "rowheader"} rowSpan=${this.rowSpan ?? c} scope=${t ?? c} .tabIndex=${this.selectionCell ? 0 : a ? -1 : 0} ${m(this.containerEl)}>${this.heading && o`<div class=${i(e.heading)}>${this.heading}</div>` || ""}${this.description && o`<div class=${i(e.description)}>${this.description}</div>` || ""}${this.selectionCell && this.selectionMode === "multiple" && o`<calcite-icon class=${i({ [e.active]: s || l })} .icon=${r} .scale=${g(this.scale)}></calcite-icon>` || ""}${(this.selectionCell || this.numberCell) && o`<span .ariaLive=${this.focused ? "polite" : "off"} class=${i(e.assistiveText)}>${this.screenReaderText}</span>` || ""}</th>`;
  }
}
p("calcite-table-header", v);
export {
  v as TableHeader
};
