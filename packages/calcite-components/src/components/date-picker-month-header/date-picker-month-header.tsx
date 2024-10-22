import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, Fragment, h, state, JsxNode } from "@arcgis/lumina";
import {
  dateFromRange,
  parseCalendarYear,
  getOrder,
  nextMonth,
  prevMonth,
  formatCalendarYear,
} from "../../utils/date";
import { closestElementCrossShadowBoundary } from "../../utils/dom";
import { isActivationKey } from "../../utils/key";
import { numberStringFormatter } from "../../utils/locale";
import T9nStrings from "../date-picker/assets/t9n/date-picker.t9n.en.json";
import { DateLocaleData } from "../date-picker/utils";
import { Heading, HeadingLevel } from "../functional/Heading";
import { Scale } from "../interfaces";
import { getIconScale } from "../../utils/component";
import type { DatePicker } from "../date-picker/date-picker";
import { CSS, ICON } from "./resources";
import { styles } from "./date-picker-month-header.scss";

declare global {
  interface DeclareElements {
    "calcite-date-picker-month-header": DatePickerMonthHeader;
  }
}

export class DatePickerMonthHeader extends LitElement {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private parentDatePickerEl: DatePicker["el"];

  private yearInput = createRef<HTMLInputElement>();

  // #endregion

  // #region State Properties

  @state() nextMonthDate: Date;

  @state() prevMonthDate: Date;

  // #endregion

  // #region Public Properties

  /** The focused date is indicated and will become the selected date if the user proceeds. */
  @property() activeDate: Date;

  /** Specifies the number at which section headings should start. */
  @property({ type: Number }) headingLevel: HeadingLevel;

  /** CLDR locale data for translated calendar info. */
  @property() localeData: DateLocaleData;

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @property() max: Date;

  /**
   * This property specifies accessible strings for the component's previous month button ,next month button & year input elements.
   * Made into a prop for testing purposes only.
   *
   * @notPublic
   * @readonly
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @property() messages: typeof T9nStrings;

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @property() min: Date;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale;

  /** Already selected date. */
  @property() selectedDate: Date;

  // #endregion

  // #region Events

  /**
   * Fires to active date
   *
   * @notPublic
   */
  calciteInternalDatePickerSelect = createEvent<Date>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.setNextPrevMonthDates();
  }

  load(): void {
    this.parentDatePickerEl = closestElementCrossShadowBoundary(this.el, "calcite-date-picker");
  }

  /**
   * TODO: [MIGRATION] Consider inlining some of the watch functions called inside of this method to reduce boilerplate code
   *
   * @param changes
   */
  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("min") || changes.has("max") || changes.has("activeDate")) {
      this.setNextPrevMonthDates();
    }
  }

  // #endregion

  // #region Private Methods

  private setNextPrevMonthDates(): void {
    if (!this.activeDate) {
      return;
    }

    this.nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
    this.prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
  }

  /**
   * Increment year on UP/DOWN keys
   *
   * @param event
   */
  private onYearKey(event: KeyboardEvent): void {
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
  }

  private formatCalendarYear(year: number): string {
    return numberStringFormatter.localize(`${formatCalendarYear(year, this.localeData)}`);
  }

  private parseCalendarYear(year: string): string {
    return numberStringFormatter.localize(
      `${parseCalendarYear(Number(numberStringFormatter.delocalize(year)), this.localeData)}`,
    );
  }

  private onYearChange(event: Event): void {
    this.setYear({
      localizedYear: this.parseCalendarYear((event.target as HTMLInputElement).value),
    });
  }

  private onYearInput(event: Event): void {
    this.setYear({
      localizedYear: this.parseCalendarYear((event.target as HTMLInputElement).value),
      commit: false,
    });
  }

  private prevMonthClick(event: KeyboardEvent | MouseEvent): void {
    this.handleArrowClick(event, this.prevMonthDate);
  }

  private prevMonthKeydown(event: KeyboardEvent): void {
    if (isActivationKey(event.key)) {
      this.prevMonthClick(event);
    }
  }

  private nextMonthClick(event: MouseEvent | KeyboardEvent): void {
    this.handleArrowClick(event, this.nextMonthDate);
  }

  private nextMonthKeydown(event: KeyboardEvent): void {
    if (isActivationKey(event.key)) {
      this.nextMonthClick(event);
    }
  }

  private handleArrowClick(event: MouseEvent | KeyboardEvent, date: Date): void {
    event.preventDefault();
    this.calciteInternalDatePickerSelect.emit(date);
  }

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
    const {
      yearInput: { value: yearInput },
      activeDate,
    } = this;
    const inRangeDate = this.getInRangeDate({ localizedYear, offset });

    // if you've supplied a year and it's in range, update active date
    if (inRangeDate) {
      this.calciteInternalDatePickerSelect.emit(inRangeDate);
    }

    if (commit) {
      yearInput.value = this.formatCalendarYear((inRangeDate || activeDate).getFullYear());
    }
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return <div class={CSS.header}>{this.renderContent()}</div>;
  }

  private renderContent(): JsxNode {
    const { messages, localeData, activeDate } = this;
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
    const localizedMonth = (months.wide || months.narrow || months.abbreviated)[activeMonth];
    const localizedYear = this.formatCalendarYear(activeDate.getFullYear());
    const order = getOrder(unitOrder);
    const reverse = order.indexOf("y") < order.indexOf("m");
    const suffix = localeData.year?.suffix;
    return (
      <>
        <a
          ariaDisabled={`${this.prevMonthDate.getMonth() === activeMonth}`}
          ariaLabel={messages.prevMonth}
          class={CSS.chevron}
          href="#"
          onClick={this.prevMonthClick}
          onKeyDown={this.prevMonthKeydown}
          role="button"
          tabIndex={this.prevMonthDate.getMonth() === activeMonth ? -1 : 0}
        >
          <calcite-icon flipRtl icon={ICON.chevronLeft} scale={getIconScale(this.scale)} />
        </a>
        <div class={{ text: true, [CSS.textReverse]: reverse }}>
          <Heading class={CSS.month} level={this.headingLevel}>
            {localizedMonth}
          </Heading>
          <span class={CSS.yearWrap}>
            <input
              ariaLabel={messages.year}
              class={{
                year: true,
                [CSS.yearSuffix]: !!suffix,
              }}
              inputMode="numeric"
              maxLength="4"
              minLength="1"
              onChange={this.onYearChange}
              onInput={this.onYearInput}
              onKeyDown={this.onYearKey}
              pattern="\d*"
              ref={this.yearInput}
              type="text"
              value={localizedYear}
            />
            {suffix && <span class={CSS.suffix}>{suffix}</span>}
          </span>
        </div>
        <a
          ariaDisabled={`${this.nextMonthDate.getMonth() === activeMonth}`}
          ariaLabel={messages.nextMonth}
          class={CSS.chevron}
          href="#"
          onClick={this.nextMonthClick}
          onKeyDown={this.nextMonthKeydown}
          role="button"
          tabIndex={this.nextMonthDate.getMonth() === activeMonth ? -1 : 0}
        >
          <calcite-icon flipRtl icon={ICON.chevronRight} scale={getIconScale(this.scale)} />
        </a>
      </>
    );
  }

  // #endregion
}
