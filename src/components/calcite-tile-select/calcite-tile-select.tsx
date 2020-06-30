import { Component, Element, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "calcite-tile-select",
  styleUrl: "calcite-tile-select.css",
  shadow: true,
})
export class CalciteTileSelect {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true }) name: string;
  @Prop({ reflect: true }) type: "radio" | "checkbox" = "radio";
  @Prop({ reflect: true }) value: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private input: HTMLCalciteCheckboxElement | HTMLCalciteRadioButtonElement;

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
    if (this.name) {
      this.input.name = this.name;
    }
    if (this.value) {
      this.input.value = this.value;
    }
    this.el.insertAdjacentElement("beforeend", this.input);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
