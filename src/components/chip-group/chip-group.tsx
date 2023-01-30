import {
  Component,
  h,
  VNode,
  Prop,
  Element,
  Listen,
  EventEmitter,
  Event,
  Host,
  Watch
} from "@stencil/core";
import { focusElementInGroup } from "../../utils/dom";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { Scale, SelectionMode } from "../interfaces";

/**
 * @slot - A slot for adding one or more `calcite-chip`s.
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

  /** Accessible name for the component. */
  @Prop() label!: string;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the selection mode of the component. */
  @Prop({ reflect: true }) selectionMode: Extract<
    "multiple" | "single" | "single-persist" | "none",
    SelectionMode
  > = "none";

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteChipElement[] = [];

  @Watch("selectedItems")
  onMessagesChange(): void {
    this.calciteChipGroupSelectChange.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------
  mutationObserver = createObserver("mutation", () => this.updateItems);

  /** created list of Chip items */
  private items: HTMLCalciteChipElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   *
   * @internal
   */
  @Event({ cancelable: false })
  calciteChipInternalSelectionChange: EventEmitter<HTMLCalciteChipElement>;

  /**
   * Emits when the component's selection changes.
   */
  @Event({ cancelable: false }) calciteChipGroupSelectChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.updateItems;
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalChipKeyEvent")
  calciteInternalChipKeyEvent(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      console.log(event.detail.key);

      switch (event.detail.key) {
        case "ArrowRight":
          focusElementInGroup(this.items, event.detail.target, "next");
          break;
        case "ArrowLeft":
          focusElementInGroup(this.items, event.detail.target, "previous");
          break;
        case "Home":
          focusElementInGroup(this.items, event.detail.target, "first");
          break;
        case "End":
          focusElementInGroup(this.items, event.detail.target, "last");
          break;
      }
    }
  }

  @Listen("calciteChipClose")
  calciteChipListener(event: CustomEvent): void {
    const item = event.target as HTMLCalciteChipElement;
    if (this.items.includes(item)) {
      if (this.items.indexOf(item) > 0) {
        focusElementInGroup(this.items, item as HTMLCalciteChipElement, "previous");
      } else if (this.items.indexOf(item) === 0) {
        focusElementInGroup(this.items, item as HTMLCalciteChipElement, "next");
      } else {
        focusElementInGroup(this.items, item as HTMLCalciteChipElement, "first");
      }
    }
    this.items = this.items.filter((el) => el !== item);
  }

  @Listen("calciteChipSelect")
  updateActiveItemOnChange(event: CustomEvent): void {
    this.calciteChipInternalSelectionChange.emit(event.target as HTMLCalciteChipElement);
    this.selectedItems = this.items.filter((item) => item.selected);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateItems = (event: Event): void => {
    const updatedChips = (event.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-chip")) as HTMLCalciteChipElement[];

    updatedChips?.map((el) => {
      el.selectable = this.selectionMode !== "none";
      el.selectionMode = this.selectionMode;
    });

    this.items = updatedChips;
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const role =
      this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";

    return (
      <Host>
        <div aria-label={this.label} class="container" role={role}>
          <slot onSlotchange={this.updateItems} />
        </div>
      </Host>
    );
  }
}
