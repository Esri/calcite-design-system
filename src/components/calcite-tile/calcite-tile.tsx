import { Component, h, Prop, VNode, Fragment } from "@stencil/core";

@Component({
  tag: "calcite-tile",
  styleUrl: "calcite-tile.scss",
  shadow: true
})
export class CalciteTile {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The active state of the tile. */
  @Prop({ reflect: true }) active?: boolean;

  /** The description text that appears beneath the heading of the tile. */
  @Prop({ reflect: true }) description?: string;

  /** The embed mode of the tile.  When true, renders without a border and padding for use by other components. */
  @Prop({ reflect: true }) embed = false;

  /**
   * The focused state of the tile.
   * @private
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
    const isLargeVisual = this.heading && this.icon && !this.description;
    const iconStyle = isLargeVisual
      ? {
          height: "64px",
          width: "64px"
        }
      : undefined;
    return (
      <div class={{ "large-visual": isLargeVisual, tile: true }}>
        {this.icon && (
          <div class="icon">
            <calcite-icon icon={this.icon} scale="l" style={iconStyle} />
          </div>
        )}
        {this.heading && <div class="heading">{this.heading}</div>}
        {this.description && <div class="description">{this.description}</div>}
      </div>
    );
  }

  render(): VNode {
    return (
      <Fragment>
        {this.href ? (
          <calcite-link href={this.href}>{this.renderTile()}</calcite-link>
        ) : (
          this.renderTile()
        )}
      </Fragment>
    );
  }
}
