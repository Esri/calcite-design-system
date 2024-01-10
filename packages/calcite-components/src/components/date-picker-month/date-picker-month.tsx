import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  VNode,
} from "@stencil/core";
import { dateFromRange, HoverRange, inRange, sameDate } from "../../utils/date";
import { DateLocaleData } from "../date-picker/utils";
import { Scale } from "../interfaces";

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

@Component({
  tag: "calcite-date-picker-month",
  styleUrl: "date-picker-month.scss",
  shadow: true,
})
export class DatePickerMonth {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * The DateTimeFormat used to provide screen reader labels.
   *
   * @internal
   */
  @Prop() dateTimeFormat: Intl.DateTimeFormat;

  /** Already selected date.*/
  @Prop() selectedDate: Date;

  /** The currently active Date.*/
  @Prop() activeDate: Date = new Date();

  /** Start date currently active. */
  @Prop() startDate?: Date;

  /** End date currently active.  */
  @Prop() endDate?: Date;

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @Prop() min: Date;

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @Prop() max: Date;

  /** @internal */
  @Prop() position: "start" | "end";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale;

  /**
   * CLDR locale data for current locale.
   *
   * @internal
   */
  @Prop() localeData: DateLocaleData;

  /** The range of dates currently being hovered. */
  @Prop() hoverRange: HoverRange;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when user selects the date.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalDatePickerSelect: EventEmitter<Date>;

  /**
   * Fires when user hovers the date.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalDatePickerHover: EventEmitter<Date>;

  /**
   * Active date for the user keyboard access.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalDatePickerActiveDateChange: EventEmitter<Date>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalDatePickerMouseOut: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  keyDownHandler = (event: KeyboardEvent): void => {
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
          new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate()
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
  };

  /**
   * Once user is not interacting via keyboard,
   * disable auto focusing of active date
   */
  disableActiveFocus = (): void => {
    this.activeFocus = false;
  };

  @Listen("pointerout")
  pointerOutHandler(): void {
    this.calciteInternalDatePickerMouseOut.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render(): VNode {
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

    const weeks: Day[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <Host onFocusOut={this.disableActiveFocus} onKeyDown={this.keyDownHandler}>
        <div class="calendar" role="grid">
          <div class="week-headers" role="row">
            {adjustedWeekDays.map((weekday) => (
              <span class="week-header" role="columnheader">
                {weekday}
              </span>
            ))}
          </div>
          {weeks.map((days) => (
            <div class="week-days" role="row">
              {days.map((day) => this.renderDateDay(day))}
            </div>
          ))}
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDatePickerMonthElement;

  private activeFocus: boolean;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Add n months to the current month
   *
   * @param step
   */
  private addMonths(step: number) {
    const nextDate = new Date(this.activeDate);
    nextDate.setMonth(this.activeDate.getMonth() + step);
    this.calciteInternalDatePickerActiveDateChange.emit(
      dateFromRange(nextDate, this.min, this.max)
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
      dateFromRange(nextDate, this.min, this.max)
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

  dayHover = (event: CustomEvent): void => {
    const target = event.target as HTMLCalciteDatePickerDayElement;
    if (target.disabled) {
      this.calciteInternalDatePickerMouseOut.emit();
    } else {
      this.calciteInternalDatePickerHover.emit(target.value);
    }
    event.stopPropagation();
  };

  daySelect = (event: CustomEvent): void => {
    const target = event.target as HTMLCalciteDatePickerDayElement;
    this.calciteInternalDatePickerSelect.emit(target.value);
  };

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
   */
  private renderDateDay({ active, currentMonth, date, day, dayInWeek, ref }: Day) {
    const isFocusedOnStart = this.isFocusedOnStart();
    const isHoverInRange =
      this.isHoverInRange() ||
      (!this.endDate && this.hoverRange && sameDate(this.hoverRange?.end, this.startDate));

    return (
      <div class="day" key={date.toDateString()} role="gridcell">
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
          onCalciteDaySelect={this.daySelect}
          onCalciteInternalDayHover={this.dayHover}
          range={!!this.startDate && !!this.endDate && !sameDate(this.startDate, this.endDate)}
          rangeEdge={dayInWeek === 0 ? "start" : dayInWeek === 6 ? "end" : undefined}
          rangeHover={this.isRangeHover(date)}
          scale={this.scale}
          selected={this.isSelected(date)}
          startOfRange={this.isStartOfRange(date)}
          value={date}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(el: HTMLCalciteDatePickerDayElement) => {
            // when moving via keyboard, focus must be updated on active date
            if (ref && active && this.activeFocus) {
              el?.focus();
            }
          }}
        />
      </div>
    );
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
}
