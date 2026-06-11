import { LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { mount } from "@arcgis/lumina-compiler/testing";
import { beforeEach, expect, it, vi } from "vitest";
import { CSS, useSortable } from "./useSortable";

const { createSpy, destroySpy } = vi.hoisted(() => ({
  createSpy: vi.fn(),
  destroySpy: vi.fn(),
}));

vi.mock("@formkit/drag-and-drop", () => ({
  dragAndDrop: createSpy.mockImplementation(() => undefined),
  tearDown: destroySpy,
}));

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

it("uses existing sortable classes in FormKit config", async () => {
  await mountDragEnabled();

  const call = createSpy.mock.calls[0][0];

  expect(call.config.draggingClass).toBe(CSS.dragClass);
  expect(call.config.dragPlaceholderClass).toBe(CSS.chosenClass);
  expect(call.config.dropZoneClass).toBe(CSS.ghostClass);
});

it("uses handleSelector as FormKit dragHandle", async () => {
  const { component } = await mountDragEnabled();

  component.handleSelector = ".custom-handle";
  component.sortable.reset();

  const call = createSpy.mock.calls.at(-1)?.[0];

  expect(call?.config.dragHandle).toBe(".custom-handle");
});

it("destroys Sortable when dragEnabled becomes false and reset runs", async () => {
  const { component } = await mountDragEnabled();

  component.dragEnabled = false;
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(2);
  expect(createSpy).toHaveBeenCalledTimes(1);
});

it("does not reorder DOM when setValues receives the current order", async () => {
  const { component } = await mount(
    html`<sortable-test drag-enabled>
      <div id="one"></div>
      <div id="two"></div>
      <div id="three"></div>
    </sortable-test>`,
    {
      dynamicComponents: [Test],
    },
  );

  const call = createSpy.mock.calls[0][0];
  const appendChildSpy = vi.spyOn(component.el, "appendChild");

  call.setValues(call.getValues());

  expect(appendChildSpy).not.toHaveBeenCalled();
});
