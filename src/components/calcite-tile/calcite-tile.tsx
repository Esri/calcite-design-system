import { Component, Element, Fragment, h, Prop, VNode } from "@stencil/core";
import { SLOTS } from "./resources";
import { getSlotted } from "../../utils/dom";

/**
 * @slot content-start - A slot for adding non-actionable elements before the tile content.
 * @slot content-end - A slot for adding non-actionable elements after the tile content.
 */
@Component({
  tag: "calcite-tile",
  styleUrl: "calcite-tile.scss",
  shadow: true
})
export class CalciteTile {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTileElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The active state of the tile. */
  @Prop({ reflect: true }) active?: boolean;

  /** The description text that appears beneath the heading of the tile. */
  @Prop({ reflect: true }) description?: string;

  /**
   * When true, prevents interaction.
   */
  @Prop({ reflect: true }) disabled = false;

  /** The embed mode of the tile.  When true, renders without a border and padding for use by other components. */
  @Prop({ reflect: true }) embed = false;

  /**
   * The focused state of the tile.
   * @internal
   */
  @Prop({ reflect: true }) focused = false;

  /** The heading text that appears between the icon and description of the tile. */
  @Prop({ reflect: true }) heading?: string;

  /** The hidden state of the tile. */
  @Prop({ reflect: true }) hidden = false;

  /** The (optional) url for the tile. (Only applies when embed is set to false) */
  @Prop({ reflect: true }) href?: string;

  /** The icon that appears at the top of the tile. */
  @Prop({ reflect: true }) icon?: string;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderTile(): VNode {
    const { icon, el, heading, description } = this;
    const isLargeVisual = heading && icon && !description;
    const iconStyle = isLargeVisual
      ? {
          height: "64px",
          width: "64px"
        }
      : undefined;

    return (
      <div class={{ container: true, "large-visual": isLargeVisual }}>
        {icon && (
          <div class="icon">
            <calcite-icon icon={icon} scale="l" style={iconStyle} />
          </div>
        )}
        <div class="content-container">
          {getSlotted(el, SLOTS.contentStart) ? (
            <div class="content-slot-container">
              <slot name={SLOTS.contentStart} />
            </div>
          ) : null}
          <div class="content">
            {heading && <div class="heading">{heading}</div>}
            {description && <div class="description">{description}</div>}
          </div>
          {getSlotted(el, SLOTS.contentEnd) ? (
            <div class="content-slot-container">
              <slot name={SLOTS.contentEnd} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  render(): VNode {
    return (
      <Fragment>
        {this.href ? (
          <calcite-link disabled={this.disabled} href={this.href}>
            {this.renderTile()}
          </calcite-link>
        ) : (
          this.renderTile()
        )}
      </Fragment>
    );
  }
}
