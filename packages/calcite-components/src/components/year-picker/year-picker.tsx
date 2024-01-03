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
  Method,
} from "@stencil/core";
import {
  LocalizedComponent,
  NumberingSystem,
  connectLocalized,
  disconnectLocalized,
  numberStringFormatter,
} from "../../utils/locale";
import { DateLocaleData, getLocaleData } from "../date-picker/utils";
// import { DateLocaleData } from "../date-picker/utils";

@Component({
  tag: "calcite-year-picker",
  styleUrl: "year-picker.scss",
  shadow: true,
})
export class YearPicker implements LocalizedComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, disables the component */
  @Prop({ reflect: true }) disabled: boolean;

  /** When `true`, disables year's before the earliest allowed year in end year and after the latest year in start year of range. */
  @Prop() disableYearsOutOfRange = false;

  /** Specifies the latest allowed year (`"yyyy"`). */
  @Prop() max = 2100;

  /** Specifies the earliest allowed year (`"yyyy"`). */
  @Prop() min = 1900;

  @Watch("min")
  handleMinChange(value: number): void {
    if (!value) {
      this.min = 1900;
      return;
    }
    this.getYearList();
  }

  @Watch("max")
  handleMaxChange(value: number): void {
    if (!value) {
      this.max = 2100;
      return;
    }
    this.getYearList();
  }

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop({ reflect: true }) numberingSystem: NumberingSystem;

  /** When `true`, activates the component's range mode to allow a start and end year. */
  @Prop() range: boolean;

  /**
   * Specifies the selected year as a string (`"yyyy"`), or an array of strings for `range` values (`["yyyy", "yyyy"]`).
   */
  @Prop({ mutable: true }) value: number | number[];

  @Watch("value")
  handleValueChange(value: number | number[]): void {
    if (Array.isArray(value)) {
      this.startYear = value[0];
      this.endYear = value[1];
    } else if (value) {
      this.startYear = value;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits whenever the component is selected.
   *
   */
  @Event() calciteYearPickerChange: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback() {
    connectLocalized(this);
    if (Array.isArray(this.value)) {
      if (this.range) {
        this.startYear = this.value[0];
        this.endYear = this.value[1];
      }
    } else {
      this.startYear = this.value;
    }
    if (!this.value) {
      this.value = new Date().getFullYear();
    }
    this.getYearList();
  }

  disconnectedCallback() {
    disconnectLocalized(this);
  }

  @Method()
  async prevYear(): Promise<void> {
    if (Array.isArray(this.value)) {
      this.value =
        this.activeRange === "start"
          ? [this.value[0] - 1, this.value[1]]
          : [this.value[0], this.value[1] - 1];
    } else {
      this.value = this.value - 1;
    }
  }

  @Method()
  async nextYear(): Promise<void> {
    // console.log("next year", this.value);
    if (Array.isArray(this.value)) {
      this.value =
        this.activeRange === "start"
          ? [this.value[0] + 1, this.value[1]]
          : [this.value[0], this.value[1] + 1];
    } else {
      this.value = this.value + 1;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteYearPickerElement;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  @Watch("numberingSystem")
  async updateNumberStringFormatter(): Promise<void> {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: false,
    };

    this.localeData = await getLocaleData(this.effectiveLocale);
  }

  @State() yearList: number[] = [];

  private endYear: number;

  private startYear: number;

  private activeRange: "start" | "end" = "start";

  @State() localeData: DateLocaleData;

  // maxValueSelectEl: HTMLCalciteSelectElement;

  // selectEl: HTMLCalciteSelectElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  getYearList(): void {
    this.yearList = [];
    for (let i = this.min; i <= this.max; i++) {
      this.yearList.push(i);
    }
  }

  handleSelectChange = (event: CustomEvent): void => {
    event.stopPropagation();

    this.activeRange = "start";
    const target = event.target as HTMLCalciteSelectElement;
    const newValue = Number(target.value);

    if (this.range && Array.isArray(this.value)) {
      this.value = [newValue, this.value[1]];
      this.startYear = newValue;
    } else {
      this.value = newValue;
    }

    this.calciteYearPickerChange.emit();
  };

  handleEndYearSelectChange = (event: CustomEvent): void => {
    event.stopPropagation();
    const target = event.target as HTMLCalciteSelectElement;
    const newValue = Number(target.value);
    this.activeRange = "end";

    if (Array.isArray(this.value)) {
      this.value = [this.value[0], newValue];
      this.endYear = newValue;
    }

    this.calciteYearPickerChange.emit();
  };

  private isYearSelected(year: number): boolean {
    return !Array.isArray(this.value) ? year === this.value : false;
  }

  // setSelectEl = (el: HTMLCalciteSelectElement): void => {
  //   this.selectEl = el;
  // };

  // setMaxValueSelectEl = (el: HTMLCalciteSelectElement): void => {
  //   this.maxValueSelectEl = el;
  // };

  render(): VNode {
    const suffix = this.localeData?.year?.suffix;
    return (
      <Host>
        <calcite-select
          class={this.range ? "start year" : "year"}
          disabled={this.disabled}
          label={this.range ? "start year" : "year"}
          onCalciteSelectChange={this.handleSelectChange}
          // ref={this.setSelectEl}
        >
          {this.yearList?.map((year: number) => {
            const yearString = year.toString();
            return (
              <calcite-option
                disabled={year > this.endYear && this.disableYearsOutOfRange}
                selected={(this.range && year === this.startYear) || this.isYearSelected(year)}
                value={yearString}
              >
                {numberStringFormatter?.localize(yearString)}
                {suffix}
              </calcite-option>
            );
          })}
        </calcite-select>
        {this.range && (
          <calcite-select
            class="end-year"
            disabled={this.disabled}
            label="end year"
            onCalciteSelectChange={this.handleEndYearSelectChange}
            // ref={this.setMaxValueSelectEl}
          >
            {this.yearList?.map((year: number) => {
              const yearString = year.toString();
              return (
                <calcite-option
                  disabled={year < Number(this.startYear) && this.disableYearsOutOfRange}
                  selected={year === this.endYear}
                  value={yearString}
                >
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
