import {
  Component,
  Element,
  Host,
  VNode,
  h,
  Prop,
  Watch,
  Listen,
  State,
  Event,
  EventEmitter
} from "@stencil/core";
import { Time } from "../calcite-time-picker/calcite-time-picker";

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

  /** number that specifies the granularity that the value must adhere to */
  @Prop({ reflect: true }) step = 60;

  /** The selected time */
  @Prop({ reflect: true, mutable: true }) value?: string;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  /** The hour value (24-hour format) */
  @State() hour?: string;

  /** The minute value */
  @State() minute?: string;

  /** The second value */
  @State() second?: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteInputTimePickerChange: EventEmitter<string>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteTimePickerChange")
  timePickerChangeHandler(event: CustomEvent): void {
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

  inputHandler = (event: CustomEvent): void => {
    this.updateTime(event.detail.value);
  };

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private input: HTMLCalciteInputElement;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private convertValueToTime = (value: string): Time => {
    const [hour, minute, second] = value.split(":");
    return {
      hour: hour || "--",
      minute: minute || "--",
      second: second || "--"
    };
  };

  private onCalciteInputBlur = (): void => {
    this.focused = false;
  };

  private onCalciteInputFocus = (): void => {
    this.focused = true;
  };

  private updateTime = (time: string): void => {
    const { hour, minute, second } = this.convertValueToTime(time);
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    if (this.value) {
      this.updateTime(this.value);
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <span>{this.value}</span>
        <calcite-input
          disabled={this.disabled}
          icon="clock"
          id={`${this.guid}-input`}
          name={this.name}
          onBlur={this.onCalciteInputBlur}
          onCalciteInputInput={this.inputHandler}
          onFocus={this.onCalciteInputFocus}
          ref={(el) => (this.input = el)}
          step={this.step}
          type="time"
          value={this.value}
        />
        <calcite-time-picker
          hour={this.hour}
          minute={this.minute}
          scale={this.scale}
          second={this.second}
          step={this.step}
        />
      </Host>
    );
  }
}
