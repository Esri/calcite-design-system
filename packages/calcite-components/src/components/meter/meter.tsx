import { Component, Element, h, Host, Prop, State, VNode, Watch } from "@stencil/core";
import { Appearance, Scale } from "../interfaces";
import { CSS } from "./resources";

import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";

import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
} from "../../utils/form";

import {
  connectLocalized,
  disconnectLocalized,
  getSupportedLocale,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
  SupportedLocale,
} from "../../utils/locale";
import { intersects } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { MeterLabelType } from "./interfaces";

@Component({
  tag: "calcite-meter",
  styleUrl: "meter.scss",
  shadow: true,
})
export class Meter implements FormComponent, LoadableComponent, LocalizedComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the appearance style of the component. */
  @Prop({ reflect: true }) appearance: Extract<"outline" | "outline-fill" | "solid", Appearance> =
    "outline-fill";

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** Specifies the component's display, where `"single"` displays a single color and `"range"` displays a range of colors based on provided `low`, `high`, `min` or `max` values. */
  @Prop({ reflect: true }) fillType: "single" | "range" = "range";

  /**
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true }) form: string;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @Prop({ reflect: true }) groupSeparator = false;

  /** Specifies a high value.  When `fillType` is `"range"`, displays a different color when above the specified threshold.  */
  @Prop({ reflect: true, mutable: true }) high: number;

  /**  Accessible name for the component. */
  @Prop() label!: string;

  /** Specifies a low value.  When `fillType` is `"range"`, displays a different color when above the specified threshold.  */
  @Prop({ reflect: true, mutable: true }) low: number;

  /** Specifies the highest allowed value of the component. */
  @Prop({ reflect: true }) max = 100;

  /** Specifies the lowest allowed value of the component. */
  @Prop({ reflect: true }) min = 0;

  @Watch("min")
  @Watch("max")
  @Watch("low")
  @Watch("high")
  @Watch("value")
  handleRangeChange(): void {
    this.calculateValues();
    this.updateLabels();
  }

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @Prop({ reflect: true }) name: string;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @Prop() numberingSystem: NumberingSystem;

  /** When `true`, displays the values of `high`, `low`, `min`, and `max`. */
  @Prop({ reflect: true }) rangeLabels = false;

  /** When either `rangeLabels` is `true`, specifies the format of displayed labels. */
  @Prop({ reflect: true }) rangeLabelType: MeterLabelType = "percent";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** When `labelType` is `"units"` and either `valueLabel` or `rangeLabels` are `true`, displays beside the `value` and/or  `min` values. */
  @Prop() unitLabel = "";

  /** Specifies the current value of the component. */
  @Prop({ mutable: true }) value: number;

  /** When `true`, displays the current value. */
  @Prop({ reflect: true }) valueLabel = false;

  /** When either `valueLabel` is `true`, specifies the format of displayed label. */
  @Prop({ reflect: true }) valueLabelType: MeterLabelType = "percent";

  @Watch("rangeLabels")
  @Watch("rangeLabelType")
  @Watch("unitLabel")
  @Watch("valueLabel")
  @Watch("valueLabelType")
  handleLabelChange(): void {
    this.updateLabels();
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    this.calculateValues();
    afterConnectDefaultValueSet(this, this.value);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.updateLabels();
  }

  connectedCallback(): void {
    connectLocalized(this);
    connectForm(this);
    this.resizeObserver?.observe(this.el);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectForm(this);
    this.resizeObserver?.disconnect();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteMeterElement;

  defaultValue: Meter["value"];

  formEl: HTMLFormElement;

  labelEl: HTMLCalciteLabelElement;

  private highLabelEl: HTMLDivElement;

  private labelFlipMax = 0.8;

  private labelFlipProximity = 0.15;

  private lowLabelEl: HTMLDivElement;

  private maxLabelEl: HTMLDivElement;

  private maxPercent = 100;

  private meterContainerEl: HTMLDivElement;

  private minLabelEl: HTMLDivElement;

  private minPercent = 0;

  private percentFormatting: {
    formatter: Intl.NumberFormat;
    locale: SupportedLocale;
  };

  private resizeObserver = createObserver("resize", () => this.resizeHandler());

  private valueLabelEl: HTMLDivElement;

  @State() currentPercent: number;

  @State() effectiveLocale: string;

  @State() highActive: boolean;

  @State() highPercent: number;

  @State() lowActive: boolean;

  @State() lowPercent: number;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private resizeHandler(): void {
    this.updateLabels();
  }

  private updateLabels(): void {
    if (this.valueLabelEl) {
      this.determineValueLabelPosition();
    }
    if (this.rangeLabels) {
      this.determineVisibleLabels();
    }
  }

  private calculateValues(): void {
    const { min, max, low, high, value } = this;
    const lowPercent = (100 * (low - min)) / (max - min);
    const highPercent = (100 * (high - min)) / (max - min);
    const currentPercent = (100 * (value - min)) / (max - min);

    if (!low || low < min || low > high || low > max) {
      this.low = min;
    }
    if (!high || high > max || high < low || high < min) {
      this.high = max;
    }
    if (!value) {
      this.value = min;
    }

    this.lowPercent = lowPercent;
    this.highPercent = highPercent;
    this.currentPercent = value ? currentPercent : 0;
    this.lowActive = !!low && low > min && (!value || low > value) && (!high || low < high);
    this.highActive =
      !!high && min <= high && high < max && (!value || high > value) && (!low || high > low);
  }

  private formatLabel = (value: number, labelType: MeterLabelType): string => {
    if (labelType === "percent") {
      if (!this.percentFormatting) {
        const locale = getSupportedLocale(this.effectiveLocale);
        const formatter = new Intl.NumberFormat(locale, {
          useGrouping: this.groupSeparator,
          style: "percent",
        });
        this.percentFormatting = { formatter, locale };
      }
      return this.percentFormatting.formatter.format(value);
    } else {
      numberStringFormatter.numberFormatOptions = {
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
      };
      return numberStringFormatter.localize(value.toString());
    }
  };

  private getMeterKindCssClass(): string {
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
    } else {
      return CSS.success;
    }
  }

  private intersects(el1: HTMLDivElement, el2: HTMLDivElement): boolean {
    return el1 && el2 && intersects(el1.getBoundingClientRect(), el2.getBoundingClientRect());
  }

  private determineVisibleLabels(): void {
    const { minLabelEl, lowLabelEl, highLabelEl, maxLabelEl } = this;
    const highMaxOverlap = this.intersects(highLabelEl, maxLabelEl);
    const lowHighOverlap = this.intersects(lowLabelEl, highLabelEl);
    const lowMaxOverlap = this.intersects(lowLabelEl, maxLabelEl);
    const minHighOverlap = this.intersects(minLabelEl, highLabelEl);
    const minLowOverlap = this.intersects(minLabelEl, lowLabelEl);
    const minMaxOverlap = this.intersects(minLabelEl, maxLabelEl);
    const hiddenClass = CSS.labelHidden;

    if (lowLabelEl) {
      if (minLowOverlap || lowMaxOverlap || lowHighOverlap) {
        lowLabelEl.classList.add(hiddenClass);
      } else {
        lowLabelEl.classList.remove(hiddenClass);
      }
    }

    if (highLabelEl) {
      if (minHighOverlap || lowMaxOverlap || highMaxOverlap) {
        highLabelEl.classList.add(hiddenClass);
      } else {
        highLabelEl.classList.remove(hiddenClass);
      }
    }

    if (minLabelEl && maxLabelEl) {
      if (minMaxOverlap) {
        maxLabelEl.classList.add(hiddenClass);
      } else {
        maxLabelEl.classList.remove(hiddenClass);
      }
    }
  }

  private determineValueLabelPosition(): void {
    const { valueLabelEl, meterContainerEl, currentPercent } = this;
    const valuePosition = currentPercent > 100 ? 100 : currentPercent > 0 ? currentPercent : 0;
    const valueLabelWidth = valueLabelEl.getBoundingClientRect().width;
    const containerWidth = meterContainerEl.getBoundingClientRect().width;
    const labelWidthPercent = (100 * (valueLabelWidth - 0)) / (containerWidth - 0);

    if (valuePosition + labelWidthPercent >= 100) {
      valueLabelEl.style.insetInlineEnd = "0%";
      valueLabelEl.style.removeProperty("inset-inline-start");
    } else {
      valueLabelEl.style.insetInlineStart = `${valuePosition}% `;
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
    const kindClass = this.getMeterKindCssClass();
    return (
      <div
        class={{ [CSS.fill]: true, [kindClass]: fillType !== "single" }}
        style={{ width: `${currentPercent}%` }}
      />
    );
  }

  renderRangeLine(position: number): VNode {
    const style = { insetInlineStart: `${position}%` };
    return <div class={CSS.stepLine} style={style} />;
  }

  renderValueLabel(): VNode {
    const { currentPercent, valueLabelType, unitLabel, value } = this;
    const label = this.formatLabel(
      valueLabelType === "percent" ? currentPercent / 100 : value || 0,
      valueLabelType,
    );
    return (
      <div
        class={{ [CSS.label]: true, [CSS.labelValue]: true }}
        key="low-label-line"
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.valueLabelEl = el)}
      >
        {label}
        {unitLabel && valueLabelType !== "percent" && (
          <span class={CSS.unitLabel}>&nbsp;{unitLabel}</span>
        )}
      </div>
    );
  }

  renderMinLabel(): VNode {
    const { rangeLabelType, min, minPercent, unitLabel } = this;
    const style = { insetInlineStart: `${minPercent}%` };
    const labelMin = this.formatLabel(
      rangeLabelType === "percent" ? minPercent : min,
      rangeLabelType,
    );
    return (
      <div
        class={{ [CSS.label]: true, [CSS.labelRange]: true }}
        key="min-label-line"
        style={style}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.minLabelEl = el)}
      >
        {labelMin}
        {unitLabel && rangeLabelType !== "percent" && (
          <span class={CSS.unitLabel}>&nbsp;{unitLabel}</span>
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
        class={{ [CSS.label]: true, [CSS.labelRange]: true }}
        key="low-label-line"
        style={style}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.lowLabelEl = el)}
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
        class={{ [CSS.label]: true, [CSS.labelRange]: true }}
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
      rangeLabelType,
    );
    return (
      <div
        class={{ [CSS.label]: true, [CSS.labelRange]: true }}
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
      min,
      minPercent,
      rangeLabels,
      rangeLabelType,
      unitLabel,
      value,
      valueLabel,
      valueLabelType,
    } = this;
    const textPercentLabelWithPercent = this.formatLabel(currentPercent / 100, "percent");
    const textUnitLabel = `${value} ${unitLabel}`;
    const valueText =
      valueLabelType === "percent"
        ? textPercentLabelWithPercent
        : unitLabel
          ? textUnitLabel
          : undefined;
    return (
      <Host>
        <div
          aria-label={label}
          aria-valuemax={rangeLabelType === "percent" ? maxPercent : max}
          aria-valuemin={rangeLabelType === "percent" ? minPercent : min}
          aria-valuenow={valueLabelType === "percent" ? currentPercent : value}
          aria-valuetext={valueText}
          class={{
            [CSS.container]: true,
            [CSS.stepsVisible]: rangeLabels,
            [CSS.valueVisible]: valueLabel,
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
