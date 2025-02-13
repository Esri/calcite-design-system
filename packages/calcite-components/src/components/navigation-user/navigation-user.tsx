// @ts-strict-ignore
import { LitElement, property, h, method, JsxNode } from "@arcgis/lumina";
import { componentFocusable } from "../../utils/component";
import { CSS } from "./resources";
import { styles } from "./navigation-user.scss";

declare global {
  interface DeclareElements {
    "calcite-navigation-user": NavigationUser;
  }
}

export class NavigationUser extends LitElement {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** When `true`, the component is highlighted. */
  @property({ reflect: true }) active: boolean;

  /** Specifies the full name of the user. */
  @property() fullName: string;

  /** Describes the appearance of the avatar. If no label is provided, context will not be provided to assistive technologies. */
  @property() label: string;

  /** When `true`, hides the `fullName` and `username` contents. */
  @property({ reflect: true }) textDisabled = false;

  /** Specifies the `src` to an image (remember to add a token if the user is private). */
  @property() thumbnail: string;

  /** Specifies the unique id of the user. */
  @property() userId: string;

  /** Specifies the username of the user. */
  @property() username: string;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.el.focus();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <button ariaLabel={this.label} class={CSS.button}>
        <calcite-avatar
          fullName={this.fullName}
          label={this.label}
          thumbnail={this.thumbnail}
          userId={this.userId}
          username={this.username}
        />
        {(this.fullName || this.username) && !this.textDisabled && (
          <div class={CSS.textContainer}>
            {this.fullName && (
              <span class={CSS.fullName} key={CSS.fullName}>
                {this.fullName}
              </span>
            )}
            {this.username && (
              <span class={CSS.username} key={CSS.username}>
                {this.username}
              </span>
            )}
          </div>
        )}
      </button>
    );
  }

  // #endregion
}
