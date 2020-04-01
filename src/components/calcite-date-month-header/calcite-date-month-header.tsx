import { Component, Element, Prop, Host, Event, h } from "@stencil/core";
import { UP, DOWN } from "../../utils/keys";
import {
  getLocaleFormatData,
  replaceArabicNumerals,
  getMonths,
  getYear
} from "../calcite-date-picker/locale";
import { getElementDir } from "../../utils/dom";
import { DateChangeEmitter } from "../calcite-date-picker/interfaces";
import {
  dateFromRange,
  nextMonth,
  prevMonth
} from "../calcite-date-picker/date";

@Component({
  tag: "calcite-date-month-header",
  styleUrl: "calcite-date-month-header.scss",
  shadow: true
})
export class CalciteDateMonthHeader {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Already selected date. */
  @Prop() selectedDate: Date;
  /** Focused date with indicator (will become selected date if user proceeds) */
  @Prop() activeDate: Date;
  /** Minimum date of the calendar below which is disabled. */
  @Prop() min: Date;
  /** Maximum date of the calendar above which is disabled. */
  @Prop() max: Date;
  /** User's language and region as BCP 47 formatted string. */
  @Prop() locale: string;
  /** Localized string for previous month. */
  @Prop() prevMonthLabel: string;
  /** Localized string for next month. */
  @Prop() nextMonthLabel: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   *  Changes to active date
   */
  @Event() calciteActiveDateChange: DateChangeEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    const activeMonth = this.activeDate.getMonth();
    const localizedMonth = getMonths(this.locale)[activeMonth];
    const localizedYear = getYear(this.activeDate, this.locale);
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <div class="month-year" aria-hidden="true">
          <button
            class="left-icon"
            aria-label={this.prevMonthLabel}
            onClick={() => this.selectPrevMonth()}
          >
            <calcite-icon icon="chevron-left" scale="s" mirrored dir={dir} />
          </button>
          <div class="month-year-text">
            <span class="month" role="heading">
              {localizedMonth}
            </span>
            <input
              class="year"
              type="text"
              inputmode="numeric"
              maxlength="4"
              minlength="4"
              pattern="\d*"
              value={`${localizedYear.slice(-4)}`}
              onKeyDown={event => this.onYearKey(event)}
              onChange={event =>
                this.setYear((event.target as HTMLInputElement).value)
              }
              ref={el => (this.yearInput = el)}
            />
          </div>
          <button
            class="right-icon"
            aria-label={this.nextMonthLabel}
            onClick={() => this.selectNextMonth()}
          >
            <calcite-icon icon="chevron-right" scale="s" mirrored dir={dir} />
          </button>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------9------------------------------------------------------------
  private yearInput: HTMLInputElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Set active date to previous month (or min if out of range)
   */
  private selectPrevMonth() {
    const nextDate = prevMonth(this.activeDate);
    this.calciteActiveDateChange.emit(
      dateFromRange(nextDate, this.min, this.max)
    );
  }

  /**
   * Set active date to next month (or max if out of range)
   */
  private selectNextMonth() {
    const nextDate = nextMonth(this.activeDate);
    this.calciteActiveDateChange.emit(
      dateFromRange(nextDate, this.min, this.max)
    );
  }

  /**
   * Increment year on UP/DOWN keys
   */
  private onYearKey(e: KeyboardEvent) {
    const year = (e.target as HTMLInputElement).value;
    switch (e.keyCode) {
      case DOWN:
        e.preventDefault();
        this.setYear(year, -1);
        break;
      case UP:
        e.preventDefault();
        this.setYear(year, 1);
        break;
    }
  }

  /**
   * Parse localized year string from input,
   * set to active if in range
   */
  private setYear(localizedYear: string, increment: number = 0) {
    const { min, max, activeDate, locale, yearInput } = this;
    const parsedYear = parseInt(replaceArabicNumerals(localizedYear));
    const length = parsedYear.toString().length;
    const offset = getLocaleFormatData(locale).buddhist ? 543 : 0;
    const year = isNaN(parsedYear) ? false : parsedYear - offset + increment;
    const inRange =
      year &&
      (!min || min.getFullYear() <= year) &&
      (!max || max.getFullYear() >= year);
    // if you've supplied a year and it's in range, update active date
    if (year && inRange && length === localizedYear.length && length > 3) {
      const nextDate = new Date(activeDate);
      nextDate.setFullYear(year as number);
      const inRangeDate = dateFromRange(nextDate, min, max);
      this.calciteActiveDateChange.emit(inRangeDate);
      yearInput.value = getYear(inRangeDate, locale).slice(-4);
    } else {
      // leave the current active date and clean up garbage input
      yearInput.value = getYear(activeDate, locale).slice(-4);
    }
  }
}
