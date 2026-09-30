/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as P, L as I, c as f, s as u, b as v, d as H } from "./index.js";
import { n as E } from "./ref.js";
import { i as z } from "./keyed.js";
import { i as M, b as y, s as o, h as b, c as O, n as B } from "./date.js";
const D = {
  calendar: "calendar",
  calendarContainer: "calendar-container",
  calendarStart: "calendar--start",
  currentDay: "current-day",
  dayContainer: "day-container",
  month: "month",
  noncurrent: "noncurrent",
  weekDays: "week-days",
  weekHeader: "week-header",
  weekHeaderContainer: "week-header-container"
}, L = P`:host([hidden]){display:none}[hidden]{display:none}.calendar-container{display:flex;inline-size:100%}:host([range][layout=vertical]) .calendar-container{flex-direction:column}.calendar{inline-size:100%}.week-header-container{display:flex;block-size:16px;padding-inline:var(--calcite-spacing-sm);padding-block:var(--calcite-spacing-md)}.week-header{display:flex;align-items:center;justify-content:center;text-align:center;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);font-weight:var(--calcite-font-weight-bold);inline-size:14.2857142857%;color:var(--calcite-date-picker-week-header-text-color, var(--calcite-color-text-2))}.day-container{display:flex;inline-size:100%;min-inline-size:0px;justify-content:center}.day-container calcite-date-picker-day{inline-size:100%}.week-days{display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;padding-inline:var(--calcite-spacing-sm);padding-block-end:var(--calcite-spacing-sm)}.month-header{display:flex;inline-size:100%;justify-content:space-between}.month{display:flex;inline-size:100%;flex-direction:column;justify-content:space-between}.day{font-size:var(--calcite-font-size)}:host([scale=s]) .week-days{padding-inline:var(--calcite-spacing-xs);padding-block-end:var(--calcite-spacing-xs)}:host([scale=s]) .week-header-container{padding-inline:var(--calcite-spacing-xs);padding-block:var(--calcite-spacing-sm)}:host([scale=s]) .day{font-size:var(--calcite-font-size-sm)}:host([scale=l]) .week-header{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=l]) .week-days{padding-inline:var(--calcite-spacing-md);padding-block-end:var(--calcite-spacing-md)}:host([scale=l]) .week-header-container{padding-inline:var(--calcite-spacing-md);padding-block:var(--calcite-spacing-md-plus)}:host([scale=l]) .day{font-size:var(--calcite-font-size-md)}.calendar--start{border-width:0px;border-style:solid;border-color:var(--calcite-date-picker-range-calendar-divider-color, var(--calcite-color-border-1))}:host([range][layout=horizontal][calendars="2"]) .calendar--start{border-inline-end-width:var(--calcite-border-width-sm)}:host([range][layout=vertical][calendars="2"]) .calendar--start{border-block-end-width:var(--calcite-border-width-sm)}.noncurrent{pointer-events:none;opacity:0}`, p = 7, w = 6, S = 42;
class Y extends I {
  constructor() {
    super(), this.activeFocus = !1, this.storeDayRef = (e) => {
      e?.active && this.activeFocus && e.setFocus();
    }, this.activeDate = /* @__PURE__ */ new Date(), this.calendars = 2, this.range = !1, this.calciteInternalDatePickerDayHover = f({ cancelable: !1 }), this.calciteInternalDatePickerDaySelect = f({ cancelable: !1 }), this.calciteInternalDatePickerMonthActiveDateChange = f({ cancelable: !1 }), this.calciteInternalDatePickerMonthChange = f({ cancelable: !1 }), this.calciteInternalDatePickerMonthMouseOut = f({ cancelable: !1 }), this.listen("pointerout", this.pointerOutHandler), this.listen("focusout", this.disableActiveFocus);
  }
  static {
    this.properties = { focusedDate: 16, activeDate: 0, calendars: 11, dateTimeFormat: 0, endDate: 0, headingLevel: 11, hoverRange: 0, layout: 3, localeData: 0, max: 0, messages: 0, min: 0, monthStyle: 1, range: 7, scale: 3, selectedDate: 0, startDate: 0 };
  }
  static {
    this.styles = L;
  }
  load() {
    this.focusedDate = this.selectedDate || this.activeDate;
  }
  willUpdate(e) {
    e.has("activeDate") && this.updateFocusedDateWithActive(this.activeDate), e.has("selectedDate") && (this.focusedDate = this.selectedDate);
  }
  updateFocusedDateWithActive(e) {
    this.selectedDate || (this.focusedDate = M(e, this.min, this.max) ? e : y(e, this.min, this.max));
  }
  keyDownHandler(e) {
    if (e.defaultPrevented)
      return;
    const a = this.el.dir === "rtl", t = e.target.value;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault(), this.addDays(-7, t);
        break;
      case "ArrowRight":
        e.preventDefault(), this.addDays(a ? -1 : 1, t);
        break;
      case "ArrowDown":
        e.preventDefault(), this.addDays(7, t);
        break;
      case "ArrowLeft":
        e.preventDefault(), this.addDays(a ? 1 : -1, t);
        break;
      case "PageUp":
        e.preventDefault(), this.addMonths(-1, t);
        break;
      case "PageDown":
        e.preventDefault(), this.addMonths(1, t);
        break;
      case "Home":
        e.preventDefault(), this.activeDate.setDate(1), this.addDays(0, t);
        break;
      case "End":
        e.preventDefault(), this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate()), this.addDays(0, t);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        break;
      case "Tab":
        this.activeFocus = !1;
    }
  }
  disableActiveFocus() {
    this.activeFocus = !1;
  }
  pointerOutHandler() {
    this.calciteInternalDatePickerMonthMouseOut.emit();
  }
  addMonths(e, a) {
    const t = new Date(a);
    t.setMonth(a.getMonth() + e), this.calciteInternalDatePickerMonthActiveDateChange.emit(y(t, this.min, this.max)), this.focusedDate = y(t, this.min, this.max), this.activeFocus = !0, this.calciteInternalDatePickerDayHover.emit(t);
  }
  addDays(e = 0, a) {
    const t = new Date(a);
    t.setDate(a.getDate() + e), this.calciteInternalDatePickerMonthActiveDateChange.emit(y(t, this.min, this.max)), this.focusedDate = y(t, this.min, this.max), this.activeFocus = !0, this.calciteInternalDatePickerDayHover.emit(t);
  }
  getPreviousMonthDays(e, a, t) {
    const s = new Date(a, e, 0), i = s.getDate(), n = s.getDay(), r = [];
    if (n === (t + w) % p)
      return r;
    if (n === t)
      return [i];
    for (let h = (p + n - t) % p; h >= 0; h--)
      r.push(i - h);
    return r;
  }
  getCurrentMonthDays(e, a) {
    const t = new Date(a, e + 1, 0).getDate(), s = [];
    for (let i = 0; i < t; i++)
      s.push(i + 1);
    return s;
  }
  getNextMonthDays(e, a, t) {
    const s = new Date(a, e + 1, 0).getDay(), i = [];
    if (s === (t + w) % p)
      return i;
    for (let n = 0; n < (w - (s - t)) % p; n++)
      i.push(n + 1);
    return i;
  }
  betweenSelectedRange(e) {
    return !!(this.startDate && this.endDate && e > this.startDate && e < this.endDate && !this.isRangeHover(e));
  }
  isSelected(e) {
    return !!(o(e, this.selectedDate) || this.startDate && o(e, this.startDate) || this.endDate && o(e, this.endDate));
  }
  isStartOfRange(e) {
    return !!(this.startDate && !o(this.startDate, this.endDate) && o(this.startDate, e) && !this.isEndOfRange(e));
  }
  isEndOfRange(e) {
    return !!(this.endDate && !o(this.startDate, this.endDate) && o(this.endDate, e) || !this.endDate && this.hoverRange && o(this.startDate, this.hoverRange.end) && o(e, this.hoverRange.end));
  }
  dayHover(e) {
    const a = e.target;
    a.disabled ? this.calciteInternalDatePickerMonthMouseOut.emit() : this.calciteInternalDatePickerDayHover.emit(a.value), e.stopPropagation();
  }
  daySelect(e) {
    const a = e.target;
    this.activeFocus = !1, this.calciteInternalDatePickerDaySelect.emit(a.value), e.stopPropagation();
  }
  isFocusedOnStart() {
    return this.hoverRange?.focused === "start";
  }
  isHoverInRange() {
    if (!this.hoverRange || !this.startDate)
      return !1;
    const { start: e, end: a } = this.hoverRange, t = this.isFocusedOnStart(), s = this.startDate && a && a > this.startDate, i = this.endDate && a && a < this.endDate, n = this.startDate && e && e > this.startDate, r = this.endDate && e && e < this.endDate, h = !t && this.startDate && s && (!this.endDate || i), c = t && this.startDate && n && r;
    return !!(h || c);
  }
  isRangeHover(e) {
    if (!this.hoverRange)
      return !1;
    const { start: a, end: t } = this.hoverRange, s = this.isFocusedOnStart(), i = this.isHoverInRange(), n = !!(a && e > a && this.startDate && e < this.startDate), r = !!(t && e < t && this.endDate && e > this.endDate), h = !!(t && e > t && this.endDate && e < this.endDate), c = !!(a && e < a && this.startDate && e > this.startDate), l = !!(t && e < t && this.startDate && e > this.startDate), d = !!(a && e > a && this.endDate && e < this.endDate), g = this.startDate && this.endDate;
    if (i) {
      if (g)
        return s ? !!(this.endDate && e < this.endDate) && (c || n) : h || r;
      if (this.startDate && !this.endDate)
        return s ? n : l;
      if (!this.startDate && this.endDate)
        return s ? d : r;
    } else if (g)
      return s ? n : r;
    return !1;
  }
  getDays(e, a, t, s = "start") {
    let i = this.activeDate.getMonth();
    const n = i + 1;
    i = s === "end" ? n : i;
    const r = this.activeDate.getFullYear();
    return [
      ...e.map((c) => ({
        active: !1,
        day: c,
        date: new Date(r, i - 1, c)
      })),
      ...a.map((c) => {
        const l = new Date(r, i, c), d = o(l, /* @__PURE__ */ new Date());
        return {
          active: this.focusedDate && this.focusedDate !== this.startDate && this.focusedDate !== this.endDate ? o(l, this.focusedDate) : o(l, this.startDate) || o(l, this.endDate),
          currentMonth: !0,
          currentDay: d,
          day: c,
          date: l
        };
      }),
      ...t.map((c) => ({
        active: !1,
        day: c,
        date: new Date(r, n, c)
      }))
    ];
  }
  monthHeaderSelectChange(e) {
    const a = new Date(e.detail), t = e.target;
    this.updateFocusableDate(a), e.stopPropagation(), this.calciteInternalDatePickerMonthChange.emit({ date: a, position: t.position });
  }
  updateFocusableDate(e) {
    !this.selectedDate || !this.range ? this.focusedDate = this.getFirstValidDateOfMonth(e) : this.selectedDate && this.range && (!b(this.startDate, e) || !b(this.endDate, e)) && (this.focusedDate = this.getFirstValidDateOfMonth(e));
  }
  getFirstValidDateOfMonth(e) {
    return e.getDate() === 1 ? e : O(e, this.min, this.max);
  }
  render() {
    const e = this.activeDate.getMonth(), a = this.activeDate.getFullYear(), t = this.localeData.weekStart % 7, { abbreviated: s, short: i, narrow: n } = this.localeData.days, r = this.scale === "s" ? n || i || s : i || s || n, h = [
      ...r.slice(t, 7),
      ...r.slice(0, t)
    ], c = this.getCurrentMonthDays(e, a), l = this.getPreviousMonthDays(e, a, t), d = this.getNextMonthDays(e, a, t), g = c.length + l.length + d.length;
    if (g < S) {
      const C = d.length ? d[d.length - 1] : 0;
      for (let k = 1; k <= S - g; k++)
        d.push(C + k);
    }
    const m = e + 1, $ = this.getPreviousMonthDays(m, a, t), x = this.getCurrentMonthDays(m, a), A = this.getNextMonthDays(m, a, t), R = this.getDays(l, c, d), F = this.getDays($, x, A, "end");
    return v`<div class=${u({ [D.calendarContainer]: !0 })} role=grid>${this.renderCalendar(h, R)}${this.range && this.calendars === 2 && this.renderCalendar(h, F, !0) || ""}</div>`;
  }
  renderDateDay({ active: e, currentMonth: a, currentDay: t, date: s, day: i }, n) {
    const r = M(s, this.min, this.max);
    return z(n, v`<div class=${u({ [D.dayContainer]: !0 })} role=gridcell><calcite-date-picker-day .active=${e} class=${u({
      [D.currentDay]: t,
      [D.noncurrent]: this.range && this.calendars === 2 && !a
    })} .currentMonth=${a} .dateTimeFormat=${this.dateTimeFormat} .day=${i} .disabled=${!r} .endOfRange=${this.isEndOfRange(s)} .highlighted=${this.betweenSelectedRange(s)} @calciteInternalDayHover=${this.dayHover} @calciteInternalDaySelect=${this.daySelect} .range=${!!this.startDate && !!this.endDate && !o(this.startDate, this.endDate)} .rangeHover=${r && this.isRangeHover(s)} .scale=${this.scale} .selected=${this.isSelected(s)} .startOfRange=${this.isStartOfRange(s)} .value=${s} ${E(this.storeDayRef)}></calcite-date-picker-day></div>`);
  }
  renderCalendar(e, a, t = !1) {
    return v`<div class=${u({
      [D.calendar]: !0,
      [D.calendarStart]: !t
    })}><calcite-date-picker-month-header .activeDate=${t ? B(this.activeDate) : this.activeDate} .headingLevel=${this.headingLevel} .localeData=${this.localeData} .max=${this.max} .messages=${this.messages} .min=${this.min} .monthStyle=${this.monthStyle} @calciteInternalDatePickerMonthHeaderSelectChange=${this.monthHeaderSelectChange} .position=${t ? "end" : this.range && this.calendars === 2 ? "start" : void 0} .scale=${this.scale} .selectedDate=${this.selectedDate}></calcite-date-picker-month-header>${this.renderMonthCalendar(e, a, t)}</div>`;
  }
  renderMonthCalendar(e, a, t = !1) {
    return v`<div class=${u({ [D.month]: !0 })} @keydown=${this.keyDownHandler}><div class=${u({ [D.weekHeaderContainer]: !0 })} role=row>${e.map((i) => v`<span class=${u({ [D.weekHeader]: !0 })} role=columnheader>${i}</span>`)}</div><div class=${u({ [D.weekDays]: !0 })} role=row>${a.map((i, n) => this.renderDateDay(i, t ? 50 + n : n))}</div></div>`;
  }
}
H("calcite-date-picker-month", Y);
export {
  Y as DatePickerMonth
};
