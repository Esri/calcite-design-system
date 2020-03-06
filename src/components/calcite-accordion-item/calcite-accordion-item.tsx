import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop
} from "@stencil/core";
import { UP, DOWN, ENTER, HOME, END, SPACE } from "../../utils/keys";
import { getElementProp } from "../../utils/dom";
import { guid } from "../../utils/guid";

@Component({
  tag: "calcite-accordion-item",
  styleUrl: "calcite-accordion-item.scss",
  shadow: true
})
export class CalciteAccordionItem {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /** pass a title for the accordion item */
  @Prop() itemTitle?: string;

  /** pass a title for the accordion item */
  @Prop() itemSubtitle?: string;
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteAccordionItemKeyEvent: EventEmitter;
  @Event() calciteAccordionItemSelected: EventEmitter;
  @Event() closeCalciteAccordionItem: EventEmitter;
  @Event() registerCalciteAccordionItem: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad() {
    this.itemPosition = this.getItemPosition();
    this.registerCalciteAccordionItem.emit({
      position: this.itemPosition
    });
  }

  render() {

    return (
      <Host tabindex="0" aria-expanded={this.active.toString()}>
        <div class="accordion-item-header" onClick={this.itemHeaderClickHander}>
          <div class="accordion-item-header-text">
          <span class="accordion-item-title">{this.itemTitle}</span>
          <span class="accordion-item-subtitle">{this.itemSubtitle}</span>
          </div>
          <calcite-icon
            class="accordion-item-icon"
            icon={
              this.iconType === "chevron"
                ? "chevronUp"
                : this.iconType === "caret"
                ? "caretUp"
                : this.active
                ? "minus"
                : "plus"
            }
            scale="s"
          ></calcite-icon>
        </div>
        <div class="accordion-item-content">
          <slot />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown") keyDownHandler(e) {
    if (e.target === this.el) {
      switch (e.keyCode) {
        case SPACE:
        case ENTER:
          this.emitRequestedItem();
          e.preventDefault();
          break;
        case UP:
        case DOWN:
        case HOME:
        case END:
          this.calciteAccordionItemKeyEvent.emit({ item: e });
          e.preventDefault();
          break;
      }
    }
  }

  @Listen("calciteAccordionItemHasChanged", { target: "parent" })
  updateActiveItemOnChange(event: CustomEvent) {
    this.requestedAccordionItem = event.detail.requestedAccordionItem;
    this.determineActiveItem();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** unique id for Accordion item */
  private accordionItemId = `calcite-accordion-item-${guid()}`;

  /** position within parent */
  private itemPosition: number;

  /** the latest requested item */
  private requestedAccordionItem: string;

  /** what selection mode is the parent accordion in */
  private selectionMode = getElementProp(this.el, "selection-mode", "multi");

  /** what icon type does the parent accordion specify */
  private iconType = getElementProp(this.el, "icon-type", "chevron");

  /** handle clicks on item header */
  private itemHeaderClickHander = () => this.emitRequestedItem();
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineActiveItem() {
    switch (this.selectionMode) {
      case "multi":
        if (this.accordionItemId === this.requestedAccordionItem)
          this.active = !this.active;
        break;

      case "single":
        if (this.accordionItemId === this.requestedAccordionItem)
          this.active = !this.active;
        else this.active = false;
        break;

      case "single-persist":
        this.active = this.accordionItemId === this.requestedAccordionItem;
        break;
    }
  }

  private emitRequestedItem() {
    this.calciteAccordionItemSelected.emit({
      requestedAccordionItem: this.accordionItemId
    });
  }

  private getItemPosition() {
    const parent = this.el.parentElement as HTMLCalciteAccordionElement;
    return Array.prototype.indexOf.call(
      parent.querySelectorAll("calcite-accordion-item"),
      this.el
    );
  }
}
