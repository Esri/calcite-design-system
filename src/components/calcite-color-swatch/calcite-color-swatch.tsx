import { Component, h, Host, Prop, VNode, Watch } from "@stencil/core";
import Color from "color";
import { COLORS, CSS } from "./resources";
import { Scale, Theme } from "../../interfaces/common";
import { TEXT } from "../calcite-color/resources";

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
  color: string | null;

  @Watch("color")
  handleColorChange(color: string | null): void {
    this.internalColor = color ? Color(color) : null;
  }

  /**
   * Label used for no color swatches.
   */
  @Prop()
  intlNoColor = TEXT.noColor;

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

  private internalColor: Color | null;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.handleColorChange(this.color);
  }

  render(): VNode {
    const { active, internalColor, intlNoColor, scale, theme } = this;
    const noColor = !internalColor;
    const borderRadius = active ? "100%" : "0";
    const fillColor = noColor ? COLORS.emptyFill : internalColor.hex();
    const label = noColor ? intlNoColor : internalColor.hex();

    const borderColor =
      active || noColor
        ? COLORS.activeBorder
        : internalColor[theme === "light" ? "darken" : "whiten"](0.25).hex();

    return (
      <Host aria-label={label} title={label}>
        <svg class={CSS.swatch} xmlns="http://www.w3.org/2000/svg">
          <rect
            fill={fillColor}
            height="100%"
            rx={borderRadius}
            stroke={borderColor}
            width="100%"
          />
        </svg>
        {noColor ? <calcite-icon class={CSS.noColorIcon} icon="x" scale={scale} /> : null}
      </Host>
    );
  }
}
