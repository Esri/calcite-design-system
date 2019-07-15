import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  h
} from "@stencil/core";

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
   * Be sure to add a jsdoc comment describing your propery for the generated readme file.
   * If your property should be hidden from documentation, you can use the `@internal` tag
   */
  @Prop() month: number = 0;

  @Prop() year: number = 0;

  @Prop() selectedDate: Date;

  @Prop() min: Date;

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

  @Prop() locale: string = "en-US";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    let weekDays = this.getLocalizedWeekday(),
      curMonDays = [...Array(new Date(this.year, this.month + 1, 0).getDate()).keys()],
      prevMonDays = this.getPrevMonthdays(this.month, this.year),
      nextMonDays = this.getNextMonthdays(this.month, this.year),
      splitDays = [],
      days = [
        ...prevMonDays.map(prev => <calcite-date-day class="day" day={prev} enable={false} /> ),
        ...curMonDays.map(cur => <calcite-date-day day={cur+1} enable={this.validateDate(cur+1)} selected = {cur+1 === this.selectedDate.getDate()} class="day" onCalciteDaySelect={() => this.onSelectDate(cur+1)} />),
        ...nextMonDays.map(next => <calcite-date-day class="day" day={next+1} enable={false} />)
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

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  @Event() calciteDateSelect: EventEmitter;

  private onSelectDate(date): void {
    this.selectedDate = new Date(this.year, this.month, date);
    this.calciteDateSelect.emit();
  }

  private validateDate(day){
    let isValid = true;
    if( this.min ){
      let minYear = this.min.getFullYear();
      let minMonth = this.min.getMonth();
      let minDay = this.min.getDate();
      
      isValid = isValid && (minYear < this.year ? true : minYear === this.year && minMonth < this.month ? true : minMonth === this.month && minDay < day? true: false); 
    }
    if( this.max ){
      let maxYear = this.max.getFullYear();
      let maxMonth = this.max.getMonth();
      let maxDay = this.max.getDate();
      isValid = isValid && (maxYear > this.year ? true : maxYear === this.year && maxMonth > this.month ? true : maxMonth === this.month && maxDay > day? true: false); 
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
