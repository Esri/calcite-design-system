import { makeGenericController } from "@arcgis/lumina/controllers";
import type { Ref } from "lit/directives/ref.js";
import {
  Accessibility,
  DragDropManager,
  Droppable,
  Feedback,
  KeyboardSensor,
  PointerActivationConstraints,
  PointerSensor,
  type Draggable,
  type DragOverEvent,
} from "@dnd-kit/dom";
import { Sortable, SortableKeyboardPlugin, isSortable } from "@dnd-kit/dom/sortable";
import { guid } from "../utils/guid";
import { getSlotAssignedElements } from "../utils/dom";
import type { BivariantHandler } from "../components/types";
import type { InteractiveComponent } from "./useInteractive";

interface SortableItemData {
  component: SortableComponent;
  item?: HTMLElement;
}

type SortableItem = HTMLElement & { updateComplete?: Promise<unknown> };

interface ActiveDrag {
  component: SortableComponent;
  item: HTMLElement;
  oldIndex: number;
  oldParent: HTMLElement;
  nextSibling: ChildNode | null;
}

interface DropPosition {
  component: SortableComponent;
  copyPlaceholder?: HTMLElement;
  indicatorTarget?: HTMLElement;
  item?: HTMLElement;
  newIndex: number;
  placement?: "before" | "after";
}

interface SortableItemState {
  slot: HTMLSlotElement;
  reset: () => void;
}

interface SortableManagerRecord {
  manager: DragDropManager;
  components: Set<SortableComponent>;
  sortables: Map<SortableComponent, Map<HTMLElement, Sortable>>;
  containerTargets: Map<SortableComponent, Droppable<SortableItemData>>;
  isDragging: boolean;
  isAlive: boolean;
  activeDrag?: ActiveDrag;
  dropPosition?: DropPosition;
  pendingReset: Map<SortableComponent, () => void>;
  itemStates: Map<SortableComponent, SortableItemState>;
  pendingPullOperations: Map<HTMLElement, { newIndex: number | undefined; operation: "move" | "clone" }>;
  acceptedPullOperations: Map<SortableComponent, "move" | "clone">;
  removeListeners: (() => void)[];
}

const managerRecords = new WeakMap<Document, SortableManagerRecord>();
const componentGroupIds = new WeakMap<SortableComponent, string>();
const sortableItemIds = new WeakMap<HTMLElement, string>();
const sortableOptionsByComponent = new WeakMap<SortableComponent, SortableOptions>();
const sortPositionAttribute = "data-calcite-sort-position";
const copyPlaceholderAttribute = "data-calcite-sort-placeholder";
const defaultHandleSelector = "calcite-sort-handle";

function isHandleDisabled(handle?: HTMLElement): boolean {
  return (
    !handle ||
    handle.hasAttribute("disabled") ||
    ("disabled" in handle && Boolean((handle as HTMLButtonElement).disabled))
  );
}

/** Finds the configured handle in the event path, including handles inside an item's shadow root. */
function getEventHandle(event: Event, source: Draggable): HTMLElement | undefined {
  if (!isSortable(source)) {
    return undefined;
  }

  const data = getSortableItemData(source);
  const item = data?.item;

  if (!item) {
    return undefined;
  }

  return event
    .composedPath()
    .find(
      (target): target is HTMLElement =>
        target instanceof HTMLElement &&
        target.matches(getSortableOptions(data.component).handleSelector ?? defaultHandleSelector) &&
        (item.contains(target) || item.shadowRoot?.contains(target) === true),
    );
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

/**
 * Defines interface for components with sorting functionality.
 */
interface SortableComponent<
  D extends DragDetail = DragDetail,
  M extends MoveDetail = MoveDetail,
> extends InteractiveComponent {
  /** When `true`, dragging is enabled. */
  dragEnabled: boolean;

  /** When `true`, sorting is disabled. */
  sortDisabled?: boolean;

  /** The list's group identifier. */
  group?: string;

  /** The sortable items' layout direction. */
  layout?: "horizontal" | "vertical" | "grid";

  /** Whether the element can move from the list. */
  canPull?: BivariantHandler<D, boolean | "clone">;

  /** Whether the element can be added from another list. */
  canPut?: BivariantHandler<D, boolean>;

  /** Called when any sortable component drag starts. For internal use only. Any public drag events should emit within `onDragStart()`. */
  onGlobalDragStart?: () => void;

  /** Called when any sortable component drag ends. For internal use only. Any public drag events should emit within `onDragEnd()`. */
  onGlobalDragEnd?: () => void;

  /** Called when a component's dragging ends. */
  onDragEnd: BivariantHandler<D, void>;

  /** Called when a component's drag position changes. */
  onDragMove?: BivariantHandler<M, void>;

  /** Called when a component's dragging starts. */
  onDragStart: BivariantHandler<D, void>;

  /** Called by any change to the list (add / update / remove). */
  onDragSort: BivariantHandler<D, void>;
}

export interface SortableComponentItem {
  /**
   * When `true`, the item is not draggable.
   *
   *
   * Notes:
   *
   * This property should use the `@property` decorator and reflect.
   * This property should be used to set the configured handle element's disabled property.
   */
  dragDisabled: boolean;
}

interface SortableOptions {
  dragSelector?: string;
  handleSelector?: string;
  slotRef?: Ref<HTMLSlotElement>;
}

function getSortableOptions(component: SortableComponent): SortableOptions {
  return sortableOptionsByComponent.get(component) ?? {};
}

interface UseSortable {
  /**
   * Manually resets the Sortable instance. Changes to `dragEnabled` and `disabled` reset automatically.
   */
  reset: () => void;
}

function getSortableItems(component: SortableComponent): SortableItem[] {
  const options = getSortableOptions(component);
  const items = options.slotRef
    ? options.slotRef.value
      ? getSlotAssignedElements<SortableItem>(options.slotRef.value)
      : []
    : Array.from(component.el.children);
  const { dragSelector } = options;

  return items.filter(
    (item): item is SortableItem =>
      item instanceof HTMLElement &&
      !item.hasAttribute("data-dnd-placeholder") &&
      (!dragSelector || item.matches(dragSelector)),
  );
}

function restoreSortableItem({ component, item, oldIndex, oldParent, nextSibling }: ActiveDrag): void {
  const referenceNode =
    nextSibling?.parentNode === oldParent
      ? nextSibling
      : (getSortableItems(component).filter(
          (sortableItem) => sortableItem !== item && sortableItem.parentNode === oldParent,
        )[oldIndex] ?? null);

  oldParent.insertBefore(item, referenceNode);
}

function getSortableItemId(item: HTMLElement): string {
  let id = sortableItemIds.get(item);

  if (!id) {
    id ||= item.id || guid();
    sortableItemIds.set(item, id);
  }

  return id;
}

function getSortableGroup(component: SortableComponent): string {
  let id = componentGroupIds.get(component);

  if (!id) {
    id = guid();
    componentGroupIds.set(component, id);
  }

  return id;
}

function canTransferBetweenComponents(fromComponent: SortableComponent, toComponent: SortableComponent): boolean {
  return !!fromComponent.group && fromComponent.group === toComponent.group;
}

function getAppendIndex(
  record: SortableManagerRecord,
  fromComponent: SortableComponent,
  toComponent: SortableComponent,
): number {
  const itemCount = record.sortables.get(toComponent)?.size ?? getSortableItems(toComponent).length;
  return itemCount - Number(fromComponent === toComponent);
}

function isAfterTarget(
  component: SortableComponent,
  targetItem: HTMLElement,
  position: { x: number; y: number },
  center: { x: number; y: number },
  sortables: Map<HTMLElement, Sortable> | undefined,
): boolean {
  const adjacentItemsBounds = [targetItem.nextElementSibling, targetItem.previousElementSibling]
    .filter((item): item is HTMLElement => item instanceof HTMLElement && !!sortables?.has(item))
    .map((item) => item.getBoundingClientRect());
  const adjacentBounds =
    adjacentItemsBounds.find((bounds) => bounds.top <= center.y && bounds.bottom > center.y) ?? adjacentItemsBounds[0];
  const horizontal =
    component.layout === "horizontal" ||
    (component.layout === "grid" && Math.abs(position.x - center.x) > Math.abs(position.y - center.y)) ||
    (!component.layout &&
      (adjacentBounds
        ? Math.abs(adjacentBounds.left + adjacentBounds.width / 2 - center.x) >
          Math.abs(adjacentBounds.top + adjacentBounds.height / 2 - center.y)
        : getComputedStyle(targetItem).display.startsWith("inline")));
  const rightToLeft = horizontal && getComputedStyle(component.el).direction === "rtl";
  return horizontal
    ? rightToLeft
      ? Math.round(position.x) < Math.round(center.x)
      : Math.round(position.x) > Math.round(center.x)
    : Math.round(position.y) > Math.round(center.y);
}

function getDropIndex(
  record: SortableManagerRecord,
  toComponent: SortableComponent,
  sourceSortable: Sortable | undefined,
  targetSortable: Sortable,
  pointerPosition?: { x: number; y: number },
): number {
  const targetIndex = targetSortable.index;

  const sameGroup = sourceSortable?.group === targetSortable.group;

  if (!sourceSortable || sameGroup) {
    return targetIndex;
  }

  const position = pointerPosition ?? record.manager.dragOperation.position.current;
  const targetShape = targetSortable.droppable.shape;
  let center = targetShape?.center;
  const targetItem = targetSortable.element;
  if (targetItem instanceof HTMLElement && targetItem.hasAttribute(copyPlaceholderAttribute)) {
    const bounds = targetItem.getBoundingClientRect();
    center = {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    };
  }
  return (
    targetIndex +
    Number(
      !!center &&
        targetItem instanceof HTMLElement &&
        isAfterTarget(toComponent, targetItem, position, center, record.sortables.get(toComponent)),
    )
  );
}

function clearDropPosition(record: SortableManagerRecord): void {
  const position = record.dropPosition;
  clearDropIndicator(position);
  record.dropPosition = undefined;
}

function clearDropIndicator(position?: DropPosition): void {
  if (position?.copyPlaceholder) {
    position.copyPlaceholder.remove();
    position.copyPlaceholder = undefined;
  }
  const target = position?.indicatorTarget ?? position?.item ?? position?.component.el;
  target?.removeAttribute(sortPositionAttribute);
  target?.removeAttribute(copyPlaceholderAttribute);
}

function showDropIndicator(position: DropPosition, dragEl: HTMLElement): void {
  const lastItem = !position.item
    ? getSortableItems(position.component)
        .filter((item) => item !== dragEl)
        .at(-1)
    : undefined;
  const target = position.item ?? lastItem ?? position.component.el;
  position.indicatorTarget = target;
  const placement = position.placement ?? (lastItem ? "after" : "inside");
  const bounds = dragEl.getBoundingClientRect();
  const placeholder = target.ownerDocument.createElement("div");
  placeholder.setAttribute("data-dnd-placeholder", "copy");
  placeholder.ariaHidden = "true";
  placeholder.inert = true;
  placeholder.style.blockSize = `${bounds.height}px`;
  placeholder.style.inlineSize = `${
    position.component.layout === "horizontal" || position.component.layout === "grid"
      ? bounds.width
      : target.getBoundingClientRect().width
  }px`;
  const referenceItem = position.item ?? lastItem;
  const display = referenceItem ? getComputedStyle(referenceItem).display : undefined;
  if (display?.startsWith("inline")) {
    placeholder.style.display = display;
  }
  const parent = referenceItem?.parentElement ?? position.component.el;
  parent.insertBefore(placeholder, (placement === "before" ? referenceItem : referenceItem?.nextSibling) ?? null);
  position.copyPlaceholder = placeholder;
  target.setAttribute(copyPlaceholderAttribute, "");
  if (target.getAttribute(sortPositionAttribute) !== placement) {
    target.setAttribute(sortPositionAttribute, placement);
  }
}

function isDropEnabled(fromComponent: SortableComponent, toComponent: SortableComponent, dragEl: HTMLElement): boolean {
  if (
    !fromComponent.dragEnabled ||
    fromComponent.disabled ||
    !toComponent.dragEnabled ||
    toComponent.disabled ||
    dragEl.contains(toComponent.el)
  ) {
    return false;
  }

  if (fromComponent === toComponent) {
    return !toComponent.group || !toComponent.sortDisabled;
  }

  return canTransferBetweenComponents(fromComponent, toComponent);
}

function canAcceptDrop(
  fromComponent: SortableComponent,
  toComponent: SortableComponent,
  detail: DragDetail,
  record?: SortableManagerRecord,
  dropTarget: HTMLElement = toComponent.el,
): boolean {
  if (!isDropEnabled(fromComponent, toComponent, detail.dragEl)) {
    return false;
  }

  if (fromComponent === toComponent) {
    return true;
  }

  const placeholder = fromComponent.canPull || toComponent.canPut ? record?.dropPosition?.copyPlaceholder : undefined;
  const parent = placeholder?.parentElement;
  const nextSibling = placeholder?.nextSibling ?? null;
  placeholder?.remove();
  try {
    const pullResult = fromComponent.canPull?.(detail);
    const canPut = toComponent.canPut?.(detail) !== false;
    const canPull = pullResult !== false;

    if (canPull && canPut && record?.activeDrag?.item === detail.dragEl) {
      record.pendingPullOperations.set(dropTarget, {
        newIndex: detail.newIndex,
        operation: pullResult === "clone" ? "clone" : "move",
      });
    }

    return canPull && canPut;
  } finally {
    if (placeholder && parent) {
      parent.insertBefore(placeholder, nextSibling?.parentNode === parent ? nextSibling : null);
    }
  }
}

function getSortableItemData(draggable: { data: unknown }): SortableItemData | undefined {
  return draggable.data as SortableItemData;
}

function makeDragDetail(
  fromEl: HTMLElement,
  toEl: HTMLElement,
  dragEl: HTMLElement,
  oldIndex: number,
  newIndex: number | undefined,
): DragDetail {
  return { fromEl, toEl, dragEl, oldIndex, newIndex };
}

function getManagerRecord(document: Document): SortableManagerRecord {
  let record = managerRecords.get(document);

  if (record) {
    return record;
  }

  const manager = new DragDropManager({
    plugins: (plugins) =>
      plugins
        .filter((plugin) => plugin !== Accessibility)
        .map((plugin) =>
          plugin === Feedback
            ? Feedback.configure({
                dropAnimation: null,
                feedback: (source) => {
                  const data = getSortableItemData(source);
                  const clone =
                    data?.item &&
                    isSortable(source) &&
                    data.component.canPull?.(
                      makeDragDetail(
                        data.component.el,
                        data.component.el,
                        data.item,
                        source.initialIndex,
                        source.initialIndex,
                      ),
                    ) === "clone";
                  return clone ? "clone" : "default";
                },
              })
            : plugin,
        ),
    sensors: (sensors) =>
      sensors
        .filter((sensor) => sensor !== KeyboardSensor)
        .map((sensor) =>
          sensor === PointerSensor
            ? PointerSensor.configure({
                preventActivation: (event, source) =>
                  isHandleDisabled(getEventHandle(event, source)) ||
                  PointerSensor.defaults.preventActivation?.(event, source) === true,
                activationConstraints: (event) =>
                  event.pointerType === "mouse"
                    ? [new PointerActivationConstraints.Distance({ value: 5 })]
                    : event.pointerType === "touch"
                      ? [new PointerActivationConstraints.Delay({ value: 250, tolerance: 5 })]
                      : [
                          new PointerActivationConstraints.Delay({ value: 200, tolerance: 10 }),
                          new PointerActivationConstraints.Distance({ value: 5 }),
                        ],
              })
            : sensor,
        ),
  });

  record = {
    manager,
    components: new Set(),
    sortables: new Map(),
    containerTargets: new Map(),
    isDragging: false,
    isAlive: true,
    pendingReset: new Map(),
    itemStates: new Map(),
    pendingPullOperations: new Map(),
    acceptedPullOperations: new Map(),
    removeListeners: [],
  };

  const flushPendingReset = (): void => {
    if (!record.pendingReset.size) {
      return;
    }

    const pendingResets = [...record.pendingReset.values()];
    record.pendingReset.clear();
    pendingResets.forEach((reset) => reset());
  };

  const setGlobalDragActive = (active: boolean): void => {
    if (record.isDragging === active) {
      return;
    }

    record.isDragging = active;

    if (active) {
      record.components.forEach((component) => component.onGlobalDragStart?.());
      return;
    }

    record.pendingPullOperations.clear();
    record.acceptedPullOperations.clear();
    record.components.forEach((component) => component.onGlobalDragEnd?.());
    Array.from(record.itemStates.values()).forEach((state) => state.reset());
    flushPendingReset();
  };

  const getSortableTarget = (target: unknown): Sortable | undefined => {
    if (!target || typeof target !== "object" || !("sortable" in target)) {
      return undefined;
    }

    return (target as { sortable?: Sortable }).sortable;
  };

  /** Tracks Calcite-specific destination state and copy feedback from dnd-kit's drag-over targets. */
  const handleDragOver = (
    event: Pick<DragOverEvent, "operation" | "preventDefault">,
    pointerPosition?: { x: number; y: number },
  ): void => {
    const { source, target } = event.operation;
    const sourceData = source ? getSortableItemData(source) : undefined;
    const targetData = target && "data" in target ? (target.data as SortableItemData) : undefined;
    const targetSortable = getSortableTarget(target);
    const currentPosition = pointerPosition ?? record.manager.dragOperation.position.current;
    const copyPlaceholder = record.dropPosition?.copyPlaceholder;
    if (copyPlaceholder) {
      const bounds = copyPlaceholder.getBoundingClientRect();
      if (
        currentPosition.x >= bounds.left &&
        currentPosition.x <= bounds.right &&
        currentPosition.y >= bounds.top &&
        currentPosition.y <= bounds.bottom
      ) {
        event.preventDefault();
        return;
      }
    }
    const automaticDropIndex =
      source && isSortable(source) && targetData && targetSortable
        ? getDropIndex(record, targetData.component, source.sortable, targetSortable, pointerPosition)
        : undefined;

    clearDropIndicator(record.dropPosition);

    if (!source || !isSortable(source) || !target) {
      return;
    }

    if (
      sourceData?.item === targetData?.item &&
      record.dropPosition &&
      record.acceptedPullOperations.get(record.dropPosition.component) === "clone"
    ) {
      clearDropPosition(record);
    }

    if (
      !sourceData?.item ||
      !targetData ||
      (targetData.item && sourceData.item === targetData.item) ||
      (targetData.item && !targetSortable)
    ) {
      return;
    }

    const { component: fromComponent, item: dragEl } = sourceData;
    const { component: toComponent } = targetData;
    const relatedEl = targetData.item;

    if (fromComponent !== toComponent && !canTransferBetweenComponents(fromComponent, toComponent)) {
      event.preventDefault();
      record.dropPosition = undefined;
      return;
    }

    const newIndex =
      targetSortable && relatedEl ? automaticDropIndex! : getAppendIndex(record, fromComponent, toComponent);
    const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, source.initialIndex, newIndex);
    const pullOperation = record.pendingPullOperations.get(relatedEl ?? toComponent.el);
    const clone = fromComponent !== toComponent && pullOperation?.operation === "clone";
    if (clone) {
      event.preventDefault();
    }

    record.dropPosition = {
      component: toComponent,
      item: relatedEl,
      newIndex,
      placement:
        clone && relatedEl
          ? newIndex >
            getSortableItems(toComponent)
              .filter((item) => item !== dragEl)
              .indexOf(relatedEl)
            ? "after"
            : "before"
          : undefined,
    };

    fromComponent.onDragMove?.({ ...detail, relatedEl: relatedEl ?? toComponent.el });

    const previousComponent = Array.from(record.components).find((component) => component.el === dragEl.parentElement);
    const restoreSource =
      clone && record.activeDrag && (source.group !== source.initialGroup || source.index !== source.initialIndex);
    if (restoreSource) {
      restoreSortableItem(record.activeDrag!);
      source.sortable.group = source.initialGroup;
    }
    const placeholder = dragEl.nextElementSibling;
    if (placeholder?.hasAttribute("data-dnd-placeholder")) {
      placeholder.setAttribute("data-dnd-placeholder", clone ? "clone" : "hidden");
    }
    if (!clone && !relatedEl) {
      toComponent.el.append(source.sortable.element ?? dragEl);
      source.sortable.refreshShape();
      source.sortable.group = getSortableGroup(toComponent);
    }
    if (restoreSource || (!clone && !relatedEl)) {
      new Set([fromComponent, previousComponent, toComponent]).forEach((component) => {
        if (!component) {
          return;
        }
        getSortableItems(component)
          .filter((item) => restoreSource || item !== dragEl)
          .forEach((item, index) => {
            const sortable = item === dragEl ? source.sortable : record.sortables.get(component)?.get(item);
            if (sortable) {
              sortable.index = index;
            }
          });
      });
      source.sortable.index = restoreSource ? source.initialIndex : newIndex;
    }

    if (clone) {
      showDropIndicator(record.dropPosition, dragEl);
    }
    if (
      pullOperation?.newIndex === newIndex &&
      (!record.acceptedPullOperations.has(toComponent) || dragEl.parentElement !== toComponent.el)
    ) {
      record.acceptedPullOperations.set(toComponent, pullOperation.operation);
    }
  };

  /** Applies Calcite's final move or clone semantics and invokes the affected component callbacks. */
  const finishAutomaticDrop = (
    activeDrag: ActiveDrag,
    dropPosition: DropPosition | undefined,
    canceled: boolean,
  ): void => {
    const { component: fromComponent, item: dragEl, oldIndex } = activeDrag;
    const currentComponent =
      Array.from(record.components).find((component) => dragEl.parentElement === component.el) ?? fromComponent;
    let toComponent = canceled ? currentComponent : (dropPosition?.component ?? currentComponent);
    const dropCanceled =
      canceled ||
      !isDropEnabled(fromComponent, toComponent, dragEl) ||
      (!!dropPosition?.item &&
        record.acceptedPullOperations.get(toComponent) === "clone" &&
        !getSortableItems(toComponent).includes(dropPosition.item));

    if (dropCanceled) {
      restoreSortableItem(activeDrag);
      toComponent = fromComponent;
    }

    const cloning =
      !dropCanceled &&
      !!dropPosition &&
      fromComponent !== toComponent &&
      record.acceptedPullOperations.get(toComponent) === "clone";
    const destinationItems = cloning
      ? getSortableItems(toComponent).filter((item) => item !== dragEl)
      : getSortableItems(toComponent);
    const newIndex = dropCanceled
      ? oldIndex
      : cloning && dropPosition
        ? dropPosition.item
          ? destinationItems.indexOf(dropPosition.item) + Number(dropPosition.placement === "after")
          : destinationItems.length
        : destinationItems.indexOf(dragEl);
    const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, oldIndex, newIndex);
    const orderChanged = !dropCanceled && (fromComponent !== toComponent || oldIndex !== newIndex);

    if (cloning) {
      // Native cloning intentionally omits non-reflected properties, runtime state, and non-cloneable shadow roots.
      const clone = dragEl.cloneNode(true) as HTMLElement;
      const cloneId = guid();
      if (clone.id) {
        clone.id = cloneId;
      }
      const referenceItem = destinationItems[newIndex] ?? null;
      const parent = referenceItem?.parentElement ?? destinationItems.at(-1)?.parentElement ?? toComponent.el;
      parent.insertBefore(clone, referenceItem);
      restoreSortableItem(activeDrag);
      sortableItemIds.set(clone, cloneId);
    }

    setGlobalDragActive(false);
    if (orderChanged) {
      fromComponent.onDragSort(detail);
      if (fromComponent !== toComponent) {
        toComponent.onDragSort(detail);
      }
    }
    fromComponent.onDragEnd(detail);
  };

  record.removeListeners.push(
    // Prefer a nested sortable over an ancestor list container that also contains the pointer.
    manager.monitor.addEventListener("collision", ({ collisions }) => {
      let targetIndex = 0;
      const pointer = manager.dragOperation.position.current;
      // eslint-disable-next-line @cspell/spellchecker
      const { droppables: dropTargets } = manager.registry;

      for (let index = 1; index < collisions.length; index++) {
        const target = dropTargets.get(collisions[targetIndex].id);
        const candidate = dropTargets.get(collisions[index].id);

        if (
          target?.element &&
          candidate?.element &&
          target.element.contains(candidate.element) &&
          candidate.shape?.containsPoint(pointer)
        ) {
          targetIndex = index;
        }
      }

      if (targetIndex) {
        const [collision] = collisions.splice(targetIndex, 1);
        collisions.unshift(collision);
      }
    }),
    // Snapshot the source location for cancellation recovery and notify components that dragging began.
    manager.monitor.addEventListener("dragstart", ({ operation }) => {
      const source = operation.source;

      if (!source || !isSortable(source)) {
        return;
      }

      const sourceData = getSortableItemData(source);

      if (!sourceData) {
        return;
      }

      const { component, item } = sourceData;
      if (!item) {
        return;
      }

      const oldParent = item.parentElement;

      if (!oldParent) {
        return;
      }

      record.activeDrag = {
        component,
        item,
        oldIndex: source.initialIndex,
        oldParent,
        nextSibling: item.nextSibling,
      };
      record.dropPosition = undefined;
      component.onDragStart(makeDragDetail(component.el, component.el, item, source.initialIndex, undefined));
      setGlobalDragActive(true);
    }),
    // Route dnd-kit's current target through Calcite's destination and clone bookkeeping.
    manager.monitor.addEventListener("dragover", (event) => handleDragOver(event)),
    // Reconcile copy feedback with pointer movement, including when the pointer leaves a destination.
    manager.monitor.addEventListener("dragmove", (event) => {
      const clone = record.dropPosition && record.acceptedPullOperations.get(record.dropPosition.component) === "clone";
      if (clone) {
        const position = event.to ?? {
          x: manager.dragOperation.position.current.x + (event.by?.x ?? 0),
          y: manager.dragOperation.position.current.y + (event.by?.y ?? 0),
        };
        if (record.dropPosition) {
          const bounds = record.dropPosition.component.el.getBoundingClientRect();
          if (
            position.x < bounds.left ||
            position.x > bounds.right ||
            position.y < bounds.top ||
            position.y > bounds.bottom
          ) {
            const hadCopyPlaceholder = !!record.dropPosition.copyPlaceholder;
            clearDropIndicator(record.dropPosition);
            if (hadCopyPlaceholder) {
              record.sortables.get(record.dropPosition.component)?.forEach((sortable) => sortable.refreshShape());
              record.containerTargets.get(record.dropPosition.component)?.refreshShape();
            }
            return;
          }
        }
        if (!event.operation.target?.shape?.containsPoint(position)) {
          return;
        }
        handleDragOver({ operation: event.operation, preventDefault: () => {} }, position);
      }
    }),
    // Copy placeholders are plain DOM nodes, so resolve drops over them from pointer bounds rather than dnd-kit targets.
    // Wait for dnd-kit's final render before committing the move/clone or restoring a canceled drag.
    manager.monitor.addEventListener("dragend", (event) => {
      const activeDrag = record.activeDrag;
      const dropPosition = record.dropPosition;
      const targetData = event.operation.target ? getSortableItemData(event.operation.target) : undefined;
      const position = record.manager.dragOperation.position.current;
      const copyBounds = dropPosition?.copyPlaceholder?.isConnected
        ? dropPosition.copyPlaceholder.getBoundingClientRect()
        : undefined;
      const overCopyPlaceholder =
        !!copyBounds &&
        position.x >= copyBounds.left &&
        position.x <= copyBounds.right &&
        position.y >= copyBounds.top &&
        position.y <= copyBounds.bottom;
      const targetComponent =
        overCopyPlaceholder && dropPosition
          ? dropPosition.component
          : activeDrag && targetData?.item === activeDrag.item
            ? Array.from(record.components).find((component) => activeDrag.item.parentElement === component.el)
            : targetData?.component;
      const targetBounds = targetComponent?.el.getBoundingClientRect();
      const outsideTarget =
        !!targetBounds &&
        (position.x < targetBounds.left ||
          position.x > targetBounds.right ||
          position.y < targetBounds.top ||
          position.y > targetBounds.bottom);
      const canceled =
        event.canceled ||
        !targetComponent ||
        outsideTarget ||
        (!!dropPosition && targetComponent !== dropPosition.component);

      requestAnimationFrame(async () => {
        await record.manager.renderer.rendering;

        record.activeDrag = undefined;
        clearDropPosition(record);

        if (!activeDrag) {
          setGlobalDragActive(false);
          return;
        }

        finishAutomaticDrop(activeDrag, dropPosition, canceled);
      });
    }),
  );

  managerRecords.set(document, record);
  return record;
}

function tearDownSortable(component: SortableComponent, record: SortableManagerRecord): void {
  const state = record.itemStates.get(component);
  if (state) {
    state.slot.removeEventListener("slotchange", state.reset);
  }
  record.itemStates.delete(component);
  const sortables = record.sortables.get(component);

  sortables?.forEach((sortable) => sortable.destroy());
  record.sortables.delete(component);
  record.containerTargets.get(component)?.destroy();
  record.containerTargets.delete(component);
}

function createSortable(component: SortableComponent, record: SortableManagerRecord): void {
  const sortables = new Map<HTMLElement, Sortable>();
  const group = getSortableGroup(component);
  const containerDroppable = new Droppable<SortableItemData>(
    {
      id: `${group}:container`,
      element: component.el,
      data: { component },
      collisionPriority: -1,
      accept: (draggable) => {
        const sourceData = getSortableItemData(draggable);

        if (!sourceData?.item) {
          return false;
        }

        const { component: fromComponent, item: dragEl } = sourceData;
        const sourceSortable = record.sortables.get(fromComponent)?.get(dragEl);
        const oldIndex = sourceSortable?.initialIndex ?? 0;
        const newIndex = getAppendIndex(record, fromComponent, component);
        const detail = makeDragDetail(fromComponent.el, component.el, dragEl, oldIndex, newIndex);

        return canAcceptDrop(fromComponent, component, detail, record);
      },
    },
    record.manager,
  );

  record.containerTargets.set(component, containerDroppable);

  getSortableItems(component).forEach((item, index) => {
    const sortable = new Sortable(
      {
        id: `${group}:item:${getSortableItemId(item)}`,
        index,
        group,
        element: item,
        handle: item,
        disabled: !!component.disabled,
        data: { component, item },
        plugins: (plugins) => plugins.filter((plugin) => plugin !== SortableKeyboardPlugin),
        accept: (draggable) => {
          const sourceData = getSortableItemData(draggable);

          if (!sourceData) {
            return false;
          }

          const { component: fromComponent, item: dragEl } = sourceData;

          if (!dragEl) {
            return false;
          }

          const sourceSortable = record.sortables.get(fromComponent)?.get(dragEl);
          const oldIndex = sourceSortable?.initialIndex ?? 0;
          const targetSortable = record.sortables.get(component)?.get(item);
          const newIndex = targetSortable ? getDropIndex(record, component, sourceSortable, targetSortable) : index;
          const detail = makeDragDetail(fromComponent.el, component.el, dragEl, oldIndex, newIndex);
          return canAcceptDrop(fromComponent, component, detail, record, item);
        },
      },
      record.manager,
    );

    sortables.set(item, sortable);
  });

  record.sortables.set(component, sortables);
}

/**
 * Installs Calcite sorting behavior on a component using dnd-kit Sortable primitives.
 *
 * One dnd-kit manager is shared per document. When `dragEnabled` is true and the component is not disabled, each
 * eligible direct child gets a dnd-kit Sortable and the component host gets a Droppable. `dragSelector` filters
 * eligible children, `handleSelector` selects the pointer handle (defaulting to `calcite-sort-handle`), and
 * `slotRef` switches item discovery to the slot's assigned elements and resets on `slotchange`.
 *
 * dnd-kit provides pointer sensing, collision detection, and per-item sortable state. This controller adds
 * Calcite's transfer policy: cross-component drops require a matching group and may be further restricted by
 * `canPull` and `canPut`. It also manages copy placeholders, restores canceled moves, and clones accepted copy drops
 * with `cloneNode(true)` before invoking the component callbacks. Components apply their own order/data updates in
 * `onDragSort`.
 *
 * Changes to `dragEnabled` and `disabled` reset sortable setup automatically. Use the returned `reset` method when
 * another relevant change is not observed by the controller.
 */
export const useSortable = <T extends SortableComponent>(
  options: SortableOptions = {},
): ReturnType<typeof makeGenericController<UseSortable, T>> => {
  return makeGenericController<UseSortable, T>((component, controller) => {
    const sortableComponent = component as T & SortableComponent;
    sortableOptionsByComponent.set(sortableComponent, options);
    let record: SortableManagerRecord | undefined;
    let setupGeneration = 0;

    function dragActive(): boolean {
      return !!record?.isDragging;
    }

    async function setUpSortable(): Promise<void> {
      if (!sortableComponent.isConnected) {
        return;
      }

      if (!record?.isAlive) {
        record = getManagerRecord(sortableComponent.el.ownerDocument);
      }

      if (dragActive()) {
        record.pendingReset.set(sortableComponent, reset);
        return;
      }

      const generation = ++setupGeneration;
      const currentRecord = record;
      tearDownSortable(sortableComponent, currentRecord);
      currentRecord.components.delete(sortableComponent);
      currentRecord.pendingReset.delete(sortableComponent);

      if (!sortableComponent.dragEnabled || sortableComponent.disabled) {
        return;
      }

      // Await rendered items; generation checks below discard setup made stale by a reset or disconnect.
      await sortableComponent.updateComplete;
      const items = getSortableItems(sortableComponent);
      await Promise.all(items.map((item) => item.updateComplete));

      if (generation !== setupGeneration || !sortableComponent.isConnected || record !== currentRecord) {
        return;
      }

      if (!currentRecord.isAlive) {
        await setUpSortable();
        return;
      }

      if (currentRecord.isDragging || currentRecord.activeDrag) {
        currentRecord.pendingReset.set(sortableComponent, reset);
        return;
      }

      currentRecord.components.add(sortableComponent);
      createSortable(sortableComponent, currentRecord);
      if (options.slotRef) {
        const slot = options.slotRef.value;
        if (slot) {
          slot.addEventListener("slotchange", reset);
          currentRecord.itemStates.set(sortableComponent, { slot, reset });
        }
      }
    }

    function tearDown(force = false): void {
      setupGeneration++;

      if (!record?.isAlive || (!force && dragActive())) {
        if (record?.isAlive && dragActive()) {
          record.pendingReset.set(sortableComponent, reset);
        }
        return;
      }

      if (record.activeDrag?.component === sortableComponent || record.dropPosition?.component === sortableComponent) {
        record.manager.actions.stop({ canceled: true });
      }

      tearDownSortable(sortableComponent, record);
      record.components.delete(sortableComponent);
      record.pendingReset.delete(sortableComponent);

      if (!record.components.size) {
        if (record.activeDrag) {
          record.activeDrag.component.onGlobalDragEnd?.();
        }

        record.isAlive = false;
        record.removeListeners.forEach((removeListener) => removeListener());
        record.manager.destroy();
        managerRecords.delete(sortableComponent.el.ownerDocument);
        record = undefined;
      }
    }

    function reset(): void {
      if (record?.isAlive && dragActive()) {
        record.pendingReset.set(sortableComponent, reset);
        return;
      }

      record?.pendingReset.delete(sortableComponent);
      void setUpSortable();
    }

    controller.onConnected(() => {
      record = getManagerRecord(sortableComponent.el.ownerDocument);
      void setUpSortable();
    });

    controller.onUpdate((changes) => {
      if (changes.has("disabled") || changes.has("dragEnabled")) {
        reset();
      }
    });

    controller.onDisconnected(() => {
      tearDown(true);
    });

    return {
      reset,
    };
  });
};
