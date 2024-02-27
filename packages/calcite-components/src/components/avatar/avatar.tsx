import { Component, Element, h, Prop, State } from "@stencil/core";
import { getModeName } from "../../utils/dom";
import { isValidHex } from "../color-picker/utils";
import { Scale } from "../interfaces";
import { hexToHue, stringToHex } from "./utils";

@Component({
  tag: "calcite-avatar",
  styleUrl: "avatar.scss",
  shadow: true,
})
export class Avatar {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the `src` to an image (remember to add a token if the user is private). */
  @Prop({ reflect: true }) thumbnail: string;

  /** Specifies the full name of the user. When `label` and `thumbnail` are not defined, specifies the accessible name for the component. */
  @Prop({ reflect: true }) fullName: string;

  /** Specifies the username of the user. */
  @Prop({ reflect: true }) username: string;

  /** Specifies the unique id of the user. */
  @Prop({ reflect: true }) userId: string;

  /** Specifies alternative text when `thumbnail` is defined, otherwise specifies an accessible label.*/
  @Prop() label: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return this.determineContent();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAvatarElement;

  @State() thumbnailFailedToLoad = false;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineContent() {
    if (this.thumbnail && !this.thumbnailFailedToLoad) {
      return (
        <img
          alt={this.label || ""}
          class="thumbnail"
          onError={() => (this.thumbnailFailedToLoad = true)}
          src={this.thumbnail}
        />
      );
    }
    const initials = this.generateInitials();
    const backgroundColor = this.generateFillColor();
    return (
      <span
        aria-label={this.label || this.fullName}
        class="background"
        role="figure"
        style={{ backgroundColor }}
      >
        {initials ? (
          <span aria-hidden="true" class="initials">
            {initials}
          </span>
        ) : (
          <calcite-icon class="icon" icon="user" scale={this.scale} />
        )}
      </span>
    );
  }

  /**
   * Generate a valid background color that is consistent and unique to this user
   */
  private generateFillColor() {
    const { userId, username, fullName, el } = this;
    const theme = getModeName(el);
    const id = userId && `#${userId.substr(userId.length - 6)}`;
    const name = username || fullName || "";
    const hex = id && isValidHex(id) ? id : stringToHex(name);
    // if there is not unique information, or an invalid hex is produced, return a default
    if ((!userId && !name) || !isValidHex(hex)) {
      return `var(--calcite-color-foreground-2)`;
    }
    const hue = hexToHue(hex);
    const l = theme === "dark" ? 20 : 90;
    return `hsl(${hue}, 60%, ${l}%)`;
  }

  /**
   * Use fullName or username to generate initials
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
