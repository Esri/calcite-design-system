import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
import {
  Accessibility,
  DragDropManager,
  KeyboardSensor,
  PointerActivationConstraints,
  PointerSensor,
} from "@dnd-kit/dom";
import { Sortable, SortableKeyboardPlugin, isSortable } from "@dnd-kit/dom/sortable";
import { guid } from "../utils/guid";
import type { BivariantHandler } from "../components/types";

interface SortableItemData {
  component: SortableComponent;
  item: HTMLElement;
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
  item: HTMLElement;
  after: boolean;
}

interface SortableManagerRecord {
  manager: DragDropManager;
  components: Set<SortableComponent>;
  sortables: Map<SortableComponent, Map<HTMLElement, Sortable>>;
  dragging: boolean;
  activeDrag?: ActiveDrag;
  lastOver?: string;
  dropPosition?: DropPosition;
  removeListeners: (() => void)[];
}

const managerRecords = new WeakMap<Document, SortableManagerRecord>();
const componentGroupIds = new WeakMap<SortableComponent, string>();
const sortableItemIds = new WeakMap<HTMLElement, string>();
const clonePullItems = new WeakSet<HTMLElement>();

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

  return component.group ?? id;
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
    plugins: (plugins) => plugins.filter((plugin) => plugin !== Accessibility),
    sensors: (sensors) =>
      sensors
        .filter((sensor) => sensor !== KeyboardSensor)
        .map((sensor) =>
          sensor === PointerSensor
            ? PointerSensor.configure({
                activationConstraints: (event) =>
                  event.pointerType === "mouse" ? [new PointerActivationConstraints.Distance({ value: 5 })] : undefined,
              })
            : sensor,
        ),
  });

  record = {
    manager,
    components: new Set(),
    sortables: new Map(),
    dragging: false,
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

  const clearDragClasses = (): void => {
    record.components.forEach((component) => {
      component.el.classList.remove(CSS.chosenClass, CSS.dragClass, CSS.fallbackClass, CSS.ghostClass);
      getSortableItems(component).forEach((item) => {
        item.classList.remove(CSS.chosenClass, CSS.dragClass, CSS.fallbackClass, CSS.ghostClass);
      });
    });
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
      item.classList.add(CSS.chosenClass, CSS.dragClass);
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

      if (!sourceData || !targetData || !targetSortable || sourceData.item === targetData.item) {
        return;
      }

      const { component: fromComponent, item: dragEl } = sourceData;
      const { component: toComponent, item: relatedEl } = targetData;
      const newIndex = targetSortable.index;
      const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, source.initialIndex, newIndex);
      const signature = `${getSortableItemId(relatedEl)}:${newIndex}`;
      const targetRect = relatedEl.getBoundingClientRect();
      const horizontal = (toComponent as SortableComponent & { layout?: string }).layout === "horizontal";
      const pointer = event.operation.position.current;

      record.dropPosition = horizontal
        ? {
            component: toComponent,
            item: relatedEl,
            after: pointer.x > targetRect.left + targetRect.width / 2,
          }
        : undefined;

      fromComponent.onDragMove?.({ ...detail, relatedEl });
      relatedEl.classList.add(CSS.ghostClass);

      if (record.lastOver === signature) {
        return;
      }

      record.lastOver = signature;
      const fromResult = fromComponent.onDragBeforeSort?.(detail);
      const toResult = toComponent === fromComponent ? undefined : toComponent.onDragBeforeSort?.(detail);

      if (fromResult instanceof Event && fromResult.defaultPrevented) {
        event.preventDefault();
      }

      if (toResult instanceof Event && toResult.defaultPrevented) {
        event.preventDefault();
      }
    }),
    manager.monitor.addEventListener("dragend", (event) => {
      const activeDrag = record.activeDrag;
      const dropPosition = record.dropPosition;
      const canceled = event.canceled;

      requestAnimationFrame(() => {
        record.activeDrag = undefined;
        record.lastOver = undefined;
        record.dropPosition = undefined;
        clearDragClasses();
        setGlobalDragActive(false);

        if (!activeDrag) {
          return;
        }

        const { component: fromComponent, item: dragEl, oldIndex } = activeDrag;
        const toComponent =
          Array.from(record.components).find((component) => dragEl.parentElement === component.el) ?? fromComponent;

        if (
          !canceled &&
          dropPosition?.component === toComponent &&
          dropPosition.item !== dragEl &&
          dropPosition.item.parentElement === toComponent.el &&
          dragEl.parentElement === toComponent.el
        ) {
          toComponent.el.insertBefore(dragEl, dropPosition.after ? dropPosition.item.nextSibling : dropPosition.item);
        }

        let newIndex = getSortableItems(toComponent).indexOf(dragEl);

        if (canceled) {
          newIndex = oldIndex;
        }

        const detail = makeDragDetail(fromComponent.el, toComponent.el, dragEl, oldIndex, newIndex);
        fromComponent.onDragEnd(detail);

        if (!canceled && (fromComponent !== toComponent || oldIndex !== newIndex)) {
          if (fromComponent !== toComponent && clonePullItems.has(dragEl)) {
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

        clonePullItems.delete(dragEl);
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
}

function createSortable(component: SortableComponent, record: SortableManagerRecord): void {
  const sortables = new Map<HTMLElement, Sortable>();
  const group = getSortableGroup(component);

  getSortableItems(component).forEach((item, index) => {
    const handle =
      item.shadowRoot?.querySelector<HTMLElement>(component.handleSelector) ??
      item.querySelector<HTMLElement>(component.handleSelector);
    const handleDisabled =
      !handle || handle.hasAttribute("disabled") || ("disabled" in handle && !!(handle as HTMLButtonElement).disabled);
    const sortable = new Sortable(
      {
        id: getSortableItemId(item),
        index,
        group,
        element: item,
        handle: handle ?? undefined,
        disabled: !!component.disabled || handleDisabled,
        data: { component, item },
        plugins: (plugins) => plugins.filter((plugin) => plugin !== SortableKeyboardPlugin),
        accept: (draggable) => {
          const sourceData = getSortableItemData(draggable);

          if (!sourceData) {
            return false;
          }

          const { component: fromComponent, item: dragEl } = sourceData;

          if (fromComponent === component) {
            return !component.sortDisabled;
          }

          const sourceSortable = record.sortables.get(fromComponent)?.get(dragEl);
          const oldIndex = sourceSortable?.initialIndex ?? 0;
          const newIndex = record.sortables.get(component)?.get(item)?.index ?? index;
          const detail = makeDragDetail(fromComponent.el, component.el, dragEl, oldIndex, newIndex);
          const pullResult = fromComponent.canPull?.(detail);
          const canPut = component.canPut?.(detail) !== false;
          const canPull = pullResult !== false;

          if (canPull && canPut && pullResult === "clone") {
            clonePullItems.add(dragEl);
          }

          return canPull && canPut;
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
