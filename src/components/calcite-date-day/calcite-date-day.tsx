import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h,
  VNode
} from "@stencil/core";
import { getKey } from "../../utils/key";
import { DateLocaleData } from "../calcite-date/utils";

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

  /**
   * CLDR data for current locale
   *
   * @internal
   */
  @Prop() localeData: DateLocaleData;

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l";

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(): void {
    !this.disabled && this.calciteDaySelect.emit();
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent): void {
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
  render(): VNode {
    const formattedDay = String(this.day)
      .split("")
      .map((i) => this.localeData.numerals[i])
      .join("");
    return (
      <Host role="gridcell" tabindex={this.selected || this.active ? 0 : -1}>
        <span class="day">
          <span class="text">{formattedDay}</span>
        </span>
      </Host>
    );
  }
}
