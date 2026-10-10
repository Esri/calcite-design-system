import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { dragAndDrop } from "../../tests/utils/browser";
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
      <calcite-sortable-list>
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
    const firstItem = el.querySelector<HTMLElement>("#one")!;
    const secondItem = el.querySelector<HTMLElement>("#two")!;
    const handle = firstItem.querySelector("calcite-handle")!;

    await dragAndDrop(handle, secondItem);
    await vi.waitFor(() => {
      expect(Array.from(el.children, (item) => item.id)).toEqual(["two", "one"]);
    });

    await afterNextFrame();
  });

  it("skips reorder handling when the before-order event is canceled", async () => {
    const { el } = await renderSortableList();
    const firstItem = el.querySelector<HTMLElement>("#one")!;
    const secondItem = el.querySelector<HTMLElement>("#two")!;
    const handle = firstItem.querySelector("calcite-handle")!;
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

  it("updates draggable state when a sortable-list handle is disabled dynamically", async () => {
    const { el } = await mount(
      <calcite-sortable-list>
        <div id="one">
          <calcite-handle />1
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
  });

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

    (list as SortableList & { sortable: { reset: () => void } }).sortable = { reset: resetSpy };
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
        itemOrderAtBefore = Array.from(el.children, (item) => item.id);
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

  it("fires before and order-change around the reorder mutation", async () => {
    const { el } = await renderSortableList();
    const firstItem = el.querySelector<HTMLElement>("#one")!;
    const secondItem = el.querySelector<HTMLElement>("#two")!;
    const handle = firstItem.querySelector("calcite-handle")!;
    const callSequence: string[] = [];
    let orderFirstId = "";

    el.addEventListener("calciteListBeforeOrderChange", () => callSequence.push("before"));
    el.addEventListener("calciteListOrderChange", () => {
      callSequence.push("order");
      orderFirstId = el.querySelector("div")?.id ?? "";
    });

    await dragAndDrop(handle, secondItem);
    await vi.waitFor(() => {
      expect(Array.from(el.children, (item) => item.id)).toEqual(["two", "one"]);
    });

    expect(callSequence).toEqual(["before", "order"]);
    expect(orderFirstId).toBe("two");
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

  it("supports horizontal transfers between lists in the same group", async () => {
    const { el: firstListElement } = await mount(
      <calcite-sortable-list group="letters" id="first" layout="horizontal">
        <div id="a" style="min-width: 80px; min-height: 40px">
          <calcite-handle />A
        </div>
        <div id="b" style="min-width: 80px; min-height: 40px">
          <calcite-handle />B
        </div>
      </calcite-sortable-list>,
    );
    const firstList = firstListElement as SortableList["el"];
    const { el: secondListElement } = await mount(
      <calcite-sortable-list group="letters" id="second" layout="horizontal">
        <div id="c" style="min-width: 80px; min-height: 40px">
          <calcite-handle />C
        </div>
        <div id="d" style="min-width: 80px; min-height: 40px">
          <calcite-handle />D
        </div>
      </calcite-sortable-list>,
    );
    const secondList = secondListElement as SortableList["el"];
    const draggedHandle = secondList.querySelector<HTMLElement>("#d calcite-handle")!;
    const destinationItem = firstList.querySelector<HTMLElement>("#b")!;
    let canPullNewIndex: number | undefined;
    let canPutNewIndex: number | undefined;
    let beforeOrderNewIndex: number | undefined;

    secondList.canPull = ({ newIndex }) => {
      canPullNewIndex = newIndex;
      return true;
    };
    firstList.canPut = ({ newIndex }) => {
      canPutNewIndex = newIndex;
      return true;
    };
    firstList.addEventListener("calciteListBeforeOrderChange", (event) => {
      beforeOrderNewIndex = (event as CustomEvent<{ newIndex: number }>).detail.newIndex;
    });

    await dragAndDrop(draggedHandle, destinationItem, "right");

    await vi.waitFor(() => {
      expect(Array.from(firstList.children, (item) => item.id)).toEqual(["a", "b", "d"]);
      expect(Array.from(secondList.children, (item) => item.id)).toEqual(["c"]);
    });

    expect(canPullNewIndex).toBe(2);
    expect(canPutNewIndex).toBe(2);
    expect(beforeOrderNewIndex).toBe(2);
  });

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
    const firstItem = el.querySelector<HTMLElement>("#one")!;
    const secondItem = el.querySelector<HTMLElement>("#two")!;
    const handle = firstItem.querySelector<HTMLElement>("calcite-handle")!;

    await dragAndDrop(handle, secondItem, "bottom");
    await vi.waitFor(() => {
      expect(Array.from(el.children, (item) => item.id)).toEqual(["ignored", "two", "one"]);
    });
  });
});
