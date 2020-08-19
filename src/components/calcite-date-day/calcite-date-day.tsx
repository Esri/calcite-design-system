import { Component, Element, Prop, Host, Event, EventEmitter, Listen, h } from "@stencil/core";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-date-day",
  styleUrl: "calcite-date-day.scss",
  shadow: true
})
export class CalciteDateDay {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDateDayElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Day of the month to be shown. */
  @Prop() day: number;

  /** Date is outside of range and can't be selected */
  @Prop({ reflect: true }) disabled = false;

  /** Date is in the current month. */
  @Prop({ reflect: true }) currentMonth = false;

  /** Date is the current selected date of the picker */
  @Prop({ reflect: true }) selected = false;

  /** Date is actively in focus for keyboard navigation */
  @Prop({ reflect: true }) active = false;

  /** Locale to display the day in */
  @Prop() locale: string;

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l";

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick() {
    !this.disabled && this.calciteDaySelect.emit();
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    const key = getKey(e.key);
    if (key === " " || key === "Enter") {
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
        <span class="day">
          <span class="text">{intl.format(this.day)}</span>
        </span>
      </Host>
    );
  }
}
