import Sortable from "sortablejs";
import { containsCrossShadowBoundary } from "./dom";
const sortableComponentSet = new Set<SortableComponent>();
const inactiveSortableComponentSet = new WeakSet<SortableComponent>();

/**
 * Defines interface for components with sorting functionality.
 */
export interface SortableComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * The Sortable instance.
   */
  sortable: Sortable;
}

/**
 * Helper to keep track of a SortableComponent. This should be called in the `connectedCallback` lifecycle method as well as any other method necessary to rebuild the sortable instance.
 *
 * @param {SortableComponent} component - The sortable component.
 * @param {SortableComponent} [options] - Sortable options object.
 */
export function connectSortableComponent(component: SortableComponent, options?: Sortable.Options): void {
  disconnectSortableComponent(component);
  sortableComponentSet.add(component);

  if (inactiveSortableComponentSet.has(component)) {
    return;
  }

  component.sortable = Sortable.create(component.el, options);
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

function getNestedSortableComponents(activeComponent: SortableComponent): SortableComponent[] {
  return Array.from(sortableComponentSet).filter(
    (component) => component !== activeComponent && containsCrossShadowBoundary(activeComponent.el, component.el)
  );
}

/**
 * Helper to handle nested SortableComponents on `Sortable.onStart`.
 *
 * @param {SortableComponent} activeComponent - The active sortable component.
 */
export function onSortingStart(activeComponent: SortableComponent): void {
  getNestedSortableComponents(activeComponent).forEach((component) => {
    inactiveSortableComponentSet.add(component);
  });
}

/**
 * Helper to handle nested SortableComponents on `Sortable.onEnd`.
 *
 * @param {SortableComponent} activeComponent - The active sortable component.
 */
export function onSortingEnd(activeComponent: SortableComponent): void {
  getNestedSortableComponents(activeComponent).forEach((component) => {
    inactiveSortableComponentSet.delete(component);
  });
}
