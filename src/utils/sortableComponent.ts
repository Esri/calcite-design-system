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
 * Helper to keep track of a SortableComponent. This should be called in the `connectedCallback` lifecycle method as well as any other method necessary to rebuild the sortable instance.
 *
 * @param {SortableComponent} component - The sortable component.
 * @param {HTMLElement} element - Any variety of HTMLElement.
 * @param {SortableComponent} [options] - Sortable options object.
 */
export function connectSortableComponent(
  component: SortableComponent,
  element: HTMLElement,
  options?: Sortable.Options
): void {
  disconnectSortableComponent(component);
  sortableComponentSet.add(component);

  if (inactiveSortableComponentSet.has(component)) {
    return;
  }

  component.sortable = Sortable.create(element, options);
}

/**
 * Helper to remove track of a SortableComponent. This should be called in the `disconnectedCallback` lifecycle method.
 *
 * @param {SortableComponent} component - The sortable component.
 */
export function disconnectSortableComponent(component: SortableComponent): void {
  sortableComponentSet.delete(component);

  if (inactiveSortableComponentSet.has(component)) {
    return;
  }

  component.sortable?.destroy();
  component.sortable = null;
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
