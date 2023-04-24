import { Component, Element, h, Prop, VNode, Watch } from "@stencil/core";
import Color from "color";
import { COLORS, CSS } from "./resources";
import { Scale } from "../interfaces";
import { getThemeName } from "../../utils/dom";
import { hexify } from "../color-picker/utils";

const CHECKER_SQUARE_SIZE_IN_PX = 4;
const CHECKER_SIZE_IN_PX = CHECKER_SQUARE_SIZE_IN_PX * 2;

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
    const alpha = internalColor.alpha();
    const hex = hexify(internalColor, alpha < 1);
    const theme = getThemeName(el);
    const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;

    return (
      <svg class={CSS.swatch} xmlns="http://www.w3.org/2000/svg">
        <title>{hex}</title>
        <defs>
          <pattern
            height={CHECKER_SIZE_IN_PX}
            id="checker"
            patternUnits="userSpaceOnUse"
            width={CHECKER_SIZE_IN_PX}
            x="0"
            y="0"
          >
            <rect
              class={CSS.checker}
              height={CHECKER_SQUARE_SIZE_IN_PX}
              width={CHECKER_SQUARE_SIZE_IN_PX}
              x="0"
              y="0"
            />
            <rect
              class={CSS.checker}
              height={CHECKER_SQUARE_SIZE_IN_PX}
              width={CHECKER_SQUARE_SIZE_IN_PX}
              x={CHECKER_SQUARE_SIZE_IN_PX}
              y={CHECKER_SQUARE_SIZE_IN_PX}
            />
          </pattern>
        </defs>
        <rect fill="url(#checker)" height="100%" rx={borderRadius} width="100%" />
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
