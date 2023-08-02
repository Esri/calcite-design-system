import { Component, Element, Fragment, h, Host, Prop, State, VNode, Watch } from "@stencil/core";
import { Appearance, Scale } from "../interfaces";
import { CSS } from "./resources";

import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
} from "../../utils/locale";

@Component({
  tag: "calcite-meter",
  styleUrl: "meter.scss",
  shadow: true,
})
export class Meter implements LocalizedComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteMeterElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  /**  Accessible name for the component. */
  @Prop() label!: string;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the current value of the component. */
  @Prop() value: number;

  /** Specifies the lowest allowed value of the component. */
  @Prop({ reflect: true }) min = 0;

  /** Specifies the highest allowed value of the component. */
  @Prop({ reflect: true }) max = 100;

  /** Specifies a low value.  When `fillType` is `"range"`, displays a different color when above the specified threshold.  */
  @Prop({ reflect: true }) low: number;

  /** Specifies a high value.  When `fillType` is `"range"`, displays a different color when above the specified threshold.  */
  @Prop({ reflect: true }) high: number;

  /** Specifies the component's display, where `"single"` displays a single color and `"range"` displays a range of colors based on provided `low`, `high`, `min` or `max` values. */
  @Prop({ reflect: true }) fillType: "single" | "range" = "range";

  /** Specifies the Unicode numeral system used by the component for localization. */
  @Prop() numberingSystem: NumberingSystem;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @Prop({ reflect: true }) groupSeparator = false;

  /** Specifies the appearance style of the component. */
  @Prop() appearance: Extract<"outline" | "outline-fill" | "solid", Appearance> = "outline-fill";

  /** When either `valueLabel` and/or `rangeLabels` are `true`, specifies the format of displayed labels. */
  @Prop({ reflect: true }) labelType: "percent" | "units" = "percent";

  /** When `labelType` is `"units"` and either `valueLabel` or `rangeLabels` are `true`, displays beside the `value` and/or  `min` values. */
  @Prop() unitLabel: "";

  /** When `true`, displays the values of `high`, `low`, `min`, and `max`. */
  @Prop() rangeLabels: boolean;

  /** When `true`, displays the current value. */
  @Prop() valueLabel: boolean;

  @Watch("min")
  @Watch("max")
  @Watch("low")
  @Watch("high")
  @Watch("value")
  handleRangeChange(): void {
    this.calculateValues();
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback(): void {
    connectLocalized(this);
    this.calculateValues();
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private minPercent = 0;

  private maxPercent = 100;

  @State() lowPercent: number;

  @State() highPercent: number;

  @State() currentPercent: number;

  @State() effectiveLocale = "";

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getMeterKind(): string {
    const { low, high, min, max, value } = this;
    const lowest = low ? low : min;
    const highest = high ? high : max;
    const aboveLowest = value >= lowest;
    const belowLowest = value < lowest;
    const aboveHighest = value >= highest;
    const belowHighest = value < highest;

    if (!value || (!low && belowHighest) || belowLowest) {
      return CSS.success;
    } else if (aboveLowest && belowHighest) {
      return CSS.warning;
    } else if (aboveHighest) {
      return CSS.danger;
    }
  }

  /**
   * Returns a string representing the localized label value based if the groupSeparator prop is parsed.
   *
   * @param value
   * @param percent
   * @returns
   */

  private formatLabel = (value: number, percent?: boolean): string => {
    if (typeof value === "number" && !percent && this.labelType !== "percent") {
      numberStringFormatter.numberFormatOptions = {
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
      };
      return numberStringFormatter.localize(value.toString());
    } else if (typeof value === "number" && this.labelType === "percent") {
      // todo use number string formatter helper when updated
      return Intl.NumberFormat(this.effectiveLocale, {
        style: "percent",
      }).format(value);
    }
  };

  private calculateValues() {
    const { low, high, min, max, value } = this;
    const lowPercent = (100 * (low - min)) / (max - min);
    const highPercent = (100 * (high - min)) / (max - min);
    const currentPercent = (100 * (value - min)) / (max - min);
    this.lowPercent = Math.round(lowPercent);
    this.highPercent = Math.round(highPercent);
    this.currentPercent = value ? Math.round(currentPercent) : 0;
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  /**
   *
   * @param position
   * @param value
   * @param line
   * @param label
   * @param isValue
   * @returns
   */

  private renderRange(
    position: number,
    value: string,
    line?: boolean,
    label?: string,
    isValue?: boolean
  ): VNode {
    const labelClass = isValue ? CSS.meterLabelValue : CSS.meterLabelRange;
    const style = { insetInlineStart: `${position}%` };
    return (
      <Fragment>
        {line && (
          <div
            class={{ [CSS.meterStepLine]: true, [CSS.meterLabelContainer]: true }}
            style={style}
          />
        )}
        {(this.rangeLabels || isValue) && (
          <div class={{ [CSS.meterLabel]: true, [labelClass]: true }} style={style}>
            {value}
            {label && this.unitLabel && this.labelType !== "percent" && (
              <span class={CSS.meterUnitLabel}>&nbsp;{label}</span>
            )}
          </div>
        )}
      </Fragment>
    );
  }

  render(): VNode {
    const {
      appearance,
      currentPercent,
      rangeLabels,
      valueLabel,
      fillType,
      high,
      highPercent,
      label,
      labelType,
      low,
      lowPercent,
      max,
      maxPercent,
      min,
      minPercent,
      unitLabel,
      value,
    } = this;
    const kind = this.getMeterKind();
    const isPercent = labelType === "percent";
    const labelMin = this.formatLabel(isPercent ? minPercent : min);
    const labelMax = this.formatLabel(isPercent ? maxPercent / 100 : max);
    const labelLow = low ? this.formatLabel(isPercent ? lowPercent / 100 : low) : undefined;
    const labelHigh = high ? this.formatLabel(isPercent ? highPercent / 100 : high) : undefined;
    const labelValue = this.formatLabel(isPercent ? currentPercent / 100 : value || 0);
    const valuePosition = currentPercent > 100 ? 100 : currentPercent > 0 ? currentPercent : 0;
    const displayLow = !!low && low > value && low > min && (!high || low < high);
    const displayHigh = !!high && high > value && high < max && (!low || high > low);
    const textPercentLabel = `${currentPercent} percent`;
    const textUnitLabel = `${value} ${unitLabel}`;
    const valueText = isPercent ? textPercentLabel : unitLabel ? textUnitLabel : undefined;
    console.log(minPercent);
    return (
      <Host>
        <div
          aria-label={label}
          aria-valuemax={isPercent ? maxPercent : max}
          aria-valuemin={isPercent ? minPercent : min}
          aria-valuenow={isPercent ? currentPercent : value}
          // todo translate "percent"
          aria-valuetext={valueText}
          class={{
            [CSS.meter]: true,
            [CSS.meterStepsVisible]: rangeLabels,
            [CSS.meterValueVisible]: valueLabel,
            [appearance]: appearance !== "outline-fill",
          }}
          role="meter"
        >
          <div
            class={{ [CSS.meterFill]: true, [kind]: fillType !== "single" }}
            style={{ width: `${currentPercent}%` }}
          />
          {valueLabel && this.renderRange(valuePosition, labelValue, false, unitLabel, true)}
          {rangeLabels && (
            <Fragment>
              {this.renderRange(minPercent, labelMin, false, unitLabel)}
              {displayLow && this.renderRange(lowPercent, labelLow, true)}
              {displayHigh && this.renderRange(highPercent, labelHigh, true)}
              {this.renderRange(maxPercent, labelMax, false)}
            </Fragment>
          )}
        </div>
      </Host>
    );
  }
}
