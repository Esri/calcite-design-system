import { Component, h, VNode, Prop } from "@stencil/core";
import { TileSelectGroupLayout } from "./interfaces";

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
  @Prop({ reflect: true }) layout?: TileSelectGroupLayout = "horizontal";

  render(): VNode {
    return <slot />;
  }
}
