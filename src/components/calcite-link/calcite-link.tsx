import { Component, Element, h, Host, Method, Prop, VNode } from "@stencil/core";
import { focusElement, getElementDir } from "../../utils/dom";

/** @slot default text slot for link text */

/** Any attributes placed on <calcite-link> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a span. Role will be set to link, or link, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission */

@Component({
  tag: "calcite-link",
  styleUrl: "calcite-link.scss",
  shadow: true
})
export class CalciteLink {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteLinkElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** is the link disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  /** optionally pass a href - used to determine if the component should render as a link or an anchor */
  @Prop({ reflect: true }) href?: string;

  /** optionally pass an icon to display at the end of a button - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconEnd?: string;

  /** flip the icon(s) in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: "both" | "start" | "end";

  /** optionally pass an icon to display at the start of a button - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconStart?: string;

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** Allows the text to be selectable */
  @Prop({ reflect: true }) userSelect = true;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.childElType = this.href ? "a" : "span";
  }

  render(): VNode {
    const dir = getElementDir(this.el);

    const iconStartEl = (
      <calcite-icon
        class="calcite-link--icon icon-start"
        dir={dir}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale="s"
      />
    );

    const iconEndEl = (
      <calcite-icon
        class="calcite-link--icon icon-end"
        dir={dir}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale="s"
      />
    );

    const attributes = this.getAttributes();
    const Tag = this.childElType;
    const role = this.childElType === "span" ? "link" : null;
    const tabIndex = this.disabled ? -1 : this.childElType === "span" ? 0 : null;

    return (
      <Host dir={dir} role="presentation">
        <Tag
          {...attributes}
          href={Tag === "a" && this.href}
          ref={this.storeTagRef}
          role={role}
          tabIndex={tabIndex}
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
  async setFocus(): Promise<void> {
    focusElement(this.childEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** the rendered child element */
  private childEl: HTMLAnchorElement | HTMLSpanElement;

  /** the node type of the rendered child element */
  private childElType: "a" | "span" = "span";

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getAttributes(): Record<string, any> {
    // spread attributes from the component to rendered child, filtering out props
    const props = ["dir", "icon-end", "icon-start", "id", "theme", "user-select"];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  private storeTagRef = (el: CalciteLink["childEl"]): void => {
    this.childEl = el;
  };
}
