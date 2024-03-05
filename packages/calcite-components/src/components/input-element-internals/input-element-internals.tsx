import { Component, h, AttachInternals, Prop } from "@stencil/core";

@Component({
  tag: "calcite-input-element-internals",
  shadow: true,
  formAssociated: true,
})
export class InputElementInternals {
  @Prop({ reflect: true }) type: string;

  @Prop({ mutable: true }) value: string;

  @AttachInternals() internals: ElementInternals;

  handleChange = (event: InputEvent): void => {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.internals.setFormValue(newValue);
  };

  componentWillLoad(): void {
    this.internals.setFormValue("a default value");
  }

  render() {
    return <input onInput={this.handleChange} type={this.type} value={this.value} />;
  }
}
