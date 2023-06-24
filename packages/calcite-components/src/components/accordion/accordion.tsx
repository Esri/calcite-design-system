import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  VNode,
  Watch
} from "@stencil/core";
import { Appearance, Position, Scale, SelectionMode } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { RequestedItem } from "./interfaces";
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

  /** Specifies the parent of the component. */
  @Prop({ reflect: true }) accordionParent: HTMLCalciteAccordionElement;

  /** Specifies the appearance of the component. */
  @Prop({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> = "solid";

  /** Specifies the placement of the icon in the header. */
  @Prop({ reflect: true }) iconPosition: Position = "end";

  /** Specifies the type of the icon in the header. */
  @Prop({ reflect: true }) iconType: "chevron" | "caret" | "plus-minus" = "chevron";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the selection mode - `"multiple"` (allow any number of open items), `"single"` (allow one open item),
   * or `"single-persist"` (allow and require one open item).
   */
  @Prop({ reflect: true }) selectionMode: Extract<
    "single" | "single-persist" | "multiple",
    SelectionMode
  > = "multiple";

  @Watch("iconPosition")
  @Watch("iconType")
  @Watch("scale")
  @Watch("selectionMode")
  handlePropsChange(): void {
    this.updateAccordionItems();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalAccordionChange: EventEmitter<RequestedItem>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true });
    this.updateAccordionItems();
  }

  componentDidLoad(): void {
    if (!this.sorted) {
      this.accordionItems = this.sortItems(this.accordionItems);
      this.sorted = true;
    }
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  render(): VNode {
    const transparent = this.appearance === "transparent";
    return (
      <div
        class={{
          "accordion--transparent": transparent,
          accordion: !transparent
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

  mutationObserver = createObserver("mutation", (mutationList) => {
    let addedAccordionItem: HTMLCalciteAccordionItemElement;
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        const addedNodes = Array.from(mutation.addedNodes);
        addedAccordionItem = addedNodes.find(
          (node) => node instanceof HTMLCalciteAccordionItemElement
        ) as HTMLCalciteAccordionItemElement;
      }
    }
    const childNodes = Array.from(this.el.childNodes);
    const position = childNodes.indexOf(addedAccordionItem);
    this.updateAccordionItems(addedAccordionItem, position);
  });

  /** list of `accordion-item`s */
  accordionItems: {
    accordionItem: HTMLCalciteAccordionItemElement;
    position: number;
  }[] = [];

  /** keep track of whether the items have been sorted so we don't re-sort */
  private sorted = false;

  /** keep track of the requested item for multi mode */
  private requestedAccordionItem: HTMLCalciteAccordionItemElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateAccordionItems = (
    addedAccordionItem?: HTMLCalciteAccordionItemElement,
    position?: number
  ): void => {
    if (addedAccordionItem) {
      this.accordionItems.push({ accordionItem: addedAccordionItem, position: position });
    } else {
      const accordionItemsQueryArray = Array.from(
        this.el.querySelectorAll("calcite-accordion-item")
      );
      this.accordionItems = accordionItemsQueryArray.map((_item, index) => {
        return { accordionItem: accordionItemsQueryArray[index], position: null };
      });
    }

    this.accordionItems.forEach((object) => {
      const accordionItem = object.accordionItem;
      accordionItem.iconPosition = this.iconPosition;
      accordionItem.iconType = this.iconType;
      accordionItem.selectionMode = this.selectionMode;
      accordionItem.scale = this.scale;
      accordionItem.accordionParent = this.el;
    });
  };

  private sortItems = (
    accordionItems: { accordionItem: HTMLCalciteAccordionItemElement; position: number }[]
  ): any[] => accordionItems.sort((a, b) => a.position - b.position).map((a) => a.accordionItem);
}
