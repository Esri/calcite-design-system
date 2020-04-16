import { Component, Element, h, Host, Prop } from "@stencil/core";
@Component({
  tag: "calcite-progress",
  styleUrl: "calcite-progress.scss",
  shadow: true,
})
export class CalciteProgress {
  @Element() el: HTMLElement;
  /** Use indeterminate if finding actual progress value is impossible */
  @Prop() type: "indeterminate" | "determinate" = "determinate";
  /** Percent complete of 100 */
  @Prop() value = 0;
  /** Text label for the progress indicator */
  @Prop() text: string = null;
  /** Fill bar in the opposite direction */
  @Prop() reversed = false;
  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  render() {
    const isDeterminate = this.type === "determinate";
    const barStyles = isDeterminate ? { width: `${this.value * 100}%` } : {};
    return (
      <Host>
        <div class="track">
          <div
            class={{
              bar: true,
              indeterminate: this.type === "indeterminate",
              reversed: this.reversed,
            }}
            style={barStyles}
          />
        </div>
        {this.text ? <div class="text">{this.text}</div> : null}
      </Host>
    );
  }
}
