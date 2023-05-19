import Sortable from "sortablejs";
const sortableComponentSet = new Set<SortableComponent>();

/**
 * Defines interface for components with sorting functionality.
 */
export interface SortableComponent {
  /**
   * The Sortable instance.
   */
  sortable: Sortable;

  /**
   * Method to set up Sortable within the SortableComponent.
   *
   * This should be implemented for components that allow users to drag and sort content within the component.
   */
  setUpSorting: () => void;

  /**
   * Method to tear down Sortable within the SortableComponent.
   *
   * This should be implemented for components that allow users to drag and sort content within the component.
   */
  cleanUpSorting: () => void;

  /**
   * Defines method for the `onSortingDisabled` event handler.
   */
  onSortingDisabled: () => void;

  /**
   * Defines method for the `onSortingEnabled` event handler.
   */
  onSortingEnabled: () => void;
}

/**
 * Helper to keep track of a SortableComponent.
 *
 * @param {SortableComponent} component - The sortable component.
 */
export function connectSortableComponent(component: SortableComponent): void {
  sortableComponentSet.add(component);
}

/**
 * Helper to remove track of a SortableComponent.
 *
 * @param {SortableComponent} component - The sortable component.
 */
export function disconnectSortableComponent(component: SortableComponent): void {
  sortableComponentSet.delete(component);
}

/**
 * Helper to deactivate other SortableComponent listeners on `Sortable.onStart`.
 *
 * @param {SortableComponent} activeComponent - The active sortable component.
 */
export function onSortingStart(activeComponent: SortableComponent): void {
  sortableComponentSet.forEach((component) => {
    if (component !== activeComponent) {
      component.onSortingDisabled();
    }
  });
}

/**
 * Helper to reactivate other SortableComponent listeners on `Sortable.onEnd`.
 *
 * @param {SortableComponent} activeComponent - The active sortable component.
 */
export function onSortingEnd(activeComponent: SortableComponent): void {
  sortableComponentSet.forEach((component) => {
    if (component !== activeComponent) {
      component.onSortingEnabled();
    }
  });
}
