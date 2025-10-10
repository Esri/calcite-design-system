import { b as F, L as P, c as v, s as u, x as y, q as C } from "./index.js";
import { n as E } from "./ref.js";
import { i as z } from "./keyed.js";
import { b as p, i as S, s as l, h as b, c as O, n as B } from "./date.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const h = {
  calendar: "calendar",
  calendarContainer: "calendar-container",
  calendarStart: "calendar--start",
  currentDay: "current-day",
  dayContainer: "day-container",
  insideRangeHover: "inside-range--hover",
  month: "month",
  noncurrent: "noncurrent",
  outsideRangeHover: "outside-range--hover",
  weekDays: "week-days",
  weekHeader: "week-header",
  weekHeaderContainer: "week-header-container"
}, L = F`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([hidden]){display:none}[hidden]{display:none}.calendar-container{display:flex;inline-size:100%}:host([range][layout=vertical]) .calendar-container{flex-direction:column}.calendar{inline-size:100%}.week-header-container{display:flex;block-size:16px;padding-inline:var(--calcite-spacing-sm);padding-block:var(--calcite-spacing-md)}.week-header{display:flex;align-items:center;justify-content:center;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-bold);inline-size:14.2857142857%;color:var(--calcite-date-picker-week-header-text-color, var(--calcite-color-text-2))}.day-container{display:flex;inline-size:100%;min-inline-size:0px;justify-content:center}.day-container calcite-date-picker-day{inline-size:100%}.week-days{display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;padding-inline:var(--calcite-spacing-sm);padding-block-end:var(--calcite-spacing-sm)}.month-header{display:flex;inline-size:100%;justify-content:space-between}.month{display:flex;inline-size:100%;flex-direction:column;justify-content:space-between}.day{font-size:var(--calcite-font-size)}:host([scale=s]) .week-days{padding-inline:var(--calcite-spacing-xs);padding-block-end:var(--calcite-spacing-xs)}:host([scale=s]) .week-header-container{padding-inline:var(--calcite-spacing-xs);padding-block:var(--calcite-spacing-sm)}:host([scale=s]) .day{font-size:var(--calcite-font-size-sm)}:host([scale=l]) .week-header{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) .week-days{padding-inline:var(--calcite-spacing-md);padding-block-end:var(--calcite-spacing-md)}:host([scale=l]) .week-header-container{padding-inline:var(--calcite-spacing-md);padding-block:var(--calcite-spacing-md-plus)}:host([scale=l]) .day{font-size:var(--calcite-font-size-md)}.calendar--start{border-width:0px;border-style:solid;border-color:var(--calcite-date-picker-range-calendar-divider-color, var(--calcite-color-border-1))}:host([range][layout=horizontal][calendars="2"]) .calendar--start{border-inline-end-width:var(--calcite-border-width-sm)}:host([range][layout=vertical][calendars="2"]) .calendar--start{border-block-end-width:var(--calcite-border-width-sm)}.noncurrent{pointer-events:none;opacity:0}`, m = 7, w = 6, $ = 42;
class Y extends P {
  constructor() {
    super(), this.storeDayRef = (e) => {
      e?.active && this.activeFocus && e.setFocus();
    }, this.activeDate = /* @__PURE__ */ new Date(), this.calendars = 2, this.range = !1, this.calciteInternalDatePickerDayHover = v({ cancelable: !1 }), this.calciteInternalDatePickerDaySelect = v({ cancelable: !1 }), this.calciteInternalDatePickerMonthActiveDateChange = v({ cancelable: !1 }), this.calciteInternalDatePickerMonthChange = v({ cancelable: !1 }), this.calciteInternalDatePickerMonthMouseOut = v({ cancelable: !1 }), this.listen("pointerout", this.pointerOutHandler), this.listen("focusout", this.disableActiveFocus);
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
    this.selectedDate || (this.focusedDate = S(e, this.min, this.max) ? e : p(e, this.min, this.max));
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
    t.setMonth(a.getMonth() + e), this.calciteInternalDatePickerMonthActiveDateChange.emit(p(t, this.min, this.max)), this.focusedDate = p(t, this.min, this.max), this.activeFocus = !0, this.calciteInternalDatePickerDayHover.emit(t);
  }
  addDays(e = 0, a) {
    const t = new Date(a);
    t.setDate(a.getDate() + e), this.calciteInternalDatePickerMonthActiveDateChange.emit(p(t, this.min, this.max)), this.focusedDate = p(t, this.min, this.max), this.activeFocus = !0, this.calciteInternalDatePickerDayHover.emit(t);
  }
  getPreviousMonthDays(e, a, t) {
    const s = new Date(a, e, 0), i = s.getDate(), n = s.getDay(), o = [];
    if (n === (t + w) % m)
      return o;
    if (n === t)
      return [i];
    for (let r = (m + n - t) % m; r >= 0; r--)
      o.push(i - r);
    return o;
  }
  getCurrentMonthDays(e, a) {
    const t = new Date(a, e + 1, 0).getDate(), s = [];
    for (let i = 0; i < t; i++)
      s.push(i + 1);
    return s;
  }
  getNextMonthDays(e, a, t) {
    const s = new Date(a, e + 1, 0).getDay(), i = [];
    if (s === (t + w) % m)
      return i;
    for (let n = 0; n < (w - (s - t)) % m; n++)
      i.push(n + 1);
    return i;
  }
  betweenSelectedRange(e) {
    return !!(this.startDate && this.endDate && e > this.startDate && e < this.endDate && !this.isRangeHover(e));
  }
  isSelected(e) {
    return !!(l(e, this.selectedDate) || this.startDate && l(e, this.startDate) || this.endDate && l(e, this.endDate));
  }
  isStartOfRange(e) {
    return !!(this.startDate && !l(this.startDate, this.endDate) && l(this.startDate, e) && !this.isEndOfRange(e));
  }
  isEndOfRange(e) {
    return !!(this.endDate && !l(this.startDate, this.endDate) && l(this.endDate, e) || !this.endDate && this.hoverRange && l(this.startDate, this.hoverRange.end) && l(e, this.hoverRange.end));
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
    const { start: e, end: a } = this.hoverRange, t = this.isFocusedOnStart(), s = this.startDate && a > this.startDate, i = this.endDate && a < this.endDate, n = this.startDate && e > this.startDate, o = this.endDate && e < this.endDate, r = !t && this.startDate && s && (!this.endDate || i), D = t && this.startDate && n && o;
    return r || D;
  }
  isRangeHover(e) {
    if (!this.hoverRange)
      return !1;
    const { start: a, end: t } = this.hoverRange, s = this.isFocusedOnStart(), i = this.isHoverInRange(), n = e > a && e < this.startDate, o = e < t && e > this.endDate, r = e > t && e < this.endDate, D = e < a && e > this.startDate, g = e < t && e > this.startDate, c = e > a && e < this.endDate, d = this.startDate && this.endDate;
    if (i) {
      if (d)
        return s ? e < this.endDate && (D || n) : r || o;
      if (this.startDate && !this.endDate)
        return s ? n : g;
      if (!this.startDate && this.endDate)
        return s ? c : o;
    } else if (d)
      return s ? n : o;
  }
  getDays(e, a, t, s = "start") {
    let i = this.activeDate.getMonth();
    const n = i + 1;
    i = s === "end" ? n : i;
    let o = 0;
    const r = () => o++ % 7, D = this.activeDate.getFullYear();
    return [
      ...e.map((c) => ({
        active: !1,
        day: c,
        dayInWeek: r(),
        date: new Date(D, i - 1, c)
      })),
      ...a.map((c) => {
        const d = new Date(D, i, c), f = l(d, /* @__PURE__ */ new Date());
        return {
          active: this.focusedDate && this.focusedDate !== this.startDate && this.focusedDate !== this.endDate ? l(d, this.focusedDate) : l(d, this.startDate) || l(d, this.endDate),
          currentMonth: !0,
          currentDay: f,
          day: c,
          dayInWeek: r(),
          date: d
        };
      }),
      ...t.map((c) => ({
        active: !1,
        day: c,
        dayInWeek: r(),
        date: new Date(D, n, c)
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
    const e = this.activeDate.getMonth(), a = this.activeDate.getFullYear(), t = this.localeData.weekStart % 7, { abbreviated: s, short: i, narrow: n } = this.localeData.days, o = this.scale === "s" ? n || i || s : i || s || n, r = [...o.slice(t, 7), ...o.slice(0, t)], D = this.getCurrentMonthDays(e, a), g = this.getPreviousMonthDays(e, a, t), c = this.getNextMonthDays(e, a, t), d = D.length + g.length + c.length;
    if (d < $) {
      const H = c.length ? c[c.length - 1] : 0;
      for (let k = 1; k <= $ - d; k++)
        c.push(H + k);
    }
    const f = e + 1, M = this.getPreviousMonthDays(f, a, t), x = this.getCurrentMonthDays(f, a), R = this.getNextMonthDays(f, a, t), A = this.getDays(g, D, c), I = this.getDays(M, x, R, "end");
    return y`<div class=${u({ [h.calendarContainer]: !0 })} role=grid>${this.renderCalendar(r, A)}${this.range && this.calendars === 2 && this.renderCalendar(r, I, !0) || ""}</div>`;
  }
  renderDateDay({ active: e, currentMonth: a, currentDay: t, date: s, day: i, dayInWeek: n }, o) {
    const r = S(s, this.min, this.max);
    return z(o, y`<div class=${u({ [h.dayContainer]: !0 })} role=gridcell><calcite-date-picker-day .active=${e} class=${u({
      [h.currentDay]: t,
      [h.insideRangeHover]: this.isHoverInRange(),
      [h.outsideRangeHover]: !this.isHoverInRange(),
      [h.noncurrent]: this.range && !a
    })} .currentMonth=${a} .dateTimeFormat=${this.dateTimeFormat} .day=${i} .disabled=${!r} .endOfRange=${this.isEndOfRange(s)} .highlighted=${this.betweenSelectedRange(s)} @calciteInternalDayHover=${this.dayHover} @calciteInternalDaySelect=${this.daySelect} .range=${!!this.startDate && !!this.endDate && !l(this.startDate, this.endDate)} .rangeEdge=${n === 0 ? "start" : n === 6 ? "end" : void 0} .rangeHover=${r && this.isRangeHover(s)} .scale=${this.scale} .selected=${this.isSelected(s)} .startOfRange=${this.isStartOfRange(s)} .value=${s} ${E(this.storeDayRef)}></calcite-date-picker-day></div>`);
  }
  renderCalendar(e, a, t = !1) {
    return y`<div class=${u({
      [h.calendar]: !0,
      [h.calendarStart]: !t
    })}><calcite-date-picker-month-header .activeDate=${t ? B(this.activeDate) : this.activeDate} data-test-calendar=${t ? "end" : "start"} .headingLevel=${this.headingLevel} .localeData=${this.localeData} .max=${this.max} .messages=${this.messages} .min=${this.min} .monthStyle=${this.monthStyle} @calciteInternalDatePickerMonthHeaderSelectChange=${this.monthHeaderSelectChange} .position=${t ? "end" : this.range && this.calendars === 2 ? "start" : null} .scale=${this.scale} .selectedDate=${this.selectedDate}></calcite-date-picker-month-header>${this.renderMonthCalendar(e, a, t)}</div>`;
  }
  renderMonthCalendar(e, a, t = !1) {
    return y`<div class=${u({ [h.month]: !0 })} @keydown=${this.keyDownHandler}><div class=${u({ [h.weekHeaderContainer]: !0 })} role=row>${e.map((i) => y`<span class=${u({ [h.weekHeader]: !0 })} role=columnheader>${i}</span>`)}</div><div class=${u({ [h.weekDays]: !0 })} role=row>${a.map((i, n) => this.renderDateDay(i, t ? 50 + n : n))}</div></div>`;
  }
}
C("calcite-date-picker-month", Y);
export {
  Y as DatePickerMonth
};
