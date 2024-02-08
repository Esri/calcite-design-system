import {
  Build,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  // Listen,
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
  HoverRange,
  nextMonth,
  prevMonth,
  setEndOfDay,
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
    //updates activeValue when user is typing in input and avoid updating activeDates when value is set programmatically
    if (this.range && Array.isArray(newValue) && !this.mostRecentRangeValue) {
      if (newValue[0] || newValue[1]) {
        this.activeStartDate = newValue[0];
        this.activeEndDate = newValue[1] || nextMonth(this.activeStartDate);
      } else {
        this.resetActiveDates();
      }
    }
  }

  /**
   * When `range` is true, specifies the active `range`. Where `"start"` specifies the starting range date and `"end"` the ending range date.
   */
  @Prop({ reflect: true }) activeRange: "start" | "end";

  @Watch("activeRange")
  handleActiveRangeChange(newValue: "start" | "end"): void {
    if (newValue) {
      //to reset activeDates when user switches between the input while navigating between months. This wont preserve the state of the calendar while user switch between input.
      //this.resetActiveDates();
    }
  }

  /**
   * Specifies the selected date as a string (`"yyyy-mm-dd"`), or an array of strings for `range` values (`["yyyy-mm-dd", "yyyy-mm-dd"]`).
   */
  @Prop({ mutable: true }) value: string | string[];

  @Watch("value")
  valueHandler(value: string | string[]): void {
    if (Array.isArray(value)) {
      this.valueAsDate = getValueAsDateRange(value);
      // avoids updating activeDates after every selection. Update of activeDate's happen when user parses value programmatically
      if (!this.mostRecentRangeValue) {
        this.resetActiveDates();
      }
    } else if (value) {
      this.valueAsDate = dateFromISO(value);
    }
  }

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /** Specifies the selected date as a full date object (`new Date("yyyy-mm-dd")`), or an array containing full date objects (`[new Date("yyyy-mm-dd"), new Date("yyyy-mm-dd")]`). */
  @Prop({ mutable: true }) valueAsDate: Date | Date[];

  @Watch("valueAsDate")
  valueAsDateWatcher(newValueAsDate: Date | Date[]): void {
    if (newValueAsDate && newValueAsDate !== this.activeDate && !this.range) {
      this.activeDate = newValueAsDate as Date;
    }
  }

  /** Specifies the earliest allowed date as a full date object (`new Date("yyyy-mm-dd")`). */
  @Prop({ mutable: true })
  minAsDate: Date;

  /** Specifies the latest allowed date as a full date object (`new Date("yyyy-mm-dd")`). */
  @Prop({ mutable: true }) maxAsDate: Date;

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @Prop({ reflect: true }) min: string;

  @Watch("min")
  onMinChanged(min: string): void {
    if (min) {
      this.minAsDate = dateFromISO(min);
    }
  }

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @Prop({ reflect: true }) max: string;

  @Watch("max")
  onMaxChanged(max: string): void {
    if (max) {
      this.maxAsDate = dateFromISO(max);
    }
  }

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
    this.el.focus();
  }

  /**
   * Resets active date state.
   * @internal
   */
  @Method()
  async reset(): Promise<void> {
    this.resetActiveDates();
    this.mostRecentRangeValue = undefined;
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
    this.setActiveDates();
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
      this.maxAsDate
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

    const startCalendarActiveDate = this.range
      ? this.activeRange === "end" &&
        this.activeEndDate &&
        !this.hasSameMonthAndYear(this.activeStartDate, this.activeEndDate)
        ? prevMonth(this.activeEndDate)
        : this.activeStartDate || prevMonth(this.activeEndDate)
      : activeDate;

    return (
      <Host onKeyDown={this.keyDownHandler}>
        <div class="container">
          {this.renderCalendar(startCalendarActiveDate, this.maxAsDate, minDate, date, endDate)}
        </div>
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

  @State() mostRecentRangeValue?: Date;

  //@State() private mostRecentActiveDateValue?: Date;

  @State() startAsDate: Date;

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
    if (!Build.isBrowser) {
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

  monthHeaderSelectChange = (event: CustomEvent<{ date: Date; position: string }>): void => {
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
  };

  monthActiveDateChange = (event: CustomEvent<Date>): void => {
    const date = new Date(event.detail);

    if (!this.range) {
      this.activeDate = date;
    }
  };

  monthHoverChange = (event: CustomEvent<Date>): void => {
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
    if (!this.proximitySelectionDisabled) {
      //make sure hover range is start only when activeRange is start.
      if (this.activeRange) {
        if (this.activeRange === "end") {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        } else {
          this.hoverRange.start = date;
          this.hoverRange.focused = "start";
        }
      } else if (start && end) {
        const startDiff = getDaysDiff(date, start);
        const endDiff = getDaysDiff(date, end);
        if (endDiff > 0) {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        } else if (startDiff < 0) {
          this.hoverRange.start = date;
          this.hoverRange.focused = "start";
        } else if (startDiff > endDiff) {
          this.hoverRange.start = date;
          this.hoverRange.focused = "start";
        } else {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
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
    } else {
      if (!end) {
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
      } else {
        this.hoverRange = undefined;
      }
    }
    event.stopPropagation();
  };

  monthMouseOutChange = (): void => {
    if (this.hoverRange) {
      this.hoverRange = undefined;
    }
  };

  /**
   * Render calcite-date-picker-month-header and calcite-date-picker-month
   *
   * @param activeDate
   * @param maxDate
   * @param minDate
   * @param date
   * @param endDate
   * @param position
   */
  private renderCalendar(
    activeDate: Date,
    maxDate: Date,
    minDate: Date,
    date: Date,
    endDate: Date
  ): VNode {
    return (
      this.localeData && (
        <div class="range-calendar">
          <calcite-date-picker-month
            activeDate={activeDate}
            dateTimeFormat={this.dateTimeFormat}
            endDate={this.range ? endDate : undefined}
            headingLevel={this.headingLevel || HEADING_LEVEL}
            hoverRange={this.hoverRange}
            localeData={this.localeData}
            max={maxDate}
            messages={this.messages}
            min={minDate}
            onCalciteInternalDatePickerActiveDateChange={this.monthActiveDateChange}
            onCalciteInternalDatePickerHover={this.monthHoverChange}
            onCalciteInternalDatePickerMonthChange={this.monthHeaderSelectChange}
            onCalciteInternalDatePickerMouseOut={this.monthMouseOutChange}
            onCalciteInternalDatePickerSelect={this.monthDateChange}
            range={this.range}
            scale={this.scale}
            selectedDate={this.activeRange === "end" ? endDate || date : date}
            startDate={this.range ? date : undefined}
          />
        </div>
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
  };

  private getEndDate(): Date {
    return (Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined;
  }

  private setEndDate(date: Date): void {
    const startDate = this.getStartDate();
    const newEndDate = date ? setEndOfDay(date) : date;
    this.mostRecentRangeValue = newEndDate;
    this.value = [dateToISO(startDate), dateToISO(date)];
    this.valueAsDate = [startDate, date];
    this.calciteDatePickerRangeChange.emit();
  }

  private getStartDate(): Date {
    return Array.isArray(this.valueAsDate) && this.valueAsDate[0];
  }

  private setStartDate(date: Date): void {
    const endDate = this.getEndDate();
    this.mostRecentRangeValue = date;
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
      if (!this.proximitySelectionDisabled) {
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
      } else {
        this.setStartDate(date);
      }
    }
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
    return dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max);
  }

  private getActiveEndDate(value: Date | null, min: Date | null, max: Date | null): Date {
    return (
      dateFromRange(this.activeEndDate, min, max) ||
      value ||
      dateFromRange(nextMonth(new Date()), min, max)
    );
  }

  private setActiveDates(): void {
    if (this.range) {
      const date = dateFromRange(
        Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate,
        this.minAsDate,
        this.maxAsDate
      );

      const endDate = dateFromRange(
        Array.isArray(this.valueAsDate) ? this.valueAsDate[1] : null,
        this.minAsDate,
        this.maxAsDate
      );

      this.activeStartDate = this.getActiveDate(date, this.minAsDate, this.maxAsDate);
      this.activeEndDate = this.getActiveEndDate(endDate, this.minAsDate, this.maxAsDate);
    }
  }

  private hasSameMonthAndYear(startDate: Date, endDate: Date): boolean {
    if (!Array.isArray(this.valueAsDate) || !this.valueAsDate[1]) {
      return false;
    }
    if (!startDate || !endDate) {
      return false;
    }
    const startYearMonth = startDate.getMonth();
    const startYearYear = startDate.getFullYear();

    const endYearMonth = endDate.getMonth();
    const endYearYear = endDate.getFullYear();
    return endYearYear === startYearYear && startYearMonth === endYearMonth;
  }
}
