import { LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { mount } from "@arcgis/lumina-compiler/testing";
import { beforeEach, expect, it, vi } from "vitest";
import { CSS, useSortable } from "./useSortable";
import { getSlotAssignedElements } from "../utils/dom";

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
  dragSelector?: string;

  private defaultSlotEl?: HTMLSlotElement;

  @property({ type: Boolean }) dragEnabled = false;

  canPull(): boolean {
    return true;
  }

  canPut(): boolean {
    return true;
  }

  getSortableItems(): HTMLElement[] {
    const slot = this.defaultSlotEl;

    if (!slot) {
      return [];
    }

    return getSlotAssignedElements<HTMLElement>(slot).filter(
      (item) => !this.dragSelector || item.matches(this.dragSelector),
    );
  }

  private setDefaultSlotEl = (el: HTMLSlotElement): void => {
    this.defaultSlotEl = el;
  };

  onGlobalDragStart(): void {}
  onGlobalDragEnd(): void {}
  onDragEnd(): void {}
  onDragStart(): void {}
  onDragSort(): void {}

  override render() {
    return <slot ref={this.setDefaultSlotEl} />;
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

function dispatchTouchPointerEvent(
  target: EventTarget,
  type: "pointerdown" | "pointerup" | "pointercancel",
  pointerId: number,
): void {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerType: "touch", pointerId }));
}

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

it("destroys Sortable after touch ends outside the component", async () => {
  const { component } = await mountDragEnabled();

  dispatchTouchPointerEvent(component.el, "pointerdown", 1);
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(1);
  expect(createSpy).toHaveBeenCalledTimes(1);

  dispatchTouchPointerEvent(document, "pointerup", 1);
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(2);
  expect(createSpy).toHaveBeenCalledTimes(2);
});

it("always tears down Sortable on disconnect", async () => {
  const { component } = await mountDragEnabled();

  dispatchTouchPointerEvent(component.el, "pointerdown", 2);
  component.el.remove();
  await Promise.resolve();

  expect(destroySpy).toHaveBeenCalledTimes(2);
});

it("destroys Sortable after pointercancel ends touch interaction", async () => {
  const { component } = await mountDragEnabled();

  dispatchTouchPointerEvent(component.el, "pointerdown", 3);
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(1);
  expect(createSpy).toHaveBeenCalledTimes(1);

  dispatchTouchPointerEvent(document, "pointercancel", 3);
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(2);
  expect(createSpy).toHaveBeenCalledTimes(2);
});

it("keeps Sortable paused until all tracked touch pointers end", async () => {
  const { component } = await mountDragEnabled();

  dispatchTouchPointerEvent(component.el, "pointerdown", 10);
  dispatchTouchPointerEvent(component.el, "pointerdown", 11);
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(1);
  expect(createSpy).toHaveBeenCalledTimes(1);

  dispatchTouchPointerEvent(document, "pointerup", 10);
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(1);
  expect(createSpy).toHaveBeenCalledTimes(1);

  dispatchTouchPointerEvent(document, "pointerup", 11);
  component.sortable.reset();

  expect(destroySpy).toHaveBeenCalledTimes(2);
  expect(createSpy).toHaveBeenCalledTimes(2);
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

it("gets sortable items from the slot and respects dragSelector", async () => {
  const { component } = await mount(
    html`<sortable-test drag-enabled>
      <div id="one" class="sortable"></div>
      <div id="two" class="sortable"></div>
      <div id="ignored"></div>
    </sortable-test>`,
    {
      dynamicComponents: [Test],
    },
  );

  component.dragSelector = ".sortable";

  const call = createSpy.mock.calls[0][0];
  const getSortableItemsSpy = vi.spyOn(component, "getSortableItems");

  expect(call.getValues()).toEqual(["one", "two"]);
  expect(getSortableItemsSpy).toHaveBeenCalledTimes(1);
});

it("does not include the dragged node clone in sortable items", async () => {
  const { component } = await mount(
    html`<sortable-test drag-enabled>
      <div id="one"></div>
      <div id="two"></div>
      <div id="dnd-dragged-node-clone"></div>
    </sortable-test>`,
    {
      dynamicComponents: [Test],
    },
  );

  const call = createSpy.mock.calls[0][0];
  const [first, second, clone] = Array.from(component.el.children) as HTMLElement[];

  expect(call.getValues()).toEqual(["one", "two"]);
  expect(first.id).toBe("one");
  expect(second.id).toBe("two");
  expect(clone.id).toBe("dnd-dragged-node-clone");
});

it("keeps the clone-pull copy before the dragged item", async () => {
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
  const [first, second, third] = Array.from(component.el.children) as HTMLElement[];
  const targetEl = document.createElement("div");

  vi.spyOn(component, "canPull").mockReturnValue("clone" as never);

  call.config.onTransfer({
    draggedNodes: [{ el: first }],
    initialParent: {
      data: { enabledNodes: [{ el: first }, { el: second }, { el: third }] },
      el: component.el,
    },
    sourceParent: {
      data: { enabledNodes: [{ el: second }, { el: third }] },
      el: component.el,
    },
    state: {
      draggedNode: { el: first },
      initialIndex: 0,
      initialParent: {
        data: { enabledNodes: [{ el: first }, { el: second }, { el: third }] },
        el: component.el,
      },
      currentParent: {
        data: { enabledNodes: [] },
        el: targetEl,
      },
    },
    targetIndex: 0,
    targetNodes: [],
    targetParent: {
      data: { enabledNodes: [] },
      el: targetEl,
    },
  });

  expect(component.el.children).toHaveLength(4);
  expect(component.el.children[0]).not.toBe(first);
  expect(component.el.children[1]).toBe(first);
});
