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

  closeClickHandler = () => {
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
        <calcite-icon scale="s" icon="x" onClick={this.closeClickHandler} />
      </Host>
    );
  }
}
