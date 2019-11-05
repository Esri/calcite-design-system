import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import { guid } from "../../utils/guid";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-loader",
  styleUrl: "calcite-loader.scss",
  shadow: true
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
  /**
   * Show the loader
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  isActive: boolean = false;
  /**
   * Inline loaders are smaller and will appear to the left of the text
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  inline: boolean = false;
  /**
   * Use indeterminate if finding actual progress value is impossible
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  type: "indeterminate" | "determinate" = "indeterminate";
  /**
   * Percent complete of 100, only valid for determinate indicators
   */
  @Prop() value = 0;
  /**
   * Text which should appear under the loading indicator (optional)
   */
  @Prop() text: string = "";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.isEdge = /Edge/.test(navigator.userAgent);
    if (this.isEdge) {
      this.updateOffset();
    }
  }

  componentDidUnload() {
    if (this.animationID) {
      window.cancelAnimationFrame(this.animationID);
    }
  }

  render() {
    const dir = getElementDir(this.el);
    const id = this.el.id || this.guid;
    const ariaAttributes = {
      "aria-valuenow": this.value,
      "aria-valuemin": 0,
      "aria-valuemax": 100
    };
    const size = this.inline ? 16 : 56;
    const viewbox = this.inline ? "0 0 16 16" : "0 0 56 56";
    const isDeterminate = this.type === "determinate";
    const styleProperties = {};
    if (this.isEdge) {
      styleProperties[
        "--calcite-loader-offset"
      ] = `${this.loaderBarOffsets[0]}%`;
      styleProperties[
        "--calcite-loader-offset2"
      ] = `${this.loaderBarOffsets[1]}%`;
      styleProperties[
        "--calcite-loader-offset3"
      ] = `${this.loaderBarOffsets[2]}%`;
    }
    const progress = {
      "--calcite-loader-progress": `${-400 - this.value * 4}%`
    };
    return (
      <Host
        id={id}
        dir={dir}
        role="progressbar"
        {...(this.type === "determinate" ? ariaAttributes : {})}
        style={styleProperties}
      >
        <svg viewBox={viewbox} class="loader__square">
          <rect width={size} height={size} />
        </svg>
        <svg viewBox={viewbox} class="loader__square loader__square--2">
          <rect width={size} height={size} />
        </svg>
        <svg
          viewBox={viewbox}
          class="loader__square loader__square--3"
          style={isDeterminate ? progress : {}}
        >
          <rect width={size} height={size} />
        </svg>
        {this.text ? <div class="loader__text">{this.text}</div> : ""}
        {this.value ? (
          <div class="loader__percentage">{Math.floor(this.value)}</div>
        ) : (
          ""
        )}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  /**
   * @internal
   */
  @State() private loaderBarOffsets: number[] = [0, 0, 0];

  /**
   * @internal
   */
  private loaderBarRates: number[] = [1, 2.25, 3.5];

  /**
   * @internal
   */
  @State() private isEdge: boolean = false;

  /**
   * @internal
   */
  private animationID: any = null;

  /**
   * @internal
   */
  private guid = `calcite-loader-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * @internal
   */
  private updateOffset(): void {
    this.loaderBarOffsets = this.rotateLoaderBars(this.loaderBarOffsets);
    this.animationID = window.requestAnimationFrame(() => this.updateOffset());
  }

  /**
   * @internal
   */
  private rotateLoaderBars(barOffsets: number[]): number[] {
    return barOffsets.map((offset, i) => {
      if (offset > -400) {
        return offset - this.loaderBarRates[i];
      } else {
        return 0;
      }
    });
  }
}
