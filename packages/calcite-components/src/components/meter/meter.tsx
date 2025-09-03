// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { Appearance, Scale } from "../interfaces";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
} from "../../utils/form";
import {
  getSupportedLocale,
  NumberingSystem,
  numberStringFormatter,
  SupportedLocale,
} from "../../utils/locale";
import { intersects } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { useT9n } from "../../controllers/useT9n";
import type { Label } from "../label/label";
import { CSS } from "./resources";
import { MeterFillType, MeterLabelType } from "./interfaces";
import { styles } from "./meter.scss";

declare global {
  interface DeclareElements {
    "calcite-meter": Meter;
  }
}

export class Meter extends LitElement implements FormComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  defaultValue: Meter["value"];

  formEl: HTMLFormElement;

  private highLabelEl = createRef<HTMLDivElement>();

  labelEl: Label["el"];

  private labelFlipMax = 0.8;

  private labelFlipProximity = 0.15;

  private lowLabelEl = createRef<HTMLDivElement>();

  private maxLabelEl = createRef<HTMLDivElement>();

  private maxPercent = 100;

  messages = useT9n<Record<string, never>>({ name: null });

  private meterContainerEl = createRef<HTMLDivElement>();

  private minLabelEl = createRef<HTMLDivElement>();

  private minPercent = 0;

  private percentFormatting: {
    formatter: Intl.NumberFormat;
    locale: SupportedLocale;
  };

  private resizeObserver = createObserver("resize", () => this.resizeHandler());

  private valueLabelEl = createRef<HTMLDivElement>();

  // #endregion

  // #region State Properties

  @state() currentPercent: number;

  @state() highActive: boolean;

  @state() highPercent: number;

  @state() lowActive: boolean;

  @state() lowPercent: number;

  // #endregion

  // #region Public Properties

  /** Specifies the appearance style of the component. */
  @property({ reflect: true }) appearance: Extract<
    "outline" | "outline-fill" | "solid",
    Appearance
  > = "outline-fill";

  /** When present, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component's display, where `"single"` displays a single color and `"range"` displays a range of colors based on provided `low`, `high`, `min` or `max` values. */
  @property({ reflect: true }) fillType: MeterFillType = "range";

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** When present, number values are displayed with a group separator corresponding to the language and country format. */
  @property({ reflect: true }) groupSeparator = false;

  /** Specifies a high value.  When `fillType` is `"range"`, displays a different color when above the specified threshold. */
  @property({ reflect: true }) high: number;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /** Specifies a low value.  When `fillType` is `"range"`, displays a different color when above the specified threshold. */
  @property({ reflect: true }) low: number;

  /** Specifies the highest allowed value of the component. */
  @property({ reflect: true }) max = 100;

  /** Specifies the lowest allowed value of the component. */
  @property({ reflect: true }) min = 0;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @property({ reflect: true }) name: string;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /** When `rangeLabels` is `true`, specifies the format of displayed labels. */
  @property({ reflect: true }) rangeLabelType: MeterLabelType = "percent";

  /** When present, displays the values of `high`, `low`, `min`, and `max`. */
  @property({ reflect: true }) rangeLabels = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `rangeLabelType` is `"units"` and either `valueLabel` or `rangeLabels` are `true`, displays beside the `value` and/or  `min` values. */
  @property() unitLabel = "";

  /** Specifies the current value of the component. */
  @property() value: number;

  /** When present, displays the current value. */
  @property({ reflect: true }) valueLabel = false;

  /** When `valueLabel` is `true`, specifies the format of displayed label. */
  @property({ reflect: true }) valueLabelType: MeterLabelType = "percent";

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    connectForm(this);
    this.resizeObserver?.observe(this.el);
  }

  load(): void {
    this.calculateValues();
    afterConnectDefaultValueSet(this, this.value);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("min") && (this.hasUpdated || this.min !== 0)) ||
      (changes.has("max") && (this.hasUpdated || this.max !== 100)) ||
      changes.has("low") ||
      changes.has("high") ||
      changes.has("value")
    ) {
      this.handleRangeChange();
    }

    if (
      (changes.has("rangeLabels") && (this.hasUpdated || this.rangeLabels !== false)) ||
      (changes.has("rangeLabelType") && (this.hasUpdated || this.rangeLabelType !== "percent")) ||
      (changes.has("unitLabel") && (this.hasUpdated || this.unitLabel !== "")) ||
      (changes.has("valueLabel") && (this.hasUpdated || this.valueLabel !== false)) ||
      (changes.has("valueLabelType") && (this.hasUpdated || this.valueLabelType !== "percent"))
    ) {
      this.updateLabels();
    }
  }

  loaded(): void {
    this.updateLabels();
  }

  override disconnectedCallback(): void {
    disconnectForm(this);
    this.resizeObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods

  private handleRangeChange(): void {
    this.calculateValues();
    this.updateLabels();
  }

  private resizeHandler(): void {
    this.updateLabels();
  }

  private updateLabels(): void {
    if (this.valueLabelEl.value) {
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

  private formatLabel(value: number, labelType: MeterLabelType): string {
    if (labelType === "percent") {
      if (!this.percentFormatting) {
        const locale = getSupportedLocale(this.messages._lang);
        const formatter = new Intl.NumberFormat(locale, {
          useGrouping: this.groupSeparator,
          style: "percent",
        });
        this.percentFormatting = { formatter, locale };
      }
      return this.percentFormatting.formatter.format(value);
    } else {
      numberStringFormatter.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
      };
      return numberStringFormatter.localize(value.toString());
    }
  }

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
    const {
      minLabelEl: { value: minLabelEl },
      lowLabelEl: { value: lowLabelEl },
      highLabelEl: { value: highLabelEl },
      maxLabelEl: { value: maxLabelEl },
    } = this;
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
    const {
      valueLabelEl: { value: valueLabelEl },
      meterContainerEl: { value: meterContainerEl },
      currentPercent,
    } = this;
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

  // #endregion

  // #region Rendering

  private renderMeterFill(): JsxNode {
    const { currentPercent, fillType } = this;
    const kindClass = this.getMeterKindCssClass();
    return (
      <div
        class={{ [CSS.fill]: true, [kindClass]: fillType !== "single" }}
        style={{ width: `${currentPercent}%` }}
      />
    );
  }

  private renderRangeLine(position: number): JsxNode {
    const style = { insetInlineStart: `${position}%` };
    return <div class={CSS.stepLine} style={style} />;
  }

  private renderValueLabel(): JsxNode {
    const { currentPercent, valueLabelType, unitLabel, value } = this;
    const label = this.formatLabel(
      valueLabelType === "percent" ? currentPercent / 100 : value || 0,
      valueLabelType,
    );
    return (
      <div
        class={{ [CSS.label]: true, [CSS.labelValue]: true }}
        key="low-label-line"
        ref={this.valueLabelEl}
      >
        {label}
        {unitLabel && valueLabelType !== "percent" && (
          <span class={CSS.unitLabel}>&nbsp;{unitLabel}</span>
        )}
      </div>
    );
  }

  private renderMinLabel(): JsxNode {
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
        ref={this.minLabelEl}
        style={style}
      >
        {labelMin}
        {unitLabel && rangeLabelType !== "percent" && (
          <span class={CSS.unitLabel}>&nbsp;{unitLabel}</span>
        )}
      </div>
    );
  }

  private renderLowLabel(): JsxNode {
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
        ref={this.lowLabelEl}
        style={style}
      >
        {label}
      </div>
    );
  }

  private renderHighLabel(): JsxNode {
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
        ref={this.highLabelEl}
        style={style}
      >
        {label}
      </div>
    );
  }

  private renderMaxLabel(): JsxNode {
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
        ref={this.maxLabelEl}
        style={style}
      >
        {labelMax}
      </div>
    );
  }

  override render(): JsxNode {
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
      <div
        ariaLabel={label}
        ariaValueMax={rangeLabelType === "percent" ? maxPercent : max}
        ariaValueMin={rangeLabelType === "percent" ? minPercent : min}
        ariaValueNow={valueLabelType === "percent" ? currentPercent : value}
        ariaValueText={valueText}
        class={{
          [CSS.container]: true,
          [CSS.stepsVisible]: rangeLabels,
          [CSS.valueVisible]: valueLabel,
          [appearance]: appearance !== "outline-fill",
        }}
        ref={this.meterContainerEl}
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
    );
  }

  // #endregion
}
