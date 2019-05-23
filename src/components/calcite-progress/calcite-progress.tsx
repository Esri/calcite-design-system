import { Component, Element, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "calcite-progress",
  styleUrl: "calcite-progress.scss",
  shadow: false
})
export class CalciteProgress {
  @Element() el: HTMLElement;

  @Prop() type: "indeterminate" | "indeterminate-reversed" | "progress" =
    "indeterminate";

  @Prop() percentage = 0;

  @Prop() text: string = null;

  render() {
    return (
      <Host
        class="calcite-progress"
        progress-type={this.type}
        percentage={this.percentage}
      >
        <slot name="progress-content" />
      </Host>
    );
  }
}
