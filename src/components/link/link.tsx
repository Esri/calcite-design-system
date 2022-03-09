import { Component, Element, h, Host, Method, Prop, VNode } from "@stencil/core";
import { focusElement, getElementDir } from "../../utils/dom";
import { FlipContext } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/** Any attributes placed on <calcite-link> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a span. Role will be set to link, or link, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission */

/** @slot - A slot for adding text. */
@Component({
  tag: "calcite-link",
  styleUrl: "link.scss",
  shadow: true
})
export class Link implements InteractiveComponent {
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
  @Prop({ reflect: true }) disabled = false;

  /** Prompts the user to save the linked URL instead of navigating to it. Can be used with or without a value:
   * Without a value, the browser will suggest a filename/extension
   * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download
   */
  @Prop({ reflect: true }) download: string | boolean = false;

  /** optionally pass a href - used to determine if the component should render as a link or an anchor */
  @Prop({ reflect: true }) href?: string;

  /** optionally pass an icon to display at the end of a button - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconEnd?: string;

  /** flip the icon(s) in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: FlipContext;

  /** optionally pass an icon to display at the start of a button - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconStart?: string;

  /** The rel attribute to apply to the hyperlink */
  @Prop() rel?: string;

  /** The target attribute to apply to the hyperlink */
  @Prop() target?: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    const { download, el } = this;
    const dir = getElementDir(el);
    const childElType = this.href ? "a" : "span";
    const iconStartEl = (
      <calcite-icon
        class="calcite-link--icon icon-start"
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale="s"
      />
    );

    const iconEndEl = (
      <calcite-icon
        class="calcite-link--icon icon-end"
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale="s"
      />
    );

    const Tag = childElType;
    const role = childElType === "span" ? "link" : null;
    const tabIndex = childElType === "span" ? 0 : null;

    return (
      <Host role="presentation">
        <Tag
          class={{ [CSS_UTILITY.rtl]: dir === "rtl" }}
          /*
          When the 'download' property of type 'boolean | string' is set to true, the value is "".
          This works around that issue for now.
          */
          download={Tag === "a" && (download === "" || download) ? download : null}
          href={Tag === "a" && this.href}
          ref={this.storeTagRef}
          rel={Tag === "a" && this.rel}
          role={role}
          tabIndex={tabIndex}
          target={Tag === "a" && this.target}
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

  /** Sets focus on the component. */
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private storeTagRef = (el: Link["childEl"]): void => {
    this.childEl = el;
  };
}
