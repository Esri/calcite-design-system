import { LitElement, property, h, method, JsxNode, stringOrBoolean } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { useDirection } from "@arcgis/lumina/controllers";
import { CSS_UTILITY } from "../../utils/resources";
import { FlipContext } from "../types";
import { IconName } from "../icon/types";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { isActivationKey } from "../../utils/key";
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
 * Passing a 'href' allows the component to behave like a link
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

  private anchorRef = createRef<HTMLAnchorElement>();

  private direction = useDirection();

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      event.preventDefault();
      this.el.click();
    }
  };

  private anchorClickHandler = (event: MouseEvent): void => {
    if (!event.isTrusted) {
      // click was invoked internally, we stop it here
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
   * @see [MDN - Global download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
   */
  @property({ reflect: true, converter: stringOrBoolean }) download: string | boolean = false;

  /** Specifies the URL of the linked resource, which can be set as an absolute or relative path. */
  @property({ reflect: true }) href?: string;

  /** @copyDoc */
  @property({ reflect: true }) iconEnd?: IconName;

  /** When `true` and the element direction is right-to-left (`"rtl"`), flips the component's `iconStart` and/or `iconEnd`. */
  @property({ reflect: true }) iconFlipRtl?: FlipContext;

  /** @copyDoc */
  @property({ reflect: true }) iconStart?: IconName;

  /** Specifies the relationship to the linked resource defined in `href`. */
  @property() rel?: string;

  /** Specifies the frame or window to open the linked resource. */
  @property() target?: string;

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
    return this.focusSetter(() => this.anchorRef.value, options);
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
    if (!event.isTrusted) {
      this.anchorRef.value?.click();
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { download } = this;
    const dir = this.direction;
    const actAsButton = !this.href;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "presentation";

    return (
      <this.interactiveContainer disabled={this.disabled}>
        <a
          class={{ [CSS_UTILITY.rtl]: dir === "rtl" }}
          /*
            When the 'download' property of type 'boolean | string' is set to true, the value is "".
            This works around that issue for now.
          */
          download={download === true || download === "" ? "" : download || undefined}
          href={this.href || undefined}
          onClick={this.anchorClickHandler}
          onKeyDown={actAsButton ? this.keyDownHandler : undefined}
          ref={this.anchorRef}
          rel={this.rel}
          role={actAsButton ? "button" : undefined}
          tabIndex={actAsButton ? 0 : undefined}
          target={this.href ? this.target : undefined}
        >
          {this.iconStart ? this.renderIcon("start") : null}
          <slot />
          {this.iconEnd ? this.renderIcon("end") : null}
        </a>
      </this.interactiveContainer>
    );
  }

  private renderIcon(position: "start" | "end"): JsxNode {
    const isStart = position === "start";
    const icon = isStart ? this.iconStart : this.iconEnd;
    const shouldFlip = this.iconFlipRtl === "both" || this.iconFlipRtl === position;

    return (
      <calcite-icon
        class={{
          [CSS.calciteLinkIcon]: true,
          [isStart ? CSS.iconStart : CSS.iconEnd]: true,
        }}
        flipRtl={shouldFlip}
        icon={icon}
        scale="s"
      />
    );
  }

  //#endregion
}
