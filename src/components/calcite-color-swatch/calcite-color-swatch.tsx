import { Component, Prop, h, Host, Watch, VNode } from "@stencil/core";
import Color from "color";
import { CSS } from "./resources";
import { Scale, Theme } from "../../interfaces/common";
import { normalizeHex } from "../calcite-color-picker/utils";

const DEFAULT_COLOR = Color();

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
  color: string = normalizeHex(DEFAULT_COLOR.hex());

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
    this.internalColor = Color(this.color);
  }

  render(): VNode {
    const { internalColor, active, scale, theme } = this;
    const hex = internalColor.hex();

    const classes = {
      [CSS.swatch]: true
    };

    const contrastToneMethod: Extract<keyof Color, "darken" | "whiten"> =
      theme === "light" ? "darken" : "whiten";
    const contrastingColor = internalColor[contrastToneMethod](0.25).hex();

    return (
      <Host aria-label={hex} title={hex}>
        {active ? (
          <calcite-icon
            icon="circle-f"
            scale={scale}
            style={{
              color: contrastingColor
            }}
          />
        ) : (
          <div
            class={classes}
            style={{
              backgroundColor: hex,
              borderColor: contrastingColor
            }}
          />
        )}
      </Host>
    );
  }
}
