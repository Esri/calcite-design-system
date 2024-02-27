import { Component, Element, h, Prop, VNode, Watch } from "@stencil/core";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Layout, Scale, SelectionAppearance, SelectionMode } from "../interfaces";
import { CSS } from "./resources";
import { createObserver } from "../../utils/observers";

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
  @Prop({ reflect: true }) layout: Exclude<Layout, "grid"> = "horizontal";

  /**
   * Specifies the size of the component.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("scale")
  scaleWatcher(): void {
    this.updateTiles();
  }

  /**
   * Specifies the selection appearance, where:
   *
   * - `"icon"` (displays a checkmark or dot), or
   * - `"border"` (displays a border).
   */
  @Prop({ mutable: true }) selectionAppearance: SelectionAppearance = "icon";

  /**
   * Specifies the selection mode, where:
   *
   * - `"multiple"` (allows any number of selected items),
   * - `"single"` (allows only one selected item),
   * - `"single-persist"` (allows only one selected item and prevents de-selection),
   * - `"none"` (allows no selected items).
   */
  @Prop({ mutable: true }) selectionMode: Extract<"multiple" | "none" | "single" | "single-persist", SelectionMode> = "none";

  @Watch("selectionMode")
  @Watch("selectionAppearance")
  handleListItemChange(): void {
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

  private mutationObserver = createObserver("mutation", () => this.updateTiles());

  private updateTiles = (): void => {
    this.el.querySelectorAll("calcite-tile").forEach((item) => {
      item.scale = this.scale;
      item.selectionAppearance = this.selectionAppearance;
      item.selectionMode = this.selectionMode;
    });
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.updateTiles();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    this.mutationObserver?.disconnect();
  }

  render(): VNode {
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div class={CSS.container}>
          <slot onSlotchange={this.updateTiles} />
        </div>
      </InteractiveContainer>
    );
  }
}
