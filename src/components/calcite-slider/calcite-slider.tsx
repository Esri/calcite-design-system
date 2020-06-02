import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  Method,
  h,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { getKey } from "../../utils/key";
import { DataSeries } from "../../interfaces/Graph";

type activeSliderProperty = "minValue" | "maxValue" | "value" | "minMaxValue";

@Component({
  tag: "calcite-slider",
  styleUrl: "calcite-slider.scss",
  shadow: true,
})
export class CalciteSlider {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";
  /** Disable and gray out the slider */
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;
  /** Minimum selectable value */
  @Prop({ reflect: true, mutable: true }) min: number = 0;
  /** Maximum selectable value */
  @Prop({ reflect: true, mutable: true }) max: number = 100;
  /** Currently selected number (if single select) */
  @Prop({ reflect: true, mutable: true }) value: null | number = null;
  /** Currently selected lower number (if multi-select) */
  @Prop() minValue?: number;
  /** Currently selected upper number (if multi-select) */
  @Prop() maxValue?: number;
  /** Label for first (or only) handle (ex. "Temperature, lower bound") */
  @Prop() minLabel: string;
  /** Label for second handle if needed (ex. "Temperature, upper bound") */
  @Prop() maxLabel?: string;
  /** Snap selection along the step interval */
  @Prop() snap?: boolean = true;
  /** Interval to move on up/down keys */
  @Prop() step?: number = 1;
  /** Interval to move on page up/page down keys */
  @Prop() pageStep?: number;
  /** Show tick marks on the number line at provided interval */
  @Prop() ticks?: number;
  /** Label tick marks with their numeric value. */
  @Prop({ reflect: true }) labelTicks?: boolean;
  /** Label handles with their numeric value */
  @Prop({ reflect: true }) labelHandles?: boolean;
  /** Use finer point for handles */
  @Prop() precise?: boolean;
  /** Display a histogram above the slider */
  @Prop() histogram?: DataSeries;
  @Watch("histogram") histogramWatcher(newHistogram) {
    this.hasHistogram = newHistogram ? true : false;
  }
  /** Indicates if a histogram is present */
  @Prop({ reflect: true, mutable: true }) hasHistogram: boolean = false;
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.isRange = !!(this.maxValue || this.maxValue === 0);
    this.tickValues = this.generateTickValues();
    this.value = this.bound(this.value);
    if (this.snap) {
      this.value = this.getClosestStep(this.value);
    }
    if (this.histogram) {
      this.hasHistogram = true;
    }
    this.calciteSliderUpdate.emit();
  }

  componentDidRender() {
    this.adjustObscuredHandleLabel("value");
    if (this.isRange) {
      this.adjustObscuredHandleLabel("minValue");
      if (this.precise && this.labelTicks) {
        this.hideBoundingTrackLabels();
      }
    }
  }

  render() {
    const id = this.el.id || this.guid;
    const min = this.minValue || this.min;
    const max = this.maxValue || this.value;
    const maxProp = this.isRange ? "maxValue" : "value";
    const left = `${this.getUnitInterval(min) * 100}%`;
    const right = `${100 - this.getUnitInterval(max) * 100}%`;

    const handle = (
      <button
        ref={(el) => (this.maxHandle = el as HTMLButtonElement)}
        onFocus={() => (this.activeProp = maxProp)}
        onBlur={() => (this.activeProp = null)}
        onMouseDown={() => this.dragStart(maxProp)}
        onTouchStart={(e) => this.dragStart(maxProp, e)}
        role="slider"
        aria-orientation="horizontal"
        aria-label={this.isRange ? this.maxLabel : this.minLabel}
        aria-valuenow={this[maxProp]}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        disabled={this.disabled}
        style={{ right }}
        class={{
          thumb: true,
          "thumb--max": true,
          "thumb--active":
            this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        }}
      >
        <div class="handle"></div>
      </button>
    );

    const labeledHandle = (
      <button
        ref={(el) => (this.maxHandle = el as HTMLButtonElement)}
        onFocus={() => (this.activeProp = maxProp)}
        onBlur={() => (this.activeProp = null)}
        onMouseDown={() => this.dragStart(maxProp)}
        onTouchStart={(e) => this.dragStart(maxProp, e)}
        role="slider"
        aria-orientation="horizontal"
        aria-label={this.isRange ? this.maxLabel : this.minLabel}
        aria-valuenow={this[maxProp]}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        disabled={this.disabled}
        style={{ right }}
        class={{
          thumb: true,
          "thumb--max": true,
          "thumb--active":
            this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
        }}
      >
        <span class="handle__label handle__label--value" aria-hidden="true">
          {this[maxProp]}
        </span>
        <span
          class="handle__label handle__label--value copy"
          aria-hidden="true"
        >
          {this[maxProp]}
        </span>
        <div class="handle"></div>
      </button>
    );

    const preciseHandle = (
      <button
        ref={(el) => (this.maxHandle = el as HTMLButtonElement)}
        onFocus={() => (this.activeProp = maxProp)}
        onBlur={() => (this.activeProp = null)}
        onMouseDown={() => this.dragStart(maxProp)}
        onTouchStart={(e) => this.dragStart(maxProp, e)}
        role="slider"
        aria-orientation="horizontal"
        aria-label={this.isRange ? this.maxLabel : this.minLabel}
        aria-valuenow={this[maxProp]}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        disabled={this.disabled}
        style={{ right }}
        class={{
          thumb: true,
          "thumb--max": true,
          "thumb--active":
            this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
          "thumb--precise": true,
        }}
      >
        <div class="handle"></div>
        <div class="handle-extension"></div>
      </button>
    );

    const labeledPreciseHandle = (
      <button
        ref={(el) => (this.maxHandle = el as HTMLButtonElement)}
        onFocus={() => (this.activeProp = maxProp)}
        onBlur={() => (this.activeProp = null)}
        onMouseDown={() => this.dragStart(maxProp)}
        onTouchStart={(e) => this.dragStart(maxProp, e)}
        role="slider"
        aria-orientation="horizontal"
        aria-label={this.isRange ? this.maxLabel : this.minLabel}
        aria-valuenow={this[maxProp]}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        disabled={this.disabled}
        style={{ right }}
        class={{
          thumb: true,
          "thumb--max": true,
          "thumb--active":
            this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
          "thumb--precise": true,
        }}
      >
        <span class="handle__label handle__label--value" aria-hidden="true">
          {this[maxProp]}
        </span>
        <span
          class="handle__label handle__label--value copy"
          aria-hidden="true"
        >
          {this[maxProp]}
        </span>
        <div class="handle"></div>
        <div class="handle-extension"></div>
      </button>
    );

    const minHandle = (
      <button
        ref={(el) => (this.minHandle = el as HTMLButtonElement)}
        onFocus={() => (this.activeProp = "minValue")}
        onBlur={() => (this.activeProp = null)}
        onMouseDown={() => this.dragStart("minValue")}
        onTouchStart={(e) => this.dragStart("minValue", e)}
        role="slider"
        aria-orientation="horizontal"
        aria-label={this.minLabel}
        aria-valuenow={this.minValue}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        disabled={this.disabled}
        style={{ left }}
        class={{
          thumb: true,
          "thumb--min": true,
          "thumb--active": this.dragProp === "minValue",
        }}
      >
        <div class="handle"></div>
      </button>
    );

    const minLabeledHandle = (
      <button
        ref={(el) => (this.minHandle = el as HTMLButtonElement)}
        onFocus={() => (this.activeProp = "minValue")}
        onBlur={() => (this.activeProp = null)}
        onMouseDown={() => this.dragStart("minValue")}
        onTouchStart={(e) => this.dragStart("minValue", e)}
        role="slider"
        aria-orientation="horizontal"
        aria-label={this.minLabel}
        aria-valuenow={this.minValue}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        disabled={this.disabled}
        style={{ left }}
        class={{
          thumb: true,
          "thumb--min": true,
          "thumb--active": this.dragProp === "minValue",
        }}
      >
        <span class="handle__label handle__label--minValue" aria-hidden="true">
          {this.minValue}
        </span>
        <span
          class="handle__label handle__label--minValue copy"
          aria-hidden="true"
        >
          {this.minValue}
        </span>
        <div class="handle"></div>
      </button>
    );

    const minPreciseHandle = (
      <button
        ref={(el) => (this.minHandle = el as HTMLButtonElement)}
        onFocus={() => (this.activeProp = "minValue")}
        onBlur={() => (this.activeProp = null)}
        onMouseDown={() => this.dragStart("minValue")}
        onTouchStart={(e) => this.dragStart("minValue", e)}
        role="slider"
        aria-orientation="horizontal"
        aria-label={this.minLabel}
        aria-valuenow={this.minValue}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        disabled={this.disabled}
        style={{ left }}
        class={{
          thumb: true,
          "thumb--min": true,
          "thumb--active": this.dragProp === "minValue",
          "thumb--precise": true,
        }}
      >
        <div class="handle-extension"></div>
        <div class="handle"></div>
      </button>
    );

    const minLabeledPreciseHandle = (
      <button
        ref={(el) => (this.minHandle = el as HTMLButtonElement)}
        onFocus={() => (this.activeProp = "minValue")}
        onBlur={() => (this.activeProp = null)}
        onMouseDown={() => this.dragStart("minValue")}
        onTouchStart={(e) => this.dragStart("minValue", e)}
        role="slider"
        aria-orientation="horizontal"
        aria-label={this.minLabel}
        aria-valuenow={this.minValue}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        disabled={this.disabled}
        style={{ left }}
        class={{
          thumb: true,
          "thumb--min": true,
          "thumb--active": this.dragProp === "minValue",
          "thumb--precise": true,
        }}
      >
        <div class="handle-extension"></div>
        <div class="handle"></div>
        <span class="handle__label handle__label--minValue" aria-hidden="true">
          {this.minValue}
        </span>
        <span
          class="handle__label handle__label--minValue copy"
          aria-hidden="true"
        >
          {this.minValue}
        </span>
      </button>
    );

    return (
      <Host id={id} is-range={this.isRange}>
        {this.renderGraph()}
        <div class="track">
          <div
            class="track__range"
            onMouseDown={() => this.dragStart("minMaxValue")}
            onTouchStart={(e) => this.dragStart("minMaxValue", e)}
            style={{ left, right }}
          />
          <div class="ticks">
            {this.tickValues.map((tick) => (
              <span
                class={{
                  tick: true,
                  "tick--active": tick >= min && tick <= max,
                }}
                style={{
                  left: `${this.getUnitInterval(tick) * 100}%`,
                }}
              >
                {this.renderTickLabel(tick)}
              </span>
            ))}
          </div>
        </div>
        {!this.precise && !this.labelHandles && this.isRange ? minHandle : null}
        {!this.precise && this.labelHandles && this.isRange
          ? minLabeledHandle
          : null}
        {this.precise && !this.labelHandles && this.isRange
          ? minPreciseHandle
          : null}
        {this.precise && this.labelHandles && this.isRange
          ? minLabeledPreciseHandle
          : null}

        {!this.precise && !this.labelHandles ? handle : null}
        {!this.precise && this.labelHandles ? labeledHandle : null}
        {this.precise && !this.labelHandles ? preciseHandle : null}
        {this.precise && this.labelHandles ? labeledPreciseHandle : null}
      </Host>
    );
  }

  private renderGraph(): VNode {
    return this.histogram ? (
      <div class="graph">
        <calcite-graph
          width={300}
          height={48}
          data={this.histogram}
          highlightMin={this.isRange ? this.minValue : null}
          highlightMax={this.isRange ? this.maxValue : null}
        />
      </div>
    ) : null;
  }

  private renderTickLabel(tick: number): VNode {
    const isMinTickLabel = tick === this.min;
    const isMaxTickLabel = tick === this.max;
    const tickLabel = (
      <span
        class={{
          tick__label: true,
          "tick__label--min": isMinTickLabel,
          "tick__label--max": isMaxTickLabel,
        }}
      >
        {tick}
      </span>
    );
    if (this.labelTicks) {
      if (this.isRange) {
        if (this.precise) {
          if (isMinTickLabel || isMaxTickLabel) {
            return tickLabel;
          } else {
            return null;
          }
        }
        return tickLabel;
      }
      return tickLabel;
    }
    return null;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    const value = this[this.activeProp];
    switch (getKey(e.key)) {
      case "ArrowUp":
      case "ArrowRight":
        e.preventDefault();
        this[this.activeProp] = this.bound(value + this.step, this.activeProp);
        this.calciteSliderUpdate.emit();
        break;
      case "ArrowDown":
      case "ArrowLeft":
        e.preventDefault();
        this[this.activeProp] = this.bound(value - this.step, this.activeProp);
        this.calciteSliderUpdate.emit();
        break;
      case "PageUp":
        if (this.pageStep) {
          e.preventDefault();
          this[this.activeProp] = this.bound(
            value + this.pageStep,
            this.activeProp
          );
          this.calciteSliderUpdate.emit();
        }
        break;
      case "PageDown":
        if (this.pageStep) {
          e.preventDefault();
          this[this.activeProp] = this.bound(
            value - this.pageStep,
            this.activeProp
          );
          this.calciteSliderUpdate.emit();
        }
        break;
      case "Home":
        e.preventDefault();
        this[this.activeProp] = this.bound(this.min, this.activeProp);
        this.calciteSliderUpdate.emit();
        break;
      case "End":
        e.preventDefault();
        this[this.activeProp] = this.bound(this.max, this.activeProp);
        this.calciteSliderUpdate.emit();
        break;
    }
  }
  @Listen("click") clickHandler(e: MouseEvent) {
    const x = e.clientX || e.pageX;
    const num = this.translate(x);
    let prop: activeSliderProperty = "value";
    if (this.isRange) {
      if (this.lastDragProp === "minMaxValue") {
        prop = "minMaxValue";
      } else {
        const closerToMax =
          Math.abs(this.maxValue - num) < Math.abs(this.minValue - num);
        prop = closerToMax ? "maxValue" : "minValue";
      }
    }
    this[prop] = this.bound(num, prop);
    this.calciteSliderUpdate.emit();
    switch (prop) {
      default:
      case "maxValue":
        this.maxHandle.focus();
        break;
      case "minValue":
        this.minHandle.focus();
        break;
      case "minMaxValue":
        break;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   * Fires on all updates to the slider.
   * :warning: Will be fired frequently during drag. If you are performing any
   * expensive operations consider using a debounce or throttle to avoid
   * locking up the main thread.
   */
  @Event() calciteSliderUpdate: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  @Method()
  async setFocus() {
    const handle = this.minHandle ? this.minHandle : this.maxHandle;
    handle.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  /** @internal */
  private guid = `calcite-slider-${guid()}`;
  /** @internal */
  private isRange: boolean = false;
  /** @internal */
  private dragProp: activeSliderProperty;
  /** @internal */
  private lastDragProp: activeSliderProperty;
  /** @internal */
  private minHandle: HTMLButtonElement;
  /** @internal */
  private maxHandle: HTMLButtonElement;
  /** @internal */
  private dragListener: (e: MouseEvent) => void;
  /** @internal */
  @State() private tickValues: number[] = [];
  /** @internal */
  @State() private activeProp: activeSliderProperty = "value";
  /** @internal */
  @State() private minMaxValueRange: number = null;
  /** @internal */
  @State() private minValueDragRange: number = null;
  /** @internal */
  @State() private maxValueDragRange: number = null;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private generateTickValues(): number[] {
    const ticks = [];
    let current = this.min;
    while (this.ticks && current < this.max + this.ticks) {
      ticks.push(current);
      current = current + this.ticks;
    }
    return ticks;
  }

  private dragStart(prop: activeSliderProperty, e?: TouchEvent): void {
    if (e) {
      e.preventDefault();
    }
    if (this.dragListener) {
      this.dragEnd();
    }
    this.dragProp = prop;
    this.lastDragProp = this.dragProp;
    this.activeProp = prop;
    this.dragListener = this.dragListener || this.dragUpdate.bind(this);
    document.addEventListener("mousemove", this.dragListener);
    document.addEventListener("touchmove", this.dragListener, {
      capture: false,
    });
    document.addEventListener("mouseup", this.dragEnd.bind(this));
    document.addEventListener("touchend", this.dragEnd.bind(this), false);
    document.addEventListener("touchcancel", this.dragEnd.bind(this));
  }

  private dragUpdate(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.dragProp) {
      const value = this.translate(e.clientX || e.pageX);
      if (this.isRange && this.dragProp === "minMaxValue") {
        if (
          this.minValueDragRange &&
          this.maxValueDragRange &&
          this.minMaxValueRange
        ) {
          const newMinValue = value - this.minValueDragRange;
          const newMaxValue = value + this.maxValueDragRange;
          if (
            newMaxValue <= this.max &&
            newMinValue >= this.min &&
            newMaxValue - newMinValue === this.minMaxValueRange
          ) {
            this.minValue = this.bound(newMinValue, "minValue");
            this.maxValue = this.bound(newMaxValue, "maxValue");
          }
        } else {
          this.minValueDragRange = value - this.minValue;
          this.maxValueDragRange = this.maxValue - value;
          this.minMaxValueRange = this.maxValue - this.minValue;
        }
      } else {
        this[this.dragProp] = this.bound(value, this.dragProp);
      }
      this.calciteSliderUpdate.emit();
    }
  }

  private dragEnd(): void {
    this.dragProp = null;
    document.removeEventListener("mousemove", this.dragListener);
    document.removeEventListener("touchmove", this.dragListener);
    this.minValueDragRange = null;
    this.maxValueDragRange = null;
    this.minMaxValueRange = null;
  }
  /**
   * If number is outside range, constrain to min or max
   * @internal
   */
  private bound(num: number, prop?: activeSliderProperty): number {
    num = Math.min(num, this.max);
    num = Math.max(num, this.min);
    // ensure that maxValue and minValue don't swap positions
    if (prop === "maxValue") {
      num = Math.max(num, this.minValue);
    }
    if (prop === "minValue") {
      num = Math.min(num, this.maxValue);
    }
    return num;
  }
  /**
   * Translate a pixel position to value along the range
   * @internal
   */
  private translate(x: number): number {
    const range = this.max - this.min;
    const { left, width } = this.el.getBoundingClientRect();
    const percent = (x - left) / width;
    let value = this.bound(this.min + range * percent);
    if (this.snap && this.step) {
      value = this.getClosestStep(value);
    }
    return value;
  }
  /**
   * Get closest allowed value along stepped values
   * @internal
   */
  private getClosestStep(num: number): number {
    num = this.bound(num);
    if (this.step) {
      const step = Math.round(num / this.step) * this.step;
      num = this.bound(step);
    }
    return num;
  }
  /**
   * Get position of value along range as fractional value
   * @return {number} number in the unit interval [0,1]
   * @internal
   */
  private getUnitInterval(num: number): number {
    num = this.bound(num);
    const range = this.max - this.min;
    return (num - this.min) / range;
  }
  private adjustObscuredHandleLabel(name: "value" | "minValue") {
    if (this.labelHandles) {
      const element = this.el.shadowRoot.querySelector(
        `.handle__label--${name}`
      );
      const elementCopy = this.el.shadowRoot.querySelector(
        `.handle__label--${name}.copy`
      );
      if (element && elementCopy) {
        const isOutOfViewport = this.isOutOfViewport(
          elementCopy as HTMLElement
        );
        if (isOutOfViewport) {
          (element as HTMLElement).style.transform = `translateX(${isOutOfViewport}px)`;
        } else {
          (element as HTMLElement).style.transform = "";
        }
      }
    }
  }
  private hideBoundingTrackLabels() {
    const minHandle = this.el.shadowRoot.querySelector(".thumb--min");
    const minTickLabel = this.el.shadowRoot.querySelector(".tick__label--min");
    const maxTickLabel = this.el.shadowRoot.querySelector(".tick__label--max");

    if (
      this.isMinBoundingLabelObscured(
        (minTickLabel as HTMLElement).offsetParent,
        minHandle
      )
    ) {
      (minTickLabel as HTMLSpanElement).style.opacity = "0";
    } else {
      (minTickLabel as HTMLSpanElement).style.opacity = "1";
    }
    if (
      this.isMaxBoundingLabelObscured(
        (maxTickLabel as HTMLElement).offsetParent,
        minHandle
      )
    ) {
      (maxTickLabel as HTMLSpanElement).style.opacity = "0";
    } else {
      (maxTickLabel as HTMLSpanElement).style.opacity = "1";
    }
  }
  /**
   * Checks if an element is out of the viewport on either the left or right side
   * @link https://gomakethings.com/how-to-check-if-any-part-of-an-element-is-out-of-the-viewport-with-vanilla-js/
   * @internal
   */
  private isOutOfViewport(element: HTMLElement): number {
    const bounding = element.getBoundingClientRect();
    if (bounding.left < 0) {
      const offset = Math.abs(bounding.left);
      return offset;
    }
    if (
      bounding.right >
      (window.innerWidth || document.documentElement.clientWidth)
    ) {
      const offset = Math.floor(-(bounding.right - window.innerWidth + 1));
      return offset;
    }
    return 0;
  }

  private isMinBoundingLabelObscured(minLabel, handle) {
    const minLabelRight = minLabel.offsetLeft + minLabel.offsetWidth;
    const handleLeft = handle.offsetLeft;
    if (handleLeft < minLabelRight) {
      return true;
    }
    return false;
  }

  private isMaxBoundingLabelObscured(maxLabel, handle) {
    const maxLabelLeft = maxLabel.offsetLeft;
    const handleRight = handle.offsetLeft + handle.offsetWidth;
    if (handleRight > maxLabelLeft) {
      return true;
    }
    return false;
  }
}
