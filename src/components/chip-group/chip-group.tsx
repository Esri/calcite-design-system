import { Component, h, VNode, Prop, Element, Listen, EventEmitter, Event } from "@stencil/core";
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

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------
  mutationObserver = createObserver("mutation", () => this.updateItems);

  private items: HTMLCalciteChipElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /** Emits when the component's selection changes. */
  @Event({ cancelable: false }) calciteChipGroupSelect: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
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
  calciteInternalChipKeyEventListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      const interactiveItems = this.items.filter((el) => !el.disabled);
      switch (event.detail.key) {
        case "ArrowRight":
          focusElementInGroup(interactiveItems, event.detail.target, "next");
          break;
        case "ArrowLeft":
          focusElementInGroup(interactiveItems, event.detail.target, "previous");
          break;
        case "Home":
          focusElementInGroup(interactiveItems, event.detail.target, "first");
          break;
        case "End":
          focusElementInGroup(interactiveItems, event.detail.target, "last");
          break;
      }
    }
  }

  @Listen("calciteChipClose")
  calciteChipCloseListener(event: CustomEvent): void {
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
  calciteChipSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(event);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateItems = (event: Event): void => {
    this.items = (event.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-chip")) as HTMLCalciteChipElement[];

    this.items.forEach((el) => {
      el.selectionMode = this.selectionMode;
    });

    this.setSelectedItems();
  };

  private setSelectedItems = (event?: Event): void => {
    if (event) {
      this.items.forEach((el) => {
        const matchingEl = event.target === el;
        switch (this.selectionMode) {
          case "multiple":
            if (matchingEl) {
              el.selected = !el.selected;
            }
            break;

          case "single":
            el.selected = matchingEl ? !el.selected : false;
            break;

          case "single-persist":
            el.selected = !!matchingEl;
            break;
        }
      });
    }

    this.selectedItems = this.items.filter((el) => el.selected);

    if (event) {
      this.calciteChipGroupSelect.emit();
    }
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
      <div aria-label={this.label} class="container" role={role}>
        <slot onSlotchange={this.updateItems} />
      </div>
    );
  }
}
