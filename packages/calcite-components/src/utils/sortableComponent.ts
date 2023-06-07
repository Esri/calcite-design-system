import Sortable from "sortablejs";
import { containsCrossShadowBoundary } from "./dom";
const sortableComponentSet = new Set<SortableComponent>();
const inactiveSortableComponentSet = new WeakSet<SortableComponent>();

interface CanDragEvent {
  toEl: HTMLElement;
  fromEl: HTMLElement;
  dragEl: HTMLElement;
}

/**
 * Defines interface for components with sorting functionality.
 */
export interface SortableComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * When `true`, dragging is enabled.
   */
  dragEnabled: boolean;

  /**
   * Specifies which items inside the element should be draggable.
   */
  dragSelector?: string;

  /**
   * The list's group identifier.
   */
  group?: string;

  /**
   * The selector for the handle elements.
   */
  handleSelector: string;

  /**
   * The Sortable instance.
   */
  sortable: Sortable;

  /**
   *
   */
  onDragStart: (event: Sortable.SortableEvent) => void;

  /**
   *
   */
  onDragEnd: (event: Sortable.SortableEvent) => void;

  /**
   *
   */
  onDragUpdate: (event: Sortable.SortableEvent) => void;

  /**
   *
   */
  onCanPull?: (event: CanDragEvent) => boolean;

  // todo
  /**
   *
   */
  onCanPut?: (event: CanDragEvent) => boolean;
}

/**
 * Helper to keep track of a SortableComponent. This should be called in the `connectedCallback` lifecycle method as well as any other method necessary to rebuild the sortable instance.
 *
 * @param {SortableComponent} component - The sortable component.
 */
export function connectSortableComponent(component: SortableComponent): void {
  disconnectSortableComponent(component);
  sortableComponentSet.add(component);

  if (inactiveSortableComponentSet.has(component)) {
    return;
  }

  const dataIdAttr = "id";
  const { group, handleSelector: handle, dragSelector: draggable } = component;

  component.sortable = Sortable.create(component.el, {
    dataIdAttr,
    ...(!!draggable && { draggable }),
    ...(!!group && {
      group: {
        name: group,
        ...(!!component.onCanPull && {
          pull: (to, from, dragEl) => component.onCanPull({ toEl: to.el, fromEl: from.el, dragEl })
        }),
        ...(!!component.onCanPut && {
          put: (to, from, dragEl) => component.onCanPut({ toEl: to.el, fromEl: from.el, dragEl })
        })
      }
    }),
    handle,
    onStart: (event) => {
      onSortingStart(component);
      component.onDragStart(event);
    },
    onEnd: (event) => {
      onSortingEnd(component);
      component.onDragEnd(event);
    },
    onUpdate: (event) => {
      component.onDragUpdate(event);
    }
  });
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
function onSortingStart(activeComponent: SortableComponent): void {
  getNestedSortableComponents(activeComponent).forEach((component) => inactiveSortableComponentSet.add(component));
}

/**
 * Helper to handle nested SortableComponents on `Sortable.onEnd`.
 *
 * @param {SortableComponent} activeComponent - The active sortable component.
 */
function onSortingEnd(activeComponent: SortableComponent): void {
  getNestedSortableComponents(activeComponent).forEach((component) => inactiveSortableComponentSet.delete(component));
}
