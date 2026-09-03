/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as D, L as H, c as b, T as E, l as O, s as l, b as o, A as i, F as R, d as L } from "./index.js";
import { l as I } from "./live.js";
import { i as M } from "./keyed.js";
import { e as f, n as y } from "./ref.js";
import { b as P, u as F } from "./index2.js";
import { z as $, e as U } from "./dom.js";
import { n as A } from "./key.js";
import { g as z } from "./label.js";
import { i as m, B as j, n as u, p as q, s as K, b as W } from "./locale.js";
import { u as _ } from "./useLabel.js";
import { g as G } from "./component.js";
import { I as Y } from "./InternalLabel.js";
import { U as Z, C as J, I as Q } from "./useInlineEditable.js";
import { V as X } from "./Validation.js";
import { u as ee } from "./useT9n.js";
import { u as te } from "./useSetFocus.js";
import { u as ie } from "./useInteractive.js";
import { C as ne } from "./ClearButton.js";
import { u as ae } from "./useForm.js";
const r = {
  loader: "loader",
  clearButton: "clear-button",
  editingEnabled: "editing-enabled",
  inlineChild: "inline-child",
  inlineEditableChild: "inline-editable-child",
  // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
  inlineEditable: "inline-editable",
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
}, V = {
  tel: "phone",
  password: "lock",
  email: "email-address",
  date: "calendar",
  time: "clock",
  search: "search"
}, re = {
  action: "action"
}, C = {
  up: "up",
  down: "down"
}, N = {
  chevronUp: "chevron-up",
  chevronDown: "chevron-down"
}, le = 150, oe = D`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;--calcite-internal-input-focus-outline-color: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) );--calcite-internal-input-number-button-item-height: auto}:host([scale=s]){--calcite-internal-input-icon-padding-inline: var(--calcite-spacing-fixed-sm)}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=s]) input{padding-inline:var(--calcite-spacing-sm)}:host([scale=s]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=s]) .prefix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-xxs)}:host([scale=s]) .has-suffix input{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s]) .suffix{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=s]) input[type=file]{min-block-size:1.5rem}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper{block-size:1.5rem}:host([scale=s]) .clear-button{block-size:var(--calcite-spacing-xxl)}:host([scale=s]):host([number-button-type=horizontal]){--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-spacing-xxs)}:host([scale=s]):host([number-button-type=vertical]){--calcite-internal-input-number-button-item-height: 8px;--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-spacing-xxs);--calcite-internal-input-number-button-item-vertical-padding: 3px}:host([scale=m]){--calcite-internal-input-icon-padding-inline: var(--calcite-spacing-fixed-md)}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=m]) input{padding-inline:var(--calcite-spacing-md)}:host([scale=m]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xs)}:host([scale=m]) .prefix{padding-inline:var(--calcite-spacing-md) var(--calcite-spacing-xs)}:host([scale=m]) .has-suffix input{padding-inline-end:var(--calcite-spacing-xs)}:host([scale=m]) .suffix{padding-inline:var(--calcite-spacing-xs) var(--calcite-spacing-md)}:host([scale=m]) input[type=file]{min-block-size:2rem}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper{block-size:2rem}:host([scale=m]):host([number-button-type=horizontal]){--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-space-sm)}:host([scale=m]):host([number-button-type=vertical]){--calcite-internal-input-number-button-item-height: 11px;--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-space-sm);--calcite-internal-input-number-button-item-vertical-padding: var(--calcite-space-2xs)}:host([scale=l]){--calcite-internal-input-icon-padding-inline: var(--calcite-spacing-fixed-lg)}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l]) input{padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .has-prefix input{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=l]) .prefix{padding-inline:var(--calcite-spacing-lg) var(--calcite-spacing-sm)}:host([scale=l]) .has-suffix input{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=l]) .suffix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-lg)}:host([scale=l]) input[type=file]{min-block-size:2.75rem}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper{block-size:2.75rem}:host([scale=l]):host([number-button-type=horizontal]){--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-spacing-sm-plus)}:host([scale=l]):host([number-button-type=vertical]){--calcite-internal-input-number-button-item-height: 16px;--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-spacing-sm-plus);--calcite-internal-input-number-button-item-vertical-padding: 5px}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-width:1px;border-style:solid;font-family:inherit;font-weight:var(--calcite-font-weight-normal);outline:none;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-text-color, var(--calcite-color-text-1));transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none}input:placeholder-shown{text-overflow:ellipsis}.element-wrapper,input{border-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-prefix input,.element-wrapper:has(.icon) input{border-start-start-radius:0;border-end-start-radius:0}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=down]) input,.has-prefix input,.element-wrapper:has(.icon) input{border-inline-start-width:0}.element-wrapper:has(.clear-button) input,.has-suffix input,.element-wrapper:has(.number-button-item--horizontal[data-adjustment=up]) input,.element-wrapper:has(.number-button-item) input{border-inline-end-width:0}.has-suffix input,.element-wrapper:has(.clear-button) input,:host([number-button-type=vertical][type=number]) input,:host([number-button-type=horizontal]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .clear-button,:host([number-button-type=horizontal][type=number]) .clear-button{border-start-end-radius:0;border-end-end-radius:0}:host([number-button-type=horizontal]) input{border-start-start-radius:0;border-start-end-radius:0;border-end-start-radius:0;border-end-end-radius:0}.has-prefix :is(.prefix:first-child,.loader+.prefix),:host([number-button-type=horizontal]) .number-button-item[data-adjustment=down],.element-wrapper:has(.icon) :is(.icon:first-child,.loader+.icon){border-start-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-suffix .suffix,:host([number-button-type=vertical][type=number][read-only]) .has-suffix .suffix,:host([clearable]) .clear-button,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=up]{border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}:host([clearable]) .has-suffix .clear-button{border-end-end-radius:0;border-start-end-radius:0}input[type=search]::-webkit-search-decoration{-webkit-appearance:none}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-text-color, var(--calcite-color-text-1))}input[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-background-color, var(--calcite-color-background))}input[readonly]:focus{color:var(--calcite-input-text-color, var(--calcite-color-text-1))}:host([read-only]) .prefix,:host([read-only]) .icon,:host([read-only]) .clear-button,:host([read-only]) .suffix{background-color:var(--calcite-input-background-color, var(--calcite-color-background))}.element-wrapper{position:relative;display:inline-flex;flex:1 1 0%;align-items:center;order:3;isolation:isolate}.element-wrapper:has(input:focus){outline:var(--calcite-border-width-md) solid var(--calcite-internal-input-focus-outline-color);outline-offset:calc(var(--calcite-border-width-sm) * -2)}.element-wrapper:has(input:focus) input{z-index:calc(var(--calcite-z-index) * -1)}:host([status=invalid]) .prefix,:host([status=invalid]) .icon,:host([status=invalid]) input,:host([status=invalid]) .clear-button,:host([status=invalid]) .suffix,:host([status=invalid]) .number-button-item{border-color:var(--calcite-color-status-danger)}:host([status=invalid]){--calcite-internal-input-focus-outline-color: var(--calcite-color-status-danger)}.icon{box-sizing:border-box;display:flex;align-self:stretch;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));border-inline-end-width:var(--calcite-border-width-none);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-icon-color, var(--calcite-color-text-3));align-items:center;padding-inline-start:var(--calcite-internal-input-icon-padding-inline)}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=down]) .icon,.has-prefix .icon{border-inline-start-width:0}input:is([type=text],[type=password])::-ms-clear,input:is([type=text],[type=password])::-ms-reveal{display:none;inline-size:0;block-size:0}input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration,input[type=date]::-webkit-clear-button,input[type=time]::-webkit-clear-button{display:none}.clear-button{box-sizing:border-box;display:flex;align-self:stretch;order:4;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));border-inline-start-width:var(--calcite-border-width-none);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1))}.has-suffix .clear-button,.element-wrapper:has(.number-button-item.number-button-item--horizontal[data-adjustment=up]) .clear-button,.element-wrapper:has(.number-button-item) .clear-button{border-inline-end-width:0}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block;--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.inline-editable{order:7}.action-wrapper{order:8;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;line-height:1;font-weight:var(--calcite-font-weight-regular);border-color:var(--calcite-input-border-color, var(--calcite-color-border-input))}.prefix{order:0;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=down]) .prefix{border-inline-start-width:var(--calcite-border-width-none)}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=up]) .suffix,.element-wrapper:has(.number-button-item) .suffix{border-inline-end-width:var(--calcite-border-width-none)}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}input[type=number]{-moz-appearance:textfield}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.number-button-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;pointer-events:none;box-sizing:border-box;display:flex;flex-direction:column;order:6}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-action{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-action{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal{border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));max-block-size:100%;min-block-size:100%;align-self:stretch;border-width:1px;border-style:solid}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-action,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-action{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-inline-end-width:0px;order:0;padding-inline-start:var(--calcite-internal-input-number-button-item-horizontal-padding)}.number-button-item.number-button-item--horizontal[data-adjustment=up]{border-inline-start-width:0px;order:5;padding-inline-end:var(--calcite-internal-input-number-button-item-horizontal-padding)}:host([number-button-type=vertical]) .number-button-item{padding-inline-end:var(--calcite-internal-input-number-button-item-horizontal-padding)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]{border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-block-end-width:var(--calcite-border-width-none);padding-block-start:var(--calcite-internal-input-number-button-item-vertical-padding)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px;border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));padding-block-end:var(--calcite-internal-input-number-button-item-vertical-padding)}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));border-inline-start-width:var(--calcite-border-width-none)}.number-button-item:hover calcite-action{--calcite-action-background-color: var( --calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2) );--calcite-action-text-color: var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.number-button-item:active calcite-action{--calcite-action-background-color: var( --calcite-input-actions-background-color-press, var(--calcite-color-foreground-3) );--calcite-action-text-color: var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.number-button-item calcite-action{--calcite-internal-action-height: var(--calcite-internal-input-number-button-item-height);--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-input-actions-background-color);--calcite-action-text-color: var(--calcite-input-actions-icon-color)}.number-button-item calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-actions-background-color-hover);--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-hover)}.number-button-item calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-actions-background-color-press);--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-press)}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center;border-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));box-shadow:var(--calcite-input-shadow, var(--calcite-shadow-none))}input[type=date]::-webkit-input-placeholder{visibility:hidden!important}:host([type=color]) input{padding:.25rem}:host([type=file]) input{cursor:pointer;border-width:1px;border-style:dashed;background-color:var(--calcite-color-foreground-1);text-align:center;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));block-size:initial}:host([type=file][scale=s]) input{padding-block:1px;padding-inline:.5rem}:host([type=file][scale=m]) input{padding-block:.25rem;padding-inline:.75rem}:host([type=file][scale=l]) input{padding-block:.5rem;padding-inline:1rem}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child.inline-editable-child{background-color:transparent}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.element-wrapper:has(input.inline-child:not(.editing-enabled)) .loader,.element-wrapper:has(input.inline-child:not(.editing-enabled)) .number-button-item,.element-wrapper:has(input.inline-child:not(.editing-enabled)) .prefix,.element-wrapper:has(input.inline-child:not(.editing-enabled)) .icon,.element-wrapper:has(input.inline-child:not(.editing-enabled)) .clear-button,.element-wrapper:has(input.inline-child:not(.editing-enabled)) .suffix{display:none}:host([inline-editable]:not([editing-enabled])) .wrapper:hover input,:host([inline-editable]:not([editing-enabled])) .wrapper:hover .inline-editable,:host([inline-editable]:not([editing-enabled])) .wrapper:hover .action-wrapper,:host:has(input.inline-child:not(.inline-editable-child):not(.editing-enabled)) .wrapper:hover input,:host:has(input.inline-child:not(.inline-editable-child):not(.editing-enabled)) .wrapper:hover .inline-editable,:host:has(input.inline-child:not(.inline-editable-child):not(.editing-enabled)) .wrapper:hover .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-inline-editable-background-color-hover, var(--calcite-color-foreground-2))}:host([inline-editable]) .inline-editable,:host([inline-editable]) .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1))}:host([type=datetime-local]) .element-wrapper{inline-size:100%}:host([type=datetime-local]) .element-wrapper input{display:inline-block;min-inline-size:0}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}.clear-button--container{display:flex;cursor:pointer;align-items:center}.clear-button--container:hover calcite-action{--calcite-action-background-color: var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color: var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.clear-button--container:active calcite-action{--calcite-action-background-color: var(--calcite-input-actions-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color: var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.clear-button--container calcite-action{--calcite-internal-action-height: 100%;--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-input-actions-background-color, var(--calcite-color-foreground-2));--calcite-action-text-color: var(--calcite-input-actions-icon-color)}.clear-button--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-hover)}.clear-button--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-actions-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-press)}:host([scale=s]) .clear-button--container{padding:var(--calcite-space-2xs)}:host([scale=m]) .clear-button--container{padding:var(--calcite-space-2xs);padding-inline-end:var(--calcite-space-sm)}:host([scale=l]) .clear-button--container{padding-inline-end:var(--calcite-space-sm-plus)}.inline-editable--container{display:flex;cursor:pointer;align-items:center}.inline-editable--container .enable-editing,.inline-editable--container .confirm-changes,.inline-editable--container .cancel-editing{margin-inline-start:var(--calcite-space-2xs)}.inline-editable--container .enable-editing{--calcite-action-text-color: var(--calcite-input-inline-editable-control-text-color, var(--calcite-color-text-1))}.inline-editable--container calcite-action{--calcite-action-background-color: var(--calcite-input-inline-editable-control-background-color);--calcite-action-corner-radius: var(--calcite-input-inline-editable-control-corner-radius);--calcite-action-loader-color: var(--calcite-input-inline-editable-control-loader-color);--calcite-action-text-color: var(--calcite-input-inline-editable-control-text-color)}.inline-editable--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-inline-editable-control-background-color-hover, var(--calcite-input-inline-editable-control-background-color));--calcite-action-text-color-press: var(--calcite-input-inline-editable-control-text-color-press, var(--calcite-input-inline-editable-control-text-color))}.inline-editable--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-inline-editable-control-background-color-press, var(--calcite-input-inline-editable-control-background-color));--calcite-action-text-color-press: var(--calcite-input-inline-editable-control-text-color-press, var(--calcite-input-inline-editable-control-text-color))}`;
class se extends H {
  constructor() {
    super(), this.actionWrapperRef = f(), this.attributeWatch = P(["autofocus", "enterkeyhint", "inputmode", "spellcheck"], this.handleGlobalAttributesChanged), this.childRef = f(), this.childNumberRef = f(), this.enableInlineEditingButtonRef = f(), this.direction = F(), this.formSupport = ae({
      inputType: "text",
      getValue: () => this.type === "file" ? this.childRef.value?.files ?? null : this.value
    })(this), this.inputWrapperRef = f(), this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.messages = ee({ blocking: !0 }), this.focusSetter = te()(this), this.interactiveContainer = ie(this), this.inlineEditableManager = new Z({
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
        this.calciteInputInlineEditableCancel.emit();
      },
      emitConfirm: () => {
        this.calciteInputInlineEditableConfirm.emit();
      },
      emitEnableEditingChange: () => {
        this.calciteInputInlineEditableChange.emit();
      }
    }), this.inlineEditableLoading = !1, this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.editingEnabled = !1, this.inlineEditable = !1, this.inlineEditableControls = !1, this.groupSeparator = !1, this.iconFlipRtl = !1, this.loading = !1, this.localeFormat = !1, this.multiple = !1, this.numberButtonType = "vertical", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.type = "text", this.calciteInputChange = b({ cancelable: !1 }), this.calciteInputInput = b(), this.calciteInternalInputBlur = b({ cancelable: !1 }), this.calciteInternalInputFocus = b({ cancelable: !1 }), this.calciteInputInlineEditableCancel = b({ cancelable: !1 }), this.calciteInputInlineEditableConfirm = b({ cancelable: !1 }), this.calciteInputInlineEditableChange = b({ cancelable: !1 }), _(this), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { displayedValue: 16, inlineEditableLoading: 16, slottedActionElDisabledInternally: 16, accept: 1, alignment: 3, autocomplete: 1, clearable: 7, disabled: 7, editingEnabled: 7, inlineEditable: 7, inlineEditableControls: 7, inlineEditableAfterConfirm: 0, files: 0, form: 3, groupSeparator: 7, icon: [3, { converter: E }], iconFlipRtl: 7, label: 1, labelText: 1, loading: 7, localeFormat: 5, max: 11, maxLength: 11, messageOverrides: 0, min: 11, minLength: 11, multiple: 5, name: 3, numberButtonType: 3, numberingSystem: 3, pattern: 1, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, step: 3, suffixText: 1, type: 3, validationIcon: [3, { converter: E }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = oe;
  }
  get selfManagedInlineEditable() {
    return this.inlineEditable && !this.inlineEditableEl;
  }
  get hasInlineEditableContext() {
    return this.inlineEditable || !!this.inlineEditableEl;
  }
  get isClearable() {
    return (this.clearable || this.type === "search") && this.value?.length > 0;
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
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable") ?? void 0, this.inlineEditableEl && (this.editingEnabled = this.inlineEditableEl.editingEnabled || !1);
  }
  async load() {
    this.maxString = this.max?.toString(), this.minString = this.min?.toString(), this.requestedIcon = $(V, this.icon, this.type), this.setPreviousEmittedValue(this.value), this.setPreviousValue(this.value), this.type === "number" && (this.value === "Infinity" || this.value === "-Infinity" ? (this.displayedValue = this.value, this.previousEmittedValue = this.value) : (this.warnAboutInvalidNumberValue(this.value), this.setValue({
      origin: "connected",
      value: m(this.value) ? this.value : ""
    })));
  }
  willUpdate(e) {
    e.has("max") && (this.maxString = this.max?.toString() ?? void 0), e.has("min") && (this.minString = this.min?.toString() ?? void 0), (e.has("icon") || e.has("type") && (this.hasUpdated || this.type !== "text")) && (this.requestedIcon = $(V, this.icon, this.type)), e.has("readOnly") && this.stopNudging(), e.has("type") && (this.hasUpdated || this.type !== "text") && this.formSupport.overrideInputType(this.type);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopNudging();
  }
  stopNudging() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
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
        value: e == null || e == "" ? "" : this.type === "number" ? m(e) ? e : this.previousValue || "" : e
      }), this.warnAboutInvalidNumberValue(e);
    }
    this.userChangedValue = !1;
  }
  keyDownHandler(e) {
    if (!(this.readOnly || this.disabled || e.defaultPrevented)) {
      if (this.selfManagedInlineEditable && this.editingEnabled && e.key === "Escape") {
        if (e.preventDefault(), this.clearable && this.value?.length > 0) {
          this.clearInputValue(e);
          return;
        }
        this.inlineEditableManager.cancelEditing(), requestAnimationFrame(() => {
          this.enableInlineEditingButtonRef.value?.setFocus();
        });
        return;
      }
      this.isClearable && e.key === "Escape" && (!this.hasInlineEditableContext || this.editingEnabled) && (this.clearInputValue(e), e.preventDefault()), e.key === "Enter" && this.formSupport.active && (e.preventDefault(), this.formSupport.requestSubmit());
    }
  }
  onLabelClick() {
    if (this.selfManagedInlineEditable && !this.editingEnabled) {
      this.inlineEditableManager.enable();
      return;
    }
    this.setFocus();
  }
  incrementOrDecrementNumberValue(e, t, n, s) {
    const { value: a } = this;
    if (a === "Infinity" || a === "-Infinity")
      return;
    const d = e === "up" ? 1 : -1, p = this.step === "any" ? 1 : Math.abs(this.step || 1), c = new j(a !== "" ? a : "0").add(`${p * d}`), h = () => typeof n == "number" && !isNaN(n) && c.subtract(`${n}`).isNegative, v = () => typeof t == "number" && !isNaN(t) && !c.subtract(`${t}`).isNegative, x = h() ? `${n}` : v() ? `${t}` : c.toString();
    this.setValue({
      committing: !0,
      nativeEvent: s,
      origin: "user",
      value: x
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
  clearButtonPointerDownHandler(e) {
    e.preventDefault();
  }
  clearButtonClickHandler(e) {
    e.preventDefault(), e.stopPropagation(), this.clearInputValue(e), (this.type === "number" ? this.childNumberRef.value : this.childRef.value)?.focus();
  }
  emitChangeIfUserModified() {
    this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue && (this.calciteInputChange.emit(), this.setPreviousEmittedValue(this.value));
  }
  inputBlurHandler() {
    this.stopNudging(), this.calciteInternalInputBlur.emit(), this.selfManagedInlineEditable && this.editingEnabled && !this.inlineEditableControls && this.inlineEditableManager.disable(), this.emitChangeIfUserModified();
  }
  clickHandler(e) {
    if (this.disabled)
      return;
    const t = e.composedPath(), n = t.some((s) => s instanceof HTMLElement && s.classList.contains(J.container));
    if (!(!t.includes(this.inputWrapperRef.value) || t.includes(this.actionWrapperRef.value) || n)) {
      if (this.selfManagedInlineEditable && !this.editingEnabled) {
        e.preventDefault(), this.inlineEditableManager.enable();
        return;
      }
      this.setFocus();
    }
  }
  inputFocusHandler() {
    this.calciteInternalInputFocus.emit();
  }
  inputInputHandler(e) {
    this.disabled || this.readOnly || (this.type === "file" && (this.files = this.childRef.value.files ?? void 0), this.setValue({
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
    const n = u.delocalize(t);
    e.inputType === "insertFromPaste" ? (m(n) || e.preventDefault(), this.setValue({
      nativeEvent: e,
      origin: "user",
      value: q(n)
    }), this.childNumberRef.value && (this.childNumberRef.value.value = this.displayedValue)) : this.setValue({
      nativeEvent: e,
      origin: "user",
      value: n
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
      ...A,
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
    const n = e.shiftKey && e.key === "Tab";
    if (t.includes(e.key) || n) {
      e.key === "Enter" && this.emitChangeIfUserModified();
      return;
    }
    u.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, !(e.key === u.decimal && (!this.value && !this.childNumberRef.value?.value || this.value && this.childNumberRef.value?.value.indexOf(u.decimal) === -1)) && (/[eE]/.test(e.key) && (!this.value && !this.childNumberRef.value?.value || this.value && this.childNumberRef.value && !/[eE]/.test(this.childNumberRef.value.value)) || e.key === "-" && (!this.value && !this.childNumberRef.value?.value || this.value && this.childNumberRef.value && this.childNumberRef.value.value.split("-").length <= 2) || e.preventDefault());
  }
  nudgeNumberValue(e, t) {
    if (t instanceof KeyboardEvent && t.repeat || this.type !== "number")
      return;
    const n = this.maxString ? parseFloat(this.maxString) : null, s = this.minString ? parseFloat(this.minString) : null;
    this.incrementOrDecrementNumberValue(e, n, s, t), this.nudgeNumberValueIntervalId && this.stopNudging();
    let a = !0;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (a) {
        a = !1;
        return;
      }
      this.incrementOrDecrementNumberValue(e, n, s, t);
    }, le);
  }
  numberButtonPointerUpAndOutHandler() {
    this.stopNudging();
  }
  numberButtonPointerDownHandler(e) {
    if (!U(e))
      return;
    e.preventDefault();
    const t = e.currentTarget.dataset.adjustment;
    this.disabled || this.nudgeNumberValue(t, e);
  }
  setInputValue(e) {
    const t = this.type === "number" ? this.childNumberRef : this.childRef;
    t.value && (t.value.value = e);
  }
  setPreviousEmittedValue(e) {
    this.previousEmittedValue = this.normalizeValue(e);
  }
  normalizeValue(e) {
    return this.type === "number" ? m(e) ? e : "" : e;
  }
  setPreviousValue(e) {
    this.previousValue = this.normalizeValue(e);
  }
  setValue({ committing: e = !1, nativeEvent: t, origin: n, previousValue: s, value: a }) {
    if (this.setPreviousValue(s ?? this.value), this.previousValueOrigin = n, this.type === "number") {
      u.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
        signDisplay: "never"
      };
      const d = this.previousValue?.length > a.length || this.value?.length > a.length, p = a.charAt(a.length - 1) === ".", g = p && d ? a : K(a), c = a && !g ? m(this.previousValue) ? this.previousValue : "" : g;
      let h = u.localize(c);
      n !== "connected" && !p && (h = W(h, c, u)), this.displayedValue = p && d ? `${h}${u.decimal}` : h, this.userChangedValue = n === "user" && this.value !== c, this.value = ["-", "."].includes(c) ? "" : c;
    } else
      this.userChangedValue = n === "user" && this.value !== a, this.value = a;
    n === "direct" && (this.setInputValue(a), this.previousEmittedValue = a), t && (this.calciteInputInput.emit().defaultPrevented ? (this.value = this.previousValue, this.displayedValue = this.type === "number" ? u.localize(this.previousValue) : this.previousValue) : e && this.emitChangeIfUserModified());
  }
  inputKeyUpHandler() {
    this.stopNudging();
  }
  warnAboutInvalidNumberValue(e) {
    this.type === "number" && e && !m(e) && O.warn(`The specified value "${e}" cannot be parsed, or is out of range.`);
  }
  render() {
    const e = this.direction, t = o`<div class=${l(r.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, n = o`<div class=${l(r.clearButton)} @click=${this.disabled || this.readOnly ? void 0 : this.clearButtonClickHandler} @pointerdown=${this.disabled || this.readOnly ? void 0 : this.clearButtonPointerDownHandler}>${ne({ ariaLabel: this.messages.clear, disabled: this.disabled || this.readOnly, scale: this.scale, title: this.messages.clear })}</div>`, s = o`<div class=${l(r.inputIcon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${G(this.scale)}></calcite-icon></div>`, a = this.numberButtonType === "horizontal", d = o`<div aria-hidden=true class=${l({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: a
    })} data-adjustment=${C.up} data-testid=number-button-up @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler}><calcite-action .disabled=${this.disabled || this.readOnly} .icon=${N.chevronUp} .scale=${this.scale} tabindex=-1 text></calcite-action></div>`, p = o`<div aria-hidden=true class=${l({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: a
    })} data-adjustment=${C.down} data-testid=number-button-down @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler}><calcite-action .disabled=${this.disabled || this.readOnly} .icon=${N.chevronDown} .scale=${this.scale} tabindex=-1 text></calcite-action></div>`, g = o`<div class=${l(r.numberButtonWrapper)}>${d}${p}</div>`, c = o`<div class=${l(r.prefix)}>${this.prefixText}</div>`, h = o`<div class=${l(r.suffix)}>${this.suffixText}</div>`, v = this.el.autofocus, x = this.el.enterKeyHint, k = this.el.inputMode, S = this.type === "number" ? M("localized-input", o`<input accept=${this.accept ?? i} aria-errormessage=${w.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${z(this)} autocomplete=${this.autocomplete ?? i} .autofocus=${v} class=${l({
      [r.editingEnabled]: this.editingEnabled,
      [r.inlineChild]: this.hasInlineEditableContext,
      [r.inlineEditableChild]: !!this.inlineEditableEl
      // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
    })} value=${this.defaultValue ?? i} .disabled=${this.disabled} enterkeyhint=${x ?? i} inputmode=${k ?? i} maxlength=${this.maxLength ?? i} minlength=${this.minLength ?? i} .multiple=${this.multiple} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputNumberInputHandler} @keydown=${this.inputNumberKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? i} placeholder=${(this.placeholder || "") ?? i} .readOnly=${this.readOnly} .required=${this.required} tabindex=${(this.disabled || this.hasInlineEditableContext && !this.editingEnabled ? -1 : void 0) ?? i} type=text .value=${I(this.displayedValue ?? "")} ${y(this.childNumberRef)}>`) : null, B = this.type !== "number" ? o`<input accept=${this.accept ?? i} aria-errormessage=${w.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${z(this)} autocomplete=${this.autocomplete ?? i} .autofocus=${v} class=${l({
      [r.editingEnabled]: this.editingEnabled,
      [r.inlineChild]: this.hasInlineEditableContext,
      [r.inlineEditableChild]: !!this.inlineEditableEl
      // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
    })} value=${this.defaultValue ?? i} .disabled=${this.disabled} enterkeyhint=${x ?? i} inputmode=${k ?? i} max=${this.maxString ?? i} maxlength=${this.maxLength ?? i} min=${this.minString ?? i} minlength=${this.minLength ?? i} .multiple=${this.multiple} name=${this.name ?? i} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputInputHandler} @keydown=${this.inputKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? i} placeholder=${(this.placeholder || "") ?? i} .readOnly=${this.readOnly} .required=${this.required} spellcheck=${this.el.spellcheck ?? i} step=${this.step ?? i} tabindex=${(this.disabled || this.hasInlineEditableContext && !this.editingEnabled ? -1 : void 0) ?? i} type=${this.type ?? i} .value=${I(this.value ?? "")} ${y(this.childRef)}>` : null;
    return this.interactiveContainer({ disabled: this.disabled, children: o`${this.labelText && Y({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${l({
      [r.inputWrapper]: !0,
      [R.rtl]: e === "rtl",
      [r.hasSuffix]: this.suffixText,
      [r.hasPrefix]: this.prefixText
    })} ${y(this.inputWrapperRef)}><div class=${l(r.wrapper)}>${this.loading ? t : null}${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? p : null}${this.prefixText ? c : null}${this.requestedIcon ? s : null}${S}${B}${this.isClearable ? n : null}${this.suffixText ? h : null}${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? d : null}${this.type === "number" && this.numberButtonType === "vertical" && !this.readOnly ? g : null}</div>${this.selfManagedInlineEditable && o`<div class=${l(r.inlineEditable)}>${Q({ cancelEditingLabel: this.messages.cancelInlineEditing, confirmChangesLabel: this.messages.confirmInlineEditingChanges, editingEnabled: this.editingEnabled, enableEditingButtonRef: this.enableInlineEditingButtonRef, enableEditingLabel: this.messages.enableInlineEditing, loading: this.inlineEditableLoading, onCancelEditing: () => this.inlineEditableManager.cancelEditing(), onConfirmChanges: () => this.inlineEditableManager.confirm(this.inlineEditableAfterConfirm, (T) => {
      this.inlineEditableLoading = T;
    }), onEnableEditing: () => this.inlineEditableManager.enable(), scale: this.scale, showControls: this.editingEnabled && this.inlineEditableControls })}</div>` || ""}<div class=${l(r.actionWrapper)} ${y(this.actionWrapperRef)}><slot name=${re.action}></slot></div></div>${this.validationMessage && this.status === "invalid" ? X({ icon: this.validationIcon, id: w.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
L("calcite-input", se);
export {
  se as Input
};
