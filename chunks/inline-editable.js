/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as p, L as f, c, I as o, s as n, b as r, d as E } from "./index.js";
import { e as d, n as h } from "./ref.js";
import { g as m } from "./label.js";
import { u as v } from "./useLabel.js";
import { b as C } from "./dom.js";
import { u as y } from "./useT9n.js";
import { u as k } from "./useSetFocus.js";
import { u as $ } from "./useInteractive.js";
const x = p`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) .controls-wrapper{block-size:1.5rem}:host([scale=m]) .controls-wrapper{block-size:2rem}:host([scale=l]) .controls-wrapper{block-size:2.75rem}.wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;box-sizing:border-box;display:flex;justify-content:space-between;background-color:var(--calcite-inline-editable-background-color, var(--calcite-color-foreground-1))}.wrapper .input-wrapper{flex:1 1 0%}:host(:not([editing-enabled]):not([disabled])) .wrapper:hover{background-color:var(--calcite-inline-editable-background-color-hover, var(--calcite-color-foreground-2))}.controls-wrapper{display:flex}.enable-editing-button--hidden{pointer-events:none;opacity:0;inline-size:0}.enable-editing-button{--calcite-action-text-color: var(--calcite-inline-editable-button-text-color, var(--calcite-color-text-1))}.enable-editing-button,.confirm-changes-button,.cancel-editing-button{margin-inline-start:var(--calcite-space-2xs)}calcite-action{--calcite-action-background-color: var(--calcite-inline-editable-button-background-color);--calcite-action-corner-radius: var(--calcite-inline-editable-button-corner-radius);--calcite-action-loader-color: var(--calcite-inline-editable-button-loader-color);--calcite-action-text-color: var(--calcite-inline-editable-button-text-color)}calcite-action:hover{--calcite-action-background-color-hover: var( --calcite-inline-editable-button-background-color-hover, var(--calcite-inline-editable-button-background-color) );--calcite-action-text-color-press: var( --calcite-inline-editable-button-text-color-press, var(--calcite-inline-editable-button-text-color) )}calcite-action:active{--calcite-action-background-color-press: var( --calcite-inline-editable-button-background-color-press, var(--calcite-inline-editable-button-background-color) );--calcite-action-text-color-press: var( --calcite-inline-editable-button-text-color-press, var(--calcite-inline-editable-button-text-color) )}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`, i = {
  wrapper: "wrapper",
  confirmChangesButton: "confirm-changes-button",
  cancelEditingButton: "cancel-editing-button",
  inputWrapper: "input-wrapper",
  cancelEditingButtonWrapper: "cancel-editing-button-wrapper",
  enableEditingButton: "enable-editing-button",
  enableEditingButtonHidden: "enable-editing-button--hidden",
  controlsWrapper: "controls-wrapper"
}, u = {
  check: "check",
  close: "x",
  pencil: "pencil"
};
class B extends f {
  constructor() {
    super(), this.cancelEditingButtonRef = d(), this.confirmChangesButtonRef = d(), this._editingEnabled = !1, this.enableEditingButtonRef = d(), this.shouldEmitCancel = !1, this.valuePriorToEditing = "", this.messages = y(), this.focusSetter = k()(this), this.interactiveContainer = $(this), this.controls = !1, this.disabled = !1, this.loading = !1, this.scale = "m", this.calciteInlineEditableEditCancel = c({ cancelable: !1 }), this.calciteInlineEditableEditConfirm = c({ cancelable: !1 }), this.calciteInternalInlineEditableEnableEditingChange = c({ cancelable: !1 }), v(this), this.listen("calciteInternalInputBlur", this.blurHandler), this.listen("calciteInternalInputNumberBlur", this.blurHandler), this.listen("calciteInternalInputTextBlur", this.blurHandler), this.listen("keydown", this.escapeKeyHandler);
  }
  static {
    this.properties = { afterConfirm: 0, controls: 7, disabled: 7, editingEnabled: 7, loading: 7, messageOverrides: 0, scale: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = x;
  }
  get shouldShowControls() {
    return this.editingEnabled && this.controls;
  }
  get editingEnabled() {
    return this._editingEnabled;
  }
  set editingEnabled(t) {
    const e = this._editingEnabled;
    t !== e && (this._editingEnabled = t, this.editingEnabledWatcher(t, e));
  }
  async setFocus(t) {
    return this.focusSetter(() => this.inputEl, t);
  }
  editingEnabledWatcher(t, e) {
    this.inputEl && (this.inputEl.editingEnabled = t), !t && e && (this.shouldEmitCancel = !0);
  }
  blurHandler() {
    this.controls || this.disableEditing();
  }
  async handleDefaultSlotChange(t) {
    const e = C(t).filter((a) => a.matches("calcite-input, calcite-input-number, calcite-input-text"))[0];
    this.inputEl = e, e && (await e.componentOnReady(), e.editingEnabled = this.editingEnabled, e.label = e.label || m(this));
  }
  onLabelClick() {
    this.setFocus();
  }
  enableEditing() {
    this.valuePriorToEditing = this.inputEl?.value ?? "", this.editingEnabled = !0, this.inputEl?.setFocus(), this.calciteInternalInlineEditableEnableEditingChange.emit();
  }
  disableEditing() {
    this.editingEnabled = !1;
  }
  cancelEditing() {
    this.inputEl && (this.inputEl.value = this.valuePriorToEditing), this.disableEditing(), this.enableEditingButtonRef.value?.setFocus(), !this.editingEnabled && this.shouldEmitCancel && this.calciteInlineEditableEditCancel.emit();
  }
  escapeKeyHandler(t) {
    if (!t.defaultPrevented && (t.key === "Escape" && (t.preventDefault(), this.cancelEditing()), t.key === "Tab" && this.shouldShowControls)) {
      const e = this.confirmChangesButtonRef.value, a = this.cancelEditingButtonRef.value, l = t.composedPath(), g = this.inputEl ? l.includes(this.inputEl) : !1, s = e ? l.includes(e) : !1, b = a ? l.includes(a) : !1;
      !t.shiftKey && s && (t.preventDefault(), a?.setFocus()), !t.shiftKey && (g || !s && !b) && (t.preventDefault(), e?.setFocus()), t.shiftKey && b && (t.preventDefault(), e?.setFocus()), t.shiftKey && s && (t.preventDefault(), this.inputEl?.setFocus());
    }
  }
  async cancelEditingHandler(t) {
    t.preventDefault(), this.cancelEditing();
  }
  enableEditingHandler(t) {
    this.disabled || t.target !== this.enableEditingButtonRef.value && t.target !== this.inputEl || (t.preventDefault(), this.editingEnabled || this.enableEditing());
  }
  async confirmChangesHandler(t) {
    t.preventDefault(), this.calciteInlineEditableEditConfirm.emit();
    try {
      this.afterConfirm && (this.loading = !0, await this.afterConfirm(), this.disableEditing(), this.enableEditingButtonRef.value?.setFocus());
    } catch {
    } finally {
      this.loading = !1;
    }
  }
  render() {
    return this.interactiveContainer({ disabled: this.disabled, children: r`<div class=${n(i.wrapper)} @click=${this.enableEditingHandler}><div class=${n(i.inputWrapper)}><slot @slotchange=${this.handleDefaultSlotChange}></slot></div><div class=${n(i.controlsWrapper)}><calcite-action .ariaLabel=${this.messages.enableEditing} class=${n({
      [i.enableEditingButton]: !0,
      [i.enableEditingButtonHidden]: this.editingEnabled
    })} .icon=${u.pencil} @click=${this.enableEditingHandler} .scale=${this.scale} .text=${this.messages.enableEditing} title=${this.messages.enableEditing ?? o} type=button ${h(this.enableEditingButtonRef)}></calcite-action>${this.shouldShowControls && [
      r`<calcite-action .ariaLabel=${this.messages.confirmChanges} class=${n(i.confirmChangesButton)} .icon=${u.check} .loading=${this.loading} @click=${this.confirmChangesHandler} .scale=${this.scale} .text=${this.messages.confirmChanges} title=${this.messages.confirmChanges ?? o} type=button ${h(this.confirmChangesButtonRef)}></calcite-action>`,
      r`<div class=${n(i.cancelEditingButtonWrapper)}><calcite-action .ariaLabel=${this.messages.cancelEditing} class=${n(i.cancelEditingButton)} .icon=${u.close} @click=${this.cancelEditingHandler} .scale=${this.scale} .text=${this.messages.cancelEditing} title=${this.messages.cancelEditing ?? o} type=button ${h(this.cancelEditingButtonRef)}></calcite-action></div>`
    ] || ""}</div></div>` });
  }
}
E("calcite-inline-editable", B);
export {
  B as InlineEditable
};
