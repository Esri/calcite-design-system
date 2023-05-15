import { Component, Element, h, Host, Prop, VNode } from "@stencil/core";
import { CSS } from "./resources";

@Component({
  tag: "calcite-navigation-logo",
  styleUrl: "navigation-logo.scss",
  shadow: {
    delegatesFocus: true
  }
})
export class CalciteNavigationLogo {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteNavigationLogoElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** When true, the component is highlighted. */
  @Prop({ reflect: true }) active: boolean;

  /** Specifies the URL destination of the component, which can be set as an absolute or relative path.*/
  @Prop({ reflect: true }) href: string;

  /** Describes the appearance or function of the `thumbnail`. If no label is provided, context will not be provided to assistive technologies. */
  @Prop() label: string;

  /** Specifies the subtext to display, such as an organization or application description. */
  @Prop() subtext: string;

  /** Specifies the text to display, such as a product name.*/
  @Prop() text: string;

  /** When `true`, displays the `text` and `subText` contents. */
  @Prop({ reflect: true }) textEnabled: boolean;

  /** Specifies the `src` to an image. */
  @Prop() thumbnail: string;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render(): VNode {
    return (
      <Host>
        <a href={this.href} tabIndex={0}>
          {this.thumbnail && <img alt={this.label || ""} src={this.thumbnail} />}
          {(this.text || this.subtext) && this.textEnabled && (
            <div class={CSS.textContainer}>
              {this.text && (
                <span class={CSS.logoText} key={CSS.logoText}>
                  {this.text}
                </span>
              )}
              {this.subtext && (
                <span class={CSS.logoSubtext} key={CSS.logoSubtext}>
                  {this.subtext}
                </span>
              )}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
