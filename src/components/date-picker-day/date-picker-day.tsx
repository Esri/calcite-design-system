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

import { closestElementCrossShadowBoundary, getElementDir } from "../../utils/dom";
import { Scale } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { numberStringFormatter } from "../../utils/locale";

@Component({
  tag: "calcite-date-picker-day",
  styleUrl: "date-picker-day.scss",
  shadow: true
})
export class DatePickerDay implements InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDatePickerDayElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Day of the month to be shown. */
  @Prop() day!: number;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** Date is in the current month. */
  @Prop({ reflect: true }) currentMonth = false;

  /**  When `true`, the component is selected. */
  @Prop({ reflect: true }) selected = false;

  /** Date is currently highlighted as part of the range */
  @Prop({ reflect: true }) highlighted = false;

  /** When `true`, activates the component's range mode to allow a start and end date. */
  @Prop({ reflect: true }) range = false;

  /** Date is the start of date range */
  @Prop({ reflect: true }) startOfRange = false;

  /** Date is the end of date range */
  @Prop({ reflect: true }) endOfRange = false;

  /** Date is being hovered and within the set range */
  @Prop({ reflect: true }) rangeHover = false;

  /** When `true`, the component is active. */
  @Prop({ reflect: true }) active = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale;

  /** The component's value. */
  @Prop() value: Date;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  onClick = (): void => {
    !this.disabled && this.calciteDaySelect.emit();
  };

  keyDownHandler = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      !this.disabled && this.calciteDaySelect.emit();
      event.preventDefault();
    }
  };

  @Listen("pointerover")
  mouseoverHandler(): void {
    this.calciteInternalDayHover.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when user selects day
   */
  @Event({ cancelable: false }) calciteDaySelect: EventEmitter<void>;

  /**
   * Emitted when user hovers over a day
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalDayHover: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.parentDatePickerEl = closestElementCrossShadowBoundary(
      this.el,
      "calcite-date-picker"
    ) as HTMLCalciteDatePickerElement;
  }

  render(): VNode {
    if (this.parentDatePickerEl) {
      const { numberingSystem, lang: locale } = this.parentDatePickerEl;

      numberStringFormatter.numberFormatOptions = {
        useGrouping: false,
        ...(numberingSystem && { numberingSystem }),
        ...(locale && { locale })
      };
    }
    const formattedDay = numberStringFormatter.localize(String(this.day));
    const dir = getElementDir(this.el);
    return (
      <Host onClick={this.onClick} onKeyDown={this.keyDownHandler} role="gridcell">
        <div class={{ "day-v-wrapper": true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
          <div class="day-wrapper">
            <span class="day">
              <span class="text">{formattedDay}</span>
            </span>
          </div>
        </div>
      </Host>
    );
  }

  componentDidRender(): void {
    updateHostInteraction(this, this.isTabbable);
  }

  isTabbable(): boolean {
    return this.active;
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private parentDatePickerEl: HTMLCalciteDatePickerElement;
}
