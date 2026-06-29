import { LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { mount } from "@arcgis/lumina-compiler/testing";
import { beforeEach, expect, it, vi } from "vitest";
import { useSortable } from "./useSortable";

const { createSpy, destroySpy } = vi.hoisted(() => ({
  createSpy: vi.fn(),
  destroySpy: vi.fn(),
}));

vi.mock("sortablejs", () => ({
  default: {
    create: createSpy.mockImplementation(() => ({ destroy: destroySpy })),
  },
}));

class Test extends LitElement {
  static tagName = "sortable-test";
  handleSelector = "calcite-sort-handle";
  sortable = useSortable<this>()(this);

  onGlobalDragStart = vi.fn();
  onGlobalDragEnd = vi.fn();
  onDragEnd = vi.fn();
  onDragStart = vi.fn();
  onDragSort = vi.fn();

  @property({ type: Boolean }) dragEnabled = false;

  canPull(): boolean {
    return true;
  }

  canPut(): boolean {
    return true;
  }
}

beforeEach(() => {
  createSpy.mockClear();
  destroySpy.mockClear();
});

const mountDragEnabled = () =>
  mount(html`<sortable-test drag-enabled></sortable-test>`, {
    dynamicComponents: [Test],
  });

it("does not create Sortable when dragEnabled is false", async () => {
  await mount(Test);

  expect(createSpy).not.toHaveBeenCalled();
});

it("creates Sortable when dragEnabled is true", async () => {
  await mountDragEnabled();

  expect(createSpy).toHaveBeenCalledTimes(1);
});

it("sets fallbackOnBody for stable fallback ghost placement", async () => {
  await mountDragEnabled();

  const sortableOptions = createSpy.mock.calls[0]?.[1] as {
    fallbackOnBody?: boolean;
  };

  expect(sortableOptions.fallbackOnBody).toBe(true);
});

it("destroys Sortable when dragEnabled becomes false and reset runs", async () => {
  const { component } = await mountDragEnabled();

  component.dragEnabled = false;
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(1);
  expect(createSpy).toHaveBeenCalledTimes(1);
});

it("does not teardown Sortable when reset runs during choose/start drag window", async () => {
  const { component } = await mountDragEnabled();
  const sortableOptions = createSpy.mock.calls[0]?.[1] as {
    onChoose?: () => void;
    onUnchoose?: () => void;
  };

  sortableOptions.onChoose?.();
  component.sortable.reset();

  expect(destroySpy).not.toHaveBeenCalled();
  expect(createSpy).toHaveBeenCalledTimes(1);

  sortableOptions.onUnchoose?.();
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(1);
  expect(createSpy).toHaveBeenCalledTimes(2);
});

it("dedupes global drag notifications across choose/start and end/unchoose", async () => {
  const { component } = await mountDragEnabled();
  const sortableOptions = createSpy.mock.calls[0]?.[1] as {
    onChoose?: () => void;
    onUnchoose?: () => void;
    onStart?: (detail: {
      from: HTMLElement;
      item: HTMLElement;
      to: HTMLElement;
      newDraggableIndex: number;
      oldDraggableIndex: number;
    }) => void;
    onEnd?: (detail: {
      from: HTMLElement;
      item: HTMLElement;
      to: HTMLElement;
      newDraggableIndex: number;
      oldDraggableIndex: number;
    }) => void;
  };

  const dragDetail = {
    from: component.el,
    item: component.el,
    to: component.el,
    newDraggableIndex: 0,
    oldDraggableIndex: 0,
  };

  sortableOptions.onChoose?.();
  sortableOptions.onStart?.(dragDetail);
  sortableOptions.onEnd?.(dragDetail);
  sortableOptions.onUnchoose?.();

  expect(component.onGlobalDragStart).toHaveBeenCalledTimes(1);
  expect(component.onGlobalDragEnd).toHaveBeenCalledTimes(1);
});

it("does not leave global drag state active when component disconnects mid-drag", async () => {
  const { component } = await mountDragEnabled();
  const sortableOptions = createSpy.mock.calls[0]?.[1] as {
    onChoose?: () => void;
  };

  sortableOptions.onChoose?.();
  component.remove();

  await mountDragEnabled();

  expect(destroySpy).toHaveBeenCalledTimes(1);
  expect(createSpy).toHaveBeenCalledTimes(2);
});
