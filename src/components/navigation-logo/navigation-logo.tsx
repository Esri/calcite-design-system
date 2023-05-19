import { Component, Element, h, Host, Prop, VNode, Method } from "@stencil/core";
import { CSS } from "./resources";
import {
  LoadableComponent,
  componentLoaded,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";

@Component({
  tag: "calcite-navigation-logo",
  styleUrl: "navigation-logo.scss",
  shadow: {
    delegatesFocus: true
  }
})
export class CalciteNavigationLogo implements LoadableComponent {
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
  @Prop({ reflect: true }) textEnabled = false;

  /** Specifies the `src` to an image. */
  @Prop() thumbnail: string;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);
    this.el.focus();
  }

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
    const { text, subtext, thumbnail } = this;
    return (
      <Host>
        <a href={this.href} tabindex={0}>
          {thumbnail && <img alt={this.label || ""} src={thumbnail} />}
          {(text || subtext) && this.textEnabled && (
            <div class={CSS.textContainer}>
              {text && (
                <span class={CSS.logoText} key={CSS.logoText}>
                  {text}
                </span>
              )}
              {subtext && (
                <span class={CSS.logoSubtext} key={CSS.logoSubtext}>
                  {subtext}
                </span>
              )}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
