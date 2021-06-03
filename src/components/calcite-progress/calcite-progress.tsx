import { Component, Element, Fragment, h, Prop, VNode } from "@stencil/core";
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

  /** Text label for the progress indicator */
  @Prop() text: string = null;

  /** For indeterminate progress bars, reverse the animation direction */
  @Prop() reversed = false;

  render(): VNode {
    const isDeterminate = this.type === "determinate";
    const barStyles = isDeterminate ? { width: `${this.value * 100}%` } : {};
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}
