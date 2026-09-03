/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as p, L as y, c as v, l as x, s as S, b as g, d as R } from "./index.js";
import { d as l, a as n, n as h, p as d, g as D, b as r, s as m, c as A, i as f } from "./date.js";
import { n as E, g as b } from "./locale.js";
import { u as C } from "./useT9n.js";
import { u as z } from "./useSetFocus.js";
import { g as u, a as k, b as $, c as M } from "./utils2.js";
const P = 2, w = { dateStyle: "full" }, F = {
  container: "container"
}, O = p`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:inline-block;inline-size:100%;overflow:visible;border-width:1px;border-style:solid;vertical-align:top;border-color:var(--calcite-date-picker-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-date-picker-corner-radius, var(--calcite-corner-radius))}:host([scale=s]){inline-size:236px;min-inline-size:216px;max-inline-size:380px}:host([scale=s][range][layout=horizontal][calendars="2"]){inline-size:480px;min-inline-size:432px;max-inline-size:772px}:host([scale=m]){inline-size:298px;min-inline-size:272px;max-inline-size:480px}:host([scale=m][layout=horizontal][range][calendars="2"]){inline-size:608px;min-inline-size:544px;max-inline-size:972px}:host([scale=l]){inline-size:334px;min-inline-size:320px;max-inline-size:600px}:host([scale=l][layout=horizontal][range][calendars="2"]){inline-size:684px;min-inline-size:640px;max-inline-size:1212px}.container{outline:2px solid transparent;outline-offset:2px}:host([hidden]){display:none}[hidden]{display:none}`;
class L extends y {
  constructor() {
    super(), this.rangeValueChangedByUser = !1, this.messages = C({ blocking: !0 }), this.focusSetter = z()(this), this.calendars = 2, this.layout = "horizontal", this.monthStyle = "wide", this.proximitySelectionDisabled = !1, this.range = !1, this.scale = "m", this.calciteDatePickerChange = v({ cancelable: !1 }), this.calciteDatePickerRangeChange = v({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { activeEndDate: 16, activeStartDate: 16, dateTimeFormat: 16, hoverRange: 16, localeData: 16, activeDate: 0, activeRange: 3, calendars: 11, headingLevel: 11, layout: 3, max: 3, maxAsDate: 0, messageOverrides: 0, min: 3, minAsDate: 0, monthStyle: 1, numberingSystem: 3, proximitySelectionDisabled: 7, range: 7, scale: 3, value: 1, valueAsDate: 0 };
  }
  static {
    this.styles = O;
  }
  async reset() {
    this.resetActiveDates(), this.rangeValueChangedByUser = !1;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  async load() {
    await this.loadLocaleData();
  }
  willUpdate(t) {
    t.has("value") && this.valueHandler(this.value), t.has("valueAsDate") && this.valueAsDateWatcher(this.valueAsDate);
    const e = u(t, "min"), a = u(t, "max");
    e === "min" ? this.minAsDate = this.min ? l(this.min) : void 0 : e === "minAsDate" && (this.minAsDate = l(n(this.minAsDate))), a === "max" ? this.maxAsDate = this.max ? l(this.max) : void 0 : a === "maxAsDate" && (this.maxAsDate = l(n(this.maxAsDate))), (t.has("range") && this.range || t.has("maxAsDate") || t.has("minAsDate")) && this.setActiveStartAndEndDates(), t.has("activeDate") && this.hasUpdated && this.activeDateWatcher(this.activeDate), t.has("messages") && this.hasUpdated && this.loadLocaleData().catch(x.error);
  }
  activeDateWatcher(t) {
    this.range && (t ? (this.activeStartDate = t, this.activeEndDate = h(this.activeStartDate)) : this.resetActiveDates());
  }
  valueHandler(t) {
    Array.isArray(t) ? (this.valueAsDate = t.every((e) => e === "") ? void 0 : k(t), this.rangeValueChangedByUser || this.resetActiveDates()) : t ? this.valueAsDate = l(t) : (this.valueAsDate = void 0, this.resetActiveDates());
  }
  valueAsDateWatcher(t) {
    this.range && Array.isArray(t) && !this.rangeValueChangedByUser ? this.setActiveStartAndEndDates() : this.range || (t && t !== this.activeDate ? this.activeDate = t : t || this.resetActiveDates());
  }
  keyDownHandler(t) {
    t.key === "Escape" && this.resetActiveDates();
  }
  async loadLocaleData() {
    const t = $(this.messages._lang);
    E.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: t,
      useGrouping: !1
    }, this.localeData = await M(t), this.dateTimeFormat = b(t, w);
  }
  monthHeaderSelectChange(t) {
    const e = new Date(t.detail.date), a = t.detail.position;
    this.range ? a === "end" ? (this.activeEndDate = e, this.activeStartDate = d(e)) : (this.activeStartDate = e, this.activeEndDate = h(e)) : this.activeDate = e, t.stopPropagation();
  }
  monthActiveDateChange(t) {
    const e = new Date(t.detail);
    if (!this.range)
      this.activeDate = e;
    else {
      const a = e.getMonth(), i = a !== this.activeStartDate?.getMonth() && (this.calendars === 1 || (this.activeStartDate ? a !== h(this.activeStartDate).getMonth() : !1));
      this.activeRange === "end" ? (!this.activeEndDate || this.activeStartDate && i) && (this.activeEndDate = e, this.activeStartDate = d(e)) : (this.activeStartDate && i || !this.activeStartDate) && (this.activeStartDate = e, this.activeEndDate = h(e));
    }
    t.stopPropagation();
  }
  monthHoverChange(t) {
    if (!this.range) {
      this.hoverRange = void 0;
      return;
    }
    const { valueAsDate: e } = this, a = Array.isArray(e) ? e[0] : void 0, i = Array.isArray(e) ? e[1] : void 0, s = new Date(t.detail);
    if (this.hoverRange = {
      focused: this.activeRange || "start",
      start: a,
      end: i
    }, this.proximitySelectionDisabled)
      i && a || !i && a && s >= a ? (this.hoverRange.focused = "end", this.hoverRange.end = s) : !i && a && s < a ? this.hoverRange = {
        focused: "start",
        start: s,
        end: a
      } : this.hoverRange = void 0;
    else if (this.activeRange && this.hoverRange)
      this.activeRange === "end" ? (this.hoverRange.end = s, this.hoverRange.focused = "end") : (this.hoverRange.start = s, this.hoverRange.focused = "start");
    else if (a && i) {
      const o = Math.abs(D(s, a)), c = Math.abs(D(s, i));
      s > i ? (this.hoverRange.end = s, this.hoverRange.focused = "end") : s < a ? (this.hoverRange.start = s, this.hoverRange.focused = "start") : s > a && s < i && (o < c ? (this.hoverRange.start = s, this.hoverRange.focused = "start") : (this.hoverRange.end = s, this.hoverRange.focused = "end"));
    } else
      a && (s < a ? this.hoverRange = {
        focused: "start",
        start: s,
        end: a
      } : (this.hoverRange.end = s, this.hoverRange.focused = "end"));
    t.stopPropagation();
  }
  monthMouseOutChange(t) {
    this.hoverRange && (this.hoverRange = void 0), t.stopPropagation();
  }
  resetActiveDates() {
    const { valueAsDate: t } = this;
    if (!Array.isArray(t)) {
      if (t && t !== this.activeDate)
        this.activeDate = new Date(t);
      else if (!t) {
        this.activeDate = void 0;
        const e = this.getActiveDate(void 0, this.minAsDate, this.maxAsDate);
        this.range ? (this.activeStartDate = e, this.activeEndDate = void 0) : this.activeDate = e;
      }
    }
    Array.isArray(t) && (t[0] && t[0] !== this.activeStartDate ? this.activeStartDate = new Date(t[0]) : t[0] || (this.activeStartDate = this.getActiveDate(void 0, this.minAsDate, this.maxAsDate)), t[1] && t[1] !== this.activeEndDate ? this.activeEndDate = new Date(t[1]) : t[1] || (this.activeEndDate = void 0)), this.hoverRange = void 0;
  }
  getEndDate() {
    return Array.isArray(this.valueAsDate) && this.valueAsDate[1] || void 0;
  }
  setEndDate(t, e = !0) {
    const a = this.getStartDate();
    this.rangeValueChangedByUser = !0, this.value = [n(a), n(t)], this.valueAsDate = [a, t], e && this.calciteDatePickerRangeChange.emit();
  }
  getStartDate() {
    return Array.isArray(this.valueAsDate) && this.valueAsDate[0] || void 0;
  }
  setStartDate(t, e = !0) {
    const a = this.getEndDate();
    this.rangeValueChangedByUser = !0, this.value = [n(t), n(a)], this.valueAsDate = [t, a], e && this.calciteDatePickerRangeChange.emit();
  }
  monthDateChange(t) {
    const e = new Date(t.detail), a = n(e);
    if (!this.range && a === n(this.valueAsDate))
      return;
    if (!this.range) {
      this.value = a || "", this.valueAsDate = e || void 0, this.activeDate = e || void 0, this.calciteDatePickerChange.emit();
      return;
    }
    const i = this.getStartDate(), s = this.getEndDate();
    if (!i || !s && e < i)
      i && this.setEndDate(new Date(i)), this.activeRange == "end" ? this.setEndDate(e) : this.setStartDate(e);
    else if (!s)
      this.setEndDate(e);
    else if (this.proximitySelectionDisabled)
      this.setStartDate(e, !1), this.setEndDate(void 0, !1), this.calciteDatePickerRangeChange.emit();
    else if (this.activeRange)
      this.activeRange == "end" ? this.setEndDate(e) : (e > s && (this.setEndDate(void 0, !1), this.activeEndDate = void 0), this.setStartDate(e));
    else {
      const o = D(e, i), c = D(e, s);
      c === 0 || o < 0 ? this.setStartDate(e) : o === 0 || c < 0 ? this.setEndDate(e) : o < c ? this.setStartDate(e) : this.setEndDate(e);
    }
    t.stopPropagation(), this.calciteDatePickerChange.emit();
  }
  getActiveDate(t, e, a) {
    const i = r(/* @__PURE__ */ new Date(), e, a);
    return r(this.activeDate, e, a) || t || (m(a, i) && !this.range ? A(i, e, a) : i);
  }
  getActiveEndDate(t, e, a) {
    return r(this.activeEndDate, e, a) || t || r(h(/* @__PURE__ */ new Date()), e, a);
  }
  setActiveStartAndEndDates() {
    if (this.range) {
      const t = r(Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate), e = r(Array.isArray(this.valueAsDate) ? this.valueAsDate[1] : void 0, this.minAsDate, this.maxAsDate);
      if (this.activeStartDate = this.getActiveDate(t, this.minAsDate, this.maxAsDate), this.activeEndDate = this.getActiveEndDate(e, this.minAsDate, this.maxAsDate), m(this.activeStartDate, this.activeEndDate)) {
        const a = A(this.activeEndDate ? d(this.activeEndDate) : void 0, this.minAsDate, this.maxAsDate), i = this.activeEndDate ? h(this.activeEndDate) : void 0;
        f(a, this.minAsDate, this.maxAsDate) ? this.activeStartDate = a : f(i, this.minAsDate, this.maxAsDate) && (this.activeEndDate = i);
      }
    }
  }
  render() {
    const t = r(this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate), e = this.getActiveDate(t, this.minAsDate, this.maxAsDate), a = this.range && Array.isArray(this.valueAsDate) ? r(this.valueAsDate[1], this.minAsDate, this.maxAsDate) : void 0, i = this.range && this.activeRange ? this.activeRange === "start" ? this.minAsDate : t : this.minAsDate, s = this.range ? this.activeStartDate : e;
    return g`<div aria-hidden class=${S(F.container)} tabindex=-1>${this.renderMonth(s, this.maxAsDate, i, t, a)}</div>`;
  }
  renderMonth(t, e, a, i, s) {
    return g`<calcite-date-picker-month .activeDate=${t} .calendars=${this.calendars} .dateTimeFormat=${this.dateTimeFormat} .endDate=${this.range ? s : void 0} .headingLevel=${this.headingLevel || P} .hoverRange=${this.hoverRange} .layout=${this.layout} .localeData=${this.localeData} .max=${e} .messages=${this.messages} .min=${a} .monthStyle=${this.monthStyle} @calciteInternalDatePickerDayHover=${this.monthHoverChange} @calciteInternalDatePickerDaySelect=${this.monthDateChange} @calciteInternalDatePickerMonthActiveDateChange=${this.monthActiveDateChange} @calciteInternalDatePickerMonthChange=${this.monthHeaderSelectChange} @calciteInternalDatePickerMonthMouseOut=${this.monthMouseOutChange} .range=${this.range} .scale=${this.scale} .selectedDate=${this.activeRange === "end" ? s : i} .startDate=${this.range ? i : void 0}></calcite-date-picker-month>`;
  }
}
R("calcite-date-picker", L);
export {
  L as DatePicker
};
