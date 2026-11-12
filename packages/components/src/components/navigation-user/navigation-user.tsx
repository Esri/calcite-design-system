import { LitElement, property, h, method, JsxNode } from "@arcgis/lumina";
import { useFocusable } from "../../controllers/useFocusable";
import { Scale } from "../types";
import { CSS } from "./resources";
import { styles } from "./navigation-user.scss";

declare global {
  interface DeclareElements {
    "calcite-navigation-user": NavigationUser;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * When `active`, specifies the component's border color.
     *
     * @public
     */
    "--calcite-navigation-accent-color": "*";
    /**
     * Specifies the component's avatar corner radius.
     *
     * @public
     */
    "--calcite-navigation-user-avatar-corner-radius": "*";
    /**
     * Specifies the component's avatar icon color.
     *
     * @public
     */
    "--calcite-navigation-user-avatar-color": "*";
    /**
     * Specifies the component's background color.
     *
     * @public
     */
    "--calcite-navigation-background-color": "*";
    /**
     * Specifies the component's `fullName` text color.
     *
     * @public
     */
    "--calcite-navigation-user-full-name-text-color": "*";
    /**
     * Specifies the component's `username` text color.
     *
     * @public
     */
    "--calcite-navigation-user-name-text-color": "*";
  }
}

/**
 * @public
 * @docGroup Navigation
 * @parent calcite-navigation
 */
export class NavigationUser extends LitElement {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private focusSetter = useFocusable<this>()(this);

  // #endregion

  // #region Public Properties

  /**
   * When `true`, the component is highlighted.
   *
   * @public
   */
  @property({ reflect: true }) active = false;

  /**
   * Specifies the full name of the user.
   *
   * @public
   */
  @property() fullName?: string;

  /**
   * @public
   * @copyDoc
   */
  @property() label?: string;

  /**
   * When `true`, hides the `fullName` and `username` contents.
   *
   * @public
   */
  @property({ reflect: true }) textDisabled = false;

  /**
   * Specifies the size of the component inherited from `calcite-navigation`, defaults to `m`.
   * @internal
   */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the `src` to an image (remember to add a token if the user is private).
   *
   * @public
   */
  @property() thumbnail?: string;

  /**
   * Specifies the unique id of the user.
   *
   * @public
   */
  @property() userId?: string;

  /**
   * Specifies the username of the user.
   *
   * @public
   */
  @property() username?: string;

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component.
   *
   * @public
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.el, options);
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <button ariaLabel={this.label} class={CSS.button}>
        <calcite-avatar
          fullName={this.fullName}
          label={this.label}
          scale={this.scale}
          thumbnail={this.thumbnail}
          userId={this.userId}
          username={this.username}
        />
        {(this.fullName || this.username) && !this.textDisabled && (
          <div class={CSS.textContainer}>
            {this.fullName && (
              <span
                class={{
                  [CSS.fullName]: true,
                  [CSS.standalone]: !this.username,
                }}
                key={CSS.fullName}
              >
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
