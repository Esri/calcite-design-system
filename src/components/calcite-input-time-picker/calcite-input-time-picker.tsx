import {
  Component,
  Element,
  Host,
  VNode,
  h,
  Prop,
  Watch,
  Listen,
  Event,
  EventEmitter
} from "@stencil/core";
import { guid } from "../../utils/guid";
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
    this.inputEl.disabled = disabled;
  }

  /** The focused state of the time input */
  @Prop({ mutable: true, reflect: true }) focused = false;

  @Watch("focused")
  focusedChanged(focused: boolean): void {
    if (focused && !this.el.hasAttribute("hidden")) {
      this.inputEl.focus();
    } else {
      this.inputEl.blur();
    }
  }

  /** The id attribute of the input time picker.  When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true, mutable: true }) guid: string;

  /** The name of the time input */
  @Prop({ reflect: true }) name?: string = "";

  @Watch("name")
  nameChanged(newName: string): void {
    this.inputEl.name = newName;
  }

  /** The scale (size) of the time input */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** number that specifies the granularity that the value must adhere to */
  @Prop({ reflect: true }) step = 60;

  /** The selected time */
  @Prop({ reflect: true, mutable: true }) value?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private inputEl: HTMLCalciteInputElement;

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

  @Listen("click")
  clickHandler(event: MouseEvent): void {
    if (event.target === this.el) {
      this.inputEl.click();
    }
  }

  inputHandler = (event: CustomEvent): void => {
    this.value = event.detail.value;
  };

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private convertValueToTime = (value: string): Time => {
    const [hour, minute, second] = value ? value.split(":") : ["--", "--", "--"];
    return {
      hour,
      minute,
      second: second || (hour !== "--" && minute !== "--" ? "00" : "--")
    };
  };

  private onCalciteInputBlur = (): void => {
    this.focused = false;
  };

  private onCalciteInputFocus = (): void => {
    this.focused = true;
  };

  private setInputEl = (el: HTMLCalciteInputElement): void => {
    this.inputEl = el;
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.guid = this.el.id || `calcite-input-time-picker-${guid()}`;
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { hour, minute, second } = this.convertValueToTime(this.value);
    return (
      <Host>
        <calcite-popover-manager>
          <calcite-input
            disabled={this.disabled}
            icon="clock"
            id={`${this.guid}-input`}
            name={this.name}
            onBlur={this.onCalciteInputBlur}
            onCalciteInputInput={this.inputHandler}
            onFocus={this.onCalciteInputFocus}
            ref={this.setInputEl}
            scale={this.scale}
            step={this.step}
            type="time"
            value={this.value}
          />
          <calcite-popover
            corner-appearance="round"
            label="Time Picker"
            referenceElement={`${this.guid}-input`}
          >
            <calcite-time-picker
              hour={hour}
              minute={minute}
              scale={this.scale}
              second={second}
              step={this.step}
            />
          </calcite-popover>
        </calcite-popover-manager>
      </Host>
    );
  }
}
