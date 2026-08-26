import { Fragment, h, JsxNode } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, it, expect, vi } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import {
  accessible,
  cancelable,
  defaults,
  reflects,
  hidden,
  renders,
  disabled,
  focusable,
} from "../../tests/commonTests/browser";
import { Locator, page, userEvent } from "vitest/browser";
import { TemplateResult } from "lit";
import { DEBOUNCE } from "../../utils/resources";
import type { Block } from "../block/block";
import type { Reorder } from "../sort-handle/types";
import { IDS as sortHandleIDs } from "../sort-handle/resources";
import type { BlockGroup } from "./block-group";
import type { DropdownItem } from "../dropdown-item/dropdown-item";

mockConsole();

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-block-group>
        <calcite-block collapsible description="description" heading="heading" open>
          <div>content</div>
        </calcite-block>
      </calcite-block-group>,
    ),
  );
});

describe("cancelable", () => {
  cancelable("calcite-block-group");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-block-group"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "dragEnabled",
        defaultValue: false,
      },
      {
        propertyName: "expandMode",
        defaultValue: "multiple",
      },
      {
        propertyName: "group",
        defaultValue: undefined,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "sortDisabled",
        defaultValue: false,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-block-group"),
    [
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "dragEnabled",
        value: true,
      },
      {
        propertyName: "expandMode",
        value: "multiple",
      },
      {
        propertyName: "group",
        value: "test",
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "sortDisabled",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-block-group"));
});

describe("renders", () => {
  renders(() => mount(<calcite-block-group>content</calcite-block-group>), { display: "block" });
});

function renderBlock(): JsxNode {
  return (
    <calcite-block collapsible description="description" heading="heading" open>
      <div>content</div>
    </calcite-block>
  );
}

describe("is focusable", () => {
  focusable(() => mount(<calcite-block-group>{renderBlock()}</calcite-block-group>), {
    focusTargetSelector: "calcite-block",
  });
});

describe("disabled", () => {
  disabled(() => mount(<calcite-block-group>{renderBlock()}</calcite-block-group>), {
    focusTarget: "child",
  });
});

describe("expandMode", () => {
  const nestedBlockHTML = (expandMode: BlockGroup["expandMode"]): TemplateResult => {
    return (
      <calcite-block-group expandMode={expandMode}>
        <calcite-block collapsible heading="Asia">
          <calcite-block collapsible heading="Himalayas" slot="children" />
          <calcite-block collapsible heading="Karakoram" slot="children" />
        </calcite-block>
        <calcite-block collapsible heading="Africa" />
      </calcite-block-group>
    );
  };

  const nestedBlockGroupHTML = (expandMode: BlockGroup["expandMode"]): TemplateResult => {
    return (
      <calcite-block-group expandMode={expandMode} label="Water Layers">
        <calcite-block-group label="Rivers">
          <calcite-block collapsible heading="Rivers" />
          <calcite-block collapsible heading="Gauging Stations" />
        </calcite-block-group>
        <calcite-block-group expandMode={expandMode} label="Lakes & Ponds">
          <calcite-block collapsible heading="Lakes" />
          <calcite-block collapsible heading="Ponds" />
        </calcite-block-group>
      </calcite-block-group>
    );
  };

  it("should allow only one block element to expand or collapse when expandMode is single", async () => {
    await mount(nestedBlockHTML("single"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");
    const nestedBlockElements = page.getBySelector("calcite-block[slot='children']");

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(nestedBlockElements.nth(0));
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(nestedBlockElements.nth(1));
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(1)).toHaveProperty("expanded", true);
  });

  it("should allow only one block element to expand or collapse in same block-group when expandMode is single", async () => {
    await mount(nestedBlockGroupHTML("single"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(2));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(3));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(3)).toHaveProperty("expanded", true);
  });

  it("should allow only one block element to expand and disallow collapsing when expandMode is single-persist", async () => {
    await mount(nestedBlockHTML("single-persist"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");
    const nestedBlockElements = page.getBySelector("calcite-block[slot='children']");

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(nestedBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);

    await userEvent.click(nestedBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(1)).toHaveProperty("expanded", true);
  });

  it("should allow only one block element in same block-group to expand and disallow collapsing when expandMode is single-persist", async () => {
    await mount(nestedBlockGroupHTML("single-persist"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(2));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(3));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(3)).toHaveProperty("expanded", true);
  });

  it("should allow multiple block elements to expand and collapse when expandMode is multiple", async () => {
    await mount(nestedBlockHTML("multiple"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");
    const nestedBlockElements = page.getBySelector("calcite-block[slot='children']");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(nestedBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);

    await userEvent.click(nestedBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(1)).toHaveProperty("expanded", true);
  });

  it("should allow multiple block elements to expand and collapse in nested groups when expandMode is multiple", async () => {
    await mount(nestedBlockGroupHTML("multiple"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(2));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(3));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(3)).toHaveProperty("expanded", true);
  });
});

describe("drag and drop", () => {
  async function waitForItemUpdateDebounce(): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.nextTick));
  }

  function createSimpleBlockGroup(): JsxNode {
    return (
      <calcite-block-group drag-enabled id="component1">
        <calcite-block data-testid="one" heading="one" label="One" />
        <calcite-block data-testid="two" heading="two" label="Two" />
        <calcite-block data-testid="three" heading="three" label="Three" />
      </calcite-block-group>
    );
  }

  it("works using a mouse", async () => {
    const { el } = await mount(createSimpleBlockGroup);
    await waitForItemUpdateDebounce();
    const orderChangeHandler = vi.fn();
    const dragEndHandler = vi.fn();
    const dragStartHandler = vi.fn();
    el.addEventListener("calciteBlockGroupOrderChange", orderChangeHandler);
    el.addEventListener("calciteBlockGroupDragEnd", dragEndHandler);
    el.addEventListener("calciteBlockGroupDragStart", dragStartHandler);

    const one = page.getByTestId("one").getBySelector("calcite-sort-handle");
    const two = page.getByTestId("two").getBySelector("calcite-sort-handle");

    await userEvent.dragAndDrop(one, two);

    const items = page.getBySelector("calcite-block");
    await expect.element(items.nth(0)).toHaveProperty("heading", "two");
    await expect.element(items.nth(1)).toHaveProperty("heading", "one");

    expect(orderChangeHandler).toHaveBeenCalledTimes(1);
    expect(dragStartHandler).toHaveBeenCalledTimes(1);
    expect(dragEndHandler).toHaveBeenCalledTimes(1);
    expect(orderChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          newIndex: 1,
          oldIndex: 0,
        }),
      }),
    );
    expect(dragStartHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          newIndex: null,
          oldIndex: 0,
        }),
      }),
    );
    expect(dragEndHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          newIndex: 1,
          oldIndex: 0,
        }),
      }),
    );
  });

  const firstLettersId = "first-letters";
  const secondLettersId = "second-letters";

  it("supports dragging items between block groups", async () => {
    await mount(
      <>
        <calcite-block-group drag-enabled group="letters" id={firstLettersId}>
          <calcite-block heading="a" label="A" />
          <calcite-block heading="b" label="B" />
        </calcite-block-group>

        <calcite-block-group drag-enabled group="numbers" id="numbers">
          <calcite-block heading="1" label="One" />
          <calcite-block heading="2" label="Two" />
        </calcite-block-group>

        <calcite-block-group drag-enabled id="no-group">
          <calcite-block heading="no-group" label="No group" />
        </calcite-block-group>

        <calcite-block-group drag-enabled group="letters" id={secondLettersId}>
          <calcite-block data-testid="c" heading="c" label="C" />
          <calcite-block data-testid="d" heading="d" label="D" />
          <calcite-block data-testid="e" heading="e" label="E" />
          <calcite-block data-testid="f" heading="f" label="F" />
        </calcite-block-group>
      </>,
    );
    await waitForItemUpdateDebounce();

    const letterBlockSelector = `calcite-block-group[group="letters"] calcite-block`;
    const letterBlocks = page.getBySelector(letterBlockSelector);

    expect(letterBlocks).toHaveLength(6);

    const moveToItemIds = letterBlocks
      .elements()
      .map((item) => (item as Block["el"]).moveToItems.map((moveToItem) => moveToItem.id))
      .flat();

    expect(moveToItemIds).toHaveLength(6);

    const moveToItemElementIds = letterBlocks
      .elements()
      .map((item) => (item as Block["el"]).moveToItems.map((moveToItem) => moveToItem.element.id))
      .flat();

    expect(moveToItemElementIds).toHaveLength(6);
    expect(moveToItemElementIds[0]).toBe(secondLettersId);
    expect(moveToItemElementIds[1]).toBe(secondLettersId);
    expect(moveToItemElementIds[2]).toBe(firstLettersId);
    expect(moveToItemElementIds[3]).toBe(firstLettersId);
    expect(moveToItemElementIds[4]).toBe(firstLettersId);
    expect(moveToItemElementIds[5]).toBe(firstLettersId);

    const orderChangeHandler = vi.fn();
    const blockGroups = page.getBySelector("calcite-block-group").elements() as BlockGroup["el"][];
    blockGroups.forEach((blockGroup) =>
      blockGroup.addEventListener("calciteBlockGroupOrderChange", orderChangeHandler),
    );
    await userEvent.dragAndDrop(
      page.getByTestId("d").getBySelector("calcite-sort-handle"),
      page.getBySelector(`#${firstLettersId}`),
      { targetPosition: { x: 4, y: 52 }, steps: 10 },
    );

    await userEvent.dragAndDrop(
      page.getByTestId("e").getBySelector("calcite-sort-handle"),
      page.getBySelector("#numbers"),
    );

    await userEvent.dragAndDrop(
      page.getByTestId("e").getBySelector("calcite-sort-handle"),
      page.getBySelector("#no-group"),
    );

    const items = page.getBySelector("calcite-block");
    const expectedOrder = ["a", "d", "b", "1", "2", "no-group", "c", "e", "f"];
    for (let i = 0; i < expectedOrder.length; i++) {
      await expect.element(items.nth(i)).toHaveProperty("heading", expectedOrder[i]);
    }

    expect(orderChangeHandler).toHaveBeenCalledTimes(2);
  });

  it("calls canPull and canPut for move items", async () => {
    const { reRender } = await mount(
      <>
        <calcite-block-group drag-enabled group="letters" id={firstLettersId} label="First Letters">
          <calcite-block heading="a" id="a" label="A" />
          <calcite-block heading="b" id="b" label="B" />
        </calcite-block-group>
        <calcite-block-group
          drag-enabled
          group="letters"
          id={secondLettersId}
          label="Second Letters"
        >
          <calcite-block heading="c" id="c" label="C" />
          <calcite-block heading="d" id="d" label="D" />
        </calcite-block-group>
      </>,
    );

    const blockGroups = page.getBySelector("calcite-block-group");
    const firstLetters = blockGroups.first().element() as BlockGroup["el"];
    firstLetters.canPull = ({ dragEl }) => dragEl.id === "b";
    firstLetters.canPut = ({ dragEl }) => dragEl.id === "c";
    const secondLetters = blockGroups.last().element() as BlockGroup["el"];
    secondLetters.canPull = () => true;
    secondLetters.canPut = () => true;
    await reRender();
    await waitForItemUpdateDebounce();

    function getMoveItems(id: string): Locator {
      return page.getBySelector(
        `#${id} calcite-dropdown-group#${sortHandleIDs.move} calcite-dropdown-item`,
      );
    }

    const aMoveItems = getMoveItems("a");
    expect(aMoveItems).toHaveLength(0);

    const bMoveItems = getMoveItems("b");
    expect(bMoveItems).toHaveLength(1);
    await expect.element(bMoveItems.first()).toHaveProperty("label", "Second Letters");

    const cMoveItems = getMoveItems("c");
    expect(cMoveItems).toHaveLength(1);
    await expect.element(cMoveItems.first()).toHaveProperty("label", "First Letters");

    const dMoveItems = getMoveItems("d");
    expect(dMoveItems).toHaveLength(0);

    firstLetters.canPull = ({ dragEl }) => dragEl.id === "b";
    firstLetters.canPut = ({ dragEl }) => dragEl.id === "c";
    secondLetters.canPull = () => true;
    secondLetters.canPut = () => false;
    await reRender();
    await waitForItemUpdateDebounce();

    expect(aMoveItems).toHaveLength(0);
    expect(bMoveItems).toHaveLength(0);
  });

  it("supports cloning with canPull", async () => {
    const { reRender } = await mount(
      <>
        <calcite-block-group drag-enabled group="letters" id={firstLettersId} label="First Letters">
          <calcite-block heading="a" id="a" label="A" />
          <calcite-block heading="b" id="b" label="B" />
        </calcite-block-group>
        <calcite-block-group
          drag-enabled
          group="letters"
          id={secondLettersId}
          label="Second Letters"
        >
          <calcite-block heading="c" id="c" label="C" />
          <calcite-block heading="d" id="d" label="D" />
        </calcite-block-group>
      </>,
    );

    const firstLetters = document.getElementById(firstLettersId) as BlockGroup["el"];
    firstLetters.canPull = () => "clone";
    await reRender();
    await waitForItemUpdateDebounce();

    function getAddToItems(id: string): Locator {
      return page.getBySelector(
        `#${id} calcite-dropdown-group#${sortHandleIDs.add} calcite-dropdown-item`,
      );
    }

    const aAddToItems = getAddToItems("a");
    expect(aAddToItems).toHaveLength(1);
    await expect.element(aAddToItems.first()).toHaveProperty("label", "Second Letters");

    const bAddToItems = getAddToItems("b");
    expect(bAddToItems).toHaveLength(1);
    await expect.element(bAddToItems.first()).toHaveProperty("label", "Second Letters");

    const cAddToItems = getAddToItems("c");
    expect(cAddToItems).toHaveLength(0);

    const dAddToItems = getAddToItems("d");
    expect(dAddToItems).toHaveLength(0);
  });

  it("reorders using a keyboard", async () => {
    const { el } = await mount(createSimpleBlockGroup);
    await waitForItemUpdateDebounce();
    let totalMoves = 0;
    const orderChangeHandler = vi.fn();
    el.addEventListener("calciteBlockGroupOrderChange", orderChangeHandler);

    async function assertReorder(
      reorder: Reorder,
      expectedOrder: string[],
      newIndex: number,
      oldIndex: number,
    ): Promise<void> {
      await userEvent.keyboard("{Space}");

      const item = page.getByTestId(`one`);
      const handleItems = item
        .getBySelector(`calcite-sort-handle calcite-dropdown-item`)
        .elements() as DropdownItem["el"][];

      const topDisabled = handleItems[0].disabled;
      const upDisabled = handleItems[1].disabled;
      const downDisabled = handleItems[2].disabled;
      const bottomDisabled = handleItems[3].disabled;

      const reorderDisabled =
        (reorder === "top" && topDisabled) ||
        (reorder === "up" && upDisabled) ||
        (reorder === "down" && downDisabled) ||
        (reorder === "bottom" && bottomDisabled);

      if (reorderDisabled) {
        await userEvent.keyboard("{Escape}");
        return;
      }

      if (reorder !== "top" && !topDisabled) {
        await userEvent.keyboard("{ArrowDown}");
      }

      if (["down", "bottom"].includes(reorder) && !upDisabled) {
        await userEvent.keyboard("{ArrowDown}");
      }

      if (reorder === "bottom" && !downDisabled) {
        await userEvent.keyboard("{ArrowDown}");
      }

      await userEvent.keyboard("{Enter}");

      const items = page.getBySelector("calcite-block");
      expect(items).toHaveLength(3);

      for (let i = 0; i < items.length; i++) {
        await expect.element(items.nth(i)).toHaveProperty("heading", expectedOrder[i]);
      }

      expect(orderChangeHandler).toHaveBeenCalledTimes(++totalMoves);
      expect(orderChangeHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            newIndex: newIndex,
            oldIndex: oldIndex,
            fromEl: el,
            toEl: el,
            dragEl: item.element(),
          }),
        }),
      );
    }

    await userEvent.keyboard("{Tab}");

    await assertReorder("down", ["two", "one", "three"], 1, 0);
    await assertReorder("down", ["two", "three", "one"], 2, 1);
    await assertReorder("down", ["two", "three", "one"], 2, 2);

    await assertReorder("up", ["two", "one", "three"], 1, 2);
    await assertReorder("up", ["one", "two", "three"], 0, 1);
    await assertReorder("up", ["one", "two", "three"], 0, 0);

    await assertReorder("bottom", ["two", "three", "one"], 2, 0);
    await assertReorder("top", ["one", "two", "three"], 0, 2);
  });

  it("moves using a keyboard", async () => {
    const group = "my-group";
    const orderChangeHandler = vi.fn();
    await mount(
      <>
        <calcite-block-group
          drag-enabled
          group={group}
          id="component1"
          label="Group 1"
          oncalciteBlockGroupOrderChange={orderChangeHandler}
        >
          <calcite-block heading="one" id="one" label="One" />
          <calcite-block heading="two" id="two" label="Two" />
        </calcite-block-group>
        <calcite-block-group drag-enabled group={group} id="component2" label="Group 2">
          <calcite-block heading="three" id="three" label="Three" />
        </calcite-block-group>
      </>,
    );
    await waitForItemUpdateDebounce();

    let componentMoves = 0;

    async function assertMove(
      blockId: string,
      moveFromId: string,
      moveToId: string,
      component1Order: string[],
      component2Order: string[],
      newIndex: number,
      oldIndex: number,
    ): Promise<void> {
      // move to other list is last option, so we open menu, and round robin to the last option, then select it
      await userEvent.keyboard("{Space}{ArrowUp}{Enter}");

      const component1After = page.getBySelector("#component1 calcite-block");
      expect(component1After).toHaveLength(component1Order.length);

      for (let i = 0; i < component1After.length; i++) {
        await expect.element(component1After.nth(i)).toHaveProperty("heading", component1Order[i]);
      }

      const component2After = page.getBySelector("#component2 calcite-block");
      expect(component2After).toHaveLength(component2Order.length);

      for (let i = 0; i < component2After.length; i++) {
        await expect.element(component2After.nth(i)).toHaveProperty("heading", component2Order[i]);
      }

      expect(orderChangeHandler).toHaveBeenCalledTimes(++componentMoves);
      expect(orderChangeHandler).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            newIndex,
            oldIndex,
            fromEl: page.getBySelector(`#${moveFromId}`).element(),
            toEl: page.getBySelector(`#${moveToId}`).element(),
            dragEl: page.getBySelector(`#${blockId}`).element(),
          }),
        }),
      );
    }

    await userEvent.keyboard("{Tab}");
    await assertMove("one", "component1", "component2", ["two"], ["one", "three"], 0, 0);

    await userEvent.keyboard("{Tab}");
    await assertMove("three", "component2", "component1", ["three", "two"], ["one"], 0, 1);
  });

  it("updates moveToItems label when menu is opened", async () => {
    const group = "my-group";
    const { reRender } = await mount(
      <>
        <calcite-block-group data-testid="component1" drag-enabled group={group} label="Group 1">
          <calcite-block heading="one" label="One" />
          <calcite-block heading="two" label="Two" />
        </calcite-block-group>
        <calcite-block-group data-testid="component2" drag-enabled group={group} label="Group 2">
          <calcite-block data-testid="three" heading="three" label="Three" />
        </calcite-block-group>
      </>,
    );

    const component1 = page.getByTestId("component1").element() as BlockGroup["el"];
    const three = page.getByTestId("three").element() as Block["el"];
    three.sortHandleOpen = true;
    await reRender();
    await waitForItemUpdateDebounce();
    let moveToItems = three.moveToItems.map((moveToItem) => moveToItem.label);

    expect(moveToItems).toHaveLength(1);
    expect(moveToItems[0]).toBe("Group 1");

    three.sortHandleOpen = false;
    const newLabel = "New label";
    component1.label = newLabel;
    three.sortHandleOpen = true;
    await reRender();
    await waitForItemUpdateDebounce();
    moveToItems = three.moveToItems.map((moveToItem) => moveToItem.label);

    expect(moveToItems).toHaveLength(1);
    expect(moveToItems[0]).toBe(newLabel);
  });
});
