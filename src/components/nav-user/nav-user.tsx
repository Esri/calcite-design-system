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
  @Prop({ reflect: true }) active: boolean;

  /** Specifies the `src` to an image to display in the Avatar (remember to add a token if the user is private). */
  @Prop({ reflect: true }) thumbnail: string;

  /** Specifies the subtext to display, for example a user organization or role */
  @Prop({ reflect: true }) username: string;

  /** Specifies the text to display, for example a user name or full name */
  @Prop({ reflect: true }) fullName: string;

  /** Specifies accesible label for the component */
  @Prop({ reflect: true }) label: string;

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
        <a aria-label={this.label || this.fullName || this.username} tabIndex={0}>
          <calcite-avatar
            full-name={this.fullName ? this.fullName : null}
            thumbnail={this.thumbnail ? this.thumbnail : null}
            user-id={this.userId ? this.userId : null}
          />

          {(this.fullName || this.username) && (
            <div class={CSS.textContainer}>
              {!!this.fullName ? <span class={CSS.userFullName}>{this.fullName}</span> : null}
              {!!this.username ? <span class={CSS.userUsername}>{this.username}</span> : null}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
