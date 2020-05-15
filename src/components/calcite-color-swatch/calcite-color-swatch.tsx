import { Component, Prop, h, Host, Watch, VNode } from "@stencil/core";
import Color from "color";
import { CSS } from "./resources";

const DEFAULT_COLOR = Color();

@Component({
  tag: "calcite-color-swatch",
  styleUrl: "calcite-color-swatch.scss",
  shadow: true,
})
export class CalciteColorSwatch {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * The color value.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   */
  @Prop()
  color: string = DEFAULT_COLOR.hex();

  @Watch("color")
  handleColorChange(color: string): void {
    this.internalColor = Color(color);
  }

  /**
   * Used to display whether the swatch is active or not.
   */
  @Prop({
    reflect: true,
  })
  isActive = false;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private internalColor: Color;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.internalColor = Color(this.color);
  }

  render(): VNode {
    const { internalColor, isActive } = this;

    const hex = internalColor.hex();

    const classes = {
      [CSS.swatch]: true,
      [CSS.swatchActive]: isActive,
    };

    const style = {
      "background-color": hex,
      "border-color": internalColor.darken(0.25).hex(),
    };

    return (
      <Host aria-label={hex} title={hex}>
        <div class={classes} style={style} />
      </Host>
    );
  }
}
