import { Component, Element, Host, h, Prop, Listen } from "@stencil/core";

@Component({
  tag: "calcite-tile-select",
  styleUrl: "calcite-tile-select.scss",
  shadow: true
})
export class CalciteTileSelect {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTileSelectElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The checked state of the tile select. */
  @Prop({ reflect: true, mutable: true }) checked = false;

  /** The description text that appears beneath the heading of the tile. */
  @Prop({ reflect: true }) description?: string;

  /** The disabled state of the tile select. */
  @Prop({ reflect: true }) disabled = false;

  /** The focused state of the tile select. */
  @Prop({ reflect: true, mutable: true }) focused = false;

  /** The heading text that appears between the icon and description of the tile. */
  @Prop({ reflect: true }) heading?: string;

  /** The hidden state of the tile select. */
  @Prop({ reflect: true }) hidden = false;

  /** The icon that appears at the top of the tile. */
  @Prop({ reflect: true }) icon?: string;

  /** The name of the tile select.  This name will appear in form submissions as either a radio or checkbox identifier based on the `type` property. */
  @Prop({ reflect: true }) name = "";

  /** The side of the tile that the radio or checkbox appears. */
  @Prop({ reflect: true }) showInput: "left" | "right" | "none" = "left";

  /** The theme of the tile select. */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /** The selection mode of the tile select: radio (single) or checkbox (multiple). */
  @Prop({ reflect: true }) type: "radio" | "checkbox" = "radio";

  /** The value of the tile select.  This value will appear in form submissions when this tile select is checked. */
  @Prop({ reflect: true }) value?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private input: HTMLCalciteCheckboxElement | HTMLCalciteRadioButtonElement;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteCheckboxChange")
  calciteCheckboxChangeEvent(event: CustomEvent) {
    const checkbox = event.target as HTMLCalciteCheckboxElement;
    if (checkbox === this.input) {
      this.checked = checkbox.checked;
    }
  }

  @Listen("calciteCheckboxFocusedChange")
  calciteCheckboxFocusedChangeEvent(event: CustomEvent) {
    const checkbox = event.target as HTMLCalciteCheckboxElement;
    if (checkbox === this.input) {
      this.focused = checkbox.focused;
    }
  }

  @Listen("calciteRadioButtonChange")
  calciteRadioButtonChangeEvent(event: CustomEvent) {
    const radioButton = event.target as HTMLCalciteRadioButtonElement;
    if (radioButton === this.input) {
      this.checked = radioButton.checked;
    }
  }

  @Listen("calciteRadioButtonFocusedChange")
  calciteRadioButtonFocusedChangeEvent(event: CustomEvent) {
    const radioButton = event.target as HTMLCalciteRadioButtonElement;
    if (radioButton === this.input) {
      this.focused = radioButton.focused;
    }
  }

  @Listen("click")
  click(event: MouseEvent) {
    if ((event.target as HTMLElement).localName === "calcite-tile-select") {
      this.input.click();
      this.input.focus();
    }
  }

  @Listen("mouseenter")
  mouseenter() {
    if (this.input.localName === "calcite-radio-button") {
      (this.input as HTMLCalciteRadioButtonElement).hovered = true;
    }
    if (this.input.localName === "calcite-checkbox") {
      (this.input as HTMLCalciteCheckboxElement).hovered = true;
    }
  }

  @Listen("mouseleave")
  mouseleave() {
    if (this.input.localName === "calcite-radio-button") {
      (this.input as HTMLCalciteRadioButtonElement).hovered = false;
    }
    if (this.input.localName === "calcite-checkbox") {
      (this.input as HTMLCalciteCheckboxElement).hovered = false;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.renderInput();
  }

  disconnectedCallback() {
    this.input.parentNode.removeChild(this.input);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  private renderInput() {
    this.input = this.el.ownerDocument.createElement(
      this.type === "radio" ? "calcite-radio-button" : "calcite-checkbox"
    );
    this.input.checked = this.checked;
    this.input.disabled = this.disabled;
    this.input.hidden = this.hidden;
    this.input.id = this.el.id;
    if (this.name) {
      this.input.name = this.name;
    }
    this.input.theme = this.theme;
    if (this.value) {
      this.input.value = this.value;
    }
    this.el.insertAdjacentElement("beforeend", this.input);
  }

  render() {
    return (
      <Host>
        <calcite-tile
          active={this.checked}
          description={this.description}
          embed
          heading={this.heading}
          icon={this.icon}
        />
        <slot />
      </Host>
    );
  }
}
