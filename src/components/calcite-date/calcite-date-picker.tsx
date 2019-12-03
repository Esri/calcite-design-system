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
  Watch
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
  @Prop() locale?: string = "en-US";
  /**
   * Trigger calcite date change when a user changes the date.
   */
  @Event() calciteDateChange: EventEmitter;

  observer: MutationObserver;

  /**
   * Expanded state of the calander.
   */
  @State() showCalendar: boolean = false;

  /**
   * Active date.
   */
  @State() activeDate = isNaN(Date.parse(this.value)) ? new Date() : new Date(this.value);

  @Watch('value') 
  onNameChanged(newValue: string) {
    if(!isNaN(Date.parse(newValue))){
      this.activeDate = new Date(newValue);
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
    let selectedDate = isNaN(Date.parse(this.value)) ? new Date() : new Date(`${this.value}`);
    return (
      <Host
        role="application"
        expanded={this.showCalendar}
        onBlur={() => this.closeCalendar()}
      >
        <div
          class={`date-input-wrapper ${this.showCalendar ? "expanded" : ""}`}
          role="application"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="calendar-icon"
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <path d="M16 16H0V6h16zM3 7H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 10H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 13H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM5 2V1h6v1zm9-1v1h1v2H1V2h1V1H0v4h16V1zM4 0H3v2h1zm9 0h-1v2h1z" />
          </svg>
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            value={this.value}
            class="date-input"
            onFocus={() => this.expandCalendar()}
            onChange={(e) => { this.setDate(e.target) }}
          />
        </div>
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
              onCalciteDateSelect={evt => this.setDate(evt.target)}
              onCalciteActiveDateChange={evt => this.setActiveDate(evt.target)}
            />
          </div>
        )}
        <slot />
      </Host>
    );
  }

  private setActiveDate(target): void {
    this.activeDate = new Date(target.activeDate);
  }

  private expandCalendar() {
    this.showCalendar = true;
  }

  private closeCalendar() {
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
    // Set date to in dd/mm/yyyy format.
    this.value = isNaN(Date.parse(target.value)) ? target.selectedDate.toISOString().substr(0, 10) : target.value;
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
    this.value = new Intl.DateTimeFormat(this.locale).format(
      new Date(`${this.inputProxy.value} `)
    );
    this.min = this.inputProxy.min;
    this.max = this.inputProxy.max;
  };

  syncProxyInputToThis = () => {
    let date = isNaN(Date.parse(this.value)) ? new Date() : new Date(`${this.value}`);
    this.inputProxy.value = date.toISOString().substr(0, 10);
    this.inputProxy.min = this.min;
    this.inputProxy.max = this.max;
  };
}
