import {
  Component,
  Host,
  VNode,
  h,
  Element,
  Prop,
  State,
  Watch,
  Build,
  Listen,
  Event,
  EventEmitter,
} from "@stencil/core";
import { LocalizedComponent, connectLocalized, disconnectLocalized } from "../../utils/locale";
import { DateLocaleData, getLocaleData } from "../date-picker/utils";

@Component({
  tag: "calcite-month-picker",
  styleUrl: "month-picker.scss",
  shadow: true,
})
export class MonthPicker implements LocalizedComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ mutable: true }) activeMonthIndex: number;

  /** Already selected date. */
  @Prop() selectedMonthYear: Date;

  /** Focused date with indicator (will become selected date if user proceeds) */
  @Prop() activeDate: Date;

  /** Specifies the earliest allowed date (`"yyyy-mm-dd"`). */
  @Prop() min: Date;

  /** Specifies the latest allowed date (`"yyyy-mm-dd"`). */
  @Prop() max: Date;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits whenever the component is selected.
   *
   */
  @Event() calciteMonthPickerChange: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback() {
    connectLocalized(this);
  }

  async componentWillLoad(): Promise<void> {
    await this.loadLocaleData();
  }

  disconnectedCallback() {
    disconnectLocalized(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteMonthPickerElement;

  @State() effectiveLocale = "";

  @State() localeData: DateLocaleData;

  @Watch("effectiveLocale")
  private async loadLocaleData(): Promise<void> {
    if (!Build.isBrowser) {
      return;
    }

    this.localeData = await getLocaleData(this.effectiveLocale);
  }

  yearPickerEl: HTMLCalciteYearPickerElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalMonthPickerItemSelect")
  handleCalciteMonthPickerItemChange(event: CustomEvent<string>): void {
    this.activeMonthIndex = this.localeData?.months.abbreviated.indexOf(event.detail);
    this.calciteMonthPickerChange.emit();
  }

  handlePreviousYear = (): void => {
    this.yearPickerEl.prevYear();
  };

  handleNextYear = (): void => {
    console.log("next year");
    this.yearPickerEl.nextYear();
  };

  setYearPickerEl = (el: HTMLCalciteYearPickerElement): void => {
    this.yearPickerEl = el;
  };

  render(): VNode {
    return (
      <Host>
        <div class="header">
          <calcite-year-picker ref={this.setYearPickerEl} />
          <calcite-action
            class="previous"
            icon="chevron-left"
            onClick={this.handlePreviousYear}
            scale="s"
            text="Previous Month"
          />
          <calcite-action
            class="next"
            icon="chevron-right"
            onClick={this.handleNextYear}
            scale="s"
            text="Next Month"
          />
        </div>
        {this.localeData?.months.abbreviated.map((month, index) => (
          <calcite-month-picker-item
            class="month-items"
            isActive={index === this.activeMonthIndex}
            key={index}
            value={month}
          />
        ))}
      </Host>
    );
  }
}
