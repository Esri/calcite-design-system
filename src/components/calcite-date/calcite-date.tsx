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
import { dateFromRange, inRange, dateFromISO, dateToISO, parseDateString } from "../../utils/date";
import { getKey } from "../../utils/key";
import { TEXT } from "./calcite-date-resources";

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
   * Active date.
   */
  @State() activeDate: Date;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback(): void {
    this.setupProxyInput();
    this.loadLocaleData();
    if (this.value) {
      this.setValueAsDate(this.value);
    }
  }

  componentWillRender(): void {
    this.syncProxyInputToThis();
  }

  render(): VNode {
    const min = dateFromISO(this.min);
    const max = dateFromISO(this.max);
    const date = dateFromRange(this.valueAsDate, min, max);
    const activeDate = this.getActiveDate(date, min, max);
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
    const dir = getElementDir(this.el);

    return (
      <Host dir={dir} role="application">
        <div class="slot">
          <slot />
        </div>
        {!this.noCalendarInput && this.localeData && (
          <div role="application">
            <calcite-input
              class="input"
              icon="calendar"
              number-button-type="none"
              onCalciteInputBlur={(e) => this.blur(e.detail)}
              onCalciteInputFocus={() => (this.active = true)}
              onCalciteInputInput={(e) => this.input(e.detail.value)}
              placeholder={this.localeData.placeholder}
              scale={this.scale}
              type="text"
              value={formattedDate}
            />
          </div>
        )}
        {this.localeData && (
          <div class="calendar-picker-wrapper">
            <calcite-date-month-header
              activeDate={activeDate}
              dir={dir}
              intlNextMonth={this.intlNextMonth}
              intlPrevMonth={this.intlPrevMonth}
              localeData={this.localeData}
              max={max}
              min={min}
              onCalciteActiveDateChange={(e: CustomEvent<Date>) => {
                this.setValue(new Date(e.detail));
                this.activeDate = new Date(e.detail);
                this.calciteDateChange.emit(new Date(e.detail));
              }}
              scale={this.scale}
              selectedDate={date || new Date()}
            />
            <calcite-date-month
              activeDate={activeDate}
              dir={dir}
              localeData={this.localeData}
              max={max}
              min={min}
              onCalciteActiveDateChange={(e: CustomEvent<Date>) => {
                this.activeDate = new Date(e.detail);
              }}
              onCalciteDateSelect={(e: CustomEvent<Date>) => {
                this.setValue(new Date(e.detail));
                this.activeDate = new Date(e.detail);
                this.calciteDateChange.emit(new Date(e.detail));
                this.reset();
              }}
              scale={this.scale}
              selectedDate={date}
            />
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

  private observer: MutationObserver;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  @Watch("value") valueWatcher(value: string): void {
    this.setValueAsDate(value);
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
    this.inputProxy = this.el.querySelector("input");

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
   * Set both iso value and date value and update proxy
   */
  private setValue(date: Date): void {
    this.value = new Date(date).toISOString().split("T")[0];
    this.syncProxyInputToThis();
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
   * Reset active date and close
   */
  private reset(): void {
    if (this.valueAsDate) {
      this.activeDate = new Date(this.valueAsDate);
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
      this.setValue(date);
      this.activeDate = date as Date;
      this.calciteDateChange.emit(new Date(date));
    }
  }

  /**
   * Clean up invalid date from input on blur
   */
  private blur(target: HTMLInputElement): void {
    const date = this.getDateFromInput(target.value);
    if (!date && this.valueAsDate) {
      target.value = this.valueAsDate.toLocaleDateString(this.locale);
    }
  }

  /**
   * Get an active date using the value, or current date as default
   */
  private getActiveDate(value: Date | null, min: Date | null, max: Date | null): Date {
    return dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max);
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
