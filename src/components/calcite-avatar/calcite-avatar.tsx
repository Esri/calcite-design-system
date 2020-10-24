import { Component, Element, h, Host, Prop } from "@stencil/core";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-avatar",
  styleUrl: "calcite-avatar.scss",
  shadow: true
})
export class CalciteAvatar {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAvatarElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /** specify the scale of the avatar, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** src to an image */
  @Prop({ reflect: true }) src: string;

  /** first name */
  @Prop({ reflect: true }) firstName: string;

  /** last name */
  @Prop({ reflect: true }) lastName: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    const scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";

    const theme = ["dark", "light"];
    if (!theme.includes(this.theme)) this.theme = "light";

    this.initials = this.getInitials();
  }

  render() {
    const dir = getElementDir(this.el);
    const content = this.determineContent();
    return <Host dir={dir}>{content}</Host>;
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** watches for changing text content **/
  private initials?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineContent() {
    const content = this.src ? (
      <img src={this.src} />
    ) : this.initials ? (
      <span class="calcite-avatar-initials">{this.initials}</span>
    ) : (
      <calcite-icon class="calcite-avatar-icon" icon="user" theme={this.theme} />
    );
    return content;
  }

  private getInitials() {
    const firstInitial = this.firstName ? this.firstName.substring(0, 1) : null;
    const lastInitial = this.lastName ? this.lastName.substring(0, 1) : null;

    const initials =
      firstInitial && lastInitial
        ? firstInitial.concat(lastInitial).toUpperCase()
        : firstInitial
        ? firstInitial.toUpperCase()
        : lastInitial
        ? lastInitial.toUpperCase()
        : null;

    return initials;
  }
}
