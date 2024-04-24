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
  Watch,
  State,
} from "@stencil/core";
import {
  dateFromRange,
  hasSameMonthAndYear,
  HoverRange,
  inRange,
  nextMonth,
  sameDate,
} from "../../utils/date";
import { DateLocaleData } from "../date-picker/utils";
import { Scale } from "../interfaces";
import { DatePickerMessages } from "../date-picker/assets/date-picker/t9n";
import { HeadingLevel } from "../functional/Heading";

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

  @Watch("selectedDate")
  updateFocusedDate(newActiveDate: Date): void {
    this.focusedDate = newActiveDate;
  }

  /** The currently active Date.*/
  @Prop() activeDate: Date = new Date();

  @Watch("activeDate")
  updateFocusedDateWithActive(newActiveDate: Date): void {
    if (!this.selectedDate) {
      this.focusedDate = newActiveDate;
    }
  }

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

  @Prop({ reflect: true }) range: boolean;

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

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: DatePickerMessages;

  @Prop() monthAbbreviations: boolean;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

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

  /**
   * Emits when user updates month or year using `calcite-date-picker-month-header` component.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalDatePickerMonthChange: EventEmitter<{
    date: Date;
    position: string;
  }>;

  /** The currently focused Date. */
  @State() focusedDate: Date;
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
    const target = event.target as HTMLCalciteDatePickerDayElement;
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        this.addDays(-7, target.value);
        break;
      case "ArrowRight":
        event.preventDefault();
        this.addDays(isRTL ? -1 : 1, target.value);
        break;
      case "ArrowDown":
        event.preventDefault();
        this.addDays(7, target.value);
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.addDays(isRTL ? 1 : -1, target.value);
        break;
      case "PageUp":
        event.preventDefault();
        this.addMonths(-1, target.value);
        break;
      case "PageDown":
        event.preventDefault();
        this.addMonths(1, target.value);
        break;
      case "Home":
        event.preventDefault();
        this.activeDate.setDate(1);
        this.addDays(0, target.value);
        break;
      case "End":
        event.preventDefault();
        this.activeDate.setDate(
          new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate(),
        );
        this.addDays(0, target.value);
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

  connectedCallback(): void {
    this.focusedDate = this.selectedDate || this.activeDate;
  }

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
    const endCalendarPrevMonDays = this.getPreviousMonthDays(month + 1, year, startOfWeek);
    const endCalendarCurrMonDays = this.getCurrentMonthDays(month + 1, year);
    const endCalendarNextMonDays = this.getNextMonthDays(month + 1, year, startOfWeek);

    const days = this.getDays(prevMonDays, curMonDays, nextMonDays);
    // const weeks = this.getWeeks(days);

    const nextMonthDays = this.getDays(
      endCalendarPrevMonDays,
      endCalendarCurrMonDays,
      endCalendarNextMonDays,
      "end",
    );
    // const nextMonthWeeks = this.getWeeks(nextMonthDays);

    return (
      <Host onFocusout={this.disableActiveFocus}>
        <div class="month-header">
          <calcite-date-picker-month-header
            activeDate={this.activeDate}
            headingLevel={this.headingLevel}
            localeData={this.localeData}
            max={this.max}
            messages={this.messages}
            min={this.min}
            monthAbbreviations={this.monthAbbreviations}
            onCalciteInternalDatePickerMonthHeaderSelect={this.monthHeaderSelectChange}
            position={this.range ? "start" : null}
            scale={this.scale}
            selectedDate={this.selectedDate}
          />
          {this.range && (
            <calcite-date-picker-month-header
              activeDate={nextMonth(this.activeDate)}
              headingLevel={this.headingLevel}
              localeData={this.localeData}
              max={this.max}
              messages={this.messages}
              min={this.min}
              monthAbbreviations={this.monthAbbreviations}
              onCalciteInternalDatePickerMonthHeaderSelect={this.monthHeaderSelectChange}
              position={"end"}
              scale={this.scale}
              selectedDate={this.selectedDate}
            />
          )}
        </div>
        <div class="calendar" onKeyDown={this.keyDownHandler} role="grid">
          {this.renderMonthCalendar(adjustedWeekDays, days)}
          {this.range && this.renderMonthCalendar(adjustedWeekDays, nextMonthDays, true)}
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
   * @param targetDate
   */
  private addMonths(step: number, targetDate: Date) {
    const nextDate = new Date(targetDate);
    nextDate.setMonth(targetDate.getMonth() + step);
    this.calciteInternalDatePickerActiveDateChange.emit(
      dateFromRange(nextDate, this.min, this.max),
    );
    this.focusedDate = dateFromRange(nextDate, this.min, this.max);
    this.activeFocus = true;
    this.calciteInternalDatePickerHover.emit(nextDate);
  }

  /**
   * Add n days to the current date
   *
   * @param step
   * @param targetDate
   */
  private addDays(step = 0, targetDate: Date) {
    const nextDate = new Date(targetDate);
    nextDate.setDate(targetDate.getDate() + step);
    this.calciteInternalDatePickerActiveDateChange.emit(
      dateFromRange(nextDate, this.min, this.max),
    );

    this.focusedDate = dateFromRange(nextDate, this.min, this.max);
    this.activeFocus = true;
    // adds hover effect on keyboard navigation
    this.calciteInternalDatePickerHover.emit(nextDate);
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
    // below line needs to be commented out to focus on active date on based on focused input
    this.activeFocus = false;
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
          onCalciteDaySelect={this.daySelect}
          onCalciteInternalDayHover={this.dayHover}
          range={!!this.startDate && !!this.endDate && !sameDate(this.startDate, this.endDate)}
          rangeEdge={dayInWeek === 0 ? "start" : dayInWeek === 6 ? "end" : undefined}
          rangeHover={this.isRangeHover(date)}
          scale={this.scale}
          selected={this.isSelected(date)}
          startOfRange={this.isStartOfRange(date)}
          value={date}
          // focusing in ref is creating diff UX for keyboard compared to click where in click the focus only shifts after selection where in keyboard while navigating the focus is updated.
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(el: HTMLCalciteDatePickerDayElement) => {
            // when moving via keyboard, focus must be updated on active date
            if (ref && active && this.activeFocus) {
              el?.setFocus();
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
    const isStartFocused = this.isFocusedOnStart();
    const isEndAfterStart = this.startDate && end > this.startDate;
    const isEndBeforeEnd = this.endDate && end < this.endDate;
    const isStartAfterStart = this.startDate && start > this.startDate;
    const isStartBeforeEnd = this.endDate && start < this.endDate;

    const isEndDateAfterStartAndBeforeEnd =
      !isStartFocused && !!this.startDate && isEndAfterStart && (!this.endDate || isEndBeforeEnd);
    const isStartDateBeforeEndAndAfterStart =
      isStartFocused && !!this.startDate && isStartAfterStart && isStartBeforeEnd;

    return !!(isEndDateAfterStartAndBeforeEnd || isStartDateBeforeEndAndAfterStart);
  }

  private isRangeHover(date: Date): boolean {
    if (!this.hoverRange) {
      return false;
    }
    const { start, end } = this.hoverRange;
    const isStart = this.isFocusedOnStart();
    const insideRange = this.isHoverInRange();

    const isDateBeforeStartDateAndAfterStart = date > start && date < this.startDate;
    const isDateAfterEndDateAndBeforeEnd = date < end && date > this.endDate;
    const isDateBeforeEndDateAndAfterEnd = date > end && date < this.endDate;
    const isDateAfterStartDateAndBeforeStart = date < start && date > this.startDate;
    const isDateAfterStartDateAndBeforeEnd = date < end && date > this.startDate;
    const isDateBeforeEndDateAndAfterStart = date > start && date < this.endDate;

    if (insideRange) {
      if (!!this.startDate && !!this.endDate) {
        return isStart
          ? date < this.endDate &&
              (isDateAfterStartDateAndBeforeStart || isDateBeforeStartDateAndAfterStart)
          : isDateBeforeEndDateAndAfterEnd || isDateAfterEndDateAndBeforeEnd;
      } else if (!!this.startDate && !this.endDate) {
        return isStart ? isDateBeforeStartDateAndAfterStart : isDateAfterStartDateAndBeforeEnd;
      } else if (!this.startDate && !!this.endDate) {
        return isStart ? isDateBeforeEndDateAndAfterStart : isDateAfterEndDateAndBeforeEnd;
      }
    } else {
      if (!!this.startDate && !!this.endDate) {
        return isStart ? isDateBeforeStartDateAndAfterStart : isDateAfterEndDateAndBeforeEnd;
      }
    }
  }

  private getDays = (
    prevMonthDays: number[],
    currMonthDays: number[],
    nextMonthDays: number[],
    position: "start" | "end" = "start",
  ): Day[] => {
    let month = this.activeDate.getMonth();
    const year = this.activeDate.getFullYear();
    let dayInWeek = 0;
    const getDayInWeek = () => dayInWeek++ % 7;
    month = position === "end" ? month + 1 : month;
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
        const active =
          this.focusedDate &&
          this.focusedDate !== this.startDate &&
          this.focusedDate !== this.endDate
            ? sameDate(date, this.focusedDate)
            : sameDate(date, this.startDate) || sameDate(date, this.endDate);

        return {
          active,
          currentMonth: true,
          day,
          dayInWeek: getDayInWeek(),
          date,
          ref: true,
        };
      }),
      ...nextMonthDays.map((day) => {
        return {
          active: false,
          day,
          dayInWeek: getDayInWeek(),
          date: new Date(year, month + 1, day),
        };
      }),
    ];

    return days;
  };

  // private getWeeks(days: Day[]): Day[][] {
  //   const weeks: Day[][] = [];
  //   for (let i = 0; i < days.length; i += 7) {
  //     weeks.push(days.slice(i, i + 7));
  //   }
  //   return weeks;
  // }

  private renderMonthCalendar(weekDays: string[], days: Day[], isNextMonth = false): VNode {
    return (
      <div class="month">
        <div class="week-headers" role="row">
          {weekDays.map((weekday) => (
            <span class="week-header" role="columnheader">
              {weekday}
            </span>
          ))}
        </div>

        <div class="week-days" role="row">
          {days.map((day, index) => this.renderDateDay(day, isNextMonth ? 50 + index : index))}
        </div>
      </div>
    );
  }

  monthHeaderSelectChange = (event: CustomEvent<Date>): void => {
    const date = new Date(event.detail);
    const target = event.target as HTMLCalciteDatePickerMonthHeaderElement;
    this.updateFocusableDate(date);
    this.calciteInternalDatePickerMonthChange.emit({ date, position: target.position });
  };

  // updates focusable date on monthHeaderSelectChange
  private updateFocusableDate(date: Date): void {
    if (!this.selectedDate || !this.range) {
      this.focusedDate = date;
    } else if (this.selectedDate && this.range) {
      if (!hasSameMonthAndYear(this.activeDate, date)) {
        if (
          !hasSameMonthAndYear(date, this.activeDate) &&
          !hasSameMonthAndYear(date, nextMonth(this.activeDate))
        ) {
          this.focusedDate = date;
        }
      }
    }
  }
}
