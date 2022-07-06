import {
  Component,
  Element,
  Prop,
  Event,
  h,
  EventEmitter,
  VNode,
  State,
  Watch,
  Fragment
} from "@stencil/core";
import {
  dateFromRange,
  nextMonth,
  prevMonth,
  localizeNumber,
  parseNumber,
  getOrder
} from "../../utils/date";

import { DateLocaleData } from "../date-picker/utils";
import { Scale } from "../interfaces";
import { HeadingLevel, Heading } from "../functional/Heading";
import { BUDDHIST_CALENDAR_YEAR_OFFSET } from "./resources";

@Component({
  tag: "calcite-date-picker-month-header",
  styleUrl: "date-picker-month-header.scss",
  shadow: true
})
export class DatePickerMonthHeader {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDatePickerMonthHeaderElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Already selected date. */
  @Prop() selectedDate: Date;

  /** Focused date with indicator (will become selected date if user proceeds) */
  @Prop() activeDate: Date;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

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

  /** Localized string for year. */
  @Prop() intlYear: string;

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: Scale;

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
  @Event() calciteDatePickerSelect: EventEmitter<Date>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.setNextPrevMonthDates();
  }

  render(): VNode {
    return <div class="header">{this.renderContent()}</div>;
  }

  renderContent(): VNode {
    if (!this.activeDate || !this.localeData) {
      return null;
    }

    const activeMonth = this.activeDate.getMonth();
    const { months, unitOrder } = this.localeData;
    const localizedMonth = (months.wide || months.narrow || months.abbreviated)[activeMonth];
    const localizedYear = this.formatCalendarYear(this.activeDate.getFullYear().toString());
    const iconScale = this.scale === "l" ? "m" : "s";

    const order = getOrder(unitOrder);
    const reverse = order.indexOf("y") < order.indexOf("m");
    const suffix = this.localeData.year?.suffix;

    return (
      <Fragment>
        <a
          aria-disabled={(this.prevMonthDate.getMonth() === activeMonth).toString()}
          aria-label={this.intlPrevMonth}
          class="chevron"
          href="#"
          onClick={this.prevMonthClick}
          onKeyDown={this.prevMonthKeydown}
          role="button"
          tabindex={this.prevMonthDate.getMonth() === activeMonth ? -1 : 0}
        >
          <calcite-icon flip-rtl icon="chevron-left" scale={iconScale} />
        </a>
        <div class={{ text: true, "text--reverse": reverse }}>
          <Heading class="month" level={this.headingLevel}>
            {localizedMonth}
          </Heading>
          <span class="year-wrap">
            <input
              aria-label={this.intlYear}
              class={{
                year: true,
                "year--suffix": !!suffix
              }}
              inputmode="numeric"
              maxlength="4"
              minlength="1"
              onChange={this.onYearChange}
              onInput={this.onYearInput}
              onKeyDown={this.onYearKey}
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
        <a
          aria-disabled={(this.nextMonthDate.getMonth() === activeMonth).toString()}
          aria-label={this.intlNextMonth}
          class="chevron"
          href="#"
          onClick={this.nextMonthClick}
          onKeyDown={this.nextMonthKeydown}
          role="button"
          tabindex={this.nextMonthDate.getMonth() === activeMonth ? -1 : 0}
        >
          <calcite-icon flip-rtl icon="chevron-right" scale={iconScale} />
        </a>
      </Fragment>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private yearInput: HTMLInputElement;

  @State() nextMonthDate: Date;

  @State() prevMonthDate: Date;

  @Watch("min")
  @Watch("max")
  @Watch("activeDate")
  setNextPrevMonthDates(): void {
    if (!this.activeDate) {
      return;
    }

    this.nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
    this.prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Increment year on UP/DOWN keys
   *
   * @param e
   */
  private onYearKey = (e: KeyboardEvent): void => {
    const localizedYear = this.parseCalendarYear((e.target as HTMLInputElement).value);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.setYear({ localizedYear, offset: -1 });
        break;
      case "ArrowUp":
        e.preventDefault();
        this.setYear({ localizedYear, offset: 1 });
        break;
    }
  };

  private formatCalendarYear(year: string): string {
    const { localeData } = this;
    const buddhistCalendar = localeData["default-calendar"] === "buddhist";
    const yearOffset = buddhistCalendar ? BUDDHIST_CALENDAR_YEAR_OFFSET : 0;

    return localizeNumber(parseNumber(year, localeData) + yearOffset, localeData);
  }

  private parseCalendarYear(year: string): string {
    const { localeData } = this;
    const buddhistCalendar = localeData["default-calendar"] === "buddhist";
    const yearOffset = buddhistCalendar ? BUDDHIST_CALENDAR_YEAR_OFFSET : 0;

    return localizeNumber(parseNumber(year, localeData) - yearOffset, localeData);
  }

  private onYearChange = (event: Event): void => {
    this.setYear({
      localizedYear: this.parseCalendarYear((event.target as HTMLInputElement).value)
    });
  };

  private onYearInput = (event: Event): void => {
    this.setYear({
      localizedYear: this.parseCalendarYear((event.target as HTMLInputElement).value),
      commit: false
    });
  };

  private prevMonthClick = (e: Event): void => {
    this.handleArrowClick(e, this.prevMonthDate);
  };

  private prevMonthKeydown = (e: KeyboardEvent): void => {
    const key = e.key;
    if (key === " " || key === "Enter") {
      this.prevMonthClick(e);
    }
  };

  private nextMonthClick = (e: Event): void => {
    this.handleArrowClick(e, this.nextMonthDate);
  };

  private nextMonthKeydown = (e: KeyboardEvent): void => {
    const key = e.key;
    if (key === " " || key === "Enter") {
      this.nextMonthClick(e);
    }
  };

  /*
   * Update active month on clicks of left/right arrows
   */
  private handleArrowClick = (e: Event, date: Date): void => {
    e?.preventDefault();
    e.stopPropagation();
    this.calciteDatePickerSelect.emit(date);
  };

  private getInRangeDate({
    localizedYear,
    offset = 0
  }: {
    localizedYear: string;
    offset?: number;
  }): Date {
    const { min, max, activeDate, localeData } = this;
    const parsedYear = parseNumber(localizedYear, localeData);
    const length = parsedYear.toString().length;
    const year = isNaN(parsedYear) ? false : parsedYear + offset;
    const inRange =
      year && (!min || min.getFullYear() <= year) && (!max || max.getFullYear() >= year);
    // if you've supplied a year and it's in range
    if (year && inRange && length === localizedYear.length) {
      const nextDate = new Date(activeDate);
      nextDate.setFullYear(year as number);
      return dateFromRange(nextDate, min, max);
    }
  }

  /**
   * Parse localized year string from input,
   * set to active if in range
   *
   * @param root0
   * @param root0.localizedYear
   * @param root0.commit
   * @param root0.offset
   */
  private setYear({
    localizedYear,
    commit = true,
    offset = 0
  }: {
    localizedYear: string;
    commit?: boolean;
    offset?: number;
  }): void {
    const { yearInput, activeDate } = this;
    const inRangeDate = this.getInRangeDate({ localizedYear, offset });

    // if you've supplied a year and it's in range, update active date
    if (inRangeDate) {
      this.calciteDatePickerSelect.emit(inRangeDate);
    }

    if (commit) {
      yearInput.value = this.formatCalendarYear(
        (inRangeDate || activeDate).getFullYear().toString()
      );
    }
  }
}
