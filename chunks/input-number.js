import { b as O, L as F, c as x, u as V, s, x as u, E as b, C as R, q as P } from "./index.js";
import { l as L } from "./live.js";
import { i as j } from "./keyed.js";
import { e as I, n as z } from "./ref.js";
import { u as M } from "./index2.js";
import { m as S, e as H, a as A } from "./dom.js";
import { c as U, i as B, d as q, s as W, H as K } from "./form.js";
import { u as _, I as G } from "./interactive.js";
import { n as Z } from "./key.js";
import { c as Y, d as J, g as Q } from "./label.js";
import { i as g, n, B as X, p as ee, s as te, h as ie } from "./locale.js";
import { g as y } from "./component.js";
import { I as ne } from "./InternalLabel.js";
import { V as ae } from "./Validation.js";
import { s as re } from "./input.js";
import { u as oe } from "./useT9n.js";
import { u as le } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const a = {
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
}, E = {
  validationMessage: "inputNumberValidationMessage"
}, se = {
  action: "action"
}, N = {
  clear: "x",
  chevronUp: "chevron-up",
  chevronDown: "chevron-down"
}, T = {
  up: "up",
  down: "down"
}, ce = O`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{padding-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem;block-size:var(--calcite-input-number-height, 1.5rem)}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper{block-size:var(--calcite-input-number-height, 1.5rem)}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{padding-inline:.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;block-size:var(--calcite-input-number-height, 2rem)}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper{block-size:var(--calcite-input-number-height, 2rem)}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;block-size:var(--calcite-input-number-height, 2.75rem)}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper{block-size:var(--calcite-input-number-height, 2.75rem)}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none;position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;font-family:inherit;font-weight:var(--calcite-font-weight-normal);background-color:var(--calcite-input-number-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-number-text-color, var(--calcite-color-text-1));border-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp));text-align:var(--calcite-internal-input-number-alignment)}input:placeholder-shown{text-overflow:ellipsis}input{border-width:1px;border-style:solid;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input))}input::placeholder,input:-ms-input-placeholder,input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-number-placeholder-text-color, var(--calcite-color-text-3))}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-number-text-color-focus, var(--calcite-color-text-1))}input[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-number-background-color, var(--calcite-color-background))}input[readonly]:focus{color:var(--calcite-input-number-text-color-focus, var(--calcite-color-text-1))}input{outline-color:transparent}input:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([status=invalid]) input{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([scale=s]) .icon{inset-inline-start:.5rem}:host([scale=m]) .icon{inset-inline-start:.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center;isolation:isolate}.icon{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);display:block;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;--calcite-icon-color: var(--calcite-input-number-icon-color, var(--calcite-color-text-3))}.clear-button{pointer-events:initial;order:4;margin:0;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;outline-color:transparent;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1));border-inline-start-width:0px}.clear-button calcite-icon{--calcite-icon-color: var(--calcite-input-actions-icon-color, var(--calcite-color-text-3))}.clear-button:hover{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.clear-button:hover calcite-icon{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;--calcite-icon-color: var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.clear-button:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.clear-button:active calcite-icon{--calcite-icon-color: var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.clear-button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.loader calcite-progress{--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;font-weight:var(--calcite-font-weight-medium);line-height:1;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input))}.prefix{order:2;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto);background-color:var(--calcite-input-prefix-background-color, var(--calcite-color-background));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto);background-color:var(--calcite-input-suffix-background-color, var(--calcite-color-background));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}:host([alignment=start]){--calcite-internal-input-number-alignment: start}:host([alignment=center]){--calcite-internal-input-number-alignment: center}:host([alignment=end]){--calcite-internal-input-number-alignment: end}.number-button-wrapper{pointer-events:none;order:6;box-sizing:border-box;display:flex;flex-direction:column;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-icon{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-icon{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down],.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:1;max-block-size:100%;min-block-size:100%;align-self:stretch}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-icon,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-icon{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-inline-start-width:1px;border-inline-end-width:0px}.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:5}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;margin:0;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:1px;border-style:solid;padding-block:0px;padding-inline:.5rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-inline-start-width:0px;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1))}.number-button-item calcite-icon{pointer-events:none;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;--calcite-icon-color: var(--calcite-input-actions-icon-color, var(--calcite-color-text-3))}.number-button-item:disabled{pointer-events:none}.number-button-item:hover{background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.number-button-item:hover calcite-icon{--calcite-icon-color: var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.number-button-item:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.number-button-item:active calcite-icon{--calcite-icon-color: var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.prefix,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=down]{border-start-start-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host([read-only]) .suffix,:host([read-only]) .wrapper:not(.has-suffix) .clear-button,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=up]{border-end-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px;border-end-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]{border-start-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host(:not([read-only])[number-button-type=horizontal]) .prefix,:host(:not([read-only])[number-button-type=horizontal]) input,.has-prefix input{border-start-start-radius:0;border-end-start-radius:0}.has-suffix input,:host .clearable input,:host(:not([read-only])) input,:host .suffix,:host .clear-button{border-start-end-radius:0;border-end-end-radius:0}:host .wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}`;
class ue extends F {
  constructor() {
    super(), this.actionWrapperRef = I(), this.attributeWatch = M(["autofocus", "enterkeyhint", "inputmode"], this.handleGlobalAttributesChanged), this.childNumberRef = I(), this.inputWrapperRef = I(), this.onHiddenFormInputInput = (e) => {
      e.target.name === this.name && this.setNumberValue({
        value: e.target.value,
        origin: "direct"
      }), this.setFocus(), e.stopPropagation();
    }, this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.messages = oe(), this.focusSetter = le()(this), this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.editingEnabled = !1, this.groupSeparator = !1, this.iconFlipRtl = !1, this.integer = !1, this.loading = !1, this.localeFormat = !1, this.numberButtonType = "vertical", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    this.properties = { displayedValue: 16, slottedActionElDisabledInternally: 16, alignment: 3, autocomplete: 0, clearable: 7, disabled: 7, editingEnabled: 7, form: 3, groupSeparator: 7, icon: [3, { converter: V, type: String }], iconFlipRtl: 7, integer: 5, label: 1, labelText: 1, loading: 7, localeFormat: 5, max: 11, maxLength: 11, messageOverrides: 0, min: 11, minLength: 11, name: 3, numberButtonType: 3, numberingSystem: 3, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, step: 3, suffixText: 1, validationIcon: [3, { converter: V, type: String }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = ce;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.valueWatcher(e, t), e && this._value === "" && this.setNumberValue({
      origin: "reset",
      value: t
    }));
  }
  async selectText() {
    this.childNumberRef.value?.select();
  }
  async setFocus(e) {
    return this.focusSetter(() => this.childNumberRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable"), this.inlineEditableEl && (this.editingEnabled = this.inlineEditableEl.editingEnabled || !1), Y(this), U(this), this.el.addEventListener(B, this.onHiddenFormInputInput);
  }
  async load() {
    this.maxString = this.max?.toString(), this.minString = this.min?.toString(), this.requestedIcon = S({}, this.icon, "number"), this.setPreviousEmittedNumberValue(this.value), this.setPreviousNumberValue(this.value), this.warnAboutInvalidNumberValue(this.value), this.value === "Infinity" || this.value === "-Infinity" ? (this.displayedValue = this.value, this.previousEmittedNumberValue = this.value) : this.setNumberValue({
      origin: "connected",
      value: g(this.value) ? this.value : ""
    });
  }
  willUpdate(e) {
    e.has("max") && (this.maxString = this.max?.toString() || null), e.has("min") && (this.minString = this.min?.toString() || null), e.has("icon") && (this.requestedIcon = S({}, this.icon, "number")), e.has("messages") && (n.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: !1
    });
  }
  updated() {
    _(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), J(this), q(this), this.el.removeEventListener(B, this.onHiddenFormInputInput);
  }
  get isClearable() {
    return this.clearable && this.value.length > 0;
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  valueWatcher(e, t) {
    if (!this.userChangedValue) {
      if (e === "Infinity" || e === "-Infinity") {
        this.displayedValue = e, this.previousEmittedNumberValue = e;
        return;
      }
      this.setNumberValue({
        origin: "direct",
        previousValue: t,
        value: e == null || e == "" ? "" : g(e) ? e : this.previousValue || ""
      }), this.warnAboutInvalidNumberValue(e);
    }
    this.userChangedValue = !1;
  }
  keyDownHandler(e) {
    this.readOnly || this.disabled || e.defaultPrevented || (this.isClearable && e.key === "Escape" && (this.clearInputValue(e), e.preventDefault()), e.key === "Enter" && W(this) && e.preventDefault());
  }
  onLabelClick() {
    this.setFocus();
  }
  incrementOrDecrementNumberValue(e, t, i, d) {
    const { value: r } = this;
    if (r === "Infinity" || r === "-Infinity")
      return;
    const c = e === "up" ? 1 : -1, o = this.integer && this.step !== "any" ? Math.round(this.step) : this.step, h = o === "any" ? 1 : Math.abs(o || 1), p = new X(r !== "" ? r : "0").add(`${h * c}`), f = () => typeof i == "number" && !isNaN(i) && p.subtract(`${i}`).isNegative, m = () => typeof t == "number" && !isNaN(t) && !p.subtract(`${t}`).isNegative, l = f() ? `${i}` : m() ? `${t}` : p.toString();
    this.setNumberValue({
      committing: !0,
      nativeEvent: d,
      origin: "user",
      value: l
    });
  }
  clearInputValue(e) {
    this.setNumberValue({
      committing: !0,
      nativeEvent: e,
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
  clickHandler(e) {
    if (this.disabled)
      return;
    const t = e.composedPath();
    !t.includes(this.inputWrapperRef.value) || t.includes(this.actionWrapperRef.value) || this.setFocus();
  }
  inputNumberFocusHandler() {
    this.calciteInternalInputNumberFocus.emit();
  }
  inputNumberInputHandler(e) {
    if (this.disabled || this.readOnly || this.value === "Infinity" || this.value === "-Infinity")
      return;
    const t = e.target.value;
    n.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const i = n.delocalize(t);
    e.inputType === "insertFromPaste" ? ((!g(i) || this.integer && (i.includes("e") || i.includes("."))) && e.preventDefault(), this.setNumberValue({
      nativeEvent: e,
      origin: "user",
      value: ee(i)
    }), this.childNumberRef.value.value = this.displayedValue) : this.setNumberValue({
      nativeEvent: e,
      origin: "user",
      value: i
    });
  }
  inputNumberKeyDownHandler(e) {
    if (this.disabled || this.readOnly)
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
      e.preventDefault(), this.nudgeNumberValue("down", e);
      return;
    }
    const t = [
      ...Z,
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
    const i = e.shiftKey && e.key === "Tab";
    if (t.includes(e.key) || i) {
      e.key === "Enter" && this.emitChangeIfUserModified();
      return;
    }
    n.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, !(e.key === n.decimal && !this.integer && (!this.value && !this.childNumberRef.value.value || this.value && this.childNumberRef.value.value.indexOf(n.decimal) === -1)) && (/[eE]/.test(e.key) && !this.integer && (!this.value && !this.childNumberRef.value.value || this.value && !/[eE]/.test(this.childNumberRef.value.value)) || e.key === "-" && (!this.value && !this.childNumberRef.value.value || this.value && this.childNumberRef.value.value.split("-").length <= 2) || e.preventDefault());
  }
  nudgeNumberValue(e, t) {
    if (t instanceof KeyboardEvent && t.repeat)
      return;
    const i = this.maxString ? parseFloat(this.maxString) : null, d = this.minString ? parseFloat(this.minString) : null, r = 150;
    this.incrementOrDecrementNumberValue(e, i, d, t), this.nudgeNumberValueIntervalId && window.clearInterval(this.nudgeNumberValueIntervalId);
    let c = !0;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (c) {
        c = !1;
        return;
      }
      this.incrementOrDecrementNumberValue(e, i, d, t);
    }, r);
  }
  nudgeButtonPointerUpHandler(e) {
    H(e) && window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  nudgeButtonPointerOutHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  nudgeButtonPointerDownHandler(e) {
    if (!H(e))
      return;
    e.preventDefault();
    const t = e.target.dataset.adjustment;
    this.disabled || this.nudgeNumberValue(t, e);
  }
  syncHiddenFormInput(e) {
    re("number", this, e);
  }
  setInputNumberValue(e) {
    this.childNumberRef.value && (this.childNumberRef.value.value = e);
  }
  setPreviousEmittedNumberValue(e) {
    this.previousEmittedNumberValue = this.normalizeValue(e);
  }
  normalizeValue(e) {
    return g(e) ? e : "";
  }
  setPreviousNumberValue(e) {
    this.previousValue = this.normalizeValue(e);
  }
  setNumberValue({ committing: e = !1, nativeEvent: t, origin: i, previousValue: d, value: r }) {
    n.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const c = this.previousValue?.length > r.length || this.value?.length > r.length, o = this.integer ? r.replace(/[e.]/g, "") : r, h = o.charAt(o.length - 1) === ".", v = o.charAt(0) === "-", p = o.match(/^-?(0+)\d/), f = h && c ? o : te(o), m = r && !f ? g(this.previousValue) ? this.previousValue : "" : f;
    let l = n.localize(m);
    i !== "connected" && !h && (l = ie(l, m, n)), h && c && (l = `${l}${n.decimal}`), p && (l = `${v ? l.charAt(0) : ""}${n.localize("0").repeat(p[1].length)}${v ? l.slice(1) : l}`), this.displayedValue = l, this.setPreviousNumberValue(d ?? this.value), this.previousValueOrigin = i, this.userChangedValue = i === "user" && this.value !== m;
    const $ = ["-", "."].includes(m) ? "" : m;
    this.value = $;
    const D = /* @__PURE__ */ new Set([
      "e",
      "E",
      n.decimal,
      n.minusSign,
      n.group,
      ...n.digits
    ]), k = this.childNumberRef.value?.value;
    if (k) {
      const w = Array.from(k).filter((C) => D.has(C)).join("");
      w !== k && this.setInputNumberValue(w);
    }
    i === "direct" && (this.setInputNumberValue(l), this.setPreviousEmittedNumberValue($)), t && (this.calciteInputNumberInput.emit().defaultPrevented ? (this.value = this.previousValue, this.displayedValue = n.localize(this.previousValue)) : e && this.emitChangeIfUserModified());
  }
  inputNumberKeyUpHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  warnAboutInvalidNumberValue(e) {
    e && !g(e) && console.warn(`The specified value "${e}" cannot be parsed, or is out of range.`);
  }
  render() {
    const e = A(this.el), t = u`<div class=${s(a.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, i = u`<button .ariaLabel=${this.messages.clear} class=${s(a.clearButton)} .disabled=${this.disabled || this.readOnly} @click=${this.clearInputValue} tabindex=-1 type=button><calcite-icon .icon=${N.clear} .scale=${y(this.scale)}></calcite-icon></button>`, d = u`<calcite-icon class=${s(a.inputIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${y(this.scale)}></calcite-icon>`, r = this.numberButtonType === "horizontal", c = u`<button aria-hidden=true class=${s({
      [a.numberButtonItem]: !0,
      [a.buttonItemHorizontal]: r
    })} data-adjustment=${T.up} .disabled=${this.disabled || this.readOnly} @pointerdown=${this.nudgeButtonPointerDownHandler} @pointerout=${this.nudgeButtonPointerOutHandler} @pointerup=${this.nudgeButtonPointerUpHandler} tabindex=-1 type=button><calcite-icon .icon=${N.chevronUp} .scale=${y(this.scale)}></calcite-icon></button>`, o = u`<button aria-hidden=true class=${s({
      [a.numberButtonItem]: !0,
      [a.buttonItemHorizontal]: r
    })} data-adjustment=${T.down} .disabled=${this.disabled || this.readOnly} @pointerdown=${this.nudgeButtonPointerDownHandler} @pointerout=${this.nudgeButtonPointerOutHandler} @pointerup=${this.nudgeButtonPointerUpHandler} tabindex=-1 type=button><calcite-icon .icon=${N.chevronDown} .scale=${y(this.scale)}></calcite-icon></button>`, h = u`<div class=${s(a.numberButtonWrapper)}>${c}${o}</div>`, v = u`<div class=${s(a.prefix)}>${this.prefixText}</div>`, p = u`<div class=${s(a.suffix)}>${this.suffixText}</div>`, f = j("localized-input", u`<input aria-errormessage=${E.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${Q(this)} autocomplete=${this.autocomplete ?? b} .autofocus=${this.el.autofocus} value=${this.defaultValue ?? b} .disabled=${this.disabled} enterkeyhint=${this.el.enterKeyHint ?? b} inputmode=${this.el.inputMode || "decimal"} maxlength=${this.maxLength ?? b} minlength=${this.minLength ?? b} name=${b} @blur=${this.inputNumberBlurHandler} @focus=${this.inputNumberFocusHandler} @input=${this.inputNumberInputHandler} @keydown=${this.inputNumberKeyDownHandler} @keyup=${this.inputNumberKeyUpHandler} placeholder=${(this.placeholder || "") ?? b} .readOnly=${this.readOnly} .required=${this.required} type=text .value=${L(this.displayedValue ?? "")} ${z(this.childNumberRef)}>`);
    return G({ disabled: this.disabled, children: u`${this.labelText && ne({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${s({
      [a.inputWrapper]: !0,
      [R.rtl]: e === "rtl",
      [a.hasSuffix]: this.suffixText,
      [a.hasPrefix]: this.prefixText,
      [a.clearable]: this.isClearable
    })} ${z(this.inputWrapperRef)}>${this.numberButtonType === "horizontal" && !this.readOnly ? o : null}${this.prefixText ? v : null}<div class=${s(a.wrapper)}>${f}${this.isClearable ? i : null}${this.requestedIcon ? d : null}${this.loading ? t : null}</div><div class=${s(a.actionWrapper)} ${z(this.actionWrapperRef)}><slot name=${se.action}></slot></div>${this.numberButtonType === "vertical" && !this.readOnly ? h : null}${this.suffixText ? p : null}${this.numberButtonType === "horizontal" && !this.readOnly ? c : null}${K({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? ae({ icon: this.validationIcon, id: E.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
P("calcite-input-number", ue);
export {
  ue as InputNumber
};
