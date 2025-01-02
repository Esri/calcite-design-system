// @ts-strict-ignore
import { literal } from "lit-html/static.js";
import { LitElement, property, h, method, JsxNode, stringOrBoolean } from "@arcgis/lumina";
import { focusElement, getElementDir } from "../../utils/dom";
import {
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
import { IconNameOrString } from "../icon/interfaces";
import { styles } from "./link.scss";

declare global {
  interface DeclareElements {
    "calcite-link": Link;
  }
}

/**
 * Any attributes placed on <calcite-link> component will propagate to the rendered child
 *
 * Passing a 'href' will render an anchor link, instead of a span. Role will be set to link, or link, depending on this.
 *
 * It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission
 *
 * @slot - A slot for adding text.
 */
export class Link extends LitElement implements InteractiveComponent, LoadableComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  /** the rendered child element */
  private childEl: HTMLAnchorElement | HTMLSpanElement;

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
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

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    focusElement(this.childEl);
  }

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("click", this.clickHandler);
  }

  load(): void {
    setUpLoadableComponent(this);
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    setComponentLoaded(this);
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

    const DynamicHtmlTag =
      childElType === "span"
        ? (literal`span` as unknown as "span")
        : (literal`a` as unknown as "a");
    const role = childElType === "span" ? "link" : null;
    const tabIndex = childElType === "span" ? 0 : null;
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
          role={role}
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
