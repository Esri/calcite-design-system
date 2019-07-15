import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  EventEmitter,
  State
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

  @Prop() prevMonthLabel?: string = "";
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

  @Prop() locale?: string = "en-US";

  /**
   * @todo document what gets passed to the handler for these events
   */
  @Event() calciteDateChange: EventEmitter;

  observer: MutationObserver;
  @State() month: number = new Date(this.value).getMonth();
  @State() year: number = new Date(this.value).getFullYear();
  @State() showCalendar: boolean = false;

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
    const selectedDate = this.value ? new Date(`${this.value} `) : new Date();
    selectedDate.setMonth(this.month || selectedDate.getMonth());
    selectedDate.setFullYear(this.year || selectedDate.getFullYear());
    return (
      <Host role="application" expanded = {this.showCalendar} onBlur={() => this.closeCalendar()}>
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
          />
        </div>
        {this.showCalendar && (
          <div class="calendar-picker-wrapper">
            <calcite-date-month-header
              month={this.getMonth(selectedDate)}
              year={this.getYear(selectedDate)}
              selectedDate={selectedDate}
              prevMonthLabel={this.prevMonthLabel}
              nextMonthLabel={this.nextMonthLabel}
              locale={this.locale}
              min = {this.min ? new Date(this.min) : null}
              max = {this.max ? new Date(this.max) : null}
              onCalciteMonthChange = {(evt) => this.setMonth(evt.target)}
              onCalciteYearChange = {(evt) => this.setYear(evt.target)}
            />
            <calcite-date-month
              month={this.getMonth(selectedDate)}
              year={this.getYear(selectedDate)}
              min = {this.min ? new Date(this.min) : null}
              max = {this.max ? new Date(this.max) : null}
              selectedDate={selectedDate}
              startOfWeek={this.startOfWeek}
              locale={this.locale}
              onCalciteDateSelect={(evt) => this.setDate(evt.target)}
            />
          </div>
        )}
        <slot />
      </Host>
    );
  }

  private expandCalendar() {
    this.showCalendar = true;
  }

  private closeCalendar() {
    this.showCalendar = true;
  }

  private getMonth(date) {
    return this.month === undefined ? date.getMonth() : this.month;
  }

  private getYear(date) {
    return this.year === undefined ? date.getFullYear() : this.year;
  }

  private setMonth(target) {
    this.month = target.month;
  }

  private setYear(target) {
    this.year = target.year;
  }

  private setDate(target) {
    this.value = target.selectedDate
      .toISOString()
      .substr(0, 10);
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
    this.observer = new MutationObserver(this.syncThisToProxyInput);
    this.observer.observe(this.inputProxy, { attributes: true });
  }

  syncThisToProxyInput = () => {
    this.value = new Intl.DateTimeFormat(this.locale).format(
      new Date(`${this.inputProxy.value} `)
    );
    this.min = this.inputProxy.min;
    this.max = this.inputProxy.max;
  };

  syncProxyInputToThis = () => {
    this.inputProxy.value = new Date(`${this.value} `)
      .toISOString()
      .substr(0, 10);
    this.inputProxy.min = this.min;
    this.inputProxy.max = this.max;
  };
}
