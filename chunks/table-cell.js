import { h as i, L as c, s as o, E as s, C as a, x as n, j as r } from "./iframe.js";
import { e as d, n as h } from "./ref.js";
import { c as p } from "./component.js";
import { u, I as b } from "./interactive.js";
import { g as m } from "./dom.js";
import { u as C } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const e = {
  contentCell: "content-cell",
  numberCell: "number-cell",
  footerCell: "footer-cell",
  selectionCell: "selection-cell",
  selectedCell: "selected-cell",
  assistiveText: "assistive-text",
  lastCell: "last-cell",
  staticCell: "static-cell"
}, g = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{--calcite-internal-table-cell-background: var(--calcite-table-cell-background, transparent);display:contents}:host([alignment=center]) td:not(.selection-cell):not(.number-cell){text-align:center}:host([alignment=end]) td:not(.selection-cell):not(.number-cell){text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}td{white-space:normal;text-align:start;vertical-align:middle;color:var(--calcite-color-text-1);background:var(--calcite-internal-table-cell-background);font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:1px solid var(--calcite-color-border-3);padding:var(--calcite-internal-table-cell-padding)}td:not(.static-cell){outline-color:transparent}td:not(.static-cell):focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}td.start.content-cell{vertical-align:top}td.end.content-cell{vertical-align:bottom}td.last-cell{border-inline-end:0}.number-cell{background-color:var(--calcite-color-foreground-2)}.footer-cell{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);border-block-start:1px solid var(--calcite-color-border-3)}.number-cell,.selection-cell{text-align:center;border-inline-end:1px solid var(--calcite-color-border-3);inline-size:2rem;min-inline-size:2rem}.selection-cell{color:var(--calcite-color-text-3);inset-inline-start:2rem}.selection-cell:not(.footer-cell){cursor:pointer}.selected-cell:not(.number-cell):not(.footer-cell){--calcite-internal-table-cell-background: var(--calcite-color-foreground-current)}.selection-cell.selected-cell{box-shadow:inset .25rem 0 0 0 var(--calcite-color-brand);color:var(--calcite-color-brand)}.selection-cell.selected-cell calcite-icon{color:var(--calcite-color-brand)}.calcite--rtl.selection-cell.selected-cell{box-shadow:inset -.25rem 0 0 0 var(--calcite-color-brand)}.selection-cell{vertical-align:middle}.selection-cell ::slotted(calcite-icon){pointer-events:none;margin-block-start:.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class f extends c {
  constructor() {
    super(...arguments), this.containerEl = d(), this.contentsText = "", this.focused = !1, this.selectionText = "", this.alignment = "start", this.interactionMode = "interactive", this.messages = C(), this.parentRowAlignment = "start", this.scale = "m";
  }
  static {
    this.properties = { contentsText: 16, focused: 16, selectionText: 16, alignment: 3, colSpan: 11, disabled: 5, interactionMode: 1, lastCell: 5, messageOverrides: 0, numberCell: 5, parentRowAlignment: 1, parentRowIsSelected: 5, parentRowPositionLocalized: 1, parentRowType: 1, positionInRow: 9, readCellContentsToAT: 5, rowSpan: 11, scale: 1, selectionCell: 5 };
  }
  static {
    this.styles = g;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await p(this), this.containerEl.value.focus();
  }
  // #endregion
  // #region Lifecycle
  async load() {
    this.updateScreenReaderContentsText(), this.updateScreenReaderSelectionText();
  }
  willUpdate(t) {
    t.has("parentRowIsSelected") && this.updateScreenReaderSelectionText();
  }
  updated() {
    u(this);
  }
  // #endregion
  // #region Private Methods
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
  // #endregion
  // #region Rendering
  render() {
    const t = m(this.el), l = this.disabled || this.interactionMode === "static" && (!this.selectionCell || this.selectionCell && this.parentRowType === "foot");
    return b({ disabled: this.disabled, children: n`<td class=${o({
      [e.footerCell]: this.parentRowType === "foot",
      [e.contentCell]: !this.numberCell && !this.selectionCell,
      [e.numberCell]: this.numberCell,
      [e.selectionCell]: this.selectionCell,
      [e.selectedCell]: this.parentRowIsSelected,
      [e.lastCell]: this.lastCell && (!this.rowSpan || this.colSpan && !!this.rowSpan),
      [a.rtl]: t === "rtl",
      [e.staticCell]: l,
      [this.parentRowAlignment]: this.parentRowAlignment === "start" || this.parentRowAlignment === "end"
    })} colSpan=${this.colSpan ?? s} @blur=${this.onContainerBlur} @focus=${this.onContainerFocus} .role=${this.interactionMode === "interactive" ? "gridcell" : "cell"} rowSpan=${this.rowSpan ?? s} .tabIndex=${l ? -1 : 0} ${h(this.containerEl)}>${(this.selectionCell || this.readCellContentsToAT) && n`<span .ariaLive=${this.focused ? "polite" : "off"} class=${o(e.assistiveText)}>${this.selectionCell && this.selectionText || ""}${this.readCellContentsToAT && !this.selectionCell && this.contentsText || ""}</span>` || ""}<slot @slotchange=${this.updateScreenReaderContentsText}></slot></td>` });
  }
}
r("calcite-table-cell", f);
export {
  f as TableCell
};
