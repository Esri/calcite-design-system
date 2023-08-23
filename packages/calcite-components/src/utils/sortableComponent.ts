import Sortable from "sortablejs";
import { containsCrossShadowBoundary } from "./dom";
const sortableComponentSet = new Set<SortableComponent>();
const inactiveSortableComponentSet = new WeakSet<SortableComponent>();

export interface DragEvent {
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
   * Whether the element can move from the list.
   */
  canPull: (event: DragEvent) => boolean;

  /**
   * Whether the element can be added from another list.
   */
  canPut: (event: DragEvent) => boolean;

  /**
   * Called when an item is dropped into the list from another list.
   */
  onDragAdd?: (event: Sortable.SortableEvent) => void;

  /**
   * Called when an item is removed from the list into another list.
   */
  onDragRemove?: (event: Sortable.SortableEvent) => void;

  /**
   * Called by any change to the list (add / update / remove).
   */
  onDragSort: (event: Sortable.SortableEvent) => void;

  /**
   * Element dragging started.
   */
  onDragStart?: (event: Sortable.SortableEvent) => void;

  /**
   * Element dragging ended.
   */
  onDragEnd?: (event: Sortable.SortableEvent) => void;
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
        ...(!!component.canPull && {
          pull: (to, from, dragEl) => component.canPull({ toEl: to.el, fromEl: from.el, dragEl }),
        }),
        ...(!!component.canPut && {
          put: (to, from, dragEl) => component.canPut({ toEl: to.el, fromEl: from.el, dragEl }),
        }),
      },
    }),
    handle,
    onAdd: (event) => {
      if (!component.onDragAdd) {
        return;
      }

      component.onDragAdd(event);
    },
    onRemove: (event) => {
      if (!component.onDragRemove) {
        return;
      }

      component.onDragRemove(event);
    },
    onStart: (event) => {
      onSortingStart(component);

      if (!component.onDragStart) {
        return;
      }

      component.onDragStart(event);
    },
    onEnd: (event) => {
      onSortingEnd(component);

      if (!component.onDragEnd) {
        return;
      }

      component.onDragEnd(event);
    },
    onSort: (event) => {
      component.onDragSort(event);
    },
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
