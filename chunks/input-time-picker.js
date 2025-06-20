import { N as J, d as y, a as Q, L as X, h as Y, s as u, E as d, x as g, c as Z } from "./iframe.js";
import { n as v } from "./ref.js";
import { c as ee, d as te, s as ie, H as ae } from "./form.js";
import { u as se, I as oe } from "./interactive.js";
import { c as ne, d as re, g as le } from "./label.js";
import { c as ce, g as de } from "./component.js";
import { d as f, g as C } from "./math.js";
import { V as ue } from "./Validation.js";
import { f as he, g as me } from "./dom.js";
import { s as pe } from "./input.js";
import { t as fe, u as ge } from "./useT9n.js";
import { i as m } from "./locale.js";
import { f as P, d as be, e as ve, t as U, i as Se, p as $e, j as we, g as K, a as O, b as ke, c as D, k as Pe, m as R } from "./time.js";
import { c as ye } from "./text.js";
import { n as I } from "./key.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
class xe extends J {
  constructor() {
    super(...arguments), this.localizedDecimalSeparator = ".", this.userChangedValue = !1, this.handleHourKeyDownEvent = (e) => {
      const t = e.key;
      if (I.includes(t)) {
        const i = parseInt(t);
        let a;
        if (m(this.hour))
          switch (this.hourFormat) {
            case "12":
              a = this.hour === "01" && i >= 0 && i <= 2 ? `1${i}` : i;
              break;
            case "24":
              this.hour === "01" ? a = `1${i}` : this.hour === "02" && i >= 0 && i <= 3 ? a = `2${i}` : a = i;
              break;
          }
        else
          a = i;
        this.setValuePart("hour", a);
      } else
        switch (t) {
          case "Backspace":
          case "Delete":
            e.preventDefault(), this.setValuePart("hour", null);
            break;
          case "ArrowDown":
            e.preventDefault(), this.decrementHour();
            break;
          case "ArrowUp":
            e.preventDefault(), this.incrementHour();
            break;
          case " ":
          case "Spacebar":
            e.preventDefault();
            break;
        }
    }, this.handleMinuteKeyDownEvent = (e) => {
      const t = e.key;
      if (I.includes(t)) {
        const i = parseInt(t);
        let a;
        if (m(this.minute) && this.minute.startsWith("0")) {
          const s = parseInt(this.minute);
          a = s > R ? i : `${s}${i}`;
        } else
          a = i;
        this.setValuePart("minute", a);
      } else
        switch (t) {
          case "Backspace":
          case "Delete":
            e.preventDefault(), this.setValuePart("minute", null);
            break;
          case "ArrowDown":
            e.preventDefault(), this.decrementMinute();
            break;
          case "ArrowUp":
            e.preventDefault(), this.incrementMinute();
            break;
          case " ":
          case "Spacebar":
            e.preventDefault();
            break;
        }
    }, this.handleSecondKeyDownEvent = (e) => {
      const t = e.key;
      if (I.includes(t)) {
        const i = parseInt(t);
        let a;
        if (m(this.second) && this.second.startsWith("0")) {
          const s = parseInt(this.second);
          a = s > R ? i : `${s}${i}`;
        } else
          a = i;
        this.setValuePart("second", a);
      } else
        switch (t) {
          case "Backspace":
          case "Delete":
            e.preventDefault(), this.setValuePart("second", null);
            break;
          case "ArrowDown":
            e.preventDefault(), this.decrementSecond();
            break;
          case "ArrowUp":
            e.preventDefault(), this.incrementSecond();
            break;
          case " ":
          case "Spacebar":
            e.preventDefault();
            break;
        }
    }, this.handleFractionalSecondKeyDownEvent = (e) => {
      const { key: t } = e;
      if (I.includes(t)) {
        const i = f(this.component.step), a = parseInt(this.fractionalSecond), s = a.toString().length;
        let r;
        s >= i ? r = t.padStart(i, "0") : s < i && (r = `${a}${t}`.padStart(i, "0")), this.setValuePart("fractionalSecond", parseFloat(`0.${r}`));
      } else
        switch (t) {
          case "Backspace":
          case "Delete":
            e.preventDefault(), this.setValuePart("fractionalSecond", null);
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
    }, this.handleMeridiemKeyDownEvent = (e) => {
      switch (e.key) {
        case "a":
          this.setValuePart("meridiem", "AM");
          break;
        case "p":
          this.setValuePart("meridiem", "PM");
          break;
        case "Backspace":
        case "Delete":
          e.preventDefault(), this.setValuePart("meridiem");
          break;
        case "ArrowUp":
        case "ArrowDown":
          e.preventDefault(), this.toggleMeridiem(e.key);
          break;
        case " ":
        case "Spacebar":
          e.preventDefault();
          break;
      }
    }, this.calciteTimeChange = y();
  }
  //#endregion
  //#region Private Methods
  hostConnected() {
    this.setHourFormat(), this.setMeridiemOrder(), this.setValue(this.component.value);
  }
  hostUpdate(e) {
    let t = !1, i = !1, a = !1;
    if (e.has("hourFormat") && (t = !0, a = !0), e.has("messages") && e.get("messages")?._lang !== this.component.messages._lang && (t = !0, i = !0, a = !0), e.has("numberingSystem") && (a = !0), e.has("step")) {
      const s = this.component.step, r = e.get("step");
      (s >= 60 && r > 0 && r < 60 || r >= 60 && s > 0 && s < 60) && (a = !0);
    }
    t && this.setHourFormat(), i && this.setMeridiemOrder(), a && this.setValue(this.component.value);
  }
  decrementHour() {
    const e = this.hour ? this.hour === "00" ? 23 : parseInt(this.hour) - 1 : 0;
    this.setValuePart("hour", e);
  }
  decrementMinute() {
    this.decrementMinuteOrSecond("minute");
  }
  decrementMinuteOrSecond(e) {
    let t;
    if (m(this[e])) {
      const i = parseInt(this[e]);
      t = i === 0 ? 59 : i - 1;
    } else
      t = 59;
    this.setValuePart(e, t);
  }
  decrementSecond() {
    this.decrementMinuteOrSecond("second");
  }
  incrementHour() {
    const e = m(this.hour) ? this.hour === "23" ? 0 : parseInt(this.hour) + 1 : 1;
    this.setValuePart("hour", e);
  }
  incrementMinute() {
    this.incrementMinuteOrSecond("minute");
  }
  incrementMinuteOrSecond(e) {
    const t = m(this[e]) ? this[e] === "59" ? 0 : parseInt(this[e]) + 1 : 0;
    this.setValuePart(e, t);
  }
  incrementSecond() {
    this.incrementMinuteOrSecond("second");
  }
  nudgeFractionalSecond(e) {
    const t = C(this.component.step), i = f(this.component.step), a = parseInt(this.fractionalSecond), s = parseFloat(`0.${this.fractionalSecond}`);
    let r, n, l, c;
    e === "up" && (r = isNaN(a) ? 0 : s + t, n = parseFloat(r.toFixed(i)), l = C(n), c = n < 1 && f(l) > 0 ? P(l, i) : "".padStart(i, "0")), e === "down" && (r = isNaN(a) || a === 0 ? 1 - t : s - t, n = parseFloat(r.toFixed(i)), l = C(n), c = n < 1 && f(l) > 0 && Math.sign(l) === 1 ? P(l, i) : "".padStart(i, "0")), this.setValuePart("fractionalSecond", c);
  }
  setHourFormat() {
    const { hourFormat: e, messages: t } = this.component, i = t._lang;
    this.hourFormat = e === "user" ? be(i) : e;
  }
  setMeridiemOrder() {
    const { messages: e } = this.component, t = e._lang;
    this.meridiemOrder = ve(t);
  }
  toggleMeridiem(e) {
    let t;
    this.meridiem ? t = this.meridiem === "AM" ? "PM" : "AM" : t = e === "ArrowDown" ? "PM" : "AM", this.setValuePart("meridiem", t);
  }
  setValue(e, t = !1) {
    const { messages: i, numberingSystem: a, step: s, value: r } = this.component, n = i._lang, l = this.hourFormat === "12", c = U(e, s);
    if (Se(e)) {
      const { hour: S, minute: x, second: b, fractionalSecond: $ } = $e(c, s), {
        hour: w,
        hourSuffix: p,
        minute: h,
        minuteSuffix: z,
        second: E,
        secondSuffix: V,
        decimalSeparator: F,
        fractionalSecond: M,
        meridiem: k
      } = we({
        hour12: l,
        locale: n,
        numberingSystem: a,
        parts: !0,
        step: s,
        value: c
      });
      this.hour = S, this.minute = x, this.second = b, this.fractionalSecond = $, this.localizedHour = w, this.localizedHourSuffix = p, this.localizedMinute = h, this.localizedMinuteSuffix = z, this.localizedSecond = E, this.localizedDecimalSeparator = F, this.localizedFractionalSecond = M, this.localizedSecondSuffix = V, k && (this.meridiem = K(this.hour), this.localizedMeridiem = k);
    } else
      this.hour = null, this.minute = null, this.second = null, this.fractionalSecond = null, this.meridiem = null, this.localizedHour = null, this.localizedHourSuffix = O("hour", n, a), this.localizedMinute = null, this.localizedMinuteSuffix = O("minute", n, a), this.localizedSecond = null, this.localizedDecimalSeparator = ke(n, a), this.localizedFractionalSecond = null, this.localizedSecondSuffix = O("second", n, a), this.localizedMeridiem = null;
    c !== r ? (this.userChangedValue = t, this.component.value = c ?? "") : this.component.requestUpdate();
  }
  setValuePart(e, t) {
    const { hourFormat: i } = this, { messages: a, numberingSystem: s, step: r } = this.component, n = a._lang, l = i === "12", c = this.component.value;
    if (e === "meridiem") {
      const p = this.meridiem;
      if (this.meridiem = t, this.localizedMeridiem = D({
        hour12: l,
        locale: n,
        numberingSystem: s,
        part: "meridiem",
        value: this.meridiem
      }), m(this.hour)) {
        const h = parseInt(this.hour);
        switch (t) {
          case "AM":
            h >= 12 && (this.hour = P(h - 12));
            break;
          case "PM":
            h < 12 && (this.hour = P(h + 12));
            break;
          default:
            this.component.value = "";
            break;
        }
        this.localizedHour = D({
          hour12: l,
          locale: n,
          numberingSystem: s,
          part: "hour",
          value: this.hour
        });
      }
      p !== this.meridiem && this.component.requestUpdate();
    } else if (e === "fractionalSecond") {
      const p = this.fractionalSecond, h = f(r);
      typeof t == "number" ? this.fractionalSecond = t === 0 ? "".padStart(h, "0") : P(t, h) : this.fractionalSecond = t, this.localizedFractionalSecond = D({
        value: this.fractionalSecond,
        part: "fractionalSecond",
        locale: n,
        numberingSystem: s,
        hour12: l
      }), p !== this.fractionalSecond && this.component.requestUpdate();
    } else {
      const p = this[e];
      this[e] = typeof t == "number" ? P(t) : t, this[`localized${ye(e)}`] = D({
        value: this[e],
        part: e,
        locale: n,
        numberingSystem: s,
        hour12: l
      }), p !== this[e] && this.component.requestUpdate();
    }
    const { hour: S, minute: x, second: b, fractionalSecond: $ } = this, w = U({ hour: S, minute: x, second: b, fractionalSecond: $ }, r);
    c !== w && (e === "hour" && i === "12" && (this.meridiem = K(S), this.localizedMeridiem = Pe({ locale: n, meridiem: this.meridiem })), this.userChangedValue = !0, this.calciteTimeChange.emit(w ?? ""));
  }
  //#endregion
}
const Fe = fe(xe), Me = Q`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}.container{--calcite-icon-color: var(--calcite-color-text-3);align-items:center;background-color:var(--calcite-color-foreground-1);border:1px solid var(--calcite-color-border-input);box-sizing:border-box;display:flex;color:var(--calcite-color-text-1);flex-wrap:nowrap;font-weight:var(--calcite-font-weight-normal);inline-size:100%;padding-block:var(--calcite-spacing-base);-webkit-user-select:none;user-select:none}.container:focus-within{border-color:var(--calcite-color-brand);outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container.read-only{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}.input-container{display:flex;flex-grow:1}.input{align-items:center;display:flex;block-size:100%;justify-content:center;min-inline-size:max-content}.input.empty{inline-size:var(--calcite-spacing-xl)}.input:focus,.input:hover:focus{background-color:Highlight;color:HighlightText;outline:2px solid transparent;outline-offset:2px}.toggle-icon{align-items:center;block-size:24px;cursor:pointer;display:flex;inline-size:24px;justify-content:center}.toggle-icon:hover{--calcite-icon-color: var(--calcite-color-text-1)}.meridiem--start{margin-inline-end:var(--calcite-spacing-xxs)}.meridiem--end{margin-inline-start:var(--calcite-spacing-xxs)}:host([scale=s]) .container{block-size:1.5rem;font-size:var(--calcite-font-size-sm);gap:var(--calcite-spacing-sm);padding-inline-start:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s]) .input-container{line-height:1rem}:host([scale=m]) .container{block-size:2rem;font-size:var(--calcite-font-size);gap:var(--calcite-spacing-md);padding-inline-start:var(--calcite-spacing-md);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .input-container{line-height:1.5rem}:host([scale=l]) .container{block-size:2.75rem;font-size:var(--calcite-font-size-md);gap:var(--calcite-spacing-lg);padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .input-container{line-height:2.25rem}:host([status=invalid]) .container{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) .container:focus-within{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`, o = {
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
}, T = {
  inputContainer: "inputContainer",
  validationMessage: "inputTimePickerValidationMessage"
};
class ze extends X {
  constructor() {
    super(), this.messages = ge(), this.time = Fe(this), this.disabled = !1, this.focusTrapDisabled = !1, this.hourFormat = "user", this.open = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.step = 60, this.validity = {
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
    }, this.calciteInputTimePickerBeforeClose = y({ cancelable: !1 }), this.calciteInputTimePickerBeforeOpen = y({ cancelable: !1 }), this.calciteInputTimePickerChange = y(), this.calciteInputTimePickerClose = y({ cancelable: !1 }), this.calciteInputTimePickerOpen = y({ cancelable: !1 }), this.listen("blur", this.blurHandler), this.listen("keydown", this.keyDownHandler), this.listen("calciteTimeChange", this.timeChangeHandler);
  }
  static {
    this.properties = { disabled: 7, focusTrapDisabled: 7, form: 3, hourFormat: 3, label: 1, max: 3, messageOverrides: 0, min: 3, name: 1, numberingSystem: 3, open: 7, overlayPositioning: 1, placement: 3, readOnly: 7, required: 7, scale: 3, status: 3, step: 11, validationIcon: [3, { converter: Y }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = Me;
  }
  async reposition(e = !1) {
    this.popoverEl?.reposition(e);
  }
  async setFocus() {
    await ce(this), he(this.el);
  }
  connectedCallback() {
    super.connectedCallback(), ne(this), ee(this);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && (this.disabled || (this.open = !1)), e.has("readOnly") && (this.hasUpdated || this.readOnly !== !1) && (this.readOnly || (this.open = !1)), e.has("value") && (this.hasUpdated ? (this.time.userChangedValue || (this.previousEmittedValue = this.value), this.time.setValue(this.value)) : this.previousEmittedValue = this.value);
  }
  updated() {
    se(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), re(this), te(this);
  }
  blurHandler() {
    this.changeEventHandler();
  }
  changeEventHandler() {
    const { previousEmittedValue: e, value: t } = this;
    e !== t && (this.calciteInputTimePickerChange.emit().defaultPrevented ? this.time.setValue(this.previousEmittedValue) : this.previousEmittedValue = t);
  }
  keyDownHandler(e) {
    const { defaultPrevented: t, key: i } = e, { hourFormat: a, meridiemOrder: s } = this.time;
    if (!t)
      if (i === "Enter")
        ie(this) && e.preventDefault(), this.changeEventHandler();
      else if (this.open && this.focusTrapDisabled && i === "Escape")
        this.open = !1, e.preventDefault();
      else {
        const r = f(this.step) > 0, n = this.step < 60;
        switch (this.activeEl) {
          case this.hourEl:
            i === "ArrowRight" ? this.setFocusPart("minute") : i === "ArrowLeft" && a === "12" && s === 0 && this.setFocusPart("meridiem");
            break;
          case this.minuteEl:
            switch (i) {
              case "ArrowLeft":
                this.setFocusPart("hour");
                break;
              case "ArrowRight":
                this.step !== 60 ? this.setFocusPart("second") : a === "12" && this.setFocusPart("meridiem");
                break;
            }
            break;
          case this.secondEl:
            switch (i) {
              case "ArrowLeft":
                this.setFocusPart("minute");
                break;
              case "ArrowRight":
                f(this.step) > 0 ? this.setFocusPart("fractionalSecond") : a === "12" && this.setFocusPart("meridiem");
                break;
            }
            break;
          case this.fractionalSecondEl:
            switch (i) {
              case "ArrowLeft":
                this.setFocusPart("second");
                break;
              case "ArrowRight":
                a === "12" && s !== 0 && this.setFocusPart("meridiem");
                break;
            }
            break;
          case this.meridiemEl:
            i === "ArrowLeft" && s !== 0 ? r ? this.setFocusPart("fractionalSecond") : n ? this.setFocusPart("second") : this.setFocusPart("minute") : i === "ArrowRight" && s === 0 && this.setFocusPart("hour");
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
  setContainerEl(e) {
    this.containerEl = e;
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
    pe("time", this, e);
  }
  timeChangeHandler(e) {
    if (e.stopPropagation(), this.disabled)
      return;
    const t = e.detail;
    t !== this.value && (this.value = t);
  }
  timePartFocusHandler(e) {
    this.activeEl = e.currentTarget;
  }
  timePickerChangeHandler(e) {
    e.stopPropagation(), this.time.setValue(e.target.value, !0);
  }
  toggleIconClickHandler() {
    this.open = !this.open;
  }
  render() {
    const { messages: e, readOnly: t, scale: i } = this, { fractionalSecond: a, handleHourKeyDownEvent: s, handleMinuteKeyDownEvent: r, handleSecondKeyDownEvent: n, handleFractionalSecondKeyDownEvent: l, hour: c, hourFormat: S, localizedDecimalSeparator: x, localizedFractionalSecond: b, localizedHour: $, localizedHourSuffix: w, localizedMinute: p, localizedMinuteSuffix: h, localizedSecond: z, localizedSecondSuffix: E, meridiemOrder: V, minute: F, second: M } = this.time, k = "--", q = m(a), j = m(c), W = m(F), G = m(M), A = f(this.step) > 0, L = S === "12", N = this.step < 60, B = V === 0 || me(this.el) === "rtl", H = !this.disabled && !this.readOnly;
    return oe({ disabled: this.disabled, children: g`<div aria-controls=${o.inputContainer} aria-labelledby=${T.inputContainer} class=${u({
      [o.container]: !0,
      [o.readOnly]: t
    })} role=combobox ${v(this.setContainerEl)}><calcite-icon class=${u(o.clockIcon)} icon=clock .scale=${i === "l" ? "m" : "s"}></calcite-icon><div aria-label=${le(this) ?? d} class=${u(o.inputContainer)} dir=ltr id=${T.inputContainer} role=group>${L && B && this.renderMeridiem("start") || ""}<span aria-label=${this.messages.hour ?? d} aria-valuemax=23 aria-valuemin=1 aria-valuenow=${j && parseInt(c) || "0"} aria-valuetext=${c ?? d} class=${u({
      [o.empty]: !$,
      [o.hour]: !0,
      [o.input]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${H ? s : void 0} role=spinbutton tabindex=0 ${v(this.setHourEl)}>${$ || k}</span><span class=${u(o.hourSuffix)}>${w}</span><span aria-label=${this.messages.minute ?? d} aria-valuemax=12 aria-valuemin=1 aria-valuenow=${W && parseInt(F) || "0"} aria-valuetext=${F ?? d} class=${u({
      [o.empty]: !p,
      [o.input]: !0,
      [o.minute]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${H ? r : void 0} role=spinbutton tabindex=0 ${v(this.setMinuteEl)}>${p || k}</span>${N && g`<span class=${u(o.minuteSuffix)}>${h}</span>` || ""}${N && g`<span aria-label=${this.messages.second ?? d} aria-valuemax=59 aria-valuemin=0 aria-valuenow=${G && parseInt(M) || "0"} aria-valuetext=${M ?? d} class=${u({
      [o.empty]: !z,
      [o.input]: !0,
      [o.second]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${H ? n : void 0} role=spinbutton tabindex=0 ${v(this.setSecondEl)}>${z || k}</span>` || ""}${A && g`<span class=${u(o.decimalSeparator)}>${x}</span>` || ""}${A && g`<span aria-label=${this.messages.fractionalSecond ?? d} aria-valuemax=999 aria-valuemin=1 aria-valuenow=${q && parseInt(a) || "0"} aria-valuetext=${b ?? d} class=${u({
      [o.empty]: !b,
      [o.fractionalSecond]: !0,
      [o.input]: !0
    })} @focus=${this.timePartFocusHandler} @keydown=${H ? l : void 0} role=spinbutton tabindex=0 ${v(this.setFractionalSecondEl)}>${b || "".padStart(f(this.step), "-")}</span>` || ""}${E && g`<span class=${u(o.secondSuffix)}>${E}</span>` || ""}${L && !B && this.renderMeridiem("end") || ""}</div>${!this.readOnly && this.renderToggleIcon(this.open) || ""}</div><calcite-popover auto-close .focusTrapDisabled=${this.focusTrapDisabled} .focusTrapOptions=${{ initialFocus: !1 }} .label=${e.chooseTime} lang=${this.messages._lang ?? d} @calcitePopoverBeforeClose=${this.popoverBeforeCloseHandler} @calcitePopoverBeforeOpen=${this.popoverBeforeOpenHandler} @calcitePopoverClose=${this.popoverCloseHandler} @calcitePopoverOpen=${this.popoverOpenHandler} .overlayPositioning=${this.overlayPositioning} .placement=${this.placement} .referenceElement=${this.containerEl} trigger-disabled ${v(this.setCalcitePopoverEl)}><calcite-time-picker .hourFormat=${this.time.hourFormat} lang=${this.messages._lang ?? d} .messageOverrides=${this.messageOverrides} .numberingSystem=${this.numberingSystem} @calciteTimePickerChange=${this.timePickerChangeHandler} .scale=${this.scale} .step=${this.step} tabindex=${(this.open ? void 0 : -1) ?? d} .value=${this.value}></calcite-time-picker></calcite-popover>${ae({ component: this })}${this.validationMessage && this.status === "invalid" ? ue({ icon: this.validationIcon, id: T.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderMeridiem(e) {
    const { handleMeridiemKeyDownEvent: t, localizedMeridiem: i, meridiem: a } = this.time, s = !this.disabled && !this.readOnly;
    return g`<span aria-label=${this.messages.meridiem ?? d} aria-valuemax=2 aria-valuemin=1 aria-valuenow=${a === "PM" && "2" || "1"} aria-valuetext=${a ?? d} class=${u({
      [o.empty]: !i,
      [o.input]: !0,
      [o.meridiem]: !0,
      [o.meridiemStart]: e === "start",
      [o.meridiemEnd]: e === "end"
    })} @focus=${this.timePartFocusHandler} @keydown=${s ? t : void 0} role=spinbutton tabindex=0 ${v(this.setMeridiemEl)}>${i || "--"}</span>`;
  }
  renderToggleIcon(e) {
    return g`<span class=${u(o.toggleIcon)} @click=${this.toggleIconClickHandler}><calcite-icon .icon=${e ? "chevron-up" : "chevron-down"} .scale=${de(this.scale)}></calcite-icon></span>`;
  }
}
Z("calcite-input-time-picker", ze);
export {
  ze as InputTimePicker
};
