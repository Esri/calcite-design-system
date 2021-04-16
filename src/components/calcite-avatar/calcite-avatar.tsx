import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { isValidHex } from "../calcite-color-picker/utils";
import { Scale, Theme } from "../interfaces";
import { hexToHue, stringToHex } from "./utils";

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
  @Prop({ reflect: true }) theme: Theme;

  /** specify the scale of the avatar, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** src to an image (remember to add a token if the user is private) */
  @Prop() thumbnail: string;

  /** full name of the user */
  @Prop() fullName: string;

  /** user name */
  @Prop() username: string;

  /** unique id for user */
  @Prop() userId: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    const content = this.determineContent();
    return <Host>{content}</Host>;
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** True if thumnail fails to load */
  @State() error = false;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineContent() {
    const dir = getElementDir(this.el);

    if (this.thumbnail && !this.error) {
      return (
        <img
          alt=""
          class="thumbnail"
          dir={dir}
          onError={() => (this.error = true)}
          src={this.thumbnail}
        />
      );
    }
    const initials = this.generateInitials();
    const backgroundColor = this.generateFillColor();
    return (
      <span class="background" dir={dir} style={{ backgroundColor }}>
        {initials ? (
          <span aria-hidden="true" class="initials">
            {initials}
          </span>
        ) : (
          <calcite-icon class="icon" icon="user" scale={this.scale} theme={this.theme} />
        )}
      </span>
    );
  }

  /**
   * Generate a valid background color that is consistent and unique to this user
   */
  private generateFillColor() {
    const { userId, username, fullName, theme } = this;
    const id = userId && `#${userId.substr(userId.length - 6)}`;
    const name = username || fullName || "";
    const hex = id && isValidHex(id) ? id : stringToHex(name);
    // if there is not unique information, or an invalid hex is produced, return a default
    if ((!userId && !name) || !isValidHex(hex)) {
      return `var(--calcite-ui-foreground-2)`;
    }
    const hue = hexToHue(hex);
    const l = theme === "dark" ? 20 : 90;
    return `hsl(${hue}, 60%, ${l}%)`;
  }

  /**
   * Use fullname or username to generate initials
   */
  private generateInitials(): string | boolean {
    const { fullName, username } = this;
    if (fullName) {
      return fullName
        .trim()
        .split(" ")
        .map((name) => name.substring(0, 1))
        .join("");
    } else if (username) {
      return username.substring(0, 2);
    }
    return false;
  }
}
