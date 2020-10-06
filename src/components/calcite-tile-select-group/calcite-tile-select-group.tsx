import { Component, Host, h, VNode, Prop } from "@stencil/core";

@Component({
  tag: "calcite-tile-select-group",
  styleUrl: "calcite-tile-select-group.scss",
  shadow: true
})
export class CalciteTileSelectGroup {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  /** Tiles by default move horizontally, stacking with each row, vertical allows single-column layouts */
  @Prop({ reflect: true }) layout?: "vertical" | "horizontal" = "horizontal";

  render(): VNode {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
