// @ts-strict-ignore
import { LitElement, property, h, method, JsxNode, stringOrBoolean } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { FlipContext } from "../interfaces";
import { IconName } from "../icon/interfaces";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
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
 * Passing a 'href' will render an anchor link. Otherwise, the anchor will include role="button" and behave like a button.
 *
 * It is the consumers responsibility to add aria information, rel, target, for links, and any link attributes for form submission
 *
 * @slot - A slot for adding text.
 */
export class Link extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private childRef = createRef<HTMLAnchorElement>();

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

    const { key } = event;

    if (key === "Enter" || key === " ") {
      event.preventDefault();
      this.el.click();
    }
  };

  private childElClickHandler = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!event.isTrusted) {
      event.stopPropagation();
    }
  };

  //#endregion

  //#region Public Properties

  /** When `true`, prevents interaction and decreases the component's opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * When specified, prompts the user to save the linked URL instead of navigating to it. Can be used with or without a value:
   * Without a value, the browser will suggest a filename/extension.
   *
   * @see [Global download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
   */
  @property({ reflect: true, converter: stringOrBoolean }) download: string | boolean = false;

  /** Specifies the URL of the linked resource, which can be set as an absolute or relative path. */
  @property({ reflect: true }) href: string;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true, type: String }) iconEnd: IconName;

  /** When `true` and the element direction is right-to-left (`"rtl"`), flips the component's `iconStart` and/or `iconEnd`. */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true, type: String }) iconStart: IconName;

  /** Specifies the relationship to the linked resource defined in `href`. */
  @property() rel: string;

  /** Specifies the frame or window to open the linked resource. */
  @property() target: string;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.childRef.value, options);
  }

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("click", this.clickHandler);
  }

  //#endregion

  //#region Private Methods

  private clickHandler(event: PointerEvent): void {
    if (this.disabled) {
      return;
    }

    if (!event.isTrusted) {
      this.childRef.value.click();
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { download, el } = this;
    const dir = getElementDir(el);
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

    const actAsButton = !this.href;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "presentation";

    return (
      <this.interactiveContainer disabled={this.disabled}>
        {/* prettier-ignore */}
        <a
          aria-disabled={this.disabled || undefined}
          class={{ [CSS_UTILITY.rtl]: dir === "rtl" }}
          /*
            When the 'download' property of type 'boolean | string' is set to true, the value is "".
            This works around that issue for now.
          */
          download={download === true || download === "" ? "" : download || null}
          href={this.href}
          onClick={this.childElClickHandler}
          onKeyDown={actAsButton ? this.keyDownHandler : undefined}
          ref={this.childRef}
          rel={this.rel}
          role={actAsButton ? "button" : null}
          tabIndex={actAsButton ? 0 : undefined}
          target={this.href ? this.target : undefined}
        >{this.iconStart ? iconStartEl : null}<slot />{this.iconEnd ? iconEndEl : null}</a>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
