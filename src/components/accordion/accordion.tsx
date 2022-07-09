import { Component, Element, Event, EventEmitter, h, Listen, Prop, VNode } from "@stencil/core";
import { AccordionAppearance } from "./interfaces";
import { Position, Scale } from "../interfaces";

/**
 * @slot - A slot for adding `calcite-accordion-item`s. `calcite-accordion` cannot be nested, however `calcite-accordion-item`s can.
 */
@Component({
  tag: "calcite-accordion",
  styleUrl: "accordion.scss",
  shadow: true
})
export class Accordion {
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

  /** Specifies the appearance of the component. */
  @Prop({ reflect: true }) appearance: AccordionAppearance = "default";

  /** Specifies the placement of the icon in the header. */
  @Prop({ reflect: true }) iconPosition: Position = "end";

  /** Specifies the type of the icon in the header. */
  @Prop({ reflect: true }) iconType: "chevron" | "caret" | "plus-minus" = "chevron";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the selection mode - "multi" (allow any number of open items), "single" (allow one open item),
   * or "single-persist" (allow and require one open item).
   */
  @Prop({ reflect: true }) selectionMode: "multi" | "single" | "single-persist" = "multi";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteInternalAccordionChange: EventEmitter;

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
    return (
      <div
        class={{
          "accordion--transparent": this.appearance === "transparent",
          "accordion--minimal": this.appearance === "minimal",
          accordion: this.appearance === "default"
        }}
      >
        <slot />
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalAccordionItemKeyEvent")
  calciteInternalAccordionItemKeyEvent(e: CustomEvent): void {
    const item = e.detail.item;
    const parent = e.detail.parent as HTMLCalciteAccordionElement;
    if (this.el === parent) {
      const key = item.key;
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
    e.stopPropagation();
  }

  @Listen("calciteInternalAccordionItemRegister")
  registerCalciteAccordionItem(e: CustomEvent): void {
    const item = {
      item: e.target as HTMLCalciteAccordionItemElement,
      parent: e.detail.parent as HTMLCalciteAccordionElement,
      position: e.detail.position as number
    };
    if (this.el === item.parent) {
      this.items.push(item);
    }
    e.stopPropagation();
  }

  @Listen("calciteInternalAccordionItemSelect")
  updateActiveItemOnChange(event: CustomEvent): void {
    this.requestedAccordionItem = event.detail.requestedAccordionItem;
    this.calciteInternalAccordionChange.emit({
      requestedAccordionItem: this.requestedAccordionItem
    });
    event.stopPropagation();
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
    target?.focus();
  }

  private sortItems = (items: any[]): any[] =>
    items.sort((a, b) => a.position - b.position).map((a) => a.item);
}
