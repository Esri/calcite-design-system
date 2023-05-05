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
  /** When true, the component is highlighted. */
  @Prop({ reflect: true }) active: boolean;

  /** Specifies the text to display, such as a username or full name. */
  @Prop() fullName: string;

  /** Describes the appearance of the avatar. If no label is provided, context will not be provided to assistive technologies. */
  @Prop() label: string;

  /** Specifies the unique id of the user. */
  @Prop() userId: string;

  /** Specifies the username of the user. */
  @Prop() username: string;

  /** When `true`, hides the `fullName` and `username` contents. */
  @Prop({ reflect: true }) textDisabled = false;

  /** Specifies the `src` to an image to display in the Avatar (remember to add a token if the user is private). */
  @Prop() thumbnail: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Emits when the component's selection changes. */
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
        <a onClick={this.clickHandler} onKeyDown={this.keyDownHandler} tabIndex={0}>
          <calcite-avatar
            full-name={this.fullName}
            label={this.label}
            thumbnail={this.thumbnail}
            user-id={this.userId}
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
        </a>
      </Host>
    );
  }
}
