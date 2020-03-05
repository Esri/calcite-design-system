import {
  Component,
  h,
  Host,
  Prop,
  State,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS, TEXT } from "./resources";

@Component({
  tag: "calcite-chip",
  styleUrl: "calcite-chip.scss",
  shadow: true
})
export class CalciteChip {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  @Prop() value: string = null;

  /** specify the scale of the chip, defaults to m */
  @Prop({ reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" = "m";

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  @State() active = true;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  @Event() calciteChipDismiss: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  closeClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    this.active = true;
    this.calciteChipDismiss.emit(this.el);
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  render() {
    const dir = getElementDir(this.el);
    const iconScale = this.scale !== "xl" ? "s" : "m";
    const iconEl = (
      <calcite-icon
        class="calcite-chip--icon"
        icon={this.icon}
        scale={iconScale}
      />
    );

    return (
      <Host active={this.active} dir={dir}>
        {this.icon ? iconEl : null}
        <slot name="chip-image"></slot>
        <span>
          <slot />
        </span>
        <button
          onClick={this.closeClickHandler}
          class={CSS.close}
          title={TEXT.close}
        >
          <calcite-icon scale={iconScale} icon="x" />
        </button>
      </Host>
    );
  }
}
