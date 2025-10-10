import { b as F, L as R, c as v, u as V, s as o, x as c, E as i, C as P, q as L } from "./index.js";
import { l as S } from "./live.js";
import { i as U } from "./keyed.js";
import { e as y, n as x } from "./ref.js";
import { i as E, u as M } from "./static.js";
import { u as A } from "./index2.js";
import { m as N, e as q, a as j } from "./dom.js";
import { c as K, i as H, d as W, s as _, H as G } from "./form.js";
import { u as Y, I as Z } from "./interactive.js";
import { n as J } from "./key.js";
import { c as Q, d as X, g as T } from "./label.js";
import { i as b, B as ee, n as u, p as te, s as ie, h as ae } from "./locale.js";
import { g as k } from "./component.js";
import { I as ne } from "./InternalLabel.js";
import { V as re } from "./Validation.js";
import { u as oe } from "./useT9n.js";
import { u as se } from "./useSetFocus.js";
import { s as le } from "./input.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const r = {
  loader: "loader",
  clearButton: "clear-button",
  editingEnabled: "editing-enabled",
  inlineChild: "inline-child",
  inputIcon: "icon",
  prefix: "prefix",
  suffix: "suffix",
  numberButtonWrapper: "number-button-wrapper",
  buttonItemHorizontal: "number-button-item--horizontal",
  wrapper: "element-wrapper",
  inputWrapper: "wrapper",
  actionWrapper: "action-wrapper",
  numberButtonItem: "number-button-item",
  hasSuffix: "has-suffix",
  hasPrefix: "has-prefix"
}, w = {
  validationMessage: "inputValidationMessage"
}, O = {
  tel: "phone",
  password: "lock",
  email: "email-address",
  date: "calendar",
  time: "clock",
  search: "search"
}, ce = {
  action: "action"
}, B = {
  up: "up",
  down: "down"
}, $ = {
  chevronUp: "chevron-up",
  chevronDown: "chevron-down",
  close: "x"
}, ue = F`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;padding-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) input[type=file],:host([scale=s]) textarea{min-block-size:1.5rem}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=s]) textarea{block-size:auto;padding-block:.25rem;padding-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;padding-inline:.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) textarea,:host([scale=m]) input[type=file]{min-block-size:2rem}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=m]) textarea{block-size:auto;padding-block:.5rem;padding-inline:.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) textarea,:host([scale=l]) input[type=file]{min-block-size:2.75rem}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([scale=l]) textarea{block-size:auto;padding-block:.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([disabled]) textarea{resize:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}textarea,input{position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-width:1px;border-style:solid;font-family:inherit;font-weight:var(--calcite-font-weight-normal);border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-text-color, var(--calcite-color-text-1));transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none}textarea:placeholder-shown,input:placeholder-shown{text-overflow:ellipsis}textarea{border-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}input{border-start-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-prefix input{border-start-start-radius:0;border-end-start-radius:0}.has-suffix input,.element-wrapper:has(.clear-button) input,:host([number-button-type=vertical][type=number]) input,:host([number-button-type=horizontal]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .clear-button,:host([number-button-type=horizontal][type=number]) .clear-button{border-start-end-radius:0;border-end-end-radius:0}:host([number-button-type=horizontal]) input{border-start-start-radius:0;border-start-end-radius:0;border-end-start-radius:0;border-end-end-radius:0}.has-prefix .prefix:first-child,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=down]{border-start-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-suffix .suffix,:host([number-button-type=vertical][type=number][read-only]) .has-suffix .suffix,:host([clearable]) .clear-button,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=up]{border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}:host([clearable]) .has-suffix .clear-button{border-end-end-radius:0;border-start-end-radius:0}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px;border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]{border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}input[type=search]::-webkit-search-decoration{-webkit-appearance:none}input:focus,textarea:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-text-color, var(--calcite-color-text-1))}input[readonly],textarea[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-background-color, var(--calcite-color-background))}input[readonly]:focus,textarea[readonly]:focus{color:var(--calcite-input-text-color, var(--calcite-color-text-1))}textarea,input{outline-color:transparent}textarea:focus,input:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([status=invalid]) input,:host([status=invalid]) textarea{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus,:host([status=invalid]) textarea:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([scale=s]) .icon{inset-inline-start:.5rem}:host([scale=m]) .icon{inset-inline-start:.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center;isolation:isolate}.icon{pointer-events:none;position:absolute;display:block;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-icon-color, var(--calcite-color-text-3));z-index:var(--calcite-z-index)}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration,input[type=date]::-webkit-clear-button,input[type=time]::-webkit-clear-button{display:none}.clear-button{pointer-events:initial;order:4;margin:0;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;outline-color:transparent;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1));border-inline-start-width:0px}.clear-button calcite-icon{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-actions-icon-color, var(--calcite-color-text-3))}.clear-button:hover{background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.clear-button:hover calcite-icon{color:var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.clear-button:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.clear-button:active calcite-icon{color:var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.clear-button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block;--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;font-weight:var(--calcite-font-weight-medium);line-height:1;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input))}.prefix{order:2;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto);background-color:var(--calcite-input-prefix-background-color, var(--calcite-color-background));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto);background-color:var(--calcite-input-suffix-background-color, var(--calcite-color-background));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}:host([alignment=start]) textarea,:host([alignment=start]) input{text-align:start}:host([alignment=end]) textarea,:host([alignment=end]) input{text-align:end}input[type=number]{-moz-appearance:textfield}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.number-button-wrapper{pointer-events:none;order:6;box-sizing:border-box;display:flex;flex-direction:column;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input,:host([number-button-type=vertical]) textarea{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-icon{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-icon{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal{border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));order:1;max-block-size:100%;min-block-size:100%;align-self:stretch;border-width:1px;border-style:solid}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-icon,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-icon{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-inline-end-width:0px}.number-button-item.number-button-item--horizontal[data-adjustment=up]{border-inline-start-width:0px;order:5}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;margin:0;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:1px;border-style:solid;background-color:var(--calcite-color-foreground-1);padding-block:0px;padding-inline:.5rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1));border-inline-start-width:0px}.number-button-item calcite-icon{pointer-events:none;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-actions-icon-color, var(--calcite-color-text-3))}.number-button-item:hover{background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.number-button-item:hover calcite-icon{color:var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.number-button-item:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.number-button-item:active calcite-icon{color:var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.number-button-item:disabled{pointer-events:none}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center;border-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));box-shadow:var(--calcite-input-shadow, var(--calcite-shadow-none))}input[type=date]::-webkit-input-placeholder{visibility:hidden!important}:host([type=color]) input{padding:.25rem}:host([type=file]) input{cursor:pointer;border-width:1px;border-style:dashed;background-color:var(--calcite-color-foreground-1);text-align:center;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));block-size:initial}:host([type=file][scale=s]) input{padding-block:1px;padding-inline:.5rem}:host([type=file][scale=m]) input{padding-block:.25rem;padding-inline:.75rem}:host([type=file][scale=l]) input{padding-block:.5rem;padding-inline:1rem}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}:host([type=datetime-local]) .element-wrapper{inline-size:100%}:host([type=datetime-local]) .element-wrapper input{display:inline-block;min-inline-size:0}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}`;
class de extends R {
  constructor() {
    super(), this.actionWrapperRef = y(), this.attributeWatch = A(["autofocus", "enterkeyhint", "inputmode", "spellcheck"], this.handleGlobalAttributesChanged), this.childRef = y(), this.childElType = "input", this.childNumberRef = y(), this.inputWrapperRef = y(), this.onHiddenFormInputInput = (e) => {
      e.target.name === this.name && this.setValue({
        value: e.target.value,
        origin: "direct"
      }), this.setFocus(), e.stopPropagation();
    }, this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.messages = oe(), this.focusSetter = se()(this), this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.editingEnabled = !1, this.groupSeparator = !1, this.iconFlipRtl = !1, this.loading = !1, this.localeFormat = !1, this.multiple = !1, this.numberButtonType = "vertical", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.type = "text", this.validity = {
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
    }, this.calciteInputChange = v({ cancelable: !1 }), this.calciteInputInput = v(), this.calciteInternalInputBlur = v({ cancelable: !1 }), this.calciteInternalInputFocus = v({ cancelable: !1 }), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { displayedValue: 16, slottedActionElDisabledInternally: 16, accept: 1, alignment: 3, autocomplete: 0, clearable: 7, disabled: 7, editingEnabled: 7, files: 0, form: 3, groupSeparator: 7, icon: [3, { converter: V, type: String }], iconFlipRtl: 7, label: 1, labelText: 1, loading: 7, localeFormat: 5, max: 11, maxLength: 11, messageOverrides: 0, min: 11, minLength: 11, multiple: 5, name: 3, numberButtonType: 3, numberingSystem: 3, pattern: 1, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, step: 3, suffixText: 1, type: 3, validationIcon: [3, { converter: V, type: String }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = ue;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.valueWatcher(e, t), e && this._value === "" && this.setValue({
      origin: "reset",
      value: t
    }));
  }
  async selectText() {
    (this.type === "number" ? this.childNumberRef : this.childRef).value?.select();
  }
  async setFocus(e) {
    return this.focusSetter(() => this.type === "number" ? this.childNumberRef.value : this.childRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable"), this.inlineEditableEl && (this.editingEnabled = this.inlineEditableEl.editingEnabled || !1), Q(this), K(this), this.el.addEventListener(H, this.onHiddenFormInputInput);
  }
  async load() {
    this.childElType = this.type === "textarea" ? "textarea" : "input", this.maxString = this.max?.toString(), this.minString = this.min?.toString(), this.requestedIcon = N(O, this.icon, this.type), this.setPreviousEmittedValue(this.value), this.setPreviousValue(this.value), this.type === "number" && (this.value === "Infinity" || this.value === "-Infinity" ? (this.displayedValue = this.value, this.previousEmittedValue = this.value) : (this.warnAboutInvalidNumberValue(this.value), this.setValue({
      origin: "connected",
      value: b(this.value) ? this.value : ""
    })));
  }
  willUpdate(e) {
    e.has("max") && (this.maxString = this.max?.toString() || null), e.has("min") && (this.minString = this.min?.toString() || null), (e.has("icon") || e.has("type") && (this.hasUpdated || this.type !== "text")) && (this.requestedIcon = N(O, this.icon, this.type));
  }
  updated() {
    Y(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), X(this), W(this), this.el.removeEventListener(H, this.onHiddenFormInputInput);
  }
  get isClearable() {
    return !this.isTextarea && (this.clearable || this.type === "search") && this.value?.length > 0;
  }
  get isTextarea() {
    return this.childElType === "textarea";
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  valueWatcher(e, t) {
    if (!this.userChangedValue) {
      if (this.type === "number" && (e === "Infinity" || e === "-Infinity")) {
        this.displayedValue = e, this.previousEmittedValue = e;
        return;
      }
      this.setValue({
        origin: "direct",
        previousValue: t,
        value: e == null || e == "" ? "" : this.type === "number" ? b(e) ? e : this.previousValue || "" : e
      }), this.warnAboutInvalidNumberValue(e);
    }
    this.userChangedValue = !1;
  }
  keyDownHandler(e) {
    this.readOnly || this.disabled || e.defaultPrevented || (this.isClearable && e.key === "Escape" && (this.clearInputValue(e), e.preventDefault()), e.key === "Enter" && _(this) && e.preventDefault());
  }
  onLabelClick() {
    this.setFocus();
  }
  incrementOrDecrementNumberValue(e, t, a, d) {
    const { value: n } = this;
    if (n === "Infinity" || n === "-Infinity")
      return;
    const s = e === "up" ? 1 : -1, p = this.step === "any" ? 1 : Math.abs(this.step || 1), l = new ee(n !== "" ? n : "0").add(`${p * s}`), h = () => typeof a == "number" && !isNaN(a) && l.subtract(`${a}`).isNegative, f = () => typeof t == "number" && !isNaN(t) && !l.subtract(`${t}`).isNegative, g = h() ? `${a}` : f() ? `${t}` : l.toString();
    this.setValue({
      committing: !0,
      nativeEvent: d,
      origin: "user",
      value: g
    });
  }
  clearInputValue(e) {
    this.setValue({
      committing: !0,
      nativeEvent: e,
      origin: "user",
      value: ""
    });
  }
  emitChangeIfUserModified() {
    this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue && (this.calciteInputChange.emit(), this.setPreviousEmittedValue(this.value));
  }
  inputBlurHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId), this.calciteInternalInputBlur.emit(), this.emitChangeIfUserModified();
  }
  clickHandler(e) {
    if (this.disabled)
      return;
    const t = e.composedPath();
    !t.includes(this.inputWrapperRef.value) || t.includes(this.actionWrapperRef.value) || this.setFocus();
  }
  inputFocusHandler() {
    this.calciteInternalInputFocus.emit();
  }
  inputInputHandler(e) {
    this.disabled || this.readOnly || (this.type === "file" && (this.files = this.childRef.value.files), this.setValue({
      nativeEvent: e,
      origin: "user",
      value: e.target.value
    }));
  }
  inputKeyDownHandler(e) {
    this.disabled || this.readOnly || e.key === "Enter" && this.emitChangeIfUserModified();
  }
  inputNumberInputHandler(e) {
    if (this.disabled || this.readOnly || this.value === "Infinity" || this.value === "-Infinity")
      return;
    const t = e.target.value;
    u.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const a = u.delocalize(t);
    e.inputType === "insertFromPaste" ? (b(a) || e.preventDefault(), this.setValue({
      nativeEvent: e,
      origin: "user",
      value: te(a)
    }), this.childNumberRef.value.value = this.displayedValue) : this.setValue({
      nativeEvent: e,
      origin: "user",
      value: a
    });
  }
  inputNumberKeyDownHandler(e) {
    if (this.type !== "number" || this.disabled || this.readOnly)
      return;
    if (this.value === "Infinity" || this.value === "-Infinity") {
      e.preventDefault(), (e.key === "Backspace" || e.key === "Delete") && this.clearInputValue(e);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault(), this.nudgeNumberValue("up", e);
      return;
    }
    if (e.key === "ArrowDown") {
      this.nudgeNumberValue("down", e);
      return;
    }
    const t = [
      ...J,
      "ArrowLeft",
      "ArrowRight",
      "Backspace",
      "Delete",
      "Enter",
      "Escape",
      "Tab"
    ];
    if (e.altKey || e.ctrlKey || e.metaKey)
      return;
    const a = e.shiftKey && e.key === "Tab";
    if (t.includes(e.key) || a) {
      e.key === "Enter" && this.emitChangeIfUserModified();
      return;
    }
    u.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, !(e.key === u.decimal && (!this.value && !this.childNumberRef.value.value || this.value && this.childNumberRef.value.value.indexOf(u.decimal) === -1)) && (/[eE]/.test(e.key) && (!this.value && !this.childNumberRef.value.value || this.value && !/[eE]/.test(this.childNumberRef.value.value)) || e.key === "-" && (!this.value && !this.childNumberRef.value.value || this.value && this.childNumberRef.value.value.split("-").length <= 2) || e.preventDefault());
  }
  nudgeNumberValue(e, t) {
    if (t instanceof KeyboardEvent && t.repeat || this.type !== "number")
      return;
    const a = this.maxString ? parseFloat(this.maxString) : null, d = this.minString ? parseFloat(this.minString) : null, n = 150;
    this.incrementOrDecrementNumberValue(e, a, d, t), this.nudgeNumberValueIntervalId && window.clearInterval(this.nudgeNumberValueIntervalId);
    let s = !0;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (s) {
        s = !1;
        return;
      }
      this.incrementOrDecrementNumberValue(e, a, d, t);
    }, n);
  }
  numberButtonPointerUpAndOutHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  numberButtonPointerDownHandler(e) {
    if (!q(e))
      return;
    e.preventDefault();
    const t = e.target.dataset.adjustment;
    this.disabled || this.nudgeNumberValue(t, e);
  }
  syncHiddenFormInput(e) {
    le(this.type, this, e);
  }
  setInputValue(e) {
    const t = this.type === "number" ? this.childNumberRef : this.childRef;
    t.value && (t.value.value = e);
  }
  setPreviousEmittedValue(e) {
    this.previousEmittedValue = this.normalizeValue(e);
  }
  normalizeValue(e) {
    return this.type === "number" ? b(e) ? e : "" : e;
  }
  setPreviousValue(e) {
    this.previousValue = this.normalizeValue(e);
  }
  setValue({ committing: e = !1, nativeEvent: t, origin: a, previousValue: d, value: n }) {
    if (this.setPreviousValue(d ?? this.value), this.previousValueOrigin = a, this.type === "number") {
      u.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
        signDisplay: "never"
      };
      const s = this.previousValue?.length > n.length || this.value?.length > n.length, p = n.charAt(n.length - 1) === ".", m = p && s ? n : ie(n), l = n && !m ? b(this.previousValue) ? this.previousValue : "" : m;
      let h = u.localize(l);
      a !== "connected" && !p && (h = ae(h, l, u)), this.displayedValue = p && s ? `${h}${u.decimal}` : h, this.userChangedValue = a === "user" && this.value !== l, this.value = ["-", "."].includes(l) ? "" : l;
    } else
      this.userChangedValue = a === "user" && this.value !== n, this.value = n;
    a === "direct" && (this.setInputValue(n), this.previousEmittedValue = n), t && (this.calciteInputInput.emit().defaultPrevented ? (this.value = this.previousValue, this.displayedValue = this.type === "number" ? u.localize(this.previousValue) : this.previousValue) : e && this.emitChangeIfUserModified());
  }
  inputKeyUpHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  warnAboutInvalidNumberValue(e) {
    this.type === "number" && e && !b(e) && console.warn(`The specified value "${e}" cannot be parsed, or is out of range.`);
  }
  render() {
    const e = j(this.el), t = c`<div class=${o(r.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, a = c`<button .ariaLabel=${this.messages.clear} class=${o(r.clearButton)} .disabled=${this.disabled || this.readOnly} @click=${this.clearInputValue} tabindex=-1 title=${this.messages.clear ?? i} type=button><calcite-icon .icon=${$.close} .scale=${k(this.scale)}></calcite-icon></button>`, d = c`<calcite-icon class=${o(r.inputIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${k(this.scale)}></calcite-icon>`, n = this.numberButtonType === "horizontal", s = c`<button aria-hidden=true class=${o({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: n
    })} data-adjustment=${B.up} .disabled=${this.disabled || this.readOnly} @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler} tabindex=-1 type=button><calcite-icon .icon=${$.chevronUp} .scale=${k(this.scale)}></calcite-icon></button>`, p = c`<button aria-hidden=true class=${o({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: n
    })} data-adjustment=${B.down} .disabled=${this.disabled || this.readOnly} @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler} tabindex=-1 type=button><calcite-icon .icon=${$.chevronDown} .scale=${k(this.scale)}></calcite-icon></button>`, m = c`<div class=${o(r.numberButtonWrapper)}>${s}${p}</div>`, l = c`<div class=${o(r.prefix)}>${this.prefixText}</div>`, h = c`<div class=${o(r.suffix)}>${this.suffixText}</div>`, f = this.el.autofocus, g = this.el.enterKeyHint, z = this.el.inputMode, D = this.type === "number" ? U("localized-input", c`<input accept=${this.accept ?? i} aria-errormessage=${w.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${T(this)} autocomplete=${this.autocomplete ?? i} .autofocus=${f} value=${this.defaultValue ?? i} .disabled=${this.disabled ? !0 : null} enterkeyhint=${g ?? i} inputmode=${z ?? i} maxlength=${this.maxLength ?? i} minlength=${this.minLength ?? i} .multiple=${this.multiple} name=${i} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputNumberInputHandler} @keydown=${this.inputNumberKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? i} placeholder=${(this.placeholder || "") ?? i} .readOnly=${this.readOnly} .required=${this.required} type=text .value=${S(this.displayedValue ?? "")} ${x(this.childNumberRef)}>`) : null, I = this.childElType === "input" ? E`input` : E`textarea`, C = this.type !== "number" ? M`<${I} accept=${this.accept ?? i} aria-errormessage=${w.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${T(this)} autocomplete=${this.autocomplete ?? i} .autofocus=${f} class=${o({
      [r.editingEnabled]: this.editingEnabled,
      [r.inlineChild]: !!this.inlineEditableEl
    })} .defaultValue=${this.defaultValue ?? ""} .disabled=${this.disabled ? !0 : null} enterkeyhint=${g ?? i} inputmode=${z ?? i} max=${this.maxString ?? i} maxlength=${this.maxLength ?? i} min=${this.minString ?? i} minlength=${this.minLength ?? i} .multiple=${this.multiple} name=${this.name ?? i} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputInputHandler} @keydown=${this.inputKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? i} placeholder=${(this.placeholder || "") ?? i} .readOnly=${this.readOnly} .required=${this.required ? !0 : null} spellcheck=${this.el.spellcheck ?? i} step=${this.step ?? i} tabindex=${(this.disabled || this.inlineEditableEl && !this.editingEnabled ? -1 : null) ?? i} type=${this.type ?? i} .value=${S(this.value ?? "")} ${x(
      this.childRef
      /* using unknown to workaround Lumina dynamic ref type issue */
    )}></${I}>` : null;
    return Z({ disabled: this.disabled, children: c`${this.labelText && ne({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${o({
      [r.inputWrapper]: !0,
      [P.rtl]: e === "rtl",
      [r.hasSuffix]: this.suffixText,
      [r.hasPrefix]: this.prefixText
    })} ${x(this.inputWrapperRef)}>${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? p : null}${this.prefixText ? l : null}<div class=${o(r.wrapper)}>${D}${C}${this.isClearable ? a : null}${this.requestedIcon ? d : null}${this.loading ? t : null}</div><div class=${o(r.actionWrapper)} ${x(this.actionWrapperRef)}><slot name=${ce.action}></slot></div>${this.type === "number" && this.numberButtonType === "vertical" && !this.readOnly ? m : null}${this.suffixText ? h : null}${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? s : null}${G({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? re({ icon: this.validationIcon, id: w.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
L("calcite-input", de);
export {
  de as Input
};
