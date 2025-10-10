import { b as R, L as U, c as d, u as N, s, E as a, x as c, q as K } from "./index.js";
import { e as j, n as l } from "./ref.js";
import { c as _, d as G, s as J, H as Q } from "./form.js";
import { u as W, I as X } from "./interactive.js";
import { c as Y, d as Z, g as ee } from "./label.js";
import { d as u } from "./math.js";
import { g as ie } from "./component.js";
import { I as te } from "./InternalLabel.js";
import { V as ae } from "./Validation.js";
import { a as se } from "./dom.js";
import { s as ne } from "./input.js";
import { u as re } from "./useT9n.js";
import { i as m } from "./locale.js";
import { u as oe } from "./useSetFocus.js";
import { u as ce } from "./useTime.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const le = R`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}calcite-time-picker{--calcite-time-picker-color: var(--calcite-input-time-picker-digit-text-color);--calcite-time-picker-icon-color: var(--calcite-input-time-picker-digit-icon-color);--calcite-time-picker-border-color: var(--calcite-input-time-picker-border-color);--calcite-time-picker-button-background-color-hover: var(--calcite-input-time-picker-action-background-color-hover);--calcite-time-picker-button-background-color-press: var(--calcite-input-time-picker-action-background-color-press);--calcite-time-picker-input-border-color-hover: var(--calcite-input-time-picker-digit-border-color-hover);--calcite-time-picker-input-border-color-press: var(--calcite-input-time-picker-digit-border-color-press)}.container{--calcite-icon-color: var(--calcite-input-time-picker-icon-color, var(--calcite-color-text-3));align-items:center;background-color:var(--calcite-input-time-picker-input-background-color, var(--calcite-color-foreground-1));border:1px solid var(--calcite-input-time-picker-input-border-color, var(--calcite-color-border-input));border-radius:var(--calcite-input-time-picker-input-corner-radius, var(--calcite-corner-radius-none));box-shadow:var(--calcite-input-time-picker-input-shadow, var(--calcite-shadow-none));box-sizing:border-box;display:flex;color:var(--calcite-input-time-picker-input-text-color, var(--calcite-color-text-1));flex-wrap:nowrap;font-weight:var(--calcite-font-weight-normal);inline-size:100%;padding-block:var(--calcite-spacing-base);-webkit-user-select:none;user-select:none}.container:focus-within{border-color:var(--calcite-color-brand);outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container.read-only{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}.input-container{display:flex;flex-grow:1}.input{align-items:center;display:flex;block-size:100%;justify-content:center;min-inline-size:max-content}.input.empty{inline-size:var(--calcite-spacing-xl)}.input:focus,.input:hover:focus{background-color:Highlight;color:HighlightText;outline:2px solid transparent;outline-offset:2px}.toggle-icon{align-items:center;block-size:24px;cursor:pointer;display:flex;inline-size:24px;justify-content:center}.toggle-icon:hover{--calcite-icon-color: var(--calcite-input-time-picker-icon-color-hover)}.meridiem--start{margin-inline-end:var(--calcite-spacing-xxs)}.meridiem--end{margin-inline-start:var(--calcite-spacing-xxs)}:host([scale=s]) .container{block-size:1.5rem;font-size:var(--calcite-font-size-sm);gap:var(--calcite-spacing-sm);padding-inline-start:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s]) .input-container{line-height:1rem}:host([scale=m]) .container{block-size:2rem;font-size:var(--calcite-font-size);gap:var(--calcite-spacing-md);padding-inline-start:var(--calcite-spacing-md);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .input-container{line-height:1.5rem}:host([scale=l]) .container{block-size:2.75rem;font-size:var(--calcite-font-size-md);gap:var(--calcite-spacing-lg);padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .input-container{line-height:2.25rem}:host([status=invalid]) .container{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) .container:focus-within{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}calcite-time-picker{--calcite-time-picker-background-color: var(--calcite-input-time-picker-background-color);--calcite-time-picker-border-color: var(--calcite-input-time-picker-border-color, transparent);--calcite-time-picker-corner-radius: var( --calcite-input-time-picker-corner-radius, var(--calcite-corner-radius-round) )}calcite-popover{--calcite-popover-corner-radius: var(--calcite-input-time-picker-corner-radius, var(--calcite-corner-radius-round))}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`, i = {
  clockIcon: "clock-icon",
  container: "container",
  decimalSeparator: "decimal-separator",
  empty: "empty",
  fractionalSecond: "fractional-second",
  hour: "hour",
  hourSuffix: "hour-suffix",
  input: "input",
  inputContainer: "input-container",
  meridiem: "meridiem",
  meridiemStart: "meridiem--start",
  meridiemEnd: "meridiem--end",
  minute: "minute",
  minuteSuffix: "minute-suffix",
  readOnly: "read-only",
  second: "second",
  secondSuffix: "second-suffix",
  toggleIcon: "toggle-icon"
}, h = {
  inputContainer: "inputContainer",
  validationMessage: "inputTimePickerValidationMessage"
}, y = {
  clock: "clock",
  chevronUp: "chevron-up",
  chevronDown: "chevron-down"
};
class de extends U {
  constructor() {
    super(), this.messages = re(), this.containerRef = j(), this.focusSetter = oe()(this), this.time = ce(this), this.disabled = !1, this.focusTrapDisabled = !1, this.hourFormat = "user", this.open = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.step = 60, this.validity = {
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
    }, this.calciteInputTimePickerBeforeClose = d({ cancelable: !1 }), this.calciteInputTimePickerBeforeOpen = d({ cancelable: !1 }), this.calciteInputTimePickerChange = d(), this.calciteInputTimePickerClose = d({ cancelable: !1 }), this.calciteInputTimePickerOpen = d({ cancelable: !1 }), this.listen("blur", this.blurHandler), this.listen("keydown", this.keyDownHandler), this.listen("calciteTimeChange", this.timeChangeHandler);
  }
  static {
    this.properties = { disabled: 7, focusTrapDisabled: 7, form: 3, hourFormat: 3, label: 1, labelText: 1, max: 3, messageOverrides: 0, min: 3, name: 1, numberingSystem: 3, open: 7, overlayPositioning: 1, placement: 3, readOnly: 7, required: 7, scale: 3, status: 3, step: 11, validationIcon: [3, { converter: N, type: String }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = le;
  }
  async reposition(e = !1) {
    this.popoverEl?.reposition(e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback(), Y(this), _(this);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && (this.disabled || (this.open = !1)), e.has("readOnly") && (this.hasUpdated || this.readOnly !== !1) && (this.readOnly || (this.open = !1)), e.has("value") && (this.hasUpdated ? (this.time.userChangedValue || (this.previousEmittedValue = this.value), this.time.setValue(this.value)) : this.previousEmittedValue = this.value);
  }
  updated() {
    W(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Z(this), G(this);
  }
  blurHandler() {
    this.changeEventHandler();
  }
  changeEventHandler() {
    const { previousEmittedValue: e, value: n } = this;
    e !== n && (this.calciteInputTimePickerChange.emit().defaultPrevented ? this.time.setValue(this.previousEmittedValue) : this.previousEmittedValue = n);
  }
  keyDownHandler(e) {
    const { defaultPrevented: n, key: t } = e, { hourFormat: r, meridiemOrder: o } = this.time;
    if (!n)
      if (t === "Enter")
        J(this) && e.preventDefault(), this.changeEventHandler();
      else if (this.open && this.focusTrapDisabled && t === "Escape")
        this.open = !1, e.preventDefault();
      else {
        const f = u(this.step) > 0, v = this.step < 60;
        switch (this.activeEl) {
          case this.hourEl:
            t === "ArrowRight" ? this.setFocusPart("minute") : t === "ArrowLeft" && r === "12" && o === 0 && this.setFocusPart("meridiem");
            break;
          case this.minuteEl:
            switch (t) {
              case "ArrowLeft":
                this.setFocusPart("hour");
                break;
              case "ArrowRight":
                this.step !== 60 ? this.setFocusPart("second") : r === "12" && this.setFocusPart("meridiem");
                break;
            }
            break;
          case this.secondEl:
            switch (t) {
              case "ArrowLeft":
                this.setFocusPart("minute");
                break;
              case "ArrowRight":
                u(this.step) > 0 ? this.setFocusPart("fractionalSecond") : r === "12" && this.setFocusPart("meridiem");
                break;
            }
            break;
          case this.fractionalSecondEl:
            switch (t) {
              case "ArrowLeft":
                this.setFocusPart("second");
                break;
              case "ArrowRight":
                r === "12" && o !== 0 && this.setFocusPart("meridiem");
                break;
            }
            break;
          case this.meridiemEl:
            t === "ArrowLeft" && o !== 0 ? f ? this.setFocusPart("fractionalSecond") : v ? this.setFocusPart("second") : this.setFocusPart("minute") : t === "ArrowRight" && o === 0 && this.setFocusPart("hour");
            break;
        }
      }
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
  setCalcitePopoverEl(e) {
    this.popoverEl = e, this.openHandler();
  }
  async setFocusPart(e) {
    this[`${e || "hour"}El`]?.focus();
  }
  setFractionalSecondEl(e) {
    this.fractionalSecondEl = e;
  }
  setHourEl(e) {
    this.hourEl = e;
  }
  setMinuteEl(e) {
    this.minuteEl = e;
  }
  setSecondEl(e) {
    this.secondEl = e;
  }
  setMeridiemEl(e) {
    this.meridiemEl = e;
  }
  syncHiddenFormInput(e) {
    ne("time", this, e);
  }
  timeChangeHandler(e) {
    if (e.stopPropagation(), this.disabled)
      return;
    const n = e.detail;
    n !== this.value && (this.value = n);
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
  render() {
    const { messages: e, readOnly: n, scale: t } = this, { fractionalSecond: r, handleHourKeyDownEvent: o, handleMinuteKeyDownEvent: f, handleSecondKeyDownEvent: v, handleFractionalSecondKeyDownEvent: T, hour: g, hourFormat: z, localizedDecimalSeparator: O, localizedFractionalSecond: b, localizedHour: w, localizedHourSuffix: M, localizedMinute: P, localizedMinuteSuffix: D, localizedSecond: E, localizedSecondSuffix: S, meridiemOrder: L, minute: k, second: $ } = this.time, x = "--", V = m(r), B = m(g), q = m(k), A = m($), F = u(this.step) > 0, I = z === "12", H = this.step < 60, C = L === 0 || se(this.el) === "rtl", p = !this.disabled && !this.readOnly;
    return X({ disabled: this.disabled, children: c`${this.labelText && te({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div aria-controls=${h.inputContainer} aria-labelledby=${h.inputContainer} class=${s({
      [i.container]: !0,
      [i.readOnly]: n
    })} role=combobox ${l(this.containerRef)}><calcite-icon class=${s(i.clockIcon)} .icon=${y.clock} .scale=${t === "l" ? "m" : "s"}></calcite-icon><div aria-label=${ee(this) ?? a} .ariaRequired=${this.required} class=${s(i.inputContainer)} dir=ltr id=${h.inputContainer} role=group>${I && C && this.renderMeridiem("start") || ""}<span aria-label=${this.messages.hour ?? a} aria-valuemax=23 aria-valuemin=1 aria-valuenow=${B && parseInt(g) || "0"} aria-valuetext=${g ?? a} class=${s({
      [i.empty]: !w,
      [i.hour]: !0,
      [i.input]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${p ? o : void 0} role=spinbutton tabindex=0 ${l(this.setHourEl)}>${w || x}</span><span class=${s(i.hourSuffix)}>${M}</span><span aria-label=${this.messages.minute ?? a} aria-valuemax=12 aria-valuemin=1 aria-valuenow=${q && parseInt(k) || "0"} aria-valuetext=${k ?? a} class=${s({
      [i.empty]: !P,
      [i.input]: !0,
      [i.minute]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${p ? f : void 0} role=spinbutton tabindex=0 ${l(this.setMinuteEl)}>${P || x}</span>${H && c`<span class=${s(i.minuteSuffix)}>${D}</span>` || ""}${H && c`<span aria-label=${this.messages.second ?? a} aria-valuemax=59 aria-valuemin=0 aria-valuenow=${A && parseInt($) || "0"} aria-valuetext=${$ ?? a} class=${s({
      [i.empty]: !E,
      [i.input]: !0,
      [i.second]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${p ? v : void 0} role=spinbutton tabindex=0 ${l(this.setSecondEl)}>${E || x}</span>` || ""}${F && c`<span class=${s(i.decimalSeparator)}>${O}</span>` || ""}${F && c`<span aria-label=${this.messages.fractionalSecond ?? a} aria-valuemax=999 aria-valuemin=1 aria-valuenow=${V && parseInt(r) || "0"} aria-valuetext=${b ?? a} class=${s({
      [i.empty]: !b,
      [i.fractionalSecond]: !0,
      [i.input]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${p ? T : void 0} role=spinbutton tabindex=0 ${l(this.setFractionalSecondEl)}>${b || "".padStart(u(this.step), "-")}</span>` || ""}${S && c`<span class=${s(i.secondSuffix)}>${S}</span>` || ""}${I && !C && this.renderMeridiem("end") || ""}</div>${!this.readOnly && this.renderToggleIcon(this.open) || ""}</div><calcite-popover auto-close .focusTrapDisabled=${this.focusTrapDisabled} .focusTrapOptions=${{ initialFocus: !1 }} .label=${e.chooseTime} lang=${this.messages._lang ?? a} offset-distance=0 @calcitePopoverBeforeClose=${this.popoverBeforeCloseHandler} @calcitePopoverBeforeOpen=${this.popoverBeforeOpenHandler} @calcitePopoverClose=${this.popoverCloseHandler} @calcitePopoverOpen=${this.popoverOpenHandler} .overlayPositioning=${this.overlayPositioning} .placement=${this.placement} pointer-disabled .referenceElement=${this.containerRef.value} trigger-disabled ${l(this.setCalcitePopoverEl)}><calcite-time-picker .hourFormat=${this.time.hourFormat} lang=${this.messages._lang ?? a} .messageOverrides=${this.messageOverrides} .numberingSystem=${this.numberingSystem} @calciteTimePickerChange=${this.timePickerChangeHandler} .scale=${this.scale} .step=${this.step} tabindex=${(this.open ? void 0 : -1) ?? a} .time=${this.time} .value=${this.value}></calcite-time-picker></calcite-popover>${Q({ component: this })}${this.validationMessage && this.status === "invalid" ? ae({ icon: this.validationIcon, id: h.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderMeridiem(e) {
    const { handleMeridiemKeyDownEvent: n, localizedMeridiem: t, meridiem: r } = this.time, o = !this.disabled && !this.readOnly;
    return c`<span aria-label=${this.messages.meridiem ?? a} aria-valuemax=2 aria-valuemin=1 aria-valuenow=${r === "PM" && "2" || "1"} aria-valuetext=${r ?? a} class=${s({
      [i.empty]: !t,
      [i.input]: !0,
      [i.meridiem]: !0,
      [i.meridiemStart]: e === "start",
      [i.meridiemEnd]: e === "end"
    })} @focus=${this.timePartFocusHandler} @keydown=${o ? n : void 0} role=spinbutton tabindex=0 ${l(this.setMeridiemEl)}>${t || "--"}</span>`;
  }
  renderToggleIcon(e) {
    return c`<span class=${s(i.toggleIcon)} @click=${this.toggleIconClickHandler}><calcite-icon .icon=${e ? y.chevronUp : y.chevronDown} .scale=${ie(this.scale)}></calcite-icon></span>`;
  }
}
K("calcite-input-time-picker", de);
export {
  de as InputTimePicker
};
