import { PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
import { LitElement, property, createEvent, h, JsxNode, ToEvents } from "@arcgis/lumina";
import { MAX_COLUMNS } from "../list-item/resources";
import { Scale } from "../types";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS, isListItemGroup } from "./resources";
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

  private defaultSlotRef = createRef<HTMLSlotElement>();

  private _items: ListItem["el"][] = [];

  private _groups: ListItemGroup["el"][] = [];

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
   */
  @property() get items(): ListItem["el"][] {
    return this._items;
  }

  /**
   * Specifies the group's direct child `calcite-list-item-group`s.
   *
   * @internal
   */
  @property() get groups(): ListItemGroup["el"][] {
    return this._groups;
  }

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
    this.listen<ToEvents<ListItemGroup>["calciteInternalListItemGroupItemsChange"]>(
      "calciteInternalListItemGroupItemsChange",
      this.handleInternalListItemGroupItemsChange,
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

  private handleInternalListItemGroupItemsChange(event: CustomEvent<void>): void {
    if (event.target === this) {
      return;
    }

    event.stopPropagation();
    this.updateItemsAndEmitChange();
  }

  private updateChildGroupScale(groups: ListItemGroup["el"][] = this.groups): void {
    const groupStack = [...groups];

    while (groupStack.length > 0) {
      const group = groupStack.pop()!;
      group.scale = this.scale;
      groupStack.push(...group.groups);
    }
  }

  private getSlottedStructure(): {
    items: ListItem["el"][];
    groups: ListItemGroup["el"][];
  } {
    if (!this.defaultSlotRef.value) {
      return {
        items: [],
        groups: [],
      };
    }

    const directAssignedElements = this.defaultSlotRef.value.assignedElements({ flatten: true });
    const groups = directAssignedElements.filter(isListItemGroup);
    const { items } = getListStructureFromElements(directAssignedElements);

    return { items, groups };
  }

  private updateItemsAndEmitChange(): void {
    const { groups, items } = this.getSlottedStructure();
    this.updateChildGroupScale(groups);

    const itemsChanged =
      items.length !== this._items.length ||
      !items.every((item, index) => item === this._items[index]);

    const groupsChanged =
      groups.length !== this._groups.length ||
      !groups.every((group, index) => group === this._groups[index]);

    if (!itemsChanged && !groupsChanged) {
      return;
    }

    this._items = items;
    this._groups = groups;
    this.calciteInternalListItemGroupItemsChange.emit();
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
        <slot onSlotChange={this.handleDefaultSlotChange} ref={this.defaultSlotRef} />
      </this.interactiveContainer>
    );
  }

  //#endregion
}
