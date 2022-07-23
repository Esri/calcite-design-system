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

  /** Indicates whether the control is checked. */
  @Prop({ reflect: true, mutable: true }) checked = false;

  @Watch("checked")
  protected handleCheckedChange(): void {
    this.calciteInternalRadioGroupItemChange.emit();
  }

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  /** flip the icon in rtl */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** optionally used with icon, select where to position the icon */
  @Prop({ reflect: true }) iconPosition?: Position = "start";

  /**
   * The control's value.
   */
  @Prop({ mutable: true })
  value: any | null;

  render(): VNode {
    const { checked, value } = this;
    const scale: Scale = getElementProp(this.el, "scale", "m");
    const appearance: RadioAppearance = getElementProp(this.el, "appearance", "solid");
    const layout: Layout = getElementProp(this.el, "layout", "horizontal");

    const iconEl = (
      <calcite-icon
        class={CSS.radioGroupItemIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.icon}
        scale="s"
      />
    );

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
          {this.icon && this.iconPosition === "start" ? iconEl : null}
          <slot>{value}</slot>
          <slot name={SLOTS.input} />
          {this.icon && this.iconPosition === "end" ? iconEl : null}
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
  @Event()
  calciteInternalRadioGroupItemChange: EventEmitter<void>;
}
