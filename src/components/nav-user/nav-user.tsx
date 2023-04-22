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

  /** Specifies the `src` to an image (remember to add a token if the user is private). */
  @Prop({ reflect: true }) thumbnail?;

  /** Specifies the subtext to display, for example a user organization or role */
  @Prop({ reflect: true }) username?: string;

  /** Specifies the text to display, for example a user name or full name */
  @Prop({ reflect: true }) fullName?: string;

  /** When `true`, makes `fullName` and `username` visible */
  @Prop({ reflect: true }) textEnabled?: boolean;

  /** When `true`, displays a `calcite-avatar`. */
  @Prop({ reflect: true }) avatarEnabled?: boolean;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <a tabIndex={0}>
          {this.avatarEnabled ? (
            <calcite-avatar
              full-name={this.fullName}
              thumbnail={this.thumbnail ? this.thumbnail : null}
            />
          ) : null}
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
