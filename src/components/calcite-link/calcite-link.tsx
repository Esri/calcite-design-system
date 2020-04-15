import { Component, Element, h, Host, Method, Prop } from "@stencil/core";
import { getElementDir, getElementTheme } from "../../utils/dom";

@Component({
  tag: "calcite-link",
  styleUrl: "calcite-link.scss",
  shadow: true,
})

/** @slot default text slot for link text */

/** Any attributes placed on <calcite-link> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a span. Role will be set to link, or link, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission */
export class CalciteLink {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** specify the color of the link, defaults to blue */
  @Prop({ mutable: true, reflect: true }) color:
    | "blue"
    | "dark"
    | "light"
    | "red" = "blue";

  /** Select theme (light or dark) */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** optionally pass a href - used to determine if the component should render as a link or an anchor */
  @Prop({ reflect: true }) href?: string;

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  /** optionally used with icon, select where to position the icon */
  @Prop({ reflect: true, mutable: true }) iconPosition?: "start" | "end" =
    "start";

  /** is the link disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    let theme = ["light", "dark"];
    if (!theme.includes(this.theme)) this.theme = "light";

    let color = ["blue", "red", "dark", "light"];
    if (!color.includes(this.color)) this.color = "blue";

    let iconPosition = ["start", "end"];
    if (this.icon !== null && !iconPosition.includes(this.iconPosition))
      this.iconPosition = "start";

    this.childElType = this.href ? "a" : "span";
  }

  render() {
    const dir = getElementDir(this.el);
    const theme = getElementTheme(this.el);
    const attributes = this.getAttributes();
    const Tag = this.childElType;
    const role = this.childElType === "span" ? "link" : null;
    const tabIndex = this.childElType === "span" ? 0 : null;

    const iconEl = (
      <calcite-icon class="calcite-link--icon" icon={this.icon} scale="s" />
    );

    return (
      <Host dir={dir} theme={theme}>
        <Tag
          {...attributes}
          role={role}
          tabindex={tabIndex}
          ref={(el) => (this.childEl = el)}
        >
          {this.icon && this.iconPosition === "start" ? iconEl : null}
          <slot />
          {this.icon && this.iconPosition === "end" ? iconEl : null}
        </Tag>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus() {
    this.childEl.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** the rendered child element */
  private childEl?: HTMLElement;

  /** the node type of the rendered child element */
  private childElType?: "a" | "span" = "span";

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = ["color", "dir", "icon", "iconPosition", "id", "theme"];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }
}
