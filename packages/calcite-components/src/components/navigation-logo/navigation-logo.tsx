import { Component, Element, h, Host, Prop, VNode, Method } from "@stencil/core";
import { CSS } from "./resources";
import {
  LoadableComponent,
  componentFocusable,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";

@Component({
  tag: "calcite-navigation-logo",
  styleUrl: "navigation-logo.scss",
  shadow: {
    delegatesFocus: true,
  },
})
export class CalciteNavigationLogo implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When true, the component is highlighted. */
  @Prop({ reflect: true }) active: boolean;

  /** Specifies the URL destination of the component, which can be set as an absolute or relative path.*/
  @Prop({ reflect: true }) href: string;

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon: string;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Describes the appearance or function of the `thumbnail`. If no label is provided, context will not be provided to assistive technologies. */
  @Prop() label: string;

  /**
   * Defines the relationship between the `href` value and the current document.
   *
   * @mdn [rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @Prop({ reflect: true }) rel: string;

  /** A description for the component, which displays below the `heading`.*/
  @Prop() description: string;

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @mdn [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @Prop({ reflect: true }) target: string;

  /** Specifies heading text for the component, such as a product or organization name.*/
  @Prop() heading: string;

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
    await componentFocusable(this);
    if (this.href) {
      this.el.focus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteNavigationLogoElement;

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

  private renderIcon(): VNode {
    return <calcite-icon class={CSS.icon} flipRtl={this.iconFlipRtl} icon={this.icon} scale="l" />;
  }

  render(): VNode {
    const { heading, description, thumbnail } = this;
    return (
      <Host>
        <a class={CSS.anchor} href={this.href} rel={this.rel} target={this.target}>
          {thumbnail && <img alt={this.label || ""} class={CSS.image} src={thumbnail} />}
          {this.icon && this.renderIcon()}
          {(heading || description) && (
            <div class={CSS.container}>
              {heading && (
                <span
                  aria-label={this.heading}
                  class={{
                    [CSS.heading]: true,
                    [CSS.standalone]: !this.description,
                  }}
                  key={CSS.heading}
                >
                  {heading}
                </span>
              )}
              {description && (
                <span aria-label={this.description} class={CSS.description} key={CSS.description}>
                  {description}
                </span>
              )}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
