import { Component, Element, h, Prop, VNode, Watch } from "@stencil/core";
import Color from "color";
import { getModeName } from "../../utils/dom";
import { Scale } from "../interfaces";
import { hexify } from "../color-picker/utils";
import { COLORS, CSS } from "./resources";

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
    const alpha = internalColor.alpha();
    const borderRadius = active ? "100%" : "0";
    const hex = hexify(internalColor);
    const hexa = hexify(internalColor, alpha < 1);
    const theme = getModeName(el);
    const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;
    const commonSwatchProps = {
      height: "100%",
      stroke: borderColor,
      // stroke-width and clip-path are needed to hide overflowing portion of stroke
      // see https://stackoverflow.com/a/7273346/194216
      strokeWidth: "2",
      width: "100%"
    };

    return (
      <svg class={CSS.swatch} xmlns="http://www.w3.org/2000/svg">
        <title>{hexa}</title>
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
          style={{ "clip-path": alpha < 1 ? "polygon(100% 0, 0 0, 0 100%)" : "" }}
          {...commonSwatchProps}
        />
        {alpha < 1 ? (
          <rect
            fill={hexa}
            style={{ "clip-path": "polygon(100% 0, 100% 100%, 0 100%)" }}
            {...commonSwatchProps}
          />
        ) : null}
      </svg>
    );
  }
}
