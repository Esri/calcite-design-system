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
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  submitForm
} from "../../utils/form";
import {
  createPopper,
  updatePopper,
  CSS as PopperCSS,
  OverlayPositioning,
  popperMenuComputedPlacements,
  ComputedPlacement,
  defaultMenuPlacement,
  MenuPlacement,
  filterComputedPlacements
} from "../../utils/popper";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";
import { DateRangeChange } from "../date-picker/interfaces";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { toAriaBoolean } from "../../utils/dom";

@Component({
  tag: "calcite-input-date-picker",
  styleUrl: "input-date-picker.scss",
  shadow: true
})
export class InputDatePicker implements LabelableComponent, FormComponent, InteractiveComponent {
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

  @Watch("disabled")
  handleDisabledChange(value: boolean): void {
    if (!value) {
      this.active = false;
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
  @Prop() flipPlacements?: ComputedPlacement[];

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

  /** Expand or collapse when calendar does not have input */
  @Prop({ mutable: true, reflect: true }) active = false;

  @Watch("active")
  activeHandler(): void {
    if (!this.disabled) {
      this.reposition();
      return;
    }

    this.active = false;
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
   * @default "bottom-leading"
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

    this.active = false;
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
  @Event() calciteDatePickerChange: EventEmitter<Date>;

  /**
   * Trigger calcite date change when a user changes the date range.
   *
   * @see [DateRangeChange](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-date-picker/interfaces.ts#L1)
   * @deprecated use `calciteInputDatePickerChange` instead.
   */
  @Event() calciteDatePickerRangeChange: EventEmitter<DateRangeChange>;

  /**
   * This event fires when the input date picker value changes.
   */
  @Event() calciteInputDatePickerChange: EventEmitter<void>;

  /**
   * @internal
   */
  @Event() calciteInternalInputDatePickerOpen: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteInternalInputDatePickerClose: EventEmitter;

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
    const { placement, popper, menuEl } = this;
    const modifiers = this.getModifiers();

    popper
      ? await updatePopper({
          el: menuEl,
          modifiers,
          placement,
          popper
        })
      : this.createPopper();
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
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

    this.createPopper();
    connectLabel(this);
    connectForm(this);
    this.setFilteredPlacements();
  }

  async componentWillLoad(): Promise<void> {
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }

  disconnectedCallback(): void {
    this.destroyPopper();
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    const { disabled } = this;
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
      <Host
        onBlur={this.deactivate}
        onKeyDown={this.keyDownHandler}
        onKeyUp={this.keyUpHandler}
        role="application"
      >
        {this.localeData && (
          <div
            aria-expanded={toAriaBoolean(this.active)}
            class="input-container"
            role="application"
          >
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
                  ref={this.setStartInput}
                  scale={this.scale}
                  type="text"
                  value={formattedDate}
                />
              </div>
            }
            <div
              aria-hidden={toAriaBoolean(!this.active)}
              class={{
                "menu-container": true,
                "menu-container--active": this.active
              }}
              ref={this.setMenuEl}
            >
              <div
                class={{
                  ["calendar-picker-wrapper"]: true,
                  ["calendar-picker-wrapper--end"]: this.focusedInput === "end",
                  [PopperCSS.animation]: true,
                  [PopperCSS.animationActive]: this.active
                }}
                onTransitionEnd={this.transitionEnd}
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

  filteredFlipPlacements: ComputedPlacement[];

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: InputDatePicker["value"];

  @State() focusedInput: "start" | "end" = "start";

  @State() private localeData: DateLocaleData;

  private startInput: HTMLCalciteInputElement;

  private endInput: HTMLCalciteInputElement;

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private startWrapper: HTMLDivElement;

  private endWrapper: HTMLDivElement;

  private activeTransitionProp = "opacity";

  @Watch("layout")
  @Watch("focusedInput")
  setReferenceEl(): void {
    const { focusedInput, layout, endWrapper, startWrapper } = this;

    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;

    this.createPopper();
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

  onLabelClick(): void {
    this.setFocus();
  }

  transitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp) {
      this.active
        ? this.calciteInternalInputDatePickerOpen.emit()
        : this.calciteInternalInputDatePickerClose.emit();
    }
  };

  setStartInput = (el: HTMLCalciteInputElement): void => {
    this.startInput = el;
  };

  setEndInput = (el: HTMLCalciteInputElement): void => {
    this.endInput = el;
  };

  deactivate = (): void => {
    this.active = false;
  };

  keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && !event.defaultPrevented) {
      submitForm(this);
    }
  };

  keyUpHandler = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      this.active = false;
    }
  };

  inputBlur = (e: CustomEvent<any>): void => {
    this.blur(e.detail);
  };

  startInputFocus = (): void => {
    this.active = true;
    this.focusedInput = "start";
  };

  endInputFocus = (): void => {
    this.active = true;
    this.focusedInput = "end";
  };

  inputInput = (e: CustomEvent<any>): void => {
    this.input(e.detail.value);
  };

  setMenuEl = (el: HTMLDivElement): void => {
    if (el) {
      this.menuEl = el;
      this.createPopper();
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

  getModifiers(): Partial<StrictModifiers>[] {
    const flipModifier: Partial<StrictModifiers> = {
      name: "flip",
      enabled: true
    };

    flipModifier.options = {
      fallbackPlacements: this.filteredFlipPlacements || popperMenuComputedPlacements
    };

    const eventListenerModifier: Partial<StrictModifiers> = {
      name: "eventListeners",
      enabled: this.active
    };

    return [flipModifier, eventListenerModifier];
  }

  createPopper(): void {
    this.destroyPopper();
    const { menuEl, placement, referenceEl, overlayPositioning } = this;

    if (!menuEl || !referenceEl) {
      return;
    }

    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement,
      referenceEl
    });
  }

  destroyPopper(): void {
    const { popper } = this;

    if (popper) {
      popper.destroy();
    }

    this.popper = null;
  }

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
