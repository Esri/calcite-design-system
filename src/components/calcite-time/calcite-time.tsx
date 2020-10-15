import { Component, Element, Host, h, Prop, Watch, VNode, State } from "@stencil/core";

const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

@Component({
  tag: "calcite-time",
  styleUrl: "calcite-time.scss",
  shadow: true
})
export class CalciteTime {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTimeElement;

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

  private input: HTMLCalciteInputElement;

  @State() hour?: string = "--";

  @State() minute?: string = "--";

  @State() ampm?: string = "--";

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private onAmPmKeyDown = (event: KeyboardEvent) => {
    // TODO: Support typing am and pm
    switch (event.key) {
      case "Backspace":
        this.ampm = "--";
        break;
      case "ArrowUp":
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
        break;
      case "ArrowDown":
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
        break;
    }
  };

  private onHourKeyDown = (event: KeyboardEvent) => {
    // TODO: support arrowup and arrowdown
    // TODO: support number constraints
    if (numberKeys.includes(event.key)) {
      if (this.hour.length === 2) {
        this.hour = event.key;
      } else {
        this.hour = `${this.hour}${event.key}`;
      }
    }
    if (event.key === "Backspace") {
      this.hour = "--";
    }
  };

  private onMinuteKeyDown = (event: KeyboardEvent) => {
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
    this.input.id = `${this.el.id}-input`;
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
            <calcite-icon icon="chevronup" scale={this.scale} />
            <span
              aria-label="Hours"
              aria-placeholder="--"
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow="5"
              aria-valuetext="05"
              onKeyDown={this.onHourKeyDown}
              role="spinbutton"
              tabIndex={0}
            >
              {this.hour}
            </span>
            <calcite-icon icon="chevrondown" scale={this.scale} />
          </div>
          <div>:</div>
          <div class="column minute">
            <calcite-icon icon="chevronup" scale={this.scale} />
            <span
              aria-label="Hours"
              aria-placeholder="--"
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow="5"
              aria-valuetext="05"
              onKeyDown={this.onMinuteKeyDown}
              role="spinbutton"
              tabIndex={0}
            >
              {this.minute}
            </span>
            <calcite-icon icon="chevrondown" scale={this.scale} />
          </div>
          <div class="column ampm">
            <calcite-icon icon="chevronup" scale={this.scale} />
            <span
              aria-label="Hours"
              aria-placeholder="--"
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow="5"
              aria-valuetext="05"
              onKeyDown={this.onAmPmKeyDown}
              role="spinbutton"
              tabIndex={0}
            >
              {this.ampm}
            </span>
            <calcite-icon icon="chevrondown" scale={this.scale} />
          </div>
        </div>
      </Host>
    );
  }
}
