import { Component, Element, Host, VNode, h, Prop, Watch, Listen } from "@stencil/core";
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
  @Prop({ reflect: true }) value?: string;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteTimePickerChange")
  calciteTimePickerChange(event: CustomEvent): void {
    const { hour, minute, second, ampm } = event.detail as Time;
    if (this.step !== 60) {
      this.value = `${hour}:${minute}:${second} ${ampm}`;
    } else {
      this.value = `${hour}:${minute} ${ampm}`;
    }
  }

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

  private onCalciteInputBlur = (): void => {
    this.focused = false;
  };

  private onCalciteInputFocus = (): void => {
    this.focused = true;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <calcite-input
          disabled={this.disabled}
          icon="clock"
          id={`${this.guid}-input`}
          name={this.name}
          onBlur={this.onCalciteInputBlur}
          onFocus={this.onCalciteInputFocus}
          ref={(el) => (this.input = el)}
          step={this.step}
          value={this.value}
        />
        <calcite-time-picker scale={this.scale} />
      </Host>
    );
  }
}
