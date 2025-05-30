// @ts-strict-ignore
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, h, method, JsxNode, Fragment } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { componentFocusable } from "../../utils/component";
import { createObserver } from "../../utils/observers";
import { getIconScale } from "../../utils/component";
import { Alignment, Appearance, Scale, Width } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Tooltip } from "../tooltip/tooltip";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, SLOTS } from "./resources";
import { styles } from "./action.scss";

declare global {
  interface DeclareElements {
    "calcite-action": Action;
  }
}

/**
 * @slot - A slot for adding a `calcite-icon`.
 * @slot tooltip - [Deprecated] Use the `calcite-tooltip` component instead.
 */
export class Action extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private guid = `calcite-action-${guid()}`;

  private buttonEl = createRef<HTMLButtonElement>();

  private buttonId = `${this.guid}-button`;

  private indicatorId = `${this.guid}-indicator`;

  private mutationObserver = createObserver("mutation", () => this.requestUpdate());

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  //#endregion

  //#region Public Properties

  /** When `true`, the component is highlighted. */
  @property({ reflect: true }) active = false;

  /**
   * When `true`, the component appears as if it is focused.
   * @private
   */
  @property({ reflect: true }) activeDescendant = false;

  /** Specifies the horizontal alignment of button elements with text content. */
  @property({ reflect: true }) alignment: Alignment;

  /** Specifies the appearance of the component. */
  @property({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> = "solid";

  /**
   * When `true`, the side padding of the component is reduced.
   *
   * @deprecated No longer necessary.
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

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, displays a visual indicator. */
  @property({ reflect: true }) indicator = false;

  /** Specifies the label of the component. If no label is provided, the label inherits what's provided for the `text` prop. */
  @property() label: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

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
  @property() text: string;

  /** Indicates whether the text is displayed. */
  @property({ reflect: true }) textEnabled = false;

  //#endregion

  //#region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.buttonEl.value?.focus();
  }

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private handleTooltipSlotChange(event: Event): void {
    const tooltips = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true,
      })
      .filter((el): el is Tooltip["el"] => el?.matches("calcite-tooltip"));

    const tooltip = tooltips[0];

    if (tooltip) {
      tooltip.referenceElement = this.buttonEl.value;
    }
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
    const { indicator, messages, indicatorId, buttonId } = this;
    return (
      <div
        aria-labelledby={buttonId}
        ariaLive="polite"
        class={CSS.indicatorText}
        id={indicatorId}
        role="region"
      >
        {indicator ? messages.indicator : null}
      </div>
    );
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

  private renderButton(): JsxNode {
    const {
      active,
      compact,
      disabled,
      icon,
      loading,
      textEnabled,
      label,
      text,
      indicator,
      indicatorId,
      buttonId,
      messages,
    } = this;
    const labelFallback = label || text || "";

    const ariaLabel = indicator
      ? messages.indicatorLabel.replace("{label}", labelFallback)
      : labelFallback;

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
      </>
    );

    if (this.dragHandle) {
      return (
        // Needs to be a span because of https://github.com/SortableJS/Sortable/issues/1486 & https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        <span
          aria-controls={indicator ? indicatorId : null}
          ariaBusy={loading}
          ariaDisabled={this.disabled ? this.disabled : null}
          ariaLabel={ariaLabel}
          ariaPressed={active}
          class={buttonClasses}
          id={buttonId}
          ref={this.buttonEl}
          role="button"
          tabIndex={this.disabled ? null : 0}
        >
          {buttonContent}
        </span>
      );
    }

    return (
      <button
        aria-controls={indicator ? indicatorId : null}
        ariaBusy={loading}
        ariaLabel={ariaLabel}
        ariaPressed={active}
        class={buttonClasses}
        disabled={disabled}
        id={buttonId}
        ref={this.buttonEl}
        // tabIndex is required for the button to be focusable on click in safari.
        tabIndex={disabled ? null : 0}
      >
        {buttonContent}
      </button>
    );
  }

  override render(): JsxNode {
    return (
      <InteractiveContainer disabled={this.disabled}>
        {this.renderButton()}
        <slot name={SLOTS.tooltip} onSlotChange={this.handleTooltipSlotChange} />
        {this.renderIndicatorText()}
      </InteractiveContainer>
    );
  }

  //#endregion
}
