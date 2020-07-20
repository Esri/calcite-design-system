import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "calcite-tile",
  styleUrl: "calcite-tile.scss",
  shadow: true,
})
export class CalciteTile {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true }) active?: boolean;
  @Prop({ reflect: true }) description?: string;
  @Prop({ reflect: true }) disabled: boolean = false;
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
    return (
      <div id="tile" class={{ "large-visual": isLargeVisual }}>
        {this.icon && (
          <div id="icon">
            <calcite-icon
              icon={this.icon}
              scale="l"
              height={isLargeVisual && 64}
              width={isLargeVisual && 64}
            ></calcite-icon>
          </div>
        )}
        {this.heading && <div id="heading">{this.heading}</div>}
        {this.description && <div id="description">{this.description}</div>}
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
