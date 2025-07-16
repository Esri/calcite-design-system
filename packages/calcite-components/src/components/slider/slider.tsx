// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  setAttribute,
  stringOrBoolean,
} from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import { intersects, isPrimaryPointerButton } from "../../utils/dom";
import { Validation } from "../functional/Validation";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
} from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { clamp, decimalPlaces } from "../../utils/math";
import { ColorStop, DataSeries } from "../graph/interfaces";
import { Scale, Status } from "../interfaces";
import { BigDecimal } from "../../utils/number";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Label } from "../label/label";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS, IDS, maxTickElementThreshold } from "./resources";
import { ActiveSliderProperty, SetValueProperty, SideOffset, ThumbType } from "./interfaces";
import { styles } from "./slider.scss";

declare global {
  interface DeclareElements {
    "calcite-slider": Slider;
  }
}

function isRange(value: number | number[]): value is number[] {
  return Array.isArray(value);
}

export class Slider
  extends LitElement
  implements LabelableComponent, FormComponent, InteractiveComponent
{
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  defaultValue: Slider["value"];

  private dragEnd = (event: PointerEvent): void => {
    if (this.disabled) {
      return;
    }

    this.removeDragListeners();
    this.focusActiveHandle(event.clientX);
    if (this.lastDragPropValue != this[this.dragProp]) {
      this.emitChange();
    }
    this.dragProp = null;
    this.lastDragPropValue = null;
    this.minValueDragRange = null;
    this.maxValueDragRange = null;
    this.minMaxValueRange = null;
  };

  private dragProp: ActiveSliderProperty;

  private dragUpdate = (event: PointerEvent): void => {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    if (this.dragProp) {
      const value = this.mapToRange(event.clientX || event.pageX);
      if (isRange(this.value) && this.dragProp === "minMaxValue") {
        if (this.minValueDragRange && this.maxValueDragRange && this.minMaxValueRange) {
          const newMinValue = value - this.minValueDragRange;
          const newMaxValue = value + this.maxValueDragRange;
          if (
            newMaxValue <= this.max &&
            newMinValue >= this.min &&
            newMaxValue - newMinValue === this.minMaxValueRange
          ) {
            this.setValue({
              minValue: this.clamp(newMinValue, "minValue"),
              maxValue: this.clamp(newMaxValue, "maxValue"),
            });
          }
        } else {
          this.minValueDragRange = value - this.minValue;
          this.maxValueDragRange = this.maxValue - value;
          this.minMaxValueRange = this.maxValue - this.minValue;
        }
      } else {
        this.setValue({ [this.dragProp as SetValueProperty]: this.clamp(value, this.dragProp) });
      }
    }
  };

  formEl: HTMLFormElement;

  /**
   * Returns a string representing the localized label value based if the groupSeparator prop is parsed.
   *
   * @param value
   */
  private formatValue = (value: number): string => {
    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };

    return numberStringFormatter.localize(value.toString());
  };

  private guid = IDS.host(guid());

  labelEl: Label["el"];

  private lastDragProp: ActiveSliderProperty;

  private lastDragPropValue: number;

  private maxHandle: HTMLDivElement;

  messages = useT9n<Record<string, never>>({ name: null });

  private minHandle: HTMLDivElement;

  private pointerUpDragEnd = (event: PointerEvent): void => {
    if (this.disabled || !isPrimaryPointerButton(event)) {
      return;
    }

    this.dragEnd(event);
  };

  private trackEl: HTMLDivElement;

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region State Properties

  @state() activeProp: ActiveSliderProperty = "value";

  @state() private maxValueDragRange: number = null;

  @state() private minMaxValueRange: number = null;

  @state() private minValueDragRange: number = null;

  @state() private tickValues: number[] = [];

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Used to configure where the fill is placed along the slider track in relation to the value handle.
   *
   * Range mode will always display the fill between the min and max handles.
   */
  @property({ reflect: true }) fillPlacement: "start" | "none" | "end" = "start";

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @property({ reflect: true }) groupSeparator = false;

  /** When `true`, indicates a histogram is present. */
  @property({ reflect: true }) hasHistogram = false;

  /**
   * A list of the histogram's x,y coordinates within the component's `min` and `max`. Displays above the component's track.
   *
   * @see [DataSeries](https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/src/components/graph/interfaces.ts#L5).
   */
  @property() histogram: DataSeries;

  /** A set of single color stops for a histogram, sorted by offset ascending. */
  @property() histogramStops: ColorStop[];

  /** When specified, allows users to customize handle labels. */
  @property() labelFormatter: (
    value: number,
    type: "value" | "min" | "max" | "tick",
    defaultFormatter: (value: number) => string,
  ) => string | undefined;

  /** When `true`, displays label handles with their numeric value. */
  @property({ reflect: true }) labelHandles = false;

  /** When `true` and `ticks` is specified, displays label tick marks with their numeric value. */
  @property({ reflect: true }) labelTicks = false;

  /** The component's maximum selectable value. */
  @property({ reflect: true }) max = 100;

  /** For multiple selections, the accessible name for the second handle, such as `"Temperature, upper bound"`. */
  @property() maxLabel: string;

  /** For multiple selections, the component's upper value. */
  @property() maxValue: number;

  /** The component's minimum selectable value. */
  @property({ reflect: true }) min = 0;

  /** Accessible name for first (or only) handle, such as `"Temperature, lower bound"`. */
  @property() minLabel: string;

  /** For multiple selections, the component's lower value. */
  @property() minValue: number;

  /**
   * When `true`, the slider will display values from high to low.
   *
   * Note that this value will be ignored if the slider has an associated histogram.
   */
  @property({ reflect: true }) mirrored = false;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @property({ reflect: true }) name: string;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /** Specifies the interval to move with the page up, or page down keys. */
  @property({ reflect: true }) pageStep: number;

  /** When `true`, sets a finer point for handles. */
  @property({ reflect: true }) precise = false;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, enables snap selection in coordination with `step` via a mouse. */
  @property({ reflect: true }) snap = false;

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /** Specifies the interval to move with the up, or down keys. */
  @property({ reflect: true }) step = 1;

  /** Displays tick marks on the number line at a specified interval. */
  @property({ reflect: true }) ticks: number;

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean }) validationIcon:
    | IconNameOrString
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage: string;

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property() validity: MutableValidityState = {
    valid: false,
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valueMissing: false,
  };

  /** The component's value. */
  @property({ type: Number, reflect: true }) value: null | number | number[] = 0;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      const handle = this.minHandle ? this.minHandle : this.maxHandle;
      return handle;
    });
  }

  // #endregion

  // #region Events

  /**
   * Fires when the thumb is released on the component.
   *
   * Note: To constantly listen to the drag event,
   * use `calciteSliderInput` instead.
   */
  calciteSliderChange = createEvent({ cancelable: false });

  /**
   * Fires on all updates to the component.
   *
   * Note: Fires frequently during drag. To perform
   * expensive operations consider using a debounce or throttle to avoid
   * locking up the main thread.
   */
  calciteSliderInput = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("pointerdown", this.pointerDownHandler);
    this.listen("keydown", this.handleKeyDown);
    this.listen("touchstart", this.handleTouchStart);
  }

  override connectedCallback(): void {
    this.setMinMaxFromValue();
    this.setValueFromMinMax();
    connectLabel(this);
    connectForm(this);
  }

  load(): void {
    if (!isRange(this.value)) {
      this.value = this.snap ? this.getClosestStep(this.value) : this.clamp(this.value);
    }
    afterConnectDefaultValueSet(this, this.value);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("histogram")) {
      this.hasHistogram = !!this.histogram;
    }

    if (changes.has("ticks")) {
      this.tickValues = this.generateTickValues();
    }

    if (changes.has("value") && (this.hasUpdated || this.value !== 0)) {
      this.setMinMaxFromValue();
    }

    if (changes.has("minValue") || changes.has("maxValue")) {
      this.setValueFromMinMax();
    }
  }

  override updated(): void {
    if (this.labelHandles) {
      this.adjustHostObscuredHandleLabel("value");
      if (isRange(this.value)) {
        this.adjustHostObscuredHandleLabel("minValue");
        if (!(this.precise && !this.hasHistogram)) {
          this.hyphenateCollidingRangeHandleLabels();
        }
      }
    }
    this.hideObscuredBoundingTickLabels();
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    this.removeDragListeners();
  }

  // #endregion

  // #region Private Methods

  private handleKeyDown(event: KeyboardEvent): void {
    const mirror = this.shouldMirror();
    const { activeProp, max, min, pageStep, step } = this;
    const value = this[activeProp];
    const { key } = event;

    if (isActivationKey(key)) {
      event.preventDefault();
      return;
    }

    let adjustment: number;

    if (key === "ArrowUp" || key === "ArrowRight") {
      const directionFactor = mirror && key === "ArrowRight" ? -1 : 1;
      adjustment = value + step * directionFactor;
    } else if (key === "ArrowDown" || key === "ArrowLeft") {
      const directionFactor = mirror && key === "ArrowLeft" ? -1 : 1;
      adjustment = value - step * directionFactor;
    } else if (key === "PageUp") {
      if (pageStep) {
        adjustment = value + pageStep;
      }
    } else if (key === "PageDown") {
      if (pageStep) {
        adjustment = value - pageStep;
      }
    } else if (key === "Home") {
      adjustment = min;
    } else if (key === "End") {
      adjustment = max;
    }

    if (isNaN(adjustment)) {
      return;
    }

    event.preventDefault();
    const fixedDecimalAdjustment = Number(adjustment.toFixed(decimalPlaces(step)));
    this.setValue({
      [activeProp as SetValueProperty]: this.clamp(fixedDecimalAdjustment, activeProp),
    });
  }

  private pointerDownHandler(event: PointerEvent): void {
    if (this.disabled || !isPrimaryPointerButton(event)) {
      return;
    }

    const x = event.clientX || event.pageX;
    const position = this.mapToRange(x);
    let prop: ActiveSliderProperty = "value";
    if (isRange(this.value)) {
      const inRange = position >= this.minValue && position <= this.maxValue;
      if (inRange && this.lastDragProp === "minMaxValue") {
        prop = "minMaxValue";
      } else {
        const closerToMax = Math.abs(this.maxValue - position) < Math.abs(this.minValue - position);
        prop = closerToMax || position >= this.maxValue ? "maxValue" : "minValue";
      }
    }
    this.lastDragPropValue = this[prop];
    this.dragStart(prop);
    const isThumbActive = this.el.shadowRoot.querySelector(`.${CSS.thumb}:active`);
    if (!isThumbActive) {
      this.setValue({ [prop as SetValueProperty]: this.clamp(position, prop) });
    }
    this.focusActiveHandle(x);
  }

  private handleTouchStart(event: TouchEvent): void {
    // needed to prevent extra click at the end of a handle drag
    event.preventDefault();
  }

  private buildThumbType(type: "min" | "max"): ThumbType {
    const thumbTypeParts: string[] = [type];

    if (this.labelHandles) {
      thumbTypeParts.push("labeled");
    }

    if (this.precise) {
      thumbTypeParts.push("precise");
    }

    if (this.hasHistogram) {
      thumbTypeParts.push("histogram");
    }

    return thumbTypeParts.join("-") as ThumbType;
  }

  private setValueFromMinMax(): void {
    const { minValue, maxValue } = this;

    if (typeof minValue === "number" && typeof maxValue === "number") {
      this.value = [minValue, maxValue];
    }
  }

  private setMinMaxFromValue(): void {
    const { value } = this;

    if (isRange(value)) {
      this.minValue = value[0];
      this.maxValue = value[1];
    }
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private shouldMirror(): boolean {
    return this.mirrored && !this.hasHistogram;
  }

  private shouldUseMinValue(): boolean {
    if (!isRange(this.value)) {
      return false;
    }
    return (
      (this.hasHistogram && this.maxValue === 0) || (!this.hasHistogram && this.minValue === 0)
    );
  }

  private getTickDensity(): number {
    const density = (this.max - this.min) / this.ticks / maxTickElementThreshold;

    return density < 1 ? 1 : density;
  }

  private generateTickValues(): number[] {
    const tickInterval = this.ticks ?? 0;

    if (tickInterval <= 0) {
      return [];
    }

    const ticks: number[] = [this.min];
    const density = this.getTickDensity();
    const tickOffset = tickInterval * density;
    let current = this.min;

    while (current < this.max) {
      current += tickOffset;
      ticks.push(Math.min(current, this.max));
    }

    if (!ticks.includes(this.max)) {
      ticks.push(this.max);
    }

    return ticks;
  }

  private onThumbBlur() {
    this.activeProp = null;
  }

  private onThumbFocus(event: FocusEvent) {
    const thumb = event.currentTarget as HTMLElement;
    this.activeProp = thumb.getAttribute("data-value-prop") as ActiveSliderProperty;
  }

  private onThumbPointerDown(event: PointerEvent) {
    const thumb = event.currentTarget as HTMLElement;
    this.pointerDownDragStart(event, thumb.getAttribute("data-value-prop") as ActiveSliderProperty);
  }

  private onTrackPointerDown(event: PointerEvent) {
    this.pointerDownDragStart(event, "minMaxValue");
  }

  private pointerDownDragStart(event: PointerEvent, prop: ActiveSliderProperty): void {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    this.dragStart(prop);
  }

  private dragStart(prop: ActiveSliderProperty): void {
    this.dragProp = prop;
    this.lastDragProp = this.dragProp;
    this.activeProp = prop;
    window.addEventListener(
      "pointermove",
      this.dragUpdate,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    window.addEventListener(
      "pointerup",
      this.pointerUpDragEnd,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    window.addEventListener(
      "pointercancel",
      this.dragEnd,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
  }

  private focusActiveHandle(valueX: number): void {
    if (this.dragProp === "minValue") {
      this.minHandle.focus();
    } else if (this.dragProp === "maxValue" || this.dragProp === "value") {
      this.maxHandle.focus();
    } else if (this.dragProp === "minMaxValue") {
      this.getClosestHandle(valueX).focus();
    }
  }

  private emitInput(): void {
    this.calciteSliderInput.emit();
  }

  private emitChange(): void {
    this.calciteSliderChange.emit();
  }

  private removeDragListeners() {
    window.removeEventListener(
      "pointermove",
      this.dragUpdate,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    window.removeEventListener(
      "pointerup",
      this.pointerUpDragEnd,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    window.removeEventListener(
      "pointercancel",
      this.dragEnd,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
  }

  /**
   * Set prop value(s) if changed at the component level
   *
   * @param {object} values - a set of key/value pairs delineating what properties in the component to update
   */
  private setValue(
    values: Partial<{
      [Property in keyof Pick<Slider, "maxValue" | "minValue" | "value">]: number;
    }>,
  ): void {
    let valueChanged: boolean;

    Object.keys(values).forEach((propName) => {
      const newValue = values[propName];

      if (!valueChanged) {
        const oldValue = this[propName];
        valueChanged = oldValue !== newValue;
      }

      this[propName] = newValue;
    });

    if (!valueChanged) {
      return;
    }

    const dragging = this.dragProp;
    if (!dragging) {
      this.emitChange();
    }
    this.emitInput();
  }

  private storeTrackRef(node: HTMLDivElement): void {
    this.trackEl = node;
  }

  private storeThumbRef(el: HTMLDivElement): void {
    if (!el) {
      return;
    }

    const valueProp = el.getAttribute("data-value-prop") as ActiveSliderProperty;
    if (valueProp === "minValue") {
      this.minHandle = el;
    } else {
      this.maxHandle = el;
    }
  }

  /**
   * If number is outside range, constrain to min or max
   *
   * @param value
   * @param prop
   * @private
   */
  private clamp(value: number, prop?: ActiveSliderProperty): number {
    value = clamp(value, this.min, this.max);

    // ensure that maxValue and minValue don't swap positions
    if (prop === "maxValue") {
      value = Math.max(value, this.minValue);
    }
    if (prop === "minValue") {
      value = Math.min(value, this.maxValue);
    }

    return value;
  }

  /**
   * Translate a pixel position to value along the range
   *
   * @param x
   * @private
   */
  private mapToRange(x: number): number {
    const range = this.max - this.min;
    const { left, width } = this.trackEl.getBoundingClientRect();
    const percent = (x - left) / width;
    const mirror = this.shouldMirror();
    const clampedValue = this.clamp(this.min + range * (mirror ? 1 - percent : percent));
    const value = Number(clampedValue.toFixed(decimalPlaces(this.step)));

    return !(this.snap && this.step) ? value : this.getClosestStep(value);
  }

  /**
   * Get closest allowed value along stepped values
   *
   * @param value
   * @private
   */
  private getClosestStep(value: number): number {
    const { max, min, step } = this;

    // prevents floating point precision issues
    const bigDecimalString = new BigDecimal(`${Math.floor((value - min) / step)}`)
      .multiply(`${step}`)
      .add(`${min}`)
      .toString();

    let snappedValue = this.clamp(Number(bigDecimalString));

    if (snappedValue > max) {
      snappedValue -= step;
    }

    return snappedValue;
  }

  private getClosestHandle(valueX: number): HTMLDivElement {
    return this.getDistanceX(this.maxHandle, valueX) > this.getDistanceX(this.minHandle, valueX)
      ? this.minHandle
      : this.maxHandle;
  }

  private getDistanceX(el: HTMLDivElement, valueX: number): number {
    return Math.abs(el.getBoundingClientRect().left - valueX);
  }

  private getFontSizeForElement(element: HTMLElement): number {
    return Number(window.getComputedStyle(element).getPropertyValue("font-size").match(/\d+/)[0]);
  }

  /**
   * Get position of value along range as fractional value
   *
   * @param num
   * @return {number} number in the unit interval [0,1]
   * @private
   */
  private getUnitInterval(num: number): number {
    num = this.clamp(num);
    const range = this.max - this.min;
    return (num - this.min) / range;
  }

  private adjustHostObscuredHandleLabel(name: "value" | "minValue"): void {
    const label: HTMLSpanElement = this.el.shadowRoot.querySelector(`.handle__label--${name}`);
    const labelStatic: HTMLSpanElement = this.el.shadowRoot.querySelector(
      `.handle__label--${name}.static`,
    );
    const labelTransformed: HTMLSpanElement = this.el.shadowRoot.querySelector(
      `.handle__label--${name}.transformed`,
    );
    const labelStaticBounds = labelStatic.getBoundingClientRect();
    const labelStaticOffset = this.getHostOffset(labelStaticBounds.left, labelStaticBounds.right);
    label.style.transform = `translateX(${labelStaticOffset}px)`;
    labelTransformed.style.transform = `translateX(${labelStaticOffset}px)`;
  }

  private hyphenateCollidingRangeHandleLabels(): void {
    const { shadowRoot } = this.el;

    const mirror = this.shouldMirror();
    const leftModifier = mirror ? "value" : "minValue";
    const rightModifier = mirror ? "minValue" : "value";

    const leftValueLabel: HTMLSpanElement = shadowRoot.querySelector(
      `.handle__label--${leftModifier}`,
    );
    const leftValueLabelStatic: HTMLSpanElement = shadowRoot.querySelector(
      `.handle__label--${leftModifier}.static`,
    );
    const leftValueLabelTransformed: HTMLSpanElement = shadowRoot.querySelector(
      `.handle__label--${leftModifier}.transformed`,
    );
    const leftValueLabelStaticHostOffset = this.getHostOffset(
      leftValueLabelStatic.getBoundingClientRect().left,
      leftValueLabelStatic.getBoundingClientRect().right,
    );

    const rightValueLabel: HTMLSpanElement = shadowRoot.querySelector(
      `.handle__label--${rightModifier}`,
    );
    const rightValueLabelStatic: HTMLSpanElement = shadowRoot.querySelector(
      `.handle__label--${rightModifier}.static`,
    );
    const rightValueLabelTransformed: HTMLSpanElement = shadowRoot.querySelector(
      `.handle__label--${rightModifier}.transformed`,
    );
    const rightValueLabelStaticHostOffset = this.getHostOffset(
      rightValueLabelStatic.getBoundingClientRect().left,
      rightValueLabelStatic.getBoundingClientRect().right,
    );

    const labelFontSize = this.getFontSizeForElement(leftValueLabel);
    const labelTransformedOverlap = this.getRangeLabelOverlap(
      leftValueLabelTransformed,
      rightValueLabelTransformed,
    );

    const hyphenLabel = leftValueLabel;
    const labelOffset = labelFontSize / 2;

    if (labelTransformedOverlap > 0) {
      hyphenLabel.classList.add(CSS.hyphen, CSS.hyphenWrap);
      if (rightValueLabelStaticHostOffset === 0 && leftValueLabelStaticHostOffset === 0) {
        // Neither handle overlaps the host boundary
        let leftValueLabelTranslate = labelTransformedOverlap / 2 - labelOffset;
        leftValueLabelTranslate =
          Math.sign(leftValueLabelTranslate) === -1
            ? Math.abs(leftValueLabelTranslate)
            : -leftValueLabelTranslate;

        const leftValueLabelTransformedHostOffset = this.getHostOffset(
          leftValueLabelTransformed.getBoundingClientRect().left +
            leftValueLabelTranslate -
            labelOffset,
          leftValueLabelTransformed.getBoundingClientRect().right +
            leftValueLabelTranslate -
            labelOffset,
        );

        let rightValueLabelTranslate = labelTransformedOverlap / 2;
        const rightValueLabelTransformedHostOffset = this.getHostOffset(
          rightValueLabelTransformed.getBoundingClientRect().left + rightValueLabelTranslate,
          rightValueLabelTransformed.getBoundingClientRect().right + rightValueLabelTranslate,
        );

        if (leftValueLabelTransformedHostOffset !== 0) {
          leftValueLabelTranslate += leftValueLabelTransformedHostOffset;
          rightValueLabelTranslate += leftValueLabelTransformedHostOffset;
        }

        if (rightValueLabelTransformedHostOffset !== 0) {
          leftValueLabelTranslate += rightValueLabelTransformedHostOffset;
          rightValueLabelTranslate += rightValueLabelTransformedHostOffset;
        }

        leftValueLabel.style.transform = `translateX(${leftValueLabelTranslate}px)`;
        leftValueLabelTransformed.style.transform = `translateX(${
          leftValueLabelTranslate - labelOffset
        }px)`;
        rightValueLabel.style.transform = `translateX(${rightValueLabelTranslate}px)`;
        rightValueLabelTransformed.style.transform = `translateX(${rightValueLabelTranslate}px)`;
      } else if (leftValueLabelStaticHostOffset > 0 || rightValueLabelStaticHostOffset > 0) {
        // labels overlap host boundary on the left side
        leftValueLabel.style.transform = `translateX(${
          leftValueLabelStaticHostOffset + labelOffset
        }px)`;
        rightValueLabel.style.transform = `translateX(${
          labelTransformedOverlap + rightValueLabelStaticHostOffset
        }px)`;
        rightValueLabelTransformed.style.transform = `translateX(${
          labelTransformedOverlap + rightValueLabelStaticHostOffset
        }px)`;
      } else if (leftValueLabelStaticHostOffset < 0 || rightValueLabelStaticHostOffset < 0) {
        // labels overlap host boundary on the right side
        let leftValueLabelTranslate =
          Math.abs(leftValueLabelStaticHostOffset) + labelTransformedOverlap - labelOffset;
        leftValueLabelTranslate =
          Math.sign(leftValueLabelTranslate) === -1
            ? Math.abs(leftValueLabelTranslate)
            : -leftValueLabelTranslate;
        leftValueLabel.style.transform = `translateX(${leftValueLabelTranslate}px)`;
        leftValueLabelTransformed.style.transform = `translateX(${
          leftValueLabelTranslate - labelOffset
        }px)`;
      }
    } else {
      hyphenLabel.classList.remove(CSS.hyphen, CSS.hyphenWrap);
      leftValueLabel.style.transform = `translateX(${leftValueLabelStaticHostOffset}px)`;
      leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelStaticHostOffset}px)`;
      rightValueLabel.style.transform = `translateX(${rightValueLabelStaticHostOffset}px)`;
      rightValueLabelTransformed.style.transform = `translateX(${rightValueLabelStaticHostOffset}px)`;
    }
  }

  /** Hides bounding tick labels that are obscured by either handle. */
  private hideObscuredBoundingTickLabels(): void {
    const valueIsRange = isRange(this.value);
    if (!this.hasHistogram && !valueIsRange && !this.labelHandles && !this.precise) {
      return;
    }
    if (!this.hasHistogram && !valueIsRange && this.labelHandles && !this.precise) {
      return;
    }
    if (!this.hasHistogram && !valueIsRange && !this.labelHandles && this.precise) {
      return;
    }
    if (!this.hasHistogram && !valueIsRange && this.labelHandles && this.precise) {
      return;
    }
    if (!this.hasHistogram && valueIsRange && !this.precise) {
      return;
    }
    if (this.hasHistogram && !this.precise && !this.labelHandles) {
      return;
    }

    const minHandle: HTMLDivElement | null = this.el.shadowRoot.querySelector(
      `.${CSS.thumbMinValue}`,
    );
    const maxHandle: HTMLDivElement | null = this.el.shadowRoot.querySelector(`.${CSS.thumbValue}`);

    const minTickLabel: HTMLSpanElement | null = this.el.shadowRoot.querySelector(
      `.${CSS.tickMin}`,
    );
    const maxTickLabel: HTMLSpanElement | null = this.el.shadowRoot.querySelector(
      `.${CSS.tickMax}`,
    );

    if (!minHandle && maxHandle && minTickLabel && maxTickLabel) {
      minTickLabel.style.opacity = this.isMinTickLabelObscured(minTickLabel, maxHandle) ? "0" : "1";
      maxTickLabel.style.opacity = this.isMaxTickLabelObscured(maxTickLabel, maxHandle) ? "0" : "1";
    }

    if (minHandle && maxHandle && minTickLabel && maxTickLabel) {
      minTickLabel.style.opacity =
        this.isMinTickLabelObscured(minTickLabel, minHandle) ||
        this.isMinTickLabelObscured(minTickLabel, maxHandle)
          ? "0"
          : "1";
      maxTickLabel.style.opacity =
        this.isMaxTickLabelObscured(maxTickLabel, minHandle) ||
        (this.isMaxTickLabelObscured(maxTickLabel, maxHandle) && this.hasHistogram)
          ? "0"
          : "1";
    }
  }

  /**
   * Returns an integer representing the number of pixels to offset on the left or right side based on desired position behavior.
   *
   * @param leftBounds
   * @param rightBounds
   * @private
   */
  private getHostOffset(leftBounds: number, rightBounds: number): number {
    const { left, right } = this.el.getBoundingClientRect();

    if (leftBounds < left) {
      return left - leftBounds;
    }

    if (rightBounds > right) {
      return -(rightBounds - right);
    }

    return 0;
  }

  /**
   * Returns an integer representing the number of pixels that the two given span elements are overlapping, taking into account
   * a space in between the two spans equal to the font-size set on them to account for the space needed to render a hyphen.
   *
   * @param leftLabel
   * @param rightLabel
   */
  private getRangeLabelOverlap(leftLabel: HTMLSpanElement, rightLabel: HTMLSpanElement): number {
    const leftLabelBounds = leftLabel.getBoundingClientRect();
    const rightLabelBounds = rightLabel.getBoundingClientRect();
    const leftLabelFontSize = this.getFontSizeForElement(leftLabel);
    const rangeLabelOverlap = leftLabelBounds.right + leftLabelFontSize - rightLabelBounds.left;

    return Math.max(rangeLabelOverlap, 0);
  }

  /**
   * Returns a boolean value representing if the minLabel span element is obscured (being overlapped) by the given handle div element.
   *
   * @param minLabel
   * @param handle
   */
  private isMinTickLabelObscured(minLabel: HTMLSpanElement, handle: HTMLDivElement): boolean {
    const minLabelBounds = minLabel.getBoundingClientRect();
    const handleBounds = handle.getBoundingClientRect();
    return intersects(minLabelBounds, handleBounds);
  }

  /**
   * Returns a boolean value representing if the maxLabel span element is obscured (being overlapped) by the given handle div element.
   *
   * @param maxLabel
   * @param handle
   */
  private isMaxTickLabelObscured(maxLabel: HTMLSpanElement, handle: HTMLDivElement): boolean {
    const maxLabelBounds = maxLabel.getBoundingClientRect();
    const handleBounds = handle.getBoundingClientRect();
    return intersects(maxLabelBounds, handleBounds);
  }

  private internalLabelFormatter(value: number, type: "max" | "min" | "value" | "tick"): string {
    const customFormatter = this.labelFormatter;

    if (!customFormatter) {
      return this.formatValue(value);
    }

    const formattedValue = customFormatter(value, type, this.formatValue);

    if (formattedValue == null) {
      return this.formatValue(value);
    }

    return formattedValue;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const id = this.el.id || this.guid;
    const value = isRange(this.value) ? this.maxValue : this.value;
    const min = this.minValue || this.min;
    const useMinValue = this.shouldUseMinValue();
    const minInterval = this.getUnitInterval(useMinValue ? this.minValue : min) * 100;
    const maxInterval = this.getUnitInterval(value) * 100;
    const mirror = this.shouldMirror();
    const valueIsRange = isRange(this.value);

    const thumbTypes = this.buildThumbType("max");
    const thumb = this.renderThumb({
      type: thumbTypes,
      thumbPlacement: thumbTypes.includes("histogram") ? "below" : "above",
      maxInterval,
      minInterval,
      mirror,
    });

    const minThumbTypes = this.buildThumbType("min");
    const minThumb = valueIsRange
      ? this.renderThumb({
          type: minThumbTypes,
          thumbPlacement:
            minThumbTypes.includes("histogram") || minThumbTypes.includes("precise")
              ? "below"
              : "above",
          maxInterval,
          minInterval,
          mirror,
        })
      : null;

    const fillPlacement = valueIsRange ? "start" : this.fillPlacement;
    const trackRangePlacementStyles =
      fillPlacement === "none"
        ? {
            left: `unset`,
            right: `unset`,
          }
        : fillPlacement === "end"
          ? {
              left: `${mirror ? minInterval : maxInterval}%`,
              right: `${mirror ? maxInterval : minInterval}%`,
            }
          : /* default */
            {
              left: `${mirror ? 100 - maxInterval : minInterval}%`,
              right: `${mirror ? minInterval : 100 - maxInterval}%`,
            };
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", id);

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          aria-errormessage={IDS.validationMessage}
          ariaInvalid={this.status === "invalid"}
          ariaLabel={getLabelText(this)}
          class={{
            [CSS.container]: true,
            [CSS.containerRange]: valueIsRange,
            [CSS.scale(this.scale)]: true,
          }}
        >
          {this.renderGraph()}
          <div class={CSS.track} ref={this.storeTrackRef}>
            <div
              class={CSS.trackRange}
              onPointerDown={this.onTrackPointerDown}
              style={trackRangePlacementStyles}
            />
            <div class={CSS.ticks}>
              {this.tickValues.map((tick) => {
                const tickOffset = `${this.getUnitInterval(tick) * 100}%`;

                let activeTicks: boolean = false;

                if (fillPlacement === "start" || fillPlacement === "end") {
                  if (useMinValue) {
                    activeTicks = tick >= this.minValue && tick <= this.maxValue;
                  } else {
                    const rangeStart = fillPlacement === "start" ? min : value;
                    const rangeEnd = fillPlacement === "start" ? value : this.max;
                    activeTicks = tick >= rangeStart && tick <= rangeEnd;
                  }
                }

                return (
                  <span
                    class={{
                      [CSS.tick]: true,
                      [CSS.tickActive]: activeTicks,
                    }}
                    style={{
                      left: mirror ? "" : tickOffset,
                      right: mirror ? tickOffset : "",
                    }}
                  >
                    {this.renderTickLabel(tick)}
                  </span>
                );
              })}
            </div>
          </div>
          <div class={CSS.thumbContainer}>
            {minThumb}
            {thumb}
            <HiddenFormInputSlot component={this} />
          </div>
        </div>
        {this.validationMessage && this.status === "invalid" ? (
          <Validation
            icon={this.validationIcon}
            id={IDS.validationMessage}
            message={this.validationMessage}
            scale={this.scale}
            status={this.status}
          />
        ) : null}
      </InteractiveContainer>
    );
  }

  private renderThumb({
    type,
    mirror,
    thumbPlacement,
    minInterval,
    maxInterval,
  }: {
    maxInterval: number;
    minInterval: number;
    mirror: boolean;
    thumbPlacement: "above" | "below";
    type: string;
  }) {
    const isLabeled = type.includes("labeled");
    const isPrecise = type.includes("precise");
    const isMinThumb = type.includes("min");

    const valueIsRange = isRange(this.value);
    const value = isMinThumb
      ? this.minValue
      : valueIsRange
        ? this.maxValue
        : (this.value as number);
    const valueProp = isMinThumb ? "minValue" : valueIsRange ? "maxValue" : "value";
    const ariaLabel = isMinThumb ? this.minLabel : valueIsRange ? this.maxLabel : this.minLabel;
    const ariaValuenow = isMinThumb ? this.minValue : value;
    const displayedValue =
      valueProp === "minValue"
        ? this.internalLabelFormatter(this.minValue, "min")
        : valueProp === "maxValue"
          ? this.internalLabelFormatter(this.maxValue, "max")
          : this.internalLabelFormatter(value, "value");
    const thumbStyle: SideOffset = isMinThumb
      ? { left: `${mirror ? 100 - minInterval : minInterval}%` }
      : { right: `${mirror ? maxInterval : 100 - maxInterval}%` };
    const thumbLabelClasses = `${CSS.handleLabel} ${
      isMinThumb ? CSS.handleLabelMinValue : CSS.handleLabelValue
    }`;

    const labels = isLabeled
      ? [
          <span ariaHidden="true" class={thumbLabelClasses}>
            {displayedValue}
          </span>,
          <span ariaHidden="true" class={`${thumbLabelClasses} ${CSS.static}`}>
            {displayedValue}
          </span>,
          <span ariaHidden="true" class={`${thumbLabelClasses} ${CSS.transformed}`}>
            {displayedValue}
          </span>,
        ]
      : [];

    const thumbContent: JsxNode[] = [
      ...labels,
      <div class={CSS.handle} />,
      isPrecise && <div class={CSS.handleExtension} />,
    ];

    if (thumbPlacement === "below") {
      thumbContent.reverse();
    }

    return (
      <div
        ariaLabel={ariaLabel}
        ariaOrientation="horizontal"
        ariaValueMax={this.max}
        ariaValueMin={this.min}
        ariaValueNow={ariaValuenow}
        class={{
          [CSS.thumb]: true,
          [CSS.thumbValue]: !isMinThumb,
          [CSS.thumbActive]: this.lastDragProp !== "minMaxValue" && this.dragProp === valueProp,
          [CSS.thumbPrecise]: isPrecise,
          [CSS.thumbMinValue]: isMinThumb,
        }}
        data-value-prop={valueProp}
        key={type}
        onBlur={this.onThumbBlur}
        onFocus={this.onThumbFocus}
        onPointerDown={this.onThumbPointerDown}
        ref={this.storeThumbRef}
        role="slider"
        style={thumbStyle}
        tabIndex={0}
      >
        {thumbContent}
      </div>
    );
  }

  private renderGraph(): JsxNode {
    return this.histogram ? (
      <calcite-graph
        class={CSS.graph}
        colorStops={this.histogramStops}
        data={this.histogram}
        highlightMax={isRange(this.value) ? this.maxValue : this.value}
        highlightMin={isRange(this.value) ? this.minValue : this.min}
        max={this.max}
        min={this.min}
      />
    ) : null;
  }

  private renderTickLabel(tick: number): JsxNode {
    const { hasHistogram, labelHandles, labelTicks, max, min, precise, value } = this;
    const valueIsRange = isRange(value);
    const isMinTickLabel = tick === min;
    const isMaxTickLabel = tick === max;
    const isAtEdge = isMinTickLabel || isMaxTickLabel;

    const shouldDisplayLabel =
      labelTicks &&
      ((!hasHistogram && (isAtEdge || !precise || !valueIsRange)) ||
        (hasHistogram && (isAtEdge || (!precise && !labelHandles))));

    return shouldDisplayLabel ? (
      <span
        class={{
          [CSS.tickLabel]: true,
          [CSS.tickMin]: isMinTickLabel,
          [CSS.tickMax]: isMaxTickLabel,
        }}
      >
        {this.internalLabelFormatter(tick, "tick")}
      </span>
    ) : null;
  }

  // #endregion
}
