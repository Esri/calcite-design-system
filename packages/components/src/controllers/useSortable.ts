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
} from "@dnd-kit/dom";
import { OptimisticSortingPlugin, Sortable, SortableKeyboardPlugin, isSortable } from "@dnd-kit/dom/sortable";
import { guid } from "../utils/guid";
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
  item?: HTMLElement;
  after: boolean;
  custom: boolean;
  horizontalItem: boolean;
  targetIndex: number;
}

interface SortableManagerRecord {
  manager: DragDropManager;
  components: Set<SortableComponent>;
  sortables: Map<SortableComponent, Map<HTMLElement, Sortable>>;
  containerTargets: Map<SortableComponent, Droppable<SortableItemData>>;
  dragging: boolean;
  activeDrag?: ActiveDrag;
  lastOver?: string;
  dropPosition?: DropPosition;
  dropCanceled: boolean;
  removeListeners: (() => void)[];
}

const managerRecords = new WeakMap<Document, SortableManagerRecord>();
const componentGroupIds = new WeakMap<SortableComponent, string>();
const sortableItemIds = new WeakMap<HTMLElement, string>();
const sortableItemIndexes = new WeakMap<HTMLElement, number>();

function isHandleDisabled(handle?: HTMLElement): boolean {
  return (
    !handle ||
    handle.hasAttribute("disabled") ||
    ("disabled" in handle && Boolean((handle as HTMLButtonElement).disabled))
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

export const CSS = {
  ghostClass: "calcite-sortable--ghost",
  chosenClass: "calcite-sortable--chosen",
  dragClass: "calcite-sortable--drag",
  fallbackClass: "calcite-sortable--fallback",
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

  /** Specifies which items inside the element should be draggable. */
  dragSelector?: string;

  /** The list's group identifier. */
  group?: string;

  /** The selector for the handle elements. */
  handleSelector: string;

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

  /** Called when a component's dragging ends. */
  onDragMove?: BivariantHandler<M, void>;

  /** Called when a component's dragging starts. */
  onDragStart: BivariantHandler<DragStartDetail<D>, void>;

  /** Called before list mutations caused by sorting. */
  onDragBeforeSort?: BivariantHandler<D, Event | void>;

  /** Called by any change to the list (add / update / remove). */
  onDragSort: BivariantHandler<D, void>;

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
  return !!fromComponent.group && fromComponent.group === toComponent.group;
}

function getAppendIndex(fromComponent: SortableComponent, toComponent: SortableComponent): number {
  return getSortableItems(toComponent).length - Number(fromComponent === toComponent);
}

function isAfterHorizontalTarget(
  component: SortableComponent,
  targetSortable: Sortable | undefined,
  pointer: { x: number },
  refreshShape = false,
): boolean {
  if ((component as SortableComponent & { layout?: string }).layout !== "horizontal" || !targetSortable) {
    return false;
  }

  const targetRect = (refreshShape ? targetSortable.refreshShape() : targetSortable.droppable.shape)?.boundingRectangle;

  if (!targetRect) {
    return false;
  }

  return pointer.x > targetRect.left + targetRect.width / 2;
}

function getProposedSortableIndex(
  fromComponent: SortableComponent,
  toComponent: SortableComponent,
  oldIndex: number,
  targetIndex: number,
  after: boolean,
): number {
  const insertionIndex = targetIndex + Number(after);
  return fromComponent === toComponent && oldIndex < insertionIndex ? insertionIndex - 1 : insertionIndex;
}

function canAcceptDrop(fromComponent: SortableComponent, toComponent: SortableComponent, detail: DragDetail): boolean {
  if (fromComponent === toComponent) {
    return !toComponent.sortDisabled;
  }

  if (!canTransferBetweenComponents(fromComponent, toComponent)) {
    return false;
  }

  const pullResult = fromComponent.canPull?.(detail);
  const canPut = toComponent.canPut?.(detail) !== false;
  const canPull = pullResult !== false;

  return canPull && canPut;
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
  const sourceElements = [item, ...item.querySelectorAll<HTMLElement>("*")];
  const cloneElements = [clone, ...clone.querySelectorAll<HTMLElement>("*")];

  sourceElements.forEach((sourceElement, index) => {
    const cloneElement = cloneElements[index];
    let prototype = Object.getPrototypeOf(sourceElement) as object | null;

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
      cloneElement.value = sourceElement.value;
      cloneElement.checked = sourceElement.checked;
    }
  });

  return clone;
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
        .map((plugin) => (plugin === Feedback ? Feedback.configure({ dropAnimation: null }) : plugin)),
    sensors: (sensors) =>
      sensors
        .filter((sensor) => sensor !== KeyboardSensor)
        .map((sensor) =>
          sensor === PointerSensor
            ? PointerSensor.configure({
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
    dropCanceled: false,
    removeListeners: [],
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

    record.components.forEach((component) => component.onGlobalDragEnd());
  };

  const getSortableTarget = (target: unknown): Sortable | undefined => {
    if (!target || typeof target !== "object" || !("sortable" in target)) {
      return undefined;
    }

    return (target as { sortable?: Sortable }).sortable;
  };

  record.removeListeners.push(
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
      record.dropCanceled = false;
      component.onDragStart(makeDragStartDetail(component.el, item, source.initialIndex));
      setGlobalDragActive(true);
    }),
    manager.monitor.addEventListener("dragover", (event) => {
      const { source, target } = event.operation;

      if (!source || !isSortable(source) || !target) {
        return;
      }

      const sourceData = getSortableItemData(source);
      const targetData = "data" in target ? (target.data as SortableItemData) : undefined;
      const targetSortable = getSortableTarget(target);

      if (
        !sourceData?.item ||
        !targetData ||
        (targetData.item && sourceData.item === targetData.item) ||
        (targetData.item && !targetSortable)
      ) {
        return;
      }

      const { component: fromComponent, item: dragEl } = sourceData;
      const { component: toComponent, item: relatedEl } = targetData;

      if (fromComponent !== toComponent && !canTransferBetweenComponents(fromComponent, toComponent)) {
        event.preventDefault();
        record.lastOver = undefined;
        record.dropPosition = undefined;
        record.dropCanceled = false;
        return;
      }

      const horizontal = (toComponent as SortableComponent & { layout?: string }).layout === "horizontal";
      const pointer = event.operation.position.current;
      const after = !!relatedEl && horizontal && isAfterHorizontalTarget(toComponent, targetSortable, pointer, true);
      const targetIndex = horizontal
        ? ((relatedEl ? sortableItemIndexes.get(relatedEl) : undefined) ?? targetSortable?.initialIndex)
        : targetSortable?.index;
      const newIndex =
        targetIndex === undefined
          ? getAppendIndex(fromComponent, toComponent)
          : horizontal
            ? getProposedSortableIndex(fromComponent, toComponent, source.initialIndex, targetIndex, after)
            : targetIndex;
      const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, source.initialIndex, newIndex);
      const signature = `${getSortableGroup(toComponent)}:${relatedEl ? getSortableItemId(relatedEl) : "container"}:${newIndex}`;

      record.dropPosition = {
        component: toComponent,
        item: relatedEl,
        after: !relatedEl || after,
        custom: !relatedEl || !!horizontal,
        horizontalItem: horizontal && !!relatedEl,
        targetIndex: targetIndex ?? getAppendIndex(fromComponent, toComponent),
      };

      fromComponent.onDragMove?.({ ...detail, relatedEl: relatedEl ?? toComponent.el });

      if (record.lastOver === signature) {
        return;
      }

      record.lastOver = signature;
      record.dropCanceled = false;

      if (horizontal && relatedEl) {
        return;
      }

      const fromResult = fromComponent.onDragBeforeSort?.(detail);
      const toResult = toComponent === fromComponent ? undefined : toComponent.onDragBeforeSort?.(detail);

      if (
        (fromResult instanceof Event && fromResult.defaultPrevented) ||
        (toResult instanceof Event && toResult.defaultPrevented)
      ) {
        event.preventDefault();
        record.dropCanceled = true;
      }
    }),
    manager.monitor.addEventListener("dragend", (event) => {
      const activeDrag = record.activeDrag;
      const dropPosition = record.dropPosition;
      const canceledBeforeOrder = record.dropCanceled;
      const pointer = event.operation.position.current;
      let canceled = event.canceled || canceledBeforeOrder;

      requestAnimationFrame(() => {
        record.activeDrag = undefined;
        record.lastOver = undefined;
        record.dropPosition = undefined;
        record.dropCanceled = false;
        setGlobalDragActive(false);

        if (!activeDrag) {
          return;
        }

        const { component: fromComponent, item: dragEl, oldIndex } = activeDrag;
        let toComponent = canceled
          ? (Array.from(record.components).find((component) => dragEl.parentElement === component.el) ?? fromComponent)
          : (dropPosition?.component ??
            Array.from(record.components).find((component) => dragEl.parentElement === component.el) ??
            fromComponent);

        if (fromComponent !== toComponent && !canTransferBetweenComponents(fromComponent, toComponent)) {
          activeDrag.oldParent.insertBefore(dragEl, activeDrag.nextSibling);
          canceled = true;
          toComponent = fromComponent;
        }

        if (!canceled && dropPosition?.horizontalItem && dropPosition.item) {
          const targetSortable = record.sortables.get(toComponent)?.get(dropPosition.item);
          dropPosition.after = isAfterHorizontalTarget(toComponent, targetSortable, pointer, true);
          const proposedIndex = getProposedSortableIndex(
            fromComponent,
            toComponent,
            oldIndex,
            dropPosition.targetIndex,
            dropPosition.after,
          );
          const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, oldIndex, proposedIndex);
          const fromResult = fromComponent.onDragBeforeSort?.(detail);
          const toResult = toComponent === fromComponent ? undefined : toComponent.onDragBeforeSort?.(detail);

          if (
            (fromResult instanceof Event && fromResult.defaultPrevented) ||
            (toResult instanceof Event && toResult.defaultPrevented)
          ) {
            canceled = true;
          }
        }

        if (canceled && dropPosition?.horizontalItem) {
          activeDrag.oldParent.insertBefore(dragEl, activeDrag.nextSibling);
          toComponent = fromComponent;
        }

        if (!canceled && dropPosition?.component === toComponent && dropPosition.custom) {
          if (!dropPosition.item) {
            toComponent.el.append(dragEl);
          } else if (dropPosition.item !== dragEl && dropPosition.item.parentElement === toComponent.el) {
            toComponent.el.insertBefore(dragEl, dropPosition.after ? dropPosition.item.nextSibling : dropPosition.item);
          }
        }

        let newIndex = getSortableItems(toComponent).indexOf(dragEl);

        if (canceled) {
          newIndex = oldIndex;
        }

        const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, oldIndex, newIndex);
        fromComponent.onDragEnd(detail);

        if (!canceled && (fromComponent !== toComponent || oldIndex !== newIndex)) {
          if (fromComponent !== toComponent && fromComponent.canPull?.(detail) === "clone") {
            const clone = cloneSortableItem(dragEl);
            const cloneId = guid();

            if (clone.id) {
              clone.id = cloneId;
            }

            dragEl.parentElement?.insertBefore(clone, dragEl);
            activeDrag.oldParent.insertBefore(dragEl, activeDrag.nextSibling);
            sortableItemIds.set(clone, cloneId);
          }

          fromComponent.onDragSort(detail);

          if (fromComponent !== toComponent) {
            toComponent.onDragSort(detail);
          }
        }
      });
    }),
  );

  managerRecords.set(document, record);
  return record;
}

function tearDownSortable(component: SortableComponent, record: SortableManagerRecord): void {
  const sortables = record.sortables.get(component);

  sortables?.forEach((sortable) => sortable.destroy());
  record.sortables.delete(component);
  record.containerTargets.get(component)?.destroy();
  record.containerTargets.delete(component);
}

function createSortable(component: SortableComponent, record: SortableManagerRecord): void {
  const sortables = new Map<HTMLElement, Sortable>();
  const group = getSortableGroup(component);
  const horizontal = (component as SortableComponent & { layout?: string }).layout === "horizontal";
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
        const newIndex = getAppendIndex(fromComponent, component);
        const detail = makeDragDetail(fromComponent.el, component.el, dragEl, oldIndex, newIndex);

        return canAcceptDrop(fromComponent, component, detail);
      },
    },
    record.manager,
  );

  record.containerTargets.set(component, containerDroppable);

  getSortableItems(component).forEach((item, index) => {
    sortableItemIndexes.set(item, index);

    const handle =
      item.shadowRoot?.querySelector<HTMLElement>(component.handleSelector) ??
      item.querySelector<HTMLElement>(component.handleSelector);
    const sortable = new Sortable(
      {
        id: getSortableItemId(item),
        index,
        group,
        element: item,
        handle: handle ?? undefined,
        disabled: !!component.disabled || isHandleDisabled(handle ?? undefined),
        data: { component, item },
        plugins: (plugins) =>
          plugins.filter(
            (plugin) => plugin !== SortableKeyboardPlugin && (!horizontal || plugin !== OptimisticSortingPlugin),
          ),
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
          const horizontal = (component as SortableComponent & { layout?: string }).layout === "horizontal";
          const targetSortable = record.sortables.get(component)?.get(item);
          const targetIndex =
            (horizontal ? (sortableItemIndexes.get(item) ?? targetSortable?.initialIndex) : targetSortable?.index) ??
            index;
          const after =
            horizontal &&
            isAfterHorizontalTarget(component, targetSortable, record.manager.dragOperation.position.current);
          const newIndex = horizontal
            ? getProposedSortableIndex(fromComponent, component, oldIndex, targetIndex, after)
            : targetIndex;
          const detail = makeDragDetail(fromComponent.el, component.el, dragEl, oldIndex, newIndex);
          return canAcceptDrop(fromComponent, component, detail);
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
      if (dragActive() || !record) {
        return;
      }

      const generation = ++setupGeneration;
      const currentRecord = record;
      tearDownSortable(sortableComponent, record);
      record.components.delete(sortableComponent);

      if (!sortableComponent.dragEnabled || sortableComponent.disabled) {
        return;
      }

      await sortableComponent.updateComplete;
      const items = getSortableItems(sortableComponent);
      await Promise.all(
        items.map((item) => (item as HTMLElement & { updateComplete?: Promise<unknown> }).updateComplete),
      );

      if (generation !== setupGeneration || !sortableComponent.isConnected || record !== currentRecord) {
        return;
      }

      record.components.add(sortableComponent);
      createSortable(sortableComponent, record);
    }

    function tearDown(force = false): void {
      setupGeneration++;

      if (!record || (!force && dragActive())) {
        return;
      }

      if (record.activeDrag?.component === sortableComponent) {
        record.manager.actions.stop({ canceled: true });
      }

      tearDownSortable(sortableComponent, record);
      record.components.delete(sortableComponent);

      if (!record.components.size) {
        if (record.activeDrag) {
          record.activeDrag.component.onGlobalDragEnd();
        }

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
        void setUpSortable();
      },
    };
  });
};
