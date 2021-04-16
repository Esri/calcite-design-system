import {
  Component,
  Element,
  Host,
  VNode,
  h,
  Prop,
  Listen,
  Event,
  EventEmitter,
  State,
  Method
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { parseTimeString, Time, validateTimeString } from "../../utils/time";
import { Scale, Theme } from "../interfaces";

@Component({
  tag: "calcite-input-time-picker",
  styleUrl: "calcite-input-time-picker.scss",
  scoped: true
})
export class CalciteInputTimePicker {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputTimePickerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The active state of the time input */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** The disabled state of the time input */
  @Prop({ reflect: true }) disabled?: boolean;

  /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
  @Prop({ reflect: true }) hourDisplayFormat: "12" | "24" = "12";

  /** aria-label for the hour input */
  @Prop() intlHour?: string;

  /** aria-label for the hour down button */
  @Prop() intlHourDown?: string;

  /** aria-label for the hour up button */
  @Prop() intlHourUp?: string;

  /** aria-label for the meridiem (am/pm) input */
  @Prop() intlMeridiem?: string;

  /** aria-label for the meridiem (am/pm) down button */
  @Prop() intlMeridiemDown?: string;

  /** aria-label for the meridiem (am/pm) up button */
  @Prop() intlMeridiemUp?: string;

  /** aria-label for the minute input */
  @Prop() intlMinute?: string;

  /** aria-label for the minute down button */
  @Prop() intlMinuteDown?: string;

  /** aria-label for the minute up button */
  @Prop() intlMinuteUp?: string;

  /** aria-label for the second input */
  @Prop() intlSecond?: string;

  /** aria-label for the second down button */
  @Prop() intlSecondDown?: string;

  /** aria-label for the second up button */
  @Prop() intlSecondUp?: string;

  /** The name of the time input */
  @Prop() name?: string;

  /** The scale (size) of the time input */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** number that specifies the granularity that the value must adhere to */
  @Prop({ reflect: true }) step = 60;

  /** The color theme of the time-picker */
  @Prop({ reflect: true }) theme: Theme;

  /** The selected time */
  @Prop({ reflect: true, mutable: true }) value?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private calciteInputEl: HTMLCalciteInputElement;

  private referenceElementId: string = guid();

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the time value has changed.
   */
  @Event() calciteInputTimePickerChange: EventEmitter<string>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  private inputBlurHandler = (): void => {
    this.active = false;
    const newValue = validateTimeString(this.calciteInputEl.value);
    if (newValue) {
      this.setValue(newValue);
    } else {
      this.setValue(validateTimeString(this.value));
    }
  };

  private inputFocusHandler = (): void => {
    this.active = true;
  };

  private inputInputHandler = (event: CustomEvent): void => {
    const value = event.detail.value;
    const validatedValue = validateTimeString(value);
    if (validatedValue) {
      this.setValue(validatedValue);
    } else if (!value) {
      this.setValue(value);
    }
  };

  @Listen("keyup")
  keyUpHandler(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.active) {
      this.active = false;
    }
  }

  @Listen("calciteTimePickerBlur")
  timePickerBlurHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.active = false;
  }

  @Listen("calciteTimePickerChange")
  timePickerChangeHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.detail) {
      const { hour, minute, second } = event.detail as Time;
      if (hour && minute) {
        if (second && this.step !== 60) {
          this.setValue(`${hour}:${minute}:${second}`);
        } else {
          this.setValue(`${hour}:${minute}`);
        }
      } else {
        this.setValue("");
      }
    }
  }

  @Listen("calciteTimePickerFocus")
  timePickerFocusHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.active = true;
  }

  @Listen("click", { target: "window" })
  windowClickHandler(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const closestHost = target.closest(
      "calcite-input-time-picker"
    ) as HTMLCalciteInputTimePickerElement;
    const closestLabel = target.closest("calcite-label") as HTMLCalciteLabelElement;
    if (closestLabel && closestLabel.for === this.el.id) {
      this.setFocus();
      this.active = true;
    } else if (closestHost !== this.el) {
      this.active = false;
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    this.calciteInputEl.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private setCalciteInputEl = (el: HTMLCalciteInputElement): void => {
    this.calciteInputEl = el;
  };

  private setValue = (value: string): void => {
    this.value = value;
    this.calciteInputTimePickerChange.emit(value);
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad() {
    if (this.value) {
      this.setValue(validateTimeString(this.value));
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { hour, minute, second } = parseTimeString(this.value);
    const popoverId = `${this.referenceElementId}-popover`;
    return (
      <Host>
        <div
          aria-controls={popoverId}
          aria-haspopup="dialog"
          aria-label={this.name}
          aria-owns={popoverId}
          id={this.referenceElementId}
          role="combobox"
        >
          <calcite-input
            disabled={this.disabled}
            icon="clock"
            name={this.name}
            onCalciteInputBlur={this.inputBlurHandler}
            onCalciteInputFocus={this.inputFocusHandler}
            onCalciteInputInput={this.inputInputHandler}
            ref={this.setCalciteInputEl}
            scale={this.scale}
            step={this.step}
            theme={this.theme}
            value={this.value}
          />
        </div>
        <calcite-popover
          id={popoverId}
          label="Time Picker"
          open={this.active}
          referenceElement={this.referenceElementId}
          theme={this.theme}
        >
          <calcite-time-picker
            hour={hour}
            hour-display-format={this.hourDisplayFormat}
            intlHour={this.intlHour}
            intlHourDown={this.intlHourDown}
            intlHourUp={this.intlHourUp}
            intlMeridiem={this.intlMeridiem}
            intlMeridiemDown={this.intlMeridiemDown}
            intlMeridiemUp={this.intlMeridiemUp}
            intlMinute={this.intlMinute}
            intlMinuteDown={this.intlMinuteDown}
            intlMinuteUp={this.intlMinuteUp}
            intlSecond={this.intlSecond}
            intlSecondDown={this.intlSecondDown}
            intlSecondUp={this.intlSecondUp}
            minute={minute}
            scale={this.scale}
            second={second}
            step={this.step}
            theme={this.theme}
          />
        </calcite-popover>
      </Host>
    );
  }
}
