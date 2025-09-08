// @ts-strict-ignore
import { h, Fragment, JsxNode, LitElement, method, property } from "@arcgis/lumina";
import { Heading, HeadingLevel } from "../functional/Heading";
import { IconNameOrString } from "../icon/interfaces";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS } from "./resources";
import { styles } from "./navigation-logo.scss";

declare global {
  interface DeclareElements {
    "calcite-navigation-logo": NavigationLogo;
  }
}

export class NavigationLogo extends LitElement {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** When present, the component is highlighted. */
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

  /** When present, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
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

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      if (this.href) {
        return this.el;
      }
    }, options);
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
      <div class={CSS.textContainer} key={CSS.textContainer}>
        {headingNode}
        {descriptionNode}
      </div>
    ) : null;
  }

  override render(): JsxNode {
    const { icon, href, label, rel, target, thumbnail } = this;
    const content = (
      <>
        {thumbnail && <img alt={label || ""} class={CSS.image} src={thumbnail} />}
        {icon && this.renderIcon()}
        {this.renderHeaderContent()}
      </>
    );

    return href ? (
      <a
        class={{
          [CSS.container]: true,
          [CSS.containerLink]: true,
        }}
        href={href}
        rel={rel}
        target={target}
      >
        {content}
      </a>
    ) : (
      <div class={CSS.container}>{content}</div>
    );
  }

  // #endregion
}
