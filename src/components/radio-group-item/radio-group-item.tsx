import {
  Component,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  Host,
  Watch,
  VNode
} from "@stencil/core";
import { getElementProp, toAriaBoolean } from "../../utils/dom";
import { RadioAppearance } from "../radio-group/interfaces";
import { Position, Layout, Scale } from "../interfaces";
import { SLOTS, CSS } from "./resources";

@Component({
  tag: "calcite-radio-group-item",
  styleUrl: "radio-group-item.scss",
  shadow: true
})
export class RadioGroupItem {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element()
  el: HTMLCalciteRadioGroupItemElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When true, the component is checked. */
  @Prop({ reflect: true, mutable: true }) checked = false;

  @Watch("checked")
  protected handleCheckedChange(): void {
    this.calciteInternalRadioGroupItemChange.emit();
  }

  /**
   * Specifies an icon to display.
   *
   * @deprecated Use either `iconStart` or `iconEnd` but do not combine them with `icon` and `iconPosition`.
   */
  @Prop({ reflect: true }) icon?: string;

  /** When true, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * Specifies the placement of the icon.
   *
   * @deprecated Use either `iconStart` or `iconEnd` but do not combine them with `icon` and `iconPosition`.
   */
  @Prop({ reflect: true }) iconPosition?: Position = "start";

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart?: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd?: string;

  /**
   * The component's value.
   */
  @Prop({ mutable: true })
  value: any | null;

  render(): VNode {
    const { checked, value } = this;
    const scale: Scale = getElementProp(this.el, "scale", "m");
    const appearance: RadioAppearance = getElementProp(this.el, "appearance", "solid");
    const layout: Layout = getElementProp(this.el, "layout", "horizontal");

    const iconStartEl = this.iconStart ? (
      <calcite-icon
        class={CSS.radioGroupItemIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.iconStart}
        key="icon-start"
        scale="s"
      />
    ) : null;

    const iconEndEl = this.iconEnd ? (
      <calcite-icon
        class={CSS.radioGroupItemIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.iconEnd}
        key="icon-end"
        scale="s"
      />
    ) : null;

    const iconEl = (
      <calcite-icon
        class={CSS.radioGroupItemIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.icon}
        key="icon"
        scale="s"
      />
    );

    const iconAtStart =
      this.icon && this.iconPosition === "start" && !this.iconStart ? iconEl : null;
    const iconAtEnd = this.icon && this.iconPosition === "end" && !this.iconEnd ? iconEl : null;

    return (
      <Host aria-checked={toAriaBoolean(checked)} aria-label={value} role="radio">
        <label
          class={{
            "label--scale-s": scale === "s",
            "label--scale-m": scale === "m",
            "label--scale-l": scale === "l",
            "label--horizontal": layout === "horizontal",
            "label--outline": appearance === "outline"
          }}
        >
          {iconAtStart}
          {this.iconStart ? iconStartEl : null}
          <slot>{value}</slot>
          <slot name={SLOTS.input} />
          {iconAtEnd}
          {this.iconEnd ? iconEndEl : null}
        </label>
      </Host>
    );
  }

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
  calciteInternalRadioGroupItemChange: EventEmitter<void>;
}
