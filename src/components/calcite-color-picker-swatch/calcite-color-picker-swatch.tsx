import { Component, Element, h, Host, Prop, VNode, Watch } from "@stencil/core";
import Color from "color";
import { COLORS, CSS } from "./resources";
import { Scale, Theme } from "../interfaces";
import { getElementProp } from "../../utils/dom";

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
  theme: Theme;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element()
  el: HTMLCalciteColorPickerSwatchElement;

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
    const { active, el, internalColor } = this;
    const borderRadius = active ? "100%" : "0";
    const hex = internalColor.hex();
    const theme = getElementProp(el, "theme", "light", true);
    const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;

    return (
      <Host>
        <svg class={CSS.swatch} xmlns="http://www.w3.org/2000/svg">
          <title>{hex}</title>
          <rect
            fill={hex}
            height="100%"
            id="swatch"
            rx={borderRadius}
            stroke={borderColor}
            // stroke-width and clip-path are needed to hide overflowing portion of stroke
            // see https://stackoverflow.com/a/7273346/194216
            stroke-width="2"
            style={{ "clip-path": `inset(0 round ${borderRadius})` }}
            width="100%"
          />
        </svg>
      </Host>
    );
  }
}
