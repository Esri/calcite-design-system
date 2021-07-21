import { Component, Element, h, Prop, VNode } from "@stencil/core";
@Component({
  tag: "calcite-progress",
  styleUrl: "calcite-progress.scss",
  shadow: true
})
export class CalciteProgress {
  @Element() el: HTMLCalciteProgressElement;

  /** Use indeterminate if finding actual progress value is impossible */
  @Prop() type: "indeterminate" | "determinate" = "determinate";

  /** Fraction completed, in the range of 0 - 1.0 */
  @Prop() value = 0;

  /** Label for the progress indicator */
  @Prop() label: string;

  /** Text to display for the progress indicator */
  @Prop() text: string;

  /** For indeterminate progress bars, reverse the animation direction */
  @Prop() reversed = false;

  render(): VNode {
    const isDeterminate = this.type === "determinate";
    const barStyles = isDeterminate ? { width: `${this.value * 100}%` } : {};
    return (
      <div
        aria-label={this.label || this.text}
        aria-valuemax={1}
        aria-valuemin={0}
        aria-valuenow={this.value}
        role="progressbar"
      >
        <div class="track">
          <div
            class={{
              bar: true,
              indeterminate: this.type === "indeterminate",
              reversed: this.reversed
            }}
            style={barStyles}
          />
        </div>
        {this.text ? <div class="text">{this.text}</div> : null}
      </div>
    );
  }
}
