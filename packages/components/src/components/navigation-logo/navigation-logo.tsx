import { h, Fragment, JsxNode, LitElement, method, property } from "@arcgis/lumina";
import { Heading, HeadingLevel } from "../functional/Heading";
import { IconName } from "../icon/interfaces";
import { useSetFocus } from "../../controllers/useSetFocus";
import { Scale } from "../interfaces";
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

  /** When `true`, the component is highlighted. */
  @property({ reflect: true }) active: boolean;

  /** Specifies a description for the component. Displays below the `heading`. */
  @property() description: string;

  /** Specifies the component's heading text. */
  @property() heading: string;

  /** @copyDoc */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Specifies the URL destination of the component, which can be set as an absolute or relative path. */
  @property({ reflect: true }) href: string;

  /** Specifies an icon to display. */
  @property({ reflect: true, type: String }) icon: IconName;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** @copyDoc */
  @property() label: string;

  /**
   * Defines the relationship between the `href` value and the current document.
   *
   * @see [MDN - rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @property({ reflect: true }) rel: string;

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @see [MDN - target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @property({ reflect: true }) target: string;

  /** Specifies the `src` to an image. */
  @property() thumbnail: string;

  /**
   * Specifies the size of the component inherited from `calcite-navigation`, defaults to `m`.
   *
   * @private
   */
  @property({ reflect: true }) scale: Scale = "m";

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => (this.href ? this.el : undefined), options);
  }

  // #endregion

  // #region Rendering

  private renderIcon(): JsxNode {
    return (
      <calcite-icon
        class={CSS.icon}
        flipRtl={this.iconFlipRtl}
        icon={this.icon}
        scale={this.scale === "s" ? "m" : "l"}
      />
    );
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
