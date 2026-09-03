/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as x, L as m, c, T as h, s as a, b as l, A as n, F as E, d as k } from "./index.js";
import { l as w } from "./live.js";
import { e as d, n as u } from "./ref.js";
import { b as I, u as y } from "./index2.js";
import { z as b } from "./dom.js";
import { u as C } from "./useForm.js";
import { g as $ } from "./label.js";
import { u as T } from "./useLabel.js";
import { g as z } from "./component.js";
import { C as V } from "./ClearButton.js";
import { I as M } from "./InternalLabel.js";
import { U as L, C as R, I as S } from "./useInlineEditable.js";
import { V as q } from "./Validation.js";
import { u as F } from "./useT9n.js";
import { u as O } from "./useSetFocus.js";
import { u as H } from "./useInteractive.js";
const i = {
  loader: "loader",
  clearable: "clearable",
  clearButton: "clear-button",
  editingEnabled: "editing-enabled",
  hasPrefix: "has-prefix",
  hasSuffix: "has-suffix",
  inlineChild: "inline-child",
  inlineEditableChild: "inline-editable-child",
  // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
  inlineEditable: "inline-editable",
  inputIcon: "icon",
  prefix: "prefix",
  suffix: "suffix",
  wrapper: "element-wrapper",
  inputWrapper: "wrapper",
  actionWrapper: "action-wrapper"
}, g = {
  validationMessage: "inputTextValidationMessage"
}, W = {
  action: "action"
}, B = x`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;--calcite-internal-input-text-focus-outline-color: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([scale=s]){--calcite-internal-input-text-icon-padding-inline: var(--calcite-spacing-fixed-sm)}:host([scale=s]) input{padding-inline-start:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, var(--calcite-spacing-sm))}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=s]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=s]) .prefix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-xxs)}:host([scale=s]) .has-suffix input{padding-inline-end:var(var(--calcite-internal-input-text-input-padding-inline-end), var(var(--calcite-spacing-xxs)))}:host([scale=s]) .suffix{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=s]) .action-wrapper{block-size:1.5rem}:host([scale=s]) .clear-button{block-size:var(--calcite-spacing-xxl)}:host([scale=m]){--calcite-internal-input-text-icon-padding-inline: var(--calcite-spacing-fixed-md)}:host([scale=m]) input{padding-inline-start:var(--calcite-spacing-md);padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, var(--calcite-spacing-md))}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=m]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xs)}:host([scale=m]) .prefix{padding-inline:var(--calcite-spacing-md) var(--calcite-spacing-xs)}:host([scale=m]) .has-suffix input{padding-inline-end:var(var(--calcite-internal-input-text-input-padding-inline-end), var(var(--calcite-spacing-xs)))}:host([scale=m]) .suffix{padding-inline:var(--calcite-spacing-xs) var(--calcite-spacing-md)}:host([scale=m]) .action-wrapper{block-size:2rem}:host([scale=l]){--calcite-internal-input-text-icon-padding-inline: var(--calcite-spacing-fixed-lg)}:host([scale=l]) input{padding-inline-start:var(--calcite-spacing-lg);padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, var(--calcite-spacing-lg))}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l]) .has-prefix input{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=l]) .prefix{padding-inline:var(--calcite-spacing-lg) var(--calcite-spacing-sm)}:host([scale=l]) .has-suffix input{padding-inline-end:var(var(--calcite-internal-input-text-input-padding-inline-end), var(var(--calcite-spacing-sm)))}:host([scale=l]) .suffix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-lg)}:host([scale=l]) .action-wrapper{block-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none;position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-style:solid;font-family:inherit;font-weight:var(--calcite-font-weight-normal);outline:none;background-color:var(--calcite-input-text-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-text-text-color, var(--calcite-color-text-1));border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input));text-align:var(--calcite-internal-input-text-alignment);border-inline-start-width:var(--calcite-internal-input-text-input-border-inline-start-width, var(--calcite-border-width-sm));border-inline-end-width:var(--calcite-internal-input-text-input-border-inline-end-width, var(--calcite-border-width-sm));border-block-start-width:var(--calcite-internal-input-text-input-border-block-start-width, var(--calcite-border-width-sm));border-block-end-width:var(--calcite-internal-input-text-input-border-block-end-width, var(--calcite-border-width-sm))}input:placeholder-shown{text-overflow:ellipsis}.element-wrapper,input{border-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp))}.has-prefix input,.element-wrapper:has(.icon) input{border-start-start-radius:0;border-end-start-radius:0;--calcite-internal-input-text-input-border-inline-start-width: var(--calcite-border-width-none)}.element-wrapper:has(.clear-button) input,.has-suffix input{border-start-end-radius:0;border-end-end-radius:0;--calcite-internal-input-text-input-border-inline-end-width: var(--calcite-border-width-none)}.has-prefix .prefix,.element-wrapper:not(:has(.prefix)):has(.icon) .icon{border-start-start-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp))}.has-suffix .suffix,:host([clearable]) .clear-button{border-end-end-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-text-corner-radius, var(--calcite-corner-radius-sharp))}:host([clearable]) .has-suffix .clear-button{border-end-end-radius:0;border-start-end-radius:0}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-text-text-color-focus, var(--calcite-color-text-1))}input[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-text-background-color, var(--calcite-color-background))}input[readonly]:focus{color:var(--calcite-input-text-text-color-focus, var(--calcite-color-text-1))}:host([read-only]) .prefix,:host([read-only]) .icon,:host([read-only]) .clear-button,:host([read-only]) .suffix{background-color:var(--calcite-input-text-background-color, var(--calcite-color-background))}calcite-icon{color:var(--calcite-input-action-icon-color, var(--calcite-color-text-3))}.element-wrapper{position:relative;display:inline-flex;flex:1 1 0%;align-items:center;isolation:isolate;order:3}.element-wrapper:has(input:focus){outline:var(--calcite-border-width-md) solid var(--calcite-internal-input-text-focus-outline-color);outline-offset:calc(var(--calcite-border-width-sm) * -2)}.element-wrapper:has(input:focus) input{z-index:calc(var(--calcite-z-index) * -1)}:host([status=invalid]) .prefix,:host([status=invalid]) .icon,:host([status=invalid]) input,:host([status=invalid]) .clear-button,:host([status=invalid]) .suffix{border-color:var(--calcite-color-status-danger)}:host([status=invalid]){--calcite-internal-input-text-focus-outline-color: var(--calcite-color-status-danger)}.icon{box-sizing:border-box;display:flex;align-self:stretch;border-style:solid;border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-text-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-text-icon-color, var(--calcite-color-text-3));align-items:center;padding-inline-start:var(--calcite-internal-input-text-icon-padding-inline);border-block-start-width:var(--calcite-internal-input-text-icon-border-block-start-width, var(--calcite-border-width-sm));border-inline-end-width:var(--calcite-internal-input-text-icon-border-inline-end-width, var(--calcite-border-width-none));border-block-end-width:var(--calcite-internal-input-text-icon-border-block-end-width, var(--calcite-border-width-sm));border-inline-start-width:var(--calcite-internal-input-text-icon-border-inline-start-width, var(--calcite-border-width-sm))}.has-prefix .icon{--calcite-internal-input-text-icon-border-inline-start-width: var(--calcite-border-width-none)}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}.clear-button{box-sizing:border-box;display:flex;align-self:stretch;order:4;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input));border-inline-start-width:var(--calcite-border-width-none);background-color:var(--calcite-input-text-background-color, var(--calcite-color-foreground-1))}.has-suffix .clear-button{border-inline-end-width:0}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.loader calcite-progress{--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.inline-editable{order:7}.action-wrapper{order:8;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;line-height:1;font-weight:var(--calcite-font-weight-regular);border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input))}.prefix{order:0;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size-x, auto);background-color:var(--calcite-input-text-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size-x, auto);background-color:var(--calcite-input-text-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}:host([alignment=start]){--calcite-internal-input-text-alignment: start}:host([alignment=center]){--calcite-internal-input-text-alignment: center}:host([alignment=end]){--calcite-internal-input-text-alignment: end}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child.inline-editable-child{background-color:transparent}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.element-wrapper:has(input.inline-child:not(.editing-enabled)) .loader,.element-wrapper:has(input.inline-child:not(.editing-enabled)) .prefix,.element-wrapper:has(input.inline-child:not(.editing-enabled)) .icon,.element-wrapper:has(input.inline-child:not(.editing-enabled)) .clear-button,.element-wrapper:has(input.inline-child:not(.editing-enabled)) .suffix{display:none}:host([inline-editable]:not([editing-enabled])) .wrapper:hover input,:host([inline-editable]:not([editing-enabled])) .wrapper:hover .inline-editable,:host([inline-editable]:not([editing-enabled])) .wrapper:hover .action-wrapper,:host:has(input.inline-child:not(.inline-editable-child):not(.editing-enabled)) .wrapper:hover input,:host:has(input.inline-child:not(.inline-editable-child):not(.editing-enabled)) .wrapper:hover .inline-editable,:host:has(input.inline-child:not(.inline-editable-child):not(.editing-enabled)) .wrapper:hover .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-text-inline-editable-background-color-hover, var(--calcite-color-foreground-2))}:host([inline-editable]) input,:host([inline-editable]) .inline-editable,:host([inline-editable]) .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-text-background-color, var(--calcite-color-foreground-1))}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-text-placeholder-text-color, var(--calcite-color-text-3))}.clear-button--container{display:flex;cursor:pointer;align-items:center}.clear-button--container:hover calcite-action{--calcite-action-background-color: var(--calcite-input-action-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color: var(--calcite-input-action-icon-color-hover, var(--calcite-color-text-1))}.clear-button--container:active calcite-action{--calcite-action-background-color: var(--calcite-input-action-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color: var(--calcite-input-action-icon-color-press, var(--calcite-color-text-1))}.clear-button--container calcite-action{--calcite-internal-action-height: 100%;--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-input-action-background-color, var(--calcite-color-foreground-2));--calcite-action-text-color: var(--calcite-input-action-icon-color)}.clear-button--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-action-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color-press: var(--calcite-input-action-icon-color-hover)}.clear-button--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-action-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color-press: var(--calcite-input-action-icon-color-press)}:host([scale=s]) .clear-button--container{padding:var(--calcite-space-2xs)}:host([scale=m]) .clear-button--container{padding:var(--calcite-space-2xs);padding-inline-end:var(--calcite-space-sm)}:host([scale=l]) .clear-button--container{padding-inline-end:var(--calcite-space-sm-plus)}.inline-editable--container{display:flex;cursor:pointer;align-items:center}.inline-editable--container .enable-editing,.inline-editable--container .confirm-changes,.inline-editable--container .cancel-editing{margin-inline-start:var(--calcite-space-2xs)}.inline-editable--container .enable-editing{--calcite-action-text-color: var(--calcite-input-text-inline-editable-control-text-color, var(--calcite-color-text-1))}.inline-editable--container calcite-action{--calcite-action-background-color: var(--calcite-input-text-inline-editable-control-background-color);--calcite-action-corner-radius: var(--calcite-input-text-inline-editable-control-corner-radius);--calcite-action-loader-color: var(--calcite-input-text-inline-editable-control-loader-color);--calcite-action-text-color: var(--calcite-input-text-inline-editable-control-text-color)}.inline-editable--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-text-inline-editable-control-background-color-hover, var(--calcite-input-text-inline-editable-control-background-color));--calcite-action-text-color-press: var(--calcite-input-text-inline-editable-control-text-color-press, var(--calcite-input-text-inline-editable-control-text-color))}.inline-editable--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-text-inline-editable-control-background-color-press, var(--calcite-input-text-inline-editable-control-background-color));--calcite-action-text-color-press: var(--calcite-input-text-inline-editable-control-text-color-press, var(--calcite-input-text-inline-editable-control-text-color))}`;
class P extends m {
  constructor() {
    super(), this.actionWrapperRef = d(), this.attributeWatch = I(["autofocus", "enterkeyhint", "inputmode", "spellcheck"], this.handleGlobalAttributesChanged), this.childRef = d(), this.enableInlineEditingButtonRef = d(), this.direction = y(), this.inputWrapperRef = d(), this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.messages = F({ blocking: !0 }), this.focusSetter = O()(this), this.formSupport = C({
      inputType: "text"
    })(this), this.interactiveContainer = H(this), this.inlineEditableManager = new L({
      getEditingEnabled: () => this.editingEnabled,
      setEditingEnabled: (e) => {
        this.editingEnabled = e;
      },
      getValue: () => this.value,
      setValue: (e) => {
        this.setValue({ origin: "direct", value: e });
      },
      setFocus: () => {
        this.setFocus();
      },
      emitCancel: () => {
        this.calciteInputTextInlineEditableCancel.emit();
      },
      emitConfirm: () => {
        this.calciteInputTextInlineEditableConfirm.emit();
      },
      emitEnableEditingChange: () => {
        this.calciteInputTextInlineEditableChange.emit();
      }
    }), this.inlineEditableLoading = !1, this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.editingEnabled = !1, this.inlineEditable = !1, this.inlineEditableControls = !1, this.iconFlipRtl = !1, this.loading = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.calciteInputTextChange = c(), this.calciteInputTextInput = c(), this.calciteInternalInputTextBlur = c(), this.calciteInternalInputTextFocus = c(), this.calciteInputTextInlineEditableCancel = c({ cancelable: !1 }), this.calciteInputTextInlineEditableConfirm = c({ cancelable: !1 }), this.calciteInputTextInlineEditableChange = c({ cancelable: !1 }), T(this), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { inlineEditableLoading: 16, slottedActionElDisabledInternally: 16, alignment: 3, autocomplete: 1, clearable: 7, disabled: 7, editingEnabled: 7, inlineEditable: 7, inlineEditableControls: 7, inlineEditableAfterConfirm: 0, form: 3, icon: [3, { converter: h }], iconFlipRtl: 7, label: 1, labelText: 1, loading: 7, maxLength: 11, messageOverrides: 0, minLength: 11, name: 3, pattern: 1, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, suffixText: 1, validationIcon: [3, { converter: h }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = B;
  }
  get selfManagedInlineEditable() {
    return this.inlineEditable && !this.inlineEditableEl;
  }
  get hasInlineEditableContext() {
    return this.inlineEditable || !!this.inlineEditableEl;
  }
  get inlineEditableEnabledInContext() {
    return this.inlineEditableEl ? this.inlineEditableEl.editingEnabled : this.editingEnabled;
  }
  get isClearable() {
    return this.clearable && this.value.length > 0;
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
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable") ?? void 0, this.inlineEditableEl && (this.editingEnabled = this.inlineEditableEl.editingEnabled || !1);
  }
  async load() {
    this.requestedIcon = b({}, this.icon, "text"), this.setPreviousEmittedValue(this.value), this.setPreviousValue(this.value);
  }
  willUpdate(e) {
    e.has("icon") && (this.requestedIcon = b({}, this.icon, "text"));
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
    if (!(this.readOnly || this.disabled || e.defaultPrevented)) {
      if (this.selfManagedInlineEditable && this.editingEnabled && e.key === "Escape") {
        if (e.preventDefault(), this.clearable && this.value?.length > 0) {
          this.clearInputTextValue(e);
          return;
        }
        this.inlineEditableManager.cancelEditing(), requestAnimationFrame(() => {
          this.enableInlineEditingButtonRef.value?.setFocus();
        });
        return;
      }
      this.isClearable && e.key === "Escape" && (!this.hasInlineEditableContext || this.inlineEditableEnabledInContext) && (this.clearInputTextValue(e), e.preventDefault()), e.key === "Enter" && this.formSupport.active && (this.formSupport.requestSubmit(), e.preventDefault());
    }
  }
  onLabelClick() {
    if (this.selfManagedInlineEditable && !this.editingEnabled) {
      this.inlineEditableManager.enable();
      return;
    }
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
    }), this.selfManagedInlineEditable && this.editingEnabled && !this.inlineEditableControls && this.inlineEditableManager.disable(), this.emitChangeIfUserModified();
  }
  clickHandler(e) {
    if (this.disabled)
      return;
    const t = e.composedPath(), r = t.some((o) => o instanceof HTMLElement && o.classList.contains(R.container));
    if (!(!t.includes(this.inputWrapperRef.value) || t.includes(this.actionWrapperRef.value) || r)) {
      if (this.selfManagedInlineEditable && !this.editingEnabled) {
        e.preventDefault(), this.inlineEditableManager.enable();
        return;
      }
      this.setFocus();
    }
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
  setInputValue(e) {
    this.childRef.value && (this.childRef.value.value = e);
  }
  setPreviousEmittedValue(e) {
    this.previousEmittedValue = e;
  }
  setPreviousValue(e) {
    this.previousValue = e;
  }
  setValue({ committing: e = !1, nativeEvent: t, origin: r, previousValue: o, value: s }) {
    this.setPreviousValue(o ?? this.value), this.previousValueOrigin = r, this.userChangedValue = r === "user" && s !== this.value, this.value = s, r === "direct" && (this.setInputValue(s), this.setPreviousEmittedValue(s)), t && (this.calciteInputTextInput.emit().defaultPrevented ? this.value = this.previousValue : e && this.emitChangeIfUserModified());
  }
  render() {
    const e = this.direction, t = l`<div class=${a(i.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, r = l`<div class=${a(i.clearButton)} @click=${this.disabled || this.readOnly ? void 0 : this.clearInputTextValue}>${V({ ariaLabel: this.messages.clear, disabled: this.disabled || this.readOnly, scale: this.scale, title: this.messages.clear })}</div>`, o = l`<div class=${a(i.inputIcon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${z(this.scale)}></calcite-icon></div>`, s = l`<div class=${a(i.prefix)}>${this.prefixText}</div>`, p = l`<div class=${a(i.suffix)}>${this.suffixText}</div>`, v = l`<input aria-errormessage=${g.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${$(this)} autocomplete=${this.autocomplete ?? n} .autofocus=${this.el.autofocus} class=${a({
      [i.editingEnabled]: this.inlineEditableEnabledInContext,
      [i.inlineChild]: this.hasInlineEditableContext,
      [i.inlineEditableChild]: !!this.inlineEditableEl
      // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
    })} value=${this.defaultValue ?? n} .disabled=${this.disabled} enterkeyhint=${this.el.enterKeyHint ?? n} inputmode=${this.el.inputMode ?? n} maxlength=${this.maxLength ?? n} minlength=${this.minLength ?? n} name=${this.name ?? n} @blur=${this.inputTextBlurHandler} @focus=${this.inputTextFocusHandler} @input=${this.inputTextInputHandler} @keydown=${this.inputTextKeyDownHandler} pattern=${this.pattern ?? n} placeholder=${(this.placeholder || "") ?? n} .readOnly=${this.readOnly} .required=${this.required} spellcheck=${this.el.spellcheck ?? n} tabindex=${(this.disabled || this.hasInlineEditableContext && !this.inlineEditableEnabledInContext ? -1 : void 0) ?? n} type=text .value=${w(this.value ?? "")} ${u(this.childRef)}>`;
    return this.interactiveContainer({ disabled: this.disabled, children: l`${this.labelText && M({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${a({
      [i.inputWrapper]: !0,
      [E.rtl]: e === "rtl",
      [i.clearable]: this.isClearable,
      [i.hasSuffix]: this.suffixText,
      [i.hasPrefix]: this.prefixText
    })} ${u(this.inputWrapperRef)}><div class=${a(i.wrapper)}>${this.loading ? t : null}${this.prefixText ? s : null}${this.requestedIcon ? o : null}${v}${this.isClearable ? r : null}${this.suffixText ? p : null}</div>${this.selfManagedInlineEditable && l`<div class=${a(i.inlineEditable)}>${S({ cancelEditingLabel: this.messages.cancelInlineEditing, confirmChangesLabel: this.messages.confirmInlineEditingChanges, editingEnabled: this.editingEnabled, enableEditingButtonRef: this.enableInlineEditingButtonRef, enableEditingLabel: this.messages.enableInlineEditing, loading: this.inlineEditableLoading, onCancelEditing: () => this.inlineEditableManager.cancelEditing(), onConfirmChanges: () => this.inlineEditableManager.confirm(this.inlineEditableAfterConfirm, (f) => {
      this.inlineEditableLoading = f;
    }), onEnableEditing: () => this.inlineEditableManager.enable(), scale: this.scale, showControls: this.editingEnabled && this.inlineEditableControls })}</div>` || ""}<div class=${a(i.actionWrapper)} ${u(this.actionWrapperRef)}><slot name=${W.action}></slot></div></div>${this.validationMessage && this.status === "invalid" ? q({ icon: this.validationIcon, id: g.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
k("calcite-input-text", P);
export {
  P as InputText
};
