import { Component, Element, h, Host, Listen, Method, Prop, VNode } from "@stencil/core";
import { focusElement, getElementDir } from "../../utils/dom";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { CSS_UTILITY } from "../../utils/resources";
import { FlipContext } from "../interfaces";

/** Any attributes placed on <calcite-link> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a span. Role will be set to link, or link, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission */

/** @slot - A slot for adding text. */
@Component({
  tag: "calcite-link",
  styleUrl: "link.scss",
  shadow: true,
})
export class Link implements InteractiveComponent, LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Prompts the user to save the linked URL instead of navigating to it. Can be used with or without a value:
   * Without a value, the browser will suggest a filename/extension
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download.
   */
  @Prop({ reflect: true }) download: string | boolean = false;

  /** Specifies the URL of the linked resource, which can be set as an absolute or relative path. */
  @Prop({ reflect: true }) href: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /** Specifies the relationship to the linked document defined in `href`. */
  @Prop() rel: string;

  /** Specifies the frame or window to open the linked document. */
  @Prop() target: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
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
        <InteractiveContainer disabled={this.disabled}>
          <Tag
            class={{ [CSS_UTILITY.rtl]: dir === "rtl" }}
            /*
          When the 'download' property of type 'boolean | string' is set to true, the value is "".
          This works around that issue for now.
          */
            download={Tag === "a" && (download === "" || download) ? download : null}
            href={Tag === "a" && this.href}
            onClick={this.childElClickHandler}
            rel={Tag === "a" && this.rel}
            role={role}
            tabIndex={tabIndex}
            target={Tag === "a" && this.target}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.storeTagRef}
          >
            {this.iconStart ? iconStartEl : null}
            <slot />
            {this.iconEnd ? iconEndEl : null}
          </Tag>
        </InteractiveContainer>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Listen("click")
  clickHandler(event: PointerEvent): void {
    if (this.disabled) {
      return;
    }

    // forwards the click() to the internal link for non user-initiated events
    if (!event.isTrusted) {
      this.childEl.click();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    focusElement(this.childEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteLinkElement;

  /** the rendered child element */
  private childEl: HTMLAnchorElement | HTMLSpanElement;

  private childElClickHandler = (event: PointerEvent): void => {
    if (!event.isTrusted) {
      // click was invoked internally, we stop it here
      event.stopPropagation();
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private storeTagRef = (el: Link["childEl"]): void => {
    this.childEl = el;
  };
}
