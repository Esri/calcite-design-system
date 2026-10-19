import { h } from "@arcgis/lumina";
import { describe, expect, it, onTestFinished, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Sortable } from "@dnd-kit/dom/sortable";
import { page, userEvent } from "vitest/browser";
import { dragAndDrop } from "../../tests/utils/browser";
import { commands } from "../../tests/utils/commands";
import { afterNextFrame, afterNextTask } from "../../tests/utils/timing";
import { hidden, renders, disabled, accessible } from "../../tests/common";
import type { Handle } from "../handle/handle";
import { SortableList } from "./sortable-list";

describe("accessible", () => {
  accessible(() => mount("calcite-sortable-list"));
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-sortable-list"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-sortable-list drag-selector=".calcite-sortable">
          <div>
            <calcite-handle />1
          </div>
        </calcite-sortable-list>,
      ),
    { display: "flex" },
  );
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-sortable-list>
          <div id="one">
            <calcite-handle />1
          </div>
          <div id="two">
            <calcite-handle />2
          </div>
          <div id="three">
            <calcite-handle />3
          </div>
        </calcite-sortable-list>,
      ),
    { focusTarget: "child" },
  );
});

describe("drag and drop", () => {
  const renderSortableList = () =>
    mount(
      <calcite-sortable-list id="sortable-list">
        <div id="one">
          <calcite-handle />1
        </div>
        <div id="two">
          <calcite-handle />2
        </div>
      </calcite-sortable-list>,
    );

  const renderCopyGap = async (layout: "horizontal" | "grid", direction: "ltr" | "rtl" = "ltr") => {
    const { component: source } = await mount<SortableList>(
      <div style="display: flex; align-items: flex-start; gap: 40px">
        <calcite-sortable-list
          dir={direction}
          group="gaps"
          id="gap-source"
          layout={layout}
          style="width: 160px"
        >
          <div
            id="gap-copy"
            style="display: flex; align-items: center; width: 80px; height: 40px; box-sizing: border-box"
          >
            <calcite-handle />
            Copy
          </div>
        </calcite-sortable-list>
        <calcite-sortable-list
          dir={direction}
          group="gaps"
          id="gap-destination"
          layout={layout}
          style="width: 240px"
        >
          <div
            id="gap-target"
            style="display: flex; align-items: center; width: 80px; height: 40px; box-sizing: border-box"
          >
            <calcite-handle />
            Target
          </div>
          <div style="width: 80px; height: 40px; box-sizing: border-box">Following</div>
        </calcite-sortable-list>
      </div>,
    );
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";
    const handle = page.getBySelector("#gap-copy calcite-handle");
    await expect.element(handle).toBeVisible();
    const destination = page.getBySelector("#gap-destination");
    return {
      destination,
      gap: destination.getBySelector('[data-dnd-placeholder="copy"]'),
      handle,
      target: destination.getBySelector("#gap-target"),
    };
  };

  it("reserves horizontal copy gaps without resizing fixed-size items", async () => {
    const { destination, gap, handle, target } = await renderCopyGap("horizontal");

    await dragAndDrop(handle.element(), target.element(), "left", { skipPointerUp: true });
    await expect.element(gap).toBeVisible();
    expect(gap.element().getBoundingClientRect().width).toBe(80);
    expect(gap.element().getBoundingClientRect().right).toBeLessThanOrEqual(
      target.element().getBoundingClientRect().left,
    );
    const bounds = target.element().getBoundingClientRect();
    expect(bounds.height).toBe(40);
    await commands.mouseMove(bounds.right - 1, bounds.top + bounds.height / 2);
    await expect.element(target).toHaveAttribute("data-calcite-sort-position", "after");
    expect(gap.element().getBoundingClientRect().left).toBeGreaterThanOrEqual(
      target.element().getBoundingClientRect().right,
    );
    await commands.mouseUp();

    await expect
      .poll(() => Array.from(destination.element().children, (item) => item.textContent?.trim()))
      .toEqual(["Target", "Copy", "Following"]);
    await expect.element(gap).not.toBeInTheDocument();
  });

  it("reserves RTL copy gaps on the logical insertion side", async () => {
    const { destination, gap, handle, target } = await renderCopyGap("horizontal", "rtl");

    await dragAndDrop(handle.element(), target.element(), "right", { skipPointerUp: true });
    await expect.element(gap).toBeVisible();
    expect(gap.element().getBoundingClientRect().left).toBeGreaterThanOrEqual(
      target.element().getBoundingClientRect().right,
    );
    const bounds = target.element().getBoundingClientRect();
    expect(bounds.height).toBe(40);
    await commands.mouseMove(bounds.left + 1, bounds.top + bounds.height / 2);
    await expect.element(target).toHaveAttribute("data-calcite-sort-position", "after");
    expect(gap.element().getBoundingClientRect().right).toBeLessThanOrEqual(
      target.element().getBoundingClientRect().left,
    );
    await commands.mouseUp();

    await expect
      .poll(() => Array.from(destination.element().children, (item) => item.textContent?.trim()))
      .toEqual(["Target", "Copy", "Following"]);
  });

  it("places grid copy gaps in the cell the copy will occupy", async () => {
    const { destination, gap, handle, target } = await renderCopyGap("grid");
    const container = destination.getBySelector(".container").element() as HTMLElement;
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(2, 80px)";

    await dragAndDrop(handle.element(), target.element(), "bottom", { skipPointerUp: true });
    await expect.element(target).toHaveAttribute("data-calcite-sort-position", "after");
    await expect.element(gap).toBeVisible();
    expect(gap.element().getBoundingClientRect().width).toBeCloseTo(80, 0);
    expect(gap.element().getBoundingClientRect().height).toBeCloseTo(40, 0);
    expect(gap.element().getBoundingClientRect().left).toBeGreaterThanOrEqual(
      target.element().getBoundingClientRect().right,
    );
    expect(gap.element().previousElementSibling).toBe(target.element());
    await commands.mouseUp();

    await expect
      .poll(() => Array.from(destination.element().children, (item) => item.textContent?.trim()))
      .toEqual(["Target", "Copy", "Following"]);
  });

  it("reorders items with pointer input", async () => {
    const { el } = await renderSortableList();
    const list = page.getBySelector("#sortable-list");
    const secondItem = list.getBySelector("#two").element();
    const handle = list.getBySelector("#one calcite-handle").element();
    let trustedPointer = false;
    handle.addEventListener("pointerdown", (event) => (trustedPointer = event.isTrusted), {
      once: true,
    });

    await dragAndDrop(handle, secondItem);
    expect(trustedPointer).toBe(true);
    await vi.waitFor(() => {
      expect(Array.from(el.children, (item) => item.id)).toEqual(["two", "one"]);
    });

    await afterNextFrame();
  });

  async function addPeerItemDuringDrag() {
    const { component: source } = await mount<SortableList>(
      <div>
        <calcite-sortable-list id="source">
          <div id="one">
            <calcite-handle />
            One
          </div>
          <div id="two">
            <calcite-handle />
            Two
          </div>
        </calcite-sortable-list>
        <calcite-sortable-list id="peer">
          <div id="peer-one">
            <calcite-handle />
            Peer one
          </div>
        </calcite-sortable-list>
      </div>,
    );
    onTestFinished(() => commands.mouseUp());
    const peer = page.getBySelector("#peer").element() as SortableList["el"];
    const first = page.getBySelector("#peer-one").element();
    const handle = page.getBySelector("#one calcite-handle");
    await expect.element(handle).toBeVisible();
    const ended = vi.spyOn(source, "onDragEnd");
    await dragAndDrop(handle.element(), page.getBySelector("#two").element(), "bottom", {
      skipPointerUp: true,
    });
    const added = document.createElement("div");
    added.id = "added";
    const addedHandle = document.createElement("calcite-handle");
    added.append(addedHandle, "Added");
    peer.append(added);
    return { source, peer, first, added, addedHandle, ended };
  }

  it("registers unrelated peer items added during a successful drag", async () => {
    const { source, peer, first, added, addedHandle, ended } = await addPeerItemDuringDrag();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.el.children, (item) => item.id)).toEqual(["two", "one"]);
    await expect.element(page.elementLocator(addedHandle)).toBeVisible();
    await afterNextFrame();
    const changed = vi.fn();
    peer.addEventListener("calciteListOrderChange", changed);
    await dragAndDrop(addedHandle, first, "top");
    await vi.waitFor(() => expect(changed).toHaveBeenCalledTimes(1));
    expect(Array.from(peer.children)).toEqual([added, first]);
  });

  it("registers unrelated peer items added during a canceled drag", async () => {
    const { source, peer, first, added, addedHandle, ended } = await addPeerItemDuringDrag();
    await userEvent.keyboard("{Escape}");
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.el.children, (item) => item.id)).toEqual(["one", "two"]);
    await expect.element(page.elementLocator(addedHandle)).toBeVisible();
    await afterNextFrame();
    const changed = vi.fn();
    peer.addEventListener("calciteListOrderChange", changed);
    await dragAndDrop(addedHandle, first, "top");
    await vi.waitFor(() => expect(changed).toHaveBeenCalledTimes(1));
    expect(Array.from(peer.children)).toEqual([added, first]);
  });

  it("allows dragging from any enabled matching handle", async () => {
    const { component } = await mount<SortableList>(
      <calcite-sortable-list id="sortable-list">
        <div id="one">
          <calcite-handle disabled />
          <calcite-handle />
          One
        </div>
        <div id="two">
          <calcite-handle />
          Two
        </div>
      </calcite-sortable-list>,
    );
    const list = page.elementLocator(component.el);
    const disabledHandle = list.getBySelector("#one calcite-handle[disabled]").element();
    const enabledHandle = list.getBySelector("#one calcite-handle:not([disabled])").element();
    const target = list.getBySelector("#two").element();

    await dragAndDrop(disabledHandle, target);
    expect(Array.from(component.el.children, (item) => item.id)).toEqual(["one", "two"]);

    await dragAndDrop(enabledHandle, target);
    await vi.waitFor(() => {
      expect(Array.from(component.el.children, (item) => item.id)).toEqual(["two", "one"]);
    });
  });

  it("skips reorder handling when the before-order event is canceled", async () => {
    const { el } = await renderSortableList();
    const list = page.getBySelector("#sortable-list");
    const secondItem = list.getBySelector("#two").element();
    const handle = list.getBySelector("#one calcite-handle").element();
    let beforeCalledTimes = 0;
    let orderCalledTimes = 0;

    el.addEventListener("calciteListBeforeOrderChange", (event) => {
      beforeCalledTimes++;
      event.preventDefault();
    });
    el.addEventListener("calciteListOrderChange", () => orderCalledTimes++);

    await dragAndDrop(handle, secondItem);
    await vi.waitFor(() => {
      expect(Array.from(el.children, (item) => item.id)).toEqual(["one", "two"]);
    });

    expect(beforeCalledTimes).toBeGreaterThan(0);
    expect(orderCalledTimes).toBe(0);
  });

  it("does not apply horizontal reorder when the before-order event is canceled", async () => {
    const { el } = await mount(
      <calcite-sortable-list layout="horizontal" style="width: 320px">
        <div id="one" style="min-width: 80px; min-height: 40px">
          <calcite-handle />1
        </div>
        <div id="two" style="min-width: 80px; min-height: 40px">
          <calcite-handle />2
        </div>
      </calcite-sortable-list>,
    );
    const list = page.elementLocator(el);
    const firstItem = list.getBySelector("#one").element();
    const secondItem = list.getBySelector("#two").element();
    const handle = list.getBySelector("#one calcite-handle").element();
    let beforeCalledTimes = 0;
    let orderCalledTimes = 0;

    el.addEventListener("calciteListBeforeOrderChange", (event) => {
      beforeCalledTimes++;
      event.preventDefault();
    });
    el.addEventListener("calciteListOrderChange", () => orderCalledTimes++);

    await dragAndDrop(handle, secondItem, "right");

    expect(firstItem.id).toBe("one");
    expect(Array.from(el.children, (item) => item.id)).toEqual(["one", "two"]);
    expect(beforeCalledTimes).toBeGreaterThan(0);
    expect(orderCalledTimes).toBe(0);
  });

  it.each([false, true])(
    "updates draggable state when a handle starts disabled=%s",
    async (disabled) => {
      const { el } = await mount(
        <calcite-sortable-list>
          <div id="one">
            <calcite-handle disabled={disabled} />1
          </div>
          <div id="two">
            <calcite-handle />2
          </div>
        </calcite-sortable-list>,
      );
      const list = page.elementLocator(el);
      const firstHandle = list.getBySelector("#one calcite-handle").element() as Handle["el"];
      const secondItem = list.getBySelector("#two").element();
      let orderCalledTimes = 0;

      el.addEventListener("calciteListOrderChange", () => orderCalledTimes++);
      firstHandle.disabled = true;
      await vi.waitFor(() => expect(firstHandle.disabled).toBe(true));

      await dragAndDrop(firstHandle, secondItem);

      expect(Array.from(el.children, (item) => item.id)).toEqual(["one", "two"]);
      expect(orderCalledTimes).toBe(0);

      firstHandle.disabled = false;
      await vi.waitFor(() => expect(firstHandle.disabled).toBe(false));
      const reordered = new Promise<void>((resolve) =>
        el.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
      );

      await dragAndDrop(firstHandle, secondItem);
      await reordered;

      expect(Array.from(el.children, (item) => item.id)).toEqual(["two", "one"]);
      expect(orderCalledTimes).toBe(1);
    },
  );

  it.each([
    { verticalFirst: true, canceled: true },
    { verticalFirst: false, canceled: true },
    { verticalFirst: true, canceled: false },
    { verticalFirst: false, canceled: false },
  ])(
    "preserves horizontal order events with a shared manager ($verticalFirst, $canceled)",
    async ({ verticalFirst, canceled }) => {
      if (verticalFirst) {
        await renderSortableList();
      }

      const { el } = await mount(
        <calcite-sortable-list layout="horizontal" style="width: 320px">
          <div id="horizontal-one" style="min-width: 80px; min-height: 40px">
            <calcite-handle />1
          </div>
          <div id="horizontal-two" style="min-width: 80px; min-height: 40px">
            <calcite-handle />2
          </div>
        </calcite-sortable-list>,
      );
      if (!verticalFirst) {
        await renderSortableList();
      }

      const list = page.elementLocator(el);
      const handle = list.getBySelector("#horizontal-one calcite-handle").element();
      const target = list.getBySelector("#horizontal-two").element();
      let orderAtBefore: string[] = [];
      let orderCalledTimes = 0;

      el.addEventListener("calciteListBeforeOrderChange", (event) => {
        orderAtBefore = Array.from(el.children)
          .filter((item) => !item.hasAttribute("data-dnd-placeholder"))
          .map((item) => item.id);
        if (canceled) {
          event.preventDefault();
        }
      });
      el.addEventListener("calciteListOrderChange", () => orderCalledTimes++);

      await dragAndDrop(handle, target, "right");

      expect(orderAtBefore).toEqual(["horizontal-one", "horizontal-two"]);
      expect(Array.from(el.children, (item) => item.id)).toEqual(
        canceled ? ["horizontal-one", "horizontal-two"] : ["horizontal-two", "horizontal-one"],
      );
      expect(orderCalledTimes).toBe(canceled ? 0 : 1);
    },
  );

  it.each([false, true])(
    "notifies an accepted move when a later proposal is canceled (transfer=%s)",
    async (transfer) => {
      const { component: source } = await mount<SortableList>(
        <calcite-sortable-list group="letters" id="source">
          <div id="one">
            <calcite-handle />1
          </div>
          <div id="two">
            <calcite-handle />2
          </div>
          <div id="three">
            <calcite-handle />3
          </div>
        </calcite-sortable-list>,
      );
      const { component: destination } = await mount<SortableList>(
        <calcite-sortable-list group="letters" id="destination">
          <div id="four">
            <calcite-handle />4
          </div>
          <div id="five">
            <calcite-handle />5
          </div>
        </calcite-sortable-list>,
      );
      const sourceLocator = page.elementLocator(source.el);
      const destinationLocator = page.elementLocator(destination.el);
      const handle = sourceLocator.getBySelector("#one calcite-handle").element();
      const draggedItem = sourceLocator.getBySelector("#one").element();
      const acceptedList = transfer ? destination : source;
      const acceptedLocator = transfer ? destinationLocator : sourceLocator;
      const acceptedTarget = acceptedLocator.getBySelector(transfer ? "#four" : "#two").element();
      const rejectedTarget = acceptedLocator.getBySelector(transfer ? "#five" : "#three").element();
      const beforeSpy = vi.fn((event: Event) => event.preventDefault());
      const sourceOrderSpy = vi.fn();
      const destinationOrderSpy = vi.fn();
      const dragEndSpy = vi.spyOn(source, "onDragEnd");
      source.el.addEventListener("calciteListOrderChange", sourceOrderSpy);
      destination.el.addEventListener("calciteListOrderChange", destinationOrderSpy);

      await dragAndDrop(handle, acceptedTarget, "bottom", { skipPointerUp: true });
      await vi.waitFor(() => {
        expect(draggedItem.parentElement).toBe(acceptedList.el);
        expect(draggedItem.previousElementSibling).toBe(acceptedTarget);
      });

      acceptedList.el.addEventListener("calciteListBeforeOrderChange", beforeSpy);
      await dragAndDrop(handle, rejectedTarget, "bottom");

      expect(beforeSpy).toHaveBeenCalled();
      expect(Array.from(acceptedList.el.children, (item) => item.id)).toEqual(
        transfer ? ["four", "one", "five"] : ["two", "one", "three"],
      );
      expect(sourceOrderSpy).toHaveBeenCalledTimes(1);
      expect(dragEndSpy).toHaveBeenCalledWith({
        fromEl: source.el,
        toEl: acceptedList.el,
        dragEl: draggedItem,
        oldIndex: 0,
        newIndex: 1,
      });
      expect(destinationOrderSpy).toHaveBeenCalledTimes(transfer ? 1 : 0);
    },
  );

  async function renderCallbackTransfer({ extraTarget = false } = {}) {
    const { component: source } = await mount<SortableList>(
      <calcite-sortable-list group="capacity" id="source">
        <div id="one">
          <calcite-handle />
          One
        </div>
      </calcite-sortable-list>,
    );
    const { component: destination } = await mount<SortableList>(
      <calcite-sortable-list group="capacity" id="destination">
        <div id="two">
          <calcite-handle />
          Two
        </div>
        {extraTarget ? (
          <div id="three">
            <calcite-handle />
            Three
          </div>
        ) : null}
      </calcite-sortable-list>,
    );
    const sourceLocator = page.elementLocator(source.el);
    const destinationLocator = page.elementLocator(destination.el);
    const draggedItem = sourceLocator.getBySelector("#one").element();
    const handle = sourceLocator.getBySelector("#one calcite-handle").element();
    const target = destinationLocator.getBySelector("#two").element();
    return { source, destination, draggedItem, handle, target };
  }

  it("preserves an accepted transfer when it fills the destination capacity", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    destination.canPut = ({ toEl }) => toEl.children.length < 2;
    const sourceChanged = vi.fn();
    const destinationChanged = vi.fn();
    const ended = vi.spyOn(source, "onDragEnd");
    source.el.addEventListener("calciteListOrderChange", sourceChanged);
    destination.el.addEventListener("calciteListOrderChange", destinationChanged);

    await dragAndDrop(handle, target, "top");
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(destination.el.children)).toEqual([draggedItem, target]);
    expect(source.el.children).toHaveLength(0);
    expect(sourceChanged).toHaveBeenCalledTimes(1);
    expect(destinationChanged).toHaveBeenCalledTimes(1);
  });

  it("copies into the last available destination slot", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";
    destination.canPut = ({ toEl }) => toEl.children.length < 2;
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "bottom", { skipPointerUp: true });
    await expect
      .element(page.getBySelector('#destination [data-dnd-placeholder="copy"]'))
      .toBeVisible();
    const bounds = target.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.bottom - 1);
    await afterNextFrame();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(destination.el.children).toHaveLength(2);
    expect(destination.el.firstElementChild).toBe(target);
    expect(destination.el.lastElementChild).not.toBe(draggedItem);
    expect(destination.el.lastElementChild?.textContent).toBe(draggedItem.textContent);
  });

  it("does not copy when destination capacity is full", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer({
      extraTarget: true,
    });
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";
    destination.canPut = ({ toEl }) => toEl.children.length < 2;
    const originalItems = Array.from(destination.el.children);
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top");
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(Array.from(destination.el.children)).toEqual(originalItems);
  });

  it("refreshes copy destination geometry only when removing feedback", async () => {
    const { source, destination, handle, target } = await renderCallbackTransfer();
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top", { skipPointerUp: true });
    const gap = page.getBySelector('#destination [data-dnd-placeholder="copy"]');
    await expect.element(gap).toBeVisible();
    const refreshed = vi.spyOn(Sortable.prototype, "refreshShape");
    onTestFinished(() => refreshed.mockRestore());
    const bounds = destination.el.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.bottom + 80);
    await afterNextFrame();
    await expect.element(gap).not.toBeInTheDocument();
    expect(refreshed).toHaveBeenCalled();
    refreshed.mockClear();

    await commands.mouseMove(bounds.left + bounds.width / 2 + 1, bounds.bottom + 81);
    await commands.mouseMove(bounds.left + bounds.width / 2 + 2, bounds.bottom + 82);
    await afterNextFrame();
    expect(refreshed).not.toHaveBeenCalled();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
  });

  it("preserves an accepted transfer when canPull checks source ownership", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    source.canPull = ({ fromEl, dragEl }) => fromEl.contains(dragEl);
    const sourceChanged = vi.fn();
    const destinationChanged = vi.fn();
    const ended = vi.spyOn(source, "onDragEnd");
    source.el.addEventListener("calciteListOrderChange", sourceChanged);
    destination.el.addEventListener("calciteListOrderChange", destinationChanged);

    await dragAndDrop(handle, target, "top");
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(destination.el.children)).toEqual([draggedItem, target]);
    expect(source.el.children).toHaveLength(0);
    expect(sourceChanged).toHaveBeenCalledTimes(1);
    expect(destinationChanged).toHaveBeenCalledTimes(1);
  });

  it("uses the selected target's clone decision instead of another candidate's move decision", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer({
      extraTarget: true,
    });
    source.canPull = ({ newIndex }) => (newIndex === 0 ? "clone" : true);
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top");
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(destination.el.children).toHaveLength(3);
    const clone = destination.el.firstElementChild;
    expect(clone).not.toBe(draggedItem);
    expect(clone?.textContent).toBe(draggedItem.textContent);
  });

  it("uses the selected target's move decision instead of another candidate's clone decision", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer({
      extraTarget: true,
    });
    source.canPull = ({ newIndex }) => (newIndex === 0 ? true : "clone");
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top");
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(source.el.children).toHaveLength(0);
    expect(destination.el.firstElementChild).toBe(draggedItem);
    expect(destination.el.children).toHaveLength(3);
  });

  it("preserves an accepted clone when canPull checks source ownership", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    source.canPull = ({ fromEl, dragEl }) => (fromEl.contains(dragEl) ? "clone" : false);
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top");
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(destination.el.children).toHaveLength(2);
    const clone = destination.el.firstElementChild;
    expect(clone).not.toBe(draggedItem);
    expect(clone?.textContent).toBe(draggedItem.textContent);
  });

  it("restores a transferred item when released outside the destination", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    onTestFinished(() => commands.mouseUp());
    const changed = vi.fn();
    source.el.addEventListener("calciteListOrderChange", changed);
    destination.el.addEventListener("calciteListOrderChange", changed);
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top", { skipPointerUp: true });
    await vi.waitFor(() => expect(draggedItem.parentElement).toBe(destination.el));
    const bounds = destination.el.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.bottom + 80);
    await afterNextFrame();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(Array.from(destination.el.children)).toEqual([target]);
    expect(changed).not.toHaveBeenCalled();
    expect(ended).toHaveBeenCalledWith(expect.objectContaining({ toEl: source.el, newIndex: 0 }));
  });

  it("restores a transferred item when the final destination rejects it", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    const { component: rejected } = await mount<SortableList>(
      <calcite-sortable-list group="capacity" id="rejected">
        <div id="rejected-target">
          <calcite-handle />
          Rejected
        </div>
      </calcite-sortable-list>,
    );
    onTestFinished(() => commands.mouseUp());
    const vetoed = vi.fn((event: Event) => event.preventDefault());
    rejected.el.addEventListener("calciteListBeforeOrderChange", vetoed);
    const changed = vi.fn();
    source.el.addEventListener("calciteListOrderChange", changed);
    destination.el.addEventListener("calciteListOrderChange", changed);
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top", { skipPointerUp: true });
    await vi.waitFor(() => expect(draggedItem.parentElement).toBe(destination.el));
    const bounds = page.getBySelector("#rejected-target").element().getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + 1);
    await afterNextFrame();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(vetoed).toHaveBeenCalled();
    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(Array.from(destination.el.children)).toEqual([target]);
    expect(changed).not.toHaveBeenCalled();
  });

  it("restores the original order when a reorder is released outside the list", async () => {
    const { component: source } = await mount<SortableList>(
      <calcite-sortable-list id="source">
        <div id="one">
          <calcite-handle />
          One
        </div>
        <div id="two">
          <calcite-handle />
          Two
        </div>
      </calcite-sortable-list>,
    );
    onTestFinished(() => commands.mouseUp());
    const first = page.getBySelector("#one").element();
    const second = page.getBySelector("#two").element();
    const changed = vi.fn();
    source.el.addEventListener("calciteListOrderChange", changed);
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(page.getBySelector("#one calcite-handle").element(), second, "bottom", {
      skipPointerUp: true,
    });
    await vi.waitFor(() =>
      expect(
        Array.from(source.el.children).filter((item) => !item.hasAttribute("data-dnd-placeholder")),
      ).toEqual([second, first]),
    );
    const bounds = source.el.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.bottom + 80);
    await afterNextFrame();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([first, second]);
    expect(changed).not.toHaveBeenCalled();
    expect(ended).toHaveBeenCalledWith(expect.objectContaining({ toEl: source.el, newIndex: 0 }));
  });

  it("does not copy when released outside the destination", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";
    const changed = vi.fn();
    destination.el.addEventListener("calciteListOrderChange", changed);
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top", { skipPointerUp: true });
    await expect
      .element(page.getBySelector("#destination #two"))
      .toHaveAttribute("data-calcite-sort-position", "before");
    const bounds = destination.el.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.bottom + 80);
    await afterNextFrame();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(Array.from(destination.el.children)).toEqual([target]);
    expect(changed).not.toHaveBeenCalled();
    expect(ended).toHaveBeenCalledWith(expect.objectContaining({ toEl: source.el, newIndex: 0 }));
  });

  it("copies after leaving and returning to the destination", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top", { skipPointerUp: true });
    const bounds = destination.el.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.bottom + 80);
    await afterNextFrame();
    const targetBounds = target.getBoundingClientRect();
    await commands.mouseMove(targetBounds.left + targetBounds.width / 2, targetBounds.top + 1);
    await afterNextFrame();
    await expect
      .element(page.getBySelector("#destination #two"))
      .toHaveAttribute("data-calcite-sort-position", "before");
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(destination.el.children).toHaveLength(2);
    expect(destination.el.firstElementChild).not.toBe(draggedItem);
    expect(destination.el.firstElementChild?.textContent).toBe(draggedItem.textContent);
    expect(destination.el.lastElementChild).toBe(target);
  });

  it("resolves a copy drop after the target's preceding sibling is removed", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer({
      extraTarget: true,
    });
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";
    const second = page.getBySelector("#destination #three");
    const secondItem = second.element();
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, secondItem, "top", { skipPointerUp: true });
    const bounds = secondItem.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + 1);
    await afterNextFrame();
    await expect.element(second).toHaveAttribute("data-calcite-sort-position", "before");
    destination.el.style.minBlockSize = `${destination.el.getBoundingClientRect().height}px`;
    target.remove();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    const copiedItem = destination.el.firstElementChild;
    expect(copiedItem).not.toBe(draggedItem);
    expect(copiedItem?.textContent).toBe(draggedItem.textContent);
    expect(destination.el.lastElementChild).toBe(secondItem);
    expect(ended).toHaveBeenCalledWith(
      expect.objectContaining({ toEl: destination.el, newIndex: 0 }),
    );
  });

  it("cancels a copy drop when its target is removed", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";
    const changed = vi.fn();
    destination.el.addEventListener("calciteListOrderChange", changed);
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, target, "top", { skipPointerUp: true });
    await expect
      .element(page.getBySelector("#destination #two"))
      .toHaveAttribute("data-calcite-sort-position", "before");
    target.remove();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(destination.el.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();
    expect(ended).toHaveBeenCalledWith(expect.objectContaining({ toEl: source.el, newIndex: 0 }));
  });

  it("appends a copy after items added to an empty destination during the drag", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";
    target.remove();
    destination.el.style.minBlockSize = "100px";
    await afterNextFrame();
    const ended = vi.spyOn(source, "onDragEnd");

    await dragAndDrop(handle, destination.el, "center", { skipPointerUp: true });
    await expect
      .element(page.getBySelector("#destination"))
      .toHaveAttribute("data-calcite-sort-position", "inside");
    const addedItem = document.createElement("div");
    addedItem.textContent = "Added";
    destination.el.append(addedItem);
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(destination.el.firstElementChild).toBe(addedItem);
    expect(destination.el.lastElementChild?.textContent).toBe(draggedItem.textContent);
    expect(ended).toHaveBeenCalledWith(
      expect.objectContaining({ toEl: destination.el, newIndex: 1 }),
    );
  });

  it.each([false, true])(
    "switches between move and copy destinations (copy first: %s)",
    async (copyFirst) => {
      const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
      source.el.style.minBlockSize = `${draggedItem.getBoundingClientRect().height}px`;
      destination.el.style.minBlockSize = `${target.getBoundingClientRect().height * 2}px`;
      const { component: finalDestination } = await mount<SortableList>(
        <calcite-sortable-list group="capacity">
          <div id="final-target">
            <calcite-handle />
            Final target
          </div>
        </calcite-sortable-list>,
      );
      onTestFinished(() => commands.mouseUp());
      source.canPull = ({ toEl }) =>
        (toEl === destination.el ? copyFirst : !copyFirst) ? "clone" : true;
      const ended = vi.spyOn(source, "onDragEnd");
      await dragAndDrop(handle, target, "top", { skipPointerUp: true });
      expect(draggedItem.parentElement).toBe(copyFirst ? source.el : destination.el);

      const bounds = page.getBySelector("#final-target").element().getBoundingClientRect();
      await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + 1);
      await afterNextFrame();
      expect(draggedItem.parentElement).toBe(copyFirst ? finalDestination.el : source.el);
      await commands.mouseUp();
      await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

      expect(Array.from(destination.el.children)).toEqual([target]);
      expect(finalDestination.el.children).toHaveLength(2);
      expect(draggedItem.parentElement).toBe(copyFirst ? finalDestination.el : source.el);
    },
  );

  it("preserves an accepted clone while reordering within its destination", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    onTestFinished(() => commands.mouseUp());
    source.canPull = ({ fromEl, dragEl }) => (fromEl.contains(dragEl) ? "clone" : true);
    const ended = vi.spyOn(source, "onDragEnd");
    await dragAndDrop(handle, target, "top", { skipPointerUp: true });
    expect(draggedItem.parentElement).toBe(source.el);

    const bounds = target.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.bottom - 1);
    await afterNextFrame();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(destination.el.children).toHaveLength(2);
    const clone = destination.el.lastElementChild;
    expect(clone).not.toBe(draggedItem);
    expect(clone?.textContent).toBe(draggedItem.textContent);
  });

  it("does not copy to an earlier destination when the final proposal is vetoed", async () => {
    const { source, destination, draggedItem, handle, target } = await renderCallbackTransfer();
    const { component: rejected } = await mount<SortableList>(
      <calcite-sortable-list group="capacity" id="rejected">
        <div id="three">
          <calcite-handle />
          Three
        </div>
      </calcite-sortable-list>,
    );
    onTestFinished(() => commands.mouseUp());
    source.canPull = ({ fromEl, dragEl, toEl }) =>
      toEl === rejected.el ? true : fromEl.contains(dragEl) ? "clone" : false;
    const ended = vi.spyOn(source, "onDragEnd");
    await dragAndDrop(handle, target, "top", { skipPointerUp: true });
    expect(draggedItem.parentElement).toBe(source.el);
    const vetoed = vi.fn((event: Event) => event.preventDefault());
    rejected.el.addEventListener("calciteListBeforeOrderChange", vetoed);

    const bounds = page
      .elementLocator(rejected.el)
      .getBySelector("#three")
      .element()
      .getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + 1);
    await afterNextFrame();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(vetoed).toHaveBeenCalled();
    expect(Array.from(source.el.children)).toEqual([draggedItem]);
    expect(Array.from(destination.el.children)).toEqual([target]);
    expect(ended).toHaveBeenCalledWith(expect.objectContaining({ toEl: source.el, newIndex: 0 }));
  });

  it("transfers items with duplicate ids across component lists", async () => {
    const { component: source } = await mount<SortableList>(
      <calcite-sortable-list group="letters" id="duplicate-source">
        <div id="shared-item">
          <calcite-handle />
          Source
        </div>
      </calcite-sortable-list>,
    );
    const { component: destination } = await mount<SortableList>(
      <calcite-sortable-list group="letters" id="duplicate-destination">
        <div id="shared-item">
          <calcite-handle />
          Destination
        </div>
      </calcite-sortable-list>,
    );
    const sourceLocator = page.elementLocator(source.el);
    const destinationLocator = page.elementLocator(destination.el);
    const draggedItem = sourceLocator.getBySelector("#shared-item").element();
    const destinationItem = destinationLocator.getBySelector("#shared-item").element();
    const handle = sourceLocator.getBySelector("#shared-item calcite-handle").element();

    await dragAndDrop(handle, destinationItem, "bottom");

    await vi.waitFor(() => expect(draggedItem.parentElement).toBe(destination.el));
    expect(Array.from(destination.el.children)).toEqual([destinationItem, draggedItem]);
  });

  it("restores the source item when its active destination is removed", async () => {
    const { component: source } = await mount<SortableList>(
      <calcite-sortable-list group="letters" id="removal-source">
        <div id="source-item">
          <calcite-handle />
          Source
        </div>
      </calcite-sortable-list>,
    );
    const { component: destination } = await mount<SortableList>(
      <calcite-sortable-list group="letters" id="removal-destination">
        <div id="destination-item">
          <calcite-handle />
          Destination
        </div>
      </calcite-sortable-list>,
    );
    const sourceLocator = page.elementLocator(source.el);
    const destinationLocator = page.elementLocator(destination.el);
    const draggedItem = sourceLocator.getBySelector("#source-item").element();
    const handle = sourceLocator.getBySelector("#source-item calcite-handle").element();
    const target = destinationLocator.getBySelector("#destination-item").element();
    const sourceOrderChange = vi.fn();
    const destinationOrderChange = vi.fn();
    source.el.addEventListener("calciteListOrderChange", sourceOrderChange);
    destination.el.addEventListener("calciteListOrderChange", destinationOrderChange);

    await dragAndDrop(handle, target, "bottom", {
      moveSteps: 1,
      afterFirstMove: () => destination.el.remove(),
    });

    await vi.waitFor(() => expect(draggedItem.parentElement).toBe(source.el));
    expect(sourceOrderChange).not.toHaveBeenCalled();
    expect(destinationOrderChange).not.toHaveBeenCalled();
  });

  it.each([
    { transfer: false, anchorChange: "none" },
    { transfer: true, anchorChange: "none" },
    { transfer: true, anchorChange: "remove" },
    { transfer: true, anchorChange: "remove-all" },
    { transfer: true, anchorChange: "transfer" },
  ])(
    "restores the original order when Escape cancels an optimistic move ($transfer, $anchorChange)",
    async ({ transfer, anchorChange }) => {
      const { component: source } = await mount<SortableList>(
        <calcite-sortable-list group="letters" id="source">
          <div id="one">
            <calcite-handle />1
          </div>
          <div id="two">
            <calcite-handle />2
          </div>
          <div id="four">
            <calcite-handle />4
          </div>
        </calcite-sortable-list>,
      );
      const { component: destination } = await mount<SortableList>(
        <calcite-sortable-list group="letters" id="destination">
          <div id="three">
            <calcite-handle />3
          </div>
        </calcite-sortable-list>,
      );
      const sourceLocator = page.elementLocator(source.el);
      const destinationLocator = page.elementLocator(destination.el);
      const handle = sourceLocator.getBySelector("#one calcite-handle").element();
      const draggedItem = sourceLocator.getBySelector("#one").element();
      const sibling = sourceLocator.getBySelector("#two").element();
      const remainingSibling = sourceLocator.getBySelector("#four").element();
      const target = transfer
        ? destinationLocator.getBySelector("#three").element()
        : sourceLocator.getBySelector("#two").element();
      const sourceOrderSpy = vi.fn();
      const destinationOrderSpy = vi.fn();
      const dragEndSpy = vi.spyOn(source, "onDragEnd");
      source.el.addEventListener("calciteListOrderChange", sourceOrderSpy);
      destination.el.addEventListener("calciteListOrderChange", destinationOrderSpy);

      await dragAndDrop(handle, target, "bottom", { skipPointerUp: true });
      await vi.waitFor(() =>
        expect(transfer ? draggedItem.parentElement : draggedItem.previousElementSibling).toBe(
          transfer ? destination.el : target,
        ),
      );

      if (anchorChange === "remove" || anchorChange === "remove-all") {
        sibling.remove();
      } else if (anchorChange === "transfer") {
        destination.el.append(sibling);
      }

      if (anchorChange === "remove-all") {
        remainingSibling.remove();
      }

      await userEvent.keyboard("{Escape}");
      await commands.mouseUp();

      await vi.waitFor(() => {
        expect(Array.from(source.el.children, (item) => item.id)).toEqual(
          anchorChange === "none"
            ? ["one", "two", "four"]
            : anchorChange === "remove-all"
              ? ["one"]
              : ["one", "four"],
        );
        expect(Array.from(destination.el.children, (item) => item.id)).toEqual(
          anchorChange === "transfer" ? ["three", "two"] : ["three"],
        );
      });
      expect(draggedItem.parentElement).toBe(source.el);
      expect(sourceOrderSpy).not.toHaveBeenCalled();
      expect(destinationOrderSpy).not.toHaveBeenCalled();
      expect(dragEndSpy).toHaveBeenCalledWith({
        fromEl: source.el,
        toEl: source.el,
        dragEl: draggedItem,
        oldIndex: 0,
        newIndex: 0,
      });

      await vi.waitFor(() =>
        expect(
          source.el
            .getAnimations({ subtree: true })
            .some((animation) => animation.playState === "running"),
        ).toBe(false),
      );

      source.el.style.minBlockSize = `${source.el.getBoundingClientRect().height}px`;
      await dragAndDrop(handle, target, "bottom");

      expect(draggedItem.parentElement).toBe(transfer ? destination.el : source.el);
      expect(sourceOrderSpy).toHaveBeenCalledTimes(1);
      expect(destinationOrderSpy).toHaveBeenCalledTimes(transfer ? 1 : 0);
    },
  );

  it("resets sorting setup when the layout changes", async () => {
    const { el } = await mount(
      <calcite-sortable-list layout="vertical">
        <div id="one">
          <calcite-handle />1
        </div>
        <div id="two">
          <calcite-handle />2
        </div>
      </calcite-sortable-list>,
    );
    const list = el as SortableList;
    const resetSpy = vi.fn();

    (list as unknown as { sortable: { reset: () => void } }).sortable = { reset: resetSpy };
    Object.defineProperty(list, "hasUpdated", { value: true, configurable: true });
    SortableList.prototype.willUpdate.call(
      list,
      new Map([["layout", "vertical"]]) as unknown as Parameters<SortableList["willUpdate"]>[0],
    );

    expect(resetSpy).toHaveBeenCalledTimes(1);
  });

  it("reports the adjusted proposed index for same-list horizontal reorders", async () => {
    const { el } = await mount(
      <calcite-sortable-list layout="horizontal" style="width: 320px">
        <div id="one" style="min-width: 80px; min-height: 40px">
          <calcite-handle />1
        </div>
        <div id="two" style="min-width: 80px; min-height: 40px">
          <calcite-handle />2
        </div>
        <div id="three" style="min-width: 80px; min-height: 40px">
          <calcite-handle />3
        </div>
        <div id="four" style="min-width: 80px; min-height: 40px">
          <calcite-handle />4
        </div>
      </calcite-sortable-list>,
    );
    const list = page.elementLocator(el);
    const draggedHandle = list.getBySelector("#two calcite-handle").element();
    const targetItem = list.getBySelector("#three").element();
    const beforeOrderIndexes: number[] = [];
    let itemOrderAtBefore: string[] = [];
    const beforeOrderChange = new Promise<void>((resolve) =>
      el.addEventListener("calciteListBeforeOrderChange", (event) => {
        beforeOrderIndexes.push((event as CustomEvent<{ newIndex: number }>).detail.newIndex);
        itemOrderAtBefore = Array.from(el.children)
          .filter((item) => !item.hasAttribute("data-dnd-placeholder"))
          .map((item) => item.id);
        resolve();
      }),
    );

    await dragAndDrop(draggedHandle, targetItem, "right");
    await beforeOrderChange;

    await vi.waitFor(() => {
      expect(beforeOrderIndexes[beforeOrderIndexes.length - 1]).toBe(2);
    });
    expect(itemOrderAtBefore).toEqual(["one", "two", "three", "four"]);
    expect(Array.from(el.children, (item) => item.id)).toEqual(["one", "three", "two", "four"]);
  });

  it("honors cancellation when a handle nudges item order", async () => {
    const { el } = await renderSortableList();
    const handles = page.getByRole("radio");
    let beforeOrderDetail: { oldIndex: number; newIndex: number } | undefined;
    let orderCalledTimes = 0;

    el.addEventListener("calciteListBeforeOrderChange", (event) => {
      beforeOrderDetail = (event as CustomEvent<{ oldIndex: number; newIndex: number }>).detail;
      event.preventDefault();
    });
    el.addEventListener("calciteListOrderChange", () => orderCalledTimes++);

    await userEvent.click(handles.nth(1));
    await userEvent.keyboard("{Space}{ArrowUp}");

    expect(Array.from(el.children, (item) => item.id)).toEqual(["one", "two"]);
    expect(beforeOrderDetail?.oldIndex).toBe(1);
    expect(beforeOrderDetail?.newIndex).toBe(0);
    expect(orderCalledTimes).toBe(0);
  });

  it("emits order change after a successful handle nudge", async () => {
    const { el } = await renderSortableList();
    const handles = page.getByRole("radio");
    const callSequence: string[] = [];
    let beforeOrderDetail: { oldIndex: number; newIndex: number } | undefined;
    let firstItemWhenOrdered = "";

    el.addEventListener("calciteListBeforeOrderChange", (event) => {
      callSequence.push("before");
      beforeOrderDetail = (event as CustomEvent<{ oldIndex: number; newIndex: number }>).detail;
    });
    el.addEventListener("calciteListOrderChange", () => {
      callSequence.push("order");
      firstItemWhenOrdered = (el.firstElementChild as HTMLElement).id;
    });

    await userEvent.click(handles.nth(1));
    await userEvent.keyboard("{Space}{ArrowUp}");

    expect(Array.from(el.children, (item) => item.id)).toEqual(["two", "one"]);
    expect(beforeOrderDetail?.oldIndex).toBe(1);
    expect(beforeOrderDetail?.newIndex).toBe(0);
    expect(callSequence).toEqual(["before", "order"]);
    expect(firstItemWhenOrdered).toBe("two");
  });

  it("uses filtered indices for handle nudges", async () => {
    const { component } = await mount<SortableList>(
      <calcite-sortable-list drag-selector=".sortable" id="sortable-list">
        <div class="sortable" id="one">
          <calcite-handle />1
        </div>
        <div id="ignored">
          <calcite-handle />
          Ignored
        </div>
        <div class="sortable" id="two">
          <calcite-handle />2
        </div>
      </calcite-sortable-list>,
    );
    const handles = page.getByRole("radio");
    const callSequence: string[] = [];
    const beforeOrderDetails: Array<{ oldIndex: number; newIndex: number }> = [];
    component.el.addEventListener("calciteListBeforeOrderChange", (event) => {
      const { oldIndex, newIndex } = (event as CustomEvent<{ oldIndex: number; newIndex: number }>)
        .detail;
      beforeOrderDetails.push({ oldIndex, newIndex });
      callSequence.push("before");
    });
    component.el.addEventListener("calciteListOrderChange", () => callSequence.push("order"));

    await userEvent.click(handles.nth(0));
    await userEvent.keyboard("{Space}{ArrowDown}");

    expect(beforeOrderDetails).toEqual([{ oldIndex: 0, newIndex: 1 }]);
    expect(callSequence).toEqual(["before", "order"]);
    expect(
      Array.from(component.el.children)
        .filter((item) => item.classList.contains("sortable"))
        .map((item) => item.id),
    ).toEqual(["two", "one"]);

    await userEvent.click(handles.nth(0));
    await userEvent.keyboard("{Space}{ArrowDown}");

    expect(beforeOrderDetails).toEqual([{ oldIndex: 0, newIndex: 1 }]);
    expect(callSequence).toEqual(["before", "order"]);
  });

  it("appends drops on populated and empty component containers", async () => {
    onTestFinished(() => commands.mouseUp());
    const { el: source } = await mount(
      <div>
        <calcite-sortable-list group="letters" id="source">
          <div id="one" style="min-width: 80px; min-height: 40px">
            <calcite-handle />1
          </div>
          <div id="two" style="min-width: 80px; min-height: 40px">
            <calcite-handle />2
          </div>
        </calcite-sortable-list>
        <calcite-sortable-list
          group="letters"
          id="populated"
          style="min-height: 160px; width: 200px"
        >
          <div id="existing" style="min-width: 80px; min-height: 40px">
            <calcite-handle />
            Existing
          </div>
        </calcite-sortable-list>
        <calcite-sortable-list group="letters" id="empty" style="min-height: 160px; width: 200px" />
      </div>,
    );
    const sourceLocator = page.elementLocator(source);
    const populated = page.getBySelector("#populated").element();
    const empty = page.getBySelector("#empty").element();
    const secondItem = sourceLocator.getBySelector("#two").element();
    const secondHandle = sourceLocator.getBySelector("#two calcite-handle").element();
    const populatedItems = page.getBySelector("#populated > div");
    const populatedOrderChange = new Promise<void>((resolve) =>
      populated.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(
      sourceLocator.getBySelector("#one calcite-handle").element(),
      populated,
      "center",
    );
    await populatedOrderChange;

    expect(populatedItems.nth(0).element().id).toBe("existing");
    expect(populatedItems.nth(1).element().id).toBe("one");

    const emptyOrderChange = new Promise<void>((resolve) =>
      empty.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(secondHandle, empty, "center", { skipPointerUp: true });
    await expect
      .element(page.elementLocator(empty))
      .toHaveAttribute("data-calcite-sort-position", "inside");
    expect(getComputedStyle(empty, "::after").borderStyle).toBe("dashed");
    await commands.mouseUp();
    await emptyOrderChange;

    expect(secondItem.parentElement).toBe(empty);
  });

  it("accepts a drop after its final item is transferred out", async () => {
    const { el: source } = await mount(
      <div>
        <calcite-sortable-list group="letters" id="source">
          <div id="source-item">
            <calcite-handle />
            Source
          </div>
        </calcite-sortable-list>
        <calcite-sortable-list
          group="letters"
          id="destination"
          style="min-height: 160px; width: 200px"
        >
          <div id="last-item">
            <calcite-handle />
            Last item
          </div>
        </calcite-sortable-list>
      </div>,
    );
    const sourceLocator = page.elementLocator(source);
    const destination = page.getBySelector("#destination").element();
    const lastItem = page.getBySelector("#last-item").element();
    const lastItemHandle = page.getBySelector("#last-item calcite-handle").element();
    const sourceItem = sourceLocator.getBySelector("#source-item").element();
    const sourceHandle = sourceLocator.getBySelector("#source-item calcite-handle").element();
    const refilled = new Promise<void>((resolve) =>
      destination.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(lastItemHandle, source, "bottom");
    await vi.waitFor(() => expect(destination.children.length).toBe(0));
    expect(destination.children.length).toBe(0);
    expect(lastItem.parentElement).toBe(source);
    await afterNextTask();

    await dragAndDrop(sourceHandle, destination, "center");
    await refilled;

    expect(sourceItem.parentElement).toBe(destination);
  });

  it("cancels an active drag when its source component disconnects", async () => {
    const { el: source } = await mount(
      <div>
        <calcite-sortable-list group="letters" id="source">
          <div id="source-item">
            <calcite-handle />
            Source
          </div>
        </calcite-sortable-list>
        <calcite-sortable-list group="letters" id="remaining">
          <div id="remaining-one">
            <calcite-handle />
            One
          </div>
          <div id="remaining-two">
            <calcite-handle />
            Two
          </div>
        </calcite-sortable-list>
      </div>,
    );
    const sourceHandle = page.getBySelector("#source-item calcite-handle").element();
    const remaining = page.getBySelector("#remaining").element();
    const remainingOneHandle = page.getBySelector("#remaining-one calcite-handle").element();
    const remainingTwo = page.getBySelector("#remaining-two").element();

    await dragAndDrop(sourceHandle, remainingTwo, "bottom", {
      afterFirstMove: () => source.remove(),
      skipPointerUp: true,
    });
    expect(source.isConnected).toBe(false);
    await commands.mouseUp();

    const reordered = new Promise<void>((resolve) =>
      remaining.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );
    await dragAndDrop(remainingOneHandle, remainingTwo, "bottom");
    await reordered;

    expect(remaining.firstElementChild).toBe(remainingTwo);
  });

  it("uses clone behavior only for the final destination", async () => {
    const { el: sourceListElement } = await mount(
      <div>
        <calcite-sortable-list group="letters" id="clone-source">
          <div id="clone-source-item">
            <calcite-handle />
            Source
          </div>
        </calcite-sortable-list>
        <calcite-sortable-list group="letters" id="clone-candidate" />
        <calcite-sortable-list group="letters" id="move-destination">
          <div id="move-target">
            <calcite-handle />
            Target
          </div>
        </calcite-sortable-list>
      </div>,
    );
    const sourceList = sourceListElement as SortableList["el"];
    const cloneCandidate = page.getBySelector("#clone-candidate").element();
    const destination = page.getBySelector("#move-destination").element();
    const sourceHandle = page.getBySelector("#clone-source-item calcite-handle").element();
    const target = page.getBySelector("#move-target").element();
    let cloneCandidateEvaluations = 0;

    sourceList.canPull = ({ toEl }) => {
      if (toEl === cloneCandidate) {
        cloneCandidateEvaluations++;
        return "clone";
      }

      return true;
    };

    const dragEnd = new Promise<void>((resolve) =>
      destination.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );
    await dragAndDrop(sourceHandle, target, "bottom");
    await dragEnd;

    expect(cloneCandidateEvaluations).toBeGreaterThan(0);
    expect(cloneCandidate.children.length).toBe(0);
    expect(page.getBySelector("#move-destination > div").nth(1).element().id).toBe(
      "clone-source-item",
    );
  });

  it("fires drag end after cloning native inputs and both order-change events", async () => {
    const { component: source } = await mount<SortableList>(
      <calcite-sortable-list group="letters" id="clone-source">
        <div id="clone-source-item">
          <calcite-handle />
          <input type="text" />
          <input type="number" />
          <input type="checkbox" />
          <input type="file" />
          Source
        </div>
      </calcite-sortable-list>,
    );
    const { component: destination } = await mount<SortableList>(
      <calcite-sortable-list group="letters" id="clone-destination">
        <div id="destination-item">
          <calcite-handle />
          Destination
        </div>
      </calcite-sortable-list>,
    );
    const sourceLocator = page.elementLocator(source.el);
    const destinationLocator = page.elementLocator(destination.el);
    const draggedItem = sourceLocator.getBySelector("#clone-source-item").element();
    const handle = sourceLocator.getBySelector("#clone-source-item calcite-handle").element();
    const target = destinationLocator.getBySelector("#destination-item").element();
    onTestFinished(() => commands.mouseUp());
    const callbackOrder: string[] = [];
    source.canPull = () => "clone";
    draggedItem.querySelector<HTMLInputElement>('input[type="text"]')!.value = "Updated text";
    draggedItem.querySelector<HTMLInputElement>('input[type="number"]')!.value = "42";
    draggedItem.querySelector<HTMLInputElement>('input[type="checkbox"]')!.checked = true;
    const transfer = new DataTransfer();
    transfer.items.add(new File(["Contents"], "example.txt", { type: "text/plain" }));
    draggedItem.querySelector<HTMLInputElement>('input[type="file"]')!.files = transfer.files;
    (handle as Handle["el"]).label = "Updated handle";

    source.el.addEventListener("calciteListOrderChange", () => callbackOrder.push("source-sort"));
    destination.el.addEventListener("calciteListOrderChange", () =>
      callbackOrder.push("destination-sort"),
    );
    const originalDragEnd = source.onDragEnd.bind(source);
    vi.spyOn(source, "onDragEnd").mockImplementation(() => {
      callbackOrder.push("drag-end");
      expect(draggedItem.parentElement).toBe(source.el);
      expect(destination.el.children).toHaveLength(2);
      originalDragEnd();
    });

    await dragAndDrop(handle, target, "bottom", { skipPointerUp: true });
    const bounds = target.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.bottom - 1);
    await afterNextFrame();
    await commands.mouseUp();

    await vi.waitFor(() => {
      expect(callbackOrder).toEqual(["source-sort", "destination-sort", "drag-end"]);
    });
    const clone = destination.el.lastElementChild!;
    expect(clone.querySelector<HTMLInputElement>('input[type="text"]')!.value).toBe("Updated text");
    expect(clone.querySelector<HTMLInputElement>('input[type="number"]')!.value).toBe("42");
    expect(clone.querySelector<HTMLInputElement>('input[type="checkbox"]')!.checked).toBe(true);
    expect(clone.querySelector<HTMLInputElement>('input[type="file"]')!.files![0].name).toBe(
      "example.txt",
    );
    expect(clone.querySelector<Handle["el"]>("calcite-handle")!.label).toBe("Updated handle");
  });

  it("fires before and order-change around the reorder mutation", async () => {
    const { el } = await renderSortableList();
    const list = page.getBySelector("#sortable-list");
    const secondItem = list.getBySelector("#two").element();
    const handle = list.getBySelector("#one calcite-handle").element();
    const callSequence: string[] = [];
    let firstItemWhenOrdered: Element | null = null;

    el.addEventListener("calciteListBeforeOrderChange", () => callSequence.push("before"));
    el.addEventListener("calciteListOrderChange", () => {
      callSequence.push("order");
      firstItemWhenOrdered = el.firstElementChild;
    });

    await dragAndDrop(handle, secondItem);
    await vi.waitFor(() => {
      expect(Array.from(el.children, (item) => item.id)).toEqual(["two", "one"]);
    });

    expect(callSequence).toEqual(["before", "order"]);
    expect(firstItemWhenOrdered).toBe(secondItem);
  });

  it("reaches the destination with a custom move step count", async () => {
    const { el: source } = await mount(
      <div>
        <calcite-sortable-list group="letters">
          <div id="one">
            <calcite-handle />
            One
          </div>
        </calcite-sortable-list>
        <calcite-sortable-list group="letters" style="margin-block-start: 300px">
          <div id="two">
            <calcite-handle />
            Two
          </div>
        </calcite-sortable-list>
      </div>,
    );
    const sourceLocator = page.elementLocator(source);
    const firstItem = sourceLocator.getBySelector("#one").element();
    const firstHandle = sourceLocator.getBySelector("#one calcite-handle").element();
    const secondItem = page.getBySelector("#two").element();
    const destination = page.getBySelector("calcite-sortable-list").nth(1).element();

    await dragAndDrop(firstHandle, secondItem, "bottom", { moveSteps: 2 });
    await vi.waitFor(() => expect(firstItem.parentElement).toBe(destination));

    expect(firstItem.parentElement).toBe(destination);
  });

  it.each(["left", "right"] as const)(
    "supports %s-side transfers between lists in the same group",
    async (position) => {
      const { component: firstList } = await mount<SortableList>(
        <calcite-sortable-list group="letters" id="first" layout="horizontal">
          <div id="a" style="min-width: 80px; min-height: 40px">
            <calcite-handle />A
          </div>
          <div id="b" style="min-width: 80px; min-height: 40px">
            <calcite-handle />B
          </div>
        </calcite-sortable-list>,
      );
      const { component: secondList } = await mount<SortableList>(
        <calcite-sortable-list group="letters" id="second" layout="horizontal">
          <div id="c" style="min-width: 80px; min-height: 40px">
            <calcite-handle />C
          </div>
          <div id="d" style="min-width: 80px; min-height: 40px">
            <calcite-handle />D
          </div>
        </calcite-sortable-list>,
      );
      const draggedHandle = page
        .elementLocator(secondList.el)
        .getBySelector("#d calcite-handle")
        .element();
      const destinationItem = page.elementLocator(firstList.el).getBySelector("#b").element();
      let canPullNewIndex: number | undefined;
      let canPutNewIndex: number | undefined;
      let beforeOrderNewIndex: number | undefined;
      let permissionIndexesAtBefore: (number | undefined)[] = [];

      secondList.canPull = ({ newIndex }) => {
        canPullNewIndex = newIndex;
        return true;
      };
      firstList.canPut = ({ newIndex }) => {
        canPutNewIndex = newIndex;
        return true;
      };
      firstList.el.addEventListener("calciteListBeforeOrderChange", (event) => {
        beforeOrderNewIndex = (event as CustomEvent<{ newIndex: number }>).detail.newIndex;
        permissionIndexesAtBefore = [canPullNewIndex, canPutNewIndex];
      });

      await dragAndDrop(draggedHandle, destinationItem, position);

      await vi.waitFor(() => {
        expect(Array.from(firstList.el.children, (item) => item.id)).toEqual(
          position === "left" ? ["a", "d", "b"] : ["a", "b", "d"],
        );
        expect(Array.from(secondList.el.children, (item) => item.id)).toEqual(["c"]);
      });

      const newIndex = position === "left" ? 1 : 2;
      expect(permissionIndexesAtBefore).toEqual([newIndex, newIndex]);
      expect(beforeOrderNewIndex).toBe(newIndex);
    },
  );

  it("rebuilds item registrations after a vertical transfer", async () => {
    const { el: firstList } = await mount(
      <calcite-sortable-list group="letters" id="first">
        <div id="a">
          <calcite-handle />A
        </div>
        <div id="b">
          <calcite-handle />B
        </div>
      </calcite-sortable-list>,
    );
    const { el: secondList } = await mount(
      <calcite-sortable-list group="letters" id="second">
        <div id="c">
          <calcite-handle />C
        </div>
        <div id="d">
          <calcite-handle />D
        </div>
      </calcite-sortable-list>,
    );
    const firstListLocator = page.elementLocator(firstList);
    const secondListLocator = page.elementLocator(secondList);
    const draggedItem = secondListLocator.getBySelector("#d").element();
    const draggedHandle = secondListLocator.getBySelector("#d calcite-handle").element();
    const firstTransferTarget = firstListLocator.getBySelector("#b").element();
    let firstListOrderChangeCount = 0;
    let secondListOrderChangeCount = 0;

    firstList.addEventListener("calciteListOrderChange", () => firstListOrderChangeCount++);
    secondList.addEventListener("calciteListOrderChange", () => secondListOrderChangeCount++);

    const firstTransferFrom = new Promise<void>((resolve) =>
      secondList.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );
    const firstTransferTo = new Promise<void>((resolve) =>
      firstList.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(draggedHandle, firstTransferTarget, "bottom");
    await Promise.all([firstTransferFrom, firstTransferTo]);

    expect(draggedItem.parentElement).toBe(firstList);

    const secondReorder = new Promise<void>((resolve) =>
      firstList.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(draggedHandle, firstListLocator.getBySelector("#a").element(), "top");
    await secondReorder;

    expect(firstListOrderChangeCount).toBe(2);
    expect(secondListOrderChangeCount).toBe(1);
    expect(firstListLocator.getBySelector("div").first().element().id).toBe("d");
  });

  async function renderSelectorMembership() {
    const { component } = await mount<SortableList>(
      <calcite-sortable-list drag-selector=".sortable">
        <div class="sortable" id="one">
          <calcite-handle />
          One
        </div>
        <div id="two">
          <calcite-handle />
          Two
        </div>
        <div class="sortable" id="three">
          <calcite-handle />
          Three
        </div>
      </calcite-sortable-list>,
    );
    const list = page.elementLocator(component.el);
    const first = list.getBySelector("#one").element();
    const second = list.getBySelector("#two").element();
    const third = list.getBySelector("#three").element();
    return { component, list, first, second, third };
  }

  it("registers an existing item when its class starts matching dragSelector", async () => {
    const { component, list, first, second, third } = await renderSelectorMembership();
    second.classList.add("sortable");
    await afterNextFrame();
    const changed = vi.fn();
    component.el.addEventListener("calciteListOrderChange", changed);

    await dragAndDrop(list.getBySelector("#two calcite-handle").element(), first, "top");

    await vi.waitFor(() => expect(changed).toHaveBeenCalledTimes(1));
    expect(Array.from(component.el.children)).toEqual([second, first, third]);
  });

  it("unregisters an existing item when its class stops matching dragSelector", async () => {
    const { component, list, first, second, third } = await renderSelectorMembership();
    first.classList.remove("sortable");
    await afterNextFrame();
    const changed = vi.fn();
    component.el.addEventListener("calciteListOrderChange", changed);

    await dragAndDrop(list.getBySelector("#one calcite-handle").element(), third, "bottom");
    await afterNextFrame();

    expect(changed).not.toHaveBeenCalled();
    expect(Array.from(component.el.children)).toEqual([first, second, third]);
  });

  it("only reorders items matching dragSelector", async () => {
    const { el } = await mount(
      <calcite-sortable-list drag-selector=".sortable">
        <div class="sortable" id="one">
          <calcite-handle />1
        </div>
        <div id="ignored">ignored</div>
        <div class="sortable" id="two">
          <calcite-handle />2
        </div>
      </calcite-sortable-list>,
    );
    const list = page.getBySelector("calcite-sortable-list");
    const secondItem = list.getBySelector("#two").element();
    const handle = list.getBySelector("#one calcite-handle").element();

    await dragAndDrop(handle, secondItem, "bottom");
    await vi.waitFor(() => {
      expect(Array.from(el.children, (item) => item.id)).toEqual(["ignored", "two", "one"]);
    });
  });
});
