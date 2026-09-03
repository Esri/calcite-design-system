/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { s as e, A as l, b as a } from "./index.js";
import { n as b } from "./ref.js";
const s = {
  container: "inline-editable--container",
  enableEditing: "enable-editing",
  confirmChanges: "confirm-changes",
  cancelEditing: "cancel-editing"
}, m = ({ cancelEditingLabel: t, confirmChangesLabel: i, editingEnabled: n, enableEditingLabel: o, enableEditingButtonRef: r, loading: $, onCancelEditing: d, onConfirmChanges: h, onEnableEditing: p, scale: c, showControls: u }) => a`<div class=${e(s.container)}>${!n && a`<calcite-action .ariaLabel=${o} class=${e(s.enableEditing)} icon=pencil @click=${p} .scale=${c} .text=${o} title=${o ?? l} type=button ${b(r)}></calcite-action>` || ""}${u && [
  a`<calcite-action .ariaLabel=${i} class=${e(s.confirmChanges)} icon=check .loading=${$} @click=${h} .scale=${c} .text=${i} title=${i ?? l} type=button></calcite-action>`,
  a`<calcite-action .ariaLabel=${t} class=${e(s.cancelEditing)} icon=x @click=${d} .scale=${c} .text=${t} title=${t ?? l} type=button></calcite-action>`
] || ""}</div>`;
class f {
  constructor(i) {
    this.options = i, this.valuePriorToEditing = "";
  }
  enable() {
    this.valuePriorToEditing = this.options.getValue(), this.options.setEditingEnabled(!0), requestAnimationFrame(() => {
      this.options.setFocus();
    }), this.options.emitEnableEditingChange();
  }
  disable() {
    this.options.setEditingEnabled(!1);
  }
  cancelEditing() {
    this.options.setValue(this.valuePriorToEditing), this.disable(), this.options.emitCancel();
  }
  async confirm(i, n) {
    this.options.emitConfirm();
    try {
      i && (n?.(!0), await i(), this.disable());
    } finally {
      n?.(!1);
    }
  }
}
export {
  s as C,
  m as I,
  f as U
};
