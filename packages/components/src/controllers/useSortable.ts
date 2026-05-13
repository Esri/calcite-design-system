import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
import {
  dragAndDrop,
  tearDown,
  type BaseDragState,
  type DragState,
  type SynthDragState,
  type DragendEventData,
  type DragstartEventData,
  type ParentRecord,
  type SortEventData,
  type TransferEventData,
} from "@formkit/drag-and-drop";
import { guid } from "../utils/guid";

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
  sortableComponentSet.forEach((component) => component.onGlobalDragStart());
}

function onGlobalDragEnd(): void {
  sortableComponentSet.forEach((component) => component.onGlobalDragEnd());
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
const sortableItemKeys = new WeakMap<HTMLElement, string>();

function isDragState<T>(state: BaseDragState<T>): state is DragState<T> | SynthDragState<T> {
  return "draggedNode" in state && !!state.draggedNode;
}

function getSyntheticPointerEventInit(event: PointerEvent): PointerEventInit {
  return {
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
  };
}

function reEmitPointerEventIfStopped(component: SortableComponent, event: PointerEvent): void {
  if (syntheticPointerEvents.has(event) || event.target === component.el) {
    return;
  }

  let reachedHostBubblePhase = false;
  const markBubblePhase = (): void => {
    reachedHostBubblePhase = true;
  };

  component.el.addEventListener(event.type, markBubblePhase, { once: true });

  queueMicrotask(() => {
    component.el.removeEventListener(event.type, markBubblePhase);

    if (reachedHostBubblePhase) {
      return;
    }

    const syntheticEvent = new PointerEvent(event.type, getSyntheticPointerEventInit(event));

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
  const existingKey = sortableItemKeys.get(item);

  if (existingKey && !forceNew) {
    return existingKey;
  }

  const key = !forceNew && item.id ? item.id : guid();
  sortableItemKeys.set(item, key);

  return key;
}

function pathIncludesHandle(path: EventTarget[] | undefined, handleSelector: string): boolean {
  return path?.some((target) => target instanceof Element && target.matches(handleSelector)) ?? false;
}

function setUpDragHandleTracking(component: SortableComponent): void {
  dragHandlePointerController.get(component)?.abort();

  const controller = new AbortController();
  const { handleSelector } = component;

  component.el.addEventListener(
    "pointerdown",
    (event) => {
      reEmitPointerEventIfStopped(component, event);

      if (syntheticPointerEvents.has(event)) {
        return;
      }

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
      reEmitPointerEventIfStopped(component, event);
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
      const dragstartPath = event.composedPath();
      const sortableItem =
        event.target instanceof HTMLElement &&
        event.target.parentElement === component.el &&
        (!component.dragSelector || event.target.matches(component.dragSelector))
          ? event.target
          : null;
      const startedFromHandle =
        pathIncludesHandle(pointerPath, handleSelector) || pathIncludesHandle(dragstartPath, handleSelector);

      if (sortableItem && pointerPath && !startedFromHandle) {
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
  const keyedItems = currentItems.map((item) => [getSortableItemKey(item), item] as const);
  const itemsByKey = new Map(keyedItems);

  if (keyedItems.length === values.length && keyedItems.every(([key], index) => key === values[index])) {
    return;
  }

  for (const value of values) {
    const item = itemsByKey.get(value);

    if (item) {
      component.el.appendChild(item);
    }
  }
}

function clampIndex(index: number, max: number): number {
  return Math.max(0, Math.min(max, index));
}

function createDragDetail(
  fromEl: HTMLElement,
  toEl: HTMLElement,
  dragEl: HTMLElement,
  oldIndex: number,
  newIndex: number | null,
): DragDetail {
  return {
    fromEl,
    toEl,
    dragEl,
    oldIndex,
    newIndex,
  };
}

function applyClonePull(component: SortableComponent, dragEl: HTMLElement, initialIndex: number): void {
  const clone = dragEl.cloneNode(true) as HTMLElement;
  const dragKey = getSortableItemKey(dragEl);
  const cloneKey = getSortableItemKey(clone, true);
  const values = getSortableValues(component).filter((value) => value !== dragKey);
  const existingItem = getSortableItems(component).find((item) => getSortableItemKey(item) === dragKey);

  if (!existingItem) {
    return;
  }

  values.splice(initialIndex, 0, cloneKey);
  existingItem.parentElement?.insertBefore(clone, existingItem);
  setSortableItems(component, values);
}

function getSortableComponentFromParent(parent: ParentRecord<string>): SortableComponent {
  return parent.el as unknown as SortableComponent;
}

function getSortableValuesFromParent<T>(parent: ParentRecord<T>): string[] {
  return parent.data.getValues(parent.el) as string[];
}

function createSortable(component: SortableComponent): void {
  const { el, group, dragSelector: draggable, sortDisabled } = component;

  setUpDragHandleTracking(component);

  dragAndDrop<string>({
    parent: el,
    getValues: () => getSortableValues(component),
    setValues: (values) => setSortableItems(component, values),
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
      accepts: (
        targetParent: ParentRecord<string>,
        initialParent: ParentRecord<string>,
        currentParent: ParentRecord<string>,
        state: BaseDragState<string>,
      ) => {
        const targetComponent = getSortableComponentFromParent(targetParent);
        const initialComponent = getSortableComponentFromParent(initialParent);
        const currentComponent = getSortableComponentFromParent(currentParent);
        const sameGroup = !!targetComponent.group && targetComponent.group === initialComponent.group;

        if (!isDragState(state)) {
          return false;
        }

        const dragEl = state.draggedNodes[0]?.el;
        const newIndex = targetParent.data.enabledNodes.length;
        const oldIndex = state.initialIndex;

        if (!dragEl) {
          return false;
        }

        if (!sameGroup) {
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
      onDragstart: <T>(event: DragstartEventData<T>) => {
        const dragState = event.state;

        if (!isDragState(dragState)) {
          return;
        }

        if (!globalDragState.active) {
          globalDragState.active = true;
          onGlobalDragStart();
        }

        const dragEl = event.draggedNode.el;
        const fromEl = dragState.initialParent.el;
        const toEl = dragState.currentParent.el;

        component.onDragStart(createDragDetail(fromEl, toEl, dragEl, dragState.initialIndex, null));
      },
      onSort: <T>(event: SortEventData<T>) => {
        const dragEl = event.draggedNodes[0].el;
        const fromEl = event.parent.el;
        const toEl = event.parent.el;

        setSortableItems(component, event.values as string[]);

        component.onDragSort(createDragDetail(fromEl, toEl, dragEl, event.previousPosition, event.position));
      },
      onTransfer: <T>(event: TransferEventData<T>) => {
        const dragState = event.state;

        if (!isDragState(dragState)) {
          return;
        }

        const dragEl = event.draggedNodes[0].el;
        const fromEl = event.sourceParent.el;
        const toEl = event.targetParent.el;
        const isSourceComponent = component.el === event.sourceParent.el;
        const isTargetComponent = component.el === event.targetParent.el;
        const isInitialComponent = event.initialParent.el === component.el;
        const targetValues = getSortableValuesFromParent(event.targetParent);
        const dragKey = getSortableItemKey(dragEl);
        const normalizedTargetValues = targetValues.filter((value) => value !== dragKey);
        const boundedNewIndex = clampIndex(event.targetIndex, normalizedTargetValues.length);

        normalizedTargetValues.splice(boundedNewIndex, 0, dragKey);

        if (isSourceComponent) {
          const sourceValues = getSortableValuesFromParent(event.sourceParent);

          setSortableItems(component, sourceValues);
        }

        if (isTargetComponent) {
          if (dragEl.parentElement !== component.el) {
            component.el.appendChild(dragEl);
          }

          setSortableItems(component, normalizedTargetValues);
        }

        if (isInitialComponent) {
          const canPull = component.canPull?.({
            toEl,
            fromEl,
            dragEl,
            newIndex: boundedNewIndex,
            oldIndex: dragState.initialIndex,
          });

          if (canPull === "clone") {
            applyClonePull(component, dragEl, dragState.initialIndex);
          }
        }

        component.onDragSort(createDragDetail(fromEl, toEl, dragEl, dragState.initialIndex, boundedNewIndex));
      },
      onDragend: <T>(event: DragendEventData<T>) => {
        const dragState = event.state;

        if (!isDragState(dragState)) {
          return;
        }

        if (globalDragState.active) {
          globalDragState.active = false;
          onGlobalDragEnd();
        }

        const dragEl = event.draggedNode.el;
        const toEl = dragState.currentParent.el;
        const currentValues = getSortableValuesFromParent(dragState.currentParent);
        const dragKey = getSortableItemKey(dragEl);
        const fromEl = dragState.initialParent.el;
        const newIndex = currentValues.findIndex((value) => value === dragKey);

        component.onDragEnd(createDragDetail(fromEl, toEl, dragEl, dragState.initialIndex, newIndex));
      },
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
    function dragActive(): boolean {
      return component.dragEnabled && globalDragState.active;
    }

    function setUpSortable(): void {
      if (dragActive()) {
        return;
      }

      tearDownSortable();

      if (!component.dragEnabled || component.disabled) {
        return;
      }

      sortableComponentSet.add(component);
      createSortable(component);
    }

    function tearDownSortable(): void {
      if (dragActive()) {
        return;
      }

      sortableComponentSet.delete(component);
      tearDownDragHandleTracking(component);

      tearDown(component.el);
    }

    controller.onConnected(() => {
      setUpSortable();
    });

    controller.onDisconnected(() => {
      tearDownSortable();
    });

    return {
      reset: () => {
        setUpSortable();
      },
    };
  });
};
