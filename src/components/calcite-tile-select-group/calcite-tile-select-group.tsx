import { Component, Host, h, VNode } from "@stencil/core";

@Component({
  tag: "calcite-tile-select-group",
  styleUrl: "calcite-tile-select-group.scss",
  shadow: true
})
export class CalciteTileSelectGroup {
  render(): VNode {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
