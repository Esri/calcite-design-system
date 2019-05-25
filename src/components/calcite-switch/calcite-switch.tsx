import { Component, h, Prop, State, Event, Element } from "@stencil/core";
import { EventEmitter } from "@stencil/state-tunnel/dist/types/stencil.core";

@Component({
  tag: "calcite-switch",
  styleUrl: "calcite-switch.scss",
  shadow: true
})
export class CalciteSwitch {
  @Element() el: HTMLElement;

  @Prop() checked = false;

  @Prop() text = "";

  @Prop() position: "left" | "right" | "after" | "before" = "left";

  @Prop() destructive = false;

  @State() switched = this.checked;

  @Event() switchChange: EventEmitter;

  render() {
    return [
      <label
        class={this.destructive ? "toggle-switch-destructive" : "toggle-switch"}
      >
        {(this.position === "right" || this.position === "after") && (
          <span class="toggle-switch-label">{this.text}</span>
        )}
        <input
          type="checkbox"
          class="toggle-switch-input"
          checked={this.switched}
          onChange={this.setInputSlot.bind(this)}
        />
        <span
          class={`toggle-switch-track toggle-switch-track--${this.position}`}
        />
        {(this.position === "left" || this.position === "before") && (
          <span class="toggle-switch-label">{this.text}</span>
        )}
      </label>,
      <slot />
    ];
  }
  setInputSlot(): void {
    const input = this.el.querySelector("input");
    this.switched = !this.switched;
    input && input.setAttribute("checked", this.switched.toString());
  }
}
