import { d as E, L as S, u as H, j as g, k, s as a, x as d, E as h, C as B, h as F } from "./iframe.js";
import { l as O } from "./live.js";
import { i as D } from "./keyed.js";
import { e as I, n as y } from "./ref.js";
import { k as w, e as z, g as C } from "./dom.js";
import { c as T, i as N, d as P, s as j, H as L } from "./form.js";
import { u as M, I as W } from "./interactive.js";
import { n as U } from "./key.js";
import { c as A, d as K, g as _ } from "./label.js";
import { c as q, g as v } from "./component.js";
import { i as p, n as s, B as R, p as G, s as Y, h as Z } from "./locale.js";
import { V as J } from "./Validation.js";
import { s as Q } from "./input.js";
import { u as X } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
const r = {
  loader: "loader",
  clearButton: "clear-button",
  inputIcon: "icon",
  prefix: "prefix",
  suffix: "suffix",
  numberButtonWrapper: "number-button-wrapper",
  buttonItemHorizontal: "number-button-item--horizontal",
  wrapper: "element-wrapper",
  inputWrapper: "wrapper",
  actionWrapper: "action-wrapper",
  numberButtonItem: "number-button-item"
}, V = {
  validationMessage: "inputNumberValidationMessage"
}, tt = {
  action: "action"
}, et = E`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;padding-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper calcite-button,:host([scale=s]) .action-wrapper calcite-button button{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;padding-inline:.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper calcite-button,:host([scale=m]) .action-wrapper calcite-button button{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper calcite-button,:host([scale=l]) .action-wrapper calcite-button button{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none;position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-radius:0;background-color:var(--calcite-color-foreground-1);font-family:inherit;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1)}input:placeholder-shown{text-overflow:ellipsis}input{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);color:var(--calcite-color-text-1)}input::placeholder,input:-ms-input-placeholder,input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-color-text-1)}input[readonly]{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}input[readonly]:focus{color:var(--calcite-color-text-1)}calcite-icon{color:var(--calcite-color-text-3)}input{outline-color:transparent}input:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([status=invalid]) input{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([scale=s]) .icon{inset-inline-start:.5rem}:host([scale=m]) .icon{inset-inline-start:.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);display:block;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.clear-button{pointer-events:initial;order:4;margin:0;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);outline-color:transparent;border-inline-start-width:0px}.clear-button:hover{background-color:var(--calcite-color-foreground-2);transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.clear-button:hover calcite-icon{color:var(--calcite-color-text-1);transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.clear-button:active{background-color:var(--calcite-color-foreground-3)}.clear-button:active calcite-icon{color:var(--calcite-color-text-1)}.clear-button:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium);line-height:1;color:var(--calcite-color-text-2)}.prefix{order:2;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto)}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto)}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}.number-button-wrapper{pointer-events:none;order:6;box-sizing:border-box;display:flex;flex-direction:column;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-icon{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-icon{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down],.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:1;max-block-size:100%;min-block-size:100%;align-self:stretch}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-icon,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-icon{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);border-inline-end-width:0px}.number-button-item.number-button-item--horizontal[data-adjustment=down]:hover{background-color:var(--calcite-color-foreground-2)}.number-button-item.number-button-item--horizontal[data-adjustment=down]:hover calcite-icon{color:var(--calcite-color-text-1)}.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:5}.number-button-item.number-button-item--horizontal[data-adjustment=up]:hover{background-color:var(--calcite-color-foreground-2)}.number-button-item.number-button-item--horizontal[data-adjustment=up]:hover calcite-icon{color:var(--calcite-color-text-1)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]:hover{background-color:var(--calcite-color-foreground-2)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]:hover calcite-icon{color:var(--calcite-color-text-1)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]:hover{background-color:var(--calcite-color-foreground-2)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]:hover calcite-icon{color:var(--calcite-color-text-1)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;margin:0;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);padding-block:0px;padding-inline:.5rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-inline-start-width:0px}.number-button-item calcite-icon{pointer-events:none;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.number-button-item:focus{background-color:var(--calcite-color-foreground-2)}.number-button-item:focus calcite-icon{color:var(--calcite-color-text-1)}.number-button-item:active{background-color:var(--calcite-color-foreground-3)}.number-button-item:disabled{pointer-events:none}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class it extends S {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.actionWrapperEl = I(), this.attributeWatch = H(["autofocus", "enterkeyhint", "inputmode"], this.handleGlobalAttributesChanged), this.inputWrapperEl = I(), this.onHiddenFormInputInput = (t) => {
      t.target.name === this.name && this.setNumberValue({
        value: t.target.value,
        origin: "direct"
      }), this.setFocus(), t.stopPropagation();
    }, this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.editingEnabled = !1, this.groupSeparator = !1, this.iconFlipRtl = !1, this.integer = !1, this.loading = !1, this.localeFormat = !1, this.messages = X(), this.numberButtonType = "vertical", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.calciteInputNumberChange = g({ cancelable: !1 }), this.calciteInputNumberInput = g(), this.calciteInternalInputNumberBlur = g({ cancelable: !1 }), this.calciteInternalInputNumberFocus = g({ cancelable: !1 }), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { displayedValue: 16, slottedActionElDisabledInternally: 16, alignment: 3, autocomplete: 0, clearable: 7, disabled: 7, editingEnabled: 7, form: 3, groupSeparator: 7, icon: [3, { converter: k }], iconFlipRtl: 7, integer: 5, label: 1, loading: 7, localeFormat: 5, max: 11, maxLength: 11, messageOverrides: 0, min: 11, minLength: 11, name: 3, numberButtonType: 3, numberingSystem: 3, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, step: 3, suffixText: 1, validationIcon: [3, { converter: k }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = et;
  }
  get isClearable() {
    return this.clearable && this.value.length > 0;
  }
  /** The component's value. */
  get value() {
    return this._value;
  }
  set value(t) {
    const e = this._value;
    t !== e && (this._value = t, this.valueWatcher(t, e), t && this._value === "" && this.setNumberValue({
      origin: "reset",
      value: e
    }));
  }
  // #endregion
  // #region Public Methods
  /** Selects the text of the component's `value`. */
  async selectText() {
    this.childNumberEl?.select();
  }
  /** Sets focus on the component. */
  async setFocus() {
    await q(this), this.childNumberEl?.focus();
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable"), this.inlineEditableEl && (this.editingEnabled = this.inlineEditableEl.editingEnabled || !1), A(this), T(this), this.el.addEventListener(N, this.onHiddenFormInputInput);
  }
  async load() {
    this.maxString = this.max?.toString(), this.minString = this.min?.toString(), this.requestedIcon = w({}, this.icon, "number"), this.setPreviousEmittedNumberValue(this.value), this.setPreviousNumberValue(this.value), this.warnAboutInvalidNumberValue(this.value), this.value === "Infinity" || this.value === "-Infinity" ? (this.displayedValue = this.value, this.previousEmittedNumberValue = this.value) : this.setNumberValue({
      origin: "connected",
      value: p(this.value) ? this.value : ""
    });
  }
  willUpdate(t) {
    t.has("max") && (this.maxString = this.max?.toString() || null), t.has("min") && (this.minString = this.min?.toString() || null), t.has("icon") && (this.requestedIcon = w({}, this.icon, "number")), t.has("messages") && (s.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: !1
    });
  }
  updated() {
    M(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), K(this), P(this), this.el.removeEventListener(N, this.onHiddenFormInputInput);
  }
  // #endregion
  // #region Private Methods
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  valueWatcher(t, e) {
    if (!this.userChangedValue) {
      if (t === "Infinity" || t === "-Infinity") {
        this.displayedValue = t, this.previousEmittedNumberValue = t;
        return;
      }
      this.setNumberValue({
        origin: "direct",
        previousValue: e,
        value: t == null || t == "" ? "" : p(t) ? t : this.previousValue || ""
      }), this.warnAboutInvalidNumberValue(t);
    }
    this.userChangedValue = !1;
  }
  keyDownHandler(t) {
    this.readOnly || this.disabled || t.defaultPrevented || (this.isClearable && t.key === "Escape" && (this.clearInputValue(t), t.preventDefault()), t.key === "Enter" && j(this) && t.preventDefault());
  }
  onLabelClick() {
    this.setFocus();
  }
  incrementOrDecrementNumberValue(t, e, i, m) {
    const { value: n } = this;
    if (n === "Infinity" || n === "-Infinity")
      return;
    const l = t === "up" ? 1 : -1, u = this.integer && this.step !== "any" ? Math.round(this.step) : this.step, b = u === "any" ? 1 : Math.abs(u || 1), o = new R(n !== "" ? n : "0").add(`${b * l}`), c = () => typeof i == "number" && !isNaN(i) && o.subtract(`${i}`).isNegative, x = () => typeof e == "number" && !isNaN(e) && !o.subtract(`${e}`).isNegative, $ = c() ? `${i}` : x() ? `${e}` : o.toString();
    this.setNumberValue({
      committing: !0,
      nativeEvent: m,
      origin: "user",
      value: $
    });
  }
  clearInputValue(t) {
    this.setNumberValue({
      committing: !0,
      nativeEvent: t,
      origin: "user",
      value: ""
    });
  }
  emitChangeIfUserModified() {
    this.previousValueOrigin === "user" && this.value !== this.previousEmittedNumberValue && (this.calciteInputNumberChange.emit(), this.setPreviousEmittedNumberValue(this.value));
  }
  inputNumberBlurHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId), this.calciteInternalInputNumberBlur.emit(), this.emitChangeIfUserModified();
  }
  clickHandler(t) {
    if (this.disabled)
      return;
    const e = t.composedPath();
    !e.includes(this.inputWrapperEl.value) || e.includes(this.actionWrapperEl.value) || this.setFocus();
  }
  inputNumberFocusHandler() {
    this.calciteInternalInputNumberFocus.emit();
  }
  inputNumberInputHandler(t) {
    if (this.disabled || this.readOnly || this.value === "Infinity" || this.value === "-Infinity")
      return;
    const e = t.target.value;
    s.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const i = s.delocalize(e);
    t.inputType === "insertFromPaste" ? ((!p(i) || this.integer && (i.includes("e") || i.includes("."))) && t.preventDefault(), this.setNumberValue({
      nativeEvent: t,
      origin: "user",
      value: G(i)
    }), this.childNumberEl.value = this.displayedValue) : this.setNumberValue({
      nativeEvent: t,
      origin: "user",
      value: i
    });
  }
  inputNumberKeyDownHandler(t) {
    if (this.disabled || this.readOnly)
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
      ...U,
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
    const i = t.shiftKey && t.key === "Tab";
    if (e.includes(t.key) || i) {
      t.key === "Enter" && this.emitChangeIfUserModified();
      return;
    }
    s.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, !(t.key === s.decimal && !this.integer && (!this.value && !this.childNumberEl.value || this.value && this.childNumberEl.value.indexOf(s.decimal) === -1)) && (/[eE]/.test(t.key) && !this.integer && (!this.value && !this.childNumberEl.value || this.value && !/[eE]/.test(this.childNumberEl.value)) || t.key === "-" && (!this.value && !this.childNumberEl.value || this.value && this.childNumberEl.value.split("-").length <= 2) || t.preventDefault());
  }
  nudgeNumberValue(t, e) {
    if (e instanceof KeyboardEvent && e.repeat)
      return;
    const i = this.maxString ? parseFloat(this.maxString) : null, m = this.minString ? parseFloat(this.minString) : null, n = 150;
    this.incrementOrDecrementNumberValue(t, i, m, e), this.nudgeNumberValueIntervalId && window.clearInterval(this.nudgeNumberValueIntervalId);
    let l = !0;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (l) {
        l = !1;
        return;
      }
      this.incrementOrDecrementNumberValue(t, i, m, e);
    }, n);
  }
  nudgeButtonPointerUpHandler(t) {
    z(t) && window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  nudgeButtonPointerOutHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  nudgeButtonPointerDownHandler(t) {
    if (!z(t))
      return;
    t.preventDefault();
    const e = t.target.dataset.adjustment;
    this.disabled || this.nudgeNumberValue(e, t);
  }
  syncHiddenFormInput(t) {
    Q("number", this, t);
  }
  setChildNumberElRef(t) {
    this.childNumberEl = t;
  }
  setInputNumberValue(t) {
    this.childNumberEl && (this.childNumberEl.value = t);
  }
  setPreviousEmittedNumberValue(t) {
    this.previousEmittedNumberValue = this.normalizeValue(t);
  }
  normalizeValue(t) {
    return p(t) ? t : "";
  }
  setPreviousNumberValue(t) {
    this.previousValue = this.normalizeValue(t);
  }
  setNumberValue({ committing: t = !1, nativeEvent: e, origin: i, previousValue: m, value: n }) {
    s.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const l = this.previousValue?.length > n.length || this.value?.length > n.length, u = this.integer ? n.replace(/[e.]/g, "") : n, b = u.charAt(u.length - 1) === ".", f = b && l ? u : Y(u), o = n && !f ? p(this.previousValue) ? this.previousValue : "" : f;
    let c = s.localize(o);
    i !== "connected" && !b && (c = Z(c, o, s)), this.displayedValue = b && l ? `${c}${s.decimal}` : c, this.setPreviousNumberValue(m ?? this.value), this.previousValueOrigin = i, this.userChangedValue = i === "user" && this.value !== o, this.value = ["-", "."].includes(o) ? "" : o, i === "direct" && (this.setInputNumberValue(c), this.setPreviousEmittedNumberValue(c)), e && (this.calciteInputNumberInput.emit().defaultPrevented ? (this.value = this.previousValue, this.displayedValue = s.localize(this.previousValue)) : t && this.emitChangeIfUserModified());
  }
  inputNumberKeyUpHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  warnAboutInvalidNumberValue(t) {
    t && !p(t) && console.warn(`The specified value "${t}" cannot be parsed, or is out of range.`);
  }
  // #endregion
  // #region Rendering
  render() {
    const t = C(this.el), e = d`<div class=${a(r.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, i = d`<button .ariaLabel=${this.messages.clear} class=${a(r.clearButton)} .disabled=${this.disabled || this.readOnly} @click=${this.clearInputValue} tabindex=-1 type=button><calcite-icon icon=x .scale=${v(this.scale)}></calcite-icon></button>`, m = d`<calcite-icon class=${a(r.inputIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${v(this.scale)}></calcite-icon>`, n = this.numberButtonType === "horizontal", l = d`<button aria-hidden=true class=${a({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: n
    })} data-adjustment=up .disabled=${this.disabled || this.readOnly} @pointerdown=${this.nudgeButtonPointerDownHandler} @pointerout=${this.nudgeButtonPointerOutHandler} @pointerup=${this.nudgeButtonPointerUpHandler} tabindex=-1 type=button><calcite-icon icon=chevron-up .scale=${v(this.scale)}></calcite-icon></button>`, u = d`<button aria-hidden=true class=${a({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: n
    })} data-adjustment=down .disabled=${this.disabled || this.readOnly} @pointerdown=${this.nudgeButtonPointerDownHandler} @pointerout=${this.nudgeButtonPointerOutHandler} @pointerup=${this.nudgeButtonPointerUpHandler} tabindex=-1 type=button><calcite-icon icon=chevron-down .scale=${v(this.scale)}></calcite-icon></button>`, b = d`<div class=${a(r.numberButtonWrapper)}>${l}${u}</div>`, f = d`<div class=${a(r.prefix)}>${this.prefixText}</div>`, o = d`<div class=${a(r.suffix)}>${this.suffixText}</div>`, c = D("localized-input", d`<input aria-errormessage=${V.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${_(this)} autocomplete=${this.autocomplete ?? h} .autofocus=${this.el.autofocus} value=${this.defaultValue ?? h} .disabled=${this.disabled} enterkeyhint=${this.el.enterKeyHint ?? h} inputmode=${this.el.inputMode || "decimal"} maxlength=${this.maxLength ?? h} minlength=${this.minLength ?? h} name=${h} @blur=${this.inputNumberBlurHandler} @focus=${this.inputNumberFocusHandler} @input=${this.inputNumberInputHandler} @keydown=${this.inputNumberKeyDownHandler} @keyup=${this.inputNumberKeyUpHandler} placeholder=${(this.placeholder || "") ?? h} .readOnly=${this.readOnly} type=text .value=${O(this.displayedValue ?? "")} ${y(this.setChildNumberElRef)}>`);
    return W({ disabled: this.disabled, children: d`<div class=${a({ [r.inputWrapper]: !0, [B.rtl]: t === "rtl" })} ${y(this.inputWrapperEl)}>${this.numberButtonType === "horizontal" && !this.readOnly ? u : null}${this.prefixText ? f : null}<div class=${a(r.wrapper)}>${c}${this.isClearable ? i : null}${this.requestedIcon ? m : null}${this.loading ? e : null}</div><div class=${a(r.actionWrapper)} ${y(this.actionWrapperEl)}><slot name=${tt.action}></slot></div>${this.numberButtonType === "vertical" && !this.readOnly ? b : null}${this.suffixText ? o : null}${this.numberButtonType === "horizontal" && !this.readOnly ? l : null}${L({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? J({ icon: this.validationIcon, id: V.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
F("calcite-input-number", it);
export {
  it as InputNumber
};
