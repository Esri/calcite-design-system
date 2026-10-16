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
  onDragStart = vi.fn();
  onDragSort = vi.fn();
  canPut?: (detail: DragDetail) => boolean;

  @property({ type: Boolean }) dragEnabled = false;
  @property({ type: Boolean }) sortDisabled = false;
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
