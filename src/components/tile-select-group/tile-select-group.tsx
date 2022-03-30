import { Component, h, VNode, Prop, Element } from "@stencil/core";
import { TileSelectGroupLayout } from "./interfaces";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * @slot - A slot for adding `calcite-tile-select`s.
 */
@Component({
  tag: "calcite-tile-select-group",
  styleUrl: "tile-select-group.scss",
  shadow: true
})
export class TileSelectGroup implements InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTileSelectGroupElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The disabled state of the tile select. */
  @Prop({ reflect: true }) disabled = false;

  /** Tiles by default move horizontally, stacking with each row, vertical allows single-column layouts */
  @Prop({ reflect: true }) layout?: TileSelectGroupLayout = "horizontal";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    return <slot />;
  }
}
