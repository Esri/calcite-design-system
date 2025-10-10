import { t as N } from "./index2.js";
import { G as T, c as $ } from "./index.js";
import { f as d, g as v, a as U, t as F, i as y, p as C, l as E, b as k, c as D, d as K, e as S, h as _, m as P } from "./time.js";
import { d as m, g as z } from "./math.js";
import { i as h } from "./locale.js";
import { c as B } from "./text.js";
import { n as g } from "./key.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
class L extends T {
  constructor() {
    super(...arguments), this.localizedDecimalSeparator = ".", this.userChangedValue = !1, this.handleHourKeyDownEvent = (e) => {
      const t = e.key;
      if (g.includes(t)) {
        const i = parseInt(t);
        let s;
        if (h(this.hour))
          switch (this.hourFormat) {
            case "12":
              s = this.hour === "01" && i >= 0 && i <= 2 ? `1${i}` : i;
              break;
            case "24":
              this.hour === "01" ? s = `1${i}` : this.hour === "02" && i >= 0 && i <= 3 ? s = `2${i}` : s = i;
              break;
          }
        else
          s = i;
        this.setValuePart("hour", s);
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
      if (g.includes(t)) {
        const i = parseInt(t);
        let s;
        if (h(this.minute) && this.minute.startsWith("0")) {
          const a = parseInt(this.minute);
          s = a > P ? i : `${a}${i}`;
        } else
          s = i;
        this.setValuePart("minute", s);
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
      if (g.includes(t)) {
        const i = parseInt(t);
        let s;
        if (h(this.second) && this.second.startsWith("0")) {
          const a = parseInt(this.second);
          s = a > P ? i : `${a}${i}`;
        } else
          s = i;
        this.setValuePart("second", s);
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
      if (g.includes(t)) {
        const i = m(this.component.step), s = parseInt(this.fractionalSecond), a = s.toString().length;
        let o;
        a >= i ? o = t.padStart(i, "0") : a < i && (o = `${s}${t}`.padStart(i, "0")), this.setValuePart("fractionalSecond", parseFloat(`0.${o}`));
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
          e.preventDefault(), this.toggleMeridiem("up");
          break;
        case "ArrowDown":
          e.preventDefault(), this.toggleMeridiem("down");
          break;
        case " ":
        case "Spacebar":
          e.preventDefault();
          break;
      }
    }, this.calciteTimeChange = $();
  }
  //#endregion
  //#region Public Methods
  decrementHour() {
    const e = this.hour ? this.hour === "00" ? 23 : parseInt(this.hour) - 1 : 0;
    this.setValuePart("hour", e);
  }
  decrementMinute() {
    this.decrementMinuteOrSecond("minute");
  }
  decrementSecond() {
    this.decrementMinuteOrSecond("second");
  }
  incrementHour() {
    const e = h(this.hour) ? this.hour === "23" ? 0 : parseInt(this.hour) + 1 : 1;
    this.setValuePart("hour", e);
  }
  incrementMinute() {
    this.incrementMinuteOrSecond("minute");
  }
  incrementSecond() {
    this.incrementMinuteOrSecond("second");
  }
  nudgeFractionalSecond(e) {
    const t = z(this.component.step), i = m(this.component.step), s = parseInt(this.fractionalSecond), a = parseFloat(`0.${this.fractionalSecond}`);
    let o, r, n, c;
    e === "up" && (o = isNaN(s) ? 0 : a + t, r = parseFloat(o.toFixed(i)), n = z(r), c = r < 1 && m(n) > 0 ? d(n, i) : "".padStart(i, "0")), e === "down" && (o = isNaN(s) || s === 0 ? 1 - t : a - t, r = parseFloat(o.toFixed(i)), n = z(r), c = r < 1 && m(n) > 0 && Math.sign(n) === 1 ? d(n, i) : "".padStart(i, "0")), this.setValuePart("fractionalSecond", c);
  }
  toggleMeridiem(e) {
    let t;
    this.meridiem ? t = this.meridiem === "AM" ? "PM" : "AM" : t = e === "down" ? "PM" : "AM", this.setValuePart("meridiem", t);
  }
  //#endregion
  //#region Private Methods
  hostConnected() {
    this.setHourFormat(), this.setMeridiemOrder(), this.setValue(this.component.value);
  }
  hostUpdate(e) {
    let t = !1, i = !1, s = !1;
    if (e.has("hourFormat") && (t = !0, s = !0), e.has("messages") && e.get("messages")?._lang !== this.component.messages._lang && (t = !0, i = !0, s = !0), e.has("numberingSystem") && (s = !0), e.has("step")) {
      const a = this.component.step, o = e.get("step");
      (a >= 60 && o > 0 && o < 60 || o >= 60 && a > 0 && a < 60) && (s = !0);
    }
    t && this.setHourFormat(), i && this.setMeridiemOrder(), s && this.setValue(this.component.value);
  }
  decrementMinuteOrSecond(e) {
    let t;
    if (h(this[e])) {
      const i = parseInt(this[e]);
      t = i === 0 ? 59 : i - 1;
    } else
      t = 59;
    this.setValuePart(e, t);
  }
  incrementMinuteOrSecond(e) {
    const t = h(this[e]) ? this[e] === "59" ? 0 : parseInt(this[e]) + 1 : 0;
    this.setValuePart(e, t);
  }
  setHourFormat() {
    const { hourFormat: e, messages: t } = this.component, i = t._lang;
    this.hourFormat = e === "user" ? v(i) : e;
  }
  setMeridiemOrder() {
    const { messages: e } = this.component, t = e._lang;
    this.meridiemOrder = U(t);
  }
  setValue(e, t = !1) {
    const { messages: i, numberingSystem: s, step: a, value: o } = this.component, r = i._lang, n = this.hourFormat === "12", c = F(e, a);
    if (y(e)) {
      const { hour: p, minute: M, second: b, fractionalSecond: w } = C(c, a), {
        hour: f,
        hourSuffix: u,
        minute: l,
        minuteSuffix: A,
        second: H,
        secondSuffix: x,
        decimalSeparator: I,
        fractionalSecond: O,
        meridiem: V
      } = E({
        hour12: n,
        locale: r,
        numberingSystem: s,
        parts: !0,
        step: a,
        value: c
      });
      this.hour = p, this.minute = M, this.second = b, this.fractionalSecond = w, this.localizedHour = f, this.localizedHourSuffix = u, this.localizedMinute = l, this.localizedMinuteSuffix = A, this.localizedSecond = H, this.localizedDecimalSeparator = I, this.localizedFractionalSecond = O, this.localizedSecondSuffix = x, V && (this.meridiem = k(this.hour), this.localizedMeridiem = V);
    } else
      this.hour = null, this.minute = null, this.second = null, this.fractionalSecond = null, this.meridiem = null, this.localizedHour = null, this.localizedHourSuffix = D("hour", r, s), this.localizedMinute = null, this.localizedMinuteSuffix = D("minute", r, s), this.localizedSecond = null, this.localizedDecimalSeparator = K(r, s), this.localizedFractionalSecond = null, this.localizedSecondSuffix = D("second", r, s), this.localizedMeridiem = null;
    c !== o ? (this.userChangedValue = t, this.component.value = c ?? "") : this.component.requestUpdate();
  }
  setValuePart(e, t) {
    const { hourFormat: i } = this, { messages: s, numberingSystem: a, step: o } = this.component, r = s._lang, n = i === "12", c = this.component.value;
    if (e === "meridiem") {
      const u = this.meridiem;
      if (this.meridiem = t, this.localizedMeridiem = S({
        hour12: n,
        locale: r,
        numberingSystem: a,
        part: "meridiem",
        value: this.meridiem
      }), h(this.hour)) {
        const l = parseInt(this.hour);
        switch (t) {
          case "AM":
            l >= 12 && (this.hour = d(l - 12));
            break;
          case "PM":
            l < 12 && (this.hour = d(l + 12));
            break;
          default:
            this.component.value = "";
            break;
        }
        this.localizedHour = S({
          hour12: n,
          locale: r,
          numberingSystem: a,
          part: "hour",
          value: this.hour
        });
      }
      u !== this.meridiem && this.component.requestUpdate();
    } else if (e === "fractionalSecond") {
      const u = this.fractionalSecond, l = m(o);
      typeof t == "number" ? this.fractionalSecond = t === 0 ? "".padStart(l, "0") : d(t, l) : this.fractionalSecond = t, this.localizedFractionalSecond = S({
        value: this.fractionalSecond,
        part: "fractionalSecond",
        locale: r,
        numberingSystem: a,
        hour12: n
      }), u !== this.fractionalSecond && this.component.requestUpdate();
    } else {
      const u = this[e];
      this[e] = typeof t == "number" ? d(t) : t, this[`localized${B(e)}`] = S({
        value: this[e],
        part: e,
        locale: r,
        numberingSystem: a,
        hour12: n
      }), u !== this[e] && this.component.requestUpdate();
    }
    const { hour: p, minute: M, second: b, fractionalSecond: w } = this, f = F({ hour: p, minute: M, second: b, fractionalSecond: w }, o);
    c !== f && (e === "hour" && i === "12" && (this.meridiem = k(p), this.localizedMeridiem = _({ locale: r, meridiem: this.meridiem })), this.userChangedValue = !0, this.calciteTimeChange.emit(f ?? ""));
  }
  //#endregion
}
const Y = N(L);
export {
  Y as u
};
