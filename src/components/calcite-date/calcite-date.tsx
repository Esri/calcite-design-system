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
} from "@stencil/core";
import {
  parseDateString,
  getLocaleFormatData,
  DateFormattingData,
} from "../../utils/locale";
import { getElementDir } from "../../utils/dom";
import {
  dateFromRange,
  inRange,
  dateFromISO,
  dateToISO,
} from "../../utils/date";
import { getKey } from "../../utils/key";
@Component({
  tag: "calcite-date",
  styleUrl: "calcite-date.scss",
  shadow: true,
})
export class CalciteDatePicker {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** Selected date */
  @Prop({ reflect: true, mutable: true }) value?: string;
  /** Selected date as full date object*/
  @Prop({ mutable: true }) valueAsDate?: Date;
  /** Earliest allowed date ("yyyy-mm-dd") */
  @Prop() min?: string;
  /** Latest allowed date ("yyyy-mm-dd") */
  @Prop() max?: string;
  /** Expand or collapse when calendar does not have input */
  @Prop({ reflect: true }) active: boolean = false;
  /** Localized string for "previous month" */
  @Prop() prevMonthLabel?: string = "previous month";
  /** Localized string for "next month" */
  @Prop() nextMonthLabel?: string = "next month";
  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = "en-US";
  /** Show only calendar popup */
  @Prop() noCalendarInput?: boolean = false;
  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("blur") focusOutHandler() {
    this.reset();
  }

  /**
   * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
   * Check if the focused element is inside the date picker, if not close
   */
  @Listen("focusin", { target: "window" }) focusInHandler(e: FocusEvent) {
    if (!this.hasShadow && !this.el.contains(e.srcElement as HTMLElement)) {
      this.reset();
    }
  }

  @Listen("keyup") keyDownHandler(e: KeyboardEvent) {
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
  connectedCallback() {
    this.setupProxyInput();
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  componentWillRender() {
    this.syncProxyInputToThis();
  }

  render() {
    const min = dateFromISO(this.min);
    const max = dateFromISO(this.max);
    const date = dateFromRange(this.valueAsDate, min, max);
    const activeDate = this.getActiveDate(date, min, max);
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
    const dir = getElementDir(this.el);
    return (
      <Host role="application" dir={dir}>
        <div class="slot">
          <slot></slot>
        </div>
        {!this.noCalendarInput && (
          <div role="application">
            <calcite-input
              type="text"
              value={formattedDate}
              placeholder={this.localeData.placeholder}
              icon="calendar"
              onCalciteInputFocus={() => (this.active = true)}
              onCalciteInputChange={(e) => this.input(e.detail.value)}
              onCalciteInputBlur={(e) => this.blur(e.detail)}
              scale={this.scale}
              number-button-type="none"
              class="input"
            />
          </div>
        )}
        <div class="calendar-picker-wrapper">
          <calcite-date-month-header
            activeDate={activeDate}
            selectedDate={date || new Date()}
            prevMonthLabel={this.prevMonthLabel}
            nextMonthLabel={this.nextMonthLabel}
            locale={this.locale}
            min={min}
            max={max}
            onCalciteActiveDateChange={(e: CustomEvent<Date>) => {
              this.activeDate = new Date(e.detail);
            }}
            dir={dir}
            scale={this.scale}
          />
          <calcite-date-month
            min={min}
            max={max}
            selectedDate={date}
            activeDate={activeDate}
            locale={this.locale}
            onCalciteDateSelect={(e: CustomEvent<Date>) => {
              this.setValue(new Date(e.detail));
              this.activeDate = new Date(e.detail);
              this.calciteDateChange.emit(new Date(e.detail));
              this.reset();
            }}
            onCalciteActiveDateChange={(e: CustomEvent<Date>) => {
              this.activeDate = new Date(e.detail);
            }}
            dir={dir}
            scale={this.scale}
          />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  private localeData: DateFormattingData = getLocaleFormatData(this.locale);
  private hasShadow: boolean = Build.isBrowser && !!document.head.attachShadow;
  private inputProxy: HTMLInputElement;
  private observer: MutationObserver;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Register slotted date input proxy, or create one if not provided
   */
  setupProxyInput() {
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
  syncThisToProxyInput = () => {
    this.min = this.inputProxy.min;
    this.max = this.inputProxy.max;
    const min = dateFromISO(this.min);
    const max = dateFromISO(this.max);
    const date = dateFromISO(this.inputProxy.value);
    this.valueAsDate = dateFromRange(date, min, max);
    this.value = dateToISO(this.valueAsDate);
  };

  /**
   * Update input proxy
   */
  syncProxyInputToThis = () => {
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
  private setValue(date: Date) {
    this.valueAsDate = new Date(date);
    this.value = date.toISOString().split("T")[0];
    this.syncProxyInputToThis();
  }

  /**
   * Reset active date and close
   */
  private reset() {
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
  private input(value: string) {
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
  private blur(target: HTMLInputElement) {
    const date = this.getDateFromInput(target.value);
    if (!date && this.valueAsDate) {
      target.value = this.valueAsDate.toLocaleDateString(this.locale);
    }
  }

  /**
   * Get an active date using the value, or current date as default
   */
  private getActiveDate(
    value: Date | null,
    min: Date | null,
    max: Date | null
  ) {
    return (
      dateFromRange(this.activeDate, min, max) ||
      value ||
      dateFromRange(new Date(), min, max)
    );
  }

  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
   */
  private getDateFromInput(value: string): Date | false {
    const { separator } = this.localeData;
    const { day, month, year } = parseDateString(value, this.locale);
    const validDay = day > 0;
    const validMonth = month > -1;
    const date = new Date(year, month, day);
    const validDate = !isNaN(date.getTime());
    const validLength = value.split(separator).filter((c) => c).length > 2;
    const validYear = year.toString().length > 3;
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
