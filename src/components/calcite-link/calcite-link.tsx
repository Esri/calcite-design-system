import { Component, Element, h, Host, Method, Prop } from "@stencil/core";
import { getElementDir } from "../../utils/dom";

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
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark";

  /** optionally pass a href - used to determine if the component should render as a link or an anchor */
  @Prop({ reflect: true }) href?: string;

  /** optionally pass an icon to display at the start of a button - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconStart?: string;

  /** optionally pass an icon to display at the end of a button - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconEnd?: string;

  /** is the link disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations

    let color = ["blue", "red", "dark", "light"];
    if (!color.includes(this.color)) this.color = "blue";

    this.childElType = this.href ? "a" : "span";
  }

  render() {
    const dir = getElementDir(this.el);
    const attributes = this.getAttributes();
    const Tag = this.childElType;
    const role = this.childElType === "span" ? "link" : null;
    const tabIndex = this.disabled
      ? -1
      : this.childElType === "span"
      ? 0
      : null;

    const iconStartEl = (
      <calcite-icon
        class="calcite-link--icon icon-start"
        icon={this.iconStart}
        scale="s"
      />
    );

    const iconEndEl = (
      <calcite-icon
        class="calcite-link--icon icon-end"
        icon={this.iconEnd}
        scale="s"
      />
    );

    return (
      <Host dir={dir}>
        <Tag
          {...attributes}
          role={role}
          tabIndex={tabIndex}
          ref={(el) => (this.childEl = el)}
        >
          {this.iconStart ? iconStartEl : null}
          <slot />
          {this.iconEnd ? iconEndEl : null}
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
