/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as b, L as m, c as r, H as g, s as l, b as c, A as n, C as x, d as E } from "./index.js";
import { l as w } from "./live.js";
import { e as d, n as h } from "./ref.js";
import { b as I, u as k } from "./index2.js";
import { A as v } from "./dom.js";
import { u as C } from "./useForm.js";
import { u as y, U as V, i as T, C as $, I as z, a as M } from "./useAffixWidth.js";
import { g as R } from "./label.js";
import { u as L } from "./useLabel.js";
import { g as S } from "./component.js";
import { C as B } from "./ClearButton.js";
import { I as D } from "./InternalLabel.js";
import { V as F } from "./Validation.js";
import { u as H } from "./useT9n.js";
import { u as W } from "./useFocusable.js";
import { u as q } from "./useInteractive.js";
const e = {
  loader: "loader",
  clearable: "clearable",
  clearButton: "clear-button",
  inlineEditing: "inline-editing",
  hasPrefix: "has-prefix",
  hasSuffix: "has-suffix",
  inlineChild: "inline-child",
  inlineEditableChild: "inline-editable-child",
  // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
  inlineEdit: "inline-edit",
  inputIcon: "icon",
  prefix: "prefix",
  suffix: "suffix",
  wrapper: "element-wrapper",
  inputWrapper: "wrapper",
  actionWrapper: "action-wrapper"
}, f = {
  validationMessage: "inputTextValidationMessage"
}, O = {
  action: "action"
}, P = b`:host([disabled]){opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;--calcite-internal-input-text-focus-outline-color: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) );--calcite-internal-input-affix-prefix-width: unset;--calcite-internal-input-affix-suffix-width: unset}:host([scale=s]){--calcite-internal-input-text-icon-padding-inline: var(--calcite-theme-space-sm, var(--calcite-spacing-fixed-sm))}:host([scale=s]) input{padding-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm));padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, var(--calcite-theme-space-sm, var(--calcite-spacing-sm)))}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);block-size:var(--calcite-space-2xl)}:host([scale=s]) .has-prefix input{padding-inline-start:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=s]) .prefix{padding-inline:var(--calcite-theme-space-sm, var(--calcite-spacing-sm)) var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=s]) .has-suffix input{padding-inline-end:var(var(--calcite-internal-input-text-input-padding-inline-end), var(var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))))}:host([scale=s]) .suffix{padding-inline:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs)) var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .action-wrapper{block-size:var(--calcite-space-2xl)}:host([scale=s]) .clear-button{block-size:var(--calcite-theme-space-2xl, var(--calcite-spacing-xxl))}:host([scale=m]){--calcite-internal-input-text-icon-padding-inline: var(--calcite-theme-space-md, var(--calcite-spacing-fixed-md))}:host([scale=m]) input{padding-inline-start:var(--calcite-theme-space-md, var(--calcite-spacing-md));padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, var(--calcite-theme-space-md, var(--calcite-spacing-md)))}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);block-size:var(--calcite-space-3xl)}:host([scale=m]) .has-prefix input{padding-inline-start:var(--calcite-theme-space-xs, var(--calcite-spacing-xs))}:host([scale=m]) .prefix{padding-inline:var(--calcite-theme-space-md, var(--calcite-spacing-md)) var(--calcite-theme-space-xs, var(--calcite-spacing-xs))}:host([scale=m]) .has-suffix input{padding-inline-end:var(var(--calcite-internal-input-text-input-padding-inline-end), var(var(--calcite-theme-space-xs, var(--calcite-spacing-xs))))}:host([scale=m]) .suffix{padding-inline:var(--calcite-theme-space-xs, var(--calcite-spacing-xs)) var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=m]) .action-wrapper{block-size:var(--calcite-space-3xl)}:host([scale=l]){--calcite-internal-input-text-icon-padding-inline: var( --calcite-theme-space-md-plus, var(--calcite-spacing-fixed-lg) )}:host([scale=l]) input{padding-inline-start:var(--calcite-theme-space-lg, var(--calcite-spacing-lg));padding-inline-end:var(--calcite-internal-input-text-input-padding-inline-end, var(--calcite-theme-space-lg, var(--calcite-spacing-lg)))}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);block-size:var(--calcite-space-4xl)}:host([scale=l]) .has-prefix input{padding-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]) .prefix{padding-inline:var(--calcite-theme-space-lg, var(--calcite-spacing-lg)) var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]) .has-suffix input{padding-inline-end:var(var(--calcite-internal-input-text-input-padding-inline-end), var(var(--calcite-theme-space-sm, var(--calcite-spacing-sm))))}:host([scale=l]) .suffix{padding-inline:var(--calcite-theme-space-sm, var(--calcite-spacing-sm)) var(--calcite-theme-space-lg, var(--calcite-spacing-lg))}:host([scale=l]) .action-wrapper{block-size:var(--calcite-space-4xl)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:var(--calcite-opacity-full)}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none;box-sizing:border-box;border-style:solid;display:flex;flex:1 1 0%;font-family:inherit;font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal));margin:var(--calcite-space-none);max-block-size:100%;max-inline-size:100%;position:relative;text-overflow:ellipsis;inline-size:100%;outline:none;background-color:var(--calcite-input-text-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));color:var(--calcite-input-text-text-color, var(--calcite-color-text-1));border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input));text-align:var(--calcite-internal-input-text-alignment);border-inline-start-width:var(--calcite-internal-input-text-input-border-inline-start-width, var(--calcite-border-width-sm));border-inline-end-width:var(--calcite-internal-input-text-input-border-inline-end-width, var(--calcite-border-width-sm));border-block-start-width:var(--calcite-internal-input-text-input-border-block-start-width, var(--calcite-border-width-sm));border-block-end-width:var(--calcite-internal-input-text-input-border-block-end-width, var(--calcite-border-width-sm))}input:placeholder-shown{text-overflow:ellipsis}.element-wrapper,input{border-radius:var(--calcite-input-text-corner-radius, var(--calcite-theme-corner-radius-none, var(--calcite-corner-radius-sharp)))}.has-prefix input,.element-wrapper:has(.icon) input{border-start-start-radius:0;border-end-start-radius:0;--calcite-internal-input-text-input-border-inline-start-width: var(--calcite-border-width-none)}.element-wrapper:has(.clear-button) input,.has-suffix input{border-start-end-radius:0;border-end-end-radius:0;--calcite-internal-input-text-input-border-inline-end-width: var(--calcite-border-width-none)}.has-prefix .prefix,.element-wrapper:not(:has(.prefix)):has(.icon) .icon{border-start-start-radius:var(--calcite-input-text-corner-radius, var(--calcite-theme-corner-radius-none, var(--calcite-corner-radius-sharp)));border-end-start-radius:var(--calcite-input-text-corner-radius, var(--calcite-theme-corner-radius-none, var(--calcite-corner-radius-sharp)))}.has-suffix .suffix,:host([clearable]) .clear-button{border-end-end-radius:var(--calcite-input-text-corner-radius, var(--calcite-theme-corner-radius-none, var(--calcite-corner-radius-sharp)));border-start-end-radius:var(--calcite-input-text-corner-radius, var(--calcite-theme-corner-radius-none, var(--calcite-corner-radius-sharp)))}:host([clearable]) .has-suffix .clear-button{border-end-end-radius:0;border-start-end-radius:0}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-text-text-color-focus, var(--calcite-color-text-1))}input[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-text-background-color, var(--calcite-theme-color-surface-1, var(--calcite-color-background)))}input[readonly]:focus{color:var(--calcite-input-text-text-color-focus, var(--calcite-color-text-1))}:host([read-only]) .prefix,:host([read-only]) .icon,:host([read-only]) .clear-button,:host([read-only]) .suffix{background-color:var(--calcite-input-text-background-color, var(--calcite-theme-color-surface-1, var(--calcite-color-background)))}calcite-icon{color:var(--calcite-input-action-icon-color, var(--calcite-color-text-3))}.element-wrapper{position:relative;display:inline-flex;flex:1 1 0%;align-items:center;isolation:isolate;order:3}.element-wrapper:has(input:focus){outline:var(--calcite-border-width-md) solid var(--calcite-internal-input-text-focus-outline-color);outline-offset:calc(var(--calcite-border-width-sm) * -2)}.element-wrapper:has(input:focus) input{z-index:calc(var(--calcite-z-index) * -1)}:host([status=invalid]) .prefix,:host([status=invalid]) .icon,:host([status=invalid]) input,:host([status=invalid]) .clear-button,:host([status=invalid]) .suffix{border-color:var(--calcite-color-status-danger)}:host([status=invalid]){--calcite-internal-input-text-focus-outline-color: var(--calcite-color-status-danger)}.icon{box-sizing:border-box;display:flex;align-self:stretch;border-style:solid;border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-text-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));color:var(--calcite-input-text-icon-color, var(--calcite-color-text-3));align-items:center;padding-inline-start:var(--calcite-internal-input-text-icon-padding-inline);border-block-start-width:var(--calcite-internal-input-text-icon-border-block-start-width, var(--calcite-border-width-sm));border-inline-end-width:var(--calcite-internal-input-text-icon-border-inline-end-width, var(--calcite-border-width-none));border-block-end-width:var(--calcite-internal-input-text-icon-border-block-end-width, var(--calcite-border-width-sm));border-inline-start-width:var(--calcite-internal-input-text-icon-border-inline-start-width, var(--calcite-border-width-sm))}.has-prefix .icon{--calcite-internal-input-text-icon-border-inline-start-width: var(--calcite-border-width-none)}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:var(--calcite-space-none);inline-size:var(--calcite-space-none)}.clear-button{box-sizing:border-box;display:flex;align-self:stretch;order:4;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input));border-inline-start-width:var(--calcite-border-width-none);background-color:var(--calcite-input-text-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)))}.has-suffix .clear-button{border-inline-end-width:0}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.loader calcite-progress{--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.inline-edit{order:7}.action-wrapper{order:8;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:var(--calcite-border-width-sm);border-style:solid;line-height:var(--calcite-font-line-height-relative-base);font-weight:var(--calcite-font-weight-regular);border-color:var(--calcite-input-text-border-color, var(--calcite-color-border-input))}.prefix{order:0;border-inline-end-width:var(--calcite-border-width-none);inline-size:var(--calcite-internal-input-affix-prefix-width, var(--calcite-input-prefix-size-x, auto));background-color:var(--calcite-input-text-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:var(--calcite-border-width-none);inline-size:var(--calcite-internal-input-affix-suffix-width, var(--calcite-input-suffix-size-x, auto));background-color:var(--calcite-input-text-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}:host([alignment=start]){--calcite-internal-input-text-alignment: start}:host([alignment=center]){--calcite-internal-input-text-alignment: center}:host([alignment=end]){--calcite-internal-input-text-alignment: end}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child.inline-editable-child{background-color:var(--calcite-color-transparent)}input.inline-child .inline-editing{background-color:inherit}input.inline-child:not(.inline-editing){border-color:var(--calcite-color-transparent);display:flex;cursor:pointer;text-overflow:ellipsis;padding-inline-start:0}.element-wrapper:has(input.inline-child:not(.inline-editing)) .loader,.element-wrapper:has(input.inline-child:not(.inline-editing)) .prefix,.element-wrapper:has(input.inline-child:not(.inline-editing)) .icon,.element-wrapper:has(input.inline-child:not(.inline-editing)) .clear-button,.element-wrapper:has(input.inline-child:not(.inline-editing)) .suffix{display:none}:host([inline-edit]:not([inline-editing])) .wrapper:hover input,:host([inline-edit]:not([inline-editing])) .wrapper:hover .inline-edit,:host([inline-edit]:not([inline-editing])) .wrapper:hover .action-wrapper,:host:has(input.inline-child:not(.inline-editable-child):not(.inline-editing)) .wrapper:hover input,:host:has(input.inline-child:not(.inline-editable-child):not(.inline-editing)) .wrapper:hover .inline-edit,:host:has(input.inline-child:not(.inline-editable-child):not(.inline-editing)) .wrapper:hover .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-text-inline-edit-background-color-hover, var(--calcite-theme-color-surface-3, var(--calcite-color-foreground-2)))}:host([inline-edit]) input,:host([inline-edit]) .inline-edit,:host([inline-edit]) .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-text-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)))}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-theme-space-base, var(--calcite-spacing-base))}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size-relative-sm)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size-relative-base)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-relative-md)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal));color:var(--calcite-input-text-placeholder-text-color, var(--calcite-color-text-3))}.clear-button--container{display:flex;cursor:pointer;align-items:center}.clear-button--container:hover calcite-action{--calcite-action-background-color: var( --calcite-input-action-background-color-hover, var(--calcite-theme-color-surface-4, var(--calcite-color-foreground-3)) );--calcite-action-text-color: var(--calcite-input-action-icon-color-hover, var(--calcite-color-text-1))}.clear-button--container:active calcite-action{--calcite-action-background-color: var(--calcite-input-action-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color: var(--calcite-input-action-icon-color-press, var(--calcite-color-text-1))}.clear-button--container calcite-action{--calcite-internal-action-height: 100%;--calcite-internal-action-padding-inline: var(--calcite-theme-space-none, var(--calcite-spacing-none));--calcite-internal-action-padding-block: var(--calcite-theme-space-none, var(--calcite-spacing-none));--calcite-action-background-color: var( --calcite-input-action-background-color, var(--calcite-theme-color-surface-3, var(--calcite-color-foreground-2)) );--calcite-action-text-color: var(--calcite-input-action-icon-color)}.clear-button--container calcite-action:hover{--calcite-action-background-color-hover: var( --calcite-input-action-background-color-hover, var(--calcite-theme-color-surface-4, var(--calcite-color-foreground-3)) );--calcite-action-text-color-press: var(--calcite-input-action-icon-color-hover)}.clear-button--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-action-background-color-press, var(--calcite-input-action-background-color));--calcite-action-text-color-press: var(--calcite-input-action-icon-color-press)}:host([scale=s]) .clear-button--container{padding:var(--calcite-space-2xs)}:host([scale=m]) .clear-button--container{padding:var(--calcite-space-2xs);padding-inline-end:var(--calcite-space-sm)}:host([scale=l]) .clear-button--container{padding-inline-end:var(--calcite-space-sm-plus)}.inline-edit--container{display:flex;cursor:pointer;align-items:center}.inline-edit--container .enable-editing,.inline-edit--container .confirm-changes,.inline-edit--container .cancel-editing{margin-inline-start:var(--calcite-space-2xs)}.inline-edit--container .enable-editing{--calcite-action-text-color: var(--calcite-input-text-inline-edit-control-text-color, var(--calcite-color-text-1))}.inline-edit--container calcite-action{--calcite-action-background-color: var(--calcite-input-text-inline-edit-control-background-color);--calcite-action-corner-radius: var(--calcite-input-text-inline-edit-control-corner-radius);--calcite-action-loader-color: var(--calcite-input-text-inline-edit-control-loader-color);--calcite-action-text-color: var(--calcite-input-text-inline-edit-control-text-color)}.inline-edit--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-text-inline-edit-control-background-color-hover, var(--calcite-input-text-inline-edit-control-background-color));--calcite-action-text-color-press: var(--calcite-input-text-inline-edit-control-text-color-press, var(--calcite-input-text-inline-edit-control-text-color))}.inline-edit--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-text-inline-edit-control-background-color-press, var(--calcite-input-text-inline-edit-control-background-color));--calcite-action-text-color-press: var(--calcite-input-text-inline-edit-control-text-color-press, var(--calcite-input-text-inline-edit-control-text-color))}`;
class A extends m {
  constructor() {
    super(), this.actionWrapperRef = d(), this.attributeWatch = I(["autofocus", "enterkeyhint", "inputmode", "spellcheck"], this.handleGlobalAttributesChanged), this.childRef = d(), this.prefixRef = d(), this.suffixRef = d(), this._affixWidth = y()(this), this.enableInlineEditingButtonRef = d(), this.direction = k(), this.inputWrapperRef = d(), this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.messages = H({ blocking: !0 }), this.focusSetter = W()(this).setFocus, this.formSupport = C({
      inputType: "text"
    })(this), this.interactiveContainer = q(this), this.inlineEditManager = new V({
      getInlineEditing: () => this.inlineEditing,
      setInlineEditing: (i) => {
        this.inlineEditing = i;
      },
      getValue: () => this.value,
      restoreValue: (i) => {
        this.restoreInlineEditingValue(i);
      },
      commitValue: () => this.commitInlineEditingValue(),
      setFocus: async (i) => {
        await this.setFocus(), this.inlineEditManager.setCaretPosition(this.childRef.value, i);
      },
      emitCancel: () => {
        this.calciteInputTextInlineEditingCancel.emit();
      },
      emitConfirm: () => {
        this.calciteInputTextInlineEditingConfirm.emit();
      },
      emitEnableEditingChange: () => {
        this.calciteInputTextInlineEditingChange.emit();
      }
    }), this.inlineEditingLoading = !1, this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.inlineEditing = !1, this.inlineEdit = !1, this.iconFlipRtl = !1, this.loading = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.calciteInputTextChange = r(), this.calciteInputTextInlineEditingCancel = r({ cancelable: !1 }), this.calciteInputTextInlineEditingChange = r({ cancelable: !1 }), this.calciteInputTextInlineEditingConfirm = r({ cancelable: !1 }), this.calciteInputTextInput = r(), this.calciteInternalInputTextBlur = r(), this.calciteInternalInputTextFocus = r(), this.calciteInternalAffixChange = r({ cancelable: !1 }), L(this), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { affixWidth: 32, draftValue: 16, inlineEditingLoading: 16, slottedActionElDisabledInternally: 16, alignment: 3, autocomplete: 1, clearable: 7, disabled: 7, inlineEditing: 7, inlineEdit: [3, { converter: T }], inlineEditingBeforeConfirm: 0, form: 3, icon: [3, { converter: g }], iconFlipRtl: 7, label: 1, labelText: 1, loading: 7, maxLength: 11, messageOverrides: 0, minLength: 11, name: 3, pattern: 1, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, suffixText: 1, validationIcon: [3, { converter: g }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = P;
  }
  get affixWidth() {
    return this._affixWidth;
  }
  get selfManagedInlineEdit() {
    return !!this.inlineEdit && !this.inlineEditableEl;
  }
  get hasInlineEditContext() {
    return !!this.inlineEdit || !!this.inlineEditableEl;
  }
  get inlineEditControlsDisabled() {
    return this.inlineEdit === "controls-disabled";
  }
  get inlineEditingEnabledInContext() {
    return this.inlineEditableEl ? this.inlineEditableEl.editingEnabled : this.inlineEditing;
  }
  get isStagingInlineEditingValue() {
    return this.selfManagedInlineEdit && this.inlineEditing;
  }
  get valueForEditing() {
    return this.draftValue ?? this.value;
  }
  get isClearable() {
    return this.clearable && this.valueForEditing.length > 0;
  }
  get value() {
    return this._value;
  }
  set value(i) {
    const t = this._value;
    i !== t && (this._value = i, this.valueWatcher(i, t));
  }
  async selectText() {
    this.childRef.value?.select();
  }
  async setFocus(i) {
    return this.focusSetter(() => this.childRef.value, i);
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable") ?? void 0;
  }
  async load() {
    this.requestedIcon = v({}, this.icon, "text"), this.setPreviousEmittedValue(this.value), this.setPreviousValue(this.value);
  }
  willUpdate(i) {
    i.has("inlineEditing") && this.inlineEditing && this.inlineEditManager.captureValuePriorToEditing(), i.has("icon") && (this.requestedIcon = v({}, this.icon, "text"));
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  valueWatcher(i, t) {
    this.userChangedValue || this.setValue({
      origin: "direct",
      previousValue: t,
      value: i || ""
    }), this.userChangedValue = !1;
  }
  keyDownHandler(i) {
    if (!(this.readOnly || this.disabled || i.defaultPrevented)) {
      if (this.selfManagedInlineEdit && this.inlineEditing && i.key === "Escape") {
        if (i.preventDefault(), this.isClearable) {
          this.clearInputTextValue(i);
          return;
        }
        this.inlineEditManager.cancelEditing(), requestAnimationFrame(() => {
          this.enableInlineEditingButtonRef.value?.setFocus();
        });
        return;
      }
      this.isClearable && i.key === "Escape" && (!this.hasInlineEditContext || this.inlineEditingEnabledInContext) && (this.clearInputTextValue(i), i.preventDefault()), i.key === "Enter" && this.formSupport.active && (this.formSupport.requestSubmit(), i.preventDefault());
    }
  }
  onLabelClick() {
    if (this.selfManagedInlineEdit && !this.inlineEditing) {
      this.inlineEditManager.enable();
      return;
    }
    this.setFocus();
  }
  clearInputTextValue(i) {
    this.setValue({
      committing: !0,
      nativeEvent: i,
      origin: "user",
      value: ""
    });
  }
  clearButtonPointerDownHandler(i) {
    this.hasInlineEditContext && this.inlineEditingEnabledInContext && i.preventDefault();
  }
  commitInlineEditingValue() {
    const i = this.draftValue;
    i !== void 0 && (this.draftValue = void 0, i !== this.value && (this.previousValueOrigin = "user", this.userChangedValue = !0, this.value = i, this.calciteInputTextChange.emit(), this.setPreviousEmittedValue(i)));
  }
  emitChangeIfUserModified() {
    this.isStagingInlineEditingValue || this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue && (this.calciteInputTextChange.emit(), this.setPreviousEmittedValue(this.value));
  }
  inputTextBlurHandler() {
    this.isStagingInlineEditingValue && this.inlineEditControlsDisabled && this.commitInlineEditingValue(), this.calciteInternalInputTextBlur.emit({
      element: this.childRef.value,
      value: this.value
    }), this.selfManagedInlineEdit && this.inlineEditing && this.inlineEditControlsDisabled && (this.inlineEditManager.disable(), this.calciteInputTextInlineEditingChange.emit()), this.emitChangeIfUserModified();
  }
  clickHandler(i) {
    if (this.disabled)
      return;
    const t = i.composedPath(), a = t.some((o) => o instanceof HTMLElement && o.classList.contains($.container));
    if (!(!t.includes(this.inputWrapperRef.value) || t.includes(this.actionWrapperRef.value) || a)) {
      if (this.selfManagedInlineEdit && !this.inlineEditing) {
        i.preventDefault(), this.inlineEditManager.enable();
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
  focusEnableInlineEditingButton() {
    this.updateComplete.then(() => {
      requestAnimationFrame(() => {
        this.enableInlineEditingButtonRef.value?.setFocus();
      });
    });
  }
  inlineEditCancelEditingHandler() {
    this.inlineEditManager.cancelEditing(), this.focusEnableInlineEditingButton();
  }
  async inlineEditConfirmChangesHandler() {
    await this.inlineEditManager.confirm(this.inlineEditingBeforeConfirm, (i) => {
      this.inlineEditingLoading = i;
    }), this.focusEnableInlineEditingButton();
  }
  inputTextInputHandler(i) {
    this.disabled || this.readOnly || this.setValue({
      nativeEvent: i,
      origin: "user",
      value: i.target.value
    });
  }
  async inputTextKeyDownHandler(i) {
    if (!(this.disabled || this.readOnly) && i.key === "Enter") {
      if (this.isStagingInlineEditingValue) {
        i.preventDefault();
        const t = i.currentTarget;
        this.inlineEditControlsDisabled ? t.blur() : (await this.inlineEditManager.confirm(this.inlineEditingBeforeConfirm, (a) => {
          this.inlineEditingLoading = a;
        }), this.focusEnableInlineEditingButton());
        return;
      }
      this.emitChangeIfUserModified();
    }
  }
  setInputValue(i) {
    this.childRef.value && (this.childRef.value.value = i);
  }
  setPreviousEmittedValue(i) {
    this.previousEmittedValue = i;
  }
  setPreviousValue(i) {
    this.previousValue = i;
  }
  restoreInlineEditingValue(i) {
    this.draftValue = void 0, this.setInputValue(i);
  }
  setValue({ committing: i = !1, nativeEvent: t, origin: a, previousValue: o, value: s }) {
    const p = this.valueForEditing, u = a === "user" && this.isStagingInlineEditingValue;
    this.setPreviousValue(o ?? p), this.previousValueOrigin = a, u ? this.draftValue = s : (this.userChangedValue = a === "user" && s !== this.value, this.value = s), a === "direct" && (this.draftValue = void 0, this.setInputValue(s), this.setPreviousEmittedValue(s)), t && !u && (this.calciteInputTextInput.emit().defaultPrevented ? this.value = this.previousValue : i && !u && this.emitChangeIfUserModified());
  }
  render() {
    const i = this.direction, t = c`<div class=${l(e.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, a = c`<div class=${l(e.clearButton)} @click=${this.disabled || this.readOnly ? void 0 : this.clearInputTextValue} @pointerdown=${this.clearButtonPointerDownHandler}>${B({ ariaLabel: this.messages.clear, disabled: this.disabled || this.readOnly, scale: this.scale, title: this.messages.clear })}</div>`, o = c`<div class=${l(e.inputIcon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${S(this.scale)}></calcite-icon></div>`, s = c`<div class=${l(e.prefix)} ${h(this.prefixRef)}>${this.prefixText}</div>`, p = c`<div class=${l(e.suffix)} ${h(this.suffixRef)}>${this.suffixText}</div>`, u = c`<input aria-errormessage=${f.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${R(this)} autocomplete=${this.autocomplete ?? n} .autofocus=${this.el.autofocus} class=${l({
      [e.inlineEditing]: this.inlineEditingEnabledInContext,
      [e.inlineChild]: this.hasInlineEditContext,
      [e.inlineEditableChild]: !!this.inlineEditableEl
      // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
    })} value=${this.defaultValue ?? n} .disabled=${this.disabled} enterkeyhint=${this.el.enterKeyHint ?? n} inputmode=${this.el.inputMode ?? n} maxlength=${this.maxLength ?? n} minlength=${this.minLength ?? n} name=${this.name ?? n} @blur=${this.inputTextBlurHandler} @focus=${this.inputTextFocusHandler} @input=${this.inputTextInputHandler} @keydown=${this.inputTextKeyDownHandler} pattern=${this.pattern ?? n} placeholder=${(this.placeholder || "") ?? n} .readOnly=${this.readOnly} .required=${this.required} spellcheck=${this.el.spellcheck ?? n} tabindex=${(this.disabled || this.hasInlineEditContext && !this.inlineEditingEnabledInContext ? -1 : void 0) ?? n} type=text .value=${w(this.valueForEditing ?? "")} ${h(this.childRef)}>`;
    return this.interactiveContainer({ disabled: this.disabled, children: c`${this.labelText && D({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${l({
      [e.inputWrapper]: !0,
      [x.rtl]: i === "rtl",
      [e.clearable]: this.isClearable,
      [e.hasSuffix]: this.suffixText,
      [e.hasPrefix]: this.prefixText
    })} ${h(this.inputWrapperRef)}><div class=${l(e.wrapper)}>${this.loading ? t : null}${this.prefixText ? s : null}${this.requestedIcon ? o : null}${u}${this.isClearable ? a : null}${this.suffixText ? p : null}</div>${this.selfManagedInlineEdit && c`<div class=${l(e.inlineEdit)}>${z({ cancelEditingLabel: this.messages.cancelInlineEditing, confirmChangesLabel: this.messages.confirmInlineEditingChanges, enableEditingButtonRef: this.enableInlineEditingButtonRef, enableEditingLabel: this.messages.enableInlineEditing, inlineEditing: this.inlineEditing, loading: this.inlineEditingLoading, onCancelEditing: this.inlineEditCancelEditingHandler, onConfirmChanges: this.inlineEditConfirmChangesHandler, onEnableEditing: () => this.inlineEditManager.enable(M.editButton), scale: this.scale, showControls: this.inlineEditing && !this.inlineEditControlsDisabled })}</div>` || ""}<div class=${l(e.actionWrapper)} ${h(this.actionWrapperRef)}><slot name=${O.action}></slot></div></div>${this.validationMessage && this.status === "invalid" ? F({ icon: this.validationIcon, id: f.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
E("calcite-input-text", A);
export {
  A as InputText
};
