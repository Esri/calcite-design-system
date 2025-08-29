// @ts-strict-ignore
import Color, { type ColorInstance } from "color";
import { PropertyValues } from "lit";
import { LitElement, property, Fragment, h, JsxNode } from "@arcgis/lumina";
import { getModeName } from "../../utils/dom";
import { Scale } from "../interfaces";
import { hexify } from "../color-picker/utils";
import { CHECKER_DIMENSIONS, COLORS, CSS, IDS } from "./resources";
import { styles } from "./color-picker-swatch.scss";

declare global {
  interface DeclareElements {
    "calcite-color-picker-swatch": ColorPickerSwatch;
  }
}

/**
 * @deprecated Use the `calcite-swatch-group` and `calcite-swatch` components instead.
 */
export class ColorPickerSwatch extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private internalColor: ColorInstance;

  // #endregion

  // #region Public Properties

  /** When present, the component is active. */
  @property({
    reflect: true,
  })
  active = false;

  /**
   * The color value.
   *
   * @see [Color CSS data type](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
   */
  @property() color: string | null;

  /** Specifies the size of the component. */
  @property({
    reflect: true,
  })
  scale: Scale = "m";

  // #endregion

  // #region Lifecycle

  load(): void {
    this.handleColorChange(this.color);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("color")) {
      this.handleColorChange(this.color);
    }
  }

  // #endregion

  // #region Private Methods

  private handleColorChange(color: string | null): void {
    this.internalColor = color ? Color(color) : null;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
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

  private renderSwatch(): JsxNode {
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
        <>
          <clipPath id={IDS.shape}>
            <rect height="100%" rx={borderRadius} width="100%" />
          </clipPath>
          {this.renderSwatchRect({
            clipPath: `inset(0 round ${borderRadius})`,
            ...commonSwatchProps,
          })}
          <line clip-path="url(#shape)" stroke-width="3" x1="100%" x2="0" y1="0" y2="100%" />
        </>
      );
    }

    const alpha = internalColor.alpha();
    const hex = hexify(internalColor);
    const hexa = hexify(internalColor, alpha < 1);

    return (
      <>
        <title>{hexa}</title>
        <defs>
          <pattern
            height={CHECKER_DIMENSIONS.size}
            id={IDS.checker}
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
      </>
    );
  }

  private renderSwatchRect({
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
    // @see https://stackoverflow.com/a/7273346/194216
    stroke?: string;
    strokeWidth?: string;

    width: string;
  }): JsxNode {
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

  // #endregion
}
