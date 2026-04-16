import { LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { mount } from "@arcgis/lumina-compiler/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
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

describe("useSortable", () => {
  class Test extends LitElement {
    static tagName = "sortable-test";
    handleSelector = "calcite-sort-handle";
    sortable = useSortable<this>()(this);

    @property({ type: Boolean }) dragEnabled = false;

    canPull(): boolean {
      return true;
    }

    canPut(): boolean {
      return true;
    }

    onGlobalDragStart(): void {}
    onGlobalDragEnd(): void {}
    onDragEnd(): void {}
    onDragStart(): void {}
    onDragSort(): void {}
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

  it("destroys Sortable when dragEnabled becomes false and reset runs", async () => {
    const { component } = await mountDragEnabled();

    component.dragEnabled = false;
    component.sortable.reset();

    expect(destroySpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
