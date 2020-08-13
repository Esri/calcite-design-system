import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "calcite-tile-select-group",
  styleUrl: "calcite-tile-select-group.scss",
  shadow: true
})
export class CalciteTileSelectGroup {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
