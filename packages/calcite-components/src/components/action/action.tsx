import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, h, method, JsxNode } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
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
import { createObserver } from "../../utils/observers";
import { getIconScale } from "../../utils/component";
import { Alignment, Appearance, Scale } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Tooltip } from "../tooltip/tooltip";
import T9nStrings from "./assets/t9n/action.t9n.en.json";
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
export class Action extends LitElement implements InteractiveComponent, LoadableComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private guid = `calcite-action-${guid()}`;

  private buttonEl = createRef<HTMLButtonElement>();

  private buttonId = `${this.guid}-button`;

  private indicatorId = `${this.guid}-indicator`;

  private mutationObserver = createObserver("mutation", () => this.requestUpdate());

  // #endregion

  // #region Public Properties

  /** When `true`, the component is highlighted. */
  @property({ reflect: true }) active = false;

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

  /** Specifies an icon to display. */
  @property() icon: IconNameOrString;

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

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  /** TODO: [MIGRATION] This component has been updated to use the useT9n() controller. Documentation: https://qawebgis.esri.com/arcgis-components/?path=/docs/references-t9n-for-components--docs */
  @property() messages = useT9n<typeof T9nStrings>();

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies text that accompanies the icon.
   * TODO: [MIGRATION] This property was marked as required in your Stencil component. If you didn't mean it to be required, feel free to remove `@required` tag.
   * Otherwise, read the documentation about required properties: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-properties--docs#string-properties
   *
   * @required
   */
  @property() text: string;

  /** Indicates whether the text is displayed. */
  @property({ reflect: true }) textEnabled = false;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.buttonEl.value?.focus();
  }

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods

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

  // #endregion

  // #region Rendering

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

  override render(): JsxNode {
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
    const labelFallback = label || text;
    const ariaLabel = labelFallback
      ? `${labelFallback}${indicator ? ` (${messages.indicator})` : ""}`
      : "";

    const buttonClasses = {
      [CSS.button]: true,
      [CSS.buttonTextVisible]: textEnabled,
      [CSS.buttonCompact]: compact,
    };

    return (
      <InteractiveContainer disabled={disabled}>
        <button
          aria-controls={indicator ? indicatorId : null}
          ariaBusy={loading}
          ariaLabel={ariaLabel}
          ariaPressed={active}
          class={buttonClasses}
          disabled={disabled}
          id={buttonId}
          ref={this.buttonEl}
        >
          {this.renderIconContainer()}
          {this.renderTextContainer()}
          {!icon && indicator && <div class={CSS.indicatorWithoutIcon} key="indicator-no-icon" />}
        </button>
        <slot name={SLOTS.tooltip} onSlotChange={this.handleTooltipSlotChange} />
        {this.renderIndicatorText()}
      </InteractiveContainer>
    );
  }

  // #endregion
}
