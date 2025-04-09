import { c as x, L as k, u as y, h as r, j as p, s as a, x as s, E as i, C as I, d as E } from "./iframe.js";
import { l as w } from "./live.js";
import { e as h, n as d } from "./ref.js";
import { m as f, g as $ } from "./dom.js";
import { c as z, i as b, d as T, s as V, H as C } from "./form.js";
import { u as H, I as F } from "./interactive.js";
import { c as L, d as M, g as O } from "./label.js";
import { c as W, g as m } from "./component.js";
import { V as P } from "./Validation.js";
import { s as q } from "./input.js";
import { u as D } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
const n = {
  loader: "loader",
  clearButton: "clear-button",
  editingEnabled: "editing-enabled",
  inlineChild: "inline-child",
  inputIcon: "icon",
  prefix: "prefix",
  suffix: "suffix",
  wrapper: "element-wrapper",
  inputWrapper: "wrapper",
  actionWrapper: "action-wrapper"
}, g = {
  validationMessage: "inputTextValidationMessage"
}, S = {
  action: "action"
}, B = x`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input{padding-inline-start:.5rem;padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, .5rem)}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .prefix,:host([scale=s]) .suffix{padding-inline:.5rem}:host([scale=s]) .action-wrapper calcite-button,:host([scale=s]) .action-wrapper calcite-button button{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input{padding-inline-start:.75rem;padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, .75rem)}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .prefix,:host([scale=m]) .suffix{padding-inline:.75rem}:host([scale=m]) .action-wrapper calcite-button,:host([scale=m]) .action-wrapper calcite-button button{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input{padding-inline-start:1rem;padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, 1rem)}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .prefix,:host([scale=l]) .suffix{padding-inline:1rem}:host([scale=l]) .action-wrapper calcite-button,:host([scale=l]) .action-wrapper calcite-button button{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none;position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-radius:0;background-color:var(--calcite-color-foreground-1);font-family:inherit;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1)}input:placeholder-shown{text-overflow:ellipsis}input{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);color:var(--calcite-color-text-1)}input::placeholder,input:-ms-input-placeholder,input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-color-text-1)}input[readonly]{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}input[readonly]:focus{color:var(--calcite-color-text-1)}calcite-icon{color:var(--calcite-color-text-3)}input{outline-color:transparent}input:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([status=invalid]) input{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([scale=s]) .icon{inset-inline-start:.5rem}:host([scale=m]) .icon{inset-inline-start:.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);display:block;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}.clear-button{pointer-events:initial;order:4;margin:0;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);outline-color:transparent;border-inline-start-width:0px}.clear-button:hover{background-color:var(--calcite-color-foreground-2);transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.clear-button:hover calcite-icon{color:var(--calcite-color-text-1);transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.clear-button:active{background-color:var(--calcite-color-foreground-3)}.clear-button:active calcite-icon{color:var(--calcite-color-text-1)}.clear-button:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium);line-height:1;color:var(--calcite-color-text-2)}.prefix{order:2;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto)}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto)}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.input--no-bottom-border) input{border-block-end-width:0px}:host(.input--no-top-border) input{border-block-start-width:0px}:host(.input--no-right-border) input{border-inline-end:0}:host(.input--no-left-border) input{border-inline-start:0}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class U extends k {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.actionWrapperEl = h(), this.attributeWatch = y(["autofocus", "enterkeyhint", "inputmode", "spellcheck"], this.handleGlobalAttributesChanged), this.inputWrapperEl = h(), this.onHiddenFormInputInput = (e) => {
      e.target.name === this.name && this.setValue({
        value: e.target.value,
        origin: "direct"
      }), this.setFocus(), e.stopPropagation();
    }, this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.editingEnabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.messages = D(), this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
      valid: !1,
      badInput: !1,
      customError: !1,
      patternMismatch: !1,
      rangeOverflow: !1,
      rangeUnderflow: !1,
      stepMismatch: !1,
      tooLong: !1,
      tooShort: !1,
      typeMismatch: !1,
      valueMissing: !1
    }, this.calciteInputTextChange = r(), this.calciteInputTextInput = r(), this.calciteInternalInputTextBlur = r(), this.calciteInternalInputTextFocus = r(), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { slottedActionElDisabledInternally: 16, alignment: 3, autocomplete: 0, clearable: 7, disabled: 7, editingEnabled: 7, form: 3, icon: [3, { converter: p }], iconFlipRtl: 7, label: 1, loading: 7, maxLength: 11, messageOverrides: 0, minLength: 11, name: 3, pattern: 1, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, suffixText: 1, validationIcon: [3, { converter: p }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = B;
  }
  get isClearable() {
    return this.clearable && this.value.length > 0;
  }
  /** The component's value. */
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.valueWatcher(e, t));
  }
  // #endregion
  // #region Public Methods
  /** Selects the text of the component's `value`. */
  async selectText() {
    this.childEl?.select();
  }
  /** Sets focus on the component. */
  async setFocus() {
    await W(this), this.childEl?.focus();
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable"), this.inlineEditableEl && (this.editingEnabled = this.inlineEditableEl.editingEnabled || !1), L(this), z(this), this.el.addEventListener(b, this.onHiddenFormInputInput);
  }
  async load() {
    this.requestedIcon = f({}, this.icon, "text"), this.setPreviousEmittedValue(this.value), this.setPreviousValue(this.value);
  }
  willUpdate(e) {
    e.has("icon") && (this.requestedIcon = f({}, this.icon, "text"));
  }
  updated() {
    H(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), M(this), T(this), this.el.removeEventListener(b, this.onHiddenFormInputInput);
  }
  // #endregion
  // #region Private Methods
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  valueWatcher(e, t) {
    this.userChangedValue || this.setValue({
      origin: "direct",
      previousValue: t,
      value: e || ""
    }), this.userChangedValue = !1;
  }
  keyDownHandler(e) {
    this.readOnly || this.disabled || e.defaultPrevented || (this.isClearable && e.key === "Escape" && (this.clearInputTextValue(e), e.preventDefault()), e.key === "Enter" && V(this) && e.preventDefault());
  }
  onLabelClick() {
    this.setFocus();
  }
  clearInputTextValue(e) {
    this.setValue({
      committing: !0,
      nativeEvent: e,
      origin: "user",
      value: ""
    });
  }
  emitChangeIfUserModified() {
    this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue && (this.calciteInputTextChange.emit(), this.setPreviousEmittedValue(this.value));
  }
  inputTextBlurHandler() {
    this.calciteInternalInputTextBlur.emit({
      element: this.childEl,
      value: this.value
    }), this.emitChangeIfUserModified();
  }
  clickHandler(e) {
    if (this.disabled)
      return;
    const t = e.composedPath();
    !t.includes(this.inputWrapperEl.value) || t.includes(this.actionWrapperEl.value) || this.setFocus();
  }
  inputTextFocusHandler() {
    this.calciteInternalInputTextFocus.emit({
      element: this.childEl,
      value: this.value
    });
  }
  inputTextInputHandler(e) {
    this.disabled || this.readOnly || this.setValue({
      nativeEvent: e,
      origin: "user",
      value: e.target.value
    });
  }
  inputTextKeyDownHandler(e) {
    this.disabled || this.readOnly || e.key === "Enter" && this.emitChangeIfUserModified();
  }
  syncHiddenFormInput(e) {
    q("text", this, e);
  }
  setChildElRef(e) {
    this.childEl = e;
  }
  setInputValue(e) {
    this.childEl && (this.childEl.value = e);
  }
  setPreviousEmittedValue(e) {
    this.previousEmittedValue = e;
  }
  setPreviousValue(e) {
    this.previousValue = e;
  }
  setValue({ committing: e = !1, nativeEvent: t, origin: o, previousValue: c, value: l }) {
    this.setPreviousValue(c ?? this.value), this.previousValueOrigin = o, this.userChangedValue = o === "user" && l !== this.value, this.value = l, o === "direct" && (this.setInputValue(l), this.setPreviousEmittedValue(l)), t && (this.calciteInputTextInput.emit().defaultPrevented ? this.value = this.previousValue : e && this.emitChangeIfUserModified());
  }
  // #endregion
  // #region Rendering
  render() {
    const e = $(this.el), t = s`<div class=${a(n.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, o = s`<button .ariaLabel=${this.messages.clear} class=${a(n.clearButton)} .disabled=${this.disabled || this.readOnly} @click=${this.clearInputTextValue} tabindex=-1 type=button><calcite-icon icon=x .scale=${m(this.scale)}></calcite-icon></button>`, c = s`<calcite-icon class=${a(n.inputIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${m(this.scale)}></calcite-icon>`, l = s`<div class=${a(n.prefix)}>${this.prefixText}</div>`, u = s`<div class=${a(n.suffix)}>${this.suffixText}</div>`, v = s`<input aria-errormessage=${g.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${O(this)} autocomplete=${this.autocomplete ?? i} .autofocus=${this.el.autofocus} class=${a({
      [n.editingEnabled]: this.editingEnabled,
      [n.inlineChild]: !!this.inlineEditableEl
    })} value=${this.defaultValue ?? i} .disabled=${this.disabled ? !0 : null} enterkeyhint=${this.el.enterKeyHint ?? i} inputmode=${this.el.inputMode ?? i} maxlength=${this.maxLength ?? i} minlength=${this.minLength ?? i} name=${this.name ?? i} @blur=${this.inputTextBlurHandler} @focus=${this.inputTextFocusHandler} @input=${this.inputTextInputHandler} @keydown=${this.inputTextKeyDownHandler} pattern=${this.pattern ?? i} placeholder=${(this.placeholder || "") ?? i} .readOnly=${this.readOnly} .required=${this.required ? !0 : null} spellcheck=${this.el.spellcheck ?? i} tabindex=${(this.disabled || this.inlineEditableEl && !this.editingEnabled ? -1 : null) ?? i} type=text .value=${w(this.value ?? "")} ${d(this.setChildElRef)}>`;
    return F({ disabled: this.disabled, children: s`<div class=${a({ [n.inputWrapper]: !0, [I.rtl]: e === "rtl" })} ${d(this.inputWrapperEl)}>${this.prefixText ? l : null}<div class=${a(n.wrapper)}>${v}${this.isClearable ? o : null}${this.requestedIcon ? c : null}${this.loading ? t : null}</div><div class=${a(n.actionWrapper)} ${d(this.actionWrapperEl)}><slot name=${S.action}></slot></div>${this.suffixText ? u : null}${C({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? P({ icon: this.validationIcon, id: g.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
E("calcite-input-text", U);
export {
  U as InputText
};
