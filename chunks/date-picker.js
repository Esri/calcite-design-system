import { a as f, L as y, d as v, x as p, c as x } from "./iframe.js";
import { d as h, n as r, p as d, g as D, a as o, b as n, c as g, s as m, i as A } from "./date.js";
import { c as S } from "./component.js";
import { n as R, b as E } from "./locale.js";
import { f as b } from "./dom.js";
import { u as C } from "./useT9n.js";
import { g as u, a as z } from "./utils2.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const k = 2, M = { dateStyle: "full" }, $ = f`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:inline-block;inline-size:100%;overflow:visible;border-width:1px;border-style:solid;vertical-align:top;border-color:var(--calcite-date-picker-border-color, var(--calcite-color-border-1));border-radius:var(--calcite-date-picker-corner-radius, 0)}:host([scale=s]){inline-size:236px;min-inline-size:216px;max-inline-size:380px}:host([scale=s][range][layout=horizontal]){inline-size:480px;min-inline-size:432px;max-inline-size:772px}:host([scale=m]){inline-size:298px;min-inline-size:272px;max-inline-size:480px}:host([scale=m][range][layout=horizontal]){inline-size:608px;min-inline-size:544px;max-inline-size:972px}:host([scale=l]){inline-size:334px;min-inline-size:320px;max-inline-size:600px}:host([scale=l][range][layout=horizontal]){inline-size:684px;min-inline-size:640px;max-inline-size:1212px}:host([hidden]){display:none}[hidden]{display:none}`;
class P extends y {
  constructor() {
    super(), this.rangeValueChangedByUser = !1, this.messages = C({ blocking: !0 }), this.layout = "horizontal", this.monthStyle = "wide", this.proximitySelectionDisabled = !1, this.range = !1, this.scale = "m", this.calciteDatePickerChange = v({ cancelable: !1 }), this.calciteDatePickerRangeChange = v({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { activeEndDate: 16, activeStartDate: 16, dateTimeFormat: 16, endAsDate: 16, hoverRange: 16, localeData: 16, startAsDate: 16, activeDate: 0, activeRange: 3, headingLevel: 11, layout: 3, max: 3, maxAsDate: 0, messageOverrides: 0, min: 3, minAsDate: 0, monthStyle: 1, numberingSystem: 3, proximitySelectionDisabled: 7, range: 7, scale: 3, value: 1, valueAsDate: 0 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = $;
  }
  async reset() {
    this.resetActiveDates(), this.rangeValueChangedByUser = !1;
  }
  async setFocus() {
    await S(this), b(this.el);
  }
  connectedCallback() {
    super.connectedCallback(), Array.isArray(this.value) ? this.valueAsDate = u(this.value) : this.value && (this.valueAsDate = h(this.value)), this.min && (this.minAsDate = h(this.min)), this.max && (this.maxAsDate = h(this.max)), this.setActiveStartAndEndDates();
  }
  async load() {
    await this.loadLocaleData(), this.onMinChanged(this.min), this.onMaxChanged(this.max);
  }
  willUpdate(t) {
    t.has("activeDate") && this.activeDateWatcher(this.activeDate), t.has("value") && this.valueHandler(this.value), t.has("valueAsDate") && this.valueAsDateWatcher(this.valueAsDate), t.has("min") && this.onMinChanged(this.min), t.has("max") && this.onMaxChanged(this.max), t.has("messages") && this.hasUpdated && this.loadLocaleData().catch(console.error);
  }
  activeDateWatcher(t) {
    this.range && (this.rangeValueChangedByUser || (t ? (this.activeStartDate = t, this.activeEndDate = r(this.activeStartDate)) : this.resetActiveDates()));
  }
  valueHandler(t) {
    Array.isArray(t) ? (this.valueAsDate = u(t), this.rangeValueChangedByUser || this.resetActiveDates()) : t && (this.valueAsDate = h(t));
  }
  valueAsDateWatcher(t) {
    this.range && Array.isArray(t) && !this.rangeValueChangedByUser ? this.setActiveStartAndEndDates() : t && t !== this.activeDate && (this.activeDate = t);
  }
  onMinChanged(t) {
    this.minAsDate = h(t), this.range && this.setActiveStartAndEndDates();
  }
  onMaxChanged(t) {
    this.maxAsDate = h(t), this.range && this.setActiveStartAndEndDates();
  }
  keyDownHandler(t) {
    t.key === "Escape" && this.resetActiveDates();
  }
  async loadLocaleData() {
    R.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.messages._lang,
      useGrouping: !1
    }, this.localeData = await z(this.messages._lang), this.dateTimeFormat = E(this.messages._lang, M);
  }
  monthHeaderSelectChange(t) {
    const e = new Date(t.detail.date), a = t.detail.position;
    this.range ? a === "end" ? (this.activeEndDate = e, this.activeStartDate = d(e)) : (this.activeStartDate = e, this.activeEndDate = r(e)) : this.activeDate = e, t.stopPropagation();
  }
  monthActiveDateChange(t) {
    const e = new Date(t.detail);
    if (!this.range)
      this.activeDate = e;
    else {
      const a = e.getMonth(), i = a !== this.activeStartDate.getMonth() && a !== r(this.activeStartDate).getMonth();
      this.activeRange === "end" ? (!this.activeEndDate || this.activeStartDate && i) && (this.activeEndDate = e, this.activeStartDate = d(e)) : (this.activeStartDate && i || !this.activeStartDate) && (this.activeStartDate = e, this.activeEndDate = r(e));
    }
    t.stopPropagation();
  }
  monthHoverChange(t) {
    if (!this.range) {
      this.hoverRange = void 0;
      return;
    }
    const { valueAsDate: e } = this, a = Array.isArray(e) && e[0], i = Array.isArray(e) && e[1], s = new Date(t.detail);
    if (this.hoverRange = {
      focused: this.activeRange || "start",
      start: a,
      end: i
    }, this.proximitySelectionDisabled)
      i && a || !i && s >= a ? (this.hoverRange.focused = "end", this.hoverRange.end = s) : !i && s < a ? this.hoverRange = {
        focused: "start",
        start: s,
        end: a
      } : this.hoverRange = void 0;
    else if (this.activeRange)
      this.activeRange === "end" ? (this.hoverRange.end = s, this.hoverRange.focused = "end") : (this.hoverRange.start = s, this.hoverRange.focused = "start");
    else if (a && i) {
      const c = Math.abs(D(s, a)), l = Math.abs(D(s, i));
      s > i ? (this.hoverRange.end = s, this.hoverRange.focused = "end") : s < a ? (this.hoverRange.start = s, this.hoverRange.focused = "start") : s > a && s < i && (c < l ? (this.hoverRange.start = s, this.hoverRange.focused = "start") : (this.hoverRange.end = s, this.hoverRange.focused = "end"));
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
    !Array.isArray(t) && t && t !== this.activeDate && (this.activeDate = new Date(t)), Array.isArray(t) && (t[0] && t[0] !== this.activeStartDate && (this.activeStartDate = new Date(t[0])), t[1] && t[1] !== this.activeEndDate && (this.activeEndDate = new Date(t[1]))), this.hoverRange = void 0;
  }
  getEndDate() {
    return Array.isArray(this.valueAsDate) && this.valueAsDate[1] || void 0;
  }
  setEndDate(t) {
    const e = this.getStartDate();
    this.rangeValueChangedByUser = !0, this.value = [o(e), o(t)], this.valueAsDate = [e, t], t && this.calciteDatePickerRangeChange.emit();
  }
  getStartDate() {
    return Array.isArray(this.valueAsDate) && this.valueAsDate[0];
  }
  setStartDate(t) {
    const e = this.getEndDate();
    this.rangeValueChangedByUser = !0, this.value = [o(t), o(e)], this.valueAsDate = [t, e], this.calciteDatePickerRangeChange.emit();
  }
  monthDateChange(t) {
    const e = new Date(t.detail), a = o(e);
    if (!this.range && a === o(this.valueAsDate))
      return;
    if (!this.range) {
      this.value = a || "", this.valueAsDate = e || null, this.activeDate = e || null, this.calciteDatePickerChange.emit();
      return;
    }
    const i = this.getStartDate(), s = this.getEndDate();
    if (!i || !s && e < i)
      i && this.setEndDate(new Date(i)), this.activeRange == "end" ? this.setEndDate(e) : this.setStartDate(e);
    else if (!s)
      this.setEndDate(e);
    else if (this.proximitySelectionDisabled)
      this.setStartDate(e), this.setEndDate(null);
    else if (this.activeRange)
      this.activeRange == "end" ? this.setEndDate(e) : (e > s && (this.setEndDate(null), this.activeEndDate = null), this.setStartDate(e));
    else {
      const c = D(e, i), l = D(e, s);
      l === 0 || c < 0 ? this.setStartDate(e) : c === 0 || l < 0 ? this.setEndDate(e) : c < l ? this.setStartDate(e) : this.setEndDate(e);
    }
    t.stopPropagation(), this.calciteDatePickerChange.emit();
  }
  getActiveDate(t, e, a) {
    const i = n(/* @__PURE__ */ new Date(), e, a);
    return n(this.activeDate, e, a) || t || (m(a, i) && !this.range ? g(i, e, a) : i);
  }
  getActiveEndDate(t, e, a) {
    return n(this.activeEndDate, e, a) || t || n(r(/* @__PURE__ */ new Date()), e, a);
  }
  setActiveStartAndEndDates() {
    if (this.range) {
      const t = n(Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate), e = n(Array.isArray(this.valueAsDate) ? this.valueAsDate[1] : null, this.minAsDate, this.maxAsDate);
      if (this.activeStartDate = this.getActiveDate(t, this.minAsDate, this.maxAsDate), this.activeEndDate = this.getActiveEndDate(e, this.minAsDate, this.maxAsDate), m(this.activeStartDate, this.activeEndDate)) {
        const a = g(d(this.activeEndDate), this.minAsDate, this.maxAsDate), i = r(this.activeEndDate);
        A(a, this.minAsDate, this.maxAsDate) ? this.activeStartDate = a : A(i, this.minAsDate, this.maxAsDate) && (this.activeEndDate = i);
      }
    }
  }
  render() {
    const t = n(this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate), e = this.getActiveDate(t, this.minAsDate, this.maxAsDate), a = this.range && Array.isArray(this.valueAsDate) ? n(this.valueAsDate[1], this.minAsDate, this.maxAsDate) : null, i = this.range && this.activeRange ? this.activeRange === "start" ? this.minAsDate : t : this.minAsDate, s = this.range ? this.activeStartDate : e;
    return this.renderMonth(s, this.maxAsDate, i, t, a);
  }
  renderMonth(t, e, a, i, s) {
    return this.localeData && p`<calcite-date-picker-month .activeDate=${t} .dateTimeFormat=${this.dateTimeFormat} .endDate=${this.range ? s : void 0} .headingLevel=${this.headingLevel || k} .hoverRange=${this.hoverRange} .layout=${this.layout} .localeData=${this.localeData} .max=${e} .messages=${this.messages} .min=${a} .monthStyle=${this.monthStyle} @calciteInternalDatePickerDayHover=${this.monthHoverChange} @calciteInternalDatePickerDaySelect=${this.monthDateChange} @calciteInternalDatePickerMonthActiveDateChange=${this.monthActiveDateChange} @calciteInternalDatePickerMonthChange=${this.monthHeaderSelectChange} @calciteInternalDatePickerMonthMouseOut=${this.monthMouseOutChange} .range=${this.range} .scale=${this.scale} .selectedDate=${this.activeRange === "end" ? s : i} .startDate=${this.range ? i : void 0}></calcite-date-picker-month>` || "";
  }
}
x("calcite-date-picker", P);
export {
  P as DatePicker
};
