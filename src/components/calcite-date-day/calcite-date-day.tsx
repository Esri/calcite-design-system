import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h,
} from "@stencil/core";

@Component({
  tag: "calcite-date-day",
  styleUrl: "calcite-date-day.scss",
  shadow: true,
})
export class CalciteDateDay {
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

  /** Day of the month to be shown. */
  @Prop() day: number;
  /** Date is outside of range and can't be selected */
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Date is in the current month. */
  @Prop({ reflect: true }) currentMonth: boolean = false;
  /** Date is the current selected date of the picker */
  @Prop({ reflect: true }) selected: boolean = false;
  /** Date is actively in focus for keyboard navigation */
  @Prop({ reflect: true }) active: boolean = false;
  /** Locale to display the day in */
  @Prop() locale: string;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick() {
    !this.disabled && this.calciteDaySelect.emit();
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    if (e.key === " " || e.key === "Enter") {
      !this.disabled && this.calciteDaySelect.emit();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when user selects day
   */
  @Event() calciteDaySelect: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const intl = new Intl.NumberFormat(this.locale);
    return (
      <Host role="gridcell" tabindex={this.selected || this.active ? 0 : -1}>
        <span class="day">{intl.format(this.day)}</span>
      </Host>
    );
  }
}
