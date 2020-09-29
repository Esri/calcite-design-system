import { Component, h, Host, Prop, Event, EventEmitter, Element, VNode } from "@stencil/core";
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

  /** specify the appearance style of the button, defaults to solid. */
  @Prop({ reflect: true }) appearance: "solid" | "clear" = "solid";

  /** specify the color of the button, defaults to blue */
  @Prop({ reflect: true }) color: "blue" | "red" | "yellow" | "green" | "grey" = "grey";

  /** Optionally show a button the user can click to dismiss the chip */
  @Prop({ reflect: true }) dismissible?: boolean = false;

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  /** specify the scale of the chip, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  @Prop() value!: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteChipElement;

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

  closeClickHandler = (event: MouseEvent): void => {
    event.preventDefault();
    this.calciteChipDismiss.emit(this.el);
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const dir = getElementDir(this.el);
    const iconScale = this.scale !== "l" ? "s" : "m";

    const iconEl = <calcite-icon class="calcite-chip--icon" icon={this.icon} scale={iconScale} />;

    const closeButton = (
      <button class={CSS.close} onClick={this.closeClickHandler} title={TEXT.close}>
        <calcite-icon icon="x" scale={iconScale} />
      </button>
    );

    return (
      <Host dir={dir}>
        <slot name="chip-image" />
        {this.icon ? iconEl : null}
        <span>
          <slot />
        </span>
        {this.dismissible ? closeButton : null}
      </Host>
    );
  }
}
