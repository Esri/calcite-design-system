import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  VNode,
  Watch,
} from "@stencil/core";
import { toAriaBoolean } from "../../utils/dom";
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
   * Indicates whether the text is displayed.
   *
   * @internal
   */
  @Prop({ reflect: true }) textDisabled = false;

  /**
   * The component's value.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by form module
  @Prop({ mutable: true })
  value: any | null;

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

  private renderIcon(icon: string): VNode {
    return icon ? (
      <calcite-icon
        class={CSS.segmentedControlItemIcon}
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
    const { iconEnd, iconStart, textDisabled, value } = this;
    const effectiveIcon = iconStart || iconEnd;
    const canRenderIconOnly = textDisabled && effectiveIcon;

    if (canRenderIconOnly) {
      return this.renderIcon(effectiveIcon);
    }

    return [
      this.renderIcon(iconStart),
      <slot>{value}</slot>,
      <slot name={SLOTS.input} />,
      this.renderIcon(iconEnd),
    ];
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteSegmentedControlItemElement;

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
