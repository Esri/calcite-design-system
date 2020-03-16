import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h,
  State
} from "@stencil/core";
import {
  LEFT,
  RIGHT,
  UP,
  DOWN,
  PAGE_UP,
  PAGE_DOWN,
  HOME,
  END
} from "../../utils/keys";
import { guid } from "../../utils/guid";
type activeSliderProperty = "minValue" | "maxValue" | "value";

@Component({
  tag: "calcite-slider",
  styleUrl: "calcite-slider.scss",
  shadow: true
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
  @Prop({ reflectToAttr: true }) theme: "light" | "dark";
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
    this.calciteSliderUpdate.emit();
  }

  render() {
    const id = this.el.id || this.guid;
    const min = this.minValue || this.min;
    const max = this.maxValue || this.value;
    const maxProp = this.isRange ? "maxValue" : "value";
    const left = `${this.getUnitInterval(min) * 100}%`;
    const right = `${100 - this.getUnitInterval(max) * 100}%`;

    return (
      <Host id={id} is-range={this.isRange}>
        <div class="slider__track">
          <div class="slider__track__range" style={{ left, right }} />
          <div class="slider__ticks">
            {this.tickValues.map(number => (
              <span
                class={{
                  slider__tick: true,
                  "slider__tick--active": number >= min && number <= max
                }}
                style={{
                  left: `${this.getUnitInterval(number) * 100}%`
                }}
              >
                {this.labelTicks ? (
                  <span
                    class={{
                      slider__tick__label: true,
                      "slider__tick__label--min": number === this.min,
                      "slider__tick__label--max": number === this.max
                    }}
                  >
                    {number}
                  </span>
                ) : (
                  ""
                )}
              </span>
            ))}
          </div>
        </div>
        {this.isRange ? (
          <button
            ref={el => (this.minHandle = el as HTMLButtonElement)}
            onFocus={() => (this.activeProp = "minValue")}
            onBlur={() => (this.activeProp = null)}
            onMouseDown={() => this.dragStart("minValue")}
            onTouchStart={e => this.dragStart("minValue", e)}
            role="slider"
            aria-orientation="horizontal"
            aria-label={this.minLabel}
            aria-valuenow={this.minValue}
            aria-valuemin={this.min}
            aria-valuemax={this.max}
            disabled={this.disabled}
            style={{ left }}
            class={{
              slider__thumb: true,
              "slider__thumb--min": true,
              "slider__thumb--active": this.dragProp === "minValue",
              "slider__thumb--precise": this.precise
            }}
          >
            <span class="slider__handle"></span>
            {this.labelHandles ? (
              <span class="slider__handle__label" aria-hidden="true">
                {this.minValue}
              </span>
            ) : (
              ""
            )}
          </button>
        ) : (
          ""
        )}
        <button
          ref={el => (this.maxHandle = el as HTMLButtonElement)}
          onFocus={() => (this.activeProp = maxProp)}
          onBlur={() => (this.activeProp = null)}
          onMouseDown={() => this.dragStart(maxProp)}
          onTouchStart={e => this.dragStart(maxProp, e)}
          role="slider"
          aria-orientation="horizontal"
          aria-label={this.isRange ? this.maxLabel : this.minLabel}
          aria-valuenow={this[maxProp]}
          aria-valuemin={this.min}
          aria-valuemax={this.max}
          disabled={this.disabled}
          style={{ right }}
          class={{
            slider__thumb: true,
            "slider__thumb--max": true,
            "slider__thumb--active": this.dragProp === maxProp,
            "slider__thumb--precise": this.precise
          }}
        >
          <span class="slider__handle"></span>
          {this.labelHandles ? (
            <span class="slider__handle__label" aria-hidden="true">
              {this[maxProp]}
            </span>
          ) : (
            ""
          )}
        </button>
      </Host>
    );
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    const value = this[this.activeProp];
    switch (e.keyCode) {
      case UP:
      case RIGHT:
        e.preventDefault();
        this[this.activeProp] = this.bound(value + this.step, this.activeProp);
        this.calciteSliderUpdate.emit();
        break;
      case DOWN:
      case LEFT:
        e.preventDefault();
        this[this.activeProp] = this.bound(value - this.step, this.activeProp);
        this.calciteSliderUpdate.emit();
        break;
      case PAGE_UP:
        if (this.pageStep) {
          e.preventDefault();
          this[this.activeProp] = this.bound(
            value + this.pageStep,
            this.activeProp
          );
          this.calciteSliderUpdate.emit();
        }
        break;
      case PAGE_DOWN:
        if (this.pageStep) {
          e.preventDefault();
          this[this.activeProp] = this.bound(
            value - this.pageStep,
            this.activeProp
          );
          this.calciteSliderUpdate.emit();
        }
        break;
      case HOME:
        e.preventDefault();
        this[this.activeProp] = this.bound(this.min, this.activeProp);
        this.calciteSliderUpdate.emit();
        break;
      case END:
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
      const closerToMax =
        Math.abs(this.maxValue - num) < Math.abs(this.minValue - num);
      prop = closerToMax ? "maxValue" : "minValue";
    }
    this[prop] = this.bound(num, prop);
    this.calciteSliderUpdate.emit();
    const handle = prop === "minValue" ? this.minHandle : this.maxHandle;
    handle.focus();
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
  private minHandle: HTMLButtonElement;
  /** @internal */
  private maxHandle: HTMLButtonElement;
  /** @internal */
  private dragListener: (e: MouseEvent) => void;
  /** @internal */
  @State() private tickValues: number[] = [];
  /** @internal */
  @State() private activeProp: activeSliderProperty = "value";

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
    this.activeProp = prop;
    this.dragListener = this.dragListener || this.dragUpdate.bind(this);
    document.addEventListener("mousemove", this.dragListener);
    document.addEventListener("touchmove", this.dragListener, {
      capture: false
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
      this[this.dragProp] = this.bound(value, this.dragProp);
      this.calciteSliderUpdate.emit();
    }
  }

  private dragEnd(): void {
    this.dragProp = null;
    document.removeEventListener("mousemove", this.dragListener);
    document.removeEventListener("touchmove", this.dragListener);
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
}
