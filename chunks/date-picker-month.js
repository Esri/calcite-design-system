import { a as F, L as P, d as v, s as u, x as y, c as C } from "./iframe.js";
import { n as E } from "./ref.js";
import { i as z } from "./keyed.js";
import { b as p, i as S, s as h, h as b, c as O, n as B } from "./date.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const d = {
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
}, L = F`:host([hidden]){display:none}[hidden]{display:none}.calendar-container{display:flex;inline-size:100%}:host([range][layout=vertical]) .calendar-container{flex-direction:column}.calendar{inline-size:100%}.week-header-container{display:flex;block-size:16px;padding-inline:var(--calcite-spacing-sm);padding-block:var(--calcite-spacing-md)}.week-header{display:flex;align-items:center;justify-content:center;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-bold);inline-size:14.2857142857%;color:var(--calcite-date-picker-week-header-text-color, var(--calcite-color-text-3))}.day-container{display:flex;inline-size:100%;min-inline-size:0px;justify-content:center}.day-container calcite-date-picker-day{inline-size:100%}.week-days{display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;padding-inline:var(--calcite-spacing-sm);padding-block-end:var(--calcite-spacing-sm)}.month-header{display:flex;inline-size:100%;justify-content:space-between}.month{display:flex;inline-size:100%;flex-direction:column;justify-content:space-between}.day{font-size:var(--calcite-font-size)}:host([scale=s]) .week-days{padding-inline:var(--calcite-spacing-xs);padding-block-end:var(--calcite-spacing-xs)}:host([scale=s]) .week-header-container{padding-inline:var(--calcite-spacing-xs);padding-block:var(--calcite-spacing-sm)}:host([scale=s]) .day{font-size:var(--calcite-font-size-sm)}:host([scale=l]) .week-header{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) .week-days{padding-inline:var(--calcite-spacing-md);padding-block-end:var(--calcite-spacing-md)}:host([scale=l]) .week-header-container{padding-inline:var(--calcite-spacing-md);padding-block:var(--calcite-spacing-md-plus)}:host([scale=l]) .day{font-size:var(--calcite-font-size-md)}.calendar--start{border-width:0px;border-style:solid;border-color:var(--calcite-date-picker-range-calendar-divider-color, var(--calcite-color-border-1))}:host([range][layout=horizontal]) .calendar--start{border-inline-end-width:var(--calcite-border-width-sm)}:host([range][layout=vertical]) .calendar--start{border-block-end-width:var(--calcite-border-width-sm)}.noncurrent{pointer-events:none;opacity:0}`, m = 7, w = 6, $ = 42;
class Y extends P {
  constructor() {
    super(), this.activeDate = /* @__PURE__ */ new Date(), this.range = !1, this.calciteInternalDatePickerDayHover = v({ cancelable: !1 }), this.calciteInternalDatePickerDaySelect = v({ cancelable: !1 }), this.calciteInternalDatePickerMonthActiveDateChange = v({ cancelable: !1 }), this.calciteInternalDatePickerMonthChange = v({ cancelable: !1 }), this.calciteInternalDatePickerMonthMouseOut = v({ cancelable: !1 }), this.listen("pointerout", this.pointerOutHandler), this.listen("focusout", this.disableActiveFocus);
  }
  static {
    this.properties = { focusedDate: 16, activeDate: 0, dateTimeFormat: 0, endDate: 0, headingLevel: 11, hoverRange: 0, layout: 3, localeData: 0, max: 0, messages: 0, min: 0, monthStyle: 1, range: 7, scale: 3, selectedDate: 0, startDate: 0 };
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
    const s = new Date(a, e, 0), n = s.getDate(), i = s.getDay(), c = [];
    if (i === (t + w) % m)
      return c;
    if (i === t)
      return [n];
    for (let o = (m + i - t) % m; o >= 0; o--)
      c.push(n - o);
    return c;
  }
  getCurrentMonthDays(e, a) {
    const t = new Date(a, e + 1, 0).getDate(), s = [];
    for (let n = 0; n < t; n++)
      s.push(n + 1);
    return s;
  }
  getNextMonthDays(e, a, t) {
    const s = new Date(a, e + 1, 0).getDay(), n = [];
    if (s === (t + w) % m)
      return n;
    for (let i = 0; i < (w - (s - t)) % m; i++)
      n.push(i + 1);
    return n;
  }
  betweenSelectedRange(e) {
    return !!(this.startDate && this.endDate && e > this.startDate && e < this.endDate && !this.isRangeHover(e));
  }
  isSelected(e) {
    return !!(h(e, this.selectedDate) || this.startDate && h(e, this.startDate) || this.endDate && h(e, this.endDate));
  }
  isStartOfRange(e) {
    return !!(this.startDate && !h(this.startDate, this.endDate) && h(this.startDate, e) && !this.isEndOfRange(e));
  }
  isEndOfRange(e) {
    return !!(this.endDate && !h(this.startDate, this.endDate) && h(this.endDate, e) || !this.endDate && this.hoverRange && h(this.startDate, this.hoverRange.end) && h(e, this.hoverRange.end));
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
    const { start: e, end: a } = this.hoverRange, t = this.isFocusedOnStart(), s = this.startDate && a > this.startDate, n = this.endDate && a < this.endDate, i = this.startDate && e > this.startDate, c = this.endDate && e < this.endDate, o = !t && this.startDate && s && (!this.endDate || n), l = t && this.startDate && i && c;
    return o || l;
  }
  isRangeHover(e) {
    if (!this.hoverRange)
      return !1;
    const { start: a, end: t } = this.hoverRange, s = this.isFocusedOnStart(), n = this.isHoverInRange(), i = e > a && e < this.startDate, c = e < t && e > this.endDate, o = e > t && e < this.endDate, l = e < a && e > this.startDate, g = e < t && e > this.startDate, r = e > a && e < this.endDate, D = this.startDate && this.endDate;
    if (n) {
      if (D)
        return s ? e < this.endDate && (l || i) : o || c;
      if (this.startDate && !this.endDate)
        return s ? i : g;
      if (!this.startDate && this.endDate)
        return s ? r : c;
    } else if (D)
      return s ? i : c;
  }
  getDays(e, a, t, s = "start") {
    let n = this.activeDate.getMonth();
    const i = n + 1;
    n = s === "end" ? i : n;
    let c = 0;
    const o = () => c++ % 7, l = this.activeDate.getFullYear();
    return [
      ...e.map((r) => ({
        active: !1,
        day: r,
        dayInWeek: o(),
        date: new Date(l, n - 1, r)
      })),
      ...a.map((r) => {
        const D = new Date(l, n, r), f = h(D, /* @__PURE__ */ new Date());
        return {
          active: this.focusedDate && this.focusedDate !== this.startDate && this.focusedDate !== this.endDate ? h(D, this.focusedDate) : h(D, this.startDate) || h(D, this.endDate),
          currentMonth: !0,
          currentDay: f,
          day: r,
          dayInWeek: o(),
          date: D,
          ref: !0
        };
      }),
      ...t.map((r) => ({
        active: !1,
        day: r,
        dayInWeek: o(),
        date: new Date(l, i, r)
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
    const e = this.activeDate.getMonth(), a = this.activeDate.getFullYear(), t = this.localeData.weekStart % 7, { abbreviated: s, short: n, narrow: i } = this.localeData.days, c = this.scale === "s" ? i || n || s : n || s || i, o = [...c.slice(t, 7), ...c.slice(0, t)], l = this.getCurrentMonthDays(e, a), g = this.getPreviousMonthDays(e, a, t), r = this.getNextMonthDays(e, a, t), D = l.length + g.length + r.length;
    if (D < $) {
      const H = r.length ? r[r.length - 1] : 0;
      for (let k = 1; k <= $ - D; k++)
        r.push(H + k);
    }
    const f = e + 1, M = this.getPreviousMonthDays(f, a, t), x = this.getCurrentMonthDays(f, a), R = this.getNextMonthDays(f, a, t), A = this.getDays(g, l, r), I = this.getDays(M, x, R, "end");
    return y`<div class=${u({ [d.calendarContainer]: !0 })} role=grid>${this.renderCalendar(o, A)}${this.range && this.renderCalendar(o, I, !0) || ""}</div>`;
  }
  renderDateDay({ active: e, currentMonth: a, currentDay: t, date: s, day: n, dayInWeek: i, ref: c }, o) {
    const l = S(s, this.min, this.max);
    return z(o, y`<div class=${u({ [d.dayContainer]: !0 })} role=gridcell><calcite-date-picker-day .active=${e} class=${u({
      [d.currentDay]: t,
      [d.insideRangeHover]: this.isHoverInRange(),
      [d.outsideRangeHover]: !this.isHoverInRange(),
      [d.noncurrent]: this.range && !a
    })} .currentMonth=${a} .dateTimeFormat=${this.dateTimeFormat} .day=${n} .disabled=${!l} .endOfRange=${this.isEndOfRange(s)} .highlighted=${this.betweenSelectedRange(s)} @calciteInternalDayHover=${this.dayHover} @calciteInternalDaySelect=${this.daySelect} .range=${!!this.startDate && !!this.endDate && !h(this.startDate, this.endDate)} .rangeEdge=${i === 0 ? "start" : i === 6 ? "end" : void 0} .rangeHover=${l && this.isRangeHover(s)} .scale=${this.scale} .selected=${this.isSelected(s)} .startOfRange=${this.isStartOfRange(s)} .value=${s} ${E((g) => {
      c && e && this.activeFocus && g?.setFocus();
    })}></calcite-date-picker-day></div>`);
  }
  renderCalendar(e, a, t = !1) {
    return y`<div class=${u({
      [d.calendar]: !0,
      [d.calendarStart]: !t
    })}><calcite-date-picker-month-header .activeDate=${t ? B(this.activeDate) : this.activeDate} data-test-calendar=${t ? "end" : "start"} .headingLevel=${this.headingLevel} .localeData=${this.localeData} .max=${this.max} .messages=${this.messages} .min=${this.min} .monthStyle=${this.monthStyle} @calciteInternalDatePickerMonthHeaderSelectChange=${this.monthHeaderSelectChange} .position=${t ? "end" : this.range ? "start" : null} .scale=${this.scale} .selectedDate=${this.selectedDate}></calcite-date-picker-month-header>${this.renderMonthCalendar(e, a, t)}</div>`;
  }
  renderMonthCalendar(e, a, t = !1) {
    return y`<div class=${u({ [d.month]: !0 })} @keydown=${this.keyDownHandler}><div class=${u({ [d.weekHeaderContainer]: !0 })} role=row>${e.map((n) => y`<span class=${u({ [d.weekHeader]: !0 })} role=columnheader>${n}</span>`)}</div><div class=${u({ [d.weekDays]: !0 })} role=row>${a.map((n, i) => this.renderDateDay(n, t ? 50 + i : i))}</div></div>`;
  }
}
C("calcite-date-picker-month", Y);
export {
  Y as DatePickerMonth
};
