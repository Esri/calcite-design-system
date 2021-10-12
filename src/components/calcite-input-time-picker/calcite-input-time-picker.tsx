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
  Method,
  Watch
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { getKey } from "../../utils/key";
import {
  parseTimeString,
  Time,
  formatTimeString,
  HourDisplayFormat,
  getMeridiem,
  getMeridiemHour
} from "../../utils/time";
import { Scale } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";

@Component({
  tag: "calcite-input-time-picker",
  styleUrl: "calcite-input-time-picker.scss",
  shadow: true
})
export class CalciteInputTimePicker implements LabelableComponent {
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
  @Prop({ reflect: true }) disabled = false;

  /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
  @Prop() hourDisplayFormat: HourDisplayFormat = "12";

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
  @Prop() step = 60;

  /** The selected time */
  @Prop({ mutable: true }) value: string = null;

  @Watch("value")
  valueWatcher(newValue: string): void {
    if (!this.internalValueChange) {
      this.setValue({ value: newValue, origin: "external" });
    }
    this.internalValueChange = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  private calciteInputEl: HTMLCalciteInputElement;

  /** whether the value of the input was changed as a result of user typing or not */
  private internalValueChange = false;

  private previousValidValue: string = null;

  private referenceElementId = `input-time-picker-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the time value is changed as a result of user input.
   */
  @Event() calciteInputTimePickerChange: EventEmitter<string>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  private calciteInputBlurHandler = (): void => {
    this.active = false;

    const newValue = formatTimeString(this.calciteInputEl.value) || formatTimeString(this.value);

    if (newValue !== this.calciteInputEl.value) {
      this.setInputValue(newValue);
    }
  };

  private calciteInputFocusHandler = (): void => {
    this.active = true;
  };

  private calciteInputInputHandler = (event: CustomEvent): void => {
    this.setValue({ value: event.detail.value });
  };

  @Listen("keyup")
  keyUpHandler(event: KeyboardEvent): void {
    if (getKey(event.key) === "Escape" && this.active) {
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
      let value;
      if (hour && minute) {
        value = second && this.step !== 60 ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;
      } else {
        value = "";
      }
      this.setValue({ value, origin: "time-picker" });
    }
  }

  @Listen("calciteTimePickerFocus")
  timePickerFocusHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.active = true;
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.calciteInputEl.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  onLabelClick = (): void => {
    this.setFocus();
  };

  private setCalciteInputEl = (el: HTMLCalciteInputElement): void => {
    this.calciteInputEl = el;
  };

  private setInputValue = (newInputValue: string): void => {
    if (!this.calciteInputEl) {
      return;
    }
    if (this.hourDisplayFormat === "12") {
      const { hour, minute, second } = parseTimeString(newInputValue);
      this.calciteInputEl.value = newInputValue
        ? `${getMeridiemHour(hour)}:${minute}${this.step !== 60 ? ":" + second : ""} ${getMeridiem(
            hour
          )}`
        : null;
    } else {
      this.calciteInputEl.value = newInputValue;
    }
  };

  private setValue = ({
    value,
    origin = "input"
  }: {
    value: string;
    origin?: "input" | "time-picker" | "external" | "loading";
  }): void => {
    const previousValue = this.value;
    const validatedNewValue = formatTimeString(value);

    this.internalValueChange = origin !== "external" && origin !== "loading";

    const shouldEmit =
      origin !== "loading" &&
      origin !== "external" &&
      ((value !== this.previousValidValue && !value) ||
        !!(!this.previousValidValue && validatedNewValue) ||
        (validatedNewValue !== this.previousValidValue && validatedNewValue));

    if (value) {
      if (shouldEmit) {
        this.previousValidValue = validatedNewValue;
      }
      if (validatedNewValue && validatedNewValue !== this.value) {
        this.value = validatedNewValue;
      }
    } else {
      this.value = value;
    }

    if (origin === "time-picker" || origin === "external") {
      this.setInputValue(validatedNewValue);
    }

    if (shouldEmit) {
      const changeEvent = this.calciteInputTimePickerChange.emit();

      if (changeEvent.defaultPrevented) {
        this.internalValueChange = false;
        this.value = previousValue;
        this.setInputValue(previousValue);
        this.previousValidValue = previousValue;
      } else {
        this.previousValidValue = validatedNewValue;
      }
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    if (this.value) {
      this.setValue({ value: this.value, origin: "loading" });
    }
    connectLabel(this);
  }

  componentDidLoad() {
    if (this.calciteInputEl.value !== this.value) {
      this.setInputValue(this.value);
    }
  }

  disconnectedCallback() {
    disconnectLabel(this);
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
            label={getLabelText(this)}
            name={this.name}
            onCalciteInputBlur={this.calciteInputBlurHandler}
            onCalciteInputFocus={this.calciteInputFocusHandler}
            onCalciteInputInput={this.calciteInputInputHandler}
            ref={this.setCalciteInputEl}
            scale={this.scale}
            step={this.step}
          />
        </div>
        <calcite-popover
          id={popoverId}
          label="Time Picker"
          open={this.active || false}
          referenceElement={this.referenceElementId}
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
          />
        </calcite-popover>
      </Host>
    );
  }
}
