// @ts-strict-ignore
import { literal } from "lit-html/static.js";
import { LitElement, property, h, method, JsxNode, stringOrBoolean } from "@arcgis/lumina";
import { getElementDir } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { CSS_UTILITY } from "../../utils/resources";
import { FlipContext } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { useSetFocus } from "../../controllers/useSetFocus";
import { styles } from "./link.scss";
import { CSS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-link": Link;
  }
}

/**
 * Any attributes placed on <calcite-link> component will propagate to the rendered child
 *
 * Passing a 'href' will render an anchor link, instead of a button.
 *
 * It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission
 *
 * @slot - A slot for adding text.
 */
export class Link extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  /** the rendered child element */
  private childEl: HTMLAnchorElement | HTMLButtonElement;

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** When present, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Prompts the user to save the linked URL instead of navigating to it. Can be used with or without a value:
   * Without a value, the browser will suggest a filename/extension.
   *
   * @see [Global download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
   */
  @property({ reflect: true, converter: stringOrBoolean }) download: string | boolean = false;

  /** Specifies the URL of the linked resource, which can be set as an absolute or relative path. */
  @property({ reflect: true }) href: string;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /** Specifies the relationship to the linked document defined in `href`. */
  @property() rel: string;

  /** Specifies the frame or window to open the linked document. */
  @property() target: string;

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
      return this.childEl;
    }, options);
  }

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("click", this.clickHandler);
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods

  private clickHandler(event: PointerEvent): void {
    if (this.disabled) {
      return;
    }

    // forwards the click() to the internal link for non user-initiated events
    if (!event.isTrusted) {
      this.childEl.click();
    }
  }

  private childElClickHandler(event: MouseEvent): void {
    if (!event.isTrusted) {
      // click was invoked internally, we stop it here
      event.stopPropagation();
    }
  }

  private storeTagRef(el: Link["childEl"]): void {
    this.childEl = el;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { download, el } = this;
    const dir = getElementDir(el);
    const childElType = this.href ? "a" : "button";
    const iconStartEl = (
      <calcite-icon
        class={{ [CSS.calciteLinkIcon]: true, [CSS.iconStart]: true }}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale="s"
      />
    );

    const iconEndEl = (
      <calcite-icon
        class={{ [CSS.calciteLinkIcon]: true, [CSS.iconEnd]: true }}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale="s"
      />
    );

    const DynamicHtmlTag =
      childElType === "button"
        ? (literal`button` as unknown as "button")
        : (literal`a` as unknown as "a");
    const tabIndex = childElType === "button" ? 0 : null;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "presentation";

    return (
      <InteractiveContainer disabled={this.disabled}>
        <DynamicHtmlTag
          class={{ [CSS_UTILITY.rtl]: dir === "rtl" }}
          /*
                      When the 'download' property of type 'boolean | string' is set to true, the value is "".
                      This works around that issue for now.
                      */
          download={
            childElType === "a"
              ? download === true || download === ""
                ? ""
                : download || null
              : null
          }
          href={childElType === "a" && this.href}
          onClick={this.childElClickHandler}
          ref={this.storeTagRef}
          rel={childElType === "a" && this.rel}
          tabIndex={tabIndex}
          target={childElType === "a" && this.target}
        >
          {this.iconStart ? iconStartEl : null}
          <slot />
          {this.iconEnd ? iconEndEl : null}
        </DynamicHtmlTag>
      </InteractiveContainer>
    );
  }

  // #endregion
}
