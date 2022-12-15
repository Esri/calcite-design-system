import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  State,
  EventEmitter,
  Watch,
  VNode,
  Build
} from "@stencil/core";
import { getLocaleData, DateLocaleData, getValueAsDateRange } from "./utils";
import {
  dateFromRange,
  dateFromISO,
  dateToISO,
  getDaysDiff,
  HoverRange,
  setEndOfDay
} from "../../utils/date";
import { HeadingLevel } from "../functional/Heading";
import { Messages } from "./assets/date-picker/t9n";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { HEADING_LEVEL } from "./resources";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter
} from "../../utils/locale";

@Component({
  assetsDirs: ["assets"],
  tag: "calcite-date-picker",
  styleUrl: "date-picker.scss",
  shadow: true
})
export class DatePicker implements LocalizedComponent, T9nComponent {
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

  /** Specifies the component's active date. */
  @Prop({ mutable: true }) activeDate: Date;

  @Watch("activeDate")
  activeDateWatcher(newActiveDate: Date): void {
    if (this.activeRange === "end") {
      this.activeEndDate = newActiveDate;
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

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /** Specifies the selected date as a full date object (`new Date("yyyy-mm-dd")`), or an array containing full date objects (`[new Date("yyyy-mm-dd"), new Date("yyyy-mm-dd")]`). */
  @Prop({ mutable: true }) valueAsDate: Date | Date[];

  @Watch("valueAsDate")
  handleValueAsDate(date: Date | Date[]): void {
    if (!Array.isArray(date) && date && date !== this.activeDate) {
      this.activeDate = date;
    }
  }

  /**
   * Specifies the selected start date as a full date object.
   *
   * @deprecated use `valueAsDate` instead.
   */
  @Prop({ mutable: true }) startAsDate: Date;

  /**
   * Specifies the selected end date as a full date object.
   *
   * @deprecated use `valueAsDate` instead.
   */
  @Prop({ mutable: true }) endAsDate: Date;

  /** Specifies the earliest allowed date as a full date object (`new Date("yyyy-mm-dd")`). */
  @Prop({ mutable: true }) minAsDate: Date;

  /** Specifies the latest allowed date as a full date object (`new Date("yyyy-mm-dd")`). */
  @Prop({ mutable: true }) maxAsDate: Date;

  @Watch("startAsDate")
  @Watch("endAsDate")
  handleRangeChange(): void {
    const { startAsDate: startDate, endAsDate: endDate } = this;

    this.activeEndDate = endDate;
    this.activeStartDate = startDate;
  }

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @Prop({ mutable: true, reflect: true }) min: string;

  @Watch("min")
  onMinChanged(min: string): void {
    if (min) {
      this.minAsDate = dateFromISO(min);
    }
  }

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @Prop({ mutable: true, reflect: true }) max: string;

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
  @Prop({ mutable: true }) messageOverrides: Partial<Messages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: Messages;

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
   * Emits when a user changes the component's date. For `range` events, use `calciteDatePickerRangeChange`.
   */
  @Event({ cancelable: false }) calciteDatePickerChange: EventEmitter<void>;

  /**
   * Emits when a user changes the component's date `range`. For components without `range` use `calciteDatePickerChange`.
   *
   * @see [DateRangeChange](https://github.com/Esri/calcite-components/blob/master/src/components/date-picker/interfaces.ts#L1)
   */
  @Event({ cancelable: false }) calciteDatePickerRangeChange: EventEmitter<void>;

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
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
    await setUpMessages(this);
  }

  render(): VNode {
    const date = dateFromRange(
      this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate,
      this.minAsDate,
      this.maxAsDate
    );
    let activeDate = this.getActiveDate(date, this.minAsDate, this.maxAsDate);
    const endDate =
      this.range && Array.isArray(this.valueAsDate)
        ? dateFromRange(this.valueAsDate[1], this.minAsDate, this.maxAsDate)
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

    const minDate =
      this.range && this.activeRange
        ? this.activeRange === "start"
          ? this.minAsDate
          : date || this.minAsDate
        : this.minAsDate;

    const maxDate =
      this.range && this.activeRange
        ? this.activeRange === "start"
          ? endDate || this.maxAsDate
          : this.maxAsDate
        : this.maxAsDate;
    return (
      <Host onBlur={this.reset} onKeyDown={this.keyDownHandler} role="application">
        {this.renderCalendar(activeDate, maxDate, minDate, date, endDate)}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: Messages;

  @State() private localeData: DateLocaleData;

  @State() private hoverRange: HoverRange;

  private mostRecentRangeValue?: Date;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.reset();
    }
  };

  @Watch("value")
  valueHandler(value: string | string[]): void {
    if (Array.isArray(value)) {
      this.valueAsDate = getValueAsDateRange(value);
    } else if (value) {
      this.valueAsDate = dateFromISO(value);
    }
  }

  @Watch("effectiveLocale")
  private async loadLocaleData(): Promise<void> {
    if (!Build.isBrowser) {
      return;
    }

    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false
    };

    this.localeData = await getLocaleData(this.effectiveLocale);
  }

  monthHeaderSelectChange = (event: CustomEvent<Date>): void => {
    const date = new Date(event.detail);
    if (!this.range) {
      this.activeDate = date;
    } else {
      if (this.activeRange === "end") {
        this.activeEndDate = date;
      } else {
        this.activeStartDate = date;
      }
      this.mostRecentRangeValue = date;
    }
  };

  monthActiveDateChange = (event: CustomEvent<Date>): void => {
    const date = new Date(event.detail);
    if (!this.range) {
      this.activeDate = date;
    } else {
      if (this.activeRange === "end") {
        this.activeEndDate = date;
      } else {
        this.activeStartDate = date;
      }
      this.mostRecentRangeValue = date;
    }
  };

  monthHoverChange = (event: CustomEvent<Date>): void => {
    if (!this.startAsDate) {
      this.hoverRange = undefined;
      return;
    }
    const date = new Date(event.detail);
    this.hoverRange = {
      focused: this.activeRange || "start",
      start: this.startAsDate,
      end: this.endAsDate
    };
    if (!this.proximitySelectionDisabled) {
      if (this.endAsDate) {
        const startDiff = getDaysDiff(date, this.startAsDate);
        const endDiff = getDaysDiff(date, this.endAsDate);
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
   */
  private renderCalendar(
    activeDate: Date,
    maxDate: Date,
    minDate: Date,
    date: Date,
    endDate: Date
  ) {
    return (
      this.localeData && [
        <calcite-date-picker-month-header
          activeDate={activeDate}
          headingLevel={this.headingLevel || HEADING_LEVEL}
          localeData={this.localeData}
          max={maxDate}
          messages={this.messages}
          min={minDate}
          onCalciteDatePickerSelect={this.monthHeaderSelectChange}
          scale={this.scale}
          selectedDate={this.activeRange === "end" ? endDate : date || new Date()}
        />,
        <calcite-date-picker-month
          activeDate={activeDate}
          endDate={this.range ? endDate : undefined}
          hoverRange={this.hoverRange}
          localeData={this.localeData}
          max={maxDate}
          min={minDate}
          onCalciteDatePickerActiveDateChange={this.monthActiveDateChange}
          onCalciteDatePickerSelect={this.monthDateChange}
          onCalciteInternalDatePickerHover={this.monthHoverChange}
          onCalciteInternalDatePickerMouseOut={this.monthMouseOutChange}
          scale={this.scale}
          selectedDate={this.activeRange === "end" ? endDate : date}
          startDate={this.range ? date : undefined}
        />
      ]
    );
  }

  /**
   * Update date instance of start if valid
   *
   * @param startDate
   * @param emit
   */
  private setStartAsDate(startDate: Date, emit?: boolean): void {
    this.startAsDate = startDate;
    this.mostRecentRangeValue = this.startAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit();
    }
  }

  /**
   * Update date instance of end if valid
   *
   * @param endDate
   * @param emit
   */
  private setEndAsDate(endDate: Date, emit?: boolean): void {
    this.endAsDate = endDate ? setEndOfDay(endDate) : endDate;
    this.mostRecentRangeValue = this.endAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit();
    }
  }

  /**
   * Reset active date and close
   */
  reset = (): void => {
    if (
      !Array.isArray(this.valueAsDate) &&
      this.valueAsDate &&
      this.valueAsDate?.getTime() !== this.activeDate?.getTime()
    ) {
      this.activeDate = new Date(this.valueAsDate);
    }
    if (this.startAsDate && this.startAsDate?.getTime() !== this.activeStartDate?.getTime()) {
      this.activeStartDate = new Date(this.startAsDate);
    }
    if (this.endAsDate && this.endAsDate?.getTime() !== this.activeEndDate?.getTime()) {
      this.activeEndDate = new Date(this.endAsDate);
    }
  };

  private setEndDate(date: Date): void {
    this.setEndAsDate(date, true);
    this.activeEndDate = date || null;
  }

  private setStartDate(date: Date): void {
    this.setStartAsDate(date, true);
    this.activeStartDate = date || null;
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

    if (!this.startAsDate || (!this.endAsDate && date < this.startAsDate)) {
      if (this.startAsDate) {
        this.setEndDate(new Date(this.startAsDate));
      }
      if (this.activeRange == "end") {
        this.setEndDate(date);
      } else {
        this.setStartDate(date);
      }
    } else if (!this.endAsDate) {
      this.setEndDate(date);
    } else {
      if (!this.proximitySelectionDisabled) {
        if (this.activeRange) {
          if (this.activeRange == "end") {
            this.setEndDate(date);
          } else {
            this.setStartDate(date);
          }
        } else {
          const startDiff = getDaysDiff(date, this.startAsDate);
          const endDiff = getDaysDiff(date, this.endAsDate);
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
        this.endAsDate = this.activeEndDate = undefined;
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
      dateFromRange(this.activeEndDate, min, max) || value || dateFromRange(new Date(), min, max)
    );
  }
}
