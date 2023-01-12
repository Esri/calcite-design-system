import { Component, Element, h, Prop, VNode, Watch } from "@stencil/core";
import Color from "color";
import { getModeName } from "../../utils/dom";
import { Scale } from "../interfaces";
import { COLORS, CSS } from "./resources";

@Component({
  tag: "calcite-color-picker-swatch",
  styleUrl: "color-picker-swatch.scss",
  shadow: true
})
export class ColorPickerSwatch {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, the component is active.
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
   * Specifies the size of the component.
   */
  @Prop({
    reflect: true
  })
  scale: Scale = "m";

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
    const theme = getModeName(el);
    const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;

    return (
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
    );
  }
}
