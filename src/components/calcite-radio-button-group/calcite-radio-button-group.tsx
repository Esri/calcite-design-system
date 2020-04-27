import { Component, Host, h, Element, Prop, Listen, Watch, Method } from "@stencil/core";

@Component({
  tag: "calcite-radio-button-group",
  styleUrl: "calcite-radio-button-group.scss",
  shadow: true,
})
export class CalciteRadioButtonGroup {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el!: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties and Validators
  //
  //--------------------------------------------------------------------------

  /** The disabled state of the radio button group. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** The name of the radio button group. <code>name</code> must be unique to other radio button group instances. */
  @Prop({ reflect: true }) name!: string;

  /** Requires that a value is selected for the radio button group before the parent form will submit. */
  @Prop({ reflect: true }) required: boolean = false;

  /** The scale (size) of the radio button group. */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";
  @Watch("scale")
  validateScale(newScale: string) {
    const scales = ["s", "m", "l"];
    if (!scales.includes(newScale)) this.scale = "m";
  }

  /** The color theme of the radio button group. */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";
  @Watch("theme")
  validateTheme(newTheme: string) {
    const themes = ["light", "dark"];
    if (!themes.includes(newTheme)) this.theme = "light";
  }

  /** The layout direction of the radio buttons in a group. */
  @Prop({ mutable: true, reflect: true }) layout: "horizontal" | "vertical" = "horizontal";
  @Watch("layout")
  validateLayout(newLayout: string) {
    const layouts = ["horizontal", "vertical"];
    if (!layouts.includes(newLayout)) this.layout = "horizontal";
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteRadioButtonClick")
  @Listen("calciteRadioButtonFocus")
  onCalciteRadioButtonClick(event: CustomEvent): void {
    this.el
      .querySelectorAll("calcite-radio-button")
      .forEach((radioButton) => (radioButton.checked = false));
    (event.target as HTMLCalciteRadioButtonElement).checked = true;
    (event.target as HTMLCalciteRadioButtonElement).focused = true;
  }

  @Listen("calciteRadioButtonBlur")
  onCalciteRadioButtonBlur(event: CustomEvent) {
    (event.target as HTMLCalciteRadioButtonElement).focused = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.validateLayout(this.layout);
    this.validateScale(this.scale);
    this.validateTheme(this.theme);
    this.passPropsToRadioButtons();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private passPropsToRadioButtons = () => {
    const radioButtons = Array.from(
      this.el.querySelectorAll("calcite-radio-button")
    );
    let firstCheckedRadioButton;
    if (radioButtons && radioButtons.length > 0) {
      radioButtons.forEach((radioButton) => {
        radioButton.disabled = radioButton.hasAttribute("disabled")
          ? radioButton.disabled
          : this.disabled;
        radioButton.name = this.name;
        radioButton.required = this.required;
        radioButton.scale = this.scale;
        radioButton.theme = this.theme;
        if (firstCheckedRadioButton) {
          radioButton.checked = false;
        } else if (radioButton.checked) {
          firstCheckedRadioButton = radioButton;
        }
        return radioButton;
      });
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Focuses the selected item. If there is no selection, it focuses the first item. */
  @Method()
  setFocus() {
    const radioButtons = Array.from(
      this.el.querySelectorAll("calcite-radio-button")
    );
    if (radioButtons && radioButtons.length > 0) {
      const firstCheckedRadioButton = radioButtons.find(radioButton => radioButton.checked);
      if (!firstCheckedRadioButton) {
        radioButtons[0].focused = true;
      } else {
        firstCheckedRadioButton.focused = true;
      }
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return (
      <Host role="radiogroup">
        <slot></slot>
      </Host>
    );
  }
}
