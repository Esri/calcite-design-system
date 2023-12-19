import {
  Component,
  VNode,
  h,
  Element,
  Prop,
  State,
  Watch,
  Event,
  EventEmitter,
  Host,
} from "@stencil/core";
import {
  LocalizedComponent,
  NumberingSystem,
  connectLocalized,
  disconnectLocalized,
  numberStringFormatter,
} from "../../utils/locale";
import { DateLocaleData } from "../date-picker/utils";

@Component({
  tag: "calcite-year-picker",
  styleUrl: "year-picker.scss",
  shadow: true,
})
export class YearPicker implements LocalizedComponent {
  @Prop({ mutable: true }) value: string;

  @Prop({ mutable: true }) maxValue: string;

  @Prop({ mutable: true }) minValue: string;

  @Prop() min = 1900;

  @Prop() max = 2100;

  @Prop() range: boolean;

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

  private yearList: number[] = [];

  selectEl: HTMLCalciteSelectElement;

  maxValueSelectEl: HTMLCalciteSelectElement;

  @Watch("effectiveLocale")
  @Watch("numberingSystem")
  updateNumberStringFormatter(): void {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: false,
    };
  }

  getYearList(): void {
    this.yearList = [];
    for (let i = this.min; i < this.max; i++) {
      this.yearList.push(i);
    }
  }

  handleSelectChange = (event: CustomEvent): void => {
    event.stopPropagation();
    const target = event.target as HTMLCalciteSelectElement;
    const newValue = target.value;
    if (this.range) {
      this.minValue = newValue;
    } else {
      this.value = newValue;
    }

    this.calciteYearPickerChange.emit();
  };

  handleMaxValueSelectChange = (event: CustomEvent): void => {
    event.stopPropagation();
    const target = event.target as HTMLCalciteSelectElement;
    this.maxValue = target.value;
    this.calciteYearPickerChange.emit();
  };

  setSelectEl = (el: HTMLCalciteSelectElement): void => {
    this.selectEl = el;
  };

  setMaxValueSelectEl = (el: HTMLCalciteSelectElement): void => {
    this.maxValueSelectEl = el;
  };

  render(): VNode {
    return (
      <Host>
        <calcite-select
          class="start-year"
          label={this.range ? "start year" : "year"}
          onCalciteSelectChange={this.handleSelectChange}
          ref={this.setSelectEl}
        >
          {this.yearList?.map((year: number) => {
            const yearString = year.toString();
            return (
              <calcite-option
                selected={yearString === (this.range ? this.minValue : this.value)}
                value={yearString}
              >
                {numberStringFormatter?.localize(yearString)}
              </calcite-option>
            );
          })}
        </calcite-select>
        {this.range && (
          <calcite-select
            class="end-year"
            label="end year"
            onCalciteSelectChange={this.handleMaxValueSelectChange}
            ref={this.setMaxValueSelectEl}
          >
            {this.yearList?.map((year: number) => {
              const yearString = year.toString();
              return (
                <calcite-option selected={yearString === this.maxValue} value={yearString}>
                  {numberStringFormatter?.localize(yearString)}
                </calcite-option>
              );
            })}
          </calcite-select>
        )}
      </Host>
    );
  }
}
