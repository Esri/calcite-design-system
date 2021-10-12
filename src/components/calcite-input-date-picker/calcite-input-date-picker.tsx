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
import { getLocaleData, DateLocaleData } from "../calcite-date-picker/utils";
import { getElementDir } from "../../utils/dom";
import {
  dateFromRange,
  inRange,
  dateFromISO,
  dateToISO,
  parseDateString,
  sameDate
} from "../../utils/date";
import { HeadingLevel } from "../functional/CalciteHeading";
import { getKey } from "../../utils/key";
import { TEXT } from "../calcite-date-picker/resources";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";

import {
  createPopper,
  updatePopper,
  CSS as PopperCSS,
  OverlayPositioning
} from "../../utils/popper";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";
import { DateRangeChange } from "../calcite-date-picker/interfaces";

const DEFAULT_PLACEMENT = "bottom-leading";

@Component({
  tag: "calcite-input-date-picker",
  styleUrl: "calcite-input-date-picker.scss",
  shadow: true
})
export class CalciteInputDatePicker implements LabelableComponent {
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
  /** Selected date */
  @Prop({ mutable: true }) value?: string;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

  /** Selected date as full date object*/
  @Prop({ mutable: true }) valueAsDate?: Date;

  /** Selected start date as full date object*/
  @Prop({ mutable: true }) startAsDate?: Date;

  /** Selected end date as full date object*/
  @Prop({ mutable: true }) endAsDate?: Date;

  /** Earliest allowed date as full date object */
  @Prop({ mutable: true }) minAsDate?: Date;

  /** Latest allowed date as full date object */
  @Prop({ mutable: true }) maxAsDate?: Date;

  /** Earliest allowed date ("yyyy-mm-dd") */
  @Prop() min?: string;

  /** Latest allowed date ("yyyy-mm-dd") */
  @Prop() max?: string;

  /** Expand or collapse when calendar does not have input */
  @Prop({ mutable: true, reflect: true }) active = false;

  @Watch("active")
  activeHandler(): void {
    this.reposition();
  }

  /** Localized string for "previous month" (used for aria label)
   * @default "Previous month"
   */
  @Prop() intlPrevMonth?: string = TEXT.prevMonth;

  /** Localized string for "next month" (used for aria label)
   * @default "Next month"
   */
  @Prop() intlNextMonth?: string = TEXT.nextMonth;

  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = document.documentElement.lang || "en";

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Range mode activation */
  @Prop({ reflect: true }) range = false;

  /** Selected start date */
  @Prop({ mutable: true }) start?: string;

  /** Selected end date */
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
   */
  @Event() calciteDatePickerChange: EventEmitter<Date>;

  /**
   * Trigger calcite date change when a user changes the date range.
   * @see [DateRangeChange](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-date-picker/interfaces.ts#L1)
   */
  @Event() calciteDatePickerRangeChange: EventEmitter<DateRangeChange>;

  /**
   * @internal
   */
  @Event() calciteInputDatePickerOpen: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteInputDatePickerClose: EventEmitter;

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
    const { popper, menuEl } = this;
    const modifiers = this.getModifiers();

    popper
      ? updatePopper({
          el: menuEl,
          modifiers,
          placement: DEFAULT_PLACEMENT,
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
    if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
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
  }

  async componentWillLoad(): Promise<void> {
    await this.loadLocaleData();
  }

  disconnectedCallback(): void {
    this.destroyPopper();
    disconnectLabel(this);
  }

  render(): VNode {
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
    const dir = getElementDir(this.el);

    return (
      <Host onBlur={this.deactivate} onKeyUp={this.keyUpHandler} role="application">
        {this.localeData && (
          <div
            aria-expanded={this.active.toString()}
            class="input-container"
            dir={dir}
            role="application"
          >
            {
              <div class="input-wrapper" ref={this.setStartWrapper}>
                <calcite-input
                  class={`input ${
                    this.layout === "vertical" && this.range ? `no-bottom-border` : ``
                  }`}
                  icon="calendar"
                  label={getLabelText(this)}
                  number-button-type="none"
                  onCalciteInputBlur={this.inputBlur}
                  onCalciteInputFocus={this.startInputFocus}
                  onCalciteInputInput={this.inputInput}
                  placeholder={this.localeData?.placeholder}
                  ref={this.setStartInput}
                  scale={this.scale}
                  type="text"
                  value={formattedDate}
                />
              </div>
            }

            <div
              aria-hidden={(!this.active).toString()}
              class="menu-container"
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
                    "border-t-color-1": this.layout === "vertical" && this.range
                  }}
                  icon="calendar"
                  number-button-type="none"
                  onCalciteInputBlur={this.inputBlur}
                  onCalciteInputFocus={this.endInputFocus}
                  onCalciteInputInput={this.inputInput}
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
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

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

  onLabelClick = (): void => {
    this.setFocus();
  };

  transitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp) {
      this.active
        ? this.calciteInputDatePickerOpen.emit()
        : this.calciteInputDatePickerClose.emit();
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

  keyUpHandler = (e: KeyboardEvent): void => {
    if (getKey(e.key) === "Escape") {
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
      fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    };

    return [flipModifier];
  }

  createPopper(): void {
    this.destroyPopper();
    const { menuEl, referenceEl, overlayPositioning } = this;

    if (!menuEl || !referenceEl) {
      return;
    }

    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement: DEFAULT_PLACEMENT,
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

  @Watch("value")
  valueWatcher(value: string): void {
    this.valueAsDate = dateFromISO(value);
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
      this.value = undefined;
      return;
    }

    const { focusedInput } = this;

    if (focusedInput === "start") {
      this.start = undefined;
    } else if (focusedInput === "end") {
      this.end = undefined;
    }
  }

  /**
   * If inputted string is a valid date, update value/active
   */
  private input(value: string): void {
    const date = this.getDateFromInput(value);

    if (!date) {
      this.clearCurrentValue();
      return;
    }

    if (!this.range) {
      this.value = dateToISO(date);
      return;
    }

    const { focusedInput } = this;

    if (focusedInput === "start") {
      if (!this.startAsDate || !sameDate(date, this.startAsDate)) {
        this.start = dateToISO(date);
        this.calciteDatePickerRangeChange.emit({
          startDate: date,
          endDate: this.endAsDate
        });
      }
    } else if (focusedInput === "end") {
      if (!this.endAsDate || !sameDate(date, this.endAsDate)) {
        this.end = dateToISO(date);
        this.calciteDatePickerRangeChange.emit({
          startDate: this.startAsDate,
          endDate: date
        });
      }
    }
  }

  /**
   * Clean up invalid date from input on blur
   */
  private blur(target: HTMLInputElement): void {
    const { locale, focusedInput, endAsDate, range, startAsDate, valueAsDate } = this;
    const date = this.getDateFromInput(target.value);
    if (!date) {
      if (!range && valueAsDate) {
        target.value = valueAsDate.toLocaleDateString(locale);
      } else if (focusedInput === "start" && startAsDate) {
        target.value = startAsDate.toLocaleDateString(locale);
      } else if (focusedInput === "end" && endAsDate) {
        target.value = endAsDate.toLocaleDateString(locale);
      }
    }
  }

  /**
   * Event handler for when the selected date changes
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

    if (this.shouldFocusRangeEnd()) {
      this.endInput?.setFocus();
    } else if (this.shouldFocusRangeStart()) {
      this.startInput?.setFocus();
    }
  };

  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
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
