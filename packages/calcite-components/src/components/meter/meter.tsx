import { Component, Element, h, Host, Prop, State, VNode, Watch } from "@stencil/core";
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
import { intersects } from "../../utils/dom";
import { createObserver } from "../../utils/observers";

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
    this.determineVisibleLabels();
  }

  @Watch("unitLabel")
  handleUnitLabelChange(): void {
    this.determineVisibleLabels();
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
    this.resizeObserver?.observe(this.el);
    this.determineVisibleLabels();
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  resizeObserver = createObserver("resize", () => this.resizeHandler());

  private minLabelEl: HTMLDivElement;

  private lowLabelEl: HTMLDivElement;

  private highLabelEl: HTMLDivElement;

  private maxLabelEl: HTMLDivElement;

  private labelFlipMax = 0.85;

  private labelFlipProximity = 0.15;

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
  resizeHandler = (): void => this.determineVisibleLabels();

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

  private comparePosition(el1: HTMLDivElement, el2: HTMLDivElement) {
    return intersects(el1.getBoundingClientRect(), el2.getBoundingClientRect());
  }

  private determineVisibleLabels() {
    const { minLabelEl, lowLabelEl, highLabelEl, maxLabelEl } = this;

    if (minLabelEl && lowLabelEl) {
      lowLabelEl.hidden = this.comparePosition(minLabelEl, lowLabelEl);
    }
    if (minLabelEl && !lowLabelEl && highLabelEl) {
      highLabelEl.hidden = this.comparePosition(minLabelEl, highLabelEl);
    }
    if (minLabelEl && !lowLabelEl && !highLabelEl && maxLabelEl) {
      maxLabelEl.hidden = this.comparePosition(minLabelEl, maxLabelEl);
    }
    if (highLabelEl && maxLabelEl) {
      highLabelEl.hidden = this.comparePosition(highLabelEl, maxLabelEl);
    }
    if (lowLabelEl && !highLabelEl && maxLabelEl) {
      maxLabelEl.hidden = this.comparePosition(lowLabelEl, maxLabelEl);
    }
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

  renderRangeLine(position: number): VNode {
    const style = { insetInlineStart: `${position}%` };
    return (
      <div class={{ [CSS.meterStepLine]: true, [CSS.meterLabelContainer]: true }} style={style} />
    );
  }

  renderValueLabel(): VNode {
    const { currentPercent, labelType, unitLabel, value, labelFlipMax } = this;
    const isPercent = labelType === "percent";
    const labelValue = this.formatLabel(isPercent ? currentPercent / 100 : value || 0);
    const valuePosition = currentPercent > 100 ? 100 : currentPercent > 0 ? currentPercent : 0;
    const styleDefault = { insetInlineStart: `${valuePosition}%` };
    const styleFlipped = { insetInlineEnd: `${100 - valuePosition}%` };
    const style = currentPercent / 100 >= labelFlipMax ? styleFlipped : styleDefault;
    return (
      <div class={{ [CSS.meterLabel]: true, [CSS.meterLabelValue]: true }} style={style}>
        {labelValue}
        {unitLabel && labelType !== "percent" && (
          <span class={CSS.meterUnitLabel}>&nbsp;{unitLabel}</span>
        )}
      </div>
    );
  }

  renderMinLabel(): VNode {
    const { labelType, min, minPercent, unitLabel } = this;
    const style = { insetInlineStart: `${minPercent}%` };
    const labelMin = this.formatLabel(labelType === "percent" ? minPercent : min);
    return (
      <div
        class={{ [CSS.meterLabel]: true, [CSS.meterLabelRange]: true }}
        style={style}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.minLabelEl = el as HTMLDivElement)}
      >
        {labelMin}
        {unitLabel && labelType !== "percent" && (
          <span class={CSS.meterUnitLabel}>&nbsp;{unitLabel}</span>
        )}
      </div>
    );
  }

  renderLowLabel(): VNode {
    const { labelType, low, highPercent, lowPercent, labelFlipProximity } = this;
    const label = low ? this.formatLabel(labelType === "percent" ? lowPercent / 100 : low) : "";
    const styleDefault = { insetInlineStart: `${lowPercent}%` };
    const styleFlipped = { insetInlineEnd: `${100 - lowPercent}%` };
    const style =
      (highPercent - lowPercent) / 100 < labelFlipProximity ? styleFlipped : styleDefault;
    return (
      <div
        class={{ [CSS.meterLabel]: true, [CSS.meterLabelRange]: true }}
        style={style}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.lowLabelEl = el as HTMLDivElement)}
      >
        {label}
      </div>
    );
  }

  renderHighLabel(): VNode {
    const { labelType, high, highPercent, labelFlipMax } = this;
    const label = high ? this.formatLabel(labelType === "percent" ? highPercent / 100 : high) : "";
    const styleDefault = { insetInlineStart: `${highPercent}%` };
    const styleFlipped = { insetInlineEnd: `${100 - highPercent}%` };
    const style = highPercent / 100 >= labelFlipMax ? styleFlipped : styleDefault;
    return (
      <div
        class={{ [CSS.meterLabel]: true, [CSS.meterLabelRange]: true }}
        style={style}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.highLabelEl = el as HTMLDivElement)}
      >
        {label}
      </div>
    );
  }

  renderMaxLabel(): VNode {
    const { labelType, max, maxPercent } = this;
    const style = { insetInlineEnd: `${100 - maxPercent}%` };
    const labelMax = this.formatLabel(labelType === "percent" ? maxPercent / 100 : max);
    return (
      <div
        class={{ [CSS.meterLabel]: true, [CSS.meterLabelRange]: true }}
        style={style}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.maxLabelEl = el as HTMLDivElement)}
      >
        {labelMax}
      </div>
    );
  }

  render(): VNode {
    const {
      appearance,
      currentPercent,
      highActive,
      highPercent,
      label,
      labelType,
      lowActive,
      lowPercent,
      max,
      maxPercent,
      messages,
      min,
      minPercent,
      rangeLabels,
      unitLabel,
      value,
      valueLabel,
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
          {rangeLabels && this.renderMinLabel()}
          {rangeLabels && lowActive && this.renderLowLabel()}
          {rangeLabels && highActive && this.renderHighLabel()}
          {rangeLabels && this.renderMaxLabel()}
        </div>
      </Host>
    );
  }
}
