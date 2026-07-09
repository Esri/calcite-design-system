import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
import {
  DragDropManager,
  KeyboardSensor,
  PointerActivationConstraints,
  PointerSensor,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/dom";
import { Sortable, isSortable, isSortableOperation } from "@dnd-kit/dom/sortable";
import type { BivariantHandler } from "../components/types";

const sortableComponentSet = new Set<SortableComponent>();
const componentSortables = new WeakMap<SortableComponent, Sortable[]>();

const componentIdByElement = new WeakMap<SortableComponent, string>();
const itemIdByElement = new WeakMap<HTMLElement, string>();

const sortableItemMetadata = new Map<string, { component: SortableComponent; itemEl: HTMLElement }>();

let componentId = 0;
let itemId = 0;

type PullPermission = boolean | "clone";

interface DragContext {
  sourceComponent: SortableComponent;
  sourceItemEl: HTMLElement;
  sourceIndex: number | undefined;
  sourceContainerEl: HTMLElement;
  targetComponent: SortableComponent;
  targetContainerEl: HTMLElement;
  targetItemEl: HTMLElement;
  targetIndex: number | undefined;
  pullPermission: PullPermission;
}

function isElementWithinItem(element: Element, itemEl: HTMLElement): boolean {
  if (itemEl.contains(element)) {
    return true;
  }

  let root = element.getRootNode();

  while (root instanceof ShadowRoot) {
    if (itemEl.contains(root.host)) {
      return true;
    }

    root = root.host.getRootNode();
  }

  return false;
}

function eventOriginatesFromHandle(event: PointerEvent, component: SortableComponent, itemEl: HTMLElement): boolean {
  const path = event.composedPath();

  return path.some((target) => {
    if (!(target instanceof Element)) {
      return false;
    }

    return target.matches(component.handleSelector) && isElementWithinItem(target, itemEl);
  });
}

const strictHandlePointerSensor = PointerSensor.configure({
  activationConstraints: (event, source) => {
    const defaultActivationConstraints = PointerSensor.defaults.activationConstraints;
    const activationConstraints =
      typeof defaultActivationConstraints === "function"
        ? defaultActivationConstraints(event, source)
        : defaultActivationConstraints;

    if (event.pointerType !== "mouse") {
      return activationConstraints;
    }

    return [new PointerActivationConstraints.Distance({ value: 5 })];
  },
  preventActivation: (event, source) => {
    const sourceMetadata = sortableItemMetadata.get(String(source.id));

    if (!sourceMetadata) {
      return true;
    }

    return !eventOriginatesFromHandle(event, sourceMetadata.component, sourceMetadata.itemEl);
  },
});

const dragDropManager = new DragDropManager({
  sensors: [strictHandlePointerSensor, KeyboardSensor],
});
let activeDragContext: DragContext | null = null;

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
interface SortableComponent<D extends DragDetail = DragDetail, M extends MoveDetail = MoveDetail> extends LitElement {
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
const activeSortableComponentSet = new Set<SortableComponent>();

function syncGlobalDragState(): void {
  const active = activeSortableComponentSet.size > 0;

  if (globalDragState.active === active) {
    return;
  }

  globalDragState.active = active;

  if (active) {
    onGlobalDragStart();
    return;
  }

  onGlobalDragEnd();
}

function markDragActive(component: SortableComponent): void {
  activeSortableComponentSet.add(component);
  syncGlobalDragState();
}

function markDragInactive(component: SortableComponent): void {
  activeSortableComponentSet.delete(component);
  syncGlobalDragState();
}

function getComponentId(component: SortableComponent): string {
  let id = componentIdByElement.get(component);

  if (!id) {
    componentId += 1;
    id = `calcite-sortable-component-${componentId}`;
    componentIdByElement.set(component, id);
  }

  return id;
}

function getItemId(itemEl: HTMLElement): string {
  let id = itemIdByElement.get(itemEl);

  if (!id) {
    itemId += 1;
    id = `calcite-sortable-item-${itemId}`;
    itemIdByElement.set(itemEl, id);
  }

  return id;
}

function getComponentItems(component: SortableComponent): HTMLElement[] {
  const children = Array.from(component.el.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );

  if (!component.dragSelector) {
    return children;
  }

  return children.filter((child) => child.matches(component.dragSelector!));
}

function getItemIndex(component: SortableComponent, itemEl: HTMLElement): number | undefined {
  const index = getComponentItems(component).indexOf(itemEl);

  return index === -1 ? undefined : index;
}

function querySelectorIncludingShadowRoot(root: ParentNode, selector: string): Element | undefined {
  const directMatch = root.querySelector(selector);

  if (directMatch) {
    return directMatch;
  }

  const shadowHosts: Element[] = [];

  if (root instanceof Element && root.shadowRoot) {
    shadowHosts.push(root);
  }

  shadowHosts.push(...Array.from(root.querySelectorAll("*")).filter((element) => Boolean(element.shadowRoot)));

  for (const shadowHost of shadowHosts) {
    const shadowRoot = shadowHost.shadowRoot;

    if (!shadowRoot) {
      continue;
    }

    const shadowMatch = querySelectorIncludingShadowRoot(shadowRoot, selector);

    if (shadowMatch) {
      return shadowMatch;
    }
  }

  return undefined;
}

function getHandleActivator(itemEl: HTMLElement, handleEl: Element): Element {
  let activator = handleEl;
  let root = activator.getRootNode();

  while (root instanceof ShadowRoot && itemEl.contains(root.host)) {
    activator = root.host;
    root = activator.getRootNode();
  }

  return activator;
}

function getItemHandle(component: SortableComponent, itemEl: HTMLElement): Element | undefined {
  const handleEl = itemEl.matches(component.handleSelector)
    ? itemEl
    : querySelectorIncludingShadowRoot(itemEl, component.handleSelector);

  if (!handleEl) {
    return undefined;
  }

  return getHandleActivator(itemEl, handleEl);
}

function resolveSortableGroup(component: SortableComponent): string {
  return component.group || getComponentId(component);
}

function evaluatePullAndPutPermissions({
  sourceComponent,
  sourceItemEl,
  sourceIndex,
  targetComponent,
  targetIndex,
}: {
  sourceComponent: SortableComponent;
  sourceItemEl: HTMLElement;
  sourceIndex: number | undefined;
  targetComponent: SortableComponent;
  targetIndex: number | undefined;
}): { allowed: boolean; pullPermission: PullPermission } {
  const detail = {
    toEl: targetComponent.el,
    fromEl: sourceComponent.el,
    dragEl: sourceItemEl,
    newIndex: targetIndex,
    oldIndex: sourceIndex,
  };

  const pullPermission = sourceComponent.canPull?.(detail) ?? true;
  const canPut = targetComponent.canPut?.(detail) ?? true;

  return {
    allowed: canPut && pullPermission !== false,
    pullPermission,
  };
}

function canDropOnTarget({
  sourceMetadata,
  targetComponent,
  targetItemEl,
}: {
  sourceMetadata: { component: SortableComponent; itemEl: HTMLElement };
  targetComponent: SortableComponent;
  targetItemEl: HTMLElement;
}): { allowed: boolean; pullPermission: PullPermission } {
  const { component: sourceComponent, itemEl: sourceItemEl } = sourceMetadata;

  if (sourceComponent === targetComponent) {
    const canSortWithinGroup = !(targetComponent.group && targetComponent.sortDisabled);

    return { allowed: canSortWithinGroup, pullPermission: true };
  }

  if (
    !sourceComponent.group ||
    sourceComponent.group !== targetComponent.group ||
    sourceItemEl.contains(targetComponent.el)
  ) {
    return { allowed: false, pullPermission: false };
  }

  return evaluatePullAndPutPermissions({
    sourceComponent,
    sourceItemEl,
    sourceIndex: getItemIndex(sourceComponent, sourceItemEl),
    targetComponent,
    targetIndex: getItemIndex(targetComponent, targetItemEl),
  });
}

function toggleDragClasses(itemEl: HTMLElement, enabled: boolean): void {
  itemEl.classList.toggle(CSS.chosenClass, enabled);
  itemEl.classList.toggle(CSS.dragClass, enabled);
  itemEl.classList.toggle(CSS.ghostClass, enabled);
}

function emitSortEvents(context: DragContext, itemElForTarget: HTMLElement): void {
  const {
    sourceComponent,
    sourceItemEl,
    sourceIndex,
    sourceContainerEl,
    targetComponent,
    targetContainerEl,
    targetIndex,
    pullPermission,
  } = context;

  const movedAcrossComponents = sourceComponent !== targetComponent;
  const sourceChanged = movedAcrossComponents ? pullPermission !== "clone" : sourceIndex !== targetIndex;
  const targetChanged = movedAcrossComponents ? true : sourceChanged;

  if (sourceChanged) {
    sourceComponent.onDragSort({
      fromEl: sourceContainerEl,
      dragEl: sourceItemEl,
      toEl: targetContainerEl,
      newIndex: movedAcrossComponents ? undefined : targetIndex,
      oldIndex: sourceIndex,
    });
  }

  if (targetChanged && movedAcrossComponents) {
    targetComponent.onDragSort({
      fromEl: sourceContainerEl,
      dragEl: itemElForTarget,
      toEl: targetContainerEl,
      newIndex: targetIndex,
      oldIndex: pullPermission === "clone" ? undefined : sourceIndex,
    });
  }
}

function resolveDragContextFromOperation(event: DragStartEvent | DragOverEvent | DragEndEvent): DragContext | null {
  const source = event.operation.source;

  if (!source || !isSortable(source)) {
    return null;
  }

  const sourceMetadata = sortableItemMetadata.get(String(source.id));

  if (!sourceMetadata) {
    return null;
  }

  let targetComponent = sourceMetadata.component;
  let targetItemEl = sourceMetadata.itemEl;

  const target = event.operation.target;

  if (target && isSortableOperation(event.operation)) {
    const targetMetadata = sortableItemMetadata.get(String(target.id));

    if (targetMetadata) {
      targetComponent = targetMetadata.component;
      targetItemEl = targetMetadata.itemEl;
    }
  }

  const sourceIndex = sourceMetadata.itemEl.parentElement
    ? getItemIndex(sourceMetadata.component, sourceMetadata.itemEl)
    : source.initialIndex;

  const targetIndex = getItemIndex(targetComponent, targetItemEl);

  return {
    sourceComponent: sourceMetadata.component,
    sourceItemEl: sourceMetadata.itemEl,
    sourceIndex: sourceIndex,
    sourceContainerEl: sourceMetadata.component.el,
    targetComponent,
    targetContainerEl: targetComponent.el,
    targetItemEl,
    targetIndex,
    pullPermission: activeDragContext?.pullPermission ?? true,
  };
}

function handleDragStart(event: DragStartEvent): void {
  const context = resolveDragContextFromOperation(event);

  if (!context) {
    return;
  }

  activeDragContext = context;
  markDragActive(context.sourceComponent);
  toggleDragClasses(context.sourceItemEl, true);

  context.sourceComponent.onDragStart({
    fromEl: context.sourceContainerEl,
    dragEl: context.sourceItemEl,
    toEl: context.sourceContainerEl,
    newIndex: undefined,
    oldIndex: context.sourceIndex,
  });
}

function handleDragOver(event: DragOverEvent): void {
  const context = resolveDragContextFromOperation(event);

  if (!context) {
    return;
  }

  const permission = canDropOnTarget({
    sourceMetadata: {
      component: context.sourceComponent,
      itemEl: context.sourceItemEl,
    },
    targetComponent: context.targetComponent,
    targetItemEl: context.targetItemEl,
  });

  if (!permission.allowed) {
    event.preventDefault();
    return;
  }

  context.pullPermission = permission.pullPermission;
  activeDragContext = context;

  context.sourceComponent.onDragMove?.({
    fromEl: context.sourceContainerEl,
    dragEl: context.sourceItemEl,
    toEl: context.targetContainerEl,
    relatedEl: context.targetItemEl,
  });
}

function handleDragEnd(event: DragEndEvent): void {
  const context = activeDragContext || resolveDragContextFromOperation(event);

  if (!context) {
    return;
  }

  const {
    sourceComponent,
    sourceItemEl,
    sourceContainerEl,
    sourceIndex,
    targetComponent,
    targetContainerEl,
    targetIndex,
    pullPermission,
  } = context;

  let targetItemForDetail = sourceItemEl;

  if (
    pullPermission === "clone" &&
    sourceComponent !== targetComponent &&
    sourceItemEl.parentElement === targetContainerEl
  ) {
    const cloneEl = sourceItemEl.cloneNode() as HTMLElement;
    targetContainerEl.insertBefore(cloneEl, sourceItemEl.nextElementSibling);
    const sourceReferenceEl = sourceIndex == null ? null : (sourceContainerEl.children[sourceIndex] ?? null);
    sourceContainerEl.insertBefore(sourceItemEl, sourceReferenceEl);
    targetItemForDetail = cloneEl;
  }

  sourceComponent.onDragEnd({
    fromEl: sourceContainerEl,
    dragEl: sourceItemEl,
    toEl: targetContainerEl,
    newIndex: targetIndex,
    oldIndex: sourceIndex,
  });

  emitSortEvents(context, targetItemForDetail);

  toggleDragClasses(sourceItemEl, false);
  markDragInactive(sourceComponent);
  activeDragContext = null;
}

function registerDragListeners(): void {
  dragDropManager.monitor.addEventListener("dragstart", handleDragStart);
  dragDropManager.monitor.addEventListener("dragover", handleDragOver);
  dragDropManager.monitor.addEventListener("dragend", handleDragEnd);
}

function createSortablesForComponent(component: SortableComponent): Sortable[] {
  const items = getComponentItems(component);
  const sortables = items.map((itemEl, index) => {
    const id = getItemId(itemEl);

    sortableItemMetadata.set(id, { component, itemEl });

    return new Sortable(
      {
        id,
        element: itemEl,
        target: itemEl,
        index,
        group: resolveSortableGroup(component),
        handle: getItemHandle(component, itemEl),
        disabled: {
          draggable:
            "dragDisabled" in (itemEl as unknown as SortableComponentItem)
              ? Boolean((itemEl as unknown as SortableComponentItem).dragDisabled)
              : false,
          droppable: false,
        },
        accept: (sourceDraggable) => {
          const sourceMetadata = sortableItemMetadata.get(String(sourceDraggable.id));

          if (!sourceMetadata) {
            return false;
          }

          const permission = canDropOnTarget({
            sourceMetadata,
            targetComponent: component,
            targetItemEl: itemEl,
          });

          if (permission.allowed && activeDragContext && activeDragContext.sourceItemEl === sourceMetadata.itemEl) {
            activeDragContext.pullPermission = permission.pullPermission;
          }

          return permission.allowed;
        },
      },
      dragDropManager,
    );
  });

  componentSortables.set(component, sortables);

  return sortables;
}

function tearDownSortablesForComponent(component: SortableComponent): void {
  const sortables = componentSortables.get(component);

  if (!sortables) {
    return;
  }

  sortables.forEach((sortable) => {
    sortableItemMetadata.delete(String(sortable.id));
    sortable.destroy();
  });

  componentSortables.delete(component);
}

registerDragListeners();

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

      if (!component.dragEnabled) {
        return;
      }

      sortableComponentSet.add(component);
      createSortablesForComponent(component);
    }

    function tearDownSortable(component: SortableComponent): void {
      if (dragActive(component)) {
        return;
      }

      sortableComponentSet.delete(component);
      tearDownSortablesForComponent(component);
    }

    controller.onConnected(() => {
      setUpSortable(component);
    });

    controller.onDisconnected(() => {
      sortableComponentSet.delete(component);

      // If drag end is skipped due to abrupt teardown, clear active drag
      // state to avoid blocking sortable setup for other components.
      markDragInactive(component);
      tearDownSortable(component);
    });

    return {
      reset: () => {
        setUpSortable(component);
      },
    };
  });
};
