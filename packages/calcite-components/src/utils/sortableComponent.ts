import Sortable from "sortablejs";
import { getDepth } from "../components/list-item/utils";
const sortableComponentSet = new Set<SortableComponent>();

export interface DragDetail {
  toEl: HTMLElement;
  fromEl: HTMLElement;
  dragEl: HTMLElement;
  newIndex: number;
  oldIndex: number;
}

export const CSS = {
  ghostClass: "calcite-sortable--ghost",
  chosenClass: "calcite-sortable--chosen",
  dragClass: "calcite-sortable--drag",
};

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
   * Called when any sortable component drag starts. For internal use only. Any public drag events should emit within `onDragStart()`.
   */
  onGlobalDragStart: () => void;

  /**
   * Called when any sortable component drag ends. For internal use only. Any public drag events should emit within `onDragEnd()`.
   */
  onGlobalDragEnd: () => void;

  /**
   * Called when a component's dragging ends.
   */
  onDragEnd: (detail: DragDetail) => void;

  /**
   * Called when a component's dragging starts.
   */
  onDragStart: (detail: DragDetail) => void;

  /**
   * Called by any change to the list (add / update / remove).
   */
  onDragSort: (detail: DragDetail) => void;
}

export interface SortableComponentItem {
  /**
   * When `true`, the item is not draggable.
   *
   *
   * Notes:
   *
   * This property should use the @Prop decorator and reflect.
   * This property should be used to set the `calcite-handle` disabled property.
   */
  dragDisabled: boolean;
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
    ...CSS,
    ...(!!draggable && { draggable }),
    ...(!!group && {
      group: {
        name: group,
        ...(!!component.canPull && {
          pull: (to, from, dragEl, { newIndex, oldIndex }) =>
            component.canPull({ toEl: to.el, fromEl: from.el, dragEl, newIndex, oldIndex }),
        }),
        ...(!!component.canPut && {
          put: (to, from, dragEl, { newIndex, oldIndex }) =>
            component.canPut({ toEl: to.el, fromEl: from.el, dragEl, newIndex, oldIndex }),
        }),
      },
    }),
    handle,
    filter: "[drag-disabled]",
    onStart: ({ from: fromEl, item: dragEl, to: toEl, newIndex, oldIndex }) => {
      dragEl.style.setProperty("--calcite-indent-multiplier", `${getDepth(dragEl, true)}`);
      dragState.active = true;
      onGlobalDragStart();
      component.onDragStart({ fromEl, dragEl, toEl, newIndex, oldIndex });
    },
    onEnd: ({ from: fromEl, item: dragEl, to: toEl, newIndex, oldIndex }) => {
      dragEl.style.setProperty("--calcite-indent-multiplier", `${getDepth(dragEl, true)}`);
      dragState.active = false;
      onGlobalDragEnd();
      component.onDragEnd({ fromEl, dragEl, toEl, newIndex, oldIndex });
    },
    onChange: ({ item: dragEl }) => {
      dragEl.style.setProperty("--calcite-indent-multiplier", `${getDepth(dragEl, true)}`);
    },
    onSort: ({ from: fromEl, item: dragEl, to: toEl, newIndex, oldIndex }) => {
      dragEl.style.setProperty("--calcite-indent-multiplier", `${getDepth(dragEl, true)}`);
      component.onDragSort({ fromEl, dragEl, toEl, newIndex, oldIndex });
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
 * @param component The sortable component.
 * @returns {boolean} a boolean value.
 */
export function dragActive(component: SortableComponent): boolean {
  return component.dragEnabled && dragState.active;
}

function onGlobalDragStart(): void {
  Array.from(sortableComponentSet).forEach((component) => component.onGlobalDragStart());
}

function onGlobalDragEnd(): void {
  Array.from(sortableComponentSet).forEach((component) => component.onGlobalDragEnd());
}
