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
import { ENTER } from "../../utils/keys";

@Component({
  tag: "calcite-date",
  styleUrl: "calcite-date.scss",
  shadow: true
})
export class CalciteDate {
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

  selectPrevMonth() {
    if (this.month === 0) {
      this.year = this.year - 1;
    }
    this.month = (12 + this.month - 1) % 12;
  }

  selectPrevMonthOnEnter(event: KeyboardEvent) {
    if (event.keyCode === ENTER) {
      this.selectPrevMonth();
    }
  }

  selectNextMonth() {
    if (this.month === 11) {
      this.year = this.year + 1;
    }
    this.month = (this.month + 1) % 12;
  }

  selectNextMonthOnEnter(event: KeyboardEvent) {
    if (event.keyCode === ENTER) {
      this.selectNextMonth();
    }
  }

  onYearChange(event) {
    this.year = parseInt(event.target.value);
  }

  render() {
    const selectedDate = this.value ? new Date(`${this.value} `) : new Date();
    selectedDate.setMonth(this.month || selectedDate.getMonth());
    selectedDate.setFullYear(this.year || selectedDate.getFullYear());
    return (
      <Host role="application" class={this.showCalendar ? "host-expanded" : ""}>
      <div>
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
        <div onBlur={() => this.closeCalendar()}>
        {this.showCalendar && (
          <div class="calendar-picker-wrapper">
            {this.renderMonths(
              this.getMonth(selectedDate),
              this.getYear(selectedDate)
            )}
            {this.renderCalendar(
              this.getMonth(selectedDate),
              this.getYear(selectedDate),
              selectedDate.getDate()
            )}
          </div>
        )}
        </div>
        </div>
        <slot />
      </Host>
    );
  }

  expandCalendar() {
    this.showCalendar = true;
  }

  closeCalendar() {
    this.showCalendar = false;
  }

  getMonth(date) {
    return this.month === undefined ? date.getMonth() : this.month;
  }

  getYear(date) {
    return this.year === undefined ? date.getFullYear() : this.year;
  }

  getLocalizedMonths() {
    let m = 0,
      months = [],
      date = new Date();
    for (; m < 12; m++) {
      date.setMonth(m);
      months.push(
        new Intl.DateTimeFormat(this.locale, {
          month: "long"
        }).format(date)
      );
    }

    return months;
  }

  getLocalizedWeekday() {
    let w = 1,
      startWeek = [],
      endWeek = [],
      date = new Date();
    for (; w < 8; w++) {
      date.setDate(w);
      let day = new Intl.DateTimeFormat(this.locale, {
        weekday: "short"
      }).format(date);
      date.getDay() === this.startOfWeek || startWeek.length > 0
        ? startWeek.push(day)
        : endWeek.push(day);
    }

    return [...startWeek, ...endWeek];
  }

  renderMonths(month, year) {
    const localizedMonth = this.getLocalizedMonths()[month];

    return (
      <div class="month-year" aria-hidden="true">
        <span
          role="button"
          aria-label={this.prevMonthLabel}
          tabindex={0}
          onClick={() => this.selectPrevMonth()}
          onKeyDown={event => this.selectPrevMonthOnEnter(event)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="left-icon"
            viewBox="0 0 16 16"
            height="16"
            width="16"
          >
            <path d="M11.783 14H9.017l-6-6 6-6h2.766l-6 6z" />
          </svg>
        </span>
        <span class="month" role="heading">
          {localizedMonth}
        </span>
        <input
          role="input"
          tabindex={0}
          class="year"
          type="number"
          value={year}
          style={{ width: `${(`${year}`.length + 1) * 11}px` }}
          onChange={event => this.onYearChange(event)}
        />
        <span
          role="button"
          aria-label={this.nextMonthLabel}
          tabindex={0}
          onClick={() => this.selectNextMonth()}
          onKeyDown={event => this.selectNextMonthOnEnter(event)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="right-icon"
            viewBox="0 0 16 16"
            height="16"
            width="16"
          >
            <path d="M10.217 8l-6-6h2.766l6 6-6 6H4.217z" />
          </svg>
        </span>
      </div>
    );
  }

  getPrevMonthdays(month, year) {
    let startDay = new Date(year, month, 1).getDay(),
      days = [],
      prevMonDays = new Date(year, month, 0).getDate();

    if (startDay === this.startOfWeek) {
      return days;
    }

    for (let i = (6 - this.startOfWeek + startDay) % 7; i >= 0; i--) {
      days.push(prevMonDays - i);
    }

    return days;
  }

  getNextMonthdays(month, year) {
    let endDay = new Date(year, month + 1, 0).getDay(),
      days = [];
    if (endDay === (this.startOfWeek + 6) % 7) {
      return days;
    }

    return [...Array((6 - (endDay - this.startOfWeek)) % 7).keys()];
  }

  renderDay(day, cname, isSelected, callback) {
    return (
      <span
        class={`${cname} day ${isSelected ? "selected-day" : ""}`}
        onClick={() => callback && callback(day)}
        onKeyPress={event => this.keyPress(event, day, callback)}
        role="gridcell"
        tabindex={isSelected ? 0 : -1}
      >
        {day}
      </span>
    );
  }

  keyPress(event, day, callback) {
    if (event.keyCode === ENTER) {
      callback && callback(day);
    }
  }

  renderCalendar(month, year, selectedDate) {
    let weekDays = this.getLocalizedWeekday(),
      curMonDays = [...Array(new Date(year, month + 1, 0).getDate()).keys()],
      prevMonDays = this.getPrevMonthdays(month, year),
      nextMonDays = this.getNextMonthdays(month, year),
      splitDays = [],
      days = [
        ...prevMonDays.map(prev => this.renderDay(prev, "previous-month-day", false, undefined)),
        ...curMonDays.map(cur =>
          this.renderDay(cur + 1, "current-month-day", cur + 1 === selectedDate, this.setDate)
        ),
        ...nextMonDays.map(next => this.renderDay(next + 1, "next-month-day", false, undefined))
      ];

    for (let i = 0; i < days.length; i += 7)
      splitDays.push(days.slice(i, i + 7));

    return (
      <div class="calender" role="grid">
        <div class="week-headers" role="presentation">
          {weekDays.map(weekday => (
            <span class="week-header" role="columnheader">
              {weekday}
            </span>
          ))}
        </div>
        {splitDays.map(days => (
          <div class="week-days" role="row">
            {days}
          </div>
        ))}
      </div>
    );
  }

  setDate(day) {
    this.value = new Date(this.year, this.month, day)
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
