import { a as L, L as I, d as T, s as o, x as m, c as N } from "./iframe.js";
import { n as f } from "./ref.js";
import { n as b } from "./key.js";
import { i as d } from "./locale.js";
import { f as p, p as x, i as D, l as H, g as K, a as k, b as z, c as S, d as O, e as R, m as E } from "./time.js";
import { c as F, g as _ } from "./component.js";
import { g, d as v } from "./math.js";
import { g as B } from "./dom.js";
import { u as j } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
const t = {
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
  "scale-s": "scale-s",
  "scale-m": "scale-m",
  "scale-l": "scale-l",
  timePicker: "time-picker",
  meridiemStart: "meridiem--start"
}, W = L`:host{display:inline-block}.time-picker{display:flex;-webkit-user-select:none;user-select:none;align-items:center;font-weight:var(--calcite-font-weight-medium);--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);border-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round));color:var(--calcite-time-picker-color, var(--calcite-color-text-1));background-color:var(--calcite-time-picker-background-color, var(--calcite-color-foreground-1))}.time-picker .column{display:flex;flex-direction:column}.time-picker .meridiem--start{order:-1}.time-picker .button{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;background-color:var(--calcite-time-picker-background-color, var(--calcite-color-foreground-1))}.time-picker .button:hover,.time-picker .button:focus{outline:2px solid transparent;outline-offset:2px;z-index:var(--calcite-z-index-header);outline-offset:0;background-color:var(--calcite-time-picker-button-background-color-hover, var(--calcite-color-foreground-2))}.time-picker .button:active{background-color:var(--calcite-time-picker-button-background-color-press, var(--calcite-color-foreground-3))}.time-picker .button.top-left{border-start-start-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round))}.time-picker .button.bottom-left{border-end-start-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round))}.time-picker .button.top-right{border-start-end-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round))}.time-picker .button.bottom-right{border-end-end-radius:var(--calcite-time-picker-corner-radius, var(--calcite-border-radius-round))}.time-picker .button calcite-icon{color:var(--calcite-time-picker-icon-color, var(--calcite-color-text-3))}.time-picker .input{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-time-picker-background-color, var(--calcite-color-foreground-1))}.time-picker .input:hover{box-shadow:inset 0 0 0 2px var(--calcite-time-picker-input-border-color-hover, var(--calcite-color-foreground-2));z-index:var(--calcite-z-index-header)}.time-picker .input:focus,.time-picker .input:hover:focus{outline:2px solid transparent;outline-offset:2px;outline-offset:0}.time-picker .input.inputFocus,.time-picker .input:hover.inputFocus{box-shadow:inset 0 0 0 2px var(--calcite-time-picker-input-border-color-press, var(--calcite-color-brand));z-index:var(--calcite-z-index-header)}.time-picker.scale-s{font-size:var(--calcite-font-size--1)}.time-picker.scale-s .button,.time-picker.scale-s .input{padding-inline:var(--calcite-spacing-md);padding-block:var(--calcite-spacing-xxs)}.time-picker.scale-s:not(.show-meridiem) .delimiter:last-child{padding-inline-end:var(--calcite-spacing-md)}.time-picker.scale-m{font-size:var(--calcite-font-size-0)}.time-picker.scale-m .button,.time-picker.scale-m .input{padding-inline:var(--calcite-spacing-xl);padding-block:var(--calcite-spacing-sm)}.time-picker.scale-m:not(.show-meridiem) .delimiter:last-child{padding-inline-end:var(--calcite-spacing-xl)}.time-picker.scale-l{font-size:var(--calcite-font-size-1)}.time-picker.scale-l .button,.time-picker.scale-l .input{padding-inline:var(--calcite-spacing-xxl);padding-block:var(--calcite-spacing-md)}.time-picker.scale-l:not(.show-meridiem) .delimiter:last-child{padding-inline-end:var(--calcite-spacing-xxl)}:host([hidden]){display:none}[hidden]{display:none}`;
function q(w) {
  return w.charAt(0).toUpperCase() + w.slice(1);
}
class G extends I {
  constructor() {
    super(), this.pointerActivated = !1, this.messages = j(), this.localizedDecimalSeparator = ".", this.hourFormat = "user", this.scale = "m", this.step = 60, this.value = null, this.calciteTimePickerChange = T({ cancelable: !1 }), this.listen("blur", this.blurHandler), this.listen("keydown", this.keyDownHandler), this.listen("pointerdown", this.pointerDownHandler);
  }
  static {
    this.properties = { activeEl: 16, effectiveHourFormat: 16, fractionalSecond: 16, hour: 16, localizedDecimalSeparator: 16, localizedFractionalSecond: 16, localizedHour: 16, localizedHourSuffix: 16, localizedMeridiem: 16, localizedMinute: 16, localizedMinuteSuffix: 16, localizedSecond: 16, localizedSecondSuffix: 16, meridiem: 16, minute: 16, second: 16, showFractionalSecond: 16, showSecond: 16, hourFormat: 3, messageOverrides: 0, numberingSystem: 1, scale: 3, step: 11, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = W;
  }
  async setFocus() {
    await F(this), this.el?.focus();
  }
  connectedCallback() {
    super.connectedCallback(), this.updateLocale(), this.toggleSecond();
  }
  willUpdate(e) {
    e.has("step") && (this.hasUpdated || this.step !== 60) && this.toggleSecond(), e.has("value") && (this.hasUpdated || this.value !== null) && this.setValue(this.value), (e.has("hourFormat") || e.has("messages")) && this.updateLocale();
  }
  blurHandler() {
    this.activeEl = void 0, this.pointerActivated = !1;
  }
  keyDownHandler(e) {
    this.pointerActivated = !1;
    const { defaultPrevented: i, key: a } = e;
    if (!i)
      switch (this.activeEl) {
        case this.hourEl:
          a === "ArrowRight" && (this.focusPart("minute"), e.preventDefault());
          break;
        case this.minuteEl:
          switch (a) {
            case "ArrowLeft":
              this.focusPart("hour"), e.preventDefault();
              break;
            case "ArrowRight":
              this.step !== 60 ? (this.focusPart("second"), e.preventDefault()) : this.effectiveHourFormat === "12" && (this.focusPart("meridiem"), e.preventDefault());
              break;
          }
          break;
        case this.secondEl:
          switch (a) {
            case "ArrowLeft":
              this.focusPart("minute"), e.preventDefault();
              break;
            case "ArrowRight":
              this.showFractionalSecond ? this.focusPart("fractionalSecond") : this.effectiveHourFormat === "12" && (this.focusPart("meridiem"), e.preventDefault());
              break;
          }
          break;
        case this.fractionalSecondEl:
          switch (a) {
            case "ArrowLeft":
              this.focusPart("second"), e.preventDefault();
              break;
            case "ArrowRight":
              this.effectiveHourFormat === "12" && (this.focusPart("meridiem"), e.preventDefault());
              break;
          }
          break;
        case this.meridiemEl:
          switch (a) {
            case "ArrowLeft":
              this.showFractionalSecond ? this.focusPart("fractionalSecond") : this.step !== 60 ? (this.focusPart("second"), e.preventDefault()) : (this.focusPart("minute"), e.preventDefault());
              break;
          }
          break;
      }
  }
  pointerDownHandler() {
    this.pointerActivated = !0;
  }
  async focusPart(e) {
    await F(this), this[`${e || "hour"}El`]?.focus();
  }
  decrementHour() {
    const e = this.hour ? parseInt(this.hour) === 0 ? 23 : parseInt(this.hour) - 1 : 0;
    this.setValuePart("hour", e);
  }
  decrementMeridiem() {
    const e = this.meridiem === "PM" ? "AM" : "PM";
    this.setValuePart("meridiem", e);
  }
  decrementMinuteOrSecond(e) {
    let i;
    if (d(this[e])) {
      const a = parseInt(this[e]);
      i = a === 0 ? 59 : a - 1;
    } else
      i = 59;
    this.setValuePart(e, i);
  }
  decrementMinute() {
    this.decrementMinuteOrSecond("minute");
  }
  decrementSecond() {
    this.decrementMinuteOrSecond("second");
  }
  focusHandler(e) {
    this.pointerActivated || (this.activeEl = e.currentTarget);
  }
  fractionalSecondKeyDownHandler(e) {
    const { key: i } = e;
    if (b.includes(i)) {
      const { stepPrecision: a } = this, s = parseInt(this.fractionalSecond), r = s.toString().length;
      let c;
      r >= a ? c = i.padStart(a, "0") : r < a && (c = `${s}${i}`.padStart(a, "0")), this.setValuePart("fractionalSecond", parseFloat(`0.${c}`));
    } else
      switch (i) {
        case "Backspace":
        case "Delete":
          this.setValuePart("fractionalSecond", null);
          break;
        case "ArrowDown":
          e.preventDefault(), this.nudgeFractionalSecond("down");
          break;
        case "ArrowUp":
          e.preventDefault(), this.nudgeFractionalSecond("up");
          break;
        case " ":
          e.preventDefault();
          break;
      }
  }
  fractionalSecondDownClickHandler() {
    this.activeEl = this.fractionalSecondEl, this.fractionalSecondEl.focus(), this.nudgeFractionalSecond("down");
  }
  fractionalSecondUpClickHandler() {
    this.activeEl = this.fractionalSecondEl, this.fractionalSecondEl.focus(), this.nudgeFractionalSecond("up");
  }
  hourDownClickHandler() {
    this.activeEl = this.hourEl, this.hourEl.focus(), this.decrementHour();
  }
  hourKeyDownHandler(e) {
    const { key: i } = e;
    if (b.includes(i)) {
      const a = parseInt(i);
      let s;
      if (d(this.hour))
        switch (this.effectiveHourFormat) {
          case "12":
            s = this.hour === "01" && a >= 0 && a <= 2 ? `1${a}` : a;
            break;
          case "24":
            this.hour === "01" ? s = `1${a}` : this.hour === "02" && a >= 0 && a <= 3 ? s = `2${a}` : s = a;
            break;
        }
      else
        s = a;
      this.setValuePart("hour", s);
    } else
      switch (i) {
        case "Backspace":
        case "Delete":
          this.setValuePart("hour", null);
          break;
        case "ArrowDown":
          e.preventDefault(), this.decrementHour();
          break;
        case "ArrowUp":
          e.preventDefault(), this.incrementHour();
          break;
        case " ":
          e.preventDefault();
          break;
      }
  }
  hourUpClickHandler() {
    this.activeEl = this.hourEl, this.hourEl.focus(), this.incrementHour();
  }
  incrementMeridiem() {
    const e = this.meridiem === "AM" ? "PM" : "AM";
    this.setValuePart("meridiem", e);
  }
  incrementHour() {
    const e = d(this.hour) ? this.hour === "23" ? 0 : parseInt(this.hour) + 1 : 1;
    this.setValuePart("hour", e);
  }
  incrementMinuteOrSecond(e) {
    const i = d(this[e]) ? this[e] === "59" ? 0 : parseInt(this[e]) + 1 : 0;
    this.setValuePart(e, i);
  }
  incrementMinute() {
    this.incrementMinuteOrSecond("minute");
  }
  incrementSecond() {
    this.incrementMinuteOrSecond("second");
  }
  inputClickHandler(e) {
    this.activeEl = e.target;
  }
  meridiemUpClickHandler() {
    this.activeEl = this.meridiemEl, this.meridiemEl.focus(), this.incrementMeridiem();
  }
  meridiemKeyDownHandler(e) {
    switch (e.key) {
      case "a":
        this.setValuePart("meridiem", "AM");
        break;
      case "p":
        this.setValuePart("meridiem", "PM");
        break;
      case "Backspace":
      case "Delete":
        this.setValuePart("meridiem", null);
        break;
      case "ArrowUp":
        e.preventDefault(), this.incrementMeridiem();
        break;
      case "ArrowDown":
        e.preventDefault(), this.decrementMeridiem();
        break;
      case " ":
        e.preventDefault();
        break;
    }
  }
  meridiemDownClickHandler() {
    this.activeEl = this.meridiemEl, this.meridiemEl.focus(), this.decrementMeridiem();
  }
  minuteDownClickHandler() {
    this.activeEl = this.minuteEl, this.minuteEl.focus(), this.decrementMinute();
  }
  minuteUpClickHandler() {
    this.activeEl = this.minuteEl, this.minuteEl.focus(), this.incrementMinute();
  }
  minuteKeyDownHandler(e) {
    const { key: i } = e;
    if (b.includes(i)) {
      const a = parseInt(i);
      let s;
      if (d(this.minute) && this.minute.startsWith("0")) {
        const r = parseInt(this.minute);
        s = r > E ? a : `${r}${a}`;
      } else
        s = a;
      this.setValuePart("minute", s);
    } else
      switch (i) {
        case "Backspace":
        case "Delete":
          this.setValuePart("minute", null);
          break;
        case "ArrowDown":
          e.preventDefault(), this.decrementMinute();
          break;
        case "ArrowUp":
          e.preventDefault(), this.incrementMinute();
          break;
        case " ":
          e.preventDefault();
          break;
      }
  }
  nudgeFractionalSecond(e) {
    const i = g(this.step), { stepPrecision: a } = this, s = parseInt(this.fractionalSecond), r = parseFloat(`0.${this.fractionalSecond}`);
    let c, n, u, l;
    e === "up" && (c = isNaN(s) ? 0 : r + i, n = parseFloat(c.toFixed(a)), u = g(n), l = n < 1 && v(u) > 0 ? p(u, a) : "".padStart(a, "0")), e === "down" && (c = isNaN(s) || s === 0 ? 1 - i : r - i, n = parseFloat(c.toFixed(a)), u = g(n), l = n < 1 && v(u) > 0 && Math.sign(u) === 1 ? p(u, a) : "".padStart(a, "0")), this.setValuePart("fractionalSecond", l);
  }
  sanitizeValue(e) {
    const { hour: i, minute: a, second: s, fractionalSecond: r } = x(e);
    if (r) {
      const c = this.sanitizeFractionalSecond(r);
      return `${i}:${a}:${s}.${c}`;
    }
    return D(e) && e;
  }
  sanitizeFractionalSecond(e) {
    const { stepPrecision: i } = this;
    return e && i !== e.length ? parseFloat(`0.${e}`).toFixed(i).replace("0.", "") : e;
  }
  secondKeyDownHandler(e) {
    const { key: i } = e;
    if (b.includes(i)) {
      const a = parseInt(i);
      let s;
      if (d(this.second) && this.second.startsWith("0")) {
        const r = parseInt(this.second);
        s = r > E ? a : `${r}${a}`;
      } else
        s = a;
      this.setValuePart("second", s);
    } else
      switch (i) {
        case "Backspace":
        case "Delete":
          this.setValuePart("second", null);
          break;
        case "ArrowDown":
          e.preventDefault(), this.decrementSecond();
          break;
        case "ArrowUp":
          e.preventDefault(), this.incrementSecond();
          break;
        case " ":
          e.preventDefault();
          break;
      }
  }
  secondDownClickHandler() {
    this.activeEl = this.secondEl, this.secondEl.focus(), this.decrementSecond();
  }
  secondUpClickHandler() {
    this.activeEl = this.secondEl, this.secondEl.focus(), this.incrementSecond();
  }
  setHourEl(e) {
    this.hourEl = e;
  }
  setMeridiemEl(e) {
    this.meridiemEl = e;
  }
  setMinuteEl(e) {
    this.minuteEl = e;
  }
  setSecondEl(e) {
    this.secondEl = e;
  }
  setFractionalSecondEl(e) {
    this.fractionalSecondEl = e;
  }
  setValue(e) {
    if (D(e)) {
      const { hour: i, minute: a, second: s, fractionalSecond: r } = x(e), { effectiveHourFormat: c, messages: { _lang: n }, numberingSystem: u, step: l } = this, { hour: h, hourSuffix: M, minute: P, minuteSuffix: A, second: V, secondSuffix: y, decimalSeparator: U, fractionalSecond: C, meridiem: $ } = H({
        value: e,
        locale: n,
        numberingSystem: u,
        hour12: c === "12",
        step: l
      });
      this.hour = i, this.minute = a, this.second = s, this.fractionalSecond = this.sanitizeFractionalSecond(r), this.localizedHour = h, this.localizedHourSuffix = M, this.localizedMinute = P, this.localizedMinuteSuffix = A, this.localizedSecond = V, this.localizedDecimalSeparator = U, this.localizedFractionalSecond = C, this.localizedSecondSuffix = y, $ && (this.localizedMeridiem = $, this.meridiem = K(this.hour));
    } else
      this.hour = null, this.fractionalSecond = null, this.localizedHour = null, this.localizedHourSuffix = k("hour", this.messages._lang, this.numberingSystem), this.localizedMeridiem = null, this.localizedMinute = null, this.localizedMinuteSuffix = k("minute", this.messages._lang, this.numberingSystem), this.localizedSecond = null, this.localizedDecimalSeparator = z(this.messages._lang, this.numberingSystem), this.localizedFractionalSecond = null, this.localizedSecondSuffix = k("second", this.messages._lang, this.numberingSystem), this.meridiem = null, this.minute = null, this.second = null, this.value = null;
  }
  setValuePart(e, i) {
    const { effectiveHourFormat: a, messages: { _lang: s }, numberingSystem: r, step: c } = this, n = a === "12";
    if (e === "meridiem") {
      if (this.meridiem = i, d(this.hour)) {
        const h = parseInt(this.hour);
        switch (i) {
          case "AM":
            h >= 12 && (this.hour = p(h - 12));
            break;
          case "PM":
            h < 12 && (this.hour = p(h + 12));
            break;
        }
        this.localizedHour = S({
          value: this.hour,
          part: "hour",
          locale: s,
          numberingSystem: r,
          hour12: n
        });
      }
    } else if (e === "fractionalSecond") {
      const { stepPrecision: h } = this;
      typeof i == "number" ? this.fractionalSecond = i === 0 ? "".padStart(h, "0") : p(i, h) : this.fractionalSecond = i, this.localizedFractionalSecond = S({
        value: this.fractionalSecond,
        part: "fractionalSecond",
        locale: s,
        numberingSystem: r,
        hour12: n
      });
    } else
      this[e] = typeof i == "number" ? p(i) : i, this[`localized${q(e)}`] = S({
        value: this[e],
        part: e,
        locale: s,
        numberingSystem: r,
        hour12: n
      });
    let u = !1, l;
    this.hour && this.minute ? (l = `${this.hour}:${this.minute}`, this.showSecond && (l = `${l}:${this.second ?? "00"}`, this.showFractionalSecond && this.fractionalSecond && (l = `${l}.${this.fractionalSecond}`))) : l = null, this.value !== l && (u = !0), this.value = l, this.localizedMeridiem = this.value ? H({
      hour12: n,
      locale: s,
      numberingSystem: r,
      step: c,
      value: this.value
    })?.meridiem || null : S({
      hour12: n,
      value: this.meridiem,
      part: "meridiem",
      locale: s,
      numberingSystem: r
    }), u && this.calciteTimePickerChange.emit();
  }
  toggleSecond() {
    this.showSecond = this.step < 60, this.stepPrecision = v(this.step), this.showFractionalSecond = this.stepPrecision > 0;
  }
  updateLocale() {
    this.effectiveHourFormat = this.hourFormat === "user" ? O(this.messages._lang) : this.hourFormat, this.localizedDecimalSeparator = z(this.messages._lang, this.numberingSystem), this.meridiemOrder = R(this.messages._lang), this.setValue(this.sanitizeValue(this.value));
  }
  render() {
    const e = d(this.hour), i = _(this.scale), a = d(this.minute), s = d(this.second), r = d(this.fractionalSecond), c = this.messages._lang !== "bg" && this.localizedSecondSuffix, n = this.effectiveHourFormat === "12";
    return m`<div class=${o({
      [t.timePicker]: !0,
      [t.showMeridiem]: n,
      [t.showSecond]: this.showSecond,
      [t[`scale-${this.scale}`]]: !0
    })} dir=ltr><div class=${o(t.column)} role=group><span .ariaLabel=${this.messages.hourUp} class=${o({
      [t.button]: !0,
      [t.buttonHourUp]: !0,
      [t.buttonTopLeft]: !0
    })} @click=${this.hourUpClickHandler} role=button><calcite-icon icon=chevron-up .scale=${i}></calcite-icon></span><span .ariaLabel=${this.messages.hour} aria-valuemax=23 aria-valuemin=1 .ariaValueNow=${e && parseInt(this.hour) || "0"} .ariaValueText=${this.hour} class=${o({
      [t.input]: !0,
      [t.hour]: !0,
      [t.inputFocus]: this.activeEl && this.activeEl === this.hourEl
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${this.hourKeyDownHandler} role=spinbutton tabindex=0 ${f(this.setHourEl)}>${this.localizedHour || "--"}</span><span .ariaLabel=${this.messages.hourDown} class=${o({
      [t.button]: !0,
      [t.buttonHourDown]: !0,
      [t.buttonBottomLeft]: !0
    })} @click=${this.hourDownClickHandler} role=button><calcite-icon icon=chevron-down .scale=${i}></calcite-icon></span></div><span class=${o({ [t.delimiter]: !0, [t.hourSuffix]: !0 })}>${this.localizedHourSuffix}</span><div class=${o(t.column)} role=group><span .ariaLabel=${this.messages.minuteUp} class=${o({
      [t.button]: !0,
      [t.buttonMinuteUp]: !0
    })} @click=${this.minuteUpClickHandler} role=button><calcite-icon icon=chevron-up .scale=${i}></calcite-icon></span><span .ariaLabel=${this.messages.minute} aria-valuemax=12 aria-valuemin=1 .ariaValueNow=${a && parseInt(this.minute) || "0"} .ariaValueText=${this.minute} class=${o({
      [t.input]: !0,
      [t.minute]: !0,
      [t.inputFocus]: this.activeEl && this.activeEl === this.minuteEl
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${this.minuteKeyDownHandler} role=spinbutton tabindex=0 ${f(this.setMinuteEl)}>${this.localizedMinute || "--"}</span><span .ariaLabel=${this.messages.minuteDown} class=${o({
      [t.button]: !0,
      [t.buttonMinuteDown]: !0
    })} @click=${this.minuteDownClickHandler} role=button><calcite-icon icon=chevron-down .scale=${i}></calcite-icon></span></div>${this.showSecond && m`<span class=${o({ [t.delimiter]: !0, [t.minuteSuffix]: !0 })}>${this.localizedMinuteSuffix}</span>` || ""}${this.showSecond && m`<div class=${o(t.column)} role=group><span .ariaLabel=${this.messages.secondUp} class=${o({
      [t.button]: !0,
      [t.buttonSecondUp]: !0
    })} @click=${this.secondUpClickHandler} role=button><calcite-icon icon=chevron-up .scale=${i}></calcite-icon></span><span .ariaLabel=${this.messages.second} aria-valuemax=59 aria-valuemin=0 .ariaValueNow=${s && parseInt(this.second) || "0"} .ariaValueText=${this.second} class=${o({
      [t.input]: !0,
      [t.second]: !0,
      [t.inputFocus]: this.activeEl && this.activeEl === this.secondEl
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${this.secondKeyDownHandler} role=spinbutton tabindex=0 ${f(this.setSecondEl)}>${this.localizedSecond || "--"}</span><span .ariaLabel=${this.messages.secondDown} class=${o({
      [t.button]: !0,
      [t.buttonSecondDown]: !0
    })} @click=${this.secondDownClickHandler} role=button><calcite-icon icon=chevron-down .scale=${i}></calcite-icon></span></div>` || ""}${this.showFractionalSecond && m`<span class=${o({ [t.delimiter]: !0, [t.decimalSeparator]: !0 })}>${this.localizedDecimalSeparator}</span>` || ""}${this.showFractionalSecond && m`<div class=${o(t.column)} role=group><span .ariaLabel=${this.messages.fractionalSecondUp} class=${o({
      [t.button]: !0,
      [t.buttonFractionalSecondUp]: !0
    })} @click=${this.fractionalSecondUpClickHandler} role=button><calcite-icon icon=chevron-up .scale=${i}></calcite-icon></span><span .ariaLabel=${this.messages.fractionalSecond} aria-valuemax=999 aria-valuemin=1 .ariaValueNow=${r && parseInt(this.fractionalSecond) || "0"} .ariaValueText=${this.localizedFractionalSecond} class=${o({
      [t.input]: !0,
      [t.fractionalSecond]: !0,
      [t.inputFocus]: this.activeEl && this.activeEl === this.fractionalSecondEl
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${this.fractionalSecondKeyDownHandler} role=spinbutton tabindex=0 ${f(this.setFractionalSecondEl)}>${this.localizedFractionalSecond || "".padStart(this.stepPrecision, "-")}</span><span .ariaLabel=${this.messages.fractionalSecondDown} class=${o({
      [t.button]: !0,
      [t.buttonFractionalSecondDown]: !0
    })} @click=${this.fractionalSecondDownClickHandler} role=button><calcite-icon icon=chevron-down .scale=${i}></calcite-icon></span></div>` || ""}${c && m`<span class=${o({ [t.delimiter]: !0, [t.secondSuffix]: !0 })}>${this.localizedSecondSuffix}</span>` || ""}${n && m`<div class=${o({
      [t.column]: !0,
      [t.meridiemStart]: this.meridiemOrder === 0 || B(this.el) === "rtl"
    })} role=group><span .ariaLabel=${this.messages.meridiemUp} class=${o({
      [t.button]: !0,
      [t.buttonMeridiemUp]: !0,
      [t.buttonTopRight]: !0
    })} @click=${this.meridiemUpClickHandler} role=button><calcite-icon icon=chevron-up .scale=${i}></calcite-icon></span><span .ariaLabel=${this.messages.meridiem} aria-valuemax=2 aria-valuemin=1 .ariaValueNow=${this.meridiem === "PM" && "2" || "1"} .ariaValueText=${this.meridiem} class=${o({
      [t.input]: !0,
      [t.meridiem]: !0,
      [t.inputFocus]: this.activeEl && this.activeEl === this.meridiemEl
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${this.meridiemKeyDownHandler} role=spinbutton tabindex=0 ${f(this.setMeridiemEl)}>${this.localizedMeridiem || "--"}</span><span .ariaLabel=${this.messages.meridiemDown} class=${o({
      [t.button]: !0,
      [t.buttonMeridiemDown]: !0,
      [t.buttonBottomRight]: !0
    })} @click=${this.meridiemDownClickHandler} role=button><calcite-icon icon=chevron-down .scale=${i}></calcite-icon></span></div>` || ""}</div>`;
  }
}
N("calcite-time-picker", G);
export {
  G as TimePicker
};
