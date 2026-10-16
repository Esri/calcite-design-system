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
} from "@dnd-kit/dom";
import { Sortable, SortableKeyboardPlugin, isSortable } from "@dnd-kit/dom/sortable";
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
  dropCanceled: boolean;
  pendingReset: Set<SortableComponent>;
  removeListeners: (() => void)[];
}

const managerRecords = new WeakMap<Document, SortableManagerRecord>();
const componentGroupIds = new WeakMap<SortableComponent, string>();
const sortableItemIds = new WeakMap<HTMLElement, string>();

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

function getDropIndex(
  record: SortableManagerRecord,
  toComponent: SortableComponent,
  sourceSortable: Sortable | undefined,
  targetSortable: Sortable,
): number {
  const targetIndex = targetSortable.index;

  if (!sourceSortable || sourceSortable.group === targetSortable.group) {
    return targetIndex;
  }

  const position = record.manager.dragOperation.shape?.current.center ?? record.manager.dragOperation.position.current;
  const targetShape = targetSortable.droppable.shape;
  const horizontal =
    toComponent.layout === "horizontal" ||
    (toComponent.layout === "grid" &&
      !!targetShape &&
      Math.abs(position.x - targetShape.center.x) > Math.abs(position.y - targetShape.center.y));
  const rightToLeft = horizontal && getComputedStyle(toComponent.el).direction === "rtl";
  const after =
    !!targetShape &&
    (horizontal
      ? rightToLeft
        ? Math.round(position.x) < Math.round(targetShape.center.x)
        : Math.round(position.x) > Math.round(targetShape.center.x)
      : Math.round(position.y) > Math.round(targetShape.center.y));

  return targetIndex + Number(after);
}

function canAcceptDrop(fromComponent: SortableComponent, toComponent: SortableComponent, detail: DragDetail): boolean {
  if (detail.dragEl.contains(toComponent.el)) {
    return false;
  }

  if (fromComponent === toComponent) {
    return !toComponent.group || !toComponent.sortDisabled;
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
    removeListeners: [],
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

    record.components.forEach((component) => component.onGlobalDragEnd());
    flushPendingReset();
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

      const newIndex = targetSortable
        ? getDropIndex(record, toComponent, source.sortable, targetSortable)
        : getAppendIndex(record, fromComponent, toComponent);
      const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, source.initialIndex, newIndex);
      const signature = `${getSortableGroup(toComponent)}:${relatedEl ? getSortableItemId(relatedEl) : "container"}:${newIndex}`;

      record.dropPosition = {
        component: toComponent,
        item: relatedEl,
      };

      fromComponent.onDragMove?.({ ...detail, relatedEl: relatedEl ?? toComponent.el });

      if (record.lastOver === signature) {
        if (record.dropCanceled) {
          event.preventDefault();
        }
        return;
      }

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
      }
    }),
    manager.monitor.addEventListener("dragend", (event) => {
      const activeDrag = record.activeDrag;
      const dropPosition = record.dropPosition;
      const canceledBeforeOrder = record.dropCanceled;
      let canceled = event.canceled;

      requestAnimationFrame(async () => {
        await record.manager.renderer.rendering;

        record.activeDrag = undefined;
        record.lastOver = undefined;
        record.dropPosition = undefined;
        record.dropCanceled = false;
        setGlobalDragActive(false);

        if (!activeDrag) {
          return;
        }

        const { component: fromComponent, item: dragEl, oldIndex } = activeDrag;
        let toComponent =
          canceled || canceledBeforeOrder
            ? (Array.from(record.components).find((component) => dragEl.parentElement === component.el) ??
              fromComponent)
            : (dropPosition?.component ??
              Array.from(record.components).find((component) => dragEl.parentElement === component.el) ??
              fromComponent);

        if (fromComponent !== toComponent && !canTransferBetweenComponents(fromComponent, toComponent)) {
          canceled = true;
        }

        if (canceled) {
          restoreSortableItem(activeDrag);
          toComponent = fromComponent;
        }

        if (!canceled && !canceledBeforeOrder && dropPosition?.component === toComponent && !dropPosition.item) {
          toComponent.el.append(dragEl);
        }

        let newIndex = getSortableItems(toComponent).indexOf(dragEl);

        if (canceled) {
          newIndex = oldIndex;
        }

        const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, oldIndex, newIndex);

        if (!canceled && (fromComponent !== toComponent || oldIndex !== newIndex)) {
          if (fromComponent !== toComponent && fromComponent.canPull?.(detail) === "clone") {
            const clone = cloneSortableItem(dragEl);
            const cloneId = guid();

            if (clone.id) {
              clone.id = cloneId;
            }

            dragEl.parentElement?.insertBefore(clone, dragEl);
            restoreSortableItem(activeDrag);
            sortableItemIds.set(clone, cloneId);
          }

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

        return canAcceptDrop(fromComponent, component, detail);
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
        record !== currentRecord ||
        currentRecord.dragging ||
        currentRecord.activeDrag
      ) {
        return;
      }

      currentRecord.components.add(sortableComponent);
      createSortable(sortableComponent, currentRecord);
    }

    function tearDown(force = false): void {
      setupGeneration++;

      if (!record || (!force && dragActive())) {
        if (record && dragActive()) {
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
