import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import { dateFromRange, HoverRange, inRange, sameDate } from "../../utils/date";
import { DateLocaleData } from "../date-picker/utils";
import { Scale } from "../interfaces";
import type { DatePickerDay } from "../date-picker-day/date-picker-day";
import { styles } from "./date-picker-month.scss";

declare global {
  interface DeclareElements {
    "calcite-date-picker-month": DatePickerMonth;
  }
}

const DAYS_PER_WEEK = 7;
const DAYS_MAXIMUM_INDEX = 6;

interface Day {
  active: boolean;
  currentMonth?: boolean;
  date: Date;
  day: number;
  dayInWeek?: number;
  ref?: boolean;
}

export class DatePickerMonth extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private activeFocus: boolean;

  // #endregion

  // #region Public Properties

  /** The currently active Date. */
  @property() activeDate: Date = new Date();

  /**
   * The DateTimeFormat used to provide screen reader labels.
   *
   * @notPublic
   */
  @property() dateTimeFormat: Intl.DateTimeFormat;

  /** End date currently active. */
  @property() endDate?: Date;

  /** The range of dates currently being hovered. */
  @property() hoverRange: HoverRange;

  /**
   * CLDR locale data for current locale.
   *
   * @notPublic
   */
  @property() localeData: DateLocaleData;

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @property() max: Date;

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @property() min: Date;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale;

  /** Already selected date. */
  @property() selectedDate: Date;

  /** Start date currently active. */
  @property() startDate?: Date;

  // #endregion

  // #region Events

  /**
   * Active date for the user keyboard access.
   *
   * @notPublic
   */
  calciteInternalDatePickerActiveDateChange = createEvent<Date>({ cancelable: false });

  /**
   * Fires when user hovers the date.
   *
   * @notPublic
   */
  calciteInternalDatePickerHover = createEvent<Date>({ cancelable: false });

  /** @notPublic */
  calciteInternalDatePickerMouseOut = createEvent({ cancelable: false });

  /**
   * Fires when user selects the date.
   *
   * @notPublic
   */
  calciteInternalDatePickerSelect = createEvent<Date>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("pointerout", this.pointerOutHandler);
    this.listen("focusout", this.disableActiveFocus);
    this.listen("keydown", this.keyDownHandler);
  }

  // #endregion

  // #region Private Methods

  private keyDownHandler(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    const isRTL = this.el.dir === "rtl";

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        this.addDays(-7);
        break;
      case "ArrowRight":
        event.preventDefault();
        this.addDays(isRTL ? -1 : 1);
        break;
      case "ArrowDown":
        event.preventDefault();
        this.addDays(7);
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.addDays(isRTL ? 1 : -1);
        break;
      case "PageUp":
        event.preventDefault();
        this.addMonths(-1);
        break;
      case "PageDown":
        event.preventDefault();
        this.addMonths(1);
        break;
      case "Home":
        event.preventDefault();
        this.activeDate.setDate(1);
        this.addDays();
        break;
      case "End":
        event.preventDefault();
        this.activeDate.setDate(
          new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate(),
        );
        this.addDays();
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
    this.calciteInternalDatePickerMouseOut.emit();
  }

  /**
   * Add n months to the current month
   *
   * @param step
   */
  private addMonths(step: number) {
    const nextDate = new Date(this.activeDate);
    nextDate.setMonth(this.activeDate.getMonth() + step);
    this.calciteInternalDatePickerActiveDateChange.emit(
      dateFromRange(nextDate, this.min, this.max),
    );
    this.activeFocus = true;
  }

  /**
   * Add n days to the current date
   *
   * @param step
   */
  private addDays(step = 0) {
    const nextDate = new Date(this.activeDate);
    nextDate.setDate(this.activeDate.getDate() + step);
    this.calciteInternalDatePickerActiveDateChange.emit(
      dateFromRange(nextDate, this.min, this.max),
    );
    this.activeFocus = true;
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
      this.calciteInternalDatePickerMouseOut.emit();
    } else {
      this.calciteInternalDatePickerHover.emit(target.value);
    }
    event.stopPropagation();
  }

  private daySelect(event: CustomEvent): void {
    const target = event.target as DatePickerDay["el"];
    this.calciteInternalDatePickerSelect.emit(target.value);
  }

  private isFocusedOnStart(): boolean {
    return this.hoverRange?.focused === "start";
  }

  private isHoverInRange(): boolean {
    if (!this.hoverRange) {
      return false;
    }
    const { start, end } = this.hoverRange;
    return !!(
      (!this.isFocusedOnStart() && this.startDate && (!this.endDate || end < this.endDate)) ||
      (this.isFocusedOnStart() && this.startDate && start > this.startDate)
    );
  }

  private isRangeHover(date): boolean {
    if (!this.hoverRange) {
      return false;
    }
    const { start, end } = this.hoverRange;
    const isStart = this.isFocusedOnStart();
    const insideRange = this.isHoverInRange();
    const cond1 =
      insideRange &&
      ((!isStart && date > this.startDate && (date < end || sameDate(date, end))) ||
        (isStart && date < this.endDate && (date > start || sameDate(date, start))));
    const cond2 =
      !insideRange &&
      ((!isStart && date >= this.endDate && (date < end || sameDate(date, end))) ||
        (isStart &&
          ((this.startDate && date < this.startDate) ||
            (this.endDate && sameDate(date, this.startDate))) &&
          ((start && date > start) || sameDate(date, start))));
    return cond1 || cond2;
  }

  // #endregion

  // #region Rendering

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
    let dayInWeek = 0;
    const getDayInWeek = () => dayInWeek++ % 7;

    const days: Day[] = [
      ...prevMonDays.map((day) => {
        return {
          active: false,
          day,
          dayInWeek: getDayInWeek(),
          date: new Date(year, month - 1, day),
        };
      }),
      ...curMonDays.map((day) => {
        const date = new Date(year, month, day);
        const active = sameDate(date, this.activeDate);
        return {
          active,
          currentMonth: true,
          day,
          dayInWeek: getDayInWeek(),
          date,
          ref: true,
        };
      }),
      ...nextMonDays.map((day) => {
        return {
          active: false,
          day,
          dayInWeek: getDayInWeek(),
          date: new Date(year, month + 1, day),
        };
      }),
    ];

    return (
      <div class="calendar" role="grid">
        <div class="week-headers" role="row">
          {adjustedWeekDays.map((weekday) => (
            <span class="week-header" role="columnheader">
              {weekday}
            </span>
          ))}
        </div>

        <div class="week-days" role="row">
          {days.map((day, index) => this.renderDateDay(day, index))}
        </div>
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
   * @param key
   */
  private renderDateDay({ active, currentMonth, date, day, dayInWeek, ref }: Day, key: number) {
    const isFocusedOnStart = this.isFocusedOnStart();
    const isHoverInRange =
      this.isHoverInRange() ||
      (!this.endDate && this.hoverRange && sameDate(this.hoverRange?.end, this.startDate));

    return (
      <div class="day" key={key} role="gridcell">
        <calcite-date-picker-day
          active={active}
          class={{
            "hover--inside-range": this.startDate && isHoverInRange,
            "hover--outside-range": this.startDate && !isHoverInRange,
            "focused--start": isFocusedOnStart,
            "focused--end": !isFocusedOnStart,
          }}
          currentMonth={currentMonth}
          dateTimeFormat={this.dateTimeFormat}
          day={day}
          disabled={!inRange(date, this.min, this.max)}
          endOfRange={this.isEndOfRange(date)}
          highlighted={this.betweenSelectedRange(date)}
          oncalciteDaySelect={this.daySelect}
          oncalciteInternalDayHover={this.dayHover}
          range={!!this.startDate && !!this.endDate && !sameDate(this.startDate, this.endDate)}
          rangeEdge={dayInWeek === 0 ? "start" : dayInWeek === 6 ? "end" : undefined}
          rangeHover={this.isRangeHover(date)}
          ref={(el) => {
            // when moving via keyboard, focus must be updated on active date
            if (ref && active && this.activeFocus) {
              el?.setFocus();
            }
          }}
          scale={this.scale}
          selected={this.isSelected(date)}
          startOfRange={this.isStartOfRange(date)}
          value={date}
        />
      </div>
    );
  }

  // #endregion
}
