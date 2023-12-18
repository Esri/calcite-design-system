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
  @Prop({ mutable: true }) activeMonthIndex: number;

  /**
   * Emits whenever the component is selected.
   *
   */
  @Event() calciteMonthPickerChange: EventEmitter<void>;

  connectedCallback() {
    connectLocalized(this);
  }

  async componentWillLoad(): Promise<void> {
    await this.loadLocaleData();
  }

  disconnectedCallback() {
    disconnectLocalized(this);
  }

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

  @Listen("calciteInternalMonthPickerItemSelect")
  handleCalciteMonthPickerItemChange(event: CustomEvent<string>): void {
    this.activeMonthIndex = this.localeData?.months.abbreviated.indexOf(event.detail);
    this.calciteMonthPickerChange.emit();
  }

  render(): VNode {
    return (
      <Host>
        <div class="header">
          <div class="year-picker">Year picker</div>
          <calcite-action class="previous" icon="chevron-left" scale="s" text="Previous Month" />
          <calcite-action class="next" icon="chevron-right" scale="s" text="Next Month" />
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
