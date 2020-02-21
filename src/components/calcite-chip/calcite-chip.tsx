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

import { CSS , TEXT } from "./resources";

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

  /** specify the scale of the chip, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  @Prop() value: string = null;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  @State() hidden = false;

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
    this.hidden = true;
    this.calciteChipDismiss.emit(this.el);
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host hidden={this.hidden}>
        <span><slot /></span>
        <a class={CSS.close} href="#" onClick={this.closeClickHandler} title={TEXT.close}><calcite-icon scale={this.scale} icon="x" /></a>
      </Host>
    );
  }
}
