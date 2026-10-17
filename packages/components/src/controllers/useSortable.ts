import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
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
import { createObserver } from "../utils/observers";
import type { BivariantHandler } from "../components/types";

interface SortableItemData {
  component: SortableComponent;
  item?: HTMLElement;
}

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

interface ManualItemIndices {
  indices?: Map<HTMLElement, number>;
  observer: MutationObserver;
}

interface SortableManagerRecord {
  manager: DragDropManager;
  components: Set<SortableComponent>;
  sortables: Map<SortableComponent, Map<HTMLElement, Sortable>>;
  containerTargets: Map<SortableComponent, Droppable<SortableItemData>>;
  dragging: boolean;
  alive: boolean;
  activeDrag?: ActiveDrag;
  lastOver?: string;
  dropPosition?: DropPosition;
  acceptedDropPosition?: DropPosition;
  dropCanceled: boolean;
  pendingReset: Set<SortableComponent>;
  manualItemIndices: Map<SortableComponent, ManualItemIndices>;
  pendingPullOperations: Map<HTMLElement, { newIndex: number | undefined; operation: "move" | "clone" }>;
  acceptedPullOperations: Map<SortableComponent, "move" | "clone">;
  removeListeners: (() => void)[];
}

const managerRecords = new WeakMap<Document, SortableManagerRecord>();
const componentGroupIds = new WeakMap<SortableComponent, string>();
const sortableItemIds = new WeakMap<HTMLElement, string>();
const sortPositionAttribute = "data-calcite-sort-position";
const copyPlaceholderAttribute = "data-calcite-sort-placeholder";
const placeholderHeightProperty = "--calcite-internal-sortable-placeholder-height";

/** Specifies whether Calcite or the application manages sortable item order. */
export type SortMode = "automatic" | "manual";

/** Describes an order change for the application to render. */
export type OrderRequestDetail<D extends DragDetail = DragDetail> = D & {
  /** The source index when the operation started. */
  oldIndex: number;
  /** The destination index after removing the source item for a move. */
  newIndex: number;
  /** Whether the application should move the item or create a copy in the destination. */
  operation: "move" | "clone";
};

function isHandleDisabled(handle?: HTMLElement): boolean {
  return (
    !handle ||
    handle.hasAttribute("disabled") ||
    ("disabled" in handle && Boolean((handle as HTMLButtonElement).disabled))
  );
}

function getEventHandle(event: Event, source: Draggable): HTMLElement | undefined {
  if (!isSortable(source)) {
    return undefined;
  }

  const data = getSortableItemData(source);
  const item = data?.item;

  if (!data || !item) {
    return undefined;
  }

  return event
    .composedPath()
    .find(
      (target): target is HTMLElement =>
        target instanceof HTMLElement &&
        target.matches(data.component.handleSelector) &&
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

export type DragStartDetail<D extends DragDetail = DragDetail> = Omit<D, "newIndex"> & {
  newIndex: null;
};

/**
 * Defines interface for components with sorting functionality.
 */
interface SortableComponent<D extends DragDetail = DragDetail, M extends MoveDetail = MoveDetail> extends LitElement {
  /** When `true`, dragging is enabled. */
  dragEnabled: boolean;

  /** When `true`, interaction should be disabled. */
  disabled?: boolean;

  /** When `true`, sorting is disabled. */
  sortDisabled?: boolean;

  /** Specifies whether the component or the application owns item order. */
  sortMode?: SortMode;

  /** Specifies which items inside the element should be draggable. */
  dragSelector?: string;

  /** The list's group identifier. */
  group?: string;

  /** The selector for the handle elements. */
  handleSelector: string;

  /** The sortable items' layout direction. */
  layout?: "horizontal" | "vertical" | "grid";

  /** Whether the element can move from the list. */
  canPull?: BivariantHandler<D, boolean | "clone">;

  /** Whether the element can be added from another list. */
  canPut?: BivariantHandler<D, boolean>;

  /** Called when any sortable component drag starts. For internal use only. Any public drag events should emit within `onDragStart()`. */
  onGlobalDragStart: () => void;

  /** Called when any sortable component drag ends. For internal use only. Any public drag events should emit within `onDragEnd()`. */
  onGlobalDragEnd: () => void;

  /** Called when a component's dragging ends. */
  onDragEnd: BivariantHandler<D, void>;

  /** Called when a component's drag position changes. */
  onDragMove?: BivariantHandler<M, void>;

  /** Called when a component's dragging starts. */
  onDragStart: BivariantHandler<DragStartDetail<D>, void>;

  /** Called before list mutations caused by sorting. */
  onDragBeforeSort?: BivariantHandler<D, Event | void>;

  /** Called by any change to the list (add / update / remove). */
  onDragSort: BivariantHandler<D, void>;

  /** Requests an application-managed order change on the source component only. */
  onOrderRequest?: BivariantHandler<OrderRequestDetail<D>, void>;

  /** Returns the sortable items managed by the component. */
  getSortableItems?: () => HTMLElement[];
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

function getSortableItems(component: SortableComponent): HTMLElement[] {
  const items = component.getSortableItems?.() ?? Array.from(component.el.children);
  const { dragSelector } = component;

  return items.filter(
    (item): item is HTMLElement =>
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
    id = item.id || guid();
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
  return (
    !!fromComponent.group &&
    fromComponent.group === toComponent.group &&
    (fromComponent.sortMode ?? "automatic") === (toComponent.sortMode ?? "automatic")
  );
}

function getAppendIndex(
  record: SortableManagerRecord,
  fromComponent: SortableComponent,
  toComponent: SortableComponent,
  dragEl: HTMLElement,
): number {
  if (toComponent.sortMode === "manual") {
    return getSortableItems(toComponent).filter((item) => item !== dragEl).length;
  }

  const itemCount = record.sortables.get(toComponent)?.size ?? getSortableItems(toComponent).length;
  return itemCount - Number(fromComponent === toComponent);
}

function getManualItemIndex(
  record: SortableManagerRecord,
  component: SortableComponent,
  dragEl: HTMLElement,
  targetItem: HTMLElement,
): number {
  let snapshot = record.manualItemIndices.get(component);
  if (!snapshot) {
    const nextSnapshot: ManualItemIndices = {
      observer: createObserver("mutation", () => {
        nextSnapshot.indices = undefined;
      })!,
    };
    nextSnapshot.observer.observe(component.el, { attributes: true, childList: true, subtree: true });
    record.manualItemIndices.set(component, nextSnapshot);
    snapshot = nextSnapshot;
  }

  if (snapshot.observer.takeRecords().length) {
    snapshot.indices = undefined;
  }
  snapshot.indices ??= new Map(getSortableItems(component).map((item, index) => [item, index]));
  const targetIndex = snapshot.indices.get(targetItem) ?? -1;
  const sourceIndex = snapshot.indices.get(dragEl);
  return targetIndex - Number(sourceIndex !== undefined && sourceIndex < targetIndex);
}

function getManualDropIndex(
  component: SortableComponent,
  dragEl: HTMLElement,
  targetItem: HTMLElement,
  position: { x: number; y: number },
  targetIndex = getSortableItems(component)
    .filter((item) => item !== dragEl)
    .indexOf(targetItem),
): number {
  const bounds = targetItem.getBoundingClientRect();
  const center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
  const horizontal =
    component.layout === "horizontal" ||
    (component.layout === "grid" && Math.abs(position.x - center.x) > Math.abs(position.y - center.y));
  const rightToLeft = horizontal && getComputedStyle(component.el).direction === "rtl";
  const after = horizontal
    ? rightToLeft
      ? Math.round(position.x) < Math.round(center.x)
      : Math.round(position.x) > Math.round(center.x)
    : Math.round(position.y) > Math.round(center.y);
  return targetIndex + Number(after);
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

  if (toComponent.sortMode !== "manual" && (!sourceSortable || sameGroup)) {
    return targetIndex;
  }

  const position =
    pointerPosition ??
    (toComponent.sortMode === "manual" || !sameGroup
      ? record.manager.dragOperation.position.current
      : (record.manager.dragOperation.shape?.current.center ?? record.manager.dragOperation.position.current));
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
  const horizontal =
    toComponent.layout === "horizontal" ||
    (toComponent.layout === "grid" && !!center && Math.abs(position.x - center.x) > Math.abs(position.y - center.y));
  const rightToLeft = horizontal && getComputedStyle(toComponent.el).direction === "rtl";
  const after =
    !!center &&
    (horizontal
      ? rightToLeft
        ? Math.round(position.x) < Math.round(center.x)
        : Math.round(position.x) > Math.round(center.x)
      : Math.round(position.y) > Math.round(center.y));
  const insertionIndex = targetIndex + Number(after);
  return insertionIndex - Number(sameGroup && !!sourceSortable && sourceSortable.index < insertionIndex);
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
  target?.style.removeProperty(placeholderHeightProperty);
}

function showDropIndicator(position: DropPosition, dragEl: HTMLElement, clone = false): void {
  const lastItem =
    clone && !position.item
      ? getSortableItems(position.component)
          .filter((item) => item !== dragEl)
          .at(-1)
      : undefined;
  const target = position.item ?? lastItem ?? position.component.el;
  position.indicatorTarget = target;
  const placement = position.placement ?? (lastItem ? "after" : "inside");
  const copyGap = clone && target !== position.component.el;
  if (copyGap) {
    const bounds = dragEl.getBoundingClientRect();
    const placeholder = target.ownerDocument.createElement("div");
    placeholder.setAttribute("data-dnd-placeholder", "copy");
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.inert = true;
    placeholder.style.blockSize = `${bounds.height}px`;
    placeholder.style.inlineSize = `${
      position.component.layout === "horizontal" || position.component.layout === "grid"
        ? bounds.width
        : target.getBoundingClientRect().width
    }px`;
    target.insertAdjacentElement(placement === "before" ? "beforebegin" : "afterend", placeholder);
    position.copyPlaceholder = placeholder;
  } else if (target === position.component.el) {
    target.style.setProperty(placeholderHeightProperty, `${dragEl.getBoundingClientRect().height}px`);
  }
  target.toggleAttribute(copyPlaceholderAttribute, copyGap);
  target.setAttribute(sortPositionAttribute, placement);
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

  const placeholder = record?.dropPosition?.copyPlaceholder;
  const parent = placeholder?.parentElement;
  const nextSibling = placeholder?.nextSibling ?? null;
  placeholder?.remove();
  try {
    const pullResult = fromComponent.canPull?.(detail);
    const canPut = toComponent.canPut?.(detail) !== false;
    const canPull = pullResult !== false;

    if (canPull && canPut && record?.activeDrag?.item === detail.dragEl && fromComponent.sortMode !== "manual") {
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

function makeDragStartDetail(fromEl: HTMLElement, dragEl: HTMLElement, oldIndex: number): DragStartDetail {
  return { fromEl, toEl: fromEl, dragEl, oldIndex, newIndex: null };
}

function cloneSortableItem(item: HTMLElement): HTMLElement {
  const clone = item.cloneNode(true) as HTMLElement;
  copySortableItemState(item, clone);
  return clone;
}

function copySortableItemState(item: HTMLElement, clone: HTMLElement): void {
  const sourceElements = [item, ...item.querySelectorAll<HTMLElement>("*")];
  const cloneElements = [clone, ...clone.querySelectorAll<HTMLElement>("*")];

  sourceElements.forEach((sourceElement, index) => {
    const cloneElement = cloneElements[index];
    let prototype = customElements.get(sourceElement.localName)
      ? (Object.getPrototypeOf(sourceElement) as object | null)
      : null;

    while (prototype && prototype !== HTMLElement.prototype) {
      Object.getOwnPropertyNames(prototype).forEach((propertyName) => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);

        if (descriptor?.get && descriptor.set && propertyName !== "el") {
          (cloneElement as unknown as Record<string, unknown>)[propertyName] = (
            sourceElement as unknown as Record<string, unknown>
          )[propertyName];
        }
      });

      prototype = Object.getPrototypeOf(prototype) as object | null;
    }

    if (sourceElement instanceof HTMLInputElement && cloneElement instanceof HTMLInputElement) {
      if (sourceElement.type !== "file") {
        cloneElement.value = sourceElement.value;
      }
      cloneElement.checked = sourceElement.checked;
    }
  });
}

function getManagerRecord(document: Document): SortableManagerRecord {
  let record = managerRecords.get(document);

  if (record) {
    return record;
  }

  let dragPreview: HTMLElement | undefined;
  const initializedCopyPlaceholders = new WeakSet<Element>();
  const initializeCopyPlaceholder = (item: HTMLElement): void => {
    const placeholder = item.nextElementSibling;
    if (
      placeholder instanceof HTMLElement &&
      placeholder.getAttribute("data-dnd-placeholder") === "clone" &&
      !initializedCopyPlaceholders.has(placeholder)
    ) {
      copySortableItemState(item, placeholder);
      initializedCopyPlaceholders.add(placeholder);
    }
  };
  const clearDragPreview = (): void => {
    if (!dragPreview) {
      return;
    }
    manager.registry.plugins.get(Feedback)!.overlay = undefined;
    dragPreview.remove();
    dragPreview = undefined;
  };

  const manager = new DragDropManager({
    plugins: (plugins) =>
      plugins
        .filter((plugin) => plugin !== Accessibility)
        .map((plugin) =>
          plugin === Feedback
            ? Feedback.configure({
                dropAnimation: null,
                feedback: (source, manager) => {
                  const data = getSortableItemData(source);
                  if (data?.component.sortMode !== "manual" || !data.item) {
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
                  }

                  // Use an overlay so neither the source nor its framework-managed siblings move.
                  if (!dragPreview) {
                    dragPreview = cloneSortableItem(data.item);
                    [dragPreview, ...dragPreview.querySelectorAll("*")].forEach((element) => {
                      element.removeAttribute("id");
                      element.removeAttribute("name");
                      element.removeAttribute("form");
                      if ("dragEnabled" in element) {
                        element.dragEnabled = false;
                      }
                    });
                    dragPreview.inert = true;
                    dragPreview.setAttribute("aria-hidden", "true");
                    dragPreview.style.pointerEvents = "none";
                    document.body.append(dragPreview);
                    manager.registry.plugins.get(Feedback)!.overlay = dragPreview;
                  }
                  return "move";
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
    dragging: false,
    alive: true,
    dropCanceled: false,
    pendingReset: new Set(),
    manualItemIndices: new Map(),
    pendingPullOperations: new Map(),
    acceptedPullOperations: new Map(),
    removeListeners: [clearDragPreview],
  };

  const flushPendingReset = (): void => {
    if (!record.pendingReset.size) {
      return;
    }

    const pending = [...record.pendingReset];
    record.pendingReset.clear();
    pending.forEach((component) => {
      (component as unknown as { sortable?: { reset: () => void } }).sortable?.reset();
    });
  };

  const setGlobalDragActive = (active: boolean): void => {
    if (record.dragging === active) {
      return;
    }

    record.dragging = active;

    if (active) {
      record.components.forEach((component) => component.onGlobalDragStart());
      return;
    }

    record.pendingPullOperations.clear();
    record.acceptedPullOperations.clear();
    record.components.forEach((component) => component.onGlobalDragEnd());
    flushPendingReset();
  };

  const getSortableTarget = (target: unknown): Sortable | undefined => {
    if (!target || typeof target !== "object" || !("sortable" in target)) {
      return undefined;
    }

    return (target as { sortable?: Sortable }).sortable;
  };

  const handleDragOver = (
    event: Pick<DragOverEvent, "operation" | "preventDefault">,
    pointerPosition?: { x: number; y: number },
  ): void => {
    const { source, target } = event.operation;
    const manual = !!source && getSortableItemData(source)?.component.sortMode === "manual";
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
      !manual && source && isSortable(source) && targetData && targetSortable
        ? getDropIndex(record, targetData.component, source.sortable, targetSortable, pointerPosition)
        : undefined;

    clearDropIndicator(record.dropPosition);
    if (manual) {
      // The optimistic plugin is shared by every sortable in this document.
      event.preventDefault();
      clearDropPosition(record);
    }

    if (!source || !isSortable(source) || !target) {
      return;
    }

    if (
      sourceData?.item === targetData?.item &&
      record.dropPosition &&
      record.acceptedPullOperations.get(record.dropPosition.component) === "clone"
    ) {
      clearDropPosition(record);
      record.dropCanceled = false;
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
    const relatedEl = manual
      ? getSortableItems(toComponent).find((item) => {
          const bounds = item.getBoundingClientRect();
          return (
            currentPosition.x >= bounds.left &&
            currentPosition.x <= bounds.right &&
            currentPosition.y >= bounds.top &&
            currentPosition.y <= bounds.bottom
          );
        })
      : targetData.item;

    if (manual && relatedEl === dragEl) {
      return;
    }

    if (fromComponent !== toComponent && !canTransferBetweenComponents(fromComponent, toComponent)) {
      event.preventDefault();
      record.lastOver = undefined;
      record.dropPosition = undefined;
      record.dropCanceled = false;
      return;
    }

    const newIndex =
      manual && relatedEl
        ? getManualDropIndex(toComponent, dragEl, relatedEl, currentPosition)
        : targetSortable && relatedEl
          ? automaticDropIndex!
          : getAppendIndex(record, fromComponent, toComponent, dragEl);
    const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, source.initialIndex, newIndex);
    if (manual && !canAcceptDrop(fromComponent, toComponent, detail)) {
      return;
    }
    const signature = `${getSortableGroup(toComponent)}:${relatedEl ? getSortableItemId(relatedEl) : "container"}:${newIndex}`;
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
        (manual || clone) && relatedEl
          ? newIndex >
            getSortableItems(toComponent)
              .filter((item) => item !== dragEl)
              .indexOf(relatedEl)
            ? "after"
            : "before"
          : undefined,
    };

    fromComponent.onDragMove?.({ ...detail, relatedEl: relatedEl ?? toComponent.el });

    if (manual) {
      if (fromComponent !== toComponent || getSortableItems(fromComponent).indexOf(dragEl) !== newIndex) {
        showDropIndicator(record.dropPosition, dragEl);
      }
      return;
    }

    if (record.lastOver === signature && record.dropCanceled) {
      event.preventDefault();
      return;
    }

    if (record.lastOver !== signature) {
      record.lastOver = signature;
      record.dropCanceled = false;

      const fromResult = fromComponent.onDragBeforeSort?.(detail);
      const toResult = toComponent === fromComponent ? undefined : toComponent.onDragBeforeSort?.(detail);

      if (
        (fromResult instanceof Event && fromResult.defaultPrevented) ||
        (toResult instanceof Event && toResult.defaultPrevented)
      ) {
        event.preventDefault();
        record.dropCanceled = true;
        return;
      }
    }
    if (clone && record.activeDrag && (source.group !== source.initialGroup || source.index !== source.initialIndex)) {
      const previousComponent = Array.from(record.components).find(
        (component) => getSortableGroup(component) === source.group,
      );
      restoreSortableItem(record.activeDrag);
      source.sortable.group = source.initialGroup;
      [fromComponent, previousComponent].forEach((component) => {
        if (component) {
          getSortableItems(component).forEach((item, index) => {
            const sortable = record.sortables.get(component)?.get(item);
            if (sortable) {
              sortable.index = index;
            }
          });
        }
      });
    }
    const placeholder = dragEl.nextElementSibling;
    if (placeholder?.hasAttribute("data-dnd-placeholder")) {
      placeholder.setAttribute("data-dnd-placeholder", clone ? "clone" : "hidden");
      initializeCopyPlaceholder(dragEl);
    }

    if (!relatedEl || clone) {
      showDropIndicator(record.dropPosition, dragEl, clone);
    }
    record.acceptedDropPosition = record.dropPosition;
    if (
      pullOperation?.newIndex === newIndex &&
      (!record.acceptedPullOperations.has(toComponent) || dragEl.parentElement !== toComponent.el)
    ) {
      record.acceptedPullOperations.set(toComponent, pullOperation.operation);
    }
  };

  record.removeListeners.push(
    manager.monitor.addEventListener("collision", ({ collisions }) => {
      let targetIndex = 0;
      const pointer = manager.dragOperation.position.current;
      // eslint-disable-next-line @cspell/spellchecker
      const { droppables: dropTargets } = manager.registry;

      for (let index = 1; index < collisions.length; index++) {
        const target = dropTargets.get(collisions[targetIndex].id);
        const candidate = dropTargets.get(collisions[index].id);

        // Ancestor items also contain nested lists, but must not steal their pointer collisions.
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
      record.lastOver = undefined;
      record.dropPosition = undefined;
      record.acceptedDropPosition = undefined;
      record.dropCanceled = false;
      component.onDragStart(makeDragStartDetail(component.el, item, source.initialIndex));
      setGlobalDragActive(true);
    }),
    manager.monitor.addEventListener("dragover", (event) => handleDragOver(event)),
    manager.monitor.addEventListener("dragmove", (event) => {
      if (record.activeDrag) {
        initializeCopyPlaceholder(record.activeDrag.item);
      }
      const manual = record.activeDrag?.component.sortMode === "manual";
      const clone = record.dropPosition && record.acceptedPullOperations.get(record.dropPosition.component) === "clone";
      if (manual || clone) {
        const position = event.to ?? {
          x: manager.dragOperation.position.current.x + (event.by?.x ?? 0),
          y: manager.dragOperation.position.current.y + (event.by?.y ?? 0),
        };
        if (clone && record.dropPosition) {
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
        if (!manual && !event.operation.target?.shape?.containsPoint(position)) {
          return;
        }
        handleDragOver({ operation: event.operation, preventDefault: () => {} }, position);
      }
    }),
    manager.monitor.addEventListener("dragend", (event) => {
      const activeDrag = record.activeDrag;
      const dropPosition = record.dropCanceled ? record.acceptedDropPosition : record.dropPosition;
      const canceledBeforeOrder = record.dropCanceled;
      const targetData = event.operation.target ? getSortableItemData(event.operation.target) : undefined;
      const targetComponent =
        activeDrag && targetData?.item === activeDrag.item
          ? Array.from(record.components).find((component) => activeDrag.item.parentElement === component.el)
          : targetData?.component;
      const position = record.manager.dragOperation.position.current;
      const targetBounds = targetComponent?.el.getBoundingClientRect();
      const outsideTarget =
        !!targetBounds &&
        (position.x < targetBounds.left ||
          position.x > targetBounds.right ||
          position.y < targetBounds.top ||
          position.y > targetBounds.bottom);
      let canceled =
        event.canceled ||
        !targetComponent ||
        outsideTarget ||
        (!!dropPosition && targetComponent !== dropPosition.component);

      requestAnimationFrame(async () => {
        await record.manager.renderer.rendering;

        record.activeDrag = undefined;
        record.lastOver = undefined;
        clearDropPosition(record);
        record.acceptedDropPosition = undefined;
        clearDragPreview();
        record.dropCanceled = false;

        if (!activeDrag) {
          setGlobalDragActive(false);
          return;
        }

        const { component: fromComponent, item: dragEl, oldIndex } = activeDrag;
        if (fromComponent.sortMode === "manual") {
          setGlobalDragActive(false);
          if (
            !getSortableItems(fromComponent).includes(dragEl) ||
            (dropPosition?.item && !getSortableItems(dropPosition.component).includes(dropPosition.item))
          ) {
            canceled = true;
          }
          const toComponent = !canceled && dropPosition ? dropPosition.component : fromComponent;
          const newIndex =
            !canceled && dropPosition
              ? dropPosition.item
                ? getSortableItems(toComponent)
                    .filter((item) => item !== dragEl)
                    .indexOf(dropPosition.item) + Number(dropPosition.placement === "after")
                : getAppendIndex(record, fromComponent, toComponent, dragEl)
              : oldIndex;
          const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, oldIndex, newIndex);

          if (
            !canceled &&
            dropPosition &&
            (fromComponent !== toComponent || getSortableItems(fromComponent).indexOf(dragEl) !== detail.newIndex) &&
            canAcceptDrop(fromComponent, toComponent, detail)
          ) {
            const fromResult = fromComponent.onDragBeforeSort?.(detail);
            const toResult = fromComponent === toComponent ? undefined : toComponent.onDragBeforeSort?.(detail);
            if (
              !(fromResult instanceof Event && fromResult.defaultPrevented) &&
              !(toResult instanceof Event && toResult.defaultPrevented)
            ) {
              fromComponent.onOrderRequest?.({
                ...detail,
                oldIndex,
                newIndex,
                operation:
                  fromComponent !== toComponent && fromComponent.canPull?.(detail) === "clone" ? "clone" : "move",
              });
            }
          }
          fromComponent.onDragEnd(detail);
          return;
        }
        let toComponent = canceled
          ? (Array.from(record.components).find((component) => dragEl.parentElement === component.el) ?? fromComponent)
          : (dropPosition?.component ??
            Array.from(record.components).find((component) => dragEl.parentElement === component.el) ??
            fromComponent);

        if (
          !canceled &&
          (!isDropEnabled(fromComponent, toComponent, dragEl) ||
            (dropPosition?.item &&
              record.acceptedPullOperations.get(toComponent) === "clone" &&
              !getSortableItems(toComponent).includes(dropPosition.item)))
        ) {
          canceled = true;
        }

        if (canceled) {
          restoreSortableItem(activeDrag);
          toComponent = fromComponent;
        }

        const cloning =
          !canceled &&
          !!dropPosition &&
          fromComponent !== toComponent &&
          record.acceptedPullOperations.get(toComponent) === "clone";
        if (
          !canceled &&
          !canceledBeforeOrder &&
          !cloning &&
          dropPosition?.component === toComponent &&
          !dropPosition.item
        ) {
          toComponent.el.append(dragEl);
        }

        const destinationItems = cloning
          ? getSortableItems(toComponent).filter((item) => item !== dragEl)
          : getSortableItems(toComponent);
        let newIndex =
          cloning && dropPosition
            ? dropPosition.item
              ? destinationItems.indexOf(dropPosition.item) + Number(dropPosition.placement === "after")
              : destinationItems.length
            : destinationItems.indexOf(dragEl);

        if (canceled) {
          newIndex = oldIndex;
        }

        const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, oldIndex, newIndex);

        const orderChanged = !canceled && (fromComponent !== toComponent || oldIndex !== newIndex);
        if (cloning) {
          const clone = cloneSortableItem(dragEl);
          const cloneId = guid();

          if (clone.id) {
            clone.id = cloneId;
          }

          const referenceItem = destinationItems[newIndex] ?? null;
          toComponent.el.insertBefore(clone, referenceItem);
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
      });
    }),
  );

  managerRecords.set(document, record);
  return record;
}

function tearDownSortable(component: SortableComponent, record: SortableManagerRecord): void {
  record.manualItemIndices.get(component)?.observer.disconnect();
  record.manualItemIndices.delete(component);
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
        const newIndex = getAppendIndex(record, fromComponent, component, dragEl);
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
          const newIndex =
            component.sortMode === "manual"
              ? getManualDropIndex(
                  component,
                  dragEl,
                  item,
                  record.manager.dragOperation.position.current,
                  getManualItemIndex(record, component, dragEl, item),
                )
              : targetSortable
                ? getDropIndex(record, component, sourceSortable, targetSortable)
                : index;
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
 * A controller for managing Sortable interactions
 */
export const useSortable = <T extends SortableComponent>(): ReturnType<
  typeof makeGenericController<UseSortable, T>
> => {
  return makeGenericController<UseSortable, T>((component, controller) => {
    const sortableComponent = component as T & SortableComponent;
    let record: SortableManagerRecord | undefined;
    let setupGeneration = 0;

    function dragActive(): boolean {
      return !!sortableComponent.dragEnabled && !!record?.dragging;
    }

    async function setUpSortable(): Promise<void> {
      if (!sortableComponent.isConnected) {
        return;
      }

      if (!record?.alive) {
        record = getManagerRecord(sortableComponent.el.ownerDocument);
      }

      if (dragActive()) {
        record.pendingReset.add(sortableComponent);
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

      await sortableComponent.updateComplete;
      const items = getSortableItems(sortableComponent);
      await Promise.all(
        items.map((item) => (item as HTMLElement & { updateComplete?: Promise<unknown> }).updateComplete),
      );

      if (
        generation !== setupGeneration ||
        !sortableComponent.isConnected ||
        !currentRecord.alive ||
        record !== currentRecord
      ) {
        return;
      }

      if (currentRecord.dragging || currentRecord.activeDrag) {
        currentRecord.pendingReset.add(sortableComponent);
        return;
      }

      currentRecord.components.add(sortableComponent);
      createSortable(sortableComponent, currentRecord);
    }

    function tearDown(force = false): void {
      setupGeneration++;

      if (!record?.alive || (!force && dragActive())) {
        if (record?.alive && dragActive()) {
          record.pendingReset.add(sortableComponent);
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
          record.activeDrag.component.onGlobalDragEnd();
        }

        record.alive = false;
        record.removeListeners.forEach((removeListener) => removeListener());
        record.manager.destroy();
        managerRecords.delete(sortableComponent.el.ownerDocument);
        record = undefined;
      }
    }

    controller.onConnected(() => {
      record = getManagerRecord(sortableComponent.el.ownerDocument);
      void setUpSortable();
    });

    controller.onDisconnected(() => {
      tearDown(true);
    });

    return {
      reset: () => {
        const snapshot = record?.manualItemIndices.get(sortableComponent);
        if (snapshot) {
          snapshot.indices = undefined;
        }
        if (record?.alive && dragActive()) {
          record.pendingReset.add(sortableComponent);
          return;
        }

        record?.pendingReset.delete(sortableComponent);
        void setUpSortable();
      },
    };
  });
};
