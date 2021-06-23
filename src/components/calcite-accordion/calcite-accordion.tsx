import { Component, Element, Event, EventEmitter, h, Listen, Prop, VNode } from "@stencil/core";
import { getKey } from "../../utils/key";
import { AccordionAppearance } from "./interfaces";
import { Position, Scale } from "../interfaces";

@Component({
  tag: "calcite-accordion",
  styleUrl: "calcite-accordion.scss",
  shadow: true
})
export class CalciteAccordion {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAccordionElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** specify the appearance - default (containing border), or minimal (no containing border), defaults to default */
  @Prop({ reflect: true }) appearance: AccordionAppearance = "default";

  /** specify the placement of the icon in the header, defaults to end */
  @Prop({ reflect: true }) iconPosition: Position = "end";

  /** specify the type of the icon in the header, defaults to chevron */
  @Prop({ reflect: true }) iconType: "chevron" | "caret" | "plus-minus" = "chevron";

  /** specify the scale of accordion, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** specify the selection mode - multi (allow any number of open items), single (allow one open item),
   * or single-persist (allow and require one open item), defaults to multi */
  @Prop({ reflect: true }) selectionMode: "multi" | "single" | "single-persist" = "multi";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteAccordionChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad(): void {
    if (!this.sorted) {
      this.items = this.sortItems(this.items);
      this.sorted = true;
    }
  }

  render(): VNode {
    return <slot />;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteAccordionItemKeyEvent") calciteAccordionItemKeyEvent(e: CustomEvent): void {
    const item = e.detail.item;
    const parent = e.detail.parent as HTMLCalciteAccordionElement;
    if (this.el === parent) {
      const key = getKey(item.key);
      const itemToFocus = e.target;
      const isFirstItem = this.itemIndex(itemToFocus) === 0;
      const isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
      switch (key) {
        case "ArrowDown":
          if (isLastItem) {
            this.focusFirstItem();
          } else {
            this.focusNextItem(itemToFocus);
          }
          break;
        case "ArrowUp":
          if (isFirstItem) {
            this.focusLastItem();
          } else {
            this.focusPrevItem(itemToFocus);
          }
          break;
        case "Home":
          this.focusFirstItem();
          break;
        case "End":
          this.focusLastItem();
          break;
      }
    }
  }

  @Listen("calciteAccordionItemRegister") registerCalciteAccordionItem(e: CustomEvent): void {
    const item = {
      item: e.target as HTMLCalciteAccordionItemElement,
      parent: e.detail.parent as HTMLCalciteAccordionElement,
      position: e.detail.position as number
    };
    if (this.el === item.parent) {
      this.items.push(item);
    }
  }

  @Listen("calciteAccordionItemSelect") updateActiveItemOnChange(event: CustomEvent): void {
    this.requestedAccordionItem = event.detail.requestedAccordionItem;
    this.calciteAccordionChange.emit({
      requestedAccordionItem: this.requestedAccordionItem
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of Accordion items */
  private items = [];

  /** keep track of whether the items have been sorted so we don't re-sort */
  private sorted = false;

  /** keep track of the requested item for multi mode */
  private requestedAccordionItem: HTMLCalciteAccordionItemElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private focusFirstItem() {
    const firstItem = this.items[0];
    this.focusElement(firstItem);
  }

  private focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    this.focusElement(lastItem);
  }

  private focusNextItem(e): void {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    this.focusElement(nextItem);
  }

  private focusPrevItem(e): void {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    this.focusElement(prevItem);
  }

  private itemIndex(e): number {
    return this.items.indexOf(e);
  }

  private focusElement(item) {
    const target = item as HTMLCalciteAccordionItemElement;
    target.focus();
  }

  private sortItems = (items: any[]): any[] =>
    items.sort((a, b) => a.position - b.position).map((a) => a.item);
}
