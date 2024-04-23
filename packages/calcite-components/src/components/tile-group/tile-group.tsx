import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  VNode,
  Watch,
} from "@stencil/core";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Layout, Scale, SelectionAppearance, SelectionMode } from "../interfaces";
import { CSS } from "./resources";
import { createObserver } from "../../utils/observers";
import { focusElementInGroup } from "../../utils/dom";
import { SelectableGroupComponent } from "../../utils/selectableComponent";

/**
 * @slot - A slot for adding `calcite-tile` elements.
 */
@Component({
  tag: "calcite-tile-group",
  styleUrl: "tile-group.scss",
  shadow: true,
})
export class TileGroup implements InteractiveComponent, SelectableGroupComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** Accessible name for the component. */
  @Prop() label!: string;

  /**
   * Defines the layout of the component.
   *
   * Use `"horizontal"` for rows, and `"vertical"` for a single column.
   */
  @Prop({ reflect: true }) layout: Exclude<Layout, "grid"> = "horizontal";

  /**
   * Specifies the size of the component.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("scale")
  scaleWatcher(): void {
    this.updateItems();
  }

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteTileElement[] = [];

  /**
   * Specifies the selection appearance, where:
   *
   * - `"icon"` (displays a checkmark or dot), or
   * - `"border"` (displays a border).
   */
  @Prop({ reflect: true }) selectionAppearance: SelectionAppearance = "icon";

  /**
   * Specifies the selection mode, where:
   *
   * - `"multiple"` (allows any number of selected items),
   * - `"single"` (allows only one selected item),
   * - `"single-persist"` (allows only one selected item and prevents de-selection),
   * - `"none"` (allows no selected items).
   */
  @Prop({ reflect: true }) selectionMode: Extract<
    "multiple" | "none" | "single" | "single-persist",
    SelectionMode
  > = "none";

  @Watch("selectionMode")
  @Watch("selectionAppearance")
  handleSelectionModeOrAppearanceChange(): void {
    this.updateItems();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTileGroupElement;

  private items: HTMLCalciteTileElement[] = [];

  private slotEl: HTMLSlotElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private mutationObserver = createObserver("mutation", () => this.updateItems());

  private setSelectedItems = (emit: boolean, elToMatch?: HTMLCalciteTileElement): void => {
    if (elToMatch) {
      this.items?.forEach((el) => {
        const matchingEl = elToMatch === el;
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

    this.selectedItems = this.items?.filter((el) => el.selected);

    if (emit) {
      this.calciteTileGroupSelect.emit();
    }
  };

  private setSlotEl = (el: HTMLSlotElement): void => {
    this.slotEl = el;
  };

  private updateItems = (event?: Event): void => {
    const target = event ? (event.target as HTMLSlotElement) : this.slotEl;
    this.items = target
      ?.assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-tile")) as HTMLCalciteTileElement[];

    this.items?.forEach((el) => {
      el.interactive = true;
      el.layout = this.layout;
      el.scale = this.scale;
      el.selectionAppearance = this.selectionAppearance;
      el.selectionMode = this.selectionMode;
    });

    this.setSelectedItems(false);
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the component's selection changes. */
  @Event({ cancelable: false }) calciteTileGroupSelect: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.updateItems();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    this.mutationObserver?.disconnect();
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalTileKeyEvent")
  calciteInternalTileKeyEventListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      const interactiveItems = this.items?.filter((el) => !el.disabled);
      switch (event.detail.key) {
        case "ArrowDown":
        case "ArrowRight":
          focusElementInGroup(interactiveItems, event.detail.target, "next");
          break;
        case "ArrowUp":
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

  @Listen("calciteTileSelect")
  calciteTileSelectHandler(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(true, event.target as HTMLCalciteTileElement);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const role =
      this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div aria-label={this.label} class={CSS.container} role={role}>
          <slot onSlotchange={this.updateItems} ref={this.setSlotEl} />
        </div>
      </InteractiveContainer>
    );
  }
}
