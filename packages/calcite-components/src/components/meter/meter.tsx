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
import { MeterLabelType } from "./interfaces";

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

  @Watch("value")
  handleRangeChange(): void {
    this.calculateValues();
    this.updateLabels();
  }

  /** Specifies the component's display, where `"single"` displays a single color and `"range"` displays a range of colors based on provided `low`, `high`, `min` or `max` values. */
  @Prop({ reflect: true }) fillType: "single" | "range" = "range";

  /** Specifies the Unicode numeral system used by the component for localization. */
  @Prop() numberingSystem: NumberingSystem;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @Prop({ reflect: true }) groupSeparator = false;

  /** Specifies the appearance style of the component. */
  @Prop() appearance: Extract<"outline" | "outline-fill" | "solid", Appearance> = "outline-fill";

  /** When either `rangeLabels` is `true`, specifies the format of displayed labels. */
  @Prop({ reflect: true }) rangeLabelType: MeterLabelType = "percent";

  /** When either `valueLabel` is `true`, specifies the format of displayed label. */
  @Prop({ reflect: true }) valueLabelType: MeterLabelType = "percent";

  /** When `labelType` is `"units"` and either `valueLabel` or `rangeLabels` are `true`, displays beside the `value` and/or  `min` values. */
  @Prop() unitLabel: "";

  /** When `true`, displays the values of `high`, `low`, `min`, and `max`. */
  @Prop() rangeLabels: boolean;

  /** When `true`, displays the current value. */
  @Prop() valueLabel: boolean;

  @Watch("rangeLabelType")
  @Watch("valueLabelType")
  @Watch("unitLabel")
  @Watch("rangeLabels")
  @Watch("valueLabel")
  handleLabelChange(): void {
    this.updateLabels();
  }

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

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
    this.calculateValues();
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.updateLabels();
  }

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    this.resizeObserver?.observe(this.el);
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

  private meterContainerEl: HTMLDivElement;

  private valueLabelEl: HTMLDivElement;

  private minLabelEl: HTMLDivElement;

  private lowLabelEl: HTMLDivElement;

  private highLabelEl: HTMLDivElement;

  private maxLabelEl: HTMLDivElement;

  private labelFlipMax = 0.8;

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
  resizeHandler = (): void => {
    this.updateLabels();
  };

  private updateLabels = (): void => {
    if (this.valueLabelEl) {
      this.determineValueLabelPosition();
    }
    if (this.rangeLabels) {
      this.determineVisibleLabels();
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

  /**
   * Returns a string representing the localized label.
   *
   * @param value
   * @param type
   * @param percent
   * @returns
   */

  private formatLabel = (value: number, labelType: MeterLabelType): string => {
    if (typeof value === "number" && labelType !== "percent") {
      numberStringFormatter.numberFormatOptions = {
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
      };
      return numberStringFormatter.localize(value.toString());
    } else if (typeof value === "number" && labelType === "percent") {
      // todo use number string formatter helper when updated
      return Intl.NumberFormat(this.effectiveLocale, { style: "percent" }).format(value);
    }
  };

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

  private comparePosition(el1: HTMLDivElement, el2: HTMLDivElement) {
    if (el1 && el2) {
      return intersects(el1?.getBoundingClientRect(), el2?.getBoundingClientRect());
    }
  }

  private determineVisibleLabels() {
    const { minLabelEl, lowLabelEl, highLabelEl, maxLabelEl } = this;
    const minLowOverlap = this.comparePosition(minLabelEl, lowLabelEl);
    const minHighOverlap = this.comparePosition(minLabelEl, highLabelEl);
    const minMaxOverlap = this.comparePosition(minLabelEl, maxLabelEl);
    const lowMaxOverlap = this.comparePosition(lowLabelEl, maxLabelEl);
    const lowHighOverlap = this.comparePosition(lowLabelEl, highLabelEl);
    const highMaxOverlap = this.comparePosition(highLabelEl, maxLabelEl);

    if (lowLabelEl) {
      const hideLowLabel = minLowOverlap || lowMaxOverlap || lowHighOverlap;
      lowLabelEl.style.opacity = hideLowLabel ? "0" : "100";
      lowLabelEl.style.visibility = hideLowLabel ? "hidden" : "visible";
    }

    if (highLabelEl) {
      const hideHighLabel = minHighOverlap || lowMaxOverlap || highMaxOverlap;
      highLabelEl.style.opacity = hideHighLabel ? "0" : "100";
      highLabelEl.style.visibility = hideHighLabel ? "hidden" : "visible";
    }

    if (minLabelEl && maxLabelEl) {
      maxLabelEl.style.opacity = minMaxOverlap ? "0" : "100";
      maxLabelEl.style.visibility = minMaxOverlap ? "hidden" : "visible";
    }
  }

  private determineValueLabelPosition() {
    const { valueLabelEl, meterContainerEl, currentPercent } = this;
    const valuePosition = currentPercent > 100 ? 100 : currentPercent > 0 ? currentPercent : 0;
    const valueLabelEdgeRight = valueLabelEl.getBoundingClientRect().right;
    const valueLabelEdgeLeft = valueLabelEl.getBoundingClientRect().left;
    const valueLabelWidth = valueLabelEl.getBoundingClientRect().width;
    const containerWidth = meterContainerEl.getBoundingClientRect().width;
    const containerEdgeRight = meterContainerEl.getBoundingClientRect().right;
    const containerEdgeLeft = meterContainerEl.getBoundingClientRect().left;
    const rightOverlapping = valueLabelEdgeRight >= containerEdgeRight;
    const leftOverlapping = valueLabelEdgeLeft <= containerEdgeLeft;
    const labelWidthPercent = (100 * (valueLabelWidth - 0)) / (containerWidth - 0);

    if (leftOverlapping || currentPercent <= 2) {
      valueLabelEl.style.insetInlineStart = "0%";
      valueLabelEl.style.removeProperty("inset-inline-end");
    } else if (rightOverlapping || currentPercent >= 100) {
      valueLabelEl.style.removeProperty("inset-inline-start");
      valueLabelEl.style.insetInlineEnd = "0%";
    } else if (!leftOverlapping && !rightOverlapping) {
      valueLabelEl.style.insetInlineStart = `${valuePosition - labelWidthPercent}% `;
      valueLabelEl.style.removeProperty("inset-inline-end");
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

  /**
   *
   * @param position
   * @returns
   */
  renderRangeLine(position: number): VNode {
    const style = { insetInlineStart: `${position}%` };
    return <div class={CSS.meterStepLine} style={style} />;
  }

  renderValueLabel(): VNode {
    const { currentPercent, valueLabelType, unitLabel, value } = this;
    const label = this.formatLabel(
      valueLabelType === "percent" ? currentPercent / 100 : value || 0,
      valueLabelType
    );
    return (
      <div
        class={{ [CSS.meterLabel]: true, [CSS.meterLabelValue]: true }}
        key="low-label-line"
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.valueLabelEl = el as HTMLDivElement)}
      >
        {label}
        {unitLabel && valueLabelType !== "percent" && (
          <span class={CSS.meterUnitLabel}>&nbsp;{unitLabel}</span>
        )}
      </div>
    );
  }

  renderMinLabel(): VNode {
    const { rangeLabelType, min, minPercent, unitLabel } = this;
    const style = { insetInlineStart: `${minPercent}%` };
    const labelMin = this.formatLabel(
      rangeLabelType === "percent" ? minPercent : min,
      rangeLabelType
    );
    return (
      <div
        class={{ [CSS.meterLabel]: true, [CSS.meterLabelRange]: true }}
        key="min-label-line"
        style={style}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.minLabelEl = el as HTMLDivElement)}
      >
        {labelMin}
        {unitLabel && rangeLabelType !== "percent" && (
          <span class={CSS.meterUnitLabel}>&nbsp;{unitLabel}</span>
        )}
      </div>
    );
  }

  renderLowLabel(): VNode {
    const { rangeLabelType, low, lowPercent, highPercent, labelFlipProximity } = this;
    const label = low
      ? this.formatLabel(rangeLabelType === "percent" ? lowPercent / 100 : low, rangeLabelType)
      : "";
    const styleDefault = { insetInlineStart: `${lowPercent}%` };
    const styleFlipped = { insetInlineEnd: `${100 - lowPercent}%` };
    const style =
      (highPercent - lowPercent) / 100 < labelFlipProximity ? styleFlipped : styleDefault;
    return (
      <div
        class={{ [CSS.meterLabel]: true, [CSS.meterLabelRange]: true }}
        key="low-label-line"
        style={style}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.lowLabelEl = el as HTMLDivElement)}
      >
        {label}
      </div>
    );
  }

  renderHighLabel(): VNode {
    const { rangeLabelType, high, highPercent, labelFlipMax } = this;
    const label = high
      ? this.formatLabel(rangeLabelType === "percent" ? highPercent / 100 : high, rangeLabelType)
      : "";
    const styleDefault = { insetInlineStart: `${highPercent}%` };
    const styleFlipped = { insetInlineEnd: `${100 - highPercent}%` };
    const style = highPercent / 100 >= labelFlipMax ? styleFlipped : styleDefault;
    return (
      <div
        class={{ [CSS.meterLabel]: true, [CSS.meterLabelRange]: true }}
        key="high-label-line"
        style={style}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.highLabelEl = el as HTMLDivElement)}
      >
        {label}
      </div>
    );
  }

  renderMaxLabel(): VNode {
    const { rangeLabelType, max, maxPercent } = this;
    const style = { insetInlineEnd: `${100 - maxPercent}%` };
    const labelMax = this.formatLabel(
      rangeLabelType === "percent" ? maxPercent / 100 : max,
      rangeLabelType
    );
    return (
      <div
        class={{ [CSS.meterLabel]: true, [CSS.meterLabelRange]: true }}
        key="max-label-line"
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
      valueLabelType,
      rangeLabelType,
    } = this;
    const textPercentLabel = `${currentPercent} ${messages.percent}`;
    const textUnitLabel = `${value} ${unitLabel}`;
    const valueText =
      valueLabelType === "percent" ? textPercentLabel : unitLabel ? textUnitLabel : undefined;
    return (
      <Host>
        <div
          aria-label={label}
          aria-valuemax={rangeLabelType === "percent" ? maxPercent : max}
          aria-valuemin={rangeLabelType === "percent" ? minPercent : min}
          aria-valuenow={valueLabelType === "percent" ? currentPercent : value}
          aria-valuetext={valueText}
          class={{
            [CSS.meter]: true,
            [CSS.meterStepsVisible]: rangeLabels,
            [CSS.meterValueVisible]: valueLabel,
            [appearance]: appearance !== "outline-fill",
          }}
          role="meter"
          // eslint-disable-next-line react/jsx-sort-props
          ref={(el) => (this.meterContainerEl = el as HTMLDivElement)}
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
