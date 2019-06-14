import { Component, Element, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "calcite-progress",
  styleUrl: "calcite-progress.scss",
  shadow: false
})
export class CalciteProgress {
  @Element() el: HTMLElement;
  /**
   * Use indeterminate if finding actual progress value is impossible
  */
  @Prop() type: "indeterminate" | "determinate" = "determinate";
  /**
   * Percent complete of 100
  */
  @Prop() value = 0;
  /**
   * Text label for the progress indicator
  */
  @Prop() text: string = null;
  /**
   * Fill bar in the opposite direction
  */
  @Prop() reversed = false;

  render() {
    return (
      <Host
        class="calcite-progress"
        type={this.type}
        reversed={this.reversed}
        style={{
          "--percentage-value": `${this.value * 100}%`
        }}
      >
        <div class="calcite-progress__text">{this.text}</div>
        <slot />
      </Host>
    );
  }
}
