import Sortable from "sortablejs";
const sortableComponentSet = new Set<SortableComponent>();
const inactiveSortableComponentSet = new WeakSet<SortableComponent>();

/**
 * Defines interface for components with sorting functionality.
 */
export interface SortableComponent {
  /**
   * The Sortable instance.
   */
  sortable: Sortable;
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
  sortableDestroy(component);
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
      inactiveSortableComponentSet.add(component);
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
      inactiveSortableComponentSet.delete(component);
    }
  });
}

/**
 * Method to set up Sortable within the SortableComponent.
 *
 * This should be implemented for components that allow users to drag and sort content within the component.
 *
 * @param {SortableComponent} component - The sortable component.
 * @param {HTMLElement} element - Any variety of HTMLElement.
 * @param {SortableComponent} [options] - Sortable options object.
 */
export function sortableSetUp(
  component: SortableComponent,
  element: HTMLElement,
  options?: Sortable.Options
): Sortable {
  if (inactiveSortableComponentSet.has(component)) {
    return;
  }

  sortableDestroy(component);
  component.sortable = Sortable.create(element, options);
}

function sortableDestroy(component: SortableComponent): Sortable {
  if (inactiveSortableComponentSet.has(component)) {
    return;
  }

  component.sortable?.destroy();
  component.sortable = null;
}
