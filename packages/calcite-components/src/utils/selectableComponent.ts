import { SelectionMode } from "../components";

/**
 * Defines interface for group components that manage selection behavior of their children.
 */
export interface SelectableGroupComponent {
  /**
   * An array of the selected items.
   */
  selectedItems: SelectableComponent[];
  /**
   * Controls how items can be selected.
   */
  selectionMode: Partial<SelectionMode>;
}

/**
 * Defines interface for selectable components.
 */
export interface SelectableComponent {
  /**
   * The selected state of the component.
   *
   * @internal
   */
  selected: boolean;
}
