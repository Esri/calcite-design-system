import Sortable from "sortablejs";
const sortableComponentSet = new Set<SortableComponent>();

export interface DragDetail {
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
  canPull: (detail: DragDetail) => boolean;

  /**
   * Whether the element can be added from another list.
   */
  canPut: (detail: DragDetail) => boolean;

  /**
   * Called by any change to the list (add / update / remove).
   */
  onDragSort: (detail: DragDetail) => void;

  /**
   * Called when a sortable component drag starts.
   */
  onDragStart: () => void;

  /**
   * Called when a sortable component drag ends.
   */
  onDragEnd: () => void;
}

/**
 * Helper to keep track of a SortableComponent. This should be called in the `connectedCallback` lifecycle method as well as any other method necessary to rebuild the sortable instance.
 *
 * @param {SortableComponent} component - The sortable component.
 */
export function connectSortableComponent(component: SortableComponent): void {
  disconnectSortableComponent(component);
  sortableComponentSet.add(component);

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
    onStart: () => {
      dragState.active = true;
      onDragStart();
    },
    onEnd: () => {
      dragState.active = false;
      onDragEnd();
    },
    onSort: (event) => {
      const { from, item, to } = event;
      component.onDragSort({ fromEl: from, dragEl: item, toEl: to });
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

  component.sortable?.destroy();
  component.sortable = null;
}

const dragState: { active: boolean } = { active: false };

/**
 * Helper to determine if dragging is currently active.
 *
 * @returns {boolean} a boolean value.
 */
export function dragActive(): boolean {
  return dragState.active;
}

function onDragStart(): void {
  Array.from(sortableComponentSet).forEach((component) => component.onDragStart());
}

function onDragEnd(): void {
  Array.from(sortableComponentSet).forEach((component) => component.onDragEnd());
}
