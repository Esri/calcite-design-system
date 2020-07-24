import { Component, Host, h, Prop } from "@stencil/core";

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

  @Prop({ reflect: true }) active?: boolean;
  @Prop({ reflect: true }) description?: string;
  @Prop({ reflect: true }) embed: boolean = false;
  @Prop({ reflect: true }) focused: boolean = false;
  @Prop({ reflect: true }) heading?: string;
  @Prop({ reflect: true }) hidden: boolean = false;
  @Prop({ reflect: true }) href?: string;
  @Prop({ reflect: true }) icon?: string;
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderTile() {
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
            <calcite-icon icon={this.icon} scale="l" style={iconStyle}></calcite-icon>
          </div>
        )}
        {this.heading && (
          <div class="heading">
            {this.heading}
            <div class="active-hidden">{this.heading}</div>
          </div>
        )}
        {this.description && <div class="description">{this.description}</div>}
      </div>
    );
  }
  render() {
    return (
      <Host>
        {this.href ? (
          <calcite-link href={this.href} theme={this.theme} user-select="false">
            {this.renderTile()}
          </calcite-link>
        ) : (
          this.renderTile()
        )}
      </Host>
    );
  }
}
