import {
  Component,
  Element,
  Host,
  h,
  Prop,
  VNode,
  Event,
  EventEmitter,
  Watch,
  State,
  Listen
} from "@stencil/core";
import { Scale } from "../interfaces";

const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type AmPm = "--" | "AM" | "PM";

type MinuteOrSecond = "minute" | "second";

export interface Time {
  hour: string;
  minute: string;
  second?: string;
}

@Component({
  tag: "calcite-time-picker",
  styleUrl: "calcite-time-picker.scss",
  shadow: true
})
export class CalciteTimePicker {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTimePickerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The hour value (24-hour format) */
  @Prop({ reflect: true, mutable: true }) hour?: string = "--";

  /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
  @Prop({ reflect: true }) hourDisplayFormat: "12" | "24" = "12";

  /** The minute value */
  @Prop({ reflect: true, mutable: true }) minute?: string = "--";

  /** The second value */
  @Prop({ reflect: true, mutable: true }) second?: string = "--";

  /** The scale (size) of the time picker */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** number that specifies the granularity that the value must adhere to */
  @Prop({ reflect: true }) step = 60;

  @Watch("hour")
  hourChanged(newHour: string): void {
    if (this.hourDisplayFormat === "12" && newHour !== "--") {
      const newHourAsNumber = parseInt(newHour);
      if (newHourAsNumber >= 0 && newHourAsNumber <= 11) {
        this.ampm = "AM";
      } else {
        this.ampm = "PM";
      }
    }
  }

  @Watch("hour")
  @Watch("minute")
  @Watch("second")
  timeChangeHandler(): void {
    if (this.timeChanged) {
      this.calciteTimePickerChange.emit(this.getTime());
      this.timeChanged = false;
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private activeEl: HTMLSpanElement;

  private amPmEl: HTMLSpanElement;

  private hourEl: HTMLSpanElement;

  private minuteEl: HTMLSpanElement;

  private secondEl: HTMLSpanElement;

  private timeChanged = false;

  // --------------------------------------------------------------------------
  //
  //  State
  //
  // --------------------------------------------------------------------------

  /** The am/pm value */
  @State() ampm: AmPm = "--";

  /** The display version of the hour */
  @State() displayHour: string = this.getDisplayHour();

  /** Whether the hour is being edited while focused */
  @State() editingHourWhileFocused = false;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteTimePickerChange: EventEmitter<Time>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  /* eslint-disable @stencil/prefer-vdom-listener */
  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    switch (this.activeEl) {
      case this.hourEl:
        if (event.key === "ArrowRight") {
          this.minuteEl.focus();
        }
        break;
      case this.minuteEl:
        switch (event.key) {
          case "ArrowLeft":
            this.hourEl.focus();
            break;
          case "ArrowRight":
            if (this.step !== 60) {
              this.secondEl.focus();
            } else if (this.hourDisplayFormat === "12") {
              this.amPmEl.focus();
            }
            break;
        }
        break;
      case this.secondEl:
        switch (event.key) {
          case "ArrowLeft":
            this.minuteEl.focus();
            break;
          case "ArrowRight":
            if (this.hourDisplayFormat === "12") {
              this.amPmEl.focus();
            }
            break;
        }
        break;
      case this.amPmEl:
        switch (event.key) {
          case "ArrowLeft":
            if (this.step !== 60) {
              this.secondEl.focus();
            } else {
              this.minuteEl.focus();
            }
            break;
        }
        break;
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private amPmKeyDownHandler = (event: KeyboardEvent): void => {
    switch (event.key) {
      case "a":
        this.ampm = "AM";
        break;
      case "p":
        this.ampm = "PM";
        break;
      case "Backspace":
        this.ampm = "--";
        break;
      case "ArrowUp":
        event.preventDefault();
        this.incrementAmPm();
        break;
      case "ArrowDown":
        event.preventDefault();
        this.decrementAmPm();
        break;
    }
  };

  private changeTime = (key: string, value: string): void => {
    this[key] = value;
    this.timeChanged = true;
  };

  private decrementAmPm = (): void => {
    switch (this.ampm) {
      case "--":
        this.ampm = "PM";
        break;
      case "AM":
        this.ampm = "PM";
        break;
      case "PM":
        this.ampm = "AM";
        break;
    }
  };

  private decrementHour = (): void => {
    switch (this.hour) {
      case "--":
        this.changeTime("hour", "00");
        break;
      case "00":
        this.changeTime("hour", "23");
        break;
      default:
        const hourAsNumber = parseInt(this.hour);
        const newHour = hourAsNumber - 1;
        this.changeTime("hour", this.formatNumberAsString(newHour));
        break;
    }
  };

  private decrementMinuteOrSecond = (key: MinuteOrSecond): void => {
    if (this[key] === "--") {
      this.changeTime(key, "59");
    } else {
      const valueAsNumber = parseInt(this[key]);
      if (valueAsNumber === 0) {
        this.changeTime(key, "59");
      } else {
        const newValue = valueAsNumber - 1;
        this.changeTime(key, this.formatNumberAsString(newValue));
      }
    }
  };

  private decrementMinute = (): void => {
    this.decrementMinuteOrSecond("minute");
  };

  private decrementSecond = (): void => {
    this.decrementMinuteOrSecond("second");
  };

  private formatNumberAsString(number: number): string {
    return number >= 0 && number <= 9 ? `0${number}` : number.toString();
  }

  private getDisplayHour(): string {
    if (this.hourDisplayFormat === "12" && this.hour !== "--") {
      const hourAsNumber = parseInt(this.hour);
      if (hourAsNumber === 0) {
        if (this.editingHourWhileFocused) {
          return this.hour;
        } else {
          return "12";
        }
      }
      if (hourAsNumber > 12) {
        return this.formatNumberAsString(hourAsNumber - 12);
      }
    }
    return this.hour;
  }

  private getTime(): Time {
    return {
      hour: this.hour,
      minute: this.minute,
      second: this.second
    };
  }

  private handleFocus = (event: FocusEvent): void => {
    this.activeEl = event.target as HTMLSpanElement;
  };

  private hourBlurHandler = (): void => {
    this.editingHourWhileFocused = false;
  };

  private hourKeyDownHandler = (event: KeyboardEvent): void => {
    if (numberKeys.includes(event.key)) {
      this.editingHourWhileFocused = true;
      const keyAsNumber = parseInt(event.key);
      if (this.hour === "--") {
        this.changeTime("hour", `0${keyAsNumber}`);
      } else {
        switch (this.hourDisplayFormat) {
          case "12":
            if (this.hour === "01" && keyAsNumber >= 0 && keyAsNumber <= 2) {
              this.changeTime("hour", `1${keyAsNumber}`);
            } else {
              this.changeTime("hour", `0${keyAsNumber}`);
            }
            break;
          case "24":
            if (this.hour === "01") {
              this.changeTime("hour", `1${keyAsNumber}`);
            } else if (this.hour === "02" && keyAsNumber >= 0 && keyAsNumber <= 3) {
              this.changeTime("hour", `2${keyAsNumber}`);
            } else {
              this.changeTime("hour", `0${keyAsNumber}`);
            }
            break;
        }
      }
    } else {
      switch (event.key) {
        case "Backspace":
          this.changeTime("hour", "--");
          break;
        case "ArrowDown":
          event.preventDefault();
          this.decrementHour();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.incrementHour();
          break;
      }
    }
  };

  private incrementAmPm = (): void => {
    switch (this.ampm) {
      case "--":
        this.ampm = "AM";
        break;
      case "AM":
        this.ampm = "PM";
        break;
      case "PM":
        this.ampm = "AM";
        break;
    }
  };

  private incrementHour = (): void => {
    switch (this.hour) {
      case "--":
        this.changeTime("hour", "01");
        break;
      case "23":
        this.changeTime("hour", "00");
        break;
      default:
        const hourAsNumber = parseInt(this.hour);
        const newHour = hourAsNumber + 1;
        this.changeTime("hour", this.formatNumberAsString(newHour));
        break;
    }
  };

  private incrementMinuteOrSecond = (key: MinuteOrSecond): void => {
    if (this[key] === "--") {
      this.changeTime(key, "00");
    } else {
      const valueAsNumber = parseInt(this[key]);
      if (valueAsNumber === 59) {
        this.changeTime(key, "00");
      } else {
        const newValue = valueAsNumber + 1;
        this.changeTime(key, this.formatNumberAsString(newValue));
      }
    }
  };

  private incrementMinute = (): void => {
    this.incrementMinuteOrSecond("minute");
  };

  private incrementSecond = (): void => {
    this.incrementMinuteOrSecond("second");
  };

  private minuteKeyDownHandler = (event: KeyboardEvent): void => {
    if (numberKeys.includes(event.key)) {
      if (this.minute === "--") {
        this.changeTime("minute", `0${event.key}`);
      } else if (this.minute.startsWith("0")) {
        const minuteAsNumber = parseInt(this.minute);
        if (minuteAsNumber > 5) {
          this.changeTime("minute", `0${event.key}`);
        } else {
          this.changeTime("minute", `${minuteAsNumber}${event.key}`);
        }
      } else {
        this.changeTime("minute", `0${event.key}`);
      }
    } else {
      switch (event.key) {
        case "Backspace":
          this.changeTime("minute", "--");
          break;
        case "ArrowDown":
          event.preventDefault();
          this.decrementMinute();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.incrementMinute();
          break;
      }
    }
  };

  private secondKeyDownHandler = (event: KeyboardEvent): void => {
    if (numberKeys.includes(event.key)) {
      if (this.second === "--") {
        this.changeTime("second", `0${event.key}`);
      } else if (this.second.startsWith("0")) {
        const secondAsNumber = parseInt(this.second);
        if (secondAsNumber > 5) {
          this.changeTime("second", `0${event.key}`);
        } else {
          this.changeTime("second", `${secondAsNumber}${event.key}`);
        }
      } else {
        this.changeTime("second", `0${event.key}`);
      }
    } else {
      switch (event.key) {
        case "Backspace":
          this.changeTime("second", "--");
          break;
        case "ArrowDown":
          event.preventDefault();
          this.decrementSecond();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.incrementSecond();
          break;
      }
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
    const includeSeconds = this.step !== 60 ? true : false;
    return (
      <Host>
        <div class="time-picker">
          <div>
            <button
              aria-label="increase hour"
              class="top-left"
              onClick={this.incrementHour}
              tabIndex={-1}
              type="button"
            >
              <calcite-icon icon="chevronup" scale={iconScale} />
            </button>
            <span
              aria-label="Hour"
              aria-placeholder="--"
              aria-valuemax="23"
              aria-valuemin="1"
              aria-valuenow={this.hour !== "--" ? parseInt(this.hour) : undefined}
              aria-valuetext={this.hour !== "--" ? this.hour : undefined}
              class="hour"
              onBlur={this.hourBlurHandler}
              onFocus={this.handleFocus}
              onKeyDown={this.hourKeyDownHandler}
              ref={(el) => (this.hourEl = el)}
              role="spinbutton"
              tabIndex={0}
            >
              {this.getDisplayHour()}
            </span>
            <button
              aria-label="decrease hour"
              class="bottom-left"
              onClick={this.decrementHour}
              tabIndex={-1}
              type="button"
            >
              <calcite-icon icon="chevrondown" scale={iconScale} />
            </button>
          </div>
          <div>:</div>
          <div>
            <button
              aria-label="increase minute"
              onClick={this.incrementMinute}
              tabIndex={-1}
              type="button"
            >
              <calcite-icon icon="chevronup" scale={iconScale} />
            </button>
            <span
              aria-label="Minute"
              aria-placeholder="--"
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow={this.minute !== "--" ? parseInt(this.minute) : undefined}
              aria-valuetext={this.minute !== "--" ? this.minute : undefined}
              class="minute"
              onFocus={this.handleFocus}
              onKeyDown={this.minuteKeyDownHandler}
              ref={(el) => (this.minuteEl = el)}
              role="spinbutton"
              tabIndex={0}
            >
              {this.minute}
            </span>
            <button
              aria-label="decrease minute"
              onClick={this.decrementMinute}
              tabIndex={-1}
              type="button"
            >
              <calcite-icon icon="chevrondown" scale={iconScale} />
            </button>
          </div>
          {includeSeconds && <div>:</div>}
          {includeSeconds && (
            <div>
              <button
                aria-label="increase second"
                onClick={this.incrementSecond}
                tabIndex={-1}
                type="button"
              >
                <calcite-icon icon="chevronup" scale={iconScale} />
              </button>
              <span
                aria-label="Second"
                aria-placeholder="--"
                aria-valuemax="59"
                aria-valuemin="0"
                aria-valuenow={this.second !== "--" ? parseInt(this.second) : undefined}
                aria-valuetext={this.second !== "--" ? this.second : undefined}
                class="second"
                onFocus={this.handleFocus}
                onKeyDown={this.secondKeyDownHandler}
                ref={(el) => (this.secondEl = el)}
                role="spinbutton"
                tabIndex={0}
              >
                {this.second}
              </span>
              <button
                aria-label="decrease second"
                onClick={this.decrementSecond}
                tabIndex={-1}
                type="button"
              >
                <calcite-icon icon="chevrondown" scale={iconScale} />
              </button>
            </div>
          )}
          {this.hourDisplayFormat === "12" && (
            <div>
              <button
                aria-label="switch to am or pm"
                class="top-right"
                onClick={this.incrementAmPm}
                tabIndex={-1}
                type="button"
              >
                <calcite-icon icon="chevronup" scale={iconScale} />
              </button>
              <span
                aria-label="AM/PM"
                aria-placeholder="--"
                aria-valuemax="2"
                aria-valuemin="1"
                aria-valuenow={this.ampm !== "--" ? (this.ampm === "AM" ? "1" : "2") : undefined}
                aria-valuetext={this.ampm !== "--" ? this.ampm : undefined}
                class="ampm"
                onFocus={this.handleFocus}
                onKeyDown={this.amPmKeyDownHandler}
                ref={(el) => (this.amPmEl = el)}
                role="spinbutton"
                tabIndex={0}
              >
                {this.ampm}
              </span>
              <button
                aria-label="switch to am or pm"
                class="bottom-right"
                onClick={this.decrementAmPm}
                tabIndex={-1}
                type="button"
              >
                <calcite-icon icon="chevrondown" scale={iconScale} />
              </button>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
