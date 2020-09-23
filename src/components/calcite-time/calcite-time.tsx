import { Component, Element, Host, h, Prop, Watch, VNode } from "@stencil/core";

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
            <calcite-icon icon="chevronup" scale={this.scale}></calcite-icon>
            <input
              aria-placeholder="--"
              aria-valuemin="1"
              aria-valuemax="12"
              aria-label="Hours"
              aria-valuenow="5"
              aria-valuetext="05"
              maxLength={2}
              minLength={2}
              role="spinbutton"
              type="number"
            >
            </input>
            <calcite-icon icon="chevrondown" scale={this.scale}></calcite-icon>
          </div>
          <div>:</div>
          <div class="column minute">
            <calcite-icon icon="chevronup" scale={this.scale}></calcite-icon>
            <input
              aria-placeholder="--"
              aria-valuemin="1"
              aria-valuemax="12"
              aria-label="Hours"
              aria-valuenow="5"
              aria-valuetext="05"
              maxLength={2}
              minLength={2}
              role="spinbutton"
              type="number"
            >
            </input>
            <calcite-icon icon="chevrondown" scale={this.scale}></calcite-icon>
          </div>
          <div class="column ampm">
            <calcite-icon icon="chevronup" scale={this.scale}></calcite-icon>
            <input
              aria-placeholder="--"
              aria-valuemin="1"
              aria-valuemax="12"
              aria-label="Hours"
              aria-valuenow="5"
              aria-valuetext="05"
              maxLength={2}
              minLength={2}
              role="spinbutton"
              type="number"
            >
            </input>
            <calcite-icon icon="chevrondown" scale={this.scale}></calcite-icon>
          </div>
        </div>
      </Host>
    );
  }
}
