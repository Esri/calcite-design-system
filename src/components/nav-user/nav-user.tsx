import { Component, Element, h, Host, Prop } from "@stencil/core";
import { CSS } from "./resources";

@Component({
  tag: "calcite-nav-user",
  styleUrl: "nav-user.scss",
  shadow: true
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
  @Prop({ reflect: true }) active?;

  /** Specifies the `src` to an image to display in the Avatar (remember to add a token if the user is private). */
  @Prop({ reflect: true }) thumbnail?;

  /** Specifies the subtext to display, for example a user organization or role */
  @Prop({ reflect: true }) username?: string;

  /** Specifies the text to display, for example a user name or full name */
  @Prop({ reflect: true }) fullName?: string;

  /** When `true`, makes `fullName` and `username` visible */
  @Prop({ reflect: true }) textEnabled?: boolean;

  /** Specifies the unique id of the user. */
  @Prop({ reflect: true }) userId: string;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <a tabIndex={0}>
          <calcite-avatar
            full-name={this.fullName ? this.fullName : null}
            thumbnail={this.thumbnail ? this.thumbnail : null}
            user-id={this.userId ? this.userId : null}
          />

          {(this.fullName || this.username) && this.textEnabled && (
            <div class={CSS.textContainer}>
              {this.fullName && this.textEnabled ? (
                <span class={CSS.userFullName}>{this.fullName}</span>
              ) : null}
              {this.username && this.textEnabled ? (
                <span class={CSS.userUsername}>{this.username}</span>
              ) : null}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
