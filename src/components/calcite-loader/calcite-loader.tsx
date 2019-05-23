import { Component, Element, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "calcite-loader",
  styleUrl: "calcite-loader.scss",
  shadow: true
})
export class CalciteLoader {
  @Element() el: HTMLElement;

  @Prop() isActive = false;

  @Prop() text = "Loading...";

  render() {
    return (
      <Host is-active={!!this.isActive}>
        <div class="loader-bars" />
        <div class="loader-text">{this.text}</div>
      </Host>
    );
  }
}
