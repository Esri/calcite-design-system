import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  h,
  Listen
} from "@stencil/core";
import {
  LEFT,
  RIGHT,
  UP,
  DOWN,
  PAGE_UP,
  PAGE_DOWN,
  HOME,
  END,
  ENTER,
  SPACE,
  ESCAPE
} from "../../utils/keys";

@Component({
  tag: "calcite-date-month",
  styleUrl: "calcite-date-month.scss",
  shadow: true
})
export class CalciteDateMonth {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Month number starting 0 as January for which the calendar is shown.
   */
  @Prop() month: number = 0;
  /**
   * Year for which the calendar is shown.
   */
  @Prop() year: number = 0;
  /**
   * Already selected date.
   */
  @Prop() selectedDate: Date;
  /**
   * Date currently active.
   */
  @Prop() activeDate: Date;
  /**
   * Minimum date of the calendar below which is disabled.
   */
  @Prop() min: Date;
  /**
   * Maximum date of the calendar above which is disabled.
   */
  @Prop() max: Date;
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
  @Prop() startOfWeek: number = 0;
  /**
   * pass the locale in which user wants to show the date.
   */
  @Prop() locale: string = "en-US";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   * Event emitted when user selects the date.
   */
  @Event() calciteDateSelect: EventEmitter;
  /**
   * Active date for the user keyboard access.
   */
  @Event() calciteActiveDateChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    let weekDays = this.getLocalizedWeekday(),
      curMonDays = [
        ...Array(new Date(this.year, this.month + 1, 0).getDate()).keys()
      ],
      prevMonDays = this.getPrevMonthdays(this.month, this.year),
      nextMonDays = this.getNextMonthdays(this.month, this.year),
      splitDays = [],
      days = [
        ...prevMonDays.map(prev => (
          <calcite-date-day day={prev} enable={false} />
        )),
        ...curMonDays.map(cur => (
          <calcite-date-day
            day={cur + 1}
            enable={this.validateDate(cur + 1, this.month, this.year)}
            selected={this.isSelectedDate(this.year, this.month, cur + 1)}
            active={this.activeDate.getDate() === cur + 1}
            onCalciteDaySelect={() => this.onSelectDate(cur + 1)}
          />
        )),
        ...nextMonDays.map(next => (
          <calcite-date-day day={next + 1} enable={false} />
        ))
      ];

    for (let i = 0; i < days.length; i += 7)
      splitDays.push(days.slice(i, i + 7));

    return (
      <Host>
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
      </Host>
    );
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    switch (e.keyCode) {
      case UP:
        e.preventDefault();
        this.addDaysToActiveDate(-7);
        break;
      case RIGHT:
        e.preventDefault();
        this.addDaysToActiveDate(1);
        break;
      case DOWN:
        e.preventDefault();
        this.addDaysToActiveDate(7);
        break;
      case LEFT:
        e.preventDefault();
        this.addDaysToActiveDate(-1);
        break;
      case PAGE_UP:
        e.preventDefault();
        this.addMonthToActiveDate(-1);
        break;
      case PAGE_DOWN:
        e.preventDefault();
        this.addMonthToActiveDate(1);
        break;
      case HOME:
        e.preventDefault();
        this.activeDate.setDate(1);
        this.addDaysToActiveDate();
        break;
      case END:
        e.preventDefault();
        this.activeDate.setDate(
          new Date(
            this.activeDate.getFullYear(),
            this.activeDate.getMonth() + 1,
            0
          ).getDate()
        );
        this.addDaysToActiveDate();
        break;
      case ENTER:
      case SPACE:
        e.preventDefault();
        this.selectedDate = new Date(this.activeDate);
        this.calciteDateSelect.emit();
        break;
      case ESCAPE:
        e.preventDefault();
        this.activeDate = new Date(this.selectedDate);
        this.calciteActiveDateChange.emit();
        break;
    }
  }

  @Listen("mouseover") mouseoverHandler(e) {
    let day = e.target.day || this.activeDate.getDate();
    if(!e.target.enable) return;
    if (day != this.activeDate.getDate()) {
      let [activeDay, activeMonth, activeYear] = [
        day,
        this.activeDate.getMonth(),
        this.activeDate.getFullYear()
      ];
      if (this.validateDate(activeDay, activeMonth, activeYear)) {
        this.activeDate = new Date(activeYear, activeMonth, activeDay);
        this.calciteActiveDateChange.emit();
      }
    }
  }

  private addMonthToActiveDate(step) {
    let [activeDay, activeMonth, activeYear] = [
      this.activeDate.getDate(),
      this.activeDate.getMonth(),
      this.activeDate.getFullYear()
    ];
    activeMonth += step;
    if (activeMonth === 12) {
      activeMonth = 0;
      activeYear += 1;
    }
    if (activeMonth === -1) {
      activeMonth = 11;
      activeYear -= 1;
    }
    if (this.validateDate(activeDay, activeMonth, activeYear)) {
      this.activeDate = new Date(activeYear, activeMonth, activeDay);
      this.calciteActiveDateChange.emit();
    }
  }

  private addDaysToActiveDate(step: number = 0) {
    let [activeDay, activeMonth, activeYear] = [
      this.activeDate.getDate(),
      this.activeDate.getMonth(),
      this.activeDate.getFullYear()
    ];
    activeDay += step;
    let noOfDaysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
    let noOfDaysInPrevMonth = new Date(activeYear, activeMonth, 0).getDate();
    if (activeDay > noOfDaysInMonth) {
      activeDay -= noOfDaysInMonth;
      activeMonth += 1;
      if (activeMonth === 12) {
        activeMonth = 0;
        activeYear += 1;
      }
    }
    if (activeDay < 0) {
      activeDay = noOfDaysInPrevMonth + activeDay;
      activeMonth -= 1;
      if (activeMonth === -1) {
        activeMonth = 11;
        activeYear -= 1;
      }
    }
    if (this.validateDate(activeDay, activeMonth, activeYear)) {
      this.activeDate = new Date(activeYear, activeMonth, activeDay);
      this.calciteActiveDateChange.emit();
    }
  }

  private onSelectDate(date): void {
    this.selectedDate = new Date(this.year, this.month, date);
    this.calciteDateSelect.emit();
  }

  private isSelectedDate(year, month, day) {
    let date = new Date(year, month, day);
    return date.toDateString() === this.selectedDate.toDateString();
  }

  private validateDate(day, month, year) {
    let isValid = true;
    if (this.min) {
      let minYear = this.min.getFullYear();
      let minMonth = this.min.getMonth();
      let minDay = this.min.getDate();

      isValid =
        isValid &&
        (minYear < year
          ? true
          : minYear === year && minMonth < month
          ? true
          : minMonth === month && minDay < day
          ? true
          : false);
    }
    if (this.max) {
      let maxYear = this.max.getFullYear();
      let maxMonth = this.max.getMonth();
      let maxDay = this.max.getDate();
      isValid =
        isValid &&
        (maxYear > year
          ? true
          : maxYear === year && maxMonth > month
          ? true
          : maxMonth === month && maxDay > day
          ? true
          : false);
    }
    return isValid;
  }

  private getPrevMonthdays(month, year) {
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

  private getNextMonthdays(month, year) {
    let endDay = new Date(year, month + 1, 0).getDay(),
      days = [];
    if (endDay === (this.startOfWeek + 6) % 7) {
      return days;
    }

    return [...Array((6 - (endDay - this.startOfWeek)) % 7).keys()];
  }

  private getLocalizedWeekday() {
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
}
