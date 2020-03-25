import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  EventEmitter,
  State,
  Listen
} from "@stencil/core";
import { localeToDate, getLocaleFormatData } from "./locale";
@Component({
  tag: "calcite-date-picker",
  styleUrl: "calcite-date-picker.scss",
  shadow: true
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
  @Prop({ reflect: true, mutable: true }) value?: Date | string;
  /** Earliest allowed date ("yyyy-mm-dd") */
  @Prop() min?: string = "";
  /** Latest allowed date ("yyyy-mm-dd") */
  @Prop() max?: string = "";
  /** Expand or collapse when calendar does not have input */
  @Prop({ reflect: true }) showCalendar: boolean = false;
  /** Localized string for "previous month" */
  @Prop() prevMonthLabel?: string = "previous month";
  /** Localized string for "next month" */
  @Prop() nextMonthLabel?: string = "next month";
  /**  Start of week offset. 0 for Sunday, 1 for Monday, etc... */
  @Prop() startOfWeek?: number = 0;
  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = "en-US";
  /** Show only calendar popup */
  @Prop() noCalendarInput?: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("blur") closeCalendar() {
    if (!this.noCalendarInput) {
      this.showCalendar = false;
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
  @Event() calciteDateChange: EventEmitter;

  /**
   * Active date.
   */
  @State() activeDate = this.value ? new Date(this.value) : new Date();

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    if (this.value && typeof this.value === "string") {
      this.value = new Date(this.value);
    }
  }

  render() {
    const date = this.value && new Date(this.value);
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
    const month = this.activeDate.getMonth();
    const year = this.activeDate.getFullYear();
    const min = this.min ? new Date(this.min) : null;
    const max = this.max ? new Date(this.max) : null;
    return (
      <Host role="application">
        {!this.noCalendarInput && (
          <div
            class={{
              "date-input-wrapper": true,
              expanded: this.showCalendar
            }}
            role="application"
          >
            <calcite-icon
              icon="calendar"
              class="calendar-icon"
              scale="s"
            ></calcite-icon>
            <input
              type="text"
              placeholder={this.placeholder}
              value={formattedDate}
              class="date-input"
              onFocus={() => (this.showCalendar = true)}
              onInput={(e) => this.processInput(e.target)}
              tabindex="0"
            />
          </div>
        )}
        <div class="calendar-picker-wrapper">
          <calcite-date-month-header
            month={month}
            year={year}
            selectedDate={date || new Date()}
            prevMonthLabel={this.prevMonthLabel}
            nextMonthLabel={this.nextMonthLabel}
            locale={this.locale}
            min={min}
            max={max}
            onCalciteMonthChange={e => this.setMonth(e.target)}
            onCalciteYearChange={e => this.setYear(e.target)}
          />
          <calcite-date-month
            month={month}
            year={year}
            min={min}
            max={max}
            selectedDate={date || new Date()}
            activeDate={this.activeDate}
            startOfWeek={this.startOfWeek}
            locale={this.locale}
            onCalciteDateSelect={evt => {
              this.closeCalendar();
              this.setDate(evt.target);
            }}
            onCalciteActiveDateChange={evt => this.setActiveDate(evt.target)}
          />
        </div>
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  placeholder: string = getLocaleFormatData(this.locale).placeholder;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private processInput(target: EventTarget): void {
    const value = (target as HTMLInputElement).value;
    const { separator } = getLocaleFormatData(this.locale);
    const date = localeToDate(value, this.locale);
    const validDate = !isNaN(date.getTime());
    const validLength = value.split(separator).filter(c => c).length > 2;
    if (validDate && validLength) {
      const afterMin = !this.min || new Date(this.min).getTime() <= date.getTime();
      const beforeMax = !this.max || new Date(this.max).getTime() >= date.getTime();
      if (afterMin && beforeMax) {
        this.value = date;
        this.activeDate = date;
      }
    }
  }

  private setActiveDate(target): void {
    this.activeDate = target.activeDate;
  }

  private setMonth(target) {
    this.activeDate.setMonth(target.month);
  }

  private setYear(target) {
    this.activeDate.setFullYear(target.year);
  }

  private setDate(target) {
    this.value = target.selectedDate;
    this.activeDate = target.selectedDate;
    this.calciteDateChange.emit();
  }
}
