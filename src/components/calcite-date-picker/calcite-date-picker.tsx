import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  State,
  Listen,
  Build,
  EventEmitter,
  Watch,
  VNode
} from "@stencil/core";
import { getLocaleData, DateLocaleData } from "./utils";
import { getElementDir } from "../../utils/dom";
import { dateFromRange, dateFromISO, dateToISO, getDaysDiff } from "../../utils/date";
import { HeadingLevel } from "../functional/CalciteHeading";
import { getKey } from "../../utils/key";
import { TEXT } from "./calcite-date-picker-resources";

import { DateRangeChange } from "./interfaces";
import { HEADING_LEVEL } from "./resources";

@Component({
  assetsDirs: ["assets"],
  tag: "calcite-date-picker",
  styleUrl: "calcite-date-picker.scss",
  shadow: true
})
export class CalciteDatePicker {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteDatePickerElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** Active range */
  @Prop() activeRange?: "start" | "end" = "start";

  /** Selected date */
  @Prop() value?: string;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

  /** Selected date as full date object*/
  @Prop({ mutable: true }) valueAsDate?: Date;

  @Watch("valueAsDate")
  handleValueAsDate(date: Date): void {
    this.activeDate = date;
    this.calciteDatePickerChange.emit(date);
  }

  /** Selected start date as full date object*/
  @Prop({ mutable: true }) startAsDate?: Date;

  /** Selected end date as full date object*/
  @Prop({ mutable: true }) endAsDate?: Date;

  /** Earliest allowed date as full date object */
  @Prop({ mutable: true }) minAsDate?: Date;

  /** Latest allowed date as full date object */
  @Prop({ mutable: true }) maxAsDate?: Date;

  @Watch("startAsDate")
  @Watch("endAsDate")
  handleRangeChange(): void {
    const { startAsDate: startDate, endAsDate: endDate } = this;

    this.activeEndDate = endDate;
    this.activeStartDate = startDate;
  }

  /** Earliest allowed date ("yyyy-mm-dd") */
  @Prop() min?: string;

  /** Latest allowed date ("yyyy-mm-dd") */
  @Prop() max?: string;

  /** Localized string for "previous month" (used for aria label) */
  @Prop() intlPrevMonth?: string = TEXT.prevMonth;

  /** Localized string for "next month" (used for aria label) */
  @Prop() intlNextMonth?: string = TEXT.nextMonth;

  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = document.documentElement.lang || "en";

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Range mode activation */
  @Prop({ reflect: true }) range?: boolean = false;

  /** Selected start date */
  @Prop() start?: string;

  /** Selected end date */
  @Prop({ mutable: true }) end?: string;

  /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
  @Prop() proximitySelectionDisabled?: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  /**
   * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
   * Check if the focused element is inside the date picker, if not close
   */
  @Listen("focusin", { target: "window" })
  focusInHandler(e: FocusEvent): void {
    if (!this.hasShadow && !this.el.contains(e.target as HTMLElement)) {
      this.reset();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   * Trigger calcite date change when a user changes the date.
   */
  @Event() calciteDatePickerChange: EventEmitter<Date>;

  /**
   * Trigger calcite date change when a user changes the date range.
   */
  @Event() calciteDatePickerRangeChange: EventEmitter<DateRangeChange>;

  /**
   * Active date.
   */
  @State() activeDate: Date;

  /**
   * Active start date.
   */
  @State() activeStartDate: Date;

  /**
   * Active end date.
   */
  @State() activeEndDate: Date;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback(): void {
    this.loadLocaleData();

    if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
    }

    if (this.start) {
      this.setStartAsDate(dateFromISO(this.start));
    }

    if (this.end) {
      this.setEndAsDate(dateFromISO(this.end));
    }

    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }

    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }
  }

  render(): VNode {
    const date = dateFromRange(
      this.range ? this.startAsDate : this.valueAsDate,
      this.minAsDate,
      this.maxAsDate
    );
    const activeStartDate = this.range
      ? this.getActiveStartDate(date, this.minAsDate, this.maxAsDate)
      : this.getActiveDate(date, this.minAsDate, this.maxAsDate);
    let activeDate = activeStartDate;
    const endDate = this.range
      ? dateFromRange(this.endAsDate, this.minAsDate, this.maxAsDate)
      : null;
    const activeEndDate = this.getActiveEndDate(endDate, this.minAsDate, this.maxAsDate);
    if (
      (this.activeRange === "end" ||
        (this.hoverRange?.focused === "end" && (!this.proximitySelectionDisabled || endDate))) &&
      activeEndDate
    ) {
      activeDate = activeEndDate;
    }
    if (this.range && this.mostRecentRangeValue) {
      activeDate = this.mostRecentRangeValue;
    }
    const minDate = this.activeRange === "start" ? this.minAsDate : date || this.maxAsDate;
    const maxDate = this.maxAsDate;
    const dir = getElementDir(this.el);

    return (
      <Host onBlur={this.reset} onKeyUp={this.keyUpHandler} role="application">
        {this.renderCalendar(activeDate, dir, maxDate, minDate, date, endDate)}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() private localeData: DateLocaleData;

  @State() private hoverRange;

  private hasShadow: boolean = Build.isBrowser && !!document.head.attachShadow;

  private mostRecentRangeValue?: Date;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  keyUpHandler = (e: KeyboardEvent): void => {
    if (getKey(e.key) === "Escape") {
      this.reset();
    }
  };

  @Watch("value")
  valueWatcher(value: string): void {
    this.valueAsDate = dateFromISO(value);
  }

  @Watch("start")
  startWatcher(start: string): void {
    this.setStartAsDate(dateFromISO(start));
  }

  @Watch("end")
  endWatcher(end: string): void {
    this.setEndAsDate(dateFromISO(end));
  }

  @Watch("locale")
  private async loadLocaleData(): Promise<void> {
    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }

  monthHeaderSelectChange = (e: CustomEvent<Date>): void => {
    const date = new Date(e.detail);
    if (!this.range) {
      this.activeDate = date;
    } else {
      if (this.activeRange === "start") {
        this.activeStartDate = date;
      } else if (this.activeRange === "end") {
        this.activeEndDate = date;
      }
      this.mostRecentRangeValue = date;
    }
  };

  monthActiveDateChange = (e: CustomEvent<Date>): void => {
    const date = new Date(e.detail);
    if (!this.range) {
      this.activeDate = date;
    } else {
      if (this.activeRange === "start") {
        this.activeStartDate = date;
      } else if (this.activeRange === "end") {
        this.activeEndDate = date;
      }
      this.mostRecentRangeValue = date;
    }
  };

  monthHoverChange = (e: CustomEvent<Date>): void => {
    if (!this.startAsDate) {
      this.hoverRange = undefined;
      return this.hoverRange;
    }
    const date = new Date(e.detail);
    this.hoverRange = {
      focused: this.activeRange,
      start: this.startAsDate,
      end: this.endAsDate
    };
    if (!this.proximitySelectionDisabled) {
      if (this.endAsDate) {
        const startDiff = getDaysDiff(date, this.startAsDate);
        const endDiff = getDaysDiff(date, this.endAsDate);
        if (startDiff < endDiff) {
          this.hoverRange.start = date;
          this.hoverRange.focused = "start";
        } else {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        }
      } else {
        if (date < this.startAsDate) {
          this.hoverRange = {
            focused: "start",
            start: date,
            end: this.startAsDate
          };
        } else {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        }
      }
    } else {
      if (!this.endAsDate) {
        if (date < this.startAsDate) {
          this.hoverRange = {
            focused: "start",
            start: date,
            end: this.startAsDate
          };
        } else {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        }
      } else {
        this.hoverRange = undefined;
      }
    }
  };

  monthMouseOutChange = (): void => {
    if (this.hoverRange) {
      this.hoverRange = undefined;
    }
  };

  /**
   * Render calcite-date-picker-month-header and calcite-date-picker-month
   */
  private renderCalendar(
    activeDate: Date,
    dir: string,
    maxDate: Date,
    minDate: Date,
    date: Date,
    endDate: Date
  ) {
    return (
      this.localeData && [
        <calcite-date-picker-month-header
          activeDate={activeDate}
          dir={dir}
          headingLevel={this.headingLevel || HEADING_LEVEL}
          intlNextMonth={this.intlNextMonth}
          intlPrevMonth={this.intlPrevMonth}
          localeData={this.localeData}
          max={maxDate}
          min={minDate}
          onCalciteDatePickerSelect={this.monthHeaderSelectChange}
          scale={this.scale}
          selectedDate={this.activeRange === "start" ? date : endDate || new Date()}
        />,
        <calcite-date-picker-month
          activeDate={activeDate}
          dir={dir}
          endDate={this.range ? endDate : undefined}
          hoverRange={this.hoverRange}
          localeData={this.localeData}
          max={maxDate}
          min={minDate}
          onCalciteDatePickerActiveDateChange={this.monthActiveDateChange}
          onCalciteDatePickerHover={this.monthHoverChange}
          onCalciteDatePickerMouseOut={this.monthMouseOutChange}
          onCalciteDatePickerSelect={this.monthDateChange}
          scale={this.scale}
          selectedDate={this.activeRange === "start" ? date : endDate}
          startDate={this.range ? date : undefined}
        />
      ]
    );
  }

  /**
   * Update date instance of start if valid
   */
  private setStartAsDate(startDate: Date, emit?: boolean): void {
    this.startAsDate = startDate;
    this.mostRecentRangeValue = this.startAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate,
        endDate: this.endAsDate
      });
    }
  }

  /**
   * Update date instance of end if valid
   */
  private setEndAsDate(endDate: Date, emit?: boolean): void {
    this.endAsDate = endDate;
    this.mostRecentRangeValue = this.endAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate: this.startAsDate,
        endDate
      });
    }
  }

  /**
   * Reset active date and close
   */
  reset = (): void => {
    if (this.valueAsDate && this.valueAsDate?.getTime() !== this.activeDate?.getTime()) {
      this.activeDate = new Date(this.valueAsDate);
    }
    if (this.startAsDate && this.startAsDate?.getTime() !== this.activeStartDate?.getTime()) {
      this.activeStartDate = new Date(this.startAsDate);
    }
    if (this.endAsDate && this.endAsDate?.getTime() !== this.activeEndDate?.getTime()) {
      this.activeEndDate = new Date(this.endAsDate);
    }
  };

  /**
   * Event handler for when the selected date changes
   */
  private monthDateChange = (e: CustomEvent<Date>): void => {
    const date = new Date(e.detail);
    if (!this.range) {
      this.value = dateToISO(date);
      this.activeDate = date;
      return;
    }

    if (!this.startAsDate || (!this.endAsDate && date < this.startAsDate)) {
      if (this.startAsDate) {
        const newEndDate = new Date(this.startAsDate);
        this.end = dateToISO(newEndDate);
        this.setEndAsDate(newEndDate, true);
        this.activeEndDate = newEndDate;
      }
      this.start = dateToISO(date);
      this.setStartAsDate(date, true);
      this.activeStartDate = date;
    } else if (!this.endAsDate) {
      this.end = dateToISO(date);
      this.setEndAsDate(date, true);
      this.activeEndDate = date;
    } else {
      if (!this.proximitySelectionDisabled) {
        const startDiff = getDaysDiff(date, this.startAsDate);
        const endDiff = getDaysDiff(date, this.endAsDate);
        if (startDiff < endDiff) {
          this.start = dateToISO(date);
          this.setStartAsDate(date, true);
          this.activeStartDate = date;
        } else {
          this.end = dateToISO(date);
          this.setEndAsDate(date, true);
          this.activeEndDate = date;
        }
      } else {
        this.start = dateToISO(date);
        this.setStartAsDate(date, true);
        this.activeStartDate = date;
        this.endAsDate = this.activeEndDate = this.end = undefined;
      }
    }
  };

  /**
   * Get an active date using the value, or current date as default
   */
  private getActiveDate(value: Date | null, min: Date | null, max: Date | null): Date {
    return dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max);
  }

  private getActiveStartDate(value: Date | null, min: Date | null, max: Date | null): Date {
    return (
      dateFromRange(this.activeStartDate, min, max) || value || dateFromRange(new Date(), min, max)
    );
  }

  private getActiveEndDate(value: Date | null, min: Date | null, max: Date | null): Date {
    return (
      dateFromRange(this.activeEndDate, min, max) || value || dateFromRange(new Date(), min, max)
    );
  }
}
