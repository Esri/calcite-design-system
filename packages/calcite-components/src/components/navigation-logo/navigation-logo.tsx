import { LitElement, property, h, method, JsxNode } from "@arcgis/lumina";
import {
  LoadableComponent,
  componentFocusable,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { Heading, HeadingLevel } from "../functional/Heading";
import { IconNameOrString } from "../icon/interfaces";
import { CSS } from "./resources";
import { styles } from "./navigation-logo.scss";

declare global {
  interface DeclareElements {
    "calcite-navigation-logo": NavigationLogo;
  }
}

export class NavigationLogo extends LitElement implements LoadableComponent {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** When `true`, the component is highlighted. */
  @property({ reflect: true }) active: boolean;

  /** A description for the component, which displays below the `heading`. */
  @property() description: string;

  /** Specifies heading text for the component, such as a product or organization name. */
  @property() heading: string;

  /** Specifies the heading level of the component's heading for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Specifies the URL destination of the component, which can be set as an absolute or relative path. */
  @property({ reflect: true }) href: string;

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Describes the appearance or function of the `thumbnail`. If no label is provided, context will not be provided to assistive technologies. */
  @property() label: string;

  /**
   * Defines the relationship between the `href` value and the current document.
   *
   * @mdn [rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @property({ reflect: true }) rel: string;

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @mdn [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @property({ reflect: true }) target: string;

  /** Specifies the `src` to an image. */
  @property() thumbnail: string;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    if (this.href) {
      this.el.focus();
    }
  }

  // #endregion

  // #region Lifecycle

  load(): void {
    setUpLoadableComponent(this);
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  // #endregion

  // #region Rendering

  private renderIcon(): JsxNode {
    /** Icon scale is not variable as the component does not have a scale property */
    return <calcite-icon class={CSS.icon} flipRtl={this.iconFlipRtl} icon={this.icon} scale="l" />;
  }

  private renderHeaderContent(): JsxNode {
    const { heading, headingLevel, description } = this;
    const headingNode = heading ? (
      <Heading
        class={{
          [CSS.heading]: true,
          [CSS.standalone]: !this.description,
        }}
        key={CSS.heading}
        level={headingLevel}
      >
        {heading}
      </Heading>
    ) : null;

    const descriptionNode = description ? (
      <span class={CSS.description} key={CSS.description}>
        {description}
      </span>
    ) : null;

    return headingNode || descriptionNode ? (
      <div class={CSS.container} key={CSS.container}>
        {headingNode}
        {descriptionNode}
      </div>
    ) : null;
  }

  override render(): JsxNode {
    const { thumbnail } = this;
    return (
      <a class={CSS.anchor} href={this.href} rel={this.rel} target={this.target}>
        {thumbnail && <img alt={this.label || ""} class={CSS.image} src={thumbnail} />}
        {this.icon && this.renderIcon()}
        {this.renderHeaderContent()}
      </a>
    );
  }

  // #endregion
}
