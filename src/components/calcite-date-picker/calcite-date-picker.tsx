import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  EventEmitter,
  State,
  Build,
  Watch,
  Listen
} from "@stencil/core";

@Component({
  tag: "calcite-date-picker",
  styleUrl: "calcite-date-picker.scss",
  shadow: true
})
export class CalciteDatePicker {
  @Element() el: HTMLElement;
  /**
   * Value of the form control
   */
  @Prop({ reflect: true }) value?: string = "";
  /**
   * Name of the form control (useful for specifying input/label relationship)
   */
  @Prop({ reflect: true }) min?: string = "";
  /**
   * Value of the form control
   */
  @Prop({ reflect: true }) max?: string = "";
  /**
   * Localized string for place holder to the date picker input.
   */
  @Prop({ reflect: true }) placeholder: string = "mm/dd/yyyy";

  /**
   * Localized string for previous month.
   */
  @Prop() prevMonthLabel?: string = "";
  /**
   * Localized string for next month.
   */
  @Prop() nextMonthLabel?: string = "";
  /**
   * Sun by default
   * 0: Sunday
   * 1: Monday
   * 2: Tuesday
   * 3: Wednesday
   * 4: Thursday
   * 5: Friday
   * 6: Saturday
   */
  @Prop() startOfWeek?: number = 0;
  /**
   * pass the locale in which user wants to show the date.
   */
  @Prop() locale?: string = "en-GB";
  /**
   * Input as Date
   */
  @Prop() valueAsDate?: Date = !isNaN(Date.parse(this.value)) ? this.generateDate(this.value) : null;
  /**
   * Show no input for only calendar popup
   */
  @Prop() noCalendarInput?: boolean = false;
  /**
   * Expand or collapse when calendar does not have input.
   */
  @Prop() showCalendar: boolean = false;
  /**
   * Trigger calcite date change when a user changes the date.
   */
  @Event() calciteDateChange: EventEmitter;

  observer: MutationObserver;

  /**
   * Active date.
   */
  @State() activeDate = isNaN(Date.parse(this.value)) ? new Date() : this.generateDate(this.value);

  @Watch('value')
  onNameChanged(newValue: string) {
    if(!isNaN(Date.parse(newValue))){
      this.valueAsDate = this.generateDate(newValue);
      this.activeDate = this.generateDate(newValue);
    }
  }

  inputProxy: HTMLInputElement;

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
    let selectedDate = this.valueAsDate || new Date();
    return (
      <Host
        role="application"
        expanded={this.showCalendar}
      >
        { !this.noCalendarInput && <div
          class={`date-input-wrapper ${this.showCalendar ? "expanded" : ""}`}
          role="application"
        >
          <calcite-icon icon="calendar" class="calendar-icon" scale="s"></calcite-icon>
          <input
            type="text"
            placeholder={this.placeholder}
            value={this.valueAsDate ? new Intl.DateTimeFormat(this.locale).format(this.valueAsDate): ""}
            class="date-input"
            onFocus={() => this.expandCalendar()}
            onInput={(e) => this.setDate(e.target)}
          />
        </div> }
        {this.showCalendar && (
          <div class="calendar-picker-wrapper">
            <calcite-date-month-header
              month={this.getMonth()}
              year={this.getYear()}
              selectedDate={selectedDate}
              prevMonthLabel={this.prevMonthLabel}
              nextMonthLabel={this.nextMonthLabel}
              locale={this.locale}
              min={this.min ? new Date(this.min) : null}
              max={this.max ? new Date(this.max) : null}
              onCalciteMonthChange={e => this.setMonth(e.target)}
              onCalciteYearChange={e => this.setYear(e.target)}
            />
            <calcite-date-month
              month={this.getMonth()}
              year={this.getYear()}
              min={this.min ? new Date(this.min) : null}
              max={this.max ? new Date(this.max) : null}
              selectedDate={selectedDate}
              activeDate={this.activeDate}
              startOfWeek={this.startOfWeek}
              locale={this.locale}
              onCalciteDateSelect={evt => { this.closeCalendar(); this.setDate(evt.target); }}
              onCalciteActiveDateChange={evt => this.setActiveDate(evt.target)}
            />
          </div>
        )}
        <slot />
      </Host>
    );
  }

  private setActiveDate(target): void {
    this.activeDate = target.activeDate;
  }

  private expandCalendar() {
    this.showCalendar = true;
  }

  @Listen("blur")
  closeCalendar() {
    this.showCalendar = false;
  }

  private getMonth() {
    return this.activeDate.getMonth();
  }

  private getYear() {
    return this.activeDate.getFullYear();
  }

  private setMonth(target) {
    this.activeDate = new Date(this.activeDate.setMonth(target.month));
  }

  private setYear(target) {
    this.activeDate = new Date(this.activeDate.setFullYear(target.year));
  }

  private setDate(target) {
    this.value = isNaN(Date.parse(target.value)) ? target.selectedDate ? target.selectedDate.toISOString() : this.value
    : target.value;
    this.syncProxyInputToThis();
    this.calciteDateChange.emit();
  }

  setupProxyInput() {
    // check for a proxy input
    this.inputProxy = this.el.querySelector("input");

    // if the user didn't pass a proxy input create one for them
    if (!this.inputProxy) {
      this.inputProxy = document.createElement("input");
      this.inputProxy.type = "date";
      this.syncProxyInputToThis();
      this.el.appendChild(this.inputProxy);
    }

    this.syncThisToProxyInput();
    if (Build.isBrowser) {
      this.observer = new MutationObserver(this.syncThisToProxyInput);
      this.observer.observe(this.inputProxy, { attributes: true });
    }
  }

  syncThisToProxyInput = () => {
    this.value = this.inputProxy.valueAsDate && this.inputProxy.valueAsDate.toISOString() || "";
    this.min = this.inputProxy.min;
    this.max = this.inputProxy.max;
  };

  syncProxyInputToThis = () => {
    this.inputProxy.valueAsDate = this.valueAsDate;
    this.inputProxy.min = this.min;
    this.inputProxy.max = this.max;
  };

  private generateDate(dateString: string): Date {
    let date = new Date(dateString);

    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  }
}
