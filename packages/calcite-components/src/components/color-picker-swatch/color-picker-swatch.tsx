import { Component, Element, Fragment, h, Prop, VNode, Watch } from "@stencil/core";
import Color from "color";
import { getModeName } from "../../utils/dom";
import { Scale } from "../interfaces";
import { hexify } from "../color-picker/utils";
import { CHECKER_DIMENSIONS, COLORS, CSS } from "./resources";

@Component({
  tag: "calcite-color-picker-swatch",
  styleUrl: "color-picker-swatch.scss",
  shadow: true,
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
    reflect: true,
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
   * Specifies the size of the component.
   */
  @Prop({
    reflect: true,
  })
  scale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteColorPickerSwatchElement;

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
    const isEmpty = !this.internalColor;
    const classes = {
      [CSS.swatch]: true,
      [CSS.noColorSwatch]: isEmpty,
    };

    return (
      <svg class={classes} xmlns="http://www.w3.org/2000/svg">
        {this.renderSwatch()}
      </svg>
    );
  }

  renderSwatch(): VNode {
    const { active, el, internalColor } = this;
    const borderRadius = active ? "100%" : "0";
    const theme = getModeName(el);
    const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;
    const isEmpty = !internalColor;
    const commonSwatchProps = {
      height: "100%",
      rx: borderRadius,
      stroke: borderColor,
      strokeWidth: "2",
      width: "100%",
    };

    if (isEmpty) {
      return (
        <Fragment>
          <clipPath id="shape">
            <rect height="100%" rx={borderRadius} width="100%" />
          </clipPath>
          {this.renderSwatchRect({
            clipPath: `inset(0 round ${borderRadius})`,
            ...commonSwatchProps,
          })}
          <line clip-path="url(#shape)" stroke-width="3" x1="100%" x2="0" y1="0" y2="100%" />
        </Fragment>
      );
    }

    const alpha = internalColor.alpha();
    const hex = hexify(internalColor);
    const hexa = hexify(internalColor, alpha < 1);

    return (
      <Fragment>
        <title>{hexa}</title>
        <defs>
          <pattern
            height={CHECKER_DIMENSIONS.size}
            id="checker"
            patternUnits="userSpaceOnUse"
            width={CHECKER_DIMENSIONS.size}
            x="0"
            y="0"
          >
            <rect
              class={CSS.checker}
              height={CHECKER_DIMENSIONS.squareSize}
              width={CHECKER_DIMENSIONS.squareSize}
              x="0"
              y="0"
            />
            <rect
              class={CSS.checker}
              height={CHECKER_DIMENSIONS.squareSize}
              width={CHECKER_DIMENSIONS.squareSize}
              x={CHECKER_DIMENSIONS.squareSize}
              y={CHECKER_DIMENSIONS.squareSize}
            />
          </pattern>
        </defs>
        {this.renderSwatchRect({
          fill: "url(#checker)",
          rx: commonSwatchProps.rx,
          height: commonSwatchProps.height,
          width: commonSwatchProps.width,
        })}
        {this.renderSwatchRect({
          clipPath: alpha < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round ${borderRadius})`,
          fill: hex,
          ...commonSwatchProps,
        })}
        {alpha < 1
          ? this.renderSwatchRect({
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
              fill: hexa,
              key: "opacity-fill",
              ...commonSwatchProps,
            })
          : null}
      </Fragment>
    );
  }

  renderSwatchRect({
    clipPath,
    fill,
    height,
    key,
    rx,
    stroke,
    strokeWidth,
    width,
  }: {
    clipPath?: string;
    fill?: string;
    height: string;
    key?: string;
    rx: string;

    // note: stroke-width and clip-path are needed to hide overflowing portion of stroke
    // see https://stackoverflow.com/a/7273346/194216
    stroke?: string;
    strokeWidth?: string;

    width: string;
  }): VNode {
    return (
      <rect
        clip-path={clipPath}
        fill={fill}
        height={height}
        key={key}
        rx={rx}
        stroke={stroke}
        stroke-width={strokeWidth}
        width={width}
      />
    );
  }
}
