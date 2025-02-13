// @ts-strict-ignore
import {
  calciteSpacingBase,
  calciteSpacingXxs,
  calciteSpacingSm,
} from "@esri/calcite-design-tokens/dist/es6/global.js";
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
  getDateInMonth,
  hasSameMonthAndYear,
  inRange,
} from "../../utils/date";
import { closestElementCrossShadowBoundary, getTextWidth } from "../../utils/dom";
import { isActivationKey } from "../../utils/key";
import { numberStringFormatter } from "../../utils/locale";
import { DateLocaleData } from "../date-picker/utils";
import { HeadingLevel } from "../functional/Heading";
import { Position, Scale } from "../interfaces";
import type { Action } from "../action/action";
import type { Option } from "../option/option";
import type { DatePicker } from "../date-picker/date-picker";
import type { Select } from "../select/select";
import { styles } from "./date-picker-month-header.scss";
import { CSS, ICON, ICON_WIDTH_M } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-date-picker-month-header": DatePickerMonthHeader;
  }
}

export class DatePickerMonthHeader extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private monthPickerEl = createRef<Select["el"]>();

  private nextMonthAction: Action["el"];

  private parentDatePickerEl: DatePicker["el"];

  private prevMonthAction: Action["el"];

  private yearInputEl = createRef<HTMLInputElement>();

  private yearSelectWidthOffset: number;

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
   * @private
   */
  @property() messages: DatePicker["messages"]["_overrides"];

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @property() min: Date;

  /** Specifies the monthStyle used by the component. */
  @property() monthStyle: "abbreviated" | "wide";

  /**
   * Specifies the position of the component in a range date-picker.
   *
   * @private
   */
  @property() position: Extract<"start" | "end", Position>;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale;

  /** Already selected date. */
  @property() selectedDate: Date;

  // #endregion

  // #region Events

  /**
   * Fires to active date
   *
   * @private
   */
  calciteInternalDatePickerMonthHeaderSelectChange = createEvent<Date>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.setNextPrevMonthDates();
  }

  load(): void {
    this.parentDatePickerEl = closestElementCrossShadowBoundary(this.el, "calcite-date-picker");
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (this.hasUpdated && (changes.has("activeDate") || changes.has("localeData"))) {
      this.setYearSelectMenuWidth();
    }

    if (this.hasUpdated && changes.has("scale")) {
      this.setYearSelectWidthOffset();
    }

    if (changes.has("min") || changes.has("max") || changes.has("activeDate")) {
      this.setNextPrevMonthDates();
    }
  }

  loaded(): void {
    this.setYearSelectWidthOffset();
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

  private async handleArrowClick(event: MouseEvent | KeyboardEvent, date: Date): Promise<void> {
    event.preventDefault();

    await this.handlePenultimateValidMonth(event);
    this.calciteInternalDatePickerMonthHeaderSelectChange.emit(date);
  }

  private handleMonthChange(event: CustomEvent): void {
    const target = event.target as Option["el"];
    const { abbreviated, wide } = this.localeData.months;
    const localeMonths = this.monthStyle === "wide" ? wide : abbreviated;
    const monthIndex = localeMonths.indexOf(target.value);
    let newDate = getDateInMonth(this.activeDate, monthIndex);

    if (!inRange(newDate, this.min, this.max)) {
      newDate = dateFromRange(newDate, this.min, this.max);
    }
    this.calciteInternalDatePickerMonthHeaderSelectChange.emit(newDate);
    this.setYearSelectMenuWidth();
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
      yearInputEl: { value: yearInputEl },
      activeDate,
    } = this;
    const inRangeDate = this.getInRangeDate({ localizedYear, offset });

    // if you've supplied a year and it's in range, update active date
    if (inRangeDate) {
      this.calciteInternalDatePickerMonthHeaderSelectChange.emit(inRangeDate);
    }

    if (commit) {
      yearInputEl.value = this.formatCalendarYear((inRangeDate || activeDate).getFullYear());
    }
  }

  private setYearSelectWidthOffset(): void {
    this.yearSelectWidthOffset = ICON_WIDTH_M + 3 * parseInt(this.getYearSelectPadding());
    this.setYearSelectMenuWidth();
  }

  private setYearSelectMenuWidth(): void {
    const el = this.monthPickerEl.value;
    if (!el) {
      return;
    }

    requestAnimationFrame(() => {
      const computedStyle = getComputedStyle(el);
      // we recreate the shorthand vs using computedStyle.font because browsers will return "" instead of the expected value
      const shorthandFont = `${computedStyle.fontStyle} ${computedStyle.fontVariant} ${computedStyle.fontWeight} ${computedStyle.fontSize}/${computedStyle.lineHeight} ${computedStyle.fontFamily}`;
      const localeMonths = this.localeData.months[this.monthStyle];
      const activeLocaleMonth = localeMonths[this.activeDate.getMonth()];
      const selectedOptionWidth = Math.ceil(getTextWidth(activeLocaleMonth, shorthandFont));
      el.style.width = `${selectedOptionWidth + this.yearSelectWidthOffset}px`;
    });
  }

  private isMonthInRange(index: number): boolean {
    const newActiveDate = getDateInMonth(this.activeDate, index);

    if ((!this.min && !this.max) || inRange(newActiveDate, this.min, this.max)) {
      return true;
    }

    return (
      hasSameMonthAndYear(newActiveDate, this.max) || hasSameMonthAndYear(newActiveDate, this.min)
    );
  }

  private async handlePenultimateValidMonth(event: MouseEvent | KeyboardEvent): Promise<void> {
    const target = event.target as Action["el"];
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
        await (isDirectionLeft ? this.nextMonthAction.setFocus() : this.prevMonthAction.setFocus());
      } else {
        this.yearInputEl.value.focus();
      }
    }
  }

  private getPx(value: string): string {
    const num = Number(value.replace(/[rem|px]/g, ""));
    const base = 16;

    if (value.includes("rem")) {
      return `${num * base}px`;
    }

    return `${num}px`;
  }

  private getYearSelectPadding(): string {
    let padding;
    switch (this.scale) {
      case "l":
        padding = calciteSpacingSm;
        break;
      case "s":
        padding = calciteSpacingBase;
        break;
      default:
        padding = calciteSpacingXxs;
        break;
    }
    return this.getPx(padding);
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return <div class={CSS.header}>{this.renderContent()}</div>;
  }

  private renderContent(): JsxNode {
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
      <>
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
      </>
    );
  }

  private renderMonthYearContainer(reverse: boolean): JsxNode {
    const content = reverse
      ? [this.renderYearInput(), this.renderMonthPicker()]
      : [this.renderMonthPicker(), this.renderYearInput()];
    return <>{content}</>;
  }

  private renderMonthPicker(): JsxNode {
    const activeMonth = this.activeDate.getMonth();
    const monthData = this.localeData.months[this.monthStyle];
    return (
      <calcite-select
        class={CSS.monthPicker}
        label={this.messages.monthMenu}
        oncalciteSelectChange={this.handleMonthChange}
        ref={this.monthPickerEl}
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

  private renderYearInput(): JsxNode {
    const suffix = this.localeData.year?.suffix;
    const localizedYear = this.formatCalendarYear(this.activeDate.getFullYear());
    return (
      <span class={CSS.yearContainer}>
        <input
          ariaLabel={this.messages.year}
          class={{
            year: true,
          }}
          inputMode="numeric"
          maxLength="4"
          minLength="1"
          onChange={this.onYearChange}
          onInput={this.onYearInput}
          onKeyDown={this.onYearKey}
          pattern="\d*"
          ref={this.yearInputEl}
          type="text"
          value={localizedYear}
        />
        {suffix && <span class={CSS.suffix}>{suffix}</span>}
      </span>
    );
  }

  private renderChevron(direction: "left" | "right"): JsxNode {
    const isDirectionRight = direction === "right";
    const isDisabled =
      hasSameMonthAndYear(
        isDirectionRight ? this.nextMonthDate : this.prevMonthDate,
        this.activeDate,
      ) || !inRange(this.activeDate, this.min, this.max);

    return (
      <calcite-action
        alignment="center"
        ariaDisabled={isDisabled}
        ariaLabel={isDirectionRight ? this.messages.nextMonth : this.messages.prevMonth}
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

  // #endregion
}
