// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode } from "@arcgis/lumina";
import {
  dateFromRange,
  getFirstValidDateInMonth,
  hasSameMonthAndYear,
  HoverRange,
  inRange,
  nextMonth,
  sameDate,
} from "../../utils/date";
import { DateLocaleData } from "../date-picker/utils";
import { Scale } from "../interfaces";
import { HeadingLevel } from "../functional/Heading";
import type { DatePickerMonthHeader } from "../date-picker-month-header/date-picker-month-header";
import type { DatePickerDay } from "../date-picker-day/date-picker-day";
import type { DatePicker } from "../date-picker/date-picker";
import { CSS } from "./resources";
import { styles } from "./date-picker-month.scss";

declare global {
  interface DeclareElements {
    "calcite-date-picker-month": DatePickerMonth;
  }
}

const DAYS_PER_WEEK = 7;
const DAYS_MAXIMUM_INDEX = 6;
const NUM_DAYS_TO_DISPLAY = 42; // 6 weeks * 7 days per week

interface Day {
  active: boolean;
  currentMonth?: boolean;
  currentDay?: boolean;
  date: Date;
  day: number;
  dayInWeek?: number;
}

export class DatePickerMonth extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private activeFocus: boolean;

  //#endregion

  //#region State Properties

  @state() focusedDate: Date;

  //#endregion

  //#region Public Properties

  /** The currently active Date. */
  @property() activeDate: Date = new Date();

  /** Specifies the number of calendars displayed when `range` is `true`. */
  @property({ type: Number, reflect: true }) calendars: 1 | 2 = 2;

  /**
   * The DateTimeFormat used to provide screen reader labels.
   *
   * @private
   */
  @property() dateTimeFormat: Intl.DateTimeFormat;

  /** End date currently active. */
  @property() endDate?: Date;

  /** Specifies the number at which section headings should start. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** The range of dates currently being hovered. */
  @property() hoverRange: HoverRange;

  /**
   * Specifies the layout of the component.
   *
   * @private
   */
  @property({ reflect: true }) layout: "horizontal" | "vertical";

  /**
   * CLDR locale data for current locale.
   *
   * @private
   */
  @property() localeData: DateLocaleData;

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @property() max: Date;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  @property() messages: DatePicker["messages"]["_overrides"];

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @property() min: Date;

  /** Specifies the monthStyle used by the component. */
  @property() monthStyle: "abbreviated" | "wide";

  /** When present, activates the component's range mode which renders two calendars for selecting ranges of dates. */
  @property({ reflect: true }) range: boolean = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale;

  /** Already selected date. */
  @property() selectedDate: Date;

  /** Start date currently active. */
  @property() startDate?: Date;

  //#endregion

  //#region Events

  /**
   * Fires when user hovers the date.
   *
   * @private
   */
  calciteInternalDatePickerDayHover = createEvent<Date>({ cancelable: false });

  /**
   * Fires when user selects the date.
   *
   * @private
   */
  calciteInternalDatePickerDaySelect = createEvent<Date>({ cancelable: false });

  /**
   * Active date for the user keyboard access.
   *
   * @private
   */
  calciteInternalDatePickerMonthActiveDateChange = createEvent<Date>({ cancelable: false });

  /**
   * Emits when user updates month or year using `calcite-date-picker-month-header` component.
   *
   * @private
   */
  calciteInternalDatePickerMonthChange = createEvent<{
    date: Date;
    position: string;
  }>({ cancelable: false });

  /** @private */
  calciteInternalDatePickerMonthMouseOut = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("pointerout", this.pointerOutHandler);
    this.listen("focusout", this.disableActiveFocus);
  }

  load(): void {
    this.focusedDate = this.selectedDate || this.activeDate;
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("activeDate")) {
      this.updateFocusedDateWithActive(this.activeDate);
    }

    if (changes.has("selectedDate")) {
      this.focusedDate = this.selectedDate;
    }
  }

  //#endregion

  //#region Private Methods

  private storeDayRef(el: DatePickerDay["el"]): void {
    if (!el) {
      return;
    }

    // when moving via keyboard, focus must be updated on active date
    if (el.active && this.activeFocus) {
      el.setFocus();
    }
  }

  private updateFocusedDateWithActive(newActiveDate: Date): void {
    if (!this.selectedDate) {
      this.focusedDate = inRange(newActiveDate, this.min, this.max)
        ? newActiveDate
        : dateFromRange(newActiveDate, this.min, this.max);
    }
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    const isRTL = this.el.dir === "rtl";
    const dateValue = (event.target as DatePickerDay["el"]).value;

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        this.addDays(-7, dateValue);
        break;
      case "ArrowRight":
        event.preventDefault();
        this.addDays(isRTL ? -1 : 1, dateValue);
        break;
      case "ArrowDown":
        event.preventDefault();
        this.addDays(7, dateValue);
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.addDays(isRTL ? 1 : -1, dateValue);
        break;
      case "PageUp":
        event.preventDefault();
        this.addMonths(-1, dateValue);
        break;
      case "PageDown":
        event.preventDefault();
        this.addMonths(1, dateValue);
        break;
      case "Home":
        event.preventDefault();
        this.activeDate.setDate(1);
        this.addDays(0, dateValue);
        break;
      case "End":
        event.preventDefault();
        this.activeDate.setDate(
          new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate(),
        );
        this.addDays(0, dateValue);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        break;
      case "Tab":
        this.activeFocus = false;
    }
  }

  /**
   * Once user is not interacting via keyboard,
   * disable auto focusing of active date
   */
  private disableActiveFocus(): void {
    this.activeFocus = false;
  }

  private pointerOutHandler(): void {
    this.calciteInternalDatePickerMonthMouseOut.emit();
  }

  /**
   * Add n months to the current month
   *
   * @param step
   * @param targetDate
   */
  private addMonths(step: number, targetDate: Date): void {
    const nextDate = new Date(targetDate);
    nextDate.setMonth(targetDate.getMonth() + step);
    this.calciteInternalDatePickerMonthActiveDateChange.emit(
      dateFromRange(nextDate, this.min, this.max),
    );
    this.focusedDate = dateFromRange(nextDate, this.min, this.max);
    this.activeFocus = true;
    this.calciteInternalDatePickerDayHover.emit(nextDate);
  }

  /**
   * Add n days to the current date
   *
   * @param step
   * @param targetDate
   */
  private addDays(step = 0, targetDate: Date): void {
    const nextDate = new Date(targetDate);
    nextDate.setDate(targetDate.getDate() + step);
    this.calciteInternalDatePickerMonthActiveDateChange.emit(
      dateFromRange(nextDate, this.min, this.max),
    );

    this.focusedDate = dateFromRange(nextDate, this.min, this.max);
    this.activeFocus = true;
    this.calciteInternalDatePickerDayHover.emit(nextDate);
  }

  /**
   * Get dates for last days of the previous month
   *
   * @param month
   * @param year
   * @param startOfWeek
   */
  private getPreviousMonthDays(month: number, year: number, startOfWeek: number): number[] {
    const lastDate = new Date(year, month, 0);
    const date = lastDate.getDate();
    const startDay = lastDate.getDay();
    const days = [];

    if (startDay === (startOfWeek + DAYS_MAXIMUM_INDEX) % DAYS_PER_WEEK) {
      return days;
    }

    if (startDay === startOfWeek) {
      return [date];
    }

    for (let i = (DAYS_PER_WEEK + startDay - startOfWeek) % DAYS_PER_WEEK; i >= 0; i--) {
      days.push(date - i);
    }
    return days;
  }

  /**
   * Get dates for the current month
   *
   * @param month
   * @param year
   */
  private getCurrentMonthDays(month: number, year: number): number[] {
    const num = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < num; i++) {
      days.push(i + 1);
    }
    return days;
  }

  /**
   * Get dates for first days of the next month
   *
   * @param month
   * @param year
   * @param startOfWeek
   */
  private getNextMonthDays(month: number, year: number, startOfWeek: number): number[] {
    const endDay = new Date(year, month + 1, 0).getDay();
    const days = [];
    if (endDay === (startOfWeek + DAYS_MAXIMUM_INDEX) % DAYS_PER_WEEK) {
      return days;
    }
    for (let i = 0; i < (DAYS_MAXIMUM_INDEX - (endDay - startOfWeek)) % DAYS_PER_WEEK; i++) {
      days.push(i + 1);
    }
    return days;
  }

  /**
   * Determine if the date is in between the start and end dates
   *
   * @param date
   */
  private betweenSelectedRange(date: Date): boolean {
    return !!(
      this.startDate &&
      this.endDate &&
      date > this.startDate &&
      date < this.endDate &&
      !this.isRangeHover(date)
    );
  }

  /**
   * Determine if the date should be in selected state
   *
   * @param date
   */
  private isSelected(date: Date): boolean {
    return !!(
      sameDate(date, this.selectedDate) ||
      (this.startDate && sameDate(date, this.startDate)) ||
      (this.endDate && sameDate(date, this.endDate))
    );
  }

  /**
   * Determine if the date is the start of the date range
   *
   * @param date
   */
  private isStartOfRange(date: Date): boolean {
    return !!(
      this.startDate &&
      !sameDate(this.startDate, this.endDate) &&
      sameDate(this.startDate, date) &&
      !this.isEndOfRange(date)
    );
  }

  private isEndOfRange(date: Date): boolean {
    return !!(
      (this.endDate && !sameDate(this.startDate, this.endDate) && sameDate(this.endDate, date)) ||
      (!this.endDate &&
        this.hoverRange &&
        sameDate(this.startDate, this.hoverRange.end) &&
        sameDate(date, this.hoverRange.end))
    );
  }

  private dayHover(event: CustomEvent): void {
    const target = event.target as DatePickerDay["el"];
    if (target.disabled) {
      this.calciteInternalDatePickerMonthMouseOut.emit();
    } else {
      this.calciteInternalDatePickerDayHover.emit(target.value);
    }
    event.stopPropagation();
  }

  private daySelect(event: CustomEvent): void {
    const target = event.target as DatePickerDay["el"];
    this.activeFocus = false;
    this.calciteInternalDatePickerDaySelect.emit(target.value);
    event.stopPropagation();
  }

  private isFocusedOnStart(): boolean {
    return this.hoverRange?.focused === "start";
  }

  private isHoverInRange(): boolean {
    if (!this.hoverRange || !this.startDate) {
      return false;
    }
    const { start, end } = this.hoverRange;
    const isStartFocused = this.isFocusedOnStart();
    const isEndAfterStart = this.startDate && end > this.startDate;
    const isEndBeforeEnd = this.endDate && end < this.endDate;
    const isStartAfterStart = this.startDate && start > this.startDate;
    const isStartBeforeEnd = this.endDate && start < this.endDate;

    const isEndDateAfterStartAndBeforeEnd =
      !isStartFocused && this.startDate && isEndAfterStart && (!this.endDate || isEndBeforeEnd);
    const isStartDateBeforeEndAndAfterStart =
      isStartFocused && this.startDate && isStartAfterStart && isStartBeforeEnd;

    return isEndDateAfterStartAndBeforeEnd || isStartDateBeforeEndAndAfterStart;
  }

  private isRangeHover(date: Date): boolean {
    if (!this.hoverRange) {
      return false;
    }
    const { start, end } = this.hoverRange;
    const isStartFocused = this.isFocusedOnStart();
    const insideRange = this.isHoverInRange();

    const isDateBeforeStartDateAndAfterStart = date > start && date < this.startDate;
    const isDateAfterEndDateAndBeforeEnd = date < end && date > this.endDate;
    const isDateBeforeEndDateAndAfterEnd = date > end && date < this.endDate;
    const isDateAfterStartDateAndBeforeStart = date < start && date > this.startDate;
    const isDateAfterStartDateAndBeforeEnd = date < end && date > this.startDate;
    const isDateBeforeEndDateAndAfterStart = date > start && date < this.endDate;
    const hasBothStartAndEndDate = this.startDate && this.endDate;

    if (insideRange) {
      if (hasBothStartAndEndDate) {
        return isStartFocused
          ? date < this.endDate &&
              (isDateAfterStartDateAndBeforeStart || isDateBeforeStartDateAndAfterStart)
          : isDateBeforeEndDateAndAfterEnd || isDateAfterEndDateAndBeforeEnd;
      } else if (this.startDate && !this.endDate) {
        return isStartFocused
          ? isDateBeforeStartDateAndAfterStart
          : isDateAfterStartDateAndBeforeEnd;
      } else if (!this.startDate && this.endDate) {
        return isStartFocused ? isDateBeforeEndDateAndAfterStart : isDateAfterEndDateAndBeforeEnd;
      }
    } else {
      if (hasBothStartAndEndDate) {
        return isStartFocused ? isDateBeforeStartDateAndAfterStart : isDateAfterEndDateAndBeforeEnd;
      }
    }
  }

  private getDays(
    prevMonthDays: number[],
    currMonthDays: number[],
    nextMonthDays: number[],
    position: "start" | "end" = "start",
  ): Day[] {
    let month = this.activeDate.getMonth();
    const nextMonth = month + 1;
    month = position === "end" ? nextMonth : month;
    let dayInWeek = 0;
    const getDayInWeek = () => dayInWeek++ % 7;
    const year = this.activeDate.getFullYear();

    const days: Day[] = [
      ...prevMonthDays.map((day) => {
        return {
          active: false,
          day,
          dayInWeek: getDayInWeek(),
          date: new Date(year, month - 1, day),
        };
      }),
      ...currMonthDays.map((day) => {
        const date = new Date(year, month, day);
        const isCurrentDay = sameDate(date, new Date());
        const active =
          this.focusedDate &&
          this.focusedDate !== this.startDate &&
          this.focusedDate !== this.endDate
            ? sameDate(date, this.focusedDate)
            : sameDate(date, this.startDate) || sameDate(date, this.endDate);

        return {
          active,
          currentMonth: true,
          currentDay: isCurrentDay,
          day,
          dayInWeek: getDayInWeek(),
          date,
        };
      }),
      ...nextMonthDays.map((day) => {
        return {
          active: false,
          day,
          dayInWeek: getDayInWeek(),
          date: new Date(year, nextMonth, day),
        };
      }),
    ];

    return days;
  }

  private monthHeaderSelectChange(event: CustomEvent<Date>): void {
    const date = new Date(event.detail);
    const target = event.target as DatePickerMonthHeader["el"];
    this.updateFocusableDate(date);
    event.stopPropagation();
    this.calciteInternalDatePickerMonthChange.emit({ date, position: target.position });
  }

  private updateFocusableDate(date: Date): void {
    if (!this.selectedDate || !this.range) {
      this.focusedDate = this.getFirstValidDateOfMonth(date);
    } else if (this.selectedDate && this.range) {
      if (!hasSameMonthAndYear(this.startDate, date) || !hasSameMonthAndYear(this.endDate, date)) {
        this.focusedDate = this.getFirstValidDateOfMonth(date);
      }
    }
  }

  private getFirstValidDateOfMonth(date: Date): Date {
    return date.getDate() === 1 ? date : getFirstValidDateInMonth(date, this.min, this.max);
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const month = this.activeDate.getMonth();
    const year = this.activeDate.getFullYear();
    const startOfWeek = this.localeData.weekStart % 7;
    const { abbreviated, short, narrow } = this.localeData.days;
    const weekDays =
      this.scale === "s" ? narrow || short || abbreviated : short || abbreviated || narrow;
    const adjustedWeekDays = [...weekDays.slice(startOfWeek, 7), ...weekDays.slice(0, startOfWeek)];
    const curMonDays = this.getCurrentMonthDays(month, year);
    const prevMonDays = this.getPreviousMonthDays(month, year, startOfWeek);
    const nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
    const numDaysDisplayed = curMonDays.length + prevMonDays.length + nextMonDays.length;
    if (numDaysDisplayed < NUM_DAYS_TO_DISPLAY) {
      const initialDay = nextMonDays.length ? nextMonDays[nextMonDays.length - 1] : 0;
      for (let i = 1; i <= NUM_DAYS_TO_DISPLAY - numDaysDisplayed; i++) {
        nextMonDays.push(initialDay + i);
      }
    }

    const nextMonth = month + 1;
    const endCalendarPrevMonDays = this.getPreviousMonthDays(nextMonth, year, startOfWeek);
    const endCalendarCurrMonDays = this.getCurrentMonthDays(nextMonth, year);
    const endCalendarNextMonDays = this.getNextMonthDays(nextMonth, year, startOfWeek);
    const days = this.getDays(prevMonDays, curMonDays, nextMonDays);

    const nextMonthDays = this.getDays(
      endCalendarPrevMonDays,
      endCalendarCurrMonDays,
      endCalendarNextMonDays,
      "end",
    );

    return (
      <div class={{ [CSS.calendarContainer]: true }} role="grid">
        {this.renderCalendar(adjustedWeekDays, days)}
        {this.range &&
          this.calendars === 2 &&
          this.renderCalendar(adjustedWeekDays, nextMonthDays, true)}
      </div>
    );
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
   * @param dayInfo
   * @param key
   * @param active.currentDay
   */
  private renderDateDay(
    { active, currentMonth, currentDay, date, day, dayInWeek }: Day,
    key: number,
  ): JsxNode {
    const isDateInRange = inRange(date, this.min, this.max);

    return (
      <div class={{ [CSS.dayContainer]: true }} key={key} role="gridcell">
        <calcite-date-picker-day
          active={active}
          class={{
            [CSS.currentDay]: currentDay,
            [CSS.insideRangeHover]: this.isHoverInRange(),
            [CSS.outsideRangeHover]: !this.isHoverInRange(),
            [CSS.noncurrent]: this.range && !currentMonth,
          }}
          currentMonth={currentMonth}
          dateTimeFormat={this.dateTimeFormat}
          day={day}
          disabled={!isDateInRange}
          endOfRange={this.isEndOfRange(date)}
          highlighted={this.betweenSelectedRange(date)}
          oncalciteInternalDayHover={this.dayHover}
          oncalciteInternalDaySelect={this.daySelect}
          range={!!this.startDate && !!this.endDate && !sameDate(this.startDate, this.endDate)}
          rangeEdge={dayInWeek === 0 ? "start" : dayInWeek === 6 ? "end" : undefined}
          rangeHover={isDateInRange && this.isRangeHover(date)}
          ref={this.storeDayRef.bind(this)}
          scale={this.scale}
          selected={this.isSelected(date)}
          startOfRange={this.isStartOfRange(date)}
          value={date}
        />
      </div>
    );
  }

  private renderCalendar(weekDays: string[], days: Day[], isEndCalendar = false): JsxNode {
    return (
      <div
        class={{
          [CSS.calendar]: true,
          [CSS.calendarStart]: !isEndCalendar,
        }}
      >
        <calcite-date-picker-month-header
          activeDate={isEndCalendar ? nextMonth(this.activeDate) : this.activeDate}
          data-test-calendar={isEndCalendar ? "end" : "start"}
          headingLevel={this.headingLevel}
          localeData={this.localeData}
          max={this.max}
          messages={this.messages}
          min={this.min}
          monthStyle={this.monthStyle}
          oncalciteInternalDatePickerMonthHeaderSelectChange={this.monthHeaderSelectChange}
          position={isEndCalendar ? "end" : this.range && this.calendars === 2 ? "start" : null}
          scale={this.scale}
          selectedDate={this.selectedDate}
        />
        {this.renderMonthCalendar(weekDays, days, isEndCalendar)}
      </div>
    );
  }

  private renderMonthCalendar(weekDays: string[], days: Day[], isEndCalendar = false): JsxNode {
    const endCalendarStartIndex = 50;
    return (
      <div class={{ [CSS.month]: true }} onKeyDown={this.keyDownHandler}>
        <div class={{ [CSS.weekHeaderContainer]: true }} role="row">
          {weekDays.map((weekday) => (
            <span class={{ [CSS.weekHeader]: true }} role="columnheader">
              {weekday}
            </span>
          ))}
        </div>

        <div class={{ [CSS.weekDays]: true }} role="row">
          {days.map((day, index) =>
            this.renderDateDay(day, isEndCalendar ? endCalendarStartIndex + index : index),
          )}
        </div>
      </div>
    );
  }

  //#endregion
}
