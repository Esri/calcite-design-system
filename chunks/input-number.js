/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as O, L as R, c as m, F as V, l as F, s as o, b as s, A as p, C as M, d as L } from "./index.js";
import { l as P } from "./live.js";
import { i as j } from "./keyed.js";
import { e as I, n as z } from "./ref.js";
import { b as A, u as U } from "./index2.js";
import { z as $, h as C } from "./dom.js";
import { n as q } from "./key.js";
import { g as W } from "./label.js";
import { u as _ } from "./useLabel.js";
import { i as v, n as r, B as K, p as G, e as Y, f as Z } from "./locale.js";
import { g as J } from "./component.js";
import { C as Q } from "./ClearButton.js";
import { I as X } from "./InternalLabel.js";
import { U as ee, i as ie, C as te, I as ne } from "./useInlineEdit.js";
import { V as ae } from "./Validation.js";
import { u as re } from "./useT9n.js";
import { u as le } from "./useSetFocus.js";
import { u as oe } from "./useInteractive.js";
import { u as se } from "./useForm.js";
const n = {
  loader: "loader",
  clearButton: "clear-button",
  clearable: "clearable",
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
}, S = {
  validationMessage: "inputNumberValidationMessage"
}, ce = {
  action: "action"
}, B = {
  chevronUp: "chevron-up",
  chevronDown: "chevron-down"
}, D = {
  up: "up",
  down: "down"
}, ue = 150, de = O`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;--calcite-internal-input-number-focus-outline-color: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) );--calcite-internal-input-number-number-button-item-height: auto}:host([scale=s]){--calcite-internal-input-number-icon-padding-inline: var(--calcite-spacing-fixed-sm)}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);block-size:var(--calcite-input-number-height, 1.5rem)}:host([scale=s]) input{padding-inline:var(--calcite-spacing-sm)}:host([scale=s]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=s]) .prefix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-xxs)}:host([scale=s]) .has-suffix input{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s]) .suffix{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper{block-size:var(--calcite-input-number-height, 1.5rem)}:host([scale=s]) .clear-button{block-size:var(--calcite-spacing-xxl)}:host([scale=s]):host([number-button-type=horizontal]){--calcite-internal-input-number-number-button-item-horizontal-padding: var(--calcite-spacing-xxs)}:host([scale=s]):host([number-button-type=vertical]){--calcite-internal-input-number-number-button-item-height: 8px;--calcite-internal-input-number-number-button-item-horizontal-padding: var(--calcite-spacing-xxs);--calcite-internal-input-number-number-button-item-vertical-padding: 3px}:host([scale=m]){--calcite-internal-input-number-icon-padding-inline: var(--calcite-spacing-fixed-md)}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);block-size:var(--calcite-input-number-height, 2rem)}:host([scale=m]) input{padding-inline:var(--calcite-spacing-md)}:host([scale=m]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xs)}:host([scale=m]) .prefix{padding-inline:var(--calcite-spacing-md) var(--calcite-spacing-xs)}:host([scale=m]) .has-suffix input{padding-inline-end:var(--calcite-spacing-xs)}:host([scale=m]) .suffix{padding-inline:var(--calcite-spacing-xs) var(--calcite-spacing-md)}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper{block-size:var(--calcite-input-number-height, 2rem)}:host([scale=m]):host([number-button-type=horizontal]){--calcite-internal-input-number-number-button-item-horizontal-padding: var(--calcite-space-sm)}:host([scale=m]):host([number-button-type=vertical]){--calcite-internal-input-number-number-button-item-height: 11px;--calcite-internal-input-number-number-button-item-horizontal-padding: var(--calcite-space-sm);--calcite-internal-input-number-number-button-item-vertical-padding: var(--calcite-space-2xs)}:host([scale=l]){--calcite-internal-input-number-icon-padding-inline: var(--calcite-spacing-fixed-lg)}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);block-size:var(--calcite-input-number-height, 2.75rem)}:host([scale=l]) input{padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .has-prefix input{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=l]) .prefix{padding-inline:var(--calcite-spacing-lg) var(--calcite-spacing-sm)}:host([scale=l]) .has-suffix input{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=l]) .suffix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-lg)}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper{block-size:var(--calcite-input-number-height, 2.75rem)}:host([scale=l]):host([number-button-type=horizontal]){--calcite-internal-input-number-number-button-item-horizontal-padding: var(--calcite-spacing-sm-plus)}:host([scale=l]):host([number-button-type=vertical]){--calcite-internal-input-number-number-button-item-height: 16px;--calcite-internal-input-number-number-button-item-horizontal-padding: var(--calcite-spacing-sm-plus);--calcite-internal-input-number-number-button-item-vertical-padding: 5px}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none;position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;font-family:inherit;font-weight:var(--calcite-font-weight-normal);outline:none;background-color:var(--calcite-input-number-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-number-text-color, var(--calcite-color-text-1));text-align:var(--calcite-internal-input-number-alignment)}input:placeholder-shown{text-overflow:ellipsis}.element-wrapper,input{border-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}.has-prefix input,.element-wrapper:has(.icon) input{border-start-start-radius:0;border-end-start-radius:0}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=down]) input,.has-prefix input,.element-wrapper:has(.icon) input{border-inline-start-width:0}.element-wrapper:has(.clear-button) input,.has-suffix input,.element-wrapper:has(.number-button-item--horizontal[data-adjustment=up]) input,.element-wrapper:has(.number-button-item) input{border-inline-end-width:0}.has-suffix input,.clearable input,:host(:not([read-only])) input,.suffix,.clear-button{border-start-end-radius:0;border-end-end-radius:0}.has-prefix :is(.prefix:first-child,.loader+.prefix),:host([number-button-type=horizontal]) .number-button-item[data-adjustment=down],.element-wrapper:has(.icon) :is(.icon:first-child,.loader+.icon){border-start-start-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host([read-only]) .suffix,:host([read-only]) .wrapper:not(.has-suffix) .clear-button,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=up]{border-end-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px;border-end-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]{border-start-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp))}:host(:not([read-only])[number-button-type=horizontal]) .prefix,:host(:not([read-only])[number-button-type=horizontal]) input,.has-prefix input{border-start-start-radius:0;border-end-start-radius:0}input{border-width:1px;border-style:solid;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input))}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-number-text-color-focus, var(--calcite-color-text-1))}input[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-number-background-color, var(--calcite-color-background))}input[readonly]:focus{color:var(--calcite-input-number-text-color-focus, var(--calcite-color-text-1))}:host([read-only]) .prefix,:host([read-only]) .icon,:host([read-only]) .clear-button,:host([read-only]) .suffix{background-color:var(--calcite-input-number-background-color, var(--calcite-color-background))}.element-wrapper{position:relative;display:inline-flex;flex:1 1 0%;align-items:center;order:3;isolation:isolate}.element-wrapper:has(input:focus){outline:var(--calcite-border-width-md) solid var(--calcite-internal-input-number-focus-outline-color);outline-offset:calc(var(--calcite-border-width-sm) * -2)}.element-wrapper:has(input:focus) input{z-index:calc(var(--calcite-z-index) * -1)}:host([status=invalid]) .prefix,:host([status=invalid]) .icon,:host([status=invalid]) input,:host([status=invalid]) .clear-button,:host([status=invalid]) .suffix,:host([status=invalid]) .number-button-item{border-color:var(--calcite-color-status-danger)}:host([status=invalid]){--calcite-internal-input-number-focus-outline-color: var(--calcite-color-status-danger)}.icon{box-sizing:border-box;display:flex;align-self:stretch;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input));border-inline-end-width:var(--calcite-border-width-none);background-color:var(--calcite-input-number-background-color, var(--calcite-color-foreground-1));--calcite-icon-color: var( --calcite-input-number-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-text-3)) );align-items:center;padding-inline-start:var(--calcite-internal-input-number-icon-padding-inline)}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=down]) .icon,.has-prefix .icon{border-inline-start-width:0}.clear-button{box-sizing:border-box;display:flex;align-self:stretch;order:4;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input));border-inline-start-width:var(--calcite-border-width-none);background-color:var(--calcite-input-number-background-color, var(--calcite-color-foreground-1))}.has-suffix .clear-button,.element-wrapper:has(.number-button-item.number-button-item--horizontal[data-adjustment=up]) .clear-button,.element-wrapper:has(.number-button-item) .clear-button{border-inline-end-width:0}.loader{inset-block-start:var(--calcite-border-width-sm);inset-inline:var(--calcite-border-width-sm);pointer-events:none;position:absolute;display:block}.loader calcite-progress{--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.inline-edit{order:7}.action-wrapper{order:8;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;line-height:1;font-weight:var(--calcite-font-weight-regular);border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input))}.prefix{order:0;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto);background-color:var(--calcite-input-number-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto);background-color:var(--calcite-input-number-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=down]) .prefix{border-inline-start-width:var(--calcite-border-width-none)}.element-wrapper:has(.number-button-item--horizontal[data-adjustment=up]) .suffix,.element-wrapper:has(.number-button-item) .suffix{border-inline-end-width:var(--calcite-border-width-none)}:host([alignment=start]){--calcite-internal-input-number-alignment: start}:host([alignment=center]){--calcite-internal-input-number-alignment: center}:host([alignment=end]){--calcite-internal-input-number-alignment: end}.number-button-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;pointer-events:none;box-sizing:border-box;display:flex;flex-direction:column;order:6}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-action{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-action{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down],.number-button-item.number-button-item--horizontal[data-adjustment=up]{max-block-size:100%;min-block-size:100%;align-self:stretch;order:1}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-action,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-action{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-inline-start-width:var(--calcite-border-width-sm);border-inline-end-width:0px;order:0;padding-inline-start:var(--calcite-internal-input-number-number-button-item-horizontal-padding)}.number-button-item.number-button-item--horizontal[data-adjustment=up]{order:5;padding-inline-end:var(--calcite-internal-input-number-number-button-item-horizontal-padding)}:host([number-button-type=vertical]) .number-button-item{padding-inline-end:var(--calcite-internal-input-number-number-button-item-horizontal-padding)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]{border-start-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp));border-block-end-width:var(--calcite-border-width-none);padding-block-start:var(--calcite-internal-input-number-number-button-item-vertical-padding)}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px;border-end-end-radius:var(--calcite-input-number-corner-radius, var(--calcite-corner-radius-sharp));padding-block-end:var(--calcite-internal-input-number-number-button-item-vertical-padding)}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:var(--calcite-border-width-sm);border-style:solid;border-color:var(--calcite-input-number-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-number-background-color, var(--calcite-color-foreground-1));border-inline-start-width:var(--calcite-border-width-none)}.number-button-item:hover calcite-action{--calcite-action-background-color: var( --calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2) );--calcite-action-text-color: var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.number-button-item:active calcite-action{--calcite-action-background-color: var( --calcite-input-actions-background-color-press, var(--calcite-color-foreground-3) );--calcite-action-text-color: var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.number-button-item calcite-action{--calcite-internal-action-height: var(--calcite-internal-input-number-number-button-item-height);--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-input-actions-background-color);--calcite-action-text-color: var(--calcite-input-actions-icon-color)}.number-button-item calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-actions-background-color-hover);--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-hover)}.number-button-item calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-actions-background-color-press);--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-press)}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child.inline-editable-child{background-color:transparent}input.inline-child .inline-editing{background-color:inherit}input.inline-child:not(.inline-editing){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}.element-wrapper:has(input.inline-child:not(.inline-editing)) .loader,.element-wrapper:has(input.inline-child:not(.inline-editing)) .number-button-item,.element-wrapper:has(input.inline-child:not(.inline-editing)) .prefix,.element-wrapper:has(input.inline-child:not(.inline-editing)) .icon,.element-wrapper:has(input.inline-child:not(.inline-editing)) .clear-button,.element-wrapper:has(input.inline-child:not(.inline-editing)) .suffix{display:none}:host([inline-edit]:not([inline-editing])) .wrapper:hover input,:host([inline-edit]:not([inline-editing])) .wrapper:hover .inline-edit,:host([inline-edit]:not([inline-editing])) .wrapper:hover .action-wrapper,:host:has(input.inline-child:not(.inline-editable-child):not(.inline-editing)) .wrapper:hover input,:host:has(input.inline-child:not(.inline-editable-child):not(.inline-editing)) .wrapper:hover .inline-edit,:host:has(input.inline-child:not(.inline-editable-child):not(.inline-editing)) .wrapper:hover .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-number-inline-edit-background-color-hover, var(--calcite-color-foreground-2))}:host([inline-edit]) input,:host([inline-edit]) .inline-edit,:host([inline-edit]) .action-wrapper{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-input-number-background-color, var(--calcite-color-foreground-1))}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-number-placeholder-text-color, var(--calcite-color-text-3))}.clear-button--container{display:flex;cursor:pointer;align-items:center}.clear-button--container:hover calcite-action{--calcite-action-background-color: var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color: var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.clear-button--container:active calcite-action{--calcite-action-background-color: var(--calcite-input-actions-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color: var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.clear-button--container calcite-action{--calcite-internal-action-height: 100%;--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-input-actions-background-color, var(--calcite-color-foreground-2));--calcite-action-text-color: var(--calcite-input-actions-icon-color)}.clear-button--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-hover)}.clear-button--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-actions-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color-press: var(--calcite-input-actions-icon-color-press)}:host([scale=s]) .clear-button--container{padding:var(--calcite-space-2xs)}:host([scale=m]) .clear-button--container{padding:var(--calcite-space-2xs);padding-inline-end:var(--calcite-space-sm)}:host([scale=l]) .clear-button--container{padding-inline-end:var(--calcite-space-sm-plus)}.inline-edit--container{display:flex;cursor:pointer;align-items:center}.inline-edit--container .enable-editing,.inline-edit--container .confirm-changes,.inline-edit--container .cancel-editing{margin-inline-start:var(--calcite-space-2xs)}.inline-edit--container .enable-editing{--calcite-action-text-color: var(--calcite-input-number-inline-edit-control-text-color, var(--calcite-color-text-1))}.inline-edit--container calcite-action{--calcite-action-background-color: var(--calcite-input-number-inline-edit-control-background-color);--calcite-action-corner-radius: var(--calcite-input-number-inline-edit-control-corner-radius);--calcite-action-loader-color: var(--calcite-input-number-inline-edit-control-loader-color);--calcite-action-text-color: var(--calcite-input-number-inline-edit-control-text-color)}.inline-edit--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-number-inline-edit-control-background-color-hover, var(--calcite-input-number-inline-edit-control-background-color));--calcite-action-text-color-press: var(--calcite-input-number-inline-edit-control-text-color-press, var(--calcite-input-number-inline-edit-control-text-color))}.inline-edit--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-number-inline-edit-control-background-color-press, var(--calcite-input-number-inline-edit-control-background-color));--calcite-action-text-color-press: var(--calcite-input-number-inline-edit-control-text-color-press, var(--calcite-input-number-inline-edit-control-text-color))}`;
class he extends R {
  constructor() {
    super(), this.actionWrapperRef = I(), this.attributeWatch = A(["autofocus", "enterkeyhint", "inputmode"], this.handleGlobalAttributesChanged), this.childNumberRef = I(), this.enableInlineEditingButtonRef = I(), this.direction = U(), this.formSupport = se({
      inputType: "number"
    })(this), this.inputWrapperRef = I(), this.previousValueOrigin = "initial", this.userChangedValue = !1, this._value = "", this.messages = re({ blocking: !0 }), this.focusSetter = le()(this), this.interactiveContainer = oe(this), this.inlineEditManager = new ee({
      getInlineEditing: () => this.inlineEditing,
      setInlineEditing: (e) => {
        this.inlineEditing = e;
      },
      getValue: () => this.value,
      restoreValue: (e) => {
        this.restoreInlineEditingValue(e);
      },
      commitValue: () => this.commitInlineEditingValue(),
      setFocus: () => {
        this.setFocus();
      },
      emitCancel: () => {
        this.calciteInputNumberInlineEditingCancel.emit();
      },
      emitConfirm: () => {
        this.calciteInputNumberInlineEditingConfirm.emit();
      },
      emitEnableEditingChange: () => {
        this.calciteInputNumberInlineEditingChange.emit();
      }
    }), this.inlineEditingLoading = !1, this.slottedActionElDisabledInternally = !1, this.alignment = "start", this.clearable = !1, this.disabled = !1, this.inlineEditing = !1, this.inlineEdit = !1, this.groupSeparator = !1, this.iconFlipRtl = !1, this.integer = !1, this.loading = !1, this.localeFormat = !1, this.numberButtonType = "vertical", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.calciteInputNumberChange = m({ cancelable: !1 }), this.calciteInputNumberInlineEditingCancel = m({ cancelable: !1 }), this.calciteInputNumberInlineEditingChange = m({ cancelable: !1 }), this.calciteInputNumberInlineEditingConfirm = m({ cancelable: !1 }), this.calciteInputNumberInput = m(), this.calciteInternalInputNumberBlur = m({ cancelable: !1 }), this.calciteInternalInputNumberFocus = m({ cancelable: !1 }), _(this), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { draftValue: 16, displayedValue: 16, inlineEditingLoading: 16, slottedActionElDisabledInternally: 16, alignment: 3, autocomplete: 1, clearable: 7, disabled: 7, inlineEditing: 7, inlineEdit: [3, { converter: ie }], inlineEditingBeforeConfirm: 0, form: 3, groupSeparator: 7, icon: [3, { converter: V }], iconFlipRtl: 7, integer: 5, label: 1, labelText: 1, loading: 7, localeFormat: 5, max: 11, maxLength: 11, messageOverrides: 0, min: 11, minLength: 11, name: 3, numberButtonType: 3, numberingSystem: 3, placeholder: 1, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, step: 3, suffixText: 1, validationIcon: [3, { converter: V }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = de;
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
  set value(e) {
    const i = this._value;
    e !== i && (this._value = e, this.valueWatcher(e, i), e && this._value === "" && this.setNumberValue({
      origin: "reset",
      value: i
    }));
  }
  async selectText() {
    this.childNumberRef.value?.select();
  }
  async setFocus(e) {
    return this.focusSetter(() => this.childNumberRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.inlineEditableEl = this.el.closest("calcite-inline-editable") ?? void 0;
  }
  async load() {
    this.maxString = this.max?.toString(), this.minString = this.min?.toString(), this.requestedIcon = $({}, this.icon, "number"), this.setPreviousEmittedNumberValue(this.value), this.setPreviousNumberValue(this.value), this.warnAboutInvalidNumberValue(this.value), this.value === "Infinity" || this.value === "-Infinity" ? (this.displayedValue = this.value, this.previousEmittedNumberValue = this.value) : this.setNumberValue({
      origin: "connected",
      value: v(this.value) ? this.value : ""
    });
  }
  willUpdate(e) {
    e.has("max") && (this.maxString = this.max?.toString() || void 0), e.has("min") && (this.minString = this.min?.toString() || void 0), e.has("icon") && (this.requestedIcon = $({}, this.icon, "number")), e.has("messages") && (r.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: !1
    }), e.has("readOnly") && this.stopNudging();
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
  valueWatcher(e, i) {
    if (!this.userChangedValue) {
      if (e === "Infinity" || e === "-Infinity") {
        this.displayedValue = e, this.previousEmittedNumberValue = e;
        return;
      }
      this.setNumberValue({
        origin: "direct",
        previousValue: i,
        value: e == null || e == "" ? "" : v(e) ? e : this.previousValue || ""
      }), this.warnAboutInvalidNumberValue(e);
    }
    this.userChangedValue = !1;
  }
  keyDownHandler(e) {
    if (!(this.readOnly || this.disabled || e.defaultPrevented)) {
      if (this.selfManagedInlineEdit && this.inlineEditing && e.key === "Escape") {
        if (e.preventDefault(), this.isClearable) {
          this.clearInputValue(e);
          return;
        }
        this.inlineEditManager.cancelEditing(), requestAnimationFrame(() => {
          this.enableInlineEditingButtonRef.value?.setFocus();
        });
        return;
      }
      this.isClearable && e.key === "Escape" && (!this.hasInlineEditContext || this.inlineEditingEnabledInContext) && (this.clearInputValue(e), e.preventDefault()), e.key === "Enter" && this.formSupport.active && (this.formSupport.requestSubmit(), e.preventDefault());
    }
  }
  onLabelClick() {
    if (this.selfManagedInlineEdit && !this.inlineEditing) {
      this.inlineEditManager.enable();
      return;
    }
    this.setFocus();
  }
  incrementOrDecrementNumberValue(e, i, t, l) {
    const a = this.valueForEditing;
    if (a === "Infinity" || a === "-Infinity")
      return;
    const b = e === "up" ? 1 : -1, u = this.integer && typeof this.step == "number" ? Math.round(this.step) : this.step, g = u === "any" ? 1 : Math.abs(u || 1), h = new K(a !== "" ? a : "0").add(`${g * b}`), f = () => typeof t == "number" && !isNaN(t) && h.subtract(`${t}`).isNegative, x = () => typeof i == "number" && !isNaN(i) && !h.subtract(`${i}`).isNegative, y = f() ? `${t}` : x() ? `${i}` : h.toString();
    this.setNumberValue({
      committing: !0,
      nativeEvent: l,
      origin: "user",
      value: y
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
  clearButtonPointerDownHandler(e) {
    this.hasInlineEditContext && this.inlineEditingEnabledInContext && e.preventDefault();
  }
  commitInlineEditingValue() {
    const e = this.draftValue;
    e !== void 0 && (this.draftValue = void 0, e !== this.value && (this.previousValueOrigin = "user", this.userChangedValue = !0, this.value = e, this.calciteInputNumberChange.emit(), this.setPreviousEmittedNumberValue(e)));
  }
  emitChangeIfUserModified() {
    this.isStagingInlineEditingValue || this.previousValueOrigin === "user" && this.value !== this.previousEmittedNumberValue && (this.calciteInputNumberChange.emit(), this.setPreviousEmittedNumberValue(this.value));
  }
  inputNumberBlurHandler() {
    this.stopNudging(), this.isStagingInlineEditingValue && this.inlineEditControlsDisabled && this.commitInlineEditingValue(), this.calciteInternalInputNumberBlur.emit(), this.selfManagedInlineEdit && this.inlineEditing && this.inlineEditControlsDisabled && (this.inlineEditManager.disable(), this.calciteInputNumberInlineEditingChange.emit()), this.emitChangeIfUserModified();
  }
  clickHandler(e) {
    if (this.disabled)
      return;
    const i = e.composedPath(), t = i.some((l) => l instanceof HTMLElement && l.classList.contains(te.container));
    if (!(!i.includes(this.inputWrapperRef.value) || i.includes(this.actionWrapperRef.value) || t)) {
      if (this.selfManagedInlineEdit && !this.inlineEditing) {
        e.preventDefault(), this.inlineEditManager.enable();
        return;
      }
      this.setFocus();
    }
  }
  inputNumberFocusHandler() {
    this.calciteInternalInputNumberFocus.emit();
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
    await this.inlineEditManager.confirm(this.inlineEditingBeforeConfirm, (e) => {
      this.inlineEditingLoading = e;
    }), this.focusEnableInlineEditingButton();
  }
  inputNumberInputHandler(e) {
    if (this.disabled || this.readOnly || this.value === "Infinity" || this.value === "-Infinity")
      return;
    const i = e.target.value;
    r.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const t = r.delocalize(i);
    e.inputType === "insertFromPaste" ? ((!v(t) || this.integer && (t.includes("e") || t.includes("."))) && e.preventDefault(), this.setNumberValue({
      nativeEvent: e,
      origin: "user",
      value: G(t)
    }), this.childNumberRef.value && (this.childNumberRef.value.value = this.displayedValue)) : this.setNumberValue({
      nativeEvent: e,
      origin: "user",
      value: t
    });
  }
  async inputNumberKeyDownHandler(e) {
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
    const i = [
      ...q,
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
    const t = e.shiftKey && e.key === "Tab";
    if (i.includes(e.key) || t) {
      if (e.key === "Enter") {
        if (this.isStagingInlineEditingValue) {
          e.preventDefault();
          const l = e.currentTarget;
          this.inlineEditControlsDisabled ? l.blur() : (await this.inlineEditManager.confirm(this.inlineEditingBeforeConfirm, (a) => {
            this.inlineEditingLoading = a;
          }), this.focusEnableInlineEditingButton());
          return;
        }
        this.emitChangeIfUserModified();
      }
      return;
    }
    r.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, !(e.key === r.decimal && !this.integer && (!this.value && !this.childNumberRef.value?.value || this.value && this.childNumberRef.value?.value.indexOf(r.decimal) === -1)) && (/[eE]/.test(e.key) && !this.integer && (!this.value && !this.childNumberRef.value?.value || this.value && this.childNumberRef.value && !/[eE]/.test(this.childNumberRef.value.value)) || e.key === "-" && (!this.value && !this.childNumberRef.value?.value || this.value && this.childNumberRef.value && this.childNumberRef.value.value.split("-").length <= 2) || e.preventDefault());
  }
  nudgeNumberValue(e, i) {
    if (i instanceof KeyboardEvent && i.repeat)
      return;
    const t = this.maxString ? parseFloat(this.maxString) : null, l = this.minString ? parseFloat(this.minString) : null;
    this.incrementOrDecrementNumberValue(e, t, l, i), this.nudgeNumberValueIntervalId && this.stopNudging();
    let a = !0;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (a) {
        a = !1;
        return;
      }
      this.incrementOrDecrementNumberValue(e, t, l, i);
    }, ue);
  }
  nudgeButtonPointerUpHandler(e) {
    C(e) && this.stopNudging();
  }
  nudgeButtonPointerOutHandler() {
    this.stopNudging();
  }
  nudgeButtonPointerDownHandler(e) {
    if (!C(e))
      return;
    e.preventDefault();
    const i = e.currentTarget.dataset.adjustment;
    this.disabled || this.nudgeNumberValue(i, e);
  }
  setInputNumberValue(e) {
    this.childNumberRef.value && (this.childNumberRef.value.value = e);
  }
  setPreviousEmittedNumberValue(e) {
    this.previousEmittedNumberValue = this.normalizeValue(e);
  }
  normalizeValue(e) {
    return v(e) ? e : "";
  }
  setPreviousNumberValue(e) {
    this.previousValue = this.normalizeValue(e);
  }
  restoreInlineEditingValue(e) {
    this.draftValue = void 0, this.setNumberValue({ origin: "direct", value: e });
  }
  setNumberValue({ committing: e = !1, nativeEvent: i, origin: t, previousValue: l, value: a }) {
    r.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const b = this.valueForEditing, u = t === "user" && this.isStagingInlineEditingValue, g = this.previousValue?.length > a.length || b?.length > a.length, d = this.integer ? a.replace(/[e.]/g, "") : a, h = d.charAt(d.length - 1) === ".", f = d.charAt(0) === "-", x = d.match(/^-?(0+)\d/), y = h && g ? d : Y(d), E = a && !y ? v(this.previousValue) ? this.previousValue : "" : y;
    let c = r.localize(E);
    t !== "connected" && !h && (c = Z(c, E, r)), h && g && (c = `${c}${r.decimal}`), x && (c = `${f ? c.charAt(0) : ""}${r.localize("0").repeat(x[1].length)}${f ? c.slice(1) : c}`), this.displayedValue = c, this.setPreviousNumberValue(l ?? b), this.previousValueOrigin = t;
    const w = ["-", "."].includes(E) ? "" : E;
    u ? this.draftValue = w : (this.userChangedValue = t === "user" && this.value !== w, this.value = w);
    const H = /* @__PURE__ */ new Set([
      "e",
      "E",
      r.decimal,
      r.minusSign,
      r.group,
      ...r.digits
    ]), k = this.childNumberRef.value?.value;
    if (k) {
      const N = Array.from(k).filter((T) => H.has(T)).join("");
      N !== k && this.setInputNumberValue(N);
    }
    t === "direct" && (this.draftValue = void 0, this.setInputNumberValue(c), this.setPreviousEmittedNumberValue(w)), i && !u && (this.calciteInputNumberInput.emit().defaultPrevented ? (this.value = this.previousValue, this.displayedValue = r.localize(this.previousValue)) : e && !u && this.emitChangeIfUserModified());
  }
  inputNumberKeyUpHandler() {
    this.stopNudging();
  }
  warnAboutInvalidNumberValue(e) {
    e && !v(e) && F.warn(`The specified value "${e}" cannot be parsed, or is out of range.`);
  }
  render() {
    const e = this.direction, i = s`<div class=${o(n.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`, t = s`<div class=${o(n.clearButton)} @click=${this.disabled || this.readOnly ? void 0 : this.clearInputValue} @pointerdown=${this.clearButtonPointerDownHandler}>${Q({ ariaLabel: this.messages.clear, disabled: this.disabled || this.readOnly, scale: this.scale, title: this.messages.clear })}</div>`, l = s`<div class=${o(n.inputIcon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${J(this.scale)}></calcite-icon></div>`, a = this.numberButtonType === "horizontal", b = s`<div aria-hidden=true class=${o({
      [n.numberButtonItem]: !0,
      [n.buttonItemHorizontal]: a
    })} data-adjustment=${D.up} data-testid=number-button-up @pointerdown=${this.nudgeButtonPointerDownHandler} @pointerout=${this.nudgeButtonPointerOutHandler} @pointerup=${this.nudgeButtonPointerUpHandler}><calcite-action .disabled=${this.disabled || this.readOnly} .icon=${B.chevronUp} .scale=${this.scale} tabindex=-1 text></calcite-action></div>`, u = s`<div aria-hidden=true class=${o({
      [n.numberButtonItem]: !0,
      [n.buttonItemHorizontal]: a
    })} data-adjustment=${D.down} data-testid=number-button-down @pointerdown=${this.nudgeButtonPointerDownHandler} @pointerout=${this.nudgeButtonPointerOutHandler} @pointerup=${this.nudgeButtonPointerUpHandler}><calcite-action .disabled=${this.disabled || this.readOnly} .icon=${B.chevronDown} .scale=${this.scale} tabindex=-1 text></calcite-action></div>`, g = s`<div class=${o(n.numberButtonWrapper)}>${b}${u}</div>`, d = s`<div class=${o(n.prefix)}>${this.prefixText}</div>`, h = s`<div class=${o(n.suffix)}>${this.suffixText}</div>`, f = j("localized-input", s`<input aria-errormessage=${S.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${W(this)} autocomplete=${this.autocomplete ?? p} .autofocus=${this.el.autofocus} class=${o({
      [n.inlineEditing]: this.inlineEditingEnabledInContext,
      [n.inlineChild]: this.hasInlineEditContext,
      [n.inlineEditableChild]: !!this.inlineEditableEl
      // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
    })} value=${this.defaultValue ?? p} .disabled=${this.disabled} enterkeyhint=${this.el.enterKeyHint ?? p} inputmode=${(this.el.inputMode || "decimal") ?? p} maxlength=${this.maxLength ?? p} minlength=${this.minLength ?? p} @blur=${this.inputNumberBlurHandler} @focus=${this.inputNumberFocusHandler} @input=${this.inputNumberInputHandler} @keydown=${this.inputNumberKeyDownHandler} @keyup=${this.inputNumberKeyUpHandler} placeholder=${(this.placeholder || "") ?? p} .readOnly=${this.readOnly} .required=${this.required} tabindex=${(this.disabled || this.hasInlineEditContext && !this.inlineEditingEnabledInContext ? -1 : void 0) ?? p} type=text .value=${P(this.displayedValue ?? "")} ${z(this.childNumberRef)}>`);
    return this.interactiveContainer({ disabled: this.disabled, children: s`${this.labelText && X({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${o({
      [n.inputWrapper]: !0,
      [M.rtl]: e === "rtl",
      [n.hasSuffix]: this.suffixText,
      [n.hasPrefix]: this.prefixText,
      [n.clearable]: this.isClearable
    })} ${z(this.inputWrapperRef)}><div class=${o(n.wrapper)}>${this.loading ? i : null}${this.numberButtonType === "horizontal" && !this.readOnly ? u : null}${this.prefixText ? d : null}${this.requestedIcon ? l : null}${f}${this.isClearable ? t : null}${this.suffixText ? h : null}${this.numberButtonType === "horizontal" && !this.readOnly ? b : null}${this.numberButtonType === "vertical" && !this.readOnly ? g : null}</div>${this.selfManagedInlineEdit && s`<div class=${o(n.inlineEdit)}>${ne({ cancelEditingLabel: this.messages.cancelInlineEditing, confirmChangesLabel: this.messages.confirmInlineEditingChanges, enableEditingButtonRef: this.enableInlineEditingButtonRef, enableEditingLabel: this.messages.enableInlineEditing, inlineEditing: this.inlineEditing, loading: this.inlineEditingLoading, onCancelEditing: this.inlineEditCancelEditingHandler, onConfirmChanges: this.inlineEditConfirmChangesHandler, onEnableEditing: () => this.inlineEditManager.enable(), scale: this.scale, showControls: this.inlineEditing && !this.inlineEditControlsDisabled })}</div>` || ""}<div class=${o(n.actionWrapper)} ${z(this.actionWrapperRef)}><slot name=${ce.action}></slot></div></div>${this.validationMessage && this.status === "invalid" ? ae({ icon: this.validationIcon, id: S.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
L("calcite-input-number", he);
export {
  he as InputNumber
};
