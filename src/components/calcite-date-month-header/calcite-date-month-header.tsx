import { Component, Element, Prop, Host, Event, h, EventEmitter, VNode } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import {
  dateFromRange,
  nextMonth,
  prevMonth,
  localizeNumber,
  parseNumber,
  getOrder
} from "../../utils/date";
import { getKey } from "../../utils/key";
import { DateLocaleData } from "../calcite-date/utils";

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

  @Element() el: HTMLCalciteDateMonthHeaderElement;

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
  @Prop() intlPrevMonth: string;

  /** Localized string for next month. */
  @Prop() intlNextMonth: string;

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l";

  /** CLDR locale data for translated calendar info */
  @Prop() localeData: DateLocaleData;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   *  Changes to active date
   */
  @Event() calciteActiveDateChange: EventEmitter<Date>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const activeMonth = this.activeDate.getMonth();
    const { months, unitOrder } = this.localeData;
    const localizedMonth = (months.wide || months.narrow || months.abbreviated)[activeMonth];
    const localizedYear = localizeNumber(this.activeDate.getFullYear(), this.localeData);
    const iconScale = this.scale === "l" ? "m" : "s";
    const dir = getElementDir(this.el);
    const order = getOrder(unitOrder);
    const reverse = order.indexOf("y") < order.indexOf("m");
    const nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
    const prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
    const suffix = this.localeData.year?.suffix;
    return (
      <Host dir={dir}>
        <div aria-hidden="true" class="header">
          <button
            aria-label={this.intlPrevMonth}
            class="chevron"
            disabled={prevMonthDate.getMonth() === activeMonth}
            onClick={() => this.calciteActiveDateChange.emit(prevMonthDate)}
          >
            <calcite-icon dir={dir} icon="chevron-left" mirrored scale={iconScale} />
          </button>
          <div class={{ text: true, "text--reverse": reverse }}>
            <span class="month" role="heading">
              {localizedMonth}
            </span>
            <span class="year-wrap">
              <input
                class={{
                  year: true,
                  "year--suffix": !!suffix
                }}
                inputmode="numeric"
                maxlength="4"
                minlength="1"
                onChange={(event) => this.setYear((event.target as HTMLInputElement).value)}
                onKeyDown={(event) => this.onYearKey(event)}
                pattern="\d*"
                ref={(el) => (this.yearInput = el)}
                type="text"
                value={localizedYear}
              />
              {suffix && (
                <span class="suffix">
                  <span aria-hidden="true" class="suffix__invisible">
                    {localizedYear}
                  </span>
                  {" " + suffix}
                </span>
              )}
            </span>
          </div>
          <button
            aria-label={this.intlNextMonth}
            class="chevron"
            disabled={nextMonthDate.getMonth() === activeMonth}
            onClick={() => this.calciteActiveDateChange.emit(nextMonthDate)}
          >
            <calcite-icon dir={dir} icon="chevron-right" mirrored scale={iconScale} />
          </button>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  private yearInput: HTMLInputElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Increment year on UP/DOWN keys
   */
  private onYearKey(e: KeyboardEvent): void {
    const year = (e.target as HTMLInputElement).value;
    switch (getKey(e.key)) {
      case "ArrowDown":
        e.preventDefault();
        this.setYear(year, -1);
        break;
      case "ArrowUp":
        e.preventDefault();
        this.setYear(year, 1);
        break;
    }
  }

  /**
   * Parse localized year string from input,
   * set to active if in range
   */
  private setYear(localizedYear: string, increment = 0) {
    const { min, max, activeDate, localeData, yearInput } = this;
    const parsedYear = parseNumber(localizedYear, localeData);
    const length = parsedYear.toString().length;
    const year = isNaN(parsedYear) ? false : parsedYear + increment;
    const inRange =
      year && (!min || min.getFullYear() <= year) && (!max || max.getFullYear() >= year);
    // if you've supplied a year and it's in range, update active date
    if (year && inRange && length === localizedYear.length) {
      const nextDate = new Date(activeDate);
      nextDate.setFullYear(year as number);
      const inRangeDate = dateFromRange(nextDate, min, max);
      this.calciteActiveDateChange.emit(inRangeDate);
      yearInput.value = localizeNumber(inRangeDate.getFullYear(), localeData);
    } else {
      // leave the current active date and clean up garbage input
      yearInput.value = localizeNumber(activeDate.getFullYear(), localeData);
    }
  }
}
