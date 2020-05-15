import {
  Component,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS, TEXT } from "./resources";

@Component({
  tag: "calcite-chip",
  styleUrl: "calcite-chip.scss",
  shadow: true,
})
export class CalciteChip {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  @Prop() value!: string;

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** specify the scale of the chip, defaults to m */
  @Prop({ reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" = "m";

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  /** Optionally show a button the user can click to dismiss the chip */
  @Prop({ reflect: true, mutable: true }) dismissible?: boolean = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /** Emitted when the dismiss button is clicked */
  @Event() calciteChipDismiss: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  closeClickHandler = (event: MouseEvent) => {
    event.preventDefault();
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
    const iconScale =
      this.scale === "xs" || this.scale === "s" || this.scale === "m"
        ? "s"
        : this.scale === "l"
        ? "m"
        : "l";

    const iconEl = (
      <calcite-icon
        class="calcite-chip--icon"
        icon={this.icon}
        scale={iconScale}
      />
    );

    const closeButton = (
      <button
        onClick={this.closeClickHandler}
        class={CSS.close}
        title={TEXT.close}
      >
        <calcite-icon scale={iconScale} icon="x" />
      </button>
    );

    return (
      <Host dir={dir}>
        {this.icon ? iconEl : null}
        <slot name="chip-image"></slot>
        <span>
          <slot />
        </span>
        {this.dismissible ? closeButton : null}
      </Host>
    );
  }
}
