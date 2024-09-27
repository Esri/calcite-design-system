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
  getDateInMonth,
  hasSameMonthAndYear,
  inRange,
} from "../../utils/date";
import { closestElementCrossShadowBoundary, getTextWidth, toAriaBoolean } from "../../utils/dom";
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

  @Watch("activeDate")
  @Watch("localeData")
  updateSelectMenuWidth(): void {
    this.setSelectMenuWidth(this.monthPickerEl);
  }

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop() headingLevel: HeadingLevel;

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @Prop() min: Date;

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @Prop() max: Date;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale;

  @Watch("scale")
  updateScale(): void {
    this.setSelectMenuIconOffset(this.monthPickerEl);
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
  // eslint-disable-next-line @stencil-community/strict-mutable
  @Prop({ mutable: true }) messages: DatePickerMessages;

  /**
   * Specifies the monthStyle used by the component.
   */
  @Prop() monthStyle: "abbreviated" | "wide";

  /**
   * Specifies the position of the component in a range date-picker.
   * @internal
   *
   */
  @Prop() position: Extract<"start" | "end", Position>;

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
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   *  Fires to active date
   *
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalDatePickerMonthHeaderSelectChange: EventEmitter<Date>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.parentDatePickerEl = closestElementCrossShadowBoundary(this.el, "calcite-date-picker");
  }

  connectedCallback(): void {
    this.setNextPrevMonthDates();
  }

  componentDidLoad(): void {
    this.setSelectMenuIconOffset(this.monthPickerEl);
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

    const order = getOrder(localeData.unitOrder);
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
            [CSS.rangeCalendar]: !!this.position,
          }}
        >
          {this.renderMonthYearContainer(reverse)}
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

  private renderMonthYearContainer(reverse: boolean): VNode {
    const content = reverse
      ? [this.renderYearInput(), this.renderMonthPicker()]
      : [this.renderMonthPicker(), this.renderYearInput()];
    return <Fragment>{content}</Fragment>;
  }

  private renderMonthPicker(): VNode {
    const activeMonth = this.activeDate.getMonth();
    const monthData = this.localeData.months[this.monthStyle];
    return (
      <calcite-select
        class={CSS.monthPicker}
        label={this.messages.monthMenu}
        onCalciteSelectChange={this.handleMonthChange}
        onKeyDown={this.handleKeyDown}
        ref={(el) => (this.monthPickerEl = el)}
        width="auto"
      >
        {monthData.map((month: string, index: number) => {
          return (
            <calcite-option
              disabled={!this.isMonthInRange(index)}
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

  private renderYearInput(): VNode {
    const suffix = this.localeData.year?.suffix;
    const localizedYear = this.formatCalendarYear(this.activeDate.getFullYear());
    return (
      <span class={CSS.yearContainer}>
        <input
          aria-label={this.messages.year}
          class={{
            year: true,
          }}
          inputmode="numeric"
          maxlength="4"
          minlength="1"
          onChange={this.onYearChange}
          onInput={this.onYearInput}
          onKeyDown={this.onYearKey}
          pattern="\d*"
          ref={(el) => (this.yearInputEl = el)}
          type="text"
          value={localizedYear}
        />
        {suffix && <span class={CSS.suffix}>{suffix}</span>}
      </span>
    );
  }

  private renderChevron(direction: "left" | "right"): VNode {
    const isDirectionRight = direction === "right";
    const isDisabled =
      hasSameMonthAndYear(
        isDirectionRight ? this.nextMonthDate : this.prevMonthDate,
        this.activeDate,
      ) || !inRange(this.activeDate, this.min, this.max);

    return (
      <calcite-action
        alignment="center"
        aria-disabled={toAriaBoolean(isDisabled)}
        aria-label={isDirectionRight ? this.messages.nextMonth : this.messages.prevMonth}
        class={CSS.chevron}
        compact={true}
        data-direction={direction}
        disabled={isDisabled}
        icon={isDirectionRight ? ICON.chevronRight : ICON.chevronLeft}
        iconFlipRtl={true}
        onClick={isDirectionRight ? this.nextMonthClick : this.prevMonthClick}
        onKeyDown={isDirectionRight ? this.nextMonthKeydown : this.prevMonthKeydown}
        ref={(el) => (isDirectionRight ? (this.nextMonthAction = el) : (this.prevMonthAction = el))}
        role="button"
        scale={this.scale === "l" ? "l" : "m"}
        text={isDirectionRight ? this.messages.nextMonth : this.messages.prevMonth}
      />
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDatePickerMonthHeaderElement;

  @State() nextMonthDate: Date;

  @State() prevMonthDate: Date;

  private monthPickerEl: HTMLCalciteSelectElement;

  private nextMonthAction: HTMLCalciteActionElement;

  private parentDatePickerEl: HTMLCalciteDatePickerElement;

  private prevMonthAction: HTMLCalciteActionElement;

  private selectMenuIconOffsetWidth: number;

  private yearInputEl: HTMLInputElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Increment year on UP/DOWN keys
   *
   * @param event
   */
  private onYearKey = (event: KeyboardEvent): void => {
    const localizedYear = this.parseCalendarYear((event.target as HTMLInputElement).value);
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.setYear({ localizedYear, offset: -1 });
        break;
      case "ArrowUp":
        event.preventDefault();
        this.setYear({ localizedYear, offset: 1 });
        break;
    }
  };

  private formatCalendarYear(year: number): string {
    return numberStringFormatter.localize(`${formatCalendarYear(year, this.localeData)}`);
  }

  private parseCalendarYear(year: string): string {
    return numberStringFormatter.localize(
      `${parseCalendarYear(Number(numberStringFormatter.delocalize(year)), this.localeData)}`,
    );
  }

  private onYearChange = (event: Event): void => {
    this.setYear({
      localizedYear: this.parseCalendarYear((event.target as HTMLInputElement).value),
    });
  };

  private onYearInput = (event: Event): void => {
    this.setYear({
      localizedYear: this.parseCalendarYear((event.target as HTMLInputElement).value),
      commit: false,
    });
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
  private handleArrowClick = async (
    event: MouseEvent | KeyboardEvent,
    date: Date,
  ): Promise<void> => {
    event.preventDefault();

    await this.handlePenultimateValidMonth(event);
    this.calciteInternalDatePickerMonthHeaderSelectChange.emit(date);
  };

  private handleMonthChange = (event: CustomEvent): void => {
    const target = event.target as HTMLCalciteOptionElement;
    const { abbreviated, wide } = this.localeData.months;
    const localeMonths = this.monthStyle === "wide" ? wide : abbreviated;
    const monthIndex = localeMonths.indexOf(target.value);
    let newDate = getDateInMonth(this.activeDate, monthIndex);

    if (!inRange(newDate, this.min, this.max)) {
      newDate = dateFromRange(newDate, this.min, this.max);
    }
    this.calciteInternalDatePickerMonthHeaderSelectChange.emit(newDate);
    this.setSelectMenuWidth(this.monthPickerEl);
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.stopPropagation();
    }
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
      nextDate.setFullYear(year);
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
    const { yearInputEl, activeDate } = this;
    const inRangeDate = this.getInRangeDate({ localizedYear, offset });

    // if you've supplied a year and it's in range, update active date
    if (inRangeDate) {
      this.calciteInternalDatePickerMonthHeaderSelectChange.emit(inRangeDate);
    }

    if (commit) {
      yearInputEl.value = this.formatCalendarYear((inRangeDate || activeDate).getFullYear());
    }
  }

  private async setSelectMenuIconOffset(select: HTMLCalciteSelectElement): Promise<void> {
    const iconEl = select.shadowRoot.querySelector("calcite-icon");
    await componentOnReady(iconEl);
    const iconContainer = select.shadowRoot.querySelector(".icon-container");
    const iconWidth = iconEl.getBoundingClientRect().width;
    const iconContainerWidth = iconContainer.getBoundingClientRect().width;
    this.selectMenuIconOffsetWidth = iconContainerWidth + (iconContainerWidth - iconWidth) / 2;
    this.setSelectMenuWidth(select);
  }

  private setSelectMenuWidth(select: HTMLCalciteSelectElement): void {
    const selectEl = select.shadowRoot.querySelector("select");
    const fontStyle = getComputedStyle(selectEl).font;
    const localeMonths = this.localeData.months[this.monthStyle];
    const activeLocaleMonth = localeMonths[this.activeDate.getMonth()];
    const selectedOptionWidth = getTextWidth(activeLocaleMonth, fontStyle);
    selectEl.style.width = `${selectedOptionWidth + this.selectMenuIconOffsetWidth}px`;
  }

  private isMonthInRange = (index: number): boolean => {
    const newActiveDate = getDateInMonth(this.activeDate, index);

    if (!this.min && !this.max) {
      return true;
    }
    return (!!this.max && newActiveDate < this.max) || (!!this.min && newActiveDate > this.min);
  };

  private async handlePenultimateValidMonth(event: MouseEvent | KeyboardEvent): Promise<void> {
    const target = event.target as HTMLCalciteActionElement;
    const direction = target.getAttribute("data-direction");
    const isDirectionLeft = direction === "left";

    let isTargetLastValidMonth: boolean;

    if (isDirectionLeft && this.min) {
      const prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
      isTargetLastValidMonth = hasSameMonthAndYear(prevMonthDate, this.min);
    } else if (this.max) {
      const nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
      isTargetLastValidMonth = hasSameMonthAndYear(nextMonthDate, this.max);
    }

    if (isTargetLastValidMonth) {
      if (!this.position) {
        isDirectionLeft
          ? await this.nextMonthAction.setFocus()
          : await this.prevMonthAction.setFocus();
      } else {
        this.yearInputEl.focus();
      }
    }
  }
}
