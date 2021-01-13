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
  VNode,
  Method
} from "@stencil/core";
import { getLocaleData, DateLocaleData } from "./utils";
import { getElementDir } from "../../utils/dom";
import {
  dateFromRange,
  inRange,
  dateFromISO,
  dateToISO,
  parseDateString,
  sameDate,
  getDaysDiff
} from "../../utils/date";

import { getKey } from "../../utils/key";
import { TEXT } from "./calcite-date-resources";

import { DateRangeChange } from "./interfaces";

import { createPopper, updatePopper, CSS as PopperCSS } from "../../utils/popper";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";
import { Layout, Position, Scale } from "../interfaces";

const DEFAULT_PLACEMENT = "bottom-start";

@Component({
  tag: "calcite-date",
  styleUrl: "calcite-date.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class CalciteDate {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteDateElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** Selected date */
  @Prop() value?: string;

  /** Selected date as full date object*/
  @Prop({ mutable: true }) valueAsDate?: Date;

  /** Selected start date as full date object*/
  @Prop({ mutable: true }) startAsDate?: Date;

  /** Selected end date as full date object*/
  @Prop({ mutable: true }) endAsDate?: Date;

  /** Earliest allowed date ("yyyy-mm-dd") */
  @Prop() min?: string;

  /** Latest allowed date ("yyyy-mm-dd") */
  @Prop() max?: string;

  /** Expand or collapse when calendar does not have input */
  @Prop({ reflect: true }) active = false;

  @Watch("active")
  activeHandler(): void {
    this.reposition();
  }

  /** Localized string for "previous month" (used for aria label) */
  @Prop() intlPrevMonth?: string = TEXT.prevMonth;

  /** Localized string for "next month" (used for aria label) */
  @Prop() intlNextMonth?: string = TEXT.nextMonth;

  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = document.documentElement.lang || "en-US";

  /** Show only calendar popup */
  @Prop() noCalendarInput?: boolean = false;

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Range mode activation */
  @Prop({ reflect: true }) range?: boolean = false;

  /** Selected start date */
  @Prop() start?: string;

  /** Selected end date */
  @Prop() end?: string;

  @Prop() proximitySelection?: boolean = true;

  /** Layout */
  @Prop({ reflect: true }) layout: Layout = "horizontal";

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("blur")
  focusOutHandler(): void {
    this.reset();
  }

  /**
   * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
   * Check if the focused element is inside the date picker, if not close
   */
  @Listen("focusin", { target: "window" })
  focusInHandler(e: FocusEvent): void {
    if (!this.hasShadow && !this.el.contains(e.srcElement as HTMLElement)) {
      this.reset();
    }
  }

  @Listen("keyup")
  keyDownHandler(e: KeyboardEvent): void {
    if (getKey(e.key) === "Escape") {
      this.reset();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async reposition(): Promise<void> {
    const { popper, menuEl } = this;
    const modifiers = this.getModifiers();

    popper && !this.range
      ? updatePopper({
          el: menuEl,
          modifiers,
          placement: DEFAULT_PLACEMENT,
          popper
        })
      : this.createPopper();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   * Trigger calcite date change when a user changes the date.
   */
  @Event() calciteDateChange: EventEmitter<Date>;

  /**
   * Trigger calcite date change when a user changes the date range.
   */
  @Event() calciteDateRangeChange: EventEmitter<DateRangeChange>;

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

  /**
   * In range mode, indicates which input was is focused on
   */
  @State() focusedInput: Position = "start";

  @Watch("focusedInput")
  focusedHandler(): void {
    this.reposition();
  }

  private endInput: HTMLCalciteInputElement;

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

    this.createPopper();
  }

  disconnectedCallback(): void {
    this.destroyPopper();
  }

  render(): VNode {
    const min = dateFromISO(this.min);
    const max = dateFromISO(this.max);
    const date = dateFromRange(this.range ? this.startAsDate : this.valueAsDate, min, max);
    const activeStartDate = this.range
      ? this.getActiveStartDate(date, min, max)
      : this.getActiveDate(date, min, max);
    let activeDate = activeStartDate;
    const endDate = this.range ? dateFromRange(this.endAsDate, min, max) : null;
    const activeEndDate = this.getActiveEndDate(endDate, min, max);
    if (
      (this.focusedInput === "end" ||
        (this.noCalendarInput &&
          this.hoverRange?.focused === "end" &&
          (this.proximitySelection || endDate))) &&
      activeEndDate
    ) {
      activeDate = activeEndDate;
    }
    if (this.range && this.noCalendarInput && this.mostRecentRangeValue) {
      activeDate = this.mostRecentRangeValue;
    }
    const formattedEndDate = endDate ? endDate.toLocaleDateString(this.locale) : "";
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
    const minDate = this.focusedInput === "start" ? min : date || min;
    const maxDate = this.focusedInput === "start" && !this.noCalendarInput ? endDate || max : max;
    const dir = getElementDir(this.el);

    return (
      <Host dir={dir} role="application">
        {this.localeData && (
          <div aria-expanded={this.active.toString()} class="input-container" role="application">
            {!this.noCalendarInput && (
              <div class="input-wrapper" ref={this.setStartWrapper}>
                <calcite-input
                  class={`input ${
                    this.layout === "vertical" && this.range ? `no-bottom-border` : ``
                  }`}
                  icon="calendar"
                  number-button-type="none"
                  onCalciteInputBlur={(e) => this.blur(e.detail)}
                  onCalciteInputFocus={() => {
                    this.active = true;
                    this.focusedInput = "start";
                  }}
                  onCalciteInputInput={(e) => this.input(e.detail.value)}
                  placeholder={this.localeData?.placeholder}
                  scale={this.scale}
                  type="text"
                  value={formattedDate}
                />
              </div>
            )}
            {this.renderCalendar(activeDate, dir, maxDate, minDate, date, endDate)}
            {this.range && !this.noCalendarInput && this.layout === "horizontal" && (
              <div class="horizontal-arrow-container">
                <calcite-icon flipRtl={true} icon="arrow-right" scale="s" />
              </div>
            )}
            {this.range && !this.noCalendarInput && this.layout === "vertical" && (
              <div class="vertical-arrow-container">
                <calcite-icon icon="arrow-down" scale="s" />
              </div>
            )}
            {this.range && !this.noCalendarInput && (
              <div class="input-wrapper" ref={this.setEndWrapper}>
                <calcite-input
                  class="input"
                  icon="calendar"
                  number-button-type="none"
                  onCalciteInputBlur={(e) => this.blur(e.detail)}
                  onCalciteInputFocus={() => {
                    this.active = true;
                    this.focusedInput = "end";
                  }}
                  onCalciteInputInput={(e) => this.input(e.detail.value)}
                  placeholder={this.localeData?.placeholder}
                  ref={(el) => (this.endInput = el)}
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
  @State() private localeData: DateLocaleData;

  @State() private hoverRange;

  private hasShadow: boolean = Build.isBrowser && !!document.head.attachShadow;

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private startWrapper: HTMLDivElement;

  private endWrapper: HTMLDivElement;

  private mostRecentRangeValue?: Date;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  setMenuEl = (el: HTMLDivElement): void => {
    if (el) {
      this.menuEl = el;
    }
  };

  setStartWrapper = (el: HTMLDivElement): void => {
    this.startWrapper = el;
  };

  setEndWrapper = (el: HTMLDivElement): void => {
    this.endWrapper = el;
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
    const { menuEl, startWrapper, endWrapper } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el: menuEl,
      modifiers,
      placement: DEFAULT_PLACEMENT,
      referenceEl:
        this.focusedInput === "end" || this.layout === "vertical" ? endWrapper : startWrapper
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
   * Render calcite-date-month-header and calcite-date-month
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
      this.localeData && (
        <div aria-hidden={(!this.active).toString()} class="menu-container" ref={this.setMenuEl}>
          <div
            class={{
              ["calendar-picker-wrapper"]: true,
              ["calendar-picker-wrapper--end"]: this.focusedInput === "end",
              [PopperCSS.animation]: true,
              [PopperCSS.animationActive]: this.active
            }}
          >
            <calcite-date-month-header
              activeDate={activeDate}
              dir={dir}
              intlNextMonth={this.intlNextMonth}
              intlPrevMonth={this.intlPrevMonth}
              localeData={this.localeData}
              max={maxDate}
              min={minDate}
              onCalciteDateSelect={(e: CustomEvent<Date>) => {
                const date = new Date(e.detail);
                if (!this.range) {
                  this.activeDate = date;
                  this.handleDateChange(e);
                } else {
                  if (this.focusedInput === "start") {
                    this.activeStartDate = date;
                  } else if (this.focusedInput === "end") {
                    this.activeEndDate = date;
                  }
                  this.mostRecentRangeValue = date;
                }
              }}
              scale={this.scale}
              selectedDate={this.focusedInput === "start" ? date : endDate || new Date()}
            />
            <calcite-date-month
              activeDate={activeDate}
              dir={dir}
              endDate={this.range ? endDate : undefined}
              hoverRange={this.hoverRange}
              localeData={this.localeData}
              max={maxDate}
              min={minDate}
              onCalciteActiveDateChange={(e: CustomEvent<Date>) => {
                const date = new Date(e.detail);
                if (!this.range) {
                  this.activeDate = date;
                } else {
                  if (this.focusedInput === "start") {
                    this.activeStartDate = date;
                  } else if (this.focusedInput === "end") {
                    this.activeEndDate = date;
                  }
                  this.mostRecentRangeValue = date;
                }
              }}
              onCalciteDateHover={(e: CustomEvent<Date>) => {
                if (!this.startAsDate) {
                  this.hoverRange = undefined;
                  return this.hoverRange;
                }
                const date = new Date(e.detail);
                this.hoverRange = {
                  focused: this.focusedInput,
                  start: this.startAsDate,
                  end: this.endAsDate
                };
                if (!this.noCalendarInput) {
                  if (this.focusedInput === "start") {
                    this.hoverRange.start = date;
                  } else {
                    this.hoverRange.end = date;
                  }
                } else {
                  if (this.proximitySelection) {
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
                }
              }}
              onCalciteDateMouseOut={(_e) => {
                if (this.hoverRange) {
                  this.hoverRange = undefined;
                }
              }}
              onCalciteDateSelect={(e: CustomEvent<Date>) => this.handleDateChange(e, true)}
              scale={this.scale}
              selectedDate={this.focusedInput === "start" ? date : endDate}
              startDate={this.range ? date : undefined}
            />
          </div>
        </div>
      )
    );
  }

  /**
   * Update date instance of start if valid
   */
  private setStartAsDate(startDate: Date): void {
    this.startAsDate = startDate;
    this.mostRecentRangeValue = this.startAsDate;
  }

  /**
   * Update date instance of end if valid
   */
  private setEndAsDate(endDate: Date): void {
    this.endAsDate = endDate;
    this.mostRecentRangeValue = this.endAsDate;
  }

  /**
   * Reset active date and close
   */
  private reset(): void {
    if (this.valueAsDate && this.valueAsDate?.getTime() !== this.activeDate?.getTime()) {
      this.activeDate = new Date(this.valueAsDate);
    }
    if (this.startAsDate && this.startAsDate?.getTime() !== this.activeStartDate?.getTime()) {
      this.activeStartDate = new Date(this.startAsDate);
    }
    if (this.endAsDate && this.endAsDate?.getTime() !== this.activeEndDate?.getTime()) {
      this.activeEndDate = new Date(this.endAsDate);
    }
    if (!this.noCalendarInput) {
      this.active = false;
    }
  }

  /**
   * If inputted string is a valid date, update value/active
   */
  private input(value: string): void {
    const date = this.getDateFromInput(value);
    if (date) {
      if (!this.range) {
        this.valueAsDate = date;
        this.activeDate = date as Date;
        this.calciteDateChange.emit(new Date(date));
      } else {
        let changed = false;
        if (this.focusedInput === "start") {
          changed = !this.startAsDate || !sameDate(date, this.startAsDate);
          if (changed) {
            this.startAsDate = date;
            this.activeStartDate = date as Date;
          }
        } else if (this.focusedInput === "end") {
          changed = !this.endAsDate || !sameDate(date, this.endAsDate);
          if (changed) {
            this.endAsDate = date;
            this.activeEndDate = date as Date;
          }
        }
        if (changed) {
          this.calciteDateRangeChange.emit({
            startDate: this.startAsDate,
            endDate: this.endAsDate
          });
        }
      }
    }
  }

  /**
   * Clean up invalid date from input on blur
   */
  private blur(target: HTMLInputElement): void {
    const date = this.getDateFromInput(target.value);
    if (!date) {
      if (!this.range && this.valueAsDate) {
        target.value = this.valueAsDate.toLocaleDateString(this.locale);
      } else if (this.focusedInput === "start" && this.startAsDate) {
        target.value = this.startAsDate.toLocaleDateString(this.locale);
      } else if (this.focusedInput === "end" && this.endAsDate) {
        target.value = this.endAsDate.toLocaleDateString(this.locale);
      }
    }
  }

  /**
   * Event handler for when the selected date changes
   */
  private handleDateChange(e: CustomEvent<Date>, doReset?: boolean) {
    const date = new Date(e.detail);
    if (!this.range) {
      this.value = dateToISO(date);
      this.valueAsDate = e.detail;
      this.activeDate = date;
      this.calciteDateChange.emit(date);
      if (doReset) {
        this.reset();
      }
      return;
    }

    if (this.range && this.noCalendarInput) {
      if (!this.startAsDate || (!this.endAsDate && date < this.startAsDate)) {
        if (this.startAsDate) {
          const newEndDate = new Date(this.startAsDate);
          this.end = dateToISO(newEndDate);
          this.setEndAsDate(newEndDate);
          this.activeEndDate = newEndDate;
        }
        this.start = dateToISO(date);
        this.setStartAsDate(date);
        this.activeStartDate = date;
      } else if (!this.endAsDate) {
        this.end = dateToISO(date);
        this.setEndAsDate(date);
        this.activeEndDate = date;
      } else {
        if (this.proximitySelection) {
          const startDiff = getDaysDiff(date, this.startAsDate);
          const endDiff = getDaysDiff(date, this.endAsDate);
          if (startDiff < endDiff) {
            this.start = dateToISO(date);
            this.setStartAsDate(date);
            this.activeStartDate = date;
          } else {
            this.end = dateToISO(date);
            this.setEndAsDate(date);
            this.activeEndDate = date;
          }
        } else {
          this.start = dateToISO(date);
          this.setStartAsDate(date);
          this.activeStartDate = date;
          this.endAsDate = this.activeEndDate = this.end = undefined;
        }
      }
      if (doReset) {
        this.reset();
      }
      this.calciteDateRangeChange.emit({
        startDate: this.startAsDate,
        endDate: this.endAsDate
      });
      return;
    }

    if (this.focusedInput === "start") {
      this.start = dateToISO(date);
      this.setStartAsDate(date);
      this.activeStartDate = date;
    } else {
      this.end = dateToISO(date);
      this.setEndAsDate(date);
      this.activeEndDate = date;
    }

    if (doReset) {
      this.reset();
    }
    this.calciteDateRangeChange.emit({
      startDate: this.startAsDate,
      endDate: this.endAsDate
    });

    setTimeout(() => {
      if (this.focusedInput === "start" && !this.noCalendarInput) {
        this.endInput.setFocus();
      }
    }, 150);
  }

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
