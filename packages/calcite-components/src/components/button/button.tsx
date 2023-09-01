import { Build, Component, Element, h, Method, Prop, State, VNode, Watch } from "@stencil/core";
import { findAssociatedForm, FormOwner, resetForm, submitForm } from "../../utils/form";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Appearance, FlipContext, Kind, Scale, Width } from "../interfaces";
import { ButtonMessages } from "./assets/button/t9n";
import { ButtonAlignment } from "./interfaces";
import { CSS } from "./resources";

/** Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any button attributes for form submission */

/** @slot - A slot for adding text. */
@Component({
  tag: "calcite-button",
  styleUrl: "button.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Button
  implements
    LabelableComponent,
    InteractiveComponent,
    FormOwner,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the alignment of the component's elements. */
  @Prop({ reflect: true }) alignment: ButtonAlignment = "center";

  /** Specifies the appearance style of the component. */
  @Prop({ reflect: true }) appearance: Extract<
    "outline" | "outline-fill" | "solid" | "transparent",
    Appearance
  > = "solid";

  /** Accessible name for the component. */
  @Prop() label: string;

  /** Specifies the kind of the component (will apply to border and background if applicable). */
  @Prop({ reflect: true }) kind: Extract<"brand" | "danger" | "inverse" | "neutral", Kind> =
    "brand";

  /**  When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true })
  form: string;

  /**
   * Specifies the URL of the linked resource, which can be set as an absolute or relative path.
   */
  @Prop({ reflect: true }) href: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /**
   * When `true`, a busy indicator is displayed and interaction is disabled.
   */
  @Prop({ reflect: true }) loading = false;

  /** Specifies the name of the component on form submission. */
  @Prop({ reflect: true }) name?: string;

  /**
   * Defines the relationship between the `href` value and the current document.
   *
   * @mdn [rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @Prop({ reflect: true }) rel: string;

  /** When `true`, adds a round style to the component. */
  @Prop({ reflect: true }) round = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies if the component is a child of a `calcite-split-button`. */
  @Prop({ reflect: true }) splitChild: "primary" | "secondary" | false = false;

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @mdn [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @Prop({ reflect: true }) target: string;

  /**
   * Specifies the default behavior of the button.
   *
   * @mdn [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)
   */
  @Prop({ reflect: true }) type = "button";

  /** Specifies the width of the component. */
  @Prop({ reflect: true }) width: Width = "auto";

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ButtonMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ButtonMessages>;

  @Watch("loading")
  loadingChanged(newValue: boolean, oldValue: boolean): void {
    if (!!newValue && !oldValue) {
      this.hasLoader = true;
    }
    if (!newValue && !!oldValue) {
      window.setTimeout(() => {
        this.hasLoader = false;
      }, 300);
    }
  }

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /** referred in t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async connectedCallback(): Promise<void> {
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
    this.hasLoader = this.loading;
    this.setupTextContentObserver();
    connectLabel(this);
    this.formEl = findAssociatedForm(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    disconnectInteractive(this);
    disconnectLabel(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
    this.formEl = null;
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    if (Build.isBrowser) {
      this.updateHasContent();
      await setUpMessages(this);
    }
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.setTooltipText();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
    // if (!this.href) {
    // const ariaExpanded = this.el?.getAttribute("aria-expanded");
    // const ariaControls = this.el?.getAttribute("aria-controls");
    // this.childEl.setAttribute("aria-expanded", ariaExpanded !== null ? ariaExpanded : undefined);
    // if (ariaControls) {
    //   this.childEl.setAttribute("aria-controls", ariaControls);
    // } else {
    //   this.childEl.removeAttribute("aria-controls");
    // }
    // }
  }

  render(): VNode {
    const childElType = this.href ? "a" : "button";
    const Tag = childElType;
    const loaderNode = this.hasLoader ? (
      <div class={CSS.buttonLoader}>
        <calcite-loader
          class={this.loading ? CSS.loadingIn : CSS.loadingOut}
          inline
          label={this.messages.loading}
          scale={this.scale === "l" ? "m" : "s"}
        />
      </div>
    ) : null;
    const noStartEndIcons = !this.iconStart && !this.iconEnd;

    const iconStartEl = (
      <calcite-icon
        class={{ [CSS.icon]: true, [CSS.iconStart]: true }}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={this.scale === "l" ? "m" : "s"}
      />
    );

    const iconEndEl = (
      <calcite-icon
        class={{ [CSS.icon]: true, [CSS.iconEnd]: true }}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale={this.scale === "l" ? "m" : "s"}
      />
    );

    const contentEl = (
      <span class={CSS.content} ref={(el) => (this.contentEl = el)}>
        <slot />
      </span>
    );

    return (
      <Tag
        aria-label={!this.loading ? getLabelText(this) : this.messages.loading}
        aria-live="polite"
        class={{
          [CSS.buttonPadding]: noStartEndIcons,
          [CSS.buttonPaddingShrunk]: !noStartEndIcons,
          [CSS.contentSlotted]: this.hasContent,
          [CSS.iconStartEmpty]: !this.iconStart,
          [CSS.iconEndEmpty]: !this.iconEnd,
        }}
        disabled={this.disabled || this.loading}
        href={childElType === "a" && this.href}
        name={childElType === "button" && this.name}
        onClick={this.handleClick}
        ref={this.setChildEl}
        rel={childElType === "a" && this.rel}
        tabIndex={this.disabled || this.loading ? -1 : null}
        target={childElType === "a" && this.target}
        title={this.tooltipText}
        type={childElType === "button" && this.type}
      >
        {loaderNode}
        {this.iconStart ? iconStartEl : null}
        {this.hasContent ? contentEl : null}
        {this.iconEnd ? iconEndEl : null}
      </Tag>
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
    await componentFocusable(this);

    this.childEl?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteButtonElement;

  formEl: HTMLFormElement;

  labelEl: HTMLCalciteLabelElement;

  /** watches for changing text content */
  private mutationObserver = createObserver("mutation", () => this.updateHasContent());

  /** the rendered child element */
  private childEl?: HTMLElement;

  /** determine if there is slotted content for styling purposes */
  @State() private hasContent = false;

  /** determine if loader present for styling purposes */
  @State() private hasLoader = false;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: ButtonMessages;

  private updateHasContent() {
    const slottedContent = this.el.textContent.trim().length > 0 || this.el.childNodes.length > 0;
    this.hasContent =
      this.el.childNodes.length === 1 && this.el.childNodes[0]?.nodeName === "#text"
        ? this.el.textContent?.trim().length > 0
        : slottedContent;
  }

  private setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  /** keeps track of the tooltipText */
  @State() tooltipText: string;

  /** keep track of the rendered contentEl */
  private contentEl: HTMLSpanElement;

  resizeObserver = createObserver("resize", () => this.setTooltipText());

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onLabelClick(): void {
    this.handleClick();
    this.setFocus();
  }

  // act on a requested or nearby form based on type
  private handleClick = (): void => {
    const { type } = this;

    if (this.href) {
      return;
    }

    // this.type refers to type attribute, not child element type
    if (type === "submit") {
      submitForm(this);
    } else if (type === "reset") {
      resetForm(this);
    }
  };

  private setTooltipText = (): void => {
    const { contentEl } = this;
    if (contentEl) {
      this.tooltipText = contentEl.offsetWidth < contentEl.scrollWidth ? this.el.innerText : null;
    }
  };

  private setChildEl = (el: HTMLElement): void => {
    this.childEl = el;

    if (el) {
      this.resizeObserver?.observe(el);
    }
  };
}
