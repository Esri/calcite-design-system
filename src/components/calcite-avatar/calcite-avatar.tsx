import { Component, Element, h, Host, Prop } from "@stencil/core";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-avatar",
  styleUrl: "calcite-avatar.scss",
  shadow: true,
})
export class CalciteAvatar {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /** specify the scale of the avatar, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" =
    "m";

  @Prop({ mutable: true, reflect: true }) src: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let theme = ["dark", "light"];
    if (!theme.includes(this.theme)) this.theme = "light";
  }

  render() {
    const dir = getElementDir(this.el);

    return (
      <Host dir={dir}>
        {this.src ? <img src={this.src} /> : null}
        {!this.src ? (
          <calcite-icon icon="user" class="avatar-icon"></calcite-icon>
        ) : null}
      </Host>
    );
  }
}
