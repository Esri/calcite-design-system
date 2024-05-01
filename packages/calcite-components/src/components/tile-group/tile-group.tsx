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
import { createObserver } from "../../utils/observers";
import { focusElementInGroup } from "../../utils/dom";
import { SelectableGroupComponent } from "../../utils/selectableComponent";
import { CSS } from "./resources";

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
    this.updateTiles();
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
    this.updateTiles();
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

  private getSlottedTiles = (): HTMLCalciteTileElement[] => {
    return this.slotEl
      ?.assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-tile")) as HTMLCalciteTileElement[];
  };

  private mutationObserver = createObserver("mutation", () => this.updateTiles());

  private selectItem = (item: HTMLCalciteTileElement): void => {
    if (!item) {
      return;
    }
    this.items?.forEach((el) => {
      const matchingEl = item === el;
      switch (this.selectionMode) {
        case "multiple":
          if (matchingEl) {
            el.selected = !el.selected;
          }
          break;

        case "single":
          el.selected = matchingEl && !el.selected;
          break;

        case "single-persist":
          el.selected = !!matchingEl;
          break;
      }
    });
    this.updateSelectedItems();
    this.calciteTileGroupSelect.emit();
  };

  private setSlotEl = (el: HTMLSlotElement): void => {
    this.slotEl = el;
  };

  private updateSelectedItems = (): void => {
    this.selectedItems = this.items?.filter((el) => el.selected);
  };

  private updateTiles = (): void => {
    this.items = this.getSlottedTiles();
    this.items?.forEach((el) => {
      el.interactive = true;
      el.layout = this.layout;
      el.scale = this.scale;
      el.selectionAppearance = this.selectionAppearance;
      el.selectionMode = this.selectionMode;
    });
    this.updateSelectedItems();
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
    this.mutationObserver?.observe(this.el, { childList: true });
    this.updateTiles();
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

  @Listen("keydown")
  keyDownEventListener(event: KeyboardEvent): void {
    if (event.composedPath().includes(this.el)) {
      event.preventDefault();
      event.stopPropagation();
      const interactiveItems = this.items?.filter((el) => !el.disabled);

      const key = event.key;
      const toDirection =
        key === "ArrowRight" || key === "ArrowDown"
          ? "next"
          : key === "ArrowLeft" || key === "ArrowUp"
            ? "previous"
            : key === "Home"
              ? "first"
              : key === "End"
                ? "last"
                : null;

      if (!toDirection) {
        return;
      }

      event.preventDefault();
      focusElementInGroup(interactiveItems, event.target as HTMLCalciteCardElement, toDirection);
    }
  }

  @Listen("calciteTileSelect")
  calciteTileSelectHandler(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.selectItem(event.target as HTMLCalciteTileElement);
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
          <slot
            onSlotchange={this.updateTiles}
            // eslint-disable-next-line react/jsx-sort-props -- auto-generated by @esri/calcite-components/enforce-ref-last-prop
            ref={this.setSlotEl}
          />
        </div>
      </InteractiveContainer>
    );
  }
}
