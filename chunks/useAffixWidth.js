/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { s as r, A as f, b as l } from "./index.js";
import { n as $ } from "./ref.js";
import { m } from "./index2.js";
const c = {
  container: "inline-edit--container",
  enableEditing: "enable-editing",
  confirmChanges: "confirm-changes",
  cancelEditing: "cancel-editing"
}, y = ({ cancelEditingLabel: i, confirmChangesLabel: t, inlineEditing: e, enableEditingLabel: s, enableEditingButtonRef: n, loading: a, onCancelEditing: o, onConfirmChanges: u, onEnableEditing: g, scale: d, showControls: p }) => l`<div class=${r(c.container)}>${!e && l`<calcite-action .ariaLabel=${s} class=${r(c.enableEditing)} icon=pencil @click=${g} .scale=${d} .text=${s} title=${s ?? f} type=button ${$(n)}></calcite-action>` || ""}${p && [
  l`<calcite-action .ariaLabel=${t} class=${r(c.confirmChanges)} .disabled=${a} icon=check .loading=${a} @click=${u} .scale=${d} .text=${t} title=${t ?? f} type=button></calcite-action>`,
  l`<calcite-action .ariaLabel=${i} class=${r(c.cancelEditing)} .disabled=${a} icon=x @click=${o} .scale=${d} .text=${i} title=${i ?? f} type=button></calcite-action>`
] || ""}</div>`, h = {
  editButton: "edit-button",
  input: "input"
};
class T {
  constructor(t) {
    this.options = t, this.valuePriorToEditing = "";
  }
  enable(t = h.input) {
    this.captureValuePriorToEditing(), this.options.setInlineEditing(!0), requestAnimationFrame(() => {
      this.options.setFocus(t);
    }), this.options.emitEnableEditingChange();
  }
  setCaretPosition(t, e) {
    e === h.editButton && t && t.selectionStart !== null && t.setSelectionRange(t.value.length, t.value.length);
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
}, x = {
  prefix: "--calcite-internal-input-affix-prefix-width",
  suffix: "--calcite-internal-input-affix-suffix-width"
}, P = (i = {}) => {
  const t = [
    "prefixText",
    "scale",
    "suffixText",
    ...i.trailingWidthProperties ?? []
  ];
  return m((e, s) => (s.onUpdated((n) => {
    t.some((a) => n.has(a)) && e.calciteInternalAffixChange.emit();
  }), {
    getAffixWidth: (n) => Math.ceil(e[`${n}Ref`].value?.getBoundingClientRect().width ?? 0),
    getTrailingWidth: (n) => i.getTrailingWidth?.(n) ?? 0,
    setAffixWidth: (n, a) => {
      const o = x[n];
      if (a === void 0) {
        e.el.style.removeProperty(o);
        return;
      }
      e.el.style.setProperty(o, `${a}px`);
    },
    trailingWidthReady: async () => {
      await i.trailingWidthReady?.();
    }
  }));
};
export {
  c as C,
  y as I,
  T as U,
  h as a,
  I as i,
  P as u
};
