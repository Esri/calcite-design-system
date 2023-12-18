import {
  Component,
  //   Host,
  VNode,
  h,
  Element,
  Prop,
  State,
  Watch,
  Event,
  EventEmitter,
} from "@stencil/core";
import {
  LocalizedComponent,
  NumberingSystem,
  connectLocalized,
  disconnectLocalized,
  numberStringFormatter,
  //   numberingSystems,
} from "../../utils/locale";
import { DateLocaleData } from "../date-picker/utils";

@Component({
  tag: "calcite-year-picker",
  styleUrl: "year-picker.scss",
  shadow: true,
})
export class YearPicker implements LocalizedComponent {
  @Prop() selectedYear: number;

  @Prop() min = 1900;

  @Prop() max = 2100;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop({ reflect: true }) numberingSystem: NumberingSystem;

  /**
   * Emits whenever the component is selected.
   *
   */
  @Event() calciteYearPickerChange: EventEmitter<void>;

  connectedCallback() {
    connectLocalized(this);
    this.getYearList();
  }

  disconnectedCallback() {
    disconnectLocalized(this);
  }

  @Element() el: HTMLCalciteYearPickerElement;

  @State() effectiveLocale = "";

  @State() localeData: DateLocaleData;

  private yearList: string[] = [];

  @Watch("effectiveLocale")
  @Watch("numberingSystem")
  getYearList(): void {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: false,
    };
    this.yearList = [];
    for (let i = this.min; i < this.max; i++) {
      this.yearList.push(numberStringFormatter?.numberFormatter.format(i));
    }
  }

  render(): VNode {
    return (
      <calcite-select label="year">
        {this.yearList?.map((year: string) => {
          return (
            <calcite-option
              selected={year === numberStringFormatter?.numberFormatter.format(this.selectedYear)}
              value={year}
            >
              {year}
            </calcite-option>
          );
        })}
      </calcite-select>
    );
  }
}
