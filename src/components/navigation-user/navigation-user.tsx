import { Component, Element, h, Host, Prop, VNode } from "@stencil/core";
import { CSS } from "./resources";

@Component({
  tag: "calcite-navigation-user",
  styleUrl: "navigation-user.scss",
  shadow: {
    delegatesFocus: true
  }
})
export class CalciteNavigationUser {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteNavigationUserElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** When true, the component is highlighted.*/
  @Prop({ reflect: true }) active: boolean;

  /** Specifies the text to display, such as a username or full name.*/
  @Prop() fullName: string;

  /** Describes the appearance of the avatar. If no label is provided, context will not be provided to assistive technologies.*/
  @Prop() label: string;

  /** When `true`, hides the `fullName` and `username` contents.*/
  @Prop({ reflect: true }) textDisabled = false;

  /** Specifies the `src` to an image to display in the Avatar.*/
  @Prop() thumbnail: string;

  /** Specifies the unique id of the user.*/
  @Prop() userId: string;

  /** Specifies the username of the user.*/
  @Prop() username: string;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <a tabindex={0}>
          <calcite-avatar
            full-name={this.fullName}
            label={this.label}
            thumbnail={this.thumbnail}
            user-id={this.userId}
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
        </a>
      </Host>
    );
  }
}
