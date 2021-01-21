import {
  Component,
  Element,
  Host,
  h,
  Prop,
  VNode,
  Event,
  EventEmitter,
  Watch
} from "@stencil/core";
import { Scale } from "../interfaces";

const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export type AmPm = "--" | "AM" | "PM";

export interface Time {
  hour: string;
  minute: string;
  second: string;
  ampm: AmPm;
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
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteTimePickerChange: EventEmitter<Time>;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The focused state of the time picker */
  @Prop({ reflect: true }) focused = false;

  /** The scale (size) of the time picker */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The hour value */
  @Prop() hour?: string = "--";

  /** The minute value */
  @Prop() minute?: string = "--";

  /** The second value */
  @Prop() second?: string = "--";

  /** The am/pm value */
  @Prop() ampm?: AmPm = "--";

  @Watch("hour")
  @Watch("minute")
  @Watch("second")
  @Watch("ampm")
  timeChanged(): void {
    this.calciteTimePickerChange.emit(this.getTimeValues());
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
    if (this.hour === "--" || this.hour === "01") {
      this.hour = "12";
    } else {
      const hourAsNumber = parseInt(this.hour);
      if (hourAsNumber === 0) {
        this.hour = "12";
      } else {
        const newHour = hourAsNumber - 1;
        this.hour = this.formatNumberAsString(newHour);
      }
    }
  };

  private decrementMinute = (): void => {
    if (this.minute === "--") {
      this.minute = "59";
    } else {
      const minuteAsNumber = parseInt(this.minute);
      if (minuteAsNumber === 0) {
        this.minute = "59";
      } else {
        const newMinute = minuteAsNumber - 1;
        this.minute = this.formatNumberAsString(newMinute);
      }
    }
  };

  private formatNumberAsString(number: number): string {
    return number >= 0 && number <= 9 ? `0${number}` : number.toString();
  }

  private getTimeValues(): Time {
    return {
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      ampm: this.ampm
    };
  }

  private hourKeyDownHandler = (event: KeyboardEvent): void => {
    if (numberKeys.includes(event.key)) {
      const keyAsNumber = parseInt(event.key);
      if (this.hour === "01" && keyAsNumber >= 0 && keyAsNumber <= 2) {
        this.hour = `1${event.key}`;
      } else {
        this.hour = `0${event.key}`;
      }
    } else {
      switch (event.key) {
        case "Backspace":
          this.hour = "--";
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
    if (this.hour === "--") {
      this.hour = "01";
    } else {
      const hourAsNumber = parseInt(this.hour);
      if (hourAsNumber === 12) {
        this.hour = "01";
      } else {
        const newHour = hourAsNumber + 1;
        this.hour = this.formatNumberAsString(newHour);
      }
    }
  };

  private incrementMinute = (): void => {
    if (this.minute === "--") {
      this.minute = "00";
    } else {
      const minuteAsNumber = parseInt(this.minute);
      if (minuteAsNumber === 59) {
        this.minute = "00";
      } else {
        const newMinute = minuteAsNumber + 1;
        this.minute = this.formatNumberAsString(newMinute);
      }
    }
  };

  private minuteKeyDownHandler = (event: KeyboardEvent): void => {
    if (numberKeys.includes(event.key)) {
      if (this.minute === "--") {
        this.minute = `0${event.key}`;
      } else if (this.minute.startsWith("0")) {
        const minuteAsNumber = parseInt(this.minute);
        if (minuteAsNumber > 5) {
          this.minute = `0${event.key}`;
        } else {
          this.minute = `${minuteAsNumber}${event.key}`;
        }
      } else {
        this.minute = `0${event.key}`;
      }
    } else {
      switch (event.key) {
        case "Backspace":
          this.minute = "--";
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

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
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
              aria-label="Hours"
              aria-placeholder="--"
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow="5"
              aria-valuetext="05"
              class="hour"
              onKeyDown={this.hourKeyDownHandler}
              role="spinbutton"
              tabIndex={0}
            >
              {this.hour}
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
              aria-label="Minutes"
              aria-placeholder="--"
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow="5"
              aria-valuetext="05"
              class="minute"
              onKeyDown={this.minuteKeyDownHandler}
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
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow="5"
              aria-valuetext="05"
              class="ampm"
              onKeyDown={this.amPmKeyDownHandler}
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
        </div>
      </Host>
    );
  }
}
