import { Component, Prop, h, Host, Watch, VNode } from "@stencil/core";
import Color from "color";
import { CSS } from "./resources";
import { Scale, Theme } from "../../interfaces/common";

const ACTIVE_BORDER_COLOR = "rgba(0, 0, 0, 0.15)";

@Component({
  tag: "calcite-color-swatch",
  styleUrl: "calcite-color-swatch.scss",
  shadow: true
})
export class CalciteColorSwatch {
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
  scale: Exclude<Scale, "xs" | "xl"> = "m";

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
    const { internalColor, active, theme } = this;
    const hex = internalColor.hex();

    const borderColor = active
      ? ACTIVE_BORDER_COLOR
      : internalColor[theme === "light" ? "darken" : "whiten"](0.25).hex();

    const borderRadius = active ? "100%" : "0";

    return (
      <Host aria-label={hex} title={hex}>
        <svg class={CSS.swatch} xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill={hex} stroke={borderColor} rx={borderRadius} />
        </svg>
      </Host>
    );
  }
}
