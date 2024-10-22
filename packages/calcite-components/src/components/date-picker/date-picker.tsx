import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  Fragment,
  h,
  method,
  state,
  JsxNode,
} from "@arcgis/lumina";
import {
  dateFromISO,
  dateFromRange,
  dateToISO,
  getDaysDiff,
  HoverRange,
  setEndOfDay,
} from "../../utils/date";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { getDateTimeFormat, NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { HeadingLevel } from "../functional/Heading";
import { isBrowser } from "../../utils/browser";
import { useT9n } from "../../controllers/useT9n";
import T9nStrings from "./assets/t9n/date-picker.t9n.en.json";
import { DATE_PICKER_FORMAT_OPTIONS, HEADING_LEVEL } from "./resources";
import { DateLocaleData, getLocaleData, getValueAsDateRange } from "./utils";
import { styles } from "./date-picker.scss";

declare global {
  interface DeclareElements {
    "calcite-date-picker": DatePicker;
  }
}

export class DatePicker extends LitElement implements LoadableComponent {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region State Properties

  /** Active end date. */
  @state() activeEndDate: Date;

  /** Active start date. */
  @state() activeStartDate: Date;

  /**
   * The DateTimeFormat used to provide screen reader labels.
   *
   * @notPublic
   */
  @state() dateTimeFormat: Intl.DateTimeFormat;

  @state() endAsDate: Date;

  @state() private hoverRange: HoverRange;

  @state() private localeData: DateLocaleData;

  @state() private mostRecentRangeValue?: Date;

  @state() startAsDate: Date;

  // #endregion

  // #region Public Properties

  /** Specifies the component's active date. */
  @property() activeDate: Date;

  /** When `range` is true, specifies the active `range`. Where `"start"` specifies the starting range date and `"end"` the ending range date. */
  @property({ reflect: true }) activeRange: "start" | "end";

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @property({ reflect: true }) max: string;

  /** Specifies the latest allowed date as a full date object (`new Date("yyyy-mm-dd")`). */
  @property() maxAsDate: Date;

  /** Use this property to override individual strings used by the component. */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @notPublic
   */
  /** TODO: [MIGRATION] This component has been updated to use the useT9n() controller. Documentation: https://qawebgis.esri.com/arcgis-components/?path=/docs/references-t9n-for-components--docs */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @property() messages = useT9n<typeof T9nStrings>({ blocking: true });

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @property({ reflect: true }) min: string;

  /** Specifies the earliest allowed date as a full date object (`new Date("yyyy-mm-dd")`). */
  @property() minAsDate: Date;

  /** Specifies the Unicode numeral system used by the component for localization. This property cannot be dynamically changed. */
  @property({ reflect: true }) numberingSystem: NumberingSystem;

  /** When `true`, disables the default behavior on the third click of narrowing or extending the range and instead starts a new range. */
  @property({ reflect: true }) proximitySelectionDisabled = false;

  /** When `true`, activates the component's range mode to allow a start and end date. */
  @property({ reflect: true }) range = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Specifies the selected date as a string (`"yyyy-mm-dd"`), or an array of strings for `range` values (`["yyyy-mm-dd", "yyyy-mm-dd"]`). */
  @property() value: string | string[];

  /** Specifies the selected date as a full date object (`new Date("yyyy-mm-dd")`), or an array containing full date objects (`[new Date("yyyy-mm-dd"), new Date("yyyy-mm-dd")]`). */
  @property() valueAsDate: Date | Date[];

  // #endregion

  // #region Public Methods

  /**
   * Resets active date state.
   *
   * @notPublic
   */
  @method()
  async reset(): Promise<void> {
    this.resetActiveDates();
    this.mostRecentRangeValue = undefined;
  }

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.el.focus();
  }

  // #endregion

  // #region Events

  /** Fires when a user changes the component's date. For `range` events, use `calciteDatePickerRangeChange`. */
  calciteDatePickerChange = createEvent({ cancelable: false });

  /** Fires when a user changes the component's date `range`. For components without `range` use `calciteDatePickerChange`. */
  calciteDatePickerRangeChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("blur", this.resetActiveDates);
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
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

  async load(): Promise<void> {
    setUpLoadableComponent(this);
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }

  /**
   * TODO: [MIGRATION] Consider inlining some of the watch functions called inside of this method to reduce boilerplate code
   *
   * @param changes
   */
  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("activeDate")) {
      this.activeDateWatcher(this.activeDate);
    }

    if (changes.has("valueAsDate")) {
      this.valueAsDateWatcher(this.valueAsDate);
    }

    if (changes.has("min")) {
      this.onMinChanged(this.min);
    }

    if (changes.has("max")) {
      this.onMaxChanged(this.max);
    }

    if (changes.has("value")) {
      this.valueHandler(this.value);
    }
    if (changes.has("messages") && this.hasUpdated) {
      this.loadLocaleData().catch(console.error);
    }
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  // #endregion

  // #region Private Methods

  private activeDateWatcher(newActiveDate: Date): void {
    if (this.activeRange === "end") {
      this.activeEndDate = newActiveDate;
    }
  }

  private valueAsDateWatcher(newValueAsDate: Date | Date[]): void {
    if (this.range && Array.isArray(newValueAsDate)) {
      const { activeStartDate, activeEndDate } = this;
      const newActiveStartDate = newValueAsDate[0];
      const newActiveEndDate = newValueAsDate[1];
      this.activeStartDate = activeStartDate !== newActiveStartDate && newActiveStartDate;
      this.activeEndDate = activeEndDate !== newActiveEndDate && newActiveEndDate;
    } else if (newValueAsDate && newValueAsDate !== this.activeDate) {
      this.activeDate = newValueAsDate as Date;
    }
  }

  private onMinChanged(min: string): void {
    this.minAsDate = dateFromISO(min);
  }

  private onMaxChanged(max: string): void {
    this.maxAsDate = dateFromISO(max);
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.resetActiveDates();
    }
  }

  private valueHandler(value: string | string[]): void {
    if (Array.isArray(value)) {
      this.valueAsDate = getValueAsDateRange(value);
    } else if (value) {
      this.valueAsDate = dateFromISO(value);
    }
  }

  private async loadLocaleData(): Promise<void> {
    if (!isBrowser()) {
      return;
    }

    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.messages._lang,
      useGrouping: false,
    };

    this.localeData = await getLocaleData(this.messages._lang);
    this.dateTimeFormat = getDateTimeFormat(this.messages._lang, DATE_PICKER_FORMAT_OPTIONS);
  }

  private monthHeaderSelectChange(event: CustomEvent<Date>): void {
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
  }

  private monthActiveDateChange(event: CustomEvent<Date>): void {
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
  }

  private monthHoverChange(event: CustomEvent<Date>): void {
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
      if (start && end) {
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
    }
    event.stopPropagation();
  }

  private monthMouseOutChange(): void {
    if (this.hoverRange) {
      this.hoverRange = undefined;
    }
  }

  private resetActiveDates(): void {
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
  }

  private getEndDate(): Date {
    return (Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined;
  }

  private setEndDate(date: Date): void {
    const startDate = this.getStartDate();
    const newEndDate = date ? setEndOfDay(date) : date;
    this.value = [dateToISO(startDate), dateToISO(date)];
    this.valueAsDate = [startDate, date];
    this.mostRecentRangeValue = newEndDate;
    this.calciteDatePickerRangeChange.emit();
    this.activeEndDate = date || null;
  }

  private getStartDate(): Date {
    return Array.isArray(this.valueAsDate) && this.valueAsDate[0];
  }

  private setStartDate(date: Date): void {
    const endDate = this.getEndDate();
    this.value = [dateToISO(date), dateToISO(endDate)];
    this.valueAsDate = [date, endDate];
    this.mostRecentRangeValue = date;
    this.calciteDatePickerRangeChange.emit();
    this.activeStartDate = date || null;
  }

  /**
   * Event handler for when the selected date changes
   *
   * @param event
   */
  private monthDateChange(event: CustomEvent<Date>): void {
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
    this.calciteDatePickerChange.emit();
  }

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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const date = dateFromRange(
      this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate,
      this.minAsDate,
      this.maxAsDate,
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
    return <>{this.renderCalendar(activeDate, maxDate, minDate, date, endDate)}</>;
  }

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
    endDate: Date,
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
          oncalciteInternalDatePickerSelect={this.monthHeaderSelectChange}
          scale={this.scale}
          selectedDate={this.activeRange === "end" ? endDate : date || new Date()}
        />,
        <calcite-date-picker-month
          activeDate={activeDate}
          dateTimeFormat={this.dateTimeFormat}
          endDate={this.range ? endDate : undefined}
          hoverRange={this.hoverRange}
          localeData={this.localeData}
          max={maxDate}
          min={minDate}
          oncalciteInternalDatePickerActiveDateChange={this.monthActiveDateChange}
          oncalciteInternalDatePickerHover={this.monthHoverChange}
          oncalciteInternalDatePickerMouseOut={this.monthMouseOutChange}
          oncalciteInternalDatePickerSelect={this.monthDateChange}
          scale={this.scale}
          selectedDate={this.activeRange === "end" ? endDate : date}
          startDate={this.range ? date : undefined}
        />,
      ]
    );
  }

  // #endregion
}
