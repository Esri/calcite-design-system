/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { s as e, A as r, b as s } from "./index.js";
import { n as m } from "./ref.js";
const o = {
  container: "inline-edit--container",
  enableEditing: "enable-editing",
  confirmChanges: "confirm-changes",
  cancelEditing: "cancel-editing"
}, g = ({ cancelEditingLabel: i, confirmChangesLabel: t, inlineEditing: n, enableEditingLabel: a, enableEditingButtonRef: $, loading: c, onCancelEditing: d, onConfirmChanges: h, onEnableEditing: p, scale: l, showControls: u }) => s`<div class=${e(o.container)}>${!n && s`<calcite-action .ariaLabel=${a} class=${e(o.enableEditing)} icon=pencil @click=${p} .scale=${l} .text=${a} title=${a ?? r} type=button ${m($)}></calcite-action>` || ""}${u && [
  s`<calcite-action .ariaLabel=${t} class=${e(o.confirmChanges)} .disabled=${c} icon=check .loading=${c} @click=${h} .scale=${l} .text=${t} title=${t ?? r} type=button></calcite-action>`,
  s`<calcite-action .ariaLabel=${i} class=${e(o.cancelEditing)} .disabled=${c} icon=x @click=${d} .scale=${l} .text=${i} title=${i ?? r} type=button></calcite-action>`
] || ""}</div>`;
class f {
  constructor(t) {
    this.options = t, this.valuePriorToEditing = "";
  }
  enable() {
    this.valuePriorToEditing = this.options.getValue(), this.options.setInlineEditing(!0), requestAnimationFrame(() => {
      this.options.setFocus();
    }), this.options.emitEnableEditingChange();
  }
  disable() {
    this.options.setInlineEditing(!1);
  }
  cancelEditing() {
    this.options.restoreValue(this.valuePriorToEditing), this.disable(), this.options.emitCancel(), this.options.emitEnableEditingChange();
  }
  async confirm(t, n) {
    if (t) {
      n?.(!0);
      try {
        await t();
      } finally {
        n?.(!1);
      }
    }
    this.options.commitValue(), this.disable(), this.options.emitConfirm(), this.options.emitEnableEditingChange();
  }
}
const C = {
  fromAttribute(i) {
    return i === null ? !1 : i === "controls-disabled" ? i : !0;
  },
  toAttribute(i) {
    return i === !1 ? null : i === !0 ? "" : i;
  }
};
export {
  o as C,
  g as I,
  f as U,
  C as i
};
