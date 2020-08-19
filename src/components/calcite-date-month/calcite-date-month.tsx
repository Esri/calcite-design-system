import { Component, Element, Prop, Host, Event, EventEmitter, h, Listen } from "@stencil/core";
import { getFirstDayOfWeek, getLocalizedWeekdays } from "../../utils/locale";
import { inRange, sameDate, dateFromRange } from "../../utils/date";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-date-month",
  styleUrl: "calcite-date-month.scss",
  shadow: true
})
export class CalciteDateMonth {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDateMonthElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Already selected date.*/
  @Prop() selectedDate: Date;

  /** Date currently active.*/
  @Prop() activeDate: Date = new Date();

  /** Minimum date of the calendar below which is disabled.*/
  @Prop() min: Date;

  /** Maximum date of the calendar above which is disabled.*/
  @Prop() max: Date;

  /** User's language and region as BCP 47 formatted string. */
  @Prop() locale = "en-US";

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Event emitted when user selects the date.
   */
  @Event() calciteDateSelect: EventEmitter;

  /**
   * Active date for the user keyboard access.
   */
  @Event() calciteActiveDateChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
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
        this.calciteDateSelect.emit(this.activeDate);
        break;
      case "Tab":
        this.activeFocus = false;
    }
  }

  /**
   * Once user is not interacting via keyboard,
   * disable auto focusing of active date
   */
  @Listen("focusout") disableActiveFocus() {
    this.activeFocus = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const month = this.activeDate.getMonth();
    const year = this.activeDate.getFullYear();
    const startOfWeek = getFirstDayOfWeek(this.locale);
    const weekDays = getLocalizedWeekdays(this.locale, this.scale === "s" ? "narrow" : "short");
    const curMonDays = this.getCurrentMonthDays(month, year);
    const prevMonDays = this.getPrevMonthdays(month, year, startOfWeek);
    const nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
    const days = [
      ...prevMonDays.map((day) => {
        const date = new Date(year, month - 1, day);
        return (
          <calcite-date-day
            scale={this.scale}
            day={day}
            disabled={!inRange(date, this.min, this.max)}
            selected={sameDate(date, this.selectedDate)}
            onCalciteDaySelect={() => this.calciteDateSelect.emit(date)}
            locale={this.locale}
          />
        );
      }),
      ...curMonDays.map((day) => {
        const date = new Date(year, month, day);
        const active = sameDate(date, this.activeDate);
        return (
          <calcite-date-day
            scale={this.scale}
            day={day}
            disabled={!inRange(date, this.min, this.max)}
            selected={sameDate(date, this.selectedDate)}
            active={active}
            onCalciteDaySelect={() => this.calciteDateSelect.emit(date)}
            locale={this.locale}
            ref={(el) => {
              // when moving via keyboard, focus must be updated on active date
              if (active && this.activeFocus) {
                el?.focus();
              }
            }}
            current-month
          />
        );
      }),
      ...nextMonDays.map((day) => {
        const date = new Date(year, month + 1, day);
        return (
          <calcite-date-day
            scale={this.scale}
            day={day}
            disabled={!inRange(date, this.min, this.max)}
            selected={sameDate(date, this.selectedDate)}
            onCalciteDaySelect={() => this.calciteDateSelect.emit(date)}
            locale={this.locale}
          />
        );
      })
    ];

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <Host>
        <div class="calender" role="grid">
          <div class="week-headers" role="row">
            {weekDays.map((weekday) => (
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
    this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
    this.activeFocus = true;
  }

  /**
   * Add n days to the current date
   */
  private addDays(step = 0) {
    const nextDate = new Date(this.activeDate);
    nextDate.setDate(this.activeDate.getDate() + step);
    this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
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
}
