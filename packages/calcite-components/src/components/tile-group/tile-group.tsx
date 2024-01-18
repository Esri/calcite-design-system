import { Component, Element, h, Prop, VNode, Watch } from "@stencil/core";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { TileGroupLayout } from "./interfaces";
import { Scale } from "../interfaces";

/**
 * @slot - A slot for adding `calcite-tile` elements.
 */
@Component({
  tag: "calcite-tile-group",
  styleUrl: "tile-group.scss",
  shadow: true,
})
export class TileGroup implements InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Defines the layout of the component.
   *
   * Use `"horizontal"` for rows, and `"vertical"` for a single column.
   */
  @Prop({ reflect: true }) layout: TileGroupLayout = "horizontal";

  /**
   * Specifies the size of the component.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("scale")
  scaleWatcher(): void {
    this.updateTiles();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTileGroupElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateTiles = (): void => {
    this.el.querySelectorAll("calcite-tile").forEach((item) => (item.scale = this.scale));
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    this.updateTiles();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
  }

  render(): VNode {
    return (
      <InteractiveContainer disabled={this.disabled}>
        <slot />
      </InteractiveContainer>
    );
  }
}
