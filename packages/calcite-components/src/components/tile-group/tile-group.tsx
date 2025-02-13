// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Alignment, Layout, Scale, SelectionAppearance, SelectionMode } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { focusElementInGroup } from "../../utils/dom";
import { SelectableGroupComponent } from "../../utils/selectableComponent";
import type { Tile } from "../tile/tile";
import { CSS } from "./resources";
import { styles } from "./tile-group.scss";

declare global {
  interface DeclareElements {
    "calcite-tile-group": TileGroup;
  }
}

/** @slot - A slot for adding `calcite-tile` elements. */
export class TileGroup
  extends LitElement
  implements InteractiveComponent, SelectableGroupComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private items: Tile["el"][] = [];

  private mutationObserver = createObserver("mutation", () => this.updateTiles());

  private slotEl: HTMLSlotElement;

  // #endregion

  // #region Public Properties

  /** Specifies the alignment of each `calcite-tile`'s content. */
  @property({ reflect: true }) alignment: Exclude<Alignment, "end"> = "start";

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /**
   * Defines the layout of the component.
   *
   * Use `"horizontal"` for rows, and `"vertical"` for a single column.
   */
  @property({ reflect: true }) layout: Extract<Layout, "horizontal" | "vertical"> = "horizontal";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @property() selectedItems: Tile["el"][] = [];

  /**
   * Specifies the selection appearance, where:
   *
   * - `"icon"` (displays a checkmark or dot), or
   * - `"border"` (displays a border).
   */
  @property({ reflect: true }) selectionAppearance: SelectionAppearance = "icon";

  /**
   * Specifies the selection mode, where:
   *
   * - `"multiple"` (allows any number of selected items),
   * - `"single"` (allows only one selected item),
   * - `"single-persist"` (allows only one selected item and prevents de-selection),
   * - `"none"` (allows no selected items).
   */
  @property({ reflect: true }) selectionMode: Extract<
    "multiple" | "none" | "single" | "single-persist",
    SelectionMode
  > = "none";

  // #endregion

  // #region Events

  /** Fires when the component's selection changes. */
  calciteTileGroupSelect = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalTileKeyEvent", this.calciteInternalTileKeyEventListener);
    this.listen("calciteTileSelect", this.calciteTileSelectHandler);
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true });
    this.updateTiles();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) ||
      (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none")) ||
      (changes.has("selectionAppearance") &&
        (this.hasUpdated || this.selectionAppearance !== "icon"))
    ) {
      this.updateTiles();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    this.updateSelectedItems();
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods
  private getSlottedTiles(): Tile["el"][] {
    return this.slotEl
      ?.assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-tile")) as Tile["el"][];
  }

  private selectItem(item: Tile["el"]): void {
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
  }

  private setSlotEl(el: HTMLSlotElement): void {
    this.slotEl = el;
  }

  private updateSelectedItems(): void {
    const selectedItems = this.items?.filter((el) => el.selected);
    if (
      (this.selectionMode === "single" || this.selectionMode === "single-persist") &&
      selectedItems?.length > 1
    ) {
      this.selectedItems = [selectedItems.pop()];
      this.items?.forEach((el) => {
        if (this.selectedItems.indexOf(el) === -1) {
          el.selected = false;
        }
      });
    } else {
      this.selectedItems = selectedItems ?? [];
    }
  }

  private updateTiles(): void {
    this.items = this.getSlottedTiles();
    this.items?.forEach((el) => {
      el.alignment = this.alignment;
      el.interactive = true;
      el.layout = this.layout;
      el.scale = this.scale;
      el.selectionAppearance = this.selectionAppearance;
      el.selectionMode = this.selectionMode;
    });
    this.updateSelectedItems();
  }

  private calciteInternalTileKeyEventListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      event.preventDefault();
      event.stopPropagation();
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

  private calciteTileSelectHandler(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.selectItem(event.target as Tile["el"]);
    }
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const role =
      this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div ariaLabel={this.label} class={CSS.container} role={role}>
          <slot onSlotChange={this.updateTiles} ref={this.setSlotEl} />
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
