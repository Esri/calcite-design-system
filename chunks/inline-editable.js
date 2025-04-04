import { c as r, L as h, h as a, s as i, k as b, E as s, x as l, d as u } from "./iframe.js";
import { e as c, n as o } from "./ref.js";
import { u as p, I as g } from "./interactive.js";
import { c as E, d as f, g as m } from "./label.js";
import { c as y } from "./component.js";
import { d as k } from "./dom.js";
import { u as C } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
const $ = r`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) .controls-wrapper{block-size:1.5rem}:host([scale=m]) .controls-wrapper{block-size:2rem}:host([scale=l]) .controls-wrapper{block-size:2.75rem}.wrapper{box-sizing:border-box;display:flex;justify-content:space-between;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-inline-editable-background-color, var(--calcite-color-foreground-1))}.wrapper .input-wrapper{flex:1 1 0%}:host(:not([editing-enabled]):not([disabled])) .wrapper:hover{background-color:var(--calcite-inline-editable-background-color-hover, var(--calcite-color-foreground-2))}.controls-wrapper{display:flex}calcite-button{--calcite-button-background-color: var(--calcite-inline-editable-button-background-color);--calcite-button-corner-radius: var(--calcite-inline-editable-button-corner-radius);--calcite-button-loader-color: var(--calcite-inline-editable-button-loader-color);--calcite-button-shadow-color: var(--calcite-inline-editable-button-shadow-color);--calcite-button-text-color: var(--calcite-inline-editable-button-text-color)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`, n = {
  wrapper: "wrapper",
  confirmChangesButton: "confirm-changes-button",
  cancelEditingButton: "cancel-editing-button",
  inputWrapper: "input-wrapper",
  cancelEditingButtonWrapper: "cancel-editing-button-wrapper",
  enableEditingButton: "enable-editing-button",
  controlsWrapper: "controls-wrapper"
};
class v extends h {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.cancelEditingButton = c(), this.confirmEditingButton = c(), this._editingEnabled = !1, this.enableEditingButton = c(), this.controls = !1, this.disabled = !1, this.loading = !1, this.messages = C(), this.calciteInlineEditableEditCancel = a({ cancelable: !1 }), this.calciteInlineEditableEditConfirm = a({ cancelable: !1 }), this.calciteInternalInlineEditableEnableEditingChange = a({ cancelable: !1 }), this.listen("calciteInternalInputBlur", this.blurHandler);
  }
  static {
    this.properties = { afterConfirm: 0, controls: 7, disabled: 7, editingEnabled: 7, loading: 7, messageOverrides: 0, scale: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = $;
  }
  get shouldShowControls() {
    return this.editingEnabled && this.controls;
  }
  /** When `true`, inline editing is enabled on the component. */
  get editingEnabled() {
    return this._editingEnabled;
  }
  set editingEnabled(t) {
    const e = this._editingEnabled;
    t !== e && (this._editingEnabled = t, this.editingEnabledWatcher(t, e));
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await y(this), this.inputElement?.setFocus();
  }
  connectedCallback() {
    super.connectedCallback(), E(this);
  }
  willUpdate(t) {
    t.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.disabledWatcher(this.disabled);
  }
  updated() {
    p(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), f(this);
  }
  // #endregion
  // #region Private Methods
  disabledWatcher(t) {
    this.inputElement && (this.inputElement.disabled = t);
  }
  editingEnabledWatcher(t, e) {
    this.inputElement && (this.inputElement.editingEnabled = t), !t && e && (this.shouldEmitCancel = !0);
  }
  blurHandler() {
    this.controls || this.disableEditing();
  }
  async handleDefaultSlotChange(t) {
    const e = k(t).filter((d) => d.matches("calcite-input"))[0];
    this.inputElement = e, e && (await e.componentOnReady(), e.editingEnabled = this.editingEnabled, e.disabled = this.disabled, e.label = e.label || m(this), this.scale = this.scale || this.inputElement?.scale || "m");
  }
  onLabelClick() {
    this.setFocus();
  }
  enableEditing() {
    this.valuePriorToEditing = this.inputElement?.value, this.editingEnabled = !0, this.inputElement?.setFocus(), this.calciteInternalInlineEditableEnableEditingChange.emit();
  }
  disableEditing() {
    this.editingEnabled = !1;
  }
  cancelEditing() {
    this.inputElement && (this.inputElement.value = this.valuePriorToEditing), this.disableEditing(), this.enableEditingButton.value?.setFocus(), !this.editingEnabled && this.shouldEmitCancel && this.calciteInlineEditableEditCancel.emit();
  }
  async escapeKeyHandler(t) {
    t.defaultPrevented || (t.key === "Escape" && (t.preventDefault(), this.cancelEditing()), t.key === "Tab" && this.shouldShowControls && (!t.shiftKey && t.target === this.inputElement && (t.preventDefault(), this.cancelEditingButton.value.setFocus()), t.shiftKey && t.target === this.cancelEditingButton.value && (t.preventDefault(), this.inputElement?.setFocus())));
  }
  async cancelEditingHandler(t) {
    t.preventDefault(), this.cancelEditing();
  }
  async enableEditingHandler(t) {
    this.disabled || t.target !== this.enableEditingButton.value && t.target !== this.inputElement || (t.preventDefault(), this.editingEnabled || this.enableEditing());
  }
  async confirmChangesHandler(t) {
    t.preventDefault(), this.calciteInlineEditableEditConfirm.emit();
    try {
      this.afterConfirm && (this.loading = !0, await this.afterConfirm(), this.disableEditing(), this.enableEditingButton.value.setFocus());
    } catch {
    } finally {
      this.loading = !1;
    }
  }
  // #endregion
  // #region Rendering
  render() {
    return g({ disabled: this.disabled, children: l`<div class=${i(n.wrapper)} @click=${this.enableEditingHandler} @keydown=${this.escapeKeyHandler}><div class=${i(n.inputWrapper)}><slot @slotchange=${this.handleDefaultSlotChange}></slot></div><div class=${i(n.controlsWrapper)}><calcite-button appearance=transparent class=${i(n.enableEditingButton)} .disabled=${this.disabled} icon-start=pencil kind=neutral .label=${this.messages.enableEditing} @click=${this.enableEditingHandler} .scale=${this.scale} style=${b({
      opacity: this.editingEnabled ? "0" : "1",
      width: this.editingEnabled ? "0" : "inherit"
    })} title=${this.messages.enableEditing ?? s} type=button ${o(this.enableEditingButton)}></calcite-button>${this.shouldShowControls && [
      l`<div class=${i(n.cancelEditingButtonWrapper)}><calcite-button appearance=transparent class=${i(n.cancelEditingButton)} .disabled=${this.disabled} icon-start=x kind=neutral .label=${this.messages.cancelEditing} @click=${this.cancelEditingHandler} .scale=${this.scale} title=${this.messages.cancelEditing ?? s} type=button ${o(this.cancelEditingButton)}></calcite-button></div>`,
      l`<calcite-button appearance=solid class=${i(n.confirmChangesButton)} .disabled=${this.disabled} icon-start=check kind=brand .label=${this.messages.confirmChanges} .loading=${this.loading} @click=${this.confirmChangesHandler} .scale=${this.scale} title=${this.messages.confirmChanges ?? s} type=button ${o(this.confirmEditingButton)}></calcite-button>`
    ] || ""}</div></div>` });
  }
}
u("calcite-inline-editable", v);
export {
  v as InlineEditable
};
