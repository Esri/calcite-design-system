import {
  Component,
  h,
  Prop,
  Element,
  Host,
  State,
  Listen,
  Watch,
  VNode,
  Method,
  Event,
  EventEmitter,
  Build
} from "@stencil/core";
import { getLocaleData, DateLocaleData } from "../date-picker/utils";
import {
  dateFromRange,
  inRange,
  dateFromISO,
  dateToISO,
  parseDateString,
  sameDate
} from "../../utils/date";
import { HeadingLevel } from "../functional/Heading";

import { TEXT } from "../date-picker/resources";
import { CSS } from "./resources";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  submitForm
} from "../../utils/form";
import {
  positionFloatingUI,
  FloatingCSS,
  OverlayPositioning,
  FloatingUIComponent,
  connectFloatingUI,
  disconnectFloatingUI,
  EffectivePlacement,
  MenuPlacement,
  defaultMenuPlacement,
  filterComputedPlacements
} from "../../utils/floating-ui";
import { DateRangeChange } from "../date-picker/interfaces";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { toAriaBoolean } from "../../utils/dom";
import {
  OpenCloseComponent,
  connectOpenCloseComponent,
  disconnectOpenCloseComponent
} from "../../utils/openCloseComponent";

@Component({
  tag: "calcite-input-date-picker",
  styleUrl: "input-date-picker.scss",
  shadow: true
})
export class InputDatePicker
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    OpenCloseComponent,
    FloatingUIComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteInputDatePickerElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /**
   * When false, the component won't be interactive.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, still focusable but controls are gone and the value cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @Prop() readOnly = false;

  @Watch("disabled")
  @Watch("readOnly")
  handleDisabledAndReadOnlyChange(value: boolean): void {
    if (!value) {
      this.open = false;
    }
  }

  /** Selected date */
  @Prop({ mutable: true }) value: string | string[];

  @Watch("value")
  valueHandler(value: string | string[]): void {
    if (Array.isArray(value)) {
      this.valueAsDate = value.map((v) => dateFromISO(v));
      this.start = value[0];
      this.end = value[1];
    } else if (value) {
      this.valueAsDate = dateFromISO(value);
      this.start = "";
      this.end = "";
    } else {
      this.valueAsDate = undefined;
      this.start = undefined;
      this.end = undefined;
    }
  }

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements?: EffectivePlacement[];

  @Watch("flipPlacements")
  flipPlacementsHandler(): void {
    this.setFilteredPlacements();
  }

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

  /** Selected date as full date object*/
  @Prop({ mutable: true }) valueAsDate?: Date | Date[];

  /**
   * Selected start date as full date object
   *
   * @deprecated use valueAsDate instead
   */
  @Prop({ mutable: true }) startAsDate?: Date;

  /**
   * Selected end date as full date object
   *
   * @deprecated use valueAsDate instead
   */
  @Prop({ mutable: true }) endAsDate?: Date;

  /** Earliest allowed date as full date object */
  @Prop({ mutable: true }) minAsDate?: Date;

  /** Latest allowed date as full date object */
  @Prop({ mutable: true }) maxAsDate?: Date;

  /** Earliest allowed date ("yyyy-mm-dd") */
  @Prop({ mutable: true }) min?: string;

  @Watch("min")
  onMinChanged(min: string): void {
    if (min) {
      this.minAsDate = dateFromISO(min);
    }
  }

  /** Latest allowed date ("yyyy-mm-dd") */
  @Prop({ mutable: true }) max?: string;

  @Watch("max")
  onMaxChanged(max: string): void {
    if (max) {
      this.maxAsDate = dateFromISO(max);
    }
  }

  /**
   * Expand or collapse when calendar does not have input
   *
   * @deprecated use open instead
   */
  @Prop({ mutable: true, reflect: true }) active = false;

  @Watch("active")
  activeHandler(value: boolean): void {
    this.open = value;
  }

  /** Expand or collapse when calendar does not have input */
  @Prop({ mutable: true, reflect: true }) open = false;

  @Watch("open")
  openHandler(value: boolean): void {
    this.active = value;

    if (this.disabled || this.readOnly) {
      this.open = false;
      return;
    }

    this.reposition();
  }

  /**
   * The picker's name. Gets submitted with the form.
   */
  @Prop() name: string;

  /**
   * Localized string for "previous month" (used for aria label)
   *
   * @default "Previous month"
   */
  @Prop() intlPrevMonth?: string = TEXT.prevMonth;

  /**
   * Localized string for "next month" (used for aria label)
   *
   * @default "Next month"
   */
  @Prop() intlNextMonth?: string = TEXT.nextMonth;

  /**
   * Localized string for "year" (used for aria label)
   *
   * @default "Year"
   */
  @Prop() intlYear?: string = TEXT.year;

  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = document.documentElement.lang || "en";

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /**
   * Determines where the date-picker component will be positioned relative to the input.
   *
   * @default "bottom-start"
   */
  @Prop({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  /** Range mode activation */
  @Prop({ reflect: true }) range = false;

  /**
   * When true, makes the component required for form-submission.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /**
   * Selected start date
   *
   * @deprecated use value instead
   */
  @Prop({ mutable: true }) start?: string;

  /**
   * Selected end date
   *
   * @deprecated use value instead
   */
  @Prop({ mutable: true }) end?: string;

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  @Watch("overlayPositioning")
  overlayPositioningHandler(): void {
    this.reposition();
  }

  /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
  @Prop() proximitySelectionDisabled = false;

  /** Layout */
  @Prop({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteDatePickerChange")
  @Listen("calciteDatePickerRangeChange")
  handleDateOrRangeChange(): void {
    this.calciteInputDatePickerChange.emit();
  }

  @Listen("calciteDaySelect")
  calciteDaySelectHandler(): void {
    if (this.shouldFocusRangeStart() || this.shouldFocusRangeEnd()) {
      return;
    }

    this.open = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   * Trigger calcite date change when a user changes the date.
   *
   * @deprecated use `calciteInputDatePickerChange` instead.
   */
  @Event({ cancelable: false }) calciteDatePickerChange: EventEmitter<Date>;

  /**
   * Trigger calcite date change when a user changes the date range.
   *
   * @see [DateRangeChange](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-date-picker/interfaces.ts#L1)
   * @deprecated use `calciteInputDatePickerChange` instead.
   */
  @Event({ cancelable: false }) calciteDatePickerRangeChange: EventEmitter<DateRangeChange>;

  /**
   * This event fires when the input date picker value changes.
   */
  @Event({ cancelable: false }) calciteInputDatePickerChange: EventEmitter<void>;

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteInputDatePickerBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteInputDatePickerClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteInputDatePickerBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteInputDatePickerOpen: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Updates the position of the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.startInput?.setFocus();
  }

  /** Updates the position of the component. */
  @Method()
  async reposition(): Promise<void> {
    const { floatingEl, referenceEl, placement, overlayPositioning } = this;

    return positionFloatingUI({
      floatingEl,
      referenceEl,
      overlayPositioning,
      placement,
      type: "menu"
    });
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    const isOpen = this.active || this.open;
    isOpen && this.activeHandler(isOpen);
    isOpen && this.openHandler(isOpen);

    if (Array.isArray(this.value)) {
      this.valueAsDate = this.value.map((v) => dateFromISO(v));
      this.start = this.value[0];
      this.end = this.value[1];
    } else if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
      this.start = "";
      this.end = "";
    }

    if (this.start) {
      this.startAsDate = dateFromISO(this.start);
    }

    if (this.end) {
      this.endAsDate = dateFromISO(this.end);
    }

    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }

    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }

    connectLabel(this);
    connectForm(this);
    connectOpenCloseComponent(this);
    this.reposition();
    this.setFilteredPlacements();
  }

  async componentWillLoad(): Promise<void> {
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }

  componentDidLoad(): void {
    this.reposition();
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
    disconnectOpenCloseComponent(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    const { disabled, readOnly } = this;
    const date = dateFromRange(
      this.range ? this.startAsDate : this.valueAsDate,
      this.minAsDate,
      this.maxAsDate
    );
    const endDate = this.range
      ? dateFromRange(this.endAsDate, this.minAsDate, this.maxAsDate)
      : null;
    const formattedEndDate = endDate ? endDate.toLocaleDateString(this.locale) : "";
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";

    return (
      <Host onBlur={this.deactivate} onKeyDown={this.keyDownHandler} role="application">
        {this.localeData && (
          <div aria-expanded={toAriaBoolean(this.open)} class="input-container" role="application">
            {
              <div class="input-wrapper" ref={this.setStartWrapper}>
                <calcite-input
                  class={`input ${
                    this.layout === "vertical" && this.range ? `no-bottom-border` : ``
                  }`}
                  disabled={disabled}
                  icon="calendar"
                  label={getLabelText(this)}
                  number-button-type="none"
                  onCalciteInputInput={this.inputInput}
                  onCalciteInternalInputBlur={this.inputBlur}
                  onCalciteInternalInputFocus={this.startInputFocus}
                  placeholder={this.localeData?.placeholder}
                  readOnly={readOnly}
                  ref={this.setStartInput}
                  scale={this.scale}
                  type="text"
                  value={formattedDate}
                />
              </div>
            }
            <div
              aria-hidden={toAriaBoolean(!this.open)}
              class={{
                [CSS.menu]: true,
                [CSS.menuActive]: this.open
              }}
              ref={this.setFloatingEl}
            >
              <div
                class={{
                  ["calendar-picker-wrapper"]: true,
                  ["calendar-picker-wrapper--end"]: this.focusedInput === "end",
                  [FloatingCSS.animation]: true,
                  [FloatingCSS.animationActive]: this.open
                }}
                ref={this.setTransitionEl}
              >
                <calcite-date-picker
                  activeRange={this.focusedInput}
                  endAsDate={this.endAsDate}
                  headingLevel={this.headingLevel}
                  intlNextMonth={this.intlNextMonth}
                  intlPrevMonth={this.intlPrevMonth}
                  intlYear={this.intlYear}
                  locale={this.locale}
                  max={this.max}
                  maxAsDate={this.maxAsDate}
                  min={this.min}
                  minAsDate={this.minAsDate}
                  onCalciteDatePickerChange={this.handleDateChange}
                  onCalciteDatePickerRangeChange={this.handleDateRangeChange}
                  proximitySelectionDisabled={this.proximitySelectionDisabled}
                  range={this.range}
                  scale={this.scale}
                  startAsDate={this.startAsDate}
                  tabIndex={0}
                  valueAsDate={this.valueAsDate}
                />
              </div>
            </div>

            {this.range && this.layout === "horizontal" && (
              <div class="horizontal-arrow-container">
                <calcite-icon flipRtl={true} icon="arrow-right" scale="s" />
              </div>
            )}
            {this.range && this.layout === "vertical" && this.scale !== "s" && (
              <div class="vertical-arrow-container">
                <calcite-icon icon="arrow-down" scale="s" />
              </div>
            )}
            {this.range && (
              <div class="input-wrapper" ref={this.setEndWrapper}>
                <calcite-input
                  class={{
                    input: true,
                    "border-top-color-one": this.layout === "vertical" && this.range
                  }}
                  disabled={disabled}
                  icon="calendar"
                  number-button-type="none"
                  onCalciteInputInput={this.inputInput}
                  onCalciteInternalInputBlur={this.inputBlur}
                  onCalciteInternalInputFocus={this.endInputFocus}
                  placeholder={this.localeData?.placeholder}
                  readOnly={readOnly}
                  ref={this.setEndInput}
                  scale={this.scale}
                  type="text"
                  value={formattedEndDate}
                />
              </div>
            )}
          </div>
        )}
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  filteredFlipPlacements: EffectivePlacement[];

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: InputDatePicker["value"];

  @State() focusedInput: "start" | "end" = "start";

  @State() private localeData: DateLocaleData;

  private startInput: HTMLCalciteInputElement;

  private endInput: HTMLCalciteInputElement;

  private floatingEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private startWrapper: HTMLDivElement;

  private endWrapper: HTMLDivElement;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  @Watch("layout")
  @Watch("focusedInput")
  setReferenceEl(): void {
    const { focusedInput, layout, endWrapper, startWrapper } = this;

    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;

    connectFloatingUI(this, this.referenceEl, this.floatingEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  setFilteredPlacements = (): void => {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterComputedPlacements(flipPlacements, el)
      : null;
  };

  private setTransitionEl = (el): void => {
    this.transitionEl = el;
    connectOpenCloseComponent(this);
  };

  onLabelClick(): void {
    this.setFocus();
  }

  onBeforeOpen(): void {
    this.calciteInputDatePickerBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteInputDatePickerOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteInputDatePickerBeforeClose.emit();
  }

  onClose(): void {
    this.calciteInputDatePickerClose.emit();
  }

  setStartInput = (el: HTMLCalciteInputElement): void => {
    this.startInput = el;
  };

  setEndInput = (el: HTMLCalciteInputElement): void => {
    this.endInput = el;
  };

  deactivate = (): void => {
    this.open = false;
  };

  keyDownHandler = ({ defaultPrevented, key }: KeyboardEvent): void => {
    if (key === "Enter" && !defaultPrevented) {
      submitForm(this);
    } else if (key === "Escape") {
      this.active = false;
      this.open = false;
    }
  };

  inputBlur = (event: CustomEvent<any>): void => {
    this.blur(event.currentTarget as HTMLCalciteInputElement);
  };

  startInputFocus = (): void => {
    if (!this.readOnly) {
      this.open = true;
    }
    this.focusedInput = "start";
  };

  endInputFocus = (): void => {
    if (!this.readOnly) {
      this.open = true;
    }
    this.focusedInput = "end";
  };

  inputInput = (event: CustomEvent<any>): void => {
    this.input(event.detail.value);
  };

  setFloatingEl = (el: HTMLDivElement): void => {
    if (el) {
      this.floatingEl = el;
      connectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
  };

  setStartWrapper = (el: HTMLDivElement): void => {
    this.startWrapper = el;
    this.setReferenceEl();
  };

  setEndWrapper = (el: HTMLDivElement): void => {
    this.endWrapper = el;
    this.setReferenceEl();
  };

  @Watch("start")
  startWatcher(start: string): void {
    this.startAsDate = dateFromISO(start);
  }

  @Watch("end")
  endWatcher(end: string): void {
    this.endAsDate = dateFromISO(end);
  }

  @Watch("locale")
  private async loadLocaleData(): Promise<void> {
    if (!Build.isBrowser) {
      return;
    }

    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }

  private clearCurrentValue(): void {
    if (!this.range) {
      if (typeof this.value === "string" && this.value) {
        this.calciteDatePickerChange.emit();
      }
      this.value = "";
      return;
    }

    const { focusedInput } = this;

    if (focusedInput === "start") {
      if (this.start) {
        this.calciteDatePickerRangeChange.emit();
      }
      this.value = Array.isArray(this.value) ? ["", this.value[1] || ""] : [""];
      this.start = undefined;
    } else if (focusedInput === "end") {
      if (this.end) {
        this.calciteDatePickerRangeChange.emit();
      }
      this.value = Array.isArray(this.value) ? [this.value[0] || "", ""] : ["", ""];
      this.end = undefined;
    }
  }

  /**
   * If inputted string is a valid date, update value/active
   *
   * @param value
   */
  private input(value: string): void {
    const date = this.getDateFromInput(value);

    if (!date) {
      this.clearCurrentValue();
      return;
    }

    if (!this.range) {
      this.value = dateToISO(date);
      this.calciteDatePickerChange.emit(date);
      return;
    }

    const { focusedInput } = this;

    if (focusedInput === "start") {
      if (!this.startAsDate || !sameDate(date, this.startAsDate)) {
        const startDateISO = dateToISO(date);
        this.value = Array.isArray(this.value)
          ? [startDateISO, this.value[1] || ""]
          : [startDateISO];
        this.start = startDateISO;
        this.calciteDatePickerRangeChange.emit({
          startDate: date,
          endDate: this.endAsDate
        });
      }
    } else if (focusedInput === "end") {
      if (!this.endAsDate || !sameDate(date, this.endAsDate)) {
        const endDateISO = dateToISO(date);
        this.value = Array.isArray(this.value)
          ? [this.value[0] || "", endDateISO]
          : ["", endDateISO];
        this.end = endDateISO;
        this.calciteDatePickerRangeChange.emit({
          startDate: this.startAsDate,
          endDate: date
        });
      }
    }
  }

  /**
   * Clean up invalid date from input on blur
   *
   * @param target
   */
  private blur(target: HTMLCalciteInputElement): void {
    const { locale, focusedInput, endAsDate, range, startAsDate, valueAsDate } = this;
    const date = this.getDateFromInput(target.value);
    if (!date) {
      if (!range && valueAsDate) {
        target.value = Array.isArray(valueAsDate)
          ? valueAsDate[focusedInput === "end" ? 1 : 0].toLocaleDateString(locale)
          : valueAsDate.toLocaleDateString(locale);
      } else if (focusedInput === "start" && startAsDate) {
        target.value = startAsDate.toLocaleDateString(locale);
      } else if (focusedInput === "end" && endAsDate) {
        target.value = endAsDate.toLocaleDateString(locale);
      }
    }
  }

  /**
   * Event handler for when the selected date changes
   *
   * @param event
   */
  handleDateChange = (event: CustomEvent<Date>): void => {
    if (this.range) {
      return;
    }

    this.value = dateToISO(event.detail);
  };

  private shouldFocusRangeStart(): boolean {
    return !!(
      this.endAsDate &&
      !this.startAsDate &&
      this.focusedInput === "end" &&
      this.startInput
    );
  }

  private shouldFocusRangeEnd(): boolean {
    return !!(
      this.startAsDate &&
      !this.endAsDate &&
      this.focusedInput === "start" &&
      this.endInput
    );
  }

  private handleDateRangeChange = (event: CustomEvent<DateRangeChange>): void => {
    if (!this.range || !event.detail) {
      return;
    }

    const { startDate, endDate } = event.detail;

    this.start = dateToISO(startDate);
    this.end = dateToISO(endDate);
    this.value = [this.start, this.end];

    if (this.shouldFocusRangeEnd()) {
      this.endInput?.setFocus();
    } else if (this.shouldFocusRangeStart()) {
      this.startInput?.setFocus();
    }
  };

  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
   *
   * @param value
   */
  private getDateFromInput(value: string): Date | false {
    if (!this.localeData) {
      return false;
    }
    const { separator } = this.localeData;
    const { day, month, year } = parseDateString(value, this.localeData);
    const validDay = day > 0;
    const validMonth = month > -1;
    const date = new Date(year, month, day);
    date.setFullYear(year);
    const validDate = !isNaN(date.getTime());
    const validLength = value.split(separator).filter((c) => c).length > 2;
    const validYear = year.toString().length > 0;
    if (
      validDay &&
      validMonth &&
      validDate &&
      validLength &&
      validYear &&
      inRange(date, this.min, this.max)
    ) {
      return date;
    }
    return false;
  }
}
