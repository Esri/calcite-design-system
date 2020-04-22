import { Component, Host, h, Element, Prop, Listen } from "@stencil/core";
import { Scale } from "../../interfaces/common";

@Component({
  tag: "calcite-radio-button-group",
  styleUrl: "calcite-radio-button-group.scss",
  shadow: true,
})
export class CalciteRadioButtonGroup {
  @Element() el!: HTMLElement;

  @Prop() disabled: boolean = false;
  @Prop() name: string;
  @Prop() scale: Scale = "m";
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";
  @Prop({ reflect: true }) vertical: boolean = false;

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

  componentWillLoad() {
    this.passPropsToRadioButtons();
  }

  passPropsToRadioButtons = () => {
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

  render() {
    return (
      <Host scale={this.scale} vertical={this.vertical}>
        <slot></slot>
      </Host>
    );
  }
}
