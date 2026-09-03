/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as I, L as K, c as B, s as t, b as r, d as O } from "./index.js";
import { e as l, n as u } from "./ref.js";
import { u as j } from "./index2.js";
import { i as d } from "./locale.js";
import { c as _, g as q } from "./component.js";
import { d as G } from "./math.js";
import { u as J } from "./useT9n.js";
import { u as Q } from "./useSetFocus.js";
import { u as W } from "./useTime.js";
const e = {
  button: "button",
  buttonBottomLeft: "button--bottom-left",
  buttonBottomRight: "button--bottom-right",
  buttonFractionalSecondDown: "button--fractionalSecond-down",
  buttonFractionalSecondUp: "button--fractionalSecond-up",
  buttonHourDown: "button--hour-down",
  buttonHourUp: "button--hour-up",
  buttonMeridiemDown: "button--meridiem-down",
  buttonMeridiemUp: "button--meridiem-up",
  buttonMinuteDown: "button--minute-down",
  buttonMinuteUp: "button--minute-up",
  buttonSecondDown: "button--second-down",
  buttonSecondUp: "button--second-up",
  buttonTopLeft: "button--top-left",
  buttonTopRight: "button--top-right",
  column: "column",
  decimalSeparator: "decimal-separator",
  delimiter: "delimiter",
  fractionalSecond: "fractionalSecond",
  hour: "hour",
  hourSuffix: "hour-suffix",
  input: "input",
  inputFocus: "inputFocus",
  meridiem: "meridiem",
  minute: "minute",
  minuteSuffix: "minute-suffix",
  second: "second",
  secondSuffix: "second-suffix",
  showMeridiem: "show-meridiem",
  showSecond: "show-second",
  scale: (f) => `scale-${f}`,
  timePicker: "time-picker",
  meridiemStart: "meridiem--start"
}, c = {
  chevronUp: "chevron-up",
  chevronDown: "chevron-down"
}, X = I`:host{display:inline-block}.time-picker{display:flex;-webkit-user-select:none;user-select:none;align-items:center;border-width:1px;border-style:solid;font-weight:var(--calcite-font-weight-medium);border-color:var(--calcite-time-picker-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round));color:var(--calcite-time-picker-color, var(--calcite-color-text-1));background-color:var(--calcite-time-picker-background-color, var(--calcite-color-foreground-1));line-height:var(--calcite-font-line-height-md);overflow:hidden}.time-picker .column{display:flex;flex-direction:column}.time-picker .meridiem--start{order:-1}.time-picker .button{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;background-color:var(--calcite-time-picker-background-color, var(--calcite-color-foreground-1))}.time-picker .button:hover,.time-picker .button:focus{outline:2px solid transparent;outline-offset:2px;z-index:var(--calcite-z-index-header);outline-offset:0;background-color:var(--calcite-time-picker-button-background-color-hover, var(--calcite-color-foreground-2))}.time-picker .button:active{background-color:var(--calcite-time-picker-button-background-color-press, var(--calcite-color-foreground-3))}.time-picker .button.top-left{border-start-start-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round))}.time-picker .button.bottom-left{border-end-start-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round))}.time-picker .button.top-right{border-start-end-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round))}.time-picker .button.bottom-right{border-end-end-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round))}.time-picker .button calcite-icon{color:var(--calcite-time-picker-icon-color, var(--calcite-color-text-3))}.time-picker .input{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-time-picker-background-color, var(--calcite-color-foreground-1))}.time-picker .input:hover{box-shadow:inset 0 0 0 2px var(--calcite-time-picker-input-border-color-hover, var(--calcite-color-foreground-2));z-index:var(--calcite-z-index-header)}.time-picker .input:focus,.time-picker .input:hover:focus{outline:2px solid transparent;outline-offset:2px;outline-offset:0}.time-picker .input.inputFocus,.time-picker .input:hover.inputFocus{box-shadow:inset 0 0 0 2px var(--calcite-time-picker-input-border-color-press, var(--calcite-color-brand));z-index:var(--calcite-z-index-header)}.time-picker.scale-s{font-size:var(--calcite-font-size-relative-base)}.time-picker.scale-s .button,.time-picker.scale-s .input{padding-inline:var(--calcite-spacing-sm);padding-block:var(--calcite-spacing-xxs)}.time-picker.scale-s:not(.show-meridiem) .delimiter:last-child{padding-inline-end:var(--calcite-spacing-md)}.time-picker.scale-m{font-size:var(--calcite-font-size-relative-md)}.time-picker.scale-m .button,.time-picker.scale-m .input{padding-inline:var(--calcite-spacing-md);padding-block:var(--calcite-spacing-sm)}.time-picker.scale-m:not(.show-meridiem) .delimiter:last-child{padding-inline-end:var(--calcite-spacing-xl)}.time-picker.scale-l{font-size:var(--calcite-font-size-relative-lg)}.time-picker.scale-l .button,.time-picker.scale-l .input{padding-inline:var(--calcite-spacing-lg);padding-block:var(--calcite-spacing-md)}.time-picker.scale-l:not(.show-meridiem) .delimiter:last-child{padding-inline-end:var(--calcite-spacing-xxl)}:host([hidden]){display:none}[hidden]{display:none}`;
class Y extends K {
  constructor() {
    super(), this.direction = j(), this.fractionalSecondRef = l(), this.hourRef = l(), this.meridiemRef = l(), this.minuteRef = l(), this.pointerActivated = !1, this.secondRef = l(), this.messages = J(), this.focusSetter = Q()(this), this.showFractionalSecond = !1, this.showSecond = !1, this.time = W(this), this.hourFormat = "user", this.scale = "m", this.step = 60, this.value = null, this.calciteTimePickerChange = B({ cancelable: !1 }), this.listen("blur", this.blurHandler), this.listen("calciteTimeChange", this.timeChangeHandler), this.listen("keydown", this.keyDownHandler), this.listen("pointerdown", this.pointerDownHandler);
  }
  static {
    this.properties = { activeEl: 16, showFractionalSecond: 16, showSecond: 16, time: 0, hourFormat: 3, messageOverrides: 0, numberingSystem: 1, scale: 3, step: 11, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = X;
  }
  async setFocus(i) {
    return this.focusSetter(() => this.el, i);
  }
  connectedCallback() {
    super.connectedCallback(), this.toggleSecond();
  }
  willUpdate(i) {
    i.has("step") && (this.hasUpdated || this.step !== 60) && this.toggleSecond(), i.has("value") && (this.hasUpdated || this.value !== null) && this.time.setValue(this.value);
  }
  blurHandler() {
    this.activeEl = void 0, this.pointerActivated = !1;
  }
  keyDownHandler(i) {
    this.pointerActivated = !1;
    const { defaultPrevented: o, key: n } = i;
    if (o)
      return;
    const { hourFormat: s } = this.time;
    switch (this.activeEl) {
      case this.hourRef.value:
        n === "ArrowRight" && (this.focusPart("minute"), i.preventDefault());
        break;
      case this.minuteRef.value:
        switch (n) {
          case "ArrowLeft":
            this.focusPart("hour"), i.preventDefault();
            break;
          case "ArrowRight":
            this.step !== 60 ? (this.focusPart("second"), i.preventDefault()) : s === "12" && (this.focusPart("meridiem"), i.preventDefault());
            break;
        }
        break;
      case this.secondRef.value:
        switch (n) {
          case "ArrowLeft":
            this.focusPart("minute"), i.preventDefault();
            break;
          case "ArrowRight":
            this.showFractionalSecond ? this.focusPart("fractionalSecond") : s === "12" && (this.focusPart("meridiem"), i.preventDefault());
            break;
        }
        break;
      case this.fractionalSecondRef.value:
        switch (n) {
          case "ArrowLeft":
            this.focusPart("second"), i.preventDefault();
            break;
          case "ArrowRight":
            s === "12" && (this.focusPart("meridiem"), i.preventDefault());
            break;
        }
        break;
      case this.meridiemRef.value:
        n === "ArrowLeft" && (this.showFractionalSecond ? this.focusPart("fractionalSecond") : this.step !== 60 ? (this.focusPart("second"), i.preventDefault()) : (this.focusPart("minute"), i.preventDefault()));
        break;
    }
  }
  pointerDownHandler() {
    this.pointerActivated = !0;
  }
  async focusPart(i) {
    await _(this), (i === "hour" ? this.hourRef : i === "minute" ? this.minuteRef : i === "second" ? this.secondRef : i === "fractionalSecond" ? this.fractionalSecondRef : this.meridiemRef).value?.focus();
  }
  focusHandler(i) {
    this.pointerActivated || (this.activeEl = i.currentTarget);
  }
  fractionalSecondDownClickHandler() {
    this.activeEl = this.fractionalSecondRef.value, this.activeEl && this.activeEl.focus(), this.time.nudgeFractionalSecond("down");
  }
  fractionalSecondUpClickHandler() {
    this.activeEl = this.fractionalSecondRef.value, this.activeEl && this.activeEl.focus(), this.time.nudgeFractionalSecond("up");
  }
  hourDownClickHandler() {
    this.activeEl = this.hourRef.value, this.activeEl && this.activeEl.focus(), this.time.decrementHour();
  }
  hourUpClickHandler() {
    this.activeEl = this.hourRef.value, this.activeEl && this.activeEl.focus(), this.time.incrementHour();
  }
  inputClickHandler(i) {
    this.activeEl = i.target;
  }
  meridiemUpClickHandler() {
    this.activeEl = this.meridiemRef.value, this.activeEl && this.activeEl.focus(), this.time.toggleMeridiem("up");
  }
  meridiemDownClickHandler() {
    this.activeEl = this.meridiemRef.value, this.activeEl && this.activeEl.focus(), this.time.toggleMeridiem("down");
  }
  minuteDownClickHandler() {
    this.activeEl = this.minuteRef.value, this.activeEl && this.activeEl.focus(), this.time.decrementMinute();
  }
  minuteUpClickHandler() {
    this.activeEl = this.minuteRef.value, this.activeEl && this.activeEl.focus(), this.time.incrementMinute();
  }
  secondDownClickHandler() {
    this.activeEl = this.secondRef.value, this.activeEl && this.activeEl.focus(), this.time.decrementSecond();
  }
  secondUpClickHandler() {
    this.activeEl = this.secondRef.value, this.activeEl?.focus(), this.time.incrementSecond();
  }
  timeChangeHandler(i) {
    i.stopPropagation();
    const o = i.detail;
    o !== this.value && (this.value = o), this.calciteTimePickerChange.emit();
  }
  toggleSecond() {
    this.showSecond = this.step < 60, this.stepPrecision = G(this.step), this.showFractionalSecond = this.stepPrecision > 0;
  }
  render() {
    const { activeEl: i, messages: o, scale: n } = this, { _lang: s } = o, { fractionalSecond: v, handleFractionalSecondKeyDownEvent: g, handleHourKeyDownEvent: S, handleMeridiemKeyDownEvent: x, handleMinuteKeyDownEvent: D, handleSecondKeyDownEvent: H, hour: h, hourFormat: R, localizedDecimalSeparator: E, localizedFractionalSecond: b, localizedHour: C, localizedHourSuffix: U, localizedMeridiem: F, localizedMinute: y, localizedMinuteSuffix: L, localizedSecond: P, localizedSecondSuffix: k, meridiem: $, meridiemOrder: M, minute: m, second: p } = this.time, z = d(h), a = q(n), T = d(m), A = d(p), V = d(v), N = s !== "bg" && k, w = R === "12";
    return r`<div class=${t({
      [e.timePicker]: !0,
      [e.showMeridiem]: w,
      [e.showSecond]: this.showSecond,
      [e.scale(n)]: !0
    })} dir=ltr><div class=${t(e.column)} role=group><span .ariaLabel=${o.hourUp} class=${t({
      [e.button]: !0,
      [e.buttonHourUp]: !0,
      [e.buttonTopLeft]: !0
    })} @click=${this.hourUpClickHandler} role=button><calcite-icon .icon=${c.chevronUp} .scale=${a}></calcite-icon></span><span .ariaLabel=${o.hour} aria-valuemax=23 aria-valuemin=1 .ariaValueNow=${z && parseInt(h, 10) || "0"} .ariaValueText=${h ?? void 0} class=${t({
      [e.input]: !0,
      [e.hour]: !0,
      [e.inputFocus]: i && i === this.hourRef.value
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${S} role=spinbutton tabindex=0 ${u(this.hourRef)}>${C || "--"}</span><span .ariaLabel=${o.hourDown} class=${t({
      [e.button]: !0,
      [e.buttonHourDown]: !0,
      [e.buttonBottomLeft]: !0
    })} @click=${this.hourDownClickHandler} role=button><calcite-icon .icon=${c.chevronDown} .scale=${a}></calcite-icon></span></div><span class=${t({ [e.delimiter]: !0, [e.hourSuffix]: !0 })}>${U}</span><div class=${t(e.column)} role=group><span .ariaLabel=${o.minuteUp} class=${t({
      [e.button]: !0,
      [e.buttonMinuteUp]: !0
    })} @click=${this.minuteUpClickHandler} role=button><calcite-icon .icon=${c.chevronUp} .scale=${a}></calcite-icon></span><span .ariaLabel=${o.minute} aria-valuemax=12 aria-valuemin=1 .ariaValueNow=${T && parseInt(m, 10) || "0"} .ariaValueText=${m ?? void 0} class=${t({
      [e.input]: !0,
      [e.minute]: !0,
      [e.inputFocus]: i && i === this.minuteRef.value
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${D} role=spinbutton tabindex=0 ${u(this.minuteRef)}>${y || "--"}</span><span .ariaLabel=${o.minuteDown} class=${t({
      [e.button]: !0,
      [e.buttonMinuteDown]: !0
    })} @click=${this.minuteDownClickHandler} role=button><calcite-icon .icon=${c.chevronDown} .scale=${a}></calcite-icon></span></div>${this.showSecond && r`<span class=${t({ [e.delimiter]: !0, [e.minuteSuffix]: !0 })}>${L}</span>` || ""}${this.showSecond && r`<div class=${t(e.column)} role=group><span .ariaLabel=${o.secondUp} class=${t({
      [e.button]: !0,
      [e.buttonSecondUp]: !0
    })} @click=${this.secondUpClickHandler} role=button><calcite-icon .icon=${c.chevronUp} .scale=${a}></calcite-icon></span><span .ariaLabel=${o.second} aria-valuemax=59 aria-valuemin=0 .ariaValueNow=${A && parseInt(p, 10) || "0"} .ariaValueText=${p ?? void 0} class=${t({
      [e.input]: !0,
      [e.second]: !0,
      [e.inputFocus]: i && i === this.secondRef.value
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${H} role=spinbutton tabindex=0 ${u(this.secondRef)}>${P || "--"}</span><span .ariaLabel=${o.secondDown} class=${t({
      [e.button]: !0,
      [e.buttonSecondDown]: !0
    })} @click=${this.secondDownClickHandler} role=button><calcite-icon .icon=${c.chevronDown} .scale=${a}></calcite-icon></span></div>` || ""}${this.showFractionalSecond && r`<span class=${t({ [e.delimiter]: !0, [e.decimalSeparator]: !0 })}>${E}</span>` || ""}${this.showFractionalSecond && r`<div class=${t(e.column)} role=group><span .ariaLabel=${o.fractionalSecondUp} class=${t({
      [e.button]: !0,
      [e.buttonFractionalSecondUp]: !0
    })} @click=${this.fractionalSecondUpClickHandler} role=button><calcite-icon .icon=${c.chevronUp} .scale=${a}></calcite-icon></span><span .ariaLabel=${o.fractionalSecond} aria-valuemax=999 aria-valuemin=1 .ariaValueNow=${V && parseInt(v, 10) || "0"} .ariaValueText=${b ?? void 0} class=${t({
      [e.input]: !0,
      [e.fractionalSecond]: !0,
      [e.inputFocus]: i && i === this.fractionalSecondRef.value
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${g} role=spinbutton tabindex=0 ${u(this.fractionalSecondRef)}>${b || "".padStart(this.stepPrecision, "-")}</span><span .ariaLabel=${o.fractionalSecondDown} class=${t({
      [e.button]: !0,
      [e.buttonFractionalSecondDown]: !0
    })} @click=${this.fractionalSecondDownClickHandler} role=button><calcite-icon .icon=${c.chevronDown} .scale=${a}></calcite-icon></span></div>` || ""}${N && r`<span class=${t({ [e.delimiter]: !0, [e.secondSuffix]: !0 })}>${k}</span>` || ""}${w && r`<div class=${t({
      [e.column]: !0,
      [e.meridiemStart]: M === 0 || this.direction === "rtl"
    })} role=group><span .ariaLabel=${o.meridiemUp} class=${t({
      [e.button]: !0,
      [e.buttonMeridiemUp]: !0,
      [e.buttonTopRight]: !0
    })} @click=${this.meridiemUpClickHandler} role=button><calcite-icon .icon=${c.chevronUp} .scale=${a}></calcite-icon></span><span .ariaLabel=${o.meridiem} aria-valuemax=2 aria-valuemin=1 .ariaValueNow=${$ === "PM" && "2" || "1"} .ariaValueText=${$ ?? void 0} class=${t({
      [e.input]: !0,
      [e.meridiem]: !0,
      [e.inputFocus]: i && i === this.meridiemRef.value
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${x} role=spinbutton tabindex=0 ${u(this.meridiemRef)}>${F || "--"}</span><span .ariaLabel=${o.meridiemDown} class=${t({
      [e.button]: !0,
      [e.buttonMeridiemDown]: !0,
      [e.buttonBottomRight]: !0
    })} @click=${this.meridiemDownClickHandler} role=button><calcite-icon .icon=${c.chevronDown} .scale=${a}></calcite-icon></span></div>` || ""}</div>`;
  }
}
O("calcite-time-picker", Y);
export {
  Y as TimePicker
};
