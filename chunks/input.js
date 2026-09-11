/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as D, L as H, c as m, F as k, l as T, s as l, b as s, A as n, C as O, d as R } from "./index.js";
import { l as I } from "./live.js";
import { i as F } from "./keyed.js";
import { e as y, n as E } from "./ref.js";
import { b as M, u as L } from "./index2.js";
import { z as $, h as P } from "./dom.js";
import { n as U } from "./key.js";
import { g as z } from "./label.js";
import { i as x, B as A, n as c, p as j, e as q, f as K } from "./locale.js";
import { u as W } from "./useLabel.js";
import { g as _ } from "./component.js";
import { I as G } from "./InternalLabel.js";
import { U as Y, i as Z, C as J, I as Q } from "./useInlineEdit.js";
import { V as X } from "./Validation.js";
import { u as ii } from "./useT9n.js";
import { u as ti } from "./useSetFocus.js";
import { u as ei } from "./useInteractive.js";
import { C as ni } from "./ClearButton.js";
import { u as ai } from "./useForm.js";
const r = {
  loader: "loader",
  clearButton: "clear-button",
  inlineEditing: "inline-editing",
  inlineChild: "inline-child",
  inlineEditableChild: "inline-editable-child",
  // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
  inlineEdit: "inline-edit",
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
}, ri = {
  action: "action"
}, C = {
  up: "up",
  down: "down"
}, S = {
  chevronUp: "chevron-up",
  chevronDown: "chevron-down"
}, li = 150, oi = D`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;--calcite-internal-input-focus-outline-color: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) );--calcite-internal-input-number-button-item-height: auto}:host([scale=s]){--calcite-internal-input-icon-padding-inline: var(--calcite-spacing-fixed-sm)}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=s]) input{padding-inline:var(--calcite-spacing-sm)}:host([scale=s]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=s]) .prefix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-xxs)}:host([scale=s]) .has-suffix input{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s]) .suffix{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=s]) input[type=file]{min-block-size:1.5rem}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper{block-size:1.5rem}:host([scale=s]) .clear-button{block-size:var(--calcite-spacing-xxl)}:host([scale=s]):host([number-button-type=horizontal]){--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-spacing-xxs)}:host([scale=s]):host([number-button-type=vertical]){--calcite-internal-input-number-button-item-height: 8px;--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-spacing-xxs);--calcite-internal-input-number-button-item-vertical-padding: 3px}:host([scale=m]){--calcite-internal-input-icon-padding-inline: var(--calcite-spacing-fixed-md)}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=m]) input{padding-inline:var(--calcite-spacing-md)}:host([scale=m]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xs)}:host([scale=m]) .prefix{padding-inline:var(--calcite-spacing-md) var(--calcite-spacing-xs)}:host([scale=m]) .has-suffix input{padding-inline-end:var(--calcite-spacing-xs)}:host([scale=m]) .suffix{padding-inline:var(--calcite-spacing-xs) var(--calcite-spacing-md)}:host([scale=m]) input[type=file]{min-block-size:2rem}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper{block-size:2rem}:host([scale=m]):host([number-button-type=horizontal]){--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-space-sm)}:host([scale=m]):host([number-button-type=vertical]){--calcite-internal-input-number-button-item-height: 11px;--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-space-sm);--calcite-internal-input-number-button-item-vertical-padding: var(--calcite-space-2xs)}:host([scale=l]){--calcite-internal-input-icon-padding-inline: var(--calcite-spacing-fixed-lg)}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l]) input{padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .has-prefix input{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=l]) .prefix{padding-inline:var(--calcite-spacing-lg) var(--calcite-spacing-sm)}:host([scale=l]) .has-suffix input{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=l]) .suffix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-lg)}:host([scale=l]) input[type=file]{min-block-size:2.75rem}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper{block-size:2.75rem}:host([scale=l]):host([number-button-type=horizontal]){--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-spacing-sm-plus)}:host([scale=l]):host([number-button-type=vertical]){--calcite-internal-input-number-button-item-height: 16px;--calcite-internal-input-number-button-item-horizontal-padding: var(--calcite-spacing-sm-plus);--calcite-internal-input-number-button-item-vertical-padding: 5px}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-width:1px;border-style:solid;font-family:inherit;font-weight:var(--calcite-font-weight-normal);outline:none;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-text-color, var(--calcite-color-text-1));transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none}input:placeholder-shown{text-overflow:ellipsis}.element-wrapper,input{border-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-prefix input,.element-wrapper:has(.icon) input{border-start-start-radius:0;border-end-start-radius:0}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=down]) input,.has-prefix input,.element-wrapper:has(.icon) input{border-inline-start-width:0}.element-wrapper:has(.clear-button) input,.has-suffix input,.element-wrapper:has(.number-button-item--horizontal[data-adjustment=up]) input,.element-wrapper:has(.number-button-item) input{border-inline-end-width:0}.has-suffix input,.element-wrapper:has(.clear-button) input,:host([number-button-type=vertical][type=number]) input,:host([number-button-type=horizontal]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .clear-button,:host([number-button-type=horizontal][type=number]) .clear-button{border-start-end-radius:0;border-end-end-radius:0}:host([number-button-type=horizontal]) input{border-start-start-radius:0;border-start-end-radius:0;border-end-start-radius:0;border-end-end-radius:0}.has-prefix :is(.prefix:first-child,.loader+.prefix),:host([number-button-type=horizontal]) .number-button-item[data-adjustment=down],.element-wrapper:has(.icon) :is(.icon:first-child,.loader+.icon){border-start-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-suffix .suffix,:host([number-button-type=vertical][type=number][read-only]) .has-suffix .suffix,:host([clearable]) .clear-button,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=up]{border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}:host([clearable]) .has-suffix .clear-button{border-end-end-radius:0;border-start-end-radius:0}input[type=search]::-webkit-search-decoration{-webkit-appearance:none}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-text-color, var(--calcite-color-text-1))}input[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-background-color, var(--calcite-color-background))}input[readonly]:focus{color:var(--calcite-input-text-color, var(--calcite-color-text-1))}:host([read-only]) .prefix,:host([read-only]) .icon,:host([read-only]) .clear-button,:host([read-only]) .suffix{background-color:var(--calcite-input-background-color, var(--calcite-color-background))}.element-wrapper{position:relative;display:inline-flex;flex:1 1 0%;align-items:center;order:3;isolation:isolate}.element-wrapper:has(input:focus){outline:var(--calcite-border-width-md) solid var(--calcite-internal-input-focus-outline-color);outline-offset:calc(var(--calcite-border-width-sm) * -2)}.element-wrapper:has(input:focus) input{z-index:calc(var(--calcite-z-index) * -1)}:host([status=invalid]) .prefix,:host([status=invalid]) .icon,:host([status=invalid]) input,:host([status=invalid]) .clear-button,:host([status=invalid]) .suffix,:host([status=invalid]) .number-button-item{border-color:var(--calcite-color-status-danger)}:host([status=invalid]){--calcite-internal-input-focus-outline-color: var(--calcite-color-status-danger)}.icon{box-sizing:border-box;display:flex;align-self:stretch;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));border-inline-end-width:var(--calcite-border-width-none);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-icon-color, var(--calcite-color-text-3));align-items:center;padding-inline-start:var(--calcite-internal-input-icon-padding-inline)}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=down]) .icon,.has-prefix .icon{border-inline-start-width:0}input:is([type=text],[type=password])::-ms-clear,input:is([type=text],[type=password])::-ms-reveal{display:none;inline-size:0;block-size:0}input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration,input[type=date]::-webkit-clear-button,input[type=time]::-webkit-clear-button{display:none}.clear-button{box-sizing:border-box;display:flex;align-self:stretch;order:4;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));border-inline-start-width:var(--calcite-border-width-none);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1))}.has-suffix .clear-button,.element-wrapper:has(.number-button-item.number-button-item--horizontal[data-adjustment=up]) .clear-button,.element-wrapper:has(.number-button-item) .clear-button{border-inline-end-width:0}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block;--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.inline-edit{order:7}.action-wrapper{order:8;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;line-height:1;font-weight:var(--calcite-font-weight-regular);border-color:var(--calcite-input-border-color, var(--calcite-color-border-input))}.prefix{order:0;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=down]) .prefix{border-inline-start-width:var(--calcite-border-width-none)}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=up]) .suffix,.element-wrapper:has(.number-button-item) .suffix{border-inline-end-width:var(--calcite-border-width-none)}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}input[type=number]{-moz-appearance:textfield}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.number-button-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;pointer-events:none;box-sizing:border-box;display:flex;flex-direction:column;order:6}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-action{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-action{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal{border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));max-block-size:100%;min-block-size:100%;align-self:stretch;border-width:1px;border-style:solid}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-action,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-action{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-inline-end-width:0px;order:0;padding-inline-start:var(--calcite-internal-input-number-button-item-horizontal-padding)}.number-button-item.number-button-item--horizontal[data-adjustment=up]{border-inline-start-width:0px;order:5;padding-inline-end:var(--calcite-internal-input-number-button-item-horizontal-padding)}:host([number-button-type=vertical]) .number-button-item{padding-inline-end:var(--calcite-internal-input-number-button-item-horizontal-padding)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]{border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-block-end-width:var(--calcite-border-width-none);padding-block-start:var(--calcite-internal-input-number-button-item-vertical-padding)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px;border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));padding-block-end:var(--calcite-internal-input-number-button-item-vertical-padding)}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));border-inline-start-width:var(--calcite-border-width-none)}.number-button-item:hover calcite-action{--calcite-action-background-color: var( --calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2) );--calcite-action-text-color: var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.number-button-item:active calcite-action{--calcite-action-background-color: var( --calcite-input-actions-background-color-press, var(--calcite-color-foreground-3) );--calcite-action-text-color: var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.number-button-item calcite-action{--calcite-internal-action-height: var(--calcite-internal-input-number-button-item-height);--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-input-actions-background-color);--calcite-action-text-color: var(--calcite-input-actions-icon-color)}.number-button-item calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-actions-background-color-hover);--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-hover)}.number-button-item calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-actions-background-color-press);--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-press)}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center;border-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));box-shadow:var(--calcite-input-shadow, var(--calcite-shadow-none))}input[type=date]::-webkit-input-placeholder{visibility:hidden!important}:host([type=color]) input{padding:.25rem}:host([type=file]) input{cursor:pointer;border-width:1px;border-style:dashed;background-color:var(--calcite-color-foreground-1);text-align:center;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));block-size:initial}:host([type=file][scale=s]) input{padding-block:1px;padding-inline:.5rem}:host([type=file][scale=m]) input{padding-block:.25rem;padding-inline:.75rem}:host([type=file][scale=l]) input{padding-block:.5rem;padding-inline:1rem}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child.inline-editable-child{background-color:transparent}input.inline-child .inline-editing{background-color:inherit}input.inline-child:not(.inline-editing){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.element-wrapper:has(input.inline-child:not(.inline-editing)) .loader,.element-wrapper:has(input.inline-child:not(.inline-editing)) .number-button-item,.element-wrapper:has(input.inline-child:not(.inline-editing)) .prefix,.element-wrapper:has(input.inline-child:not(.inline-editing)) .icon,.element-wrapper:has(input.inline-child:not(.inline-editing)) .clear-button,.element-wrapper:has(input.inline-child:not(.inline-editing)) .suffix{display:none}:host([inline-edit]:not([inline-editing])) .wrapper:hover input,:host([inline-edit]:not([inline-editing])) .wrapper:hover .inline-edit,:host([inline-edit]:not([inline-editing])) .wrapper:hover .action-wrapper,:host:has(input.inline-child:not(.inline-editable-child):not(.inline-editing)) .wrapper:hover input,:host:has(input.inline-child:not(.inline-editable-child):not(.inline-editing)) .wrapper:hover .inline-edit,:host:has(input.inline-child:not(.inline-editable-child):not(.inline-editing)) .wrapper:hover .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-inline-edit-background-color-hover, var(--calcite-color-foreground-2))}:host([inline-edit]) .inline-edit,:host([inline-edit]) .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1))}:host([type=datetime-local]) .element-wrapper{inline-size:100%}:host([type=datetime-local]) .element-wrapper input{display:inline-block;min-inline-size:0}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}.clear-button--container{display:flex;cursor:pointer;align-items:center}.clear-button--container:hover calcite-action{--calcite-action-background-color: var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color: var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.clear-button--container:active calcite-action{--calcite-action-background-color: var(--calcite-input-actions-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color: var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.clear-button--container calcite-action{--calcite-internal-action-height: 100%;--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-input-actions-background-color, var(--calcite-color-foreground-2));--calcite-action-text-color: var(--calcite-input-actions-icon-color)}.clear-button--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-hover)}.clear-button--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-actions-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-press)}:host([scale=s]) .clear-button--container{padding:var(--calcite-space-2xs)}:host([scale=m]) .clear-button--container{padding:var(--calcite-space-2xs);padding-inline-end:var(--calcite-space-sm)}:host([scale=l]) .clear-button--container{padding-inline-end:var(--calcite-space-sm-plus)}.inline-edit--container{display:flex;cursor:pointer;align-items:center}.inline-edit--container .enable-editing,.inline-edit--container .confirm-changes,.inline-edit--container .cancel-editing{margin-inline-start:var(--calcite-space-2xs)}.inline-edit--container .enable-editing{--calcite-action-text-color: var(--calcite-input-inline-edit-control-text-color, var(--calcite-color-text-1))}.inline-edit--container calcite-action{--calcite-action-background-color: var(--calcite-input-inline-edit-control-background-color);--calcite-action-corner-radius: var(--calcite-input-inline-edit-control-corner-radius);--calcite-action-loader-color: var(--calcite-input-inline-edit-control-loader-color);--calcite-action-text-color: var(--calcite-input-inline-edit-control-text-color)}.inline-edit--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-inline-edit-control-background-color-hover, var(--calcite-input-inline-edit-control-background-color));--calcite-action-text-color-press: var(--calcite-input-inline-edit-control-text-color-press, var(--calcite-input-inline-edit-control-text-color))}.inline-edit--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-inline-edit-control-background-color-press, var(--calcite-input-inline-edit-control-background-color));--calcite-action-text-color-press: var(--calcite-input-inline-edit-control-text-color-press, var(--calcite-input-inline-edit-control-text-color))}`;
class si extends H {
  constructor() {
    super(), this.actionWrapperRef = y(), this.attributeWatch = M(["autofocus", "enterkeyhint", "inputmode", "spellcheck"], this.handleGlobalAttributesChanged), this.childRef = y(), this.childNumberRef = y(), this.enableInlineEditingButtonRef = y(), this.direction = L(), this.formSupport = ai({
      inputType: "text",
      getValue: () => this.type === "file" ? this.childRef.value?.files ?? null : this.value
    })(this), this.inputWrapperRef = y(), this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.messages = ii({ blocking: !0 }), this.focusSetter = ti()(this), this.interactiveContainer = ei(this), this.inlineEditManager = new Y({
      getInlineEditing: () => this.inlineEditing,
      setInlineEditing: (i) => {
        this.inlineEditing = i;
      },
      getValue: () => this.value,
      restoreValue: (i) => {
        this.restoreInlineEditingValue(i);
      },
      commitValue: () => this.commitInlineEditingValue(),
      setFocus: () => {
        this.setFocus();
      },
      emitCancel: () => {
        this.calciteInputInlineEditingCancel.emit();
      },
      emitConfirm: () => {
        this.calciteInputInlineEditingConfirm.emit();
      },
      emitEnableEditingChange: () => {
        this.calciteInputInlineEditingChange.emit();
      }
    }), this.inlineEditingLoading = !1, this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.inlineEditing = !1, this.inlineEdit = !1, this.groupSeparator = !1, this.iconFlipRtl = !1, this.loading = !1, this.localeFormat = !1, this.multiple = !1, this.numberButtonType = "vertical", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.type = "text", this.calciteInputChange = m({ cancelable: !1 }), this.calciteInputInlineEditingCancel = m({ cancelable: !1 }), this.calciteInputInlineEditingChange = m({ cancelable: !1 }), this.calciteInputInlineEditingConfirm = m({ cancelable: !1 }), this.calciteInputInput = m(), this.calciteInternalInputBlur = m({ cancelable: !1 }), this.calciteInternalInputFocus = m({ cancelable: !1 }), W(this), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { draftValue: 16, displayedValue: 16, inlineEditingLoading: 16, slottedActionElDisabledInternally: 16, accept: 1, alignment: 3, autocomplete: 1, clearable: 7, disabled: 7, inlineEditing: 7, inlineEdit: [3, { converter: Z }], inlineEditingBeforeConfirm: 0, files: 0, form: 3, groupSeparator: 7, icon: [3, { converter: k }], iconFlipRtl: 7, label: 1, labelText: 1, loading: 7, localeFormat: 5, max: 11, maxLength: 11, messageOverrides: 0, min: 11, minLength: 11, multiple: 5, name: 3, numberButtonType: 3, numberingSystem: 3, pattern: 1, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, step: 3, suffixText: 1, type: 3, validationIcon: [3, { converter: k }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = oi;
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
    return (this.clearable || this.type === "search") && this.valueForEditing.length > 0;
  }
  get value() {
    return this._value;
  }
  set value(i) {
    const t = this._value;
    i !== t && (this._value = i, this.valueWatcher(i, t), i && this._value === "" && this.setValue({
      origin: "reset",
      value: t
    }));
  }
  async selectText() {
    (this.type === "number" ? this.childNumberRef : this.childRef).value?.select();
  }
  async setFocus(i) {
    return this.focusSetter(() => this.type === "number" ? this.childNumberRef.value : this.childRef.value, i);
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable") ?? void 0;
  }
  async load() {
    this.maxString = this.max?.toString(), this.minString = this.min?.toString(), this.requestedIcon = $(V, this.icon, this.type), this.setPreviousEmittedValue(this.value), this.setPreviousValue(this.value), this.type === "number" && (this.value === "Infinity" || this.value === "-Infinity" ? (this.displayedValue = this.value, this.previousEmittedValue = this.value) : (this.warnAboutInvalidNumberValue(this.value), this.setValue({
      origin: "connected",
      value: x(this.value) ? this.value : ""
    })));
  }
  willUpdate(i) {
    i.has("max") && (this.maxString = this.max?.toString() ?? void 0), i.has("min") && (this.minString = this.min?.toString() ?? void 0), (i.has("icon") || i.has("type") && (this.hasUpdated || this.type !== "text")) && (this.requestedIcon = $(V, this.icon, this.type)), i.has("readOnly") && this.stopNudging(), i.has("type") && (this.hasUpdated || this.type !== "text") && this.formSupport.overrideInputType(this.type);
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
  valueWatcher(i, t) {
    if (!this.userChangedValue) {
      if (this.type === "number" && (i === "Infinity" || i === "-Infinity")) {
        this.displayedValue = i, this.previousEmittedValue = i;
        return;
      }
      this.setValue({
        origin: "direct",
        previousValue: t,
        value: i == null || i == "" ? "" : this.type === "number" ? x(i) ? i : this.previousValue || "" : i
      }), this.warnAboutInvalidNumberValue(i);
    }
    this.userChangedValue = !1;
  }
  keyDownHandler(i) {
    if (!(this.readOnly || this.disabled || i.defaultPrevented)) {
      if (this.selfManagedInlineEdit && this.inlineEditing && i.key === "Escape") {
        if (i.preventDefault(), this.isClearable) {
          this.clearInputValue(i);
          return;
        }
        this.inlineEditManager.cancelEditing(), requestAnimationFrame(() => {
          this.enableInlineEditingButtonRef.value?.setFocus();
        });
        return;
      }
      this.isClearable && i.key === "Escape" && (!this.hasInlineEditContext || this.inlineEditingEnabledInContext) && (this.clearInputValue(i), i.preventDefault()), i.key === "Enter" && this.formSupport.active && (i.preventDefault(), this.formSupport.requestSubmit());
    }
  }
  onLabelClick() {
    if (this.selfManagedInlineEdit && !this.inlineEditing) {
      this.inlineEditManager.enable();
      return;
    }
    this.setFocus();
  }
  incrementOrDecrementNumberValue(i, t, e, o) {
    const a = this.valueForEditing;
    if (a === "Infinity" || a === "-Infinity")
      return;
    const b = i === "up" ? 1 : -1, u = this.step === "any" ? 1 : Math.abs(this.step || 1), d = new A(a !== "" ? a : "0").add(`${u * b}`), f = () => typeof e == "number" && !isNaN(e) && d.subtract(`${e}`).isNegative, p = () => typeof t == "number" && !isNaN(t) && !d.subtract(`${t}`).isNegative, h = f() ? `${e}` : p() ? `${t}` : d.toString();
    this.setValue({
      committing: !0,
      nativeEvent: o,
      origin: "user",
      value: h
    });
  }
  clearInputValue(i) {
    this.setValue({
      committing: !0,
      nativeEvent: i,
      origin: "user",
      value: ""
    });
  }
  clearButtonPointerDownHandler(i) {
    i.preventDefault();
  }
  clearButtonClickHandler(i) {
    i.preventDefault(), i.stopPropagation(), this.clearInputValue(i), (this.type === "number" ? this.childNumberRef.value : this.childRef.value)?.focus();
  }
  commitInlineEditingValue() {
    const i = this.draftValue;
    i !== void 0 && (this.draftValue = void 0, i !== this.value && (this.previousValueOrigin = "user", this.userChangedValue = !0, this.value = i, this.calciteInputChange.emit(), this.setPreviousEmittedValue(i)));
  }
  emitChangeIfUserModified() {
    this.isStagingInlineEditingValue || this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue && (this.calciteInputChange.emit(), this.setPreviousEmittedValue(this.value));
  }
  inputBlurHandler() {
    this.stopNudging(), this.isStagingInlineEditingValue && this.inlineEditControlsDisabled && this.commitInlineEditingValue(), this.calciteInternalInputBlur.emit(), this.selfManagedInlineEdit && this.inlineEditing && this.inlineEditControlsDisabled && (this.inlineEditManager.disable(), this.calciteInputInlineEditingChange.emit()), this.emitChangeIfUserModified();
  }
  clickHandler(i) {
    if (this.disabled)
      return;
    const t = i.composedPath(), e = t.some((o) => o instanceof HTMLElement && o.classList.contains(J.container));
    if (!(!t.includes(this.inputWrapperRef.value) || t.includes(this.actionWrapperRef.value) || e)) {
      if (this.selfManagedInlineEdit && !this.inlineEditing) {
        i.preventDefault(), this.inlineEditManager.enable();
        return;
      }
      this.setFocus();
    }
  }
  inputFocusHandler() {
    this.calciteInternalInputFocus.emit();
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
  inputInputHandler(i) {
    this.disabled || this.readOnly || (this.type === "file" && (this.files = this.childRef.value.files ?? void 0), this.setValue({
      nativeEvent: i,
      origin: "user",
      value: i.target.value
    }));
  }
  async inputKeyDownHandler(i) {
    if (!(this.disabled || this.readOnly) && i.key === "Enter") {
      if (this.isStagingInlineEditingValue) {
        i.preventDefault();
        const t = i.currentTarget;
        this.inlineEditControlsDisabled ? t.blur() : (await this.inlineEditManager.confirm(this.inlineEditingBeforeConfirm, (e) => {
          this.inlineEditingLoading = e;
        }), this.focusEnableInlineEditingButton());
        return;
      }
      this.emitChangeIfUserModified();
    }
  }
  inputNumberInputHandler(i) {
    if (this.disabled || this.readOnly || this.value === "Infinity" || this.value === "-Infinity")
      return;
    const t = i.target.value;
    c.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const e = c.delocalize(t);
    i.inputType === "insertFromPaste" ? (x(e) || i.preventDefault(), this.setValue({
      nativeEvent: i,
      origin: "user",
      value: j(e)
    }), this.childNumberRef.value && (this.childNumberRef.value.value = this.displayedValue)) : this.setValue({
      nativeEvent: i,
      origin: "user",
      value: e
    });
  }
  async inputNumberKeyDownHandler(i) {
    if (this.type !== "number" || this.disabled || this.readOnly)
      return;
    if (this.value === "Infinity" || this.value === "-Infinity") {
      i.preventDefault(), (i.key === "Backspace" || i.key === "Delete") && this.clearInputValue(i);
      return;
    }
    if (i.key === "ArrowUp") {
      i.preventDefault(), this.nudgeNumberValue("up", i);
      return;
    }
    if (i.key === "ArrowDown") {
      this.nudgeNumberValue("down", i);
      return;
    }
    const t = [
      ...U,
      "ArrowLeft",
      "ArrowRight",
      "Backspace",
      "Delete",
      "Enter",
      "Escape",
      "Tab"
    ];
    if (i.altKey || i.ctrlKey || i.metaKey)
      return;
    const e = i.shiftKey && i.key === "Tab";
    if (t.includes(i.key) || e) {
      if (i.key === "Enter") {
        if (this.isStagingInlineEditingValue) {
          i.preventDefault();
          const o = i.currentTarget;
          this.inlineEditControlsDisabled ? o.blur() : (await this.inlineEditManager.confirm(this.inlineEditingBeforeConfirm, (a) => {
            this.inlineEditingLoading = a;
          }), this.focusEnableInlineEditingButton());
          return;
        }
        this.emitChangeIfUserModified();
      }
      return;
    }
    c.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, !(i.key === c.decimal && (!this.value && !this.childNumberRef.value?.value || this.value && this.childNumberRef.value?.value.indexOf(c.decimal) === -1)) && (/[eE]/.test(i.key) && (!this.value && !this.childNumberRef.value?.value || this.value && this.childNumberRef.value && !/[eE]/.test(this.childNumberRef.value.value)) || i.key === "-" && (!this.value && !this.childNumberRef.value?.value || this.value && this.childNumberRef.value && this.childNumberRef.value.value.split("-").length <= 2) || i.preventDefault());
  }
  nudgeNumberValue(i, t) {
    if (t instanceof KeyboardEvent && t.repeat || this.type !== "number")
      return;
    const e = this.maxString ? parseFloat(this.maxString) : null, o = this.minString ? parseFloat(this.minString) : null;
    this.incrementOrDecrementNumberValue(i, e, o, t), this.nudgeNumberValueIntervalId && this.stopNudging();
    let a = !0;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (a) {
        a = !1;
        return;
      }
      this.incrementOrDecrementNumberValue(i, e, o, t);
    }, li);
  }
  numberButtonPointerUpAndOutHandler() {
    this.stopNudging();
  }
  numberButtonPointerDownHandler(i) {
    if (!P(i))
      return;
    i.preventDefault();
    const t = i.currentTarget.dataset.adjustment;
    this.disabled || this.nudgeNumberValue(t, i);
  }
  setInputValue(i) {
    const t = this.type === "number" ? this.childNumberRef : this.childRef;
    t.value && (t.value.value = i);
  }
  setPreviousEmittedValue(i) {
    this.previousEmittedValue = this.normalizeValue(i);
  }
  normalizeValue(i) {
    return this.type === "number" ? x(i) ? i : "" : i;
  }
  setPreviousValue(i) {
    this.previousValue = this.normalizeValue(i);
  }
  restoreInlineEditingValue(i) {
    this.draftValue = void 0, this.setValue({ origin: "direct", value: i });
  }
  setValue({ committing: i = !1, nativeEvent: t, origin: e, previousValue: o, value: a }) {
    const b = this.valueForEditing, u = e === "user" && this.isStagingInlineEditingValue;
    if (this.setPreviousValue(o ?? b), this.previousValueOrigin = e, this.type === "number") {
      c.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
        signDisplay: "never"
      };
      const g = this.previousValue?.length > a.length || b?.length > a.length, d = a.charAt(a.length - 1) === ".", f = d && g ? a : q(a), p = a && !f ? x(this.previousValue) ? this.previousValue : "" : f;
      let h = c.localize(p);
      e !== "connected" && !d && (h = K(h, p, c)), this.displayedValue = d && g ? `${h}${c.decimal}` : h;
      const v = ["-", "."].includes(p) ? "" : p;
      u ? this.draftValue = v : (this.userChangedValue = e === "user" && this.value !== v, this.value = v);
    } else
      u ? this.draftValue = a : (this.userChangedValue = e === "user" && this.value !== a, this.value = a);
    e === "direct" && (this.draftValue = void 0, this.setInputValue(a), this.previousEmittedValue = a), t && !u && (this.calciteInputInput.emit().defaultPrevented ? (this.value = this.previousValue, this.displayedValue = this.type === "number" ? c.localize(this.previousValue) : this.previousValue) : i && !u && this.emitChangeIfUserModified());
  }
  inputKeyUpHandler() {
    this.stopNudging();
  }
  warnAboutInvalidNumberValue(i) {
    this.type === "number" && i && !x(i) && T.warn(`The specified value "${i}" cannot be parsed, or is out of range.`);
  }
  render() {
    const i = this.direction, t = s`<div class=${l(r.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, e = s`<div class=${l(r.clearButton)} @click=${this.disabled || this.readOnly ? void 0 : this.clearButtonClickHandler} @pointerdown=${this.disabled || this.readOnly ? void 0 : this.clearButtonPointerDownHandler}>${ni({ ariaLabel: this.messages.clear, disabled: this.disabled || this.readOnly, scale: this.scale, title: this.messages.clear })}</div>`, o = s`<div class=${l(r.inputIcon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${_(this.scale)}></calcite-icon></div>`, a = this.numberButtonType === "horizontal", b = s`<div aria-hidden=true class=${l({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: a
    })} data-adjustment=${C.up} data-testid=number-button-up @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler}><calcite-action .disabled=${this.disabled || this.readOnly} .icon=${S.chevronUp} .scale=${this.scale} tabindex=-1 text></calcite-action></div>`, u = s`<div aria-hidden=true class=${l({
      [r.numberButtonItem]: !0,
      [r.buttonItemHorizontal]: a
    })} data-adjustment=${C.down} data-testid=number-button-down @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler}><calcite-action .disabled=${this.disabled || this.readOnly} .icon=${S.chevronDown} .scale=${this.scale} tabindex=-1 text></calcite-action></div>`, g = s`<div class=${l(r.numberButtonWrapper)}>${b}${u}</div>`, d = s`<div class=${l(r.prefix)}>${this.prefixText}</div>`, f = s`<div class=${l(r.suffix)}>${this.suffixText}</div>`, p = this.el.autofocus, h = this.el.enterKeyHint, v = this.el.inputMode, N = this.type === "number" ? F("localized-input", s`<input accept=${this.accept ?? n} aria-errormessage=${w.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${z(this)} autocomplete=${this.autocomplete ?? n} .autofocus=${p} class=${l({
      [r.inlineEditing]: this.inlineEditingEnabledInContext,
      [r.inlineChild]: this.hasInlineEditContext,
      [r.inlineEditableChild]: !!this.inlineEditableEl
      // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
    })} value=${this.defaultValue ?? n} .disabled=${this.disabled} enterkeyhint=${h ?? n} inputmode=${v ?? n} maxlength=${this.maxLength ?? n} minlength=${this.minLength ?? n} .multiple=${this.multiple} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputNumberInputHandler} @keydown=${this.inputNumberKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? n} placeholder=${(this.placeholder || "") ?? n} .readOnly=${this.readOnly} .required=${this.required} tabindex=${(this.disabled || this.hasInlineEditContext && !this.inlineEditingEnabledInContext ? -1 : void 0) ?? n} type=text .value=${I(this.displayedValue ?? "")} ${E(this.childNumberRef)}>`) : null, B = this.type !== "number" ? s`<input accept=${this.accept ?? n} aria-errormessage=${w.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${z(this)} autocomplete=${this.autocomplete ?? n} .autofocus=${p} class=${l({
      [r.inlineEditing]: this.inlineEditingEnabledInContext,
      [r.inlineChild]: this.hasInlineEditContext,
      [r.inlineEditableChild]: !!this.inlineEditableEl
      // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
    })} value=${this.defaultValue ?? n} .disabled=${this.disabled} enterkeyhint=${h ?? n} inputmode=${v ?? n} max=${this.maxString ?? n} maxlength=${this.maxLength ?? n} min=${this.minString ?? n} minlength=${this.minLength ?? n} .multiple=${this.multiple} name=${this.name ?? n} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputInputHandler} @keydown=${this.inputKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? n} placeholder=${(this.placeholder || "") ?? n} .readOnly=${this.readOnly} .required=${this.required} spellcheck=${this.el.spellcheck ?? n} step=${this.step ?? n} tabindex=${(this.disabled || this.hasInlineEditContext && !this.inlineEditingEnabledInContext ? -1 : void 0) ?? n} type=${this.type ?? n} .value=${I(this.valueForEditing ?? "")} ${E(this.childRef)}>` : null;
    return this.interactiveContainer({ disabled: this.disabled, children: s`${this.labelText && G({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${l({
      [r.inputWrapper]: !0,
      [O.rtl]: i === "rtl",
      [r.hasSuffix]: this.suffixText,
      [r.hasPrefix]: this.prefixText
    })} ${E(this.inputWrapperRef)}><div class=${l(r.wrapper)}>${this.loading ? t : null}${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? u : null}${this.prefixText ? d : null}${this.requestedIcon ? o : null}${N}${B}${this.isClearable ? e : null}${this.suffixText ? f : null}${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? b : null}${this.type === "number" && this.numberButtonType === "vertical" && !this.readOnly ? g : null}</div>${this.selfManagedInlineEdit && s`<div class=${l(r.inlineEdit)}>${Q({ cancelEditingLabel: this.messages.cancelInlineEditing, confirmChangesLabel: this.messages.confirmInlineEditingChanges, enableEditingButtonRef: this.enableInlineEditingButtonRef, enableEditingLabel: this.messages.enableInlineEditing, inlineEditing: this.inlineEditing, loading: this.inlineEditingLoading, onCancelEditing: this.inlineEditCancelEditingHandler, onConfirmChanges: this.inlineEditConfirmChangesHandler, onEnableEditing: () => this.inlineEditManager.enable(), scale: this.scale, showControls: this.inlineEditing && !this.inlineEditControlsDisabled })}</div>` || ""}<div class=${l(r.actionWrapper)} ${E(this.actionWrapperRef)}><slot name=${ri.action}></slot></div></div>${this.validationMessage && this.status === "invalid" ? X({ icon: this.validationIcon, id: w.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
R("calcite-input", si);
export {
  si as Input
};
