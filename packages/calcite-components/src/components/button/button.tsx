// @ts-strict-ignore
import { isServer } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { literal } from "lit-html/static.js";
import {
  LitElement,
  property,
  h,
  method,
  state,
  JsxNode,
  LuminaJsx,
  stringOrBoolean,
} from "@arcgis/lumina";
import { useWatchAttributes } from "@arcgis/lumina/controllers";
import { findAssociatedForm, FormOwner, resetForm, submitForm } from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { componentFocusable } from "../../utils/component";
import { createObserver } from "../../utils/observers";
import { getIconScale } from "../../utils/component";
import { Appearance, FlipContext, Kind, Scale, Width } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Label } from "../label/label";
import { hasVisibleContent } from "../../utils/dom";
import T9nStrings from "./assets/t9n/messages.en.json";
import { ButtonAlignment } from "./interfaces";
import { CSS } from "./resources";
import { styles } from "./button.scss";

declare global {
  interface DeclareElements {
    "calcite-button": Button;
  }
}

/**
 * Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this.
 *
 * It is the consumers responsibility to add aria information, rel, target, for links, and any button attributes for form submission
 *
 * @slot - A slot for adding text.
 */
export class Button
  extends LitElement
  implements LabelableComponent, InteractiveComponent, FormOwner
{
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  attributeWatch = useWatchAttributes(["aria-expanded"], this.handleGlobalAttributesChanged);

  /** the rendered child element */
  private childEl?: HTMLElement;

  /** keep track of the rendered contentEl */
  private contentEl = createRef<HTMLSpanElement>();

  formEl: HTMLFormElement;

  labelEl: Label["el"];

  /** watches for changing text content */
  private mutationObserver = createObserver("mutation", () => this.updateHasContent());

  private resizeObserver = createObserver("resize", () => this.setTooltipText());

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  //#endregion

  //#region State Properties

  /** determine if there is slotted content for styling purposes */
  @state() private hasContent = false;

  /** keeps track of the tooltipText */
  @state() tooltipText: string;

  //#endregion

  //#region Public Properties

  /** Specifies the alignment of the component's elements. */
  @property({ reflect: true }) alignment: ButtonAlignment = "center";

  /** Specifies the appearance style of the component. */
  @property({ reflect: true }) appearance: Extract<
    "outline" | "outline-fill" | "solid" | "transparent",
    Appearance
  > = "solid";

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Prompts the user to save the linked URL instead of navigating to it. Can be used with or without a value:
   * Without a value, the browser will suggest a filename/extension.
   *
   * @see [Global download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
   */
  @property({ reflect: true, converter: stringOrBoolean }) download: string | boolean = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** Specifies the URL of the linked resource, which can be set as an absolute or relative path. */
  @property({ reflect: true }) href: string;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /** Specifies the kind of the component, which will apply to the border and background if applicable. */
  @property({ reflect: true }) kind: Extract<"brand" | "danger" | "inverse" | "neutral", Kind> =
    "brand";

  /** Accessible name for the component. */
  @property() label: string;

  /** When `true`, a busy indicator is displayed and interaction is disabled. */
  @property({ reflect: true }) loading = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the name of the component on form submission. */
  @property({ reflect: true }) name?: string;

  /**
   * Defines the relationship between the `href` value and the current document.
   *
   * @mdn [rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @property({ reflect: true }) rel: string;

  /** When `true`, adds a round style to the component. */
  @property({ reflect: true }) round = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies if the component is a child of a `calcite-split-button`. */
  @property({ reflect: true }) splitChild: "primary" | "secondary" | false = false;

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @mdn [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @property({ reflect: true }) target: string;

  /**
   * Specifies the default behavior of the component.
   *
   * @mdn [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)
   */
  @property({ reflect: true }) type: HTMLButtonElement["type"] = "button";

  /** Specifies the width of the component. [Deprecated] The `"half"` value is deprecated, use `"full"` instead. */
  @property({ reflect: true }) width: Extract<Width, "auto" | "half" | "full"> = "auto";

  //#endregion

  //#region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.childEl?.focus();
  }

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.setupTextContentObserver();
    connectLabel(this);
    this.formEl = findAssociatedForm(this);
  }

  async load(): Promise<void> {
    if (!isServer) {
      this.updateHasContent();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    this.setTooltipText();
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    disconnectLabel(this);
    this.resizeObserver?.disconnect();
    this.formEl = null;
  }

  //#endregion

  //#region Private Methods

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
  }

  private updateHasContent() {
    this.hasContent = hasVisibleContent(this.el);
  }

  private setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  onLabelClick(): void {
    this.handleClick();
    this.setFocus();
  }

  private handleClick(): void {
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
  }

  private setTooltipText(): void {
    const {
      contentEl: { value: contentEl },
    } = this;
    if (contentEl) {
      this.tooltipText =
        contentEl.offsetWidth < contentEl.scrollWidth ? this.el.innerText || null : null;
    }
  }

  private setChildEl(el: HTMLElement): void {
    this.childEl = el;

    if (el) {
      this.resizeObserver?.observe(el);
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const childElType = this.href ? "a" : "button";
    const DynamicHtmlTag = this.href
      ? (literal`a` as unknown as "a")
      : (literal`button` as unknown as `button`);
    const loaderNode = this.loading ? (
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
        scale={getIconScale(this.scale)}
      />
    );

    const iconEndEl = (
      <calcite-icon
        class={{ [CSS.icon]: true, [CSS.iconEnd]: true }}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale={getIconScale(this.scale)}
      />
    );

    const contentEl = (
      <span class={CSS.content} ref={this.contentEl}>
        <slot />
      </span>
    );

    return (
      <InteractiveContainer disabled={this.disabled}>
        <DynamicHtmlTag
          ariaBusy={this.loading}
          ariaExpanded={
            this.el.ariaExpanded
              ? (this.el.ariaExpanded as LuminaJsx.HTMLElementTags["button"]["ariaExpanded"])
              : null
          }
          ariaLabel={!this.loading ? getLabelText(this) : this.messages.loading}
          ariaLive="polite"
          class={{
            [CSS.buttonPadding]: noStartEndIcons,
            [CSS.buttonPaddingShrunk]: !noStartEndIcons,
            [CSS.contentSlotted]: this.hasContent,
            [CSS.iconStartEmpty]: !this.iconStart,
            [CSS.iconEndEmpty]: !this.iconEnd,
          }}
          disabled={childElType === "button" ? this.disabled : null}
          download={
            childElType === "a"
              ? this.download === true || this.download === ""
                ? ""
                : this.download || null
              : null
          }
          href={childElType === "a" && this.href}
          name={childElType === "button" && this.name}
          onClick={this.handleClick}
          ref={this.setChildEl}
          rel={childElType === "a" && this.rel}
          tabIndex={this.disabled ? -1 : null}
          target={childElType === "a" && this.target}
          title={this.tooltipText}
          type={childElType === "button" ? this.type : null}
        >
          {loaderNode}
          {this.iconStart ? iconStartEl : null}
          {this.hasContent ? contentEl : null}
          {this.iconEnd ? iconEndEl : null}
        </DynamicHtmlTag>
      </InteractiveContainer>
    );
  }

  //#endregion
}
