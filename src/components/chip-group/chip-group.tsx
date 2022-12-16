import {
  Component,
  h,
  VNode,
  Prop,
  Element,
  Listen,
  EventEmitter,
  Event,
  Host
} from "@stencil/core";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { Scale } from "../interfaces";
import { RequestedItem, SelectedItems } from "./interfaces";

/**
 * @slot - A slot for adding one or more `calcite-chip`.
 */
@Component({
  tag: "calcite-chip-group",
  styleUrl: "chip-group.scss",
  shadow: true
})
export class ChipGroup implements InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteChipGroupElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When true, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the selection mode of the component. */
  @Prop({ reflect: true }) selectionMode: "multiple" | "single" | "single-persist" | "none" =
    "none";

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  /** created list of Chip items */
  private items = [];

  /** keep track of whether the items have been sorted so we don't re-sort */
  private sorted = false;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteChipInternalSelectionChange: EventEmitter<RequestedItem>;

  /**
   * emitted when the selected items change
   */
  @Event({ cancelable: false }) calciteChipGroupChange: EventEmitter<SelectedItems>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  componentDidLoad(): void {
    if (!this.sorted) {
      this.items = this.sortItems(this.items);
      this.sorted = true;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalChipKeyEvent")
  calciteInternalChipKeyEvent(event: CustomEvent): void {
    const item = event.detail.item;
    const parent = event.detail.parent as HTMLCalciteChipGroupElement;
    if (this.el === parent) {
      const { key } = item;
      const itemToFocus = event.target;
      const isFirstItem = this.itemIndex(itemToFocus) === 0;
      const isLastItem = this.itemIndex(itemToFocus) - 1 === this.items.length - 1;
      switch (key) {
        case "ArrowRight":
          if (isLastItem) {
            this.focusFirstItem();
          } else {
            this.focusNextItem(itemToFocus);
          }
          break;
        case "ArrowLeft":
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
    event.stopPropagation();
  }

  @Listen("calciteChipClose")
  calciteChipListener(event: CustomEvent): void {
    const item = event.target;
    let updatedItems = [];
    if (this.items.includes(item)) {
      updatedItems = this.items.filter((el) => el !== item);
      if (this.itemIndex(item) > 0) {
        this.focusPrevItem(item);
      } else {
        this.focusFirstItem();
      }
    }
    this.items = updatedItems;
  }

  @Listen("calciteInternalChipRegister")
  registerCalciteChip(event: CustomEvent): void {
    const item = {
      item: event.target as HTMLCalciteChipElement,
      parent: event.detail.parent as HTMLCalciteChipGroupElement,
      position: (event.detail.position as number) || 0
    };
    if (!this.items.includes(item) && item.parent && this.el === item.parent) {
      this.items.push(item);
    }
    event.stopPropagation();
  }

  @Listen("calciteInternalChipSelect")
  updateActiveItemOnChange(event: CustomEvent): void {
    this.calciteChipInternalSelectionChange.emit({
      requestedChip: event.detail.requestedChip
    });
    const selectedItems = Array.from(this.el.getElementsByTagName("calcite-chip")).filter(
      (el) => el.selected
    );
    this.calciteChipGroupChange.emit({
      selectedItems
    });
  }

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

  private focusNextItem(el): void {
    const index = this.itemIndex(el);
    const nextItem = this.items[index + 1] || this.items[0];
    this.focusElement(nextItem);
  }

  private focusPrevItem(el): void {
    const index = this.itemIndex(el);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    this.focusElement(prevItem);
  }

  private itemIndex(el): number {
    return this.items.indexOf(el);
  }

  private focusElement(item) {
    const target = item as HTMLCalciteChipElement;
    target.setFocus();
  }

  private sortItems = (items: any[]): any[] =>
    items.sort((a, b) => a.position - b.position).map((a) => a.item);

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    let role = "";
    switch (this.selectionMode) {
      case "single":
      case "single-persist":
        role = "radiogroup";
        break;
      case "multiple":
        role = "checkbox";
        break;
    }

    return (
      <Host>
        <div class="container" role={role}>
          <slot />
        </div>
      </Host>
    );
  }
}
