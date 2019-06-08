import { Component, Element, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "calcite-loader",
  styleUrl: "calcite-loader.scss",
  shadow: true
})
export class CalciteLoader {
  @Element() el: HTMLElement;

  /**
  * Loader is visible when active
  */
  @Prop() isActive = false;

  /**
  * Text which should appear under the loading indicator
  */
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
