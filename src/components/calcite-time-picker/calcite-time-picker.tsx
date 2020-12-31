import { Component, Element, Host, h, Prop, Watch, VNode, State } from "@stencil/core";
import { guid } from "../../utils/guid";

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

  /** The active state of the time input.  When true, the time input popup is displayed. */
  @Prop({ reflect: true }) active = false;

  /** The disabled state of the time input */
  @Prop({ reflect: true }) disabled?: boolean = false;

  @Watch("disabled")
  disabledChanged(disabled: boolean): void {
    this.input.disabled = disabled;
  }

  /** The focused state of the time input */
  @Prop({ mutable: true, reflect: true }) focused = false;

  @Watch("focused")
  focusedChanged(focused: boolean): void {
    if (focused && !this.el.hasAttribute("hidden")) {
      this.input.focus();
    } else {
      this.input.blur();
    }
  }

  /** The id attribute.  When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true }) guid: string;

  /** The name of the time input */
  @Prop({ reflect: true }) name?: string = "";

  @Watch("name")
  nameChanged(newName: string): void {
    this.input.name = newName;
  }

  /** The scale (size) of the time input */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** The selected time */
  @Prop({ reflect: true }) value?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private hourEl: HTMLSpanElement;

  private input: HTMLCalciteInputElement;

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

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.guid = this.el.id || `calcite-time-picker-${guid()}`;
    this.renderInput();
  }

  disconnectedCallback(): void {
    this.input.parentNode.removeChild(this.input);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  private renderInput() {
    this.input = document.createElement("calcite-input");
    this.input.disabled = this.disabled;
    this.input.icon = "clock";
    this.input.id = `${this.guid}-input`;
    this.input.name = this.name;
    this.input.onblur = () => (this.focused = false);
    this.input.onfocus = () => (this.focused = true);
    this.input.type = "time";
    if (this.value) {
      this.input.value = this.value;
    }
    this.el.insertAdjacentElement("beforeend", this.input);
  }

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
