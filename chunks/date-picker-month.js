import { c as R, L as A, h as f, s as u, x as v, d as H } from "./iframe.js";
import { n as I } from "./ref.js";
import { i as F } from "./keyed.js";
import { b as y, i as M, s as o, h as S, c as C, n as P } from "./date.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
const D = {
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
}, E = R`:host([hidden]){display:none}[hidden]{display:none}.calendar-container{display:flex;inline-size:100%}:host([range][layout=vertical]) .calendar-container{flex-direction:column}.calendar{inline-size:100%}.week-header-container{display:flex;block-size:16px;padding-inline:var(--calcite-spacing-sm);padding-block:var(--calcite-spacing-md)}.week-header{display:flex;align-items:center;justify-content:center;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-bold);inline-size:14.2857142857%;color:var(--calcite-date-picker-week-header-text-color, var(--calcite-color-text-3))}.day-container{display:flex;inline-size:100%;min-inline-size:0px;justify-content:center}.day-container calcite-date-picker-day{inline-size:100%}.week-days{display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;padding-inline:var(--calcite-spacing-sm);padding-block-end:var(--calcite-spacing-sm)}.month-header{display:flex;inline-size:100%;justify-content:space-between}.month{display:flex;inline-size:100%;flex-direction:column;justify-content:space-between}.day{font-size:var(--calcite-font-size)}:host([scale=s]) .week-days{padding-inline:var(--calcite-spacing-xs);padding-block-end:var(--calcite-spacing-xs)}:host([scale=s]) .week-header-container{padding-inline:var(--calcite-spacing-xs);padding-block:var(--calcite-spacing-sm)}:host([scale=s]) .day{font-size:var(--calcite-font-size-sm)}:host([scale=l]) .week-header{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) .week-days{padding-inline:var(--calcite-spacing-md);padding-block-end:var(--calcite-spacing-md)}:host([scale=l]) .week-header-container{padding-inline:var(--calcite-spacing-md);padding-block:var(--calcite-spacing-md-plus)}:host([scale=l]) .day{font-size:var(--calcite-font-size-md)}.calendar--start{border-width:0px;border-style:solid;border-color:var(--calcite-date-picker-range-calendar-divider-color, var(--calcite-color-border-1))}:host([range][layout=horizontal]) .calendar--start{border-inline-end-width:var(--calcite-border-width-sm)}:host([range][layout=vertical]) .calendar--start{border-block-end-width:var(--calcite-border-width-sm)}.noncurrent{pointer-events:none;opacity:0}`, p = 7, k = 6;
class z extends A {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.activeDate = /* @__PURE__ */ new Date(), this.range = !1, this.calciteInternalDatePickerDayHover = f({ cancelable: !1 }), this.calciteInternalDatePickerDaySelect = f({ cancelable: !1 }), this.calciteInternalDatePickerMonthActiveDateChange = f({ cancelable: !1 }), this.calciteInternalDatePickerMonthChange = f({ cancelable: !1 }), this.calciteInternalDatePickerMonthMouseOut = f({ cancelable: !1 }), this.listen("pointerout", this.pointerOutHandler), this.listen("focusout", this.disableActiveFocus);
  }
  static {
    this.properties = { focusedDate: 16, activeDate: 0, dateTimeFormat: 0, endDate: 0, headingLevel: 11, hoverRange: 0, layout: 3, localeData: 0, max: 0, messages: 0, min: 0, monthStyle: 1, range: 7, scale: 3, selectedDate: 0, startDate: 0 };
  }
  static {
    this.styles = E;
  }
  load() {
    this.focusedDate = this.selectedDate || this.activeDate;
  }
  willUpdate(e) {
    e.has("activeDate") && this.updateFocusedDateWithActive(this.activeDate), e.has("selectedDate") && (this.focusedDate = this.selectedDate);
  }
  // #endregion
  // #region Private Methods
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
  /**
   * Once user is not interacting via keyboard,
   * disable auto focusing of active date
   */
  disableActiveFocus() {
    this.activeFocus = !1;
  }
  pointerOutHandler() {
    this.calciteInternalDatePickerMonthMouseOut.emit();
  }
  /**
   * Add n months to the current month
   *
   * @param step
   * @param targetDate
   */
  addMonths(e, a) {
    const t = new Date(a);
    t.setMonth(a.getMonth() + e), this.calciteInternalDatePickerMonthActiveDateChange.emit(y(t, this.min, this.max)), this.focusedDate = y(t, this.min, this.max), this.activeFocus = !0, this.calciteInternalDatePickerDayHover.emit(t);
  }
  /**
   * Add n days to the current date
   *
   * @param step
   * @param targetDate
   */
  addDays(e = 0, a) {
    const t = new Date(a);
    t.setDate(a.getDate() + e), this.calciteInternalDatePickerMonthActiveDateChange.emit(y(t, this.min, this.max)), this.focusedDate = y(t, this.min, this.max), this.activeFocus = !0, this.calciteInternalDatePickerDayHover.emit(t);
  }
  /**
   * Get dates for last days of the previous month
   *
   * @param month
   * @param year
   * @param startOfWeek
   */
  getPreviousMonthDays(e, a, t) {
    const s = new Date(a, e, 0), i = s.getDate(), n = s.getDay(), r = [];
    if (n === (t + k) % p)
      return r;
    if (n === t)
      return [i];
    for (let c = (p + n - t) % p; c >= 0; c--)
      r.push(i - c);
    return r;
  }
  /**
   * Get dates for the current month
   *
   * @param month
   * @param year
   */
  getCurrentMonthDays(e, a) {
    const t = new Date(a, e + 1, 0).getDate(), s = [];
    for (let i = 0; i < t; i++)
      s.push(i + 1);
    return s;
  }
  /**
   * Get dates for first days of the next month
   *
   * @param month
   * @param year
   * @param startOfWeek
   */
  getNextMonthDays(e, a, t) {
    const s = new Date(a, e + 1, 0).getDay(), i = [];
    if (s === (t + k) % p)
      return i;
    for (let n = 0; n < (k - (s - t)) % p; n++)
      i.push(n + 1);
    return i;
  }
  /**
   * Determine if the date is in between the start and end dates
   *
   * @param date
   */
  betweenSelectedRange(e) {
    return !!(this.startDate && this.endDate && e > this.startDate && e < this.endDate && !this.isRangeHover(e));
  }
  /**
   * Determine if the date should be in selected state
   *
   * @param date
   */
  isSelected(e) {
    return !!(o(e, this.selectedDate) || this.startDate && o(e, this.startDate) || this.endDate && o(e, this.endDate));
  }
  /**
   * Determine if the date is the start of the date range
   *
   * @param date
   */
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
    const { start: e, end: a } = this.hoverRange, t = this.isFocusedOnStart(), s = this.startDate && a > this.startDate, i = this.endDate && a < this.endDate, n = this.startDate && e > this.startDate, r = this.endDate && e < this.endDate, c = !t && this.startDate && s && (!this.endDate || i), h = t && this.startDate && n && r;
    return c || h;
  }
  isRangeHover(e) {
    if (!this.hoverRange)
      return !1;
    const { start: a, end: t } = this.hoverRange, s = this.isFocusedOnStart(), i = this.isHoverInRange(), n = e > a && e < this.startDate, r = e < t && e > this.endDate, c = e > t && e < this.endDate, h = e < a && e > this.startDate, g = e < t && e > this.startDate, d = e > a && e < this.endDate, l = this.startDate && this.endDate;
    if (i) {
      if (l)
        return s ? e < this.endDate && (h || n) : c || r;
      if (this.startDate && !this.endDate)
        return s ? n : g;
      if (!this.startDate && this.endDate)
        return s ? d : r;
    } else if (l)
      return s ? n : r;
  }
  getDays(e, a, t, s = "start") {
    let i = this.activeDate.getMonth();
    const n = i + 1;
    i = s === "end" ? n : i;
    let r = 0;
    const c = () => r++ % 7, h = this.activeDate.getFullYear();
    return [
      ...e.map((d) => ({
        active: !1,
        day: d,
        dayInWeek: c(),
        date: new Date(h, i - 1, d)
      })),
      ...a.map((d) => {
        const l = new Date(h, i, d), m = o(l, /* @__PURE__ */ new Date());
        return {
          active: this.focusedDate && this.focusedDate !== this.startDate && this.focusedDate !== this.endDate ? o(l, this.focusedDate) : o(l, this.startDate) || o(l, this.endDate),
          currentMonth: !0,
          currentDay: m,
          day: d,
          dayInWeek: c(),
          date: l,
          ref: !0
        };
      }),
      ...t.map((d) => ({
        active: !1,
        day: d,
        dayInWeek: c(),
        date: new Date(h, n, d)
      }))
    ];
  }
  monthHeaderSelectChange(e) {
    const a = new Date(e.detail), t = e.target;
    this.updateFocusableDate(a), e.stopPropagation(), this.calciteInternalDatePickerMonthChange.emit({ date: a, position: t.position });
  }
  updateFocusableDate(e) {
    !this.selectedDate || !this.range ? this.focusedDate = this.getFirstValidDateOfMonth(e) : this.selectedDate && this.range && (!S(this.startDate, e) || !S(this.endDate, e)) && (this.focusedDate = this.getFirstValidDateOfMonth(e));
  }
  getFirstValidDateOfMonth(e) {
    return e.getDate() === 1 ? e : C(e, this.min, this.max);
  }
  // #endregion
  // #region Rendering
  render() {
    const e = this.activeDate.getMonth(), a = this.activeDate.getFullYear(), t = this.localeData.weekStart % 7, { abbreviated: s, short: i, narrow: n } = this.localeData.days, r = this.scale === "s" ? n || i || s : i || s || n, c = [...r.slice(t, 7), ...r.slice(0, t)], h = this.getCurrentMonthDays(e, a), g = this.getPreviousMonthDays(e, a, t), d = this.getNextMonthDays(e, a, t), l = e + 1, m = this.getPreviousMonthDays(l, a, t), w = this.getCurrentMonthDays(l, a), b = this.getNextMonthDays(l, a, t), $ = this.getDays(g, h, d), x = this.getDays(m, w, b, "end");
    return v`<div class=${u({ [D.calendarContainer]: !0 })} role=grid>${this.renderCalendar(c, $)}${this.range && this.renderCalendar(c, x, !0) || ""}</div>`;
  }
  /**
   * Render calcite-date-picker-day
   *
   * @param active.active
   * @param active
   * @param day
   * @param dayInWeek
   * @param date
   * @param currentMonth
   * @param ref
   * @param active.currentMonth
   * @param active.date
   * @param active.day
   * @param active.dayInWeek
   * @param active.ref
   * @param key
   * @param active.currentDay
   */
  renderDateDay({ active: e, currentMonth: a, currentDay: t, date: s, day: i, dayInWeek: n, ref: r }, c) {
    const h = M(s, this.min, this.max);
    return F(c, v`<div class=${u({ [D.dayContainer]: !0 })} role=gridcell><calcite-date-picker-day .active=${e} class=${u({
      [D.currentDay]: t,
      [D.insideRangeHover]: this.isHoverInRange(),
      [D.outsideRangeHover]: !this.isHoverInRange(),
      [D.noncurrent]: this.range && !a
    })} .currentMonth=${a} .dateTimeFormat=${this.dateTimeFormat} .day=${i} .disabled=${!h} .endOfRange=${this.isEndOfRange(s)} .highlighted=${this.betweenSelectedRange(s)} @calciteInternalDayHover=${this.dayHover} @calciteInternalDaySelect=${this.daySelect} .range=${!!this.startDate && !!this.endDate && !o(this.startDate, this.endDate)} .rangeEdge=${n === 0 ? "start" : n === 6 ? "end" : void 0} .rangeHover=${h && this.isRangeHover(s)} .scale=${this.scale} .selected=${this.isSelected(s)} .startOfRange=${this.isStartOfRange(s)} .value=${s} ${I((g) => {
      r && e && this.activeFocus && g?.setFocus();
    })}></calcite-date-picker-day></div>`);
  }
  renderCalendar(e, a, t = !1) {
    return v`<div class=${u({
      [D.calendar]: !0,
      [D.calendarStart]: !t
    })}><calcite-date-picker-month-header .activeDate=${t ? P(this.activeDate) : this.activeDate} data-test-calendar=${t ? "end" : "start"} .headingLevel=${this.headingLevel} .localeData=${this.localeData} .max=${this.max} .messages=${this.messages} .min=${this.min} .monthStyle=${this.monthStyle} @calciteInternalDatePickerMonthHeaderSelectChange=${this.monthHeaderSelectChange} .position=${t ? "end" : this.range ? "start" : null} .scale=${this.scale} .selectedDate=${this.selectedDate}></calcite-date-picker-month-header>${this.renderMonthCalendar(e, a, t)}</div>`;
  }
  renderMonthCalendar(e, a, t = !1) {
    return v`<div class=${u({ [D.month]: !0 })} @keydown=${this.keyDownHandler}><div class=${u({ [D.weekHeaderContainer]: !0 })} role=row>${e.map((i) => v`<span class=${u({ [D.weekHeader]: !0 })} role=columnheader>${i}</span>`)}</div><div class=${u({ [D.weekDays]: !0 })} role=row>${a.map((i, n) => this.renderDateDay(i, t ? 50 + n : n))}</div></div>`;
  }
}
H("calcite-date-picker-month", z);
export {
  z as DatePickerMonth
};
