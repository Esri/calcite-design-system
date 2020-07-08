import { Component, Element, h, Host, Prop } from "@stencil/core";
import { guid } from "../../utils/guid";
import { INLINE_SIZES, SIZES } from "./resources";

@Component({
  tag: "calcite-loader",
  styleUrl: "calcite-loader.scss",
  shadow: true,
})
export class CalciteLoader {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  /** Show the loader */
  @Prop({ reflect: true }) active: boolean = false;
  /** Inline loaders are smaller and will appear to the left of the text */
  @Prop({ reflect: true }) inline: boolean = false;
  /** Speficy the scale of the loader. Defaults to "m" */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";
  /** Use indeterminate if finding actual progress value is impossible */
  @Prop({ reflect: true }) type: "indeterminate" | "determinate";
  /** Percent complete of 100, only valid for determinate indicators */
  @Prop() value = 0;
  /** Text which should appear under the loading indicator (optional) */
  @Prop() text: string = "";
  /** Turn off spacing around the loader */
  @Prop() noPadding?: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const { el, inline, scale, text, type, value } = this;

    const radiusRatio = 0.45;

    const id = el.id || guid;
    const size = inline ? INLINE_SIZES[scale] : SIZES[scale];
    const radius = inline
      ? INLINE_SIZES[scale] * radiusRatio
      : SIZES[scale] * radiusRatio;
    const viewbox = `0 0 ${size} ${size}`;
    const isDeterminate = type === "determinate";
    const circumference = 2 * radius * Math.PI;
    const progress = (value / 100) * circumference;
    const remaining = circumference - progress;
    const valueNow = Math.floor(value);
    const hostAttributes = {
      "aria-valuenow": valueNow,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      complete: valueNow === 100,
    };
    const svgAttributes = { r: radius, cx: size / 2, cy: size / 2 };
    const determinateStyle = { "stroke-dasharray": `${progress} ${remaining}` };
    return (
      <Host
        id={id}
        role="progressbar"
        {...(isDeterminate ? hostAttributes : {})}
      >
        <div class="loader__svgs">
          <svg viewBox={viewbox} class="loader__svg loader__svg--1">
            <circle {...svgAttributes} />
          </svg>
          <svg viewBox={viewbox} class="loader__svg loader__svg--2">
            <circle {...svgAttributes} />
          </svg>
          <svg
            viewBox={viewbox}
            class="loader__svg loader__svg--3"
            {...(isDeterminate ? { style: determinateStyle } : {})}
          >
            <circle {...svgAttributes} />
          </svg>
        </div>
        {text && <div class="loader__text">{text}</div>}
        {isDeterminate && <div class="loader__percentage">{value}</div>}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  /** @internal */
  // private guid = `calcite-loader-${guid()}`;
}
