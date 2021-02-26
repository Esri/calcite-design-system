import { Component, h, Host, Prop, VNode, Watch } from "@stencil/core";
import Color from "color";
import { COLORS, CSS } from "./resources";
import { Scale, Theme } from "../interfaces";

@Component({
  tag: "calcite-color-picker-swatch",
  styleUrl: "calcite-color-picker-swatch.scss",
  shadow: true
})
export class CalciteColorPickerSwatch {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Used to display whether the swatch is active or not.
   */
  @Prop({
    reflect: true
  })
  active = false;

  /**
   * The color value.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   */
  @Prop()
  color: string;

  @Watch("color")
  handleColorChange(color: string): void {
    this.internalColor = Color(color);
  }

  /**
   * The component scale.
   */
  @Prop({
    reflect: true
  })
  scale: Scale = "m";

  /**
   * The component's theme.
   */
  @Prop({
    reflect: true
  })
  theme: Theme = "light";

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
    this.handleColorChange(this.color);
  }

  render(): VNode {
    const { active, internalColor, theme } = this;
    const borderRadius = active ? "100%" : "0";
    const hex = internalColor.hex();
    const borderColor = active
      ? COLORS.activeBorder
      : internalColor[theme === "light" ? "darken" : "whiten"](0.25).hex();

    return (
      <Host aria-label={hex} title={hex}>
        <svg class={CSS.swatch} xmlns="http://www.w3.org/2000/svg">
          <rect fill={hex} height="100%" rx={borderRadius} stroke={borderColor} width="100%" />
        </svg>
      </Host>
    );
  }
}
