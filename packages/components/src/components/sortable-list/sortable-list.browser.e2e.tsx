import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { dragAndDrop } from "../../tests/utils/browser";
import { afterNextFrame } from "../../tests/utils/timing";
import { hidden, renders, disabled, accessible } from "../../tests/common";

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

  it("supports horizontal transfers between lists in the same group", async () => {
    const { el: firstList } = await mount(
      <calcite-sortable-list group="letters" id="first" layout="horizontal">
        <div id="a" style="min-width: 80px; min-height: 40px">
          <calcite-handle />A
        </div>
        <div id="b" style="min-width: 80px; min-height: 40px">
          <calcite-handle />B
        </div>
      </calcite-sortable-list>,
    );
    const { el: secondList } = await mount(
      <calcite-sortable-list group="letters" id="second" layout="horizontal">
        <div id="c" style="min-width: 80px; min-height: 40px">
          <calcite-handle />C
        </div>
        <div id="d" style="min-width: 80px; min-height: 40px">
          <calcite-handle />D
        </div>
      </calcite-sortable-list>,
    );
    const draggedHandle = secondList.querySelector<HTMLElement>("#d calcite-handle")!;
    const destinationItem = firstList.querySelector<HTMLElement>("#b")!;

    await dragAndDrop(draggedHandle, destinationItem, "right");

    await vi.waitFor(() => {
      expect(Array.from(firstList.children, (item) => item.id)).toEqual(["a", "b", "d"]);
      expect(Array.from(secondList.children, (item) => item.id)).toEqual(["c"]);
    });
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
