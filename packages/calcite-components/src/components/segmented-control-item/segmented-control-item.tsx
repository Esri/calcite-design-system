// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode } from "@arcgis/lumina";
import { slotChangeHasContent, toAriaBoolean } from "../../utils/dom";
import { Appearance, Layout, Scale } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { CSS, SLOTS } from "./resources";
import { styles } from "./segmented-control-item.scss";

declare global {
  interface DeclareElements {
    "calcite-segmented-control-item": SegmentedControlItem;
  }
}

export class SegmentedControlItem extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region State Properties

  @state() hasSlottedContent = false;

  // #endregion

  // #region Public Properties

  /**
   * Specifies the appearance style of the component inherited from parent `calcite-segmented-control`, defaults to `solid`.
   *
   * @private
   */
  @property() appearance: Extract<"outline" | "outline-fill" | "solid", Appearance> = "solid";

  /** When `true`, the component is checked. */
  @property({ reflect: true }) checked = false;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /**
   * Defines the layout of the component inherited from parent `calcite-segmented-control`, defaults to `horizontal`.
   *
   * @private
   */
  @property() layout: Extract<"horizontal" | "vertical" | "grid", Layout> = "horizontal";

  /**
   * Specifies the size of the component inherited from the `calcite-segmented-control`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  /** The component's value. */
  @property() value: any | null;

  // #endregion

  // #region Events

  /**
   * Fires when the item has been selected.
   *
   * @private
   */
  calciteInternalSegmentedControlItemChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("checked") && (this.hasUpdated || this.checked !== false)) {
      this.calciteInternalSegmentedControlItemChange.emit();
    }
  }

  // #endregion

  // #region Private Methods
  private handleSlotChange(event: Event): void {
    this.hasSlottedContent = slotChangeHasContent(event);
  }

  // #endregion

  // #region Rendering

  private renderIcon(icon: IconNameOrString, solo: boolean = false): JsxNode {
    return icon ? (
      <calcite-icon
        class={{
          [CSS.icon]: true,
          [CSS.iconSolo]: solo,
        }}
        flipRtl={this.iconFlipRtl}
        icon={icon}
        scale="s"
      />
    ) : null;
  }

  override render(): JsxNode {
    const { appearance, checked, layout, scale, value } = this;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaChecked = toAriaBoolean(checked);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = value;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "radio";

    return (
      <label
        class={{
          [CSS.label]: true,
          [CSS.labelScale(scale)]: true,
          [CSS.labelHorizontal]: layout === "horizontal",
          [CSS.labelOutline]: appearance === "outline",
          [CSS.labelOutlineFill]: appearance === "outline-fill",
        }}
      >
        {this.renderContent()}
      </label>
    );
  }

  private renderContent(): JsxNode | JsxNode {
    const { hasSlottedContent, iconEnd, iconStart } = this;
    const effectiveIcon = iconStart || iconEnd;
    const canRenderIconOnly = !hasSlottedContent && effectiveIcon;

    if (canRenderIconOnly) {
      return [this.renderIcon(effectiveIcon, true), <slot onSlotChange={this.handleSlotChange} />];
    }

    return [
      this.renderIcon(iconStart),
      <slot onSlotChange={this.handleSlotChange} />,
      <slot name={SLOTS.input} />,
      this.renderIcon(iconEnd),
    ];
  }

  // #endregion
}
