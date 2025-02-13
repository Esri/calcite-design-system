import { j as C, L, n as I, x as m, s as o, k as T } from "./iframe.js";
import { n as f } from "./ref.js";
import { n as b } from "./key.js";
import { i as d } from "./locale.js";
import { f as p, p as v, i as D, l as H, g as N, a as k, b as x, c as S, d as K, e as O, m as z } from "./time.js";
import { c as E, g as R } from "./component.js";
import { d as h, g } from "./math.js";
import { g as _ } from "./dom.js";
import { u as B } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
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
}, j = C`:host{display:inline-block}.time-picker{display:flex;-webkit-user-select:none;user-select:none;align-items:center;background-color:var(--calcite-color-foreground-1);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);border-radius:var(--calcite-border-radius)}.time-picker .column{display:flex;flex-direction:column}.time-picker .meridiem--start{order:-1}.time-picker .button{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1)}.time-picker .button:hover,.time-picker .button:focus{background-color:var(--calcite-color-foreground-2);outline:2px solid transparent;outline-offset:2px;z-index:var(--calcite-z-index-header);outline-offset:0}.time-picker .button:active{background-color:var(--calcite-color-foreground-3)}.time-picker .button.top-left{border-start-start-radius:var(--calcite-border-radius)}.time-picker .button.bottom-left{border-end-start-radius:var(--calcite-border-radius)}.time-picker .button.top-right{border-start-end-radius:var(--calcite-border-radius)}.time-picker .button.bottom-right{border-end-end-radius:var(--calcite-border-radius)}.time-picker .button calcite-icon{color:var(--calcite-color-text-3)}.time-picker .input{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1);font-weight:var(--calcite-font-weight-medium)}.time-picker .input:hover{box-shadow:inset 0 0 0 2px var(--calcite-color-foreground-2);z-index:var(--calcite-z-index-header)}.time-picker .input:focus,.time-picker .input:hover:focus{outline:2px solid transparent;outline-offset:2px;outline-offset:0}.time-picker .input.inputFocus,.time-picker .input:hover.inputFocus{box-shadow:inset 0 0 0 2px var(--calcite-color-brand);z-index:var(--calcite-z-index-header)}.time-picker.scale-s{font-size:var(--calcite-font-size--1)}.time-picker.scale-s .button,.time-picker.scale-s .input{padding-inline:.75rem;padding-block:.25rem}.time-picker.scale-s:not(.show-meridiem) .delimiter:last-child{padding-inline-end:.75rem}.time-picker.scale-m{font-size:var(--calcite-font-size-0)}.time-picker.scale-m .button,.time-picker.scale-m .input{padding-inline:1rem;padding-block:.5rem}.time-picker.scale-m:not(.show-meridiem) .delimiter:last-child{padding-inline-end:1rem}.time-picker.scale-l{font-size:var(--calcite-font-size-1)}.time-picker.scale-l .button,.time-picker.scale-l .input{padding-inline:1.25rem;padding-block:.75rem}.time-picker.scale-l:not(.show-meridiem) .delimiter:last-child{padding-inline-end:1.25rem}:host([hidden]){display:none}[hidden]{display:none}`;
function W(w) {
  return w.charAt(0).toUpperCase() + w.slice(1);
}
class q extends L {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.pointerActivated = !1, this.localizedDecimalSeparator = ".", this.hourFormat = "user", this.messages = B(), this.scale = "m", this.step = 60, this.value = null, this.calciteTimePickerChange = I({ cancelable: !1 }), this.listen("blur", this.blurHandler), this.listen("keydown", this.keyDownHandler), this.listen("pointerdown", this.pointerDownHandler);
  }
  static {
    this.properties = { activeEl: 16, effectiveHourFormat: 16, fractionalSecond: 16, hour: 16, localizedDecimalSeparator: 16, localizedFractionalSecond: 16, localizedHour: 16, localizedHourSuffix: 16, localizedMeridiem: 16, localizedMinute: 16, localizedMinuteSuffix: 16, localizedSecond: 16, localizedSecondSuffix: 16, meridiem: 16, minute: 16, second: 16, showFractionalSecond: 16, showSecond: 16, hourFormat: 3, messageOverrides: 0, numberingSystem: 1, scale: 3, step: 11, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = j;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    await E(this), this.el?.focus();
  }
  connectedCallback() {
    super.connectedCallback(), this.updateLocale(), this.toggleSecond();
  }
  willUpdate(e) {
    e.has("step") && (this.hasUpdated || this.step !== 60) && this.toggleSecond(), e.has("value") && (this.hasUpdated || this.value !== null) && this.setValue(this.value), (e.has("hourFormat") || e.has("messages")) && this.updateLocale();
  }
  // #endregion
  // #region Private Methods
  blurHandler() {
    this.activeEl = void 0, this.pointerActivated = !1;
  }
  keyDownHandler(e) {
    this.pointerActivated = !1;
    const { defaultPrevented: i, key: s } = e;
    if (!i)
      switch (this.activeEl) {
        case this.hourEl:
          s === "ArrowRight" && (this.focusPart("minute"), e.preventDefault());
          break;
        case this.minuteEl:
          switch (s) {
            case "ArrowLeft":
              this.focusPart("hour"), e.preventDefault();
              break;
            case "ArrowRight":
              this.step !== 60 ? (this.focusPart("second"), e.preventDefault()) : this.effectiveHourFormat === "12" && (this.focusPart("meridiem"), e.preventDefault());
              break;
          }
          break;
        case this.secondEl:
          switch (s) {
            case "ArrowLeft":
              this.focusPart("minute"), e.preventDefault();
              break;
            case "ArrowRight":
              this.showFractionalSecond ? this.focusPart("fractionalSecond") : this.effectiveHourFormat === "12" && (this.focusPart("meridiem"), e.preventDefault());
              break;
          }
          break;
        case this.fractionalSecondEl:
          switch (s) {
            case "ArrowLeft":
              this.focusPart("second"), e.preventDefault();
              break;
            case "ArrowRight":
              this.effectiveHourFormat === "12" && (this.focusPart("meridiem"), e.preventDefault());
              break;
          }
          break;
        case this.meridiemEl:
          switch (s) {
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
    await E(this), this[`${e || "hour"}El`]?.focus();
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
      const s = parseInt(this[e]);
      i = s === 0 ? 59 : s - 1;
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
      const s = h(this.step), a = parseInt(this.fractionalSecond), n = a.toString().length;
      let r;
      n >= s ? r = i.padStart(s, "0") : n < s && (r = `${a}${i}`.padStart(s, "0")), this.setValuePart("fractionalSecond", parseFloat(`0.${r}`));
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
      const s = parseInt(i);
      let a;
      if (d(this.hour))
        switch (this.effectiveHourFormat) {
          case "12":
            a = this.hour === "01" && s >= 0 && s <= 2 ? `1${s}` : s;
            break;
          case "24":
            this.hour === "01" ? a = `1${s}` : this.hour === "02" && s >= 0 && s <= 3 ? a = `2${s}` : a = s;
            break;
        }
      else
        a = s;
      this.setValuePart("hour", a);
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
      const s = parseInt(i);
      let a;
      if (d(this.minute) && this.minute.startsWith("0")) {
        const n = parseInt(this.minute);
        a = n > z ? s : `${n}${s}`;
      } else
        a = s;
      this.setValuePart("minute", a);
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
    const i = g(this.step), s = h(this.step), a = parseInt(this.fractionalSecond), n = parseFloat(`0.${this.fractionalSecond}`);
    let r, l, c, u;
    e === "up" && (r = isNaN(a) ? 0 : n + i, l = parseFloat(r.toFixed(s)), c = g(l), u = l < 1 && h(c) > 0 ? p(c, s) : "".padStart(s, "0")), e === "down" && (r = isNaN(a) || a === 0 ? 1 - i : n - i, l = parseFloat(r.toFixed(s)), c = g(l), u = l < 1 && h(c) > 0 && Math.sign(c) === 1 ? p(c, s) : "".padStart(s, "0")), this.setValuePart("fractionalSecond", u);
  }
  sanitizeValue(e) {
    const { hour: i, minute: s, second: a, fractionalSecond: n } = v(e);
    if (n) {
      const r = this.sanitizeFractionalSecond(n);
      return `${i}:${s}:${a}.${r}`;
    }
    return D(e) && e;
  }
  sanitizeFractionalSecond(e) {
    return e && h(this.step) !== e.length ? parseFloat(`0.${e}`).toFixed(h(this.step)).replace("0.", "") : e;
  }
  secondKeyDownHandler(e) {
    const { key: i } = e;
    if (b.includes(i)) {
      const s = parseInt(i);
      let a;
      if (d(this.second) && this.second.startsWith("0")) {
        const n = parseInt(this.second);
        a = n > z ? s : `${n}${s}`;
      } else
        a = s;
      this.setValuePart("second", a);
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
      const { hour: i, minute: s, second: a, fractionalSecond: n } = v(e), { effectiveHourFormat: r, messages: { _lang: l }, numberingSystem: c } = this, { localizedHour: u, localizedHourSuffix: M, localizedMinute: F, localizedMinuteSuffix: P, localizedSecond: A, localizedDecimalSeparator: V, localizedFractionalSecond: y, localizedSecondSuffix: U, localizedMeridiem: $ } = H({
        value: e,
        locale: l,
        numberingSystem: c,
        hour12: r === "12"
      });
      this.hour = i, this.minute = s, this.second = a, this.fractionalSecond = this.sanitizeFractionalSecond(n), this.localizedHour = u, this.localizedHourSuffix = M, this.localizedMinute = F, this.localizedMinuteSuffix = P, this.localizedSecond = A, this.localizedDecimalSeparator = V, this.localizedFractionalSecond = y, this.localizedSecondSuffix = U, $ && (this.localizedMeridiem = $, this.meridiem = N(this.hour));
    } else
      this.hour = null, this.fractionalSecond = null, this.localizedHour = null, this.localizedHourSuffix = k("hour", this.messages._lang, this.numberingSystem), this.localizedMeridiem = null, this.localizedMinute = null, this.localizedMinuteSuffix = k("minute", this.messages._lang, this.numberingSystem), this.localizedSecond = null, this.localizedDecimalSeparator = x(this.messages._lang, this.numberingSystem), this.localizedFractionalSecond = null, this.localizedSecondSuffix = k("second", this.messages._lang, this.numberingSystem), this.meridiem = null, this.minute = null, this.second = null, this.value = null;
  }
  setValuePart(e, i) {
    const { effectiveHourFormat: s, messages: { _lang: a }, numberingSystem: n } = this, r = s === "12";
    if (e === "meridiem") {
      if (this.meridiem = i, d(this.hour)) {
        const u = parseInt(this.hour);
        switch (i) {
          case "AM":
            u >= 12 && (this.hour = p(u - 12));
            break;
          case "PM":
            u < 12 && (this.hour = p(u + 12));
            break;
        }
        this.localizedHour = S({
          value: this.hour,
          part: "hour",
          locale: a,
          numberingSystem: n,
          hour12: r
        });
      }
    } else if (e === "fractionalSecond") {
      const u = h(this.step);
      typeof i == "number" ? this.fractionalSecond = i === 0 ? "".padStart(u, "0") : p(i, u) : this.fractionalSecond = i, this.localizedFractionalSecond = S({
        value: this.fractionalSecond,
        part: "fractionalSecond",
        locale: a,
        numberingSystem: n,
        hour12: r
      });
    } else
      this[e] = typeof i == "number" ? p(i) : i, this[`localized${W(e)}`] = S({
        value: this[e],
        part: e,
        locale: a,
        numberingSystem: n,
        hour12: r
      });
    let l = !1, c;
    this.hour && this.minute ? (c = `${this.hour}:${this.minute}`, this.showSecond && (c = `${c}:${this.second ?? "00"}`, this.showFractionalSecond && this.fractionalSecond && (c = `${c}.${this.fractionalSecond}`))) : c = null, this.value !== c && (l = !0), this.value = c, this.localizedMeridiem = this.value ? H({
      hour12: r,
      locale: a,
      numberingSystem: n,
      value: this.value
    })?.localizedMeridiem || null : S({ value: this.meridiem, part: "meridiem", locale: a, numberingSystem: n }), l && this.calciteTimePickerChange.emit();
  }
  toggleSecond() {
    this.showSecond = this.step < 60, this.showFractionalSecond = h(this.step) > 0;
  }
  updateLocale() {
    this.effectiveHourFormat = this.hourFormat === "user" ? K(this.messages._lang) : this.hourFormat, this.localizedDecimalSeparator = x(this.messages._lang, this.numberingSystem), this.meridiemOrder = O(this.messages._lang), this.setValue(this.sanitizeValue(this.value));
  }
  // #endregion
  render() {
    const e = d(this.hour), i = R(this.scale), s = d(this.minute), a = d(this.second), n = d(this.fractionalSecond), r = this.messages._lang !== "bg" && this.localizedSecondSuffix, l = this.effectiveHourFormat === "12";
    return m`<div class=${o({
      [t.timePicker]: !0,
      [t.showMeridiem]: l,
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
    })} @click=${this.minuteUpClickHandler} role=button><calcite-icon icon=chevron-up .scale=${i}></calcite-icon></span><span .ariaLabel=${this.messages.minute} aria-valuemax=12 aria-valuemin=1 .ariaValueNow=${s && parseInt(this.minute) || "0"} .ariaValueText=${this.minute} class=${o({
      [t.input]: !0,
      [t.minute]: !0,
      [t.inputFocus]: this.activeEl && this.activeEl === this.minuteEl
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${this.minuteKeyDownHandler} role=spinbutton tabindex=0 ${f(this.setMinuteEl)}>${this.localizedMinute || "--"}</span><span .ariaLabel=${this.messages.minuteDown} class=${o({
      [t.button]: !0,
      [t.buttonMinuteDown]: !0
    })} @click=${this.minuteDownClickHandler} role=button><calcite-icon icon=chevron-down .scale=${i}></calcite-icon></span></div>${this.showSecond && m`<span class=${o({ [t.delimiter]: !0, [t.minuteSuffix]: !0 })}>${this.localizedMinuteSuffix}</span>` || ""}${this.showSecond && m`<div class=${o(t.column)} role=group><span .ariaLabel=${this.messages.secondUp} class=${o({
      [t.button]: !0,
      [t.buttonSecondUp]: !0
    })} @click=${this.secondUpClickHandler} role=button><calcite-icon icon=chevron-up .scale=${i}></calcite-icon></span><span .ariaLabel=${this.messages.second} aria-valuemax=59 aria-valuemin=0 .ariaValueNow=${a && parseInt(this.second) || "0"} .ariaValueText=${this.second} class=${o({
      [t.input]: !0,
      [t.second]: !0,
      [t.inputFocus]: this.activeEl && this.activeEl === this.secondEl
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${this.secondKeyDownHandler} role=spinbutton tabindex=0 ${f(this.setSecondEl)}>${this.localizedSecond || "--"}</span><span .ariaLabel=${this.messages.secondDown} class=${o({
      [t.button]: !0,
      [t.buttonSecondDown]: !0
    })} @click=${this.secondDownClickHandler} role=button><calcite-icon icon=chevron-down .scale=${i}></calcite-icon></span></div>` || ""}${this.showFractionalSecond && m`<span class=${o({ [t.delimiter]: !0, [t.decimalSeparator]: !0 })}>${this.localizedDecimalSeparator}</span>` || ""}${this.showFractionalSecond && m`<div class=${o(t.column)} role=group><span .ariaLabel=${this.messages.fractionalSecondUp} class=${o({
      [t.button]: !0,
      [t.buttonFractionalSecondUp]: !0
    })} @click=${this.fractionalSecondUpClickHandler} role=button><calcite-icon icon=chevron-up .scale=${i}></calcite-icon></span><span .ariaLabel=${this.messages.fractionalSecond} aria-valuemax=999 aria-valuemin=1 .ariaValueNow=${n && parseInt(this.fractionalSecond) || "0"} .ariaValueText=${this.localizedFractionalSecond} class=${o({
      [t.input]: !0,
      [t.fractionalSecond]: !0,
      [t.inputFocus]: this.activeEl && this.activeEl === this.fractionalSecondEl
    })} @click=${this.inputClickHandler} @focus=${this.focusHandler} @keydown=${this.fractionalSecondKeyDownHandler} role=spinbutton tabindex=0 ${f(this.setFractionalSecondEl)}>${this.localizedFractionalSecond || "--"}</span><span .ariaLabel=${this.messages.fractionalSecondDown} class=${o({
      [t.button]: !0,
      [t.buttonFractionalSecondDown]: !0
    })} @click=${this.fractionalSecondDownClickHandler} role=button><calcite-icon icon=chevron-down .scale=${i}></calcite-icon></span></div>` || ""}${r && m`<span class=${o({ [t.delimiter]: !0, [t.secondSuffix]: !0 })}>${this.localizedSecondSuffix}</span>` || ""}${l && m`<div class=${o({
      [t.column]: !0,
      [t.meridiemStart]: this.meridiemOrder === 0 || _(this.el) === "rtl"
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
T("calcite-time-picker", q);
export {
  q as TimePicker
};
