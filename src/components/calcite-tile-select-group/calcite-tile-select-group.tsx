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
   * Curretly selected tile for single select (radio) tile groups
   * @readonly
   */
  @Prop({ mutable: true }) selectedTile: HTMLCalciteTileSelectElement;

  /**
   * Curretly selected tiles for multi-select (checkbox) tile groups
   * @readonly
   */
  @Prop({ mutable: true }) selectedTiles: HTMLCalciteTileSelectElement[];

  /**
   * Fired when tiles are selected/deselected
   */
  @Event() calciteTileSelectGroupChange: EventEmitter;

  @Listen("calciteRadioButtonChange")
  radioButtonChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.selectedTile = this.getSelectedTiles()?.[0];
    this.calciteTileSelectGroupChange.emit();
  }

  @Listen("calciteCheckboxChange")
  checkboxChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.selectedTiles = this.getSelectedTiles();
    this.calciteTileSelectGroupChange.emit();
  }

  private getSelectedTiles(): HTMLCalciteTileSelectElement[] {
    return Array.from(this.el.querySelectorAll("calcite-tile-select")).filter(
      (el: HTMLCalciteTileSelectElement) => el.checked
    );
  }

  render(): VNode {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
