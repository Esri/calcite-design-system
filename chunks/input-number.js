import { a as D, L as F, d as x, h as N, s as l, x as u, E as m, C as O, c as T } from "./iframe.js";
import { l as P } from "./live.js";
import { i as L } from "./keyed.js";
import { e as V, n as I } from "./ref.js";
import { a as j, u as M } from "./useT9n.js";
import { m as $, e as E, g as A } from "./dom.js";
import { c as W, i as S, d as U, s as K, H as _ } from "./form.js";
import { u as q, I as R } from "./interactive.js";
import { n as G } from "./key.js";
import { c as Z, d as Y, g as J } from "./label.js";
import { c as Q, g as y } from "./component.js";
import { i as g, n, B as X, p as tt, s as et, h as it } from "./locale.js";
import { V as nt } from "./Validation.js";
import { s as rt } from "./input.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const r = {
  loader: "loader",
  clearButton: "clear-button",
  clearable: "clearable",
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
}, H = {
  validationMessage: "inputNumberValidationMessage"
}, at = {
  action: "action"
}, ot = D`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{padding-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem;block-size:var(--calcite-input-number-height, 1.5rem)}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper calcite-button,:host([scale=s]) .action-wrapper calcite-button button{block-size:var(--calcite-input-number-height, 1.5rem)}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{padding-inline:.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;block-size:var(--calcite-input-number-height, 2rem)}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper calcite-button,:host([scale=m]) .action-wrapper calcite-button button{block-size:var(--calcite-input-number-height, 2rem)}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;block-size:var(--calcite-input-number-height, 2.75rem)}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper calcite-button,:host([scale=l]) .action-wrapper calcite-button button{block-size:var(--calcite-input-number-height, 2.75rem)}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none;position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;font-family:inherit;font-weight:var(--calcite-font-weight-normal);background-color:var(--calcite-input-number-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-number-text-color, var(--calcite-color-text-1));border-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}input:placeholder-shown{text-overflow:ellipsis}input{border-width:1px;border-style:solid;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input))}input::placeholder,input:-ms-input-placeholder,input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-number-placeholder-text-color, var(--calcite-color-text-3))}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-number-text-color-focus, var(--calcite-color-text-1))}input[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-number-background-color, var(--calcite-color-background))}input[readonly]:focus{color:var(--calcite-input-number-text-color-focus, var(--calcite-color-text-1))}calcite-icon{color:var(--calcite-input-actions-icon-color, var(--calcite-color-text-3))}input{outline-color:transparent}input:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([status=invalid]) input{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([scale=s]) .icon{inset-inline-start:.5rem}:host([scale=m]) .icon{inset-inline-start:.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);display:block;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.clear-button{pointer-events:initial;order:4;margin:0;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;outline-color:transparent;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1));border-inline-start-width:0px}.clear-button:hover{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.clear-button:hover calcite-icon{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.clear-button:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.clear-button:active calcite-icon{color:var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.clear-button:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.loader calcite-progress{--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;font-weight:var(--calcite-font-weight-medium);line-height:1;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input))}.prefix{order:2;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto);background-color:var(--calcite-input-prefix-background-color, var(--calcite-color-background));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto);background-color:var(--calcite-input-suffix-background-color, var(--calcite-color-background));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}.number-button-wrapper{pointer-events:none;order:6;box-sizing:border-box;display:flex;flex-direction:column;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-icon{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-icon{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down],.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:1;max-block-size:100%;min-block-size:100%;align-self:stretch}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-icon,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-icon{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-inline-start-width:1px;border-inline-end-width:0px}.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:5}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;margin:0;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:1px;border-style:solid;padding-block:0px;padding-inline:.5rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-inline-start-width:0px;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1))}.number-button-item calcite-icon{pointer-events:none;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.number-button-item:disabled{pointer-events:none}.number-button-item:hover{background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.number-button-item:hover calcite-icon{color:var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.number-button-item:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.number-button-item:active calcite-icon{color:var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.prefix,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=down]{border-start-start-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host([read-only]) .suffix,:host([read-only]) .wrapper:not(.has-suffix) .clear-button,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=up]{border-end-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px;border-end-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]{border-start-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host(:not([read-only])[number-button-type=horizontal]) .prefix,:host(:not([read-only])[number-button-type=horizontal]) input,.has-prefix input{border-start-start-radius:0;border-end-start-radius:0}.has-suffix input,:host .clearable input,:host(:not([read-only])) input,:host .suffix,:host .clear-button{border-start-end-radius:0;border-end-end-radius:0}:host .wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}`;
class st extends F {
  constructor() {
    super(), this.actionWrapperEl = V(), this.attributeWatch = j(["autofocus", "enterkeyhint", "inputmode"], this.handleGlobalAttributesChanged), this.inputWrapperEl = V(), this.onHiddenFormInputInput = (t) => {
      t.target.name === this.name && this.setNumberValue({
        value: t.target.value,
        origin: "direct"
      }), this.setFocus(), t.stopPropagation();
    }, this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.messages = M(), this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.editingEnabled = !1, this.groupSeparator = !1, this.iconFlipRtl = !1, this.integer = !1, this.loading = !1, this.localeFormat = !1, this.numberButtonType = "vertical", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.calciteInputNumberChange = x({ cancelable: !1 }), this.calciteInputNumberInput = x(), this.calciteInternalInputNumberBlur = x({ cancelable: !1 }), this.calciteInternalInputNumberFocus = x({ cancelable: !1 }), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { displayedValue: 16, slottedActionElDisabledInternally: 16, alignment: 3, autocomplete: 0, clearable: 7, disabled: 7, editingEnabled: 7, form: 3, groupSeparator: 7, icon: [3, { converter: N }], iconFlipRtl: 7, integer: 5, label: 1, loading: 7, localeFormat: 5, max: 11, maxLength: 11, messageOverrides: 0, min: 11, minLength: 11, name: 3, numberButtonType: 3, numberingSystem: 3, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, step: 3, suffixText: 1, validationIcon: [3, { converter: N }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = ot;
  }
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
  async selectText() {
    this.childNumberEl?.select();
  }
  async setFocus() {
    await Q(this), this.childNumberEl?.focus();
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable"), this.inlineEditableEl && (this.editingEnabled = this.inlineEditableEl.editingEnabled || !1), Z(this), W(this), this.el.addEventListener(S, this.onHiddenFormInputInput);
  }
  async load() {
    this.maxString = this.max?.toString(), this.minString = this.min?.toString(), this.requestedIcon = $({}, this.icon, "number"), this.setPreviousEmittedNumberValue(this.value), this.setPreviousNumberValue(this.value), this.warnAboutInvalidNumberValue(this.value), this.value === "Infinity" || this.value === "-Infinity" ? (this.displayedValue = this.value, this.previousEmittedNumberValue = this.value) : this.setNumberValue({
      origin: "connected",
      value: g(this.value) ? this.value : ""
    });
  }
  willUpdate(t) {
    t.has("max") && (this.maxString = this.max?.toString() || null), t.has("min") && (this.minString = this.min?.toString() || null), t.has("icon") && (this.requestedIcon = $({}, this.icon, "number")), t.has("messages") && (n.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: !1
    });
  }
  updated() {
    q(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Y(this), U(this), this.el.removeEventListener(S, this.onHiddenFormInputInput);
  }
  get isClearable() {
    return this.clearable && this.value.length > 0;
  }
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
        value: t == null || t == "" ? "" : g(t) ? t : this.previousValue || ""
      }), this.warnAboutInvalidNumberValue(t);
    }
    this.userChangedValue = !1;
  }
  keyDownHandler(t) {
    this.readOnly || this.disabled || t.defaultPrevented || (this.isClearable && t.key === "Escape" && (this.clearInputValue(t), t.preventDefault()), t.key === "Enter" && K(this) && t.preventDefault());
  }
  onLabelClick() {
    this.setFocus();
  }
  incrementOrDecrementNumberValue(t, e, i, d) {
    const { value: a } = this;
    if (a === "Infinity" || a === "-Infinity")
      return;
    const c = t === "up" ? 1 : -1, o = this.integer && this.step !== "any" ? Math.round(this.step) : this.step, h = o === "any" ? 1 : Math.abs(o || 1), p = new X(a !== "" ? a : "0").add(`${h * c}`), f = () => typeof i == "number" && !isNaN(i) && p.subtract(`${i}`).isNegative, b = () => typeof e == "number" && !isNaN(e) && !p.subtract(`${e}`).isNegative, s = f() ? `${i}` : b() ? `${e}` : p.toString();
    this.setNumberValue({
      committing: !0,
      nativeEvent: d,
      origin: "user",
      value: s
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
    n.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const i = n.delocalize(e);
    t.inputType === "insertFromPaste" ? ((!g(i) || this.integer && (i.includes("e") || i.includes("."))) && t.preventDefault(), this.setNumberValue({
      nativeEvent: t,
      origin: "user",
      value: tt(i)
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
      t.preventDefault(), this.nudgeNumberValue("down", t);
      return;
    }
    const e = [
      ...G,
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
    n.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, !(t.key === n.decimal && !this.integer && (!this.value && !this.childNumberEl.value || this.value && this.childNumberEl.value.indexOf(n.decimal) === -1)) && (/[eE]/.test(t.key) && !this.integer && (!this.value && !this.childNumberEl.value || this.value && !/[eE]/.test(this.childNumberEl.value)) || t.key === "-" && (!this.value && !this.childNumberEl.value || this.value && this.childNumberEl.value.split("-").length <= 2) || t.preventDefault());
  }
  nudgeNumberValue(t, e) {
    if (e instanceof KeyboardEvent && e.repeat)
      return;
    const i = this.maxString ? parseFloat(this.maxString) : null, d = this.minString ? parseFloat(this.minString) : null, a = 150;
    this.incrementOrDecrementNumberValue(t, i, d, e), this.nudgeNumberValueIntervalId && window.clearInterval(this.nudgeNumberValueIntervalId);
    let c = !0;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (c) {
        c = !1;
        return;
      }
      this.incrementOrDecrementNumberValue(t, i, d, e);
    }, a);
  }
  nudgeButtonPointerUpHandler(t) {
    E(t) && window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  nudgeButtonPointerOutHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  nudgeButtonPointerDownHandler(t) {
    if (!E(t))
      return;
    t.preventDefault();
    const e = t.target.dataset.adjustment;
    this.disabled || this.nudgeNumberValue(e, t);
  }
  syncHiddenFormInput(t) {
    rt("number", this, t);
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
    return g(t) ? t : "";
  }
  setPreviousNumberValue(t) {
    this.previousValue = this.normalizeValue(t);
  }
  setNumberValue({ committing: t = !1, nativeEvent: e, origin: i, previousValue: d, value: a }) {
    n.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const c = this.previousValue?.length > a.length || this.value?.length > a.length, o = this.integer ? a.replace(/[e.]/g, "") : a, h = o.charAt(o.length - 1) === ".", v = o.charAt(0) === "-", p = o.match(/^-?(0+)\d/), f = h && c ? o : et(o), b = a && !f ? g(this.previousValue) ? this.previousValue : "" : f;
    let s = n.localize(b);
    i !== "connected" && !h && (s = it(s, b, n)), h && c && (s = `${s}${n.decimal}`), p && (s = `${v ? s.charAt(0) : ""}${n.localize("0").repeat(p[1].length)}${v ? s.slice(1) : s}`), this.displayedValue = s, this.setPreviousNumberValue(d ?? this.value), this.previousValueOrigin = i, this.userChangedValue = i === "user" && this.value !== b;
    const z = ["-", "."].includes(b) ? "" : b;
    this.value = z;
    const B = /* @__PURE__ */ new Set([
      "e",
      "E",
      n.decimal,
      n.minusSign,
      n.group,
      ...n.digits
    ]), k = this.childNumberEl?.value;
    if (k) {
      const w = Array.from(k).filter((C) => B.has(C)).join("");
      w !== k && this.setInputNumberValue(w);
    }
    i === "direct" && (this.setInputNumberValue(s), this.setPreviousEmittedNumberValue(z)), e && (this.calciteInputNumberInput.emit().defaultPrevented ? (this.value = this.previousValue, this.displayedValue = n.localize(this.previousValue)) : t && this.emitChangeIfUserModified());
  }
  inputNumberKeyUpHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  warnAboutInvalidNumberValue(t) {
    t && !g(t) && console.warn(`The specified value "${t}" cannot be parsed, or is out of range.`);
  }
  render() {
    const t = A(this.el), e = u`<div class=${l(r.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, i = u`<button .ariaLabel=${this.messages.clear} class=${l(r.clearButton)} .disabled=${this.disabled || this.readOnly} @click=${this.clearInputValue} tabindex=-1 type=button><calcite-icon icon=x .scale=${y(this.scale)}></calcite-icon></button>`, d = u`<calcite-icon class=${l(r.inputIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${y(this.scale)}></calcite-icon>`, a = this.numberButtonType === "horizontal", c = u`<button aria-hidden=true class=${l({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: a
    })} data-adjustment=up .disabled=${this.disabled || this.readOnly} @pointerdown=${this.nudgeButtonPointerDownHandler} @pointerout=${this.nudgeButtonPointerOutHandler} @pointerup=${this.nudgeButtonPointerUpHandler} tabindex=-1 type=button><calcite-icon icon=chevron-up .scale=${y(this.scale)}></calcite-icon></button>`, o = u`<button aria-hidden=true class=${l({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: a
    })} data-adjustment=down .disabled=${this.disabled || this.readOnly} @pointerdown=${this.nudgeButtonPointerDownHandler} @pointerout=${this.nudgeButtonPointerOutHandler} @pointerup=${this.nudgeButtonPointerUpHandler} tabindex=-1 type=button><calcite-icon icon=chevron-down .scale=${y(this.scale)}></calcite-icon></button>`, h = u`<div class=${l(r.numberButtonWrapper)}>${c}${o}</div>`, v = u`<div class=${l(r.prefix)}>${this.prefixText}</div>`, p = u`<div class=${l(r.suffix)}>${this.suffixText}</div>`, f = L("localized-input", u`<input aria-errormessage=${H.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${J(this)} autocomplete=${this.autocomplete ?? m} .autofocus=${this.el.autofocus} value=${this.defaultValue ?? m} .disabled=${this.disabled} enterkeyhint=${this.el.enterKeyHint ?? m} inputmode=${this.el.inputMode || "decimal"} maxlength=${this.maxLength ?? m} minlength=${this.minLength ?? m} name=${m} @blur=${this.inputNumberBlurHandler} @focus=${this.inputNumberFocusHandler} @input=${this.inputNumberInputHandler} @keydown=${this.inputNumberKeyDownHandler} @keyup=${this.inputNumberKeyUpHandler} placeholder=${(this.placeholder || "") ?? m} .readOnly=${this.readOnly} type=text .value=${P(this.displayedValue ?? "")} ${I(this.setChildNumberElRef)}>`);
    return R({ disabled: this.disabled, children: u`<div class=${l({
      [r.inputWrapper]: !0,
      [O.rtl]: t === "rtl",
      [r.hasSuffix]: this.suffixText,
      [r.hasPrefix]: this.prefixText,
      [r.clearable]: this.isClearable
    })} ${I(this.inputWrapperEl)}>${this.numberButtonType === "horizontal" && !this.readOnly ? o : null}${this.prefixText ? v : null}<div class=${l(r.wrapper)}>${f}${this.isClearable ? i : null}${this.requestedIcon ? d : null}${this.loading ? e : null}</div><div class=${l(r.actionWrapper)} ${I(this.actionWrapperEl)}><slot name=${at.action}></slot></div>${this.numberButtonType === "vertical" && !this.readOnly ? h : null}${this.suffixText ? p : null}${this.numberButtonType === "horizontal" && !this.readOnly ? c : null}${_({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? nt({ icon: this.validationIcon, id: H.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
T("calcite-input-number", st);
export {
  st as InputNumber
};
