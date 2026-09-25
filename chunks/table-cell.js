/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as i, L as s, A as c, s as o, C as a, b as r, d as n } from "./index.js";
import { e as d, n as b } from "./ref.js";
import { u as h } from "./index2.js";
import { u } from "./useT9n.js";
import { u as v } from "./useSetFocus.js";
import { u as p } from "./useInteractive.js";
import { C as t } from "./resources30.js";
import { s as m } from "./screen-reader.js";
const g = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:contents}:host([alignment=center]) td:not(.selection-cell):not(.number-cell){text-align:center}:host([alignment=end]) td:not(.selection-cell):not(.number-cell){text-align:end}td{text-align:start;vertical-align:middle;white-space:normal;color:var(--calcite-table-cell-text-color, var(--calcite-color-text-1));background-color:var(--calcite-internal-table-cell-background-color, var(--calcite-table-cell-background-color, transparent));font-size:var(--calcite-internal-table-cell-font-size);border-block-end:var(--calcite-internal-table-row-border-block-end-width, 0) solid var(--calcite-internal-table-row-border-block-end-color, transparent);border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-table-cell-border-color, var(--calcite-table-border-color, var(--calcite-color-border-2)));padding:var(--calcite-internal-table-cell-padding)}td:not(.static-cell){outline-color:transparent}td:not(.static-cell):focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}td.start.content-cell{vertical-align:top}td.end.content-cell{vertical-align:bottom}td.last-cell{border-inline-end:0}:host([reaches-body-end]) td{border-block-end:0}.footer-cell{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-table-cell-text-color, var(--calcite-color-text-1));background-color:var(--calcite-table-cell-background-color, var(--calcite-table-cell-background, var(--calcite-color-background)));border-block-end:0;border-block-start:var(--calcite-border-width-sm) solid var(--calcite-table-cell-border-color, var(--calcite-table-border-color, var(--calcite-color-border-2)))}.number-cell,.selection-cell{text-align:center;border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-table-cell-border-color, var(--calcite-table-border-color, var(--calcite-color-border-2)));inline-size:2rem;min-inline-size:2rem}.number-cell{color:var(--calcite-table-number-cell-text-color, var(--calcite-color-text-1));background-color:var(--calcite-table-number-cell-background-color, var(--calcite-color-foreground-2))}.number-cell.footer-cell{background-color:var(--calcite-table-number-cell-background-color, var(--calcite-table-cell-background-color, var(--calcite-color-background)))}.selection-cell{color:var(--calcite-table-selection-cell-icon-color, var(--calcite-color-text-3))}.selection-cell:not(.footer-cell){cursor:pointer;background-color:var(--calcite-table-selection-cell-background-color, var(--calcite-table-cell-background-color, transparent))}.selection-cell.footer-cell{background-color:var(--calcite-table-selection-cell-background-color, var(--calcite-table-cell-background-color, var(--calcite-color-background)))}.selected-cell:not(.number-cell):not(.footer-cell){background-color:var(--calcite-table-cell-background-color-selected, var(--calcite-table-row-background-color-selected, var(--calcite-color-surface-highlight)))}.selection-cell.selected-cell{box-shadow:inset 0 0 0 0 var(--calcite-table-row-accent-color-selected, var(--calcite-color-brand));color:var(--calcite-table-selection-cell-icon-color-selected, var(--calcite-color-brand))}.calcite--rtl.selection-cell.selected-cell{box-shadow:inset -.25rem 0 0 0 var(--calcite-table-row-accent-color-selected, var(--calcite-color-brand))}.selection-cell{vertical-align:middle}.selection-cell ::slotted(calcite-icon){pointer-events:none;margin-block-start:var(--calcite-space-2xs)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class f extends s {
  constructor() {
    super(...arguments), this.containerRef = d(), this.direction = h(), this.messages = u(), this.focusSetter = v()(this), this.interactiveContainer = p(this), this.contentsText = "", this.focused = !1, this.selectionText = "", this.alignment = "start", this.disabled = !1, this.interactionMode = "interactive", this.lastCell = !1, this.numberCell = !1, this.reachesBodyEnd = !1, this.parentRowAlignment = "start", this.parentRowIsSelected = !1, this.readCellContentsToAT = !1, this.scale = "m", this.selectionCell = !1;
  }
  static {
    this.properties = { contentsText: 16, focused: 16, selectionText: 16, alignment: 3, colSpan: 11, disabled: 5, interactionMode: 1, lastCell: 5, messageOverrides: 0, numberCell: 5, reachesBodyEnd: 7, parentRowAlignment: 1, parentRowIsSelected: 5, parentRowPositionLocalized: 1, parentRowType: 1, positionInRow: 9, readCellContentsToAT: 5, rowSpan: 11, scale: 1, selectionCell: 5 };
  }
  static {
    this.styles = [g, m];
  }
  async setFocus(e) {
    return this.focusSetter(() => this.containerRef.value, e);
  }
  async load() {
    this.updateScreenReaderContentsText(), this.updateScreenReaderSelectionText();
  }
  willUpdate(e) {
    e.has("parentRowIsSelected") && this.updateScreenReaderSelectionText();
  }
  updateScreenReaderSelectionText() {
    const e = `${this.messages?.row} ${this.parentRowPositionLocalized} ${this.messages?.selected} ${this.messages?.keyboardDeselect}`, l = `${this.messages?.row} ${this.parentRowPositionLocalized} ${this.messages?.unselected} ${this.messages?.keyboardSelect}`;
    this.selectionText = this.parentRowIsSelected ? e : l;
  }
  updateScreenReaderContentsText() {
    this.contentsText = this.el.textContent;
  }
  onContainerBlur() {
    this.focused = !1;
  }
  onContainerFocus() {
    this.focused = !0;
  }
  render() {
    const e = this.direction, l = this.disabled || this.interactionMode === "static" && (!this.selectionCell || this.selectionCell && this.parentRowType === "foot");
    return this.interactiveContainer({ disabled: this.disabled, children: r`<td class=${o({
      [t.footerCell]: this.parentRowType === "foot",
      [t.contentCell]: !this.numberCell && !this.selectionCell,
      [t.numberCell]: this.numberCell,
      [t.selectionCell]: this.selectionCell,
      [t.selectedCell]: this.parentRowIsSelected,
      [t.lastCell]: this.lastCell && (!this.rowSpan || this.colSpan && !!this.rowSpan),
      [a.rtl]: e === "rtl",
      [t.staticCell]: l,
      [this.parentRowAlignment]: this.parentRowAlignment === "start" || this.parentRowAlignment === "end"
    })} colSpan=${this.colSpan ?? c} @blur=${this.onContainerBlur} @focus=${this.onContainerFocus} .role=${this.interactionMode === "interactive" ? "gridcell" : "cell"} rowSpan=${this.rowSpan ?? c} .tabIndex=${l ? -1 : 0} ${b(this.containerRef)}>${(this.selectionCell || this.readCellContentsToAT) && r`<span .ariaLive=${this.focused ? "polite" : "off"} class=${o(a.screenReaderText)}>${this.selectionCell && this.selectionText || ""}${this.readCellContentsToAT && !this.selectionCell && this.contentsText || ""}</span>` || ""}<slot @slotchange=${this.updateScreenReaderContentsText}></slot></td>` });
  }
}
n("calcite-table-cell", f);
export {
  f as TableCell
};
