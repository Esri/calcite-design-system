import { Component, Element, h, Host, Prop, VNode, Method } from "@stencil/core";
import { CSS } from "./resources";
import {
  LoadableComponent,
  componentFocusable,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";

@Component({
  tag: "calcite-navigation-user",
  styleUrl: "navigation-user.scss",
  shadow: {
    delegatesFocus: true,
  },
})
export class CalciteNavigationUser implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, the component is highlighted.*/
  @Prop({ reflect: true }) active: boolean;

  /** Specifies the full name of the user.*/
  @Prop() fullName: string;

  /** Describes the appearance of the avatar. If no label is provided, context will not be provided to assistive technologies.*/
  @Prop() label: string;

  /** When `true`, hides the `fullName` and `username` contents.*/
  @Prop({ reflect: true }) textDisabled = false;

  /** Specifies the `src` to an image (remember to add a token if the user is private).*/
  @Prop() thumbnail: string;

  /** Specifies the unique id of the user.*/
  @Prop() userId: string;

  /** Specifies the username of the user.*/
  @Prop() username: string;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.el.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteNavigationUserElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <button aria-label={this.label} class={CSS.button}>
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
        </button>
      </Host>
    );
  }
}
