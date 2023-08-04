import { Component, Element, Fragment, h, Host, Prop, State, VNode, Watch } from "@stencil/core";
import { Appearance, Scale } from "../interfaces";
import { CSS } from "./resources";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";

import { MeterMessages } from "./assets/meter/t9n";

import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";

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
  assetsDirs: ["assets"],
})
export class Meter implements LoadableComponent, LocalizedComponent, T9nComponent {
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

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: MeterMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<MeterMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

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

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    this.calculateValues();
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
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

  @State() lowActive: boolean;

  @State() highActive: boolean;

  @State() currentPercent: number;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: MeterMessages;

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
    this.lowActive = !!low && low > value && low > min && (!high || low < high);
    this.highActive = !!high && high > value && high < max && (!low || high > low);
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderMeterFill(): VNode {
    const { currentPercent, fillType } = this;
    const kind = this.getMeterKind();
    return (
      <div
        class={{ [CSS.meterFill]: true, [kind]: fillType !== "single" }}
        style={{ width: `${currentPercent}%` }}
      />
    );
  }

  renderValueLabel(): VNode {
    const { currentPercent, labelType, unitLabel, value } = this;
    const isPercent = labelType === "percent";
    const labelValue = this.formatLabel(isPercent ? currentPercent / 100 : value || 0);
    const valuePosition = currentPercent > 100 ? 100 : currentPercent > 0 ? currentPercent : 0;
    return <Fragment>{this.renderRangeLabel(valuePosition, labelValue, unitLabel, true)}</Fragment>;
  }

  renderRangeLabels(): VNode {
    const {
      high,
      highPercent,
      labelType,
      low,
      lowPercent,
      max,
      maxPercent,
      min,
      minPercent,
      unitLabel,
      lowActive,
      highActive,
    } = this;
    const isPercent = labelType === "percent";
    const labelMin = this.formatLabel(isPercent ? minPercent : min);
    const labelMax = this.formatLabel(isPercent ? maxPercent / 100 : max);
    const labelLow = low ? this.formatLabel(isPercent ? lowPercent / 100 : low) : undefined;
    const labelHigh = high ? this.formatLabel(isPercent ? highPercent / 100 : high) : undefined;
    const swapThreshold = 0.85;
    const proximityThreshold = 0.15;
    const swapLow = (highPercent - lowPercent) / 100 < proximityThreshold;
    const swapHigh = highPercent / 100 >= swapThreshold;
    return (
      <Fragment>
        {this.renderRangeLabel(minPercent, labelMin, unitLabel)}
        {lowActive && this.renderRangeLabel(lowPercent, labelLow, undefined, false, swapLow)}
        {highActive && this.renderRangeLabel(highPercent, labelHigh, undefined, false, swapHigh)}
        {this.renderRangeLabel(maxPercent, labelMax, undefined, false, true)}
      </Fragment>
    );
  }

  /**
   *
   * @param position
   * @param value
   * @param label
   * @param isValue
   * @param flip
   * @returns
   */

  renderRangeLabel(
    position: number,
    value: string,
    label?: string,
    isValue?: boolean,
    flip?: boolean
  ): VNode {
    const labelClass = isValue ? CSS.meterLabelValue : CSS.meterLabelRange;
    const styleDefault = { insetInlineStart: `${position}%` };
    const styleFlipped = { insetInlineEnd: `${100 - position}%` };
    const style = flip ? styleFlipped : styleDefault;
    return (
      <div class={{ [CSS.meterLabel]: true, [labelClass]: true }} style={style}>
        {value}
        {label && this.unitLabel && this.labelType !== "percent" && (
          <span class={CSS.meterUnitLabel}>&nbsp;{label}</span>
        )}
      </div>
    );
  }

  /**
   *
   * @param position
   * @returns
   */

  renderRangeLine(position: number): VNode {
    const style = { insetInlineStart: `${position}%` };
    return (
      <div class={{ [CSS.meterStepLine]: true, [CSS.meterLabelContainer]: true }} style={style} />
    );
  }

  render(): VNode {
    const {
      appearance,
      currentPercent,
      rangeLabels,
      valueLabel,
      highPercent,
      label,
      labelType,
      lowPercent,
      max,
      maxPercent,
      messages,
      min,
      minPercent,
      unitLabel,
      value,
      lowActive,
      highActive,
    } = this;
    const isPercent = labelType === "percent";
    const textPercentLabel = `${currentPercent} ${messages.percent}`;
    const textUnitLabel = `${value} ${unitLabel}`;
    const valueText = isPercent ? textPercentLabel : unitLabel ? textUnitLabel : undefined;
    return (
      <Host>
        <div
          aria-label={label}
          aria-valuemax={isPercent ? maxPercent : max}
          aria-valuemin={isPercent ? minPercent : min}
          aria-valuenow={isPercent ? currentPercent : value}
          aria-valuetext={valueText}
          class={{
            [CSS.meter]: true,
            [CSS.meterStepsVisible]: rangeLabels,
            [CSS.meterValueVisible]: valueLabel,
            [appearance]: appearance !== "outline-fill",
          }}
          role="meter"
        >
          {this.renderMeterFill()}
          {valueLabel && this.renderValueLabel()}
          {lowActive && this.renderRangeLine(lowPercent)}
          {highActive && this.renderRangeLine(highPercent)}
          {rangeLabels && this.renderRangeLabels()}
        </div>
      </Host>
    );
  }
}
