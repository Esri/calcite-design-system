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
import {
  dateFromRange,
  inRange,
  dateFromISO,
  dateToISO,
  parseDateString,
  sameDate
} from "../../utils/date";
import { getKey } from "../../utils/key";
import { TEXT } from "./calcite-date-resources";
import { DateRangeChange } from "../../interfaces/DateRangeChange";

@Component({
  assetsDirs: ["calcite-date-nls"],
  tag: "calcite-date",
  styleUrl: "calcite-date.scss",
  shadow: true
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

  /** Localized string for "previous month" */
  @Prop() intlPrevMonth?: string = TEXT.prevMonth;

  /** Localized string for "next month" */
  @Prop() intlNextMonth?: string = TEXT.nextMonth;

  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = document.documentElement.lang || "en-US";

  /** Show only calendar popup */
  @Prop() noCalendarInput?: boolean = false;

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Range mode activation */
  @Prop({ reflect: true }) range?: boolean = false;

  /** Selected start date */
  @Prop() start?: string;

  /** Selected end date */
  @Prop() end?: string;

  /** Layout */
  @Prop({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("blur") focusOutHandler(): void {
    this.reset();
  }

  /**
   * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
   * Check if the focused element is inside the date picker, if not close
   */
  @Listen("focusin", { target: "window" }) focusInHandler(e: FocusEvent): void {
    if (!this.hasShadow && !this.el.contains(e.srcElement as HTMLElement)) {
      this.reset();
    }
  }

  @Listen("keyup") keyDownHandler(e: KeyboardEvent): void {
    if (getKey(e.key) === "Escape") {
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
  @State() focusedInput: "start" | "end" = "start";

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback(): void {
    this.loadLocaleData();
    if (!this.range) {
      this.setupProxyInput();
    } else {
      this.setupRangeProxyInputs();
    }
    if (this.value) {
      this.setValueAsDate(this.value);
    }
    if (this.start) {
      this.setStartAsDate(this.start);
    }
    if (this.end) {
      this.setEndAsDate(this.end);
    }
  }

  componentWillRender(): void {
    this.syncProxyInputToThis();
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
    if (this.focusedInput === "end" && activeEndDate) {
      activeDate = activeEndDate;
    }
    const formattedEndDate = endDate ? endDate.toLocaleDateString(this.locale) : "";
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
    const minDate = this.focusedInput === "start" ? min : date || min;
    const maxDate = this.focusedInput === "start" ? endDate || max : max;
    const dir = getElementDir(this.el);

    return (
      <Host dir={dir} role="application">
        <div class="slot">
          <slot />
          <slot name="start" />
          <slot name="end" />
        </div>
        {this.localeData && (
          <div class="input-container" role="application">
            <div class="input-wrapper">
              {(this.range || !this.noCalendarInput) && (
                <calcite-input
                  class="input"
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
              )}
              {(!this.range || (this.focusedInput === "start" && this.layout !== "vertical")) &&
                this.renderCalendar(activeDate, dir, maxDate, minDate, date, endDate)}
            </div>
            {this.range && this.layout === "horizontal" && (
              <div class="horizontal-arrow-container">
                <calcite-icon icon={dir === "ltr" ? `arrow-right` : `arrow-left`} scale="s" />
              </div>
            )}
            {this.range && this.layout === "vertical" && (
              <div class="vertical-arrow-container">
                <calcite-icon icon="arrow-down" scale="s" />
              </div>
            )}
            {this.range && (
              <div class="input-wrapper">
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
                  scale={this.scale}
                  type="text"
                  value={formattedEndDate}
                />
                {(this.focusedInput === "end" || this.layout === "vertical") &&
                  this.renderCalendar(activeDate, dir, maxDate, minDate, date, endDate)}
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

  private hasShadow: boolean = Build.isBrowser && !!document.head.attachShadow;

  private inputProxy: HTMLInputElement;

  private startProxy: HTMLInputElement;

  private endProxy: HTMLInputElement;

  private observer: MutationObserver;

  private startObserver: MutationObserver;

  private endObserver: MutationObserver;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  @Watch("value") valueWatcher(value: string): void {
    this.setValueAsDate(value);
  }

  @Watch("start") startWatcher(start: string): void {
    this.setStartAsDate(start);
  }

  @Watch("end") endWatcher(end: string): void {
    this.setEndAsDate(end);
  }

  @Watch("locale")
  private async loadLocaleData(): Promise<void> {
    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }

  /**
   * Register slotted date input proxy, or create one if not provided
   */
  setupProxyInput(): void {
    // check for a proxy input
    this.inputProxy = this.el.querySelector(`input`);

    // if the user didn't pass a proxy input create one for them
    if (!this.inputProxy) {
      this.inputProxy = document.createElement("input");
      try {
        this.inputProxy.type = "date";
      } catch (e) {
        this.inputProxy.type = "text";
      }
      this.syncProxyInputToThis();
      this.el.appendChild(this.inputProxy);
    }

    this.syncThisToProxyInput();

    if (Build.isBrowser) {
      this.observer = new MutationObserver(this.syncThisToProxyInput);
      this.observer.observe(this.inputProxy, { attributes: true });
    }
  }

  /**
   * Register slotted start and end date input proxies, or create one if not provided
   */
  setupRangeProxyInputs(): void {
    this.startProxy = this.el.querySelector(`input[slot="start"]`);
    let needToSyncProxy = false;
    if (!this.startProxy) {
      this.startProxy = document.createElement("input");
      this.startProxy.setAttribute("slot", "start");
      try {
        this.startProxy.type = "date";
      } catch (e) {
        this.startProxy.type = "text";
      }
      needToSyncProxy = true;
      this.el.appendChild(this.startProxy);
    }

    this.endProxy = this.el.querySelector(`input[slot="end"]`);
    if (!this.endProxy) {
      this.endProxy = document.createElement("input");
      this.endProxy.setAttribute("slot", "end");
      try {
        this.endProxy.type = "date";
      } catch (e) {
        this.endProxy.type = "text";
      }
      needToSyncProxy = true;
      this.el.appendChild(this.endProxy);
    }

    if (needToSyncProxy) {
      this.syncStartProxyToThis();
      this.syncEndProxyToThis();
    }

    this.syncThisToStartProxy();
    this.syncThisToEndProxy();

    if (Build.isBrowser) {
      this.startObserver = new MutationObserver(this.syncThisToStartProxy);
      this.startObserver.observe(this.startProxy, { attributes: true });
      this.endObserver = new MutationObserver(this.syncThisToEndProxy);
      this.endObserver.observe(this.endProxy, { attributes: true });
    }
  }

  /**
   * Update component based on start input proxy
   */
  syncThisToStartProxy = (): void => {
    const startDate = dateFromISO(this.startProxy.value);
    const endDate = dateFromISO(this.endProxy.value);
    const min = dateFromISO(this.min);
    const max = endDate || dateFromISO(this.max);
    this.start = dateToISO(dateFromRange(startDate, min, max));
  };

  /**
   * Update start input proxy
   */
  syncStartProxyToThis = (): void => {
    if (this.startProxy) {
      this.startProxy.value = this.start || "";
      if (this.min) {
        this.startProxy.min = this.min;
      }
      if (this.max || this.endProxy.value) {
        this.startProxy.max = this.endProxy.value || this.max;
      }
    }
  };

  /**
   * Update component based on end input proxy
   */
  syncThisToEndProxy = (): void => {
    const startDate = dateFromISO(this.startProxy.value);
    const endDate = dateFromISO(this.endProxy.value);
    const min = startDate || dateFromISO(this.min);
    const max = dateFromISO(this.max);
    this.end = dateToISO(dateFromRange(endDate, min, max));
  };

  /**
   * Update end input proxy
   */
  syncEndProxyToThis = (): void => {
    if (this.endProxy) {
      this.endProxy.value = this.end || "";
      if (this.startProxy.value || this.min) {
        this.endProxy.min = this.startProxy.value || this.min;
      }
      if (this.max) {
        this.endProxy.max = this.max;
      }
    }
  };

  /**
   * Update component based on input proxy
   */
  syncThisToProxyInput = (): void => {
    this.min = this.inputProxy.min;
    this.max = this.inputProxy.max;
    const min = dateFromISO(this.min);
    const max = dateFromISO(this.max);
    const date = dateFromISO(this.inputProxy.value);
    this.value = dateToISO(dateFromRange(date, min, max));
  };

  /**
   * Update input proxy
   */
  syncProxyInputToThis = (): void => {
    if (this.inputProxy) {
      this.inputProxy.value = this.value || "";
      if (this.min) {
        this.inputProxy.min = this.min;
      }
      if (this.max) {
        this.inputProxy.max = this.max;
      }
    }
  };

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
        <div
          class={`calendar-picker-wrapper${
            this.focusedInput === "end" ? " calendar-picker-wrapper--end" : ""
          }`}
        >
          <calcite-date-month-header
            activeDate={activeDate}
            dir={dir}
            intlNextMonth={this.intlNextMonth}
            intlPrevMonth={this.intlPrevMonth}
            localeData={this.localeData}
            max={maxDate}
            min={minDate}
            onCalciteActiveDateChange={(e: CustomEvent<Date>) => {
              this.handleDateChange(e);
            }}
            scale={this.scale}
            selectedDate={this.focusedInput === "start" ? date : endDate || new Date()}
          />
          <calcite-date-month
            activeDate={activeDate}
            dir={dir}
            endDate={this.focusedInput === "end" ? endDate : undefined}
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
              }
            }}
            onCalciteDateSelect={(e: CustomEvent<Date>) => this.handleDateChange(e, true)}
            scale={this.scale}
            selectedDate={this.focusedInput === "start" ? date : endDate}
            startDate={this.focusedInput === "end" ? date : undefined}
          />
        </div>
      )
    );
  }

  /**
   * Set both iso value and date value and update proxy
   */
  private setValue(date: Date): void {
    this.value = new Date(date).toISOString().split("T")[0];
    this.syncProxyInputToThis();
  }

  /**
   * Set start iso value and update proxy
   */
  private setStartDate(date: Date): void {
    this.start = new Date(date).toISOString().split("T")[0];
    this.syncStartProxyToThis();
  }

  /**
   * set end iso value and update proxy
   */
  private setEndDate(date: Date): void {
    this.end = new Date(date).toISOString().split("T")[0];
    this.syncEndProxyToThis();
  }

  /**
   * Update date instance of value if valid
   */
  private setValueAsDate(value: string): void {
    if (value) {
      const date = dateFromISO(value);
      if (date) {
        this.valueAsDate = date as Date;
      }
    }
  }

  /**
   * Update date instance of start if valid
   */
  private setStartAsDate(start: string): void {
    if (start) {
      const date = dateFromISO(start);
      if (date) {
        this.startAsDate = date as Date;
      }
    }
  }

  /**
   * Update date instance of end if valid
   */
  private setEndAsDate(end: string): void {
    if (end) {
      const date = dateFromISO(end);
      if (date) {
        this.endAsDate = date as Date;
      }
    }
  }

  /**
   * Reset active date and close
   */
  private reset(): void {
    if (this.valueAsDate) {
      this.activeDate = new Date(this.valueAsDate);
    }
    if (this.startAsDate) {
      this.activeStartDate = new Date(this.startAsDate);
    }
    if (this.endAsDate) {
      this.activeEndDate = new Date(this.endAsDate);
    }
    if (this.range || !this.noCalendarInput) {
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
        this.setValue(date);
        this.activeDate = date as Date;
        this.calciteDateChange.emit(new Date(date));
      } else {
        let changed = false;
        if (this.focusedInput === "start") {
          changed = !this.startAsDate || !sameDate(date, this.startAsDate);
          if (changed) {
            this.setStartDate(date);
            this.activeStartDate = date as Date;
          }
        } else if (this.focusedInput === "end") {
          changed = !this.endAsDate || !sameDate(date, this.endAsDate);
          if (changed) {
            this.setEndDate(date);
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
      this.setValue(date);
      this.activeDate = date;
      this.calciteDateChange.emit(date);
      if (doReset) {
        this.reset();
      }
      return;
    }

    if (this.focusedInput === "start") {
      this.setStartDate(date);
      this.activeStartDate = date;
    } else {
      this.setEndDate(date);
      this.activeEndDate = date;
    }

    if (doReset) {
      this.reset();
    }
    this.calciteDateRangeChange.emit({
      startDate: this.startAsDate,
      endDate: this.endAsDate
    });
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
