import { Component, Host, h, Element, Prop, Listen } from "@stencil/core";

@Component({
  tag: "calcite-radio-button-group",
  styleUrl: "calcite-radio-button-group.scss",
  shadow: true,
})
export class CalciteRadioButtonGroup {
  @Element() el!: HTMLElement;

  @Prop() disabled: boolean = false;
  @Prop() name: string;
  @Prop() scale: "xs" | "s" | "m" | "l" | "xl" = "m";
  @Prop({ reflect: true }) vertical: boolean = false;

  @Listen("onRadioButtonClick")
  onRadioButtonClick(event: CustomEvent): void {
    this.el
      .querySelectorAll("calcite-radio-button")
      .forEach((radioButton) => (radioButton.checked = false));
    (event.target as HTMLCalciteRadioButtonElement).checked = true;
    (event.target as HTMLCalciteRadioButtonElement).focused = true;
  }

  @Listen("onRadioButtonFocus")
  onRadioButtonFocus(event: CustomEvent) {
    (event.target as HTMLCalciteRadioButtonElement).checked = true;
    (event.target as HTMLCalciteRadioButtonElement).focused = true;
  }

  @Listen("onRadioButtonBlur")
  onRadioButtonBlur(event: CustomEvent) {
    (event.target as HTMLCalciteRadioButtonElement).focused = false;
  }

  componentWillLoad() {
    this.passPropsToRadioButtons();
  }

  passPropsToRadioButtons = () => {
    const radioButtons = Array.from(
      this.el.querySelectorAll("calcite-radio-button")
    );
    if (radioButtons && radioButtons.length > 0) {
      radioButtons.forEach((radioButton) => {
        radioButton.disabled = radioButton.hasAttribute("disabled")
          ? radioButton.disabled
          : this.disabled;
        radioButton.name = this.name;
        radioButton.scale = this.scale;
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
