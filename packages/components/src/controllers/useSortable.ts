import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
import { dragAndDrop, tearDown } from "@formkit/drag-and-drop";
import { guid } from "../utils/guid";
import { getRootNode } from "../utils/dom";

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
  newIndex: number | null;
  oldIndex: number;
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

  /** When `true`, interaction should be disabled. */
  disabled?: boolean;

  /** When `true`, sorting is disabled. */
  sortDisabled?: boolean;

  /** Specifies which items inside the element should be draggable. */
  dragSelector?: string;

  /** The list's group identifier. */
  group?: string;

  /** The selector for the handle elements. */
  handleSelector: string;

  /** Whether the element can move from the list. */
  canPull: (detail: DragDetail) => boolean | "clone";

  /** Whether the element can be added from another list. */
  canPut: (detail: DragDetail) => boolean;

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
const dragHandlePointerState = new WeakMap<SortableComponent, EventTarget[]>();
const dragHandlePointerController = new WeakMap<SortableComponent, AbortController>();
const syntheticPointerEvents = new WeakSet<Event>();
const sortableItemKey = "data-calcite-sortable-key";

function reEmitPointerEventIfStopped(
  component: SortableComponent,
  controller: AbortController,
  event: PointerEvent,
): void {
  if (syntheticPointerEvents.has(event) || event.target === component.el) {
    return;
  }

  let reachedHostBubblePhase = false;

  const markBubblePhase = (bubbleEvent: Event): void => {
    if (bubbleEvent === event) {
      reachedHostBubblePhase = true;
    }
  };

  component.el.addEventListener(event.type, markBubblePhase, {
    once: true,
    signal: controller.signal,
  });

  queueMicrotask(() => {
    if (reachedHostBubblePhase) {
      return;
    }

    const syntheticEvent = new PointerEvent(event.type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      isPrimary: event.isPrimary,
      button: event.button,
      buttons: event.buttons,
      clientX: event.clientX,
      clientY: event.clientY,
      screenX: event.screenX,
      screenY: event.screenY,
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      metaKey: event.metaKey,
    });

    syntheticPointerEvents.add(syntheticEvent);
    component.el.dispatchEvent(syntheticEvent);
  });
}

function getSortableItems(component: SortableComponent): HTMLElement[] {
  if (component.dragSelector) {
    return Array.from(component.el.children).filter((child): child is HTMLElement => {
      return child instanceof HTMLElement && child.matches(component.dragSelector);
    });
  }

  return Array.from(component.el.children) as HTMLElement[];
}

function getSortableValues(component: SortableComponent): string[] {
  return getSortableItems(component).map((item) => getSortableItemKey(item));
}

function getSortableItemKey(item: HTMLElement, forceNew = false): string {
  if (forceNew || !item.getAttribute(sortableItemKey)) {
    item.setAttribute(sortableItemKey, item.id || guid());
  }

  return item.getAttribute(sortableItemKey);
}

function getSortableItemByKey(component: SortableComponent, key: string): HTMLElement | null {
  const rootNode = getRootNode(component.el);
  const escapedKey = globalThis.CSS?.escape?.(key) ?? key.replace(/(["\\])/g, "\\$1");

  return rootNode.querySelector<HTMLElement>(`[${sortableItemKey}="${escapedKey}"]`);
}

function setUpDragHandleTracking(component: SortableComponent): void {
  dragHandlePointerController.get(component)?.abort();

  const controller = new AbortController();
  const { handleSelector } = component;

  component.el.addEventListener(
    "pointerdown",
    (event) => {
      reEmitPointerEventIfStopped(component, controller, event);
      dragHandlePointerState.set(component, event.composedPath());
    },
    { capture: true, signal: controller.signal },
  );

  const clearPointerState = (): void => {
    dragHandlePointerState.delete(component);
  };

  component.el.addEventListener(
    "pointerup",
    (event) => {
      reEmitPointerEventIfStopped(component, controller, event);
      clearPointerState();
    },
    { capture: true, signal: controller.signal },
  );
  component.el.addEventListener("pointercancel", clearPointerState, { signal: controller.signal });
  component.el.addEventListener("dragend", clearPointerState, { signal: controller.signal });

  component.el.addEventListener(
    "dragstart",
    (event) => {
      const pointerPath = dragHandlePointerState.get(component);
      const isSortableItem =
        event.target instanceof HTMLElement &&
        event.target.parentElement === component.el &&
        (!component.dragSelector || event.target.matches(component.dragSelector));
      const startedFromHandle = pointerPath?.some(
        (target) => target instanceof Element && target.matches(handleSelector),
      );

      if (isSortableItem && pointerPath && !startedFromHandle) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    { capture: true, signal: controller.signal },
  );

  dragHandlePointerController.set(component, controller);
}

function tearDownDragHandleTracking(component: SortableComponent): void {
  dragHandlePointerController.get(component)?.abort();
  dragHandlePointerController.delete(component);
  dragHandlePointerState.delete(component);
}

function setSortableItems(component: SortableComponent, values: string[]): void {
  const currentItems = getSortableItems(component);
  const currentValues = currentItems.map((item) => getSortableItemKey(item));

  if (currentValues.length === values.length && currentValues.every((value, index) => value === values[index])) {
    return;
  }

  values.forEach((value) => {
    const item = getSortableItemByKey(component, value);

    if (item) {
      component.el.appendChild(item);
    }
  });
}

function createSortable(component: SortableComponent): void {
  const { el, group, dragSelector: draggable, sortDisabled } = component;

  setUpDragHandleTracking(component);

  dragAndDrop({
    parent: el,
    getValues: () => getSortableValues(component),
    setValues: (values) => {
      setSortableItems(component, values);
    },
    config: {
      group,
      sortable: !sortDisabled,
      draggingClass: CSS.dragClass,
      synthDraggingClass: CSS.fallbackClass,
      dragPlaceholderClass: CSS.chosenClass,
      synthDragPlaceholderClass: CSS.chosenClass,
      dropZoneClass: CSS.ghostClass,
      synthDropZoneClass: CSS.ghostClass,
      draggable: draggable ? (child: HTMLElement) => child.matches(draggable) : undefined,
      accepts: (targetParent, initialParent, currentParent, state) => {
        const targetComponent = targetParent.el as unknown as SortableComponent;
        const initialComponent = initialParent.el as unknown as SortableComponent;
        const currentComponent = currentParent.el as unknown as SortableComponent;

        const dragEl = state.draggedNodes[0]?.el as HTMLElement;
        const newIndex = targetParent.data.enabledNodes.length;
        const oldIndex = state.initialIndex;

        if (!targetComponent.group || targetComponent.group !== initialComponent.group) {
          return false;
        }

        if (
          targetComponent.canPut?.({
            toEl: targetComponent.el,
            fromEl: initialComponent.el,
            dragEl,
            newIndex,
            oldIndex,
          }) === false
        ) {
          return false;
        }

        const canPull = initialComponent.canPull?.({
          toEl: targetComponent.el,
          fromEl: currentComponent.el,
          dragEl,
          newIndex,
          oldIndex,
        });

        return canPull !== false;
      },
      onDragstart: (state: any) => {
        const dragState = state.state ?? state;

        if (!globalDragState.active) {
          globalDragState.active = true;
          onGlobalDragStart();
        }

        const dragEl = state.draggedNode?.el as HTMLElement;

        component.onDragStart({
          fromEl: dragState.initialParent.el as HTMLElement,
          dragEl,
          toEl: dragState.currentParent.el as HTMLElement,
          newIndex: null,
          oldIndex: dragState.initialIndex,
        });
      },
      onSort: (event: any) => {
        const dragEl = event.draggedNodes[0].el as HTMLElement;
        const fromEl = event.parent.el as HTMLElement;
        const toEl = event.parent.el as HTMLElement;

        setSortableItems(component, event.values as string[]);

        component.onDragSort({
          fromEl,
          dragEl,
          toEl,
          newIndex: event.position,
          oldIndex: event.previousPosition,
        });
      },
      onTransfer: (event: any) => {
        const dragEl = event.draggedNodes[0].el as HTMLElement;
        const fromEl = event.sourceParent.el as HTMLElement;
        const toEl = event.targetParent.el as HTMLElement;
        const sourceValues = event.sourceParent.data.getValues(event.sourceParent.el) as string[];
        const targetValues = event.targetParent.data.getValues(event.targetParent.el) as string[];

        if (component.el === event.sourceParent.el) {
          setSortableItems(component, sourceValues);
        }

        if (component.el === event.targetParent.el) {
          setSortableItems(component, targetValues);
        }

        if (event.initialParent.el === component.el) {
          const canPull = component.canPull?.({
            toEl,
            fromEl,
            dragEl,
            newIndex: event.targetIndex,
            oldIndex: event.state.initialIndex,
          });

          if (canPull === "clone") {
            const clone = dragEl.cloneNode(true) as HTMLElement;
            const dragKey = getSortableItemKey(dragEl);
            const cloneKey = getSortableItemKey(clone, true);
            const values = getSortableValues(component).filter((value) => value !== dragKey);
            values.splice(event.state.initialIndex, 0, cloneKey);
            const existingItem = getSortableItems(component).find((item) => getSortableItemKey(item) === dragKey);

            if (existingItem) {
              existingItem.parentElement?.insertBefore(clone, existingItem);
            }

            setSortableItems(component, values);
          }
        }

        component.onDragSort({
          fromEl,
          dragEl,
          toEl,
          newIndex: event.targetIndex,
          oldIndex: event.state.initialIndex,
        });
      },
      onDragend: (state: any) => {
        const dragState = state.state ?? state;

        if (globalDragState.active) {
          globalDragState.active = false;
          onGlobalDragEnd();
        }

        const dragEl = dragState.draggedNode.el as HTMLElement;
        const toEl = dragState.currentParent.el as HTMLElement;
        const currentValues = dragState.currentParent.data.getValues(dragState.currentParent.el) as string[];
        const dragKey = getSortableItemKey(dragEl);

        component.onDragEnd({
          fromEl: dragState.initialParent.el as HTMLElement,
          dragEl,
          toEl,
          newIndex: currentValues.findIndex((value) => value === dragKey),
          oldIndex: dragState.initialIndex,
        });
      },
    } as any,
  });
}

/**
 * A controller for managing Sortable interactions
 */
export const useSortable = <T extends SortableComponent>(): ReturnType<
  typeof makeGenericController<UseSortable, T>
> => {
  return makeGenericController<UseSortable, T>((component, controller) => {
    function dragActive(component: SortableComponent): boolean {
      return component.dragEnabled && globalDragState.active;
    }

    function setUpSortable(component: SortableComponent): void {
      if (dragActive(component)) {
        return;
      }

      tearDownSortable(component);

      if (!component.dragEnabled || component.disabled) {
        return;
      }

      sortableComponentSet.add(component);
      createSortable(component);
    }

    function tearDownSortable(component: SortableComponent): void {
      if (dragActive(component)) {
        return;
      }

      sortableComponentSet.delete(component);
      tearDownDragHandleTracking(component);

      tearDown(component.el);
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
