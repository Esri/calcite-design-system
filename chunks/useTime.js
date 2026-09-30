/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { t as F } from "./index2.js";
import { G as A, c as H } from "./index.js";
import { f as d, g as I, a as v, t as z, i as x, p as y, l as O, b as P, c as D, d as T, e as S, h as N, m as k } from "./time.js";
import { d as p, g as V } from "./math.js";
import { i as h } from "./locale.js";
import { n as g } from "./key.js";
const $ = {
  hour: "localizedHour",
  minute: "localizedMinute",
  second: "localizedSecond"
};
class C extends A {
  constructor() {
    super(...arguments), this.localizedDecimalSeparator = ".", this.userChangedValue = !1, this.handleHourKeyDownEvent = (e) => {
      const t = e.key;
      if (g.includes(t)) {
        const i = parseInt(t, 10);
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
            e.preventDefault(), this.setValuePart("hour", void 0);
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
        const i = parseInt(t, 10);
        let s;
        if (typeof this.minute == "string" && h(this.minute) && this.minute.startsWith("0")) {
          const a = parseInt(this.minute, 10);
          s = a > k ? i : `${a}${i}`;
        } else
          s = i;
        this.setValuePart("minute", s);
      } else
        switch (t) {
          case "Backspace":
          case "Delete":
            e.preventDefault(), this.setValuePart("minute", void 0);
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
        const i = parseInt(t, 10);
        let s;
        if (typeof this.second == "string" && h(this.second) && this.second.startsWith("0")) {
          const a = parseInt(this.second, 10);
          s = a > k ? i : `${a}${i}`;
        } else
          s = i;
        this.setValuePart("second", s);
      } else
        switch (t) {
          case "Backspace":
          case "Delete":
            e.preventDefault(), this.setValuePart("second", void 0);
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
        const i = p(this.component.step), s = parseInt(this.fractionalSecond, 10), a = s.toString().length;
        let o;
        a >= i ? o = t.padStart(i, "0") : a < i && (o = `${s}${t}`.padStart(i, "0")), this.setValuePart("fractionalSecond", parseFloat(`0.${o}`));
      } else
        switch (t) {
          case "Backspace":
          case "Delete":
            e.preventDefault(), this.setValuePart("fractionalSecond", void 0);
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
    }, this.calciteTimeChange = H();
  }
  get hasValue() {
    return !!(this?.hour || this?.minute || this?.second || this?.fractionalSecond || this?.meridiem);
  }
  //#endregion
  //#region Public Methods
  decrementHour() {
    const e = this.hour ? this.hour === "00" ? 23 : parseInt(this.hour, 10) - 1 : 0;
    this.setValuePart("hour", e);
  }
  decrementMinute() {
    this.decrementMinuteOrSecond("minute");
  }
  decrementSecond() {
    this.decrementMinuteOrSecond("second");
  }
  incrementHour() {
    const e = typeof this.hour == "string" && h(this.hour) ? this.hour === "23" ? 0 : parseInt(this.hour, 10) + 1 : 1;
    this.setValuePart("hour", e);
  }
  incrementMinute() {
    this.incrementMinuteOrSecond("minute");
  }
  incrementSecond() {
    this.incrementMinuteOrSecond("second");
  }
  nudgeFractionalSecond(e) {
    const t = V(this.component.step), i = p(this.component.step), s = parseInt(this.fractionalSecond, 10), a = parseFloat(`0.${this.fractionalSecond}`);
    let o, r, n, l;
    e === "up" && (o = isNaN(s) ? 0 : a + t, r = parseFloat(o.toFixed(i)), n = V(r), l = r < 1 && p(n) > 0 ? d(n, i) : "".padStart(i, "0")), e === "down" && (o = isNaN(s) || s === 0 ? 1 - t : a - t, r = parseFloat(o.toFixed(i)), n = V(r), l = r < 1 && p(n) > 0 && Math.sign(n) === 1 ? d(n, i) : "".padStart(i, "0")), this.setValuePart("fractionalSecond", l);
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
    t && this.setHourFormat(), i && this.setMeridiemOrder(), s && this.setValue(this.component.value), this.userChangedValue = !1;
  }
  decrementMinuteOrSecond(e) {
    let t;
    if (h(this[e])) {
      const i = parseInt(this[e], 10);
      t = i === 0 ? 59 : i - 1;
    } else
      t = 59;
    this.setValuePart(e, t);
  }
  incrementMinuteOrSecond(e) {
    const t = h(this[e]) ? this[e] === "59" ? 0 : parseInt(this[e], 10) + 1 : 0;
    this.setValuePart(e, t);
  }
  setHourFormat() {
    const { hourFormat: e, messages: t } = this.component;
    this.hourFormat = e === "user" ? I(t._lang) : e;
  }
  setMeridiemOrder() {
    const { messages: e } = this.component;
    this.meridiemOrder = v(e._lang);
  }
  setValue(e, t = !1) {
    const { messages: i, numberingSystem: s, step: a, value: o } = this.component, r = i._lang, n = this.hourFormat === "12", l = z(e, a);
    if (x(e)) {
      const { hour: f, minute: b, second: M, fractionalSecond: w } = y(l, a), c = O({
        hour12: n,
        locale: r,
        numberingSystem: s,
        parts: !0,
        step: a,
        value: l
      });
      this.hour = f, this.minute = b, this.second = M, this.fractionalSecond = w, c && (this.localizedHour = c.hour, this.localizedHourSuffix = c.hourSuffix, this.localizedMinute = c.minute, this.localizedMinuteSuffix = c.minuteSuffix, this.localizedSecond = c.second, this.localizedDecimalSeparator = c.decimalSeparator, this.localizedFractionalSecond = c.fractionalSecond, this.localizedSecondSuffix = c.secondSuffix, c.meridiem && (this.meridiem = P(this.hour), this.localizedMeridiem = c.meridiem));
    } else
      this.hour = null, this.minute = null, this.second = null, this.fractionalSecond = null, this.meridiem = null, this.localizedHour = null, this.localizedHourSuffix = D({ hour12: n, part: "hour", locale: r, numberingSystem: s, step: a }), this.localizedMinute = null, this.localizedMinuteSuffix = D({
        hour12: n,
        part: "minute",
        locale: r,
        numberingSystem: s,
        step: a
      }), this.localizedSecond = null, this.localizedDecimalSeparator = T(r, s), this.localizedFractionalSecond = null, this.localizedSecondSuffix = D({
        hour12: n,
        part: "second",
        locale: r,
        numberingSystem: s,
        step: a
      }), this.localizedMeridiem = null;
    l !== o ? (this.userChangedValue = t, this.component.value = l ?? "") : this.component.requestUpdate();
  }
  setValuePart(e, t) {
    const { hourFormat: i } = this, { messages: s, numberingSystem: a, step: o } = this.component, r = s._lang, n = i === "12", l = this.component.value;
    if (e === "meridiem") {
      const m = this.meridiem;
      if (this.meridiem = t, this.localizedMeridiem = S({
        hour12: n,
        locale: r,
        numberingSystem: a,
        part: "meridiem",
        value: this.meridiem
      }), h(this.hour)) {
        const u = parseInt(this.hour, 10);
        switch (t) {
          case "AM":
            u >= 12 && (this.hour = d(u - 12));
            break;
          case "PM":
            u < 12 && (this.hour = d(u + 12));
            break;
          default:
            this.userChangedValue = !0, this.component.value = "";
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
      m !== this.meridiem && this.component.requestUpdate();
    } else if (e === "fractionalSecond") {
      const m = this.fractionalSecond, u = p(o);
      typeof t == "number" ? this.fractionalSecond = t === 0 ? "".padStart(u, "0") : d(t, u) : this.fractionalSecond = t, this.localizedFractionalSecond = S({
        value: this.fractionalSecond,
        part: "fractionalSecond",
        locale: r,
        numberingSystem: a,
        hour12: n
      }), m !== this.fractionalSecond && this.component.requestUpdate();
    } else {
      const m = this[e];
      this[e] = typeof t == "number" ? d(t) : t, this[$[e]] = S({
        value: this[e],
        part: e,
        locale: r,
        numberingSystem: a,
        hour12: n
      }), m !== this[e] && this.component.requestUpdate();
    }
    const { hour: f, minute: b, second: M, fractionalSecond: w } = this, c = z({ hour: f, minute: b, second: M, fractionalSecond: w }, o);
    l !== c && (e === "hour" && i === "12" && (this.meridiem = P(f), this.localizedMeridiem = N({ locale: r, meridiem: this.meridiem })), this.userChangedValue = !0, this.calciteTimeChange.emit(c ?? ""));
  }
  //#endregion
}
const G = F(C);
export {
  G as u
};
