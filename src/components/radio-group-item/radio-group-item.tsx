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

  /**
   * optionally pass an icon to display - accepts Calcite UI icon names
   *
   * @deprecated use iconStart and iconEnd
   */
  @Prop({ reflect: true }) icon?: string;

  @Watch("icon")
  iconHandler(value: string): void {
    this.iconPosition === "start" && (this.iconStart = value);
    this.iconPosition === "end" && (this.iconEnd = value);
  }

  /** flip the icon in rtl */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * optionally used with icon, select where to position the icon
   *
   * @deprecated use iconStart and iconEnd
   */
  @Prop({ reflect: true }) iconPosition?: Position = "start";

  @Watch("iconPosition")
  iconPositionHandler(value: Position): void {
    value === "start" && (this.iconStart = this.icon);
    value === "end" && (this.iconEnd = this.icon);
  }

  /** Optionally pass an icon to display at the start - accepts Calcite UI icon names */
  @Prop({ reflect: true }) iconStart?: string;

  /** Optionally pass an icon to display at the end - accepts Calcite UI icon names */
  @Prop({ reflect: true }) iconEnd?: string;

  /**
   * The control's value.
   */
  @Prop({ mutable: true })
  value: any | null;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    if (this.icon) {
      this.iconPosition === "start" && (this.iconStart = this.icon);
      this.iconPosition === "end" && (this.iconEnd = this.icon);
    }
  }

  render(): VNode {
    const { checked, value } = this;
    const scale: Scale = getElementProp(this.el, "scale", "m");
    const appearance: RadioAppearance = getElementProp(this.el, "appearance", "solid");
    const layout: Layout = getElementProp(this.el, "layout", "horizontal");

    const iconStartEl = (
      <calcite-icon
        class={CSS.radioGroupItemIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.iconStart}
        scale="s"
      />
    );

    const iconEndEl = (
      <calcite-icon
        class={CSS.radioGroupItemIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.iconEnd}
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
