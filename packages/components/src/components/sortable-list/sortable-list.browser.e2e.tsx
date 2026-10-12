import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
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
      "bottom",
    );
    await populatedOrderChange;

    expect(populatedItems.nth(0).element().id).toBe("existing");
    expect(populatedItems.nth(1).element().id).toBe("one");

    const emptyOrderChange = new Promise<void>((resolve) =>
      empty.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(secondHandle, empty, "bottom");
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

  it("fires drag end after clone finalization and both order-change events", async () => {
    const { component: source } = await mount<SortableList>(
      <calcite-sortable-list group="letters" id="clone-source">
        <div id="clone-source-item">
          <calcite-handle />
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
    const callbackOrder: string[] = [];
    source.canPull = () => "clone";

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

    await dragAndDrop(handle, target, "bottom");

    await vi.waitFor(() => {
      expect(callbackOrder).toEqual(["source-sort", "destination-sort", "drag-end"]);
    });
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
