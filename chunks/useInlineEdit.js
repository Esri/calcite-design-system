/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { s as n, A as r, b as s } from "./index.js";
import { n as g } from "./ref.js";
const o = {
  container: "inline-edit--container",
  enableEditing: "enable-editing",
  confirmChanges: "confirm-changes",
  cancelEditing: "cancel-editing"
}, f = ({ cancelEditingLabel: i, confirmChangesLabel: t, inlineEditing: e, enableEditingLabel: a, enableEditingButtonRef: u, loading: c, onCancelEditing: h, onConfirmChanges: $, onEnableEditing: p, scale: l, showControls: E }) => s`<div class=${n(o.container)}>${!e && s`<calcite-action .ariaLabel=${a} class=${n(o.enableEditing)} icon=pencil @click=${p} .scale=${l} .text=${a} title=${a ?? r} type=button ${g(u)}></calcite-action>` || ""}${E && [
  s`<calcite-action .ariaLabel=${t} class=${n(o.confirmChanges)} .disabled=${c} icon=check .loading=${c} @click=${$} .scale=${l} .text=${t} title=${t ?? r} type=button></calcite-action>`,
  s`<calcite-action .ariaLabel=${i} class=${n(o.cancelEditing)} .disabled=${c} icon=x @click=${h} .scale=${l} .text=${i} title=${i ?? r} type=button></calcite-action>`
] || ""}</div>`, d = {
  editButton: "edit-button",
  input: "input"
};
class C {
  constructor(t) {
    this.options = t, this.valuePriorToEditing = "";
  }
  enable(t = d.input) {
    this.captureValuePriorToEditing(), this.options.setInlineEditing(!0), requestAnimationFrame(() => {
      this.options.setFocus(t);
    }), this.options.emitEnableEditingChange();
  }
  setCaretPosition(t, e) {
    e === d.editButton && t && t.selectionStart !== null && t.setSelectionRange(t.value.length, t.value.length);
  }
  captureValuePriorToEditing() {
    this.valuePriorToEditing = this.options.getValue();
  }
  disable() {
    this.options.setInlineEditing(!1);
  }
  cancelEditing() {
    this.options.restoreValue(this.valuePriorToEditing), this.disable(), this.options.emitCancel(), this.options.emitEnableEditingChange();
  }
  async confirm(t, e) {
    if (t) {
      e?.(!0);
      try {
        await t();
      } finally {
        e?.(!1);
      }
    }
    this.options.commitValue(), this.disable(), this.options.emitConfirm(), this.options.emitEnableEditingChange();
  }
}
const I = {
  fromAttribute(i) {
    return i === null ? !1 : i === "controls-disabled" ? i : !0;
  },
  toAttribute(i) {
    return i === !1 ? null : i === !0 ? "" : i;
  }
};
export {
  o as C,
  f as I,
  C as U,
  d as a,
  I as i
};
