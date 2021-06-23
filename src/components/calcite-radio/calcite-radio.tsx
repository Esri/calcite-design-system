import { Component, h, Prop } from "@stencil/core";
import { Scale } from "../interfaces";

@Component({
  tag: "calcite-radio",
  styleUrl: "calcite-radio.scss",
  shadow: true
})
export class CalciteRadio {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The checked state of the radio. */
  @Prop({ reflect: true }) checked = false;

  /** The disabled state of the radio. */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /**
   * The focused state of the radio.
   * @private
   */
  @Prop({ reflect: true }) focused = false;

  /** The radio's hidden status. */
  @Prop({ reflect: true }) hidden = false;

  /**
   * The hovered state of the radio.
   * @private
   */
  @Prop({ reflect: true }) hovered = false;

  /** The scale (size) of the radio. */
  @Prop({ reflect: true }) scale: Scale = "m";

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return <div class="radio" />;
  }
}
