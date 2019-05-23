import { Component, Element, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "calcite-loader",
  styleUrl: "calcite-loader.scss",
  shadow: true
})
export class CalciteLoader {
  @Element() el: HTMLElement;

  @Prop() text: string = "Loading...";

  componentWillUpdate() {}

  render() {
    return (
      <Host class="loader is-active padding-leader-3 padding-trailer-3">
        <div class="loader-bars" />
        <div class="loader-text">{this.text}</div>
      </Host>
    );
  }
}
