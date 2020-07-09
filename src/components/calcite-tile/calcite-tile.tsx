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

  @Prop() description: string = "";
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) embed: boolean = false;
  @Prop({ reflect: true }) focused: boolean = false;
  @Prop({ reflect: true }) hidden: boolean = false;
  @Prop({ reflect: true }) href?: string;
  @Prop({ reflect: true }) icon: string = "";
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";
  @Prop() heading: string = "";

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderTile() {
    return [
      <div id="icon">
        {this.icon && <calcite-icon icon={this.icon} scale="l"></calcite-icon>}
      </div>,
      <div id="heading">{this.heading}</div>,
      <div id="description">{this.description}</div>,
    ];
  }
  render() {
    return (
      <Host>
        {this.href ? (
          <calcite-link href={this.href}>{this.renderTile()}</calcite-link>
        ) : (
          this.renderTile()
        )}
      </Host>
    );
  }
}
