import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { slotChangeHasContent, toAriaBoolean } from "../../utils/dom";
import { Appearance, Layout, Scale } from "../interfaces";
import { CSS, SLOTS } from "./resources";

@Component({
  tag: "calcite-segmented-control-item",
  styleUrl: "segmented-control-item.scss",
  shadow: true,
})
export class SegmentedControlItem {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, the component is checked. */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by form module
  @Prop({ reflect: true, mutable: true }) checked = false;

  @Watch("checked")
  protected handleCheckedChange(): void {
    this.calciteInternalSegmentedControlItemChange.emit();
  }

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /**
   * The component's value.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by form module
  @Prop({ mutable: true }) value: any | null;

  /**
   * Specifies the appearance style of the component inherited from parent `calcite-segmented-control`, defaults to `solid`.
   *
   * @internal
   */
  @Prop() appearance: Extract<"outline" | "outline-fill" | "solid", Appearance> = "solid";

  /**
   * Defines the layout of the component inherited from parent `calcite-segmented-control`, defaults to `horizontal`.
   *
   * @internal
   */
  @Prop() layout: Layout = "horizontal";

  /**
   * Specifies the size of the component inherited from the `calcite-segmented-control`, defaults to `m`.
   *
   * @internal
   */
  @Prop() scale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  private renderIcon(icon: string, solo: boolean = false): VNode {
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

  render(): VNode {
    const { appearance, checked, layout, scale, value } = this;

    return (
      <Host aria-checked={toAriaBoolean(checked)} aria-label={value} role="radio">
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
      </Host>
    );
  }

  private renderContent(): VNode | VNode[] {
    const { hasSlottedContent, iconEnd, iconStart } = this;
    const effectiveIcon = iconStart || iconEnd;
    const canRenderIconOnly = !hasSlottedContent && effectiveIcon;

    if (canRenderIconOnly) {
      return [this.renderIcon(effectiveIcon, true), <slot onSlotchange={this.handleSlotChange} />];
    }

    return [
      this.renderIcon(iconStart),
      <slot onSlotchange={this.handleSlotChange} />,
      <slot name={SLOTS.input} />,
      this.renderIcon(iconEnd),
    ];
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private handleSlotChange = (event: Event): void => {
    this.hasSlottedContent = slotChangeHasContent(event);
  };

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteSegmentedControlItemElement;

  @State() hasSlottedContent = false;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the item has been selected.
   *
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalSegmentedControlItemChange: EventEmitter<void>;
}
