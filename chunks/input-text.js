import { b as x, L as k, c as s, u as h, s as n, x as l, E as i, C as y, q as I } from "./index.js";
import { l as w } from "./live.js";
import { e as d, n as u } from "./ref.js";
import { u as $ } from "./index2.js";
import { m as b, a as z } from "./dom.js";
import { c as T, i as f, d as E, s as V, H as C } from "./form.js";
import { u as H, I as F } from "./interactive.js";
import { c as L, d as R, g as M } from "./label.js";
import { g as m } from "./component.js";
import { I as q } from "./InternalLabel.js";
import { V as O } from "./Validation.js";
import { s as S } from "./input.js";
import { u as W } from "./useT9n.js";
import { u as P } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const a = {
  loader: "loader",
  clearable: "clearable",
  clearButton: "clear-button",
  editingEnabled: "editing-enabled",
  inlineChild: "inline-child",
  inputIcon: "icon",
  prefix: "prefix",
  suffix: "suffix",
  wrapper: "element-wrapper",
  inputWrapper: "wrapper",
  actionWrapper: "action-wrapper"
}, v = {
  validationMessage: "inputTextValidationMessage"
}, D = {
  action: "action"
}, B = x`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input{padding-inline-start:.5rem;padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, .5rem)}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .prefix,:host([scale=s]) .suffix{padding-inline:.5rem}:host([scale=s]) .action-wrapper{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input{padding-inline-start:.75rem;padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, .75rem)}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .prefix,:host([scale=m]) .suffix{padding-inline:.75rem}:host([scale=m]) .action-wrapper{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input{padding-inline-start:1rem;padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, 1rem)}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .prefix,:host([scale=l]) .suffix{padding-inline:1rem}:host([scale=l]) .action-wrapper{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none;position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-width:1px;border-style:solid;font-family:inherit;font-weight:var(--calcite-font-weight-normal);background-color:var(--calcite-input-text-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-text-text-color, var(--calcite-color-text-1));border-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp));border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input));text-align:var(--calcite-internal-input-text-alignment)}input:placeholder-shown{text-overflow:ellipsis}input::placeholder,input:-ms-input-placeholder,input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-number-placeholder-text-color, var(--calcite-color-text-3))}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-text-text-color-focus, var(--calcite-color-text-1))}input[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-text-background-color, var(--calcite-color-background))}input[readonly]:focus{color:var(--calcite-input-text-text-color-focus, var(--calcite-color-text-1))}calcite-icon{color:var(--calcite-input-action-icon-color, var(--calcite-color-text-3))}input{outline-color:transparent}input:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([status=invalid]) input{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([scale=s]) .icon{inset-inline-start:.5rem}:host([scale=m]) .icon{inset-inline-start:.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center;isolation:isolate}.icon{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);display:block;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-text-icon-color, var(--calcite-color-text-3))}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}.clear-button{pointer-events:initial;order:4;margin:0;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;outline-color:transparent;border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-action-background-color, var(--calcite-color-foreground-1));border-inline-start-width:0px}.clear-button:hover{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-action-background-color-hover, var(--calcite-color-foreground-2))}.clear-button:hover calcite-icon{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-action-icon-color-hover, var(--calcite-color-text-1))}.clear-button:active{background-color:var(--calcite-input-action-background-color-press, var(--calcite-color-foreground-3))}.clear-button:active calcite-icon{color:var(--calcite-input-action-icon-color-press, --calcite-color-text-1)}.clear-button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.loader calcite-progress{--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;font-weight:var(--calcite-font-weight-medium);line-height:1;border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input))}.prefix{order:2;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size-x, auto);background-color:var(--calcite-input-prefix-background-color, var(--calcite-color-background));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2));border-start-start-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size-x, auto);background-color:var(--calcite-input-suffix-background-color, var(--calcite-color-background));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2));border-start-end-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp));border-end-end-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp))}:host([prefix-text]:not([prefix-text=""])) input{border-start-start-radius:0;border-end-start-radius:0}:host([suffix-text]:not([suffix-text=""])) input,:host .clearable input{border-start-end-radius:0;border-end-end-radius:0}:host(:not([suffix-text])) .clear-button,:host([suffix-text=""]) .clear-button{border-start-end-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp));border-end-end-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp))}:host([alignment=start]){--calcite-internal-input-text-alignment: start}:host([alignment=center]){--calcite-internal-input-text-alignment: center}:host([alignment=end]){--calcite-internal-input-text-alignment: end}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.input--no-bottom-border) input{border-block-end-width:0px}:host(.input--no-top-border) input{border-block-start-width:0px}:host(.input--no-right-border) input{border-inline-end:0}:host(.input--no-left-border) input{border-inline-start:0}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}`;
class U extends k {
  constructor() {
    super(), this.actionWrapperRef = d(), this.attributeWatch = $(["autofocus", "enterkeyhint", "inputmode", "spellcheck"], this.handleGlobalAttributesChanged), this.childRef = d(), this.inputWrapperRef = d(), this.onHiddenFormInputInput = (e) => {
      e.target.name === this.name && this.setValue({
        value: e.target.value,
        origin: "direct"
      }), this.setFocus(), e.stopPropagation();
    }, this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.messages = W(), this.focusSetter = P()(this), this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.editingEnabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.calciteInputTextChange = s(), this.calciteInputTextInput = s(), this.calciteInternalInputTextBlur = s(), this.calciteInternalInputTextFocus = s(), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { slottedActionElDisabledInternally: 16, alignment: 3, autocomplete: 0, clearable: 7, disabled: 7, editingEnabled: 7, form: 3, icon: [3, { converter: h, type: String }], iconFlipRtl: 7, label: 1, labelText: 1, loading: 7, maxLength: 11, messageOverrides: 0, minLength: 11, name: 3, pattern: 1, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, suffixText: 1, validationIcon: [3, { converter: h, type: String }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = B;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.valueWatcher(e, t));
  }
  async selectText() {
    this.childRef.value?.select();
  }
  async setFocus(e) {
    return this.focusSetter(() => this.childRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable"), this.inlineEditableEl && (this.editingEnabled = this.inlineEditableEl.editingEnabled || !1), L(this), T(this), this.el.addEventListener(f, this.onHiddenFormInputInput);
  }
  async load() {
    this.requestedIcon = b({}, this.icon, "text"), this.setPreviousEmittedValue(this.value), this.setPreviousValue(this.value);
  }
  willUpdate(e) {
    e.has("icon") && (this.requestedIcon = b({}, this.icon, "text"));
  }
  updated() {
    H(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), R(this), E(this), this.el.removeEventListener(f, this.onHiddenFormInputInput);
  }
  get isClearable() {
    return this.clearable && this.value.length > 0;
  }
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
      element: this.childRef.value,
      value: this.value
    }), this.emitChangeIfUserModified();
  }
  clickHandler(e) {
    if (this.disabled)
      return;
    const t = e.composedPath();
    !t.includes(this.inputWrapperRef.value) || t.includes(this.actionWrapperRef.value) || this.setFocus();
  }
  inputTextFocusHandler() {
    this.calciteInternalInputTextFocus.emit({
      element: this.childRef.value,
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
    S("text", this, e);
  }
  setInputValue(e) {
    this.childRef.value && (this.childRef.value.value = e);
  }
  setPreviousEmittedValue(e) {
    this.previousEmittedValue = e;
  }
  setPreviousValue(e) {
    this.previousValue = e;
  }
  setValue({ committing: e = !1, nativeEvent: t, origin: o, previousValue: c, value: r }) {
    this.setPreviousValue(c ?? this.value), this.previousValueOrigin = o, this.userChangedValue = o === "user" && r !== this.value, this.value = r, o === "direct" && (this.setInputValue(r), this.setPreviousEmittedValue(r)), t && (this.calciteInputTextInput.emit().defaultPrevented ? this.value = this.previousValue : e && this.emitChangeIfUserModified());
  }
  render() {
    const e = z(this.el), t = l`<div class=${n(a.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, o = l`<button .ariaLabel=${this.messages.clear} class=${n(a.clearButton)} .disabled=${this.disabled || this.readOnly} @click=${this.clearInputTextValue} tabindex=-1 type=button><calcite-icon icon=x .scale=${m(this.scale)}></calcite-icon></button>`, c = l`<calcite-icon class=${n(a.inputIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${m(this.scale)}></calcite-icon>`, r = l`<div class=${n(a.prefix)}>${this.prefixText}</div>`, p = l`<div class=${n(a.suffix)}>${this.suffixText}</div>`, g = l`<input aria-errormessage=${v.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${M(this)} autocomplete=${this.autocomplete ?? i} .autofocus=${this.el.autofocus} class=${n({
      [a.editingEnabled]: this.editingEnabled,
      [a.inlineChild]: !!this.inlineEditableEl
    })} value=${this.defaultValue ?? i} .disabled=${this.disabled ? !0 : null} enterkeyhint=${this.el.enterKeyHint ?? i} inputmode=${this.el.inputMode ?? i} maxlength=${this.maxLength ?? i} minlength=${this.minLength ?? i} name=${this.name ?? i} @blur=${this.inputTextBlurHandler} @focus=${this.inputTextFocusHandler} @input=${this.inputTextInputHandler} @keydown=${this.inputTextKeyDownHandler} pattern=${this.pattern ?? i} placeholder=${(this.placeholder || "") ?? i} .readOnly=${this.readOnly} .required=${this.required ? !0 : null} spellcheck=${this.el.spellcheck ?? i} tabindex=${(this.disabled || this.inlineEditableEl && !this.editingEnabled ? -1 : null) ?? i} type=text .value=${w(this.value ?? "")} ${u(this.childRef)}>`;
    return F({ disabled: this.disabled, children: l`${this.labelText && q({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${n({
      [a.inputWrapper]: !0,
      [y.rtl]: e === "rtl",
      [a.clearable]: this.isClearable
    })} ${u(this.inputWrapperRef)}>${this.prefixText ? r : null}<div class=${n(a.wrapper)}>${g}${this.isClearable ? o : null}${this.requestedIcon ? c : null}${this.loading ? t : null}</div><div class=${n(a.actionWrapper)} ${u(this.actionWrapperRef)}><slot name=${D.action}></slot></div>${this.suffixText ? p : null}${C({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? O({ icon: this.validationIcon, id: v.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
I("calcite-input-text", U);
export {
  U as InputText
};
