import { createRef } from "lit/directives/ref.js";
import { LitElement, property, h, method, JsxNode, LuminaJsx, Fragment } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import { createObserver } from "../../utils/observers";
import { getIconScale } from "../../utils/component";
import {
  Alignment,
  Appearance,
  AriaAttributesCamelCased,
  Scale,
  SelectionAppearance,
  Width,
} from "../interfaces";
import { IconName } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { useFormTrigger } from "../../controllers/useFormTrigger";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, IDS } from "./resources";
import { styles } from "./action.scss";

declare global {
  interface DeclareElements {
    "calcite-action": Action;
  }
}

/**
 * @slot - A slot for adding non-interactive content, such as a `calcite-icon`.
 */
export class Action extends LitElement {
  //#region Static Members

  static formAssociated = true;

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private guid = guid();

  private buttonRef = createRef<HTMLButtonElement>();

  private buttonId = IDS.button(this.guid);

  private mutationObserver = createObserver("mutation", () => this.requestUpdate());

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  private focusSetter = useSetFocus<this>()(this);

  private indicatorRef = createRef<HTMLDivElement>();

  private interactiveContainer = useInteractive(this);

  formTrigger = useFormTrigger()(this);

  private labelElRef = createRef<HTMLSpanElement>();

  //#endregion

  //#region Public Properties

  /**
   * When specified, overrides or extends ARIA properties and attributes on the component's button. Refer to the component's accessibility section for configuration considerations.
   */
  @property() aria?: Partial<
    Pick<
      AriaAttributesCamelCased,
      | "controlsElements"
      | "describedByElements"
      | "expanded"
      | "hasPopup"
      | "labelledByElements"
      | "ownsElements"
      | "pressed"
      | "checked"
    > &
      Pick<LuminaJsx.HTMLAttributes, "role">
  >;

  /** When `true`, the component is highlighted. */
  @property({ reflect: true }) active = false;

  /**
   * When `true`, the component appears as if it is focused.
   * @private
   */
  @property({ reflect: true }) activeDescendant = false;

  /** Specifies the horizontal alignment of button elements with text content. */
  @property({ reflect: true }) alignment?: Alignment;

  /**
   * Specifies the appearance of the component.
   *
   * @deprecated in v5.0.0, removal target v6.0.0 - No longer necessary.
   */
  @property({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> =
    "transparent";

  /**
   * When `true`, the side padding of the component is reduced.
   *
   * @deprecated in v2.11.0, removal target v5.0.0 - No longer necessary.
   */
  @property({ reflect: true }) compact = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * When `true`, the component is draggable.
   *
   * @private
   */
  @property({ reflect: true }) dragHandle = false;

  /** @copyDoc */
  @property({ reflect: true }) form?: string;

  /** Specifies an icon to display. */
  @property({ type: String, reflect: true }) icon?: IconName;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, displays a visual indicator. */
  @property({ reflect: true }) indicator = false;

  /** Specifies an accessible label for the component. If no label is provided, the label inherits what's provided for the `text` prop. */
  @property() label?: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** When `true`, the component is not automatically overflowed into a menu by a parent `calcite-action-bar`. */
  @property({ reflect: true }) overflowDisabled = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * When `full`, the component's width spans all its parent's available space
   *
   * @private
   */
  @property({ reflect: true }) width: Extract<"auto" | "full", Width> = "auto";

  /**
   * Specifies text that accompanies the icon.
   *
   * @required
   */
  @property() text!: string;

  /**
   * When `true`, displays `text` adjacent to the `icon`.
   *
   * When `true` and the component is used as a child of `calcite-action-bar`, the text will be shown initially regardless of the parent components `expanded` state.
   */
  @property({ reflect: true }) textEnabled = false;

  /**
   * Specifies the default behavior of the component.
   *
   * @see [MDN - type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)
   */
  @property({ reflect: true }) type: HTMLButtonElement["type"] = "button";

  /**
   * Specifies the selection appearance of the component. Inherited from `calcite-action-bar`.
   *
   * @private
   */
  @property({ reflect: true }) selectionAppearance?: Extract<
    "neutral" | "highlight",
    SelectionAppearance
  >;

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
    return this.focusSetter(() => this.buttonRef.value, options);
  }

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private getAccessibleLabel(): string {
    const labelFallback = this.label || this.text || "";

    return this.indicator
      ? this.messages.indicatorLabel.replace("{label}", labelFallback)
      : labelFallback;
  }

  private getLabelledByElements(): Element[] | undefined {
    const labelledByElements = [
      ...(this.labelElRef.value ? [this.labelElRef.value] : []),
      ...(this.aria?.labelledByElements ?? []),
    ];

    return labelledByElements.length ? labelledByElements : undefined;
  }

  //#endregion

  //#region Rendering

  private renderTextContainer(): JsxNode {
    const { text, textEnabled } = this;

    const textContainerClasses = {
      [CSS.textContainer]: true,
      [CSS.textContainerVisible]: textEnabled,
    };

    return text ? (
      <div class={textContainerClasses} key="text-container">
        {text}
      </div>
    ) : null;
  }

  private renderIndicatorText(): JsxNode {
    const { indicator, messages, buttonId } = this;
    return indicator ? (
      <div
        aria-labelledby={buttonId}
        class={CSS.indicatorText}
        ref={this.indicatorRef}
        role="status"
      >
        {messages.indicator}
      </div>
    ) : null;
  }

  private renderIconContainer(): JsxNode {
    const { loading, icon, scale, el, iconFlipRtl, indicator } = this;
    const loaderScale = scale === "l" ? "l" : "m";
    const calciteLoaderNode = loading ? (
      <calcite-loader inline label={this.messages.loading} scale={loaderScale} />
    ) : null;
    const calciteIconNode = icon ? (
      <calcite-icon
        class={{ [CSS.indicatorWithIcon]: indicator }}
        flipRtl={iconFlipRtl}
        icon={icon}
        scale={getIconScale(this.scale)}
      />
    ) : null;
    const iconNode = calciteLoaderNode || calciteIconNode;
    const hasIconToDisplay = iconNode || el.children?.length;

    const slotContainerNode = (
      <div
        class={{
          [CSS.slotContainer]: true,
          [CSS.slotContainerHidden]: loading,
        }}
      >
        <slot />
      </div>
    );

    return hasIconToDisplay ? (
      <div ariaHidden="true" class={CSS.iconContainer} key="icon-container">
        {iconNode}
        {slotContainerNode}
      </div>
    ) : null;
  }

  private renderLabel(): JsxNode {
    const ariaLabel = this.getAccessibleLabel();

    return ariaLabel ? <span ariaLabel={ariaLabel} hidden ref={this.labelElRef} /> : null;
  }

  private renderButton(): JsxNode {
    const { compact, disabled, icon, loading, textEnabled, indicator, indicatorRef, buttonId } =
      this;
    const ariaLabelledByElements = this.getLabelledByElements();

    const buttonClasses = {
      [CSS.button]: true,
      [CSS.buttonTextVisible]: textEnabled,
      [CSS.buttonCompact]: compact,
    };

    const buttonContent = (
      <>
        {this.renderIconContainer()}
        {this.renderTextContainer()}
        {!icon && indicator && <div class={CSS.indicatorWithoutIcon} key="indicator-no-icon" />}
        {this.renderLabel()}
      </>
    );

    const internalControlsElements = indicator && indicatorRef.value ? [indicatorRef.value] : [];

    const ariaControlsElements = [
      ...(this.aria?.controlsElements ?? []),
      ...internalControlsElements,
    ];

    if (this.dragHandle) {
      return (
        // Needs to be a span because of https://github.com/SortableJS/Sortable/issues/1486 & https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        <span
          ariaBusy={loading}
          ariaControlsElements={ariaControlsElements}
          ariaDescribedByElements={this.aria?.describedByElements}
          ariaExpanded={this.aria?.expanded}
          ariaHasPopup={this.aria?.hasPopup}
          ariaLabelledByElements={ariaLabelledByElements}
          ariaOwnsElements={this.aria?.ownsElements}
          ariaPressed={this.aria?.pressed}
          class={buttonClasses}
          id={buttonId}
          ref={this.buttonRef}
          role="button"
          tabIndex={this.disabled ? undefined : 0}
        >
          {buttonContent}
        </span>
      );
    }

    return (
      <button
        ariaBusy={loading}
        ariaChecked={this.aria?.checked}
        ariaControlsElements={ariaControlsElements}
        ariaDescribedByElements={this.aria?.describedByElements}
        ariaExpanded={this.aria?.expanded}
        ariaHasPopup={this.aria?.hasPopup}
        ariaLabelledByElements={ariaLabelledByElements}
        ariaOwnsElements={this.aria?.ownsElements}
        ariaPressed={this.aria?.pressed}
        class={buttonClasses}
        disabled={disabled}
        id={buttonId}
        ref={this.buttonRef}
        role={this.aria?.role}
        type={this.type}
      >
        {buttonContent}
      </button>
    );
  }

  override render(): JsxNode {
    return (
      <this.interactiveContainer disabled={this.disabled}>
        {this.renderButton()}
        {this.renderIndicatorText()}
      </this.interactiveContainer>
    );
  }

  //#endregion
}
