import { Component, h, Prop, State } from "@stencil/core";

@Component({
  tag: "calcite-switch",
  styleUrl: "calcite-switch.scss",
  shadow: true
})
export class CalciteSwitch {
  @Prop() checked = false;

  @Prop() text = "";

  @Prop() position: "left" | "right" = "left"

  @State() switched = this.checked;

  render() {
    const checkedClass = this.switched ? "toggle-switch-input--checked" : "";
    return (
      <label class="toggle-switch">
        { this.position === "right" && <span class="toggle-switch-label">{this.text}</span> } 
        <input type="checkbox" class={`toggle-switch-input ${checkedClass}`}/>
        <span class={`toggle-switch-track toggle-switch-track--${this.position}`}></span>
        { this.position === "left" && <span class="toggle-switch-label">{this.text}</span> } 
      </label>
    );
  }
}
