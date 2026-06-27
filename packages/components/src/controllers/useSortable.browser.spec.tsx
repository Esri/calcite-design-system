import { LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { mount } from "@arcgis/lumina-compiler/testing";
import { beforeEach, expect, it, vi } from "vitest";
import { CSS, useSortable } from "./useSortable";
import { getSlotAssignedElements } from "../utils/dom";
import { logger } from "../utils/logger";

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
  onDragBeforeSort(detail): Event {
    const dragSortEvent = new CustomEvent("sortableTestDragBeforeSort", {
      bubbles: true,
      cancelable: true,
      detail,
    });

    this.el.dispatchEvent(dragSortEvent);

    return dragSortEvent;
  }

  onDragSort(): void {}

  override render() {
    return <slot ref={this.setDefaultSlotEl} />;
  }
}

class TestWithDelayedSortableItems extends Test {
  static override tagName = "sortable-delayed-items-test";

  private sortableItemsReady = false;

  override updated(): void {
    this.sortableItemsReady = true;
  }

  override getSortableItems(): HTMLElement[] {
    return this.sortableItemsReady ? super.getSortableItems() : [];
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

  await vi.waitFor(() => {
    const call = createSpy.mock.calls.at(-1)?.[0];

    expect(call?.config.dragHandle).toBe(".custom-handle");
  });
});

it("destroys Sortable when dragEnabled becomes false and reset runs", async () => {
  const { component } = await mountDragEnabled();

  component.dragEnabled = false;
  component.sortable.reset();

  await vi.waitFor(() => {
    expect(destroySpy).toHaveBeenCalledTimes(2);
  });

  expect(createSpy).toHaveBeenCalledTimes(1);
});

it("waits for drag end before destroying Sortable on reset", async () => {
  const { component } = await mount(
    html`<sortable-test drag-enabled>
      <div id="one"></div>
    </sortable-test>`,
    {
      dynamicComponents: [Test],
    },
  );

  const call = createSpy.mock.calls[0][0];
  const [first] = Array.from(component.el.children) as HTMLElement[];
  const dragState = {
    draggedNode: { el: first },
    initialIndex: 0,
    initialParent: {
      data: { enabledNodes: [{ el: first }] },
      el: component.el,
    },
    currentParent: {
      data: { enabledNodes: [{ el: first }] },
      el: component.el,
    },
  };

  call.config.onDragstart({
    draggedNode: { el: first },
    state: dragState,
  });

  component.dragEnabled = false;
  component.sortable.reset();

  await vi.waitFor(() => {
    expect(destroySpy).toHaveBeenCalledTimes(1);
  });

  call.config.onDragend({
    draggedNode: { el: first },
    state: dragState,
    values: [first.id],
  });

  await vi.waitFor(() => {
    expect(destroySpy).toHaveBeenCalledTimes(2);
  });

  expect(createSpy).toHaveBeenCalledTimes(1);
});

it("waits for first update when sortable items are initially unavailable", async () => {
  await mount(
    html`<sortable-delayed-items-test drag-enabled>
      <div id="one"></div>
      <div id="two"></div>
      <div id="three"></div>
    </sortable-delayed-items-test>`,
    {
      dynamicComponents: [TestWithDelayedSortableItems],
    },
  );

  await vi.waitFor(() => {
    const call = createSpy.mock.calls[0]?.[0];

    expect(call?.getValues()).toEqual(["one", "two", "three"]);
  });
});

it("logs and recovers after sortable operation failure", async () => {
  const warnSpy = vi.spyOn(logger, "warn").mockImplementation(() => undefined);

  try {
    destroySpy.mockImplementationOnce(() => {
      throw new Error("teardown failed");
    });

    const { component } = await mountDragEnabled();

    await vi.waitFor(() => {
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("[sortable] Lifecycle operation failed"),
      );
    });

    component.sortable.reset();

    await vi.waitFor(() => {
      expect(createSpy).toHaveBeenCalledTimes(1);
    });
  } finally {
    warnSpy.mockRestore();
  }
});

it("tears down when disconnected during active drag", async () => {
  const { component } = await mount(
    html`<sortable-test drag-enabled>
      <div id="one"></div>
    </sortable-test>`,
    {
      dynamicComponents: [Test],
    },
  );

  const call = createSpy.mock.calls[0][0];
  const [first] = Array.from(component.el.children) as HTMLElement[];

  call.config.onDragstart({
    draggedNode: { el: first },
    state: {
      draggedNode: { el: first },
      initialIndex: 0,
      initialParent: {
        data: { enabledNodes: [{ el: first }] },
        el: component.el,
      },
      currentParent: {
        data: { enabledNodes: [{ el: first }] },
        el: component.el,
      },
    },
  });

  let destroyCallsBeforeDragEnd = 0;

  try {
    component.el.remove();

    await vi.waitFor(() => {
      expect(destroySpy).toHaveBeenCalledTimes(2);
    });

    destroyCallsBeforeDragEnd = destroySpy.mock.calls.length;
    expect(destroyCallsBeforeDragEnd).toBe(2);
  } finally {
    call.config.onDragend({
      draggedNode: { el: first },
      state: {
        draggedNode: { el: first },
        initialIndex: 0,
        initialParent: {
          data: { enabledNodes: [{ el: first }] },
          el: component.el,
        },
        currentParent: {
          data: { enabledNodes: [{ el: first }] },
          el: component.el,
        },
      },
      values: [first.id],
    });
  }

  expect(destroyCallsBeforeDragEnd).toBe(2);
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

it("skips Calcite sort handling when sort event is canceled", async () => {
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
  const appendChildSpy = vi.spyOn(component.el, "appendChild");
  const onDragBeforeSortSpy = vi.spyOn(component, "onDragBeforeSort");
  const onDragSortSpy = vi.spyOn(component, "onDragSort");

  component.el.addEventListener("sortableTestDragBeforeSort", (event) => event.preventDefault(), {
    once: true,
  });

  call.config.onSort({
    draggedNodes: [{ el: first }],
    parent: {
      data: { enabledNodes: [{ el: first }, { el: second }, { el: third }] },
      el: component.el,
    },
    position: 2,
    previousPosition: 0,
    values: ["two", "three", "one"],
  });

  expect(onDragBeforeSortSpy).toHaveBeenCalledTimes(1);
  expect(onDragSortSpy).not.toHaveBeenCalled();
  expect(appendChildSpy).not.toHaveBeenCalled();
});

it("skips Calcite transfer handling when transfer sort event is canceled", async () => {
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
  const detachedSource = document.createElement("div");
  detachedSource.appendChild(first);
  const appendChildSpy = vi.spyOn(component.el, "appendChild");

  component.el.addEventListener("sortableTestDragBeforeSort", (event) => event.preventDefault(), {
    once: true,
  });

  call.config.onTransfer({
    draggedNodes: [{ el: first }],
    initialParent: {
      data: { enabledNodes: [{ el: first }] },
      el: detachedSource,
    },
    sourceParent: {
      data: { enabledNodes: [{ el: first }] },
      el: detachedSource,
    },
    state: {
      draggedNode: { el: first },
      initialIndex: 0,
      initialParent: {
        data: { enabledNodes: [{ el: first }] },
        el: detachedSource,
      },
      currentParent: {
        data: { enabledNodes: [{ el: second }, { el: third }] },
        el: component.el,
      },
    },
    targetIndex: 0,
    targetNodes: [{ el: second }],
    targetParent: {
      data: { enabledNodes: [{ el: second }, { el: third }] },
      el: component.el,
    },
  });

  expect(appendChildSpy).not.toHaveBeenCalled();
});

it("source cancellation does not prevent target transfer mutations", async () => {
  const sourceResult = await mount(
    html`<sortable-test drag-enabled>
      <div id="source-one"></div>
    </sortable-test>`,
    {
      dynamicComponents: [Test],
    },
  );
  const targetResult = await mount(
    html`<sortable-test drag-enabled>
      <div id="target-one"></div>
      <div id="target-two"></div>
    </sortable-test>`,
    {
      dynamicComponents: [Test],
    },
  );

  const sourceComponent = sourceResult.component;
  const targetComponent = targetResult.component;
  const sourceCall = createSpy.mock.calls[0][0];
  const targetCall = createSpy.mock.calls[1][0];
  const [dragEl] = Array.from(sourceComponent.el.children) as HTMLElement[];
  const [targetFirst, targetSecond] = Array.from(targetComponent.el.children) as HTMLElement[];
  const sourceAppendChildSpy = vi.spyOn(sourceComponent.el, "appendChild");
  const targetAppendChildSpy = vi.spyOn(targetComponent.el, "appendChild");
  const sharedDragState = {
    draggedNode: { el: dragEl },
    initialIndex: 0,
    initialParent: {
      data: { enabledNodes: [{ el: dragEl }] },
      el: sourceComponent.el,
    },
    currentParent: {
      data: { enabledNodes: [{ el: targetFirst }, { el: targetSecond }] },
      el: targetComponent.el,
    },
  };
  const transferEvent = {
    draggedNodes: [{ el: dragEl }],
    initialParent: {
      data: { enabledNodes: [{ el: dragEl }] },
      el: sourceComponent.el,
    },
    sourceParent: {
      data: { enabledNodes: [{ el: dragEl }] },
      el: sourceComponent.el,
    },
    state: sharedDragState,
    targetIndex: 0,
    targetNodes: [{ el: targetFirst }],
    targetParent: {
      data: { enabledNodes: [{ el: targetFirst }, { el: targetSecond }] },
      el: targetComponent.el,
    },
  };

  sourceComponent.el.addEventListener(
    "sortableTestDragBeforeSort",
    (event) => event.preventDefault(),
    {
      once: true,
    },
  );

  targetCall.config.onTransfer(transferEvent);
  sourceCall.config.onTransfer(transferEvent);

  expect(sourceAppendChildSpy).not.toHaveBeenCalled();
  expect(targetAppendChildSpy).toHaveBeenCalled();
});

it("target cancellation does not prevent source transfer mutations", async () => {
  const sourceResult = await mount(
    html`<sortable-test drag-enabled>
      <div id="source-one"></div>
    </sortable-test>`,
    {
      dynamicComponents: [Test],
    },
  );
  const targetResult = await mount(
    html`<sortable-test drag-enabled>
      <div id="target-one"></div>
      <div id="target-two"></div>
    </sortable-test>`,
    {
      dynamicComponents: [Test],
    },
  );

  const sourceComponent = sourceResult.component;
  const targetComponent = targetResult.component;
  const sourceCall = createSpy.mock.calls[0][0];
  const targetCall = createSpy.mock.calls[1][0];
  const [dragEl] = Array.from(sourceComponent.el.children) as HTMLElement[];
  const [targetFirst, targetSecond] = Array.from(targetComponent.el.children) as HTMLElement[];
  const sourceAppendChildSpy = vi.spyOn(sourceComponent.el, "appendChild");
  const targetAppendChildSpy = vi.spyOn(targetComponent.el, "appendChild");
  const sharedDragState = {
    draggedNode: { el: dragEl },
    initialIndex: 0,
    initialParent: {
      data: { enabledNodes: [{ el: dragEl }] },
      el: sourceComponent.el,
    },
    currentParent: {
      data: { enabledNodes: [{ el: targetFirst }, { el: targetSecond }] },
      el: targetComponent.el,
    },
  };
  const transferEvent = {
    draggedNodes: [{ el: dragEl }],
    initialParent: {
      data: { enabledNodes: [{ el: dragEl }] },
      el: sourceComponent.el,
    },
    sourceParent: {
      data: { enabledNodes: [{ el: dragEl }] },
      el: sourceComponent.el,
    },
    state: sharedDragState,
    targetIndex: 0,
    targetNodes: [{ el: targetFirst }],
    targetParent: {
      data: { enabledNodes: [{ el: targetFirst }, { el: targetSecond }] },
      el: targetComponent.el,
    },
  };

  vi.spyOn(sourceComponent, "canPull").mockReturnValue("clone" as never);
  targetComponent.el.addEventListener(
    "sortableTestDragBeforeSort",
    (event) => event.preventDefault(),
    {
      once: true,
    },
  );

  targetCall.config.onTransfer(transferEvent);
  sourceCall.config.onTransfer(transferEvent);

  expect(sourceAppendChildSpy).not.toHaveBeenCalled();
  expect(sourceComponent.el.children).toHaveLength(2);
  expect(targetAppendChildSpy).not.toHaveBeenCalled();
});
