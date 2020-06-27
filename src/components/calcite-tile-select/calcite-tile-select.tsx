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

  @Prop() name: string;
  @Prop() value: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private radioButton: HTMLCalciteRadioButtonElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.renderRadioButton();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  private renderRadioButton() {
    // Rendering a hidden radio input outside Shadow DOM so it can participate in form submissions
    // @link https://www.hjorthhansen.dev/shadow-dom-form-participation/
    this.radioButton = this.el.ownerDocument.createElement(
      "calcite-radio-button"
    );
    if (this.name) {
      this.radioButton.name = this.name;
    }
    if (this.value) {
      this.radioButton.value = this.value;
    }
    // This renders the input as a sibling of calcite-radio-button because as it turns out
    // doing appendChild as hjorthhansen suggests doesn't really keep it out of the
    // shadow DOM as far as slot behavior goes.  This is required to render {this.value} as fallback slot content.
    this.el.insertAdjacentElement("afterend", this.radioButton);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
