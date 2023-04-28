import { Component, Element, h, Host, Prop, Event, EventEmitter } from "@stencil/core";
import { CSS } from "./resources";

@Component({
  tag: "calcite-nav-user",
  styleUrl: "nav-user.scss",
  shadow: {
    delegatesFocus: true
  }
})
export class CalciteNavUser {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteNavUserElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** When `true`, visually highlight the component */
  @Prop({ reflect: true }) active: boolean;

  /** Specifies the text to display, for example a user name or full name */
  @Prop() fullName: string;

  /** Specifies accesible label for the component */
  @Prop() label: string;

  /** Specifies the unique id of the user. */
  @Prop() userId: string;

  /** Specifies the subtext to display, for example a user organization or role */
  @Prop() username: string;

  /** When `true`, hides the `fullName` and `username`. */
  @Prop({ reflect: true }) hideText = false;

  /** Specifies the `src` to an image to display in the Avatar (remember to add a token if the user is private). */
  @Prop({ reflect: true }) thumbnail: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Emits when user select the component. */
  @Event() calciteNavUserSelect: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private clickHandler = (): void => {
    this.calciteNavUserSelect.emit();
  };

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Enter" || event.key === " ") {
      this.calciteNavUserSelect.emit();
      event.preventDefault();
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <a
          aria-label={this.label}
          onClick={this.clickHandler}
          onKeyDown={this.keyDownHandler}
          tabIndex={0}
        >
          <calcite-avatar
            full-name={this.fullName ? this.fullName : null}
            thumbnail={this.thumbnail ? this.thumbnail : null}
            user-id={this.userId ? this.userId : null}
          />

          {(this.fullName || this.username) && !this.hideText && (
            <div class={CSS.textContainer}>
              {this.fullName && !this.hideText ? (
                <span class={CSS.fullName} key={CSS.fullName}>
                  {this.fullName}
                </span>
              ) : null}
              {this.username && !this.hideText ? (
                <span class={CSS.username} key={CSS.username}>
                  {this.username}
                </span>
              ) : null}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
