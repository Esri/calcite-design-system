import { h as C, L as D, u as F, k as v, n as z, s as o, x as c, E as i, C as P, j as L } from "./iframe.js";
import { l as I } from "./live.js";
import { i as U } from "./keyed.js";
import { e as V, n as y } from "./ref.js";
import { i as E, u as M } from "./static.js";
import { f as A, u as N, e as j, g as K } from "./dom.js";
import { c as W, i as H, d as _, s as q, H as R } from "./form.js";
import { u as G, I as Y } from "./interactive.js";
import { n as Z } from "./key.js";
import { c as J, d as Q, g as S } from "./label.js";
import { c as X, g as x } from "./component.js";
import { i as b, B as tt, n as u, p as et, s as it, h as rt } from "./locale.js";
import { V as nt } from "./Validation.js";
import { u as at } from "./useT9n.js";
import { s as ot } from "./input.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const a = {
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
}, k = {
  validationMessage: "inputValidationMessage"
}, T = {
  tel: "phone",
  password: "lock",
  email: "email-address",
  date: "calendar",
  time: "clock",
  search: "search"
}, st = {
  action: "action"
}, lt = C`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;padding-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) input[type=file],:host([scale=s]) textarea{min-block-size:1.5rem}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper calcite-button,:host([scale=s]) .action-wrapper calcite-button button{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=s]) textarea{block-size:auto;padding-block:.25rem;padding-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;padding-inline:.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) textarea,:host([scale=m]) input[type=file]{min-block-size:2rem}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper calcite-button,:host([scale=m]) .action-wrapper calcite-button button{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=m]) textarea{block-size:auto;padding-block:.5rem;padding-inline:.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) textarea,:host([scale=l]) input[type=file]{min-block-size:2.75rem}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper calcite-button,:host([scale=l]) .action-wrapper calcite-button button{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([scale=l]) textarea{block-size:auto;padding-block:.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([disabled]) textarea{resize:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}textarea,input{position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-width:1px;border-style:solid;font-family:inherit;font-weight:var(--calcite-font-weight-normal);border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-text-color, var(--calcite-color-text-1));transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none}textarea:placeholder-shown,input:placeholder-shown{text-overflow:ellipsis}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}textarea{border-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}input{border-start-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-prefix input{border-start-start-radius:0;border-end-start-radius:0}.has-suffix input,.element-wrapper:has(.clear-button) input,:host([number-button-type=vertical][type=number]) input,:host([number-button-type=horizontal]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .clear-button,:host([number-button-type=horizontal][type=number]) .clear-button{border-start-end-radius:0;border-end-end-radius:0}:host([number-button-type=horizontal]) input{border-start-start-radius:0;border-start-end-radius:0;border-end-start-radius:0;border-end-end-radius:0}.has-prefix .prefix:first-child,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=down]{border-start-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-suffix .suffix,:host([number-button-type=vertical][type=number][read-only]) .has-suffix .suffix,:host([clearable]) .clear-button,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=up]{border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}:host([clearable]) .has-suffix .clear-button{border-end-end-radius:0;border-start-end-radius:0}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px;border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]{border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}input[type=search]::-webkit-search-decoration{-webkit-appearance:none}input:focus,textarea:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-text-color, var(--calcite-color-text-1))}input[readonly],textarea[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-background-color, var(--calcite-color-background))}input[readonly]:focus,textarea[readonly]:focus{color:var(--calcite-input-text-color, var(--calcite-color-text-1))}textarea,input{outline-color:transparent}textarea:focus,input:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([status=invalid]) input,:host([status=invalid]) textarea{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus,:host([status=invalid]) textarea:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([scale=s]) .icon{inset-inline-start:.5rem}:host([scale=m]) .icon{inset-inline-start:.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;display:block;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-icon-color, var(--calcite-color-text-3));z-index:var(--calcite-z-index)}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration,input[type=date]::-webkit-clear-button,input[type=time]::-webkit-clear-button{display:none}.clear-button{pointer-events:initial;order:4;margin:0;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1));border-inline-start-width:0px}.clear-button calcite-icon{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-actions-icon-color, var(--calcite-color-text-3))}.clear-button:hover{background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.clear-button:hover calcite-icon{color:var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.clear-button:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.clear-button:active calcite-icon{color:var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.clear-button:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block;--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;font-weight:var(--calcite-font-weight-medium);line-height:1;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input))}.prefix{order:2;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto);background-color:var(--calcite-input-prefix-background-color, var(--calcite-color-background));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto);background-color:var(--calcite-input-suffix-background-color, var(--calcite-color-background));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}:host([alignment=start]) textarea,:host([alignment=start]) input{text-align:start}:host([alignment=end]) textarea,:host([alignment=end]) input{text-align:end}input[type=number]{-moz-appearance:textfield}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.number-button-wrapper{pointer-events:none;order:6;box-sizing:border-box;display:flex;flex-direction:column;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input,:host([number-button-type=vertical]) textarea{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-icon{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-icon{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal{border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));order:1;max-block-size:100%;min-block-size:100%;align-self:stretch;border-width:1px;border-style:solid}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-icon,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-icon{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-inline-end-width:0px}.number-button-item.number-button-item--horizontal[data-adjustment=up]{border-inline-start-width:0px;order:5}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;margin:0;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:1px;border-style:solid;background-color:var(--calcite-color-foreground-1);padding-block:0px;padding-inline:.5rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1));border-inline-start-width:0px}.number-button-item calcite-icon{pointer-events:none;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-actions-icon-color, var(--calcite-color-text-3))}.number-button-item:hover{background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.number-button-item:hover calcite-icon{color:var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.number-button-item:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.number-button-item:active calcite-icon{color:var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.number-button-item:disabled{pointer-events:none}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center;border-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));box-shadow:var(--calcite-input-shadow, var(--calcite-shadow-none))}input[type=date]::-webkit-input-placeholder{visibility:hidden!important}:host([type=color]) input{padding:.25rem}:host([type=file]) input{cursor:pointer;border-width:1px;border-style:dashed;background-color:var(--calcite-color-foreground-1);text-align:center;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));block-size:initial}:host([type=file][scale=s]) input{padding-block:1px;padding-inline:.5rem}:host([type=file][scale=m]) input{padding-block:.25rem;padding-inline:.75rem}:host([type=file][scale=l]) input{padding-block:.5rem;padding-inline:1rem}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class ct extends D {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.actionWrapperEl = V(), this.attributeWatch = F(["autofocus", "enterkeyhint", "inputmode", "spellcheck"], this.handleGlobalAttributesChanged), this.childElType = "input", this.inputWrapperEl = V(), this.onHiddenFormInputInput = (t) => {
      t.target.name === this.name && this.setValue({
        value: t.target.value,
        origin: "direct"
      }), this.setFocus(), t.stopPropagation();
    }, this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.editingEnabled = !1, this.groupSeparator = !1, this.iconFlipRtl = !1, this.loading = !1, this.localeFormat = !1, this.messages = at(), this.multiple = !1, this.numberButtonType = "vertical", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.type = "text", this.validity = {
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
    this.properties = { displayedValue: 16, slottedActionElDisabledInternally: 16, accept: 1, alignment: 3, autocomplete: 0, clearable: 7, disabled: 7, editingEnabled: 7, files: 0, form: 3, groupSeparator: 7, icon: [3, { converter: z }], iconFlipRtl: 7, label: 1, loading: 7, localeFormat: 5, max: 11, maxLength: 11, messageOverrides: 0, min: 11, minLength: 11, multiple: 5, name: 3, numberButtonType: 3, numberingSystem: 3, pattern: 1, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, step: 3, suffixText: 1, type: 3, validationIcon: [3, { converter: z }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = lt;
  }
  get isClearable() {
    return !this.isTextarea && (this.clearable || this.type === "search") && this.value?.length > 0;
  }
  get isTextarea() {
    return this.childElType === "textarea";
  }
  /** The component's value. */
  get value() {
    return this._value;
  }
  set value(t) {
    const e = this._value;
    t !== e && (this._value = t, this.valueWatcher(t, e), t && this._value === "" && this.setValue({
      origin: "reset",
      value: e
    }));
  }
  // #endregion
  // #region Public Methods
  /** Selects the text of the component's `value`. */
  async selectText() {
    this.type === "number" ? this.childNumberEl?.select() : this.childEl?.select();
  }
  /** Sets focus on the component. */
  async setFocus() {
    await X(this), A(this.type === "number" ? this.childNumberEl : this.childEl);
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable"), this.inlineEditableEl && (this.editingEnabled = this.inlineEditableEl.editingEnabled || !1), J(this), W(this), this.el.addEventListener(H, this.onHiddenFormInputInput);
  }
  async load() {
    this.childElType = this.type === "textarea" ? "textarea" : "input", this.maxString = this.max?.toString(), this.minString = this.min?.toString(), this.requestedIcon = N(T, this.icon, this.type), this.setPreviousEmittedValue(this.value), this.setPreviousValue(this.value), this.type === "number" && (this.value === "Infinity" || this.value === "-Infinity" ? (this.displayedValue = this.value, this.previousEmittedValue = this.value) : (this.warnAboutInvalidNumberValue(this.value), this.setValue({
      origin: "connected",
      value: b(this.value) ? this.value : ""
    })));
  }
  willUpdate(t) {
    t.has("max") && (this.maxString = this.max?.toString() || null), t.has("min") && (this.minString = this.min?.toString() || null), (t.has("icon") || t.has("type") && (this.hasUpdated || this.type !== "text")) && (this.requestedIcon = N(T, this.icon, this.type));
  }
  updated() {
    G(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Q(this), _(this), this.el.removeEventListener(H, this.onHiddenFormInputInput);
  }
  // #endregion
  // #region Private Methods
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  valueWatcher(t, e) {
    if (!this.userChangedValue) {
      if (this.type === "number" && (t === "Infinity" || t === "-Infinity")) {
        this.displayedValue = t, this.previousEmittedValue = t;
        return;
      }
      this.setValue({
        origin: "direct",
        previousValue: e,
        value: t == null || t == "" ? "" : this.type === "number" ? b(t) ? t : this.previousValue || "" : t
      }), this.warnAboutInvalidNumberValue(t);
    }
    this.userChangedValue = !1;
  }
  keyDownHandler(t) {
    this.readOnly || this.disabled || t.defaultPrevented || (this.isClearable && t.key === "Escape" && (this.clearInputValue(t), t.preventDefault()), t.key === "Enter" && q(this) && t.preventDefault());
  }
  onLabelClick() {
    this.setFocus();
  }
  incrementOrDecrementNumberValue(t, e, r, d) {
    const { value: n } = this;
    if (n === "Infinity" || n === "-Infinity")
      return;
    const s = t === "up" ? 1 : -1, p = this.step === "any" ? 1 : Math.abs(this.step || 1), l = new tt(n !== "" ? n : "0").add(`${p * s}`), h = () => typeof r == "number" && !isNaN(r) && l.subtract(`${r}`).isNegative, f = () => typeof e == "number" && !isNaN(e) && !l.subtract(`${e}`).isNegative, g = h() ? `${r}` : f() ? `${e}` : l.toString();
    this.setValue({
      committing: !0,
      nativeEvent: d,
      origin: "user",
      value: g
    });
  }
  clearInputValue(t) {
    this.setValue({
      committing: !0,
      nativeEvent: t,
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
  clickHandler(t) {
    if (this.disabled)
      return;
    const e = t.composedPath();
    !e.includes(this.inputWrapperEl.value) || e.includes(this.actionWrapperEl.value) || this.setFocus();
  }
  inputFocusHandler() {
    this.calciteInternalInputFocus.emit();
  }
  inputInputHandler(t) {
    this.disabled || this.readOnly || (this.type === "file" && (this.files = this.childEl.files), this.setValue({
      nativeEvent: t,
      origin: "user",
      value: t.target.value
    }));
  }
  inputKeyDownHandler(t) {
    this.disabled || this.readOnly || t.key === "Enter" && this.emitChangeIfUserModified();
  }
  inputNumberInputHandler(t) {
    if (this.disabled || this.readOnly || this.value === "Infinity" || this.value === "-Infinity")
      return;
    const e = t.target.value;
    u.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const r = u.delocalize(e);
    t.inputType === "insertFromPaste" ? (b(r) || t.preventDefault(), this.setValue({
      nativeEvent: t,
      origin: "user",
      value: et(r)
    }), this.childNumberEl.value = this.displayedValue) : this.setValue({
      nativeEvent: t,
      origin: "user",
      value: r
    });
  }
  inputNumberKeyDownHandler(t) {
    if (this.type !== "number" || this.disabled || this.readOnly)
      return;
    if (this.value === "Infinity" || this.value === "-Infinity") {
      t.preventDefault(), (t.key === "Backspace" || t.key === "Delete") && this.clearInputValue(t);
      return;
    }
    if (t.key === "ArrowUp") {
      t.preventDefault(), this.nudgeNumberValue("up", t);
      return;
    }
    if (t.key === "ArrowDown") {
      this.nudgeNumberValue("down", t);
      return;
    }
    const e = [
      ...Z,
      "ArrowLeft",
      "ArrowRight",
      "Backspace",
      "Delete",
      "Enter",
      "Escape",
      "Tab"
    ];
    if (t.altKey || t.ctrlKey || t.metaKey)
      return;
    const r = t.shiftKey && t.key === "Tab";
    if (e.includes(t.key) || r) {
      t.key === "Enter" && this.emitChangeIfUserModified();
      return;
    }
    u.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, !(t.key === u.decimal && (!this.value && !this.childNumberEl.value || this.value && this.childNumberEl.value.indexOf(u.decimal) === -1)) && (/[eE]/.test(t.key) && (!this.value && !this.childNumberEl.value || this.value && !/[eE]/.test(this.childNumberEl.value)) || t.key === "-" && (!this.value && !this.childNumberEl.value || this.value && this.childNumberEl.value.split("-").length <= 2) || t.preventDefault());
  }
  nudgeNumberValue(t, e) {
    if (e instanceof KeyboardEvent && e.repeat || this.type !== "number")
      return;
    const r = this.maxString ? parseFloat(this.maxString) : null, d = this.minString ? parseFloat(this.minString) : null, n = 150;
    this.incrementOrDecrementNumberValue(t, r, d, e), this.nudgeNumberValueIntervalId && window.clearInterval(this.nudgeNumberValueIntervalId);
    let s = !0;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (s) {
        s = !1;
        return;
      }
      this.incrementOrDecrementNumberValue(t, r, d, e);
    }, n);
  }
  numberButtonPointerUpAndOutHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  numberButtonPointerDownHandler(t) {
    if (!j(t))
      return;
    t.preventDefault();
    const e = t.target.dataset.adjustment;
    this.disabled || this.nudgeNumberValue(e, t);
  }
  syncHiddenFormInput(t) {
    ot(this.type, this, t);
  }
  setChildElRef(t) {
    this.childEl = t;
  }
  setChildNumberElRef(t) {
    this.childNumberEl = t;
  }
  setInputValue(t) {
    this.type === "number" && this.childNumberEl ? this.childNumberEl.value = t : this.childEl && (this.childEl.value = t);
  }
  setPreviousEmittedValue(t) {
    this.previousEmittedValue = this.normalizeValue(t);
  }
  normalizeValue(t) {
    return this.type === "number" ? b(t) ? t : "" : t;
  }
  setPreviousValue(t) {
    this.previousValue = this.normalizeValue(t);
  }
  setValue({ committing: t = !1, nativeEvent: e, origin: r, previousValue: d, value: n }) {
    if (this.setPreviousValue(d ?? this.value), this.previousValueOrigin = r, this.type === "number") {
      u.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
        signDisplay: "never"
      };
      const s = this.previousValue?.length > n.length || this.value?.length > n.length, p = n.charAt(n.length - 1) === ".", m = p && s ? n : it(n), l = n && !m ? b(this.previousValue) ? this.previousValue : "" : m;
      let h = u.localize(l);
      r !== "connected" && !p && (h = rt(h, l, u)), this.displayedValue = p && s ? `${h}${u.decimal}` : h, this.userChangedValue = r === "user" && this.value !== l, this.value = ["-", "."].includes(l) ? "" : l;
    } else
      this.userChangedValue = r === "user" && this.value !== n, this.value = n;
    r === "direct" && (this.setInputValue(n), this.previousEmittedValue = n), e && (this.calciteInputInput.emit().defaultPrevented ? (this.value = this.previousValue, this.displayedValue = this.type === "number" ? u.localize(this.previousValue) : this.previousValue) : t && this.emitChangeIfUserModified());
  }
  inputKeyUpHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  warnAboutInvalidNumberValue(t) {
    this.type === "number" && t && !b(t) && console.warn(`The specified value "${t}" cannot be parsed, or is out of range.`);
  }
  // #endregion
  // #region Rendering
  render() {
    const t = K(this.el), e = c`<div class=${o(a.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, r = c`<button .ariaLabel=${this.messages.clear} class=${o(a.clearButton)} .disabled=${this.disabled || this.readOnly} @click=${this.clearInputValue} tabindex=-1 type=button><calcite-icon icon=x .scale=${x(this.scale)}></calcite-icon></button>`, d = c`<calcite-icon class=${o(a.inputIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${x(this.scale)}></calcite-icon>`, n = this.numberButtonType === "horizontal", s = c`<button aria-hidden=true class=${o({
      [a.numberButtonItem]: !0,
      [a.buttonItemHorizontal]: n
    })} data-adjustment=up .disabled=${this.disabled || this.readOnly} @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler} tabindex=-1 type=button><calcite-icon icon=chevron-up .scale=${x(this.scale)}></calcite-icon></button>`, p = c`<button aria-hidden=true class=${o({
      [a.numberButtonItem]: !0,
      [a.buttonItemHorizontal]: n
    })} data-adjustment=down .disabled=${this.disabled || this.readOnly} @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler} tabindex=-1 type=button><calcite-icon icon=chevron-down .scale=${x(this.scale)}></calcite-icon></button>`, m = c`<div class=${o(a.numberButtonWrapper)}>${s}${p}</div>`, l = c`<div class=${o(a.prefix)}>${this.prefixText}</div>`, h = c`<div class=${o(a.suffix)}>${this.suffixText}</div>`, f = this.el.autofocus, g = this.el.enterKeyHint, w = this.el.inputMode, B = this.type === "number" ? U("localized-input", c`<input accept=${this.accept ?? i} aria-errormessage=${k.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${S(this)} autocomplete=${this.autocomplete ?? i} .autofocus=${f} value=${this.defaultValue ?? i} .disabled=${this.disabled ? !0 : null} enterkeyhint=${g ?? i} inputmode=${w ?? i} maxlength=${this.maxLength ?? i} minlength=${this.minLength ?? i} .multiple=${this.multiple} name=${i} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputNumberInputHandler} @keydown=${this.inputNumberKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? i} placeholder=${(this.placeholder || "") ?? i} .readOnly=${this.readOnly} type=text .value=${I(this.displayedValue ?? "")} ${y(this.setChildNumberElRef)}>`) : null, $ = this.childElType === "input" ? E`input` : E`textarea`, O = this.type !== "number" ? M`<${$} accept=${this.accept ?? i} aria-errormessage=${k.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${S(this)} autocomplete=${this.autocomplete ?? i} .autofocus=${f} class=${o({
      [a.editingEnabled]: this.editingEnabled,
      [a.inlineChild]: !!this.inlineEditableEl
    })} .defaultValue=${this.defaultValue ?? ""} .disabled=${this.disabled ? !0 : null} enterkeyhint=${g ?? i} inputmode=${w ?? i} max=${this.maxString ?? i} maxlength=${this.maxLength ?? i} min=${this.minString ?? i} minlength=${this.minLength ?? i} .multiple=${this.multiple} name=${this.name ?? i} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputInputHandler} @keydown=${this.inputKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? i} placeholder=${(this.placeholder || "") ?? i} .readOnly=${this.readOnly} .required=${this.required ? !0 : null} spellcheck=${this.el.spellcheck ?? i} step=${this.step ?? i} tabindex=${(this.disabled || this.inlineEditableEl && !this.editingEnabled ? -1 : null) ?? i} type=${this.type ?? i} .value=${I(this.value ?? "")} ${y(this.setChildElRef)}></${$}>` : null;
    return Y({ disabled: this.disabled, children: c`<div class=${o({
      [a.inputWrapper]: !0,
      [P.rtl]: t === "rtl",
      [a.hasSuffix]: this.suffixText,
      [a.hasPrefix]: this.prefixText
    })} ${y(this.inputWrapperEl)}>${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? p : null}${this.prefixText ? l : null}<div class=${o(a.wrapper)}>${B}${O}${this.isClearable ? r : null}${this.requestedIcon ? d : null}${this.loading ? e : null}</div><div class=${o(a.actionWrapper)} ${y(this.actionWrapperEl)}><slot name=${st.action}></slot></div>${this.type === "number" && this.numberButtonType === "vertical" && !this.readOnly ? m : null}${this.suffixText ? h : null}${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? s : null}${R({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? nt({ icon: this.validationIcon, id: k.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
L("calcite-input", ct);
export {
  ct as Input
};
