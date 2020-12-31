import { Component, Element, Host, h, Prop, VNode, State } from "@stencil/core";

const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

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

  /** The focused state of the time picker */
  @Prop({ reflect: true }) focused = false;

  /** The scale (size) of the time picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private hourEl: HTMLSpanElement;

  @State() hour?: string = "--";

  @State() minute?: string = "--";

  @State() ampm?: string = "--";

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
        this.incrementAmPm();
        break;
      case "ArrowDown":
        this.decrementAmPm();
        break;
      case "Tab":
        return;
    }
    event.preventDefault();
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
    if (this.hour === "--") {
      this.hour = "12";
    } else {
      const hourAsNumber = parseInt(this.hour);
      if (hourAsNumber === 0) {
        this.hour = "12";
      } else {
        const newHour = hourAsNumber - 1;
        this.hour = newHour >= 10 && newHour <= 12 ? newHour.toString() : `0${newHour}`;
      }
    }
  };

  private hourKeyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Tab") {
      return;
    }
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
          this.decrementHour();
          break;
        case "ArrowUp":
          this.incrementHour();
          break;
      }
    }
    event.preventDefault();
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
        this.hour = "00";
      } else {
        const newHour = hourAsNumber + 1;
        this.hour = newHour >= 10 && newHour <= 12 ? newHour.toString() : `0${newHour}`;
      }
    }
  };

  private minuteKeyDownHandler = (event: KeyboardEvent): void => {
    // TODO: support arrowup and arrowdown
    // TODO: support number constraints
    if (numberKeys.includes(event.key)) {
      if (this.minute.length === 2) {
        this.minute = event.key;
      } else {
        this.minute = `${this.minute}${event.key}`;
      }
    }
    if (event.key === "Backspace") {
      this.minute = "--";
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <slot />
        <div class="time-picker">
          <div class="column hour">
            <calcite-icon icon="chevronup" onClick={this.incrementHour} scale={this.scale} />
            <span
              aria-label="Hours"
              aria-placeholder="--"
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow="5"
              aria-valuetext="05"
              onKeyDown={this.hourKeyDownHandler}
              ref={(el) => (this.hourEl = el)}
              role="spinbutton"
              tabIndex={0}
            >
              {this.hour}
            </span>
            <calcite-icon icon="chevrondown" onClick={this.decrementHour} scale={this.scale} />
          </div>
          <div class="colon">:</div>
          <div class="column minute">
            <calcite-icon icon="chevronup" scale={this.scale} />
            <span
              aria-label="Hours"
              aria-placeholder="--"
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow="5"
              aria-valuetext="05"
              onKeyDown={this.minuteKeyDownHandler}
              role="spinbutton"
              tabIndex={0}
            >
              {this.minute}
            </span>
            <calcite-icon icon="chevrondown" scale={this.scale} />
          </div>
          <div class="column ampm">
            <calcite-icon icon="chevronup" onClick={this.incrementAmPm} scale={this.scale} />
            <span
              aria-label="Hours"
              aria-placeholder="--"
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow="5"
              aria-valuetext="05"
              onKeyDown={this.amPmKeyDownHandler}
              role="spinbutton"
              tabIndex={0}
            >
              {this.ampm}
            </span>
            <calcite-icon icon="chevrondown" onClick={this.decrementAmPm} scale={this.scale} />
          </div>
        </div>
      </Host>
    );
  }
}
