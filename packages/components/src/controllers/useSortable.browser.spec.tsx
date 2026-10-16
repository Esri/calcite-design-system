import { LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { mount } from "@arcgis/lumina-compiler/testing";
import { afterEach, beforeEach, expect, it, onTestFinished, vi } from "vitest";
import { page } from "vitest/browser";
import { useSortable, type DragDetail } from "./useSortable";

const {
  createSortableSpy,
  destroySortableSpy,
  destroyManagerSpy,
  accessibilityPlugin,
  feedbackPlugin,
  configureFeedbackPlugin,
  otherManagerPlugin,
  configuredPlugins,
  keyboardSensor,
  configuredSensors,
  keyboardPlugin,
  optimisticSortingPlugin,
  monitorListeners,
  sortableInstances,
  dragOperation,
} = vi.hoisted(() => ({
  createSortableSpy: vi.fn(),
  destroySortableSpy: vi.fn(),
  destroyManagerSpy: vi.fn(),
  accessibilityPlugin: vi.fn(),
  feedbackPlugin: vi.fn(),
  configureFeedbackPlugin: vi.fn((options: unknown) => ({ plugin: feedbackPlugin, options })),
  otherManagerPlugin: vi.fn(),
  configuredPlugins: vi.fn(),
  keyboardSensor: vi.fn(),
  configuredSensors: vi.fn(),
  keyboardPlugin: vi.fn(),
  optimisticSortingPlugin: vi.fn(),
  monitorListeners: new Map<string, unknown>(),
  sortableInstances: [] as Array<{
    options: Record<string, unknown>;
    index: number;
    initialIndex: number;
    group: unknown;
    data: unknown;
    droppable: { shape: { center: { x: number; y: number } } };
  }>,
  dragOperation: {
    shape: { current: { center: { x: 0, y: 0 } } },
    position: { current: { x: 0, y: 0 } },
  },
}));

vi.mock("@dnd-kit/dom", () => {
  class PointerSensor {
    static defaults = {};

    static configure(options: unknown): unknown {
      return { sensor: PointerSensor, options };
    }
  }

  class Distance {
    constructor(readonly options: unknown) {}
  }

  class Droppable {
    constructor(
      readonly options: Record<string, unknown>,
      manager: unknown,
    ) {
      void manager;
      void options;
    }

    destroy(): void {}
  }

  class DragDropManager {
    dragOperation = dragOperation;

    actions = {
      stop: vi.fn(),
    };

    renderer = {
      rendering: Promise.resolve(),
    };

    monitor = {
      addEventListener: vi.fn((type: string, listener: unknown) => {
        monitorListeners.set(type, listener);
        return vi.fn();
      }),
    };

    constructor(options: {
      plugins: (plugins: unknown[]) => unknown[];
      sensors: (sensors: unknown[]) => unknown[];
    }) {
      configuredPlugins(options.plugins([accessibilityPlugin, feedbackPlugin, otherManagerPlugin]));
      configuredSensors(options.sensors([PointerSensor, keyboardSensor]));
    }

    destroy(): void {
      destroyManagerSpy();
    }
  }

  return {
    Accessibility: accessibilityPlugin,
    DragDropManager,
    Droppable,
    Feedback: Object.assign(feedbackPlugin, { configure: configureFeedbackPlugin }),
    KeyboardSensor: keyboardSensor,
    PointerActivationConstraints: { Distance },
    PointerSensor,
  };
});

vi.mock("@dnd-kit/dom/sortable", () => {
  class Sortable {
    readonly index: number;
    readonly initialIndex: number;
    readonly group: unknown;
    readonly data: unknown;
    readonly droppable: { shape: { center: { x: number; y: number } } };

    constructor(
      readonly options: Record<string, unknown>,
      manager: unknown,
    ) {
      void manager;
      this.index = options.index as number;
      this.initialIndex = this.index;
      this.group = options.group;
      this.data = options.data;
      this.droppable = { shape: { center: { x: this.index * 100 + 50, y: 50 } } };
      sortableInstances.push(this);
      createSortableSpy(options);
    }

    destroy(): void {
      destroySortableSpy();
    }
  }

  return {
    Sortable,
    OptimisticSortingPlugin: optimisticSortingPlugin,
    SortableKeyboardPlugin: keyboardPlugin,
    isSortable: (draggable: unknown) =>
      !!draggable && typeof draggable === "object" && "data" in draggable,
  };
});

class Test extends LitElement {
  static tagName = "sortable-test";
  handleSelector = ".handle";
  sortable: { reset: () => void } = useSortable<this>()(this);

  onGlobalDragStart = vi.fn();
  onGlobalDragEnd = vi.fn();
  onDragEnd = vi.fn();
  onDragMove = vi.fn();
  onDragStart = vi.fn();
  onDragSort = vi.fn();
  canPut?: (detail: DragDetail) => boolean;
  dragSelector?: string;
  getSortableItems?: () => HTMLElement[];

  @property({ type: Boolean }) dragEnabled = false;
  @property({ type: Boolean }) sortDisabled = false;
  @property() sortMode: "automatic" | "manual" = "automatic";
  @property() group?: string;
  @property() layout: "horizontal" | "vertical" | "grid" = "vertical";
}

const mountedComponents: Test[] = [];

beforeEach(() => {
  createSortableSpy.mockClear();
  destroySortableSpy.mockClear();
  destroyManagerSpy.mockClear();
  configuredPlugins.mockClear();
  configureFeedbackPlugin.mockClear();
  configuredSensors.mockClear();
  monitorListeners.clear();
  sortableInstances.length = 0;
  dragOperation.shape.current.center.x = 0;
  dragOperation.shape.current.center.y = 0;
  dragOperation.position.current.x = 0;
  dragOperation.position.current.y = 0;
});

afterEach(() => {
  mountedComponents.forEach((component) => component.remove());
  mountedComponents.length = 0;
});

const mountDragEnabled = async (layout: "horizontal" | "vertical" | "grid" = "vertical") => {
  const result = await mount(
    html`<sortable-test drag-enabled group="test-group" layout=${layout}>
      <div id="one"><button class="handle"></button></div>
      <div id="two"><button class="handle"></button></div>
    </sortable-test>`,
    { dynamicComponents: [Test] },
  );
  mountedComponents.push(result.component);
  return result;
};

const getSortableFor = (component: Test, itemId: string) =>
  sortableInstances.find(({ options }) => {
    const data = options.data as { component: Test; item: HTMLElement };
    return data.component === component && data.item.id === itemId;
  });

it("does not create sortables when dragEnabled is false", async () => {
  const { component } = await mount(Test);
  mountedComponents.push(component);

  expect(createSortableSpy).not.toHaveBeenCalled();
});

it("uses pointer input without the dnd-kit keyboard sensor", async () => {
  await mountDragEnabled();

  expect(configuredSensors).toHaveBeenCalledTimes(1);
  expect(configuredSensors.mock.calls[0][0]).toHaveLength(1);
  expect(configuredSensors.mock.calls[0][0]).not.toContain(keyboardSensor);
});

it("disables dnd-kit drop animation and accessibility attributes", async () => {
  await mountDragEnabled();

  expect(configuredPlugins).toHaveBeenCalledTimes(1);
  expect(configureFeedbackPlugin).toHaveBeenCalledWith({
    dropAnimation: null,
    feedback: expect.any(Function),
  });
  expect(configuredPlugins.mock.calls[0][0]).toContain(
    configureFeedbackPlugin.mock.results[0].value,
  );
  expect(configuredPlugins.mock.calls[0][0]).toContain(otherManagerPlugin);
  expect(configuredPlugins.mock.calls[0][0]).not.toContain(accessibilityPlugin);
});

it("creates one dnd-kit sortable per assigned item with the configured handle", async () => {
  const { component } = await mountDragEnabled();

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));

  const [firstOptions, secondOptions] = createSortableSpy.mock.calls.map(([options]) => options);

  expect(firstOptions).toMatchObject({ id: `${firstOptions.group}:item:one`, index: 0 });
  expect(secondOptions).toMatchObject({ id: `${secondOptions.group}:item:two`, index: 1 });
  expect(firstOptions.group).toBe(secondOptions.group);
  expect(firstOptions.group).not.toBe("test-group");
  expect(firstOptions.transition).toBeUndefined();
  const list = page.elementLocator(component.el);
  const firstHandle = list.getBySelector("#one .handle");
  expect(firstOptions.handle).toBe(list.getBySelector("#one").element());
  await expect.element(firstHandle).toBeInTheDocument();
});

it("ignores live self-targets when the cached collision points to another item", async () => {
  const { component } = await mountDragEnabled();
  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));
  component.sortMode = "manual";
  const draggedItem = page.elementLocator(component.el).getBySelector("#one").element();
  const bounds = draggedItem.getBoundingClientRect();
  dragOperation.position.current.x = bounds.x + bounds.width / 2;
  dragOperation.position.current.y = bounds.y + bounds.height / 4;
  const sourceSortable = getSortableFor(component, "one")!;
  const targetSortable = getSortableFor(component, "two")!;
  const dragOverListener = monitorListeners.get("dragover") as (event: unknown) => void;

  dragOverListener({
    operation: {
      source: { data: sourceSortable.data, sortable: sourceSortable, initialIndex: 0 },
      target: { data: targetSortable.data, sortable: targetSortable },
    },
    preventDefault: vi.fn(),
  });

  expect(component.onDragMove).not.toHaveBeenCalled();
});

it("uses the live source index for manual drop indicators", async () => {
  const { component } = await mountDragEnabled();
  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));
  component.sortMode = "manual";
  const items = page.elementLocator(component.el);
  const draggedItem = items.getBySelector("#two").element();
  const target = items.getBySelector("#one");
  component.el.prepend(draggedItem);
  const draggedBoundsSpy = vi
    .spyOn(draggedItem, "getBoundingClientRect")
    .mockReturnValue(new DOMRect(0, 0, 100, 40));
  onTestFinished(() => draggedBoundsSpy.mockRestore());
  const targetBoundsSpy = vi
    .spyOn(target.element(), "getBoundingClientRect")
    .mockReturnValue(new DOMRect(0, 40, 100, 40));
  onTestFinished(() => targetBoundsSpy.mockRestore());
  const bounds = target.element().getBoundingClientRect();
  const sourceSortable = getSortableFor(component, "two")!;
  const targetSortable = getSortableFor(component, "one")!;
  const dragOverListener = monitorListeners.get("dragover") as (event: unknown) => void;
  const event = {
    operation: {
      source: { data: sourceSortable.data, sortable: sourceSortable, initialIndex: 1 },
      target: { data: targetSortable.data, sortable: targetSortable },
    },
    preventDefault: vi.fn(),
  };
  dragOperation.position.current.x = bounds.x + bounds.width / 2;
  dragOperation.position.current.y = bounds.y + (bounds.height * 3) / 4;

  dragOverListener(event);
  await expect.element(target).toHaveAttribute("data-calcite-sort-position", "after");

  dragOperation.position.current.y = bounds.y + bounds.height / 4;
  dragOverListener(event);
  await expect.element(target).not.toHaveAttribute("data-calcite-sort-position");
});

it("reuses manual acceptance indices across candidates and refreshes them after mutations", async () => {
  const { component: source } = await mountDragEnabled();
  source.sortMode = "manual";
  const { component: target } = await mount(
    html`<sortable-test drag-enabled group="test-group" sort-mode="manual">
      ${Array.from(
        { length: 200 },
        (_, index) => html`<div id=${`target-${index}`}><button class="handle"></button></div>`,
      )}
    </sortable-test>`,
    { dynamicComponents: [Test] },
  );
  mountedComponents.push(target);
  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(202));
  const getItems = vi.fn(() => Array.from(target.el.children) as HTMLElement[]);
  target.getSortableItems = getItems;
  const canPut = vi.fn<(detail: DragDetail) => boolean>(() => true);
  target.canPut = canPut;
  const sourceSortable = getSortableFor(source, "one")!;
  const candidates = sortableInstances.slice(2);

  for (const candidate of candidates) {
    const accept = candidate.options.accept as (draggable: { data: unknown }) => boolean;
    expect(accept({ data: sourceSortable.data })).toBe(true);
  }

  expect(getItems).toHaveBeenCalledTimes(1);
  expect(canPut.mock.calls.map(([detail]) => detail.newIndex)).toEqual(
    Array.from({ length: 200 }, (_, index) => index),
  );

  const lastItem = page.elementLocator(target.el).getBySelector("#target-199").element();
  target.el.prepend(lastItem);
  const acceptLast = candidates[199].options.accept as (draggable: { data: unknown }) => boolean;
  expect(acceptLast({ data: sourceSortable.data })).toBe(true);
  expect(target.canPut).toHaveBeenLastCalledWith(expect.objectContaining({ newIndex: 0 }));
  expect(getItems).toHaveBeenCalledTimes(2);
});

it("refreshes manual acceptance indices after selector membership changes", async () => {
  const { component: source } = await mountDragEnabled();
  const { component: target } = await mountDragEnabled();
  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(4));
  source.sortMode = "manual";
  target.sortMode = "manual";
  target.dragSelector = ".included";
  const targetItems = page.elementLocator(target.el);
  const first = targetItems.getBySelector("#one").element();
  const second = targetItems.getBySelector("#two").element();
  first.classList.add("included");
  second.classList.add("included");
  target.canPut = vi.fn(() => true);
  const sourceSortable = getSortableFor(source, "one")!;
  const targetSortable = getSortableFor(target, "two")!;
  const accept = targetSortable.options.accept as (draggable: { data: unknown }) => boolean;

  expect(accept({ data: sourceSortable.data })).toBe(true);
  expect(target.canPut).toHaveBeenLastCalledWith(expect.objectContaining({ newIndex: 1 }));

  first.classList.remove("included");
  expect(accept({ data: sourceSortable.data })).toBe(true);
  expect(target.canPut).toHaveBeenLastCalledWith(expect.objectContaining({ newIndex: 0 }));
});

it("refreshes manual acceptance indices when a reset is queued during a drag", async () => {
  const { component: source } = await mountDragEnabled();
  const { component: target } = await mountDragEnabled();
  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(4));
  source.sortMode = "manual";
  target.sortMode = "manual";
  const targetItems = page.elementLocator(target.el);
  const first = targetItems.getBySelector("#one").element() as HTMLDivElement;
  const second = targetItems.getBySelector("#two").element() as HTMLDivElement;
  let items = [first, second];
  target.getSortableItems = () => items;
  target.canPut = vi.fn(() => true);
  const sourceSortable = getSortableFor(source, "one")!;
  const targetSortable = getSortableFor(target, "two")!;
  const accept = targetSortable.options.accept as (draggable: { data: unknown }) => boolean;
  const dragStartListener = monitorListeners.get("dragstart") as (event: unknown) => void;
  dragStartListener({ operation: { source: { data: sourceSortable.data, initialIndex: 0 } } });

  expect(accept({ data: sourceSortable.data })).toBe(true);
  expect(target.canPut).toHaveBeenLastCalledWith(expect.objectContaining({ newIndex: 1 }));

  items = [second];
  target.sortable.reset();
  expect(accept({ data: sourceSortable.data })).toBe(true);
  expect(target.canPut).toHaveBeenLastCalledWith(expect.objectContaining({ newIndex: 0 }));
  expect(createSortableSpy).toHaveBeenCalledTimes(4);
});

it("rejects a destination nested inside the dragged item", async () => {
  const source = await mountDragEnabled();
  const target = await mountDragEnabled();
  source.component.el.querySelector<HTMLElement>("#one")!.append(target.component.el);

  const sourceSortable = getSortableFor(source.component, "one")!;
  const targetSortable = getSortableFor(target.component, "one")!;
  const accept = targetSortable.options.accept as (draggable: { data: unknown }) => boolean;

  expect(accept({ data: sourceSortable.data })).toBe(false);
});

it.each([
  { layout: "horizontal", direction: "ltr", position: { x: 100, y: 50 } },
  { layout: "horizontal", direction: "rtl", position: { x: 0, y: 50 } },
  { layout: "vertical", direction: "ltr", position: { x: 50, y: 100 } },
  { layout: "grid", direction: "ltr", position: { x: 100, y: 60 } },
] as const)(
  "uses the $layout destination axis ($direction)",
  async ({ layout, direction, position }) => {
    const source = await mountDragEnabled();
    const target = await mountDragEnabled(layout);
    target.component.el.dir = direction;
    target.component.canPut = vi.fn(() => true);

    await vi.waitFor(() => expect(sortableInstances).toHaveLength(4));

    const sourceSortable = getSortableFor(source.component, "one")!;
    const targetSortable = getSortableFor(target.component, "one")!;
    const accept = targetSortable.options.accept as (draggable: { data: unknown }) => boolean;
    dragOperation.shape.current.center.x = position.x;
    dragOperation.shape.current.center.y = position.y;

    expect(accept({ data: sourceSortable.data })).toBe(true);
    expect(target.component.canPut).toHaveBeenCalledWith(expect.objectContaining({ newIndex: 1 }));
  },
);

it("preserves ungrouped sorting when sortDisabled is true", async () => {
  const ungrouped = await mount(
    html`<sortable-test drag-enabled sort-disabled>
      <div id="one"><button class="handle"></button></div>
      <div id="two"><button class="handle"></button></div>
    </sortable-test>`,
    { dynamicComponents: [Test] },
  );
  mountedComponents.push(ungrouped.component);

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));

  const [ungroupedSource, ungroupedTarget] = createSortableSpy.mock.calls.map(
    ([options]) => options,
  );
  const ungroupedAccept = ungroupedTarget.accept as (draggable: { data: unknown }) => boolean;

  expect(ungroupedAccept({ data: ungroupedSource.data })).toBe(true);

  const grouped = await mount(
    html`<sortable-test drag-enabled group="test-group" sort-disabled>
      <div id="one"><button class="handle"></button></div>
      <div id="two"><button class="handle"></button></div>
    </sortable-test>`,
    { dynamicComponents: [Test] },
  );
  mountedComponents.push(grouped.component);

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(4));

  const [groupedSource, groupedTarget] = createSortableSpy.mock.calls
    .slice(2)
    .map(([options]) => options);
  const groupedAccept = groupedTarget.accept as (draggable: { data: unknown }) => boolean;

  expect(groupedAccept({ data: groupedSource.data })).toBe(false);
});

it.each(["horizontal", "vertical"] as const)(
  "preserves optimistic sorting for %s layout without keyboard sorting",
  async (layout) => {
    await mountDragEnabled(layout);

    await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));

    const sortableOptions = createSortableSpy.mock.calls[0][0] as Record<string, unknown>;
    const getPlugins = sortableOptions.plugins as (plugins: unknown[]) => unknown[];
    const additionalPlugin = vi.fn();

    expect(getPlugins([keyboardPlugin, optimisticSortingPlugin, additionalPlugin])).toEqual([
      optimisticSortingPlugin,
      additionalPlugin,
    ]);
  },
);

it("does not notify components whose dragging is disabled", async () => {
  const { component: inactiveComponent } = await mount(Test);
  mountedComponents.push(inactiveComponent);
  const { component: activeComponent } = await mountDragEnabled();

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));

  const dragStartListener = monitorListeners.get("dragstart") as (event: unknown) => void;
  const sortableOptions = createSortableSpy.mock.calls[0][0];

  dragStartListener({
    operation: {
      source: {
        data: sortableOptions.data,
        initialIndex: sortableOptions.index,
      },
    },
  });

  expect(activeComponent.onGlobalDragStart).toHaveBeenCalledTimes(1);
  expect(inactiveComponent.onGlobalDragStart).not.toHaveBeenCalled();
});

it("queues a reset while a drag is active and flushes it after the drag ends", async () => {
  const { component } = await mountDragEnabled();

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));

  const dragStartListener = monitorListeners.get("dragstart") as (event: unknown) => void;
  const dragEndListener = monitorListeners.get("dragend") as (event: unknown) => void;
  const sortableOptions = createSortableSpy.mock.calls[0][0];

  dragStartListener({
    operation: {
      source: {
        data: sortableOptions.data,
        initialIndex: sortableOptions.index,
      },
    },
  });

  component.sortable.reset();

  expect(destroySortableSpy).not.toHaveBeenCalled();

  dragEndListener({
    canceled: false,
    operation: {
      position: { current: { x: 0, y: 0 } },
    },
  });

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(4));
  expect(destroySortableSpy.mock.calls.length).toBeGreaterThan(0);
});

it("retries setup when a peer starts dragging while component updates are pending", async () => {
  const { component } = await mountDragEnabled();
  const { component: peer } = await mountDragEnabled();
  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(4));

  const update = Promise.withResolvers<boolean>();
  const updateComplete = vi
    .spyOn(component, "updateComplete", "get")
    .mockReturnValue(update.promise);
  onTestFinished(() => {
    update.resolve(true);
    updateComplete.mockRestore();
  });

  component.sortable.reset();
  expect(destroySortableSpy).toHaveBeenCalledTimes(2);

  const dragStartListener = monitorListeners.get("dragstart") as (event: unknown) => void;
  const dragEndListener = monitorListeners.get("dragend") as (event: unknown) => void;
  dragStartListener({ operation: { source: getSortableFor(peer, "one") } });
  expect(peer.onGlobalDragStart).toHaveBeenCalledTimes(1);

  update.resolve(true);
  await new Promise(requestAnimationFrame);
  expect(createSortableSpy).toHaveBeenCalledTimes(4);

  updateComplete.mockRestore();
  dragEndListener({ canceled: false });

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(6));
  expect(getSortableFor(component, "one")).toBeDefined();
});

it("destroys and recreates sortables when dragEnabled changes", async () => {
  const { component } = await mountDragEnabled();

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));

  component.dragEnabled = false;
  component.sortable.reset();

  await vi.waitFor(() => expect(destroySortableSpy).toHaveBeenCalledTimes(2));
  expect(createSortableSpy).toHaveBeenCalledTimes(2);

  component.dragEnabled = true;
  component.sortable.reset();

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(4));
  expect(destroySortableSpy).toHaveBeenCalledTimes(2);
});

it("reacquires the shared manager after its last peer disconnects", async () => {
  const { component } = await mountDragEnabled();
  const { component: peer } = await mountDragEnabled();

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(4));

  component.dragEnabled = false;
  component.sortable.reset();

  await vi.waitFor(() => expect(destroySortableSpy).toHaveBeenCalledTimes(2));

  peer.remove();
  expect(destroyManagerSpy).toHaveBeenCalledTimes(1);

  component.dragEnabled = true;
  component.sortable.reset();

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(6));
});

it("preserves the replacement manager when an inactive peer disconnects", async () => {
  const { component: inactive } = await mountDragEnabled();
  const { component: peer } = await mountDragEnabled();
  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(4));

  inactive.dragEnabled = false;
  inactive.sortable.reset();
  await vi.waitFor(() => expect(destroySortableSpy).toHaveBeenCalledTimes(2));

  peer.remove();
  expect(destroyManagerSpy).toHaveBeenCalledTimes(1);

  await mountDragEnabled();
  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(6));

  inactive.remove();
  await mountDragEnabled();
  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(8));

  expect(configuredPlugins).toHaveBeenCalledTimes(2);
  expect(destroyManagerSpy).toHaveBeenCalledTimes(1);
});
