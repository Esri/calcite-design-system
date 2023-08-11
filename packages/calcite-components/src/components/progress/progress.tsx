import { Component, Element, h, Prop, VNode } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
@Component({
  tag: "calcite-progress",
  styleUrl: "progress.scss",
  shadow: true,
})
export class Progress {
  @Element() el: HTMLCalciteProgressElement;

  /**
   * Specifies the component type.
   *
   * Use `"indeterminate"` if finding actual progress value is impossible.
   *
   */
  @Prop({ reflect: true }) type: "indeterminate" | "determinate" = "determinate";

  /** When `type` is `"determinate"`, the component's progress value with a range of 0.0 - 1.0. */
  @Prop() value = 0;

  /** Accessible name for the component. */
  @Prop() label: string;

  /** Text that displays under the component's indicator. */
  @Prop() text: string;

  /** When `true` and for `"indeterminate"` progress bars, reverses the animation direction. */
  @Prop({ reflect: true }) reversed = false;

  render(): VNode {
    const isDeterminate = this.type === "determinate";
    const barStyles = isDeterminate ? { width: `${this.value * 100}%` } : {};
    const dir = getElementDir(this.el);
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
              [CSS_UTILITY.rtl]: dir === "rtl",
              reversed: this.reversed,
            }}
            style={barStyles}
          />
        </div>
        {this.text ? <div class="text">{this.text}</div> : null}
      </div>
    );
  }
}
