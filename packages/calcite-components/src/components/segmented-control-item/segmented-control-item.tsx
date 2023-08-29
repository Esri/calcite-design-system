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

  render(): VNode {
    const { appearance, checked, layout, scale, value } = this;

    const iconStartEl = this.iconStart ? (
      <calcite-icon
        class={CSS.segmentedControlItemIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.iconStart}
        key="icon-start"
        scale="s"
      />
    ) : null;

    const iconEndEl = this.iconEnd ? (
      <calcite-icon
        class={CSS.segmentedControlItemIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.iconEnd}
        key="icon-end"
        scale="s"
      />
    ) : null;

    return (
      <Host aria-checked={toAriaBoolean(checked)} aria-label={value} role="radio">
        <label
          class={{
            "label--scale-s": scale === "s",
            "label--scale-m": scale === "m",
            "label--scale-l": scale === "l",
            "label--horizontal": layout === "horizontal",
            "label--outline": appearance === "outline",
            "label--outline-fill": appearance === "outline-fill",
          }}
        >
          {this.iconStart ? iconStartEl : null}
          <slot>{value}</slot>
          <slot name={SLOTS.input} />
          {this.iconEnd ? iconEndEl : null}
        </label>
      </Host>
    );
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
