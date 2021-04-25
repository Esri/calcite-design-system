import {
  Component,
  Host,
  h,
  VNode,
  Prop,
  Listen,
  Element,
  EventEmitter,
  Event
} from "@stencil/core";
import { nodeListToArray } from "../../utils/dom";
import { TileSelectGroupLayout } from "./interfaces";

@Component({
  tag: "calcite-tile-select-group",
  styleUrl: "calcite-tile-select-group.scss",
  shadow: true
})
export class CalciteTileSelectGroup {
  @Element() el: HTMLCalciteTileSelectGroupElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  /** Tiles by default move horizontally, stacking with each row, vertical allows single-column layouts */
  @Prop({ reflect: true }) layout?: TileSelectGroupLayout = "horizontal";

  /**
   * Fired when tiles are selected/deselected
   * all checked tiles are passed in the event detail
   */
  @Event() calciteTileSelectGroupChange: EventEmitter<HTMLCalciteTileSelectElement[]>;

  @Listen("calciteRadioButtonChange")
  radioButtonChangeHandler(event: CustomEvent): void {
    this.emitChange(event);
  }

  @Listen("calciteCheckboxChange")
  checkboxChangeHandler(event: CustomEvent): void {
    this.emitChange(event);
  }

  private emitChange(event: CustomEvent): void {
    event.stopPropagation();
    const selected = nodeListToArray(this.el.querySelectorAll("calcite-tile-select")).filter(
      (el: HTMLCalciteTileSelectElement) => el.checked
    );
    this.calciteTileSelectGroupChange.emit(selected);
  }

  render(): VNode {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
