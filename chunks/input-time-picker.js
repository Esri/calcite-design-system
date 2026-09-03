/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as N, L as K, c as u, T as j, A as t, s as c, b as r, d as _ } from "./index.js";
import { e as l, n as s } from "./ref.js";
import { u as G } from "./index2.js";
import { g as J } from "./label.js";
import { u as Q } from "./useLabel.js";
import { d as h } from "./math.js";
import { g as W } from "./component.js";
import { C as X } from "./ClearButton.js";
import { I as Y } from "./InternalLabel.js";
import { V as Z } from "./Validation.js";
import { u as ee } from "./useT9n.js";
import { i as m } from "./locale.js";
import { u as ie } from "./useSetFocus.js";
import { u as te } from "./useTime.js";
import { u as ae } from "./useInteractive.js";
import { u as ce } from "./useForm.js";
const ne = N`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-time-picker{--calcite-time-picker-color: var(--calcite-input-time-picker-digit-text-color);--calcite-time-picker-icon-color: var(--calcite-input-time-picker-digit-icon-color);--calcite-time-picker-border-color: var(--calcite-input-time-picker-border-color);--calcite-time-picker-button-background-color-hover: var(--calcite-input-time-picker-action-background-color-hover);--calcite-time-picker-button-background-color-press: var(--calcite-input-time-picker-action-background-color-press);--calcite-time-picker-input-border-color-hover: var(--calcite-input-time-picker-digit-border-color-hover);--calcite-time-picker-input-border-color-press: var(--calcite-input-time-picker-digit-border-color-press)}.container{--calcite-icon-color: var( --calcite-input-time-picker-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-text-3)) );align-items:center;background-color:var(--calcite-input-time-picker-input-background-color, var(--calcite-color-foreground-1));border:1px solid var(--calcite-input-time-picker-input-border-color, var(--calcite-color-border-input));border-radius:var(--calcite-input-time-picker-input-corner-radius, var(--calcite-corner-radius));box-shadow:var(--calcite-input-time-picker-input-shadow, var(--calcite-shadow-none));box-sizing:border-box;display:flex;color:var(--calcite-input-time-picker-input-text-color, var(--calcite-color-text-1));flex-wrap:nowrap;font-weight:var(--calcite-font-weight-normal);inline-size:100%;padding-block:var(--calcite-spacing-base);-webkit-user-select:none;user-select:none}.container:focus-within{border-color:var(--calcite-color-brand);outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container.read-only{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}.content-container{display:grid;flex-grow:1;justify-content:start}.content-container .input-container,.content-container .placeholder{grid-column:1;grid-row:1}.content-container .input-container--hidden{opacity:0}.clock-icon{--calcite-icon-color: var( --calcite-input-time-picker-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-text-3)) )}.hour-suffix,.minute-suffix,.second-suffix{white-space:pre}.placeholder{color:var(--calcite-color-text-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.input-container{display:flex;flex-grow:1}.input{align-items:center;display:flex;block-size:100%;justify-content:center;min-inline-size:max-content}.input.empty{inline-size:var(--calcite-spacing-xl)}.input:focus,.input:hover:focus{background-color:Highlight;color:HighlightText;outline:2px solid transparent;outline-offset:2px}.clear-button{display:flex;margin-inline-end:calc(var(--calcite-internal-input-time-picker-end-gap) * -1)}.toggle-icon{--calcite-icon-color: var( --calcite-input-time-picker-icon-color, var(--calcite-input-time-picker-input-action-icon-color, var(--calcite-color-text-3)) );align-items:center;block-size:100%;cursor:pointer;display:flex;justify-content:center;margin-inline-end:calc(var(--calcite-internal-input-time-picker-toggle-inline-end-offset) * -1);padding-inline:var(--calcite-internal-input-time-picker-toggle-spacing);padding-inline-start:var(--calcite-space-none)}.toggle-icon:hover{--calcite-icon-color: var( --calcite-input-time-picker-icon-color-hover, var(--calcite-input-time-picker-input-action-icon-color-hover, var(--calcite-color-text-1)) )}.toggle-icon:active{--calcite-icon-color: var( --calcite-input-time-picker-icon-color-hover, var(--calcite-input-time-picker-input-action-icon-color-press, var(--calcite-color-text-1)) )}:host([scale=s]){--calcite-internal-input-time-picker-end-gap: var(--calcite-space-sm);--calcite-internal-input-time-picker-toggle-spacing: var(--calcite-space-2xs);--calcite-internal-input-time-picker-toggle-inline-end-offset: var(--calcite-space-2xs)}:host([scale=s]) .container{block-size:1.5rem;font-size:var(--calcite-font-size-sm);gap:var(--calcite-spacing-sm);padding-inline-start:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s]) .input-container,:host([scale=s]) .placeholder{line-height:1rem}:host([scale=m]){--calcite-internal-input-time-picker-end-gap: var(--calcite-space-md);--calcite-internal-input-time-picker-toggle-spacing: var(--calcite-space-sm);--calcite-internal-input-time-picker-toggle-inline-end-offset: var(--calcite-space-sm)}:host([scale=m]) .container{block-size:2rem;font-size:var(--calcite-font-size);gap:var(--calcite-spacing-md);padding-inline-start:var(--calcite-spacing-md);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .input-container,:host([scale=m]) .placeholder{line-height:1.5rem}:host([scale=m]) .clear-button{block-size:var(--calcite-space-3xl)}:host([scale=l]){--calcite-internal-input-time-picker-end-gap: var(--calcite-space-lg);--calcite-internal-input-time-picker-toggle-spacing: var(--calcite-space-sm-plus);--calcite-internal-input-time-picker-toggle-inline-end-offset: var(--calcite-space-lg)}:host([scale=l]) .container{block-size:2.75rem;font-size:var(--calcite-font-size-md);gap:var(--calcite-spacing-lg);padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .input-container,:host([scale=l]) .placeholder{line-height:2.25rem}:host([scale=l]) .clear-button{block-size:var(--calcite-space-4xl)}:host([status=invalid]) .container{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) .container:focus-within{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}calcite-time-picker{--calcite-time-picker-background-color: var(--calcite-input-time-picker-background-color);--calcite-time-picker-border-color: var(--calcite-input-time-picker-border-color, transparent);--calcite-time-picker-corner-radius: var(--calcite-input-time-picker-corner-radius, var(--calcite-corner-radius))}calcite-popover{--calcite-popover-corner-radius: var(--calcite-input-time-picker-corner-radius, var(--calcite-corner-radius-round))}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}.clear-button--container{display:flex;cursor:pointer;align-items:center}.clear-button--container:hover calcite-action{--calcite-action-background-color: var(--calcite-input-time-picker-input-action-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color: var(--calcite-input-time-picker-input-action-icon-color-hover, var(--calcite-color-text-1))}.clear-button--container:active calcite-action{--calcite-action-background-color: var(--calcite-input-time-picker-input-action-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color: var(--calcite-input-time-picker-input-action-icon-color-press, var(--calcite-color-text-1))}.clear-button--container calcite-action{--calcite-internal-action-height: 100%;--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-input-time-picker-input-action-background-color, var(--calcite-color-foreground-2));--calcite-action-text-color: var(--calcite-input-time-picker-input-action-icon-color)}.clear-button--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-input-time-picker-input-action-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color-press: var(--calcite-input-time-picker-input-action-icon-color-hover)}.clear-button--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-input-time-picker-input-action-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color-press: var(--calcite-input-time-picker-input-action-icon-color-press)}:host([scale=s]) .clear-button--container{padding:var(--calcite-space-2xs)}:host([scale=m]) .clear-button--container{padding:var(--calcite-space-2xs);padding-inline-end:var(--calcite-space-sm)}:host([scale=l]) .clear-button--container{padding-inline-end:var(--calcite-space-sm-plus)}.clear-button--container calcite-action{--calcite-icon-color: currentColor}`, i = {
  clearButton: "clear-button",
  clockIcon: "clock-icon",
  container: "container",
  contentContainer: "content-container",
  decimalSeparator: "decimal-separator",
  empty: "empty",
  fractionalSecond: "fractional-second",
  hour: "hour",
  hourSuffix: "hour-suffix",
  input: "input",
  inputContainer: "input-container",
  inputContainerHidden: "input-container--hidden",
  meridiem: "meridiem",
  minute: "minute",
  minuteSuffix: "minute-suffix",
  placeholder: "placeholder",
  readOnly: "read-only",
  second: "second",
  secondSuffix: "second-suffix",
  toggleIcon: "toggle-icon"
}, v = {
  inputContainer: "inputContainer",
  validationMessage: "inputTimePickerValidationMessage"
}, y = {
  clock: "clock",
  chevronUp: "chevron-up",
  chevronDown: "chevron-down"
};
class oe extends K {
  constructor() {
    super(), this.messages = ee(), this.containerRef = l(), this.direction = G(), this.focusSetter = ie()(this), this.formSupport = ce({
      inputType: "time"
    })(this), this.fractionalSecondRef = l(), this.hourRef = l(), this.meridiemRef = l(), this.minuteRef = l(), this.secondRef = l(), this.time = te(this), this.interactiveContainer = ae(this), this.timePickerRef = l(), this.hasFocus = !1, this.clearable = !1, this.disabled = !1, this.focusTrapDisabled = !1, this.hourFormat = "user", this.open = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.step = 60, this.calciteInputTimePickerBeforeClose = u({ cancelable: !1 }), this.calciteInputTimePickerBeforeOpen = u({ cancelable: !1 }), this.calciteInputTimePickerChange = u(), this.calciteInputTimePickerClose = u({ cancelable: !1 }), this.calciteInputTimePickerOpen = u({ cancelable: !1 }), Q(this), this.listen("blur", this.blurHandler), this.listen("focus", this.focusHandler), this.listen("focusout", this.focusOutHandler), this.listen("keydown", this.keyDownHandler), this.listen("calciteTimeChange", this.timeChangeHandler);
  }
  static {
    this.properties = { hasFocus: 16, clearable: 7, disabled: 7, focusTrapDisabled: 7, form: 3, hourFormat: 3, label: 1, labelText: 1, max: 3, messageOverrides: 0, min: 3, name: 1, numberingSystem: 3, open: 7, overlayPositioning: 1, placeholder: 1, placement: 3, readOnly: 7, required: 7, scale: 3, status: 3, step: 11, validationIcon: [3, { converter: j }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = ne;
  }
  get showPlaceholder() {
    return (this.placeholder && !this.hasFocus && !this.time.hasValue) ?? !1;
  }
  async reposition(e = !1) {
    this.popoverEl?.reposition(e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && (this.disabled || (this.open = !1)), e.has("readOnly") && (this.hasUpdated || this.readOnly !== !1) && (this.readOnly || (this.open = !1)), e.has("value") && (this.hasUpdated ? (this.time.userChangedValue || (this.previousEmittedValue = this.value), this.time.setValue(this.value), this.requestTimePickerUpdate()) : this.previousEmittedValue = this.value);
  }
  blurHandler() {
    this.changeEventHandler();
  }
  focusHandler() {
    this.hasFocus = !0;
  }
  focusOutHandler() {
    this.hasFocus = !1;
  }
  changeEventHandler() {
    const { previousEmittedValue: e, value: n } = this;
    e !== n && (this.calciteInputTimePickerChange.emit().defaultPrevented ? this.time.setValue(this.previousEmittedValue ?? null) : this.previousEmittedValue = n);
  }
  keyDownHandler(e) {
    const { defaultPrevented: n, key: a } = e, { hourFormat: o, meridiemOrder: p } = this.time;
    if (!n)
      if (a === "Enter")
        this.formSupport.active && (this.formSupport.requestSubmit(), e.preventDefault()), this.changeEventHandler();
      else if (this.open && a === "Escape")
        this.open = !1, e.preventDefault();
      else if (!this.disabled && !this.readOnly && this.clearable && this.value && a === "Escape")
        this.clearValue(), e.preventDefault();
      else {
        const f = h(this.step) > 0, g = this.step < 60;
        switch (this.activeEl) {
          case this.hourRef.value:
            a === "ArrowRight" ? this.setFocusPart("minute") : a === "ArrowLeft" && o === "12" && p === 0 && this.setFocusPart("meridiem");
            break;
          case this.minuteRef.value:
            switch (a) {
              case "ArrowLeft":
                this.setFocusPart("hour");
                break;
              case "ArrowRight":
                this.step !== 60 ? this.setFocusPart("second") : o === "12" && this.setFocusPart("meridiem");
                break;
            }
            break;
          case this.secondRef.value:
            switch (a) {
              case "ArrowLeft":
                this.setFocusPart("minute");
                break;
              case "ArrowRight":
                h(this.step) > 0 ? this.setFocusPart("fractionalSecond") : o === "12" && this.setFocusPart("meridiem");
                break;
            }
            break;
          case this.fractionalSecondRef.value:
            switch (a) {
              case "ArrowLeft":
                this.setFocusPart("second");
                break;
              case "ArrowRight":
                o === "12" && p !== 0 && this.setFocusPart("meridiem");
                break;
            }
            break;
          case this.meridiemRef.value:
            a === "ArrowLeft" && p !== 0 ? f ? this.setFocusPart("fractionalSecond") : g ? this.setFocusPart("second") : this.setFocusPart("minute") : a === "ArrowRight" && p === 0 && this.setFocusPart("hour");
            break;
        }
      }
  }
  mouseDownHandler(e) {
    this.showPlaceholder && (e.preventDefault(), this.setFocus());
  }
  onLabelClick() {
    this.setFocus();
  }
  openHandler() {
    this.disabled || this.readOnly || this.popoverEl && (this.popoverEl.open = this.open);
  }
  popoverBeforeOpenHandler(e) {
    e.stopPropagation(), this.calciteInputTimePickerBeforeOpen.emit();
  }
  popoverOpenHandler(e) {
    e.stopPropagation(), this.calciteInputTimePickerOpen.emit();
  }
  popoverBeforeCloseHandler(e) {
    e.stopPropagation(), this.calciteInputTimePickerBeforeClose.emit();
  }
  popoverCloseHandler(e) {
    e.stopPropagation(), this.calciteInputTimePickerClose.emit(), this.open = !1;
  }
  requestTimePickerUpdate() {
    this.timePickerRef.value?.manager?.component.requestUpdate();
  }
  setCalcitePopoverEl(e) {
    this.popoverEl = e, this.openHandler();
  }
  async setFocusPart(e) {
    (e === "hour" ? this.hourRef : e === "minute" ? this.minuteRef : e === "second" ? this.secondRef : e === "fractionalSecond" ? this.fractionalSecondRef : this.meridiemRef).value?.focus();
  }
  timeChangeHandler(e) {
    if (e.stopPropagation(), this.disabled)
      return;
    const n = e.detail;
    n !== this.value ? this.value = n : this.requestTimePickerUpdate();
  }
  timePartFocusHandler(e) {
    this.activeEl = e.currentTarget;
  }
  timePickerChangeHandler(e) {
    e.stopPropagation();
  }
  toggleIconClickHandler() {
    this.open = !this.open;
  }
  clearValue() {
    this.time.setValue(null, !0), this.open = !1, this.changeEventHandler();
  }
  render() {
    const { messages: e, readOnly: n, scale: a } = this, { fractionalSecond: o, handleHourKeyDownEvent: p, handleMinuteKeyDownEvent: f, handleSecondKeyDownEvent: g, handleFractionalSecondKeyDownEvent: O, hour: b, hourFormat: R, localizedDecimalSeparator: z, localizedFractionalSecond: k, localizedHour: P, localizedHourSuffix: E, localizedMinute: S, localizedMinuteSuffix: D, localizedSecond: H, localizedSecondSuffix: C, meridiemOrder: V, minute: $, second: x } = this.time, w = "--", M = m(o), q = m(b), B = m($), L = m(x), F = h(this.step) > 0, I = R === "12", A = this.step < 60, T = V === 0 || this.direction === "rtl", d = !this.disabled && !this.readOnly, U = this.clearable && !!this.value && d;
    return this.interactiveContainer({ disabled: this.disabled, children: r`${this.labelText && Y({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div aria-controls=${v.inputContainer} aria-labelledby=${v.inputContainer} class=${c({
      [i.container]: !0,
      [i.readOnly]: n
    })} role=combobox ${s(this.containerRef)}><calcite-icon class=${c(i.clockIcon)} .icon=${y.clock} .scale=${a === "l" ? "m" : "s"}></calcite-icon><div class=${c(i.contentContainer)}>${this.showPlaceholder && r`<div class=${c(i.placeholder)}>${this.placeholder}</div>` || ""}<div aria-label=${J(this) ?? t} .ariaRequired=${this.required} class=${c({
      [i.inputContainer]: !0,
      [i.inputContainerHidden]: this.showPlaceholder
    })} dir=ltr id=${v.inputContainer} role=group>${I && T && this.renderMeridiem() || ""}<span aria-label=${this.messages.hour ?? t} aria-valuemax=23 aria-valuemin=1 aria-valuenow=${(q && parseInt(b, 10) || "0") ?? t} aria-valuetext=${b ?? t} class=${c({
      [i.empty]: !P,
      [i.hour]: !0,
      [i.input]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${d ? p : void 0} @mousedown=${this.mouseDownHandler} role=spinbutton tabindex=0 ${s(this.hourRef)}>${P || w}</span><span class=${c(i.hourSuffix)}>${E}</span><span aria-label=${this.messages.minute ?? t} aria-valuemax=12 aria-valuemin=1 aria-valuenow=${(B && parseInt($, 10) || "0") ?? t} aria-valuetext=${$ ?? t} class=${c({
      [i.empty]: !S,
      [i.input]: !0,
      [i.minute]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${d ? f : void 0} @mousedown=${this.mouseDownHandler} role=spinbutton tabindex=0 ${s(this.minuteRef)}>${S || w}</span><span class=${c(i.minuteSuffix)}>${D}</span>${A && r`<span aria-label=${this.messages.second ?? t} aria-valuemax=59 aria-valuemin=0 aria-valuenow=${(L && parseInt(x, 10) || "0") ?? t} aria-valuetext=${x ?? t} class=${c({
      [i.empty]: !H,
      [i.input]: !0,
      [i.second]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${d ? g : void 0} @mousedown=${this.mouseDownHandler} role=spinbutton tabindex=0 ${s(this.secondRef)}>${H || w}</span>` || ""}${F && r`<span class=${c(i.decimalSeparator)}>${z}</span>` || ""}${F && r`<span aria-label=${this.messages.fractionalSecond ?? t} aria-valuemax=999 aria-valuemin=1 aria-valuenow=${(M && parseInt(o, 10) || "0") ?? t} aria-valuetext=${k ?? t} class=${c({
      [i.empty]: !k,
      [i.fractionalSecond]: !0,
      [i.input]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${d ? O : void 0} @mousedown=${this.mouseDownHandler} role=spinbutton tabindex=0 ${s(this.fractionalSecondRef)}>${k || "".padStart(h(this.step), "-")}</span>` || ""}${C && r`<span class=${c(i.secondSuffix)}>${C}</span>` || ""}${I && !T && this.renderMeridiem() || ""}</div></div>${U && r`<div class=${c(i.clearButton)} @click=${this.clearValue}>${X({ ariaLabel: this.messages.clear, scale: this.scale, title: this.messages.clear })}</div>` || ""}${!this.readOnly && this.renderToggleIcon(this.open) || ""}</div><calcite-popover auto-close .focusTrapDisabled=${this.focusTrapDisabled} .focusTrapOptions=${{ initialFocus: !1 }} .label=${e.chooseTime} lang=${this.messages._lang ?? t} offset-distance=0 @calcitePopoverBeforeClose=${this.popoverBeforeCloseHandler} @calcitePopoverBeforeOpen=${this.popoverBeforeOpenHandler} @calcitePopoverClose=${this.popoverCloseHandler} @calcitePopoverOpen=${this.popoverOpenHandler} .overlayPositioning=${this.overlayPositioning} .placement=${this.placement} pointer-disabled .referenceElement=${this.containerRef.value} trigger-disabled ${s(this.setCalcitePopoverEl)}><calcite-time-picker .hourFormat=${this.time.hourFormat ?? void 0} lang=${this.messages._lang ?? t} .messageOverrides=${this.messageOverrides} .numberingSystem=${this.numberingSystem} @calciteTimePickerChange=${this.timePickerChangeHandler} .scale=${this.scale} .step=${this.step} tabindex=${(this.open ? void 0 : -1) ?? t} .time=${this.time} .value=${this.value} ${s(this.timePickerRef)}></calcite-time-picker></calcite-popover>${this.validationMessage && this.status === "invalid" ? Z({ icon: this.validationIcon, id: v.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderMeridiem() {
    const { handleMeridiemKeyDownEvent: e, localizedMeridiem: n, meridiem: a } = this.time, o = !this.disabled && !this.readOnly;
    return r`<span aria-label=${this.messages.meridiem ?? t} aria-valuemax=2 aria-valuemin=1 aria-valuenow=${a === "PM" && "2" || "1"} aria-valuetext=${a ?? t} class=${c({
      [i.empty]: !n,
      [i.input]: !0,
      [i.meridiem]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${o ? e : void 0} @mousedown=${this.mouseDownHandler} role=spinbutton tabindex=0 ${s(this.meridiemRef)}>${n || "--"}</span>`;
  }
  renderToggleIcon(e) {
    return r`<span class=${c(i.toggleIcon)} @click=${this.toggleIconClickHandler}><calcite-icon .icon=${e ? y.chevronUp : y.chevronDown} .scale=${W(this.scale)}></calcite-icon></span>`;
  }
}
_("calcite-input-time-picker", oe);
export {
  oe as InputTimePicker
};
