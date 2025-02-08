import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  dateFromISO,
  dateFromRange,
  dateToISO,
  getDaysDiff,
  getFirstValidDateInMonth,
  HoverRange,
  inRange,
  nextMonth,
  prevMonth,
  sameDate,
} from "../../utils/date";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectLocalized,
  disconnectLocalized,
  getDateTimeFormat,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
} from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { HeadingLevel } from "../functional/Heading";
import { isBrowser } from "../../utils/browser";
import { focusFirstTabbable } from "../../utils/dom";
import { DatePickerMessages } from "./assets/date-picker/t9n";
import { DATE_PICKER_FORMAT_OPTIONS, HEADING_LEVEL } from "./resources";
import { DateLocaleData, getLocaleData, getValueAsDateRange } from "./utils";

@Component({
  assetsDirs: ["assets"],
  tag: "calcite-date-picker",
  styleUrl: "date-picker.scss",
  shadow: {
    delegatesFocus: true,
  },
})
export class DatePicker implements LocalizedComponent, LoadableComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the component's active date. */
  @Prop({ mutable: true }) activeDate: Date;

  @Watch("activeDate")
  activeDateWatcher(newValue: Date): void {
    if (!this.range) {
      return;
    }

    if (!this.rangeValueChangedByUser) {
      if (newValue) {
        this.activeStartDate = newValue;
        this.activeEndDate = nextMonth(this.activeStartDate);
      } else {
        this.resetActiveDates();
      }
    }
  }

  /**
   * When `range` is true, specifies the active `range`. Where `"start"` specifies the starting range date and `"end"` the ending range date.
   */
  @Prop({ reflect: true }) activeRange: "start" | "end";

  /**
   * Specifies the selected date as a string (`"yyyy-mm-dd"`), or an array of strings for `range` values (`["yyyy-mm-dd", "yyyy-mm-dd"]`).
   */
  @Prop({ mutable: true }) value: string | string[];

  @Watch("value")
  valueHandler(value: string | string[]): void {
    if (Array.isArray(value)) {
      this.valueAsDate = getValueAsDateRange(value);
      if (!this.rangeValueChangedByUser) {
        this.resetActiveDates();
      }
    } else if (value) {
      this.valueAsDate = dateFromISO(value);
    }
  }

  /**
   * Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /** Defines the layout of the component. */
  @Prop({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  /** Specifies the selected date as a full date object (`new Date("yyyy-mm-dd")`), or an array containing full date objects (`[new Date("yyyy-mm-dd"), new Date("yyyy-mm-dd")]`). */
  @Prop({ mutable: true }) valueAsDate: Date | Date[];

  @Watch("valueAsDate")
  valueAsDateWatcher(newValueAsDate: Date | Date[]): void {
    if (this.range && Array.isArray(newValueAsDate) && !this.rangeValueChangedByUser) {
      this.setActiveStartAndEndDates();
    } else if (newValueAsDate && newValueAsDate !== this.activeDate) {
      this.activeDate = newValueAsDate as Date;
    }
  }

  /** Specifies the earliest allowed date as a full date object (`new Date("yyyy-mm-dd")`). */
  @Prop({ mutable: true }) minAsDate: Date;

  /** Specifies the latest allowed date as a full date object (`new Date("yyyy-mm-dd")`). */
  @Prop({ mutable: true }) maxAsDate: Date;

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @Prop({ reflect: true }) min: string;

  @Watch("min")
  onMinChanged(min: string): void {
    this.minAsDate = dateFromISO(min);
    if (this.range) {
      this.setActiveStartAndEndDates();
    }
  }

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @Prop({ reflect: true }) max: string;

  @Watch("max")
  onMaxChanged(max: string): void {
    this.maxAsDate = dateFromISO(max);
    if (this.range) {
      this.setActiveStartAndEndDates();
    }
  }

  /**
   * Specifies the monthStyle used by the component.
   */
  @Prop() monthStyle: "abbreviated" | "wide" = "wide";

  /**
   * Specifies the Unicode numeral system used by the component for localization. This property cannot be dynamically changed.
   *
   */
  @Prop({ reflect: true }) numberingSystem: NumberingSystem;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** When `true`, activates the component's range mode to allow a start and end date. */
  @Prop({ reflect: true }) range = false;

  /** When `true`, disables the default behavior on the third click of narrowing or extending the range and instead starts a new range. */
  @Prop({ reflect: true }) proximitySelectionDisabled = false;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<DatePickerMessages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: DatePickerMessages;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   * Fires when a user changes the component's date. For `range` events, use `calciteDatePickerRangeChange`.
   */
  @Event({ cancelable: false }) calciteDatePickerChange: EventEmitter<void>;

  /**
   * Fires when a user changes the component's date `range`. For components without `range` use `calciteDatePickerChange`.
   */
  @Event({ cancelable: false }) calciteDatePickerRangeChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  /**
   * Resets active date state.
   * @internal
   */
  @Method()
  async reset(): Promise<void> {
    this.resetActiveDates();
    this.rangeValueChangedByUser = false;
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    if (Array.isArray(this.value)) {
      this.valueAsDate = getValueAsDateRange(this.value);
    } else if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
    }

    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }

    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }
    this.setActiveStartAndEndDates();
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  render(): VNode {
    const date = dateFromRange(
      this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate,
      this.minAsDate,
      this.maxAsDate,
    );
    const activeDate = this.getActiveDate(date, this.minAsDate, this.maxAsDate);
    const endDate =
      this.range && Array.isArray(this.valueAsDate)
        ? dateFromRange(this.valueAsDate[1], this.minAsDate, this.maxAsDate)
        : null;

    const minDate =
      this.range && this.activeRange
        ? this.activeRange === "start"
          ? this.minAsDate
          : date
        : this.minAsDate;

    const startCalendarActiveDate = this.range ? this.activeStartDate : activeDate;

    return (
      <Host onKeyDown={this.keyDownHandler}>
        {this.renderMonth(startCalendarActiveDate, this.maxAsDate, minDate, date, endDate)}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDatePickerElement;

  /**
   * Active end date.
   */
  @State() activeEndDate: Date;

  /**
   * Active start date.
   */
  @State() activeStartDate: Date;

  /**
   * The DateTimeFormat used to provide screen reader labels.
   *
   * @internal
   */
  @State() dateTimeFormat: Intl.DateTimeFormat;

  @State() defaultMessages: DatePickerMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() endAsDate: Date;

  @State() private hoverRange: HoverRange;

  @State() private localeData: DateLocaleData;

  @State() startAsDate: Date;

  private rangeValueChangedByUser = false;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.resetActiveDates();
    }
  };

  @Watch("effectiveLocale")
  private async loadLocaleData(): Promise<void> {
    if (!isBrowser()) {
      return;
    }

    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false,
    };

    this.localeData = await getLocaleData(this.effectiveLocale);
    this.dateTimeFormat = getDateTimeFormat(this.effectiveLocale, DATE_PICKER_FORMAT_OPTIONS);
  }

  private monthHeaderSelectChange = (
    event: CustomEvent<{ date: Date; position: string }>,
  ): void => {
    const date = new Date(event.detail.date);
    const position = event.detail.position;
    if (!this.range) {
      this.activeDate = date;
    } else {
      if (position === "end") {
        this.activeEndDate = date;
        this.activeStartDate = prevMonth(date);
      } else {
        this.activeStartDate = date;
        this.activeEndDate = nextMonth(date);
      }
    }
    event.stopPropagation();
  };

  private monthActiveDateChange = (event: CustomEvent<Date>): void => {
    const date = new Date(event.detail);
    if (!this.range) {
      this.activeDate = date;
    } else {
      const month = date.getMonth();
      const isDateOutOfCurrentRange =
        month !== this.activeStartDate.getMonth() &&
        month !== nextMonth(this.activeStartDate).getMonth();
      if (this.activeRange === "end") {
        if (!this.activeEndDate || (this.activeStartDate && isDateOutOfCurrentRange)) {
          this.activeEndDate = date;
          this.activeStartDate = prevMonth(date);
        }
      } else {
        if ((this.activeStartDate && isDateOutOfCurrentRange) || !this.activeStartDate) {
          this.activeStartDate = date;
          this.activeEndDate = nextMonth(date);
        }
      }
    }
    event.stopPropagation();
  };

  private monthHoverChange = (event: CustomEvent<Date>): void => {
    if (!this.range) {
      this.hoverRange = undefined;
      return;
    }
    const { valueAsDate } = this;
    const start = Array.isArray(valueAsDate) && valueAsDate[0];
    const end = Array.isArray(valueAsDate) && valueAsDate[1];

    const date = new Date(event.detail);
    this.hoverRange = {
      focused: this.activeRange || "start",
      start,
      end,
    };

    if (this.proximitySelectionDisabled) {
      if ((end && start) || (!end && date >= start)) {
        this.hoverRange.focused = "end";
        this.hoverRange.end = date;
      } else if (!end && date < start) {
        this.hoverRange = {
          focused: "start",
          start: date,
          end: start,
        };
      } else {
        this.hoverRange = undefined;
      }
    } else {
      if (this.activeRange) {
        if (this.activeRange === "end") {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        } else {
          this.hoverRange.start = date;
          this.hoverRange.focused = "start";
        }
      } else if (start && end) {
        const startDiff = Math.abs(getDaysDiff(date, start));
        const endDiff = Math.abs(getDaysDiff(date, end));
        if (date > end) {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        } else if (date < start) {
          this.hoverRange.start = date;
          this.hoverRange.focused = "start";
        } else if (date > start && date < end) {
          if (startDiff < endDiff) {
            this.hoverRange.start = date;
            this.hoverRange.focused = "start";
          } else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
      } else {
        if (start) {
          if (date < start) {
            this.hoverRange = {
              focused: "start",
              start: date,
              end: start,
            };
          } else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
      }
    }
    event.stopPropagation();
  };

  monthMouseOutChange = (event: CustomEvent): void => {
    if (this.hoverRange) {
      this.hoverRange = undefined;
    }
    event.stopPropagation();
  };

  /**
   * Render calcite-date-picker-month-header and calcite-date-picker-month
   *
   * @param activeDate
   * @param maxDate
   * @param minDate
   * @param date
   * @param endDate
   */
  private renderMonth(
    activeDate: Date,
    maxDate: Date,
    minDate: Date,
    date: Date,
    endDate: Date,
  ): VNode {
    return (
      this.localeData && (
        <calcite-date-picker-month
          activeDate={activeDate}
          dateTimeFormat={this.dateTimeFormat}
          endDate={this.range ? endDate : undefined}
          headingLevel={this.headingLevel || HEADING_LEVEL}
          hoverRange={this.hoverRange}
          layout={this.layout}
          localeData={this.localeData}
          max={maxDate}
          messages={this.messages}
          min={minDate}
          monthStyle={this.monthStyle}
          onCalciteInternalDatePickerDayHover={this.monthHoverChange}
          onCalciteInternalDatePickerDaySelect={this.monthDateChange}
          onCalciteInternalDatePickerMonthActiveDateChange={this.monthActiveDateChange}
          onCalciteInternalDatePickerMonthChange={this.monthHeaderSelectChange}
          onCalciteInternalDatePickerMonthMouseOut={this.monthMouseOutChange}
          range={this.range}
          scale={this.scale}
          selectedDate={this.activeRange === "end" ? endDate : date}
          startDate={this.range ? date : undefined}
        />
      )
    );
  }

  private resetActiveDates = (): void => {
    const { valueAsDate } = this;

    if (!Array.isArray(valueAsDate) && valueAsDate && valueAsDate !== this.activeDate) {
      this.activeDate = new Date(valueAsDate);
    }

    if (Array.isArray(valueAsDate)) {
      if (valueAsDate[0] && valueAsDate[0] !== this.activeStartDate) {
        this.activeStartDate = new Date(valueAsDate[0]);
      }
      if (valueAsDate[1] && valueAsDate[1] !== this.activeEndDate) {
        this.activeEndDate = new Date(valueAsDate[1]);
      }
    }
    this.hoverRange = undefined;
  };

  private getEndDate(): Date {
    return (Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined;
  }

  private setEndDate(date: Date): void {
    const startDate = this.getStartDate();
    this.rangeValueChangedByUser = true;
    this.value = [dateToISO(startDate), dateToISO(date)];
    this.valueAsDate = [startDate, date];
    if (date) {
      this.calciteDatePickerRangeChange.emit();
    }
  }

  private getStartDate(): Date {
    return Array.isArray(this.valueAsDate) && this.valueAsDate[0];
  }

  private setStartDate(date: Date): void {
    const endDate = this.getEndDate();
    this.rangeValueChangedByUser = true;
    this.value = [dateToISO(date), dateToISO(endDate)];
    this.valueAsDate = [date, endDate];
    this.calciteDatePickerRangeChange.emit();
  }

  /**
   * Event handler for when the selected date changes
   *
   * @param event
   */
  private monthDateChange = (event: CustomEvent<Date>): void => {
    const date = new Date(event.detail);
    const isoDate = dateToISO(date);

    if (!this.range && isoDate === dateToISO(this.valueAsDate as Date)) {
      return;
    }

    if (!this.range) {
      this.value = isoDate || "";
      this.valueAsDate = date || null;
      this.activeDate = date || null;
      this.calciteDatePickerChange.emit();
      return;
    }

    const start = this.getStartDate();
    const end = this.getEndDate();

    if (!start || (!end && date < start)) {
      if (start) {
        this.setEndDate(new Date(start));
      }
      if (this.activeRange == "end") {
        this.setEndDate(date);
      } else {
        this.setStartDate(date);
      }
    } else if (!end) {
      this.setEndDate(date);
    } else {
      if (this.proximitySelectionDisabled) {
        this.setStartDate(date);
        this.setEndDate(null);
      } else {
        if (this.activeRange) {
          if (this.activeRange == "end") {
            this.setEndDate(date);
          } else {
            //allows start end to go beyond end date and set the end date to empty while editing
            if (date > end) {
              this.setEndDate(null);
              this.activeEndDate = null;
            }
            this.setStartDate(date);
          }
        } else {
          const startDiff = getDaysDiff(date, start);
          const endDiff = getDaysDiff(date, end);
          if (endDiff === 0 || startDiff < 0) {
            this.setStartDate(date);
          } else if (startDiff === 0 || endDiff < 0) {
            this.setEndDate(date);
          } else if (startDiff < endDiff) {
            this.setStartDate(date);
          } else {
            this.setEndDate(date);
          }
        }
      }
    }
    event.stopPropagation();
    this.calciteDatePickerChange.emit();
  };

  /**
   * Get an active date using the value, or current date as default
   *
   * @param value
   * @param min
   * @param max
   */
  private getActiveDate(value: Date | null, min: Date | null, max: Date | null): Date {
    const activeDate = dateFromRange(new Date(), min, max);

    return (
      dateFromRange(this.activeDate, min, max) ||
      value ||
      (sameDate(max, activeDate) && !this.range
        ? getFirstValidDateInMonth(activeDate, min, max)
        : activeDate)
    );
  }

  private getActiveEndDate(value: Date | null, min: Date | null, max: Date | null): Date {
    return (
      dateFromRange(this.activeEndDate, min, max) ||
      value ||
      dateFromRange(nextMonth(new Date()), min, max)
    );
  }

  private setActiveStartAndEndDates(): void {
    if (this.range) {
      const startDate = dateFromRange(
        Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate,
        this.minAsDate,
        this.maxAsDate,
      );

      const endDate = dateFromRange(
        Array.isArray(this.valueAsDate) ? this.valueAsDate[1] : null,
        this.minAsDate,
        this.maxAsDate,
      );

      this.activeStartDate = this.getActiveDate(startDate, this.minAsDate, this.maxAsDate);
      this.activeEndDate = this.getActiveEndDate(endDate, this.minAsDate, this.maxAsDate);

      if (sameDate(this.activeStartDate, this.activeEndDate)) {
        const previousMonthActiveDate = getFirstValidDateInMonth(
          prevMonth(this.activeEndDate),
          this.minAsDate,
          this.maxAsDate,
        );
        const nextMonthActiveDate = nextMonth(this.activeEndDate);
        if (inRange(previousMonthActiveDate, this.minAsDate, this.maxAsDate)) {
          this.activeStartDate = previousMonthActiveDate;
        } else if (inRange(nextMonthActiveDate, this.minAsDate, this.maxAsDate)) {
          this.activeEndDate = nextMonthActiveDate;
        }
      }
    }
  }
}
