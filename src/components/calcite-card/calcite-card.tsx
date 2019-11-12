import {
    Component,
    Element,
    Event,
    EventEmitter,
    Host,
    Prop,
    State,
    Watch,
    h
} from "@stencil/core";

import { CSS } from "./resources";
import CalciteIcon from "../utils/CalciteIcon";
import CalciteScrim from "../utils/CalciteScrim";

/**
 * @slot thumbnail - [Required] A slot for adding a thumnail to the card.
 * @slot heading - A slot for adding a heading and an icon to the card.
 * * @slot action - A slot for adding a single action as a button.
 * @slot footer-leading - A slot for adding a leading footer.
 * @slot footer-trailing - A slot for adding a trailing footer.
 */

@Component({
    tag: "calcite-card",
    styleUrl: "./calcite-card.scss",
    shadow: true
})
export class CalciteCard {
// --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, the card can't be clicked and is visually muted.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, the cards content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Indicates whether the image's height or width is prioritized. 
   */
  @Prop({ reflect: true }) imgHeightPriority = false;

  /**
   * The scale of the image.
   */
  @Prop({ reflect: true }) imageScale: "s" | "m" | "l" = "m";

  /**
   * Indicates whether the card is selected. Toggles when a card is clicked.
   */
  @Prop({ reflect: true}) selected = false;

  @Watch("selected")
  selectedWatchHandler(newValue) {
      if(this.isSelected !== newValue) {
          this.isSelected = newValue;
          this.emitChangeEvent();
      }
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted whenever the card is selected or unselected.
   * @event calciteCardChange
   */
  @Event() calciteCardChange: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteCardElement;

  @State() isSelected = this.selected;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  cardClickHandler = (event: MouseEvent): void => {
      if (this.disabled) {
          return;
      }
      this.isSelected = !this.isSelected;
      this.emitChangeEvent(event);
  };

  emitChangeEvent(event: MouseEvent) {
      this.calciteCardChange.emit({
          item: this.selected, 
          selected: this.isSelected
      });
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------




}