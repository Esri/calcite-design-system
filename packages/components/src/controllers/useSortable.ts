import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
import {
  dragAndDrop,
  tearDown,
  type BaseDragState,
  type DragState,
  type DragendEventData,
  type DragstartEventData,
  type ParentRecord,
  type SortEventData,
  type TransferEventData,
} from "@formkit/drag-and-drop";
import { guid } from "../utils/guid";
import { getRootNode } from "../utils/dom";

const sortableComponentSet = new Set<SortableComponent>();
const DRAG_AND_DROP_CLONE_ID = "dnd-dragged-node-clone";

function filterOutDragAndDropClone<T extends Element>(elements: T[]): T[] {
  return elements.filter((element) => element.id !== DRAG_AND_DROP_CLONE_ID);
}

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

  /** Returns the sortable items managed by the component. */
  getSortableItems: () => HTMLElement[];
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
const sortableItemKeys = new WeakMap<HTMLElement, string>();

interface SortableNodeRecord {
  el: HTMLElement;
}

function isDragState<T>(state: BaseDragState<T>): state is DragState<T> {
  return "draggedNode" in state && !!state.draggedNode;
}

function getSortableValues(component: SortableComponent): string[] {
  return filterOutDragAndDropClone(component.getSortableItems()).map((item) => getSortableItemKey(item));
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

function getSortableNodeKey(node: SortableNodeRecord): string {
  return getSortableItemKey(node.el);
}

function getSortableNodeKeys(nodes: SortableNodeRecord[]): string[] {
  return nodes.map(getSortableNodeKey);
}

function setSortableItems(component: SortableComponent, values: string[]): void {
  const currentItems = filterOutDragAndDropClone(component.getSortableItems());
  const keyedItems = currentItems.map((item) => [getSortableItemKey(item), item] as const);
  const itemsByKey = new Map(keyedItems);

  if (keyedItems.length === values.length && keyedItems.every(([key], index) => key === values[index])) {
    return;
  }

  for (const value of values) {
    const item = itemsByKey.get(value);

    if (item) {
      // TODO: Ideally, canceling drag-related events would prevent this DOM mutation so VDOM can own item reordering.
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
  newIndex: number | undefined,
): DragDetail {
  return {
    fromEl,
    toEl,
    dragEl,
    oldIndex,
    newIndex,
  };
}

function applyClonePull<T>(dragEl: HTMLElement, initialParent: ParentRecord<T>): void {
  const clone = dragEl.cloneNode(true) as HTMLElement;
  const dragKey = getSortableItemKey(dragEl);
  const cloneKey = getSortableItemKey(clone, true);

  if (clone.id) {
    clone.id = cloneKey;
  }

  const existingItem = initialParent.data.enabledNodes.find((node) => getSortableNodeKey(node) === dragKey)?.el as
    | HTMLElement
    | undefined;

  if (!existingItem) {
    return;
  }
  // TODO: Ideally, canceling drag-related events would prevent this DOM mutation so VDOM can own item reordering.
  existingItem.parentElement?.insertBefore(clone, existingItem);
}

function getSortableComponentFromParent(parent: ParentRecord<string>): SortableComponent {
  return parent.el as SortableComponent;
}

function createSortable(component: SortableComponent): void {
  const { el, group, handleSelector, dragSelector, sortDisabled } = component;

  dragAndDrop<string>({
    parent: el,
    getValues: () => getSortableValues(component),
    setValues: (values) => setSortableItems(component, values),
    config: {
      root: getRootNode(el),
      group,
      sortable: !sortDisabled,
      dragHandle: handleSelector,
      draggingClass: CSS.dragClass,
      dragPlaceholderClass: CSS.chosenClass,
      dropZoneClass: CSS.ghostClass,
      draggable: dragSelector ? (child: HTMLElement) => child.matches(dragSelector) : undefined,
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
        const newIndex = clampIndex(state.targetIndex, targetParent.data.enabledNodes.length);
        const oldIndex = state.initialIndex;

        if (!dragEl || !sameGroup) {
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

        component.onDragStart(createDragDetail(fromEl, toEl, dragEl, dragState.initialIndex, undefined));
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
        const targetValues = getSortableNodeKeys(event.targetNodes);
        const dragKey = getSortableItemKey(dragEl);
        const normalizedTargetValues = targetValues.filter((value) => value !== dragKey);
        const boundedNewIndex = clampIndex(event.targetIndex, normalizedTargetValues.length);

        normalizedTargetValues.splice(boundedNewIndex, 0, dragKey);

        if (isSourceComponent) {
          const sourceValues = getSortableNodeKeys(event.sourceParent.data.enabledNodes);

          setSortableItems(component, sourceValues);
        }

        if (isTargetComponent) {
          if (dragEl.parentElement !== component.el) {
            // TODO: Ideally, canceling drag-related events would prevent this DOM mutation so VDOM can own item reordering.
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
            applyClonePull(dragEl, event.initialParent);
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
        const currentValues = event.values as string[];
        const dragKey = getSortableItemKey(dragEl);
        const fromEl = dragState.initialParent.el;
        const newIndex = currentValues.findIndex((value) => value === dragKey);

        component.onDragEnd(
          createDragDetail(fromEl, toEl, dragEl, dragState.initialIndex, newIndex > -1 ? newIndex : undefined),
        );
      },
    },
  });
}

/**
 * A controller for managing Sortable interactions
 */
export const useSortable = <T extends LitElement>(): ReturnType<typeof makeGenericController<UseSortable, T>> => {
  return makeGenericController<UseSortable, T>((component, controller) => {
    const sortableComponent = component as T & SortableComponent;

    function dragActive(): boolean {
      return sortableComponent.dragEnabled && globalDragState.active;
    }

    function setUpSortable(): void {
      if (dragActive()) {
        return;
      }

      tearDownSortable();

      if (!sortableComponent.dragEnabled || sortableComponent.disabled) {
        return;
      }

      sortableComponentSet.add(sortableComponent);
      createSortable(sortableComponent);
    }

    function tearDownSortable(): void {
      if (dragActive()) {
        return;
      }

      sortableComponentSet.delete(sortableComponent);
      tearDown(sortableComponent.el);
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
