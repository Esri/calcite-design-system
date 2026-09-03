/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as E, L, c as f, T as H, l as B, s as l, b as u, A as g, d as W } from "./index.js";
import { e as D, n as m } from "./ref.js";
import { u as M } from "./index2.js";
import { u as U } from "./useFocusTrap.js";
import { l as T, d as s, a as h, b as w, m as N, o as A, i as q } from "./date.js";
import { d as Y, r as _, c as k, e as j, f as K, h as G, F as C } from "./floating-ui.js";
import { n as V } from "./key.js";
import { g as Z } from "./label.js";
import { g as J } from "./component.js";
import { u as Q } from "./useLabel.js";
import { a as X, c as ee, n as y } from "./locale.js";
import { t as te } from "./openCloseComponent.js";
import { g as F, a as O, b as S, c as ae } from "./utils2.js";
import { C as z } from "./ClearButton.js";
import { g as R } from "./guid.js";
import { I as ie } from "./InternalLabel.js";
import { V as ne } from "./Validation.js";
import { u as re } from "./useT9n.js";
import { u as ce } from "./useSetFocus.js";
import { u as le } from "./useInteractive.js";
import { u as oe } from "./useTopLayer.js";
import { u as se } from "./useForm.js";
import { i as de } from "./resources18.js";
const pe = E`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host .menu-container[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}:host .menu-container:popover-open{display:block}:host .menu-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}:host{position:relative;display:inline-block;width:100%;overflow:visible;vertical-align:top;box-shadow:var(--calcite-input-date-picker-shadow, var(--calcite-shadow-none))}:host .menu-container .calcite-floating-ui-anim{box-shadow:var(--calcite-input-date-picker-calendar-shadow, var(--calcite-shadow-md))}:host([scale=s]){--calcite-internal-date-picker-toggle-spacing: var(--calcite-space-2xs);--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-internal-date-picker-toggle-spacing) + var(--calcite-spacing-lg))}:host([scale=s]) .clear-button{block-size:var(--calcite-space-2xl)}:host([scale=m]){--calcite-internal-date-picker-toggle-spacing: var(--calcite-space-sm);--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-internal-date-picker-toggle-spacing) + var(--calcite-spacing-xxl))}:host([scale=m]) .clear-button{block-size:var(--calcite-space-3xl)}:host([scale=l]){--calcite-internal-date-picker-toggle-spacing: var(--calcite-space-sm-plus);--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-internal-date-picker-toggle-spacing) + var(--calcite-spacing-xxxl))}:host([scale=l]) .clear-button{block-size:var(--calcite-space-4xl)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.calendar-wrapper{box-shadow:var(--calcite-input-date-picker-calendar-shadow, var(--calcite-shadow-none));transform:translateZ(0)}.input-container,.input-wrapper{position:relative}.input-wrapper .chevron-icon{color:var(--calcite-input-date-picker-actions-icon-color, var(--calcite-input-date-picker-input-action-icon-color, var(--calcite-color-text-3)))}.input-wrapper:is(:focus-within,:hover) .chevron-icon,.input-wrapper:is(:focus-within,:hover)~.input-wrapper .chevron-icon{color:var(--calcite-input-date-picker-actions-icon-color-hover, var(--calcite-input-date-picker-input-action-icon-color-hover, var(--calcite-color-text-1)))}.input-wrapper:is(:focus-within,:active) .chevron-icon,.input-wrapper:is(:focus-within,:active)~.input-wrapper .chevron-icon{color:var(--calcite-input-date-picker-actions-icon-color-hover, var(--calcite-input-date-picker-input-action-icon-color-press, var(--calcite-color-text-1)))}.horizontal-actions-container{position:absolute;display:flex;align-items:center;inset-inline-end:var(--calcite-border-width-sm);inset-block:var(--calcite-space-none)}.horizontal-actions-container .toggle-icon{position:relative;inset:unset;block-size:100%}.vertical-actions-container{display:flex;align-items:center;border-width:var(--calcite-border-width-sm);border-style:solid;background-color:var(--calcite-input-date-picker-background-color, var(--calcite-color-surface-2));border-color:var(--calcite-input-date-picker-border-color, var(--calcite-color-border-input));padding-inline:var(--calcite-space-md);padding-inline-start:var(--calcite-space-none);border-inline-start-width:var(--calcite-border-width-none)}.vertical-actions-container:hover{cursor:pointer}.vertical-actions-container .toggle-icon{position:relative;inset:unset}.vertical-actions-container .chevron-icon{color:var(--calcite-input-date-picker-actions-icon-color, var(--calcite-input-date-picker-input-action-icon-color, var(--calcite-color-text-3)))}.clear-button{display:flex}.toggle-icon{position:absolute;display:flex;align-items:center;cursor:pointer;inset-inline-end:var(--calcite-space-none);inset-block:var(--calcite-space-none);padding-inline:var(--calcite-internal-date-picker-toggle-spacing);padding-inline-start:var(--calcite-space-none)}:host([range]) .container{display:flex}:host([range]) .input-container{display:flex;flex:1 1 auto}:host([range]) .input-wrapper{flex:1 1 auto}.divider-container{display:flex;align-items:stretch;border-width:1px;border-left-width:0px;border-right-width:0px;border-style:solid;background-color:var(--calcite-input-date-picker-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-input-date-picker-border-color, var(--calcite-color-border-input))}:host([layout=horizontal]) .divider-container{inline-size:var(--calcite-spacing-px)}.divider{display:inline-block;margin-block:var(--calcite-spacing-xxs);background-color:var(--calcite-input-date-picker-divider-color, var(--calcite-color-border-2));inline-size:var(--calcite-spacing-px)}:host([layout=vertical]) .divider-container{height:1px;border-top-width:0px;border-bottom-width:0px;border-inline-start-width:var(--calcite-border-width-sm);border-inline-end-width:var(--calcite-border-width-none);inline-size:calc(100% - var(--calcite-space-md));padding-inline:var(--calcite-space-md)}:host([layout=vertical]) .divider-container .divider{margin-top:0;margin-bottom:0;height:1px;width:100%}:host([range][layout=vertical]) .input-wrapper{width:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}:host([range][layout=vertical]) .vertical-actions-container{padding-inline-end:var(--calcite-space-none)}:host([range][layout=vertical]) .vertical-actions-container .toggle-icon{cursor:default;pointer-events:none}:host([range][layout=vertical]) .vertical-actions-container:not(:has(.clear-button)) .toggle-icon{padding-inline-start:var(--calcite-space-md)}:host([range][layout=vertical]) .clear-button{margin-inline-start:var(--calcite-space-md)}.menu-container{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown);inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.menu-container{opacity:0;inset-block-start:0;left:0}}.menu-container[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}.menu-container:popover-open{display:block}.menu-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.input .calcite-input__wrapper{margin-top:0}:host([range][layout=vertical][scale=s]) .vertical-actions-container{padding-inline-end:var(--calcite-space-none)}:host([range][layout=vertical][scale=s]) .vertical-actions-container:not(:has(.clear-button)) .toggle-icon{padding-inline-start:var(--calcite-space-sm)}:host([range][layout=vertical][scale=s]) .divider-container{inline-size:calc(100% - var(--calcite-space-sm));padding-inline:var(--calcite-space-sm)}:host([range][layout=vertical][scale=s]) .clear-button{margin-inline-start:var(--calcite-space-sm)}:host([range][layout=vertical][scale=l]) .vertical-actions-container{padding-inline-end:var(--calcite-space-none)}:host([range][layout=vertical][scale=l]) .vertical-actions-container:not(:has(.clear-button)) .toggle-icon{padding-inline-start:var(--calcite-space-lg)}:host([range][layout=vertical][scale=l]) .divider-container{inline-size:calc(100% - var(--calcite-space-lg));padding-inline:var(--calcite-space-lg)}:host([range][layout=vertical][scale=l]) .clear-button{margin-inline-start:var(--calcite-space-lg)}:host([range][layout=vertical]) .input-container:has(.input-wrapper:focus-within,.input-wrapper:hover)+.vertical-actions-container .chevron-icon,:host([range][layout=vertical]) .vertical-actions-container:hover .chevron-icon{color:var(--calcite-input-date-picker-actions-icon-color-hover, var(--calcite-input-date-picker-input-action-icon-color-hover, var(--calcite-color-text-1)))}:host([range][layout=vertical]) .input-container:has(.input-wrapper:active)+.vertical-actions-container .chevron-icon,:host([range][layout=vertical]) .vertical-actions-container:active .chevron-icon{color:var(--calcite-input-date-picker-actions-icon-color-hover, var(--calcite-input-date-picker-input-action-icon-color-press, var(--calcite-color-text-1)))}.input{--calcite-input-text-background-color: var(--calcite-input-date-picker-background-color);--calcite-input-text-border-color: var(--calcite-input-date-picker-border-color);--calcite-input-text-corner-radius: var(--calcite-input-date-picker-corner-radius);--calcite-input-text-shadow: var(--calcite-input-date-picker-shadow);--calcite-input-text-icon-color: var(--calcite-input-date-picker-icon-color);--calcite-input-text-text-color: var(--calcite-input-date-picker-text-color);--calcite-input-text-placeholder-text-color: var(--calcite-input-date-picker-placeholder-text-color)}:host([range]) .input--start{--calcite-internal-input-text-input-border-inline-end-width: var(--calcite-border-width-none)}:host([layout=vertical][range]) .input--start{--calcite-internal-input-text-icon-border-block-end-width: var(--calcite-border-width-none);--calcite-internal-input-text-input-border-block-end-width: var(--calcite-border-width-none)}:host([layout=horizontal]) .input--end{--calcite-internal-input-text-icon-border-inline-start-width: var(--calcite-border-width-none)}:host([range][layout=horizontal]) .container:has(.input-wrapper[data-position=end]:focus-within) .input-wrapper[data-position=end]{--calcite-input-date-picker-border-color: var(--calcite-color-brand);outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([range][layout=horizontal]) .container:has(.input-wrapper[data-position=end]:focus-within) .input-wrapper[data-position=start] .input--start{--calcite-internal-input-text-focus-outline-color: transparent}:host([status=invalid][range][layout=horizontal]) .container:has(.input-wrapper[data-position=end]:focus-within) .input-wrapper[data-position=end]{--calcite-input-date-picker-border-color: var(--calcite-color-status-danger);outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([layout=vertical]) .input--end{--calcite-internal-input-text-input-border-inline-end-width: var(--calcite-border-width-none);--calcite-internal-input-text-input-border-block-start-width: var(--calcite-border-width-none);--calcite-internal-input-text-icon-border-block-start-width: var(--calcite-border-width-none)}:host([range][layout=vertical][read-only]) :is(.input--start,.input--end){--calcite-internal-input-text-input-border-inline-end-width: var(--calcite-border-width-sm)}:host([range][layout=vertical][read-only]) .divider-container{box-sizing:border-box;border-inline-end-width:var(--calcite-border-width-sm);inline-size:100%}calcite-date-picker{--calcite-date-picker-border-color: var(--calcite-input-date-picker-calendar-border-color);--calcite-date-picker-corner-radius: var(--calcite-input-date-picker-calendar-corner-radius);--calcite-date-picker-range-calendar-divider-color: var(--calcite-input-date-picker-calendar-range-divider-color);--calcite-date-picker-week-header-text-color: var(--calcite-input-date-picker-calendar-text-color);--calcite-date-picker-header-action-background-color: var( --calcite-input-date-picker-calendar-actions-background-color );--calcite-date-picker-header-action-background-color-hover: var( --calcite-input-date-picker-calendar-actions-background-color-hover );--calcite-date-picker-header-action-background-color-press: var( --calcite-input-date-picker-calendar-actions-background-color-press );--calcite-date-picker-header-action-text-color: var(--calcite-input-date-picker-calendar-actions-text-color);--calcite-date-picker-header-action-text-color-press: var( --calcite-input-date-picker-calendar-actions-text-color-press );--calcite-date-picker-year-text-color: var(--calcite-input-date-picker-calendar-text-color);--calcite-date-picker-month-select-text-color: var(--calcite-input-date-picker-calendar-month-select-text-color);--calcite-date-picker-month-select-icon-color: var(--calcite-input-date-picker-calendar-icon-color);--calcite-date-picker-month-select-icon-color-hover: var(--calcite-input-date-picker-calendar-icon-color-hover);--calcite-date-picker-day-background-color: var(--calcite-input-date-picker-calendar-day-background-color);--calcite-date-picker-day-background-color-hover: var( --calcite-input-date-picker-calendar-day-background-color-hover );--calcite-date-picker-day-background-color-selected: var( --calcite-input-date-picker-calendar-selected-background-color );--calcite-date-picker-day-text-color: var(--calcite-input-date-picker-calendar-day-text-color);--calcite-date-picker-day-text-color-hover: var(--calcite-input-date-picker-calendar-day-text-color-hover);--calcite-date-picker-day-text-color-selected: var(--calcite-input-date-picker-calendar-day-text-color-selected);--calcite-date-picker-current-day-text-color: var( --calcite-input-date-picker-calendar-current-day-text-color, var(--calcite-input-date-picker-calendar-day-current-text-color) );--calcite-date-picker-day-range-text-color: var(--calcite-input-date-picker-calendar-day-range-text-color);--calcite-date-picker-day-range-background-color: var( --calcite-input-date-picker-calendar-day-range-background-color );--calcite-date-picker-day-outside-range-background-color-hover: var( --calcite-input-date-picker-calendar-day-outside-range-background-color-hover );--calcite-date-picker-day-outside-range-text-color-hover: var( --calcite-input-date-picker-calendar-day-outside-range-text-color-hover )}.assistive-text{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}:host([hidden]){display:none}[hidden]{display:none}.clear-button--container{display:flex;cursor:pointer;align-items:center}.clear-button--container:hover calcite-action{--calcite-action-background-color: var(--calcite-input-date-picker-input-action-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color: var(--calcite-input-date-picker-input-action-icon-color-hover, var(--calcite-color-text-1))}.clear-button--container:active calcite-action{--calcite-action-background-color: var(--calcite-input-date-picker-input-action-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color: var(--calcite-input-date-picker-input-action-icon-color-press, var(--calcite-color-text-1))}.clear-button--container calcite-action{--calcite-internal-action-height: 100%;--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-input-date-picker-input-action-background-color, var(--calcite-color-foreground-2));--calcite-action-text-color: var(--calcite-input-date-picker-input-action-icon-color)}.clear-button--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-date-picker-input-action-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color-press: var(--calcite-input-date-picker-input-action-icon-color-hover)}.clear-button--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-date-picker-input-action-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color-press: var(--calcite-input-date-picker-input-action-icon-color-press)}:host([scale=s]) .clear-button--container{padding:var(--calcite-space-2xs)}:host([scale=m]) .clear-button--container{padding:var(--calcite-space-2xs);padding-inline-end:var(--calcite-space-sm)}:host([scale=l]) .clear-button--container{padding-inline-end:var(--calcite-space-sm-plus)}`, n = {
  assistiveText: "assistive-text",
  calendarWrapper: "calendar-wrapper",
  clearButton: "clear-button",
  container: "container",
  dividerContainer: "divider-container",
  divider: "divider",
  endInput: "input--end",
  inputContainer: "input-container",
  horizontalActionsContainer: "horizontal-actions-container",
  inputWrapper: "input-wrapper",
  input: "input",
  menu: "menu-container",
  toggleIcon: "toggle-icon",
  startInput: "input--start",
  verticalActionsContainer: "vertical-actions-container",
  chevronIcon: "chevron-icon"
}, ue = "calcite-input-date-picker", x = {
  validationMessage: "inputDatePickerValidationMessage",
  dialog: (p) => `date-picker-dialog--${p}`,
  placeholder: (p) => `${ue}-placeholder-${p}`
}, P = {
  start: "start",
  end: "end"
}, I = {
  calendar: "calendar",
  chevronDown: "chevron-down",
  chevronUp: "chevron-up"
};
function he(p) {
  if (!p)
    return !1;
  const { year: e } = T(p);
  return Number(e) < 100;
}
function ve(p) {
  const e = (/* @__PURE__ */ new Date()).getFullYear();
  return Math.floor(e / 100) * 100 + p;
}
class ge extends L {
  constructor() {
    super(), this.commonDateSeparators = [".", "-", "/"], this.dialogId = x.dialog(R()), this.direction = M(), this.endInputRef = D(), this.focusOnOpen = !1, this.focusTrap = U({
      triggerProp: "open",
      focusTrapOptions: {
        onActivate: () => {
          this.focusOnOpen && (this.datePickerEl?.setFocus(), this.focusOnOpen = !1);
        },
        allowOutsideClick: !0,
        // Allow outside click and let the popover manager take care of closing the popover.
        clickOutsideDeactivates: !1,
        initialFocus: !1,
        setReturnFocus: !1,
        onDeactivate: () => {
          this.open = !1;
        }
      }
    })(this), this.formSupport = se({
      inputType: "date"
    })(this), this.transitionProp = "opacity", this.placeholderTextId = x.placeholder(R()), this.rangeStartValueChangedByUser = !1, this.startInputRef = D(), this.transitionRef = D(), this.userChangedValue = !1, this._value = "", this.valueAsDateChangedExternally = !1, this.messages = re({ blocking: !0 }), this.focusSetter = ce()(this), this.interactiveContainer = le(this), this.topLayer = oe({
      target: () => this.floatingEl
    })(this), this.focusedInput = "start", this.calendars = 2, this.disabled = !1, this.clearable = !1, this.focusTrapDisabled = !1, this.layout = "horizontal", this.monthStyle = "wide", this.open = !1, this.overlayPositioning = "absolute", this.placement = Y, this.proximitySelectionDisabled = !1, this.range = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.topLayerDisabled = !1, this.calciteInputDatePickerBeforeClose = f({ cancelable: !1 }), this.calciteInputDatePickerBeforeOpen = f({ cancelable: !1 }), this.calciteInputDatePickerChange = f({ cancelable: !1 }), this.calciteInputDatePickerClose = f({ cancelable: !1 }), this.calciteInputDatePickerOpen = f({ cancelable: !1 }), Q(this), this.listen("blur", this.blurHandler), this.listen("keydown", this.keyDownHandler), this.handleDateTimeFormatChange();
  }
  static {
    this.properties = { datePickerActiveDate: 16, focusedInput: 16, localeData: 16, calendars: 11, disabled: 7, clearable: 7, flipPlacements: 0, focusTrapDisabled: 7, form: 3, headingLevel: 11, label: 1, labelText: 1, layout: 3, max: 3, maxAsDate: 0, messageOverrides: 0, min: 3, minAsDate: 0, monthStyle: 1, name: 3, numberingSystem: 3, open: 7, overlayPositioning: 3, placeholder: 1, placement: 3, proximitySelectionDisabled: 5, range: 7, readOnly: 7, required: 7, scale: 3, status: 3, topLayerDisabled: 7, validationIcon: [3, { converter: H }], validationMessage: 1, validity: 32, value: 1, valueAsDate: 0 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = pe;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = e !== this._value, a = e === "" && (this.startInputRef.value?.value !== "" || this.endInputRef.value?.value !== "");
    (t || a) && (this._value = e, this.valueWatcher(e));
  }
  async reposition(e = !1) {
    const { floatingEl: t, referenceEl: a, placement: i, overlayPositioning: c, filteredFlipPlacements: r } = this;
    return _(this, {
      direction: this.direction,
      floatingEl: t,
      referenceEl: a,
      overlayPositioning: c,
      placement: i,
      flipPlacements: r,
      type: "menu"
    }, e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback();
    const { open: e } = this;
    e && this.openHandler(), this.setFilteredPlacements(), k(this);
  }
  async load() {
    this.handleDateTimeFormatChange(), await this.loadLocaleData();
  }
  willUpdate(e) {
    e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledAndReadOnlyChange(this.disabled), e.has("readOnly") && (this.hasUpdated || this.readOnly !== !1) && this.handleDisabledAndReadOnlyChange(this.readOnly), e.has("flipPlacements") && this.flipPlacementsHandler();
    const t = F(e, "min"), a = F(e, "max");
    if (t === "min" ? this.minAsDate = s(this.min) : t === "minAsDate" && (this.minAsDate = s(h(this.minAsDate))), a === "max" ? this.maxAsDate = s(this.max) : a === "maxAsDate" && (this.maxAsDate = s(h(this.maxAsDate))), (t || a) && !Array.isArray(this.valueAsDate)) {
      const i = w(this.valueAsDate, this.minAsDate, this.maxAsDate);
      i !== this.valueAsDate && (this.valueAsDate = i);
    }
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") && this.reposition(!0), (e.has("numberingSystem") || e.has("messages")) && this.handleDateTimeFormatChange(), e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") && this.setReferenceEl(), e.has("valueAsDate") && this.valueAsDateWatcher(this.valueAsDate), e.has("messages") && (this.loadLocaleData(), this.localizeInputValues());
  }
  loaded() {
    this.localizeInputValues(), k(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), j(this);
  }
  handleDisabledAndReadOnlyChange(e) {
    e || (this.open = !1);
  }
  valueWatcher(e) {
    if (!this.userChangedValue) {
      let t;
      try {
        Array.isArray(e) ? t = O(e) : e ? t = s(e) : t = void 0;
      } catch {
        Array.isArray(e) || (this.warnAboutInvalidValue(e), this.value = "");
      }
      !this.valueAsDateChangedExternally && t !== this.valueAsDate && (this.valueAsDate = t), this.localizeInputValues();
    }
    this.userChangedValue = !1;
  }
  valueAsDateWatcher(e) {
    const t = Array.isArray(e) ? [h(e[0]), h(e[1])] : h(e);
    this.value !== t && (this.valueAsDateChangedExternally = !0, this.value = t, this.valueAsDateChangedExternally = !1);
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements(), this.reposition(!0);
  }
  openHandler() {
    this.disabled || this.readOnly || (te(this), this.reposition(!0));
  }
  calciteInternalInputInputHandler(e) {
    const t = e.target, a = t.value, i = this.parseNumerals(a), c = this.formatNumerals(i);
    t.value = c;
    const { year: r } = N(a, this.localeData);
    if (r && r.length < 4)
      return;
    const o = A(a, this.localeData);
    q(o, this.min, this.max) && (this.datePickerActiveDate = o);
  }
  calciteInternalInputBlurHandler() {
    this.commitValue();
  }
  handleDateTimeFormatChange() {
    const e = {
      // we explicitly set numberingSystem to prevent the browser-inferred value
      // @see [Arabic numbering system support context](https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195) for more info.
      numberingSystem: X(this.numberingSystem)
    };
    this.dateTimeFormat = new Intl.DateTimeFormat(ee(S(this.messages._lang)), e);
  }
  setReferenceEl() {
    const { focusedInput: e, layout: t, endWrapper: a, startWrapper: i } = this;
    this.referenceEl = e === "end" || t === "vertical" ? a || i : i || a, requestAnimationFrame(() => k(this));
  }
  onInputWrapperPointerDown() {
    this.currentOpenInput = this.focusedInput;
  }
  onInputWrapperClick(e) {
    if (!e.composedPath().some((a) => a instanceof HTMLElement ? a.classList.contains(n.clearButton) || a.classList.contains(n.toggleIcon) : !1)) {
      const i = e.currentTarget.getAttribute("data-position");
      this.toggleInputOpen(i);
    }
  }
  toggleInputOpen(e) {
    const { range: t, currentOpenInput: a } = this;
    (!t || !this.open || a === e) && (this.open = !this.open);
  }
  toggleSingleOpenClickHandler() {
    this.startInputRef.value?.setFocus(), this.open = !this.open;
  }
  toggleRangeOpenClickHandler(e) {
    const t = e ?? this.focusedInput, a = !this.open || this.focusedInput === t;
    this.focusedInput = t, this.focusInput(), a && (this.open = !this.open);
  }
  onVerticalActionsContainerClick(e) {
    this.disabled || this.readOnly || e.composedPath().some((a) => a instanceof HTMLElement ? a.classList.contains(n.clearButton) : !1) || this.toggleRangeOpenClickHandler();
  }
  clearValue() {
    this.range ? this.setRangeValue([void 0, void 0]) : this.setValue(void 0), this.localizeInputValues();
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? K(t, e) : void 0;
  }
  onLabelClick() {
    this.setFocus();
  }
  onBeforeOpen() {
    this.calciteInputDatePickerBeforeOpen.emit(), this.topLayer.show();
  }
  onOpen() {
    this.focusTrap.activate(), this.calciteInputDatePickerOpen.emit();
  }
  onBeforeClose() {
    this.calciteInputDatePickerBeforeClose.emit();
  }
  onClose() {
    this.calciteInputDatePickerClose.emit(), G(this), this.focusTrap.deactivate(), this.focusOnOpen = !1, this.datePickerEl?.reset(), this.topLayer.hide();
  }
  blurHandler() {
    this.open = !1;
  }
  commitValue() {
    const { focusedInput: e, value: t } = this, a = this.getInputRef(e), i = a.value ? A(a.value?.value, this.localeData) : void 0, c = h(i), r = Array.isArray(t);
    if (this.range) {
      const o = e === "start" ? 0 : 1;
      if (r) {
        if (c === t[o])
          return;
        i ? (this.setRangeValue([
          e === "start" ? i : s(t[0]),
          e === "end" ? i : s(t[1])
        ]), this.localizeInputValues()) : this.setRangeValue([
          e === "end" ? s(t[0]) : void 0,
          e === "start" ? s(t[1]) : void 0
        ]);
      } else
        i && (this.setRangeValue([
          e === "start" ? i : s(t[0]),
          e === "end" ? i : s(t[1])
        ]), this.localizeInputValues());
    } else {
      if (c === t)
        return;
      this.setValue(i), this.localizeInputValues();
    }
  }
  keyDownHandler(e) {
    const { defaultPrevented: t, key: a } = e;
    if (t)
      return;
    const i = e.composedPath().some(de);
    if (a === "Enter") {
      const c = this.value;
      this.commitValue();
      const r = this.shouldFocusRangeEnd(), o = !r && this.shouldFocusRangeStart();
      if (r || o) {
        e.preventDefault(), r ? this.endInputRef.value?.setFocus() : o && this.startInputRef.value?.setFocus();
        return;
      }
      if (this.open)
        this.restoreInputFocus(!0), e.preventDefault();
      else {
        const d = this.formSupport.active;
        (c !== this.value || d) && e.preventDefault(), d && this.formSupport.requestSubmit();
      }
    } else if ((a === "ArrowDown" || a === "ArrowUp") && !i)
      this.open = !0, this.focusOnOpen = !0, e.preventDefault();
    else if (a === "Escape") {
      const c = this.open, r = this.range ? Array.isArray(this.value) && (!!this.value[0] || !!this.value[1]) : !!this.value, o = !this.disabled && !this.readOnly && this.clearable && r;
      o && this.clearValue(), c && (this.open = !1, this.restoreInputFocus(!0)), (c || o) && e.preventDefault();
    }
  }
  startInputFocus() {
    this.focusedInput = "start";
  }
  endInputFocus() {
    this.focusedInput = "end";
  }
  setFloatingEl(e) {
    this.floatingEl = e, k(this);
  }
  setStartWrapper(e) {
    this.startWrapper = e, this.setReferenceEl();
  }
  setEndWrapper(e) {
    this.endWrapper = e, this.setReferenceEl();
  }
  setDatePickerRef(e) {
    this.datePickerEl = e, e && this.focusTrap.overrideFocusTrapEl(e);
  }
  async loadLocaleData() {
    const e = S(this.messages._lang);
    y.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: e,
      useGrouping: !1
    }, this.localeData = await ae(e), this.localizeInputValues();
  }
  handleDateChange(e) {
    this.range || (e.stopPropagation(), this.setValue(e.target.valueAsDate), this.localizeInputValues(), this.restoreInputFocus());
  }
  shouldFocusRangeStart() {
    const e = this.value[0];
    return !!(this.value[1] && !e && this.focusedInput === "end" && this.startInputRef);
  }
  shouldFocusRangeEnd() {
    const e = this.value[0], t = this.value[1];
    return !!(e && !t && this.focusedInput === "start" && this.endInputRef);
  }
  handleDateRangeChange(e) {
    if (!this.range)
      return;
    e.stopPropagation();
    const t = e.target.valueAsDate;
    this.setRangeValue(t), this.localizeInputValues(), this.restoreInputFocus();
  }
  restoreInputFocus(e = !1) {
    if (!this.range) {
      this.startInputRef.value?.setFocus(), this.open = !1;
      return;
    }
    if (e) {
      this.focusInput();
      return;
    }
    this.rangeStartValueChangedByUser = this.focusedInput === "start", this.focusedInput = "end", !(this.shouldFocusRangeStart() || this.rangeStartValueChangedByUser) && (this.proximitySelectionDisabled && Array.isArray(this.valueAsDate) && this.valueAsDate[1] === void 0 || (this.open = !1, this.focusInput()));
  }
  localizeInputValues() {
    const e = w(this.range ? Array.isArray(this.valueAsDate) && this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate), t = this.range ? w(Array.isArray(this.valueAsDate) && this.valueAsDate[1], this.minAsDate, this.maxAsDate) : void 0;
    this.setInputValue((e && this.dateTimeFormat?.format(e)) ?? "", "start"), this.setInputValue(this.range && t && this.dateTimeFormat?.format(t) || "", "end");
  }
  getInputRef(e = "start") {
    return e === "start" ? this.startInputRef : this.endInputRef;
  }
  setInputValue(e, t = "start") {
    const a = this.getInputRef(t);
    a.value && (a.value.value = e);
  }
  setRangeValue(e) {
    if (!this.range)
      return;
    const { value: t } = this, a = Array.isArray(t), i = Array.isArray(e), c = i ? e[0] : void 0;
    let r = i ? h(c) : "";
    r && (r = this.getNormalizedDate(r));
    const o = i ? e[1] : void 0;
    let d = i ? h(o) : "";
    d && (d = this.getNormalizedDate(d));
    const v = r || d ? [r, d] : "";
    if (v === t)
      return;
    this.userChangedValue = !0, this.value = v, this.valueAsDate = v ? O(v) : void 0;
    const b = this.calciteInputDatePickerChange.emit();
    b && b.defaultPrevented && (this.value = t, a ? (this.setInputValue(t[0], "start"), this.setInputValue(t[1], "end")) : (this.value = t, this.setInputValue(t)));
  }
  setValue(e) {
    if (this.range)
      return;
    const t = this.value;
    let a = h(e);
    if (a = this.getNormalizedDate(a), a === t)
      return;
    this.userChangedValue = !0, this.valueAsDate = a ? s(a) : void 0, this.value = a || "", this.calciteInputDatePickerChange.emit().defaultPrevented && (this.value = t, this.setInputValue(t));
  }
  warnAboutInvalidValue(e) {
    B.warn(`The specified value "${e}" does not conform to the required format, "YYYY-MM-DD".`);
  }
  formatNumerals(e) {
    return e ? e.split("").map((t) => this.commonDateSeparators?.includes(t) ? this.localeData?.separator : V?.includes(t) ? y?.numberFormatter?.format(Number(t)) : t).join("") : "";
  }
  parseNumerals(e) {
    return e ? e.split("").map((t) => V.includes(t) ? y.delocalize(t) : t).join("") : "";
  }
  getNormalizedDate(e) {
    if (!e)
      return "";
    if (!he(e))
      return e;
    const { day: t, month: a, year: i } = T(e);
    return `${ve(Number(i))}-${a}-${t}`;
  }
  focusInput() {
    (this.focusedInput === "start" ? this.startInputRef : this.endInputRef).value?.setFocus();
  }
  render() {
    const { disabled: e, messages: { _lang: t }, messages: a, numberingSystem: i, readOnly: c } = this;
    y.numberFormatOptions = {
      numberingSystem: i,
      locale: t,
      useGrouping: !1
    };
    const r = this.range ? Array.isArray(this.value) && !!this.value[0] : !!this.value, o = this.range && Array.isArray(this.value) && !!this.value[1], d = !e && !c, v = this.range && this.clearable && d && (r || o), b = !this.range && this.clearable && d && r, $ = u`<div class=${l(n.clearButton)} @click=${this.clearValue}>${z({ ariaLabel: this.messages.clear, scale: this.scale, title: this.messages.clear })}</div>`;
    return this.interactiveContainer({ disabled: this.disabled, children: u`${this.labelText && ie({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${l(n.container)}><div aria-label=${Z(this) ?? g} .ariaRequired=${this.required} class=${l(n.inputContainer)} role=group><div class=${l(n.inputWrapper)} data-position=${P.start} @click=${this.onInputWrapperClick} @pointerdown=${this.onInputWrapperPointerDown} ${m(this.setStartWrapper)}><calcite-input-text aria-controls=${this.dialogId ?? g} aria-describedby=${this.placeholderTextId ?? g} aria-errormessage=${x.validationMessage} aria-autocomplete=none .ariaExpanded=${this.open} aria-haspopup=dialog .ariaInvalid=${this.status === "invalid"} class=${l({
      [n.input]: !0,
      [n.startInput]: !0
    })} .disabled=${e} .icon=${I.calendar} .label=${this.range ? this.messages.startDate : this.messages.date} @calciteInputTextInput=${this.calciteInternalInputInputHandler} @calciteInternalInputTextBlur=${this.calciteInternalInputBlurHandler} @calciteInternalInputTextFocus=${this.startInputFocus} .placeholder=${this.placeholder || this.localeData?.placeholder} .readOnly=${c} role=combobox .scale=${this.scale} .status=${this.status} ${m(this.startInputRef)}></calcite-input-text><span aria-hidden=true class=${l(n.assistiveText)} id=${this.placeholderTextId ?? g}>${this.placeholder || a.dateFormat.replace("{format}", this.localeData?.placeholder)}</span>${!this.range && !this.readOnly ? u`<div class=${l(n.horizontalActionsContainer)}>${b ? u`<div class=${l(n.clearButton)} @click=${this.clearValue}>${z({ ariaLabel: this.messages.clear, scale: this.scale, title: this.messages.clear })}</div>` : null}${this.renderToggleIcon(this.open && this.focusedInput === "start", this.toggleSingleOpenClickHandler)}</div>` : null}</div><div .ariaHidden=${!this.open} .ariaLabel=${a.chooseDate} aria-live=polite class=${l(n.menu)} id=${this.dialogId ?? g} popover=manual role=dialog ${m(this.setFloatingEl)}><div class=${l({
      [n.calendarWrapper]: !0,
      [C.animation]: !0,
      [C.animationActive]: this.open
    })} ${m(this.transitionRef)}><calcite-date-picker .activeDate=${this.datePickerActiveDate} .activeRange=${this.focusedInput} .calendars=${this.calendars} .headingLevel=${this.headingLevel} .layout=${this.layout} .max=${this.max} .maxAsDate=${this.maxAsDate} .messageOverrides=${this.messageOverrides} .min=${this.min} .minAsDate=${this.minAsDate} .monthStyle=${this.monthStyle} .numberingSystem=${i} @calciteDatePickerChange=${this.handleDateChange} @calciteDatePickerRangeChange=${this.handleDateRangeChange} .proximitySelectionDisabled=${this.proximitySelectionDisabled} .range=${this.range} .scale=${this.scale} tabindex=${(this.open ? void 0 : -1) ?? g} .valueAsDate=${this.valueAsDate} ${m(this.setDatePickerRef)}></calcite-date-picker></div></div>${this.range && u`<div class=${l(n.dividerContainer)}><div class=${l(n.divider)}></div></div>` || ""}${this.range && u`<div class=${l(n.inputWrapper)} data-position=${P.end} @click=${this.onInputWrapperClick} @pointerdown=${this.onInputWrapperPointerDown} ${m(this.setEndWrapper)}><calcite-input-text aria-controls=${this.dialogId ?? g} aria-autocomplete=none .ariaExpanded=${this.open} aria-haspopup=dialog class=${l({
      [n.input]: !0,
      [n.endInput]: !0
    })} .disabled=${e} .icon=${I.calendar} .label=${this.messages.endDate} @calciteInputTextInput=${this.calciteInternalInputInputHandler} @calciteInternalInputTextBlur=${this.calciteInternalInputBlurHandler} @calciteInternalInputTextFocus=${this.endInputFocus} .placeholder=${this.placeholder || this.localeData?.placeholder} .readOnly=${c} role=combobox .scale=${this.scale} .status=${this.status} ${m(this.endInputRef)}></calcite-input-text>${this.layout === "horizontal" && !this.readOnly ? u`<div class=${l(n.horizontalActionsContainer)}>${v ? $ : null}${this.renderToggleIcon(this.open, () => this.toggleRangeOpenClickHandler("end"))}</div>` : null}</div>` || ""}</div>${this.range && this.layout === "vertical" && !this.readOnly ? u`<div class=${l(n.verticalActionsContainer)} @click=${this.onVerticalActionsContainerClick}>${v ? $ : null}${this.renderToggleIcon(this.open, () => this.toggleRangeOpenClickHandler())}</div>` : null}</div>${this.validationMessage && this.status === "invalid" ? ne({ icon: this.validationIcon, id: x.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderToggleIcon(e, t) {
    return u`<span class=${l(n.toggleIcon)} @click=${t} tabindex=-1><calcite-icon class=${l(n.chevronIcon)} .icon=${e ? I.chevronUp : I.chevronDown} .scale=${J(this.scale)}></calcite-icon></span>`;
  }
}
W("calcite-input-date-picker", ge);
export {
  ge as InputDatePicker
};
