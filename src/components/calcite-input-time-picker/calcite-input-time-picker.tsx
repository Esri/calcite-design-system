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
import { formatNumberAsTimeString, stringContainsOnlyNumbers, Time } from "../../utils/time";
import { Theme } from "../interfaces";

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

  /** The disabled state of the time input */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
  @Prop({ reflect: true }) hourDisplayFormat: "12" | "24" = "12";

  /** The name of the time input */
  @Prop({ reflect: true }) name?: string;

  /** The scale (size) of the time input */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

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

  private guid: string;

  private inputEl: HTMLCalciteInputElement;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() popoverOpen = false;

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
    this.popoverOpen = false;
    const newValue = this.parseTimeString(this.inputEl.value);
    if (newValue) {
      this.inputEl.value = newValue;
    } else {
      this.inputEl.value = this.parseTimeString(this.value);
    }
  };

  private inputFocusHandler = (): void => {
    this.popoverOpen = true;
  };

  private inputInputHandler = (event: CustomEvent): void => {
    if (this.parseTimeString(event.detail.value) !== null || !event.detail.value) {
      this.value = event.detail.value;
    }
  };

  @Listen("keydown")
  inputKeyDownHandler(event: KeyboardEvent): void {
    // This prevents the browser default time picker UI from appearing
    if (
      (event.target as HTMLElement).closest("calcite-input") === this.inputEl &&
      event.key === " "
    ) {
      event.preventDefault();
    }
  }

  @Listen("keyup")
  keyUpHandler(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.popoverOpen === true) {
      this.popoverOpen = false;
    }
  }

  @Listen("calciteTimePickerBlur")
  timePickerBlurHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.popoverOpen = false;
  }

  @Listen("calciteTimePickerChange")
  timePickerChangeHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.detail) {
      const { hour, minute, second } = event.detail as Time;
      if (hour !== "--" && minute !== "--") {
        if (this.step !== 60 && second !== "--") {
          this.value = `${hour}:${minute}:${second}`;
        } else {
          this.value = `${hour}:${minute}`;
        }
      } else {
        this.value = "";
      }
    }
  }

  @Listen("calciteTimePickerFocus")
  timePickerFocusHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.popoverOpen = true;
  }

  @Listen("click", { target: "window" })
  windowClickHandler(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const closestHost = target.closest(
      "calcite-input-time-picker"
    ) as HTMLCalciteInputTimePickerElement;
    const closestLabel = target.closest("calcite-label") as HTMLCalciteLabelElement;
    if (closestLabel && closestLabel.for === this.guid) {
      this.inputEl.setFocus();
      this.popoverOpen = true;
    } else if (closestHost !== this.el) {
      this.popoverOpen = false;
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    this.inputEl.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private convertStringToTime = (value: string): Time => {
    const timeString = this.parseTimeString(value);
    const [hour, minute, second] = timeString ? timeString.split(":") : ["--", "--", "--"];
    return {
      hour,
      minute,
      second: second || (hour !== "--" && minute !== "--" ? "00" : "--")
    };
  };

  private setInputEl = (el: HTMLCalciteInputElement): void => {
    this.inputEl = el;
  };

  private parseTimeString = (value: string): string => {
    if (value) {
      const splitValue = value.split(":");
      if (splitValue.length > 1) {
        const hour = splitValue[0];
        const minute = splitValue[1];
        const second = splitValue[2];
        const hourAsNumber = parseInt(splitValue[0]);
        const minuteAsNumber = parseInt(splitValue[1]);
        const secondAsNumber = parseInt(splitValue[2]);
        const hourValid =
          hour &&
          stringContainsOnlyNumbers(hour) &&
          !isNaN(hourAsNumber) &&
          hourAsNumber >= 0 &&
          hourAsNumber < 24;
        const minuteValid =
          minute &&
          stringContainsOnlyNumbers(minute) &&
          !isNaN(minuteAsNumber) &&
          minuteAsNumber >= 0 &&
          minuteAsNumber < 60;
        const secondValid =
          second &&
          stringContainsOnlyNumbers(second) &&
          !isNaN(secondAsNumber) &&
          secondAsNumber >= 0 &&
          secondAsNumber < 60;
        if ((hourValid && minuteValid && !second) || (hourValid && minuteValid && secondValid)) {
          let newValue = `${formatNumberAsTimeString(hourAsNumber)}:${formatNumberAsTimeString(
            minuteAsNumber
          )}`;
          if (secondValid && this.step !== 60) {
            newValue = `${newValue}:${formatNumberAsTimeString(secondAsNumber)}`;
          }
          return newValue;
        }
      }
    }
    return null;
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.guid = this.el.id || `calcite-input-time-picker-${guid()}`;
  }

  componentDidLoad() {
    if (this.value) {
      this.inputEl.value = this.parseTimeString(this.value);
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { hour, minute, second } = this.convertStringToTime(this.value);
    return (
      <Host>
        <calcite-input
          disabled={this.disabled}
          icon="clock"
          id={`${this.guid}-calcite-input`}
          name={this.name}
          onCalciteInputBlur={this.inputBlurHandler}
          onCalciteInputFocus={this.inputFocusHandler}
          onCalciteInputInput={this.inputInputHandler}
          ref={this.setInputEl}
          scale={this.scale}
          step={this.step}
          theme={this.theme}
          type="time"
          value={this.value}
        />
        <calcite-popover
          label="Time Picker"
          open={this.popoverOpen}
          referenceElement={`${this.guid}-calcite-input`}
          theme={this.theme}
        >
          <calcite-time-picker
            hour={hour}
            hour-display-format={this.hourDisplayFormat}
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
