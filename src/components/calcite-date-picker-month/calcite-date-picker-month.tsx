import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  h,
  Listen,
  VNode
} from "@stencil/core";
import { inRange, sameDate, dateFromRange } from "../../utils/date";
import { getKey } from "../../utils/key";
import { getElementDir } from "../../utils/dom";
import { DateLocaleData } from "../calcite-date-picker/utils";
import { Scale } from "../interfaces";

@Component({
  tag: "calcite-date-picker-month",
  styleUrl: "calcite-date-picker-month.scss",
  shadow: true
})
export class CalciteDatePickerMonth {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDatePickerMonthElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Already selected date.*/
  @Prop() selectedDate: Date;

  /** Date currently active.*/
  @Prop() activeDate: Date = new Date();

  /** Start date currently active. */
  @Prop() startDate?: Date;

  /** End date currently active  */
  @Prop() endDate?: Date;

  /** Minimum date of the calendar below which is disabled.*/
  @Prop() min: Date;

  /** Maximum date of the calendar above which is disabled.*/
  @Prop() max: Date;

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: Scale;

  /**
   * CLDR locale data for current locale
   *
   * @internal
   */
  @Prop() localeData: DateLocaleData;

  @Prop() hoverRange;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Event emitted when user selects the date.
   */
  @Event() calciteDatePickerSelect: EventEmitter;

  /**
   * Event emitted when user hovers the date.
   * @internal
   */
  @Event() calciteDatePickerHover: EventEmitter;

  /**
   * Active date for the user keyboard access.
   */
  @Event() calciteDatePickerActiveDateChange: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteDatePickerMouseOut: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  keyDownHandler = (e: KeyboardEvent): void => {
    const isRTL = this.el.dir === "rtl";
    switch (getKey(e.key)) {
      case "ArrowUp":
        e.preventDefault();
        this.addDays(-7);
        break;
      case "ArrowRight":
        e.preventDefault();
        this.addDays(isRTL ? -1 : 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        this.addDays(7);
        break;
      case "ArrowLeft":
        e.preventDefault();
        this.addDays(isRTL ? 1 : -1);
        break;
      case "PageUp":
        e.preventDefault();
        this.addMonths(-1);
        break;
      case "PageDown":
        e.preventDefault();
        this.addMonths(1);
        break;
      case "Home":
        e.preventDefault();
        this.activeDate.setDate(1);
        this.addDays();
        break;
      case "End":
        e.preventDefault();
        this.activeDate.setDate(
          new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate()
        );
        this.addDays();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
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

  @Listen("mouseout")
  mouseoutHandler(): void {
    this.calciteDatePickerMouseOut.emit();
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
    const prevMonDays = this.getPrevMonthdays(month, year, startOfWeek);
    const nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
    const dir = getElementDir(this.el);
    const days = [
      ...prevMonDays.map((day) => {
        const date = new Date(year, month - 1, day);
        return this.renderDateDay(false, day, dir, date);
      }),
      ...curMonDays.map((day) => {
        const date = new Date(year, month, day);
        const active = sameDate(date, this.activeDate);
        return this.renderDateDay(active, day, dir, date, true, true);
      }),
      ...nextMonDays.map((day) => {
        const date = new Date(year, month + 1, day);
        return this.renderDateDay(false, day, dir, date);
      })
    ];

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <Host onFocusOut={this.disableActiveFocus} onKeyDown={this.keyDownHandler}>
        <div class="calender" role="grid">
          <div class="week-headers" role="row">
            {adjustedWeekDays.map((weekday) => (
              <span class="week-header" role="columnheader">
                {weekday}
              </span>
            ))}
          </div>
          {weeks.map((days) => (
            <div class="week-days" role="row">
              {days}
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
  private activeFocus: boolean;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Add n months to the current month
   */
  private addMonths(step: number) {
    const nextDate = new Date(this.activeDate);
    nextDate.setMonth(this.activeDate.getMonth() + step);
    this.calciteDatePickerActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
    this.activeFocus = true;
  }

  /**
   * Add n days to the current date
   */
  private addDays(step = 0) {
    const nextDate = new Date(this.activeDate);
    nextDate.setDate(this.activeDate.getDate() + step);
    this.calciteDatePickerActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
    this.activeFocus = true;
  }

  /**
   * Get dates for last days of the previous month
   */
  private getPrevMonthdays(month: number, year: number, startOfWeek: number): number[] {
    const lastDate = new Date(year, month, 0);
    const date = lastDate.getDate();
    const day = lastDate.getDay();
    const days = [];
    if (day - 6 === startOfWeek) {
      return days;
    }
    for (let i = lastDate.getDay(); i >= startOfWeek; i--) {
      days.push(date - i);
    }
    return days;
  }

  /**
   * Get dates for the current month
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
   */
  private getNextMonthDays(month: number, year: number, startOfWeek: number): number[] {
    const endDay = new Date(year, month + 1, 0).getDay();
    const days = [];
    if (endDay === (startOfWeek + 6) % 7) {
      return days;
    }
    for (let i = 0; i < (6 - (endDay - startOfWeek)) % 7; i++) {
      days.push(i + 1);
    }
    return days;
  }

  /**
   * Determine if the date is in between the start and end dates
   */
  private betweenSelectedRange(date: Date): boolean {
    return (
      this.startDate &&
      this.endDate &&
      date > this.startDate &&
      date < this.endDate &&
      !this.isRangeHover(date)
    );
  }

  /**
   * Determine if the date should be in selected state
   */
  private isSelected(date: Date): boolean {
    return (
      sameDate(date, this.selectedDate) ||
      (this.startDate && sameDate(date, this.startDate)) ||
      (this.endDate && sameDate(date, this.endDate))
    );
  }

  /**
   * Determine if the date is the start of the date range
   */
  private isStartOfRange(date: Date): boolean {
    return (
      !!this.startDate &&
      !sameDate(this.startDate, this.endDate) &&
      sameDate(this.startDate, date) &&
      !this.isEndOfRange(date)
    );
  }

  private isEndOfRange(date: Date): boolean {
    return (
      (!!this.endDate && !sameDate(this.startDate, this.endDate) && sameDate(this.endDate, date)) ||
      (!this.endDate &&
        this.hoverRange &&
        sameDate(this.startDate, this.hoverRange.end) &&
        sameDate(date, this.hoverRange.end))
    );
  }

  dayHover = (e: CustomEvent): void => {
    const target = e.target as HTMLCalciteDatePickerDayElement;
    if (e.detail.disabled) {
      this.calciteDatePickerMouseOut.emit();
    } else {
      this.calciteDatePickerHover.emit(target.value);
    }
  };

  daySelect = (e: CustomEvent): void => {
    const target = e.target as HTMLCalciteDatePickerDayElement;
    this.calciteDatePickerSelect.emit(target.value);
  };

  /**
   * Render calcite-date-picker-day
   */
  private renderDateDay(
    active: boolean,
    day: number,
    dir: string,
    date: Date,
    currentMonth?: boolean,
    ref?: boolean
  ) {
    const isFocusedOnStart = this.isFocusedOnStart();
    const isHoverInRange =
      this.isHoverInRange() ||
      (!this.endDate && this.hoverRange && sameDate(this.hoverRange?.end, this.startDate));

    return (
      <calcite-date-picker-day
        active={active}
        class={{
          "hover--inside-range": this.startDate && isHoverInRange,
          "hover--outside-range": this.startDate && !isHoverInRange,
          "focused--start": isFocusedOnStart,
          "focused--end": !isFocusedOnStart
        }}
        currentMonth={currentMonth}
        day={day}
        dir={dir}
        disabled={!inRange(date, this.min, this.max)}
        endOfRange={this.isEndOfRange(date)}
        highlighted={this.betweenSelectedRange(date)}
        key={date.toDateString()}
        localeData={this.localeData}
        onCalciteDayHover={this.dayHover}
        onCalciteDaySelect={this.daySelect}
        range={!!this.startDate && !!this.endDate && !sameDate(this.startDate, this.endDate)}
        rangeHover={this.isRangeHover(date)}
        ref={(el: HTMLCalciteDatePickerDayElement) => {
          // when moving via keyboard, focus must be updated on active date
          if (ref && active && this.activeFocus) {
            el?.focus();
          }
        }}
        scale={this.scale}
        selected={this.isSelected(date)}
        startOfRange={this.isStartOfRange(date)}
        value={date}
      />
    );
  }

  private isFocusedOnStart(): boolean {
    return this.hoverRange?.focused === "start";
  }

  private isHoverInRange(): boolean {
    if (!this.hoverRange) {
      return;
    }
    const { start, end } = this.hoverRange;
    return (
      (!this.isFocusedOnStart() && !!this.startDate && (!this.endDate || end < this.endDate)) ||
      (this.isFocusedOnStart() && !!this.startDate && start > this.startDate)
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
          (date < this.startDate || (this.endDate && sameDate(date, this.startDate))) &&
          (date > start || sameDate(date, start))));
    return cond1 || cond2;
  }
}
