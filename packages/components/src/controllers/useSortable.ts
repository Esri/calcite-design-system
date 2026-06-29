import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
import Sortable from "sortablejs";

const sortableComponentSet = new Set<SortableComponent>();

export interface MoveDetail<
  To extends HTMLElement = HTMLElement,
  From extends HTMLElement = HTMLElement,
  Drag extends HTMLElement = HTMLElement,
  Related extends HTMLElement = HTMLElement,
> {
  toEl: To;
  fromEl: From;
  dragEl: Drag;
  relatedEl: Related;
}

export interface DragDetail<
  To extends HTMLElement = HTMLElement,
  From extends HTMLElement = HTMLElement,
  Drag extends HTMLElement = HTMLElement,
> {
  toEl: To;
  fromEl: From;
  dragEl: Drag;
  newIndex: number | undefined;
  oldIndex: number | undefined;
}

export const CSS = {
  ghostClass: "calcite-sortable--ghost",
  chosenClass: "calcite-sortable--chosen",
  dragClass: "calcite-sortable--drag",
  fallbackClass: "calcite-sortable--fallback",
};

function onGlobalDragStart(): void {
  Array.from(sortableComponentSet).forEach((component) => component.onGlobalDragStart());
}

function onGlobalDragEnd(): void {
  Array.from(sortableComponentSet).forEach((component) => component.onGlobalDragEnd());
}

/**
 * Defines interface for components with sorting functionality.
 */
interface SortableComponent extends LitElement {
  /** When `true`, dragging is enabled. */
  dragEnabled: boolean;

  /** When `true`, sorting is disabled. */
  sortDisabled?: boolean;

  /** Specifies which items inside the element should be draggable. */
  dragSelector?: string;

  /** The list's group identifier. */
  group?: string;

  /** The selector for the handle elements. */
  handleSelector: string;

  /** Whether the element can move from the list. */
  canPull?: (detail: DragDetail) => boolean | "clone";

  /** Whether the element can be added from another list. */
  canPut?: (detail: DragDetail) => boolean;

  /** Called when any sortable component drag starts. For internal use only. Any public drag events should emit within `onDragStart()`. */
  onGlobalDragStart: () => void;

  /** Called when any sortable component drag ends. For internal use only. Any public drag events should emit within `onDragEnd()`. */
  onGlobalDragEnd: () => void;

  /** Called when a component's dragging ends. */
  onDragEnd: (detail: DragDetail) => void;

  /** Called when a component's dragging ends. */
  onDragMove?: (detail: MoveDetail) => void;

  /** Called when a component's dragging starts. */
  onDragStart: (detail: DragDetail) => void;

  /** Called by any change to the list (add / update / remove). */
  onDragSort: (detail: DragDetail) => void;
}

export interface SortableComponentItem {
  /**
   * When `true`, the item is not draggable.
   *
   *
   * Notes:
   *
   * This property should use the `@property` decorator and reflect.
   * This property should be used to set the `calcite-handle` disabled property.
   */
  dragDisabled: boolean;
}

interface UseSortable {
  /**
   * Resets the Sortable instance.
   *
   * This should be called after any change to the list that may affect Sortable's internal state (e.g. items added/removed, or changes to `dragDisabled` property).
   */
  reset: () => void;
}

const globalDragState: { active: boolean } = { active: false };

function createSortable(component: SortableComponent): ReturnType<(typeof Sortable)["create"]> {
  const dataIdAttr = "id";
  const { el, group, handleSelector: handle, dragSelector: draggable, sortDisabled } = component;

  return Sortable.create(el, {
    dataIdAttr,
    swapThreshold: 0.5,
    ...CSS,
    ...(!!draggable && { draggable }),
    ...(!!group && {
      sort: !sortDisabled,
      group: {
        name: group,
        ...(!!component.canPull && {
          pull: (to, from, dragEl, { newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => {
            return component.canPull!({
              toEl: to.el,
              fromEl: from.el,
              dragEl,
              newIndex,
              oldIndex,
            });
          },
        }),
        ...(!!component.canPut && {
          put: (to, from, dragEl, { newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => {
            return component.canPut!({
              toEl: to.el,
              fromEl: from.el,
              dragEl,
              newIndex,
              oldIndex,
            });
          },
        }),
      },
    }),
    onMove: ({ from: fromEl, dragged: dragEl, to: toEl, related: relatedEl }) => {
      if (!component.onDragMove) {
        return;
      }

      component.onDragMove({ fromEl, dragEl, toEl, relatedEl });
    },
    handle,
    filter: `${handle}[disabled]`,
    onStart: ({ from: fromEl, item: dragEl, to: toEl, newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => {
      globalDragState.active = true;
      onGlobalDragStart();
      component.onDragStart({ fromEl, dragEl, toEl, newIndex, oldIndex });
    },
    onEnd: ({ from: fromEl, item: dragEl, to: toEl, newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => {
      globalDragState.active = false;
      onGlobalDragEnd();
      component.onDragEnd({ fromEl, dragEl, toEl, newIndex, oldIndex });
    },
    onSort: ({ from: fromEl, item: dragEl, to: toEl, newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => {
      component.onDragSort({ fromEl, dragEl, toEl, newIndex, oldIndex });
    },
  });
}

/**
 * A controller for managing Sortable interactions
 */
export const useSortable = <T extends SortableComponent>(): ReturnType<
  typeof makeGenericController<UseSortable, T>
> => {
  return makeGenericController<UseSortable, T>((component, controller) => {
    let sortable: ReturnType<(typeof Sortable)["create"]> | undefined;

    function dragActive(component: SortableComponent): boolean {
      return component.dragEnabled && globalDragState.active;
    }

    function setUpSortable(component: SortableComponent): void {
      if (dragActive(component)) {
        return;
      }

      tearDownSortable(component);

      if (!component.dragEnabled) {
        return;
      }

      sortableComponentSet.add(component);
      sortable = createSortable(component);
    }

    function tearDownSortable(component: SortableComponent): void {
      if (dragActive(component)) {
        return;
      }

      sortableComponentSet.delete(component);

      sortable?.destroy();
      sortable = undefined;
    }

    controller.onConnected(() => {
      setUpSortable(component);
    });

    controller.onDisconnected(() => {
      tearDownSortable(component);
    });

    return {
      reset: () => {
        setUpSortable(component);
      },
    };
  });
};
