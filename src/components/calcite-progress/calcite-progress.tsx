import { Component, Element, h, Host, Prop } from "@stencil/core";
import { getElementTheme } from "../../utils/dom";

@Component({
  tag: "calcite-progress",
  styleUrl: "calcite-progress.scss",
  shadow: true
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
  /** Select theme (light or dark) */
  @Prop({ reflect: true })
  theme: "light" | "dark";

  render() {
    const theme = getElementTheme(this.el);
    return (
      <Host
        class="calcite-progress"
        type={this.type}
        reversed={this.reversed}
        style={{
          "--percentage-value": `${this.value * 100}%`
        }}
        theme={theme}
      >
        <div class="calcite-progress--track" />
        <div
          class={{
            "calcite-progress--bar": true,
            "--indeterminate": this.type === "indeterminate",
            "--determinate": this.type === "determinate"
          }}
        />
        {this.text ? (
          <div class="calcite-progress--text">{this.text}</div>
        ) : null}
      </Host>
    );
  }
}
