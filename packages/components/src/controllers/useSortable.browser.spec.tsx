import { LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { mount } from "@arcgis/lumina-compiler/testing";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useSortable } from "./useSortable";

const { createSortableSpy, destroySortableSpy, destroyManagerSpy, monitorListeners } = vi.hoisted(
  () => ({
    createSortableSpy: vi.fn(),
    destroySortableSpy: vi.fn(),
    destroyManagerSpy: vi.fn(),
    monitorListeners: new Map<string, unknown>(),
  }),
);

vi.mock("@dnd-kit/dom", () => {
  class PointerSensor {
    static configure(options: unknown): unknown {
      return { sensor: PointerSensor, options };
    }
  }

  class Distance {
    constructor(readonly options: unknown) {}
  }

  class DragDropManager {
    monitor = {
      addEventListener: vi.fn((type: string, listener: unknown) => {
        monitorListeners.set(type, listener);
        return vi.fn();
      }),
    };

    constructor() {}

    destroy(): void {
      destroyManagerSpy();
    }
  }

  return {
    DragDropManager,
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

it("creates one dnd-kit sortable per assigned item with the configured handle", async () => {
  const { component } = await mountDragEnabled();

  await vi.waitFor(() => expect(createSortableSpy).toHaveBeenCalledTimes(2));

  const [firstOptions, secondOptions] = createSortableSpy.mock.calls.map(([options]) => options);

  expect(firstOptions).toMatchObject({ id: "one", index: 0, group: "test-group" });
  expect(secondOptions).toMatchObject({ id: "two", index: 1, group: "test-group" });
  const firstHandle = component.el.querySelector<HTMLButtonElement>("#one .handle");
  expect(firstHandle).toBeDefined();
  expect(firstOptions.handle).toBe(firstHandle);
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
