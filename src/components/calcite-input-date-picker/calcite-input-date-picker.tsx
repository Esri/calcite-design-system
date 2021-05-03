import {
  Component,
  h,
  Prop,
  Element,
  Host,
  State,
  Listen,
  Build,
  Watch,
  VNode,
  Method,
  Event,
  EventEmitter
} from "@stencil/core";
import { getLocaleData, DateLocaleData } from "../calcite-date-picker/utils";
import { getElementDir } from "../../utils/dom";
import { dateFromRange, inRange, dateFromISO, parseDateString, sameDate } from "../../utils/date";
import { HeadingLevel } from "../functional/CalciteHeading";
import { getKey } from "../../utils/key";
import { TEXT } from "../calcite-date-picker/calcite-date-picker-resources";

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
export class CalciteInputDatePicker {
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
  @Prop() value?: string;

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
  @Prop() end?: string;

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
  @Prop() proximitySelectionDisabled?: boolean = false;

  /** Layout */
  @Prop({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  /**
   * Blur doesn't fire properly when there is no shadow dom (Edge/IE11)
   * Check if the focused element is inside the date picker, if not close
   */
  @Listen("focusin", { target: "window" })
  focusInHandler(e: FocusEvent): void {
    if (!this.hasShadow && !this.el.contains(e.target as HTMLElement)) {
      this.active = false;
    }
  }

  @Listen("calciteDaySelect")
  calciteDaySelectHandler(): void {
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
   */
  @Event() calciteDatePickerRangeChange: EventEmitter<DateRangeChange>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

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

    this.createPopper();
  }

  disconnectedCallback(): void {
    this.destroyPopper();
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
                  number-button-type="none"
                  onCalciteInputBlur={this.inputBlur}
                  onCalciteInputFocus={this.startInputFocus}
                  onCalciteInputInput={this.inputInput}
                  placeholder={this.localeData?.placeholder}
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
            {this.range && this.layout === "vertical" && (
              <div class="vertical-arrow-container">
                <calcite-icon icon="arrow-down" scale="s" />
              </div>
            )}
            {this.range && (
              <div class="input-wrapper" ref={this.setEndWrapper}>
                <calcite-input
                  class="input"
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

  @State() focusedInput: "start" | "end" = "start";

  @State() private localeData: DateLocaleData;

  private endInput: HTMLCalciteInputElement;

  private hasShadow: boolean = Build.isBrowser && !!document.head.attachShadow;

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private startWrapper: HTMLDivElement;

  private endWrapper: HTMLDivElement;

  private endInputFocusTimeout: number;

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

  /**
   * Update date instance of start if valid
   */
  private setStartAsDate(startDate: Date): void {
    this.startAsDate = startDate;
  }

  /**
   * Update date instance of end if valid
   */
  private setEndAsDate(endDate: Date): void {
    this.endAsDate = endDate;
  }

  /**
   * If inputted string is a valid date, update value/active
   */
  private input(value: string): void {
    const date = this.getDateFromInput(value);
    if (date) {
      if (!this.range) {
        this.valueAsDate = date;
      } else {
        let changed = false;
        if (this.focusedInput === "start") {
          changed = !this.startAsDate || !sameDate(date, this.startAsDate);
          if (changed) {
            this.startAsDate = date;
          }
        } else if (this.focusedInput === "end") {
          changed = !this.endAsDate || !sameDate(date, this.endAsDate);
          if (changed) {
            this.endAsDate = date;
          }
        }
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

    this.valueAsDate = event.detail;
  };

  private handleDateRangeChange = (event: CustomEvent<DateRangeChange>): void => {
    if (!this.range || !event.detail) {
      return;
    }

    const { startDate, endDate } = event.detail;

    this.startAsDate = startDate;
    this.endAsDate = endDate;

    clearTimeout(this.endInputFocusTimeout);

    if (startDate && this.focusedInput === "start") {
      this.endInputFocusTimeout = window.setTimeout(() => this.endInput?.setFocus(), 150);
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
