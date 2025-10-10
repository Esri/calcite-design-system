import { b as r, L as i, s as c, E as o, C as s, x as a, q as n } from "./index.js";
import { e as d, n as b } from "./ref.js";
import { u, I as h } from "./interactive.js";
import { a as v } from "./dom.js";
import { u as p } from "./useT9n.js";
import { u as m } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const e = {
  contentCell: "content-cell",
  numberCell: "number-cell",
  footerCell: "footer-cell",
  selectionCell: "selection-cell",
  selectedCell: "selected-cell",
  assistiveText: "assistive-text",
  lastCell: "last-cell",
  staticCell: "static-cell"
}, g = r`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:contents}:host([alignment=center]) td:not(.selection-cell):not(.number-cell){text-align:center}:host([alignment=end]) td:not(.selection-cell):not(.number-cell){text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}td{white-space:normal;text-align:start;vertical-align:middle;color:var(--calcite-table-cell-text-color, var(--calcite-color-text-1));background-color:var(--calcite-internal-table-cell-background-color, var(--calcite-table-cell-background-color, transparent));font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-table-cell-border-color, var(--calcite-table-border-color, var(--calcite-color-border-3)));padding:var(--calcite-internal-table-cell-padding)}td:not(.static-cell){outline-color:transparent}td:not(.static-cell):focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}td.start.content-cell{vertical-align:top}td.end.content-cell{vertical-align:bottom}td.last-cell{border-inline-end:0}.footer-cell{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-table-cell-text-color, var(--calcite-color-text-1));background-color:var(--calcite-table-cell-background-color, var(--calcite-table-cell-background, var(--calcite-color-background)));border-block-start:var(--calcite-border-width-sm) solid var(--calcite-table-cell-border-color, var(--calcite-table-border-color, var(--calcite-color-border-3)))}.number-cell,.selection-cell{text-align:center;border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-table-cell-border-color, var(--calcite-table-border-color, var(--calcite-color-border-3)));inline-size:2rem;min-inline-size:2rem}.number-cell{color:var(--calcite-table-number-cell-text-color, var(--calcite-color-text-1));background-color:var(--calcite-table-number-cell-background-color, var(--calcite-color-foreground-2))}.number-cell.footer-cell{background-color:var(--calcite-table-number-cell-background-color, var(--calcite-table-cell-background-color, var(--calcite-color-background)))}.selection-cell{color:var(--calcite-table-selection-cell-icon-color, var(--calcite-color-text-3))}.selection-cell:not(.footer-cell){cursor:pointer;background-color:var(--calcite-table-selection-cell-background-color, var(--calcite-table-cell-background-color, transparent))}.selection-cell.footer-cell{background-color:var(--calcite-table-selection-cell-background-color, var(--calcite-table-cell-background-color, var(--calcite-color-background)))}.selected-cell:not(.number-cell):not(.footer-cell){background-color:var(--calcite-table-cell-background-color-selected, var(--calcite-table-row-background-color-selected, var(--calcite-color-surface-highlight)))}.selection-cell.selected-cell{box-shadow:inset .25rem 0 0 0 var(--calcite-table-row-accent-color-selected, var(--calcite-color-brand));color:var(--calcite-table-selection-cell-icon-color-selected, var(--calcite-color-brand))}.calcite--rtl.selection-cell.selected-cell{box-shadow:inset -.25rem 0 0 0 var(--calcite-table-row-accent-color-selected, var(--calcite-color-brand))}.selection-cell{vertical-align:middle}.selection-cell ::slotted(calcite-icon){pointer-events:none;margin-block-start:.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class f extends i {
  constructor() {
    super(...arguments), this.containerRef = d(), this.messages = p(), this.focusSetter = m()(this), this.contentsText = "", this.focused = !1, this.selectionText = "", this.alignment = "start", this.interactionMode = "interactive", this.parentRowAlignment = "start", this.scale = "m";
  }
  static {
    this.properties = { contentsText: 16, focused: 16, selectionText: 16, alignment: 3, colSpan: 11, disabled: 5, interactionMode: 1, lastCell: 5, messageOverrides: 0, numberCell: 5, parentRowAlignment: 1, parentRowIsSelected: 5, parentRowPositionLocalized: 1, parentRowType: 1, positionInRow: 9, readCellContentsToAT: 5, rowSpan: 11, scale: 1, selectionCell: 5 };
  }
  static {
    this.styles = g;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.containerRef.value, t);
  }
  async load() {
    this.updateScreenReaderContentsText(), this.updateScreenReaderSelectionText();
  }
  willUpdate(t) {
    t.has("parentRowIsSelected") && this.updateScreenReaderSelectionText();
  }
  updated() {
    u(this);
  }
  updateScreenReaderSelectionText() {
    const t = `${this.messages?.row} ${this.parentRowPositionLocalized} ${this.messages?.selected} ${this.messages?.keyboardDeselect}`, l = `${this.messages?.row} ${this.parentRowPositionLocalized} ${this.messages?.unselected} ${this.messages?.keyboardSelect}`;
    this.selectionText = this.parentRowIsSelected ? t : l;
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
    const t = v(this.el), l = this.disabled || this.interactionMode === "static" && (!this.selectionCell || this.selectionCell && this.parentRowType === "foot");
    return h({ disabled: this.disabled, children: a`<td class=${c({
      [e.footerCell]: this.parentRowType === "foot",
      [e.contentCell]: !this.numberCell && !this.selectionCell,
      [e.numberCell]: this.numberCell,
      [e.selectionCell]: this.selectionCell,
      [e.selectedCell]: this.parentRowIsSelected,
      [e.lastCell]: this.lastCell && (!this.rowSpan || this.colSpan && !!this.rowSpan),
      [s.rtl]: t === "rtl",
      [e.staticCell]: l,
      [this.parentRowAlignment]: this.parentRowAlignment === "start" || this.parentRowAlignment === "end"
    })} colSpan=${this.colSpan ?? o} @blur=${this.onContainerBlur} @focus=${this.onContainerFocus} .role=${this.interactionMode === "interactive" ? "gridcell" : "cell"} rowSpan=${this.rowSpan ?? o} .tabIndex=${l ? -1 : 0} ${b(this.containerRef)}>${(this.selectionCell || this.readCellContentsToAT) && a`<span .ariaLive=${this.focused ? "polite" : "off"} class=${c(e.assistiveText)}>${this.selectionCell && this.selectionText || ""}${this.readCellContentsToAT && !this.selectionCell && this.contentsText || ""}</span>` || ""}<slot @slotchange=${this.updateScreenReaderContentsText}></slot></td>` });
  }
}
n("calcite-table-cell", f);
export {
  f as TableCell
};
