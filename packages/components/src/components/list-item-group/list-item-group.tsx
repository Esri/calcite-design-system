import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import { MAX_COLUMNS } from "../list-item/resources";
import { Scale } from "../types";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS } from "./resources";
import { styles } from "./list-item-group.scss";
import { getListStructureFromElements } from "../list-item/utils";
import type { ListItem } from "../list-item/list-item";

declare global {
  interface DeclareElements {
    "calcite-list-item-group": ListItemGroup;
  }
}
/** @slot - A slot for adding `calcite-list-item` and `calcite-list-item-group` elements. */
export class ListItemGroup extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private interactiveContainer = useInteractive(this);

  private defaultSlotEl?: HTMLSlotElement;

  //#endregion

  //#region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Hides the component when filtered.
   *
   * @private
   */
  @property({ reflect: true }) filterHidden = false;

  /** @copyDoc */
  @property({ reflect: true }) heading?: string;

  /**
   * Specifies the size of the component.
   *
   * @internal
   * */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the group's `calcite-list-item`s.
   *
   * @internal
   * @readonly
   */
  @property({ attribute: false }) listItems: ListItem["el"][] = [];

  /**
   * Specifies the group's direct child `calcite-list-item-group`s.
   *
   * @internal
   * @readonly
   */
  @property({ attribute: false }) childListItemGroups: ListItemGroup["el"][] = [];

  //#endregion

  //#region Events

  /**
   * Fires when changes occur in the default slot, notifying parent lists of the changes.
   *
   * @private
   */
  calciteInternalListItemGroupDefaultSlotChange = createEvent({ cancelable: false });

  /**
   * Fires when group property changes should notify parent lists.
   *
   * @private
   */
  calciteInternalListItemGroupChange = createEvent({ cancelable: false });

  /** Fires when the component's slotted `calcite-list-item`s change. */
  calciteInternalListItemGroupItemsChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen<CustomEvent<void>>(
      "calciteInternalListItemGroupItemsChange",
      this.handleCalciteInternalListItemGroupItemsChange,
    );
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("heading")) {
      this.calciteInternalListItemGroupChange.emit();
    }

    if (changes.has("scale") && this.hasUpdated) {
      this.updateChildGroupScale();
    }
  }

  //#endregion

  //#region Private Methods

  private handleCalciteInternalListItemGroupItemsChange(event: CustomEvent<void>): void {
    if (event.target === this) {
      return;
    }

    event.stopPropagation();
    this.updateItemsAndEmitChange();
  }

  private getDescendantGroups(groups: ListItemGroup["el"][]): ListItemGroup["el"][] {
    return groups.flatMap((group) => [
      group,
      ...this.getDescendantGroups(group.childListItemGroups ?? []),
    ]);
  }

  private updateChildGroupScale(
    childGroups: ListItemGroup["el"][] = this.childListItemGroups,
  ): void {
    this.getDescendantGroups(childGroups).forEach((group) => {
      group.scale = this.scale;
    });
  }

  private getSlottedStructure(): {
    listItems: ListItem["el"][];
    childListItemGroups: ListItemGroup["el"][];
  } {
    if (!this.defaultSlotEl) {
      return {
        listItems: [],
        childListItemGroups: [],
      };
    }

    const directAssignedElements = this.defaultSlotEl.assignedElements({ flatten: true });
    const directChildListItemGroups = directAssignedElements.filter(
      (element): element is ListItemGroup["el"] => element.matches("calcite-list-item-group"),
    );

    const { items: listItems } = getListStructureFromElements(directAssignedElements);

    return {
      listItems,
      childListItemGroups: directChildListItemGroups,
    };
  }

  private updateItemsAndEmitChange(): void {
    const { childListItemGroups, listItems } = this.getSlottedStructure();
    this.updateChildGroupScale(childListItemGroups);

    const listItemsChanged =
      listItems.length !== this.listItems.length ||
      !listItems.every((item, index) => item === this.listItems[index]);

    const childListItemGroupsChanged =
      childListItemGroups.length !== this.childListItemGroups.length ||
      !childListItemGroups.every((group, index) => group === this.childListItemGroups[index]);

    if (!listItemsChanged && !childListItemGroupsChanged) {
      return;
    }

    this.listItems = listItems;
    this.childListItemGroups = childListItemGroups;
    this.calciteInternalListItemGroupItemsChange.emit();
  }

  private setDefaultSlotEl(el: HTMLSlotElement): void {
    this.defaultSlotEl = el;
  }

  private handleDefaultSlotChange(): void {
    this.calciteInternalListItemGroupDefaultSlotChange.emit();
    this.updateItemsAndEmitChange();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { disabled, heading } = this;
    return (
      <this.interactiveContainer disabled={disabled}>
        <div class={CSS.container} role="row">
          <div ariaColSpan={MAX_COLUMNS} class={CSS.heading} role="cell">
            {heading}
          </div>
        </div>
        <slot onSlotChange={this.handleDefaultSlotChange} ref={this.setDefaultSlotEl} />
      </this.interactiveContainer>
    );
  }

  //#endregion
}
