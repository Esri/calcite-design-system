import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  dateFromRange,
  parseCalendarYear,
  getOrder,
  nextMonth,
  prevMonth,
  formatCalendarYear,
  activeDateInMonth,
  hasSameMonthAndYear,
  inRange,
} from "../../utils/date";
import { closestElementCrossShadowBoundary, getTextWidth } from "../../utils/dom";
import { isActivationKey } from "../../utils/key";
import { numberStringFormatter } from "../../utils/locale";
import { DatePickerMessages } from "../date-picker/assets/date-picker/t9n";
import { DateLocaleData } from "../date-picker/utils";
import { HeadingLevel } from "../functional/Heading";
import { Position, Scale } from "../interfaces";
import { componentOnReady } from "../../utils/component";
import { CSS, ICON } from "./resources";

@Component({
  tag: "calcite-date-picker-month-header",
  styleUrl: "date-picker-month-header.scss",
  shadow: true,
})
export class DatePickerMonthHeader {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Already selected date. */
  @Prop() selectedDate: Date;

  /** The focused date is indicated and will become the selected date if the user proceeds. */
  @Prop() activeDate: Date;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop() headingLevel: HeadingLevel;

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @Prop() min: Date;

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @Prop() max: Date;

  @Watch("min")
  @Watch("max")
  updateYearList(): void {
    this.getYearList();
  }

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale;

  @Watch("scale")
  updateScale(): void {
    this.setSelectChevronEl(this.monthPickerEl);
    this.setSelectChevronEl(this.yearPickerEl);
  }

  /** CLDR locale data for translated calendar info. */
  @Prop() localeData: DateLocaleData;

  /**
   * This property specifies accessible strings for the component's previous month button ,next month button & year input elements.
   * Made into a prop for testing purposes only.
   *
   * @internal
   * @readonly
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: DatePickerMessages;

  /**
   * When `true`, month will be abbreviated.
   */
  @Prop() monthAbbreviations: boolean;

  /**
   * Specifies the position of the component in a range date-picker.
   * @internal
   *
   */
  @Prop() position: Extract<"start" | "end", Position>;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   *  Fires to active date
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalDatePickerMonthHeaderSelect: EventEmitter<Date>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.parentDatePickerEl = closestElementCrossShadowBoundary(
      this.el,
      "calcite-date-picker",
    ) as HTMLCalciteDatePickerElement;
  }

  connectedCallback(): void {
    this.getYearList();
    this.setNextPrevMonthDates();
  }

  componentDidLoad(): void {
    this.setSelectChevronEl(this.monthPickerEl);
    this.setSelectChevronEl(this.yearPickerEl);
  }

  render(): VNode {
    return <div class={CSS.header}>{this.renderContent()}</div>;
  }

  renderContent(): VNode {
    const { localeData, activeDate } = this;
    if (!activeDate || !localeData) {
      return null;
    }

    if (this.parentDatePickerEl) {
      const { numberingSystem, lang: locale } = this.parentDatePickerEl;

      numberStringFormatter.numberFormatOptions = {
        useGrouping: false,
        ...(numberingSystem && { numberingSystem }),
        ...(locale && { locale }),
      };
    }

    const activeMonth = activeDate.getMonth();
    const { months, unitOrder } = localeData;
    const order = getOrder(unitOrder);
    const reverse = order.indexOf("y") < order.indexOf("m");

    return (
      <Fragment>
        {this.position && (
          <div class={{ [CSS.chevronContainer]: true }}>
            {this.position === "start" && this.renderChevron("left")}
          </div>
        )}
        <div
          class={{
            [CSS.monthYearContainer]: true,
            [CSS.monthYearContainerReverse]: reverse,
            [CSS.rangeCalendar]: !!this.position,
          }}
        >
          {this.renderMonthPicker(months, activeMonth)}
          {this.renderYearPicker()}
        </div>
        {!this.position && (
          <div class={{ [CSS.chevronContainer]: true }}>{this.renderChevron("left")}</div>
        )}
        <div class={{ [CSS.chevronContainer]: true }}>
          {this.position !== "start" && this.renderChevron("right")}
        </div>
      </Fragment>
    );
  }

  private renderMonthPicker(months: DateLocaleData["months"], activeMonth: number): VNode {
    const monthData = this.monthAbbreviations ? months.abbreviated : months.wide;
    return (
      <calcite-select
        class={CSS.monthPicker}
        label="Month menu"
        onCalciteSelectChange={this.handleMonthChange}
        ref={(el) => (this.monthPickerEl = el)}
        width="auto"
      >
        {monthData.map((month: string, index: number) => {
          return (
            <calcite-option
              disabled={this.isMonthInRange(index)}
              selected={index === activeMonth}
              value={month}
            >
              {month}
            </calcite-option>
          );
        })}
      </calcite-select>
    );
  }

  private renderYearPicker(): VNode {
    return (
      <calcite-select
        class={CSS.yearPicker}
        label="Year menu"
        onCalciteSelectChange={this.handleYearChange}
        ref={(el) => (this.yearPickerEl = el)}
        width="auto"
      >
        {this.yearList.map((year: number) => {
          const yearString = year.toString();
          return (
            <calcite-option
              disabled={this.isYearInRange(year)}
              selected={this.activeDate.getFullYear() === year}
              value={yearString}
            >
              {numberStringFormatter.localize(yearString)}
              {this.localeData?.year?.suffix}
            </calcite-option>
          );
        })}
      </calcite-select>
    );
  }

  private renderChevron(direction: "left" | "right"): VNode {
    const activeMonth = this.activeDate.getMonth();
    const isDirectionRight = direction === "right";
    return (
      <calcite-action
        alignment="center"
        aria-disabled={`${this.nextMonthDate.getMonth() === activeMonth}`}
        aria-label={isDirectionRight ? this.messages.nextMonth : this.messages.prevMonth}
        class={CSS.chevron}
        compact={true}
        disabled={
          hasSameMonthAndYear(
            isDirectionRight ? this.nextMonthDate : this.prevMonthDate,
            this.activeDate,
          ) || !inRange(this.activeDate, this.min, this.max)
        }
        icon={isDirectionRight ? ICON.chevronRight : ICON.chevronLeft}
        iconFlipRtl={true}
        onClick={isDirectionRight ? this.nextMonthClick : this.prevMonthClick}
        onKeyDown={isDirectionRight ? this.nextMonthKeydown : this.prevMonthKeydown}
        role="button"
        scale={this.scale === "l" ? "l" : "m"}
        text={isDirectionRight ? this.messages.nextMonth : this.messages.prevMonth}
      />
    );
  }

  private getYearList(): void {
    this.yearList = [];
    for (
      let i = (this.min?.getFullYear() || this.defaultMinYear) - 1;
      i <= (this.max?.getFullYear() || this.defaultMaxYear) + 1;
      i++
    ) {
      this.yearList.push(i);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDatePickerMonthHeaderElement;

  @State() nextMonthDate: Date;

  @State() prevMonthDate: Date;

  @State() yearList: number[] = [];

  private parentDatePickerEl: HTMLCalciteDatePickerElement;

  private yearPickerEl: HTMLCalciteSelectElement;

  private monthPickerEl: HTMLCalciteSelectElement;

  private defaultMinYear = 1950;

  private defaultMaxYear = 2050;

  private defaultMinISOYear = new Date("1950-01-01");

  private defaultMaxISOYear = new Date("2050-12-31");

  private selectChevronOffSetWidth: number;

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

  @Watch("activeDate")
  handleSelectWidth(newValue: Date, oldValue: Date): void {
    if (!oldValue) {
      return;
    }

    this.setSelectWidth(this.monthPickerEl);
    this.setSelectWidth(this.yearPickerEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private handleYearChange = (event: Event): void => {
    const target = event.target as HTMLCalciteSelectElement;
    this.setYear({
      localizedYear: numberStringFormatter.localize(
        `${parseCalendarYear(Number(target.value), this.localeData)}`,
      ),
    });
    this.setSelectWidth(this.yearPickerEl);
  };

  private prevMonthClick = (event: KeyboardEvent | MouseEvent): void => {
    this.handleArrowClick(event, this.prevMonthDate);
  };

  private prevMonthKeydown = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      this.prevMonthClick(event);
    }
  };

  private nextMonthClick = (event: MouseEvent | KeyboardEvent): void => {
    this.handleArrowClick(event, this.nextMonthDate);
  };

  private nextMonthKeydown = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      this.nextMonthClick(event);
    }
  };

  /*
   * Update active month on clicks of left/right arrows
   */
  private handleArrowClick = (event: MouseEvent | KeyboardEvent, date: Date): void => {
    event.preventDefault();
    this.calciteInternalDatePickerMonthHeaderSelect.emit(date);
  };

  private handleMonthChange = (event: CustomEvent): void => {
    const target = event.target as HTMLCalciteOptionElement;
    const { abbreviated, wide } = this.localeData.months;
    const localeMonths = this.monthAbbreviations ? abbreviated : wide;
    const monthIndex = localeMonths.indexOf(target.value);
    let newDate = activeDateInMonth(this.activeDate, monthIndex);
    if (!inRange(newDate, this.min, this.max)) {
      newDate = dateFromRange(newDate, this.min, this.max);
    }
    this.calciteInternalDatePickerMonthHeaderSelect.emit(newDate);
    this.setSelectWidth(this.monthPickerEl);
  };

  private getInRangeDate({
    localizedYear,
    offset = 0,
  }: {
    localizedYear: string;
    offset?: number;
  }): Date {
    const { min, max, activeDate } = this;
    const parsedYear = Number(numberStringFormatter.delocalize(localizedYear));
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
    offset = 0,
  }: {
    localizedYear: string;
    commit?: boolean;
    offset?: number;
  }): void {
    const inRangeDate = this.getInRangeDate({ localizedYear, offset });

    // if you've supplied a year and it's in range, update active date
    if (inRangeDate) {
      this.calciteInternalDatePickerMonthHeaderSelect.emit(inRangeDate);
    }

    if (commit) {
      this.yearPickerEl.value = formatCalendarYear(
        (inRangeDate || this.activeDate).getFullYear(),
        this.localeData,
      ).toString();
    }
  }

  private async setSelectChevronEl(select: HTMLCalciteSelectElement): Promise<void> {
    const chevronEl = select.shadowRoot.querySelector("calcite-icon");
    await componentOnReady(chevronEl);
    const chevronContainer = select.shadowRoot.querySelector(".icon-container");
    const chevronElWidth = chevronEl.getBoundingClientRect().width;
    const chevronContainerElWidth = chevronContainer.getBoundingClientRect().width;
    this.selectChevronOffSetWidth =
      chevronContainerElWidth + (chevronContainerElWidth - chevronElWidth) / 2;
    this.setSelectWidth(select);
  }

  private setSelectWidth(select: HTMLCalciteSelectElement): void {
    const selectEl = select.shadowRoot.querySelector("select");
    let selectedOptionWidth: number;
    if (select === this.monthPickerEl) {
      const { abbreviated, wide } = this.localeData.months;
      const localeMonths = this.monthAbbreviations ? abbreviated : wide;
      const activeMonthIndex = this.activeDate.getMonth();
      selectedOptionWidth = getTextWidth(
        localeMonths[activeMonthIndex],
        getComputedStyle(selectEl).font,
      );
    } else {
      selectedOptionWidth = getTextWidth(
        numberStringFormatter.localize(
          `${parseCalendarYear(this.activeDate.getFullYear(), this.localeData)}`,
        ),
        getComputedStyle(selectEl).font,
      );
    }
    selectEl.style.width = `${selectedOptionWidth + this.selectChevronOffSetWidth}px`;
  }

  private isMonthInRange = (index: number): boolean => {
    const newActiveDate = activeDateInMonth(this.activeDate, index);
    return (
      newActiveDate > (this.max || this.defaultMaxISOYear) ||
      newActiveDate < (this.min || this.defaultMinISOYear)
    );
  };

  private isYearInRange = (year: number): boolean => {
    return (
      year > (this.max?.getFullYear() || this.defaultMaxYear) ||
      year < (this.min?.getFullYear() || this.defaultMinYear)
    );
  };
}
