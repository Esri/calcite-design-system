import { LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { mount } from "@arcgis/lumina-compiler/testing";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useSortable } from "./useSortable";

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
}));

vi.mock("@dnd-kit/dom", () => {
  class PointerSensor {
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
    actions = {
      stop: vi.fn(),
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
    constructor(
      readonly options: Record<string, unknown>,
      manager: unknown,
    ) {
      void manager;
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
  sortable = useSortable<this>()(this);

  onGlobalDragStart = vi.fn();
  onGlobalDragEnd = vi.fn();
  onDragEnd = vi.fn();
  onDragStart = vi.fn();
  onDragSort = vi.fn();

  @property({ type: Boolean }) dragEnabled = false;
  @property() group?: string;
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
});

afterEach(() => {
  mountedComponents.forEach((component) => component.remove());
  mountedComponents.length = 0;
});

const mountDragEnabled = async () => {
  const result = await mount(
    html`<sortable-test drag-enabled group="test-group">
      <div id="one"><button class="handle"></button></div>
      <div id="two"><button class="handle"></button></div>
    </sortable-test>`,
    { dynamicComponents: [Test] },
  );
  mountedComponents.push(result.component);
  return result;
};

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
  expect(configureFeedbackPlugin).toHaveBeenCalledWith({ dropAnimation: null });
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

  expect(firstOptions).toMatchObject({ id: "one", index: 0 });
  expect(secondOptions).toMatchObject({ id: "two", index: 1 });
  expect(firstOptions.group).toBe(secondOptions.group);
  expect(firstOptions.group).not.toBe("test-group");
  expect(firstOptions.transition).toBeUndefined();
  const firstHandle = component.el.querySelector<HTMLButtonElement>("#one .handle");
  expect(firstHandle).toBeDefined();
  expect(firstOptions.handle).toBe(firstHandle);
});

it("omits dnd-kit keyboard sorting while preserving other sortable plugins", async () => {
  await mountDragEnabled();

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));

  const sortableOptions = createSortableSpy.mock.calls[0][0] as Record<string, unknown>;
  const getPlugins = sortableOptions.plugins as (plugins: unknown[]) => unknown[];
  const additionalPlugin = vi.fn();

  expect(getPlugins([keyboardPlugin, optimisticSortingPlugin, additionalPlugin])).toEqual([
    optimisticSortingPlugin,
    additionalPlugin,
  ]);
});

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
