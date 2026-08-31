import { createRef } from "lit/directives/ref.js";
import { literal } from "lit/static-html.js";
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
import { getLabelText } from "../../utils/label";
import { useLabel } from "../../controllers/useLabel";
import { createObserver, updateRefObserver } from "../../utils/observers";
import { getIconScale } from "../../utils/component";
import { Appearance, FlipContext, Kind, Scale, Width } from "../types";
import { IconName } from "../icon/types";
import { useT9n } from "../../controllers/useT9n";
import type { Label } from "../label/label";
import { hasVisibleContent } from "../../utils/dom";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { useFormTrigger } from "../../controllers/useFormTrigger";
import T9nStrings from "./assets/t9n/messages.en.json";
import { ButtonAlignment } from "./types";
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
export class Button extends LitElement {
  //#region Static Members

  static formAssociated = true;

  static override styles = styles;

  //#endregion

  //#region Private Properties

  /** the rendered child element */
  private childEl?: HTMLElement;

  private contentRef = createRef<HTMLSpanElement>();

  labelEl?: Label["el"];

  /** watches for changing text content */
  private mutationObserver = createObserver("mutation", () => this.updateHasContent());

  private resizeObserver = createObserver("resize", () => this.setTooltipText());

  private focusSetter = useSetFocus<this>()(this);

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region State Properties

  /** determine if there is slotted content for styling purposes */
  @state() private hasContent = false;

  /** keeps track of the tooltipText */
  @state() tooltipText?: string;

  //#endregion

  //#region Public Properties

  /** @internal */
  @property({ attribute: "aria-expanded", reflect: false })
  internalAriaExpanded: HTMLElement["ariaExpanded"] = null;

  /** When `width` is not `"auto"`, specifies the alignment of the component's elements. */
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
   * @see [MDN - Global download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
   */
  @property({ reflect: true, converter: stringOrBoolean }) download: string | boolean = false;

  /** @copyDoc */
  @property({ reflect: true }) form?: string;

  /** Specifies the URL of the linked resource, which can be set as an absolute or relative path. */
  @property({ reflect: true }) href?: string;

  /** @copyDoc */
  @property({ reflect: true }) iconEnd?: IconName;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl?: FlipContext;

  /** @copyDoc */
  @property({ reflect: true }) iconStart?: IconName;

  /** Specifies the kind of the component, which will apply to the border and background if applicable. */
  @property({ reflect: true }) kind: Extract<"brand" | "danger" | "inverse" | "neutral", Kind> =
    "brand";

  /** @copyDoc */
  @property() label?: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** @copyDoc */
  @property({ reflect: true }) name?: string;

  /**
   * Defines the relationship between the `href` value and the current document.
   *
   * @see [MDN - rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @property({ reflect: true }) rel?: string;

  /** When `true`, adds a round style to the component. */
  @property({ reflect: true }) round = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies if the component is a child of a `calcite-split-button`. */
  @property({ reflect: true }) splitChild: "primary" | "secondary" | false = false;

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @see [MDN - target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @property({ reflect: true }) target?: string;

  /**
   * Specifies the default behavior of the component.
   *
   * @see [MDN - type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)
   */
  @property({ reflect: true }) type: HTMLButtonElement["type"] = "button";

  /** Specifies the width of the component. */
  @property({ reflect: true }) width: Extract<Width, "auto" | "half" | "full"> = "auto";

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.childEl, options);
  }

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    useFormTrigger({ disabled: () => !!this.href })(this);
    useLabel(this);
  }

  override connectedCallback(): void {
    this.setupTextContentObserver();
  }

  async load(): Promise<void> {
    this.updateHasContent();
  }

  loaded(): void {
    this.setTooltipText();
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private updateHasContent() {
    this.hasContent = hasVisibleContent(this.el);
  }

  private setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private setTooltipText(): void {
    const {
      contentRef: { value: contentEl },
    } = this;
    if (contentEl) {
      this.tooltipText =
        contentEl.offsetWidth < contentEl.scrollWidth ? this.el.innerText || undefined : undefined;
    }
  }

  private setChildEl(el: HTMLAnchorElement | HTMLButtonElement | undefined): void {
    updateRefObserver(this.resizeObserver, this.childEl, el);
    this.childEl = el;
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
      <span class={CSS.content} ref={this.contentRef}>
        <slot />
      </span>
    );

    return (
      <this.interactiveContainer disabled={this.disabled}>
        <DynamicHtmlTag
          ariaBusy={this.loading}
          ariaExpanded={
            this.internalAriaExpanded
              ? (this.internalAriaExpanded as LuminaJsx.HTMLElementTags["button"]["ariaExpanded"])
              : undefined
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
          disabled={childElType === "button" ? this.disabled : undefined}
          download={
            childElType === "a"
              ? this.download === true || this.download === ""
                ? ""
                : this.download || undefined
              : undefined
          }
          href={childElType === "a" ? this.href : undefined}
          name={childElType === "button" ? this.name : undefined}
          ref={this.setChildEl}
          rel={childElType === "a" ? this.rel : undefined}
          tabIndex={this.disabled ? -1 : undefined}
          target={childElType === "a" ? this.target : undefined}
          title={this.tooltipText}
          type={childElType === "button" ? this.type : undefined}
        >
          {loaderNode}
          {this.iconStart ? iconStartEl : null}
          {this.hasContent ? contentEl : null}
          {this.iconEnd ? iconEndEl : null}
        </DynamicHtmlTag>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
