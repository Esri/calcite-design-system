import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  h,
  Watch
} from "@stencil/core";

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

  /**
   * Month number starting 0 as January for which the calendar is shown.
   */
  @Prop() month: number = 0;
  /**
   * Year for which the calendar is shown.
   */
  @Prop() year: number = 0;
  /**
   * Already selected date.
   */
  @Prop() selectedDate: Date;
  /**
   * Minimum date of the calendar below which is disabled.
   */
  @Prop() min: Date;
  /**
   * Maximum date of the calendar above which is disabled.
   */
  @Prop() max: Date;
  /**
   * pass the locale in which user wants to show the date.
   */
  @Prop() locale: string = "en-US";
  /**
   * Localized string for previous month.
   */
  @Prop() prevMonthLabel: string = "";
  /**
   * Localized string for next month.
   */
  @Prop() nextMonthLabel: string = "";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   *  Event triggered when user change month.
   */
  @Event() calciteMonthChange: EventEmitter;
  /**
   *  Event triggered when user change year.
   */
  @Event() calciteYearChange: EventEmitter;

  @Watch("month") monthChange() {
    this.calciteMonthChange.emit();
  }

  @Watch("year") yearChange() {
    this.calciteYearChange.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    let localizedMonth = this.getLocalizedMonths()[this.month];

    return (
      <Host>
        <div class="month-year" aria-hidden="true">
          <button
            class="left-icon"
            aria-label={this.prevMonthLabel}
            onClick={ () => this.selectPrevMonth()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              height="16"
              width="16"
            >
              <path d="M11.783 14H9.017l-6-6 6-6h2.766l-6 6z" />
            </svg>
          </button>
          <div class="month-year-text">
            <span class="month" role="heading">
              {localizedMonth}
            </span>
            <input
              class="year"
              type="number"
              value={this.year}
              min={this.min && this.min.getFullYear()}
              max={this.max && this.max.getFullYear()}
              onChange={event => this.onYearChange(event)}
            />
          </div>
          <button
            class="right-icon"
            aria-label={this.nextMonthLabel}
            onClick={() => this.selectNextMonth()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              height="16"
              width="16"
            >
              <path d="M10.217 8l-6-6h2.766l6 6-6 6H4.217z" />
            </svg>
          </button>
        </div>
      </Host>
    );
  }

  private selectPrevMonth() {
    if (this.month === 0) {
      if (this.validateYear(this.year - 1)) {
        this.year -= 1;
      } else {
        return;
      }
    }
    if (this.validateMonth((12 + this.month - 1) % 12, this.year)) {
      this.month = (12 + this.month - 1) % 12;
    }
  }

  private selectNextMonth() {
    if (this.month === 11) {
      if (this.validateYear(this.year + 1)) {
        this.year += 1;
      } else {
        return;
      }
    }
    if (this.validateMonth((this.month + 1) % 12, this.year)) {
      this.month = (this.month + 1) % 12;
    }
  }

  private validateYear(year) {
    let isValid = true;
    if (this.min) {
      isValid = isValid && year >= this.min.getFullYear();
    }
    if (this.max) {
      isValid = isValid && year <= this.max.getFullYear();
    }

    return isValid;
  }

  private validateMonth(month, year) {
    let isValid = true;
    if (this.min) {
      isValid =
        isValid &&
        (this.validateYear(year)
          ? year === this.min.getFullYear()
            ? month >= this.min.getMonth()
            : true
          : false);
    }
    if (this.max) {
      isValid =
        isValid &&
        (this.validateYear(year)
          ? year === this.max.getFullYear()
            ? month <= this.max.getMonth()
            : true
          : false);
    }

    return isValid;
  }

  private onYearChange(event) {
    this.year = parseInt(event.target.value);
  }

  private getLocalizedMonths() {
    let m = 0,
      months = [],
      date = new Date();
    for (; m < 12; m++) {
      date.setMonth(m);
      months.push(
        new Intl.DateTimeFormat(this.locale, {
          month: "long"
        }).format(date)
      );
    }

    return months;
  }
}
