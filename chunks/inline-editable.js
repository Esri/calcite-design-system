import { b as u, L as b, c as a, s as n, z as l, x as s, q as h } from "./index.js";
import { e as o, n as r } from "./ref.js";
import { u as p, I as g } from "./interactive.js";
import { c as E, d as f, g as m } from "./label.js";
import { d as k } from "./dom.js";
import { u as v } from "./useT9n.js";
import { u as y } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const C = u`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) .controls-wrapper{block-size:1.5rem}:host([scale=m]) .controls-wrapper{block-size:2rem}:host([scale=l]) .controls-wrapper{block-size:2.75rem}.wrapper{box-sizing:border-box;display:flex;justify-content:space-between;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-inline-editable-background-color, var(--calcite-color-foreground-1))}.wrapper .input-wrapper{flex:1 1 0%}:host(:not([editing-enabled]):not([disabled])) .wrapper:hover{background-color:var(--calcite-inline-editable-background-color-hover, var(--calcite-color-foreground-2))}.controls-wrapper{display:flex}.cancel-editing-button[appearance=transparent][kind=neutral]{--calcite-internal-button-text-color: var(--calcite-color-text-3);--calcite-internal-button-border-block-start-color: var(--calcite-color-border-input);--calcite-internal-button-border-block-end-color: var(--calcite-color-border-input)}.cancel-editing-button[appearance=transparent][kind=neutral]:hover{--calcite-internal-button-text-color: var(--calcite-color-text-1)}.enable-editing-button--hidden{pointer-events:none;opacity:0;inline-size:0}.enable-editing-button[appearance=transparent][kind=neutral]{--calcite-internal-button-background-color: transparent}calcite-button{--calcite-button-background-color: var(--calcite-inline-editable-button-background-color);--calcite-button-corner-radius: var(--calcite-inline-editable-button-corner-radius);--calcite-button-loader-color: var(--calcite-inline-editable-button-loader-color);--calcite-button-shadow-color: var(--calcite-inline-editable-button-shadow-color);--calcite-button-text-color: var(--calcite-inline-editable-button-text-color)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`, i = {
  wrapper: "wrapper",
  confirmChangesButton: "confirm-changes-button",
  cancelEditingButton: "cancel-editing-button",
  inputWrapper: "input-wrapper",
  cancelEditingButtonWrapper: "cancel-editing-button-wrapper",
  enableEditingButton: "enable-editing-button",
  enableEditingButtonHidden: "enable-editing-button--hidden",
  controlsWrapper: "controls-wrapper"
}, c = {
  check: "check",
  close: "x",
  pencil: "pencil"
};
class $ extends b {
  constructor() {
    super(), this.cancelEditingButtonRef = o(), this._editingEnabled = !1, this.enableEditingButtonRef = o(), this.messages = v(), this.focusSetter = y()(this), this.controls = !1, this.disabled = !1, this.loading = !1, this.scale = "m", this.calciteInlineEditableEditCancel = a({ cancelable: !1 }), this.calciteInlineEditableEditConfirm = a({ cancelable: !1 }), this.calciteInternalInlineEditableEnableEditingChange = a({ cancelable: !1 }), this.listen("calciteInternalInputBlur", this.blurHandler);
  }
  static {
    this.properties = { afterConfirm: 0, controls: 7, disabled: 7, editingEnabled: 7, loading: 7, messageOverrides: 0, scale: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = C;
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
  connectedCallback() {
    super.connectedCallback(), E(this);
  }
  updated() {
    p(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), f(this);
  }
  get shouldShowControls() {
    return this.editingEnabled && this.controls;
  }
  editingEnabledWatcher(t, e) {
    this.inputEl && (this.inputEl.editingEnabled = t), !t && e && (this.shouldEmitCancel = !0);
  }
  blurHandler() {
    this.controls || this.disableEditing();
  }
  async handleDefaultSlotChange(t) {
    const e = k(t).filter((d) => d.matches("calcite-input"))[0];
    this.inputEl = e, e && (await e.componentOnReady(), e.editingEnabled = this.editingEnabled, e.label = e.label || m(this));
  }
  onLabelClick() {
    this.setFocus();
  }
  enableEditing() {
    this.valuePriorToEditing = this.inputEl?.value, this.editingEnabled = !0, this.inputEl?.setFocus(), this.calciteInternalInlineEditableEnableEditingChange.emit();
  }
  disableEditing() {
    this.editingEnabled = !1;
  }
  cancelEditing() {
    this.inputEl && (this.inputEl.value = this.valuePriorToEditing), this.disableEditing(), this.enableEditingButtonRef.value?.setFocus(), !this.editingEnabled && this.shouldEmitCancel && this.calciteInlineEditableEditCancel.emit();
  }
  escapeKeyHandler(t) {
    t.defaultPrevented || (t.key === "Escape" && (t.preventDefault(), this.cancelEditing()), t.key === "Tab" && this.shouldShowControls && (!t.shiftKey && t.target === this.inputEl && (t.preventDefault(), this.cancelEditingButtonRef.value.setFocus()), t.shiftKey && t.target === this.cancelEditingButtonRef.value && (t.preventDefault(), this.inputEl?.setFocus())));
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
    return g({ disabled: this.disabled, children: s`<div class=${n(i.wrapper)} @click=${this.enableEditingHandler} @keydown=${this.escapeKeyHandler}><div class=${n(i.inputWrapper)}><slot @slotchange=${this.handleDefaultSlotChange}></slot></div><div class=${n(i.controlsWrapper)}><calcite-button appearance=transparent class=${n({
      [i.enableEditingButton]: !0,
      [i.enableEditingButtonHidden]: this.editingEnabled
    })} .iconStart=${c.pencil} kind=neutral .label=${this.messages.enableEditing} @click=${this.enableEditingHandler} .scale=${this.scale} title=${this.messages.enableEditing ?? l} type=button ${r(this.enableEditingButtonRef)}></calcite-button>${this.shouldShowControls && [
      s`<div class=${n(i.cancelEditingButtonWrapper)}><calcite-button appearance=transparent class=${n(i.cancelEditingButton)} .iconStart=${c.close} kind=neutral .label=${this.messages.cancelEditing} @click=${this.cancelEditingHandler} .scale=${this.scale} title=${this.messages.cancelEditing ?? l} type=button ${r(this.cancelEditingButtonRef)}></calcite-button></div>`,
      s`<calcite-button appearance=solid class=${n(i.confirmChangesButton)} .iconStart=${c.check} kind=brand .label=${this.messages.confirmChanges} .loading=${this.loading} @click=${this.confirmChangesHandler} .scale=${this.scale} title=${this.messages.confirmChanges ?? l} type=button></calcite-button>`
    ] || ""}</div></div>` });
  }
}
h("calcite-inline-editable", $);
export {
  $ as InlineEditable
};
