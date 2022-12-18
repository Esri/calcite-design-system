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
import { RequestedItem } from "./interfaces";
import { Appearance, Position, Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { SelectionMode } from "../interfaces";
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
  @Prop({ reflect: true }) appearance: Extract<
    "default" | "minimal" | "solid" | "transparent",
    Appearance
  > = "solid";

  /** Specifies the placement of the icon in the header. */
  @Prop({ reflect: true }) iconPosition: Position = "end";

  /** Specifies the type of the icon in the header. */
  @Prop({ reflect: true }) iconType: "chevron" | "caret" | "plus-minus" = "chevron";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("scale")
  onScaleChange(): void {
    this.passPropsToAccordionItems();
  }

  /**
   * Specifies the selection mode - `"multiple"` (allow any number of open items), `"single"` (allow one open item),
   * or `"single-persist"` (allow and require one open item).
   */
  @Prop({ reflect: true }) selectionMode: Extract<
    "single" | "single-persist" | "multiple",
    SelectionMode
  > = "multiple";

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
    this.passPropsToAccordionItems();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  componentDidLoad(): void {
    if (!this.sorted) {
      this.items = this.sortItems(this.items);
      this.sorted = true;
    }
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  render(): VNode {
    const transparent = this.appearance === "transparent";
    const minimal = this.appearance === "minimal";
    return (
      <div
        class={{
          "accordion--transparent": transparent,
          "accordion--minimal": minimal,
          accordion: !transparent && !minimal
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

  @Listen("calciteInternalAccordionItemRegister")
  registerCalciteAccordionItem(event: CustomEvent): void {
    const item = {
      item: event.target as HTMLCalciteAccordionItemElement,
      parent: event.detail.parent as HTMLCalciteAccordionElement,
      position: event.detail.position as number
    };
    if (this.el === item.parent) {
      this.items.push(item);
    }
    event.stopPropagation();
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

  /** keep track of the requested item for multi mode */
  private requestedAccordionItem: HTMLCalciteAccordionItemElement;

  /** keep track of whether the items have been sorted so we don't re-sort */
  private sorted = false;

  mutationObserver = createObserver("mutation", () => this.passPropsToAccordionItems());

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private sortItems = (items: any[]): any[] =>
    items.sort((a, b) => a.position - b.position).map((a) => a.item);

  private passPropsToAccordionItems = (): void => {
    (
      Array.from(
        this.el.querySelectorAll("calcite-accordion-item") as any
      ) as HTMLCalciteAccordionItemElement[]
    ).forEach((accordionItem) => (accordionItem.scale = this.scale));
  };
}
