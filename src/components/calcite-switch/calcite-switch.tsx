import { Component, h, Prop, State, Event } from "@stencil/core";
import { EventEmitter } from "@stencil/state-tunnel/dist/types/stencil.core";

@Component({
  tag: "calcite-switch",
  styleUrl: "calcite-switch.scss",
  shadow: true
})
export class CalciteSwitch {
  @Prop() checked = false;

  @Prop() text = "";

  @Prop() position: "left" | "right" = "left";

  @State() switched = this.checked;

  @Event() switchChange: EventEmitter;

  render() {
    const checkedClass = this.switched ? "toggle-switch-input--checked" : "";
    return (
      <label class="toggle-switch">
        {this.position === "right" && (
          <span class="toggle-switch-label">{this.text}</span>
        )}
        <input
          type="checkbox"
          class={`toggle-switch-input ${checkedClass}`}
          onChange={this.toggle}
        />
        <span
          class={`toggle-switch-track toggle-switch-track--${this.position}`}
        />
        {this.position === "left" && (
          <span class="toggle-switch-label">{this.text}</span>
        )}
      </label>
    );
  }

  toggle() {
    this.switched = !this.switched;
    console.log(this.switchChange);
    this.switchChange && this.switchChange.emit(this.switched);
  }
}
