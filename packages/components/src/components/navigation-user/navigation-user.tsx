import { LitElement, property, h, method, JsxNode, state } from "@arcgis/lumina";
import { useFocusable } from "../../controllers/useFocusable";
import { Scale } from "../types";
import { CSS, SLOTS } from "./resources";
import { styles } from "./navigation-user.scss";
import { slotChangeHasAssignedElement } from "../../utils/dom";

declare global {
  interface DeclareElements {
    "calcite-navigation-user": NavigationUser;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * When `active`, specifies the component's border color.
     */
    "--calcite-navigation-accent-color": "*";
    /**
     * Specifies the component's avatar corner radius.
     */
    "--calcite-navigation-user-avatar-corner-radius": "*";
    /**
     * Specifies the component's avatar icon color.
     */
    "--calcite-navigation-user-avatar-color": "*";
    /**
     * Specifies the component's background color.
     */
    "--calcite-navigation-background-color": "*";
    /**
     * Specifies the component's `fullName` text color.
     */
    "--calcite-navigation-user-full-name-text-color": "*";
    /**
     * Specifies the component's `username` text color.
     */
    "--calcite-navigation-user-name-text-color": "*";
  }
}

export class NavigationUser extends LitElement {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private focusSetter = useFocusable<this>()(this);

  private handleFullNameSlotChange = (event: Event): void => {
    this.hasFullName = slotChangeHasAssignedElement(event);
  };

  private handleUsernameSlotChange = (event: Event): void => {
    this.hasUsername = slotChangeHasAssignedElement(event);
  };

  //#endregion

  //#region State Properties

  @state() hasFullName = false;

  @state() hasUsername = false;

  //#endregion

  //#region Public Properties

  /** When `true`, the component is highlighted. */
  @property({ reflect: true }) active = false;

  /** Specifies the full name of the user. */
  @property() fullName?: string;

  /** @copyDoc */
  @property() label?: string;

  /** When `true`, hides the `fullName` and `username` contents. */
  @property({ reflect: true }) textDisabled = false;

  /**
   * Specifies the size of the component inherited from `calcite-navigation`, defaults to `m`.
   *
   * @private
   */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the `src` to an image (remember to add a token if the user is private). */
  @property() thumbnail?: string;

  /** Specifies the unique id of the user. */
  @property() userId?: string;

  /** Specifies the username of the user. */
  @property() username?: string;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.el, options);
  }

  //#endregion

  //#region Rendering

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
        {!this.textDisabled && (
          <div class={CSS.textContainer}>
            <span
              class={{
                [CSS.fullName]: true,
                [CSS.standalone]: !this.username,
              }}
              hidden={!this.fullName && !this.hasFullName}
              key={CSS.fullName}
            >
              {this.fullName || (
                <slot name={SLOTS.fullName} onSlotChange={this.handleFullNameSlotChange} />
              )}
            </span>
            <span
              class={CSS.username}
              hidden={!this.username && !this.hasUsername}
              key={CSS.username}
            >
              {this.username || (
                <slot name={SLOTS.username} onSlotChange={this.handleUsernameSlotChange} />
              )}
            </span>
          </div>
        )}
      </button>
    );
  }

  //#endregion
}
