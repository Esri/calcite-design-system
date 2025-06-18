// @ts-strict-ignore
import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { getModeName } from "../../utils/dom";
import { isValidHex } from "../color-picker/utils";
import { Scale } from "../interfaces";
import { CSS } from "./resources";
import { hexToHue, stringToHex } from "./utils";
import { styles } from "./avatar.scss";

declare global {
  interface DeclareElements {
    "calcite-avatar": Avatar;
  }
}

export class Avatar extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region State Properties

  @state() thumbnailFailedToLoad = false;

  // #endregion

  // #region Public Properties

  /** Specifies the full name of the user. When `label` and `thumbnail` are not defined, specifies the accessible name for the component. */
  @property({ reflect: true }) fullName: string;

  /** Specifies alternative text when `thumbnail` is defined, otherwise specifies an accessible label. */
  @property() label: string;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the `src` to an image (remember to add a token if the user is private). */
  @property({ reflect: true }) thumbnail: string;

  /** Specifies the unique id of the user. */
  @property({ reflect: true }) userId: string;

  /** Specifies the username of the user. */
  @property({ reflect: true }) username: string;

  // #endregion

  // #region Private Methods

  private determineContent() {
    if (this.thumbnail && !this.thumbnailFailedToLoad) {
      return (
        <img
          alt={this.label || ""}
          class={CSS.thumbnail}
          onError={() => (this.thumbnailFailedToLoad = true)}
          src={this.thumbnail}
        />
      );
    }
    const initials = this.generateInitials();
    const backgroundColor = this.generateFillColor();
    return (
      <span
        ariaLabel={this.label || this.fullName}
        class={CSS.background}
        role="figure"
        style={{ backgroundColor }}
      >
        {initials ? (
          <span ariaHidden="true" class={CSS.initials}>
            {initials}
          </span>
        ) : (
          <calcite-icon class={CSS.icon} icon="user" scale={this.scale} />
        )}
      </span>
    );
  }

  /** Generate a valid background color that is consistent and unique to this user */
  private generateFillColor() {
    const { userId, username, fullName, el } = this;
    const theme = getModeName(el);
    const id = userId && `#${userId.substr(userId.length - 6)}`;
    const name = username || fullName || "";
    const hex = id && isValidHex(id) ? id : stringToHex(name);
    // if there is not unique information, or an invalid hex is produced, return a default
    if ((!userId && !name) || !isValidHex(hex)) {
      return `var(--calcite-avatar-background-color, var(--calcite-color-foreground-2))`;
    }
    const hue = hexToHue(hex);
    const l = theme === "dark" ? 20 : 90;
    return `var(--calcite-avatar-background-color, hsl(${hue}, 60%, ${l}%))`;
  }

  /** Use fullName or username to generate initials */
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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return this.determineContent();
  }

  // #endregion
}
